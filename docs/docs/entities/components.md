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

### `minecraft:type_family`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_type_family?view=minecraft-bedrock-stable"/>

定义实体所属的家族类型。家族类型可用于在[过滤器](./filters)中、命令中或其他游戏系统进行分类判断（例如：`mob`、`monster`、`undead`、`zombie`等）。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:type_family"/>：根对象。
  - <DataType type="array" name="family"/>：定义实体的家族类型。
    - <DataType type="string"/>：家族类型。通常在该数组中会定义一个和实体本身 ID 一致的家族，一些常见的原版家族类型（`mob`、`inanimate`、`aquatic`、`monster`、`undead`、`skeleton`、`arthropod`、`zombie`、`lightweight`、`fish`、`player`），也可以自定义。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骷髅（<FileType type="file" name="skeleton.json"/>）：

```json showLineNumbers
"minecraft:type_family": { "family": ["skeleton", "undead", "monster", "mob"] }
```

盔甲架（<FileType type="file" name="armor_stand.json"/>）：

```json showLineNumbers
"minecraft:type_family": { "family": ["armor_stand", "inanimate", "mob"] }
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

定义一组子传感器：当其他实体在指定范围内满足某组条件时，每个子传感器都会触发事件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义基于环境条件的触发器。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使矿车类实体能够检测激活铁轨并响应其激活状态变化。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体能够看见或感知到其他实体并将其设为目标的范围。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

添加一个计时器，计时结束后触发事件。

---

---

## 功能性组件

### `minecraft:addrider`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_addrider?view=minecraft-bedrock-stable"/>

为实体添加一名骑乘者。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体在指定时长内忽略可攻击目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

为实体添加一个成长计时器。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义空气阻力对实体的影响程度。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体播放环境音效的间隔时间。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

迫使实体追踪对一组滋扰目标（nuisance）的愤怒值。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体通过计时器进入的“愤怒”状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_annotation_break_door?view=minecraft-bedrock-stable"/>

允许实体破坏门，前提是已为其导航设置了相应的标志位。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_annotation_open_door?view=minecraft-bedrock-stable"/>

允许实体开门。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体施加击退的方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义对进入范围内的实体造成伤害的攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的近战攻击伤害，以及命中时施加的额外状态效果。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

为实体添加攻击冷却。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

指定实体攻击时造成的伤害值。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许为该实体系上气球，并定义实体被气球牵引时的条件与事件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使实体能够以物易物，作为交换掉落物品。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许玩家检测到脚手架并在其上移动。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使实体的身体朝向与其头部朝向保持一致。不会覆盖 `minecraft:body_rotation_blocked` 组件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置后，实体不再在视觉上旋转身体以匹配其面向的方向。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义可骑乘实体冲刺的条件与行为。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义 Boss 的当前状态，用于更新 Boss 血条界面。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

控制实体与表面碰撞时的弹跳方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

指定实体移动时可破坏的方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体可呼吸的方块，并使其能够窒息。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体通过特定方式进入用于繁殖的求爱状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体进入“被贿赂”状态的方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使实体能够漂浮在指定的液体方块上。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

指定实体暴露在直射阳光下时会受到火焰伤害。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置后，阻止实体攻击拥有者实体，除非其拥有 `minecraft:ignore_cannot_be_attacked` 组件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体攀爬梯子。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

将实体标记为可以飞行；寻路时不再要求路径下方必须有固体方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

指定实体能否加入袭击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体像原版的马一样蓄力跳跃。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

指定狩猎后的庆祝行为。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的主体颜色。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的第二种纹理颜色。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使杀死该实体攻击目标的生物获得生命恢复 I，并移除其挖掘疲劳。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义该实体受到近战与远程攻击时的判定箱列表。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

按指定间隔对实体施加指定量的伤害。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置实体的默认头部旋转角度。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

当消失规则或可选过滤器判定为真时移除该实体。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

添加一个风干计时器：倒计时结束后触发 `dried_out_event`；当实体处于雨中或水中时计时停止，并触发 `stopped_drying_out_event`。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

迫使实体加入村庄或其他聚居地，并在其间迁移。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体与玩家交易的能力。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义装备在 `minecraft:equippable` 第二个槽位上的物品应对应到哪个盔甲槽位。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置实体使用的装备表。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体被装备物品时的行为。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义玩家的每种行为所消耗的疲劳值。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的爆炸方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置实体免疫火焰伤害。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置实体可以漂浮在液体方块中。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体是否在水中成群聚集。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的飞行速度，单位为方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义生物追击目标的最大距离，单位为方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义摩擦力对实体的影响程度。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体根据其正在穿过的方块，发出 entityMove、swim 和 flap 游戏事件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义生物的基因与等位基因如何遗传给后代，以及这些性状在后代身上的表现形式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义一组物品，对该实体使用这些物品时会触发事件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置实体实际位置相对地面的偏移量。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

记录指定半径内的实体群体规模。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

实体走过作物时可能会加速作物生长。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体恢复生命值的方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的心跳。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使实体移动到并躲藏在其拥有的兴趣点（POI）或最近的兴趣点处。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

记录实体生成时的“家”位置。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

决定马或类似实体（如驴）的跳跃高度。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许拥有者实体忽略满足过滤器条件的实体身上的 `minecraft:cannot_be_attacked` 组件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

当被配置为可骑乘实体时，该实体将使用 WASD 控制。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

检测实体是否位于所列方块之内。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

添加一个自上次休息以来的计时器，用于判断是否应生成幻翼。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

立即移除该实体。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的物品栏属性。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许其他生物与该生物发生垂直和水平碰撞。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许对该实体使用染料以改变其颜色。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

实体在隐身状态时可以躲避敌对生物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体为灾厄队长。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体的多个实例之间发生垂直和水平碰撞。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义骑乘该实体时可用哪些物品进行控制。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

决定该实体为物品漏斗。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义动态跳跃控制，会根据生物的速度修正值改变跳跃属性。需要配合 `minecraft:movement.skip` 使用。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

给予实体跳跃的能力。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

决定实体对近战攻击击退的抗性。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许为实体在熔岩方块上的移动设置自定义速度。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

描述该生物如何被拴绳拴到其他物品上。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许玩家将其他实体拴到该实体上、取回已拴在其上的实体，或用剪刀将其解开。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义其他实体注视拥有者实体时的行为。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

指定决定该实体死亡时掉落何种物品的战利品表。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

管理实体的交易能力。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义对进入范围内的实体施加状态效果的攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

拥有此组件的实体对所列状态效果免疫。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置用于确定播放移动音效的下一个脚步距离的偏移量。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许为该实体命名（例如使用命名牌）。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体产生后代的方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的“失控”状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的“探头”行为，以及该行为期间应调用的事件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体是否应在游戏世界中持久保留。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义玩家的疲劳值。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义玩家的每种行为所消耗的经验值。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义玩家的等级。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义玩家对食物的需求。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

指定偏好走优先路径的生物的寻路代价信息。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置实体能够挤开的距离。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

尝试在实体所在位置触发袭击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体在铁轨上的移动方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义劫掠兽的近战攻击被格挡时的反应。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

[实验性] 允许实体反弹弹射物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

表示该实体不允许在“和平”难度下存在。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置后，实体即使在隐身状态下也会渲染。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使实体的朝向与其载具的朝向保持一致。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置实体的视觉尺寸倍率。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体根据其年龄进行尺寸插值的方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

在指定的游戏时间点触发预定的生物事件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义生物想要分享或拾取的物品列表。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的远程攻击行为。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的“坐下”状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置实体音效的基础音量。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使玩家可以用该实体自己的刷怪蛋与其交互，从而生成一个幼年后代。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

添加一个计时器，计时结束后该实体将生成另一个实体或物品（类似于原版鸡的下蛋行为）。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体死亡时生成其他实体的行为。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体对自身添加或移除状态效果。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体搬运物品的力量值。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体记住可疑位置。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义该实体可以被驯服。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许通过骑乘来驯服该实体。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体的传送行为。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

补充实体的交易货物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体与玩家交易的能力。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使实体在世界中移动时留下方块轨迹。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体如何从当前定义转变为另一种定义。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

拥有此组件的实体绝不会被持久保留，一旦区块卸载便会永久消失。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体信任多名玩家。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义生物信任玩家的规则。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

暂停该实体在水下的呼吸计时。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义实体在水中移动的速度。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置后，应用 `minecraft:friction_modifier` 时将使用旧版计算方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

拥有此组件的实体，其最大自动跨越高度会根据所处方块是否阻止跳跃而有所不同。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

拥有此组件的实体发出的振动将被忽略。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体监听振动事件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置实体行走动画速度的倍率。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体想要成为骑手（jockey）。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

通过调整阻力系数自定义实体在水中的移动方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许凋灵将攻击集中在对其造成伤害最多的生物上。

---

---

## 寻路与运动组件

寻路与运动组件规定了实体在拥有一个目标后，会尝试以何种路径到达预定地点。

### `minecraft:movement`

<Usable type="all"/> <Version add="?"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement?view=minecraft-bedrock-stable"/>

定义实体的基础移动速度。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

此移动控制允许生物在水中游泳、在陆地上行走。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

此组件用于实现实体的基础移动。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

此组件以类似海豚的风格控制海豚的移动方式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

此移动控制使生物飞行。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

此移动控制允许生物飞行、游泳、攀爬等。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

此移动控制使生物滑翔。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

此移动控制使生物悬停。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使生物在移动时跳跃、且每次跳跃之间有指定延迟的移动控制。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

此移动控制使生物在移动时蹦跳。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

此移动控制使生物左右摇摆，营造出正在游泳的效果。

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

允许该实体生成包含垂直墙面的路径，类似原版蜘蛛。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体像普通恶魂一样在空中飞行并生成路径。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体像原版鹦鹉一样在空中生成路径。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体通过行走、游泳、飞行和/或攀爬，以及上下跨越方块来生成路径。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体像原版蜜蜂一样在空中生成路径。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体生成包含水域的路径。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使生物能够欣赏被配置为“可欣赏”的物品。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使水生生物能够冲向目标并造成击退；包含冲过头与冷却设置。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体躲避特定方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体逃离符合指定条件的其他实体。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_barter?view=minecraft-bedrock-stable"/>

使生物能够用被配置为交易货币的物品进行以物易物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_beg?view=minecraft-bedrock-stable"/>

允许该生物注视并跟随手持其喜爱食物的玩家。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物破坏门。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_breed?view=minecraft-bedrock-stable"/>

允许该生物与其他生物繁殖。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体通过发出庆祝音效和跳跃来庆祝成功抵御袭击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体通过发射烟花来庆祝成功抵御袭击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体通过冲锋攻击目标造成伤害。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体蓄力并使用其手持物品。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使实体绕位于目标点或目标附近的锚点盘旋。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体被玩家使用 `item_controllable` 属性中指定的物品控制（必需）。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_croak?view=minecraft-bedrock-stable"/>

允许实体在可配置的条件下按随机时间间隔鸣叫。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物将伤害它所信任实体的其他生物设为目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体留在村庄中并抵御入侵者。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体进行攻击，并将伤害结算延迟到攻击动画中的特定时刻。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体在消失前钻入地下。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物开关门。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体通过冲撞玩家进行攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许末影龙光荣地退场。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体使用烈焰吐息攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许末影龙围绕中央基座盘旋飞行。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许末影龙停止飞行并转入栖息模式。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许末影龙在栖息模式下寻找可攻击的玩家。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体一边飞行一边寻找可向其发射火球的玩家。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许末影龙离开栖息模式并重新盘旋飞行。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物基于指定的环境条件饮用药水。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体移向目标，并在目标附近掉落物品。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体消耗方块、用另一个方块替换被吃掉的方块，并因此触发事件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

若该生物正携带食物，它会将其吃掉，并将相应效果施加到自身。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_eat_mob?view=minecraft-bedrock-stable"/>

允许该实体吃掉指定的生物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_emerge?view=minecraft-bedrock-stable"/>

允许该实体从地下钻出。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

实体穿上想要的装备。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体先前往村庄外围的随机点，再在小范围内探索随机点。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在指定区域内寻找可生长的作物方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物寻找遮荫处。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物寻找其他可供其骑乘的生物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物前往最近的海底废墟或沉船。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体延迟一段时间后向目标射击进行攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物躲开直射阳光并寻找遮荫处。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_float?view=minecraft-bedrock-stable"/>

允许该生物在游泳时保持浮于水面。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许生物被手持特定物品的玩家吸引。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物像恶魂一样四处漂浮。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物跟随同属商队的生物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物跟随其他生物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许生物跟随拥有它的玩家。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物跟随其父母。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许生物移向其当前的目标队长。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许生物移向其目标领袖。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

实体会尝试将其物品栏中的物品抛向附近最近演奏过的音符盒。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

实体会尝试将其物品栏中的物品抛给其拥有者。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_go_home?view=minecraft-bedrock-stable"/>

允许该生物返回其生成位置。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体使用激光束攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体在指定区域内寻找上方为空气的耕地。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_hide?view=minecraft-bedrock-stable"/>

允许拥有 `minecraft:hide` 组件的生物尝试移动到其拥有或附近的兴趣点（POI）并躲藏在那里。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

迫使实体停留在当前位置、转身面向其正在攻击的生物，并触发事件作出反应。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_hover?view=minecraft-bedrock-stable"/>

允许该生物悬停在原地。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物将伤害它的其他生物设为目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物查看书架。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体根据 `minecraft:suspect_tracking` 中收集的数据移向“可疑”位置。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体绕目标跳跃。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体跳跃到另一个随机方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物进行一次造成伤害的击退，影响附近所有实体。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许生物在特定时间伏地休息。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_lay_egg?view=minecraft-bedrock-stable"/>

若该生物处于怀孕状态，允许其在特定类型的方块上产下卵方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许怪物跃向并攻击其目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

迫使实体在限定范围内旋转头部骨骼姿态以注视特定实体。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

迫使实体在限定范围内旋转头部骨骼姿态以注视玩家。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

迫使实体在限定范围内旋转头部骨骼姿态以注视目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

迫使实体注视当前正在与其交易的玩家。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许村民寻找配偶以繁殖出更多村民。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体通过近战攻击造成伤害。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体通过近战攻击造成伤害，其攻击距离基于碰撞箱计算。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_mingle?view=minecraft-bedrock-stable"/>

允许实体前往村庄钟处与其他实体交流。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在骑乘状态下自行移动以寻找可攻击的目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体在目标周围移动。若实体过近（即近于目标范围下限并超出高度差限制），它会尝试远离目标；若实体离目标过远，它会尝试靠近目标范围内的一处随机位置。这些位置中有一部分会随机分布到目标身后，其分散程度可通过 `destination_pos_spread_degrees` 调整。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体移动到室内。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体移动到室外。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

仅村民可以使用。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许拥有 `minecraft:dweller` 组件的实体移动向其应受限制的村庄区域。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许拥有 `minecraft:home` 组件的实体移向其“家”的位置。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

当实体游荡过远时，将其驱赶回指定活动区域的 AI 意向。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物移向其当前目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物移向某个方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在水中时移回陆地上。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在陆地上时移入液体中。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在可行时移动到兴趣点（POI）。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物移向一个随机方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物移动到村庄内的随机位置。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在陆地上时移回水中。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_nap?view=minecraft-bedrock-stable"/>

允许生物在特定条件下偶尔停下小睡。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体在给定的特定目标类型子集中攻击最近的目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物检查并追击最近的有效目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

控制豹猫的特定攻击行为。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许生物像豹猫一样坐在原地。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物向拥有 `minecraft:take_flower` 行为的其他生物献花。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物开门。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物将伤害其拥有者的其他生物设为目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物将受到其拥有者伤害的生物设为目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_panic?view=minecraft-bedrock-stable"/>

允许该生物进入恐慌状态，使其四处乱跑并远离造成该状态的伤害来源。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许宠物生物在其拥有者睡觉时上床同睡。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物拾取地面上的物品。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_play?view=minecraft-bedrock-stable"/>

允许该生物通过互相追逐和随机移动来与其他生物玩耍。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在被驯服后由玩家骑乘。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体装死，以避免被攻击者锁定为目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物啃食或掠夺农田中的作物，直到吃饱。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体通过冲锋攻击目标造成伤害。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物随机浮出水面。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许生物随机飞行。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在靠近水面处随机悬停。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物随机四处张望。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物随机坐下并张望一段时间。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体定位一个可寻路到达的随机目标方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物随机坐下持续一段时间。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许生物随机闲逛。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体在水中随机移动。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体通过远程射击进行攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许村民停下，以便其他村民与其繁殖。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在夜间留在室内。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在晴天时自动开始躲避阳光。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在液体中停留在特定高度。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体根据 `minecraft:anger_level` 中的数据向另一实体咆哮。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_roll?view=minecraft-bedrock-stable"/>

允许该生物向前翻滚。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物漫无目的地四处奔跑。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_scared?view=minecraft-bedrock-stable"/>

允许该生物在室外雷雨天气时受到惊吓。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物向另一生物发送事件。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物将其拥有的物品给予其他生物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物像蠹虫一样钻入石头方块。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物唤醒附近方块中的生物，使它们出来。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许马类生物成为骷髅马陷阱并像它们一样被触发，在玩家靠近时生成闪电和一群体马。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_sleep?view=minecraft-bedrock-stable"/>

允许在村庄中拥有床的生物移动到床上并睡觉。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使实体在攻击时不时间歇停顿。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许史莱姆漂浮在水或熔岩中。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体像史莱姆一样持续跳跃。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体像史莱姆一样向随机方向移动。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物稍作休息，并啃食其在附近找到的食物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_sneeze?view=minecraft-bedrock-stable"/>

允许该生物打喷嚏，使其掉落物品并影响附近的生物。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体检测 `sniffing_radius` 范围内最近的玩家，并更新其 `minecraft:suspect_tracking` 组件的状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体进行“音爆”远程攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许鱿鱼在水中下潜。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许鱿鱼游走逃离。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许鱿鱼在原地悠闲游动。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许鱿鱼离开地面方块并回到水中。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许鱿鱼在离开水面时贴附在地面上。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许生物潜近目标，进入范围后扑向目标；成功后将攻击目标，造成由 `minecraft:attack` 组件定义的伤害。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

实体会尝试将其物品栏中的物品抛向附近最近演奏过的音符盒。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在处于坐下状态时保持原地不动，而不是去做其他事情。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体使用踩踏范围伤害行为进行攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物踩踏海龟蛋。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在搜索范围内移动到村庄中的随机位置。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物通过召唤其他实体来攻击玩家。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swell?view=minecraft-bedrock-stable"/>

允许苦力怕在玩家靠近时膨胀。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体在游泳时进入空闲状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在总可呼吸量即将耗尽时尝试移向空气。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体在游泳时（未进行寻路时）四处游荡。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该实体跟随另一实体。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体使用俯冲攻击行为进行攻击；适合与飞行生物搭配使用。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物接受拥有 `minecraft:offer_flower` 行为的其他生物献上的花。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物在被某生物推动时将其设为目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许实体传送到其拥有者身边。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_tempt?view=minecraft-bedrock-stable"/>

允许生物被手持特定物品的玩家吸引。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

该行为开始时触发事件，随后等待一段时间再停止。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

该行为开始时触发事件，随后等待一段时间再停止。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

该行为开始时触发事件，随后等待一段时间再停止。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物注视手持可交易物品的玩家。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许玩家与该生物进行交易。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

使生物能够使用动能武器：间歇性地冲向目标，并在之后重新调整位置。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物将其拥有者正在攻击的同一实体设为目标。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许该生物像恼鬼一样随机移动。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许凋灵随机发动攻击。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许凋灵将攻击集中在对其造成伤害最多的生物上。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_work?view=minecraft-bedrock-stable"/>

允许 NPC 使用兴趣点（POI）。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

允许 NPC 使用堆肥桶兴趣点，将多余的种子转化为骨粉。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体为幼年体。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体为充能状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体当前携带箱子。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体当前处于着火状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体当前处于怀孕状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体当前处于颤抖状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体当前装备了鞍。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体当前已被剪毛。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体当前处于眩晕状态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

设置该实体当前已被驯服。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

“Mark Variant”通常用于在 `variant` 之外，以按类型区分同一生物的其他外观形态。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

皮肤 ID 值。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

“Variant”通常用于按类型区分同一生物的不同外观形态。

---

---

## 弃用组件

以下组件仅限旧版本的实体适用，故本文档也一并列出，但若条件允许，请尽可能使用更高版本的格式版本和组件。

### `minecraft:body_rotation_axis_aligned`

<Usable type="all"/> <Version add="1.21.70" deprecated="1.21.100" tooltip="在高版本使用minecraft:rotation_axis_aligned组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_axis_aligned?view=minecraft-bedrock-stable"/>

定义实体的身体会根据其当前朝向自动旋转，以对齐到最近的坐标轴方向。与 `minecraft:body_rotation_blocked` 组件组合使用时，实体会对齐到最近的坐标轴方向并固定在该朝向，不再随其面向方向的变化而改变。

另见：_[`minecraft:rotation_axis_aligned`](#minecraftrotation_axis_aligned)组件_。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

另见：_[`minecraft:dash_action`](#minecraftdash_action)组件_。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

另见：_[`minecraft:free_camera_controlled`](#minecraftfree_camera_controlled)组件_。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

定义其他实体注视该实体时的行为。

另见：_[`minecraft:looked_at`](#minecraftlooked_at)组件_。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版某实体（<FileType type="file" name="???.json"/>）：

```json showLineNumbers
"minecraft:xxx": {}
```

</TabItem></Tabs>
-->

---

### `minecraft:pushable`

<Usable type="all"/> <Version add="1.13.0" deprecated="1.26.10" tooltip="在高版本使用minecraft:pushable_by_block组件和minecraft:pushable_by_entity组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_pushable?view=minecraft-bedrock-stable"/>

定义实体可被其他实体或方块推动。

另见：_[`minecraft:pushable_by_block`](#minecraftpushable_by_block)组件_、_[`minecraft:pushable_by_entity`](#minecraftpushable_by_entity)组件_。

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

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_scaffolding_climber?view=minecraft-bedrock-stable"/>

定义玩家可以检测到脚手架并在其上移动。

<treeview>
- <DataType type="object" name="minecraft:scaffolding_climber"/>：根对象。不含任何参数。
</treeview>

---

### `minecraft:behavior.enderman_leave_block`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.100" tooltip="在高版本使用minecraft:behavior.place_block组件代替之。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影人可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_enderman_leave_block?view=minecraft-bedrock-stable"/>

定义末影人会放下方块。

另见：_[`minecraft:behavior.place_block`](#minecraftbehaviorplace_block)组件_。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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

另见：_[`minecraft:behavior.take_block`](#minecraftbehaviortake_block)组件_。

<!--
<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:xxx"/>：根对象。
  - <DataType type="string" name="???"/>：可选值为。默认值为。
  - <DataType type="int" name="???"/>：可选值为。默认值为。
  - <DataType type="float" name="???"/>：可选值为。默认值为。
  - <DataType type="boolean" name="???"/>：可选值为。默认值为。
  - <DataType type="array" name="???"/>：可选值为。默认值为。
  - <DataType type="object" name="???"/>：可选值为。默认值为。
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
