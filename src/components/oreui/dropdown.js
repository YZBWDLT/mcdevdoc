import React, { useEffect, useRef, useState } from "react";

// 8×8 像素贴图：用 require 引入，webpack 会把它们内联成 data URI，
// 不产生额外请求（站点曾在 EdgeOne 上出现过外链图取不到的问题）
const CHEVRON_SRC = require("@site/static/ui/dropdown_drop.png").default;
const CHECK_SRC = require("@site/static/ui/dropdown_chosen.png").default;

/**
 * OreUI 下拉选择（形态取自 DDUI 的实机截图）。
 *
 * 收起态：浅灰方块 + 近黑描边 + 右侧三角。
 * 展开态：带浅色描边的列表，选项之间用细线分隔，**当前项右侧打勾**。
 *
 * @param {object} props
 * @param {{value: string, label: string}[]} props.options 选项
 * @param {string} props.value 当前值
 * @param {(value: string) => void} props.onChange 选中回调
 * @param {string} [props.label] 无障碍标签
 * @param {string} [props.placeholder] 没有值时显示的占位文字
 */
export default function OreDropdown({ options, value, onChange, label, placeholder = "请选择" }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    // 点击外部或按 Esc 关闭
    useEffect(() => {
        if (!open) return undefined;

        const handlePointerDown = event => {
            if (rootRef.current && !rootRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        const handleKeyDown = event => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const selected = options.find(option => option.value === value);

    return (
        <div className="oreui-dropdown" ref={rootRef}>
            <button
                type="button"
                className="oreui-dropdown__button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={label}
                onClick={() => setOpen(current => !current)}
            >
                <span className={selected ? undefined : "oreui-dropdown__placeholder"}>
                    {selected ? selected.label : placeholder}
                </span>
                {/* 像素贴图：8×8 放大两倍，image-rendering: pixelated 保锐利 */}
                <img
                    className="oreui-dropdown__chevron"
                    src={CHEVRON_SRC}
                    alt=""
                    width="16"
                    height="16"
                    aria-hidden="true"
                />
            </button>

            {open ? (
                <ul className="oreui-dropdown__list" role="listbox" aria-label={label}>
                    {options.map(option => (
                        <li key={option.value} role="option" aria-selected={option.value === value}>
                            <button
                                type="button"
                                className="oreui-dropdown__option"
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                            >
                                <span>{option.label}</span>
                                {option.value === value ? (
                                    <img
                                        className="oreui-dropdown__check"
                                        src={CHECK_SRC}
                                        alt=""
                                        width="16"
                                        height="16"
                                        aria-hidden="true"
                                    />
                                ) : undefined}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : undefined}
        </div>
    );
}
