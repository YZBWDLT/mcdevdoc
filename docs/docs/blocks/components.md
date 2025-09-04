---
sidebar_position: 2
---

# 方块组件

收录所有已开放或即将开放的命名空间为`minecraft`和`netease`的方块组件信息。

你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

:::info[本文更新时间]

本文于 2025 年 9 月 3 日更新，中国版最新版本为 1.21.0，国际版最新版本为 1.21.100。

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

:::note[组件可用性提示]

1. 标签记号说明：

    - 标注了<Version isLowVersion/>的组件，代表其为**旧版国际版组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。`format_version`必须指定`1.10.0`~`1.16.0`以内时才可使用。

    - 标注了<Version version="版本号"/>的组件，代表其为**新版国际版组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。其中，`（版本号）`代表方块定义的`format_version`必须指定为该版本号或更高才可使用。

    - 标注了<Version isChinaVersion/>的组件，代表其为**中国版组件**，可应用于**中国版方块定义**（在行为包<FileType type="folder" name="netease_blocks"/>定义的方块）。

    - 标注了<Version isBeta/>的组件，代表其为**实验性玩法组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。本文档不记载已被移除的实验性玩法组件（尤其是假日创作者功能的组件）。开发者在使用这些组件的时候应当万分小心，因为它们随时可能会被移除，这会导致你的资源的关键功能失效。

    - **注意：中国版可以同时使用国际版方块定义和中国版方块定义，但是国际版只能使用国际版方块定义**。

2. 如果官方文档中有记载，以上这些标签将会链接到官方文档，读者可点击以查看对应文档。

:::

---

## `minecraft:block_light_absorption`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-block-light-absorption" isChinaVersion />

定义方块会吸收光，降低光照等级。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:light_dampening`](#minecraftlight_dampening)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)中查看该组件接受的参数。

:::

<Tabs><TabItem value="parameter" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:block_light_absorption"/>：根对象
  - <DataType type="int" name="value"/>：定义方块会吸收多少光照等级（也可以代表其透光度）。应在`0`-`15`之间（含），如不指定该组件则指定该方块不透光。
</treeview>

**格式版本 1.16.X**：

<treeview>
- <DataType type="int" name="minecraft:block_light_absorption"/>：定义方块会吸收多少光照等级（也可以代表其透光度）。应在`0`-`15`之间（含），如不指定该组件则指定该方块不透光。
</treeview>

</TabItem><TabItem value="example" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:block_light_absorption": {
    "value": 3
}
```

**格式版本 1.16.X**：

```json showLineNumbers
"minecraft:block_light_absorption": 3
```

</TabItem></Tabs>

---

## `minecraft:block_light_emission`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-block-light-emission" isChinaVersion />

定义方块会发出光，提供光照等级。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:light_emission`](#minecraftlight_emission)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)中查看该组件接受的参数。

:::

<Tabs><TabItem value="parameter" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:block_light_emission"/>：根对象
  - <DataType type="float" name="emission"/>：定义方块发出的光照强度。应在`0.0`-`1.0`之间（含），如不指定该组件则指定该方块不发光。
</treeview>

**格式版本 1.16.X**：

<treeview>
- <DataType type="float" name="minecraft:block_light_emission"/>：定义方块发出的光照强度。应在`0.0`-`1.0`之间（含），如不指定该组件则指定该方块不发光。
</treeview>

> 嗯对，你没看错，是[0.0, 1.0]，不是[0, 15]，例如 1.0 代表 15 的光照强度。注意别写错了哦。

</TabItem><TabItem value="example" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:block_light_emission": {
    "emission": 1.0
}
```

**格式版本 1.16.X**：

```json showLineNumbers
"minecraft:block_light_emission": 1.0
```

</TabItem></Tabs>

---

## `minecraft:collision_box`

<Version version="1.19.50" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_collision_box?view=minecraft-bedrock-stable"/>

定义方块的碰撞箱。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:crafting_table`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_crafting_table?view=minecraft-bedrock-stable"/>

定义方块为一种工作台。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:custom_components`

<Version version="1.21.20 - 1.21.90" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_custom_components?view=minecraft-bedrock-stable"/>

