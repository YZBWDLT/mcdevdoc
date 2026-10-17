---
sidebar_position: 4
---

# 自定义物品组件

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import EarlyExecution from "/src/components/highlight/earlyExecution"

本文主要记录自定义物品组件相关接口。

---

## 注册

### ItemComponentRegistry 类

<Version type="script" add="1.12.0"/>

自定义物品组件的注册表。可通过系统启动前事件获取。

```typescript
class ItemComponentRegistry {
    private constructor();
    registerCustomComponent(name: string, itemCustomComponent: ItemCustomComponent): void;
}
```

#### registerCustomComponent 方法

<EarlyExecution/>

注册一个可在物品 JSON 配置中使用的自定义组件。

```typescript
registerCustomComponent(name: string, itemCustomComponent: ItemCustomComponent): void
```

- name: string，自定义组件的名称，需与物品 JSON 中引用的组件名一致。
- itemCustomComponent: [ItemCustomComponent](#itemcustomcomponent-接口)，实现自定义组件回调的对象。

---

## 自定义组件

### ItemCustomComponent 接口

<Version type="script" add="1.12.0"/>

定义自定义物品组件的接口。实现其中的回调后，通过[ItemComponentRegistry.registerCustomComponent](#registercustomcomponent-方法)注册，即可在物品 JSON 中引用该组件。

```typescript
interface ItemCustomComponent {
    onBeforeDurabilityDamage?: (arg0: ItemComponentBeforeDurabilityDamageEvent, arg1: CustomComponentParameters) => void;
    onCompleteUse?: (arg0: ItemComponentCompleteUseEvent, arg1: CustomComponentParameters) => void;
    onConsume?: (arg0: ItemComponentConsumeEvent, arg1: CustomComponentParameters) => void;
    onHitEntity?: (arg0: ItemComponentHitEntityEvent, arg1: CustomComponentParameters) => void;
    onMineBlock?: (arg0: ItemComponentMineBlockEvent, arg1: CustomComponentParameters) => void;
    onUse?: (arg0: ItemComponentUseEvent, arg1: CustomComponentParameters) => void;
    onUseOn?: (arg0: ItemComponentUseOnEvent, arg1: CustomComponentParameters) => void;
}
```

#### 属性

- <Optional/> onBeforeDurabilityDamage: (arg0: [ItemComponentBeforeDurabilityDamageEvent](#itemcomponentbeforedurabilitydamageevent-类), arg1: [CustomComponentParameters](../../server/system/custom_block_component#customcomponentparameters-类)) =&gt; void，当带有该组件的物品命中实体、即将损耗耐久时调用。
- <Optional/> onCompleteUse: (arg0: [ItemComponentCompleteUseEvent](#itemcomponentcompleteuseevent-类), arg1: [CustomComponentParameters](../../server/system/custom_block_component#customcomponentparameters-类)) =&gt; void，当带有该组件的物品完成使用（蓄力结束）时调用。
- <Optional/> onConsume: (arg0: [ItemComponentConsumeEvent](#itemcomponentconsumeevent-类), arg1: [CustomComponentParameters](../../server/system/custom_block_component#customcomponentparameters-类)) =&gt; void，当带有该组件的物品被实体食用时调用。
- <Optional/> onHitEntity: (arg0: [ItemComponentHitEntityEvent](#itemcomponenthitentityevent-类), arg1: [CustomComponentParameters](../../server/system/custom_block_component#customcomponentparameters-类)) =&gt; void，当带有该组件的物品击中其他实体时调用。
- <Optional/> onMineBlock: (arg0: [ItemComponentMineBlockEvent](#itemcomponentmineblockevent-类), arg1: [CustomComponentParameters](../../server/system/custom_block_component#customcomponentparameters-类)) =&gt; void，当带有该组件的物品用于挖掘方块时调用。
- <Optional/> onUse: (arg0: [ItemComponentUseEvent](#itemcomponentuseevent-类), arg1: [CustomComponentParameters](../../server/system/custom_block_component#customcomponentparameters-类)) =&gt; void，当带有该组件的物品被玩家使用时调用。
- <Optional/> onUseOn: (arg0: [ItemComponentUseOnEvent](#itemcomponentuseonevent-类), arg1: [CustomComponentParameters](../../server/system/custom_block_component#customcomponentparameters-类)) =&gt; void，当带有该组件的物品被对方块使用时调用。

### ItemCustomComponentInstance 类

<Version type="script" add="2.0.0"/>

物品上的自定义组件实例。

继承自[ItemComponent](../../server/item/component#itemcomponent-类)。

```typescript
class ItemCustomComponentInstance extends ItemComponent {
    private constructor();
    readonly customComponentParameters: CustomComponentParameters;
}
```

#### 属性

- <ReadOnly/> customComponentParameters: [CustomComponentParameters](../../server/system/custom_block_component#customcomponentparameters-类)，该自定义组件的参数。

---

## 使用物品事件

### ItemUseOnEvent 类

<Version type="script" add="1.12.0"/>

物品对方块使用的事件，记录被使用的方块、面、位置与使用的物品堆叠。

```typescript
class ItemUseOnEvent {
    private constructor();
    readonly block: Block;
    readonly blockFace: Direction;
    readonly faceLocation: Vector3;
    readonly itemStack: ItemStack;
}
```

#### 属性

- <ReadOnly/> block: [Block](../../server/block/main#block-类)，该事件作用的方块。
- <ReadOnly/> blockFace: [Direction](../../server/general#direction-枚举)，物品使用所在的方块面。
- <ReadOnly/> faceLocation: [Vector3](../../server/general#vector3-接口)，相对方块西北下角的位置，物品使用在该位置。
- <ReadOnly/> itemStack: [ItemStack](../../server/item/main#itemstack-类)，对方块使用的物品堆叠。

### ItemComponentUseEvent 类

<Version type="script" add="1.12.0"/>

物品被使用时的事件信息。

```typescript
class ItemComponentUseEvent {
    private constructor();
    readonly itemStack?: ItemStack;
    readonly source: Player;
}
```

#### 属性

- <ReadOnly/> <Optional/> itemStack: [ItemStack](../../server/item/main#itemstack-类)，使用该物品时的物品堆叠。
- <ReadOnly/> source: [Player](../../server/entity_and_player/player#player-类)，使用该物品的玩家。

### ItemComponentUseOnEvent 类

<Version type="script" add="1.12.0"/>

通过组件对方块使用物品时的事件信息。

继承自[ItemUseOnEvent](#itemuseonevent-类)。

```typescript
class ItemComponentUseOnEvent extends ItemUseOnEvent {
    private constructor();
    readonly source: Entity;
    readonly usedOnBlockPermutation: BlockPermutation;
}
```

#### 属性

- <ReadOnly/> source: [Entity](../../server/entity_and_player/entity#entity-类)，对方块使用该物品的实体。
- <ReadOnly/> usedOnBlockPermutation: [BlockPermutation](../../server/block/main#blockpermutation-类)，物品被使用于其上的方块置换。

---

## 食用物品事件

### ItemCompleteUseEvent 类

<Version type="script" add="1.12.0"/>

物品完成使用的事件，记录已完成充能的物品堆叠与触发该事件的玩家。

```typescript
class ItemCompleteUseEvent {
    private constructor();
    readonly itemStack: ItemStack;
    readonly source: Player;
}
```

#### 属性

- <ReadOnly/> itemStack: [ItemStack](../../server/item/main#itemstack-类)，已完成充能的物品堆叠。
- <ReadOnly/> source: [Player](../../server/entity_and_player/player#player-类)，触发该物品事件的源实体（玩家）。

### ItemComponentConsumeEvent 类

<Version type="script" add="1.12.0"/>

食物物品被食用时的事件信息。

```typescript
class ItemComponentConsumeEvent {
    private constructor();
    readonly itemStack: ItemStack;
    readonly source: Entity;
}
```

#### 属性

- <ReadOnly/> itemStack: [ItemStack](../../server/item/main#itemstack-类)，被食用的物品堆叠。
- <ReadOnly/> source: [Entity](../../server/entity_and_player/entity#entity-类)，食用该物品的实体。

### ItemComponentCompleteUseEvent 类

<Version type="script" add="1.12.0"/>

通过组件触发的可蓄力物品完成蓄力时的事件信息。

继承自[ItemCompleteUseEvent](#itemcompleteuseevent-类)。

```typescript
class ItemComponentCompleteUseEvent extends ItemCompleteUseEvent {
    private constructor();
}
```

---

## 攻击与挖掘事件

### ItemComponentHitEntityEvent 类

<Version type="script" add="1.12.0"/>

物品用于击中实体时的事件信息。

```typescript
class ItemComponentHitEntityEvent {
    private constructor();
    readonly attackingEntity: Entity;
    readonly hadEffect: boolean;
    readonly hitEntity: Entity;
    readonly itemStack?: ItemStack;
}
```

#### 属性

- <ReadOnly/> attackingEntity: [Entity](../../server/entity_and_player/entity#entity-类)，发起攻击的实体。
- <ReadOnly/> hadEffect: boolean，该次攻击是否命中或产生了效果。
- <ReadOnly/> hitEntity: [Entity](../../server/entity_and_player/entity#entity-类)，被击中的实体。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../../server/item/main#itemstack-类)，用于击中实体的物品堆叠。

### ItemComponentMineBlockEvent 类

<Version type="script" add="1.12.0"/>

使用物品挖掘方块时的事件信息。

```typescript
class ItemComponentMineBlockEvent {
    private constructor();
    readonly block: Block;
    readonly itemStack?: ItemStack;
    readonly minedBlockPermutation: BlockPermutation;
    readonly source: Entity;
}
```

#### 属性

- <ReadOnly/> block: [Block](../../server/block/main#block-类)，受该事件影响的方块。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](../../server/item/main#itemstack-类)，用于挖掘方块的物品堆叠。
- <ReadOnly/> minedBlockPermutation: [BlockPermutation](../../server/block/main#blockpermutation-类)，被挖掘的方块置换。
- <ReadOnly/> source: [Entity](../../server/entity_and_player/entity#entity-类)，挖掘该方块的实体。

### ItemComponentBeforeDurabilityDamageEvent 类

<Version type="script" add="1.12.0"/>

物品命中实体、即将损耗耐久前的事件信息。

```typescript
class ItemComponentBeforeDurabilityDamageEvent {
    private constructor();
    readonly attackingEntity: Entity;
    durabilityDamage: number;
    readonly hitEntity: Entity;
    itemStack?: ItemStack;
}
```

#### 属性

- <ReadOnly/> attackingEntity: [Entity](../../server/entity_and_player/entity#entity-类)，发起攻击的实体。
- durabilityDamage: number，该事件发生时物品耐久将损耗的值。
- <ReadOnly/> hitEntity: [Entity](../../server/entity_and_player/entity#entity-类)，被击中的实体。
- <Optional/> itemStack: [ItemStack](../../server/item/main#itemstack-类)，用于击中实体的物品堆叠。

---

## 错误

### CustomComponentInvalidRegistryError 类

<Version type="script" add="1.12.0"/>

在系统启动事件之外注册自定义组件时抛出该错误。

继承自Error。

```typescript
class CustomComponentInvalidRegistryError extends Error {
    private constructor();
}
```

### CustomComponentNameError 类

<Version type="script" add="1.12.0"/>

自定义组件的名称不合法时抛出该错误，可通过`reason`判断具体原因。

继承自Error。

```typescript
class CustomComponentNameError extends Error {
    private constructor();
    readonly reason: CustomComponentNameErrorReason;
}
```

#### 属性

- <ReadOnly/> reason: [CustomComponentNameErrorReason](#customcomponentnameerrorreason-枚举)，该错误的产生原因。

### CustomComponentNameErrorReason 枚举

<Version type="script" add="1.12.0"/>

自定义组件名称不合法的原因。

```typescript
enum CustomComponentNameErrorReason {
    NoNamespace = 1, // 名称缺少命名空间
    DisallowedNamespace = 2, // 使用了不允许的命名空间
}
```

### ItemCustomComponentAlreadyRegisteredError 类

<Version type="script" add="1.12.0"/>

注册的自定义物品组件名称已被占用时抛出该错误。

继承自Error。

```typescript
class ItemCustomComponentAlreadyRegisteredError extends Error {
    private constructor();
}
```

### ItemCustomComponentReloadNewComponentError 类

<Version type="script" add="1.12.0"/>

重新加载时新增了自定义物品组件（只允许修改已有组件）时抛出该错误。

继承自Error。

```typescript
class ItemCustomComponentReloadNewComponentError extends Error {
    private constructor();
}
```

### ItemCustomComponentReloadNewEventError 类

<Version type="script" add="1.12.0"/>

重新加载时为已有自定义物品组件新增了事件时抛出该错误。

继承自Error。

```typescript
class ItemCustomComponentReloadNewEventError extends Error {
    private constructor();
}
```

### ItemCustomComponentReloadVersionError 类

<Version type="script" add="1.12.0"/>

重新加载时自定义物品组件的脚本版本发生变化时抛出该错误。

继承自Error。

```typescript
class ItemCustomComponentReloadVersionError extends Error {
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
