/**
 * 首页「资源」屏的数据源。
 *
 * 加一张新卡片：往下面数组里再写一个对象即可，页面会自动排版
 * （一屏按 5 列 × 2 行排布，最多 10 个；超出会落在下一行并允许滚动）。
 *
 * 字段说明：
 *   cover        封面图路径，放在 static/resources/ 下，用 /resources/xxx.webp 引用（先转 WebP）
 *   name         资源名称
 *   date         卡片上显示的日期文本，统一用 YY/MM/DD，如 "26/10/21"
 *   type         类型标签（深色），如 "地图"
 *   gameVersion  适用游戏版本标签（封面浅蓝），如 "1.20.10+"
 *   resVersion   资源自身版本（信息栏），如 "v1.2.0" —— 与游戏版本分开
 *   retired      是否停更（true 会显示黄色「已停更」标签）
 *   isNew        是否新资源（true 会在封面左上角显示绿色「NEW」标签）
 *   author       作者名（封面右上角，只写名字，@ 由组件加）
 *   downloadHref 默认获取地址（点右侧「获取」跳转，通常是论坛帖子）
 *   pageHref     资源主页地址（点封面与标题跳转；暂时没有可留空）
 */
export const RESOURCES = [
    {
        name: "量筒的密室杀手",
        cover: "/resources/murder_mystery.webp",
        date: "26/10/03",
        type: "地图",
        gameVersion: "26.40+",
        resVersion: "1.0",
        retired: false,
        isNew: true,
        author: "量筒",
        downloadHref: "https://klpbbs.com/thread-174202-1-1.html",
        pageHref: "",
    },
    {
        name: "量筒的起床战争",
        cover: "/resources/bedwars.webp",
        date: "26/03/03",
        type: "附加包",
        gameVersion: "1.21.100+",
        resVersion: "1.1",
        retired: false,
        isNew: false,
        author: "量筒",
        downloadHref: "https://klpbbs.com/thread-157754-1-1.html",
        pageHref: "",
    },
    {
        name: "冒险世界：筑梦",
        cover: "/resources/adventure_world_creating.webp",
        date: "26/02/17",
        type: "地图",
        gameVersion: "1.21.50+",
        resVersion: "1.01",
        retired: false,
        isNew: false,
        author: "巴豆·量筒",
        downloadHref: "https://klpbbs.com/thread-169178-1-1.html",
        pageHref: "",
    },
    {
        name: "冒险小世界：剑之试炼",
        cover: "/resources/adventure_world_sword_trial.webp",
        date: "25/10/03",
        type: "地图",
        gameVersion: "1.21.0+",
        resVersion: "4.2",
        retired: true,
        isNew: false,
        author: "巴豆·量筒·绿叶",
        downloadHref: "https://klpbbs.com/thread-137174-1-1.html",
        pageHref: "",
    },
    {
        name: "触发",
        cover: "/resources/trigger.webp",
        date: "25/07/16",
        type: "地图",
        gameVersion: "1.20.50+",
        resVersion: "25y7m16d",
        retired: true,
        isNew: false,
        author: "绿叶",
        downloadHref: "https://klpbbs.com/thread-159914-1-1.html",
        pageHref: "",
    },
    {
        name: "Minecraft Picross",
        cover: "/resources/picross.webp",
        date: "25/01/13",
        type: "地图",
        gameVersion: "1.20.10+",
        resVersion: "1.0",
        retired: true,
        isNew: false,
        author: "巴豆",
        downloadHref: "https://klpbbs.com/thread-154669-1-7.html",
        pageHref: "",
    },
    {
        name: "冒险世界：经典三部曲",
        cover: "/resources/adventure_world_classic.webp",
        date: "24/11/17",
        type: "地图",
        gameVersion: "1.18.0+",
        resVersion: "1.0",
        retired: false,
        isNew: false,
        author: "巴豆",
        downloadHref: "https://klpbbs.com/thread-151276-1-1.html",
        pageHref: "",
    },
    {
        name: "30 种死法 2",
        cover: "/resources/30_ways_to_die_2.webp",
        date: "24/08/23",
        type: "地图",
        gameVersion: "1.20.10+",
        resVersion: "2.4",
        retired: true,
        isNew: false,
        author: "量筒",
        downloadHref: "https://klpbbs.com/thread-47490-1-1.html",
        pageHref: "",
    },
];

/** 把数据项转成 <ResourceCard> 需要的 props，页面与后续的独立资源页共用 */
export function toCardProps(item) {
    return {
        cover: item.cover,
        name: item.name,
        date: item.date,
        type: item.type,
        gameVersion: item.gameVersion,
        resVersion: item.resVersion,
        status: item.retired ? "已停更" : undefined,
        isNew: item.isNew,
        author: item.author,
        href: item.pageHref || undefined,
        downloadHref: item.downloadHref,
    };
}
