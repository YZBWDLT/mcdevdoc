---
sidebar_position: 2
---

# 数据驱动方块组件

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Image from "/src/components/image/standard"

> 适用版本：国际版 26.10，中国版 3.8（1.21.90）。

数据驱动方块组件（Data-Driven Block Components）用于规定方块的功能。将不同的方块组件组合在一起可以实现多种复杂的功能。方块组件可以指定到<DataType type="object" name="components" isRequired/>中，以使得方块在所有情况下都使用相关功能；也可以指定到方块置换<DataType type="array" name="permutations"/> - <DataType type="object"/> - <DataType type="object" name="components" isRequired/>中，使得方块在使用特定方块置换时使用特定的功能。

本文档收录所有已开放或即将开放的命名空间为`minecraft`和`netease`的方块组件信息。你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

:::note[组件可用性提示]

1. 标签记号说明：
    - 标注了<Version version="版本号"/>的组件，代表其为**国际版组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。其中，`（版本号）`代表方块定义的`format_version`必须指定为该版本号或更高才可使用。
    - 标注了<Version isChinaVersion/>或<Version version="版本号" isChinaVersion/>的组件，代表其为**中国版组件**，可应用于**中国版方块定义**（在行为包<FileType type="folder" name="netease_blocks"/>定义的方块）。其中，`（版本号）`代表方块定义的`format_version`必须指定为该版本号或更高才可使用。
    - 标注了<Version isBeta/>的组件，代表其为**实验性玩法组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。本文档不记载已被移除的实验性玩法组件（尤其是假日创作者功能的组件）。开发者在使用这些组件的时候应当万分小心，因为它们随时可能会被移除，这会导致你的资源的关键功能失效。
    - **注意：中国版可以同时使用国际版方块定义和中国版方块定义，但是国际版只能使用国际版方块定义**。
    - 标注了<Version version="版本号" toVersion="弃用版本号"/>的组件，代表其为**已弃用组件**，可应用于**国际版物品定义**。虽然微软对它们进行了低版本适配，但在高版本下，开发者不宜再使用这些组件。
2. 如果官方文档中有记载，以上这些标签将会链接到官方文档，读者可点击以查看对应文档。

:::

---

## 基础属性组件

全体方块通用的组件。在定义方块的时候，多数情况下都需要这些组件。

---

### `minecraft:collision_box`

<Version version="1.19.50" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_collision_box?view=minecraft-bedrock-stable"/>

定义方块的碰撞箱。

<Tabs><TabItem value="参数" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:collision_box"/>：根对象。
  - <DataType type="array" name="origin"/>：定义方块碰撞箱源坐标，`[0, 0, 0]`为底面中心点的坐标。默认值为`[-8, 0, -8]`。
    - <DataType type="int" name="0"/>：基于源坐标的 X 坐标（像素）偏移值。必须在`-8`~`8`之间（含）。
    - <DataType type="int" name="1"/>：基于源坐标的 Y 坐标（像素）偏移值。必须在`0`~`16`之间（含）。
    - <DataType type="int" name="2"/>：基于源坐标的 Z 坐标（像素）偏移值。必须在`-8`~`8`之间（含）。
  - <DataType type="array" name="size"/>：定义方块碰撞箱基于源坐标的大小。默认值为`[16, 16, 16]`。
    - <DataType type="int" name="0"/>：X 方向的方块大小。与`origin`的 X 坐标相加后必须在`-8`~`8`之间（含）。
    - <DataType type="int" name="1"/>：Y 方向的方块大小。与`origin`的 Y 坐标相加后必须在`0`\~`24`之间（含）。格式版本低于`1.26.0`时范围缩小到`0`\~`16`之间。
    - <DataType type="int" name="2"/>：Z 方向的方块大小。与`origin`的 Z 坐标相加后必须在`-8`~`8`之间（含）。
</treeview>

**数组型**（1.26.0+）：

可使用数组型定义多个子碰撞箱所复合而成的复杂碰撞箱。

<treeview>
- <DataType type="array" name="minecraft:collision_box"/>：根对象。
  - <DataType type="object"/>
    - <DataType type="array" name="origin"/>：定义方块碰撞箱源坐标，`[0, 0, 0]`为底面中心点的坐标。默认值为`[-8, 0, -8]`。
      - <DataType type="int" name="0"/>：基于源坐标的 X 坐标（像素）偏移值。必须在`-8`~`8`之间（含）。
      - <DataType type="int" name="1"/>：基于源坐标的 Y 坐标（像素）偏移值。必须在`0`~`16`之间（含）。
      - <DataType type="int" name="2"/>：基于源坐标的 Z 坐标（像素）偏移值。必须在`-8`~`8`之间（含）。
    - <DataType type="array" name="size"/>：定义方块碰撞箱基于源坐标的大小。默认值为`[16, 16, 16]`。
      - <DataType type="int" name="0"/>：X 方向的方块大小。与`origin`的 X 坐标相加后必须在`-8`~`8`之间（含）。
      - <DataType type="int" name="1"/>：Y 方向的方块大小。与`origin`的 Y 坐标相加后必须在`0`\~`24`之间（含）。格式版本低于`1.26.0`时范围缩小到`0`\~`16`之间（含）。
      - <DataType type="int" name="2"/>：Z 方向的方块大小。与`origin`的 Z 坐标相加后必须在`-8`~`8`之间（含）。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:collision_box"/>：定义方块是否具有碰撞箱。默认为`true`，且使用 16×16×16 像素的碰撞箱大小。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**对象型**（半砖尺寸）：

```json showLineNumbers
"minecraft:collision_box": {
    "origin": [-8, 0, -8],
    "size": [16, 8, 16]
}
```

**数组型**（26.0+ 版本可用，楼梯尺寸）：

```json showLineNumbers
"minecraft:collision_box": [
    {
        "origin": [-8, 0, -8],
        "size": [16, 8, 16]
    },
    {
        "origin": [-8, 8, -8],
        "size": [16, 8, 8]
    }
]
```

**布尔型**（正常方块尺寸）：

```json showLineNumbers
"minecraft:collision_box": true
```

</TabItem></Tabs>

---

### `minecraft:display_name`

<Version version="1.19.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_display_name?view=minecraft-bedrock-stable"/> <Version version="1.19.60" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-display-name" isChinaVersion />

定义方块在物品栏的悬浮文本。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="string" name="minecraft:display_name"/>：定义方块的悬浮文本。不指定此组件时，默认为`tile.(方块 ID).name`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:display_name": "tile.test:custom_block.name"
```

</TabItem></Tabs>

---

### `minecraft:destructible_by_explosion`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_destructible_by_explosion?view=minecraft-bedrock-stable"/> <Version version="1.19.20" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-destructible-by-explosion" isChinaVersion />

定义方块是否可被爆炸破坏，及其爆炸抗性。

<Tabs><TabItem value="参数" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:destructible_by_explosion"/>：根对象。
  - <DataType type="float" name="explosion_resistance"/>：定义方块的爆炸抗性。默认值为`0`。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:destructible_by_explosion"/>：定义方块是否可被爆炸破坏。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:destructible_by_explosion": {
    "explosion_resistance": 20.0
}
```

**布尔型**：

```json showLineNumbers
"minecraft:destructible_by_explosion": false
```

</TabItem></Tabs>

---

