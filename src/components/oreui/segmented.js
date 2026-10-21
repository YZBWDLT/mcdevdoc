import React from "react";

/**
 * OreUI 分段选择（对应设置页里「性能 / 视觉 / 自定义」那种连体按钮）。
 *
 * 特点：按钮之间**没有间隙**，共用一条描边；未选中是浅灰底 + 黑字，
 * 选中是绿底 + 白字，并在底部正中压一条白色短横线。
 *
 * @param {object} props
 * @param {{value: string, label: string}[]} props.options 选项
 * @param {string} props.value 当前选中值
 * @param {(value: string) => void} props.onChange 切换回调
 * @param {string} [props.label] 无障碍分组名
 */
export default function OreSegmented({ options, value, onChange, label }) {
    return (
        <div className="oreui-segmented" role="group" aria-label={label}>
            {options.map(option => (
                <button
                    key={option.value}
                    type="button"
                    aria-pressed={option.value === value}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
