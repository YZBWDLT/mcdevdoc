// 独立的 Tooltip 组件，可为任意内容添加 Minecraft 风格悬浮提示
import React, { useState, useRef, useEffect } from "react";

export default function MinecraftStyleTooltip({ children, text }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [adjustedPos, setAdjustedPos] = useState({ x: 0, y: 0 });
    const wrapperRef = useRef(null);
    const tooltipRef = useRef(null);

    // 检测是否支持悬停（桌面）
    const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
    const isTouchDevice = !canHover;

    // 鼠标移动更新位置（仅桌面）
    useEffect(() => {
        if (isTouchDevice || !showTooltip) return;
        const onMouseMove = e => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [showTooltip, isTouchDevice]);

    // 点击外部关闭
    useEffect(() => {
        const handleClickOutside = event => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 事件处理
    const handleMouseEnter = e => {
        setShowTooltip(true);
        setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseLeave = () => setShowTooltip(false);
    const handleClick = e => {
        e.stopPropagation();
        const newShow = !showTooltip;
        setShowTooltip(newShow);
        if (newShow) {
            setPosition({ x: e.clientX, y: e.clientY });
        }
    };

    // 边界检测与位置修正（左对齐）
    useEffect(() => {
        if (!showTooltip || !tooltipRef.current) return;
        const rect = tooltipRef.current.getBoundingClientRect();
        const { innerWidth, innerHeight } = window;

        // 水平方向：左对齐，防止溢出
        let x = position.x;
        if (x + rect.width > innerWidth) {
            x = innerWidth - rect.width;
        }
        if (x < 0) {
            x = 0;
        }

        // 垂直方向：优先显示在上方，空间不足则显示在下方
        let y = position.y - 8;
        const tooltipHeight = rect.height;
        if (y - tooltipHeight < 0) {
            y = position.y + 8 + tooltipHeight;
        } else {
            y = position.y - 8;
        }

        setAdjustedPos({ x, y });
    }, [showTooltip, position]);

    const eventHandlers = isTouchDevice
        ? { onClick: handleClick }
        : { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave };

    const tooltipStyle = {
        left: adjustedPos.x + "px",
        top: adjustedPos.y + "px",
        transform: "translateY(-100%)", // 仅垂直向上偏移，水平不居中
        whiteSpace: "normal",
        maxWidth: (typeof window !== "undefined" ? window.innerWidth - 40 : 300) + "px",
        wordBreak: "break-word",
    };

    return (
        <span ref={wrapperRef} style={{ position: "relative", display: "inline-block" }} {...eventHandlers}>
            {children}
            <div ref={tooltipRef} className={`minetip-tooltip ${showTooltip ? "visible" : ""}`} style={tooltipStyle}>
                {text}
            </div>
        </span>
    );
}
