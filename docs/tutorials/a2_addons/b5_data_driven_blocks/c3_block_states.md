---
sidebar_position: 3
---

# 5.3 方块状态与方块置换

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

在上一节，我们已经介绍过基础的方块定义，但是显然，只有这点内容是不够的。在学习过模块 1 之后我们知道，不少的方块都具有方块状态。那么我们能不能自定义我们的方块的状态呢？答案是：当然可以！

上一节的练习中，我们定义了一个黑色方块和一个黑色发光方块，这一节我们来合并这两个方块，并自定义一个发光的方块状态！

## 方块状态的定义

例如，现在先确定我们的需求：我们希望添加一个方块状态，并且包含两个值，这两个值应该是布尔值：`true`代表方块发光，`false`代表方块不发光。这**需要我们在行为包定义的描述<DataType type="object" name="description" isRequired/>中用<DataType type="object" name="states"/>来定义方块状态**。我们可以写为

```json showLineNumbers title="black_block.block.json" {9-11}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:black_block",
            "menu_category": {
                "category": "construction"
            },
            "states": {
                "test:is_lit": [false, true]
            }
        },
        "components": {
            "tag:test:colorful_block": {}
        }
    }
}
```

这个定义方法很简单吧？仔细观察第 10 行，我们定义了方块具有`test:is_lit`状态，代表方块是否发光。需要注意的是，定义方块状态也是需要命名空间的。并且，我们为这个方块状态指定了一个数组，代表方块的所有可能状态。其中，**第一个值就是默认值**，这里我们将默认值设为了`false`，也就是说在我们不指定的情况下，黑色方块是默认不发光的。

除了可以指定为布尔值之外，**方块状态中的值还可以指定为字符串或整数**。相关的例子在原版中也非常多，这里便不再一一列举了。**每个方块状态都允许至多 16 个值**。

## 方块置换：方块功能的所有枚举

现在我们定义了方块状态，但现在还不够。怎么样才能让方块在具有特定方块的情况下应用特定的功能呢？这就需要引入**方块置换（Block Permutation）** 的概念了。

方块置换**决定方块在何种状态下使用何种功能，包括其外观和行为表现**。例如，我们知道按钮具有两个方块状态：`button_pressed_bit`和`facing_direction`，其中：

- `button_pressed_bit`改变了方块的「红石电源」这个特性，这里，2 种不同特性的方块就对应 2 种方块置换。
- `facing_direction`则改变了方块的「模型」、「碰撞箱」和「选择箱」这几个特性，这里，6 种不同特性的方块也对应 6 种方块置换。

对于我们现在的例子来说，我们可以引入两个方块置换，一个是「发光」，另一个则是「不发光」。这需要我们在方块定义使用<DataType type="array" name="permutations"/>来解决问题。我们继续编写代码：

```json showLineNumbers title="black_block.block.json" {16-29}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:black_block",
            "menu_category": {
                "category": "construction"
            },
            "states": {
                "test:is_lit": [false, true]
            }
        },
        "components": {
            "tag:test:colorful_block": {}
        },
        "permutations": [
            {
                "condition": "query.block_state('test:is_lit') == true",
                "components": {
                    "minecraft:light_emission": 15
                }
            },
            {
                "condition": "query.block_state('test:is_lit') == false",
                "components": {
                    "minecraft:light_emission": 0
                }
            }
        ]
    }
}
```

现在我们加入了很多东西，所以有必要做一点说明。

我们首先在<DataType type="object" name="minecraft:block" isRequired/>下加入了一个<DataType type="array" name="permutations"/>。注意到这是一个数组，因为我们的方块置换肯定是不止一个的，自然要存到数组里。

在这个方块置换的数组中，我们引入了两个方块置换，注意到它们都具有两个参数：<DataType type="string" name="condition"/>和<DataType type="object" name="components"/>。其中：

- <DataType type="string" name="condition"/>是一个 Molang，决定何种情况下使用该方块置换。Molang 的相关知识在上一节我们有简单提过，这里便不再赘述。我们通常使用`query.block_state()`来查询方块状态作为条件。
- <DataType type="object" name="components"/>是一群组件，代表使用这个方块置换时使用哪些组件（即哪些功能）。

在这里，我们就规定了，当`query.block_state('test:is_lit')`为`true`时（这里，`==`是判断二者相等的）就使用发光等级为 15 的组件，而`query.block_state('test:is_lit')`为`false`时就使用发光等级为 0 的组件。这段代码还是很好懂的吧？

而事实上，我们对于布尔值的判断通常都不会写为`xxx == true`或`xxx == false`的形式，而更多地直接写为`xxx`或`!xxx`（这里的`!`代表取非，也就是对这个布尔值取非，`!true`就是`false`，`!false`就是`true`，这在多个编程语言都是适用的）直接进行判断。这样，我们的代码就可以写为

