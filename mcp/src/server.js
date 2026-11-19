/**
 * MCP 服务端入口。
 *
 * 注意：stdio 模式下 stdout 是 JSON-RPC 通道，任何日志都必须走 stderr，
 * 一句 console.log 就能让客户端解析失败。
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { load, search, get, kinds, renderHit, renderEntry } from "./store.js";
import { validate } from "./schema.js";

const VERSION = "0.1.0";

/** 工具执行失败时不要把异常抛出去，抛出去 AI 看到的是堆栈，看不懂 */
function fail(message) {
    return { isError: true, content: [{ type: "text", text: message }] };
}

function ok(text) {
    return { content: [{ type: "text", text }] };
}

/**
 * 合并同类问题。
 *
 * `healable.items[0].item`、`items[1].item`、`items[2].item` 说的是一回事，
 * 分开列十几条只会把真正要看的东西挤出屏幕。
 */
function collapse(issues) {
    const merged = new Map();
    for (const issue of issues) {
        const template = issue.path.replace(/\[\d+\]/g, "[]");
        // 「写的是字符串 "porkchop"」和「…"beef"」是同一类问题，具体值不该参与归并
        const generic = issue.message
            .replace(/"[^"]*"/g, "")
            .replace(/[\d.]+/g, "")
            .replace(/\s+/g, " ")
            .trim();
        const key = `${issue.level}|${template}|${generic}`;

        const existed = merged.get(key);
        if (existed) {
            existed.count += 1;
            continue;
        }
        merged.set(key, { ...issue, path: template, message: generic, count: 1 });
    }
    return [...merged.values()];
}

/** 把校验结果排成清单，错误在前、提示在后 */
export function renderValidation(result) {
    if (result.fatal) return `没法校验：${result.fatal}`;

    const errors = result.issues.filter(issue => issue.level === "error");
    const warns = result.issues.filter(issue => issue.level === "warn");

    if (!result.issues.length) {
        return `校验了 ${result.checked} 个组件，没有发现问题。`;
    }

    // 一次列太多反而抓不住重点，按「错误优先」截断
    const MAX = 20;
    const ordered = [...collapse(errors), ...collapse(warns)];
    const shown = ordered.slice(0, MAX);

    const lines = [
        `校验了 ${result.checked} 个组件，发现 ${errors.length} 个错误、${warns.length} 处提示。`,
    ];

    for (const [title, group, mark] of [
        ["错误", shown.filter(issue => issue.level === "error"), "✗"],
        ["提示", shown.filter(issue => issue.level === "warn"), "⚠"],
    ]) {
        if (!group.length) continue;
        lines.push(`\n## ${title}`);
        for (const issue of group) {
            const repeat = issue.count > 1 ? `（×${issue.count}）` : "";
            const detail = [`${mark} ${issue.path}${repeat}`, `   ${issue.message}`];
            if (issue.hint) detail.push(`   ${issue.hint}`);
            if (issue.desc) detail.push(`   文档：${issue.desc}`);
            if (issue.link) detail.push(`   ${issue.link}`);
            lines.push(detail.join("\n"));
        }
    }

    if (ordered.length > MAX) {
        lines.push(`\n…另有 ${ordered.length - MAX} 类未列出，先处理上面的。`);
    }

    if (warns.length) {
        lines.push(
            `\n> 提示项对照的是文档里的参数标注。基岩版很多参数接受多种写法` +
                `（物品既能写 ID 字符串也能写描述符对象，时间既能写数字也能写 range 对象），` +
                `文档未必把每种写法都记了。拿不准就点上面的链接去页面确认，别照着提示直接改。`
        );
    }

    return lines.join("\n");
}

