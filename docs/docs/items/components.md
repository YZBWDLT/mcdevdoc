---
sidebar_position: 2
---

# 物品组件

收录所有已开放或即将开放的命名空间为`minecraft`和`netease`的物品组件信息。

:::info[本文更新时间]

本文于 2025 年 6 月 19 日更新，中国版最新版本为 1.21.0，国际版最新版本为 1.21.90。

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import treeview from '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

:::note[组件可用性提示]

- 标注了<Version isLowVersion/>的组件，代表其为**旧版国际版组件，可应用于国际版或中国版**。`format_version`必须指定`1.10.0`~`1.16.0`以内时才可使用。在中国版中使用该组件，可在国际版物品定义<FileType type="folder" name="items"/>或中国版物品定义<FileType type="folder" name="netease_items_beh"/>中定义该物品。

- 标注了<Version text="（版本号）"/>的组件，代表其为**新版国际版组件，可应用于国际版或中国版**。其中，版本号代表物品定义的`format_version`必须指定为该版本号或更高才可使用。但是，在中国版中要使用该组件，必须在国际版物品定义<FileType type="folder" name="items"/>中定义该物品，此外还要注意中国版所对应的国际版版本。

- 标注了<Version isChinaVersion/>的组件，代表其为**中国版组件，仅可应用于中国版**。并且，在中国版中要使用该组件，必须在中国版物品定义<FileType type="folder" name="netease_items_beh"/>中定义该物品。

- 标注了<Version isBeta/>的组件，代表其为**实验性玩法组件**。本文档不记载已被移除的实验性玩法组件（尤其是假日创作者功能的组件）。开发者在使用这些组件的时候应当万分小心，因为它们随时可能会被移除，这会导致你的资源的关键功能失效。

如果官方文档中有记载，以上这些标签将会链接到官方文档。

:::

---

## `minecraft:allow_off_hand`

<Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_allow_off_hand?view=minecraft-bedrock-stable"/>

允许玩家将物品放在副手。

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="minecraft:allow_off_hand"/>：根对象。
  - <DataType type="boolean" name="value"/>：是否能将物品放在副手，默认为`false`。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:allow_off_hand"/>：是否能将物品放在副手，默认为`false`。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:allow_off_hand": {
    "value": true
}
```

```json showLineNumbers
"minecraft:allow_off_hand": true
```

</TabItem>

</Tabs>

---

## `minecraft:block`

<Version isLowVersion/>

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:block_placer`](#minecraftblock_placer)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)中查看该组件接受的参数。

:::

[^1]

---

## `minecraft:block_placer`

<Version text="1.20.10+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_block_placer?view=minecraft-bedrock-stable"/>

可以在特定方块上放置特定方块。

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="minecraft:block_placer"/>：根对象
  - <DataType type="string" name="block" isRequired/>：将放置为何种方块。
  - <DataType type="boolean" name="replace_block_item"/>：是否将此物品与对应方块绑定，若绑定则当方块被破坏后将掉落该物品。备注：物品 ID 必须与对应的方块 ID 保持一致。
  - <DataType type="array" name="use_on"/>：可放置于的方块列表。如果留空，则默认为可放置于所有方块上。
    - <DataType type="string"/>：方块 ID。
    - <DataType type="object"/>：方块信息。
      - <DataType type="string" name="name"/>：方块 ID。
      - <DataType type="int"/><DataType type="string"/><DataType type="boolean" name="states"/>：方块状态。[^1]
      - <DataType type="string" name="tags"/>：方块标签。
  - <DataType type="string" name="use_on"/>（替代 1）：可放置于的方块。
  - <DataType type="object" name="use_on"/>（替代 2）：可放置于的方块。
    - <DataType type="string" name="name"/>：方块 ID。
    - <DataType type="int"/><DataType type="string"/><DataType type="boolean" name="states"/>：方块状态。[^1]
    - <DataType type="string" name="tags"/>：方块标签。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:block_placer": {
    "block": "seeds",
    "use_on": [ "dirt", "grass" ],
    "replace_block_item": true
}
```

```json showLineNumbers
"minecraft:block_placer": {
    "block": "minecraft:dirt",
    "use_on": [ "dirt", "grass", "anvil" ]
}
```

</TabItem>

</Tabs>

---

## `minecraft:bundle_interaction`

<Version text="1.21.40+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_bundle_interaction?view=minecraft-bedrock-stable"/>

为物品启用收纳袋的交互模式和物品提示。

:::warning[注意]

要使用该组件，必须先定义[`minecraft:storage_item`](#minecraftstorage_item)组件。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="minecraft:bundle_interaction"/>：根对象
  - <DataType type="int" name="num_viewable_slots"/>：定义从收纳袋顶部可访问的物品堆叠的最大数量。必须在`1`到`64`之间（含），默认值为`12`。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:bundle_interaction": {
    "num_viewable_slots": 12
}
```

