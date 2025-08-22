---
sidebar_position: 3
---

# 资源包文件

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

本文档记载资源包所允许的文件结构。

## 文件路径

<treeview>

- <FileType type="folder" name="RP"/>：资源包根目录
  - <FileType type="folder" name="textures"/>：贴图
    - <FileType type="folder" name="（文件夹名）"/>：放在特定文件夹下面的贴图。习惯上，采用原版的分类方式，例如实体为`entity`、物品为`items`、方块为`blocks`等。允许子文件夹存在。原版贴图必须严格走原版的路径。
      - <FileType type="image" name="（文件名）.png"/>或<FileType type="image" name="（文件名）.png"/>：贴图，仅限`.png`或`.tga`格式。备注：严禁直接改文件后缀，需要格式转换请使用专业工具。
  - <FileType type="file" name="manifest.json"/>：清单文件
  - <FileType type="image" name="pack_icon.png"/>：图标文件

</treeview>

## 参考资料

- [附加包 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/附加包#资源包)