export function createServer() {
    const data = load();

    const server = new McpServer(
        { name: "mcdevdoc", version: VERSION },
        {
            instructions:
                "这里提供 Minecraft 基岩版（Bedrock）开发文档的接口查询，" +
                "覆盖命令、物品/方块/实体组件、实体过滤器、Molang、战利品表、标签、" +
                "国际版 Script API（@minecraft/server 等）与中国版 ModAPI。" +
                "写附加包或脚本前，先用 search_interfaces 找接口，再用 get_interface 取完整参数树。" +
                "写完实体、物品或方块的 JSON 之后，用 validate_components 自查组件名、参数名与类型。" +
                "不要凭记忆编造组件名或参数名，拿不准就查。",
        }
    );

    const kindIds = data.kinds.map(kind => kind.id);
    const kindHint = data.kinds.map(kind => `${kind.id}（${kind.label}）`).join("、");

    server.registerTool(
        "search_interfaces",
        {
            title: "搜索接口",
            description:
                `按名称或关键词搜索基岩版接口，返回名称、类别、加入版本和站内链接。` +
                `可查的类别：${kindHint}。` +
                `名称可以直接用简称：nearest_attackable_target、addEffect、/tp、query.is_alive 都能命中。` +
                `中文请用两到四个关键词，例如「火焰免疫」「耐久」「掉落」，` +
                `不要用整句问句 —— 这里不是语义检索，长句会散成太多无关词。` +
                `搜索结果只有摘要，要看参数树请接着调 get_interface。`,
            inputSchema: {
                query: z
                    .string()
                    .describe("接口名、简称，或两到四个中文关键词，例如「火焰免疫」「耐久」"),
                kind: z
                    .enum(kindIds)
                    .optional()
                    .describe("限定接口类别，不填则全部类别一起搜"),
                limit: z
                    .number()
                    .int()
                    .min(1)
                    .max(40)
                    .optional()
                    .describe("最多返回几条，默认 8"),
            },
        },
        async ({ query, kind, limit }) => {
            try {
                const hits = search(query, { kind, limit: limit ?? 8 });
                if (!hits.length) {
                    return ok(
                        `没有找到与「${query}」相关的接口。\n` +
                            `可以换个说法再试：用英文接口名、去掉 minecraft: 前缀，` +
                            `或者用 list_categories 看看有哪些类别。`
                    );
                }

                const lines = hits.map((hit, index) => renderHit(hit.entry, index + 1));
                return ok(
                    `找到 ${hits.length} 条结果：\n\n${lines.join("\n\n")}\n\n` +
                        `需要参数树或示例，用 get_interface 传上面的名称。`
                );
            } catch (error) {
                return fail(`搜索失败：${error.message}`);
            }
        }
    );

    server.registerTool(
        "get_interface",
        {
            title: "获取接口详情",
            description:
                "按名称取一个接口的完整内容：定义、参数树（含类型与默认值）、示例代码、版本信息与站内链接。" +
                "名称必须是 search_interfaces 返回的那一个；脚本方法写成 Entity.addEffect 这种形式。",
            inputSchema: {
                name: z.string().describe("接口全名，例如 minecraft:damage、Entity.addEffect、/tp"),
                kind: z
                    .enum(kindIds)
                    .optional()
                    .describe("同名接口出现在多个类别时，用它消歧"),
            },
        },
        async ({ name, kind }) => {
            try {
                const { entry, others, candidates } = get(name, { kind });

                if (!entry) {
                    if (!candidates.length) {
                        return ok(
                            `没有名为「${name}」的接口。` +
                                `确认一下大小写与写法，SAPI 方法要写成「类名.方法名」。`
                        );
                    }
                    const lines = candidates.map((hit, index) => renderHit(hit.entry, index + 1));
                    return ok(
                        `没有精确匹配「${name}」，相近的有：\n\n${lines.join("\n\n")}\n\n` +
                            `选一个把全名传给 get_interface。`
                    );
                }

                let text = renderEntry(entry);

                if (others.length) {
                    const list = others
                        .map(other => `- ${other.name}（${other.page.k} · ${other.group || other.page.t}）`)
                        .join("\n");
                    text += `\n\n---\n\n同名或近似的还有：\n${list}\n` +
                        `确认要另一个的话，把 kind 一起传进来。`;
                }

                return ok(text);
            } catch (error) {
                return fail(`读取失败：${error.message}`);
            }
        }
    );

    server.registerTool(
        "list_categories",
        {
            title: "列出接口类别",
            description:
                "列出全部接口类别、各有多少条，以及当前文档对应的国际版/中国版基准版本。" +
                "不确定某个东西属于哪一类时先调这个。",
            inputSchema: {},
        },
        async () => {
            try {
                const rows = data.kinds
                    .map(kind => `- ${kind.id}：${kind.label}（${kind.count} 条）—— ${kind.desc}`)
                    .join("\n");
                return ok(
                    `当前文档基准：国际版 ${data.currentGame}，中国版 ${data.currentChina}\n` +
                        `共 ${data.total} 条接口\n\n${rows}`
                );
            } catch (error) {
                return fail(`读取失败：${error.message}`);
            }
        }
    );

    server.registerTool(
        "validate_components",
        {
            title: "校验附加包 JSON",
            description:
                "校验实体、物品或方块 JSON 里的组件与参数，逐个对照文档检查：" +
                "组件是否存在、参数名是否写对、类型是否匹配、有没有漏掉必填、枚举值是否越界。" +
                "可以直接贴文件全文，允许 `//` 注释和尾逗号。" +
                "写完行为包后跑一遍，比事后进游戏试错快得多。" +
                "注意只查数据驱动部分，不检查 Molang 表达式和资源包贴图路径。",
            inputSchema: {
                json: z.string().describe("要校验的 JSON 全文"),
                type: z
                    .enum(["entity", "item", "block"])
                    .describe("文件类型：entity 是行为包实体，item 是物品，block 是方块"),
            },
        },
        async ({ json, type }) => {
            try {
                return ok(renderValidation(validate(json, type)));
            } catch (error) {
                return fail(`校验失败：${error.message}`);
            }
        }
    );

    return server;
}

export async function start() {
    load(); // 尽早失败：数据没生成就直接报清楚，而不是等第一次查询
    const server = createServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`[mcdevdoc-mcp] 已启动，共 ${load().total} 条接口`);
}
