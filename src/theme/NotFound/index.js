import React from "react";
import { PageMetadata } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";

import NotFoundContent from "@theme/NotFound/Content";

/**
 * 404 页（全局通配路由用）。
 *
 * 访问一个不存在的地址时，路由表末尾那条 `path: '*'` 会渲染这个组件，
 * 它负责外面那层导航栏 / 页脚。正文在 `NotFound/Content` 里。
 *
 * 注意 `/docs/...` 之下不存在的地址**不走这里** —— 文档插件会在 DocRoot 里
 * 直接渲染 `@theme/NotFound/Content`，两边共用一个正文组件才不会一半新一半旧。
 */
export default function NotFound() {
    return (
        <>
            <PageMetadata title="找不到页面" noIndex />
            <Layout>
                <NotFoundContent />
            </Layout>
        </>
    );
}
