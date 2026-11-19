// 备案号：合规信息，站点页脚（docs/blog 用的主题页脚）与首页自定义页脚共用一份。
// 两处都从这里取，免得改一处漏一处。
export const BEIAN_ITEMS = [
    {
        label: "苏ICP备2023040060号-2",
        href: "https://beian.miit.gov.cn/#/Integrated/index",
    },
    {
        label: "苏公网安备32060002000105号",
        href: "https://beian.mps.gov.cn/#/query/webSearch?code=32060002000105",
        // 公安部要求配徽标，用官方 18×18 的原图，不做任何处理
        icon: "/img/gongan.png",
        iconAlt: "公安备案",
    },
];

// docusaurus.config.js 的 footer.copyright 是原样注入的 HTML，
// 这里拼成字符串给它用；页面里则直接用上面的数组渲染 JSX。
export const beianHtml =
    '<div class="footer__beian">' +
    BEIAN_ITEMS.map(
        item =>
            `<a href="${item.href}" target="_blank" rel="noopener noreferrer">` +
            (item.icon
                ? `<img src="${item.icon}" alt="${item.iconAlt}" width="18" height="18" />`
                : "") +
            `${item.label}</a>`,
    ).join("") +
    "</div>";
