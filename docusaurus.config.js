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
                        { label: '附加包', type: 'docSidebar', sidebarId: 'docAddons'  },
                        { label: '物品', type: 'docSidebar', sidebarId: 'docItems'  },
                        { label: '方块', type: 'docSidebar', sidebarId: 'docBlocks'  },
                        { label: '脚本', type: 'docSidebar', sidebarId: 'docScripts'  },
                    ] },
                    { label: '预设模板', type: 'docSidebar', sidebarId: 'devTemplate', position: 'left', },
                    { label: '个人博客', to: '/blog', position: 'left' },
                    { 
                        html: `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="vertical-align: middle;">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                        `,
                        href: 'https://github.com/YZBWDLT/mcdevdoc',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: `我们的作品`,
                        items: [
                        ]
                    },
                    {
                        title: `常用文档`,
                        items: [
                            { label: '命令', to: 'docs/docs/commands/all_commands' },
                            { label: '物品组件', to: 'docs/docs/items/components' },
                            { label: '方块组件', to: 'docs/docs/blocks/components' },
                        ]
                    },
                    {
                        title: `友情链接`,
                        items: [
                            { label: '量筒测试群群文档', href: 'https://docs.nekoawa.com' },
                            { label: '祉语的个人主页', href: 'https://xiaozhiyuqwq.top' },
                            { label: '小飞侠的博客', href: 'https://wstd.pages.dev/' },
                            { label: 'Xero的个人主页', href: 'https://projectxero.top' },
                            { label: '萝卜的ModSAPI项目', href: 'https://modsapi.pages.dev/' },
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
