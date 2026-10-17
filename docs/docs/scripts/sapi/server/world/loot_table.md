---
sidebar_position: 4
---

# 战利品表

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"

本文主要记录战利品表相关接口。

---

## 战利品表管理器

### LootTableManager 类

<Version type="script" add="2.2.0"/>

管理战利品表相关接口，可根据方块与实体的战利品表生成掉落物。

```typescript
class LootTableManager {
    private constructor();
    generateLootFromBlock(block: Block, tool?: ItemStack): ItemStack[] | undefined;
    generateLootFromBlockPermutation(blockPermutation: BlockPermutation, tool?: ItemStack): ItemStack[] | undefined;
    generateLootFromBlockType(scriptBlockType: BlockType, tool?: ItemStack): ItemStack[] | undefined;
    generateLootFromEntity(entity: Entity, tool?: ItemStack): ItemStack[] | undefined;
    generateLootFromEntityType(entityType: EntityType, tool?: ItemStack): ItemStack[] | undefined;
    generateLootFromTable(lootTable: LootTable, tool?: ItemStack): ItemStack[] | undefined;
    getLootTable(path: string): LootTable | undefined;
}
```

#### generateLootFromBlock 方法

```typescript
generateLootFromBlock(block: Block, tool?: ItemStack): ItemStack[] | undefined
```

