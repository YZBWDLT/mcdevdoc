---
sidebar_position: 2
---

# 数据驱动实体组件

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

本文正在编辑中，缺少大量信息，仅供参考。若需要，请查阅[实体组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/componentlist?view=minecraft-bedrock-stable)和[实体 AI 意向组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/aigoallist?view=minecraft-bedrock-stable)。

:::

数据驱动实体组件（Data-Driven Entity Components）用于规定实体的功能。将不同的实体组件组合在一起可以实现多种复杂的功能。

实体组件可以指定到<DataType type="object" name="components" isRequired/>中，以使得实体在所有情况下都使用相关功能；也可以指定到实体组件组<DataType type="object" name="component_groups"/> - <DataType type="object" name="*"/>中，使得实体在使用特定事件时使用特定的功能。

本文档收录所有已开放或即将开放的命名空间为`minecraft`的实体组件信息。你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

**每个组件条目下方的高亮标签均含注释，可鼠标悬停或手机点击查看**。例：<Highlight text="这是一个特殊标签" color="yellowgreen" tooltip="这是标签下的特殊注解。"/>。

:::note[备注]

因为数据驱动实体自从 Mojang 在 0.16 正式公布附加包以来就已具有应用，因此其中众多组件可用的格式版本十分之早。现如今，收集古早时期的相关资料已十分困难。本文档将以 [bedrock.dev 的 1.2.0](https://bedrock.dev/docs/1.2.0.0/1.2.9.1/Addons) 版本为可用格式版本的最早版本，但这些组件可能在更早就可以应用。

:::

## 基础属性组件

全体实体通用的组件。在定义实体的时候，多数情况下都需要这些组件，并且在编写实体时应当优先考虑这些组件。

### `minecraft:collision_box`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_collision_box?view=minecraft-bedrock-stable"/>

定义实体的碰撞箱。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:collision_box"/>：根对象。
  - <DataType type="float" name="height"/>：实体的碰撞箱高度。默认值为`1`。
  - <DataType type="float" name="width"/>：实体的碰撞箱宽度。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

箭（<FileType type="file" name="arrow.json"/>）：

```json showLineNumbers
"minecraft:collision_box": {
    "height": 0.25,
    "width": 0.25
}
```

</TabItem></Tabs>

---

### `minecraft:health`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_health?view=minecraft-bedrock-stable"/>

定义实体的血量。请注意：1 颗心 = 2 点血量。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:health"/>：根对象。
  - <DataType type="int" name="value"/>：（写法 1）实体的血量。默认值为`20`。
  - <DataType type="object" name="value"/>：（写法 2）实体的血量范围。
    - <DataType type="int" name="range_min"/>：血量的最小值。
    - <DataType type="int" name="range_max"/>：血量的最大值。
  - <DataType type="int" name="max"/>：实体的最大血量。默认值为`20`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猪（<FileType type="file" name="pig.json"/>）：

```json showLineNumbers
"minecraft:health": {
    "value": 10,
    "max": 10
}
```

羊驼（<FileType type="file" name="llama.json"/>）：

```json showLineNumbers
"minecraft:health": {
    "value": {
        "range_min": 15,
        "range_max": 30
    }
}
```

</TabItem></Tabs>

---

### `minecraft:physics`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_physics?view=minecraft-bedrock-stable"/>

定义实体的物理属性，是否应该具有碰撞或重力。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:physics"/>：根对象。
  - <DataType type="boolean" name="has_collision"/>：实体是否和世界中的其他方块/实体有碰撞。默认值为`true`。
  - <DataType type="boolean" name="has_gravity"/>：实体是否有重力。默认值为`true`。
  - <DataType type="boolean" name="push_towards_closest_space"/>：<Version add="1.19.60" inline/> 在被方块卡住后，实体是否应该被挤压到最近的开放区域。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

恼鬼（<FileType type="file" name="vex.json"/>）：

```json showLineNumbers
"minecraft:physics": {
    "has_collision": false,
    "has_gravity": false
}
```

盔甲架（<FileType type="file" name="armor_stand.json"/>）：

```json showLineNumbers
"minecraft:physics": {}
```

</TabItem></Tabs>

---

### `minecraft:pushable_by_block`

<Usable type="all"/> <Version add="1.26.10" tooltip="在更旧的版本下使用minecraft:pushable组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_pushable_by_block?view=minecraft-bedrock-stable"/>

定义实体可被活塞或潜影盒推动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:pushable_by_block"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:pushable_by_block": {}
```

</TabItem></Tabs>

---

### `minecraft:pushable_by_entity`

<Usable type="all"/> <Version add="1.26.10" tooltip="在更旧的版本下使用minecraft:pushable组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_pushable_by_entity?view=minecraft-bedrock-stable"/>

定义实体可被其他实体推动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:pushable_by_entity"/>：根对象。
  - <DataType type="array" name="presets"/>：<Version add="1.26.30" inline/>定义特殊实体的推动行为。
    - <DataType type="object"/>
      - <DataType type="object" name="filter"/>：实体过滤器。定义该实体应满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="push_mode"/>：推动模式。可选值为：
        | 可选值 | 描述 |
        | --- | --- |
        | `none` | 无法推动此实体。 |
        | `default`（默认值） | 多数实体采用的标准推动行为。 |
        | `legacy_boat` | 继承船的推动行为，包括阻尼力和潜行抵消行为。见[船 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/船)。 |
        | `legacy_minecart` | 继承矿车的推动行为，包括基于对齐的碰撞处理和速度平均行为。见[矿车 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/矿车)。 |
        | `ball` | 类似于踢球的推动行为，实体会向推动者运动的方向运动，受力与推动者的速度成正比。见[硫方怪 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/硫方怪)。 |
      - <DataType type="float" name="strength_multiplier"/>：施加给实体推力的乘数。更大的乘数意味着更大的推力。默认值为`0.05000000074505806`。
      - <DataType type="float" name="min_distance"/>：要施加推力的实体之间的最小距离。距离更小则不会相互推动。默认值为`0.009999999776482582`。
      - <DataType type="float" name="max_distance"/>：要施加推力的实体之间的最大距离。距离更大则不会相互推动。默认值为`3.4028234663852886e+38`。
      - <DataType type="string" name="push_scale_self"/>：发生碰撞时推动自身的推力乘数。更大的乘数意味着对自身的推力越大。默认值为`1`。
      - <DataType type="string" name="push_scale_other"/>：发生碰撞时推动其他实体的推力乘数。更大的乘数意味着对其他实体的推力越大。默认值为`1`。
      - <DataType type="boolean" name="play_sound"/>：是否要播放`pushed_by_player`音效。默认值为`false`。
      - <DataType type="float" name="play_sound_cooldown_in_seconds"/>：声音之间的冷却时间，数字越小，声音越多。单位：秒。默认值为`0.20000000298023224`。
      - <DataType type="float" name="play_sound_impulse_threshold"/>：触发推动音效所需的最小速度变化，值越低，灵敏度越高。默认值为`0.20000000298023224`。
      - <DataType type="float" name="kick_speed_scale"/>：<Highlight text="限定参数" tooltip="仅当push_mode为ball时可用。" inline/> 踢球速度乘数，推力会随着速度的增加而增加。乘数越大则推力越大。默认值为`2`。
      - <DataType type="float" name="min_kick_speed"/>：<Highlight text="限定参数" tooltip="仅当push_mode为ball时可用。" inline/> 最小踢球速度，实体将被击退的最小速度。默认值为`0.0`。
      - <DataType type="float" name="max_kick_speed"/>：<Highlight text="限定参数" tooltip="仅当push_mode为ball时可用。" inline/> 最大踢球速度，实体将被击退的最大速度。默认值为`0.5`。
      - <DataType type="float" name="vertical_kick_multiplier"/>：<Highlight text="限定参数" tooltip="仅当push_mode为ball时可用。" inline/> 当物体在地面上被推动时，向上施加的力的乘数。为`0`时则使实体保持在地面上。默认值为`0.30000001192092896`。
      - <DataType type="float" name="require_collision_overlap"/>：<Version add="1.26.40" inline/>是否需要碰撞箱重叠才能推动。默认值为`true`，但对于 1.26.40 之前的格式版本则表现为`false`。
</treeview>

> 备注：部分数值看起来十分抽象，但微软文档记录原文如此。

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:pushable_by_entity": {}
```

<Version add="1.26.30"/> 船（<FileType type="file" name="boat.json"/>）：

```json showLineNumbers
"minecraft:pushable_by_entity": {
    "presets": [
        {
            "filters": {
                "all_of": [
                    {
                        "test": "is_family",
                        "subject": "other",
                        "value": "sulfur_cube"
                    },
                    {
                        "test": "enum_property",
                        "subject": "other",
                        "domain": "minecraft:sulfur_cube_archetype",
                        "operator": "not",
                        "value": "none"
                    },
                    {
                        "test": "is_controlling_passenger_family",
                        "subject": "self",
                        "value": "player"
                    }
                ]
            },
            "push_mode": "none"
        },
        {
            "push_mode": "legacy_boat",
            "strength_multiplier": 0.1,
            "min_distance": 0.55,
            "push_scale_self": 0.5,
            "push_scale_other": 0.25
        }
    ]
}
```

<Version add="1.26.30"/> 硫方怪（弹性）（<FileType type="file" name="sulfur_cube.json"/>）：

```json showLineNumbers
"minecraft:pushable_by_entity": {
    "presets": [
        {
            "filters": {
                "any_of": [
                    {
                        "test": "is_family",
                        "subject": "other",
                        "value": "player"
                    },
                    {
                        "test": "is_controlling_passenger_family",
                        "subject": "other",
                        "value": "player"
                    }
                ]
            },
            "push_mode": "ball",
            "min_distance": 0.0,
            "max_distance": 1.0,
            "push_scale_self": 3.0,
            "push_scale_other": 1.0,
            "kick_speed_scale": 0.3,
            "min_kick_speed": 0.0,
            "max_kick_speed": 0.5,
            "vertical_kick_multiplier": 0.3,
            "play_sound": true,
            "play_sound_impulse_threshold": 0.2,
            "play_sound_cooldown_in_seconds": 0.7
        }
    ]
}
```

</TabItem></Tabs>

---
---

## 传感器组件

传感器组件检查实体是否满足特定条件，例如周围是否有生物、是否受到伤害、附近是否存在方块等，并在符合条件后触发[实体事件](./events)。

### `minecraft:block_sensor`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_block_sensor?view=minecraft-bedrock-stable"/>

定义实体如果有指定方块在指定范围附近被破坏时触发事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:block_sensor"/>：根对象。
  - <DataType type="array" name="on_break" isRequired/>：待检查的可能被破坏的方块列表，一旦方块被破坏则触发事件。特别地，如果同一个方块在下面的多个列表中，则这些列表的事件将同时触发。
    - <DataType type="object"/>
      - <DataType type="array" name="block_list"/>：待检查的方块列表。
        - <DataType type="string"/>：方块 ID。
      - <DataType type="string" name="on_block_broken"/>：方块列表的方块被破坏后，触发的事件。见[实体事件](./events)。
  - <DataType type="float" name="sensor_radius"/>：检查的方块的半径。应小于等于`32`。默认值为`16`。
  - <DataType type="array" name="sources"/>：<Version add="1.18.30" inline/> 检查破坏方块的实体。实体必须满足规定条件才能继续检查方块是否被破坏并触发事件。
    - <DataType type="object"/>：代表一个实体的过滤器。见[过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：

```json showLineNumbers
"minecraft:block_sensor": {
    "sensor_radius": 16,
    "sources": [{ "test": "has_silk_touch", "subject": "other", "value": false }],
    "on_break": [
        {
            "block_list": ["minecraft:beehive", "minecraft:bee_nest"],
            "on_block_broken": "hive_destroyed"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:damage_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_damage_sensor?view=minecraft-bedrock-stable"/>

定义实体受伤时触发事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:damage_sensor"/>：根对象。
  - <DataType type="array"/><DataType type="object" name="trigger"/>：代表多个伤害传感器。如果只有一个伤害传感器，也可以直接写成`"trigger": {...}`的对象结构。
    - <DataType type="object"/>：伤害传感器。
      - <DataType type="boolean" name="deals_damage"/>：<Version add="1.2.0" deprecated="1.21.40" inline/> 定义实体在满足条件时是否执行伤害。默认值为`false`。
      - <DataType type="string" name="deals_damage"/>：<Version add="1.21.40" inline/>定义实体在满足条件时是否执行伤害。可选值如下表所示：
        | 可选值 | 描述 |
        | --- | --- |
        | `yes` | 正常施加伤害。 |
        | `no` | 默认值[^1]。不施加伤害。 |
        | `no_but_side_effects_apply` | 不施加伤害，但应用攻击的其他效果。例如，攻击者的武器的耐久值会下降，应用魔咒效果等。类似于嘎枝。 |
        | `no_but_entity_effects_apply` | <Version add="1.26.20" inline/> 不施加伤害，但应用击退和攻击的其他效果。例如，攻击者的武器的耐久值会下降，应用魔咒效果等。类似于硫方怪。 |
      - <DataType type="string" name="cause"/>：实体受到伤害的类型。只有实体受到规定伤害类型时才能触发该伤害传感器。可选值见[伤害类型 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/伤害类型#基岩版)。默认值为`none`。
      - <DataType type="object" name="on_damage"/>：当实体受到伤害时，仅当其中的过滤器条件通过后才能执行伤害，并触发事件。
        - <DataType type="string" name="event"/>：实体受到伤害后触发的事件。
        - <DataType type="object" name="filters"/>：代表一个实体的过滤器。见[过滤器](./filters)。
      - <DataType type="float" name="damage_modifier"/>：<Version add="1.16.200" inline/> 实体受到伤害的加和值，在原有伤害的基础上增加该伤害。默认值为`0`。
      - <DataType type="float" name="damage_multiplier"/>：<Version add="1.13.0" inline/> 实体受到伤害的乘积值，在原有伤害的基础上倍乘该伤害。默认值为`1`。
      - <DataType type="string" name="on_damage_sound_event"/>：<Version add="1.14.0" inline/> 实体受伤后播放的音效。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:damage_sensor": {
    "triggers": {
        "cause": "lightning",
        "deals_damage": "yes",
        "damage_multiplier": 2000.0
    }
}
```

哞菇（<FileType type="file" name="mooshroom.json"/>）：

```json showLineNumbers
"minecraft:damage_sensor": {
    "triggers": [
        {
            "on_damage": {
                "filters": {
                    "all_of": [
                        { "test": "is_family", "subject": "other", "value": "lightning" },
                        { "test": "is_variant", "subject": "self", "operator": "==", "value": 0 }
                    ]
                },
                "event": "minecraft:become_brown"
            },
            "deals_damage": "no",
            "on_damage_sound_event": "convert_mooshroom"
        },
        {
            "on_damage": {
                "filters": {
                    "all_of": [
                        { "test": "is_family", "subject": "other", "value": "lightning" },
                        { "test": "is_variant", "subject": "self", "operator": "==", "value": 1 }
                    ]
                },
                "event": "minecraft:become_red"
            },
            "deals_damage": "no",
            "on_damage_sound_event": "convert_mooshroom"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:entity_sensor`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_entity_sensor?view=minecraft-bedrock-stable"/>

A component that owns multiple subsensors, each one firing an event when a set of conditions are met by other entities within the defined range.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:environment_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_environment_sensor?view=minecraft-bedrock-stable"/>

Creates a trigger based on environment conditions.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:rail_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rail_sensor?view=minecraft-bedrock-stable"/>

Enables minecart-type entities to detect powered rails and respond to activation state changes.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:target_nearby_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_target_nearby_sensor?view=minecraft-bedrock-stable"/>

Defines the entity's range within which it can see or sense other entities to target them.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:timer`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_timer?view=minecraft-bedrock-stable"/>

Adds a timer after which an event will fire.

---
---

## 功能性组件

### `minecraft:addrider`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_addrider?view=minecraft-bedrock-stable"/>

Adds a rider to the entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:admire_item`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_admire_item?view=minecraft-bedrock-stable"/>

Allows an entity to ignore attackable targets for a given duration

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:ageable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ageable?view=minecraft-bedrock-stable"/>

Adds a timer for the entity to grow up.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:air_drag_modifier`

<Usable type="all"/> <Version add="1.26.30"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_air_drag_modifier?view=minecraft-bedrock-stable"/>

Defines how much does air drag affects this entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:ambient_sound_interval`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ambient_sound_interval?view=minecraft-bedrock-stable"/>

Delay for an entity playing its sound

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:anger_level`

<Usable type="all"/> <Version add="1.19.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_anger_level?view=minecraft-bedrock-stable"/>

Compels the entity to track anger towards a set of nuisances.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:angry`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_angry?view=minecraft-bedrock-stable"/>

Defines an entity's 'angry' state using a timer.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:annotation.break_door`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_annotation.break_door?view=minecraft-bedrock-stable"/>

Allows an entity to break doors, assuming that that flags set up for the component to use in navigation.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:annotation.open_door`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_annotation.open_door?view=minecraft-bedrock-stable"/>

Allows the entity to open doors.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:apply_knockback_rules`

<Usable type="all"/> <Version add="1.26.30"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_apply_knockback_rules?view=minecraft-bedrock-stable"/>

Defines how an entity applies knockback.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:area_attack`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_area_attack?view=minecraft-bedrock-stable"/>

A component that does damage to entities that get within range.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:attack`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_attack?view=minecraft-bedrock-stable"/>

Defines an entity's melee attack damage and any additional status effects applied on hit.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:attack_cooldown`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_attack_cooldown?view=minecraft-bedrock-stable"/>

Adds a cooldown to an entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:attack_damage`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_attack_damage?view=minecraft-bedrock-stable"/>

Specifies how much damage is dealt by the entity when it attacks.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:balloonable`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_balloonable?view=minecraft-bedrock-stable"/>

Allows this entity to have a balloon attached and defines the conditions and events for this entity when is ballooned.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:barter`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_barter?view=minecraft-bedrock-stable"/>

Enables the component to drop an item as a barter exchange.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:block_climber`

<Usable type="all"/> <Version add="1.17.10"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_block_climber?view=minecraft-bedrock-stable"/>

Allows the player to detect and manuever on the scaffolding block.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:body_rotation_always_follows_head`

<Usable type="all"/> <Version add="1.21.90"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_always_follows_head?view=minecraft-bedrock-stable"/>

Causes the entity's body rotation to match the one of their head. Does not override the "`minecraft:body_rotation_blocked`" component.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:body_rotation_blocked`

<Usable type="all"/> <Version add="1.20.80"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_blocked?view=minecraft-bedrock-stable"/>

When set, the entity will no longer visually rotate their body to match their facing direction.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:boostable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_boostable?view=minecraft-bedrock-stable"/>

Defines the conditions and behavior of a rideable entity's boost.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:boss`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_boss?view=minecraft-bedrock-stable"/>

Defines the current state of the boss for updating the boss HUD.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:bounciness`

<Usable type="all"/> <Version add="1.26.30"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_bounciness?view=minecraft-bedrock-stable"/>

Controls how an entity bounces when colliding with surfaces.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:break_blocks`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_break_blocks?view=minecraft-bedrock-stable"/>

Specifies the blocks that the entity can break as it moves around.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:breathable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_breathable?view=minecraft-bedrock-stable"/>

Defines what blocks this entity can breathe in and gives them the ability to suffocate.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:breedable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_breedable?view=minecraft-bedrock-stable"/>

Allows an entity to establish a way to get into the love state used for breeding.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:bribeable`

<Usable type="all"/> <Version add="1.5.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_bribeable?view=minecraft-bedrock-stable"/>

Defines the way an entity can get into the 'bribed' state.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:buoyant`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_buoyant?view=minecraft-bedrock-stable"/>

Enables an entity to float on the specified liquid blocks.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:burns_in_daylight`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_burns_in_daylight?view=minecraft-bedrock-stable"/>

Specifies that this entity takes fire damage when exposed to direct sunlight.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:cannot_be_attacked`

<Usable type="all"/> <Version add="1.21.50"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_cannot_be_attacked?view=minecraft-bedrock-stable"/>

When set, blocks entities from attacking the owner entity unless they have the "`minecraft:ignore_cannot_be_attacked" component.`

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:can_climb`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_can_climb?view=minecraft-bedrock-stable"/>

Allows an entity to climb ladders.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:can_fly`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_can_fly?view=minecraft-bedrock-stable"/>

Marks the entity as being able to fly, the pathfinder won't be restricted to paths where a solid block is required underneath it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:can_join_raid`

<Usable type="all"/> <Version add="1.20.50"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_can_join_raid?view=minecraft-bedrock-stable"/>

Specifies if an entity can join a raid.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:can_power_jump`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_can_power_jump?view=minecraft-bedrock-stable"/>

Allows the entity to power jump like the Horse does in Vanilla.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:celebrate_hunt`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_celebrate_hunt?view=minecraft-bedrock-stable"/>

Specifies hunt celebration behaviour.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:color`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_color?view=minecraft-bedrock-stable"/>

Defines the entity's main color.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:color2`

<Usable type="all"/> <Version add="1.4.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_color2?view=minecraft-bedrock-stable"/>

Defines the entity's second texture color.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:combat_regeneration`

<Usable type="all"/> <Version add="1.17.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_combat_regeneration?view=minecraft-bedrock-stable"/>

Gives Regeneration I and removes Mining Fatigue from the mob that kills the entity's attack target.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:conditional_bandwidth_optimization`

<Usable type="all"/> <Version add="1.16.100"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_conditional_bandwidth_optimization?view=minecraft-bedrock-stable"/>

定义实体的条件空间更新带宽优化。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:custom_hit_test`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_custom_hit_test?view=minecraft-bedrock-stable"/>

List of hitboxes for melee and ranged hits against the entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:damage_over_time`

<Usable type="all"/> <Version add="1.4.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_damage_over_time?view=minecraft-bedrock-stable"/>

Applies defined amount of damage to the entity at specified intervals.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:dash_action`

<Usable type="all"/> <Version add="1.21.110" tooltip="在更旧的版本下使用minecraft:dash组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dash_action?view=minecraft-bedrock-stable"/>

定义可骑乘实体的冲刺行为。类似于骆驼。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:default_look_angle`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_default_look_angle?view=minecraft-bedrock-stable"/>

Sets this entity's default head rotation angle.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:despawn`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_despawn?view=minecraft-bedrock-stable"/>

Despawns the Actor when the despawn rules or optional filters evaluate to true.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:dimension_bound`

<Usable type="all"/> <Version add="1.21.40"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dimension_bound?view=minecraft-bedrock-stable"/>

定义实体不可通过传送门切换维度。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:drying_out_timer`

<Usable type="all"/> <Version add="1.17.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_drying_out_timer?view=minecraft-bedrock-stable"/>

Adds a timer for drying out that will count down and fire 'dried_out_event' or will stop as soon as the entity will get under rain or water and fire 'stopped_drying_out_event'

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:dweller`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dweller?view=minecraft-bedrock-stable"/>

Compels an entity to join and migrate between villages and other dwellings.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:economy_trade_table`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_economy_trade_table?view=minecraft-bedrock-stable"/>

Defines this entity's ability to trade with players.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:entity_armor_equipment_slot_mapping`

<Usable type="all"/> <Version add="1.21.20"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_entity_armor_equipment_slot_mapping?view=minecraft-bedrock-stable"/>

It defines to which armor slot an item equipped to '`minecraft:equippable`''s second slot should be equipped to.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:equipment`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_equipment?view=minecraft-bedrock-stable"/>

Sets the Equipment table to use for this Entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:equippable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_equippable?view=minecraft-bedrock-stable"/>

Defines an entity's behavior for having items equipped to it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:equip_item`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_equip_item?view=minecraft-bedrock-stable"/>

定义实体会穿上想穿上的装备。类似于原版的猪灵、骷髅、僵尸等。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:equip_item"/>：根对象。
  - <DataType type="array" name="exclude_items"/>：实体不会拾取的物品。
    - <DataType type="object"/>
      - <DataType type="string" name="item"/>：物品 ID。
  - <DataType type="boolean" name="can_wear_armor"/>：<Version add="1.21.100" inline/> 若设定为`true`，实体就可以从地上捡起盔甲类物品并穿上。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:equip_item": {}
```

```json showLineNumbers
"minecraft:equip_item": {
    "excluded_items": [
        { "item": "minecraft:banner:15" }
    ]
}
```

</TabItem></Tabs>

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:exhaustion_values`

<Usable type="all"/> <Version add="1.18.30"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_exhaustion_values?view=minecraft-bedrock-stable"/>

Defines how much exhaustion each player action should take.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:experience_reward`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_experience_reward?view=minecraft-bedrock-stable"/>

定义实体会掉落经验球。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:explode`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_explode?view=minecraft-bedrock-stable"/>

Defines how the entity explodes.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:fire_immune`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_fire_immune?view=minecraft-bedrock-stable"/>

Sets that this entity doesn't take damage from fire.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:floats_in_liquid`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_floats_in_liquid?view=minecraft-bedrock-stable"/>

Sets that this entity can float in liquid blocks.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:flocking`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_flocking?view=minecraft-bedrock-stable"/>

Allows entities to flock in groups in water or not.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:flying_speed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_flying_speed?view=minecraft-bedrock-stable"/>

Speed in Blocks that this entity flies at.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:follow_range`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_follow_range?view=minecraft-bedrock-stable"/>

Defines the maximum range, in blocks, that a mob will pursue a target.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:free_camera_controlled`

<Usable type="all"/> <Version add="1.21.110" tooltip="在更旧的版本下使用minecraft:input_air_controlled组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_free_camera_controlled?view=minecraft-bedrock-stable"/>

当用[`minecraft:rideable`](#minecraftrideable)组件设定为可骑乘实体后，该实体将可由 WASD 和鼠标控制运动。类似于快乐恶魂。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:friction_modifier`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_friction_modifier?view=minecraft-bedrock-stable"/>

Defines how much friction affects this entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:game_event_movement_tracking`

<Usable type="all"/> <Version add="1.19.20"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_game_event_movement_tracking?view=minecraft-bedrock-stable"/>

Allows an entity to emit entityMove, swim and flap game events, depending on the block the entity is moving through.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:genetics`

<Usable type="all"/> <Version add="1.8.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_genetics?view=minecraft-bedrock-stable"/>

Defines the way a mob's genes and alleles are passed on to its offspring, and how those traits manifest in the child.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:giveable`

<Usable type="all"/> <Version add="1.9.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_giveable?view=minecraft-bedrock-stable"/>

Defines sets of items that can be used to trigger events when used on this entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:ground_offset`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ground_offset?view=minecraft-bedrock-stable"/>

Sets the offset from the ground that the entity is actually at.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:group_size`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_group_size?view=minecraft-bedrock-stable"/>

Keeps track of entity group size in the given radius.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:grows_crop`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_grows_crop?view=minecraft-bedrock-stable"/>

Could increase crop growth when entity walks over crop

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:healable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_healable?view=minecraft-bedrock-stable"/>

How entities heal

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:heartbeat`

<Usable type="all"/> <Version add="1.19.40"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_heartbeat?view=minecraft-bedrock-stable"/>

Defines the entity's heartbeat.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:hide`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_hide?view=minecraft-bedrock-stable"/>

Moves to and hides at their owned POI or the closest nearby.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:home`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_home?view=minecraft-bedrock-stable"/>

Saves a home position for when the entity is spawned.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:horse.jump_strength`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_horse.jump_strength?view=minecraft-bedrock-stable"/>

Determines the jump height for a horse or similar entity, like a donkey.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:hurt_on_condition`

<Usable type="all"/> <Version add="1.13.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_hurt_on_condition?view=minecraft-bedrock-stable"/>

定义实体在何种条件下会受伤。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:ignore_cannot_be_attacked`

<Usable type="all"/> <Version add="1.21.50"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ignore_cannot_be_attacked?view=minecraft-bedrock-stable"/>

When set, blocks entities from attacking the owner entity unless they have the "`minecraft:ignore_cannot_be_attacked" component.`

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:input_ground_controlled`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_input_ground_controlled?view=minecraft-bedrock-stable"/>

When configured as a rideable entity, the entity will be controlled using WASD controls.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:inside_block_notifier`

<Usable type="all"/> <Version add="1.16.100"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_inside_block_notifier?view=minecraft-bedrock-stable"/>

Verifies whether the entity is inside any of the listed blocks.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:insomnia`

<Usable type="all"/> <Version add="1.6.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_insomnia?view=minecraft-bedrock-stable"/>

Adds a timer since last rested to see if phantoms should spawn.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:instant_despawn`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_instant_despawn?view=minecraft-bedrock-stable"/>

Despawns the Actor immediately.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:interact`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_interact?view=minecraft-bedrock-stable"/>

定义实体可交互。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:interact"/>：根对象。
  - <DataType type="string" name="equip_item_slot"/>：成功交互后，该实体可装备物品的槽位（如有）。  
  指定为整数字符串（例如`"0"`、`"1"`）时，代表装备到物品栏的特定槽位。  
  指定为下列字符串时，代表装备到特定的装备槽位：  
  `"slot.armor.head"`、`"slot.armor.chest"`、`"slot.armor.legs"`、`"slot.armor.feet"`、`"slot.armor.body"`、`"slot.weapon.mainhand"`（<Version add="1.21.110" inline/>）和`"slot.weapon.offhand"`（<Version add="1.21.110" inline/>）。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:interact": {}
```

</TabItem></Tabs>

---

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:inventory`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_inventory?view=minecraft-bedrock-stable"/>

Defines this entity's inventory properties.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_collidable`

<Usable type="all"/> <Version add="1.21.70"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_collidable?view=minecraft-bedrock-stable"/>

Allows other mobs to have vertical and horizontal collisions with this mob.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_dyeable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_dyeable?view=minecraft-bedrock-stable"/>

Allows dyes to be used on this entity to change its color.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_hidden_when_invisible`

<Usable type="all"/> <Version add="1.12.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_hidden_when_invisible?view=minecraft-bedrock-stable"/>

The entity can hide from hostile mobs while invisible.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_illager_captain`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_illager_captain?view=minecraft-bedrock-stable"/>

Sets that this entity is an Illager Captain.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_stackable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_stackable?view=minecraft-bedrock-stable"/>

Allows instances of this entity to have vertical and horizontal collisions with each other.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:item_controllable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_item_controllable?view=minecraft-bedrock-stable"/>

Defines what items can be used to control this entity while ridden.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:item_hopper`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_item_hopper?view=minecraft-bedrock-stable"/>

Determines that this entity is an item hopper.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:jump.dynamic`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_jump.dynamic?view=minecraft-bedrock-stable"/>

Defines a dynamic type jump control that will change jump properties based on the speed modifier of the mob.Requires `minecraft:movement.skip to be used.`

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:jump.static`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_jump.static?view=minecraft-bedrock-stable"/>

Gives the entity the ability to jump.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:knockback_resistance`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_knockback_resistance?view=minecraft-bedrock-stable"/>

Determines an entity's resistance to knockback from melee attacks.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:lava_movement`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_lava_movement?view=minecraft-bedrock-stable"/>

Allows a custom movement speed across lava blocks.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:leashable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_leashable?view=minecraft-bedrock-stable"/>

Describes how this mob can be leashed to other items

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:leashable_to`

<Usable type="all"/> <Version add="1.21.90"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_leashable_to?view=minecraft-bedrock-stable"/>

Allows players to leash entities to this entity, retrieve entities already leashed to it, or free them using shears.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:looked_at`

<Usable type="all"/> <Version add="1.21.40" tooltip="在更旧的版本下使用minecraft:lookat组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_looked_at?view=minecraft-bedrock-stable"/>

Defines the behavior when another entity looks at the owner entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:loot`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_loot?view=minecraft-bedrock-stable"/>

Specifies the loot table that determines what items this entity drops upon death.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:managed_wandering_trader`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_managed_wandering_trader?view=minecraft-bedrock-stable"/>

Manages the entity's ability to trade.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:mob_effect`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_mob_effect?view=minecraft-bedrock-stable"/>

A component that applies a mob effect to entities that get within range.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:mob_effect_immunity`

<Usable type="all"/> <Version add="1.21.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_mob_effect_immunity?view=minecraft-bedrock-stable"/>

Entities with this component will have an immunity to the provided mob effects.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement_sound_distance_offset`

<Usable type="all"/> <Version add="1.21.60"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement_sound_distance_offset?view=minecraft-bedrock-stable"/>

Sets the offset used to determine the next step distance for playing a movement sound.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:nameable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_nameable?view=minecraft-bedrock-stable"/>

Allows this entity to be named (e.g. using a name tag).

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:npc`

<Usable type="onlyInternational" tooltip="中国版移除了NPC的功能，该组件在中国版无法解析。"/> <Version add="1.16.0"/> <br/>

定义一个实体为 NPC，并具有 NPC 的功能。在和该实体交互时，会弹出 NPC 的窗口。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:offspring`

<Usable type="all"/> <Version add="1.26.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_offspring?view=minecraft-bedrock-stable"/>

Defines the way an entity can create a born offspring.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:out_of_control`

<Usable type="all"/> <Version add="1.16.100"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_out_of_control?view=minecraft-bedrock-stable"/>

Defines the entity's 'out of control' state.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:peek`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_peek?view=minecraft-bedrock-stable"/>

Defines the entity's 'peek' behavior, defining the events that should be called during it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:persistent`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_persistent?view=minecraft-bedrock-stable"/>

Defines whether an entity should be persistent in the game world.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:player.exhaustion`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_player.exhaustion?view=minecraft-bedrock-stable"/>

Defines the player's exhaustion level.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:player.experience`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_player.experience?view=minecraft-bedrock-stable"/>

Defines how much experience each player action should take.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:player.level`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_player.level?view=minecraft-bedrock-stable"/>

Defines the player's level.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:player.saturation`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_player.saturation?view=minecraft-bedrock-stable"/>

Defines the player's need for food.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:preferred_path`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_preferred_path?view=minecraft-bedrock-stable"/>

Specifies costing information for mobs that prefer to walk on preferred paths.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:projectile`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_projectile?view=minecraft-bedrock-stable"/>
<Button text="Bedrock Wiki" url="https://wiki.bedrock.dev/entities/projectiles"/>

定义实体为弹射物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:projectile"/>：根对象。
  - <DataType type="object" name="on_hit"/>：当该弹射物击中后，实体的表现。
    - <DataType type="object" name="impact_damage"/>：击中其他实体后，施加伤害。也可以指定为`null`，代表不施加伤害。
      - <DataType type="boolean" name="apply_knockback_to_blocking_targets"/>：<Version add="1.21.120" inline/> 是否对阻挡的目标实施击退[^1]。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:projectile": {}
```

</TabItem></Tabs>

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:push_through`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_push_through?view=minecraft-bedrock-stable"/>

Sets the distance through which the entity can push through.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:raid_trigger`

<Usable type="all"/> <Version add="1.13.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_raid_trigger?view=minecraft-bedrock-stable"/>

Attempts to trigger a raid at the entity's location.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:rail_movement`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rail_movement?view=minecraft-bedrock-stable"/>

Defines the entity's movement on the rails.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:ravager_blocked`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ravager_blocked?view=minecraft-bedrock-stable"/>

Defines the ravager's response to their melee attack being blocked.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:reflect_projectiles`

<Usable type="all"/> <Version add="1.26.30" experimental="即将推出的创作者功能"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_reflect_projectiles?view=minecraft-bedrock-stable"/>

[EXPERIMENTAL] Allows an entity to reflect projectiles.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:remove_in_peaceful`

<Usable type="all"/> <Version add="1.21.90"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_remove_in_peaceful?view=minecraft-bedrock-stable"/>

Denotes entities that are not allowed to exist in "Peaceful" difficulty.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:renders_when_invisible`

<Usable type="all"/> <Version add="1.21.60"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_renders_when_invisible?view=minecraft-bedrock-stable"/>

When set, the entity will render even when invisible.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:rideable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rideable?view=minecraft-bedrock-stable"/>

定义实体为可骑乘的实体。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:rotation_axis_aligned`

<Usable type="all"/> <Version add="1.21.100" tooltip="在更旧的版本下使用minecraft:body_rotation_axis_aligned组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rotation_axis_aligned?view=minecraft-bedrock-stable"/>

定义实体会根据自身朝向旋转身体并对齐坐标轴。类似于快乐恶魂。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:rotation_locked_to_vehicle`

<Usable type="all"/> <Version add="1.21.130"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rotation_locked_to_vehicle?view=minecraft-bedrock-stable"/>

Causes the entity's rotation to match their vehicle's facing direction.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:scale`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_scale?view=minecraft-bedrock-stable"/>

Sets the entity's visual size multiplier.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:scale_by_age`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_scale_by_age?view=minecraft-bedrock-stable"/>

Defines the entity's size interpolation based on the entity's age.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:scheduler`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_scheduler?view=minecraft-bedrock-stable"/>

Fires off scheduled mob events at time of day events.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:shareables`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_shareables?view=minecraft-bedrock-stable"/>

Defines a list of items the mob wants to share or pick up.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:shooter`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_shooter?view=minecraft-bedrock-stable"/>

Defines the entity's ranged attack behavior.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:sittable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_sittable?view=minecraft-bedrock-stable"/>

Defines the entity's 'sit' state.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:sound_volume`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_sound_volume?view=minecraft-bedrock-stable"/>

Sets the entity's base volume for sound effects.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:spawn_egg_interaction`

<Usable type="all"/> <Version add="1.26.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_spawn_egg_interaction?view=minecraft-bedrock-stable"/>

Enables interacting with this entity using its own spawn egg to spawn a born child.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:spawn_entity`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_spawn_entity?view=minecraft-bedrock-stable"/>

Adds a timer after which this entity will spawn another entity or item (similar to vanilla's chicken's egg-laying behavior).

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:spawn_on_death`

<Usable type="all"/> <Version add="1.26.20"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_spawn_on_death?view=minecraft-bedrock-stable"/>

Component for spawning entities when an entity perishes.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:spell_effects`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_spell_effects?view=minecraft-bedrock-stable"/>

Allows an entity to add or remove status effects from itself.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:strength`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_strength?view=minecraft-bedrock-stable"/>

Defines the entity's strength to carry items.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:suspect_tracking`

<Usable type="all"/> <Version add="1.19.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_suspect_tracking?view=minecraft-bedrock-stable"/>

Allows this entity to remember suspicious locations.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:tameable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_tameable?view=minecraft-bedrock-stable"/>

This entity can be tamed

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:tamemount`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_tamemount?view=minecraft-bedrock-stable"/>

Allows the Entity to be tamed by mounting it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:teleport`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_teleport?view=minecraft-bedrock-stable"/>

Defines an entity's teleporting behavior.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:tick_world`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_tick_world?view=minecraft-bedrock-stable"/>

定义实体高频运行世界[^1]。目前没有任何原版实体使用此组件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:trade_resupply`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trade_resupply?view=minecraft-bedrock-stable"/>

Resupplies an entity's trade.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:trade_table`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trade_table?view=minecraft-bedrock-stable"/>

Defines this entity's ability to trade with players.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:trail`

<Usable type="all"/> <Version add="1.13.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trail?view=minecraft-bedrock-stable"/>

Causes an entity to leave a trail of blocks as it moves about the world.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:transformation`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_transformation?view=minecraft-bedrock-stable"/>

Defines an entity's transformation from the current definition into another

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:transient`

<Usable type="all"/> <Version add="1.21.40"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_transient?view=minecraft-bedrock-stable"/>

An entity with this component will NEVER persist, and forever disappear when unloaded.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:trust`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trust?view=minecraft-bedrock-stable"/>

Allows this entity to trust multiple players.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:trusting`

<Usable type="all"/> <Version add="1.8.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trusting?view=minecraft-bedrock-stable"/>

Defines the rules for a mob to trust players.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:type_family`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_type_family?view=minecraft-bedrock-stable"/>

Defines the family categories this entity belongs to.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:underwater_mount_breathing`

<Usable type="all"/> <Version add="1.21.130"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_underwater_mount_breathing?view=minecraft-bedrock-stable"/>

Pauses this entity's breathing under water.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:underwater_movement`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_underwater_movement?view=minecraft-bedrock-stable"/>

Defines the speed with which an entity can move through water.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:uses_legacy_friction`

<Usable type="all"/> <Version add="1.26.20"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_uses_legacy_friction?view=minecraft-bedrock-stable"/>

When set, legacy calculations are used when applying "`minecraft:friction_modifier".`

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:variable_max_auto_step`

<Usable type="all"/> <Version add="1.19.50"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_variable_max_auto_step?view=minecraft-bedrock-stable"/>

Entities with this component will have a maximum auto step height that is different depending on whether they are on a block that prevents jumping.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:vertical_movement_action`

<Usable type="all"/> <Version add="1.21.110"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_vertical_movement.action?view=minecraft-bedrock-stable"/>

当用[`minecraft:rideable`](#minecraftrideable)组件设定为可骑乘实体后，该实体将可由玩家的跳跃行为控制竖直方向上的运动。类似于快乐恶魂。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:vibration_damper`

<Usable type="all"/> <Version add="1.19.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_vibration_damper?view=minecraft-bedrock-stable"/>

Vibrations emitted by an entity with this component will be ignored.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:vibration_listener`

<Usable type="all"/> <Version add="1.19.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_vibration_listener?view=minecraft-bedrock-stable"/>

Allows the entity to listen to vibration events.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:walk_animation_speed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_walk_animation_speed?view=minecraft-bedrock-stable"/>

Sets the speed multiplier for this entity's walk animation speed.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:wants_jockey`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_wants_jockey?view=minecraft-bedrock-stable"/>

Sets that this entity wants to become a jockey.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:water_movement`

<Usable type="all"/> <Version add="1.12.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_water_movement?view=minecraft-bedrock-stable"/>

Customizes how the entity moves through water by adjusting drag coefficient.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:wither_target_highest_damage`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_wither_target_highest_damage?view=minecraft-bedrock-stable"/>

Allows the wither to focus its attacks on whichever mob has dealt the most damage to it.

---
---

## 寻路与运动组件

寻路与运动组件规定了实体在拥有一个目标后，会尝试以何种路径到达预定地点。

### `minecraft:movement`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement?view=minecraft-bedrock-stable"/>

Defines the base movement speed of an entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.amphibious`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.amphibious?view=minecraft-bedrock-stable"/>

This move control allows the mob to swim in water and walk on land.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.basic`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.basic?view=minecraft-bedrock-stable"/>

This component accents the movement of an entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.dolphin`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.dolphin?view=minecraft-bedrock-stable"/>

This component can control how dolphins move, in a dolphin-esque style.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.fly`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.fly?view=minecraft-bedrock-stable"/>

This move control causes the mob to fly.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.generic`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.generic?view=minecraft-bedrock-stable"/>

This move control allows a mob to fly, swim, climb, etc.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.glide`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.glide?view=minecraft-bedrock-stable"/>

This move control causes the mob to glide.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.hover`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.hover?view=minecraft-bedrock-stable"/>

This move control causes the mob to hover.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.jump`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.jump?view=minecraft-bedrock-stable"/>

Move control that causes the mob to jump as it moves with a specified delay between jumps.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.skip`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.skip?view=minecraft-bedrock-stable"/>

This move control causes the mob to hop as it moves.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:movement.sway`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.sway?view=minecraft-bedrock-stable"/>

This move control causes the mob to sway side to side giving the impression it is swimming.

---

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:navigation.climb`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.climb?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths that include vertical walls like the vanilla Spiders do.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:navigation.float`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.float?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths by flying around the air like the regular Ghast.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:navigation.fly`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.fly?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths in the air like the vanilla Parrots do.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:navigation.generic`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.generic?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths by walking, swimming, flying and/or climbing around and jumping up and down a block.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:navigation.hover`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.hover?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths in the air like the vanilla Bees do.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:navigation.swim`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.swim?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths that include water.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:navigation.walk`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.walk?view=minecraft-bedrock-stable"/>

定义实体会以行走的方式寻路并到达预定地点。

---
---

## AI 意向组件

AI 意向组件（AI Goal Components）规定了实体的 AI，规定 AI 后可以使得实体拥有“想要做什么事情”的能力。

### `minecraft:behavior.admire_item`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_admire_item?view=minecraft-bedrock-stable"/>

Enables the mob to admire items that have been configured as admirable.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.aquatic_charge_attack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_aquatic_charge_attack?view=minecraft-bedrock-stable"/>

Enables an aquatic mob to dash at its target with knockback; includes overshoot and cooldown settings.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.avoid_block`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.120及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_avoid_block?view=minecraft-bedrock-stable"/>

Allows this entity to avoid certain blocks.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.avoid_mob_type`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.120及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_avoid_mob_type?view=minecraft-bedrock-stable"/>

Allows the entity to run away from other entities that meet the criteria specified.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.barter`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehaviobartere)?view=minecraft-bedrock-stable"/>

Enables the mob to barter for items that have been configured as barter currency.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.beg`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehabegname)?view=minecraft-bedrock-stable"/>

Allows this mob to look at and follow the player that holds food they like.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.break_door`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_break_door?view=minecraft-bedrock-stable"/>

Allows this mob to break doors.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.breed`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavibreedme)?view=minecraft-bedrock-stable"/>

Allows this mob to breed with other mobs.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.celebrate`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_celebrate?view=minecraft-bedrock-stable"/>

Allows this entity to celebrate surviving a raid by making celebration sounds and jumping.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.celebrate_survive`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_celebrate_survive?view=minecraft-bedrock-stable"/>

Allows the player to trade with this mob.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.charge_attack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_charge_attack?view=minecraft-bedrock-stable"/>

Allows this entity to damage a target by using a running attack.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.charge_held_item`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_charge_held_item?view=minecraft-bedrock-stable"/>

Allows an entity to charge and use their held item.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.circle_around_anchor`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_circle_around_anchor?view=minecraft-bedrock-stable"/>

Causes an entity to circle around an anchor point placed near a point or target.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.controlled_by_player`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_controlled_by_player?view=minecraft-bedrock-stable"/>

Allows the entity to be controlled by the player using an item in the item_controllable property (required).

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.croak`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavicroakme)?view=minecraft-bedrock-stable"/>

Allows the entity to croak at a random time interval with configurable conditions.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.defend_trusted_target`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_defend_trusted_target?view=minecraft-bedrock-stable"/>

Allows the mob to target another mob that hurts an entity it trusts.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.defend_village_target`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_defend_village_target?view=minecraft-bedrock-stable"/>

Allows the entity to stay in a village and defend the village from aggressors.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.delayed_attack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_delayed_attack?view=minecraft-bedrock-stable"/>

Allows an entity to attack, while also delaying the damage-dealt until a specific time in the attack animation.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.dig`

<Usable type="all"/> <Version add="1.19.40"/> <Highlight text="严格解析" tooltip="在1.21.120及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dig?view=minecraft-bedrock-stable"/>

Allows this entity to dig into the ground before despawning.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.door_interact`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_door_interact?view=minecraft-bedrock-stable"/>

Allows the mob to open and close doors.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.dragonchargeplayer`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dragonchargeplayer?view=minecraft-bedrock-stable"/>

Allows this entity to attack a player by charging at them.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.dragondeath`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dragondeath?view=minecraft-bedrock-stable"/>

Allows the dragon to go out with glory.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.dragonflaming`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dragonflaming?view=minecraft-bedrock-stable"/>

Allows this entity to use a flame-breath attack.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.dragonholdingpattern`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dragonholdingpattern?view=minecraft-bedrock-stable"/>

Allows the Dragon to fly around in a circle around the center podium.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.dragonlanding`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dragonlanding?view=minecraft-bedrock-stable"/>

Allows the Dragon to stop flying and transition into perching mode.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.dragonscanning`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dragonscanning?view=minecraft-bedrock-stable"/>

Allows the dragon to look around for a player to attack while in perch mode.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.dragonstrafeplayer`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dragonstrafeplayer?view=minecraft-bedrock-stable"/>

Allows this entity to fly around looking for a player to shoot fireballs at.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.dragontakeoff`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dragontakeoff?view=minecraft-bedrock-stable"/>

Allows the dragon to leave perch mode and go back to flying around.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.drink_milk`

<Usable type="all"/> <Version add="1.19.10"/> <Highlight text="严格解析" tooltip="在1.21.120及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_drink_milk?view=minecraft-bedrock-stable"/>

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.drink_potion`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_drink_potion?view=minecraft-bedrock-stable"/>

Allows the mob to drink potions based on specified environment conditions.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.drop_item_for`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_drop_item_for?view=minecraft-bedrock-stable"/>

Allows the entity to move toward a target, and drop an item near the target.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.eat_block`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_eat_block?view=minecraft-bedrock-stable"/>

Allows the entity to consume a block, replace the eaten block with another block, and trigger an event as a result.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.eat_carried_item`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_eat_carried_item?view=minecraft-bedrock-stable"/>

If the mob is carrying a food item, the mob will eat it and the effects will be applied to the mob.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.eat_mob`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavioreat_mob)?view=minecraft-bedrock-stable"/>

Allows the entity to eat a specified Mob.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.emerge`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavioemergee)?view=minecraft-bedrock-stable"/>

Allows this entity to emerge from the ground

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.equip_item`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_equip_item?view=minecraft-bedrock-stable"/>

The entity puts on the desired equipment.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.explore_outskirts`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_explore_outskirts?view=minecraft-bedrock-stable"/>

Allows the entity to first travel to a random point on the outskirts of the village, and then explore random points within a small distance.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.fertilize_farm_block`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_fertilize_farm_block?view=minecraft-bedrock-stable"/>

Allows the mob to search within an area for a growable crop block.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.find_cover`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_find_cover?view=minecraft-bedrock-stable"/>

Allows the mob to seek shade.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.find_mount`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_find_mount?view=minecraft-bedrock-stable"/>

Allows the mob to look around for another mob to ride atop it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.find_underwater_treasure`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_find_underwater_treasure?view=minecraft-bedrock-stable"/>

Allows the mob to move towards the nearest underwater ruin or shipwreck.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.fire_at_target`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_fire_at_target?view=minecraft-bedrock-stable"/>

Allows an entity to attack by firing a shot with a delay.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.flee_sun`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_flee_sun?view=minecraft-bedrock-stable"/>

Allows the mob to run away from direct sunlight and seek shade.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.float`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavifloatme)?view=minecraft-bedrock-stable"/>

Allows the mob to stay afloat while swimming.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.float_tempt`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_float_tempt?view=minecraft-bedrock-stable"/>

Allows a mob to be tempted by a player holding a specific item.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.float_wander`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_float_wander?view=minecraft-bedrock-stable"/>

Allows the mob to float around like the Ghast.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.follow_caravan`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_follow_caravan?view=minecraft-bedrock-stable"/>

Allows the mob to follow mobs that are in a caravan.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.follow_mob`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_follow_mob?view=minecraft-bedrock-stable"/>

Allows the mob to follow other mobs.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.follow_owner`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_follow_owner?view=minecraft-bedrock-stable"/>

Allows a mob to follow the player that owns it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.follow_parent`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_follow_parent?view=minecraft-bedrock-stable"/>

Allows the mob to follow their parent around.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.follow_target_captain`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_follow_target_captain?view=minecraft-bedrock-stable"/>

Allows mob to move towards its current target captain.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.follow_target_leader`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_follow_target_leader?view=minecraft-bedrock-stable"/>

Allows mob to move towards its target leader.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.go_and_give_items_to_noteblock`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_go_and_give_items_to_noteblock?view=minecraft-bedrock-stable"/>

The entity will attempt to toss the items from its inventory to a nearby recently played noteblock.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.go_and_give_items_to_owner`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_go_and_give_items_to_owner?view=minecraft-bedrock-stable"/>

The entity will attempt to toss the items from its inventory to its owner.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.go_home`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehaviorgo_home)?view=minecraft-bedrock-stable"/>