定义方块的自定义组件。自定义组件的行为需要在世界初始化前事件`WorldInitializeBeforeEvent`中定义。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:destroy_time`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-destroy-time" isChinaVersion />

定义方块的挖掘时长。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:destructible_by_mining`](#minecraftdestructible_by_mining)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)中查看该组件接受的参数。

:::

<Tabs><TabItem value="parameter" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:destroy_time"/>：根对象
  - <DataType type="float" name="value"/>：定义方块的*破坏时长*。
</treeview>

**格式版本 1.16.X**：

<treeview>
- <DataType type="float" name="minecraft:destroy_time"/>：定义方块的*破坏时长*。
</treeview>

> **注意**：这里的*破坏时长*实际上为[**硬度**](https://zh.minecraft.wiki/w/挖掘#方块硬度)的概念。在一般情况下，破坏时长（秒）是硬度的 1.5 倍，比如硬度为 1 时，需要 1.5 秒破坏。

</TabItem><TabItem value="example" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:destroy_time": {
    "value": 1.0
}
```

**格式版本 1.16.X**：

```json showLineNumbers
"minecraft:destroy_time": 1.0
```

</TabItem></Tabs>

---

## `minecraft:destructible_by_explosion`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_destructible_by_explosion?view=minecraft-bedrock-stable"/>

定义方块是否可被爆炸破坏，及其爆炸抗性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:destructible_by_mining`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_destructible_by_mining?view=minecraft-bedrock-stable"/>

定义方块是否可被挖掘，及其挖掘时长。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:destruction_particles`

<Version version="1.21.70" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_destruction_particles?view=minecraft-bedrock-stable"/>

定义方块被破坏后掉落的粒子。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:display_name`

<Version version="1.19.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_display_name?view=minecraft-bedrock-stable"/>

定义方块在物品栏的悬浮文本。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:embedded_visual`

<Version version="1.21.110" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_embedded_visual?view=minecraft-bedrock-stable" isBeta/>

定义了方块嵌入另一方块（如花盆）时需要使用的`geometry`和`​material_instances`。

:::danger[警告]

要使用该组件，必须启用“即将到来的创作者功能”实验性玩法。需要注意：启用实验性玩法可能会导致游戏不稳定，并且正在实验性玩法的组件有可能会在后续的版本中被移除。

:::

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:entity_fall_on`

<Version version="1.21.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_entity_fall_on?view=minecraft-bedrock-stable"/>

定义实体在多高处落到该方块上之后，才能触发 ScriptAPI 中自定义方块组件定义的`onEntityFallOn`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:explosion_resistance`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-explosion-resistance" isChinaVersion />

定义方块的爆炸抗性。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:destructible_by_explosion`](#minecraftdestructible_by_explosion)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)中查看该组件接受的参数。

:::

<Tabs><TabItem value="parameter" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:explosion_resistance"/>：根对象
  - <DataType type="float" name="value"/>：定义方块的爆炸抗性。
</treeview>

**格式版本 1.16.X**：

<treeview>
- <DataType type="float" name="minecraft:explosion_resistance"/>：定义方块的爆炸抗性。
</treeview>

</TabItem><TabItem value="example" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:explosion_resistance": {
    "value": 1.0
}
```

**格式版本 1.16.X**：

```json showLineNumbers
"minecraft:explosion_resistance": 1.0
```

</TabItem></Tabs>

---

## `minecraft:flammable`

<Version isLowVersion/> <Version version="1.19.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_flammable?view=minecraft-bedrock-stable"/>

定义方块为可燃方块。

<Tabs><TabItem value="parameter" label="参数" default>

**格式版本 1.16.X 及更低**：

<treeview>
- <DataType type="object" name="minecraft:flammable"/>：根对象
  - <DataType type="int" name="burn_odds"/>：定义方块在燃烧时有多大可能被烧毁。
  - <DataType type="int" name="flame_odds"/>：定义方块有多大可能被点燃。
</treeview>

**格式版本 1.19.10 及更高（布尔型）**：

<treeview>
- <DataType type="boolean" name="minecraft:flammable"/>：定义方块是否可燃。指定为`true`时将使用默认值。
</treeview>

**格式版本 1.19.10 及更高（对象型）**：

<treeview>
- <DataType type="object" name="minecraft:flammable"/>：根对象。
  - <DataType type="int" name="catch_chance_modifier"/>：定义方块有多大可能被点燃。默认值为`5`（木板）。
  - <DataType type="int" name="destroy_chance_modifier"/>：定义方块在燃烧时有多大可能被烧毁。默认值为`20`（木板）。
</treeview>

</TabItem><TabItem value="example" label="示例">

**格式版本 1.16.X 及更低**：

```json showLineNumbers
"minecraft:flammable": {
    "burn_odds": 5,
    "flame_odds": 20
}
```

**格式版本 1.19.10 及更高（布尔型）**：

```json showLineNumbers
"minecraft:flammable": true
```

**格式版本 1.19.10 及更高（对象型）**：

```json showLineNumbers
"minecraft:flammable": {
    "catch_chance_modifier": 5,
    "destroy_chance_modifier": 20
}
```

</TabItem></Tabs>

---

## `minecraft:flower_pottable`

<Version version="1.21.110" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_flower_pottable?view=minecraft-bedrock-stable" isBeta/>

定义方块为一种花盆。

:::danger[警告]

要使用该组件，必须启用“即将到来的创作者功能”实验性玩法。需要注意：启用实验性玩法可能会导致游戏不稳定，并且正在实验性玩法的组件有可能会在后续的版本中被移除。

:::

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:friction`

