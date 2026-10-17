---
sidebar_position: 4
---

# 容器

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录容器相关接口。

---

## 容器

### Container 类

<Version type="script" add="1.2.0"/>

表示一个容器，例如箱子、熔炉或实体的物品栏。

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

- <Version type="script" add="2.3.0" inline/> <ReadOnly/> <Optional/> containerRules: [ContainerRules](#containerrules-接口)，该容器受到的限制规则。定义后，会使规则失效的容器操作将抛出错误。
- <ReadOnly/> emptySlotsCount: number，该容器中空槽位的数量。
- <Version type="script" add="1.4.0" inline/> <ReadOnly/> isValid: boolean，该容器（及其关联的方块或实体）是否仍然可用。
- <ReadOnly/> size: number，该容器的槽位数量。例如单个箱子为 27，大箱子为 54。
- <Version type="script" add="2.3.0" inline/> <ReadOnly/> weight: number，该容器中所有物品的总重量。

#### addItem 方法

<RestrictedMode inline/>

将物品加入该容器，优先放入第一个可用的槽位，并可与已有的同类物品合并。

```typescript
addItem(itemStack: ItemStack): ItemStack | undefined
```

- itemStack: [ItemStack](./main#itemstack-类)，要加入的物品堆叠。

**返回值**：[ItemStack](./main#itemstack-类) | undefined，未能放入的物品堆叠；全部放入时为`undefined`。

#### clearAll 方法

<RestrictedMode inline/>

清空该容器中的所有物品。

```typescript
clearAll(): void
```

#### contains 方法

<Version type="script" add="2.1.0" inline/>

该容器中是否存在指定物品。

```typescript
contains(itemStack: ItemStack): boolean
```

- itemStack: [ItemStack](./main#itemstack-类)，要查找的物品堆叠。

**返回值**：boolean，`true` 表示该容器中存在该物品。

#### find 方法

<Version type="script" add="2.1.0" inline/>

查找指定物品第一次出现的槽位索引。

```typescript
find(itemStack: ItemStack): number | undefined
```

- itemStack: [ItemStack](./main#itemstack-类)，要查找的物品堆叠。

**返回值**：number | undefined，该物品第一次出现的槽位索引；未找到时为`undefined`。

#### findLast 方法

<Version type="script" add="2.1.0" inline/>

查找指定物品最后一次出现的槽位索引。

```typescript
findLast(itemStack: ItemStack): number | undefined
```

- itemStack: [ItemStack](./main#itemstack-类)，要查找的物品堆叠。

**返回值**：number | undefined，该物品最后一次出现的槽位索引；未找到时为`undefined`。

#### firstEmptySlot 方法

<Version type="script" add="2.1.0" inline/>

查找该容器中第一个空槽位的索引。

```typescript
firstEmptySlot(): number | undefined
```

**返回值**：number | undefined，第一个空槽位的索引；没有空槽位时为`undefined`。

#### firstItem 方法

<Version type="script" add="2.1.0" inline/>

查找该容器中第一个有物品的槽位的索引。

```typescript
firstItem(): number | undefined
```

**返回值**：number | undefined，第一个有物品的槽位的索引；容器为空时为`undefined`。

#### getItem 方法

返回指定槽位中物品的副本。该操作不会改变或清空槽位。

```typescript
getItem(slot: number): ItemStack | undefined
```

- slot: number，槽位索引，从 0 开始。

**返回值**：[ItemStack](./main#itemstack-类) | undefined，该槽位中物品的副本；槽位为空时为`undefined`。

#### getSlot 方法

<Version type="script" add="1.9.0" inline/>

返回指定槽位的引用对象，对它的修改会直接作用于容器。

```typescript
getSlot(slot: number): ContainerSlot
```

- slot: number，槽位索引，从 0 开始。

**返回值**：[ContainerSlot](#containerslot-类)，该槽位的引用对象。

#### moveItem 方法

<RestrictedMode inline/>

将物品从一个槽位移到另一个槽位，可以跨越容器。

```typescript
moveItem(fromSlot: number, toSlot: number, toContainer: Container): void
```

- fromSlot: number，物品所在的槽位索引。
- toSlot: number，要移入的槽位索引。
- toContainer: [Container](#container-类)，目标容器。可以是该容器自身。

#### setItem 方法

<RestrictedMode inline/>

将物品放入指定槽位。

```typescript
setItem(slot: number, itemStack?: ItemStack): void
```

- slot: number，要设置的槽位索引。
- itemStack?: [ItemStack](./main#itemstack-类)，要放入的物品堆叠。若不传入则清空该槽位。

#### swapItems 方法

<RestrictedMode inline/>

交换两个槽位中的物品，可以跨越容器。

```typescript
swapItems(slot: number, otherSlot: number, otherContainer: Container): void
```

- slot: number，参与交换的第一个槽位索引。
- otherSlot: number，参与交换的第二个槽位索引。
- otherContainer: [Container](#container-类)，第二个槽位所属的容器。可以是该容器自身。

#### transferItem 方法

<RestrictedMode inline/>

将物品从一个槽位移动到另一个容器，或移动到本容器的第一个可用槽位。

```typescript
transferItem(fromSlot: number, toContainer: Container): ItemStack | undefined
```

- fromSlot: number，物品所在的槽位索引。
- toContainer: [Container](#container-类)，目标容器。可以是该容器自身。

**返回值**：[ItemStack](./main#itemstack-类) | undefined，未能移入目标容器的物品堆叠；全部移入时为`undefined`。

---

## 容器槽位

### ContainerSlot 类

<Version type="script" add="1.9.0"/>

表示容器中的一个槽位。与`ItemStack`不同，对槽位的修改会直接作用于容器内的物品。

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
    readonly "type": ItemType;
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

- <RestrictedMode inline/> amount: number，该槽位中物品的数量。有效范围从 1 到 255，超出物品最大堆叠数时会被截断到上限。
- <ReadOnly/> isStackable: boolean，该槽位中的物品是否可堆叠。
- <ReadOnly/> isValid: boolean，该槽位是否仍然有效。容器存在、已加载且槽位索引合法时有效。
- <RestrictedMode inline/> keepOnDeath: boolean，该槽位中的物品在玩家死亡时是否保留。
- <RestrictedMode inline/> lockMode: [ItemLockMode](./main#itemlockmode-枚举)，该槽位中物品的锁定模式，默认为`ItemLockMode.none`。
- <ReadOnly/> maxAmount: number，该槽位中物品的最大堆叠数，因物品种类而异。
- <RestrictedMode inline/> <Optional/> nameTag: string，该槽位中物品的自定义名称。
- <ReadOnly/> "type": [ItemType](./main#itemtype-类)，该槽位中物品的物品种类。
- <ReadOnly/> typeId: string，该槽位中物品种类的标识符。

#### clearDynamicProperties 方法

清除该槽位中物品上设置的全部动态属性。

```typescript
clearDynamicProperties(): void
```

#### getCanDestroy 方法

返回该槽位中的物品在冒险模式下可以破坏的方块类型列表。

```typescript
getCanDestroy(): string[]
```

**返回值**：string[]，方块类型标识符数组；未设置时为空数组。

#### getCanPlaceOn 方法

返回该槽位中的物品在冒险模式下可以放置于其上的方块类型列表。

```typescript
getCanPlaceOn(): string[]
```

**返回值**：string[]，方块类型标识符数组；未设置时为空数组。

#### getDynamicProperty 方法

返回该槽位中物品的动态属性值。

```typescript
getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined
```

- identifier: string，动态属性的标识符。

**返回值**：boolean | number | string | [Vector3](../general#vector3-接口) | undefined，动态属性的值；该属性尚未设置时为`undefined`。

#### getDynamicPropertyIds 方法

返回该槽位中物品已使用的动态属性标识符。

```typescript
getDynamicPropertyIds(): string[]
```

**返回值**：string[]，已设置的动态属性标识符数组。

#### getDynamicPropertyTotalByteCount 方法

返回该槽位中物品全部动态属性的总字节数，包含键与值。

```typescript
getDynamicPropertyTotalByteCount(): number
```

**返回值**：number，全部动态属性占用的总字节数。

#### getItem 方法

返回该槽位中物品的副本。

```typescript
getItem(): ItemStack | undefined
```

**返回值**：[ItemStack](./main#itemstack-类) | undefined，该槽位中物品的副本；槽位为空时为`undefined`。

#### getLore 方法

返回该槽位中物品的备注（物品说明）各行文本。

```typescript
getLore(): string[]
```

**返回值**：string[]，备注的各行文本；没有备注时为空数组。

#### getRawLore 方法

<Version type="script" add="2.2.0" inline/>

返回该槽位中物品的备注（物品说明）各行原始消息。

```typescript
getRawLore(): RawMessage[]
```

**返回值**：[RawMessage](../general#rawmessage-接口)[]，备注的各行原始消息；没有备注时为空数组。

#### getTags 方法

返回该槽位中物品的所有标签。

```typescript
getTags(): string[]
```

**返回值**：string[]，标签数组；槽位为空或没有标签时为空数组。

#### hasItem 方法

该槽位中是否有物品。

```typescript
hasItem(): boolean
```

**返回值**：boolean，`true` 表示该槽位中有物品。

#### hasTag 方法

该槽位中的物品是否具有指定标签。

```typescript
hasTag(tag: string): boolean
```

- tag: string，要检查的标签。

**返回值**：boolean，`true` 表示该槽位中的物品具有指定标签。

#### isStackableWith 方法

该槽位中的物品能否与指定物品堆叠合并。

```typescript
isStackableWith(itemStack: ItemStack): boolean
```

- itemStack: [ItemStack](./main#itemstack-类)，要比较的物品堆叠。

**返回值**：boolean，`true` 表示两个物品堆叠可以合并。

#### setCanDestroy 方法

<RestrictedMode inline/>

设置该槽位中的物品在冒险模式下可以破坏的方块类型列表。

```typescript
setCanDestroy(blockIdentifiers?: string[]): void
```

- blockIdentifiers?: string[]，可以破坏的方块类型标识符列表。若不传入则清除该列表。

#### setCanPlaceOn 方法

<RestrictedMode inline/>

设置该槽位中的物品在冒险模式下可以放置于其上的方块类型列表。

```typescript
setCanPlaceOn(blockIdentifiers?: string[]): void
```

- blockIdentifiers?: string[]，可以放置于其上的方块类型标识符列表。若不传入则清除该列表。

#### setDynamicProperties 方法

<Version type="script" add="2.3.0" inline/>

将该槽位中物品的多个动态属性设置为指定的值。

```typescript
setDynamicProperties(
    values: Record<string, boolean | number | string | Vector3 | undefined>,
): void
```

- values: Record&lt;string, boolean | number | string | [Vector3](../general#vector3-接口) | undefined&gt;，代表动态属性的对象。若其中某个属性的值为`undefined`，则移除该属性。

#### setDynamicProperty 方法

将该槽位中物品的指定动态属性设置为指定值。

```typescript
setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void
```

- identifier: string，动态属性的标识符。
- value?: boolean | number | string | [Vector3](../general#vector3-接口)，要设置的值。若不传入，则移除该属性。

#### setItem 方法

<RestrictedMode inline/>

将该槽位设置为指定的物品堆叠，替换其中的原有物品。

```typescript
setItem(itemStack?: ItemStack): void
```

- itemStack?: [ItemStack](./main#itemstack-类)，要设置的物品堆叠。若不传入则清空该槽位。

#### setLore 方法

<RestrictedMode inline/>

设置该槽位中物品的备注（物品说明）。

```typescript
setLore(loreList?: (RawMessage | string)[]): void
```

- loreList?: ([RawMessage](../general#rawmessage-接口) | string)[]，物品的备注信息，数组中的每个元素代表一行。一行最多 50 字符，最多 20 行。若不传入则清除备注。

---

## 容器规则

### ContainerRules 接口

<Version type="script" add="2.3.0"/>

定义容器对可放入物品的限制。违反规则的操作会抛出错误。

```typescript
interface ContainerRules {
    allowedItems: string[];
    allowNestedStorageItems: boolean;
    bannedItems: string[];
    weightLimit?: number;
}
```

#### 属性

- allowedItems: string[]，容器中唯一允许出现的物品标识符。为空数组时允许放入任何物品。
- allowNestedStorageItems: boolean，是否允许将其他储物类物品（如潜影盒）放入该容器。
- bannedItems: string[]，不允许放入该容器的物品标识符。
- <Optional/> weightLimit: number，该容器允许的最大总重量；不设置则没有重量限制。

### ContainerRulesError 类

<Version type="script" add="2.0.0"/>

违反`ContainerRules`的容器操作抛出该错误。

```typescript
class ContainerRulesError extends Error {
    private constructor();
    readonly reason: ContainerRulesErrorReason;
}
```

#### 属性

- <Version type="script" add="2.3.0" inline/> <ReadOnly/> reason: [ContainerRulesErrorReason](#containerruleserrorreason-枚举)，抛出该错误的具体原因。

### ContainerRulesErrorReason 枚举

<Version type="script" add="2.3.0"/>

`ContainerRulesError`被抛出的原因。

```typescript
enum ContainerRulesErrorReason {
    BannedItem = "BannedItem", // 尝试放入在 bannedItems 中定义的物品
    NestedStorageItem = "NestedStorageItem", // 尝试放入带储物特征的物品，但容器禁止嵌套储物
    NotAllowedItem = "NotAllowedItem", // 尝试放入不在非空 allowedItems 中的物品
    OverWeightLimit = "OverWeightLimit", // 放入后容器总重量会超过 weightLimit
    ZeroWeightItem = "ZeroWeightItem", // 尝试放入重量为 0 的物品，但容器有重量限制
}
```

---

## 错误

### InvalidContainerError 类

<Version type="script" add="2.1.0"/>

访问已失效容器的内容时抛出该错误。

```typescript
class InvalidContainerError extends Error {
    private constructor();
}
```

### InvalidContainerSlotError 类

<Version type="script" add="1.9.0"/>

访问已失效容器槽位的内容时抛出该错误。

```typescript
class InvalidContainerSlotError extends Error {
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
