import React from "react";

/**
 * OreUI 文本输入框。
 *
 * 形态取自实机：深色内凹的输入区，底色比面板更深，
 * 顶部压暗、底部提亮（与按钮的凸起方向相反）。
 *
 * @param {object} props
 * @param {string} props.value 当前文本
 * @param {(value: string) => void} props.onChange 文本变化回调
 * @param {string} [props.placeholder] 占位文字
 * @param {string} [props.label] 无障碍标签
 * @param {string} [props.type] input 的 type，默认 text
 */
export default function OreTextInput({ value, onChange, placeholder, label, type = "text" }) {
    return (
        <input
            type={type}
            className="oreui-input"
            value={value}
            placeholder={placeholder}
            aria-label={label}
            onChange={event => onChange(event.target.value)}
        />
    );
}
