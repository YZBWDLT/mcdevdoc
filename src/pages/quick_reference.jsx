import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
// 构建期由 plugins/interface-index 生成，见那边的 createData。
// 直接 import 而不是走 globalData：这份数据只该跟着本页加载。
import data from "@generated/interface-index/default/index.json";
import OreCheckbox from "../components/oreui/checkbox";
import OreDropdown from "../components/oreui/dropdown";
import styles from "./quick_reference.module.css";

/**
 * 接口速查（/quick_reference）。
 *
 * 数据来自 plugins/interface-index：构建期扫 docs/ 下的接口条目，
 * 每条给出「名称 → 页面#锚点」以及状态标记（实验性 / 弃用 / 移除 / 平台）。
 * 这个页面只做三件事：打分排序、按类型与状态筛选、点进去。
 *
 * 之所以不接 Algolia：全站搜索会把教程、更新日志混进来，而且接口名
 * 这种「带冒号、下划线、驼峰」的字符串恰好是全文检索最不擅长的东西。
 */

/** 允许一次渲染多少条 */
const PAGE_SIZE = 60;

/** 平台筛选：来源是文档里的 <Usable> 与「中国版组件」分组 */
const PLATFORMS = [
    { id: "intl", label: "国际版" },
    { id: "china", label: "中国版" },
];

/**
 * 状态筛选。normal = 没有任何标记。
 * 「实验性」不在这里 —— 它代表功能还没开放，归到游戏版本那一维去管。
 */
const STATES = [
    { id: "normal", label: "常规", title: "没有弃用或移除标记" },
    { id: "deprecated", label: "已弃用" },
    { id: "removed", label: "已移除" },
];

/** 数据里的状态标记，与 STATES 里除 normal 之外的一一对应 */
const STATE_FLAGS = ["deprecated", "removed"];

/**
 * 版本口径：一律以**游戏版本**为准。
 *
 * 文档里三种写法并存 —— 命令标游戏版本（`1.21.70`）、组件标格式版本（`1.26.60`）、
 * 脚本标模块版本（`2.4.0`）。前两种换算到游戏版本后直接比；脚本条目要靠
 * `version_table.md` 那张对照表，先查出「该游戏版本对应的模块版本」再比。
 * 这样把版本调低时，脚本条目也会跟着减少，不会出现「数据驱动全筛掉了、
 * 脚本一条不少」的怪现象。
 *
 * ModAPI 条目标的是中国版版本号（`3.5`），与国际版不是一套编号，
 * 靠 `modapi/version_table.md` 那张中国版对照表换算到国际版游戏版本再比。
 */

/** 格式版本 `1.26.60` → 游戏版本 `26.60`；`1.20.10` 这种早期同号的保持不变 */
function toGameVersion(version) {
    const parts = String(version).split(".").map(Number);
    if (parts.some(Number.isNaN)) return null;
    if (parts.length === 3 && parts[0] === 1 && parts[1] >= 26) return `${parts[1]}.${parts[2]}`;
    return String(version);
}

/**
 * 热修复版本归到对应的主版本。
 *
 * 文档里偶尔会标 `1.21.93` 这种补丁号（`is_baby`、`passenger_of_entity`），
 * 但它和 `1.21.90` 是同一批内容，下拉里单独列一档只会让人分不清。
 * 出现新的补丁号就在这儿加一行。
 */
const HOTFIX_ALIASES = {
    "1.21.93": "1.21.90",
};

/** 条目版本 → 游戏版本（统一口径、归并热修复） */
function gameOf(row) {
    if (row.vtype === "game") return row.version;
    if (row.vtype === "china") return row.chinaGame || null;
    const game = toGameVersion(row.version);
    if (!game) return null;
    return HOTFIX_ALIASES[game] || game;
}

/** 拆成三段数字再比，`1.10` 这种省末位的补齐 */
function versionParts(version) {
    const parts = String(version).split(".").map(Number);
    if (parts.some(Number.isNaN)) return null;
    while (parts.length < 3) parts.push(0);
    return parts;
}

/** 版本号比较：负数表示 a 比 b 旧 */
function cmpVersion(a, b) {
    const left = versionParts(a);
    const right = versionParts(b);
    if (!left || !right) return 0;
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
        const diff = (left[i] || 0) - (right[i] || 0);
        if (diff !== 0) return diff;
    }
    return 0;
}

