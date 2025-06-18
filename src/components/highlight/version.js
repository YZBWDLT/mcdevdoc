import React from 'react';

export default function Version({ text = "", docUrl = "", isChinaVersion = false, isLowVersion = false, isBeta = false}) {
    let backgroundColor = "#25C2A0";
    let versionName = "国际版";
    let cursorStyle = docUrl ? "pointer" : "auto";
    if ( isChinaVersion ) {
        backgroundColor = "#ECC93C";
        versionName = "中国版";
    }
    if ( isLowVersion ) {
        versionName = "国际版（旧版）";
        backgroundColor = "#3AA2EC"
    }
    if ( isBeta ) {
        backgroundColor = "#EC463A"
    }
    return (
        <span
            style={{
                backgroundColor: backgroundColor,
                borderRadius: "10px",
                color: "#FFFFFF",
                padding: "5px",
                fontWeight: "bold",
                display: "inline-block",
                margin: "0 0 10px 0",
                cursor: cursorStyle,
            }}
            onClick={() => {
                if ( docUrl ) window.open( docUrl, "_blank" )
            }}
        >
            {versionName}
            {' '}
            {text}
        </span>
    );
}
