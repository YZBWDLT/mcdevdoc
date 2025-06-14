---
sidebar_position: 4
---

# 扩展包：受击检测

import treeview from '/src/css/treeview.css';
import FileType from "/src/components/FileType"

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);
