---
sidebar_position: 2
---

# 物品组件

收录所有已开放或即将开放的命名空间为`minecraft`和`netease`的物品组件信息。

你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

:::info[本文更新时间]

本文于 2025 年 6 月 26 日更新，中国版最新版本为 1.21.0，国际版最新版本为 1.21.90。

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

:::note[组件可用性提示]

1. 标签记号说明：

    - 标注了<Version isLowVersion/>的组件，代表其为**旧版国际版组件**，可应用于**国际版物品定义**（在行为包<FileType type="folder" name="items"/>和资源包<FileType type="folder" name="items"/>定义的物品）。`format_version`必须指定`1.10.0`~`1.16.0`以内时才可使用。

    - 标注了<Version version="版本号"/>的组件，代表其为**新版国际版组件**，可应用于**国际版物品定义**（在行为包<FileType type="folder" name="items"/>定义的物品）。其中，`（版本号）`代表物品定义的`format_version`必须指定为该版本号或更高才可使用。

    - 标注了<Version isChinaVersion/>的组件，代表其为**中国版组件**，可应用于**中国版物品定义**（在行为包<FileType type="folder" name="netease_items_beh"/>和资源包<FileType type="folder" name="netease_items_res"/>定义的物品）。

    - 标注了<Version isBeta/>的组件，代表其为**实验性玩法组件**，可应用于**国际版物品定义**（在行为包<FileType type="folder" name="items"/>定义的物品）。本文档不记载已被移除的实验性玩法组件（尤其是假日创作者功能的组件）。开发者在使用这些组件的时候应当万分小心，因为它们随时可能会被移除，这会导致你的资源的关键功能失效。

    - **注意：中国版可以同时使用国际版物品定义和中国版物品定义，但是国际版只能使用国际版物品定义**。

2. 标注了<Version isRP isLowVersion/>或<Version isRP isChinaVersion/>的组件，需要在其资源包定义中使用（即资源包<FileType type="folder" name="items"/>或资源包<FileType type="folder" name="netease_items_res"/>），未特殊标注的组件为行为包组件。

3. 如果官方文档中有记载，以上这些标签将会链接到官方文档。

:::

---

## `minecraft:allow_off_hand`

<Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_allow_off_hand?view=minecraft-bedrock-stable"/>

允许玩家将物品放在副手。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:allow_off_hand"/>：根对象。
  - <DataType type="boolean" name="value"/>：是否能将物品放在副手，默认为`false`。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:allow_off_hand"/>：是否能将物品放在副手，默认为`false`。

</treeview>

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

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="string" name="minecraft:block"/>：将放置为何种方块。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:block": "minecraft:camera"
```

</TabItem>

</Tabs>

---

## `minecraft:block_placer`

<Version version="1.20.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_block_placer?view=minecraft-bedrock-stable"/>

可以在特定方块上放置特定方块。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:block_placer"/>：根对象
  - <DataType type="string" name="block" isRequired/>：将放置为何种方块。
  - <DataType type="boolean" name="replace_block_item"/>：是否将此物品与对应方块绑定，若绑定则当方块被破坏后将掉落该物品。备注：物品 ID 必须与对应的方块 ID 保持一致。
  - <DataType type="array" name="use_on"/>：可放置于的方块列表。如果留空，则默认为可放置于所有方块上。
    - <DataType type="string"/>：方块 ID。

</treeview>

更完整的用法请查阅官方文档。

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

<Version version="1.21.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_bundle_interaction?view=minecraft-bedrock-stable"/>

为物品启用收纳袋的交互模式和物品提示。

:::warning[注意]

要使用该组件，必须先定义[`minecraft:storage_item`](#minecraftstorage_item)组件。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:bundle_interaction"/>：根对象
  - <DataType type="int" name="num_viewable_slots"/>：定义从收纳袋顶部可访问的物品堆叠的最大数量。必须在`1`到`64`之间（含），默认值为`12`。

</treeview>

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

<Version version="1.20.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_can_destroy_in_creative?view=minecraft-bedrock-stable"/>

允许玩家在创造模式下手持该物品时可以破坏方块。如果设置为`false`，该物品就会像剑一样手持时无法破坏方块。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:can_destroy_in_creative"/>：根对象。
  - <DataType type="boolean" name="value"/>：是否允许玩家在创造模式下手持该物品时破坏方块，默认为`true`。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:can_destroy_in_creative"/>：是否允许玩家在创造模式下手持该物品时破坏方块，默认为`true`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:can_destroy_in_creative": {
    "value": false
}
```

```json showLineNumbers
"minecraft:can_destroy_in_creative": false
```

</TabItem>

</Tabs>

---

## `minecraft:compostable`

<Version version="1.21.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_compostable?view=minecraft-bedrock-stable"/>

定义物品可在堆肥桶中用于堆肥。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:compostable"/>：根对象。
  - <DataType type="float" name="composting_chance" isRequired/>：有百分之多少的概率会堆肥成功。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:compostable": {
    "composting_chance": 50
}
```

</TabItem>

</Tabs>

---

## `minecraft:cooldown`

<Version version="1.20.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_cooldown?view=minecraft-bedrock-stable"/>

定义物品使用后的冷却。

:::warning[注意]

要使用该组件，必须同时定义下面的组件：

- [`minecraft:use_modifiers`](#minecraftuse_modifiers)（`1.20.50`或更高格式版本）
- [`minecraft:use_duration`](#minecraftuse_duration)（`1.20.30`-`1.20.40`格式版本）

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:cooldown"/>：根对象。
  - <DataType type="string" name="category"/>：冷却类型，共享同种冷却类型的物品将会一起进入冷却阶段。
  - <DataType type="float" name="duration"/>：冷却时间，单位为秒。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:cooldown": {
    "category": "attack",
    "duration": 1.5
}
```

</TabItem>

</Tabs>

---

## `minecraft:custom_components`

<Version version="1.21.20 - 1.21.90" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_custom_components?view=minecraft-bedrock-stable"/>

定义物品的自定义组件。自定义组件的行为需要在世界初始化前事件`WorldInitializeBeforeEvent`中定义。

:::warning[注意]

1. 该组件必须配合 ScriptAPI 使用，因此该组件在现在或未来的中国版也是无效的。
2. 该组件随着 1.21.90 的自定义组件 V2 的推出，已被弃用。在`1.21.90`或更高版本下的物品定义中不应再使用该组件。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="array" name="minecraft:custom_components"/>：根数组。
  - <DataType type="string"/>：自定义组件的名称。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:custom_components": [
    "example:on_use"
]
```

</TabItem>

</Tabs>

---

## `minecraft:damage`

<Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_damage?view=minecraft-bedrock-stable"/>

定义物品的攻击伤害，类似剑。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:damage"/>：根对象。
  - <DataType type="int" name="value"/>：物品的攻击伤害。

<br/>或允许简化的写法：

- <DataType type="int" name="minecraft:damage"/>：物品的攻击伤害。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:damage": {
    "value": 7
}
```

```json showLineNumbers
"minecraft:damage": 7
```

</TabItem>

</Tabs>

---

