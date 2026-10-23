import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useGlobalData from "@docusaurus/useGlobalData";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import OreButton from "../components/oreui/button";
import ResourceCard from "../components/oreui/resourceCard";
import { RESOURCES, toCardProps } from "../data/resources";
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

// 每屏封面：编号与屏序一致（home_1 首屏 … home_6 关于）
const COVERS = {
    hero: require("@site/static/site/home_1.webp").default,
    tutorial: require("@site/static/site/home_2.webp").default,
    docs: require("@site/static/site/home_3.webp").default,
    resources: require("@site/static/site/home_4.webp").default,
    updates: require("@site/static/site/home_5.webp").default,
    about: require("@site/static/site/home_6.webp").default,
};

// ================================================================
// 屏序（与 DOM 顺序一致，供页码条与键盘跳转使用）
// ================================================================

const SECTION_INDEX = {
    hero: 0,
    tutorial: 1,
    docs: 2,
    resources: 3,
    updates: 4,
    about: 5,
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
    // 平滑翻页的目标位置：手势打断动画时用它瞬间落位（null 表示没在动画）
    const animRef = useRef(null);
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

            animRef.current = top;
            container.scrollTo({ top, behavior: "smooth" });
            setActive(index);

            // 动画大约 300~500ms，留点余量后清掉标记
            window.setTimeout(() => {
                if (animRef.current === top) {
                    animRef.current = null;
                }
            }, 700);
        },
        [sectionCount],
    );

    // 首页只有一屏一屏地翻，body 本身不需要滚动。
    // 锁掉它能彻底杜绝「从导航栏/页码条上拉起，整页被拉动露出空白」的情况。
    useEffect(() => {
        const { style } = document.body;
        const previous = style.overflow;
        style.overflow = "hidden";
        return () => {
            style.overflow = previous;
        };
    }, []);

    // 触屏翻页：完全由脚本接管，保证「一次手势最多翻一屏」。
    //
    // 为什么不用原生滚动 + 夹紧：手机上的惯性一旦起来，scroll 事件按帧回调，
    // 夹紧总是慢半拍；再加上 CSS 的 proximity 吸附，快速一划仍然会连跳好几屏。
    // 所以这里直接 preventDefault 掐掉原生滚动，自己按手指位移写 scrollTop：
    //   · 本屏放得下 → 手指怎么动都不滚，松手按方向翻一屏
    //   · 本屏比屏幕高 → 手指能在本屏内拖（1:1 跟手），拖过底部再拉一段才翻页
    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return undefined;
        }

        let startY = 0;
        let startX = 0;
        let startScroll = 0;
        let bound = false;
        let surrendered = false;
        // 手势是否起点在「横向滚动区」里（资源卡那一排）
        let inScroller = false;
        let index = 0;
        let top = 0;
        let max = 0;
        let deckMax = 0;


        const onTouchStart = event => {
            if (event.touches.length !== 1) {
                return;
            }
            // 上一屏的平滑动画还没走完就摸屏：先瞬间落到目标位置，避免卡在半途
            if (animRef.current !== null) {
                container.scrollTop = animRef.current;
                animRef.current = null;
            }

            const info = measureDeck();
            index = info.index;
            top = info.top;
            max = info.max;
            deckMax = info.deckMax;

            startY = event.touches[0].clientY;
            startX = event.touches[0].clientX;
            startScroll = container.scrollTop;
            bound = true;
            surrendered = false;
            inScroller = Boolean(event.target?.closest?.("[data-hscroll]"));
        };

        const onTouchMove = event => {
            if (!bound || event.touches.length !== 1) {
                return;
            }
            const dy = startY - event.touches[0].clientY;
            const dx = startX - event.touches[0].clientX;

            if (surrendered) {
                return;
            }

            // 横向明显占优（资源卡横滑）：这次手势交还原生，别抢
            const horizontal = Math.abs(dx) > Math.abs(dy);
            if (horizontal && Math.abs(dx) > 10) {
                surrendered = true;
                return;
            }

            // 关键：不等门槛，第一条竖向 move 就掐掉原生滚动。
            // 哪怕让浏览器先滚 1 帧，iOS 的橡皮筋就已经起了，之后再拦也回不去。
            // 横向滚动区内宽容一点，避免卡片的横向拖动被误杀。
            if (inScroller && horizontal) {
                return;
            }

            if (event.cancelable) {
                event.preventDefault();
            }
            const next = Math.min(max, deckMax, Math.max(top, startScroll + dy));
            container.scrollTop = Math.max(0, next);
        };

        const finish = event => {
            if (!bound) {
                return;
            }
            bound = false;
            if (surrendered) {
                surrendered = false;
                return;
            }

            const touch = event.changedTouches?.[0];
            const dy = touch ? startY - touch.clientY : 0;
            const scroll = container.scrollTop;

            // 到首屏/末屏就停住：越界的序号不翻页
            const turn = turnBy;

            // 本屏基本放得下（多出 24px 以内也算）：够 30px 就翻一屏
            if (max - top <= 24) {
                if (Math.abs(dy) > 30) {
                    turn(dy > 0 ? 1 : -1);
                }
                return;
            }

            // 长屏：拖过本屏底部还继续拉，才翻页
            if (dy > 0 && scroll >= max - 2 && dy > max - startScroll + 60) {
                turn(1);
                return;
            }
            if (dy < 0 && scroll <= top + 2 && -dy > startScroll - top + 60) {
                turn(-1);
            }
        };

        // 兜底：少数情况下（横向手势被交还原生后继续竖拉、iOS 的橡皮筋回弹）
        // 滚动位置会越出内容边界，表现为「滑出到不存在的上一屏/下一屏，文字全没了」。
        // 这里持续把 scrollTop 夹在 [0, 末屏底] 之间，一旦越界立刻拉回。
        let clampFrame = 0;
        const clampToContent = () => {
            clampFrame = 0;
            const max = Math.max(0, container.scrollHeight - container.clientHeight);
            if (container.scrollTop < 0) {
                container.scrollTop = 0;
            } else if (container.scrollTop > max) {
                container.scrollTop = max;
            }
        };
        const onScrollGuard = () => {
            if (!clampFrame) {
                clampFrame = window.requestAnimationFrame(clampToContent);
            }
        };

        container.addEventListener("touchstart", onTouchStart, { passive: true });
        container.addEventListener("touchmove", onTouchMove, { passive: false });
        container.addEventListener("touchend", finish);
        container.addEventListener("touchcancel", finish);
        container.addEventListener("scroll", onScrollGuard, { passive: true });

        return () => {
            window.cancelAnimationFrame(clampFrame);
            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchmove", onTouchMove);
            container.removeEventListener("touchend", finish);
            container.removeEventListener("touchcancel", finish);
            container.removeEventListener("scroll", onScrollGuard);
        };
    }, [goTo]);

    const sectionsOf = useCallback(
        () => Array.from(containerRef.current?.querySelectorAll("[data-deck-section]") ?? []),
        [],
    );

    /**
     * 量出「当前屏」：先找滚动位置正落在其中的那一屏；
     * 都落不进去（比如已经蹭到所有屏之外）时取距离最近的一屏，
     * 绝不能默认回第 0 屏 —— 否则末屏继续下拉会被拉回首屏。
     */
    const measureDeck = useCallback(() => {
        const container = containerRef.current;
        const sections = sectionsOf();
        if (!container || sections.length === 0) {
            return { index: 0, total: 0, top: 0, max: 0, deckMax: 0 };
        }

        const box = container.getBoundingClientRect();
        const viewH = container.clientHeight;
        const scroll = container.scrollTop;

        let current = -1;
        let nearest = 0;
        let best = Infinity;

        for (let i = 0; i < sections.length; i += 1) {
            const t = sections[i].getBoundingClientRect().top - box.top + scroll;
            if (scroll >= t - 2 && scroll < t + sections[i].offsetHeight - 2) {
                current = i;
                break;
            }
            const distance = Math.abs(scroll - t);
            if (distance < best) {
                best = distance;
                nearest = i;
            }
        }

        if (current < 0) {
            current = nearest;
        }

        const section = sections[current];
        const t = section.getBoundingClientRect().top - box.top + scroll;
        const h = section.offsetHeight;

        // 整页允许的滚动范围：不超过首屏顶、不超过末屏底
        const lastSection = sections[sections.length - 1];
        const lastTop = lastSection.getBoundingClientRect().top - box.top + scroll;

        return {
            index: current,
            total: sections.length,
            top: Math.max(0, t),
            max: Math.max(t, t + h - viewH),
            deckMax: Math.max(0, lastTop + lastSection.offsetHeight - viewH),
        };
    }, [sectionsOf]);

    // 只翻一屏，越界就不动（避免 goTo 把序号夹回本屏后重置到屏顶）
    const turnBy = useCallback(
        step => {
            const { index, total } = measureDeck();
            const target = index + step;
            if (total === 0 || target < 0 || target >= total) {
                return;
            }
            goTo(target);
        },
        [goTo, measureDeck],
    );

    // 滚轮：一次滚动只翻一屏。
    // 桌面每屏高度固定，所以不做屏内滚动；一整段滚动（一次滚轮 / 一次触控板甩动）
    // 只算一次翻页，避免「滚得远一点就跳两屏」。
    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return undefined;
        }

        let lastWheelAt = 0;

        const onWheel = event => {
            // Ctrl + 滚轮是浏览器缩放，别拦
            if (event.ctrlKey) {
                return;
            }
            // 横向为主（资源卡横滚等）交给原生
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
                return;
            }

            const info = measureDeck();

            // 本屏比视口高（桌面一般不会，手机竖屏时才有）：先在屏内滚
            if (info.max - info.top > 24) {
                const down = event.deltaY > 0;
                const atEdge = down
                    ? container.scrollTop >= info.max - 2
                    : container.scrollTop <= info.top + 2;

                if (!atEdge) {
                    event.preventDefault();
                    container.scrollTop = Math.min(
                        info.max,
                        Math.max(info.top, container.scrollTop + event.deltaY),
                    );
                    return;
                }
            }

            event.preventDefault();

            // 上一屏还在动画里：这段时间的滚轮全部吞掉，
            // 否则 measureDeck() 量到的是半途位置，会连翻两屏
            if (animRef.current !== null) {
                return;
            }

            // 触控板会连续发很多小 delta：间隔够近就归为同一段滚动，只翻一次
            const now = performance.now();
            if (now - lastWheelAt < 320) {
                lastWheelAt = now;
                return;
            }
            lastWheelAt = now;

            turnBy(event.deltaY > 0 ? 1 : -1);
        };

        container.addEventListener("wheel", onWheel, { passive: false });
        return () => container.removeEventListener("wheel", onWheel);
    }, [measureDeck, turnBy]);

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