Allows the mob to move back to the position they were spawned.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.guardian_attack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_guardian_attack?view=minecraft-bedrock-stable"/>

Allows this entity to use a laser beam attack.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.harvest_farm_block`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_harvest_farm_block?view=minecraft-bedrock-stable"/>

Allows the entity to search within an area for farmland with air above it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.hide`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavhideame)?view=minecraft-bedrock-stable"/>

Allows a mob with the hide component to attempt to move to - and hide at - an owned or nearby POI.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.hold_ground`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_hold_ground?view=minecraft-bedrock-stable"/>

Compels an entity to stop at their current location, turn to face a mob they are targeting, and react with an event.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.hover`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavihoverme)?view=minecraft-bedrock-stable"/>

Allows the mob to hover in place.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.hurt_by_target`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_hurt_by_target?view=minecraft-bedrock-stable"/>

Allows the mob to target another mob that hurts them.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.inspect_bookshelf`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_inspect_bookshelf?view=minecraft-bedrock-stable"/>

Allows the mob to inspect bookshelves.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.investigate_suspicious_location`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_investigate_suspicious_location?view=minecraft-bedrock-stable"/>

Allows this entity to move towards a "suspicious" position based on data gathered in minecraft:suspect_tracking.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.jump_around_target`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_jump_around_target?view=minecraft-bedrock-stable"/>