/**
 * 中国版版本号 → 国际版游戏版本。
 *
 * ModAPI 的版本标识写的是中国版编号（`3.5`），速查页的版本下拉是国际版
 * 游戏版本，两边编号体系不同。`chinaVersionTable` 来自
 * `modapi/version_table.md`，给出中国版每个版本跟进的国际版版本。
 */
function chinaGameOf(chinaVersion, table) {
    // 「未知」和干脆没标版本的一律按 1.9.0：ModAPI 在 2019 年 5 月发布，
    // 当时基于基岩版 1.9.0，所以查 1.9.0 之前必然一条都没有
    if (!chinaVersion || chinaVersion === "未知") return CHINA_ORIGIN;
    if (!table) return "";
    const row = table.find(item => item.china === chinaVersion);
    return row ? row.game : "";
}

/**
 * ModAPI 发布时基于的基岩版版本。标着「未知」的接口一律按它算，
 * 依据是 2019-05-28 中国版正式发布 ModAPI 时的底包。
 */
const CHINA_ORIGIN = "1.9.0";

/** 脚本条目的版本类型：这几种要走对照表换算 */
const SCRIPT_TYPES = {
    script: "server",
    "script-ui": "ui",
    "script-graphics": "graphics",
};

/** 最近看过的条目，存在浏览器本地，只记名字和落点 */
const RECENT_KEY = "mcdevdoc:quick-reference:recent";
const RECENT_MAX = 8;

function readRecent() {
    try {
        const raw = window.localStorage.getItem(RECENT_KEY);
        const list = raw ? JSON.parse(raw) : [];
        return Array.isArray(list) ? list.filter(item => item && item.n && item.p) : [];
    } catch {
        return [];
    }
}

function writeRecent(item) {
    try {
        const list = readRecent().filter(entry => !(entry.p === item.p && entry.a === item.a));
        list.unshift(item);
        const trimmed = list.slice(0, RECENT_MAX);
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(trimmed));
        return trimmed;
    } catch {
        return readRecent();
    }
}

/* ================================================================
   检索
   ================================================================ */

function tokenize(query) {
    return query
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);
}

/**
 * 子序列匹配：token 的字符按顺序出现在 text 里，不要求连续。
 * 命中时返回首尾跨度（越小说明贴得越紧），失败返回 -1。
 *
 * 这是「模糊匹配」那一层：`blkplc` 能命中 `block_placer`，`drgndeath` 能命中
 * `dragondeath`。只对长度 ≥ 3 的纯 ASCII 词元启用 —— 两个字符的子序列几乎能
 * 命中任何条目，中文按字符拆开更没有意义（中文本来就走子串匹配）。
 */
function subsequenceSpan(text, token) {
    let cursor = 0;
    let start = -1;
    let end = -1;

    for (let i = 0; i < text.length && cursor < token.length; i++) {
        if (text[i] !== token[cursor]) continue;
        if (start === -1) start = i;
        end = i;
        cursor += 1;
    }

    return cursor === token.length ? end - start + 1 : -1;
}

/** 该词元能不能参与子序列匹配 */
function canFuzzy(token) {
    return token.length >= 3 && !/[\u4e00-\u9fa5]/.test(token);
}

/**
 * 给一行打分。词元之间是「与」关系，任一词元不命中就淘汰。
 *
 * 去前缀的名字（bare）比原名优先：用户基本不会输入 `/execute` 里的斜杠，
 * 也不会敲 `minecraft:`，所以「bare 等于查询词」的强度要高于原名。
 * 长度差扣分是为了让 `execute` 排在 `execute_event_on_home_block` 前面。
 */
