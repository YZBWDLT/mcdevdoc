---
sidebar_position: 2
---

# 世界后事件

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import EarlyExecution from "/src/components/highlight/earlyExecution"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录世界后事件相关接口。

---

## 玩家加入游戏事件

### PlayerJoinAfterEventSignal 类

<Version type="script" add="1.3.0"/>

当玩家加入游戏后触发该事件信号。

```typescript
class PlayerJoinAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerJoinAfterEvent) => void): (arg0: PlayerJoinAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerJoinAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerJoinAfterEvent](#playerjoinafterevent-类)) => void) => (arg0: [PlayerJoinAfterEvent](#playerjoinafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerJoinAfterEvent](#playerjoinafterevent-类)) => void) => void，取消订阅该事件。

### PlayerJoinAfterEvent 类

<Version type="script" add="1.3.0"/>

玩家加入游戏后的事件信息。

```typescript
class PlayerJoinAfterEvent {
    private constructor();
    readonly playerId: string;
    readonly playerName: string;
}
```

#### 属性

- <ReadOnly/> playerId: string，加入游戏的玩家的唯一标识符。
- <ReadOnly/> playerName: string，加入游戏的玩家的名称。

---

## 玩家离开游戏事件

### PlayerLeaveAfterEventSignal 类

<Version type="script" add="1.3.0"/>

当玩家离开游戏后触发该事件信号。

```typescript
class PlayerLeaveAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerLeaveAfterEvent) => void): (arg0: PlayerLeaveAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerLeaveAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerLeaveAfterEvent](#playerleaveafterevent-类)) => void) => (arg0: [PlayerLeaveAfterEvent](#playerleaveafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerLeaveAfterEvent](#playerleaveafterevent-类)) => void) => void，取消订阅该事件。

### PlayerLeaveAfterEvent 类

<Version type="script" add="1.3.0"/>

玩家离开游戏后的事件信息。

```typescript
class PlayerLeaveAfterEvent {
    private constructor();
    readonly playerId: string;
    readonly playerName: string;
}
```

#### 属性

- <ReadOnly/> playerId: string，离开游戏的玩家的唯一标识符。
- <ReadOnly/> playerName: string，已离开世界的玩家。

---

## 玩家生成事件

### PlayerSpawnAfterEventSignal 类

<Version type="script" add="1.3.0"/>

当玩家生成后触发该事件信号。

```typescript
class PlayerSpawnAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerSpawnAfterEvent) => void): (arg0: PlayerSpawnAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerSpawnAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerSpawnAfterEvent](#playerspawnafterevent-类)) => void) => (arg0: [PlayerSpawnAfterEvent](#playerspawnafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerSpawnAfterEvent](#playerspawnafterevent-类)) => void) => void，取消订阅该事件。

### PlayerSpawnAfterEvent 类

<Version type="script" add="1.3.0"/>

玩家生成后的事件信息。

```typescript
class PlayerSpawnAfterEvent {
    private constructor();
    initialSpawn: boolean;
    player: Player;
}
```

#### 属性

- initialSpawn: boolean，若为 true，表示这是玩家加入游戏后的首次生成。
- player: [Player](../entity_and_player/player#player-类)，表示加入游戏的玩家的对象。

---

## 按下按钮事件

### ButtonPushAfterEventSignal 类

<Version type="script" add="1.3.0"/>

当按下按钮后触发该事件信号。

```typescript
class ButtonPushAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ButtonPushAfterEvent) => void): (arg0: ButtonPushAfterEvent) => void;
    unsubscribe(callback: (arg0: ButtonPushAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ButtonPushAfterEvent](#buttonpushafterevent-类)) => void) => (arg0: [ButtonPushAfterEvent](#buttonpushafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ButtonPushAfterEvent](#buttonpushafterevent-类)) => void) => void，取消订阅该事件。

### ButtonPushAfterEvent 类

<Version type="script" add="1.3.0"/>

按下按钮后的事件信息。

```typescript
class ButtonPushAfterEvent {
    private constructor();
    readonly source: Entity;
}
```

#### 属性

- <ReadOnly/> source: [Entity](../entity_and_player/entity#entity-类)，触发按钮按下的来源（若有）。

---

## 拉杆活动事件

### LeverActionAfterEventSignal 类

<Version type="script" add="1.3.0"/>

当拉杆活动后触发该事件信号。

```typescript
class LeverActionAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: LeverActionAfterEvent) => void): (arg0: LeverActionAfterEvent) => void;
    unsubscribe(callback: (arg0: LeverActionAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [LeverActionAfterEvent](#leveractionafterevent-类)) => void) => (arg0: [LeverActionAfterEvent](#leveractionafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [LeverActionAfterEvent](#leveractionafterevent-类)) => void) => void，取消订阅该事件。

### LeverActionAfterEvent 类

<Version type="script" add="1.3.0"/>

拉杆活动后的事件信息。

```typescript
class LeverActionAfterEvent {
    private constructor();
    readonly isPowered: boolean;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> isPowered: boolean，拉杆是否已激活（即正在输出红石信号）。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，触发拉杆激活的玩家（若有）。

---

## 实体死亡事件

### EntityDieAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当实体死亡后触发该事件信号。

```typescript
class EntityDieAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: EntityDieAfterEvent) => void, options?: EntityEventOptions): (arg0: EntityDieAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityDieAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityDieAfterEvent](#entitydieafterevent-类)) => void, options?: [EntityEventOptions](#entityeventoptions-接口)) => (arg0: [EntityDieAfterEvent](#entitydieafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityDieAfterEvent](#entitydieafterevent-类)) => void) => void，取消订阅该事件。

### EntityDieAfterEvent 类

<Version type="script" add="1.4.0"/>

实体死亡后的事件信息。

```typescript
class EntityDieAfterEvent {
    private constructor();
    readonly damageSource: EntityDamageSource;
    readonly deadEntity: Entity;
}
```

#### 属性

- <ReadOnly/> damageSource: EntityDamageSource，若可获取，返回导致该实体死亡的伤害来源信息。
- <ReadOnly/> deadEntity: [Entity](../entity_and_player/entity#entity-类)，已死亡的实体。

### EntityEventOptions 接口

<Version type="script" add="1.4.0"/>

指定实体相关事件的筛选项，可用于实体死亡、实体击打方块、实体击打实体和实体移除事件。

```typescript
interface EntityEventOptions {
    entities?: Entity[];
    entityTypes?: string[];
}
```

- <Optional/> entities: [Entity](../entity_and_player/entity#entity-类)[]，若设置，该事件只会对集合内包含的实体触发。
- <Optional/> entityTypes: string[]，若设置，该事件只会在受影响实体的类型与此匹配时触发。

---

## 实体生命值改变事件

### EntityHealthChangedAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当实体生命值改变后触发该事件信号。

```typescript
class EntityHealthChangedAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityHealthChangedAfterEvent) => void,
        options?: EntityEventOptions,
    ): (arg0: EntityHealthChangedAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityHealthChangedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityHealthChangedAfterEvent](#entityhealthchangedafterevent-类)) => void, options?: [EntityEventOptions](#entityeventoptions-接口)) => (arg0: [EntityHealthChangedAfterEvent](#entityhealthchangedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityHealthChangedAfterEvent](#entityhealthchangedafterevent-类)) => void) => void，取消订阅该事件。

### EntityHealthChangedAfterEvent 类

<Version type="script" add="1.4.0"/>

实体生命值改变后的事件信息。其筛选项见[实体死亡事件](#实体死亡事件)。

```typescript
class EntityHealthChangedAfterEvent {
    private constructor();
    readonly entity: Entity;
    readonly newValue: number;
    readonly oldValue: number;
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，生命值发生改变的实体。
- <ReadOnly/> newValue: number，实体的新生命值。
- <ReadOnly/> oldValue: number，实体的原生命值。

---

## 实体击打方块事件

### EntityHitBlockAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当实体击打方块后触发该事件信号。

```typescript
class EntityHitBlockAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityHitBlockAfterEvent) => void,
        options?: EntityEventOptions,
    ): (arg0: EntityHitBlockAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityHitBlockAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityHitBlockAfterEvent](#entityhitblockafterevent-类)) => void, options?: [EntityEventOptions](#entityeventoptions-接口)) => (arg0: [EntityHitBlockAfterEvent](#entityhitblockafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityHitBlockAfterEvent](#entityhitblockafterevent-类)) => void) => void，取消订阅该事件。

### EntityHitBlockAfterEvent 类

<Version type="script" add="1.4.0"/>

实体击打方块后的事件信息。其筛选项见[实体死亡事件](#实体死亡事件)。

```typescript
class EntityHitBlockAfterEvent {
    private constructor();
    readonly blockFace: Direction;
    readonly damagingEntity: Entity;
    readonly hitBlock: Block;
    readonly hitBlockPermutation: BlockPermutation;
}
```

#### 属性

- <ReadOnly/> blockFace: [Direction](../general#direction-枚举)，被击中方块的朝向。
- <ReadOnly/> damagingEntity: [Entity](../entity_and_player/entity#entity-类)，发起攻击的实体。
- <ReadOnly/> hitBlock: [Block](../block/main#block-类)，被攻击击中的方块。
- <ReadOnly/> hitBlockPermutation: [BlockPermutation](../block/main#blockpermutation-类)，被攻击击中的方块状态。

---

## 实体击打实体事件

### EntityHitEntityAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当实体击打实体后触发该事件信号。

```typescript
class EntityHitEntityAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityHitEntityAfterEvent) => void,
        options?: EntityEventOptions,
    ): (arg0: EntityHitEntityAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityHitEntityAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityHitEntityAfterEvent](#entityhitentityafterevent-类)) => void, options?: [EntityEventOptions](#entityeventoptions-接口)) => (arg0: [EntityHitEntityAfterEvent](#entityhitentityafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityHitEntityAfterEvent](#entityhitentityafterevent-类)) => void) => void，取消订阅该事件。

### EntityHitEntityAfterEvent 类

<Version type="script" add="1.4.0"/>

实体击打实体后的事件信息。其筛选项见[实体死亡事件](#实体死亡事件)。

```typescript
class EntityHitEntityAfterEvent {
    private constructor();
    readonly damagingEntity: Entity;
    readonly hitEntity: Entity;
}
```

#### 属性

- <ReadOnly/> damagingEntity: [Entity](../entity_and_player/entity#entity-类)，发起近战攻击的实体。
- <ReadOnly/> hitEntity: [Entity](../entity_and_player/entity#entity-类)，被攻击击中的实体。

---

## 实体受伤事件

### EntityHurtAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当实体受伤后触发该事件信号。

```typescript
class EntityHurtAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityHurtAfterEvent) => void,
        options?: EntityHurtAfterEventOptions,
    ): (arg0: EntityHurtAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityHurtAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityHurtAfterEvent](#entityhurtafterevent-类)) => void, options?: [EntityHurtAfterEventOptions](#entityhurtaftereventoptions-接口)) => (arg0: [EntityHurtAfterEvent](#entityhurtafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityHurtAfterEvent](#entityhurtafterevent-类)) => void) => void，取消订阅该事件。

### EntityHurtAfterEvent 类

<Version type="script" add="1.4.0"/>

实体受伤后的事件信息。

```typescript
class EntityHurtAfterEvent {
    private constructor();
    readonly damage: number;
    readonly damageSource: EntityDamageSource;
    readonly hurtEntity: Entity;
}
```

#### 属性

- <ReadOnly/> damage: number，造成的伤害数值。
- <ReadOnly/> damageSource: EntityDamageSource，施加该伤害的来源信息。
- <ReadOnly/> hurtEntity: [Entity](../entity_and_player/entity#entity-类)，受伤的实体。

### EntityHurtAfterEventOptions 接口

<Version type="script" add="2.6.0"/>

指定实体受伤后事件的筛选项。

```typescript
interface EntityHurtAfterEventOptions {
    allowedDamageCauses?: EntityDamageCause[];
    entities?: Entity[];
    entityFilter?: EntityFilter;
    entityTypes?: string[];
}
```

- <Optional/> allowedDamageCauses: EntityDamageCause[]，若设置，该事件只会在伤害原因匹配时触发。
- <Optional/> entities: [Entity](../entity_and_player/entity#entity-类)[]，若设置，该事件只会对集合内包含的实体触发。
- <Optional/> entityFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，若设置，该事件只会对匹配的实体触发。
- <Optional/> entityTypes: string[]，若设置，该事件只会在受影响实体的类型与此匹配时触发。

---

## 物品完成使用事件

### ItemCompleteUseAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当物品完成使用后触发该事件信号。

```typescript
class ItemCompleteUseAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ItemCompleteUseAfterEvent) => void): (arg0: ItemCompleteUseAfterEvent) => void;
    unsubscribe(callback: (arg0: ItemCompleteUseAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ItemCompleteUseAfterEvent](#itemcompleteuseafterevent-类)) => void) => (arg0: [ItemCompleteUseAfterEvent](#itemcompleteuseafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ItemCompleteUseAfterEvent](#itemcompleteuseafterevent-类)) => void) => void，取消订阅该事件。

### ItemCompleteUseAfterEvent 类

<Version type="script" add="1.4.0"/>

物品完成使用后的事件信息。

```typescript
class ItemCompleteUseAfterEvent {
    private constructor();
    readonly itemStack: ItemStack;
    readonly source: Player;
    readonly useDuration: number;
}
```

#### 属性

- <ReadOnly/> itemStack: [ItemStack](../item/main#itemstack-类)，完成蓄力的物品。
- <ReadOnly/> source: [Player](../entity_and_player/player#player-类)，触发该物品事件的来源实体。
- <ReadOnly/> useDuration: number，距离蓄力完成还剩下的时间（游戏刻）。

---

## 物品释放使用事件

### ItemReleaseUseAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当物品释放使用后触发该事件信号。

```typescript
class ItemReleaseUseAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ItemReleaseUseAfterEvent) => void): (arg0: ItemReleaseUseAfterEvent) => void;
    unsubscribe(callback: (arg0: ItemReleaseUseAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ItemReleaseUseAfterEvent](#itemreleaseuseafterevent-类)) => void) => (arg0: [ItemReleaseUseAfterEvent](#itemreleaseuseafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ItemReleaseUseAfterEvent](#itemreleaseuseafterevent-类)) => void) => void，取消订阅该事件。

### ItemReleaseUseAfterEvent 类

<Version type="script" add="1.4.0"/>

物品释放使用后的事件信息。

```typescript
class ItemReleaseUseAfterEvent {
    private constructor();
    readonly itemStack?: ItemStack;
    readonly source: Player;
    readonly useDuration: number;
}
```

#### 属性

- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，触发该物品事件的物品。
- <ReadOnly/> source: [Player](../entity_and_player/player#player-类)，触发该物品事件的来源实体。
- <ReadOnly/> useDuration: number，距离蓄力完成还剩下的时间（游戏刻）。

---

## 物品开始使用事件

### ItemStartUseAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当物品开始使用后触发该事件信号。

```typescript
class ItemStartUseAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ItemStartUseAfterEvent) => void): (arg0: ItemStartUseAfterEvent) => void;
    unsubscribe(callback: (arg0: ItemStartUseAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ItemStartUseAfterEvent](#itemstartuseafterevent-类)) => void) => (arg0: [ItemStartUseAfterEvent](#itemstartuseafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ItemStartUseAfterEvent](#itemstartuseafterevent-类)) => void) => void，取消订阅该事件。

### ItemStartUseAfterEvent 类

<Version type="script" add="1.4.0"/>

物品开始使用后的事件信息。

```typescript
class ItemStartUseAfterEvent {
    private constructor();
    readonly itemStack: ItemStack;
    readonly source: Player;
    readonly useDuration: number;
}
```

#### 属性

- <ReadOnly/> itemStack: [ItemStack](../item/main#itemstack-类)，开始蓄力的物品。
- <ReadOnly/> source: [Player](../entity_and_player/player#player-类)，触发该物品事件的来源实体。
- <ReadOnly/> useDuration: number，距离蓄力完成还剩下的时间（游戏刻）。

---

## 物品开始对方块使用事件

### ItemStartUseOnAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当物品开始对方块使用后触发该事件信号。

```typescript
class ItemStartUseOnAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ItemStartUseOnAfterEvent) => void): (arg0: ItemStartUseOnAfterEvent) => void;
    unsubscribe(callback: (arg0: ItemStartUseOnAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ItemStartUseOnAfterEvent](#itemstartuseonafterevent-类)) => void) => (arg0: [ItemStartUseOnAfterEvent](#itemstartuseonafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ItemStartUseOnAfterEvent](#itemstartuseonafterevent-类)) => void) => void，取消订阅该事件。

### ItemStartUseOnAfterEvent 类

<Version type="script" add="1.4.0"/>

物品开始对方块使用后的事件信息。

```typescript
class ItemStartUseOnAfterEvent {
    private constructor();
    readonly block: Block;
    readonly blockFace: Direction;
    readonly itemStack?: ItemStack;
    readonly source: Player;
}
```

#### 属性

- <ReadOnly/> block: [Block](../block/main#block-类)，物品作用的目标方块。
- <ReadOnly/> blockFace: [Direction](../general#direction-枚举)，物品作用的方块朝向。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，开始使用的物品。在某些游戏场景（例如空手按下按钮）下可能为空。
- <ReadOnly/> source: [Player](../entity_and_player/player#player-类)，触发该物品事件的来源实体。

---

## 物品停止使用事件

### ItemStopUseAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当物品停止使用后触发该事件信号。

```typescript
class ItemStopUseAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ItemStopUseAfterEvent) => void): (arg0: ItemStopUseAfterEvent) => void;
    unsubscribe(callback: (arg0: ItemStopUseAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ItemStopUseAfterEvent](#itemstopuseafterevent-类)) => void) => (arg0: [ItemStopUseAfterEvent](#itemstopuseafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ItemStopUseAfterEvent](#itemstopuseafterevent-类)) => void) => void，取消订阅该事件。

### ItemStopUseAfterEvent 类

<Version type="script" add="1.4.0"/>

物品停止使用后的事件信息。

```typescript
class ItemStopUseAfterEvent {
    private constructor();
    readonly itemStack?: ItemStack;
    readonly source: Player;
    readonly useDuration: number;
}
```

#### 属性

- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，停止蓄力的物品。传送到其他维度时也会触发该事件，此时该值可能为空。
- <ReadOnly/> source: [Player](../entity_and_player/player#player-类)，触发该物品事件的来源实体。
- <ReadOnly/> useDuration: number，距离蓄力完成还剩下的时间（游戏刻）。

---

## 物品停止对方块使用事件

### ItemStopUseOnAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当物品停止对方块使用后触发该事件信号。

```typescript
class ItemStopUseOnAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ItemStopUseOnAfterEvent) => void): (arg0: ItemStopUseOnAfterEvent) => void;
    unsubscribe(callback: (arg0: ItemStopUseOnAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ItemStopUseOnAfterEvent](#itemstopuseonafterevent-类)) => void) => (arg0: [ItemStopUseOnAfterEvent](#itemstopuseonafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ItemStopUseOnAfterEvent](#itemstopuseonafterevent-类)) => void) => void，取消订阅该事件。

### ItemStopUseOnAfterEvent 类

<Version type="script" add="1.4.0"/>

物品停止对方块使用后的事件信息。

```typescript
class ItemStopUseOnAfterEvent {
    private constructor();
    readonly block: Block;
    readonly itemStack?: ItemStack;
    readonly source: Player;
}
```

#### 属性

- <ReadOnly/> block: [Block](../block/main#block-类)，物品作用的目标方块。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，对方块使用的物品。
- <ReadOnly/> source: [Player](../entity_and_player/player#player-类)，触发该物品事件的来源实体。

---

## 物品使用事件

### ItemUseAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当物品使用后触发该事件信号。

```typescript
class ItemUseAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ItemUseAfterEvent) => void): (arg0: ItemUseAfterEvent) => void;
    unsubscribe(callback: (arg0: ItemUseAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ItemUseAfterEvent](#itemuseafterevent-类)) => void) => (arg0: [ItemUseAfterEvent](#itemuseafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ItemUseAfterEvent](#itemuseafterevent-类)) => void) => void，取消订阅该事件。

### ItemUseAfterEvent 类

<Version type="script" add="1.4.0"/>

物品使用后的事件信息。

```typescript
class ItemUseAfterEvent {
    private constructor();
    itemStack: ItemStack;
    readonly source: Player;
}
```

#### 属性

- itemStack: [ItemStack](../item/main#itemstack-类)，正在使用的物品。
- <ReadOnly/> source: [Player](../entity_and_player/player#player-类)，触发该物品事件的来源实体。

---

## 压力板弹出事件

### PressurePlatePopAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当压力板弹出后触发该事件信号。

```typescript
class PressurePlatePopAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PressurePlatePopAfterEvent) => void): (arg0: PressurePlatePopAfterEvent) => void;
    unsubscribe(callback: (arg0: PressurePlatePopAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PressurePlatePopAfterEvent](#pressureplatepopafterevent-类)) => void) => (arg0: [PressurePlatePopAfterEvent](#pressureplatepopafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PressurePlatePopAfterEvent](#pressureplatepopafterevent-类)) => void) => void，取消订阅该事件。

### PressurePlatePopAfterEvent 类

<Version type="script" add="1.4.0"/>

压力板弹出后的事件信息。

```typescript
class PressurePlatePopAfterEvent {
    private constructor();
    readonly previousRedstonePower: number;
    readonly redstonePower: number;
}
```

#### 属性

- <ReadOnly/> previousRedstonePower: number，压力板弹出前的红石信号强度。
- <ReadOnly/> redstonePower: number，压力板弹出时的红石信号强度。

---

## 压力板压下事件

### PressurePlatePushAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当压力板压下后触发该事件信号。

```typescript
class PressurePlatePushAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PressurePlatePushAfterEvent) => void): (arg0: PressurePlatePushAfterEvent) => void;
    unsubscribe(callback: (arg0: PressurePlatePushAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PressurePlatePushAfterEvent](#pressureplatepushafterevent-类)) => void) => (arg0: [PressurePlatePushAfterEvent](#pressureplatepushafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PressurePlatePushAfterEvent](#pressureplatepushafterevent-类)) => void) => void，取消订阅该事件。

### PressurePlatePushAfterEvent 类

<Version type="script" add="1.4.0"/>

压力板压下后的事件信息。

```typescript
class PressurePlatePushAfterEvent {
    private constructor();
    readonly previousRedstonePower: number;
    readonly redstonePower: number;
    readonly source: Entity;
}
```

#### 属性

- <ReadOnly/> previousRedstonePower: number，压力板压下前的红石信号强度。
- <ReadOnly/> redstonePower: number，压力板压下时的红石信号强度。
- <ReadOnly/> source: [Entity](../entity_and_player/entity#entity-类)，触发压力板压下的来源。

---

## 击中标靶事件

### TargetBlockHitAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当击中标靶后触发该事件信号。

```typescript
class TargetBlockHitAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: TargetBlockHitAfterEvent) => void): (arg0: TargetBlockHitAfterEvent) => void;
    unsubscribe(callback: (arg0: TargetBlockHitAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [TargetBlockHitAfterEvent](#targetblockhitafterevent-类)) => void) => (arg0: [TargetBlockHitAfterEvent](#targetblockhitafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [TargetBlockHitAfterEvent](#targetblockhitafterevent-类)) => void) => void，取消订阅该事件。

### TargetBlockHitAfterEvent 类

<Version type="script" add="1.4.0"/>

击中标靶后的事件信息。

```typescript
class TargetBlockHitAfterEvent {
    private constructor();
    readonly hitVector: Vector3;
    readonly previousRedstonePower: number;
    readonly redstonePower: number;
    readonly source: Entity;
}
```

#### 属性

- <ReadOnly/> hitVector: [Vector3](../general#vector3-接口)，来源击中方块的位置。
- <ReadOnly/> previousRedstonePower: number，方块被击中前的红石信号强度。
- <ReadOnly/> redstonePower: number，方块被击中时的红石信号强度。
- <ReadOnly/> source: [Entity](../entity_and_player/entity#entity-类)，击中标靶的来源（若有）。

---

## 绊线钩触发事件

### TripWireTripAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当绊线钩被触发后触发该事件信号。

```typescript
class TripWireTripAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: TripWireTripAfterEvent) => void): (arg0: TripWireTripAfterEvent) => void;
    unsubscribe(callback: (arg0: TripWireTripAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [TripWireTripAfterEvent](#tripwiretripafterevent-类)) => void) => (arg0: [TripWireTripAfterEvent](#tripwiretripafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [TripWireTripAfterEvent](#tripwiretripafterevent-类)) => void) => void，取消订阅该事件。

### TripWireTripAfterEvent 类

<Version type="script" add="1.4.0"/>

绊线钩触发后的事件信息。

```typescript
class TripWireTripAfterEvent {
    private constructor();
    readonly isPowered: boolean;
    readonly sources: Entity[];
}
```

#### 属性

- <ReadOnly/> isPowered: boolean，方块是否带有红石信号。
- <ReadOnly/> sources: [Entity](../entity_and_player/entity#entity-类)[]，触发绊线钩的来源。

---

## 弹射物击中方块事件

### ProjectileHitBlockAfterEventSignal 类

<Version type="script" add="1.5.0"/>

当弹射物击中方块后触发该事件信号。

```typescript
class ProjectileHitBlockAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ProjectileHitBlockAfterEvent) => void): (arg0: ProjectileHitBlockAfterEvent) => void;
    unsubscribe(callback: (arg0: ProjectileHitBlockAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ProjectileHitBlockAfterEvent](#projectilehitblockafterevent-类)) => void) => (arg0: [ProjectileHitBlockAfterEvent](#projectilehitblockafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ProjectileHitBlockAfterEvent](#projectilehitblockafterevent-类)) => void) => void，取消订阅该事件。

### ProjectileHitBlockAfterEvent 类

<Version type="script" add="1.5.0"/>

弹射物击中方块后的事件信息。

```typescript
class ProjectileHitBlockAfterEvent {
    private constructor();
    readonly dimension: Dimension;
    readonly hitVector: Vector3;
    readonly location: Vector3;
    readonly projectile: Entity;
    readonly source?: Entity;
    getBlockHit(): BlockHitInformation;
}
```

#### 属性

- <ReadOnly/> dimension: [Dimension](../dimension/main#dimension-类)，弹射物击中发生的维度。
- <ReadOnly/> hitVector: [Vector3](../general#vector3-接口)，弹射物击中方块时的方向向量。
- <ReadOnly/> location: [Vector3](../general#vector3-接口)，弹射物击中的位置。
- <ReadOnly/> projectile: [Entity](../entity_and_player/entity#entity-类)，击中方块的弹射物实体。
- <ReadOnly/> <Optional/> source: [Entity](../entity_and_player/entity#entity-类)，发射该弹射物的来源实体（若有）。

#### 方法

- <RestrictedMode inline/> getBlockHit: () => BlockHitInformation，获取被弹射物击中方块的附加信息。

---

## 弹射物击中实体事件

### ProjectileHitEntityAfterEventSignal 类

<Version type="script" add="1.5.0"/>

当弹射物击中实体后触发该事件信号。

```typescript
class ProjectileHitEntityAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ProjectileHitEntityAfterEvent) => void): (arg0: ProjectileHitEntityAfterEvent) => void;
    unsubscribe(callback: (arg0: ProjectileHitEntityAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ProjectileHitEntityAfterEvent](#projectilehitentityafterevent-类)) => void) => (arg0: [ProjectileHitEntityAfterEvent](#projectilehitentityafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ProjectileHitEntityAfterEvent](#projectilehitentityafterevent-类)) => void) => void，取消订阅该事件。

### ProjectileHitEntityAfterEvent 类

<Version type="script" add="1.5.0"/>

弹射物击中实体后的事件信息。

```typescript
class ProjectileHitEntityAfterEvent {
    private constructor();
    readonly dimension: Dimension;
    readonly hitVector: Vector3;
    readonly location: Vector3;
    readonly projectile: Entity;
    readonly source?: Entity;
    getEntityHit(): EntityHitInformation;
}
```

#### 属性

- <ReadOnly/> dimension: [Dimension](../dimension/main#dimension-类)，弹射物击中发生的维度。
- <ReadOnly/> hitVector: [Vector3](../general#vector3-接口)，弹射物击中实体时的方向向量。
- <ReadOnly/> location: [Vector3](../general#vector3-接口)，弹射物击中的位置。
- <ReadOnly/> projectile: [Entity](../entity_and_player/entity#entity-类)，击中实体的弹射物实体。
- <ReadOnly/> <Optional/> source: [Entity](../entity_and_player/entity#entity-类)，发射该弹射物的来源实体（若有）。

#### 方法

- <RestrictedMode inline/> getEntityHit: () => EntityHitInformation，获取被弹射物击中实体的附加信息。

---

## 实体加载事件

### EntityLoadAfterEventSignal 类

<Version type="script" add="1.6.0"/>

当实体加载后触发该事件信号。

```typescript
class EntityLoadAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: EntityLoadAfterEvent) => void): (arg0: EntityLoadAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityLoadAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityLoadAfterEvent](#entityloadafterevent-类)) => void) => (arg0: [EntityLoadAfterEvent](#entityloadafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityLoadAfterEvent](#entityloadafterevent-类)) => void) => void，取消订阅该事件。

### EntityLoadAfterEvent 类

<Version type="script" add="1.6.0"/>

实体加载后的事件信息。

```typescript
class EntityLoadAfterEvent {
    private constructor();
    entity: Entity;
}
```

#### 属性

- entity: [Entity](../entity_and_player/entity#entity-类)，被加载的实体。

---

## 实体移除事件

### EntityRemoveAfterEventSignal 类

<Version type="script" add="1.6.0"/>

当实体移除后触发该事件信号。

```typescript
class EntityRemoveAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: EntityRemoveAfterEvent) => void, options?: EntityEventOptions): (arg0: EntityRemoveAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityRemoveAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityRemoveAfterEvent](#entityremoveafterevent-类)) => void, options?: [EntityEventOptions](#entityeventoptions-接口)) => (arg0: [EntityRemoveAfterEvent](#entityremoveafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityRemoveAfterEvent](#entityremoveafterevent-类)) => void) => void，取消订阅该事件。

### EntityRemoveAfterEvent 类

<Version type="script" add="1.6.0"/>

实体移除后的事件信息。其筛选项见[实体死亡事件](#实体死亡事件)。

```typescript
class EntityRemoveAfterEvent {
    private constructor();
    readonly removedEntityId: string;
    readonly typeId: string;
}
```

#### 属性

- <ReadOnly/> removedEntityId: string，被移除的实体的标识符。
- <ReadOnly/> typeId: string，被移除实体的类型标识符，例如“minecraft:skeleton”。

---

## 实体生成事件

### EntitySpawnAfterEventSignal 类

<Version type="script" add="1.6.0"/>

当实体生成后触发该事件信号。

```typescript
class EntitySpawnAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: EntitySpawnAfterEvent) => void): (arg0: EntitySpawnAfterEvent) => void;
    unsubscribe(callback: (arg0: EntitySpawnAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntitySpawnAfterEvent](#entityspawnafterevent-类)) => void) => (arg0: [EntitySpawnAfterEvent](#entityspawnafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntitySpawnAfterEvent](#entityspawnafterevent-类)) => void) => void，取消订阅该事件。

### EntitySpawnAfterEvent 类

<Version type="script" add="1.6.0"/>

实体生成后的事件信息。

```typescript
class EntitySpawnAfterEvent {
    private constructor();
    readonly cause: EntityInitializationCause;
    entity: Entity;
}
```

#### 属性

- <ReadOnly/> cause: EntityInitializationCause，实体的初始化原因（生成、繁殖等）。
- entity: [Entity](../entity_and_player/entity#entity-类)，生成的实体。

---

## 玩家破坏方块事件

### PlayerBreakBlockAfterEventSignal 类

<Version type="script" add="1.6.0"/>

当玩家破坏方块后触发该事件信号。

```typescript
class PlayerBreakBlockAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerBreakBlockAfterEvent) => void,
        options?: BlockEventOptions,
    ): (arg0: PlayerBreakBlockAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerBreakBlockAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerBreakBlockAfterEvent](#playerbreakblockafterevent-类)) => void, options?: [BlockEventOptions](#blockeventoptions-接口)) => (arg0: [PlayerBreakBlockAfterEvent](#playerbreakblockafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerBreakBlockAfterEvent](#playerbreakblockafterevent-类)) => void) => void，取消订阅该事件。

### PlayerBreakBlockAfterEvent 类

<Version type="script" add="1.6.0"/>

玩家破坏方块后的事件信息。

```typescript
class PlayerBreakBlockAfterEvent {
    private constructor();
    readonly brokenBlockPermutation: BlockPermutation;
    readonly itemStackAfterBreak?: ItemStack;
    readonly itemStackBeforeBreak?: ItemStack;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> brokenBlockPermutation: [BlockPermutation](../block/main#blockpermutation-类)，方块被破坏前的状态信息。
- <ReadOnly/> <Optional/> itemStackAfterBreak: [ItemStack](../item/main#itemstack-类)，方块被破坏后，玩家用于破坏该方块的物品；若为空手则为空。
- <ReadOnly/> <Optional/> itemStackBeforeBreak: [ItemStack](../item/main#itemstack-类)，方块被破坏前，玩家用于破坏该方块的物品；若为空手则为空。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，破坏该方块的玩家。

### BlockEventOptions 接口

<Version type="script" add="1.6.0"/>

指定方块相关事件的筛选项，可用于玩家破坏方块和玩家放置方块事件。

```typescript
interface BlockEventOptions {
    blockTypes?: string[];
    permutations?: BlockPermutation[];
}
```

- <Optional/> blockTypes: string[]，若设置，该事件只会在受影响方块的类型与此匹配时触发。
- <Optional/> permutations: [BlockPermutation](../block/main#blockpermutation-类)[]，若设置，该事件只会在受影响方块的状态与此匹配时触发。

---

## 玩家维度更改事件

### PlayerDimensionChangeAfterEventSignal 类

<Version type="script" add="1.6.0"/>

当玩家维度更改后触发该事件信号。

```typescript
class PlayerDimensionChangeAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerDimensionChangeAfterEvent) => void): (arg0: PlayerDimensionChangeAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerDimensionChangeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerDimensionChangeAfterEvent](#playerdimensionchangeafterevent-类)) => void) => (arg0: [PlayerDimensionChangeAfterEvent](#playerdimensionchangeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerDimensionChangeAfterEvent](#playerdimensionchangeafterevent-类)) => void) => void，取消订阅该事件。

### PlayerDimensionChangeAfterEvent 类

<Version type="script" add="1.6.0"/>

玩家维度更改后的事件信息。

```typescript
class PlayerDimensionChangeAfterEvent {
    private constructor();
    readonly fromDimension: Dimension;
    readonly fromLocation: Vector3;
    readonly player: Player;
    readonly toDimension: Dimension;
    readonly toLocation: Vector3;
}
```

#### 属性

- <ReadOnly/> fromDimension: [Dimension](../dimension/main#dimension-类)，玩家更改前所在的维度。
- <ReadOnly/> fromLocation: [Vector3](../general#vector3-接口)，玩家更改维度前所在的位置。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，正在更改维度的玩家。
- <ReadOnly/> toDimension: [Dimension](../dimension/main#dimension-类)，玩家更改后的维度。
- <ReadOnly/> toLocation: [Vector3](../general#vector3-接口)，玩家更改维度后生成的位置。

---

## 玩家放置方块事件

### PlayerPlaceBlockAfterEventSignal 类

<Version type="script" add="1.6.0"/>

当玩家放置方块后触发该事件信号。

```typescript
class PlayerPlaceBlockAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerPlaceBlockAfterEvent) => void,
        options?: BlockEventOptions,
    ): (arg0: PlayerPlaceBlockAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerPlaceBlockAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerPlaceBlockAfterEvent](#playerplaceblockafterevent-类)) => void, options?: [BlockEventOptions](#blockeventoptions-接口)) => (arg0: [PlayerPlaceBlockAfterEvent](#playerplaceblockafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerPlaceBlockAfterEvent](#playerplaceblockafterevent-类)) => void) => void，取消订阅该事件。

### PlayerPlaceBlockAfterEvent 类

<Version type="script" add="1.6.0"/>

玩家放置方块后的事件信息。其筛选项见[玩家破坏方块事件](#玩家破坏方块事件)。

```typescript
class PlayerPlaceBlockAfterEvent {
    private constructor();
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，放置该方块的玩家。

---

## 数据驱动实体触发实体事件

### DataDrivenEntityTriggerAfterEventSignal 类

<Version type="script" add="1.8.0"/>

当数据驱动实体触发实体后触发该事件信号。

```typescript
class DataDrivenEntityTriggerAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: DataDrivenEntityTriggerAfterEvent) => void,
        options?: EntityDataDrivenTriggerEventOptions,
    ): (arg0: DataDrivenEntityTriggerAfterEvent) => void;
    unsubscribe(callback: (arg0: DataDrivenEntityTriggerAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [DataDrivenEntityTriggerAfterEvent](#datadrivenentitytriggerafterevent-类)) => void, options?: [EntityDataDrivenTriggerEventOptions](#entitydatadriventriggereventoptions-接口)) => (arg0: [DataDrivenEntityTriggerAfterEvent](#datadrivenentitytriggerafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [DataDrivenEntityTriggerAfterEvent](#datadrivenentitytriggerafterevent-类)) => void) => void，取消订阅该事件。

### DataDrivenEntityTriggerAfterEvent 类

<Version type="script" add="1.8.0"/>

数据驱动实体触发实体后的事件信息。

```typescript
class DataDrivenEntityTriggerAfterEvent {
    private constructor();
    readonly entity: Entity;
    readonly eventId: string;
    getModifiers(): DefinitionModifier[];
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，触发该事件的实体。
- <ReadOnly/> eventId: string，被触发的数据驱动事件的名称。

#### 方法

- getModifiers: () => DefinitionModifier[]，该事件对组件状态所做修改的可更新列表。

### EntityDataDrivenTriggerEventOptions 接口

<Version type="script" add="1.8.0"/>

指定数据驱动实体触发实体事件的筛选项。

```typescript
interface EntityDataDrivenTriggerEventOptions {
    entities?: Entity[];
    entityTypes?: string[];
    eventTypes?: string[];
}
```

- <Optional/> entities: [Entity](../entity_and_player/entity#entity-类)[]，若设置，该事件只会对集合内包含的实体触发。
- <Optional/> entityTypes: string[]，若设置，该事件只会在受影响实体的类型与此匹配时触发。
- <Optional/> eventTypes: string[]，若设置，该事件只会在被触发的实体事件与其中一项匹配时触发。

---

## 添加状态效果事件

### EffectAddAfterEventSignal 类

<Version type="script" add="1.9.0"/>

当添加状态效果后触发该事件信号。

```typescript
class EffectAddAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: EffectAddAfterEvent) => void, options?: EntityEventOptions): (arg0: EffectAddAfterEvent) => void;
    unsubscribe(callback: (arg0: EffectAddAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EffectAddAfterEvent](#effectaddafterevent-类)) => void, options?: [EntityEventOptions](#entityeventoptions-接口)) => (arg0: [EffectAddAfterEvent](#effectaddafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EffectAddAfterEvent](#effectaddafterevent-类)) => void) => void，取消订阅该事件。

### EffectAddAfterEvent 类

<Version type="script" add="1.9.0"/>

添加状态效果后的事件信息。其筛选项见[实体死亡事件](#实体死亡事件)。

```typescript
class EffectAddAfterEvent {
    private constructor();
    readonly effect: Effect;
    readonly entity: Entity;
}
```

#### 属性

- <ReadOnly/> effect: Effect，该状态效果的附加属性与细节。
- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，被添加状态效果的实体。

---

## 爆炸事件

### ExplosionAfterEventSignal 类

<Version type="script" add="1.9.0"/>

当发生爆炸后触发该事件信号。

```typescript
class ExplosionAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ExplosionAfterEvent) => void): (arg0: ExplosionAfterEvent) => void;
    unsubscribe(callback: (arg0: ExplosionAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ExplosionAfterEvent](#explosionafterevent-类)) => void) => (arg0: [ExplosionAfterEvent](#explosionafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ExplosionAfterEvent](#explosionafterevent-类)) => void) => void，取消订阅该事件。

### ExplosionAfterEvent 类

<Version type="script" add="1.9.0"/>

爆炸发生后的事件信息。

```typescript
class ExplosionAfterEvent {
    private constructor();
    readonly dimension: Dimension;
    readonly source?: Entity;
    getImpactedBlocks(): Block[];
}
```

#### 属性

- <ReadOnly/> dimension: [Dimension](../dimension/main#dimension-类)，爆炸发生的维度。
- <ReadOnly/> <Optional/> source: [Entity](../entity_and_player/entity#entity-类)，爆炸的来源（若有）。

#### 方法

- getImpactedBlocks: () => [Block](../block/main#block-类)[]，受该爆炸事件影响的方块集合。

---

## 天气更改事件

### WeatherChangeAfterEventSignal 类

<Version type="script" add="1.9.0"/>

当天气更改后触发该事件信号。

```typescript
class WeatherChangeAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: WeatherChangeAfterEvent) => void): (arg0: WeatherChangeAfterEvent) => void;
    unsubscribe(callback: (arg0: WeatherChangeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [WeatherChangeAfterEvent](#weatherchangeafterevent-类)) => void) => (arg0: [WeatherChangeAfterEvent](#weatherchangeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [WeatherChangeAfterEvent](#weatherchangeafterevent-类)) => void) => void，取消订阅该事件。

### WeatherChangeAfterEvent 类

<Version type="script" add="1.9.0"/>

天气更改后的事件信息。

```typescript
class WeatherChangeAfterEvent {
    private constructor();
    readonly dimension: string;
    readonly newWeather: WeatherType;
    readonly previousWeather: WeatherType;
}
```

#### 属性

- <ReadOnly/> dimension: string，天气发生改变的维度。
- <ReadOnly/> newWeather: [WeatherType](../dimension/main#weathertype-枚举)，天气改变后的天气类型。
- <ReadOnly/> previousWeather: [WeatherType](../dimension/main#weathertype-枚举)，天气改变前的天气类型。

---

## 活塞激活事件

### PistonActivateAfterEventSignal 类

<Version type="script" add="1.9.0"/>

当活塞激活后触发该事件信号。

```typescript
class PistonActivateAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PistonActivateAfterEvent) => void): (arg0: PistonActivateAfterEvent) => void;
    unsubscribe(callback: (arg0: PistonActivateAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PistonActivateAfterEvent](#pistonactivateafterevent-类)) => void) => (arg0: [PistonActivateAfterEvent](#pistonactivateafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PistonActivateAfterEvent](#pistonactivateafterevent-类)) => void) => void，取消订阅该事件。

### PistonActivateAfterEvent 类

<Version type="script" add="1.9.0"/>

活塞激活后的事件信息。

```typescript
class PistonActivateAfterEvent {
    private constructor();
    readonly isExpanding: boolean;
    readonly piston: BlockPistonComponent;
}
```

#### 属性

- <ReadOnly/> isExpanding: boolean，活塞是否正在伸展。
- <ReadOnly/> piston: BlockPistonComponent，该活塞的附加属性与细节。

---

## 游戏规则更改事件

### GameRuleChangeAfterEventSignal 类

<Version type="script" add="1.11.0"/>

当游戏规则更改后触发该事件信号。

```typescript
class GameRuleChangeAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: GameRuleChangeAfterEvent) => void): (arg0: GameRuleChangeAfterEvent) => void;
    unsubscribe(callback: (arg0: GameRuleChangeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [GameRuleChangeAfterEvent](#gamerulechangeafterevent-类)) => void) => (arg0: [GameRuleChangeAfterEvent](#gamerulechangeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [GameRuleChangeAfterEvent](#gamerulechangeafterevent-类)) => void) => void，取消订阅该事件。

### GameRuleChangeAfterEvent 类

<Version type="script" add="1.11.0"/>

游戏规则更改后的事件信息。

```typescript
class GameRuleChangeAfterEvent {
    private constructor();
    readonly rule: GameRule;
    readonly value: boolean | number;
}
```

#### 属性

- <ReadOnly/> rule: GameRule，发生改变的 world.gameRules 中对应游戏规则的标识符。
- <ReadOnly/> value: boolean | number，游戏规则改变后的值。

---

## 玩家游戏模式更改事件

### PlayerGameModeChangeAfterEventSignal 类

<Version type="script" add="1.11.0"/>

当玩家游戏模式更改后触发该事件信号。

```typescript
class PlayerGameModeChangeAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerGameModeChangeAfterEvent) => void): (arg0: PlayerGameModeChangeAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerGameModeChangeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerGameModeChangeAfterEvent](#playergamemodechangeafterevent-类)) => void) => (arg0: [PlayerGameModeChangeAfterEvent](#playergamemodechangeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerGameModeChangeAfterEvent](#playergamemodechangeafterevent-类)) => void) => void，取消订阅该事件。

### PlayerGameModeChangeAfterEvent 类

<Version type="script" add="1.11.0"/>

玩家游戏模式更改后的事件信息。

```typescript
class PlayerGameModeChangeAfterEvent {
    private constructor();
    readonly fromGameMode: GameMode;
    readonly player: Player;
    readonly toGameMode: GameMode;
}
```

#### 属性

- <ReadOnly/> fromGameMode: GameMode，更改前的游戏模式。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，该事件对应的玩家。
- <ReadOnly/> toGameMode: GameMode，更改后的游戏模式。

---

## 玩家输入权限分类更改事件

### PlayerInputPermissionCategoryChangeAfterEventSignal 类

<Version type="script" add="1.12.0"/>

当玩家输入权限分类更改后触发该事件信号。

```typescript
class PlayerInputPermissionCategoryChangeAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerInputPermissionCategoryChangeAfterEvent) => void,
    ): (arg0: PlayerInputPermissionCategoryChangeAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerInputPermissionCategoryChangeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerInputPermissionCategoryChangeAfterEvent](#playerinputpermissioncategorychangeafterevent-类)) => void) => (arg0: [PlayerInputPermissionCategoryChangeAfterEvent](#playerinputpermissioncategorychangeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerInputPermissionCategoryChangeAfterEvent](#playerinputpermissioncategorychangeafterevent-类)) => void) => void，取消订阅该事件。

### PlayerInputPermissionCategoryChangeAfterEvent 类

<Version type="script" add="1.12.0"/>

玩家输入权限分类更改后的事件信息。

```typescript
class PlayerInputPermissionCategoryChangeAfterEvent {
    private constructor();
    readonly category: InputPermissionCategory;
    readonly enabled: boolean;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> category: InputPermissionCategory，发生改变的输入权限分类。
- <ReadOnly/> enabled: boolean，玩家输入权限的启用或禁用状态。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，输入权限发生改变的玩家。

---

## 方块爆炸事件

### BlockExplodeAfterEventSignal 类

<Version type="script" add="1.12.0"/>

当发生方块爆炸后触发该事件信号。

```typescript
class BlockExplodeAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: BlockExplodeAfterEvent) => void): (arg0: BlockExplodeAfterEvent) => void;
    unsubscribe(callback: (arg0: BlockExplodeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [BlockExplodeAfterEvent](#blockexplodeafterevent-类)) => void) => (arg0: [BlockExplodeAfterEvent](#blockexplodeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [BlockExplodeAfterEvent](#blockexplodeafterevent-类)) => void) => void，取消订阅该事件。

### BlockExplodeAfterEvent 类

<Version type="script" add="1.12.0"/>

方块爆炸发生后的事件信息。

```typescript
class BlockExplodeAfterEvent {
    private constructor();
    readonly explodedBlockPermutation: BlockPermutation;
    readonly source?: Entity;
}
```

#### 属性

- <ReadOnly/> explodedBlockPermutation: [BlockPermutation](../block/main#blockpermutation-类)，发生爆炸的方块的状态信息。
- <ReadOnly/> <Optional/> source: [Entity](../entity_and_player/entity#entity-类)，爆炸的来源（若有）。

---

## 玩家发送表情事件

### PlayerEmoteAfterEventSignal 类

<Version type="script" add="1.14.0"/>

当玩家发送表情后触发该事件信号。

```typescript
class PlayerEmoteAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerEmoteAfterEvent) => void): (arg0: PlayerEmoteAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerEmoteAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerEmoteAfterEvent](#playeremoteafterevent-类)) => void) => (arg0: [PlayerEmoteAfterEvent](#playeremoteafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerEmoteAfterEvent](#playeremoteafterevent-类)) => void) => void，取消订阅该事件。

### PlayerEmoteAfterEvent 类

<Version type="script" add="1.14.0"/>

玩家发送表情后的事件信息。

```typescript
class PlayerEmoteAfterEvent {
    private constructor();
    readonly personaPieceId: string;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> personaPieceId: string，玩家发送表情所用的个性表情标识符。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，发送该表情的玩家。

---

## 玩家和方块交互事件

### PlayerInteractWithBlockAfterEventSignal 类

<Version type="script" add="1.15.0"/>

当玩家和方块交互后触发该事件信号。

```typescript
class PlayerInteractWithBlockAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerInteractWithBlockAfterEvent) => void): (arg0: PlayerInteractWithBlockAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerInteractWithBlockAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerInteractWithBlockAfterEvent](#playerinteractwithblockafterevent-类)) => void) => (arg0: [PlayerInteractWithBlockAfterEvent](#playerinteractwithblockafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerInteractWithBlockAfterEvent](#playerinteractwithblockafterevent-类)) => void) => void，取消订阅该事件。

### PlayerInteractWithBlockAfterEvent 类

<Version type="script" add="1.15.0"/>

玩家和方块交互后的事件信息。

```typescript
class PlayerInteractWithBlockAfterEvent {
    private constructor();
    readonly beforeItemStack?: ItemStack;
    readonly block: Block;
    readonly blockFace: Direction;
    readonly faceLocation: Vector3;
    readonly isFirstEvent: boolean;
    readonly itemStack?: ItemStack;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> <Optional/> beforeItemStack: [ItemStack](../item/main#itemstack-类)，交互成功前的物品；若为空手则为空。
- <ReadOnly/> block: [Block](../block/main#block-类)，被交互的方块。
- <ReadOnly/> blockFace: [Direction](../general#direction-枚举)，被交互方块的朝向。
- <ReadOnly/> faceLocation: [Vector3](../general#vector3-接口)，相对于方块西北下角的位置，用于表示物品被放置的位置。
- <ReadOnly/> isFirstEvent: boolean，玩家首次按下交互键触发时为 true，因长按交互键而触发时为 false。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，交互成功后的物品；若为空手则为空。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，该事件对应的玩家。

---

## 玩家和实体交互事件

### PlayerInteractWithEntityAfterEventSignal 类

<Version type="script" add="1.15.0"/>

当玩家和实体交互后触发该事件信号。

```typescript
class PlayerInteractWithEntityAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerInteractWithEntityAfterEvent) => void): (arg0: PlayerInteractWithEntityAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerInteractWithEntityAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerInteractWithEntityAfterEvent](#playerinteractwithentityafterevent-类)) => void) => (arg0: [PlayerInteractWithEntityAfterEvent](#playerinteractwithentityafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerInteractWithEntityAfterEvent](#playerinteractwithentityafterevent-类)) => void) => void，取消订阅该事件。

### PlayerInteractWithEntityAfterEvent 类

<Version type="script" add="1.15.0"/>

玩家和实体交互后的事件信息。

```typescript
class PlayerInteractWithEntityAfterEvent {
    private constructor();
    readonly beforeItemStack?: ItemStack;
    readonly itemStack?: ItemStack;
    readonly player: Player;
    readonly target: Entity;
}
```

#### 属性

- <ReadOnly/> <Optional/> beforeItemStack: [ItemStack](../item/main#itemstack-类)，交互成功前的物品；若为空手则为空。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，交互成功后的物品；若为空手则为空。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，该事件对应的玩家。
- <ReadOnly/> target: [Entity](../entity_and_player/entity#entity-类)，被交互的实体。

---

## 玩家输入模式更改事件

### PlayerInputModeChangeAfterEventSignal 类

<Version type="script" add="1.17.0"/>

当玩家输入模式更改后触发该事件信号。

```typescript
class PlayerInputModeChangeAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerInputModeChangeAfterEvent) => void): (arg0: PlayerInputModeChangeAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerInputModeChangeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerInputModeChangeAfterEvent](#playerinputmodechangeafterevent-类)) => void) => (arg0: [PlayerInputModeChangeAfterEvent](#playerinputmodechangeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerInputModeChangeAfterEvent](#playerinputmodechangeafterevent-类)) => void) => void，取消订阅该事件。

### PlayerInputModeChangeAfterEvent 类

<Version type="script" add="1.17.0"/>

玩家输入模式更改后的事件信息。

```typescript
class PlayerInputModeChangeAfterEvent {
    private constructor();
    readonly newInputModeUsed: InputMode;
    readonly player: Player;
    readonly previousInputModeUsed: InputMode;
}
```

#### 属性

- <ReadOnly/> newInputModeUsed: InputMode，玩家新的输入模式。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，输入模式发生改变的玩家。
- <ReadOnly/> previousInputModeUsed: InputMode，玩家原来的输入模式。

---

## 玩家输入按钮更改事件

### PlayerButtonInputAfterEventSignal 类

<Version type="script" add="1.18.0"/>

当玩家输入按钮更改后触发该事件信号。

```typescript
class PlayerButtonInputAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerButtonInputAfterEvent) => void,
        options?: InputEventOptions,
    ): (arg0: PlayerButtonInputAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerButtonInputAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerButtonInputAfterEvent](#playerbuttoninputafterevent-类)) => void, options?: [InputEventOptions](#inputeventoptions-接口)) => (arg0: [PlayerButtonInputAfterEvent](#playerbuttoninputafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerButtonInputAfterEvent](#playerbuttoninputafterevent-类)) => void) => void，取消订阅该事件。

### PlayerButtonInputAfterEvent 类

<Version type="script" add="1.18.0"/>

玩家输入按钮更改后的事件信息。

```typescript
class PlayerButtonInputAfterEvent {
    private constructor();
    readonly button: InputButton;
    readonly newButtonState: ButtonState;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> button: InputButton，该事件对应的按钮。
- <ReadOnly/> newButtonState: ButtonState，该按钮转变到的状态。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，执行该输入事件的玩家。

### InputEventOptions 接口

<Version type="script" add="1.18.0"/>

指定玩家输入按钮更改事件的筛选项。

```typescript
interface InputEventOptions {
    buttons?: InputButton[];
    state?: ButtonState;
}
```

- <Optional/> buttons: InputButton[]，需要调用回调的按钮。若为空，则对所有按钮调用回调。
- <Optional/> state: ButtonState，需要调用回调的按钮状态。若为空，则对所有按钮状态调用回调。

---

## 世界加载事件

### WorldLoadAfterEventSignal 类

<Version type="script" add="2.0.0"/>

当世界加载后触发该事件信号。

```typescript
class WorldLoadAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: WorldLoadAfterEvent) => void): (arg0: WorldLoadAfterEvent) => void;
    unsubscribe(callback: (arg0: WorldLoadAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [WorldLoadAfterEvent](#worldloadafterevent-类)) => void) => (arg0: [WorldLoadAfterEvent](#worldloadafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [WorldLoadAfterEvent](#worldloadafterevent-类)) => void) => void，取消订阅该事件。

### WorldLoadAfterEvent 类

<Version type="script" add="2.0.0"/>

世界加载后的事件信息。

```typescript
class WorldLoadAfterEvent {
    private constructor();
}
```

---

## 玩家快捷栏选择槽位更改事件

### PlayerHotbarSelectedSlotChangeAfterEventSignal 类

<Version type="script" add="2.1.0"/>

当玩家快捷栏选择槽位更改后触发该事件信号。

```typescript
class PlayerHotbarSelectedSlotChangeAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerHotbarSelectedSlotChangeAfterEvent) => void,
        options?: HotbarEventOptions,
    ): (arg0: PlayerHotbarSelectedSlotChangeAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerHotbarSelectedSlotChangeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerHotbarSelectedSlotChangeAfterEvent](#playerhotbarselectedslotchangeafterevent-类)) => void, options?: [HotbarEventOptions](#hotbareventoptions-接口)) => (arg0: [PlayerHotbarSelectedSlotChangeAfterEvent](#playerhotbarselectedslotchangeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerHotbarSelectedSlotChangeAfterEvent](#playerhotbarselectedslotchangeafterevent-类)) => void) => void，取消订阅该事件。

### PlayerHotbarSelectedSlotChangeAfterEvent 类

<Version type="script" add="2.1.0"/>

玩家快捷栏选择槽位更改后的事件信息。

```typescript
class PlayerHotbarSelectedSlotChangeAfterEvent {
    private constructor();
    readonly itemStack?: ItemStack;
    readonly newSlotSelected: number;
    readonly player: Player;
    readonly previousSlotSelected: number;
}
```

#### 属性

- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，新选中的槽位中的物品。
- <ReadOnly/> newSlotSelected: number，新选中的快捷栏槽位索引。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，该事件对应的玩家。
- <ReadOnly/> previousSlotSelected: number，原来选中的快捷栏槽位索引。

### HotbarEventOptions 接口

<Version type="script" add="2.1.0"/>

指定玩家快捷栏选择槽位更改事件的筛选项。

```typescript
interface HotbarEventOptions {
    allowedSlots?: number[];
}
```

- <Optional/> allowedSlots: number[]，需要关注的槽位索引，取值应为 0 到 8（含）。若未指定，则关注所有槽位。

---

## 玩家物品栏物品更改事件

### PlayerInventoryItemChangeAfterEventSignal 类

<Version type="script" add="2.1.0"/>

当玩家物品栏物品更改后触发该事件信号。

```typescript
class PlayerInventoryItemChangeAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerInventoryItemChangeAfterEvent) => void,
        options?: InventoryItemEventOptions,
    ): (arg0: PlayerInventoryItemChangeAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerInventoryItemChangeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerInventoryItemChangeAfterEvent](#playerinventoryitemchangeafterevent-类)) => void, options?: [InventoryItemEventOptions](#inventoryitemeventoptions-接口)) => (arg0: [PlayerInventoryItemChangeAfterEvent](#playerinventoryitemchangeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerInventoryItemChangeAfterEvent](#playerinventoryitemchangeafterevent-类)) => void) => void，取消订阅该事件。

### PlayerInventoryItemChangeAfterEvent 类

<Version type="script" add="2.1.0"/>

玩家物品栏物品更改后的事件信息。

```typescript
class PlayerInventoryItemChangeAfterEvent {
    private constructor();
    readonly beforeItemStack?: ItemStack;
    readonly inventoryType: PlayerInventoryType;
    readonly itemStack?: ItemStack;
    readonly player: Player;
    readonly slot: number;
}
```

#### 属性

- <ReadOnly/> <Optional/> beforeItemStack: [ItemStack](../item/main#itemstack-类)，原来的物品。
- <ReadOnly/> inventoryType: [PlayerInventoryType](#playerinventorytype-枚举)，物品栏类型。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，新的物品。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，该事件对应的玩家。
- <ReadOnly/> slot: number，发生改变的槽位索引。

### InventoryItemEventOptions 接口

<Version type="script" add="2.1.0"/>

指定玩家物品栏物品更改事件的筛选项。

```typescript
interface InventoryItemEventOptions {
    allowedSlots?: number[];
    excludeItems?: string[];
    excludeTags?: string[];
    ignoreQuantityChange?: boolean;
    includeItems?: string[];
    includeTags?: string[];
    inventoryType?: PlayerInventoryType;
}
```

- <Optional/> allowedSlots: number[]，需要关注的槽位索引，取值应为正数。若未指定，则关注所有槽位。
- <Optional/> excludeItems: string[]，要排除的物品名称。
- <Optional/> excludeTags: string[]，要排除的物品标签。
- <Optional/> ignoreQuantityChange: boolean，是否仅忽略数量变化。true 表示忽略数量变化，false 表示不忽略。
- <Optional/> includeItems: string[]，需要关注的物品名称。
- <Optional/> includeTags: string[]，需要关注的物品标签。
- <Optional/> inventoryType: [PlayerInventoryType](#playerinventorytype-枚举)，需要关注的玩家物品栏类型。

### PlayerInventoryType 枚举

<Version type="script" add="2.1.0"/>

变更的物品栏类型。

```typescript
enum PlayerInventoryType {
    Hotbar = "Hotbar", // 快捷栏物品栏
    Inventory = "Inventory", // 主物品栏
}
```

---

## 玩家开始挥舞事件

### PlayerSwingStartAfterEventSignal 类

<Version type="script" add="2.5.0"/>

当玩家开始挥舞后触发该事件信号。

```typescript
class PlayerSwingStartAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerSwingStartAfterEvent) => void,
        options?: PlayerSwingEventOptions,
    ): (arg0: PlayerSwingStartAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerSwingStartAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerSwingStartAfterEvent](#playerswingstartafterevent-类)) => void, options?: [PlayerSwingEventOptions](#playerswingeventoptions-接口)) => (arg0: [PlayerSwingStartAfterEvent](#playerswingstartafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerSwingStartAfterEvent](#playerswingstartafterevent-类)) => void) => void，取消订阅该事件。

### PlayerSwingStartAfterEvent 类

<Version type="script" add="2.5.0"/>

玩家开始挥舞后的事件信息。

```typescript
class PlayerSwingStartAfterEvent {
    private constructor();
    readonly heldItemStack?: ItemStack;
    readonly player: Player;
    readonly swingSource: EntitySwingSource;
}
```

#### 属性

- <ReadOnly/> <Optional/> heldItemStack: [ItemStack](../item/main#itemstack-类)，玩家开始挥舞时手持的物品。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，该事件对应的玩家。
- <ReadOnly/> swingSource: EntitySwingSource，玩家挥舞的来源，见 EntitySwingSource。

### PlayerSwingEventOptions 接口

<Version type="script" add="2.5.0"/>

指定玩家开始挥舞事件的筛选项。

```typescript
interface PlayerSwingEventOptions {
    heldItemOption?: HeldItemOption;
    swingSource?: EntitySwingSource;
}
```

- <Optional/> heldItemOption: HeldItemOption，需要调用回调的手持物品选项。若为空，则无论玩家是否手持物品都会调用回调。
- <Optional/> swingSource: EntitySwingSource，需要调用回调的挥舞来源，见 EntitySwingSource。若为空，则对所有挥舞来源调用回调。

---

## 实体回复生命事件

### EntityHealAfterEventSignal 类

<Version type="script" add="2.6.0"/>

当实体回复生命后触发该事件信号。

```typescript
class EntityHealAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: EntityHealAfterEvent) => void, options?: EntityHealEventOptions): (arg0: EntityHealAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityHealAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityHealAfterEvent](#entityhealafterevent-类)) => void, options?: [EntityHealEventOptions](#entityhealeventoptions-接口)) => (arg0: [EntityHealAfterEvent](#entityhealafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityHealAfterEvent](#entityhealafterevent-类)) => void) => void，取消订阅该事件。

### EntityHealAfterEvent 类

<Version type="script" add="2.6.0"/>

实体回复生命后的事件信息。

```typescript
class EntityHealAfterEvent {
    private constructor();
    readonly healedEntity: Entity;
    readonly healing: number;
    readonly healSource: EntityHealSource;
}
```

#### 属性

- <ReadOnly/> healedEntity: [Entity](../entity_and_player/entity#entity-类)，被治疗的实体。
- <ReadOnly/> healing: number，治疗的数值。
- <ReadOnly/> healSource: EntityHealSource，治疗的来源信息。

### EntityHealEventOptions 接口

<Version type="script" add="2.6.0"/>

指定实体生命值相关事件的筛选项，可用于实体生命值改变和实体回复生命事件。

```typescript
interface EntityHealEventOptions {
    allowedHealCauses?: EntityHealCause[];
    entityFilter?: EntityFilter;
}
```

- <Optional/> allowedHealCauses: EntityHealCause[]，若设置，该事件只会在治疗原因匹配时触发。
- <Optional/> entityFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，若设置，该事件只会对匹配的实体触发。

---

## 物品实体掉落事件

### EntityItemDropAfterEventSignal 类

<Version type="script" add="2.6.0"/>

当实体掉落物品后触发该事件信号。

```typescript
class EntityItemDropAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityItemDropAfterEvent) => void,
        options?: EntityItemDropEventOptions,
    ): (arg0: EntityItemDropAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityItemDropAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityItemDropAfterEvent](#entityitemdropafterevent-类)) => void, options?: [EntityItemDropEventOptions](#entityitemdropeventoptions-接口)) => (arg0: [EntityItemDropAfterEvent](#entityitemdropafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityItemDropAfterEvent](#entityitemdropafterevent-类)) => void) => void，取消订阅该事件。

### EntityItemDropAfterEvent 类

<Version type="script" add="2.6.0"/>

物品实体掉落后的事件信息。

```typescript
class EntityItemDropAfterEvent {
    private constructor();
    readonly entity: Entity;
    readonly items: Entity[];
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，掉落物品的实体。
- <ReadOnly/> items: [Entity](../entity_and_player/entity#entity-类)[]，实体掉落的物品列表。

### EntityItemDropEventOptions 接口

<Version type="script" add="2.6.0"/>

指定物品实体掉落事件的筛选项。

```typescript
interface EntityItemDropEventOptions {
    entityFilter?: EntityFilter;
    itemFilter?: ItemFilter;
}
```

- <Optional/> entityFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，若设置，该事件只会对匹配的实体触发。
- <Optional/> itemFilter: ItemFilter，若设置，该事件只会在事件中的某一物品匹配时触发。

---

## 实体拾取物品事件

### EntityItemPickupAfterEventSignal 类

<Version type="script" add="2.6.0"/>

当实体拾取物品后触发该事件信号。

```typescript
class EntityItemPickupAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityItemPickupAfterEvent) => void,
        options?: EntityItemPickupEventOptions,
    ): (arg0: EntityItemPickupAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityItemPickupAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityItemPickupAfterEvent](#entityitempickupafterevent-类)) => void, options?: [EntityItemPickupEventOptions](#entityitempickupeventoptions-接口)) => (arg0: [EntityItemPickupAfterEvent](#entityitempickupafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityItemPickupAfterEvent](#entityitempickupafterevent-类)) => void) => void，取消订阅该事件。

### EntityItemPickupAfterEvent 类

<Version type="script" add="2.6.0"/>

实体拾取物品后的事件信息。

```typescript
class EntityItemPickupAfterEvent {
    private constructor();
    readonly entity: Entity;
    readonly items: ItemStack[];
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，拾取物品的实体。
- <ReadOnly/> items: [ItemStack](../item/main#itemstack-类)[]，实体拾取的物品列表。

### EntityItemPickupEventOptions 接口

<Version type="script" add="2.6.0"/>

指定实体拾取物品事件的筛选项。

```typescript
interface EntityItemPickupEventOptions {
    entityFilter?: EntityFilter;
    itemFilter?: ItemFilter;
}
```

- <Optional/> entityFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，若设置，该事件只会对匹配的实体触发。
- <Optional/> itemFilter: ItemFilter，若设置，该事件只会在事件中的某一物品匹配时触发。

---

## 方块容器关闭事件

### BlockContainerClosedAfterEventSignal 类

<Version type="script" add="2.8.0"/>

当方块容器关闭后触发该事件信号。

```typescript
class BlockContainerClosedAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: BlockContainerClosedAfterEvent) => void,
        options?: BlockContainerAccessEventOptions,
    ): (arg0: BlockContainerClosedAfterEvent) => void;
    unsubscribe(callback: (arg0: BlockContainerClosedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [BlockContainerClosedAfterEvent](#blockcontainerclosedafterevent-类)) => void, options?: [BlockContainerAccessEventOptions](#blockcontaineraccesseventoptions-接口)) => (arg0: [BlockContainerClosedAfterEvent](#blockcontainerclosedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [BlockContainerClosedAfterEvent](#blockcontainerclosedafterevent-类)) => void) => void，取消订阅该事件。

### BlockContainerClosedAfterEvent 类

<Version type="script" add="2.8.0"/>

方块容器关闭后的事件信息。

```typescript
class BlockContainerClosedAfterEvent {
    private constructor();
    closeSource: ContainerAccessSource;
}
```

#### 属性

- closeSource: ContainerAccessSource，方块容器被关闭的来源。

### BlockContainerAccessEventOptions 接口

<Version type="script" add="2.8.0"/>

指定方块容器访问事件的筛选项，可用于方块容器关闭和方块容器打开事件。

```typescript
interface BlockContainerAccessEventOptions {
    accessSourceFilter?: ContainerAccessSourceFilter;
    blockFilter?: BlockFilter;
}
```

- <Optional/> accessSourceFilter: ContainerAccessSourceFilter，若提供，用于筛选哪些容器访问来源可以触发该事件。
- <Optional/> blockFilter: [BlockFilter](../dimension/volume#blockfilter-接口)，若提供，用于筛选哪些容器方块可以触发该事件。

---

## 方块容器打开事件

### BlockContainerOpenedAfterEventSignal 类

<Version type="script" add="2.8.0"/>

当方块容器打开后触发该事件信号。

```typescript
class BlockContainerOpenedAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: BlockContainerOpenedAfterEvent) => void,
        options?: BlockContainerAccessEventOptions,
    ): (arg0: BlockContainerOpenedAfterEvent) => void;
    unsubscribe(callback: (arg0: BlockContainerOpenedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [BlockContainerOpenedAfterEvent](#blockcontaineropenedafterevent-类)) => void, options?: [BlockContainerAccessEventOptions](#blockcontaineraccesseventoptions-接口)) => (arg0: [BlockContainerOpenedAfterEvent](#blockcontaineropenedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [BlockContainerOpenedAfterEvent](#blockcontaineropenedafterevent-类)) => void) => void，取消订阅该事件。

### BlockContainerOpenedAfterEvent 类

<Version type="script" add="2.8.0"/>

方块容器打开后的事件信息。其筛选项见[方块容器关闭事件](#方块容器关闭事件)。

```typescript
class BlockContainerOpenedAfterEvent {
    private constructor();
    openSource: ContainerAccessSource;
}
```

#### 属性

- openSource: ContainerAccessSource，方块容器被打开的来源。

---

## 实体容器关闭事件

### EntityContainerClosedAfterEventSignal 类

<Version type="script" add="2.8.0"/>

当实体容器关闭后触发该事件信号。

```typescript
class EntityContainerClosedAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityContainerClosedAfterEvent) => void,
        options?: EntityContainerAccessEventOptions,
    ): (arg0: EntityContainerClosedAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityContainerClosedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityContainerClosedAfterEvent](#entitycontainerclosedafterevent-类)) => void, options?: [EntityContainerAccessEventOptions](#entitycontaineraccesseventoptions-接口)) => (arg0: [EntityContainerClosedAfterEvent](#entitycontainerclosedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityContainerClosedAfterEvent](#entitycontainerclosedafterevent-类)) => void) => void，取消订阅该事件。

### EntityContainerClosedAfterEvent 类

<Version type="script" add="2.8.0"/>

实体容器关闭后的事件信息。

```typescript
class EntityContainerClosedAfterEvent {
    private constructor();
    readonly closeSource: ContainerAccessSource;
    readonly entity: Entity;
}
```

#### 属性

- <ReadOnly/> closeSource: ContainerAccessSource，实体容器被关闭的来源。
- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，容器被关闭的实体。

### EntityContainerAccessEventOptions 接口

<Version type="script" add="2.8.0"/>

指定实体容器访问事件的筛选项，可用于实体容器关闭和实体容器打开事件。

```typescript
interface EntityContainerAccessEventOptions {
    accessSourceFilter?: ContainerAccessSourceFilter;
    entityFilter?: EntityFilter;
}
```

- <Optional/> accessSourceFilter: ContainerAccessSourceFilter，若提供，用于筛选哪些容器访问来源可以触发该事件。
- <Optional/> entityFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，若提供，用于筛选哪些实体容器可以触发该事件。

---

## 实体容器打开事件

### EntityContainerOpenedAfterEventSignal 类

<Version type="script" add="2.8.0"/>

当实体容器打开后触发该事件信号。

```typescript
class EntityContainerOpenedAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityContainerOpenedAfterEvent) => void,
        options?: EntityContainerAccessEventOptions,
    ): (arg0: EntityContainerOpenedAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityContainerOpenedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityContainerOpenedAfterEvent](#entitycontaineropenedafterevent-类)) => void, options?: [EntityContainerAccessEventOptions](#entitycontaineraccesseventoptions-接口)) => (arg0: [EntityContainerOpenedAfterEvent](#entitycontaineropenedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityContainerOpenedAfterEvent](#entitycontaineropenedafterevent-类)) => void) => void，取消订阅该事件。

### EntityContainerOpenedAfterEvent 类

<Version type="script" add="2.8.0"/>

实体容器打开后的事件信息。其筛选项见[实体容器关闭事件](#实体容器关闭事件)。

```typescript
class EntityContainerOpenedAfterEvent {
    private constructor();
    readonly entity: Entity;
    readonly openSource: ContainerAccessSource;
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，容器被打开的实体。
- <ReadOnly/> openSource: ContainerAccessSource，实体容器被打开的来源。

---

## 实体更新事件

实体更新是在实体定义中定义了实体版本所导致的。另见[实体版本](/docs/docs/entities/entity_version)。

### EntityUpgradeAfterEventSignal 类

<Version type="script" add="2.8.0"/>

当实体更新后触发该事件信号。

```typescript
class EntityUpgradeAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityUpgradeAfterEvent) => void,
        options?: EntityDataDrivenTriggerEventOptions,
    ): (arg0: EntityUpgradeAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityUpgradeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityUpgradeAfterEvent](#entityupgradeafterevent-类)) => void, options?: [EntityDataDrivenTriggerEventOptions](#entitydatadriventriggereventoptions-接口)) => (arg0: [EntityUpgradeAfterEvent](#entityupgradeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityUpgradeAfterEvent](#entityupgradeafterevent-类)) => void) => void，取消订阅该事件。

### EntityUpgradeAfterEvent 类

<Version type="script" add="2.8.0"/>

实体更新后的事件信息。其筛选项见[数据驱动实体触发实体事件](#数据驱动实体触发实体事件)。

```typescript
class EntityUpgradeAfterEvent {
    private constructor();
    readonly entity: Entity;
    readonly upgradeId: string;
    getModifiers(): DefinitionModifier[];
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，触发该版本升级的实体。
- <ReadOnly/> upgradeId: string，被触发的数据驱动升级的名称。

#### 方法

- getModifiers: () => DefinitionModifier[]，该升级对组件状态所做修改的可更新列表。

---

## 玩家取消破坏方块事件

### PlayerCancelBreakingBlockAfterEventSignal 类

<Version type="script" add="2.9.0"/>

当玩家取消破坏方块后触发该事件信号。

```typescript
class PlayerCancelBreakingBlockAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerCancelBreakingBlockAfterEvent) => void,
        options?: PlayerBreakingBlockEventOptions,
    ): (arg0: PlayerCancelBreakingBlockAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerCancelBreakingBlockAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerCancelBreakingBlockAfterEvent](#playercancelbreakingblockafterevent-类)) => void, options?: [PlayerBreakingBlockEventOptions](#playerbreakingblockeventoptions-接口)) => (arg0: [PlayerCancelBreakingBlockAfterEvent](#playercancelbreakingblockafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerCancelBreakingBlockAfterEvent](#playercancelbreakingblockafterevent-类)) => void) => void，取消订阅该事件。

### PlayerCancelBreakingBlockAfterEvent 类

<Version type="script" add="2.9.0"/>

玩家取消破坏方块后的事件信息。

```typescript
class PlayerCancelBreakingBlockAfterEvent {
    private constructor();
    readonly blockPermutation: BlockPermutation;
    readonly breakProgress: number;
    readonly face: Direction;
    readonly heldItemStack?: ItemStack;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> blockPermutation: [BlockPermutation](../block/main#blockpermutation-类)，玩家取消破坏时方块的状态。
- <ReadOnly/> breakProgress: number，玩家取消破坏时的破坏进度，范围为开区间 (0, 1)。
- <ReadOnly/> face: [Direction](../general#direction-枚举)，正在被破坏的方块的朝向。
- <ReadOnly/> <Optional/> heldItemStack: [ItemStack](../item/main#itemstack-类)，玩家用于破坏该方块的物品；若为空手则为空。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，取消破坏该方块的玩家。

### PlayerBreakingBlockEventOptions 接口

<Version type="script" add="2.9.0"/>

指定玩家破坏方块相关事件的筛选项，可用于玩家取消破坏方块和玩家开始破坏方块事件。

```typescript
interface PlayerBreakingBlockEventOptions {
    blockFilter?: BlockFilter;
    playerFilter?: EntityFilter;
}
```

- <Optional/> blockFilter: [BlockFilter](../dimension/volume#blockfilter-接口)，需要调用回调的方块筛选项，见 BlockFilter。若为空，则对所有方块调用回调。
- <Optional/> playerFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，需要调用回调的玩家筛选项，见 EntityFilter。若为空，则对所有玩家调用回调。

---

## 玩家开始破坏方块事件

### PlayerStartBreakingBlockAfterEventSignal 类

<Version type="script" add="2.9.0"/>

当玩家开始破坏方块后触发该事件信号。

```typescript
class PlayerStartBreakingBlockAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerStartBreakingBlockAfterEvent) => void,
        options?: PlayerBreakingBlockEventOptions,
    ): (arg0: PlayerStartBreakingBlockAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerStartBreakingBlockAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerStartBreakingBlockAfterEvent](#playerstartbreakingblockafterevent-类)) => void, options?: [PlayerBreakingBlockEventOptions](#playerbreakingblockeventoptions-接口)) => (arg0: [PlayerStartBreakingBlockAfterEvent](#playerstartbreakingblockafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerStartBreakingBlockAfterEvent](#playerstartbreakingblockafterevent-类)) => void) => void，取消订阅该事件。

### PlayerStartBreakingBlockAfterEvent 类

<Version type="script" add="2.9.0"/>

玩家开始破坏方块后的事件信息。其筛选项见[玩家取消破坏方块事件](#玩家取消破坏方块事件)。

```typescript
class PlayerStartBreakingBlockAfterEvent {
    private constructor();
    readonly blockPermutation: BlockPermutation;
    readonly face: Direction;
    readonly heldItemStack?: ItemStack;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> blockPermutation: [BlockPermutation](../block/main#blockpermutation-类)，玩家开始破坏的方块的状态。
- <ReadOnly/> face: [Direction](../general#direction-枚举)，正在被破坏的方块的朝向。
- <ReadOnly/> <Optional/> heldItemStack: [ItemStack](../item/main#itemstack-类)，玩家用于破坏该方块的物品；若为空手则为空。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，开始破坏该方块的玩家。

---

## 实体开始潜行事件

### EntityStartSneakingAfterEventSignal 类

<Version type="script" add="2.10.0"/>

当实体开始潜行后触发该事件信号。

```typescript
class EntityStartSneakingAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityStartSneakingAfterEvent) => void,
        options?: EntitySneakingChangedEventOptions,
    ): (arg0: EntityStartSneakingAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityStartSneakingAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityStartSneakingAfterEvent](#entitystartsneakingafterevent-类)) => void, options?: [EntitySneakingChangedEventOptions](#entitysneakingchangedeventoptions-接口)) => (arg0: [EntityStartSneakingAfterEvent](#entitystartsneakingafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityStartSneakingAfterEvent](#entitystartsneakingafterevent-类)) => void) => void，取消订阅该事件。

### EntityStartSneakingAfterEvent 类

<Version type="script" add="2.10.0"/>

实体开始潜行后的事件信息。

```typescript
class EntityStartSneakingAfterEvent {
    private constructor();
    readonly entity: Entity;
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，开始潜行的实体。

### EntitySneakingChangedEventOptions 接口

<Version type="script" add="2.10.0"/>

指定实体潜行相关事件的筛选项，可用于实体开始潜行和实体停止潜行事件。

```typescript
interface EntitySneakingChangedEventOptions {
    entityFilter?: EntityFilter;
}
```

- <Optional/> entityFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，需要关注的实体筛选项。

---

## 实体停止潜行事件

### EntityStopSneakingAfterEventSignal 类

<Version type="script" add="2.10.0"/>

当实体停止潜行后触发该事件信号。

```typescript
class EntityStopSneakingAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityStopSneakingAfterEvent) => void,
        options?: EntitySneakingChangedEventOptions,
    ): (arg0: EntityStopSneakingAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityStopSneakingAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityStopSneakingAfterEvent](#entitystopsneakingafterevent-类)) => void, options?: [EntitySneakingChangedEventOptions](#entitysneakingchangedeventoptions-接口)) => (arg0: [EntityStopSneakingAfterEvent](#entitystopsneakingafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityStopSneakingAfterEvent](#entitystopsneakingafterevent-类)) => void) => void，取消订阅该事件。

### EntityStopSneakingAfterEvent 类

<Version type="script" add="2.10.0"/>

实体停止潜行后的事件信息。其筛选项见[实体开始潜行事件](#实体开始潜行事件)。

```typescript
class EntityStopSneakingAfterEvent {
    private constructor();
    readonly entity: Entity;
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，停止潜行的实体。

---

## 实体被驯服事件

### EntityTamedAfterEventSignal 类

<Version type="script" add="2.10.0"/>

当实体被驯服后触发该事件信号。

```typescript
class EntityTamedAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: EntityTamedAfterEvent) => void,
        options?: EntityTamedEventOptions,
    ): (arg0: EntityTamedAfterEvent) => void;
    unsubscribe(callback: (arg0: EntityTamedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [EntityTamedAfterEvent](#entitytamedafterevent-类)) => void, options?: [EntityTamedEventOptions](#entitytamedeventoptions-接口)) => (arg0: [EntityTamedAfterEvent](#entitytamedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [EntityTamedAfterEvent](#entitytamedafterevent-类)) => void) => void，取消订阅该事件。

### EntityTamedAfterEvent 类

<Version type="script" add="2.10.0"/>

实体被驯服后的事件信息。

```typescript
class EntityTamedAfterEvent {
    private constructor();
    readonly entity: Entity;
    readonly tamingEntity: Entity;
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../entity_and_player/entity#entity-类)，被驯服的实体。
- <ReadOnly/> tamingEntity: [Entity](../entity_and_player/entity#entity-类)，驯服该实体的实体。

### EntityTamedEventOptions 接口

<Version type="script" add="2.10.0"/>

指定实体被驯服事件的筛选项。

```typescript
interface EntityTamedEventOptions {
    entityFilter?: EntityFilter;
    tamingEntityFilter?: EntityFilter;
}
```

- <Optional/> entityFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，需要关注的实体筛选项。
- <Optional/> tamingEntityFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，需要关注的驯服者筛选项。

---

## 音效播放完毕事件

### SoundCompletedAfterEventSignal 类

<Version type="script" add="2.10.0"/>

当音效播放完毕后触发该事件信号。

```typescript
class SoundCompletedAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: SoundCompletedAfterEvent) => void): (arg0: SoundCompletedAfterEvent) => void;
    unsubscribe(callback: (arg0: SoundCompletedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [SoundCompletedAfterEvent](#soundcompletedafterevent-类)) => void) => (arg0: [SoundCompletedAfterEvent](#soundcompletedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [SoundCompletedAfterEvent](#soundcompletedafterevent-类)) => void) => void，取消订阅该事件。

### SoundCompletedAfterEvent 类

<Version type="script" add="2.10.0"/>

音效播放完毕后的事件信息。

```typescript
class SoundCompletedAfterEvent {
    private constructor();
    readonly soundInstanceId: string;
}
```

#### 属性

- <ReadOnly/> soundInstanceId: string，完成播放的音效实例标识符，与播放音效时返回的 SoundInstance 的 id 属性一致。

---

## 世界时钟暂停事件

### WorldClockOnPausedAfterEventSignal 类

<Version type="script" add="2.11.0"/>

当世界时钟暂停后触发该事件信号。

```typescript
class WorldClockOnPausedAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: WorldClockOnPausedAfterEvent) => void,
        options?: WorldClockEventOptions,
    ): (arg0: WorldClockOnPausedAfterEvent) => void;
    unsubscribe(callback: (arg0: WorldClockOnPausedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [WorldClockOnPausedAfterEvent](#worldclockonpausedafterevent-类)) => void, options?: [WorldClockEventOptions](#worldclockeventoptions-接口)) => (arg0: [WorldClockOnPausedAfterEvent](#worldclockonpausedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [WorldClockOnPausedAfterEvent](#worldclockonpausedafterevent-类)) => void) => void，取消订阅该事件。

### WorldClockOnPausedAfterEvent 类

<Version type="script" add="2.11.0"/>

世界时钟暂停后的事件信息。

```typescript
class WorldClockOnPausedAfterEvent {
    private constructor();
    readonly clock: WorldClock;
}
```

#### 属性

- <ReadOnly/> clock: [WorldClock](./world_clock#worldclock-类)，被暂停的世界时钟。

### WorldClockEventOptions 接口

<Version type="script" add="2.11.0"/>

指定世界时钟相关事件的筛选项，可用于世界时钟暂停、世界时钟恢复和世界时钟时间更改事件。

```typescript
interface WorldClockEventOptions {
    clock: string;
}
```

- clock: string，需要触发该事件的世界时钟名称。

---

## 世界时钟恢复事件

### WorldClockOnResumedAfterEventSignal 类

<Version type="script" add="2.11.0"/>

当世界时钟恢复后触发该事件信号。

```typescript
class WorldClockOnResumedAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: WorldClockOnResumedAfterEvent) => void,
        options?: WorldClockEventOptions,
    ): (arg0: WorldClockOnResumedAfterEvent) => void;
    unsubscribe(callback: (arg0: WorldClockOnResumedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [WorldClockOnResumedAfterEvent](#worldclockonresumedafterevent-类)) => void, options?: [WorldClockEventOptions](#worldclockeventoptions-接口)) => (arg0: [WorldClockOnResumedAfterEvent](#worldclockonresumedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [WorldClockOnResumedAfterEvent](#worldclockonresumedafterevent-类)) => void) => void，取消订阅该事件。

### WorldClockOnResumedAfterEvent 类

<Version type="script" add="2.11.0"/>

世界时钟恢复后的事件信息。其筛选项见[世界时钟暂停事件](#世界时钟暂停事件)。

```typescript
class WorldClockOnResumedAfterEvent {
    private constructor();
    readonly clock: WorldClock;
}
```

#### 属性

- <ReadOnly/> clock: [WorldClock](./world_clock#worldclock-类)，被恢复的世界时钟。

---

## 世界时钟时间标记事件

### WorldClockOnTimeMarkerAfterEventSignal 类

<Version type="script" add="2.11.0"/>

当世界时钟的时间到达时间标记后触发该事件信号。

```typescript
class WorldClockOnTimeMarkerAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: WorldClockOnTimeMarkerAfterEvent) => void,
        options?: WorldClockTimeMarkerEventOptions,
    ): (arg0: WorldClockOnTimeMarkerAfterEvent) => void;
    unsubscribe(callback: (arg0: WorldClockOnTimeMarkerAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [WorldClockOnTimeMarkerAfterEvent](#worldclockontimemarkerafterevent-类)) => void, options?: [WorldClockTimeMarkerEventOptions](#worldclocktimemarkereventoptions-接口)) => (arg0: [WorldClockOnTimeMarkerAfterEvent](#worldclockontimemarkerafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [WorldClockOnTimeMarkerAfterEvent](#worldclockontimemarkerafterevent-类)) => void) => void，取消订阅该事件。

### WorldClockOnTimeMarkerAfterEvent 类

<Version type="script" add="2.11.0"/>

世界时钟的时间到达时间标记后的事件信息。

```typescript
class WorldClockOnTimeMarkerAfterEvent {
    private constructor();
    readonly clock: WorldClock;
    readonly timeMarker: TimeMarker;
}
```

#### 属性

- <ReadOnly/> clock: [WorldClock](./world_clock#worldclock-类)，到达时间标记的世界时钟。
- <ReadOnly/> timeMarker: [TimeMarker](./world_clock#timemarker-类)，被世界时钟到达的时间标记。

### WorldClockTimeMarkerEventOptions 接口

<Version type="script" add="2.11.0"/>

指定世界时钟时间标记事件的筛选项。

```typescript
interface WorldClockTimeMarkerEventOptions {
    clock: string;
    timeMarker?: string;
}
```

- clock: string，需要触发该事件的世界时钟名称。
- <Optional/> timeMarker: string，需要触发该事件的时间标记名称。若为空，则世界时钟上所有时间标记都会触发该事件。

---

## 世界时钟时间更改事件

### WorldClockOnTimeModifiedAfterEventSignal 类

<Version type="script" add="2.11.0"/>

当世界时钟时间更改后触发该事件信号。

```typescript
class WorldClockOnTimeModifiedAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: WorldClockOnTimeModifiedAfterEvent) => void,
        options?: WorldClockEventOptions,
    ): (arg0: WorldClockOnTimeModifiedAfterEvent) => void;
    unsubscribe(callback: (arg0: WorldClockOnTimeModifiedAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [WorldClockOnTimeModifiedAfterEvent](#worldclockontimemodifiedafterevent-类)) => void, options?: [WorldClockEventOptions](#worldclockeventoptions-接口)) => (arg0: [WorldClockOnTimeModifiedAfterEvent](#worldclockontimemodifiedafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [WorldClockOnTimeModifiedAfterEvent](#worldclockontimemodifiedafterevent-类)) => void) => void，取消订阅该事件。

### WorldClockOnTimeModifiedAfterEvent 类

<Version type="script" add="2.11.0"/>

世界时钟时间更改后的事件信息。其筛选项见[世界时钟暂停事件](#世界时钟暂停事件)。

```typescript
class WorldClockOnTimeModifiedAfterEvent {
    private constructor();
    readonly clock: WorldClock;
}
```

#### 属性

- <ReadOnly/> clock: [WorldClock](./world_clock#worldclock-类)，时间被更改的世界时钟。

---

## 发送聊天消息事件

### ChatSendAfterEventSignal 类

<Version type="script" experimental="测试版API"/>

当发送聊天消息后触发该事件信号。

```typescript
class ChatSendAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: ChatSendAfterEvent) => void): (arg0: ChatSendAfterEvent) => void;
    unsubscribe(callback: (arg0: ChatSendAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ChatSendAfterEvent](#chatsendafterevent-类)) => void) => (arg0: [ChatSendAfterEvent](#chatsendafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ChatSendAfterEvent](#chatsendafterevent-类)) => void) => void，取消订阅该事件。

### ChatSendAfterEvent 类

<Version type="script" experimental="测试版API"/>

发送聊天消息后的事件信息。

```typescript
class ChatSendAfterEvent {
    private constructor();
    readonly message: string;
    readonly sender: Player;
    readonly targets?: Player[];
}
```

#### 属性

- <ReadOnly/> message: string，正在广播的消息。
- <ReadOnly/> sender: [Player](../entity_and_player/player#player-类)，发送该聊天消息的玩家。
- <ReadOnly/> <Optional/> targets: [Player](../entity_and_player/player#player-类)[]，将收到该消息的玩家列表（若有）。若定义，则该消息只发给一个或多个指定玩家，而非广播。

---

## 附加包设置更改事件

### PackSettingChangeAfterEventSignal 类

<Version type="script" experimental="测试版API"/>

当附加包设置更改后触发该事件信号。

```typescript
class PackSettingChangeAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PackSettingChangeAfterEvent) => void): (arg0: PackSettingChangeAfterEvent) => void;
    unsubscribe(callback: (arg0: PackSettingChangeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PackSettingChangeAfterEvent](#packsettingchangeafterevent-类)) => void) => (arg0: [PackSettingChangeAfterEvent](#packsettingchangeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PackSettingChangeAfterEvent](#packsettingchangeafterevent-类)) => void) => void，取消订阅该事件。

### PackSettingChangeAfterEvent 类

<Version type="script" experimental="测试版API"/>

附加包设置更改后的事件信息。

```typescript
class PackSettingChangeAfterEvent {
    private constructor();
    readonly settingName: string;
    readonly settingValue: string[] | boolean | number | string;
}
```

#### 属性

- <ReadOnly/> settingName: string，该设置的名称。
- <ReadOnly/> settingValue: string[] | boolean | number | string，该设置的值。

---

## 玩家使用命名牌事件

### PlayerUseNameTagAfterEventSignal 类

<Version type="script" experimental="测试版API"/>

当玩家使用命名牌后触发该事件信号。

```typescript
class PlayerUseNameTagAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerUseNameTagAfterEvent) => void): (arg0: PlayerUseNameTagAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerUseNameTagAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerUseNameTagAfterEvent](#playerusenametagafterevent-类)) => void) => (arg0: [PlayerUseNameTagAfterEvent](#playerusenametagafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerUseNameTagAfterEvent](#playerusenametagafterevent-类)) => void) => void，取消订阅该事件。

### PlayerUseNameTagAfterEvent 类

<Version type="script" experimental="测试版API"/>

玩家使用命名牌后的事件信息。

```typescript
class PlayerUseNameTagAfterEvent {
    private constructor();
    entityNamed: Entity;
    newName: string;
    player: Player;
    previousName?: string;
}
```

#### 属性

- entityNamed: [Entity](../entity_and_player/entity#entity-类)，被玩家命名的实体。
- newName: string，玩家给该实体取的新名称。
- player: [Player](../entity_and_player/player#player-类)，使用命名牌的玩家。
- <Optional/> previousName: string，玩家使用命名牌前实体的原名称。若实体此前没有名称，则为空。

---

## 玩家合成配方事件

### PlayerCraftRecipeAfterEventSignal 类

<Version type="script" experimental="测试版API"/>

当玩家合成配方后触发该事件信号。

```typescript
class PlayerCraftRecipeAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: PlayerCraftRecipeAfterEvent) => void,
        options?: PlayerCraftRecipeEventOptions,
    ): (arg0: PlayerCraftRecipeAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerCraftRecipeAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerCraftRecipeAfterEvent](#playercraftrecipeafterevent-类)) => void, options?: [PlayerCraftRecipeEventOptions](#playercraftrecipeeventoptions-接口)) => (arg0: [PlayerCraftRecipeAfterEvent](#playercraftrecipeafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerCraftRecipeAfterEvent](#playercraftrecipeafterevent-类)) => void) => void，取消订阅该事件。

### PlayerCraftRecipeAfterEvent 类

<Version type="script" experimental="测试版API"/>

玩家合成配方后的事件信息。

```typescript
class PlayerCraftRecipeAfterEvent {
    private constructor();
    readonly block?: Block;
    readonly itemStack?: ItemStack;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> <Optional/> block: [Block](../block/main#block-类)，若配方在方块上合成，返回该方块。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../item/main#itemstack-类)，玩家合成的物品。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，合成该配方的玩家。

### PlayerCraftRecipeEventOptions 接口

<Version type="script" experimental="测试版API"/>

指定玩家合成配方事件的筛选项。

```typescript
interface PlayerCraftRecipeEventOptions {
    blockFilter?: BlockFilter;
    itemFilter?: ItemFilter;
    playerFilter?: EntityFilter;
}
```

- <Optional/> blockFilter: [BlockFilter](../dimension/volume#blockfilter-接口)，对合成配方所用方块的筛选。
- <Optional/> itemFilter: ItemFilter，对玩家合成物品的筛选。
- <Optional/> playerFilter: [EntityFilter](../entity_and_player/entity#entityfilter-接口)，对合成配方玩家的筛选。

---

## 玩家光标抓取物品事件

### PlayerCursorItemGrabAfterEventSignal 类

<Version type="script" experimental="测试版API"/>

当物品从容器移动到玩家光标后触发该事件信号。

```typescript
class PlayerCursorItemGrabAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerCursorItemGrabAfterEvent) => void): (arg0: PlayerCursorItemGrabAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerCursorItemGrabAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerCursorItemGrabAfterEvent](#playercursoritemgrabafterevent-类)) => void) => (arg0: [PlayerCursorItemGrabAfterEvent](#playercursoritemgrabafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerCursorItemGrabAfterEvent](#playercursoritemgrabafterevent-类)) => void) => void，取消订阅该事件。

### PlayerCursorItemGrabAfterEvent 类

<Version type="script" experimental="测试版API"/>

物品从容器移动到玩家光标后的事件信息。

```typescript
class PlayerCursorItemGrabAfterEvent {
    private constructor();
    readonly item: ItemStack;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> item: [ItemStack](../item/main#itemstack-类)，被移动到玩家光标上的物品。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，光标物品发生改变的玩家。

---

## 玩家光标释放物品事件

### PlayerCursorItemReleaseAfterEventSignal 类

<Version type="script" experimental="测试版API"/>

当物品从玩家光标移动到容器后触发该事件信号。

```typescript
class PlayerCursorItemReleaseAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: PlayerCursorItemReleaseAfterEvent) => void): (arg0: PlayerCursorItemReleaseAfterEvent) => void;
    unsubscribe(callback: (arg0: PlayerCursorItemReleaseAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [PlayerCursorItemReleaseAfterEvent](#playercursoritemreleaseafterevent-类)) => void) => (arg0: [PlayerCursorItemReleaseAfterEvent](#playercursoritemreleaseafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [PlayerCursorItemReleaseAfterEvent](#playercursoritemreleaseafterevent-类)) => void) => void，取消订阅该事件。

### PlayerCursorItemReleaseAfterEvent 类

<Version type="script" experimental="测试版API"/>

物品从玩家光标移动到容器后的事件信息。

```typescript
class PlayerCursorItemReleaseAfterEvent {
    private constructor();
    readonly item: ItemStack;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> item: [ItemStack](../item/main#itemstack-类)，玩家光标上的物品。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，光标物品发生改变的玩家。

---

## 服务器接收消息事件

:::danger[警告]

该事件尚未完整实现，请勿使用。

:::

### ServerMessageAfterEventSignal 类

<Version type="script" experimental="测试版API"/>

当客户端向服务器发送消息后触发该事件信号。

```typescript
class ServerMessageAfterEventSignal {
    private constructor();
    subscribe(callback: (arg0: MessageReceiveAfterEvent) => void): (arg0: MessageReceiveAfterEvent) => void;
    unsubscribe(callback: (arg0: MessageReceiveAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [MessageReceiveAfterEvent](#messagereceiveafterevent-类)) => void) => (arg0: [MessageReceiveAfterEvent](#messagereceiveafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [MessageReceiveAfterEvent](#messagereceiveafterevent-类)) => void) => void，取消订阅该事件。

### MessageReceiveAfterEvent 类

<Version type="script" experimental="测试版API"/>

客户端向服务器发送的消息信息。

```typescript
class MessageReceiveAfterEvent {
    private constructor();
    readonly id: string;
    readonly message: string;
    readonly player: Player;
}
```

#### 属性

- <ReadOnly/> id: string，消息的标识符。
- <ReadOnly/> message: string，消息内容。
- <ReadOnly/> player: [Player](../entity_and_player/player#player-类)，发送该消息的玩家。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
