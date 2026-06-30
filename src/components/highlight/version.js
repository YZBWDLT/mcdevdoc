import React from "react";
import BaseHighlight from "./base";

/**
 * @typedef VersionHighlightOptions
 * @property {string} from 版本信息。
 * @property {string} [to] 到何版本为止。
 * @property {string} [experimental] 需要开启的实验性玩法。
 * @property {boolean} [removed] 是否被移除。
 * @property {boolean} [deprecated] 是否被弃用。
 * @property {string} tooltip 鼠标悬停时显示的提示。但在此基础上会多出一些基础内容。
 */

/**
 *
 * @param {VersionHighlightOptions} param0
 */
export default function VersionHighlight({
    from = "",
    to,
    experimental = "",
    removed = false,
    deprecated = false,
    tooltip = "",
}) {
    // 高亮颜色，实验性为黄色，被移除和被弃用为红色，其余黄绿色
    let color = "yellowgreen";
    if (experimental) color = "gold";
    if (removed || deprecated) color = "red";
    // 字符串内容
    let text = `${from}+`;
    if (to) text = `${from}-${to}`;
    if (removed) text = "已移除";
    // 提示内容
    const experimentalTooltip = experimental ? `，且必须开启「${experimental}」后方可使用` : "";
    const deprecatedTooltip = deprecated ? `，且已被弃用，只能在规定的格式版本下使用` : "";
    let newTooltip = `该特性在格式版本${text}下可用${experimentalTooltip}${deprecatedTooltip}。${tooltip}`;
    if (removed) newTooltip = `该特性已被移除，无法使用。${tooltip}`;
    // 返回高亮组件
    return <BaseHighlight text={text} color={color} tooltip={newTooltip} />;
}
