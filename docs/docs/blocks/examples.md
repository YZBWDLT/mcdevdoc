---
sidebar_position: 9
---

# 常见的方块实例

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Image from "/src/components/image/standard"
import Highlight from '/src/components/highlight/standard';

> 适用版本：国际版 26.20，中国版 3.8（1.21.90）。

本文给出一些常见的方块实例。

---

## 楼梯（不考虑拐角）

<Highlight text="教程" url="/docs/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs" />

**难度**：★★★☆☆

楼梯（不考虑拐角）是一种复杂的复合碰撞箱的方块，需要定义一个相对复杂的模型。考虑到楼梯存在 4 个方向，并且有倒置状态，因此楼梯必须使用至少 7 个方块置换才能将其完全定义。

:::warning[版本适用性警告]

要使用以下方块实例，必须使用`1.26.0`或更高版本的格式版本。这会导致中国版无法运行。必须使用更高格式版本的理由为：

- 需要使用[`minecraft:collision_box`](./components#minecraftcollision_box)组件的数组型，使用复合碰撞箱以还原楼梯的碰撞行为，格式版本需求为`1.26.0`。中国版存在对应组件的平替，读者可使用[`neteaase:aabb`](./components#neteaseaabb)组件代替。
- 需要使用[`item_display_transforms`](./model#方块模型文件格式)方块模型以在物品栏中和原版楼梯面向方向对应，格式版本需求为`1.21.110`。读者可定义一个旋转了 180° 的模型后使用[`minecraft:item_visual`](./components#minecraftitem_visual)组件显示以代替。

:::

<details>

<summary>方块行为包定义</summary>

```json showLineNumbers title="BP/blocks/test/glass_stairs.block.json"
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
                    "enabled_states": [ "minecraft:cardinal_direction" ]
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

</details>

<details>

<summary>方块模型</summary>

```json showLineNumbers title="RP/models/blocks/glass_stairs.geo.json"
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

---

## 楼梯（考虑拐角）

<Highlight text="教程" url="/docs/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_stairs" />

**难度**：★★★★☆

楼梯（不考虑拐角）是一种复杂的复合碰撞箱的方块，且会和相邻的楼梯形成拐角，需要定义一个非常复杂的模型。考虑到楼梯存在 4 个方向，有倒置状态和拐角状态，因此楼梯必须使用至少 11 个方块置换才能将其完全定义。

:::warning[注意]

数据驱动的楼梯的选择箱和原版不相同，和原版楼梯不能形成拐角，且 UV 会随着方块置换的旋转组件而旋转。详见我们提供的教程。

:::

:::warning[版本适用性警告]

要使用以下方块实例，必须使用`1.26.0`或更高版本的格式版本。这会导致中国版无法运行。必须使用更高格式版本的理由为：

- 需要使用[`minecraft:collision_box`](./components#minecraftcollision_box)组件的数组型，使用复合碰撞箱以还原楼梯的碰撞行为，格式版本需求为`1.26.0`。中国版存在对应组件的平替，读者可使用[`neteaase:aabb`](./components#neteaseaabb)组件代替。
- 需要使用[`item_display_transforms`](./model#方块模型文件格式)方块模型以在物品栏中和原版楼梯面向方向对应，格式版本需求为`1.21.110`。读者可定义一个旋转了 180° 的模型后使用[`minecraft:item_visual`](./components#minecraftitem_visual)组件显示以代替。

:::

<details>

<summary>方块行为包定义</summary>

```json showLineNumbers title="BP/blocks/test/glass_stairs.block.json"
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

<details>

<summary>方块模型</summary>

```json showLineNumbers title="RP/models/blocks/glass_stairs.geo.json"
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

---

## 玻璃板

<Highlight text="教程" url="/docs/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane" />

**难度**：★★★★☆

玻璃板是一种非常复杂的透明可连接方块，需要定义一个相对复杂的模型。考虑到玻璃板一共存在 16 种连接状态，因此玻璃板必须使用至少 15 个方块置换才能将其完全定义。

:::warning[注意]

数据驱动的玻璃板和原版的玻璃板、墙、栅栏无法形成很好的连接，并且不会产生原版方块一样的靠近贴图淡化效果。详见我们提供的教程。

:::

:::warning[版本适用性警告]

要使用以下方块实例，必须使用`1.26.0`或更高版本的格式版本。这会导致中国版无法运行。必须使用更高格式版本的理由为：

- 需要使用[`minecraft:collision_box`](./components#minecraftcollision_box)组件的数组型，使用复合碰撞箱以还原玻璃板在连接多方向时的碰撞行为，格式版本需求为`1.26.0`。中国版存在对应组件的平替，读者可使用[`neteaase:aabb`](./components#neteaseaabb)组件代替。
- 需要使用[`minecraft:connection`](./traits#minecraftconnection)方块特征以使用正确的连接行为，格式版本需求为`1.26.0`。中国版存在对应组件的平替，读者可使用[`netease:connection`](./components#neteaseconnection)组件代替。

:::

<details>

<summary>方块行为包定义</summary>

可替换 38-39 行的贴图为其他颜色玻璃板的贴图，以切换为其他颜色的玻璃板。

```json showLineNumbers title="BP/blocks/test/glass_pane.block.json" {38-39}
{
    "format_version": "1.26.0",
    "minecraft:block": {
        "description": {
            "identifier": "test:blast_proof_glass_pane",
            "menu_category": {
                "category": "construction"
            },
            "traits": {
                "minecraft:connection": {
                    "enabled_states": [ "minecraft:cardinal_connections" ]
                }
            }
        },
        "components": {
            "minecraft:collision_box": { "origin": [ -1, 0, -1 ], "size": [ 2, 16, 2 ] },
            "minecraft:selection_box": { "origin": [ -1, 0, -1 ], "size": [ 2, 16, 2 ] },
            "minecraft:destructible_by_explosion": { "explosion_resistance": 0.3 },
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.3 },
            "minecraft:geometry": {
                "identifier": "geometry.glass_pane",
                "bone_visibility": {
                    "north": "q.block_state('minecraft:connection_north')",
                    "south": "q.block_state('minecraft:connection_south')",
                    "west": "q.block_state('minecraft:connection_west')",
                    "east": "q.block_state('minecraft:connection_east')",
                    "center_north": "!q.block_state('minecraft:connection_north')",
                    "center_south": "!q.block_state('minecraft:connection_south')",
                    "center_west": "!q.block_state('minecraft:connection_west')",
                    "center_east": "!q.block_state('minecraft:connection_east')",
                    "edge_north": "false",
                    "edge_south": "false",
                    "edge_west": "false",
                    "edge_east": "false"
                }
            },
            "minecraft:material_instances": {
                "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 },
                "top": { "texture": "glass_pane_top", "render_method": "blend", "ambient_occlusion": 0.0 }
            },
            "minecraft:item_visual": {
                "geometry": {
                    "identifier": "geometry.glass_pane",
                    "bone_visibility": {
                        "west": "false",
                        "east": "false",
                        "center_north": "false",
                        "center_south": "false",
                        "edge_west": "false",
                        "edge_east": "false"
                    }
                },
                "material_instances": {
                    "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 },
                    "top": { "texture": "glass_pane_top", "render_method": "blend", "ambient_occlusion": 0.0 }
                }
            }
        },
        "permutations": [
            {
                "condition": "q.block_state('minecraft:connection_north')",
                "components": {
                    "minecraft:collision_box": { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 9 ] },
                    "minecraft:selection_box": { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 9 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_south')",
                "components": {
                    "minecraft:collision_box": { "origin": [ -1, 0, -1 ], "size": [ 2, 16, 9 ] },
                    "minecraft:selection_box": { "origin": [ -1, 0, -1 ], "size": [ 2, 16, 9 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_east')",
                "components": {
                    "minecraft:collision_box": { "origin": [ -8, 0, -1 ], "size": [ 9, 16, 2 ] },
                    "minecraft:selection_box": { "origin": [ -8, 0, -1 ], "size": [ 9, 16, 2 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_west')",
                "components": {
                    "minecraft:collision_box": { "origin": [ -1, 0, -1 ], "size": [ 9, 16, 2 ] },
                    "minecraft:selection_box": { "origin": [ -1, 0, -1 ], "size": [ 9, 16, 2 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_north') && q.block_state('minecraft:connection_south')",
                "components": {
                    "minecraft:collision_box": { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 16 ] },
                    "minecraft:selection_box": { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 16 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_north') && q.block_state('minecraft:connection_west')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 9 ] },
                        { "origin": [ -1, 0, -1 ], "size": [ 9, 16, 2 ] }
                    ],
                    "minecraft:selection_box": { "origin": [ -1, 0, -8 ], "size": [ 9, 16, 9 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_north') && q.block_state('minecraft:connection_east')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 9 ] },
                        { "origin": [ -8, 0, -1 ], "size": [ 9, 16, 2 ] }
                    ],
                    "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 9, 16, 9 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_south') && q.block_state('minecraft:connection_west')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -1, 0, -1 ], "size": [ 2, 16, 9 ] },
                        { "origin": [ -1, 0, -1 ], "size": [ 9, 16, 2 ] }
                    ],
                    "minecraft:selection_box": { "origin": [ -1, 0, -1 ], "size": [ 9, 16, 9 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_south') && q.block_state('minecraft:connection_east')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -1, 0, -1 ], "size": [ 2, 16, 9 ] },
                        { "origin": [ -8, 0, -1 ], "size": [ 9, 16, 2 ] }
                    ],
                    "minecraft:selection_box": { "origin": [ -8, 0, -1 ], "size": [ 9, 16, 9 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_west') && q.block_state('minecraft:connection_east')",
                "components": {
                    "minecraft:collision_box": { "origin": [ -8, 0, -1 ], "size": [ 16, 16, 2 ] },
                    "minecraft:selection_box": { "origin": [ -8, 0, -1 ], "size": [ 16, 16, 2 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_north') && q.block_state('minecraft:connection_south') && q.block_state('minecraft:connection_west')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 16 ] },
                        { "origin": [ -1, 0, -1 ], "size": [ 9, 16, 2 ] }
                    ],
                    "minecraft:selection_box": { "origin": [ -1, 0, -8 ], "size": [ 9, 16, 16 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_north') && q.block_state('minecraft:connection_south') && q.block_state('minecraft:connection_east')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 16 ] },
                        { "origin": [ -8, 0, -1 ], "size": [ 9, 16, 2 ] }
                    ],
                    "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 9, 16, 16 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_west') && q.block_state('minecraft:connection_east') && q.block_state('minecraft:connection_north')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -1 ], "size": [ 16, 16, 2 ] },
                        { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 9 ] }
                    ],
                    "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 16, 9 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_west') && q.block_state('minecraft:connection_east') && q.block_state('minecraft:connection_south')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -8, 0, -1 ], "size": [ 16, 16, 2 ] },
                        { "origin": [ -1, 0, -1 ], "size": [ 2, 16, 9 ] }
                    ],
                    "minecraft:selection_box": { "origin": [ -8, 0, -1 ], "size": [ 16, 16, 9 ] }
                }
            },
            {
                "condition": "q.block_state('minecraft:connection_north') && q.block_state('minecraft:connection_south') && q.block_state('minecraft:connection_west') && q.block_state('minecraft:connection_east')",
                "components": {
                    "minecraft:collision_box": [
                        { "origin": [ -1, 0, -8 ], "size": [ 2, 16, 16 ] },
                        { "origin": [ -8, 0, -1 ], "size": [ 16, 16, 2 ] }
                    ],
                    "minecraft:selection_box": { "origin": [ -8, 0, -8 ], "size": [ 16, 16, 16 ] }
                }
            }
        ]
    }
}
```

</details>

<details>

<summary>方块模型</summary>

```json showLineNumbers title="RP/models/blocks/glass_pane.geo.json"
{
    "format_version": "1.21.0",
    "minecraft:geometry": [
        {
            "description": {
                "identifier": "geometry.glass_pane",
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
                    "name": "center_top_bottom",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -1],
                            "size": [2, 16, 2],
                            "uv": {
                                "up": {"uv": [2, 9], "uv_size": [-2, -2], "material_instance": "top"},
                                "down": {"uv": [2, 9], "uv_size": [-2, -2], "material_instance": "top"}
                            }
                        }
                    ]
                },
                {
                    "name": "center_north",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -1],
                            "size": [2, 16, 2],
                            "uv": {
                                "north": {"uv": [7, 0], "uv_size": [2, 16]}
                            }
                        }
                    ]
                },
                {
                    "name": "center_south",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -1],
                            "size": [2, 16, 2],
                            "uv": {
                                "south": {"uv": [7, 0], "uv_size": [2, 16]}
                            }
                        }
                    ]
                },
                {
                    "name": "center_west",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -1],
                            "size": [2, 16, 2],
                            "uv": {
                                "west": {"uv": [7, 0], "uv_size": [2, 16]}
                            }
                        }
                    ]
                },
                {
                    "name": "center_east",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -1],
                            "size": [2, 16, 2],
                            "uv": {
                                "east": {"uv": [7, 0], "uv_size": [2, 16]}
                            }
                        }
                    ]
                },
                {
                    "name": "north",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -8],
                            "size": [2, 16, 7],
                            "uv": {
                                "east": {"uv": [9, 0], "uv_size": [7, 16]},
                                "west": {"uv": [0, 0], "uv_size": [7, 16]},
                                "up": {"uv": [2, 16], "uv_size": [-2, -7], "uv_rotation": 180, "material_instance": "top"},
                                "down": {"uv": [0, 16], "uv_size": [2, -7], "material_instance": "top"}
                            }
                        }
                    ]
                },
                {
                    "name": "south",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "rotation": [0, 180, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -8],
                            "size": [2, 16, 7],
                            "uv": {
                                "east": {"uv": [9, 0], "uv_size": [7, 16]},
                                "west": {"uv": [0, 0], "uv_size": [7, 16]},
                                "up": {"uv": [2, 16], "uv_size": [-2, -7], "uv_rotation": 180, "material_instance": "top"},
                                "down": {"uv": [0, 16], "uv_size": [2, -7], "material_instance": "top"}
                            }
                        }
                    ]
                },
                {
                    "name": "west",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "rotation": [0, -90, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -8],
                            "size": [2, 16, 7],
                            "uv": {
                                "east": {"uv": [9, 0], "uv_size": [7, 16]},
                                "west": {"uv": [0, 0], "uv_size": [7, 16]},
                                "up": {"uv": [2, 16], "uv_size": [-2, -7], "uv_rotation": 180, "material_instance": "top"},
                                "down": {"uv": [0, 16], "uv_size": [2, -7], "material_instance": "top"}
                            }
                        }
                    ]
                },
                {
                    "name": "east",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "rotation": [0, 90, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -8],
                            "size": [2, 16, 7],
                            "uv": {
                                "east": {"uv": [9, 0], "uv_size": [7, 16]},
                                "west": {"uv": [0, 0], "uv_size": [7, 16]},
                                "up": {"uv": [2, 16], "uv_size": [-2, -7], "uv_rotation": 180, "material_instance": "top"},
                                "down": {"uv": [0, 16], "uv_size": [2, -7], "material_instance": "top"}
                            }
                        }
                    ]
                },
                {
                    "name": "edge_north",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -8],
                            "size": [2, 16, 7],
                            "uv": {
                                "north": {"uv": [0, 0], "uv_size": [2, 16], "material_instance": "top"}
                            }
                        }
                    ]
                },
                {
                    "name": "edge_south",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "rotation": [0, 180, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -8],
                            "size": [2, 16, 7],
                            "uv": {
                                "north": {"uv": [0, 0], "uv_size": [2, 16], "material_instance": "top"}
                            }
                        }
                    ]
                },
                {
                    "name": "edge_west",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "rotation": [0, -90, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -8],
                            "size": [2, 16, 7],
                            "uv": {
                                "north": {"uv": [0, 0], "uv_size": [2, 16], "material_instance": "top"}
                            }
                        }
                    ]
                },
                {
                    "name": "edge_east",
                    "parent": "block",
                    "pivot": [0, 0, 0],
                    "rotation": [0, 90, 0],
                    "cubes": [
                        {
                            "origin": [-1, 0, -8],
                            "size": [2, 16, 7],
                            "uv": {
                                "north": {"uv": [0, 0], "uv_size": [2, 16], "material_instance": "top"}
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```

</details>

---

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