function scoreOf(row, tokens) {
    let total = 0;

    for (const token of tokens) {
        let score = 0;

        if (row.lower === token) {
            score = 1000;
        } else if (row.bareLower === token) {
            score = 900;
        } else if (row.bareLower.startsWith(token)) {
            score = 740 - Math.min(90, (row.bareLower.length - token.length) * 2);
        } else if (row.lower.startsWith(token)) {
            score = 700 - Math.min(90, (row.lower.length - token.length) * 2);
        } else if (row.lower.includes(token)) {
            score = 520;
        } else if (row.bareLower.includes(token)) {
            score = 480;
        } else if (row.aliasLower.some(alias => alias.includes(token))) {
            score = 420;
        } else if (row.descLower.includes(token)) {
            score = 140;
        } else if (canFuzzy(token)) {
            // 模糊层：字形按顺序散在名字里也算命中，但分数压在所有精确命中之下
            const tightest = Math.min(
                ...[row.lower, row.bareLower]
                    .map(text => subsequenceSpan(text, token))
                    .filter(span => span > 0),
            );
            // 跨度太散就不认了，否则 `xyz` 能把半张表捞出来
            if (!(tightest > 0 && tightest <= token.length * 3 + 2)) return 0;
            // 同样散着命中时，首字母就打头的那条更可能是想找的：
            // 搜 `dgn` 应该先给 `dragondeath`，而不是 `is_digging`
            const headStart = row.bareLower.startsWith(token[0]) ? 15 : 0;
            score = 300 - Math.min(80, (tightest - token.length) * 6) + headStart;
        } else {
            return 0;
        }

        total += score;
    }

    return total;
}

/* ================================================================
   高亮
   ================================================================ */

function hitRanges(text, tokens) {
    const lower = text.toLowerCase();
    const ranges = [];

    for (const token of tokens) {
        if (!token) continue;
        let from = 0;
        while (from <= lower.length - token.length) {
            const at = lower.indexOf(token, from);
            if (at === -1) break;
            ranges.push([at, at + token.length]);
            from = at + token.length;
        }
    }

    ranges.sort((a, b) => a[0] - b[0]);

    const merged = [];
    for (const range of ranges) {
        const last = merged[merged.length - 1];
        if (last && range[0] <= last[1]) {
            last[1] = Math.max(last[1], range[1]);
        } else {
            merged.push([range[0], range[1]]);
        }
    }
    return merged;
}

function Highlighted({ text, tokens }) {
    if (!tokens.length) return <>{text}</>;

    const ranges = hitRanges(text, tokens);
    if (ranges.length === 0) return <>{text}</>;

    const parts = [];
    let cursor = 0;
    ranges.forEach(([start, end], index) => {
        if (start > cursor) parts.push(text.slice(cursor, start));
        parts.push(<mark key={index}>{text.slice(start, end)}</mark>);
        cursor = end;
    });
    if (cursor < text.length) parts.push(text.slice(cursor));

    return <>{parts}</>;
}

/**
 * 名称高亮 + 前缀弱化。
 * 前缀（`minecraft:`、`Entity.`、`/`）压暗，其余亮白；命中处再压一层 mark。
 */
function NameText({ name, tokens, prefixLength }) {
    const ranges = tokens.length ? hitRanges(name, tokens) : [];

    const cuts = new Set([0, prefixLength, name.length]);
    ranges.forEach(([start, end]) => {
        cuts.add(start);
        cuts.add(end);
    });

    const points = [...cuts].filter(point => point >= 0 && point <= name.length).sort((a, b) => a - b);
    const parts = [];

    for (let i = 0; i < points.length - 1; i++) {
        const start = points[i];
        const end = points[i + 1];
        if (start === end) continue;

        const text = name.slice(start, end);
        const isHit = ranges.some(([a, b]) => start >= a && end <= b);
        const isPrefix = end <= prefixLength;

        if (isHit) {
            parts.push(<mark key={i}>{text}</mark>);
        } else if (isPrefix) {
            parts.push(
                <span key={i} className={styles.namespace}>
                    {text}
                </span>,
            );
        } else {
            parts.push(<span key={i}>{text}</span>);
        }
    }

    return <>{parts}</>;
}

/** 名称的前缀长度：minecraft: / 斜杠命令 / 类名
 *  点号不压暗：`Block.east` 里的点若跟着类名一起变灰，整行看起来像两个词。 */
function prefixLengthOf(name) {
    if (name.startsWith("/")) return 1;
    if (name.includes(":")) return name.indexOf(":") + 1;
    if (name.includes(".")) return name.indexOf(".");
    return 0;
}

/* ================================================================
   杂项
   ================================================================ */

const SIDE_LABEL = { server: "服务端", client: "客户端" };

