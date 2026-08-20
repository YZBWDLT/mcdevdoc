---
sidebar_position: 1
---

# 世界后事件

import Version from "/src/components/highlight/scriptVersion"
import Button from '/src/components/button/base';

本文主要记录世界后事件相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 玩家主手物品切换事件

<Version add="2.1.0"/>

### PlayerHotbarSelectedSlotChangeAfterEventSignal 类

当玩家主手持有物品切换后触发该事件信号。

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.PlayerHotbarSelectedSlotChangeAfterEventSignal.html"/>

### PlayerHotbarSelectedSlotChangeAfterEvent 类

玩家主手持有物品切换后的事件信息。

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.PlayerHotbarSelectedSlotChangeAfterEvent.html"/>

### HotbarEventOptions 接口

指定主手切换事件的筛选项。

<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.HotbarEventOptions.html"/>

---

## 玩家物品栏物品变更事件

<Version add="2.1.0"/>

### PlayerInventoryItemChangeAfterEventSignal 类

当玩家物品栏变更后触发该事件信号。

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.PlayerInventoryItemChangeAfterEventSignal.html"/>

### PlayerInventoryItemChangeAfterEvent 类

玩家物品栏变更后的事件信息。

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.PlayerInventoryItemChangeAfterEvent.html"/>

### InventoryItemEventOptions 接口

指定玩家物品栏变更事件的筛选项。

<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.InventoryItemEventOptions.html"/>

### PlayerInventoryType 枚举

变更的物品栏类型。

<Button text="projectxero.top" url="https://projectxero.top/sapi/enums/server.PlayerInventoryType.html"/>

---

## 实体更新事件

<Version add="2.8.0"/>

实体更新是在实体定义中定义了实体版本所导致的。另见[实体版本](/docs/docs/entities/entity_version)。

### EntityUpgradeAfterEventSignal 类

当实体更新后触发该事件信号。

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.EntityUpgradeAfterEventSignal.html"/>

### EntityUpgradeAfterEvent 类

实体更新后的事件信息。

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.EntityUpgradeAfterEvent.html"/>

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
