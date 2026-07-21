---
sidebar_position: 3
---

# 实体事件

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"
import Button from '/src/components/button/base';

> 适用版本：国际版 26.30，中国版 3.8（1.21.90）。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

实体事件（Entity Events），又称实体生成事件（Entity Spawn Events），用于规定实体的特定事件。触发实体事件能够更改实体的组件组、实体属性等，从而更加灵活地控制实体的功能。

实体事件可以指定到<DataType type="object" name="events"/>中。

本文档收录所有已开放或即将开放的实体事件信息。你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

**每个组件条目下方的高亮标签均含注释，可鼠标悬停或手机点击查看**。例：<Highlight text="这是一个特殊标签" color="yellowgreen" tooltip="这是标签下的特殊注解。"/>。

:::note[备注]

因为数据驱动实体自从 Mojang 在 0.16 正式公布附加包以来就已具有应用，因此其中众多组件可用的格式版本十分之早。现如今，收集古早时期的相关资料已十分困难。本文档将以 [bedrock.dev 的 1.2.0](https://bedrock.dev/docs/1.2.0.0/1.2.9.1/Addons) 版本为可用格式版本的最早版本，但这些组件可能在更早就可以应用。

:::

## 内置事件

### `minecraft:entity_born`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entityevents/minecraftevents_entity_born?view=minecraft-bedrock-stable"/>

---

### `minecraft:entity_spawned`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entityevents/minecraftevents_entity_spawned?view=minecraft-bedrock-stable"/>

---

### `minecraft:entity_transformed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entityevents/minecraftevents_entity_transformed?view=minecraft-bedrock-stable"/>

---

### `minecraft:on_prime`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entityevents/minecraftevents_on_prime?view=minecraft-bedrock-stable"/>

## 事件响应

实体事件响应（Entity Event Response）用于在实体触发事件时执行功能，是实体事件运行的核心内容。

### add

<Usable type="all"/> <Version add="1.2.0"/> <br/>

---

### drop_item

<Usable type="all"/> <Version add="1.21.110"/>

允许实体丢弃物品。类似于铜傀儡、硫方怪。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="drop_item"/>：根对象。
  - <DataType type="string" name="slot" isRequired/>：丢弃何槽位的物品。可选值为`"slot.armor.head"`、`"slot.armor.chest"`、`"slot.armor.legs"`、`"slot.armor.feet"`、`"slot.armor.body"`、`"slot.weapon.mainhand"`和`"slot.weapon.offhand"`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铜傀儡（<FileType type="file" name="copper_golem.json"/>）：

```json showLineNumbers
"drop_item": {
    "slot": "slot.weapon.mainhand"
}
```

</TabItem></Tabs>

---

### emit_particle

<Usable type="all"/> <Version add="1.21.50"/> <br/>

---

### emit_vibration

<Usable type="all"/> <Version add="1.21.60"/> <br/>

---

### execute_event_on_home_block

<Usable type="all"/> <Version add="1.26.30"/> <br/>

---

### filters

<Usable type="all"/> <Version add="1.2.0"/> <br/>

---

### first_valid

<Usable type="all"/> <Version add="1.21.70"/> <br/>

---

### play_sound

<Usable type="all"/> <Version add="1.21.50"/> <br/>

---

### queue_command

<Usable type="all"/> <Version add="1.20.60"/> <br/>

---

### randomize

<Usable type="all"/> <Version add="1.2.0"/> <br/>

---

### remove

<Usable type="all"/> <Version add="1.2.0"/> <br/>

---

### reset_target

<Usable type="all"/> <Version add="1.21.40"/> <br/>

---

### sequence

<Usable type="all"/> <Version add="1.2.0"/> <br/>

---

### set_home_position

<Usable type="all"/> <Version add="1.21.70"/> <br/>

---

### set_property

<Usable type="all"/> <Version add="1.19.50"/> <br/>

---

### stop_movement

<Usable type="all"/> <Version add="1.21.70"/> <br/>

---

### trigger

<Usable type="all"/> <Version add="1.2.0"/> <br/>

---

### unleash

<Usable type="all"/> <Version add="1.26.30"/> <br/>

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [中文 Minecraft Wiki](https://zh.minecraft.wiki/)
- [生成事件 | 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E7%94%9F%E6%88%90%E4%BA%8B%E4%BB%B6)
- [实体事件 | Bedrock Wiki](https://wiki.bedrock.dev/entities/entity-events)
- [内置事件 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/eventlist?view=minecraft-bedrock-stable)
