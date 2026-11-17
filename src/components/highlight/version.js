import React from "react";
import BaseHighlight from "./base";

/**
 * 各版本类型对应的中国版当前支持版本与显示文案。
 * - `format`：格式版本，即`format_version`字段的写法
 * - `game`：游戏版本（默认）。26.0 起格式版本为`1.xx.yy`、游戏版本为`xx.yy`，显示时会自动去掉前缀`1.`
 * - `script`：`server` 模块脚本版本
 * - `script-ui`：`server-ui` 模块脚本版本
 * - `script-graphics`：`server-graphics` 模块脚本版本
 * @type {Record<"format"|"game"|"script"|"script-ui"|"script-graphics", {label: string, china: string}>}
 */
const VERSION_TYPES = {
    format: { label: "格式版本", china: "1.21.130" },
    game: { label: "游戏版本", china: "1.21.130" },
    script: { label: "server模块脚本版本", china: "2.4.0" },
    "script-ui": { label: "server-ui模块脚本版本", china: "2.0.0" },
    "script-graphics": { label: "server-graphics模块脚本版本", china: "0.0.0" },
};

/**
 * 26.0 起格式版本写作`1.xx.yy`、游戏版本写作`xx.yy`；
 * 游戏版本显示时统一去掉前缀`1.`，这样作者可以直接沿用`format_version`的数字。
 * @param {string} version
 * @param {"format"|"game"|"script"|"script-ui"} type
 * @returns {string}
 */
function toDisplayVersion(version, type) {
    if (type !== "game" || !version) return version;
    const parts = String(version).split(".");
    if (parts.length >= 3 && parts[0] === "1" && Number(parts[1]) >= 26) {
        return parts.slice(1).join(".");
    }
    return version;
}

/**
 * 游戏版本`xx.yy`对应的格式版本为`1.xx.yy`（26.0 起）。
 * @param {string} version
 * @returns {string}
 */
function toFormatVersion(version) {
    if (!version) return version;
    const parts = String(version).split(".");
    if (parts.length === 2 && Number(parts[0]) >= 26) {
        return `1.${version}`;
    }
    return version;
}

/**
 * 比较两个语义化版本号，返回 version1 > version2 布尔值
 * @param {string} v1
 * @param {string} v2
 * @returns {boolean}
 */
function isVersionGreater(v1, v2) {
    const parts1 = v1.split(".").map(Number);
    const parts2 = v2.split(".").map(Number);
    const len = Math.max(parts1.length, parts2.length);
    for (let i = 0; i < len; i++) {
        const n1 = parts1[i] || 0;
        const n2 = parts2[i] || 0;
        if (n1 > n2) return true;
        if (n1 < n2) return false;
    }
    return false; // 相等
}

/**
 * @typedef VersionHighlightOptions
 * @property {"format"|"game"|"script"|"script-ui"|"script-graphics"} [type] 版本类型。`game` 为游戏版本（默认），`format` 为格式版本，两者均可直接填`format_version`里的数字；`script` 为`server`模块脚本版本，`script-ui` 为`server-ui`模块脚本版本，`script-graphics` 为`server-graphics`模块脚本版本。
 * @property {string} add 版本信息。
 * @property {string} [experimental] 需要开启的实验性玩法。
 * @property {boolean} [removed] 是否被移除。
 * @property {string} [deprecated] 被弃用的版本。
 * @property {string} tooltip 鼠标悬停时显示的提示。但在此基础上会多出一些基础内容。
 * @property {boolean} [inline] 是否为行内高亮文本。若是则取消文本附近的间隔。
 */

/** 版本高亮。
 * @param {VersionHighlightOptions} param0
 */
export default function VersionHighlight({
    type = "game",
    add = "",
    experimental = "",
    removed = false,
    deprecated,
    tooltip = "",
    inline = false,
}) {
    const { label, china } = VERSION_TYPES[type] || VERSION_TYPES.game;
    const shownAdd = toDisplayVersion(add, type);
    const shownDeprecated = toDisplayVersion(deprecated, type);

    // 游戏版本与格式版本写法不同时，在提示里补上格式版本的对应值
    const formatAdd = toFormatVersion(add);
    const formatHint =
        type === "game" && formatAdd !== add && add !== "未知"
            ? `（对应格式版本${formatAdd}+）`
            : "";

    // 正常颜色
    let color = "yellowgreen";
    let text = `${shownAdd}+`;
    let newTooltip = `该特性在${label}${shownAdd}+下可用。${formatHint}${tooltip}`;

    // 已查找但无法确定加入版本
    if (add === "未知") {
        color = "gray";
        text = "未知";
        newTooltip = `已尝试查找该特性的加入版本，但未能确定。${tooltip}`;
    }

    if (add && add !== "未知" && isVersionGreater(add, china)) {
        color = "gold";
        newTooltip = `该特性在${label}${shownAdd}+下可用，但该版本对于当前的中国版版本过高。${formatHint}${tooltip}`;
    }

    // 如果是实验性玩法
    if (experimental) {
        color = "red";
        text = "实验性玩法";
        newTooltip = `该特性必须开启「${experimental}」实验性玩法后方可使用。请注意，实验性玩法存在功能不稳定、功能更改甚至未来被移除的风险。${tooltip}`;
    }

    // 如果是弃用特性
    if (deprecated) {
        color = "red";
        text = `已弃用：${shownAdd}-${shownDeprecated}`;
        newTooltip = `该特性已被弃用，只能在${label}${shownAdd}-${shownDeprecated}下使用。${tooltip}`;
    }

    // 如果是移除特性
    if (removed) {
        color = "red";
        text = "已移除";
        newTooltip = `该特性已被移除，无法使用。${tooltip}`;
    }

    // 返回高亮组件
    return <BaseHighlight text={text} color={color} tooltip={newTooltip} inline={inline} />;
}
