import React from "react";
import BaseButton from "./base";

/**
 * @typedef WikiButtonOptions
 * @property {string} item Wiki 条目。可指定为 Wiki 对应条目的标题文本。
 * @property {string} [text] 指定按钮的文本。若不指定则默认为`(条目)`。
 * @property {"small" | "middle" | "extra_small" | "large" | "extra_large"} length 按钮长度。默认值：`middle`。
 */

/** Wiki 按钮。点击后跳转到 Wiki 的对应界面。
 * @param {WikiButtonOptions} buttonOptions
 * @returns
 */
export default function WikiButton(buttonOptions) {
    const { item, text = `${item}`, length = "middle" } = buttonOptions;
    const url = `https://zh.minecraft.wiki/w/${item}`
    return <BaseButton text={text} url={url} length={length} color="blue" logo="/img/components/minecraft_wiki.png"/>;
}
