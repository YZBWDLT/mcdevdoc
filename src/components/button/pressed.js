import React from "react";

/**
 * @typedef PressedButtonOptions
 * @property {string} [text] 按钮文本。
 * @property {"extra_small" | "small" | "middle" | "large" | "extra_large"} [length] 按钮宽度。
 */

/** 已被按下的按钮。用于并列按钮中。
 * @param {PressedButtonOptions} buttonOptions
 * @returns
 */
export default function PressedButton(buttonOptions) {
    const { text = "", length = "middle" } = buttonOptions;

    return (
        <button
            className={`btn green_btn_pressed ${length}_btn`}
        >
            {text}
        </button>
    );
}