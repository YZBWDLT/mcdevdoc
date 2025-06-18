import React from 'react';

export default function DataType({ type, name, isRequired=false }) {
    const imgPath = `/img/dataType/${type}.svg`;
    const requiredIndicator = isRequired ? ( <strong><span className="required-indicator">*</span></strong> ) : null;
    const hasName = name ? ( isRequired ? (<strong><code className="data-type-name">{name}</code></strong>) : (<code className="data-type-name">{name}</code>) ) : null;

    return (
        <span className="data-type-container">
            <img 
                src={imgPath} 
                alt={`${name} 数据类型图标`}
                className="data-type-icon"
                style={{ width: '18px', height: '18px', verticalAlign: 'middle' }}
                onError={(e) => {
                    e.target.style.display = 'none'
                }}
            />
            {hasName}
            {requiredIndicator}
        </span>
    );
}
