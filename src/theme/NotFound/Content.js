import React from "react";
import Link from "@docusaurus/Link";

/**
 * 404 的正文（不带布局）。
 *
 * 这是唯一一处写 404 文案的地方。三处都会用到它：
 *   src/theme/NotFound/index.js  —— 全局通配路由（随便一个不存在的地址）
 *   src/theme/DocRoot 内部       —— 主题在 /docs/... 找不到对应文档时，**直接**渲染
 *                                   `@theme/NotFound/Content`（它自己不加布局），
 *                                   所以只覆写外层 NotFound 是不够的
 *   src/pages/404.js             —— 构建期生成 /404.html
 */
export default function NotFoundContent() {
    return (
        <main className="notFound">
            <div className="notFound__panel">
                <div className="notFound__code">404</div>
                <h1 className="notFound__title">这个页面不见了</h1>
                <p className="notFound__text">
                    可能是链接过期了，也可能是文档挪了位置。
                    <br />
                    回首页看看，或者从左侧目录里重新找一下。
                </p>
                <div className="notFound__actions">
                    <Link className="btn white_btn middle_btn btn_height_small font_size_middle" to="/">
                        回到首页
                    </Link>
                </div>
            </div>
        </main>
    );
}
