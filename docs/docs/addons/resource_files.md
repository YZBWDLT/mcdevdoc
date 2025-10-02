---
sidebar_position: 3
---

# 资源包文件

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

本文档记载资源包所允许的文件结构。

:::warning

本文档仍在更新中。本文档计划随教程系列的更新节奏而更新，所以在教程系列更新完毕之前，本文档可能会缺失多项信息。

:::

## 文件路径

<treeview>

- <FileType type="folder" name="RP"/>：资源包根目录
  - <FileType type="folder" name="fonts"/>：字体贴图
    - <FileType type="image" name="（文件名）.png"/>：字体贴图，可通过解包获取。必须使用原版贴图，修改后更改游戏内显示该字的方式。需注意在非全局资源下可能会出现间距错误问题。
  - <FileType type="folder" name="texts"/>：翻译文本
    - <FileType type="file" name="languages.json"/>：可以定义语言，并在玩家选择特定语言后使用`语言名.lang`的翻译。
    - <FileType type="file" name="language_names.json"/>：可以定义语言在游戏内显示的名称。
    - <FileType type="file" name="（语言名）.lang"/>：使用了`语言名`的语言文件。常用的有`en_US.lang`（美国翻译）和`zh_CN.lang`（简体中文翻译）。
  - <FileType type="folder" name="textures"/>：贴图
    - <FileType type="folder" name="（文件夹名）"/>：放在特定文件夹下面的贴图。习惯上，采用原版的分类方式，例如实体为`entity`、物品为`items`、方块为`blocks`等。允许子文件夹存在。原版贴图必须严格走原版的路径。
      - <FileType type="image" name="（文件名）.png"/>或<FileType type="image" name="（文件名）.tga"/>：贴图，仅限`.png`或`.tga`格式。备注：严禁直接改文件后缀，需要格式转换请使用专业工具。
  - [<FileType type="file" name="manifest.json"/>](./manifest)：清单文件
  - <FileType type="image" name="pack_icon.png"/>：图标文件

</treeview>

## 参考资料

- [附加包 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/附加包#资源包)