/**
 * 资源屏：卡片在上、标题与描述在下。
 * 卡片数据来自 src/data/resources.js，加资源只改那个文件。
 */
function ResourceSection({ active }) {
    const scrollerRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    // 记录能否左右翻，用于禁用箭头与显隐边缘遮罩
    const syncScrollState = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) {
            return;
        }
        setAtStart(el.scrollLeft <= 4);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    }, []);

    // 用 layout effect：首帧就量好宽度，避免右侧遮罩闪一下
    useIsomorphicLayoutEffect(() => {
        syncScrollState();
        window.addEventListener("resize", syncScrollState);
        return () => window.removeEventListener("resize", syncScrollState);
    }, [syncScrollState, active]);

    const scrollByPage = direction => {
        const el = scrollerRef.current;
        if (!el) {
            return;
        }
        // 一次翻大约八成可视宽度，留一点重叠便于对照
        el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
    };

    return (
        <Section active={active} className={styles.sectionResources} cover={COVERS.resources} tone="soft">
            <div className={styles.resourceWrap}>
                <div
                    className={styles.resourceScroller}
                    data-at-start={atStart}
                    data-at-end={atEnd}
                    data-hscroll
                >
                    <div className={styles.resourceGrid} ref={scrollerRef} onScroll={syncScrollState}>
                        {RESOURCES.map(item => (
                            <ResourceCard key={item.name} {...toCardProps(item)} />
                        ))}
                    </div>
                </div>

                <div className={styles.resourceHead}>
                    <div className={styles.resourceText}>
                        <SectionTitle
                            en="RESOURCES"
                            hint="同时，也欢迎来看看我们近些年来制作的高质量资源！&gt;w&lt;"
                        >
                            资源
                        </SectionTitle>
                    </div>

                    <div className={styles.resourceNav}>
                        <button
                            type="button"
                            className={styles.resourceArrow}
                            aria-label="往前翻"
                            disabled={atStart}
                            onClick={() => scrollByPage(-1)}
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className={styles.resourceArrow}
                            aria-label="往后翻"
                            disabled={atEnd}
                            onClick={() => scrollByPage(1)}
                        >
                            ›
                        </button>
                    </div>
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

    // 更新日志数据由 plugins/update-log 提供（读 update-log/*.md）
    const updates = globalData["update-log"]?.default?.latest;

    // 有更新数据时四屏，否则退回三屏
    const hasUpdates = Boolean(updates?.items?.length);
    // 更新数据缺失时「关于」顺位上移，总屏数随之减一
    // 资源屏常在；更新屏缺数据时「关于」顺位上移一屏
    const aboutIndex = hasUpdates ? SECTION_INDEX.about : SECTION_INDEX.updates;
    const sectionCount = hasUpdates ? 6 : 5;

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
                <ResourceSection active={active === SECTION_INDEX.resources} />
                {hasUpdates && <UpdateSection active={active === SECTION_INDEX.updates} data={updates} />}
                <AboutSection active={active === aboutIndex} />
            </div>
            <DeckDots count={sectionCount} active={active} onSelect={goTo} />
        </Layout>
    );
}
