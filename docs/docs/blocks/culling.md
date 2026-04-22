---
sidebar_position: 6
---

# 方块面剔除

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

> 上次更新：2026 年 4 月 22 日。中国版最新版本为 1.21.90，国际版最新版本为 26.10。

方块面剔除（Block Culling）可用于在临近存在方块时隐藏特定的骨骼或方块面。通常用于透明的自定义方块，消除内部仍渲染的方块面，并提升客户端方面的性能。方块面剔除规则需要将相关规则文件指定到<FileType type="folder" name="block_culling"/>的 json 文件下。

本文档收录方块面剔除的相关信息。

## 方块面剔除文件格式

以下为<FileType type="folder" name="resource_packs"/> - <FileType type="folder" name="block_culling"/> - <FileType type="file" name="*.json"/>的结构。

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，至少应为`1.21.80`。
  - <DataType type="object" name="minecraft:block_culling_rules" isRequired/>：定义方块的面剔除规则。
    - <DataType type="object" name="description" isRequired/>：方块面剔除规则的描述。
      - <DataType type="string" name="identifier" isRequired/>：定义方块面剔除规则的 ID。ID 形式通常设置为`(命名空间):culling.(剔除规则 ID)`。
    - <DataType type="array" name="rules" isRequired/>：方块面剔除规则的具体规则。
      - <DataType type="object"/>
        - <DataType type="string" name="direction" isRequired/>：当方块的何种方向上存在方块时则开始剔除。可选值为`up`、`down`、`east`、`west`、`south`、`north`。
        - <DataType type="object" name="geometry_part" isRequired/>：待剔除的模型的部分。详见[方块模型](./model)。
          - <DataType type="string" name="bone" isRequired/>：待剔除的模型的骨骼 ID。
          - <DataType type="int" name="cube"/>：待剔除的模型的骨骼 ID 中，将其中的第几个部件剔除掉。
          - <DataType type="string" name="face"/>：待剔除的模型的骨骼 ID 中，将选定的部件的哪个面剔除掉。必须指定<DataType type="int" name="cube"/>后可用。可选值为`up`、`down`、`east`、`west`、`south`、`north`。一般来说，这个值会指定为和<DataType type="string" name="direction" isRequired/>相同的值。
        - <DataType type="string" name="condition"/>：当满足何种额外条件时进行面剔除。可选值为：
          | 可选值 | 描述 |
          | --- | --- |
          | `default` | 临近方块为完整不透明方块，默认值 |
          | `same_block` | 临近方块为同种方块 |
          | `same_block_permutation` | 临近方块为同种方块且为同种方块置换 |
          | `same_culling_layer` | （1.21.90+）临近方块在[`minecraft:geometry`组件](./components#minecraftgeometry)中和此方块拥有相同的`culling_layer`参数 |
        - <DataType type="boolean" name="cull_against_full_and_opaque"/>：设置为`true`时会在临近有完整不透明方块时进行方块面剔除。默认为`true`。
</treeview>

<details>

<summary>实例：类似于玻璃的方块面剔除模式</summary>

以下使用的自定义模型为含有 1 个`block`骨骼（其中含有 1 个块）的完整方块模型，当上下东西南北为相同方块时则剔除对应方向的面。在[`minecraft:geometry`组件](./components#minecraftgeometry)的`culling`参数中调用这个方块面剔除模型以应用此规则。

```json title="block_culling/glass.culling.json" showLineNumbers
{
    "format_version": "1.21.80",
    "minecraft:block_culling_rules": {
        "description": {
            "identifier": "test:culling.glass"
        },
        "rules": [
            {
                "direction": "up",
                "geometry_part": { "bone": "block", "cube": 0, "face": "up" },
                "condition": "same_block"
            },
            {
                "direction": "down",
                "geometry_part": { "bone": "block", "cube": 0, "face": "down" },
                "condition": "same_block"
            },
            {
                "direction": "east",
                "geometry_part": { "bone": "block", "cube": 0, "face": "east" },
                "condition": "same_block"
            },
            {
                "direction": "west",
                "geometry_part": { "bone": "block", "cube": 0, "face": "west" },
                "condition": "same_block"
            },
            {
                "direction": "south",
                "geometry_part": { "bone": "block", "cube": 0, "face": "south" },
                "condition": "same_block"
            },
            {
                "direction": "north",
                "geometry_part": { "bone": "block", "cube": 0, "face": "north" },
                "condition": "same_block"
            }
        ]
    }
}
```

![glass_1](/img/docs/docs/blocks/culling/glass_1.png)  
↑ 面剔除前 | 面剔除后 ↓  
![glass_2](/img/docs/docs/blocks/culling/glass_2.png)

</details>

## 按体素剔除面

:::danger[警告]

按体素剔除面的功能仍处于实验性玩法，必须开启「实验性 Voxel 形状特征」才可使用。在实验性玩法中，该功能存在功能不稳定、功能更改甚至未来被移除的风险。

因此，在此功能正式实装之前，本部分将仅作少量的介绍。感兴趣的读者可以阅读[体素形状 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/voxelshapes?view=minecraft-bedrock-stable)了解更多。

:::

体素（Voxel）是和像素（Pixel）类似的概念，指使用立方体为基本单位构成的空间图形。在基岩版，可以通过体素剔除相邻方块的面。

可在<FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="shapes"/> - <FileType type="file" name="*.json"/>中定义体素，例如下面的下半砖形状体素：

```json showLineNumbers title="shapes/slab_bottom.voxel.json"
{
    "format_version": "1.21.110",
    "minecraft:voxel_shape": {
        "description": {
            "identifier": "test:slab_bottom"
        },
        "shape": {
            "boxes": [
                {
                    "min": [ 0, 0, 0 ],
                    "max": [ 16, 8, 16 ]
                }
            ]
        }
    }
}
```

然后，在[`minecraft:geometry`组件](./components#minecraftgeometry)中的`culling_shape`选定此体素，当其他临近方块和该方块指定的体素完全重叠后就会被剔除面，如下图所示：

![voxel_1](/img/docs/docs/blocks/culling/voxel_1.png)

---

## 参考文档

- [方块面剔除 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-culling)
- [方块组件 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-components)（主要参考`minecraft:geometry`组件）
- [方块格式历史 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-format-history)
- [方块面剔除文档 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockcullingreference/examples/blockcullingrules/block_culling?view=minecraft-bedrock-stable)
- [方块外观进阶：尺寸与面剔除 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/customblockoversized?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
