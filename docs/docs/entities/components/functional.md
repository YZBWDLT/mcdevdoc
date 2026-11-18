---
sidebar_position: 3
sidebar_label: 功能性组件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

# 功能性组件

要定位某一条，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=entity_component" color="green"/>

### `minecraft:addrider`

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:rideable组件。"/> <br/>

定义实体生成时自带的骑乘者，骑乘者数量不能超过`minecraft:rideable`组件的`seat_count`。

另见：_[`minecraft:rideable`](functional#minecraftrideable)组件_、_[EntityAddRiderComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityaddridercomponent-类)_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:addrider"/>：根对象。
  - <DataType type="array" name="riders"/>：<Version add="1.21.130" inline/>要添加的骑乘者列表，可以同时指定多名骑乘者，数量不能超过[`minecraft:rideable`](functional#minecraftrideable)的`seat_count`。
    - <DataType type="object"/>：一个骑乘者。
      - <DataType type="string" name="entity_type"/>：骑乘者的实体 ID。
      - <DataType type="string" name="spawn_event"/>：<Version add="1.11.0" inline/>生成骑乘者时触发的事件 ID。
</treeview>

> **备注**：官方文档把`entity_type`直接写在组件下、只描述单个骑乘者，26.60 的 schema 则改用`riders`数组。

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
  - <DataType type="string"/><DataType type="array" name="feed_items"/>：<Version add="1.13.0" inline/>可喂食的物品，可写单个物品 ID、物品 ID 数组，也可写成对象数组。
    - <DataType type="string"/><DataType type="object"/>：一项。写字符串为物品 ID；写对象可同时指定成长进度与转化物品。
      - <DataType type="string" name="item"/>：物品 ID。
      - <DataType type="float" name="growth"/>：喂食后推进的成长进度，按`duration`的比例计，`0.1`相当于推进总时长的十分之一。
      - <DataType type="string" name="result_item"/>：<Version add="1.21.130" inline/>喂食成功后转化成的物品，写作`物品ID:数据值`。
  - <DataType type="string" name="transform_to_item"/>：<Version add="1.17.0" deprecated="1.21.130" inline/>喂食成功后，喂食物品转化成的物品。
  - <DataType type="array" name="drop_items"/>：<Version add="1.5.0" inline/>成年时掉落的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="array" name="pause_growth_items"/>：<Version add="1.26.10" inline/>可暂停幼年体成长的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="array" name="reset_growth_items"/>：<Version add="1.26.10" inline/>可重置幼年体成长进度的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="object" name="interact_filters"/>：<Version add="1.20.60" inline/>允许喂食的条件。见[实体过滤器](../filters)。
  - <DataType type="object" name="grow_up"/>：成长为成年体时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="pause_growth"/>：<Version add="1.26.10" inline/>成长被暂停时触发的事件，结构同上。
  - <DataType type="object" name="reset_growth"/>：<Version add="1.26.10" inline/>成长进度被重置时触发的事件，结构同上。
</treeview>

> **备注**：官方 schema 中`minecraft:ageable`为`Dynamic value`，没有定义任何参数，上表按官方文档与 26.10 的更新说明整理。

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
  - <DataType type="string" name="event_name"/>：<Version add="1.13.0" inline/>默认播放的音效事件名，须在[`sounds.json`](../description#soundsjson)中定义。默认值为`ambient`。
  - <DataType type="array" name="event_names"/>：<Version add="1.19.0" inline/>按条件切换的音效事件，按顺序求值，第一个条件成立者生效；全部不成立时回退到`event_name`。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="condition"/>：判断条件，填 Molang 表达式。
      - <DataType type="string" name="event_name"/>：条件成立时播放的音效事件名。
  - <DataType type="float" name="range"/>：在最短间隔之上随机增加的秒数上限。默认值为`16`。
  - <DataType type="float" name="value"/>：两次环境音之间的最短间隔，单位为秒。默认值为`8`。
</treeview>

> **备注**：`1.26.50`起环境音效不再被运行时覆盖。此前实体的头部在水中、离地或处于幼体状态时，`event_names`会被强制换成`ambient.in.water`、`ambient.in.air`与`ambient.baby`，现在需要在`event_names`里用条件条目自行声明。旧版定义的实体会自动获得[`minecraft:uses_legacy_ambient_sounds`](./deprecated#minecraftuses_legacy_ambient_sounds)组件，该组件已弃用。

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
  - <DataType type="object" name="nuisance_filter"/>：哪些实体算作滋扰目标。见[实体过滤器](../filters)。
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
  - <DataType type="int" name="duration_delta"/>：<Version add="1.4.0" inline/>持续时长的随机浮动范围，实际时长在`duration±duration_delta`之间。默认值为`0`。
  - <DataType type="string" name="angry_sound"/>：<Version add="1.16.0" inline/>进入愤怒状态时播放的音效定义 ID。
  - <DataType type="array" name="sound_interval"/>：<Version add="1.16.0" inline/>两次愤怒音效之间的随机等待区间，单位为秒。
  - <DataType type="object" name="calm_event"/>：愤怒状态结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="filters"/>：<Version add="1.16.0" inline/>处于愤怒状态时不予攻击的目标条件。见[实体过滤器](../filters)。
  - <DataType type="boolean" name="broadcast_anger"/>：<Version add="1.13.0" inline/>是否把愤怒传播给范围内同种实体。默认值为`false`。
  - <DataType type="boolean" name="broadcast_anger_on_attack"/>：<Version add="1.16.0" inline/>攻击时是否传播愤怒。默认值为`false`。
  - <DataType type="boolean" name="broadcast_anger_on_being_attacked"/>：<Version add="1.16.0" inline/>被攻击时是否传播愤怒。默认值为`false`。
  - <DataType type="boolean" name="broadcast_anger_when_dying"/>：<Version add="1.21.50" inline/>死亡时是否传播愤怒。默认值为`true`。
  - <DataType type="int" name="broadcast_range"/>：<Version add="1.13.0" inline/>愤怒传播的距离，单位为方块。默认值为`20`。
  - <DataType type="array" name="broadcast_targets"/>：<Version add="1.13.3" inline/>愤怒传播的目标家族列表。
    - <DataType type="string"/>：家族名。
  - <DataType type="object" name="broadcast_filters"/>：<Version add="1.9.0" inline/>愤怒传播的条件。见[实体过滤器](../filters)。
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
  - <DataType type="float" name="break_time"/>：<Version add="1.12.0" inline/>破坏一扇门所需的秒数。默认值为`12`。
  - <DataType type="string" name="min_difficulty"/>：<Version add="1.12.0" inline/>允许破坏门的最低难度。可选值为`peaceful`、`easy`、`normal`、`hard`。默认值为`hard`。
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
      - <DataType type="object" name="filter"/>：生效条件。见[实体过滤器](../filters)。
      - <DataType type="float" name="horizontal_power"/>：水平击退力度。默认值为`1`。  
      <Version add="1.26.40" inline/>：不再在内部乘以`0.4`，水平与垂直方向取相近的值时击退效果也相近。
      - <DataType type="float" name="vertical_power"/>：垂直击退力度。默认值为`0.4`。
      - <DataType type="float" name="vertical_velocity_cap"/>：击退后允许的最大垂直速度。默认值为`0.4`。
      - <DataType type="float" name="scale_previous_velocity"/>：<Version add="1.26.30" deprecated="1.26.40" inline/>施加击退前对目标速度的缩放比例，`26.40`起由`slowdown_scale`取代。
      - <DataType type="float" name="slowdown_scale"/>：<Version add="1.26.40" inline/>施加击退前对目标速度的缩放比例。默认值为`0.5`。
      - <DataType type="boolean" name="scale_with_damage"/>：是否按伤害的反比平方缩放击退幅度。默认值为`false`。
      - <DataType type="boolean" name="check_if_target_is_immersed_in_water"/>：是否要求目标完全浸入水中才生效。默认值为`false`。
      - <DataType type="string" name="knockback_mode"/>：<Version add="1.26.40" inline/>击退方向的计算方式。可选值为`relative_horizontal`（由攻击者指向目标的水平方向）、`hit_direction`（按命中方向与命中点决定）。默认值为`relative_horizontal`。
      - <DataType type="string" name="extra_knockback_approach"/>：附魔、疾跑等额外击退的叠加方式。可选值为`reapply_default`（以默认参数再施加一次）、`multiply_reduced`（按基础击退与衰减系数相乘后叠加）。默认值为`reapply_default`。
</treeview>

> **备注**：官方实体文档从未收录该组件，以上参数按 26.60 的 schema 与 26.60 原版实体整理。

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

<Usable type="all"/> <Version add="1.13.3"/> <br/>

对进入范围的实体持续造成伤害。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:area_attack"/>：根对象。
  - <DataType type="string" name="cause"/>：造成的伤害类型。
  - <DataType type="int" name="damage_per_tick"/>：每刻造成的伤害。默认值为`2`。
  - <DataType type="float" name="damage_range"/>：生效的距离范围，单位为方块。默认值为`0.2`。
  - <DataType type="float" name="damage_cooldown"/>：<Version add="1.19.50" inline/>对同一目标的伤害间隔，单位为秒。默认值为`0`。
  - <DataType type="object" name="entity_filter"/>：可被伤害的实体条件。见[实体过滤器](../filters)。
  - <DataType type="boolean" name="play_attack_sound"/>：<Version add="1.19.50" inline/>造成伤害时是否播放攻击音效。默认值为`true`。
  - <DataType type="boolean" name="use_self_as_damage_source"/>：<Version add="1.26.30" inline/>是否以自身作为伤害来源。为`false`时目标不会反击，其`minecraft:damage_sensor`也无法识别攻击者。默认值为`true`。
  - <DataType type="string" name="death_message_override"/>：<Version add="1.26.30" inline/>死亡提示使用的本地化键；留空时使用该伤害类型的默认提示。
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
  - <DataType type="float" name="damage"/>：近战伤害。负值会为目标回血。默认值为`0`。
  - <DataType type="array" name="damage"/>：<Version add="未知" deprecated="1.26.60" inline/>在`[最小值, 最大值]`区间内随机。
  - <DataType type="object" name="damage"/>：<Version add="1.26.60" inline/>在`min`与`max`之间随机。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="string" name="effect_name"/>：命中时施加的状态效果 ID。
  - <DataType type="float"/><DataType type="array" name="effect_duration"/>：状态效果的持续秒数，可写`[最小值, 最大值]`；写`infinite`表示永久。
  - <DataType type="int" name="effect_amplifier"/>：<Version add="1.26.30" inline/>状态效果的等级，从`0`开始。默认值为`0`。
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
    - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

> **备注**：该组件未见于任何版本的官方文档，参数按 26.60 的 schema 整理。

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

另见：_[`minecraft:rideable`](functional#minecraftrideable)组件_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:boostable"/>：根对象。
  - <DataType type="array" name="boost_items"/>：可加速的物品列表。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="item"/>：物品 ID。
      - <DataType type="int" name="damage"/>：每次使用时物品消耗的耐久。默认值为`1`。
      - <DataType type="string" name="replace_item"/>：物品耗尽后替换为的物品 ID。
      - <DataType type="string" name="replaceItem"/>：<Version add="1.2.0" deprecated="1.13.0" inline/>物品耗尽后替换为的物品 ID（旧拼写）。
  - <DataType type="float" name="speed_multiplier"/>：加速时的速度乘数。
  - <DataType type="float" name="duration"/>：单次加速的持续秒数。
</treeview>

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

<Usable type="all"/> <Version add="1.13.3"/> <br/>

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

### `minecraft:breedable`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体的繁殖规则。

<Tabs><TabItem value="参数" label="参数" default>

<Version add="1.2.0" deprecated="1.13.0"/>：

<treeview>
- <DataType type="object" name="minecraft:breedable"/>：根对象。
  - <DataType type="array" name="breedItems"/>：可使实体进入求爱状态的物品。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="array" name="breedsWith"/>：可与该实体繁殖的实体列表。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="mateType"/>：配偶的实体 ID。
      - <DataType type="string" name="babyType"/>：幼体的实体 ID。
      - <DataType type="string" name="breed_event"/>：繁殖时触发的事件。
  - <DataType type="float" name="breedCooldown"/>：再次繁殖所需的秒数。默认值为`60`。
  - <DataType type="boolean" name="requireTame"/>：是否要求先驯服才能繁殖。默认值为`true`。
  - <DataType type="boolean" name="allowSitting"/>：是否允许在坐下时繁殖。默认值为`false`。
  - <DataType type="boolean" name="inheritTamed"/>：幼体是否随父母自动驯服。默认值为`true`。
  - <DataType type="float" name="extraBabyChance"/>：一次繁殖最多产生 16 只幼体的概率，取值`0.0`-`1.0`。默认值为`0`。
  - <DataType type="boolean" name="blend_attributes"/>：<Version add="1.8.0" inline/>幼体是否融合父母双方的部分属性。默认值为`true`。
  - <DataType type="object" name="mutation_factor"/>：幼体不继承父母变体的概率。
    - <DataType type="float" name="variant"/>：变体发生突变的概率。默认值为`0`。
    - <DataType type="float" name="extra_variant"/>：额外变体发生突变的概率。默认值为`0`。
    - <DataType type="float" name="color"/>：颜色发生突变的概率。默认值为`0`。
  - <DataType type="boolean" name="causes_pregnancy"/>：<Version add="1.5.0" inline/>为`true`时怀孕而非直接生成幼体。默认值为`false`。
  - <DataType type="array" name="environment_requirements"/>：<Version add="1.8.0" inline/>进入求爱状态所需的周围方块条件。
    - <DataType type="object"/>：一项。
      - <DataType type="array" name="blocks"/>：要求的方块列表。
        - <DataType type="string"/>：方块 ID。
      - <DataType type="int" name="count"/>：需要的方块数量。
      - <DataType type="float" name="radius"/>：搜索半径，取值`0`-`16`。
  - <DataType type="object" name="love_filters"/>：<Version add="1.12.0" inline/>进入求爱状态的条件。见[实体过滤器](../filters)。
</treeview>

<Version add="1.13.0"/>：

<treeview>
- <DataType type="object" name="minecraft:breedable"/>：根对象。
  - <DataType type="string"/><DataType type="array" name="breed_items"/>：可使实体进入求爱状态的物品，可写单个物品 ID、物品 ID 数组，也可写成对象数组。
    - <DataType type="string"/><DataType type="object"/>：一项。写字符串为物品 ID；写对象可同时指定转化物品。
      - <DataType type="string" name="item"/>：物品 ID。
      - <DataType type="string" name="result_item"/>：<Version add="1.21.130" inline/>求爱成功后转化成的物品，写作`物品ID:数据值`。
  - <DataType type="object" name="breeds_with"/>：可与该实体繁殖的对象。键为实体 ID，值可指定该组合的繁殖事件。
  - <DataType type="float" name="breed_cooldown"/>：再次繁殖所需的秒数。默认值为`60`。
  - <DataType type="boolean" name="require_tame"/>：是否要求先驯服才能繁殖。默认值为`true`。
  - <DataType type="boolean" name="require_full_health"/>：<Version add="1.16.0" inline/>是否要求满血才能繁殖。默认值为`false`。
  - <DataType type="boolean" name="allow_sitting"/>：是否允许在坐下时繁殖。默认值为`false`。
  - <DataType type="boolean" name="causes_pregnancy"/>：为`true`时怀孕而非直接生成幼体。默认值为`false`。
  - <DataType type="float" name="extra_baby_chance"/>：一次繁殖最多产生 16 只幼体的概率，取值`0.0`-`1.0`。默认值为`0`。
  - <DataType type="object" name="love_filters"/>：进入求爱状态的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="transform_to_item"/>：<Version add="1.17.0" deprecated="1.21.130" inline/>求爱成功后，求爱物品转化成的物品。
  - <DataType type="array" name="environment_requirements"/>：进入求爱状态所需的周围方块条件。
    - <DataType type="object"/>：一项。
      - <DataType type="array" name="blocks"/>：要求的方块列表。
        - <DataType type="string"/>：方块 ID。
      - <DataType type="int" name="count"/>：需要的方块数量。
      - <DataType type="float" name="radius"/>：搜索半径，取值`0`-`16`。
  - <DataType type="string" name="mutation_strategy"/>：<Version add="1.19.70" deprecated="1.26.0" inline/> 后代变种与额外变种的变异方式。可选值为`none`（不主动变异）、`random`（随机变异）。默认值为`none`。
  - <DataType type="object" name="deny_parents_variant"/>：<Version add="1.14.0" deprecated="1.26.0" inline/> 亲代变种相同时，后代改用随机变种的概率与范围。
    - <DataType type="float" name="chance"/>：改用随机变种的概率。默认值为`0`。
    - <DataType type="int" name="min_variant"/>：随机变种范围的下限（含）。默认值为`0`。
    - <DataType type="int" name="max_variant"/>：随机变种范围的上限（含）。默认值为`0`。
  - <DataType type="array" name="parent_centric_attribute_blending"/>：<Version add="1.19.70" deprecated="1.26.0" inline/> 采用父母双亲混合方式的属性列表。
    - <DataType type="string"/>：属性名，如`minecraft:health`。
  - <DataType type="array" name="property_inheritance"/>：<Version add="1.21.60" deprecated="1.26.0" inline/> 需要从亲代继承、并可能发生变异的实体属性。
  - <DataType type="array" name="random_variant_mutation_interval"/>：<Version add="1.19.70" deprecated="1.26.0" inline/> 每次繁殖额外随机变种次数的区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="array" name="random_extra_variant_mutation_interval"/>：<Version add="1.19.70" deprecated="1.26.0" inline/> 每次繁殖额外随机「额外变种」次数的区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
</treeview>

> **备注**：原版中这些值均为空对象。

> **备注**：上表最后六项在`1.26.0`起改由[`minecraft:offspring`](functional#minecraftoffspring)组件承载，写在`breedable`里不再生效。

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

### `minecraft:bucketable`

<Usable type="all"/> <Version add="1.26.40"/> <br/>

定义该实体与桶类物品的交互方式。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:bucketable"/>：根对象。
</treeview>

> **备注**：官方 schema 只把它定义为一个空对象（`1.26.40`起），没有列出任何参数；26.60 的原版实体也没有使用该组件，因此具体可由哪些参数控制目前无据可查。

</TabItem><TabItem value="示例" label="示例">

尚无可用示例。

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
  - <DataType type="string" name="movement_type"/>：<Version add="1.26.10" inline/>上下浮动的类型。可选值为`waves`（按实体速度模拟波浪）、`bobbing`（模拟波浪穿过）、`none`（不浮动）。默认值为`waves`。
  - <DataType type="float" name="big_wave_probability"/>：出现大浪的概率，仅在`waves`下生效。默认值为`0.03`。
  - <DataType type="float" name="big_wave_speed"/>：大浪的速度乘数。默认值为`10`。
  - <DataType type="float" name="drag_down_on_buoyancy_removed"/>：组件被移除时向下拖拽的力度。默认值为`0`。
  - <DataType type="boolean" name="simulate_waves"/>：<Version add="1.16.0" deprecated="1.26.10" inline/>是否按实体速度模拟波浪，由`movement_type`取代。
  - <DataType type="boolean" name="can_auto_step_from_liquid"/>：<Version add="1.26.10" inline/>被推向相邻固体方块时能否自行上岸。默认值为`false`。
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
  - <DataType type="string" name="protection_slot"/>：<Version add="1.21.130" inline/>可挡住阳光的装备槽位。可选值为`slot.weapon.mainhand`、`slot.weapon.offhand`、`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`。默认值为`slot.armor.head`。
</treeview>

> **备注**：官方文档未列出该组件的参数，`protection_slot`取自 26.60 的 schema。

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
  - <DataType type="object" name="celebration_targets"/>：判定为狩猎目标的条件。见[实体过滤器](../filters)。
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

<Version add="1.4.0" deprecated="1.13.0"/>：

<treeview>
- <DataType type="object" name="minecraft:damage_over_time"/>：根对象。
  - <DataType type="int" name="damagePerHurt"/>：每次伤害的数值。默认值为`1`。
  - <DataType type="int" name="timeBetweenHurt"/>：两次伤害之间的秒数。默认值为`0`。
</treeview>

<Version add="1.13.0"/>：

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
  - <DataType type="boolean" name="can_dash_underwater"/>：<Version add="1.21.130" inline/>是否能在水下冲刺。默认值为`false`。
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
  - <DataType type="object" name="filters"/>：消失条件。定义后标准消失规则失效。见[实体过滤器](../filters)。
  - <DataType type="boolean" name="remove_child_entities"/>：组件生效时，是否连带移除以子关系（如拴绳）相连的实体。默认值为`false`。
  - <DataType type="boolean" name="despawn_from_chance"/>：<Version add="1.16.0" inline/>标准消失规则是否使用`min_range_random_chance`。默认值为`true`。
  - <DataType type="object" name="despawn_from_distance"/>：<Version add="1.16.0" inline/>标准消失规则是否使用`min_distance`与`max_distance`。
    - <DataType type="int" name="min_distance"/>：开始尝试消失的最小距离，单位为方块。默认值为`32`。
    - <DataType type="int" name="max_distance"/>：立即消失的最大距离，单位为方块。默认值为`128`。
  - <DataType type="boolean" name="despawn_from_inactivity"/>：<Version add="1.16.0" inline/>标准消失规则是否使用`min_range_inactivity_timer`。默认值为`true`。
  - <DataType type="boolean" name="despawn_from_simulation_edge"/>：<Version add="1.16.0" inline/>实体到达模拟距离边缘时是否立即消失。默认值为`true`。
  - <DataType type="int" name="min_range_inactivity_timer"/>：<Version add="1.16.0" inline/>实体需要保持不活跃的秒数。默认值为`30`。
  - <DataType type="int" name="min_range_random_chance"/>：<Version add="1.16.0" inline/>随机消失概率的分母，每刻在`1`到该值之间取随机数。默认值为`800`。
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
  - <DataType type="boolean" name="new_screen"/>：<Version add="1.12.0" inline/>是否使用新版交易界面。默认值为`false`。
  - <DataType type="boolean" name="show_trade_screen"/>：<Version add="1.16.0" inline/>交互时是否打开交易界面。默认值为`true`。
  - <DataType type="boolean" name="persist_trades"/>：<Version add="1.12.0" inline/>生成的交易是否随实体存档保存。默认值为`false`。
  - <DataType type="boolean" name="convert_trades_economy"/>：<Version add="1.12.0" inline/>是否把旧版交易数据转换为经济交易数据。默认值为`false`。
  - <DataType type="array" name="cured_discount"/>：<Version add="1.16.0" deprecated="1.26.60" inline/>治愈村民后价格折扣的范围，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="object" name="cured_discount"/>：<Version add="1.26.60" inline/>治愈村民后价格折扣的范围。
    - <DataType type="int" name="min"/>：区间下限。默认值为`-25`。
    - <DataType type="int" name="max"/>：区间上限。默认值为`-20`。
    - <DataType type="int"/>：边界值。
  - <DataType type="array" name="max_cured_discount"/>：<Version add="1.16.0" deprecated="1.26.60" inline/>治愈折扣允许的最大范围。默认值为`[0, 0]`。
  - <DataType type="object" name="max_cured_discount"/>：<Version add="1.26.60" inline/>治愈折扣允许的最大范围。
    - <DataType type="int" name="min"/>：区间下限。默认值为`-25`。
    - <DataType type="int" name="max"/>：区间上限。默认值为`-20`。
    - <DataType type="int"/>：边界值。
  - <DataType type="int" name="nearby_cured_discount"/>：<Version add="1.16.0" inline/>附近有治愈村民时的折扣步长，旧版定价使用。默认值为`-20`。
  - <DataType type="int" name="max_nearby_cured_discount"/>：<Version add="1.16.100" inline/>附近治愈折扣允许的最低值，旧版定价使用。默认值为`-200`。
  - <DataType type="int" name="hero_demand_discount"/>：<Version add="1.12.0" inline/>玩家持有村庄英雄效果时的额外需求折扣。默认值为`-4`。
  - <DataType type="boolean" name="use_legacy_price_formula"/>：<Version add="1.16.100" inline/>是否使用旧版价格公式。默认值为`false`。
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

<Usable type="all"/> <Version add="1.21.10"/> <br/>

定义装备到[`minecraft:equippable`](./functional#minecraftequippable)第二个槽位的物品应当计入哪个盔甲槽位。

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
  - <DataType type="array" name="excluded_items"/>：<Version add="1.20.30" inline/>实体不会装备的物品。
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
  - <DataType type="array" name="slot_drop_chance"/>：<Version add="1.5.0" inline/>各槽位的掉落概率。
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
  - <DataType type="float" name="lunge"/>：<Version add="1.21.130" inline/>触发突刺附魔时的消耗，会再乘以附魔等级。默认值为`4`。
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

### `minecraft:explode`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义实体爆炸的方式，可用于引信类实体与弹射物。

<Tabs><TabItem value="参数" label="参数" default>

<Version add="1.2.0" deprecated="1.13.0"/>：

<treeview>
- <DataType type="object" name="minecraft:explode"/>：根对象。
  - <DataType type="array" name="fuseLength"/>：引信时长的随机区间，写作`[最小值, 最大值]`，负值表示立即爆炸。默认值为`[0, 0]`。
  - <DataType type="float" name="power"/>：爆炸半径与伤害强度。默认值为`3`。
  - <DataType type="float" name="maxResistance"/>：参与计算的最大方块爆炸抗性。默认值为无穷大。
  - <DataType type="boolean" name="fuseLit"/>：添加组件时引信是否已点燃。默认值为`false`。
  - <DataType type="boolean" name="causesFire"/>：爆炸范围内的方块是否着火。默认值为`false`。
  - <DataType type="boolean" name="breaks_blocks"/>：是否破坏爆炸范围内的方块。默认值为`true`。
  - <DataType type="boolean" name="destroyAffectedByGriefing"/>：是否受「允许破坏方块」的游戏规则影响。默认值为`false`。
  - <DataType type="boolean" name="fireAffectedByGriefing"/>：是否受「允许破坏方块」的游戏规则影响而决定是否着火。默认值为`false`。
</treeview>

<Version add="1.13.0"/>：

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
  - <DataType type="boolean" name="allow_underwater"/>：<Version add="1.21.40" inline/>水下是否仍然生效。默认值为`false`。
  - <DataType type="boolean" name="toggles_blocks"/>：<Version add="1.21.40" inline/>是否把范围内的方块切换为另一种状态。默认值为`false`。
  - <DataType type="float" name="damage_scaling"/>：<Version add="1.21.40" inline/>对实体伤害的缩放系数。默认值为`1.0`。
  - <DataType type="float" name="knockback_scaling"/>：<Version add="1.21.40" inline/>击退力的缩放系数。默认值为`1.0`。
  - <DataType type="boolean" name="allow_breaking_underwater"/>：<Version add="1.14.0" deprecated="1.14.1" inline/>水下是否仍可破坏方块。
  - <DataType type="boolean" name="allow_damage_underwater"/>：<Version add="1.14.0" deprecated="1.14.1" inline/>水下是否仍可造成伤害。
  - <DataType type="float" name="max_resistance"/>：参与计算的最大方块爆炸抗性。默认值为`3.4e+38`。
  - <DataType type="boolean" name="negates_fall_damage"/>：<Version add="1.21.40" inline/>是否抵消落地伤害。默认值为`false`。
  - <DataType type="string" name="particle_effect"/>：<Version add="1.21.40" inline/>爆炸使用的粒子效果名。默认值为`explosion`。
  - <DataType type="string" name="sound_effect"/>：<Version add="1.21.40" inline/>爆炸播放的音效名。默认值为`explode`。
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

<Usable type="all"/> <Version add="1.13.3"/> <br/>

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
            - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="object" name="filters"/>：哪些实体计入群体。见[实体过滤器](../filters)。
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
  - <DataType type="boolean" name="force_use"/>：<Version add="1.6.0" inline/>满血时是否仍可使用治疗物品。默认值为`false`。
  - <DataType type="object" name="filters"/>：<Version add="1.6.0" inline/>允许治疗的条件。见[实体过滤器](../filters)。
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
  - <DataType type="string" name="restriction_type"/>：<Version add="1.21.40" inline/>限制方式。可选值为`none`（不限制）、`random_movement`（只限制随机移动）、`all_movement`（限制一切移动，但已经远离家的实体仍可往回走）。默认值为`none`。
  - <DataType type="int" name="restriction_radius"/>：<Version add="1.16.100" inline/>限制半径，单位为方块。默认值为`0`。
  - <DataType type="array" name="home_block_list"/>：<Version add="1.16.200" inline/>可视为有效「家」的方块列表；该位置的方块不再是其中之一时，家的限制被移除。方块 ID 不支持数据值写法（如`minecraft:sand:1`）。
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

### `minecraft:ignore_cannot_be_attacked`

<Usable type="all"/> <Version add="1.21.50"/> <br/>

允许拥有者实体忽略满足过滤器条件的实体身上的[`minecraft:cannot_be_attacked`](./functional#minecraftcannot_be_attacked)组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:ignore_cannot_be_attacked"/>：根对象。
  - <DataType type="object" name="filters"/>：可以照常攻击的实体条件。见[实体过滤器](../filters)。
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
        - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
      - <DataType type="float" name="cooldown_after_being_attacked"/>：<Version add="1.16.0" inline/>被攻击后多少秒内不可交互。默认值为`0`。
      - <DataType type="string" name="drop_item_slot"/>：<Version add="1.20.60" inline/>取走装备时从哪个槽位掉落，可写整数字符串（如`"0"`）表示物品栏槽位，也可写`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`、`slot.weapon.mainhand`、`slot.weapon.offhand`。
      - <DataType type="float" name="drop_item_y_offset"/>：<Version add="1.21.80" inline/>掉落物品的垂直偏移，单位为方块。默认值为`0`。
      - <DataType type="string" name="equip_item_slot"/>：<Version add="1.19.60" inline/>交互物品装备到的槽位，可写整数字符串（如`"0"`）表示物品栏槽位，也可写`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`、`slot.weapon.mainhand`、`slot.weapon.offhand`。
      - <DataType type="boolean" name="give_item"/>：为`true`时把玩家手中的物品交给实体。默认值为`false`。
      - <DataType type="int" name="health_amount"/>：<Version add="1.18.10" inline/>交互时恢复的生命值。默认值为`0`。
      - <DataType type="int" name="hurt_item"/>：交互时消耗手持物品的耐久值。默认值为`0`。
      - <DataType type="string" name="interact_text"/>：交互按钮的本地化键，例如`action.interact.saddle`。
      - <DataType type="object" name="on_interact"/>：交互命中该项时触发的事件。
        - <DataType type="string" name="event"/>：事件 ID。
        - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
        - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
      - <DataType type="object" name="particle_on_start"/>：交互开始时播放的粒子。
        - <DataType type="string" name="copper_event"/>：铜制品的处理动作。可选值为`none`、`wax_on`、`wax_off`、`scrape`。
        - <DataType type="boolean" name="particle_offset_towards_interactor"/>：为`true`时粒子朝交互者方向偏移。默认值为`false`。
        - <DataType type="string" name="particle_type"/>：粒子效果名。
        - <DataType type="float" name="particle_y_offset"/>：粒子的垂直偏移。默认值为`0`。
      - <DataType type="array" name="play_sounds"/>：交互时播放的音效事件名。默认值为空数组。  
    <Version add="1.26.50" inline/>：只接受数组，不再接受单个字符串。
        - <DataType type="string"/>：一个音效事件名。
      - <DataType type="object" name="repair_entity_item"/>：<Version add="1.20.80" inline/>交互时修复实体已装备的物品。
        - <DataType type="int" name="amount"/>：每次修复的耐久值。默认值为`1`。
        - <DataType type="string" name="slot"/>：要修复的槽位，可写整数字符串（如`"0"`）表示物品栏槽位，也可写`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`、`slot.weapon.mainhand`、`slot.weapon.offhand`。
      - <DataType type="array" name="spawn_entities"/>：交互时生成的实体列表。默认值为空数组。
        - <DataType type="string"/>：实体标识符。
      - <DataType type="object" name="spawn_items"/>：交互时掉落的物品。
        - <DataType type="string" name="table"/>：战利品表路径，相对于行为包根目录。
        - <DataType type="float" name="y_offset"/>：掉落物的垂直偏移，单位为方块。默认值为`1`。
      - <DataType type="boolean" name="swing"/>：<Version add="1.26.0" inline/> 为`true`时交互时手臂摆动。默认值为`true`，格式版本低于`1.26.0`时默认为`false`。
      - <DataType type="boolean" name="take_item"/>：为`true`时取走玩家手中的物品。默认值为`false`。
      - <DataType type="string" name="transform_to_item"/>：把玩家的交互物品变成另一个物品。
      - <DataType type="boolean" name="use_item"/>：为`true`时使用玩家手中的物品。默认值为`false`。
      - <DataType type="string" name="vibration"/>：<Version add="1.19.0" inline/>交互产生的振动事件类型。可选值为`none`、`entity_act`、`entity_die`、`entity_interact`、`shear`。
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
  - <DataType type="int" name="linked_slots_size"/>：<Version add="1.2.0" deprecated="1.6.0" inline/>与实体物品栏联动的槽位数量。
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

另见：_[`minecraft:movement.skip`](movement#minecraftmovementskip)组件_、_[EntityMovementSkipComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementskipcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:jump.dynamic"/>：根对象。
  - <DataType type="object" name="regular_skip_data"/>：<Version add="1.26.0" inline/>普通跳跃使用的数据。
    - <DataType type="float" name="distance_scale"/>：水平速度的乘数。默认值为`1`。
    - <DataType type="float" name="height"/>：起跳时施加的垂直力度。默认值为`0.1`。
    - <DataType type="int" name="jump_delay"/>：两次跳跃之间相隔的刻数。默认值为`30`。
    - <DataType type="int" name="animation_duration"/>：跳跃动画的时长，单位为刻。默认值为`1`。
  - <DataType type="object" name="fast_skip_data"/>：<Version add="1.26.0" inline/>快速跳跃使用的数据，结构同上。
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
  - <DataType type="float" name="jump_power"/>：<Version add="1.4.0" inline/>起跳的初始垂直速度。默认值为`0.42`。
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
  - <DataType type="float" name="value"/>：击退抗性，取值`-2.0`-`1.0`，`1.0`表示完全免疫击退。  
    <Version add="1.26.20" inline/>：支持负值，最低`-2.0`，此时击退会被放大。
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
  - <DataType type="boolean" name="can_be_stolen"/>：<Version add="1.10.0" inline/>为`true`时，其他玩家可以把已被拴住的实体改拴到自己身上。默认值为`true`。
  - <DataType type="boolean" name="can_be_cut"/>：<Version add="1.21.90" inline/> 为`true`时，玩家可以用剪刀剪断拴在该实体上的绳子。默认值为`true`。
  - <DataType type="boolean" name="unleash_on_removal"/>：<Version add="1.26.30" inline/> 为`true`时，组件被移除时自动解开拴绳。默认值为`true`。
  - <DataType type="boolean" name="on_unleash_interact_only"/>：<Version add="1.21.80" inline/>为`true`时，`on_unleash`只在玩家主动交互解开时触发。默认值为`false`。
  - <DataType type="int" name="hard_distance"/>：牵引力开始生效的距离，单位为方块。默认值为`6`。
  - <DataType type="int" name="soft_distance"/>：实体开始寻路靠近拴绳持有者的距离，单位为方块。默认值为`4`。
  - <DataType type="int" name="max_distance"/>：拴绳断裂的距离，单位为方块。默认值为`0`。
  - <DataType type="string"/><DataType type="object" name="on_leash"/>：被拴住时触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
  - <DataType type="string"/><DataType type="object" name="on_unleash"/>：被解开时触发的事件，写法同上。
  - <DataType type="array" name="presets"/>：<Version add="1.21.80" inline/> 按条件生效的牵引配置，取第一条`filter`成立者；全部不成立时用默认配置。其中各项会覆盖上面的同名根字段。
    - <DataType type="object"/>：一项。
      - <DataType type="object" name="filter"/>：生效条件。见[实体过滤器](../filters)。
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
  - <DataType type="boolean" name="unleash_on_removal"/>：<Version add="1.26.30" inline/>为`true`时，组件被移除后自动解开拴在该实体上的所有实体。默认值为`true`。
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
  - <DataType type="float" name="min_looked_at_duration"/>：<Version add="1.21.60" inline/>需要被连续注视多少秒才算生效。默认值为`0`。
  - <DataType type="boolean" name="scale_fov_by_distance"/>：为`true`时视场角随距离收窄，使视锥在实体处的宽度大致恒定。默认值为`true`。
  - <DataType type="object" name="filters"/>：哪些实体算作注视者。见[实体过滤器](../filters)。
  - <DataType type="string" name="line_of_sight_obstruction_type"/>：判定视线遮挡时使用的方块形状。可选值为`outline`（碰撞轮廓）、`collision`（碰撞箱）、`collision_for_camera`（相机用碰撞箱）。默认值为`collision`。
  - <DataType type="array" name="look_at_locations"/>：被判定为「注视」的躯体部位，至少一处无遮挡即算注视。
    - <DataType type="object"/>：一个部位。
      - <DataType type="string" name="location"/>：部位名。可填`head`、`body`、`feet`。
  - <DataType type="array" name="looked_at_cooldown"/>：检测到注视者后再次检测所需等待的随机秒数区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="string"/><DataType type="object" name="set_target"/>：是否以及如何把注视者设为战斗目标。可选值为`never`（不设置）、`once_and_stop_scanning`（设置一次后停止扫描）、`once_and_keep_scanning`（设置后继续扫描）。默认值为`once_and_stop_scanning`。
  - <DataType type="object" name="looked_at_event"/>：检测到注视者时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="int" name="cooldown_time"/>：<Version add="1.19.0" inline/>两次施加之间的冷却秒数。默认值为`0`。
  - <DataType type="boolean" name="ambient"/>：<Version add="1.21.130" inline/>效果是否按环境效果渲染（如信标、潮涌核心施加的效果）。默认值为`false`。
  - <DataType type="object" name="entity_filter"/>：可以受到该效果影响的实体条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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
  - <DataType type="boolean" name="combine_parent_colors"/>：<Version add="1.21.60" inline/> 幼体是否混合双亲的颜色。该参数在`1.26.0`之前属于`minecraft:breedable`。
  - <DataType type="string" name="mutation_strategy"/>：后代变异的策略，可选值为`random`（随机选取）与`none`（不随机）。
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
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

> **备注**：该组件未见于任何版本的官方文档，参数按 26.60 的 schema 整理。

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
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

定义实体开始落地时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_start_landing"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

定义实体开始起飞时触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_start_takeoff"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.8.0"/> <br/>

定义主人与实体一同睡醒后触发的事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_wake_with_owner"/>：根对象。
  - <DataType type="string" name="event"/>：要触发的事件 ID。
  - <DataType type="object" name="filters"/>：触发该事件的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.13.0"/> <br/>

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
  <Version add="1.26.50" inline/>：改为接受这三个字符串，更早的格式版本需写成整数`0`（原点）、`1`（眼睛高度）、`2`（中心）。
  - <DataType type="array" name="offset"/>：相对`anchor`的生成偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
  - <DataType type="float" name="power"/>：发射的初始速度，单位为方块每刻。默认值为`1.3`。
  - <DataType type="float" name="gravity"/>：每刻施加的向下加速度。默认值为`0.05`。
  - <DataType type="float" name="inertia"/>：飞行中每刻保留的速度比例。默认值为`0.99`。
  - <DataType type="float" name="liquid_inertia"/>：在液体中每刻保留的速度比例。默认值为`0.6`。
  - <DataType type="float" name="angle_offset"/>：<Version add="1.13.0" inline/>在射击者瞄准方向之上额外增加的俯仰角，单位为度。默认值为`0`。
  - <DataType type="float" name="uncertainty_base"/>：<Version add="1.13.0" inline/>发射方向的基础散布值。实际散布为`uncertainty_base - 难度等级 × uncertainty_multiplier`。默认值为`0`。
  - <DataType type="float" name="uncertainty_multiplier"/>：<Version add="1.13.0" inline/>每级难度减少的散布量。默认值为`0`。
  - <DataType type="boolean" name="shoot_target"/>：<Version add="1.13.0" inline/>为`true`时瞄准射击者的当前目标。默认值为`true`。
  - <DataType type="boolean" name="homing"/>：为`true`时在飞行中转向追踪目标。默认值为`false`。
  - <DataType type="boolean" name="is_dangerous"/>：<Version add="1.13.0" inline/>为`true`时标记为危险弹射物，影响生物的反应。默认值为`false`。
  - <DataType type="boolean" name="isolated_physics"/>：<Version add="1.26.20" inline/>为`true`时使用独立的弹道物理，不受实体运动影响。默认值为`true`。  
  <Version add="1.26.30" inline/>：格式版本低于`1.26.30`时默认值为`false`。
  - <DataType type="boolean" name="multiple_targets"/>：<Version add="1.5.0" inline/>为`true`时飞行途中可连续命中多个实体。默认值为`false`。  
  <Version add="1.26.50" inline/>：格式版本低于`1.26.50`时默认值为`true`。
  - <DataType type="boolean" name="hit_water"/>：为`true`时把水面视作命中面并停下。默认值为`false`。
  - <DataType type="boolean" name="hit_nearest_passenger"/>：<Version add="1.21.0" inline/>为`true`时命中载具后改为命中其上最近的乘客。默认值为`false`。
  - <DataType type="array" name="ignored_entities"/>：<Version add="1.21.0" inline/>弹射物会直接穿过的实体 ID 列表。
    - <DataType type="string"/>：实体 ID。
  - <DataType type="boolean" name="destroy_on_hurt"/>：<Version add="1.13.0" inline/>为`true`时命中后立即移除该弹射物。默认值为`false`。
  - <DataType type="boolean" name="stop_on_hurt"/>：为`true`时命中后把速度清零。默认值为`false`。
  - <DataType type="boolean" name="reflect_on_hurt"/>：<Version add="1.13.0" inline/>为`true`时被击中后转向反弹。默认值为`false`。
  - <DataType type="float" name="reflect_immunity"/>：<Version add="1.21.40" inline/>发射后免疫反弹的秒数。默认值为`0`。
  - <DataType type="boolean" name="crit_particle_on_hurt"/>：<Version add="1.13.0" inline/>为`true`时命中时产生暴击粒子。默认值为`false`。
  - <DataType type="boolean" name="catch_fire"/>：<Version add="1.13.0" inline/>为`true`时点燃命中的目标。默认值为`false`。
  - <DataType type="float" name="on_fire_time"/>：<Version add="1.13.0" inline/>命中后被点燃的实体持续着火的秒数。默认值为`5`。
  - <DataType type="boolean" name="spread_fire"/>：为`true`时，着火的弹射物命中后会把火蔓延到目标身上。默认值为`true`。
  - <DataType type="boolean" name="lightning"/>：<Version add="1.4.0" inline/>为`true`时命中时召唤闪电。默认值为`false`。
  - <DataType type="boolean" name="should_bounce"/>：<Version add="1.13.0" deprecated="1.26.40" inline/>是否从实体上弹开。默认值为`false`。
  - <DataType type="string" name="should_bounce"/>：<Version add="1.26.40" inline/>是否从实体上弹开。可选值为`no`（不弹开）、`if_invulnerable`（目标免疫伤害时弹开）、`if_no_damage_dealt`（未造成伤害时弹开）。默认值为`no`。
  - <DataType type="string" name="shoot_sound"/>：<Version add="1.13.0" inline/>发射时播放的声音定义 ID。
  - <DataType type="string" name="hit_sound"/>：<Version add="1.13.0" inline/>命中实体时播放的声音定义 ID。
  - <DataType type="string" name="hit_ground_sound"/>：命中方块时播放的声音定义 ID。
  - <DataType type="string" name="particle"/>：命中时生成的原版粒子效果名。默认值为`iconcrack`。
  - <DataType type="int" name="potion_effect"/>：<Version add="1.13.0" inline/>弹射物携带的药水辅助值，通常由投掷物品在运行时设置。默认值为`-1`。
  - <DataType type="float" name="splash_range"/>：<Version add="1.13.0" inline/>药水效果的溅射半径，单位为方块。默认值为`4`。
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
        - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](../filters)。
        - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
      <Version add="1.26.40" inline/>：默认值由`2`改为`0`，并且不再参与难度随机化。
      - <DataType type="float" name="min_critical_damage"/>：暴击伤害的下限。默认值为`0`。
      - <DataType type="float" name="max_critical_damage"/>：暴击伤害的上限。默认值为`2147483647`。
      - <DataType type="boolean" name="ceil_pre_critical_damage"/>：<Version add="1.26.40" inline/>为`true`时先把暴击加成前的伤害向上取整。默认值为`false`。
      - <DataType type="boolean" name="knockback"/>：为`true`时对目标施加击退。默认值为`false`。
      - <DataType type="boolean" name="apply_knockback_to_blocking_targets"/>：为`true`时对格挡中的目标也施加击退。默认值为`false`。
      - <DataType type="boolean" name="catch_fire"/>：为`true`时点燃被命中的目标。默认值为`false`。
      - <DataType type="boolean" name="channeling"/>：为`true`时命中会引发引雷效果（雷雨天召唤闪电）。默认值为`false`。
      - <DataType type="boolean" name="destroy_on_hit"/>：为`true`时命中后移除弹射物。默认值为`false`。
      - <DataType type="boolean" name="destroy_on_hit_requires_damage"/>：为`true`时只有实际造成伤害才会移除弹射物。默认值为`true`。
      - <DataType type="boolean" name="set_last_hurt_requires_damage"/>：为`true`时只有实际造成伤害才记录为最近一次伤害来源。默认值为`true`。
      - <DataType type="boolean" name="semi_random_diff_damage"/>：<Version add="未知" deprecated="1.26.40" inline/>是否按难度随机化伤害，`1.26.40`起由`difficulty_randomization`取代。默认值为`false`。
      - <DataType type="string" name="difficulty_randomization"/>：<Version add="1.26.40" inline/>按难度调整伤害的方式。可选值为`none`（不调整）、`additive`（叠加）、`multiplicative`（相乘）。默认值为`none`。
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
      - <DataType type="float" name="first_spawn_chance"/>：<Version add="1.26.50" inline/>第一次生成的概率，取值`0.0`-`1.0`。默认值为`0`。
      - <DataType type="int" name="first_spawn_count"/>：第一次生成的数量。默认值为`0`。
      - <DataType type="float" name="second_spawn_chance"/>：<Version add="1.26.50" inline/>第二次生成的概率，取值`0.0`-`1.0`。默认值为`0`。
      - <DataType type="int" name="second_spawn_count"/>：第二次生成的数量。默认值为`0`。
      - <DataType type="boolean" name="spawn_baby"/>：为`true`时生成幼年个体。默认值为`false`。
      - <DataType type="array" name="on_spawn"/>：生成后对生成实体触发的事件。默认值为空数组。
        - <DataType type="object"/>：一个事件。
          - <DataType type="string" name="event"/>：事件 ID。
          - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](../filters)。
          - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

> **备注**：该组件的官方文档参数表长期不完整——`on_hit`、`anchor`、`hit_ground_sound`、`stop_on_hurt`直到 1.26.40 才被文档列出，而 1.20.80 的原版箭早已在使用`on_hit`与`anchor`。因此本节各参数暂不标注加入版本。

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

<Usable type="all"/> <Version add="1.12.0"/> <br/>

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
        - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="boolean" name="rider_can_interact"/>：<Version add="1.6.0" inline/>为`true`时，骑乘者看向该实体即可选中它。默认值为`false`。
  - <DataType type="boolean" name="pull_in_entities"/>：为`true`时，符合`family_types`的实体会被拉入空座位。默认值为`false`。
  - <DataType type="float" name="passenger_max_width"/>：<Version add="1.20.0" inline/>可成为骑乘者的实体最大宽度，`0`表示不限。默认值为`0`。
  - <DataType type="string" name="dismount_mode"/>：<Version add="1.21.80" inline/>骑乘者下马时的落点。可选值为`default`（默认方式）、`on_top_center`（落在实体顶部中心）、`look_direction`（落在骑乘者视线方向）。默认值为`default`。  
  <Version add="1.26.60" inline/>：新增`look_direction`取值。
  - <DataType type="string"/><DataType type="object" name="on_rider_enter_event"/>：<Version add="1.21.80" inline/>有实体开始骑乘时在该实体身上触发的事件。可写事件 ID，也可写成含`event`与`target`的对象。
  - <DataType type="string"/><DataType type="object" name="on_rider_exit_event"/>：<Version add="1.21.80" inline/>有实体停止骑乘时触发的事件，写法同上。
  - <DataType type="array" name="seats"/>：座位列表。
    - <DataType type="object"/>：一个座位。
      - <DataType type="array" name="position"/>：座位相对实体位置的偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
      - <DataType type="int" name="min_rider_count"/>：该座位生效所需的最少骑乘者数量。默认值为`0`。
      - <DataType type="int" name="max_rider_count"/>：该座位允许的最多骑乘者数量。默认值为`0`。
      - <DataType type="float" name="lock_rider_rotation"/>：骑乘者在此座位上可转动的角度上限，单位为度；省略则不受限。默认值为`181`。
      - <DataType type="string" name="rotate_rider_by"/>：骑乘者的朝向偏移，填 Molang 表达式。默认值为`0`。
      - <DataType type="float" name="third_person_camera_radius"/>：<Version add="1.21.80" inline/>该座位在第三人称视角与第三人称正面视角下使用的相机半径，取值`1`-`64`，负值忽略。
      - <DataType type="float" name="camera_relax_distance_smoothing"/>：<Version add="1.21.80" inline/>相机被障碍物推近后回到完整距离时的弹性刚度，取值`1`-`32`。
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
  - <DataType type="array" name="scheduled_event"/>：<Version add="1.10.0" deprecated="1.13.3" inline/>定时触发的事件列表（旧字段名）。
  - <DataType type="array" name="scheduled_events"/>：预定事件列表，按顺序取第一条条件成立者。
    - <DataType type="object"/>：一项。
      - <DataType type="object" name="filters"/>：该事件生效的条件。见[实体过滤器](../filters)。
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

<Version add="1.2.0" deprecated="1.8.0"/>：

<treeview>
- <DataType type="array" name="minecraft:shareables"/>：实体感兴趣的物品列表。
  - <DataType type="object"/>：一种物品。
    - <DataType type="string" name="item"/>：物品 ID。
    - <DataType type="int" name="want_amount"/>：希望分享的数量，`-1`表示不限。默认值为`-1`。
    - <DataType type="int" name="surplus_amount"/>：视为多余、可以分享给其他实体的数量，`-1`表示不限。默认值为`-1`。
    - <DataType type="string" name="craft_into"/>：拾取后用于合成的目标物品 ID。
</treeview>

<Version add="1.8.0"/>：

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
      - <DataType type="boolean" name="barter"/>：为`true`时拾取后会用于以物易物，需要配合[`minecraft:barter`](./functional#minecraftbarter)组件。默认值为`false`。
      - <DataType type="string" name="craft_into"/>：拾取后用于合成的目标物品 ID。
  - <DataType type="boolean" name="singular_pickup"/>：<Version add="1.20.10" inline/>为`true`时，同类物品只捡起一个。默认值为`false`。
  - <DataType type="boolean" name="all_items"/>：<Version add="1.13.0" inline/>为`true`时把其余所有物品作为兜底类别，该类别优先级总是最低。默认值为`false`。
  - <DataType type="int" name="all_items_want_amount"/>：<Version add="1.13.0" inline/>兜底类别希望分享的数量，`-1`表示不限。默认值为`-1`。
  - <DataType type="int" name="all_items_surplus_amount"/>：<Version add="1.13.0" inline/>兜底类别视为多余的数量，`-1`表示不限。默认值为`-1`。
  - <DataType type="int" name="all_items_max_amount"/>：<Version add="1.13.3" inline/>兜底类别的最大持有数量，`-1`表示不限。默认值为`-1`。
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

定义实体的远程攻击行为，供[`minecraft:behavior.ranged_attack`](./ai#minecraftbehaviorranged_attack)等行为决定发射哪一种弹射物。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:shooter"/>：根对象。
  - <DataType type="string" name="def"/>：默认弹射物使用的实体定义 ID，如`minecraft:arrow`。
  - <DataType type="int" name="aux_val"/>：默认弹射物携带的药水效果辅助值。默认值为`-1`。
  - <DataType type="int" name="auxVal"/>：<Version add="1.2.0" deprecated="1.13.0" inline/>默认弹射物携带的药水效果辅助值（旧拼写）。默认值为`-1`。
  - <DataType type="float" name="power"/>：<Version add="1.19.60" inline/>弹射物的发射速度。默认值为`0`，此时由弹射物自身的`power`决定。
  - <DataType type="boolean" name="magic"/>：<Version add="1.19.60" inline/>为`true`时把弹射物标记为魔法伤害。默认值为`false`。
  - <DataType type="string" name="sound"/>：<Version add="1.19.60" inline/>发射时播放的音效事件名。
  - <DataType type="array" name="projectiles"/>：<Version add="1.19.60" inline/>可选的弹射物列表，按顺序取第一条条件成立者。
    - <DataType type="object"/>：一项。
      - <DataType type="string" name="def"/>：该弹射物的实体定义 ID。
      - <DataType type="int" name="aux_val"/>：该弹射物携带的药水效果辅助值。默认值为`-1`。
      - <DataType type="object" name="filters"/>：选择该弹射物的条件。见[实体过滤器](../filters)。
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
      - <DataType type="int" name="num_to_spawn"/>：<Version add="1.10.0" inline/>每次生成的实体数量。默认值为`1`。
      - <DataType type="boolean" name="should_leash"/>：<Version add="1.10.0" inline/>为`true`时，生成的实体会拴在该实体上。默认值为`false`。
      - <DataType type="boolean" name="single_use"/>：<Version add="1.10.0" inline/>为`true`时只生成一次。默认值为`false`。
      - <DataType type="string" name="spawn_method"/>：生成方式。可选值为`born`、`spawned`、`summoned`。默认值为`born`。
      - <DataType type="string" name="spawn_event"/>：生成时在新生实体身上触发的事件。默认值为`minecraft:entity_born`。
      - <DataType type="string"/><DataType type="object" name="spawn_item_event"/>：<Version add="1.20.0" inline/>生成物品时在该实体身上触发的事件。
      - <DataType type="string" name="spawn_sound"/>：生成时播放的音效。默认值为`plop`。
      - <DataType type="object" name="filters"/>：<Version add="1.10.0" inline/>允许生成的条件。见[实体过滤器](../filters)。
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
  - <DataType type="object" name="filters"/>：允许生成的条件。见[实体过滤器](../filters)。
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
  - <DataType type="array" name="tame_items"/>：<Version add="1.13.0" inline/>可用于驯服的物品列表。
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
  - <DataType type="int" name="min_temper"/>：<Version add="1.13.0" inline/>初始脾气的最小值。默认值为`0`。
  - <DataType type="int" name="max_temper"/>：<Version add="1.13.0" inline/>脾气的上限，达到即驯服。默认值为`100`。
  - <DataType type="int" name="attempt_temper_mod"/>：<Version add="1.13.0" inline/>每次被骑乘时脾气的增加量。默认值为`5`。
  - <DataType type="array" name="feed_items"/>：<Version add="1.13.0" inline/>可用于喂食的物品列表。
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
  - <DataType type="boolean" name="random_teleports"/>：<Version add="1.13.0" inline/>为`true`时允许随机传送。默认值为`true`。
  - <DataType type="float" name="min_random_teleport_time"/>：<Version add="1.13.0" inline/>两次随机传送之间的最短间隔，单位为秒。默认值为`0`。
  - <DataType type="float" name="max_random_teleport_time"/>：<Version add="1.13.0" inline/>两次随机传送之间的最长间隔，单位为秒。默认值为`20`。
  - <DataType type="array" name="random_teleport_cube"/>：<Version add="1.13.0" inline/>随机传送的范围，写作`[x, y, z]`，表示以实体为中心的立方体尺寸。默认值为`[32, 16, 32]`。
  - <DataType type="float" name="target_distance"/>：<Version add="1.13.0" inline/>追逐目标时传送的最大距离，单位为方块。默认值为`16`。
  - <DataType type="float" name="target_teleport_chance"/>：<Version add="1.13.0" inline/>追逐目标时每刻传送的概率。默认值为`1`。
  - <DataType type="float" name="light_teleport_chance"/>：<Version add="1.13.0" inline/>处于光照下时传送概率的修正值。默认值为`0.01`。
  - <DataType type="float" name="dark_teleport_chance"/>：<Version add="1.13.0" inline/>处于黑暗中时传送概率的修正值。默认值为`0.01`。
  - <DataType type="boolean" name="teleports_on_projectile_hit"/>：<Version add="1.26.50" inline/>为`true`时会在被弹射物命中前尝试传送闪避。默认值为`false`。
  - <DataType type="object" name="projectile_filter"/>：<Version add="1.26.50" inline/>哪些弹射物会触发闪避传送。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="未知"/> <br/>

使实体的交易在补给后重新补满。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:trade_resupply"/>：根对象，不含任何参数。
</treeview>

> **备注**：该组件未见于任何版本的官方文档，加入版本无法确认；原版只有`villager_v2.json`使用，而村民补货机制自 1.11.0（村庄与掠夺）起出现，故加入版本不早于 1.11.0。

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
  - <DataType type="boolean" name="new_screen"/>：<Version add="1.12.0" inline/>为`true`时使用新版交易界面。默认值为`false`。
  - <DataType type="boolean" name="persist_trades"/>：<Version add="1.12.0" inline/>为`true`时，实体转换形态后保留已生成的交易。默认值为`false`。
  - <DataType type="boolean" name="convert_trades_economy"/>：<Version add="1.12.0" inline/>实体转换形态时，是否把旧版交易数据转换为经济交易数据。默认值为`false`。
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
  - <DataType type="array" name="spawn_offset"/>：<Version add="1.16.0" inline/>生成位置相对实体位置的偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
  - <DataType type="int" name="radius"/>：<Version add="1.26.60" inline/>以`spawn_offset`为中心的水平方形半径，取值`-1`-`16`。默认值为`-1`，此时沿用旧版的四角放置行为。
  - <DataType type="array" name="replaceable_blocks"/>：<Version add="1.26.60" inline/>可以被轨迹方块替换的方块列表，不指定时只替换空气。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="force_replace_matched_blocks"/>：<Version add="1.26.60" inline/>为`true`时，即使方块不属于可替换列表也会被替换。默认值为`false`。
  - <DataType type="object" name="spawn_filter"/>：允许生成轨迹的条件。见[实体过滤器](../filters)。
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
  <Version add="1.26.60" inline/>：只接受对象写法（`{"value": 秒数}`），不再接受纯数字。
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
  - <DataType type="array" name="begin_transform_sound"/>：开始转换时播放的音效事件名。  
  <Version add="1.26.60" inline/>：只接受数组，不再接受单个字符串。
  - <DataType type="array" name="transformation_sound"/>：转换完成时播放的音效事件名。  
  <Version add="1.26.60" inline/>：只接受数组，不再接受单个字符串。
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

启用后，[`minecraft:friction_modifier`](./functional#minecraftfriction_modifier)按旧版公式计算摩擦力。

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

import GiscusComment from "/src/components/comment/giscus.js"
import Button from '/src/components/button/base';

<GiscusComment/>
