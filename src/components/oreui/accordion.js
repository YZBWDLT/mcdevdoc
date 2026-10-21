import React from "react";

// 与下拉框用同一张像素箭头，展开时旋转 180° 变成「∧」
const CHEVRON_SRC = require("@site/static/ui/dropdown_drop.png").default;

/**
 * OreUI 折叠栏（用于详情 / FAQ）。
 *
 * 基于原生 <details>，键盘与无障碍免费获得，不需要 JS。
 * 形态取自实机：行底 #48494b、悬停变亮、展开时表头压暗、正文在下方单独一块。
 *
 * @param {object} props
 * @param {string} [props.title] 分组标题（左边那块紫色小条）
 * @param {React.ReactNode} props.children 若干 <AccordionItem>
 */
export default function Accordion({ title, children }) {
    return (
        <div className="oreui-accordion">
            {title ? <div className="oreui-accordion__title">{title}</div> : undefined}
            <div className="oreui-accordion__list">{children}</div>
        </div>
    );
}

/**
 * 折叠栏的单项。
 *
 * @param {object} props
 * @param {React.ReactNode} props.summary 收起时显示的那一行（标题）
 * @param {React.ReactNode} props.children 展开后的内容
 * @param {boolean} [props.defaultOpen] 是否默认展开
 */
export function AccordionItem({ summary, children, defaultOpen = false }) {
    return (
        <details className="oreui-accordion__item" {...(defaultOpen ? { open: true } : {})}>
            <summary className="oreui-accordion__summary">
                <span className="oreui-accordion__label">{summary}</span>
                <img
                    className="oreui-accordion__chevron"
                    src={CHEVRON_SRC}
                    alt=""
                    width="16"
                    height="16"
                    aria-hidden="true"
                />
            </summary>
            <div className="oreui-accordion__content">{children}</div>
        </details>
    );
}
