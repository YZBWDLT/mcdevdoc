---
sidebar_position: 4
---

# 战利品表

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Version from "/src/components/highlight/version"
import Button from '/src/components/button/base';

> 适用版本：国际版 26.50，中国版 3.10（1.21.130）。

战利品表（Loot Tables）用于为世界中各结构中散落的宝箱、方块被破坏时、生物被杀死时或钓鱼等情况按概率生成物品。

战利品表的每个环节——池、条目、函数、条件——都可以单独配置，组合起来就能实现从「必掉一个苹果」到「按抢夺等级与难度分层掉落随机附魔的装备」等各种效果。

本文档收录战利品表的结构、池、条目、函数与条件。你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

<Button text="教程" url="/docs/tutorials/a2_addons/b7_loot_tables_and_trade_tables/c1_loot_tables" color="green"/>

---

## 文件架构

战利品表不是注册表条目，而是通过**路径**被引用的 JSON 文件，可以放在行为包内的任意位置，惯例是放在<FileType type="folder" name="loot_tables"/>下。

<treeview>
- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="loot_tables"/>
    - <FileType type="folder" name="blocks"/>：方块被破坏时的掉落物
    - <FileType type="folder" name="chests"/>：各类容器（箱子、矿车、桶等）的内容物
    - <FileType type="folder" name="entities"/>：生物被杀死时的掉落物
    - <FileType type="folder" name="gameplay"/>：钓鱼等玩法产出
    - <FileType type="folder" name="(自定义文件夹)"/>
      - <FileType type="file" name="(战利品表 ID).json"/>：一个战利品表
</treeview>

引用时的路径从行为包根目录开始书写，不带`behavior_packs`前缀，例如`loot_tables/chests/simple_dungeon.json`。

---

