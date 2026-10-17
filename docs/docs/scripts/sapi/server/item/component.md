---
sidebar_position: 2
---

# 物品组件

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录物品组件相关接口。

---

## 物品组件

### ItemComponent 类

<Version type="script" add="1.2.0"/>

所有物品组件的基类。可通过[ItemStack.getComponent](./main#getcomponent-方法)或[ContainerSlot.getItem](./container#getitem-方法-1)获取具体组件。

继承自[Component](../../server/general#component-类)。

```typescript
class ItemComponent extends Component {
    private constructor();
}
```

### ItemComponentTypes 枚举

<Version type="script" add="1.10.0"/>

物品脚本组件的类型标识符。

```typescript
enum ItemComponentTypes {
    BlockDynamicProperties = "minecraft:block_actor_dynamic_properties", // 方块动态属性组件
    Book = "minecraft:book", // 物品书组件
    Compostable = "minecraft:compostable", // 可堆肥组件
    Cooldown = "minecraft:cooldown", // 冷却组件
    Durability = "minecraft:durability", // 耐久组件
    Dyeable = "minecraft:dyeable", // 可染色组件
    Enchantable = "minecraft:enchantable", // 附魔组件
    Food = "minecraft:food", // 食物组件
    Inventory = "minecraft:inventory", // 物品栏组件
    Potion = "minecraft:potion", // 药水组件
    BlockEntityStorage = "minecraft:block_entity_storage", // 方块实体存储组件
}
```

---

## 物品冷却组件

### ItemCooldownComponent 类

<Version type="script" add="1.10.0"/>

物品的冷却组件，控制玩家使用物品后的冷却时间。

另见：数据驱动物品组件[`minecraft:cooldown`](/docs/docs/items/components#minecraftcooldown)。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemCooldownComponent extends ItemComponent {
    private constructor();
    readonly cooldownCategory: string;
    readonly cooldownTicks: number;
    static readonly componentId = 'minecraft:cooldown';
    getCooldownTicksRemaining(player: Player): number;
    isCooldownCategory(cooldownCategory: string): boolean;
    startCooldown(player: Player): void;
}
```

#### 属性

- <ReadOnly/> cooldownCategory: string，该物品所属的冷却类别。
- <ReadOnly/> cooldownTicks: number，该物品冷却所需的时长，以游戏刻为单位。

#### getCooldownTicksRemaining 方法

<RestrictedMode inline/>

返回指定玩家在该物品上的剩余冷却时长。

```typescript
getCooldownTicksRemaining(player: Player): number
```

- player: [Player](../../server/entity_and_player/player#player-类)，要查询的玩家。

**返回值**：number，剩余冷却时长，以游戏刻为单位。

#### isCooldownCategory 方法

<RestrictedMode inline/>

该物品是否属于指定冷却类别。

```typescript
isCooldownCategory(cooldownCategory: string): boolean
```

- cooldownCategory: string，要比较的冷却类别。

**返回值**：boolean，`true` 表示该物品属于该冷却类别。

#### startCooldown 方法

<RestrictedMode inline/>

为指定玩家开始该物品的冷却。

```typescript
startCooldown(player: Player): void
```

- player: [Player](../../server/entity_and_player/player#player-类)，要开始冷却的玩家。

---

## 物品耐久度组件

### ItemDurabilityComponent 类

<Version type="script" add="1.9.0"/>

物品的耐久组件，用于设置和修复物品耐久。

另见：数据驱动物品组件[`minecraft:durability`](/docs/docs/items/components#minecraftdurability)。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemDurabilityComponent extends ItemComponent {
    private constructor();
    damage: number;
    readonly maxDurability: number;
    unbreakable: boolean;
    static readonly componentId = 'minecraft:durability';
    getDamageChance(unbreakingEnchantmentLevel?: number): number;
    getDamageChanceRange(): minecraftcommon.NumberRange;
}
```

#### 属性

- <RestrictedMode inline/> damage: number，该物品当前的损耗值。
- <ReadOnly/> maxDurability: number，该物品在损坏前可承受的损耗值。
- <Version type="script" add="2.6.0" inline/> <RestrictedMode inline/> unbreakable: boolean，该物品是否不会损坏。设为`true`会暂时隐藏耐久条并停止损耗耐久。

#### getDamageChance 方法

<RestrictedMode inline/>

返回给定耐久附魔等级下，该物品每次使用时被损耗的最大概率。

```typescript
getDamageChance(unbreakingEnchantmentLevel?: number): number
```

- unbreakingEnchantmentLevel?: number，耐久附魔的等级，默认为 0。

**返回值**：number，该物品每次使用时被损耗的最大概率，范围从 0 到 1。

#### getDamageChanceRange 方法

<RestrictedMode inline/>

返回用于计算损耗概率的取值范围。

```typescript
getDamageChanceRange(): minecraftcommon.NumberRange
```

**返回值**：[minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，损耗概率的取值范围。

---

## 物品附魔组件

### ItemEnchantableComponent 类

<Version type="script" add="1.11.0"/>

物品的附魔组件，用于添加、移除和查询附魔。

另见：数据驱动物品组件[`minecraft:enchantable`](/docs/docs/items/components#minecraftenchantable)。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemEnchantableComponent extends ItemComponent {
    private constructor();
    readonly slots: EnchantmentSlot[];
    static readonly componentId = 'minecraft:enchantable';
    addEnchantment(enchantment: Enchantment): void;
    addEnchantments(enchantments: Enchantment[]): void;
    canAddEnchantment(enchantment: Enchantment): boolean;
    getEnchantment(enchantmentType: EnchantmentType | string): Enchantment | undefined;
    getEnchantments(): Enchantment[];
    hasEnchantment(enchantmentType: EnchantmentType | string): boolean;
    removeAllEnchantments(): void;
    removeEnchantment(enchantmentType: EnchantmentType | string): void;
}
```

#### 属性

- <ReadOnly/> slots: [EnchantmentSlot](../../server/item/enchantment#enchantmentslot-枚举)[]，该物品可用的附魔槽位。

#### addEnchantment 方法

<RestrictedMode inline/>

为该物品添加一个附魔。

```typescript
addEnchantment(enchantment: Enchantment): void
```

- enchantment: [Enchantment](../../server/item/enchantment#enchantment-接口)，要添加的附魔。

#### addEnchantments 方法

<RestrictedMode inline/>

为该物品批量添加附魔。

```typescript
addEnchantments(enchantments: Enchantment[]): void
```

- enchantments: [Enchantment](../../server/item/enchantment#enchantment-接口)[]，要添加的附魔数组。

#### canAddEnchantment 方法

该物品能否添加指定附魔。

```typescript
canAddEnchantment(enchantment: Enchantment): boolean
```

- enchantment: [Enchantment](../../server/item/enchantment#enchantment-接口)，要检查的附魔。

**返回值**：boolean，`true` 表示可以添加该附魔。

#### getEnchantment 方法

返回该物品上指定类型的附魔。

```typescript
getEnchantment(enchantmentType: EnchantmentType | string): Enchantment | undefined
```

- enchantmentType: [EnchantmentType](../../server/item/enchantment#enchantmenttype-类) | string，要获取的附魔类型。

**返回值**：[Enchantment](../../server/item/enchantment#enchantment-接口) | undefined，该附魔；该物品上没有此附魔时为`undefined`。

#### getEnchantments 方法

返回该物品上的全部附魔。

```typescript
getEnchantments(): Enchantment[]
```

**返回值**：[Enchantment](../../server/item/enchantment#enchantment-接口)[]，该物品上的附魔数组；没有附魔时为空数组。

#### hasEnchantment 方法

该物品是否具有指定类型的附魔。

```typescript
hasEnchantment(enchantmentType: EnchantmentType | string): boolean
```

- enchantmentType: [EnchantmentType](../../server/item/enchantment#enchantmenttype-类) | string，要检查的附魔类型。

**返回值**：boolean，`true` 表示该物品具有该类型的附魔。

#### removeAllEnchantments 方法

<RestrictedMode inline/>

移除该物品上的全部附魔。

```typescript
removeAllEnchantments(): void
```

#### removeEnchantment 方法

<RestrictedMode inline/>

移除该物品上指定类型的附魔。

```typescript
removeEnchantment(enchantmentType: EnchantmentType | string): void
```

- enchantmentType: [EnchantmentType](../../server/item/enchantment#enchantmenttype-类) | string，要移除的附魔类型。

---

## 物品食物组件

### ItemFoodComponent 类

<Version type="script" add="1.9.0"/>

物品的食物组件，描述该物品作为食物时的属性。

另见：数据驱动物品组件[`minecraft:food`](/docs/docs/items/components#minecraftfood)。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemFoodComponent extends ItemComponent {
    private constructor();
    readonly canAlwaysEat: boolean;
    readonly nutrition: number;
    readonly saturationModifier: number;
    readonly usingConvertsTo: string;
    static readonly componentId = 'minecraft:food';
}
```

#### 属性

- <ReadOnly/> canAlwaysEat: boolean，玩家是否始终可以食用该物品（即使不饿）。
- <ReadOnly/> nutrition: number，该食物被食用时为实体提供的营养值。
- <ReadOnly/> saturationModifier: number，食用时用于计算饱和度加成的系数（营养值 × 系数 × 2）。
- <ReadOnly/> usingConvertsTo: string，该物品被食用后转换成的物品标识符。

---

## 物品可堆肥组件

### ItemCompostableComponent 类

<Version type="script" add="1.17.0"/>

物品的可堆肥组件，描述将物品放入堆肥桶时的堆肥概率。

另见：数据驱动物品组件[`minecraft:compostable`](/docs/docs/items/components#minecraftcompostable)。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemCompostableComponent extends ItemComponent {
    private constructor();
    readonly compostingChance: number;
    static readonly componentId = 'minecraft:compostable';
}
```

#### 属性

- <ReadOnly/> compostingChance: number，该物品在堆肥桶中堆肥并产生一层堆肥的概率。

---

## 物品药水组件

### ItemPotionComponent 类

<Version type="script" add="2.4.0"/>

物品的药水组件，描述该药水物品对应的药水效果。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemPotionComponent extends ItemComponent {
    private constructor();
    readonly potionDeliveryType: PotionDeliveryType;
    readonly potionEffectType: PotionEffectType;
    static readonly componentId = 'minecraft:potion';
}
```

#### 属性

- <ReadOnly/> potionDeliveryType: [PotionDeliveryType](../../server/item/potion#potiondeliverytype-类)，该药水物品的使用方式，例如饮用、喷溅或滞留。
- <ReadOnly/> potionEffectType: [PotionEffectType](../../server/item/potion#potioneffecttype-类)，该药水物品对应的药水效果类型。

---

## 物品染色组件

### ItemDyeableComponent 类

<Version type="script" add="2.1.0"/>

物品的可染色组件，用于读取和设置物品的颜色。

另见：数据驱动物品组件[`minecraft:dyeable`](/docs/docs/items/components#minecraftdyeable)。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemDyeableComponent extends ItemComponent {
    private constructor();
    color?: RGB;
    readonly defaultColor?: RGB;
    static readonly componentId = 'minecraft:dyeable';
}
```

#### 属性

- <RestrictedMode inline/> <Optional/> color: [RGB](../../server/general#rgb-接口)，该物品当前的颜色。
- <ReadOnly/> <Optional/> defaultColor: [RGB](../../server/general#rgb-接口)，该物品的默认颜色。

---

## 物品储物组件

### ItemInventoryComponent 类

<Version type="script" add="2.3.0"/>

物品的物品栏组件，用于访问储物类物品（如潜影盒）内部的容器。

另见：数据驱动物品组件[`minecraft:storage_item`](/docs/docs/items/components#minecraftstorage_item)。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemInventoryComponent extends ItemComponent {
    private constructor();
    readonly container: Container;
    static readonly componentId = 'minecraft:inventory';
}
```

#### 属性

- <ReadOnly/> container: [Container](../../server/item/container#container-类)，该物品内部的容器。

---

## 物品方块动态属性组件

### ItemBlockDynamicPropertiesComponent 类

<Version type="script" add="2.10.0"/>

表示与方块关联的动态属性，仅可从方块实体获取，每个内容包最多存储 1 KB 数据。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemBlockDynamicPropertiesComponent extends ItemComponent {
    private constructor();
    static readonly componentId = 'minecraft:block_actor_dynamic_properties';
    get(key: string): boolean | number | string | Vector3 | undefined;
    set(key: string, value?: boolean | number | string | Vector3): void;
    totalByteCount(): number;
}
```

#### get 方法

返回指定键存储的动态属性值。

```typescript
get(key: string): boolean | number | string | Vector3 | undefined
```

- key: string，动态属性的键。

**返回值**：boolean | number | string | [Vector3](../../server/general#vector3-接口) | undefined，该键对应的动态属性值；未设置时为`undefined`。

#### set 方法

将指定键的动态属性设置为指定值。

```typescript
set(key: string, value?: boolean | number | string | Vector3): void
```

- key: string，动态属性的键。
- value?: boolean | number | string | [Vector3](../../server/general#vector3-接口)，要设置的值。若不传入，则移除该属性。

#### totalByteCount 方法

返回该方块动态属性存储的当前字节数，仅统计本内容包设置的属性。

```typescript
totalByteCount(): number
```

**返回值**：number，该方块动态属性存储占用的字节数。

---

## 物品方块实体存储组件

### ItemBlockEntityStorageComponent 类

<Version type="script" experimental="测试版API"/>

物品方块实体存储组件，可序列化并存储非玩家生物。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemBlockEntityStorageComponent extends ItemComponent {
    private constructor();
    static readonly componentId = 'minecraft:block_entity_storage';
    getEntities(): BlockEntityStorageInfo[];
    release(entityId: string, location: DimensionLocation): Entity;
    size(): number;
    store(entity: Entity): string;
    transfer(entityId: string, targetBlock: Block): void;
}
```

#### getEntities 方法

```typescript
getEntities(): BlockEntityStorageInfo[]
```

**返回值**：[BlockEntityStorageInfo](../../server/block/component#blockentitystorageinfo-类)[]，序列化实体的信息数组。

#### release 方法

<RestrictedMode inline/>

```typescript
release(entityId: string, location: DimensionLocation): Entity
```

- entityId: string，要释放实体的唯一 ID。
- location: [DimensionLocation](../../server/general#dimensionlocation-接口)，释放实体的维度与位置。

**返回值**：[Entity](../../server/entity_and_player/entity#entity-类)，释放并生成到世界中的实体。

#### size 方法

```typescript
size(): number
```

**返回值**：number，序列化实体的数量。

#### store 方法

<RestrictedMode inline/>

```typescript
store(entity: Entity): string
```

- entity: [Entity](../../server/entity_and_player/entity#entity-类)，要序列化存储的实体。

**返回值**：string，实体的唯一 ID。

#### transfer 方法

<RestrictedMode inline/>

```typescript
transfer(entityId: string, targetBlock: Block): void
```

- entityId: string，要转移实体的唯一 ID。
- targetBlock: [Block](../../server/block/main#block-类)，接收实体的目标方块。

---

## 物品书组件

### ItemBookComponent 类

<Version type="script" add="2.2.0"/>

物品的书组件，用于读写成书与书与笔的页面内容。

继承自[ItemComponent](#itemcomponent-类)。

```typescript
class ItemBookComponent extends ItemComponent {
    private constructor();
    readonly author?: string;
    readonly contents: (string | undefined)[];
    readonly isSigned: boolean;
    readonly pageCount: number;
    readonly rawContents: (RawMessage | undefined)[];
    readonly title?: string;
    static readonly componentId = 'minecraft:book';
    getPageContent(pageIndex: number): string | undefined;
    getRawPageContent(pageIndex: number): RawMessage | undefined;
    insertPage(pageIndex: number, content: (RawMessage | string)[] | RawMessage | string): void;
    removePage(pageIndex: number): void;
    setContents(contents: ((RawMessage | string)[] | RawMessage | string)[]): void;
    setPageContent(pageIndex: number, content: (RawMessage | string)[] | RawMessage | string): void;
    signBook(title: string, author: string): void;
}
```

#### 属性

- <ReadOnly/> <Optional/> author: string，若该书已签名，返回书的作者；否则为`undefined`。
- <ReadOnly/> contents: (string | undefined)[]，以字符串形式表示的各页内容；不是字符串格式的页为`undefined`。
- <ReadOnly/> isSigned: boolean，该书是否已签名。
- <ReadOnly/> pageCount: number，该书的页数。
- <ReadOnly/> rawContents: ([RawMessage](../../server/general#rawmessage-接口) | undefined)[]，以原始消息形式表示的各页内容；不是原始消息格式的页为`undefined`。
- <ReadOnly/> <Optional/> title: string，若该书已签名，返回书的标题；否则为`undefined`。

#### getPageContent 方法

返回指定页的字符串内容。

```typescript
getPageContent(pageIndex: number): string | undefined
```

- pageIndex: number，页的索引，从 0 开始。

**返回值**：string | undefined，该页的字符串内容；索引无效或该页不是字符串格式时为`undefined`。

#### getRawPageContent 方法

返回指定页的原始消息内容。

```typescript
getRawPageContent(pageIndex: number): RawMessage | undefined
```

- pageIndex: number，页的索引，从 0 开始。

**返回值**：[RawMessage](../../server/general#rawmessage-接口) | undefined，该页的原始消息内容；索引无效或该页不是原始消息格式时为`undefined`。

#### insertPage 方法

<RestrictedMode inline/>

在指定位置插入一页。索引超过当前页数时会创建空白页。

```typescript
insertPage(pageIndex: number, content: (RawMessage | string)[] | RawMessage | string): void
```

- pageIndex: number，插入位置的索引，从 0 开始。
- content: ([RawMessage](../../server/general#rawmessage-接口) | string)[] | [RawMessage](../../server/general#rawmessage-接口) | string，该页的内容，可以是字符串、原始消息或它们的数组（每个元素代表一行）。

#### removePage 方法

<RestrictedMode inline/>

移除指定位置的页，其后的页面会前移填补空缺。

```typescript
removePage(pageIndex: number): void
```

- pageIndex: number，要移除的页的索引，从 0 开始。

#### setContents 方法

<RestrictedMode inline/>

设置该书各页的内容，原有的页面会被清除。

```typescript
setContents(contents: ((RawMessage | string)[] | RawMessage | string)[]): void
```

- contents: (([RawMessage](../../server/general#rawmessage-接口) | string)[] | [RawMessage](../../server/general#rawmessage-接口) | string)[]，各页的内容，数组中的每个元素代表一页。

#### setPageContent 方法

<RestrictedMode inline/>

设置或创建指定页的内容。

```typescript
setPageContent(pageIndex: number, content: (RawMessage | string)[] | RawMessage | string): void
```

- pageIndex: number，页的索引，从 0 开始。
- content: ([RawMessage](../../server/general#rawmessage-接口) | string)[] | [RawMessage](../../server/general#rawmessage-接口) | string，该页的内容，可以是字符串、原始消息或它们的数组（每个元素代表一行）。

#### signBook 方法

<RestrictedMode inline/>

为书签名并设置标题与作者。签名后玩家无法再直接编辑。

```typescript
signBook(title: string, author: string): void
```

- title: string，书的标题，最多 16 字符。
- author: string，书的作者名称。

### BookError 类

<Version type="script" add="2.2.0"/>

操作物品书出错时抛出的错误的基类。

继承自Error。

```typescript
class BookError extends Error {
    private constructor();
    readonly reason: BookErrorReason;
}
```

#### 属性

- <ReadOnly/> reason: [BookErrorReason](#bookerrorreason-枚举)，错误的原因。

### BookPageContentError 类

<Version type="script" add="2.2.0"/>

物品书的页面内容不合法时抛出该错误。

继承自Error。

```typescript
class BookPageContentError extends Error {
    private constructor();
    readonly pageIndex: number;
    readonly reason: BookErrorReason;
}
```

#### 属性

- <ReadOnly/> pageIndex: number，请求修改的页的索引。
- <ReadOnly/> reason: [BookErrorReason](#bookerrorreason-枚举)，错误的原因。

### BookErrorReason 枚举

<Version type="script" add="2.2.0"/>

物品书出错的原因。

```typescript
enum BookErrorReason {
    ExceedsMaxPageLength = "ExceedsMaxPageLength", // 页内容超过单页 256 字符的上限
    ExceedsMaxPages = "ExceedsMaxPages", // 该页无法创建，因为会超过 50 页的上限
    ExceedsTitleLength = "ExceedsTitleLength", // 签名时的标题超过 16 字符的上限
}
```

---

## 组件映射

### ItemComponentTypeMap 类型

<Version type="script" add="1.18.0"/>

物品组件标识符与组件类之间的映射，键为组件标识符，值为对应的组件类。

```typescript
type ItemComponentTypeMap = {
    block_actor_dynamic_properties: ItemBlockDynamicPropertiesComponent;
    block_entity_storage: ItemBlockEntityStorageComponent;
    book: ItemBookComponent;
    compostable: ItemCompostableComponent;
    cooldown: ItemCooldownComponent;
    durability: ItemDurabilityComponent;
    dyeable: ItemDyeableComponent;
    enchantable: ItemEnchantableComponent;
    food: ItemFoodComponent;
    inventory: ItemInventoryComponent;
    'minecraft:block_actor_dynamic_properties': ItemBlockDynamicPropertiesComponent;
    'minecraft:block_entity_storage': ItemBlockEntityStorageComponent;
    'minecraft:book': ItemBookComponent;
    'minecraft:compostable': ItemCompostableComponent;
    'minecraft:cooldown': ItemCooldownComponent;
    'minecraft:durability': ItemDurabilityComponent;
    'minecraft:dyeable': ItemDyeableComponent;
    'minecraft:enchantable': ItemEnchantableComponent;
    'minecraft:food': ItemFoodComponent;
    'minecraft:inventory': ItemInventoryComponent;
    'minecraft:potion': ItemPotionComponent;
    potion: ItemPotionComponent;
}
```

### ItemComponentReturnType 类型

<Version type="script" add="1.18.0"/>

按物品组件标识符取得对应组件类的类型工具；未知标识符会回退为[ItemCustomComponentInstance](../system/custom_component#itemcustomcomponentinstance-类)。

```typescript
type ItemComponentReturnType<T extends string> = T extends keyof ItemComponentTypeMap
    ? ItemComponentTypeMap[T]
    : ItemCustomComponentInstance
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
