---
sidebar_position: 5
---

# 自定义方块组件

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import EarlyExecution from "/src/components/highlight/earlyExecution"

本文主要记录自定义方块组件相关接口。

---

## 注册

### BlockComponentRegistry 类

<Version type="script" add="1.12.0"/>

用于注册自定义方块组件的注册表。

```typescript
class BlockComponentRegistry {
    private constructor();
    registerCustomComponent(name: string, customComponent: BlockCustomComponent): void;
}
```

#### registerCustomComponent 方法

<EarlyExecution/>

注册一个新的自定义方块组件。

```typescript
registerCustomComponent(name: string, customComponent: BlockCustomComponent): void
```

- name: string，要注册的自定义方块组件名称。
- customComponent: [BlockCustomComponent](#blockcustomcomponent-接口)，要注册的自定义方块组件。

### BlockCustomComponent 接口

<Version type="script" add="1.12.0"/>

包含为方块引发的一组事件。该对象必须通过方块组件注册表绑定。

```typescript
interface BlockCustomComponent {
    beforeOnPlayerPlace?: (arg0: BlockComponentPlayerPlaceBeforeEvent, arg1: CustomComponentParameters) => void;
    onBlockStateChange?: (arg0: BlockComponentBlockStateChangeEvent, arg1: CustomComponentParameters) => void;
    onBreak?: (arg0: BlockComponentBlockBreakEvent, arg1: CustomComponentParameters) => void;
    onEntity?: (arg0: BlockComponentEntityEvent, arg1: CustomComponentParameters) => void;
    onEntityFallOn?: (arg0: BlockComponentEntityFallOnEvent, arg1: CustomComponentParameters) => void;
    onPlace?: (arg0: BlockComponentOnPlaceEvent, arg1: CustomComponentParameters) => void;
    onPlayerBreak?: (arg0: BlockComponentPlayerBreakEvent, arg1: CustomComponentParameters) => void;
    onPlayerInteract?: (arg0: BlockComponentPlayerInteractEvent, arg1: CustomComponentParameters) => void;
    onRandomTick?: (arg0: BlockComponentRandomTickEvent, arg1: CustomComponentParameters) => void;
    onRedstoneUpdate?: (arg0: BlockComponentRedstoneUpdateEvent, arg1: CustomComponentParameters) => void;
    onStepOff?: (arg0: BlockComponentStepOffEvent, arg1: CustomComponentParameters) => void;
    onStepOn?: (arg0: BlockComponentStepOnEvent, arg1: CustomComponentParameters) => void;
    onTick?: (arg0: BlockComponentTickEvent, arg1: CustomComponentParameters) => void;
    onNamedTick?: (arg0: BlockComponentNamedTickEvent, arg1: CustomComponentParameters) => void;
    onNeighborChanged?: (arg0: BlockComponentNeighborChangedAfterEvent, arg1: CustomComponentParameters) => void;
}
```

#### 属性

- <Optional/> beforeOnPlayerPlace: (arg0: [BlockComponentPlayerPlaceBeforeEvent](#blockcomponentplayerplacebeforeevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，玩家放置方块前调用。
- <Version type="script" add="2.8.0" inline/> <Optional/> onBlockStateChange: (arg0: [BlockComponentBlockStateChangeEvent](#blockcomponentblockstatechangeevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，方块置换从先前置换改变时调用。
- <Version type="script" add="2.4.0" inline/> <Optional/> onBreak: (arg0: [BlockComponentBlockBreakEvent](#blockcomponentblockbreakevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，方块被破坏时调用。
- <Version type="script" add="2.6.0" inline/> <Optional/> onEntity: (arg0: [BlockComponentEntityEvent](#blockcomponententityevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，实体向世界中的该方块触发事件时调用。
- <Optional/> onEntityFallOn: (arg0: [BlockComponentEntityFallOnEvent](#blockcomponententityfallonevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，实体落到绑定该自定义组件的方块上时调用。
- <Optional/> onPlace: (arg0: [BlockComponentOnPlaceEvent](#blockcomponentonplaceevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，绑定该自定义组件的方块被放置时调用。
- <Version type="script" add="2.0.0" inline/> <Optional/> onPlayerBreak: (arg0: [BlockComponentPlayerBreakEvent](#blockcomponentplayerbreakevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，方块被玩家破坏时调用。
- <Optional/> onPlayerInteract: (arg0: [BlockComponentPlayerInteractEvent](#blockcomponentplayerinteractevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，玩家成功与绑定该自定义组件的方块交互时调用。
- <Optional/> onRandomTick: (arg0: [BlockComponentRandomTickEvent](#blockcomponentrandomtickevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，方块随机刻时调用。
- <Version type="script" add="2.5.0" inline/> <Optional/> onRedstoneUpdate: (arg0: [BlockComponentRedstoneUpdateEvent](#blockcomponentredstoneupdateevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，方块发生红石更新时调用。
- <Optional/> onStepOff: (arg0: [BlockComponentStepOffEvent](#blockcomponentstepoffevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，实体离开绑定该自定义组件的方块时调用。
- <Optional/> onStepOn: (arg0: [BlockComponentStepOnEvent](#blockcomponentsteponevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，实体踏上绑定该自定义组件的方块时调用。
- <Optional/> onTick: (arg0: [BlockComponentTickEvent](#blockcomponenttickevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，方块刻时调用。
- <Version type="script" experimental="测试版API" inline/> <Optional/> onNamedTick: (arg0: [BlockComponentNamedTickEvent](#blockcomponentnamedtickevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，命名刻触发时调用。
- <Version type="script" experimental="测试版API" inline/> <Optional/> onNeighborChanged: (arg0: [BlockComponentNeighborChangedAfterEvent](#blockcomponentneighborchangedafterevent-类), arg1: [CustomComponentParameters](#customcomponentparameters-类)) =&gt; void，相邻方块改变时调用。

### BlockCustomComponentInstance 类

<Version type="script" add="2.0.0"/>

方块上自定义组件的实例。

继承自[BlockComponent](../../server/block/component#blockcomponent-类)。

```typescript
class BlockCustomComponentInstance extends BlockComponent {
    private constructor();
    readonly customComponentParameters: CustomComponentParameters;
}
```

#### 属性

- <ReadOnly/> customComponentParameters: [CustomComponentParameters](#customcomponentparameters-类)，该自定义组件的 JSON 参数。

### CustomComponentParameters 类

<Version type="script" add="2.0.0"/>

包含自定义组件的 JSON 参数。

```typescript
class CustomComponentParameters {
    private constructor();
    readonly params: unknown;
}
```

#### 属性

- <ReadOnly/> params: unknown，包含自定义组件定义参数的 JSON 对象。

---

## 事件

### BlockEvent 类

<Version type="script" add="1.3.0"/>

包含影响特定方块的事件信息。

```typescript
class BlockEvent {
    private constructor();
    readonly block: Block;
    readonly dimension: Dimension;
}
```

#### 属性

- <ReadOnly/> block: [Block](../../server/block/main#block-类)，事件发生时位于该位置世界中的方块。
- <ReadOnly/> dimension: [Dimension](../../server/dimension/main#dimension-类)，包含作为该事件主体的方块的维度。

### BlockComponentBlockBreakEvent 类

<Version type="script" add="2.4.0"/>

包含特定方块被破坏的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentBlockBreakEvent extends BlockEvent {
    private constructor();
    readonly blockDestructionSource?: Block;
    readonly brokenBlockPermutation: BlockPermutation;
    readonly entitySource?: Entity;
}
```

#### 属性

- <ReadOnly/> <Optional/> blockDestructionSource: [Block](../../server/block/main#block-类)，导致破坏的方块。
- <ReadOnly/> brokenBlockPermutation: [BlockPermutation](../../server/block/main#blockpermutation-类)，该方块被破坏前的置换信息。
- <ReadOnly/> <Optional/> entitySource: [Entity](../../server/entity_and_player/entity#entity-类)，导致破坏的实体。

### BlockComponentBlockStateChangeEvent 类

<Version type="script" add="2.8.0"/>

包含方块置换从先前置换改变的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentBlockStateChangeEvent extends BlockEvent {
    private constructor();
    readonly previousPermutation: BlockPermutation;
}
```

#### 属性

- <ReadOnly/> previousPermutation: [BlockPermutation](../../server/block/main#blockpermutation-类)，先前的方块置换。

### BlockComponentEntityEvent 类

<Version type="script" add="2.6.0"/>

包含实体向世界中的方块发送事件的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentEntityEvent extends BlockEvent {
    private constructor();
    readonly blockPermutation: BlockPermutation;
    readonly entitySource: Entity;
    readonly name: string;
}
```

#### 属性

- <ReadOnly/> blockPermutation: [BlockPermutation](../../server/block/main#blockpermutation-类)，接收事件的方块的置换信息。
- <ReadOnly/> entitySource: [Entity](../../server/entity_and_player/entity#entity-类)，发送事件的实体。
- <ReadOnly/> name: string，实体触发的事件名称。

### BlockComponentEntityFallOnEvent 类

<Version type="script" add="1.12.0"/>

包含实体落到特定方块的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentEntityFallOnEvent extends BlockEvent {
    private constructor();
    readonly entity?: Entity;
    readonly fallDistance: number;
}
```

#### 属性

- <ReadOnly/> <Optional/> entity: [Entity](../../server/entity_and_player/entity#entity-类)，落到方块上的实体。
- <ReadOnly/> fallDistance: number，实体落到该方块上的距离。

### BlockComponentOnPlaceEvent 类

<Version type="script" add="1.12.0"/>

包含特定方块被放置的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentOnPlaceEvent extends BlockEvent {
    private constructor();
    readonly previousBlock: BlockPermutation;
}
```

#### 属性

- <ReadOnly/> previousBlock: [BlockPermutation](../../server/block/main#blockpermutation-类)，该位置被替换的先前方块。

### BlockComponentPlayerBreakEvent 类

<Version type="script" add="2.0.0"/>

包含方块被玩家破坏的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentPlayerBreakEvent extends BlockEvent {
    private constructor();
    readonly brokenBlockPermutation: BlockPermutation;
    readonly player?: Player;
}
```

#### 属性

- <ReadOnly/> brokenBlockPermutation: [BlockPermutation](../../server/block/main#blockpermutation-类)，该方块被破坏前的置换信息。
- <ReadOnly/> <Optional/> player: [Player](../../server/entity_and_player/player#player-类)，破坏该方块的玩家。

### BlockComponentPlayerInteractEvent 类

<Version type="script" add="1.12.0"/>

包含方块被交互的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentPlayerInteractEvent extends BlockEvent {
    private constructor();
    readonly face: Direction;
    readonly faceLocation?: Vector3;
    readonly player?: Player;
}
```

#### 属性

- <ReadOnly/> face: [Direction](../../server/general#direction-枚举)，被交互的方块面。
- <ReadOnly/> <Optional/> faceLocation: [Vector3](../../server/general#vector3-接口)，玩家交互的位置，相对方块西北下角。
- <ReadOnly/> <Optional/> player: [Player](../../server/entity_and_player/player#player-类)，与该方块交互的玩家。

### BlockComponentPlayerPlaceBeforeEvent 类

<Version type="script" add="1.12.0"/>

包含玩家放置方块前事件的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentPlayerPlaceBeforeEvent extends BlockEvent {
    private constructor();
    cancel: boolean;
    readonly face: Direction;
    permutationToPlace: BlockPermutation;
    readonly player?: Player;
}
```

#### 属性

- cancel: boolean，设为`true`则取消方块放置事件。
- <ReadOnly/> face: [Direction](../../server/general#direction-枚举)，放置所在的方块面。
- permutationToPlace: [BlockPermutation](../../server/block/main#blockpermutation-类)，若事件未取消将放置的方块置换。
- <ReadOnly/> <Optional/> player: [Player](../../server/entity_and_player/player#player-类)，放置该方块的玩家。

### BlockComponentRandomTickEvent 类

<Version type="script" add="1.12.0"/>

包含方块随机刻的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentRandomTickEvent extends BlockEvent {
    private constructor();
}
```

### BlockComponentRedstoneUpdateEvent 类

<Version type="script" add="2.5.0"/>

包含方块红石更新事件的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentRedstoneUpdateEvent extends BlockEvent {
    private constructor();
    readonly powerLevel: number;
    readonly previousPowerLevel: number;
    readonly firstUpdate: boolean;
}
```

#### 属性

- <ReadOnly/> powerLevel: number，通过该方块的红石信号强度。
- <Version type="script" add="2.6.0" inline/> <ReadOnly/> previousPowerLevel: number，上一刻通过该方块的红石信号强度。
- <Version type="script" experimental="测试版API" inline/> <ReadOnly/> firstUpdate: boolean，是否为首次更新。

### BlockComponentStepOffEvent 类

<Version type="script" add="1.12.0"/>

包含实体离开特定方块的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentStepOffEvent extends BlockEvent {
    private constructor();
    readonly entity?: Entity;
}
```

#### 属性

- <ReadOnly/> <Optional/> entity: [Entity](../../server/entity_and_player/entity#entity-类)，离开方块的实体。

### BlockComponentStepOnEvent 类

<Version type="script" add="1.12.0"/>

包含实体踏上特定方块的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentStepOnEvent extends BlockEvent {
    private constructor();
    readonly entity?: Entity;
}
```

#### 属性

- <ReadOnly/> <Optional/> entity: [Entity](../../server/entity_and_player/entity#entity-类)，踏上方块的实体。

### BlockComponentTickEvent 类

<Version type="script" add="1.12.0"/>

包含方块刻的信息。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentTickEvent extends BlockEvent {
    private constructor();
}
```

### BlockComponentNamedTickEvent 类

<Version type="script" experimental="测试版API"/>

方块组件命名刻事件，在计划命名的刻触发。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentNamedTickEvent extends BlockEvent {
    private constructor();
    readonly name: string;
    isMine(): boolean;
}
```

#### 属性

- <ReadOnly/> name: string，命名刻事件的名称。

#### isMine 方法

```typescript
isMine(): boolean
```

**返回值**：boolean，若该命名刻事件由本包计划则为`true`。

### ScheduledNamedTick 接口

<Version type="script" experimental="测试版API"/>

已计划的命名刻。

```typescript
interface ScheduledNamedTick {
    eventName: string;
    tickDelay: number;
}
```

#### 属性

- eventName: string，命名刻事件的名称。
- tickDelay: number，计划触发的刻延迟。

### BlockComponentNeighborChangedAfterEvent 类

<Version type="script" experimental="测试版API"/>

方块组件邻居改变后事件，记录相邻方块的变化。

继承自[BlockEvent](#blockevent-类)。

```typescript
class BlockComponentNeighborChangedAfterEvent extends BlockEvent {
    private constructor();
    getChanges(): NeighborChange[];
}
```

#### getChanges 方法

```typescript
getChanges(): NeighborChange[]
```

**返回值**：[NeighborChange](#neighborchange-接口)[]，每个发生变化方向的相邻方块变化条目组成的数组。

### NeighborChange 接口

<Version type="script" experimental="测试版API"/>

相邻方块的变化信息。

```typescript
interface NeighborChange {
    blockPermutation: BlockPermutation;
    direction: Direction;
    previousPermutation: BlockPermutation;
}
```

#### 属性

- blockPermutation: [BlockPermutation](../../server/block/main#blockpermutation-类)，相邻方块在该刻最后一次变化后的置换。
- direction: [Direction](../../server/general#direction-枚举)，从接收事件的方块到发生变化相邻方块的方向。
- previousPermutation: [BlockPermutation](../../server/block/main#blockpermutation-类)，相邻方块在该刻第一次变化前的置换。

---

## 错误

### BlockCustomComponentAlreadyRegisteredError 类

<Version type="script" add="1.12.0"/>

注册的方块自定义组件名称已被占用时抛出该错误。

继承自Error。

```typescript
class BlockCustomComponentAlreadyRegisteredError extends Error {
    private constructor();
}
```

### BlockCustomComponentReloadNewComponentError 类

<Version type="script" add="1.12.0"/>

重新加载时新增了方块自定义组件（只允许修改已有组件）时抛出该错误。

继承自Error。

```typescript
class BlockCustomComponentReloadNewComponentError extends Error {
    private constructor();
}
```

### BlockCustomComponentReloadNewEventError 类

<Version type="script" add="1.12.0"/>

重新加载时为已有方块自定义组件新增了事件时抛出该错误。

继承自Error。

```typescript
class BlockCustomComponentReloadNewEventError extends Error {
    private constructor();
}
```

### BlockCustomComponentReloadVersionError 类

<Version type="script" add="1.12.0"/>

重新加载时方块自定义组件的脚本版本发生变化时抛出该错误。

继承自Error。

```typescript
class BlockCustomComponentReloadVersionError extends Error {
    private constructor();
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
