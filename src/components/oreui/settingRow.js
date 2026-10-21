import React from "react";

/**
 * OreUI 设置行。
 *
 * 对应基岩版设置页的每一行：左侧标题 + 灰色说明，右侧控件。
 * 行与行之间由 2px 暗线分隔，最后一行不留线。
 *
 * @param {object} props
 * @param {string} props.title 行标题
 * @param {React.ReactNode} [props.titleAside] 标题行右侧的当前值（如「100%」）
 * @param {React.ReactNode} [props.description] 灰色说明文字
 * @param {boolean} [props.stack] 控件较宽时（分段按钮、滑块）换行铺满整行
 * @param {React.ReactNode} props.children 右侧控件（开关、滑块、分段按钮等）
 */
export default function SettingRow({ title, titleAside, description, stack = false, children }) {
    return (
        <div className={`oreui-row${stack ? " oreui-row--stack" : ""}`}>
            <div className="oreui-row__text">
                <p className="oreui-row__title">
                    <span>{title}</span>
                    {titleAside ? <span className="oreui-row__value">{titleAside}</span> : undefined}
                </p>
                {description ? <p className="oreui-row__desc">{description}</p> : undefined}
            </div>
            <div className="oreui-row__control">{children}</div>
        </div>
    );
}
