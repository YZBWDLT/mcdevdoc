---
sidebar_position: 2
---

# 数据驱动物品组件

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"
import Button from '/src/components/button/base';

> 适用版本：国际版 26.50，中国版 3.10（1.21.130）。

数据驱动物品组件（Data-Driven Item Components）用于规定物品的功能。将不同的物品组件组合在一起可以实现多种复杂的功能。

本文档收录所有已开放（包括旧版本）或即将开放的命名空间为`minecraft`和`netease`的物品组件信息。你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

**每个组件条目下方的高亮标签均含注释，可鼠标悬停或手机点击查看**。例：<Highlight text="这是一个特殊标签" color="yellowgreen" tooltip="这是标签下的特殊注解。"/>。

---

---

## 基础属性组件

全体物品通用的组件。

### `minecraft:display_name`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.0"/><br/>

定义物品的显示名称。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:display_name"/>：根对象。
  - <DataType type="string" name="value"/>：定义物品的显示名称。可以指定为特定名称，也可以指定为本地化键名。不指定时默认为本地化键名`item.(命名空间):(ID)`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**特定的物品名称**：

```json showLineNumbers
"minecraft:display_name": {
    "value": "钻石剑"
}
```

**本地化物品键名**：

```json showLineNumbers
"minecraft:display_name": {
    "value": "item.diamond_sword.name"
}
```

</TabItem></Tabs>

---

### `minecraft:durability`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.0" tooltip="在更旧的版本下使用minecraft:max_damage组件。"/><br/>

定义物品的耐久度。

