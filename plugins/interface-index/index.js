/**
 * 本地插件：接口速查索引（interface-index）
 *
 * 把散落在各文档页里的「接口条目」扫成一份结构化索引，供 /quick_reference 页面检索。
 * 数据在构建期生成，页面只负责渲染与过滤 —— 浏览器里读不了 fs。
 *
 * 为什么不用文档内容拆成一条一页：
 *   现有页面里每个接口本来就已经是独立标题（`### minecraft:xxx`、`#### addEffect 方法`），
 *   标题本身就是锚点，跳过去即可。所以索引只要记住「名字 → 页面#锚点」，
 *   不需要动 docs/ 下任何一篇的结构。
 *
 * 新增一类接口：在 SOURCES 里登记一行，不用改页面。
 * 新增一个接口条目：照常写在文档里，索引会在下次构建时自动收录。
 *
 * ── 输出结构 ──────────────────────────────────────────────
 *   pages: [{ p: 路由, k: 分类, g: 分组, t: 页面标题 }]
 *   items: [[名称, pages 下标, 锚点, 版本, 摘要, 别名（竖线分隔）, 标记]]
 *
 * 用「页表 + 数组」而不是对象数组，是因为条目有三千多条：
 *   全写成对象约 1 MB，这样压到 400 KB 左右，速查页又是唯一加载它的页面。
 */

const fs = require("fs");
const path = require("path");

const DOCS_ROOT = path.join(__dirname, "..", "..", "docs");

/** 分类。id 在页面里当筛选键，label 直接显示 */
const KINDS = [
    { id: "command", label: "命令", desc: "所有可用的斜杠命令" },
    { id: "item_component", label: "物品组件", desc: "数据驱动物品组件" },
    { id: "block_component", label: "方块组件", desc: "数据驱动方块组件" },
    { id: "block_trait", label: "方块特征", desc: "启用了原版行为的方块特征" },
    { id: "entity_component", label: "实体组件", desc: "数据驱动实体组件" },
    { id: "entity_event", label: "实体事件", desc: "实体事件 ID 与事件响应" },
    { id: "entity_filter", label: "实体过滤器", desc: "过滤器测试" },
    { id: "molang", label: "Molang 查询", desc: "实体、方块与物品的 query 函数" },
    { id: "loot", label: "战利品表", desc: "战利品函数与条件" },
    { id: "tag", label: "标签", desc: "原版物品与方块标签" },
    { id: "sapi", label: "Script API", desc: "国际版脚本接口 @minecraft/server" },
    { id: "modapi_interface", label: "ModAPI 接口", desc: "中国版脚本接口" },
    { id: "modapi_event", label: "ModAPI 事件", desc: "中国版脚本事件" },
    { id: "modapi_enum", label: "ModAPI 枚举值", desc: "中国版脚本枚举值" },

];

/**
 * 扫描源。
 *
 * file 型：单页里按标题层级抽条目，level 指条目所在的标题级别。
 * dir  型：整个目录按 mode 抽（flat / sapi / modapi）。
 * only  ：只在这个二级标题之下找（避免把「过滤器格式」里的说明小标题当成接口）。
 */
