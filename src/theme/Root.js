// src/theme/Root.js
import React, { useEffect } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import OverlayScrollbar from "@site/src/components/oreui/OverlayScrollbar";

// ================================================================
// 用户偏好的启动期恢复
// ---------------------------------------------------------------
// 设置页把偏好写进 localStorage，这里在每次进入站点时读回来并应用到 <html>：
//   oreui-font-mode → data-font（字体风格）
//   oreui-scale     → 根字号百分比（界面缩放）
//   oreui-code-bg   → data-code-bg（行内代码背景）
//   （oreui-motion 不在这里处理：它只作用于首页，由首页自己读取）
// 同时监听跨标签页的变更，保证多标签一致。
// ================================================================

const KEY_FONT = "oreui-font-mode";
const KEY_SCALE = "oreui-scale";
const KEY_CODE_BG = "oreui-code-bg";

function applyAllPreferences() {
    const root = document.documentElement;

    // 字体：除默认的 pixel 外一律写入 data-font
    const font = localStorage.getItem(KEY_FONT);
    if (font && font !== "pixel") {
        root.dataset.font = font;
    } else {
        delete root.dataset.font;
    }

    // 界面缩放
    const scale = Number(localStorage.getItem(KEY_SCALE));
    if (scale && scale !== 100) {
        root.style.fontSize = `${scale}%`;
    } else {
        root.style.removeProperty("font-size");
    }

    // 行内代码背景（默认开启，只有被显式关掉时才挂 off）
    if (localStorage.getItem(KEY_CODE_BG) === "0") {
        root.dataset.codeBg = "off";
    } else {
        delete root.dataset.codeBg;
    }

    // 「减少首页动态效果」不加在 <html> 上，否则会压掉全站动画
    delete root.dataset.motion;
}

function PreferenceManager() {
    const isBrowser = useIsBrowser();

    useEffect(() => {
        if (!isBrowser) return undefined;

        applyAllPreferences();

        const handleStorageChange = event => {
            if (event.key === KEY_FONT || event.key === KEY_SCALE || event.key === KEY_CODE_BG) {
                applyAllPreferences();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [isBrowser]);

    // 此组件不渲染任何 UI
    return null;
}

// ================================================================
// 滚动桥（ScrollBridge）
// ---------------------------------------------------------------
// 站点把滚动容器换成了 #__docusaurus（html/body 是 overflow: clip），
// 而主题的「回到顶部」按钮是靠 window 的滚动位置决定显示、靠 window.scrollTo 回顶 ——
// 在这套结构里它永远不会出现，点了也不会动。
// 这里补两件事：
//   1. 监听容器的滚动，往 <html> 挂 data-scrolled="on|off"，按钮的显隐交给 CSS；
//   2. 在捕获阶段接管按钮的点击，改成滚容器。
// ================================================================
function ScrollBridge() {
    const isBrowser = useIsBrowser();

    useEffect(() => {
        if (!isBrowser) return undefined;

        const container = document.getElementById("__docusaurus");
        if (!container) return undefined;

        const sync = () => {
            document.documentElement.dataset.scrolled = container.scrollTop > 400 ? "on" : "off";
        };

        const handleClick = event => {
            const target = event.target;
            if (!(target instanceof Element)) return;
            const button = target.closest(".theme-back-to-top-button");
            if (!button) return;
            // 主题的处理器是滚 window，这里拦掉，改成滚我们的容器
            event.preventDefault();
            event.stopPropagation();
            container.scrollTo({ top: 0, behavior: "smooth" });
        };

        container.addEventListener("scroll", sync, { passive: true });
        document.addEventListener("click", handleClick, true);
        sync();

        return () => {
            container.removeEventListener("scroll", sync);
            document.removeEventListener("click", handleClick, true);
        };
    }, [isBrowser]);

    return null;
}

export default function Root({ children }) {
    return (
        <>
            <PreferenceManager />
            <ScrollBridge />
            {children}
            <OverlayScrollbar />
        </>
    );
}
