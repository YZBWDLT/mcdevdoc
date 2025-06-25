import React from 'react';

export default function Highlight({
    text = "",
    url = "",
    backgroundColor = "#25C2A0",
    fontColor = "#FFFFFF",
    borderRadius = "10px",
    padding = "5px",
    fontSize = "medium",
}) {
    let cursorStyle = url ? "pointer" : "auto";
    return (
        <span
            style={{
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                fontSize: fontSize,
                color: fontColor,
                padding: padding,
                fontWeight: "bold",
                display: "inline-block",
                margin: "0 0 10px 0",
                cursor: cursorStyle,
            }}
            onClick={() => {
                if ( url ) window.open( url, "_blank" )
            }}
        >
            {text}
        </span>
    );
}
