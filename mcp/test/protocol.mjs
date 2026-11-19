/**
 * 端到端协议测试：像真实客户端那样起一个子进程，走 stdio 收发 JSON-RPC。
 *
 * 不 mock transport —— MCP 最容易出问题的地方恰恰是启动、握手和 stdout 污染，
 * 在进程内测不出来。
 */

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const BIN = path.resolve(here, "../bin/mcdevdoc-mcp.js");

const child = spawn(process.execPath, [BIN], { stdio: ["pipe", "pipe", "pipe"] });

let buffer = "";
let stderr = "";
const pending = new Map();
let nextId = 1;
let failures = 0;

child.stderr.on("data", chunk => {
    stderr += chunk.toString();
});

child.stdout.on("data", chunk => {
    buffer += chunk.toString();
    let newline;
    while ((newline = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, newline).trim();
        buffer = buffer.slice(newline + 1);
        if (!line) continue;
        let message;
        try {
            message = JSON.parse(line);
        } catch {
            console.log(`  ✗ stdout 出现非 JSON 内容：${line.slice(0, 120)}`);
            failures += 1;
            continue;
        }
        const resolve = pending.get(message.id);
        if (resolve) {
            pending.delete(message.id);
            resolve(message);
        }
    }
});

function request(method, params) {
    const id = nextId++;
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`${method} 超时`)), 15000);
        pending.set(id, message => {
            clearTimeout(timer);
            resolve(message);
        });
        child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
    });
}

function notify(method, params) {
    child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", method, params })}\n`);
}

function check(label, condition, detail = "") {
    if (condition) {
        console.log(`  ✓ ${label}`);
    } else {
        failures += 1;
        console.log(`  ✗ ${label}${detail ? ` —— ${detail}` : ""}`);
    }
}