const SOURCES = [
    // ── 数据驱动 ──
    { file: "docs/commands/all_commands.md", kind: "command", level: 3 },
    { file: "docs/items/components.md", kind: "item_component", level: 3 },
    { file: "docs/blocks/components.md", kind: "block_component", level: 3 },
    { file: "docs/blocks/traits.md", kind: "block_trait", level: 2 },
    { dir: "docs/entities/components", kind: "entity_component", mode: "flat", level: 3, ignore: ["index.md"] },
    { file: "docs/entities/events.md", kind: "entity_event", level: 3 },
    { file: "docs/entities/filters.md", kind: "entity_filter", level: 3, only: "全部过滤器列表" },

    // ── Molang 与战利品表 ──
    // Molang 查询函数是表格行，不是标题，走 mode: "molang"
    { file: "docs/entities/molang.md", kind: "molang", mode: "molang" },
    { file: "docs/blocks/molang.md", kind: "molang", mode: "molang" },
    { file: "docs/items/molang.md", kind: "molang", mode: "molang" },
    { file: "docs/items/loot_tables.md", kind: "loot", level: 3 },

    // ── 脚本 ──
    { dir: "docs/scripts/sapi", kind: "sapi", mode: "sapi", ignore: ["overview.md", "version_table.md"] },
    // ModAPI 三块分开收：接口、事件、枚举值，读者找的东西不一样
    { dir: "docs/scripts/modapi/interfaces", kind: "modapi_interface", mode: "modapi" },
    { dir: "docs/scripts/modapi/events", kind: "modapi_event", mode: "modapi" },
    { file: "docs/scripts/modapi/enums.md", kind: "modapi_enum", mode: "modapi" },
    // 标签页只有一张「原版使用的标签」表格，没有条目标题，单独抽
    { file: "docs/items/tags.md", kind: "tag", mode: "tag" },
    { file: "docs/blocks/tags.md", kind: "tag", mode: "tag" },
];

/* ================================================================
   通用工具
   ================================================================ */

/** 与 Docusaurus（rehype-slug 走 github-slugger）一致的锚点规则：
 *  转小写 → 去掉非字母数字（中文算字母，下划线、连字符保留）→ 空格变连字符。
 *  所以 `minecraft:block_placer` → minecraftblock_placer，`addEffect 方法` → addeffect-方法。 */
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\-_ ]/gu, "")
        .replace(/ /g, "-");
}