## `minecraft:damage_absorption`

<Version version="1.21.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_damage_absorption?view=minecraft-bedrock-stable"/>

定义该物品在穿戴时可吸收何种类型的伤害，类似狼铠。

:::warning[注意]

要使用该组件，必须先定义[`minecraft:durability`](#minecraftdurability)和[`minecraft:wearable`](#minecraftwearable)组件。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:damage_absorption"/>：根对象。
  - <DataType type="array" name="absorbable_causes" isRequired/>：定义该物品将吸收的伤害类型列表。当实体在盔甲栏上穿戴该物品时，该物品会以降低耐久度为代价吸收列表中的伤害类型，使得实体免受这些类型的伤害。
    - <DataType type="string"/>：伤害类型。可见`/damage`命令的可用伤害类型。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:damage_absorption": {
    "absorbable_causes": [ "all" ]
}
```

</TabItem>

</Tabs>

---

## `minecraft:digger`

<Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_digger?view=minecraft-bedrock-stable"/>

定义物品破坏特定方块的速度。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:digger"/>：根对象。
  - <DataType type="array" name="destroy_speeds" isRequired/>：定义列表中的方块的破坏速度。
    - <DataType type="string" name="block"/>：方块 ID。
    - <DataType type="object" name="block"/>（替代）：方块标签。
      - <DataType type="string" name="tags"/>：一个 Molang 表达式。通常使用`query.any_tag()`来代表拥有特定标签的方块。
    - <DataType type="int" name="speed"/>：破坏方块的速度。若为负数则代表无法破坏。
  - <DataType type="boolean" name="use_efficiency"/>：定义有效率附魔的物品是否影响挖掘速度。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:digger": {
    "minecraft:digger": {
        "use_efficiency": true,
        "destroy_speeds": [
            { "block": { "tags": "query.any_tag( 'wood' )" }, "speed": 6 },
            { "block": "minecraft:coal_ore", "speed": 2 }
        ]
    }
}
```

</TabItem>

</Tabs>

---

## `minecraft:display_name`

<Version version="1.20.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_display_name?view=minecraft-bedrock-stable"/>

定义物品的显示名称。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:display_name"/>：根对象。
  - <DataType type="string" name="value"/>：定义物品的显示名称。可以指定为特定名称，也可以指定为本地化键名。不指定时默认为本地化键名`item.(命名空间):(ID)`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

特定的物品名称：

```json showLineNumbers
"minecraft:display_name": {
    "value": "钻石剑"
}
```

本地化物品键名：

```json showLineNumbers
"minecraft:display_name": {
    "value": "item.diamond_sword.name"
}
```

</TabItem>

</Tabs>

---

## `minecraft:durability`

<Version version="1.20.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_durability?view=minecraft-bedrock-stable"/>

定义物品的耐久度。

