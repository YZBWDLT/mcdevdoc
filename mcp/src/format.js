/**
 * 把文档里的 MDX 条目正文，转成 AI 读得懂的纯文本。
 *
 * 为什么要转：
 *   正文里大量 `<treeview>` `<DataType>` `<Version>` 这类站点自定义组件，
 *   直接把原始 MDX 丢给 AI，它会把这些标签当成内容的一部分，参数树也读不出层级。
 *   转完只剩「参数名: 类型 —— 说明」和保留缩进的列表，AI 才认得出结构。
 *
 * 代码块里的内容一律原样保留 —— 示例 JSON 是最容易被 AI 直接复用的东西。
 */

/** 从属性串里取一个属性值，取不到返回空串 */
function attr(attrs, name) {
    const match = attrs.match(new RegExp(`\\b${name}="([^"]*)"`));
    return match ? match[1] : "";
}

/**
 * `<Version add="1.6.0" inline/>` 这类行版本文档。
 * 输出 `[自 1.6.0]`，弃用与实验性并列写在同一个方括号里。
 */
function versionLabel(attrs) {
    if (/\bremoved\b/.test(attrs)) return "[已移除]";

    const add = attr(attrs, "add");
    const deprecated = attr(attrs, "deprecated");
    const experimental = attr(attrs, "experimental");

    const parts = [];
    if (add && add !== "未知") parts.push(`自 ${add}`);
    if (deprecated) parts.push(`${deprecated} 起弃用`);
    if (experimental) parts.push(`实验性：${experimental}`);

    return `[${parts.join("；") || "版本未知"}]`;
}

/** 单行内的标签替换 */
function convertInline(line) {
    return (
        line
            // ── 参数树 ──
            // `<DataType type="int" name="priority"/>：说明` → `priority (int)：说明`
            .replace(/<DataType\b([^>]*?)\/>/g, (_, attrs) => {
                const type = attr(attrs, "type") || "任意";
                const name = attr(attrs, "name");
                const required = /\bisRequired\b/.test(attrs) ? ", 必填" : "";
                return name ? `${name} (${type}${required})` : `(${type}${required})`;
            })
            .replace(/<\/?treeview>/g, "")

            // ── 页签：`<TabItem label="参数">` 变成小标题 ──
            .replace(/<TabItem\b([^>]*)>/g, (_, attrs) => {
                const label = attr(attrs, "label") || attr(attrs, "value");
                return label ? `\n## ${label}` : "\n";
            })
            .replace(/<\/TabItem>/g, "")
            .replace(/<Tabs\b[^>]*>/g, "")
            .replace(/<\/Tabs>/g, "")

            // ── 标注类 ──
            .replace(/<Version\b([^>]*?)\/>/g, (_, attrs) => versionLabel(attrs))
            .replace(/<Usable\b([^>]*?)\/>/g, (_, attrs) => {
                const type = attr(attrs, "type");
                const tooltip = attr(attrs, "tooltip");
                if (type === "onlyChina") return tooltip ? `[仅中国版：${tooltip}]` : "[仅中国版]";
                if (type === "onlyInternational") {
                    return tooltip ? `[仅国际版：${tooltip}]` : "[仅国际版]";
                }
                // type="all" 是通用组件，不必额外标注，tooltip 里的限定条件才要留
                return tooltip ? `[${tooltip}]` : "";
            })
            .replace(/<Highlight\b([^>]*?)\/>/g, (_, attrs) => {
                const text = attr(attrs, "text");
                const tooltip = attr(attrs, "tooltip");
                return `【${text}${tooltip ? `：${tooltip}` : ""}】`;
            })
            .replace(/<RestrictedMode\b[^>]*\/>/g, "[需读写权限]")
            // 中国版接口要分清脚本端，这决定了代码写进客户端还是服务端
            .replace(/<Server\b[^>]*\/>/g, "[服务端]")
            .replace(/<Client\b[^>]*\/>/g, "[客户端]")
            .replace(/<FileType\b([^>]*?)\/>/g, (_, attrs) => attr(attrs, "name"))
            .replace(/<Image\b([^>]*?)\/>/g, (_, attrs) => {
                const alt = attr(attrs, "alt") || attr(attrs, "src");
                return alt ? `（图：${alt}）` : "";
            })

            // ── 外链按钮与评论框：对 AI 没有价值 ──
            .replace(/<(Button|WikiButton|DownloadButton)\b[^>]*\/>/g, "")
            .replace(/<(Button|WikiButton|DownloadButton)\b[^>]*>[\s\S]*?<\/\1>/g, "")
            .replace(/<GiscusComment\b[^>]*\/>/g, "")

            .replace(/<br\s*\/?>/gi, "\n")

            // ── 链接只留文字，图片整个丢掉 ──
            .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
            .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")

            // ── 兜底：剩下没认出来的自定义标签统统剥掉 ──
            .replace(/<[A-Z][A-Za-z]*\b[^>]*?\/>/g, "")
            .replace(/<\/?[A-Z][A-Za-z]*\b[^>]*>/g, "")
    );
}

/**
 * 条目正文 → 纯文本。
 *
 * @param {string} body 条目在 md 文件里的原始正文
 * @param {{ maxChars?: number }} [options]
 * @returns {string}
 */
export function mdxToText(body, { maxChars = 7000 } = {}) {
    const lines = String(body || "").split(/\r?\n/);
    const out = [];
    let inFence = false;

    for (const line of lines) {
        if (/^\s*```/.test(line)) {
            inFence = !inFence;
            // ```json showLineNumbers 这类附加标记对 AI 没意义
            out.push(inFence ? line.replace(/^(\s*)```(\w*).*$/, "$1```$2") : "```");
            continue;
        }
        if (inFence) {
            out.push(line);
            continue;
        }
        out.push(convertInline(line));
    }

    let text = out
        .join("\n")
        // 文档里拿 --- 分隔条目，转文本时没有意义
        .replace(/^\s*-{3,}\s*$/gm, "")
        .replace(/[ \t]+$/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    if (text.length > maxChars) {
        text = `${text.slice(0, maxChars)}\n\n（以下内容过长已截断，完整内容见站内页面）`;
    }
    return text;
}

/**
 * Molang 与标签条目的正文是表格的一行。
 *
 * 只取第一列之后的内容 —— 名称已经在标题行和摘要里出现过了，再列一遍是重复。
 * 召唤物如 `query.is_alive` 的返回值说明就落在后面几列。
 */
export function tableRowToText(row) {
    const cells = String(row)
        .split("|")
        .slice(1, -1)
        .map(cell =>
            cell
                .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
                .replace(/`/g, "")
                .trim()
        );
    if (cells.length < 2) return "";
    // 有的行末尾还有一列重复写了函数名，没有信息量
    const name = cells[0];
    return cells.slice(1).filter(cell => cell && cell !== name).join("｜");
}
