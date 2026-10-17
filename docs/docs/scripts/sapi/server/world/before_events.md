---
sidebar_position: 1
---

# 世界前事件

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import EarlyExecution from "/src/components/highlight/earlyExecution"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录世界前事件相关接口。

前事件在事件实际发生前触发，多数前事件都可以取消事件的发生。在前事件的回调中，代码处于受限执行状态，无法执行会更改世界的代码，必须使用`system.run()`延后执行。

---

## 世界前事件表

**世界前事件（World Before Events）** 是指事件实际发生前执行的代码。多数前事件都可以取消事件实际发生。前事件会导致代码进入受限执行，无法执行会更改世界的代码，必须使用`system.run()`延后执行。

| 事件               |                                                            事件类                                                             |                                                   是否支持筛选项                                                   | 是否可取消 | [脚本版本](../../version_table) |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :--------: | :-------------------------: |
| **使用物品**       |                  [`ItemUseBeforeEvent`](#itemusebeforeevent-类)                  |                                                       不支持                                                       |     是     |           `1.4.0`           |
| 实体移除           |             [`EntityRemoveBeforeEvent`](#entityremovebeforeevent-类)             |                                                       不支持                                                       |     否     |           `1.6.0`           |
| **玩家破坏方块**   |         [`PlayerBreakBlockBeforeEvent`](#playerbreakblockbeforeevent-类)         |            [`BlockEventOptions`](./event_types#blockeventoptions-接口)            |     是     |           `1.6.0`           |
| 玩家离开           |              [`PlayerLeaveBeforeEvent`](#playerleavebeforeevent-类)              |                                                       不支持                                                       |     否     |           `1.7.0`           |
| 添加状态效果       |                [`EffectAddBeforeEvent`](#effectaddbeforeevent-类)                |                                                       不支持                                                       |     是     |           `1.9.0`           |
| **爆炸**           |                [`ExplosionBeforeEvent`](#explosionbeforeevent-类)                |                                                       不支持                                                       |     是     |           `1.9.0`           |
| 玩家游戏模式更改   |     [`PlayerGameModeChangeBeforeEvent`](#playergamemodechangebeforeevent-类)     |                                                       不支持                                                       |     是     |          `1.11.0`           |
| 天气更改           |            [`WeatherChangeBeforeEvent`](#weatherchangebeforeevent-类)            |                                                       不支持                                                       |     是     |          `1.11.0`           |
| **玩家与方块交互** |  [`PlayerInteractWithBlockBeforeEvent`](#playerinteractwithblockbeforeevent-类)  |                                                       不支持                                                       |     是     |          `1.15.0`           |
| **玩家与实体交互** | [`PlayerInteractWithEntityBeforeEvent`](#playerinteractwithentitybeforeevent-类) |                                                       不支持                                                       |     是     |          `1.15.0`           |
| 实体回复生命       |               [`EntityHealBeforeEvent`](#entityhealbeforeevent-类)               |       [`EntityHealEventOptions`](./event_types#entityhealeventoptions-接口)       |     是     |           `2.6.0`           |
| **实体受伤**       |               [`EntityHurtBeforeEvent`](#entityhurtbeforeevent-类)               | [`EntityHurtBeforeEventOptions`](./event_types#entityhurtbeforeeventoptions-接口) |     是     |           `2.6.0`           |
| 实体拾取物品       |         [`EntityItemPickupBeforeEvent`](#entityitempickupbeforeevent-类)         | [`EntityItemPickupEventOptions`](./event_types#entityitempickupeventoptions-接口) |     是     |           `2.6.0`           |
| 实体被驯服         |              [`EntityTamedBeforeEvent`](#entitytamedbeforeevent-类)              |      [`EntityTamedEventOptions`](./event_types#entitytamedeventoptions-接口)      |     是     |          `2.10.0`           |
| 世界时钟重启       |      [`WorldClockOnRestartBeforeEvent`](#worldclockonrestartbeforeevent-类)      |       [`WorldClockEventOptions`](./event_types#worldclockeventoptions-接口)       |     是     |          `2.11.0`           |
| 发送聊天消息       |                 [`ChatSendBeforeEvent`](#chatsendbeforeevent-类)                 |                                                       不支持                                                       |     是     |           `beta`            |
| 玩家放置方块       |         [`PlayerPlaceBlockBeforeEvent`](#playerplaceblockbeforeevent-类)         |            [`BlockEventOptions`](./event_types#blockeventoptions-接口)            |     是     |           `beta`            |
| 玩家物品攻击实体   |   [`PlayerItemAttackEntityBeforeEvent`](#playeritemattackentitybeforeevent-类)   |                                                       不支持                                                       |     是     |           `beta`            |

**备注**：

- *是否支持筛选项*是指事件的订阅函数`subscribe`是否支持第二个参数`options`。若支持，则给出它的类型。

## 使用物品事件

### ItemUseBeforeEventSignal 类

<Version type="script" add="1.4.0"/>

当使用物品前触发该事件信号。

```typescript
class ItemUseBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: ItemUseBeforeEvent) => void): (arg0: ItemUseBeforeEvent) => void;
    unsubscribe(callback: (arg0: ItemUseBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ItemUseBeforeEvent](#itemusebeforeevent-类)) => void) => (arg0: [ItemUseBeforeEvent](#itemusebeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ItemUseBeforeEvent](#itemusebeforeevent-类)) => void) => void，取消订阅该事件。

### ItemUseBeforeEvent 类

<Version type="script" add="1.4.0"/>

使用物品前的事件信息。

```typescript
class ItemUseBeforeEvent {
    private constructor();
    cancel: boolean;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消使用物品的行为。

---

## 实体移除事件

### EntityRemoveBeforeEventSignal 类

<Version type="script" add="1.6.0"/>

当实体移除前触发该事件信号。

```typescript
class EntityRemoveBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: EntityRemoveBeforeEvent) => void): (arg0: EntityRemoveBeforeEvent) => void;
    unsubscribe(callback: (arg0: EntityRemoveBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityRemoveBeforeEvent](#entityremovebeforeevent-类)) => void) => (arg0: [EntityRemoveBeforeEvent](#entityremovebeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityRemoveBeforeEvent](#entityremovebeforeevent-类)) => void) => void，取消订阅该事件。

### EntityRemoveBeforeEvent 类

<Version type="script" add="1.6.0"/>

实体移除前的事件信息。

```typescript
class EntityRemoveBeforeEvent {
    private constructor();
    readonly removedEntity: Entity;
}
```

#### 属性

- <ReadOnly/> removedEntity: [Entity](../entity_and_player/entity#entity-类)，即将从游戏中移除的实体的引用。

---

## 玩家破坏方块事件

### PlayerBreakBlockBeforeEventSignal 类

<Version type="script" add="1.6.0"/>

当玩家破坏方块前触发该事件信号。

```typescript
class PlayerBreakBlockBeforeEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerBreakBlockBeforeEvent) => void,
        options?: BlockEventOptions,
    ): (arg0: PlayerBreakBlockBeforeEvent) => void;
    unsubscribe(callback: (arg0: PlayerBreakBlockBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerBreakBlockBeforeEvent](#playerbreakblockbeforeevent-类)) => void, options?: [BlockEventOptions](./event_types#blockeventoptions-接口)) => (arg0: [PlayerBreakBlockBeforeEvent](#playerbreakblockbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerBreakBlockBeforeEvent](#playerbreakblockbeforeevent-类)) => void) => void，取消订阅该事件。

### PlayerBreakBlockBeforeEvent 类

<Version type="script" add="1.6.0"/>

玩家破坏方块前的事件信息。其筛选项见[BlockEventOptions](./event_types#blockeventoptions-接口)。

```typescript
class PlayerBreakBlockBeforeEvent {
    private constructor();
    cancel: boolean;
    itemStack?: ItemStack;
    readonly player: Player;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消该方块破坏事件。
- <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，用于破坏该方块的物品堆叠，空手时为`undefined`。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，触发该事件的破坏方块的玩家。

---

## 玩家离开事件

### PlayerLeaveBeforeEventSignal 类

<Version type="script" add="1.7.0"/>

当玩家离开前触发该事件信号。

```typescript
class PlayerLeaveBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerLeaveBeforeEvent) => void): (arg0: PlayerLeaveBeforeEvent) => void;
    unsubscribe(callback: (arg0: PlayerLeaveBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerLeaveBeforeEvent](#playerleavebeforeevent-类)) => void) => (arg0: [PlayerLeaveBeforeEvent](#playerleavebeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerLeaveBeforeEvent](#playerleavebeforeevent-类)) => void) => void，取消订阅该事件。

### PlayerLeaveBeforeEvent 类

<Version type="script" add="1.7.0"/>

玩家离开前的事件信息。

```typescript
class PlayerLeaveBeforeEvent {
    private constructor();
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，离开的玩家。

---

## 添加状态效果事件

### EffectAddBeforeEventSignal 类

<Version type="script" add="1.9.0"/>

当添加状态效果前触发该事件信号。

```typescript
class EffectAddBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: EffectAddBeforeEvent) => void): (arg0: EffectAddBeforeEvent) => void;
    unsubscribe(callback: (arg0: EffectAddBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EffectAddBeforeEvent](#effectaddbeforeevent-类)) => void) => (arg0: [EffectAddBeforeEvent](#effectaddbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EffectAddBeforeEvent](#effectaddbeforeevent-类)) => void) => void，取消订阅该事件。

### EffectAddBeforeEvent 类

<Version type="script" add="1.9.0"/>

添加状态效果前的事件信息。

```typescript
class EffectAddBeforeEvent {
    private constructor();
    cancel: boolean;
    duration: number;
    readonly effectType: string;
    readonly entity: Entity;
}
```

#### 属性

- cancel: boolean，设为`true`时将取消该事件。
- duration: number，状态效果的持续时间。
- <ReadOnly/> effectType: string，即将添加的状态效果的类型。
- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，即将被添加状态效果的实体。

---

## 爆炸事件

### ExplosionBeforeEventSignal 类

<Version type="script" add="1.9.0"/>

当爆炸前触发该事件信号。

```typescript
class ExplosionBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: ExplosionBeforeEvent) => void): (arg0: ExplosionBeforeEvent) => void;
    unsubscribe(callback: (arg0: ExplosionBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ExplosionBeforeEvent](#explosionbeforeevent-类)) => void) => (arg0: [ExplosionBeforeEvent](#explosionbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ExplosionBeforeEvent](#explosionbeforeevent-类)) => void) => void，取消订阅该事件。

### ExplosionBeforeEvent 类

<Version type="script" add="1.9.0"/>

爆炸前的事件信息。

```typescript
class ExplosionBeforeEvent {
    private constructor();
    cancel: boolean;
    setImpactedBlocks(blocks: Block[]): void;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消该爆炸事件。

#### 方法

- setImpactedBlocks: (blocks: [Block](../block/main#block-类)[]) => void，更新受该爆炸事件影响的方块集合。

---

## 玩家游戏模式更改事件

### PlayerGameModeChangeBeforeEventSignal 类

<Version type="script" add="1.11.0"/>

当玩家游戏模式更改前触发该事件信号。

```typescript
class PlayerGameModeChangeBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerGameModeChangeBeforeEvent) => void): (arg0: PlayerGameModeChangeBeforeEvent) => void;
    unsubscribe(callback: (arg0: PlayerGameModeChangeBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerGameModeChangeBeforeEvent](#playergamemodechangebeforeevent-类)) => void) => (arg0: [PlayerGameModeChangeBeforeEvent](#playergamemodechangebeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerGameModeChangeBeforeEvent](#playergamemodechangebeforeevent-类)) => void) => void，取消订阅该事件。

### PlayerGameModeChangeBeforeEvent 类

<Version type="script" add="1.11.0"/>

玩家游戏模式更改前的事件信息。

```typescript
class PlayerGameModeChangeBeforeEvent {
    private constructor();
    cancel: boolean;
    readonly fromGameMode: GameMode;
    readonly player: Player;
    toGameMode: GameMode;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消该游戏模式更改。
- <ReadOnly/> fromGameMode: [GameMode](../entity_and_player/player#gamemode-枚举)，当前游戏模式。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，触发该事件的玩家。
- toGameMode: [GameMode](../entity_and_player/player#gamemode-枚举)，即将更改到的游戏模式。

---

## 天气更改事件

### WeatherChangeBeforeEventSignal 类

<Version type="script" add="1.11.0"/>

当天气更改前触发该事件信号。

```typescript
class WeatherChangeBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: WeatherChangeBeforeEvent) => void): (arg0: WeatherChangeBeforeEvent) => void;
    unsubscribe(callback: (arg0: WeatherChangeBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [WeatherChangeBeforeEvent](#weatherchangebeforeevent-类)) => void) => (arg0: [WeatherChangeBeforeEvent](#weatherchangebeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [WeatherChangeBeforeEvent](#weatherchangebeforeevent-类)) => void) => void，取消订阅该事件。

### WeatherChangeBeforeEvent 类

<Version type="script" add="1.11.0"/>

天气更改前的事件信息。

```typescript
class WeatherChangeBeforeEvent {
    private constructor();
    cancel: boolean;
    duration: number;
    newWeather: WeatherType;
    readonly previousWeather: WeatherType;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消该天气更改。
- duration: number，设置新天气的持续时间（单位：游戏刻）。
- newWeather: [WeatherType](../dimension/main#weathertype-枚举)，即将应用的天气类型。
- <ReadOnly/> previousWeather: [WeatherType](../dimension/main#weathertype-枚举)，事件触发前的天气类型。

---

## 玩家与方块交互事件

### PlayerInteractWithBlockBeforeEventSignal 类

<Version type="script" add="1.15.0"/>

当玩家与方块交互前触发该事件信号。

```typescript
class PlayerInteractWithBlockBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerInteractWithBlockBeforeEvent) => void): (arg0: PlayerInteractWithBlockBeforeEvent) => void;
    unsubscribe(callback: (arg0: PlayerInteractWithBlockBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerInteractWithBlockBeforeEvent](#playerinteractwithblockbeforeevent-类)) => void) => (arg0: [PlayerInteractWithBlockBeforeEvent](#playerinteractwithblockbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerInteractWithBlockBeforeEvent](#playerinteractwithblockbeforeevent-类)) => void) => void，取消订阅该事件。

### PlayerInteractWithBlockBeforeEvent 类

<Version type="script" add="1.15.0"/>

玩家与方块交互前的事件信息。

```typescript
class PlayerInteractWithBlockBeforeEvent {
    private constructor();
    readonly block: Block;
    readonly blockFace: Direction;
    cancel: boolean;
    readonly faceLocation: Vector3;
    readonly isFirstEvent: boolean;
    readonly itemStack?: ItemStack;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> block: [Block](../block/main#block-类)，即将被交互的方块。
- <ReadOnly/> blockFace: [Direction](../general#direction-枚举)，被交互的方块的面。
- cancel: boolean，若设为`true`，将取消该交互。
- <ReadOnly/> faceLocation: [Vector3](../general#vector3-接口)，相对于所交互方块的底部西北角的坐标。
- <ReadOnly/> isFirstEvent: boolean，若事件由玩家初次按下交互按钮触发，该值为`true`；若是长按交互按钮触发，则为`false`。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，交互中所使用的物品堆叠，空手时为`undefined`。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，触发该事件的玩家。

---

## 玩家与实体交互事件

### PlayerInteractWithEntityBeforeEventSignal 类

<Version type="script" add="1.15.0"/>

当玩家与实体交互前触发该事件信号。

```typescript
class PlayerInteractWithEntityBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerInteractWithEntityBeforeEvent) => void): (arg0: PlayerInteractWithEntityBeforeEvent) => void;
    unsubscribe(callback: (arg0: PlayerInteractWithEntityBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerInteractWithEntityBeforeEvent](#playerinteractwithentitybeforeevent-类)) => void) => (arg0: [PlayerInteractWithEntityBeforeEvent](#playerinteractwithentitybeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerInteractWithEntityBeforeEvent](#playerinteractwithentitybeforeevent-类)) => void) => void，取消订阅该事件。

### PlayerInteractWithEntityBeforeEvent 类

<Version type="script" add="1.15.0"/>

玩家与实体交互前的事件信息。

```typescript
class PlayerInteractWithEntityBeforeEvent {
    private constructor();
    cancel: boolean;
    readonly itemStack?: ItemStack;
    readonly player: Player;
    readonly target: Entity;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消该交互。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，交互中所使用的物品堆叠，空手时为`undefined`。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，触发该事件的玩家。
- <ReadOnly/> target: [Entity](../entity_and_player/entity#entity-类)，即将被交互的实体。

---

## 实体回复生命事件

### EntityHealBeforeEventSignal 类

<Version type="script" add="2.6.0"/>

当实体回复生命前触发该事件信号。

```typescript
class EntityHealBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: EntityHealBeforeEvent) => void, options?: EntityHealEventOptions): (arg0: EntityHealBeforeEvent) => void;
    unsubscribe(callback: (arg0: EntityHealBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityHealBeforeEvent](#entityhealbeforeevent-类)) => void, options?: [EntityHealEventOptions](./event_types#entityhealeventoptions-接口)) => (arg0: [EntityHealBeforeEvent](#entityhealbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityHealBeforeEvent](#entityhealbeforeevent-类)) => void) => void，取消订阅该事件。

### EntityHealBeforeEvent 类

<Version type="script" add="2.6.0"/>

实体回复生命前的事件信息。其筛选项见[EntityHealEventOptions](./event_types#entityhealeventoptions-接口)。

```typescript
class EntityHealBeforeEvent {
    private constructor();
    cancel: boolean;
    readonly healedEntity: Entity;
    healing: number;
    readonly healSource: EntityHealSource;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消该回复生命事件。
- <ReadOnly/> healedEntity: [Entity](../entity_and_player/entity#entity-类)，即将被回复生命的实体。
- healing: number，回复的生命值数量。
- <ReadOnly/> healSource: [EntityHealSource](./event_types#entityhealsource-类)，回复生命的来源信息。

---

## 实体受伤事件

### EntityHurtBeforeEventSignal 类

<Version type="script" add="2.6.0"/>

当实体受伤前触发该事件信号。

```typescript
class EntityHurtBeforeEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityHurtBeforeEvent) => void,
        options?: EntityHurtBeforeEventOptions,
    ): (arg0: EntityHurtBeforeEvent) => void;
    unsubscribe(callback: (arg0: EntityHurtBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityHurtBeforeEvent](#entityhurtbeforeevent-类)) => void, options?: [EntityHurtBeforeEventOptions](./event_types#entityhurtbeforeeventoptions-接口)) => (arg0: [EntityHurtBeforeEvent](#entityhurtbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityHurtBeforeEvent](#entityhurtbeforeevent-类)) => void) => void，取消订阅该事件。

### EntityHurtBeforeEvent 类

<Version type="script" add="2.6.0"/>

实体受伤前的事件信息。其筛选项见[EntityHurtBeforeEventOptions](./event_types#entityhurtbeforeeventoptions-接口)。

```typescript
class EntityHurtBeforeEvent {
    private constructor();
    cancel: boolean;
    damage: number;
    readonly damageSource: EntityDamageSource;
    readonly hurtEntity: Entity;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消该伤害事件。
- damage: number，即将造成的伤害数量。
- <ReadOnly/> damageSource: [EntityDamageSource](./event_types#entitydamagesource-接口)，可能造成该伤害的实体的来源信息。
- <ReadOnly/> hurtEntity: [Entity](../entity_and_player/entity#entity-类)，即将受到伤害的实体。

---

## 实体拾取物品事件

### EntityItemPickupBeforeEventSignal 类

<Version type="script" add="2.6.0"/>

当实体拾取物品前触发该事件信号。

```typescript
class EntityItemPickupBeforeEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityItemPickupBeforeEvent) => void,
        options?: EntityItemPickupEventOptions,
    ): (arg0: EntityItemPickupBeforeEvent) => void;
    unsubscribe(callback: (arg0: EntityItemPickupBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityItemPickupBeforeEvent](#entityitempickupbeforeevent-类)) => void, options?: [EntityItemPickupEventOptions](./event_types#entityitempickupeventoptions-接口)) => (arg0: [EntityItemPickupBeforeEvent](#entityitempickupbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityItemPickupBeforeEvent](#entityitempickupbeforeevent-类)) => void) => void，取消订阅该事件。

### EntityItemPickupBeforeEvent 类

<Version type="script" add="2.6.0"/>

实体拾取物品前的事件信息。其筛选项见[EntityItemPickupEventOptions](./event_types#entityitempickupeventoptions-接口)。

```typescript
class EntityItemPickupBeforeEvent {
    private constructor();
    cancel: boolean;
    readonly entity: Entity;
    readonly item: Entity;
}
```

#### 属性

- cancel: boolean，若设为`true`，该物品将不会被拾取。
- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，即将拾取该物品的实体。
- <ReadOnly/> item: [Entity](../entity_and_player/entity#entity-类)，即将被拾取的物品实体。

---

## 实体被驯服事件

### EntityTamedBeforeEventSignal 类

<Version type="script" add="2.10.0"/>

当实体被驯服前触发该事件信号。

```typescript
class EntityTamedBeforeEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityTamedBeforeEvent) => void,
        options?: EntityTamedEventOptions,
    ): (arg0: EntityTamedBeforeEvent) => void;
    unsubscribe(callback: (arg0: EntityTamedBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityTamedBeforeEvent](#entitytamedbeforeevent-类)) => void, options?: [EntityTamedEventOptions](./event_types#entitytamedeventoptions-接口)) => (arg0: [EntityTamedBeforeEvent](#entitytamedbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityTamedBeforeEvent](#entitytamedbeforeevent-类)) => void) => void，取消订阅该事件。

### EntityTamedBeforeEvent 类

<Version type="script" add="2.10.0"/>

实体被驯服前的事件信息。其筛选项见[EntityTamedEventOptions](./event_types#entitytamedeventoptions-接口)。

```typescript
class EntityTamedBeforeEvent {
    private constructor();
    cancel: boolean;
    readonly entity: Entity;
    readonly tamingEntity: Entity;
}
```

#### 属性

- cancel: boolean，设为`true`时将取消该事件。
- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，即将被驯服的实体。
- <ReadOnly/> tamingEntity: [Entity](../entity_and_player/entity#entity-类)，正在尝试驯服该实体的实体。

---

## 世界时钟重启事件

### WorldClockOnRestartBeforeEventSignal 类

<Version type="script" add="2.11.0"/>

当世界时钟重启前触发该事件信号。

```typescript
class WorldClockOnRestartBeforeEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: WorldClockOnRestartBeforeEvent) => void,
        options?: WorldClockEventOptions,
    ): (arg0: WorldClockOnRestartBeforeEvent) => void;
    unsubscribe(callback: (arg0: WorldClockOnRestartBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [WorldClockOnRestartBeforeEvent](#worldclockonrestartbeforeevent-类)) => void, options?: [WorldClockEventOptions](./event_types#worldclockeventoptions-接口)) => (arg0: [WorldClockOnRestartBeforeEvent](#worldclockonrestartbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [WorldClockOnRestartBeforeEvent](#worldclockonrestartbeforeevent-类)) => void) => void，取消订阅该事件。

### WorldClockOnRestartBeforeEvent 类

<Version type="script" add="2.11.0"/>

世界时钟重启前的事件信息。其筛选项见[WorldClockEventOptions](./event_types#worldclockeventoptions-接口)。

```typescript
class WorldClockOnRestartBeforeEvent {
    private constructor();
    cancel: boolean;
    readonly clock: WorldClock;
    newTime: number;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消该世界时钟重启事件。这会使世界时钟保持在最大时间值，并阻止其继续推进。
- <ReadOnly/> clock: [WorldClock](./world_clock#worldclock-类)，即将重启的世界时钟。
- newTime: number，世界时钟重启后将被设置为的时间。若未设置，世界时钟将被设置为`0`。最小值：`0`。

---

## 发送聊天消息事件

### ChatSendBeforeEventSignal 类

<Version type="script" experimental="测试版API"/>

当发送聊天消息前触发该事件信号。

```typescript
class ChatSendBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: ChatSendBeforeEvent) => void): (arg0: ChatSendBeforeEvent) => void;
    unsubscribe(callback: (arg0: ChatSendBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ChatSendBeforeEvent](#chatsendbeforeevent-类)) => void) => (arg0: [ChatSendBeforeEvent](#chatsendbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ChatSendBeforeEvent](#chatsendbeforeevent-类)) => void) => void，取消订阅该事件。

### ChatSendBeforeEvent 类

<Version type="script" experimental="测试版API"/>

发送聊天消息前的事件信息。

```typescript
class ChatSendBeforeEvent {
    private constructor();
    cancel: boolean;
    readonly message: string;
    readonly sender: Player;
    targets?: Player[];
}
```

#### 属性

- cancel: boolean，若在聊天发送前事件的处理函数中设为`true`，该消息将不会被广播。
- <ReadOnly/> message: string，即将被广播的消息。
- <ReadOnly/> sender: [Player](../entity_and_player/player#player-类)，发送该聊天消息的玩家。
- <Optional/> targets: [Player](../entity_and_player/player#player-类)[]，即将接收该消息的玩家列表。若已定义，该消息将直接发送给一个或多个玩家（即不广播）。可修改该列表以更改消息的接收者。

---

## 玩家物品攻击实体事件

### PlayerItemAttackEntityBeforeEventSignal 类

<Version type="script" experimental="测试版API"/>

当玩家物品攻击实体前触发该事件信号。

```typescript
class PlayerItemAttackEntityBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerItemAttackEntityBeforeEvent) => void): (arg0: PlayerItemAttackEntityBeforeEvent) => void;
    unsubscribe(callback: (arg0: PlayerItemAttackEntityBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerItemAttackEntityBeforeEvent](#playeritemattackentitybeforeevent-类)) => void) => (arg0: [PlayerItemAttackEntityBeforeEvent](#playeritemattackentitybeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerItemAttackEntityBeforeEvent](#playeritemattackentitybeforeevent-类)) => void) => void，取消订阅该事件。

### PlayerItemAttackEntityBeforeEvent 类

<Version type="script" experimental="测试版API"/>

玩家物品攻击实体前的事件信息。

```typescript
class PlayerItemAttackEntityBeforeEvent {
    private constructor();
    readonly aimDirection?: Vector3;
    cancel: boolean;
    readonly itemStack?: ItemStack;
    readonly player: Player;
    readonly target: Entity;
}
```

#### 属性

- <ReadOnly/> <Optional/> aimDirection: [Vector3](../general#vector3-接口)，攻击所使用的归一化世界空间方向。对于标准的客户端发起的攻击，该方向由客户端提供的命中位置与玩家服务端的眼部位置计算得出。其它攻击路径可提供服务端推导出的方向。当攻击路径不提供瞄准方向时，该属性为`undefined`。
- cancel: boolean，若设为`true`，该攻击不会造成伤害或其它权威的攻击效果。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，发起攻击的玩家所持物品的快照。当玩家未持有物品时，该属性为`undefined`。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，发起该攻击的玩家。
- <ReadOnly/> target: [Entity](../entity_and_player/entity#entity-类)，被该攻击锁定的实体。

---

## 玩家放置方块事件

### PlayerPlaceBlockBeforeEventSignal 类

<Version type="script" experimental="测试版API"/>

当玩家放置方块前触发该事件信号。

```typescript
class PlayerPlaceBlockBeforeEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerPlaceBlockBeforeEvent) => void,
        options?: BlockEventOptions,
    ): (arg0: PlayerPlaceBlockBeforeEvent) => void;
    unsubscribe(callback: (arg0: PlayerPlaceBlockBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerPlaceBlockBeforeEvent](#playerplaceblockbeforeevent-类)) => void, options?: [BlockEventOptions](./event_types#blockeventoptions-接口)) => (arg0: [PlayerPlaceBlockBeforeEvent](#playerplaceblockbeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerPlaceBlockBeforeEvent](#playerplaceblockbeforeevent-类)) => void) => void，取消订阅该事件。

### PlayerPlaceBlockBeforeEvent 类

<Version type="script" experimental="测试版API"/>

玩家放置方块前的事件信息。其筛选项见[BlockEventOptions](./event_types#blockeventoptions-接口)。

```typescript
class PlayerPlaceBlockBeforeEvent {
    private constructor();
    cancel: boolean;
    readonly face: Direction;
    readonly faceLocation: Vector3;
    readonly permutationToPlace: BlockPermutation;
    readonly player: Player;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消该方块放置事件。
- <ReadOnly/> face: [Direction](../general#direction-枚举)，新方块所放置到的方块的被放置面。
- <ReadOnly/> faceLocation: [Vector3](../general#vector3-接口)，相对于新方块所放置到的方块的底部西北角的坐标。
- <ReadOnly/> permutationToPlace: [BlockPermutation](../block/main#blockpermutation-类)，若事件未被取消，即将放置的方块置换。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，触发该事件的放置方块的玩家。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
