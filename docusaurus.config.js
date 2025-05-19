// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: '量筒的 Minecraft 基岩版开发文档',
    tagline: '致力于做人人都能看得懂的 Minecraft 基岩版中文开发教程！',
    favicon: 'site/YZBWDLT.jpg',

    // Set the production url of your site here
    url: 'https://github.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'YZBWDLT', // Usually your GitHub org/user name.
    projectName: 'mcdevdoc', // Usually your repo name.

    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    editUrl: 'https://github.com/YZBWDLT/mcdevdoc/tree/main/',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    blogSidebarCount: 'ALL',
                    editUrl:
                        'https://github.com/YZBWDLT/mcdevdoc/tree/main/',
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'ignore',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'site/YZBWDLT.jpg',
            docs: {
                sidebar: {
                    hideable: true,
                }
            },
            // 顶部栏
            navbar: {
                title: '量筒的 Minecraft 基岩版开发文档',
                logo: { alt: 'Logo', src: 'site/YZBWDLT.jpg', },
                items: [
                    { label: '教程', type: 'dropdown', items: [
                        { label: '模块 1：命令', type: 'docSidebar', sidebarId: 'tutorialCommands', },
                        { label: '模块 2：附加包', type: 'docSidebar', sidebarId: 'tutorialAddons', },
                        { label: '模块 3：脚本', type: 'docSidebar', sidebarId: 'tutorialScripts', },
                    ] },
                    { label: '文档', type: 'dropdown', items: [
                        { label: '命令', type: 'docSidebar', sidebarId: 'docCommands'  },
                        { label: '物品', type: 'docSidebar', sidebarId: 'docItems'  },
                        { label: '方块', type: 'docSidebar', sidebarId: 'docBlocks'  },
                    ] },
                    { label: '预设模板', type: 'docSidebar', sidebarId: 'devTemplate', position: 'left', },
                    { label: '个人博客', to: '/blog', position: 'left' },
                    { label: 'GitHub', href: 'https://github.com/YZBWDLT/mcdevdoc', position: 'right', },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: `我们的作品`,
                        items: [
                        ]
                    },                    {
                        title: `常用文档`,
                        items: [
                            { label: '命令', to: 'docs/docs/commands/all_commands' }
                        ]
                    },
                    {
                        title: `优秀笔记`,
                        items: [
                            { label: '小飞侠的博客', href: 'https://wstd.pages.dev/' },
                        ],
                    },
                    {
                        title: `相关外部文档与常用链接`,
                        items: [
                            { label: '中文 Minecraft Wiki', href: 'https://zh.minecraft.wiki/' },
                            { label: '微软文档', href: 'https://learn.microsoft.com/en-us/minecraft/creator/?view=minecraft-bedrock-stable' },
                            { label: '基岩版开发 Wiki', href: 'https://wiki.mcbe-dev.net/p/Minecraft基岩版开发Wiki' },
                            { label: 'Bedrock Wiki', href: 'https://wiki.bedrock.dev/' },
                        ],
                    },                    {
                        title: `关于`,
                        items: [
                            { label: '授权：CC BY-NC-SA 4.0', href: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans' },
                            { label: '字体：MiSans', href: 'https://hyperos.mi.com/font' },
                            { label: '网站构建：Docusaurus', href: 'https://docusaurus.io/' },
                            { label: 'GitHub', href: 'https://github.com/YZBWDLT/mcdevdoc' },
                            { label: '联系我们：QQ 群 673941729', href: 'https://qm.qq.com/q/CAJQrm3Rao' },
                        ],
                    }
                ],
                copyright: `版权归 © 2019 - ${new Date().getFullYear()} 一只卑微的量筒所有。除特殊声明外，本站中的内容均使用 CC BY-NC-SA 4.0 授权。`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
