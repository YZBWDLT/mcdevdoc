// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
import { beianHtml } from "./src/data/beian.js";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// 本地搜索的索引只在 build 时生成。开发模式下挂上去只会显示
// 「The search index is only available when you run docusaurus build」，
// 既不能搜也不好看，所以干脆不加载；要看搜索效果就跑 `npx docusaurus serve`。
const isProduction = process.env.NODE_ENV === "production";

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "量筒的 Minecraft 基岩版开发文档",
    tagline: "致力于做人人都能看得懂的 Minecraft 基岩版中文开发教程！",
    favicon: "site/YZBWDLT.jpg",

    // Set the production url of your site here
    url: "https://mcdevdoc.nekoawa.com",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "YZBWDLT", // Usually your GitHub org/user name.
    projectName: "mcdevdoc", // Usually your repo name.

    onBrokenLinks: "ignore",
    onBrokenAnchors: "ignore",
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },

    /* 全站只有深色一套配色，但浏览器不一定知道。
       手机上的「强制深色 / 跟随系统深色」会把页面里**浅色**的部件再压暗一次 ——
       本站的导航栏（#e6e8eb）和白按钮正是浅色，于是变成了深底浅字，
       而本来就是深色的正文纹丝不动，看起来就像「只有导航栏被反色了」。
       在 <head> 里显式声明这一点，Chromium 系的自动深色就会跳过整个页面；
       darkreader-lock 是给内嵌 Dark Reader 一类实现的同一个意思。 */
    headTags: [
        {
            tagName: "meta",
            attributes: { name: "color-scheme", content: "dark" },
        },
        {
            tagName: "meta",
            attributes: { name: "theme-color", content: "#48494a" },
        },
        {
            tagName: "meta",
            attributes: { name: "darkreader-lock" },
        },
        // 首屏文字用到的三个字体提前取，别等 CSS 解析完才发现它们。
        // 文件都是子集版，三个加起来约 62 KB；MiSans 是兜底，不预加载。
        {
            tagName: "link",
            attributes: {
                rel: "preload",
                href: "/fonts/NotoSans-Bold-subset.woff2",
                as: "font",
                type: "font/woff2",
                crossorigin: "anonymous",
            },
        },
        {
            tagName: "link",
            attributes: {
                rel: "preload",
                href: "/fonts/Minecraft-Ten.otf",
                as: "font",
                type: "font/otf",
                crossorigin: "anonymous",
            },
        },
        {
            tagName: "link",
            attributes: {
                rel: "preload",
                href: "/fonts/Minecraft-Seven.otf",
                as: "font",
                type: "font/otf",
                crossorigin: "anonymous",
            },
        },
    ],

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "zh-Hans",
        locales: ["zh-Hans"],
    },

    /* 构建加速，来自 @docusaurus/faster。
       swcJsMinimizer：用 SWC 换掉 Terser。压缩 24 MB JS 这一项原本要 80 秒。
       ssgWorkerThreads：把四百多页的静态渲染摊给多核，必须同时开 v4 那个开关。
       rspackBundler：整个打包器换成 rspack，冷构建从 2m29 降到 1m03。 */
    future: {
        // 页面的「最后更新」默认走 ad-hoc 模式：每篇文档 spawn 一次 git log，411 篇 27 秒。
        // eager 模式一次性读完整个仓库的历史再查表，只留一次调用。
        experimental_vcs: "git-eager",
        faster: {
            swcJsMinimizer: true,
            ssgWorkerThreads: true,
            rspackBundler: true,
            rspackPersistentCache: true,
        },
        v4: {
            removeLegacyPostBuildHeadAttribute: true,
        },
    },

    // 本地插件：把最新一期「文档更新日志」抽成全局数据，供首页「最近更新」区块使用。
    // 源码见 plugins/update-log/index.js：读 update-log/*.md。
    // interface-index：构建期扫 docs/ 下的接口条目标题，给 /quick_reference 提供检索数据。
    plugins: ["./plugins/update-log", "./plugins/interface-index"],

    // 从速查点进文档时，把落点那个标题闪一下，免得读者在长页面里找不到位置。
    clientModules: ["./src/clientModules/anchorHighlight.js"],

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: "./sidebars.js",
                    editUrl: "https://github.com/YZBWDLT/mcdevdoc/tree/main/",
                    // 每篇都要跑一次 git log：411 篇实测 27 秒，是构建里最大的一笔固定开销。
                    showLastUpdateTime: true,
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                    },
                    blogSidebarCount: "ALL",
                    editUrl: "https://github.com/YZBWDLT/mcdevdoc/tree/main/",
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "ignore",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: "site/YZBWDLT.jpg",
            docs: {
                sidebar: {
                    hideable: true,
                },
            },
            // 全站搜索改成本地索引（见文件末尾的 themes）：
            // 构建期生成，部署完立刻能搜到新内容，不用等 Algolia 爬。
            // 顶部栏
            navbar: {
                title: "量筒的 Minecraft 基岩版开发文档",
                logo: { alt: "Logo", src: "site/YZBWDLT.jpg" },
                items: [
                    {
                        label: "教程",
                        type: "dropdown",
                        items: [
                            { label: "模块 1：命令", type: "docSidebar", sidebarId: "tutorialCommands" },
                            { label: "模块 2：附加包", type: "docSidebar", sidebarId: "tutorialAddons" },
                            { label: "模块 3：脚本", type: "docSidebar", sidebarId: "tutorialScripts" },
                        ],
                    },
                    {
                        label: "文档",
                        type: "dropdown",
                        items: [
                            { label: "命令", type: "docSidebar", sidebarId: "docCommands" },
                            { label: "附加包", type: "docSidebar", sidebarId: "docAddons" },
                            { label: "物品", type: "docSidebar", sidebarId: "docItems" },
                            { label: "方块", type: "docSidebar", sidebarId: "docBlocks" },
                            { label: "实体", type: "docSidebar", sidebarId: "docEntities" },
                            { label: "脚本", type: "docSidebar", sidebarId: "docScripts" },
                        ],
                    },
                    { label: "接口速查", to: "/quick_reference", position: "left" },
                    { label: "预设模板", type: "docSidebar", sidebarId: "devTemplate", position: "left" },
                    { label: "更新前瞻", type: "docSidebar", sidebarId: "updateLog", position: "left" },
                    { label: "个人博客", to: "/blog", position: "left" },
                    {
                        html: `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="vertical-align: middle;">
                            <path d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.04 7.04 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84a.49.49 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87a.49.49 0 0 0 .12.61l2.03 1.58a7.07 7.07 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.49.37 1.03.7 1.62.94l.36 2.54c.05.24.26.41.48.41h3.84c.22 0 .43-.17.48-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z"/>
                            </svg>
                        `,
                        href: "/settings",
                        position: "right",
                    },
                    {
                        html: `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="vertical-align: middle;">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                        `,
                        href: "https://github.com/YZBWDLT/mcdevdoc",
                        position: "right",
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [
                    // {
                    //     title: `我们的作品`,
                    //     items: [],
                    // },
                    {
                        title: `友情链接`,
                        items: [
                            { label: "量筒测试群群文档", href: "https://docs.nekoawa.com" },
                            { label: "祉语的个人主页", href: "https://xiaozhiyuqwq.top" },
                            { label: "苦力怕论坛", href: "https://klpbbs.com/" },
                            { label: "MineBBS", href: "https://www.minebbs.com/" },
                            { label: "TITAIKE", href: "https://www.titaike.cn/" },
                            { label: "小飞侠的博客", href: "https://wstd.pages.dev/" },
                            { label: "McNav", href: "https://www.mcnav.net/" },
                            { label: "Xero的个人主页", href: "https://projectxero.top" },
                            { label: "萝卜的ModSAPI项目", href: "https://modsapi.nekoawa.com/" },
                        ],
                    },
                    {
                        title: `相关外部文档与常用链接`,
                        items: [
                            { label: "中文 Minecraft Wiki", href: "https://zh.minecraft.wiki/" },
                            { label: "Bedrock Wiki", href: "https://wiki.bedrock.dev/" },
                            {
                                label: "Microsoft Learn",
                                href: "https://learn.microsoft.com/en-us/minecraft/creator/?view=minecraft-bedrock-stable",
                            },
                            { label: "我的世界开发者官网", href: "https://mc.163.com/newdev/" },
                            { label: "JaylyMC 的 SAPI 文档", href: "https://jaylydev.github.io/scriptapi-docs/" },
                            { label: "智韵清风的 JSONUI 文档", href: "https://mcbeui.netlify.app/" },
                            { label: "MCBEID 表", href: "https://idlist.projectxero.top/" },
                            { label: "原版附加包模板 GitHub 仓库", href: "https://github.com/Mojang/bedrock-samples" },
                            { label: "Chunker", href: "https://chunker.app" },
                            { label: "基岩版开发 Wiki", href: "https://wiki.mcbe-dev.net/p/Minecraft基岩版开发Wiki" },
                        ],
                    },
                    {
                        title: `关于`,
                        items: [
                            {
                                label: "授权：CC BY-NC-SA 4.0",
                                href: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans",
                            },
                            { label: "网站构建：Docusaurus", href: "https://docusaurus.io/" },
                            { label: "Bilibili：一只卑微的量筒", href: "https://space.bilibili.com/241650193" },
                            { label: "GitHub：YZBWDLT", href: "https://github.com/YZBWDLT/mcdevdoc" },
                            { label: "苦力怕论坛：YZBWDLT", href: "https://klpbbs.com/home.php?mod=space&uid=175998" },
                            { label: "MineBBS：一只卑微的量筒", href: "https://www.minebbs.com/members/65092/" },
                            { label: "TITAIKE：YZBWDLT", href: "https://www.titaike.cn/author/30276" },
                            { label: "联系我们：QQ 群 673941729", href: "https://qm.qq.com/q/CAJQrm3Rao" },
                        ],
                    },
                ],
                // copyright 是原样注入的 HTML，备案号单独占一行（内容见 src/data/beian.js）
                copyright:
                    `版权归 © 2019 - ${new Date().getFullYear()} 一只卑微的量筒所有。` +
                    `除特殊声明外，本站中的内容均使用 CC BY-NC-SA 4.0 授权。` +
                    beianHtml,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
            colorMode: {
                defaultMode: "dark",
                disableSwitch: true,
            },
        }),

    themes: [
        "@docusaurus/theme-live-codeblock",
        ...(isProduction
            ? [
        [
            "@easyops-cn/docusaurus-search-local",
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            ({
                // 文件名带内容哈希，重建后浏览器不会拿旧索引
                hashed: true,
                // 中文分词负责概念词，英文分词负责 `block_placer` 这类标识符 ——
                // 只挂 zh 时英文标识符搜不到，两个都得要。
                language: ["zh", "en"],
                // 代码块与参数树占了正文一半以上，排掉能省很多体积；
                // 接口名本来就写在标题里，照样搜得到。
                ignoreCssSelectors: [".theme-code-block", "pre", "table", ".treeview"],
                indexDocs: true,
                indexBlog: true,
                // 首页与 /quick_reference 这类独立页面也进索引
                indexPages: true,
                docsRouteBasePath: "/docs",
                blogRouteBasePath: "/blog",
                // 点进结果页后把搜索词高亮出来
                highlightSearchTermsOnTargetPage: true,
                searchResultLimits: 8,
                searchBarShortcutKeymap: "ctrl+k",
                // 搜索框固定在顶栏右侧（原先 Algolia 的位置）
                searchBarPosition: "right",
            }),
        ],
              ]
            : []),
    ],
};

export default config;
