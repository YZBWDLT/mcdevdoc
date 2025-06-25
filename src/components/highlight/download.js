import React from 'react';
import Highlight from './standard';

export default function Download({
    text = "下载",
    url = "",
    isInline = false
}) {
    let fontSize = isInline ? "medium" : "xx-large"
    return (
        <Highlight
            text={text}
            url={url}
            fontSize={fontSize}
            borderRadius='16px'
            padding='10px'
        />
    )
}
