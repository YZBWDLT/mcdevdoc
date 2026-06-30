// src/pages/settings.jsx
import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import MultiButtons from "../components/button/multiButtons";
import styles from "./settings.module.css";

export default function Settings() {
  // 当前字体模式：从 html 的 data-font 属性读取，默认 'pixel'
  const [fontMode, setFontMode] = useState("pixel");

  // 初始化：同步 data-font 到 React 状态
  useEffect(() => {
    const current = document.documentElement.dataset.font || "pixel";
    setFontMode(current);
  }, []);

  /**
   * 切换字体模式
   * @param {string} mode - 'pixel' | 'official' | 'misans'
   */
  const handleFontChange = (mode) => {
    setFontMode(mode);
    if (mode === "pixel") {
      // 默认模式：删除 data-font 属性，移除 localStorage
      delete document.documentElement.dataset.font;
      localStorage.removeItem("oreui-font-mode");
    } else {
      // 其他模式：设置 data-font 并保存到 localStorage
      document.documentElement.dataset.font = mode;
      localStorage.setItem("oreui-font-mode", mode);
    }
  };

  // 字体选项（顺序：官网、游戏内、MiSans）
  const fontOptions = [
    { value: "official", label: "Minecraft 官网" },
    { value: "pixel", label: "Minecraft 游戏内" },
    { value: "misans", label: "MiSans" },
  ];

  return (
    <Layout title="设置" description="自定义网站显示偏好">
      <div className={styles.container}>
        {/* 页面标题（左上角） */}
        <h1 className={styles.title}>设置</h1>
        <p>自定义网站显示偏好。</p>

        {/* 卡片网格 */}
        <div className={styles.cardGrid}>
          {/* 卡片 1：字体选择 */}
          <div className={styles.card}>
            <h2>字体选择</h2>
            <p>选择网站使用的字体风格：</p>
            <MultiButtons
              options={fontOptions}
              value={fontMode}
              onChange={handleFontChange}
              height="middle"
            />
          </div>

          {/* 卡片 2：示例（预留） */}
          <div className={styles.card}>
            <h2>其他设置</h2>
            <p>即将推出……</p>
            {/* 此处可放置未来组件 */}
          </div>
        </div>
      </div>
    </Layout>
  );
}