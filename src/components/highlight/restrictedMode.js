import React from "react";
import BaseHighlight from "./base";

/** 受限执行高亮组件。默认行内显示，与其它高亮标签保持一致。 */
export default function RestrictedModeHighlight({ inline = true }) {
    return <BaseHighlight text="受限执行" tooltip="该属性/方法不能在受限执行模式下使用。" inline={inline}/>;
}
