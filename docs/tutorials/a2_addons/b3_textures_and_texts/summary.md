---
sidebar_position: 100
---

# 第三章小结

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

在本章，我们讲解了资源包的两个用法：贴图和翻译文本。可以说，这两个内容是我们之后所要讲解的数据驱动物品、方块、实体的重要组成部分。一起来回顾一下我们所讲的内容吧！

3.2 节，我们详细地从技术角度上讲解了如何创作一个贴图包。贴图包的本质是一种资源包，我们的贴图都放在<FileType type="folder" name="textures" />文件夹中，贴图只允许`.png`格式和`.tga`格式，并且要格外注意不要直接改后缀名。

对于纯贴图包作者来说，首要目的就是翻新原版的所有贴图。原版已经规定了贴图的位置，所以我们需要知道原版是如何规定的，因此我们要[在 GitHub 下载原版给出的模板](https://github.com/Mojang/bedrock-samples)，然后基于这个模板来翻新。国内想要流畅地访问 GitHub，可以采用 Steam++ 等软件来加速。

然后，为了更改贴图，我们还介绍了一款集模型设计、动画设计和贴图设计于一体的 MC 开发常用软件：Blockbench（简称 bb），还介绍了这款软件的基本使用方法。在未来的课时，bb 仍要继续发光发热。

3.3 节，我们讲解了自定义字体的做法。不过要注意自定义字体在作为非全局资源的时候可能会出现显示问题。

3.4 节，我们介绍了语言文件。

- 语言文件是用于在不同语言下启用不同翻译的文件，放在资源包的<FileType type="folder" name="texts" />文件夹中，以.lang为后缀。
- 常用的语言文件主要是英语（美国）的翻译<FileType type="file" name="en_US.lang" />和简体中文（中国）的翻译<FileType type="file" name="zh_CN.lang" />。
- 语言文件以`key=value`的格式声明某个键名的翻译。使用`%s`来格式化。
- 语言文件以`##`的格式声明注释，注释行不会被读取。和函数不同，注释可以跟在翻译文本之后，但应以一个制表符分隔。
- 查找翻译也有很多方法可用。通常使用Ctrl+F来查找翻译，也可以使用特定的键名格式来查找翻译。
- 在对原版翻译进行更改时，应只写上要更改的键名，而不是把原版的 10000 多行的语言文件整体照搬（除非这 10000 多行都得到了更改）。
- 在命令`/tellraw`和`/titleraw`中，使用`translate`文本组件搭配键名以应用翻译。这也是命令系统中多语言化的一种重要手段。

读者也可以在我们给出的[相关文档](/docs/docs/addons/resource_files#文件路径)中看到这些文件的格式要求。

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
