---
sidebar_position: 0
---

# 世界

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"
import EarlyExecution from "/src/components/highlight/earlyExecution"

本文主要记录世界相关接口。

---

## 世界信息

### world 常量

<Version type="script" add="1.0.0"/>

```typescript
const world: World;
```

[World](#world-类)，表示一个世界，即一组维度以及 Minecraft 的运行环境。

### World 类

<Version type="script" add="1.0.0"/>

表示一个世界，即一组维度以及 Minecraft 的运行环境。

```typescript
class World {
    private constructor();
    readonly afterEvents: WorldAfterEvents;
    readonly beforeEvents: WorldBeforeEvents;
    readonly gameRules: GameRules;
    readonly isHardcore: boolean;
    readonly primitiveShapesManager: PrimitiveShapesManager;
    readonly scoreboard: Scoreboard;
    readonly seed: string;
    readonly soundDefinitionRegistry: SoundDefinitionRegistry;
    readonly structureManager: StructureManager;
    readonly tickingAreaManager: TickingAreaManager;
    clearDynamicProperties(): void;
    getAbsoluteTime(): number;
    getAimAssist(): AimAssistRegistry;
    getAllPlayers(): Player[];
    getClock(name: string): WorldClock;
    getDay(): number;
    getDefaultSpawnLocation(): Vector3;
    getDifficulty(): Difficulty;
    getDimension(dimensionId: string): Dimension;
    getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined;
    getDynamicPropertyIds(): string[];
    getDynamicPropertyTotalByteCount(): number;
    getEntity(id: string): Entity | undefined;
    getLootTableManager(): LootTableManager;
    getMoonPhase(): MoonPhase;
    getPackSettings(): Record<string, string[] | boolean | number | string>;
    getPlayers(options?: EntityQueryOptions): Player[];
    getTimeOfDay(): number;
    playMusic(trackId: string, musicOptions?: MusicOptions): void;
    queueMusic(trackId: string, musicOptions?: MusicOptions): void;
    sendMessage(message: (RawMessage | string)[] | RawMessage | string): void;
    setAbsoluteTime(absoluteTime: number): void;
    setDefaultSpawnLocation(spawnLocation: Vector3): void;
    setDifficulty(difficulty: Difficulty): void;
    setDynamicProperties(values: Record<string, boolean | number | string | Vector3 | undefined>): void;
    setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void;
    setTimeOfDay(timeOfDay: number | TimeOfDay): void;
    stopMusic(): void;
    allowCheats: boolean;
    broadcastClientMessage(id: string, value: string): void;
}
```

#### 属性

- <Version type="script" add="1.4.0" inline/> <ReadOnly/> afterEvents: [WorldAfterEvents](#worldafterevents-类)，适用于整个世界的一组事件信号。事件回调会延迟调用，并在读写模式下执行。
- <Version type="script" add="1.4.0" inline/> <ReadOnly/> beforeEvents: [WorldBeforeEvents](#worldbeforeevents-类)，适用于整个世界的一组事件信号。事件回调会立即调用，并在只读模式下执行。
- <Version type="script" add="1.11.0" inline/> <ReadOnly/> gameRules: [GameRules](#gamerules-类)，适用于该世界的游戏规则。
- <Version type="script" add="1.15.0" inline/> <ReadOnly/> isHardcore: boolean，该世界是否为极限模式。
- <Version type="script" add="2.8.0" inline/> <ReadOnly/> primitiveShapesManager: [PrimitiveShapesManager](../../server/world/primitive_shapes#primitiveshapesmanager-类)，用于在该世界中添加和移除原始文本对象的管理器。
- <Version type="script" add="1.4.0" inline/> <ReadOnly/> scoreboard: [Scoreboard](../../server/world/scoreboard#scoreboard-类)，该世界的全局记分板。
- <Version type="script" add="2.6.0" inline/> <ReadOnly/> seed: string，该世界的种子。
- <Version type="script" add="2.10.0" inline/> <ReadOnly/> soundDefinitionRegistry: [SoundDefinitionRegistry](#sounddefinitionregistry-类)，该世界已加载的声音定义，可供只读访问。
- <Version type="script" add="1.10.0" inline/> <ReadOnly/> structureManager: [StructureManager](../../server/world/structure#structuremanager-类)，用于管理结构相关接口的管理器。
- <Version type="script" add="2.6.0" inline/> <ReadOnly/> tickingAreaManager: [TickingAreaManager](../../server/world/tickingarea#tickingareamanager-类)，用于添加、移除和查询行为包常加载区域的管理器。
- <Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/> allowCheats: boolean，世界是否允许作弊。

#### clearDynamicProperties 方法

<Version type="script" add="1.7.0" inline/>

清除该世界中为此行为包声明的全部动态属性。

```typescript
clearDynamicProperties(): void
```

#### getAbsoluteTime 方法

<Version type="script" add="1.4.0" inline/>

返回自世界创建以来经过的绝对时间。

```typescript
getAbsoluteTime(): number
```

**返回值**：number，自世界创建以来经过的时间，以游戏刻为单位。

#### getAimAssist 方法

<Version type="script" add="2.7.0" inline/>

返回该世界中可用的瞄准辅助预设与类别。

```typescript
getAimAssist(): AimAssistRegistry
```

**返回值**：[AimAssistRegistry](../../server/entity_and_player/aim_assist#aimassistregistry-类)，可用于查询瞄准辅助预设与类别的注册表。

#### getAllPlayers 方法

返回该世界中的所有在线玩家。

```typescript
getAllPlayers(): Player[]
```

**返回值**：[Player](../../server/entity_and_player/player#player-类)[]，当前所有在线玩家组成的数组。

#### getClock 方法

<Version type="script" add="2.11.0" inline/>

按名称获取世界时钟。

```typescript
getClock(name: string): WorldClock
```

- name: string，要获取的世界时钟的名称。

**返回值**：[WorldClock](../../server/world/world_clock#worldclock-类)，具有指定名称的世界时钟。

#### getDay 方法

<Version type="script" add="1.4.0" inline/>

返回当前的天数。该值由世界时间除以每天的游戏刻数得出，新世界从第 0 天开始。

```typescript
getDay(): number
```

**返回值**：number，当前的天数，从新世界的第 0 天开始。

#### getDefaultSpawnLocation 方法

<Version type="script" add="1.4.0" inline/>

返回默认的主世界出生点坐标。

```typescript
getDefaultSpawnLocation(): Vector3
```

**返回值**：[Vector3](../../server/general#vector3-接口)，默认出生点坐标。未设置时 Y 坐标可能为 32767。

#### getDifficulty 方法

<Version type="script" add="1.19.0" inline/>

返回该世界的难度。

```typescript
getDifficulty(): Difficulty
```

**返回值**：[Difficulty](#difficulty-枚举)，该世界当前的难度。

#### getDimension 方法

返回指定的维度。

```typescript
getDimension(dimensionId: string): Dimension
```

- dimensionId: string，维度的标识符，例如`minecraft:overworld`。

**返回值**：[Dimension](../../server/dimension/main#dimension-类)，具有指定标识符的维度。

#### getDynamicProperty 方法

<Version type="script" add="1.7.0" inline/>

返回指定动态属性的值。若该属性尚未设置，返回`undefined`。

```typescript
getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined
```

- identifier: string，动态属性的标识符。

**返回值**：boolean | number | string | [Vector3](../../server/general#vector3-接口) | undefined，动态属性的值；该属性尚未设置时为`undefined`。

#### getDynamicPropertyIds 方法

<Version type="script" add="1.7.0" inline/>

返回该世界中已设置的全部动态属性标识符。

```typescript
getDynamicPropertyIds(): string[]
```

**返回值**：string[]，已设置的动态属性标识符数组。

#### getDynamicPropertyTotalByteCount 方法

<Version type="script" add="1.7.0" inline/>

返回该世界全部动态属性的总字节数。

```typescript
getDynamicPropertyTotalByteCount(): number
```

**返回值**：number，全部动态属性占用的总字节数。

#### getEntity 方法

<Version type="script" add="1.7.0" inline/>

按唯一标识符返回实体。若实体不存在，返回`undefined`。

```typescript
getEntity(id: string): Entity | undefined
```

- id: string，实体的唯一标识符。

**返回值**：[Entity](../../server/entity_and_player/entity#entity-类) | undefined，具有指定标识符的实体；实体不存在时为`undefined`。

#### getLootTableManager 方法

<Version type="script" add="2.2.0" inline/>

返回一个战利品表管理器，可从多种来源生成战利品。

```typescript
getLootTableManager(): LootTableManager
```

**返回值**：[LootTableManager](../../server/world/loot_table#loottablemanager-类)，可用于从多种来源生成战利品的管理器。

#### getMoonPhase 方法

<Version type="script" add="1.6.0" inline/>

返回当前时间的月相。

```typescript
getMoonPhase(): MoonPhase
```

**返回值**：[MoonPhase](#moonphase-枚举)，当前时间的月相。

#### getPackSettings 方法

<Version type="script" add="2.8.0" inline/> <EarlyExecution/>

返回行为包设置名称与对应值的映射。

```typescript
getPackSettings(): Record<string, string[] | boolean | number | string>
```

**返回值**：Record&lt;string, string[] | boolean | number | string&gt;，行为包设置名称到对应值的映射。

#### getPlayers 方法

<Version type="script" add="1.1.0" inline/>

返回符合筛选条件的玩家。

```typescript
getPlayers(options?: EntityQueryOptions): Player[]
```

- options?: [EntityQueryOptions](../../server/entity_and_player/entity#entityqueryoptions-接口)，玩家的筛选项。

**返回值**：[Player](../../server/entity_and_player/player#player-类)[]，符合筛选条件的玩家数组。

#### getTimeOfDay 方法

<Version type="script" add="1.4.0" inline/>

返回一天内的时间，以游戏刻为单位，范围从 0 到 24000。

```typescript
getTimeOfDay(): number
```

**返回值**：number，一天内的时间，以游戏刻为单位，范围从 0 到 24000。

#### playMusic 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

为所有玩家播放指定的音乐。

```typescript
playMusic(trackId: string, musicOptions?: MusicOptions): void
```

- trackId: string，要播放的音乐的标识符。
- musicOptions?: [MusicOptions](../../server/general#musicoptions-接口)，音乐播放的选项。

#### queueMusic 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

为玩家排队播放一首额外的音乐。若当前没有正在播放的音乐，则立即播放。

```typescript
queueMusic(trackId: string, musicOptions?: MusicOptions): void
```

- trackId: string，要加入播放队列的音乐的标识符。
- musicOptions?: [MusicOptions](../../server/general#musicoptions-接口)，音乐播放的选项。

#### sendMessage 方法

<Version type="script" add="1.1.0" inline/>

向所有玩家发送消息。

```typescript
sendMessage(message: (RawMessage | string)[] | RawMessage | string): void
```

- message: ([RawMessage](../../server/general#rawmessage-接口) | string)[] | [RawMessage](../../server/general#rawmessage-接口) | string，要发送的消息，可以是字符串、原始消息对象或它们的数组。

#### setAbsoluteTime 方法

<Version type="script" add="1.4.0" inline/> <RestrictedMode inline/>

设置世界时间。

```typescript
setAbsoluteTime(absoluteTime: number): void
```

- absoluteTime: number，要设置的绝对时间，以游戏刻为单位。

#### setDefaultSpawnLocation 方法

<Version type="script" add="1.4.0" inline/> <RestrictedMode inline/>

设置所有玩家的默认出生点。

```typescript
setDefaultSpawnLocation(spawnLocation: Vector3): void
```

- spawnLocation: [Vector3](../../server/general#vector3-接口)，要设置的默认出生点坐标。

#### setDifficulty 方法

<Version type="script" add="1.19.0" inline/> <RestrictedMode inline/>

设置该世界的难度。

```typescript
setDifficulty(difficulty: Difficulty): void
```

- difficulty: [Difficulty](#difficulty-枚举)，要设置的难度。

#### setDynamicProperties 方法

<Version type="script" add="2.3.0" inline/>

将多个动态属性设置为指定的值。

```typescript
setDynamicProperties(
    values: Record<string, boolean | number | string | Vector3 | undefined>,
): void
```

- values: Record&lt;string, boolean | number | string | [Vector3](../../server/general#vector3-接口) | undefined&gt;，代表动态属性的对象。若其中某个属性的值为`undefined`，则移除该属性。

#### setDynamicProperty 方法

<Version type="script" add="1.7.0" inline/>

将指定的动态属性设置为指定值。若不传入值，则移除该属性。

```typescript
setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void
```

- identifier: string，动态属性的标识符。
- value?: boolean | number | string | [Vector3](../../server/general#vector3-接口)，要设置的值。若不传入，则移除该属性。

#### setTimeOfDay 方法

<Version type="script" add="1.4.0" inline/> <RestrictedMode inline/>

设置一天内的时间。

```typescript
setTimeOfDay(timeOfDay: number | TimeOfDay): void
```

- timeOfDay: number | [TimeOfDay](#timeofday-枚举)，要设置的一天内的时间，可以是以游戏刻为单位的数字，也可以是`TimeOfDay`枚举。

#### stopMusic 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

停止当前正在播放的音乐。

```typescript
stopMusic(): void
```

#### broadcastClientMessage 方法

<Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/>

向所有客户端广播消息。

```typescript
broadcastClientMessage(id: string, value: string): void
```

- id: string，要发送的消息标识符。
- value: string，要发送的消息内容。

### WorldAfterEvents 类

<Version type="script" add="1.3.0"/>

包含适用于整个世界的全部后事件信号。事件回调会延迟调用，并在读写模式下执行；各信号的说明与用法见[世界后事件](./after_events)。

```typescript
class WorldAfterEvents {
    private constructor();
    readonly blockContainerClosed: BlockContainerClosedAfterEventSignal;
    readonly blockContainerOpened: BlockContainerOpenedAfterEventSignal;
    readonly blockExplode: BlockExplodeAfterEventSignal;
    readonly buttonPush: ButtonPushAfterEventSignal;
    readonly dataDrivenEntityTrigger: DataDrivenEntityTriggerAfterEventSignal;
    readonly effectAdd: EffectAddAfterEventSignal;
    readonly entityContainerClosed: EntityContainerClosedAfterEventSignal;
    readonly entityContainerOpened: EntityContainerOpenedAfterEventSignal;
    readonly entityDie: EntityDieAfterEventSignal;
    readonly entityHeal: EntityHealAfterEventSignal;
    readonly entityHealthChanged: EntityHealthChangedAfterEventSignal;
    readonly entityHitBlock: EntityHitBlockAfterEventSignal;
    readonly entityHitEntity: EntityHitEntityAfterEventSignal;
    readonly entityHurt: EntityHurtAfterEventSignal;
    readonly entityItemDrop: EntityItemDropAfterEventSignal;
    readonly entityItemPickup: EntityItemPickupAfterEventSignal;
    readonly entityLoad: EntityLoadAfterEventSignal;
    readonly entityRemove: EntityRemoveAfterEventSignal;
    readonly entitySpawn: EntitySpawnAfterEventSignal;
    readonly entityStartSneaking: EntityStartSneakingAfterEventSignal;
    readonly entityStopSneaking: EntityStopSneakingAfterEventSignal;
    readonly entityTamed: EntityTamedAfterEventSignal;
    readonly entityUpgrade: EntityUpgradeAfterEventSignal;
    readonly explosion: ExplosionAfterEventSignal;
    readonly gameRuleChange: GameRuleChangeAfterEventSignal;
    readonly itemCompleteUse: ItemCompleteUseAfterEventSignal;
    readonly itemReleaseUse: ItemReleaseUseAfterEventSignal;
    readonly itemStartUse: ItemStartUseAfterEventSignal;
    readonly itemStartUseOn: ItemStartUseOnAfterEventSignal;
    readonly itemStopUse: ItemStopUseAfterEventSignal;
    readonly itemStopUseOn: ItemStopUseOnAfterEventSignal;
    readonly itemUse: ItemUseAfterEventSignal;
    readonly leverAction: LeverActionAfterEventSignal;
    readonly pistonActivate: PistonActivateAfterEventSignal;
    readonly playerBreakBlock: PlayerBreakBlockAfterEventSignal;
    readonly playerButtonInput: PlayerButtonInputAfterEventSignal;
    readonly playerCancelBreakingBlock: PlayerCancelBreakingBlockAfterEventSignal;
    readonly playerDimensionChange: PlayerDimensionChangeAfterEventSignal;
    readonly playerEmote: PlayerEmoteAfterEventSignal;
    readonly playerGameModeChange: PlayerGameModeChangeAfterEventSignal;
    readonly playerHotbarSelectedSlotChange: PlayerHotbarSelectedSlotChangeAfterEventSignal;
    readonly playerInputModeChange: PlayerInputModeChangeAfterEventSignal;
    readonly playerInputPermissionCategoryChange: PlayerInputPermissionCategoryChangeAfterEventSignal;
    readonly playerInteractWithBlock: PlayerInteractWithBlockAfterEventSignal;
    readonly playerInteractWithEntity: PlayerInteractWithEntityAfterEventSignal;
    readonly playerInventoryItemChange: PlayerInventoryItemChangeAfterEventSignal;
    readonly playerJoin: PlayerJoinAfterEventSignal;
    readonly playerLeave: PlayerLeaveAfterEventSignal;
    readonly playerPlaceBlock: PlayerPlaceBlockAfterEventSignal;
    readonly playerSpawn: PlayerSpawnAfterEventSignal;
    readonly playerStartBreakingBlock: PlayerStartBreakingBlockAfterEventSignal;
    readonly playerSwingStart: PlayerSwingStartAfterEventSignal;
    readonly pressurePlatePop: PressurePlatePopAfterEventSignal;
    readonly pressurePlatePush: PressurePlatePushAfterEventSignal;
    readonly projectileHitBlock: ProjectileHitBlockAfterEventSignal;
    readonly projectileHitEntity: ProjectileHitEntityAfterEventSignal;
    readonly soundCompleted: SoundCompletedAfterEventSignal;
    readonly targetBlockHit: TargetBlockHitAfterEventSignal;
    readonly tripWireTrip: TripWireTripAfterEventSignal;
    readonly weatherChange: WeatherChangeAfterEventSignal;
    readonly worldClockOnPaused: WorldClockOnPausedAfterEventSignal;
    readonly worldClockOnResumed: WorldClockOnResumedAfterEventSignal;
    readonly worldClockOnTimeMarker: WorldClockOnTimeMarkerAfterEventSignal;
    readonly worldClockOnTimeModified: WorldClockOnTimeModifiedAfterEventSignal;
    readonly worldLoad: WorldLoadAfterEventSignal;
    readonly chatSend: ChatSendAfterEventSignal;
    readonly messageReceive: ServerMessageAfterEventSignal;
    readonly packSettingChange: PackSettingChangeAfterEventSignal;
    readonly playerCraftRecipe: PlayerCraftRecipeAfterEventSignal;
    readonly playerCursorItemGrab: PlayerCursorItemGrabAfterEventSignal;
    readonly playerCursorItemRelease: PlayerCursorItemReleaseAfterEventSignal;
    readonly playerUseNameTag: PlayerUseNameTagAfterEventSignal;
}
```

#### 属性

以上属性均为事件信号，可按名称在[世界后事件](./after_events)中查阅用法。

### WorldBeforeEvents 类

<Version type="script" add="1.4.0"/>

包含适用于整个世界的全部前事件信号。事件回调会立即调用，并在只读模式下执行；各信号的说明与用法见[世界前事件](./before_events)。

```typescript
class WorldBeforeEvents {
    private constructor();
    readonly effectAdd: EffectAddBeforeEventSignal;
    readonly entityHeal: EntityHealBeforeEventSignal;
    readonly entityHurt: EntityHurtBeforeEventSignal;
    readonly entityItemPickup: EntityItemPickupBeforeEventSignal;
    readonly entityRemove: EntityRemoveBeforeEventSignal;
    readonly entityTamed: EntityTamedBeforeEventSignal;
    readonly explosion: ExplosionBeforeEventSignal;
    readonly itemUse: ItemUseBeforeEventSignal;
    readonly playerBreakBlock: PlayerBreakBlockBeforeEventSignal;
    readonly playerGameModeChange: PlayerGameModeChangeBeforeEventSignal;
    readonly playerInteractWithBlock: PlayerInteractWithBlockBeforeEventSignal;
    readonly playerInteractWithEntity: PlayerInteractWithEntityBeforeEventSignal;
    readonly playerLeave: PlayerLeaveBeforeEventSignal;
    readonly weatherChange: WeatherChangeBeforeEventSignal;
    readonly worldClockOnRestart: WorldClockOnRestartBeforeEventSignal;
    readonly chatSend: ChatSendBeforeEventSignal;
    readonly playerItemAttackEntity: PlayerItemAttackEntityBeforeEventSignal;
    readonly playerPlaceBlock: PlayerPlaceBlockBeforeEventSignal;
}
```

#### 属性

以上属性均为事件信号，可按名称在[世界前事件](./before_events)中查阅用法。

---

## 游戏规则

### GameRules 类

<Version type="script" add="1.11.0"/>

表示该世界的游戏规则，对应`/gamerule`命令中的各项开关。

```typescript
class GameRules {
    private constructor();
    commandBlockOutput: boolean;
    commandBlocksEnabled: boolean;
    doDayLightCycle: boolean;
    doEntityDrops: boolean;
    doFireTick: boolean;
    doImmediateRespawn: boolean;
    doInsomnia: boolean;
    doLimitedCrafting: boolean;
    doMobLoot: boolean;
    doMobSpawning: boolean;
    doTileDrops: boolean;
    doWeatherCycle: boolean;
    drowningDamage: boolean;
    fallDamage: boolean;
    fireDamage: boolean;
    freezeDamage: boolean;
    functionCommandLimit: number;
    keepInventory: boolean;
    maxCommandChainLength: number;
    mobGriefing: boolean;
    naturalRegeneration: boolean;
    playersSleepingPercentage: number;
    projectilesCanBreakBlocks: boolean;
    pvp: boolean;
    randomTickSpeed: number;
    recipesUnlock: boolean;
    respawnBlocksExplode: boolean;
    sendCommandFeedback: boolean;
    showBorderEffect: boolean;
    showCoordinates: boolean;
    showDaysPlayed: boolean;
    showDeathMessages: boolean;
    showRecipeMessages: boolean;
    showTags: boolean;
    spawnRadius: number;
    tntExplodes: boolean;
    tntExplosionDropDecay: boolean;
    playerWaypoints: PlayerWaypointsMode;
}
```

#### 属性

- <RestrictedMode inline/> commandBlockOutput: boolean，命令方块执行命令时是否在聊天栏显示输出。
- <RestrictedMode inline/> commandBlocksEnabled: boolean，是否启用命令方块。
- <RestrictedMode inline/> doDayLightCycle: boolean，是否进行昼夜更替。
- <RestrictedMode inline/> doEntityDrops: boolean，实体死亡时是否掉落物品。
- <RestrictedMode inline/> doFireTick: boolean，火是否蔓延与熄灭。
- <RestrictedMode inline/> doImmediateRespawn: boolean，玩家死亡后是否立即重生。
- <RestrictedMode inline/> doInsomnia: boolean，玩家长期不睡觉时是否生成幻翼。
- <RestrictedMode inline/> doLimitedCrafting: boolean，是否限制玩家只能合成已解锁的配方。
- <RestrictedMode inline/> doMobLoot: boolean，生物死亡时是否掉落战利品。
- <RestrictedMode inline/> doMobSpawning: boolean，是否自然生成生物。
- <RestrictedMode inline/> doTileDrops: boolean，方块被破坏时是否掉落物品。
- <RestrictedMode inline/> doWeatherCycle: boolean，天气是否随时间变化。
- <RestrictedMode inline/> drowningDamage: boolean，是否造成溺水伤害。
- <RestrictedMode inline/> fallDamage: boolean，是否造成摔落伤害。
- <RestrictedMode inline/> fireDamage: boolean，是否造成火焰伤害。
- <RestrictedMode inline/> freezeDamage: boolean，是否造成冰冻伤害。
- <RestrictedMode inline/> functionCommandLimit: number，单次执行`.mcfunction`文件时最多可运行的命令数量。
- <RestrictedMode inline/> keepInventory: boolean，玩家死亡后是否保留物品栏。
- <RestrictedMode inline/> maxCommandChainLength: number，命令方块链在一次执行中最多可运行的命令数量。
- <RestrictedMode inline/> mobGriefing: boolean，生物是否可以破坏或移动方块（例如苦力怕爆炸、末影人搬方块）。
- <RestrictedMode inline/> naturalRegeneration: boolean，玩家是否自然恢复生命值。
- <RestrictedMode inline/> playersSleepingPercentage: number，跳过夜晚所需的入睡玩家百分比。
- <RestrictedMode inline/> projectilesCanBreakBlocks: boolean，投掷物是否会破坏方块。
- <RestrictedMode inline/> pvp: boolean，玩家之间是否可以互相造成伤害。
- <RestrictedMode inline/> randomTickSpeed: number，每个区块每游戏刻执行的随机刻数量。
- <RestrictedMode inline/> recipesUnlock: boolean，是否自动解锁配方。
- <RestrictedMode inline/> respawnBlocksExplode: boolean，重生点附近的方块是否会因重生而破坏。
- <RestrictedMode inline/> sendCommandFeedback: boolean，是否向命令执行者显示命令反馈。
- <RestrictedMode inline/> showBorderEffect: boolean，是否显示世界边界的效果。
- <RestrictedMode inline/> showCoordinates: boolean，是否在屏幕上显示玩家坐标。
- <Version type="script" add="1.12.0" inline/> <RestrictedMode inline/> showDaysPlayed: boolean，是否在屏幕上显示已游玩天数。
- <RestrictedMode inline/> showDeathMessages: boolean，是否在聊天栏显示死亡消息。
- <RestrictedMode inline/> showRecipeMessages: boolean，是否显示配方解锁提示。
- <RestrictedMode inline/> showTags: boolean，是否显示物品与方块的标签。
- <RestrictedMode inline/> spawnRadius: number，玩家重生时出生点的半径。
- <RestrictedMode inline/> tntExplodes: boolean，TNT 被点燃后是否会爆炸。
- <RestrictedMode inline/> tntExplosionDropDecay: boolean，TNT 爆炸时掉落物是否会衰减。
- <Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/> playerWaypoints: [PlayerWaypointsMode](../../server/entity_and_player/player#playerwaypointsmode-枚举)，玩家路径点模式。

### GameRule 枚举

<Version type="script" add="1.11.0"/>

游戏规则的标识符，用于`world.gameRules`与游戏规则变更事件。

```typescript
enum GameRule {
    CommandBlockOutput = "commandBlockOutput", // 是否广播命令方块的执行反馈
    CommandBlocksEnabled = "commandBlocksEnabled", // 是否启用命令方块
    DoDayLightCycle = "doDayLightCycle", // 是否进行昼夜更替
    DoEntityDrops = "doEntityDrops", // 实体死亡时是否掉落物品
    DoFireTick = "doFireTick", // 火焰是否蔓延与熄灭
    DoImmediateRespawn = "doImmediateRespawn", // 玩家死亡后是否立即重生
    DoInsomnia = "doInsomnia", // 夜晚是否生成幻翼
    DoLimitedCrafting = "doLimitedCrafting", // 是否限制玩家只能合成已解锁的配方
    DoMobLoot = "doMobLoot", // 生物死亡时是否掉落战利品
    DoMobSpawning = "doMobSpawning", // 是否自然生成生物
    DoTileDrops = "doTileDrops", // 方块被破坏时是否掉落物品
    DoWeatherCycle = "doWeatherCycle", // 天气是否循环变化
    DrowningDamage = "drowningDamage", // 是否造成溺水伤害
    FallDamage = "fallDamage", // 是否造成摔落伤害
    FireDamage = "fireDamage", // 是否造成火焰伤害
    FreezeDamage = "freezeDamage", // 是否造成冰冻伤害
    FunctionCommandLimit = "functionCommandLimit", // 单个函数中命令的执行数量上限
    KeepInventory = "keepInventory", // 玩家死亡后是否保留物品栏
    MaxCommandChainLength = "maxCommandChainLength", // 命令链的最大长度
    MobGriefing = "mobGriefing", // 生物是否可以破坏或改变方块
    NaturalRegeneration = "naturalRegeneration", // 玩家是否自然恢复生命
    PlayersSleepingPercentage = "playersSleepingPercentage", // 跳过夜晚所需的入睡玩家百分比
    ProjectilesCanBreakBlocks = "projectilesCanBreakBlocks", // 弹射物是否可以破坏方块
    Pvp = "pvp", // 玩家之间是否可以互相伤害
    RandomTickSpeed = "randomTickSpeed", // 随机刻的速度
    RecipesUnlock = "recipesUnlock", // 玩家是否会解锁新配方
    RespawnBlocksExplode = "respawnBlocksExplode", // 重生点附近的方块是否会爆炸
    SendCommandFeedback = "sendCommandFeedback", // 是否向执行者显示命令反馈
    ShowBorderEffect = "showBorderEffect", // 是否显示世界边界效果
    ShowCoordinates = "showCoordinates", // 是否在界面显示坐标
    ShowDaysPlayed = "showDaysPlayed", // 是否在界面显示已游玩天数
    ShowDeathMessages = "showDeathMessages", // 是否显示死亡消息
    ShowRecipeMessages = "showRecipeMessages", // 是否显示配方相关消息
    ShowTags = "showTags", // 是否在界面显示物品标签
    SpawnRadius = "spawnRadius", // 玩家重生的生成半径
    TntExplodes = "tntExplodes", // TNT 是否会爆炸
    TntExplosionDropDecay = "tntExplosionDropDecay", // TNT 爆炸掉落的物品是否会消失
    PlayerWaypoints = "playerWaypoints", // 是否启用玩家定位栏（测试版API）
}
```

---

## 声音定义

### SoundDefinitionRegistry 类

<Version type="script" add="2.10.0"/>

该世界已加载的声音定义的只读注册表。

```typescript
class SoundDefinitionRegistry {
    private constructor();
    getDefinitions(filter?: SoundDefinitionFilter): SoundDefinition[];
}
```

#### getDefinitions 方法

返回注册表中的声音定义，可传入筛选条件缩小范围。

```typescript
getDefinitions(filter?: SoundDefinitionFilter): SoundDefinition[]
```

- filter?: [SoundDefinitionFilter](#sounddefinitionfilter-接口)，声音定义的筛选条件。若不传入则返回全部声音定义。

**返回值**：[SoundDefinition](../../server/general#sounddefinition-类)[]，符合筛选条件的声音定义数组；没有匹配项时为空数组。

### SoundDefinitionFilter 接口

<Version type="script" add="2.10.0"/>

缩小声音定义查询范围的筛选条件。各字段均可选，只有已定义的字段才会生效。

```typescript
interface SoundDefinitionFilter {
    artists?: string[];
    genres?: string[];
    maxDuration?: number;
    minDuration?: number;
    moods?: string[];
    tags?: Record<string, string[]>;
    titles?: string[];
}
```

#### 属性

- <Optional/> artists: string[]，与声音的`music_info.artist`匹配的作者名，不区分大小写。
- <Optional/> genres: string[]，与声音的`music_info.genres`匹配的流派，不区分大小写。
- <Optional/> maxDuration: number，时长上限，以秒为单位（含）。超出该上限或未声明时长的声音会被排除。
- <Optional/> minDuration: number，时长下限，以秒为单位（含）。不足该下限或未声明时长的声音会被排除。
- <Optional/> moods: string[]，与声音的`music_info.moods`匹配的情绪分类，不区分大小写。
- <Optional/> tags: Record&lt;string, string[]&gt;，与声音标签匹配的约束，标签名与取值均不区分大小写。
- <Optional/> titles: string[]，与声音的`music_info.title`匹配的标题，不区分大小写。

---

## 难度

### Difficulty 枚举

<Version type="script" add="1.19.0"/>

该世界的难度等级。

```typescript
enum Difficulty {
    Easy = "Easy", // 简单难度
    Hard = "Hard", // 困难难度
    Normal = "Normal", // 普通难度
    Peaceful = "Peaceful", // 和平难度，不会自然生成敌对生物，饥饿也不会耗尽生命值
}
```

---

## 月相

### MoonPhaseCount 常量

<Version type="script" add="1.6.0"/>

```typescript
const MoonPhaseCount = 8;
```

月相的数量，即[MoonPhase](#moonphase-枚举)枚举的取值个数，值为`8`。

### MoonPhase 枚举

<Version type="script" add="1.6.0"/>

月相。月相随天数循环变化，可通过[World.getMoonPhase](./main#getmoonphase-方法)获取当前月相。

```typescript
enum MoonPhase {
    FullMoon = 0, // 满月，最亮的月相。该月相下猫有 50% 的概率生成黑猫
    WaningGibbous = 1, // 亏凸月，满月之后的月相
    FirstQuarter = 2, // 上弦月，盈月之后的月相
    WaningCrescent = 3, // 残月，下弦月之后的月相
    NewMoon = 4, // 新月，最暗的月相
    WaxingCrescent = 5, // 蛾眉月，新月之后的月相
    LastQuarter = 6, // 下弦月，亏凸月之后的月相
    WaxingGibbous = 7, // 盈凸月，上弦月之后的月相
}
```

---

## 时间

### TicksPerSecond 常量

<Version type="script" add="1.7.0"/>

```typescript
const TicksPerSecond = 20;
```

服务器在每现实秒内执行的游戏刻数量，值为`20`。

### TicksPerDay 常量

<Version type="script" add="2.0.0"/>

```typescript
const TicksPerDay = 24000;
```

服务器在一个游戏日内执行的游戏刻数量，值为`24000`。

### TimeOfDay 枚举

<Version type="script" add="1.4.0"/>

一天中常见时刻对应的游戏刻数值，可传给[World.setTimeOfDay](./main#settimeofday-方法)。

```typescript
enum TimeOfDay {
    Day = 1000, // 白天开始（约早上 7 点）
    Noon = 6000, // 正午
    Sunset = 12000, // 日落（约下午 6 点）
    Night = 13000, // 夜晚开始（约晚上 7 点）
    Midnight = 18000, // 午夜（约凌晨 0 点）
    Sunrise = 23000, // 日出（约早上 5 点）
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