### `minecraft:destructible_by_mining`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_destructible_by_mining?view=minecraft-bedrock-stable"/> <Version version="1.19.20" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-destructible-by-mining" isChinaVersion />

定义方块是否可被挖掘，及其挖掘时长。

<Tabs><TabItem value="参数" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:destructible_by_mining"/>：根对象。
  - <DataType type="float" name="seconds_to_destroy"/>：定义方块的挖掘*破坏时长*。
  - <DataType type="array" name="item_specific_speeds"/>：（1.21.50+）定义使用特定物品破坏此方块时的速度。
    - <DataType type="object"/>
      - <DataType type="string" name="item"/>：（写法 1）定义该物品的 ID。
      - <DataType type="object" name="item"/>：（写法 2）定义符合特定标签的物品。
        - <DataType type="string" name="tags"/>：检查物品是否具有特殊的标签。应指定为[检查标签的 Molang](../items/molang#物品标签)。原版可用的物品标签详见[物品标签](../items/tags#原版使用的标签)。
      - <DataType type="float" name="destroy_speed"/>：定义方块的*破坏时长*。

</treeview>

> **注意**：这里的*破坏时长*实际上为[**硬度**](https://zh.minecraft.wiki/w/挖掘#方块硬度)的概念。在一般情况下，破坏时长（秒）是硬度的 1.5 倍，比如硬度为 1 时，需要 1.5 秒破坏。

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:destructible_by_mining"/>：定义方块是否可被挖掘破坏。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:destructible_by_mining": {
    "seconds_to_destroy": 1.0
}
```

```json showLineNumbers
"minecraft:destructible_by_mining": {
    "seconds_to_destroy": 1.0,
    "item_specific_speeds": [
        {
            "item": "minecraft:diamond_pickaxe",
            "destroy_speed": 5.0
        },
        {
            "item": { "tags": "query.any_tag('minecraft:is_sword')" },
            "destroy_speed": 10.0
        }
    ]
}
```

**布尔型**：

```json showLineNumbers
"minecraft:destructible_by_mining": false
```

</TabItem></Tabs>

---

### `minecraft:map_color`

<Version version="1.12.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_map_color?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-map-color" isChinaVersion />

定义方块在地图（物品）上显示的颜色。

<Tabs><TabItem value="参数" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:map_color"/>：根对象
  - <DataType type="string" name="color" isRequired/>：定义方块在地图物品上显示的颜色，应为颜色代码`#RRGGBB`。
  - <DataType type="string" name="tint_method"/>：（1.21.80+）定义方块的着色方法，将方块颜色与预定义的色调相乘，可选值为`none`、`​default_foliage`、`​birch_foliage`、`​evergreen_foliage`、`​grass`和​`water`。默认值为`none`。
</treeview>

**字符串型（1.16.0+）**：

<treeview>
- <DataType type="string" name="minecraft:map_color"/>：定义方块在地图物品上显示的颜色，应为颜色代码`#RRGGBB`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:map_color": {
    "color": "#FFFFFF",
    "tint_method": "grass"
}
```

```json showLineNumbers
"minecraft:map_color": "#FFFFFF"
```

</TabItem></Tabs>

---

### `minecraft:selection_box`

<Version version="1.19.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_selection_box?view=minecraft-bedrock-stable"/>

定义方块的选择箱。

<Tabs><TabItem value="参数" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:selection_box"/>：根对象。
  - <DataType type="array" name="origin"/>：定义方块选择箱源坐标，`[0, 0, 0]`为底面中心点的坐标。默认值为`[-8, 0, -8]`。
    - <DataType type="int" name="0"/>：基于源坐标的 X 坐标（像素）偏移值。必须在`-8`~`8`之间（含）。
    - <DataType type="int" name="1"/>：基于源坐标的 Y 坐标（像素）偏移值。必须在`0`~`16`之间（含）。
    - <DataType type="int" name="2"/>：基于源坐标的 Z 坐标（像素）偏移值。必须在`-8`~`8`之间（含）。
  - <DataType type="array" name="size"/>：定义方块选择箱基于源坐标的大小。默认值为`[16, 16, 16]`。
    - <DataType type="int" name="0"/>：X 方向的方块大小。与`origin`的 X 坐标相加后必须在`-8`~`8`之间（含）。
    - <DataType type="int" name="1"/>：Y 方向的方块大小。与`origin`的 Y 坐标相加后必须在`0`~`16`之间（含）。
    - <DataType type="int" name="2"/>：Z 方向的方块大小。与`origin`的 Z 坐标相加后必须在`-8`~`8`之间（含）。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:selection_box"/>：定义方块是否具有选择箱。默认为`true`，且使用 16×16×16 像素的选择箱大小。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**对象型**（半砖尺寸）：

```json showLineNumbers
"minecraft:selection_box": {
    "origin": [-8, 0, -8],
    "size": [16, 8, 16]
}
```

**布尔型**（正常方块尺寸）：

```json showLineNumbers
"minecraft:selection_box": true
```

</TabItem></Tabs>

---

### `minecraft:tags`

<Version version="1.26.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_tag?view=minecraft-bedrock-stable"/>

定义方块的标签。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---
---

## 外观性组件

定义方块外观的组件，包括采用的自定义材质、模型和贴图等。

---

### `minecraft:geometry`

<Version version="1.19.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_geometry?view=minecraft-bedrock-stable"/>

定义方块的模型和使用的方块面剔除规则。

:::warning[注意]

在高于`1.21.80`的格式版本中，要使用该组件，必须同时定义[`minecraft:material_instances`](#minecraftmaterial_instances)组件。

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:geometry"/>：根对象
  - <DataType type="string" name="identifier" isRequired/>：定义方块使用的方块模型。可指定[原版使用的方块模型](./model#原版使用的方块模型)，或指定在<FileType type="folder" name="models"/> - <FileType type="folder" name="block"/> - <FileType type="file" name="*.geo.json"/>中所定义的方块模型。详见[方块模型](./model)。
  - <DataType type="object" name="bone_visibility"/>：（1.19.80+）定义方块骨骼可见性。
    - <DataType type="boolean" name="(骨骼 ID)"/>：（写法 1）定义`骨骼 ID`是否可见。默认值为`true`。
    - <DataType type="string" name="(骨骼 ID)"/>：（写法 2，1.20.10+）定义`骨骼 ID`是否可见，需指定 [Molang 表达式](./molang)（常用`query.block_state()`）。
  - <DataType type="string" name="culling"/>：（1.20.60+）定义方块采用何种面剔除规则。详见[方块面剔除](./culling)。不指定时则不进行面剔除。
  - <DataType type="string" name="culling_layer"/>：（1.21.90+）定义方块面剔除层。当在[面剔除规则](./culling)的`condition`中指定了`same_culling_layer`条件后，会在此方块在和临近方块使用相同的面剔除层时进行剔除。习惯上定义为`(命名空间):culling_layer.(面剔除层 ID)`。  
  原版有两个内置的面剔除层，包括`minecraft:culling_layer.undefined`（默认值）、`minecraft:culling_layer.leaves`（树叶剔除模式）。
  - <DataType type="string" name="culling_shape"/>：（26.20+，需开启「实验性 Voxel 形状特征」实验性玩法）定义方块面剔除体素。默认值为`minecraft:empty`。详见[按体素剔除面](./culling#按体素剔除面)。
  - <DataType type="boolean"/><DataType type="array" name="uv_lock"/>：（1.21.100+）是否锁定 UV 面。若锁定 UV 面，则方块的 UV 不会随着[`minecraft:transformation`](#minecrafttransformation)组件的旋转而旋转。默认值为`false`。
    - <DataType type="string"/>：当指定为数组形式时，可指定为骨骼 ID 的数组，以确保这些骨骼不会随着[`minecraft:transformation`](#minecrafttransformation)组件的旋转而旋转。
</treeview>

**字符串型**：

<treeview>
- <DataType type="string" name="minecraft:geometry"/>：定义方块使用的方块模型。可指定[原版使用的方块模型](./model#原版使用的方块模型)，或指定在<FileType type="folder" name="models"/> - <FileType type="folder" name="block"/> - <FileType type="file" name="*.geo.json"/>中所定义的方块模型。详见[方块模型](./model)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:geometry": {
    "identifier": "minecraft:geometry.full_block",
    "uv_lock": true
}
```

```json showLineNumbers
"minecraft:geometry": {
    "identifier": "geometry.full_block",
    "culling": "test:culling.glass"
}
```

**字符串型**：

```json showLineNumbers
"minecraft:geometry": "minecraft:geometry.full_block"
```

</TabItem></Tabs>

---

### `minecraft:material_instances`

<Version version="1.19.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_material_instances?view=minecraft-bedrock-stable"/>

定义方块的材质和贴图实例。这个组件可以按照给定的方块模型的要求，将特定的材质和贴图应用到给定的模型上，并控制其他的渲染参数。

:::warning[注意]

在高于`1.21.80`的格式版本中，要使用该组件，必须同时定义[`minecraft:geometry`](#minecraftgeometry)组件。

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:material_instance"/>：根对象
  - <DataType type="object" name="(材质实例)"/>：定义方块的面如何实例化。`(材质实例)`可指定为原版内置的`east`、`west`、`south`、`north`、`up`、`down`、`*`（应用到所有面上）或在[模型文件](./model#方块模型文件格式)中定义的`material_instance`参数（以应用到这些面上）。  
  在`1.21.80`及之前的格式版本，必须指定`*`的实例。
    - <DataType type="string" name="texture" isRequired/>：定义方块的贴图。会对指定的面使用[`terrain_texture.json`](./description#terrain_texturejson)中定义的对应的贴图路径。
    - <DataType type="string" name="render_method"/>：定义方块的材质。所有材质实例应使用相同的材质。可选值见下表，默认值为`opaque`。
    - <DataType type="string" name="tint_method"/>：（1.21.80+）定义对方块进行特殊着色。通常在雨天或特定温度的生物群系下使用特殊的着色方法。可选值为`none`（默认值）、`default_foliage`、`birch_foliage`、`evergreen_foliage`、`dry_foliage`、`grass`或`water`。
    - <DataType type="boolean" name="alpha_masked_tint"/>：（1.26.0+）定义是否在 alpha 通道上对方块进行<DataType type="string" name="tint_method"/>定义的特殊着色。默认值为`false`。
    - <DataType type="string"/><DataType type="float" name="ambient_occlusion"/>：定义方块是否启用环境光遮蔽，这会影响方块的平滑光照效果。对于发光方块默认为`false`，不发光方块默认为`true`。  
    （1.21.60+）指定为浮点数时即指定环境光遮蔽强度，可指定为`0.0`-`10.0`（含），`false`对应`0.0`，`true`对应`1.0`。  
    可见「部分渲染参数对比图」。
    - <DataType type="boolean" name="face_dimming"/>：定义是否调暗方块面。对于发光方块默认为`false`，不发光方块默认值为`true`。  
    可见「部分渲染参数对比图」。
    - <DataType type="boolean" name="isotropic"/>：（1.21.80+）定义是否设置方块贴图为各向同性。这会根据方块所处的位置随机地旋转贴图。默认值为`false`。  
    可见「部分渲染参数对比图」。
</treeview>

`render_method`的可用值有（可点击背面剔除 / 远距剔除查看相关概念）：

| 可选值 | 描述 | 完全透明 | 半透明 | [背面剔除](./culling#背面剔除) | [远距剔除](./culling#远距剔除) | 原版实例 |
| --- | --- | --- | --- | --- | --- | --- |
| `opaque` | 定义方块不透明。 | ❌ | ❌ | ✔️ | ❌ | 泥土、石头等一般方块 |
| `double_sided` | 定义方块不透明且前后均可见。 | ❌ | ❌ | ❌ | ❌ | 细雪 |
| `alpha_test` | 定义方块完全透明。 | ✔️ | ❌ | ❌ | ✔️ | 刷怪笼、梯子等 |
| `alpha_test_single_sided` | 定义方块完全透明，仅前面可见。 | ✔️ | ❌ | ✔️ | ✔️ | 门、活板门 |
| `blend` | 定义方块完全透明或半透明。 | ✔️ | ✔️ | ✔️ | ❌ | 玻璃、染色玻璃等 |

| 可选值 | 描述 | 原版实例 |
| --- | --- | --- |
| `alpha_test_to_opaque` | （1.21.80+）近距时渲染为`alpha_test`，远距时渲染为`opaque` | 树叶 |
| `alpha_test_single_sided_to_opaque` | （1.21.80+）近距时渲染为`alpha_test_single_sided`，远距时渲染为`opaque` | 海带、甘蔗 |
| `blend_to_opaque` | （1.21.80+）近距时渲染为`blend`，远距时渲染为`opaque` | —— |

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:material_instance": {
    "*": {
        "texture": "stone",
        "isotropic": true
    }
}
```

```json showLineNumbers
"minecraft:material_instance": {
    "*": {
        "texture": "stone",
        "ambient_occlusion": false,
        "face_dimming": false
    }
}
```

```json showLineNumbers
"minecraft:material_instance": {
    "*": {
        "texture": "glass",
        "render_method": "blend"
    }
}
```

</TabItem><TabItem value="部分渲染参数对比图" label="部分渲染参数对比图">

<Image src="/img/docs/docs/blocks/components/ambient_occlusion_1.png" text="环境光遮蔽（ambient occlusion），左侧为开，右侧为关，可见右侧的方块似乎禁用了平滑光照，这可以提升性能"/>

<Image src="/img/docs/docs/blocks/components/ambient_occlusion_2.png" text="环境光遮蔽（ambient occlusion），左侧为 0.0，右侧为 7.5，可见很强烈的遮蔽现象"/>

<Image src="/img/docs/docs/blocks/components/face_dimming_1.png" text="方块面调暗（face dimming），左侧为关，右侧为开，可见左侧的方块面显然更亮"/>

<Image src="/img/docs/docs/blocks/components/isotropic_1.png" text="各向同性（isotropic），左侧为关，右侧为开，可见右侧的方块面被随机旋转"/>

</TabItem></Tabs>

---

### `minecraft:destruction_particles`

<Version version="1.21.80" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_destruction_particles?view=minecraft-bedrock-stable"/>

定义方块被破坏后掉落的粒子。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:destruction_particles"/>：根对象。
  - <DataType type="int" name="particle_count"/>：（1.21.100+）破坏方块释放的粒子数量。应为`0`-`255`（含），默认为`100`。
  - <DataType type="string" name="texture"/>：粒子调用的贴图。使用[`terrain_texture.json`](./description#terrain_texturejson)中定义的对应的贴图路径。默认使用此方块底部的贴图。
  - <DataType type="string" name="tint_method"/>：定义对粒子进行特殊着色。通常在雨天或特定温度的生物群系下使用特殊的着色方法。可选值为`none`（默认值）、`default_foliage`、`birch_foliage`、`evergreen_foliage`、`dry_foliage`、`grass`或`water`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:destruction_particles": {
    "particle_count": 255,
    "texture": "dirt"
}
```

</TabItem></Tabs>

---

### `minecraft:embedded_visual`

<Version version="1.21.120" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_embedded_visual?view=minecraft-bedrock-stable"/>

定义了方块嵌入另一方块（如花盆）时需要使用的`geometry`和`​material_instances`。

:::warning[注意]

此组件不可定义在方块置换<DataType type="object" name="permutations"/>内。

:::

:::tip[提示]

目前，该组件只适用于花盆。因此，要使用此组件，请事先定义[`minecraft:flower_pottable`](#minecraftflower_pottable)组件。

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:embedded_visual"/>：根对象。
  - <DataType type="object" name="geometry"/>：定义方块在其他方块内使用的模型。可写入的内容详见[`minecraft:geometry`](#minecraftgeometry)组件。
  - <DataType type="object" name="material_instance"/>：定义方块在其他方块内使用的材质贴图实例。可写入的内容详见[`minecraft:material_instance`](#minecraftmaterial_instance)组件。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:embedded_visual": {
    "geometry": { "identifier": "minecraft:geometry.full_block" },
    "material_instances": { "*": { "texture": "dirt" } }
}
```

</TabItem></Tabs>

---

### `minecraft:item_visual`

<Version version="1.21.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_item_visual?view=minecraft-bedrock-stable"/>

定义方块在物品栏中和手持时需要使用的`geometry`和`​material_instances`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:item_visual"/>：根对象。
  - <DataType type="object" name="geometry"/>：定义方块在物品栏中和手持时使用的模型。可写入的内容详见[`minecraft:geometry`](#minecraftgeometry)组件。
  - <DataType type="object" name="material_instance"/>：定义方块在物品栏中和手持时使用的材质贴图实例。可写入的内容详见[`minecraft:material_instance`](#minecraftmaterial_instance)组件。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:item_visual": {
    "geometry": { "identifier": "minecraft:geometry.full_block" },
    "material_instances": { "*": { "texture": "dirt" } }
}
```

</TabItem></Tabs>

---
---

## 功能性组件

特定类型的方块可用的组件。

| 常见方块类型 | 常用组件 | 最低适用版本 |
| :---: | :--- | --- |

---

### `minecraft:chest_obstruction`

<Version version="1.26.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_chest_obstruction?view=minecraft-bedrock-stable"/>

定义方块是否可阻挡箱子打开。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `minecraft:crafting_table`

<Version version="1.19.50" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_crafting_table?view=minecraft-bedrock-stable"/>

定义方块为一种工作台。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:crafting_table"/>：根对象。
  - <DataType type="array" name="crafting_tags" isRequired/>：定义工作台的标签，这可以用于[配方表](../items/recipes)。
  - <DataType type="array" name="table_name"/>：定义工作台的 UI 文本，可以使用语言文件的键名。默认值为`(方块 ID)`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:crafting_table": {
    "crafting_tags": ["crafting_table", "stonecutter"],
    "table_name": "test:crafting_table.crafting"
}
```

</TabItem></Tabs>

---

### `minecraft:connection_rule`

<Version version="1.26.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_connection_rule?view=minecraft-bedrock-stable"/>

定义方块和其他方块的连接规则。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:connection_rule"/>：根数组。
  - <DataType type="string" name="accepts_connections_from"/>：允许何种方块连接到此方块。可选值为`none`（禁止其他方块连接到此方块）、`only_fence`（只允许栅栏连接到此方块）、`all`（默认值，允许栅栏、墙、玻璃板等连接到此方块）。
  - <DataType type="array" name="enabled_directions"/>：若允许其他方块连接此方块，允许从何方向连接此方块。默认为`["north", "south", "west", "east"]`。
    - <DataType type="string"/>：可选值为`east`、`west`、`south`、`north`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:connection_rule": {
    "accepts_connections_from": "only_fence",
    "enabled_directions": ["north", "south", "west", "east"]
}
```

</TabItem></Tabs>

---

### `minecraft:entity_fall_on`

<Version version="1.21.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_entity_fall_on?view=minecraft-bedrock-stable"/>

定义实体在多高处落到该方块上之后，才能触发 ScriptAPI 中自定义方块组件定义的[`onEntityFallOn`事件](./custom_components#onentityfallon属性)。

:::warning[注意]

该组件必须配合 ScriptAPI 使用，因此该组件在现在或未来的中国版也是无效的。

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:entity_fall_on"/>：根数组。
  - <DataType type="float" name="min_fall_distance"/>：在从多高的高度掉落到该方块上后，才能触发 ScriptAPI 中自定义方块组件定义的[`onEntityFallOn`事件](./custom_components#onentityfallon属性)。默认值为`1`。
</treeview>

> **注意**：经过实测，Microsoft Learn 给出的`minimum_fall_distance`是错误写法，请使用本文档给出的写法。参见[Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-components#entity-fall-on)。

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:entity_fall_on": {
    "min_fall_distance": 3
}
```

</TabItem></Tabs>

---

### `minecraft:flammable`

<Version version="1.12.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_flammable?view=minecraft-bedrock-stable"/>

定义方块为可燃方块。

<Tabs><TabItem value="参数" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:flammable"/>：根对象
  - <DataType type="int" name="burn_odds"/>（1.19.0-） / <DataType type="int" name="destroy_chance_modifier"/>（1.19.10+）：定义方块在燃烧时有多大可能被烧毁。默认值为`20`（木板）。
  - <DataType type="int" name="flame_odds"/>（1.19.0-） / <DataType type="int" name="catch_chance_modifier"/>（1.19.10+）：定义方块有多大可能被点燃。默认值为`5`（木板）。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:flammable"/>：（1.19.10+）定义方块是否可燃。指定为`true`时将使用默认值。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**格式版本 1.16.X 及更低**：

```json showLineNumbers
"minecraft:flammable": {
    "flame_odds": 5,
    "burn_odds": 20
}
```

**格式版本 1.19.10 及更高（布尔型）**：

```json showLineNumbers
"minecraft:flammable": true
```

**格式版本 1.19.10 及更高（对象型）**：

```json showLineNumbers
"minecraft:flammable": {
    "catch_chance_modifier": 5,
    "destroy_chance_modifier": 20
}
```

</TabItem></Tabs>

---

### `minecraft:flower_pottable`

<Version version="1.21.120" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_flower_pottable?view=minecraft-bedrock-stable"/>

定义方块可种植在花盆内。

:::warning[注意]

1. 此组件不可定义在方块置换<DataType type="object" name="permutations"/>内。
2. 要更改方块在花盆内的显示效果，见组件[`minecraft:embedded_visual`](#minecraftembedded_visual)。

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:flower_pottable"/>：根对象，不含任何参数。定义方块可种植在花盆内。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:flower_pottable": { }
```

</TabItem></Tabs>

---

### `minecraft:friction`

<Version version="1.12.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_friction?view=minecraft-bedrock-stable"/>

定义方块的摩擦系数。

<Tabs><TabItem value="参数" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:friction"/>：根对象
  - <DataType type="int" name="value"/>：定义方块的移动系数。移动系数越高则方块越光滑。应在`0.0`-`0.9`之间（含）。
</treeview>

**格式版本 1.16.0 - 1.19.10**：

<treeview>
- <DataType type="int" name="minecraft:friction"/>：定义方块的移动系数。移动系数越高则方块越光滑。应在`0.0`-`0.9`之间（含）。
</treeview>

> **注意**：在格式版本`1.19.20`前，指定的系数是移动系数而不是摩擦系数，值越高方块越光滑。

**格式版本 1.19.20 及更高**：

<treeview>
- <DataType type="int" name="minecraft:friction"/>：定义方块的摩擦系数。摩擦系数越低则方块越光滑。应在`0.0`-`0.9`之间（含）。默认值为`0.4`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:friction": {
    "value": 0.4
}
```

**格式版本 1.16.X 或 1.19.20 及更高**：

```json showLineNumbers
"minecraft:friction": 0.4
```

</TabItem></Tabs>

---

### `minecraft:leashable`

<Version version="1.26.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_leashable?view=minecraft-bedrock-stable"/>

定义方块可用拴绳连接，类似于栅栏。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:leashable"/>：根对象。
  - <DataType type="array" name="offset"/>：定义拴绳的绑定位置相对方块底部中心处的偏移。应为一个<DataType type="float"/>的三元数组。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:leashable": {
    "offset": [ 0, 12, 0 ]
}
```

</TabItem><TabItem value="效果图" label="效果图">

<Image src="/img/docs/docs/blocks/components/leashable_1.png" text="offset 的效果，左[0, 12, 0]，右[0, 0, 0]" />

</TabItem></Tabs>

---

### `minecraft:light_dampening`

<Version version="1.19.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_light_dampening?view=minecraft-bedrock-stable"/> <Version version="1.19.20" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-light-dampening" isChinaVersion />

定义方块会吸收光，降低光照等级。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="int" name="minecraft:light_dampening"/>：定义方块减弱的光照强度。应在`0`-`15`之间（含）。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:light_dampening": 15
```

</TabItem></Tabs>

---

### `minecraft:light_emission`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_light_emission?view=minecraft-bedrock-stable"/> <Version version="1.19.20" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-light-emission" isChinaVersion />

定义方块会发出光，提供光照等级。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="int" name="minecraft:light_emission"/>：定义方块发出的光照强度。应在`0`-`15`之间（含），如不指定该组件则该方块不发光。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:light_emission": 15
```

</TabItem></Tabs>

---

### `minecraft:liquid_detection`

<Version version="1.21.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_liquid_detection?view=minecraft-bedrock-stable"/>

定义方块在接触到液体后的行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:liquid_detection"/>：根对象。
  - <DataType type="array" name="detection_rules"/>：根对象。
    - <DataType type="object"/>
      - <DataType type="string" name="liquid_type"/>：方块检查何种液体的行为。可选值为`water`（水）。默认值为`water`。
      - <DataType type="string" name="can_contain_liquid"/>：方块是否可以容纳该液体。默认值为`false`。若为`true`则代表方块可含水。
      - <DataType type="string" name="on_liquid_touches"/>：方块在接触到该液体时触发何种行为。可选值为`blocking`（默认值，阻挡水流过）、`broken`（打破该方块）、`no_reaction`（水正常流过）、`popped`（打破该方块并掉落物品）。
      - <DataType type="array" name="stops_liquid_flowing_from_direction"/>：阻止液体从方块的何种方向流出。若<DataType type="string" name="on_liquid_touches"/>指定为`no_reaction`，则还阻止液体从方块的何种方向流入。
        - <DataType type="string"/>：可指定为`east`、`west`、`north`、`south`、`up`、`down`六面。
      - <DataType type="boolean" name="use_liquid_clipping"/>：（1.26.0+）根据碰撞箱裁剪液体的实际渲染效果。默认为`false`，但对于格式版本`1.26.0`之前的版本默认为`true`。  
        > 在实践中未能成功验证参数`use_liquid_clipping`的效果，需要更多信息。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:liquid_detection": {
    "detection_rules": [
        { "on_liquid_touches": "blocking" }
    ]
}
```

```json showLineNumbers
"minecraft:liquid_detection": {
    "detection_rules": [
        {
            "can_contain_liquid": true,
            "stops_liquid_flowing_from_direction": [ "up" ]
        }
    ]
}
```

</TabItem><TabItem value="效果图" label="效果图">

<Image src="/img/docs/docs/blocks/components/liquid_detection_1.png" text="on_liquid_touches 各参数的效果"/>
<Image src="/img/docs/docs/blocks/components/liquid_detection_2.png" text="stops_liquid_flowing_from_direction 各参数的效果 ①：可含水且阻止水从侧面流出，②：可含水且阻止水从底面流出（可见图中方块下方没有水），③：可含水且阻止水从上面流出（可见图中方块下方没有水），④：水可流过方块且阻止水从侧面流出（可见下方的方块被水穿过）"/>

</TabItem></Tabs>

---

### `minecraft:loot`

<Version version="1.12.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_loot?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-loot" isChinaVersion />

定义方块被破坏后的战利品表。

<Tabs><TabItem value="参数" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:loot"/>：根对象
  - <DataType type="string" name="table"/>：定义方块使用的战利品表，需带有`loot_tables/`和`.json`后缀。
</treeview>

**格式版本 1.16.X 及更高**：

<treeview>
- <DataType type="string" name="minecraft:loot"/>：定义方块使用的战利品表，需带有`loot_tables/`和`.json`后缀。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:loot": {
    "table": "loot_tables/blocks/my_custom_block.json"
}
```

**格式版本 1.16.X 及更高**：

```json showLineNumbers
"minecraft:loot": "loot_tables/blocks/my_custom_block.json"
```

</TabItem></Tabs>

---

### `minecraft:movable`

<Version version="1.21.100" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_movable?view=minecraft-bedrock-stable"/>

定义方块是否可被活塞推动，及其属性。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movable"/>：根对象
  - <DataType type="string" name="movement_type" isRequired/>：定义方块被试图推动后的行为。可选值为`immovable`（无法推动）、`popped`（被破坏）、`push`（只可推动）或`push_pull`（可推动且可拉回，默认值）。
  - <DataType type="string" name="sticky"/>：是否具有粘性，类似于粘液块或蜂蜜块。仅当<DataType type="string" name="movement_type" isRequired/>指定为`push_pull`时可用。可选值为`same`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:movable": {
    "movement_type": "push"
}
```

</TabItem></Tabs>

---

### `minecraft:placement_filter`

<Version version="1.19.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_placement_filter?view=minecraft-bedrock-stable"/>

定义方块允许被放置或允许存在的条件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:placement_filter"/>：根对象。
  - <DataType type="array" name="conditions" isRequired/>：定义方块允许放置或允许存在的条件。哪怕已被放置，在不满足条件时仍会掉落对应的物品形式。
    - <DataType type="object"/>
      - <DataType type="array" name="allow_faces"/>：定义可以放置于其他方块的哪个或哪些面上。默认值为`["all"]`。
        - <DataType type="string"/>：可选值：`all`、`side`、`down`、`up`、`north`、`south`、`west`和`east`。
      - <DataType type="array" name="block_filter"/>：定义可以放置于何种方块上。默认值为`[{"tags":"1"}]`。
        - <DataType type="string"/>：（写法 1）方块 ID。
        - <DataType type="object"/>：（写法 2）特定状态的方块。
          - <DataType type="string" name="name"/>：方块 ID。
          - <DataType type="object" name="state"/>：方块状态。
            - <DataType type="int"/><DataType type="boolean"/><DataType type="string" name="(方块状态 ID)"/>
        - <DataType type="object"/>：（写法 3）特定标签的方块。
          - <DataType type="string" name="tags"/>：[方块标签](./tags)。需指定为一个 Molang（通常使用`query.any_tag()`或`query.all_tags()`），默认值为`"1"`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:placement_filter": {
    "conditions": [
        {
            "allowed_faces": [ "up" ],
            "block_filter": [ "minecraft:grass_block" ]
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:precipitation_interactions`

<Version version="1.21.130" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_precipitation_interactions?view=minecraft-bedrock-stable"/>

定义方块在雨雪天气下如何和环境交互。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `minecraft:random_offset`

<Version version="1.21.100" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_random_offset?view=minecraft-bedrock-stable"/>

定义方块的碰撞箱、选择箱和模型如何随机产生偏移。类似于原版的草。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:random_offset"/>：根对象。
  - <DataType type="object" name="(坐标轴)"/>：方块在何坐标轴上产生偏移。`(坐标轴)`可指定为`x`、`y`、`z`。
    - <DataType type="object" name="range"/>：偏移范围。
      - <DataType type="int" name="min"/>：最小的偏移值。
      - <DataType type="int" name="max"/>：最大的偏移值。
    - <DataType type="int" name="steps"/>：随机值的步长，设置为`0`时则可以取到<DataType type="object" name="range"/>的任意一个随机数。  
      > 例如，设置`range`为`-8`~`8`且`steps`为`2`时，则随机值只可能为 -8, -6, -4, ..., 6, 8。

</treeview>

> **注意**：设定的偏移值不能够超出方块模型的限制——即方块必须限定在 30×30×30 像素的范围内。这意味着偏移值不能设定为无限大的，必须限定在原位置附近。

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:random_offset": {
    "x": { "range": { "min": -1, "max": 1 }, "steps": 0 }
}
```

</TabItem><TabItem value="效果图" label="效果图">

<Image src="/img/docs/docs/blocks/components/random_offset_1.png" text="random_offset 的效果" size="75%"/>

</TabItem></Tabs>

---

### `minecraft:redstone_conductivity`

<Version version="1.21.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_redstone_conductivity?view=minecraft-bedrock-stable"/>

定义方块的红石导体属性。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:redstone_conductivity"/>：根对象。
  - <DataType type="boolean" name="allows_wire_to_step_down"/>：定义红石线路能否沿着方块向下传导。默认值为`true`。
  - <DataType type="boolean" name="redstone_conductor"/>：定义该方块为红石导体。默认值为`false`。
</treeview>

> 是的，自定义方块默认不是红石导体。

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:redstone_conductivity": {
    "allows_wire_to_step_down": true,
    "redstone_conductor": true
}
```

</TabItem></Tabs>

---

### `minecraft:redstone_consumer`

<Version version="1.26.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_redstone_consumer?view=minecraft-bedrock-stable"/>

定义方块为一种用电器，并并触发 ScriptAPI 中自定义方块组件定义的[`onRedstoneUpdate`事件](./custom_components#onredstoneupdate属性)，将自己获得的红石信号强度传递给脚本。

:::warning[注意]

此组件不可定义在方块置换<DataType type="object" name="permutations"/>内。

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:redstone_consumer"/>：根对象。
  - <DataType type="int" name="min_power"/>：至少为多少信号才能触发[`onRedstoneUpdate`事件](./custom_components#onredstoneupdate属性)。
  - <DataType type="boolean" name="propagates_power"/>：是否能够继续传播红石信号。默认为`false`。不受<DataType type="int" name="min_power"/>的影响。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:redstone_consumer": {
    "min_power": 15,
    "propagates_power": true
}
```

</TabItem><TabItem value="效果图" label="效果图">

<Image src="/img/docs/docs/blocks/components/redstone_consumer_1.png" text="propagates_power 的效果，上 true 下 false"/>

</TabItem></Tabs>

---

### `minecraft:redstone_producer`

<Version version="1.21.120" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_redstone_producer?view=minecraft-bedrock-stable"/>

定义方块产生红石信号。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:redstone_producer"/>：根对象。
  - <DataType type="int" name="power" isRequired/>：方块产生的红石信号强度。必须在`0`-`15`之间（含）。
  - <DataType type="string" name="strongly_powered_face" isRequired/>：方块对何面产生强充能。可选值为`east`、`west`、`south`、`north`、`up`、`down`。
  - <DataType type="array" name="connected_faces"/>：方块可以从哪些方向引出红石信号。默认从所有方向均可引出红石信号。
    - <DataType type="string"/>：可选值为`east`、`west`、`south`、`north`、`up`、`down`。
  - <DataType type="boolean" name="transform_relative"/>：方块的强充能面和引出红石信号面是否会随着[`minecraft:transformation`](#minecrafttransformation)组件而旋转。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:redstone_producer": {
    "power": 15,
    "strongly_powered_face": "up",
    "connected_faces": [ "east", "west" ]
}
```

</TabItem><TabItem value="效果图" label="效果图">

<Image src="/img/docs/docs/blocks/components/redstone_producer_1.png" text="将 strongly_powered_face 设置为 up 的效果，可见上方的方块被强充能"/>

<Image src="/img/docs/docs/blocks/components/redstone_producer_2.png" text="将 connected_faces 设置为 ['east', 'west'] 的效果，可见只有东西向的红石线路被充能"/>

</TabItem></Tabs>

---

### `minecraft:replaceable`

<Version version="1.21.70" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_replaceable?view=minecraft-bedrock-stable"/>

定义方块是否可被另一种方块在原位替代（类似于水、草丛或空气）。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:replaceable"/>：根对象，不含任何参数。定义方块可被另一种方块在原位替代。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:replaceable": { }
```

</TabItem></Tabs>

---

### `minecraft:support`

<Version version="1.26.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_support?view=minecraft-bedrock-stable"/>

定义方块为可支撑方块，例如可用于悬吊灯笼等。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:support"/>：根对象。
  - <DataType type="string" name="shape"/>：可选值为`fence`或`stair`。  
    `fence`形状类似于栅栏，规定侧面不可支撑，而顶面底面可以支撑（例如灯笼）。  
    `stair`形状类似于楼梯或台阶，规定底面可支撑（但必须使用[`minecraft:placement_position`](./traits#minecraftplacement_position)方块特征的`minecraft:vertical_half`方块状态）和侧面可支撑（但必须使用[`minecraft:placement_direction`](./traits#minecraftplacement_direction)方块特征的`minecraft:cardinal_direction`方块状态或`minecraft:facing_direction`方块状态）。未指定对应方块特征时则不能支撑。  
    在未指定此组件时，自定义方块默认被视作完整方块，所有面均可支撑。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:support": {
    "shape": "fence"
}
```

</TabItem><TabItem value="效果图" label="效果图">

<Image src="/img/docs/docs/blocks/components/support_1.png" text="shape 的效果"/>

</TabItem></Tabs>

---

### `minecraft:tick`

<Version version="1.21.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_tick?view=minecraft-bedrock-stable"/>

定义方块的更新频率，并触发 ScriptAPI 中自定义方块组件定义的[`onTick`事件](./custom_components#ontick属性)。

:::warning[注意]

该组件必须配合 ScriptAPI 使用，因此该组件在现在或未来的中国版也是无效的。

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:tick"/>：根数组。
  - <DataType type="array" name="interval_range" isRequired/>：间隔多久执行一次[`onTick`事件](./custom_components#ontick属性)。
    - <DataType type="int" name="0"/>：最短在多少游戏刻内执行一次事件。
    - <DataType type="int" name="1"/>：最长在多少游戏刻内执行一次事件。
  - <DataType type="boolean" name="looping"/>：是否循环执行更新事件。默认值为`true`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:tick": {
    "interval_range": [ 20, 100 ],
    "looping": true
}
```

</TabItem></Tabs>

---

### `minecraft:transformation`

<Version version="1.19.80" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_transformation?view=minecraft-bedrock-stable"/>

定义方块模型与碰撞箱的平移、旋转与缩放变换。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:transformation"/>：根对象。
  - <DataType type="array" name="rotation_pivot"/>：（1.21.0+）旋转枢轴，默认的`[0, 0, 0]`为方块底部中心位置。应为一个<DataType type="float"/>的三元数组。
  - <DataType type="array" name="rotation"/>：相对于旋转枢轴的旋转值。应为一个<DataType type="float"/>的三元数组。
  - <DataType type="array" name="scale_pivot"/>：（1.21.0+）尺寸枢轴，默认的`[0, 0, 0]`为方块底部中心位置。应为一个<DataType type="float"/>的三元数组。
  - <DataType type="array" name="scale"/>：相对于尺寸枢轴调整的尺寸值。应为一个<DataType type="float"/>的三元数组。
  - <DataType type="array" name="translation"/>：偏移值。应为一个<DataType type="float"/>的三元数组。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:transformation": {
    "rotation": [180, 0, 0]
}
```

</TabItem></Tabs>

---
---

## 中国版组件

中国版组件只适用于定义在<FileType type="folder" name="netease_blocks"/>中的方块（即中国版方块）。因为中国版方块基于较旧格式的中国版组件，因此部分已被国际版弃用的旧版方块组件也在其中。

其中，下述部分方块组件有国际版组件的平替，或组件的部分功能有国际版组件的平替。

| 中国版组件 | 国际版可用的平替组件 | 国际版组件需求的最低格式版本 |
| :--- | :--- | --- |
| `minecraft:block_light_absorption` | [`minecraft:light_dampening`](#minecraftlight_dampening) | 1.19.10 |

### `minecraft:block_light_absorption`

<Version version="1.12.0" toVersion="1.18.0"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-block-light-absorption" isChinaVersion />

定义方块会吸收光，降低光照等级。

<Tabs><TabItem value="参数" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:block_light_absorption"/>：根对象
  - <DataType type="int" name="value"/>：定义方块会吸收多少光照等级（也可以代表其透光度）。应在`0`-`15`之间（含），如不指定该组件则指定该方块不透光。
</treeview>

**格式版本 1.16.X**：

<treeview>
- <DataType type="int" name="minecraft:block_light_absorption"/>：定义方块会吸收多少光照等级（也可以代表其透光度）。应在`0`-`15`之间（含），如不指定该组件则指定该方块不透光。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:block_light_absorption": {
    "value": 3
}
```

**格式版本 1.16.X**：

```json showLineNumbers
"minecraft:block_light_absorption": 3
```

</TabItem></Tabs>

---

---

### `minecraft:max_stack_size`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-max-stack-size" isChinaVersion />

定义方块物品最大堆叠数量。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:aabb`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-aabb" isChinaVersion />

定义方块的碰撞箱。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:block_animate_random_tick`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-animate-random-tick" isChinaVersion />

定义方块会高频率随机更新，并触发 ModAPI 的`BlockAnimateRandomTickEvent`。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:block_chest`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-chest" isChinaVersion />

定义方块的箱子功能。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:block_container`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-container" isChinaVersion />

定义方块为一种自定义容器。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:block_crafting_table`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/10-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B7%A5%E4%BD%9C%E5%8F%B0.html?catalog=1" isChinaVersion />

定义方块为一种自定义工作台。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:block_entity`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-entity" isChinaVersion />

定义方块的方块实体属性。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:block_properties`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-properties" isChinaVersion />

定义方块的属性。

:::note[编者注]

这里的方块属性不等于方块状态，请注意在这里不要混淆概念。

:::

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:block_random_offset`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-random-offset" isChinaVersion />

定义方块的偏移（类似于花）。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:can_built_over`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/9-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E9%9B%AA%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块是否可被另一种方块在原位替代（类似于水、草丛或空气）。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:connection`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-connection" isChinaVersion />

定义方块的连接属性。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:custom_tips`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-custom-tips" isChinaVersion />

定义方块物品的物品信息描述。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:face_directional`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-face-directional" isChinaVersion />

定义方块的多面向功能。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:fall`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/6-%E8%87%AA%E5%AE%9A%E4%B9%89%E9%87%8D%E5%8A%9B%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块为重力方块，会受到重力的影响（类似于沙子）。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:fire_resistant`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-fire-resistant" isChinaVersion />

定义方块的防火属性。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:fuel`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-fuel" isChinaVersion />

定义方块对应物品的燃料属性。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:liquid`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/5-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B5%81%E4%BD%93.html?catalog=1" isChinaVersion />

定义方块为一种自定义流体。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:listen_block_remove`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-listen-block-remove" isChinaVersion />

定义方块在被移除后会触发 ModAPI 的`BlockRemoveServerEvent`事件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:may_place_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-may-place-on" isChinaVersion />

定义方块允许被放置或允许存在的条件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:mob_spawner`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/1-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%B7%E6%80%AA%E7%AE%B1.html?catalog=1" isChinaVersion />

定义方块为一种自定义刷怪笼。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:neighborchanged_sendto_script`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-neighborchanged-sendto-script" isChinaVersion />

定义方块在周围环境变化时，触发 ModAPI 的`BlockNeighborChangedServerEvent`事件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:no_crop_face_block`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-no-crop-face-block" isChinaVersion />

定义方块与其他方块的相邻面能够正常渲染（类似于树叶）。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:on_after_fall_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-after-fall-on" isChinaVersion />

定义实体刚掉落到该方块上的时候是否触发 ModAPI 的`OnAfterFallOnBlockClientEvent`和`OnAfterFallOnBlockServerEvent`事件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:on_before_fall_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-before-fall-on" isChinaVersion />

定义实体刚掉落到该方块上的时候是否触发 ModAPI 的`OnBeforeFallOnBlockServerEvent`事件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:on_entity_inside`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-entity-inside" isChinaVersion />

定义实体碰撞箱内有实体的时候是否触发 ModAPI 的`OnEntityInsideBlockClientEvent`和`OnEntityInsideBlockServerEvent`事件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:on_stand_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-stand-on" isChinaVersion />

定义当实体站在该方块后是否触发 ModAPI 的`OnStandOnBlockClientEvent`和`OnStandOnBlockServerEvent`事件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:on_step_off`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-step-off" isChinaVersion />

定义当实体移动至该方块上后是否触发 ModAPI 的`StepOffBlockClientEvent`和`StepOffBlockServerEvent`事件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:on_step_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-step-on" isChinaVersion />

定义当实体离开该方块上后是否触发 ModAPI 的`StepOnBlockClientEvent`和`StepOnBlockServerEvent`事件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:pathable`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-pathable" isChinaVersion />

定义方块在实体 AI 寻路时是否被认作为障碍物。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:portal`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BC%A0%E9%80%81%E9%97%A8%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块为一种自定义传送门。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:random_tick`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-random-tick" isChinaVersion />

定义方块会随机更新，并触发 ModAPI 的`BlockRandomTickServerEvent`事件。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:redstone`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-redstone" isChinaVersion />

定义方块的红石电源元件或红石机械元件属性。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:redstone_property`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-redstone-property" isChinaVersion />

定义方块的红石属性。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:render_layer`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-render-layer" isChinaVersion />

定义方块渲染材质。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:snow_recover_able`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/9-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E9%9B%AA%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块是否可含雪（类似矮草丛、花等）。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:solid`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-solid" isChinaVersion />

定义方块是否实心。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:tier`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-tier" isChinaVersion />

定义方块的挖掘等级和挖掘相关属性。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:transform`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/3-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%9C%E4%BD%9C%E7%89%A9%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块的转换条件。用于自定义农作物。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:water_flow_source`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块在水源或水流中表现为含水方块。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:water_destroy`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块会被水流摧毁，且无法放置在水中（类似红石粉、火把等）。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:water_only`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块只能放置在水中（类似海带、海草等）。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

### `netease:water_source`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块在水源中表现为含水方块（类似台阶、楼梯等）。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---
---

## 弃用组件

以下组件仅限旧版本的方块适用，因这些组件曾在非实验性方块中可用，故本文档也一并列出，但强烈不推荐使用。这些方块组件均有高版本组件的平替。读者可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)中查看这些组件接受的参数。

| 弃用组件 | 可平替组件 | 平替组件需求的最低格式版本 |
| :--- | :--- | --- |
| `minecraft:block_light_filter` | [`minecraft:light_dampening`](#minecraftlight_dampening) | 1.19.10 |
| `minecraft:block_light_emission` | [`minecraft:light_emission`](#minecraftlight_emission) | 1.19.20 |
| `minecraft:destroy_time` | [`minecraft:destructible_by_mining`](#minecraftdestructible_by_mining) | 1.19.20 |
| `minecraft:explosion_resistance` | [`minecraft:destructible_by_explosion`](#minecraftdestructible_by_explosion) | 1.19.20 |
| `minecraft:custom_components` | 自定义组件 V2（详见[自定义组件](./custom_components)） | 1.21.90 |

### `minecraft:block_light_filter`

<Version version="1.18.10" toVersion="1.19.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_light_filter?view=minecraft-bedrock-stable"/>

定义方块会吸收光，降低光照等级。

于 1.18.10 版本由[`minecraft:block_light_absorption`](#minecraftblock_light_absorption)组件更名来，但现已再次被更名。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="int" name="minecraft:block_light_filter"/>：定义方块会吸收多少光照等级（也可以代表其透光度）。应在`0`-`15`之间（含），如不指定该组件则指定该方块不透光。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:block_light_filter": 3
```

</TabItem></Tabs>

---

### `minecraft:block_light_emission`

<Version version="1.12.0" toVersion="1.19.20"/> <Version version="1.12.0" toVersion="1.19.20" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-block-light-emission" isChinaVersion />

定义方块会发出光，提供光照等级。

<Tabs><TabItem value="参数" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:block_light_emission"/>：根对象
  - <DataType type="float" name="emission"/>：定义方块发出的光照强度。应在`0.0`-`1.0`之间（含），如不指定该组件则指定该方块不发光。
</treeview>

**格式版本 1.16.X**：

<treeview>
- <DataType type="float" name="minecraft:block_light_emission"/>：定义方块发出的光照强度。应在`0.0`-`1.0`之间（含），如不指定该组件则指定该方块不发光。
</treeview>

> 嗯对，你没看错，是[0.0, 1.0]，不是[0, 15]，例如 1.0 代表 15 的光照强度。注意别写错了哦。

</TabItem><TabItem value="示例" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:block_light_emission": {
    "emission": 1.0
}
```

**格式版本 1.16.X**：

```json showLineNumbers
"minecraft:block_light_emission": 1.0
```

</TabItem></Tabs>

---

### `minecraft:destroy_time`

<Version version="1.12.0" toVersion="1.19.20"/> <Version version="1.12.0" toVersion="1.19.20" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-destroy-time" isChinaVersion />

定义方块的挖掘时长。

<Tabs><TabItem value="参数" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:destroy_time"/>：根对象
  - <DataType type="float" name="value"/>：定义方块的*破坏时长*。
</treeview>

**格式版本 1.16.X**：

<treeview>
- <DataType type="float" name="minecraft:destroy_time"/>：定义方块的*破坏时长*。
</treeview>

> **注意**：这里的*破坏时长*实际上为[**硬度**](https://zh.minecraft.wiki/w/挖掘#方块硬度)的概念。在一般情况下，破坏时长（秒）是硬度的 1.5 倍，比如硬度为 1 时，需要 1.5 秒破坏。

</TabItem><TabItem value="示例" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:destroy_time": {
    "value": 1.0
}
```

**格式版本 1.16.X**：

```json showLineNumbers
"minecraft:destroy_time": 1.0
```

</TabItem></Tabs>

---

### `minecraft:explosion_resistance`

<Version version="1.12.0" toVersion="1.19.20"/> <Version version="1.12.0" toVersion="1.19.20" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-explosion-resistance" isChinaVersion />

定义方块的爆炸抗性。

<Tabs><TabItem value="参数" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:explosion_resistance"/>：根对象
  - <DataType type="float" name="value"/>：定义方块的爆炸抗性。
</treeview>

**格式版本 1.16.X**：

<treeview>
- <DataType type="float" name="minecraft:explosion_resistance"/>：定义方块的爆炸抗性。
</treeview>

</TabItem><TabItem value="示例" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:explosion_resistance": {
    "value": 1.0
}
```

**格式版本 1.16.X**：

```json showLineNumbers
"minecraft:explosion_resistance": 1.0
```

</TabItem></Tabs>

---
---

### `minecraft:custom_components`

<Version version="1.21.20" toVersion="1.21.90" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_custom_components?view=minecraft-bedrock-stable"/>

定义方块的自定义组件。自定义组件的行为需要在世界初始化前事件`WorldInitializeBeforeEvent`中定义。

:::danger[警告]

1. 该组件必须配合 ScriptAPI 使用，因此该组件在现在或未来的中国版也是无效的。
2. 该组件随着 1.21.90 的自定义组件 V2 的推出，已被弃用。在`1.21.90`或更高版本下的物品定义中不应再使用该组件。

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="array" name="minecraft:custom_components"/>：根数组。
  - <DataType type="string"/>：自定义组件的名称。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:custom_components": [
    "example:on_step"
]
```

</TabItem></Tabs>

---

### `tag:(标签)`

<Version version="?" toVersion="1.26.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_tag?view=minecraft-bedrock-stable"/>

定义方块的标签。

<Tabs><TabItem value="参数" label="参数" default>

</TabItem><TabItem value="示例" label="示例">

</TabItem></Tabs>

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [方块组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/blockcomponentslist?view=minecraft-bedrock-stable)
- [JSON 组件 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1)
- [方块文档 | 1.16.20.3 | bedrock.dev](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)
- [方块组件 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-components)
- [方块格式历史 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-format-history)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