> Durability does not implicitly damage itself when mining blocks. It must be handled via ScriptAPI. It does however implicitly damage itself when damaging mobs. Each hit on a mob decreases durability by 2. This does not match vanilla property for weapons, but does match vanilla property for tools.  
> When used with [`minecraft:wearable`](#minecraftwearable), hitting a mob with the item does not decrease durability by 2. Instead, it implicitly decreases durability by 1 when equipped and hit by an entity. This matches vanilla property.
>
> 参考翻译：  
> 耐久度在挖掘方块时不会降低耐久，必须通过 ScriptAPI 强制降低耐久度。但是，当攻击生物时，每次击中生物都会降低 2 点耐久度，这并不符合武器的运作方式，而是工具的。  
> 当使用[`minecraft:wearable`](#minecraftwearable)时，攻击生物不会降低这 2 点耐久度。在穿着该物品时，被其他实体攻击后会降低 1 点耐久度，这是符合原版的运作方式的。
>
> —— [Bedrock Wiki](https://wiki.bedrock.dev/items/item-components#durability)

另见：_[ItemDurabilityComponent 类](/docs/docs/scripts/sapi/server/item/component#itemdurabilitycomponent-类)_（通过脚本读写耐久值、修改损耗概率）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:durability"/>：根对象。
  - <DataType type="object" name="damage_chance"/>：定义该物品有多大概率会在被使用后降低耐久度。不指定时默认为100%。
    - <DataType type="int" name="max" isRequired/>：最大有百分之多少的概率降低耐久度。
    - <DataType type="int" name="min" isRequired/>：最小有百分之多少的概率降低耐久度。
  - <DataType type="int" name="max_durability" isRequired/>：定义物品的总耐久度。
</treeview>

</TabItem><TabItem value="example" label="示例">

镐、剑等工具与武器：设置总耐久与每次使用的损耗概率。

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

</TabItem></Tabs>

---

### `minecraft:icon`

<Usable type="all"/> <Version add="1.20.0" tooltip="在更旧的版本下使用已废弃的同名组件。"/><br/>

定义物品的图标。

:::danger[重要组件]

除了使用[`minecraft:block_placer`](#minecraftblock_placer)的`replace_block_item`绑定方块的自定义物品之外，所有自定义物品都必须定义该组件。否则，物品将无法正确展示贴图。

:::

<Tabs><TabItem value="parameters" label="参数" default>

<Version add="1.20.0"/>多值写法：

<treeview>
- <DataType type="object" name="minecraft:icon" isRequired/>：根对象
  - <DataType type="object" name="textures"/>：定义该物品的贴图。
    - <DataType type="string" name="default"/>：该物品的默认贴图。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[`item_texture.json`](./description#item_texturejson)。
    - <DataType type="string" name="dyed"/>：该物品的染色后贴图，仅当指定[`minecraft:dyeable`](#minecraftdyeable)组件后有意义。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[`item_texture.json`](./description#item_texturejson)。
</treeview>

<Version add="1.20.40"/>单值写法：

<treeview>
- <DataType type="string" name="minecraft:icon" isRequired/>：该物品的默认贴图。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[`item_texture.json`](./description#item_texturejson)。
</treeview>

<Version add="1.20.0" deprecated="1.20.50"/>单值写法：

<treeview>
- <DataType type="object" name="minecraft:icon" isRequired/>：根对象
  - <DataType type="string" name="texture"/>：该物品的贴图。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[`item_texture.json`](./description#item_texturejson)。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型（多值写法）**：

```json showLineNumbers
"minecraft:icon": {
    "textures": {
        "default": "apple"
    }
}
```

**字符串型（单值写法）**：

```json showLineNumbers
"minecraft:icon": "apple"
```

</TabItem></Tabs>

---

### `minecraft:max_stack_size`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10" tooltip="在更旧的版本下使用已废弃的同名组件。"/><br/>

定义物品的最大堆叠数。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:max_stack_size"/>：根对象。
  - <DataType type="int" name="value"/>：物品的最大堆叠数，默认为`64`。
</treeview>

**整型**：

<treeview>
- <DataType type="int" name="minecraft:max_stack_size"/>：物品的最大堆叠数，默认为`64`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:max_stack_size": {
    "value": 16
}
```

**整型**：

```json showLineNumbers
"minecraft:max_stack_size": 16
```

</TabItem></Tabs>

---

### `minecraft:stacked_by_data`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20" tooltip="在更旧的版本下使用已废弃的同名组件。"/><br/>

定义是否允许不同数据值的同种物品堆叠。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:stacked_by_data"/>：根对象。
  - <DataType type="boolean" name="value"/>：是否允许不同数据值的物品或掉落物堆叠，默认为`false`。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:stacked_by_data"/>：是否允许不同数据值的物品或掉落物堆叠，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:stacked_by_data": {
    "value": true
}
```

**布尔型**：

```json showLineNumbers
"minecraft:stacked_by_data": true
```

</TabItem></Tabs>

---

### `minecraft:tags`

<Usable type="all"/> <Version add="1.20.50"/><br/>

定义物品标签。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:tags"/>：根对象。
  - <DataType type="array" name="tags"/>：物品的标签列表。
    - <DataType type="string"/>：物品标签。
</treeview>

有关原版使用的标签，参见[物品标签](tags)。

</TabItem><TabItem value="example" label="示例">

苹果（apple.json）：挂上`minecraft:is_food`标签，供配方、狐狸行为与 Molang 查询识别。

```json showLineNumbers
"minecraft:tags": {
    "tags": [ "minecraft:planks", "example:foo" ]
}
```

</TabItem></Tabs>

---

---

## 功能性组件

特定类型物品可用的组件。

|   常见物品类型   | 常用组件                                                                                                                                                                                                                                                                                                             | 最低适用版本 |
| :--------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
|        剑        | [`minecraft:can_destroy_in_creative`](#minecraftcan_destroy_in_creative)、**[`minecraft:damage`](#minecraftdamage)**、[`minecraft:digger`](#minecraftdigger)、[`minecraft:enchantable`](#minecraftenchantable)、[`minecraft:hand_equipped`](#minecrafthand_equipped)、[`minecraft:repairable`](#minecraftrepairable) | 1.20.30      |
|       工具       | **[`minecraft:digger`](#minecraftdigger)**、[`minecraft:enchantable`](#minecraftenchantable)、[`minecraft:repairable`](#minecraftrepairable)                                                                                                                                                                         | 1.20.30      |
|       盔甲       | [`minecraft:enchantable`](#minecraftenchantable)、[`minecraft:repairable`](#minecraftrepairable)、**[`minecraft:wearable`](#minecraftwearable)**                                                                                                                                                                     | 1.20.30      |
|       食物       | **[`minecraft:food`](#minecraftfood)**、[`minecraft:use_animation`](#minecraftuse_animation)、[`minecraft:use_modifiers`](#minecraftuse_modifiers)                                                                                                                                                                   | 1.20.50      |
| 弹射物（如雪球） | [`minecraft:cooldown`](#minecraftcooldown)、[`minecraft:projectile`](#minecraftprojectile)、**[`minecraft:throwable`](#minecraftthrowable)**                                                                                                                                                                         | 1.20.10      |
|     弓类似物     | **[`minecraft:shooter`](#minecraftshooter)**、[`minecraft:use_modifiers`](#minecraftuse_modifiers)                                                                                                                                                                                                                   | 1.20.50      |
|      收纳袋      | **[`minecraft:bundle_interaction`](#minecraftbundle_interaction)**、[`minecraft:storage_item`](#minecraftstorage_item)、[`minecraft:storage_weight_limit`](#minecraftstorage_weight_limit)、[`minecraft:storage_weight_modifier`](#minecraftstorage_weight_modifier)                                                 | 1.21.60      |

---

### `minecraft:allow_off_hand`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20"/><br/>

允许玩家将物品放在副手。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:allow_off_hand"/>：根对象。
  - <DataType type="boolean" name="value"/>：是否能将物品放在副手，默认为`false`。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:allow_off_hand"/>：是否能将物品放在副手，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:allow_off_hand": {
    "value": true
}
```

**布尔型**：

```json showLineNumbers
"minecraft:allow_off_hand": true
```

</TabItem></Tabs>

---

### `minecraft:block_placer`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10" tooltip="在更旧的版本下使用minecraft:block组件或minecraft:seed组件。"/><br/>

可以在特定方块上放置特定方块。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:block_placer"/>：根对象
  - <DataType type="string" name="block" isRequired/>：将放置为何种方块。
  - <DataType type="boolean" name="replace_block_item"/>：<Version add="1.21.60" inline/>是否将此物品与对应方块绑定，若绑定则当方块被破坏后将掉落该物品。备注：物品 ID 必须与对应的方块 ID 保持一致。  
    若不定义[`minecraft:icon`](#minecrafticon)组件，将显示为原本的 3D 方块模型。使用[`minecraft:icon`](#minecrafticon)组件可以覆写为特定的 2D 贴图。
  - <DataType type="array" name="use_on"/>：可放置于的方块列表。如果留空，则默认为可放置于所有方块上。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="boolean" name="aligned_placement"/>：<Version add="1.26.10" inline/>是否对齐放置。当指定为`true`时，在玩家移动时将允许方块按照玩家移动的方向放置，默认为`false`。
</treeview>

> 该组件有更完整的语法描述方块，请查阅官方文档。

</TabItem><TabItem value="example" label="示例">

把物品做成可放置方块的物品，例如让自定义物品像花一样种在泥土上。

```json showLineNumbers
"minecraft:block_placer": {
    "block": "minecraft:wheat",
    "use_on": [ "minecraft:dirt", "minecraft:grass_block" ],
    "replace_block_item": true
}
```

```json showLineNumbers
"minecraft:block_placer": {
    "block": "minecraft:dirt",
    "use_on": [ "dirt", "grass_block", "anvil" ]
}
```

</TabItem></Tabs>

---

### `minecraft:bundle_interaction`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.21.40"/> <Highlight text="需要前置组件" tooltip="要使用此组件，请事先定义minecraft:storage_item组件。"/> <br/>

为物品启用收纳袋的交互模式和物品提示。

另见：_[`minecraft:storage_item`](#minecraftstorage_item)组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:bundle_interaction"/>：根对象
  - <DataType type="int" name="num_viewable_slots"/>：定义从收纳袋顶部可访问的物品堆叠的最大数量。必须在`1`到`64`之间（含），默认值为`12`。
</treeview>

</TabItem><TabItem value="example" label="示例">

收纳袋（bundle.json）：启用收纳袋的存取交互与容量提示。

```json showLineNumbers
"minecraft:bundle_interaction": {
    "num_viewable_slots": 12
}
```

</TabItem></Tabs>

---

### `minecraft:can_destroy_in_creative`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10"/> <br/>

允许玩家在创造模式下手持该物品时可以破坏方块。如果设置为`false`，该物品就会像剑一样手持时无法破坏方块。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:can_destroy_in_creative"/>：根对象。
  - <DataType type="boolean" name="value"/>：是否允许玩家在创造模式下手持该物品时破坏方块，默认为`true`。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:can_destroy_in_creative"/>：是否允许玩家在创造模式下手持该物品时破坏方块，默认为`true`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:can_destroy_in_creative": {
    "value": false
}
```

**布尔型**：

```json showLineNumbers
"minecraft:can_destroy_in_creative": false
```

</TabItem></Tabs>

---

### `minecraft:compostable`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.21.60"/> <br/>

定义物品可在堆肥桶中用于堆肥。

另见：_[ItemCompostableComponent 类](/docs/docs/scripts/sapi/server/item/component#itemcompostablecomponent-类)_（通过脚本读取堆肥概率）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:compostable"/>：根对象。
  - <DataType type="int" name="composting_chance" isRequired/>：有百分之多少的概率会堆肥成功。
</treeview>

</TabItem><TabItem value="example" label="示例">

让物品可用于堆肥，设置放入堆肥桶后的堆肥成功率。

```json showLineNumbers
"minecraft:compostable": {
    "composting_chance": 30
}
```

</TabItem></Tabs>

---

### `minecraft:cooldown`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10" tooltip="在更旧的版本下使用minecraft:food组件。"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:use_modifiers组件。"/> <br/>

定义物品使用后的冷却。

另见：_[`minecraft:use_modifiers`](#minecraftuse_modifiers)组件_、_[ItemCooldownComponent 类](/docs/docs/scripts/sapi/server/item/component#itemcooldowncomponent-类)_（通过脚本设置冷却）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:cooldown"/>：根对象。
  - <DataType type="string" name="category" isRequired/>：冷却类别，共享同种冷却类别的物品将会一起进入冷却阶段。
  - <DataType type="float" name="duration" isRequired/>：冷却时间，单位为秒。
  - <DataType type="string" name="type"/>：<Version add="1.21.130" inline/>冷却类型，在使用或攻击时令此物品进入冷却状态。可选值为：`use`（使用后进入冷却，冷却期间不再允许使用，但允许攻击或进行其他操作）、`attack`（攻击后进入冷却，冷却期间不再允许攻击，但允许使用或进行其他操作）。默认值为`use`。
</treeview>

</TabItem><TabItem value="example" label="示例">

风弹（wind_charge.json）：使用后让同一`category`的物品一起进入冷却，示例同时演示了`type`字段的作用。

```json showLineNumbers
"minecraft:cooldown": {
    "category": "attack",
    "duration": 1.5,
    "type": "attack"
}
```

</TabItem></Tabs>

---

### `minecraft:damage`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20"/> <br/>

定义物品的攻击伤害，类似剑。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:damage"/>：根对象。
  - <DataType type="int" name="value"/>：物品的攻击伤害。
</treeview>

**整型**：

<treeview>
- <DataType type="int" name="minecraft:damage"/>：物品的攻击伤害。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:damage": {
    "value": 7
}
```

**整型**：

```json showLineNumbers
"minecraft:damage": 7
```

</TabItem></Tabs>

---

### `minecraft:damage_absorption`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.21.20"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:durability组件和minecraft:wearable组件。"/> <br/>

定义该物品在穿戴时可吸收何种类型的伤害，类似狼铠。

另见：_[`minecraft:durability`](#minecraftdurability)组件_、_[`minecraft:wearable`](#minecraftwearable)组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:damage_absorption"/>：根对象。
  - <DataType type="array" name="absorbable_causes" isRequired/>：定义该物品将吸收的伤害类型列表。当实体在盔甲栏上穿戴该物品时，该物品会以降低耐久度为代价吸收列表中的伤害类型，使得实体免受这些类型的伤害。
    - <DataType type="string"/>：伤害类型。可见`/damage`命令的可用伤害类型。
</treeview>

</TabItem><TabItem value="example" label="示例">

盔甲类物品：按伤害类型吸收一部分伤害。

```json showLineNumbers
"minecraft:damage_absorption": {
    "absorbable_causes": [ "all" ]
}
```

</TabItem></Tabs>

---

### `minecraft:digger`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20"/> <br/>

定义物品破坏特定方块的速度。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:digger"/>：根对象。
  - <DataType type="array" name="destroy_speeds"/>：定义列表中的方块的破坏速度。
    - <DataType type="object"/>
      - <DataType type="string" name="block" isRequired/>：方块 ID。
      - <DataType type="object" name="block" isRequired/>（替代）：方块标签。
        - <DataType type="string" name="tags"/>：一个 [Molang 表达式](../blocks/molang)。通常使用`query.any_tag()`来代表拥有特定标签的方块。
      - <DataType type="int" name="speed" isRequired/>：破坏方块的速度。若为负数则代表无法破坏。更多信息参见[挖掘 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E6%8C%96%E6%8E%98#%E6%8C%96%E6%8E%98%E9%80%9F%E5%BA%A6)，但请格外注意此值不支持浮点数。
  - <DataType type="boolean" name="use_efficiency"/>：定义有效率附魔的物品是否影响挖掘速度。
</treeview>

实测物品在使用此组件后，将变为指定的方块的合适挖掘工具。例如若指定`minecraft:web`，那么此物品挖掘蜘蛛网就能够掉落线。

</TabItem><TabItem value="example" label="示例">

镐、斧、锹等工具：按方块或方块标签设置挖掘速度，并让物品成为对应方块的合适工具。

```json showLineNumbers
"minecraft:digger": {
    "use_efficiency": true,
    "destroy_speeds": [
        { "block": { "tags": "query.any_tag( 'wood' )" }, "speed": 6 },
        { "block": "minecraft:coal_ore", "speed": 2 }
    ]
}
```

</TabItem></Tabs>

---

### `minecraft:durability_sensor`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.21.20"/> <br/>

定义物品在降低耐久度后触发的事件。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:durability_sensor"/>：根对象。
  - <DataType type="array" name="durability_thresholds" isRequired/>：当物品耐久度降低到某个阈值时，触发事件。如果同时满足多个阈值，考虑所有阈值中最低的那个。至少指定 1 项。
    - <DataType type="object"/>：耐久度阈值
      - <DataType type="int" name="durability"/>：指定耐久度阈值，当物品耐久度低于此值时触发下面的事件。
      - <DataType type="string" name="particle_type"/>：低于耐久度阈值时释放的粒子。
      - <DataType type="string" name="sound_event"/>：低于耐久度阈值时播放的音效。
</treeview>

</TabItem><TabItem value="example" label="示例">

耐久接近耗尽时播放提示音或产生振动，提醒玩家工具即将损坏。

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

</TabItem></Tabs>

---

### `minecraft:dyeable`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.21.30"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:icon组件的dyed贴图。"/> <br/>

定义物品在炼药锅中可染色。

另见：_[`minecraft:icon`](#minecrafticon)组件_。

可通过 ScriptAPI 更改物品的颜色。另见：_[ItemDyeableComponent 类](/docs/docs/scripts/sapi/server/item/component#itemdyeablecomponent-类)_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:dyeable"/>：根对象。
  - <DataType type="string" name="default_color"/>：该物品染色前采用的默认颜色。可填写`#rrggbb`形式的颜色代码，或由 3 个整数组成的`[R, G, B]`数组。默认值为`[255, 255, 255]`（白色）。
</treeview>

</TabItem><TabItem value="example" label="示例">

皮革盔甲：让物品在炼药锅中可染色，并指定染色前的默认颜色。

```json showLineNumbers
"minecraft:dyeable": {
    "default_color": "#ffffff"
}
```

</TabItem></Tabs>

---

### `minecraft:enchantable`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.30"/> <br/>

定义物品为可附魔。

另见：_[ItemEnchantableComponent 类](/docs/docs/scripts/sapi/server/item/component#itemenchantablecomponent-类)_（通过脚本添加、移除与查询附魔）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:enchantable"/>：根对象。
  - <DataType type="string" name="slot" isRequired/>：该物品可以按照什么类型的物品附魔。只能填写为下列值中的一种：
    <!-- markdownlint-disable MD058 -->
    | `armor_feet` | `armor_torso` | `armor_head` | `armor_legs` | `axe` |
    | :---: | :---: | :---: | :---: | :---: |
    | **`bow`** | **`cosmetic_head`** | **`crossbow`** | **`elytra`** | **`fishing_rod`** |
    | **`flintsteel`** | **`hoe`** | **`melee_spear`** | **`pickaxe`** | **`shears`** |
    | **`shield`** | **`shovel`** | **`sword`** | **`all`** |   |
    <!-- markdownlint-enable MD058 -->
  - <DataType type="int" name="value" isRequired/>：附魔能力。该值越高越容易附魔出更好的魔咒。应在`0`-`255`之间（含）。更多信息参见[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/附魔（物品修饰）#附魔能力)。
</treeview>

</TabItem><TabItem value="example" label="示例">

剑、镐、盔甲等：指定可用的附魔槽类型与附魔能力值。

```json showLineNumbers
"minecraft:enchantable": {
    "slot": "sword",
    "value": 10
}
```

</TabItem></Tabs>

---

### `minecraft:entity_placer`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.0"/> <br/>

定义物品可生成实体。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:entity_placer"/>：根对象。
  - <DataType type="string" name="entity"/>：生成的实体的 ID。
  - <DataType type="array" name="dispense_on"/>：可在何种方块上通过发射器使用该物品并生成实体。留空则默认允许全部方块。
    - <DataType type="string"/>：方块 ID。
  - <DataType type="array" name="use_on"/>：可在何种方块上使用该物品并生成实体。留空则默认允许全部方块。
    - <DataType type="string"/>：方块 ID。
</treeview>

更完整的用法请查阅官方文档。

</TabItem><TabItem value="example" label="示例">

刷怪蛋：设置使用后生成何种实体、可在哪些方块上使用。

```json showLineNumbers
"minecraft:entity_placer": {
    "entity": "minecraft:spider",
    "dispense_on": [ "minecraft:web" ],
    "use_on": [ "minecraft:web" ]
}
```

```json showLineNumbers
"minecraft:entity_placer": {
    "entity": "minecraft:sheep"
}
```

</TabItem></Tabs>

---

### `minecraft:fire_resistant`

<Usable type="all"/> <Version add="1.21.110"/> <br/>

定义物品防火，类似于下界合金物品。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:fire_resistant"/>：根对象。
  - <DataType type="boolean" name="value"/>：物品是否防火，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

下界合金制品：让物品掉入岩浆后不被烧毁。

```json showLineNumbers
"minecraft:fire_resistant": {
    "value": true
}
```

</TabItem></Tabs>

---

### `minecraft:food`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.30" tooltip="在更旧的版本下使用已废弃的同名组件。"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:use_modifiers组件。"/> <br/>

定义物品为食物。

另见：_[`minecraft:use_modifiers`](#minecraftuse_modifiers)组件_、_[ItemFoodComponent 类](/docs/docs/scripts/sapi/server/item/component#itemfoodcomponent-类)_（通过脚本读取食物属性）。

:::note[编者注]

新版的`food`组件相比旧版删去了大量功能，拆分到了其他组件或脚本功能中。以下为功能点差异，若读者有相关需求，请参考以下替代方案，若无法接受请使用旧版组件。

- 提供状态效果（或解除状态效果）：使用脚本的物品使用后事件（[ItemCompleteUseAfterEvent](/docs/docs/scripts/sapi/server/world/after_events#itemcompleteuseafterevent-类)）监听并对使用实体提供药效。
- 使用后随机传送：使用脚本的物品使用后事件（[ItemCompleteUseAfterEvent](/docs/docs/scripts/sapi/server/world/after_events#itemcompleteuseafterevent-类)）监听并传送实体（不要忘记加传送到地表的判定）。
- 使用冷却：使用物品组件[`minecraft:cooldown`](#minecraftcooldown)代替。

:::

<Tabs><TabItem value="parameter" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:food"/>：根对象。
  - <DataType type="int" name="nutrition"/>：食物回复的饥饿值。默认为`0`。
  - <DataType type="float" name="saturation_modifier"/>：食物回复的饱和度等级。回复的饱和度将为饥饿值×饱和度系数×2。默认为`0.6`。
  - <DataType type="string" name="using_converts_to"/>：食物在食用完毕后将转化为的物品。应填写为物品 ID。
  - <DataType type="boolean" name="can_always_eat"/>：食物是否在任何情况下都可食用，否则仅当玩家的饥饿值不满时才可食用。
</treeview>

</TabItem><TabItem value="example" label="示例">

苹果（apple.json）：设置 4 点营养值、0.3 的饱和度加成，并配合`use_modifiers`定义食用时长。

```json showLineNumbers
"minecraft:food": {
    "nutrition": 4,
    "saturation_modifier": 0.3
}
```

</TabItem></Tabs>

---

### `minecraft:fuel`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.0"/> <br/>

定义该物品为燃料。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:fuel"/>：根对象。
  - <DataType type="float" name="duration"/>：定义燃料在熔炉中的燃烧时长，单位秒。
</treeview>

</TabItem><TabItem value="example" label="示例">

木棍、木板等：设置物品在熔炉中作为燃料的燃烧时长。

```json showLineNumbers
"minecraft:fuel": {
    "duration": 80.0
}
```

</TabItem></Tabs>

---

### `minecraft:glint`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20" tooltip="在更旧的版本下使用minecraft:foil组件。"/> <br/>

定义该物品会像附魔书一样产生附魔光泽。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:glint"/>：根对象。
  - <DataType type="boolean" name="value"/>：物品是否有附魔光泽，默认为`false`。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:glint"/>：物品是否有附魔光泽，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:glint": {
    "value": true
}
```

**布尔型**：

```json showLineNumbers
"minecraft:glint": true
```

</TabItem></Tabs>

---

### `minecraft:hand_equipped`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20" tooltip="在更旧的版本下使用已废弃的同名组件。"/> <br/>

定义该物品像工具一样直立展示在玩家手中。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:hand_equipped"/>：根对象
  - <DataType type="boolean" name="value"/>：是否在手中像工具一样展示物品，默认为`false`。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:hand_equipped"/>：是否在手中像工具一样展示物品，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:hand_equipped": {
    "value": true
}
```

**布尔型**：

```json showLineNumbers
"minecraft:hand_equipped": true
```

</TabItem></Tabs>

---

### `minecraft:hover_text_color`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10" tooltip="在更旧的版本下使用已废弃的同名组件。"/> <br/>

定义物品悬浮文本的颜色。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:hover_text_color"/>：根对象。
  - <DataType type="string" name="value"/>：设置物品的悬浮文本颜色。可选值为格式化代码对应的名称，详见[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/格式化代码#颜色代码) 对应的名称一列。
</treeview>

**字符串型**：

<treeview>
- <DataType type="string" name="minecraft:hover_text_color"/>：设置物品的悬浮文本颜色。可选值为格式化代码对应的名称，详见[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/格式化代码#颜色代码) 对应的名称一列。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:hover_text_color": {
    "value": "aqua"
}
```

**字符串型**：

```json showLineNumbers
"minecraft:hover_text_color": "aqua"
```

</TabItem></Tabs>

---

### `minecraft:interact_button`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.30"/> <br/>

在触控设备中，为物品添加交互按钮。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="boolean"/><DataType type="string" name="minecraft:interact_button"/>：在触控设备上，是否启用物品的交互按钮，以及该按钮上显示的文本。若指定为`true`，则默认显示为`Use Item`，否则显示为指定文本。允许指定为本地化键名。
</treeview>

</TabItem><TabItem value="example" label="示例">

默认，显示为“Use Item”：

```json showLineNumbers
"minecraft:interact_button": true
```

指定为特定文本：

```json showLineNumbers
"minecraft:interact_button": "Click me!"
```

</TabItem></Tabs>

---

### `minecraft:kinetic_weapon`

<Usable type="all"/> <Version add="1.21.130"/> <br/>

定义物品可造成动能伤害，类似于矛。

动能伤害每刻计算一次，根据使用者和目标投影到视线向量上的速度来计算伤害（通过点积），速度越快伤害越高；越对齐视线向量伤害也越高。若应用参数`damage_multiplier`和`damage_modifier`，伤害值将向下取整。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:kinetic_weapon"/>：根对象。
  - <DataType type="int" name="delay"/>：施加伤害和效果前需要等待的游戏刻数。
  - <DataType type="object" name="reach"/>：定义目标必须在使用者的视线向量内多少格的范围才能被击中。如果目标和使用者之间有方块，也会阻止伤害及其效果。
    - <DataType type="float" name="max"/>：目标和使用者之间的最大范围。默认值为`3`。
    - <DataType type="float" name="min"/>：目标和使用者之间的最小范围。默认值为`0`。
  - <DataType type="object" name="creative_reach"/>：定义目标必须在*创造模式*使用者的视线向量内多少格的范围才能被击中。如果目标和使用者之间有方块，也会阻止伤害及其效果。
    - <DataType type="float" name="max"/>：目标和使用者之间的最大范围。默认值为<DataType type="object" name="reach"/>规定的值。
    - <DataType type="float" name="min"/>：目标和使用者之间的最小范围。默认值为<DataType type="object" name="reach"/>规定的值。
  - <DataType type="float" name="hitbox_margin"/>：允许使用者视线向量的偏移误差。默认值为`0`。
  - <DataType type="float" name="damage_multiplier"/>：在基础伤害的基础上的伤害乘数。默认值为`1`。
  - <DataType type="float" name="damage_modifier"/>：在基础伤害×伤害乘数（`damage_multiplier`）的基础上的伤害加和值，得到最终伤害。默认值为`0`。
  - <DataType type="object" name="damage_conditions"/>：应用伤害需满足的条件，条件不满足时不施加伤害。
    - <DataType type="int" name="max_duration"/>：当`delay`参数计时完毕后，在多长的时间范围内时可施加伤害。如果为负数则不设限制。单位：游戏刻。默认值为`-1`。
    - <DataType type="float" name="min_relative_speed"/>：目标和使用者之间的相对速度应至少为多大时施加伤害。默认值为`0`。
    - <DataType type="float" name="min_speed"/>：使用者的速度应至少为多大时施加伤害。默认值为`0`。
  - <DataType type="object" name="dismount_conditions"/>：击落目标需满足的条件，条件不满足时不会使目标从载具上击落。
    - <DataType type="int" name="max_duration"/>：当`delay`参数计时完毕后，在多长的时间范围内时可将目标从载具上击落。如果为负数则不设限制。单位：游戏刻。默认值为`-1`。
    - <DataType type="float" name="min_relative_speed"/>：目标和使用者之间的相对速度应至少为多大时将目标从载具上击落。默认值为`0`。
    - <DataType type="float" name="min_speed"/>：使用者的速度应至少为多大时将目标从载具上击落。默认值为`0`。
  - <DataType type="object" name="knockback_conditions"/>：击退目标需满足的条件，条件不满足时不击退目标。
    - <DataType type="int" name="max_duration"/>：当`delay`参数计时完毕后，在多长的时间范围内时可击退目标。如果为负数则不设限制。单位：游戏刻。默认值为`-1`。
    - <DataType type="float" name="min_relative_speed"/>：目标和使用者之间的相对速度应至少为多大时击退目标。默认值为`0`。
    - <DataType type="float" name="min_speed"/>：使用者的速度应至少为多大时击退目标。默认值为`0`。
</treeview>

</TabItem><TabItem value="example" label="示例">

铁矛数据（见[矛 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E7%9F%9B)）：

```json showLineNumbers
"minecraft:kinetic_weapon": {
    "delay": 12,
    "reach": {
        "min": 2.0,
        "max": 4.5
    },
    "creative_reach": {
        "min": 2.0,
        "max": 7.5
    },
    "hitbox_margin": 0.25,
    "damage_multiplier": 0.95,
    "damage_conditions": {
        "max_duration": 225,
        "min_relative_speed": 4.6
    },
    "knockback_conditions": {
        "max_duration": 90,
        "min_speed": 5.1
    },
    "dismount_conditions": {
        "max_duration": 50,
        "min_speed": 11.0
    }
}
```

</TabItem></Tabs>

---

### `minecraft:liquid_clipped`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20"/> <br/>

定义物品是否可与流体交互。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:liquid_clipped"/>：根对象。
  - <DataType type="boolean" name="value"/>：是否能与液体交互，默认为`false`。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:liquid_clipped"/>：是否能与液体交互，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:liquid_clipped": {
    "value": true
}
```

**布尔型**：

```json showLineNumbers
"minecraft:liquid_clipped": true
```

</TabItem></Tabs>

---

### `minecraft:piercing_weapon`

<Usable type="all"/> <Version add="1.21.130"/> <br/>

定义物品可造成戳刺伤害，类似于矛。

戳刺伤害根据使用者和目标投影到视线向量上的速度来计算伤害（通过点积）。需要注意：应用了该组件的物品不能破坏方块，因为戳刺伤害始终处于更高的优先级之中。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:piercing_weapon"/>：根对象。
  - <DataType type="object" name="reach"/>：定义目标必须在使用者的视线向量内多少格的范围才能被击中。如果目标和使用者之间有方块，也会阻止伤害及其效果。
    - <DataType type="float" name="max"/>：目标和使用者之间的最大范围。默认值为`3`。
    - <DataType type="float" name="min"/>：目标和使用者之间的最小范围。默认值为`0`。
  - <DataType type="object" name="creative_reach"/>：定义目标必须在*创造模式*使用者的视线向量内多少格的范围才能被击中。如果目标和使用者之间有方块，也会阻止伤害及其效果。
    - <DataType type="float" name="max"/>：目标和使用者之间的最大范围。默认值为<DataType type="object" name="reach"/>规定的值。
    - <DataType type="float" name="min"/>：目标和使用者之间的最小范围。默认值为<DataType type="object" name="reach"/>规定的值。
  - <DataType type="float" name="hitbox_margin"/>：允许使用者视线向量的偏移误差。默认值为`0`。
</treeview>

</TabItem><TabItem value="example" label="示例">

矛数据（见[矛 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E7%9F%9B)）：

```json showLineNumbers
"minecraft:piercing_weapon": {
    "reach": {
        "min": 2,
        "max": 4.5
    },
    "creative_reach": {
        "min": 2,
        "max": 7.5
    },
    "hitbox_margin": 0.25
}
```

</TabItem></Tabs>

---

### `minecraft:projectile`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10"/> <br/>

定义物品为弹射物，例如箭。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:projectile"/>：根对象。
  - <DataType type="float" name="minimum_critical_power"/>：定义蓄力需要多久才能暴击。单位秒。
  - <DataType type="string" name="projectile_entity" isRequired/>：定义掷出何种实体。若未指定命名空间，默认为`minecraft`。
</treeview>

</TabItem><TabItem value="example" label="示例">

风弹（wind_charge.json）：让物品发射`wind_charge_projectile`弹射物。

```json showLineNumbers
"minecraft:projectile": {
    "minimum_critical_power": 1.25,
    "projectile_entity": "minecraft:snowball"
}
```

</TabItem></Tabs>

---

### `minecraft:rarity`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.21.30"/> <br/>

定义物品的稀有度。

> **注意**：物品具有任何魔咒时稀有度会提升，由常见或少见变为稀有、或由稀有变为史诗。关于稀有度机制，详见[稀有度 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/稀有度)。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:rarity"/>：根对象。
  - <DataType type="string" name="value"/>：定义物品的基础稀有度。可选值为`common`（普通）、`uncommon`（少见）、`rare`（稀有）、`epic`（传奇）。
</treeview>

**字符串型**：

<treeview>
- <DataType type="string" name="minecraft:rarity"/>：定义物品的基础稀有度。可选值为`common`（普通）、`uncommon`（少见）、`rare`（稀有）、`epic`（传奇）。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:rarity": {
    "value": "rare"
}
```

**字符串型**：

```json showLineNumbers
"minecraft:rarity": "rare"
```

</TabItem></Tabs>

---

### `minecraft:record`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10"/> <br/>

定义物品为唱片。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:record"/>：根对象。
  - <DataType type="int" name="comparator_signal"/>：在唱片机中通过红石信号输出的信号，应在`1`-`13`之间。默认值为`1`。
  - <DataType type="float" name="duration"/>：音乐时长，单位秒。
  - <DataType type="string" name="sound_event"/>：要播放的音效。
</treeview>

</TabItem><TabItem value="example" label="示例">

[**官方给出的自定义物品实例**](https://github.com/microsoft/minecraft-samples/blob/main/custom_items/behavior_packs/custom_item/items/my_sword_singing.json)：

```json showLineNumbers
"minecraft:record": {
    "comparator_signal": 1,
    "duration": 5,
    "sound_event": "pre_ram.screamer"
}
```

</TabItem></Tabs>

---

### `minecraft:repairable`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10"/> <br/>

定义物品为可修复的。默认情况下，允许此物品和另一个同种类的物品在一起修复（例如两把损坏铁镐合成一把较新的铁镐），此时恢复的耐久度为二者相加。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:repairable"/>：根对象。
  - <DataType type="array" name="repair_items"/>：可用于修复的物品及其修复耐久度值的列表。
    - <DataType type="object"/>：可修复的物品项目
      - <DataType type="int"/><DataType type="string" name="repair_amount"/>：物品恢复的耐久度。当指定为整数时，恢复固定的耐久度值；指定为字符串时，可指定为一个 Molang，可使用`context.other`指定铁砧另一个槽位的物品。
      - <DataType type="array" name="items" isRequired/>：可用于修复的物品列表。
        - <DataType type="string"/>：可用于修复的物品 ID。
</treeview>

</TabItem><TabItem value="example" label="示例">

铁砧修复：指定用什么物品修复、每次修回多少耐久。

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

按原版计算公式修复（两物品的剩余耐久度 + 该类物品满耐久度 \* 0.05）：

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

</TabItem></Tabs>

---

### `minecraft:shooter`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:use_modifiers组件。"/> <br/>

定义物品为某种弹射物的发射物，类似于弓或弩。

另见：_[`minecraft:use_modifiers`](#minecraftuse_modifiers)组件_。

:::info[提示]

若通过[`minecraft:durability`](#minecraftdurability)定义了发射物的耐久度，该物品将仅在发射子弹时降低耐久度。近战攻击时该物品的耐久度将不受影响。

:::

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:shooter"/>：根对象。
  - <DataType type="array" name="ammunition"/>：定义该发射物使用何种子弹。
    - <DataType type="object"/>
      - <DataType type="string" name="item" isRequired/>：子弹所对应的物品 ID。该物品 ID 对应的物品必须具有[`minecraft:projectile`](#minecraftprojectile)组件，否则将会报错。
      - <DataType type="boolean" name="use_offhand"/>：是否允许使用副手上的子弹，像弩和烟花一样。默认值为`false`。
      - <DataType type="boolean" name="search_inventory"/>：是否搜索物品栏中是否有子弹可用，创造模式下不会消耗子弹。默认值为`false`，但通常设置为`true`。
      - <DataType type="boolean" name="use_in_creative"/>：是否在创造模式下可用。若设置为`false`，则无法在物品栏中没有子弹时使用。默认值为`false`。
  - <DataType type="boolean" name="charge_on_draw"/>：拉动时是否蓄力充能。默认值为`false`。
  - <DataType type="float" name="max_draw_duration"/>：拉动最长时间。应小于等于[`minecraft:use_modifiers`](#minecraftuse_modifiers)或[`minecraft:use_duration`](#minecraftuse_duration)组件定义的使用时长，默认值为`0`。
  - <DataType type="boolean" name="scale_power_by_draw_duration"/>：是否随着拉动时间的增长而增加对应子弹（弹射物）发射时威力，默认值为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

弓、弩：设置弹药、蓄力时长与发射力度。

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

</TabItem></Tabs>

---

### `minecraft:should_despawn`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20"/> <br/>

定义该物品对应的掉落物是否会在一段时间后消失。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:should_despawn"/>：根对象。
  - <DataType type="boolean" name="value"/>：掉落物是否会在一段时间后消失，默认为`true`。
</treeview>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:should_despawn"/>：掉落物是否会在一段时间后消失，默认为`true`。
</treeview>

</TabItem><TabItem value="example" label="示例">

**对象型**：

```json showLineNumbers
"minecraft:should_despawn": {
    "value": false
}
```

**布尔型**：

```json showLineNumbers
"minecraft:should_despawn": false
```

</TabItem></Tabs>

---

### `minecraft:storage_item`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.21.40"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:max_stack_size组件并将最大堆叠设置为1。建议定义minecraft:bundle_interaction组件。"/> <br/>

定义该物品为可存储物品，可以存储其他物品，类似于收纳袋。

另见：_[`minecraft:max_stack_size`](#minecraftmax_stack_size)组件_（将最大堆叠设置为`1`）、_[`minecraft:bundle_interaction`](#minecraftbundle_interaction)组件_（保证交互功能）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:storage_item"/>：根对象。
  - <DataType type="boolean" name="allow_nested_storage_items"/>：是否允许该类物品嵌套存储，例如收纳袋存储收纳袋。默认值为`true`。
  - <DataType type="array" name="allowed_items"/>：允许存储的物品，不在此列名单中的物品无法存储。若设置为空则允许存储一切物品。
    - <DataType type="string"/>：允许存储的物品 ID。
  - <DataType type="array" name="banned_items"/>：禁止存储的物品，在此列名单中的物品无法存储。
    - <DataType type="string"/>：禁止存储的物品 ID。
  - <DataType type="int" name="max_slots"/>：该物品的最大槽位数。默认值为`64`，最大为`64`。
  - <DataType type="int" name="max_weight_limit"/>：<Version add="1.21.40" deprecated="1.21.50" inline/>该物品可存储的最大容量。注：`1.21.60`或更高格式版本请使用[`minecraft:storage_weight_limit`](#minecraftstorage_weight_limit)组件。
  - <DataType type="int" name="weight_in_storage_item"/>：<Version add="1.21.40" deprecated="1.21.50" inline/>该物品在其他可存储物品中占用的容量。注：`1.21.60`或更高格式版本请使用[`minecraft:storage_weight_modifier`](#minecraftstorage_weight_modifier)组件。
</treeview>

</TabItem><TabItem value="example" label="示例">

收纳袋（bundle.json）：把物品变成 64 格容量的容器，并禁止放入潜影盒。

```json showLineNumbers
"minecraft:storage_item": {
    "max_slots": 64,
    "allow_nested_storage_items": true,
    "banned_items": [ "minecraft:shulker_box", "minecraft:undyed_shulker_box" ]
}
```

</TabItem></Tabs>

---

### `minecraft:storage_weight_limit`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.21.60"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:storage_item组件。"/> <br/>

定义该可存储物品最多可以存储多少物品。

另见：_[`minecraft:storage_item`](#minecraftstorage_item)组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:storage_weight_limit"/>：根对象。
  - <DataType type="int" name="max_weight_limit"/>：定义该可存储物品（类似于收纳袋）的最大空间。必须在`0`-`64`之间，默认为`64`。
</treeview>

</TabItem><TabItem value="example" label="示例">

收纳袋（bundle.json）：设置容器可容纳的总容量为 64。

```json showLineNumbers
"minecraft:storage_weight_limit": {
    "max_weight_limit": 64
}
```

</TabItem></Tabs>

---

### `minecraft:storage_weight_modifier`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.21.60"/> <br/>

定义该物品在存储到一个可存储物品时需要占用多大空间。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:storage_weight_modifier"/>：根对象。
  - <DataType type="int" name="weight_in_storage_item"/>：定义该物品在存储到一个可存储物品（类似于收纳袋）时需要占用多大空间。默认为`4`，若为`0`则代表该物品无法存储到其他可存储物品中。
</treeview>

</TabItem><TabItem value="example" label="示例">

收纳袋（bundle.json）：设置该物品放进其他容器时占用的容量。

```json showLineNumbers
"minecraft:storage_weight_modifier": {
    "weight_in_storage_item": 4
}
```

</TabItem></Tabs>

---

### `minecraft:swing_duration`

<Usable type="all"/> <Version add="1.21.120"/> <br/>

定义该物品的挥舞动画（例如攻击、挖掘时）所需时间。仅决定视觉效果，不会影响其他底层机制（例如攻击时间等）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:swing_duration"/>：根对象。
  - <DataType type="float" name="value"/>：定义该物品的挥舞动画所需时间。默认值为`0.3`。
</treeview>

</TabItem><TabItem value="example" label="示例">

剑、斧：调整挥动动画的时长，控制攻击手感。

```json showLineNumbers
"minecraft:swing_duration": {
    "value": 0.3
}
```

</TabItem></Tabs>

---

### `minecraft:swing_sounds`

<Usable type="all"/> <Version add="1.21.130"/> <br/>

定义该物品的挥舞音效。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:swing_sounds"/>：根对象。
  - <DataType type="string" name="attack_miss"/>：定义未击中时的音效。
  - <DataType type="string" name="attack_hit"/>：定义击中时的音效。
  - <DataType type="string" name="attack_critical_hit"/>：定义暴击时的音效。
</treeview>

</TabItem><TabItem value="example" label="示例">

剑、斧：分别指定落空、命中与暴击时的音效。

```json showLineNumbers
"minecraft:swing_sounds": {
    "attack_critical_hit": "attack.critical"
}
```

</TabItem></Tabs>

---

### `minecraft:throwable`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.10"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:projectile组件。"/> <br/>

定义该物品可掷出，类似于雪球或鸡蛋。

另见：_[`minecraft:projectile`](#minecraftprojectile)组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:throwable"/>：根对象。
  - <DataType type="boolean" name="do_swing_animation"/>：物品掷出后是否播放摆手动画。
  - <DataType type="float" name="launch_power_scale"/>：投掷时威力随蓄力增长的倍率。默认值为`1.0`。设置负值将导致弹射物以反方向掷出。
  - <DataType type="float" name="min_draw_duration"/>：最短蓄力时间，单位秒。蓄力未达到最短蓄力时间则无法掷出弹射物。默认为`0.0`。
  - <DataType type="float" name="max_launch_power"/>：弹射物的最大威力（以保证弹射物的威力不会无限增大）。
  - <DataType type="boolean" name="scale_power_by_draw_duration"/>：是否随着蓄力时间的增长而增加弹射物掷出时的威力，默认值为`false`。
  - <DataType type="float" name="max_draw_duration"/> <Highlight text="限定参数" tooltip="该参数需要配合scale_power_by_draw_duration=true使用。" inline/> 最长蓄力时间，单位秒。通过该参数以限制弹射物掷出的最大威力。应小于等于[`minecraft:use_modifiers`](#minecraftuse_modifiers)或[`minecraft:use_duration`](#minecraftuse_duration)组件定义的使用时长，默认值为`0`。
</treeview>

</TabItem><TabItem value="example" label="示例">

风弹（wind_charge.json）：做成可投掷物，投掷时播放挥手动画、力度为 1.5。

```json showLineNumbers
"minecraft:throwable": {
    "do_swing_animation": true,
    "launch_power_scale": 1.5,
    "max_launch_power": 1.5
}
```

</TabItem></Tabs>

---

### `minecraft:use_animation`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20" tooltip="在更旧的版本下使用已废弃的同名组件。"/> <br/>

定义物品的使用动画。

<Tabs><TabItem value="parameters" label="参数" default>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:use_animation"/>：根对象。
  - <DataType type="string" name="value"/>：使用物品时播放的动画，可选值为`eat`、`drink`、`bow`、`block`、`camera`、`crossbow`、`none`、`brush`、`spear`、`spyglass`，不使用该组件时则不播放动画。
</treeview>

**字符串型**：

<treeview>
- <DataType type="string" name="minecraft:use_animation"/>：使用物品时播放的动画，可选值为`eat`、`drink`、`bow`、`block`、`camera`、`crossbow`、`none`、`brush`、`spear`、`spyglass`，不使用该组件时则不播放动画。
</treeview>

</TabItem><TabItem value="example" label="示例">

苹果（apple.json）：食用时播放进食动画。

**对象型**：

```json showLineNumbers
"minecraft:use_animation": {
    "value": "eat"
}
```

**字符串型**：

```json showLineNumbers
"minecraft:use_animation": "eat"
```

</TabItem></Tabs>

---

### `minecraft:use_modifiers`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.50" tooltip="在更旧的版本下使用minecraft:use_duration组件。"/> <br/>

定义物品使用修饰器。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:use_modifiers"/>：根对象。
  - <DataType type="float" name="use_duration"/>：使用时长。例如苹果的该值为`1.6`。默认值为`0`。
  - <DataType type="float" name="movement_modifier"/>：定义玩家使用物品时的速度倍率，必须小于等于`1`。例如苹果的该值为`0.35`。
  - <DataType type="boolean" name="emit_vibrations"/>：<Version add="1.21.120" inline/>定义玩家使用物品时是否发出振动。
  - <DataType type="string" name="start_sound"/>：<Version add="1.21.130" inline/>定义玩家在使用物品后播放何种音效。
  - <DataType type="string" name="start_using"/>：<Version add="1.26.30" inline/>定义该组件何时去抢占「开始使用物品」这一动作。可选值为`always`（无论是否有其他组件已经开始使用该物品，都尝试开始使用）和`if_first`（仅在没有其他组件尝试开始使用该物品时，才尝试开始使用）。格式版本低于`1.26.30`时默认值为`always`，`1.26.30`及更高时默认值为`if_first`。
</treeview>

:::note[编者注]

同一物品上可能有多个组件都会在玩家按下使用键时启动「使用」状态：`minecraft:use_modifiers`负责使用时长与移动减速，`minecraft:shooter`负责蓄力拉弓，`minecraft:food`负责进食，等等。它们之间会争抢「谁来开始这次使用」，`start_using`就是`minecraft:use_modifiers`的退让开关。

- 设为`if_first`时，只要别的组件（例如带蓄力时长的`minecraft:shooter`）先开始了使用，本组件就不介入，弓类物品因此能正常蓄力与发射。
- 设为`always`时，本组件无论如何都会开始使用，可能会与上述蓄力流程冲突。

`1.26.30`之前的格式版本没有这个开关，行为等同于`always`；从`1.26.30`起默认改为`if_first`，以修复同时带有`minecraft:shooter`的物品无法正常蓄力的漏洞。

:::

</TabItem><TabItem value="example" label="示例">

苹果（apple.json）：设置 1.6 秒的使用时长与 0.35 倍的移动减速。

```json showLineNumbers
"minecraft:use_modifiers": {
    "use_duration": 1.6,
    "movement_modifier": 0.35,
    "emit_vibrations": true,
    "start_sound": "random.orb",
    "start_using": "if_first"
}
```

```json showLineNumbers
"minecraft:use_modifiers": {
    "use_duration": 3
}
```

</TabItem></Tabs>

---

### `minecraft:wearable`

<Usable type="all" tooltip="但必须是定义在items/下的国际版物品。"/> <Version add="1.20.20"/> <br/>

定义该物品为可穿戴物品，例如盔甲。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:wearable"/>：根对象。
  - <DataType type="string" name="slot" isRequired/>：定义可穿戴的位置。可选值：`slot.weapon.mainhand`、`slot.weapon.offhand`、`slot.armor.head`、`slot.armor.chest`、`slot.armor.legs`、`slot.armor.feet`、`slot.armor.body`（用于马铠、狼铠等整体装备）。
  - <DataType type="int" name="protection"/>：物品可提供的护甲值。默认为`0`。
  - <DataType type="boolean" name="hides_player_location"/>：（1.21.90+）穿戴后是否在定位栏中隐藏玩家位置。
</treeview>

</TabItem><TabItem value="example" label="示例">

头盔、胸甲、靴子：指定穿戴槽位与护甲值。

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

</TabItem></Tabs>

---

---

## 中国版组件

仅中国版可用的组件。中国版组件只适用于定义在<FileType type="folder" name="netease_items_beh"/>和<FileType type="folder" name="netease_items_res"/>中的物品（即中国版物品）。

中国版物品亦可使用格式版本在 1.10-1.16.0 之间的国际版旧物品组件和[`minecraft:tags`](#minecrafttags)组件。中国版物品支持的国际版组件包括：

[`minecraft:foil`](#minecraftfoil)、[`minecraft:food`](#minecraftfood-1)（旧版）、[`minecraft:hand_equipped`](#minecrafthand_equipped-1)（旧版）、[`minecraft:hover_text_color`](#minecrafthover_text_color-1)（旧版）、[`minecraft:icon`](#minecrafticon-1)（旧版）、[`minecraft:max_damage`](#minecraftmax_damage)、[`minecraft:max_stack_size`](#minecraftmax_stack_size-1)（旧版）、[`minecraft:seed`](#minecraftseed)、[`minecraft:stacked_by_data`](#minecraftstacked_by_data-1)（旧版）、[`minecraft:use_animation`](#minecraftuse_animation-1)（旧版）、[`minecraft:use_duration`](#minecraftuse_duration)、[`minecraft:tags`](#minecrafttags)。

---

### `netease:allow_offhand`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <Highlight text="组件冲突" tooltip="使用该组件的物品，在放到副手后可能无法支持minecraft:foil、netease:render_offsets等组件。" color="red"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-allow-offhand"/>

允许玩家将物品放在副手。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:allow_offhand"/>：根对象。
  - <DataType type="boolean" name="value" isRequired/>：是否能将物品放在副手。
</treeview>

</TabItem><TabItem value="example" label="示例">

允许物品装备到副手槽。

```json showLineNumbers
"netease:allow_offhand": {
    "value": true
}
```

</TabItem></Tabs>

---

### `netease:armor`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-armor"/>

定义物品为盔甲。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:armor"/>：根对象。
  - <DataType type="int" name="defense"/>：定义盔甲的防御值。默认值为`0`。
  - <DataType type="int" name="enchantment"/>：定义盔甲的附魔能力。默认值为`0`。
  - <DataType type="int" name="armor_slot" isRequired/>：定义盔甲槽位。可选值为`0`（头盔）、`1`（胸甲）、`2`（护腿）、`3`（靴子）。
  - <DataType type="int" name="toughness"/>：定义盔甲韧性，应在`0`-`20`之间（含）。默认值为`0`。
  - <DataType type="float" name="knockback_resistance"/>：定义盔甲的击退抗性，应在`0`-`1`之间（含）。默认值为`0.0`。
</treeview>

</TabItem><TabItem value="example" label="示例">

中国版护甲：设置护甲值与护甲材质类型。

```json showLineNumbers
"netease:armor":{
    "defense": 10,
    "enchantment": 4,
    "armor_slot": 0
}
```

</TabItem></Tabs>

---

### `netease:bucket`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <Highlight text="需要前置描述" tooltip="要使用该组件，需在物品描述中将custom_item_type设置为bucket。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-bucket"/>

定义该物品为桶。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:bucket"/>：根对象。
  - <DataType type="string" name="fill_liquid"/>：定义使用时倒出的流体方块 ID。默认值为`flowing_water`。
</treeview>

</TabItem><TabItem value="example" label="示例">

把物品做成桶类物品，可装入或倒出指定方块。

```json showLineNumbers
"netease:bucket": {
    "fill_liquid": "flowing_water"
}
```

</TabItem></Tabs>

---

### `netease:compostable`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-compostable"/>

定义物品可在堆肥桶中用于堆肥。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="float" name="netease:compostable"/>：有百分之多少的概率会堆肥成功。例如设置为 50 时则有 50% 的概率堆肥成功。
</treeview>

</TabItem><TabItem value="example" label="示例">

中国版堆肥：设置堆肥成功率。

```json showLineNumbers
"netease:compostable": 50
```

</TabItem></Tabs>

---

### `netease:cooldown`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <Highlight text="组件冲突" tooltip="定义了食物组件minecraft:food的物品，其冷却需在食物组件中定义。" color="red"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-cooldown"/>

定义物品使用后的冷却。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:cooldown"/>：根对象。
  - <DataType type="string" name="category"/>：冷却类型，共享同种冷却类型的物品将会一起进入冷却阶段。默认值为`item`。
  - <DataType type="int" name="duration"/>：冷却时间，单位为游戏刻。
</treeview>

</TabItem><TabItem value="example" label="示例">

中国版冷却：设置使用后的冷却时长（以游戏刻计）。

```json showLineNumbers
"netease:cooldown": {
    "category": "item",
    "duration": 10
}
```

</TabItem></Tabs>

---

### `netease:customtips`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-customtips"/>

定义物品的描述信息。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:customtips"/>：根对象。
  - <DataType type="string" name="value" isRequired/>：物品的描述信息。
</treeview>

</TabItem><TabItem value="example" label="示例">

为物品追加自定义的悬浮提示文本。

```json showLineNumbers
"netease:customtips": {
    "value": "§8右键可发射"
}
```

</TabItem></Tabs>

---

### `netease:egg`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <Highlight text="需要前置描述" tooltip="要使用该组件，需在物品描述中将custom_item_type设置为egg。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-egg"/>

定义物品可生成实体。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:egg"/>：根对象。
  - <DataType type="string" name="entity"/>：生成的实体的 ID。
</treeview>

</TabItem><TabItem value="example" label="示例">

把物品做成刷怪蛋，生成指定生物。

```json showLineNumbers
"netease:egg": {
    "entity": "minecraft:sheep"
}
```

</TabItem></Tabs>

---

### `netease:enchant_material`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-enchant-material"/>

定义物品为附魔材料，类似于青金石。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:enchant_material"/>：根对象。
  - <DataType type="boolean" name="value" isRequired/>：物品是否为附魔材料。
</treeview>

</TabItem><TabItem value="example" label="示例">

设置物品作为附魔材料时的附魔能力。

```json showLineNumbers
"netease:enchant_material": {
    "value": true
}
```

</TabItem></Tabs>

---

### `netease:fire_resistant`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-fire-resistant"/>

定义物品防火，类似于下界合金物品。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:fire_resistant"/>：根对象。
  - <DataType type="boolean" name="value" isRequired/>：物品是否防火。
</treeview>

</TabItem><TabItem value="example" label="示例">

让物品掉入岩浆后不被烧毁。

```json showLineNumbers
"netease:fire_resistant": {
    "value": true
}
```

</TabItem></Tabs>

---

### `netease:fishing_hook`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <Highlight text="需要前置描述" tooltip="要使用该组件，需在物品描述中将custom_item_type设置为fishing_rod。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/1-%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E5%93%81/9-%E8%87%AA%E5%AE%9A%E4%B9%89%E9%B1%BC%E7%AB%BF.html"/>

定义物品是一种钓鱼竿。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:fishing_hook"/>：根对象。
  - <DataType type="string" name="hook_entity" isRequired/>：浮漂使用的实体 ID。
  - <DataType type="int" name="line_max"/>：鱼线的最大释放长度。默认为`32`。
  - <DataType type="array" name="line_color"/>：鱼线的颜色。应为<DataType type="float"/>的四元数组，4 个数依次对应`RGBA`，应在`0.0`-`1.0`间（含）。默认值为`[0.0, 0.0, 0.0, 1.0]`（黑色）。
</treeview>

</TabItem><TabItem value="example" label="示例">

把物品做成鱼钩，用于钓鱼玩法。

```json showLineNumbers
"netease:fishing_hook": {
    "line_max": 12.0,
    "line_color": [0.6, 0.5, 0.3, 1.0],
    "hook_entity": "minecraft:cat"
}
```

</TabItem></Tabs>

---

### `netease:frame_anim_in_scene`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_res/下的中国版物品。"/> <Highlight text="资源包组件" tooltip="该组件必须在资源包的物品定义中定义。" color="lightblue"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-frame-anim-in-scene"/>

定义物品的序列帧。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:frame_anim_in_scene"/>：根对象。
  - <DataType type="string" name="texture_path" isRequired/>：序列帧图集贴图的路径，从`textures/`开始，不带后缀，例如`textures/items/watch_atlas`。
  - <DataType type="int" name="ticks_per_frame" isRequired/>：代表多少帧切换一次贴图，按 1 秒 20 帧算，设置 20 的话即为 1 秒切换一帧贴图。
  - <DataType type="boolean" name="blend_frames"/>：切换贴图的时候是否混合上一帧。官方文档未说明该字段，有待验证。
</treeview>

</TabItem><TabItem value="example" label="示例">

用于液体、动态方块等需要在场景中播放序列帧动画的物品。

```json showLineNumbers
"netease:frame_anim_in_scene": {
    "texture_path": "textures/items/watch_atlas",
    "ticks_per_frame": 1
}
```

</TabItem></Tabs>

---

### `netease:frame_animation`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_res/下的中国版物品。"/> <Highlight text="资源包组件" tooltip="该组件必须在资源包的物品定义中定义。" color="lightblue"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-frame-animation"/>

定义蓄力物品的序列帧。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:frame_animation"/>：根对象。
  - <DataType type="string" name="texture_name" isRequired/>：`item_texture.json`中定义的序列帧数组。
  - <DataType type="int" name="frame_count"/>：定义序列帧帧数。默认值为`1`。
  - <DataType type="boolean" name="animate_in_toolbar"/>：在物品栏中是否支持动画。默认值为`true`。
</treeview>

</TabItem><TabItem value="example" label="示例">

为物品图标设置序列帧动画。

```json showLineNumbers
"netease:frame_animation": {
    "frame_count": 3,
    "texture_name": "bow_pulling",
    "animate_in_toolbar": true
}
```

</TabItem></Tabs>

---

### `netease:fuel`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-fuel"/>

定义该物品为燃料。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:fuel"/>：根对象。
  - <DataType type="float" name="duration"/>：定义燃料在熔炉中的燃烧时长，单位秒。
</treeview>

</TabItem><TabItem value="example" label="示例">

设置物品作为燃料时的燃烧时长。

```json showLineNumbers
"netease:fuel": {
    "duration": 80.0
}
```

</TabItem></Tabs>

---

### `netease:initial_user_data`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-initial-user-data"/>

定义物品的初始属性。

<Tabs><TabItem value="parameters" label="参数" default>

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
  - <DataType type="boolean" name="minecraft:keep_on_death"/>：物品在玩家死亡时是否保留（即死亡后不掉落）。默认值为`false`。
  - <DataType type="int" name="minecraft:item_lock"/>：指定物品锁定。可选值为`0`（不锁定）、`1`（无法移动）、`2`（无法丢弃），默认为`0`。
  - 其他可用键名及可用值请参考[基岩版物品格式 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/基岩版存档格式#物品格式)。
</treeview>

</TabItem><TabItem value="example" label="示例">

为物品写入初始的`userData`，供脚本读取。

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

</TabItem></Tabs>

---

### `netease:liquid_clipped`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/5-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B5%81%E4%BD%93.html?catalog=1" />

定义是否可以和流体交互并触发对应的脚本事件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="boolean" name="netease:liquid_clipped"/>：是否可以和流体交互。默认为`false`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

```json showLineNumbers
"netease:liquid_clipped": true
```

</TabItem></Tabs>

---

### `netease:projectile`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-projectile"/>

定义物品为弹射物。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="string" name="netease:projectile"/>：定义将掷出的弹射物。
</treeview>

</TabItem><TabItem value="example" label="示例">

把物品做成可发射的弹射物。

```json showLineNumbers
"netease:projectile": "minecraft:snowball"
```

</TabItem></Tabs>

---

### `netease:render_offsets`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-render-offsets"/>

定义该物品在右手时的渲染偏移。

<Tabs><TabItem value="parameters" label="参数" default>

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

</TabItem><TabItem value="example" label="示例">

修正手持物品的渲染偏移，解决穿模或位置异常。

```json showLineNumbers
"netease:render_offsets": {
    "controller_position_adjust": [0.0, 0.1, 0.0],
    "controller_rotation_adjust": [0.0, -45.0, 0.0],
    "controller_scale": 1
}
```

</TabItem></Tabs>

---

### `netease:shield`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <Highlight text="需要前置描述" tooltip="要使用该组件，需在物品描述中将custom_item_type设置为shield。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-shield"/>

定义该物品为盾。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:shield"/>：根对象
  - <DataType type="array" name="defence_damage_source_list"/>：防御的伤害类型。为空时默认设置为原版的格挡伤害逻辑。
    - <DataType type="string"/>：伤害类型。可见`/damage`命令的可用伤害类型。
  - <DataType type="array" name="undefence_damage_source_list"/>：不防御的伤害类型。不宜和`defence_damage_source_list`存在相同元素。
    - <DataType type="string"/>：伤害类型。可见`/damage`命令的可用伤害类型。
  - <DataType type="boolean" name="is_consume_damage"/>：是否消耗物品的耐久度。
</treeview>

</TabItem><TabItem value="example" label="示例">

把物品做成盾牌，可格挡伤害。

```json showLineNumbers
"netease:shield":{
    "defence_damage_source_list": [ "drowning" ],
    "undefence_damage_source_list": [ "entity_attack" ],
    "is_consume_damage": false
}
```

</TabItem></Tabs>

---

### `netease:show_in_hand`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-show-in-hand"/>

手持时是否显示该物品。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:show_in_hand"/>：根对象
  - <DataType type="boolean" name="value" isRequired/>：手持时是否显示该物品。
</treeview>

</TabItem><TabItem value="example" label="示例">

控制物品被手持时是否渲染。

```json showLineNumbers
"netease:show_in_hand": {
    "value": true
}
```

</TabItem></Tabs>

---

### `netease:weapon`

<Usable type="onlyChina" tooltip="且必须是定义在netease_items_beh/下的中国版物品。"/> <Highlight text="需要前置描述" tooltip="要使用该组件，需在物品描述中将custom_item_type设置为weapon。"/> <br/>

<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#netease-weapon"/>

定义该物品为武器。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="netease:weapon"/>：根对象
  - <DataType type="string" name="type" isRequired/>：武器或工具类型，可选值：`"sword"`、`"shovel"`、`"pickaxe"`、`"hatchet"`（斧头）、`"hoe"`。
  - <DataType type="int" name="level" isRequired/>：武器或工具的挖掘等级，可选值：`0`（木制或金制工具）、`1`（石制工具）、`2`（铁制工具）、`3`（钻制工具）。详见[网易提供的官方文档](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/2-自定义武器及工具.html#网易components)。
  - <DataType type="int" name="speed"/>：武器或工具挖掘方块的基础速度。默认值为`0`。
  - <DataType type="int" name="attack_damage"/>：武器或工具的攻击伤害。默认值为`0`。
  - <DataType type="int" name="enchantment"/>：武器或工具的附魔能力。默认值为`0`。
</treeview>

</TabItem><TabItem value="example" label="示例">

把物品做成武器，设置伤害与攻击相关属性。

```json showLineNumbers
"netease:weapon": {
    "type": "sword",
    "level": 3,
    "speed": 8,
    "attack_damage": 7,
    "enchantment": 10
}
```

</TabItem></Tabs>

---

## 弃用组件

以下组件仅限旧版本的物品适用，因这些组件曾在非实验性物品中可用，故本文档也一并列出，但除中国版物品外，强烈不推荐使用。

### `minecraft:block`

<Usable type="onlyInternational"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用minecraft:block_placer组件代替之。"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>

定义物品可以放置为方块。

另见：_[`minecraft:block_placer`](#minecraftblock_placer)组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="string" name="minecraft:block"/>：将放置为何种方块。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：让物品与方块绑定，使其可放置该方块。

```json showLineNumbers
"minecraft:block": "minecraft:camera"
```

</TabItem></Tabs>

---

### `minecraft:foil`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用minecraft:glint组件代替之。"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-foil"/>

定义该物品会像附魔书一样产生附魔光泽。

另见：_[`minecraft:glint`](#minecraftglint)组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="boolean" name="minecraft:foil"/>：物品是否有附魔光泽，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：为物品添加附魔光效，常用于收藏品。

```json showLineNumbers
"minecraft:foil": true
```

</TabItem></Tabs>

---

### `minecraft:food`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用同名组件代替之，可能会需要脚本功能。"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:use_duration组件。"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-food"/>

定义物品为食物。

另见：_[`minecraft:food`](#minecraftfood)组件（新版）_、_[`minecraft:use_duration`](#minecraftuse_duration)组件_。

<Tabs><TabItem value="parameter" label="参数" default>

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
  - <DataType type="string" name="on_use_action"/>：食物在食用完毕后的行为。可选值：`chorus_teleport`、`suspicious_stew_effect`、`none`，默认为`none`。
  - <DataType type="array" name="on_use_range"/>：食物在食用完毕后的影响范围。仅在`on_use_action`指定为`chorus_teleport`时有意义，代表随机传送的范围。
    - <DataType type="float"/>0：X 轴偏移，默认值为`0.0`。
    - <DataType type="float"/>1：Y 轴偏移，默认值为`0.0`。
    - <DataType type="float"/>2：Z 轴偏移，默认值为`0.0`。
  - <DataType type="string" name="cooldown_type"/>：食物在使用后进入的冷却类型，共享同种冷却类型的物品将会一起进入冷却阶段。
  - <DataType type="int" name="cooldown_time"/>：食物在使用后进入的冷却时间，单位为游戏刻，共享同种冷却类型的物品将会一起进入冷却阶段。
  - <DataType type="boolean" name="can_always_eat"/>：食物是否在任何情况下都可食用，否则仅当玩家的饥饿值不满时才可食用。
  - <DataType type="array" name="effects"/>：食物在食用后提供的状态效果。
    - <DataType type="object"/>：状态效果信息。
      - <DataType type="string" name="name"/>：提供的状态效果 ID。
      - <DataType type="float" name="chance"/>：有多大的几率提供这个状态效果。应在`0.0`-`1.0`之间（含）。不同状态效果间，该值是独立判断的。
      - <DataType type="int" name="duration"/>：提供的状态效果时长，单位秒（即使是瞬时状态效果）。
      - <DataType type="int" name="amplifier"/>：提供的状态效果放大倍数，提供的等级为放大倍数 + 1。
  - <DataType type="array" name="remove_effects"/>：食物在食用后解除的状态效果。
    - <DataType type="string"/>：解除的状态效果 ID。
</treeview>

</TabItem><TabItem value="example" label="示例">

**紫颂果**：

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

**金苹果**：

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

</TabItem></Tabs>

---

### `minecraft:hand_equipped`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用同名组件代替之。"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-hand-equipped"/>

定义该物品像工具一样直立展示在玩家手中。

另见：_[`minecraft:hand_equipped`](#minecrafthand_equipped)组件（新版）_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="boolean" name="minecraft:hand_equipped"/>：是否在手中像工具一样展示物品，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：让物品以工具的方式手持渲染。

```json showLineNumbers
"minecraft:hand_equipped": true
```

</TabItem></Tabs>

---

### `minecraft:hover_text_color`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用同名组件代替之。"/> <Highlight text="资源包组件" tooltip="该组件必须在资源包的物品定义中定义。" color="lightblue"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-hover-text-color"/>

定义物品悬浮文本的颜色。

另见：_[`minecraft:hover_text_color`](#minecrafthover_text_color)组件（新版）_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="string" name="minecraft:hover_text_color"/>：设置物品的悬浮文本颜色。可选值为格式化代码对应的名称，详见[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/格式化代码#颜色代码) 对应的名称一列。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：设置物品名称的颜色。

```json showLineNumbers
"minecraft:hover_text_color": "aqua"
```

</TabItem></Tabs>

---

### `minecraft:icon`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用同名组件代替之。"/> <Highlight text="资源包组件" tooltip="该组件必须在资源包的物品定义中定义。" color="lightblue"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-icon"/>

定义物品的图标。

另见：_[`minecraft:icon`](#minecrafticon)组件（新版）_。

:::danger[重要组件]

对于任何自定义物品，都必须定义该组件。否则，物品将无法正确展示贴图。

:::

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="string" name="minecraft:icon" isRequired/>：该物品的默认贴图。Minecraft 将会试图找到在资源包中定义的`textures/item_texture.json`的短 ID。详见[`item_texture.json`](./description#item_texturejson)。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：指定物品的图标短 ID。

```json showLineNumbers
"minecraft:icon": "apple"
```

</TabItem></Tabs>

---

### `minecraft:max_damage`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用minecraft:durability组件代替之。"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-max-damage"/>

定义物品的耐久度。

另见：_[`minecraft:durability`](#minecraftdurability)组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="int" name="minecraft:max_damage"/>：该物品的耐久度。应在`0`-`32767`之间（含）。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：设置物品的最大耐久。

```json showLineNumbers
"minecraft:max_damage": 1000
```

</TabItem></Tabs>

---

### `minecraft:max_stack_size`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用同名组件代替之。"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-max-stack-size"/>

定义物品的最大堆叠数。

另见：_[`minecraft:max_stack_size`](#minecraftmax_stack_size)组件（新版）_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="int" name="minecraft:max_stack_size"/>：物品的最大堆叠数，默认为`64`。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：设置物品的最大堆叠数量。

```json showLineNumbers
"minecraft:max_stack_size": 16
```

</TabItem></Tabs>

---

### `minecraft:seed`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用minecraft:block_placer组件代替之。"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-seed"/>

定义物品为种子。

另见：_[`minecraft:block_placer`](#minecraftblock_placer)组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:seed"/>：根对象。
  - <DataType type="string" name="crop_result"/>：种植后放置的方块。
  - <DataType type="array" name="plant_at"/>：可被种植的方块列表。
    - <DataType type="string"/>：方块 ID。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：把物品标记为种子，可种在耕地上。

```json showLineNumbers
"minecraft:seed": {
    "crop_result": "sweet_berry_bush",
    "plant_at": [ "grass", "dirt", "podzol" ]
}
```

</TabItem></Tabs>

---

### `minecraft:stacked_by_data`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用同名组件代替之。"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-stacked-by-data"/>

定义是否允许不同数据值的同种物品堆叠。

另见：_[`minecraft:stacked_by_data`](#minecraftstacked_by_data)组件（新版）_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="boolean" name="minecraft:stacked_by_data"/>：是否允许不同数据值的物品或掉落物堆叠，默认为`false`。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：按数据值分别堆叠，例如不同颜色的羊毛。

```json showLineNumbers
"minecraft:stacked_by_data": true
```

</TabItem></Tabs>

---

### `minecraft:use_animation`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用同名组件代替之。"/> <Highlight text="资源包组件" tooltip="该组件必须在资源包的物品定义中定义。" color="lightblue"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="我的世界开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-use-animation"/>

定义物品的使用动画。

另见：_[`minecraft:use_animation`](#minecraftuse_animation)组件（新版）_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="string" name="minecraft:use_animation"/>：使用物品时播放的动画，可选值为`eat`、`drink`、`bow`、`block`、`camera`、`crossbow`、`none`、`brush`、`spear`、`spyglass`，不使用该组件时则不播放动画。
</treeview>

</TabItem><TabItem value="example" label="示例">

旧版格式：设置物品使用时的动画，例如食用时播放进食动作。

```json showLineNumbers
"minecraft:use_animation": "eat"
```

</TabItem></Tabs>

---

### `minecraft:use_duration`

<Usable type="all"/> <Version add="1.10" deprecated="1.16.0" tooltip="在高版本使用minecraft:use_modifiers组件代替之。"/> <Version add="1.20.20" deprecated="1.20.50" tooltip="在高版本使用minecraft:use_modifiers组件代替之。"/> <Highlight text="需要前置组件" tooltip="在1.10-1.16.0下，要使用该组件，请事先定义minecraft:food组件。"/> <br/>

<Button text="bedrock.dev" url="https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item"/>
<Button text="中国版开发者官网" url="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1#minecraft-use-duration"/>

定义该物品的使用时长。

另见：_[`minecraft:use_modifiers`](#minecraftuse_modifiers)组件_、_[`minecraft:food`](#minecraftfood-1)组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<Version add="1.10" deprecated="1.16.0"/>：

<treeview>
- <DataType type="int" name="minecraft:use_duration"/>：该物品的使用时长。单位为游戏刻，默认值为`32`。  
</treeview>

<Version add="1.20.20" deprecated="1.20.40"/>

<treeview>
- <DataType type="float" name="minecraft:use_duration"/>：该物品的使用时长。单位为秒，默认值为`1.6`。  
</treeview>

</TabItem><TabItem value="example" label="示例">

**1.10-1.16.0格式版本**：

```json showLineNumbers
"minecraft:use_duration": 32
```

**1.20.20-1.20.40格式版本**：

```json showLineNumbers
"minecraft:use_duration": 1.6
```

</TabItem></Tabs>

---

---

### `minecraft:custom_components`

<Usable type="all"/> <Version add="1.21.10" deprecated="1.21.90" tooltip="弃用原因：1.21.90 推出了自定义组件 V2。在 1.21.90 或更高版本下的物品定义中不应再使用该组件。"/><br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_custom_components?view=minecraft-bedrock-stable"/>

定义物品的自定义组件。自定义组件的行为需要在世界初始化前事件`WorldInitializeBeforeEvent`中定义。

另见：_自定义物品组件文档中的[ItemComponentRegistry 类](/docs/docs/scripts/sapi/server/system/custom_component#itemcomponentregistry-类)_（注册自定义组件）、_[ItemCustomComponent 接口](/docs/docs/scripts/sapi/server/system/custom_component#itemcustomcomponent-接口)_（实现组件回调）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="array" name="minecraft:custom_components"/>：根数组。
  - <DataType type="string"/>：自定义组件的名称。
</treeview>

</TabItem><TabItem value="example" label="示例">

先在脚本中注册自定义组件，再在物品 JSON 中引用名称以启用对应行为。

```json showLineNumbers
"minecraft:custom_components": [
    "example:on_use"
]
```

</TabItem></Tabs>

---

---

## 已移除组件

以下组件曾在早期的实验性玩法（例如已于 1.21.20 被移除的「假日创作者功能」实验性玩法）或旧版格式的物品中开放，随后被移出游戏，在当前的任何版本、任何格式版本下均无法生效。此处仅作考古与排错之用，**请勿在任何物品中定义**。若你在旧教程或旧存档中见到它们，请按各条目给出的替代方案改写。

### `minecraft:armor`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:armor"/>

定义护甲物品的防护等级。

另见：_[`minecraft:wearable`](#minecraftwearable)组件_（在高版本中用于定义装备槽位与护甲值）、_[`netease:armor`](#neteasearmor)组件_（中国版）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:armor"/>：根对象。
  - <DataType type="int" name="protection"/>：该护甲物品提供的护甲值。最小值为`0`。
  - <DataType type="string" name="texture_type"/>：该护甲使用的纹理类型。可选值为`none`、`leather`、`chain`、`iron`、`diamond`、`gold`、`elytra`、`turtle`、`netherite`。马铠仅支持`leather`、`iron`、`gold`、`diamond`。
</treeview>

</TabItem><TabItem value="example" label="示例">

当年的护甲：设置护甲值与贴图类型，现由`minecraft:wearable`承担。

```json showLineNumbers
"minecraft:armor": {
    "protection": 10,
    "texture_type": "iron"
}
```

</TabItem></Tabs>

---

### `minecraft:chargeable`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_chargeable?view=minecraft-bedrock-stable"/>
<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:chargeable"/>

定义物品为蓄力物品，并在蓄力完成时触发事件。

另见：_[`minecraft:use_modifiers`](#minecraftuse_modifiers)组件_（用于定义使用时长与蓄力时的移动速度）、_[ItemCompleteUseAfterEvent 类](/docs/docs/scripts/sapi/server/world/after_events#itemcompleteuseafterevent-类)_（用于替代`on_complete`触发的事件）、_[ItemCustomComponent 接口](/docs/docs/scripts/sapi/server/system/custom_component#itemcustomcomponent-接口)_（`onCompleteUse`回调）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:chargeable"/>：根对象。
  - <DataType type="float" name="movement_modifier"/>：定义玩家使用物品时的速度倍率，必须小于等于`1`。不设置时玩家的移动速度不变。
  - <DataType type="object" name="on_complete"/>：蓄力完成时触发的事件，结构与旧版事件组件一致。
    - <DataType type="string" name="event" isRequired/>：要触发的事件名称。
    - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`block`（被使用的方块）、`holder`（物品的持有者），默认为`self`。
</treeview>

</TabItem><TabItem value="example" label="示例">

当年的蓄力物品（如食物）：设置蓄力时长与完成时触发的事件。

```json showLineNumbers
"minecraft:chargeable": {
    "movement_modifier": 0.35,
    "on_complete": {
        "event": "example:on_complete",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:creative_category`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:creative_category"/>

定义物品在创造模式物品栏中的分类与分组。

另见：_物品描述中的[`menu_category`](./description#行为包定义格式)，其在`1.20.20.20`后取代了该组件_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:creative_category"/>：根对象。
  - <DataType type="string" name="parent" isRequired/>：该物品所属的分组（本地化键名），例如`itemGroup.name.record`。
  - <DataType type="string" name="category"/>：该物品所属的分类。可选值为`all`（全部分类）、`construction`（建筑）、`nature`（自然）、`equipment`（装备）、`items`（物品）、`commands`（仅命令获取）、`none`（无分类）。
</treeview>

</TabItem><TabItem value="example" label="示例">

当年的物品：注册到创造模式物品栏的分类与分组，现由`menu_category`承担。

```json showLineNumbers
"minecraft:creative_category": {
    "parent": "itemGroup.name.record",
    "category": "items"
}
```

</TabItem></Tabs>

---

### `minecraft:explodable`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:explodable"/>

定义物品的掉落物形式是否可被爆炸摧毁。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="boolean" name="minecraft:explodable"/>：物品的掉落物形式是否可被爆炸摧毁。
</treeview>

</TabItem><TabItem value="example" label="示例">

当年的物品：控制掉落物能否被爆炸摧毁。

```json showLineNumbers
"minecraft:explodable": true
```

</TabItem></Tabs>

---

### `minecraft:knockback_resistance`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:knockback_resistance"/>

定义物品提供的击退抗性。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:knockback_resistance"/>：根对象。
  - <DataType type="float" name="protection"/>：提供的击退抗性。应在`0.0`-`1.0`之间（含），为`1.0`时完全免疫击退。
</treeview>

</TabItem><TabItem value="example" label="示例">

当年的护甲：设置受击时的击退抗性。

```json showLineNumbers
"minecraft:knockback_resistance": {
    "protection": 0.4
}
```

</TabItem></Tabs>

---

### `minecraft:mining_speed`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:mining_speed"/>

定义物品的挖掘速度。

另见：_[`minecraft:digger`](#minecraftdigger)组件_（在高版本中用于按方块定义挖掘速度）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="int" name="minecraft:mining_speed"/>：物品的挖掘速度。应为正整数。
</treeview>

</TabItem><TabItem value="example" label="示例">

当年的工具：设置统一的挖掘速度，现由`minecraft:digger`按方块细分。

```json showLineNumbers
"minecraft:mining_speed": 5
```

</TabItem></Tabs>

---

### `minecraft:on_use`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:on_use"/>

定义物品被使用时触发的事件。

另见：_脚本事件[ItemUseAfterEvent 类](/docs/docs/scripts/sapi/server/world/after_events#itemuseafterevent-类)_、_[ItemCustomComponent 接口](/docs/docs/scripts/sapi/server/system/custom_component#itemcustomcomponent-接口)_（`onUse`回调）、_[物品事件响应](./event_responses)_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_use"/>：根对象。
  - <DataType type="object" name="on_use"/>：物品被使用时触发的事件。
    - <DataType type="string" name="event" isRequired/>：要触发的事件名称。
    - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`block`（被使用的方块）、`holder`（物品的持有者），默认为`self`。
</treeview>

</TabItem><TabItem value="example" label="示例">

当年的物品：被使用时触发自定义事件，现由`ItemUseAfterEvent`或自定义组件的`onUse`承接。

```json showLineNumbers
"minecraft:on_use": {
    "on_use": {
        "event": "example:on_use",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:on_use_on`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:on_use_on"/>

定义物品在方块上使用时触发的事件。

另见：_脚本事件[ItemStartUseOnAfterEvent 类](/docs/docs/scripts/sapi/server/world/after_events#itemstartuseonafterevent-类)_、_[ItemCustomComponent 接口](/docs/docs/scripts/sapi/server/system/custom_component#itemcustomcomponent-接口)_（`onUseOn`回调）、_[物品事件响应](./event_responses)_。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:on_use_on"/>：根对象。
  - <DataType type="object" name="on_use_on"/>：物品在方块上使用时触发的事件。
    - <DataType type="string" name="event" isRequired/>：要触发的事件名称。
    - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`block`（被使用的方块）、`holder`（物品的持有者），默认为`self`。
</treeview>

</TabItem><TabItem value="example" label="示例">

当年的物品：在方块上使用时触发自定义事件。

```json showLineNumbers
"minecraft:on_use_on": {
    "on_use_on": {
        "event": "example:on_use_on",
        "target": "self"
    }
}
```

</TabItem></Tabs>

---

### `minecraft:render_offsets`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:render_offsets"/>

定义手持物品的渲染偏移与大小。

另见：_[`netease:render_offsets`](#neteaserender_offsets)组件_（中国版的同功能组件，与本节内容无关）。

<Tabs><TabItem value="parameters" label="参数" default>

**布尔型**：

<treeview>
- <DataType type="boolean" name="minecraft:render_offsets"/>：为`false`时将禁用该物品的渲染偏移。
</treeview>

**对象型**：

<treeview>
- <DataType type="object" name="minecraft:render_offsets"/>：根对象。官方文档只列出了`scale`，`position`与`rotation`为社区文档记载的写法，有待验证。
  - <DataType type="object" name="main_hand"/>：物品在惯用手时的渲染偏移。
    - <DataType type="object" name="first_person"/>：第一人称时的渲染偏移。
      - <DataType type="array" name="position"/>：物品的位置偏移。应为 3 个浮点数组成的数组，依次对应 X、Y、Z 轴。
      - <DataType type="array" name="rotation"/>：物品的旋转偏移。应为 3 个浮点数组成的数组，依次对应 X、Y、Z 轴。
      - <DataType type="array" name="scale"/>：物品的缩放。应为 3 个浮点数组成的数组，依次对应 X、Y、Z 轴。
    - <DataType type="object" name="third_person"/>：第三人称时的渲染偏移。
      - <DataType type="array" name="position"/>：物品的位置偏移。应为 3 个浮点数组成的数组，依次对应 X、Y、Z 轴。
      - <DataType type="array" name="rotation"/>：物品的旋转偏移。应为 3 个浮点数组成的数组，依次对应 X、Y、Z 轴。
      - <DataType type="array" name="scale"/>：物品的缩放。应为 3 个浮点数组成的数组，依次对应 X、Y、Z 轴。
  - <DataType type="object" name="off_hand"/>：物品在副手时的渲染偏移，结构与`main_hand`相同。
</treeview>

</TabItem><TabItem value="example" label="示例">

**布尔型**：

```json showLineNumbers
"minecraft:render_offsets": false
```

**对象型**：

```json showLineNumbers
"minecraft:render_offsets": {
    "main_hand": {
        "first_person": {
            "position": [0.0, 0.0, 0.0],
            "rotation": [0.0, 0.0, 0.0],
            "scale": [0.01, 0.01, 0.01]
        },
        "third_person": {
            "position": [0.0, 0.0, 0.0],
            "rotation": [0.0, 0.0, 0.0],
            "scale": [0.01, 0.01, 0.01]
        }
    },
    "off_hand": {
        "first_person": {
            "position": [0.0, 0.0, 0.0],
            "rotation": [0.0, 0.0, 0.0],
            "scale": [0.01, 0.01, 0.01]
        },
        "third_person": {
            "position": [0.0, 0.0, 0.0],
            "rotation": [0.0, 0.0, 0.0],
            "scale": [0.01, 0.01, 0.01]
        }
    }
}
```

</TabItem></Tabs>

---

### `minecraft:weapon`

<Usable type="all"/> <Version experimental="假日创作者功能"/> <Version removed/> <br/>

<Button text="基岩版开发 Wiki" url="https://wiki.mcbe-dev.net/p/Manual:Minecraft:weapon"/>

定义物品为武器。这会自动为物品添加伤害信息与攻击事件。

另见：_[`minecraft:damage`](#minecraftdamage)组件_（在高版本中用于定义攻击伤害）、_[ItemCustomComponent 接口](/docs/docs/scripts/sapi/server/system/custom_component#itemcustomcomponent-接口)_（`onHitEntity`、`onMineBlock`回调）、_[物品事件响应](./event_responses)_、脚本事件_[EntityHitBlockAfterEvent 类](/docs/docs/scripts/sapi/server/world/after_events#entityhitblockafterevent-类)_（对应`on_hit_block`）、_[EntityHurtAfterEvent 类](/docs/docs/scripts/sapi/server/world/after_events#entityhurtafterevent-类)_（对应`on_hurt_entity`）、_[EntityHitEntityAfterEvent 类](/docs/docs/scripts/sapi/server/world/after_events#entityhitentityafterevent-类)_（对应`on_not_hurt_entity`）。

<Tabs><TabItem value="parameters" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:weapon"/>：根对象。
  - <DataType type="object" name="on_hit_block"/>：使用该物品击中方块时触发的事件。
    - <DataType type="string" name="event" isRequired/>：要触发的事件名称。
    - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`block`（被使用的方块）、`holder`（物品的持有者），默认为`self`。
  - <DataType type="object" name="on_hurt_entity"/>：使用该物品伤害到实体时触发的事件。
    - <DataType type="string" name="event" isRequired/>：要触发的事件名称。
    - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`block`（被使用的方块）、`holder`（物品的持有者），默认为`self`。
  - <DataType type="object" name="on_not_hurt_entity"/>：使用该物品击中实体但未造成伤害时触发的事件。
    - <DataType type="string" name="event" isRequired/>：要触发的事件名称。
    - <DataType type="string" name="target"/>：事件的作用目标。可选值为`self`（触发者自身）、`other`（被作用的其他实体）、`block`（被使用的方块）、`holder`（物品的持有者），默认为`self`。
</treeview>

</TabItem><TabItem value="example" label="示例">

当年的武器：自动附加伤害信息与攻击事件。

```json showLineNumbers
"minecraft:weapon": {
    "on_hit_block": {
        "event": "example:on_hit_block",
        "target": "self"
    },
    "on_hurt_entity": {
        "event": "example:on_hurt_entity",
        "target": "self"
    },
    "on_not_hurt_entity": {
        "event": "example:on_not_hurt_entity",
        "target": "other"
    }
}
```

</TabItem></Tabs>

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [物品组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponentlist?view=minecraft-bedrock-stable)
- [自定义基础物品 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1)
- [物品文档 | 1.16.20.3 | bedrock.dev](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)
- [物品组件 | Bedrock Wki](https://wiki.bedrock.dev/items/item-components)
- [基岩版开发 Wiki - 数据驱动物品](https://wiki.mcbe-dev.net/p/Manual:%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/%E7%89%A9%E5%93%81)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
