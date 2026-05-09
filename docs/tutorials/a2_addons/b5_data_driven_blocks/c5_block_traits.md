---
sidebar_position: 5
---

# 5.5 方块特征

在上几节，我们已经了解了如何定义新的方块、如何通过方块状态和方块置换指定不同的方块特性、以及如何定义不完整方块和透明方块。但是，我们也看到为了放置特定的方块状态的方块，确实有诸多的不便。所幸，微软和 Mojang 已经考虑到这一点，并给我们**提供了一些原版可用的方块状态，并附带特定的方块功能，这就是方块特征（Block Traits）**。

例如，对于半砖来说，我们知道它们都是共享一个方块状态`minecraft:vertical_half`的（这也是为什么我们上一节把半砖的方块状态定义为`test:vertical_half`）。那么，使用方块特征之后，游戏引擎会试图获取玩家放置该方块的位置，并自动确定`minecraft:vertical_half`的值，这就不需要我们再进一步获取玩家放置该方块的位置了。因此，使用方块特征会大幅简化我们的工作量！

目前来说，原版提供的方块特征称不上多，都在我们提供的[方块特征的清单里](/docs/docs/blocks/traits)，读者可以查阅一下，了解都有什么功能后，再继续阅读教程。

**定义方块特征的方法和方块状态类似，都是在方块描述里定义的**:

```json showLineNumbers title="dirt_slab.block.json" {7-11,25}
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:dirt_slab",
            "menu_category": { "category": "construction" },
            "traits": {
                "minecraft:placement_position": {
                    "enabled_states": [ "minecraft:vertical_half" ]
                }
            }
        },
        "components": {
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.5 },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.5 },
            "minecraft:map_color": "#976D4D",
            "tag:dirt": {},
            "minecraft:collision_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
            "minecraft:geometry": "geometry.slab",
            "minecraft:material_instances": { "*": { "texture": "flattened_dirt" } }
        },
        "permutations": [
            {
                "condition": "query.block_state('minecraft:vertical_half') == 'top'",
                "components": {
                    "minecraft:transformation": { "translation": [ 0, 0.5, 0 ] }
                }
            }
        ]
    }
}
```

其中，我们高亮的第 7-11 行和第 25 行的代码就是我们相比以前更改的内容。我们来做一些简单的解释：

- 在第 7-11 行，我们移除掉了以前定义的`test:vertical_half`，取而代之的是[`minecraft:placement_position`方块特征](/docs/docs/blocks/traits#minecraftplacement_position)的定义。根据文档，我们启用它的`minecraft:vertical_half`方块状态，这样游戏就会自动追踪玩家放置在其他方块的什么位置上，并自动确定`minecraft:vertical_half`状态的值，就像原版的台阶一样。
- 而在第 25 行，我们则是将以前判断方块状态`test:vertical_half`的代码无缝替换为了`minecraft:vertical_half`。

现在我们再进入游戏试一下，会发现除了不能合成双台阶形态外，我们定义的泥土台阶已经能够工作地很好了！至于如何把台阶变为双台阶……这就是我们的脚本要完成的任务了！

![dirt_slab_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c5_block_traits/dirt_slab_1.png)

---

## 总结

是的，这节就只有这点东西了。不骗你！不过，这节的内容虽然简单，却很重要。我们后面的练习要求读者不光要掌握`minecraft:placement_position`方块特征！

快速总结，方块特征（Block Traits）可以用来启用原版的方块状态和方块功能，是在方块描述里定义的。我们可以追踪方块对应的方块状态采用不同的方块置换。具体写法读者可见[方块特征文档](/docs/docs/blocks/traits)。

## 练习

:::info[练习 5.4]

别看这节内容简单，题目可不一定简单哦！你做好心理准备了吗？

1. 将我们上一节练习做的竖半砖“方块特征”化。
2. 将我们上一节练习做的玻璃台阶“方块特征”化。
3. 基于[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件的`bone_visibility`参数，试定义一种防爆玻璃板！
4. 定义一种玻璃楼梯。~*对，字越少事越大！*~

版本适用性警告：其中第 3 题和第 4 题可能需要更高版本的组件或特征，但这些功能在中国版均存在平替，读者若需要中国版的相关功能可按需查阅。

:::

<details>

<summary>练习题答案</summary>

1. ```json title="BP_test/blocks/test/oak_vertical_slab.block.json 行为包定义" showLineNumbers {7-11,25-27}
    {
        "format_version": "1.21.90",
        "minecraft:block": {
            "description": {
                "identifier": "test:oak_vertical_slab",
                "menu_category": { "category": "construction" },
                "traits": {
                    "minecraft:placement_direction": {
                        "enabled_states": [ "minecraft:cardinal_direction" ]
                    }
                }
            },
            "components": {
                "minecraft:collision_box": { "origin": [ -8, 0, -8 ], "size": [ 8, 16, 16 ] },
                "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 8, 16, 16 ] },
                "minecraft:geometry": "geometry.vertical_slab",
                "minecraft:material_instances": { "*": { "texture": "oak_planks" } },
                "minecraft:map_color": "#8F7748",
                "minecraft:destructible_by_mining": { "seconds_to_destroy": 2 },
                "minecraft:destructible_by_explosion": { "explosion_resistance": 3 },
                "tag:minecraft:is_axe_item_destructible": {},
                "tag:wood": {}
            },
            "permutations": [
                { "condition": "q.block_state('minecraft:cardinal_direction') == 'north'", "components": { "minecraft:transformation": { "rotation": [ 0, 90, 0 ] } } },
                { "condition": "q.block_state('minecraft:cardinal_direction') == 'west'", "components": { "minecraft:transformation": { "rotation": [ 0, 180, 0 ] } } },
                { "condition": "q.block_state('minecraft:cardinal_direction') == 'south'", "components": { "minecraft:transformation": { "rotation": [ 0, 270, 0 ] } } }
            ]
        }
    }
    ```

2. ```json title="BP_test/blocks/test/glass_slab.block.json 行为包定义" showLineNumbers {7-9,24}
    {
        "format_version": "1.21.90",
        "minecraft:block": {
            "description": {
                "identifier": "test:glass_slab",
                "menu_category": { "category": "construction" },
                "traits": {
                    "minecraft:placement_position": { "enabled_states": [ "minecraft:vertical_half" ] }
                }
            },
            "components": {
                "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.3 },
                "minecraft:destructible_by_explosion": { "explosion_resistance": 0.3 },
                "minecraft:collision_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                "minecraft:geometry": "geometry.slab",
                "minecraft:material_instances": {
                    "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 },
                    "side": { "texture": "glass_slab_side", "render_method": "blend", "ambient_occlusion": 0.0 }
                }
            },
            "permutations": [
                {
                    "condition": "query.block_state('minecraft:vertical_half') == 'top'",
                    "components": { "minecraft:transformation": { "translation": [ 0, 0.5, 0 ] } }
                }
            ]
        }
    }
    ```

</details>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