/** 把一行 MDX 拍平成纯文本：去 JSX 标签、去链接语法、去强调符号 */
function stripInline(text) {
    return text
        .replace(/<[^>]+>/g, "")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/`/g, "")
        .replace(/\*\*|__/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

/** 摘要：取条目正文里第一句像人话的文本，跳过 JSX、表格、引用、分隔线 */
function summarize(body) {
    for (const raw of body.split(/\r?\n/)) {
        let line = raw.trim();
        if (!line) continue;
        if (/^(import|export)\s/.test(line)) continue;
        if (/^[<>|]/.test(line)) continue; // JSX 块、表格
        if (/^-{3,}$/.test(line) || /^={3,}$/.test(line)) continue;
        if (/^!\[/.test(line)) continue;
        if (/^\*\*[^*]+\*\*[：:]?$/.test(line)) continue; // 只有一句粗体小标题

        line = stripInline(line);
        if (line.length < 2) continue;
        return line.length > 90 ? `${line.slice(0, 90)}…` : line;
    }
    return "";
}

/** 条目里第一个 <Version add="…"/> 就是加入版本 */
function versionOf(body) {
    const add = body.match(/<Version\b[^>]*?\badd="([^"]+)"/);
    if (!add) return { version: "", vtype: "" };
    const type = body.match(/<Version\b[^>]*?\btype="([^"]+)"/);
    return { version: add[1], vtype: type ? type[1] : "" };
}

/** 从表格单元格里取出反引号包着的版本号，`——` 与表头一律当「没有」 */
function pickVersionCell(cell) {
    if (!cell) return "";
    const match = cell.replace(/\*\*/g, "").match(/`(\d[\d.]*)`/);
    return match ? match[1] : "";
}

/**
 * 解析 `docs/scripts/sapi/version_table.md`：游戏版本 → 三个脚本模块的版本。
 *
 * 速查的版本筛选以「游戏版本」为口径，脚本接口得靠这张表换算过去，
 * 否则选了低版本，脚本条目会因为口径不同而全部漏筛。
 */
function parseVersionTable() {
    const file = path.join(DOCS_ROOT, "docs", "scripts", "sapi", "version_table.md");
    if (!fs.existsSync(file)) return [];

    const rows = [];
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
        if (!line.startsWith("|")) continue;
        const cells = line.split("|").map(cell => cell.trim());
        const game = cells[1] ? cells[1].replace(/\*\*/g, "") : "";
        if (!/^\d+(\.\d+){1,2}$/.test(game)) continue;
        rows.push({
            game,
            server: pickVersionCell(cells[2]),
            ui: pickVersionCell(cells[3]),
            graphics: pickVersionCell(cells[4]),
        });
    }
    return rows;
}

/**
 * 解析 `docs/docs/scripts/modapi/version_table.md`：中国版版本 → 国际版版本。
 *
 * ModAPI 条目的版本标识写的是中国版版本号（`3.5`），而速查页的版本筛选
 * 一律以国际版游戏版本为准，两边编号体系不同，得靠这张表换算。
 *
 * 返回 [{ china, game }]，按中国版版本号从旧到新。
 */
function parseChinaVersionTable() {
    const file = path.join(DOCS_ROOT, "docs", "scripts", "modapi", "version_table.md");
    if (!fs.existsSync(file)) return [];

    const rows = [];
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
        if (!line.startsWith("|")) continue;
        const cells = line.split("|").map(cell => cell.trim());
        const china = pickVersionCell(cells[1]);
        const game = pickVersionCell(cells[2]);
        if (!china || !game) continue;
        // 中国版版本号形如 3.5、1.21；国际版版本号形如 1.21.130
        if (!/^\d+(\.\d+)?$/.test(china)) continue;
        if (!/^\d+(\.\d+){1,2}$/.test(game)) continue;
        rows.push({ china, game });
    }
    return rows;
}

/** ModAPI 用 <Server/> / <Client/> 标脚本端 */
function sideOf(body) {
    if (/<Server\s*\/>/.test(body)) return "server";
    if (/<Client\s*\/>/.test(body)) return "client";
    return "";
}

/** 条目的状态标记（不含平台那一维） */
const STATE_FLAGS = ["experimental", "deprecated", "removed"];

/**
 * 条目的状态与平台标记。
 *
 * 来源有三处，优先级从高到低：
 *   1. 所在分组标题 —— 「已移除组件」「弃用组件」「中国版组件」这几节本身就是结论
 *   2. 条目自己的 <Version deprecated="…"/> / <Version experimental="…"/>
 *   3. 模组文档 <Usable type="onlyChina|onlyInternational"/>
 *
 * 返回字符串数组，可能同时含多个状态；平台只有一个（china 或 intl）。
 */
function flagsOf(body, { kind, group }) {
    const flags = [];
    const section = group || "";

    if (/已移除/.test(section)) {
        flags.push("removed");
    } else if (/弃用/.test(section)) {
        flags.push("deprecated");
    } else if (/<Version\b[^>]*?\bdeprecated="/.test(body)) {
        flags.push("deprecated");
    }

    // 只看条目自己那个 <Version>：`/locate` 是 1.19.10 的正式命令，
    // 只是它的 POI 参数标了实验性，不能因此把整条判成实验性
    const ownVersion = body.match(/<Version\b[^>]*>/);
    if (ownVersion && /\bexperimental="/.test(ownVersion[0])) {
        flags.push("experimental");
    }

    const china =
        String(kind).startsWith("modapi") ||
        /中国版/.test(section) ||
        /<Usable\b[^>]*?\btype="onlyChina"/.test(body);

    flags.push(china ? "china" : "intl");
    return flags;
}

/** 标题整块是行内代码才算接口条目：`/tp`（或`/teleport`）、`minecraft:xxx`、`add` */
function codeNames(title) {
    const all = [...title.matchAll(/`([^`]+)`/g)].map(m => m[1]);
    return all;
}