Allows an entity to jump around a target.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.jump_to_block`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_jump_to_block?view=minecraft-bedrock-stable"/>

Allows an entity to jump to another random block.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.knockback_roar`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_knockback_roar?view=minecraft-bedrock-stable"/>

Allows the mob to perform a damaging knockback that affects all nearby entities.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.lay_down`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_lay_down?view=minecraft-bedrock-stable"/>

Allows mobs to lay down at times

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.lay_egg`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehaviorlay_egg)?view=minecraft-bedrock-stable"/>

Allows the mob to lay an egg block on certain types of blocks if the mob is pregnant.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.leap_at_target`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_leap_at_target?view=minecraft-bedrock-stable"/>

Allows monsters to jump at and attack their target.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.look_at_entity`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_look_at_entity?view=minecraft-bedrock-stable"/>

Compels an entity to look at a specific entity by rotating the head bone pose within a set limit.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.look_at_player`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_look_at_player?view=minecraft-bedrock-stable"/>

Compels an entity to look at the player by rotating the head bone pose within a set limit.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.look_at_target`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_look_at_target?view=minecraft-bedrock-stable"/>

Compels an entity to look at the target by rotating the head bone pose within a set limit.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.look_at_trading_player`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_look_at_trading_player?view=minecraft-bedrock-stable"/>

Compels an entity to look at the player that is currently trading with the entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.make_love`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_make_love?view=minecraft-bedrock-stable"/>

