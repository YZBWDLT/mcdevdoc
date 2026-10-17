---
sidebar_position: 3
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

- <Optional/> onBeforeDurabilityDamage: (arg0: [ItemComponentBeforeDurabilityDamageEvent](#itemcomponentbeforedurabilitydamageevent-类), arg1: CustomComponentParameters) =&gt; void，当带有该组件的物品命中实体、即将损耗耐久时调用。
- <Optional/> onCompleteUse: (arg0: [ItemComponentCompleteUseEvent](#itemcomponentcompleteuseevent-类), arg1: CustomComponentParameters) =&gt; void，当带有该组件的物品完成使用（蓄力结束）时调用。
- <Optional/> onConsume: (arg0: [ItemComponentConsumeEvent](#itemcomponentconsumeevent-类), arg1: CustomComponentParameters) =&gt; void，当带有该组件的物品被实体食用时调用。
- <Optional/> onHitEntity: (arg0: [ItemComponentHitEntityEvent](#itemcomponenthitentityevent-类), arg1: CustomComponentParameters) =&gt; void，当带有该组件的物品击中其他实体时调用。
- <Optional/> onMineBlock: (arg0: [ItemComponentMineBlockEvent](#itemcomponentmineblockevent-类), arg1: CustomComponentParameters) =&gt; void，当带有该组件的物品用于挖掘方块时调用。
- <Optional/> onUse: (arg0: [ItemComponentUseEvent](#itemcomponentuseevent-类), arg1: CustomComponentParameters) =&gt; void，当带有该组件的物品被玩家使用时调用。
- <Optional/> onUseOn: (arg0: [ItemComponentUseOnEvent](#itemcomponentuseonevent-类), arg1: CustomComponentParameters) =&gt; void，当带有该组件的物品被对方块使用时调用。

### ItemCustomComponentInstance 类

<Version type="script" add="2.0.0"/>

物品上的自定义组件实例。

```typescript
class ItemCustomComponentInstance extends ItemComponent {
    private constructor();
    readonly customComponentParameters: CustomComponentParameters;
}
```

#### 属性

- <ReadOnly/> customComponentParameters: CustomComponentParameters，该自定义组件的参数。

---

## 使用物品事件

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

- <ReadOnly/> <Optional/> itemStack: [ItemStack](./main#itemstack-类)，使用该物品时的物品堆叠。
- <ReadOnly/> source: [Player](../entity_and_player/player#player-类)，使用该物品的玩家。

### ItemComponentUseOnEvent 类

<Version type="script" add="1.12.0"/>

通过组件对方块使用物品时的事件信息。继承自`ItemUseOnEvent`类，本文不重复其成员。

```typescript
class ItemComponentUseOnEvent extends ItemUseOnEvent {
    private constructor();
    readonly source: Entity;
    readonly usedOnBlockPermutation: BlockPermutation;
}
```

#### 属性

- <ReadOnly/> source: [Entity](../entity_and_player/entity#entity-类)，对方块使用该物品的实体。
- <ReadOnly/> usedOnBlockPermutation: [BlockPermutation](../block/main#blockpermutation-类)，物品被使用于其上的方块置换。

---

## 食用物品事件

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

- <ReadOnly/> itemStack: [ItemStack](./main#itemstack-类)，被食用的物品堆叠。
- <ReadOnly/> source: [Entity](../entity_and_player/entity#entity-类)，食用该物品的实体。

### ItemComponentCompleteUseEvent 类

<Version type="script" add="1.12.0"/>

通过组件触发的可蓄力物品完成蓄力时的事件信息。继承自`ItemCompleteUseEvent`类，本文不重复其成员。

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

- <ReadOnly/> attackingEntity: [Entity](../entity_and_player/entity#entity-类)，发起攻击的实体。
- <ReadOnly/> hadEffect: boolean，该次攻击是否命中或产生了效果。
- <ReadOnly/> hitEntity: [Entity](../entity_and_player/entity#entity-类)，被击中的实体。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](./main#itemstack-类)，用于击中实体的物品堆叠。

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

- <ReadOnly/> block: [Block](../block/main#block-类)，受该事件影响的方块。
- <ReadOnly/> <Optional/> itemStack: [ItemStack](./main#itemstack-类)，用于挖掘方块的物品堆叠。
- <ReadOnly/> minedBlockPermutation: [BlockPermutation](../block/main#blockpermutation-类)，被挖掘的方块置换。
- <ReadOnly/> source: [Entity](../entity_and_player/entity#entity-类)，挖掘该方块的实体。

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

- <ReadOnly/> attackingEntity: [Entity](../entity_and_player/entity#entity-类)，发起攻击的实体。
- durabilityDamage: number，该事件发生时物品耐久将损耗的值。
- <ReadOnly/> hitEntity: [Entity](../entity_and_player/entity#entity-类)，被击中的实体。
- <Optional/> itemStack: [ItemStack](./main#itemstack-类)，用于击中实体的物品堆叠。

---

## 错误

### ItemCustomComponentAlreadyRegisteredError 类

<Version type="script" add="1.12.0"/>

注册的自定义物品组件名称已被占用时抛出该错误。

```typescript
class ItemCustomComponentAlreadyRegisteredError extends Error {
    private constructor();
}
```

### ItemCustomComponentReloadNewComponentError 类

<Version type="script" add="1.12.0"/>

重新加载时新增了自定义物品组件（只允许修改已有组件）时抛出该错误。

```typescript
class ItemCustomComponentReloadNewComponentError extends Error {
    private constructor();
}
```

### ItemCustomComponentReloadNewEventError 类

<Version type="script" add="1.12.0"/>

重新加载时为已有自定义物品组件新增了事件时抛出该错误。

```typescript
class ItemCustomComponentReloadNewEventError extends Error {
    private constructor();
}
```

### ItemCustomComponentReloadVersionError 类

<Version type="script" add="1.12.0"/>

重新加载时自定义物品组件的脚本版本发生变化时抛出该错误。

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
