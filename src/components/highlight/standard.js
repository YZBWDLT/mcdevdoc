import React from 'react';

export default function Highlight({
    text = "",
    url = "",
    backgroundColor = "#25C2A0",
    fontColor = "#FFFFFF",
    borderRadius = "10px",
    padding = "5px",
    fontSize = "medium",
    border = "0px solid #000000"
}) {
    let cursorStyle = url ? "pointer" : "auto"
    /** @type {React.CSSProperties} */
    let style = {
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        fontSize: fontSize,
        color: fontColor,
        padding: padding,
        border: border,
        fontWeight: "bold",
        display: "inline-block",
        margin: "0 0 10px 0",
        cursor: cursorStyle,
        textDecoration: "none"
    }
    return (
        url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" style={style} >
                {text}
            </a>
        ) : (
            <span style={style} >
                {text}
            </span>
        )
    );
}
