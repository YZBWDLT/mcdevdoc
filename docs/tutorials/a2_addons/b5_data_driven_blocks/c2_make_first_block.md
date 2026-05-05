---
sidebar_position: 2
---

# 5.2 制作第一个数驱方块

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

本节，我们就开始制作我们的第一个数据驱动方块！比如我们可以加入一种……纯黑色的方块。毕竟黑色混凝土多多少少还是有些纹理的嘛 =P

和数据驱动物品类似，数据驱动方块同样也需要行为包和资源包的配合：

- 行为包：告诉游戏引擎（服务端），我们添加了一种全新的黑色方块，在处理各种方块的时候要把我们的黑色方块带上。
- 资源包：告诉客户端，对于这个黑色方块，我们应该如何进行渲染、以及如何进行音效、粒子等特效的处理。

那么现在，让我们打开 VSC 的工作区开始制作吧！

## 数驱方块基本定义

### 行为包部分：注册新的方块

和数据驱动物品类似，**在行为包部分，我们的工作是定义新方块的存在**。

对于方块的定义，我们也需要放到特定的文件夹下。现在请按照以下步骤来创建文件：

1. 在行为包根目录创建<FileType type="folder" name="blocks"/>，同样注意不要丢了那个 s；
2. 在刚创建的<FileType type="folder" name="blocks"/>内新增一个<FileType type="folder" name="test"/>，作为命名空间。对于这个命名空间文件夹，我们在数驱物品那一节有讨论过它的存在意义，这里也是同理的。
3. 最后，在命名空间<FileType type="folder" name="test"/>下新增一个<FileType type="file" name="black_block.block.json"/>。同样地，加上一个`.block`也是为了在将来更有助于区分各种定义的类型。

现在，你的项目内应该有这些文件：

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
  - ……
  - <FileType type="folder" name="blocks" />：方块定义
    - <FileType type="folder" name="test" />：以 test 作为方块的命名空间
      - <FileType type="file" name="black_block.block.json" />：黑色方块的定义文件

</treeview>

其实看到这里，或许你也发现了一些端倪——这怎么和数据驱动物品如此地相像？难道它们的定义格式也如此相像吗？

——是的！**数驱方块和数驱物品都是遵循「格式版本 - 描述 - 组件」的三段式定义的**，甚至，数驱实体和其他许许多多的定义也都是遵循这样的定义的！那这样的话，我们要定义一个方块就变得很简单了：

```json showLineNumbers title="black_block.block.json" {3}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:black_block",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {}
    }
}
```

这里需要注意第 3 行，因为我们定义的是方块，当然要告诉 Minecraft，这是一个方块啦。相信到目前为止，只要读者有认真学过数据驱动物品并进行过实践的话，这段代码应该是不需要我们解释的。

这样，我们就完成了对方块在行为包上的定义。对，就是这么简单！快去试试吧。

### 资源包部分：处理新方块的贴图和特效

现在，同样地，我们需要定义我们的方块的贴图了。这需要我们在资源包进一步地定义方块。请读者打开资源包，并确保存在以下文件：

<treeview>

- <FileType type="folder" name="BP_test"/>：行为包
  - ……
  - <FileType type="folder" name="blocks"/>：方块定义
    - <FileType type="folder" name="test"/>：以 test 作为方块的命名空间
      - <FileType type="file" name="black_block.block.json"/>：黑色方块的定义文件
- <FileType type="folder" name="RP_test"/>：资源包
  - ……
  - <FileType type="folder" name="texts"/>：翻译文本
    - **<FileType type="file" name="en_US.lang"/>：英语（美国）的翻译文本**
    - **<FileType type="file" name="zh_CN.lang"/>：简体中文（中国）的翻译文本**
  - <FileType type="folder" name="textures"/>：贴图
    - <FileType type="folder" name="blocks"/>：方块贴图
      - **<FileType type="image" name="black_block.png"/>：黑色方块的贴图**
    - **<FileType type="file" name="terrain_texture.json"/>：方块贴图注册**
  - **<FileType type="file" name="blocks.json"/>：方块定义**

