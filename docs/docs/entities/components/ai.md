---
sidebar_position: 5
sidebar_label: AI 意向组件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

# AI 意向组件

AI 意向组件（AI Goal Components）规定了实体的 AI，规定 AI 后可以使得实体拥有“想要做什么事情”的能力。

要定位某一条，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=entity_component" color="green"/>

### `minecraft:behavior.admire_item`

<Usable type="all"/> <Version add="1.16.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:admire_item组件。"/> <br/>

使生物欣赏被标记为可欣赏的物品。

另见：_[`minecraft:admire_item`](functional#minecraftadmire_item)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.admire_item"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="admire_item_sound"/>：欣赏物品时播放的音效事件名。
  - <DataType type="array" name="sound_interval"/>：<Version add="1.16.0" deprecated="1.26.20" inline/>两次音效之间随机等待的秒数区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="object" name="sound_interval"/>：<Version add="1.26.20" inline/>两次音效之间随机等待的秒数区间。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="object" name="on_admire_item_start"/>：开始欣赏物品时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="未知"/> <br/>

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

<Usable type="all"/> <Version add="1.18.30"/> <br/>

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
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物避开特定类型的实体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.avoid_mob_type"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：要避开的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
      - <DataType type="float" name="max_dist"/>：触发躲避的最大距离，单位为方块。
      - <DataType type="float" name="walk_speed_multiplier"/>：躲避时行走速度的乘数。
      - <DataType type="float" name="sprint_speed_multiplier"/>：躲避时疾跑速度的乘数。
      - <DataType type="boolean" name="check_if_outnumbered"/>：是否仅在对方数量占优时躲避。
  - <DataType type="float" name="max_dist"/>：搜索躲避目标的最大距离，单位为方块。默认值为`3`。
  - <DataType type="float" name="max_flee"/>：<Version add="1.4.0" inline/> 逃到距目标多远时停止逃跑，单位为方块。默认值为`10`。
  - <DataType type="float" name="sprint_distance"/>：<Version add="1.18.30" inline/> 距目标多近时开始疾跑，单位为方块。默认值为`7`。
  - <DataType type="int" name="avoid_target_xz"/>：<Version add="1.18.30" inline/> 逃跑目标点在水平方向上的选取范围，单位为方块。默认值为`16`。
  - <DataType type="int" name="avoid_target_y"/>：<Version add="1.18.30" inline/> 逃跑目标点在垂直方向上的选取范围，单位为方块。默认值为`7`。
  - <DataType type="boolean" name="ignore_visibility"/>：<Version add="1.18.30" inline/> 为`true`时逃跑途中不考虑视线是否被遮挡。默认值为`false`。
  - <DataType type="boolean" name="remove_target"/>：<Version add="1.18.30" inline/> 为`true`时逃跑期间清除当前攻击目标。默认值为`false`。
  - <DataType type="float" name="probability_per_strength"/>：按对方力量决定停止躲避的概率。默认值为`1`。
  - <DataType type="float" name="walk_speed_multiplier"/>：行走速度的乘数。默认值为`1`。
  - <DataType type="float" name="sprint_speed_multiplier"/>：疾跑速度的乘数。默认值为`1`。
  - <DataType type="float" name="river_speed_multiplier"/>：沿河流逃跑时的速度乘数。默认值为`0.75`。
  - <DataType type="string" name="avoid_mob_sound"/>：<Version add="1.18.30" inline/> 躲避时播放的音效事件名。
  - <DataType type="array" name="sound_interval"/>：<Version add="1.18.30" inline/> 两次音效之间随机等待的秒数区间，写作`[最小值, 最大值]`。默认值为`[3, 8]`。
  - <DataType type="object" name="on_escape_event"/>：<Version add="1.18.30" inline/> 成功逃脱时触发的事件，结构同其他行为的`event`加`target`。
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

<Usable type="all"/> <Version add="1.16.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:barter组件。"/> <br/>

使生物进行以物易物。

另见：_[`minecraft:barter`](functional#minecraftbarter)组件_。

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
  <Version add="1.26.40" inline/>：只接受带`min`与`max`值的对象，更早的格式版本仍可写作`[最小值, 最大值]`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物破坏阻挡其寻路的门，需配合[`minecraft:annotation.break_door`](./functional#minecraftannotationbreak_door)组件。

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:breedable组件。"/> <br/>

使生物寻找同类进行繁殖。

另见：_[`minecraft:breedable`](functional#minecraftbreedable)组件_。

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

<Usable type="all"/> <Version add="1.13.3"/> <br/>

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
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.18.30"/> <br/>

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
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物向目标发起冲锋，例如恼鬼的突进。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.charge_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="min_distance"/>：<Version add="1.15.0" inline/> 距目标小于该距离时不发起冲锋，单位为方块。默认值为`2`。
  - <DataType type="float" name="max_distance"/>：<Version add="1.15.0" inline/> 距目标大于该距离时不发起冲锋，单位为方块。默认值为`3`。
  - <DataType type="float" name="speed_multiplier"/>：<Version add="1.15.0" inline/> 冲向目标时的速度乘数。默认值为`1`。
  - <DataType type="float" name="success_rate"/>：<Version add="1.15.0" inline/> 未处于攻击状态时发起冲锋的概率。默认值为`0.1428`。
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

<Usable type="all"/> <Version add="1.10.0"/> <br/>

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

<Usable type="all"/> <Version add="1.6.0"/> <br/>

使生物围绕一个锚点盘旋，例如幻翼在空中绕圈。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.circle_around_anchor"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="goal_radius"/>：距锚点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="angle_change"/>：<Version add="1.18.30" inline/> 选择下一个锚点时朝向改变的角度。默认值为`15`。
  - <DataType type="array" name="radius_range"/>：与锚点的水平距离范围，写作`[最小值, 最大值]`。默认值为`[5, 15]`。
  - <DataType type="float" name="radius_change"/>：<Version add="1.18.30" inline/> 成功调整半径时增加的距离，单位为方块。默认值为`1`。
  - <DataType type="float" name="radius_adjustment_chance"/>：<Version add="1.18.30" inline/> 每刻调整半径的概率。默认值为`0.004`。
  - <DataType type="array" name="height_above_target_range"/>：高于目标高度的范围，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="array" name="height_offset_range"/>：相对锚点的垂直偏移范围，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="float" name="height_adjustment_chance"/>：<Version add="1.18.30" inline/> 每刻调整高度的概率。默认值为`0.002857`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:item_controllable组件、minecraft:movement组件和minecraft:rideable组件。"/> <br/>

使被玩家骑乘的实体接受玩家的方向控制。

另见：_[`minecraft:item_controllable`](functional#minecraftitem_controllable)组件_、_[`minecraft:movement`](movement#minecraftmovement)组件_、_[`minecraft:rideable`](functional#minecraftrideable)组件_、_[EntityMovementComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementcomponent-类)_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.controlled_by_player"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="mount_speed_multiplier"/>：<Version add="1.16.0" inline/> 被控制时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="fractional_rotation"/>：<Version add="1.18.30" inline/> 每刻朝玩家视角转动的比例。默认值为`0.5`。
  - <DataType type="float" name="fractional_rotation_limit"/>：<Version add="1.18.30" inline/> 每刻可转动的最大角度，单位为度。默认值为`5`。
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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

使生物周期性发出鸣叫，青蛙使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.croak"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="duration"/>：每次鸣叫持续的秒数区间，也可直接写固定值。默认值为`[4.5, 4.5]`。
  - <DataType type="array" name="interval"/>：两次鸣叫之间随机等待的秒数区间，也可直接写固定值。默认值为`[10, 20]`。
  - <DataType type="object" name="filters"/>：允许鸣叫的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.13.0"/> <br/>

使生物保护已获得其信任的对象，例如狐狸保护信任的玩家。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.defend_trusted_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：被视为有效攻击目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
  - <DataType type="float" name="within_radius"/>：在被保护对象周围多大的范围内发起攻击，单位为方块。默认值为`0`。
  - <DataType type="boolean" name="must_see"/>：为`true`时只把视野内的实体作为目标。默认值为`false`。
  - <DataType type="float" name="must_see_forget_duration"/>：目标离开视野多少秒后放弃。默认值为`3`。
  - <DataType type="int" name="attack_interval"/>：两次攻击之间的秒数。默认值为`0`。
  - <DataType type="string" name="aggro_sound"/>：保护期间偶尔播放的音效事件名。
  - <DataType type="object" name="on_defend_start"/>：开始保护时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物攻击村庄的入侵者，铁傀儡使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.defend_village_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：被视为入侵者的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
  - <DataType type="float" name="attack_chance"/>：<Version add="1.18.30" inline/> 每刻发起攻击的概率。默认值为`0.05`。
  - <DataType type="boolean" name="attack_owner"/>：<Version add="1.21.80" inline/> 为`true`时该实体可以攻击自己的主人。默认值为`false`。
  - <DataType type="boolean" name="must_reach"/>：<Version add="1.21.80" inline/> 为`true`时要求存在通往目标的完整路径。默认值为`false`。
  - <DataType type="boolean" name="must_see"/>：<Version add="1.21.80" inline/> 为`true`时只把视野内的实体作为目标。默认值为`false`。
  - <DataType type="float" name="must_see_forget_duration"/>：<Version add="1.21.80" inline/> 目标离开视野多少秒后放弃。默认值为`3`。
  - <DataType type="float" name="persist_time"/>：<Version add="1.21.80" inline/> 目标不再可见后仍继续攻击的秒数。默认值为`0`。
  - <DataType type="float" name="within_radius"/>：<Version add="1.21.80" inline/> 距目标的最大跟随距离，超出则放弃。默认值为`0`。
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

<Usable type="all"/> <Version add="1.11.0"/> <br/>

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
  - <DataType type="boolean" name="can_spread_on_fire"/>：<Version add="1.20.30" inline/> 为`true`时，着火的实体空手攻击会点燃目标。默认值为`false`。
  - <DataType type="float" name="reach_multiplier"/>：以碰撞箱尺寸为基础计算攻击距离的乘数。默认值为`1.5`。
  - <DataType type="float" name="speed_multiplier"/>：接近目标时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="track_target"/>：为`true`时即使没有固定感知组件也能追踪目标。默认值为`true`。
  - <DataType type="boolean" name="require_complete_path"/>：<Version add="1.15.0" inline/> 为`true`时要求存在通往目标的完整路径。默认值为`false`。
  - <DataType type="int" name="random_stop_interval"/>：以`1/N`的概率中断攻击，`N`为该值。默认值为`0`。
  - <DataType type="float" name="min_path_time"/>：<Version add="1.15.0" inline/> 重新计算攻击路径的最短基础间隔，单位为秒。默认值为`0.2`。
  - <DataType type="float" name="max_path_time"/>：<Version add="1.15.0" inline/> 重新计算攻击路径的最长基础间隔，单位为秒。默认值为`0.55`。
  - <DataType type="float" name="path_inner_boundary"/>：<Version add="1.15.0" inline/> 距目标小于该距离时按`inner_boundary_time_increase`延长重算间隔。默认值为`16`。
  - <DataType type="float" name="path_outer_boundary"/>：<Version add="1.15.0" inline/> 距目标大于该距离时按`outer_boundary_time_increase`延长重算间隔。默认值为`32`。
  - <DataType type="float" name="inner_boundary_time_increase"/>：<Version add="1.15.0" inline/> 目标靠近时追加的重算间隔，单位为秒。默认值为`0.25`。
  - <DataType type="float" name="outer_boundary_time_increase"/>：<Version add="1.15.0" inline/> 目标远离时追加的重算间隔，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="path_fail_time_increase"/>：<Version add="1.15.0" inline/> 寻路失败时追加的重算间隔，单位为秒。默认值为`0.75`。
  - <DataType type="float" name="melee_fov"/>：<Version add="1.15.0" inline/> 感知有效目标时使用的视场角，单位为度。默认值为`90`。
  - <DataType type="float" name="x_max_rotation"/>：<Version add="1.15.0" inline/> 注视目标时俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：<Version add="1.15.0" inline/> 注视目标时水平方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="string" name="sound_event"/>：攻击时播放的音效事件名。默认值为`attack.strong`。
  - <DataType type="object" name="on_attack"/>：<Version add="1.15.0" inline/> 成功攻击时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_kill"/>：<Version add="1.21.80" inline/> 击杀目标时触发的事件，结构同上。
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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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
  - <DataType type="object" name="on_start"/>：<Version add="1.19.10" inline/> 开始钻地时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:behavior.dragonscanning组件。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙向玩家发起俯冲冲锋。

另见：_[`minecraft:behavior.dragonscanning`](#minecraftbehaviordragonscanning)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragonchargeplayer"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="active_speed"/>：<Version add="1.15.0" inline/> 冲锋进行中或已开始时的移动速度。默认值为`3`。
  - <DataType type="float" name="flight_speed"/>：<Version add="1.15.0" inline/> 未冲锋时的飞行速度。默认值为`0.6`。
  - <DataType type="float" name="turn_speed"/>：<Version add="1.15.0" inline/> 执行该行为时的转向速度。默认值为`0.7`。
  - <DataType type="array" name="target_zone"/>：<Version add="1.15.0" deprecated="1.26.0" inline/> 可使用该行为的距离区间，写作`[最小值, 最大值]`，单位为方块。默认值为`[10, 150]`。
  - <DataType type="object" name="target_zone"/>：<Version add="1.26.0" inline/> 可使用该行为的距离区间，单位为方块。默认值为`{"min": 10, "max": 150}`。
    - <DataType type="float" name="min"/>：区间下限。默认值为`10`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`150`。
  - <DataType type="float" name="continue_charge_threshold_time"/>：<Version add="1.15.0" inline/> 目标脱离`target_zone`超过该秒数后停止冲锋。默认值为`0.5`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙在停驻时先咆哮、再喷吐龙息。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragonflaming"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown_time"/>：<Version add="1.15.0" inline/> 两次「咆哮并喷吐」循环之间的间隔，单位为秒。默认值为`10`。
  - <DataType type="float" name="roar_time"/>：<Version add="1.15.0" inline/> 咆哮持续的秒数。默认值为`2`。
  - <DataType type="float" name="flame_time"/>：<Version add="1.15.0" inline/> 咆哮结束后喷吐龙息持续的秒数。默认值为`0.5`。
  - <DataType type="int" name="ground_flame_count"/>：<Version add="1.15.0" inline/> 起飞前在地面喷吐龙息的次数。默认值为`4`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

使末影龙绕玩家盘旋并伺机发射火球。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.dragonstrafeplayer"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="active_speed"/>：<Version add="1.15.0" inline/> 该行为进行中的移动速度。默认值为`0.6`。
  - <DataType type="float" name="flight_speed"/>：<Version add="1.15.0" inline/> 未执行该行为时的飞行速度。默认值为`0.6`。
  - <DataType type="float" name="turn_speed"/>：<Version add="1.15.0" inline/> 执行该行为时的转向速度。默认值为`0.7`。
  - <DataType type="array" name="target_zone"/>：<Version add="1.15.0" deprecated="1.26.0" inline/> 可使用该行为的距离区间，写作`[最小值, 最大值]`，单位为方块。默认值为`[10, 150]`。
  - <DataType type="object" name="target_zone"/>：<Version add="1.26.0" inline/> 可使用该行为的距离区间，单位为方块。默认值为`{"min": 10, "max": 150}`。
    - <DataType type="float" name="min"/>：区间下限。默认值为`10`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`150`。
  - <DataType type="float" name="fireball_range"/>：<Version add="1.15.0" inline/> 盘旋时可发射火球的最大距离，单位为方块。默认值为`64`。
  - <DataType type="float" name="view_angle"/>：<Version add="1.15.0" inline/> 目标需处于当前朝向多少度以内才发射火球，单位为度。默认值为`10`。
  - <DataType type="float" name="target_in_range_and_in_view_time"/>：<Version add="1.15.0" inline/> 目标需持续处于射程与视野内的秒数。默认值为`0.25`。
  - <DataType type="float" name="switch_direction_probability"/>：<Version add="1.15.0" inline/> 每刻在顺时针与逆时针之间切换的概率。默认值为`0.125`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影龙可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.19.10"/> <br/>

使生物在满足条件时饮用牛奶。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.drink_milk"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown_seconds"/>：该行为的冷却秒数。默认值为`5`。
  - <DataType type="object" name="filters"/>：允许饮用牛奶的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.12.0"/> <br/>

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
      - <DataType type="object" name="filters"/>：允许选择该药水的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.8.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:navigation组件。"/> <br/>

使生物靠近目标并向其投下物品，例如猫向玩家赠送礼物。

另见：_[`minecraft:navigation.walk`](movement#minecraftnavigationwalk)等导航组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.drop_item_for"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为投赠对象的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="loot_table"/>：决定掉落内容的战利品表路径。
  - <DataType type="float" name="drop_item_chance"/>：每次尝试投下物品的概率，取值`0.0`-`1.0`。默认值为`1`。
  - <DataType type="float" name="offering_distance"/>：希望与目标保持的投赠距离，单位为方块。默认值为`1`。
  - <DataType type="float" name="cooldown"/>：<Version add="1.18.30" inline/> 该行为的冷却秒数。默认值为`0.25`。
  - <DataType type="float" name="seconds_before_pickup"/>：<Version add="1.18.30" inline/> 投下的物品需经过多少秒才能被拾取。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="array" name="target_range"/>：<Version add="1.18.30" inline/> 寻找落点时在`[x, y, z]`三个方向上的搜索范围。默认值为`[1, 1, 1]`。
  - <DataType type="int" name="search_range"/>：搜索落点的水平距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索落点的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：<Version add="1.18.30" inline/> 每刻随机检查的方块数量。默认值为`0`。
  - <DataType type="float" name="max_head_look_at_height"/>：<Version add="1.18.30" inline/> 投赠时头部注视的最大高度，单位为方块。默认值为`10`。
  - <DataType type="float" name="minimum_teleport_distance"/>：<Version add="1.18.30" inline/> 目标距离超过该值时实体改为传送，单位为方块。默认值为`2`。
  - <DataType type="array" name="teleport_offset"/>：<Version add="1.18.30" inline/> 传送落点相对目标的偏移，写作`[x, y, z]`。默认值为`[0, 1, 0]`。
  - <DataType type="array" name="time_of_day_range"/>：允许执行该行为的时间范围，`0.0`为正午、`0.5`为午夜。默认值为`[0, 1]`。
  - <DataType type="object" name="on_drop_attempt"/>：尝试投下物品时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物啃食指定的方块并替换为另一方块，羊吃草即使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.eat_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="eat_and_replace_block_pairs"/>：<Version add="1.18.30" inline/> 被啃食方块与替换方块的对应关系列表。
    - <DataType type="object"/>：一组对应。
      - <DataType type="string" name="eat_block"/>：被啃食的方块 ID。
      - <DataType type="string" name="replace_block"/>：啃食后替换成的方块 ID。
  - <DataType type="string" name="success_chance"/>：<Version add="1.18.30" inline/> 每刻成功啃食的概率，填 Molang 表达式。默认值为`0.02`。
  - <DataType type="float" name="time_until_eat"/>：<Version add="1.18.30" inline/> 啃食动画持续的秒数。默认值为`1.8`。
  - <DataType type="object" name="on_eat"/>：啃食完成后触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.13.0"/> <br/>

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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.18.30"/> <br/>

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

<Usable type="all"/> <Version add="1.10.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:dweller组件和minecraft:navigation组件。"/> <br/>

使村民到村庄外围探索。

另见：_[`minecraft:dweller`](functional#minecraftdweller)组件_、_[`minecraft:navigation.walk`](movement#minecraftnavigationwalk)等导航组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.explore_outskirts"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="dist_from_boundary"/>：<Version add="1.18.30" inline/> 距村庄边界的距离范围，写作`[x, y, z]`。默认值为`[5, 0, 5]`。
  - <DataType type="float" name="explore_dist"/>：超出村庄边界后继续探索的距离，单位为方块。默认值为`5`。
  - <DataType type="float" name="max_travel_time"/>：<Version add="1.18.30" inline/> 前往探索点的最长时间，单位为秒。默认值为`60`。
  - <DataType type="float" name="min_dist_from_target"/>：<Version add="1.18.30" inline/> 距探索点多近即视为到达，单位为方块。默认值为`2.25`。
  - <DataType type="float" name="min_perimeter"/>：<Version add="1.18.30" inline/> 村庄的最小周长，低于该值不执行该行为。默认值为`1`。
  - <DataType type="float" name="min_wait_time"/>：<Version add="1.18.30" inline/> 选择下一个探索点前的最短等待秒数。默认值为`3`。
  - <DataType type="float" name="max_wait_time"/>：<Version add="1.18.30" inline/> 选择下一个探索点前的最长等待秒数。默认值为`0`。
  - <DataType type="int" name="next_xz"/>：<Version add="1.18.30" inline/> 新探索点在水平方向上的随机范围，单位为方块。默认值为`5`。
  - <DataType type="int" name="next_y"/>：<Version add="1.18.30" inline/> 新探索点在垂直方向上的随机范围，单位为方块。默认值为`3`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="timer_ratio"/>：<Version add="1.18.30" inline/> 等待时长在最短与最长之间的取值比例。默认值为`2`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：全部取默认值。

```json showLineNumbers
"minecraft:behavior.explore_outskirts": {}
```

</TabItem></Tabs>

---

### `minecraft:behavior.fertilize_farm_block`

<Usable type="all"/> <Version add="1.18.30"/> <br/>

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

<Usable type="all"/> <Version add="1.13.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.5.0"/> <br/>

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

<Usable type="all"/> <Version add="1.21.30"/> <br/>

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
  - <DataType type="object" name="filters"/>：允许执行该行为的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体在水中向上浮动，避免沉底。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.float"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="chance_per_tick_to_float"/>：<Version add="1.21.130" inline/> 每刻施加向上推力的概率。默认值为`0.8`。
  - <DataType type="boolean" name="sink_with_passengers"/>：<Version add="1.19.50" inline/> 为`true`时只要还有乘客就持续下沉。默认值为`false`。
  - <DataType type="float" name="time_under_water_to_dismount_passengers"/>：<Version add="1.21.130" inline/> 载具头部没入水中多少秒后让乘客下船。默认值为`0`。
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

<Usable type="all"/> <Version add="1.21.80"/> <br/>

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
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物在空中随意漂浮游荡，蝙蝠使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.float_wander"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="float_duration"/>：<Version add="1.2.0" deprecated="1.26.40" inline/>每次漂浮持续的时间区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[0, 0]`。
  - <DataType type="object" name="float_duration"/>：<Version add="1.26.40" inline/>每次漂浮持续的时间区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="int" name="xz_dist"/>：在水平方向上寻找落点的距离，单位为方块。默认值为`10`。
  - <DataType type="int" name="y_dist"/>：在垂直方向上寻找落点的距离，单位为方块。默认值为`7`。
  - <DataType type="float" name="y_offset"/>：在选定落点上叠加的高度偏移，单位为方块。默认值为`0`。
  - <DataType type="boolean" name="random_reselect"/>：为`true`时移动途中会随机重新选择落点。默认值为`false`。
  - <DataType type="boolean" name="must_reach"/>：为`true`时落点必须可达才有效。默认值为`false`。
  - <DataType type="boolean" name="float_wander_has_move_control"/>：<Version add="1.21.70" inline/> 为`true`时该行为自带移动控制。默认值为`true`。
  - <DataType type="boolean" name="use_home_position_restriction"/>：<Version add="1.21.70" inline/> 为`true`时遵守[`minecraft:home`](./functional#minecrafthome)的限制范围。默认值为`true`。
  - <DataType type="boolean" name="navigate_around_surface"/>：<Version add="1.21.80" inline/> 为`true`时优先在表面附近寻找落点。默认值为`false`。
  - <DataType type="int" name="surface_xz_dist"/>：<Version add="1.21.80" inline/> 检查表面时的水平距离，单位为方块。默认值为`8`。
  - <DataType type="int" name="surface_y_dist"/>：<Version add="1.21.80" inline/> 检查表面时的垂直距离，单位为方块。默认值为`8`。
  - <DataType type="boolean" name="additional_collision_buffer"/>：<Version add="1.21.80" inline/> 为`true`时在实体周围增加一圈避让缓冲。默认值为`false`。
  - <DataType type="boolean" name="allow_navigating_through_liquids"/>：<Version add="1.21.80" inline/> 为`true`时允许穿过液体寻路。默认值为`false`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物跟随行进队伍中的其他实体，羊驼使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.follow_caravan"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：队伍中可以跟随的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
  - <DataType type="object" name="filters"/>：<Version add="1.21.80" inline/> 可作为跟随目标的实体条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="preferred_actor_type"/>：<Version add="1.21.80" inline/> 优先跟随的实体 ID，省略时随机选择。
  - <DataType type="boolean" name="use_home_position_restriction"/>：<Version add="1.21.80" inline/> 为`true`时遵守[`minecraft:home`](./functional#minecrafthome)的限制范围。默认值为`false`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物跟随其主人，如悦灵跟随给予它物品的玩家。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.follow_owner"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="start_distance"/>：距主人多远时开始跟随，单位为方块。默认值为`10`。
  - <DataType type="float" name="stop_distance"/>：距主人多近时停止跟随，单位为方块。默认值为`2`。
  - <DataType type="float" name="max_distance"/>：<Version add="1.18.30" inline/> 距主人超过该距离后不再跟随，单位为方块。默认值为`60`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="can_teleport"/>：<Version add="1.18.30" inline/> 为`true`时距离过远会传送到主人身边。默认值为`true`。
  - <DataType type="int" name="post_teleport_distance"/>：<Version add="1.21.20" inline/> 传送后与主人保持的距离，单位为方块。默认值为`3`。
  - <DataType type="boolean" name="ignore_vibration"/>：<Version add="1.18.30" inline/> 为`true`时感知到振动后仍继续跟随。默认值为`false`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

### `minecraft:behavior.follow_target_leader`

<Usable type="all"/> <Version add="1.26.20"/> <br/>

使生物跟随符合条件的目标作为领队。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.follow_target_leader"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="leader_filters"/>：可作为领队的实体条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.5.0"/> <br/>

使生物返回其「家」的位置，需配合[`minecraft:home`](./functional#minecrafthome)组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.go_home"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="interval"/>：再次尝试回家前的随机间隔，单位为刻。默认值为`120`。
  - <DataType type="float" name="goal_radius"/>：距家多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="calculate_new_path_radius"/>：<Version add="1.18.30" inline/> 距终点多近时重新计算路径，单位为方块。默认值为`2`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="array" name="on_home"/>：到家时触发的事件列表。
    - <DataType type="object"/>：一个事件。
      - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
      - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](../filters)。
  - <DataType type="array" name="on_failed"/>：<Version add="1.18.30" inline/> 回家失败时触发的事件列表，结构同上。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对守卫者与远古守卫者可用。"/> <br/>

使守卫者与远古守卫者发动魔法攻击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.guardian_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="magic_damage"/>：<Version add="1.15.0" inline/> 魔法攻击的基础伤害。默认值为`1`。
  - <DataType type="int" name="elder_extra_magic_damage"/>：<Version add="1.15.0" inline/> 远古守卫者额外增加的魔法伤害。默认值为`2`。
  - <DataType type="int" name="hard_mode_extra_magic_damage"/>：<Version add="1.15.0" inline/> 困难难度下额外增加的魔法伤害。默认值为`2`。
  - <DataType type="float" name="min_distance"/>：<Version add="1.15.0" inline/> 目标距离小于该值时停止该行为，单位为方块。默认值为`3`。
  - <DataType type="float" name="sound_delay_time"/>：<Version add="1.15.0" inline/> 开始攻击后延迟多少秒播放音效。默认值为`0.5`。
  - <DataType type="float" name="x_max_rotation"/>：<Version add="1.15.0" inline/> 俯仰方向的最大转角，单位为度。默认值为`90`。
  - <DataType type="float" name="y_max_head_rotation"/>：<Version add="1.15.0" inline/> 水平方向的最大转角，单位为度。默认值为`90`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:inventory组件和minecraft:navigation组件。"/> <br/>

使村民收割成熟的作物。

另见：_[`minecraft:inventory`](functional#minecraftinventory)组件_、_[`minecraft:navigation.walk`](movement#minecraftnavigationwalk)等导航组件_、_[EntityInventoryComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityinventorycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.harvest_farm_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="goal_radius"/>：<Version add="1.18.30" inline/> 距目标点多近即视为到达，单位为方块。默认值为`1.5`。
  - <DataType type="int" name="search_range"/>：<Version add="1.18.30" inline/> 搜索农田的水平距离，单位为方块。默认值为`16`。
  - <DataType type="int" name="search_height"/>：<Version add="1.18.30" inline/> 搜索农田的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：<Version add="1.18.30" inline/> 每刻随机检查的方块数量。默认值为`0`。
  - <DataType type="float" name="max_seconds_before_search"/>：<Version add="1.18.30" inline/> 开始搜索前允许等待的最长秒数。默认值为`1`。
  - <DataType type="float" name="search_cooldown_max_seconds"/>：<Version add="1.18.30" inline/> 搜索失败后再次搜索前的最长冷却秒数。默认值为`8`。
  - <DataType type="float" name="seconds_until_new_task"/>：<Version add="1.18.30" inline/> 成功收割后进入下一任务前的冷却秒数。默认值为`0.5`。
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

<Usable type="all"/> <Version add="1.18.10"/> <br/>

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

<Usable type="all"/> <Version add="1.13.3"/> <br/>

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
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.14.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物把伤害来源设为目标进行反击。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.hurt_by_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为反击目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.10.0"/> <br/>

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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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

<Usable type="all"/> <Version add="1.21.30"/> <br/>

使生物围绕目标跳跃移动，旋风人使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.jump_around_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：允许执行该行为的条件。见[实体过滤器](../filters)。
  - <DataType type="array" name="jump_angles"/>：允许使用的跳跃角度列表，单位为度。默认值为`[40, 55, 60, 75, 80]`。
  - <DataType type="float" name="max_jump_velocity"/>：跳跃的最大速度。默认值为`1.4`。
  - <DataType type="float" name="prepare_jump_duration"/>：起跳前的准备秒数。默认值为`0.5`。
  - <DataType type="float" name="jump_cooldown_duration"/>：两次跳跃之间的冷却秒数。默认值为`0.5`。
  - <DataType type="float" name="jump_cooldown_when_hurt_duration"/>：受伤后跳跃的冷却秒数。默认值为`0.1`。
  - <DataType type="float" name="last_hurt_duration"/>：判定「近期受伤」的秒数，受伤后的跳跃改用较短的冷却。默认值为`2`。
  - <DataType type="array" name="valid_distance_to_target"/>：<Version add="1.21.30" deprecated="1.26.20" inline/>允许起跳的目标距离区间写作`[最小值, 最大值]`，单位为方块。默认值为`[4, 20]`。
  - <DataType type="object" name="valid_distance_to_target"/>：<Version add="1.26.20" inline/>允许起跳的目标距离区间，单位为方块。
    - <DataType type="float" name="min"/>：区间下限。默认值为`4`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`20`。
  - <DataType type="array" name="landing_distance_from_target"/>：<Version add="1.21.30" deprecated="1.26.20" inline/>落点与目标的距离区间写作`[最小值, 最大值]`，单位为方块。默认值为`[4, 8]`。
  - <DataType type="object" name="landing_distance_from_target"/>：<Version add="1.26.20" inline/>落点与目标的距离区间，单位为方块。
    - <DataType type="float" name="min"/>：区间下限。默认值为`4`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`8`。
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

<Usable type="all"/> <Version add="1.18.30"/> <br/>

使生物跳向指定的方块，青蛙使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.jump_to_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="cooldown_range"/>：<Version add="1.18.30" deprecated="1.26.20" inline/>两次跳跃之间的冷却秒数区间写作`[最小值, 最大值]`。默认值为`[10, 20]`。
  - <DataType type="object" name="cooldown_range"/>：<Version add="1.26.20" inline/>两次跳跃之间的冷却秒数区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`10`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`20`。
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

<Usable type="all"/> <Version add="1.11.0"/> <br/>

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
  - <DataType type="int" name="knockback_horizontal_strength"/>：<Version add="1.17.20" inline/> 水平击退强度。默认值为`4`。
  - <DataType type="int" name="knockback_vertical_strength"/>：<Version add="1.17.20" inline/> 垂直击退强度。默认值为`4`。
  - <DataType type="float" name="knockback_height_cap"/>：<Version add="1.18.30" inline/> 垂直击退的高度上限。默认值为`0.4`。
  - <DataType type="object" name="damage_filters"/>：<Version add="1.18.30" inline/> 会受到伤害的实体条件。见[实体过滤器](../filters)。
  - <DataType type="object" name="knockback_filters"/>：<Version add="1.18.30" inline/> 会被击退的实体条件。见[实体过滤器](../filters)。
  - <DataType type="object" name="on_roar_end"/>：<Version add="1.18.30" inline/> 咆哮结束时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.8.0"/> <br/>

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

<Usable type="all"/> <Version add="1.5.0"/> <br/>

使生物在指定方块上产卵，海龟与青蛙使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.lay_egg"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="egg_type"/>：<Version add="1.18.10" inline/> 产下的卵对应的方块 ID。默认值为`minecraft:turtle_egg`。
  - <DataType type="array" name="target_blocks"/>：<Version add="1.18.10" inline/> 可以在其上方产卵的方块列表。默认值为`[ "minecraft:sand" ]`。
  - <DataType type="array" name="target_materials_above_block"/>：<Version add="1.18.10" inline/> 目标方块上方允许存在的材质列表。默认值为`[ "air" ]`。
  - <DataType type="float" name="lay_seconds"/>：<Version add="1.18.10" inline/> 产卵过程持续的秒数。默认值为`10`。
  - <DataType type="string" name="lay_egg_sound"/>：<Version add="1.18.10" inline/> 产卵时播放的音效事件名。默认值为`lay_egg`。
  - <DataType type="boolean" name="allow_laying_from_below"/>：<Version add="1.18.10" inline/> 为`true`时允许从目标方块下方产卵。默认值为`false`。
  - <DataType type="boolean" name="use_default_animation"/>：<Version add="1.18.10" inline/> 为`true`时播放默认的产卵动画。默认值为`true`。
  - <DataType type="int" name="search_range"/>：搜索产卵位置的距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索产卵位置的高度，单位为方块。默认值为`1`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="object" name="on_lay"/>：产卵时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对猫、豹猫、狼与蜘蛛类实体可用。"/> <br/>

使生物向目标扑跃。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.leap_at_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="yd"/>：扑跃时达到的高度，单位为方块。默认值为`0`。
  - <DataType type="boolean" name="must_be_on_ground"/>：为`true`时只有站在地面上才会扑跃。默认值为`true`。
  - <DataType type="boolean" name="set_persistent"/>：<Version add="1.16.0" inline/> 为`true`时锁定玩家为目标后转为持久实体。默认值为`false`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
  - <DataType type="array" name="look_time"/>：<Version add="1.2.0" deprecated="1.26.0" inline/> 每次注视持续时间的区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[2, 4]`。
  - <DataType type="object" name="look_time"/>：<Version add="1.26.0" inline/> 每次注视持续时间的区间，单位为秒。默认值为`{"min": 2, "max": 4}`。
    - <DataType type="float" name="min"/>：区间下限。默认值为`2`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`4`。
  - <DataType type="float" name="probability"/>：每刻开始注视的概率，取值`0.0`-`1.0`。默认值为`0.02`。
  - <DataType type="object" name="filters"/>：可以被注视的实体条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
  - <DataType type="array" name="look_time"/>：<Version add="1.2.0" deprecated="1.26.0" inline/> 每次注视持续时间的区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[2, 4]`。
  - <DataType type="object" name="look_time"/>：<Version add="1.26.0" inline/> 每次注视持续时间的区间，单位为秒。默认值为`{"min": 2, "max": 4}`。
    - <DataType type="float" name="min"/>：区间下限。默认值为`2`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`4`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
  - <DataType type="array" name="look_time"/>：<Version add="1.2.0" deprecated="1.26.0" inline/> 每次注视持续时间的区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[2, 4]`。
  - <DataType type="object" name="look_time"/>：<Version add="1.26.0" inline/> 每次注视持续时间的区间，单位为秒。默认值为`{"min": 2, "max": 4}`。
    - <DataType type="float" name="min"/>：区间下限。默认值为`2`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`4`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
  - <DataType type="array" name="look_time"/>：<Version add="1.2.0" deprecated="1.26.0" inline/> 每次注视持续时间的区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[2, 4]`。
  - <DataType type="object" name="look_time"/>：<Version add="1.26.0" inline/> 每次注视持续时间的区间，单位为秒。默认值为`{"min": 2, "max": 4}`。
    - <DataType type="float" name="min"/>：区间下限。默认值为`2`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`4`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对村民可用。"/> <br/>

使生物寻找配偶并进入求爱状态，需配合[`minecraft:breedable`](./functional#minecraftbreedable)组件。

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物接近并近战攻击目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.melee_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="reach_multiplier"/>：以碰撞箱尺寸为基础计算攻击距离的乘数，`0`表示不进行近战攻击。默认值为`2`。
  - <DataType type="float" name="cooldown_time"/>：<Version add="1.15.0" inline/> 两次攻击之间的冷却秒数。默认值为`1`。
  - <DataType type="boolean" name="attack_once"/>：<Version add="1.6.0" inline/> 为`true`时该行为在实体整个生命周期内只执行一次。默认值为`false`。
  - <DataType type="string" name="attack_types"/>：该实体攻击的目标类型。
  - <DataType type="boolean" name="can_spread_on_fire"/>：<Version add="1.20.30" inline/> 为`true`时，着火的实体空手攻击会点燃目标。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：接近目标时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="track_target"/>：为`true`时即使没有固定感知组件也能追踪目标。默认值为`false`。
  - <DataType type="boolean" name="require_complete_path"/>：<Version add="1.9.0" inline/> 为`true`时要求存在通往目标的完整路径。默认值为`false`。
  - <DataType type="int" name="random_stop_interval"/>：以`1/N`的概率中断攻击，`N`为该值。默认值为`0`。
  - <DataType type="float" name="min_path_time"/>：<Version add="1.15.0" inline/> 重新计算攻击路径的最短基础间隔，单位为秒。默认值为`0.2`。
  - <DataType type="float" name="max_path_time"/>：<Version add="1.15.0" inline/> 重新计算攻击路径的最长基础间隔，单位为秒。默认值为`0.55`。
  - <DataType type="float" name="path_inner_boundary"/>：<Version add="1.15.0" inline/> 距目标小于该距离时追加`inner_boundary_time_increase`的重算间隔。默认值为`16`。
  - <DataType type="float" name="path_outer_boundary"/>：<Version add="1.15.0" inline/> 距目标大于该距离时追加`outer_boundary_time_increase`的重算间隔。默认值为`32`。
  - <DataType type="float" name="inner_boundary_time_increase"/>：<Version add="1.15.0" inline/> 目标靠近时追加的重算间隔，单位为秒。默认值为`0.25`。
  - <DataType type="float" name="outer_boundary_time_increase"/>：<Version add="1.15.0" inline/> 目标远离时追加的重算间隔，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="path_fail_time_increase"/>：<Version add="1.15.0" inline/> 寻路失败时追加的重算间隔，单位为秒。默认值为`0.75`。
  - <DataType type="float" name="melee_fov"/>：<Version add="1.6.0" inline/> 感知有效目标时使用的视场角，单位为度。默认值为`90`。
  - <DataType type="float" name="x_max_rotation"/>：<Version add="1.15.0" inline/> 注视目标时俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：<Version add="1.15.0" inline/> 注视目标时水平方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="object" name="on_attack"/>：<Version add="1.15.0" inline/> 成功攻击时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_kill"/>：<Version add="1.21.80" inline/> 击杀目标时触发的事件，结构同上。
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

<Usable type="all"/> <Version add="1.20.50"/> <br/>

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
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_kill"/>：<Version add="1.21.80" inline/> 击杀目标时触发的事件，结构同上。
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

<Usable type="all"/> <Version add="1.10.0"/> <br/>

使生物与其他同类聚在一起交流，村民使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.mingle"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="string" name="mingle_partner_type"/>：<Version add="1.12.0" inline/> 可以交流的实体类型，如`minecraft:villager_v2`。
  - <DataType type="float" name="mingle_distance"/>：<Version add="1.12.0" inline/> 与交流对象保持的距离，单位为方块。默认值为`2`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:rideable组件。"/> <br/>

使骑乘中的实体朝目标移动。

另见：_[`minecraft:rideable`](functional#minecraftrideable)组件_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

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

<Usable type="all"/> <Version add="1.21.30"/> <br/>

使生物在目标周围游走，旋风人使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_around_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：允许执行该行为的条件。见[实体过滤器](../filters)。
  - <DataType type="array" name="destination_position_range"/>：<Version add="1.21.30" deprecated="1.26.20" inline/>落点与目标之间的距离区间写作`[最小值, 最大值]`，单位为方块。默认值为`[4, 8]`。
  - <DataType type="object" name="destination_position_range"/>：<Version add="1.26.20" inline/>落点与目标之间的距离区间，单位为方块。
    - <DataType type="float" name="min"/>：区间下限。默认值为`4`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`8`。
  - <DataType type="float" name="destination_pos_spread_degrees"/>：<Version add="1.21.80" inline/> 选择落点时的散布角度，单位为度。默认值为`90`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物向室内移动，村民在夜晚使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_indoors"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：移动时的速度乘数。默认值为`0.8`。
  - <DataType type="float" name="timeout_cooldown"/>：<Version add="1.11.0" inline/> 寻路失败后再次使用该行为前的冷却秒数。默认值为`8`。
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

<Usable type="all"/> <Version add="1.18.30"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对铁傀儡可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.14.0"/> <br/>

使生物移动到指定的方块处并停留一段时间。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="target_blocks"/>：要前往的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="object" name="target_block_filters"/>：方块需满足的条件。见[实体过滤器](../filters)。
  - <DataType type="string" name="target_selection_method"/>：方块的选择方式。可选值为`nearest`（最近）与`random`（随机）。默认值为`nearest`。
  - <DataType type="array" name="target_offset"/>：目标位置相对方块的偏移，写作`[x, y, z]`。默认值为`[0, 0, 0]`。
  - <DataType type="int" name="search_range"/>：搜索方块的距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索方块的高度，单位为方块。默认值为`1`。
  - <DataType type="float" name="goal_radius"/>：距目标多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="stay_duration"/>：到达后需要停留的刻数。默认值为`0`。
  - <DataType type="float" name="start_chance"/>：<Version add="1.18.10" inline/> 每次尝试时启动该行为的概率。默认值为`1`。
  - <DataType type="int" name="tick_interval"/>：尝试执行该行为的平均间隔，单位为刻。默认值为`20`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="array" name="on_reach"/>：到达方块时触发的事件列表。
    - <DataType type="object"/>：一个事件。
      - <DataType type="string" name="event"/>：事件 ID。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.5.0"/> <br/>

使生物离开水域移动到陆地上，青蛙使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_land"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：搜索陆地的水平距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索陆地的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：<Version add="1.8.0" inline/> 每刻随机检查的方块数量。默认值为`10`。
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

<Usable type="all"/> <Version add="1.18.10"/> <br/>

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

<Usable type="all"/> <Version add="1.18.10"/> <br/>

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

<Usable type="all"/> <Version add="1.12.0"/> <br/>

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

<Usable type="all"/> <Version add="1.12.0"/> <br/>

使生物移动到最近的村庄。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_village"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：<Version add="1.13.0" inline/> 搜索村庄的距离，单位为方块；小于等于`0`时找最近的村庄。默认值为`0`。
  - <DataType type="float" name="goal_radius"/>：距目标点多近即视为到达，单位为方块。默认值为`1.5`。
  - <DataType type="float" name="cooldown_time"/>：<Version add="1.13.0" inline/> 该行为的冷却秒数。默认值为`8`。
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

<Usable type="all"/> <Version add="1.4.0"/> <br/>

使生物寻找并移动到水域。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.move_to_water"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="search_range"/>：搜索水域的水平距离，单位为方块。默认值为`0`。
  - <DataType type="int" name="search_height"/>：搜索水域的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_count"/>：<Version add="1.8.0" inline/> 每刻随机检查的方块数量。默认值为`10`。
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

<Usable type="all"/> <Version add="1.18.30"/> <br/>

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

<Usable type="all"/> <Version add="1.18.30"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.13.0"/> <br/>

使生物打盹，狐狸使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.nap"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="can_nap_filters"/>：允许打盹的条件。见[实体过滤器](../filters)。
  - <DataType type="object" name="wake_mob_exceptions"/>：即使靠近也不会吵醒该实体的生物条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物把最近的可攻击实体设为目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.nearest_attackable_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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
  - <DataType type="float" name="persist_time"/>：<Version add="1.6.0" inline/> 目标不可见后仍继续攻击的秒数。默认值为`0`。
  - <DataType type="boolean" name="reselect_targets"/>：为`true`时允许改用更近的目标。默认值为`false`。
  - <DataType type="boolean" name="attack_owner"/>：<Version add="1.15.0" inline/> 为`true`时可以攻击自己的主人。默认值为`false`。
  - <DataType type="boolean" name="set_persistent"/>：<Version add="1.16.0" inline/> 为`true`时锁定玩家为目标后转为持久实体。默认值为`false`。
  - <DataType type="array" name="attack_interval"/>：<Version add="1.21.130" deprecated="1.26.0" inline/> 两次搜索目标之间的秒数区间，写作`[最小值, 最大值]`。默认值为`[0, 0]`。
  - <DataType type="object" name="attack_interval"/>：<Version add="1.26.0" inline/> 两次搜索目标之间的秒数区间。默认值为`{"min": 0, "max": 0}`。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="int" name="scan_interval"/>：<Version add="1.6.0" inline/> 未设置`attack_interval`时的扫描间隔，单位为刻。默认值为`10`。
  - <DataType type="float" name="target_search_height"/>：<Version add="1.6.0" inline/> 搜索目标的垂直距离，`-1`表示不限。默认值为`-1`。
  - <DataType type="float" name="target_invisible_multiplier"/>：<Version add="1.15.0" inline/> 目标护甲覆盖率对该距离判定的修正系数。默认值为`0.7`。
  - <DataType type="float" name="target_sneak_visibility_multiplier"/>：<Version add="1.15.0" inline/> 目标潜行时距离判定的修正系数。默认值为`0.8`。
  - <DataType type="float" name="target_acquisition_probability"/>：<Version add="1.21.130" inline/> 接受找到的目标的概率，取值`0.0`-`1.0`。默认值为`1`。
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

<Usable type="all"/> <Version add="1.13.0"/> <br/>

使生物按优先级选择可攻击的目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.nearest_prioritized_attackable_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为目标的实体条件列表，各项可带`priority`。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
      - <DataType type="float" name="max_dist"/>：该类型目标的最大距离，单位为方块。
      - <DataType type="float" name="max_height"/>：该类实体可作为目标的高度上限，`-1`表示不限制。默认值为`-1`。
      - <DataType type="float" name="max_flee"/>：逃离该类实体时距其多远停止，单位为方块。默认值为`10`。
      - <DataType type="int" name="cooldown"/>：<Version add="1.20.0" inline/> 再次选中该类实体前需要等待的秒数。默认值为`0`。
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
  - <DataType type="boolean" name="set_persistent"/>：<Version add="1.16.0" inline/> 为`true`时锁定玩家为目标后转为持久实体。默认值为`false`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物以潜行接近再冲刺的方式发动攻击，豹猫与猫使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.ocelotattack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown_time"/>：<Version add="1.15.0" inline/> 两次攻击之间的秒数。默认值为`1`。
  - <DataType type="float" name="max_distance"/>：<Version add="1.15.0" inline/> 可使用该行为的最大距离，单位为方块。默认值为`15`。
  - <DataType type="float" name="max_sneak_range"/>：<Version add="1.15.0" inline/> 开始潜行的最大距离，单位为方块。默认值为`15`。
  - <DataType type="float" name="max_sprint_range"/>：<Version add="1.15.0" inline/> 开始冲刺的最大距离，单位为方块。默认值为`4`。
  - <DataType type="float" name="reach_multiplier"/>：<Version add="1.15.0" inline/> 以碰撞箱尺寸为基础计算攻击距离的乘数。默认值为`2`。
  - <DataType type="float" name="sneak_speed_multiplier"/>：潜行时的速度乘数。默认值为`0.6`。
  - <DataType type="float" name="sprint_speed_multiplier"/>：冲刺时的速度乘数。默认值为`1.33`。
  - <DataType type="float" name="walk_speed_multiplier"/>：既不潜行也不冲刺时的速度乘数。默认值为`0.8`。
  - <DataType type="float" name="x_max_rotation"/>：<Version add="1.15.0" inline/> 注视目标时俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：<Version add="1.15.0" inline/> 注视目标时水平方向的最大转角，单位为度。默认值为`30`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物向附近的另一只生物献花，铁傀儡使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.offer_flower"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：<Version add="1.19.50" inline/> 允许献花的条件。见[实体过滤器](../filters)。
  - <DataType type="float" name="chance_to_start"/>：<Version add="1.19.50" inline/> 每刻开始献花的概率。默认值为`0.000125`。
  - <DataType type="float" name="max_offer_flower_duration"/>：<Version add="1.19.50" inline/> 献花持续的秒数。默认值为`20`。
  - <DataType type="array" name="search_area"/>：<Version add="1.19.50" inline/> 搜索献花对象的范围，写作`[x, y, z]`。默认值为`[6, 2, 6]`。
  - <DataType type="float" name="max_rotation_x"/>：<Version add="1.19.50" inline/> 俯仰方向的最大转角，单位为度。默认值为`30`。
  - <DataType type="float" name="max_head_rotation_y"/>：<Version add="1.19.50" inline/> 水平方向的最大转角，单位为度。默认值为`30`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物在主人被攻击时把攻击者设为目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.owner_hurt_by_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物在主人攻击某实体时把该实体设为目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.owner_hurt_target"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="entity_types"/>：可作为目标的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物受到伤害后惊慌逃跑。`26.60`起生物被困住时不再每刻反复停止与启动该意向。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.panic"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="damage_sources"/>：<Version add="1.16.0" inline/> 会引发惊慌的伤害来源类型列表，如`all`。
    - <DataType type="string"/>：伤害来源类型。
  - <DataType type="boolean" name="ignore_mob_damage"/>：<Version add="1.9.0" inline/> 为`true`时被其他生物伤害不会惊慌。默认值为`false`。
  - <DataType type="boolean" name="force"/>：为`true`时只有找不到玩家才会停止惊慌。默认值为`false`。
  - <DataType type="boolean" name="prefer_water"/>：<Version add="1.5.0" inline/> 为`true`时优先逃向水中。默认值为`false`。
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

<Usable type="all"/> <Version add="1.8.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物拾取地面上的物品。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.pickup_items"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="can_pickup_any_item"/>：<Version add="1.16.0" inline/> 为`true`时任何物品都会拾取。默认值为`false`。
  - <DataType type="boolean" name="can_pickup_to_hand_or_equipment"/>：<Version add="1.16.0" inline/> 为`true`时可以把物品放到手上或装备栏。默认值为`true`。
  - <DataType type="boolean" name="pickup_based_on_chance"/>：<Version add="1.16.0" inline/> 为`true`时按难度决定是否拾取。默认值为`false`。
  - <DataType type="boolean" name="pickup_same_items_as_in_hand"/>：为`true`时只拾取与手中相同的物品。默认值为`false`。
  - <DataType type="boolean" name="stop_if_holding_item"/>：为`true`时手中已有物品就不再拾取。默认值为`false`。
  - <DataType type="boolean" name="track_target"/>：为`true`时持续追逐有效目标。默认值为`false`。
  - <DataType type="array" name="excluded_items"/>：<Version add="1.17.30" inline/> 不会拾取的物品列表。
    - <DataType type="string"/>：物品 ID。
  - <DataType type="int" name="max_dist"/>：搜索物品的最大距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="search_height"/>：搜索物品的垂直距离，单位为方块。默认值为`1`。
  - <DataType type="int" name="cooldown_after_being_attacked"/>：被攻击后多少秒内停止拾取。默认值为`0`。
  - <DataType type="float" name="goal_radius"/>：距物品多近即视为到达，单位为方块。默认值为`0.5`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="object" name="on_pickup_item_start"/>：<Version add="1.26.20" inline/> 开始走向物品时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_pickup_item_end"/>：<Version add="1.26.20" inline/> 拾取完成或放弃时触发的事件，结构同上。
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

<Usable type="all"/> <Version add="1.21.100"/> <br/>

使生物放置携带的方块，铜傀儡使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.place_block"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="placeable_carried_blocks"/>：允许从身上放置的方块列表，元素写作`{ "block": 方块描述 }`。
  - <DataType type="array" name="randomly_placeable_blocks"/>：可随机放置的方块列表，元素含`block`、`filter`与`weight`。
  - <DataType type="object" name="can_place"/>：允许放置的条件。见[实体过滤器](../filters)。
  - <DataType type="float" name="chance"/>：每刻尝试放置的概率。默认值为`1`。
  - <DataType type="boolean" name="affected_by_griefing_rule"/>：为`true`时受「允许破坏方块」游戏规则影响。默认值为`true`。
  - <DataType type="array" name="xz_range"/>：尝试放置的水平范围，写作`[最小值, 最大值]`。默认值为`[-2, 2]`。
  - <DataType type="array" name="y_range"/>：尝试放置的垂直范围，写作`[最小值, 最大值]`。默认值为`[0, 3]`。
  - <DataType type="object" name="on_place"/>：成功放置时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使生物寻找同伴一起玩耍，村民的幼年个体使用该行为。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.play"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="array" name="friend_types"/>：<Version add="1.19.40" inline/> 可作为玩伴的实体条件列表。
    - <DataType type="object"/>：一项条件。
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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
  - <DataType type="float" name="chance_to_start"/>：<Version add="1.19.40" inline/> 每刻开始玩耍的概率。默认值为`0.0025`。
  - <DataType type="array" name="friend_search_area"/>：<Version add="1.19.40" inline/> 搜索玩伴的范围，写作`[x, y, z]`。默认值为`[6, 3, 6]`。
  - <DataType type="int" name="follow_distance"/>：<Version add="1.19.40" inline/> 与玩伴保持的距离，单位为方块。默认值为`2`。
  - <DataType type="float" name="max_play_duration_seconds"/>：<Version add="1.19.40" inline/> 一次玩耍持续的秒数。默认值为`50`。
  - <DataType type="int" name="random_pos_search_range"/>：<Version add="1.19.40" inline/> 在地面上搜索随机位置的距离，单位为方块。默认值为`16`。
  - <DataType type="int" name="random_pos_search_height"/>：<Version add="1.19.40" inline/> 搜索随机位置的高度，单位为方块。默认值为`3`。
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

<Usable type="all"/> <Version add="1.18.30"/> <Highlight text="限定实体类型" tooltip="该组件仅对美西螈可用。"/> <br/>

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
  - <DataType type="object" name="filters"/>：装死需满足的额外条件。实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:rideable组件。"/> <br/>

使玩家可以骑乘已驯服的该实体。

另见：_[`minecraft:rideable`](functional#minecraftrideable)组件_、_[EntityRideableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityrideablecomponent-类)_。

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
  - <DataType type="int" name="initial_eat_delay"/>：<Version add="1.13.0" inline/> 到达目标后开始啃食前的等待时间，单位为秒。默认值为`0`。
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

<Usable type="all"/> <Version add="1.18.30"/> <br/>

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
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
      - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.4.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体随机飞行。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_fly"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="can_land_on_trees"/>：为`true`时允许降落在树上而非地面。默认值为`true`。
  - <DataType type="float" name="speed_multiplier"/>：<Version add="1.21.0" inline/> 执行该行为时的移动速度乘数。默认值为`1`。
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

<Usable type="all"/> <Version add="1.14.0"/> <br/>

使实体在贴近地面的高度上随机悬浮移动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_hover"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="hover_height"/>：<Version add="1.18.10" inline/> 悬浮高度区间，单位为方块。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
  - <DataType type="float" name="max_angle_of_view_horizontal"/>：<Version add="1.19.50" inline/> 相对初始朝向，向右可转的最大角度，单位为度。默认值为`180`。
  - <DataType type="float" name="min_angle_of_view_horizontal"/>：<Version add="1.19.50" inline/> 相对初始朝向，向左可转的最大角度，单位为度。默认值为`-180`。
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

<Usable type="all"/> <Version add="1.13.0"/> <br/>

使实体随机坐下并在坐姿下环顾四周。需要有对应的坐下动画才能生效。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_look_around_and_sit"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="continue_if_leashed"/>：<Version add="1.19.50" inline/> 为`true`时被拴住的实体也会持续执行该行为。默认值为`false`。
  - <DataType type="boolean" name="continue_sitting_on_reload"/>：<Version add="1.20.40" inline/> 为`true`时区块重新加载后保持坐下状态。默认值为`false`。
  - <DataType type="float" name="max_angle_of_view_horizontal"/>：<Version add="1.19.50" inline/> 相对初始朝向，向右可转的最大角度，单位为度。默认值为`180`。
  - <DataType type="int" name="max_look_count"/>：环顾时注视方向数量的上限。默认值为`2`。
  - <DataType type="int" name="max_look_time"/>：每个方向注视时间的上限，单位为刻。默认值为`40`。
  - <DataType type="float" name="min_angle_of_view_horizontal"/>：<Version add="1.19.50" inline/> 相对初始朝向，向左可转的最大角度，单位为度。默认值为`-180`。
  - <DataType type="int" name="min_look_count"/>：环顾时注视方向数量的下限。默认值为`1`。
  - <DataType type="int" name="min_look_time"/>：每个方向注视时间的下限，单位为刻。默认值为`20`。
  - <DataType type="float" name="probability"/>：触发该行为的概率。默认值为`0.02`。
  - <DataType type="int" name="random_look_around_cooldown"/>：<Version add="1.19.50" inline/> 再次触发前的冷却时间，单位为秒。默认值为`0`。
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

<Usable type="all"/> <Version add="1.19.70"/> <Highlight text="限定实体类型" tooltip="该组件仅对嗅探兽可用。"/> <br/>

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
  - <DataType type="string" name="item_table"/>：<Version add="1.20.40" inline/> 产出物品所用的战利品表路径，相对于行为包根目录。
  - <DataType type="object" name="on_digging_start"/>：开始挖掘时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
  - <DataType type="array" name="target_blocks"/>：<Version add="1.20.40" inline/> 允许挖掘的方块列表，会覆盖默认列表。默认值为空数组。
    - <DataType type="string"/>：方块 ID，也可写成含`name`、`states`、`tags`的对象。
  - <DataType type="float" name="target_dig_position_offset"/>：<Version add="1.20.10" inline/> 挖掘判定点沿实体朝向前移的距离，单位为方块。默认值为`2.25`。
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

<Usable type="all"/> <Version add="1.8.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体随机四处闲逛。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_stroll"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="interval"/>：<Version add="1.4.0" inline/> 每刻以`1/interval`的概率触发该行为。默认值为`120`。
  - <DataType type="float" name="speed_multiplier"/>：<Version add="1.4.0" inline/> 执行该行为时的移动速度乘数。默认值为`1`。
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

<Usable type="all"/> <Version add="1.4.0"/> <br/>

使实体在水中随机游动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.random_swim"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="avoid_surface"/>：<Version add="1.15.0" inline/> 为`true`时实体从水面下方游过，不会浮到水面。默认值为`true`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:shooter组件。"/> <br/>

使实体通过远程射击攻击目标。启用蓄力连发时，`charge_shoot_trigger`必须大于`0`。

另见：_[`minecraft:shooter`](functional#minecraftshooter)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.ranged_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="attack_interval"/>：<Version add="1.15.0" deprecated="1.26.40" inline/>两次攻击之间的秒数。默认值为`0`。
  - <DataType type="object" name="attack_interval"/>：<Version add="1.26.40" inline/>两次攻击之间的间隔区间，单位为秒，取代`attack_interval_min`与`attack_interval_max`。
    - <DataType type="float" name="min"/>：区间下限。默认值为`-1`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`-1`。
  - <DataType type="float" name="attack_interval_min"/>：<Version add="未知" deprecated="1.26.40" inline/>两次攻击间隔的下限。默认值为`0`。
  - <DataType type="float" name="attack_interval_max"/>：<Version add="未知" deprecated="1.26.40" inline/>两次攻击间隔的上限。默认值为`0`。
  - <DataType type="float" name="attack_radius"/>：<Version add="未知" deprecated="1.26.50" inline/>可以发起攻击的最大距离，`26.50`起由`attack_range`取代。默认值为`0`。
  - <DataType type="float" name="attack_radius_min"/>：<Version add="未知" deprecated="1.26.50" inline/>目标进入攻击范围的最小距离，`26.50`起由`attack_range`取代。默认值为`0`。
  - <DataType type="object" name="attack_range"/>：<Version add="1.26.50" inline/>可以发起攻击的距离区间，单位为方块。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="burst_interval"/>：蓄力连发时每发之间的间隔，单位为秒。默认值为`0`。
  - <DataType type="int" name="burst_shots"/>：蓄力连发时的每次射击发数。默认值为`1`。
  - <DataType type="float" name="charge_charged_trigger"/>：在`charge_shoot_trigger`基础上再蓄力多少秒才算蓄满。默认值为`0`。
  - <DataType type="float" name="charge_shoot_trigger"/>：开始筹备连发前需要蓄力多少秒（随后翻倍）。目标离开视线时蓄力会衰减。默认值为`0`。
  - <DataType type="string" name="in_range_movement_mode"/>：<Version add="1.26.50" inline/>进入攻击距离后如何移动。可选值为`hold_position`（原地不动）、`follow_target`（跟随目标）。
  - <DataType type="float" name="ranged_fov"/>：<Version add="1.6.0" inline/> 用于发现目标的视野角度，单位为度。默认值为`90`。
  - <DataType type="boolean" name="set_persistent"/>：<Version add="1.18.30" inline/> 为`true`时瞄准玩家后不再被自然清除。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：追击目标时的移动速度乘数。默认值为`1`。
  - <DataType type="boolean" name="swing"/>：<Version add="1.18.30" inline/> 为`true`时开火会触发手臂摆动动画（依赖`variable.attack_time`）。默认值为`false`。
  - <DataType type="float" name="target_in_sight_time"/>：<Version add="1.15.0" inline/> 发现目标后需要持续看见多少秒才会开始追击。默认值为`1`。
  - <DataType type="float" name="x_max_rotation"/>：<Version add="1.15.0" inline/> 瞄准时每次最多旋转的角度（X 轴），单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：<Version add="1.15.0" inline/> 瞄准时头部每次最多旋转的角度（Y 轴），单位为度。默认值为`30`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对村民可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.16.0"/> <br/>

使实体在液体中维持在距液面固定深度的位置。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.rise_to_liquid_level"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="liquid_y_offset"/>：<Version add="1.18.10" inline/> 目标位置距液面下沉的距离，单位为方块。正值使目标位置更靠下。默认值为`0`。
  - <DataType type="float" name="rise_delta"/>：<Version add="1.18.10" inline/> 低于目标位置时每刻向上移动的距离。默认值为`0`。
  - <DataType type="float" name="sink_delta"/>：<Version add="1.18.10" inline/> 高于目标位置时每刻向下移动的距离。默认值为`0`。
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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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

<Usable type="all"/> <Version add="1.8.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.18.10"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
      - <DataType type="boolean" name="look_at_target"/>：<Version add="1.16.100" inline/> 为`true`时施法期间注视目标。默认值为`true`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体把身上的物品分给其他实体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.share_items"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="entity_types"/>：可以分享物品的实体条件，可写成数组或单个对象。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对蠹虫可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对蠹虫可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对马、骡、驴与骷髅马可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.10.0"/> <br/>

使拥有床的实体前往床上睡觉。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.sleep"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="can_sleep_while_riding"/>：<Version add="1.19.0" inline/> 为`true`时骑乘其他实体也能执行该行为。默认值为`false`。
  - <DataType type="float" name="cooldown_time"/>：再次使用该行为前的冷却时间，单位为秒。默认值为`0`。
  - <DataType type="float" name="sleep_collider_height"/>：睡觉时碰撞箱的高度。默认值为`1`。
  - <DataType type="float" name="sleep_collider_width"/>：睡觉时碰撞箱的宽度。默认值为`1`。
  - <DataType type="float" name="sleep_y_offset"/>：睡觉时碰撞箱在垂直方向上的偏移。默认值为`1`。
  - <DataType type="float" name="speed_multiplier"/>：执行该行为时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="timeout_cooldown"/>：<Version add="1.11.0" inline/> 内部超时或失败后重新使用该行为前的冷却，单位为秒。默认值为`8`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体在攻击过程中周期性进入疲惫状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.slime_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="grow_tired_cooldown_time"/>：两次进入疲惫状态之间的冷却，单位为秒。默认值为`15`。
  - <DataType type="boolean" name="set_persistent"/>：<Version add="1.16.0" inline/> 为`true`时瞄准玩家后不再被自然清除。默认值为`false`。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对史莱姆与岩浆怪可用。"/> <br/>

使史莱姆与岩浆怪在水中或熔岩中浮起。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.slime_float"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="jump_chance_percentage"/>：<Version add="1.15.0" inline/> 在液体中跳跃的概率。默认值为`0.8`。
  - <DataType type="float" name="speed_multiplier"/>：<Version add="1.15.0" inline/> 在液体中移动时的速度乘数。默认值为`1.2`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体像史莱姆一样持续跳跃前进。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.slime_keep_on_jumping"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="speed_multiplier"/>：<Version add="1.15.0" inline/> 跳跃时的移动速度乘数。默认值为`1`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体像史莱姆一样随机改变移动方向。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.slime_random_direction"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="int" name="add_random_time_range"/>：<Version add="1.15.0" inline/> 在`min_change_direction_time`基础上随机追加的时间上限，单位为秒。默认值为`3`。
  - <DataType type="float" name="min_change_direction_time"/>：<Version add="1.15.0" inline/> 两次改变方向之间的最短时间，单位为秒。默认值为`2`。
  - <DataType type="int" name="turn_range"/>：<Version add="1.15.0" inline/> 改变方向时的最大转角，单位为度。默认值为`360`。
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

<Usable type="all"/> <Version add="1.8.0"/> <br/>

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

<Usable type="all"/> <Version add="1.8.0"/> <br/>

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
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对鱿鱼可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.13.0"/> <br/>

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
  - <DataType type="boolean" name="set_persistent"/>：<Version add="1.16.0" inline/> 为`true`时瞄准玩家后不再被自然清除。默认值为`false`。
  - <DataType type="float" name="stalk_speed"/>：接近目标时的移动速度。默认值为`1.2`。
  - <DataType type="float" name="strike_dist"/>：落地后仍能造成伤害的最大距离，单位为方块。默认值为`2`。
  - <DataType type="object" name="stuck_blocks"/>：扑击失败时会陷进去的方块条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.19.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体通过踩踏造成范围伤害。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.stomp_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="attack_once"/>：<Version add="1.6.0" inline/> 为`true`时该行为在实体整个生命周期内只触发一次。默认值为`false`。
  - <DataType type="string" name="attack_types"/>：该实体会攻击的实体类型。
  - <DataType type="boolean" name="can_spread_on_fire"/>：<Version add="1.20.30" inline/> 为`true`时着火的空手实体命中后会点燃目标。默认值为`false`。
  - <DataType type="float" name="cooldown_time"/>：<Version add="1.15.0" inline/> 两次攻击之间的冷却，单位为秒。默认值为`1`。
  - <DataType type="float" name="inner_boundary_time_increase"/>：<Version add="1.15.0" inline/> 目标超出`path_inner_boundary`时，寻路重算间隔的增量，单位为秒。默认值为`0.25`。
  - <DataType type="float" name="max_path_time"/>：<Version add="1.15.0" inline/> 寻路重算间隔的基础上限，单位为秒。默认值为`0.55`。
  - <DataType type="float" name="min_path_time"/>：<Version add="1.15.0" inline/> 寻路重算间隔的基础下限，单位为秒。默认值为`0.2`。
  - <DataType type="float" name="no_damage_range_multiplier"/>：<Version add="1.15.0" inline/> 与实体基础体积相乘得到「无伤害范围」，目标处于该范围内时该行为进入冷却。默认值为`2`。
  - <DataType type="object" name="on_attack"/>：<Version add="1.15.0" inline/> 攻击命中时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_kill"/>：<Version add="1.21.80" inline/> 击杀目标时触发的事件，结构同上。
  - <DataType type="float" name="outer_boundary_time_increase"/>：<Version add="1.15.0" inline/> 目标超出`path_outer_boundary`时，寻路重算间隔的增量，单位为秒。默认值为`0.5`。
  - <DataType type="float" name="path_fail_time_increase"/>：<Version add="1.15.0" inline/> 无法沿当前路径移动时，寻路重算间隔的增量，单位为秒。默认值为`0.75`。
  - <DataType type="float" name="path_inner_boundary"/>：<Version add="1.15.0" inline/> 超过该距离时按`inner_boundary_time_increase`增加间隔，单位为方块。默认值为`16`。
  - <DataType type="float" name="path_outer_boundary"/>：<Version add="1.15.0" inline/> 超过该距离时按`outer_boundary_time_increase`增加间隔，单位为方块。默认值为`32`。
  - <DataType type="int" name="random_stop_interval"/>：以`1/N`的概率中断当前攻击，`N`取该值。默认值为`0`。
  - <DataType type="float" name="reach_multiplier"/>：与实体基础体积相乘得到造成伤害前的最小目标距离。默认值为`2`。
  - <DataType type="boolean" name="require_complete_path"/>：<Version add="1.9.0" inline/> 为`true`时必须存在从实体到目标的完整寻路路径。默认值为`false`。
  - <DataType type="float" name="speed_multiplier"/>：追击目标时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="stomp_range_multiplier"/>：<Version add="1.15.0" inline/> 与实体基础体积相乘得到踩踏的范围伤害半径。默认值为`2`。
  - <DataType type="boolean" name="track_target"/>：为`true`时即使没有硬编码的感知组件也会追踪目标。默认值为`false`。
  - <DataType type="float" name="x_max_rotation"/>：<Version add="1.15.0" inline/> 瞄准时每次最多旋转的角度（X 轴），单位为度。默认值为`30`。
  - <DataType type="float" name="y_max_head_rotation"/>：<Version add="1.15.0" inline/> 瞄准时头部每次最多旋转的角度（Y 轴），单位为度。默认值为`30`。
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

<Usable type="all"/> <Version add="1.5.0"/> <br/>

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

<Usable type="all"/> <Version add="1.13.3"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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
      - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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
          - <DataType type="string" name="summon_event"/>：<Version add="1.21.50" inline/> 被召唤实体生成时触发的实体事件 ID。
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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对苦力怕可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.15.0"/> <br/>

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

<Usable type="all"/> <Version add="1.21.20"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:breathable组件。"/> <br/>

使实体在氧气即将耗尽时游向空气。

另见：_[`minecraft:breathable`](attributes#minecraftbreathable)组件_、_[EntityBreathableComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitybreathablecomponent-类)_。

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

<Usable type="all"/> <Version add="1.4.0"/> <br/>

使实体在游泳且未寻路时随意游动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.swim_wander"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="interval"/>：<Version add="1.15.0" inline/> 未寻路时开始游动的概率。默认值为`0.00833`。
  - <DataType type="float" name="look_ahead"/>：<Version add="1.15.0" inline/> 游动时向前探测障碍的距离。默认值为`5`。
  - <DataType type="float" name="speed_multiplier"/>：游动时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="wander_time"/>：<Version add="1.15.0" inline/> 一次游动持续的时间，单位为秒。默认值为`5`。
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

<Usable type="all"/> <Version add="1.15.0"/> <br/>

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
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.6.0"/> <br/>

使实体俯冲攻击目标，适合飞行生物。发生水平碰撞或目标远离时行为结束。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.swoop_attack"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="damage_reach"/>：<Version add="1.15.0" inline/> 与实体基础体积相加，得到造成伤害时允许的最大目标距离。默认值为`0.2`。
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

<Usable type="all"/> <Version add="1.21.100"/> <br/>

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
  - <DataType type="object" name="can_take"/>：取走方块前需满足的条件。见[实体过滤器](../filters)。
  - <DataType type="float" name="chance"/>：每刻尝试取走方块的概率，取值 0 到 1。默认值为`1`。
  - <DataType type="object" name="on_take"/>：取走方块时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体接受另一实体通过`minecraft:behavior.offer_flower`递来的花。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.take_flower"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：<Version add="1.19.50" inline/> 接受花朵需满足的条件。见[实体过滤器](../filters)。
  - <DataType type="float" name="max_head_rotation_y"/>：<Version add="1.19.50" inline/> 抬头注视目标时的最大 Y 轴旋转角度，单位为度。默认值为`30`。
  - <DataType type="float" name="max_rotation_x"/>：<Version add="1.19.50" inline/> 注视目标时的最大 X 轴旋转角度，单位为度。默认值为`30`。
  - <DataType type="float" name="max_wait_time"/>：<Version add="1.19.50" inline/> 接花前随机等待时间的上限，单位为秒。默认值为`20`。
  - <DataType type="float" name="min_distance_to_target"/>：<Version add="1.19.50" inline/> 视为已到达目标的最小距离，单位为方块。默认值为`2`。
  - <DataType type="float" name="min_wait_time"/>：<Version add="1.19.50" inline/> 接花前随机等待时间的下限，单位为秒。默认值为`4`。
  - <DataType type="object" name="on_take_flower"/>：<Version add="1.21.110" inline/> 接到花时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="array" name="search_area"/>：<Version add="1.19.50" inline/> 搜索递花对象的范围，写作`[x, y, z]`，也可写成含`x`、`y`、`z`的对象。
  - <DataType type="float" name="speed_multiplier"/>：<Version add="1.19.50" inline/> 执行该行为时的移动速度乘数。默认值为`0.5`。
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

<Usable type="all"/> <Version add="未知"/> <br/>

使实体在被其他实体推动时把对方设为目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.target_when_pushed"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="entity_types"/>：目标实体的条件，可写成数组或单个对象。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.21.20"/> <br/>

使实体传送到其主人身边。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.teleport_to_owner"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="float" name="cooldown"/>：再次尝试传送前的冷却时间，单位为秒。默认值为`1`。
  - <DataType type="object" name="filters"/>：允许传送需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使实体被手持特定物品的玩家吸引并跟随。移动依赖寻路。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.tempt"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="boolean" name="can_get_scared"/>：为`true`时玩家在极近距离内快速移动会让实体停止被吸引。默认值为`false`。
  - <DataType type="boolean" name="can_tempt_vertically"/>：<Version add="1.18.10" inline/> 为`true`时计算与玩家的垂直距离。默认值为`false`。
  - <DataType type="boolean" name="can_tempt_while_ridden"/>：<Version add="1.18.10" inline/> 为`true`时被骑乘也能被吸引。默认值为`false`。
  - <DataType type="array" name="items"/>：可以吸引该实体的物品列表。默认值为空数组。
    - <DataType type="string"/>：物品 ID，也可写成含`name`的对象。
  - <DataType type="object" name="on_tempt_end"/>：停止被吸引时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
  - <DataType type="object" name="on_tempt_start"/>：开始被吸引时触发的事件，结构同上。
  - <DataType type="object" name="sound_interval"/>：<Version add="1.18.10" inline/> 吸引期间播放音效的间隔区间，单位为刻。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
  - <DataType type="float" name="speed_multiplier"/>：跟随玩家时的移动速度乘数。默认值为`1`。
  - <DataType type="float" name="stop_distance"/>：<Version add="1.21.80" inline/> 距玩家多近时停止跟随，单位为方块。
  - <DataType type="string" name="tempt_sound"/>：<Version add="1.18.10" inline/> 吸引期间播放的音效事件名。
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

<Usable type="all"/> <Version add="1.20.40"/> <br/>

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
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.20.40"/> <br/>

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
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.20.40"/> <br/>

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
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.10.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

允许玩家与该实体交易。行为开始时实体会停止寻路。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.trade_with_player"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="filters"/>：<Version add="1.19.60" inline/> 允许交易需满足的条件。见[实体过滤器](../filters)。
  - <DataType type="float" name="max_distance_from_player"/>：<Version add="1.19.60" inline/> 距玩家超过该距离时退出交易行为，单位为方块。默认值为`8`。
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

<Usable type="all"/> <Version add="1.21.100"/> <br/>

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

<Usable type="all"/> <Version add="1.21.130"/> <br/>

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
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <Highlight text="限定实体类型" tooltip="该组件仅对凋灵可用。"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

使凋灵优先攻击对它造成伤害最多的实体。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:behavior.wither_target_highest_damage"/>：根对象。
  - <DataType type="int" name="priority"/>：行为优先级，数值越小越优先。默认值为`0`。
  - <DataType type="array" name="control_flags"/>：该行为占用的控制通道。可选值为`move`、`look`、`jump`。
    - <DataType type="string"/>：一个控制通道。
  - <DataType type="object" name="entity_types"/>：目标实体的条件，可写成数组或单个对象。
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
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

<Usable type="all"/> <Version add="1.18.10"/> <br/>

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
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

<Usable type="all"/> <Version add="1.18.30"/> <br/>

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
    - <DataType type="object" name="filters"/>：实体需满足的条件。见[实体过滤器](../filters)。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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
import GiscusComment from "/src/components/comment/giscus.js"
import Button from '/src/components/button/base';

<GiscusComment/>