<Version isLowVersion/> <Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_friction?view=minecraft-bedrock-stable"/>

定义方块的摩擦系数。

<Tabs><TabItem value="parameter" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:friction"/>：根对象
  - <DataType type="int" name="value"/>：定义方块的摩擦系数。摩擦系数越低则方块越光滑。应在`0.0`-`0.9`之间（含）。
</treeview>

**格式版本 1.16.X 或 1.19.20 及更高**：

<treeview>
- <DataType type="int" name="minecraft:friction"/>：定义方块的摩擦系数。摩擦系数越低则方块越光滑。应在`0.0`-`0.9`之间（含）。
</treeview>

</TabItem><TabItem value="example" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:friction": {
    "value": 0.4
}
```

**格式版本 1.16.X 或 1.19.20 及更高**：

```json showLineNumbers
"minecraft:friction": 0.4
```

</TabItem></Tabs>

---

## `minecraft:geometry`

<Version version="1.21.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_geometry?view=minecraft-bedrock-stable"/>

定义方块的模型。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:item_visual`

<Version version="1.21.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_item_visual?view=minecraft-bedrock-stable"/>

定义方块在物品栏中的外观。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:light_dampening`

<Version version="1.19.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_light_dampening?view=minecraft-bedrock-stable"/>

定义方块会吸收光，降低光照等级。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:light_emission`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_light_emission?view=minecraft-bedrock-stable"/>

定义方块会发出光，提供光照等级。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:liquid_detection`

<Version version="1.21.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_liquid_detection?view=minecraft-bedrock-stable"/>

定义方块在接触到液体后的行为。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:loot`

<Version isLowVersion/> <Version docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_loot?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-loot" isChinaVersion />

定义方块被破坏后的战利品表。

<Tabs><TabItem value="parameter" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:loot"/>：根对象
  - <DataType type="string" name="table"/>：定义方块使用的战利品表，需带有`loot_tables/`和`.json`后缀。
</treeview>

**格式版本 1.16.X 及更高**：

<treeview>
- <DataType type="string" name="minecraft:loot"/>：定义方块使用的战利品表，需带有`loot_tables/`和`.json`后缀。
</treeview>

</TabItem><TabItem value="example" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:loot": {
    "table": "loot_tables/blocks/my_custom_block.json"
}
```

**格式版本 1.16.X 及更高**：

```json showLineNumbers
"minecraft:loot": "loot_tables/blocks/my_custom_block.json"
```

</TabItem></Tabs>

---

## `minecraft:max_stack_size`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-max-stack-size" isChinaVersion />

定义方块物品最大堆叠数量。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:map_color`

<Version isLowVersion/> <Version docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_map_color?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-map-color" isChinaVersion />

定义方块在地图（物品）上显示的颜色。

<Tabs><TabItem value="parameter" label="参数" default>

**格式版本 1.16.0 以前**：

