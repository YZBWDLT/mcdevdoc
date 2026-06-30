import React from 'react';
import MinecraftStyleTooltip from '../tooltip/minecraftStyle';

/**
 * 获取文件名后缀（不含点），若无则返回空字符串
 * @param {string} filename
 * @returns {string}
 */
function getFileExtension(filename) {
  if (!filename || !filename.includes('.')) return '';
  return filename.split('.').pop().toLowerCase();
}

/**
 * 根据 type 和 name 生成 tooltip 文本
 * @param {"file" | "folder" | "image" | "music"} type
 * @param {string} [name]
 * @returns {string|null} tooltip 文本，无效类型返回 null
 */
function generateTooltip(type, name) {
  switch (type) {
    case 'file': {
      const ext = getFileExtension(name);
      return ext ? `文件，应为.${ext}格式` : '文件';
    }
    case 'folder':
      return '文件夹';
    case 'image':
      return '图像，应为.png或.tga格式';
    case 'music':
      return '音乐，应为.ogg格式';
    default:
      return null; // 无效类型
  }
}

/**
 * @typedef FileTypeOptions
 * @property {"file" | "folder" | "image" | "music"} type 文件类型。
 * @property {string} [name] 文件名称。
 */

/** 文件类型。显示一个变量为特定的文件类型。
 * @param {FileTypeOptions} param0
 * @returns
 */
export default function FileType({ type, name }) {
  const imgPath = `/img/fileType/${type}.svg`;
  const hasName = name ? <span className="file-type-name">{name}</span> : null;

  const content = (
    <span className="file-type-container">
      <img
        src={imgPath}
        alt={`${name || type} 文件图标`}
        className="file-type-icon"
        style={{ width: '18px', height: '18px', verticalAlign: 'middle' }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      {hasName}
    </span>
  );

  const tooltipText = generateTooltip(type, name);
  if (!tooltipText) {
    // 无效类型，直接返回内容，无 Tooltip
    return content;
  }

  return <MinecraftStyleTooltip text={tooltipText}>{content}</MinecraftStyleTooltip>;
}