## 战利品表基本结构

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="array" name="pools" isRequired/>：战利品池列表。各池互相独立地抽取，最终产出为所有池的产出之和。
    - <DataType type="object"/>：一个战利品池，参数见[战利品池](#战利品池)。
</treeview>

```json showLineNumbers
{
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "item",
                    "name": "minecraft:apple",
                    "weight": 1
                }
            ]
        }
    ]
}
```

---

## 战利品池

战利品池（Pool）是一次独立的抽取单元，池与池之间互不影响。分为加权随机池与分层池两类。

### 加权随机池

按权重随机抽取条目，抽取次数由`rolls`决定。

<treeview>
- <DataType type="object"/>：一个战利品池（加权随机池）。
  - <DataType type="int" name="rolls" isRequired/>：抽取次数。应填写为整数，或`{"min": (最小), "max": (最大)}`的范围对象；范围对象会在每次抽取时于区间内随机取值。
  - <DataType type="int" name="bonus_rolls"/>：额外抽取次数。默认值为`0`。
  - <DataType type="float" name="bonus_chance"/>：每次额外抽取成功的概率，应在`0.0`-`1.0`之间（含）。默认值为`0`。
  - <DataType type="array" name="conditions"/>：作用于整个池的条件。所有条件都满足时该池才会参与抽取。
    - <DataType type="object"/>：一个条件，参数见[战利品表条件](#战利品表条件)。
  - <DataType type="array" name="entries" isRequired/>：条目列表，参数见[战利品条目](#战利品条目)。
</treeview>

**额外抽取**：`bonus_rolls`中的每一次都会先按`bonus_chance`判定，判定成功的才计入总抽取次数。二者都默认为`0`，要使用需同时填写。

```json showLineNumbers
"pools": [
    {
        "rolls": { "min": 1, "max": 3 },
        "bonus_rolls": 2,
        "bonus_chance": 0.5,
        "entries": [
            {
                "type": "item",
                "name": "minecraft:iron_ingot",
                "weight": 3
            },
            {
                "type": "item",
                "name": "minecraft:gold_ingot",
                "weight": 1
            }
        ]
    }
]
```

### 分层池

改用`tiers`后，池会按顺序**只抽取一个**条目，用于生物装备这类「整档选取」的场合。

<treeview>
- <DataType type="object"/>：一个战利品池（分层池）。
  - <DataType type="object" name="tiers" isRequired/>：将池标记为分层池。
    - <DataType type="int" name="initial_range"/>：起始索引在哪一档内随机取值。默认值为`1`。
    - <DataType type="int" name="bonus_rolls"/>：索引推进的次数。默认值为`0`。
    - <DataType type="float" name="bonus_chance"/>：每次推进成功的概率。默认值为`0`。
  - <DataType type="array" name="conditions"/>：作用于整个池的条件。
  - <DataType type="array" name="entries" isRequired/>：条目列表。**顺序有意义**，索引从`1`开始。
</treeview>

抽取逻辑：先取`1`到`initial_range`之间的随机整数作为起始索引，再进行`bonus_rolls`次、每次成功率为`bonus_chance`的判定，每成功一次索引`+1`。最终索引对应的条目即为产出；若索引超过条目数量，则本次不产出任何物品。

:::warning[注意]

分层池会**忽略条目上的条件**，只有池上的条件仍然生效。

:::

```json showLineNumbers
"pools": [
    {
        "tiers": {
            "initial_range": 2,
            "bonus_rolls": 2,
            "bonus_chance": 0.5
        },
        "entries": [
            { "type": "loot_table", "name": "loot_tables/entities/armor_set_leather.json" },
            { "type": "loot_table", "name": "loot_tables/entities/armor_set_iron.json" },
            { "type": "loot_table", "name": "loot_tables/entities/armor_set_diamond.json" }
        ]
    }
]
```

---

## 战利品条目

条目（Entry）是池中可被选中的单位，共三种类型。

<treeview>
- <DataType type="object"/>：一个条目。
  - <DataType type="string" name="type" isRequired/>：条目类型。可选值为`item`（物品）、`loot_table`（另一个战利品表）、`empty`（空，不产出任何物品）。
  - <DataType type="string" name="name"/>：物品 ID 或战利品表路径。`type`为`empty`时不需要。
  - <DataType type="int" name="weight"/>：抽取权重，默认为`1`。权重越大被选中的概率越高。
  - <DataType type="int" name="quality"/>：受玩家幸运值影响的权重加成，默认值为`0`。
  - <DataType type="array" name="functions"/>：作用于该条目的函数。参数见[战利品函数](#战利品函数)。
  - <DataType type="array" name="conditions"/>：作用于该条目的条件。所有条件都满足时该条目才会被选中。
</treeview>

```json showLineNumbers
"entries": [
    {
        "type": "item",
        "name": "minecraft:diamond",
        "weight": 1,
        "functions": [
            {
                "function": "set_count",
                "count": { "min": 1, "max": 2 }
            }
        ],
        "conditions": [
            { "condition": "killed_by_player" }
        ]
    },
    {
        "type": "empty",
        "weight": 4
    }
]
```

---

## 战利品函数

函数（Function）写在条目的`functions`数组中，用于修改该条目产出的物品：改数量、改耐久、附魔、填充内容物等。多个函数按数组中的顺序依次执行。

函数名可以带命名空间前缀（例如`minecraft:set_count`），效果与不带前缀相同。

各函数的可用场景如下表：✔️表示可用，❌表示不可用。「实体」包含实体掉落物与实体装备，「容器」包含钓鱼等按容器方式产出内容的场合。

| 函数 | 类别 | 容器 | 实体 | 方块 | 交易表 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `enchant_book_for_trading` | 附魔 | ✔️ | ✔️ | ✔️ | ✔️ |
| `enchant_random_gear` | 附魔 | ✔️ | ✔️ | ✔️ | ✔️ |
| `enchant_randomly` | 附魔 | ✔️ | ✔️ | ✔️ | ✔️ |
| `enchant_with_levels` | 附魔 | ✔️ | ✔️ | ✔️ | ✔️ |
| `exploration_map` | 物品专用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `explosion_decay` | 外部因素 | ❌ | ❌ | ✔️ | ❌ |
| `fill_container` | 物品专用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `furnace_smelt` | 物品专用 | ❌ | ✔️ | ❌ | ❌ |
| `looting_enchant` | 外部因素 | ❌ | ✔️ | ❌ | ❌ |
| `random_aux_value` | 通用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `random_block_state` | 通用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `random_dye` | 物品专用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `set_actor_id` | 物品专用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `set_banner_details` | 物品专用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `set_book_contents` | 物品专用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `set_count` | 通用 | ✔️ | ✔️ | ✔️ | ❌ |
| `set_damage` | 通用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `set_data` | 通用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `set_data_from_color_index` | 外部因素 | ❌ | ❌ | ❌ | ✔️ |
| `set_lore` | 通用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `set_name` | 通用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `set_ominous_bottle_amplifier` | 物品专用 | ✔️ | ✔️ | ✔️ | ❌ |
| `set_potion` | 物品专用 | ✔️ | ✔️ | ✔️ | ✔️ |
| `set_stew_effect` | 物品专用 | ✔️ | ✔️ | ❌ | ❌ |
| `specific_enchants` | 附魔 | ✔️ | ✔️ | ✔️ | ✔️ |
| `trader_material_type` | 外部因素 | ❌ | ❌ | ❌ | ✔️ |

关于表中的几个例外：

- `set_count` 在交易表中改用`quantity`控制数量，故记为❌。
- `exploration_map` 在交易表中仅支持`monument`与`mansion`。
- `set_ominous_bottle_amplifier`与`set_stew_effect`在交易表中的支持情况尚未测试，表中按❌处理。

---

### `enchant_book_for_trading`

生成用于交易的附魔书。其参数主要供交易表使用，在战利品表中一般直接留空。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="enchant_book_for_trading"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "enchant_book_for_trading"
}
```

</TabItem></Tabs>

---

### `enchant_random_gear`

随机决定是否附魔，但**不会出现宝藏附魔**，且对剪刀无效。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="enchant_random_gear"/>：根对象。
  - <DataType type="float" name="chance" isRequired/>：附魔概率，应在`0.0`-`1.0`之间（含）。默认值为`0`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "enchant_random_gear",
    "chance": 0.5
}
```

</TabItem></Tabs>

---

### `enchant_randomly`

随机为物品添加附魔，附魔数量与等级均随机。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="enchant_randomly"/>：根对象。
  - <DataType type="boolean" name="treasure"/>：是否允许出现宝藏附魔，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "enchant_randomly",
    "treasure": true
}
```

</TabItem></Tabs>

---

### `enchant_with_levels`

按附魔台的规则附魔，但**不受 30 级上限限制**。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="enchant_with_levels"/>：根对象。
  - <DataType type="int" name="levels" isRequired/>：附魔等级。应填写为整数，或`{"min": (最小), "max": (最大)}`的范围对象。默认值为`0`，填写负数会按`0`处理。
  - <DataType type="boolean" name="treasure"/>：是否允许出现宝藏附魔，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "enchant_with_levels",
    "levels": { "min": 15, "max": 21 },
    "treasure": true
}
```

</TabItem></Tabs>

---

### `exploration_map`

将物品变为指向某处结构的探险家地图。地图只在对应维度内有效。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="exploration_map"/>：根对象。
  - <DataType type="string" name="destination" isRequired/>：目标结构，可填写`/locate structure`可用的结构名，例如`village`、`monument`、`mansion`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "exploration_map",
    "destination": "village"
}
```

</TabItem></Tabs>

---

### `explosion_decay`

方块被爆炸破坏时，按爆炸威力决定是否掉落。仅对方块掉落生效。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="explosion_decay"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "explosion_decay"
}
```

</TabItem></Tabs>

---

### `fill_container`

为容器类物品填充战利品。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="fill_container"/>：根对象。
  - <DataType type="string" name="loot_table" isRequired/>：战利品表路径，从行为包根目录开始书写，例如`loot_tables/chests/simple_dungeon.json`。不能指向该物品自身所在的战利品表。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "fill_container",
    "loot_table": "loot_tables/chests/simple_dungeon.json"
}
```

</TabItem></Tabs>

---

### `furnace_smelt`

使掉落物变为烧炼后的产物。仅在实体掉落中生效，且要求实体死亡时处于着火状态。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="furnace_smelt"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "furnace_smelt"
}
```

