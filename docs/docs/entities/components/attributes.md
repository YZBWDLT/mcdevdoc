---
sidebar_position: 1
sidebar_label: 基础属性组件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

# 基础属性组件

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

<Usable type="all"/> <Version add="未知"/> <br/>

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
      - <DataType type="object" name="filters"/>：实体过滤器。定义该实体应满足的条件。见[实体过滤器](../filters)。
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
      - <DataType type="float" name="require_collision_overlap"/>：<Version add="1.26.40" inline/>是否需要碰撞箱重叠才能推动。默认值为`true`。`1.26.40`起未写时按`true`处理，更早的格式版本则按`false`处理。
</treeview>

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

定义实体所属的家族类型。家族类型可用于在[过滤器](../filters)中、命令中或其他游戏系统进行分类判断（例如：`mob`、`monster`、`undead`、`zombie`等）。

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
      - <DataType type="object" name="filters"/>：条件。见[实体过滤器](../filters)。
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

### `minecraft:nameable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许该实体被命名，例如使用命名牌。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:nameable"/>：根对象。
  - <DataType type="boolean" name="allow_name_tag_renaming"/>：是否允许用命名牌再次改名。默认值为`true`。
  - <DataType type="boolean" name="allowNameTagRenaming"/>：<Version add="1.2.0" deprecated="1.13.0" inline/>是否允许用命名牌再次改名（旧拼写）。默认值为`true`。
  - <DataType type="boolean" name="always_show"/>：名字是否始终显示。默认值为`false`。
  - <DataType type="boolean" name="alwaysShow"/>：<Version add="1.2.0" deprecated="1.13.0" inline/>名字是否始终显示（旧拼写）。默认值为`false`。
  - <DataType type="object" name="default_trigger"/>：实体被命名时触发的默认事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
      - <DataType type="object" name="filters"/>：触发伤害所需的条件。见[实体过滤器](../filters)。
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

### `minecraft:breathable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体可以呼吸的介质、憋气时长与窒息伤害。

另见：_[EntityBreathableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitybreathablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<Version add="1.2.0" deprecated="1.13.0"/>：

<treeview>
- <DataType type="object" name="minecraft:breathable"/>：根对象。
  - <DataType type="int" name="totalSupply"/>：可憋气的秒数。默认值为`15`。
  - <DataType type="int" name="suffocateTime"/>：两次窒息伤害之间的秒数。默认值为`-20`。
  - <DataType type="float" name="inhaleTime"/>：<Version add="1.4.0" inline/>把憋气量恢复到上限所需的秒数。默认值为`0`。
  - <DataType type="boolean" name="breathesAir"/>：是否能在空气中呼吸。默认值为`true`。
  - <DataType type="boolean" name="breathesWater"/>：是否能在水中呼吸。默认值为`false`。
  - <DataType type="boolean" name="breathesLava"/>：是否能在熔岩中呼吸。默认值为`false`。
  - <DataType type="boolean" name="breathesSolids"/>：是否能在固体方块中呼吸。默认值为`false`。
  - <DataType type="boolean" name="generatesBubbles"/>：在水中是否显示气泡。默认值为`true`。
  - <DataType type="array" name="breatheBlocks"/>：除上述开关外，额外允许呼吸的方块。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="array" name="nonBreatheBlocks"/>：除上述开关外，额外禁止呼吸的方块。
    - <DataType type="string"/>：方块 ID。
</treeview>

<Version add="1.13.0"/>：

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
  - <DataType type="boolean" name="can_dehydrate"/>：<Version add="1.21.130" inline/>为`true`时，只能在水下呼吸的实体在脱离水后会受到脱水伤害。默认值为`false`，以保持原有的呼吸行为。
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

### `minecraft:experience_reward`

<Usable type="all"/> <Version add="1.13.3"/> <br/>

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

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
