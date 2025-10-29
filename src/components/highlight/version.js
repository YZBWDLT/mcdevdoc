import React from 'react';
import Highlight from './standard';

export default function Version({
    version = "",
    toVersion = "",
    docUrl = "",
    isChinaVersion = false,
    isLowVersion = false,
    isBeta = false,
    isRP = false,
}) {
    const backgroundColor = (() => {
        if (isChinaVersion) return "#ECC93C";
        if (isLowVersion) return "#3AA2EC";
        if (isBeta || !!toVersion) return "#EC463A";
        return void 0;
    })();
    const versionName = (() => {
        if (isChinaVersion) return "中国版";
        if (isLowVersion) return "国际版 旧版";
        return "国际版";
    })();
    const rpText = isRP ? ` RP` : ``;
    const versionText = (() => {
        if (version && toVersion) return `${version} - ${toVersion}`;
        if (version) return `${version}+`;
        return "";
    })();
    /** 最终显示的文本，格式类似于（国际版 RP 1.20.20+） */
    const finalText = `${versionName} ${rpText}${versionText}`;
    return (
        <Highlight
            text={finalText}
            url={docUrl}
            backgroundColor={backgroundColor}
        />
    )
}
