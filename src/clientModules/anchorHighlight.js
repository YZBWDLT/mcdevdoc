import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

/**
 * 从接口速查点进文档后，把落点闪一下。
 *
 * 为什么需要：`items/components#minecraftblock_placer` 这样的锚点落在一个有
 * 87 个组件的长页面中间，浏览器只会滚到位置，不给任何提示，读者不知道
 * 自己落在哪一条、该往哪儿看。
 *
 * 做法是给目标标题加一个只播一次的类，动画结束就撤掉 —— 不加状态、
 * 不常驻样式，纯 CSS 动画，首屏可见性不依赖 JS。
 */

const HOLD_MS = 2600;

function flashTarget() {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    // 连点两条同锚点时，先摘掉再强制重排，动画才会重播
    target.classList.remove("anchor-flash");
    void target.offsetWidth;
    target.classList.add("anchor-flash");

    window.setTimeout(() => target.classList.remove("anchor-flash"), HOLD_MS);
}

/** 路由切换（含站内点链接跳到带 hash 的页面）之后触发 */
export function onRouteDidUpdate({ location }) {
    if (!location.hash) return;
    // 让 Docusaurus 先完成滚动，否则闪的位置和落点对不上
    window.setTimeout(flashTarget, 150);
}

// 直接带着 hash 打开页面（从外部链接或刷新）
if (ExecutionEnvironment.canUseDOM) {
    window.addEventListener("load", () => window.setTimeout(flashTarget, 150));
}
