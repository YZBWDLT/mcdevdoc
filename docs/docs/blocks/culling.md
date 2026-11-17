---
sidebar_position: 7
---

# 方块面剔除

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Image from "/src/components/image/standard"
import Version from "/src/components/highlight/version"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

方块面剔除（Block Culling）可用于在临近存在方块时、方块面不可见时、或间距过远时隐藏特定的骨骼或方块面，这可以显著提升客户端方面的性能。

方块面剔除规则的写法见下文；体素形状本身的文件格式、限制与内置形状见[体素形状](./voxel)。

本文档收录方块面剔除的相关信息。

## 方块面剔除规则文件格式

方块面剔除规则需要将相关规则文件指定到<FileType type="folder" name="block_culling"/>的 json 文件下，在[`minecraft:geometry`组件](./components#minecraftgeometry)的`culling`参数中可以指定方块面剔除规则。这通常用于透明的自定义方块。

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
          - <DataType type="string" name="face"/>：待剔除的模型的骨骼 ID 中，将选定的部件的哪个面剔除掉。必须指定<DataType type="int" name="cube"/> 后可用。可选值为`up`、`down`、`east`、`west`、`south`、`north`。一般来说，这个值会指定为和<DataType type="string" name="direction" isRequired/>相同的值。
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

<Image src="/img/docs/blocks/culling/glass_1.webp" text="面剔除前"/>
<Image src="/img/docs/blocks/culling/glass_2.webp" text="面剔除后"/>

</details>

## 按体素剔除面

在[`minecraft:geometry`组件](./components#minecraftgeometry)的`culling_shape`参数中指定体素形状，方块就会按这个形状参与面剔除：

```json showLineNumbers
"minecraft:geometry": {
    "identifier": "geometry.custom_slab",
    "culling": "test:culling.custom",
    "culling_shape": "test:slab_bottom"
}
```

不指定`culling_shape`时默认为`minecraft:empty`。需要注意的是：

- `identifier`写成`minecraft:geometry.full_block`时，`culling_shape`会被强制设为`minecraft:unit_cube`，自定义形状会被忽略。
- 自定义方块要参与体素剔除，需要同时定义`culling`面剔除规则；只写`culling_shape`不会生效。
- <Version add="1.26.30" inline/>：`culling_shape`不再是实验性内容。
- <Version add="1.26.40" inline/>：原版方块的体素形状不再需要实验性玩法。

剔除的判断分三步：先算出本方块在该面上的「面片」，再算出相邻方块对面一侧的面片，如果相邻方块完全盖住这块面片，该面就被剔除。面片是体素形状与该面边界的交集，六个面的边界分别是北/南`Z = 0`与`Z = 16`、西/东`X = 0`与`X = 16`、下/上`Y = 0`与`Y = 16`。

<Image src="/img/docs/blocks/culling/face_slice.png" text="相邻方块完全盖住面片时才剔除，只盖住一部分则保留" size="85%"/>

体素比较判定为「不剔除」时，渲染器仍会继续检查面剔除规则的`condition`，`culling_layer`相同的方块依然可能互相剔除。树叶、玻璃这类「同种之间才剔除」的方块，通常就让`culling_shape`保持默认值，把判定交给`culling_layer`。

<Image src="/img/docs/blocks/culling/voxel_1.webp" text="使用体素形状剔除相邻方块的面"/>

## 背面剔除

背面剔除（Backface Culling）是一项用于提升性能的渲染技术。众所周知，我们在现实生活中看一个立方体只能看到 3 个面，故而没有看到的 3 个面就可以防止渲染，这可以提升程序性能。对于非透明方块来讲，是否渲染这 3 个面就没有任何的影响了。

<Image src="/img/docs/blocks/culling/backface_culling.png" text="面剔除示例" size="85%"/>

然而，对于透明方块，背面剔除技术却是有影响的。例如玻璃就是背面剔除的，而刷怪笼则是背面不剔除。

<Image src="/img/docs/blocks/culling/backface_culling_2.webp" text="背面剔除（左）与背面不剔除（右）的对比" size="75%"/>

在[`minecraft:material_instances`组件](./components#minecraftmaterial_instances)中，指定不同的材质（`render_method`）会有不同的背面剔除效果。

## 远距面剔除

远距面剔除（Distant Culling）则是另一项用于提升性能的渲染技术。当距离过远时，方块会停止继续渲染，如下图所示。

<Image src="/img/docs/blocks/culling/distant_culling_1.webp" text="远距不剔除（玻璃，左）与远距面剔除（刷怪笼，右）的对比" size="75%"/>

和背面剔除类似，在[`minecraft:material_instances`组件](./components#minecraftmaterial_instances)中，指定不同的材质（`render_method`）会有不同的远距面剔除效果。

---

## 参考文档

- [方块面剔除 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-culling)
- [方块组件 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-components)（主要参考`minecraft:geometry`组件）
- [方块格式历史 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-format-history)
- [方块面剔除文档 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockcullingreference/examples/blockcullingrules/block_culling?view=minecraft-bedrock-stable)
- [方块外观进阶：尺寸与面剔除 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/customblockoversized?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