Allows the villager to look for a mate to spawn other villagers with.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.melee_attack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_melee_attack?view=minecraft-bedrock-stable"/>

Allows an entity to deal damage through a melee attack.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.melee_box_attack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_melee_box_attack?view=minecraft-bedrock-stable"/>

Allows an entity to deal damage through a melee attack with reach calculations based on bounding boxes.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.mingle`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehaviominglee)?view=minecraft-bedrock-stable"/>

Allows an entity to go to the village bell and mingle with other entities

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.mount_pathing`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_mount_pathing?view=minecraft-bedrock-stable"/>

Allows the mob to move around on its own while mounted seeking a target to attack.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_around_target`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_around_target?view=minecraft-bedrock-stable"/>

Allows an entity to move around a target.If the entity is too close(i.e.closer than destination range min and height difference limit) it will try to move away from its target.If the entity is too far away from its target it will try to move closer to a random position within the destination range.A randomized amount of those positions will be behind the target, and the spread can be tweaked with 'destination_pos_spread_degrees'.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_indoors`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_indoors?view=minecraft-bedrock-stable"/>

Allows this entity to move indoors.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_outdoors`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_outdoors?view=minecraft-bedrock-stable"/>

Allows this entity to move outdoors.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_through_village`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_through_village?view=minecraft-bedrock-stable"/>

