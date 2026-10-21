// ================================================================
// settings.jsx
// 站点设置页：字体、界面缩放、动效
// ---------------------------------------------------------------
// 控件全部使用 OreUI 形态（分段选择 / 滑块 / 开关 / 输入框 / 按钮），
// 组件在 src/components/oreui/，样式在 src/css/oreui-core.css 第五部分。
// ================================================================

import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import SettingRow from "../components/oreui/settingRow";
import OreSegmented from "../components/oreui/segmented";
import OreSlider from "../components/oreui/slider";
import OreSwitch from "../components/oreui/switch";
import OreButton from "../components/oreui/button";
import styles from "./settings.module.css";

// ================================================================
// 配置与常量
// ================================================================

/** 字体选项：value 对应 <html data-font> 的值 */
const FONT_OPTIONS = [
    { value: "official", label: "官网" },
    { value: "pixel", label: "OreUI" },
    { value: "unifont", label: "游戏内" },
    { value: "misans", label: "MiSans" },
];

/** 外链小工具：统一新窗口打开 */
function Ext({ href, children }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
}

/** 每种字体实际用的字族说明，随选中项切换 */
const FONT_DESC = {
    official: (
        <>
            中文 <Ext href="https://github.com/adobe-fonts/source-han-sans">思源黑体</Ext>，英文 Noto Sans
            （取自 <Ext href="https://www.minecraft.net">Minecraft 官网</Ext>）
        </>
    ),
    pixel: (
        <>
            中文 <Ext href="https://hyperos.mi.com/font/zh/">MiSans</Ext>，英文 Minecraft 字体
        </>
    ),
    unifont: <>中英文均为 Minecraft 字体</>,
    misans: (
        <>
            中英文均为 <Ext href="https://hyperos.mi.com/font/zh/">MiSans</Ext>
        </>
    ),
};

/** 界面缩放范围（百分比）。50% 适合小屏塞下更多内容，200% 适合投屏或截图 */
const SCALE_MIN = 50;
const SCALE_MAX = 150;
const SCALE_STEP = 10;

/** 默认值 */
const DEFAULT_FONT_MODE = "pixel";
const DEFAULT_SCALE = 100;
const DEFAULT_MOTION_REDUCED = false;

/** localStorage 键名 */
const KEY_FONT = "oreui-font-mode";
const KEY_SCALE = "oreui-scale";
const KEY_MOTION = "oreui-motion";

// ================================================================
// 应用到 <html>
// ================================================================

/** 字体：除默认 pixel 外都写入 data-font */
function applyFont(mode) {
    if (mode && mode !== DEFAULT_FONT_MODE) {
        document.documentElement.dataset.font = mode;
        localStorage.setItem(KEY_FONT, mode);
    } else {
        delete document.documentElement.dataset.font;
        localStorage.removeItem(KEY_FONT);
    }
}

/** 界面缩放：直接改根字号，全站 rem 一起缩放 */
function applyScale(scale) {
    if (scale === DEFAULT_SCALE) {
        document.documentElement.style.removeProperty("font-size");
        localStorage.removeItem(KEY_SCALE);
    } else {
        document.documentElement.style.fontSize = `${scale}%`;
        localStorage.setItem(KEY_SCALE, String(scale));
    }
}

/** 动效：只写 localStorage。首页挂载时读取它，并把 data-motion 加在首页容器上，
    因此这个开关只影响首页，不会波及其它页面的动画。 */
function applyMotion(reduced) {
    if (reduced) {
        localStorage.setItem(KEY_MOTION, "reduced");
    } else {
        localStorage.removeItem(KEY_MOTION);
    }
    // 清掉可能由旧版本留在 <html> 上的属性，避免误伤全站
    delete document.documentElement.dataset.motion;
}

// ================================================================
// 页面
// ================================================================

export default function Settings() {
    const [fontMode, setFontMode] = useState(DEFAULT_FONT_MODE);
    const [scale, setScale] = useState(DEFAULT_SCALE);
    const [motionReduced, setMotionReduced] = useState(DEFAULT_MOTION_REDUCED);

    // 首次挂载时把已保存的偏好读回界面
    useEffect(() => {
        setFontMode(document.documentElement.dataset.font || DEFAULT_FONT_MODE);
        setMotionReduced(localStorage.getItem(KEY_MOTION) === "reduced");

        const savedScale = Number(localStorage.getItem(KEY_SCALE));
        if (savedScale >= SCALE_MIN && savedScale <= SCALE_MAX) {
            setScale(savedScale);
        }
    }, []);

    const handleFontChange = mode => {
        setFontMode(mode);
        applyFont(mode);
    };

    const handleScaleChange = value => {
        setScale(value);
        applyScale(value);
    };

    const handleMotionChange = reduced => {
        setMotionReduced(reduced);
        applyMotion(reduced);
    };

    /** 全部恢复默认：字体、缩放、动效一起归位，并清掉本地存储 */
    const handleReset = () => {
        setFontMode(DEFAULT_FONT_MODE);
        applyFont(DEFAULT_FONT_MODE);
        setScale(DEFAULT_SCALE);
        applyScale(DEFAULT_SCALE);
        setMotionReduced(DEFAULT_MOTION_REDUCED);
        applyMotion(DEFAULT_MOTION_REDUCED);
    };

    return (
        <Layout title="设置" description="对本站的外观、动画等进行设置。">
            <div className={styles.container}>
                <h1 className={styles.title}>设置</h1>
                <p className={styles.intro}>对本站的外观、动画等进行设置。</p>

                {/* ---- 显示 ---- */}
                <section className={styles.group}>
                    <h2 className={styles.groupTitle}>显示</h2>
                    <p className={styles.groupDesc}>调整本站的外观。</p>

                    <div className={`${styles.panel} oreui-panel oreui-panel--light`}>
                        <SettingRow
                            stack
                            title="字体风格"
                            description={FONT_DESC[fontMode]}
                        >
                            <OreSegmented
                                options={FONT_OPTIONS}
                                value={fontMode}
                                onChange={handleFontChange}
                                label="字体风格"
                            />
                        </SettingRow>

                        <SettingRow
                            stack
                            title="界面缩放"
                            titleAside={`${scale}%`}
                            description="调整页面的字号与间距。"
                        >
                            <OreSlider
                                value={scale}
                                min={SCALE_MIN}
                                max={SCALE_MAX}
                                step={SCALE_STEP}
                                onChange={handleScaleChange}
                                label="界面缩放"
                            />
                        </SettingRow>
                    </div>
                </section>

                {/* ---- 动效 ---- */}
                <section className={styles.group}>
                    <h2 className={styles.groupTitle}>动效</h2>
                    <p className={styles.groupDesc}>调整本站的动画效果。</p>

                    <div className={`${styles.panel} oreui-panel oreui-panel--light`}>
                        <SettingRow
                            title="减少首页动态效果"
                            description="关闭首页标题的逐字打出、内容上浮与页面切换动画。其它页面的动画不受影响。"
                        >
                            <OreSwitch
                                checked={motionReduced}
                                onChange={handleMotionChange}
                                label="减少首页动态效果"
                            />
                        </SettingRow>
                    </div>
                </section>

                {/* ---- 恢复默认 ---- */}
                <section className={styles.group}>
                    <div className={`${styles.panel} oreui-panel oreui-panel--light`}>
                        <SettingRow title="恢复默认设置">
                            <OreButton variant="light" onClick={handleReset}>
                                恢复
                            </OreButton>
                        </SettingRow>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