async function main() {
    console.log("握手");
    const init = await request("initialize", {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "protocol-test", version: "0.0.0" },
    });
    check("initialize 返回服务信息", init.result?.serverInfo?.name === "mcdevdoc");
    check("带上了使用说明", Boolean(init.result?.instructions));
    check("声明了 tools 能力", Boolean(init.result?.capabilities?.tools));
    notify("notifications/initialized");

    console.log("\n工具列表");
    const list = await request("tools/list", {});
    const tools = list.result?.tools || [];
    const names = tools.map(tool => tool.name);
    check("注册了 4 个工具", tools.length === 4, names.join(","));
    check("包含 search_interfaces", names.includes("search_interfaces"));
    check("包含 get_interface", names.includes("get_interface"));
    check("包含 validate_components", names.includes("validate_components"));
    check("每个工具都有描述", tools.every(tool => tool.description && tool.description.length > 20));

    console.log("\n按名称搜索");
    const byName = await request("tools/call", {
        name: "search_interfaces",
        arguments: { query: "nearest_attackable_target", limit: 3 },
    });
    const nameText = byName.result?.content?.[0]?.text || "";
    check("命中实体组件", nameText.includes("minecraft:behavior.nearest_attackable_target"));
    check("带上站内链接", nameText.includes("mcdevdoc.nekoawa.com"));
    check("没有把组件误判为弃用", !nameText.includes("已弃用"));

    console.log("\n按中文关键词搜索");
    const byDesc = await request("tools/call", {
        name: "search_interfaces",
        arguments: { query: "火焰免疫", limit: 3 },
    });
    const descText = byDesc.result?.content?.[0]?.text || "";
    check("命中 fire_immune", descText.includes("minecraft:fire_immune"));

    console.log("\n长句也能给出相关候选");
    const longQuery = await request("tools/call", {
        name: "search_interfaces",
        arguments: { query: "让生物攻击最近的敌人", limit: 8 },
    });
    const longText = longQuery.result?.content?.[0]?.text || "";
    check(
        "相关组件在候选里",
        longText.includes("nearest_attackable_target") || longText.includes("defend_village_target")
    );

    console.log("\n按类别过滤");
    const filtered = await request("tools/call", {
        name: "search_interfaces",
        arguments: { query: "damage", kind: "command", limit: 3 },
    });
    const filteredText = filtered.result?.content?.[0]?.text || "";
    check("只返回命令", filteredText.includes("/damage") && !filteredText.includes("item_component"));

    console.log("\n取详情：数据驱动组件");
    const comp = await request("tools/call", {
        name: "get_interface",
        arguments: { name: "minecraft:behavior.nearest_attackable_target" },
    });
    const compText = comp.result?.content?.[0]?.text || "";
    check("参数树保留层级", /- entity_types \(array\)[\s\S]* {4}- filters \(object\)/.test(compText));
    check("带上默认值说明", compText.includes("默认值为"));
    check("带上弃用参数的行内版本", compText.includes("1.26.0 起弃用"));
    check("不含 MDX 标签残留", !/<\/?(treeview|DataType|TabItem|Usable)\b/.test(compText));

    console.log("\n取详情：脚本接口");
    const sapi = await request("tools/call", {
        name: "get_interface",
        arguments: { name: "Entity.addEffect" },
    });
    const sapiText = sapi.result?.content?.[0]?.text || "";
    check("有 TypeScript 签名", sapiText.includes("```typescript"));
    check("标出服务器模块版本", sapiText.includes("server 模块"));
    check("标出读写权限要求", sapiText.includes("需读写权限"));

    console.log("\n取详情：中国版接口");
    const modapi = await request("tools/call", {
        name: "get_interface",
        arguments: { name: "SetPos", kind: "modapi_interface" },
    });
    const modapiText = modapi.result?.content?.[0]?.text || "";
    check("标出中国版版本", modapiText.includes("中国版"));
    check("标出客户端", modapiText.includes("[客户端]"));
    check("有 Python 示例", modapiText.includes("```python"));
    check("列出同名接口供消歧", modapiText.includes("同名或近似的还有"));

    console.log("\n找不到的接口");
    const miss = await request("tools/call", {
        name: "get_interface",
        arguments: { name: "minecraft:definitely_not_a_component" },
    });
    const missText = miss.result?.content?.[0]?.text || "";
    check("给出可读的失败说明", missText.includes("没有精确匹配") || missText.includes("没有名为"));
    check("没有抛异常", !miss.result?.isError);

    console.log("\n校验：写对的文件");
    const validSource = JSON.stringify({
        format_version: "1.21.0",
        "minecraft:entity": {
            description: { identifier: "wiki:test" },
            components: {
                "minecraft:health": { value: 20, max: 20 },
                "minecraft:behavior.panic": { priority: 1, speed_multiplier: 1.2 },
            },
        },
    });
    const valid = await request("tools/call", {
        name: "validate_components",
        arguments: { json: validSource, type: "entity" },
    });
    const validText = valid.result?.content?.[0]?.text || "";
    check("没有误报", validText.includes("没有发现问题"), validText.slice(0, 120));

    console.log("\n校验：写错的文件");
    const invalidSource = `{
        // 注释和尾逗号都要能吃
        "minecraft:entity": {
            "components": {
                "minecraft:health": { "value": "20", "maxx": 20, },
                "minecraft:behavior.nearest_attackable": { "priority": 2 },
                "minecraft:behavior.panic": { "priority": 1, "speed_multiplier": "fast" },
            },
        },
    }`;
    const invalid = await request("tools/call", {
        name: "validate_components",
        arguments: { json: invalidSource, type: "entity" },
    });
    const invalidText = invalid.result?.content?.[0]?.text || "";
    check("报出类型不符", invalidText.includes("文档标注为"));
    check("报出未知组件", invalidText.includes("文档里没有这个组件"));
    check("报出未知参数", invalidText.includes("参数不在文档记录里"));
    check("给出相近的参数名", invalidText.includes("相近的参数"));
    check("带上站内链接", invalidText.includes("mcdevdoc.nekoawa.com"));
    check("错误与提示分开列", invalidText.includes("## 错误") && invalidText.includes("## 提示"));
    check("提示项带免责说明", invalidText.includes("多种写法"));

    console.log("\n校验：语法错误");
    const broken = await request("tools/call", {
        name: "validate_components",
        arguments: { json: '{ "minecraft:entity": ', type: "entity" },
    });
    const brokenText = broken.result?.content?.[0]?.text || "";
    check("给出可读的语法错误", brokenText.includes("JSON 语法错误"));

    console.log("\n类别列表");
    const cats = await request("tools/call", {
        name: "list_categories",
        arguments: {},
    });
    const catText = cats.result?.content?.[0]?.text || "";
    check("列出基准版本", catText.includes("国际版"));
    check("列出 14 个类别", (catText.match(/^- /gm) || []).length === 14);

    console.log("\n启动日志走 stderr");
    check("stderr 有启动信息", stderr.includes("[mcdevdoc-mcp] 已启动"));

    child.kill();
    console.log(failures === 0 ? "\n全部通过" : `\n${failures} 项未通过`);
    process.exit(failures === 0 ? 0 : 1);
}

main().catch(error => {
    console.error(`测试中断：${error.message}`);
    if (stderr) console.error(`stderr：\n${stderr}`);
    child.kill();
    process.exit(1);
});
