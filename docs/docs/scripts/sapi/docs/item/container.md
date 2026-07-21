---
sidebar_position: 3
---

# 容器

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import Optional from "/src/components/highlight/optional"
import ReadOnly from "/src/components/highlight/readOnly"

本文主要记录容器相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 容器

### Container 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.Container.html"/>

```typescript
class Container {
    private constructor();
    readonly containerRules?: ContainerRules;
    readonly emptySlotsCount: number;
    readonly isValid: boolean;
    readonly size: number;
    readonly weight: number;
    addItem(itemStack: ItemStack): ItemStack | undefined;
    clearAll(): void;
    contains(itemStack: ItemStack): boolean;
    find(itemStack: ItemStack): number | undefined;
    findLast(itemStack: ItemStack): number | undefined;
    firstEmptySlot(): number | undefined;
    firstItem(): number | undefined;
    getItem(slot: number): ItemStack | undefined;
    getSlot(slot: number): ContainerSlot;
    moveItem(fromSlot: number, toSlot: number, toContainer: Container): void;
    setItem(slot: number, itemStack?: ItemStack): void;
    swapItems(slot: number, otherSlot: number, otherContainer: Container): void;
    transferItem(fromSlot: number, toContainer: Container): ItemStack | undefined;
}
```

#### 属性