</TabItem></Tabs>

---

### `looting_enchant`

按击杀者武器的抢夺等级增加产出数量。仅在实体掉落中生效。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="looting_enchant"/>：根对象。
  - <DataType type="int" name="count" isRequired/>：每级抢夺增加的物品数量。应填写为整数，或`{"min": (最小), "max": (最大)}`的范围对象。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "looting_enchant",
    "count": { "min": 0, "max": 1 }
}
```

</TabItem></Tabs>

---

### `random_aux_value`

为物品或方块的数据值赋一个随机值（在`values`范围内均匀分布）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="random_aux_value"/>：根对象。
  - <DataType type="int" name="values" isRequired/>：数据值的取值。应填写为整数，或`{"min": (最小), "max": (最大)}`的范围对象。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "random_aux_value",
    "values": { "min": 2, "max": 4 }
}
```

</TabItem></Tabs>

---

### `random_block_state`

为一个方块状态赋随机值。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="random_block_state"/>：根对象。
  - <DataType type="string" name="block_state" isRequired/>：方块状态的名称，例如`wiki:color`。
  - <DataType type="int" name="values" isRequired/>：该状态的取值。应填写为整数，或`{"min": (最小), "max": (最大)}`的范围对象。默认值为`0`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "random_block_state",
    "block_state": "wiki:color",
    "values": 3
}
```

</TabItem></Tabs>

---

### `random_dye`

为可染色物品随机上色。对羊毛等不可染色物品无效。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="random_dye"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "random_dye"
}
```

