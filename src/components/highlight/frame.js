import React from 'react';
import Highlight from './standard';

export default function FrameHighlight({
    text = "",
    color = "#000000",
}) {
    return (
        <Highlight
            text={text}
            backgroundColor='none'
            border={`3px solid ${color}`}
            fontColor={color}
        />
    )
}