Can only be used by Villagers.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_towards_dwelling_restriction`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_towards_dwelling_restriction?view=minecraft-bedrock-stable"/>

Allows entities with the "minecraft:dweller" component to move toward their village area that the entity should be restricted to.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_towards_home_restriction`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_towards_home_restriction?view=minecraft-bedrock-stable"/>

Allows entities with a minecraft:home component to move towards their home position.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_towards_restriction`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_towards_restriction?view=minecraft-bedrock-stable"/>

AI goal that drives entities back toward their designated home area when they've wandered too far.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_towards_target`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_towards_target?view=minecraft-bedrock-stable"/>

Allows mob to move towards its current target.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_to_block`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_to_block?view=minecraft-bedrock-stable"/>

Allows mob to move towards a block.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_to_land`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_to_land?view=minecraft-bedrock-stable"/>

Allows the mob to move back onto land when in water.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_to_liquid`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_to_liquid?view=minecraft-bedrock-stable"/>

Allows the mob to move into a liquid when on land.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_to_poi`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_to_poi?view=minecraft-bedrock-stable"/>

Allows the mob to move to a POI if able to

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_to_random_block`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_to_random_block?view=minecraft-bedrock-stable"/>

Allows mob to move towards a random block.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_to_village`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_to_village?view=minecraft-bedrock-stable"/>

