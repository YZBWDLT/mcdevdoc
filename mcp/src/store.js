/**
 * 索引的加载、检索与渲染。
 *
 * 检索刻意做得很轻：4670 条全在内存里线性扫一遍也就几毫秒，
 * 不需要倒排索引。重要的是打分规则 —— 名称精确命中必须排第一，
 * 中文描述命中排后面，否则搜 `damage` 会被一堆描述里带「伤害」的组件淹没。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mdxToText, tableRowToText } from "./format.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.resolve(here, "../data/interfaces.json");

let CACHE = null;

/** 版本号属于哪一套编号体系，用来避免拿中国版 3.10 去比国际版 26.60 */
function versionScope(vtype, flags) {
    if (vtype === "script") return "server 模块";
    if (vtype === "script-ui") return "server-ui 模块";
    if (vtype === "script-graphics") return "server-graphics 模块";
    if (vtype === "china" || (flags || []).includes("china")) return "中国版";
    if (vtype === "format") return "格式版本";
    return "游戏版本";
}

/**
 * ModAPI 条目的摘要抽到的是「获取组件：`xxx`」那一行，对搜索和展示都没用。
 * 这里往下找第一句真正的中文描述顶上。
 */
function betterDesc(desc, body) {
    if (!/^获取组件[：:]/.test(desc)) return desc;

    for (const raw of String(body).split(/\r?\n/)) {
        const line = raw.trim();
        if (!line) continue;
        if (line.startsWith("<")) continue;
        if (/^获取组件/.test(line)) continue;
        if (!/[\u4e00-\u9fa5]/.test(line)) continue;

        const text = line
            .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
            .replace(/`/g, "")
            .trim();
        if (text.length >= 4) return text.length > 90 ? `${text.slice(0, 90)}…` : text;
    }
    return desc;
}

export function load() {
    if (CACHE) return CACHE;

    if (!fs.existsSync(DATA_PATH)) {
        throw new Error(
            `数据文件不存在：${DATA_PATH}\n先在 mcp/ 目录下执行 npm run build:data`
        );
    }

    const raw = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
    const entries = raw.items.map((row, i) => {
        const flags = row[7] ? row[7].split(",") : [];
        const page = raw.pages[row[1]] || { p: "", k: "", g: "", t: "" };
        const desc = betterDesc(row[4] || "", row[9] || "");
        return {
            id: i,
            name: row[0],
            page,
            anchor: row[2] || "",
            version: row[3] || "",
            desc,
            aliases: row[5] ? row[5].split("|") : [],
            tag: row[6] || "",
            flags,
            scope: versionScope(row[8], flags),
            body: row[9] || "",
            lower: String(row[0]).toLowerCase(),
            // 算词频用的一整串，比逐字段 includes 快得多
            blob: [row[0], row[5] || "", page.g || "", page.t || "", desc]
                .join(" ")
                .toLowerCase(),
        };
    });

    CACHE = { ...raw, entries };
    return CACHE;
}

export function kinds() {
    return load().kinds;
}

export function urlOf(entry) {
    const data = load();
    const base = `${data.site}${entry.page.p}`;
    return entry.anchor ? `${base}#${entry.anchor}` : base;
}

/* ================================================================
   检索
   ================================================================ */

function scoreOne(entry, term) {
    const lower = term.toLowerCase();
    const name = entry.lower;
    // 名称末段：minecraft:behavior.xxx 的 xxx、Entity.addEffect 的 addEffect。
    // 搜简称命中末段，比搜到「以它开头」的另一个名字更贴近本意。
    const tail = name.slice(Math.max(name.lastIndexOf("."), name.lastIndexOf(":")) + 1);
    let score = 0;

    if (name === lower) score += 1000;
    else if (name.replace(/^minecraft:/, "") === lower) score += 950;
    else if (tail === lower) score += 900;
    else if (entry.aliases.some(alias => alias.toLowerCase() === lower)) score += 860;
    else if (name.startsWith(lower)) score += 700 - Math.min(name.length - lower.length, 120);
    else if (name.includes(lower)) score += 500;
    else if (entry.aliases.some(alias => alias.toLowerCase().includes(lower))) score += 380;

    // 中文分类与页面标题：「实体过滤器」「GameTest」这些也在搜的东西
    const haystack = `${entry.page.g || ""} ${entry.page.t || ""}`;
    if (haystack.toLowerCase().includes(lower)) score += 160;

    if (entry.desc.toLowerCase().includes(lower)) score += 90;

    return score;
}

/**
 * 中文虚词。长句里「让生物…」的「让」、「…的敌人」的「的」切开会产生一堆噪声二字词，
 * 「让生」「的敌」这种组合在库里能凑巧撞上别的条目，把真正该排第一的挤下去。
 * 只在长句上生效，短关键词原样保留。
 */
const STOP_CHARS = /[让使的了吗呢吧啊呀怎如何能否会把被]/g;

/** 长中文句子拆成二字词，否则「血量低于一半会逃跑」一个也匹配不上 */
function tokenize(query) {
    const cleaned = query.length > 4 ? query.replace(STOP_CHARS, "") : query;
    const parts = cleaned.split(/[\s,，、。;；:：]+/).filter(Boolean);
    const out = new Set();
    for (const part of parts) {
        out.add(part);
        if (/[\u4e00-\u9fa5]/.test(part) && part.length >= 3) {
            for (let i = 0; i + 2 <= part.length; i++) out.add(part.slice(i, i + 2));
        }
    }
    return [...out];
}

export function search(query, { kind, limit = 8 } = {}) {
    const q = String(query || "").trim();
    if (!q) return [];

    const data = load();
    const pool = kind ? data.entries.filter(entry => entry.page.k === kind) : data.entries;
    const terms = tokenize(q);
    const hits = [];

    // 整句命中（名称、别名、描述里确实有这一整句）优先，这一路不参与分词。
    // 加 200 基底是为了让「整句匹配」稳定压过「拆词后凑巧命中好几个词」。
    const rest = [];
    for (const entry of pool) {
        const whole = scoreOne(entry, q);
        if (whole > 0) hits.push({ entry, score: whole + 200 });
        else rest.push(entry);
    }

    if (rest.length) {
        /**
         * 词频：一个词在库里出现得越多，越可能是「物品」「自定义」这种泛词。
         * 不降权的话，搜「怎么给物品加耐久」会被一堆「物品」相关的条目淹掉，
         * 真正该排第一的 minecraft:durability 反而沉底。
         */
        const df = new Map();
        for (const term of terms) {
            const lower = term.toLowerCase();
            let count = 0;
            for (const entry of rest) if (entry.blob.includes(lower)) count += 1;
            df.set(term, Math.max(count, 1));
        }
        const weightOf = term => 1 / Math.log(1 + df.get(term));

        for (const entry of rest) {
            let score = 0;
            for (const term of terms) {
                const part = scoreOne(entry, term);
                if (part > 0) score += Math.min(part, 300) * weightOf(term);
            }
            if (score > 0) hits.push({ entry, score });
        }
    }

    hits.sort((a, b) => b.score - a.score || a.entry.name.length - b.entry.name.length);

    const cap = Math.min(Math.max(limit, 1), 40);
    return hits.slice(0, cap);
}

/**
 * 精确取一个条目。
 *
 * 脚本接口里同名很常见（`SetPos` 在好几个组件下都有，`getComponent` 每个类都有），
 * 所以除主命中之外还要回带候选，让 AI 知道有歧义。
 */
export function get(name, { kind } = {}) {
    const raw = String(name || "").trim();
    if (!raw) return { entry: null, others: [], candidates: [] };

    const data = load();
    const target = raw.toLowerCase();
    const pool = kind ? data.entries.filter(entry => entry.page.k === kind) : data.entries;

    const match = (predicate) => pool.filter(predicate);

    let hits = match(entry => entry.lower === target);
    if (!hits.length) hits = match(entry => entry.aliases.some(a => a.toLowerCase() === target));
    if (!hits.length) {
        hits = match(
            entry => entry.lower.endsWith(`.${target}`) || entry.lower.endsWith(`:${target}`)
        );
    }

    if (!hits.length) {
        return { entry: null, others: [], candidates: search(raw, { kind, limit: 6 }) };
    }

    // 有正文的排前面：锚点为空（表格条目）拿到也没法展开
    hits = [...hits].sort((a, b) => b.body.length - a.body.length);
    return { entry: hits[0], others: hits.slice(1, 6), candidates: [] };
}

/* ================================================================
   渲染成给 AI 的文本
   ================================================================ */

/** 一行摘要，搜索结果用 */
export function renderHit(entry, index) {
    const meta = [entry.page.k, entry.group || entry.page.g].filter(Boolean).join(" · ");
    const version = entry.version ? `｜${entry.scope} ${entry.version}` : "";
    return `${index}. ${entry.name}${version}\n   ${meta}｜${entry.desc}\n   ${urlOf(entry)}`;
}

/** 完整条目，get_interface 用 */
export function renderEntry(entry) {
    const lines = [];
    lines.push(`# ${entry.name}`);

    const meta = [];
    if (entry.page.k) meta.push(`类别：${entry.page.k}`);
    if (entry.group || entry.page.g) meta.push(`分组：${entry.group || entry.page.g}`);
    if (entry.page.t) meta.push(`所在页面：${entry.page.t}`);
    if (entry.version) meta.push(`版本：${entry.version}（${entry.scope}）`);

    const state = [];
    if (entry.flags.includes("experimental")) state.push("实验性");
    if (entry.flags.includes("deprecated")) state.push("已弃用");
    if (entry.flags.includes("removed")) state.push("已移除");
    if (entry.flags.includes("china")) state.push("仅中国版");
    if (state.length) meta.push(`状态：${state.join("、")}`);

    lines.push(meta.join("\n"));
    lines.push(`站内链接：${urlOf(entry)}`);

    if (entry.desc) lines.push(`\n${entry.desc}`);

    // Molang 与标签的正文是表格的一行，拆成「名称 —— 说明」；
    // 多行表格（枚举值那种）得原样留着，Markdown 表格 AI 直接能读，塌成一行反而毁了
    const bodyLines = entry.body.split(/\r?\n/).filter(line => line.trim());
    const isSingleRow = bodyLines.length === 1 && /^\s*\|/.test(bodyLines[0]);
    let detail = isSingleRow ? tableRowToText(bodyLines[0]) : mdxToText(entry.body);

    // 正文开头的定义句和摘要本来就是同一句，重复一遍只是浪费 token
    if (entry.desc) detail = detail.replace(entry.desc, "").replace(/^[\s，。、]+/, "").trim();

    // ModAPI 正文里 `<Client/>` 后面跟着的那个单词是它所属的组件类
    detail = detail
        .replace(/^([A-Za-z]+Comp(?:Client)?)$/gm, "所属组件：$1")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    if (detail) {
        lines.push(`\n## 详情\n\n${detail}`);
    }

    return lines.join("\n");
}
