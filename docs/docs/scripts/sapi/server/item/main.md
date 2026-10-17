---
sidebar_position: 1
---

# 物品堆叠

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Static from "/src/components/highlight/static"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录物品堆叠相关接口。

---

## 物品堆叠

### ItemStack 类

<Version type="script" add="1.2.0"/>

表示一叠物品堆叠。可通过构造函数创建，也可从容器槽位或实体物品栏中获取。

```typescript
class ItemStack {
    constructor(itemType: ItemType | string, amount?: number);
    amount: number;
    readonly isStackable: boolean;
    keepOnDeath: boolean;
    readonly localizationKey: string;
    lockMode: ItemLockMode;
    readonly maxAmount: number;
    nameTag?: string;
    readonly "type": ItemType;
    readonly typeId: string;
    readonly weight: number;
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

- <RestrictedMode inline/> amount: number，该物品堆叠中的物品数量。有效范围从 1 到 255，超出物品最大堆叠数时会被截断到上限。
- <ReadOnly/> isStackable: boolean，该物品是否可堆叠。最大堆叠数大于 1 且不含自定义数据时才算可堆叠。
- <RestrictedMode inline/> keepOnDeath: boolean，该物品在玩家死亡时是否保留。
- <Version type="script" add="2.1.0" inline/> <ReadOnly/> localizationKey: string，物品名称在语言文件（`.lang`）中使用的本地化键名。
- <RestrictedMode inline/> lockMode: [ItemLockMode](#itemlockmode-枚举)，物品的锁定模式，默认为`ItemLockMode.none`。
- <ReadOnly/> maxAmount: number，该物品的最大堆叠数，因物品种类而异（例如火把为 64，鸡蛋为 16）。
- <RestrictedMode inline/> <Optional/> nameTag: string，物品的自定义名称，悬停时显示。设为空字符串或`undefined`可移除名称。
- <ReadOnly/> "type": [ItemType](#itemtype-类)，该物品堆叠的物品种类。
- <ReadOnly/> typeId: string，物品种类的标识符，例如`minecraft:apple`。未指定命名空间时默认为`minecraft:`。
- <Version type="script" add="2.3.0" inline/> <ReadOnly/> weight: number，该物品堆叠中所有物品的总重量，包含物品容器中物品的重量。

#### clearDynamicProperties 方法

<Version type="script" add="1.9.0" inline/>

清除该物品堆叠上设置的全部动态属性。

```typescript
clearDynamicProperties(): void
```

#### clone 方法

<Version type="script" add="1.6.0" inline/>

创建该物品堆叠的精确副本，包括其自定义数据与属性。

```typescript
clone(): ItemStack
```

**返回值**：[ItemStack](#itemstack-类)，该物品堆叠的副本。

#### getCanDestroy 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

返回该物品在冒险模式下可以破坏的方块类型列表。

```typescript
getCanDestroy(): string[]
```

**返回值**：string[]，方块类型标识符数组；未设置时为空数组。

#### getCanPlaceOn 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

返回该物品在冒险模式下可以放置于其上的方块类型列表。

```typescript
getCanPlaceOn(): string[]
```

**返回值**：string[]，方块类型标识符数组；未设置时为空数组。

#### getComponent 方法

返回该物品堆叠上指定的脚本组件。

```typescript
getComponent<T extends string>(componentId: T): ItemComponentReturnType<T> | undefined
```

- componentId: T，脚本组件的标识符，例如`minecraft:durability`。

**返回值**：[ItemComponentReturnType](../../server/item/component#itemcomponentreturntype-类型)&lt;T&gt; | undefined，该物品堆叠上指定的脚本组件；该组件不存在时为`undefined`。

#### getComponents 方法

返回该物品堆叠上的全部脚本组件。

```typescript
getComponents(): ItemComponent[]
```

**返回值**：[ItemComponent](../../server/item/component#itemcomponent-类)[]，该物品堆叠上的脚本组件数组。

#### getDynamicProperty 方法

<Version type="script" add="1.9.0" inline/>

返回指定动态属性的值。

```typescript
getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined
```

- identifier: string，动态属性的标识符。

**返回值**：boolean | number | string | [Vector3](../../server/general#vector3-接口) | undefined，动态属性的值；该属性尚未设置时为`undefined`。

#### getDynamicPropertyIds 方法

<Version type="script" add="1.9.0" inline/>

返回该物品堆叠上已使用的动态属性标识符。

```typescript
getDynamicPropertyIds(): string[]
```

**返回值**：string[]，已设置的动态属性标识符数组。

#### getDynamicPropertyTotalByteCount 方法

<Version type="script" add="1.9.0" inline/>

返回该物品堆叠当前存储的全部动态属性总字节数，包含键与值。

```typescript
getDynamicPropertyTotalByteCount(): number
```

**返回值**：number，全部动态属性占用的总字节数。

#### getLore 方法

<Version type="script" add="1.4.0" inline/>

返回该物品的备注（物品说明）各行文本。

```typescript
getLore(): string[]
```

**返回值**：string[]，备注的各行文本；没有备注时为空数组。

#### getRawLore 方法

<Version type="script" add="2.2.0" inline/>

返回该物品的备注（物品说明）各行原始消息。

```typescript
getRawLore(): RawMessage[]
```

**返回值**：[RawMessage](../../server/general#rawmessage-接口)[]，备注的各行原始消息；没有备注时为空数组。

#### getTags 方法

<Version type="script" add="1.6.0" inline/>

返回该物品堆叠关联的所有标签。

```typescript
getTags(): string[]
```

**返回值**：string[]，标签数组；没有任何标签时为空数组。

#### hasComponent 方法

该物品堆叠上是否存在指定的脚本组件。

```typescript
hasComponent(componentId: string): boolean
```

- componentId: string，脚本组件的标识符。

**返回值**：boolean，`true` 表示该物品堆叠上存在指定的脚本组件。

#### hasTag 方法

<Version type="script" add="1.6.0" inline/>

该物品堆叠是否具有指定标签。

```typescript
hasTag(tag: string): boolean
```

- tag: string，要检查的标签。

**返回值**：boolean，`true` 表示该物品堆叠具有指定标签。

#### isStackableWith 方法

该物品堆叠能否与指定物品堆叠合并。取决于物品种类、自定义数据与属性。

```typescript
isStackableWith(itemStack: ItemStack): boolean
```

- itemStack: [ItemStack](#itemstack-类)，要比较的物品堆叠。

**返回值**：boolean，`true` 表示两个物品堆叠可以合并。

#### matches 方法

<Version type="script" add="1.11.0" inline/>

测试该物品是否匹配指定条件。

```typescript
matches(itemName: string, states?: Record<string, boolean | number | string>): boolean
```

- itemName: string，要比较的物品种类名称，例如`minecraft:apple`。
- states?: Record&lt;string, boolean | number | string&gt;，要比较的方块状态。

**返回值**：boolean，`true` 表示该物品匹配指定条件。

#### setCanDestroy 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

设置该物品在冒险模式下可以破坏的方块类型列表。

```typescript
setCanDestroy(blockIdentifiers?: string[]): void
```

- blockIdentifiers?: string[]，可以破坏的方块类型标识符列表。若不传入则清除该列表。

#### setCanPlaceOn 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

设置该物品在冒险模式下可以放置于其上的方块类型列表。仅对方块物品生效。

```typescript
setCanPlaceOn(blockIdentifiers?: string[]): void
```

- blockIdentifiers?: string[]，可以放置于其上的方块类型标识符列表。若不传入则清除该列表。

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

<Version type="script" add="1.9.0" inline/>

将指定的动态属性设置为指定值。仅对不可堆叠的物品有效。

```typescript
setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void
```

- identifier: string，动态属性的标识符。
- value?: boolean | number | string | [Vector3](../../server/general#vector3-接口)，要设置的值。若不传入，则移除该属性。

#### setLore 方法

<Version type="script" add="1.4.0" inline/> <RestrictedMode inline/>

设置该物品的备注（物品说明）。

```typescript
setLore(loreList?: (RawMessage | string)[]): void
```

- loreList?: ([RawMessage](../../server/general#rawmessage-接口) | string)[]，物品的备注信息，数组中的每个元素代表一行。一行最多 50 字符，最多 20 行。若不传入则清除备注。

---

## 物品种类

### ItemType 类

<Version type="script" add="1.2.0"/>

表示物品种类，例如羊毛。

```typescript
class ItemType {
    private constructor();
    readonly id: string;
    readonly localizationKey: string;
}
```

#### 属性

- <ReadOnly/> id: string，物品种类的标识符，例如`minecraft:apple`。
- <Version type="script" add="2.6.0" inline/> <ReadOnly/> localizationKey: string，物品种类名称在语言文件（`.lang`）中使用的本地化键名。

### ItemTypes 类

<Version type="script" add="1.12.0"/>

物品类型的目录，用于按标识符获取或列出所有物品类型。

```typescript
class ItemTypes {
    private constructor();
    static get(itemId: string): ItemType | undefined;
    static getAll(): ItemType[];
}
```

#### get 方法

<Static/>

获取指定标识符的物品类型。

```typescript
static get(itemId: string): ItemType | undefined
```

- itemId: string，物品类型标识符。

**返回值**：[ItemType](#itemtype-类) | undefined，指定标识符的物品类型；若不存在则为`undefined`。

#### getAll 方法

<Static/>

获取所有可用的物品类型。

```typescript
static getAll(): ItemType[]
```

**返回值**：[ItemType](#itemtype-类)[]，所有可用的物品类型组成的数组。

### ItemLockMode 枚举

<Version type="script" add="1.2.0"/>

描述物品在容器中如何被移动。

```typescript
enum ItemLockMode {
    inventory = "inventory", // 该物品不能被丢弃，也不能用于合成
    none = "none", // 该物品没有容器限制
    slot = "slot", // 该物品不能离开所在槽位，不能被丢弃，也不能用于合成
}
```

---

## 错误

### InvalidItemStackError 类

<Version type="script" add="2.2.0"/>

访问已失效物品堆叠的组件时抛出该错误。物品堆叠在对应物品被移除后即失效。

继承自Error。

```typescript
class InvalidItemStackError extends Error {
    private constructor();
    readonly itemType: ItemType;
}
```

#### 属性

- <ReadOnly/> itemType: [ItemType](#itemtype-类)，已失效的物品堆叠的物品种类。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