> Durability does not implicitly damage itself when mining blocks. It must be handled via ScriptAPI. It does however implicitly damage itself when damaging mobs. Each hit on a mob decreases durability by 2. This does not match vanilla property for weapons, but does match vanilla property for tools.  
> When used with [`minecraft:wearable`](#minecraftwearable), hitting a mob with the item does not decrease durability by 2. Instead, it implicitly decreases durability by 1 when equipped and hit by an entity. This matches vanilla property.
>
> 参考翻译：  
> 耐久度在挖掘方块时不会降低耐久，必须通过 ScriptAPI 强制降低耐久度。但是，当攻击生物时，每次击中生物都会降低 2 点耐久度，这并不符合武器的运作方式，而是工具的。  
> 当使用[`minecraft:wearable`](#minecraftwearable)时，攻击生物不会降低这 2 点耐久度。在穿着该物品时，被其他实体攻击后会降低 1 点耐久度，这是符合原版的运作方式的。
>
> —— [Bedrock Wiki](https://wiki.bedrock.dev/items/item-components#durability)

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:durability"/>：根对象。
  - <DataType type="object" name="damage_chance"/>：定义该物品有多大概率会在被使用后降低耐久度。不指定时默认为100%。
    - <DataType type="int" name="max" isRequired/>：最大有百分之多少的概率降低耐久度。
    - <DataType type="int" name="min" isRequired/>：最小有百分之多少的概率降低耐久度。
  - <DataType type="int" name="max_durability" isRequired/>：定义物品的总耐久度。

</treeview>

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

<Version version="1.21.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_durability_sensor?view=minecraft-bedrock-stable"/>

定义物品在降低耐久度后触发的事件。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:durability"/>：根对象。
  - <DataType type="array" name="durability_thresholds" isRequired/>：当物品耐久度降低到某个阈值时，触发事件。如果同时满足多个阈值，考虑所有阈值中最低的那个。至少指定 1 项。
    - <DataType type="object"/>：耐久度阈值
      - <DataType type="int" name="durability"/>：指定耐久度阈值，当物品耐久度低于此值时触发下面的事件。
      - <DataType type="string" name="particle_type"/>：低于耐久度阈值时释放的粒子。
      - <DataType type="string" name="sound_event"/>：低于耐久度阈值时播放的音效。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:durability_sensor": {
    "durability_thresholds": [
        {
            "durability": 100,
            "particle_type": "minecraft:explosion_manual",
            "sound_event": "blast"
        },
        {
            "durability": 5,
            "sound_event": "raid.horn"
        }
    ]
}
```

</TabItem>

</Tabs>

---

## `minecraft:dyeable`

<Version version="1.21.30" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_dyeable?view=minecraft-bedrock-stable"/>

定义物品在炼药锅中可染色。

当该物品被染色前，使用[`minecraft:icon`](#minecrafticon)中规定的`default`贴图；而被染色后，使用[`minecraft:icon`](#minecrafticon)中规定的`dyed`贴图。

:::warning[注意]

要使用该组件，应同时在[`minecraft:icon`](#minecrafticon)组件中定义`dyed`的贴图。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:dyeable"/>：根对象。
  - <DataType type="string" name="default_color"/>：该物品染色前采用的默认颜色，应指定为有效的颜色代码（`#xxxxxx`）。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:dyeable": {
    "default_color": "#ffffff"
}
```

</TabItem>

</Tabs>

---

## `minecraft:enchantable`

<Version version="1.20.30" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_enchantable?view=minecraft-bedrock-stable"/>

定义物品为可附魔。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:enchantable"/>：根对象。
  - <DataType type="string" name="slot" isRequired/>：该物品可以按照什么类型的物品附魔。只能填写为下列值中的一种：
    <!-- markdownlint-disable MD058 -->
    | `armor_feet` | `armor_torso` | `armor_head` | `armor_legs` | `axe` |
    | :---: | :---: | :---: | :---: | :---: |
    | **`bow`** | **`cosmetic_head`** | **`crossbow`** | **`elytra`** | **`fishing_rod`** |
    | **`flintsteel`** | **`hoe`** | **`pickaxe`** | **`shears`** | **`shield`** |
    | **`shovel`** | **`sword`** | **`all`** |  |  |
    <!-- markdownlint-enable MD058 -->
  - <DataType type="int" name="value" isRequired/>：附魔能力。该值越高越容易附魔出更好的魔咒。应在`0`-`255`之间（含）。更多信息参见[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/附魔（物品修饰）#附魔能力)。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:enchantable": {
    "slot": "sword",
    "value": 10
}
```

</TabItem>

</Tabs>

---

## `minecraft:entity_placer`

<Version version="1.20.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_entity_placer?view=minecraft-bedrock-stable"/>

定义物品可生成实体。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:entity_placer"/>：根对象。
  - <DataType type="string" name="entity" isRequired/>：生成的实体的 ID。
  - <DataType type="array" name="dispense_on"/>：可在何种方块上通过发射器使用该物品并生成实体。留空则默认允许全部方块。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="array" name="use_on"/>：可在何种方块上使用该物品并生成实体。留空则默认允许全部方块。
    - <DataType type="string"/>：方块 ID。

</treeview>

更完整的用法请查阅官方文档。

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:entity_placer": {
}
```

</TabItem>

</Tabs>

---

## `minecraft:foil`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-foil" isChinaVersion/>

定义该物品会像附魔书一样产生附魔光泽。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:glint`](#minecraftglint)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)中查看该组件接受的参数。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="boolean" name="minecraft:foil"/>：物品是否有附魔光泽，默认为`false`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:foil": true
```

</TabItem>

</Tabs>

---

## `minecraft:food`

定义物品为食物。

:::warning[注意]

该组件的旧版格式与新版格式有较大差异。下面将分开给出文档，请读者按需查阅。

:::

<Tabs>

<!-- 旧版组件 -->

<TabItem value="lowVersion" label="旧版组件">

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-food" isChinaVersion/>

:::info[提示]

你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)，或[网易给出的官方文档中](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#自定义食品)查看该组件接受的参数。

:::

:::warning[注意]

要使用该组件，必须同时定义[`minecraft:use_duration`](#minecraftuse_duration)组件。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:food"/>：根对象。
  - <DataType type="int" name="nutrition"/>：食物回复的饥饿值。
  - <DataType type="string" name="saturation_modifier"/>：食物回复的饱和度等级。回复的饱和度将为饥饿值×饱和度系数×2。可选值及其对应饱和度系数如下表：
    <!-- markdownlint-disable MD058 -->
    | 可选值 | `poor` | `low` | `normal` | `good` | `max` | `supernatural` |
    | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
    | **饱和度系数** | 0.1 | 0.3 | 0.6 | 0.8 | 1.0 | 1.2 |
    <!-- markdownlint-enable MD058 -->
  - <DataType type="string" name="using_converts_to"/>：食物在食用完毕后将转化为的物品。应填写为物品 ID。
  - <DataType type="string" name="on_use_action"/>：食物在食用完毕后的行为。可选值：`chrous_teleport`、`suspicious_stew_effect`、`none`，默认为`none`。
  - <DataType type="array" name="on_use_range"/>：食物在食用完毕后的影响范围。仅在`on_use_action`指定为`chrous_teleport`时有意义，代表随机传送的范围。
    - <DataType type="float"/>0：X 轴偏移，默认值为`0.0`。
    - <DataType type="float"/>1：Y 轴偏移，默认值为`0.0`。
    - <DataType type="float"/>2：Z 轴偏移，默认值为`0.0`。
  - <DataType type="string" name="cooldown_type"/>：食物在使用后进入的冷却类型，共享同种冷却类型的物品将会一起进入冷却阶段。
  - <DataType type="int" name="cooldown_time"/>：食物在使用后进入的冷却时间，单位为游戏刻，共享同种冷却类型的物品将会一起进入冷却阶段。
  - <DataType type="boolean" name="can_always_eat"/>：食物是否在任何情况下都可食用，否则仅当玩家的饥饿值不满时才可食用。
  - <DataType type="array" name="effect"/>：食物在食用后提供的状态效果。
    - <DataType type="object"/>：状态效果信息。
      - <DataType type="string" name="name"/>：提供的状态效果 ID。
      - <DataType type="float" name="chance"/>：有多大的几率提供这个状态效果。应在`0.0`-`1.0`之间（含）。不同状态效果间，该值是独立判断的。
      - <DataType type="int" name="duration"/>：提供的状态效果时长，单位秒（即使是瞬时状态效果）。
      - <DataType type="int" name="amplifier"/>：提供的状态效果放大倍数，提供的等级为放大倍数 + 1。
  - <DataType type="array" name="remove_effects"/>：食物在食用后解除的状态效果。
    - <DataType type="string"/>：解除的状态效果 ID。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

**紫颂果的物品定义**：

```json showLineNumbers
"minecraft:food": {
    "nutrition": 4,
    "saturation_modifier": "low",
    "on_use_action": "chorus_teleport",
    "on_use_range": [ 8, 8, 8 ],
    "cooldown_type": "chorusfruit",
    "cooldown_time": 20,
    "can_always_eat": true
}
```

**金苹果的物品定义**：

```json showLineNumbers
"minecraft:food": {
    "nutrition": 4,
    "saturation_modifier": "supernatural",
    "can_always_eat": true,
    "effects": [
        {
            "name": "regeneration",
            "chance": 1.0,
            "duration": 5,
            "amplifier": 1
        },
        {
            "name": "absorption",
            "chance": 1.0,
            "duration": 120,
            "amplifier": 0
        }
    ]
}
```

</TabItem>

</Tabs>

</TabItem>

<!-- 新版组件 -->

<TabItem value="newVersion" label="新版组件" default>

<Version version="1.20.30" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_food?view=minecraft-bedrock-stable"/>

:::note[编者注]

新版的`food`组件相比旧版删去了大量功能，拆分到了其他组件或脚本功能中。以下为功能点差异，若读者有相关需求，请参考以下替代方案，若无法接受请使用旧版组件。

- 提供状态效果（或解除状态效果）：使用脚本的物品使用后事件（`ItemCompleteUseAfterEvent`）监听并对使用实体提供药效。
- 使用后随机传送：使用脚本的物品使用后事件（`ItemCompleteUseAfterEvent`）监听并传送实体（不要忘记加传送到地表的判定）。
- 使用冷却：使用物品组件[`minecraft:cooldown`](#minecraftcooldown)代替。

:::

:::warning[注意]

要使用该组件，必须同时定义下面的组件：

- [`minecraft:use_modifiers`](#minecraftuse_modifiers)（`1.20.50`或更高格式版本）
- [`minecraft:use_duration`](#minecraftuse_duration)（`1.20.30`-`1.20.40`格式版本）

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:food"/>：根对象。
  - <DataType type="int" name="nutrition"/>：食物回复的饥饿值。默认为`0`。
  - <DataType type="float" name="saturation_modifier"/>：食物回复的饱和度等级。回复的饱和度将为饥饿值×饱和度系数×2。默认为`0.6`。
  - <DataType type="string" name="using_converts_to"/>：食物在食用完毕后将转化为的物品。应填写为物品 ID。
  - <DataType type="boolean" name="can_always_eat"/>：食物是否在任何情况下都可食用，否则仅当玩家的饥饿值不满时才可食用。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:food": {
    "nutrition": 4,
    "saturation_modifier": 0.3
}
```

</TabItem>

</Tabs>

</TabItem>

</Tabs>

---

## `minecraft:fuel`

<Version version="1.20.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_fuel?view=minecraft-bedrock-stable"/>

定义该物品为燃料。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:fuel"/>：根对象。
  - <DataType type="float" name="duration"/>：定义燃料在熔炉中的燃烧时长，单位秒。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:fuel": {
    "duration": 80.0
}
```

</TabItem>

</Tabs>

---

## `minecraft:glint`

<Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_glint?view=minecraft-bedrock-stable"/>

定义该物品会像附魔书一样产生附魔光泽。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:glint"/>：根对象。
  - <DataType type="boolean" name="value"/>：物品是否有附魔光泽，默认为`false`。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:glint"/>：物品是否有附魔光泽，默认为`false`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:glint": {
    "value": true
}
```

