---
sidebar_position: 1
---

# 物品堆叠

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"

本文主要记录物品堆叠相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 物品堆叠

### ItemStack 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.ItemStack.html"/>

```typescript
class ItemStack {
    amount: number;
    readonly isStackable: boolean;
    keepOnDeath: boolean;
    readonly localizationKey: string;
    lockMode: ItemLockMode;
    readonly maxAmount: number;
    nameTag?: string;
    readonly 'type': ItemType;
    readonly typeId: string;
    readonly weight: number;
    constructor(itemType: ItemType | string, amount?: number);
    clearDynamicProperties(): void;
    clone(): ItemStack;
    getCanDestroy(): string[];
    getCanPlaceOn(): string[];
    getComponent<T extends string>(componentId: T): ItemComponentReturnType<T> | undefined;
    getComponents(): ItemComponent[];
    getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined;
    getDynamicPropertyIds(): string[];
    getDynamicPropertyTotalByteCount(): number;
    getLore(): string[];
    getRawLore(): RawMessage[];
    getTags(): string[];
    hasComponent(componentId: string): boolean;
    hasTag(tag: string): boolean;
    isStackableWith(itemStack: ItemStack): boolean;
    matches(itemName: string, states?: Record<string, boolean | number | string>): boolean;
    setCanDestroy(blockIdentifiers?: string[]): void;
    setCanPlaceOn(blockIdentifiers?: string[]): void;
    setDynamicProperties(values: Record<string, boolean | number | string | Vector3 | undefined>): void;
    setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void;
    setLore(loreList?: (RawMessage | string)[]): void;
}
```

#### 属性

- amount: number;
- <ReadOnly/> isStackable: boolean;
- keepOnDeath: boolean;
- <ReadOnly/> <Version add="2.1.0" inline/> localizationKey: string，物品在语言文件中的键名。
- lockMode: ItemLockMode;
- <ReadOnly/> maxAmount: number;
- nameTag?: string;
- <ReadOnly/> type: ItemType;
- <ReadOnly/> typeId: string;
- <ReadOnly/> weight: number;

#### constructor 方法

```typescript
constructor(itemType: ItemType | string, amount?: number);
```

#### clearDynamicProperties 方法

```typescript
clearDynamicProperties(): void;
```

#### clone 方法

```typescript
clone(): ItemStack;
```

#### getCanDestroy 方法

```typescript
getCanDestroy(): string[];
```

#### getCanPlaceOn 方法

```typescript
getCanPlaceOn(): string[];
```

#### getComponent 方法

```typescript
getComponent<T extends string>(componentId: T): ItemComponentReturnType<T> | undefined;
```

#### getComponents 方法

```typescript
getComponents(): ItemComponent[];
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

#### hasComponent 方法

```typescript
hasComponent(componentId: string): boolean;
```

#### hasTag 方法

```typescript
hasTag(tag: string): boolean;
```

#### isStackableWith 方法

```typescript
isStackableWith(itemStack: ItemStack): boolean;
```

#### matches 方法

```typescript
matches(itemName: string, states?: Record<string, boolean | number | string>): boolean;
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

#### setLore 方法

为特定槽位设置物品备注。

```typescript
setLore(loreList?: (string | RawMessage)[]): void
```

- <Optional/> loreList: (string | [RawMessage](/docs/docs/scripts/sapi/docs/general#rawmessage-接口))[]，物品的备注信息。数组中的每个元素都代表一行。一行最多 50 字符，最多允许 20 行。若不指定则清除物品备注。
  - <Version add="2.2.0" inline/> 需注意：[RawMessage](/docs/docs/scripts/sapi/docs/general#rawmessage-接口) 类型仅限 2.2.0+ 版本下可用。

---

## 错误

### InvalidItemStackError 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.InvalidItemStackError.html"/>

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
