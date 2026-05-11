import React from 'react';

export default function ImageGroup({ children }) {
    return (
        <div style={{ width: "100%", margin: "2rem 0", textAlign: "center", display: "block", }}>
            {children}
        </div>
    );
}
