import React from 'react';

export default function Image({
    src = "",
    text = "",
    size = "50%",
    showText = true,
}) {
    if (text === "") showText = false;
    return showText ? (
        <div style={{"text-align":"center","margin":"1rem 0 0"}}>
            <img src={src} width={size} alt={text}/>
            <p style={{"font-size":"14px","color":"#888888","margin-top":"8px"}}>{text}</p>
        </div>
    ) : (
        <div style={{"text-align":"center","margin":"1rem 0 0"}}>
            <img src={src} width={size} alt={text}/>
        </div>
    );
}
