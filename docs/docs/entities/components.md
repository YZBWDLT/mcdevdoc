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

全体实体通用的组件。在定义实体的时候，多数情况下都需要这些组件。

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

### `minecraft:physics`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_physics?view=minecraft-bedrock-stable"/>

定义实体的物理属性。

---

### `minecraft:pushable_by_block`

<Usable type="all"/> <Version add="1.26.10" tooltip="在更旧的版本下使用minecraft:pushable组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_pushable_by_block?view=minecraft-bedrock-stable"/>

定义实体可被活塞或潜影盒推动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:pushable_by_block"/>：根对象，不含任何参数。定义实体可被活塞或潜影盒推动。
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

## 功能性组件

### `minecraft:addrider`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_addrider?view=minecraft-bedrock-stable"/>

Adds a rider to the entity.

---

### `minecraft:admire_item`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_admire_item?view=minecraft-bedrock-stable"/>

Allows an entity to ignore attackable targets for a given duration

---

### `minecraft:ageable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ageable?view=minecraft-bedrock-stable"/>

Adds a timer for the entity to grow up.

---

### `minecraft:ambient_sound_interval`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ambient_sound_interval?view=minecraft-bedrock-stable"/>

Delay for an entity playing its sound

---

### `minecraft:anger_level`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_anger_level?view=minecraft-bedrock-stable"/>

Compels the entity to track anger towards a set of nuisances.

---

### `minecraft:angry`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_angry?view=minecraft-bedrock-stable"/>

Defines an entity's 'angry' state using a timer.

---

### `minecraft:annotation.break_door`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_annotation.break_door?view=minecraft-bedrock-stable"/>

Allows an entity to break doors, assuming that that flags set up for the component to use in navigation.

---

### `minecraft:annotation.open_door`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_annotation.open_door?view=minecraft-bedrock-stable"/>

Allows the entity to open doors.

---

### `minecraft:apply_knockback_rules`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_apply_knockback_rules?view=minecraft-bedrock-stable"/>

Defines how an entity applies knockback.

---

### `minecraft:apply_knockback_rules_instance`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_apply_knockback_rules_instance?view=minecraft-bedrock-stable"/>

Intance of rules definition.

---

### `minecraft:area_attack`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_area_attack?view=minecraft-bedrock-stable"/>

A component that does damage to entities that get within range.

---

### `minecraft:attack`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_attack?view=minecraft-bedrock-stable"/>

Defines an entity's melee attack damage and any additional status effects applied on hit.

---

### `minecraft:attack_cooldown`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_attack_cooldown?view=minecraft-bedrock-stable"/>

Adds a cooldown to an entity.

---

### `minecraft:attack_damage`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_attack_damage?view=minecraft-bedrock-stable"/>

Specifies how much damage is dealt by the entity when it attacks.

---

### `minecraft:balloonable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_balloonable?view=minecraft-bedrock-stable"/>

Allows this entity to have a balloon attached and defines the conditions and events for this entity when is ballooned.

---

### `minecraft:barter`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_barter?view=minecraft-bedrock-stable"/>

Enables the component to drop an item as a barter exchange.

---

### `minecraft:block_climber`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_block_climber?view=minecraft-bedrock-stable"/>

Allows the player to detect and manuever on the scaffolding block.

---

### `minecraft:block_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_block_sensor?view=minecraft-bedrock-stable"/>

Fires off a specified event when a block in the block list is broken within the sensor range.

---

### `minecraft:body_rotation_always_follows_head`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_always_follows_head?view=minecraft-bedrock-stable"/>

Causes the entity's body rotation to match the one of their head. Does not override the "`minecraft:body_rotation_blocked`" component.

---

### `minecraft:body_rotation_blocked`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_blocked?view=minecraft-bedrock-stable"/>

When set, the entity will no longer visually rotate their body to match their facing direction.

---

### `minecraft:body_rotation_locked_to_vehicle`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_locked_to_vehicle?view=minecraft-bedrock-stable"/>

Causes the entity's body rotation to match their vehicle's facing direction.

---

### `minecraft:boostable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_boostable?view=minecraft-bedrock-stable"/>

Defines the conditions and behavior of a rideable entity's boost.

---

### `minecraft:boss`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_boss?view=minecraft-bedrock-stable"/>

Defines the current state of the boss for updating the boss HUD.

---

### `minecraft:break_blocks`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_break_blocks?view=minecraft-bedrock-stable"/>

Specifies the blocks that the entity can break as it moves around.

---

### `minecraft:breathable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_breathable?view=minecraft-bedrock-stable"/>