```json showLineNumbers
"minecraft:glint": true
```

</TabItem>

</Tabs>

---

## `minecraft:hand_equipped`

<Version isLowVersion/> <Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_hand_equipped?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-hand-equipped" isChinaVersion/>

定义该物品像工具一样直立展示在玩家手中。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:hand_equipped"/>：根对象
  - <DataType type="boolean" name="value"/>：是否在手中像工具一样展示物品，默认为`false`。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:hand_equipped"/>：是否在手中像工具一样展示物品，默认为`false`。国际版旧版物品和中国版物品应当写为简化写法。

</treeview>

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

<Version isRP isLowVersion/> <Version version="1.20.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_hover_text_color?view=minecraft-bedrock-stable"/> <Version isRP docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-hover-text-color" isChinaVersion/>

定义物品悬浮文本的颜色。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:hover_text_color"/>：根对象。
  - <DataType type="string" name="value"/>：设置物品的悬浮文本颜色。可选值为格式化代码对应的名称，详见[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/格式化代码#颜色代码) 对应的名称一列。

<br/>或允许简化的写法：

- <DataType type="string" name="minecraft:hover_text_color"/>：设置物品的悬浮文本颜色。可选值为格式化代码对应的名称，详见[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/格式化代码#颜色代码) 对应的名称一列。国际版旧版物品和中国版物品应当写为简化写法。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:hover_text_color": {
    "value": "aqua"
}
```

```json showLineNumbers
"minecraft:hover_text_color": "aqua"
```

</TabItem>

</Tabs>

---

## `minecraft:icon`

<Version isRP isLowVersion/> <Version version="1.20.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_icon?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-icon" isChinaVersion/>

定义物品的图标。

:::danger[重要组件]

对于任何自定义物品，都必须定义该组件。否则，物品将无法正确展示贴图。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:icon" isRequired/>：根对象
  - <DataType type="object" name="textures"/>：定义该物品的贴图。
    - <DataType type="string" name="default"/>：该物品的默认贴图。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[物品贴图](./texture)。
    - <DataType type="string" name="dyed"/>：该物品的染色后贴图，仅当指定[`minecraft:dyeable`](#minecraftdyeable)组件后有意义。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[物品贴图](./texture)。

<br/>或允许简化的写法：

- <DataType type="string" name="minecraft:icon"/>：该物品的默认贴图。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[物品贴图](./texture)。

<br/>

:::warning[旧版本的单值写法]

在`1.20.0`~`1.20.40`格式版本下，上面的单值写法应写为下面的写法，不过在高版本下，这种写法已经弃用。

- <DataType type="object" name="minecraft:icon" isRequired/>：根对象
  - <DataType type="string" name="texture"/>：该物品的贴图Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[物品贴图](./texture)。

:::

</treeview>

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

<Version version="1.20.30" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_interact_button?view=minecraft-bedrock-stable"/>

在触控设备中，为物品添加交互按钮。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="boolean"/><DataType type="string" name="minecraft:interact_button"/>：在触控设备上，是否启用物品的交互按钮，以及该按钮上显示的文本。若指定为`true`，则默认显示为`Use Item`，否则显示为指定文本。允许指定为本地化键名。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

默认，显示为“Use Item”：

```json showLineNumbers
"minecraft:interact_button": true
```

指定为特定文本：

```json showLineNumbers
"minecraft:interact_button": "Click me!"
```

</TabItem>

</Tabs>

---

## `minecraft:liquid_clipped`

<Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_liquid_clipped?view=minecraft-bedrock-stable"/>

定义物品是否可与流体交互。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:liquid_clipped"/>：根对象。
  - <DataType type="boolean" name="value"/>：是否能与液体交互，默认为`false`。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:liquid_clipped"/>：是否能与液体交互，默认为`false`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:liquid_clipped": {
    "value": true
}
```

```json showLineNumbers
"minecraft:liquid_clipped": true
```

</TabItem>

</Tabs>

---

## `minecraft:max_damage`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-max-damage" isChinaVersion/>

定义物品的耐久度。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:durability`](#minecraftdurability)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)中查看该组件接受的参数。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="int" name="minecraft:max_damage"/>：该物品的耐久度。应在`0`-`32767`之间（含）。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:max_damage": 1000
```

</TabItem>

</Tabs>

---

## `minecraft:max_stack_size`

<Version isLowVersion/> <Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_max_stack_size?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-max-stack-size" isChinaVersion/>

定义物品的最大堆叠数。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:max_stack_size"/>：根对象。
  - <DataType type="int" name="value"/>：物品的最大堆叠数，默认为`64`。

<br/>或允许简化的写法：

- <DataType type="int" name="minecraft:max_stack_size"/>：物品的最大堆叠数，默认为`64`。国际版旧版物品和中国版物品应当写为简化写法。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:max_stack_size": {
    "value": 16
}
```

```json showLineNumbers
"minecraft:max_stack_size": 16
```

</TabItem>

</Tabs>

---

## `minecraft:projectile`

<Version version="1.20.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_projectile?view=minecraft-bedrock-stable"/>

定义物品为弹射物，例如箭。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:projectile"/>：根对象。
  - <DataType type="float" name="minimum_critical_power"/>：定义蓄力需要多久才能暴击。单位秒。
  - <DataType type="string" name="projectile_entity" isRequired/>：定义掷出何种实体。若未指定命名空间，默认为`minecraft`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:projectile": {
    "minimum_critical_power": 1.25,
    "projectile_entity": "minecraft:snowball"
}
```

</TabItem>

</Tabs>

---

## `minecraft:rarity`

<Version version="1.21.30" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_rarity?view=minecraft-bedrock-stable"/>

定义物品的稀有度。

