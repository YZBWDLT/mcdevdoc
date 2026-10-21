import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useGlobalData from "@docusaurus/useGlobalData";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import OreButton from "../components/oreui/button";
import styles from "./index.module.css";

// ================================================================
// 数据
// ================================================================

const TUTORIALS = [
    {
        title: "模块 1：命令",
        desc: "从选择器、记分板到 /execute，把命令串成能用的机关",
        image: require("@site/static/site/command_block.webp").default,
        link: "/docs/tutorials/a1_commands/b0_introduction",
    },
    {
        title: "模块 2：附加包",
        desc: "数据驱动物品、方块、实体，附加包从入门到入土",
        image: require("@site/static/site/creeper_head.webp").default,
        link: "/docs/tutorials/a2_addons/b0_introduction",
    },
    {
        title: "模块 3：脚本",
        desc: "用脚本写玩法逻辑，分别讲解国际版和中国版的脚本逻辑",
        image: require("@site/static/site/js.png").default,
        link: "/docs/tutorials/a3_scripts/b0_introduction",
    },
];

const DOCUMENTS = [
    {
        title: "命令",
        image: require("@site/static/site/command_block.webp").default,
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
        image: require("@site/static/site/slime.webp").default,
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

/**
 * 首页是否要减少动效：系统的「减少动态效果」或设置页里的开关，任一开启即生效。
 * 注意这个开关**只作用于首页**，所以只看 localStorage，不再改 <html> 上的属性。
 */
function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const manual = localStorage.getItem("oreui-motion") === "reduced";
        const sync = () => setReduced(media.matches || manual);

        sync();
        media.addEventListener("change", sync);
        return () => media.removeEventListener("change", sync);
    }, []);

    return reduced;
}

/**
 * 逐字打字机。
 *
 * 关键设计：**标题以外的东西不依赖这个状态**。
 * 初始值取全文，保证服务端渲染的 HTML 里标题完整；随后在首帧绘制前清空逐字回填。
 * 另外挂一个兜底计时器：一旦计时器被浏览器节流或异常中断，到点直接补全，
 * 不会让标题停在半截。
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
        let shown = 0;
        let timer;

        const tick = () => {
            shown += 1;
            setCount(shown);
            if (shown < text.length) {
                timer = setTimeout(tick, speed);
            }
        };

        timer = setTimeout(tick, startDelay);
        // 兜底：无论计时器发生什么，这里一定让标题补全
        const failsafe = setTimeout(() => setCount(text.length), startDelay + text.length * speed + 1500);

        return () => {
            clearTimeout(timer);
            clearTimeout(failsafe);
        };
    }, [text, speed, startDelay, reduced]);

    return {
        shown: text.slice(0, count),
        done: count >= text.length,
        // 标题打完的时刻，供下方内容安排入场延迟（纯 CSS 动画用，不参与可见性判断）
        revealMs: startDelay + text.length * speed,
    };
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
            { root: container, threshold: 0.55 },
        );

        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const goTo = useCallback(
        index => {
            const container = containerRef.current;
            if (!container) return;
            const sections = Array.from(container.querySelectorAll("[data-deck-section]"));
            const target = sections[Math.max(0, Math.min(index, sectionCount - 1))];
            if (!target) return;

            // 用真实位置而不是「序号 × 视口高」：手机上每屏高度随内容变化，不能整除
            const top = target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;

            container.scrollTo({ top, behavior: "smooth" });
            setActive(index);
        },
        [sectionCount],
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
                    <div className={styles.cover} data-tone={tone} style={{ backgroundImage: `url(${cover})` }} aria-hidden="true" />
                    <div className={styles.scrim} aria-hidden="true" />
                </>
            ) : undefined}
            <div className={styles.sectionInner}>{children}</div>
            {overlay}
        </section>
    );
}

/**
 * 每屏标题，进入视口时上浮淡入。
 * `en` 是跟在中文后面的英文，单独缩小一档渲染（中文标题字号不受影响）。
 */
function SectionTitle({ children, en, hint }) {
    return (
        <>
            <h2 className={styles.title}>
                {children}
                {en ? <span className={styles.titleEn}>{en}</span> : undefined}
            </h2>
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
    const { shown, done, revealMs } = useTypewriter(title);

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
            {/* 入场延迟写进 CSS 变量，交给纯 CSS 动画执行；
                即便 JS 状态没更新到位，这些内容也只是"晚点出现"，不会永久消失 */}
            <div className={styles.hero} style={{ "--reveal-delay": `${revealMs}ms` }}>
                <p className={styles.kicker}>Minecraft Bedrock Edition</p>

                <h1 className={styles.heroTitle}>
                    <span>{shown}</span>
                    {!done && <span className={styles.caret} aria-hidden="true" />}
                </h1>

                <p className={styles.heroTagline}>{tagline}</p>

                <div className={styles.heroButtons}>
                    <OreButton variant="green" to="/docs/tutorials/a1_commands/b0_introduction">
                        开始学习
                    </OreButton>
                    <OreButton variant="light" to="/blog">
                        个人博客
                    </OreButton>
                </div>

                <p className={styles.heroMeta}>
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
                    <SectionTitle en="TUTORIALS" hint="从命令到附加包再到脚本，循序渐进，从零入手，保证小白也能看得懂！:)">
                        教程
                    </SectionTitle>
                    <p className={styles.meta}>三个模块 · 共 {tutorialCount} 篇</p>
                </div>

                <div className={styles.actionList}>
                    {TUTORIALS.map((item, index) => (
                        <Link key={item.link} to={item.link} className={styles.actionCard} style={{ "--index": index }}>
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
                        <Link key={item.link} to={item.link} className={styles.docCard} style={{ "--index": index }}>
                            <img src={item.image} alt="" className={styles.docIcon} loading="lazy" />
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>

                <div className={styles.splitText}>
                    <SectionTitle en="DOCUMENTS" hint="从物品方块实体到脚本，你需要的不少信息都可以在这里找到。除此之外，适用版本、内部链接、外部参考文档也一应俱全。UwU">
                        文档
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
                <SectionTitle en="UPDATE LOG" hint="在这里可以查看我们对文档的更改和修正，证明我们真的在努力！=P">更新日志</SectionTitle>

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
            { label: "Bilibili：一只卑微的量筒", href: "https://space.bilibili.com/241650193" },
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
                    <h2 className={styles.title}>
                        常用链接
                        <span className={styles.titleEn}>LINKS</span>
                    </h2>
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
                        版权归 © 2019 - {new Date().getFullYear()} 一只卑微的量筒所有。除特殊声明外，本站中的内容均使用 CC BY-NC-SA 4.0
                        授权。
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
    // 属性挂在 deck 上，CSS 里的压制动效规则因此只命中首页内部
    const motionReduced = usePrefersReducedMotion();

    return (
        <Layout title="主页" description={siteConfig.tagline} noFooter>
            <div
                className={styles.deck}
                ref={containerRef}
                data-motion={motionReduced ? "reduced" : undefined}
            >
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
