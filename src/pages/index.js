import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useGlobalData from "@docusaurus/useGlobalData";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

// ================================================================
// 数据
// ================================================================

const TUTORIALS = [
    {
        title: "模块 1：命令",
        desc: "用命令方块与函数搭出可复用的机关",
        image: require("@site/static/site/command_block.gif").default,
        link: "/docs/tutorials/a1_commands/b0_introduction",
    },
    {
        title: "模块 2：附加包",
        desc: "改方块、改物品、改实体，从清单文件开始",
        image: require("@site/static/site/creeper_head.png").default,
        link: "/docs/tutorials/a2_addons/b0_introduction",
    },
    {
        title: "模块 3：脚本",
        desc: "用 JavaScript 编写真正跑得起来的玩法",
        image: require("@site/static/site/js.png").default,
        link: "/docs/tutorials/a3_scripts/b0_introduction",
    },
];

const DOCUMENTS = [
    {
        title: "命令",
        image: require("@site/static/site/command_block.gif").default,
        link: "/docs/docs/commands/all_commands",
    },
    {
        title: "附加包",
        image: require("@site/static/site/crafting_table.png").default,
        link: "/docs/docs/addons/manifest",
    },
    {
        title: "物品",
        image: require("@site/static/site/diamond_pickaxe.png").default,
        link: "/docs/docs/items/description",
    },
    {
        title: "方块",
        image: require("@site/static/site/stone.png").default,
        link: "/docs/docs/blocks/description",
    },
    {
        title: "实体",
        image: require("@site/static/site/slime.png").default,
        link: "/docs/docs/entities/description",
    },
    {
        title: "脚本",
        image: require("@site/static/site/jigsaw_block.png").default,
        link: "/docs/docs/scripts/sapi/server/world/main",
    },
];

// 每屏封面（由 home_1 ~ home_5 转换的 webp）
const COVERS = {
    hero: require("@site/static/site/home_1.webp").default,
    tutorial: require("@site/static/site/home_2.webp").default,
    docs: require("@site/static/site/home_5.webp").default,
    updates: require("@site/static/site/home_4.webp").default,
    about: require("@site/static/site/home_3.webp").default,
};

// ================================================================
// 屏序（与 DOM 顺序一致，供页码条与键盘跳转使用）
// ================================================================

const SECTION_INDEX = {
    hero: 0,
    tutorial: 1,
    docs: 2,
    updates: 3,
    about: 4,
};

// ================================================================
// Hooks
// ================================================================

/** SSR 阶段没有 layout effect，用它做「首帧前执行」的安全版本 */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** 用户是否要求减少动效 */
function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(media.matches);
        const handler = event => setReduced(event.matches);
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);
    return reduced;
}

/**
 * 逐字打字机。
 * 初始值取全文，保证服务端渲染出的 HTML 里标题是完整的（利于 SEO 与无 JS 场景）；
 * 然后在首帧绘制前清空并逐字回填，用户看不到闪烁。
 */
function useTypewriter(text, { startDelay = 500, speed = 95 } = {}) {
    const reduced = usePrefersReducedMotion();
    const [count, setCount] = useState(text.length);

    useIsomorphicLayoutEffect(() => {
        if (reduced) {
            setCount(text.length);
            return undefined;
        }

        setCount(0);
        let timer;
        let shown = 0;

        const tick = () => {
            shown += 1;
            setCount(shown);
            if (shown < text.length) {
                timer = setTimeout(tick, speed);
            }
        };

        timer = setTimeout(tick, startDelay);
        return () => clearTimeout(timer);
    }, [text, speed, startDelay, reduced]);

    return { done: count >= text.length, shown: text.slice(0, count) };
}

/**
 * 整屏翻页的控制：记录当前页、提供跳转与键盘操作。
 * 翻页本身交给 CSS scroll-snap，这里只负责「读位置」和「命令跳转」。
 */
