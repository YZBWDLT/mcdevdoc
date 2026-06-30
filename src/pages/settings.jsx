// ================================================================
// settings.jsx
// 站点设置页面：字体切换、布局偏好等
// ================================================================

import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import MultiButtons from "../components/button/multiButtons";
import styles from "./settings.module.css";

// ================================================================
// 字体选项配置
// ================================================================

/** 字体选项数组：value 对应 data-font 属性值，label 为显示文本 */
const FONT_OPTIONS = [
    { value: "official", label: "Minecraft 官网" },
    { value: "pixel", label: "Minecraft 游戏内" },
    { value: "misans", label: "MiSans" },
];

/** 默认字体模式（当 localStorage 无记录时使用） */
const DEFAULT_FONT_MODE = "pixel";

/** localStorage 中存储字体偏好的键名 */
const STORAGE_KEY = "oreui-font-mode";

// ================================================================
// 主组件
// ================================================================

export default function Settings() {
    // ---------- 状态 ----------
    // 当前字体模式：从 html 的 data-font 属性读取，默认 'pixel'
    const [fontMode, setFontMode] = useState(DEFAULT_FONT_MODE);

    // ---------- 初始化 ----------
    // 页面加载时，同步 data-font 到 React 状态
    useEffect(() => {
        const current = document.documentElement.dataset.font || DEFAULT_FONT_MODE;
        setFontMode(current);
    }, []); // 仅在挂载时执行一次

    // ---------- 事件处理 ----------
    /**
     * 切换字体模式
     * 1. 更新 React 状态
     * 2. 设置 / 移除 data-font 属性（实际控制 CSS 变量）
     * 3. 保存 / 移除 localStorage（跨页面持久化）
     *
     * @param {string} mode - 'pixel' | 'official' | 'misans'
     */
    const handleFontChange = mode => {
        // 1. 更新状态
        setFontMode(mode);

        // 2. 更新 DOM 属性 & localStorage
        if (mode === DEFAULT_FONT_MODE) {
            // 默认模式：清除自定义属性，恢复 CSS 默认值
            delete document.documentElement.dataset.font;
            localStorage.removeItem(STORAGE_KEY);
        } else {
            // 其他模式：设置 data-font 属性，触发 CSS 变量覆盖
            document.documentElement.dataset.font = mode;
            localStorage.setItem(STORAGE_KEY, mode);
        }
    };

    // ---------- 渲染 ----------
    return (
        <Layout title="设置" description="自定义网站显示偏好">
            <div className={styles.container}>
                {/* 页面标题 */}
                <h1 className={styles.title}>设置</h1>

                {/* 设置卡片网格 */}
                <div className={styles.cardGrid}>
                    {/* ---- 卡片 1：字体选择 ---- */}
                    <div className={styles.card}>
                        <h2>字体选择</h2>
                        <p>选择网站使用的字体风格：</p>
                        <div className={styles.btnGroup}>
                            <MultiButtons
                                options={FONT_OPTIONS}
                                value={fontMode}
                                onChange={handleFontChange}
                                height="middle"
                            />
                        </div>
                    </div>

                    {/* ---- 卡片 2：其他设置（预留） ---- */}
                    <div className={styles.card}>
                        <h2>其他设置</h2>
                        <p>即将推出……</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
