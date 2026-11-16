import React from "react";
import BaseHighlight from "./base";

/** 服务端标识组件。用于标注只能在服务端脚本中调用的接口。 */
export default function ServerHighlight({ inline = true }) {
    return (
        <BaseHighlight
            text="服务端"
            color="#d64545"
            tooltip="该接口只能在服务端脚本（mod.server.extraServerApi）中调用。"
            inline={inline}
        />
    );
}