- block: [Block](../../server/block/main#block-类)，生成掉落物的方块。
- tool?: [ItemStack](../../server/item/main#itemstack-类)，掉落操作中使用的工具（可选）。

**返回值**：[ItemStack](../../server/item/main#itemstack-类)[] | undefined，掉落事件掉落的物品堆叠数组；若无掉落则为空数组，若提供的工具不足以挖掘该方块则为`undefined`。

#### generateLootFromBlockPermutation 方法

```typescript
generateLootFromBlockPermutation(
    blockPermutation: BlockPermutation,
    tool?: ItemStack,
): ItemStack[] | undefined
```

- blockPermutation: [BlockPermutation](../../server/block/main#blockpermutation-类)，生成掉落物的方块置换。
- tool?: [ItemStack](../../server/item/main#itemstack-类)，掉落操作中使用的工具（可选）。

**返回值**：[ItemStack](../../server/item/main#itemstack-类)[] | undefined，掉落事件掉落的物品堆叠数组；若无掉落则为空数组，若提供的工具不足以挖掘该方块则为`undefined`。

#### generateLootFromBlockType 方法

```typescript
generateLootFromBlockType(scriptBlockType: BlockType, tool?: ItemStack): ItemStack[] | undefined
```

- scriptBlockType: [BlockType](../../server/block/main#blocktype-类)，生成掉落物的方块类型。
- tool?: [ItemStack](../../server/item/main#itemstack-类)，掉落操作中使用的工具（可选）。

**返回值**：[ItemStack](../../server/item/main#itemstack-类)[] | undefined，掉落事件掉落的物品堆叠数组；若无掉落则为空数组，若提供的工具不足以挖掘该方块则为`undefined`。

#### generateLootFromEntity 方法

```typescript
generateLootFromEntity(entity: Entity, tool?: ItemStack): ItemStack[] | undefined
```

- entity: [Entity](../../server/entity_and_player/entity#entity-类)，生成掉落物的实体。
- tool?: [ItemStack](../../server/item/main#itemstack-类)，掉落操作中使用的工具（可选）。

**返回值**：[ItemStack](../../server/item/main#itemstack-类)[] | undefined，掉落事件掉落的物品堆叠数组；若无掉落则为空数组，若实体无效则为`undefined`。

#### generateLootFromEntityType 方法

```typescript
generateLootFromEntityType(entityType: EntityType, tool?: ItemStack): ItemStack[] | undefined
```

- entityType: [EntityType](../../server/entity_and_player/entity#entitytype-类)，生成掉落物的实体类型。
- tool?: [ItemStack](../../server/item/main#itemstack-类)，掉落操作中使用的工具（可选）。

**返回值**：[ItemStack](../../server/item/main#itemstack-类)[] | undefined，掉落事件掉落的物品堆叠数组；若无掉落则为空数组。

#### generateLootFromTable 方法

<Version type="script" add="2.4.0" inline/>

```typescript
generateLootFromTable(lootTable: LootTable, tool?: ItemStack): ItemStack[] | undefined
```

- lootTable: [LootTable](#loottable-类)，生成掉落物的战利品表。
- tool?: [ItemStack](../../server/item/main#itemstack-类)，掉落操作中使用的工具（可选）。

**返回值**：[ItemStack](../../server/item/main#itemstack-类)[] | undefined，掉落事件掉落的物品堆叠数组；若无掉落则为空数组。

#### getLootTable 方法

<Version type="script" add="2.4.0" inline/>

```typescript
getLootTable(path: string): LootTable | undefined
```

- path: string，要检索的表的路径，不含文件扩展名或 `loot_tables/` 文件夹前缀。例如 `entities/creeper`。

**返回值**：[LootTable](#loottable-类) | undefined，若找到则返回一个战利品表；若提供的路径不对应现有战利品表则为`undefined`。

---

## 战利品表

### LootTable 类

<Version type="script" add="2.4.0"/>

表示单个战利品表，决定击杀生物、破坏方块、填充容器等时生成的物品。

```typescript
class LootTable {
    private constructor();
    readonly path: string;
    readonly pools: LootPool[];
}
```

#### 属性

- <ReadOnly/> path: string，指向表示该战利品表的 JSON 文件的路径，不含文件扩展名或 `loot_tables/` 文件夹前缀。例如 `entities/creeper`。
- <ReadOnly/> pools: [LootPool](#lootpool-类)[]，该战利品表上的战利品池数组。

---

## 战利品池

### LootPool 类

<Version type="script" add="2.4.0"/>

战利品池条目的集合，每个条目单独决定一次掉落，可包含决定掉落结果的掷骰、额外掷骰与层级等值。

```typescript
class LootPool {
    private constructor();
    readonly bonusRolls: minecraftcommon.NumberRange;
    readonly conditions: LootItemCondition[];
    readonly entries: LootPoolEntry[];
    readonly rolls: minecraftcommon.NumberRange;
    readonly tiers?: LootPoolTiers;
}
```

#### 属性

- <ReadOnly/> bonusRolls: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，根据玩家幸运等级额外掷骰战利品池的次数，以最小到最大掷骰范围表示。
- <ReadOnly/> conditions: [LootItemCondition](#lootitemcondition-类)[]，作用于该战利品池的战利品条件数组。
- <ReadOnly/> entries: [LootPoolEntry](#lootpoolentry-类)[]，该战利品池包含的所有战利品池条目的完整列表。
- <ReadOnly/> rolls: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，掷骰战利品池的次数，以最小到最大掷骰范围表示。
- <ReadOnly/> <Optional/> tiers: [LootPoolTiers](#lootpooltiers-类)，该表若存在分层，则为战利品池的层级值。

### LootPoolTiers 类

<Version type="script" add="2.4.0"/>

表示分层战利品池中决定掉落的值。分层战利品池的潜在掉落按序排列，并由该对象中的值控制的逻辑选择。

```typescript
class LootPoolTiers {
    private constructor();
    readonly bonusChance: number;
    readonly bonusRolls: number;
    readonly initialRange: number;
}
```

#### 属性

- <ReadOnly/> bonusChance: number，每次额外掷骰尝试提升掉落物品层级的概率。
- <ReadOnly/> bonusRolls: number，掉落升级其层级的尝试次数，由此递增其在战利品池条目数组中的位置，从而产生更高层级的掉落。
- <ReadOnly/> initialRange: number，决定掉落哪个层级时起始点的上限，下限恒为 1。例如值为 3 时，层级掉落逻辑会在战利品池条目数组中 1 到 3 之间随机选择一个位置作为起点。

---

## 战利品池条目

### LootPoolEntry 类

<Version type="script" add="2.4.0"/>

表示战利品表中的一个条目，描述掉落发生时的一次可能掉落。可包含一个物品、另一个战利品表、指向另一个战利品表的路径，或空掉落。

```typescript
class LootPoolEntry {
    private constructor();
    readonly quality: number;
    readonly subTable?: LootPoolEntry;
    readonly weight: number;
}
```

#### 属性

- <ReadOnly/> quality: number，给定战利品池条目的品质。
- <ReadOnly/> <Optional/> subTable: [LootPoolEntry](#lootpoolentry-类)，给定战利品池条目的子表。
- <ReadOnly/> weight: number，给定战利品池条目的权重。

### EmptyLootItem 类

<Version type="script" add="2.4.0"/>

表示战利品池中一个完全空的条目。若选中该条目，则不会有物品掉落。

继承自[LootPoolEntry](#lootpoolentry-类)。

```typescript
class EmptyLootItem extends LootPoolEntry {
    private constructor();
}
```

### LootItem 类

<Version type="script" add="2.4.0"/>

表示包含一个待掉落物品的战利品池条目。

继承自[LootPoolEntry](#lootpoolentry-类)。

```typescript
class LootItem extends LootPoolEntry {
    private constructor();
    readonly conditions: LootItemCondition[];
    readonly functions: LootItemFunction[];
    readonly name?: ItemType;
}
```

#### 属性

- <Version type="script" add="2.9.0" inline/> <ReadOnly/> conditions: [LootItemCondition](#lootitemcondition-类)[]，作用于该条目的战利品条件数组。
- <ReadOnly/> functions: [LootItemFunction](#lootitemfunction-类)[]，作用于该条目的战利品函数数组。
- <ReadOnly/> <Optional/> name: [ItemType](../../server/item/main#itemtype-类)，该条目所含物品的名称。

### LootTableEntry 类

<Version type="script" add="2.4.0"/>

表示包含另一个独立嵌套战利品表的战利品池条目。

继承自[LootPoolEntry](#lootpoolentry-类)。

```typescript
class LootTableEntry extends LootPoolEntry {
    private constructor();
    readonly lootTable: LootTable;
}
```

#### 属性

- <ReadOnly/> lootTable: [LootTable](#loottable-类)，存储在父战利品池中作为子表的战利品表。

### LootTableReference 类

<Version type="script" add="2.4.0"/>

表示包含对另一个战利品表引用的战利品池条目，由其路径描述。

继承自[LootPoolEntry](#lootpoolentry-类)。

```typescript
class LootTableReference extends LootPoolEntry {
    private constructor();
    readonly path: string;
}
```

#### 属性

- <ReadOnly/> path: string，所引用战利品表的路径。例如 `loot_tables/chests/village/village_bundle.json`。

---

## 战利品条件

### LootItemCondition 类

<Version type="script" add="2.4.0"/>

所有战利品条件的抽象基类。战利品条件是一组必须满足才能发生掉落的规则或要求。

```typescript
class LootItemCondition {
    private constructor();
}
```

### DamagedByEntityCondition 类

<Version type="script" add="2.4.0"/>

检查掉落源是否受到特定类型实体伤害的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class DamagedByEntityCondition extends LootItemCondition {
    private constructor();
    readonly entityType: string;
}
```

#### 属性

- <ReadOnly/> entityType: string，该条件通过所需的实体类型。

### EntityHasMarkVariantCondition 类

<Version type="script" add="2.4.0"/>

检查生物掉落时标记变体值的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class EntityHasMarkVariantCondition extends LootItemCondition {
    private constructor();
    readonly value: number;
}
```

#### 属性

- <ReadOnly/> value: number，生物必须具有才能通过该条件的标记变体值。

### EntityHasVariantCondition 类

<Version type="script" add="2.4.0"/>

检查生物掉落时变体值的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class EntityHasVariantCondition extends LootItemCondition {
    private constructor();
    readonly value: number;
}
```

#### 属性

- <ReadOnly/> value: number，生物必须具有才能通过该条件的变体值。

### EntityKilledCondition 类

<Version type="script" add="2.4.0"/>

检查掉落实体类型的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class EntityKilledCondition extends LootItemCondition {
    private constructor();
    readonly entityType: string;
}
```

#### 属性

- <ReadOnly/> entityType: string，该条件通过所需的实体类型。例如 `minecraft:skeleton`。

### IsBabyCondition 类

<Version type="script" add="2.4.0"/>

检查掉落实体是否为幼年个体的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class IsBabyCondition extends LootItemCondition {
    private constructor();
}
```

### KilledByEntityCondition 类

<Version type="script" add="2.4.0"/>

检查掉落源是否被特定类型实体击杀的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class KilledByEntityCondition extends LootItemCondition {
    private constructor();
    readonly entityType: string;
}
```

#### 属性

- <ReadOnly/> entityType: string，该条件通过所需的实体类型。例如 `minecraft:skeleton`。

### KilledByPlayerCondition 类

<Version type="script" add="2.4.0"/>

检查掉落源是否被玩家击杀的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class KilledByPlayerCondition extends LootItemCondition {
    private constructor();
}
```

### KilledByPlayerOrPetsCondition 类

<Version type="script" add="2.4.0"/>

检查掉落源是否被玩家或玩家的宠物击杀的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class KilledByPlayerOrPetsCondition extends LootItemCondition {
    private constructor();
}
```

### MatchToolCondition 类

<Version type="script" add="2.4.0"/>

检查是否使用合适的工具触发掉落事件的战利品条件。可描述物品类型、数量、耐久度、附魔或物品标签数组。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class MatchToolCondition extends LootItemCondition {
    private constructor();
    readonly count: minecraftcommon.NumberRange;
    readonly durability: minecraftcommon.NumberRange;
    readonly enchantments: EnchantInfo[];
    readonly itemName: string;
    readonly itemTagsAll: string[];
    readonly itemTagsAny: string[];
    readonly itemTagsNone: string[];
}
```

#### 属性

- <ReadOnly/> count: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，该条件通过所需的物品数量。
- <ReadOnly/> durability: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，该条件通过所需的耐久度值。
- <ReadOnly/> enchantments: [EnchantInfo](#enchantinfo-类)[]，该条件通过所需的附魔数组。
- <ReadOnly/> itemName: string，该条件通过所需的工具物品名称。
- <ReadOnly/> itemTagsAll: string[]，必须全部匹配才能通过该条件的物品标签数组。
- <ReadOnly/> itemTagsAny: string[]，至少匹配一个才能通过该条件的物品标签数组。
- <ReadOnly/> itemTagsNone: string[]，必须全部不匹配才能通过该条件的物品标签数组。

### EnchantInfo 类

<Version type="script" add="2.4.0"/>

表示附魔信息，包含附魔标识符与等级范围。

```typescript
class EnchantInfo {
    private constructor();
    readonly enchantment: string;
    readonly range: minecraftcommon.NumberRange;
}
```

#### 属性

- <ReadOnly/> enchantment: string，附魔的标识符。
- <ReadOnly/> range: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，附魔等级的值范围。

### PassengerOfEntityCondition 类

<Version type="script" add="2.4.0"/>

检查掉落实体当前是否为特定类型实体乘客的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class PassengerOfEntityCondition extends LootItemCondition {
    private constructor();
    readonly entityType: string;
}
```

#### 属性

- <ReadOnly/> entityType: string，该条件通过所需的实体类型。

### RandomChanceCondition 类

<Version type="script" add="2.4.0"/>

对掉落概率应用给定值的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class RandomChanceCondition extends LootItemCondition {
    private constructor();
    readonly chance: number;
}
```

#### 属性

- <ReadOnly/> chance: number，掉落概率，范围 0.0-1.0。

### RandomChanceWithLootingCondition 类

<Version type="script" add="2.4.0"/>

对掉落概率应用给定值、并按所用工具的抢夺附魔等级修正的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class RandomChanceWithLootingCondition extends LootItemCondition {
    private constructor();
    readonly chance: number;
    readonly lootingMultiplier: number;
}
```

#### 属性

- <ReadOnly/> chance: number，基础掉落概率，范围 0.0-1.0，将按 `lootingMultiplier` 值修正。
- <ReadOnly/> lootingMultiplier: number，每级抢夺附魔提升的掉落概率增量。

### RandomDifficultyChanceCondition 类

<Version type="script" add="2.4.0"/>

根据当前难度等级对掉落概率应用给定值的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class RandomDifficultyChanceCondition extends LootItemCondition {
    private constructor();
    readonly chances: number[];
}
```

#### 属性

- <ReadOnly/> chances: number[]，四元素数组，依次为和平、简单、普通、困难各难度下的掉落概率。

### RandomRegionalDifficultyChanceCondition 类

<Version type="script" add="2.4.0"/>

对掉落概率应用给定值、并按掉落发生区域的区域难度修正的战利品条件。

继承自[LootItemCondition](#lootitemcondition-类)。

```typescript
class RandomRegionalDifficultyChanceCondition extends LootItemCondition {
    private constructor();
    readonly maxChance: number;
}
```

#### 属性

- <ReadOnly/> maxChance: number，基础掉落概率，范围 0.0-1.0，将按当前区域的乘数修正。

---

## 战利品函数

### LootItemFunction 类

<Version type="script" add="2.4.0"/>

所有战利品函数的抽象基类。战利品函数可在掉落发生时以多种方式修改掉落物，可选择性依赖一组必须满足的条件。

```typescript
class LootItemFunction {
    private constructor();
    readonly conditions: LootItemCondition[];
}
```

#### 属性

- <ReadOnly/> conditions: [LootItemCondition](#lootitemcondition-类)[]，作用于该战利品函数的战利品条件数组。

### EnchantRandomEquipmentFunction 类

<Version type="script" add="2.4.0"/>

使用与附魔原版生物装备相同的算法，对掉落物品应用随机附魔的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class EnchantRandomEquipmentFunction extends LootItemFunction {
    private constructor();
    readonly chance: number;
}
```

#### 属性

- <ReadOnly/> chance: number，决定装备被附魔可能性的值。

### EnchantRandomlyFunction 类

<Version type="script" add="2.4.0"/>

随机附魔掉落物品的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class EnchantRandomlyFunction extends LootItemFunction {
    private constructor();
    readonly treasure: boolean;
}
```

#### 属性

- <ReadOnly/> treasure: boolean，决定随机选择的附魔是否包含宝藏附魔。

### EnchantWithLevelsFunction 类

<Version type="script" add="2.4.0"/>

对掉落物品应用随机附魔的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class EnchantWithLevelsFunction extends LootItemFunction {
    private constructor();
    readonly levels: minecraftcommon.NumberRange;
    readonly treasure: boolean;
}
```

#### 属性

- <ReadOnly/> levels: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，函数随机选择所应用附魔等级的值范围，包含最小值与最大值。
- <ReadOnly/> treasure: boolean，决定随机附魔选择中是否包含宝藏附魔。

### ExplorationMapFunction 类

<Version type="script" add="2.4.0"/>

修改掉落的藏宝图以标记位置的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class ExplorationMapFunction extends LootItemFunction {
    private constructor();
    readonly destination: string;
}
```

#### 属性

- <ReadOnly/> destination: string，决定掉落哪种类型的藏宝图。

### ExplosionDecayFunction 类

<Version type="script" add="2.4.0"/>

决定掉落物是否应被爆炸摧毁的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class ExplosionDecayFunction extends LootItemFunction {
    private constructor();
}
```

### FillContainerFunction 类

<Version type="script" add="2.4.0"/>

使用另一个战利品表填充掉落容器物品的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class FillContainerFunction extends LootItemFunction {
    private constructor();
    readonly lootTable: string;
}
```

#### 属性

- <ReadOnly/> lootTable: string，用于填充容器的战利品表路径。

### LootingEnchantFunction 类

<Version type="script" add="2.4.0"/>

若所用工具具有抢夺附魔则掉落额外物品的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class LootingEnchantFunction extends LootItemFunction {
    private constructor();
    readonly count: minecraftcommon.NumberRange;
}
```

#### 属性

- <ReadOnly/> count: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，函数随机选择额外掉落物品数量的值范围，包含最小值与最大值。

### RandomAuxValueFunction 类

<Version type="script" add="2.4.0"/>

随机修改掉落物品数据值的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class RandomAuxValueFunction extends LootItemFunction {
    private constructor();
    readonly values: minecraftcommon.NumberRange;
}
```

#### 属性

- <ReadOnly/> values: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，函数随机选择所分配数据值的值范围，包含最小值与最大值。

### RandomBlockStateFunction 类

<Version type="script" add="2.4.0"/>

随机修改掉落物品方块状态的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class RandomBlockStateFunction extends LootItemFunction {
    private constructor();
    readonly blockState: string;
    readonly values: minecraftcommon.NumberRange;
}
```

#### 属性

- <ReadOnly/> blockState: string，函数随机修改的方块状态。
- <ReadOnly/> values: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，函数随机选择赋给给定方块状态的值的范围，包含最小值与最大值。

### RandomDyeFunction 类

<Version type="script" add="2.4.0"/>

对掉落物品应用随机染色的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class RandomDyeFunction extends LootItemFunction {
    private constructor();
}
```

### SetArmorTrimFunction 类

<Version type="script" add="2.4.0"/>

修改掉落盔甲物品纹饰的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetArmorTrimFunction extends LootItemFunction {
    private constructor();
    readonly material: string;
    readonly pattern: string;
}
```

#### 属性

- <ReadOnly/> material: string，应用于盔甲纹饰的材料。
- <ReadOnly/> pattern: string，应用于盔甲纹饰的纹饰图案。

### SetBannerDetailsFunction 类

<Version type="script" add="2.4.0"/>

修改掉落旗帜类型的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetBannerDetailsFunction extends LootItemFunction {
    private constructor();
    readonly "type": number;
    readonly baseColor: string;
    readonly patterns: BannerPattern[];
}
```

#### 属性

- <ReadOnly/> "type": number，要掉落的旗帜类型。
- <Version type="script" experimental="测试版API" inline/> <ReadOnly/> baseColor: string，旗帜的基础颜色。
- <Version type="script" experimental="测试版API" inline/> <ReadOnly/> patterns: [BannerPattern](#bannerpattern-类)[]，装饰旗帜的图案。

### SetBookContentsFunction 类

<Version type="script" add="2.4.0"/>

修改掉落书籍内容的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetBookContentsFunction extends LootItemFunction {
    private constructor();
    readonly author: string;
    readonly pages: string[];
    readonly title: string;
}
```

#### 属性

- <ReadOnly/> author: string，书籍作者的名字。
- <ReadOnly/> pages: string[]，放置在书籍各页中的文本数组。
- <ReadOnly/> title: string，书籍的标题。

### SetDataFromColorIndexFunction 类

<Version type="script" add="2.4.0"/>

根据颜色索引修改掉落物品数据值的战利品函数。若未设置颜色索引则默认为零。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetDataFromColorIndexFunction extends LootItemFunction {
    private constructor();
}
```

### SetItemCountFunction 类

<Version type="script" add="2.4.0"/>

修改战利品池条目掉落物品数量的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetItemCountFunction extends LootItemFunction {
    private constructor();
    readonly count: minecraftcommon.NumberRange;
}
```

#### 属性

- <ReadOnly/> count: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，函数随机选择掉落物品数量的值范围，包含最小值与最大值。

### SetItemDamageFunction 类

<Version type="script" add="2.4.0"/>

修改掉落物品耐久度值的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetItemDamageFunction extends LootItemFunction {
    private constructor();
    readonly damage: minecraftcommon.NumberRange;
}
```

#### 属性

- <ReadOnly/> damage: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，函数随机选择所分配耐久度值的值范围，包含最小值与最大值。值必须始终在 0 与物品最大耐久度之间。

### SetItemDataFunction 类

<Version type="script" add="2.4.0"/>

修改掉落物品数据值的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetItemDataFunction extends LootItemFunction {
    private constructor();
    readonly data: minecraftcommon.NumberRange;
}
```

#### 属性

- <ReadOnly/> data: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，函数随机选择所分配数据值的值范围，包含最小值与最大值。

### SetItemLoreFunction 类

<Version type="script" add="2.4.0"/>

修改掉落物品描述的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetItemLoreFunction extends LootItemFunction {
    private constructor();
    readonly lore: string[];
}
```

#### 属性

- <ReadOnly/> lore: string[]，应用于掉落物品的描述。

### SetItemNameFunction 类

<Version type="script" add="2.4.0"/>

修改掉落物品名称的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetItemNameFunction extends LootItemFunction {
    private constructor();
    readonly name: string;
}
```

#### 属性

- <ReadOnly/> name: string，应用于掉落物品的名称。

### SetOminousBottleFunction 类

<Version type="script" add="2.4.0"/>

修改不祥之瓶增幅值的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetOminousBottleFunction extends LootItemFunction {
    private constructor();
    readonly amplifier: minecraftcommon.NumberRange;
}
```

#### 属性

- <ReadOnly/> amplifier: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，函数随机选择所分配增幅值的值范围，包含最小值与最大值。

### SetPotionFunction 类

<Version type="script" add="2.4.0"/>

为掉落的药水分配类型的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetPotionFunction extends LootItemFunction {
    private constructor();
    readonly id: string;
}
```

#### 属性

- <ReadOnly/> id: string，分配给掉落药水的标识符。

### SetSpawnEggFunction 类

<Version type="script" add="2.4.0"/>

为掉落的刷怪蛋分配实体类型的战利品函数。仅对刷怪蛋有效。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetSpawnEggFunction extends LootItemFunction {
    private constructor();
    readonly id: string;
}
```

#### 属性

- <ReadOnly/> id: string，分配给掉落刷怪蛋的实体。

### SetStewEffectFunction 类

<Version type="script" add="2.4.0"/>

修改掉落炖菜物品状态效果的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SetStewEffectFunction extends LootItemFunction {
    private constructor();
    readonly effects: number[];
}
```

#### 属性

- <ReadOnly/> effects: number[]，整数数组，对应随机选择并应用于掉落物品的炖菜状态效果。

### SmeltItemFunction 类

<Version type="script" add="2.4.0"/>

将掉落物品像在熔炉中烧炼或烹饪一样处理的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SmeltItemFunction extends LootItemFunction {
    private constructor();
}
```

### SpecificEnchantFunction 类

<Version type="script" add="2.4.0"/>

对掉落物品应用一个或多个预定义附魔的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class SpecificEnchantFunction extends LootItemFunction {
    private constructor();
    readonly enchantments: EnchantInfo[];
}
```

#### 属性

- <ReadOnly/> enchantments: [EnchantInfo](#enchantinfo-类)[]，应用于掉落物品的附魔数组。

### CarryOverBlockEntityDataFunction 类

<Version type="script" experimental="测试版API"/>

携带方块实体数据的战利品函数。

继承自[LootItemFunction](#lootitemfunction-类)。

```typescript
class CarryOverBlockEntityDataFunction extends LootItemFunction {
    private constructor();
    readonly dynamicProperties: boolean;
    readonly entityStorage: boolean;
}
```

#### 属性

- <ReadOnly/> dynamicProperties: boolean，若为`true`且方块实体具有动态属性，则复制其动态属性。
- <ReadOnly/> entityStorage: boolean，若为`true`且方块实体支持实体存储，则复制其已存储实体。

### BannerPattern 类

<Version type="script" experimental="测试版API"/>

旗帜图案。

```typescript
class BannerPattern {
    private constructor();
    readonly color: string;
    readonly pattern: string;
}
```

#### 属性

- <ReadOnly/> color: string，应用于该旗帜图案的颜色。
- <ReadOnly/> pattern: string，应用于旗帜的图案类型（如渐变、V 形、十字等）。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
