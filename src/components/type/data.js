import React from "react";
import MinecraftStyleTooltip from "../tooltip/minecraftStyle"; // 确保路径正确

// 类型 → 显示文本映射
const TYPE_LABELS = {
  array: "JSON 数组",
  boolean: "布尔值",
  float: "浮点数",
  int: "整数",
  object: "JSON 对象",
  string: "字符串",
};

/**
 * @typedef DataTypeOptions
 * @property {"array" | "boolean" | "float" | "int" | "object" | "string"} type 数据类型。
 * @property {string} [name] 数据名称。
 * @property {boolean} [isRequired] 该数据是否为必选项。若是，则整体加粗后显示一个星号代表必选。
 */

/** 数据类型。显示一个变量为特定的数据类型。
 * @param {DataTypeOptions} param0
 * @returns
 */
export default function DataType({ type, name, isRequired = false }) {
  const imgPath = `/img/dataType/${type}.svg`;
  const requiredIndicator = isRequired ? <strong>*</strong> : null;
  const hasName = name ? (
    isRequired ? (
      <strong>
        <code>{name}</code>
      </strong>
    ) : (
      <code>{name}</code>
    )
  ) : null;

  // 内容：图标 + 名称 + 必选标识
  const content = (
    <>
      <img
        src={imgPath}
        alt={`${name || type} 数据类型图标`}
        style={{ width: "18px", height: "18px", verticalAlign: "middle" }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      {hasName}
      {requiredIndicator}
    </>
  );

  // 检查 type 是否有效
  const baseTooltip = TYPE_LABELS[type];
  if (!baseTooltip) {
    // 无效类型（如 "integer"），不显示 Tooltip
    return <span>{content}</span>;
  }

  // 根据 isRequired 生成最终 tooltip 文本
  const tooltipText = isRequired ? `${baseTooltip}（必选）` : baseTooltip;

  // 使用 Minecraft 风格 Tooltip 包裹
  return <MinecraftStyleTooltip text={tooltipText}>{content}</MinecraftStyleTooltip>;
}
