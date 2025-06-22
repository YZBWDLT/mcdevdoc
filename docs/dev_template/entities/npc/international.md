---
sidebar_position: 5
---

# 扩展包：国际版 NPC

import '/src/css/treeview.css';
import FileType from "/src/components/FileType"

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);