注意：物品具有任何魔咒时稀有度会提升，由常见或少见变为稀有、或由稀有变为史诗。关于稀有度机制，详见[稀有度 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/稀有度)。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:rarity"/>：根对象。
  - <DataType type="boolean" name="value"/>：定义物品的基础稀有度。可选值为`common`（普通）、`uncommon`（少见）、`rare`（稀有）、`epic`（传奇）。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:rarity"/>：定义物品的基础稀有度。可选值为`common`（普通）、`uncommon`（少见）、`rare`（稀有）、`epic`（传奇）。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:rarity": {
    "value": "rare"
}
```

```json showLineNumbers
"minecraft:rarity": "rare"
```

</TabItem>

</Tabs>

---

## `minecraft:record`

<Version version="1.20.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_record?view=minecraft-bedrock-stable"/>

定义物品为唱片。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:record"/>：根对象。
  - <DataType type="int" name="comparator_signal"/>：在唱片机中通过红石信号输出的信号，应在`0`-`15`之间。
  - <DataType type="float" name="duration"/>：音乐时长，单位秒。
  - <DataType type="string" name="sound_event"/>：要播放的音效。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

[官方给出的自定义物品实例](https://github.com/microsoft/minecraft-samples/blob/main/custom_items/behavior_packs/custom_item/items/my_sword_singing.json)：

```json showLineNumbers
"minecraft:record": {
    "comparator_signal": 1,
    "duration": 5,
    "sound_event": "pre_ram.screamer"
}
```

</TabItem>

</Tabs>

---

## `minecraft:repairable`

<Version version="1.20.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_repairable?view=minecraft-bedrock-stable"/>

定义物品为可修复的。默认情况下，允许此物品和另一个同种类的物品在一起修复（例如两把损坏铁镐合成一把较新的铁镐），此时恢复的耐久度为二者相加。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:repairable"/>：根对象。
  - <DataType type="array" name="repair_items"/>：可用于修复的物品及其修复耐久度值的列表。
    - <DataType type="object"/>：可修复的物品项目
      - <DataType type="int"/><DataType type="string" name="repair_amount"/>：物品恢复的耐久度。当指定为整数时，恢复固定的耐久度值；指定为字符串时，可指定为一个 Molang，可使用`context.other`指定铁砧另一个槽位的物品。
      - <DataType type="array" name="items" isRequired/>：可用于修复的物品列表。
        - <DataType type="string"/>：可用于修复的物品 ID。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:repairable":{
    "repair_items": [
        {
            "items":[ "minecraft:diamond" ],
            "repair_amount": 10
        }
    ]
}
```

```json showLineNumbers
"minecraft:repairable":{
    "repair_items": [
        {
            "items":[ "minecraft:diamond" ],
            "repair_amount": "math.random(1, 10)"
        }
    ]
}
```

按原版计算公式修复（两物品的剩余耐久度 + 该类物品满耐久度 * 0.05）：

```json showLineNumbers
"minecraft:repairable":{
    "repair_items": [
        {
            "items":[
                "minecraft:diamond"
            ],
            "repair_amount": "math.min(query.remaining_durability + context.other->query.remaining_durability + math.floor(query.max_durability /20), context.other->query.max_durability)"
        }
    ]
}
```

</TabItem>

</Tabs>

---

## `minecraft:shooter`

<Version version="1.20.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_shooter?view=minecraft-bedrock-stable"/>

定义物品为某种弹射物的发射物，类似于弓或弩。

:::info[提示]

