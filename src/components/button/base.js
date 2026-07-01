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
 * @typedef BaseButtonOptions
 * @property {string} [text] 按钮文本。
 * @property {string} [url] 按钮链接地址。
 * @property {"extra_small" | "small" | "middle" | "large" | "extra_large"} [length] 按钮长度。默认值：`middle`。
 * @property {"extra_small" | "small" | "middle" | "large" | "extra_large"} [height] 按钮高度。默认值：`small`。
 * @property {"extra_small" | "small" | "middle" | "large" | "extra_large"} [fontSize] 字体大小。默认值：`middle`。
 * @property {"white" | "green" | "blue"} [color] 按钮颜色。
 * @property {string} [logo] 图片 URL（可选），将显示在文本前面。
 * @property {boolean} [openNewPage] 是否打开新的标签页。默认值：`true`。
 */

/** 基础按钮。
 * @param {BaseButtonOptions} buttonOptions
 * @returns
 */
export default function BaseButton(buttonOptions) {
  const {
    text = "",
    url = "",
    height = "small",
    length = "middle",
    color = "white",
    logo = "",
    openNewPage = true,
    fontSize = "middle",
  } = buttonOptions;

  /** @type {React.CSSProperties} */
  const logoStyle = {
    height: "1.2em",
    width: "auto",
    marginRight: "6px",
    verticalAlign: "middle",
    display: "inline-block",
  };

  const target = openNewPage ? "_blank" : "_self";
  const rel = openNewPage ? "noopener noreferrer" : undefined;

  // 根据 fontSize 获取对应的 CSS 类名
  const fontSizeClass = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.middle;

  return (
    <a
      href={url}
      className={`btn ${color}_btn ${length}_btn btn_height_${height} ${fontSizeClass}`}
      target={target}
      rel={rel}
      style={{marginTop: "10px", marginBottom: "10px"}}
    >
      {logo && <img src={logo} alt="" style={logoStyle} />}
      {text}
    </a>
  );
}