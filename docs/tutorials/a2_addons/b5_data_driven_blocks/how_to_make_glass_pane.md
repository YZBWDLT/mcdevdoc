---
sidebar_position: 101
---

# 附录：如何制作玻璃板

import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Image from "/src/components/image/standard"
import ImageMultiple from "/src/components/image/multiple"
import ImageGroup from "/src/components/image/group"

玻璃板是一种标准的不完整透明方块。它拥有复杂的连接状态和复杂的碰撞箱设定，在使用不同连接状态时的模型和碰撞箱都各不相同，这就大幅增加了还原玻璃板的难度。本文基于[`minecraft:connection`](/docs/docs/blocks/traits#minecraftconnection)方块特征来制作玻璃板。

## 制作相关模型

我们注意到，[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件可以根据条件选择性显示骨骼，因此可以在一个模型中直接指定玻璃板的所有状态。

创建一个模型，起名叫`geometry.glass_pane`。注意使用**逐面 UV**。

指定一个`center`骨骼，代表中心处的玻璃板模型，显然这个模型无论在任何情况下都应该存在。再指定一个`north`骨骼，代表和北方连接时显示`north`骨骼，读者会在创建时在面板上看到一个`^N`的符号，那就是北方，请将`north`创立在中心骨骼的北侧。其他骨骼同理，但目前我们暂时不急于建立其他方向的骨骼，之后我们会解释为什么。

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/1.png" text="建立中间模型和北侧玻璃板模型" size="75%"/>

然后，我们从原版的文件中找到玻璃的贴图（<FileType type="image" name="glass.png"/>）和玻璃板顶部（<FileType type="image" name="glass_pane_top.png"/>）的贴图，导入到 Blockbench 中，方便我们后续调试。

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/2.png" text="导入玻璃板贴图" size="75%"/>

导入好之后，先隐藏`north`骨骼可见性，调`center`骨骼。这里我们来看左侧的「面属性」，点击顶和底的贴图，将其改为 glass_pane_top.png，这样顶和底就会在预览时使用玻璃板顶部的贴图。并且，在顶和底使用`top`的材质实例，方便我们后续使用[`minecraft:material_instances`](/docs/docs/blocks/components#minecraftmaterial_instances)组件。

<ImageGroup>
    <ImageMultiple src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/3.png" text="通过面属性微调每个模型使用何处的 UV"/>
    <ImageMultiple src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/4.png" text="对顶底使用不同的贴图和材质实例"/>
</ImageGroup>

这里我们逐面细调，将东南西北的 UV 拉到玻璃贴图正中间的位置，然后将顶底的 UV 拉到玻璃板顶部贴图中间的位置，这是为了还原原版的效果。

<ImageGroup>
    <ImageMultiple src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/5.png" text="调整东西南北的 UV"/>
    <ImageMultiple src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/6.png" text="调整顶底的 UV"/>
</ImageGroup>

然后我们启用`north`骨骼，打开「面属性」，这里我们可以直接禁用南北方向的面，因为靠北一侧的面贴图不可见是原版设定，而靠南一侧因为在方块内部所以设定为不可见。同样，顶和底的贴图改为 glass_pane_top.png，并且在顶底使用`top`的材质实例。细调东西顶底的贴图如下图所示。

<ImageGroup>
    <ImageMultiple src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/7.png" text="调整东西的 UV，西在最左，东在最右"/>
    <ImageMultiple src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/8.png" text="调整顶底的 UV，若需要极致地还原原版，请将顶的 UV 旋转 180°"/>
</ImageGroup>

然后，复制`north`骨骼，粘贴为`south`、`west`、`east`骨骼。现在粘贴是为了应用对`north`骨骼细调的每个面的更改。然后调整每个骨骼的位置和旋转值，注意`west`放在西侧，`east`放在东侧，`south`放在南侧。然后，调整三个骨骼的 y 轴旋转值分别为`90`、`-90`、`-180`。

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/9.png" text="玻璃板模型" size="75%"/>

到这里事情还没有结束。在有连接状态下，我们如此定义会导致玻璃板中间出现多余的像素，因此必须进行剔除。我们把`center`复制 4 次，分别叫`center_east`、`center_west`、`center_south`、`center_north`，代表东西南北面的中间部分贴图。在北侧有连接时，我们就把`center_north`骨骼禁用，以此类推。然后，我们把`center`的东西南北面全部禁用，改名叫`center_top_bottom`，代表中间部分的顶底贴图。

<Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/10.png" text="玻璃板模型（完整版）" size="75%"/>

这还并不是全部！注意到物品栏内的玻璃板是有边缘的，因此我们还必须增加`edge_east`、`edge_west`、`edge_south`、`edge_north`骨骼，只需要全部复制`north`、`south`、`west`、`east`骨骼并粘贴，然后在「面属性」中启用北面贴图并使用`top`的材质实例即可。

如果你已经快被逼疯了，下面有现成的模型代码供你取用。但如果你想成为一名建模师，就必须意识到*这些工作已经算是很简单了*。

<details>

<summary>该模型的 json 代码</summary>

有需要的读者也可直接取用，但我们还是建议读者自行尝试一次建模，尤其是初学者！

```json showLineNumbers title="glass_pane.geo.json"
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

## 规定方块行为

现在我们来正式编写玻璃板的行为。首先定义玻璃板，注意这里需要使用`1.26.0`以上的格式版本。我们在根`components`下规定未连接时的玻璃板：

```json showLineNumbers title="glass_pane.block.json"
{
    "format_version": "1.26.20",
    "minecraft:block": {
        "description": {
            "identifier": "test:blast_proof_glass_pane",
            "menu_category": {
                "category": "construction"
            }
        },
        "components": {
            "minecraft:collision_box": { "origin": [ -1, 0, -1 ], "size": [ 2, 16, 2 ] },
            "minecraft:selection_box": { "origin": [ -1, 0, -1 ], "size": [ 2, 16, 2 ] },
            "minecraft:destructible_by_explosion": false,
            "minecraft:destructible_by_mining": { "seconds_to_destroy": 0.3 },
            "minecraft:geometry": {
                "identifier": "geometry.glass_pane"
            },
            "minecraft:material_instances": {
                "*": { "texture": "glass", "render_method": "blend", "ambient_occlusion": 0.0 },
                "top": { "texture": "glass_pane_top", "render_method": "blend", "ambient_occlusion": 0.0 }
            }
        },
        "permutations": [
        ]
    }
}
```

这里我们将玻璃板设置为了防爆。然后规定玻璃板的模型骨骼可见性，这里我们引入[`minecraft:connection`](/docs/docs/blocks/traits#minecraftconnection)方块特征：

```json showLineNumbers title="glass_pane.block.json"
{
    "format_version": "1.26.20",
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
            "minecraft:destructible_by_explosion": false,
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
            }
        },
        "permutations": [
        ]
    }
}
```

现在如果进入游戏，你会在你的创造模式物品栏看到你的玻璃板，并且它们能够正确产生连接模型，然而此时碰撞箱和选择箱还不正常。我们这里就来定义各个方块置换，也就是碰撞箱和选择箱。这里的定义是有点痛苦的事情：

1. 首先，玻璃板一共存在 16 种连接状态，也就是分别是否和东南西北连接的状态。我们在根组件已经考虑了均未连接的状态，这样就还有 15 个方块置换等待定义。
2. 碰撞箱和选择箱的坐标设定略显诡异，并且会涉及到复合碰撞箱。你可能需要多次`/reload all`以得到你心仪的更改。

我们建议可以先指定仅连接到东南西北时的碰撞箱，剩余情况的碰撞箱就是这 4 种情况的叠加了。

<details>

<summary>调完碰撞箱的方块定义</summary>

```json showLineNumbers title="glass_pane.block.json"
{
    "format_version": "1.26.20",
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
            "minecraft:destructible_by_explosion": false,
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

最后就是在物品栏内的显示问题了，这需要使用[`minecraft:item_visual`](/docs/docs/blocks/components#minecraftitem_visual)组件。我们把东西模型和东西边缘隐藏掉，然后把中心模型的南北部分也隐藏掉。

<details>

<summary>添加物品栏显示的方块定义（完整代码）</summary>

```json showLineNumbers title="glass_pane.block.json" {41-57}
{
    "format_version": "1.26.20",
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
            "minecraft:destructible_by_explosion": false,
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

最后，再定义一下玻璃板的音效、翻译即可。这套逻辑适用于其他颜色的玻璃板，代码可直接套用。

## 已知问题

通过这种方法制作的玻璃板可能存在两个问题：

1. 对原版其他方块的连接性不太好，尤其是在玻璃板、栅栏、墙连接时，会无法产生正确的连接。
  <Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/issue_1.png" text="自定义玻璃板（右）没有办法和原版玻璃板（左）正确地产生连接"/>
2. 无法像原版的玻璃板一样，靠近后贴图淡化。
  <Image src="/img/tutorials/a2_addons/b5_data_driven_blocks/how_to_make_glass_pane/issue_2.png" text="自定义玻璃板（右）无法像原版玻璃板（左）一样贴图淡化"/>

---

## 本文构造的最终版代码

<details>

<summary>玻璃板定义</summary>

```json showLineNumbers title="glass_pane.block.json"
{
    "format_version": "1.26.20",
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
            "minecraft:destructible_by_explosion": false,
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

<summary>玻璃板模型</summary>

```json showLineNumbers title="glass_pane.geo.json"
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

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
