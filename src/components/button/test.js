import React from "react";

/**
 * @typedef TestButtonOptions
 * @property {string} [text] 按钮文本。
 * @property {string} [url] 按钮链接地址。
 * @property {"extra_small" | "small" | "middle" | "large"} [length] 按钮宽度。
 * @property {string} [logo] 图片 URL（可选），将显示在文本前面。
 * @property {boolean} [openNewPage] 是否打开新的标签页。默认值：`true`。
 */

/** 基础按钮。
 * @param {TestButtonOptions} buttonOptions
 * @returns
 */
export default function TestButton(buttonOptions) {
    const { text = "", url = "", length = "middle", logo = "", openNewPage = true } = buttonOptions;

    /** @type {React.CSSProperties} */
    const logoStyle = {
        height: "1.2em",
        width: "auto",
        marginRight: "6px",
        verticalAlign: "middle",
        display: "inline-block",
    };

    return (
        <a
            href={url}
            className={`btn green_btn_pressed ${length}_btn`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {logo && <img src={logo} alt="" style={logoStyle} />}
            {text}
        </a>
    );
}