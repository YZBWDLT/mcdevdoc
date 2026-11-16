import React, { useCallback, useEffect, useRef, useState } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { useLocation } from "@docusaurus/router";

/**
 * 自绘滚动条（只服务页面主滚动容器 `#__docusaurus`）。
 *
 * 为什么不用原生滚动条：
 *   原生滚动条画在**内容框之外的滚动槽**里，轨道透明时露出的是滚动容器自己的底色，
 *   而不是内容（比如页脚）的底色 —— 滚到页脚那一段就会出现一条突兀的亮带。
 *   自绘的滚动条浮在内容之上，轨道区域完全透明，页脚自然透出来。
 *
 * 交互与外观都复用站内「凸面」语言：
 *   常态   白脸 + 顶部高光 + 底部厚度条
 *   悬停   只压暗脸
 *   拖拽   厚度条消失、顶边下沉 4px
 */

const MIN_THUMB = 40;

/** 锚点落位时标题上方留的呼吸空间（px） */
const ANCHOR_OFFSET = 8;

/**
 * 兜底：万一根节点还是被滚了，立刻归零。
 *
 * 根节点在 CSS 里已经是 `overflow: clip`（不可滚动），正常不会出现这种情况；
 * 但 `clip` 有浏览器版本要求，老浏览器回落到 `hidden` 时——
 * 而 `overflow: hidden` 的盒子**仍然是可编程滚动的滚动容器**，
 * 一个 `scrollIntoView()` 就能把它滚一段，整个视口被顶上去、
 * 而滚轮又滚不动它，用户就再也回不到最上端。
 */
function resetRootScroll() {
    if (window.scrollX !== 0 || window.scrollY !== 0) {
        window.scrollTo(0, 0);
    }
    const root = document.scrollingElement;
    if (root && (root.scrollTop !== 0 || root.scrollLeft !== 0)) {
        root.scrollTop = 0;
        root.scrollLeft = 0;
    }
}

