// src/components/button/multiButtons.jsx
import React from "react";

/** 字体大小到 CSS 类的映射 */
const FONT_SIZE_MAP = {
  extra_small: 'font_size_extra_small',
  small: 'font_size_small',
  middle: 'font_size_middle',
  large: 'font_size_large',
  extra_large: 'font_size_extra_large',
};

/**
 * @typedef MultiButtonsOption
 * @property {string} value 选项值。
 * @property {string} label 选项显示的文本。
 */

/**
 * @typedef MultiButtonsOptions
 * @property {MultiButtonsOption[]} options 选项数组。
 * @property {string} value 当前选中的值。
 * @property {(value: string) => void} onChange 值改变时的回调。
 * @property {"extra_small" | "small" | "middle" | "large" | "extra_large"} [size] 按钮宽度尺寸，默认 "middle"。
 * @property {"small" | "medium" | "large"} [height] 按钮高度尺寸，默认 "small"。
 * @property {"extra_small" | "small" | "middle" | "large" | "extra_large"} [fontSize] 字体大小，默认 "large"。
 */

/**
 * 一组并列的按钮，用于二选一或多选一。
 * 选中的按钮使用 green_btn_pressed 样式，未选中的使用 white_btn 样式。
 * 支持自定义宽度、高度和字体大小。
 * @param {MultiButtonsOptions} param0
 */
export default function MultiButtons({
  options,
  value,
  onChange,
  size = "middle",
  height = "small",
  fontSize = "middle",
}) {
  const fontSizeClass = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.large;

  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        margin: "1rem 0",
      }}
    >
      {options.map((option, index) => {
        const isLast = index === options.length - 1;
        const isSelected = option.value === value;

        const baseClass = `btn ${size}_btn`;
        const colorClass = isSelected ? "green_btn_pressed" : "white_btn";
        const heightClass = isSelected 
          ? `green_btn_pressed_${height}` 
          : `btn_height_${height}`;

        return (
          <button
            key={option.value}
            className={`${baseClass} ${colorClass} ${heightClass} ${fontSizeClass}`}
            onClick={() => onChange(option.value)}
            style={{
              flex: "1 1 0%",
              margin: 0,
              borderRightWidth: isLast ? "2px" : 0,
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}