Allows the mob to move into a random location within a village.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.move_to_water`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_to_water?view=minecraft-bedrock-stable"/>

Allows the mob to move back into water when on land.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.nap`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehanapname)?view=minecraft-bedrock-stable"/>

Allows mobs to occassionally stop and take a nap under certain conditions.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.nearest_attackable_target`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_nearest_attackable_target?view=minecraft-bedrock-stable"/>

Allows an entity to attack the closest target within a given subset of specific target types.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.nearest_prioritized_attackable_target`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_nearest_prioritized_attackable_target?view=minecraft-bedrock-stable"/>

Allows the mob to check for and pursue the nearest valid target.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.ocelotattack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_ocelotattack?view=minecraft-bedrock-stable"/>

Controls specific attack behavior for Ocelots.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.ocelot_sit_on_block`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_ocelot_sit_on_block?view=minecraft-bedrock-stable"/>

Allows to mob to be able to sit in place like the ocelot.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.offer_flower`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_offer_flower?view=minecraft-bedrock-stable"/>

Allows the mob to offer a flower to another mob with the minecraft:take_flower behavior.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.open_door`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_open_door?view=minecraft-bedrock-stable"/>

Allows the mob to open doors.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.owner_hurt_by_target`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_owner_hurt_by_target?view=minecraft-bedrock-stable"/>

