---
sidebar_position: 3
---

# 行为包文件

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

本文档记载行为包所允许的文件结构。

## 文件路径

<treeview>

- <FileType type="folder" name="BP"/>：行为包根目录
  - <FileType type="folder" name="functions"/>：函数
    - <FileType type="file" name="（文件名）.mcfunction"/>：函数文件，通过`/function (文件名)`执行该函数
    - <FileType type="folder" name="（文件夹名）"/>
      - <FileType type="file" name="（文件名）.mcfunction"/>：函数文件，通过`/function (文件夹名)/(文件名)`执行该函数
    - <FileType type="file" name="tick.json"/>：循环执行的函数
  - <FileType type="folder" name="structures"/>：结构
    - <FileType type="file" name="（文件名）.mcstructure"/>：结构文件，未放在特定命名空间内的结构文件使用`mystructure:`的命名空间。中国版在打包时要求结构至少拥有一个自定义命名空间
    - <FileType type="folder" name="（命名空间）"/>：指定结构的命名空间
      - <FileType type="file" name="（文件名）.mcstructure"/>：结构文件，结构 ID 为`(命名空间):(文件名)`
  - <FileType type="file" name="manifest.json"/>：清单文件
  - <FileType type="image" name="pack_icon.png"/>：图标文件

</treeview>

## 参考资料

- [附加包 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/附加包#行为包)
