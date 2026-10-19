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

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

:::warning[注意]

本文部分组件的格式版本仍在核实中，版本徽标可能显示为「?」。组件参数以 26.60 的官方 JSON schema 与原版实体文件为准，如需更多信息可查阅[实体组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/componentlist?view=minecraft-bedrock-stable)和[实体 AI 意向组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/aigoallist?view=minecraft-bedrock-stable)。

:::

数据驱动实体组件（Data-Driven Entity Components）用于规定实体的功能。将不同的实体组件组合在一起可以实现多种复杂的功能。

实体组件可以指定到<DataType type="object" name="components" isRequired/>中，以使得实体在所有情况下都使用相关功能；也可以指定到实体组件组<DataType type="object" name="component_groups"/> - <DataType type="object" name="*"/>中，使得实体在使用特定事件时使用特定的功能。

本文收录所有已开放或即将开放的命名空间为`minecraft`的实体组件信息。可使用<kbd>Ctrl</kbd>+<kbd>F</kbd>查找所需条目。

**每个组件条目下方的高亮标签均含注释，可鼠标悬停或手机点击查看**。例：<Highlight text="这是一个特殊标签" color="yellowgreen" tooltip="这是标签下的特殊注解。"/>。

:::note[备注]

因为数据驱动实体自从 Mojang 在 0.16 正式公布附加包以来就已具有应用，因此其中众多组件可用的格式版本十分之早。现如今，收集古早时期的相关资料已十分困难。本文档将以 [bedrock.dev 的 1.2.0](https://bedrock.dev/docs/1.2.0.0/1.2.9.1/Addons) 版本为可用格式版本的最早版本，但这些组件可能在更早就可以应用。

:::

## 基础属性组件

全体实体通用的组件。在定义实体的时候，多数情况下都需要这些组件，并且在编写实体时应当优先考虑这些组件。

### `minecraft:collision_box`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

定义实体的生命值。1 颗心等于 2 点生命值。

另见：_[EntityHealthComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityhealthcomponent-类)_。

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

定义实体可被其他实体推动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:pushable_by_entity"/>：根对象。
  - <DataType type="array" name="presets"/>：<Version add="1.26.30" inline/>定义特殊实体的推动行为。
    - <DataType type="object"/>：一项预设。
      - <DataType type="object" name="filters"/>：实体过滤器。定义该实体应满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="push_mode"/>：推动模式。可选值为：
        | 可选值 | 描述 |
        | --- | --- |
        | `none` | 无法推动此实体。 |
        | `default`（默认值） | 多数实体采用的标准推动行为。 |
        | `legacy_boat` | 继承船的推动行为，包括阻尼力和潜行抵消行为。见[船 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/船)。 |
        | `legacy_minecart` | 继承矿车的推动行为，包括基于对齐的碰撞处理和速度平均行为。见[矿车 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/矿车)。 |
        | `ball` | 类似于踢球的推动行为，实体会向推动者运动的方向运动，受力与推动者的速度成正比。见[硫方怪 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/硫方怪)。 |
      - <DataType type="float" name="strength_multiplier"/>：施加给实体推力的乘数。更大的乘数意味着更大的推力。默认值为`0.05`。
      - <DataType type="float" name="min_distance"/>：要施加推力的实体之间的最小距离。距离更小则不会相互推动。默认值为`0.01`。
      - <DataType type="float" name="max_distance"/>：要施加推力的实体之间的最大距离。距离更大则不会相互推动。默认值为`3.4e38`。
      - <DataType type="float" name="push_scale_self"/>：发生碰撞时推动自身的推力乘数。更大的乘数意味着对自身的推力越大。默认值为`1`。
      - <DataType type="float" name="push_scale_other"/>：发生碰撞时推动其他实体的推力乘数。更大的乘数意味着对其他实体的推力越大。默认值为`1`。
      - <DataType type="boolean" name="play_sound"/>：是否要播放`pushed_by_player`音效。默认值为`false`。
      - <DataType type="float" name="play_sound_cooldown_in_seconds"/>：声音之间的冷却时间，数字越小，声音越多。单位：秒。默认值为`0.2`。
      - <DataType type="float" name="play_sound_impulse_threshold"/>：触发推动音效所需的最小速度变化，值越低，灵敏度越高。默认值为`0.2`。
      - <DataType type="float" name="kick_speed_scale"/>：<Highlight text="限定参数" tooltip="仅当push_mode为ball时可用。" inline/> 踢球速度乘数，推力会随着速度的增加而增加。乘数越大则推力越大。默认值为`2`。
      - <DataType type="float" name="min_kick_speed"/>：<Highlight text="限定参数" tooltip="仅当push_mode为ball时可用。" inline/> 最小踢球速度，实体将被击退的最小速度。默认值为`0.0`。
      - <DataType type="float" name="max_kick_speed"/>：<Highlight text="限定参数" tooltip="仅当push_mode为ball时可用。" inline/> 最大踢球速度，实体将被击退的最大速度。默认值为`0.5`。
      - <DataType type="float" name="vertical_kick_multiplier"/>：<Highlight text="限定参数" tooltip="仅当push_mode为ball时可用。" inline/> 当物体在地面上被推动时，向上施加的力的乘数。为`0`时则使实体保持在地面上。默认值为`0.3`。
      - <DataType type="float" name="require_collision_overlap"/>：<Version add="1.26.40" inline/>是否需要碰撞箱重叠才能推动。默认值为`true`。
</treeview>

> 备注：部分数值看起来十分抽象，但微软文档记录原文如此。

> **备注**：该字段的判定随格式版本变化：1.26.40 起未写时按`true`处理，更早的格式版本则按`false`处理。

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

定义实体所属的家族类型。家族类型可用于在[过滤器](./filters)中、命令中或其他游戏系统进行分类判断（例如：`mob`、`monster`、`undead`、`zombie`等）。

另见：_[EntityTypeFamilyComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitytypefamilycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:type_family"/>：根对象。
  - <DataType type="array" name="family"/>：定义实体的家族类型。
    - <DataType type="string"/>：家族名。
</treeview>

> **备注**：通常会在数组中定义一个与实体自身 ID 相同的家族名。原版常见的家族名有`mob`、`inanimate`、`aquatic`、`monster`、`undead`、`skeleton`、`arthropod`、`zombie`、`lightweight`、`fish`、`player`，也可以自定义。

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

定义实体如果有指定方块在指定范围附近被破坏时触发事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:block_sensor"/>：根对象。
  - <DataType type="array" name="on_break" isRequired/>：待检查的可能被破坏的方块列表，一旦方块被破坏则触发事件。特别地，如果同一个方块在下面的多个列表中，则这些列表的事件将同时触发。
    - <DataType type="object"/>：一组方块列表与其触发事件的对应关系。
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

定义实体受伤时触发事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:damage_sensor"/>：根对象。
  - <DataType type="array"/><DataType type="object" name="triggers"/>：代表多个伤害传感器。如果只有一个伤害传感器，也可以直接写成`"triggers": {...}`的对象结构。
    - <DataType type="object"/>：伤害传感器。
      - <DataType type="boolean" name="deals_damage"/>：<Version add="1.2.0" deprecated="1.21.40" inline/> 定义实体在满足条件时是否执行伤害。默认值为`false`。
      - <DataType type="string" name="deals_damage"/>：<Version add="1.21.40" inline/>定义实体在满足条件时是否执行伤害。可选值如下表所示：
        | 可选值 | 描述 |
        | --- | --- |
        | `yes` | 正常施加伤害。 |
        | `no` | 不施加伤害。默认值。 |
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

定义一组子传感器：当其他实体在指定范围内满足某组条件时，每个子传感器都会触发事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:entity_sensor"/>：根对象。
  - <DataType type="boolean" name="find_players_only"/>：全部子传感器是否只检测玩家。默认值为`false`。
  - <DataType type="boolean" name="relative_range"/>：子传感器的范围是否在实体自身尺寸之上叠加。默认值为`true`。
  - <DataType type="array" name="subsensors"/>：子传感器列表，各项独立求值。
    - <DataType type="object"/>：一个子传感器。
      - <DataType type="string" name="event"/>：条件满足时触发的事件 ID。
      - <DataType type="object" name="event_filters"/>：条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="cooldown"/>：再次检测前需等待的秒数；`-1`表示不设冷却。默认值为`-1`。
      - <DataType type="array" name="range"/>：检测范围，写作`[水平, 垂直]`，单位为方块。默认值为`[10, 10]`。
      - <DataType type="int" name="minimum_count"/>：触发事件所需的最少实体数。默认值为`1`。
      - <DataType type="int" name="maximum_count"/>：触发事件所需的最多实体数；`-1`表示不限。默认值为`-1`。
      - <DataType type="boolean" name="require_all"/>：是否要求范围内全部实体都通过条件。默认值为`false`。
      - <DataType type="float" name="y_offset"/>：计算距离时对实体位置施加的垂直偏移。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：范围内不再有亡灵时触发解除缩壳。条件部分已从简。

```json showLineNumbers
"minecraft:entity_sensor": {
    "subsensors": [
        {
            "event": "minecraft:no_threat_detected",
            "cooldown": 0.2,
            "range": [ 7.0, 2.0 ],
            "minimum_count": 0,
            "maximum_count": 0,
            "event_filters": {
                "test": "is_family",
                "subject": "other",
                "value": "undead"
            }
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:environment_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义基于环境条件的触发器。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:environment_sensor"/>：根对象。
  - <DataType type="array" name="triggers"/>：触发器列表，每刻按顺序求值。
    - <DataType type="object"/>：一个触发器。
      - <DataType type="object" name="filters"/>：环境条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="event"/>：条件满足时触发的事件 ID。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：不在水中时开始脱水。

```json showLineNumbers
"minecraft:environment_sensor": {
    "triggers": [
        {
            "filters": {
                "test": "in_water",
                "operator": "!=",
                "value": true
            },
            "event": "start_drying_out"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:rail_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使矿车类实体能够检测激活铁轨并响应其激活状态变化。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:rail_sensor"/>：根对象。
  - <DataType type="boolean" name="check_block_types"/>：为`true`时每刻检查所在方块是否为预期类型，不符则触发`on_deactivate`。默认值为`false`。
  - <DataType type="boolean" name="eject_on_activate"/>：经过激活的铁轨时是否弹出全部骑乘者。默认值为`true`。
  - <DataType type="boolean" name="eject_on_deactivate"/>：经过未激活的铁轨时是否弹出全部骑乘者。默认值为`false`。
  - <DataType type="object" name="on_activate"/>：经过激活的铁轨时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](./filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_deactivate"/>：经过未激活的铁轨时触发的事件，结构同`on_activate`。
  - <DataType type="boolean" name="tick_command_block_on_activate"/>：经过激活的铁轨时，命令方块是否开始运作。默认值为`true`。
  - <DataType type="boolean" name="tick_command_block_on_deactivate"/>：经过未激活的铁轨时，命令方块是否停止运作。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

命令方块矿车（<FileType type="file" name="command_block_minecart.json"/>）：

```json showLineNumbers
"minecraft:rail_sensor": {
    "check_block_types": true,
    "eject_on_activate": false,
    "eject_on_deactivate": false,
    "on_deactivate": {
        "event": "minecraft:command_block_deactivate"
    },
    "tick_command_block_on_activate": true,
    "tick_command_block_on_deactivate": false
}
```

</TabItem></Tabs>

---

### `minecraft:target_nearby_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体能够看见或感知到其他实体并将其设为目标的范围。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:target_nearby_sensor"/>：根对象。
  - <DataType type="float" name="inside_range"/>：进入「内圈」的距离阈值，单位为方块。默认值为`1`。
  - <DataType type="float" name="outside_range"/>：离开「外圈」的距离阈值，单位为方块。默认值为`5`。
  - <DataType type="boolean" name="must_see"/>：是否需要看见目标才判定为进入内圈。默认值为`false`。
  - <DataType type="object" name="on_inside_range"/>：实体进入内圈时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](./filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_outside_range"/>：实体离开外圈时触发的事件，结构同上。
  - <DataType type="object" name="on_vision_lost_inside_range"/>：实体在内圈内失去视野时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

苦力怕（<FileType type="file" name="creeper.json"/>）：进入内圈开始引爆，离开或失去视野则停止。

```json showLineNumbers
"minecraft:target_nearby_sensor": {
    "inside_range": 2.5,
    "outside_range": 5.0,
    "must_see": true,
    "on_inside_range": {
        "event": "minecraft:start_exploding",
        "target": "self"
    },
    "on_outside_range": {
        "event": "minecraft:stop_exploding",
        "target": "self"
    },
    "on_vision_lost_inside_range": {
        "event": "minecraft:stop_exploding",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:timer`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

添加一个计时器，计时结束后触发事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:timer"/>：根对象。
  - <DataType type="boolean" name="looping"/>：触发后是否重新计时。默认值为`true`。
  - <DataType type="boolean" name="randomInterval"/>：时长是否在`time`的最小值与最大值之间随机取值。默认值为`true`。
  - <DataType type="float"/><DataType type="array" name="time"/>：计时时长，单位为秒。写单个数值为固定时长，写`[最小值, 最大值]`则在区间内随机。默认值为`0.0`。
  - <DataType type="array" name="random_time_choices"/>：可随机选取的时长及权重，与`time`互斥。
    - <DataType type="object"/>：一项。
      - <DataType type="float" name="value"/>：时长，单位为秒。
      - <DataType type="int" name="weight"/>：该项被选中的权重。默认值为`0`。
  - <DataType type="object" name="time_down_event"/>：计时结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](./filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：在`20`至`50`秒之间随机取值，只触发一次。

```json showLineNumbers
"minecraft:timer": {
    "looping": false,
    "time": [ 20, 50 ],
    "randomInterval": true,
    "time_down_event": {
        "event": "stop_panicking_after_fire",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

---

## 功能性组件

### `minecraft:addrider`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:rideable组件。"/> <br/>

定义实体生成时自带的骑乘者，骑乘者数量不能超过`minecraft:rideable`组件的`seat_count`。

另见：_[`minecraft:rideable`](#minecraftrideable)组件_、_[EntityAddRiderComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityaddridercomponent-类)_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:addrider"/>：根对象。
  - <DataType type="array" name="riders"/>：要添加的骑乘者列表。
    - <DataType type="object"/>：一个骑乘者。
      - <DataType type="string" name="entity_type"/>：骑乘者的实体 ID。
      - <DataType type="string" name="spawn_event"/>：生成骑乘者时触发的事件 ID。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼尸壳（<FileType type="file" name="camel_husk.json"/>）：背上自带尸壳与干枯者。

```json showLineNumbers
"minecraft:addrider": {
    "riders": [
        {
            "entity_type": "minecraft:husk",
            "spawn_event": "minecraft:spawn_as_rider"
        },
        {
            "entity_type": "minecraft:parched",
            "spawn_event": "minecraft:ranged_mode"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:admire_item`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

使实体在指定时长内忽略可攻击的目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:admire_item"/>：根对象。
  - <DataType type="int" name="duration"/>：欣赏状态持续的秒数。默认值为`10`。
  - <DataType type="int" name="cooldown_after_being_attacked"/>：受到伤害后停止欣赏的秒数。默认值为`10`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猪灵（<FileType type="file" name="piglin.json"/>）：

```json showLineNumbers
"minecraft:admire_item": {
    "duration": 8,
    "cooldown_after_being_attacked": 20
}
```

</TabItem></Tabs>

---

### `minecraft:ageable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体由幼年成长为成年的时间与喂食规则。

另见：_[EntityAgeableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityageablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:ageable"/>：根对象。
  - <DataType type="float" name="duration"/>：成长为成年体所需的秒数；写`-1`则永不长大。默认值为`1200`。
  - <DataType type="array" name="feed_items"/>：可喂食的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="array" name="drop_items"/>：成年时掉落的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="array" name="pause_growth_items"/>：可暂停幼年体成长的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="array" name="reset_growth_items"/>：可重置幼年体成长进度的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="object" name="interact_filters"/>：允许喂食的条件。见[实体过滤器](./filters)。
  - <DataType type="object" name="grow_up"/>：成长为成年体时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：仅在完全展开时可喂食，金色蒲公英可暂停或重置成长。

```json showLineNumbers
"minecraft:ageable": {
    "duration": 1200,
    "feed_items": "spider_eye",
    "pause_growth_items": [ "golden_dandelion" ],
    "reset_growth_items": [ "golden_dandelion" ],
    "interact_filters": {
        "test": "enum_property",
        "domain": "minecraft:armadillo_state",
        "value": "unrolled"
    },
    "grow_up": {
        "event": "minecraft:ageable_grow_up",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:air_drag_modifier`

<Usable type="all"/> <Version add="1.26.30"/> <br/>

定义实体在空中受到的阻力修正。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:air_drag_modifier"/>：根对象。
  - <DataType type="float" name="value"/>：空气阻力的修正值。
</treeview>

> **备注**：原版用例中该值写`1.0`。

> **备注**：官方 schema 未定义该组件的参数，以上按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

硫方怪（<FileType type="file" name="sulfur_cube.json"/>）：

```json showLineNumbers
"minecraft:air_drag_modifier": {
    "value": 1.0
}
```

</TabItem></Tabs>

---

### `minecraft:ambient_sound_interval`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体播放环境音效的间隔与所用事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:ambient_sound_interval"/>：根对象。
  - <DataType type="string" name="event_name"/>：默认播放的音效事件名，须在[`sounds.json`](./description#soundsjson)中定义。默认值为`ambient`。
  - <DataType type="array" name="event_names"/>：按条件切换的音效事件，按顺序求值，第一个条件成立者生效；全部不成立时回退到`event_name`。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="condition"/>：判断条件，填 Molang 表达式。
      - <DataType type="string" name="event_name"/>：条件成立时播放的音效事件名。
  - <DataType type="float" name="range"/>：在最短间隔之上随机增加的秒数上限。默认值为`16`。
  - <DataType type="float" name="value"/>：两次环境音之间的最短间隔，单位为秒。默认值为`8`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：使用物品时改用另一套环境音。

```json showLineNumbers
"minecraft:ambient_sound_interval": {
    "event_name": "ambient",
    "event_names": [
        {
            "condition": "query.is_using_item",
            "event_name": "ambient.tame"
        },
        {
            "condition": "!query.is_using_item",
            "event_name": "ambient"
        }
    ],
    "range": 5.0,
    "value": 5.0
}
```

</TabItem></Tabs>

---

### `minecraft:anger_level`

<Usable type="all"/> <Version add="1.19.0"/> <br/>

使实体追踪对一组滋扰目标的愤怒值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:anger_level"/>：根对象。
  - <DataType type="int" name="max_anger"/>：愤怒值的上限。默认值为`100`。
  - <DataType type="int" name="angry_threshold"/>：判定为愤怒的阈值。默认值为`80`。
  - <DataType type="int" name="angry_boost"/>：被激怒时额外增加的愤怒值。默认值为`20`。
  - <DataType type="int" name="default_annoyingness"/>：普通滋扰行为默认增加的愤怒值。默认值为`0`。
  - <DataType type="int" name="default_projectile_annoyingness"/>：被投掷物击中时默认增加的愤怒值。默认值为`0`。
  - <DataType type="float" name="anger_decrement_interval"/>：愤怒值每次衰减`1`的间隔，单位为秒。默认值为`1`。
  - <DataType type="boolean" name="remove_targets_below_angry_threshold"/>：愤怒值低于阈值时是否清除目标。默认值为`true`。
  - <DataType type="object" name="nuisance_filter"/>：哪些实体算作滋扰目标。见[实体过滤器](./filters)。
  - <DataType type="array" name="on_increase_sounds"/>：愤怒值上升时播放的音效，按顺序取第一个条件成立者。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="sound"/>：要播放的音效定义 ID。
      - <DataType type="string" name="condition"/>：播放条件，填 Molang 表达式。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:anger_level": {
    "angry_threshold": 80,
    "angry_boost": 20,
    "anger_decrement_interval": 1.0,
    "default_annoyingness": 35,
    "default_projectile_annoyingness": 10,
    "max_anger": 150,
    "on_increase_sounds": [
        {
            "condition": "query.anger_level(this) >= 40",
            "sound": "listening_angry"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:angry`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的愤怒状态，由计时器控制持续时长。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:angry"/>：根对象。
  - <DataType type="int" name="duration"/>：愤怒状态的持续秒数。默认值为`25`。
  - <DataType type="int" name="duration_delta"/>：持续时长的随机浮动范围，实际时长在`duration±duration_delta`之间。默认值为`0`。
  - <DataType type="string" name="angry_sound"/>：进入愤怒状态时播放的音效定义 ID。
  - <DataType type="array" name="sound_interval"/>：两次愤怒音效之间的随机等待区间，单位为秒。
  - <DataType type="object" name="calm_event"/>：愤怒状态结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="filters"/>：处于愤怒状态时不予攻击的目标条件。见[实体过滤器](./filters)。
  - <DataType type="boolean" name="broadcast_anger"/>：是否把愤怒传播给范围内同种实体。默认值为`false`。
  - <DataType type="boolean" name="broadcast_anger_on_attack"/>：攻击时是否传播愤怒。默认值为`false`。
  - <DataType type="boolean" name="broadcast_anger_on_being_attacked"/>：被攻击时是否传播愤怒。默认值为`false`。
  - <DataType type="boolean" name="broadcast_anger_when_dying"/>：死亡时是否传播愤怒。默认值为`true`。
  - <DataType type="int" name="broadcast_range"/>：愤怒传播的距离，单位为方块。默认值为`20`。
  - <DataType type="array" name="broadcast_targets"/>：愤怒传播的目标家族列表。
    - <DataType type="string"/>：家族名。
  - <DataType type="object" name="broadcast_filters"/>：愤怒传播的条件。见[实体过滤器](./filters)。
</treeview>

> **备注**：原版少数文件对`broadcast_anger`与`broadcast_range`使用`broadcastAnger`、`broadcastRange`的旧拼写，两种写法均可解析。

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：

```json showLineNumbers
"minecraft:angry": {
    "duration": 25,
    "broadcast_anger": true,
    "broadcast_range": 20,
    "broadcast_anger_when_dying": false,
    "broadcast_filters": {
        "test": "is_family",
        "operator": "!=",
        "value": "pacified"
    },
    "calm_event": {
        "event": "calmed_down",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:annotation.break_door`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

允许实体在寻路时破坏门，需要寻路组件开启相应的破坏标记。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:annotation.break_door"/>：根对象。
  - <DataType type="float" name="break_time"/>：破坏一扇门所需的秒数。默认值为`12`。
  - <DataType type="string" name="min_difficulty"/>：允许破坏门的最低难度。可选值为`peaceful`、`easy`、`normal`、`hard`。默认值为`hard`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版僵尸类实体只用默认值，写作空对象即可：

```json showLineNumbers
"minecraft:annotation.break_door": {}
```

</TabItem></Tabs>

---

### `minecraft:annotation.open_door`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

允许实体在寻路时开门，需要寻路组件开启相应的开门标记。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:annotation.open_door"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铜傀儡（<FileType type="file" name="copper_golem.json"/>）：

```json showLineNumbers
"minecraft:annotation.open_door": {}
```

</TabItem></Tabs>

---

### `minecraft:apply_knockback_rules`

<Usable type="all"/> <Version add="1.26.30"/> <br/>

定义实体攻击时的击退施加规则。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:apply_knockback_rules"/>：根对象。
  - <DataType type="array" name="presets"/>：击退规则列表，取第一条条件成立者。
    - <DataType type="object"/>：一条规则。
      - <DataType type="object" name="filter"/>：生效条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="horizontal_power"/>：水平击退力度。默认值为`1`。
      - <DataType type="float" name="vertical_power"/>：垂直击退力度。默认值为`0.4`。
      - <DataType type="float" name="vertical_velocity_cap"/>：击退后允许的最大垂直速度。默认值为`0.4`。
      - <DataType type="float" name="slowdown_scale"/>：施加击退前对目标速度的缩放比例。默认值为`0.5`。
      - <DataType type="boolean" name="scale_with_damage"/>：是否按伤害的反比平方缩放击退幅度。默认值为`false`。
      - <DataType type="boolean" name="check_if_target_is_immersed_in_water"/>：是否要求目标完全浸入水中才生效。默认值为`false`。
      - <DataType type="string" name="knockback_mode"/>：击退方向的计算方式。可选值为`relative_horizontal`（由攻击者指向目标的水平方向）、`hit_direction`（按命中方向与命中点决定）。默认值为`relative_horizontal`。
      - <DataType type="string" name="extra_knockback_approach"/>：附魔、疾跑等额外击退的叠加方式。可选值为`reapply_default`（以默认参数再施加一次）、`multiply_reduced`（按基础击退与衰减系数相乘后叠加）。默认值为`reapply_default`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

溺尸（<FileType type="file" name="drowned.json"/>）：只对浸入水中的目标生效，且向下击退。

```json showLineNumbers
"minecraft:apply_knockback_rules": {
    "presets": [
        {
            "horizontal_power": 0.6,
            "vertical_power": -0.6,
            "vertical_velocity_cap": -0.4,
            "check_if_target_is_immersed_in_water": true
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:area_attack`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

对进入范围的实体持续造成伤害。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:area_attack"/>：根对象。
  - <DataType type="string" name="cause"/>：造成的伤害类型。
  - <DataType type="int" name="damage_per_tick"/>：每刻造成的伤害。默认值为`2`。
  - <DataType type="float" name="damage_range"/>：生效的距离范围，单位为方块。默认值为`0.2`。
  - <DataType type="float" name="damage_cooldown"/>：对同一目标的伤害间隔，单位为秒。默认值为`0`。
  - <DataType type="object" name="entity_filter"/>：可被伤害的实体条件。见[实体过滤器](./filters)。
  - <DataType type="boolean" name="play_attack_sound"/>：造成伤害时是否播放攻击音效。默认值为`true`。
  - <DataType type="boolean" name="use_self_as_damage_source"/>：是否以自身作为伤害来源。为`false`时目标不会反击，其`minecraft:damage_sensor`也无法识别攻击者。默认值为`true`。
  - <DataType type="string" name="death_message_override"/>：死亡提示使用的本地化键；留空时使用该伤害类型的默认提示。
</treeview>

</TabItem><TabItem value="示例" label="示例">

岩浆怪（<FileType type="file" name="magma_cube.json"/>）：贴近玩家时持续造成伤害。

```json showLineNumbers
"minecraft:area_attack": {
    "cause": "entity_attack",
    "damage_cooldown": 0.5,
    "damage_per_tick": 6,
    "damage_range": 0.15,
    "entity_filter": {
        "any_of": [
            { "subject": "other", "test": "is_family", "value": "player" },
            { "subject": "other", "test": "is_family", "value": "iron_golem" }
        ]
    }
}
```

</TabItem></Tabs>

---

### `minecraft:attack`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的近战攻击伤害，以及命中时附加的状态效果。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:attack"/>：根对象。
  - <DataType type="float"/><DataType type="array" name="damage"/>：近战伤害。写单个数值为固定伤害，写`[最小值, 最大值]`则在区间内随机；负值会为目标回血。默认值为`0`。
  - <DataType type="string" name="effect_name"/>：命中时施加的状态效果 ID。
  - <DataType type="float"/><DataType type="array" name="effect_duration"/>：状态效果的持续秒数，可写`[最小值, 最大值]`；写`infinite`表示永久。
  - <DataType type="int" name="effect_amplifier"/>：状态效果的等级，从`0`开始。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:attack": {
    "damage": 2
}
```

</TabItem></Tabs>

---

### `minecraft:attack_cooldown`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

为实体的攻击添加冷却。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:attack_cooldown"/>：根对象。
  - <DataType type="float"/><DataType type="array" name="attack_cooldown_time"/>：冷却时长，单位为秒。写单个数值为固定时长，写`[最小值, 最大值]`则在区间内随机。默认值为`[0.0, 1.0]`。
  - <DataType type="object" name="attack_cooldown_complete_event"/>：冷却结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](./filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:attack_cooldown": {
    "attack_cooldown_time": 120.0,
    "attack_cooldown_complete_event": {
        "event": "attack_cooldown_complete_event",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:attack_damage`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的攻击伤害值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:attack_damage"/>：根对象。
  - <DataType type="float" name="value"/>：攻击伤害值。
</treeview>

> **备注**：官方 schema 未定义该组件的参数，以上按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：

```json showLineNumbers
"minecraft:attack_damage": {
    "value": 4
}
```

</TabItem></Tabs>

---

### `minecraft:balloonable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体被气球附着时的表现。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:balloonable"/>：根对象。
  - <DataType type="float" name="mass"/>：实体对气球施加的质量。
</treeview>

> **备注**：官方 schema 未定义该组件的参数，以上按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:balloonable": {
    "mass": 0.5
}
```

</TabItem></Tabs>

---

### `minecraft:barter`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

使实体能够进行以物易物，按战利品表掉落物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:barter"/>：根对象。
  - <DataType type="string" name="barter_table"/>：以物易物使用的战利品表路径。
  - <DataType type="int" name="cooldown_after_being_attacked"/>：受到伤害后停止以物易物的秒数。默认值为`10`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猪灵（<FileType type="file" name="piglin.json"/>）：

```json showLineNumbers
"minecraft:barter": {
    "barter_table": "loot_tables/entities/piglin_barter.json",
    "cooldown_after_being_attacked": 20
}
```

</TabItem></Tabs>

---

### `minecraft:block_climber`

<Usable type="all"/> <Version add="1.17.10"/> <br/>

使实体能够识别并攀爬脚手架。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:block_climber"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影螨（<FileType type="file" name="endermite.json"/>）：

```json showLineNumbers
"minecraft:block_climber": {}
```

</TabItem></Tabs>

---

### `minecraft:block_movement_slowdown_immunity`

<Usable type="all"/> <Version add="1.26.50"/> <br/>

使指定方块不再对实体施加移动减速，不影响其他方块的减速效果。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:block_movement_slowdown_immunity"/>：根对象。
  - <DataType type="array" name="blocks"/>：不产生减速的方块列表。
    - <DataType type="string"/>：方块描述符。
</treeview>

</TabItem><TabItem value="示例" label="示例">

洞穴蜘蛛（<FileType type="file" name="cave_spider.json"/>）：蜘蛛网不再减速。

```json showLineNumbers
"minecraft:block_movement_slowdown_immunity": {
    "blocks": [ "minecraft:web" ]
}
```

</TabItem></Tabs>

---

### `minecraft:body_rotation_always_follows_head`

<Usable type="all"/> <Version add="1.21.90"/> <br/>

使实体身体的朝向始终跟随头部。该组件不会覆盖`minecraft:body_rotation_blocked`的效果。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:body_rotation_always_follows_head"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

快乐恶魂（<FileType type="file" name="happy_ghast.json"/>）：

```json showLineNumbers
"minecraft:body_rotation_always_follows_head": {}
```

</TabItem></Tabs>

---

### `minecraft:body_rotation_blocked`

<Usable type="all"/> <Version add="1.20.80"/> <br/>

阻止实体身体的朝向随头部转动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:body_rotation_blocked"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：

```json showLineNumbers
"minecraft:body_rotation_blocked": {}
```

</TabItem></Tabs>

---

### `minecraft:boostable`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:rideable组件。"/> <br/>

定义骑乘时可用于加速的物品及其消耗方式。

另见：_[`minecraft:rideable`](#minecraftrideable)组件_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:boostable"/>：根对象。
  - <DataType type="array" name="boost_items"/>：可加速的物品列表。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="item"/>：物品 ID。
      - <DataType type="int" name="damage"/>：每次使用时物品消耗的耐久。默认值为`1`。
      - <DataType type="string" name="replace_item"/>：物品耗尽后替换为的物品 ID。
  - <DataType type="float" name="speed_multiplier"/>：加速时的速度乘数。
  - <DataType type="float" name="duration"/>：单次加速的持续秒数。
</treeview>

> **备注**：官方文档只列出`boost_items`，`speed_multiplier`与`duration`按原版用例补充。

</TabItem><TabItem value="示例" label="示例">

猪（<FileType type="file" name="pig.json"/>）：用胡萝卜钓竿加速，每次消耗 2 点耐久，耗尽后变成钓鱼竿。

```json showLineNumbers
"minecraft:boostable": {
    "speed_multiplier": 1.35,
    "duration": 3.0,
    "boost_items": [
        {
            "item": "carrotOnAStick",
            "damage": 2,
            "replace_item": "fishing_rod"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:boss`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

定义 BOSS 血条的显示方式。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:boss"/>：根对象。
  - <DataType type="string" name="name"/>：血条上方显示的名称。
  - <DataType type="boolean" name="should_darken_sky"/>：实体存在时天空是否变暗。默认值为`false`。
  - <DataType type="int" name="hud_range"/>：血条在玩家屏幕上显示的最大距离，单位为方块。默认值为`55`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：

```json showLineNumbers
"minecraft:boss": {
    "hud_range": 125,
    "should_darken_sky": false
}
```

</TabItem></Tabs>

---

### `minecraft:bounciness`

<Usable type="all"/> <Version add="1.26.30"/> <br/>

定义实体的弹性。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:bounciness"/>：根对象。
  - <DataType type="float" name="value"/>：弹性系数。
</treeview>

> **备注**：官方 schema 未定义该组件的参数，以上按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

硫方怪（<FileType type="file" name="sulfur_cube.json"/>）：

```json showLineNumbers
"minecraft:bounciness": {
    "value": 0.0
}
```

</TabItem></Tabs>

---

### `minecraft:break_blocks`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

定义实体移动时可以破坏的方块。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:break_blocks"/>：根对象。
  - <DataType type="array" name="breakable_blocks"/>：可被破坏的方块列表。
    - <DataType type="string"/>：方块 ID。
</treeview>

</TabItem><TabItem value="示例" label="示例">

劫掠兽（<FileType type="file" name="ravager.json"/>）：冲撞时破坏作物与植被，列表中仅保留前几项。

```json showLineNumbers
"minecraft:break_blocks": {
    "breakable_blocks": [
        "bamboo",
        "bamboo_sapling",
        "beetroot",
        "carrots",
        "carved_pumpkin",
        "chorus_flower",
        "chorus_plant",
        "deadbush",
        "double_plant",
        "leaves",
        "lit_pumpkin",
        "melon_block"
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:breathable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体可以呼吸的介质、憋气时长与窒息伤害。

另见：_[EntityBreathableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitybreathablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:breathable"/>：根对象。
  - <DataType type="boolean" name="breathes_air"/>：是否能在空气中呼吸。默认值为`true`。
  - <DataType type="boolean" name="breathes_water"/>：是否能在水中呼吸。默认值为`false`。
  - <DataType type="boolean" name="breathes_lava"/>：是否能在熔岩中呼吸。默认值为`true`。
  - <DataType type="boolean" name="breathes_solids"/>：是否能在固体方块中呼吸。默认值为`false`。
  - <DataType type="array" name="breathe_blocks"/>：除上述开关外，额外允许呼吸的方块。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="array" name="non_breathe_blocks"/>：除上述开关外，额外禁止呼吸的方块。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="int" name="total_supply"/>：可憋气的秒数。默认值为`15`。
  - <DataType type="int" name="suffocate_time"/>：两次窒息伤害之间的秒数。默认值为`-20`。
  - <DataType type="float" name="inhale_time"/>：把憋气量恢复到上限所需的秒数。默认值为`0`。
  - <DataType type="boolean" name="generates_bubbles"/>：在水中是否显示气泡。默认值为`true`。
</treeview>

> **备注**：原版有 2 个文件写作`totalSupply`、`suffocateTime`，其余 80 个文件均为下划线写法。

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：不会窒息，但憋气时长仍为 15 秒。

```json showLineNumbers
"minecraft:breathable": {
    "total_supply": 15,
    "suffocate_time": 0
}
```

</TabItem></Tabs>

---

### `minecraft:breedable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的繁殖规则。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:breedable"/>：根对象。
  - <DataType type="array" name="breed_items"/>：可使实体进入求爱状态的物品。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="object" name="breeds_with"/>：可与该实体繁殖的对象。键为实体 ID，值可指定该组合的繁殖事件。
  - <DataType type="float" name="breed_cooldown"/>：再次繁殖所需的秒数。默认值为`60`。
  - <DataType type="boolean" name="require_tame"/>：是否要求先驯服才能繁殖。默认值为`true`。
  - <DataType type="boolean" name="require_full_health"/>：是否要求满血才能繁殖。默认值为`false`。
  - <DataType type="boolean" name="allow_sitting"/>：是否允许在坐下时繁殖。默认值为`false`。
  - <DataType type="boolean" name="causes_pregnancy"/>：为`true`时怀孕而非直接生成幼体。默认值为`false`。
  - <DataType type="float" name="extra_baby_chance"/>：一次繁殖最多产生 16 只幼体的概率，取值`0.0`-`1.0`。默认值为`0`。
  - <DataType type="object" name="love_filters"/>：进入求爱状态的条件。见[实体过滤器](./filters)。
  - <DataType type="array" name="environment_requirements"/>：进入求爱状态所需的周围方块条件。
    - <DataType type="object"/>：一项。
      - <DataType type="array" name="blocks"/>：要求的方块列表。
        - <DataType type="string"/>：方块 ID。
      - <DataType type="int" name="count"/>：需要的方块数量。
      - <DataType type="float" name="radius"/>：搜索半径，取值`0`-`16`。
</treeview>

> **备注**：原版中这些值均为空对象。

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：仅在完全展开时可进入求爱状态。

```json showLineNumbers
"minecraft:breedable": {
    "require_tame": false,
    "breed_items": [ "spider_eye" ],
    "breeds_with": {
        "minecraft:armadillo": {}
    },
    "love_filters": {
        "test": "enum_property",
        "domain": "minecraft:armadillo_state",
        "value": "unrolled"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:bribeable`

<Usable type="all"/> <Version add="1.5.0"/> <br/>

定义可以用物品贿赂实体，使其进入被贿赂状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:bribeable"/>：根对象。
  - <DataType type="array" name="bribe_items"/>：可用来贿赂的物品。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="float" name="bribe_cooldown"/>：再次接受贿赂所需的秒数。默认值为`2.0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

海豚（<FileType type="file" name="dolphin.json"/>）：

```json showLineNumbers
"minecraft:bribeable": {
    "bribe_items": [ "fish", "salmon" ]
}
```

</TabItem></Tabs>

---

### `minecraft:buoyant`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

使实体能漂浮在指定液体方块上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:buoyant"/>：根对象。
  - <DataType type="array" name="liquid_blocks"/>：可漂浮的液体方块，必须是液体。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="float" name="base_buoyancy"/>：基础浮力，决定漂浮的程度。默认值为`1`。
  - <DataType type="boolean" name="apply_gravity"/>：每刻是否施加额外重力。默认值为`true`。
  - <DataType type="string" name="movement_type"/>：上下浮动的类型。可选值为`waves`（按实体速度模拟波浪）、`bobbing`（模拟波浪穿过）、`none`（不浮动）。默认值为`waves`。
  - <DataType type="float" name="big_wave_probability"/>：出现大浪的概率，仅在`waves`下生效。默认值为`0.03`。
  - <DataType type="float" name="big_wave_speed"/>：大浪的速度乘数。默认值为`10`。
  - <DataType type="float" name="drag_down_on_buoyancy_removed"/>：组件被移除时向下拖拽的力度。默认值为`0`。
  - <DataType type="boolean" name="can_auto_step_from_liquid"/>：被推向相邻固体方块时能否自行上岸。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

船（<FileType type="file" name="boat.json"/>）：

```json showLineNumbers
"minecraft:buoyant": {
    "apply_gravity": true,
    "base_buoyancy": 1.0,
    "big_wave_probability": 0.03,
    "big_wave_speed": 10.0,
    "liquid_blocks": [
        "minecraft:water",
        "minecraft:flowing_water"
    ],
    "movement_type": "waves"
}
```

</TabItem></Tabs>

---

### `minecraft:burns_in_daylight`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体在阳光直射下会着火。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:burns_in_daylight"/>：根对象。
  - <DataType type="string" name="protection_slot"/>：可挡住阳光的装备槽位。可选值为`slot.weapon.mainhand`、`slot.weapon.offhand`、`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`。默认值为`slot.armor.head`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：

```json showLineNumbers
"minecraft:burns_in_daylight": {}
```

</TabItem></Tabs>

---

### `minecraft:can_climb`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许实体攀爬梯子与藤蔓。

另见：_[EntityCanClimbComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitycanclimbcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:can_climb"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：

```json showLineNumbers
"minecraft:can_climb": {}
```

</TabItem></Tabs>

---

### `minecraft:can_fly`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许实体在寻路时飞越障碍。

另见：_[EntityCanFlyComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitycanflycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:can_fly"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:can_fly": {}
```

</TabItem></Tabs>

---

### `minecraft:can_join_raid`

<Usable type="all"/> <Version add="1.20.50"/> <br/>

使实体能够加入正在进行的袭击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:can_join_raid"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

唤魔者（<FileType type="file" name="evocation_illager.json"/>）：

```json showLineNumbers
"minecraft:can_join_raid": {}
```

</TabItem></Tabs>

---

### `minecraft:can_power_jump`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许实体在骑乘时蓄力跳跃。

另见：_[EntityCanPowerJumpComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitycanpowerjumpcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:can_power_jump"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

驴（<FileType type="file" name="donkey.json"/>）：

```json showLineNumbers
"minecraft:can_power_jump": {}
```

</TabItem></Tabs>

---

### `minecraft:can_stand_on_powder_snow`

<Usable type="all"/> <Version add="1.26.50"/> <br/>

定义实体能否站在细雪上而不下陷。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:can_stand_on_powder_snow"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：

```json showLineNumbers
"minecraft:can_stand_on_powder_snow": {}
```

</TabItem></Tabs>

---

### `minecraft:cannot_be_attacked`

<Usable type="all"/> <Version add="1.21.50"/> <br/>

使实体无法被攻击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:cannot_be_attacked"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

恶魂（<FileType type="file" name="ghast.json"/>）：

```json showLineNumbers
"minecraft:cannot_be_attacked": {}
```

</TabItem></Tabs>

---

### `minecraft:celebrate_hunt`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

定义实体在狩猎成功后庆祝的行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:celebrate_hunt"/>：根对象。
  - <DataType type="object" name="celebration_targets"/>：判定为狩猎目标的条件。见[实体过滤器](./filters)。
  - <DataType type="boolean" name="broadcast"/>：是否把庆祝广播给范围内的其他实体。默认值为`true`。
  - <DataType type="float" name="radius"/>：广播半径，单位为方块。默认值为`16`。
  - <DataType type="int" name="duration"/>：庆祝持续的秒数。默认值为`4`。
  - <DataType type="string" name="celebrate_sound"/>：庆祝时播放的音效定义 ID。
  - <DataType type="array" name="sound_interval"/>：两次庆祝音效之间的随机等待区间，写作`[最小值, 最大值]`。
    - <DataType type="float"/>：边界值。
</treeview>

> **备注**：原版把`sound_interval`写作含`range_min`与`range_max`的对象；官方文档对该字段的描述为时间区间。`celebration_targets`在官方文档中误拼作`celeberation_targets`。

</TabItem><TabItem value="示例" label="示例">

猪灵（<FileType type="file" name="piglin.json"/>）：

```json showLineNumbers
"minecraft:celebrate_hunt": {
    "celebration_targets": {
        "all_of": [
            { "test": "is_family", "value": "hoglin" }
        ]
    },
    "broadcast": true,
    "duration": 10,
    "celebrate_sound": "celebrate",
    "sound_interval": { "range_min": 2.0, "range_max": 5.0 },
    "radius": 16
}
```

</TabItem></Tabs>

---

### `minecraft:color`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的调色板颜色编号。

另见：_[EntityColorComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitycolorcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:color"/>：根对象。
  - <DataType type="int" name="value"/>：颜色编号。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：

```json showLineNumbers
"minecraft:color": {
    "value": 14
}
```

</TabItem></Tabs>

---

### `minecraft:color2`

<Usable type="all"/> <Version add="1.4.0"/> <br/>

定义实体的第二调色板颜色编号。

另见：_[EntityColor2Component 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitycolor2component-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:color2"/>：根对象。
  - <DataType type="int" name="value"/>：第二颜色编号。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

热带鱼（<FileType type="file" name="tropicalfish.json"/>）：

```json showLineNumbers
"minecraft:color2": {
    "value": 7
}
```

</TabItem></Tabs>

---

### `minecraft:combat_regeneration`

<Usable type="all"/> <Version add="1.17.0"/> <br/>

使杀死该实体攻击目标的生物获得生命恢复 I，并移除其挖掘疲劳。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:combat_regeneration"/>：根对象。
  - <DataType type="boolean" name="apply_to_self"/>：实体自身击杀目标时是否获得该增益。默认值为`false`。
  - <DataType type="boolean" name="apply_to_family"/>：击杀者为同族实体时，该同族实体是否获得该增益。默认值为`false`。
  - <DataType type="int"/><DataType type="string" name="regeneration_duration"/>：生命恢复 I 的持续秒数，可填`infinite`表示永久。默认值为`5`。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上参数取自 26.60 官方文档。

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：全部取默认值，即击杀者自身不获得增益。

```json showLineNumbers
"minecraft:combat_regeneration": {}
```

</TabItem></Tabs>

---

### `minecraft:conditional_bandwidth_optimization`

<Usable type="all"/> <Version add="1.16.100"/> <br/>

定义实体的带宽优化策略，用于减少位置同步包的数量。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:conditional_bandwidth_optimization"/>：根对象。
  - <DataType type="object" name="default_values"/>：默认策略。下列三个字段同样适用于`conditional_values`中的每一项。
    - <DataType type="int" name="max_dropped_ticks"/>：最多可连续多少刻不发送位置同步包。
    - <DataType type="float" name="max_optimized_distance"/>：参与优化的最大距离，超过该距离按最大优化处理。
    - <DataType type="boolean" name="use_motion_prediction_hints"/>：为`true`时在丢包区间内发送更小的运动预测包，适合高速移动或传送的实体。
  - <DataType type="array" name="conditional_values"/>：按条件覆盖默认策略，取第一条条件成立者。
    - <DataType type="object"/>：一项。
      - <DataType type="object" name="filters"/>：条件。见[实体过滤器](./filters)。
      - <DataType type="int" name="max_dropped_ticks"/>：最多可连续多少刻不发送位置同步包。
      - <DataType type="float" name="max_optimized_distance"/>：参与优化的最大距离。
      - <DataType type="boolean" name="use_motion_prediction_hints"/>：是否发送更小的运动预测包。
</treeview>

</TabItem><TabItem value="示例" label="示例">

箭（<FileType type="file" name="arrow.json"/>）：

```json showLineNumbers
"minecraft:conditional_bandwidth_optimization": {
    "default_values": {
        "max_dropped_ticks": 7,
        "max_optimized_distance": 80.0,
        "use_motion_prediction_hints": true
    }
}
```

</TabItem></Tabs>

---

### `minecraft:custom_hit_test`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

自定义近战与远程命中判定使用的碰撞箱。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:custom_hit_test"/>：根对象。
  - <DataType type="array" name="hitboxes"/>：命中判定箱列表。
    - <DataType type="object"/>：一个判定箱。
      - <DataType type="float" name="width"/>：宽度。
      - <DataType type="float" name="height"/>：高度。
      - <DataType type="array" name="pivot"/>：判定箱的基准点，由 3 个`float`组成。
</treeview>

</TabItem><TabItem value="示例" label="示例">

疣猪兽（<FileType type="file" name="hoglin.json"/>）：命中判定比实际碰撞箱更扁。

```json showLineNumbers
"minecraft:custom_hit_test": {
    "hitboxes": [
        {
            "width": 1.0,
            "height": 0.85,
            "pivot": [ 0, 0.5, 0 ]
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:damage_over_time`

<Usable type="all"/> <Version add="1.4.0"/> <br/>

按固定间隔持续对实体造成伤害。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:damage_over_time"/>：根对象。
  - <DataType type="int" name="damage_per_hurt"/>：每次伤害的数值。默认值为`1`。
  - <DataType type="float" name="time_between_hurt"/>：两次伤害之间的秒数。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:damage_over_time": {
    "damage_per_hurt": 1,
    "time_between_hurt": 0
}
```

</TabItem></Tabs>

---

### `minecraft:dash_action`

<Usable type="all"/> <Version add="1.21.110"/> <br/>

为可骑乘实体添加冲刺能力。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:dash_action"/>：根对象。
  - <DataType type="float" name="cooldown_time"/>：冲刺冷却的秒数。默认值为`1.0`。
  - <DataType type="float" name="horizontal_momentum"/>：水平方向施加的动量。默认值为`1.0`。
  - <DataType type="float" name="vertical_momentum"/>：垂直方向施加的动量。默认值为`1.0`。
  - <DataType type="string" name="direction"/>：动量的施加方向。可选值为`entity`（沿实体朝向）、`passenger`（沿骑乘者朝向）。默认值为`entity`。
  - <DataType type="boolean" name="can_dash_underwater"/>：是否能在水下冲刺。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：

```json showLineNumbers
"minecraft:dash_action": {
    "cooldown_time": 2.75,
    "horizontal_momentum": 20.0,
    "vertical_momentum": 0.6
}
```

</TabItem></Tabs>

---

### `minecraft:default_look_angle`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置实体头部的默认俯仰角。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:default_look_angle"/>：根对象。
  - <DataType type="float" name="value"/>：角度，单位为度。默认值为`0.0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版多数实体不写该组件，以下为最小写法：

```json showLineNumbers
"minecraft:default_look_angle": {
    "value": -10.0
}
```

</TabItem></Tabs>

---

### `minecraft:despawn`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

定义实体在满足消失规则或过滤器条件时被移除。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:despawn"/>：根对象。
  - <DataType type="boolean" name="despawn_from_chance"/>：标准消失规则中是否使用随机概率。默认值为`true`。
  - <DataType type="object" name="despawn_from_distance"/>：是否按距离执行标准消失规则，可继续写`min_distance`与`max_distance`。
  - <DataType type="int" name="min_distance"/>：开始尝试消失的最小距离，单位为方块。默认值为`32`。
  - <DataType type="int" name="max_distance"/>：立即消失的最大距离，单位为方块。默认值为`128`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：只启用按距离消失，距离取默认值。

```json showLineNumbers
"minecraft:despawn": {
    "despawn_from_distance": {}
}
```

</TabItem></Tabs>

---

### `minecraft:dimension_bound`

<Usable type="all"/> <Version add="1.21.40"/> <br/>

阻止实体通过传送门切换维度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:dimension_bound"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

箭（<FileType type="file" name="arrow.json"/>）：

```json showLineNumbers
"minecraft:dimension_bound": {}
```

</TabItem></Tabs>

---

### `minecraft:drying_out_timer`

<Usable type="all"/> <Version add="1.17.0"/> <br/>

添加一个脱水计时器，超时后触发事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:drying_out_timer"/>：根对象。
  - <DataType type="float" name="total_time"/>：完全脱水所需的秒数。默认值为`0.0`。
  - <DataType type="float" name="water_bottle_refill_time"/>：对实体使用喷溅水瓶可额外延长的秒数。默认值为`0.0`。
  - <DataType type="object" name="dried_out_event"/>：脱水完成时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
  - <DataType type="object" name="stopped_drying_out_event"/>：脱水过程被打断（如进入水中或雨中）时触发的事件，结构同上。
  - <DataType type="object" name="recover_after_dried_out_event"/>：已经脱水后重新获得水分时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:drying_out_timer": {
    "total_time": 300,
    "water_bottle_refill_time": 90,
    "dried_out_event": { "event": "dried_out" },
    "stopped_drying_out_event": { "event": "stop_drying_out" },
    "recover_after_dried_out_event": { "event": "recover_after_dried_out" }
}
```

</TabItem></Tabs>

---

### `minecraft:dweller`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体加入村庄并参与村庄的迁移与职位分配。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:dweller"/>：根对象。
  - <DataType type="string" name="dwelling_type"/>：居住地类型，如`village`。
  - <DataType type="string" name="dweller_role"/>：在居住地中的角色，如`passive`。
  - <DataType type="int" name="update_interval_base"/>：更新居住地信息的基础间隔，单位为刻。
  - <DataType type="int" name="update_interval_variant"/>：间隔的随机浮动范围。
  - <DataType type="boolean" name="can_find_poi"/>：是否能自行寻找兴趣点。
  - <DataType type="boolean" name="can_migrate"/>：是否会在居住地之间迁移。
  - <DataType type="int" name="first_founding_reward"/>：首次参与建立村庄时获得的奖励值。
</treeview>

> **备注**：官方 schema 与文档均未列出该组件的参数，以上按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：

```json showLineNumbers
"minecraft:dweller": {
    "dwelling_type": "village",
    "dweller_role": "passive",
    "update_interval_base": 60,
    "update_interval_variant": 40,
    "can_find_poi": false,
    "can_migrate": true,
    "first_founding_reward": 0
}
```

</TabItem></Tabs>

---

### `minecraft:economy_trade_table`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

定义实体与玩家交易的能力，以及交易使用的经济交易表。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:economy_trade_table"/>：根对象。
  - <DataType type="string" name="table"/>：交易表路径，如`trading/economy_trades/armorer_trades.json`。
  - <DataType type="string" name="display_name"/>：交易界面显示名使用的本地化键。
  - <DataType type="boolean" name="new_screen"/>：是否使用新版交易界面。默认值为`false`。
  - <DataType type="boolean" name="show_trade_screen"/>：交互时是否打开交易界面。默认值为`true`。
  - <DataType type="boolean" name="persist_trades"/>：生成的交易是否随实体存档保存。默认值为`false`。
  - <DataType type="boolean" name="convert_trades_economy"/>：是否把旧版交易数据转换为经济交易数据。默认值为`false`。
  - <DataType type="array" name="cured_discount"/>：治愈村民后价格折扣的范围，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
    - <DataType type="int"/>：边界值。
  - <DataType type="array" name="max_cured_discount"/>：治愈折扣允许的最大范围。默认值为`[0, 0]`。
    - <DataType type="int"/>：边界值。
  - <DataType type="int" name="nearby_cured_discount"/>：附近有治愈村民时的折扣步长，旧版定价使用。默认值为`-20`。
  - <DataType type="int" name="max_nearby_cured_discount"/>：附近治愈折扣允许的最低值，旧版定价使用。默认值为`-200`。
  - <DataType type="int" name="hero_demand_discount"/>：玩家持有村庄英雄效果时的额外需求折扣。默认值为`-4`。
  - <DataType type="boolean" name="use_legacy_price_formula"/>：是否使用旧版价格公式。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：盔甲匠的交易表。

```json showLineNumbers
"minecraft:economy_trade_table": {
    "table": "trading/economy_trades/armorer_trades.json",
    "display_name": "entity.villager.armor",
    "new_screen": true,
    "persist_trades": true,
    "cured_discount": [ -25, -20 ],
    "max_cured_discount": [ -25, -20 ]
}
```

</TabItem></Tabs>

---

### `minecraft:entity_armor_equipment_slot_mapping`

<Usable type="all"/> <Version add="1.21.20"/> <br/>

定义装备到[`minecraft:equippable`](./components#minecraftequippable)第二个槽位的物品应当计入哪个盔甲槽位。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:entity_armor_equipment_slot_mapping"/>：根对象。
  - <DataType type="string" name="armor_slot"/>：目标盔甲槽位。可填`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:entity_armor_equipment_slot_mapping": {
    "armor_slot": "slot.armor.head"
}
```

</TabItem></Tabs>

---

### `minecraft:equip_item`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

允许实体捡起并穿上装备。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:equip_item"/>：根对象。
  - <DataType type="array" name="excluded_items"/>：实体不会装备的物品。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="item"/>：物品 ID，可带数据值，如`minecraft:banner:15`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：不捡拾旗帜。

```json showLineNumbers
"minecraft:equip_item": {
    "excluded_items": [
        { "item": "minecraft:banner:15" }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:equipment`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

指定实体使用的装备表，生成时按表给予装备。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:equipment"/>：根对象。
  - <DataType type="string" name="table"/>：装备表路径，相对于行为包根目录，如`loot_tables/entities/skeleton_gear.json`。
  - <DataType type="array" name="slot_drop_chance"/>：各槽位的掉落概率。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="slot"/>：槽位名。可填`slot.weapon.mainhand`、`slot.weapon.offhand`、`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`。
      - <DataType type="float" name="drop_chance"/>：该槽位掉落装备的概率，取值`0.0`-`1.0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：

```json showLineNumbers
"minecraft:equipment": {
    "table": "loot_tables/entities/skeleton_gear.json"
}
```

</TabItem></Tabs>

---

### `minecraft:equippable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体可被装备物品的槽位及交互方式。

另见：_[EntityEquippableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityequippablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:equippable"/>：根对象。
  - <DataType type="array" name="slots"/>：可装备的槽位列表。
    - <DataType type="object"/>：一个槽位。
      - <DataType type="int" name="slot"/>：槽位编号。默认值为`0`。
      - <DataType type="string" name="item"/>：该槽位对应的物品 ID。
      - <DataType type="array" name="accepted_items"/>：该槽位可接受的物品列表。
        - <DataType type="string"/>：物品 ID。
      - <DataType type="string" name="interact_text"/>：触屏操作下可装备时显示的提示文本。
      - <DataType type="object" name="on_equip"/>：装备该物品时触发的事件。
        - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="on_unequip"/>：卸下该物品时触发的事件。
        - <DataType type="string" name="event"/>：事件 ID。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：槽位`0`接受鞍，装上与卸下各触发一个事件。

```json showLineNumbers
"minecraft:equippable": {
    "slots": [
        {
            "slot": 0,
            "item": "saddle",
            "accepted_items": [ "saddle" ],
            "on_equip": { "event": "minecraft:camel_saddled" },
            "on_unequip": { "event": "minecraft:camel_unsaddled" }
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:exhaustion_values`

<Usable type="all"/> <Version add="1.18.30"/> <br/>

定义玩家各类动作消耗的饥饿值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:exhaustion_values"/>：根对象。
  - <DataType type="float" name="walk"/>：行走时的消耗。默认值为`0`。
  - <DataType type="float" name="sprint"/>：疾跑时的消耗。默认值为`0.01`。
  - <DataType type="float" name="swim"/>：游泳时的消耗。默认值为`0.01`。
  - <DataType type="float" name="jump"/>：跳跃时的消耗。默认值为`0.05`。
  - <DataType type="float" name="sprint_jump"/>：疾跑跳跃时的消耗。默认值为`0.2`。
  - <DataType type="float" name="attack"/>：攻击时的消耗。默认值为`0.1`。
  - <DataType type="float" name="damage"/>：受到伤害时的消耗。默认值为`0.1`。
  - <DataType type="float" name="mine"/>：挖掘方块时的消耗。默认值为`0.005`。
  - <DataType type="float" name="heal"/>：自然回血时的消耗。默认值为`6`。
  - <DataType type="float" name="lunge"/>：触发突刺附魔时的消耗，会再乘以附魔等级。默认值为`4`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

玩家（<FileType type="file" name="player.json"/>）：

```json showLineNumbers
"minecraft:exhaustion_values": {
    "walk": 0.0,
    "sprint": 0.1,
    "swim": 0.01,
    "jump": 0.05,
    "sprint_jump": 0.2,
    "attack": 0.1,
    "damage": 0.1,
    "mine": 0.005,
    "heal": 6.0,
    "lunge": 4.0
}
```

</TabItem></Tabs>

---

### `minecraft:experience_reward`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

定义实体被繁殖或死亡时给予的经验值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:experience_reward"/>：根对象。
  - <DataType type="string" name="on_bred"/>：成功繁殖时给予的经验值，填返回数值的 Molang 表达式。
  - <DataType type="string" name="on_death"/>：死亡时给予的经验值，填返回数值的 Molang 表达式。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：繁殖给 1-7 点经验，被玩家杀死时给 1-3 点。

```json showLineNumbers
"minecraft:experience_reward": {
    "on_bred": "Math.Random(1,7)",
    "on_death": "query.last_hit_by_player ? Math.Random(1,3) : 0"
}
```

</TabItem></Tabs>

---

### `minecraft:explode`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体爆炸的方式，可用于引信类实体与弹射物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:explode"/>：根对象。
  - <DataType type="float" name="power"/>：爆炸半径与伤害强度。默认值为`3`。
  - <DataType type="float" name="fuse_length"/>：（写法 1）引信时长的固定秒数。
  - <DataType type="array" name="fuse_length"/>：（写法 2）引信时长的随机区间，写作`[最小值, 最大值]`。
  - <DataType type="boolean" name="fuse_lit"/>：添加组件时引信是否已点燃。默认值为`false`。
  - <DataType type="boolean" name="causes_fire"/>：爆炸范围内的方块是否着火。默认值为`false`。
  - <DataType type="boolean" name="breaks_blocks"/>：是否破坏爆炸范围内的方块。默认值为`true`。
  - <DataType type="boolean" name="destroy_affected_by_griefing"/>：是否受「允许破坏方块」的游戏规则影响。默认值为`false`。
  - <DataType type="boolean" name="fire_affected_by_griefing"/>：是否受「允许破坏方块」的游戏规则影响而决定是否着火。默认值为`false`。
  - <DataType type="boolean" name="allow_underwater"/>：水下是否仍然生效。默认值为`false`。
  - <DataType type="boolean" name="toggles_blocks"/>：是否把范围内的方块切换为另一种状态。默认值为`false`。
  - <DataType type="float" name="damage_scaling"/>：对实体伤害的缩放系数。默认值为`1.0`。
  - <DataType type="float" name="knockback_scaling"/>：击退力的缩放系数。默认值为`1.0`。
  - <DataType type="float" name="max_resistance"/>：参与计算的最大方块爆炸抗性。默认值为`3.4e+38`。
  - <DataType type="boolean" name="negates_fall_damage"/>：是否抵消落地伤害。默认值为`false`。
  - <DataType type="string" name="particle_effect"/>：爆炸使用的粒子效果名。默认值为`explosion`。
  - <DataType type="string" name="sound_effect"/>：爆炸播放的音效名。默认值为`explode`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人风弹（<FileType type="file" name="breeze_wind_charge_projectile.json"/>）：不破坏方块，改为切换方块状态。

```json showLineNumbers
"minecraft:explode": {
    "power": 3.0,
    "knockback_scaling": 0.6,
    "damage_scaling": 0,
    "allow_underwater": true,
    "breaks_blocks": false,
    "causes_fire": false,
    "max_resistance": 0,
    "negates_fall_damage": false,
    "particle_effect": "breeze_wind_burst",
    "toggles_blocks": true,
    "sound_effect": "breeze_wind_charge.burst"
}
```

</TabItem></Tabs>

---

### `minecraft:fire_immune`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体免疫火焰伤害。

另见：_[EntityFireImmuneComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityfireimmunecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:fire_immune"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

烈焰人（<FileType type="file" name="blaze.json"/>）：

```json showLineNumbers
"minecraft:fire_immune": {}
```

</TabItem></Tabs>

---

### `minecraft:floats_in_liquid`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体能漂浮在液体方块上。

另见：_[EntityFloatsInLiquidComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityfloatsinliquidcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:floats_in_liquid"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:floats_in_liquid": {}
```

</TabItem></Tabs>

---

### `minecraft:flocking`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

使实体在水中或空中成群活动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:flocking"/>：根对象。
  - <DataType type="boolean" name="in_water"/>：实体是否处于水中。默认值为`false`。
  - <DataType type="boolean" name="match_variants"/>：是否只与变种、标记变种与颜色都相同的实体结群。默认值为`false`。
  - <DataType type="boolean" name="use_center_of_mass"/>：是否以群体的质心作为跟随目标。默认值为`false`。
  - <DataType type="int" name="low_flock_limit"/>：群体规模的下限。默认值为`0`。
  - <DataType type="int" name="high_flock_limit"/>：群体规模的上限。默认值为`0`。
  - <DataType type="float" name="goal_weight"/>：整体转向的权重。默认值为`0`。
  - <DataType type="float" name="loner_chance"/>：个体不加入群体的概率，取值`0`-`1`。默认值为`0`。
  - <DataType type="float" name="influence_radius"/>：可被纳入群体的范围。默认值为`0`。
  - <DataType type="float" name="breach_influence"/>：个体跃出水面时受到的推回力度。默认值为`0`。
  - <DataType type="float" name="separation_weight"/>：分离行为的权重。默认值为`1`。
  - <DataType type="float" name="separation_threshold"/>：开始互相分离的距离。默认值为`2`。
  - <DataType type="float" name="cohesion_weight"/>：聚拢行为的权重。默认值为`1`。
  - <DataType type="float" name="cohesion_threshold"/>：开始聚拢的阈值。默认值为`1`。
  - <DataType type="float" name="innner_cohesion_threshold"/>：停止聚拢的距离。默认值为`0`。
  - <DataType type="float" name="min_height"/>：允许活动的最低高度。默认值为`0`。
  - <DataType type="float" name="max_height"/>：允许活动的最高高度。默认值为`0`。
  - <DataType type="float" name="block_distance"/>：探测方块的推离距离。默认值为`0`。
  - <DataType type="float" name="block_weight"/>：方块推离的权重。默认值为`0`。
</treeview>

> **备注**：字段名中的三连`n`为官方原文，并非笔误。

</TabItem><TabItem value="示例" label="示例">

海豚（<FileType type="file" name="dolphin.json"/>）：4 至 8 只结群，分离与聚拢同时生效。

```json showLineNumbers
"minecraft:flocking": {
    "in_water": false,
    "low_flock_limit": 4,
    "high_flock_limit": 8,
    "goal_weight": 2.0,
    "loner_chance": 0.1,
    "influence_radius": 6.0,
    "separation_weight": 1.75,
    "separation_threshold": 3.0,
    "cohesion_weight": 1.85,
    "cohesion_threshold": 6.5,
    "innner_cohesion_threshold": 3.5
}
```

</TabItem></Tabs>

---

### `minecraft:flying_speed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的飞行速度。

另见：_[EntityFlyingSpeedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityflyingspeedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:flying_speed"/>：根对象。
  - <DataType type="float" name="value"/>：飞行速度。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:flying_speed": {
    "value": 0.1
}
```

</TabItem></Tabs>

---

### `minecraft:follow_range`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的跟随距离。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:follow_range"/>：根对象。
  - <DataType type="float" name="value"/>：跟随距离，单位为方块。
  - <DataType type="float" name="max"/>：跟随距离的上限。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:follow_range": {
    "value": 1024
}
```

</TabItem></Tabs>

---

### `minecraft:free_camera_controlled`

<Usable type="all"/> <Version add="1.21.110"/> <br/>

允许实体在自由视角下被玩家控制。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:free_camera_controlled"/>：根对象。
  - <DataType type="float" name="strafe_speed_modifier"/>：横向移动的速度乘数。默认值为`1.0`。
  - <DataType type="float" name="backwards_movement_modifier"/>：后退时的速度乘数。默认值为`0.5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

快乐恶魂（<FileType type="file" name="happy_ghast.json"/>）：

```json showLineNumbers
"minecraft:free_camera_controlled": {
    "strafe_speed_modifier": 1.0,
    "backwards_movement_modifier": 0.5
}
```

</TabItem></Tabs>

---

### `minecraft:freezing_immune`

<Usable type="all"/> <Version add="1.26.50"/> <br/>

定义实体是否免疫冰冻。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:freezing_immune"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：

```json showLineNumbers
"minecraft:freezing_immune": {}
```

</TabItem></Tabs>

---

### `minecraft:freezing_vulnerable`

<Usable type="all"/> <Version add="1.26.50"/> <br/>

定义实体是否受到额外的冰冻伤害。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:freezing_vulnerable"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

烈焰人（<FileType type="file" name="blaze.json"/>）：

```json showLineNumbers
"minecraft:freezing_vulnerable": {}
```

</TabItem></Tabs>

---

### `minecraft:friction_modifier`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体受到的摩擦力修正。

另见：_[EntityFrictionModifierComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityfrictionmodifiercomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:friction_modifier"/>：根对象。
  - <DataType type="float" name="value"/>：摩擦力的修正值。
</treeview>

</TabItem><TabItem value="示例" label="示例">

硫方怪（<FileType type="file" name="sulfur_cube.json"/>）：

```json showLineNumbers
"minecraft:friction_modifier": {
    "value": 1.0
}
```

</TabItem></Tabs>

---

### `minecraft:game_event_movement_tracking`

<Usable type="all"/> <Version add="1.19.20"/> <br/>

让实体在移动时发出游戏事件，供幽匿传感器一类的机制响应。所有生物默认带有该组件，重新声明可覆盖默认行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:game_event_movement_tracking"/>：根对象。
  - <DataType type="boolean" name="emit_move"/>：在地面或固体中移动时是否发出`entityMove`事件。默认值为`true`。
  - <DataType type="boolean" name="emit_swim"/>：在液体中移动时是否发出`swim`事件。默认值为`true`。
  - <DataType type="boolean" name="emit_flap"/>：在空中移动时是否发出`flap`事件。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：飞行时也发出游戏事件。

```json showLineNumbers
"minecraft:game_event_movement_tracking": {
    "emit_flap": true
}
```

</TabItem></Tabs>

---

### `minecraft:genetics`

<Usable type="all"/> <Version add="1.8.0"/> <br/>

定义实体在繁殖时遗传与变异的规则。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:genetics"/>：根对象。
  - <DataType type="float" name="mutation_rate"/>：后代发生变异的概率。
  - <DataType type="array" name="genes"/>：参与遗传的基因列表。
    - <DataType type="object"/>：一个基因。
      - <DataType type="string" name="name"/>：基因名。
      - <DataType type="boolean" name="use_simplified_breeding"/>：是否使用简化繁殖规则。
      - <DataType type="object" name="allele_range"/>：该基因的等位值范围。
        - <DataType type="int" name="range_min"/>：下限。默认值为`0`。
        - <DataType type="int" name="range_max"/>：上限。默认值为`0`。
      - <DataType type="array" name="genetic_variants"/>：按等位值区间划分的变体列表。
        - <DataType type="object"/>：一个变体。
          - <DataType type="object" name="main_allele"/>：该变体对应的主等位值区间，结构同`allele_range`。
          - <DataType type="object" name="birth_event"/>：后代落入该区间时触发的事件。
            - <DataType type="string" name="event"/>：事件 ID。
            - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

山羊（<FileType type="file" name="goat.json"/>）：等位值落在 1-2 时成为尖叫山羊，否则为普通山羊。

```json showLineNumbers
"minecraft:genetics": {
    "mutation_rate": 0.02,
    "genes": [
        {
            "name": "goat_variant",
            "use_simplified_breeding": true,
            "allele_range": { "range_min": 1, "range_max": 100 },
            "genetic_variants": [
                {
                    "main_allele": { "range_min": 1, "range_max": 2 },
                    "birth_event": { "event": "minecraft:born_screamer", "target": "self" }
                },
                {
                    "main_allele": { "range_min": 3, "range_max": 100 },
                    "birth_event": { "event": "minecraft:born_default", "target": "self" }
                }
            ]
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:giveable`

<Usable type="all"/> <Version add="1.9.0"/> <br/>

定义一组物品，对该实体使用这些物品时会触发事件，物品同时被收下并放入实体的背包。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:giveable"/>：根对象。
  - <DataType type="object" name="triggers"/>：给予规则。
    - <DataType type="float" name="cooldown"/>：两次给予之间的冷却秒数，用于避免短时间内连续触发。默认值为`0.0`。
    - <DataType type="array" name="items"/>：可以给予实体的物品列表。
      - <DataType type="string"/>：物品 ID。
    - <DataType type="object" name="on_give"/>：给予正确物品时触发的事件。
      - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

> **备注**：关于`triggers`，官方文档把其中三个字段直接写在组件对象下，原版则包在`triggers`中，此处按原版结构书写。

</TabItem><TabItem value="示例" label="示例">

熊猫（<FileType type="file" name="panda.json"/>）：用竹子或蛋糕使其平静。

```json showLineNumbers
"minecraft:giveable": {
    "triggers": {
        "cooldown": 3.0,
        "items": [ "bamboo", "cake" ],
        "on_give": {
            "event": "minecraft:on_calm",
            "target": "self"
        }
    }
}
```

</TabItem></Tabs>

---

### `minecraft:ground_offset`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置实体实际位置相对地面的偏移量。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:ground_offset"/>：根对象。
  - <DataType type="float" name="value"/>：偏移量，单位为方块。默认值为`0.0`。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上参数取自 26.60 官方文档。

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:ground_offset": {
    "value": 0.0
}
```

</TabItem></Tabs>

---

### `minecraft:group_size`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

记录指定半径内满足条件的实体数量，供`query.is_scenting`一类的群体判定使用。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:group_size"/>：根对象。
  - <DataType type="float" name="radius"/>：统计半径，单位为方块。默认值为`16`。
  - <DataType type="object" name="filters"/>：哪些实体计入群体。见[实体过滤器](./filters)。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上参数取自 26.60 官方文档。

</TabItem><TabItem value="示例" label="示例">

猪灵（<FileType type="file" name="piglin.json"/>）：只统计 32 格内的成年猪灵。

```json showLineNumbers
"minecraft:group_size": {
    "radius": 32,
    "filters": {
        "all_of": [
            {
                "test": "has_component",
                "operator": "not",
                "value": "minecraft:is_baby"
            },
            {
                "test": "is_family",
                "value": "piglin"
            }
        ]
    }
}
```

</TabItem></Tabs>

---

### `minecraft:grows_crop`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

实体走过作物时有一定概率加速作物生长。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:grows_crop"/>：根对象。
  - <DataType type="float" name="chance"/>：每刻促成的概率，取值`0`-`1`。默认值为`0`。
  - <DataType type="int" name="charges"/>：可生效的次数，用尽后不再促进生长。默认值为`10`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：

```json showLineNumbers
"minecraft:grows_crop": {
    "chance": 0.03,
    "charges": 10
}
```

</TabItem></Tabs>

---

### `minecraft:healable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义可以用物品治疗实体。

另见：_[EntityHealableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityhealablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:healable"/>：根对象。
  - <DataType type="array" name="items"/>：可用于治疗的物品列表。
    - <DataType type="object"/>：一项。
      - <DataType type="object" name="item"/>：物品描述符，可写物品 ID。
      - <DataType type="int" name="heal_amount"/>：治疗量。默认值为`1`。
      - <DataType type="object" name="result_item"/>：交互成功后该物品转换成的物品。
      - <DataType type="array" name="effects"/>：使用时附加的状态效果。
        - <DataType type="object"/>：一项。
          - <DataType type="string" name="name"/>：状态效果 ID。
          - <DataType type="float" name="duration"/>：持续秒数。默认值为`0`。
          - <DataType type="int" name="amplifier"/>：效果等级。默认值为`1`。
          - <DataType type="float" name="chance"/>：生效概率，取值`0.0`-`1.0`。默认值为`1`。
  - <DataType type="boolean" name="force_use"/>：满血时是否仍可使用治疗物品。默认值为`false`。
  - <DataType type="object" name="filters"/>：允许治疗的条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：仙人掌可治疗 2 点生命。

```json showLineNumbers
"minecraft:healable": {
    "items": [
        {
            "item": "cactus",
            "heal_amount": 2
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:heartbeat`

<Usable type="all"/> <Version add="1.19.40"/> <br/>

定义实体的心跳间隔与所用音效。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:heartbeat"/>：根对象。
  - <DataType type="string" name="interval"/>：两次心跳之间的间隔，填返回秒数的 Molang 表达式；`0`表示不播放心跳。默认值为`1.00`。
  - <DataType type="string" name="sound_event"/>：心跳使用的音效事件名。默认值为`heartbeat`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：愤怒值越高，心跳越快。

```json showLineNumbers
"minecraft:heartbeat": {
    "interval": "2.0 - math.clamp(query.anger_level / 80 * 1.5, 0, 1.5)"
}
```

</TabItem></Tabs>

---

### `minecraft:hide`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

使实体移动到并躲藏在其拥有的兴趣点（POI）或最近的兴趣点处。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:hide"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：

```json showLineNumbers
"minecraft:hide": {}
```

</TabItem></Tabs>

---

### `minecraft:home`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

记录实体生成时的「家」位置，并可把实体的活动范围限制在该位置附近。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:home"/>：根对象。
  - <DataType type="string" name="restriction_type"/>：限制方式。可选值为`none`（不限制）、`random_movement`（只限制随机移动）、`all_movement`（限制一切移动，但已经远离家的实体仍可往回走）。默认值为`none`。
  - <DataType type="int" name="restriction_radius"/>：限制半径，单位为方块。默认值为`0`。
  - <DataType type="array" name="home_block_list"/>：可视为有效「家」的方块列表；该位置的方块不再是其中之一时，家的限制被移除。方块 ID 不支持数据值写法（如`minecraft:sand:1`）。
    - <DataType type="string"/>：方块 ID。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：家限定为蜂巢或蜂箱，活动半径 22 格。

```json showLineNumbers
"minecraft:home": {
    "restriction_type": "random_movement",
    "restriction_radius": 22,
    "home_block_list": [ "minecraft:bee_nest", "minecraft:beehive" ]
}
```

</TabItem></Tabs>

---

### `minecraft:horse.jump_strength`

<Usable type="all"/> <Version add="1.2.0" tooltip="无法确定具体加入版本。"/> <br/>

决定马或驴一类实体生成时的跳跃强度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:horse.jump_strength"/>：根对象。
  - <DataType type="float" name="value"/>：（写法 1）固定的跳跃强度。
  - <DataType type="object" name="value"/>：（写法 2）在区间内随机取值。
    - <DataType type="float" name="range_min"/>：区间下限。
    - <DataType type="float" name="range_max"/>：区间上限。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；参数结构取自 MS Learn 与上述原版用例。

</TabItem><TabItem value="示例" label="示例">

驴（<FileType type="file" name="donkey.json"/>）：固定为`0.5`。

```json showLineNumbers
"minecraft:horse.jump_strength": {
    "value": 0.5
}
```

骷髅马（<FileType type="file" name="skeleton_horse.json"/>）：在`0.4`至`1.0`之间随机。

```json showLineNumbers
"minecraft:horse.jump_strength": {
    "value": {
        "range_min": 0.4,
        "range_max": 1.0
    }
}
```

</TabItem></Tabs>

---

### `minecraft:hurt_on_condition`

<Usable type="all"/> <Version add="1.13.0"/> <br/>

定义一组条件，实体满足条件时持续受到伤害。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:hurt_on_condition"/>：根对象。
  - <DataType type="array" name="damage_conditions"/>：伤害条件列表，每刻按顺序求值。
    - <DataType type="object"/>：一项条件。
      - <DataType type="string" name="cause"/>：造成的伤害类型，如`lava`、`fall`、`entity_attack`、`magma`、`temperature`、`all`，完整列表见[伤害类型](https://zh.minecraft.wiki/w/伤害类型#基岩版)；无效值按`none`处理。默认值为`none`。
      - <DataType type="float" name="damage_per_tick"/>：满足条件时每刻造成的伤害。默认值为`0`。
      - <DataType type="object" name="filters"/>：触发伤害所需的条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：处于熔岩中时每刻受 4 点伤害。

```json showLineNumbers
"minecraft:hurt_on_condition": {
    "damage_conditions": [
        {
            "cause": "lava",
            "damage_per_tick": 4,
            "filters": {
                "subject": "self",
                "test": "in_lava"
            }
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:ignore_cannot_be_attacked`

<Usable type="all"/> <Version add="1.21.50"/> <br/>

允许拥有者实体忽略满足过滤器条件的实体身上的[`minecraft:cannot_be_attacked`](./components#minecraftcannot_be_attacked)组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:ignore_cannot_be_attacked"/>：根对象。
  - <DataType type="object" name="filters"/>：可以照常攻击的实体条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:ignore_cannot_be_attacked": {
    "filters": {
        "test": "is_family",
        "subject": "other",
        "value": "player"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:input_ground_controlled`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

当被配置为可骑乘实体时，该实体将使用 WASD 控制。默认的自动跨越高度从 1.19.50 起调整为`1.0`。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:input_ground_controlled"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：

```json showLineNumbers
"minecraft:input_ground_controlled": {}
```

</TabItem></Tabs>

---

### `minecraft:inside_block_notifier`

<Usable type="all"/> <Version add="1.16.100"/> <br/>

检测实体是否位于所列方块之内，在进入与离开时触发事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:inside_block_notifier"/>：根对象。
  - <DataType type="array" name="block_list"/>：要监测的方块列表。
    - <DataType type="object"/>：一项。
      - <DataType type="object" name="block"/>：方块及其状态。
        - <DataType type="string" name="name"/>：方块 ID。
        - <DataType type="object" name="states"/>：需要匹配的方块状态，键为状态名、值为该状态的取值。
      - <DataType type="object" name="entered_block_event"/>：进入该方块时触发的事件。
        - <DataType type="string" name="event"/>：事件 ID。
        - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
      - <DataType type="object" name="exited_block_event"/>：离开该方块时触发的事件，结构同上。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；参数结构取自 26.60 官方文档与上述原版用例。

</TabItem><TabItem value="示例" label="示例">

船（<FileType type="file" name="boat.json"/>）：进入向下拖拽的气泡柱时触发事件。

```json showLineNumbers
"minecraft:inside_block_notifier": {
    "block_list": [
        {
            "block": {
                "name": "minecraft:bubble_column",
                "states": {
                    "drag_down": true
                }
            },
            "entered_block_event": {
                "event": "minecraft:entered_bubble_column_down",
                "target": "self"
            },
            "exited_block_event": {
                "event": "minecraft:exited_bubble_column",
                "target": "self"
            }
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:insomnia`

<Usable type="all"/> <Version add="1.6.0"/> <br/>

添加一个自上次休息以来的计时器，用于判断是否应生成幻翼。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:insomnia"/>：根对象。
  - <DataType type="float" name="days_until_insomnia"/>：开始出现失眠效果前需要保持清醒的天数。默认值为`3`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

玩家（<FileType type="file" name="player.json"/>）：

```json showLineNumbers
"minecraft:insomnia": {
    "days_until_insomnia": 3
}
```

</TabItem></Tabs>

---

### `minecraft:instant_despawn`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

立即移除该实体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:instant_despawn"/>：根对象。
  - <DataType type="boolean" name="remove_child_entities"/>：为`true`时，一并移除与该实体存在子级关系（如被拴住）的实体。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铜傀儡（<FileType type="file" name="copper_golem.json"/>）：

```json showLineNumbers
"minecraft:instant_despawn": {}
```

</TabItem></Tabs>

---

### `minecraft:interact`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体可交互。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:interact"/>：根对象。
  - <DataType type="array" name="interactions"/>：交互项列表，同一次交互只会命中其中一项。默认值为空数组。
    - <DataType type="object"/>：一项交互。
      - <DataType type="object" name="add_items"/>：交互后添加到实体物品栏的物品。
        - <DataType type="string" name="table"/>：战利品表路径，相对于行为包根目录。
      - <DataType type="boolean" name="admire"/>：为`true`时玩家交互后会原地注视该实体，类似看向展示框。默认值为`false`。
      - <DataType type="boolean" name="barter"/>：为`true`时按以物易物处理，类似与猪灵交换。默认值为`false`。
      - <DataType type="float" name="cooldown"/>：交互冷却的秒数。默认值为`0`。
      - <DataType type="float" name="cooldown_after_being_attacked"/>：被攻击后多少秒内不可交互。默认值为`0`。
      - <DataType type="string" name="drop_item_slot"/>：取走装备时从哪个槽位掉落，可写整数字符串（如`"0"`）表示物品栏槽位，也可写`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`、`slot.weapon.mainhand`、`slot.weapon.offhand`。
      - <DataType type="float" name="drop_item_y_offset"/>：掉落物品的垂直偏移，单位为方块。默认值为`0`。
      - <DataType type="string" name="equip_item_slot"/>：交互物品装备到的槽位，可写整数字符串（如`"0"`）表示物品栏槽位，也可写`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`、`slot.weapon.mainhand`、`slot.weapon.offhand`。
      - <DataType type="boolean" name="give_item"/>：为`true`时把玩家手中的物品交给实体。默认值为`false`。
      - <DataType type="int" name="health_amount"/>：交互时恢复的生命值。默认值为`0`。
      - <DataType type="int" name="hurt_item"/>：交互时消耗手持物品的耐久值。默认值为`0`。
      - <DataType type="string" name="interact_text"/>：交互按钮的本地化键，例如`action.interact.saddle`。
      - <DataType type="object" name="on_interact"/>：交互命中该项时触发的事件。
        - <DataType type="string" name="event"/>：事件 ID。
        - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
        - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
      - <DataType type="object" name="particle_on_start"/>：交互开始时播放的粒子。
        - <DataType type="string" name="copper_event"/>：铜制品的处理动作。可选值为`none`、`wax_on`、`wax_off`、`scrape`。
        - <DataType type="boolean" name="particle_offset_towards_interactor"/>：为`true`时粒子朝交互者方向偏移。默认值为`false`。
        - <DataType type="string" name="particle_type"/>：粒子效果名。
        - <DataType type="float" name="particle_y_offset"/>：粒子的垂直偏移。默认值为`0`。
      - <DataType type="string"/><DataType type="array" name="play_sounds"/>：交互时播放的音效事件名，可写单个名称，也可写成名称数组。默认值为空数组。
        - <DataType type="string"/>：一个音效事件名。
      - <DataType type="object" name="repair_entity_item"/>：交互时修复实体已装备的物品。
        - <DataType type="int" name="amount"/>：每次修复的耐久值。默认值为`1`。
        - <DataType type="string" name="slot"/>：要修复的槽位，可写整数字符串（如`"0"`）表示物品栏槽位，也可写`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`、`slot.weapon.mainhand`、`slot.weapon.offhand`。
      - <DataType type="array" name="spawn_entities"/>：交互时生成的实体列表。默认值为空数组。
        - <DataType type="string"/>：实体标识符。
      - <DataType type="object" name="spawn_items"/>：交互时掉落的物品。
        - <DataType type="string" name="table"/>：战利品表路径，相对于行为包根目录。
        - <DataType type="float" name="y_offset"/>：掉落物的垂直偏移，单位为方块。默认值为`1`。
      - <DataType type="boolean" name="swing"/>：为`true`时交互时手臂摆动。默认值为`true`。
      - <DataType type="boolean" name="take_item"/>：为`true`时取走玩家手中的物品。默认值为`false`。
      - <DataType type="string" name="transform_to_item"/>：把玩家的交互物品变成另一个物品。
      - <DataType type="boolean" name="use_item"/>：为`true`时使用玩家手中的物品。默认值为`false`。
      - <DataType type="string" name="vibration"/>：交互产生的振动事件类型。可选值为`none`、`entity_act`、`entity_die`、`entity_interact`、`shear`。
</treeview>

> **备注**：schema 把`play_sounds`定义为字符串数组，原版骆驼写成单个字符串`"saddle"`，两种都能解析。

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：手持鞍且未潜行时把鞍装到 0 号槽位。

```json showLineNumbers
"minecraft:interact": {
    "interactions": [
        {
            "interact_text": "action.interact.saddle",
            "equip_item_slot": "0",
            "on_interact": {
                "filters": {
                    "all_of": [
                        {
                            "test": "has_equipment",
                            "subject": "self",
                            "domain": "inventory",
                            "operator": "not",
                            "value": "saddle"
                        },
                        {
                            "test": "has_equipment",
                            "subject": "other",
                            "domain": "hand",
                            "value": "saddle"
                        },
                        {
                            "test": "is_sneak_held",
                            "subject": "other",
                            "value": false
                        }
                    ]
                }
            },
            "play_sounds": "saddle"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:inventory`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的物品栏属性。

另见：_[EntityInventoryComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityinventorycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:inventory"/>：根对象。
  - <DataType type="string" name="container_type"/>：容器类型。可选值为`none`、`horse`、`minecart_chest`、`chest_boat`、`minecart_hopper`、`hopper`、`inventory`、`container`。默认值为`none`。
  - <DataType type="int" name="inventory_size"/>：容器的槽位数量。默认值为`5`。
  - <DataType type="int" name="additional_slots_per_strength"/>：每多一点力量额外增加的槽位数。默认值为`0`。
  - <DataType type="boolean" name="can_be_siphoned_from"/>：为`true`时，漏斗可以抽取其中的物品。默认值为`false`。
  - <DataType type="boolean" name="private"/>：为`true`时，死亡后不掉落物品栏内容。默认值为`false`。
  - <DataType type="boolean" name="restrict_to_owner"/>：为`true`时，只有主人或实体自身能访问该物品栏。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：使用可骑乘生物的物品栏。

```json showLineNumbers
"minecraft:inventory": {
    "container_type": "horse"
}
```

悦灵（<FileType type="file" name="allay.json"/>）：只有一个槽位。

```json showLineNumbers
"minecraft:inventory": {
    "inventory_size": 1
}
```

</TabItem></Tabs>

---

### `minecraft:is_collidable`

<Usable type="all"/> <Version add="1.21.70"/> <br/>

允许其他生物与该生物发生垂直和水平碰撞。发生碰撞需要双方都带有该组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_collidable"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

船（<FileType type="file" name="boat.json"/>）：

```json showLineNumbers
"minecraft:is_collidable": {}
```

</TabItem></Tabs>

---

### `minecraft:is_dyeable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许对该实体使用染料以改变其颜色。

另见：_[EntityIsDyeableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisdyeablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_dyeable"/>：根对象。
  - <DataType type="string" name="interact_text"/>：触屏操作下可染色时显示的提示文本，填本地化键，如`action.interact.dye`。默认值为空。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：

```json showLineNumbers
"minecraft:is_dyeable": {
    "interact_text": "action.interact.dye"
}
```

</TabItem></Tabs>

---

### `minecraft:is_hidden_when_invisible`

<Usable type="all"/> <Version add="1.12.0"/> <br/>

设置该实体在隐身状态下可以躲避敌对生物。

另见：_[EntityIsHiddenWhenInvisibleComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityishiddenwheninvisiblecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_hidden_when_invisible"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:is_hidden_when_invisible": {}
```

</TabItem></Tabs>

---

### `minecraft:is_illager_captain`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

设置该实体为灾厄队长。

另见：_[EntityIsIllagerCaptainComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisillagercaptaincomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_illager_captain"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

掠夺者（<FileType type="file" name="pillager.json"/>）：

```json showLineNumbers
"minecraft:is_illager_captain": {}
```

</TabItem></Tabs>

---

### `minecraft:is_stackable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许该实体的多个实例之间发生垂直和水平碰撞。发生碰撞需要双方实例都带有该组件。

另见：_[EntityIsStackableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisstackablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_stackable"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

船（<FileType type="file" name="boat.json"/>）：

```json showLineNumbers
"minecraft:is_stackable": {}
```

</TabItem></Tabs>

---

### `minecraft:item_controllable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义骑乘该实体时可用于控制方向的物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:item_controllable"/>：根对象。
  - <DataType type="array" name="control_items"/>：可用于控制该实体的物品列表，也可直接写单个物品 ID。
    - <DataType type="string"/>：物品 ID。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猪（<FileType type="file" name="pig.json"/>）：用胡萝卜钓竿控制。

```json showLineNumbers
"minecraft:item_controllable": {
    "control_items": "carrotOnAStick"
}
```

</TabItem></Tabs>

---

### `minecraft:item_hopper`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

标记该实体为物品漏斗，可拾取并存放物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:item_hopper"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

漏斗矿车（<FileType type="file" name="hopper_minecart.json"/>）：

```json showLineNumbers
"minecraft:item_hopper": {}
```

</TabItem></Tabs>

---

### `minecraft:jump.dynamic`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:movement.skip组件。"/> <br/>

按预设的跳跃数据计算跳跃，普通跳跃与快速跳跃可分别设置。

另见：_[`minecraft:movement.skip`](#minecraftmovementskip)组件_、_[EntityMovementSkipComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementskipcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:jump.dynamic"/>：根对象。
  - <DataType type="object" name="regular_skip_data"/>：普通跳跃使用的数据。
    - <DataType type="float" name="distance_scale"/>：水平速度的乘数。默认值为`1`。
    - <DataType type="float" name="height"/>：起跳时施加的垂直力度。默认值为`0.1`。
    - <DataType type="int" name="jump_delay"/>：两次跳跃之间相隔的刻数。默认值为`30`。
    - <DataType type="int" name="animation_duration"/>：跳跃动画的时长，单位为刻。默认值为`1`。
  - <DataType type="object" name="fast_skip_data"/>：快速跳跃使用的数据，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

兔子（<FileType type="file" name="rabbit.json"/>）：快速跳跃更远、更矮、间隔更短。

```json showLineNumbers
"minecraft:jump.dynamic": {
    "regular_skip_data": {
        "distance_scale": 0.8,
        "height": 0.25,
        "jump_delay": 15,
        "animation_duration": 18
    },
    "fast_skip_data": {
        "distance_scale": 1.75,
        "height": 0.15,
        "jump_delay": 1,
        "animation_duration": 15
    }
}
```

</TabItem></Tabs>

---

### `minecraft:jump.static`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体起跳时的初始垂直速度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:jump.static"/>：根对象。
  - <DataType type="float" name="jump_power"/>：起跳的初始垂直速度。默认值为`0.42`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：使用默认值。

```json showLineNumbers
"minecraft:jump.static": {}
```

</TabItem></Tabs>

---

### `minecraft:knockback_resistance`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体对击退的抗性。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:knockback_resistance"/>：根对象。
  - <DataType type="float" name="value"/>：击退抗性，取值`0.0`-`1.0`，`1.0`表示完全免疫击退。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

盔甲架（<FileType type="file" name="armor_stand.json"/>）：完全免疫击退。

```json showLineNumbers
"minecraft:knockback_resistance": {
    "value": 1.0
}
```

</TabItem></Tabs>

---

### `minecraft:lava_movement`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体在熔岩中的移动速度。

另见：_[EntityLavaMovementComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitylavamovementcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:lava_movement"/>：根对象。
  - <DataType type="float" name="value"/>：熔岩中的移动速度。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

炽足兽（<FileType type="file" name="strider.json"/>）：

```json showLineNumbers
"minecraft:lava_movement": {
    "value": 0.32
}
```

</TabItem></Tabs>

---

### `minecraft:leashable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许该实体被拴绳牵引，并定义被拴住时的行为与事件。

另见：_[EntityLeashableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityleashablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:leashable"/>：根对象。
  - <DataType type="boolean" name="can_be_stolen"/>：为`true`时，其他玩家可以把已被拴住的实体改拴到自己身上。默认值为`true`。
  - <DataType type="boolean" name="can_be_cut"/>：<Version add="1.21.90" inline/> 为`true`时，玩家可以用剪刀剪断拴在该实体上的绳子。默认值为`true`。
  - <DataType type="boolean" name="unleash_on_removal"/>：<Version add="1.26.30" inline/> 为`true`时，组件被移除时自动解开拴绳。默认值为`true`。
  - <DataType type="boolean" name="on_unleash_interact_only"/>：为`true`时，`on_unleash`只在玩家主动交互解开时触发。默认值为`false`。
  - <DataType type="int" name="hard_distance"/>：牵引力开始生效的距离，单位为方块。默认值为`6`。
  - <DataType type="int" name="soft_distance"/>：实体开始寻路靠近拴绳持有者的距离，单位为方块。默认值为`4`。
  - <DataType type="int" name="max_distance"/>：拴绳断裂的距离，单位为方块。默认值为`0`。
  - <DataType type="string"/><DataType type="object" name="on_leash"/>：被拴住时触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
  - <DataType type="string"/><DataType type="object" name="on_unleash"/>：被解开时触发的事件，写法同上。
  - <DataType type="array" name="presets"/>：<Version add="1.21.80" inline/> 按条件生效的牵引配置，取第一条`filter`成立者；全部不成立时用默认配置。其中各项会覆盖上面的同名根字段。
    - <DataType type="object"/>：一项。
      - <DataType type="object" name="filter"/>：生效条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="hard_distance"/>：牵引力开始生效的距离。默认值为`7`。
      - <DataType type="float" name="soft_distance"/>：开始寻路靠近的距离。默认值为`4`。
      - <DataType type="float" name="max_distance"/>：拴绳断裂的距离。默认值为`12`。
      - <DataType type="float" name="rotation_adjustment"/>：<Version add="1.21.90" inline/> `spring_type`为`dampened`或`quad_dampened`时，实体达到平衡时的朝向修正角度。默认值为`0`。
      - <DataType type="string" name="spring_type"/>：<Version add="1.21.90" inline/> 牵引力的弹性类型。可选值为`bouncy`（高弹性，悬空时不会达到平衡）、`dampened`（单弹簧，悬空时可达到平衡并与移动方向对齐）、`quad_dampened`（四向弹簧，悬空时逐渐与拴绳持有者对齐）。默认值为`dampened`。
</treeview>

> **备注**：官方文档将`can_be_stolen`的默认值写作`false`，schema 为`true`，此处按 schema 书写；`hard_distance`、`max_distance`、`soft_distance`在根级与`presets`内的默认值不同，已分别标注。

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：全部取默认值。

```json showLineNumbers
"minecraft:leashable": {}
```

船（<FileType type="file" name="boat.json"/>）：被快乐恶魂拴住时改用四向弹簧，并修正 90 度朝向。

```json showLineNumbers
"minecraft:leashable": {
    "presets": [
        {
            "filter": {
                "subject": "other",
                "test": "is_family",
                "value": "happy_ghast"
            },
            "rotation_adjustment": 90,
            "spring_type": "quad_dampened"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:leashable_to`

<Usable type="all"/> <Version add="1.21.90"/> <br/>

允许玩家把其他实体拴在该实体上、取回已拴上的实体，或用剪刀解开。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:leashable_to"/>：根对象。
  - <DataType type="boolean" name="can_retrieve_from"/>：为`true`时，玩家可以取回拴在该实体上的实体。默认值为`false`。
  - <DataType type="boolean" name="unleash_on_removal"/>：为`true`时，组件被移除后自动解开拴在该实体上的所有实体。默认值为`true`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:leashable_to": {}
```

</TabItem></Tabs>

---

### `minecraft:looked_at`

<Usable type="all"/> <Version add="1.21.40"/> <br/>

定义其他实体注视该实体时的行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:looked_at"/>：根对象。
  - <DataType type="float" name="field_of_view"/>：判定注视所需的视场角宽度，单位为度。默认值为`26`。
  - <DataType type="float" name="search_radius"/>：搜索注视者的最大距离，单位为方块。默认值为`10`。
  - <DataType type="boolean" name="find_players_only"/>：是否只搜索玩家。默认值为`false`。
  - <DataType type="float" name="min_looked_at_duration"/>：需要被连续注视多少秒才算生效。默认值为`0`。
  - <DataType type="boolean" name="scale_fov_by_distance"/>：为`true`时视场角随距离收窄，使视锥在实体处的宽度大致恒定。默认值为`true`。
  - <DataType type="object" name="filters"/>：哪些实体算作注视者。见[实体过滤器](./filters)。
  - <DataType type="string" name="line_of_sight_obstruction_type"/>：判定视线遮挡时使用的方块形状。可选值为`outline`（碰撞轮廓）、`collision`（碰撞箱）、`collision_for_camera`（相机用碰撞箱）。默认值为`collision`。
  - <DataType type="array" name="look_at_locations"/>：被判定为「注视」的躯体部位，至少一处无遮挡即算注视。
    - <DataType type="object"/>：一个部位。
      - <DataType type="string" name="location"/>：部位名。可填`head`、`body`、`feet`。
  - <DataType type="array" name="looked_at_cooldown"/>：检测到注视者后再次检测所需等待的随机秒数区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="string"/><DataType type="object" name="set_target"/>：是否以及如何把注视者设为战斗目标。可选值为`never`（不设置）、`once_and_stop_scanning`（设置一次后停止扫描）、`once_and_keep_scanning`（设置后继续扫描）。默认值为`once_and_stop_scanning`。
  - <DataType type="object" name="looked_at_event"/>：检测到注视者时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="not_looked_at_event"/>：未检测到注视者时触发的事件，结构同上。
</treeview>

> **备注**：`set_target`还接受`true`/`false`，沿用旧版的布尔行为。官方文档把默认值写作`false`，schema 为`once_and_stop_scanning`，此处按 schema 书写。

</TabItem><TabItem value="示例" label="示例">

末影人（<FileType type="file" name="enderman.json"/>）：玩家戴南瓜时不判定为注视。

```json showLineNumbers
"minecraft:looked_at": {
    "search_radius": 64.0,
    "set_target": "once_and_stop_scanning",
    "find_players_only": true,
    "min_looked_at_duration": 0.25,
    "filters": {
        "test": "has_equipment",
        "domain": "head",
        "subject": "other",
        "operator": "not",
        "value": "carved_pumpkin"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:loot`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体死亡时掉落的战利品表。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:loot"/>：根对象。
  - <DataType type="string" name="table"/>：战利品表路径，相对于行为包根目录，如`loot_tables/entities/blaze.json`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

烈焰人（<FileType type="file" name="blaze.json"/>）：

```json showLineNumbers
"minecraft:loot": {
    "table": "loot_tables/entities/blaze.json"
}
```

</TabItem></Tabs>

---

### `minecraft:managed_wandering_trader`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

标记该实体为受管理的流浪商人，使其能够进行交易与随后的消失流程。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:managed_wandering_trader"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

流浪商人（<FileType type="file" name="wandering_trader.json"/>）：

```json showLineNumbers
"minecraft:managed_wandering_trader": {}
```

</TabItem></Tabs>

---

### `minecraft:mob_effect`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

对进入范围内的实体施加状态效果。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:mob_effect"/>：根对象。
  - <DataType type="string" name="mob_effect"/>：施加的状态效果 ID，如`poison`。
  - <DataType type="float" name="effect_range"/>：生效的距离范围，单位为方块。默认值为`0.2`。
  - <DataType type="int"/><DataType type="string" name="effect_time"/>：效果持续的秒数，可填`infinite`表示永久。默认值为`10`。
  - <DataType type="int" name="cooldown_time"/>：两次施加之间的冷却秒数。默认值为`0`。
  - <DataType type="boolean" name="ambient"/>：效果是否按环境效果渲染（如信标、潮涌核心施加的效果）。默认值为`false`。
  - <DataType type="object" name="entity_filter"/>：可以受到该效果影响的实体条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

河豚（<FileType type="file" name="pufferfish.json"/>）：范围内的生物中毒，美西螈不受影响。

```json showLineNumbers
"minecraft:mob_effect": {
    "effect_range": 0.2,
    "effect_time": 10,
    "entity_filter": {
        "any_of": [
            {
                "all_of": [
                    {
                        "subject": "other",
                        "test": "is_family",
                        "value": "mob"
                    },
                    {
                        "test": "is_family",
                        "subject": "other",
                        "operator": "not",
                        "value": "axolotl"
                    }
                ]
            }
        ]
    }
}
```

> **备注**：上例省略了`mob_effect`字段，原版文件中该字段为`poison`。

</TabItem></Tabs>

---

### `minecraft:mob_effect_immunity`

<Usable type="all"/> <Version add="1.21.0"/> <br/>

使实体对指定的状态效果免疫。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:mob_effect_immunity"/>：根对象。
  - <DataType type="array" name="mob_effects"/>：免疫的状态效果 ID 列表。
    - <DataType type="string"/>：状态效果 ID，如`poison`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

鹦鹉螺（<FileType type="file" name="nautilus.json"/>）：免疫中毒。

```json showLineNumbers
"minecraft:mob_effect_immunity": {
    "mob_effects": [ "poison" ]
}
```

</TabItem></Tabs>

---

### `minecraft:movement_sound_distance_offset`

<Usable type="all"/> <Version add="1.21.60"/> <br/>

设置决定下一次移动音效播放距离的偏移量。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement_sound_distance_offset"/>：根对象。
  - <DataType type="float" name="value"/>：偏移系数。数值越大，移动音效播放得越稀疏。默认值为`1.0`。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上参数取自 26.60 官方文档与原版用例。

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:movement_sound_distance_offset": {
    "value": 0.55
}
```

</TabItem></Tabs>

---

### `minecraft:nameable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许该实体被命名，例如使用命名牌。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:nameable"/>：根对象。
  - <DataType type="boolean" name="allow_name_tag_renaming"/>：是否允许用命名牌再次改名。默认值为`true`。
  - <DataType type="boolean" name="always_show"/>：名字是否始终显示。默认值为`false`。
  - <DataType type="object" name="default_trigger"/>：实体被命名时触发的默认事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="array" name="name_actions"/>：特殊名字与对应事件的列表。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="name_filter"/>：触发该事件的名字。
      - <DataType type="object" name="on_named"/>：取到该名字时触发的事件，结构同`default_trigger`。
</treeview>

> **备注**：官方文档把`name_filter`、`on_named`列为根字段，原版则收在`name_actions`数组内，此处按原版结构书写。

</TabItem><TabItem value="示例" label="示例">

卫道士（<FileType type="file" name="vindicator.json"/>）：命名为「Johnny」后转为敌对状态，改名后恢复。

```json showLineNumbers
"minecraft:nameable": {
    "default_trigger": {
        "event": "minecraft:stop_johnny",
        "target": "self"
    },
    "name_actions": [
        {
            "name_filter": "Johnny",
            "on_named": {
                "event": "minecraft:start_johnny",
                "target": "self"
            }
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:npc`

<Usable type="all"/> <Version add="1.16.0"/> <br/>

定义 NPC 实体的数据，包括皮肤列表与界面中头像、选择框的偏移。

另见：_[EntityNpcComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynpccomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:npc"/>：根对象。
  - <DataType type="object" name="npc_data"/>：NPC 的外观与界面数据。
    - <DataType type="object" name="picker_offsets"/>：选择框的偏移。
      - <DataType type="array" name="scale"/>：缩放，写作`[x, y, z]`。
      - <DataType type="array" name="translate"/>：平移，写作`[x, y, z]`。
    - <DataType type="object" name="portrait_offsets"/>：界面头像的偏移，结构同上。
    - <DataType type="array" name="skin_list"/>：可选皮肤列表。
      - <DataType type="object"/>：一项。
        - <DataType type="int" name="variant"/>：皮肤变体编号。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

NPC（<FileType type="file" name="npc.json"/>）：

```json showLineNumbers
"minecraft:npc": {
    "npc_data": {
        "picker_offsets": {
            "scale": [ 1.7, 1.7, 1.7 ],
            "translate": [ 0, 20, 0 ]
        },
        "portrait_offsets": {
            "scale": [ 1.75, 1.75, 1.75 ],
            "translate": [ -7, 50, 0 ]
        },
        "skin_list": [
            { "variant": 0 },
            { "variant": 1 }
        ]
    }
}
```

原版`skin_list`共列出 60 个变体，此处仅保留前两项。

</TabItem></Tabs>

---

### `minecraft:offspring`

<Usable type="all"/> <Version add="1.26.0"/> <br/>

定义实体繁殖时产生后代的方式，包括亲代与后代的对应关系、变异概率与属性继承。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:offspring"/>：根对象。
  - <DataType type="object" name="offspring_pairs"/>：亲代组合与后代的对应关系，键为亲代实体 ID、值为后代实体 ID。
  - <DataType type="object" name="mutation_factor"/>：各项变异的发生概率，取值`0.0`-`1.0`，数值越大越容易变异。
    - <DataType type="float" name="variant"/>：变种发生变异的概率。默认值为`0`。
    - <DataType type="float" name="color"/>：颜色发生变异的概率。默认值为`0`。
    - <DataType type="float" name="extra_variant"/>：额外变种发生变异的概率。默认值为`0`。
  - <DataType type="object" name="property_inheritance"/>：需要从亲代继承、并可能发生变异的实体属性。键为属性名，值写空对象。
  - <DataType type="boolean" name="blend_attributes"/>：为`true`时，后代会混合亲代的属性。默认值为`true`。
  - <DataType type="boolean" name="inherit_tamed"/>：为`true`时，亲代已驯服则后代自动驯服。默认值为`true`。
  - <DataType type="array" name="deny_parents_variant"/>：亲代变种相同时，后代改用随机变种的概率与范围。
    - <DataType type="object"/>：一项。
      - <DataType type="float" name="chance"/>：改用随机变种的概率。默认值为`0`。
      - <DataType type="int" name="min_variant"/>：随机变种范围的下限（含）。默认值为`0`。
      - <DataType type="int" name="max_variant"/>：随机变种范围的上限（含）。默认值为`0`。
  - <DataType type="array" name="parent_centric_attribute_blending"/>：采用父母双亲混合方式的属性列表。
    - <DataType type="string"/>：属性名，如`minecraft:health`。
  - <DataType type="array" name="random_variant_mutation_interval"/>：每次繁殖额外随机变种次数的区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="array" name="random_extra_variant_mutation_interval"/>：每次繁殖额外随机「额外变种」次数的区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
</treeview>

> **备注**：原版中这些值均与亲代相同，青蛙是例外（后代为蝌蚪）。

> **备注**：官方文档把`mutation_factor`写作数组，原版实际为对象，此处按原版；`property_inheritance`在原版正式模板中尚未使用，写法取自官方示例。

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：约`1/1200`的概率变异出不同变种。

```json showLineNumbers
"minecraft:offspring": {
    "offspring_pairs": {
        "minecraft:axolotl": "minecraft:axolotl"
    },
    "mutation_factor": {
        "variant": 0.00083
    }
}
```

</TabItem></Tabs>

---

### `minecraft:on_death`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体死亡时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_death"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：

```json showLineNumbers
"minecraft:on_death": {
    "event": "minecraft:start_death",
    "target": "self"
}
```

</TabItem></Tabs>

---

### `minecraft:on_equipment_changed`

<Usable type="all"/> <Version add="1.26.20"/> <br/>

定义实体的装备槽位中的物品发生变化时触发的事件。仅作用于默认装备槽，不适用于`minecraft:inventory`中的物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_equipment_changed"/>：根对象。
  - <DataType type="array" name="slots"/>：按槽位定义的事件列表。
    - <DataType type="object"/>：一个槽位的定义。
      - <DataType type="string" name="slot"/>：要监听的槽位。可填`slot.weapon.mainhand`、`slot.weapon.offhand`、`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`，写法同[`/replaceitem`](/docs/docs/commands/all_commands#replaceitem)。
      - <DataType type="string" name="on_equip"/>：装备该槽位物品时触发的事件 ID。
      - <DataType type="string" name="on_unequip"/>：卸下该槽位物品时触发的事件 ID。
</treeview>

</TabItem><TabItem value="示例" label="示例">

硫方怪（<FileType type="file" name="sulfur_cube.json"/>）：

```json showLineNumbers
"minecraft:on_equipment_changed": {
    "slots": [
        {
            "slot": "slot.weapon.mainhand",
            "on_equip": "minecraft:on_block_absorbed",
            "on_unequip": "minecraft:on_block_ejected"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:on_friendly_anger`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义附近的同类实体进入愤怒状态时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_friendly_anger"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

熊猫（<FileType type="file" name="panda.json"/>）：

```json showLineNumbers
"minecraft:on_friendly_anger": {
    "event": "minecraft:on_anger",
    "target": "self"
}
```

</TabItem></Tabs>

---

### `minecraft:on_hurt`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体受到伤害时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_hurt"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

烈焰人（<FileType type="file" name="blaze.json"/>）：

```json showLineNumbers
"minecraft:on_hurt": {
    "event": "minecraft:on_hurt_event",
    "target": "self"
}
```

</TabItem></Tabs>

---

### `minecraft:on_hurt_by_player`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体被玩家攻击时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_hurt_by_player"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

烈焰人（<FileType type="file" name="blaze.json"/>）：

```json showLineNumbers
"minecraft:on_hurt_by_player": {
    "event": "minecraft:on_hurt_event",
    "target": "self"
}
```

</TabItem></Tabs>

---

### `minecraft:on_ignite`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体被点燃时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_ignite"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版未使用该组件，以下为最小写法：

```json showLineNumbers
"minecraft:on_ignite": {
    "event": "example:on_ignite"
}
```

</TabItem></Tabs>

---

### `minecraft:on_start_landing`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体开始落地时触发的事件。目前仅末影龙可用。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_start_landing"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：

```json showLineNumbers
"minecraft:on_start_landing": {
    "event": "minecraft:start_land",
    "target": "self"
}
```

</TabItem></Tabs>

---

### `minecraft:on_start_takeoff`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体开始起飞时触发的事件。目前仅末影龙可用。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_start_takeoff"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：

```json showLineNumbers
"minecraft:on_start_takeoff": {
    "event": "minecraft:start_fly",
    "target": "self"
}
```

</TabItem></Tabs>

---

### `minecraft:on_target_acquired`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体获得目标时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_target_acquired"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：

```json showLineNumbers
"minecraft:on_target_acquired": {
    "event": "attacked",
    "target": "self"
}
```

</TabItem></Tabs>

---

### `minecraft:on_target_escape`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体失去目标时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_target_escape"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

苦力怕（<FileType type="file" name="creeper.json"/>）：

```json showLineNumbers
"minecraft:on_target_escape": {
    "event": "minecraft:stop_exploding",
    "target": "self"
}
```

</TabItem></Tabs>

---

### `minecraft:on_wake_with_owner`

<Usable type="all"/> <Version add="1.21.80" tooltip="实际加入版本存疑。"/> <br/>

定义主人与实体一同睡醒后触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_wake_with_owner"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：

```json showLineNumbers
"minecraft:on_wake_with_owner": {
    "event": "minecraft:pet_slept_with_owner",
    "target": "self"
}
```

</TabItem></Tabs>

---

### `minecraft:out_of_control`

<Usable type="all"/> <Version add="1.16.100"/> <br/>

标记实体处于「失控」状态，供其他组件据此改变行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:out_of_control"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

船（<FileType type="file" name="boat.json"/>）：

```json showLineNumbers
"minecraft:out_of_control": {}
```

</TabItem></Tabs>

---

### `minecraft:peek`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的探头行为，以及在此过程中触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:peek"/>：根对象。
  - <DataType type="string"/><DataType type="object" name="on_open"/>：开始探头时触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
  - <DataType type="string"/><DataType type="object" name="on_close"/>：结束探头时触发的事件，写法同上。
  - <DataType type="string"/><DataType type="object" name="on_target_open"/>：实体的目标开始探头时触发的事件，写法同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

潜影贝（<FileType type="file" name="shulker.json"/>）：

```json showLineNumbers
"minecraft:peek": {
    "on_close": {
        "event": "minecraft:on_close"
    },
    "on_open": {
        "event": "minecraft:on_open"
    },
    "on_target_open": {
        "event": "minecraft:on_open"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:persistent`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

标记该实体为持久实体，不会因距离过远而自然消失。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:persistent"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

盔甲架（<FileType type="file" name="armor_stand.json"/>）：

```json showLineNumbers
"minecraft:persistent": {}
```

</TabItem></Tabs>

---

### `minecraft:player.exhaustion`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对玩家可用。"/> <br/>

定义玩家消耗度的当前值与上限。

另见：_[EntityExhaustionComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityexhaustioncomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:player.exhaustion"/>：根对象。
  - <DataType type="float" name="value"/>：初始消耗度。默认值为`0`。
  - <DataType type="float" name="max"/>：消耗度上限。默认值为`20`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

玩家（<FileType type="file" name="player.json"/>）：

```json showLineNumbers
"minecraft:player.exhaustion": {
    "value": 0,
    "max": 20
}
```

</TabItem></Tabs>

---

### `minecraft:player.experience`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对玩家可用。"/> <br/>

定义玩家经验条的当前进度与上限。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:player.experience"/>：根对象。
  - <DataType type="float" name="value"/>：经验条进度，取值`0.0`-`1.0`。默认值为`0`。
  - <DataType type="float" name="max"/>：进度上限。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

玩家（<FileType type="file" name="player.json"/>）：

```json showLineNumbers
"minecraft:player.experience": {
    "value": 0,
    "max": 1
}
```

</TabItem></Tabs>

---

### `minecraft:player.level`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对玩家可用。"/> <br/>

定义玩家的经验等级及其上限。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:player.level"/>：根对象。
  - <DataType type="int" name="value"/>：初始经验等级。默认值为`0`。
  - <DataType type="int" name="max"/>：等级上限。默认值为`24791`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

玩家（<FileType type="file" name="player.json"/>）：

```json showLineNumbers
"minecraft:player.level": {
    "value": 0,
    "max": 24791
}
```

</TabItem></Tabs>

---

### `minecraft:player.saturation`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对玩家可用。"/> <br/>

定义玩家的饱和度及其上限。

另见：_[EntitySaturationComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitysaturationcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:player.saturation"/>：根对象。
  - <DataType type="float" name="value"/>：初始饱和度。默认值为`5`。
  - <DataType type="float" name="max"/>：饱和度上限。默认值为`20`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

玩家（<FileType type="file" name="player.json"/>）：

```json showLineNumbers
"minecraft:player.saturation": {
    "value": 5,
    "max": 20
}
```

</TabItem></Tabs>

---

### `minecraft:preferred_path`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

为寻路设置不同方块的通行代价，使实体倾向于选择特定方块。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:preferred_path"/>：根对象。
  - <DataType type="float" name="default_block_cost"/>：不在偏好列表中的方块的基础代价。默认值为`0`。
  - <DataType type="float" name="jump_cost"/>：向上跳跃一格额外增加的代价。默认值为`0`。
  - <DataType type="int" name="max_fall_blocks"/>：下落多少格以内不计伤害代价。默认值为`3`。
  - <DataType type="array" name="preferred_path_blocks"/>：偏好方块及其代价。
    - <DataType type="object"/>：一组方块。
      - <DataType type="array" name="blocks"/>：属于该组的方块 ID。
        - <DataType type="string"/>：方块 ID。
      - <DataType type="float" name="cost"/>：在该组方块上行走的代价，数值越低越优先。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铁傀儡（<FileType type="file" name="iron_golem.json"/>）：优先走草径，其余方块代价更高。

```json showLineNumbers
"minecraft:preferred_path": {
    "default_block_cost": 1.5,
    "jump_cost": 5,
    "preferred_path_blocks": [
        {
            "blocks": [ "grass_path" ],
            "cost": 0
        },
        {
            "blocks": [
                "cobblestone",
                "stone",
                "granite",
                "polished_granite",
                "diorite"
            ],
            "cost": 0
        }
    ]
}
```

上例中第二组方块的原版列表更长，此处仅保留前几项。

</TabItem></Tabs>

---

### `minecraft:projectile`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的弹射物行为，包括发射、飞行与命中时的处理。

另见：_[EntityProjectileComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityprojectilecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:projectile"/>：根对象。
  - <DataType type="string" name="anchor"/>：生成弹射物时使用的参考点。可选值为`origin`（实体内原点）、`eye_height`（眼睛高度）、`middle`（实体中心）。默认值为`origin`。
  - <DataType type="array" name="offset"/>：相对`anchor`的生成偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
  - <DataType type="float" name="power"/>：发射的初始速度，单位为方块每刻。默认值为`1.3`。
  - <DataType type="float" name="gravity"/>：每刻施加的向下加速度。默认值为`0.05`。
  - <DataType type="float" name="inertia"/>：飞行中每刻保留的速度比例。默认值为`0.99`。
  - <DataType type="float" name="liquid_inertia"/>：在液体中每刻保留的速度比例。默认值为`0.6`。
  - <DataType type="float" name="angle_offset"/>：在射击者瞄准方向之上额外增加的俯仰角，单位为度。默认值为`0`。
  - <DataType type="float" name="uncertainty_base"/>：发射方向的基础散布值。实际散布为`uncertainty_base - 难度等级 × uncertainty_multiplier`。默认值为`0`。
  - <DataType type="float" name="uncertainty_multiplier"/>：每级难度减少的散布量。默认值为`0`。
  - <DataType type="boolean" name="shoot_target"/>：为`true`时瞄准射击者的当前目标。默认值为`true`。
  - <DataType type="boolean" name="homing"/>：为`true`时在飞行中转向追踪目标。默认值为`false`。
  - <DataType type="boolean" name="is_dangerous"/>：为`true`时标记为危险弹射物，影响生物的反应。默认值为`false`。
  - <DataType type="boolean" name="isolated_physics"/>：为`true`时使用独立的弹道物理，不受实体运动影响。默认值为`true`。
  - <DataType type="boolean" name="multiple_targets"/>：为`true`时飞行途中可连续命中多个实体。默认值为`false`。
  - <DataType type="boolean" name="hit_water"/>：为`true`时把水面视作命中面并停下。默认值为`false`。
  - <DataType type="boolean" name="hit_nearest_passenger"/>：为`true`时命中载具后改为命中其上最近的乘客。默认值为`false`。
  - <DataType type="array" name="ignored_entities"/>：弹射物会直接穿过的实体 ID 列表。
    - <DataType type="string"/>：实体 ID。
  - <DataType type="boolean" name="destroy_on_hurt"/>：为`true`时命中后立即移除该弹射物。默认值为`false`。
  - <DataType type="boolean" name="stop_on_hurt"/>：为`true`时命中后把速度清零。默认值为`false`。
  - <DataType type="boolean" name="reflect_on_hurt"/>：为`true`时被击中后转向反弹。默认值为`false`。
  - <DataType type="float" name="reflect_immunity"/>：发射后免疫反弹的秒数。默认值为`0`。
  - <DataType type="boolean" name="crit_particle_on_hurt"/>：为`true`时命中时产生暴击粒子。默认值为`false`。
  - <DataType type="boolean" name="catch_fire"/>：为`true`时点燃命中的目标。默认值为`false`。
  - <DataType type="float" name="on_fire_time"/>：命中后被点燃的实体持续着火的秒数。默认值为`5`。
  - <DataType type="boolean" name="spread_fire"/>：为`true`时，着火的弹射物命中后会把火蔓延到目标身上。默认值为`true`。
  - <DataType type="boolean" name="lightning"/>：为`true`时命中时召唤闪电。默认值为`false`。
  - <DataType type="string" name="should_bounce"/>：是否从实体上弹开。可选值为`no`（不弹开）、`if_invulnerable`（目标免疫伤害时弹开）、`if_no_damage_dealt`（未造成伤害时弹开）。默认值为`no`。
  - <DataType type="string" name="shoot_sound"/>：发射时播放的声音定义 ID。
  - <DataType type="string" name="hit_sound"/>：命中实体时播放的声音定义 ID。
  - <DataType type="string" name="hit_ground_sound"/>：命中方块时播放的声音定义 ID。
  - <DataType type="string" name="particle"/>：命中时生成的原版粒子效果名。默认值为`iconcrack`。
  - <DataType type="int" name="potion_effect"/>：弹射物携带的药水辅助值，通常由投掷物品在运行时设置。默认值为`-1`。
  - <DataType type="float" name="splash_range"/>：药水效果的溅射半径，单位为方块。默认值为`4`。
  - <DataType type="object" name="on_hit"/>：命中时执行的子组件集合。键为子组件名，值为该子组件的配置，多个子组件可同时生效。
    - <DataType type="object" name="arrow_effect"/>：控制命中的效果是否施加给举盾格挡者。
      - <DataType type="boolean" name="apply_effect_to_blocking_targets"/>：为`true`时，效果也会施加给格挡中的目标。默认值为`true`。
    - <DataType type="object" name="catch_fire"/>：点燃命中的目标。
      - <DataType type="boolean" name="fire_affected_by_griefing"/>：为`true`时该点火行为受「生物破坏」游戏规则限制。默认值为`false`。
      - <DataType type="float" name="on_fire_time"/>：目标持续着火的秒数。默认值为`0`。
    - <DataType type="object" name="definition_event"/>：命中时触发实体事件。
      - <DataType type="boolean" name="affect_projectile"/>：为`true`时也对弹射物自身触发事件。默认值为`false`。
      - <DataType type="boolean" name="affect_shooter"/>：为`true`时也对射击者触发事件。默认值为`false`。
      - <DataType type="boolean" name="affect_splash_area"/>：为`true`时对`affect_splash_area`范围内所有实体触发事件。默认值为`false`。
      - <DataType type="boolean" name="affect_target"/>：为`true`时对被命中的目标触发事件。默认值为`false`。
      - <DataType type="object" name="event_trigger"/>：要触发的事件。
        - <DataType type="string" name="event"/>：事件 ID。
        - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](./filters)。
        - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
      - <DataType type="float" name="splash_area"/>：以落点为中心的影响半径，单位为方块。默认值为`0`。
    - <DataType type="object" name="douse_fire"/>：熄灭命中目标身上的火。
    - <DataType type="object" name="freeze_on_hit"/>：在落点生成冰面。
      - <DataType type="string" name="shape"/>：结冰区域的形状。可选值为`cube`（立方体）、`sphere`（球体）。
      - <DataType type="float" name="size"/>：结冰区域的大小，单位为方块。默认值为`1`。
      - <DataType type="boolean" name="snap_to_block"/>：为`true`时把结冰区域对齐到方块网格。默认值为`false`。
    - <DataType type="object" name="grant_xp"/>：在落点生成经验球。
      - <DataType type="int" name="minXP"/>：每个经验球的最少经验值。默认值为`0`。
      - <DataType type="int" name="maxXP"/>：每个经验球的最多经验值。默认值为`0`。
    - <DataType type="object" name="hurt_owner"/>：命中时反过来伤害射击者。
      - <DataType type="float" name="owner_damage"/>：对射击者造成的伤害。默认值为`0`。
      - <DataType type="boolean" name="knockback"/>：为`true`时同时击退射击者。默认值为`false`。
      - <DataType type="boolean" name="ignite"/>：为`true`时点燃射击者。默认值为`false`。
    - <DataType type="object" name="ignite"/>：点燃命中的目标。
    - <DataType type="object" name="impact_damage"/>：命中时造成伤害。
      - <DataType type="object" name="damage"/>：伤害数值的随机区间。
        - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
        - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
      - <DataType type="float" name="power_multiplier"/>：把弹射物的飞行速度乘到伤害上的系数，速度越快伤害越高。默认值为`0`。
      - <DataType type="float" name="min_critical_damage"/>：暴击伤害的下限。默认值为`0`。
      - <DataType type="float" name="max_critical_damage"/>：暴击伤害的上限。默认值为`2147483647`。
      - <DataType type="boolean" name="ceil_pre_critical_damage"/>：为`true`时先把暴击加成前的伤害向上取整。默认值为`false`。
      - <DataType type="boolean" name="knockback"/>：为`true`时对目标施加击退。默认值为`false`。
      - <DataType type="boolean" name="apply_knockback_to_blocking_targets"/>：为`true`时对格挡中的目标也施加击退。默认值为`false`。
      - <DataType type="boolean" name="catch_fire"/>：为`true`时点燃被命中的目标。默认值为`false`。
      - <DataType type="boolean" name="channeling"/>：为`true`时命中会引发引雷效果（雷雨天召唤闪电）。默认值为`false`。
      - <DataType type="boolean" name="destroy_on_hit"/>：为`true`时命中后移除弹射物。默认值为`false`。
      - <DataType type="boolean" name="destroy_on_hit_requires_damage"/>：为`true`时只有实际造成伤害才会移除弹射物。默认值为`true`。
      - <DataType type="boolean" name="set_last_hurt_requires_damage"/>：为`true`时只有实际造成伤害才记录为最近一次伤害来源。默认值为`true`。
      - <DataType type="string" name="difficulty_randomization"/>：按难度调整伤害的方式。可选值为`none`（不调整）、`additive`（叠加）、`multiplicative`（相乘）。
      - <DataType type="string" name="filter"/>：可以受到伤害的实体 ID。只能填单个实体标识符，不支持过滤器条件。
    - <DataType type="object" name="mob_effect"/>：命中时对目标施加状态效果。
      - <DataType type="array" name="effects"/>：要施加的效果列表。默认值为空数组。
        - <DataType type="object"/>：一项效果。
          - <DataType type="string" name="effect"/>：效果 ID。
          - <DataType type="int" name="amplifier"/>：效果等级。默认值为`1`。
          - <DataType type="int"/><DataType type="string" name="durationeasy"/>：简单难度下的持续刻数，也可写 Molang。默认值为`0`。
          - <DataType type="int"/><DataType type="string" name="durationnormal"/>：普通难度下的持续刻数，也可写 Molang。默认值为`0`。
          - <DataType type="int"/><DataType type="string" name="durationhard"/>：困难难度下的持续刻数，也可写 Molang。默认值为`0`。
    - <DataType type="object" name="particle_on_hit"/>：命中时生成粒子。
      - <DataType type="string" name="particle_type"/>：原版粒子效果名。
      - <DataType type="int" name="num_particles"/>：生成的粒子数量。默认值为`1`。
      - <DataType type="boolean" name="on_entity_hit"/>：为`true`时命中实体才生成。默认值为`false`。
      - <DataType type="boolean" name="on_other_hit"/>：为`true`时命中方块等其他目标才生成。默认值为`false`。
      - <DataType type="object" name="particle_item_name"/>：按物品生成粒子时使用的物品，结构与物品描述符相同。
    - <DataType type="object" name="remove_on_hit"/>：命中后立即移除弹射物。
    - <DataType type="object" name="spawn_aoe_cloud"/>：在落点生成药水云。
      - <DataType type="float" name="radius"/>：药水云的初始半径，单位为方块。默认值为`0`。
      - <DataType type="float" name="radius_on_use"/>：每次施加效果时半径的变化量。默认值为`-1`。
      - <DataType type="int" name="potion"/>：药水 ID，决定云中施加哪种效果。默认值为`-1`。
      - <DataType type="string" name="particle"/>：药水云使用的原版粒子效果名，填`dragonbreath`时可用玻璃瓶收集龙息。
      - <DataType type="int"/><DataType type="string" name="duration"/>：药水云的持续时间，单位为秒，也可写 Molang。
      - <DataType type="boolean" name="affect_owner"/>：为`true`时射击者也会受效果影响。默认值为`true`。
      - <DataType type="int" name="reapplication_delay"/>：两次施加效果之间的间隔刻数。默认值为`0`。
    - <DataType type="object" name="spawn_chance"/>：命中时按概率生成实体。
      - <DataType type="string" name="spawn_definition"/>：要生成的实体标识符。
      - <DataType type="float" name="first_spawn_chance"/>：第一次生成的概率，取值 0 到 1。默认值为`0`。
      - <DataType type="int" name="first_spawn_count"/>：第一次生成的数量。默认值为`0`。
      - <DataType type="float" name="second_spawn_chance"/>：第二次生成的概率，取值 0 到 1。默认值为`0`。
      - <DataType type="int" name="second_spawn_count"/>：第二次生成的数量。默认值为`0`。
      - <DataType type="boolean" name="spawn_baby"/>：为`true`时生成幼年个体。默认值为`false`。
      - <DataType type="array" name="on_spawn"/>：生成后对生成实体触发的事件。默认值为空数组。
        - <DataType type="object"/>：一个事件。
          - <DataType type="string" name="event"/>：事件 ID。
          - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](./filters)。
          - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
    - <DataType type="object" name="stick_in_ground"/>：命中地面后插在方块上。
      - <DataType type="float" name="shake_time"/>：插入后晃动的秒数。默认值为`0`。
    - <DataType type="object" name="teleport_owner"/>：把射击者传送到落点。
    - <DataType type="object" name="thrown_potion_effect"/>：套用投掷药水的命中效果。
      - <DataType type="int" name="effect"/>：药水 ID。默认值为`-1`。
    - <DataType type="object" name="wind_burst_on_hit"/>：命中时产生风爆，把周围实体击退。
</treeview>

> `shoot_sound`、`hit_sound`、`hit_ground_sound`的值是`sounds/sound_definitions.json`中定义的声音 ID，例如箭用的`bow.hit`；不是`sounds.json`里的具名音效。填自定义声音时同样要先在`sound_definitions.json`里定义。

> `particle`、`on_hit.particle_on_hit.particle_type`、`on_hit.spawn_aoe_cloud.particle`的值取自原版粒子效果名，例如`iconcrack`、`critical_hit_emitter`、`dragonbreath`，不能直接填自定义粒子效果名。要在弹射物上使用自定义粒子，通常改用`on_hit.definition_event`触发事件，再由实体或脚本播撒粒子。

> `on_hit`下的子组件彼此独立，可以同时写多个，命中时会一起生效。上文按字母顺序列出，实际书写顺序不影响结果。

> `ignite`与`catch_fire`都用于点燃目标，区别是`catch_fire`可配置着火时长，`ignite`没有参数。根级的`catch_fire`是旧写法，新写法建议用`on_hit.catch_fire`。

> 早期资料里还出现过`filter`、`knockback`、`fire_affected_by_griefing`、`semi_random_diff_damage`、`splash_potion`等根级字段，26.60 的 schema 与原版实体包均已不再使用，此处不收录。

> 自定义弹射物建议同时定义`runtime_identifier`，否则可能出现击退方向错误、可用空手打死等异常表现。

</TabItem><TabItem value="示例" label="示例">

箭（<FileType type="file" name="arrow.json"/>）：从眼睛高度发射，命中未造成伤害时弹开，未造成伤害时也可着地插住。

```json showLineNumbers
"minecraft:projectile": {
    "anchor": "eye_height",
    "gravity": 0.05,
    "power": 1.1,
    "hit_sound": "bow.hit",
    "offset": [ 0, -0.1, 0 ],
    "should_bounce": "if_no_damage_dealt",
    "uncertainty_base": 16,
    "uncertainty_multiplier": 4,
    "isolated_physics": false,
    "on_hit": {
        "impact_damage": {
            "damage": { "min": 0, "max": 0 },
            "power_multiplier": 2.0,
            "knockback": true,
            "destroy_on_hit": true
        },
        "stick_in_ground": {
            "shake_time": 0.35
        }
    }
}
```

上例省略了`arrow_effect`与部分字段，`on_hit`中只保留两个子组件。

雪球（<FileType type="file" name="snowball.json"/>）：只对烈焰人造成伤害，命中时爆出雪块粒子并立即移除。

```json showLineNumbers
"minecraft:projectile": {
    "anchor": "eye_height",
    "angle_offset": 0.0,
    "offset": [ 0, -0.1, 0 ],
    "gravity": 0.03,
    "power": 1.5,
    "isolated_physics": false,
    "on_hit": {
        "impact_damage": {
            "apply_knockback_to_blocking_targets": true,
            "damage": { "min": 3, "max": 3 },
            "knockback": true,
            "filter": "blaze"
        },
        "particle_on_hit": {
            "num_particles": 6,
            "on_other_hit": true,
            "on_entity_hit": true,
            "particle_type": "snowballpoof"
        },
        "remove_on_hit": {}
    }
}
```

</TabItem></Tabs>

---

### `minecraft:push_through`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置实体能够挤过其他实体的距离。

另见：_[EntityPushThroughComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitypushthroughcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:push_through"/>：根对象。
  - <DataType type="float" name="value"/>：可挤过的距离，单位为方块。默认值为`0.0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:push_through": {
    "value": 0.0
}
```

</TabItem></Tabs>

---

### `minecraft:raid_trigger`

<Usable type="all"/> <Version add="1.13.0"/> <br/>

尝试在该实体所在位置触发一次袭击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:raid_trigger"/>：根对象。
  - <DataType type="string"/><DataType type="object" name="triggered_event"/>：成功触发袭击时触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
</treeview>

</TabItem><TabItem value="示例" label="示例">

玩家（<FileType type="file" name="player.json"/>）：触发后移除该能力，避免反复触发。

```json showLineNumbers
"minecraft:raid_trigger": {
    "triggered_event": {
        "event": "minecraft:remove_raid_trigger",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:rail_movement`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体在铁轨上的移动，带有该组件的实体只能在铁轨上移动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:rail_movement"/>：根对象。
  - <DataType type="float" name="max_speed"/>：在铁轨上的最大速度。默认值为`0.4`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

箱子矿车（<FileType type="file" name="chest_minecart.json"/>）：使用默认值。

```json showLineNumbers
"minecraft:rail_movement": {}
```

</TabItem></Tabs>

---

### `minecraft:ravager_blocked`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

定义劫掠兽的近战攻击被盾牌挡下时的反应。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:ravager_blocked"/>：根对象。
  - <DataType type="float" name="knockback_strength"/>：挡下攻击的实体所受击退的强度。默认值为`3.0`。
  - <DataType type="array" name="reaction_choices"/>：按权重随机选取的反应列表。
    - <DataType type="object"/>：一项反应。
      - <DataType type="int" name="weight"/>：该反应被选中的权重。
      - <DataType type="object" name="value"/>：反应内容，写事件对象；省略该项表示只产生默认的大幅击退。
        - <DataType type="string" name="event"/>：事件 ID。
        - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

劫掠兽（<FileType type="file" name="ravager.json"/>）：两种反应等概率，一种眩晕、一种仅击退。

```json showLineNumbers
"minecraft:ravager_blocked": {
    "knockback_strength": 3.0,
    "reaction_choices": [
        {
            "weight": 1,
            "value": {
                "event": "minecraft:become_stunned",
                "target": "self"
            }
        },
        {
            "weight": 1
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:reflect_projectiles`

<Usable type="all"/> <Version add="1.26.30"/> <br/>

允许实体把命中的弹射物反射回去。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:reflect_projectiles"/>：根对象。
  - <DataType type="array" name="reflected_projectiles"/>：可被反射的弹射物类型列表。
    - <DataType type="string"/>：弹射物实体 ID，如`arrow`。
  - <DataType type="string" name="azimuth_angle"/>：反射方向上额外增加的水平角，填返回度数的 Molang 表达式。默认值为`0`。
  - <DataType type="string" name="elevation_angle"/>：反射方向上额外增加的俯仰角，填返回度数的 Molang 表达式。默认值为`0`。
  - <DataType type="string" name="reflection_scale"/>：反射后速度的缩放比例，填 Molang 表达式。默认值为`1`。
  - <DataType type="string" name="reflection_sound"/>：反射时播放的音效事件名。默认值为`reflect`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：把多数弹射物以一半速度、随机偏转的方位反射回去。

```json showLineNumbers
"minecraft:reflect_projectiles": {
    "azimuth_angle": "180.0 + Math.random(-20.0, 20.0)",
    "reflected_projectiles": [
        "arrow",
        "snowball",
        "egg",
        "fireball",
        "splash_potion",
        "ender_pearl"
    ],
    "reflection_scale": "0.5"
}
```

上例的`reflected_projectiles`在原版中列出 17 项，此处仅保留前几项。

</TabItem></Tabs>

---

### `minecraft:remove_in_peaceful`

<Usable type="all"/> <Version add="1.21.90"/> <br/>

表示该实体不允许在「和平」难度下存在。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:remove_in_peaceful"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

烈焰人（<FileType type="file" name="blaze.json"/>）：

```json showLineNumbers
"minecraft:remove_in_peaceful": {}
```

官方示例取自 bedrock-samples 的 preview 分支，26.60 模板中的`blaze.json`尚未包含该组件。

</TabItem></Tabs>

---

### `minecraft:renders_when_invisible`

<Usable type="all"/> <Version add="1.21.60"/> <br/>

设置后，实体即使在隐身状态下也会渲染。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:renders_when_invisible"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

洞穴蜘蛛（<FileType type="file" name="cave_spider.json"/>）：

```json showLineNumbers
"minecraft:renders_when_invisible": {}
```

</TabItem></Tabs>

---

### `minecraft:rideable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体为可骑乘的实体，包括可骑乘的实体类型与座位分布。

另见：_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:rideable"/>：根对象。
  - <DataType type="array" name="family_types"/>：允许骑乘该实体的实体列表。
    - <DataType type="string"/>：实体 ID 或家族名，如`player`。
  - <DataType type="int" name="seat_count"/>：可同时骑乘的实体数量。默认值为`1`。
  - <DataType type="int" name="controlling_seat"/>：作为驾驶位的座位序号。默认值为`0`。
  - <DataType type="string" name="interact_text"/>：触屏操作下可骑乘时显示的提示文本，填本地化键。
  - <DataType type="boolean" name="crouching_skip_interact"/>：为`true`时，潜行状态下的实体无法与它交互。默认值为`true`。
  - <DataType type="boolean" name="rider_can_interact"/>：为`true`时，骑乘者看向该实体即可选中它。默认值为`false`。
  - <DataType type="boolean" name="pull_in_entities"/>：为`true`时，符合`family_types`的实体会被拉入空座位。默认值为`false`。
  - <DataType type="float" name="passenger_max_width"/>：可成为骑乘者的实体最大宽度，`0`表示不限。默认值为`0`。
  - <DataType type="string" name="dismount_mode"/>：骑乘者下马时的落点。可选值为`default`（默认方式）、`on_top_center`（落在实体顶部中心）、`look_direction`（落在骑乘者视线方向）。默认值为`default`。
  - <DataType type="string"/><DataType type="object" name="on_rider_enter_event"/>：有实体开始骑乘时在该实体身上触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
  - <DataType type="string"/><DataType type="object" name="on_rider_exit_event"/>：有实体停止骑乘时触发的事件，写法同上。
  - <DataType type="array" name="seats"/>：座位列表。
    - <DataType type="object"/>：一个座位。
      - <DataType type="array" name="position"/>：座位相对实体位置的偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
      - <DataType type="int" name="min_rider_count"/>：该座位生效所需的最少骑乘者数量。默认值为`0`。
      - <DataType type="int" name="max_rider_count"/>：该座位允许的最多骑乘者数量。默认值为`0`。
      - <DataType type="float" name="lock_rider_rotation"/>：骑乘者在此座位上可转动的角度上限，单位为度；省略则不受限。默认值为`181`。
      - <DataType type="string" name="rotate_rider_by"/>：骑乘者的朝向偏移，填 Molang 表达式。默认值为`0`。
</treeview>

> **备注**：`priority`字段在官方文档中标注为旧数据遗留、当前不生效，故未列出。

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：两个座位，前后各一。

```json showLineNumbers
"minecraft:rideable": {
    "seat_count": 2,
    "crouching_skip_interact": true,
    "pull_in_entities": true,
    "family_types": [ "player" ],
    "interact_text": "action.interact.ride.horse",
    "seats": [
        {
            "min_rider_count": 0,
            "max_rider_count": 2,
            "position": [ 0.0, 1.905, 0.5 ]
        },
        {
            "min_rider_count": 1,
            "max_rider_count": 2,
            "position": [ 0.0, 1.905, -0.5 ]
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:rotation_axis_aligned`

<Usable type="all"/> <Version add="1.21.100" tooltip="在更旧的版本下使用minecraft:body_rotation_axis_aligned组件。"/> <br/>

使实体根据自身朝向自动旋转，使其对齐到最近的坐标轴方向。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:rotation_axis_aligned"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

快乐恶魂（<FileType type="file" name="happy_ghast.json"/>）：

```json showLineNumbers
"minecraft:rotation_axis_aligned": {}
```

</TabItem></Tabs>

---

### `minecraft:rotation_locked_to_vehicle`

<Usable type="all"/> <Version add="1.21.130"/> <br/>

使实体的朝向与其载具的朝向保持一致。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:rotation_locked_to_vehicle"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

溺尸（<FileType type="file" name="drowned.json"/>）：

```json showLineNumbers
"minecraft:rotation_locked_to_vehicle": {}
```

</TabItem></Tabs>

---

### `minecraft:scale`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置实体的视觉尺寸倍率。

另见：_[EntityScaleComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityscalecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:scale"/>：根对象。
  - <DataType type="float" name="value"/>：尺寸倍率，`1.0`表示使用定义中的原始尺寸。默认值为`1.0`。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上参数取自 26.60 官方文档。

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：缩小为原始尺寸的`0.6`倍。

```json showLineNumbers
"minecraft:scale": {
    "value": 0.6
}
```

</TabItem></Tabs>

---

### `minecraft:scale_by_age`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体根据年龄在幼年与成年尺寸之间插值。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:scale_by_age"/>：根对象。
  - <DataType type="float" name="start_scale"/>：刚出生时的尺寸倍率。默认值为`1`。
  - <DataType type="float" name="end_scale"/>：完全成年后的尺寸倍率。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:scale_by_age": {
    "start_scale": 0.5,
    "end_scale": 1.0
}
```

</TabItem></Tabs>

---

### `minecraft:scheduler`

<Usable type="all"/> <Version add="1.10.0"/> <br/>

按一天中的时间段触发预定事件，用于让生物在昼夜之间切换行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:scheduler"/>：根对象。
  - <DataType type="array" name="scheduled_events"/>：预定事件列表，按顺序取第一条条件成立者。
    - <DataType type="object"/>：一项。
      - <DataType type="object" name="filters"/>：该事件生效的条件。见[实体过滤器](./filters)。
      - <DataType type="string"/><DataType type="object" name="event"/>：条件成立时触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
  - <DataType type="int" name="min_delay_secs"/>：两次检查之间的最短间隔，单位为秒。默认值为`0`。
  - <DataType type="int" name="max_delay_secs"/>：两次检查之间的最长间隔，单位为秒。默认值为`0`。
</treeview>

> **备注**：官方文档只列出`scheduled_events`，`min_delay_secs`与`max_delay_secs`按原版用例补充。

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：白天与夜晚切换不同的环境事件。

```json showLineNumbers
"minecraft:scheduler": {
    "min_delay_secs": 0,
    "max_delay_secs": 0,
    "scheduled_events": [
        {
            "filters": { "test": "is_sleeping", "value": true },
            "event": "minecraft:ambient_sleep"
        },
        {
            "filters": {
                "all_of": [
                    { "test": "is_daytime", "value": false },
                    {
                        "test": "distance_to_nearest_player",
                        "operator": ">",
                        "value": 16
                    }
                ]
            },
            "event": "minecraft:ambient_night"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:shareables`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体想要收集与分享的物品，以及各类物品的数量上限与优先级。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:shareables"/>：根对象。
  - <DataType type="array" name="items"/>：实体感兴趣的物品列表，按`priority`决定取用顺序。
    - <DataType type="object"/>：一种物品。
      - <DataType type="object" name="item"/>：物品描述符，可写物品 ID 并带数据值。
      - <DataType type="int" name="priority"/>：该物品在列表中的优先级，`0`最高。默认值为`0`。
      - <DataType type="int" name="want_amount"/>：希望分享的数量，`-1`表示不限。默认值为`-1`。
      - <DataType type="int" name="surplus_amount"/>：视为多余、可以分享给其他实体的数量，`-1`表示不限。默认值为`-1`。
      - <DataType type="int" name="max_amount"/>：该物品的最大持有数量，`-1`表示不限。默认值为`-1`。
      - <DataType type="int" name="pickup_limit"/>：单个目标刻内最多拾取的数量，`-1`表示不限。默认值为`-1`。
      - <DataType type="boolean" name="pickup_only"/>：为`true`时只捡起、不会丢下。默认值为`false`。
      - <DataType type="boolean" name="stored_in_inventory"/>：为`true`时拾取后放入物品栏。默认值为`false`。
      - <DataType type="boolean" name="consume_item"/>：为`true`时会被实体吃掉。默认值为`false`。
      - <DataType type="boolean" name="admire"/>：为`true`时拾取后会拿起来端详。默认值为`false`。
      - <DataType type="boolean" name="barter"/>：为`true`时拾取后会用于以物易物，需要配合[`minecraft:barter`](./components#minecraftbarter)组件。默认值为`false`。
      - <DataType type="string" name="craft_into"/>：拾取后用于合成的目标物品 ID。
  - <DataType type="boolean" name="singular_pickup"/>：为`true`时，同类物品只捡起一个。默认值为`false`。
  - <DataType type="boolean" name="all_items"/>：为`true`时把其余所有物品作为兜底类别，该类别优先级总是最低。默认值为`false`。
  - <DataType type="int" name="all_items_want_amount"/>：兜底类别希望分享的数量，`-1`表示不限。默认值为`-1`。
  - <DataType type="int" name="all_items_surplus_amount"/>：兜底类别视为多余的数量，`-1`表示不限。默认值为`-1`。
  - <DataType type="int" name="all_items_max_amount"/>：兜底类别的最大持有数量，`-1`表示不限。默认值为`-1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

溺尸（<FileType type="file" name="drowned.json"/>）：三叉戟优先，其次鹦鹉螺壳，原版列表更长。

```json showLineNumbers
"minecraft:shareables": {
    "items": [
        {
            "item": "minecraft:trident",
            "priority": 0,
            "surplus_amount": 1,
            "want_amount": 1
        },
        {
            "item": "minecraft:nautilus_shell",
            "priority": 1,
            "surplus_amount": 1,
            "want_amount": 1
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:shooter`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的远程攻击行为，供[`minecraft:behavior.ranged_attack`](./components#minecraftbehaviorranged_attack)等行为决定发射哪一种弹射物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:shooter"/>：根对象。
  - <DataType type="string" name="def"/>：默认弹射物使用的实体定义 ID，如`minecraft:arrow`。
  - <DataType type="int" name="aux_val"/>：默认弹射物携带的药水效果辅助值。默认值为`-1`。
  - <DataType type="float" name="power"/>：弹射物的发射速度。默认值为`0`，此时由弹射物自身的`power`决定。
  - <DataType type="boolean" name="magic"/>：为`true`时把弹射物标记为魔法伤害。默认值为`false`。
  - <DataType type="string" name="sound"/>：发射时播放的音效事件名。
  - <DataType type="array" name="projectiles"/>：可选的弹射物列表，按顺序取第一条条件成立者。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="def"/>：该弹射物的实体定义 ID。
      - <DataType type="int" name="aux_val"/>：该弹射物携带的药水效果辅助值。默认值为`-1`。
      - <DataType type="object" name="filters"/>：选择该弹射物的条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：发射带药水效果的箭。

```json showLineNumbers
"minecraft:shooter": {
    "aux_val": 26,
    "def": "minecraft:arrow",
    "sound": "bow"
}
```

女巫（<FileType type="file" name="witch.json"/>）：按条件挑选不同的喷溅药水。

```json showLineNumbers
"minecraft:shooter": {
    "projectiles": [
        {
            "aux_val": 21,
            "def": "minecraft:splash_potion",
            "filters": {
                "all_of": [
                    { "subject": "other", "test": "is_raider", "value": true },
                    { "operator": "<=", "test": "actor_health", "subject": "other", "value": 4 }
                ]
            }
        }
    ]
}
```

上例只保留原版列表中的第一项。

</TabItem></Tabs>

---

### `minecraft:sittable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的「坐下」状态，以及进入与退出该状态时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:sittable"/>：根对象。
  - <DataType type="string"/><DataType type="object" name="sit_event"/>：进入坐下状态时触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
  - <DataType type="string"/><DataType type="object" name="stand_event"/>：退出坐下状态时触发的事件，写法同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：全部取默认值。

```json showLineNumbers
"minecraft:sittable": {}
```

</TabItem></Tabs>

---

### `minecraft:sound_volume`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置实体音效的基础音量。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:sound_volume"/>：根对象。
  - <DataType type="float" name="value"/>：音效音量。默认值为`1.0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:sound_volume": {
    "value": 1.0
}
```

</TabItem></Tabs>

---

### `minecraft:spawn_egg_interaction`

<Usable type="all"/> <Version add="1.26.0"/> <br/>

允许用该实体自己的刷怪蛋与其交互，生成一只幼年个体。交互时会在实体身上触发`minecraft:entity_born`事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:spawn_egg_interaction"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：

```json showLineNumbers
"minecraft:spawn_egg_interaction": {}
```

</TabItem></Tabs>

---

### `minecraft:spawn_entity`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

添加一个计时器，到时后在实体位置生成另一个实体或掉落物品，原版鸡下蛋即使用该组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:spawn_entity"/>：根对象。
  - <DataType type="array"/><DataType type="object" name="entities"/>：生成规则。可写单个对象，也可写成对象数组，各项独立计时。
    - <DataType type="object"/>：一条规则。
      - <DataType type="int" name="min_wait_time"/>：生成前随机等待的最短时间，单位为秒。默认值为`300`。
      - <DataType type="int" name="max_wait_time"/>：生成前随机等待的最长时间，单位为秒。默认值为`600`。
      - <DataType type="string" name="spawn_entity"/>：要生成的实体 ID；留空时改为生成`spawn_item`指定的物品。
      - <DataType type="string" name="spawn_item"/>：要生成的物品 ID。默认值为`egg`。
      - <DataType type="int" name="num_to_spawn"/>：每次生成的实体数量。默认值为`1`。
      - <DataType type="boolean" name="should_leash"/>：为`true`时，生成的实体会拴在该实体上。默认值为`false`。
      - <DataType type="boolean" name="single_use"/>：为`true`时只生成一次。默认值为`false`。
      - <DataType type="string" name="spawn_method"/>：生成方式。可选值为`born`、`spawned`、`summoned`。默认值为`born`。
      - <DataType type="string" name="spawn_event"/>：生成时在新生实体身上触发的事件。默认值为`minecraft:entity_born`。
      - <DataType type="string"/><DataType type="object" name="spawn_item_event"/>：生成物品时在该实体身上触发的事件。
      - <DataType type="string" name="spawn_sound"/>：生成时播放的音效。默认值为`plop`。
      - <DataType type="object" name="filters"/>：允许生成的条件。见[实体过滤器](./filters)。
</treeview>

> **备注**：官方文档把各字段直接写在组件对象下，原版则统一包在`entities`中，此处按原版结构书写。

</TabItem><TabItem value="示例" label="示例">

鸡（<FileType type="file" name="chicken.json"/>）：每 5 至 10 分钟下一次蛋，且只在没有骑乘者时生成。

```json showLineNumbers
"minecraft:spawn_entity": {
    "entities": [
        {
            "min_wait_time": 300,
            "max_wait_time": 600,
            "spawn_sound": "plop",
            "spawn_item": "egg",
            "filters": {
                "test": "rider_count",
                "subject": "self",
                "operator": "==",
                "value": 0
            }
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:spawn_on_death`

<Usable type="all"/> <Version add="1.26.20"/> <br/>

在实体死亡时生成其他实体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:spawn_on_death"/>：根对象。
  - <DataType type="string" name="entity_to_spawn"/>：要生成的实体 ID，省略时生成该实体自身。默认值为`self`。
  - <DataType type="int" name="spawn_amount"/>：生成的实体数量。默认值为`1`。
  - <DataType type="object" name="additional_spawn_range"/>：在`spawn_amount`之上额外随机生成的数量区间，`min`与`max`默认均为`0`。
  - <DataType type="string" name="spawn_method"/>：生成方式。可选值为`born`、`spawned`、`summoned`。默认值为`spawned`。
  - <DataType type="boolean" name="inherit_parent_name"/>：为`true`时，生成的实体继承原实体的名字。默认值为`true`。
  - <DataType type="object" name="filters"/>：允许生成的条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:spawn_on_death": {
    "entity_to_spawn": "minecraft:zombie",
    "spawn_amount": 1
}
```

</TabItem></Tabs>

---

### `minecraft:spell_effects`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

在添加该组件时对实体施加或移除状态效果。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:spell_effects"/>：根对象。
  - <DataType type="array" name="add_effects"/>：要施加的状态效果列表。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="effect"/>：状态效果 ID，如`poison`。
      - <DataType type="float" name="duration"/>：持续秒数，可填`infinite`表示永久。
      - <DataType type="int" name="amplifier"/>：效果等级，从`0`开始。默认值为`0`。
      - <DataType type="boolean" name="display_on_screen_animation"/>：为`true`时在屏幕上播放获得效果的动画。默认值为`false`。
  - <DataType type="array"/><DataType type="string" name="remove_effects"/>：要移除的状态效果 ID，可写单个 ID，也可写成 ID 数组。
</treeview>

> **备注**：官方文档把`remove_effects`写作数组，原版实际可直接写单个字符串，两种写法均有效。

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：施加中毒并移除已有的中毒效果。

```json showLineNumbers
"minecraft:spell_effects": {
    "add_effects": [
        {
            "effect": "poison",
            "duration": 25,
            "display_on_screen_animation": true
        }
    ],
    "remove_effects": "poison"
}
```

</TabItem></Tabs>

---

### `minecraft:strength`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的力量值，例如羊驼可携带的箱子数量。

另见：_[EntityStrengthComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitystrengthcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:strength"/>：根对象。
  - <DataType type="int" name="value"/>：初始力量值。默认值为`1`。
  - <DataType type="int" name="max"/>：力量上限。默认值为`5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

羊驼（<FileType type="file" name="llama.json"/>）：

```json showLineNumbers
"minecraft:strength": {
    "value": 1,
    "max": 5
}
```

</TabItem></Tabs>

---

### `minecraft:suspect_tracking`

<Usable type="all"/> <Version add="1.19.0"/> <br/>

允许实体记住可疑的位置。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:suspect_tracking"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:suspect_tracking": {}
```

</TabItem></Tabs>

---

### `minecraft:tameable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义玩家驯服该实体的规则。

另见：_[EntityTameableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitytameablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:tameable"/>：根对象。
  - <DataType type="array" name="tame_items"/>：可用于驯服的物品列表。
    - <DataType type="string"/>：物品 ID。
    - <DataType type="object"/>：带消耗结果的物品。
      - <DataType type="string" name="item"/>：物品 ID。
      - <DataType type="string" name="result_item"/>：使用后转化成的物品。
  - <DataType type="float" name="probability"/>：每次使用物品成功驯服的概率，取值`0.0`-`1.0`。默认值为`1`。
  - <DataType type="string"/><DataType type="object" name="tame_event"/>：驯服成功时触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：用鱼或鲑鱼驯服，每次三成概率成功。

```json showLineNumbers
"minecraft:tameable": {
    "probability": 0.33,
    "tame_items": [ "fish", "salmon" ],
    "tame_event": {
        "event": "minecraft:on_tame",
        "target": "self"
    }
}
```

鹦鹉螺（<FileType type="file" name="nautilus.json"/>）：用河豚桶驯服后留下水桶。

```json showLineNumbers
"minecraft:tameable": {
    "probability": 0.33,
    "tame_items": [
        {
            "item": "pufferfish_bucket",
            "result_item": "water_bucket:0"
        },
        "pufferfish"
    ],
    "tame_event": {
        "event": "minecraft:on_tame",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:tamemount`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许通过骑乘驯服实体：骑乘与喂食都会改变「脾气」，达到上限后即被驯服。

另见：_[EntityTameMountComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitytamemountcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:tamemount"/>：根对象。
  - <DataType type="int" name="min_temper"/>：初始脾气的最小值。默认值为`0`。
  - <DataType type="int" name="max_temper"/>：脾气的上限，达到即驯服。默认值为`100`。
  - <DataType type="int" name="attempt_temper_mod"/>：每次被骑乘时脾气的增加量。默认值为`5`。
  - <DataType type="array" name="feed_items"/>：可用于喂食的物品列表。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="item"/>：物品 ID。
      - <DataType type="int" name="temper_mod"/>：喂食后脾气的增加量。
  - <DataType type="array" name="auto_reject_items"/>：携带时会拒绝交互的物品列表，结构同`feed_items`。
  - <DataType type="string" name="feed_text"/>：喂食按钮显示的本地化键。
  - <DataType type="string" name="ride_text"/>：骑乘按钮显示的本地化键。
  - <DataType type="string"/><DataType type="object" name="tame_event"/>：驯服成功时触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
</treeview>

</TabItem><TabItem value="示例" label="示例">

驴（<FileType type="file" name="donkey.json"/>）：小麦、糖等每次加 3 点脾气，金胡萝卜与金苹果加 5 点。

```json showLineNumbers
"minecraft:tamemount": {
    "min_temper": 0,
    "max_temper": 100,
    "feed_text": "action.interact.feed",
    "ride_text": "action.interact.mount",
    "feed_items": [
        { "item": "wheat", "temper_mod": 3 },
        { "item": "sugar", "temper_mod": 3 },
        { "item": "apple", "temper_mod": 3 },
        { "item": "carrot", "temper_mod": 3 },
        { "item": "golden_carrot", "temper_mod": 5 }
    ],
    "tame_event": {
        "event": "minecraft:on_tame",
        "target": "self"
    }
}
```

上例的`feed_items`在原版中还有金苹果等项，此处从简。

</TabItem></Tabs>

---

### `minecraft:teleport`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的传送行为，包括随机传送与追逐目标时的传送。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:teleport"/>：根对象。
  - <DataType type="boolean" name="random_teleports"/>：为`true`时允许随机传送。默认值为`true`。
  - <DataType type="float" name="min_random_teleport_time"/>：两次随机传送之间的最短间隔，单位为秒。默认值为`0`。
  - <DataType type="float" name="max_random_teleport_time"/>：两次随机传送之间的最长间隔，单位为秒。默认值为`20`。
  - <DataType type="array" name="random_teleport_cube"/>：随机传送的范围，写作`[x, y, z]`，表示以实体为中心的立方体尺寸。默认值为`[32, 16, 32]`。
  - <DataType type="float" name="target_distance"/>：追逐目标时传送的最大距离，单位为方块。默认值为`16`。
  - <DataType type="float" name="target_teleport_chance"/>：追逐目标时每刻传送的概率。默认值为`1`。
  - <DataType type="float" name="light_teleport_chance"/>：处于光照下时传送概率的修正值。默认值为`0.01`。
  - <DataType type="float" name="dark_teleport_chance"/>：处于黑暗中时传送概率的修正值。默认值为`0.01`。
  - <DataType type="boolean" name="teleports_on_projectile_hit"/>：为`true`时会在被弹射物命中前尝试传送闪避。默认值为`false`。
  - <DataType type="object" name="projectile_filter"/>：哪些弹射物会触发闪避传送。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影人（<FileType type="file" name="enderman.json"/>）：

```json showLineNumbers
"minecraft:teleport": {
    "random_teleports": true,
    "max_random_teleport_time": 30,
    "random_teleport_cube": [ 32, 32, 32 ],
    "target_distance": 16,
    "target_teleport_chance": 0.05,
    "light_teleport_chance": 0.05,
    "teleports_on_projectile_hit": true
}
```

</TabItem></Tabs>

---

### `minecraft:tick_world`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体周围的一块区域持续参与刻更新，即使附近没有玩家。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:tick_world"/>：根对象。
  - <DataType type="float" name="distance_to_players"/>：最近玩家进入该距离后，实体所在区域才按正常规则加载。默认值为`128`。
  - <DataType type="int" name="radius"/>：以实体为中心需要刻更新的区块半径。默认值为`2`。
  - <DataType type="boolean" name="never_despawn"/>：为`true`时即使玩家远离该实体也不会消失。默认值为`true`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:tick_world": {
    "radius": 2,
    "distance_to_players": 128,
    "never_despawn": true
}
```

</TabItem></Tabs>

---

### `minecraft:trade_resupply`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体的交易在补给后重新补满。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:trade_resupply"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：

```json showLineNumbers
"minecraft:trade_resupply": {}
```

</TabItem></Tabs>

---

### `minecraft:trade_table`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体与玩家交易的能力及其使用的交易表。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:trade_table"/>：根对象。
  - <DataType type="string" name="table"/>：交易表路径，相对于行为包根目录，如`trading/armorer_trades.json`。
  - <DataType type="string" name="display_name"/>：交易界面显示名使用的本地化键。
  - <DataType type="boolean" name="new_screen"/>：为`true`时使用新版交易界面。默认值为`false`。
  - <DataType type="boolean" name="persist_trades"/>：为`true`时，实体转换形态后保留已生成的交易。默认值为`false`。
  - <DataType type="boolean" name="convert_trades_economy"/>：实体转换形态时，是否把旧版交易数据转换为经济交易数据。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：盔甲匠的交易表。

```json showLineNumbers
"minecraft:trade_table": {
    "convert_trades_economy": true,
    "display_name": "entity.villager.armor",
    "table": "trading/armorer_trades.json"
}
```

</TabItem></Tabs>

---

### `minecraft:trail`

<Usable type="all"/> <Version add="1.13.0"/> <br/>

在实体身后留下方块轨迹。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:trail"/>：根对象。
  - <DataType type="string" name="block_type"/>：作为轨迹生成的方块 ID。默认值为`air`。
  - <DataType type="array" name="spawn_offset"/>：生成位置相对实体位置的偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
  - <DataType type="int" name="radius"/>：在实体周围多大范围内生成轨迹，`-1`表示只在脚下。默认值为`-1`。
  - <DataType type="array" name="replaceable_blocks"/>：可以被轨迹方块替换的方块列表。留空时可替换任何可被替换的方块。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="force_replace_matched_blocks"/>：为`true`时，即使方块不属于可替换列表也会被替换。默认值为`false`。
  - <DataType type="object" name="spawn_filter"/>：允许生成轨迹的条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

雪傀儡（<FileType type="file" name="snow_golem.json"/>）：只在温度值低于`0.81`的地方留下雪层。

```json showLineNumbers
"minecraft:trail": {
    "block_type": "minecraft:snow_layer",
    "spawn_filter": {
        "operator": "<",
        "test": "is_temperature_value",
        "value": 0.81
    }
}
```

</TabItem></Tabs>

---

### `minecraft:transformation`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

在满足延迟条件后把实体转换为另一个实体，并可指定转换前后要增删的组件组。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:transformation"/>：根对象。
  - <DataType type="string" name="into"/>：转换后的实体定义 ID，可在其后用`<组件组名>`指定要套用的组件组，如`minecraft:zombie<minecraft:as_adult>`。
  - <DataType type="object" name="delay"/>：转换前的延迟设置。
    - <DataType type="float" name="value"/>：固定的延迟秒数。默认值为`0`。
    - <DataType type="float" name="range_min"/>：随机延迟的下限，单位为秒。默认值为`0`。
    - <DataType type="float" name="range_max"/>：随机延迟的上限，单位为秒。默认值为`0`。
    - <DataType type="boolean" name="block_assist_chance"/>：转换是否需要附近有特定方块的概率。默认值为`0`。
    - <DataType type="int" name="block_radius"/>：检查特定方块的半径。默认值为`0`。
    - <DataType type="int" name="block_max"/>：半径内所需的特定方块数量上限。默认值为`0`。
    - <DataType type="float" name="block_chance"/>：半径内存在特定方块时缩短延迟的概率。默认值为`0`。
    - <DataType type="array" name="block_types"/>：作为加速条件的方块列表。
      - <DataType type="string"/>：方块 ID。
  - <DataType type="object" name="add"/>：转换时附加的组件组。
    - <DataType type="array" name="component_groups"/>：要添加的组件组名。
      - <DataType type="string"/>：组件组名。
  - <DataType type="boolean" name="drop_equipment"/>：为`true`时转换时掉落全部装备。默认值为`false`。
  - <DataType type="boolean" name="drop_inventory"/>：为`true`时转换时掉落物品栏中的全部物品。默认值为`false`。
  - <DataType type="boolean" name="preserve_equipment"/>：为`true`时转换后保留装备。默认值为`false`。
  - <DataType type="boolean" name="keep_level"/>：为`true`时保留交易等级。默认值为`false`。
  - <DataType type="boolean" name="keep_owner"/>：为`true`时保留原主人。默认值为`false`。
  - <DataType type="string"/><DataType type="array" name="begin_transform_sound"/>：开始转换时播放的音效事件名。
  - <DataType type="string"/><DataType type="array" name="transformation_sound"/>：转换完成时播放的音效事件名。
</treeview>

> **备注**：官方文档把两个音效字段写作数组，原版实际直接写字符串，两种写法均有效。

</TabItem><TabItem value="示例" label="示例">

尸壳（<FileType type="file" name="husk.json"/>）：15 秒后转换为成年僵尸，并保留装备。

```json showLineNumbers
"minecraft:transformation": {
    "delay": {
        "value": 15
    },
    "preserve_equipment": true,
    "into": "minecraft:zombie<minecraft:as_adult>",
    "transformation_sound": "mob.husk.convert_to_zombie"
}
```

</TabItem></Tabs>

---

### `minecraft:transient`

<Usable type="all"/> <Version add="1.21.40"/> <br/>

标记该实体为临时实体：它不会被保存，所在区块卸载后即永久消失。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:transient"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

浮漂（<FileType type="file" name="fishing_hook.json"/>）：

```json showLineNumbers
"minecraft:transient": {}
```

</TabItem></Tabs>

---

### `minecraft:trust`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

标记该实体已信任玩家，供其他组件据此改变行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:trust"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：

```json showLineNumbers
"minecraft:trust": {}
```

</TabItem></Tabs>

---

### `minecraft:trusting`

<Usable type="all"/> <Version add="1.8.0"/> <br/>

定义玩家通过喂食获得实体信任的规则。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:trusting"/>：根对象。
  - <DataType type="array" name="trust_items"/>：可用于获取信任的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="float" name="probability"/>：每次使用物品成功获得信任的概率，取值`0.0`-`1.0`。默认值为`1`。
  - <DataType type="string"/><DataType type="object" name="trust_event"/>：获得信任时触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
</treeview>

</TabItem><TabItem value="示例" label="示例">

豹猫（<FileType type="file" name="ocelot.json"/>）：喂鱼或鲑鱼，每次三成概率获得信任。

```json showLineNumbers
"minecraft:trusting": {
    "probability": 0.33,
    "trust_items": [ "fish", "salmon" ],
    "trust_event": {
        "event": "minecraft:on_trust",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:underwater_mount_breathing`

<Usable type="all"/> <Version add="1.21.130"/> <br/>

暂停该实体在水下的呼吸消耗，使其长时间潜水也不会窒息。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:underwater_mount_breathing"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

鹦鹉螺（<FileType type="file" name="nautilus.json"/>）：

```json showLineNumbers
"minecraft:underwater_mount_breathing": {}
```

</TabItem></Tabs>

---

### `minecraft:underwater_movement`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体在水中的移动速度。

另见：_[EntityUnderwaterMovementComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityunderwatermovementcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:underwater_movement"/>：根对象。
  - <DataType type="float" name="value"/>：水中的移动速度。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:underwater_movement": {
    "value": 0.2
}
```

</TabItem></Tabs>

---

### `minecraft:uses_legacy_friction`

<Usable type="all"/> <Version add="1.26.20"/> <br/>

启用后，[`minecraft:friction_modifier`](./components#minecraftfriction_modifier)按旧版公式计算摩擦力。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:uses_legacy_friction"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:uses_legacy_friction": {}
```

</TabItem></Tabs>

---

### `minecraft:variable_max_auto_step`

<Usable type="all"/> <Version add="1.19.50"/> <br/>

定义实体可根据所处方块与操控状态变化的自动跨越高度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:variable_max_auto_step"/>：根对象。
  - <DataType type="float" name="base_value"/>：在普通方块上可自动跨越的最大高度。默认值为`0.5625`。
  - <DataType type="float" name="controlled_value"/>：在普通方块上且由玩家操控时可跨越的最大高度。默认值为`0.5625`。
  - <DataType type="float" name="jump_prevented_value"/>：在阻止跳跃的方块上可跨越的最大高度。默认值为`0.5625`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：普通情况下可跨越约 1.5 格，阻止跳跃的方块上仍可跨越半格多。

```json showLineNumbers
"minecraft:variable_max_auto_step": {
    "base_value": 1.5625,
    "controlled_value": 1.5625,
    "jump_prevented_value": 0.5625
}
```

</TabItem></Tabs>

---

### `minecraft:vertical_movement_action`

<Usable type="all"/> <Version add="1.21.110"/> <br/>

当被配置为可骑乘实体时，骑乘者使用跳跃动作即可让实体上升或下降。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:vertical_movement_action"/>：根对象。
  - <DataType type="float" name="vertical_velocity"/>：触发跳跃动作时施加的垂直速度。默认值为`0.5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

快乐恶魂（<FileType type="file" name="happy_ghast.json"/>）：

```json showLineNumbers
"minecraft:vertical_movement_action": {
    "vertical_velocity": 0.5
}
```

</TabItem></Tabs>

---

### `minecraft:vibration_damper`

<Usable type="all"/> <Version add="1.19.0"/> <br/>

使该实体发出的振动不被幽匿传感器一类的检测机制接收。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:vibration_damper"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:vibration_damper": {}
```

</TabItem></Tabs>

---

### `minecraft:vibration_listener`

<Usable type="all"/> <Version add="1.19.0"/> <br/>

使实体能够接收周围的振动事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:vibration_listener"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:vibration_listener": {}
```

</TabItem></Tabs>

---

### `minecraft:walk_animation_speed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置实体行走动画播放速度的倍率。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:walk_animation_speed"/>：根对象。
  - <DataType type="float" name="value"/>：播放速度倍率，数值越大走得越快。默认值为`1.0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:walk_animation_speed": {
    "value": 1.0
}
```

</TabItem></Tabs>

---

### `minecraft:wants_jockey`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

标记该实体希望成为骑乘者，可与`minecraft:behavior.find_mount`等行为配合。

另见：_[EntityWantsJockeyComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitywantsjockeycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:wants_jockey"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:wants_jockey": {}
```

</TabItem></Tabs>

---

### `minecraft:water_movement`

<Usable type="all"/> <Version add="1.12.0"/> <br/>

定义实体在水中的移动阻力。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:water_movement"/>：根对象。
  - <DataType type="float" name="drag_factor"/>：水中移动的阻力系数，数值越大阻力越小。默认值为`0.8`。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，未定义参数；以上参数取自 26.60 官方文档与原版用例。

</TabItem><TabItem value="示例" label="示例">

熊猫（<FileType type="file" name="panda.json"/>）：

```json showLineNumbers
"minecraft:water_movement": {
    "drag_factor": 0.98
}
```

</TabItem></Tabs>

---

### `minecraft:wither_target_highest_damage`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使凋灵优先攻击对其造成伤害最多的生物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:wither_target_highest_damage"/>：根对象。
  - <DataType type="array" name="entity_types"/>：参与比较的实体列表。
    - <DataType type="string"/>：实体 ID。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:wither_target_highest_damage": {
    "entity_types": [ "player" ],
    "priority": 0
}
```

</TabItem></Tabs>

---

---

## 寻路与运动组件

寻路与运动组件规定了实体在拥有一个目标后，会尝试以何种路径到达预定地点。

### `minecraft:movement`

<Usable type="all"/> <Version add="?"/> <br/>

定义实体的基础移动速度。

另见：_[EntityMovementComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement"/>：根对象。
  - <DataType type="float" name="value"/>：移动速度。默认值为`0.0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:movement": {
    "value": 0.1
}
```

</TabItem></Tabs>

---

### `minecraft:movement.amphibious`

<Usable type="all"/> <Version add="?"/> <br/>

定义两栖实体的移动方式，可在水中与陆地上移动。

另见：_[EntityMovementAmphibiousComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementamphibiouscomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.amphibious"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻可转动的最大角度，单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:movement.amphibious": {
    "max_turn": 15.0
}
```

</TabItem></Tabs>

---

### `minecraft:movement.basic`

<Usable type="all"/> <Version add="?"/> <br/>

定义实体在地面上的基础移动方式。

另见：_[EntityMovementBasicComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementbasiccomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.basic"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻可转动的最大角度，单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：使用默认值。

```json showLineNumbers
"minecraft:movement.basic": {}
```

</TabItem></Tabs>

---

### `minecraft:movement.dolphin`

<Usable type="all"/> <Version add="?"/> <br/>

定义海豚一类的水中移动方式。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.dolphin"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻可转动的最大角度，单位为度。默认值为`30`。
</treeview>

> **备注**：官方 schema 将该组件写作`Dynamic value`，参数按同类移动组件整理。

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:movement.dolphin": {}
```

</TabItem></Tabs>

---

### `minecraft:movement.fly`

<Usable type="all"/> <Version add="?"/> <br/>

定义实体的飞行移动方式。

另见：_[EntityMovementFlyComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementflycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.fly"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻可转动的最大角度，单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

鹦鹉（<FileType type="file" name="parrot.json"/>）：使用默认值。

```json showLineNumbers
"minecraft:movement.fly": {}
```

</TabItem></Tabs>

---

### `minecraft:movement.generic`

<Usable type="all"/> <Version add="?"/> <br/>

定义通用移动方式，适用于水生与陆生兼有的实体。

另见：_[EntityMovementGenericComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementgenericcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.generic"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻可转动的最大角度，单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

溺尸（<FileType type="file" name="drowned.json"/>）：使用默认值。

```json showLineNumbers
"minecraft:movement.generic": {}
```

</TabItem></Tabs>

---

### `minecraft:movement.glide`

<Usable type="all"/> <Version add="?"/> <br/>

定义滑翔式移动方式，幻翼使用该组件。

另见：_[EntityMovementGlideComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementglidecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.glide"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻可转动的最大角度，单位为度。默认值为`30`。
  - <DataType type="float" name="speed_when_turning"/>：急转弯时调整到的速度。默认值为`0.2`。
  - <DataType type="float" name="start_speed"/>：开始滑翔时的初速度。默认值为`0.1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

幻翼（<FileType type="file" name="phantom.json"/>）：

```json showLineNumbers
"minecraft:movement.glide": {
    "speed_when_turning": 0.2,
    "start_speed": 0.1
}
```

</TabItem></Tabs>

---

### `minecraft:movement.hover`

<Usable type="all"/> <Version add="?"/> <br/>

定义悬停式移动方式，实体可在原地悬停。

另见：_[EntityMovementHoverComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementhovercomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.hover"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻可转动的最大角度，单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：使用默认值。

```json showLineNumbers
"minecraft:movement.hover": {}
```

</TabItem></Tabs>

---

### `minecraft:movement.jump`

<Usable type="all"/> <Version add="?"/> <br/>

定义跳跃式移动方式，落地后需等待一段时间才能再次起跳。

另见：_[EntityMovementJumpComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementjumpcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.jump"/>：根对象。
  - <DataType type="array" name="jump_delay"/>：落地后再次起跳的延迟区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[0, 0]`。
  - <DataType type="float" name="max_turn"/>：每刻可转动的最大角度，单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

岩浆怪（<FileType type="file" name="magma_cube.json"/>）：落地后随机等待 2 至 6 秒再起跳。

```json showLineNumbers
"minecraft:movement.jump": {
    "jump_delay": [ 2.0, 6.0 ]
}
```

</TabItem></Tabs>

---

### `minecraft:movement.skip`

<Usable type="all"/> <Version add="?"/> <br/>

定义跳跃式移动方式，移动时持续小跳。

另见：_[EntityMovementSkipComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementskipcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.skip"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻可转动的最大角度，单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

兔子（<FileType type="file" name="rabbit.json"/>）：使用默认值。

```json showLineNumbers
"minecraft:movement.skip": {}
```

</TabItem></Tabs>

---

### `minecraft:movement.sway`

<Usable type="all"/> <Version add="?"/> <br/>

定义摇摆式移动方式，实体在移动时左右晃动。

另见：_[EntityMovementSwayComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementswaycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.sway"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻最多转动的角度，单位为度。默认值为`30`。
  - <DataType type="float" name="sway_amplitude"/>：左右摇摆的幅度。默认值为`0.05`。
  - <DataType type="float" name="sway_frequency"/>：摇摆频率的乘数。默认值为`0.5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

远古守卫者（<FileType type="file" name="elder_guardian.json"/>）：全部使用默认值。

```json showLineNumbers
"minecraft:movement.sway": {}
```

</TabItem></Tabs>

---

### `minecraft:navigation.climb`

<Usable type="all"/> <Version add="?"/> <br/>

定义可攀爬实体的寻路方式，能在墙面与方块侧面上下移动。

另见：_[EntityNavigationClimbComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationclimbcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.climb"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./components#minecraftannotationopen_door)等组件。
</treeview>

</TabItem><TabItem value="示例" label="示例">

洞穴蜘蛛（<FileType type="file" name="cave_spider.json"/>）：

```json showLineNumbers
"minecraft:navigation.climb": {
    "can_path_over_water": true
}
```

</TabItem></Tabs>

---

### `minecraft:navigation.float`

<Usable type="all"/> <Version add="?"/> <br/>

定义漂浮实体的寻路方式，如蝙蝠在空中的缓慢移动。

另见：_[EntityNavigationFloatComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationfloatcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.float"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./components#minecraftannotationopen_door)等组件。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蝙蝠（<FileType type="file" name="bat.json"/>）：

```json showLineNumbers
"minecraft:navigation.float": {
    "can_path_over_water": true,
    "using_door_annotation": true
}
```

</TabItem></Tabs>

---

### `minecraft:navigation.fly`

<Usable type="all"/> <Version add="?"/> <br/>

定义飞行实体的寻路方式，可穿越空中与水面。

另见：_[EntityNavigationFlyComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationflycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.fly"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./components#minecraftannotationopen_door)等组件。
</treeview>

</TabItem><TabItem value="示例" label="示例">

鹦鹉（<FileType type="file" name="parrot.json"/>）：

```json showLineNumbers
"minecraft:navigation.fly": {
    "can_path_from_air": true,
    "can_path_over_water": true
}
```

</TabItem></Tabs>

---

### `minecraft:navigation.generic`

<Usable type="all"/> <Version add="?"/> <br/>

定义通用寻路方式，同时具备行走、游泳与攀爬等多种通行能力。

另见：_[EntityNavigationGenericComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationgenericcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.generic"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./components#minecraftannotationopen_door)等组件。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：水陆两栖，且不会在水中下坠。

```json showLineNumbers
"minecraft:navigation.generic": {
    "is_amphibious": true,
    "can_path_over_water": true,
    "can_swim": true,
    "can_walk": true,
    "can_sink": false,
    "avoid_damage_blocks": true
}
```

</TabItem></Tabs>

---

### `minecraft:navigation.hover`

<Usable type="all"/> <Version add="?"/> <br/>

定义悬停实体的寻路方式，如悦灵在空中悬停移动。

另见：_[EntityNavigationHoverComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationhovercomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.hover"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./components#minecraftannotationopen_door)等组件。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:navigation.hover": {
    "avoid_damage_blocks": true,
    "can_pass_doors": false,
    "can_path_from_air": true,
    "avoid_water": true,
    "can_path_over_water": true,
    "can_sink": false
}
```

</TabItem></Tabs>

---

### `minecraft:navigation.swim`

<Usable type="all"/> <Version add="?"/> <br/>

定义水生实体的寻路方式，只能在水中通行。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.swim"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./components#minecraftannotationopen_door)等组件。
</treeview>

> **备注**：原版暂无使用该组件的实体；`using_door_annotation`未收录于官方文档，按同类组件补充。

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该组件的实体，以下为最小写法：

```json showLineNumbers
"minecraft:navigation.swim": {
    "can_swim": true,
    "can_walk": false,
    "can_sink": false
}
```

</TabItem></Tabs>

---

### `minecraft:navigation.walk`

<Usable type="all"/> <Version add="?"/> <br/>

定义陆生实体的寻路方式，可在地面行走并跳过一格高的障碍。

另见：_[EntityNavigationWalkComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationwalkcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.walk"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./components#minecraftannotationopen_door)等组件。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：避开水面与伤害方块，可沿水面寻路。

```json showLineNumbers
"minecraft:navigation.walk": {
    "can_path_over_water": true,
    "avoid_damage_blocks": true,
    "avoid_water": true
}
```

</TabItem></Tabs>

---

---

## AI 意向组件

AI 意向组件（AI Goal Components）规定了实体的 AI，规定 AI 后可以使得实体拥有“想要做什么事情”的能力。

### `minecraft:behavior.admire_item`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:admire_item组件。"/> <br/>

使生物欣赏被标记为可欣赏的物品。

另见：_[`minecraft:admire_item`](#minecraftadmire_item)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.admire_item"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="admire_item_sound"/>：欣赏物品时播放的音效事件名。
  - <DataType type="array" name="sound_interval"/>：两次音效之间随机等待的秒数区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="object" name="on_admire_item_start"/>：开始欣赏物品时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_admire_item_stop"/>：停止欣赏物品时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猪灵（<FileType type="file" name="piglin.json"/>）：

```json showLineNumbers
"minecraft:behavior.admire_item": {
    "priority": 2,
    "admire_item_sound": "admire",
    "sound_interval": { "min": 8.0, "max": 8.0 }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.aquatic_charge_attack`

<Usable type="all"/> <Version add="?"/> <br/>

使水生生物向目标发起冲刺攻击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.aquatic_charge_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="attack_reach"/>：在碰撞箱基础上向外扩张的判定距离，单位为方块。默认值为`0.05`。
  - <DataType type="float" name="charge_speed"/>：冲刺时的绝对速度。默认值为`0.06`。
  - <DataType type="float" name="max_charge_distance"/>：发起冲刺的最大距离，单位为方块。默认值为`16`。
  - <DataType type="float" name="charge_overshoot_distance"/>：冲刺时瞄准目标后方多远的距离。默认值为`1.5`。
  - <DataType type="array" name="charge_cooldown_time"/>：两次冲刺之间随机等待的秒数区间，写作`[最小值, 最大值]`。默认值为`[2, 6]`。
  - <DataType type="float" name="knockback_force"/>：命中时施加给目标的击退力。默认值为`2`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

鹦鹉螺（<FileType type="file" name="nautilus.json"/>）：

```json showLineNumbers
"minecraft:behavior.aquatic_charge_attack": {
    "priority": 3,
    "max_charge_distance": 16,
    "charge_speed": 1.2,
    "knockback_force": 2.0,
    "charge_cooldown_time": { "min": 4.0, "max": 4.0 }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.avoid_block`

<Usable type="all"/> <Version add="?"/> <br/>

使生物避开指定的方块。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.avoid_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="target_blocks"/>：要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="string" name="target_selection_method"/>：方块的搜索方式。可选值为`nearest`（最近）与`random`（随机）。默认值为`nearest`。
  - <DataType type="int" name="search_range"/>：水平方向搜索的最大距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：垂直方向搜索的最大距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="tick_interval"/>：每隔多少刻执行一次该行为。默认值为`1`。
  - <DataType type="float" name="walk_speed_modifier"/>：行走速度的乘数，`1.0`表示维持原速。默认值为`1`。
  - <DataType type="float" name="sprint_speed_modifier"/>：疾跑速度的乘数。默认值为`1`。
  - <DataType type="string" name="avoid_block_sound"/>：避开方块时播放的音效事件名。
  - <DataType type="array" name="sound_interval"/>：两次音效之间随机等待的秒数区间，写作`[最小值, 最大值]`。默认值为`[3, 8]`。
  - <DataType type="array" name="on_escape"/>：成功避开时触发的事件列表。
    - <DataType type="object"/>：一个事件。
      - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

疣猪兽（<FileType type="file" name="hoglin.json"/>）：避开诡异菌与诡异菌索。

```json showLineNumbers
"minecraft:behavior.avoid_block": {
    "priority": 1,
    "tick_interval": 5,
    "search_range": 8,
    "search_height": 4,
    "walk_speed_modifier": 1,
    "sprint_speed_modifier": 1,
    "avoid_block_sound": "retreat",
    "sound_interval": { "min": 2.0, "max": 5.0 },
    "target_selection_method": "nearest",
    "target_blocks": [ "minecraft:warped_fungus", "minecraft:warped_roots" ]
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.avoid_mob_type`

<Usable type="all"/> <Version add="?"/> <br/>

使生物避开特定类型的实体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.avoid_mob_type"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：要避开的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="max_dist"/>：触发躲避的最大距离，单位为方块。
      - <DataType type="float" name="walk_speed_multiplier"/>：躲避时行走速度的乘数。
      - <DataType type="float" name="sprint_speed_multiplier"/>：躲避时疾跑速度的乘数。
      - <DataType type="boolean" name="check_if_outnumbered"/>：是否仅在对方数量占优时躲避。
  - <DataType type="float" name="max_dist"/>：搜索躲避目标的最大距离，单位为方块。默认值为`3`。
  - <DataType type="float" name="max_flee"/>：逃到距目标多远时停止逃跑，单位为方块。默认值为`10`。
  - <DataType type="float" name="sprint_distance"/>：距目标多近时开始疾跑，单位为方块。默认值为`7`。
  - <DataType type="int" name="avoid_target_xz"/>：逃跑目标点在水平方向上的选取范围，单位为方块。默认值为`16`。
  - <DataType type="int" name="avoid_target_y"/>：逃跑目标点在垂直方向上的选取范围，单位为方块。默认值为`7`。
  - <DataType type="boolean" name="ignore_visibility"/>：为`true`时逃跑途中不考虑视线是否被遮挡。默认值为`false`。
  - <DataType type="boolean" name="remove_target"/>：为`true`时逃跑期间清除当前攻击目标。默认值为`false`。
  - <DataType type="float" name="probability_per_strength"/>：按对方力量决定停止躲避的概率。默认值为`1`。
  - <DataType type="float" name="walk_speed_multiplier"/>：行走速度的乘数。默认值为`1`。
  - <DataType type="float" name="sprint_speed_multiplier"/>：疾跑速度的乘数。默认值为`1`。
  - <DataType type="float" name="river_speed_multiplier"/>：沿河流逃跑时的速度乘数。默认值为`0.75`。
  - <DataType type="string" name="avoid_mob_sound"/>：躲避时播放的音效事件名。
  - <DataType type="array" name="sound_interval"/>：两次音效之间随机等待的秒数区间，写作`[最小值, 最大值]`。默认值为`[3, 8]`。
  - <DataType type="object" name="on_escape_event"/>：成功逃脱时触发的事件，结构同其他行为的`event`加`target`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：避开狼。

```json showLineNumbers
"minecraft:behavior.avoid_mob_type": {
    "priority": 4,
    "entity_types": [
        {
            "filters": { "test": "is_family", "subject": "other", "value": "wolf" },
            "max_dist": 6,
            "walk_speed_multiplier": 1.2,
            "sprint_speed_multiplier": 1.2
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.barter`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:barter组件。"/> <br/>

使生物进行以物易物。

另见：_[`minecraft:barter`](#minecraftbarter)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.barter"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猪灵（<FileType type="file" name="piglin.json"/>）：只写优先级，其余取组件默认。

```json showLineNumbers
"minecraft:behavior.barter": {
    "priority": 3
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.beg`

<Usable type="all"/> <Version add="?"/> <br/>

使生物注视并跟随手持其喜爱食物的玩家。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.beg"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="items"/>：该生物喜爱的物品列表。
    - <DataType type="object"/>：一项物品描述符。也可直接写物品 ID 字符串。
      - <DataType type="string" name="name"/>：物品 ID。
  - <DataType type="float" name="look_distance"/>：乞求时可保持的最大距离，单位为方块。默认值为`8`。
  - <DataType type="object" name="look_time"/>：每次注视玩家持续时间的区间，单位为秒。
    - <DataType type="int" name="min"/>：区间下限。默认值为`2`。
    - <DataType type="int" name="max"/>：区间上限。默认值为`4`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狼（<FileType type="file" name="wolf.json"/>）：骨头、生猪排等。

```json showLineNumbers
"minecraft:behavior.beg": {
    "priority": 9,
    "look_distance": 8,
    "look_time": { "min": 20, "max": 40 },
    "items": [
        { "name": "minecraft:bone" },
        { "name": "minecraft:porkchop" }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.break_door`

<Usable type="all"/> <Version add="?"/> <br/>

使生物破坏阻挡其寻路的门，需配合[`minecraft:annotation.break_door`](./components#minecraftannotationbreak_door)组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.break_door"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无单独声明该行为的实体，以下为最小写法：

```json showLineNumbers
"minecraft:behavior.break_door": {
    "priority": 3
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.breed`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:breedable组件。"/> <br/>

使生物寻找同类进行繁殖。

另见：_[`minecraft:breedable`](#minecraftbreedable)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.breed"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：

```json showLineNumbers
"minecraft:behavior.breed": {
    "priority": 2,
    "speed_multiplier": 1.0
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.celebrate`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在触发后进行庆祝，例如袭击者攻下村庄后的欢呼。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.celebrate"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="celebration_sound"/>：庆祝时播放的音效事件名。默认值为`celebrate`。
  - <DataType type="float" name="duration"/>：庆祝持续的秒数。默认值为`30`。
  - <DataType type="array" name="jump_interval"/>：两次跳跃之间随机等待的秒数区间。默认值为`[1, 3.5]`。
  - <DataType type="array" name="sound_interval"/>：两次音效之间随机等待的秒数区间。默认值为`[2, 7]`。
  - <DataType type="object" name="on_celebration_end_event"/>：庆祝结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

> **备注**：区间参数在 schema 中写作`min`与`max`，原版多数写作`range_min`与`range_max`，两种写法均可解析。

</TabItem><TabItem value="示例" label="示例">

唤魔者（<FileType type="file" name="evocation_illager.json"/>）：

```json showLineNumbers
"minecraft:behavior.celebrate": {
    "priority": 5,
    "celebration_sound": "celebrate",
    "duration": 30,
    "jump_interval": { "range_min": 1, "range_max": 3.5 },
    "sound_interval": { "range_min": 2, "range_max": 7 },
    "on_celebration_end_event": {
        "event": "minecraft:stop_celebrating",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.celebrate_survive`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在袭击中存活后进行庆祝，并周期性放出烟花。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.celebrate_survive"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="duration"/>：庆祝持续的秒数。默认值为`30`。
  - <DataType type="array" name="fireworks_interval"/>：两次烟花之间随机等待的秒数区间。默认值为`[10, 20]`。
  - <DataType type="object" name="on_celebration_end_event"/>：庆祝结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：

```json showLineNumbers
"minecraft:behavior.celebrate_survive": {
    "priority": 5,
    "duration": 30,
    "fireworks_interval": { "range_min": 2, "range_max": 7 },
    "on_celebration_end_event": {
        "event": "minecraft:stop_celebrating",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.charge_attack`

<Usable type="all"/> <Version add="?"/> <br/>

使生物向目标发起冲锋，例如恼鬼的突进。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.charge_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="min_distance"/>：距目标小于该距离时不发起冲锋，单位为方块。默认值为`2`。
  - <DataType type="float" name="max_distance"/>：距目标大于该距离时不发起冲锋，单位为方块。默认值为`3`。
  - <DataType type="float" name="speed_multiplier"/>：冲向目标时的速度乘数。默认值为`1`。
  - <DataType type="float" name="success_rate"/>：未处于攻击状态时发起冲锋的概率。默认值为`0.1428`。
  - <DataType type="string" name="sound_event"/>：冲锋时播放的音效事件名。默认值为`charge`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

恼鬼（<FileType type="file" name="vex.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.charge_attack": {
    "priority": 4
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.charge_held_item`

<Usable type="all"/> <Version add="?"/> <br/>

使生物为手持物品蓄力，例如猪灵拉弓。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.charge_held_item"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="items"/>：会触发蓄力的物品列表，该项为必填。
    - <DataType type="string"/>：物品 ID。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猪灵（<FileType type="file" name="piglin.json"/>）：手持箭时蓄力。

```json showLineNumbers
"minecraft:behavior.charge_held_item": {
    "priority": 3,
    "items": [ "minecraft:arrow" ]
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.circle_around_anchor`

<Usable type="all"/> <Version add="?"/> <br/>

使生物围绕一个锚点盘旋，例如幻翼在空中绕圈。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.circle_around_anchor"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="goal_radius"/>：距锚点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="angle_change"/>：选择下一个锚点时朝向改变的角度。默认值为`15`。
  - <DataType type="array" name="radius_range"/>：与锚点的水平距离范围，写作`[最小值, 最大值]`。默认值为`[5, 15]`。
  - <DataType type="float" name="radius_change"/>：成功调整半径时增加的距离，单位为方块。默认值为`1`。
  - <DataType type="float" name="radius_adjustment_chance"/>：每刻调整半径的概率。默认值为`0.004`。
  - <DataType type="array" name="height_above_target_range"/>：高于目标高度的范围，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="array" name="height_offset_range"/>：相对锚点的垂直偏移范围，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="float" name="height_adjustment_chance"/>：每刻调整高度的概率。默认值为`0.002857`。
  - <DataType type="float" name="speed_multiplier"/>：飞向下一位置时的速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

幻翼（<FileType type="file" name="phantom.json"/>）：在目标上方 20 至 40 格处盘旋。

```json showLineNumbers
"minecraft:behavior.circle_around_anchor": {
    "priority": 3,
    "goal_radius": 1,
    "height_above_target_range": { "min": 20, "max": 40 },
    "height_offset_range": { "min": -4, "max": 5 }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.controlled_by_player`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:item_controllable组件、minecraft:movement组件和minecraft:rideable组件。"/> <br/>

使被玩家骑乘的实体接受玩家的方向控制。

另见：_[`minecraft:item_controllable`](#minecraftitem_controllable)组件_、_[`minecraft:movement`](#minecraftmovement)组件_、_[`minecraft:rideable`](#minecraftrideable)组件_、_[EntityMovementComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementcomponent-类)_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.controlled_by_player"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="mount_speed_multiplier"/>：被控制时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="fractional_rotation"/>：每刻朝玩家视角转动的比例。默认值为`0.5`。
  - <DataType type="float" name="fractional_rotation_limit"/>：每刻可转动的最大角度，单位为度。默认值为`5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猪（<FileType type="file" name="pig.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.controlled_by_player": {
    "priority": 0
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.croak`

<Usable type="all"/> <Version add="?"/> <br/>

使生物周期性发出鸣叫，青蛙使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.croak"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="duration"/>：每次鸣叫持续的秒数区间，也可直接写固定值。默认值为`[4.5, 4.5]`。
  - <DataType type="array" name="interval"/>：两次鸣叫之间随机等待的秒数区间，也可直接写固定值。默认值为`[10, 20]`。
  - <DataType type="object" name="filters"/>：允许鸣叫的条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

青蛙（<FileType type="file" name="frog.json"/>）：不在水中或熔岩中时鸣叫。

```json showLineNumbers
"minecraft:behavior.croak": {
    "priority": 9,
    "duration": { "min": 4.5, "max": 4.5 },
    "interval": { "min": 10, "max": 20 },
    "filters": {
        "all_of": [
            { "test": "in_water", "value": false },
            { "test": "in_lava", "value": false }
        ]
    }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.defend_trusted_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物保护已获得其信任的对象，例如狐狸保护信任的玩家。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.defend_trusted_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：被视为有效攻击目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="within_radius"/>：在被保护对象周围多大的范围内发起攻击，单位为方块。默认值为`0`。
  - <DataType type="boolean" name="must_see"/>：为`true`时只把视野内的实体作为目标。默认值为`false`。
  - <DataType type="float" name="must_see_forget_duration"/>：目标离开视野多少秒后放弃。默认值为`3`。
  - <DataType type="int" name="attack_interval"/>：两次攻击之间的秒数。默认值为`0`。
  - <DataType type="string" name="aggro_sound"/>：保护期间偶尔播放的音效事件名。
  - <DataType type="object" name="on_defend_start"/>：开始保护时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：

```json showLineNumbers
"minecraft:behavior.defend_trusted_target": {
    "priority": 0,
    "within_radius": 25,
    "must_see": false,
    "aggro_sound": "mad",
    "on_defend_start": {
        "event": "minecraft:fox_configure_defending",
        "target": "self"
    }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.defend_village_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物攻击村庄的入侵者，铁傀儡使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.defend_village_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：被视为入侵者的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="attack_chance"/>：每刻发起攻击的概率。默认值为`0.05`。
  - <DataType type="boolean" name="attack_owner"/>：为`true`时该实体可以攻击自己的主人。默认值为`false`。
  - <DataType type="boolean" name="must_reach"/>：为`true`时要求存在通往目标的完整路径。默认值为`false`。
  - <DataType type="boolean" name="must_see"/>：为`true`时只把视野内的实体作为目标。默认值为`false`。
  - <DataType type="float" name="must_see_forget_duration"/>：目标离开视野多少秒后放弃。默认值为`3`。
  - <DataType type="float" name="persist_time"/>：目标不再可见后仍继续攻击的秒数。默认值为`0`。
  - <DataType type="float" name="within_radius"/>：距目标的最大跟随距离，超出则放弃。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铁傀儡（<FileType type="file" name="iron_golem.json"/>）：攻击生物与玩家之外的入侵者。

```json showLineNumbers
"minecraft:behavior.defend_village_target": {
    "priority": 1,
    "must_reach": true,
    "entity_types": [
        {
            "filters": {
                "all_of": [
                    { "test": "is_family", "subject": "other", "value": "mob" },
                    { "test": "is_family", "subject": "other", "value": "player" }
                ]
            }
        }
    ]
}
```

原版该条目的`filters`用数字写`subject`与`operator`，上例已改写为字符串形式。
</TabItem></Tabs>

---

### `minecraft:behavior.delayed_attack`

<Usable type="all"/> <Version add="?"/> <br/>

让生物在攻击动画播放到一定进度时才结算伤害，劫掠兽使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.delayed_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="attack_duration"/>：攻击动画的播放时长，单位为秒。默认值为`0.75`。
  - <DataType type="float" name="hit_delay_pct"/>：动画播放到多少比例时结算伤害，`1.0`表示动画结束。默认值为`0.5`。
  - <DataType type="boolean" name="attack_once"/>：为`true`时该行为在实体整个生命周期内只执行一次。默认值为`false`。
  - <DataType type="string" name="attack_types"/>：该实体攻击的目标类型。
  - <DataType type="boolean" name="can_spread_on_fire"/>：为`true`时，着火的实体空手攻击会点燃目标。默认值为`false`。
  - <DataType type="float" name="reach_multiplier"/>：以碰撞箱尺寸为基础计算攻击距离的乘数。默认值为`1.5`。
  - <DataType type="float" name="speed_multiplier"/>：接近目标时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="track_target"/>：为`true`时即使没有固定感知组件也能追踪目标。默认值为`true`。
  - <DataType type="boolean" name="require_complete_path"/>：为`true`时要求存在通往目标的完整路径。默认值为`false`。
  - <DataType type="int" name="random_stop_interval"/>：以`1/N`的概率中断攻击，`N`为该值。默认值为`0`。
  - <DataType type="float" name="min_path_time"/>：重新计算攻击路径的最短基础间隔，单位为秒。默认值为`0.2`。
  - <DataType type="float" name="max_path_time"/>：重新计算攻击路径的最长基础间隔，单位为秒。默认值为`0.55`。
  - <DataType type="float" name="path_inner_boundary"/>：距目标小于该距离时按`inner_boundary_time_increase`延长重算间隔。默认值为`16`。
  - <DataType type="float" name="path_outer_boundary"/>：距目标大于该距离时按`outer_boundary_time_increase`延长重算间隔。默认值为`32`。
  - <DataType type="float" name="inner_boundary_time_increase"/>：目标靠近时追加的重算间隔，单位为秒。默认值为`0.25`。
  - <DataType type="float" name="outer_boundary_time_increase"/>：目标远离时追加的重算间隔，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="path_fail_time_increase"/>：寻路失败时追加的重算间隔，单位为秒。默认值为`0.75`。
  - <DataType type="float" name="melee_fov"/>：感知有效目标时使用的视场角，单位为度。默认值为`90`。
  - <DataType type="float" name="x_max_rotation"/>：注视目标时俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：注视目标时水平方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="string" name="sound_event"/>：攻击时播放的音效事件名。默认值为`attack.strong`。
  - <DataType type="object" name="on_attack"/>：成功攻击时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_kill"/>：击杀目标时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

劫掠兽（<FileType type="file" name="ravager.json"/>）：

```json showLineNumbers
"minecraft:behavior.delayed_attack": {
    "priority": 4,
    "attack_once": false,
    "track_target": true,
    "require_complete_path": false,
    "reach_multiplier": 1.5,
    "speed_multiplier": 1.0,
    "attack_duration": 0.75,
    "hit_delay_pct": 0.5
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.dig`

<Usable type="all"/> <Version add="?"/> <br/>

使生物钻入地面并停留一段时间，监守者使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dig"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="duration"/>：钻地持续的秒数。默认值为`0`。
  - <DataType type="float" name="idle_time"/>：最后一次扰动后、开始钻地前需保持静止的秒数。默认值为`0`。
  - <DataType type="boolean" name="allow_dig_when_named"/>：为`true`时已被命名的实体也能钻地。默认值为`false`。
  - <DataType type="boolean" name="digs_in_daylight"/>：为`true`时实体见到阳光就开始钻地。默认值为`false`。
  - <DataType type="boolean" name="suspicion_is_disturbance"/>：为`true`时发现可疑位置也算扰动，会推迟钻地。默认值为`false`。
  - <DataType type="boolean" name="vibration_is_disturbance"/>：为`true`时振动也算扰动，会推迟钻地。默认值为`false`。
  - <DataType type="object" name="on_start"/>：开始钻地时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:behavior.dig": {
    "priority": 1,
    "duration": 5.5,
    "idle_time": 60,
    "vibration_is_disturbance": true,
    "suspicion_is_disturbance": true,
    "on_start": { "event": "on_digging_event" }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.door_interact`

<Usable type="all"/> <Version add="?"/> <br/>

使生物能够手动开关门。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.door_interact"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无单独声明该行为的实体，以下为最小写法：

```json showLineNumbers
"minecraft:behavior.door_interact": {
    "priority": 1
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.dragonchargeplayer`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:behavior.dragonscanning组件。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙向玩家发起俯冲冲锋。

另见：_[`minecraft:behavior.dragonscanning`](#minecraftbehaviordragonscanning)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragonchargeplayer"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="active_speed"/>：冲锋进行中或已开始时的移动速度。默认值为`3`。
  - <DataType type="float" name="flight_speed"/>：未冲锋时的飞行速度。默认值为`0.6`。
  - <DataType type="float" name="turn_speed"/>：执行该行为时的转向速度。默认值为`0.7`。
  - <DataType type="array" name="target_zone"/>：可使用该行为的距离区间，写作`[最小值, 最大值]`，单位为方块。默认值为`[10, 150]`。
  - <DataType type="float" name="continue_charge_threshold_time"/>：目标脱离`target_zone`超过该秒数后停止冲锋。默认值为`0.5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.dragonchargeplayer": {
    "priority": 1
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.dragondeath`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

控制末影龙死亡时的升空与消散过程。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragondeath"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：只写优先级。

```json showLineNumbers
"minecraft:behavior.dragondeath": {
    "priority": 0
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.dragonflaming`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙在停驻时先咆哮、再喷吐龙息。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragonflaming"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown_time"/>：两次「咆哮并喷吐」循环之间的间隔，单位为秒。默认值为`10`。
  - <DataType type="float" name="roar_time"/>：咆哮持续的秒数。默认值为`2`。
  - <DataType type="float" name="flame_time"/>：咆哮结束后喷吐龙息持续的秒数。默认值为`0.5`。
  - <DataType type="int" name="ground_flame_count"/>：起飞前在地面喷吐龙息的次数。默认值为`4`。
  - <DataType type="string" name="smoke_color"/>：龙息烟雾的颜色，写作十六进制色值。默认值为`#DC00EF`。
  - <DataType type="float" name="smoke_radius"/>：烟雾的扩散半径。默认值为`5`。
  - <DataType type="float" name="smoke_time"/>：烟雾持续的时间。默认值为`10`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.dragonflaming": {
    "priority": 1
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.dragonholdingpattern`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙在祭坛上方盘旋等待。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragonholdingpattern"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：

```json showLineNumbers
"minecraft:behavior.dragonholdingpattern": {
    "priority": 3
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.dragonlanding`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙降落到祭坛上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragonlanding"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：

```json showLineNumbers
"minecraft:behavior.dragonlanding": {
    "priority": 0
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.dragonscanning`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙扫描周围，寻找可供攻击的目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragonscanning"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：

```json showLineNumbers
"minecraft:behavior.dragonscanning": {
    "priority": 2
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.dragonstrafeplayer`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙绕玩家盘旋并伺机发射火球。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragonstrafeplayer"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="active_speed"/>：该行为进行中的移动速度。默认值为`0.6`。
  - <DataType type="float" name="flight_speed"/>：未执行该行为时的飞行速度。默认值为`0.6`。
  - <DataType type="float" name="turn_speed"/>：执行该行为时的转向速度。默认值为`0.7`。
  - <DataType type="array" name="target_zone"/>：可使用该行为的距离区间，写作`[最小值, 最大值]`，单位为方块。默认值为`[10, 150]`。
  - <DataType type="float" name="fireball_range"/>：盘旋时可发射火球的最大距离，单位为方块。默认值为`64`。
  - <DataType type="float" name="view_angle"/>：目标需处于当前朝向多少度以内才发射火球，单位为度。默认值为`10`。
  - <DataType type="float" name="target_in_range_and_in_view_time"/>：目标需持续处于射程与视野内的秒数。默认值为`0.25`。
  - <DataType type="float" name="switch_direction_probability"/>：每刻在顺时针与逆时针之间切换的概率。默认值为`0.125`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.dragonstrafeplayer": {
    "priority": 2
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.dragontakeoff`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙结束停驻、重新起飞盘旋。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragontakeoff"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影龙（<FileType type="file" name="ender_dragon.json"/>）：

```json showLineNumbers
"minecraft:behavior.dragontakeoff": {
    "priority": 0
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.drink_milk`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在满足条件时饮用牛奶。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.drink_milk"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown_seconds"/>：该行为的冷却秒数。默认值为`5`。
  - <DataType type="object" name="filters"/>：允许饮用牛奶的条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

流浪商人（<FileType type="file" name="wandering_trader.json"/>）：白天、不可见且未在躲避时饮用。

```json showLineNumbers
"minecraft:behavior.drink_milk": {
    "priority": 1,
    "cooldown_seconds": 5,
    "filters": {
        "all_of": [
            { "test": "is_daytime", "value": true },
            { "test": "is_visible", "value": false },
            { "test": "is_avoiding_mobs", "value": false }
        ]
    }
}
```

原版该条目的`filters`用数字写`subject`与`operator`，上例已改写为字符串形式。
</TabItem></Tabs>

---

### `minecraft:behavior.drink_potion`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在满足条件时饮用指定的药水。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.drink_potion"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="potions"/>：可饮用的药水列表。
    - <DataType type="object"/>：一种药水。
      - <DataType type="int" name="id"/>：药水的注册 ID。默认值为`-1`。
      - <DataType type="float" name="chance"/>：选中该药水的概率，取值`0.0`-`1.0`。默认值为`1`。
      - <DataType type="object" name="filters"/>：允许选择该药水的条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="speed_modifier"/>：饮用期间施加给生物的速度修正。默认值为`0`。
</treeview>

> **备注**：`id`为药水的注册 ID，具体数值随版本变化，建议以官方示例或实际测试为准。

</TabItem><TabItem value="示例" label="示例">

流浪商人（<FileType type="file" name="wandering_trader.json"/>）：夜间饮用隐身药水。

```json showLineNumbers
"minecraft:behavior.drink_potion": {
    "priority": 1,
    "speed_modifier": 0,
    "potions": [
        {
            "id": 14,
            "chance": 1,
            "filters": {
                "all_of": [
                    { "test": "hourly_clock_time", "operator": ">=", "value": 18000 }
                ]
            }
        }
    ]
}
```

上例只保留原版列表中的第一项，药水`id`按原版写法。
</TabItem></Tabs>

---

### `minecraft:behavior.drop_item_for`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:navigation组件。"/> <br/>

使生物靠近目标并向其投下物品，例如猫向玩家赠送礼物。

另见：_[`minecraft:navigation.walk`](#minecraftnavigationwalk)等导航组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.drop_item_for"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为投赠对象的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="loot_table"/>：决定掉落内容的战利品表路径。
  - <DataType type="float" name="drop_item_chance"/>：每次尝试投下物品的概率，取值`0.0`-`1.0`。默认值为`1`。
  - <DataType type="float" name="offering_distance"/>：希望与目标保持的投赠距离，单位为方块。默认值为`1`。
  - <DataType type="float" name="cooldown"/>：该行为的冷却秒数。默认值为`0.25`。
  - <DataType type="float" name="seconds_before_pickup"/>：投下的物品需经过多少秒才能被拾取。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="array" name="target_range"/>：寻找落点时在`[x, y, z]`三个方向上的搜索范围。默认值为`[1, 1, 1]`。
  - <DataType type="int" name="search_range"/>：搜索落点的水平距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索落点的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：每刻随机检查的方块数量。默认值为`0`。
  - <DataType type="float" name="max_head_look_at_height"/>：投赠时头部注视的最大高度，单位为方块。默认值为`10`。
  - <DataType type="float" name="minimum_teleport_distance"/>：目标距离超过该值时实体改为传送，单位为方块。默认值为`2`。
  - <DataType type="array" name="teleport_offset"/>：传送落点相对目标的偏移，写作`[x, y, z]`。默认值为`[0, 1, 0]`。
  - <DataType type="array" name="time_of_day_range"/>：允许执行该行为的时间范围，`0.0`为正午、`0.5`为午夜。默认值为`[0, 1]`。
  - <DataType type="object" name="on_drop_attempt"/>：尝试投下物品时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：七成概率投下礼物，投下后立即可拾取。

```json showLineNumbers
"minecraft:behavior.drop_item_for": {
    "priority": 1,
    "seconds_before_pickup": 0.0,
    "cooldown": 0.25,
    "drop_item_chance": 0.7,
    "offering_distance": 5.0,
    "minimum_teleport_distance": 2.0,
    "max_head_look_at_height": 10.0,
    "target_range": [ 5.0, 5.0, 5.0 ]
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.eat_block`

<Usable type="all"/> <Version add="?"/> <br/>

使生物啃食指定的方块并替换为另一方块，羊吃草即使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.eat_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="eat_and_replace_block_pairs"/>：被啃食方块与替换方块的对应关系列表。
    - <DataType type="object"/>：一组对应。
      - <DataType type="string" name="eat_block"/>：被啃食的方块 ID。
      - <DataType type="string" name="replace_block"/>：啃食后替换成的方块 ID。
  - <DataType type="string" name="success_chance"/>：每刻成功啃食的概率，填 Molang 表达式。默认值为`0.02`。
  - <DataType type="float" name="time_until_eat"/>：啃食动画持续的秒数。默认值为`1.8`。
  - <DataType type="object" name="on_eat"/>：啃食完成后触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

羊（<FileType type="file" name="sheep.json"/>）：幼年羊成功率更低。

```json showLineNumbers
"minecraft:behavior.eat_block": {
    "priority": 6,
    "success_chance": "query.is_baby ? 0.02 : 0.001",
    "time_until_eat": 1.8,
    "eat_and_replace_block_pairs": [
        { "eat_block": "grass", "replace_block": "dirt" },
        { "eat_block": "tallgrass", "replace_block": "air" }
    ]
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.eat_carried_item`

<Usable type="all"/> <Version add="?"/> <br/>

使生物吃掉口中携带的物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.eat_carried_item"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="delay_before_eating"/>：开始进食前的等待秒数。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：叼住物品 28 秒后吃掉。

```json showLineNumbers
"minecraft:behavior.eat_carried_item": {
    "priority": 12,
    "delay_before_eating": 28
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.eat_mob`

<Usable type="all"/> <Version add="?"/> <br/>

使生物吞食其他生物，青蛙吃史莱姆即使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.eat_mob"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="eat_animation_time"/>：吞食动画持续的秒数。默认值为`1`。
  - <DataType type="string" name="eat_mob_sound"/>：吞食时播放的音效事件名。
  - <DataType type="string" name="loot_table"/>：吞食后掉落内容的战利品表路径。
  - <DataType type="float" name="pull_in_force"/>：把被捕食者拉向自己的力。默认值为`1`。
  - <DataType type="float" name="reach_mob_distance"/>：开始吞食所需的距离，单位为方块。默认值为`1`。
  - <DataType type="float" name="run_speed"/>：冲向目标时的速度。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

青蛙（<FileType type="file" name="frog.json"/>）：

```json showLineNumbers
"minecraft:behavior.eat_mob": {
    "priority": 7,
    "run_speed": 2,
    "eat_animation_time": 0.3,
    "pull_in_force": 0.75,
    "reach_mob_distance": 1.75,
    "eat_mob_sound": "tongue",
    "loot_table": "loot_tables/entities/frog.json"
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.emerge`

<Usable type="all"/> <Version add="?"/> <br/>

使生物从地下钻出，监守者使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.emerge"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="duration"/>：钻出过程的持续秒数。默认值为`5`。
  - <DataType type="float" name="cooldown_time"/>：再次使用该行为前的冷却秒数。默认值为`0.5`。
  - <DataType type="object" name="on_done"/>：即将结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:behavior.emerge": {
    "duration": 7.0,
    "on_done": {
        "event": "minecraft:emerged",
        "target": "self"
    }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.equip_item`

<Usable type="all"/> <Version add="?"/> <br/>

使生物拾起并装备地面上的物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.equip_item"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：只写优先级。

```json showLineNumbers
"minecraft:behavior.equip_item": {
    "priority": 3
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.explore_outskirts`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:dweller组件和minecraft:navigation组件。"/> <br/>

使村民到村庄外围探索。

另见：_[`minecraft:dweller`](#minecraftdweller)组件_、_[`minecraft:navigation.walk`](#minecraftnavigationwalk)等导航组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.explore_outskirts"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="dist_from_boundary"/>：距村庄边界的距离范围，写作`[x, y, z]`。默认值为`[5, 0, 5]`。
  - <DataType type="float" name="explore_dist"/>：超出村庄边界后继续探索的距离，单位为方块。默认值为`5`。
  - <DataType type="float" name="max_travel_time"/>：前往探索点的最长时间，单位为秒。默认值为`60`。
  - <DataType type="float" name="min_dist_from_target"/>：距探索点多近即视为到达，单位为方块。默认值为`2.25`。
  - <DataType type="float" name="min_perimeter"/>：村庄的最小周长，低于该值不执行该行为。默认值为`1`。
  - <DataType type="float" name="min_wait_time"/>：选择下一个探索点前的最短等待秒数。默认值为`3`。
  - <DataType type="float" name="max_wait_time"/>：选择下一个探索点前的最长等待秒数。默认值为`0`。
  - <DataType type="int" name="next_xz"/>：新探索点在水平方向上的随机范围，单位为方块。默认值为`5`。
  - <DataType type="int" name="next_y"/>：新探索点在垂直方向上的随机范围，单位为方块。默认值为`3`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="timer_ratio"/>：等待时长在最短与最长之间的取值比例。默认值为`2`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：全部取默认值。

```json showLineNumbers
"minecraft:behavior.explore_outskirts": {}
```
</TabItem></Tabs>

---

### `minecraft:behavior.fertilize_farm_block`

<Usable type="all"/> <Version add="?"/> <br/>

使生物对农田方块施肥，促进作物生长。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.fertilize_farm_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`1.5`。
  - <DataType type="int" name="max_fertilizer_usage"/>：对同一方块最多施肥的次数。默认值为`1`。
  - <DataType type="float" name="search_cooldown_max_seconds"/>：再次搜索前的最长冷却秒数。默认值为`8`。
  - <DataType type="int" name="search_count"/>：每刻随机检查的方块数量。默认值为`9`。
  - <DataType type="int" name="search_height"/>：搜索的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_range"/>：搜索的水平距离，单位为方块。默认值为`1`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`0.5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.fertilize_farm_block": {
    "priority": 8
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.find_cover`

<Usable type="all"/> <Version add="?"/> <br/>

使生物寻找遮蔽物躲藏。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.find_cover"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="cooldown_time"/>：该行为的冷却秒数。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：

```json showLineNumbers
"minecraft:behavior.find_cover": {
    "priority": 0,
    "speed_multiplier": 1,
    "cooldown_time": 0.0
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.find_mount`

<Usable type="all"/> <Version add="?"/> <br/>

使生物寻找可骑乘的目标并骑上去。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.find_mount"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="within_radius"/>：在多大范围内寻找坐骑，单位为方块。默认值为`0`。
  - <DataType type="boolean" name="avoid_water"/>：为`true`时不会走进水中去找坐骑。默认值为`false`。
  - <DataType type="int" name="start_delay"/>：开始行动前等待的刻数。默认值为`0`。
  - <DataType type="int" name="max_failed_attempts"/>：寻找坐骑的最大尝试次数。默认值为`20`。
  - <DataType type="float" name="mount_distance"/>：与坐骑之间需要达到的距离，单位为方块，`-1`表示不限。默认值为`-1`。
  - <DataType type="boolean" name="target_needed"/>：为`true`时只有拥有攻击目标才会寻找坐骑。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

溺尸（<FileType type="file" name="drowned.json"/>）：在 16 格范围内寻找坐骑，延迟 15 刻开始。

```json showLineNumbers
"minecraft:behavior.find_mount": {
    "priority": 1,
    "max_failed_attempts": 20,
    "start_delay": 15,
    "within_radius": 16
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.find_underwater_treasure`

<Usable type="all"/> <Version add="?"/> <br/>

使生物前往海底遗迹寻找宝箱，海豚使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.find_underwater_treasure"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：在遗迹中搜索宝箱的范围。默认值为`0`。
  - <DataType type="float" name="stop_distance"/>：距目标多远时停下，单位为方块。默认值为`2`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

海豚（<FileType type="file" name="dolphin.json"/>）：

```json showLineNumbers
"minecraft:behavior.find_underwater_treasure": {
    "priority": 2,
    "speed_multiplier": 2.0,
    "search_range": 30,
    "stop_distance": 50
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.fire_at_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物向目标发射弹射物，旋风人使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.fire_at_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="projectile_def"/>：作为弹射物的实体定义 ID。
  - <DataType type="array" name="attack_range"/>：要求目标所处的距离区间，写作`[最小值, 最大值]`，单位为方块。默认值为`[0, 0]`。
  - <DataType type="float" name="attack_cooldown"/>：该行为的冷却秒数。默认值为`0.5`。
  - <DataType type="object" name="filters"/>：允许执行该行为的条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="pre_shoot_delay"/>：发射前的准备秒数。默认值为`0.75`。
  - <DataType type="float" name="post_shoot_delay"/>：发射后到行为结束的秒数。默认值为`0.2`。
  - <DataType type="float" name="ranged_fov"/>：感知目标时使用的视场角，单位为度。默认值为`90`。
  - <DataType type="float" name="max_head_rotation_x"/>：注视目标时俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="max_head_rotation_y"/>：注视目标时水平方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="int" name="owner_anchor"/>：弹射物的生成锚点。`0`为原点、`1`为眼睛高度、`2`为实体中心。默认值为`2`。
  - <DataType type="array" name="owner_offset"/>：相对锚点的生成偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
  - <DataType type="int" name="target_anchor"/>：瞄准目标的锚点，取值同`owner_anchor`。默认值为`2`。
  - <DataType type="array" name="target_offset"/>：相对目标锚点的偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：

```json showLineNumbers
"minecraft:behavior.fire_at_target": {
    "priority": 2,
    "projectile_def": "minecraft:breeze_wind_charge_projectile",
    "attack_range": { "min": 0, "max": 16 },
    "attack_cooldown": 0.5,
    "pre_shoot_delay": 0.75,
    "post_shoot_delay": 0.2,
    "owner_anchor": 2,
    "owner_offset": [ 0.0, 0.3, 0.0 ],
    "filters": {
        "all_of": [
            { "test": "is_navigating", "value": false }
        ]
    }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.flee_sun`

<Usable type="all"/> <Version add="?"/> <br/>

使生物躲避阳光，沼骸与僵尸类实体使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.flee_sun"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：

```json showLineNumbers
"minecraft:behavior.flee_sun": {
    "priority": 2,
    "speed_multiplier": 1
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.float`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在水中向上浮动，避免沉底。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.float"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="chance_per_tick_to_float"/>：每刻施加向上推力的概率。默认值为`0.8`。
  - <DataType type="boolean" name="sink_with_passengers"/>：为`true`时只要还有乘客就持续下沉。默认值为`false`。
  - <DataType type="float" name="time_under_water_to_dismount_passengers"/>：载具头部没入水中多少秒后让乘客下船。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.float": {
    "priority": 7
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.float_tempt`

<Usable type="all"/> <Version add="?"/> <br/>

使浮空的生物被手持特定物品的玩家吸引。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.float_tempt"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="items"/>：可以吸引该生物的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="float" name="within_radius"/>：在多大范围内能被吸引，单位为方块。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="stop_distance"/>：追随玩家时保持的距离，单位为方块。
  - <DataType type="boolean" name="can_get_scared"/>：为`true`时玩家移动过快会让生物受惊而停止跟随。默认值为`false`。
  - <DataType type="boolean" name="can_tempt_vertically"/>：为`true`时垂直距离也计入判定。默认值为`false`。
  - <DataType type="boolean" name="can_tempt_while_ridden"/>：为`true`时身上有骑乘者也能被吸引。默认值为`false`。
  - <DataType type="string" name="tempt_sound"/>：被吸引期间播放的音效事件名。
  - <DataType type="array" name="sound_interval"/>：两次音效之间随机等待的刻数区间。
  - <DataType type="object" name="on_tempt_start"/>：开始被吸引时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_tempt_end"/>：停止被吸引时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

快乐恶魂（<FileType type="file" name="happy_ghast.json"/>）：用雪球与各类挽具吸引。

```json showLineNumbers
"minecraft:behavior.float_tempt": {
    "priority": 4,
    "can_tempt_vertically": true,
    "items": [
        "minecraft:snowball",
        "minecraft:black_harness",
        "minecraft:blue_harness"
    ]
}
```

上例的物品列表在原版中更长，此处只保留前三项。

</TabItem></Tabs>

---

### `minecraft:behavior.float_wander`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在空中随意漂浮游荡，蝙蝠使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.float_wander"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="float_duration"/>：每次漂浮持续的时间区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[0, 0]`。
  - <DataType type="int" name="xz_dist"/>：在水平方向上寻找落点的距离，单位为方块。默认值为`10`。
  - <DataType type="int" name="y_dist"/>：在垂直方向上寻找落点的距离，单位为方块。默认值为`7`。
  - <DataType type="float" name="y_offset"/>：在选定落点上叠加的高度偏移，单位为方块。默认值为`0`。
  - <DataType type="boolean" name="random_reselect"/>：为`true`时移动途中会随机重新选择落点。默认值为`false`。
  - <DataType type="boolean" name="must_reach"/>：为`true`时落点必须可达才有效。默认值为`false`。
  - <DataType type="boolean" name="float_wander_has_move_control"/>：为`true`时该行为自带移动控制。默认值为`true`。
  - <DataType type="boolean" name="use_home_position_restriction"/>：为`true`时遵守[`minecraft:home`](./components#minecrafthome)的限制范围。默认值为`true`。
  - <DataType type="boolean" name="navigate_around_surface"/>：为`true`时优先在表面附近寻找落点。默认值为`false`。
  - <DataType type="int" name="surface_xz_dist"/>：检查表面时的水平距离，单位为方块。默认值为`8`。
  - <DataType type="int" name="surface_y_dist"/>：检查表面时的垂直距离，单位为方块。默认值为`8`。
  - <DataType type="boolean" name="additional_collision_buffer"/>：为`true`时在实体周围增加一圈避让缓冲。默认值为`false`。
  - <DataType type="boolean" name="allow_navigating_through_liquids"/>：为`true`时允许穿过液体寻路。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蝙蝠（<FileType type="file" name="bat.json"/>）：

```json showLineNumbers
"minecraft:behavior.float_wander": {
    "priority": 1,
    "float_duration": [ 0.1, 0.35 ],
    "float_wander_has_move_control": false,
    "random_reselect": true,
    "y_offset": -2.0,
    "use_home_position_restriction": false,
    "xz_dist": 10,
    "y_dist": 7
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.follow_caravan`

<Usable type="all"/> <Version add="?"/> <br/>

使生物跟随行进队伍中的其他实体，羊驼使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.follow_caravan"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：队伍中可以跟随的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="int" name="entity_count"/>：队伍中允许的实体数量。默认值为`1`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

> **备注**：原版把`entity_types`写成单个对象，schema 中为数组，两种写法均可解析。

</TabItem><TabItem value="示例" label="示例">

羊驼（<FileType type="file" name="llama.json"/>）：跟随最多 10 只羊驼，速度加倍。

```json showLineNumbers
"minecraft:behavior.follow_caravan": {
    "priority": 3,
    "speed_multiplier": 2.1,
    "entity_count": 10,
    "entity_types": {
        "filters": { "test": "is_family", "subject": "other", "value": "llama" }
    }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.follow_mob`

<Usable type="all"/> <Version add="?"/> <br/>

使生物跟随附近的其他生物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.follow_mob"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：搜索可跟随目标的范围，单位为方块。默认值为`0`。
  - <DataType type="float" name="stop_distance"/>：与被跟随者保持的距离，单位为方块。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="object" name="filters"/>：可作为跟随目标的实体条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="preferred_actor_type"/>：优先跟随的实体 ID，省略时随机选择。
  - <DataType type="boolean" name="use_home_position_restriction"/>：为`true`时遵守[`minecraft:home`](./components#minecrafthome)的限制范围。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

快乐恶魂（<FileType type="file" name="happy_ghast.json"/>）：优先跟随 16 格内的玩家。

```json showLineNumbers
"minecraft:behavior.follow_mob": {
    "priority": 6,
    "search_range": 16,
    "stop_distance": 5,
    "speed_multiplier": 1.1,
    "use_home_position_restriction": true,
    "preferred_actor_type": "player"
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.follow_owner`

<Usable type="all"/> <Version add="?"/> <br/>

使生物跟随其主人，如悦灵跟随给予它物品的玩家。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.follow_owner"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="start_distance"/>：距主人多远时开始跟随，单位为方块。默认值为`10`。
  - <DataType type="float" name="stop_distance"/>：距主人多近时停止跟随，单位为方块。默认值为`2`。
  - <DataType type="float" name="max_distance"/>：距主人超过该距离后不再跟随，单位为方块。默认值为`60`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="can_teleport"/>：为`true`时距离过远会传送到主人身边。默认值为`true`。
  - <DataType type="int" name="post_teleport_distance"/>：传送后与主人保持的距离，单位为方块。默认值为`3`。
  - <DataType type="boolean" name="ignore_vibration"/>：为`true`时感知到振动后仍继续跟随。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：不传送，靠高速移动跟上主人。

```json showLineNumbers
"minecraft:behavior.follow_owner": {
    "priority": 6,
    "can_teleport": false,
    "speed_multiplier": 8,
    "start_distance": 16,
    "stop_distance": 4
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.follow_parent`

<Usable type="all"/> <Version add="?"/> <br/>

使幼年实体跟随其父母。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.follow_parent"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：

```json showLineNumbers
"minecraft:behavior.follow_parent": {
    "priority": 5,
    "speed_multiplier": 1.25
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.follow_target_captain`

<Usable type="all"/> <Version add="?"/> <br/>

使袭击者跟随袭击队长。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.follow_target_captain"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="follow_distance"/>：与队长保持的距离，单位为方块。
  - <DataType type="float" name="within_radius"/>：搜索队长的范围，单位为方块。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

> **备注**：官方 schema 未收录该组件，参数按原版用例整理。

</TabItem><TabItem value="示例" label="示例">

掠夺者（<FileType type="file" name="pillager.json"/>）：

```json showLineNumbers
"minecraft:behavior.follow_target_captain": {
    "priority": 5,
    "follow_distance": 5,
    "within_radius": 64,
    "speed_multiplier": 0.8
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.follow_target_leader`

<Usable type="all"/> <Version add="?"/> <br/>

使生物跟随符合条件的目标作为领队。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.follow_target_leader"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="leader_filters"/>：可作为领队的实体条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="within_radius"/>：搜索领队的最大距离，单位为方块。默认值为`0`。
  - <DataType type="float" name="follow_distance"/>：与目标保持的距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_cooldown"/>：两次搜索之间的间隔，单位为刻。默认值为`20`。
  - <DataType type="boolean" name="always_look_for_leader"/>：为`true`时即使没有目标也持续寻找领队。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该行为的实体，以下为最小写法：

```json showLineNumbers
"minecraft:behavior.follow_target_leader": {
    "priority": 5,
    "leader_filters": { "test": "is_family", "subject": "other", "value": "llama" },
    "within_radius": 16,
    "follow_distance": 4
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.go_and_give_items_to_noteblock`

<Usable type="all"/> <Version add="?"/> <br/>

使生物把物品投向音符盒。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.go_and_give_items_to_noteblock"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="listen_time"/>：在音符盒处继续投掷物品的秒数。默认值为`30`。
  - <DataType type="float" name="reach_block_distance"/>：距音符盒多近时开始投掷，单位为方块。默认值为`3`。
  - <DataType type="float" name="run_speed"/>：冲向音符盒时的速度。默认值为`1`。
  - <DataType type="float" name="throw_force"/>：投掷力度。默认值为`0.2`。
  - <DataType type="float" name="vertical_throw_mul"/>：在投掷力度之上叠加的垂直分量乘数。默认值为`1.5`。
  - <DataType type="string" name="throw_sound"/>：投掷时播放的音效事件名。默认值为`charge`。
  - <DataType type="array" name="on_item_throw"/>：投掷物品时触发的事件列表。
    - <DataType type="object"/>：一个事件。
      - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:behavior.go_and_give_items_to_noteblock": {
    "priority": 3,
    "run_speed": 8,
    "throw_sound": "item_thrown",
    "on_item_throw": [
        { "event": "pickup_item_delay", "target": "self" }
    ]
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.go_and_give_items_to_owner`

<Usable type="all"/> <Version add="?"/> <br/>

使生物把物品投向其主人。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.go_and_give_items_to_owner"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="reach_mob_distance"/>：距主人多近时开始投掷，单位为方块。默认值为`3`。
  - <DataType type="float" name="run_speed"/>：冲向主人时的速度。默认值为`1`。
  - <DataType type="float" name="throw_force"/>：投掷力度。默认值为`0.2`。
  - <DataType type="float" name="vertical_throw_mul"/>：在投掷力度之上叠加的垂直分量乘数。默认值为`1.5`。
  - <DataType type="string" name="throw_sound"/>：投掷时播放的音效事件名。默认值为`charge`。
  - <DataType type="array" name="on_item_throw"/>：投掷物品时触发的事件列表。
    - <DataType type="object"/>：一个事件。
      - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:behavior.go_and_give_items_to_owner": {
    "priority": 4,
    "run_speed": 8,
    "throw_sound": "item_thrown",
    "on_item_throw": [
        { "event": "pickup_item_delay", "target": "self" }
    ]
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.go_home`

<Usable type="all"/> <Version add="?"/> <br/>

使生物返回其「家」的位置，需配合[`minecraft:home`](./components#minecrafthome)组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.go_home"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="interval"/>：再次尝试回家前的随机间隔，单位为刻。默认值为`120`。
  - <DataType type="float" name="goal_radius"/>：距家多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="calculate_new_path_radius"/>：距终点多近时重新计算路径，单位为方块。默认值为`2`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="array" name="on_home"/>：到家时触发的事件列表。
    - <DataType type="object"/>：一个事件。
      - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
      - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](./filters)。
  - <DataType type="array" name="on_failed"/>：回家失败时触发的事件列表，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：到蜂巢或蜂箱即视为到家。

```json showLineNumbers
"minecraft:behavior.go_home": {
    "priority": 4,
    "speed_multiplier": 1.0,
    "interval": 1,
    "goal_radius": 1.2,
    "on_home": [
        {
            "filters": {
                "any_of": [
                    { "test": "is_block", "subject": "block", "value": "minecraft:bee_nest" },
                    { "test": "is_block", "subject": "block", "value": "minecraft:beehive" }
                ]
            },
            "event": "minecraft:bee_returned_to_hive",
            "target": "block"
        }
    ]
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.guardian_attack`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对守卫者与远古守卫者可用。"/> <br/>

使守卫者与远古守卫者发动魔法攻击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.guardian_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="magic_damage"/>：魔法攻击的基础伤害。默认值为`1`。
  - <DataType type="int" name="elder_extra_magic_damage"/>：远古守卫者额外增加的魔法伤害。默认值为`2`。
  - <DataType type="int" name="hard_mode_extra_magic_damage"/>：困难难度下额外增加的魔法伤害。默认值为`2`。
  - <DataType type="float" name="min_distance"/>：目标距离小于该值时停止该行为，单位为方块。默认值为`3`。
  - <DataType type="float" name="sound_delay_time"/>：开始攻击后延迟多少秒播放音效。默认值为`0.5`。
  - <DataType type="float" name="x_max_rotation"/>：俯仰方向的最大转角，单位为度。默认值为`90`。
  - <DataType type="float" name="y_max_head_rotation"/>：水平方向的最大转角，单位为度。默认值为`90`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

远古守卫者（<FileType type="file" name="elder_guardian.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.guardian_attack": {
    "priority": 4
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.harvest_farm_block`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:inventory组件和minecraft:navigation组件。"/> <br/>

使村民收割成熟的作物。

另见：_[`minecraft:inventory`](#minecraftinventory)组件_、_[`minecraft:navigation.walk`](#minecraftnavigationwalk)等导航组件_、_[EntityInventoryComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityinventorycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.harvest_farm_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`1.5`。
  - <DataType type="int" name="search_range"/>：搜索农田的水平距离，单位为方块。默认值为`16`。
  - <DataType type="int" name="search_height"/>：搜索农田的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：每刻随机检查的方块数量。默认值为`0`。
  - <DataType type="float" name="max_seconds_before_search"/>：开始搜索前允许等待的最长秒数。默认值为`1`。
  - <DataType type="float" name="search_cooldown_max_seconds"/>：搜索失败后再次搜索前的最长冷却秒数。默认值为`8`。
  - <DataType type="float" name="seconds_until_new_task"/>：成功收割后进入下一任务前的冷却秒数。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`0.5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：

```json showLineNumbers
"minecraft:behavior.harvest_farm_block": {
    "priority": 9,
    "speed_multiplier": 0.5
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.hide`

<Usable type="all"/> <Version add="?"/> <br/>

使生物移动到并躲藏在其兴趣点处。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.hide"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="poi_type"/>：要寻找的兴趣点类型。可选值为`bed`（床）、`meeting_area`（集会点）、`jobsite`（工作站点）。
  - <DataType type="float" name="duration"/>：躲藏的持续秒数。默认值为`1`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="timeout_cooldown"/>：被打断后再次使用该行为前的冷却秒数。默认值为`8`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：躲到床上 30 秒。

```json showLineNumbers
"minecraft:behavior.hide": {
    "priority": 0,
    "duration": 30,
    "poi_type": "bed",
    "speed_multiplier": 0.8
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.hold_ground`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在目标进入一定距离后停下并固守原地。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.hold_ground"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="min_radius"/>：目标需进入该距离才执行该行为，单位为方块。默认值为`10`。
  - <DataType type="boolean" name="broadcast"/>：为`true`时把当前目标广播给同类实体。默认值为`false`。
  - <DataType type="float" name="broadcast_range"/>：广播的范围，单位为方块。默认值为`0`。
  - <DataType type="object" name="within_radius_event"/>：目标进入范围时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

掠夺者（<FileType type="file" name="pillager.json"/>）：目标进入 10 格后固守，并向 8 格内同类广播。

```json showLineNumbers
"minecraft:behavior.hold_ground": {
    "priority": 6,
    "broadcast": true,
    "broadcast_range": 8,
    "min_radius": 10,
    "within_radius_event": { "event": "minecraft:ranged_mode", "target": "self" }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.hover`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在空中悬停。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.hover"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无单独声明该行为的实体，以下为最小写法：

```json showLineNumbers
"minecraft:behavior.hover": {
    "priority": 5
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.hurt_by_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物把伤害来源设为目标进行反击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.hurt_by_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为反击目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="boolean" name="hurt_owner"/>：为`true`时也会攻击主人以及属于同一主人的实体。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：只写优先级。

```json showLineNumbers
"minecraft:behavior.hurt_by_target": {
    "priority": 1
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.inspect_bookshelf`

<Usable type="all"/> <Version add="?"/> <br/>

使村民查看书架。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.inspect_bookshelf"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="int" name="search_range"/>：搜索书架的距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索书架的高度，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：每刻随机检查的方块数量。默认值为`10`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：全部取默认值。

```json showLineNumbers
"minecraft:behavior.inspect_bookshelf": {}
```
</TabItem></Tabs>

---

### `minecraft:behavior.investigate_suspicious_location`

<Usable type="all"/> <Version add="?"/> <br/>

使生物前往可疑位置进行调查，监守者使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.investigate_suspicious_location"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`1.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:behavior.investigate_suspicious_location": {
    "priority": 5,
    "speed_multiplier": 0.7
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.jump_around_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物围绕目标跳跃移动，旋风人使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.jump_around_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：允许执行该行为的条件。见[实体过滤器](./filters)。
  - <DataType type="array" name="jump_angles"/>：允许使用的跳跃角度列表，单位为度。默认值为`[40, 55, 60, 75, 80]`。
  - <DataType type="float" name="max_jump_velocity"/>：跳跃的最大速度。默认值为`1.4`。
  - <DataType type="float" name="prepare_jump_duration"/>：起跳前的准备秒数。默认值为`0.5`。
  - <DataType type="float" name="jump_cooldown_duration"/>：两次跳跃之间的冷却秒数。默认值为`0.5`。
  - <DataType type="float" name="jump_cooldown_when_hurt_duration"/>：受伤后跳跃的冷却秒数。默认值为`0.1`。
  - <DataType type="float" name="last_hurt_duration"/>：判定「近期受伤」的秒数，受伤后的跳跃改用较短的冷却。默认值为`2`。
  - <DataType type="array" name="valid_distance_to_target"/>：允许起跳的目标距离区间写作`[最小值, 最大值]`，单位为方块。默认值为`[4, 20]`。
  - <DataType type="array" name="landing_distance_from_target"/>：落点与目标的距离区间写作`[最小值, 最大值]`，单位为方块。默认值为`[4, 8]`。
  - <DataType type="int" name="landing_position_spread_degrees"/>：选择落点时的散布角度，单位为度。默认值为`90`。
  - <DataType type="int" name="required_vertical_space"/>：头顶需要留空的方块数。默认值为`4`。
  - <DataType type="int" name="line_of_sight_obstruction_height_ignore"/>：视线受阻时，低于该高度的遮挡物可忽略，单位为方块。默认值为`4`。
  - <DataType type="int" name="snap_to_surface_block_range"/>：在落点上下多大范围内贴合表面，单位为方块。默认值为`10`。
  - <DataType type="boolean" name="check_collision"/>：为`true`时计算跳跃时会检查碰撞。默认值为`false`。
  - <DataType type="float" name="entity_bounding_box_scale"/>：跳跃期间临时施加给碰撞箱的缩放。默认值为`0.7`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：只保留部分字段。

```json showLineNumbers
"minecraft:behavior.jump_around_target": {
    "priority": 1,
    "jump_cooldown_duration": 0.5,
    "check_collision": false,
    "filters": {
        "all_of": [
            {
                "any_of": [
                    { "test": "in_water", "value": true },
                    { "test": "on_ground", "value": true }
                ]
            },
            { "test": "is_riding", "value": false }
        ]
    }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.jump_to_block`

<Usable type="all"/> <Version add="?"/> <br/>

使生物跳向指定的方块，青蛙使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.jump_to_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="cooldown_range"/>：两次跳跃之间的冷却秒数区间写作`[最小值, 最大值]`。默认值为`[10, 20]`。
  - <DataType type="array" name="forbidden_blocks"/>：不能跳向的方块列表，元素写作`{ "name": 方块 ID }`。
  - <DataType type="array" name="preferred_blocks"/>：优先跳向的方块列表，写法同上。
  - <DataType type="float" name="preferred_blocks_chance"/>：优先选择偏好方块的附加概率，取值`0.0`-`1.0`。默认值为`1`。
  - <DataType type="float" name="max_velocity"/>：跳跃的最大速度。默认值为`1.5`。
  - <DataType type="int" name="minimum_distance"/>：与目标方块的最小距离，单位为方块。默认值为`2`。
  - <DataType type="int" name="minimum_path_length"/>：通往目标方块的最短路径长度，单位为方块。默认值为`5`。
  - <DataType type="int" name="search_width"/>：搜索框的宽度，单位为方块，取值`1`-`15`。默认值为`8`。
  - <DataType type="int" name="search_height"/>：搜索框的高度，单位为方块，取值`1`-`15`。默认值为`10`。
  - <DataType type="float" name="scale_factor"/>：跳跃期间碰撞箱的缩放系数。默认值为`0.7`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

青蛙（<FileType type="file" name="frog.json"/>）：优先跳向睡莲，不跳入水中。

```json showLineNumbers
"minecraft:behavior.jump_to_block": {
    "priority": 10,
    "cooldown_range": { "min": 5, "max": 7 },
    "max_velocity": 1,
    "minimum_distance": 1,
    "minimum_path_length": 2,
    "forbidden_blocks": [ { "name": "minecraft:water" } ],
    "preferred_blocks": [ { "name": "minecraft:waterlily" } ]
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.knockback_roar`

<Usable type="all"/> <Version add="?"/> <br/>

使生物咆哮并把周围的实体击退，劫掠兽使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.knockback_roar"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="attack_time"/>：开始咆哮到产生击退之间的延迟秒数。默认值为`0.5`。
  - <DataType type="float" name="duration"/>：咆哮持续的秒数。默认值为`1`。
  - <DataType type="float" name="cooldown_time"/>：该行为的冷却秒数。默认值为`0.1`。
  - <DataType type="int" name="knockback_damage"/>：咆哮造成的伤害。默认值为`6`。
  - <DataType type="int" name="knockback_range"/>：击退作用的半径，单位为方块。默认值为`4`。
  - <DataType type="int" name="knockback_horizontal_strength"/>：水平击退强度。默认值为`4`。
  - <DataType type="int" name="knockback_vertical_strength"/>：垂直击退强度。默认值为`4`。
  - <DataType type="float" name="knockback_height_cap"/>：垂直击退的高度上限。默认值为`0.4`。
  - <DataType type="object" name="damage_filters"/>：会受到伤害的实体条件。见[实体过滤器](./filters)。
  - <DataType type="object" name="knockback_filters"/>：会被击退的实体条件。见[实体过滤器](./filters)。
  - <DataType type="object" name="on_roar_end"/>：咆哮结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

劫掠兽（<FileType type="file" name="ravager.json"/>）：

```json showLineNumbers
"minecraft:behavior.knockback_roar": {
    "priority": 1,
    "duration": 1,
    "attack_time": 0.5,
    "knockback_damage": 6,
    "knockback_horizontal_strength": 3,
    "knockback_vertical_strength": 3,
    "knockback_range": 4
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.lay_down`

<Usable type="all"/> <Version add="?"/> <br/>

使生物躺下休息，熊猫使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.lay_down"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="interval"/>：可以进入躺下状态的随机间隔，单位为刻。默认值为`120`。
  - <DataType type="int" name="random_stop_interval"/>：退出躺下状态的随机间隔，单位为刻。默认值为`120`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

熊猫（<FileType type="file" name="panda.json"/>）：间隔较长，躺下后会保持很久。

```json showLineNumbers
"minecraft:behavior.lay_down": {
    "priority": 5,
    "interval": 400,
    "random_stop_interval": 2000
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.lay_egg`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在指定方块上产卵，海龟与青蛙使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.lay_egg"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="egg_type"/>：产下的卵对应的方块 ID。默认值为`minecraft:turtle_egg`。
  - <DataType type="array" name="target_blocks"/>：可以在其上方产卵的方块列表。默认值为`[ "minecraft:sand" ]`。
  - <DataType type="array" name="target_materials_above_block"/>：目标方块上方允许存在的材质列表。默认值为`[ "air" ]`。
  - <DataType type="float" name="lay_seconds"/>：产卵过程持续的秒数。默认值为`10`。
  - <DataType type="string" name="lay_egg_sound"/>：产卵时播放的音效事件名。默认值为`lay_egg`。
  - <DataType type="boolean" name="allow_laying_from_below"/>：为`true`时允许从目标方块下方产卵。默认值为`false`。
  - <DataType type="boolean" name="use_default_animation"/>：为`true`时播放默认的产卵动画。默认值为`true`。
  - <DataType type="int" name="search_range"/>：搜索产卵位置的距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索产卵位置的高度，单位为方块。默认值为`1`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="object" name="on_lay"/>：产卵时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

青蛙（<FileType type="file" name="frog.json"/>）：产卵的方块为青蛙卵。

```json showLineNumbers
"minecraft:behavior.lay_egg": {
    "priority": 2,
    "allow_laying_from_below": true,
    "lay_seconds": 2,
    "egg_type": "minecraft:frog_spawn",
    "search_height": 3,
    "goal_radius": 1.7,
    "lay_egg_sound": "lay_spawn",
    "on_lay": { "event": "laid_egg", "target": "self" }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.leap_at_target`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对猫、豹猫、狼与蜘蛛类实体可用。"/> <br/>

使生物向目标扑跃。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.leap_at_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="yd"/>：扑跃时达到的高度，单位为方块。默认值为`0`。
  - <DataType type="boolean" name="must_be_on_ground"/>：为`true`时只有站在地面上才会扑跃。默认值为`true`。
  - <DataType type="boolean" name="set_persistent"/>：为`true`时锁定玩家为目标后转为持久实体。默认值为`false`。
</treeview>

> schema 把该组件标注为仅敌对生物可用，但 26.60 的原版包中猫、豹猫、狼也在使用，此处按原版书写。

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.leap_at_target": {
    "priority": 3
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.look_at_entity`

<Usable type="all"/> <Version add="?"/> <br/>

使生物注视附近的特定实体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.look_at_entity"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="angle_of_view_horizontal"/>：水平方向的视场角，单位为度。默认值为`360`。
  - <DataType type="int" name="angle_of_view_vertical"/>：垂直方向的视场角，单位为度。默认值为`360`。
  - <DataType type="float" name="look_distance"/>：可注视的最远距离，单位为方块。默认值为`8`。
  - <DataType type="array" name="look_time"/>：每次注视持续时间的区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[2, 4]`。
  - <DataType type="float" name="probability"/>：每刻开始注视的概率，取值`0.0`-`1.0`。默认值为`0.02`。
  - <DataType type="object" name="filters"/>：可以被注视的实体条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

唤魔者（<FileType type="file" name="evocation_illager.json"/>）：每次注视 1 至 2 秒。

```json showLineNumbers
"minecraft:behavior.look_at_entity": {
    "priority": 10,
    "look_time": { "min": 1, "max": 2 }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.look_at_player`

<Usable type="all"/> <Version add="?"/> <br/>

使生物注视附近的玩家。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.look_at_player"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="angle_of_view_horizontal"/>：水平方向的视场角，单位为度。默认值为`360`。
  - <DataType type="int" name="angle_of_view_vertical"/>：垂直方向的视场角，单位为度。默认值为`360`。
  - <DataType type="float" name="look_distance"/>：可注视的最远距离，单位为方块。默认值为`8`。
  - <DataType type="array" name="look_time"/>：每次注视持续时间的区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[2, 4]`。
  - <DataType type="float" name="probability"/>：每刻开始注视的概率，取值`0.0`-`1.0`。默认值为`0.02`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:behavior.look_at_player": {
    "priority": 8,
    "look_distance": 6
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.look_at_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物注视其当前攻击目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.look_at_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="angle_of_view_horizontal"/>：水平方向的视场角，单位为度。默认值为`360`。
  - <DataType type="int" name="angle_of_view_vertical"/>：垂直方向的视场角，单位为度。默认值为`360`。
  - <DataType type="float" name="look_distance"/>：可注视的最远距离，单位为方块。默认值为`8`。
  - <DataType type="array" name="look_time"/>：每次注视持续时间的区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[2, 4]`。
  - <DataType type="float" name="probability"/>：每刻开始注视的概率，取值`0.0`-`1.0`。默认值为`0.02`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

凋灵（<FileType type="file" name="wither.json"/>）：每次注视 1 至 2 秒。

```json showLineNumbers
"minecraft:behavior.look_at_target": {
    "priority": 5,
    "look_time": { "min": 1, "max": 2 }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.look_at_trading_player`

<Usable type="all"/> <Version add="?"/> <br/>

使生物注视正在与其交易的玩家。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.look_at_trading_player"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="angle_of_view_horizontal"/>：水平方向的视场角，单位为度。默认值为`360`。
  - <DataType type="int" name="angle_of_view_vertical"/>：垂直方向的视场角，单位为度。默认值为`360`。
  - <DataType type="float" name="look_distance"/>：可注视的最远距离，单位为方块。默认值为`8`。
  - <DataType type="array" name="look_time"/>：每次注视持续时间的区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[2, 4]`。
  - <DataType type="float" name="probability"/>：每刻开始注视的概率，取值`0.0`-`1.0`。默认值为`0.02`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：

```json showLineNumbers
"minecraft:behavior.look_at_trading_player": {
    "priority": 2,
    "look_time": { "min": 1, "max": 2 }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.make_love`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对村民可用。"/> <br/>

使生物寻找配偶并进入求爱状态，需配合[`minecraft:breedable`](./components#minecraftbreedable)组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.make_love"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：只写优先级。

```json showLineNumbers
"minecraft:behavior.make_love": {
    "priority": 6
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.melee_attack`

<Usable type="all"/> <Version add="?"/> <br/>

使生物接近并近战攻击目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.melee_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="reach_multiplier"/>：以碰撞箱尺寸为基础计算攻击距离的乘数，`0`表示不进行近战攻击。默认值为`2`。
  - <DataType type="float" name="cooldown_time"/>：两次攻击之间的冷却秒数。默认值为`1`。
  - <DataType type="boolean" name="attack_once"/>：为`true`时该行为在实体整个生命周期内只执行一次。默认值为`false`。
  - <DataType type="string" name="attack_types"/>：该实体攻击的目标类型。
  - <DataType type="boolean" name="can_spread_on_fire"/>：为`true`时，着火的实体空手攻击会点燃目标。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：接近目标时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="track_target"/>：为`true`时即使没有固定感知组件也能追踪目标。默认值为`false`。
  - <DataType type="boolean" name="require_complete_path"/>：为`true`时要求存在通往目标的完整路径。默认值为`false`。
  - <DataType type="int" name="random_stop_interval"/>：以`1/N`的概率中断攻击，`N`为该值。默认值为`0`。
  - <DataType type="float" name="min_path_time"/>：重新计算攻击路径的最短基础间隔，单位为秒。默认值为`0.2`。
  - <DataType type="float" name="max_path_time"/>：重新计算攻击路径的最长基础间隔，单位为秒。默认值为`0.55`。
  - <DataType type="float" name="path_inner_boundary"/>：距目标小于该距离时追加`inner_boundary_time_increase`的重算间隔。默认值为`16`。
  - <DataType type="float" name="path_outer_boundary"/>：距目标大于该距离时追加`outer_boundary_time_increase`的重算间隔。默认值为`32`。
  - <DataType type="float" name="inner_boundary_time_increase"/>：目标靠近时追加的重算间隔，单位为秒。默认值为`0.25`。
  - <DataType type="float" name="outer_boundary_time_increase"/>：目标远离时追加的重算间隔，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="path_fail_time_increase"/>：寻路失败时追加的重算间隔，单位为秒。默认值为`0.75`。
  - <DataType type="float" name="melee_fov"/>：感知有效目标时使用的视场角，单位为度。默认值为`90`。
  - <DataType type="float" name="x_max_rotation"/>：注视目标时俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：注视目标时水平方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="object" name="on_attack"/>：成功攻击时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_kill"/>：击杀目标时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

苦力怕（<FileType type="file" name="creeper.json"/>）：把`reach_multiplier`设为`0`，只用于追击而不挥击。

```json showLineNumbers
"minecraft:behavior.melee_attack": {
    "priority": 4,
    "reach_multiplier": 0,
    "speed_multiplier": 1.25
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.melee_box_attack`

<Usable type="all"/> <Version add="?"/> <br/>

使生物以矩形判定范围进行近战攻击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.melee_box_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="horizontal_reach"/>：在实体碰撞箱基础上向外扩展的判定距离，单位为方块。默认值为`0.8`。
  - <DataType type="float" name="cooldown_time"/>：两次攻击之间的冷却秒数。默认值为`1`。
  - <DataType type="boolean" name="attack_once"/>：为`true`时该行为在实体整个生命周期内只执行一次。默认值为`false`。
  - <DataType type="string" name="attack_types"/>：该实体攻击的目标类型。
  - <DataType type="boolean" name="can_spread_on_fire"/>：为`true`时，着火的实体空手攻击会点燃目标。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：接近目标时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="track_target"/>：为`true`时即使没有固定感知组件也能追踪目标。默认值为`false`。
  - <DataType type="boolean" name="require_complete_path"/>：为`true`时要求存在通往目标的完整路径。默认值为`false`。
  - <DataType type="int" name="random_stop_interval"/>：以`1/N`的概率中断攻击，`N`为该值。默认值为`0`。
  - <DataType type="float" name="min_path_time"/>：重新计算攻击路径的最短基础间隔，单位为秒。默认值为`0.2`。
  - <DataType type="float" name="max_path_time"/>：重新计算攻击路径的最长基础间隔，单位为秒。默认值为`0.55`。
  - <DataType type="float" name="path_inner_boundary"/>：距目标小于该距离时追加`inner_boundary_time_increase`的重算间隔。默认值为`16`。
  - <DataType type="float" name="path_outer_boundary"/>：距目标大于该距离时追加`outer_boundary_time_increase`的重算间隔。默认值为`32`。
  - <DataType type="float" name="inner_boundary_time_increase"/>：目标靠近时追加的重算间隔，单位为秒。默认值为`0.25`。
  - <DataType type="float" name="outer_boundary_time_increase"/>：目标远离时追加的重算间隔，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="path_fail_time_increase"/>：寻路失败时追加的重算间隔，单位为秒。默认值为`0.75`。
  - <DataType type="float" name="melee_fov"/>：感知有效目标时使用的视场角，单位为度。默认值为`90`。
  - <DataType type="float" name="x_max_rotation"/>：注视目标时俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：注视目标时水平方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="object" name="on_attack"/>：成功攻击时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_kill"/>：击杀目标时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：命中时触发事件。

```json showLineNumbers
"minecraft:behavior.melee_box_attack": {
    "priority": 4,
    "on_attack": { "event": "killed_enemy_event" }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.mingle`

<Usable type="all"/> <Version add="?"/> <br/>

使生物与其他同类聚在一起交流，村民使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.mingle"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="mingle_partner_type"/>：可以交流的实体类型，如`minecraft:villager_v2`。
  - <DataType type="float" name="mingle_distance"/>：与交流对象保持的距离，单位为方块。默认值为`2`。
  - <DataType type="float" name="duration"/>：每次交流持续的秒数。默认值为`1`。
  - <DataType type="float" name="cooldown_time"/>：该行为的冷却秒数。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：

```json showLineNumbers
"minecraft:behavior.mingle": {
    "priority": 7,
    "cooldown_time": 10,
    "duration": 30,
    "mingle_distance": 2,
    "mingle_partner_type": "minecraft:villager_v2",
    "speed_multiplier": 0.5
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.mount_pathing`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:rideable组件。"/> <br/>

使骑乘中的实体朝目标移动。

另见：_[`minecraft:rideable`](#minecraftrideable)组件_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.mount_pathing"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="target_dist"/>：与目标保持的距离，单位为方块。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="track_target"/>：为`true`时只要目标有效就持续追击。默认值为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼尸壳（<FileType type="file" name="camel_husk.json"/>）：

```json showLineNumbers
"minecraft:behavior.mount_pathing": {
    "priority": 3,
    "target_dist": 0,
    "speed_multiplier": 4,
    "track_target": true
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_around_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在目标周围游走，旋风人使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_around_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：允许执行该行为的条件。见[实体过滤器](./filters)。
  - <DataType type="array" name="destination_position_range"/>：落点与目标之间的距离区间写作`[最小值, 最大值]`，单位为方块。默认值为`[4, 8]`。
  - <DataType type="float" name="destination_pos_spread_degrees"/>：选择落点时的散布角度，单位为度。默认值为`90`。
  - <DataType type="float" name="height_difference_limit"/>：与目标允许的最大高度差，单位为方块。默认值为`10`。
  - <DataType type="int" name="horizontal_search_distance"/>：搜索落点的水平距离，单位为方块。默认值为`5`。
  - <DataType type="int" name="vertical_search_distance"/>：搜索落点的垂直距离，单位为方块。默认值为`5`。
  - <DataType type="float" name="movement_speed"/>：移动时的速度。默认值为`0.6`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：在地面上、与目标距离不超过一定值时绕行。

```json showLineNumbers
"minecraft:behavior.move_around_target": {
    "priority": 3,
    "destination_pos_spread_degrees": 360,
    "destination_position_range": { "min": 4.0, "max": 8.0 },
    "filters": {
        "all_of": [
            { "test": "on_ground", "value": true }
        ]
    }
}
```

上例的`filters`在原版中还包含距离判断，此处从简。
</TabItem></Tabs>

---

### `minecraft:behavior.move_indoors`

<Usable type="all"/> <Version add="?"/> <br/>

使生物向室内移动，村民在夜晚使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_indoors"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：移动时的速度乘数。默认值为`0.8`。
  - <DataType type="float" name="timeout_cooldown"/>：寻路失败后再次使用该行为前的冷却秒数。默认值为`8`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：

```json showLineNumbers
"minecraft:behavior.move_indoors": {
    "priority": 4,
    "speed_multiplier": 0.8
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_outdoors`

<Usable type="all"/> <Version add="?"/> <br/>

使生物向室外移动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_outdoors"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：搜索室外位置的水平范围，单位为方块。默认值为`15`。
  - <DataType type="int" name="search_height"/>：搜索室外位置的垂直范围，单位为方块。默认值为`5`。
  - <DataType type="int" name="search_count"/>：搜索失败前尝试的随机位置数量。默认值为`10`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`2`。
  - <DataType type="float" name="speed_multiplier"/>：移动时的速度乘数。默认值为`0.5`。
  - <DataType type="float" name="timeout_cooldown"/>：寻路失败后再次使用该行为前的冷却秒数。默认值为`8`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：

```json showLineNumbers
"minecraft:behavior.move_outdoors": {
    "priority": 2,
    "speed_multiplier": 0.8,
    "timeout_cooldown": 8
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_through_village`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对铁傀儡可用。"/> <br/>

使生物在村庄中来回走动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_through_village"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="only_at_night"/>：为`true`时只在夜间走动。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

> schema 把该组件标注为仅村民可用，但 26.60 的原版包中只有铁傀儡使用，此处按原版书写。

</TabItem><TabItem value="示例" label="示例">

铁傀儡（<FileType type="file" name="iron_golem.json"/>）：只在夜间巡逻。

```json showLineNumbers
"minecraft:behavior.move_through_village": {
    "priority": 3,
    "only_at_night": true,
    "speed_multiplier": 0.6
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_to_block`

<Usable type="all"/> <Version add="?"/> <br/>

使生物移动到指定的方块处并停留一段时间。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="target_blocks"/>：要前往的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="object" name="target_block_filters"/>：方块需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="string" name="target_selection_method"/>：方块的选择方式。可选值为`nearest`（最近）与`random`（随机）。默认值为`nearest`。
  - <DataType type="array" name="target_offset"/>：目标位置相对方块的偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
  - <DataType type="int" name="search_range"/>：搜索方块的距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索方块的高度，单位为方块。默认值为`1`。
  - <DataType type="float" name="goal_radius"/>：距目标多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="stay_duration"/>：到达后需要停留的刻数。默认值为`0`。
  - <DataType type="float" name="start_chance"/>：每次尝试时启动该行为的概率。默认值为`1`。
  - <DataType type="int" name="tick_interval"/>：尝试执行该行为的平均间隔，单位为刻。默认值为`20`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="array" name="on_reach"/>：到达方块时触发的事件列表。
    - <DataType type="object"/>：一个事件。
      - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="array" name="on_stay_completed"/>：在方块处停留完成后触发的事件列表，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：随机选择花朵并停留 20 刻。

```json showLineNumbers
"minecraft:behavior.move_to_block": {
    "priority": 10,
    "tick_interval": 1,
    "start_chance": 0.5,
    "search_range": 6,
    "search_height": 4,
    "goal_radius": 1.0,
    "stay_duration": 20.0,
    "target_selection_method": "random",
    "target_offset": [ 0, 0.25, 0 ]
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_to_land`

<Usable type="all"/> <Version add="?"/> <br/>

使生物离开水域移动到陆地上，青蛙使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_land"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：搜索陆地的水平距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索陆地的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：每刻随机检查的方块数量。默认值为`10`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

青蛙（<FileType type="file" name="frog.json"/>）：

```json showLineNumbers
"minecraft:behavior.move_to_land": {
    "priority": 6,
    "goal_radius": 2,
    "search_count": 80,
    "search_height": 8,
    "search_range": 30
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_to_lava`

<Usable type="all"/> <Version add="1.21.80" tooltip="实际加入版本存疑。"/> <br/>

定义实体在陆地上时返回熔岩的行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_lava"/>：根对象。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="float" name="goal_radius"/>：判定到达目标的范围，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="int" name="search_count"/>：每刻随机选取的方块数量。默认值为`10`。
  - <DataType type="int" name="search_height"/>：搜索熔岩的垂直范围，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_range"/>：搜索熔岩的水平范围，单位为方块。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版未使用该组件，以下按默认值书写：

```json showLineNumbers
"minecraft:behavior.move_to_lava": {
    "priority": 0,
    "search_range": 16,
    "search_height": 8,
    "speed_multiplier": 1.0
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.move_to_liquid`

<Usable type="all"/> <Version add="?"/> <br/>

使生物寻找并移动到液体方块处。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_liquid"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="material_type"/>：要寻找的液体材质。可选值为`any`（任意液体）、`water`、`lava`。默认值为`any`。
  - <DataType type="int" name="search_range"/>：搜索液体的水平距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索液体的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：每刻随机检查的方块数量。默认值为`10`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该行为的实体，以下为最小写法：

```json showLineNumbers
"minecraft:behavior.move_to_liquid": {
    "priority": 4,
    "material_type": "lava",
    "search_range": 16,
    "search_height": 5,
    "search_count": 10
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_to_poi`

<Usable type="all"/> <Version add="?"/> <br/>

使生物移动到指定类型的兴趣点处。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_poi"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="poi_type"/>：要寻找的兴趣点类型。可选值为`bed`（床）、`meeting_area`（集会点）、`jobsite`（工作站点）。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

原版暂无单独声明该行为的实体，以下为最小写法：

```json showLineNumbers
"minecraft:behavior.move_to_poi": {
    "priority": 5,
    "poi_type": "bed"
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_to_random_block`

<Usable type="all"/> <Version add="?"/> <br/>

使生物移动到附近随机的方块位置。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_random_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="block_distance"/>：目标方块与实体的距离上限，单位为方块。默认值为`16`。
  - <DataType type="float" name="within_radius"/>：距目标方块多近即视为到达，单位为方块。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

掠夺者（<FileType type="file" name="pillager.json"/>）：

```json showLineNumbers
"minecraft:behavior.move_to_random_block": {
    "priority": 6,
    "block_distance": 512,
    "speed_multiplier": 0.55,
    "within_radius": 8
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_to_village`

<Usable type="all"/> <Version add="?"/> <br/>

使生物移动到最近的村庄。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_village"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：搜索村庄的距离，单位为方块；小于等于`0`时找最近的村庄。默认值为`0`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`1.5`。
  - <DataType type="float" name="cooldown_time"/>：该行为的冷却秒数。默认值为`8`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

唤魔者（<FileType type="file" name="evocation_illager.json"/>）：

```json showLineNumbers
"minecraft:behavior.move_to_village": {
    "priority": 6,
    "speed_multiplier": 0.7
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_to_water`

<Usable type="all"/> <Version add="?"/> <br/>

使生物寻找并移动到水域。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_water"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：搜索水域的水平距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索水域的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：每刻随机检查的方块数量。默认值为`10`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:behavior.move_to_water": {
    "priority": 6,
    "search_range": 16,
    "search_height": 5,
    "search_count": 1,
    "goal_radius": 0.1
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_towards_dwelling_restriction`

<Usable type="all"/> <Version add="?"/> <br/>

使生物回到其居住地的限制范围内。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_towards_dwelling_restriction"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：移动时的速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.move_towards_dwelling_restriction": {
    "priority": 7
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_towards_home_restriction`

<Usable type="all"/> <Version add="?"/> <br/>

使生物回到其「家」的限制范围内。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_towards_home_restriction"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：移动时的速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：只写优先级，其余取默认值。

```json showLineNumbers
"minecraft:behavior.move_towards_home_restriction": {
    "priority": 9
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.move_towards_restriction`

<Usable type="all"/> <Version add="?"/> <br/>

使生物回到行为限制的范围内。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_towards_restriction"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：移动时的速度乘数。默认值为`1`。
</treeview>

> **备注**：官方 schema 未收录该组件，参数按同类限制类行为整理。

</TabItem><TabItem value="示例" label="示例">

原版暂无使用该行为的实体，以下为最小写法：

```json showLineNumbers
"minecraft:behavior.move_towards_restriction": {
    "priority": 5
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.move_towards_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物朝其攻击目标靠近。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_towards_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="within_radius"/>：希望与目标保持的距离，单位为方块。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铁傀儡（<FileType type="file" name="iron_golem.json"/>）：接近到 32 格内。

```json showLineNumbers
"minecraft:behavior.move_towards_target": {
    "priority": 2,
    "speed_multiplier": 0.9,
    "within_radius": 32
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.nap`

<Usable type="all"/> <Version add="?"/> <br/>

使生物打盹，狐狸使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.nap"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="can_nap_filters"/>：允许打盹的条件。见[实体过滤器](./filters)。
  - <DataType type="object" name="wake_mob_exceptions"/>：即使靠近也不会吵醒该实体的生物条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="cooldown_min"/>：再次打盹前的最短等待秒数。默认值为`0`。
  - <DataType type="float" name="cooldown_max"/>：再次打盹前的最长等待秒数。默认值为`0`。
  - <DataType type="float" name="mob_detect_dist"/>：检测附近生物的水平距离，单位为方块。默认值为`6`。
  - <DataType type="float" name="mob_detect_height"/>：检测附近生物的垂直距离，单位为方块。默认值为`6`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：不在水中且不在熔岩中时打盹。

```json showLineNumbers
"minecraft:behavior.nap": {
    "priority": 8,
    "cooldown_min": 2.0,
    "cooldown_max": 7.0,
    "mob_detect_dist": 12.0,
    "mob_detect_height": 6.0,
    "can_nap_filters": {
        "all_of": [
            { "test": "in_water", "value": false },
            { "test": "in_lava", "value": false }
        ]
    }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.nearest_attackable_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物把最近的可攻击实体设为目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.nearest_attackable_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="max_dist"/>：该类型目标的最大距离，单位为方块。
      - <DataType type="float" name="max_height"/>：该类实体可作为目标的高度上限，`-1`表示不限制。默认值为`-1`。
      - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
      - <DataType type="int" name="cooldown"/>：再次选中该类实体前需要等待的秒数。默认值为`0`。
      - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
      - <DataType type="boolean" name="must_see"/>：为`true`时该类实体必须可见才会被选中。
      - <DataType type="int" name="must_see_forget_duration"/>：看不见该类实体后多少秒放弃，单位为秒。默认值为`3`。
      - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时检查该类实体的数量是否占优。默认值为`false`。
      - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
      - <DataType type="float" name="walk_speed_multiplier"/>：接近该目标时的行走速度乘数。
      - <DataType type="float" name="sprint_speed_multiplier"/>：接近该目标时的疾跑速度乘数。
  - <DataType type="boolean" name="must_see"/>：为`true`时只把视野内的实体作为目标。默认值为`false`。
  - <DataType type="boolean" name="must_reach"/>：为`true`时要求存在通往目标的路径。默认值为`false`。
  - <DataType type="float" name="must_see_forget_duration"/>：目标离开视野多少秒后放弃。默认值为`3`。
  - <DataType type="float" name="within_radius"/>：距目标的最大跟随距离，单位为方块。默认值为`0`。
  - <DataType type="float" name="persist_time"/>：目标不可见后仍继续攻击的秒数。默认值为`0`。
  - <DataType type="boolean" name="reselect_targets"/>：为`true`时允许改用更近的目标。默认值为`false`。
  - <DataType type="boolean" name="attack_owner"/>：为`true`时可以攻击自己的主人。默认值为`false`。
  - <DataType type="boolean" name="set_persistent"/>：为`true`时锁定玩家为目标后转为持久实体。默认值为`false`。
  - <DataType type="array" name="attack_interval"/>：两次搜索目标之间的秒数区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="int" name="scan_interval"/>：未设置`attack_interval`时的扫描间隔，单位为刻。默认值为`10`。
  - <DataType type="float" name="target_search_height"/>：搜索目标的垂直距离，`-1`表示不限。默认值为`-1`。
  - <DataType type="float" name="target_invisible_multiplier"/>：目标护甲覆盖率对该距离判定的修正系数。默认值为`0.7`。
  - <DataType type="float" name="target_sneak_visibility_multiplier"/>：目标潜行时距离判定的修正系数。默认值为`0.8`。
  - <DataType type="float" name="target_acquisition_probability"/>：接受找到的目标的概率，取值`0.0`-`1.0`。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：只攻击水中的特定生物。

```json showLineNumbers
"minecraft:behavior.nearest_attackable_target": {
    "priority": 3,
    "must_see": true,
    "reselect_targets": true,
    "within_radius": 20.0,
    "must_see_forget_duration": 17.0,
    "entity_types": [
        {
            "filters": {
                "all_of": [
                    { "test": "in_water", "subject": "other", "value": true }
                ]
            },
            "max_dist": 20
        }
    ]
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.nearest_prioritized_attackable_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物按优先级选择可攻击的目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.nearest_prioritized_attackable_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为目标的实体条件列表，各项可带`priority`。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="max_dist"/>：该类型目标的最大距离，单位为方块。
      - <DataType type="float" name="max_height"/>：该类实体可作为目标的高度上限，`-1`表示不限制。默认值为`-1`。
      - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
      - <DataType type="int" name="cooldown"/>：再次选中该类实体前需要等待的秒数。默认值为`0`。
      - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
      - <DataType type="boolean" name="must_see"/>：为`true`时该类实体必须可见才会被选中。
      - <DataType type="int" name="must_see_forget_duration"/>：看不见该类实体后多少秒放弃，单位为秒。默认值为`3`。
      - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时检查该类实体的数量是否占优。默认值为`false`。
      - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
      - <DataType type="float" name="walk_speed_multiplier"/>：接近该目标时的行走速度乘数。
      - <DataType type="float" name="sprint_speed_multiplier"/>：接近该目标时的疾跑速度乘数。
  - <DataType type="boolean" name="must_see"/>：为`true`时只把视野内的实体作为目标。默认值为`false`。
  - <DataType type="boolean" name="must_reach"/>：为`true`时只把可寻路到达的实体作为目标。默认值为`false`。
  - <DataType type="float" name="must_see_forget_duration"/>：目标离开视野多少秒后放弃。默认值为`3`。
  - <DataType type="float" name="within_radius"/>：距目标的最大跟随距离，单位为方块。默认值为`0`。
  - <DataType type="float" name="persist_time"/>：目标不可见后仍继续攻击的秒数。默认值为`0`。
  - <DataType type="boolean" name="reselect_targets"/>：为`true`时允许改用更近的目标。默认值为`false`。
  - <DataType type="boolean" name="hurt_owner"/>：为`true`时也会攻击伤害主人的实体。默认值为`false`。
  - <DataType type="boolean" name="set_persistent"/>：为`true`时锁定玩家为目标后转为持久实体。默认值为`false`。
  - <DataType type="int" name="attack_interval"/>：选择目标的间隔秒数。默认值为`0`。
  - <DataType type="int" name="scan_interval"/>：扫描目标的间隔，单位为刻。默认值为`10`。
  - <DataType type="float" name="target_search_height"/>：搜索目标的垂直距离，`-1`表示不限。默认值为`-1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：优先攻击兔子与鸡。

```json showLineNumbers
"minecraft:behavior.nearest_prioritized_attackable_target": {
    "priority": 6,
    "attack_interval": 2,
    "reselect_targets": true,
    "target_search_height": 5,
    "entity_types": [
        {
            "filters": { "test": "is_family", "subject": "other", "value": "rabbit" },
            "max_dist": 12,
            "priority": 0
        },
        {
            "filters": { "test": "is_family", "subject": "other", "value": "chicken" },
            "max_dist": 12,
            "priority": 1
        }
    ]
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.ocelot_sit_on_block`

<Usable type="all"/> <Version add="?"/> <br/>

使生物坐到当前所在的方块上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.ocelot_sit_on_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：

```json showLineNumbers
"minecraft:behavior.ocelot_sit_on_block": {
    "priority": 7,
    "speed_multiplier": 1.0
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.ocelotattack`

<Usable type="all"/> <Version add="?"/> <br/>

使生物以潜行接近再冲刺的方式发动攻击，豹猫与猫使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.ocelotattack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown_time"/>：两次攻击之间的秒数。默认值为`1`。
  - <DataType type="float" name="max_distance"/>：可使用该行为的最大距离，单位为方块。默认值为`15`。
  - <DataType type="float" name="max_sneak_range"/>：开始潜行的最大距离，单位为方块。默认值为`15`。
  - <DataType type="float" name="max_sprint_range"/>：开始冲刺的最大距离，单位为方块。默认值为`4`。
  - <DataType type="float" name="reach_multiplier"/>：以碰撞箱尺寸为基础计算攻击距离的乘数。默认值为`2`。
  - <DataType type="float" name="sneak_speed_multiplier"/>：潜行时的速度乘数。默认值为`0.6`。
  - <DataType type="float" name="sprint_speed_multiplier"/>：冲刺时的速度乘数。默认值为`1.33`。
  - <DataType type="float" name="walk_speed_multiplier"/>：既不潜行也不冲刺时的速度乘数。默认值为`0.8`。
  - <DataType type="float" name="x_max_rotation"/>：注视目标时俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：注视目标时水平方向的最大转角，单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：保留关键字段。

```json showLineNumbers
"minecraft:behavior.ocelotattack": {
    "priority": 4,
    "cooldown_time": 1.0,
    "max_distance": 15.0,
    "max_sneak_range": 15.0,
    "max_sprint_range": 4.0,
    "reach_multiplier": 2.0
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.offer_flower`

<Usable type="all"/> <Version add="?"/> <br/>

使生物向附近的另一只生物献花，铁傀儡使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.offer_flower"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：允许献花的条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="chance_to_start"/>：每刻开始献花的概率。默认值为`0.000125`。
  - <DataType type="float" name="max_offer_flower_duration"/>：献花持续的秒数。默认值为`20`。
  - <DataType type="array" name="search_area"/>：搜索献花对象的范围，写作`[x, y, z]`。默认值为`[6, 2, 6]`。
  - <DataType type="float" name="max_rotation_x"/>：俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="max_head_rotation_y"/>：水平方向的最大转角，单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铁傀儡（<FileType type="file" name="iron_golem.json"/>）：只在白天献花。

```json showLineNumbers
"minecraft:behavior.offer_flower": {
    "priority": 5,
    "filters": { "test": "is_daytime" }
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.open_door`

<Usable type="all"/> <Version add="?"/> <br/>

使生物能够开门并穿过。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.open_door"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="close_door_after"/>：为`true`时通过后会关门。默认值为`true`。
</treeview>

> **备注**：该行为要求实体的寻路组件允许开门（`can_open_doors`为`true`），否则生物不会尝试开门。

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：

```json showLineNumbers
"minecraft:behavior.open_door": {
    "priority": 6,
    "close_door_after": true
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.owner_hurt_by_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在主人被攻击时把攻击者设为目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.owner_hurt_by_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="max_dist"/>：该类型目标的最大距离，单位为方块。
      - <DataType type="float" name="max_height"/>：该类实体可作为目标的高度上限，`-1`表示不限制。默认值为`-1`。
      - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
      - <DataType type="int" name="cooldown"/>：再次选中该类实体前需要等待的秒数。默认值为`0`。
      - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
      - <DataType type="boolean" name="must_see"/>：为`true`时该类实体必须可见才会被选中。
      - <DataType type="int" name="must_see_forget_duration"/>：看不见该类实体后多少秒放弃，单位为秒。默认值为`3`。
      - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时检查该类实体的数量是否占优。默认值为`false`。
      - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
      - <DataType type="float" name="walk_speed_multiplier"/>：接近该类实体时的行走速度乘数。默认值为`1`。
      - <DataType type="float" name="sprint_speed_multiplier"/>：接近该类实体时的疾跑速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狼（<FileType type="file" name="wolf.json"/>）：只写优先级。

```json showLineNumbers
"minecraft:behavior.owner_hurt_by_target": {
    "priority": 1
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.owner_hurt_target`

<Usable type="all"/> <Version add="?"/> <br/>

使生物在主人攻击某实体时把该实体设为目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.owner_hurt_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="max_dist"/>：该类型目标的最大距离，单位为方块。
      - <DataType type="float" name="max_height"/>：该类实体可作为目标的高度上限，`-1`表示不限制。默认值为`-1`。
      - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
      - <DataType type="int" name="cooldown"/>：再次选中该类实体前需要等待的秒数。默认值为`0`。
      - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
      - <DataType type="boolean" name="must_see"/>：为`true`时该类实体必须可见才会被选中。
      - <DataType type="int" name="must_see_forget_duration"/>：看不见该类实体后多少秒放弃，单位为秒。默认值为`3`。
      - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时检查该类实体的数量是否占优。默认值为`false`。
      - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
      - <DataType type="float" name="walk_speed_multiplier"/>：接近该类实体时的行走速度乘数。默认值为`1`。
      - <DataType type="float" name="sprint_speed_multiplier"/>：接近该类实体时的疾跑速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狼（<FileType type="file" name="wolf.json"/>）：只写优先级。

```json showLineNumbers
"minecraft:behavior.owner_hurt_target": {
    "priority": 2
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.panic`

<Usable type="all"/> <Version add="?"/> <br/>

使生物受到伤害后惊慌逃跑。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.panic"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="damage_sources"/>：会引发惊慌的伤害来源类型列表，如`all`。
    - <DataType type="string"/>：伤害来源类型。
  - <DataType type="boolean" name="ignore_mob_damage"/>：为`true`时被其他生物伤害不会惊慌。默认值为`false`。
  - <DataType type="boolean" name="force"/>：为`true`时只有找不到玩家才会停止惊慌。默认值为`false`。
  - <DataType type="boolean" name="prefer_water"/>：为`true`时优先逃向水中。默认值为`false`。
  - <DataType type="string" name="panic_sound"/>：惊慌时播放的音效事件名。
  - <DataType type="array" name="sound_interval"/>：两次音效之间随机等待的刻数区间。
  - <DataType type="float" name="speed_multiplier"/>：惊慌时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：受惊后以两倍速度逃跑。

```json showLineNumbers
"minecraft:behavior.panic": {
    "priority": 1,
    "speed_multiplier": 2.0
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.pet_sleep_with_owner`

<Usable type="all"/> <Version add="?"/> <br/>

使已驯服的宠物睡在主人身边。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.pet_sleep_with_owner"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：搜索主人的距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：允许与主人相隔的高度，单位为方块。默认值为`1`。
  - <DataType type="float" name="goal_radius"/>：距主人多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：

```json showLineNumbers
"minecraft:behavior.pet_sleep_with_owner": {
    "priority": 2,
    "speed_multiplier": 1.2,
    "search_height": 10,
    "goal_radius": 1.0
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.pickup_items`

<Usable type="all"/> <Version add="?"/> <br/>

使生物拾取地面上的物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.pickup_items"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="can_pickup_any_item"/>：为`true`时任何物品都会拾取。默认值为`false`。
  - <DataType type="boolean" name="can_pickup_to_hand_or_equipment"/>：为`true`时可以把物品放到手上或装备栏。默认值为`true`。
  - <DataType type="boolean" name="pickup_based_on_chance"/>：为`true`时按难度决定是否拾取。默认值为`false`。
  - <DataType type="boolean" name="pickup_same_items_as_in_hand"/>：为`true`时只拾取与手中相同的物品。默认值为`false`。
  - <DataType type="boolean" name="stop_if_holding_item"/>：为`true`时手中已有物品就不再拾取。默认值为`false`。
  - <DataType type="boolean" name="track_target"/>：为`true`时持续追逐有效目标。默认值为`false`。
  - <DataType type="array" name="excluded_items"/>：不会拾取的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="int" name="max_dist"/>：搜索物品的最大距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_height"/>：搜索物品的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="cooldown_after_being_attacked"/>：被攻击后多少秒内停止拾取。默认值为`0`。
  - <DataType type="float" name="goal_radius"/>：距物品多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="object" name="on_pickup_item_start"/>：开始走向物品时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_pickup_item_end"/>：拾取完成或放弃时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：只拾取与手中相同的物品，且不装备。

```json showLineNumbers
"minecraft:behavior.pickup_items": {
    "priority": 2,
    "max_dist": 32,
    "search_height": 32,
    "goal_radius": 2.2,
    "can_pickup_any_item": false,
    "can_pickup_to_hand_or_equipment": false,
    "pickup_same_items_as_in_hand": true
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.place_block`

<Usable type="all"/> <Version add="?"/> <br/>

使生物放置携带的方块，铜傀儡使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.place_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="placeable_carried_blocks"/>：允许从身上放置的方块列表，元素写作`{ "block": 方块描述 }`。
  - <DataType type="array" name="randomly_placeable_blocks"/>：可随机放置的方块列表，元素含`block`、`filter`与`weight`。
  - <DataType type="object" name="can_place"/>：允许放置的条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="chance"/>：每刻尝试放置的概率。默认值为`1`。
  - <DataType type="boolean" name="affected_by_griefing_rule"/>：为`true`时受「允许破坏方块」游戏规则影响。默认值为`true`。
  - <DataType type="array" name="xz_range"/>：尝试放置的水平范围，写作`[最小值, 最大值]`。默认值为`[-2, 2]`。
  - <DataType type="array" name="y_range"/>：尝试放置的垂直范围，写作`[最小值, 最大值]`。默认值为`[0, 3]`。
  - <DataType type="object" name="on_place"/>：成功放置时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铜傀儡（<FileType type="file" name="copper_golem.json"/>）：不受游戏规则限制，随机摆放铜傀儡雕像。

```json showLineNumbers
"minecraft:behavior.place_block": {
    "priority": 4,
    "affected_by_griefing_rule": false,
    "randomly_placeable_blocks": [
        {
            "block": {
                "name": "minecraft:oxidized_copper_golem_statue",
                "states": { "minecraft:cardinal_direction": "north" }
            },
            "filter": { "test": "is_daytime", "value": true }
        }
    ]
}
```

上例的`randomly_placeable_blocks`在原版中按四个朝向各列一项，此处只保留一项。
</TabItem></Tabs>

---

### `minecraft:behavior.play`

<Usable type="all"/> <Version add="?"/> <br/>

使生物寻找同伴一起玩耍，村民的幼年个体使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.play"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="friend_types"/>：可作为玩伴的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="max_dist"/>：该类实体可作为目标的最大距离，单位为方块。默认值为`16`。
      - <DataType type="float" name="max_height"/>：该类实体可作为目标的高度上限，`-1`表示不限制。默认值为`-1`。
      - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
      - <DataType type="int" name="cooldown"/>：再次选中该类实体前需要等待的秒数。默认值为`0`。
      - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
      - <DataType type="boolean" name="must_see"/>：为`true`时该类实体必须可见才会被选中。
      - <DataType type="int" name="must_see_forget_duration"/>：看不见该类实体后多少秒放弃，单位为秒。默认值为`3`。
      - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时检查该类实体的数量是否占优。默认值为`false`。
      - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
      - <DataType type="float" name="walk_speed_multiplier"/>：接近该类实体时的行走速度乘数。默认值为`1`。
      - <DataType type="float" name="sprint_speed_multiplier"/>：接近该类实体时的疾跑速度乘数。默认值为`1`。
  - <DataType type="float" name="chance_to_start"/>：每刻开始玩耍的概率。默认值为`0.0025`。
  - <DataType type="array" name="friend_search_area"/>：搜索玩伴的范围，写作`[x, y, z]`。默认值为`[6, 3, 6]`。
  - <DataType type="int" name="follow_distance"/>：与玩伴保持的距离，单位为方块。默认值为`2`。
  - <DataType type="float" name="max_play_duration_seconds"/>：一次玩耍持续的秒数。默认值为`50`。
  - <DataType type="int" name="random_pos_search_range"/>：在地面上搜索随机位置的距离，单位为方块。默认值为`16`。
  - <DataType type="int" name="random_pos_search_height"/>：搜索随机位置的高度，单位为方块。默认值为`3`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

> **备注**：`friend_search_area`的类型在文档中标的与示例不符，此处按原版的三元数组书写。

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：只写优先级与速度。

```json showLineNumbers
"minecraft:behavior.play": {
    "priority": 8,
    "speed_multiplier": 0.32
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.play_dead`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对美西螈可用。"/> <br/>

使实体在受伤后装死，以避免被攻击者继续追击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.play_dead"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="apply_regeneration"/>：装死期间是否获得生命恢复效果。默认值为`false`。
  - <DataType type="array" name="damage_sources"/>：会触发装死的伤害类型。可选值为`none`、`override`、`contact`、`entity_attack`、`projectile`、`suffocation`、`fall`、`fire`、`fire_tick`、`lava`、`drowning`、`block_explosion`、`entity_explosion`、`void`、`self_destruct`、`magic`、`wither`、`starve`、`anvil`、`thorns`、`falling_block`、`piston`、`fly_into_wall`、`magma`、`fireworks`、`lightning`、`charging`、`temperature`、`freezing`、`stalactite`、`stalagmite`、`ram_attack`、`sonic_boom`、`campfire`、`soul_campfire`、`mace_smash`、`all`。默认值为空数组。
    - <DataType type="string"/>：一个伤害类型。
  - <DataType type="float" name="duration"/>：装死持续的时间，单位为秒。默认值为`1`。
  - <DataType type="object" name="filters"/>：装死需满足的额外条件。实体需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="int" name="force_below_health"/>：生命值低于该值时受伤必定装死。默认值为`0`。
  - <DataType type="object" name="random_damage_range"/>：随机附加伤害的区间，用于让装死显得更真实。
    - <DataType type="int" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="int" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="random_start_chance"/>：受伤时装死的概率。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：生命值低于 8 时，受到指定类型的伤害就有 33% 的概率装死 10 秒。

```json showLineNumbers
"minecraft:behavior.play_dead": {
    "priority": 0,
    "duration": 10,
    "force_below_health": 8,
    "random_start_chance": 0.33,
    "random_damage_range": {
        "min": 0,
        "max": 2
    },
    "damage_sources": [
        "contact",
        "entity_attack",
        "entity_explosion",
        "magic",
        "projectile",
        "thorns",
        "wither"
    ],
    "apply_regeneration": true,
    "filters": {
        "test": "in_water",
        "operator": "==",
        "value": true
    }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.player_ride_tamed`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:rideable组件。"/> <br/>

使玩家可以骑乘已驯服的该实体。

另见：_[`minecraft:rideable`](#minecraftrideable)组件_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.player_ride_tamed"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：

```json showLineNumbers
"minecraft:behavior.player_ride_tamed": {}
```
</TabItem></Tabs>

---

### `minecraft:behavior.raid_garden`

<Usable type="all"/> <Version add="?"/> <br/>

使实体前往农田啃食或掠夺指定方块，直到吃饱为止。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.raid_garden"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="blocks"/>：实体前去啃食的方块列表。默认值为空数组。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="int" name="eat_delay"/>：两次啃食之间的间隔，单位为秒。默认值为`2`。
  - <DataType type="int" name="full_delay"/>：吃饱后再次产生进食欲望所需的冷却，单位为秒。默认值为`100`。
  - <DataType type="float" name="goal_radius"/>：距目标多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="int" name="initial_eat_delay"/>：到达目标后开始啃食前的等待时间，单位为秒。默认值为`0`。
  - <DataType type="int" name="max_to_eat"/>：一次最多啃食的方块数量，小于等于`0`表示不设上限。默认值为`6`。
  - <DataType type="int" name="search_height"/>：搜索作物时的垂直范围，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_range"/>：搜索作物时的水平范围，单位为方块。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

> **备注**：`max_to_eat` 设为`0`表示不限制啃食数量，狐狸即如此配置。

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：前往啃食甜浆果丛与洞穴藤蔓。

```json showLineNumbers
"minecraft:behavior.raid_garden": {
    "priority": 12,
    "blocks": [
        "minecraft:sweet_berry_bush",
        "minecraft:cave_vines_head_with_berries",
        "minecraft:cave_vines_body_with_berries"
    ],
    "speed_multiplier": 1.2,
    "search_range": 12,
    "search_height": 2,
    "goal_radius": 0.8,
    "max_to_eat": 0,
    "initial_eat_delay": 2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.ram_attack`

<Usable type="all"/> <Version add="?"/> <br/>

使实体通过助跑冲撞的方式攻击目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.ram_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="baby_knockback_modifier"/>：幼年个体击退强度的修正系数。默认值为`0.3333333`。
  - <DataType type="object" name="cooldown_range"/>：两次冲撞之间的冷却区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="knockback_force"/>：冲撞造成的击退力度。默认值为`5`。
  - <DataType type="float" name="knockback_height"/>：冲撞造成的击退垂直分量。默认值为`0.1`。
  - <DataType type="int" name="min_ram_distance"/>：可以发起冲撞的最小距离，单位为方块。默认值为`4`。
  - <DataType type="array" name="on_start"/>：发起冲撞时触发的事件列表。默认值为空数组。
    - <DataType type="object"/>：一个事件。
      - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="string" name="pre_ram_sound"/>：冲锋前播放的声音定义 ID。
  - <DataType type="int" name="ram_distance"/>：进入冲锋状态的距目标距离，单位为方块。默认值为`7`。
  - <DataType type="string" name="ram_impact_sound"/>：冲撞命中时播放的音效事件名。
  - <DataType type="float" name="ram_speed"/>：冲锋阶段的移动速度。默认值为`2`。
  - <DataType type="float" name="run_speed"/>：助跑阶段的移动速度。默认值为`1`。
</treeview>

> **备注**：原版山羊把`pre_ram_sound`与`ram_impact_sound`分别写成`pre_ram`与`ram_impact`，对应`sound_definitions.json`中的声音定义。

</TabItem><TabItem value="示例" label="示例">

山羊（<FileType type="file" name="goat.json"/>）：

```json showLineNumbers
"minecraft:behavior.ram_attack": {
    "priority": 5,
    "run_speed": 0.7,
    "ram_speed": 1.8,
    "min_ram_distance": 4,
    "ram_distance": 7,
    "knockback_force": 2.5,
    "knockback_height": 0.04,
    "pre_ram_sound": "pre_ram",
    "ram_impact_sound": "ram_impact",
    "cooldown_range": {
        "min": 30,
        "max": 300
    },
    "on_start": [
        {
            "event": "start_event",
            "target": "self"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.random_breach`

<Usable type="all"/> <Version add="?"/> <br/>

使水生生物随机浮出水面换气。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_breach"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown_time"/>：两次浮出水面之间的等待时间，单位为秒。默认值为`0`。
  - <DataType type="int" name="interval"/>：每刻以`1/interval`的概率触发该行为。默认值为`120`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="int" name="xz_dist"/>：水平方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`10`。
  - <DataType type="int" name="y_dist"/>：垂直方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`7`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

海豚（<FileType type="file" name="dolphin.json"/>）：

```json showLineNumbers
"minecraft:behavior.random_breach": {
    "priority": 6,
    "interval": 50,
    "xz_dist": 6,
    "cooldown_time": 2.0
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.random_fly`

<Usable type="all"/> <Version add="?"/> <br/>

使实体随机飞行。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_fly"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="can_land_on_trees"/>：为`true`时允许降落在树上而非地面。默认值为`true`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="int" name="xz_dist"/>：水平方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`10`。
  - <DataType type="int" name="y_dist"/>：垂直方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`7`。
</treeview>

> **备注**：原版鹦鹉还写了`avoid_damage_blocks`与`y_offset`两个参数，均未被 schema 收录，行为未见于官方文档。

</TabItem><TabItem value="示例" label="示例">

鹦鹉（<FileType type="file" name="parrot.json"/>）：

```json showLineNumbers
"minecraft:behavior.random_fly": {
    "priority": 3,
    "avoid_damage_blocks": true,
    "can_land_on_trees": true,
    "y_offset": 0,
    "speed_multiplier": 1.0,
    "xz_dist": 15,
    "y_dist": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.random_hover`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在贴近地面的高度上随机悬浮移动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_hover"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="hover_height"/>：悬浮高度区间，单位为方块。
    - <DataType type="int" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="int" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="int" name="interval"/>：每刻以`1/interval`的概率触发该行为。默认值为`120`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="int" name="xz_dist"/>：水平方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`10`。
  - <DataType type="int" name="y_dist"/>：垂直方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`7`。
  - <DataType type="float" name="y_offset"/>：在选定的目标位置基础上额外偏移的高度，单位为方块。默认值为`0`。
</treeview>

> **备注**：`hover_height`在 schema 里是含`min`/`max`的对象，原版写成`[1, 4]`这样的二元数组，两种写法都能解析。

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:behavior.random_hover": {
    "hover_height": [1, 4],
    "y_dist": 8,
    "interval": 1,
    "xz_dist": 8,
    "priority": 9,
    "y_offset": -1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.random_look_around`

<Usable type="all"/> <Version add="?"/> <br/>

使实体随机环顾四周。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_look_around"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="look_time"/>：每次注视的持续时间区间，单位为秒。
    - <DataType type="int" name="min"/>：区间下限。默认值为`2`。
    - <DataType type="int" name="max"/>：区间上限。默认值为`4`。
  - <DataType type="float" name="max_angle_of_view_horizontal"/>：相对初始朝向，向右可转的最大角度，单位为度。默认值为`180`。
  - <DataType type="float" name="min_angle_of_view_horizontal"/>：相对初始朝向，向左可转的最大角度，单位为度。默认值为`-180`。
  - <DataType type="float" name="probability"/>：触发该行为的概率。默认值为`0.02`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:behavior.random_look_around": {
    "priority": 8
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.random_look_around_and_sit`

<Usable type="all"/> <Version add="?"/> <br/>

使实体随机坐下并在坐姿下环顾四周。需要有对应的坐下动画才能生效。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_look_around_and_sit"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="continue_if_leashed"/>：为`true`时被拴住的实体也会持续执行该行为。默认值为`false`。
  - <DataType type="boolean" name="continue_sitting_on_reload"/>：为`true`时区块重新加载后保持坐下状态。默认值为`false`。
  - <DataType type="float" name="max_angle_of_view_horizontal"/>：相对初始朝向，向右可转的最大角度，单位为度。默认值为`180`。
  - <DataType type="int" name="max_look_count"/>：环顾时注视方向数量的上限。默认值为`2`。
  - <DataType type="int" name="max_look_time"/>：每个方向注视时间的上限，单位为刻。默认值为`40`。
  - <DataType type="float" name="min_angle_of_view_horizontal"/>：相对初始朝向，向左可转的最大角度，单位为度。默认值为`-180`。
  - <DataType type="int" name="min_look_count"/>：环顾时注视方向数量的下限。默认值为`1`。
  - <DataType type="int" name="min_look_time"/>：每个方向注视时间的下限，单位为刻。默认值为`20`。
  - <DataType type="float" name="probability"/>：触发该行为的概率。默认值为`0.02`。
  - <DataType type="int" name="random_look_around_cooldown"/>：再次触发前的冷却时间，单位为秒。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：

```json showLineNumbers
"minecraft:behavior.random_look_around_and_sit": {
    "priority": 4,
    "continue_if_leashed": true,
    "continue_sitting_on_reload": true,
    "min_look_count": 2,
    "max_look_count": 5,
    "min_look_time": 80,
    "max_look_time": 100,
    "min_angle_of_view_horizontal": -30,
    "max_angle_of_view_horizontal": 30,
    "random_look_around_cooldown": 5,
    "probability": 0.001
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.random_search_and_dig`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对嗅探兽可用。"/> <br/>

使实体在附近寻找符合条件的方块，前往挖掘并按战利品表产出物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_search_and_dig"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="cooldown_range"/>：两次挖掘之间的冷却区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="digging_duration_range"/>：单次挖掘的持续时间区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="int" name="find_valid_position_retries"/>：在搜索范围内寻找有效目标位置的尝试次数。默认值为`5`。
  - <DataType type="float" name="goal_radius"/>：距目标多近即视为到达，单位为方块。默认值为`1.5`。
  - <DataType type="string" name="item_table"/>：产出物品所用的战利品表路径，相对于行为包根目录。
  - <DataType type="object" name="on_digging_start"/>：开始挖掘时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_fail_during_digging"/>：挖掘过程中失败时触发的事件，结构同上。
  - <DataType type="object" name="on_fail_during_searching"/>：搜索过程中失败时触发的事件，结构同上。
  - <DataType type="object" name="on_item_found"/>：挖到物品时触发的事件，结构同上。
  - <DataType type="object" name="on_searching_start"/>：开始搜索时触发的事件，结构同上。
  - <DataType type="object" name="on_success"/>：整个行为成功结束时触发的事件，结构同上。
  - <DataType type="int" name="search_range_xz"/>：搜索范围的边长，单位为方块。默认值为`10`。
  - <DataType type="int" name="search_range_y"/>：搜索范围的高度，单位为方块。默认值为`7`。
  - <DataType type="float" name="spawn_item_after_seconds"/>：挖掘开始后经过多少秒产出物品。默认值为`0`。
  - <DataType type="float" name="spawn_item_pos_offset"/>：物品生成位置沿实体朝向前移的距离，单位为方块。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：搜索阶段的移动速度乘数。默认值为`1`。
  - <DataType type="array" name="target_blocks"/>：允许挖掘的方块列表，会覆盖默认列表。默认值为空数组。
    - <DataType type="string"/>：方块 ID，也可写成含`name`、`states`、`tags`的对象。
  - <DataType type="float" name="target_dig_position_offset"/>：挖掘判定点沿实体朝向前移的距离，单位为方块。默认值为`2.25`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

嗅探兽（<FileType type="file" name="sniffer.json"/>）：

```json showLineNumbers
"minecraft:behavior.random_search_and_dig": {
    "priority": 5,
    "speed_multiplier": 1.25,
    "find_valid_position_retries": 5,
    "target_blocks": [
        "minecraft:dirt",
        "minecraft:coarse_dirt",
        "minecraft:grass",
        "minecraft:podzol",
        "minecraft:dirt_with_roots",
        "minecraft:moss_block",
        "minecraft:pale_moss_block",
        "minecraft:mud",
        "minecraft:muddy_mangrove_roots"
    ],
    "goal_radius": 2.0,
    "search_range_xz": 20,
    "search_range_y": 3,
    "cooldown_range": {
        "min": 0.0,
        "max": 0.0
    },
    "digging_duration_range": {
        "min": 8.0,
        "max": 10.0
    },
    "item_table": "loot_tables/gameplay/entities/sniffer_seeds.json",
    "spawn_item_after_seconds": 6.0,
    "spawn_item_pos_offset": 2.25
}
```

> **备注**：示例省略了原版的几个`on_*`事件字段，结构可参照参数树补齐。

</TabItem></Tabs>

---

### `minecraft:behavior.random_sitting`

<Usable type="all"/> <Version add="?"/> <br/>

使实体随机坐下一段时间。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_sitting"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown"/>：两次坐下之间的冷却，单位为秒。默认值为`100`。
  - <DataType type="float" name="min_sit_time"/>：最短坐下的时间，单位为秒。默认值为`10`。
  - <DataType type="float" name="start_chance"/>：开始该行为的概率，取值 0 到 1。默认值为`0.1`。
  - <DataType type="float" name="stop_chance"/>：停止该行为的概率，取值 0 到 1。默认值为`0.3`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

熊猫（<FileType type="file" name="panda.json"/>）：

```json showLineNumbers
"minecraft:behavior.random_sitting": {
    "priority": 6,
    "start_chance": 0.02,
    "stop_chance": 0.2,
    "cooldown": 25,
    "min_sit_time": 15
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.random_stroll`

<Usable type="all"/> <Version add="?"/> <br/>

使实体随机四处闲逛。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_stroll"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="interval"/>：每刻以`1/interval`的概率触发该行为。默认值为`120`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="int" name="xz_dist"/>：水平方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`10`。
  - <DataType type="int" name="y_dist"/>：垂直方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`7`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：

```json showLineNumbers
"minecraft:behavior.random_stroll": {
    "priority": 6,
    "speed_multiplier": 1.0
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.random_swim`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在水中随机游动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_swim"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="avoid_surface"/>：为`true`时实体从水面下方游过，不会浮到水面。默认值为`true`。
  - <DataType type="int" name="interval"/>：每刻以`1/interval`的概率触发该行为。默认值为`120`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="int" name="xz_dist"/>：水平方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`10`。
  - <DataType type="int" name="y_dist"/>：垂直方向上搜索目标位置的距离，单位为方块，至少为`1`。默认值为`7`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:behavior.random_swim": {
    "priority": 8,
    "interval": 0,
    "xz_dist": 30,
    "y_dist": 15
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.ranged_attack`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:shooter组件。"/> <br/>

使实体通过远程射击攻击目标。启用蓄力连发时，`charge_shoot_trigger`必须大于`0`。

另见：_[`minecraft:shooter`](#minecraftshooter)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.ranged_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="attack_interval"/>：两次攻击之间的间隔区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="attack_range"/>：可以发起攻击的距离区间，单位为方块。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="burst_interval"/>：蓄力连发时每发之间的间隔，单位为秒。默认值为`0`。
  - <DataType type="int" name="burst_shots"/>：蓄力连发时的每次射击发数。默认值为`1`。
  - <DataType type="float" name="charge_charged_trigger"/>：在`charge_shoot_trigger`基础上再蓄力多少秒才算蓄满。默认值为`0`。
  - <DataType type="float" name="charge_shoot_trigger"/>：开始筹备连发前需要蓄力多少秒（随后翻倍）。目标离开视线时蓄力会衰减。默认值为`0`。
  - <DataType type="string" name="in_range_movement_mode"/>：进入攻击距离后如何移动。可选值为`hold_position`（原地不动）、`follow_target`（跟随目标）。
  - <DataType type="float" name="ranged_fov"/>：用于发现目标的视野角度，单位为度。默认值为`90`。
  - <DataType type="boolean" name="set_persistent"/>：为`true`时瞄准玩家后不再被自然清除。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：追击目标时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="swing"/>：为`true`时开火会触发手臂摆动动画（依赖`variable.attack_time`）。默认值为`false`。
  - <DataType type="float" name="target_in_sight_time"/>：发现目标后需要持续看见多少秒才会开始追击。默认值为`1`。
  - <DataType type="float" name="x_max_rotation"/>：瞄准时每次最多旋转的角度（X 轴），单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：瞄准时头部每次最多旋转的角度（Y 轴），单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

烈焰人（<FileType type="file" name="blaze.json"/>）：蓄力 4 秒后连发 3 发，间隔 0.3 秒。

```json showLineNumbers
"minecraft:behavior.ranged_attack": {
    "charge_shoot_trigger": 4.0,
    "attack_interval": {
        "min": 3.0,
        "max": 5.0
    },
    "attack_range": {
        "min": 0.0,
        "max": 48.0
    },
    "burst_interval": 0.3,
    "burst_shots": 3,
    "priority": 3
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.receive_love`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对村民可用。"/> <br/>

使村民停下等待其他村民前来繁殖。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.receive_love"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：

```json showLineNumbers
"minecraft:behavior.receive_love": {
    "priority": 7
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.restrict_open_door`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在夜间留在室内，不去开关门。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.restrict_open_door"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：

```json showLineNumbers
"minecraft:behavior.restrict_open_door": {
    "priority": 5
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.restrict_sun`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在晴朗的白天自动躲避阳光。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.restrict_sun"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

> **备注**：该组件在 schema 中只有`priority`与`control_flags`两个字段，行为逻辑依赖实体自身的组件配置。

</TabItem><TabItem value="示例" label="示例">

（原版无用例，以下为最小写法。）

```json showLineNumbers
"minecraft:behavior.restrict_sun": {
    "priority": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.rise_to_liquid_level`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在液体中维持在距液面固定深度的位置。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.rise_to_liquid_level"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="liquid_y_offset"/>：目标位置距液面下沉的距离，单位为方块。正值使目标位置更靠下。默认值为`0`。
  - <DataType type="float" name="rise_delta"/>：低于目标位置时每刻向上移动的距离。默认值为`0`。
  - <DataType type="float" name="sink_delta"/>：高于目标位置时每刻向下移动的距离。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

炽足兽（<FileType type="file" name="strider.json"/>）：

```json showLineNumbers
"minecraft:behavior.rise_to_liquid_level": {
    "priority": 0,
    "liquid_y_offset": 0.25,
    "rise_delta": 0.01,
    "sink_delta": 0.01
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.roar`

<Usable type="all"/> <Version add="?"/> <br/>

使实体依据`minecraft:anger_level`中的数据向其他实体咆哮，怒气值越过阈值后触发。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.roar"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="duration"/>：咆哮的持续时间，单位为秒。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:behavior.roar": {
    "duration": 4.2,
    "priority": 2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.roll`

<Usable type="all"/> <Version add="?"/> <br/>

使实体向前翻滚。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.roll"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="probability"/>：触发该行为的概率。默认值为`0.02`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

熊猫（<FileType type="file" name="panda.json"/>）：

```json showLineNumbers
"minecraft:behavior.roll": {
    "priority": 12,
    "probability": 0.0016
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.run_around_like_crazy`

<Usable type="all"/> <Version add="?"/> <br/>

使实体漫无目的地狂奔。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.run_around_like_crazy"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

驴（<FileType type="file" name="donkey.json"/>）：

```json showLineNumbers
"minecraft:behavior.run_around_like_crazy": {
    "priority": 1,
    "speed_multiplier": 1.2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.scared`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在雷雨天气时表现出害怕。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.scared"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="sound_delay"/>：生效期间以`1/sound_delay`的概率播放音效的间隔。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

熊猫（<FileType type="file" name="panda.json"/>）：

```json showLineNumbers
"minecraft:behavior.scared": {
    "priority": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.send_event`

<Usable type="all"/> <Version add="?"/> <br/>

使实体向另一个实体发送事件。常用于施展法术。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.send_event"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="event_choices"/>：可选的事件方案列表，每次激活时随机挑选一个。默认值为空数组。
    - <DataType type="object"/>：一种事件方案。
      - <DataType type="float" name="cast_duration"/>：施法持续时间，单位为秒。默认值为`0`。
      - <DataType type="float" name="cooldown_time"/>：该方案的冷却时间，单位为秒。默认值为`0`。
      - <DataType type="boolean" name="do_casting"/>：为`true`时播放施法动作。默认值为`true`。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="boolean" name="look_at_target"/>：为`true`时施法期间注视目标。默认值为`true`。
      - <DataType type="float" name="max_activation_range"/>：触发该方案的最大距离，单位为方块。默认值为`32`。
      - <DataType type="float" name="min_activation_range"/>：触发该方案的最小距离，单位为方块。默认值为`1`。
      - <DataType type="string" name="particle_color"/>：施法粒子的颜色，可写十六进制颜色字符串或`[R, G, B]`数组。
      - <DataType type="array" name="sequence"/>：施法过程中按顺序执行的动作。默认值为空数组。
        - <DataType type="object"/>：一个动作。
          - <DataType type="float" name="base_delay"/>：相对上一个动作的延迟，单位为秒。默认值为`0`。
          - <DataType type="string" name="event"/>：要发送的事件 ID。
          - <DataType type="string" name="sound_event"/>：同时播放的音效事件名。
      - <DataType type="string" name="start_sound_event"/>：开始施法时播放的音效事件名。
      - <DataType type="float" name="weight"/>：该方案被选中的权重。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

唤魔者（<FileType type="file" name="evocation_illager.json"/>）：把蓝色绵羊变成红色。

```json showLineNumbers
"minecraft:behavior.send_event": {
    "event_choices": [
        {
            "particle_color": "#FFB38033",
            "cast_duration": 3,
            "max_activation_range": 16,
            "filters": {
                "all_of": [
                    {
                        "subject": "other",
                        "test": "is_family",
                        "value": "sheep"
                    },
                    {
                        "subject": "other",
                        "test": "is_color",
                        "value": "blue"
                    }
                ]
            },
            "cooldown_time": 5,
            "min_activation_range": 0,
            "start_sound_event": "cast.spell",
            "sequence": [
                {
                    "base_delay": 2,
                    "event": "wololo",
                    "sound_event": "prepare.wololo"
                }
            ],
            "weight": 3
        }
    ],
    "priority": 3
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.share_items`

<Usable type="all"/> <Version add="?"/> <br/>

使实体把身上的物品分给其他实体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.share_items"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="entity_types"/>：可以分享物品的实体条件，可写成数组或单个对象。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
    - <DataType type="float" name="max_dist"/>：搜索该类实体的最大距离，单位为方块。默认值为`16`。
    - <DataType type="float" name="max_height"/>：该类实体可作为目标的高度上限，`-1`表示不限制。默认值为`-1`。
    - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
    - <DataType type="int" name="cooldown"/>：对这类实体分享物品后的冷却时间，单位为秒。默认值为`0`。
    - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
    - <DataType type="boolean" name="must_see"/>：是否必须看见对方才会前往。
    - <DataType type="int" name="must_see_forget_duration"/>：看不见对方后多少秒放弃，单位为秒。默认值为`3`。
    - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时仅在对方数量占优时分享。默认值为`false`。
    - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
    - <DataType type="float" name="walk_speed_multiplier"/>：走向该类实体时的行走速度乘数。默认值为`1`。
    - <DataType type="float" name="sprint_speed_multiplier"/>：走向该类实体时的疾跑速度乘数。默认值为`1`。
  - <DataType type="float" name="goal_radius"/>：距目标多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="int" name="max_dist"/>：搜索分享对象的整体最大距离，单位为方块。默认值为`1`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：向其他村民分享食物。

```json showLineNumbers
"minecraft:behavior.share_items": {
    "entity_types": [
        {
            "filters": {
                "subject": "other",
                "test": "is_family",
                "value": "villager"
            }
        }
    ],
    "goal_radius": 2,
    "priority": 8,
    "max_dist": 3,
    "speed_multiplier": 0.5
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.silverfish_merge_with_stone`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对蠹虫可用。"/> <br/>

使实体像蠹虫一样钻入石头方块。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.silverfish_merge_with_stone"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蠹虫（<FileType type="file" name="silverfish.json"/>）：

```json showLineNumbers
"minecraft:behavior.silverfish_merge_with_stone": {
    "priority": 5
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.silverfish_wake_up_friends`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对蠹虫可用。"/> <br/>

使实体惊动附近方块中的同类，让它们钻出来。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.silverfish_wake_up_friends"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蠹虫（<FileType type="file" name="silverfish.json"/>）：

```json showLineNumbers
"minecraft:behavior.silverfish_wake_up_friends": {
    "priority": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.skeleton_horse_trap`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对马、骡、驴与骷髅马可用。"/> <br/>

使实体像骷髅马陷阱一样，在玩家靠近时召唤闪电与一群骷髅马。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.skeleton_horse_trap"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="duration"/>：陷阱的存活时间，单位为秒。超时未被触发则从世界中移除。默认值为`1`。
  - <DataType type="float" name="within_radius"/>：触发陷阱所需的玩家距离，单位为方块。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

骷髅马（<FileType type="file" name="skeleton_horse.json"/>）：

```json showLineNumbers
"minecraft:behavior.skeleton_horse_trap": {
    "within_radius": 10.0,
    "duration": 900.0,
    "priority": 2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.sleep`

<Usable type="all"/> <Version add="?"/> <br/>

使拥有床的实体前往床上睡觉。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.sleep"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="can_sleep_while_riding"/>：为`true`时骑乘其他实体也能执行该行为。默认值为`false`。
  - <DataType type="float" name="cooldown_time"/>：再次使用该行为前的冷却时间，单位为秒。默认值为`0`。
  - <DataType type="float" name="sleep_collider_height"/>：睡觉时碰撞箱的高度。默认值为`1`。
  - <DataType type="float" name="sleep_collider_width"/>：睡觉时碰撞箱的宽度。默认值为`1`。
  - <DataType type="float" name="sleep_y_offset"/>：睡觉时碰撞箱在垂直方向上的偏移。默认值为`1`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="timeout_cooldown"/>：内部超时或失败后重新使用该行为前的冷却，单位为秒。默认值为`8`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：

```json showLineNumbers
"minecraft:behavior.sleep": {
    "priority": 3,
    "sleep_collider_height": 0.3,
    "sleep_collider_width": 1,
    "sleep_y_offset": 0.6,
    "speed_multiplier": 0.6,
    "timeout_cooldown": 10
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.slime_attack`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在攻击过程中周期性进入疲惫状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.slime_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="grow_tired_cooldown_time"/>：两次进入疲惫状态之间的冷却，单位为秒。默认值为`15`。
  - <DataType type="boolean" name="set_persistent"/>：为`true`时瞄准玩家后不再被自然清除。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：追击目标时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="x_max_rotation"/>：瞄准时每次最多旋转的角度（X 轴），单位为度。默认值为`10`。
  - <DataType type="float" name="y_max_rotation"/>：瞄准时每次最多旋转的角度（Y 轴），单位为度。默认值为`10`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

岩浆怪（<FileType type="file" name="magma_cube.json"/>）：

```json showLineNumbers
"minecraft:behavior.slime_attack": {
    "priority": 3
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.slime_float`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对史莱姆与岩浆怪可用。"/> <br/>

使史莱姆与岩浆怪在水中或熔岩中浮起。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.slime_float"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="jump_chance_percentage"/>：在液体中跳跃的概率。默认值为`0.8`。
  - <DataType type="float" name="speed_multiplier"/>：在液体中移动时的速度乘数。默认值为`1.2`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

岩浆怪（<FileType type="file" name="magma_cube.json"/>）：

```json showLineNumbers
"minecraft:behavior.slime_float": {
    "priority": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.slime_keep_on_jumping`

<Usable type="all"/> <Version add="?"/> <br/>

使实体像史莱姆一样持续跳跃前进。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.slime_keep_on_jumping"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：跳跃时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

岩浆怪（<FileType type="file" name="magma_cube.json"/>）：

```json showLineNumbers
"minecraft:behavior.slime_keep_on_jumping": {
    "priority": 5
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.slime_random_direction`

<Usable type="all"/> <Version add="?"/> <br/>

使实体像史莱姆一样随机改变移动方向。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.slime_random_direction"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="add_random_time_range"/>：在`min_change_direction_time`基础上随机追加的时间上限，单位为秒。默认值为`3`。
  - <DataType type="float" name="min_change_direction_time"/>：两次改变方向之间的最短时间，单位为秒。默认值为`2`。
  - <DataType type="int" name="turn_range"/>：改变方向时的最大转角，单位为度。默认值为`360`。
</treeview>

> **备注**：原版未显式写出任何参数，全部使用默认值。

</TabItem><TabItem value="示例" label="示例">

岩浆怪（<FileType type="file" name="magma_cube.json"/>）：

```json showLineNumbers
"minecraft:behavior.slime_random_direction": {
    "priority": 4
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.snacking`

<Usable type="all"/> <Version add="?"/> <br/>

使实体停下来吃附近找到的食物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.snacking"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="items"/>：允许啃食的物品列表。默认值为空数组。
    - <DataType type="string"/>：物品 ID，也可写成含`name`的对象。
  - <DataType type="float" name="snacking_cooldown"/>：两次进食之间的冷却，单位为秒。默认值为`7.5`。
  - <DataType type="float" name="snacking_cooldown_min"/>：冷却时间的最小值，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="snacking_stop_chance"/>：停止进食的概率，取值 0 到 1。默认值为`0.00167`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

熊猫（<FileType type="file" name="panda.json"/>）：啃食竹子与蛋糕。

```json showLineNumbers
"minecraft:behavior.snacking": {
    "priority": 3,
    "snacking_cooldown": 17.5,
    "snacking_cooldown_min": 10,
    "snacking_stop_chance": 0.0011,
    "items": [
        {
            "name": "minecraft:bamboo"
        },
        {
            "name": "minecraft:cake"
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.sneeze`

<Usable type="all"/> <Version add="?"/> <br/>

使实体打喷嚏，并掉落物品、惊吓附近的生物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.sneeze"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown_time"/>：两次打喷嚏之间的冷却，单位为秒。默认值为`0`。
  - <DataType type="float" name="drop_item_chance"/>：打喷嚏时掉落物品的概率。默认值为`1`。
  - <DataType type="object" name="entity_types"/>：会被喷嚏惊吓的实体条件，可写成数组或单个对象。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
    - <DataType type="float" name="max_dist"/>：该类实体的搜索距离，单位为方块。默认值为`16`。
    - <DataType type="float" name="max_height"/>：该类实体可作为目标的高度上限，`-1`表示不限制。默认值为`-1`。
    - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
    - <DataType type="int" name="cooldown"/>：再次选中该类实体前需要等待的秒数。默认值为`0`。
    - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
    - <DataType type="boolean" name="must_see"/>：为`true`时该类实体必须可见才会被选中。
    - <DataType type="int" name="must_see_forget_duration"/>：看不见该类实体后多少秒放弃，单位为秒。默认值为`3`。
    - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时检查该类实体的数量是否占优。默认值为`false`。
    - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
    - <DataType type="float" name="walk_speed_multiplier"/>：接近该类实体时的行走速度乘数。默认值为`1`。
    - <DataType type="float" name="sprint_speed_multiplier"/>：接近该类实体时的疾跑速度乘数。默认值为`1`。
  - <DataType type="string" name="loot_table"/>：掉落物品所用的战利品表路径，相对于行为包根目录。
  - <DataType type="string" name="prepare_sound"/>：喷嚏即将发生时的音效事件名。
  - <DataType type="float" name="prepare_time"/>：打喷嚏前的准备时间，单位为秒。默认值为`1`。
  - <DataType type="float" name="probability"/>：打喷嚏的概率。默认值为`0.02`。
  - <DataType type="string" name="sound"/>：打喷嚏时的音效事件名。
  - <DataType type="float" name="within_radius"/>：会惊吓到生物的距离，单位为方块。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

熊猫（<FileType type="file" name="panda.json"/>）：

```json showLineNumbers
"minecraft:behavior.sneeze": {
    "priority": 7,
    "probability": 0.0001666,
    "cooldown_time": 1.0,
    "within_radius": 10.0,
    "entity_types": [
        {
            "filters": {
                "all_of": [
                    {
                        "test": "has_component",
                        "subject": "other",
                        "operator": "!=",
                        "value": "minecraft:is_baby"
                    },
                    {
                        "test": "is_family",
                        "subject": "other",
                        "value": "panda"
                    }
                ]
            },
            "max_dist": 10
        }
    ],
    "drop_item_chance": 0.001,
    "loot_table": "loot_tables/entities/panda_sneeze.json",
    "prepare_sound": "presneeze",
    "prepare_time": 1.0,
    "sound": "sneeze"
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.sniff`

<Usable type="all"/> <Version add="?"/> <br/>

使实体探测`sniffing_radius`范围内最近的玩家，并更新`minecraft:suspect_tracking`组件的状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.sniff"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="cooldown_range"/>：两次嗅探之间的冷却区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="duration"/>：单次嗅探的持续时间，单位为秒。默认值为`1`。
  - <DataType type="float" name="sniffing_radius"/>：探测半径，单位为方块。默认值为`5`。
  - <DataType type="float" name="suspicion_radius_horizontal"/>：玩家进入该水平半径内时，对其的怒气值上升，单位为方块。默认值为`3`。
  - <DataType type="float" name="suspicion_radius_vertical"/>：玩家进入该垂直半径内时，对其的怒气值上升，单位为方块。默认值为`3`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:behavior.sniff": {
    "duration": 4.16,
    "sniffing_radius": 24,
    "suspicion_radius_horizontal": 6,
    "suspicion_radius_vertical": 20,
    "cooldown_range": {
        "min": 5,
        "max": 10
    },
    "priority": 6
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.sonic_boom`

<Usable type="all"/> <Version add="?"/> <br/>

使实体发动音波攻击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.sonic_boom"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="attack_cooldown"/>：两次音波攻击之间的冷却，单位为秒。默认值为`5`。
  - <DataType type="float" name="attack_damage"/>：音波造成的伤害。默认值为`30`。
  - <DataType type="float" name="attack_range_horizontal"/>：可以对目标造成伤害的水平距离，单位为方块。默认值为`15`。
  - <DataType type="float" name="attack_range_vertical"/>：可以对目标造成伤害的垂直距离，单位为方块。默认值为`20`。
  - <DataType type="string" name="attack_sound"/>：发动攻击的音效事件名。
  - <DataType type="string" name="charge_sound"/>：蓄力时的音效事件名。
  - <DataType type="float" name="duration"/>：该行为的持续时间，单位为秒。默认值为`0`。
  - <DataType type="float" name="duration_until_attack_sound"/>：从开始到播放攻击音效的时长，单位为秒。默认值为`1.7`。
  - <DataType type="float" name="knockback_height_cap"/>：击退垂直分量的上限。默认值为`0`。
  - <DataType type="float" name="knockback_horizontal_strength"/>：击退的水平力度。默认值为`0`。
  - <DataType type="float" name="knockback_vertical_strength"/>：击退的垂直力度。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：追击目标时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

监守者（<FileType type="file" name="warden.json"/>）：

```json showLineNumbers
"minecraft:behavior.sonic_boom": {
    "duration": 3,
    "speed_multiplier": 1.2,
    "attack_damage": 10,
    "attack_cooldown": 2,
    "knockback_vertical_strength": 0.5,
    "knockback_horizontal_strength": 2.5,
    "knockback_height_cap": 0.5,
    "attack_sound": "sonic_boom",
    "charge_sound": "sonic_charge",
    "priority": 3
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.squid_dive`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

允许鱿鱼在水中下潜。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.squid_dive"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

鱿鱼（<FileType type="file" name="squid.json"/>）：

```json showLineNumbers
"minecraft:behavior.squid_dive": {
    "priority": 2
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.squid_flee`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

使鱿鱼向外游走逃离。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.squid_flee"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

发光鱿鱼（<FileType type="file" name="glow_squid.json"/>）：

```json showLineNumbers
"minecraft:behavior.squid_flee": {
    "priority": 2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.squid_idle`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

使鱿鱼在原地附近游动徘徊。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.squid_idle"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

发光鱿鱼（<FileType type="file" name="glow_squid.json"/>）：

```json showLineNumbers
"minecraft:behavior.squid_idle": {
    "priority": 2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.squid_move_away_from_ground`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

允许鱿鱼离开地面方块并回到水中。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.squid_move_away_from_ground"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

发光鱿鱼（<FileType type="file" name="glow_squid.json"/>）：

```json showLineNumbers
"minecraft:behavior.squid_move_away_from_ground": {
    "priority": 1
}
```
</TabItem></Tabs>

---

### `minecraft:behavior.squid_out_of_water`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

使鱿鱼离开水面后紧贴地面不动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.squid_out_of_water"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

发光鱿鱼（<FileType type="file" name="glow_squid.json"/>）：

```json showLineNumbers
"minecraft:behavior.squid_out_of_water": {
    "priority": 2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.stalk_and_pounce_on_target`

<Usable type="all"/> <Version add="?"/> <br/>

使实体悄悄接近目标，进入范围后扑向目标，落地时若仍足够接近则造成伤害。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.stalk_and_pounce_on_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="interest_time"/>：进入扑击范围后蓄势的时间，单位为秒。默认值为`2`。
  - <DataType type="float" name="leap_dist"/>：扑击时朝目标方向跃出的距离，单位为方块。默认值为`0.8`。
  - <DataType type="float" name="leap_height"/>：扑击时跃起的高度，单位为方块。默认值为`0.9`。
  - <DataType type="float" name="max_stalk_dist"/>：放弃追踪的最大距离，单位为方块。默认值为`10`。
  - <DataType type="float" name="pounce_max_dist"/>：可以开始扑击的最大距离，单位为方块。默认值为`5`。
  - <DataType type="boolean" name="set_persistent"/>：为`true`时瞄准玩家后不再被自然清除。默认值为`false`。
  - <DataType type="float" name="stalk_speed"/>：接近目标时的移动速度。默认值为`1.2`。
  - <DataType type="float" name="strike_dist"/>：落地后仍能造成伤害的最大距离，单位为方块。默认值为`2`。
  - <DataType type="object" name="stuck_blocks"/>：扑击失败时会陷进去的方块条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="stuck_time"/>：陷进方块后的停留时间，单位为秒。默认值为`2`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：陷进雪层。

```json showLineNumbers
"minecraft:behavior.stalk_and_pounce_on_target": {
    "priority": 7,
    "stalk_speed": 1.2,
    "max_stalk_dist": 12.0,
    "leap_height": 0.9,
    "leap_dist": 0.8,
    "pounce_max_dist": 5.0,
    "interest_time": 2.0,
    "stuck_time": 2.0,
    "strike_dist": 2.0,
    "stuck_blocks": {
        "test": "is_block",
        "subject": "block",
        "operator": "==",
        "value": "snow_layer"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.stay_near_noteblock`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在听到最近敲响的 note block 后靠近它，并尝试把手上的物品丢过去。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.stay_near_noteblock"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="listen_time"/>：听到 note block 后保持在附近的时间，单位为秒。默认值为`30`。
  - <DataType type="float" name="speed"/>：走向方块时的移动速度。默认值为`1`。
  - <DataType type="float" name="start_distance"/>：距方块多远时开始执行该行为，单位为方块。默认值为`10`。
  - <DataType type="float" name="stop_distance"/>：尝试到达的距方块距离，单位为方块。默认值为`2`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

悦灵（<FileType type="file" name="allay.json"/>）：

```json showLineNumbers
"minecraft:behavior.stay_near_noteblock": {
    "speed": 8,
    "start_distance": 16,
    "stop_distance": 4,
    "priority": 5
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.stay_while_sitting`

<Usable type="all"/> <Version add="?"/> <br/>

使实体处于坐下状态时待在原地，不执行其他行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.stay_while_sitting"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：

```json showLineNumbers
"minecraft:behavior.stay_while_sitting": {
    "priority": 3
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.stomp_attack`

<Usable type="all"/> <Version add="?"/> <br/>

使实体通过踩踏造成范围伤害。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.stomp_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="attack_once"/>：为`true`时该行为在实体整个生命周期内只触发一次。默认值为`false`。
  - <DataType type="string" name="attack_types"/>：该实体会攻击的实体类型。
  - <DataType type="boolean" name="can_spread_on_fire"/>：为`true`时着火的空手实体命中后会点燃目标。默认值为`false`。
  - <DataType type="float" name="cooldown_time"/>：两次攻击之间的冷却，单位为秒。默认值为`1`。
  - <DataType type="float" name="inner_boundary_time_increase"/>：目标超出`path_inner_boundary`时，寻路重算间隔的增量，单位为秒。默认值为`0.25`。
  - <DataType type="float" name="max_path_time"/>：寻路重算间隔的基础上限，单位为秒。默认值为`0.55`。
  - <DataType type="float" name="min_path_time"/>：寻路重算间隔的基础下限，单位为秒。默认值为`0.2`。
  - <DataType type="float" name="no_damage_range_multiplier"/>：与实体基础体积相乘得到「无伤害范围」，目标处于该范围内时该行为进入冷却。默认值为`2`。
  - <DataType type="object" name="on_attack"/>：攻击命中时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_kill"/>：击杀目标时触发的事件，结构同上。
  - <DataType type="float" name="outer_boundary_time_increase"/>：目标超出`path_outer_boundary`时，寻路重算间隔的增量，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="path_fail_time_increase"/>：无法沿当前路径移动时，寻路重算间隔的增量，单位为秒。默认值为`0.75`。
  - <DataType type="float" name="path_inner_boundary"/>：超过该距离时按`inner_boundary_time_increase`增加间隔，单位为方块。默认值为`16`。
  - <DataType type="float" name="path_outer_boundary"/>：超过该距离时按`outer_boundary_time_increase`增加间隔，单位为方块。默认值为`32`。
  - <DataType type="int" name="random_stop_interval"/>：以`1/N`的概率中断当前攻击，`N`取该值。默认值为`0`。
  - <DataType type="float" name="reach_multiplier"/>：与实体基础体积相乘得到造成伤害前的最小目标距离。默认值为`2`。
  - <DataType type="boolean" name="require_complete_path"/>：为`true`时必须存在从实体到目标的完整寻路路径。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：追击目标时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="stomp_range_multiplier"/>：与实体基础体积相乘得到踩踏的范围伤害半径。默认值为`2`。
  - <DataType type="boolean" name="track_target"/>：为`true`时即使没有硬编码的感知组件也会追踪目标。默认值为`false`。
  - <DataType type="float" name="x_max_rotation"/>：瞄准时每次最多旋转的角度（X 轴），单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：瞄准时头部每次最多旋转的角度（Y 轴），单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

北极熊（<FileType type="file" name="polar_bear.json"/>）：

```json showLineNumbers
"minecraft:behavior.stomp_attack": {
    "priority": 1,
    "track_target": true,
    "require_complete_path": true,
    "stomp_range_multiplier": 2.0,
    "no_damage_range_multiplier": 2.0
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.stomp_turtle_egg`

<Usable type="all"/> <Version add="?"/> <br/>

使实体前往踩踏海龟蛋。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.stomp_turtle_egg"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="goal_radius"/>：距目标多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="int" name="interval"/>：每刻以`1/interval`的概率触发该行为。默认值为`120`。
  - <DataType type="int" name="search_count"/>：每刻在搜索范围内随机抽查的方块数量，`0`表示全部检查。默认值为`10`。
  - <DataType type="int" name="search_height"/>：搜索海龟蛋时的垂直范围，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_range"/>：搜索海龟蛋时的水平范围，单位为方块。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

溺尸（<FileType type="file" name="drowned.json"/>）：

```json showLineNumbers
"minecraft:behavior.stomp_turtle_egg": {
    "goal_radius": 1.14,
    "priority": 4,
    "search_height": 2,
    "interval": 20,
    "search_range": 10,
    "speed_multiplier": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.stroll_towards_village`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在搜索范围内前往村庄中的随机位置。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.stroll_towards_village"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown_time"/>：再次使用该行为前的冷却时间，单位为秒。默认值为`8`。
  - <DataType type="float" name="goal_radius"/>：距目标多近即视为到达，单位为方块。默认值为`1.5`。
  - <DataType type="int" name="search_range"/>：搜索村庄的距离，小于等于`0`表示不限距离、直接取最近的村庄。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="start_chance"/>：开始该行为的概率，取值 0 到 1。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

狐狸（<FileType type="file" name="fox.json"/>）：

```json showLineNumbers
"minecraft:behavior.stroll_towards_village": {
    "priority": 11,
    "speed_multiplier": 1.0,
    "goal_radius": 3.0,
    "cooldown_time": 10.0,
    "search_range": 32,
    "start_chance": 0.005
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.summon_entity`

<Usable type="all"/> <Version add="?"/> <br/>

使实体通过召唤其他实体来攻击目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.summon_entity"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="summon_choices"/>：可用的召唤方案列表，每次激活时按权重随机挑选。默认值为空数组。
    - <DataType type="object"/>：一种召唤方案。
      - <DataType type="float" name="cast_duration"/>：施法持续时间，单位为秒，`-1`表示不施法。默认值为`-1`。
      - <DataType type="float" name="cooldown_time"/>：该方案的冷却时间，单位为秒。默认值为`0`。
      - <DataType type="boolean" name="do_casting"/>：为`true`时播放施法动作。默认值为`true`。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="float" name="max_activation_range"/>：触发该方案的最大距离，单位为方块。默认值为`32`。
      - <DataType type="float" name="min_activation_range"/>：触发该方案的最小距离，单位为方块。默认值为`1`。
      - <DataType type="string" name="particle_color"/>：施法粒子的颜色，可写十六进制颜色字符串或`[R, G, B]`数组。
      - <DataType type="array" name="sequence"/>：召唤过程中按顺序执行的步骤。默认值为空数组。
        - <DataType type="object"/>：一个召唤步骤。
          - <DataType type="float" name="base_delay"/>：相对上一个步骤的延迟，单位为秒。默认值为`0`。
          - <DataType type="float" name="delay_per_summon"/>：每个被召唤实体之间的延迟，单位为秒。默认值为`0`。
          - <DataType type="float" name="entity_lifespan"/>：被召唤实体的存活时间，单位为秒，`-1`表示永久。默认值为`-1`。
          - <DataType type="string" name="entity_type"/>：被召唤实体的标识符。
          - <DataType type="int" name="num_entities_spawned"/>：召唤数量。默认值为`1`。
          - <DataType type="string" name="shape"/>：召唤排列方式，可选值为`circle`、`line`。
          - <DataType type="float" name="size"/>：召唤排列的尺寸，含义随`shape`变化。默认值为`1`。
          - <DataType type="string" name="sound_event"/>：召唤时播放的音效事件名。
          - <DataType type="int" name="summon_cap"/>：场上同时存在的被召唤实体数量上限。默认值为`0`。
          - <DataType type="float" name="summon_cap_radius"/>：统计召唤数量上限时的半径，单位为方块。默认值为`0`。
          - <DataType type="string" name="summon_event"/>：被召唤实体生成时触发的实体事件 ID。
          - <DataType type="string" name="target"/>：召唤位置的参照主体，可选值为`self`、`target`。
      - <DataType type="string" name="start_sound_event"/>：开始施法时播放的音效事件名。
      - <DataType type="float" name="weight"/>：该方案被选中的权重。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

唤魔者（<FileType type="file" name="evocation_illager.json"/>）：在近处围成一圈、在远处排成一线召唤尖牙，以及召唤恼鬼。

```json showLineNumbers
"minecraft:behavior.summon_entity": {
    "priority": 2,
    "summon_choices": [
        {
            "cast_duration": 2,
            "particle_color": "#FF664D59",
            "cooldown_time": 5,
            "max_activation_range": 3,
            "min_activation_range": 0,
            "sequence": [
                {
                    "base_delay": 1,
                    "shape": "circle",
                    "num_entities_spawned": 5,
                    "delay_per_summon": 0,
                    "entity_lifespan": 1.1,
                    "entity_type": "minecraft:evocation_fang",
                    "size": 1.5,
                    "sound_event": "prepare.attack",
                    "target": "self"
                }
            ],
            "start_sound_event": "cast.spell",
            "weight": 3
        },
        {
            "cast_duration": 5,
            "particle_color": "#FFB3B3CC",
            "cooldown_time": 17,
            "sequence": [
                {
                    "base_delay": 5,
                    "entity_type": "minecraft:vex",
                    "shape": "circle",
                    "num_entities_spawned": 3,
                    "summon_cap_radius": 16,
                    "size": 1,
                    "sound_event": "prepare.summon",
                    "summon_cap": 8,
                    "summon_event": "minecraft:add_damage_timer",
                    "target": "self"
                }
            ],
            "weight": 1
        }
    ]
}
```

> **备注**：示例保留了原版的两种召唤方案，并省略了排成一线的尖牙方案。

</TabItem></Tabs>

---

### `minecraft:behavior.swell`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对苦力怕可用。"/> <br/>

使苦力怕在玩家靠近时膨胀。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.swell"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="start_distance"/>：目标进入该距离时开始膨胀，单位为方块。默认值为`10`。
  - <DataType type="float" name="stop_distance"/>：目标离开该距离时停止膨胀，单位为方块。默认值为`2`。
</treeview>

> **备注**：schema 的默认值（`start_distance`为`10`、`stop_distance`为`2`）与原版苦力怕的实际配置相反：原版把开始膨胀的距离（2.5）设得比停止膨胀的距离（6）更近。建议按原版数值填写。

</TabItem><TabItem value="示例" label="示例">

苦力怕（<FileType type="file" name="creeper.json"/>）：

```json showLineNumbers
"minecraft:behavior.swell": {
    "priority": 2,
    "start_distance": 2.5,
    "stop_distance": 6
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.swim_idle`

<Usable type="all"/> <Version add="?"/> <br/>

使处于水中的实体原地停留一段时间。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.swim_idle"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="idle_time"/>：保持停留的时间，单位为秒。默认值为`5`。
  - <DataType type="float" name="success_rate"/>：进入停留状态的概率，`1.0`表示 100%。默认值为`0.1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：

```json showLineNumbers
"minecraft:behavior.swim_idle": {
    "priority": 7,
    "idle_time": 5.0,
    "success_rate": 0.05
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.swim_up_for_breath`

<Usable type="all"/> <Version add="?"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:breathable组件。"/> <br/>

使实体在氧气即将耗尽时游向空气。

另见：_[`minecraft:breathable`](#minecraftbreathable)组件_、_[EntityBreathableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitybreathablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.swim_up_for_breath"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="material_type"/>：实体所处液体的材质。只有下方是该材质的空气方块才会被视作有效目标。可选值为`water`、`lava`，默认值为`water`。
  - <DataType type="int" name="search_height"/>：向上搜索空气方块的高度，单位为方块。默认值为`16`。
  - <DataType type="int" name="search_radius"/>：以实体为中心的水平搜索半径，单位为方块。默认值为`4`。
  - <DataType type="float" name="speed_mod"/>：执行该行为时的移动速度乘数。默认值为`1.4`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

海豚（<FileType type="file" name="dolphin.json"/>）：

```json showLineNumbers
"minecraft:behavior.swim_up_for_breath": {
    "priority": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.swim_wander`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在游泳且未寻路时随意游动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.swim_wander"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="interval"/>：未寻路时开始游动的概率。默认值为`0.00833`。
  - <DataType type="float" name="look_ahead"/>：游动时向前探测障碍的距离。默认值为`5`。
  - <DataType type="float" name="speed_multiplier"/>：游动时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="wander_time"/>：一次游动持续的时间，单位为秒。默认值为`5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

鱼（<FileType type="file" name="fish.json"/>）：

```json showLineNumbers
"minecraft:behavior.swim_wander": {
    "interval": 0.1,
    "look_ahead": 2,
    "priority": 4
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.swim_with_entity`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在水中跟随另一类实体一起游动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.swim_with_entity"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="catch_up_multiplier"/>：与目标方向对齐时的移动速度乘数。默认值为`2.5`。
  - <DataType type="float" name="catch_up_threshold"/>：距目标超过该距离时加速追赶，单位为方块。默认值为`12`。
  - <DataType type="float" name="chance_to_stop"/>：停止跟随当前目标的概率，`1.0`表示 100%。默认值为`0.0333`。
  - <DataType type="array" name="entity_types"/>：可以跟随的实体条件列表。默认值为空数组。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
    - <DataType type="float" name="max_dist"/>：搜索该类实体的最大距离，单位为方块。默认值为`16`。
    - <DataType type="float" name="max_height"/>：该类实体可作为目标的高度上限，`-1`表示不限制。默认值为`-1`。
    - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
    - <DataType type="int" name="cooldown"/>：再次选中该类实体前需要等待的秒数。默认值为`0`。
    - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
    - <DataType type="boolean" name="must_see"/>：为`true`时该类实体必须可见才会被选中。
    - <DataType type="int" name="must_see_forget_duration"/>：看不见该类实体后多少秒放弃，单位为秒。默认值为`3`。
    - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时检查该类实体的数量是否占优。默认值为`false`。
    - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
    - <DataType type="float" name="walk_speed_multiplier"/>：接近该类实体时的行走速度乘数。默认值为`1`。
    - <DataType type="float" name="sprint_speed_multiplier"/>：接近该类实体时的疾跑速度乘数。默认值为`1`。
  - <DataType type="float" name="match_direction_threshold"/>：距目标小于该距离时与目标方向对齐，单位为方块。默认值为`2`。
  - <DataType type="float" name="search_range"/>：搜索可跟随实体的半径，单位为方块。默认值为`20`。
  - <DataType type="float" name="speed_multiplier"/>：追赶目标时的移动速度乘数。默认值为`1.5`。
  - <DataType type="float" name="state_check_interval"/>：检查是否需要追赶或对齐方向的间隔，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="stop_distance"/>：距目标小于该距离时停止跟随，单位为方块。默认值为`5`。
  - <DataType type="float" name="success_rate"/>：在尚未跟随时开始跟随的概率，`1.0`表示 100%。默认值为`0.1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

海豚（<FileType type="file" name="dolphin.json"/>）：跟随玩家。

```json showLineNumbers
"minecraft:behavior.swim_with_entity": {
    "priority": 4,
    "success_rate": 0.1,
    "chance_to_stop": 0.0333,
    "state_check_interval": 0.5,
    "catch_up_threshold": 12.0,
    "match_direction_threshold": 2.0,
    "catch_up_multiplier": 2.5,
    "speed_multiplier": 1.5,
    "search_range": 20.0,
    "stop_distance": 5.0,
    "entity_types": [
        {
            "filters": {
                "test": "is_family",
                "subject": "other",
                "value": "player"
            }
        }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.swoop_attack`

<Usable type="all"/> <Version add="?"/> <br/>

使实体俯冲攻击目标，适合飞行生物。发生水平碰撞或目标远离时行为结束。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.swoop_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="damage_reach"/>：与实体基础体积相加，得到造成伤害时允许的最大目标距离。默认值为`0.2`。
  - <DataType type="object" name="delay_range"/>：两次俯冲之间的延迟区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：扑向目标时的移动速度乘数。默认值为`1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

幻翼（<FileType type="file" name="phantom.json"/>）：

```json showLineNumbers
"minecraft:behavior.swoop_attack": {
    "priority": 2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.take_block`

<Usable type="all"/> <Version add="?"/> <br/>

使实体从世界中取走方块并携带在身上。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.take_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="affected_by_griefing_rule"/>：为`true`时该行为受「生物破坏」游戏规则影响。默认值为`true`。
  - <DataType type="array" name="blocks"/>：允许取走的方块列表，为空表示所有方块都可取走。默认值为空数组。
    - <DataType type="string"/>：方块 ID，也可写成含`name`、`states`、`tags`的对象。
  - <DataType type="object" name="can_take"/>：取走方块前需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="chance"/>：每刻尝试取走方块的概率，取值 0 到 1。默认值为`1`。
  - <DataType type="object" name="on_take"/>：取走方块时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="boolean" name="requires_line_of_sight"/>：为`true`时需要看见方块才能取走。默认值为`true`。
  - <DataType type="object" name="xz_range"/>：水平方向上搜索方块的范围区间，单位为方块。
    - <DataType type="int" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="int" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="y_range"/>：垂直方向上搜索方块的范围区间，单位为方块。
    - <DataType type="int" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="int" name="max"/>：区间上限。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

末影人（<FileType type="file" name="enderman.json"/>）：示例只保留部分方块，原版列表更长。

```json showLineNumbers
"minecraft:behavior.take_block": {
    "priority": 11,
    "xz_range": {
        "min": -2,
        "max": 2
    },
    "y_range": {
        "min": 0,
        "max": 3
    },
    "chance": 0.05,
    "blocks": [
        "dirt",
        "grass_block",
        "podzol",
        "coarse_dirt",
        "mycelium",
        "mud",
        "sand",
        "red_sand",
        "gravel"
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.take_flower`

<Usable type="all"/> <Version add="?"/> <br/>

使实体接受另一实体通过`minecraft:behavior.offer_flower`递来的花。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.take_flower"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：接受花朵需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="max_head_rotation_y"/>：抬头注视目标时的最大 Y 轴旋转角度，单位为度。默认值为`30`。
  - <DataType type="float" name="max_rotation_x"/>：注视目标时的最大 X 轴旋转角度，单位为度。默认值为`30`。
  - <DataType type="float" name="max_wait_time"/>：接花前随机等待时间的上限，单位为秒。默认值为`20`。
  - <DataType type="float" name="min_distance_to_target"/>：视为已到达目标的最小距离，单位为方块。默认值为`2`。
  - <DataType type="float" name="min_wait_time"/>：接花前随机等待时间的下限，单位为秒。默认值为`4`。
  - <DataType type="object" name="on_take_flower"/>：接到花时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="array" name="search_area"/>：搜索递花对象的范围，写作`[x, y, z]`，也可写成含`x`、`y`、`z`的对象。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`0.5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铜傀儡（<FileType type="file" name="copper_golem.json"/>）：

```json showLineNumbers
"minecraft:behavior.take_flower": {
    "filters": {
        "all_of": [
            {
                "test": "is_daytime",
                "value": true
            },
            {
                "domain": "minecraft:has_flower",
                "test": "bool_property",
                "value": false
            }
        ]
    },
    "on_take_flower": {
        "event": "minecraft:on_take_flower"
    },
    "priority": 4
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.target_when_pushed`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在被其他实体推动时把对方设为目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.target_when_pushed"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="entity_types"/>：目标实体的条件，可写成数组或单个对象。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
    - <DataType type="float" name="max_dist"/>：搜索该类实体的最大距离，单位为方块。默认值为`16`。
    - <DataType type="float" name="max_height"/>：目标所在高度的上限，`-1`表示不限制。默认值为`-1`。
    - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
    - <DataType type="int" name="cooldown"/>：对该类实体生效后的冷却时间，单位为秒。默认值为`0`。
    - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
    - <DataType type="boolean" name="must_see"/>：是否必须看见对方才会生效。
    - <DataType type="int" name="must_see_forget_duration"/>：看不见对方后多少秒放弃，单位为秒。默认值为`3`。
    - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时仅在对方数量占优时生效。默认值为`false`。
    - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
    - <DataType type="float" name="walk_speed_multiplier"/>：走向该类实体时的行走速度乘数。默认值为`1`。
    - <DataType type="float" name="sprint_speed_multiplier"/>：走向该类实体时的疾跑速度乘数。默认值为`1`。
  - <DataType type="float" name="percent_chance"/>：被推动时锁定对方的概率，`100`表示 100%。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铁傀儡（<FileType type="file" name="iron_golem.json"/>）：被非苦力怕的怪物推动时有 5% 的概率反击。

```json showLineNumbers
"minecraft:behavior.target_when_pushed": {
    "entity_types": [
        {
            "filters": {
                "all_of": [
                    {
                        "subject": "other",
                        "test": "is_family",
                        "value": "monster"
                    },
                    {
                        "operator": "not",
                        "test": "is_family",
                        "subject": "other",
                        "value": "creeper"
                    }
                ]
            }
        }
    ],
    "percent_chance": 5.0,
    "priority": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.teleport_to_owner`

<Usable type="all"/> <Version add="?"/> <br/>

使实体传送到其主人身边。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.teleport_to_owner"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown"/>：再次尝试传送前的冷却时间，单位为秒。默认值为`1`。
  - <DataType type="object" name="filters"/>：允许传送需满足的条件。见[实体过滤器](./filters)。
</treeview>

</TabItem><TabItem value="示例" label="示例">

猫（<FileType type="file" name="cat.json"/>）：主人距离超过 12 格且自己处于恐慌状态时传送。

```json showLineNumbers
"minecraft:behavior.teleport_to_owner": {
    "priority": 0,
    "filters": {
        "all_of": [
            {
                "test": "owner_distance",
                "operator": ">",
                "value": 12
            },
            {
                "test": "is_panicking"
            }
        ]
    }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.tempt`

<Usable type="all"/> <Version add="?"/> <br/>

使实体被手持特定物品的玩家吸引并跟随。移动依赖寻路。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.tempt"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="can_get_scared"/>：为`true`时玩家在极近距离内快速移动会让实体停止被吸引。默认值为`false`。
  - <DataType type="boolean" name="can_tempt_vertically"/>：为`true`时计算与玩家的垂直距离。默认值为`false`。
  - <DataType type="boolean" name="can_tempt_while_ridden"/>：为`true`时被骑乘也能被吸引。默认值为`false`。
  - <DataType type="array" name="items"/>：可以吸引该实体的物品列表。默认值为空数组。
    - <DataType type="string"/>：物品 ID，也可写成含`name`的对象。
  - <DataType type="object" name="on_tempt_end"/>：停止被吸引时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_tempt_start"/>：开始被吸引时触发的事件，结构同上。
  - <DataType type="object" name="sound_interval"/>：吸引期间播放音效的间隔区间，单位为刻。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：跟随玩家时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="stop_distance"/>：距玩家多近时停止跟随，单位为方块。
  - <DataType type="string" name="tempt_sound"/>：吸引期间播放的音效事件名。
  - <DataType type="float" name="within_radius"/>：玩家手持物品时可以吸引该实体的距离，单位为方块。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：被手持蜘蛛眼吸引。

```json showLineNumbers
"minecraft:behavior.tempt": {
    "priority": 3,
    "speed_multiplier": 1.25,
    "can_tempt_vertically": true,
    "items": [
        "spider_eye"
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.timer_flag_1`

<Usable type="all"/> <Version add="?"/> <br/>

启动时触发事件并等待随机时长后结束，结束或被打断时再次触发事件。与`timer_flag_2`、`timer_flag_3`结构相同，编号只用于让同一实体挂载多个独立计时器。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.timer_flag_1"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="cooldown_range"/>：两次触发之间的冷却区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="duration_range"/>：单次持续时间的随机区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="on_end"/>：行为结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_start"/>：行为开始时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：

```json showLineNumbers
"minecraft:behavior.timer_flag_1": {
    "priority": 0,
    "cooldown_range": {
        "min": 2.5,
        "max": 2.5
    },
    "duration_range": {
        "min": 5.0,
        "max": 20.0
    },
    "on_start": {
        "event": "minecraft:stop_peeking"
    },
    "on_end": {
        "event": "minecraft:start_peeking"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.timer_flag_2`

<Usable type="all"/> <Version add="?"/> <br/>

结构同`timer_flag_1`，编号不同，用于在同一实体上挂载第二个独立计时器。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.timer_flag_2"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="cooldown_range"/>：两次触发之间的冷却区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="duration_range"/>：单次持续时间的随机区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="on_end"/>：行为结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_start"/>：行为开始时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

嗅探兽（<FileType type="file" name="sniffer.json"/>）：

```json showLineNumbers
"minecraft:behavior.timer_flag_2": {
    "priority": 2,
    "control_flags": [
        "move"
    ],
    "cooldown_range": {
        "min": 0.0,
        "max": 0.0
    },
    "duration_range": {
        "min": 2.0,
        "max": 5.0
    },
    "on_end": {
        "event": "on_rising_end",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.timer_flag_3`

<Usable type="all"/> <Version add="?"/> <br/>

结构同`timer_flag_1`，编号不同，用于在同一实体上挂载第三个独立计时器。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.timer_flag_3"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="cooldown_range"/>：两次触发之间的冷却区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="duration_range"/>：单次持续时间的随机区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="on_end"/>：行为结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_start"/>：行为开始时触发的事件，结构同上。
</treeview>

</TabItem><TabItem value="示例" label="示例">

嗅探兽（<FileType type="file" name="sniffer.json"/>）：

```json showLineNumbers
"minecraft:behavior.timer_flag_3": {
    "priority": 5,
    "cooldown_range": {
        "min": 0.0,
        "max": 0.0
    },
    "duration_range": {
        "min": 2.0,
        "max": 5.0
    },
    "on_end": {
        "event": "on_feeling_happy_end",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.trade_interest`

<Usable type="all"/> <Version add="?"/> <br/>

使实体注视手持可交易物品的玩家。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.trade_interest"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="carried_item_switch_time"/>：展示某件交易物品后，尝试换成另一件同价物品的最长等待时间，单位为秒。默认值为`2`。
  - <DataType type="float" name="cooldown"/>：再次使用该行为前的冷却时间，单位为秒。默认值为`2`。
  - <DataType type="float" name="interest_time"/>：展示交易物品的总时长上限，单位为秒。默认值为`45`。
  - <DataType type="float" name="remove_item_time"/>：玩家不再持有可交易物品后，收起展示物品的等待时间，单位为秒。默认值为`1`。
  - <DataType type="float" name="within_radius"/>：玩家手持可交易物品时可以引起注意的距离，单位为方块。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：

```json showLineNumbers
"minecraft:behavior.trade_interest": {
    "carried_item_switch_time": 2,
    "cooldown": 2,
    "interest_time": 45,
    "within_radius": 6,
    "priority": 5,
    "remove_item_time": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.trade_with_player`

<Usable type="all"/> <Version add="?"/> <br/>

允许玩家与该实体交易。行为开始时实体会停止寻路。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.trade_with_player"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：允许交易需满足的条件。见[实体过滤器](./filters)。
  - <DataType type="float" name="max_distance_from_player"/>：距玩家超过该距离时退出交易行为，单位为方块。默认值为`8`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager.json"/>）：

```json showLineNumbers
"minecraft:behavior.trade_with_player": {
    "filters": {
        "all_of": [
            {
                "all_of": [
                    {
                        "test": "in_water",
                        "value": false
                    }
                ]
            },
            {
                "any_of": [
                    {
                        "test": "on_ground",
                        "value": true
                    },
                    {
                        "test": "is_sleeping",
                        "value": true
                    }
                ]
            }
        ]
    },
    "priority": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.transport_items`

<Usable type="all"/> <Version add="?"/> <br/>

使实体在容器之间搬运物品。铜傀儡用它把铜箱中的物品放进普通箱子。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.transport_items"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="allow_simultaneous_interaction"/>：为`true`时等待容器不再被其他实体使用后才开始交互。默认值为`false`。
  - <DataType type="array" name="allowed_items"/>：唯一允许搬运的物品列表。与`disallowed_items`都为空时搬运所有物品。默认值为空数组。
    - <DataType type="string"/>：物品 ID，也可写成含`name`的对象。
  - <DataType type="array" name="destination_container_types"/>：可作为目的地的方块容器列表。默认值为空数组。
    - <DataType type="string"/>：方块 ID，也可写成含`name`、`states`、`tags`的对象。
  - <DataType type="array" name="disallowed_items"/>：禁止搬运的物品列表。非空时`allowed_items`必须为空。默认值为空数组。
    - <DataType type="string"/>：物品 ID，也可写成含`name`的对象。
  - <DataType type="int" name="idle_cooldown"/>：找不到可用容器时行为停止激活的时间，单位为秒。默认值为`20`。
  - <DataType type="int" name="initial_cooldown"/>：实体生成或挂载该组件后延迟开始的时间，单位为秒。默认值为`0`。
  - <DataType type="float" name="interaction_time"/>：在容器前交互的时间，单位为秒。默认值为`3`。
  - <DataType type="int" name="max_stack_size"/>：最多尝试从容器中取出的物品堆叠数，取值 1 到 64。默认值为`64`。
  - <DataType type="int" name="max_visited_containers"/>：在进入冷却、重新开始之前最多访问的容器数量。默认值为`16`。
  - <DataType type="string" name="place_strategy"/>：放置策略。可选值为`any`（有空位就放）、`with_matching`（容器中已有同类物品才放）、`with_matching_or_empty`（两者满足其一即可），默认值为`any`。
  - <DataType type="array" name="search_distance"/>：搜索容器的范围，写作`[x, y, z]`，也可写成含`x`、`y`、`z`的对象。
  - <DataType type="string" name="search_strategy"/>：搜索策略。可选值为`nearest`（最近的容器）、`random`（范围内的随机容器），默认值为`random`。
  - <DataType type="array" name="source_container_types"/>：可作为来源的方块容器列表。默认值为空数组。
    - <DataType type="string"/>：方块 ID，也可写成含`name`、`states`、`tags`的对象。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铜傀儡（<FileType type="file" name="copper_golem.json"/>）：从各类铜箱搬运到箱子。示例只保留两种铜箱。

```json showLineNumbers
"minecraft:behavior.transport_items": {
    "source_container_types": [
        {
            "name": "minecraft:copper_chest"
        },
        {
            "name": "minecraft:exposed_copper_chest"
        }
    ],
    "destination_container_types": [
        {
            "name": "minecraft:chest"
        },
        {
            "name": "minecraft:trapped_chest"
        }
    ],
    "max_stack_size": 16,
    "search_strategy": "nearest",
    "search_distance": [32, 8],
    "priority": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.use_kinetic_weapon`

<Usable type="all"/> <Version add="?"/> <br/>

使实体使用动能武器，间歇性地冲向目标并在攻击后重新拉开距离。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.use_kinetic_weapon"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="approach_distance"/>：距目标多近时开始使用动能武器，单位为方块。默认值为`8`。
  - <DataType type="boolean" name="attack_once"/>：为`true`时该行为在实体整个生命周期内只触发一次。默认值为`false`。
  - <DataType type="string" name="attack_types"/>：该实体会攻击的实体类型。
  - <DataType type="boolean" name="can_spread_on_fire"/>：为`true`时着火的空手实体命中后会点燃目标。默认值为`false`。
  - <DataType type="object" name="cooldown_distance"/>：进入冷却时的距离区间，单位为方块。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="cooldown_speed_multiplier"/>：冷却期间的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="cooldown_time"/>：两次攻击之间的冷却时间，单位为秒。默认值为`1`。
  - <DataType type="boolean" name="hijack_mount_navigation"/>：为`true`时用该行为的逻辑覆盖坐骑的寻路，需要坐骑也运行该行为。默认值为`false`。
  - <DataType type="float" name="inner_boundary_time_increase"/>：目标超出`path_inner_boundary`时，寻路重算间隔的增量，单位为秒。默认值为`0.25`。
  - <DataType type="float" name="max_path_time"/>：寻路重算间隔的基础上限，单位为秒。默认值为`0.55`。
  - <DataType type="float" name="melee_fov"/>：用于发现目标的视野角度，单位为度。默认值为`90`。
  - <DataType type="float" name="min_path_time"/>：寻路重算间隔的基础下限，单位为秒。默认值为`0.2`。
  - <DataType type="object" name="on_attack"/>：攻击命中时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_kill"/>：击杀目标时触发的事件，结构同上。
  - <DataType type="float" name="outer_boundary_time_increase"/>：目标超出`path_outer_boundary`时，寻路重算间隔的增量，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="path_fail_time_increase"/>：无法沿当前路径移动时，寻路重算间隔的增量，单位为秒。默认值为`0.75`。
  - <DataType type="float" name="path_inner_boundary"/>：超过该距离时按`inner_boundary_time_increase`增加间隔，单位为方块。默认值为`16`。
  - <DataType type="float" name="path_outer_boundary"/>：超过该距离时按`outer_boundary_time_increase`增加间隔，单位为方块。默认值为`32`。
  - <DataType type="int" name="random_stop_interval"/>：以`1/N`的概率中断当前攻击，`N`取该值。默认值为`0`。
  - <DataType type="object" name="reposition_distance"/>：攻击后重新拉开距离的目标区间，单位为方块。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="reposition_speed_multiplier"/>：重新拉开距离时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="require_complete_path"/>：为`true`时必须存在从实体到目标的完整寻路路径。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：追击目标时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="track_target"/>：为`true`时即使没有硬编码的感知组件也会追踪目标。默认值为`false`。
  - <DataType type="float" name="weapon_min_speed_multiplier"/>：武器`minecraft:kinetic_weapon`组件中各项`min_speed`条件的乘数。默认值为`1`。
  - <DataType type="float" name="weapon_reach_multiplier"/>：武器`minecraft:kinetic_weapon`组件中`reach`的乘数。默认值为`1`。
  - <DataType type="float" name="x_max_rotation"/>：瞄准时每次最多旋转的角度（X 轴），单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：瞄准时头部每次最多旋转的角度（Y 轴），单位为度。默认值为`30`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

尸壳（<FileType type="file" name="husk.json"/>）：

```json showLineNumbers
"minecraft:behavior.use_kinetic_weapon": {
    "approach_distance": 12,
    "reposition_distance": {
        "min": 8,
        "max": 9
    },
    "reposition_speed_multiplier": 4,
    "cooldown_distance": {
        "min": 11,
        "max": 13
    },
    "cooldown_speed_multiplier": 4,
    "weapon_reach_multiplier": 0.5,
    "weapon_min_speed_multiplier": 0.2,
    "hijack_mount_navigation": true,
    "speed_multiplier": 4,
    "track_target": true,
    "priority": 3
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.vex_copy_owner_target`

<Usable type="all"/> <Version add="?"/> <br/>

使恼鬼把主人当前的攻击目标设为自己的目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.vex_copy_owner_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

> **备注**：官方文档中该组件的参数只有`priority`与`control_flags`；具体是否生效还取决于主人自身是否有攻击目标。

</TabItem><TabItem value="示例" label="示例">

（schema 未给出该组件的参数结构，原版也无用例，以下为最小写法。）

```json showLineNumbers
"minecraft:behavior.vex_copy_owner_target": {
    "priority": 2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.vex_random_move`

<Usable type="all"/> <Version add="?"/> <br/>

使恼鬼随机移动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.vex_random_move"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

> **备注**：官方文档中该组件的参数只有`priority`与`control_flags`。

</TabItem><TabItem value="示例" label="示例">

（schema 未给出该组件的参数结构，原版也无用例，以下为最小写法。）

```json showLineNumbers
"minecraft:behavior.vex_random_move": {
    "priority": 2
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.wither_random_attack_pos_goal`

<Usable type="all"/> <Version add="?"/> <Highlight text="限定实体类型" tooltip="该组件仅对凋灵可用。"/> <br/>

使凋灵随机发起攻击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.wither_random_attack_pos_goal"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

</TabItem><TabItem value="示例" label="示例">

凋灵（<FileType type="file" name="wither.json"/>）：

```json showLineNumbers
"minecraft:behavior.wither_random_attack_pos_goal": {
    "priority": 3
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.wither_target_highest_damage`

<Usable type="all"/> <Version add="?"/> <br/>

使凋灵优先攻击对它造成伤害最多的实体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.wither_target_highest_damage"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="entity_types"/>：目标实体的条件，可写成数组或单个对象。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
    - <DataType type="float" name="max_dist"/>：搜索该类实体的最大距离，单位为方块。默认值为`16`。
    - <DataType type="float" name="max_height"/>：目标所在高度的上限，`-1`表示不限制。默认值为`-1`。
    - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
    - <DataType type="int" name="cooldown"/>：对该类实体生效后的冷却时间，单位为秒。默认值为`0`。
    - <DataType type="int" name="priority"/>：该实体类型在候选列表中的优先级，数值越小越优先。默认值为`0`。
    - <DataType type="boolean" name="must_see"/>：是否必须看见对方才会生效。
    - <DataType type="int" name="must_see_forget_duration"/>：看不见对方后多少秒放弃，单位为秒。默认值为`3`。
    - <DataType type="boolean" name="check_if_outnumbered"/>：为`true`时仅在对方数量占优时生效。默认值为`false`。
    - <DataType type="boolean" name="reevaluate_description"/>：为`true`时，对方一旦不再满足条件就停止将其作为目标。默认值为`false`。
    - <DataType type="float" name="walk_speed_multiplier"/>：走向该类实体时的行走速度乘数。默认值为`1`。
    - <DataType type="float" name="sprint_speed_multiplier"/>：走向该类实体时的疾跑速度乘数。默认值为`1`。
</treeview>

> **备注**：原版未写出`entity_types`，因此对所有实体生效。

</TabItem><TabItem value="示例" label="示例">

凋灵（<FileType type="file" name="wither.json"/>）：

```json showLineNumbers
"minecraft:behavior.wither_target_highest_damage": {
    "priority": 1
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.work`

<Usable type="all"/> <Version add="?"/> <br/>

使 NPC 前往并使用其工作站点方块。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.work"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="active_time"/>：在工作站点停留的时长，单位为刻。默认值为`0`。
  - <DataType type="boolean" name="can_work_in_rain"/>：为`true`时工作站点被雨淋到也能工作。默认值为`false`。
  - <DataType type="int" name="goal_cooldown"/>：该行为再次可用前的冷却，单位为刻。默认值为`0`。
  - <DataType type="object" name="on_arrival"/>：抵达工作站点时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="int" name="sound_delay_max"/>：播放音效间隔的上限。默认值为`0`。
  - <DataType type="int" name="sound_delay_min"/>：播放音效间隔的下限。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`0.5`。
  - <DataType type="int" name="work_in_rain_tolerance"/>：`can_work_in_rain`为`false`时，降雨不会打断该行为、还能继续工作的剩余刻数。默认值为`-1`。
</treeview>

> **备注**：同一实体的不同组件组里，该组件也常写作空对象`{}`，此时`priority`取默认值`0`，会抢占几乎所有其他行为，一般应显式指定优先级。

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：

```json showLineNumbers
"minecraft:behavior.work": {
    "priority": 7,
    "active_time": 250,
    "on_arrival": {
        "event": "minecraft:resupply_trades",
        "target": "self"
    },
    "can_work_in_rain": false,
    "speed_multiplier": 0.5,
    "goal_cooldown": 200,
    "sound_delay_max": 200,
    "sound_delay_min": 100,
    "work_in_rain_tolerance": 100
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.work_composter`

<Usable type="all"/> <Version add="?"/> <br/>

使 NPC 使用堆肥桶，把多余的种子转化为骨粉。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.work_composter"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="active_time"/>：在工作站点停留的时长，单位为刻。默认值为`0`。
  - <DataType type="int" name="block_interaction_max"/>：与堆肥桶交互的最大次数。默认值为`1`。
  - <DataType type="boolean" name="can_empty_composter"/>：为`true`时可以取出装满的堆肥桶。默认值为`true`。
  - <DataType type="boolean" name="can_fill_composter"/>：为`true`时可以往未满的堆肥桶中添加物品。默认值为`true`。
  - <DataType type="boolean" name="can_work_in_rain"/>：为`true`时工作站点被雨淋到也能工作。默认值为`false`。
  - <DataType type="int" name="goal_cooldown"/>：该行为再次可用前的冷却，单位为刻。默认值为`0`。
  - <DataType type="int" name="items_per_use_max"/>：每次交互最多添加的物品数量。默认值为`20`。
  - <DataType type="int" name="min_item_count"/>：每种可堆肥物品最多消耗的数量，超出部分若可堆肥才会被处理。默认值为`10`。
  - <DataType type="object" name="on_arrival"/>：抵达堆肥桶时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](./filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`0.5`。
  - <DataType type="int" name="use_block_max"/>：与堆肥桶交互间隔的上限。默认值为`200`。
  - <DataType type="int" name="use_block_min"/>：与堆肥桶交互间隔的下限。默认值为`100`。
  - <DataType type="int" name="work_in_rain_tolerance"/>：`can_work_in_rain`为`false`时，降雨不会打断该行为、还能继续工作的剩余刻数。默认值为`-1`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：

```json showLineNumbers
"minecraft:behavior.work_composter": {
    "active_time": 250,
    "priority": 9,
    "can_work_in_rain": false,
    "on_arrival": {
        "event": "minecraft:resupply_trades",
        "target": "self"
    },
    "goal_cooldown": 200,
    "speed_multiplier": 0.5,
    "work_in_rain_tolerance": 100
}
```

</TabItem></Tabs>

---

---

## 标记组件

标记组件是用于标记实体状态的组件，它们并不具有任何功能，只能在相关 Molang 中读取其状态。在旧版本中，常常使用这些标记组件记录实体的状态，但 1.19.50 开放的[实体属性](./property)完全可以完全替代下文的标记组件，因此现在这些组件已不常使用。

### `minecraft:is_baby`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体为幼年体。

另见：_[EntityIsBabyComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisbabycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_baby"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体为幼年体（<FileType type="file" name="armadillo.json"/>）：

```json showLineNumbers
"minecraft:is_baby": {}
```
</TabItem></Tabs>

---

### `minecraft:is_charged`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体为充能状态。

另见：_[EntityIsChargedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityischargedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_charged"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体处于闪电强化的状态（<FileType type="file" name="creeper.json"/>）：

```json showLineNumbers
"minecraft:is_charged": {}
```
</TabItem></Tabs>

---

### `minecraft:is_chested`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前携带箱子。

另见：_[EntityIsChestedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityischestedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_chested"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前驮着箱子（<FileType type="file" name="donkey.json"/>）：

```json showLineNumbers
"minecraft:is_chested": {}
```
</TabItem></Tabs>

---

### `minecraft:is_ignited`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前处于着火状态。

另见：_[EntityIsIgnitedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisignitedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_ignited"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前处于点燃状态（<FileType type="file" name="tnt_minecart.json"/>）：

```json showLineNumbers
"minecraft:is_ignited": {}
```
</TabItem></Tabs>

---

### `minecraft:is_pregnant`

<Usable type="all"/> <Version add="1.20.0"/> <br/>

设置该实体当前处于怀孕状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_pregnant"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前处于怀孕状态（<FileType type="file" name="sniffer.json"/>）：

```json showLineNumbers
"minecraft:is_pregnant": {}
```
</TabItem></Tabs>

---

### `minecraft:is_saddled`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前装备了鞍。

另见：_[EntityIsSaddledComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityissaddledcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_saddled"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前已装上鞍（<FileType type="file" name="camel.json"/>）：

```json showLineNumbers
"minecraft:is_saddled": {}
```
</TabItem></Tabs>

---

### `minecraft:is_shaking`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前处于颤抖状态。

另见：_[EntityIsShakingComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisshakingcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_shaking"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前正在颤抖（例如正在转化为僵尸）（<FileType type="file" name="hoglin.json"/>）：

```json showLineNumbers
"minecraft:is_shaking": {}
```
</TabItem></Tabs>

---

### `minecraft:is_sheared`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前已被剪毛。

另见：_[EntityIsShearedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisshearedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_sheared"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前已被剪毛（<FileType type="file" name="sheep.json"/>）：

```json showLineNumbers
"minecraft:is_sheared": {}
```
</TabItem></Tabs>

---

### `minecraft:is_stunned`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

设置该实体当前处于眩晕状态。

另见：_[EntityIsStunnedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisstunnedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_stunned"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前处于眩晕状态（<FileType type="file" name="ravager.json"/>）：

```json showLineNumbers
"minecraft:is_stunned": {}
```
</TabItem></Tabs>

---

### `minecraft:is_tamed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前已被驯服。

另见：_[EntityIsTamedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityistamedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_tamed"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前已被驯服（<FileType type="file" name="camel.json"/>）：

```json showLineNumbers
"minecraft:is_tamed": {}
```
</TabItem></Tabs>

---

### `minecraft:mark_variant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

“Mark Variant”通常用于在 `variant` 之外，以按类型区分同一生物的其他外观形态。

另见：_[EntityMarkVariantComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymarkvariantcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:mark_variant"/>：根对象。
  - <DataType type="int" name="value"/>：标记变体的编号，按惯例`0`为基础形态。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：

```json showLineNumbers
"minecraft:mark_variant": {
    "value": 1
}
```
</TabItem></Tabs>

---

### `minecraft:skin_id`

<Usable type="all"/> <Version add="1.12.0"/> <br/>

皮肤 ID 值。

另见：_[EntitySkinIdComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityskinidcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:skin_id"/>：根对象。
  - <DataType type="int" name="value"/>：皮肤编号，按惯例`0`为基础皮肤。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：

```json showLineNumbers
"minecraft:skin_id": {
    "value": 2
}
```
</TabItem></Tabs>

---

### `minecraft:variant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

“Variant”通常用于按类型区分同一生物的不同外观形态。

另见：_[EntityVariantComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityvariantcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:variant"/>：根对象。
  - <DataType type="int" name="value"/>：变体编号，按惯例`0`为基础形态。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：不同颜色的变体分别使用`0`至`4`。

```json showLineNumbers
"minecraft:variant": {
    "value": 3
}
```

</TabItem></Tabs>

---

---

## 弃用组件

弃用组件在新版本中已被其他组件取代或不再生效，仅为兼容旧版本附加包保留，新项目应改用对应的替代组件。

### `minecraft:behavior.enderman_leave_block`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.100" tooltip="在高版本使用minecraft:behavior.place_block组件代替之。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影人可用。"/> <br/>

定义末影人会放下方块。

另见：_[`minecraft:behavior.place_block`](#minecraftbehaviorplace_block)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.enderman_leave_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

> **备注**：该行为在新版本中由`minecraft:behavior.place_block`承接，26.60 的原版包已不再使用。

</TabItem><TabItem value="示例" label="示例">

末影人（<FileType type="file" name="enderman.json"/>，格式版本`1.20.80`）：

```json showLineNumbers
"minecraft:behavior.enderman_leave_block": {
    "priority": 10
}
```

</TabItem></Tabs>

---

### `minecraft:behavior.enderman_take_block`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.100" tooltip="在高版本使用minecraft:behavior.take_block组件代替之。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影人可用。"/> <br/>

定义末影人会拿走方块。

另见：_[`minecraft:behavior.take_block`](#minecraftbehaviortake_block)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.enderman_take_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
</treeview>

> **备注**：该行为在新版本中已被`minecraft:behavior.take_block`取代，26.60 的原版包已不再使用。

</TabItem><TabItem value="示例" label="示例">

末影人（<FileType type="file" name="enderman.json"/>，格式版本`1.20.80`）：

```json showLineNumbers
"minecraft:behavior.enderman_take_block": {
    "priority": 11
}
```

</TabItem></Tabs>

---

### `minecraft:body_rotation_axis_aligned`

<Usable type="all"/> <Version add="1.21.70" deprecated="1.21.100" tooltip="在高版本使用minecraft:rotation_axis_aligned组件代替之。"/> <br/>

定义实体的身体会根据其当前朝向自动旋转，以对齐到最近的坐标轴方向。与 `minecraft:body_rotation_blocked` 组件组合使用时，实体会对齐到最近的坐标轴方向并固定在该朝向，不再随其面向方向的变化而改变。

另见：_[`minecraft:rotation_axis_aligned`](#minecraftrotation_axis_aligned)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:body_rotation_axis_aligned"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:body_rotation_axis_aligned": {}
```
</TabItem></Tabs>

---

### `minecraft:dash`

<Usable type="all"/> <Version add="1.20.40" deprecated="1.21.110" tooltip="在高版本使用minecraft:dash_action组件代替之。"/> <br/>

定义可骑乘实体的冲刺行为。类似于骆驼。

另见：_[`minecraft:dash_action`](#minecraftdash_action)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:dash"/>：根对象。
  - <DataType type="float" name="cooldown_time"/>：冲刺冷却的秒数。默认值为`1.0`。
  - <DataType type="float" name="horizontal_momentum"/>：水平方向施加的动量。默认值为`1.0`。
  - <DataType type="float" name="vertical_momentum"/>：垂直方向施加的动量。默认值为`1.0`。
</treeview>

> **备注**：1.21.110 起改用`minecraft:dash_action`，参数名与默认值保持不变。

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>，格式版本`1.21.90`）：

```json showLineNumbers
"minecraft:dash": {
    "cooldown_time": 2.75,
    "horizontal_momentum": 20.0,
    "vertical_momentum": 0.6
}
```

</TabItem></Tabs>

---

### `minecraft:foot_size`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.16.100"/> <br/>

定义实体不跳跃即可跨过的方块高度。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:foot_size"/>：根对象。
  - <DataType type="float" name="value"/>：不跳跃即可跨过的方块高度。默认值为`0.5`。
</treeview>

> **备注**：官方在 1.16.100 的更新说明中要求把`minecraft:foot_size`从实体文件中移除。

</TabItem><TabItem value="示例" label="示例">

该组件在 1.16.100 起已失效，文件中出现会直接报内容错误，故不给出示例。

</TabItem></Tabs>

---

### `minecraft:hurt_when_wet`

<Usable type="all"/> <Version add="1.2.0" deprecated="?"/> <br/>

定义实体被打湿后受伤。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:hurt_when_wet"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"minecraft:hurt_when_wet": {}
```
</TabItem></Tabs>

---

### `minecraft:input_air_controlled`

<Usable type="all"/> <Version add="1.21.90" deprecated="1.21.110" tooltip="在高版本使用minecraft:free_camera_controlled组件代替之。"/> <br/>

当用[`minecraft:rideable`](#minecraftrideable)组件设定为可骑乘实体后，该实体将可由 WASD 和鼠标控制运动。类似于快乐恶魂。

另见：_[`minecraft:free_camera_controlled`](#minecraftfree_camera_controlled)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:input_air_controlled"/>：根对象。
  - <DataType type="float" name="strafe_speed_modifier"/>：横向移动的速度乘数。默认值为`1.0`。
  - <DataType type="float" name="backwards_movement_modifier"/>：后退时的速度乘数。默认值为`0.5`。
</treeview>

> **备注**：1.21.110 起改用`minecraft:free_camera_controlled`，参数名与默认值保持不变。

</TabItem><TabItem value="示例" label="示例">

快乐恶魂（<FileType type="file" name="happy_ghast.json"/>，格式版本`1.21.100`）：

```json showLineNumbers
"minecraft:input_air_controlled": {
    "strafe_speed_modifier": 1.0,
    "backwards_movement_modifier": 0.5
}
```

</TabItem></Tabs>

---

### `minecraft:lookat`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.40" tooltip="在高版本使用minecraft:looked_at组件代替之。"/> <br/>

定义其他实体注视该实体时的行为。

另见：_[`minecraft:looked_at`](#minecraftlooked_at)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:lookat"/>：根对象。
  - <DataType type="float" name="field_of_view"/>：判定注视所需的视场角宽度，单位为度。默认值为`26`。
  - <DataType type="object" name="filters"/>：哪些实体算作注视者。见[实体过滤器](./filters)。
  - <DataType type="boolean" name="find_players_only"/>：是否只搜索玩家。默认值为`false`。
  - <DataType type="array" name="look_at_locations"/>：被判定为「注视」的躯体部位，至少一处无遮挡即算注视。
    - <DataType type="object"/>：一个部位。
      - <DataType type="string" name="location"/>：部位名。可填`head`、`body`、`feet`。
  - <DataType type="float" name="look_cooldown"/>：检测到注视者后再次检测所需等待的秒数。默认值为`5`。
  - <DataType type="object" name="looked_at_event"/>：检测到注视者时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](./filters#测试主体)。默认值为`self`。
  - <DataType type="float" name="min_looked_at_duration"/>：需要被连续注视多少秒才算生效。默认值为`0`。
  - <DataType type="object" name="not_looked_at_event"/>：未检测到注视者时触发的事件，结构同上。
  - <DataType type="boolean" name="scale_fov_by_distance"/>：为`true`时视场角随距离收窄。默认值为`true`。
  - <DataType type="float" name="search_radius"/>：搜索注视者的最大距离，单位为方块。默认值为`10`。
  - <DataType type="boolean" name="set_target"/>：为`true`时把注视者设为攻击目标。默认值为`false`。
</treeview>

> **备注**：1.21.40 起改用`minecraft:looked_at`。新组件里`set_target`可写字符串、`look_cooldown`改为数组形态的`looked_at_cooldown`，并新增`line_of_sight_obstruction_type`。

</TabItem><TabItem value="示例" label="示例">

末影人（<FileType type="file" name="enderman.json"/>，格式版本`1.20.80`）：

```json showLineNumbers
"minecraft:lookat": {
    "search_radius": 64.0,
    "set_target": true,
    "look_cooldown": 5.0,
    "filters": {
        "all_of": [
            {
                "subject": "other",
                "test": "is_family",
                "value": "player"
            },
            {
                "test": "has_equipment",
                "domain": "head",
                "subject": "other",
                "operator": "not",
                "value": "carved_pumpkin"
            }
        ]
    }
}
```

</TabItem></Tabs>

---

### `minecraft:pushable`

<Usable type="all"/> <Version add="1.13.0" deprecated="1.26.10" tooltip="在高版本使用minecraft:pushable_by_block组件和minecraft:pushable_by_entity组件代替之。"/> <br/>

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

允许实体检测脚手架方块并在其上移动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:scaffolding_climber"/>：根对象。不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

该组件在 1.17.10 起已弃用，脚手架攀爬改为内置行为，填写空对象即可。

```json showLineNumbers
"minecraft:scaffolding_climber": {}
```

</TabItem></Tabs>

---

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [实体组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/componentlist?view=minecraft-bedrock-stable)
- [实体 AI 意向组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/aigoallist?view=minecraft-bedrock-stable)
- [Projectiles | Bedrock Wiki](https://wiki.bedrock.dev/entities/projectiles)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