Defines what blocks this entity can breathe in and gives them the ability to suffocate.

---

### `minecraft:breedable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_breedable?view=minecraft-bedrock-stable"/>

Allows an entity to establish a way to get into the love state used for breeding.

---

### `minecraft:bribeable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_bribeable?view=minecraft-bedrock-stable"/>

Defines the way an entity can get into the 'bribed' state.

---

### `minecraft:buoyant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_buoyant?view=minecraft-bedrock-stable"/>

Enables an entity to float on the specified liquid blocks.

---

### `minecraft:burns_in_daylight`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_burns_in_daylight?view=minecraft-bedrock-stable"/>

Specifies that this entity takes fire damage when exposed to direct sunlight.

---

### `minecraft:cannot_be_attacked`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_cannot_be_attacked?view=minecraft-bedrock-stable"/>

When set, blocks entities from attacking the owner entity unless they have the "`minecraft:ignore_cannot_be_attacked" component.`

---

### `minecraft:can_climb`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_can_climb?view=minecraft-bedrock-stable"/>

Allows an entity to climb ladders.

---

### `minecraft:can_fly`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_can_fly?view=minecraft-bedrock-stable"/>

Marks the entity as being able to fly, the pathfinder won't be restricted to paths where a solid block is required underneath it.

---

### `minecraft:can_join_raid`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_can_join_raid?view=minecraft-bedrock-stable"/>

Specifies if an entity can join a raid.

---

### `minecraft:can_power_jump`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_can_power_jump?view=minecraft-bedrock-stable"/>

Allows the entity to power jump like the Horse does in Vanilla.

---

### `minecraft:celebrate_hunt`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_celebrate_hunt?view=minecraft-bedrock-stable"/>

Specifies hunt celebration behaviour.

---

### `minecraft:color`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_color?view=minecraft-bedrock-stable"/>

Defines the entity's main color.

---

### `minecraft:color2`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_color2?view=minecraft-bedrock-stable"/>

Defines the entity's second texture color.

---

### `minecraft:combat_regeneration`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_combat_regeneration?view=minecraft-bedrock-stable"/>

Gives Regeneration I and removes Mining Fatigue from the mob that kills the entity's attack target.

---

### `minecraft:conditional_bandwidth_optimization`

<Usable type="all"/> <Version add="1.16.100"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_conditional_bandwidth_optimization?view=minecraft-bedrock-stable"/>

定义实体的条件空间更新带宽优化。

---

### `minecraft:custom_hit_test`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_custom_hit_test?view=minecraft-bedrock-stable"/>

List of hitboxes for melee and ranged hits against the entity.

---

### `minecraft:damage_over_time`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_damage_over_time?view=minecraft-bedrock-stable"/>

Applies defined amount of damage to the entity at specified intervals.

---

### `minecraft:damage_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_damage_sensor?view=minecraft-bedrock-stable"/>

Defines what events to call when this entity is damaged by specific entities or items.

---

### `minecraft:dash_action`

<Usable type="all"/> <Version add="1.21.110" tooltip="在更旧的版本下使用minecraft:dash组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dash_action?view=minecraft-bedrock-stable"/>

定义可骑乘实体的冲刺行为。类似于骆驼。

---

### `minecraft:default_look_angle`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_default_look_angle?view=minecraft-bedrock-stable"/>

Sets this entity's default head rotation angle.

---

### `minecraft:despawn`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_despawn?view=minecraft-bedrock-stable"/>

Despawns the Actor when the despawn rules or optional filters evaluate to true.

---

### `minecraft:dimension_bound`

<Usable type="all"/> <Version add="1.21.40"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dimension_bound?view=minecraft-bedrock-stable"/>

定义实体不可通过传送门切换维度。

---

### `minecraft:drying_out_timer`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_drying_out_timer?view=minecraft-bedrock-stable"/>

Adds a timer for drying out that will count down and fire 'dried_out_event' or will stop as soon as the entity will get under rain or water and fire 'stopped_drying_out_event'

---

### `minecraft:dweller`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dweller?view=minecraft-bedrock-stable"/>

Compels an entity to join and migrate between villages and other dwellings.

---

### `minecraft:economy_trade_table`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_economy_trade_table?view=minecraft-bedrock-stable"/>

Defines this entity's ability to trade with players.

---

### `minecraft:entity_armor_equipment_slot_mapping`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_entity_armor_equipment_slot_mapping?view=minecraft-bedrock-stable"/>

It defines to which armor slot an item equipped to '`minecraft:equippable`''s second slot should be equipped to.

---

