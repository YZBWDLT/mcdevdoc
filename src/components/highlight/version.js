import React from 'react';
import Highlight from './standard';

export default function Version({
    version = "",
    docUrl = "",
    isChinaVersion = false,
    isLowVersion = false,
    isBeta = false,
    isRP = false,
}) {
    /** @type {string | undefined} */ let backgroundColor;
    let versionName = "国际版";
    if ( isChinaVersion ) { backgroundColor = "#ECC93C"; versionName = "中国版"; }
    else if ( isLowVersion ) { backgroundColor = "#3AA2EC"; versionName = "国际版 旧版"; }
    else if ( isBeta ) { backgroundColor = "#EC463A"; }
    let rpText = isRP ? ` RP` : ``;
    let versionText = version ? ` ${version}+` : ``;
    /** 最终显示的文本，格式类似于（国际版 RP 1.20.20+） */
    let finalText = `${versionName}${rpText}${versionText}`
    return (
        <Highlight
            text={finalText}
            url={docUrl}
            backgroundColor={backgroundColor}
        />
    )
}