</TabItem></Tabs>

---

### `set_actor_id`

设置刷怪蛋生成何种生物。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_actor_id"/>：根对象。
  - <DataType type="string" name="id" isRequired/>：生物 ID，例如`minecraft:chicken`。在交易表中省略时默认取该商人的 ID。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_actor_id",
    "id": "minecraft:chicken"
}
```

</TabItem></Tabs>

---

### `set_banner_details`

设置旗帜的类型与图案。仅对`minecraft:banner`、`minecraft:shield`等生效。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_banner_details"/>：根对象。
  - <DataType type="int" name="type" isRequired/>：旗帜类型。可选值为`0`（普通旗帜）、`1`（不祥旗帜）。
  - <DataType type="string" name="base_color"/>：旗帜底色。仅在`type`为`0`时可用。
  - <DataType type="array" name="patterns"/>：图案列表，最多 6 个。**数组的第一个元素为最底层**，依次向上叠加。
    - <DataType type="object"/>：一个图案。
      - <DataType type="string" name="color" isRequired/>：图案颜色。可填写颜色名（如`red`）或颜色编号（如`1`）。
      - <DataType type="string" name="pattern" isRequired/>：图案名，例如`flower`、`creeper`、`skull`、`bricks`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_banner_details",
    "type": 0,
    "base_color": "black",
    "patterns": [
        { "color": "red", "pattern": "flower" }
    ]
}
```

</TabItem></Tabs>

---

### `set_book_contents`

设置成书的内容。仅对`minecraft:writable_book`、`minecraft:written_book`生效，最多 50 页，单页最多 798 个字符，全部页面合计不超过 12800 个字符。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_book_contents"/>：根对象。
  - <DataType type="string" name="title" isRequired/>：书名。
  - <DataType type="string" name="author" isRequired/>：作者。
  - <DataType type="array" name="pages" isRequired/>：页面内容，每个元素对应一页。换行使用`\n`，不能使用制表符。
    - <DataType type="string"/>：一页的文本。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_book_contents",
    "title": "探索笔记",
    "author": "Steve",
    "pages": [ "第一页", "第二页\n换行后的内容" ]
}
```

</TabItem></Tabs>

---

### `set_count`

设置产出的物品数量。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_count"/>：根对象。
  - <DataType type="int" name="count" isRequired/>：物品数量。应填写为整数，或`{"min": (最小), "max": (最大)}`的范围对象。默认值为`0`，因此必须显式填写。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_count",
    "count": { "min": 2, "max": 4 }
}
```

</TabItem></Tabs>

---

### `set_damage`

