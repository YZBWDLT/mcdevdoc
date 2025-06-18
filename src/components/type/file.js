import React from 'react';

export default function FileType({ type, name }) {
    const imgPath = `/img/fileType/${type}.svg`;
    const hasName = name ? ( <span className="file-type-name">{name}</span> ) : null;

    return (
        <span className="file-type-container">
            <img 
                src={imgPath} 
                alt={`${name} 文件图标`}
                className="file-type-icon"
                style={{ width: '18px', height: '18px', verticalAlign: 'middle' }}
                onError={(e) => {
                    e.target.style.display = 'none'
                }}
            />
            {hasName}
        </span>
    );
}
