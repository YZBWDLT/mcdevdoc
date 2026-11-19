/**
 * 生成 MCP 用的数据文件。
 *
 * 数据来源是站点自己的 interface-index 插件 —— 不另写一套 Markdown 解析，
 * 否则文档和 MCP 迟早会对不上（界面显示 1.26.50 新增，MCP 却说 1.21.0）。
 * 插件加了个 includeBody 开关，站点仍然只吃轻量索引，MCP 这边才带上正文。
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));

const PLUGIN = path.resolve(here, "../../plugins/interface-index/index.js");
const ROOT = path.resolve(here, "../..");
const OUT = path.resolve(here, "../data/interfaces.json");

/** 站点地址，MCP 返回的链接要能直接点开 */
function siteBase() {
    try {
        const config = require(path.join(ROOT, "docusaurus.config.js"));
        const url = (config.url || "").replace(/\/$/, "");
        const base = (config.baseUrl || "/").replace(/\/$/, "");
        if (url) return `${url}${base}`;
    } catch {
        // 配置文件读不到就退回线上地址，不能因此让构建失败
    }
    return "https://mcdevdoc.nekoawa.com";
}

function main() {
    const { buildIndex } = require(PLUGIN);
    const index = buildIndex({ includeBody: true });

    // 正文里的空白在传输时会被反复检查，压一道能省一成体积
    for (const item of index.items) {
        if (typeof item[9] === "string") {
            item[9] = item[9].replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
        }
    }

    const payload = {
        generatedAt: new Date().toISOString(),
        site: siteBase(),
        currentGame: index.currentGame,
        currentChina: index.currentChina,
        kinds: index.kinds,
        pages: index.pages,
        items: index.items,
        total: index.total,
    };

    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify(payload), "utf8");

    const mb = (fs.statSync(OUT).size / 1048576).toFixed(2);
    console.log(`已生成 ${OUT}`);
    console.log(`  ${payload.total} 条接口 / ${payload.pages.length} 个页面 / ${mb} MB`);
    console.log(`  基准版本：国际版 ${payload.currentGame}，中国版 ${payload.currentChina}`);
    console.log(`  站点：${payload.site}`);
}

main();