</treeview>

读者可以使用下面的贴图充当黑色方块的贴图<FileType type="image" name="black_block.png"/>：

![black_block](/img/tutorials/a2_addons/b5_data_driven_blocks/c2_make_first_block/black_block.png)

**在资源包定义方块贴图和音效的工作就由<FileType type="file" name="blocks.json"/>来进行**。所以，现在我们来定义<FileType type="file" name="blocks.json"/>。首先我们先确定一个对象，然后输入格式版本：

```json showLineNumbers title="blocks.json"
{
    "format_version": "1.21.90"
}
```

然后来确定我们的黑色方块使用的贴图：

```json showLineNumbers title="blocks.json" {3}
{
    "format_version": "1.21.90",
    "test:black_block": { "textures": "black_block" }
}
```

这里，**我们新增了第 3 行，代表着我们的`test:black_block`方块要使用 ID 为`black_block`的贴图**。同理地，其他 ID 的方块也都可以如法炮制，类似于：

```json
"(方块 ID)": { "textures": "(贴图 ID)" }
```

现在，如果读者正常照做，在 VSC 中会发现存在报错：

![resource_pack_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c2_make_first_block/resource_pack_1.png)

这种情况和当时在定义物品时使用`minecraft:icon`类似，因为`black_block`贴图是什么东西没人知道。这样，**我们就同样需要让游戏知道这个 ID 为`black_block`的贴图是什么东西，这时候`terrain_texture.json`就可以派上用场了**。好在，它的结构和`item_texture.json`是高度类似的，我们也可以类似地给出它的定义：

```json showLineNumbers title="terrain_texture.json"
{
    "resource_pack_name": "test",
    "texture_data": {
        "black_block": { "textures": "textures/blocks/black_block" }
    }
}
```

其中第 2 行的`resource_pack_name`是一个可选字段，但没有它可能会导致 VSC 插件报错，所以就留着吧。读者是很容易看懂这段代码的，它表示`black_block`贴图实际上链接到`textures/blocks/black_block`这个路径上。

所以，**我们定义贴图的完整逻辑链路是：`textures/blocks/xxx.png`（贴图路径）→ `terrain_texture.json`（注册所有的方块贴图）→ `blocks.json`（确定使用哪些方块贴图）**。

现在进入游戏，我们可以得到一个完全黑色的方块：

![resource_pack_2](/img/tutorials/a2_addons/b5_data_driven_blocks/c2_make_first_block/resource_pack_2.png)

剩下的工作，想必读者已经很清楚了——同步翻译文件。我们注意到，对于方块，其键名的格式为

```lang
tile.(命名空间):(方块 ID).name
```

这和数驱物品还是有一定区别的，（高版本）物品的键名是不带`.name`的。我们可以把它起名为「黑色方块」：

```lang title="en_US.lang"
tile.test:black_block.name=Black Block
```

```lang title="zh_CN.lang"
tile.test:black_block.name=黑色方块
```

至此，我们就完成了我们的第一个数据驱动方块的定义！是不是很简单呢？UwU

### 方块音效

现在不妨让我们更进一步，如何对该方块使用玻璃的音效？

这也是很简单的，我们打开<FileType type="file" name="blocks.json"/>，并为之添加一个音效：

```json showLineNumbers title="blocks.json" {3}
{
    "format_version": "1.21.90",
    "test:black_block": { "textures": "black_block", "sound": "glass" }
}
```

