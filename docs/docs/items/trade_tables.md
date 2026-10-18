---
sidebar_position: 6
---

# 交易表

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Version from "/src/components/highlight/version"
import Button from '/src/components/button/base';

> 适用版本：国际版 26.50，中国版 3.10（1.21.130）。

交易表（Trade Tables）定义生物与玩家交易时提供哪些交易项、按什么条件解锁、每项交易换取什么。

交易表与[战利品表](./loot_tables)一样是通过**路径**被引用的 JSON 文件，由实体的`minecraft:economy_trade_table`（或旧的`minecraft:trade_table`）组件的`table`字段挂载。表本身由三层结构组成：交易层级（Tier）→ 交易组（Group）→ 交易项（Trade），交易项再由交易条目（Trade Item）描述具体收付的物品。

本文档收录交易表的结构与挂载方式。你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

<Button text="教程" url="/docs/tutorials/a2_addons/b7_loot_tables_and_trade_tables/c3_trade_tables" color="green"/>

---

## 文件架构

交易表可以放在行为包内的任意位置，惯例是放在<FileType type="folder" name="trading"/>下。原版村民的交易表位于<FileType type="folder" name="trading"/> - <FileType type="folder" name="economy_trades"/>，同名同路径即可覆盖原版交易表。

<treeview>
- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="trading"/>
    - <FileType type="folder" name="economy_trades"/>：原版村民与流浪商人的交易表
    - <FileType type="file" name="(交易表 ID).json"/>：一个交易表
</treeview>

引用时的路径从行为包根目录开始书写，例如`trading/economy_trades/butcher_trades.json`。

---

