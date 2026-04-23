---
sidebar_position: 5
---

# 方块模型

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Image from "/src/components/image/standard"

> 上次更新：2026 年 4 月 22 日。中国版最新版本为 1.21.90，国际版最新版本为 26.10。

方块模型（Block Model）是用于方块的模型，决定方块在世界中以何种形状渲染并呈现出来。方块模型需要在<FileType type="folder" name="models"/> - <FileType type="folder" name="block"/>的 json 文件中定义。

通常，方块模型都使用 [BlockBench](https://www.blockbench.net/) 编写，这是一个可视化模型的软件，专门用于 Minecraft 的模型制作。因此，**在条件允许的情况下，我们并不推荐读者手写方块模型，而应在 BlockBench 中进行模型制作，这能够大幅节省您的时间**。

## 方块模型文件格式

以下为<FileType type="folder" name="resource_packs"/> - <FileType type="folder" name="models"/> - <FileType type="folder" name="block"/> - <FileType type="file" name="*.json"/>的结构。

:::warning[注意]

因为目前各大文档都强调使用 BlockBench 制作方块模型，没有明确的参数文档，故下文给出的参数可能会不全面。

:::

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，至少应为`1.12.0`。
  - <DataType type="array" name="minecraft:geometry" isRequired/>：定义方块模型。
    - <DataType type="object"/>
      - <DataType type="object" name="description" isRequired/>：方块模型描述。
        - <DataType type="string" name="identifier" isRequired/>：定义方块 ID。格式应为`geometry.(模型 ID)`。
        - <DataType type="int" name="texture_width" isRequired/>：定义使用的贴图宽度应为多少像素。
        - <DataType type="int" name="texture_height" isRequired/>：定义使用的贴图高度应为多少像素。
        - <DataType type="float" name="visible_bounds_width"/>
        - <DataType type="float" name="visible_bounds_height"/>
        - <DataType type="array" name="visible_bounds_offset"/>：应为一个<DataType type="float"/>的三元数组。
      - <DataType type="array" name="bones" isRequired/>：定义方块的骨骼。
        - <DataType type="object"/>
          - <DataType type="string" name="name" isRequired/>：定义骨骼名称。
          - <DataType type="array" name="pivot" isRequired/>：定义骨骼枢轴点。对骨骼的旋转操作和部件的源位置的默认值都基于此枢轴点。应为一个<DataType type="float"/>的三元数组。
          - <DataType type="array" name="rotation"/>：定义骨骼相对于骨骼枢轴点的旋转角度。应为一个<DataType type="float"/>的三元数组。
          - <DataType type="array" name="cubes"/>：定义骨骼内含有的部件。
            - <DataType type="object"/>
              - <DataType type="array" name="origin" isRequired/>：定义部件的源位置，这位置基于骨骼枢轴点计算。应为一个<DataType type="float"/>的三元数组。
              - <DataType type="array" name="size" isRequired/>：定义部件的大小，单位为像素（16×16×16 为一个完整方块的大小），以部件的源位置为基础向`x,y,z`方向伸展的像素数。应为一个<DataType type="float"/>的三元数组。
              - <DataType type="object" name="uv" isRequired/>：定义采用的 UV（贴图）如何应用到模型中。
                - <DataType type="object" name="east" isRequired/>/<DataType type="object" name="west" isRequired/>/<DataType type="object" name="south" isRequired/>/<DataType type="object" name="north" isRequired/>/<DataType type="object" name="up" isRequired/>/<DataType type="object" name="down" isRequired/>：定义东西南北顶底分别如何取用 UV（贴图）。
                  - <DataType type="array" name="uv" isRequired/>：定义对应的面取 UV 的何像素点作为源点。应为一个<DataType type="int"/>的二元数组。
                  - <DataType type="array" name="uv_size" isRequired/>：定义在 UV 源点的基础上应该沿长宽方向多少像素的范围内取用 UV。应为一个<DataType type="int"/>的二元数组。
                  - <DataType type="array" name="material_instance"/>：定义方块的材质实例，可用于[`minecraft:material_instances`](./components#minecraftmaterial_instances)组件批量更改多个面。
              - <DataType type="float" name="inflate"/>：定义部件的膨胀值，在基础大小的基础上放大多少倍。
              - <DataType type="array" name="pivot"/>：定义部件枢轴点。对部件的旋转操作基于此枢轴点。应为一个<DataType type="float"/>的三元数组。
              - <DataType type="array" name="rotation"/>：定义部件相对于部件枢轴点的旋转角度。应为一个<DataType type="float"/>的三元数组。
      - <DataType type="object" name="item_display_transforms"/>：（1.21.110+）此方块在各种情况下显示的变换值。
        - <DataType type="object" name="thirdperson_righthand"/>：在第三人称下如何显示在玩家右手上。
          - <DataType type="array" name="rotation_pivot"/>：旋转枢轴。应为一个<DataType type="float"/>的三元数组。
          - <DataType type="array" name="rotation"/>：相对于旋转枢轴的旋转值。应为一个<DataType type="float"/>的三元数组。
          - <DataType type="array" name="scale_pivot"/>：尺寸枢轴。应为一个<DataType type="float"/>的三元数组。
          - <DataType type="array" name="scale"/>：相对于尺寸枢轴调整的尺寸值。应为一个<DataType type="float"/>的三元数组。
          - <DataType type="array" name="translation"/>：偏移值。应为一个<DataType type="float"/>的三元数组。
        - <DataType type="object" name="thirdperson_lefthand"/>：在第三人称下如何显示在玩家左手上。可写入的参数与<DataType type="object" name="thirdperson_righthand"/>一致。
        - <DataType type="object" name="firstperson_righthand"/>：在第一人称下如何显示在玩家右手上。可写入的参数与<DataType type="object" name="thirdperson_righthand"/>一致。
        - <DataType type="object" name="firstperson_lefthand"/>：在第一人称下如何显示在玩家左手上。可写入的参数与<DataType type="object" name="thirdperson_righthand"/>一致。
        - <DataType type="object" name="ground"/>：如何显示方块掉落物。可写入的参数与<DataType type="object" name="thirdperson_righthand"/>一致。
        - <DataType type="object" name="gui"/>：如何显示在物品栏等 GUI 内。可写入的参数比<DataType type="object" name="thirdperson_righthand"/>多出一个。
          - <DataType type="boolean" name="fit_to_frame"/>
        - <DataType type="object" name="head"/>：如何显示在玩家的头上。可写入的参数与<DataType type="object" name="thirdperson_righthand"/>一致。
        - <DataType type="object" name="fixed"/>：如何显示在展示框上。可写入的参数与<DataType type="object" name="thirdperson_righthand"/>一致。
</treeview>

<details>

<summary>实例：完整方块模型</summary>

该模型使用了 BlockBench 生成。

```json title="models/block/full_block.geo.json" showLineNumbers
{
    "format_version": "1.12.0",
    "minecraft:geometry": [
        {
            "description": {
                "identifier": "geometry.full_block",
                "texture_width": 16,
                "texture_height": 16,
                "visible_bounds_width": 2,
                "visible_bounds_height": 2.5,
                "visible_bounds_offset": [0, 0.75, 0]
            },
            "bones": [
                {
                    "name": "block",
                    "pivot": [0, 0, 0],
                    "cubes": [
                        {
                            "origin": [-8, 0, -8],
                            "size": [16, 16, 16],
                            "uv": {
                                "north": {"uv": [0, 0], "uv_size": [16, 16]},
                                "east": {"uv": [0, 0], "uv_size": [16, 16]},
                                "south": {"uv": [0, 0], "uv_size": [16, 16]},
                                "west": {"uv": [0, 0], "uv_size": [16, 16]},
                                "up": {"uv": [16, 16], "uv_size": [-16, -16]},
                                "down": {"uv": [16, 16], "uv_size": [-16, -16]}
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

## 原版使用的方块模型

| 模型 ID | 描述 | 示例 |
| --- | --- | --- |
| `minecraft:geometry.full_block` | 完整的 16×16×16 方块模型 | <Image src="/img/docs/docs/blocks/model/model_full_block_1.png" text="完整方块模型" showText={false}/> |
| `minecraft:geometry.cross` | 类似于花、草一样的贴图交叉模型 | <Image src="/img/docs/docs/blocks/model/model_cross_1.png" text="交叉模型" showText={false}/> |

> 图片取自中文 Minecraft Wiki。

开发者在使用原版方块模型时应该注意：

1. **原版方块模型不是数据驱动的**，因此对这些模型的骨骼操作（例如`culling`、`bone_visibility`等）是无效的。
2. 在 26.0 更新前，使用完整方块模型`minecraft:geometry.full_block`的底面不会旋转 180°，这和原版方块的表现并不相符。26.0 更新后，Mojang 更新了这个模型，但使用格式版本`1.26.0`之前版本的方块仍然保持原来的表现（即底面不会旋转）。26.0 后，若想使用底面不旋转的完整方块模型，请使用`minecraft:geometry.full_block_v1`。

---

## 参考文档

- [原版方块模型 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/vanilla-block-models)
- [方块组件文档`minecraft:geometry` | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_geometry?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