export default function OverlayScrollbar() {
    const isBrowser = useIsBrowser();
    const [bar, setBar] = useState({ visible: false, top: 0, height: 0 });
    const [dragging, setDragging] = useState(false);
    const trackRef = useRef(null);

    const getScroller = () => document.getElementById("__docusaurus");

    /** 按当前滚动位置重算滑块的高度与位置 */
    const sync = useCallback(() => {
        const node = getScroller();
        if (!node) return;

        const { scrollTop, scrollHeight, clientHeight } = node;
        const range = scrollHeight - clientHeight;

        if (range < 2 || clientHeight === 0) {
            setBar(prev => (prev.visible ? { visible: false, top: 0, height: 0 } : prev));
            return;
        }

        const height = Math.max(MIN_THUMB, (clientHeight / scrollHeight) * clientHeight);
        const top = (scrollTop / range) * (clientHeight - height);
        setBar({ visible: true, top, height });
    }, []);

    useEffect(() => {
        if (!isBrowser) return undefined;

        const node = getScroller();
        if (!node) return undefined;

        sync();

        // Docusaurus 的目录高亮与回到顶部都监听 `document` 的 scroll 事件，
        // 而滚动已经搬到 #__docusaurus 上，document 永远不会滚动。
        // 这里在容器滚动时补发一次 scroll，订阅者随即用它自己的
        // getBoundingClientRect 重算位置，结果依然正确。
        const handleScroll = () => {
            // 自愈：根节点一旦被别的脚本滚过，立刻归零
            resetRootScroll();
            sync();
            document.dispatchEvent(new Event("scroll"));
            window.dispatchEvent(new Event("scroll"));
        };

        node.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", sync);

        // 视口高度变化
        const resizeObserver = new ResizeObserver(sync);
        resizeObserver.observe(node);

        // 路由切换会整体替换内容，高度随之变化
        const mutationObserver = new MutationObserver(sync);
        mutationObserver.observe(node, { childList: true, subtree: true });

        return () => {
            node.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", sync);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [isBrowser, sync]);

    const location = useLocation();

    /**
     * 把滚动容器滚到当前 hash 对应的标题处。
     * 返回 false 表示页面上还没有这个元素（或不在浏览器环境）。
     */
    const scrollToHash = useCallback((behavior = "auto") => {
        const node = getScroller();
        const raw = window.location.hash.slice(1);
        if (!node || !raw) return false;

        const target = document.getElementById(decodeURIComponent(raw));
        if (!target) return false;

        // 先确保根节点没被滚过：rect 的基准歪了，落点就会整体偏移
        resetRootScroll();

        const top =
            target.getBoundingClientRect().top -
            node.getBoundingClientRect().top +
            node.scrollTop -
            ANCHOR_OFFSET;
        node.scrollTo({ top: Math.max(0, top), behavior });
        return true;
    }, []);

    /**
     * 路由切换后的落位。
     *
     * 换了滚动容器之后，Docusaurus 原本做的两件事都失效了
     * （见 ClientLifecyclesDispatcher.scrollAfterNavigation）：
     *   · 没有 hash 时它调 `window.scrollTo(0, 0)` —— 滚的是文档，而文档已经不能滚了，
     *     新页面会停在上一页的滚动位置上；
     *   · 有 hash 时它调 `element.scrollIntoView()` —— 会**连根节点一起滚**，
     *     整个视口被顶上去（CSS 已用 overflow: clip 堵住，这里再兜一层）。
     */
    useEffect(() => {
        if (!isBrowser) return undefined;

        const node = getScroller();
        resetRootScroll();

        if (!location.hash) {
            node?.scrollTo({ top: 0, behavior: "auto" });
            return undefined;
        }

        // 内容刚挂载，布局可能要到下一帧才稳定；再宽容地补一次，
        // 照顾图片、代码块这种高度算得晚的元素。
        let timer;
        const frame = window.requestAnimationFrame(() => {
            scrollToHash("auto");
            timer = window.setTimeout(() => scrollToHash("auto"), 120);
        });

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(timer);
        };
    }, [isBrowser, location.pathname, location.hash, scrollToHash]);

    /**
     * 接管站内锚点跳转与「回到顶部」。
     * 浏览器原生锚点按**文档坐标**落位，而文档已经不能滚了，必须自己算。
     */
    useEffect(() => {
        if (!isBrowser) return undefined;

        const handleAnchorClick = event => {
            const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
            if (!link) return;

            const hash = link.getAttribute("href");
            if (!hash || hash === "#") return;

            const target = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (!target) return;

            event.preventDefault();
            resetRootScroll();

            const node = getScroller();
            if (!node) return;
            const top =
                target.getBoundingClientRect().top -
                node.getBoundingClientRect().top +
                node.scrollTop -
                ANCHOR_OFFSET;
            node.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
            window.history.replaceState(null, "", hash);
        };

        const handleBackToTop = event => {
            const node = getScroller();
            const button = event.target instanceof Element ? event.target.closest(".theme-back-to-top-button") : null;
            if (!node || !button) return;
            event.preventDefault();
            node.scrollTo({ top: 0, behavior: "smooth" });
        };

        // 极少数绕过路由的 hash 变化（脚本改地址栏）也一并纠正。
        // 用箭头函数包一层：直接把 scrollToHash 当监听器的话，
        // 事件对象会被当成 behavior 参数传进去，scrollTo 会抛 TypeError。
        const handleHashChange = () => scrollToHash("auto");
        window.addEventListener("hashchange", handleHashChange);

        document.addEventListener("click", handleAnchorClick, true);
        document.addEventListener("click", handleBackToTop, true);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            document.removeEventListener("click", handleAnchorClick, true);
            document.removeEventListener("click", handleBackToTop, true);
        };
    }, [isBrowser, scrollToHash]);

    /** 拖动滑块 */
    const handleThumbPointerDown = event => {
        const node = getScroller();
        if (!node) return;

        event.preventDefault();
        setDragging(true);

        const startY = event.clientY;
        const startScroll = node.scrollTop;
        const range = node.scrollHeight - node.clientHeight;
        const movable = node.clientHeight - bar.height;
        if (movable <= 0) return;

        const handleMove = moveEvent => {
            const delta = moveEvent.clientY - startY;
            node.scrollTop = startScroll + (delta / movable) * range;
        };

        const handleUp = () => {
            setDragging(false);
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
        };

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
    };

    /** 点击轨道空白处：把滑块跳到该位置 */
    const handleTrackPointerDown = event => {
        const node = getScroller();
        const track = trackRef.current;
        if (!node || !track) return;

        const rect = track.getBoundingClientRect();
        const y = event.clientY - rect.top;
        const range = node.scrollHeight - node.clientHeight;
        const movable = node.clientHeight - bar.height;
        if (movable <= 0) return;

        const ratio = Math.min(1, Math.max(0, (y - bar.height / 2) / movable));
        node.scrollTop = ratio * range;
    };

    if (!bar.visible) return null;

    return (
        <div className="oreui-scrollbar" aria-hidden="true">
            <div className="oreui-scrollbar__track" ref={trackRef} onPointerDown={handleTrackPointerDown} />
            <div
                className={`oreui-scrollbar__thumb${dragging ? " oreui-scrollbar__thumb--dragging" : ""}`}
                style={{ top: `${bar.top}px`, height: `${bar.height}px` }}
                onPointerDown={handleThumbPointerDown}
            />
        </div>
    );
}
