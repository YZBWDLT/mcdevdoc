---
sidebar_position: 101
---

# 附录：如何制作玻璃楼梯

import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Image from "/src/components/image/standard"
import ImageMultiple from "/src/components/image/multiple"
import ImageGroup from "/src/components/image/group"

楼梯（Stairs）是一种不完整方块，并且会随着周边玻璃的连接状态而发生改变。这会大幅增加定义该方块的难度。本文基于[`minecraft:placement_direction`](/docs/docs/blocks/traits#minecraftplacement_direction)方块特征和[`minecraft:placement_position`](/docs/docs/blocks/traits#minecraftplacement_position)方块特征来制作楼梯。

## 无拐角版

相比于考虑拐角的状态，不考虑拐角的情况要简单得多。

### 楼梯模型的制作

我们现在要制作玻璃楼梯，考虑到不能让内部产生多余的贴图，必须要把楼梯分成三部分处理，也就是如下图的三部分：

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/no_corner_1.png" text="将楼梯模型分为 3 部分" size="75%"/>

注意，根据原版的默认方块状态，缺口是指向西方的。

和[制作玻璃板](./how_to_make_glass_pane)的过程类似，我们启用「面属性」，禁用这三个块的连接面，然后微调 UV 在贴图中的位置，得到下图所示的模型：

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/no_corner_2.png" text="微调玻璃贴图得到楼梯模型" size="75%"/>

### 行为包部分的定义 模型完善

我们现在来定义行为包部分，先不考虑方块特征，主要先来定义爆炸抗性、硬度、模型、材质实例和选择箱碰撞箱。

```json showLineNumbers title="glass_stairs.block.json"
{
    "format_version": "1.26.20",
    "minecraft:block": {
        "description": {
            "identifier": "test:glass_stairs",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.3 },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.3 },
            "minecraft:geometry": { "identifier": "geometry.stairs" },
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 } },
            "minecraft:collision_box": [
                { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] }
            ],
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 16, 16 ] }
        }
    }
}
```

现在我们进入游戏，会发现两个问题：

第一，现在在物品栏显示的模型是倒置的，这可以通过 bb 的显示调整解决。

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/no_corner_3.png" text="纠正楼梯在 GUI 中的显示效果" size="100%"/>

注意：**这必须使用`1.21.110`或更高格式版本的方块模型才可实现**！如果你现在正在使用中国版或更低版本，也可以通过复制该模型，并把方块模型整体翻转 180° 来解决问题。

<details>

<summary>该模型的 json 代码</summary>

有需要的读者也可直接取用，但我们还是建议读者自行尝试一次建模，尤其是初学者！

```json showLineNumbers title="glass_stairs.geo.json"
{
    "format_version": "1.21.110",
    "minecraft:geometry": [
        {
            "description": {
                "identifier": "geometry.stairs",
                "texture_width": 16,
                "texture_height": 16,
                "visible_bounds_width": 2,
                "visible_bounds_height": 2.5,
                "visible_bounds_offset": [0, 0.75, 0]
            },
            "bones": [
                {
                    "name": "block",
                    "pivot": [0, 0, 0]
                },
                {
                    "name": "bottom_1",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [0, 0, -8],
                            "size": [8, 8, 16],
                            "uv": {
                                "north": {"uv": [8, 8], "uv_size": [8, 8]},
                                "south": {"uv": [0, 8], "uv_size": [8, 8]},
                                "west": {"uv": [0, 8], "uv_size": [16, 8]},
                                "up": {"uv": [8, 16], "uv_size": [-8, -16]},
                                "down": {"uv": [8, 16], "uv_size": [-8, -16]}
                            }
                        }
                    ]
                },
                {
                    "name": "bottom_2",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-8, 0, -8],
                            "size": [8, 8, 16],
                            "uv": {
                                "north": {"uv": [0, 8], "uv_size": [8, 8]},
                                "east": {"uv": [0, 8], "uv_size": [16, 8]},
                                "south": {"uv": [8, 8], "uv_size": [8, 8]},
                                "down": {"uv": [16, 16], "uv_size": [-8, -16]}
                            }
                        }
                    ]
                },
                {
                    "name": "top",
                    "parent": "block",
                    "pivot": [-8, 8, 0],
                    "cubes": [
                        {
                            "origin": [-8, 8, -8],
                            "size": [8, 8, 16],
                            "uv": {
                                "north": {"uv": [0, 0], "uv_size": [8, 8]},
                                "east": {"uv": [0, 0], "uv_size": [16, 8]},
                                "south": {"uv": [8, 0], "uv_size": [8, 8]},
                                "west": {"uv": [0, 0], "uv_size": [16, 8]},
                                "up": {"uv": [16, 16], "uv_size": [-8, -16]}
                            }
                        }
                    ]
                }
            ],
            "item_display_transforms": {
                "gui": {
                    "rotation": [30, 135, 0],
                    "translation": [0, 0, 0],
                    "scale": [0.625, 0.625, 0.625],
                    "rotation_pivot": [0, 0, 0],
                    "scale_pivot": [0, 0, 0],
                    "fit_to_frame": false
                }
            }
        }
    ]
}
```

</details>

第二，楼梯没有应用旋转，倒置楼梯也没有效果。这时候我们就可以使用方块特征了。我们来使用[`minecraft:placement_direction`](/docs/docs/blocks/traits#minecraftplacement_direction)方块特征，启用`minecraft:cardinal_direction`方块状态，先确定玩家的旋转角度，这个过程和我们当初定义竖半砖的时候是类似的。

```json showLineNumbers title="glass_stairs.block.json" {9-13,26-39}
{
    "format_version": "1.26.20",
    "minecraft:block": {
        "description": {
            "identifier": "test:glass_stairs",
            "menu_category": {
                "category": "construction"
            },
            "traits": {
                "minecraft:placement_direction": {
                    "enabled_states": [ "minecraft:corner_and_cardinal_direction" ]
                }
            }
        },
        "components": {
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.3 },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.3 },
            "minecraft:geometry": { "identifier": "geometry.stairs" },
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 } },
            "minecraft:collision_box": [
                { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] }
            ],
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 16, 16 ] }
        },
        "permutations": [
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 90, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 180, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 270, 0 ] } }
            }
        ]
    }
}
```

在`/reload all`之后，我们可以发现我们的旋转值开始起到作用。

至于楼梯的倒置，我们则可以考虑使用[`minecraft:placement_position`](/docs/docs/blocks/traits#minecraftplacement_position)方块特征，启用`minecraft:vertical_half`方块状态，虽然这是给半砖专用的方块状态，但是没人规定楼梯我们就不能用它了。这只需要将 X 角度旋转 180° 即可。我们再额外给出 4 个方块置换：

```json showLineNumbers title="glass_stairs.block.json" {13-15,42-57}
{
    "format_version": "1.26.20",
    "minecraft:block": {
        "description": {
            "identifier": "test:glass_stairs",
            "menu_category": {
                "category": "construction"
            },
            "traits": {
                "minecraft:placement_direction": {
                    "enabled_states": [ "minecraft:corner_and_cardinal_direction" ]
                },
                "minecraft:placement_position": {
                    "enabled_states": [ "minecraft:vertical_half" ]
                }
            }
        },
        "components": {
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.3 },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.3 },
            "minecraft:geometry": { "identifier": "geometry.stairs" },
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 } },
            "minecraft:collision_box": [
                { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] }
            ],
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 16, 16 ] }
        },
        "permutations": [
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 90, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 180, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 270, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 0, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 90, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 180, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 270, 0 ] } }
            }
        ]
    }
}
```

这样，我们无拐角的楼梯就制作完成了！它可以应付一些简单的情况，比如地图内的固定装饰就可以使用它。

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/no_corner_4.png" text="游戏内实际效果"/>

## 有拐角版

现在让我们来考虑有拐角的情况，这个情况便要复杂得多了，最主要的问题是在模型上不好处理。

### 进一步处理模型

参考[`minecraft:placement_direction`](/docs/docs/blocks/traits#minecraftplacement_direction)方块特征，我们知道下一步我们要把`minecraft:cardinal_direction`方块状态「升级」为`minecraft:corner_and_cardinal_direction`方块状态，这里存在几个额外的值：`inner_left`、`inner_right`、`outer_left`、`outer_right`，分别对应 4 个楼梯方向。我们注意到这些方向都是对上半部分的楼梯模型骨骼进行操作。

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/corner_1.png" text="4 种方块状态的效果，白色为 inner_left，要在左下角缺口添加新骨骼；红色为 inner_right，要在右下角缺口添加新骨骼；绿色为 outer_left，只显示左上角骨骼；蓝色为 outer_right，只显示右上角骨骼" size="75%"/>

这样，我们就必须更改我们的模型，将`top`骨骼替换为`outer_left`和`outer_right`，然后缺口处新增`inner_left`和`inner_right`骨骼，调整 UV，使得贴图出现在应该出现的位置。

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/corner_2.png" text="添加 4 种新骨骼" size="75%"/>

现在我们先不考虑面剔除问题，来关注如何改进我们的方块定义。

- `inner_left`骨骼（或`inner_right`骨骼）只需在`inner_left`方块状态（或`inner_right`方块状态）下启用，其余情况应该禁用；
- `outer_left`骨骼（或`outer_right`骨骼）只需在`outer_right`方块状态（或`outer_left`方块状态）下禁用，其余情况应该启用；

这样我们就知道该什么时候启用什么骨骼了：

<details>

<summary>定义代码</summary>

```json showLineNumbers title="glass_stairs.block.json" {21-29}
{
    "format_version": "1.26.20",
    "minecraft:block": {
        "description": {
            "identifier": "test:glass_stairs",
            "menu_category": {
                "category": "construction"
            },
            "traits": {
                "minecraft:placement_direction": {
                    "enabled_states": [ "minecraft:corner_and_cardinal_direction" ]
                },
                "minecraft:placement_position": {
                    "enabled_states": [ "minecraft:vertical_half" ]
                }
            }
        },
        "components": {
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.3 },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.3 },
            "minecraft:geometry": {
                "identifier": "geometry.stairs",
                "bone_visibility": {
                    "inner_left": "q.block_state('minecraft:corner') == 'inner_left'",
                    "inner_right": "q.block_state('minecraft:corner') == 'inner_right'",
                    "outer_left": "q.block_state('minecraft:corner') != 'outer_right'",
                    "outer_right": "q.block_state('minecraft:corner') != 'outer_left'"
                }
            },
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 } },
            "minecraft:collision_box": [
                { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] }
            ],
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 16, 16 ] }
        },
        "permutations": [
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 90, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 180, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 270, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 0, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 90, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 180, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 270, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:corner') == 'inner_left'",
                "components": { "minecraft:material_instances": { "*": { "texture": "white_stained_glass", "render_method": "blend", "ambient_occlusion": 0.0 } } }
            },
            {
                "condition": "q.block_state('minecraft:corner') == 'inner_right'",
                "components": { "minecraft:material_instances": { "*": { "texture": "red_stained_glass", "render_method": "blend", "ambient_occlusion": 0.0 } } }
            },
            {
                "condition": "q.block_state('minecraft:corner') == 'outer_left'",
                "components": { "minecraft:material_instances": { "*": { "texture": "blue_stained_glass", "render_method": "blend", "ambient_occlusion": 0.0 } } }
            },
            {
                "condition": "q.block_state('minecraft:corner') == 'outer_right'",
                "components": { "minecraft:material_instances": { "*": { "texture": "green_stained_glass", "render_method": "blend", "ambient_occlusion": 0.0 } } }
            },
            {
                "condition": "q.block_state('minecraft:corner') == 'none'",
                "components": { "minecraft:material_instances": { "*": { "texture": "yellow_stained_glass", "render_method": "blend", "ambient_occlusion": 0.0 } } }
            }
        ]
    }
}
```

</details>

其中，66-85 行的代码是为了更好地显示不同方块状态的楼梯，读者可以无视。重新进入游戏，我们可以看到现在楼梯的模型可以正确地连接了：

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/corner_3.png" text="骨骼已被成功隐藏" size="75%"/>

现在还剩下两个问题有待解决：

1. 楼梯的碰撞箱仍然需要适配；
2. 楼梯模型的面剔除问题有待解决。

### 面剔除问题的解决思路

我们先来解决面剔除问题。和我们上一节的思路类似地，我们可以通过定义新骨骼外加隐藏面的方式来实现面剔除效果。例如，对于`inner_left`，我们有 3 个接触面要处理，也就是和`inner_right`、`outer_left`和`bottom`的接触面。这样，我们可以来定义 3 个新的骨骼：

1. 在`inner_left`骨骼里定义`inner_left_to_inner_right`骨骼，代表`inner_left`和`inner_right`的接触面。然后，复制原来`inner_left`的部件到`inner_left_to_inner_right`里。
2. 在`inner_left`骨骼里定义`inner_left_to_outer_left`骨骼，代表`inner_left`和`outer_left`的接触面。然后，复制原来`inner_left`的部件到`inner_left_to_inner_right`里。
3. 在`bottom_1`骨骼里定义`bottom_to_inner_left`骨骼，代表`inner_left`和`bottom`的接触面。这里不定义到`inner_left`骨骼，是考虑到之后要对`bottom_1`的面进行操作。然后，复制原来`bottom_1`的部件到`bottom_to_inner_left`里。

现在，你的模型结构应该如图所示：

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/corner_4.png" text="模型结构" size="30%"/>

我们来做面剔除工作。`inner_left`骨骼和`inner_right`在南方有接触；和`outer_left`在东方有接触、和`bottom_1`在底部有接触。这样：

1. 把`inner_left`骨骼的根部件在面属性中全部隐藏掉。
2. 把`inner_left_to_inner_right`骨骼的部件的南面启用，其余面全部禁用。
3. 把`inner_left_to_outer_left`骨骼的部件的东面启用，其余面全部禁用。
4. 调整`bottom_to_inner_left`部件的体积，使其和`inner_left`对齐，并调整顶部 UV，其余面全部禁用。
5. 最后，把`bottom_1`的根部件的顶面禁用。

最后，让我们理清这些新建的骨骼什么时候启用。

1. 对于`inner_left_to_inner_right`，只有处于`inner_left`方块状态时才启用。这个时候，`inner_right`骨骼不会启用，所以事实上，`inner_left_to_inner_right`是会在这个时候固定显示的。因此，事实上我们可以移除`inner_left_to_inner_right`骨骼了！然后，启用`inner_left`根部件的南方的面。
2. 同理地，处于`inner_left`方块状态时，`outer_left`骨骼是固定显示的，这时候`inner_left_to_outer_left`则固定不显示。因此，我们可以移除这个骨骼，东方的面我们也没必要再关注了。
3. 而对于`bottom_to_inner_left`，则在不处于`inner_left`方块状态时启用。

现在，你的模型结构应该如图所示，我们合计新增了一个骨骼`bottom_to_inner_left`：

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/corner_5.png" text="模型结构（处理完 inner_left）" size="75%"/>

并且，我们可以给出新增的那一个`bottom_to_inner_left`的显示时机：

```json showLineNumbers {8}
"minecraft:geometry": {
    "identifier": "geometry.stairs",
    "bone_visibility": {
        "inner_left": "q.block_state('minecraft:corner') == 'inner_left'",
        "inner_right": "q.block_state('minecraft:corner') == 'inner_right'",
        "outer_left": "q.block_state('minecraft:corner') != 'outer_right'",
        "outer_right": "q.block_state('minecraft:corner') != 'outer_left'",
        "bottom_to_inner_left": "q.block_state('minecraft:corner') != 'inner_left'"
    }
}
```

对于其他的面，也都可以通过这种推理的方法如法炮制。读者也可以通过隐藏或显示特定骨骼的方法，快速判断该启用哪些面，禁用哪些面。事实上，按照上面的思路，我们还可以将`bottom_1`和`bottom_2`合并为一个`bottom`，请读者自行思考应该怎么做。

到最后，我们可以定义剩下的骨骼，如下图所示：

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/corner_6.png" text="模型结构（完整版）" size="30%"/>

一共多了 8 个模型，我们需要分别定义：

```json showLineNumbers {8-15}
"minecraft:geometry": {
    "identifier": "geometry.stairs",
    "bone_visibility": {
        "inner_left": "q.block_state('minecraft:corner') == 'inner_left'",
        "inner_right": "q.block_state('minecraft:corner') == 'inner_right'",
        "outer_left": "q.block_state('minecraft:corner') != 'outer_right'",
        "outer_right": "q.block_state('minecraft:corner') != 'outer_left'",
        "bottom_to_inner_left": "q.block_state('minecraft:corner') != 'inner_left'",
        "bottom_to_inner_right": "q.block_state('minecraft:corner') != 'inner_right'",
        "bottom_to_outer_left": "q.block_state('minecraft:corner') == 'outer_right'",
        "bottom_to_outer_right": "q.block_state('minecraft:corner') == 'outer_left'",
        "outer_left_to_inner_left": "q.block_state('minecraft:corner') != 'inner_left' && q.block_state('minecraft:corner') != 'outer_right'",
        "outer_right_to_inner_right": "q.block_state('minecraft:corner') != 'inner_right' && q.block_state('minecraft:corner') != 'outer_left'",
        "outer_left_to_outer_right": "q.block_state('minecraft:corner') == 'outer_left'",
        "outer_right_to_outer_left": "q.block_state('minecraft:corner') == 'outer_right'"
    }
}
```

<details>

<summary>该模型的 json 代码</summary>

```json showLineNumbers title="stairs.geo.json"
{
    "format_version": "1.21.110",
    "minecraft:geometry": [
        {
            "description": {
                "identifier": "geometry.stairs",
                "texture_width": 16,
                "texture_height": 16,
                "visible_bounds_width": 3,
                "visible_bounds_height": 2.5,
                "visible_bounds_offset": [0, 0.75, 0]
            },
            "bones": [
                {
                    "name": "block",
                    "pivot": [0, 0, 0]
                },
                {
                    "name": "bottom",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-8, 0, -8],
                            "size": [16, 8, 16],
                            "uv": {
                                "north": {"uv": [0, 8], "uv_size": [16, 8]},
                                "east": {"uv": [0, 8], "uv_size": [16, 8]},
                                "south": {"uv": [0, 8], "uv_size": [16, 8]},
                                "west": {"uv": [0, 8], "uv_size": [16, 8]},
                                "down": {"uv": [16, 16], "uv_size": [-16, -16]}
                            }
                        }
                    ]
                },
                {
                    "name": "bottom_to_inner_left",
                    "parent": "bottom",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [0, 0, -8],
                            "size": [8, 8, 8],
                            "uv": {
                                "up": {"uv": [8, 8], "uv_size": [-8, -8]}
                            }
                        }
                    ]
                },
                {
                    "name": "bottom_to_inner_right",
                    "parent": "bottom",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [0, 0, 0],
                            "size": [8, 8, 8],
                            "uv": {
                                "up": {"uv": [8, 16], "uv_size": [-8, -8]}
                            }
                        }
                    ]
                },
                {
                    "name": "bottom_to_outer_left",
                    "parent": "bottom",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-8, 0, -8],
                            "size": [8, 8, 8],
                            "uv": {
                                "up": {"uv": [16, 8], "uv_size": [-8, -8]}
                            }
                        }
                    ]
                },
                {
                    "name": "bottom_to_outer_right",
                    "parent": "bottom",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-8, 0, 0],
                            "size": [8, 8, 8],
                            "uv": {
                                "up": {"uv": [16, 16], "uv_size": [-8, -8]}
                            }
                        }
                    ]
                },
                {
                    "name": "inner_left",
                    "parent": "block",
                    "pivot": [-8, 8, 0],
                    "cubes": [
                        {
                            "origin": [0, 8, -8],
                            "size": [8, 8, 8],
                            "uv": {
                                "north": {"uv": [8, 0], "uv_size": [8, 8]},
                                "south": {"uv": [0, 0], "uv_size": [8, 8]},
                                "west": {"uv": [0, 0], "uv_size": [8, 8]},
                                "up": {"uv": [8, 8], "uv_size": [-8, -8]}
                            }
                        }
                    ]
                },
                {
                    "name": "inner_right",
                    "parent": "block",
                    "pivot": [-8, 8, 0],
                    "cubes": [
                        {
                            "origin": [0, 8, 0],
                            "size": [8, 8, 8],
                            "uv": {
                                "north": {"uv": [8, 0], "uv_size": [8, 8]},
                                "south": {"uv": [0, 0], "uv_size": [8, 8]},
                                "west": {"uv": [8, 0], "uv_size": [8, 8]},
                                "up": {"uv": [8, 16], "uv_size": [-8, -8]}
                            }
                        }
                    ]
                },
                {
                    "name": "outer_left",
                    "parent": "block",
                    "pivot": [-8, 8, 0],
                    "cubes": [
                        {
                            "origin": [-8, 8, -8],
                            "size": [8, 8, 8],
                            "uv": {
                                "north": {"uv": [0, 0], "uv_size": [8, 8]},
                                "east": {"uv": [8, 0], "uv_size": [8, 8]},
                                "up": {"uv": [16, 8], "uv_size": [-8, -8]}
                            }
                        }
                    ]
                },
                {
                    "name": "outer_left_to_inner_left",
                    "parent": "outer_left",
                    "pivot": [-8, 8, 0],
                    "cubes": [
                        {
                            "origin": [-8, 8, -8],
                            "size": [8, 8, 8],
                            "uv": {
                                "west": {"uv": [0, 0], "uv_size": [8, 8]}
                            }
                        }
                    ]
                },
                {
                    "name": "outer_left_to_outer_right",
                    "parent": "outer_left",
                    "pivot": [0, 2, 0],
                    "cubes": [
                        {
                            "origin": [-8, 8, -8],
                            "size": [8, 8, 8],
                            "uv": {
                                "south": {"uv": [8, 0], "uv_size": [8, 8]}
                            }
                        }
                    ]
                },
                {
                    "name": "outer_right",
                    "parent": "block",
                    "pivot": [-8, 8, 8],
                    "cubes": [
                        {
                            "origin": [-8, 8, 0],
                            "size": [8, 8, 8],
                            "uv": {
                                "east": {"uv": [0, 0], "uv_size": [8, 8]},
                                "south": {"uv": [8, 0], "uv_size": [8, 8]},
                                "up": {"uv": [16, 16], "uv_size": [-8, -8]}
                            }
                        }
                    ]
                },
                {
                    "name": "outer_right_to_inner_right",
                    "parent": "outer_right",
                    "pivot": [-8, 8, 8],
                    "cubes": [
                        {
                            "origin": [-8, 8, 0],
                            "size": [8, 8, 8],
                            "uv": {
                                "west": {"uv": [8, 0], "uv_size": [8, 8]}
                            }
                        }
                    ]
                },
                {
                    "name": "outer_right_to_outer_left",
                    "parent": "outer_right",
                    "pivot": [-8, 8, 8],
                    "cubes": [
                        {
                            "origin": [-8, 8, 0],
                            "size": [8, 8, 8],
                            "uv": {
                                "north": {"uv": [0, 0], "uv_size": [8, 8]}
                            }
                        }
                    ]
                }
            ],
            "item_display_transforms": {
                "gui": {
                    "rotation": [30, 135, 0],
                    "translation": [0, 0, 0],
                    "scale": [0.625, 0.625, 0.625],
                    "rotation_pivot": [0, 0, 0],
                    "scale_pivot": [0, 0, 0],
                    "fit_to_frame": false
                }
            }
        }
    ]
}
```

</details>

### 剩余工作

最后，我们调试好碰撞箱，我们的玻璃楼梯就可以投入应用了！

<details>

<summary>添加碰撞箱后的定义代码</summary>

```json showLineNumbers title="glass_stairs.block.json" {74-111}
{
    "format_version": "1.26.20",
    "minecraft:block": {
        "description": {
            "identifier": "test:glass_stairs",
            "menu_category": {
                "category": "construction"
            },
            "traits": {
                "minecraft:placement_direction": {
                    "enabled_states": [ "minecraft:corner_and_cardinal_direction" ]
                },
                "minecraft:placement_position": {
                    "enabled_states": [ "minecraft:vertical_half" ]
                }
            }
        },
        "components": {
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.3 },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.3 },
            "minecraft:geometry": {
                "identifier": "geometry.stairs",
                "bone_visibility": {
                    "inner_left": "q.block_state('minecraft:corner') == 'inner_left'",
                    "inner_right": "q.block_state('minecraft:corner') == 'inner_right'",
                    "outer_left": "q.block_state('minecraft:corner') != 'outer_right'",
                    "outer_right": "q.block_state('minecraft:corner') != 'outer_left'",
                    "bottom_to_inner_left": "q.block_state('minecraft:corner') != 'inner_left'",
                    "bottom_to_inner_right": "q.block_state('minecraft:corner') != 'inner_right'",
                    "bottom_to_outer_left": "q.block_state('minecraft:corner') == 'outer_right'",
                    "bottom_to_outer_right": "q.block_state('minecraft:corner') == 'outer_left'",
                    "outer_left_to_inner_left": "q.block_state('minecraft:corner') != 'inner_left' && q.block_state('minecraft:corner') != 'outer_right'",
                    "outer_right_to_inner_right": "q.block_state('minecraft:corner') != 'inner_right' && q.block_state('minecraft:corner') != 'outer_left'",
                    "outer_left_to_outer_right": "q.block_state('minecraft:corner') == 'outer_left'",
                    "outer_right_to_outer_left": "q.block_state('minecraft:corner') == 'outer_right'"
                }
            },
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 } },
            "minecraft:collision_box": [
                { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] }
            ],
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 16, 16 ] }
        },
        "permutations": [
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 90, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 180, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 270, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 0, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 90, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 180, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 270, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:corner') == 'inner_left'",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                        { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] },
                        { "origin": [ 0, 8, -8 ], "size": [ 8, 8, 8 ] }
                    ]
                }
            },
            {
                "condition": "q.block_state('minecraft:corner') == 'inner_right'",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                        { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] },
                        { "origin": [ 0, 8, 0 ], "size": [ 8, 8, 8 ] }
                    ]
                }
            },
            {
                "condition": "q.block_state('minecraft:corner') == 'outer_left'",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                        { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 8 ] }
                    ]
                }
            },
            {
                "condition": "q.block_state('minecraft:corner') == 'outer_right'",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                        { "origin": [ -8, 8, 0 ], "size": [ 8, 8, 8 ] }
                    ]
                }
            }
        ]
    }
}
```

</details>

然而，到这里事情还没完！事实上如果我们尝试一下就会发现，对于倒置楼梯来说，`inner_left`会和`inner_right`完全颠倒；`outer_left`会和`outer_right`完全颠倒。因此，对于判断`minecraft:corner`的 Molang，需要更进一步的完善。最后，可以得到以下代码：

<details>

<summary>完整代码</summary>

```json showLineNumbers title="glass_stairs.block.json"
{
    "format_version": "1.26.20",
    "minecraft:block": {
        "description": {
            "identifier": "test:glass_stairs",
            "menu_category": {
                "category": "construction"
            },
            "traits": {
                "minecraft:placement_direction": {
                    "enabled_states": [ "minecraft:corner_and_cardinal_direction" ]
                },
                "minecraft:placement_position": {
                    "enabled_states": [ "minecraft:vertical_half" ]
                }
            }
        },
        "components": {
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.3 },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.3 },
            "minecraft:geometry": {
                "identifier": "geometry.stairs",
                "bone_visibility": {
                    "inner_left": "false",
                    "inner_right": "false",
                    "bottom_to_outer_left": "false",
                    "bottom_to_outer_right": "false",
                    "outer_left_to_outer_right": "false",
                    "outer_right_to_outer_left": "false"
                }
            },
            "minecraft:material_instances": { "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 } },
            "minecraft:collision_box": [
                { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] }
            ],
            "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 16, 16 ] }
        },
        "permutations": [
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 90, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 180, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
                "components": { "minecraft:transformation": { "rotation": [ 0, 270, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 0, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 90, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 180, 0 ] } }
            },
            {
                "condition": "q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('minecraft:vertical_half') == 'top'",
                "components": { "minecraft:transformation": { "rotation": [ 180, 270, 0 ] } }
            },
            {
                "condition": "(q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:corner') == 'inner_left') || (q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:corner') == 'inner_right')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                        { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] },
                        { "origin": [ 0, 8, -8 ], "size": [ 8, 8, 8 ] }
                    ],
                    "minecraft:geometry": {
                        "identifier": "geometry.stairs",
                        "bone_visibility": {
                            "inner_right": "false",
                            "bottom_to_inner_left": "false",
                            "bottom_to_outer_left": "false",
                            "bottom_to_outer_right": "false",
                            "outer_right_to_inner_right": "false",
                            "outer_left_to_outer_right": "false",
                            "outer_right_to_outer_left": "false"
                        }
                    }
                }
            },
            {
                "condition": "(q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:corner') == 'inner_right') || (q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:corner') == 'inner_left')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                        { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 16 ] },
                        { "origin": [ 0, 8, 0 ], "size": [ 8, 8, 8 ] }
                    ],
                    "minecraft:geometry": {
                        "identifier": "geometry.stairs",
                        "bone_visibility": {
                            "inner_left": "false",
                            "bottom_to_inner_right": "false",
                            "bottom_to_outer_left": "false",
                            "bottom_to_outer_right": "false",
                            "outer_right_to_inner_right": "false",
                            "outer_left_to_outer_right": "false",
                            "outer_right_to_outer_left": "false"
                        }
                    }
                }
            },
            {
                "condition": "(q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:corner') == 'outer_left') || (q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:corner') == 'outer_right')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                        { "origin": [ -8, 8, -8 ], "size": [ 8, 8, 8 ] }
                    ],
                    "minecraft:geometry": {
                        "identifier": "geometry.stairs",
                        "bone_visibility": {
                            "inner_left": "false",
                            "inner_right": "false",
                            "outer_right": "false",
                            "bottom_to_outer_left": "false",
                            "outer_right_to_inner_right": "false",
                            "outer_right_to_outer_left": "false"
                        }
                    }
                }
            },
            {
                "condition": "(q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:corner') == 'outer_right') || (q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:corner') == 'outer_left')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -8 ], "size": [ 16, 8, 16 ] },
                        { "origin": [ -8, 8, 0 ], "size": [ 8, 8, 8 ] }
                    ],
                    "minecraft:geometry": {
                        "identifier": "geometry.stairs",
                        "bone_visibility": {
                            "inner_left": "false",
                            "inner_right": "false",
                            "outer_left": "false",
                            "bottom_to_outer_right": "false",
                            "outer_left_to_inner_left": "false",
                            "outer_left_to_outer_right": "false"
                        }
                    }
                }
            }
        ]
    }
}
```

</details>

## 已知问题

通过这种方法制作的楼梯可能存在的问题有：

1. 目前为止仍然不支持复合选择箱，因此在玩家事实上并没有面向楼梯时，仍然会导致选中楼梯。~*笑点：网易的`netease:aabb`组件早几年前就已经实现复合碰撞箱和复合选择箱了。*~  
   <Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/issue_1.png" text="即使没有面向楼梯，仍然会选中这个楼梯"/>
2. 我们定义的楼梯和原版楼梯不能形成拐角。
3. 我们定义的楼梯的 UV 会随着方块置换的旋转组件而旋转。这个问题或许可以通过优化模型解决，但不能通过`minecraft:geometry`的`uv_lock`参数解决。
   <Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs/corner_7.png" text="UV 会随着方块置换的旋转组件而旋转"/>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