<treeview>
- <DataType type="object" name="minecraft:map_color"/>：根对象
  - <DataType type="string" name="color"/>：定义方块在地图物品上显示的颜色，应为颜色代码`#RRGGBB`。
</treeview>

**格式版本 1.16.X 及更高**：

<treeview>
- <DataType type="string" name="minecraft:map_color"/>：定义方块在地图物品上显示的颜色，应为颜色代码`#RRGGBB`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**格式版本 1.16.0 以前**：

```json showLineNumbers
"minecraft:map_color": {
    "color": "#FFFFFF"
}
```

**格式版本 1.16.X 及更高**：

```json showLineNumbers
"minecraft:map_color": "#FFFFFF"
```

</TabItem></Tabs>

---

## `minecraft:material_instances`

<Version version="1.19.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_material_instances?view=minecraft-bedrock-stable"/>

定义方块的材质实例。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:movable`

<Version version="1.21.100" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_movable?view=minecraft-bedrock-stable"/>

定义方块是否可被活塞推动，及其属性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:placement_filter`

<Version version="1.19.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_placement_filter?view=minecraft-bedrock-stable"/>

定义方块允许被放置或允许存在的条件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:random_offset`

<Version version="1.21.100" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_random_offset?view=minecraft-bedrock-stable"/>

定义方块的贴图如何随机产生偏移。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:redstone_conductivity`

<Version version="1.21.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_redstone_conductivity?view=minecraft-bedrock-stable"/>

定义方块的红石导体属性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:redstone_producer`

<Version version="1.21.110" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_redstone_producer?view=minecraft-bedrock-stable" isBeta/>

定义方块产生红石信号。[^1]

:::danger[警告]

要使用该组件，必须启用“即将到来的创作者功能”实验性玩法。需要注意：启用实验性玩法可能会导致游戏不稳定，并且正在实验性玩法的组件有可能会在后续的版本中被移除。

:::

[^1]: 该组件于 1.21.110.25 加入，然而更新日志中并未提到该组件的参数信息和作用，需要验证。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:replaceable`

<Version version="1.21.70" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_replaceable?view=minecraft-bedrock-stable"/>

定义方块是否可被另一种方块在原位替代（类似于水、草丛或空气）。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:selection_box`

<Version version="1.19.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_selection_box?view=minecraft-bedrock-stable"/>

定义方块的选择箱。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `tag:(标签)`

<Version version="?" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_tag?view=minecraft-bedrock-stable"/>

定义方块的标签。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:tick`

<Version version="1.21.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_tick?view=minecraft-bedrock-stable"/>

定义方块的更新频率，并触发 ScriptAPI 中自定义方块组件定义的`onTick`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `minecraft:transformation`

<Version version="1.21.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_transformation?view=minecraft-bedrock-stable"/>

定义方块的平移、旋转、缩放变换。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:aabb`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-aabb" isChinaVersion />

定义方块的碰撞箱。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:block_animate_random_tick`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-animate-random-tick" isChinaVersion />

定义方块会高频率随机更新，并触发 ModAPI 的`BlockAnimateRandomTickEvent`。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:block_chest`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-chest" isChinaVersion />

定义方块的箱子功能。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:block_container`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-container" isChinaVersion />

定义方块为一种自定义容器。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:block_crafting_table`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/10-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B7%A5%E4%BD%9C%E5%8F%B0.html?catalog=1" isChinaVersion />

定义方块为一种自定义工作台。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:block_entity`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-entity" isChinaVersion />

定义方块的方块实体属性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:block_properties`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-properties" isChinaVersion />

定义方块的属性。

:::note[编者注]

这里的方块属性不等于方块状态，请注意在这里不要混淆概念。

:::

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:block_random_offset`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-random-offset" isChinaVersion />

定义方块的偏移（类似于花）。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:can_built_over`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/9-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E9%9B%AA%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块是否可被另一种方块在原位替代（类似于水、草丛或空气）。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:connection`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-connection" isChinaVersion />

定义方块的连接属性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:custom_tips`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-custom-tips" isChinaVersion />

定义方块物品的物品信息描述。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:face_directional`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-face-directional" isChinaVersion />

定义方块的多面向功能。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:fall`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/6-%E8%87%AA%E5%AE%9A%E4%B9%89%E9%87%8D%E5%8A%9B%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块为重力方块，会受到重力的影响（类似于沙子）。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:fire_resistant`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-fire-resistant" isChinaVersion />

