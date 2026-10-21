import React, { useId } from "react";

/**
 * OreUI 开关（对应基岩版设置页右侧的拨动开关）。
 *
 * 形态取自实机截图：深色方形轨道 + 绿色填充 + **方形**白色滑块（不是圆形），
 * 全部直角、无圆角，开启时绿色从左侧铺满。
 *
 * @param {object} props
 * @param {boolean} props.checked 是否开启
 * @param {(checked: boolean) => void} props.onChange 切换回调
 * @param {string} [props.label] 无障碍标签
 */
export default function OreSwitch({ checked, onChange, label }) {
    const id = useId();

    return (
        <label className="oreui-switch">
            <input
                id={id}
                type="checkbox"
                role="switch"
                className="oreui-switch__input"
                checked={checked}
                aria-label={label}
                onChange={event => onChange(event.target.checked)}
            />
            <span className="oreui-switch__track">
                <span className="oreui-switch__knob" />
            </span>
        </label>
    );
}
