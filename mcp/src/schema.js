/**
 * 把文档里的参数树解析成结构化 schema，并用它校验附加包 JSON。
 *
 * 为什么不用官方的 json_schemas：
 *   官方 schema 按版本增量放在 `metadata/json_schemas/server/entity/1.21.100/…` 下，
 *   要合并十几个版本目录才算完整定义；而文档里的参数树是已经合并好的，
 *   还带中文说明和站内链接 —— 校验报错时能直接指回去。
 */

import { get, search, urlOf } from "./store.js";

/* ================================================================
   松散 JSON
   ================================================================ */

/** 基岩版允许注释。字符串里的 `//` 不能误伤，所以走一遍状态机。 */
function stripComments(source) {
    let out = "";
    let i = 0;
    let inString = false;

    while (i < source.length) {
        const ch = source[i];

        if (inString) {
            out += ch;
            if (ch === "\\") {
                out += source[i + 1] ?? "";
                i += 2;
                continue;
            }
            if (ch === '"') inString = false;
            i += 1;
            continue;
        }

        if (ch === '"') {
            inString = true;
            out += ch;
            i += 1;
            continue;
        }
        if (ch === "/" && source[i + 1] === "/") {
            while (i < source.length && source[i] !== "\n") i += 1;
            continue;
        }
        if (ch === "/" && source[i + 1] === "*") {
            i += 2;
            while (i < source.length && !(source[i] === "*" && source[i + 1] === "/")) i += 1;
            i += 2;
            continue;
        }

        out += ch;
        i += 1;
    }

    return out;
}

export function parseLooseJson(text) {
    const cleaned = stripComments(String(text)).replace(/,(\s*[}\]])/g, "$1");
    return JSON.parse(cleaned);
}

/* ================================================================
   参数树
   ================================================================ */

const TREE_CACHE = new Map();

function attr(attrs, name) {
    const match = attrs.match(new RegExp(`\\b${name}="([^"]*)"`));
    return match ? match[1] : "";
}

