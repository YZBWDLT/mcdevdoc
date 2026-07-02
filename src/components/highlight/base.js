import React from "react";
import MinecraftStyleTooltip from "../tooltip/minecraftStyle";

/**
 * @typedef BaseHighlightOptions
 * @property {string} text 高亮文本。
 * @property {string} [color] 高亮背景色。默认 `"gold"`。
 * @property {string} [size] 字体大小。预设值：`extra_small` | `small` | `medium` | `large` | `extra_large`，也支持直接写尺寸。默认 `"medium"`。
 * @property {string} [tooltip] 鼠标悬浮/点击提示文本。为空则不显示提示。
 * @property {boolean} [inline] 是否为行内高亮文本。若是则取消文本附近的间隔。
 */

const SIZE_MAP = {
    extra_small: "0.75rem",
    small: "0.875rem",
    medium: "1rem",
    large: "1.25rem",
    extra_large: "1.5rem",
};

function parseColorToRgb(color) {
    let hex = color.trim();
    const namedColors = {
        white: "#ffffff",
        black: "#000000",
        red: "#ff0000",
        green: "#008000",
        blue: "#0000ff",
        yellow: "#ffff00",
        orange: "#ffa500",
        pink: "#ffc0cb",
        purple: "#800080",
        brown: "#a52a2a",
        cyan: "#00ffff",
        magenta: "#ff00ff",
        lime: "#00ff00",
        olive: "#808000",
        teal: "#008080",
        navy: "#000080",
        gold: "#ffd700",
        silver: "#c0c0c0",
        gray: "#808080",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
    };
    if (namedColors[color.toLowerCase()]) {
        hex = namedColors[color.toLowerCase()];
    }

    if (hex.startsWith("#")) {
        let raw = hex.slice(1);
        if (raw.length === 3) {
            raw = raw
                .split("")
                .map(c => c + c)
                .join("");
        }
        if (raw.length === 6) {
            const r = parseInt(raw.substring(0, 2), 16);
            const g = parseInt(raw.substring(2, 4), 16);
            const b = parseInt(raw.substring(4, 6), 16);
            return [r, g, b];
        }
        return null;
    }

    const rgbMatch = hex.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (rgbMatch) {
        return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
    }
    return null;
}

function getContrastColor(color) {
    const rgb = parseColorToRgb(color);
    if (!rgb) return "#000000";
    const [r, g, b] = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
}

/** 基础高亮组件。
 * @param {BaseHighlightOptions} param0
 * @returns
 */
export default function BaseHighlight({ text, color = "gold", size = "medium", tooltip = "", inline = false }) {
    const fontSize = SIZE_MAP[size] || size;
    const textColor = getContrastColor(color);
    /** @type {React.CSSProperties} */
    const highlightStyle = {
        backgroundColor: color,
        color: textColor,
        padding: inline ? "0em 0.1em" : "0.2em 0.3em",
        fontSize: fontSize,
        display: "inline",
        boxDecorationBreak: "clone",
        cursor: tooltip ? "help" : "default",
        marginRight: "6px",
    };
    const content = <span style={highlightStyle}>{text}</span>;
    if (tooltip) {
        return <MinecraftStyleTooltip text={tooltip}>{content}</MinecraftStyleTooltip>;
    }
    return content;
}
