---
sidebar_position: 4
---

# 5.4 方块模型与方块材质贴图实例化

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"
import Image from "/src/components/image/standard"

在前几节的学习中，我们不难发现，光是有一般方块——即**完整不透明方块**，是解决不了我们的全部需求的。原版有大量不完整方块和不透明方块，比如台阶、楼梯就属于不完整方块，而玻璃、树叶等又属于不透明方块。

那么这一节，我们来介绍如何自定义方块模型和方块材质，也就是[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件和[`minecraft:material_instances`](/docs/docs/blocks/components#minecraftmaterial_instances)组件的应用。

## 方块模型

我们知道，台阶只占一半的方块体积，楼梯则占 3/4 的方块体积。除此之外，比如箱子、讲台、草、梯子等方块都属于不规则形状的方块。而它们的形状则由**方块模型（Block Geometry）** 决定。**方块模型会定义方块以何种形状显示在世界中**。

例如……如果我们现在想要制作一个泥土台阶，首先就要有一个台阶的模型。

### 基于 Blockbench 的数据驱动方块模型构建

方块模型的定义也是数据驱动的，只要我们给客户端一个方块模型，它就会自动解析这个数据驱动模型并渲染出来。然而，在不可视的曾经，想要手写代码绘制一个模型谈何容易？像是台阶、楼梯这种尚且简单的模型还能勉强应付，而像讲台、饰纹陶罐这种稍复杂一些的模型，手写代码就会变得十分艰难。这时候，我们就必须要介绍我们曾经介绍过的老朋友——**Blockbench**！

是的，bb 可以做到可视化模型的编写，这才是它的主业！我们现在赶紧来打开 bb，准备构造我们的第一个模型吧！

在新建一栏选择 Bedrock 版方块：

![bb_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/bb_1.png)

我们定义我们的模型 ID 为`geometry.test_slab_bottom`，代表下半砖模型，这样我们就给我们的模型标识符填写为`test_slab_bottom`。文件名习惯上也填写为同一个名字。

![bb_2](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/bb_2.png)

现在就正式进入到我们的模型构造环节了。有很多人看到这个界面不知该如何下手，那就先跟着我们的步骤走吧。首先第一步，我们先定义一个**骨骼（Bone）**：

![bb_3](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/bb_3.png)

有必要解释一下，新增骨骼不是说我们搞了一根骨头或者头骨之类的东西，骨骼是一个抽象出来的概念，就好像动物的运动实际上可以只追踪骨骼一样，骨骼的运动会带动肌肉的运动，进而相当于动物体的运动，我们这里定义的骨骼也是类似的概念。一个方块模型可能由多个**部件（Cube）** 组成，为了使多个部件以同一种方式运动，我们就会把这些部件放到同一个骨骼里面去。到后面，有不少操作也是针对于特定骨骼进行操作的，比如部件的隐藏、方块面的剔除等。

我们可以右键刚创建的骨骼`bone`，将它重命名为`block`。然后，点一下“+”号，创建一个新的部件：

![bb_4](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/bb_4.png)

现在，你的界面上应该出现了一个新的块。我们可以按住<kbd>鼠标中键</kbd>来旋转界面，按住<kbd>Shift</kbd> + <kbd>鼠标中键</kbd>来平移界面。上方和右侧都有可以控制这个部件大小的工具。

![bb_5](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/bb_5.png)

我们现在把它拉伸到半砖的大小（注意这里的 1 格代表的是方块的一个像素，也就是这里 16×16×16 的大小才对应原版一个完整方块的大小），读者可以自行尝试：

![bb_6](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/bb_6.png)

现在我们其实就可以保存这个模型了！在保存之前，先回到我们的资源包，在资源包下新建<FileType type="folder" name="models"/>，再在<FileType type="folder" name="models"/>下新建<FileType type="folder" name="blocks"/>：

<treeview>

- <FileType type="folder" name="RP_test"/>：资源包
  - <FileType type="folder" name="models"/>：模型
    - <FileType type="folder" name="blocks"/>：方块模型

</treeview>

然后，我们把模型导出到刚刚新建的文件夹里：

![bb_7](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/bb_7.png)

现在如果一切正常，你的资源包应该长成这个样子：

<treeview>

- <FileType type="folder" name="RP_test"/>：资源包
  - ……
  - <FileType type="folder" name="models"/>：模型
    - <FileType type="folder" name="blocks"/>：方块模型
      - <FileType type="file" name="test_slab_bottom.geo.json"/>：下半砖模型

</treeview>

如法炮制地，我们给出上半砖的模型，这里我们就不配图了，请读者自行尝试，起名叫`test_slab_top`。

<treeview>

- <FileType type="folder" name="RP_test"/>：资源包
  - ……
  - <FileType type="folder" name="models"/>：模型
    - <FileType type="folder" name="blocks"/>：方块模型
      - <FileType type="file" name="test_slab_bottom.geo.json"/>：下半砖模型
      - <FileType type="file" name="test_slab_top.geo.json"/>：上半砖模型

</treeview>

这样，我们就完成了模型的绘制。可以看到，利用 bb 可以让我们的模型绘制变得更加得心应手，只要你想，通过 bb 就都很容易做得出来。bb 还有很多其他的功能，比如对应的贴图绘制和显示调整功能，这些就留给读者自行探索了。

## 行为包定义调用模型与贴图

### `minecraft:geometry`组件：调用自定义的方块模型

现在，我们要在我们的行为包里调用这个模型。**对方块使用特殊模型需要用到[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件**。

我们首先先来定义泥土台阶，并且同时定义一个方块状态`test:vertical_half`和相关的方块置换：

```json showLineNumbers title="dirt_slab.block.json"
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:dirt_slab",
            "menu_category": { "category": "construction" },
            "states": {
                "test:vertical_half": [ "bottom", "top" ]
            }
        },
        "components": {},
        "permutations": [
            {
                "condition": "query.block_state('test:vertical_half') == 'bottom'",
                "components": {}
            },
            {
                "condition": "query.block_state('test:vertical_half') == 'top'",
                "components": {}
            }
        ]
    }
}
```

同时定义方块的音效和翻译，但注意*不需要*提供贴图：

```json showLineNumbers title="blocks.json"
{
    "format_version": "1.21.40",
    ...,
    "test:dirt_slab": { "sound": "gravel" }
}
```

我们来根据 [wiki 给出的泥土的相关数值](https://zh.minecraft.wiki/w/%E6%B3%A5%E5%9C%9F)，给出泥土半砖的基础组件：

```json showLineNumbers title="dirt_slab.block.json"
"components": {
    "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.5 },
    "minecraft:destructible_by_explosion": { "explosion_resistance": 0.5 },
    "minecraft:map_color": "#976D4D",
    "tag:dirt": {}
},
```

现在我们来关注不同方块状态的情况。对于不同的半砖，我们需要改变半砖的碰撞箱、选择箱和模型：

```json showLineNumbers title="dirt_slab.block.json" {7,15}
"permutations": [
    {
        "condition": "query.block_state('test:vertical_half') == 'bottom'",
        "components": {
            "minecraft:collision_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:geometry": "geometry.test_slab_bottom"
        }
    },
    {
        "condition": "query.block_state('test:vertical_half') == 'top'",
        "components": {
            "minecraft:collision_box": { "origin": [ -8, 8, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:selection_box": { "origin": [ -8, 8, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:geometry": "geometry.test_slab_top"
        }
    }
]
```

这里，我们的模型直接选用了字符串类型，选择了特定的模型。当然，根据文档，也可以选择对象型的，但目前里面的功能我们暂时并不需要，所以就使用字符串型的写法即可。

### `minecraft:material_instances`组件：定义自定义模型方块的贴图

但是，只有`minecraft:geometry`组件是不行的。根据该组件的要求，**我们必须同时定义[`minecraft:material_instances`](/docs/docs/blocks/components#minecraftmaterial_instances)组件**。这个组件就是专门根据模型来应用贴图的，它的作用和<FileType type="file" name="blocks.json"/>是一致的。我们在这里使用原版泥土的贴图：

```json showLineNumbers title="dirt_slab.block.json" {8-10,19-21}
"permutations": [
    {
        "condition": "query.block_state('test:vertical_half') == 'bottom'",
        "components": {
            "minecraft:collision_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:geometry": "geometry.test_slab_bottom",
            "minecraft:material_instances": {
                "*": { "texture": "flattened_dirt" }
            }
        }
    },
    {
        "condition": "query.block_state('test:vertical_half') == 'top'",
        "components": {
            "minecraft:collision_box": { "origin": [ -8, 8, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:selection_box": { "origin": [ -8, 8, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:geometry": "geometry.test_slab_top",
            "minecraft:material_instances": {
                "*": { "texture": "flattened_dirt" }
            }
        }
    }
]
```

做一些解释：

这里，`"*"`代表应用到所有的面，也就是所有的面都引用相同的贴图 ID。如果要对特定面使用特定的贴图，就可以把`"*"`改为`"east"`、`"west"`等特定的面。

这里的贴图 ID 是直接从<FileType type="file" name="terrain_texture.json"/>找的，就不再需要<FileType type="file" name="blocks.json"/>这个“中间商”定义了。在使用了`minecraft:material_instances`组件定义了贴图的情况下，就没有必要再使用<FileType type="file" name="blocks.json"/>定义贴图了，否则游戏会报错。

这里我们引用了在<FileType type="file" name="terrain_texture.json"/>中定义的`flattened_dirt`。如果读者有做过上一节的练习，应该清楚为什么我们不引用`dirt`贴图。

`minecraft:material_instances`组件的功能要比<FileType type="file" name="blocks.json"/>来得更强，因为它除了定义贴图之外，还支持特定的面构成一组，使用特定的贴图。此外，它还可以用来控制光照渲染、面的材质等。在后面，**我们定义方块的贴图和材质时应当优先考虑`minecraft:material_instances`组件，而不再是<FileType type="file" name="blocks.json"/>**。但是，定义方块的音效还是要用<FileType type="file" name="blocks.json"/>的。

现在，我们来进入游戏实测一下效果吧！

![dirt_slab_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/dirt_slab_1.png)

当然，如果正常放置的话，只能放置下半砖，这时候我们就可以用`/setblock`命令放置上半砖。

![dirt_slab_2](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/dirt_slab_2.png)

或者，像半砖、旋转方块、可连接方块这些特殊方块，我们也可以用下一节会学到的方块特征来解决这种不便的问题！

## 方块材质

除了可以给方块贴图套用贴图之外，我们还可以规定方块面的**材质（Material）** 如何。所谓材质，**指代的是使用何种性质的材料**。例如，木桌使用木质材料制作，我们就说木桌的材质是木的。同理地，材质也可以说是铁的、金属的、透明的，这种描述材料本身性质的说法。

:::warning[注意]

这里我们必须再次强调，读者必须注意：**材质（Material）与贴图（Texture）不是一回事！社区总是喜欢叫 [Texture Pack](https://zh.minecraft.wiki/w/%E7%BA%B9%E7%90%86%E5%8C%85) 为「材质包」，但这是错误的说法！Texture Pack 的官方译名为「纹理包」！**

为什么会出现错误的说法？因为当初 Java 版也曾经历一段机翻的时光，在 Java 版 1.1 时期，Texture Pack 就曾被错译为「材质包」。

但现在我们看到，**材质与贴图的概念是有本质区别的**。如果说木桌的材质是木的，那么桌子上的桌布就可以认为是贴图——贴图（Texture）就只是将我们给定的图片贴到方块上而已。显然，Texture Pack 的工作是将贴图应用到方块上，而不是改变了方块的材质。因此，不应译为「材质包」，而应译为「纹理包」或「贴图包」。事实上，几乎只有 Minecraft 的社区会把 Texture Pack 常译为「材质包」。

由于错翻由来已久，拨乱反正的时间又特别的晚，因此社区形成了一股巨大的惯性，短时间内没有办法纠正。普通玩家在提起材质包这个名称时，我们只需要知道他们说的其实是贴图包即可。而**对于我们这种专业的开发者来说，则必须要澄清、纠正这个概念**。在后面，我们经常要同时提起贴图和材质的概念。

:::

在方块部分，我们主要有这么几种材质（或者说渲染方法）可用：**完全不透明、半透明和完全透明**。此外，在 1.21.80 后，我们还有透明或半透明转不透明的材质，以实现远处的方块正常渲染。但总体上，无论特性或渲染方式如何变化，这些材质很大程度上都是围绕是否透明这个特性在展开的。

### `blend`：半透明材质 背面剔除

现在我们可以把我们在练习 5.1 做的防爆玻璃拿出来，我们要把它改为透明材质，同时注意在<FileType type="file" name="blocks.json"/>撤销对防爆玻璃的贴图的定义：

```json showLineNumbers title="blast_proof_glass.block.json" {12}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:blast_proof_glass",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {
            "minecraft:destructible_by_explosion": false,
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend" } }
        }
    }
}
```

```json showLineNumbers title="blocks.json" {4}
{
    "format_version": "1.21.40",
    ...,
    "test:blast_proof_glass": { "sound": "glass" },
    ...
}
```

**我们这里使用的`blend`材质，是一种专门用于玻璃的半透明材质**，它允许贴图中存在`alpha`通道（也就是不透明度通道）。我们曾在模块 1 学过，计算机领域常用`RGB`，也就是不同强度的红绿蓝三原色组合而成的值来代表一个颜色。而`alpha`通道也就是第 4 个通道（通常用`A`表示），代表颜色的不透明度。如果`A`为 0%，则代表这个颜色是完全透明的，也就是不可见的；而`A`为 100% 时，这个颜色就是完全不透明的。

读者在画贴图时也可以注意 bb 的这个不透明度设置，事实上这就是在指定`A`通道了。

![alpha_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/alpha_1.png)

当然，`blend`材质还有一个特别的点，就是存在**背面剔除（Backface Culling）**。我们都知道，对于一个立方体，以我们的视角只能看到它的 3 个面，而另外 3 个面则是不可见的。这样，我们就可以想方设法，不要让这些不可见的面渲染出来，毕竟渲染一个面是需要消耗性能的，更何况游戏内往往存在无穷无尽的方块，这就意味着无穷无尽的面要渲染，会大幅度提升渲染压力，降低客户端的性能。这种**只渲染前面，而背面的方块面全部剔除掉，以提升性能的剔除方法**，就叫做背面剔除。

<Image src="/img/docs/docs/blocks/culling/backface_culling_1.png" text="面剔除示例"/>

对于不透明的完整方块，这么做是不存在什么问题的，但对于透明方块来讲，情况就不是这样了。因为**背面剔除是建立在玩家不可见背面的基础上的，但是透明方块却使得玩家可以看到背面**！这样，是否存在背面剔除就会影响方块的渲染效果。有一个比较好的例子是玻璃和刷怪笼的渲染方法并不相同。读者可以看到：

- 对于玻璃来说，它使用的是`blend`材质，存在背面剔除，故而我们看不到它的背面。
- 而刷怪笼使用的是`alpha_test`材质（我们一会儿就会细说），而`alpha_test`材质是不会进行背面剔除的，所以刷怪笼的背面是清晰可见的。

<Image src="/img/docs/docs/blocks/culling/backface_culling_2.png" text="背面剔除（左）与背面不剔除（右）的对比" size="75%"/>

现在我们定义了方块的材质和贴图，但不要忘记方块模型！**不要忘记，`minecraft:material_instances`组件是必须配套`minecraft:geometry`组件的**。但是我们这时候不希望引用特殊的方块模型该怎么办呢？这时候我们就可以使用官方为我们内置的模型了：

```json showLineNumbers title="blast_proof_glass.block.json" {13}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:blast_proof_glass",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {
            "minecraft:destructible_by_explosion": false,
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend" } },
            "minecraft:geometry": "minecraft:geometry.full_block"
        }
    }
}
```

`minecraft:geometry.full_block`是游戏内置的方块模型，代表一个完整方块。除了完整方块模型外，原版还支持一个`minecraft:geometry.cross`模型，类似于草、蒲公英等交叉贴图模型。关于原版的模型，读者可以查阅[原版使用的方块模型](/docs/docs/blocks/model#原版使用的方块模型)。

然而，**需要注意的是，原版模型并不是数据驱动模型，这意味着我们没有办法获取其模型的骨骼名**，因此有很多操作（比如我们后面会讲到的面剔除等）都会失效。因此，**事实上我们还是更推荐读者自创一个模型，难度不高，也更加可控**：

<treeview>

- <FileType type="folder" name="RP_test"/>：资源包
  - ……
  - <FileType type="folder" name="models"/>：模型
    - <FileType type="folder" name="blocks"/>：方块模型
      - <FileType type="file" name="test_slab_bottom.geo.json"/>：下半砖模型
      - <FileType type="file" name="test_slab_top.geo.json"/>：上半砖模型
      - <FileType type="file" name="full_block.geo.json"/>：完整方块模型

</treeview>

```json showLineNumbers title="blast_proof_glass.block.json" {13}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:blast_proof_glass",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {
            "minecraft:destructible_by_explosion": false,
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend" } },
            "minecraft:geometry": "geometry.full_block"
        }
    }
}
```

这样便大功告成了，我们来打开游戏实测一下效果！

![blast_proof_glass_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/blast_proof_glass_1.png)

嗯……看起来还是有所不同，显然相比于原版玻璃，内部的面全被渲染出来了！不是说有背面剔除吗，难道背面剔除失效了？事实上，如果我们只放一个玻璃的话，不难发现除了稍微暗点之外，背面剔除是在正常运行的：

![blast_proof_glass_2](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/blast_proof_glass_2.png)

也就是说，现在我们所见的所有的玻璃面都被认为是前面而不是背面。背面确实已经被剔除掉了，但我们期望的效果是内部的面也应该要剔除掉。这就涉及到我们之后要介绍的**方块面剔除（Block Culling）** 了。

### `alpha_test`：透明材质 远距剔除

现在让我们进一步深挖材质的奥秘。观察[`minecraft:material_instances`](/docs/docs/blocks/components#minecraftmaterial_instances)组件的文档，我们发现`alpha_test`应该是一种和`blend`很像的材质。

为了分清这两种材质有何区别，我们把刚定义的玻璃分成两个方块状态，对`test:render_method`方块状态为`alpha_test`的方块使用`alpha_test`材质：

```json showLineNumbers title="blast_proof_glass.block.json" {7-9,16-23}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:blast_proof_glass",
            "menu_category": { "category": "construction" },
            "states": {
                "test:render_method": [ "blend", "alpha_test" ]
            }
        },
        "components": {
            "minecraft:destructible_by_explosion": false,
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend" } },
            "minecraft:geometry": "geometry.full_block"
        },
        "permutations": [
            {
                "condition": "query.block_state('test:render_method') == 'alpha_test'",
                "components": {
                    "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "alpha_test" } }
                }
            }
        ]
    }
}
```

可以看到，对于`alpha_test`材质而言，背面剔除便不再生效。

![alpha_test_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/alpha_test_1.png)

在查阅过文档后，我们还会发现`alpha_test`存在**远距剔除（Distant Culling）**。所谓远距剔除，其实就是指**在距离过远时，是否还要渲染这个方块**。对于`alpha_test`材质，在距离过远时就不再渲染这个方块了，这可以通过望远镜来观察：

![alpha_test_2](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/alpha_test_2.png)

因为全透明需要消耗的性能大，在距离过远时就停止渲染，这也是理所当然的，这可以提升客户端的性能。

以及，全透明和半透明的最大区别在于，**全透明是不支持`A`通道的**，我们只要把贴图换成白色染色玻璃就能立刻看到这一点：

![alpha_test_3](/img/tutorials/a2_addons/b5_data_driven_blocks/c4_block_models/alpha_test_3.png)

可以看到，`blend`能够正确地渲染半透明的部分，而`alpha_test`就只能够将半透明的部分渲染为全透明。

在了解了透明度、背面剔除和远距剔除这些概念后，相信读者应当就可以理解文档中剩下的那几种材质的含义了。

## 变换组件

对于特定的方块，例如半砖、可旋转方块来说，事实上对于不同方块状态的方块，使用的模型是基本一致的，无非是经过了旋转、偏移处理而已。对于这种情况，我们就可以使用[`minecraft:transformation`](/docs/docs/blocks/components#minecrafttransformation)了。

我们来观察原来的泥土台阶定义：

```json showLineNumbers title="dirt_slab.block.json"
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:dirt_slab",
            "menu_category": { "category": "construction" },
            "states": {
                "test:vertical_half": [ "bottom", "top" ]
            }
        },
        "components": {
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.5 },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.5 },
            "minecraft:map_color": "#976D4D",
            "tag:dirt": {},
        },
        "permutations": [
            {
                "condition": "query.block_state('test:vertical_half') == 'bottom'",
                "components": {
                    "minecraft:collision_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                    "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                    "minecraft:geometry": "geometry.test_slab_bottom",
                    "minecraft:material_instances": {
                        "*": { "texture": "flattened_dirt" }
                    }
                }
            },
            {
                "condition": "query.block_state('test:vertical_half') == 'top'",
                "components": {
                    "minecraft:collision_box": { "origin": [ -8, 8, -8 ], "size": [ 16, 8, 16 ] },
                    "minecraft:selection_box": { "origin": [ -8, 8, -8 ], "size": [ 16, 8, 16 ] },
                    "minecraft:geometry": "geometry.test_slab_top",
                    "minecraft:material_instances": {
                        "*": { "texture": "flattened_dirt" }
                    }
                }
            }
        ]
    }
}
```

我们注意到，这里面有大量的重复定义：都在定义选择箱碰撞箱为半砖大小，都在定义模型使用半砖模型，都使用泥土贴图。但是，两个方块置换的关系其实无非就是一上一下的关系。只要我们可以将下半砖向上平移半格，不就变成上半砖了么？所以我们其实可以大幅简化上面这段代码为：

```json showLineNumbers title="dirt_slab.block.json" {16-21,24-29}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:dirt_slab",
            "menu_category": { "category": "construction" },
            "states": {
                "test:vertical_half": [ "bottom", "top" ]
            }
        },
        "components": {
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.5 },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.5 },
            "minecraft:map_color": "#976D4D",
            "tag:dirt": {},
            "minecraft:collision_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:geometry": "geometry.test_slab_bottom",
            "minecraft:material_instances": {
                "*": { "texture": "flattened_dirt" }
            }
        },
        "permutations": [
            {
                "condition": "query.block_state('test:vertical_half') == 'top'",
                "components": {
                    "minecraft:transformation": { "translation": [ 0, 0.5, 0 ] }
                }
            }
        ]
    }
}
```

我们来对这段代码做一点解释：

- 首先，我们将选择箱、碰撞箱、模型和材质贴图实例化都移动到了根组件上，这意味着无论什么情况，都会应用其中的数据。
- 然后，我们将判定`test:vertical_half`为`bottom`的方块置换直接删掉了——因为默认就是应用它的数据。
- 最后，我们检查到`test:vertical_half`为`top`时，就尝试把方块向上移动 0.5 格。

相比于之前的写法，可以看到我们直接避免了大量的重复定义。甚至连模型我们都可以进一步简化，把模型`geometry.test_slab_bottom`和`geometry.test_slab_top`合并为一个`geometry.slab`作为半砖模型便已足够！合并的步骤就交给读者自行完成。

对于这种**使用类似模型、选择箱碰撞箱等情况，我们就需要灵活使用[`minecraft:transformation`](/docs/docs/blocks/components#minecrafttransformation)组件，以避免重复定义**。

---

## 总结

本节，我们介绍了如何自定义一个方块的模型、贴图和材质。

模型通常使用 Blockbench 制作。都 2026 年了，手写模型早已成为非主流中的非主流。写好的模型可以导出为`xxx.geo.json`的格式，放在资源包的<FileType type="folder" name="models"/> - <FileType type="folder" name="blocks"/>文件夹中。通过[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件调用我们定义的模型，也可以用[原版自带的模型](/docs/docs/blocks/model#原版使用的方块模型)，但通常来说我们还是更推荐读者自建模型。

使用[`minecraft:material_instances`](/docs/docs/blocks/components#minecraftmaterial_instances)组件来把方块模型实例化，对方块使用特定的材质和贴图（*最后再强调一次！材质和贴图不是一个概念！*）。材质有透明（最常用的是`blend`和`alpha_test`）和不透明（`opaque`）之分。两种透明材质的表现有所不同，主要体现在全透明/半透明、背面剔除和远距剔除几方面。

最后，我们还介绍了[`minecraft:transformation`](/docs/docs/blocks/components#minecrafttransformation)组件，可以对方块进行平移、旋转、缩放等操作，适合类似于台阶、楼梯的方块。

## 练习
