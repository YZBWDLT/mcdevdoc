---
sidebar_position: 9
---

# 物品事件响应

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import Version from "/src/components/highlight/version"
import Button from '/src/components/button/base';

> 适用版本：国际版 26.50，中国版 3.10（1.21.130）。

:::danger[警告]

本文档收录的 9 个事件响应均来自「假日创作者功能」实验性玩法，已随该实验性玩法从游戏中移除，**在当前任何版本下均无法使用**。此处仅作考古与排错之用，请改用脚本实现同等功能。

:::

物品事件响应（Event Responses）是写在物品定义`events`对象中的动作，由触发器或组件中的事件字段引用后执行。事件名称可以自定义（须带命名空间），被引用时写成`{"event": "(事件名称)", "target": "self"}`的形式。

各事件响应中`target`参数的可选值并不完全相同：`self`与`other`适用于全部条目，`holder`仅出现在与状态效果、物品转换相关的条目中，其准确适用范围官方未作说明，有待验证。

```json showLineNumbers
"events": {
    "example:my_event": {
        "swing": {}
    }
}
```

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/%E7%89%A9%E5%93%81"/>
<Button text="Bedrock Wiki（旧版）" url="https://old-wiki.bedrock.dev/concepts/items"/>

---

## `add_mob_effect`

<Version experimental="假日创作者功能"/> <Version removed/> <br/>

给目标添加状态效果。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="add_mob_effect"/>：根对象。
  - <DataType type="string" name="effect" isRequired/>：要添加的状态效果 ID，例如`poison`。
  - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`holder`（物品的持有者），默认为`self`。
  - <DataType type="int" name="duration"/>：状态效果的时长，单位为秒。
  - <DataType type="int" name="amplifier"/>：状态效果的放大倍数，实际等级为放大倍数 + 1。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"add_mob_effect": {
    "effect": "poison",
    "target": "self",
    "duration": 8,
    "amplifier": 3
}
```

</TabItem></Tabs>

---

## `damage`

<Version experimental="假日创作者功能"/> <Version removed/> <br/>

对目标造成伤害。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="damage"/>：根对象。
  - <DataType type="string" name="type"/>：造成的伤害类型，例如`magic`。
  - <DataType type="int" name="amount"/>：造成的伤害值。
  - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`holder`（物品的持有者），默认为`self`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"damage": {
    "type": "magic",
    "amount": 4,
    "target": "self"
}
```

</TabItem></Tabs>

---

## `decrement_stack`

<Version experimental="假日创作者功能"/> <Version removed/> <br/>

使物品的数量递减 1。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="decrement_stack"/>：根对象，不需要任何参数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"decrement_stack": {}
```

</TabItem></Tabs>

---

## `remove_mob_effect`

<Version experimental="假日创作者功能"/> <Version removed/> <br/>

从目标移除状态效果。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="remove_mob_effect"/>：根对象。
  - <DataType type="string" name="effect" isRequired/>：要移除的状态效果 ID，例如`poison`。
  - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`holder`（物品的持有者），默认为`self`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"remove_mob_effect": {
    "effect": "poison",
    "target": "self"
}
```

</TabItem></Tabs>

---

## `run_command`

<Version experimental="假日创作者功能"/> <Version removed/> <br/>

执行命令或命令列表。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="run_command"/>：根对象。
  - <DataType type="array" name="command" isRequired/>：要执行的命令。可定义多条命令，按顺序执行。
    - <DataType type="string"/>：一条命令（不带前导斜杠），例如`say hi`。
  - <DataType type="string" name="target"/>：命令的执行者，可选值为`self`（触发者自身）、`other`（被作用的其他实体），默认为`self`。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"run_command": {
    "command": [ "say hi", "give @s apple" ],
    "target": "self"
}
```

</TabItem></Tabs>

---

## `shoot`

<Version experimental="假日创作者功能"/> <Version removed/> <br/>

在触发时发射弹射物。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="shoot"/>：根对象。
  - <DataType type="string" name="projectile" isRequired/>：要发射的弹射物实体 ID。
  - <DataType type="float" name="launch_power"/>：发射的力度。
  - <DataType type="float" name="angle_offset"/>：发射的角度偏移，单位为度。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"shoot": {
    "projectile": "minecraft:snowball",
    "launch_power": 5,
    "angle_offset": 20
}
```

</TabItem></Tabs>

---

## `swing`

<Version experimental="假日创作者功能"/> <Version removed/> <br/>

使活动对象挥手。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="swing"/>：根对象，不需要任何参数。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"swing": {}
```

</TabItem></Tabs>

---

## `teleport`

<Version experimental="假日创作者功能"/> <Version removed/> <br/>

将目标随机传送到目的地周围。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="teleport"/>：根对象。
  - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`holder`（物品的持有者），默认为`self`。
  - <DataType type="array" name="max_range"/>：随机传送的范围。应为 3 个浮点数组成的数组，依次对应 X、Y、Z 轴。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"teleport": {
    "target": "self",
    "max_range": [ 8, 8, 8 ]
}
```

</TabItem></Tabs>

---

## `transform_item`

<Version experimental="假日创作者功能"/> <Version removed/> <br/>

将一个物品转换为另一个物品。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="transform_item"/>：根对象。
  - <DataType type="string" name="transform" isRequired/>：转换的目标物品 ID。
</treeview>

</TabItem><TabItem value="example" label="示例">

```json showLineNumbers
"transform_item": {
    "transform": "minecraft:apple"
}
```

</TabItem></Tabs>

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [数据驱动物品 | 基岩版开发 Wiki](https://wiki.mcbe-dev.net/p/Manual:%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/%E7%89%A9%E5%93%81)
- [Items [EXPERIMENTAL] | Bedrock Wiki（旧版）](https://old-wiki.bedrock.dev/concepts/items)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
