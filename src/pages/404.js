import React from "react";
import Layout from "@theme/Layout";

import NotFoundContent from "@theme/NotFound/Content";

/**
 * 404 页（构建期 SSG 用）。
 *
 * 这个文件生成 `/404.html`。它注册的是**精确路由** `/404`，
 * 不是通配路由，所以开发服务器上访问不存在的地址不会走到这里 ——
 * 那条路径由 `src/theme/NotFound/index.js` 与文档插件的 DocRoot 负责，
 * 三处共用 `@theme/NotFound/Content` 这一份正文。
 */
export default function NotFound() {
    return (
        <Layout title="找不到页面">
            <NotFoundContent />
        </Layout>
    );
}
