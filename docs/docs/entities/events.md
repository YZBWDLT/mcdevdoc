---
sidebar_position: 3
---

# 实体事件

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

实体事件（Entity Events），又称实体生成事件（Entity Spawn Events），用于规定实体的特定事件。触发实体事件能够更改实体的[组件组](./description#行为包定义格式)、[实体属性](./property)等，从而更加灵活地控制实体的功能。

实体事件可以指定到<DataType type="object" name="events"/>中。

本文档收录所有已开放或即将开放的实体事件信息。你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

**每个组件条目下方的高亮标签均含注释，可鼠标悬停或手机点击查看**。例：<Highlight text="这是一个特殊标签" color="yellowgreen" tooltip="这是标签下的特殊注解。"/>。

:::note[备注]

实体事件随数据驱动实体一同在 0.16 的附加包中公布，早期只有`add`、`remove`、`randomize`、`sequence`等少数响应，如今已扩展到二十余种。早期响应的可用版本已难以考证，本文档以 [bedrock.dev 的 1.2.0](https://bedrock.dev/docs/1.2.0.0/1.2.9.1/Addons) 版本为可用格式版本的最早版本，但这些响应可能在更早就可以应用。

:::

## 事件格式

事件定义在<DataType type="object" name="events"/>下，键为事件 ID，值为一个或多个「事件响应」（Event Response）。同一个事件中可以同时写多个响应，它们会一起生效。

```json showLineNumbers
"events": {
    "minecraft:on_saddled": {
        "remove": {
            "component_groups": ["minecraft:pig_unsaddled"]
        },
        "add": {
            "component_groups": ["minecraft:pig_saddled"]
        }
    }
}
```

多个响应可以组合使用，也可以嵌套`sequence`、`randomize`等结构响应来规定执行顺序与随机性；带条件的响应则依靠`filters`限制执行时机。各响应的具体用法见下文各条目。

---

## 内置事件

以下事件由游戏自动触发，无需手动定义。

### `minecraft:entity_born`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

实体通过繁殖生成时触发。

---

### `minecraft:entity_spawned`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

实体自然生成或通过刷怪蛋生成时触发。手动使用[`/summon`](/docs/docs/commands/all_commands#summon)命令召唤时不会触发。

---

### `minecraft:entity_transformed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

实体被其他实体转化为该实体时触发。

---

### `minecraft:on_prime`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

实体引信点燃、即将爆炸时触发。

---

## 事件响应

事件响应（Event Response）是构成实体事件的基本单位。下面的条目按「结构 → 组件组 → 事件与属性 → 表现 → 状态」排列，同一事件中可以任意组合使用。

### `sequence`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

按顺序执行列表中的全部条目。条目之间不互斥，前一项通过不会阻止后续条目执行。

:::info[提示]

事件的效果在接收到事件的瞬间就已确定，但要等到实体在服务端 tick 时才会应用。因此在`sequence`中，靠后的过滤器看不到前面刚添加的组件组。

:::

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="array" name="sequence"/>：按顺序执行的条目列表。
    - <DataType type="object"/>：一个条目，可包含任意[事件响应](#事件响应)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

沼骸（<FileType type="file" name="bogged.json"/>）：根据难度添加不同的远程攻击组件组。

```json showLineNumbers
"minecraft:entity_spawned": {
    "sequence": [
        {
            "filters": {
                "test": "is_difficulty",
                "value": "hard"
            },
            "add": {
                "component_groups": ["minecraft:ranged_attack_hard"]
            }
        },
        {
            "filters": {
                "test": "is_difficulty",
                "operator": "!=",
                "value": "hard"
            },
            "add": {
                "component_groups": ["minecraft:ranged_attack"]
            }
        }
    ]
}
```

</TabItem></Tabs>

---

### `randomize`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

从列表中按权重随机选择一项执行。未指定`weight`时视为`1.0`，权重按总和归一化。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="array" name="randomize"/>：候选项列表。
    - <DataType type="object"/>：一个候选项。
        - <DataType type="float" name="weight"/>：该项被选中的权重。默认值为`1`。
        - <DataType type="object" name="add"/>：被选中时执行的[事件响应](#事件响应)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

牛（<FileType type="file" name="cow.json"/>）：95% 概率成年、5% 概率幼年。

```json showLineNumbers
"minecraft:entity_spawned": {
    "randomize": [
        {
            "weight": 95,
            "trigger": "minecraft:spawn_adult"
        },
        {
            "weight": 5,
            "add": {
                "component_groups": ["minecraft:cow_baby"]
            }
        }
    ]
}
```

</TabItem></Tabs>

---

### `first_valid`

<Usable type="all"/> <Version add="1.21.70"/> <br/>

按顺序评估列表中的条目，执行第一个条件通过的条目，其余条目不再执行。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="array" name="first_valid"/>：按顺序评估的条目列表。
    - <DataType type="object"/>：一个条目。
        - <DataType type="object" name="filters"/>：该条目的执行条件。见[实体过滤器](./filters)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

牛（<FileType type="file" name="cow.json"/>）：根据生物群系设置不同的气候变种。

```json showLineNumbers
"first_valid": [
    {
        "filters": {
            "test": "has_biome_tag",
            "value": "spawns_warm_variant_farm_animals"
        },
        "set_property": {
            "minecraft:climate_variant": "warm"
        }
    },
    {
        "filters": {
            "test": "has_biome_tag",
            "value": "spawns_cold_variant_farm_animals"
        },
        "set_property": {
            "minecraft:climate_variant": "cold"
        }
    }
]
```

</TabItem></Tabs>

---

### `filters`

<Usable type="all"/> <Version add="1.2.0" tooltip="根级过滤器需格式版本1.19.20及更高版本才会生效。"/> <br/>

定义事件的执行条件。条件不通过时，同一事件中的其他响应均不执行。

:::warning[注意]

位于事件根级的`filters`（即不在`sequence`、`randomize`内的过滤器）只有格式版本`1.19.20`及更高版本才会生效，格式版本更低的内容会忽略根级过滤器。

:::

过滤器本身是一个[过滤器测试](./filters)，写法与组件中的过滤器完全相同。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="filters"/>：过滤器测试或过滤器组。
    - <DataType type="string" name="test" isRequired/>：测试的名称。可选值见[全部过滤器列表](./filters#全部过滤器列表)。

</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：只有在闲置音效正在播放时才执行停止逻辑。

```json showLineNumbers
"minecraft:stop_playing_idle_ground_sound": {
    "filters": {
        "test": "bool_property",
        "domain": "minecraft:is_playing_idle_ground_sound",
        "value": true
    },
    "set_property": {
        "minecraft:is_playing_idle_ground_sound": false
    },
    "remove": {
        "component_groups": ["minecraft:playing_idle_ground_sound"]
    }
}
```

</TabItem></Tabs>

---

### `add`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

向实体的[组件组](./description#行为包定义格式)添加组件组。组内的组件会覆盖同类型的现有组件；重复添加已激活的组件组会使相关组件重新初始化，例如[`minecraft:timer`](./components#minecrafttimer)会重新开始计时。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="add"/>：根对象。
    - <DataType type="array" name="component_groups" isRequired/>：要添加的组件组 ID 列表。
        - <DataType type="string"/>：组件组 ID。

</treeview>

</TabItem><TabItem value="示例" label="示例">

猪（<FileType type="file" name="pig.json"/>）：给猪上鞍，移除未上鞍的组件组、添加已上鞍的组件组。

```json showLineNumbers
"minecraft:on_saddled": {
    "remove": {
        "component_groups": ["minecraft:pig_unsaddled"]
    },
    "add": {
        "component_groups": ["minecraft:pig_saddled"]
    }
}
```

</TabItem></Tabs>

---

### `remove`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

从实体的[组件组](./description#行为包定义格式)中移除组件组。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="remove"/>：根对象。
    - <DataType type="array" name="component_groups" isRequired/>：要移除的组件组 ID 列表。
        - <DataType type="string"/>：组件组 ID。

</treeview>

</TabItem><TabItem value="示例" label="示例">

猪（<FileType type="file" name="pig.json"/>）：给猪卸鞍，移除已上鞍的组件组、添加未上鞍的组件组。

```json showLineNumbers
"minecraft:on_unsaddled": {
    "remove": {
        "component_groups": ["minecraft:pig_saddled"]
    },
    "add": {
        "component_groups": ["minecraft:pig_unsaddled"]
    }
}
```

</TabItem></Tabs>

---

### `trigger`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

触发另一个实体事件，可指定目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="string" name="trigger"/>：（写法 1）要触发的事件 ID。
- <DataType type="object" name="trigger"/>：（写法 2）带目标与条件地触发事件。
    - <DataType type="string" name="event" isRequired/>：要触发的事件 ID。
    - <DataType type="object" name="filters"/>：触发条件。见[实体过滤器](./filters)。
    - <DataType type="string" name="target"/>：事件的目标，如`self`、`other`、`block`。

</treeview>

</TabItem><TabItem value="示例" label="示例">

船（<FileType type="file" name="boat.json"/>）：船生成时触发放置乘客的事件。

```json showLineNumbers
"minecraft:entity_spawned": {
    "trigger": "minecraft:add_can_ride"
}
```

铜傀儡（<FileType type="file" name="copper_golem.json"/>）：对交互的方块触发序列化事件，写法 2。

```json showLineNumbers
"trigger": {
    "event": "minecraft:serialize_entity",
    "target": "block"
}
```

</TabItem></Tabs>

---

### `set_property`

<Usable type="all"/> <Version add="1.19.50"/> <br/>

设置[实体属性](./property)。值可填写字面量，也可填写返回值的 Molang 表达式。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="set_property"/>：根对象。
    - <DataType type="boolean" name="(属性 ID)"/>：（写法 1）布尔型属性值。
    - <DataType type="int" name="(属性 ID)"/>：（写法 2）整数型属性值。
    - <DataType type="float" name="(属性 ID)"/>：（写法 3）浮点型属性值。
    - <DataType type="string" name="(属性 ID)"/>：（写法 4）字符串型属性值；也可填写 Molang 表达式。

</treeview>

</TabItem><TabItem value="示例" label="示例">

旋风人（<FileType type="file" name="breeze.json"/>）：播放闲置音效的同时把属性记为`true`。

```json showLineNumbers
"minecraft:start_playing_idle_ground_sound": {
    "add": {
        "component_groups": ["minecraft:playing_idle_ground_sound"]
    },
    "set_property": {
        "minecraft:is_playing_idle_ground_sound": true
    }
}
```

</TabItem></Tabs>

---

### `queue_command`

<Usable type="all"/> <Version add="1.20.60" tooltip="在更旧的版本下名为run_command。"/> <br/>

排队执行命令。命令会在下一 tick 执行；若实体在执行前被移除，则命令不会执行。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="queue_command"/>：根对象。
    - <DataType type="string" name="command" isRequired/>：（写法 1）要执行的命令。
    - <DataType type="array" name="command" isRequired/>：（写法 2）要依次执行的多条命令。
        - <DataType type="string"/>：一条命令。
    - <DataType type="string" name="target"/>：命令的执行者。默认值为`self`。

</treeview>

</TabItem><TabItem value="示例" label="示例">

实体死亡时留下一条提示：

```json showLineNumbers
"queue_command": {
    "command": "say I have died!"
}
```

</TabItem></Tabs>

---

### `emit_particle`

<Usable type="all"/> <Version add="1.21.50"/> <br/>

在实体碰撞箱中心发射粒子。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="emit_particle"/>：根对象。
    - <DataType type="string" name="particle" isRequired/>：要发射的粒子 ID。

</treeview>

</TabItem><TabItem value="示例" label="示例">

嘎枝（<FileType type="file" name="creaking.json"/>）：碎裂时在身体中心喷出碎屑粒子。

```json showLineNumbers
"emit_particle": {
    "particle": "creakingcrumble"
}
```

</TabItem></Tabs>

---

### `play_sound`

<Usable type="all"/> <Version add="1.21.50"/> <br/>

在实体所在位置播放音效。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="play_sound"/>：根对象。
    - <DataType type="string" name="sound" isRequired/>：要播放的音效 ID。

</treeview>

</TabItem><TabItem value="示例" label="示例">

骆驼（<FileType type="file" name="camel.json"/>）：装上鞍具时播放上鞍的音效。

```json showLineNumbers
"play_sound": {
    "sound": "saddle"
}
```

</TabItem></Tabs>

---

### `emit_vibration`

<Usable type="all"/> <Version add="1.20.60"/> <br/>

以实体自身为振动源产生振动。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="emit_vibration"/>：根对象。
    - <DataType type="string" name="vibration" isRequired/>：要产生的振动。可选值为`shear`、`entity_act`、`entity_interact`。

</treeview>

:::note[编者注]

原版嘎枝使用了`entity_die`作为`vibration`的取值，可见可用的振动种类不止官方文档列出的三种，完整列表有待验证。

:::

</TabItem><TabItem value="示例" label="示例">

犰狳（<FileType type="file" name="armadillo.json"/>）：缩壳时以自身为源头发出一记实体动作振动。

```json showLineNumbers
"emit_vibration": {
    "vibration": "entity_act"
}
```

</TabItem></Tabs>

---

### `reset_target`

<Usable type="all"/> <Version add="1.21.40"/> <br/>

重置实体的目标。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="reset_target"/>：根对象，不含任何参数。

</treeview>

</TabItem><TabItem value="示例" label="示例">

嘎枝（<FileType type="file" name="creaking.json"/>）：失去目标后立即清除当前目标。

```json showLineNumbers
"reset_target": {}
```

</TabItem></Tabs>

---

### `stop_movement`

<Usable type="all"/> <Version add="1.21.70"/> <br/>

停止实体的运动。该响应不会中止寻路，也不会阻止后续的运动；若需要彻底停住实体，还应移除负责移动的组件。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="stop_movement"/>：根对象。
    - <DataType type="boolean" name="stop_vertical_movement"/>：是否停止垂直运动。
    - <DataType type="boolean" name="stop_horizontal_movement"/>：是否停止水平运动。

</treeview>

</TabItem><TabItem value="示例" label="示例">

快乐恶魂（<FileType type="file" name="happy_ghast.json"/>）：变为不可移动时立即停下。

```json showLineNumbers
"stop_movement": {}
```

</TabItem></Tabs>

---

### `set_home_position`

<Usable type="all"/> <Version add="1.21.70"/> <br/>

将实体的原点位置设置为其当前位置。实体必须已拥有[`minecraft:home`](./components#minecrafthome)组件才能生效。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="set_home_position"/>：根对象，不含任何参数。

</treeview>

</TabItem><TabItem value="示例" label="示例">

快乐恶魂（<FileType type="file" name="happy_ghast.json"/>）：装鞍具后把原点更新为当前位置。

```json showLineNumbers
"minecraft:on_harnessed": {
    "remove": {
        "component_groups": ["minecraft:adult_unharnessed"]
    },
    "add": {
        "component_groups": ["minecraft:adult_harnessed"]
    },
    "set_home_position": {}
}
```

</TabItem></Tabs>

---

### `unleash`

<Usable type="all"/> <Version add="1.26.30"/> <br/>

解除实体与其他实体之间的拴绳，可与[`minecraft:leashable`](./components#minecraftleashable)组件配合使用。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="unleash"/>：根对象。
    - <DataType type="boolean" name="unleash_self"/>：是否解除拴住该实体的牵引。
    - <DataType type="boolean" name="unleash_others"/>：是否解除拴在该实体上的其他实体。

</treeview>

</TabItem><TabItem value="示例" label="示例">

解除自身被拴住的状态：

```json showLineNumbers
"unleash": {
    "unleash_self": true
}
```

</TabItem></Tabs>

---

### `execute_event_on_home_block`

<Usable type="all"/> <Version add="1.26.30" tooltip="在1.21.40作为实验性内容加入。"/> <br/>

在实体原点所在的方块上执行事件。实体必须拥有已设置原点位置的[`minecraft:home`](./components#minecrafthome)组件才能生效。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>

- <DataType type="object" name="execute_event_on_home_block"/>：根对象。
    - <DataType type="string" name="event" isRequired/>：要执行的事件 ID。

</treeview>

</TabItem><TabItem value="示例" label="示例">

嘎枝（<FileType type="file" name="creaking.json"/>）：在嘎枝之心所在的方块上触发碎裂事件。

```json showLineNumbers
"execute_event_on_home_block": {
    "event": "minecraft:on_spawned_creaking_crumbling"
}
```

</TabItem></Tabs>

---

### `drop_item`

<Usable type="all"/> <Version add="1.21.110"/>

允许实体丢弃物品。类似于铜傀儡、硫方怪。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="drop_item"/>：根对象。
  - <DataType type="string" name="slot" isRequired/>：丢弃何槽位的物品。可选值为`"slot.armor.head"`、`"slot.armor.chest"`、`"slot.armor.legs"`、`"slot.armor.feet"`、`"slot.armor.body"`、`"slot.weapon.mainhand"`和`"slot.weapon.offhand"`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

铜傀儡（<FileType type="file" name="copper_golem.json"/>）：丢下主手中的物品。

```json showLineNumbers
"drop_item": {
    "slot": "slot.weapon.mainhand"
}
```

</TabItem></Tabs>

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [中文 Minecraft Wiki](https://zh.minecraft.wiki/)
- [生成事件 | 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E7%94%9F%E6%88%90%E4%BA%8B%E4%BB%B6)
- [实体事件 | Bedrock Wiki](https://wiki.bedrock.dev/entities/entity-events)
- [内置事件 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/eventlist?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
