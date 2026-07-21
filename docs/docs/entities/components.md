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

### `minecraft:conditional_bandwidth_optimization`

<Usable type="all"/> <Version add="1.16.100"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_conditional_bandwidth_optimization?view=minecraft-bedrock-stable"/>

定义实体的条件空间更新带宽优化。

---

### `minecraft:dash_action`

<Usable type="all"/> <Version add="1.21.110" tooltip="在更旧的版本下使用minecraft:dash组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dash_action?view=minecraft-bedrock-stable"/>

定义可骑乘实体的冲刺行为。类似于骆驼。

---

### `minecraft:dimension_bound`

<Usable type="all"/> <Version add="1.21.40"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dimension_bound?view=minecraft-bedrock-stable"/>

定义实体不可通过传送门切换维度。

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

### `minecraft:experience_reward`

<Usable type="all"/> <Version add="1.14.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_experience_reward?view=minecraft-bedrock-stable"/>

定义实体会掉落经验球。

---

### `minecraft:free_camera_controlled`

<Usable type="all"/> <Version add="1.21.110" tooltip="在更旧的版本下使用minecraft:input_air_controlled组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_free_camera_controlled?view=minecraft-bedrock-stable"/>

当用[`minecraft:rideable`](#minecraftrideable)组件设定为可骑乘实体后，该实体将可由 WASD 和鼠标控制运动。类似于快乐恶魂。

---

### `minecraft:hurt_on_condition`

<Usable type="all"/> <Version add="1.13.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_hurt_on_condition?view=minecraft-bedrock-stable"/>

定义实体在何种条件下会受伤。

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

### `minecraft:tick_world`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_tick_world?view=minecraft-bedrock-stable"/>

定义实体高频运行世界[^1]。目前没有任何原版实体使用此组件。

---

### `minecraft:vertical_movement_action`

<Usable type="all"/> <Version add="1.21.110"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_vertical_movement.action?view=minecraft-bedrock-stable"/>

当用[`minecraft:rideable`](#minecraftrideable)组件设定为可骑乘实体后，该实体将可由玩家的跳跃行为控制竖直方向上的运动。类似于快乐恶魂。

---

## 寻路与运动组件

寻路与运动组件规定了实体在拥有一个目标后，会尝试以何种路径到达预定地点。

### `minecraft:navigation.walk`

<Usable type="all"/> <Version add="1.21.100"/> <br/>

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
