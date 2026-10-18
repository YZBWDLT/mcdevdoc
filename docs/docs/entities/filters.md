---
sidebar_position: 4
---

# 实体过滤器

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

实体过滤器（Entity Filters）用于在[实体组件](./components)或[实体事件](./events)中过滤出符合条件的实体。

## 过滤器格式

实体过滤器由一项或多项「过滤器测试」（Filter Test）构成。每项测试针对一个主体（`subject`）执行一种判断（`test`），再将判断结果与给定值（`value`）按指定运算符（`operator`）比较。多项测试可以通过「过滤器组」（Filter Group）组合为一个整体。

过滤器可以写在任何接受过滤器的参数中。同一个过滤器有三种写法：

- **写法 1（单个测试）**：直接写一个过滤器测试对象。
- **写法 2（测试数组）**：数组中的各项之间为「与」关系，全部通过时整体通过。
- **写法 3（过滤器组）**：使用`all_of`、`any_of`、`none_of`等键显式指定组合方式，可递归嵌套。

三种写法可以互相嵌套，例如在`all_of`中再放一个数组或另一个`any_of`。

### 过滤器测试

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="test" isRequired/>：测试的名称。可选值见[全部过滤器列表](#全部过滤器列表)。
  - <DataType type="string" name="subject"/>：测试的主体，即测试针对的对象。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。
  - <DataType type="string" name="value"/>：（写法 1）字符串型比较值。多数测试使用此写法。
  - <DataType type="int" name="value"/>：（写法 2）整数型比较值。
  - <DataType type="float" name="value"/>：（写法 3）浮点型比较值。
  - <DataType type="boolean" name="value"/>：（写法 4）布尔型比较值。
  - <DataType type="string" name="domain"/>：测试作用的域。仅少数测试使用，取值随测试而定。见[作用域](#作用域)。

</treeview>

### 过滤器组

<treeview>

- <DataType type="object"/>：过滤器组。
  - <DataType type="array" name="all_of"/>：组内全部测试通过时，该组通过（逻辑「与」）。数组元素为过滤器测试或过滤器组。
  - <DataType type="array" name="any_of"/>：组内至少一项测试通过时，该组通过（逻辑「或」）。数组元素为过滤器测试或过滤器组。
  - <DataType type="array" name="none_of"/>：组内全部测试失败时，该组通过（逻辑「非」）。数组元素为过滤器测试或过滤器组。

</treeview>

官方 schema 还接受若干等价写法，原版实体中亦有使用：

| 写法 | 等价于 | 描述 |
| --- | --- | --- |
| `all`、`AND` | `all_of` | 组内全部测试通过时，该组通过。 |
| `any`、`OR` | `any_of` | 组内至少一项测试通过时，该组通过。 |
| `NOT` | `none_of` | 组内全部测试失败时，该组通过。 |

### 示例

**写法 1**：猪（<FileType type="file" name="pig.json"/>）接受鞍的条件。

```json showLineNumbers
"filters": {
    "test": "has_equipment",
    "subject": "other",
    "domain": "hand",
    "value": "saddle"
}
```

**写法 2**：猪（<FileType type="file" name="pig.json"/>）被闪电击中后转化为僵尸猪灵的条件，两项测试均通过时才触发。

```json showLineNumbers
"filters": [
    {
        "test": "is_family",
        "subject": "other",
        "value": "lightning"
    },
    {
        "test": "is_difficulty",
        "operator": "!=",
        "value": "peaceful"
    }
]
```

**写法 3**：猪（<FileType type="file" name="pig.json"/>）被剪刀卸下鞍的条件，玩家未潜行、手持剪刀且猪身上无骑乘者时才成立。

```json showLineNumbers
"filters": {
    "all_of": [
        {
            "test": "is_sneak_held",
            "subject": "other",
            "value": false
        },
        {
            "test": "has_equipment",
            "subject": "other",
            "domain": "hand",
            "value": "shears"
        },
        {
            "test": "rider_count",
            "subject": "self",
            "operator": "equals",
            "value": 0
        }
    ]
}
```

---

## 过滤器条件

以下参数共同决定一项过滤器测试的条件。除`test`外，其余参数均可省略，省略时按默认值处理。

### 测试主体

`subject`指定测试所针对的对象，默认值为`self`。可选值为：

| 可选值 | 描述 |
| --- | --- |
| `self`（默认值） | 调用该测试的实体或对象本身。 |
| `other` | 交互中的另一方，而非调用者本身。 |
| `player` | 交互中涉及的玩家。 |
| `target` | 调用者的当前目标。 |
| `parent` | 调用者的当前父母。 |
| `block` | 交互中涉及的方块。 |
| `damager` | 交互中造成伤害的实体。 |

:::note[编者注]

官方 schema 的`subject`枚举另有`baby`、`holder`、`item`三个值，官方文档尚未列出，其含义与适用场景有待验证。

原版实体中还可见`"subject": 1`、`"operator": 0`这类数字写法，其中`1`对应`other`、`0`对应`equals`；完整的数字对应关系官方未说明，建议统一使用字符串写法。

:::

### 比较运算符

`operator`指定比较方式，默认值为`equals`。可选值为：

| 可选值 | 描述 |
| --- | --- |
| `equals`（默认值） | 等于。 |
| `=`、`==` | 等于。 |
| `not` | 不等于。 |
| `!=`、`<>` | 不等于。 |
| `>` | 大于。 |
| `>=` | 大于或等于。 |
| `<` | 小于。 |
| `<=` | 小于或等于。 |

### 作用域

`domain`指定测试作用的域，仅少数测试使用。

在装备类测试（如`has_equipment`）中，`domain`表示要检查的装备槽位，可选值为`any`（默认值，任意槽位）、`armor`、`body`、`feet`、`hand`、`head`、`inventory`、`leg`、`main_hand`、`torso`。

在属性类测试（如`bool_property`、`float_property`）与游戏规则类测试（如`is_game_rule`）中，`domain`则被复用为属性名或游戏规则名，例如`minecraft:can_climb`、`domobspawning`。

### 省略默认值

`subject`与`operator`省略时分别取`self`与`equals`，以下两种写法等价。

**简写**：

```json showLineNumbers
"filters": {
    "test": "has_equipment",
    "value": "saddle"
}
```

**完整写法**：

```json showLineNumbers
"filters": {
    "test": "has_equipment",
    "subject": "self",
    "operator": "equals",
    "value": "saddle"
}
```

---

## 全部过滤器列表

以下条目按原版实体中的使用频次排序，常用者在前。

### `is_family`

测试主体是否为指定实体家族的成员。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的实体家族。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：判断交互的另一方是否为玩家。

```json showLineNumbers
{
    "test": "is_family",
    "subject": "other",
    "value": "player"
}
```

</TabItem></Tabs>

---

### `has_biome_tag`

测试主体所在生物群系是否带有指定标签。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的生物群系标签。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

洞穴蜘蛛（<FileType type="file" name="cave_spider.json"/>）：判断洞穴蜘蛛所在群系是否带有沼泽标签。

```json showLineNumbers
{
    "test": "has_biome_tag",
    "value": "swamp"
}
```

</TabItem></Tabs>

---

### `has_equipment`

测试主体指定装备槽位中是否存在指定物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的物品 ID。
  - <DataType type="string" name="domain"/>：要检查的装备区域。可选值见[作用域](#作用域)。默认值为`any`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

箭（<FileType type="file" name="arrow.json"/>）：判断射击者手持的是否为弩。

```json showLineNumbers
{
    "test": "has_equipment",
    "subject": "other",
    "domain": "hand",
    "value": "minecraft:crossbow"
}
```

</TabItem></Tabs>

---

### `in_lava`

测试主体是否处于熔岩中。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：判断旋风人是否不在熔岩中。

```json showLineNumbers
{
    "test": "in_lava",
    "value": false
}
```

</TabItem></Tabs>

---

### `is_difficulty`

测试当前游戏难度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要比较的难度。可选值为`easy`、`hard`、`normal`、`peaceful`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：判断当前难度是否为困难。

```json showLineNumbers
{
    "test": "is_difficulty",
    "value": "hard"
}
```

</TabItem></Tabs>

---

### `enum_property`

测试实体的枚举型属性是否为指定值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要比较的枚举值。
  - <DataType type="string" name="domain" isRequired/>：要检查的实体属性名。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

鸡蛋（<FileType type="file" name="egg.json"/>）：判断蛋的气候变种属性是否为寒冷。

```json showLineNumbers
{
    "test": "enum_property",
    "domain": "minecraft:climate_variant",
    "value": "cold"
}
```

</TabItem></Tabs>

---

### `has_component`

测试主体是否含有指定组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的组件 ID。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

羊（<FileType type="file" name="sheep.json"/>）：判断羊是否具有可染色组件。

```json showLineNumbers
{
    "test": "has_component",
    "value": "minecraft:is_dyeable"
}
```

</TabItem></Tabs>

---

### `has_ranged_weapon`

测试主体是否手持弓、弩等远程武器。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

骷髅（<FileType type="file" name="skeleton.json"/>）：判断骷髅是否手持远程武器。

```json showLineNumbers
{
    "test": "has_ranged_weapon",
    "value": false
}
```

</TabItem></Tabs>

---

### `has_ability`

测试主体是否具有指定能力。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的能力。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

`value`的可选值为：

- `flySpeed`
- `flying`
- `instabuild`
- `invulnerable`
- `lightning`
- `mayfly`
- `mute`
- `noclip`
- `verticalFlySpeed`
- `walkSpeed`
- `worldbuilder`

</TabItem><TabItem value="示例" label="示例">

潜影贝（<FileType type="file" name="shulker.json"/>）：判断交互方是否处于创造模式。

```json showLineNumbers
{
    "test": "has_ability",
    "subject": "other",
    "value": "instabuild"
}
```

</TabItem></Tabs>

---

### `in_water`

测试主体是否位于水中。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

海豚（<FileType type="file" name="dolphin.json"/>）：判断海豚是否在水中。

```json showLineNumbers
{
    "test": "in_water",
    "operator": "!=",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_underwater`

测试主体是否完全浸没在水中。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：判断沼骸是否完全浸没在水中。

```json showLineNumbers
{
    "test": "is_underwater",
    "subject": "self",
    "operator": "==",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_daytime`

测试当前是否为白天。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

洞穴蜘蛛（<FileType type="file" name="cave_spider.json"/>）：判断当前是否为白天。

```json showLineNumbers
{
    "test": "is_daytime",
    "value": false
}
```

</TabItem></Tabs>

---

### `is_riding`

测试主体是否骑乘在其他实体上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

鹦鹉（<FileType type="file" name="parrot.json"/>）：判断鹦鹉是否没有骑乘在其他实体上。

```json showLineNumbers
{
    "test": "is_riding",
    "operator": "!=",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_underground`

测试主体是否位于地下。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

洞穴蜘蛛（<FileType type="file" name="cave_spider.json"/>）：判断洞穴蜘蛛是否不在地下。

```json showLineNumbers
{
    "test": "is_underground",
    "value": false
}
```

</TabItem></Tabs>

---

### `is_controlling_passenger_family`

测试主体的控制乘客是否为指定实体家族的成员。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的实体家族。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

船（<FileType type="file" name="boat.json"/>）：判断船的操控乘客是否为玩家。

```json showLineNumbers
{
    "test": "is_controlling_passenger_family",
    "subject": "self",
    "value": "player"
}
```

</TabItem></Tabs>

---

### `is_moving`

测试主体是否正在移动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

运输矿车（<FileType type="file" name="chest_minecart.json"/>）：判断运输矿车是否正在移动。

```json showLineNumbers
{
    "test": "is_moving",
    "subject": "self",
    "operator": "==",
    "value": true
}
```

</TabItem></Tabs>

---

### `rider_count`

测试主体身上的骑乘者数量。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的骑乘者数量。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

鸡（<FileType type="file" name="chicken.json"/>）：判断鸡身上没有骑乘者。

```json showLineNumbers
{
    "test": "rider_count",
    "subject": "self",
    "operator": "==",
    "value": 0
}
```

</TabItem></Tabs>

---

### `is_variant`

测试主体的变种编号是否为指定值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的变种编号。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

船（<FileType type="file" name="boat.json"/>）：判断船的变种编号不是 7，即不是竹筏。

```json showLineNumbers
{
    "test": "is_variant",
    "operator": "!=",
    "value": 7
}
```

</TabItem></Tabs>

---

### `in_block`

测试主体是否位于指定方块中。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value"/>：要检查的方块 ID。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

骷髅（<FileType type="file" name="skeleton.json"/>）：判断骷髅是否陷入细雪。

```json showLineNumbers
{
    "test": "in_block",
    "value": "minecraft:powder_snow"
}
```

</TabItem></Tabs>

---

### `is_sneak_held`

测试主体是否按住潜行键。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

羊驼（<FileType type="file" name="llama.json"/>）：判断交互方是否没有按住潜行键。

```json showLineNumbers
{
    "test": "is_sneak_held",
    "subject": "other",
    "value": false
}
```

</TabItem></Tabs>

---

### `on_ground`

测试主体是否站在地面上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：判断旋风人是否站在地面上。

```json showLineNumbers
{
    "test": "on_ground",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_brightness`

测试主体所在位置的亮度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：要比较的亮度，取值范围为`0.0`-`1.0`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

洞穴蜘蛛（<FileType type="file" name="cave_spider.json"/>）：判断所在位置的亮度是否高于 0.49。

```json showLineNumbers
{
    "test": "is_brightness",
    "operator": ">",
    "value": 0.49
}
```

</TabItem></Tabs>

---

### `is_game_rule`

测试指定游戏规则是否开启。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="domain" isRequired/>：要检查的游戏规则名，如`domobspawning`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

末影珍珠（<FileType type="file" name="ender_pearl.json"/>）：判断`domobspawning`规则是否关闭。

```json showLineNumbers
{
    "test": "is_game_rule",
    "domain": "domobspawning",
    "value": false
}
```

</TabItem></Tabs>

---

### `in_contact_with_water`

测试主体是否接触水，包括水、雨水与喷溅水瓶。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

雪傀儡（<FileType type="file" name="snow_golem.json"/>）：判断雪傀儡是否接触水。

```json showLineNumbers
{
    "test": "in_contact_with_water",
    "operator": "==",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_sneaking`

测试主体是否正在潜行。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

羊驼（<FileType type="file" name="llama.json"/>）：判断交互方是否没有潜行。

```json showLineNumbers
{
    "test": "is_sneaking",
    "subject": "other",
    "value": false
}
```

</TabItem></Tabs>

---

### `all_slots_empty`

测试主体指定装备区域是否完全为空。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value"/>：要检查的装备区域。默认值为`any`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

`value`的可选值为：

- `any`
- `armor`
- `body`
- `feet`
- `hand`
- `head`
- `inventory`
- `leg`
- `main_hand`
- `torso`

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：判断另一方的指定装备区域不为空。

```json showLineNumbers
{
    "test": "all_slots_empty",
    "subject": "other",
    "operator": "not",
    "value": "hand"
}
```

</TabItem></Tabs>

---

### `bool_property`

测试实体的布尔型属性是否为指定值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="domain" isRequired/>：要检查的实体属性名。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：判断旋风人的指定布尔属性是否成立。

```json showLineNumbers
{
    "test": "bool_property",
    "operator": "==",
    "domain": "minecraft:is_playing_idle_ground_sound"
}
```

</TabItem></Tabs>

---

### `has_target`

测试主体是否有有效目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：判断旋风人是否有有效目标。

```json showLineNumbers
{
    "test": "has_target",
    "subject": "self",
    "value": true
}
```

</TabItem></Tabs>

---

### `in_caravan`

测试主体是否处于商队中。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

行商羊驼（<FileType type="file" name="trader_llama.json"/>）：判断行商羊驼是否不在商队中。

```json showLineNumbers
{
    "test": "in_caravan",
    "value": false
}
```

</TabItem></Tabs>

---

### `is_leashed`

测试主体是否被拴绳拴住。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

行商羊驼（<FileType type="file" name="trader_llama.json"/>）：判断行商羊驼是否未被拴住。

```json showLineNumbers
{
    "test": "is_leashed",
    "subject": "self",
    "value": false
}
```

</TabItem></Tabs>

---

### `is_snow_covered`

测试主体是否处于积雪区域。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

洞穴蜘蛛（<FileType type="file" name="cave_spider.json"/>）：判断所在区域是否有积雪覆盖。

```json showLineNumbers
{
    "test": "is_snow_covered",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_temperature_value`

测试主体所在生物群系的温度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：要比较的温度，取值范围为`0.0`-`1.0`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

雪傀儡（<FileType type="file" name="snow_golem.json"/>）：判断所在群系的温度是否高于 1.0。

```json showLineNumbers
{
    "test": "is_temperature_value",
    "operator": ">",
    "value": 1.0
}
```

</TabItem></Tabs>

---

### `has_mob_effect`

测试主体是否具有指定状态效果。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value"/>：要检查的状态效果 ID。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

玩家（<FileType type="file" name="player.json"/>）：判断玩家是否带有不祥之兆。

```json showLineNumbers
{
    "test": "has_mob_effect",
    "subject": "self",
    "value": "bad_omen"
}
```

</TabItem></Tabs>

---

### `in_water_or_rain`

测试主体是否位于水中或雨中。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

海豚（<FileType type="file" name="dolphin.json"/>）：判断海豚是否不在水中或雨中。

```json showLineNumbers
{
    "test": "in_water_or_rain",
    "operator": "!=",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_biome`

测试主体是否位于指定生物群系。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的生物群系。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

`value`的可选值为：

- `beach`
- `desert`
- `extreme_hills`
- `flat`
- `forest`
- `ice`
- `jungle`
- `mesa`
- `mushroom_island`
- `ocean`
- `plain`
- `river`
- `savanna`
- `stone_beach`
- `swamp`
- `taiga`
- `the_end`
- `the_nether`

</TabItem><TabItem value="示例" label="示例">

浮标（<FileType type="file" name="fishing_hook.json"/>）：判断浮标是否位于丛林群系。

```json showLineNumbers
{
    "test": "is_biome",
    "value": "jungle"
}
```

</TabItem></Tabs>

---

### `is_in_village`

测试主体是否位于村庄范围内。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

玩家（<FileType type="file" name="player.json"/>）：判断玩家是否位于村庄范围内。

```json showLineNumbers
{
    "test": "is_in_village",
    "subject": "self",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_missing_health`

测试主体是否未处于满血状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

铁傀儡（<FileType type="file" name="iron_golem.json"/>）：判断铁傀儡是否未处于满血状态。

```json showLineNumbers
{
    "test": "is_missing_health"
}
```

</TabItem></Tabs>

---

### `is_navigating`

测试主体是否正在寻路。需要`minecraft:navigation`组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：判断旋风人是否未在寻路。

```json showLineNumbers
{
    "test": "is_navigating",
    "value": false
}
```

</TabItem></Tabs>

---

### `is_owner`

测试主体是否为调用者的主人。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：判断另一方是否为悦灵的主人。

```json showLineNumbers
{
    "test": "is_owner",
    "subject": "other"
}
```

</TabItem></Tabs>

---

### `is_panicking`

测试主体是否处于惊慌状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

鹦鹉（<FileType type="file" name="parrot.json"/>）：判断鹦鹉是否处于惊慌状态。

```json showLineNumbers
{
    "test": "is_panicking"
}
```

</TabItem></Tabs>

---

### `owner_distance`

测试主体与其主人之间的距离。主体没有主人时返回`false`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：要比较的距离。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

鹦鹉（<FileType type="file" name="parrot.json"/>）：判断鹦鹉与主人的距离是否大于 12。

```json showLineNumbers
{
    "test": "owner_distance",
    "operator": ">",
    "value": 12
}
```

</TabItem></Tabs>

---

### `target_distance`

调用者与其目标之间的距离。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：要比较的距离。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：判断旋风人与目标的距离是否不超过 24。

```json showLineNumbers
{
    "test": "target_distance",
    "subject": "self",
    "operator": "<=",
    "value": 24.0
}
```

</TabItem></Tabs>

---

### `actor_has_item_with_enchantment_in_slot`

测试主体指定装备槽位中的物品是否带有指定附魔。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的附魔 ID。
  - <DataType type="string" name="domain"/>：要检查的装备区域。可选值见[作用域](#作用域)。默认值为`any`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体指定装备槽位中的物品是否带有指定附魔：

```json showLineNumbers
{
    "test": "actor_has_item_with_enchantment_in_slot",
    "subject": "self",
    "operator": "equals",
    "domain": "any",
    "value": "minecraft:sharpness"
}
```

</TabItem></Tabs>

---

### `actor_health`

测试主体的血量。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的血量。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体的血量：

```json showLineNumbers
{
    "test": "actor_health",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `any_slot_empty`

测试主体指定装备区域是否存在空槽位。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value"/>：要检查的装备区域。默认值为`any`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

`value`的可选值为：

- `any`
- `armor`
- `body`
- `feet`
- `hand`
- `head`
- `inventory`
- `leg`
- `main_hand`
- `torso`

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体指定装备区域是否存在空槽位：

```json showLineNumbers
{
    "test": "any_slot_empty",
    "subject": "self",
    "operator": "equals",
    "value": "any"
}
```

</TabItem></Tabs>

---

### `clock_time`

测试当前时间，以`0.0`至`1.0`表示。`0.0`为正午，`0.25`为日落，`0.5`为午夜，`0.75`为日出。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：要比较的时间。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试当前时间，以`0.0`至`1.0`表示：

```json showLineNumbers
{
    "test": "clock_time",
    "subject": "self",
    "operator": "equals",
    "value": 0.0
}
```

</TabItem></Tabs>

---

### `distance_to_nearest_player`

测试与最近玩家之间的距离。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：要比较的距离。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试与最近玩家之间的距离：

```json showLineNumbers
{
    "test": "distance_to_nearest_player",
    "subject": "self",
    "operator": "equals",
    "value": 0.0
}
```

</TabItem></Tabs>

---

### `float_property`

测试实体的浮点型属性是否为指定值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：浮点型比较值。
  - <DataType type="string" name="domain" isRequired/>：要检查的实体属性名。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试实体的浮点型属性是否为指定值：

```json showLineNumbers
{
    "test": "float_property",
    "subject": "self",
    "operator": "equals",
    "domain": "minecraft:can_climb",
    "value": 0.0
}
```

</TabItem></Tabs>

---

### `has_container_open`

测试玩家主体是否打开了容器。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试玩家主体是否打开了容器：

```json showLineNumbers
{
    "test": "has_container_open",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `has_damage`

测试主体是否受到指定类型的伤害。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的伤害类型。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

`value`的可选值为：

- `anvil`
- `attack`
- `block_explosion`
- `contact`
- `drowning`
- `entity_explosion`
- `fall`
- `falling_block`
- `fatal`
- `fire`
- `fire_tick`
- `fly_into_wall`
- `lava`
- `magic`
- `none`
- `override`
- `piston`
- `projectile`
- `self_destruct`
- `sonic_boom`
- `stalactite`
- `stalagmite`
- `starve`
- `suffocation`
- `thorns`
- `void`
- `wither`

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否受到指定类型的伤害：

```json showLineNumbers
{
    "test": "has_damage",
    "subject": "self",
    "operator": "equals",
    "value": "fatal"
}
```

</TabItem></Tabs>

---

### `has_damaged_equipment`

测试主体指定装备槽位中是否存在受损的指定物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的物品 ID。
  - <DataType type="string" name="domain"/>：要检查的装备区域。可选值见[作用域](#作用域)。默认值为`any`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体指定装备槽位中是否存在受损的指定物品：

```json showLineNumbers
{
    "test": "has_damaged_equipment",
    "subject": "self",
    "operator": "equals",
    "domain": "any",
    "value": "minecraft:iron_pickaxe"
}
```

</TabItem></Tabs>

---

### `has_equipment_block_tag`

测试主体指定装备槽位中是否存在带有指定方块标签的方块物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的方块标签。
  - <DataType type="string" name="domain"/>：要检查的装备区域。可选值见[作用域](#作用域)。默认值为`any`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体指定装备槽位中是否存在带有指定方块标签的方块物品：

```json showLineNumbers
{
    "test": "has_equipment_block_tag"
}
```

</TabItem></Tabs>

---

### `has_equipment_tag`

测试主体指定装备槽位中是否存在带有指定标签的物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的物品标签。
  - <DataType type="string" name="domain"/>：要检查的装备区域。可选值见[作用域](#作用域)。默认值为`any`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体指定装备槽位中是否存在带有指定标签的物品：

```json showLineNumbers
{
    "test": "has_equipment_tag",
    "subject": "self",
    "operator": "equals",
    "domain": "any",
    "value": "minecraft:is_tool"
}
```

</TabItem></Tabs>

---

### `has_item_with_component`

测试主体手持物品是否带有指定组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的组件 ID。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体手持物品是否带有指定组件：

```json showLineNumbers
{
    "test": "has_item_with_component",
    "subject": "self",
    "operator": "equals",
    "value": "minecraft:explode"
}
```

</TabItem></Tabs>

---

### `has_nametag`

测试主体是否已被命名。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否已被命名：

```json showLineNumbers
{
    "test": "has_nametag",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `has_property`

测试主体是否具有指定属性。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的实体属性名。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否具有指定属性：

```json showLineNumbers
{
    "test": "has_property",
    "subject": "self",
    "operator": "equals",
    "value": "minecraft:can_climb"
}
```

</TabItem></Tabs>

---

### `has_same_equipment_in_slot_as`

测试主体指定槽位中的物品是否与调用者相同。仅支持`main_hand`、`head`、`torso`、`leg`、`feet`与`body`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value" isRequired/>：布尔型比较值。
  - <DataType type="string" name="domain"/>：要检查的装备区域。可选值见[作用域](#作用域)。默认值为`any`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体指定槽位中的物品是否与调用者相同：

```json showLineNumbers
{
    "test": "has_same_equipment_in_slot_as",
    "subject": "self",
    "operator": "equals",
    "domain": "any",
    "value": true
}
```

</TabItem></Tabs>

---

### `has_silk_touch`

测试主体手持物品是否带有精准采集。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体手持物品是否带有精准采集：

```json showLineNumbers
{
    "test": "has_silk_touch",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `has_tag`

测试主体是否带有指定标签。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value"/>：要检查的标签。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

省略`value`时该过滤器仍可正常工作：

```json showLineNumbers
{
    "test": "has_tag",
    "subject": "self",
    "operator": "equals"
}
```

</TabItem></Tabs>

---

### `has_trade_supply`

测试目标是否还有剩余交易次数。目标无法交易时返回`false`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试目标是否还有剩余交易次数：

```json showLineNumbers
{
    "test": "has_trade_supply",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `home_distance`

测试主体与其家园之间的距离。主体没有家园或家园不在同一维度时返回`false`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：要比较的距离。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体与其家园之间的距离：

```json showLineNumbers
{
    "test": "home_distance",
    "subject": "self",
    "operator": "equals",
    "value": 0.0
}
```

</TabItem></Tabs>

---

### `hourly_clock_time`

测试当前的 24 小时制时间，取值范围为`0`-`24000`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的时间。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试当前的 24 小时制时间，取值范围为`0`-`24000`：

```json showLineNumbers
{
    "test": "hourly_clock_time",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `in_clouds`

测试主体是否位于云层中。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否位于云层中：

```json showLineNumbers
{
    "test": "in_clouds",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `in_nether`

测试主体是否位于下界。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否位于下界：

```json showLineNumbers
{
    "test": "in_nether",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `in_overworld`

测试主体是否位于主世界。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否位于主世界：

```json showLineNumbers
{
    "test": "in_overworld",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `inactivity_timer`

测试主体是否已达到指定的无活动消失时间。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的秒数。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否已达到指定的无活动消失时间：

```json showLineNumbers
{
    "test": "inactivity_timer",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `int_property`

测试实体的整数型属性是否为指定值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：整数型比较值。
  - <DataType type="string" name="domain" isRequired/>：要检查的实体属性名。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试实体的整数型属性是否为指定值：

```json showLineNumbers
{
    "test": "int_property",
    "subject": "self",
    "operator": "equals",
    "domain": "minecraft:can_climb",
    "value": 0
}
```

</TabItem></Tabs>

---

### `is_altitude`

测试主体的高度。`0`为基岩层高度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的高度。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体的高度：

```json showLineNumbers
{
    "test": "is_altitude",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `is_avoiding_mobs`

测试主体是否正在逃离其他生物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否正在逃离其他生物：

```json showLineNumbers
{
    "test": "is_avoiding_mobs",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_baby`

测试主体是否为幼年体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否为幼年体：

```json showLineNumbers
{
    "test": "is_baby",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_block`

测试方块是否为指定方块。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的方块 ID。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试方块是否为指定方块：

```json showLineNumbers
{
    "test": "is_block",
    "subject": "self",
    "operator": "equals",
    "value": "minecraft:stone"
}
```

</TabItem></Tabs>

---

### `is_bound_to_creaking_heart`

测试生成该嘎枝的嘎枝之心是否仍然存在。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试生成该嘎枝的嘎枝之心是否仍然存在：

```json showLineNumbers
{
    "test": "is_bound_to_creaking_heart",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_climbing`

测试主体是否正在攀爬。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否正在攀爬：

```json showLineNumbers
{
    "test": "is_climbing",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_color`

测试主体是否为指定颜色。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的颜色。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

`value`的可选值为：

- `black`
- `blue`
- `brown`
- `cyan`
- `gray`
- `green`
- `light_blue`
- `light_green`
- `magenta`
- `orange`
- `pink`
- `purple`
- `red`
- `silver`
- `white`
- `yellow`

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否为指定颜色：

```json showLineNumbers
{
    "test": "is_color",
    "subject": "self",
    "operator": "equals",
    "value": "white"
}
```

</TabItem></Tabs>

---

### `is_humid`

测试主体是否处于潮湿区域。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否处于潮湿区域：

```json showLineNumbers
{
    "test": "is_humid",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_immobile`

测试主体是否不可移动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否不可移动：

```json showLineNumbers
{
    "test": "is_immobile",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_in_same_vehicle`

测试主体是否与调用者乘坐同一载具。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value" isRequired/>：布尔型比较值。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否与调用者乘坐同一载具：

```json showLineNumbers
{
    "test": "is_in_same_vehicle",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_leashed_to`

测试主体是否被拴在调用者身上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否被拴在调用者身上：

```json showLineNumbers
{
    "test": "is_leashed_to",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_mark_variant`

测试主体的标记变种编号是否为指定值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的标记变种编号。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体的标记变种编号是否为指定值：

```json showLineNumbers
{
    "test": "is_mark_variant",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `is_persistent`

测试主体的持久性是否为指定值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体的持久性是否为指定值：

```json showLineNumbers
{
    "test": "is_persistent",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_raider`

测试主体是否为袭击者。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否为袭击者：

```json showLineNumbers
{
    "test": "is_raider",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_riding_self`

测试主体是否骑乘在调用者身上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否骑乘在调用者身上：

```json showLineNumbers
{
    "test": "is_riding_self",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_sitting`

测试主体是否正在坐下。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否正在坐下：

```json showLineNumbers
{
    "test": "is_sitting",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_skin_id`

测试主体的皮肤编号是否为指定值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的皮肤编号。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体的皮肤编号是否为指定值：

```json showLineNumbers
{
    "test": "is_skin_id",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `is_sleeping`

测试主体是否正在睡觉。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否正在睡觉：

```json showLineNumbers
{
    "test": "is_sleeping",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_sprinting`

测试主体是否正在疾跑。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否正在疾跑：

```json showLineNumbers
{
    "test": "is_sprinting",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_tamed`

测试主体是否已被驯服。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否已被驯服：

```json showLineNumbers
{
    "test": "is_tamed",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_target`

测试主体是否为调用者的目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否为调用者的目标：

```json showLineNumbers
{
    "test": "is_target",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_temperature_type`

测试当前温度是否为指定类别。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的温度类别。可选值为`cold`、`mild`、`ocean`、`warm`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试当前温度是否为指定类别：

```json showLineNumbers
{
    "test": "is_temperature_type",
    "subject": "self",
    "operator": "equals",
    "value": "cold"
}
```

</TabItem></Tabs>

---

### `is_vehicle_family`

测试主体所乘坐的载具是否为指定实体家族的成员。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的实体家族。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体所乘坐的载具是否为指定实体家族的成员：

```json showLineNumbers
{
    "test": "is_vehicle_family",
    "subject": "self",
    "operator": "equals",
    "value": "player"
}
```

</TabItem></Tabs>

---

### `is_visible`

测试主体是否可见。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否可见：

```json showLineNumbers
{
    "test": "is_visible",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_waterlogged`

测试主体方块是否被水浸没。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value" isRequired/>：布尔型比较值。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体方块是否被水浸没：

```json showLineNumbers
{
    "test": "is_waterlogged",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `is_weather`

已弃用。请改用`weather`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的天气。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

已弃用，仅作对照：

```json showLineNumbers
{
    "test": "is_weather",
    "subject": "self",
    "operator": "equals",
    "value": "clear"
}
```

</TabItem></Tabs>

---

### `light_level`

测试主体所在位置的光照等级是否在指定范围外，范围为`0`-`16`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的光照等级。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体所在位置的光照等级是否在指定范围外，范围为`0`-`16`：

```json showLineNumbers
{
    "test": "light_level",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `moon_intensity`

测试当前月光强度，取值范围为`0.0`-`1.0`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：要比较的月光强度。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试当前月光强度，取值范围为`0.0`-`1.0`：

```json showLineNumbers
{
    "test": "moon_intensity",
    "subject": "self",
    "operator": "equals",
    "value": 0.0
}
```

</TabItem></Tabs>

---

### `moon_phase`

测试当前月相，取值范围为`0`-`7`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的月相。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试当前月相，取值范围为`0`-`7`：

```json showLineNumbers
{
    "test": "moon_phase",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `on_fire`

测试主体是否着火。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否着火：

```json showLineNumbers
{
    "test": "on_fire",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `on_hot_block`

测试主体是否站在热方块上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否站在热方块上：

```json showLineNumbers
{
    "test": "on_hot_block",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `on_ladder`

测试主体是否在梯子上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否在梯子上：

```json showLineNumbers
{
    "test": "on_ladder",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `random_chance`

以`1/value`的概率返回`true`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：概率的分母。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，以`1/value`的概率返回`true`：

```json showLineNumbers
{
    "test": "random_chance",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `redstone_strength_at_position`

测试主体所在位置的红石信号强度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="int" name="value" isRequired/>：要比较的红石信号强度，范围为`0`-`15`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体所在位置的红石信号强度：

```json showLineNumbers
{
    "test": "redstone_strength_at_position",
    "subject": "self",
    "operator": "equals",
    "value": 0
}
```

</TabItem></Tabs>

---

### `surface_mob`

测试主体是否为地表生物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否为地表生物：

```json showLineNumbers
{
    "test": "surface_mob",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `taking_fire_damage`

测试主体是否正在受到火焰伤害。需要`minecraft:damage_sensor`组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否正在受到火焰伤害：

```json showLineNumbers
{
    "test": "taking_fire_damage",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `trusts`

测试主体是否被调用者信任。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否被调用者信任：

```json showLineNumbers
{
    "test": "trusts",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `was_last_hurt_by`

测试主体是否为最近攻击该实体的对象。对玩家为 400 秒内，对生物为 60 秒内。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="boolean" name="value"/>：布尔型比较值。默认值为`true`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体是否为最近攻击该实体的对象：

```json showLineNumbers
{
    "test": "was_last_hurt_by",
    "subject": "self",
    "operator": "equals",
    "value": true
}
```

</TabItem></Tabs>

---

### `weather`

测试当前天气。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的天气。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试当前天气：

```json showLineNumbers
{
    "test": "weather",
    "subject": "self",
    "operator": "equals",
    "value": "clear"
}
```

</TabItem></Tabs>

---

### `weather_at_position`

测试主体所在位置的天气。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="string" name="value" isRequired/>：要检查的天气。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体所在位置的天气：

```json showLineNumbers
{
    "test": "weather_at_position",
    "subject": "self",
    "operator": "equals",
    "value": "clear"
}
```

</TabItem></Tabs>

---

### `y_rotation`

测试主体的 Y 轴旋转角。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object"/>：过滤器测试。
  - <DataType type="float" name="value" isRequired/>：要比较的旋转角，范围为`0`-`360`。
  - <DataType type="string" name="subject"/>：测试主体。默认值为`self`。可选值见[测试主体](#测试主体)。
  - <DataType type="string" name="operator"/>：比较运算符。默认值为`equals`。可选值见[比较运算符](#比较运算符)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

完整写法，测试主体的 Y 轴旋转角：

```json showLineNumbers
{
    "test": "y_rotation",
    "subject": "self",
    "operator": "equals",
    "value": 0.0
}
```

</TabItem></Tabs>

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [实体过滤器列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filterlist?view=minecraft-bedrock-stable)
- [实体文档 | bedrock.dev](https://bedrock.dev/docs/stable/Entities)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