```json showLineNumbers title="black_block.block.json" {18,24}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:black_block",
            "menu_category": {
                "category": "construction"
            },
            "states": {
                "test:is_lit": [false, true]
            }
        },
        "components": {
            "tag:test:colorful_block": {}
        },
        "permutations": [
            {
                "condition": "query.block_state('test:is_lit')",
                "components": {
                    "minecraft:light_emission": 15
                }
            },
            {
                "condition": "!query.block_state('test:is_lit')",
                "components": {
                    "minecraft:light_emission": 0
                }
            }
        ]
    }
}
```

现在让我们进入游戏实操一波吧！目前，我们暂时还没有办法自主地控制何时放置特定状态的方块，只能用`/setblock`命令了。在未来，我们在学习了脚本系统之后，就可以灵活地控制在发生何事件时使用特定的方块状态，比如和方块交互后切换方块状态！

![block_permutation_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c3_block_states/block_permutation_1.png)

![block_permutation_2](/img/tutorials/a2_addons/b5_data_driven_blocks/c3_block_states/block_permutation_2.png)

看，现在我们之前的定义黑色方块也可以正确发光了！

---

## 总结

我们可以为我们自己定义的方块添加方块状态。**基于不同的方块状态可以延伸出方块不同的特性，采用不同的组件，叫做方块置换（Block Permutation）**。在未来的几节甚至脚本的学习中，我们还会多次和方块置换打交道。

**使用方块状态和方块置换，可以灵活地在一个方块 ID 下展现出不同的方块特性**。

