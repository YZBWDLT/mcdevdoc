---
sidebar_position: 3
---

# 行为包文件

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

本文档记载行为包所允许的文件结构。

:::info[本文更新时间]

本文于 2026 年 1 月 5 日更新，中国版最新版本为 1.21.50，国际版最新版本为 1.21.130。

:::

:::warning

本文档仍在更新中。本文档计划随教程系列的更新节奏而更新，所以在教程系列更新完毕之前，本文档可能会缺失多项信息。

:::

## 文件路径

<treeview>

- <FileType type="folder" name="BP"/>：行为包根目录
  - <FileType type="folder" name="functions"/>：函数
    - <FileType type="file" name="（文件名）.mcfunction"/>：函数文件，通过`/function (文件名)`执行该函数
    - <FileType type="folder" name="（文件夹名）"/>
      - <FileType type="file" name="（文件名）.mcfunction"/>：函数文件，通过`/function (文件夹名)/(文件名)`执行该函数
    - <FileType type="file" name="tick.json"/>：循环执行的函数
  - <FileType type="folder" name="items"/>：数据驱动物品定义
    - <FileType type="folder" name="（文件夹名）"/>：习惯上命名为命名空间或用途（例如`weapon`、`food`）
      - <FileType type="file" name="（文件名）.json"/>：物品定义文件，可以直接放在<FileType type="folder" name="items"/>下，也可以放在嵌套文件夹下，效果等同。习惯上命名为`（物品 ID）.item.json`。
  - <FileType type="folder" name="recipes"/>：配方表定义
    - <FileType type="folder" name="（文件夹名）"/>：习惯上命名为命名空间或用途、途径等（例如`crafting_table`、`furnace`）
      - <FileType type="file" name="（文件名）.json"/>：配方表文件，可以直接放在<FileType type="folder" name="recipes"/>下，也可以放在嵌套文件夹下，效果等同。习惯上命名为`（物品 ID）.recipe.json`。
  - <FileType type="folder" name="structures"/>：结构
    - <FileType type="file" name="（文件名）.mcstructure"/>：结构文件，未放在特定命名空间内的结构文件使用`mystructure:`的命名空间。中国版在打包时要求结构至少拥有一个自定义命名空间
    - <FileType type="folder" name="（命名空间）"/>：指定结构的命名空间
      - <FileType type="file" name="（文件名）.mcstructure"/>：结构文件，结构 ID 为`(命名空间):(文件名)`
  - <FileType type="file" name="manifest.json"/>：清单文件
  - <FileType type="image" name="pack_icon.png"/>：图标文件

</treeview>

## 参考资料

- [附加包 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/附加包#行为包)
