import React from "react";
import BaseHighlight from "./base";

/** 早期执行高亮组件。 */
export default function EarlyExecutionHighlight() {
    return <BaseHighlight text="早期执行" color="yellowgreen" tooltip="该方法可以在早期执行阶段调用。" inline/>;
}