有关方块状态和方块置换的更具体的信息，请查阅[数据驱动方块](/docs/docs/blocks/description#行为包定义格式)及相关文档。

## 练习

:::info[练习 5.2]

从本节开始，我们也将逐步认识到方块的定义格式和物品略有不同。物品是标准的「格式版本 - 描述 - 组件」三段式定义，而我们可以看到方块在描述部分额外支持方块状态，在组件部分也额外支持方块置换了。

1. 试基于练习 5.1 的光滑方块，进一步写出一个 10 档切换的摩擦力方块`test:friction_block`，摩擦因数分别为`0.0`，`0.1`，`0.2`，...，`0.9`，对应方块状态`test:friction_mode`分别为`0`，`1`，`2`，...，`9`。
2. 定义一个新的方块假石头`test:fake_stone`，在默认状态下拥有石头的贴图、石头的音效和正常的碰撞箱，但当`test:block_player`方块状态为`false`时，玩家可以穿过该方块。
3. 定义一个新的方块自定义红石源`test:custom_redstone_power`，分别在`test:power`方块状态为`0`，`1`，...，`15`时输出`0`，`1`，...，`15`红石信号。

:::

<details>

<summary>练习题答案</summary>

在下面的练习题答案中，仅第 1 个问题我们会给出详细的行为包和资源包的定义，其他问题非必要情况下我们会省略资源包的定义。**在读者添加新的贴图的时候，请注意大退重进以应用更改**。

1. ```json title="BP_test/blocks/test/friction_block.block.json 行为包定义" showLineNumbers
    {
        "format_version": "1.21.90",
        "minecraft:block": {
            "description": {
                "identifier": "test:friction_block",
                "menu_category": { "category": "construction" },
                "states": { "test:friction_mode": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }
            },
            "components": {},
            "permutations": [
                { "condition": "query.block_state('test:friction_mode') == 0", "components": { "minecraft:friction": 0.0 } },
                { "condition": "query.block_state('test:friction_mode') == 1", "components": { "minecraft:friction": 0.1 } },
                { "condition": "query.block_state('test:friction_mode') == 2", "components": { "minecraft:friction": 0.2 } },
                { "condition": "query.block_state('test:friction_mode') == 3", "components": { "minecraft:friction": 0.3 } },
                { "condition": "query.block_state('test:friction_mode') == 4", "components": { "minecraft:friction": 0.4 } },
                { "condition": "query.block_state('test:friction_mode') == 5", "components": { "minecraft:friction": 0.5 } },
                { "condition": "query.block_state('test:friction_mode') == 6", "components": { "minecraft:friction": 0.6 } },
                { "condition": "query.block_state('test:friction_mode') == 7", "components": { "minecraft:friction": 0.7 } },
                { "condition": "query.block_state('test:friction_mode') == 8", "components": { "minecraft:friction": 0.8 } },
                { "condition": "query.block_state('test:friction_mode') == 9", "components": { "minecraft:friction": 0.9 } }
            ]
        }
    }
    ```

    读者可以发现，对于摩擦因数小于 0.4 的方块，会表现得更加光滑，但最终会在无动力后导致实体停止。而对于摩擦因数大于 0.4 的方块，则越容易导致实体停止运动。

    ![practice_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c3_block_states/practice_1.png)

    然而，读者若做进一步实验会发现，更大摩擦因数的方块反而会导致玩家的移速变的非常的快。很有趣，不是吗？

2. ```json title="BP_test/blocks/test/fake_stone.block.json 行为包定义" showLineNumbers
    {
        "format_version": "1.21.90",
        "minecraft:block": {
            "description": {
                "identifier": "test:fake_stone",
                "menu_category": { "category": "construction" },
                "states": { "test:block_player": [true, false] }
            },
            "components": {},
            "permutations": [
                { "condition": "!query.block_state('test:block_player')", "components": { "minecraft:collision_box": false } }
            ]
        }
    }
    ```

    这时候，如果读者在`blocks.json`使用`stone`贴图，会发现使用`false`方块状态时，方块使用了花岗岩的贴图：

    ![practice_2](/img/tutorials/a2_addons/b5_data_driven_blocks/c3_block_states/practice_2.png)

    这事实上是 Minecraft 远古代码的“*史山*”导致的。我们可以观察`stone`贴图的定义：

    ```json title="terrain_texture.json 原版方块贴图定义" showLineNumbers
    {
        ...,
        "stone": {
            "textures": [
                "textures/blocks/stone",
                "textures/blocks/stone_granite",
                "textures/blocks/stone_granite_smooth",
                "textures/blocks/stone_diorite",
                "textures/blocks/stone_diorite_smooth",
                "textures/blocks/stone_andesite",
                "textures/blocks/stone_andesite_smooth"
            ]
        },
        ...
    }
    ```

    我们看到，这里应该是方块使用了第二个方块状态导致的。因此，我们建议这时可以定义一个新的`test_stone`贴图，以防止这种贴图混用的情况发生。**我们也同样并不太建议使用原版这种数组写法——因为这是历史遗留问题了，使用这种写法，使不同方块状态的方块使用不同的贴图的方法并不太可控**。我们后续会介绍如何利用`minecraft:geometry`和`minecraft:material_instances`组件使不同方块置换使用不同的方块贴图。

3. ```json title="BP_test/blocks/test/custom_redstone_power.block.json 行为包定义" showLineNumbers
    {
        "format_version": "1.21.120",
        "minecraft:block": {
            "description": {
                "identifier": "test:custom_redstone_power",
                "menu_category": { "category": "construction" },
                "states": { "test:power": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
            },
            "components": {
                "minecraft:redstone_producer": { "power": 0 }
            },
            "permutations": [
                { "condition": "query.block_state('test:power') == 1", "components": { "minecraft:redstone_producer": { "power": 1 } } },
                { "condition": "query.block_state('test:power') == 2", "components": { "minecraft:redstone_producer": { "power": 2 } } },
                { "condition": "query.block_state('test:power') == 3", "components": { "minecraft:redstone_producer": { "power": 3 } } },
                { "condition": "query.block_state('test:power') == 4", "components": { "minecraft:redstone_producer": { "power": 4 } } },
                { "condition": "query.block_state('test:power') == 5", "components": { "minecraft:redstone_producer": { "power": 5 } } },
                { "condition": "query.block_state('test:power') == 6", "components": { "minecraft:redstone_producer": { "power": 6 } } },
                { "condition": "query.block_state('test:power') == 7", "components": { "minecraft:redstone_producer": { "power": 7 } } },
                { "condition": "query.block_state('test:power') == 8", "components": { "minecraft:redstone_producer": { "power": 8 } } },
                { "condition": "query.block_state('test:power') == 9", "components": { "minecraft:redstone_producer": { "power": 9 } } },
                { "condition": "query.block_state('test:power') == 10", "components": { "minecraft:redstone_producer": { "power": 10 } } },
                { "condition": "query.block_state('test:power') == 11", "components": { "minecraft:redstone_producer": { "power": 11 } } },
                { "condition": "query.block_state('test:power') == 12", "components": { "minecraft:redstone_producer": { "power": 12 } } },
                { "condition": "query.block_state('test:power') == 13", "components": { "minecraft:redstone_producer": { "power": 13 } } },
                { "condition": "query.block_state('test:power') == 14", "components": { "minecraft:redstone_producer": { "power": 14 } } },
                { "condition": "query.block_state('test:power') == 15", "components": { "minecraft:redstone_producer": { "power": 15 } } }
            ]
        }
    }
    ```

    ![practice_3](/img/tutorials/a2_addons/b5_data_driven_blocks/c3_block_states/practice_3.png)

    *备注：截止本文截稿时，网易的基础游戏版本为 1.21.90，这意味着网易目前不能使用[`minecraft:redstone_producer`](/docs/docs/blocks/components#minecraftredstone_producer)组件，读者在使用此组件时应当注意游戏版本。然而，读者可以使用[`netease:redstone`](/docs/docs/blocks/components#neteaseredstone)组件代替。*

</details>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