### `minecraft:entity_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_entity_sensor?view=minecraft-bedrock-stable"/>

A component that owns multiple subsensors, each one firing an event when a set of conditions are met by other entities within the defined range.

---

### `minecraft:environment_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_environment_sensor?view=minecraft-bedrock-stable"/>

Creates a trigger based on environment conditions.

---

### `minecraft:equipment`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_equipment?view=minecraft-bedrock-stable"/>

Sets the Equipment table to use for this Entity.

---

### `minecraft:equippable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_equippable?view=minecraft-bedrock-stable"/>

Defines an entity's behavior for having items equipped to it.

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

---

### `minecraft:exhaustion_values`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_exhaustion_values?view=minecraft-bedrock-stable"/>

Defines how much exhaustion each player action should take.

---

### `minecraft:experience_reward`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_experience_reward?view=minecraft-bedrock-stable"/>

定义实体会掉落经验球。

---

### `minecraft:explode`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_explode?view=minecraft-bedrock-stable"/>

Defines how the entity explodes.

---

### `minecraft:fire_immune`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_fire_immune?view=minecraft-bedrock-stable"/>

Sets that this entity doesn't take damage from fire.

---

### `minecraft:floats_in_liquid`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_floats_in_liquid?view=minecraft-bedrock-stable"/>

Sets that this entity can float in liquid blocks.

---

### `minecraft:flocking`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_flocking?view=minecraft-bedrock-stable"/>

Allows entities to flock in groups in water or not.

---

### `minecraft:flying_speed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_flying_speed?view=minecraft-bedrock-stable"/>

Speed in Blocks that this entity flies at.

---

### `minecraft:follow_range`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_follow_range?view=minecraft-bedrock-stable"/>

Defines the maximum range, in blocks, that a mob will pursue a target.

---

### `minecraft:free_camera_controlled`

<Usable type="all"/> <Version add="1.21.110" tooltip="在更旧的版本下使用minecraft:input_air_controlled组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_free_camera_controlled?view=minecraft-bedrock-stable"/>