/** 从地址栏读初始条件：?q=&k=&p=&s=（列表用逗号分隔） */
function readParams() {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const list = key => {
        const value = params.get(key);
        return value ? value.split(",").filter(Boolean) : null;
    };
    return {
        query: params.get("q") || "",
        kinds: list("k"),
        platforms: list("p"),
        states: list("s"),
        version: params.get("v") || "all",
        onlyCurrent: params.get("c") === "1",
    };
}

/** 切换一个集合里的成员，返回新集合（React 需要新引用才会重渲染） */
function toggled(source, id, on) {
    const next = new Set(source);
    if (on) next.add(id);
    else next.delete(id);
    return next;
}

export default function QuickReference() {
    const baseUrl = useBaseUrl("/");
    const inputRef = useRef(null);
    const initial = useRef(readParams());
    /** 每行的 DOM，键盘上下移动时要把选中项滚进视野 */
    const rowRefs = useRef([]);
    /** 这次 active 变化是键盘引起的吗？鼠标划过去也跟着变，不该触发滚动 */
    const byKeyboard = useRef(false);

    const allKindIds = useMemo(() => data.kinds.map(item => item.id), []);
    const kindOrder = useMemo(() => {
        const map = {};
        data.kinds.forEach((item, index) => {
            map[item.id] = index;
        });
        return map;
    }, []);
    const kindLabel = useMemo(() => {
        const map = {};
        data.kinds.forEach(item => {
            map[item.id] = item.label;
        });
        return map;
    }, []);

    const [query, setQuery] = useState(initial.current.query || "");
    const [activeKinds, setActiveKinds] = useState(
        () => new Set(initial.current.kinds || allKindIds),
    );
    const [activePlatforms, setActivePlatforms] = useState(
        () => new Set(initial.current.platforms || PLATFORMS.map(item => item.id)),
    );
    const [activeStates, setActiveStates] = useState(
        () => new Set(initial.current.states || STATES.map(item => item.id)),
    );
    const [versionLimit, setVersionLimit] = useState(initial.current.version || "all");
    const [onlyCurrent, setOnlyCurrent] = useState(initial.current.onlyCurrent || false);
    const [recent, setRecent] = useState([]);
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [active, setActive] = useState(0);

    /** 预处理一次：展开页表、算好平台与状态 */
    const rows = useMemo(() => {
        return data.items.map(([name, pageIndex, anchor, version, desc, aliasStr, tag, flagStr, vtype]) => {
                const page = data.pages[pageIndex];
                const flags = flagStr ? flagStr.split(",") : [];
                const states = flags.filter(flag => STATE_FLAGS.includes(flag));

                let bare = name;
                if (name.includes(":")) bare = name.slice(name.indexOf(":") + 1);
                else if (name.startsWith("/")) bare = name.slice(1);

                const isChina = String(page.k).startsWith("modapi") || vtype === "china";
                // game 只给数据驱动条目：脚本走模块版本，中国版走 chinaGame
                const game = isChina || SCRIPT_TYPES[vtype] ? null : gameOf({ vtype, version });

                return {
                    name,
                    bare,
                    anchor,
                    version,
                    vtype: vtype || "",
                    // ModAPI 条目标中国版版本号，换算成国际版游戏版本才能跟下拉里的版本比
                    chinaGame: isChina ? chinaGameOf(version, data.chinaVersionTable) : "",
                    desc,
                    tag,
                    kind: page.k,
                    group: page.g,
                    page: page.p,
                    prefix: prefixLengthOf(name),
                    game,
                    platform: flags.includes("china") ? "china" : "intl",
                    // 实验性单独一维：它代表「还没开放」，由游戏版本去筛
                    isExperimental: flags.includes("experimental"),
                    // 筛选要认全部标记，但显示只报一个最要紧的（移除 > 弃用）
                    states: states.length ? states : ["normal"],
                    state: states.includes("removed")
                        ? "removed"
                        : states.includes("deprecated")
                          ? "deprecated"
                          : "",
                    lower: name.toLowerCase(),
                    bareLower: bare.toLowerCase(),
                    descLower: (desc || "").toLowerCase(),
                    aliasLower: aliasStr ? aliasStr.toLowerCase().split("|") : [],
                };
            });
    }, []);

    const tokens = useMemo(() => tokenize(query), [query]);
    const orderOf = useCallback(row => kindOrder[row.kind] ?? 99, [kindOrder]);

    /**
     * 游戏版本 X 对应的脚本模块版本。
     * 表里没有 X 就取「不高于 X 的最后一档」—— 玩家报的版本往往不在表里。
     * 返回空字符串表示那一版还没有这个模块（表里写的是 `——`）。
     */
    const scriptLimitFor = useCallback((game, moduleKey) => {
        let best = null;
        for (const row of data.versionTable || []) {
            if (cmpVersion(row.game, game) > 0) continue;
            if (!best || cmpVersion(row.game, best.game) > 0) best = row;
        }
        return best ? best[moduleKey] || "" : "";
    }, []);

    /**
     * 版本筛选：只留下「该版本及之前就已加入」的接口。
     * 没标版本的不动 —— 文档里漏标很常见，不能因此把它们判死。
     */
    const passesVersion = useCallback(
        row => {
            // 选了「实验性玩法」就只看还没开放的接口
            if (versionLimit === "experimental") return row.isExperimental;
            if (versionLimit === "all") return true;
            // 实验性接口还没正式开放，任何正式版本里都拿不到
            if (row.isExperimental) return false;

            const moduleKey = SCRIPT_TYPES[row.vtype];
            if (moduleKey) {
                const limit = scriptLimitFor(versionLimit, moduleKey);
                // 那一版还没这个模块，这批接口（含没标版本的）都不可能存在
                if (!limit) return false;
                if (!row.version) return true;
                return cmpVersion(row.version, limit) <= 0;
            }

            // ModAPI 条目标的是中国版版本号，先换算成国际版版本再比。
            // 标着「未知」的按 1.9.0 计，所以选 1.9.0 时看得到它们、选 1.8.0 时一条都没有。
            if (row.vtype === "china" || String(row.kind).startsWith("modapi")) {
                if (!row.chinaGame) return true; // 对照表里查不到的版本，先不筛
                return cmpVersion(row.chinaGame, versionLimit) <= 0;
            }

            // 换算不出游戏版本的（数据驱动里漏标版本的）保留，不误杀
            if (!row.game) return true;
            return cmpVersion(row.game, versionLimit) <= 0;
        },
        [versionLimit, scriptLimitFor, data.chinaVersionTable],
    );

    /**
     * 这条是不是「本版新增」。
     * 数据驱动类比游戏版本，脚本类比该版本对应的模块版本；拿不到基准版本就不筛，
     * 宁可多显示几条，也不要让整张表空掉。
     */
    const isCurrent = useCallback(
        row => {
            // 选了具体版本就看那一版新增的；「不限」与「实验性玩法」都退回文档基准版本
            const target =
                versionLimit === "all" || versionLimit === "experimental"
                    ? data.currentGame
                    : versionLimit;
            if (!target) return true;
            if (!row.version) return false;

            const moduleKey = SCRIPT_TYPES[row.vtype];
            if (moduleKey) {
                return row.version === scriptLimitFor(target, moduleKey);
            }

            // ModAPI：和筛选用同一套口径 —— 换算后的国际版版本相等就算本版新增。
            // 一个国际版版本被多个中国版跟进时，这些中国版的接口都算得上。
            if (row.vtype === "china" || String(row.kind).startsWith("modapi")) {
                const targetGame =
                    versionLimit === "all" || versionLimit === "experimental"
                        ? chinaGameOf(data.currentChina, data.chinaVersionTable)
                        : versionLimit;
                if (!targetGame) return false;
                return row.chinaGame === targetGame;
            }

            return gameOf(row) === target;
        },
        [scriptLimitFor, versionLimit, data.chinaVersionTable, data.currentChina],
    );

    /** 下拉里的版本列表：数据里出现过的游戏版本 + 对照表里的版本，新的在上 */
    const versionOptions = useMemo(() => {
        const set = new Set();
        for (const row of rows) {
            // 中国版条目换算出来的国际版版本也要能选到
            const game = row.game || row.chinaGame;
            if (game && versionParts(game)) set.add(game);
        }
        for (const row of data.versionTable || []) set.add(row.game);
        // 中国版对应表里的国际版版本也要能选，否则筛不到早期中国版的接口
        for (const row of data.chinaVersionTable || []) set.add(row.game);

        const list = [...set].sort((a, b) => cmpVersion(b, a));
        return [
            { value: "all", label: "不限" },
            { value: "experimental", label: "实验性玩法" },
            ...list.map(item => ({ value: item, label: item })),
        ];
    }, [rows]);

    /** 各分类在当前查询与筛选下的命中数 —— 就是勾选项后面的数字 */
    const counts = useMemo(() => {
        const map = {};
        for (const row of rows) {
            if (!activePlatforms.has(row.platform)) continue;
            if (!row.states.some(state => activeStates.has(state))) continue;
            if (!passesVersion(row)) continue;
            if (onlyCurrent && !isCurrent(row)) continue;
            if (tokens.length && scoreOf(row, tokens) === 0) continue;
            map[row.kind] = (map[row.kind] || 0) + 1;
        }
        return map;
    }, [rows, tokens, activePlatforms, activeStates, passesVersion, onlyCurrent, isCurrent]);

    const results = useMemo(() => {
        const pool = rows.filter(
            row =>
                activeKinds.has(row.kind) &&
                activePlatforms.has(row.platform) &&
                row.states.some(state => activeStates.has(state)) &&
                passesVersion(row) &&
                (!onlyCurrent || isCurrent(row)),
        );

        if (tokens.length === 0) {
            // 没有关键词：按文档分类聚拢，方便一屏一屏往下扫
            return pool.sort(
                (a, b) => orderOf(a) - orderOf(b) || a.name.localeCompare(b.name),
            );
        }

        const scored = [];
        for (const row of pool) {
            const score = scoreOf(row, tokens);
            if (score > 0) scored.push({ row, score });
        }
        scored.sort(
            (a, b) =>
                b.score - a.score ||
                a.row.name.length - b.row.name.length ||
                a.row.name.localeCompare(b.row.name),
        );

        return scored.map(item => item.row);
    }, [rows, activeKinds, activePlatforms, activeStates, tokens, orderOf, passesVersion, onlyCurrent, isCurrent]);

    useEffect(() => {
        setLimit(PAGE_SIZE);
        setActive(0);
        byKeyboard.current = false;
    }, [query, activeKinds, activePlatforms, activeStates, versionLimit, onlyCurrent]);

    /** 方向键换行时，把选中项滚到看得见的地方（hover 引起的变化不滚） */
    useEffect(() => {
        if (!byKeyboard.current) return;
        rowRefs.current[active]?.scrollIntoView({ block: "nearest" });
    }, [active]);

    /** 最近查看只存在浏览器里，SSR 阶段拿不到，挂载后再读 */
    useEffect(() => {
        setRecent(readRecent());
    }, []);

    const clearRecent = useCallback(() => {
        try {
            window.localStorage.removeItem(RECENT_KEY);
        } catch {
            // 存不进去也无所谓，界面上清掉就行
        }
        setRecent([]);
    }, []);

    /** 地址栏跟着走，方便把结果链接发出去 */
    useEffect(() => {
        if (typeof window === "undefined") return;

        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (activeKinds.size !== allKindIds.length) params.set("k", [...activeKinds].join(","));
        if (activePlatforms.size !== PLATFORMS.length) params.set("p", [...activePlatforms].join(","));
        if (activeStates.size !== STATES.length) params.set("s", [...activeStates].join(","));
        if (versionLimit !== "all") params.set("v", versionLimit);
        if (onlyCurrent) params.set("c", "1");

        const search = params.toString();
        const next = `${window.location.pathname}${search ? `?${search}` : ""}`;
        if (next !== `${window.location.pathname}${window.location.search}`) {
            window.history.replaceState(window.history.state, "", next);
        }
    }, [query, activeKinds, activePlatforms, activeStates, versionLimit, onlyCurrent, allKindIds]);

    /** 按 `/` 聚焦搜索框 */
    useEffect(() => {
        const onKeyDown = event => {
            if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
            const tag = event.target?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            event.preventDefault();
            inputRef.current?.focus();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const visible = results.slice(0, limit);

    /** 站内相对路径（给 <Link>，它会自己补 baseUrl） */
    const pathOf = row => `${row.page}${row.anchor ? `#${row.anchor}` : ""}`;
    /** 绝对路径（键盘回车直接跳转时用） */
    const absoluteOf = useCallback(
        row => `${baseUrl}${pathOf(row).replace(/^\//, "")}`,
        [baseUrl], // eslint-disable-line react-hooks/exhaustive-deps
    );

    const onInputKeyDown = event => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            byKeyboard.current = true;
            setActive(index => Math.min(index + 1, visible.length - 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            byKeyboard.current = true;
            setActive(index => Math.max(index - 1, 0));
        } else if (event.key === "Enter") {
            const row = visible[active];
            if (row) window.location.assign(absoluteOf(row));
        } else if (event.key === "Escape") {
            if (query) setQuery("");
            else inputRef.current?.blur();
        }
    };

    const allKindsOn = activeKinds.size === allKindIds.length;

    return (
        <Layout title="接口速查" description="按名称查询命令、数据驱动组件、实体事件、过滤器与脚本接口。">
            <div className="page">
                <h1 className="page__title">接口速查</h1>
                <p className="page__intro">
                    在这里快速查询命令、数据驱动物品方块实体接口和脚本接口，支持模糊匹配，支持中文搜索相关接口。
                </p>

                <section className="page__group">
                    <div className={styles.search}>
                        <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                fill="currentColor"
                                d="M15.5 14h-.79l-.28-.27a6.47 6.47 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.47 6.47 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                            />
                        </svg>
                        <input
                            ref={inputRef}
                            className={`oreui-input ${styles.input}`}
                            value={query}
                            placeholder="试试 execute、block_placer、可攀爬、ActorHurt"
                            aria-label="接口名称"
                            onChange={event => setQuery(event.target.value)}
                            onKeyDown={onInputKeyDown}
                            autoComplete="off"
                            spellCheck={false}
                        />
                        {query ? (
                            <button
                                type="button"
                                className={styles.clear}
                                aria-label="清空"
                                onClick={() => {
                                    setQuery("");
                                    inputRef.current?.focus();
                                }}
                            />
                        ) : (
                            <kbd className={styles.slash}>/</kbd>
                        )}
                    </div>

                    <div className={styles.filters}>
                        <div className={styles.filterHead}>
                            <span className={styles.filterTitle}>接口类型</span>
                            <span className={styles.filterActions}>
                                <button
                                    type="button"
                                    className={styles.filterAction}
                                    onClick={() => setActiveKinds(new Set(allKindIds))}
                                    disabled={allKindsOn}
                                >
                                    全选
                                </button>
                                <button
                                    type="button"
                                    className={styles.filterAction}
                                    onClick={() => setActiveKinds(new Set())}
                                    disabled={activeKinds.size === 0}
                                >
                                    全不选
                                </button>
                            </span>
                        </div>

                        <div className={styles.checkGrid}>
                            {data.kinds.map(item => (
                                <OreCheckbox
                                    key={item.id}
                                    checked={activeKinds.has(item.id)}
                                    count={counts[item.id] || 0}
                                    label={item.label}
                                    title={item.desc}
                                    onChange={on => setActiveKinds(prev => toggled(prev, item.id, on))}
                                />
                            ))}
                        </div>

                        <div className={styles.filterRow}>
                            <span className={styles.filterTitle}>平台</span>
                            <div className={styles.inlineChecks}>
                                {PLATFORMS.map(item => (
                                    <OreCheckbox
                                        key={item.id}
                                        checked={activePlatforms.has(item.id)}
                                        label={item.label}
                                        onChange={on =>
                                            setActivePlatforms(prev => toggled(prev, item.id, on))
                                        }
                                    />
                                ))}
                            </div>

                            <span className={styles.filterTitle}>状态</span>
                            <div className={styles.inlineChecks}>
                                {STATES.map(item => (
                                    <OreCheckbox
                                        key={item.id}
                                        checked={activeStates.has(item.id)}
                                        label={item.label}
                                        title={item.title}
                                        onChange={on => setActiveStates(prev => toggled(prev, item.id, on))}
                                    />
                                ))}
                            </div>

                            <span
                                className={styles.filterTitle}
                                title="只保留该游戏版本及之前就已加入的接口。脚本接口按版本对照表换算成对应的模块版本再比，ModAPI 的中国版版本同样换算到国际版版本再比。"
                            >
                                游戏版本
                            </span>
                            <div className={styles.versionPick}>
                                <OreDropdown
                                    options={versionOptions}
                                    value={versionLimit}
                                    onChange={setVersionLimit}
                                    label="游戏版本上限"
                                />
                            </div>

                            {/* 「实验性玩法」不是一个版本号，没有「新增」可言 */}
                            {versionLimit !== "experimental" && (
                                <div className={styles.inlineChecks}>
                                    <OreCheckbox
                                        checked={onlyCurrent}
                                        label={`只看 ${versionLimit === "all" ? data.currentGame || "本版" : versionLimit} 新增`}
                                        title="只保留上面所选版本（未选则是文档基准版本）里新增的接口"
                                        onChange={setOnlyCurrent}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {!tokens.length && recent.length > 0 && (
                        <div className={styles.recent}>
                            <span className={styles.recentLabel}>最近查看</span>
                            {recent.map(item => (
                                <Link
                                    key={`${item.p}#${item.a}`}
                                    to={`${item.p}${item.a ? `#${item.a}` : ""}`}
                                    className={styles.recentItem}
                                >
                                    {item.n}
                                </Link>
                            ))}
                            <button type="button" className={styles.recentClear} onClick={clearRecent}>
                                清除
                            </button>
                        </div>
                    )}

                    <p className={styles.summary}>
                        {tokens.length ? (
                            <>
                                找到 <strong>{results.length}</strong> 条
                            </>
                        ) : (
                            <>
                                共 <strong>{results.length}</strong> 条
                            </>
                        )}
                        {activeKinds.size === 0 && <> · 没有勾选任何接口类型</>}
                    </p>

                    <div className={`oreui-panel oreui-panel--light ${styles.results}`}>
                        {visible.map((row, index) => (
                            <Link
                                key={`${row.page}#${row.anchor}#${row.name}`}
                                ref={element => {
                                    rowRefs.current[index] = element;
                                }}
                                to={pathOf(row)}
                                className={`${styles.row} ${index === active ? styles.rowActive : ""}`}
                                onMouseEnter={() => {
                                    byKeyboard.current = false;
                                    setActive(index);
                                }}
                                onClick={() => {
                                    setRecent(
                                        writeRecent({ n: row.name, p: row.page, a: row.anchor }),
                                    );
                                }}
                            >
                                <span className={styles.name}>
                                    <NameText name={row.name} tokens={tokens} prefixLength={row.prefix} />
                                </span>

                                <span className={styles.meta}>
                                    {row.isExperimental && (
                                        <span className={styles.badgeExp} title="需要开启实验性玩法，正式版本里拿不到">
                                            实验性
                                        </span>
                                    )}
                                    {row.state === "deprecated" && (
                                        <span className={styles.badgeDep}>已弃用</span>
                                    )}
                                    {row.state === "removed" && (
                                        <span className={styles.badgeRem}>已移除</span>
                                    )}
                                    {row.version && (
                                        <span
                                            className={styles.version}
                                            title={
                                                row.vtype === "china"
                                                    ? `中国版 ${row.version} 加入`
                                                    : "加入版本"
                                            }
                                        >
                                            {row.version}
                                        </span>
                                    )}
                                    {SIDE_LABEL[row.tag] && (
                                        <span className={`${styles.side} ${styles[row.tag]}`}>
                                            {SIDE_LABEL[row.tag]}
                                        </span>
                                    )}
                                </span>

                                {row.desc && (
                                    <span className={styles.desc}>
                                        <Highlighted text={row.desc} tokens={tokens} />
                                    </span>
                                )}

                                <span className={styles.crumb}>
                                    {row.group && row.group !== kindLabel[row.kind]
                                        ? `${kindLabel[row.kind]} · ${row.group}`
                                        : kindLabel[row.kind]}
                                </span>
                            </Link>
                        ))}

                        {visible.length === 0 && (
                            <p className={styles.empty}>
                                {activeKinds.size === 0
                                    ? "上面一个接口类型都没勾。"
                                    : "没有匹配的条目。试试更短的关键词，或者把上面的筛选项放开一些。"}
                            </p>
                        )}
                    </div>

                    {results.length > visible.length && (
                        <button
                            type="button"
                            className={styles.more}
                            onClick={() => setLimit(value => value + PAGE_SIZE)}
                        >
                            还有 {results.length - visible.length} 条，继续加载
                        </button>
                    )}
                </section>
            </div>
        </Layout>
    );
}