function useDeck(sectionCount) {
    const containerRef = useRef(null);
    const [active, setActive] = useState(0);

    // 用 IntersectionObserver 监听哪一屏进入视口，作为当前页
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const sections = Array.from(container.querySelectorAll("[data-deck-section]"));
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = sections.indexOf(entry.target);
                        if (index >= 0) setActive(index);
                    }
                });
            },
            { root: container, threshold: 0.55 }
        );

        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const goTo = useCallback(
        index => {
            const container = containerRef.current;
            if (!container) return;
            const target = Math.max(0, Math.min(index, sectionCount - 1));
            container.scrollTo({ top: target * container.clientHeight, behavior: "smooth" });
            setActive(target);
        },
        [sectionCount]
    );

    // 键盘：上下方向键 / PageUp、PageDown / Home、End
    useEffect(() => {
        const handler = event => {
            const tag = document.activeElement?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;

            const keyMap = {
                ArrowDown: 1,
                PageDown: 1,
                ArrowUp: -1,
                PageUp: -1,
            };

            if (event.key === "Home") {
                event.preventDefault();
                goTo(0);
                return;
            }
            if (event.key === "End") {
                event.preventDefault();
                goTo(sectionCount - 1);
                return;
            }
            if (keyMap[event.key]) {
                event.preventDefault();
                goTo(active + keyMap[event.key]);
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [active, goTo, sectionCount]);

    return { active, containerRef, goTo };
}

// ================================================================
// 通用小组件
// ================================================================

/**
 * 一屏。
 * - `cover` / `tone`：背景图与压暗强度（plain / soft / blur / code）
 * - `overlay`：挂在屏内、但不参与内容排版的浮层（例如首屏的「向下滚动」提示）。
 *   必须放在 sectionInner 之外，否则会以内容块为定位基准、跑不到屏幕底部。
 */
function Section({ active, children, className = "", cover, tone = "plain", overlay }) {
    return (
        <section className={`${styles.section} ${className}`} data-deck-section data-active={active}>
            {cover ? (
                <>
                    <div
                        className={styles.cover}
                        data-tone={tone}
                        style={{ backgroundImage: `url(${cover})` }}
                        aria-hidden="true"
                    />
                    <div className={styles.scrim} aria-hidden="true" />
                </>
            ) : undefined}
            <div className={styles.sectionInner}>{children}</div>
            {overlay}
        </section>
    );
}

/** 小标签：一条短横 + 字距放大的小字 */
function Eyebrow({ children }) {
    return <p className={styles.eyebrow}>{children}</p>;
}

/** 每屏标题，进入视口时上浮淡入 */
function SectionTitle({ children, hint }) {
    return (
        <>
            <h2 className={styles.title}>{children}</h2>
            {hint ? <p className={styles.lead}>{hint}</p> : undefined}
        </>
    );
}

/** 右侧页码条 */
function DeckDots({ count, active, onSelect }) {
    return (
        <nav className={styles.dots} aria-label="页面导航">
            {Array.from({ length: count }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    className={styles.dot}
                    data-active={index === active}
                    aria-label={`第 ${index + 1} 页`}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => onSelect(index)}
                />
            ))}
        </nav>
    );
}

// ================================================================
// 各屏
// ================================================================

function HeroSection({ active, title, tagline, total, tutorialCount }) {
    const { shown, done } = useTypewriter(title);

    return (
        <Section
            active={active}
            className={styles.sectionHero}
            cover={COVERS.hero}
            overlay={
                <div className={styles.scrollHint} aria-hidden="true">
                    <span>向下滚动</span>
                    <span className={styles.scrollHintArrow} />
                </div>
            }
        >
            <div className={styles.hero}>
                <Eyebrow>MINECRAFT BEDROCK · 中文开发文档</Eyebrow>

                <h1 className={styles.heroTitle}>
                    <span>{shown}</span>
                    {!done && <span className={styles.caret} aria-hidden="true" />}
                </h1>

                <p className={styles.heroTagline} data-show={done}>
                    {tagline}
                </p>

                <div className={styles.heroButtons} data-show={done}>
                    <Link className={`${styles.button} ${styles.buttonGreen}`} to="/docs/tutorials/a1_commands/b0_introduction">
                        开始学习
                    </Link>
                    <Link className={styles.button} to="/blog">
                        个人博客
                    </Link>
                </div>

                <p className={styles.heroMeta} data-show={done}>
                    共 {total} 篇文档 · 教程 {tutorialCount} 篇
                </p>
            </div>
        </Section>
    );
}