若通过[`minecraft:durability`](#minecraftdurability)定义了发射物的耐久度，该物品将仅在发射子弹时降低耐久度。近战攻击时该物品的耐久度将不受影响。

:::

:::warning[注意]

要使用该组件，必须同时定义下面的组件：

- [`minecraft:use_modifiers`](#minecraftuse_modifiers)（`1.20.50`或更高格式版本）
- [`minecraft:use_duration`](#minecraftuse_duration)（`1.20.20`-`1.20.40`格式版本）

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:shooter"/>：根对象。
  - <DataType type="array" name="ammunition" isRequired/>：定义该发射物使用何种子弹。
    - <DataType type="object"/>
      - <DataType type="string" name="item" isRequired/>：子弹所对应的物品 ID。该物品 ID 对应的物品必须具有[`minecraft:projectile`](#minecraftprojectile)组件，否则将会报错。
      - <DataType type="boolean" name="use_offhand"/>：是否允许使用副手上的子弹，像弩和烟花一样。默认值为`false`。
      - <DataType type="boolean" name="search_inventory"/>：是否搜索物品栏中是否有子弹可用，创造模式下不会消耗子弹。默认值为`false`，但通常设置为`true`。
      - <DataType type="boolean" name="use_in_creative"/>：是否在创造模式下可用。若设置为`false`，则无法在物品栏中没有子弹时使用。默认值为`false`。
  - <DataType type="boolean" name="charge_on_draw"/>：拉动时是否蓄力充能。默认值为`false`。
  - <DataType type="float" name="max_draw_duration"/>：拉动最长时间。应小于等于[`minecraft:use_modifiers`](#minecraftuse_modifiers)或[`minecraft:use_duration`](#minecraftuse_duration)组件定义的使用时长，默认值为`0`。
  - <DataType type="boolean" name="scale_power_by_draw_duration"/>：是否随着拉动时间的增长而增加对应子弹（弹射物）发射时威力，默认值为`false`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:shooter": {
    "ammunition": [
        {
            "item": "minecraft:snowball",
            "use_offhand": true,
            "search_inventory": true,
            "use_in_creative": true
        }
    ],
    "max_draw_duration": 1,
    "scale_power_by_draw_duration": true,
    "charge_on_draw": false
}
```

</TabItem>

</Tabs>

---

## `minecraft:should_despawn`

<Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_should_despawn?view=minecraft-bedrock-stable"/>

定义该物品对应的掉落物是否会在一段时间后消失。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:should_despawn"/>：根对象。
  - <DataType type="boolean" name="value"/>：掉落物是否会在一段时间后消失，默认为`true`。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:should_despawn"/>：掉落物是否会在一段时间后消失，默认为`true`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:should_despawn": {
    "value": false
}
```

```json showLineNumbers
"minecraft:should_despawn": false
```

</TabItem>

</Tabs>

---

## `minecraft:seed`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-seed" isChinaVersion/>

定义物品为种子。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:block_placer`](#minecraftblock_placer)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)中查看该组件接受的参数。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:stacked_by_data"/>：根对象。
  - <DataType type="string" name="crop_result"/>：种植后放置的方块。
  - <DataType type="array" name="plant_at"/>：可被种植的方块列表。
    - <DataType type="string"/>：方块 ID。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:seed": {                                  
    "crop_result": "sweet_berry_bush", 
    "plant_at": [ "grass", "dirt", "podzol" ]
}
```

</TabItem>

</Tabs>

---

## `minecraft:stacked_by_data`

<Version isLowVersion/> <Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_stacked_by_data?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-stacked-by-data" isChinaVersion/>

定义是否允许不同数据值的同种物品堆叠。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:stacked_by_data"/>：根对象。
  - <DataType type="boolean" name="value"/>：是否允许不同数据值的物品或掉落物堆叠，默认为`false`。

<br/>或允许简化的写法：

- <DataType type="boolean" name="minecraft:stacked_by_data"/>：是否允许不同数据值的物品或掉落物堆叠，默认为`false`。国际版旧版物品和中国版物品应当写为简化写法。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:stacked_by_data": {
    "value": true
}
```

```json showLineNumbers
"minecraft:stacked_by_data": true
```

</TabItem>

</Tabs>

---

## `minecraft:storage_item`

<Version version="1.21.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_storage_item?view=minecraft-bedrock-stable"/>

定义该物品为可存储物品，可以存储其他物品，类似于收纳袋。

:::warning[注意]

要使用该组件，必须先定义[`minecraft:max_stack_size`](#minecraftmax_stack_size)组件，并将其值设为`1`，否则该组件可能无法正常工作。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:storage_item"/>：根对象。
  - <DataType type="boolean" name="allow_nested_storage_items"/>：是否允许该类物品嵌套存储，例如收纳袋存储收纳袋。
  - <DataType type="array" name="allowed_items"/>：允许存储的物品，不在此列名单中的物品无法存储。若设置为空则允许存储一切物品。
    - <DataType type="string"/>：允许存储的物品 ID。
  - <DataType type="array" name="banned_items"/>：禁止存储的物品，在此列名单中的物品无法存储。
    - <DataType type="string"/>：允许存储的物品 ID。
  - <DataType type="int" name="max_slots"/>：该物品的最大容量。注：仅限格式版本`1.21.40`-`1.21.50`下可用，`1.21.60`或更高格式版本请使用[`minecraft:storage_weight_limit`](#minecraftstorage_weight_limit)组件。
  - <DataType type="int" name="max_weight_limit"/>：该物品在其他可存储物品中占用的容量。注：仅限格式版本`1.21.40`-`1.21.50`下可用，`1.21.60`或更高格式版本请使用[`minecraft:storage_weight_modifier`](#minecraftstorage_weight_modifier)组件。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:storage_item": {
    "max_slots": 64,
    "allow_nested_storage_items": true,
    "banned_items": [ "minecraft:shulker_box", "minecraft:undyed_shulker_box" ]
}
```

</TabItem>

</Tabs>

---

## `minecraft:storage_weight_limit`

<Version version="1.21.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_storage_weight_limit?view=minecraft-bedrock-stable"/>

定义该可存储物品最多可以存储多少物品。

:::warning[注意]

要使用该组件，必须先定义[`minecraft:storage_item`](#minecraftstorage_item)组件。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:storage_weight_limit"/>：根对象。
  - <DataType type="int" name="max_weight_limit"/>：定义该可存储物品（类似于收纳袋）的最大空间。必须在`0`-`64`之间，默认为`64`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:storage_weight_limit": {
    "max_weight_limit": 64
}
```

</TabItem>

</Tabs>

---

## `minecraft:storage_weight_modifier`

<Version version="1.21.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_storage_weight_modifier?view=minecraft-bedrock-stable"/>

定义该物品在存储到一个可存储物品时需要占用多大空间。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:storage_weight_modifier"/>：根对象。
  - <DataType type="int" name="weight_in_storage_item"/>：定义该物品在存储到一个可存储物品（类似于收纳袋）时需要占用多大空间。默认为`4`，若为`0`则代表该物品无法存储到其他可存储物品中。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:storage_weight_modifier": {
    "weight_in_storage_item": 4
}
```

</TabItem>

</Tabs>

---

## `minecraft:tags`

<Version version="1.20.50" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_tags?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-tags" isChinaVersion/>

定义物品标签。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:tags"/>：根对象。
  - <DataType type="array" name="tags"/>：物品的标签列表。
    - <DataType type="string"/>：物品标签。

</treeview>

一些原版使用的标签具有实质作用。下表为对这些标签的列举，原版还有大量正在使用的标签，读者可在[Bedrock Wiki](https://wiki.bedrock.dev/items/item-tags)中查看更多相关信息。

| 标签 | 功能 |
| --- | :--- |
| `minecraft:bookshelf_books` | 标记该物品可存储于雕纹书架内。 |
| `minecraft:decorated_pot_sherds` | 标记该物品为饰纹陶罐的合成原材料。 |
| `minecraft:planks` | 标记该物品为一种木板材料。 |
| `minecraft:stone_crafting_materials` | 标记该物品为一种圆石材料，可用于合成熔炉等。 |
| `minecraft:stone_tool_materials` | 标记该物品为一种圆石材料，可用于合成石制工具。 |
| `minecraft:trimmable_armors` | 标记物品为一种盔甲纹饰。 |
| `minecraft:vibration_damper` | 标记物品在使用时不发生振动。 |
| `minecraft:wool` | 标记该物品为一种羊毛材料。 |

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:use_animation": {
    "value": "eat"
}
```

```json showLineNumbers
"minecraft:use_animation": "eat"
```

</TabItem>

</Tabs>

---

## `minecraft:throwable`

<Version version="1.20.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_throwable?view=minecraft-bedrock-stable"/>

定义该物品可掷出，类似于雪球或鸡蛋。

:::warning[注意]

要使用该组件，必须先定义[`minecraft:projectile`](#minecraftprojectile)组件。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:throwable"/>：根对象。
  - <DataType type="boolean" name="do_swing_animation"/>：物品掷出后是否播放摆手动画。
  - <DataType type="float" name="launch_power_scale"/>：随着蓄力时间增长而增加的弹射物威力比例。默认值为`1.0`（即蓄力时间增长，弹射物威力不增加）。设置负值将导致弹射物以反方向掷出。
  - <DataType type="float" name="max_draw_duration"/>：最长蓄力时间，单位秒。默认为`0.0`。
  - <DataType type="float" name="min_draw_duration"/>：最段蓄力时间，单位秒。默认为`0.0`。
  - <DataType type="float" name="max_launch_power"/>：弹射物的最大威力（以保证弹射物的威力不会无限增大）。
  - <DataType type="boolean" name="scale_power_by_draw_duration"/>：是否随着蓄力时间的增长而增加弹射物掷出时的威力，默认值为`false`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:throwable": {
    "do_swing_animation": true,
    "launch_power_scale": 1.5,
    "max_launch_power": 1.5
}
```

</TabItem>

</Tabs>

---

## `minecraft:use_animation`

<Version isRP isLowVersion/> <Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_use_animation?view=minecraft-bedrock-stable"/> <Version isRP docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-use-duration" isChinaVersion/>

定义物品的使用动画。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:use_animation"/>：根对象。
  - <DataType type="string" name="value"/>：使用物品时播放的动画，可选值为`eat`、`drink`、`bow`、`block`、`camera`、`crossbow`、`none`、`brush`、`spear`、`spyglass`，不使用该组件时则不播放动画。

<br/>或允许简化的写法：

- <DataType type="string" name="minecraft:use_animation"/>：使用物品时播放的动画，可选值为`eat`、`drink`、`bow`、`block`、`camera`、`crossbow`、`none`、`brush`、`spear`、`spyglass`，不使用该组件时则不播放动画。国际版旧版物品和中国版物品应当写为简化写法。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:use_animation": {
    "value": "eat"
}
```

```json showLineNumbers
"minecraft:use_animation": "eat"
```

</TabItem>

</Tabs>

---

## `minecraft:use_duration`

<Version isLowVersion/> <Version version="1.20.20 - 1.20.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_use_duration?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-use-duration" isChinaVersion/>

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

<treeview>

- <DataType type="int" name="minecraft:use_duration"/>（旧版国际版物品或中国版物品）：该物品的使用时长。单位为游戏刻，默认值为`32`。
- <DataType type="float" name="minecraft:use_duration"/>（新版国际版物品）：该物品的使用时长。单位为秒，默认值为`1.6`。

</treeview>

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

<Version version="1.20.50" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_use_modifiers?view=minecraft-bedrock-stable"/>

定义该物品的使用时长。

:::warning[注意]

要使用该组件，必须同时定义下列组件中的 1 个：

- [`minecraft:food`](#minecraftfood)
- [`minecraft:shooter`](#minecraftshooter)
- [`minecraft:throwable`](#minecraftthrowable)

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:use_modifiers"/>：根对象。
  - <DataType type="float" name="use_duration" isRequired/>：使用时长。例如苹果的该值为`1.6`。
  - <DataType type="float" name="movement_modifier" isRequired/>：定义玩家使用物品时的速度倍率，必须小于等于`1`。例如苹果的该值为`0.35`。

</treeview>

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

<Version version="1.20.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_wearable?view=minecraft-bedrock-stable"/>

定义该物品为可穿戴物品，例如盔甲。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="minecraft:wearable"/>：根对象。
  - <DataType type="string" name="slot" isRequired/>：定义可穿戴的位置。可选值：`slot.weapon.offhand`、`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`。
  - <DataType type="int" name="protection"/>：物品可提供的护甲值。默认为`0`。
  - <DataType type="boolean" name="hides_player_location"/>：穿戴后是否在定位栏中隐藏玩家位置。仅限`1.21.90`或更高格式版本可用。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:wearable": {
    "slot": "slot.armor.chest",
    "protection": 10
}
```

```json showLineNumbers
"minecraft:wearable": {
    "slot": "slot.armor.head",
    "hides_player_location": true
}
```

</TabItem>

</Tabs>

---

## `netease:allow_offhand`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-allow-offhand" isChinaVersion/>

允许玩家将物品放在副手。

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:allow_off_hand`](#minecraftallow_off_hand)替代，但必须在国际版物品定义中进行定义。

:::

:::warning[注意]

使用该组件的物品，在放到副手后可能无法支持[`minecraft:foil`](#minecraftfoil)、[`netease:render_offsets`](#neteaserender_offsets)等组件。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:allow_offhand"/>：根对象。
  - <DataType type="boolean" name="value" isRequired/>：是否能将物品放在副手。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:allow_offhand": {
    "value": true
}
```

</TabItem>

</Tabs>

---

## `netease:armor`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-armor" isChinaVersion/>

定义物品为盔甲。

:::info[国际版组件替代]

该组件可**部分**用国际版新版组件[`minecraft:wearable`](#minecraftwearable)和[`minecraft:enchantable`](#minecraftenchantable)替代，但必须在国际版物品定义中进行定义。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:armor"/>：根对象。
  - <DataType type="int" name="defense"/>：定义盔甲的防御值。默认值为`0`。
  - <DataType type="int" name="enchantment"/>：定义盔甲的附魔能力。默认值为`0`。
  - <DataType type="int" name="armor_slot" isRequired/>：定义盔甲槽位。可选值为`0`（头盔）、`1`（胸甲）、`2`（护腿）、`3`（靴子）。
  - <DataType type="int" name="toughness"/>：定义盔甲韧性，应在`0`-`20`之间（含）。默认值为`0`。
  - <DataType type="float" name="knockback_resistance"/>：定义盔甲的击退抗性，应在`0`-`1`之间（含）。默认值为`0.0`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:armor":{
    "defense": 10,
    "enchantment": 4,
    "armor_slot": 0
}
```

</TabItem>

</Tabs>

---

## `netease:bucket`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-bucket" isChinaVersion/>

定义该物品为桶。

:::warning[注意]

要使用该组件，需在物品描述中将`custom_item_type`设置为`bucket`。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:bucket"/>：根对象。
  - <DataType type="string" name="fill_liquid" isRequired/>：定义使用时倒出的流体方块 ID。默认值为`flowing_water`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:bucket": {
    "fill_liquid": "flowing_water"
}
```

</TabItem>

</Tabs>

---

## `netease:compostable`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-compostable" isChinaVersion/>

定义物品可在堆肥桶中用于堆肥。

:::note[国际版组件替代]

该组件可用国际版新版组件[`minecraft:compostable`](#minecraftcompostable)替代，但目前中国版尚未达到国际版对应组件所需求的版本。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="float" name="netease:compostable"/>：有百分之多少的概率会堆肥成功。例如设置为 50 时则有 50% 的概率堆肥成功。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:compostable": 50
```

</TabItem>

</Tabs>

---

## `netease:cooldown`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-cooldown" isChinaVersion/>

定义物品使用后的冷却。

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:cooldown`](#minecraftcooldown)替代，但必须在国际版物品定义中进行定义。

:::

:::warning[注意]

定义了食物组件[`minecraft:food`](#minecraftfood)的物品，其冷却需在食物组件中定义。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:cooldown"/>：根对象。
  - <DataType type="string" name="category"/>：冷却类型，共享同种冷却类型的物品将会一起进入冷却阶段。默认值为`item`。
  - <DataType type="int" name="duration"/>：冷却时间，单位为游戏刻。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:cooldown": {
    "category": "item",
    "duration": 10
}
```

</TabItem>

</Tabs>

---

## `netease:customtips`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-customtips" isChinaVersion/>

定义物品的描述信息。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:customtips"/>：根对象。
  - <DataType type="string" name="value" isRequired/>：物品的描述信息。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:customtips": {
    "value": "§8右键可发射"
}
```

</TabItem>

</Tabs>

---

## `netease:egg`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-egg" isChinaVersion/>

定义物品可生成实体。

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:entity_placer`](#minecraftentity_placer)替代，但必须在国际版物品定义中进行定义。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:egg"/>：根对象。
  - <DataType type="string" name="entity" isRequired/>：生成的实体的 ID。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:egg": {
    "entity": "minecraft:sheep"
}
```

</TabItem>

</Tabs>

---

## `netease:enchant_material`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-enchant-material" isChinaVersion/>

定义物品为附魔材料，类似于青金石。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:enchantment_material"/>：根对象。
  - <DataType type="boolean" name="value" isRequired/>：物品是否为附魔材料。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:enchantment_material": {
    "value": true
}
```

</TabItem>

</Tabs>

---

## `netease:fire_resistant`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-fire-resistant" isChinaVersion/>

定义物品防火，类似于下界合金物品。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:fire_resistant"/>：根对象。
  - <DataType type="boolean" name="value" isRequired/>：物品是否防火。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:fire_resistant": {
    "value": true
}
```

</TabItem>

</Tabs>

---

## `netease:frame_anim_in_scene`

<Version isRP docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-frame-anim-in-scene" isChinaVersion/>

定义物品的序列帧。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:weapon"/>：根对象。
  - <DataType type="string" name="flipbook_texture" isRequired/>：序列帧资源的路径。
  - <DataType type="string" name="atlas_tile" isRequired/>：在图集中声明的名称。
  - <DataType type="int" name="ticks_per_frame" isRequired/>：代表多少帧切换一次贴图，按 1 秒 20 帧算，设置 20 的话即为 1 秒切换一帧贴图。
  - <DataType type="boolean" name="blend_frames"/>：切换贴图的时候是否混合上一帧。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:frame_anim_in_scene": {
    "texture_path": "textures/items/watch_atlas",
    "ticks_per_frame": 1
}
```

</TabItem>

</Tabs>

---

## `netease:frame_animation`

<Version isRP docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-frame-animation" isChinaVersion/>

定义蓄力物品的序列帧。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:weapon"/>：根对象。
  - <DataType type="string" name="texture_name" isRequired/>：`item_texture.json`中定义的序列帧数组。
  - <DataType type="int" name="frame_count"/>：定义序列帧帧数。默认值为`1`。
  - <DataType type="boolean" name="animate_in_toolbar"/>：在物品栏中是否支持动画。默认值为`true`。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:frame_animation": {
    "frame_count": 3,
    "texture_name": "bow_pulling",
    "animate_in_toolbar": true
}
```

</TabItem>

</Tabs>

---

## `netease:fuel`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-fuel" isChinaVersion/>

定义该物品为燃料。

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:fuel`](#minecraftfuel)替代，但必须在国际版物品定义中进行定义。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:fuel"/>：根对象。
  - <DataType type="float" name="duration"/>：定义燃料在熔炉中的燃烧时长，单位秒。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:fuel": {
    "duration": 80.0
}
```

</TabItem>

</Tabs>

---

## `netease:initial_user_data`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-initial-user-data" isChinaVersion/>

定义物品的初始属性。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:initial_user_data"/>：根对象。
  - <DataType type="object" name="display"/>：物品的显示信息。
    - <DataType type="string" name="Name"/>（注意大写）：物品的初始名称。
    - <DataType type="array" name="Lore"/>（注意大写）：物品的描述信息。
      - <DataType type="string"/>：物品描述。第 i 个元素代表第 i 行描述。
    - <DataType type="boolean" name="ShowInHand"/>（注意大写）：手持是否显示物品。
  - <DataType type="array" name="ench"/>：物品的附魔信息列表。
    - <DataType type="object"/>：附魔信息。
      - <DataType type="object" name="id" isRequired/>：附魔 ID。
        - <DataType type="int" name="__type__"/>：下面的`__value__`值的类型，`1`代表字节型（Byte），`2`代表短整型（short）。
        - <DataType type="int" name="__value__"/>：附魔 ID 对应的数字 ID。若为自定义附魔，则需将该值设为`255`并设置`modEnchant`。
        - <DataType type="string" name="modEnchant"/>：仅当`__value__`为`255`时有意义，指定设置的附魔 ID。
      - <DataType type="object" name="lvl" isRequired/>：附魔等级。
        - <DataType type="int" name="__type__"/>：下面的`__value__`值的类型，`1`代表字节型（Byte），`2`代表短整型（short）。
        - <DataType type="int" name="__value__"/>：附魔等级。
  - <DataType type="boolean" name="minecraft:keep_on_death"/>：物品是否在玩家死亡后掉落。默认值为`false`。
  - <DataType type="int" name="minecraft:item_lock"/>：指定物品锁定。可选值为`0`（不锁定）、`1`（无法移动）、`2`（无法丢弃），默认为`0`。
  - 其他可用键名及可用值请参考[基岩版物品格式 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/基岩版存档格式#物品格式)。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:initial_user_data": {
    "display": {
        "Name": "同铁砧命名",
        "Lore": ["第一行描述", "第二行描述"]
    },
    "ench": [{
        "id": {
            "__type__":2,
            "__value__":12
        },
        "lvl": {
            "__type__":2,
            "__value__":10
        }
    }],
    "minecraft:keep_on_death": true,
    "ModAttackDamage": 20
}
```

</TabItem>

</Tabs>

---

## `netease:projectile`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-projectile" isChinaVersion/>

定义物品为弹射物。

:::info[国际版组件替代]

该组件可用国际版新版组件[`minecraft:projectile`](#minecraftprojectile)替代，但必须在国际版物品定义中进行定义。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="string" name="netease:projectile"/>：定义将掷出的弹射物。

</treeview>

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"netease:projectile": "minecraft:snowball"
```

</TabItem>

</Tabs>

---

## `netease:render_offsets`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-render-offsets" isChinaVersion/>

定义该物品在右手时的渲染偏移。

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

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

</treeview>

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

<treeview>

- <DataType type="object" name="netease:shield"/>：根对象
  - <DataType type="array" name="defence_damage_source_list"/>：防御的伤害类型。为空时默认设置为原版的格挡伤害逻辑。
    - <DataType type="string"/>：伤害类型。可见`/damage`命令的可用伤害类型。
  - <DataType type="array" name="undefence_damage_source_list"/>：不防御的伤害类型。不宜和`defence_damage_source_list`存在相同元素。
    - <DataType type="string"/>：伤害类型。可见`/damage`命令的可用伤害类型。
  - <DataType type="boolean" name="is_consume_damage"/>：是否消耗物品的耐久度。

</treeview>

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

<treeview>

- <DataType type="object" name="netease:show_in_hand"/>：根对象
  - <DataType type="boolean" name="value" isRequired/>：手持时是否显示该物品。

</treeview>

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

该组件**部分**可用国际版新版组件[`minecraft:damage`](#minecraftdamage)、[`minecraft:enchantable`](#minecraftenchantable)和[`minecraft:digger`](#minecraftdigger)替代（暂时不存在`level`的功能），但必须在国际版物品定义中进行定义。

:::

:::warning[注意]

要使用该组件，需在物品描述中将`custom_item_type`设置为`weapon`。

:::

<Tabs>

<TabItem value="parameters" label="参数" default>

<treeview>

- <DataType type="object" name="netease:weapon"/>：根对象
  - <DataType type="string" name="type" isRequired/>：武器或工具类型，可选值：`"sword"`、`"shovel"`、`"pickaxe"`、`"hatchet"`（斧头）、`"hoe"`。
  - <DataType type="int" name="level" isRequired/>：武器或工具的挖掘等级，可选值：`0`（木制或金制工具）、`1`（石制工具）、`2`（铁制工具）、`3`（钻制工具）。详见[网易提供的官方文档](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/2-自定义武器及工具.html#网易components)。
  - <DataType type="int" name="speed"/>：武器或工具挖掘方块的基础速度。默认值为`0`。
  - <DataType type="int" name="attack_damage"/>：武器或工具的攻击伤害。默认值为`0`。
  - <DataType type="int" name="enchantment"/>：武器或工具的附魔能力。默认值为`0`。

</treeview>

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

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [物品组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponentlist?view=minecraft-bedrock-stable)
- [自定义基础物品 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1)
- [物品文档 | 1.16.20.3 | bedrock.dev](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)
- [物品组件 | Bedrock Wki](https://wiki.bedrock.dev/items/item-components)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