/** 名称派生别名：minecraft:behavior.admire_item → behavior.admire_item、admire_item */
function derivedAliases(name) {
    const out = [];
    const bare = name.replace(/^\//, "");

    if (name.includes(":")) {
        out.push(name.slice(name.indexOf(":") + 1));
    }
    if (name.includes(".")) {
        out.push(name.slice(name.lastIndexOf(".") + 1));
    }
    if (bare !== name || name.includes("/")) {
        out.push(bare);
    }
    return out.filter(alias => alias && alias !== name);
}

/* ================================================================
   解析：把一篇 md 切成「标题 + 正文块」
   ================================================================ */

/**
 * 给一页里的标题分配锚点。
 *
 * 必须做去重：Docusaurus 的 rehype-slug 走 github-slugger，同一页里出现两个
 * 同名标题时，第二个的 id 会是 `xxx-1`。SAPI 里 `body 方法` 之类的方法名
 * 在多个类下重复，不跟着去重就会「索引指向第一个、跳过去也在第一个」。
 */
function assignSlugs(heads) {
    const occurrences = {};
    for (const head of heads) {
        const base = slugify(head.title);
        let slug = base;
        if (occurrences[base] !== undefined) {
            occurrences[base] += 1;
            slug = `${base}-${occurrences[base]}`;
        } else {
            occurrences[base] = 0;
        }
        head.slug = slug;
    }
}

function parseHeadings(text) {
    const lines = text.split(/\r?\n/);
    const heads = [];
    let inFence = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^\s*```/.test(line)) {
            inFence = !inFence;
            continue;
        }
        if (inFence) continue;

        const match = line.match(/^(#{1,6})\s+(.*?)\s*$/);
        if (match) {
            heads.push({ level: match[1].length, title: match[2], start: i });
        }
    }

    assignSlugs(heads);

    // 正文 = 到下一个任意标题为止
    return heads.map((head, index) => {
        const end = index + 1 < heads.length ? heads[index + 1].start : lines.length;
        return {
            ...head,
            body: lines.slice(head.start + 1, end).join("\n"),
        };
    });
}

/** frontmatter 里只关心 sidebar_label */
function frontmatterLabel(text) {
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return "";
    const label = match[1].match(/^sidebar_label:\s*(.+)$/m);
    return label ? stripInline(label[1].replace(/^["']|["']$/g, "")) : "";
}

/** 文档标题：frontmatter 的 sidebar_label 优先，其次第一个 # 标题 */
function docTitle(text, heads) {
    const label = frontmatterLabel(text);
    if (label) return label;
    const first = heads.find(head => head.level === 1);
    return first ? stripInline(first.title) : "";
}

/** 分类目录的中文名，来自 _category_.json */
function categoryLabel(dir) {
    const file = path.join(dir, "_category_.json");
    if (!fs.existsSync(file)) return "";
    try {
        return JSON.parse(fs.readFileSync(file, "utf8")).label || "";
    } catch {
        return "";
    }
}

/** 文件名 → 路由。
 *  docs 插件的 routeBasePath 是 /docs，docId 又是相对 docs/ 的路径，
 *  所以 `docs/docs/items/components.md` → /docs/docs/items/components，
 *  `docs/commands/all_commands.md` → /docs/commands/all_commands。 */
function routeOf(absPath) {
    let rel = path.relative(DOCS_ROOT, absPath).replace(/\\/g, "/");
    rel = rel.replace(/\.mdx?$/, "").replace(/\/index$/, "");
    return `/docs/${rel}`;
}

function walk(dir, out = []) {
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, out);
        else if (/\.mdx?$/.test(entry.name)) out.push(full);
    }
    return out;
}

/* ================================================================
   提取器
   ================================================================ */

/**
 * flat：标题即条目（组件、命令、特征、事件响应、过滤器）
 * 只收「标题整块是行内代码」的，这样能自然跳过「### 示例」「### 过滤器组」这类说明小标题。
 */
function extractFlat(absPath, source) {
    const text = fs.readFileSync(absPath, "utf8");
    const heads = parseHeadings(text);
    const title = docTitle(text, heads);
    const items = [];

    let section = ""; // 最近的二级标题（分组），如「基础属性组件」「超高频命令」
    let inScope = !source.only;

    for (const head of heads) {
        if (head.level === 2) {
            section = stripInline(head.title);
            inScope = !source.only || section.includes(source.only);
        }
        if (head.level !== source.level) continue;
        if (!inScope) continue;

        const names = codeNames(head.title);
        if (names.length === 0) continue; // 不是接口条目

        const name = names[0];
        const aliases = [...names.slice(1), ...derivedAliases(name)];

        // 实体组件目录下每篇是一个组件大类，用文档标题当分组
        const group = source.kind === "entity_component" ? title : section === title ? "" : section;

        const { version, vtype } = versionOf(head.body);
        items.push({
            name,
            group,
            title,
            anchor: head.slug,
            version,
            vtype,
            desc: summarize(head.body),
            alias: aliases,
            tag: "",
            flags: flagsOf(head.body, { kind: source.kind, group }),
        });
    }

    return items;
}

/**
 * sapi：`### Entity 类` 是类型，`#### addEffect 方法` 是成员。
 * 成员在索引里记成 `Entity.addEffect`，这样搜 addEffect 和 Entity 都能命中。
 *
 * 另外把页面里的对照表（`| 可攀爬 | [\`EntityCanClimbComponent\`](#…) |`）
 * 收成中文别名 —— 这是站内唯一的中英对照来源，能让「可攀爬」直接搜到类名。
 */
/**
 * 从路径判断脚本模块。
 * 页面里有些类和方法没标 `<Version type="…">`，靠目录兜底才不会被当成数据驱动条目
 * 去做游戏版本比较。
 */
function sapiModuleOf(absPath) {
    const file = absPath.replace(/\\/g, "/");
    if (file.includes("/server_ui/")) return "script-ui";
    if (file.includes("/server_graphics/")) return "script-graphics";
    if (file.includes("/server/")) return "script";
    return "";
}

function extractSapi(absPath, source) {
    const text = fs.readFileSync(absPath, "utf8");
    const heads = parseHeadings(text);
    const title = docTitle(text, heads);
    const items = [];

    // 目录分类（实体与玩家 / 世界 ……）
    const category = categoryLabel(path.dirname(absPath)) || "";
    // 「实体 / 实体组件」这种重复只留一个
    const group = category && category !== title ? `${category} / ${title}` : title;

    // 中文别名：表格第一列中文 + 第二列指向本页某锚点的链接
    const cnAlias = new Map();
    for (const line of text.split(/\r?\n/)) {
        if (!line.startsWith("|")) continue;
        const cells = line.split("|").map(cell => cell.trim());
        if (cells.length < 3) continue;
        const cn = stripInline(cells[1]);
        const link = cells[2].match(/\(#([^)]+)\)/);
        if (!cn || !link || !/[\u4e00-\u9fa5]/.test(cn)) continue;
        const slug = decodeURIComponent(link[1]);
        if (!cnAlias.has(slug)) cnAlias.set(slug, cn);
    }

    const fallbackModule = sapiModuleOf(absPath);
    let currentType = null; // { name, slug, version, vtype }

    for (const head of heads) {
        if (head.level === 2) {
            currentType = null; // 换了大分组，父类关系断开
            continue;
        }

        if (head.level === 3) {
            const match = head.title.match(/^(.+?)\s+(类|接口|枚举|常量)$/);
            if (!match) {
                currentType = null;
                continue;
            }
            const name = stripInline(match[1]);
            const { version, vtype } = versionOf(head.body);
            const typeFlags = flagsOf(head.body, { kind: "sapi", group });
            // 类上的版本与状态与方法共用：方法自己没标时往下继承
            currentType = {
                name,
                slug: head.slug,
                version,
                vtype: vtype || fallbackModule,
                stateFlags: typeFlags.filter(flag => STATE_FLAGS.includes(flag)),
            };
            const aliases = [cnAlias.get(head.slug), ...derivedAliases(name)].filter(Boolean);
            items.push({
                name,
                group,
                title,
                anchor: head.slug,
                version,
                vtype: vtype || fallbackModule,
                desc: summarize(head.body),
                alias: aliases,
                tag: "type",
                flags: flagsOf(head.body, { kind: "sapi", group }),
            });
            continue;
        }

        if (head.level === 4 && currentType) {
            // 「#### 属性」是一串属性列表，不拆成条目
            if (/^属性$/.test(stripInline(head.title))) continue;
            const match = head.title.match(/^(\S+)\s+(方法|属性|字段)$/);
            if (!match) continue;

            const member = stripInline(match[1]);
            if (!/^[A-Za-z_$][\w$]*$/.test(member)) continue;

            const own = versionOf(head.body);
            // 方法/属性通常不单独标版本，跟着所属类走
            const version = own.version || currentType.version || "";
            const vtype = own.vtype || currentType.vtype || fallbackModule;
            const name = `${currentType.name}.${member}`;
            // 实验性/弃用/移除同理：类标了就代表整批方法都是，方法自己没标也要继承
            const ownFlags = flagsOf(head.body, { kind: "sapi", group });
            const flags = [...new Set([...ownFlags, ...(currentType.stateFlags || [])])];
            items.push({
                name,
                group,
                title,
                anchor: head.slug,
                version,
                vtype,
                desc: summarize(head.body),
                alias: [],
                tag: match[2] === "方法" ? "method" : "property",
                flags,
            });
        }
    }

    return items;
}

/**
 * modapi：接口页的 `### GetBlockAuxValueFromStates` 就是条目；
 * 枚举页（enums.md）用 `## 枚举名`。
 * 分组取「一级目录的中文 label / 页面标题」，如「实体 / 实体行为」。
 */
function extractModapi(absPath, source) {
    const text = fs.readFileSync(absPath, "utf8");
    const heads = parseHeadings(text);
    const title = docTitle(text, heads);
    const items = [];

    const rel = path.relative(path.join(DOCS_ROOT, "docs", "scripts", "modapi"), absPath).replace(/\\/g, "/");
    const parts = rel.split("/");
    // interfaces/entity/behavior.md → 一级目录 entity；interfaces/item.md → 直接是文件
    const subDir = parts.length > 2 ? path.join(path.dirname(absPath)) : path.dirname(absPath);
    const category = categoryLabel(subDir) || categoryLabel(path.join(DOCS_ROOT, "docs", "scripts", "modapi", parts[0])) || "";
    const group = category && category !== title ? `${category} / ${title}` : title;

    // 枚举页的条目在二级，其余在三级
    const level = /enums\.md$/.test(absPath) ? 2 : 3;

    for (const head of heads) {
        if (head.level !== level) continue;

        // 接口名是英文标识符；中文小标题（说明、示例）跳过
        const name = stripInline(head.title);
        if (!/^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/.test(name)) continue;

        const { version, vtype } = versionOf(head.body);
        items.push({
            name,
            group,
            title,
            anchor: head.slug,
            version,
            vtype,
            desc: summarize(head.body),
            alias: derivedAliases(name),
            tag: sideOf(head.body) || (level === 2 ? "enum" : ""),
            flags: flagsOf(head.body, { kind: source.kind || "modapi", group }),
        });
    }

    return items;
}

/**
 * molang：Molang 查询函数不是标题，而是表格里的一行
 *   | [`query.is_alive`](https://…) | 返回实体是否存活。 | … |
 * 所以按行抓，锚点退到所在的分组标题（`## 身份与状态`）。
 */
function extractMolang(absPath, source) {
    const text = fs.readFileSync(absPath, "utf8");
    const heads = parseHeadings(text);
    const title = docTitle(text, heads);

    // 分组标题 → 锚点（分组名一般不重复，取第一个即可）
    const slugByTitle = new Map();
    for (const head of heads) {
        const label = stripInline(head.title);
        if (!slugByTitle.has(label)) slugByTitle.set(label, head.slug);
    }

    const items = [];
    let section = "";

    for (const raw of text.split(/\r?\n/)) {
        const heading = raw.match(/^##\s+(.*)$/);
        if (heading) {
            section = stripInline(heading[1]);
            continue;
        }

        const row = raw.match(/^\|\s*\[`([^`]+)`\]\([^)]*\)\s*\|\s*(.+?)\s*\|/);
        if (!row) continue;

        // 有的行带签名：query.all_tags(...tags: string)
        const signature = row[1].trim();
        const name = signature.includes("(") ? signature.slice(0, signature.indexOf("(")).trim() : signature;
        // 只收 query.xxx 这种函数名，表头与运算符表会被这里筛掉
        if (!/^[A-Za-z_]+\.[A-Za-z0-9_]+$/.test(name)) continue;

        const desc = stripInline(row[2]);
        items.push({
            name,
            group: section === title ? "" : section,
            title,
            anchor: slugByTitle.get(section) || "",
            version: "",
            vtype: "",
            desc: desc.length > 90 ? `${desc.slice(0, 90)}…` : desc,
            alias: [name.includes(".") ? name.slice(name.lastIndexOf(".") + 1) : ""].filter(Boolean),
            tag: "",
            flags: flagsOf("", { kind: source.kind, group: section }),
        });
    }

    return items;
}

/**
 * 当前文档的基准游戏版本，取自组件页页首那句
 * `> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。`
 *
 * 不写死在代码里：页首本来就要随版本更新，「本版新增」跟着它走就不会失准。
 */
function currentGameVersion() {
    const file = path.join(DOCS_ROOT, "docs", "items", "components.md");
    if (!fs.existsSync(file)) return "";
    const match = fs.readFileSync(file, "utf8").match(/适用版本：国际版\s*([\d.]+)/);
    return match ? match[1] : "";
}

/** 当前文档基准的中国版版本，同一个页首里的「中国版 3.10」 */
function currentChinaVersion() {
    const file = path.join(DOCS_ROOT, "docs", "items", "components.md");
    if (!fs.existsSync(file)) return "";
    const match = fs.readFileSync(file, "utf8").match(/中国版\s*([\d.]+)/);
    return match ? match[1] : "";
}

/**
 * 当前中国版版本号，取自 ModAPI 概览页那句「适用版本：中国版 3.10」。
 *
 * 「只看本版新增」在不限版本时用它作基准 —— 中国版与国际版是两套编号，
 * 国际版的基准（26.60）套不到中国版条目上。
 */
function currentChinaVersion() {
    const file = path.join(DOCS_ROOT, "docs", "scripts", "modapi", "overview.md");
    if (!fs.existsSync(file)) return "";
    const match = fs.readFileSync(file, "utf8").match(/适用版本：中国版\s*([\d.]+)/);
    return match ? match[1] : "";
}

/* ================================================================
   汇总
   ================================================================ */

/**
 * 标签页：`## 原版使用的标签` 下面那张表，每行就是一个标签。
 *
 * 这类页面没有 `###` 小标题，全靠表格罗列，所以 Ctrl+F 之外没法定位，
 * 单独抽一遍让它们也能在速查里搜到。
 */
function extractTagTable(absPath, source) {
    const text = fs.readFileSync(absPath, "utf8");
    const title = docTitle(text, parseHeadings(text));
    const items = [];

    let inside = false;
    for (const line of text.split(/\r?\n/)) {
        if (/^##\s+/.test(line)) {
            inside = /原版使用的标签/.test(line);
            continue;
        }
        if (!inside || !line.startsWith("|")) continue;

        const cells = line.split("|").map(cell => cell.trim());
        if (cells.length < 3) continue;

        const name = stripInline(cells[1]);
        // 表头是「标签」，分隔行是 `:---`，都不是合法标签名
        if (!/^[a-z0-9_.]+(?::[a-z0-9_.]+)?$/i.test(name)) continue;

        items.push({
            name,
            group: title,
            title,
            anchor: "",
            version: "",
            vtype: "",
            desc: stripInline(cells[2] || ""),
            alias: [],
            tag: "tag",
            flags: [],
            side: "",
        });
    }

    return items;
}

const EXTRACTORS = {
    flat: extractFlat,
    sapi: extractSapi,
    modapi: extractModapi,
    molang: extractMolang,
    tag: extractTagTable,
};

function buildIndex() {
    const pages = [];
    const pageKeys = new Map(); // page+kind+group → 下标
    const items = [];
    const counters = Object.fromEntries(KINDS.map(kind => [kind.id, 0]));

    const pushPage = (route, kind, group, title) => {
        const key = `${route}\u0000${kind}\u0000${group}`;
        if (pageKeys.has(key)) return pageKeys.get(key);
        const index = pages.length;
        pages.push({ p: route, k: kind, g: group, t: title });
        pageKeys.set(key, index);
        return index;
    };

    for (const source of SOURCES) {
        let files;
        let extractor;

        if (source.file) {
            files = [path.join(DOCS_ROOT, source.file)];
            const mode = source.mode || "flat";
            extractor = (absPath, src) => EXTRACTORS[mode](absPath, { ...src, level: src.level });
        } else {
            const dir = path.join(DOCS_ROOT, source.dir);
            const mode = source.mode || "flat";
            extractor = (absPath, src) => EXTRACTORS[mode](absPath, src);
            files = walk(dir).filter(absPath => {
                const name = path.basename(absPath);
                return !(source.ignore || []).includes(name);
            });
        }

        for (const absPath of files) {
            if (!fs.existsSync(absPath)) continue;
            let entries;
            try {
                entries = extractor(absPath, source);
            } catch (error) {
                console.warn(`[interface-index] 解析失败 ${absPath}：${error.message}`);
                continue;
            }

            const route = routeOf(absPath);
            for (const entry of entries) {
                const pageIndex = pushPage(route, entry.kind || source.kind, entry.group, entry.title);
                items.push([
                    entry.name,
                    pageIndex,
                    entry.anchor,
                    entry.version,
                    entry.desc,
                    entry.alias.join("|"),
                    entry.tag,
                    entry.flags ? entry.flags.join(",") : "",
                    entry.vtype || "",
                ]);
                counters[source.kind] += 1;
            }
        }
    }

    // 同名条目（如 SAPI 各页都有的 getComponent）保留，但排序时按页面区分
    items.sort((a, b) => a[0].localeCompare(b[0], "en"));

    return {
        kinds: KINDS.map(kind => ({ ...kind, count: counters[kind.id] })),
        pages,
        items,
        // 游戏版本 → 脚本模块版本，页面靠它把脚本条目并进「游戏版本」这套口径
        versionTable: parseVersionTable(),
        // 中国版版本 → 国际版游戏版本，页面靠它把 ModAPI 条目并进同一套口径
        chinaVersionTable: parseChinaVersionTable(),
        // 文档的基准版本，「只看本版新增」用它
        currentGame: currentGameVersion(),
        currentChina: currentChinaVersion(),
        // 当前的中国版版本，ModAPI 条目用它当基准
        currentChina: currentChinaVersion(),
        total: items.length,
    };
}

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function interfaceIndexPlugin() {
    return {
        name: "interface-index",

        getPathsToWatch() {
            return [path.join(DOCS_ROOT, "**/*.md").replace(/\\/g, "/")];
        },

        async loadContent() {
            return buildIndex();
        },

        async contentLoaded({ content, actions }) {
            // 用 createData 而不是 setGlobalData：四千条数据不该塞进每一页的 HTML。
            // createData 的模块在 @generated/interface-index/default/index.json，
            // 页面直接 import，随页面 chunk 按需加载。
            // 传字符串是为了跳过 createData 默认的两空格缩进（450 KB → 470 KB 里的空白全在这里）。
            await actions.createData("index.json", JSON.stringify(content));
        },
    };
};

// 命令行自检用：node -e "console.log(require('./plugins/interface-index').buildIndex().total)"
module.exports.buildIndex = buildIndex;
