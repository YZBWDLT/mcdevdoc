---
sidebar_position: 0
sidebar_label: 总览
---

import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';

# 数据驱动实体组件

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

数据驱动实体组件（Data-Driven Entity Components）用于规定实体的功能。将不同的实体组件组合在一起可以实现多种复杂的功能。
实体组件可以指定到<DataType type="object" name="components" isRequired/>中，以使得实体在所有情况下都使用相关功能；也可以指定到实体组件组<DataType type="object" name="component_groups"/> - <DataType type="object" name="*"/>中，使得实体在使用特定事件时使用特定的功能。

本文收录所有已开放或即将开放的命名空间为`minecraft`的实体组件信息。可使用<kbd>Ctrl</kbd>+<kbd>F</kbd>查找所需条目。

**每个组件条目下方的高亮标签均含注释，可鼠标悬停或手机点击查看**。例：<Highlight text="这是一个特殊标签" color="yellowgreen" tooltip="这是标签下的特殊注解。"/>。

:::warning[注意：有关本文的格式版本问题]

1. 因为数据驱动实体自从 Mojang 在 0.16 正式公布附加包以来就已具有应用，因此其中众多组件可用的格式版本十分之早。现如今，收集古早时期的相关资料已十分困难。本文档将以 [bedrock.dev 的 1.2.0](https://bedrock.dev/docs/1.2.0.0/1.2.9.1/Addons) 版本为可用格式版本的最早版本，但这些组件可能在更早就可以应用。
2. 文档中已尽力对多个参数、组件的可用版本添加了徽标，然而读者需要注意文档中的可用版本徽标（包括组件、参数）主要来源于：
    1. [bedrock.dev](https://bedrock.dev) 的过往版本文档，进行逐个比对得到；
    2. 近期版本的更新日志。
       然而，官方文档、schema 和 MS Learn 的文档编排均***非常混乱***（例如会出现包括但不限于过往文档未记载导致无法比对、过往文档未及时更新（例如[`minecraft:projectile`组件](functional#minecraftprojectile)）导致查出的版本失真、过往文档加入后立刻移除或移除后立刻加入导致无法判别该版本是否确实移除等问题），这会对加入历史的可信度造成影响，尤其是早期组件（因为对于近期组件或参数（大约为 1.21.0+）的更改有详细的更新日志介绍相关的更改），因此仅供参考。
3. 本文中涉及的版本多数为我们推荐使用的版本，因为很多较旧的组件并未更新过，默认的解析格式版本仍为`0.0.0`，因此请注意本文存在一定的不严谨性。然而我们仍然推荐读者至少使用这些版本，和当前的开发习惯保持一致。

:::

## 分节索引

组件数量较多，本页按功能拆成下列各节，点击进入对应页面。

- [基础属性组件](./attributes)
- [传感器组件](./sensors)
- [功能性组件](./functional)
- [寻路与运动组件](./movement)
- [AI 意向组件](./ai)
- [标记组件](./marker)
- [弃用组件](./deprecated)

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [实体组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/componentlist?view=minecraft-bedrock-stable)
- [实体 AI 意向组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/aigoallist?view=minecraft-bedrock-stable)
- [Projectiles | Bedrock Wiki](https://wiki.bedrock.dev/entities/projectiles)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