设置物品的耐久损耗。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_damage"/>：根对象。
  - <DataType type="float" name="damage" isRequired/>：损耗比例，应在`0.0`-`1.0`之间（含）。应填写为浮点数，或`{"min": (最小), "max": (最大)}`的范围对象。物品没有耐久时该函数不生效。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_damage",
    "damage": { "min": 0.5, "max": 1.0 }
}
```

</TabItem></Tabs>

---

### `set_data`

设置物品的数据值（aux）。不能用于设置耐久，耐久请使用[`set_damage`](#set_damage)。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_data"/>：根对象。
  - <DataType type="int" name="data" isRequired/>：数据值。应填写为整数，或`{"min": (最小), "max": (最大)}`的范围对象。默认值为`0`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_data",
    "data": { "min": 0, "max": 5 }
}
```

</TabItem></Tabs>

---

### `set_data_from_color_index`

将产出物品的数据值设为该实体`minecraft:color`组件的值。主要用于交易表。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_data_from_color_index"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_data_from_color_index"
}
```

</TabItem></Tabs>

---

### `set_lore`

设置物品的描述文本。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_lore"/>：根对象。
  - <DataType type="string" name="lore" isRequired/>：描述文本。应填写为字符串，或字符串组成的数组；数组的每个元素对应一行，且**每行的格式相互独立**。支持格式化代码，不支持本地化。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_lore",
    "lore": [ "§r第一行描述", "§r第二行描述" ]
}
```

</TabItem></Tabs>

---

### `set_name`

设置物品的显示名称。名称会显示在悬浮文本中，玩家仍可用铁砧修改。默认渲染为斜体，可在开头加`§r`取消斜体。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_name"/>：根对象。
  - <DataType type="string" name="name" isRequired/>：物品名称。支持格式化代码，不支持原始文本（raw text），可用`\n`换行。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_name",
    "name": "§r被诅咒的弓"
}
```

</TabItem></Tabs>

---

### `set_ominous_bottle_amplifier`

设置不祥之瓶的效果等级。仅对`minecraft:ominous_bottle`生效。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_ominous_bottle_amplifier"/>：根对象。
  - <DataType type="int" name="amplifier" isRequired/>：效果等级，应在`0`-`4`之间（含）。应填写为整数，或`{"min": (最小), "max": (最大)}`的范围对象。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_ominous_bottle_amplifier",
    "amplifier": { "min": 0, "max": 4 }
}
```

</TabItem></Tabs>

---

### `set_potion`

设置药水的类型。仅对`minecraft:potion`、`splash_potion`、`lingering_potion`、`arrow`生效。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_potion"/>：根对象。
  - <DataType type="string" name="id" isRequired/>：药水类型，例如`poison`、`strong_healing`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_potion",
    "id": "poison"
}
```

</TabItem></Tabs>

---

### `set_stew_effect`

设置谜之炖菜提供的状态效果。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="set_stew_effect"/>：根对象。
  - <DataType type="array" name="effects" isRequired/>：状态效果列表。
    - <DataType type="object"/>：一个状态效果。
      - <DataType type="int" name="id" isRequired/>：效果编号，应在`0`-`12`之间（含）。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "set_stew_effect",
    "effects": [
        { "id": 0 },
        { "id": 3 }
    ]
}
```

</TabItem></Tabs>

---

### `specific_enchants`

为物品添加指定的附魔。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="specific_enchants"/>：根对象。
  - <DataType type="array" name="enchants" isRequired/>：附魔列表。可以直接填写附魔 ID，也可以填写对象，两者可混用。
    - <DataType type="object"/>：一个附魔。
      - <DataType type="string" name="id" isRequired/>：附魔 ID，例如`unbreaking`。
      - <DataType type="int" name="level"/>：附魔等级，默认为`1`。可填写整数，或`[最小, 最大]`形式的二元素数组。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "specific_enchants",
    "enchants": [
        "mending",
        { "id": "fortune", "level": [ 1, 3 ] }
    ]
}
```

</TabItem></Tabs>

---

### `trader_material_type`

将产出物品的材质与商人的材质类型关联。主要用于交易表。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="trader_material_type"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "function": "trader_material_type"
}
```

