---
sidebar_position: 6
---

# 5.6 方块面剔除

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

在前几节中，我们定义了新的防爆玻璃，然而我们却发现内部的面仍然被渲染出来。为此，我们需要使用**方块面剔除（Block Culling）** 来移除玻璃内部的面。

## 资源包定义

要定义方块面剔除，我们需要在资源包先定义一套**方块面剔除规则（Block Culling Rule）**。我们在资源包新建<FileType type="folder" name="block_culling"/>，然后新建<FileType type="folder" name="test"/>，最后新建<FileType type="file" name="glass.cull.json"/>，如下所示：

<treeview>

- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="block_culling"/>：方块面剔除
    - <FileType type="folder" name="test"/>：命名空间
      - <FileType type="file" name="glass.cull.json"/>：针对玻璃的方块面剔除规则

</treeview>

按照惯例，我们先给出玻璃面剔除规则的一般描述，这在[我们给出的文档](/docs/docs/blocks/culling#方块面剔除规则文件格式)中都可以查到，读者也可以看到这个套路已经不止一次地出现，相信下面的代码无需过多描述就能看懂。

```json showLineNumbers title="glass.cull.json"
{
    "format_version": "1.21.80",
    "minecraft:block_culling_rules": {
        "description": {
            "identifier": "test:culling.glass"
        }
    }
}
```

不过还是有几点需要注意：

1. 面剔除规则的格式版本最低需要为`1.21.80`。不要设置得过低。
2. ID 在习惯上通常设置为`(命名空间):culling.(ID)`的形式。

接下来，我们要开始规定面剔除规则了。**面剔除规则会先检查方块在什么方向上有什么类型的临近方块，一旦满足条件就会移除自身骨骼的面**。对于玻璃来讲，我们希望的是：假设在东面有一个临近的玻璃，我们就移除东面的面，**也就是检查方向和面剔除方向通常是一致的**。

根据[方块面剔除文档](/docs/docs/blocks/culling#方块面剔除规则文件格式)，我们很快就能写出下面的代码：

```json showLineNumbers title="glass.cull.json" {7-14}
{
    "format_version": "1.21.80",
    "minecraft:block_culling_rules": {
        "description": {
            "identifier": "test:culling.glass"
        },
        "rules": [
            { "direction": "down", "geometry_part": { "bone": "block", "cube": 0, "face": "down" }, "condition": "same_block" },
            { "direction": "up", "geometry_part": { "bone": "block", "cube": 0, "face": "up" }, "condition": "same_block" },
            { "direction": "north", "geometry_part": { "bone": "block", "cube": 0, "face": "north" }, "condition": "same_block" },
            { "direction": "south", "geometry_part": { "bone": "block", "cube": 0, "face": "south" }, "condition": "same_block" },
            { "direction": "west", "geometry_part": { "bone": "block", "cube": 0, "face": "west" }, "condition": "same_block" },
            { "direction": "east", "geometry_part": { "bone": "block", "cube": 0, "face": "east" }, "condition": "same_block" }
        ]
    }
}
```

做一个解释，这段代码的核心含义是：在相应方向上的相邻方块是相同方块时，剔除自身`block`骨骼相邻方向上的面。例如一个防爆玻璃东边有防爆玻璃时，就会剔除掉自身`block`骨骼的东面。很好理解吧？

但，显然这里有一个问题是：`block`骨骼。对于原版提供的方块模型`minecraft:geometry.full_block`，我们似乎并不知道它的骨骼构造是什么样的。事实上，**这个模型根本就不是数据驱动模型**，因此我们也就没有办法对这个模型进行面剔除操作。这就意味着，**对于需要面剔除的方块来说，是不适合用原版模型的**。

## 行为包调用

在行为包调用面剔除规则是很简单的。我们只需要在[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件声明使用的面剔除规则就可以了：

```json showLineNumbers title="blast_proof_glass.block.json" {11}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:blast_proof_glass",
            "menu_category": { "category": "construction" }
        },
        "components": {
            "minecraft:destructible_by_explosion": false,
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 } },
            "minecraft:geometry": { "identifier": "geometry.full_block", "culling": "test:culling.glass" }
        }
    }
}
```

再次强调：要使用方块面剔除，必须使用自定义模型！

现在我们进入游戏来看一下实际效果吧：

![glass_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c6_block_culling/glass_1.png)

哦吼吼！雄兔脚扑朔，雌兔眼迷离；双兔傍地走，安能辨我是雄雌？

---

## 总结

本节，我们主要介绍了如何剔除方块内部的面。基于资源包的方块面剔除规则规定了在满足何种条件下剔除方块的哪个面，然后再通过[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件调用。

除此之外，方块面剔除还支持**面剔除层（Culling Layer）**，这里本文就不再展开了。感兴趣的读者可以查阅[方块面剔除文档](/docs/docs/blocks/culling)。

本节不设置习题。

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