Allows the mob to target another mob that hurts their owner.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.owner_hurt_target`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_owner_hurt_target?view=minecraft-bedrock-stable"/>

Allows the mob to target a mob that is hurt by their owner.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.panic`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavipanicme)?view=minecraft-bedrock-stable"/>

Allows the mob to enter the panic state, which makes it run around and away from the damage source that made it enter this state.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.pet_sleep_with_owner`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_pet_sleep_with_owner?view=minecraft-bedrock-stable"/>

Allows the pet mob to move onto a bed with its owner while sleeping.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.pickup_items`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_pickup_items?view=minecraft-bedrock-stable"/>

Allows the mob to pick up items on the ground.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.place_block`

<Usable type="all"/> <Version add="1.21.100" tooltip="在更旧的版本下使用minecraft:behavior.enderman_leave_block组件。"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_place_block?view=minecraft-bedrock-stable"/>

定义实体会放下方块。类似于末影人。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.play`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavplayame)?view=minecraft-bedrock-stable"/>

Allows the mob to offer a flower to another mob with the minecraft:take_flower behavior.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.player_ride_tamed`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_player_ride_tamed?view=minecraft-bedrock-stable"/>

Allows the mob to be ridden by the player after being tamed.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.play_dead`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_play_dead?view=minecraft-bedrock-stable"/>

Allows this entity to pretend to be dead to avoid being targeted by attackers.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.raid_garden`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_raid_garden?view=minecraft-bedrock-stable"/>

Allows the mob to eat/raid crops out of farms until they are full.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.ram_attack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_ram_attack?view=minecraft-bedrock-stable"/>

Allows this entity to damage a target by using a running attack.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.random_breach`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_random_breach?view=minecraft-bedrock-stable"/>

Allows the mob to randomly break surface of the water.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.random_fly`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_random_fly?view=minecraft-bedrock-stable"/>

Allows a mob to randomly fly around.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.random_hover`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_random_hover?view=minecraft-bedrock-stable"/>

Allows the mob to hover around randomly, close to the surface.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.random_look_around`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_random_look_around?view=minecraft-bedrock-stable"/>

Allows the mob to randomly look around.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.random_look_around_and_sit`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_random_look_around_and_sit?view=minecraft-bedrock-stable"/>

Allows the mob to randomly sit and look around for a duration.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.random_search_and_dig`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_random_search_and_dig?view=minecraft-bedrock-stable"/>

Allows this entity to locate a random target block that it can path find to.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.random_sitting`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_random_sitting?view=minecraft-bedrock-stable"/>

Allows the mob to randomly sit for a duration.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.random_stroll`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_random_stroll?view=minecraft-bedrock-stable"/>

Allows a mob to randomly stroll around.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.random_swim`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_random_swim?view=minecraft-bedrock-stable"/>

Allows an entity to randomly move through water

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.ranged_attack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_ranged_attack?view=minecraft-bedrock-stable"/>

Allows an entity to attack by using ranged shots.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.receive_love`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_receive_love?view=minecraft-bedrock-stable"/>

Allows the villager to stop so another villager can breed with it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.restrict_open_door`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_restrict_open_door?view=minecraft-bedrock-stable"/>

Allows the mob to stay indoors during night time.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.restrict_sun`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_restrict_sun?view=minecraft-bedrock-stable"/>

Allows the mob to automatically start avoiding the sun when its a clear day out.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.rise_to_liquid_level`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_rise_to_liquid_level?view=minecraft-bedrock-stable"/>

Allows the mob to stay at a certain level when in liquid.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.roar`

<Usable type="all"/> <Version add="1.19.0"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_roar?view=minecraft-bedrock-stable"/>

Allows this entity to roar at another entity based on data in minecraft:anger_level.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.roll`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavrollame)?view=minecraft-bedrock-stable"/>

This allows the mob to roll forward.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.run_around_like_crazy`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_run_around_like_crazy?view=minecraft-bedrock-stable"/>

Allows the mob to run around aimlessly.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.scared`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavioscarede)?view=minecraft-bedrock-stable"/>

Allows the mob to become scared when the weather outside is thundering.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.send_event`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_send_event?view=minecraft-bedrock-stable"/>

Allows the mob to send an event to another mob.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.share_items`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_share_items?view=minecraft-bedrock-stable"/>

Allows the mob to give items it has to others.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.silverfish_merge_with_stone`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_silverfish_merge_with_stone?view=minecraft-bedrock-stable"/>

Allows the mob to go into stone blocks like Silverfish do.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.silverfish_wake_up_friends`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_silverfish_wake_up_friends?view=minecraft-bedrock-stable"/>

Allows the mob to alert mobs in nearby blocks to come out.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.skeleton_horse_trap`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_skeleton_horse_trap?view=minecraft-bedrock-stable"/>

Allows Equine mobs to be Horse Traps and be triggered like them, spawning a lightning bolt and a bunch of horses when a player is nearby.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.sleep`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavisleepme)?view=minecraft-bedrock-stable"/>

Allows mobs that own a bed to in a village to move to and sleep in it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.slime_attack`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_slime_attack?view=minecraft-bedrock-stable"/>

Causes the entity to grow tired every once in a while, while attacking.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.slime_float`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_slime_float?view=minecraft-bedrock-stable"/>

Allow slimes to float in water / lava.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.slime_keep_on_jumping`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_slime_keep_on_jumping?view=minecraft-bedrock-stable"/>

Allows the entity to continuously jump around like a slime.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.slime_random_direction`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_slime_random_direction?view=minecraft-bedrock-stable"/>

Allows the entity to move in random directions like a slime.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.snacking`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_snacking?view=minecraft-bedrock-stable"/>

Allows the mob to take a load off and snack on food that it found nearby.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.sneeze`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehaviosneezee)?view=minecraft-bedrock-stable"/>

Allows the mob to sneeze, causing it to drop items and affect nearby mobs.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.sniff`

<Usable type="all"/> <Version add="1.19.40"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_sniff?view=minecraft-bedrock-stable"/>

Allows this entity to detect the nearest player within "sniffing_radius" and update its "minecraft:suspect_tracking" component state

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.sonic_boom`

<Usable type="all"/> <Version add="1.19.40"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_sonic_boom?view=minecraft-bedrock-stable"/>

Allows this entity to perform a 'sonic boom' ranged attack

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.squid_dive`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_squid_dive?view=minecraft-bedrock-stable"/>

Allows the squid to dive down in water.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.squid_flee`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_squid_flee?view=minecraft-bedrock-stable"/>

Allows the squid to swim away.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.squid_idle`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_squid_idle?view=minecraft-bedrock-stable"/>

Allows the squid to swim in place idly.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.squid_move_away_from_ground`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_squid_move_away_from_ground?view=minecraft-bedrock-stable"/>

Allows the squid to move away from ground blocks and back to water.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.squid_out_of_water`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_squid_out_of_water?view=minecraft-bedrock-stable"/>

Allows the squid to stick to the ground when outside water.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.stalk_and_pounce_on_target`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_stalk_and_pounce_on_target?view=minecraft-bedrock-stable"/>

Allows a mob to stalk a target, then once within range pounce onto a target, on success the target will be attacked dealing damage defined by the attack component.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.stay_near_noteblock`

<Usable type="all"/> <Version add="1.19.40"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_stay_near_noteblock?view=minecraft-bedrock-stable"/>

The entity will attempt to toss the items from its inventory to a nearby recently played noteblock.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.stay_while_sitting`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_stay_while_sitting?view=minecraft-bedrock-stable"/>

Allows the mob to stay put while it is in a sitting state instead of doing something else.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.stomp_attack`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_stomp_attack?view=minecraft-bedrock-stable"/>

Allows an entity to attack using stomp AoE damage behavior.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.stomp_turtle_egg`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_stomp_turtle_egg?view=minecraft-bedrock-stable"/>

Allows this mob to stomp turtle eggs

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.stroll_towards_village`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_stroll_towards_village?view=minecraft-bedrock-stable"/>

Allows the mob to move into a random location within a village within the search range.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.summon_entity`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_summon_entity?view=minecraft-bedrock-stable"/>

Allows the mob to attack the player by summoning other entities.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.swell`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehaviswellme)?view=minecraft-bedrock-stable"/>

Allows the creeper to swell up when a player is nearby.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.swim_idle`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swim_idle?view=minecraft-bedrock-stable"/>

Allows the entity go idle, if swimming.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.swim_up_for_breath`

<Usable type="all"/> <Version add="1.21.20"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swim_up_for_breath?view=minecraft-bedrock-stable"/>

Allows the mob to try to move to air once it is close to running out of its total breathable supply.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.swim_wander`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swim_wander?view=minecraft-bedrock-stable"/>

Allows the entity to wander around while swimming, when not path-finding.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.swim_with_entity`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swim_with_entity?view=minecraft-bedrock-stable"/>

Allows the entity follow another entity.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.swoop_attack`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swoop_attack?view=minecraft-bedrock-stable"/>

