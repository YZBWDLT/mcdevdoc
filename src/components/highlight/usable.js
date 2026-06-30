import React from "react";
import BaseHighlight from "./base";

/**
 * @typedef UsableHighlightOptions
 * @property {"all" | "onlyInternational" | "onlyChina"} type 当前的可用性。
 * @property {string} tooltip 鼠标悬停时显示的提示。但在此基础上会多出一些基础内容。
 */

/** 可用性高亮组件。
 * @param {UsableHighlightOptions} param0
 * @returns
 */
export default function UsableHighlight({ type = "all", tooltip = "" }) {
    const text = {
        all: "通用",
        onlyInternational: "国际版",
        onlyChina: "中国版",
    }[type];
    const color = {
        all: "yellowgreen",
        onlyInternational: undefined,
        onlyChina: undefined,
    }[type];
    const newTooltip = {
        all: `该特性在中国版和国际版均可用。${tooltip}`,
        onlyInternational: `该特性仅在国际版可用。${tooltip}`,
        onlyChina: `该特性仅在中国版可用。${tooltip}`,
    }[type];
    return <BaseHighlight text={text} color={color} size="large" tooltip={newTooltip} />;
}
