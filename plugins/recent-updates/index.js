const fs = require("fs");
const path = require("path");

/**
 * 本地插件：把最新一期「文档更新日志」抽成全局数据，供首页「最近更新」区块使用。
 *
 * 为什么需要它：博客插件不对外暴露 globalData，页面里直接读 fs 又会在客户端打包时报错，
 * 所以放在 loadContent 阶段（纯 Node 环境）读文件，再用 setGlobalData 传给页面。
 *
 * 约定（与 blog/<日期>-update-log.md 的书写口径一致）：
 * - 只看顶格的一级条目，缩进子项忽略；
 * - 遇到「## 过往更新日志」就停止，避免把历史条目混进来；
 * - 条目首词若为更新日志的固定动词，则单独抽出来做标签。
 */

const BLOG_DIR = path.join(__dirname, "..", "..", "blog");
const VERBS = ["新增", "更新", "修正", "修复", "更改", "移除", "迁移", "补充"];
const MAX_ITEMS = 5;

/** 去掉 markdown 标记，保留纯文本（首页以纯文本渲染这些条目） */
function toPlainText(text) {
    return text
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .trim();
}

function readLatestUpdateLog() {
    if (!fs.existsSync(BLOG_DIR)) {
        return null;
    }

    // 文件名形如 2026-10-20-update-log.md，按文件名倒序即按日期倒序
    const files = fs
        .readdirSync(BLOG_DIR)
        .filter(name => /-update-log\.md$/.test(name))
        .sort()
        .reverse();

    if (files.length === 0) {
        return null;
    }

    const file = files[0];
    const lines = fs.readFileSync(path.join(BLOG_DIR, file), "utf8").split(/\r?\n/);

    const dateMatch = file.match(/^(\d{4})-(\d{2})-(\d{2})/);
    const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : "";

    // 与 Docusaurus 博客的默认永久链接规则保持一致：
    // 无 slug 时为 /blog/YYYY/MM/DD，有 slug 时为 /blog/YYYY/MM/DD/slug
    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-?/, "").replace(/\.md$/, "");
    const permalink = dateMatch
        ? `/blog/${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}${slug ? `/${slug}` : ""}`
        : "/blog";

    const titleLine = lines.find(line => /^#\s+/.test(line));

    /** @type {{verb: string, text: string}[]} */
    const items = [];
    for (const line of lines) {
        if (/^##\s/.test(line)) {
            break;
        }
        if (!/^- /.test(line)) {
            continue;
        }
        const text = line.slice(2).trim();
        if (!text) {
            continue;
        }
        const verb = VERBS.find(v => text.startsWith(v)) || "";
        items.push({
            verb,
            text: toPlainText(verb ? text.slice(verb.length).trim() : text),
        });
    }

    if (items.length === 0) {
        return null;
    }

    // 日志按时间正序书写（当次最早的在上、最新的在下），
    // 首页要的是「最近的改动」，故取末尾几条并倒序。
    const latest = items.slice(-MAX_ITEMS).reverse();

    return {
        date,
        title: titleLine ? titleLine.replace(/^#\s+/, "").trim() : "文档更新日志",
        permalink,
        items: latest,
    };
}

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function recentUpdatesPlugin() {
    return {
        name: "recent-updates",

        async loadContent() {
            try {
                return readLatestUpdateLog();
            } catch (error) {
                console.warn(`[recent-updates] 读取更新日志失败，首页「最近更新」区块将不显示：${error.message}`);
                return null;
            }
        },

        async contentLoaded({ content, actions }) {
            actions.setGlobalData(content);
        },
    };
};
