---
sidebar_position: 7
sidebar_label: 弃用组件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

# 弃用组件

弃用组件在新版本中已被其他组件取代或不再生效，仅为兼容旧版本附加包保留，新项目应改用对应的替代组件。

### `minecraft:behavior.enderman_leave_block`

<Usable type="all"/> <Version add="1.2.0" deprecated="1.21.100" tooltip="在高版本使用minecraft:behavior.place_block组件代替之。"/> <Highlight text="限定实体类型" tooltip="该组件仅对末影人可用。"/> <br/>

定义末影人会放下方块。

另见：_[`minecraft:behavior.place_block`](ai#minecraftbehaviorplace_block)组件_。

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

另见：_[`minecraft:behavior.take_block`](ai#minecraftbehaviortake_block)组件_。

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

### `minecraft:behavior.follow_target_captain`

<Usable type="all"/> <Version add="1.11.0" deprecated="1.26.20" tooltip="在高版本使用minecraft:behavior.follow_target_leader组件代替之。"/> <br/>

使袭击者跟随袭击队长。

另见：_[`minecraft:behavior.follow_target_leader`](ai#minecraftbehaviorfollow_target_leader)组件_。

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

> **备注**：官方 schema 已不再收录该组件，1.26.20 起由`minecraft:behavior.follow_target_leader`承接；以下参数按 26.60 之前的原版用例整理。

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

### `minecraft:body_rotation_axis_aligned`

<Usable type="all"/> <Version add="1.21.70" deprecated="1.21.100" tooltip="在高版本使用minecraft:rotation_axis_aligned组件代替之。"/> <br/>

定义实体的身体会根据其当前朝向自动旋转，以对齐到最近的坐标轴方向。与 `minecraft:body_rotation_blocked` 组件组合使用时，实体会对齐到最近的坐标轴方向并固定在该朝向，不再随其面向方向的变化而改变。

另见：_[`minecraft:rotation_axis_aligned`](functional#minecraftrotation_axis_aligned)组件_。

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

另见：_[`minecraft:dash_action`](functional#minecraftdash_action)组件_。

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

当用[`minecraft:rideable`](functional#minecraftrideable)组件设定为可骑乘实体后，该实体将可由 WASD 和鼠标控制运动。类似于快乐恶魂。

另见：_[`minecraft:free_camera_controlled`](functional#minecraftfree_camera_controlled)组件_。

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

另见：_[`minecraft:looked_at`](functional#minecraftlooked_at)组件_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:lookat"/>：根对象。
  - <DataType type="float" name="field_of_view"/>：判定注视所需的视场角宽度，单位为度。默认值为`26`。
  - <DataType type="object" name="filters"/>：哪些实体算作注视者。见[实体过滤器](../filters)。
  - <DataType type="boolean" name="find_players_only"/>：是否只搜索玩家。默认值为`false`。
  - <DataType type="array" name="look_at_locations"/>：被判定为「注视」的躯体部位，至少一处无遮挡即算注视。
    - <DataType type="object"/>：一个部位。
      - <DataType type="string" name="location"/>：部位名。可填`head`、`body`、`feet`。
  - <DataType type="float" name="look_cooldown"/>：检测到注视者后再次检测所需等待的秒数。默认值为`5`。
  - <DataType type="object" name="looked_at_event"/>：检测到注视者时触发的事件。
    - <DataType type="string" name="event"/>：事件 ID。
    - <DataType type="string" name="target"/>：事件作用于哪个主体。可填`self`（自身）、`other`（交互另一方）、`player`（玩家）、`target`（当前攻击目标）、`parent`（父母）、`block`（方块）、`damager`（伤害来源），完整取值与含义见[测试主体](../filters#测试主体)。默认值为`self`。
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

另见：_[`minecraft:pushable_by_block`](attributes#minecraftpushable_by_block)组件_、_[`minecraft:pushable_by_entity`](attributes#minecraftpushable_by_entity)组件_。

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

### `minecraft:uses_legacy_ambient_sounds`

<Usable type="all"/> <Version removed/> <br/>

让实体按旧规则自动挑选环境音效：不在地面时用`ambient.in.air`，头部在水中时用`ambient.in.water`，幼体用`ambient.baby`，其余情况用`ambient`。该组件只在旧版定义的实体上自动注入，不需要也不能手动书写。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:uses_legacy_ambient_sounds"/>：根对象，没有可填参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

无需手动书写。格式版本低于`1.26.50`的实体定义会自动获得该组件。

</TabItem></Tabs>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
