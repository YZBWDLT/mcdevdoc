---
sidebar_position: 4
---

# 战利品表

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

收录战利品表的相关信息。

你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

:::info[本文更新时间]

本文于 2025 年 10 月 28 日更新，中国版最新版本为 1.21.0，国际版最新版本为 1.21.110。

:::

:::warning

本文档仍在更新中。本文档计划随教程系列的更新节奏而更新，所以在教程系列更新完毕之前，本文档可能会缺失多项信息。

:::

---
---

## 战利品池

## 战利品功能

### `set_potion`

---
---

## 战利品表条件

### `has_mark_variant`

战利品来源实体拥有特定的[`minecraft:mark_variant`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_mark_variant?view=minecraft-bedrock-stable)组件值时触发的战利品表。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`has_mark_variant`。
  - <DataType type="int" name="value"/>：定义战利品来源的`minecraft:mark_variant`组件值。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "has_mark_variant",
    "value": 7
}
```

</TabItem></Tabs>

---

### `has_variant`

战利品来源实体拥有特定的[`minecraft:variant`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_variant?view=minecraft-bedrock-stable)组件值时触发的战利品表。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`has_variant`。
  - <DataType type="int" name="value"/>：定义战利品来源的`minecraft:variant`组件值。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "has_variant",
    "value": 2
}
```

</TabItem></Tabs>

---

### `killed_by_player_or_pets`

战利品来源实体被玩家或玩家的宠物（如狼）杀死后触发的战利品表。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`killed_by_player_or_pets`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "killed_by_player_or_pets"
}
```

</TabItem></Tabs>

---

### `random_chance`

战利品表有多大概率被触发。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`random_chance`。
  - <DataType type="float" name="chance"/>：战利品表触发的概率，应为一个在`0.0`\~`1.0`之间的浮点数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "random_chance",
    "chance": 0.2
}
```

</TabItem></Tabs>

---

### `random_chance_with_looting`

战利品表有多大概率被触发。支持根据调用战利品表实体所使用的**抢夺**魔咒等级提高触发几率。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`random_chance_with_looting`。
  - <DataType type="float" name="chance"/>：战利品表触发的概率，应为一个在`0.0`\~`1.0`之间的浮点数。
  - <DataType type="float" name="looting_multiplier"/>：每 1 级抢夺魔咒增加的概率，应为一个在`0.0`\~`1.0`之间的浮点数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "random_chance_with_looting",
    "chance": 0.2,
    "looting_multiplier": 0.02
}
```

</TabItem></Tabs>

---

### `random_difficulty_chance`

战利品表在不同游戏难度下有多大概率被触发。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`random_difficulty_chance`。
  - <DataType type="float" name="default_chance"/>：对于未指定的难度使用的概率，应为一个在`0.0`\~`1.0`之间的浮点数。
  - <DataType type="float" name="peaceful"/>：和平难度下的概率，应为一个在`0.0`\~`1.0`之间的浮点数。
  - <DataType type="float" name="easy"/>：简单难度下的概率，应为一个在`0.0`\~`1.0`之间的浮点数。
  - <DataType type="float" name="normal"/>：普通难度下的概率，应为一个在`0.0`\~`1.0`之间的浮点数。
  - <DataType type="float" name="hard"/>：困难难度下的概率，应为一个在`0.0`\~`1.0`之间的浮点数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "random_difficulty_chance",
    "default_chance": 0.5,
    "peaceful": 0,
    "hard": 0.6
}
```

</TabItem></Tabs>

---

### `random_regional_difficulty_chance`