当然，这音效可不是乱加的，这是有备而来。**这里引用的`glass`音效是原版正在使用的音效**。关于原版可用的方块音效，可以参考[Bedrock Wiki](https://wiki.bedrock.dev/blocks/vanilla-block-sounds)。读者也可以为自己的方块添加诸如木板、石头、玻璃、沙子等原版正在使用的音效。

要添加自己的音效该怎么办呢？这时候我们就可以使用`sounds.json`。但是，有关的定义方法，我们会在后续的章节学习。至少读者现在知道，我们可以添加非原版的方块音效，这就足够了。

### 多面方块

最后一个问题，我们该如何实现各面都不相同的方块呢？比如……TNT！我们可以注意到，TNT 是一种顶面、底面、侧面各不相同的方块。

![multi_face_block_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c2_make_first_block/multi_face_block_1.png)  
*图源：Minecraft Wiki*

我们不妨来看看原版的 TNT 是如何定义的。虽然 TNT 并不是数驱方块，这意味着行为包层面没有办法对其进行修改，但是它的资源包定义还是可以自定义的：

```json showLineNumbers title="blocks.json" {3-10}
{
    ...,
    "tnt": {
        "sound": "grass",
        "textures": {
            "down": "flattened_tnt_bottom",
            "side": "flattened_tnt_side",
            "up": "flattened_tnt_top"
        }
    },
    ...
}
```

可以看到，在第 4 行，原版定义了 TNT 使用了草方块的音效；**至于贴图，则是采用了对象的写法，并分别定义了顶面（`up`）、底面（`down`）和侧面（`side`）各自采用的贴图**。因此，**对于类似于 TNT 这样的顶底侧面型的方块，只需要在<DataType type="object" name="textures"/>分别定义顶底侧面调用何贴图 ID 即可**。

至于**某些侧面也互相存在不同的方块，就需要对东西南北面均分别进行定义了**。例如蜂巢：

```json showLineNumbers title="blocks.json" {3-10}
{
    ...,
    "bee_nest": {
        "textures": {
            "down": "bee_nest_bottom",
            "east": "bee_nest_side",
            "north": "bee_nest_side",
            "south": "bee_nest_front",
            "up": "bee_nest_top",
            "west": "bee_nest_side"
        }
    },
    ...
}
```

![multi_face_block_2](/img/tutorials/a2_addons/b5_data_driven_blocks/c2_make_first_block/multi_face_block_2.png)  
*图源：Minecraft Wiki*

我们看到，蜂巢因为存在一个供蜜蜂进出的正面，和其他三个面并不相同，因此只得使用了东西南北各不相同的写法。

读者这时候或许有所疑问：看这段代码，蜂巢的正面是锁定在南面的吗？但实际在游戏里试过应该不难发现，蜂巢是存在朝向的啊。事实上，这是使用了「方块状态」和「方块特征」的结果。我们在下面的几节就会介绍到它们。总而言之，在存在侧面也互不相同的情况时，就需要用顶底东西南北的六面写法了。

## 方块标签

和物品类似，方块也是具有标签的。这就允许我们在需要的时候，可以选定一整类方块。

那么第一个问题，**我们如何为自己的方块确定方块标签**？答案是：**我们可以使用[`minecraft:tags`组件](/docs/docs/blocks/components#minecrafttags)来指定方块标签**。对，和物品依然很像吧？

```json showLineNumbers title="black_block.block.json" {2,11}
{
    "format_version": "1.26.20",
    "minecraft:block": {
        "description": {
            "identifier": "test:black_block",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {
            "minecraft:tags": [ "test:colorful_block" ]
        }
    }
}
```

这段代码就定义了我们定义的黑色方块具有`test:colorful_block`标签。

但是，我们需要注意，**`minecraft:tags`组件必须指定为`1.26.20`以上的格式版本才可用**。那么旧版本该怎么办呢？**我们就需要用[`tag:(标签)`](/docs/docs/blocks/components#tag标签)来解决问题了，这是一个不含任何参数的，形似组件的标签定义方法**。应该说，旧版本的方块定义标签的方式还是比较奇怪的。

```json showLineNumbers title="black_block.block.json" {2,11}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:black_block",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {
            "tag:test:colorful_block": {}
        }
    }
}
```

**我们也可以为我们自己的方块定义原版的标签**。原版可用的所有标签在[方块标签（文档）](/docs/docs/blocks/tags#原版使用的标签)中有详细记载。读者可以简单查阅过后再继续阅读本教程。

第二个问题是，在什么地方可以用得上方块标签呢？我们先不往远了说，就讲讲我们在上一章介绍的物品实例吧。当时，我们面对镐可以破坏数百种方块的问题时，是这么说的：

> ……
>
> 这个问题可以引入**方块标签（Block Tags）** 来解决，然而这不是我们本节的重点，请容我们暂且按下不表，在下一章讲到数驱方块的时候，我们会回过头来看这个问题。……

是的，现在就是填坑时间！仔细观察物品的[`minecraft:digger`](/docs/docs/items/components#minecraftdigger)组件，不难看到我们可以指定特定的方块标签，考虑到我们希望使用镐加速挖掘的方块应该都具有`minecraft:is_pickaxe_item_destructible`标签，我们直接指定这个标签不仅可以避免穷举，而且还可以很好地兼容新版本需要用镐加速挖掘的方块，因为这是一个原版标签！

但是，先等一下，什么是 Molang……？我们看到这个组件的<DataType type="string" name="tags"/>属性要求我们填写一个 Molang 表达式。在这里，我们需要先对 Molang 做一点简单的介绍。

> **Molang** 是一种简单的基于表达式的语言，为实时且快速地计算数值而设计。它的设计重点是在 JavaScript 无法大规模执行的需要更高性能的系统中启用类似脚本的功能。Mojang 提供这些底层系统中的脚本功能来支持用户修改模组，自定义实体、渲染和动画。  
> —— [Minecraft 基岩版开发 Wiki](https://wiki.mcbe-dev.net/p/Molang)

简单一点来说，Molang 是 Mojang 提供的一种简易脚本功能（*是的，请注意把 Molang 和 Mojang 区分开——Molang 是 Mojang 提供的一种 lang（语言），故名 Molang*），它通常由一个或多个表达式构成，并写在一个字符串里。在这里，我们目前并不希望过多地强调 Molang 的语法问题，因为 Molang 通常用于自定义实体，我们希望在自定义实体的部分进一步强调其语法问题。

至少目前来说，读者只需要知道 Molang 同样提供了不少的查询函数，用于查询世界中的实体、方块、物品等的状态。**查询函数的一般格式就是`query.xxx`。少数的查询函数需要额外提供参数，也就是`query.xxx(args)`的形式**。对于方块，读者现在可以简单查阅[与方块有关的 Molang 查询函数](/docs/docs/blocks/molang)，并大体了解一下它的用法。

现在重新打开我们的红宝石镐<FileType type="file" name="ruby_pickaxe.item.json"/>，把定义改为

```json showLineNumbers title="ruby_pickaxe.item.json" {21}
{
    "format_version": "1.21.50",
    "minecraft:item": {
        "description": {
            "identifier": "test:ruby_pickaxe",
            "menu_category": {
                "category": "equipment",
                "group": "itemGroup.name.pickaxe"
            }
        },
        "components": {
            "minecraft:icon": "ruby_pickaxe",
            "minecraft:tags": {
                "tags": [ "minecraft:is_pickaxe" ]
            },
            "minecraft:durability": { "max_durability": 1500 },
            "minecraft:max_stack_size": 1,
            "minecraft:damage": 5,
            "minecraft:digger": {
                "destroy_speeds": [
                    { "block": { "tags": "query.all_tags('minecraft:is_pickaxe_item_destructible')" }, "speed": 8 }
                ],
                "use_efficiency": true
            },
            "minecraft:enchantable": { "slot": "pickaxe", "value": 13 },
            "minecraft:hand_equipped": true,
            "minecraft:repairable": {
                "repair_items": [
                    { "items": [ "test:ruby" ], "repair_amount": 375 }
                ]
            }
        }
    }
}
```

这里，我们定义了一个 Molang 为`"query.all_tags('minecraft:is_pickaxe_item_destructible')"`，代表仅当被挖掘的方块具有`minecraft:is_pickaxe_item_destructible`标签才能加速。需要注意的是，因为 Molang 全部包裹在字符串内，我们想在 Molang 里面用字符串就必须要用单引号`'`了。

现在，我们就得到了一把真正的镐了，它在破坏任何该加速的方块的时候都能够得心应手！

## 中国版方块
