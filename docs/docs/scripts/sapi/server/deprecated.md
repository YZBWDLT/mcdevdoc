---
sidebar_position: 99
---

# 已弃用接口

import Button from '/src/components/button/base';


本页记录曾经在正式版脚本 API 中存在、后来被重命名或移除的接口。这些接口在当前版本中已经不可用。

绝大多数变更发生在 `2.0.0`（游戏版本 1.21.90）的脚本模块重构中，少数发生在更早或稍晚的版本。

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=sapi" color="green"/>

---

## 已移除的类

| 类                               | 存在版本        | 说明                                                                                                       |
| :------------------------------- | :-------------- | :--------------------------------------------------------------------------------------------------------- |
| BlockComponentPlayerDestroyEvent | 1.12.0 ~ 1.19.0 | 改用 [BlockCustomComponent](./system/custom_block_component#blockcustomcomponent-接口) 的 onPlayerBreak 回调。 |
| CameraDefaultOptions             | 1.6.0 ~ 1.19.0  | 相机接口在 2.0.0 重构，无直接替代。                                                                        |
| CameraEaseOptions                | 1.6.0 ~ 1.19.0  | 改名为 [EaseOptions](./entity_and_player/camera#easeoptions-接口)。                                          |
| EntityGroundOffsetComponent      | 1.2.0 ~ 1.19.0  | 无替代。该组件在 1.19.0 已标记弃用，且设置其值对实体没有实际影响。                                         |
| IButtonPushAfterEventSignal      | 1.3.0 ~ 1.19.0  | 改名为 [ButtonPushAfterEventSignal](./world/after_events#buttonpushaftereventsignal-类)。                   |
| ILeverActionAfterEventSignal     | 1.3.0 ~ 1.19.0  | 改名为 [LeverActionAfterEventSignal](./world/after_events#leveractionaftereventsignal-类)。                 |
| IPlayerJoinAfterEventSignal      | 1.3.0 ~ 1.19.0  | 改名为 [PlayerJoinAfterEventSignal](./world/after_events#playerjoinaftereventsignal-类)。                   |
| IPlayerLeaveAfterEventSignal     | 1.3.0 ~ 1.19.0  | 改名为 [PlayerLeaveAfterEventSignal](./world/after_events#playerleaveaftereventsignal-类)。                 |
| IPlayerSpawnAfterEventSignal     | 1.3.0 ~ 1.19.0  | 改名为 [PlayerSpawnAfterEventSignal](./world/after_events#playerspawnaftereventsignal-类)。                 |
| ItemUseOnAfterEvent              | 1.4.0 ~ 1.19.0  | 改用 [PlayerInteractWithBlockAfterEvent](./world/after_events#playerinteractwithblockafterevent-类)。       |
| ItemUseOnAfterEventSignal        | 1.4.0 ~ 1.19.0  | 改用 [PlayerInteractWithBlockAfterEventSignal](./world/after_events#playerinteractwithblockaftereventsignal-类)。 |
| ItemUseOnBeforeEvent             | 1.4.0 ~ 1.19.0  | 改用 [PlayerInteractWithBlockBeforeEvent](./world/before_events#playerinteractwithblockbeforeevent-类)。    |
| ItemUseOnBeforeEventSignal       | 1.4.0 ~ 1.19.0  | 改用 [PlayerInteractWithBlockBeforeEventSignal](./world/before_events#playerinteractwithblockbeforeeventsignal-类)。 |
| MinecraftDimensionTypes          | 1.0.0 ~ 1.19.0  | 改名为 [DimensionTypes](./system/custom_dimension#dimensiontypes-类)。                                      |
| WorldInitializeAfterEvent        | 1.10.0 ~ 1.19.0 | 改名为 [WorldLoadAfterEvent](./world/after_events#worldloadafterevent-类)。                                 |
| WorldInitializeAfterEventSignal  | 1.10.0 ~ 1.19.0 | 改名为 [WorldLoadAfterEventSignal](./world/after_events#worldloadaftereventsignal-类)。                     |
| WorldInitializeBeforeEvent       | 1.12.0 ~ 1.19.0 | 改用系统启动前事件的 [StartupEvent](./system/before_events#startupevent-类)。                               |
| WorldInitializeBeforeEventSignal | 1.12.0 ~ 1.19.0 | 改用 [StartupBeforeEventSignal](./system/before_events#startupbeforeeventsignal-类)。                       |

> **注意**：以 `I` 开头的名称是早期的事件信号类写法，2.0.0 起统一去掉了 `I` 前缀。

---

## 已移除的成员

| 成员                                   | 存在版本        | 说明                                                                                                                                            |
| :------------------------------------- | :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| BlockCustomComponent.onPlayerDestroy   | 1.12.0 ~ 1.19.0 | 改用 [BlockCustomComponent](./system/custom_block_component#blockcustomcomponent-接口) 的 onPlayerBreak 回调。                                   |
| Dimension.runCommandAsync              | 1.0.0 ~ 1.19.0  | 因事实上无异步功能，改用同步的 [Dimension.runCommand](./dimension/main#runcommand-方法)。                                                        |
| Entity.runCommandAsync                 | 1.0.0 ~ 1.19.0  | 因事实上无异步功能，改用 [Entity.runCommand](./entity_and_player/entity#runcommand-方法)。                                                        |
| Player.runCommandAsync                 | 1.0.0 ~ 1.0.0   | 1.1.0 起该能力移到 Dimension 与 Entity 上，改用 [Dimension.runCommand](./dimension/main#runcommand-方法)。                                        |
| PlayerInputPermissions.cameraEnabled   | 1.12.0 ~ 1.19.0 | 改用 [isPermissionCategoryEnabled](./entity_and_player/input#ispermissioncategoryenabled-方法) 与 [setPermissionCategory](./entity_and_player/input#setpermissioncategory-方法)，按权限分类查询。 |
| PlayerInputPermissions.movementEnabled | 1.12.0 ~ 1.19.0 | 同上。                                                                                                                                          |
| ScreenDisplay.resetHudElements         | 1.11.0 ~ 1.19.0 | 改名为 [ScreenDisplay.resetHudElementsVisibility](./entity_and_player/player#resethudelementsvisibility-方法)。                                  |
| World.playSound                        | 1.2.0 ~ 1.19.0  | 改用 [Dimension.playSound](./dimension/main#playsound-方法)。                                                                                    |
| WorldAfterEvents.itemUseOn             | 1.4.0 ~ 1.19.0  | 改用 [WorldAfterEvents.playerInteractWithBlock](./world/after_events#playerinteractwithblockaftereventsignal-类)。                              |
| WorldAfterEvents.worldInitialize       | 1.10.0 ~ 1.19.0 | 改用 [WorldAfterEvents.worldLoad](./world/after_events#worldloadafterevent-类)。                                                                 |
| WorldBeforeEvents.itemUseOn            | 1.4.0 ~ 1.19.0  | 改用 [WorldBeforeEvents.playerInteractWithBlock](./world/before_events#playerinteractwithblockbeforeeventsignal-类)。                            |
| WorldBeforeEvents.worldInitialize      | 1.12.0 ~ 1.19.0 | 无替代，世界加载前没有对应事件。                                                                                                                |

---

## 已移除的枚举值

| 枚举值                            | 存在版本        | 说明                                                                                          |
| :-------------------------------- | :-------------- | :-------------------------------------------------------------------------------------------- |
| EntityComponentTypes.GroundOffset | 1.10.0 ~ 1.19.0 | 随 EntityGroundOffsetComponent 一起移除，无替代。                                              |
| EntityDamageCause.dehydration     | 2.4.0 ~ 2.4.0   | 仅在该版本出现过，随后被移除。                                                                 |
| EntityDamageCause.suicide         | 1.2.0 ~ 1.19.0  | 改用 [EntityDamageCause.selfDestruct](./entity_and_player/entity#entitydamagecause-枚举)。     |
| GameMode.adventure                | 1.1.0 ~ 1.19.0  | 改名为 [GameMode.Adventure](./entity_and_player/player#gamemode-枚举)（首字母大写）。          |
| GameMode.creative                 | 1.1.0 ~ 1.19.0  | 改名为 [GameMode.Creative](./entity_and_player/player#gamemode-枚举)。                         |
| GameMode.spectator                | 1.1.0 ~ 1.19.0  | 改名为 [GameMode.Spectator](./entity_and_player/player#gamemode-枚举)。                        |
| GameMode.survival                 | 1.1.0 ~ 1.19.0  | 改名为 [GameMode.Survival](./entity_and_player/player#gamemode-枚举)。                         |

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
