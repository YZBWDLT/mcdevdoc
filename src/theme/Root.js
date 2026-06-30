// src/theme/Root.js
import React, { useEffect } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

// 这个组件负责初始化字体并监听跨标签页变更
function FontManager() {
  const isBrowser = useIsBrowser();

  // 读取 localStorage 并应用到 document.documentElement
  const applyFontSetting = () => {
    if (!isBrowser) return;
    const saved = localStorage.getItem('oreui-font-mode');
    if (saved === 'misans' || saved === 'official') {
      document.documentElement.dataset.font = saved;
    } else {
      // 默认或 'pixel'
      delete document.documentElement.dataset.font;
    }
  };

  useEffect(() => {
    if (!isBrowser) return;

    // 1. 页面加载时应用
    applyFontSetting();

    // 2. 监听其他标签页的 localStorage 变化
    const handleStorageChange = (e) => {
      if (e.key === 'oreui-font-mode') {
        // 当其他标签页修改了该键值时，重新应用
        applyFontSetting();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 3. 清理事件
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isBrowser]);

  // 此组件不渲染任何 UI
  return null;
}

// 默认导出 Root，包裹 children
export default function Root({ children }) {
  return (
    <>
      <FontManager />
      {children}
    </>
  );
}
