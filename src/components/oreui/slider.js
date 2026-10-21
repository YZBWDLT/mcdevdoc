import React from "react";

/**
 * OreUI 滑块。
 *
 * 形态取自实机截图：浅灰轨道 + **绿色已填充段** + 方形滑块。
 * 这里只把 0–1 的比例（--ratio）传给 CSS，具体的填充像素位置由 CSS 计算——
 * 因为滑块本身有 28px 宽，填充末端要对齐滑块中心而不是轨道百分比。
 *
 * 当前值不在这里渲染——按基岩版的排法，数值应该和标题同一行，
 * 交给 SettingRow 的 titleAside 显示。
 *
 * @param {object} props
 * @param {number} props.value 当前值
 * @param {number} props.min 最小值
 * @param {number} props.max 最大值
 * @param {number} [props.step] 步进
 * @param {(value: number) => void} props.onChange 值变化回调
 * @param {string} [props.label] 无障碍标签
 */
export default function OreSlider({ value, min, max, step = 1, onChange, label }) {
    const ratio = max === min ? 0 : (value - min) / (max - min);

    return (
        <input
            type="range"
            className="oreui-slider"
            style={{ "--ratio": ratio }}
            min={min}
            max={max}
            step={step}
            value={value}
            aria-label={label}
            onChange={event => onChange(Number(event.target.value))}
        />
    );
}
