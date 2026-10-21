const fs = require("fs");
const path = require("path");

/**
 * 本地插件：把 `update-log/*.md`（一天一个文件）解析成结构化数据，
 * 同时供 /update_log 页面与首页「最近更新」区块使用。
 *
 * 为什么放在插件里：页面组件跑在浏览器里读不了 fs；loadContent 是纯 Node 环境，
 * 读完 setGlobalData 传给页面即可。首页原先那个 recent-updates 插件已合并到这里。
 *
 * 文件约定（update-log/YYYY-MM-DD.md）：
 *   # 2026 年 10 月 21 日        ← 可选，标题行会被忽略
 *   > 一句想说的话                ← 可选，引用块忽略
 *   - 动词 说明                  ← 一级条目，动词会被抽出来做标签
 *       - 子项                  ← 缩进即子项
 *
 * 新增一期日志：直接新建当天的 md 写条目即可，不用改任何代码。
 */

const LOG_DIR = path.join(__dirname, "..", "..", "update-log");
const VERBS = ["新增", "更新", "修正", "修复", "更改", "移除", "迁移", "补充"];
const HOME_ITEM_COUNT = 5;

/** 拆出开头的动词，其余正文原样保留（内联 markdown 交给页面渲染） */
function splitVerb(text) {
    const verb = VERBS.find(v => text.startsWith(v)) || "";
    return { verb, text: verb ? text.slice(verb.length).trim() : text };
}

/** 解析单个日志文件 → { date, items[] }，没有条目则返回 null */
function parseFile(filePath, date) {
    const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
    const items = [];
    let lastItem = null;

    for (const raw of lines) {
        const line = raw.replace(/\s+$/, "");

        // 标题、引用、HTML 标签一律跳过
        if (!line || /^#{1,6}\s/.test(line) || /^>/.test(line) || /^</.test(line)) {
            continue;
        }

        // 缩进子项
        const sub = line.match(/^\s{2,}- (.*)$/);
        if (sub && lastItem) {
            lastItem.sub.push(splitVerb(sub[1].trim()));
            continue;
        }

        // 一级条目
        const top = line.match(/^- (.*)$/);
        if (top) {
            lastItem = { ...splitVerb(top[1].trim()), sub: [] };
            items.push(lastItem);
        }
    }

    return items.length > 0 ? { date, items } : null;
}

function parseUpdateLog() {
    if (!fs.existsSync(LOG_DIR)) {
        return null;
    }

    // 文件名即日期，按名字倒序 = 从新到旧
    const names = fs
        .readdirSync(LOG_DIR)
        .filter(name => /^\d{4}-\d{2}-\d{2}\.md$/.test(name))
        .sort()
        .reverse();

    const days = [];
    for (const name of names) {
        const date = name.replace(/\.md$/, "");
        const parsed = parseFile(path.join(LOG_DIR, name), date);
        if (parsed) {
            days.push(parsed);
        }
    }

    if (days.length === 0) {
        return null;
    }

    const newest = days[0];

    return {
        // 页面用：全部日期，新 → 旧
        files: days,
        // 首页用：最新一天的最后几条（倒序），以及点进去看什么
        latest: {
            date: newest.date,
            items: newest.items.slice(-HOME_ITEM_COUNT).reverse(),
            permalink: "/update_log",
        },
    };
}

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function updateLogPlugin() {
    return {
        name: "update-log",

        /**
         * 让开发服务器监视这个目录。
         * 不加的话，`npm start` 只在启动时读一次，之后改 md 页面不会变
         * ——因为它不在 docs/ 或 blog/ 这类内置内容源里，不在默认监听范围。
         */
        getPathsToWatch() {
            const dir = LOG_DIR.replace(/\\/g, "/");
            return [`${dir}/*.md`];
        },

        async loadContent() {
            try {
                return parseUpdateLog();
            } catch (error) {
                console.warn(`[update-log] 解析更新日志失败：${error.message}`);
                return null;
            }
        },

        async contentLoaded({ content, actions }) {
            actions.setGlobalData(content);
        },
    };
};