</TabItem></Tabs>

---

## 战利品表条件


条件（Condition）用于判断某个池或条目是否参与抽取。条件写在`conditions`数组中，**任何一条不满足即整体不通过**。

- 写在池上时，不满足则该池完全不参与抽取。
- 写在条目上时，不满足则该条目不会被选中，但不影响同池的其他条目。

### 条件的通用字段

<treeview>
- <DataType type="object"/>：一个条件。
  - <DataType type="string" name="condition" isRequired/>：条件名，见下文各条目。
  - <DataType type="string" name="operator"/>：<Version add="1.26.50" inline/>结果的取用方式。可选值为`==`与`equals`（条件成立时通过）、`!=`与`not`（条件**不**成立时通过）。默认为`==`，即直接使用条件的判定结果。
</treeview>

```json showLineNumbers
"conditions": [
    {
        "condition": "biome_has_tag",
        "operator": "not",
        "tag": "plains"
    }
]
```

---

### `biome_has_tag`

<Version add="1.26.30"/>

战利品来源所在的生物群系是否拥有给定标签。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`biome_has_tag`。
  - <DataType type="string" name="tag"/>：待检查的标签值。
</treeview>

</TabItem><TabItem value="example" label="示例">

废弃矿井的箱子矿车的战利品表（<FileType type="file" name="abandoned_mineshaft.json"/>）：

```json showLineNumbers
{
    "condition": "biome_has_tag",
    "tag": "sulfur_caves"
}
```

</TabItem></Tabs>

---

### `has_mark_variant`

战利品来源实体是否拥有给定的`minecraft:mark_variant`组件值。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`has_mark_variant`。
  - <DataType type="int" name="value"/>：定义战利品来源的`minecraft:mark_variant`组件值。
</treeview>

</TabItem><TabItem value="example" label="示例">

哞菇掉落的谜之炖菜：

```json showLineNumbers
{
    "condition": "has_mark_variant",
    "value": 7
}
```

</TabItem></Tabs>

---

### `has_variant`

战利品来源实体是否拥有给定的`minecraft:variant`组件值。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`has_variant`。
  - <DataType type="int" name="value"/>：定义战利品来源的`minecraft:variant`组件值。
</treeview>

</TabItem><TabItem value="example" label="示例">

蛙明灯的颜色由岩浆怪的变种决定：

```json showLineNumbers
{
    "condition": "has_variant",
    "value": 2
}
```

</TabItem></Tabs>

---

### `killed_by_player`

战利品来源实体是否被玩家杀死。没有参数。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`killed_by_player`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "killed_by_player"
}
```

</TabItem></Tabs>

---

### `killed_by_player_or_pets`

战利品来源实体是否被玩家或玩家的宠物（如狼）杀死。没有参数。

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

### `killed_by_entity`

战利品来源实体是否被指定类型的实体杀死。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`killed_by_entity`。
  - <DataType type="string" name="entity_type"/>：击杀者的实体 ID。
</treeview>

</TabItem><TabItem value="example" label="示例">

仅当被骷髅杀死时产出钻石或煤炭：

```json showLineNumbers
{
    "condition": "killed_by_entity",
    "entity_type": "minecraft:skeleton"
}
```

</TabItem></Tabs>

---

### `entity_killed`

判断被击杀的实体是否为指定类型，用于同时约束「被什么杀死」与「死的是什么」。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`entity_killed`。
  - <DataType type="string" name="entity_type"/>：被击杀实体的 ID。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "entity_killed",
    "entity_type": "minecraft:magma_cube"
}
```

</TabItem></Tabs>

---

### `match_tool`