## 基本结构

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本。应与原版交易表的写法一致，例如`1.26.10`。
  - <DataType type="array" name="tiers" isRequired/>：交易层级列表。**顺序有意义**，应按照所需经验从低到高排列。
    - <DataType type="object"/>：一个交易层级，参数见[交易层级](#交易层级)。
</treeview>

```json showLineNumbers
{
    "format_version": "1.26.10",
    "tiers": [
        {
            "total_exp_required": 0,
            "groups": [
                {
                    "num_to_select": 1,
                    "trades": [
                        {
                            "wants": [
                                { "item": "minecraft:porkchop", "quantity": { "min": 14, "max": 18 } }
                            ],
                            "gives": [
                                { "item": "minecraft:emerald" }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

---

## 交易层级

交易层级（Tier）按交易者**自身**的经验值解锁：经验达到`total_exp_required`后，该层级的交易才会出现。第一个层级无论如何都会解锁。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：一个交易层级。
  - <DataType type="array" name="groups"/>：该层级下的交易组。参数见[交易组](#交易组)。
    - <DataType type="object"/>：一个交易组。
  - <DataType type="array" name="trades"/>：直接放在该层级下的交易项，与`groups`二选一。不分组的写法。
    - <DataType type="object"/>：一个交易项，参数见[交易项](#交易项)。
  - <DataType type="int" name="total_exp_required"/>：解锁该层级所需的交易者经验值，最小值为`0`。默认值为`0`，原版各层级常用`0`、`10`、`70`、`150`、`250`。
</treeview>

`groups`与`trades`至少填写其一。

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "total_exp_required": 10,
    "groups": [
        {
            "num_to_select": 1,
            "trades": [
                {
                    "wants": [ { "item": "minecraft:coal", "quantity": 15 } ],
                    "gives": [ { "item": "minecraft:emerald" } ]
                }
            ]
        }
    ]
}
```

</TabItem></Tabs>

:::warning[注意]

交易层级必须按`total_exp_required`**升序**排列。一旦遇到所需经验高于交易者当前经验的层级，其后的层级都不会再被检查。

:::

---

## 交易组

交易组（Group）用于让不同的同类生物提供不同的交易组合：从组内的`trades`中随机抽取若干项。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：一个交易组。
  - <DataType type="array" name="trades" isRequired/>：该组内的交易项，至少 1 项。参数见[交易项](#交易项)。
    - <DataType type="object"/>：一个交易项。
  - <DataType type="int" name="num_to_select"/>：从该组中随机抽取多少项交易提供给玩家。默认值为`0`；常用值为`1`（每组只提供一项）和`-1`（提供全部）。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "num_to_select": 1,
    "trades": [
        {
            "wants": [ { "item": "minecraft:chicken", "quantity": 14 } ],
            "gives": [ { "item": "minecraft:emerald" } ]
        },
        {
            "wants": [ { "item": "minecraft:rabbit", "quantity": 4 } ],
            "gives": [ { "item": "minecraft:emerald" } ]
        }
    ]
}
```

</TabItem></Tabs>

---

## 交易项

交易项（Trade）描述「玩家付出什么、生物给出什么」这一条完整的交易。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object"/>：一个交易项。
  - <DataType type="array" name="wants" isRequired/>：玩家需要付出的物品，至少 1 项。参数见[交易条目](#交易条目)。
    - <DataType type="object"/>：一个交易条目。
  - <DataType type="array" name="gives" isRequired/>：交易成功后生物给予的物品，至少 1 项。
    - <DataType type="object"/>：一个交易条目。
  - <DataType type="int" name="trader_exp"/>：交易者完成该交易后获得的经验值。最小值为`0`，默认值为`1`。
  - <DataType type="int" name="max_uses"/>：该交易在被锁定前可进行的次数，交易者补货后重置。默认值为`7`。
  - <DataType type="boolean" name="reward_exp"/>：玩家完成该交易后是否获得经验球。默认值为`true`。
  - <DataType type="int" name="weight"/>：该交易项被抽中的权重。最小值为`1`，默认值为`1`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
{
    "wants": [
        { "item": "minecraft:porkchop", "quantity": { "min": 14, "max": 18 }, "price_multiplier": 0.05 }
    ],
    "gives": [
        { "item": "minecraft:emerald", "quantity": 1 }
    ],
    "trader_exp": 2,
    "max_uses": 16,
    "reward_exp": true
}
```

</TabItem></Tabs>

:::note[编者注]

官方教程里写`max_uses`默认为`12`、`num_to_select`默认为`1`、`price_multiplier`默认为`0.05`，而 26.60 的 schema 分别给的是`7`、`0`、`0`。两者并不一致，稳妥起见建议**显式填写**这几个字段。

:::

---

## 交易条目

交易条目（Trade Item）描述交易中具体收付的物品，可以包一层`choice`表示「从这几项中随机取一项」。

<Tabs><TabItem value="parameters" label="参数" default>

**直接写法**：

<treeview>
- <DataType type="object"/>：一个交易条目。
  - <DataType type="string" name="item" isRequired/>：物品 ID。可带数据值后缀，例如`minecraft:coal:0`。
  - <DataType type="int" name="quantity"/>：该物品的数量。应填写为整数，或`{"min": (最小), "max": (最大)}`的范围对象。默认值为`1`。
  - <DataType type="float" name="price_multiplier"/>：供需变化时价格上浮的倍率，例如`0.05`表示最多上浮 5%。默认值为`0`。
  - <DataType type="array" name="functions"/>：作用于该物品的战利品函数，例如`enchant_randomly`。参数见[战利品函数](./loot_tables#战利品函数)。
    - <DataType type="object"/>：一个函数。
  - <DataType type="object" name="filters"/>：该条目生效所需满足的筛选条件（Filter Group）。
</treeview>

**`choice` 写法**（从多个候选中随机取一项）：

<treeview>
- <DataType type="object"/>：一个交易条目。
  - <DataType type="array" name="choice" isRequired/>：候选条目列表。
    - <DataType type="object"/>：一个候选条目，字段与上面的直接写法相同。
</treeview>

</TabItem><TabItem value="example" label="示例">

直接写法：

```json showLineNumbers
{ "item": "minecraft:emerald", "quantity": 1 }
```

`choice` 写法：

```json showLineNumbers
{
    "choice": [
        {
            "item": "minecraft:porkchop",
            "quantity": { "min": 14, "max": 18 },
            "price_multiplier": 0.05
        }
    ]
}
```

</TabItem></Tabs>

---

## 挂载到实体

交易表本身不会被自动加载，需要由实体的组件引用。

### `minecraft:economy_trade_table`

当前推荐的交易表组件，原版村民使用它。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:economy_trade_table"/>：根对象。
  - <DataType type="string" name="table"/>：交易表路径，从行为包根目录开始书写。默认值为空。
  - <DataType type="string" name="display_name"/>：交易界面显示的名称（本地化键）。默认值为空。
  - <DataType type="boolean" name="new_screen"/>：是否使用新版交易界面。默认值为`false`。
  - <DataType type="boolean" name="show_trade_screen"/>：与玩家交互时是否打开交易界面。默认值为`true`。
  - <DataType type="boolean" name="persist_trades"/>：生成过的交易是否随存档保存。默认值为`false`。
  - <DataType type="boolean" name="convert_trades_economy"/>：生物转换时是否把旧交易数据转换为经济交易数据。默认值为`false`。
  - <DataType type="boolean" name="use_legacy_price_formula"/>：是否使用旧的定价公式。默认值为`false`。
  - <DataType type="object" name="cured_discount"/>：治愈村民后施加的折扣范围，默认值为`{"min": -25, "max": -20}`。
    - <DataType type="int" name="min"/>：折扣下限。
    - <DataType type="int" name="max"/>：折扣上限。
  - <DataType type="object" name="max_cured_discount"/>：治愈折扣的下限范围，默认值为`{"min": -25, "max": -20}`。
  - <DataType type="int" name="hero_demand_discount"/>：玩家拥有村庄英雄效果时的额外折扣，默认值为`-4`。
  - <DataType type="int" name="nearby_cured_discount"/>：附近被治愈村民带来的折扣步进，默认值为`-20`。
  - <DataType type="int" name="max_nearby_cured_discount"/>：附近治愈折扣允许叠加到的下限，默认值为`-200`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:economy_trade_table": {
    "display_name": "entity.villager.butcher",
    "table": "trading/economy_trades/butcher_trades.json",
    "new_screen": true,
    "persist_trades": true,
    "cured_discount": { "min": -25, "max": -20 },
    "max_cured_discount": { "min": -25, "max": -20 }
}
```

</TabItem></Tabs>

### `minecraft:trade_table`

早期的交易表组件，参数比`economy_trade_table`少，新内容应优先使用后者。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:trade_table"/>：根对象。
  - <DataType type="string" name="table"/>：交易表路径。默认值为空。
  - <DataType type="string" name="display_name"/>：交易界面显示的名称。默认值为空。
  - <DataType type="boolean" name="new_screen"/>：是否使用新版交易界面。默认值为`false`。
  - <DataType type="boolean" name="persist_trades"/>：生成过的交易是否随存档保存。默认值为`false`。
  - <DataType type="boolean" name="convert_trades_economy"/>：生物转换时是否转换交易数据。默认值为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:trade_table": {
    "table": "trading/farmer_trades.json",
    "new_screen": true
}
```

</TabItem></Tabs>

---

## 完整示例

一个两层交易表，第一层提供三选一的收购交易，第二层需要 10 点经验：

```json showLineNumbers
{
    "format_version": "1.26.10",
    "tiers": [
        {
            "total_exp_required": 0,
            "groups": [
                {
                    "num_to_select": 1,
                    "trades": [
                        {
                            "wants": [ { "item": "minecraft:chicken", "quantity": 14, "price_multiplier": 0.05 } ],
                            "gives": [ { "item": "minecraft:emerald", "quantity": 1 } ],
                            "trader_exp": 2,
                            "max_uses": 16
                        },
                        {
                            "wants": [ { "item": "minecraft:rabbit", "quantity": 4, "price_multiplier": 0.05 } ],
                            "gives": [ { "item": "minecraft:emerald", "quantity": 1 } ],
                            "trader_exp": 2,
                            "max_uses": 16
                        },
                        {
                            "wants": [ { "item": "minecraft:porkchop", "quantity": 7, "price_multiplier": 0.05 } ],
                            "gives": [ { "item": "minecraft:emerald", "quantity": 1 } ],
                            "trader_exp": 2,
                            "max_uses": 16
                        }
                    ]
                },
                {
                    "num_to_select": 1,
                    "trades": [
                        {
                            "wants": [ { "item": "minecraft:emerald", "quantity": 1 } ],
                            "gives": [ { "item": "minecraft:rabbit_stew", "quantity": 1 } ],
                            "trader_exp": 1,
                            "max_uses": 12
                        }
                    ]
                }
            ]
        },
        {
            "total_exp_required": 10,
            "groups": [
                {
                    "num_to_select": 1,
                    "trades": [
                        {
                            "wants": [ { "item": "minecraft:coal", "quantity": 15, "price_multiplier": 0.05 } ],
                            "gives": [ { "item": "minecraft:emerald", "quantity": 1 } ],
                            "trader_exp": 10,
                            "max_uses": 16
                        }
                    ]
                }
            ]
        }
    ]
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [创建交易表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/createtradetable?view=minecraft-bedrock-stable)
- [交易表参考 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/tradetablereference/examples/tradetablecomponents/trade?view=minecraft-bedrock-stable)
- [战利品表与交易表函数 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/lootandtradetablefunctions?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
