---
sidebar_position: 2
sidebar_label: 传感器组件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

# 传感器组件

传感器组件检查实体是否满足特定条件，例如周围是否有生物、是否受到伤害、附近是否存在方块等，并在符合条件后触发[实体事件](../events)。

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
      - <DataType type="string" name="on_block_broken"/>：方块列表的方块被破坏后，触发的事件。见[实体事件](../events)。
  - <DataType type="float" name="sensor_radius"/>：检查的方块的半径。应小于等于`32`。默认值为`16`。
  - <DataType type="array" name="sources"/>：<Version add="1.18.30" inline/>检查破坏方块的实体。实体必须满足规定条件才能继续检查方块是否被破坏并触发事件。
    - <DataType type="object"/>：代表一个实体的过滤器。见[过滤器](../filters)。
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

<Version add="1.2.0" deprecated="1.13.0"/>直接写在组件下：

<treeview>
- <DataType type="array"/><DataType type="object" name="minecraft:damage_sensor"/>：伤害传感器，可写成数组或单个对象。
  - <DataType type="string" name="cause"/>：实体受到伤害的类型。只有实体受到规定伤害类型时才能触发该伤害传感器。可选值见[伤害类型 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/伤害类型#基岩版)。默认值为`none`。
  - <DataType type="boolean" name="deals_damage"/>：定义实体在满足条件时是否执行伤害。默认值为`true`。
  - <DataType type="array" name="on_damage"/>：受击时按顺序求值的触发器列表，每项包含`filters`与`event`。
</treeview>

<Version add="1.13.0"/>：

<treeview>
- <DataType type="object" name="minecraft:damage_sensor"/>：根对象。
  - <DataType type="array"/><DataType type="object" name="triggers"/>：代表多个伤害传感器。如果只有一个伤害传感器，也可以直接写成`"triggers": {...}`的对象结构。
    - <DataType type="object"/>：伤害传感器。
      - <DataType type="boolean" name="deals_damage"/>：<Version add="1.2.0" deprecated="1.21.40" inline/>定义实体在满足条件时是否执行伤害。默认值为`true`。
      - <DataType type="string" name="deals_damage"/>：<Version add="1.21.40" inline/>定义实体在满足条件时是否执行伤害。可选值如下表所示：
        | 可选值 | 描述 |
        | --- | --- |
        | `yes` | 正常施加伤害。默认值。 |
        | `no` | 不施加伤害。 |
        | `no_but_side_effects_apply` | 不施加伤害，但应用攻击的其他效果。例如，攻击者的武器的耐久值会下降，应用魔咒效果等。类似于嘎枝。 |
        | `no_but_entity_effects_apply` | <Version add="1.26.20" inline/> 不施加伤害，但应用击退和攻击的其他效果。例如，攻击者的武器的耐久值会下降，应用魔咒效果等。类似于硫方怪。 |
      - <DataType type="string" name="cause"/>：实体受到伤害的类型。只有实体受到规定伤害类型时才能触发该伤害传感器。可选值见[伤害类型 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/伤害类型#基岩版)。默认值为`none`。
      - <DataType type="object" name="on_damage"/>：当实体受到伤害时，仅当其中的过滤器条件通过后才能执行伤害，并触发事件。
        - <DataType type="string" name="event"/>：实体受到伤害后触发的事件。
        - <DataType type="object" name="filters"/>：代表一个实体的过滤器。见[过滤器](../filters)。
      - <DataType type="float" name="damage_modifier"/>：<Version add="1.16.200" inline/> 实体受到伤害的加和值，在原有伤害的基础上增加该伤害。默认值为`0`。
      - <DataType type="float" name="damage_multiplier"/>：实体受到伤害的乘积值，在原有伤害的基础上倍乘该伤害。默认值为`1`。
      - <DataType type="string" name="on_damage_sound_event"/>：<Version add="1.13.3" inline/>实体受伤后播放的音效。
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

<Usable type="all"/> <Version add="1.13.3"/> <br/>

当其他实体在指定范围内满足指定条件时触发事件。

<Tabs><TabItem value="参数" label="参数" default>

<Version add="1.13.3" deprecated="1.20.60"/>参数直接写在组件下：

<treeview>
- <DataType type="object" name="minecraft:entity_sensor"/>：根对象。
  - <DataType type="float" name="sensor_range"/>：检测半径，单位为方块。默认值为`10`。
  - <DataType type="object" name="event_filters"/>：条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="event"/>：条件满足时触发的事件 ID。
  - <DataType type="int" name="minimum_count"/>：触发事件所需的最少实体数。默认值为`1`。
  - <DataType type="int" name="maximum_count"/>：触发事件所需的最多实体数；`-1`表示不限。默认值为`-1`。
  - <DataType type="boolean" name="require_all"/>：是否要求范围内全部实体都通过条件。默认值为`false`。
  - <DataType type="boolean" name="relative_range"/>：<Version add="1.15.0" inline/>检测范围是否在实体自身尺寸之上叠加。默认值为`true`。
</treeview>

<Version add="1.20.60"/>：

<treeview>
- <DataType type="object" name="minecraft:entity_sensor"/>：根对象。
  - <DataType type="boolean" name="find_players_only"/>：<Version add="1.21.70" inline/>全部子传感器是否只检测玩家。默认值为`false`。
  - <DataType type="boolean" name="relative_range"/>：子传感器的范围是否在实体自身尺寸之上叠加。默认值为`true`。
  - <DataType type="array" name="subsensors"/>：子传感器列表，各项独立求值。
    - <DataType type="object"/>：一个子传感器。
      - <DataType type="string" name="event"/>：条件满足时触发的事件 ID。
      - <DataType type="object" name="event_filters"/>：条件。见[实体过滤器](../filters)。
      - <DataType type="float" name="cooldown"/>：再次检测前需等待的秒数；`-1`表示不设冷却。默认值为`-1`。
      - <DataType type="float" name="range"/>：<Version add="1.20.60" deprecated="1.20.70" inline/>检测半径，单位为方块，写作单个数值。默认值为`10`。
      - <DataType type="array" name="range"/>：<Version add="1.20.70" inline/>检测范围，写作`[水平, 垂直]`，单位为方块。默认值为`[10, 10]`。
      - <DataType type="int" name="minimum_count"/>：触发事件所需的最少实体数。默认值为`1`。
      - <DataType type="int" name="maximum_count"/>：触发事件所需的最多实体数；`-1`表示不限。默认值为`-1`。
      - <DataType type="boolean" name="require_all"/>：是否要求范围内全部实体都通过条件。默认值为`false`。
      - <DataType type="float" name="y_offset"/>：<Version add="1.21.70" inline/>计算距离时对实体施加的垂直偏移。默认值为`0`。
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
  - <DataType type="array" name="triggers"/>：<Version add="1.13.3" inline/>触发器列表，每刻按顺序求值。
    - <DataType type="object"/>：一个触发器。
      - <DataType type="object" name="filters"/>：环境条件。见[实体过滤器](../filters)。
      - <DataType type="string" name="event"/>：条件满足时触发的事件 ID。
  - <DataType type="array" name="on_environment"/>：<Version add="1.2.0" deprecated="1.13.3" inline/>触发器列表，每刻按顺序求值，第一项条件成立即触发对应事件。
    - <DataType type="object"/>：一个触发器。
      - <DataType type="object" name="filters"/>：环境条件。见[实体过滤器](../filters)。
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
    - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="boolean" name="must_see"/>：<Version add="1.13.3" inline/>是否需要看见目标才判定为进入内圈。默认值为`false`。
  - <DataType type="object" name="on_inside_range"/>：实体进入内圈时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_outside_range"/>：实体离开外圈时触发的事件，结构同上。
  - <DataType type="object" name="on_vision_lost_inside_range"/>：<Version add="1.13.3" inline/>实体在内圈内失去视野时触发的事件，结构同上。
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
  - <DataType type="float"/><DataType type="array" name="time"/>：<Version add="1.2.0" deprecated="1.26.60" inline/>计时时长，单位为秒。写单个数值为固定时长，写`[最小值, 最大值]`则在区间内随机。默认值为`0.0`。
  - <DataType type="object" name="time"/>：<Version add="1.26.60" inline/>计时时长，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="array" name="random_time_choices"/>：<Version add="1.10.0" inline/>可随机选取的时长及权重，与`time`互斥。
    - <DataType type="object"/>：一项。
      - <DataType type="float" name="value"/>：时长，单位为秒。
      - <DataType type="int" name="weight"/>：该项被选中的权重。默认值为`0`。
  - <DataType type="object" name="time_down_event"/>：计时结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