用于触发掉落的工具是否符合给定的物品、数量、耐久与附魔条件。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`match_tool`。
  - <DataType type="string" name="item"/>：工具的物品 ID。
  - <DataType type="object" name="count"/>：工具的数量。
    - <DataType type="int" name="range_min"/>：最小值。
    - <DataType type="int" name="range_max"/>：最大值。
  - <DataType type="object" name="durability"/>：工具的剩余耐久。
    - <DataType type="int" name="range_min"/>：最小值。
    - <DataType type="int" name="range_max"/>：最大值。
  - <DataType type="array" name="enchantments"/>：工具必须拥有的附魔。
    - <DataType type="object"/>：一个附魔条件。
      - <DataType type="string" name="enchantment"/>：附魔 ID。
      - <DataType type="object" name="levels"/>：附魔等级范围。
        - <DataType type="int" name="range_min"/>：最小等级。
        - <DataType type="int" name="range_max"/>：最大等级。
  - <DataType type="array" name="minecraft:match_tool_filter_any"/>：工具需至少拥有其中任一标签。
    - <DataType type="string"/>：物品标签。
  - <DataType type="array" name="minecraft:match_tool_filter_all"/>：工具需拥有其中全部标签。
    - <DataType type="string"/>：物品标签。
  - <DataType type="array" name="minecraft:match_tool_filter_none"/>：工具不得拥有其中任何标签。
    - <DataType type="string"/>：物品标签。
</treeview>

</TabItem><TabItem value="example" label="示例">

要求钻石剑、锋利等级不超过 6、剩余耐久不低于 1：

```json showLineNumbers
{
    "condition": "match_tool",
    "item": "minecraft:diamond_sword",
    "count": 1,
    "durability": { "range_min": 1 },
    "enchantments": [
        {
            "enchantment": "sharpness",
            "levels": { "range_max": 6 }
        }
    ]
}
```

按标签匹配——铁质、金质或钻石质工具，必须属于工具，且不能是锹：

```json showLineNumbers
{
    "condition": "match_tool",
    "minecraft:match_tool_filter_any": [ "minecraft:iron_tier", "minecraft:golden_tier", "minecraft:diamond_tier" ],
    "minecraft:match_tool_filter_all": [ "minecraft:is_tool" ],
    "minecraft:match_tool_filter_none": [ "minecraft:is_shovel" ]
}
```

</TabItem></Tabs>

---

### `random_chance`

按给定概率决定是否通过。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`random_chance`。
  - <DataType type="float" name="chance"/>：通过的概率，应在`0.0`-`1.0`之间（含）。
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

按概率决定是否通过，且概率随击杀者武器的抢夺等级提升。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`random_chance_with_looting`。
  - <DataType type="float" name="chance"/>：基础通过概率。
  - <DataType type="float" name="looting_multiplier"/>：每级抢夺增加的概率。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "condition": "random_chance_with_looting",
    "chance": 0.11,
    "looting_multiplier": 0.02
}
```

</TabItem></Tabs>

---

### `random_difficulty_chance`

按当前游戏难度的不同概率决定是否通过。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`random_difficulty_chance`。
  - <DataType type="float" name="default_chance"/>：未单独指定的难度下的概率。
  - <DataType type="float" name="peaceful"/>：和平难度下的概率。
  - <DataType type="float" name="easy"/>：简单难度下的概率。
  - <DataType type="float" name="normal"/>：普通难度下的概率。
  - <DataType type="float" name="hard"/>：困难难度下的概率。
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

按区域的难度（而非当前的难度设置）决定是否通过。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="condition"/>：指定为`random_regional_difficulty_chance`。
  - <DataType type="float" name="max_chance"/>：通过概率的上限。
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

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [战利品表条件 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/loottableconditions?view=minecraft-bedrock-stable)
- [战利品表与交易表函数 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/lootandtradetablefunctions?view=minecraft-bedrock-stable)
- [战利品表 | Bedrock Wiki](https://wiki.bedrock.dev/loot/loot-tables)
- [战利品表函数 | Bedrock Wiki](https://wiki.bedrock.dev/loot/item-functions)
- [战利品条件 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mconline/10-addon%E6%95%99%E7%A8%8B/%E7%AC%AC12%E7%AB%A0%EF%BC%9A%E6%9B%B4%E5%AE%8C%E5%96%84%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8E%89%E8%90%BD%E7%89%A9/%E8%AF%BE%E7%A8%8B04.%E6%88%98%E5%88%A9%E5%93%81%E6%9D%A1%E4%BB%B6.html?catalog=1)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
