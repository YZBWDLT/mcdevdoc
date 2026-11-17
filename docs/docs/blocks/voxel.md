---
sidebar_position: 6
---

# 体素形状

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Image from "/src/components/image/standard"
import Version from "/src/components/highlight/version"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

体素形状（Voxel Shape）用一个或多个轴对齐包围盒（AABB）描述方块的外形。盒体的边都对齐世界坐标轴，定义时不能旋转；判断两个方块是否相接、重叠或遮挡时只需比较坐标范围。

体素形状不会被绘制出来，只用于描述方块的形状，目前用在[方块面剔除](./culling#按体素剔除面)与[碰撞箱](./components#minecraftcollision_box)两处。

本文档收录体素形状的文件格式、内置形状与限制。

---

## 文件架构

体素形状定义在行为包中。

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="shapes"/>
    - <FileType type="file" name="(体素形状 ID).json"/>：一个体素形状

</treeview>

原版行为包的`shapes/`目录下也有同样结构的文件，详见[内置形状](#内置形状)。

---

## 文件格式

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，至少应为`1.21.110`。
  - <DataType type="object" name="minecraft:voxel_shape" isRequired/>：定义体素形状。
    - <DataType type="object" name="description" isRequired/>：体素形状的描述。
      - <DataType type="string" name="identifier" isRequired/>：体素形状的 ID。必须带有命名空间，且不能使用`minecraft`命名空间。
    - <DataType type="object" name="shape" isRequired/>：体素形状的具体形状。
      - <DataType type="array" name="boxes" isRequired/>：构成形状的盒体列表，最多 32 个。
        - <DataType type="object"/>
          - <DataType type="array" name="min" isRequired/>：盒体的最小坐标（像素）。
            - <DataType type="float" name="0"/>：X 坐标。
            - <DataType type="float" name="1"/>：Y 坐标。
            - <DataType type="float" name="2"/>：Z 坐标。
          - <DataType type="array" name="max" isRequired/>：盒体的最大坐标（像素），每一轴都必须大于`min`的对应值。
            - <DataType type="float" name="0"/>：X 坐标。
            - <DataType type="float" name="1"/>：Y 坐标。
            - <DataType type="float" name="2"/>：Z 坐标。
</treeview>

下半砖的体素形状：

```json showLineNumbers title="shapes/slab_bottom.json"
{
    "format_version": "1.21.110",
    "minecraft:voxel_shape": {
        "description": {
            "identifier": "test:slab_bottom"
        },
        "shape": {
            "boxes": [{ "min": [0, 0, 0], "max": [16, 8, 16] }]
        }
    }
}
```

用两个盒体拼出楼梯形状：

```json showLineNumbers title="shapes/stairs.json"
{
    "format_version": "1.21.110",
    "minecraft:voxel_shape": {
        "description": {
            "identifier": "test:stairs"
        },
        "shape": {
            "boxes": [
                { "min": [0, 0, 0], "max": [16, 8, 16] },
                { "min": [0, 8, 8], "max": [16, 16, 16] }
            ]
        }
    }
}
```

栅栏柱这种细长形状，一个盒体就够了：

```json showLineNumbers title="shapes/fence_post.json"
{
    "format_version": "1.21.110",
    "minecraft:voxel_shape": {
        "description": {
            "identifier": "test:fence_post"
        },
        "shape": {
            "boxes": [{ "min": [6, 0, 6], "max": [10, 16, 10] }]
        }
    }
}
```

---

## 内置形状

由引擎直接提供的体素形状只有两个，不需要在行为包中定义文件：

| 形状 ID               | 说明                                              |
| --------------------- | ------------------------------------------------- |
| `minecraft:empty`     | 空形状，不与任何盒体相交。`culling_shape`的默认值 |
| `minecraft:unit_cube` | 完整的 16×16×16 盒体，等同于一个完整方块          |

<Image src="/img/docs/blocks/voxel/builtin_shapes.png" text="两个内置形状：minecraft:empty 与 minecraft:unit_cube" size="85%"/>

原版方块还使用了许多其他形状（例如栅栏、钟、台阶等）。它们不属于内置形状，同样以体素形状文件的形式提供，放在原版行为包的`shapes/`目录里，`identifier`也使用`minecraft`命名空间，例如`minecraft:fence`、`minecraft:slab_type_top`、`minecraft:bell_attachment_floor`、`minecraft:anvil`。完整列表见 [Bedrock Wiki](https://wiki.bedrock.dev/blocks/vanilla-voxel-shapes)。

---

## 限制

- 一个体素形状最多包含 32 个盒体。
- 坐标以像素为单位，一个完整方块在每一轴上的范围是`0`-`16`；盒体可以超出到`-30`-`30`，但必须与`0`-`16`的基础范围至少重叠 1 像素。
- 盒体必须有正体积，即每一轴的`max`都要大于`min`。
- 自定义体素形状的注册表最多存放 4500 个不同的形状。达到上限后，新形状不会加载，引用它的`culling_shape`会被设为`minecraft:empty`。
- 相同的形状会被自动去重：与已有的原版形状或自定义形状一致时，不会重复占用注册表。
- 体素形状会跟随方块的[`minecraft:transformation`组件](./components#minecrafttransformation)整体旋转、缩放、平移。

---

## 常见问题

**形状不生效**：先确认文件放在行为包的`shapes/`下、`identifier`拼写一致，再确认方块同时定义了`culling`规则；如果两方块都要参与体素比较，双方都得有体素形状或兼容的`culling_layer`。

**剔除结果不对**：常见原因有体素形状与模型对不上、`transformation`改变了实际位置、面片没有被完整覆盖。逐轴核对一下`min`/`max`，尤其注意体素的原点在角落，不是中心。

**形状被忽略**：`minecraft:geometry`的`identifier`写成`minecraft:geometry.full_block`时，`culling_shape`会被强制设为`minecraft:unit_cube`，自定义形状不起作用。

---

## 与方块模型的区别

体素形状和[方块模型](./model)都在描述方块的形状，但原点位置和水平坐标不同，写的时候容易搞混。下表比较的是标准 16×16×16 方块的范围，两者的盒体都可以超出这个范围：

|                 | 体素形状         | 方块模型（geometry） |
| --------------- | ---------------- | -------------------- |
| 原点`(0, 0, 0)` | 方块底面的一个角 | 方块底面的中心       |
| X、Z 坐标范围   | `0`-`16`         | `-8`-`8`             |
| Y 坐标范围      | `0`-`16`         | `0`-`16`             |

<Image src="/img/docs/blocks/voxel/coordinates.png" text="同一块下半砖在两种坐标系中的写法" size="95%"/>

例如，同样一块下半砖，两种写法分别如下：

```json showLineNumbers title="体素形状"
{ "min": [0, 0, 0], "max": [16, 8, 16] }
```

```json showLineNumbers title="方块模型"
{ "origin": [-8, 0, -8], "size": [16, 8, 16] }
```

---

## 参考文档

- [体素形状 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/voxelshapes?view=minecraft-bedrock-stable)
- [方块面剔除规则 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockcullingreference/examples/blockcullingrules/block_culling?view=minecraft-bedrock-stable)
- [方块面剔除 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-culling)
- [方块格式历史 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-format-history)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
