import React from "react";

/**
 * 对勾的点阵。
 *
 * 照 .workbuddy/refs/oreui/Ore_UI_Design_System_Updated.png 里那个「☑ Label」画的：
 * 方块**对角相接**，中间留出绿色的缺口 —— 不是连续横带，也不是叠在一起的粗块。
 * 左臂两块下到谷底，右臂五块上行收尾。
 *
 * 9×9 网格、每格 2px（svg 18px），方块 1 格，所以放大后每个台阶都是一个方块。
 * 不能用 <path> 描边：斜线在 SVG 里一律抗锯齿，放大就糊成圆的。
 */
const TICK_PIXELS = [
    [1, 5],
    [2, 6],
    [3, 7], // 谷底
    [4, 6],
    [5, 5],
    [6, 4],
    [7, 3],
    [8, 2],
];

/**
 * OreUI 勾选框。
 *
 * 形态取自设置页的「方块 + 勾」：方框是凹陷的深色面板，
 * 勾选后换成主题绿并显示一个白色像素勾。没有厚度条，属于板面语言。
 *
 * 整行可点 —— 框小、字也小，只有框能点会很别扭。
 *
 * @param {object} props
 * @param {boolean} props.checked 是否勾选
 * @param {(checked: boolean) => void} props.onChange 切换回调
 * @param {string} props.label 文字
 * @param {number} [props.count] 右侧的计数，省略则不显示
 * @param {string} [props.title] 悬停提示（说明这个勾选项是什么）
 */
export default function OreCheckbox({ checked, onChange, label, count, title }) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            className="oreui-check"
            title={title}
            onClick={() => onChange(!checked)}
        >
            <span className="oreui-check__box" aria-hidden="true">
                {checked && (
                    <svg viewBox="0 0 9 9" shapeRendering="crispEdges" focusable="false">
                        {TICK_PIXELS.map(([x, y]) => (
                            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#ffffff" />
                        ))}
                    </svg>
                )}
            </span>
            <span className="oreui-check__label">{label}</span>
            {typeof count === "number" && <span className="oreui-check__count">{count}</span>}
        </button>
    );
}
