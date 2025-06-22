---
sidebar_position: 3
---

# 行为包文件

import '/src/css/treeview.css';
import DataType from "/src/components/DataType"
import FileType from "/src/components/FileType"

本文档记载行为包所允许的文件结构。

## 文件路径

<treeview>

- <FileType fileType="folder" name="BP"/>：行为包根目录
  - <FileType fileType="folder" name="functions"/>：函数
    - <FileType fileType="file" name="（文件名）.mcfunction"/>：函数文件，通过`/function (文件名)`执行该函数
    - <FileType fileType="folder" name="（文件夹名）"/>
      - <FileType fileType="file" name="（文件名）.mcfunction"/>：函数文件，通过`/function (文件夹名)/(文件名)`执行该函数
    - <FileType fileType="file" name="tick.json"/>：循环执行的函数
  - <FileType fileType="file" name="manifest.json"/>：清单文件
  - <FileType fileType="image" name="pack_icon.png"/>：图标文件

</treeview>

## 参考资料

- [附加包 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/附加包#行为包)
