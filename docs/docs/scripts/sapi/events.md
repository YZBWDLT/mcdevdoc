---
sidebar_position: 1
---

# 事件表

> 适用版本：国际版 26.20，中国版 3.8（1.21.90）。

本表记录脚本系列的所有事件。

## 世界事件

**世界事件（World Events）** 是指可从`world`中监听的事件，代表世界中所发生的事件。

### 世界前事件

**世界前事件（World Before Events）** 是指事件实际发生前执行的代码。多数前事件都可以取消事件实际发生。前事件会导致代码进入受限执行，无法执行会更改世界的代码，必须使用`system.run()`延后执行。

| 事件 | 事件类 | 是否支持筛选项 | 是否可取消 | [脚本版本](./version_table) |
| :--- | :---: | :---: | :---: | :---: |
| **使用物品** | [`ItemUseBeforeEvent`](https://projectxero.top/sapi/classes/server.ItemUseBeforeEvent.html) | 不支持 | 是 | `1.4.0` |
| 实体移除 | [`EntityRemoveBeforeEvent`](https://projectxero.top/sapi/classes/server.EntityRemoveBeforeEvent.html) | 不支持 | 否 | `1.6.0` |
| **玩家破坏方块** | [`PlayerBreakBlockBeforeEvent`](https://projectxero.top/sapi/classes/server.PlayerBreakBlockBeforeEvent.html) | [`BlockEventOptions`](https://projectxero.top/sapi/interfaces/server.BlockEventOptions.html) | 是 | `1.6.0` |
| 玩家离开 | [`PlayerLeaveBeforeEvent`](https://projectxero.top/sapi/classes/server.PlayerLeaveBeforeEvent.html) | 不支持 | 否 | `1.7.0` |
| 添加状态效果 | [`EffectAddBeforeEvent`](https://projectxero.top/sapi/classes/server.EffectAddBeforeEvent.html) | 不支持 | 是 | `1.8.0` |
| **爆炸** | [`ExplosionBeforeEvent`](https://projectxero.top/sapi/classes/server.ExplosionBeforeEvent.html) | 不支持 | 是 | `1.9.0` |
| 玩家游戏模式更改 | [`PlayerGameModeChangeBeforeEvent`](https://projectxero.top/sapi/classes/server.PlayerGameModeChangeBeforeEvent.html) | 不支持 | 是 | `1.11.0` |
| 天气更改 | [`WeatherChangeBeforeEvent`](https://projectxero.top/sapi/classes/server.WeatherChangeBeforeEvent.html) | 不支持 | 是 | `1.11.0` |
| **玩家与方块交互** | [`PlayerInteractWithBlockBeforeEvent`](https://projectxero.top/sapi/classes/server.PlayerInteractWithBlockBeforeEvent.html) | 不支持 | 是 | `1.15.0` |
| **玩家与实体交互** | [`PlayerInteractWithEntityBeforeEvent`](https://projectxero.top/sapi/classes/server.PlayerInteractWithEntityBeforeEvent.html) | 不支持 | 是 | `1.15.0` |
| 实体回复生命 | [`EntityHealBeforeEvent`](https://projectxero.top/sapi/classes/server.EntityHealBeforeEvent.html) | [`EntityHealEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityHealEventOptions.html) | 是 | `2.6.0` |
| **实体受伤** | [`EntityHurtBeforeEvent`](https://projectxero.top/sapi/classes/server.EntityHurtBeforeEvent.html) | [`EntityHurtBeforeEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityHurtBeforeEventOptions.html) | 是 | `2.6.0` |
| 实体拾取物品 | [`EntityItemPickupBeforeEvent`](https://projectxero.top/sapi/classes/server.EntityItemPickupBeforeEvent.html) | [`EntityItemPickupEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityItemPickupEventOptions.html) | 是 | `2.6.0` |
| 发送聊天消息 | [`ChatSendBeforeEvent`](https://projectxero.top/sapi/classes/server.ChatSendBeforeEvent.html) | 不支持 | 是 | `beta` |
| 玩家放置方块 | [`PlayerPlaceBlockBeforeEvent`](https://projectxero.top/sapi/classes/server.PlayerPlaceBlockBeforeEvent.html) | [`BlockEventOptions`](https://projectxero.top/sapi/interfaces/server.BlockEventOptions.html) | 是 | `beta` |

**备注**：

- *是否支持筛选项*是指事件的订阅函数`subscribe`是否支持第二个参数`options`。若支持，则给出它的类型。
- 爆炸前事件的类虽然在`1.6.0`正式开放，但在`1.9.0`之后才能正式使用。
- 在`1.15.0`之前，玩家与方块交互前事件可由`ItemUseOnBeforeEvent`代替，在`1.4.0`开放，`2.0.0`移除。

### 世界后事件

**世界后事件（World After Events）** 是指事件实际发生后执行的代码，无法阻止事件的发生。

| 事件 | 事件类 | 是否支持筛选项 | [脚本版本](./version_table) |
| :--- | :---: | :---: | :---: |
| 玩家加入游戏 | [`PlayerJoinAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerJoinAfterEvent.html) | 不支持 | `1.3.0` |
| 玩家离开游戏 | [`PlayerLeaveAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerLeaveAfterEvent.html) | 不支持 | `1.3.0` |
| **玩家生成** | [`PlayerSpawnAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerSpawnAfterEvent.html) | 不支持 | `1.3.0` |
| **实体死亡** | [`EntityDieAfterEvent`](https://projectxero.top/sapi/classes/server.EntityDieAfterEvent.html) | [`EntityEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityEventOptions.html) | `1.4.0` |
| 实体生命值改变 | [`EntityHealthChangedAfterEvent`](https://projectxero.top/sapi/classes/server.EntityHealthChangedAfterEvent.html) | [`EntityHealEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityHealEventOptions.html) | `1.4.0` |
| 实体击打方块 | [`EntityHitBlockAfterEvent`](https://projectxero.top/sapi/classes/server.EntityHitBlockAfterEvent.html) | [`EntityEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityEventOptions.html) | `1.4.0` |
| 实体击打实体 | [`EntityHitEntityAfterEvent`](https://projectxero.top/sapi/classes/server.EntityHitEntityAfterEvent.html) | [`EntityEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityEventOptions.html) | `1.4.0` |
| **实体受伤** | [`EntityHurtAfterEvent`](https://projectxero.top/sapi/classes/server.EntityHurtAfterEvent.html) | [`EntityHurtAfterEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityHurtAfterEventOptions.html) | `1.4.0` |
| 物品完成使用 | [`ItemCompleteUseAfterEvent`](https://projectxero.top/sapi/classes/server.ItemCompleteUseAfterEvent.html) | 不支持 | `1.4.0` |
| 物品释放使用 | [`ItemReleaseUseAfterEvent`](https://projectxero.top/sapi/classes/server.ItemReleaseUseAfterEvent.html) | 不支持 | `1.4.0` |
| 物品开始使用 | [`ItemStartUseAfterEvent`](https://projectxero.top/sapi/classes/server.ItemStartUseAfterEvent.html) | 不支持 | `1.4.0` |
| 物品开始对方块使用 | [`ItemStartUseOnAfterEvent`](https://projectxero.top/sapi/classes/server.ItemStartUseOnAfterEvent.html) | 不支持 | `1.4.0` |
| 物品停止使用 | [`ItemStopUseAfterEvent`](https://projectxero.top/sapi/classes/server.ItemStopUseAfterEvent.html) | 不支持 | `1.4.0` |
| 物品停止对方块使用 | [`ItemStopUseOnAfterEvent`](https://projectxero.top/sapi/classes/server.ItemStopUseOnAfterEvent.html) | 不支持 | `1.4.0` |
| **物品使用** | [`ItemUseAfterEvent`](https://projectxero.top/sapi/classes/server.ItemUseAfterEvent.html) | 不支持 | `1.4.0` |
| **弹射物击中方块** | [`ProjectileHitBlockAfterEvent`](https://projectxero.top/sapi/classes/server.ProjectileHitBlockAfterEvent.html) | 不支持 | `1.5.0` |
| **弹射物击中实体** | [`ProjectileHitEntityAfterEvent`](https://projectxero.top/sapi/classes/server.ProjectileHitEntityAfterEvent.html) | 不支持 | `1.5.0` |
| 实体加载 | [`EntityLoadAfterEvent`](https://projectxero.top/sapi/classes/server.EntityLoadAfterEvent.html) | 不支持 | `1.6.0` |
| 实体移除 | [`EntityRemoveAfterEvent`](https://projectxero.top/sapi/classes/server.EntityRemoveAfterEvent.html) | [`EntityEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityEventOptions.html) | `1.6.0` |
| 实体生成 | [`EntitySpawnAfterEvent`](https://projectxero.top/sapi/classes/server.EntitySpawnAfterEvent.html) | 不支持 | `1.6.0` |
| **玩家破坏方块** | [`PlayerBreakBlockAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerBreakBlockAfterEvent.html) | [`BlockEventOptions`](https://projectxero.top/sapi/interfaces/server.BlockEventOptions.html) | `1.6.0` |
| 玩家维度更改 | [`PlayerDimensionChangeAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerDimensionChangeAfterEvent.html) | 不支持 | `1.6.0` |
| **玩家放置方块** | [`PlayerPlaceBlockAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerPlaceBlockAfterEvent.html) | [`BlockEventOptions`](https://projectxero.top/sapi/interfaces/server.BlockEventOptions.html) | `1.6.0` |
| 数据驱动实体触发实体事件 | [`DataDrivenEntityTriggerAfterEvent`](https://projectxero.top/sapi/classes/server.DataDrivenEntityTriggerAfterEvent.html) | 不支持 | `1.8.0` |
| 添加状态效果 | [`EffectAddAfterEvent`](https://projectxero.top/sapi/classes/server.EffectAddAfterEvent.html) | 不支持 | `1.9.0` |
| **爆炸** | [`ExplosionAfterEvent`](https://projectxero.top/sapi/classes/server.ExplosionAfterEvent.html) | 不支持 | `1.9.0` |
| 天气更改 | [`WeatherChangeAfterEvent`](https://projectxero.top/sapi/classes/server.WeatherChangeAfterEvent.html) | 不支持 | `1.9.0` |
| 游戏规则更改 | [`GameRuleChangeAfterEvent`](https://projectxero.top/sapi/classes/server.GameRuleChangeAfterEvent.html) | 不支持 | `1.11.0` |
| 玩家游戏模式更改 | [`PlayerGameModeChangeAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerGameModeChangeAfterEvent.html) | 不支持 | `1.11.0` |
| 玩家输入权限分类更改 | [`PlayerInputPermissionCategoryChangeAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerInputPermissionCategoryChangeAfterEvent.html) | 不支持 | `1.12.0` |
| 方块爆炸 | [`BlockExplodeAfterEvent`](https://projectxero.top/sapi/classes/server.BlockExplodeAfterEvent.html) | 不支持 | `1.12.0` |
| 玩家发送表情 | [`PlayerEmoteAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerEmoteAfterEvent.html) | 不支持 | `1.14.0` |
| **玩家和方块交互** | [`PlayerInteractWithBlockAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerInteractWithBlockAfterEvent.html) | 不支持 | `1.15.0` |
| **玩家和实体交互** | [`PlayerInteractWithEntityAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerInteractWithEntityAfterEvent.html) | 不支持 | `1.15.0` |
| 玩家输入模式更改 | [`PlayerInputModeChangeAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerInputModeChangeAfterEvent.html) | 不支持 | `1.17.0` |
| 玩家输入按钮更改 | [`PlayerButtonInputAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerButtonInputAfterEvent.html) | [`InputEventOptions`](https://projectxero.top/sapi/interfaces/server.InputEventOptions.html) | `1.18.0` |
| **世界加载** | [`WorldLoadAfterEvent`](https://projectxero.top/sapi/classes/server.WorldLoadAfterEvent.html) | 不支持 | `2.0.0` |
| 玩家快捷栏选择槽位更改 | [`PlayerHotbarSelectedSlotChangeAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerHotbarSelectedSlotChangeAfterEvent.html) | [`HotbarEventOptions`](https://projectxero.top/sapi/interfaces/server.HotbarEventOptions.html) | `2.1.0` |
| 玩家物品栏物品更改 | [`PlayerInventoryItemChangeAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerInventoryItemChangeAfterEvent.html) | [`InventoryItemEventOptions`](https://projectxero.top/sapi/interfaces/server.InventoryItemEventOptions.html) | `2.1.0` |
| 玩家开始挥舞 | [`PlayerSwingStartAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerSwingStartAfterEvent.html) | [`PlayerSwingEventOptions`](https://projectxero.top/sapi/interfaces/server.PlayerSwingEventOptions.html) | `2.5.0` |
| **实体回复生命** | [`EntityHealAfterEvent`](https://projectxero.top/sapi/classes/server.EntityHealAfterEvent.html) | [`EntityHealEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityHealEventOptions.html) | `2.6.0` |
| 物品实体掉落 | [`EntityItemDropAfterEvent`](https://projectxero.top/sapi/classes/server.EntityItemDropAfterEvent.html) | [`EntityItemDropEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityItemDropEventOptions.html) | `2.6.0` |
| 实体拾取物品 | [`EntityItemPickupAfterEvent`](https://projectxero.top/sapi/classes/server.EntityItemPickupAfterEvent.html) | [`EntityItemPickupEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityItemPickupEventOptions.html) | `2.6.0` |
| **方块容器关闭** | [`BlockContainerClosedAfterEvent`](https://projectxero.top/sapi/classes/server.BlockContainerClosedAfterEvent.html) | [`BlockContainerAccessEventOptions`](https://projectxero.top/sapi/interfaces/server.BlockContainerAccessEventOptions.html) | `2.8.0` |
| **方块容器打开** | [`BlockContainerOpenedAfterEvent`](https://projectxero.top/sapi/classes/server.BlockContainerOpenedAfterEvent.html) | [`BlockContainerAccessEventOptions`](https://projectxero.top/sapi/interfaces/server.BlockContainerAccessEventOptions.html) | `2.8.0` |
| **实体容器关闭** | [`EntityContainerClosedAfterEvent`](https://projectxero.top/sapi/classes/server.EntityContainerClosedAfterEvent.html) | [`EntityContainerAccessEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityContainerAccessEventOptions.html) | `2.8.0` |
| **实体容器打开** | [`EntityContainerOpenedAfterEvent`](https://projectxero.top/sapi/classes/server.EntityContainerOpenedAfterEvent.html) | [`EntityContainerAccessEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityContainerAccessEventOptions.html) | `2.8.0` |
| 实体更新 | [`EntityUpgradeAfterEvent`](https://projectxero.top/sapi/classes/server.EntityUpgradeAfterEvent.html) | [`EntityDataDrivenTriggerEventOptions`](https://projectxero.top/sapi/interfaces/server.EntityDataDrivenTriggerEventOptions.html) | `2.8.0` |
| 发送聊天消息 | [`ChatSendAfterEvent`](https://projectxero.top/sapi/classes/server.ChatSendAfterEvent.html) | 不支持 | `beta` |
| 实体开始潜行 | [`EntityStartSneakingAfterEvent`](https://projectxero.top/sapi/classes/server.EntityStartSneakingAfterEvent.html) | [`EntitySneakingChangedEventOptions`](https://projectxero.top/sapi/interfaces/server.EntitySneakingChangedEventOptions.html) | `beta` |
| 实体停止潜行 | [`EntityStopSneakingAfterEvent`](https://projectxero.top/sapi/classes/server.EntityStopSneakingAfterEvent.html) | [`EntitySneakingChangedEventOptions`](https://projectxero.top/sapi/interfaces/server.EntitySneakingChangedEventOptions.html) | `beta` |
| 实体被驯服 | [`EntityTamedAfterEvent`](https://projectxero.top/sapi/classes/server.EntityTamedAfterEvent.html) | [`EntityTamedEventFilter`](https://projectxero.top/sapi/interfaces/server.EntityTamedEventFilter.html) | `beta` |
| 包设置更改 | [`PackSettingChangeAfterEvent`](https://projectxero.top/sapi/classes/server.PackSettingChangeAfterEvent.html) | 不支持 | `beta` |
| 玩家取消破坏方块 | [`PlayerCancelBreakingBlockAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerCancelBreakingBlockAfterEvent.html) | [`PlayerBreakingBlockEventOptions`](https://projectxero.top/sapi/interfaces/server.PlayerBreakingBlockEventOptions.html) | `beta` |
| 玩家开始破坏方块 | [`PlayerStartBreakingBlockAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerStartBreakingBlockAfterEvent.html) | [`PlayerBreakingBlockEventOptions`](https://projectxero.top/sapi/interfaces/server.PlayerBreakingBlockEventOptions.html) | `beta` |
| 玩家使用命名牌 | [`PlayerUseNameTagAfterEvent`](https://projectxero.top/sapi/classes/server.PlayerUseNameTagAfterEvent.html) | 不支持 | `beta` |
| 音效播放完毕 | [`SoundCompletedAfterEvent`](https://projectxero.top/sapi/classes/server.SoundCompletedAfterEvent.html) | 不支持 | `beta` |

**备注**：

- *是否支持筛选项*是指事件的订阅函数`subscribe`是否支持第二个参数`options`。若支持，则给出它的类型。
- 爆炸后事件的类虽然在`1.6.0`正式开放，但在`1.9.0`之后才能正式使用。
- 在`1.15.0`之前，玩家与方块交互后事件可由`ItemUseOnAfterEvent`代替，在`1.4.0`开放，`2.0.0`移除。
- 在`2.0.0`之前，世界加载后事件可由`WorldInitializeAfterEvent`代替，在`1.10.0`开放，`2.0.0`移除。

### 世界后事件（红石元件）

这里专门记录红石元件触发的世界后事件。

| 事件 | 事件类 | [脚本版本](./version_table) |
| :--- | :---: | :---: |
| 按下按钮 | [`ButtonPushAfterEvent`](https://projectxero.top/sapi/classes/server.ButtonPushAfterEvent.html) | `1.3.0` |
| 拉杆活动 | [`LeverActionAfterEvent`](https://projectxero.top/sapi/classes/server.LeverActionAfterEvent.html) | `1.3.0` |
| 压力板弹出 | [`PressurePlatePopAfterEvent`](https://projectxero.top/sapi/classes/server.PressurePlatePopAfterEvent.html) | `1.4.0` |
| 压力板压下 | [`PressurePlatePushAfterEvent`](https://projectxero.top/sapi/classes/server.PressurePlatePushAfterEvent.html) | `1.4.0` |
| 击中标靶 | [`TargetBlockHitAfterEvent`](https://projectxero.top/sapi/classes/server.TargetBlockHitAfterEvent.html) | `1.4.0` |
| 绊线钩触发 | [`TripWireTripAfterEvent`](https://projectxero.top/sapi/classes/server.TripWireTripAfterEvent.html) | `1.4.0` |
| 活塞激活 | [`PistonActivateAfterEvent`](https://projectxero.top/sapi/classes/server.PistonActivateAfterEvent.html) | `1.9.0` |

## 系统事件

**系统事件（System Events）** 是指可从`system`中监听的事件，代表游戏引擎中所发生的事件。

### 系统前事件

**系统前事件（System Before Events）** 是指事件实际发生前执行的代码。前事件会导致代码进入受限执行，无法执行会更改系统的代码，必须使用`system.run()`延后执行。往往使用系统前事件是为了注册自定义游戏内容。

| 事件 | 事件类 | [脚本版本](./version_table) |
| :--- | :---: | :---: |
| 系统关闭 | [`ShutdownBeforeEvent`](https://projectxero.top/sapi/classes/server.ShutdownBeforeEvent.html) | `2.0.0` |
| **系统启动** | [`StartupBeforeEvent`](https://projectxero.top/sapi/classes/server.StartupBeforeEvent.html) | `2.0.0` |
| 看门狗 | [`WatchdogTerminateBeforeEvent`](https://projectxero.top/sapi/classes/server.WatchdogTerminateBeforeEvent.html) | `beta` |

### 系统后事件

**系统后事件（System After Events）** 是指事件实际发生后执行的代码，无法阻止事件的发生。

| 事件 | 事件类 | 是否支持筛选项 | [脚本版本](./version_table) |
| :--- | :---: | :---: | :---: |
| 接收脚本事件 | [`ScriptEventCommandMessageAfterEvent`](https://projectxero.top/sapi/classes/server.ScriptEventCommandMessageAfterEvent.html) | [`ScriptEventMessageFilterOptions`](https://projectxero.top/sapi/interfaces/server.ScriptEventMessageFilterOptions.html) | `1.4.0` |

**备注**：

- *是否支持筛选项*是指事件的订阅函数`subscribe`是否支持第二个参数`options`。若支持，则给出它的类型。

---

## 参考文档

- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
- [`@minecraft` | projectxero.top](https://projectxero.top/sapi/index.html)
- [Script API 参考文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
