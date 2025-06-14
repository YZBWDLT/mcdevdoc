---
sidebar_position: 3
---

# 扩展包：交互检测

import treeview from '/src/css/treeview.css';
import FileType from "/src/components/FileType"

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);
