---
sidebar_position: 4
---

# 方块特征

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

> 上次更新：2026 年 4 月 15 日。中国版最新版本为 1.21.90，国际版最新版本为 26.10。

方块特征（Block Traits）[^1]可以用来启用原版的方块状态和方块功能。

[^1]: 直至本文更新时，Block Traits 的译名仍在讨论，且未能明确统一。读者可以在其他不同的文档中看到不同的翻译，例如方块性状、方块特质等。在未明确声明的情况下，为读者理解方便，本文档系列采用与中文 Minecraft Wiki 在多数基岩版相关更新日志中采用的译名：方块特征。

本文档收录方块特征的相关信息。你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

:::note[温馨提示]

文档中的标签<Version version="版本号"/>代表至少需要使用此格式版本才可生效，并且将会链接到官方文档，读者可点击以查看对应文档。

:::

---
---

## `minecraft:placement_direction`

<Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/traits/placement_direction?view=minecraft-bedrock-stable" />

使方块按特定朝向放置时具有特定的方块状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:placement_direction"/>：根对象
  - <DataType type="array" name="enabled_states" isRequired/>：定义方块将会启用何种方块状态。
    - <DataType type="string"/>：方块状态列表。可选值如下表所示：  
      | 方块状态可选值 | 描述 | 可用的方块状态值 |
      | --- | --- | --- |
      | `minecraft:cardinal_direction` | 基础朝向 | `north`、`south`（默认）、`west`、`east` |
      | `minecraft:facing_direction` | 面向朝向 | `north`、`south`、`west`、`east`、`up`、`down`（默认） |
      | `minecraft:corner_and_cardinal_direction` | （1.26.0+）角落和基础朝向<br/>同时启用两个方块状态：`minecraft:cardinal_direction`、`minecraft:corner` | `minecraft:corner`的可能值：`inner_left`、`inner_right`、`outer_left`、`outer_right`、`none`（默认） |
  - <DataType type="float" name="y_rotation_offset"/>：定义方块以玩家面向朝向为基准，在按逆时针添加多少旋转偏移值后放置方块。默认值为`0.0`。
  - <DataType type="array" name="blocks_to_corner_with"/>：（1.26.0+）仅当启用了`minecraft:corner_and_cardinal_direction`时可用。指定可形成拐角的方块列表。不指定时，默认指定为和该方块相同 ID 的方块。
    - <DataType type="object"/>：指定方块标签。
      - <DataType type="string" name="tags"/>：符合特定方块标签要求的方块。
    - <DataType type="object"/>：指定符合特定方块 ID 和状态的方块。
      - <DataType type="string" name="name" isRequired/>：符合特定方块 ID 的方块。
      - <DataType type="object" name="states"/>：符合特定方块状态的方块。
        - <DataType type="boolean"/><DataType type="int"/><DataType type="string" name="(方块状态 ID)"/>
</treeview>

</TabItem><TabItem value="示例" label="示例">

定义方块启用面向朝向：

```json showLineNumbers
"minecraft:placement_direction": {
    "enabled_states": ["minecraft:facing_direction"]
}
```

定义方块启用基础朝向，并启用旋转偏移：  
（例如，若不指定旋转偏移则放置为`south`的状态时，将此值设置为`90.0`将放置为`east`的状态）

```json showLineNumbers
"minecraft:placement_direction": {
    "enabled_states": ["minecraft:cardinal_direction"],
    "y_rotation_offset": 90.0
}
```

（26.0+）定义方块与带有`minecraft:cornerable_stairs`标签的方块形成拐角：

```json showLineNumbers
"minecraft:placement_direction": {
    "enabled_states": ["minecraft:corner_and_cardinal_direction"],
    "blocks_to_corner_with": [
        { "tags": "q.any_tag('minecraft:cornerable_stairs')" }
    ]
}
```

</TabItem></Tabs>

---

## `minecraft:placement_position`

<Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/traits/placement_position?view=minecraft-bedrock-stable" />

使方块按特定位置放置时具有特定的方块状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:placement_position"/>：根对象
  - <DataType type="array" name="enabled_states" isRequired/>：定义方块将会启用何种方块状态。
    - <DataType type="string"/>：方块状态列表。可选值如下表所示：  
      | 方块状态可选值 | 描述 | 可用的方块状态值 |
      | --- | --- | --- |
      | `minecraft:block_face` | 放置到的方块面 | `north`、`south`、`west`、`east`、`up`、`down`（默认） |
      | `minecraft:vertical_half` | 放置到的半块 | `top`、`bottom`（默认） |
</treeview>

</TabItem><TabItem value="示例" label="示例">

定义方块启用放置到的半块（类似半砖）：

```json showLineNumbers
"minecraft:placement_position": {
    "enabled_states": ["minecraft:vertical_half"]
}
```

定义方块启用放置到的方块面（类似火把）：

```json showLineNumbers
"minecraft:placement_position": {
    "enabled_states": ["minecraft:block_face"]
}
```

</TabItem></Tabs>

---

## `minecraft:connection`

<Version version="1.26.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/traits/connection?view=minecraft-bedrock-stable" />

使方块与其他方块连接时具有特定的方块状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:connection"/>：根对象
  - <DataType type="array" name="enabled_states" isRequired/>：定义方块将会启用何种方块状态。
    - <DataType type="string"/>：仅允许填写为`minecraft:cardinal_connections`。  
      这会启用 4 个布尔值方块状态：`minecraft:connection_north`、`minecraft:connection_south`、`minecraft:connection_west`、`minecraft:connection_east`，代表和对应方向的方块有连接。这些方块状态的默认值均为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

定义方块和其他方块可连接（类似栅栏）：

```json showLineNumbers
"minecraft:connection": {
    "enabled_states": ["minecraft:cardinal_connections"]
}
```

</TabItem></Tabs>

---

## `minecraft:multi_block`

<Version version="1.26.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/traits/multi_block?view=minecraft-bedrock-stable" isBeta/>

定义方块为多部分方块。

:::danger[警告]

该方块特征仍处于实验性玩法，必须开启「即将推出的创作者功能」才可使用。在实验性玩法中，该特征存在功能不稳定、功能更改甚至未来被移除的风险。

:::

:::warning[注意]

要使用该特征，必须：

- 定义组件[`minecraft:movable`](components#minecraftmovable)，且不可在方块置换中定义，且`movement_type`必须指定为`popped`或`immovable`中的一个。
- 不可在方块置换中定义组件[`minecraft:placement_filter`](components#minecraftplacement_filter)

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:multi_block"/>：根对象
  - <DataType type="array" name="enabled_states" isRequired/>：定义方块将会启用何种方块状态。
    - <DataType type="string"/>：仅允许填写为`minecraft:multi_block_part`。  
      这会启用 1 个整数方块状态：`minecraft:multi_block_part`，代表多部分方块的子块处于该多部分方块的第几部分。
  - <DataType type="string" name="direction" isRequired/>：定义方块将会沿什么方向延伸。仅可填为`up`或`down`，即目前仅支持竖直方向的多部分方块。
  - <DataType type="int" name="parts"/>：定义方块有多少个子块。仅限指定为`2`、`3`、`4`中的其中一个值，默认值为`2`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

定义一个向上延伸且高度为 4 格的方块：

```json showLineNumbers
"minecraft:multi_block": {
    "enabled_states": ["minecraft:multi_block_part"],
    "direction": "up",
    "parts": 4
}
```

</TabItem></Tabs>

---
---

## 参考文档

- [使用方块特征 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/intro-block-traits?view=minecraft-bedrock-stable)
- [方块特征 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-traits)
- [方块格式历史 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-format-history)
- [默认方块状态和特征列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockstateandtraitlistings?view=minecraft-bedrock-stable#block-traits)