</TabItem>

</Tabs>

---

## `minecraft:can_destroy_in_creative`

<Version text="1.20.10+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_can_destroy_in_creative?view=minecraft-bedrock-stable"/>

---

## `minecraft:compostable`

<Version text="1.21.60+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_compostable?view=minecraft-bedrock-stable"/>

---

## `minecraft:cooldown`

<Version text="1.20.10+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_cooldown?view=minecraft-bedrock-stable"/>

---

## `minecraft:custom_components`

<Version text="1.21.20 - 1.21.90" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_custom_components?view=minecraft-bedrock-stable"/>

---

## `minecraft:damage`

<Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_damage?view=minecraft-bedrock-stable"/>

---

## `minecraft:damage_absorption`

<Version text="1.21.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_damage_absorption?view=minecraft-bedrock-stable"/>

---

## `minecraft:digger`

<Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_digger?view=minecraft-bedrock-stable"/>

---

## `minecraft:display_name`

<Version text="1.20.0+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_display_name?view=minecraft-bedrock-stable"/>

---

## `minecraft:durability`

<Version text="1.20.0+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_durability?view=minecraft-bedrock-stable"/>

定义物品的耐久度。

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="minecraft:durability"/>：根对象。
  - <DataType type="object" name="damage_chance"/>：定义该物品有多大概率会在被使用后降低耐久度。不指定时默认为100%。
    - <DataType type="int" name="max" isRequired/>：最大有百分之多少的概率降低耐久度。
    - <DataType type="int" name="min" isRequired/>：最小有百分之多少的概率降低耐久度。
  - <DataType type="int" name="max_durability" isRequired/>：定义物品的总耐久度。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:durability": {
    "max_durability": 251
}
```

```json showLineNumbers
"minecraft:durability": {
    "damage_chance": { "min": 10, "max": 50 },
    "max_durability": 10
}
```

</TabItem>

</Tabs>

---

## `minecraft:durability_sensor`

<Version text="1.21.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_durability_sensor?view=minecraft-bedrock-stable"/>

---

## `minecraft:dyeable`

<Version text="1.21.30+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_dyeable?view=minecraft-bedrock-stable"/>

---

## `minecraft:enchantable`

<Version text="1.20.30+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_enchantable?view=minecraft-bedrock-stable"/>

---

## `minecraft:entity_placer`

<Version text="1.20.0+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_entity_placer?view=minecraft-bedrock-stable"/>

---

## `minecraft:foil`

<Version isLowVersion/>

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:glint`](#minecraftglint)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)中查看该组件接受的参数。

:::

---

## `minecraft:food`

<Version isLowVersion/> <Version text="1.20.30+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_food?view=minecraft-bedrock-stable"/>

---

## `minecraft:fuel`

<Version text="1.20.0+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_fuel?view=minecraft-bedrock-stable"/>

---

## `minecraft:glint`

<Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_glint?view=minecraft-bedrock-stable"/>

---

## `minecraft:hand_equipped`

<Version isLowVersion/> <Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_hand_equipped?view=minecraft-bedrock-stable"/>

定义该物品像工具一样直立展示在玩家手中。

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="minecraft:hand_equipped"/>：根对象
  - <DataType type="boolean" name="value"/>：是否在手中像工具一样展示物品，默认为`false`。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:hand_equipped"/>：是否在手中像工具一样展示物品，默认为`false`。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:hand_equipped": {
    "value": true
}
```

```json showLineNumbers
"minecraft:hand_equipped": true
```

</TabItem>

</Tabs>

---

## `minecraft:hover_text_color`

<Version text="（资源包）" isLowVersion/> <Version text="1.20.10+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_hover_text_color?view=minecraft-bedrock-stable"/>

:::info[资源包组件]

对于旧版国际版物品，该组件需在资源包的物品定义文件夹<FileType type="folder" name="items"/>的物品中定义。对于中国版物品，该组件需在资源包的物品定义文件夹<FileType type="folder" name="netease_items_res"/>的物品中定义。

:::

---

## `minecraft:max_damage`

<Version isLowVersion/>

定义物品的耐久度。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:durability`](#minecraftdurability)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)中查看该组件接受的参数。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="int" name="minecraft:max_damage"/>：该物品的耐久度。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:max_damage": 1000
```

</TabItem>

</Tabs>

---

## `minecraft:icon`

<Version text="（资源包）" isLowVersion/> <Version text="1.20.0+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_icon?view=minecraft-bedrock-stable"/>

定义物品的图标。

:::info[资源包组件]

对于**旧版国际版物品**，该组件需在资源包的物品定义文件夹<FileType type="folder" name="items"/>的物品中定义。

:::

:::danger[重要组件]

对于任何自定义物品，都必须定义该组件。否则，物品将无法正确展示贴图。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="minecraft:icon"/>：根对象
  - <DataType type="object" name="textures"/>：定义该物品的贴图。
    - <DataType type="string" name="default"/>：该物品的默认贴图。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[物品贴图](./texture)。

<br/>或允许简化的写法：

- <DataType type="string" name="minecraft:icon"/>：该物品的贴图。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[物品贴图](./texture)。

<br/>

:::warning[旧版本的单值写法]

在`1.20.0`~`1.20.40`格式版本下，上面的单值写法应写为下面的写法，不过在高版本下，这种写法已经弃用。

- <DataType type="object" name="minecraft:icon"/>：根对象
  - <DataType type="string" name="texture"/>：该物品的贴图Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[物品贴图](./texture)。

:::

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:icon": {
    "textures": {
        "default": "apple"
    }
}
```

```json showLineNumbers
"minecraft:icon": "apple"
```

</TabItem>

</Tabs>

---

## `minecraft:interact_button`

<Version text="1.20.30+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_interact_button?view=minecraft-bedrock-stable"/>

---

## `minecraft:liquid_clipped`

<Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_liquid_clipped?view=minecraft-bedrock-stable"/>

---

## `minecraft:max_stack_size`

<Version isLowVersion/> <Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_max_stack_size?view=minecraft-bedrock-stable"/>

---

## `minecraft:projectile`

<Version isLowVersion/> <Version text="1.20.10+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_projectile?view=minecraft-bedrock-stable"/>

---

## `minecraft:rarity`

<Version text="1.21.30+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_rarity?view=minecraft-bedrock-stable"/>

---

## `minecraft:record`

<Version text="1.20.10+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_record?view=minecraft-bedrock-stable"/>

---

## `minecraft:repairable`

<Version text="1.20.10+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_repairable?view=minecraft-bedrock-stable"/>

---

## `minecraft:shooter`

<Version text="1.20.10+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_shooter?view=minecraft-bedrock-stable"/>

---

## `minecraft:should_despawn`

<Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_should_despawn?view=minecraft-bedrock-stable"/>

---

## `minecraft:seed`

<Version isLowVersion/>

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:block_placer`](#minecraftblock_placer)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)中查看该组件接受的参数。

:::

---

## `minecraft:stacked_by_data`

<Version isLowVersion/> <Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_stacked_by_data?view=minecraft-bedrock-stable"/>

---

## `minecraft:storage_item`

<Version text="1.21.40+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_storage_item?view=minecraft-bedrock-stable"/>

---

## `minecraft:storage_weight_limit`

<Version text="1.21.60+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_storage_weight_limit?view=minecraft-bedrock-stable"/>

---

## `minecraft:storage_weight_modifier`

<Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_storage_weight_modifier?view=minecraft-bedrock-stable"/>

---

## `minecraft:tags`

<Version text="1.20.50+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_tags?view=minecraft-bedrock-stable"/>

---

## `minecraft:throwable`

<Version text="1.20.10+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_throwable?view=minecraft-bedrock-stable"/>

---

## `minecraft:use_animation`

<Version text="（资源包）" isLowVersion/> <Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_use_animation?view=minecraft-bedrock-stable"/>

:::info[资源包组件]

对于旧版国际版物品，该组件需在资源包的物品定义文件夹<FileType type="folder" name="items"/>的物品中定义。对于中国版物品，该组件需在资源包的物品定义文件夹<FileType type="folder" name="netease_items_res"/>的物品中定义。

:::

---

## `minecraft:use_duration`

<Version isLowVersion/> <Version text="1.20.20 - 1.20.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_use_duration?view=minecraft-bedrock-stable"/>

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:use_modifiers`](#minecraftuse_modifiers)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)中查看该组件接受的参数。

:::

定义该物品的使用时长。

:::warning[注意]

要使用该组件，必须同时定义下列组件中的 1 个：

- [`minecraft:food`](#minecraftfood)
- [`minecraft:shooter`](#minecraftshooter)
- [`minecraft:throwable`](#minecraftthrowable)

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="int" name="minecraft:use_duration"/>（旧版国际版物品或中国版物品）：该物品的使用时长。单位为游戏刻，默认值为`32`。
- <DataType type="float" name="minecraft:use_duration"/>（新版国际版物品）：该物品的使用时长。单位为秒，默认值为`1.6`。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:use_duration": 32
```

注意：下面的类型仅限在新版（格式版本`1.20.20`-`1.20.40`）可用，在旧版国际版物品中，这样写会报错。

```json showLineNumbers
"minecraft:use_duration": 1.6
```

</TabItem>

</Tabs>

---

## `minecraft:use_modifiers`

<Version text="1.20.50+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_use_modifiers?view=minecraft-bedrock-stable"/>

定义该物品的使用时长。

:::warning[注意]

要使用该组件，必须同时定义下列组件中的 1 个：

- [`minecraft:food`](#minecraftfood)
- [`minecraft:shooter`](#minecraftshooter)
- [`minecraft:throwable`](#minecraftthrowable)

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="minecraft:use_modifiers"/>：根对象。
  - <DataType type="float" name="use_duration" isRequired/>：使用时长。例如苹果的该值为`1.6`。
  - <DataType type="float" name="movement_modifier" isRequired/>：定义玩家使用物品时的速度倍率，必须小于等于`1`。例如苹果的该值为`0.35`。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:use_modifiers": {
    "use_duration": 1.6,
    "movement_modifier": 0.35
}
```

```json showLineNumbers
"minecraft:use_modifiers": {
    "use_duration": 3
}
```

</TabItem>

</Tabs>

---

## `minecraft:wearable`

<Version text="1.20.20+" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_wearable?view=minecraft-bedrock-stable"/>

---

## `netease:allow_offhand`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-allow-offhand" isChinaVersion/>

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:allow_off_hand`](#minecraftallow_off_hand)替代，但需要在国际版物品定义文件夹<FileType type="folder" name="items"/>中进行物品定义。

:::

---

## `netease:armor`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-armor" isChinaVersion/>

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:wearable`](#minecraftwearable)和[`minecraft:enchantable`](#minecraftenchantable)替代，但需要在国际版物品定义文件夹<FileType type="folder" name="items"/>中进行物品定义。

:::

---

## `netease:bucket`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-bucket" isChinaVersion/>

---

## `netease:compostable`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-compostable" isChinaVersion/>

:::note[国际版组件替代]

该组件可用国际版新版组件[`minecraft:compostable`](#minecraftcompostable)替代，但目前中国版尚未达到国际版对应组件所需求的版本。

:::

---

## `netease:cooldown`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-cooldown" isChinaVersion/>

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:cooldown`](#minecraftcooldown)替代，但需要在国际版物品定义文件夹<FileType type="folder" name="items"/>中进行物品定义。

:::

---

## `netease:customtips`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-customtips" isChinaVersion/>

---

## `netease:egg`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-egg" isChinaVersion/>

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:entity_placer`](#minecraftentity_placer)替代，但需要在国际版物品定义文件夹<FileType type="folder" name="items"/>中进行物品定义。

:::

---

## `netease:enchant_material`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-enchant-material" isChinaVersion/>

---

## `netease:fire_resistant`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-fire-resistant" isChinaVersion/>

---

## `netease:frame_anim_in_scene`

<Version text="（资源包）" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-frame-anim-in-scene" isChinaVersion/>

:::info[资源包组件]

该组件需在资源包的物品定义文件夹<FileType type="folder" name="netease_items_res"/>中定义。

:::

---

## `netease:frame_animation`

<Version text="（资源包）" docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-frame-animation" isChinaVersion/>

:::info[资源包组件]

该组件需在资源包的物品定义文件夹<FileType type="folder" name="netease_items_res"/>中定义。

:::

---

## `netease:fuel`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-fuel" isChinaVersion/>

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:fuel`](#minecraftfuel)替代，但需要在国际版物品定义文件夹<FileType type="folder" name="items"/>中进行物品定义。

:::

---

## `netease:initial_user_data`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-initial-user-data" isChinaVersion/>

---

## `netease:projectile`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-projectile" isChinaVersion/>

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:projectile`](#minecraftprojectile)替代，但需要在国际版物品定义文件夹<FileType type="folder" name="items"/>中进行物品定义。

:::

---

## `netease:render_offsets`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-render-offsets" isChinaVersion/>

定义该物品在右手时的渲染偏移。

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="netease:render_offsets"/>：根对象
  - <DataType type="array" name="controller_position_adjust"/>：物品位置偏移。
    - <DataType type="float"/>0：X 轴偏移，默认值为`0.0`。
    - <DataType type="float"/>1：Y 轴偏移，默认值为`0.0`。
    - <DataType type="float"/>2：Z 轴偏移，默认值为`0.0`。
  - <DataType type="array" name="controller_rotation_adjust"/>：物品旋转偏移。
    - <DataType type="float"/>0：X 轴偏移，默认值为`0.0`。
    - <DataType type="float"/>1：Y 轴偏移，默认值为`0.0`。
    - <DataType type="float"/>2：Z 轴偏移，默认值为`0.0`。
  - <DataType type="float" name="controller_scale"/>：物品大小。默认值为`1.0`。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:render_offsets": {
    "controller_position_adjust": [0.0, 0.1, 0.0],
    "controller_rotation_adjust": [0.0, -45.0, 0.0],
    "controller_scale": 1
},

```

</TabItem>

</Tabs>

---

## `netease:shield`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-shield" isChinaVersion/>

定义该物品为盾。

:::warning[注意]

要使用该组件，需在物品描述中将`custom_item_type`设置为`shield`。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="netease:shield"/>：根对象
  - <DataType type="array" name="defence_damage_source_list"/>：防御的伤害类型。为空时默认设置为原版的格挡伤害逻辑。
    - <DataType type="string"/>：伤害类型。可见`/damage`命令的可用伤害类型。
  - <DataType type="array" name="undefence_damage_source_list"/>：不防御的伤害类型。不宜和`defence_damage_source_list`存在相同元素。
    - <DataType type="string"/>：伤害类型。可见`/damage`命令的可用伤害类型。
  - <DataType type="boolean" name="is_consume_damage"/>：是否消耗物品的耐久度。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:shield":{
    "defence_damage_source_list": [ "drowning" ],
    "undefence_damage_source_list": [ "entity_attack" ],
    "is_consume_damage": false
}
```

</TabItem>

</Tabs>

---

## `netease:show_in_hand`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-show-in-hand" isChinaVersion/>

手持时是否显示该物品。

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="netease:show_in_hand"/>：根对象
  - <DataType type="boolean" name="value" isRequired/>：手持时是否显示该物品。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:show_in_hand": {
    "value": true
}
```

</TabItem>

</Tabs>

---

## `netease:weapon`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-weapon" isChinaVersion/>

定义该物品为武器。

:::info[国际版组件替代]

该组件**部分**可用国际版新版组件[`minecraft:damage`](#minecraftdamage)、[`minecraft:enchantable`](#minecraftenchantable)和[`minecraft:digger`](#minecraftdigger)替代，但需要在国际版物品定义文件夹<FileType type="folder" name="items"/>中进行物品定义。

:::

:::warning[注意]

要使用该组件，需在物品描述中将`custom_item_type`设置为`weapon`。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<div class="treeview">

- <DataType type="object" name="netease:weapon"/>：根对象
  - <DataType type="string" name="type" isRequired/>：武器或工具类型，可选值：`"sword"`、`"shovel"`、`"pickaxe"`、`"hatchet"`（斧头）、`"hoe"`。
  - <DataType type="int" name="level" isRequired/>：武器或工具的挖掘等级，可选值：`0`（木制或金制工具）、`1`（石制工具）、`2`（铁制工具）、`3`（钻制工具）。详见[网易提供的官方文档](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/2-自定义武器及工具.html#网易components)。
  - <DataType type="int" name="speed"/>：武器或工具挖掘方块的基础速度。默认值为`0`。
  - <DataType type="int" name="attack_damage"/>：武器或工具的攻击伤害。默认值为`0`。
  - <DataType type="int" name="enchantment"/>：武器或工具的附魔能力。默认值为`0`。

</div>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:weapon": {
    "type": "sword",
    "level": 3,
    "speed": 8,
    "attack_damage": 7,
    "enchantment": 10
}
```

</TabItem>

</Tabs>

[^1]: 缺少资料，有待验证。