/** 描述里「可选值为`move`、`look`」这种就是枚举 */
function enumsOf(rawDesc) {
    const match = rawDesc.match(/可选值[为：:]\s*([^。；]+)/);
    if (!match) return null;
    const values = [...match[1].matchAll(/`([^`]+)`/g)].map(hit => hit[1]);
    return values.length ? values : null;
}

function cleanDesc(rawDesc) {
    return String(rawDesc)
        .replace(/<Version\b([^>]*?)\/>/g, (_, attrs) => {
            const add = attr(attrs, "add");
            return add && add !== "未知" ? `[自 ${add}]` : "";
        })
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
}

function parseBlock(blockText) {
    const root = { children: [] };
    // 每个缩进层级记住它当前的节点，下一行缩进变浅时往上弹
    const stack = [{ indent: -1, node: root }];

    for (const raw of blockText.split(/\r?\n/)) {
        if (!raw.trim()) continue;

        const lineMatch = raw.match(/^(\s*)[-*]\s*(.*)$/);
        if (!lineMatch) continue;

        const indent = lineMatch[1].length;
        const rest = lineMatch[2];

        /**
         * 一行里可能有多个 DataType，用来表示「两种写法都行」：
         *   - <DataType type="array"/><DataType type="object" name="triggers"/>：…
         * 只认第一个会丢掉 name，把参数当成不存在。这里全部收下，类型取并集。
         */
        const tags = [...rest.matchAll(/<DataType\b([^>]*?)\/>/g)].map(hit => hit[1]);
        if (!tags.length) continue;

        const parsed = tags.map(attrs => ({
            type: attr(attrs, "type") || "any",
            name: attr(attrs, "name") || null,
            required: /\bisRequired\b/.test(attrs),
        }));

        // 描述在最后一个标签之后。不能按冒号切 —— 标签里的 name 本身就带 minecraft: 冒号。
        const lastTagEnd = rest.lastIndexOf("/>");
        const rawDesc = rest
            .slice(lastTagEnd + 2)
            .replace(/^\s*[：:]?\s*/, "")
            .replace(/\|[\s\S]*$/, "")
            .trim();

        const named = parsed.filter(item => item.name);
        const primary = named.length ? named[named.length - 1] : parsed[0];

        const node = {
            // 主类型跟带名字的那个标签走 —— `- <DataType type="string"/><DataType type="array" name="feed_items"/>`
            // 说的是「既可以是字符串，也可以是数组」，主语是 feed_items 那一个
            type: primary.type,
            types: [...new Set(parsed.map(item => item.type))],
            name: primary.name,
            required: parsed.some(item => item.required),
            desc: cleanDesc(rawDesc),
            enums: enumsOf(rawDesc),
            children: [],
        };

        while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
        stack[stack.length - 1].node.children.push(node);
        stack.push({ indent, node });
    }

    return root.children[0] || null;
}

/**
 * 取一个组件的参数树。
 *
 * 返回数组是因为有些组件是多态的 —— `minecraft:damage` 既能写对象也能写整数，
 * 文档里就是两个 treeview。校验时任一匹配就算过。
 */
export function paramTreesOf(entry) {
    if (TREE_CACHE.has(entry.id)) return TREE_CACHE.get(entry.id);

    const blocks = [...entry.body.matchAll(/<treeview>([\s\S]*?)<\/treeview>/g)].map(hit => hit[1]);
    const trees = blocks.map(parseBlock).filter(Boolean);

    TREE_CACHE.set(entry.id, trees);
    return trees;
}

/* ================================================================
   类型判定
   ================================================================ */

/** 实际值属于哪一类，用来和文档标注比对 */
function jsonTypeOf(value) {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    if (typeof value === "number") return Number.isInteger(value) ? "int" : "float";
    if (typeof value === "object") return "object";
    return typeof value;
}

/** 文档标注的一组类型里有没有能接受这个实际值的 */
function typeCompatible(types, actual) {
    if (types.includes(actual)) return true;
    if (types.includes("any")) return true;
    // 标 float 的位置写整数是正常的；标 int 的位置写小数才是错
    if (actual === "int" && types.includes("float")) return true;
    return false;
}

const TYPE_LABELS = {
    int: "整数",
    float: "数字",
    boolean: "布尔值",
    string: "字符串",
    array: "数组",
    object: "对象",
};

function describeType(value) {
    if (Array.isArray(value)) return "数组";
    if (value === null) return "null";
    if (typeof value === "string") return `字符串 ${JSON.stringify(value)}`;
    if (typeof value === "number") return `数字 ${value}`;
    if (typeof value === "boolean") return `布尔值 ${value}`;
    return "对象";
}

/* ================================================================
   校验
   ================================================================ */

const KIND_OF = {
    entity: "entity_component",
    item: "item_component",
    block: "block_component",
};

/** 递归比对一棵参数树与实际的 JSON 值 */
function checkNode(node, value, path, issues) {
    /**
     * 类型不符只给提示，不判错。
     *
     * 基岩版 API 大量接受多种写法：`healable` 的 item 既能写 `"porkchop"` 也能写描述符对象，
     * `timer` 的 time 既能写数字也能写 range 对象，`on_death` 既能写 Molang 表达式也能写数字。
     * 文档在多数地方只标了其中一种，照单态严格判类型，官方模板自己就有近三百处「错误」。
     */
    const types = node.types || [node.type];
    const actual = jsonTypeOf(value);

    if (!typeCompatible(types, actual)) {
        issues.push({
            level: "warn",
            path,
            message: `文档标注为${types.map(type => TYPE_LABELS[type] || type).join(" 或 ")}，这里写的是${describeType(value)}`,
            kind: "type",
            desc: node.desc,
        });
        return;
    }

    if (node.enums && typeof value === "string" && !node.enums.includes(value)) {
        issues.push({
            level: "warn",
            path,
            message: `取值 "${value}" 不在文档列出的可选值里`,
            kind: "enum",
            hint: `可选：${node.enums.map(item => `"${item}"`).join("、")}`,
        });
    }

    // object：逐个参数去参数树里找。走哪个分支看实际值，不看文档标的是什么 ——
    // triggers 这种既标 array 又标 object 的，写对象就该按对象比。
    if (actual === "object") {
        const namedChildren = node.children.filter(child => child.name);
        const anonymousChildren = node.children.filter(child => !child.name);

        /**
         * 既标数组又标对象的参数（damage_sensor 的 triggers、environment_sensor 的 triggers），
         * 文档是用一个无名节点描述「数组里的每一项」。写成单个对象时，
         * 要下钻到那个无名节点去比，否则拿传感器自己的参数名去对 triggers 的子节点，全对不上。
         */
        if (!namedChildren.length && anonymousChildren.length) {
            checkNode(anonymousChildren[0], value, path, issues);
            return;
        }

        // 文档没展开的 object（例如 filters 指向实体过滤器一篇）就无从比对，跳过
        if (!namedChildren.length) return;

        // 同一个参数名可能有好几种写法 —— minecraft:health 的 value 既能是整数也能是对象，
        // 文档里就是并列的两个 DataType。这里按名归组，任一通过即可。
        const byName = new Map();
        for (const child of namedChildren) {
            if (!byName.has(child.name)) byName.set(child.name, []);
            byName.get(child.name).push(child);
        }

        /**
         * 驼峰与下划线之争：文档记 broadcast_anger，原版文件写 broadcastAnger，是同一个参数。
         * 去掉下划线再比一次，省得把别名当成「文档没记录」。
         */
        const normalized = new Map();
        for (const name of byName.keys()) {
            normalized.set(name.replace(/_/g, "").toLowerCase(), name);
        }

        for (const key of Object.keys(value)) {
            let candidates = byName.get(key);
            if (!candidates) {
                const alias = normalized.get(key.replace(/_/g, "").toLowerCase());
                if (alias) candidates = byName.get(alias);
            }

            if (!candidates) {
                issues.push({
                    level: "warn",
                    path: `${path}.${key}`,
                    message: "参数不在文档记录里",
                    kind: "unknown",
                });
                continue;
            }

            let worst = null;
            for (const candidate of candidates) {
                const local = [];
                checkNode(candidate, value[key], `${path}.${key}`, local);
                if (!local.length) {
                    worst = [];
                    break;
                }
                if (!worst || local.length < worst.length) worst = local;
            }
            if (worst && worst.length) issues.push(...worst);
        }

        /**
         * 必填只做宽松提示。
         *
         * 文档里存在「二选一」的写法（destructible_by_mining 的 base_time_to_destroy
         * 与已弃用的 seconds_to_destroy 都标了 isRequired），逐条要求会误报，
         * 让 AI 去补一个本来不该存在的参数。所以只在这一层一个必填都没写时才提。
         */
        const required = [...new Set(node.children.filter(child => child.required && child.name).map(child => child.name))];
        const present = required.filter(name => name in value);
        if (required.length && !present.length) {
            issues.push({
                level: "warn",
                path,
                message: `可能缺少必填参数：${required.join("、")}`,
                hint: "文档把这些标注为必填，写法可能有二选一的情况，以下面的详情为准",
            });
        }
        return;
    }

    // array：元素定义可能是单个无名节点（`- <DataType type="string"/>`）
    if (actual === "array" && node.children.length) {
        const itemNode = node.children.find(child => !child.name) || node.children[0];
        value.forEach((element, index) => {
            checkNode(itemNode, element, `${path}[${index}]`, issues);
        });
    }
}

/** 把 JSON 里所有组件键找出来，带上它们在文件里的位置 */
function collectComponents(json, docType) {
    const found = [];
    const seen = new Set();

    const walkComponentBag = (bag, basePath) => {
        if (!bag || typeof bag !== "object" || Array.isArray(bag)) return;
        for (const key of Object.keys(bag)) {
            // 组件键一定带命名空间，其余是注释性字段
            if (!key.includes(":")) continue;
            // 同一个组件写在多个组里很常见，只校验第一次出现的定义
            if (seen.has(key)) continue;
            seen.add(key);
            found.push({ key, value: bag[key], path: `${basePath}.${key}` });
        }
    };

    const rootKey = `minecraft:${docType}`;
    const root = json[rootKey];
    if (!root) {
        // 有的作者会把 description 和 components 直接放顶层
        walkComponentBag(json.components, "components");
        return found;
    }

    walkComponentBag(root.components, `${rootKey}.components`);

    if (root.component_groups) {
        for (const [group, bag] of Object.entries(root.component_groups)) {
            walkComponentBag(bag, `${rootKey}.component_groups.${group}`);
        }
    }

    if (root.events) {
        for (const [event, body] of Object.entries(root.events)) {
            if (body && typeof body === "object") {
                walkComponentBag(body.add, `${rootKey}.events.${event}.add`);
            }
        }
    }

    return found;
}

/** 拼一条「相近的是……」建议 */
function suggest(key, kind) {
    const hits = search(key, { kind, limit: 3 }).map(hit => hit.entry.name);
    return hits.length ? hits.join("、") : "";
}

/**
 * 校验一份附加包 JSON。
 *
 * @param {string} text 文件内容（允许注释与尾逗号）
 * @param {"entity"|"item"|"block"} docType
 */
export function validate(text, docType) {
    let json;
    try {
        json = parseLooseJson(text);
    } catch (error) {
        return {
            fatal: `JSON 语法错误：${error.message}`,
            issues: [],
            checked: 0,
        };
    }

    const kind = KIND_OF[docType];
    if (!kind) {
        return { fatal: `不支持的文档类型：${docType}（可选 entity、item、block）`, issues: [], checked: 0 };
    }

    const components = collectComponents(json, docType);
    const issues = [];

    for (const { key, value, path } of components) {
        const { entry } = get(key, { kind });

        if (!entry) {
            issues.push({
                level: "error",
                path,
                component: key,
                message: `文档里没有这个组件`,
                hint: suggest(key, kind),
            });
            continue;
        }

        const trees = paramTreesOf(entry);
        if (!trees.length) continue;

        // 多态组件：挑毛病最少的那一棵，它才是作者想写的形式。
        // 「参数不存在」比「类型对不上」严重，所以加权优先排掉前者。
        let best = null;
        let bestWeight = Infinity;
        for (const tree of trees) {
            const local = [];
            if (tree.name && tree.name === key) checkNode(tree, value, path, local);
            else checkNode({ ...tree, type: "object", children: tree.children }, value, path, local);
            const weight = local.filter(item => item.kind === "unknown").length * 10 + local.length;
            if (weight < bestWeight) {
                bestWeight = weight;
                best = local;
            }
        }
        if (!best || !best.length) continue;

        for (const issue of best) issues.push({ ...issue, component: key, link: urlOf(entry) });
    }

    // 未知参数补上建议：参数名多半是少个下划线、错个字母
    for (const issue of issues) {
        if (issue.kind !== "unknown") continue;
        const parent = issue.path.slice(0, issue.path.lastIndexOf("."));
        const leaf = issue.path.slice(issue.path.lastIndexOf(".") + 1);
        const owners = components.find(item => parent.endsWith(item.key) || issue.path.includes(item.key));
        if (owners) {
            const { entry } = get(owners.key, { kind });
            const trees = entry ? paramTreesOf(entry) : [];
            const names = new Set();
            for (const tree of trees) for (const child of tree.children) if (child.name) names.add(child.name);
            const near = [...names].filter(name => name.includes(leaf) || leaf.includes(name)).slice(0, 4);
            if (near.length) issue.hint = `相近的参数：${near.join("、")}`;
        }
    }

    return { fatal: "", issues, checked: components.length };
}