- <ReadOnly/> <Optional/> <Version add="2.3.0" inline/> containerRules: [ContainerRules](#containerrules-接口)
- <ReadOnly/> emptySlotsCount: number;
- <ReadOnly/> isValid: boolean;
- <ReadOnly/> size: number;
- <ReadOnly/> <Version add="2.3.0" inline/> weight: number;

#### addItem 方法

```typescript
addItem(itemStack: ItemStack): ItemStack | undefined;
```

#### clearAll 方法

```typescript
clearAll(): void;
```

#### contains 方法

<Version add="2.1.0"/>

```typescript
contains(itemStack: ItemStack): boolean;
```

#### find 方法

<Version add="2.1.0"/>

```typescript
find(itemStack: ItemStack): number | undefined;
```

#### findLast 方法

<Version add="2.1.0"/>

```typescript
findLast(itemStack: ItemStack): number | undefined;
```

#### firstEmptySlot 方法

<Version add="2.1.0"/>

```typescript
firstEmptySlot(): number | undefined;
```

#### firstItem 方法

<Version add="2.1.0"/>

```typescript
firstItem(): number | undefined;
```

#### getItem 方法

```typescript
getItem(slot: number): ItemStack | undefined;
```

#### getSlot 方法

```typescript
getSlot(slot: number): ContainerSlot;
```

#### moveItem 方法

```typescript
moveItem(fromSlot: number, toSlot: number, toContainer: Container): void;
```

#### setItem 方法

```typescript
setItem(slot: number, itemStack?: ItemStack): void;
```

#### swapItems 方法

```typescript
swapItems(slot: number, otherSlot: number, otherContainer: Container): void;
```

#### transferItem 方法

```typescript
transferItem(fromSlot: number, toContainer: Container): ItemStack | undefined;
```

### ContainerRules 接口

<Version add="2.3.0"/>

```typescript
interface ContainerRules {
    allowedItems: string[];
    allowNestedStorageItems: boolean;
    bannedItems: string[];
    weightLimit?: number;
}
```

- allowedItems: string[];
- allowNestedStorageItems: boolean;
- bannedItems: string[];
- <Optional/> weightLimit: number;

### ContainerRulesError 类

Error thrown if [ContainerRules](#containerrules-接口) are broken on container operations.

```typescript
class ContainerRulesError extends Error {
    private constructor();
    readonly reason: ContainerRulesErrorReason;
}
```

#### 属性

- <ReadOnly/> reason: ContainerRulesErrorReason, the specific reason the error was thrown.

### ContainerRulesErrorReason 枚举

Reasons that the [ContainerRulesError](#containerruleserror-类) was thrown.

```typescript
enum ContainerRulesErrorReason {
    BannedItem = 'BannedItem',
    NestedStorageItem = 'NestedStorageItem',
    NotAllowedItem = 'NotAllowedItem',
    OverWeightLimit = 'OverWeightLimit',
    ZeroWeightItem = 'ZeroWeightItem',
}
```

#### 枚举成员

- BannedItem: "BannedItem"，尝试添加[ContainerRules](#containerrules-接口).bannedItems内的物品时抛出错误。
- NestedStorageItem: "NestedStorageItem"，thrown when trying to add item with `Storage Item` component to container with [ContainerRules](#containerrules-接口).allowNestedStorageItems set to false.
- NotAllowedItem: "NotAllowedItem"，尝试添加未定义在非空的[ContainerRules](#containerrules-接口).allowedItems内的物品时抛出错误。
- OverWeightLimit: "OverWeightLimit"，thrown when trying to add item that pushed the containers weight over the [ContainerRules](#containerrules-接口).weightLimit.
- ZeroWeightItem: "ZeroWeightItem"，thrown when trying to add item with zero weight defined by the `Storage Weight Modifier` component to container with a defined [ContainerRules](#containerrules-接口).weightLimit.

---

## 容器槽位

### ContainerSlot 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.ContainerSlot.html"/>

```typescript
class ContainerSlot {
    private constructor();
    amount: number;
    readonly isStackable: boolean;
    readonly isValid: boolean;
    keepOnDeath: boolean;
    lockMode: ItemLockMode;
    readonly maxAmount: number;
    nameTag?: string;
    readonly 'type': ItemType;
    readonly typeId: string;
    clearDynamicProperties(): void;
    getCanDestroy(): string[];
    getCanPlaceOn(): string[];
    getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined;
    getDynamicPropertyIds(): string[];
    getDynamicPropertyTotalByteCount(): number;
    getItem(): ItemStack | undefined;
    getLore(): string[];
    getRawLore(): RawMessage[];
    getTags(): string[];
    hasItem(): boolean;
    hasTag(tag: string): boolean;
    isStackableWith(itemStack: ItemStack): boolean;
    setCanDestroy(blockIdentifiers?: string[]): void;
    setCanPlaceOn(blockIdentifiers?: string[]): void;
    setDynamicProperties(values: Record<string, boolean | number | string | Vector3 | undefined>): void;
    setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void;
    setItem(itemStack?: ItemStack): void;
    setLore(loreList?: (RawMessage | string)[]): void;
}
```

#### 属性

- amount: number;
- <ReadOnly/> isStackable: boolean;
- <ReadOnly/> isValid: boolean;
- keepOnDeath: boolean;
- lockMode: ItemLockMode;
- <ReadOnly/> maxAmount: number;
- nameTag?: string;
- <ReadOnly/> 'type': ItemType;
- <ReadOnly/> typeId: string;

#### clearDynamicProperties 方法

```typescript
clearDynamicProperties(): void;
```

#### getCanDestroy 方法

```typescript
getCanDestroy(): string[];
```

#### getCanPlaceOn 方法

```typescript
getCanPlaceOn(): string[];
```

#### getDynamicProperty 方法

```typescript
getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined;
```

#### getDynamicPropertyIds 方法

```typescript
getDynamicPropertyIds(): string[];
```

#### getDynamicPropertyTotalByteCount 方法

```typescript
getDynamicPropertyTotalByteCount(): number;
```

#### getItem 方法

```typescript
getItem(): ItemStack | undefined;
```

#### getLore 方法

```typescript
getLore(): string[];
```

#### getRawLore 方法

<Version add="2.2.0"/>

```typescript
getRawLore(): RawMessage[];
```

#### getTags 方法

```typescript
getTags(): string[];
```

#### hasItem 方法

```typescript
hasItem(): boolean;
```

#### hasTag 方法

```typescript
hasTag(tag: string): boolean;
```

#### isStackableWith 方法

```typescript
isStackableWith(itemStack: ItemStack): boolean;
```

#### setCanDestroy 方法

```typescript
setCanDestroy(blockIdentifiers?: string[]): void;
```

#### setCanPlaceOn 方法

```typescript
setCanPlaceOn(blockIdentifiers?: string[]): void;
```

#### setDynamicProperties 方法

<Version add="2.3.0"/>

将多个动态属性设置为特定的值。

```typescript
setDynamicProperties(values: Record<string, boolean | number | string | Vector3 | undefined>): void;
```

**参数**：

- values: Record\<string, boolean | number | string | [Vector3](../general#vector3-接口) | undefined\>，代表动态属性的对象。若未设定数据则移除该属性。

#### setDynamicProperty 方法

```typescript
setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void;
```

#### setItem 方法

```typescript
setItem(itemStack?: ItemStack): void;
```

#### setLore 方法

为特定槽位设置物品备注。

```typescript
setLore(loreList?: (RawMessage | string)[]): void;
```

- <Optional/> loreList: (string | [RawMessage](/docs/docs/scripts/sapi/docs/general#rawmessage-接口))[]，物品的备注信息。数组中的每个元素都代表一行。一行最多 50 字符，最多允许 20 行。若不指定则清除物品备注。
  - <Version add="2.2.0" inline/> 需注意：[RawMessage](/docs/docs/scripts/sapi/docs/general#rawmessage-接口) 类型仅限 2.2.0+ 版本下可用。

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