function TutorialSection({ active, tutorialCount }) {
    return (
        <Section active={active} className={styles.sectionTutorial} cover={COVERS.tutorial} tone="soft">
            <div className={styles.split}>
                <div className={styles.splitText}>
                    <Eyebrow>教程 · TUTORIALS</Eyebrow>
                    <SectionTitle hint="查看我们精心准备的教程，帮助你零基础快速上手 Minecraft 基岩版开发！">
                        从零开始，一步步做出来
                    </SectionTitle>
                    <p className={styles.meta}>
                        三个模块 · 共 {tutorialCount} 篇
                    </p>
                </div>

                <div className={styles.actionList}>
                    {TUTORIALS.map((item, index) => (
                        <Link
                            key={item.link}
                            to={item.link}
                            className={styles.actionCard}
                            style={{ "--index": index }}
                        >
                            <img src={item.image} alt="" className={styles.actionIcon} loading="lazy" />
                            <span className={styles.actionBody}>
                                <span className={styles.actionTitle}>{item.title}</span>
                                <span className={styles.actionDesc}>{item.desc}</span>
                            </span>
                            <span className={styles.actionArrow} aria-hidden="true">
                                →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function DocumentSection({ active, docCount }) {
    return (
        <Section active={active} className={styles.sectionDocs} cover={COVERS.docs} tone="soft">
            <div className={`${styles.split} ${styles.splitReverse}`}>
                <div className={styles.docGrid}>
                    {DOCUMENTS.map((item, index) => (
                        <Link
                            key={item.link}
                            to={item.link}
                            className={styles.docCard}
                            style={{ "--index": index }}
                        >
                            <img src={item.image} alt="" className={styles.docIcon} loading="lazy" />
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>

                <div className={styles.splitText}>
                    <Eyebrow>文档 · REFERENCE</Eyebrow>
                    <SectionTitle hint="查看我们专门整理的文档，帮助你快速查阅 Minecraft 开发中的更多接口细节。">
                        查得到，才写得下去
                    </SectionTitle>
                    <p className={styles.meta}>六大分类 · 共 {docCount} 篇</p>
                </div>
            </div>
        </Section>
    );
}

function UpdateSection({ active, data }) {
    return (
        <Section active={active} className={styles.sectionUpdates} cover={COVERS.updates} tone="code">
            <div className={styles.updateWrap}>
                <Eyebrow>更新 · CHANGELOG</Eyebrow>
                <SectionTitle hint="站点内容的最新改动，每期的完整记录都在更新日志里。">
                    最近在做什么
                </SectionTitle>

                <ul className={styles.updateList}>
                    {data.items.map((item, index) => (
                        <li key={index} className={styles.updateItem} style={{ "--index": index }}>
                            {item.verb ? <span className={styles.updateVerb}>{item.verb}</span> : undefined}
                            <span className={styles.updateText}>{item.text}</span>
                        </li>
                    ))}
                </ul>

                <div className={styles.updateFooter}>
                    <span className={styles.meta}>{data.date} 更新</span>
                    <Link to={data.permalink} className={styles.textLink}>
                        查看完整日志 →
                    </Link>
                </div>

                <div className={styles.closing}>
                    <Link className={`${styles.button} ${styles.buttonGreen}`} to="/docs/tutorials/a1_commands/b0_introduction">
                        开始学习
                    </Link>
                    <Link className={styles.button} to="https://mcdevdoc.nekoawa.com/">
                        镜像站 nekoawa
                    </Link>
                </div>
            </div>
        </Section>
    );
}

// ================================================================
// 第五屏：关于与链接（原页脚内容，首页隐藏页脚后收进这一屏）
// ================================================================

const LINK_GROUPS = [
    {
        title: "友情链接",
        links: [
            { label: "量筒测试群群文档", href: "https://docs.nekoawa.com" },
            { label: "祉语的个人主页", href: "https://xiaozhiyuqwq.top" },
            { label: "苦力怕论坛", href: "https://klpbbs.com/" },
            { label: "MineBBS", href: "https://www.minebbs.com/" },
            { label: "TITAIKE", href: "https://www.titaike.cn/" },
            { label: "小飞侠的博客", href: "https://wstd.pages.dev/" },
            { label: "Xero 的个人主页", href: "https://projectxero.top" },
            { label: "萝卜的 ModSAPI 项目", href: "https://modsapi.nekoawa.com/" },
        ],
    },
    {
        title: "外部文档与工具",
        links: [
            { label: "中文 Minecraft Wiki", href: "https://zh.minecraft.wiki/" },
            { label: "Bedrock Wiki", href: "https://wiki.bedrock.dev/" },
            {
                label: "Microsoft Learn",
                href: "https://learn.microsoft.com/en-us/minecraft/creator/?view=minecraft-bedrock-stable",
            },
            { label: "我的世界开发者官网", href: "https://mc.163.com/dev/guide.html" },
            { label: "JaylyMC 的 SAPI 文档", href: "https://jaylydev.github.io/scriptapi-docs/" },
            { label: "智韵清风的 JSONUI 文档", href: "https://mcbeui.netlify.app/" },
            { label: "MCBEID 表", href: "https://idlist.projectxero.top/" },
            { label: "原版附加包模板仓库", href: "https://github.com/Mojang/bedrock-samples" },
            { label: "Chunker", href: "https://chunker.app" },
            { label: "基岩版开发 Wiki", href: "https://wiki.mcbe-dev.net/p/Minecraft基岩版开发Wiki" },
        ],
    },
    {
        title: "关于本站",
        links: [
            {
                label: "授权：CC BY-NC-SA 4.0",
                href: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans",
            },
            { label: "网站构建：Docusaurus", href: "https://docusaurus.io/" },
            { label: "GitHub 仓库", href: "https://github.com/YZBWDLT/mcdevdoc" },
            { label: "苦力怕论坛：YZBWDLT", href: "https://klpbbs.com/home.php?mod=space&uid=175998" },
            { label: "MineBBS：一只卑微的量筒", href: "https://www.minebbs.com/members/65092/" },
            { label: "TITAIKE：YZBWDLT", href: "https://www.titaike.cn/author/30276" },
            { label: "QQ 群 673941729", href: "https://qm.qq.com/q/CAJQrm3Rao" },
        ],
    },
];

const MIRRORS = [
    { label: "nekoawa", note: "推荐，EdgeOne Pages", href: "https://mcdevdoc.nekoawa.com/" },
    { label: "Cloudflare Pages", note: "旧站点", href: "https://yzbwdlt.pages.dev/" },
];

function AboutSection({ active }) {
    return (
        <Section active={active} className={styles.sectionAbout} cover={COVERS.about} tone="mosaic">
            <div className={styles.aboutPanel}>
                <div className={styles.aboutHead}>
                    <Eyebrow>关于 · LINKS</Eyebrow>
                    <h2 className={styles.title}>除了文档，还有这些地方</h2>
                </div>

                <div className={styles.aboutGrid}>
                    {LINK_GROUPS.map(group => (
                        <div key={group.title} className={styles.aboutCol}>
                            <h3>{group.title}</h3>
                            <ul>
                                {group.links.map(link => (
                                    <li key={`${group.title}-${link.label}`}>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={styles.aboutFooter}>
                    <p>
                        本站另有镜像：
                        {MIRRORS.map((mirror, index) => (
                            <React.Fragment key={mirror.href}>
                                {index > 0 ? <span className={styles.mirrorSep}>·</span> : undefined}
                                <a href={mirror.href} target="_blank" rel="noopener noreferrer">
                                    {mirror.label}
                                </a>
                                <span className={styles.mirrorNote}>（{mirror.note}）</span>
                            </React.Fragment>
                        ))}
                    </p>
                    <p className={styles.copyright}>
                        版权归 © 2019 - {new Date().getFullYear()} 一只卑微的量筒所有。除特殊声明外，本站中的内容均使用 CC
                        BY-NC-SA 4.0 授权。
                    </p>
                </div>
            </div>
        </Section>
    );
}

// ================================================================
// 首页
// ================================================================

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    const globalData = useGlobalData();

    // 篇数从文档索引里算，增删页面后首页自动跟着变
    const docs = globalData["docusaurus-plugin-content-docs"]?.default?.versions?.[0]?.docs ?? [];
    const countOf = prefix => docs.filter(doc => doc.id.startsWith(`${prefix}/`)).length;
    const tutorialCount = countOf("tutorials");
    const docCount = countOf("docs");

    const updates = globalData["recent-updates"]?.default;

    // 有更新数据时四屏，否则退回三屏
    const hasUpdates = Boolean(updates?.items?.length);
    // 更新数据缺失时「关于」顺位上移，总屏数随之减一
    const aboutIndex = hasUpdates ? SECTION_INDEX.about : SECTION_INDEX.updates;
    const sectionCount = hasUpdates ? 5 : 4;

    const { active, containerRef, goTo } = useDeck(sectionCount);

    return (
        <Layout title="主页" description={siteConfig.tagline} noFooter>
            <div className={styles.deck} ref={containerRef}>
                <HeroSection
                    active={active === SECTION_INDEX.hero}
                    title={siteConfig.title}
                    tagline={siteConfig.tagline}
                    total={docs.length}
                    tutorialCount={tutorialCount}
                />
                <TutorialSection active={active === SECTION_INDEX.tutorial} tutorialCount={tutorialCount} />
                <DocumentSection active={active === SECTION_INDEX.docs} docCount={docCount} />
                {hasUpdates && <UpdateSection active={active === SECTION_INDEX.updates} data={updates} />}
                <AboutSection active={active === aboutIndex} />
            </div>
            <DeckDots count={sectionCount} active={active} onSelect={goTo} />
        </Layout>
    );
}
