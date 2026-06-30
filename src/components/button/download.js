import React from "react";
import BaseButton from "./base";

/**
 * @typedef DownloadButtonOptions
 * @property {string} text 按钮文本。
 * @property {string} url 按钮链接地址。
 */

/** 下载按钮。
 * @param {DownloadButtonOptions} buttonOptions
 * @returns
 */
export default function DownloadButton(buttonOptions) {
    const { text, url = "" } = buttonOptions;
    const buttonText = text ? `⬇ 下载：${text}` : "⬇ 下载"
    return <BaseButton text={buttonText} url={url} color="green"/>;
}
