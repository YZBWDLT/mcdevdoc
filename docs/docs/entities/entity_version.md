---
sidebar_position: 12
---

# 实体版本

import Version from "/src/components/highlight/version"
import DataType from "/src/components/type/data"
import '/src/css/treeview.css';

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

<Version add="1.26.30"/>

实体版本（Entity Version）用于自动更新世界中已存在的实体。

在引入实体版本之前，修改实体定义后，先前存在于世界中的实体仍保留修改之前的行为。开发者只能借助[`minecraft:environment_sensor`](./components#minecraftenvironment_sensor)与一个布尔属性逐刻轮询，才能把旧实体迁移到新的定义上——既带来每刻开销，也让定义文件中混入大量迁移逻辑。

实体版本用一串连续的整数记录实体已经历的升级步骤，游戏在加载存档时自动补跑缺失的步骤，使实体总处于最新的状态下。

实体版本不同于格式版本：格式版本决定游戏以何种结构解析定义文件，而实体版本只用于判断某个实体实例需要执行哪些升级步骤。一切实体的默认实体版本均为`0`。

## 实体定义文件格式

实体版本由<DataType type="object" name="entity_version"/>与<DataType type="object" name="upgrades"/>两部分组成：前者声明版本与升级处理器的对应关系，后者定义升级处理器本身。

### `entity_version`

实体版本声明在服务端实体定义的<DataType type="object" name="description" isRequired/>下。

<treeview>

- <DataType type="object" name="entity_version"/>
  - <DataType type="array" name="upgrades" isRequired/>：定义实体的升级步骤。
    - <DataType type="object"/>
      - <DataType type="int" name="upgrade_to" isRequired/>：该步骤将要升级到的版本。最小从`1`开始，且必须连续、不可重复。
      - <DataType type="string" name="name" isRequired/>：该步骤对应的升级处理器名，须在顶层<DataType type="object" name="upgrades"/>中定义，不可为空。

</treeview>

### `upgrades`

升级处理器定义在<DataType type="object" name="minecraft:entity" isRequired/>下的<DataType type="object" name="upgrades"/>中，与<DataType type="object" name="components"/>、<DataType type="object" name="events"/>同级。

<treeview>

- <DataType type="object" name="upgrades"/>：升级处理器列表。
  - <DataType type="object" name="(升级处理器 ID)"/>：定义一个升级处理器，语法与[事件响应](./events)相同，可添加或移除组件组、触发其他升级处理器等。

</treeview>

:::warning[注意]

升级处理器与实体事件是两个独立的概念，彼此不能互相触发：升级处理器无法触发事件，事件也无法触发升级处理器。脚本 API 的`Entity.triggerEvent`同样只对事件有效，传入升级处理器的名称不会产生任何效果。

升级处理器执行时会派发[实体更新事件](/docs/docs/scripts/sapi/server/world/after_events#实体更新事件)，但不会经过数据驱动实体触发事件。

:::

## 升级的执行时机

游戏在实体生成或从存档加载时比对版本，决定是否执行升级：

- **新生成的实体**：直接把实体版本设为最新，不执行任何升级处理器。
- **版本落后于定义的实体**：从「已保存的版本」之后的步骤开始，按顺序执行到最新版本，然后把实体版本更新为最新。
- **版本与定义一致的实体**：不执行任何升级处理器。
- **版本高于定义的实体**：把实体版本降为最新，不执行任何升级处理器。这一条用于处理实体功能被回滚的情况。

## 注意事项

- 升级步骤必须从`1`开始且连续：`1`、`2`、`3`合法，`1`、`3`不合法，版本号也不能重复。
- **已经发布的升级处理器不要删除**。玩家世界中的实体可能停在旧版本，需要依次跑完所有步骤才能到达最新版本；删除其中一环会让这条链断掉。确实不再需要的处理器应保留为空对象`{}`，而不是删掉。

## 示例

在`description`中声明两个升级步骤：

```json showLineNumbers
"description": {
    "identifier": "example:my_entity",
    "entity_version": {
        "upgrades": [
            { "upgrade_to": 1, "name": "example:upgrade_v1" },
            { "upgrade_to": 2, "name": "example:upgrade_v2" }
        ]
    }
}
```

在顶层`upgrades`中定义这两个处理器：第一步添加新行为的组件组，第二步在实体未被驯服时补齐驯服后的默认组件。

```json showLineNumbers
"upgrades": {
    "example:upgrade_v1": {
        "add": {
            "component_groups": ["example:new_behavior"]
        }
    },
    "example:upgrade_v2": {
        "sequence": [
            {
                "filters": {
                    "test": "has_component",
                    "operator": "!=",
                    "value": "minecraft:is_tamed"
                },
                "add": {
                    "component_groups": ["example:tamed_defaults"]
                }
            }
        ]
    }
}
```

此后，停在版本`0`的实体会连续执行两个处理器，停在版本`1`的实体只执行第二步，停在版本`2`的实体不执行任何处理器。

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [实体版本控制与升级 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/entity-versioning?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