定义方块的防火属性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:fuel`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-fuel" isChinaVersion />

定义方块对应物品的燃料属性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:liquid`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/5-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B5%81%E4%BD%93.html?catalog=1" isChinaVersion />

定义方块为一种自定义流体。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:listen_block_remove`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-listen-block-remove" isChinaVersion />

定义方块在被移除后会触发 ModAPI 的`BlockRemoveServerEvent`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:may_place_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-may-place-on" isChinaVersion />

定义方块允许被放置或允许存在的条件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:mob_spawner`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/1-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%B7%E6%80%AA%E7%AE%B1.html?catalog=1" isChinaVersion />

定义方块为一种自定义刷怪笼。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:neighborchanged_sendto_script`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-neighborchanged-sendto-script" isChinaVersion />

定义方块在周围环境变化时，触发 ModAPI 的`BlockNeighborChangedServerEvent`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:no_crop_face_block`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-no-crop-face-block" isChinaVersion />

定义方块与其他方块的相邻面能够正常渲染（类似于树叶）。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:on_after_fall_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-after-fall-on" isChinaVersion />

定义实体刚掉落到该方块上的时候是否触发 ModAPI 的`OnAfterFallOnBlockClientEvent`和`OnAfterFallOnBlockServerEvent`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:on_before_fall_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-before-fall-on" isChinaVersion />

定义实体刚掉落到该方块上的时候是否触发 ModAPI 的`OnBeforeFallOnBlockServerEvent`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:on_entity_inside`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-entity-inside" isChinaVersion />

定义实体碰撞箱内有实体的时候是否触发 ModAPI 的`OnEntityInsideBlockClientEvent`和`OnEntityInsideBlockServerEvent`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:on_stand_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-stand-on" isChinaVersion />

定义当实体站在该方块后是否触发 ModAPI 的`OnStandOnBlockClientEvent`和`OnStandOnBlockServerEvent`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:on_step_off`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-step-off" isChinaVersion />

定义当实体移动至该方块上后是否触发 ModAPI 的`StepOffBlockClientEvent`和`StepOffBlockServerEvent`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:on_step_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-step-on" isChinaVersion />

定义当实体离开该方块上后是否触发 ModAPI 的`StepOnBlockClientEvent`和`StepOnBlockServerEvent`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:pathable`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-pathable" isChinaVersion />

定义方块在实体 AI 寻路时是否被认作为障碍物。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:portal`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BC%A0%E9%80%81%E9%97%A8%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块为一种自定义传送门。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:random_tick`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-random-tick" isChinaVersion />

定义方块会随机更新，并触发 ModAPI 的`BlockRandomTickServerEvent`事件。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:redstone`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-redstone" isChinaVersion />

定义方块的红石电源元件或红石机械元件属性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:redstone_property`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-redstone-property" isChinaVersion />

定义方块的红石属性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:render_layer`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-render-layer" isChinaVersion />

定义方块渲染材质。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:snow_recover_able`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/9-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E9%9B%AA%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块是否可含雪（类似矮草丛、花等）。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:solid`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-solid" isChinaVersion />

定义方块是否实心。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:tier`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-tier" isChinaVersion />

定义方块的挖掘等级和挖掘相关属性。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:transform`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/3-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%9C%E4%BD%9C%E7%89%A9%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块的转换条件。用于自定义农作物。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:water_flow_source`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块在水源或水流中表现为含水方块。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:water_destroy`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块会被水流摧毁，且无法放置在水中（类似红石粉、火把等）。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:water_only`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块只能放置在水中（类似海带、海草等）。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

---

## `netease:water_source`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块在水源中表现为含水方块（类似台阶、楼梯等）。

<Tabs><TabItem value="parameter" label="参数" default>

</TabItem><TabItem value="example" label="示例">

</TabItem></Tabs>

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [方块组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/blockcomponentslist?view=minecraft-bedrock-stable)
- [JSON 组件 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1)
- [方块文档 | 1.16.20.3 | bedrock.dev](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)
- [方块组件 | Bedrock Wki](https://wiki.bedrock.dev/blocks/block-components)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