当用[`minecraft:rideable`](#minecraftrideable)组件设定为可骑乘实体后，该实体将可由 WASD 和鼠标控制运动。类似于快乐恶魂。

---

### `minecraft:friction_modifier`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_friction_modifier?view=minecraft-bedrock-stable"/>

Defines how much friction affects this entity.

---

### `minecraft:game_event_movement_tracking`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_game_event_movement_tracking?view=minecraft-bedrock-stable"/>

Allows an entity to emit entityMove, swim and flap game events, depending on the block the entity is moving through.

---

### `minecraft:genetics`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_genetics?view=minecraft-bedrock-stable"/>

Defines the way a mob's genes and alleles are passed on to its offspring, and how those traits manifest in the child.

---

### `minecraft:giveable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_giveable?view=minecraft-bedrock-stable"/>

Defines sets of items that can be used to trigger events when used on this entity.

---

### `minecraft:ground_offset`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ground_offset?view=minecraft-bedrock-stable"/>

Sets the offset from the ground that the entity is actually at.

---

### `minecraft:group_size`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_group_size?view=minecraft-bedrock-stable"/>

Keeps track of entity group size in the given radius.

---

### `minecraft:grows_crop`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_grows_crop?view=minecraft-bedrock-stable"/>

Could increase crop growth when entity walks over crop

---

### `minecraft:healable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_healable?view=minecraft-bedrock-stable"/>

How entities heal

---

### `minecraft:health`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_health?view=minecraft-bedrock-stable"/>

Defines the health pool for an entity, measured in health points (1 point = half a heart).

---

### `minecraft:heartbeat`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_heartbeat?view=minecraft-bedrock-stable"/>

Defines the entity's heartbeat.

---

### `minecraft:hide`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_hide?view=minecraft-bedrock-stable"/>

Moves to and hides at their owned POI or the closest nearby.

---

### `minecraft:home`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_home?view=minecraft-bedrock-stable"/>

Saves a home position for when the entity is spawned.

---

### `minecraft:horse.jump_strength`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_horse.jump_strength?view=minecraft-bedrock-stable"/>

Determines the jump height for a horse or similar entity, like a donkey.

---

### `minecraft:hurt_on_condition`

<Usable type="all"/> <Version add="1.13.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_hurt_on_condition?view=minecraft-bedrock-stable"/>

定义实体在何种条件下会受伤。

---

### `minecraft:ignore_cannot_be_attacked`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ignore_cannot_be_attacked?view=minecraft-bedrock-stable"/>

When set, blocks entities from attacking the owner entity unless they have the "`minecraft:ignore_cannot_be_attacked" component.`

---

### `minecraft:input_ground_controlled`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_input_ground_controlled?view=minecraft-bedrock-stable"/>

When configured as a rideable entity, the entity will be controlled using WASD controls.

---

### `minecraft:inside_block_notifier`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_inside_block_notifier?view=minecraft-bedrock-stable"/>

Verifies whether the entity is inside any of the listed blocks.

---

### `minecraft:insomnia`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_insomnia?view=minecraft-bedrock-stable"/>

Adds a timer since last rested to see if phantoms should spawn.

---

### `minecraft:instant_despawn`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_instant_despawn?view=minecraft-bedrock-stable"/>

Despawns the Actor immediately.

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

---

### `minecraft:inventory`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_inventory?view=minecraft-bedrock-stable"/>

Defines this entity's inventory properties.

---

### `minecraft:is_baby`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_baby?view=minecraft-bedrock-stable"/>

Sets that this entity is a baby.

---

### `minecraft:is_charged`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_charged?view=minecraft-bedrock-stable"/>

Sets that this entity is charged.

---

### `minecraft:is_chested`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_chested?view=minecraft-bedrock-stable"/>

Sets that this entity is currently carrying a chest.

---

### `minecraft:is_collidable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_collidable?view=minecraft-bedrock-stable"/>

Allows other mobs to have vertical and horizontal collisions with this mob.

---

### `minecraft:is_dyeable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_dyeable?view=minecraft-bedrock-stable"/>

Allows dyes to be used on this entity to change its color.

---

### `minecraft:is_hidden_when_invisible`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_hidden_when_invisible?view=minecraft-bedrock-stable"/>

The entity can hide from hostile mobs while invisible.

---

### `minecraft:is_ignited`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_ignited?view=minecraft-bedrock-stable"/>

Sets that this entity is currently on fire.

---

### `minecraft:is_illager_captain`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_illager_captain?view=minecraft-bedrock-stable"/>

Sets that this entity is an Illager Captain.

---

### `minecraft:is_pregnant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_pregnant?view=minecraft-bedrock-stable"/>

Sets that this entity is currently pregnant.

---

### `minecraft:is_saddled`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_saddled?view=minecraft-bedrock-stable"/>

Sets that this entity is currently saddled.

---

### `minecraft:is_shaking`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_shaking?view=minecraft-bedrock-stable"/>

Sets that this entity is currently shaking.

---

### `minecraft:is_sheared`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_sheared?view=minecraft-bedrock-stable"/>

Sets that this entity is currently sheared.

---

### `minecraft:is_stackable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_stackable?view=minecraft-bedrock-stable"/>

Allows instances of this entity to have vertical and horizontal collisions with each other.

---

### `minecraft:is_stunned`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_stunned?view=minecraft-bedrock-stable"/>

Sets that this entity is currently stunned.

---

### `minecraft:is_tamed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_tamed?view=minecraft-bedrock-stable"/>

Sets that this entity is currently tamed.

---

### `minecraft:item_controllable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_item_controllable?view=minecraft-bedrock-stable"/>

Defines what items can be used to control this entity while ridden.

---

### `minecraft:item_hopper`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_item_hopper?view=minecraft-bedrock-stable"/>

Determines that this entity is an item hopper.

---

### `minecraft:jump.dynamic`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_jump.dynamic?view=minecraft-bedrock-stable"/>

Defines a dynamic type jump control that will change jump properties based on the speed modifier of the mob.Requires `minecraft:movement.skip to be used.`

---

### `minecraft:jump.static`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_jump.static?view=minecraft-bedrock-stable"/>

Gives the entity the ability to jump.

---

### `minecraft:knockback_resistance`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_knockback_resistance?view=minecraft-bedrock-stable"/>

Determines an entity's resistance to knockback from melee attacks.

---

### `minecraft:lava_movement`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_lava_movement?view=minecraft-bedrock-stable"/>

Allows a custom movement speed across lava blocks.

---

### `minecraft:leashable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_leashable?view=minecraft-bedrock-stable"/>

Describes how this mob can be leashed to other items

---

### `minecraft:leashable_to`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_leashable_to?view=minecraft-bedrock-stable"/>

Allows players to leash entities to this entity, retrieve entities already leashed to it, or free them using shears.

---

### `minecraft:looked_at`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_looked_at?view=minecraft-bedrock-stable"/>

Defines the behavior when another entity looks at the owner entity.

---

### `minecraft:loot`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_loot?view=minecraft-bedrock-stable"/>

Specifies the loot table that determines what items this entity drops upon death.

---

### `minecraft:managed_wandering_trader`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_managed_wandering_trader?view=minecraft-bedrock-stable"/>

Manages the entity's ability to trade.

---

### `minecraft:mark_variant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_mark_variant?view=minecraft-bedrock-stable"/>

Mark Variant is typically used as an additional per-type way (besides variant) to express a different visual form of the same mob.

---

### `minecraft:mob_effect`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_mob_effect?view=minecraft-bedrock-stable"/>

A component that applies a mob effect to entities that get within range.

---

### `minecraft:mob_effect_immunity`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_mob_effect_immunity?view=minecraft-bedrock-stable"/>

Entities with this component will have an immunity to the provided mob effects.

---

### `minecraft:movement_sound_distance_offset`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement_sound_distance_offset?view=minecraft-bedrock-stable"/>

Sets the offset used to determine the next step distance for playing a movement sound.

---

### `minecraft:nameable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_nameable?view=minecraft-bedrock-stable"/>

Allows this entity to be named (e.g.

### `minecraft:offspring`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_offspring?view=minecraft-bedrock-stable"/>

Defines the way an entity can create a born offspring.

---

### `minecraft:out_of_control`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_out_of_control?view=minecraft-bedrock-stable"/>

Defines the entity's 'out of control' state.

---

### `minecraft:peek`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_peek?view=minecraft-bedrock-stable"/>

Defines the entity's 'peek' behavior, defining the events that should be called during it.

---

### `minecraft:persistent`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_persistent?view=minecraft-bedrock-stable"/>

Defines whether an entity should be persistent in the game world.

---

### `minecraft:player.exhaustion`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_player.exhaustion?view=minecraft-bedrock-stable"/>

Defines the player's exhaustion level.

---

### `minecraft:player.experience`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_player.experience?view=minecraft-bedrock-stable"/>

Defines how much experience each player action should take.

---

### `minecraft:player.level`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_player.level?view=minecraft-bedrock-stable"/>

Defines the player's level.

---

### `minecraft:player.saturation`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_player.saturation?view=minecraft-bedrock-stable"/>

Defines the player's need for food.

---

### `minecraft:preferred_path`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_preferred_path?view=minecraft-bedrock-stable"/>

Specifies costing information for mobs that prefer to walk on preferred paths.

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

---

### `minecraft:push_through`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_push_through?view=minecraft-bedrock-stable"/>

Sets the distance through which the entity can push through.

---

### `minecraft:raid_trigger`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_raid_trigger?view=minecraft-bedrock-stable"/>

Attempts to trigger a raid at the entity's location.

---

### `minecraft:rail_movement`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rail_movement?view=minecraft-bedrock-stable"/>

Defines the entity's movement on the rails.

---

### `minecraft:rail_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rail_sensor?view=minecraft-bedrock-stable"/>

Enables minecart-type entities to detect powered rails and respond to activation state changes.

---

### `minecraft:ravager_blocked`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_ravager_blocked?view=minecraft-bedrock-stable"/>

Defines the ravager's response to their melee attack being blocked.

---

### `minecraft:reflect_projectiles`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_reflect_projectiles?view=minecraft-bedrock-stable"/>

[EXPERIMENTAL] Allows an entity to reflect projectiles.

---

### `minecraft:remove_in_peaceful`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_remove_in_peaceful?view=minecraft-bedrock-stable"/>

Denotes entities that are not allowed to exist in "Peaceful" difficulty.

---

### `minecraft:renders_when_invisible`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_renders_when_invisible?view=minecraft-bedrock-stable"/>

When set, the entity will render even when invisible.

---

### `minecraft:rideable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rideable?view=minecraft-bedrock-stable"/>

定义实体为可骑乘的实体。

---

### `minecraft:rotation_axis_aligned`

<Usable type="all"/> <Version add="1.21.100" tooltip="在更旧的版本下使用minecraft:body_rotation_axis_aligned组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rotation_axis_aligned?view=minecraft-bedrock-stable"/>

定义实体会根据自身朝向旋转身体并对齐坐标轴。类似于快乐恶魂。

---

### `minecraft:rotation_locked_to_vehicle`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rotation_locked_to_vehicle?view=minecraft-bedrock-stable"/>

Causes the entity's rotation to match their vehicle's facing direction.

---

### `minecraft:scale`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_scale?view=minecraft-bedrock-stable"/>

Sets the entity's visual size multiplier.

---

### `minecraft:scale_by_age`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_scale_by_age?view=minecraft-bedrock-stable"/>

Defines the entity's size interpolation based on the entity's age.

---

### `minecraft:scheduler`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_scheduler?view=minecraft-bedrock-stable"/>

Fires off scheduled mob events at time of day events.

---

### `minecraft:shareables`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_shareables?view=minecraft-bedrock-stable"/>

Defines a list of items the mob wants to share or pick up.

---

### `minecraft:shooter`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_shooter?view=minecraft-bedrock-stable"/>

Defines the entity's ranged attack behavior.

---

### `minecraft:sittable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_sittable?view=minecraft-bedrock-stable"/>

Defines the entity's 'sit' state.

---

### `minecraft:skin_id`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_skin_id?view=minecraft-bedrock-stable"/>

Skin ID value.

---

### `minecraft:sound_volume`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_sound_volume?view=minecraft-bedrock-stable"/>

Sets the entity's base volume for sound effects.

---

### `minecraft:spawn_egg_interaction`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_spawn_egg_interaction?view=minecraft-bedrock-stable"/>

Enables interacting with this entity using its own spawn egg to spawn a born child.

---

### `minecraft:spawn_entity`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_spawn_entity?view=minecraft-bedrock-stable"/>

Adds a timer after which this entity will spawn another entity or item (similar to vanilla's chicken's egg-laying behavior).

---

### `minecraft:spawn_on_death`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_spawn_on_death?view=minecraft-bedrock-stable"/>

Component for spawning entities when an entity perishes.

---

### `minecraft:spell_effects`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_spell_effects?view=minecraft-bedrock-stable"/>

Allows an entity to add or remove status effects from itself.

---

### `minecraft:strength`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_strength?view=minecraft-bedrock-stable"/>

Defines the entity's strength to carry items.

---

### `minecraft:suspect_tracking`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_suspect_tracking?view=minecraft-bedrock-stable"/>

Allows this entity to remember suspicious locations.

---

### `minecraft:tameable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_tameable?view=minecraft-bedrock-stable"/>

This entity can be tamed

---

### `minecraft:tamemount`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_tamemount?view=minecraft-bedrock-stable"/>

Allows the Entity to be tamed by mounting it.

---

### `minecraft:target_nearby_sensor`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_target_nearby_sensor?view=minecraft-bedrock-stable"/>

Defines the entity's range within which it can see or sense other entities to target them.

---

### `minecraft:teleport`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_teleport?view=minecraft-bedrock-stable"/>

Defines an entity's teleporting behavior.

---

### `minecraft:tick_world`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_tick_world?view=minecraft-bedrock-stable"/>

定义实体高频运行世界[^1]。目前没有任何原版实体使用此组件。

---

### `minecraft:timer`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_timer?view=minecraft-bedrock-stable"/>

Adds a timer after which an event will fire.

---

### `minecraft:trade_resupply`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trade_resupply?view=minecraft-bedrock-stable"/>

Resupplies an entity's trade.

---

### `minecraft:trade_table`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trade_table?view=minecraft-bedrock-stable"/>

Defines this entity's ability to trade with players.

---

### `minecraft:trail`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trail?view=minecraft-bedrock-stable"/>

Causes an entity to leave a trail of blocks as it moves about the world.

---

### `minecraft:transformation`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_transformation?view=minecraft-bedrock-stable"/>

Defines an entity's transformation from the current definition into another

---

### `minecraft:transient`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_transient?view=minecraft-bedrock-stable"/>

An entity with this component will NEVER persist, and forever disappear when unloaded.

---

### `minecraft:trust`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trust?view=minecraft-bedrock-stable"/>

Allows this entity to trust multiple players.

---

### `minecraft:trusting`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_trusting?view=minecraft-bedrock-stable"/>

Defines the rules for a mob to trust players.

---

### `minecraft:type_family`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_type_family?view=minecraft-bedrock-stable"/>

Defines the family categories this entity belongs to.

---

### `minecraft:underwater_mount_breathing`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_underwater_mount_breathing?view=minecraft-bedrock-stable"/>

Pauses this entity's breathing under water.

---

### `minecraft:underwater_movement`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_underwater_movement?view=minecraft-bedrock-stable"/>

Defines the speed with which an entity can move through water.

---

### `minecraft:uses_legacy_friction`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_uses_legacy_friction?view=minecraft-bedrock-stable"/>

When set, legacy calculations are used when applying "`minecraft:friction_modifier".`

---

### `minecraft:variable_max_auto_step`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_variable_max_auto_step?view=minecraft-bedrock-stable"/>

Entities with this component will have a maximum auto step height that is different depending on whether they are on a block that prevents jumping.

---

### `minecraft:variant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_variant?view=minecraft-bedrock-stable"/>

Variant is typically used as a per-type way to express a different visual form of the same mob.

---

### `minecraft:vertical_movement_action`

<Usable type="all"/> <Version add="1.21.110"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_vertical_movement.action?view=minecraft-bedrock-stable"/>

当用[`minecraft:rideable`](#minecraftrideable)组件设定为可骑乘实体后，该实体将可由玩家的跳跃行为控制竖直方向上的运动。类似于快乐恶魂。

---

### `minecraft:vibration_damper`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_vibration_damper?view=minecraft-bedrock-stable"/>

Vibrations emitted by an entity with this component will be ignored.

---

### `minecraft:vibration_listener`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_vibration_listener?view=minecraft-bedrock-stable"/>

Allows the entity to listen to vibration events.

---

### `minecraft:walk_animation_speed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_walk_animation_speed?view=minecraft-bedrock-stable"/>

Sets the speed multiplier for this entity's walk animation speed.

---

### `minecraft:wants_jockey`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_wants_jockey?view=minecraft-bedrock-stable"/>

Sets that this entity wants to become a jockey.

---

### `minecraft:water_movement`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_water_movement?view=minecraft-bedrock-stable"/>

Customizes how the entity moves through water by adjusting drag coefficient.

---

### `minecraft:wither_target_highest_damage`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_wither_target_highest_damage?view=minecraft-bedrock-stable"/>

Allows the wither to focus its attacks on whichever mob has dealt the most damage to it.

---
---

## 寻路与运动组件

寻路与运动组件规定了实体在拥有一个目标后，会尝试以何种路径到达预定地点。

### `minecraft:movement`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement?view=minecraft-bedrock-stable"/>

Defines the base movement speed of an entity.

---

### `minecraft:movement.amphibious`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.amphibious?view=minecraft-bedrock-stable"/>

This move control allows the mob to swim in water and walk on land.

---

### `minecraft:movement.basic`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.basic?view=minecraft-bedrock-stable"/>

This component accents the movement of an entity.

---

### `minecraft:movement.dolphin`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.dolphin?view=minecraft-bedrock-stable"/>

This component can control how dolphins move, in a dolphin-esque style.

---

### `minecraft:movement.fly`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.fly?view=minecraft-bedrock-stable"/>

This move control causes the mob to fly.

---

### `minecraft:movement.generic`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.generic?view=minecraft-bedrock-stable"/>

This move control allows a mob to fly, swim, climb, etc.

---

### `minecraft:movement.glide`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.glide?view=minecraft-bedrock-stable"/>

This move control causes the mob to glide.

---

### `minecraft:movement.hover`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.hover?view=minecraft-bedrock-stable"/>

This move control causes the mob to hover.

---

### `minecraft:movement.jump`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.jump?view=minecraft-bedrock-stable"/>

Move control that causes the mob to jump as it moves with a specified delay between jumps.

---

### `minecraft:movement.skip`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.skip?view=minecraft-bedrock-stable"/>

This move control causes the mob to hop as it moves.

---

### `minecraft:movement.sway`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_movement.sway?view=minecraft-bedrock-stable"/>

This move control causes the mob to sway side to side giving the impression it is swimming.

---

---

### `minecraft:navigation.climb`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.climb?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths that include vertical walls like the vanilla Spiders do.

---

### `minecraft:navigation.float`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.float?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths by flying around the air like the regular Ghast.

---

### `minecraft:navigation.fly`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.fly?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths in the air like the vanilla Parrots do.

---

### `minecraft:navigation.generic`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.generic?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths by walking, swimming, flying and/or climbing around and jumping up and down a block.

---

### `minecraft:navigation.hover`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.hover?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths in the air like the vanilla Bees do.

---

### `minecraft:navigation.swim`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.swim?view=minecraft-bedrock-stable"/>

Allows this entity to generate paths that include water.

---

### `minecraft:navigation.walk`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_navigation.walk?view=minecraft-bedrock-stable"/>

定义实体会以行走的方式寻路并到达预定地点。

---
---

## AI 意向组件

AI 意向组件（AI Goal Components）规定了实体的 AI，规定 AI 后可以使得实体拥有“想要做什么事情”的能力。

### `minecraft:behavior.avoid_block`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.120及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_avoid_block?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.avoid_mob_type`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.120及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_avoid_mob_type?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.dig`

<Usable type="all"/> <Version add="1.19.40"/> <Highlight text="严格解析" tooltip="在1.21.120及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_dig?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.drink_milk`

<Usable type="all"/> <Version add="1.19.10"/> <Highlight text="严格解析" tooltip="在1.21.120及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_drink_milk?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.take_block`

<Usable type="all"/> <Version add="1.21.100" tooltip="在更旧的版本下使用minecraft:behavior.enderman_take_block组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_take_block?view=minecraft-bedrock-stable"/>

定义实体会拿走方块。类似于末影人。

---

### `minecraft:behavior.transport_items`

<Usable type="all"/> <Version add="1.21.100"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:navigation.*组件以进行寻路。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_transport_items?view=minecraft-bedrock-stable"/>

定义实体会从容器中运输物品，或将物品运输到容器中。类似于铜傀儡。

另见：*[`minecraft:navigation.walk`](#minecraftnavigationwalk)组件*等寻路组件。

---

### `minecraft:behavior.place_block`

<Usable type="all"/> <Version add="1.21.100" tooltip="在更旧的版本下使用minecraft:behavior.enderman_leave_block组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_place_block?view=minecraft-bedrock-stable"/>

定义实体会放下方块。类似于末影人。

---

### `minecraft:behavior.roar`

<Usable type="all"/> <Version add="1.19.0"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_roar?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.slime_attack`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_slime_attack?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.slime_float`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_slime_float?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.slime_keep_on_jumping`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_slime_keep_on_jumping?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.slime_random_direction`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_slime_random_direction?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.sniff`

<Usable type="all"/> <Version add="1.19.40"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_sniff?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.sonic_boom`

<Usable type="all"/> <Version add="1.19.40"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_sonic_boom?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.stay_near_noteblock`

<Usable type="all"/> <Version add="1.19.40"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_stay_near_noteblock?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.swim_idle`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swim_idle?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.swim_up_for_breath`

<Usable type="all"/> <Version add="1.21.20"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swim_up_for_breath?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.swim_wander`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swim_wander?view=minecraft-bedrock-stable"/>

---

### `minecraft:behavior.swoop_attack`

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="严格解析" tooltip="在1.21.110及更高格式版本版本中将无法加载包含无效数据的实体json。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swoop_attack?view=minecraft-bedrock-stable"/>

---
---

## 弃用组件

以下组件仅限旧版本的实体适用，故本文档也一并列出，但若条件允许，请尽可能使用更高版本的格式版本和组件。

### `minecraft:body_rotation_axis_aligned`

<Usable type="all"/> <Version add="1.21.70" deprecated="1.21.100" tooltip="在高版本使用minecraft:rotation_axis_aligned组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_axis_aligned?view=minecraft-bedrock-stable"/>

定义实体可被其他实体或方块推动。

另见：*[`minecraft:rotation_axis_aligned`](#minecraftrotation_axis_aligned)组件*。

---

### `minecraft:dash`

<Usable type="all"/> <Version add="1.20.40" deprecated="1.21.110" tooltip="在高版本使用minecraft:dash_action组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dash?view=minecraft-bedrock-stable"/>

定义可骑乘实体的冲刺行为。类似于骆驼。

另见：*[`minecraft:dash_action`](#minecraftdash_action)组件*。

---

### `minecraft:input_air_controlled`

<Usable type="all"/> <Version add="1.21.90" deprecated="1.21.110" tooltip="在高版本使用minecraft:rotation_axis_aligned组件代替之。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_input_air_controlled?view=minecraft-bedrock-stable"/>

当用[`minecraft:rideable`](#minecraftrideable)组件设定为可骑乘实体后，该实体将可由 WASD 和鼠标控制运动。类似于快乐恶魂。

另见：*[`minecraft:free_camera_controlled`](#minecraftfree_camera_controlled)组件*。

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

### `minecraft:behavior.enderman_leave_block`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.100" tooltip="在高版本使用minecraft:behavior.place_block组件代替之。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影人可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_enderman_leave_block?view=minecraft-bedrock-stable"/>

定义末影人会放下方块。

另见：*[`minecraft:behavior.place_block`](#minecraftbehaviorplace_block)组件*。

---

### `minecraft:behavior.enderman_take_block`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.100" tooltip="在高版本使用minecraft:behavior.take_block组件代替之。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影人可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_enderman_take_block?view=minecraft-bedrock-stable"/>

定义末影人会拿走方块。

另见：*[`minecraft:behavior.take_block`](#minecraftbehaviortake_block)组件*。

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [实体组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/componentlist?view=minecraft-bedrock-stable)
- [实体 AI 意向组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/aigoallist?view=minecraft-bedrock-stable)

[^1]: 有待验证。
