---
sidebar_position: 4
sidebar_label: 寻路与运动组件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

# 寻路与运动组件

寻路与运动组件规定了实体在拥有一个目标后，会尝试以何种路径到达预定地点。

要定位某一条，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=entity_component" color="green"/>

### `minecraft:movement`

<Usable type="all"/> <Version add="未知"/> <br/>

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

<Usable type="all"/> <Version add="1.5.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="未知"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.4.0"/> <br/>

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

<Usable type="all"/> <Version add="未知"/> <br/>

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

<Usable type="all"/> <Version add="1.14.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义跳跃式移动方式，落地后需等待一段时间才能再次起跳。

另见：_[EntityMovementJumpComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementjumpcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.jump"/>：根对象。
  - <DataType type="array" name="jump_delay"/>：<Version add="1.2.0" deprecated="1.26.60" inline/>落地后再次起跳的延迟区间，写作`[最小值, 最大值]`，单位为秒。默认值为`[0, 0]`。
  - <DataType type="object" name="jump_delay"/>：<Version add="1.26.60" inline/>落地后再次起跳的延迟区间，单位为秒。
    - <DataType type="float" name="min"/>：区间下限。默认值为`0`。
    - <DataType type="float" name="max"/>：区间上限。默认值为`0`。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义摇摆式移动方式，实体在移动时左右晃动。

另见：_[EntityMovementSwayComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymovementswaycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:movement.sway"/>：根对象。
  - <DataType type="float" name="max_turn"/>：每刻最多转动的角度，单位为度。默认值为`30`。
  - <DataType type="float" name="sway_amplitude"/>：<Version add="1.18.10" inline/>左右摇摆的幅度。默认值为`0.05`。
  - <DataType type="float" name="sway_frequency"/>：<Version add="1.18.10" inline/>摇摆频率的乘数。默认值为`0.5`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

远古守卫者（<FileType type="file" name="elder_guardian.json"/>）：全部使用默认值。

```json showLineNumbers
"minecraft:movement.sway": {}
```

</TabItem></Tabs>

---

### `minecraft:navigation.climb`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义可攀爬实体的寻路方式，能在墙面与方块侧面上下移动。

另见：_[EntityNavigationClimbComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationclimbcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.climb"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：<Version add="1.16.210" inline/>是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：<Version add="1.16.210" inline/>是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：<Version add="1.4.0" inline/>在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：<Version add="1.7.0" inline/>是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：<Version add="1.16.0" inline/>是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：<Version add="1.14.0" inline/>是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：<Version add="1.15.0" inline/>是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：<Version add="1.10.0" inline/>是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_float"/>：<Version add="1.2.0" deprecated="1.7.0" inline/>是否能在水面上漂浮。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：<Version add="1.16.210" inline/>是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：<Version add="1.16.210" inline/>是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：<Version add="1.16.0" inline/>是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：<Version add="1.16.210" inline/>是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_powder_snow"/>：<Version add="1.16.200" deprecated="1.16.210" inline/>寻路时是否避开细雪。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：<Version add="1.16.210" inline/>寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：<Version add="1.16.210" inline/>寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./functional#minecraftannotationopen_door)等组件。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义漂浮实体的寻路方式，如蝙蝠在空中的缓慢移动。

另见：_[EntityNavigationFloatComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationfloatcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.float"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：<Version add="1.16.210" inline/>是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：<Version add="1.16.210" inline/>是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：<Version add="1.4.0" inline/>在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：<Version add="1.7.0" inline/>是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：<Version add="1.16.0" inline/>是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：<Version add="1.14.0" inline/>是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：<Version add="1.15.0" inline/>是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：<Version add="1.10.0" inline/>是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_float"/>：<Version add="1.2.0" deprecated="1.7.0" inline/>是否能在水面上漂浮。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：<Version add="1.16.210" inline/>是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：<Version add="1.16.210" inline/>是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：<Version add="1.16.0" inline/>是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：<Version add="1.16.210" inline/>是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_powder_snow"/>：<Version add="1.16.200" deprecated="1.16.210" inline/>寻路时是否避开细雪。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：<Version add="1.16.210" inline/>寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：<Version add="1.16.210" inline/>寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./functional#minecraftannotationopen_door)等组件。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义飞行实体的寻路方式，可穿越空中与水面。

另见：_[EntityNavigationFlyComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationflycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.fly"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：<Version add="1.16.210" inline/>是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：<Version add="1.16.210" inline/>是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：<Version add="1.4.0" inline/>在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：<Version add="1.7.0" inline/>是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：<Version add="1.16.0" inline/>是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：<Version add="1.14.0" inline/>是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：<Version add="1.15.0" inline/>是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：<Version add="1.10.0" inline/>是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_float"/>：<Version add="1.2.0" deprecated="1.7.0" inline/>是否能在水面上漂浮。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：<Version add="1.16.210" inline/>是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：<Version add="1.16.210" inline/>是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：<Version add="1.16.0" inline/>是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：<Version add="1.16.210" inline/>是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_powder_snow"/>：<Version add="1.16.200" deprecated="1.16.210" inline/>寻路时是否避开细雪。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：<Version add="1.16.210" inline/>寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：<Version add="1.16.210" inline/>寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./functional#minecraftannotationopen_door)等组件。
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

<Usable type="all"/> <Version add="1.4.0"/> <br/>

定义通用寻路方式，同时具备行走、游泳与攀爬等多种通行能力。

另见：_[EntityNavigationGenericComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationgenericcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.generic"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：<Version add="1.16.210" inline/>是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：<Version add="1.16.210" inline/>是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：<Version add="1.7.0" inline/>是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：<Version add="1.16.0" inline/>是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：<Version add="1.14.0" inline/>是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：<Version add="1.15.0" inline/>是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：<Version add="1.10.0" inline/>是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_float"/>：<Version add="1.4.0" deprecated="1.7.0" inline/>是否能在水面上漂浮。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：<Version add="1.16.210" inline/>是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：<Version add="1.16.210" inline/>是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：<Version add="1.16.0" inline/>是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：<Version add="1.16.210" inline/>是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_powder_snow"/>：<Version add="1.16.200" deprecated="1.16.210" inline/>寻路时是否避开细雪。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：<Version add="1.16.210" inline/>寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：<Version add="1.16.210" inline/>寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./functional#minecraftannotationopen_door)等组件。
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

<Usable type="all"/> <Version add="1.14.0"/> <br/>

定义悬停实体的寻路方式，如悦灵在空中悬停移动。

另见：_[EntityNavigationHoverComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationhovercomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.hover"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：<Version add="1.16.210" inline/>是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：<Version add="1.16.210" inline/>是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：<Version add="1.16.0" inline/>是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：<Version add="1.15.0" inline/>是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：<Version add="1.16.210" inline/>是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：<Version add="1.16.210" inline/>是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：<Version add="1.16.0" inline/>是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：<Version add="1.16.210" inline/>是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_powder_snow"/>：<Version add="1.16.200" deprecated="1.16.210" inline/>寻路时是否避开细雪。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：<Version add="1.16.210" inline/>寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：<Version add="1.16.210" inline/>寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./functional#minecraftannotationopen_door)等组件。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义水生实体的寻路方式，只能在水中通行。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.swim"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：<Version add="1.16.210" inline/>是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：<Version add="1.16.210" inline/>是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：<Version add="1.4.0" inline/>在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：<Version add="1.7.0" inline/>是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：<Version add="1.16.0" inline/>是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：<Version add="1.14.0" inline/>是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：<Version add="1.15.0" inline/>是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：<Version add="1.10.0" inline/>是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_float"/>：<Version add="1.2.0" deprecated="1.7.0" inline/>是否能在水面上漂浮。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：<Version add="1.16.210" inline/>是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：<Version add="1.16.210" inline/>是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：<Version add="1.16.0" inline/>是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：<Version add="1.16.210" inline/>是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_powder_snow"/>：<Version add="1.16.200" deprecated="1.16.210" inline/>寻路时是否避开细雪。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：<Version add="1.16.210" inline/>寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：<Version add="1.16.210" inline/>寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./functional#minecraftannotationopen_door)等组件。
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

<Usable type="all"/> <Version add="1.2.0"/> <br/>

定义陆生实体的寻路方式，可在地面行走并跳过一格高的障碍。

另见：_[EntityNavigationWalkComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitynavigationwalkcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:navigation.walk"/>：根对象。
  - <DataType type="boolean" name="can_walk"/>：<Version add="1.16.210" inline/>是否能在水面之外的地面行走。默认值为`true`。
  - <DataType type="boolean" name="can_swim"/>：<Version add="1.16.210" inline/>是否能在水中通行。默认值为`false`。
  - <DataType type="boolean" name="can_sink"/>：<Version add="1.4.0" inline/>在水中是否受重力下坠。默认值为`true`。
  - <DataType type="boolean" name="can_path_over_water"/>：<Version add="1.7.0" inline/>是否能从水面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_over_lava"/>：<Version add="1.16.0" inline/>是否能从熔岩表面通行。默认值为`false`。
  - <DataType type="boolean" name="can_path_from_air"/>：<Version add="1.14.0" inline/>是否能从空中开始寻路。默认值为`false`。
  - <DataType type="boolean" name="can_pass_doors"/>：是否能穿过门。默认值为`true`。
  - <DataType type="boolean" name="can_open_doors"/>：是否能打开关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_open_iron_doors"/>：<Version add="1.15.0" inline/>是否能打开关闭的铁门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_break_doors"/>：<Version add="1.10.0" inline/>是否能破坏关闭的门后通过。默认值为`false`。
  - <DataType type="boolean" name="can_float"/>：<Version add="1.2.0" deprecated="1.7.0" inline/>是否能在水面上漂浮。默认值为`false`。
  - <DataType type="boolean" name="can_jump"/>：<Version add="1.16.210" inline/>是否能跳上方块。默认值为`true`。
  - <DataType type="boolean" name="can_breach"/>：<Version add="1.16.210" inline/>是否能跃出水面。默认值为`false`。
  - <DataType type="boolean" name="can_walk_in_lava"/>：<Version add="1.16.0" inline/>是否能在熔岩中行走。默认值为`false`。
  - <DataType type="boolean" name="is_amphibious"/>：<Version add="1.16.210" inline/>是否能在水下地面上行走。默认值为`false`。
  - <DataType type="boolean" name="avoid_water"/>：寻路时是否避开水面。默认值为`false`。
  - <DataType type="boolean" name="avoid_sun"/>：寻路时是否避开被阳光照射的方块。默认值为`false`。
  - <DataType type="boolean" name="avoid_portals"/>：寻路时是否避开传送门。默认值为`false`。
  - <DataType type="boolean" name="avoid_powder_snow"/>：<Version add="1.16.200" deprecated="1.16.210" inline/>寻路时是否避开细雪。
  - <DataType type="boolean" name="avoid_damage_blocks"/>：<Version add="1.16.210" inline/>寻路时是否避开会造成伤害的方块。默认值为`false`。
  - <DataType type="array" name="blocks_to_avoid"/>：<Version add="1.16.210" inline/>寻路时要避开的方块列表。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="using_door_annotation"/>：是否依据门的注解决定能否通行，需配合[`minecraft:annotation.open_door`](./functional#minecraftannotationopen_door)等组件。
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
import GiscusComment from "/src/components/comment/giscus.js"
import Button from '/src/components/button/base';

<GiscusComment/>
