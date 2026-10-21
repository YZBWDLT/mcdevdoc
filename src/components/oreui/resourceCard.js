import React from "react";

// 像素图标（static/ui，10×10），require 进来会被内联成 data URI
const DOWNLOAD_ICON = require("@site/static/ui/download.png").default;

/**
 * 资源页的存档卡（OreUI 形态）。
 *
 * 结构照实机：封面 + 左下角标签组 + 一条信息栏（左边名称与日期、右边下载按钮）。
 * 外观属于「板面」语言：无厚度、深色外框、四边斜角。
 *
 * 注意：下载按钮不能嵌套在链接里（button 套 a 是非法结构），
 * 所以链接只包封面与文字，按钮单独放在右侧。
 *
 * @param {object} props
 * @param {string} props.cover 封面图地址（放在 static/ 下，如 /resources/xxx.png）
 * @param {string} props.name 资源名称
 * @param {string} props.date 日期，直接给要显示的文本
 * @param {string} [props.type] 资源类型标签，如「地图」（深色）
 * @param {string} [props.gameVersion] 适用游戏版本标签（封面浅蓝），如「1.20.10+」
 * @param {string} [props.resVersion] 资源自身版本（信息栏，与游戏版本区分开），如「v1.2.0」
 * @param {string} [props.status] 状态标签，如「已停更」（黄色）
 * @param {boolean} [props.isNew] 新资源，封面左上角显示绿色 NEW
 * @param {string} [props.author] 作者名（自动加 @ 前缀），封面右上角显示
 * @param {string} [props.href] 详情页地址
 * @param {() => void} [props.onOpen] 没有 href 时的打开回调（信息栏会渲染成 button）
 * @param {string} [props.downloadHref] 下载地址（通常是苦力怕论坛的帖子）；给了就渲染成外链
 * @param {() => void} [props.onDownload] 没有 downloadHref 时的下载回调
 */
export default function ResourceCard({
    cover,
    name,
    date,
    type,
    gameVersion,
    resVersion,
    status,
    isNew = false,
    author,
    href,
    onOpen,
    downloadHref,
    onDownload,
}) {
    // 封面与信息栏：有 href 用链接，有 onOpen 用按钮，都没有就只是展示
    const CoverTag = href ? "a" : onOpen ? "button" : "div";
    const MetaTag = href ? "a" : onOpen ? "button" : "div";
    const openProps = href ? { href } : onOpen ? { type: "button", onClick: onOpen } : {};

    const hasTags = Boolean(type || version || status);

    return (
        <article className="oreui-card">
            <CoverTag className="oreui-card__cover" {...openProps}>
                <img src={cover} alt="" loading="lazy" />
                {isNew ? <span className="oreui-card__flag">NEW</span> : undefined}
                {author ? <span className="oreui-card__author">{`@${author}`}</span> : undefined}
                {hasTags ? (
                    <span className="oreui-card__tags">
                        {type ? <span className="oreui-card__tag">{type}</span> : undefined}
                        {gameVersion ? (
                            <span className="oreui-card__tag oreui-card__tag--version">{gameVersion}</span>
                        ) : undefined}
                        {status ? (
                            <span className="oreui-card__tag oreui-card__tag--status">{status}</span>
                        ) : undefined}
                    </span>
                ) : undefined}
            </CoverTag>

            <div className="oreui-card__bar">
                <MetaTag className="oreui-card__meta" {...openProps}>
                    <span className="oreui-card__name">{name}</span>
                    {resVersion ? (
                        <span className="oreui-card__version" title={resVersion}>
                            {resVersion}
                        </span>
                    ) : undefined}
                    <span className="oreui-card__date">{date}</span>
                </MetaTag>

                {downloadHref ? (
                    <a
                        className="oreui-card__action"
                        href={downloadHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`获取 ${name}`}
                        title="打开获取页面"
                    >
                        <img src={DOWNLOAD_ICON} alt="" width="20" height="20" aria-hidden="true" />
                        <span className="oreui-card__actionLabel">获取</span>
                    </a>
                ) : (
                    <button
                        type="button"
                        className="oreui-card__action"
                        aria-label={`获取 ${name}`}
                        onClick={onDownload}
                    >
                        <img src={DOWNLOAD_ICON} alt="" width="20" height="20" aria-hidden="true" />
                        <span className="oreui-card__actionLabel">获取</span>
                    </button>
                )}
            </div>
        </article>
    );
}
