import React from "react";
import BaseHighlight from "./base";

// 中国版当前支持的格式版本
const CHINA_VERSION = "1.21.90";

/**
 * 比较两个语义化版本号，返回 version1 > version2 布尔值
 * @param {string} v1
 * @param {string} v2
 * @returns {boolean}
 */
function isVersionGreater(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  const len = Math.max(parts1.length, parts2.length);
  for (let i = 0; i < len; i++) {
    const n1 = parts1[i] || 0;
    const n2 = parts2[i] || 0;
    if (n1 > n2) return true;
    if (n1 < n2) return false;
  }
  return false; // 相等
}

/**
 * @typedef VersionHighlightOptions
 * @property {string} add 版本信息。
 * @property {string} [experimental] 需要开启的实验性玩法。
 * @property {boolean} [removed] 是否被移除。
 * @property {string} [deprecated] 被弃用的版本。
 * @property {string} tooltip 鼠标悬停时显示的提示。但在此基础上会多出一些基础内容。
 * @property {boolean} [inline] 是否为行内高亮文本。若是则取消文本附近的间隔。
 */

/** 版本高亮。
 * @param {VersionHighlightOptions} param0
 */
export default function VersionHighlight({
  add = "",
  experimental = "",
  removed = false,
  deprecated,
  tooltip = "",
  inline = false,
}) {
  // 正常颜色
  let color = "yellowgreen";
  let text = `${add}+`;
  let newTooltip = `该特性在格式版本${add}+下可用。${tooltip}`;

  if (add && isVersionGreater(add, CHINA_VERSION)) {
    color = "gold";
    newTooltip = `该特性在格式版本${add}+下可用，但该版本对于当前的中国版版本过高。${tooltip}`;
  }

  // 如果是实验性玩法
  if (experimental) {
    color = "red";
    text = "实验性玩法";
    newTooltip = `该特性必须开启「${experimental}」实验性玩法后方可使用。请注意，实验性玩法存在功能不稳定、功能更改甚至未来被移除的风险。${tooltip}`;
  }

  // 如果是弃用特性
  if (deprecated) {
    color = "red";
    text = `已弃用：${add}-${deprecated}`;
    newTooltip = `该特性已被弃用，只能在格式版本${add}-${deprecated}下使用。${tooltip}`;
  }

  // 如果是移除特性
  if (removed) {
    color = "red";
    text = "已移除";
    newTooltip = `该特性已被移除，无法使用。${tooltip}`;
  }

  // 返回高亮组件
  return <BaseHighlight text={text} color={color} tooltip={newTooltip} inline={inline} />;
}