import React, { useCallback, useEffect, useRef, useState } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";

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

    /**
     * 接管站内锚点跳转与「回到顶部」。
     * 换了滚动容器之后，浏览器原生的锚点落位与 `window.scrollTo` 都会算错
     * （前者按文档坐标、后者滚的是文档，而文档已经不能滚了），
     * 所以统一由这里按「目标相对滚动容器」的位置来滚。
     */
    useEffect(() => {
        if (!isBrowser) return undefined;

        const handleAnchorClick = event => {
            const node = getScroller();
            const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
            if (!node || !link) return;

            const hash = link.getAttribute("href");
            if (!hash || hash === "#") return;

            const id = decodeURIComponent(hash.slice(1));
            const target = document.getElementById(id);
            if (!target) return;

            event.preventDefault();

            const offset = 8; // 标题上方留一点呼吸
            const top =
                target.getBoundingClientRect().top -
                node.getBoundingClientRect().top +
                node.scrollTop -
                offset;
            node.scrollTo({ top, behavior: "smooth" });
            window.history.replaceState(null, "", hash);
        };

        const handleBackToTop = event => {
            const node = getScroller();
            const button = event.target instanceof Element ? event.target.closest(".theme-back-to-top-button") : null;
            if (!node || !button) return;
            event.preventDefault();
            node.scrollTo({ top: 0, behavior: "smooth" });
        };

        // 带 hash 直接进站时，浏览器同样会按文档坐标落位一次，这里纠正回来
        const correctInitialHash = () => {
            const node = getScroller();
            const id = decodeURIComponent(window.location.hash.slice(1));
            if (!node || !id) return;
            const target = document.getElementById(id);
            if (!target) return;
            const top =
                target.getBoundingClientRect().top -
                node.getBoundingClientRect().top +
                node.scrollTop -
                8;
            node.scrollTo({ top, behavior: "auto" });
        };
        const initialTimer = window.setTimeout(correctInitialHash, 120);

        // 路由内部（搜索、外部链接、浏览器前进后退）引起的 hash 变化同样要纠正
        window.addEventListener("hashchange", correctInitialHash);

        document.addEventListener("click", handleAnchorClick, true);
        document.addEventListener("click", handleBackToTop, true);
        return () => {
            window.removeEventListener("hashchange", correctInitialHash);
            window.clearTimeout(initialTimer);
            document.removeEventListener("click", handleAnchorClick, true);
            document.removeEventListener("click", handleBackToTop, true);
        };
    }, [isBrowser]);

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
