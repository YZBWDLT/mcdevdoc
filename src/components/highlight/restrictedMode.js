import React from "react";
import BaseHighlight from "./base";

/** 受限执行高亮组件。 */
export default function RestrictedModeHighlight() {
    return <BaseHighlight text="受限执行" tooltip="该属性/方法不能在受限执行下调用。"/>;
}
