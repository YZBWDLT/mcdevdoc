import React from "react";
import Link from "@docusaurus/Link";

/**
 * OreUI 普通按钮。
 *
 * 与滑块、开关、分段按钮共用同一套四层结构（凸面）：
 *   脸 → 亮边（上/左/右 + 底）→ 厚度条 → 描边
 * 两种形态：
 *   green —— 主操作，文档里的「下载」按钮以后就用它
 *   light —— 次要操作
 *
 * 三种用法：
 *   <OreButton onClick={…}>按钮</OreButton>        纯按钮
 *   <OreButton to="/blog">站内跳转</OreButton>      渲染成 Docusaurus Link
 *   <OreButton href="https://…">外链</OreButton>   新窗口打开
 *
 * @param {object} props
 * @param {React.ReactNode} props.children 按钮文字
 * @param {"green" | "light"} [props.variant] 形态，默认 light
 * @param {React.ReactNode} [props.icon] 文字前的小图标
 * @param {() => void} [props.onClick] 点击回调
 * @param {string} [props.to] 站内链接
 * @param {string} [props.href] 外部链接
 * @param {"button" | "submit"} [props.type] 按钮类型
 * @param {boolean} [props.disabled] 禁用（链接形态会加上 oreui-button--disabled 类并拦截点击）
 */
export default function OreButton({
    children,
    variant = "light",
    icon,
    onClick,
    to,
    href,
    type = "button",
    disabled = false,
}) {
    // 链接不能被真正禁用，用修饰类 + 拦截点击模拟按钮的 disabled
    const className =
        `oreui-button oreui-button--${variant}` + (disabled ? " oreui-button--disabled" : "");
    const content = (
        <>
            {icon ? <span className="oreui-button__icon">{icon}</span> : undefined}
            <span>{children}</span>
        </>
    );

    if (to) {
        return (
            <Link className={className} to={to} onClick={disabled ? e => e.preventDefault() : undefined}>
                {content}
            </Link>
        );
    }

    if (href) {
        return (
            <a
                className={className}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={disabled ? e => e.preventDefault() : undefined}
            >
                {content}
            </a>
        );
    }

    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {content}
        </button>
    );
}
