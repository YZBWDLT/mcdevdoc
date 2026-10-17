---
sidebar_position: 3
---

# 事件辅助类型

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"

本文主要记录事件中使用的筛选项、来源与命中信息等辅助类型。

---

## 方块事件筛选项

### BlockEventOptions 接口

<Version type="script" add="1.6.0"/>

指定方块相关事件的筛选项，可用于玩家破坏方块与玩家放置方块等事件。

```typescript
interface BlockEventOptions {
    blockTypes?: string[];
    permutations?: BlockPermutation[];
}
```

#### 属性

- <Optional/> blockTypes: string[]，若设置该值，则仅当受影响方块的类型与此参数匹配时才触发该事件。
- <Optional/> permutations: [BlockPermutation](../../server/block/main#blockpermutation-类)[]，若设置该值，则仅当受影响方块的方块置换与此参数匹配时才触发该事件。

### BlockContainerAccessEventOptions 接口

<Version type="script" add="2.8.0"/>

指定方块容器访问事件的筛选项，可用于方块容器打开与方块容器关闭事件。

```typescript
interface BlockContainerAccessEventOptions {
    accessSourceFilter?: ContainerAccessSourceFilter;
    blockFilter?: BlockFilter;
}
```

#### 属性

- <Optional/> accessSourceFilter: [ContainerAccessSourceFilter](#containeraccesssourcefilter-接口)，若提供该值，则仅当容器访问来源与此匹配时才触发该事件。
- <Optional/> blockFilter: [BlockFilter](../../server/general#blockfilter-接口)，若提供该值，则仅当容器方块与此匹配时才触发该事件。

---

## 实体事件筛选项

### EntityEventOptions 接口

<Version type="script" add="1.4.0"/>

指定实体相关事件的筛选项，可用于实体死亡、实体击打方块、实体击打实体和实体移除等事件。

```typescript
interface EntityEventOptions {
    entities?: Entity[];
    entityTypes?: string[];
}
```

#### 属性

- <Optional/> entities: [Entity](../../server/entity_and_player/entity#entity-类)[]，若设置该值，则该事件只会对集合内的实体触发。
- <Optional/> entityTypes: string[]，若设置该值，则该事件只在受影响实体的类型与此匹配时触发。

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

#### 属性

- <Optional/> entities: [Entity](../../server/entity_and_player/entity#entity-类)[]，若设置该值，则该事件只会对集合内的实体触发。
- <Optional/> entityTypes: string[]，若设置该值，则该事件只在受影响实体的类型与此匹配时触发。
- <Optional/> eventTypes: string[]，若设置该值，则该事件只在被触发的实体事件与其中一项匹配时触发。

### EntityHurtBeforeEventOptions 接口

<Version type="script" add="2.6.0"/>

指定实体受伤前事件的筛选项。

```typescript
interface EntityHurtBeforeEventOptions {
    allowedDamageCauses?: EntityDamageCause[];
    entityFilter?: EntityFilter;
}
```

#### 属性

- <Optional/> allowedDamageCauses: [EntityDamageCause](../../server/entity_and_player/entity#entitydamagecause-枚举)[]，若设置该值，则仅当伤害原因与此参数匹配时才触发该事件。
- <Optional/> entityFilter: [EntityFilter](../../server/general#entityfilter-接口)，若设置该值，则仅当实体与此参数匹配时才触发该事件。

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

#### 属性

- <Optional/> allowedDamageCauses: [EntityDamageCause](../../server/entity_and_player/entity#entitydamagecause-枚举)[]，若设置该值，则仅当伤害原因与此参数匹配时才触发该事件。
- <Optional/> entities: [Entity](../../server/entity_and_player/entity#entity-类)[]，若设置该值，则该事件只会对集合内的实体触发。
- <Optional/> entityFilter: [EntityFilter](../../server/general#entityfilter-接口)，若设置该值，则仅当实体与此参数匹配时才触发该事件。
- <Optional/> entityTypes: string[]，若设置该值，则该事件只在受影响实体的类型与此匹配时触发。

### EntityHealEventOptions 接口

<Version type="script" add="2.6.0"/>

指定实体回复生命事件的筛选项，可用于实体回复生命的前后事件。

```typescript
interface EntityHealEventOptions {
    allowedHealCauses?: EntityHealCause[];
    entityFilter?: EntityFilter;
}
```

#### 属性

- <Optional/> allowedHealCauses: [EntityHealCause](#entityhealcause-枚举)[]，若设置该值，则仅当回复原因与此参数匹配时才触发该事件。
- <Optional/> entityFilter: [EntityFilter](../../server/general#entityfilter-接口)，若设置该值，则仅当实体与此参数匹配时才触发该事件。

### EntityItemPickupEventOptions 接口

<Version type="script" add="2.6.0"/>

指定实体拾取物品事件的筛选项，可用于实体拾取物品的前后事件。

```typescript
interface EntityItemPickupEventOptions {
    entityFilter?: EntityFilter;
    itemFilter?: ItemFilter;
}
```

#### 属性

- <Optional/> entityFilter: [EntityFilter](../../server/general#entityfilter-接口)，若设置该值，则仅当实体与此参数匹配时才触发该事件。
- <Optional/> itemFilter: [ItemFilter](#itemfilter-接口)，若设置该值，则仅当事件中的物品与此参数匹配时才触发该事件。

### EntityTamedEventOptions 接口

<Version type="script" add="2.10.0"/>

指定实体被驯服事件的筛选项，可用于实体被驯服的前后事件。

```typescript
interface EntityTamedEventOptions {
    entityFilter?: EntityFilter;
    tamingEntityFilter?: EntityFilter;
}
```

#### 属性

- <Optional/> entityFilter: [EntityFilter](../../server/general#entityfilter-接口)，若设置该值，则仅当被驯服的实体与此参数匹配时才触发该事件。
- <Optional/> tamingEntityFilter: [EntityFilter](../../server/general#entityfilter-接口)，若设置该值，则仅当驯服者与此参数匹配时才触发该事件。

### EntitySneakingChangedEventOptions 接口

<Version type="script" add="2.10.0"/>

指定实体潜行相关事件的筛选项，可用于实体开始潜行与实体停止潜行事件。

```typescript
interface EntitySneakingChangedEventOptions {
    entityFilter?: EntityFilter;
}
```

#### 属性

- <Optional/> entityFilter: [EntityFilter](../../server/general#entityfilter-接口)，若设置该值，则仅当实体与此参数匹配时才触发该事件。

### EntityItemDropEventOptions 接口

<Version type="script" add="2.6.0"/>

指定物品实体掉落事件的筛选项。

```typescript
interface EntityItemDropEventOptions {
    entityFilter?: EntityFilter;
    itemFilter?: ItemFilter;
}
```

#### 属性

- <Optional/> entityFilter: [EntityFilter](../../server/general#entityfilter-接口)，若设置该值，则仅当拾取物品的实体与此参数匹配时才触发该事件。
- <Optional/> itemFilter: [ItemFilter](#itemfilter-接口)，若设置该值，则仅当事件中的物品与此参数匹配时才触发该事件。

### EntityContainerAccessEventOptions 接口

<Version type="script" add="2.8.0"/>

指定实体容器访问事件的筛选项，可用于实体容器打开与实体容器关闭事件。

```typescript
interface EntityContainerAccessEventOptions {
    accessSourceFilter?: ContainerAccessSourceFilter;
    entityFilter?: EntityFilter;
}
```

#### 属性

- <Optional/> accessSourceFilter: [ContainerAccessSourceFilter](#containeraccesssourcefilter-接口)，若提供该值，则仅当容器访问来源与此匹配时才触发该事件。
- <Optional/> entityFilter: [EntityFilter](../../server/general#entityfilter-接口)，若提供该值，则仅当容器所属实体与此匹配时才触发该事件。

---

## 玩家事件筛选项

### PlayerBreakingBlockEventOptions 接口

<Version type="script" add="2.9.0"/>

指定玩家破坏方块相关事件的筛选项，可用于玩家开始破坏方块与玩家取消破坏方块事件。

```typescript
interface PlayerBreakingBlockEventOptions {
    blockFilter?: BlockFilter;
    playerFilter?: EntityFilter;
}
```

#### 属性

- <Optional/> blockFilter: [BlockFilter](../../server/general#blockfilter-接口)，若设置该值，则仅当被破坏的方块与此参数匹配时才触发该事件。
- <Optional/> playerFilter: [EntityFilter](../../server/general#entityfilter-接口)，若设置该值，则仅当破坏方块的玩家与此参数匹配时才触发该事件。

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

#### 属性

- <Optional/> blockFilter: [BlockFilter](../../server/general#blockfilter-接口)，对合成配方所用方块的筛选条件。
- <Optional/> itemFilter: [ItemFilter](#itemfilter-接口)，对合成所得物品的筛选条件。
- <Optional/> playerFilter: [EntityFilter](../../server/general#entityfilter-接口)，对合成配方玩家的筛选条件。

### PlayerSwingEventOptions 接口

<Version type="script" add="2.5.0"/>

指定玩家开始挥舞事件的筛选项。

```typescript
interface PlayerSwingEventOptions {
    heldItemOption?: HeldItemOption;
    swingSource?: EntitySwingSource;
}
```

#### 属性

- <Optional/> heldItemOption: [HeldItemOption](#helditemoption-枚举)，需要触发回调的手持物品选项；若为空，则无论玩家是否手持物品都会触发。
- <Optional/> swingSource: [EntitySwingSource](#entityswingsource-枚举)，需要触发回调的挥舞来源；若为空，则对所有挥舞来源触发。

### InputEventOptions 接口

<Version type="script" add="1.18.0"/>

指定玩家输入按钮更改事件的筛选项。

```typescript
interface InputEventOptions {
    buttons?: InputButton[];
    state?: ButtonState;
}
```

#### 属性

- <Optional/> buttons: [InputButton](../../server/entity_and_player/input#inputbutton-枚举)[]，需要关注的按钮；若为空，则对所有按钮触发。
- <Optional/> state: [ButtonState](../../server/entity_and_player/input#buttonstate-枚举)，需要关注的按钮状态；若为空，则对所有按钮状态触发。

### HotbarEventOptions 接口

<Version type="script" add="2.1.0"/>

指定玩家快捷栏选择槽位更改事件的筛选项。

```typescript
interface HotbarEventOptions {
    allowedSlots?: number[];
}
```

#### 属性

- <Optional/> allowedSlots: number[]，需要关注的槽位索引，取值应为 0 到 8（含）；若未指定，则关注所有槽位。

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

#### 属性

- <Optional/> allowedSlots: number[]，需要关注的槽位索引，取值应为正数；若未指定，则关注所有槽位。
- <Optional/> excludeItems: string[]，要排除的物品标识符。
- <Optional/> excludeTags: string[]，要排除的物品标签。
- <Optional/> ignoreQuantityChange: boolean，是否忽略数量变化。
- <Optional/> includeItems: string[]，需要关注的物品标识符。
- <Optional/> includeTags: string[]，需要关注的物品标签。
- <Optional/> inventoryType: [PlayerInventoryType](../../server/entity_and_player/player#playerinventorytype-枚举)，需要关注的玩家物品栏类型。

---

## 世界时钟事件筛选项

### WorldClockEventOptions 接口

<Version type="script" add="2.11.0"/>

指定世界时钟相关事件的筛选项，可用于世界时钟重启、暂停与恢复等事件。

```typescript
interface WorldClockEventOptions {
    clock: string;
}
```

#### 属性

- clock: string，该事件所针对的世界时钟的名称。

### WorldClockTimeMarkerEventOptions 接口

<Version type="script" add="2.11.0"/>

指定世界时钟时间标记事件的筛选项。

```typescript
interface WorldClockTimeMarkerEventOptions {
    clock: string;
    timeMarker?: string;
}
```

#### 属性

- clock: string，该事件所针对的世界时钟的名称。
- <Optional/> timeMarker: string，需要触发该事件的时间标记名称；若为空，则该世界时钟上所有时间标记都会触发该事件。

---

## 伤害与治疗

### EntityDamageSource 接口

<Version type="script" add="1.4.0"/>

实体受到伤害时的来源信息。

```typescript
interface EntityDamageSource {
    cause: EntityDamageCause;
    damagingEntity?: Entity;
    damagingProjectile?: Entity;
}
```

#### 属性

- cause: [EntityDamageCause](../../server/entity_and_player/entity#entitydamagecause-枚举)，伤害的原因。
- <Optional/> damagingEntity: [Entity](../../server/entity_and_player/entity#entity-类)，造成伤害的实体；若伤害并非由实体直接造成则为`undefined`。
- <Optional/> damagingProjectile: [Entity](../../server/entity_and_player/entity#entity-类)，造成伤害的弹射物；若伤害并非由弹射物造成则为`undefined`。

### EntityHealSource 类

<Version type="script" add="2.6.0"/>

实体回复生命时的来源信息。

```typescript
class EntityHealSource {
    private constructor();
    readonly cause: EntityHealCause;
}
```

#### 属性

- <ReadOnly/> cause: [EntityHealCause](#entityhealcause-枚举)，回复生命的原因。

### EntityHealCause 枚举

<Version type="script" add="2.6.0"/>

实体回复生命的原因。

```typescript
enum EntityHealCause {
    Heal = "Heal", // 药水或食物等直接治疗
    Regeneration = "Regeneration", // 生命恢复状态效果
    SelfHeal = "SelfHeal", // 实体自身恢复生命
    TotemOfUndying = "TotemOfUndying", // 不死图腾
}
```

---

## 命中信息

### EntityHitInformation 接口

<Version type="script" add="1.5.0"/>

弹射物击中实体时的附加信息。

```typescript
interface EntityHitInformation {
    entity?: Entity;
}
```

#### 属性

- <Optional/> entity: [Entity](../../server/entity_and_player/entity#entity-类)，被击中的实体；若未击中实体则为`undefined`。

### BlockHitInformation 接口

<Version type="script" add="1.5.0"/>

弹射物击中方块时的附加信息。

```typescript
interface BlockHitInformation {
    block: Block;
    face: Direction;
    faceLocation: Vector3;
}
```

#### 属性

- block: [Block](../../server/block/main#block-类)，被击中的方块。
- face: [Direction](../../server/general#direction-枚举)，被击中的方块面。
- faceLocation: [Vector3](../../server/general#vector3-接口)，击中位置相对方块西北下角的位置。

---

## 实体状态与动作

### EntityInitializationCause 枚举

<Version type="script" add="1.6.0"/>

实体的初始化原因。

```typescript
enum EntityInitializationCause {
    Born = "Born", // 出生（繁殖）
    Event = "Event", // 由事件触发
    Loaded = "Loaded", // 区块加载
    Spawned = "Spawned", // 生成
    Transformed = "Transformed", // 转化
}
```

### EntitySwingSource 枚举

<Version type="script" add="2.5.0"/>

实体挥舞手臂的来源。

```typescript
enum EntitySwingSource {
    Attack = "Attack", // 攻击
    Build = "Build", // 放置方块
    DropItem = "DropItem", // 丢弃物品
    Event = "Event", // 由事件触发
    Interact = "Interact", // 交互
    Mine = "Mine", // 挖掘
    None = "None", // 无来源
    ThrowItem = "ThrowItem", // 投掷物品
    UseItem = "UseItem", // 使用物品
}
```

### HeldItemOption 枚举

<Version type="script" add="2.5.0"/>

触发回调时对玩家手持物品的要求。

```typescript
enum HeldItemOption {
    AnyItem = "AnyItem", // 玩家手持任意物品
    NoItem = "NoItem", // 玩家未手持物品
}
```

---

## 容器访问与物品

### ContainerAccessSource 接口

<Version type="script" add="2.8.0"/>

容器被打开或关闭时的来源信息。

```typescript
interface ContainerAccessSource {
    entity?: Entity;
}
```

#### 属性

- <Optional/> entity: [Entity](../../server/entity_and_player/entity#entity-类)，访问该容器的实体；若来源不是实体则为`undefined`。

### ContainerAccessSourceFilter 接口

<Version type="script" add="2.8.0"/>

容器访问来源的筛选条件。

```typescript
interface ContainerAccessSourceFilter {
    entityFilter?: EntityFilter;
}
```

#### 属性

- <Optional/> entityFilter: [EntityFilter](../../server/general#entityfilter-接口)，访问者需匹配的实体筛选条件。

### ItemFilter 接口

<Version type="script" add="2.6.0"/>

物品的筛选条件。

```typescript
interface ItemFilter {
    includeTypes?: (ItemType | string)[];
}
```

#### 属性

- <Optional/> includeTypes: ([ItemType](../../server/item/main#itemtype-类) | string)[]，仅包含这些物品类型；若为空则匹配所有物品类型。

---

## 定义修改

### DefinitionModifier 接口

<Version type="script" add="1.8.0"/>

对实体或方块定义所做的修改，用于在事件中追加或移除组件组与触发器。

```typescript
interface DefinitionModifier {
    addedComponentGroups: string[];
    removedComponentGroups: string[];
    triggers: Trigger[];
}
```

#### 属性

- addedComponentGroups: string[]，要添加的组件组名称。
- removedComponentGroups: string[]，要移除的组件组名称。
- <Version type="script" experimental="测试版API" inline/> triggers: [Trigger](../../server/entity_and_player/component#trigger-类)[]，要添加的触发器。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
