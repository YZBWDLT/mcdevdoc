---
sidebar_position: 1
---

# 事件对照

Script API 与中国版的 ModAPI 是两套独立实现的脚本接口，事件的命名、粒度与触发时机均不相同。本文以 Script API 的事件为基准，逐条标注 ModAPI 中语义相同的事件。

Script API 共提供 96 个事件，下表按 Script API 文档的分类与顺序完整列出。ModAPI 一列标注「无」表示 ModAPI 没有语义相同的实现，原因见说明列。ModAPI 另有 200 余个自身独有的事件，不在本文讨论范围内，列于[ModAPI 事件](../modapi/events/world)。

## 两套事件模型的差异

**命名规则**。Script API 的事件名以`AfterEvent`或`BeforeEvent`结尾，表示事件发生之后或之前。ModAPI 的事件名以`ServerEvent`或`ClientEvent`结尾，表示事件由服务端或客户端触发。

**粒度**。Script API 的大部分操作同时提供前、后两个事件，前事件可以拦截。ModAPI 通常只提供一个事件，能否拦截取决于该事件是否允许修改参数，例如`ServerChatEvent`可通过修改参数改变聊天内容，而`DestroyBlockEvent`只能观察。

**订阅方式**。Script API 从`world.afterEvents`、`world.beforeEvents`等对象上订阅，事件是对象的属性。ModAPI 使用`ListenForEvent`注册回调，事件名以字符串形式传入，写法见[概论的事件一节](../modapi/overview#事件)。

## 系统前事件

| 功能 | Script API | ModAPI | 说明 |
| --- | --- | --- | --- |
| 系统启动 | [`StartupEvent`](../sapi/server/system/before_events#startupevent-类) | 无 | ModAPI 未提供系统生命周期事件，初始化写在 modMain.py 的入口函数中 |
| 系统关闭 | [`ShutdownEvent`](../sapi/server/system/before_events#shutdownevent-类) | 无 | 同上 |
| 看门狗终止 | [`WatchdogTerminateBeforeEvent`](../sapi/server/system/before_events#watchdogterminatebeforeevent-类) | 无 | ModAPI 未提供 |

## 系统后事件

| 功能 | Script API | ModAPI | 说明 |
| --- | --- | --- | --- |
| 接收脚本事件 | [`ScriptEventCommandMessageAfterEvent`](../sapi/server/system/after_events#scripteventcommandmessageafterevent-类) | 无 | ModAPI 没有 /scriptevent 命令，自定义命令使用 CustomCommandTriggerServerEvent |

## 世界后事件

| 功能 | Script API | ModAPI | 说明 |
| --- | --- | --- | --- |
| 玩家加入游戏 | [`PlayerJoinAfterEvent`](../sapi/server/world/after_events#playerjoinafterevent-类) | [`AddServerPlayerEvent`](../modapi/events/world#addserverplayerevent) | 均在玩家加入时触发 |
| 玩家离开游戏 | [`PlayerLeaveAfterEvent`](../sapi/server/world/after_events#playerleaveafterevent-类) | [`DelServerPlayerEvent`](../modapi/events/world#delserverplayerevent) | ModAPI 在玩家已被删除之后触发 |
| 玩家生成 | [`PlayerSpawnAfterEvent`](../sapi/server/world/after_events#playerspawnafterevent-类) | [`PlayerRespawnEvent`](../modapi/events/player#playerrespawnevent) | Script API 的「生成」包含首次进入与复活，ModAPI 只覆盖复活 |
| 实体死亡 | [`EntityDieAfterEvent`](../sapi/server/world/after_events#entitydieafterevent-类) | [`MobDieEvent`](../modapi/events/entity#mobdieevent) | 语义一致 |
| 实体生命值改变 | [`EntityHealthChangedAfterEvent`](../sapi/server/world/after_events#entityhealthchangedafterevent-类) | [`HealthChangeServerEvent`](../modapi/events/entity#healthchangeserverevent) | 客户端侧另有 HealthChangeClientEvent |
| 实体击打方块 | [`EntityHitBlockAfterEvent`](../sapi/server/world/after_events#entityhitblockafterevent-类) | [`OnMobHitBlockServerEvent`](../modapi/events/entity#onmobhitblockserverevent) | ModAPI 需先调用 OpenMobHitBlockDetection 开启检测 |
| 实体击打实体 | [`EntityHitEntityAfterEvent`](../sapi/server/world/after_events#entityhitentityafterevent-类) | [`OnMobHitMobServerEvent`](../modapi/events/entity#onmobhitmobserverevent) | ModAPI 需先调用 OpenPlayerHitMobDetection 开启检测 |
| 实体受伤 | [`EntityHurtAfterEvent`](../sapi/server/world/after_events#entityhurtafterevent-类) | [`ActorHurtServerEvent`](../modapi/events/entity#actorhurtserverevent) | ModAPI 的事件同时覆盖玩家 |
| 物品完成使用 | [`ItemCompleteUseAfterEvent`](../sapi/server/world/after_events#itemcompleteuseafterevent-类) | 无 | ModAPI 未提供「使用完成」这一时机 |
| 物品释放使用 | [`ItemReleaseUseAfterEvent`](../sapi/server/world/after_events#itemreleaseuseafterevent-类) | [`ItemReleaseUsingServerEvent`](../modapi/events/item#itemreleaseusingserverevent) | 语义一致 |
| 物品开始使用 | [`ItemStartUseAfterEvent`](../sapi/server/world/after_events#itemstartuseafterevent-类) | [`StartUsingItemClientEvent`](../modapi/events/item#startusingitemclientevent) | ModAPI 只有客户端版本 |
| 物品开始对方块使用 | [`ItemStartUseOnAfterEvent`](../sapi/server/world/after_events#itemstartuseonafterevent-类) | [`ServerItemUseOnEvent`](../modapi/events/item#serveritemuseonevent) | 语义一致 |
| 物品停止使用 | [`ItemStopUseAfterEvent`](../sapi/server/world/after_events#itemstopuseafterevent-类) | [`StopUsingItemClientEvent`](../modapi/events/item#stopusingitemclientevent) | ModAPI 只有客户端版本 |
| 物品停止对方块使用 | [`ItemStopUseOnAfterEvent`](../sapi/server/world/after_events#itemstopuseonafterevent-类) | 无 | ModAPI 未提供 |
| 物品使用 | [`ItemUseAfterEvent`](../sapi/server/world/after_events#itemuseafterevent-类) | [`ItemUseAfterServerEvent`](../modapi/events/item#itemuseafterserverevent) | 语义一致 |
| 弹射物击中方块 | [`ProjectileHitBlockAfterEvent`](../sapi/server/world/after_events#projectilehitblockafterevent-类) | [`ProjectileDoHitEffectEvent`](../modapi/events/entity#projectiledohiteffectevent) | ModAPI 不区分命中的对象，方块与实体共用一个事件 |
| 弹射物击中实体 | [`ProjectileHitEntityAfterEvent`](../sapi/server/world/after_events#projectilehitentityafterevent-类) | [`ProjectileDoHitEffectEvent`](../modapi/events/entity#projectiledohiteffectevent) | 同上 |
| 实体加载 | [`EntityLoadAfterEvent`](../sapi/server/world/after_events#entityloadafterevent-类) | [`EntityLoadScriptEvent`](../modapi/events/entity#entityloadscriptevent) | 语义一致 |
| 实体移除 | [`EntityRemoveAfterEvent`](../sapi/server/world/after_events#entityremoveafterevent-类) | [`EntityRemoveEvent`](../modapi/events/world#entityremoveevent) | 语义一致 |
| 实体生成 | [`EntitySpawnAfterEvent`](../sapi/server/world/after_events#entityspawnafterevent-类) | [`AddEntityServerEvent`](../modapi/events/world#addentityserverevent) | 语义一致 |
| 玩家破坏方块 | [`PlayerBreakBlockAfterEvent`](../sapi/server/world/after_events#playerbreakblockafterevent-类) | [`DestroyBlockEvent`](../modapi/events/block#destroyblockevent) | 均在方块已被破坏之后触发 |
| 玩家维度更改 | [`PlayerDimensionChangeAfterEvent`](../sapi/server/world/after_events#playerdimensionchangeafterevent-类) | [`DimensionChangeFinishServerEvent`](../modapi/events/player#dimensionchangefinishserverevent) | ModAPI 另有开始事件 DimensionChangeServerEvent |
| 玩家放置方块 | [`PlayerPlaceBlockAfterEvent`](../sapi/server/world/after_events#playerplaceblockafterevent-类) | 无 | ModAPI 只提供「试图放置」，没有放置完成的事件 |
| 数据驱动实体触发实体事件 | [`DataDrivenEntityTriggerAfterEvent`](../sapi/server/world/after_events#datadrivenentitytriggerafterevent-类) | [`EntityDefinitionsEventServerEvent`](../modapi/events/entity#entitydefinitionseventserverevent) | 均为行为包中定义的 event 被触发 |
| 添加状态效果 | [`EffectAddAfterEvent`](../sapi/server/world/after_events#effectaddafterevent-类) | [`AddEffectServerEvent`](../modapi/events/entity#addeffectserverevent) | 语义一致 |
| 爆炸 | [`ExplosionAfterEvent`](../sapi/server/world/after_events#explosionafterevent-类) | [`ExplosionServerEvent`](../modapi/events/world#explosionserverevent) | 语义一致 |
| 天气更改 | [`WeatherChangeAfterEvent`](../sapi/server/world/after_events#weatherchangeafterevent-类) | [`OnRainLevelChangeServerEvent`](../modapi/events/world#onrainlevelchangeserverevent) | ModAPI 提供的是雨量等级变化，不覆盖晴与雷的切换 |
| 游戏规则更改 | [`GameRuleChangeAfterEvent`](../sapi/server/world/after_events#gamerulechangeafterevent-类) | 无 | ModAPI 未提供 |
| 玩家游戏模式更改 | [`PlayerGameModeChangeAfterEvent`](../sapi/server/world/after_events#playergamemodechangeafterevent-类) | [`GameTypeChangedServerEvent`](../modapi/events/player#gametypechangedserverevent) | 语义一致 |
| 玩家输入权限分类更改 | [`PlayerInputPermissionCategoryChangeAfterEvent`](../sapi/server/world/after_events#playerinputpermissioncategorychangeafterevent-类) | 无 | ModAPI 未提供 |
| 方块爆炸 | [`BlockExplodeAfterEvent`](../sapi/server/world/after_events#blockexplodeafterevent-类) | 无 | ModAPI 未提供独立事件 |
| 玩家发送表情 | [`PlayerEmoteAfterEvent`](../sapi/server/world/after_events#playeremoteafterevent-类) | 无 | ModAPI 未提供 |
| 玩家和方块交互 | [`PlayerInteractWithBlockAfterEvent`](../sapi/server/world/after_events#playerinteractwithblockafterevent-类) | [`ServerBlockUseEvent`](../modapi/events/block#serverblockuseevent) | ModAPI 的事件只对自定义方块生效 |
| 玩家和实体交互 | [`PlayerInteractWithEntityAfterEvent`](../sapi/server/world/after_events#playerinteractwithentityafterevent-类) | [`PlayerInteractServerEvent`](../modapi/events/player#playerinteractserverevent) | ModAPI 在可以交互时触发，不是交互完成之后 |
| 玩家输入模式更改 | [`PlayerInputModeChangeAfterEvent`](../sapi/server/world/after_events#playerinputmodechangeafterevent-类) | 无 | ModAPI 未提供 |
| 玩家输入按钮更改 | [`PlayerButtonInputAfterEvent`](../sapi/server/world/after_events#playerbuttoninputafterevent-类) | 无 | ModAPI 的控制类事件按具体按键与摇杆划分，粒度不同 |
| 世界加载 | [`WorldLoadAfterEvent`](../sapi/server/world/after_events#worldloadafterevent-类) | 无 | ModAPI 未提供 |
| 玩家快捷栏选择槽位更改 | [`PlayerHotbarSelectedSlotChangeAfterEvent`](../sapi/server/world/after_events#playerhotbarselectedslotchangeafterevent-类) | [`OnCarriedNewItemChangedServerEvent`](../modapi/events/item#oncarriednewitemchangedserverevent) | 语义一致 |
| 玩家物品栏物品更改 | [`PlayerInventoryItemChangeAfterEvent`](../sapi/server/world/after_events#playerinventoryitemchangeafterevent-类) | [`InventoryItemChangedServerEvent`](../modapi/events/item#inventoryitemchangedserverevent) | 语义一致 |
| 玩家开始挥舞 | [`PlayerSwingStartAfterEvent`](../sapi/server/world/after_events#playerswingstartafterevent-类) | 无 | ModAPI 未提供 |
| 实体回复生命 | [`EntityHealAfterEvent`](../sapi/server/world/after_events#entityhealafterevent-类) | [`HealthChangeServerEvent`](../modapi/events/entity#healthchangeserverevent) | ModAPI 不区分恢复与伤害，生命值变化统一触发 |
| 物品实体掉落 | [`EntityItemDropAfterEvent`](../sapi/server/world/after_events#entityitemdropafterevent-类) | [`EntityDroppedItemServerEvent`](../modapi/events/entity#entitydroppeditemserverevent) | 语义一致 |
| 实体拾取物品 | [`EntityItemPickupAfterEvent`](../sapi/server/world/after_events#entityitempickupafterevent-类) | [`EntityPickupItemServerEvent`](../modapi/events/entity#entitypickupitemserverevent) | 语义一致 |
| 方块容器关闭 | [`BlockContainerClosedAfterEvent`](../sapi/server/world/after_events#blockcontainerclosedafterevent-类) | [`ClientChestCloseEvent`](../modapi/events/ui#clientchestcloseevent) | ModAPI 只有客户端版本，且只覆盖箱子 |
| 方块容器打开 | [`BlockContainerOpenedAfterEvent`](../sapi/server/world/after_events#blockcontaineropenedafterevent-类) | [`ClientChestOpenEvent`](../modapi/events/ui#clientchestopenevent) | 同上 |
| 实体容器关闭 | [`EntityContainerClosedAfterEvent`](../sapi/server/world/after_events#entitycontainerclosedafterevent-类) | 无 | ModAPI 未提供 |
| 实体容器打开 | [`EntityContainerOpenedAfterEvent`](../sapi/server/world/after_events#entitycontaineropenedafterevent-类) | 无 | ModAPI 未提供 |
| 实体更新 | [`EntityUpgradeAfterEvent`](../sapi/server/world/after_events#entityupgradeafterevent-类) | 无 | ModAPI 未提供 |
| 世界时钟暂停 | [`WorldClockOnPausedAfterEvent`](../sapi/server/world/after_events#worldclockonpausedafterevent-类) | 无 | Script API 独有的时钟接口，ModAPI 没有对应机制 |
| 世界时钟恢复 | [`WorldClockOnResumedAfterEvent`](../sapi/server/world/after_events#worldclockonresumedafterevent-类) | 无 | 同上 |
| 世界时钟时间标记 | [`WorldClockOnTimeMarkerAfterEvent`](../sapi/server/world/after_events#worldclockontimemarkerafterevent-类) | 无 | 同上 |
| 世界时钟时间更改 | [`WorldClockOnTimeModifiedAfterEvent`](../sapi/server/world/after_events#worldclockontimemodifiedafterevent-类) | 无 | 同上 |
| 发送聊天消息 | [`ChatSendAfterEvent`](../sapi/server/world/after_events#chatsendafterevent-类) | [`ServerChatEvent`](../modapi/events/world#serverchatevent) | ModAPI 只有一个聊天事件，修改参数即可改变内容 |
| 实体开始潜行 | [`EntityStartSneakingAfterEvent`](../sapi/server/world/after_events#entitystartsneakingafterevent-类) | 无 | ModAPI 未提供 |
| 实体停止潜行 | [`EntityStopSneakingAfterEvent`](../sapi/server/world/after_events#entitystopsneakingafterevent-类) | 无 | ModAPI 未提供 |
| 实体被驯服 | [`EntityTamedAfterEvent`](../sapi/server/world/after_events#entitytamedafterevent-类) | [`MountTamingEvent`](../modapi/events/player#mounttamingevent) | ModAPI 的事件只覆盖坐骑类生物 |
| 附加包设置更改 | [`PackSettingChangeAfterEvent`](../sapi/server/world/after_events#packsettingchangeafterevent-类) | 无 | ModAPI 未提供 |
| 玩家取消破坏方块 | [`PlayerCancelBreakingBlockAfterEvent`](../sapi/server/world/after_events#playercancelbreakingblockafterevent-类) | 无 | ModAPI 未提供 |
| 玩家开始破坏方块 | [`PlayerStartBreakingBlockAfterEvent`](../sapi/server/world/after_events#playerstartbreakingblockafterevent-类) | [`StartDestroyBlockServerEvent`](../modapi/events/block#startdestroyblockserverevent) | 语义一致 |
| 玩家使用命名牌 | [`PlayerUseNameTagAfterEvent`](../sapi/server/world/after_events#playerusenametagafterevent-类) | [`PlayerNamedEntityServerEvent`](../modapi/events/player#playernamedentityserverevent) | 语义一致 |
| 音效播放完毕 | [`SoundCompletedAfterEvent`](../sapi/server/world/after_events#soundcompletedafterevent-类) | [`OnMusicStopClientEvent`](../modapi/events/sound#onmusicstopclientevent) | ModAPI 的事件只覆盖背景音乐 |
| 玩家合成配方 | [`PlayerCraftRecipeAfterEvent`](../sapi/server/world/after_events#playercraftrecipeafterevent-类) | [`CraftItemOutputChangeServerEvent`](../modapi/events/item#craftitemoutputchangeserverevent) | 触发点不完全相同 |
| 玩家光标抓取物品 | [`PlayerCursorItemGrabAfterEvent`](../sapi/server/world/after_events#playercursoritemgrabafterevent-类) | 无 | ModAPI 未提供 |
| 玩家光标释放物品 | [`PlayerCursorItemReleaseAfterEvent`](../sapi/server/world/after_events#playercursoritemreleaseafterevent-类) | 无 | ModAPI 未提供 |
| 服务器接收消息 | [`MessageReceiveAfterEvent`](../sapi/server/world/after_events#messagereceiveafterevent-类) | 无 | ModAPI 未提供 |
| 传送门激活 | [`PortalActivateAfterEvent`](../sapi/server/world/after_events#portalactivateafterevent-类) | 无 | ModAPI 未提供 |
| 虚拟容器关闭 | [`VirtualContainerCloseAfterEvent`](../sapi/server/world/after_events#virtualcontainercloseafterevent-类) | 无 | ModAPI 的自定义容器事件按增删物品划分，没有整体关闭的事件 |
| 虚拟容器物品更改 | [`VirtualContainerItemChangeAfterEvent`](../sapi/server/world/after_events#virtualcontaineritemchangeafterevent-类) | [`PlayerAddCustomContainerItemServerEvent`](../modapi/events/item#playeraddcustomcontaineritemserverevent) | ModAPI 按操作类型拆成多个事件 |
| 按下按钮 | [`ButtonPushAfterEvent`](../sapi/server/world/after_events#buttonpushafterevent-类) | 无 | ModAPI 未提供的红石元件事件之一 |
| 拉杆活动 | [`LeverActionAfterEvent`](../sapi/server/world/after_events#leveractionafterevent-类) | 无 | 同上 |
| 压力板弹出 | [`PressurePlatePopAfterEvent`](../sapi/server/world/after_events#pressureplatepopafterevent-类) | 无 | 同上 |
| 压力板压下 | [`PressurePlatePushAfterEvent`](../sapi/server/world/after_events#pressureplatepushafterevent-类) | 无 | 同上 |
| 击中标靶 | [`TargetBlockHitAfterEvent`](../sapi/server/world/after_events#targetblockhitafterevent-类) | 无 | 同上 |
| 绊线钩触发 | [`TripWireTripAfterEvent`](../sapi/server/world/after_events#tripwiretripafterevent-类) | 无 | 同上 |
| 活塞激活 | [`PistonActivateAfterEvent`](../sapi/server/world/after_events#pistonactivateafterevent-类) | [`PistonActionServerEvent`](../modapi/events/block#pistonactionserverevent) | ModAPI 在红石元件中只提供了活塞 |

## 世界前事件

| 功能 | Script API | ModAPI | 说明 |
| --- | --- | --- | --- |
| 使用物品 | [`ItemUseBeforeEvent`](../sapi/server/world/before_events#itemusebeforeevent-类) | [`ActorUseItemServerEvent`](../modapi/events/item#actoruseitemserverevent) | ModAPI 在生效之前触发，可修改参数 |
| 实体移除 | [`EntityRemoveBeforeEvent`](../sapi/server/world/before_events#entityremovebeforeevent-类) | 无 | ModAPI 只有移除之后的 EntityRemoveEvent |
| 玩家破坏方块 | [`PlayerBreakBlockBeforeEvent`](../sapi/server/world/before_events#playerbreakblockbeforeevent-类) | [`ServerPlayerTryDestroyBlockEvent`](../modapi/events/block#serverplayertrydestroyblockevent) | 两者都可阻止破坏 |
| 玩家离开 | [`PlayerLeaveBeforeEvent`](../sapi/server/world/before_events#playerleavebeforeevent-类) | [`PlayerIntendLeaveServerEvent`](../modapi/events/world#playerintendleaveserverevent) | 两者都可阻止离开 |
| 添加状态效果 | [`EffectAddBeforeEvent`](../sapi/server/world/before_events#effectaddbeforeevent-类) | [`WillAddEffectServerEvent`](../modapi/events/entity#willaddeffectserverevent) | 语义一致 |
| 爆炸 | [`ExplosionBeforeEvent`](../sapi/server/world/before_events#explosionbeforeevent-类) | 无 | ModAPI 只有爆炸之后的事件 |
| 玩家游戏模式更改 | [`PlayerGameModeChangeBeforeEvent`](../sapi/server/world/before_events#playergamemodechangebeforeevent-类) | 无 | ModAPI 只有更改之后的事件 |
| 天气更改 | [`WeatherChangeBeforeEvent`](../sapi/server/world/before_events#weatherchangebeforeevent-类) | 无 | ModAPI 未提供 |
| 玩家与方块交互 | [`PlayerInteractWithBlockBeforeEvent`](../sapi/server/world/before_events#playerinteractwithblockbeforeevent-类) | 无 | ModAPI 未提供 |
| 玩家与实体交互 | [`PlayerInteractWithEntityBeforeEvent`](../sapi/server/world/before_events#playerinteractwithentitybeforeevent-类) | 无 | ModAPI 未提供 |
| 实体回复生命 | [`EntityHealBeforeEvent`](../sapi/server/world/before_events#entityhealbeforeevent-类) | 无 | ModAPI 未区分恢复与伤害 |
| 实体受伤 | [`EntityHurtBeforeEvent`](../sapi/server/world/before_events#entityhurtbeforeevent-类) | [`HealthChangeBeforeServerEvent`](../modapi/events/entity#healthchangebeforeserverevent) | ModAPI 不区分伤害来源 |
| 实体拾取物品 | [`EntityItemPickupBeforeEvent`](../sapi/server/world/before_events#entityitempickupbeforeevent-类) | 无 | ModAPI 只有拾取之后的事件 |
| 实体被驯服 | [`EntityTamedBeforeEvent`](../sapi/server/world/before_events#entitytamedbeforeevent-类) | 无 | ModAPI 未提供 |
| 世界时钟重启 | [`WorldClockOnRestartBeforeEvent`](../sapi/server/world/before_events#worldclockonrestartbeforeevent-类) | 无 | Script API 独有的时钟接口 |
| 发送聊天消息 | [`ChatSendBeforeEvent`](../sapi/server/world/before_events#chatsendbeforeevent-类) | [`ServerChatEvent`](../modapi/events/world#serverchatevent) | 与后事件共用同一个事件，修改参数可拦截 |
| 玩家放置方块 | [`PlayerPlaceBlockBeforeEvent`](../sapi/server/world/before_events#playerplaceblockbeforeevent-类) | [`ServerEntityTryPlaceBlockEvent`](../modapi/events/block#serverentitytryplaceblockevent) | ModAPI 的事件同时覆盖其他生物 |

## 关于 ModAPI 独有的事件

ModAPI 共 302 个事件，上表中能与之对应的只有 49 个，其余 250 余个在 Script API 中没有语义相同的实现。这些事件大多依赖中国版特有的机制，迁移时无法直接套用：

- 自定义方块相关：`netease:random_tick` 配置的随机刻、`netease:neighborchanged_sendto_script` 配置的邻居变化、自定义方块实体的加载与卸载等
- 自定义 UI 与容器：界面栈的入栈出栈、自定义容器的物品增删
- 联机大厅与商城：房间房主变更、购买成功
- 物理系统：PhysX 模拟的前后事件与碰撞事件
- 模型动画：攻击、行走、跳跃动画的开始与结束
- 中国版的红石与机械元件：`BlockStrengthChangedServerEvent`

## 参考

- [Script API 世界后事件](../sapi/server/world/after_events)
- [Script API 世界前事件](../sapi/server/world/before_events)
- [Script API 系统后事件](../sapi/server/system/after_events)
- [Script API 系统前事件](../sapi/server/system/before_events)
- [ModAPI 事件](../modapi/events/world)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