战利品表在不同[区域难度](https://zh.minecraft.wiki/w/%E9%9A%BE%E5%BA%A6#%E5%8C%BA%E5%9F%9F%E9%9A%BE%E5%BA%A6)下有多大概率被触发。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`random_regional_difficulty_chance`。
  - <DataType type="float" name="max_chance"/>：随着区域难度的提高，最高有多大可能触发此战利品表，应为一个在`0.0`\~`1.0`之间的浮点数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "random_regional_difficulty_chance",
    "max_chance": 0.15
}
```

</TabItem></Tabs>

---

### `match_tool`

调用战利品表的实体在使用特定工具时触发的战利品表。

<Tabs><TabItem value="parameters" label="参数" default>

**使用物品 ID、数量、耐久、附魔筛选**：

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`match_tool`。
  - <DataType type="string" name="item"/>：物品 ID。
  - <DataType type="object"/><DataType type="int" name="count"/>：当物品数目为该值时通过。指定为对象类型时可指定范围，并额外允许以下两个参数。
    - <DataType type="int" name="range_max"/>：物品数目最大值。
    - <DataType type="int" name="range_min"/>：物品数目最小值。
  - <DataType type="object"/><DataType type="int" name="durability"/>：当物品耐久为该值时通过。指定为对象类型时可指定范围，并额外允许以下两个参数。
    - <DataType type="int" name="range_max"/>：物品耐久最大值。
    - <DataType type="int" name="range_min"/>：物品耐久最小值。
  - <DataType type="array" name="enchantments"/>：当物品附魔满足以下条件时通过。
    - <DataType type="object"/>
      - <DataType type="string" name="enchantment"/>：魔咒 ID。
      - <DataType type="object"/><DataType type="int" name="levels"/>：当物品魔咒等级为该值时通过。指定为对象类型时可指定范围，并额外允许以下两个参数。
        - <DataType type="int" name="range_max"/>：物品魔咒等级最大值。
        - <DataType type="int" name="range_min"/>：物品魔咒等级最小值。
</treeview>

**使用物品标签筛选**：

:::warning[注意]

物品标签筛选功能仅限 1.21.70 或更高版本可用。详见[基岩版 1.21.70 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%9F%BA%E5%B2%A9%E7%89%881.21.70#%E6%8A%80%E6%9C%AF%E6%80%A7)。

:::

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`match_tool`。
  - <DataType type="array" name="minecraft:match_tool_filter_any"/>：当物品拥有列出的任意一个物品标签时通过。
    - <DataType type="string"/>：物品标签 ID。
  - <DataType type="array" name="minecraft:match_tool_filter_all"/>：当物品拥有列出的全部物品标签时才通过。
    - <DataType type="string"/>：物品标签 ID。
  - <DataType type="array" name="minecraft:match_tool_filter_none"/>：当物品不拥有列出的任意一个物品标签时通过。
    - <DataType type="string"/>：物品标签 ID。
</treeview>

</TabItem><TabItem value="example" label="示例">

**使用物品 ID、数量、耐久、附魔筛选**：

```json showLineNumbers
{
    "condition": "match_tool",
    "enchantments": [
        {
            "enchantment": "sharpness",
            "levels": {
                "range_max": 6
            }
        }
    ],
    "item": "minecraft:diamond_sword",
    "count": 1,
    "durability": {
        "range_min": 1
    }
}
```

**使用物品标签筛选**：

```json showLineNumbers
{
    "condition": "match_tool",
    "minecraft:match_tool_filter_any": [
        "minecraft:iron_tier",
        "minecraft:golden_tier",
        "minecraft:diamond_tier"
    ],
    "minecraft:match_tool_filter_all": [
        "minecraft:is_tool"
    ],
    "minecraft:match_tool_filter_none": [
        "minecraft:is_shovel"
    ]
}
```

</TabItem></Tabs>

---

## 参考文档

- [战利品表条件 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/loottableconditions?view=minecraft-bedrock-stable)
- [战利品条件 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mconline/10-addon%E6%95%99%E7%A8%8B/%E7%AC%AC12%E7%AB%A0%EF%BC%9A%E6%9B%B4%E5%AE%8C%E5%96%84%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8E%89%E8%90%BD%E7%89%A9/%E8%AF%BE%E7%A8%8B04.%E6%88%98%E5%88%A9%E5%93%81%E6%9D%A1%E4%BB%B6.html?catalog=1)