Allows an entity to attack using swoop attack behavior; Ideal for use with flying mobs.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.take_block`

<Usable type="all"/> <Version add="1.21.100" tooltip="在更旧的版本下使用minecraft:behavior.enderman_take_block组件。"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_take_block?view=minecraft-bedrock-stable"/>

定义实体会拿走方块。类似于末影人。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.take_flower`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_take_flower?view=minecraft-bedrock-stable"/>

Allows the mob to accept flowers from another mob with the minecraft:offer_flower behavior.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.target_when_pushed`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_target_when_pushed?view=minecraft-bedrock-stable"/>

Allows the mob to target another mob when it is pushed by that mob.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.teleport_to_owner`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_teleport_to_owner?view=minecraft-bedrock-stable"/>

Allows an entity to teleport to its owner.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.tempt`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavitemptme)?view=minecraft-bedrock-stable"/>

Allows a mob to be tempted by a player holding a specific item.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.timer_flag_1`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_timer_flag_1?view=minecraft-bedrock-stable"/>

Fires an event when this behavior starts, then waits for a duration before stopping.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.timer_flag_2`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_timer_flag_2?view=minecraft-bedrock-stable"/>

Fires an event when this behavior starts, then waits for a duration before stopping.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.timer_flag_3`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_timer_flag_3?view=minecraft-bedrock-stable"/>

Fires an event when this behavior starts, then waits for a duration before stopping.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.trade_interest`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_trade_interest?view=minecraft-bedrock-stable"/>

Allows the mob to look at a player that is holding a tradable item.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.trade_with_player`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_trade_with_player?view=minecraft-bedrock-stable"/>

Allows the player to trade with this mob.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.transport_items`

<Usable type="all"/> <Version add="1.21.100"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:navigation.*组件以进行寻路。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_transport_items?view=minecraft-bedrock-stable"/>

定义实体会从容器中运输物品，或将物品运输到容器中。类似于铜傀儡。

另见：*[`minecraft:navigation.walk`](#minecraftnavigationwalk)组件*等寻路组件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.use_kinetic_weapon`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_use_kinetic_weapon?view=minecraft-bedrock-stable"/>

Enables a mob to use kinetic weaponry by intermittently charging at its target and repositioning afterward.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.vex_copy_owner_target`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_vex_copy_owner_target?view=minecraft-bedrock-stable"/>

Allows the mob to target the same entity its owner is targeting.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.vex_random_move`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_vex_random_move?view=minecraft-bedrock-stable"/>

Allows the mob to move around randomly like the Vex.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.wither_random_attack_pos_goal`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_wither_random_attack_pos_goal?view=minecraft-bedrock-stable"/>

Allows the wither to launch random attacks.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.wither_target_highest_damage`

<Usable type="all"/> <Version add="?"/> <Highlight text="严格解析" tooltip="在1.26.30及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_wither_target_highest_damage?view=minecraft-bedrock-stable"/>

Allows the wither to focus its attacks on whichever mob has dealt the most damage to it.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.work`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavworkame)?view=minecraft-bedrock-stable"/>

Allows the NPC to use the POI

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.work_composter`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_work_composter?view=minecraft-bedrock-stable"/>

Allows the NPC to use the composter POI to convert excess seeds into bone meal.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---
---

## 标记组件

标记组件是用于标记实体状态的组件，它们并不具有任何功能，只能在相关 Molang 中读取其状态。在旧版本中，常常使用这些标记组件记录实体的状态，但 1.19.50 开放的[实体属性](./property)完全可以完全替代下文的标记组件，因此现在这些组件已不常使用。

### `minecraft:is_baby`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_baby?view=minecraft-bedrock-stable"/>

Sets that this entity is a baby.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_charged`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_charged?view=minecraft-bedrock-stable"/>

Sets that this entity is charged.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_chested`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_chested?view=minecraft-bedrock-stable"/>

Sets that this entity is currently carrying a chest.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_ignited`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_ignited?view=minecraft-bedrock-stable"/>

Sets that this entity is currently on fire.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_pregnant`

<Usable type="all"/> <Version add="1.20.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_pregnant?view=minecraft-bedrock-stable"/>

Sets that this entity is currently pregnant.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_shaking`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_shaking?view=minecraft-bedrock-stable"/>

Sets that this entity is currently shaking.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_saddled`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_saddled?view=minecraft-bedrock-stable"/>

Sets that this entity is currently saddled.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_sheared`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_sheared?view=minecraft-bedrock-stable"/>

Sets that this entity is currently sheared.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_stunned`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_stunned?view=minecraft-bedrock-stable"/>

Sets that this entity is currently stunned.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:is_tamed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_tamed?view=minecraft-bedrock-stable"/>

Sets that this entity is currently tamed.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:mark_variant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_mark_variant?view=minecraft-bedrock-stable"/>

Mark Variant is typically used as an additional per-type way (besides variant) to express a different visual form of the same mob.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:skin_id`

<Usable type="all"/> <Version add="1.12.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_skin_id?view=minecraft-bedrock-stable"/>

Skin ID value.

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:variant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_variant?view=minecraft-bedrock-stable"/>

Variant is typically used as a per-type way to express a different visual form of the same mob.

---
---

## 弃用组件

以下组件仅限旧版本的实体适用，故本文档也一并列出，但若条件允许，请尽可能使用更高版本的格式版本和组件。

### `minecraft:body_rotation_axis_aligned`

<Usable type="all"/> <Version add="1.21.70" deprecated="1.21.100" tooltip="在高版本使用minecraft:rotation_axis_aligned组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_axis_aligned?view=minecraft-bedrock-stable"/>

定义实体可被其他实体或方块推动。

另见：*[`minecraft:rotation_axis_aligned`](#minecraftrotation_axis_aligned)组件*。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:dash`

<Usable type="all"/> <Version add="1.20.40" deprecated="1.21.110" tooltip="在高版本使用minecraft:dash_action组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dash?view=minecraft-bedrock-stable"/>

定义可骑乘实体的冲刺行为。类似于骆驼。

另见：*[`minecraft:dash_action`](#minecraftdash_action)组件*。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:foot_size`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.16.100"/> <br/>

定义实体行走一步的距离。

<treeview>
- <DataType type="object" name="minecraft:foot_size"/>：根对象。
  - <DataType type="float" name="value"/>：实体行走一步的距离。默认值为`0.5`。
</treeview>

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:hurt_when_wet`

<Usable type="all"/> <Version add="1.2.0" deprecated="?"/> <br/>

定义实体被打湿后受伤。

<treeview>
- <DataType type="object" name="minecraft:hurt_when_wet"/>：根对象。不含任何参数。
</treeview>

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:input_air_controlled`

<Usable type="all"/> <Version add="1.21.90" deprecated="1.21.110" tooltip="在高版本使用minecraft:rotation_axis_aligned组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_input_air_controlled?view=minecraft-bedrock-stable"/>

当用[`minecraft:rideable`](#minecraftrideable)组件设定为可骑乘实体后，该实体将可由 WASD 和鼠标控制运动。类似于快乐恶魂。

另见：*[`minecraft:free_camera_controlled`](#minecraftfree_camera_controlled)组件*。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:lookat`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.40" tooltip="在高版本使用minecraft:looked_at组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_pushable?view=minecraft-bedrock-stable"/>

定义实体可被其他实体或方块推动。

另见：*[`minecraft:looked_at`](#minecraftlooked_at)组件*。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:pushable"/>：根对象。
  - <DataType type="boolean" name="is_pushable"/>：该实体是否能被其他实体推动。
  - <DataType type="boolean" name="is_pushable_by_piston"/>：该实体是否能被活塞安全推动。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:pushable": {}
```

箭（<FileType type="file" name="arrow.json"/>）：

```json showLineNumbers
"minecraft:pushable": {
    "is_pushable": false,
    "is_pushable_by_piston": true
}
```

</TabItem></Tabs>

---

### `minecraft:pushable`

<Usable type="all"/> <Version add="1.13.0" deprecated="1.26.10" tooltip="在高版本使用minecraft:pushable_by_block组件和minecraft:pushable_by_entity组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_pushable?view=minecraft-bedrock-stable"/>

定义实体可被其他实体或方块推动。

另见：*[`minecraft:pushable_by_block`](#minecraftpushable_by_block)组件*、*[`minecraft:pushable_by_entity`](#minecraftpushable_by_entity)组件*。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:pushable"/>：根对象。
  - <DataType type="boolean" name="is_pushable"/>：该实体是否能被其他实体推动。
  - <DataType type="boolean" name="is_pushable_by_piston"/>：该实体是否能被活塞安全推动。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:pushable": {}
```

箭（<FileType type="file" name="arrow.json"/>）：

```json showLineNumbers
"minecraft:pushable": {
    "is_pushable": false,
    "is_pushable_by_piston": true
}
```

</TabItem></Tabs>

---

### `minecraft:scaffolding_climber`

<Usable type="all"/> <Version add="1.8.0" deprecated="1.17.10"/> <br/>

定义玩家可以检测到脚手架并在其上移动。

<treeview>
- <DataType type="object" name="minecraft:scaffolding_climber"/>：根对象。不含任何参数。
</treeview>

---

### `minecraft:behavior.enderman_leave_block`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.100" tooltip="在高版本使用minecraft:behavior.place_block组件代替之。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影人可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_enderman_leave_block?view=minecraft-bedrock-stable"/>

定义末影人会放下方块。

另见：*[`minecraft:behavior.place_block`](#minecraftbehaviorplace_block)组件*。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:behavior.enderman_take_block`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.100" tooltip="在高版本使用minecraft:behavior.take_block组件代替之。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影人可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_enderman_take_block?view=minecraft-bedrock-stable"/>

定义末影人会拿走方块。

另见：*[`minecraft:behavior.take_block`](#minecraftbehaviortake_block)组件*。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [实体组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/componentlist?view=minecraft-bedrock-stable)
- [实体 AI 意向组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/aigoallist?view=minecraft-bedrock-stable)

[^1]: 有待验证。
