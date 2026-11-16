import React from "react";
import BaseHighlight from "./base";

/** 客户端标识组件。用于标注只能在客户端脚本中调用的接口。 */
export default function ClientHighlight({ inline = true }) {
    return (
        <BaseHighlight
            text="客户端"
            color="#5b5bd6"
            tooltip="该接口只能在客户端脚本（mod.client.extraClientApi）中调用。"
            inline={inline}
        />
    );
}
