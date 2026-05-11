import React from 'react';

export default function Image({ src = "", text = "", size = "50%", showText = true }) {
    const showCaption = showText && text.trim() !== "";

    return (
        <div style={{ display: "inline-block", width: size, padding: "8px", boxSizing: "border-box", verticalAlign: "top" }}>
            <div style={{ textAlign: "center" }}>
                <img src={src} style={{ width: "100%", height: "auto", objectFit: "contain" }} alt={text} />
                {showCaption && (
                    <p style={{ fontSize: "14px", color: "#888888", marginTop: "6px", marginBottom: 0 }} >
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
}
