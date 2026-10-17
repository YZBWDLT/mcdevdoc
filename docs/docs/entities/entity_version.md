---
sidebar_position: 5
---

# 实体版本

import Version from "/src/components/highlight/version"
import DataType from "/src/components/type/data"
import '/src/css/treeview.css';

> 适用版本：国际版 26.40，中国版 3.9（1.21.120）。

<Version add="1.26.30"/>

实体版本（Entity Version）可用于自动更新当前世界中所有实体的定义。

在之前的版本中，如果对实体的定义文件做出修改，那么先前存在于世界中的实体将保留更改之前的行为。而引入实体版本可以确保世界中的实体总处于最新的状态下，且可以确保不残留多余的属性，不会造成代码可读性大幅降低。

实体版本不同于格式版本，它是一连串连续的整数。一切实体的默认实体版本均为`0`。游戏若读取到实体版本与实体定义的最新版本不同，则会考虑对实体进行更新。

- 如果实体当前的实体版本低于最新实体版本，则会依次触发`1`、`2`、...的实体版本所规定的[实体事件](./events)，直到达到最新的实体版本，并记录当前实体的版本为该版本。
- 如果实体当前的实体版本高于最新实体版本，则直接记录当前实体的版本为该版本，适用于实体功能被回滚的情况。

新生成的实体总是使用最新的实体版本。

实体更新会触发实体升级后事件。见 [ScriptAPI 文档：实体更新事件](/docs/docs/scripts/sapi/server/world/after_events#实体更新事件)。

## 格式

实体版本需要定义在服务端实体定义的<DataType type="object" name="description" isRequired/>下。

<treeview>

- <DataType type="object" name="entity_version"/>
  - <DataType type="array" name="upgrades" isRequired/>：定义实体的升级版本及触发事件。
    - <DataType type="object"/>
      - <DataType type="int" name="upgrade_to"/>：实体将要升级到的版本。规定的所有版本中必须是连续的版本，不可有中断。最小从`1`开始。
      - <DataType type="string" name="name"/>：实体将要触发的<DataType type="object" name="upgrades"/>[实体事件](./events)。

</treeview>

## 参考文档

- [实体版本控制与升级 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/entity-versioning?view=minecraft-bedrock-stable)
