// src/theme/Root.js
import React, { useEffect } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";

// ================================================================
// 用户偏好的启动期恢复
// ---------------------------------------------------------------
// 设置页把偏好写进 localStorage，这里在每次进入站点时读回来并应用到 <html>：
//   oreui-font-mode → data-font（字体风格）
//   oreui-scale     → 根字号百分比（界面缩放）
//   （oreui-motion 不在这里处理：它只作用于首页，由首页自己读取）
// 同时监听跨标签页的变更，保证多标签一致。
// ================================================================

const KEY_FONT = "oreui-font-mode";
const KEY_SCALE = "oreui-scale";

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

    // 「减少首页动态效果」不加在 <html> 上，否则会压掉全站动画
    delete root.dataset.motion;
}

function PreferenceManager() {
    const isBrowser = useIsBrowser();

    useEffect(() => {
        if (!isBrowser) return undefined;

        applyAllPreferences();

        const handleStorageChange = event => {
            if (event.key === KEY_FONT || event.key === KEY_SCALE) {
                applyAllPreferences();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [isBrowser]);

    // 此组件不渲染任何 UI
    return null;
}

export default function Root({ children }) {
    return (
        <>
            <PreferenceManager />
            {children}
        </>
    );
}
