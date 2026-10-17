---
sidebar_position: 2
---

# 方块

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Static from "/src/components/highlight/static"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录方块相关接口。

---

## 方块信息

### Block 类

<Version type="script" add="1.1.0"/>

表示维度中的一个方块。方块代表维度内一组唯一的 X、Y、Z 坐标。

```typescript
class Block {
    private constructor();
    readonly dimension: Dimension;
    readonly isAir: boolean;
    readonly isLiquid: boolean;
    readonly isValid: boolean;
    readonly isWaterlogged: boolean;
    readonly localizationKey: string;
    readonly location: Vector3;
    readonly permutation: BlockPermutation;
    readonly "type": BlockType;
    readonly typeId: string;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    above(steps?: number): Block | undefined;
    below(steps?: number): Block | undefined;
    bottomCenter(): Vector3;
    canBeDestroyedByLiquidSpread(liquidType: LiquidType): boolean;
    canContainLiquid(liquidType: LiquidType): boolean;
    center(): Vector3;
    east(steps?: number): Block | undefined;
    getComponent<T extends string>(componentId: T): BlockComponentReturnType<T> | undefined;
    getComponents(): BlockComponent[];
    getItemStack(amount?: number, withData?: boolean): ItemStack | undefined;
    getLightLevel(): number;
    getParts(): Block[] | undefined;
    getRedstonePower(): number | undefined;
    getSkyLightLevel(): number;
    getTags(): string[];
    hasComponent(componentId: string): boolean;
    hasTag(tag: string): boolean;
    isLiquidBlocking(liquidType: LiquidType): boolean;
    liquidCanFlowFromDirection(liquidType: LiquidType, flowDirection: Direction): boolean;
    liquidSpreadCausesSpawn(liquidType: LiquidType): boolean;
    matches(blockName: string, states?: Record<string, boolean | number | string>): boolean;
    north(steps?: number): Block | undefined;
    offset(offset: Vector3): Block | undefined;
    setPermutation(permutation: BlockPermutation): void;
    setType(blockType: BlockType | string): void;
    setWaterlogged(isWaterlogged: boolean): void;
    south(steps?: number): Block | undefined;
    west(steps?: number): Block | undefined;
    readonly isSolid: boolean;
    canPlace(blockToPlace: BlockPermutation | BlockType | string, faceToPlaceOn?: Direction): boolean;
    getAllScheduledNamedTicks(): ScheduledNamedTick[];
    getMapColor(): RGBA;
    getScheduledNamedTickCount(): number;
    hasScheduledNamedTick(eventName: string): boolean;
    removeScheduledNamedTicks(eventName: string): void;
    scheduleNamedTick(eventName: string, tickDelay: number): void;
    trySetPermutation(permutation: BlockPermutation): boolean;
}
```

#### 属性

- <ReadOnly/> dimension: [Dimension](../../server/dimension/main#dimension-类)，方块所在的维度。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isAir: boolean，该方块是否为空气方块（即空位）。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isLiquid: boolean，该方块是否为液体方块（例如水和岩浆是液体方块，空气和石头不是；含水方块不算液体方块）。
- <Version type="script" add="1.4.0" inline/> <ReadOnly/> isValid: boolean，该方块的引用是否仍然有效（例如方块被卸载后，对它的引用将失效）。
- <Version type="script" add="1.17.0" inline/> <ReadOnly/> isWaterlogged: boolean，该方块是否含水。
- <Version type="script" add="2.1.0" inline/> <ReadOnly/> localizationKey: string，方块名称在语言文件（`.lang`）中使用的本地化键名。
- <ReadOnly/> location: [Vector3](../../server/general#vector3-接口)，方块的坐标。
- <ReadOnly/> permutation: [BlockPermutation](#blockpermutation-类)，描述该方块的附加配置数据。
- <Version type="script" add="1.11.0" inline/> <ReadOnly/> "type": [BlockType](#blocktype-类)，该方块的类型。
- <Version type="script" add="1.11.0" inline/> <ReadOnly/> typeId: string，该方块的类型标识符。原版方块名称可能在未来版本中更改，建议改用`Block.matches`进行方块比较。
- <ReadOnly/> x: number，方块的 X 坐标。
- <ReadOnly/> y: number，方块的 Y 坐标。
- <ReadOnly/> z: number，方块的 Z 坐标。
- <Version type="script" experimental="测试版API" inline/> <ReadOnly/> isSolid: boolean，该方块是否为实体可站立的固体方块。

#### above 方法

<Version type="script" add="1.7.0" inline/>

返回该方块上方（Y 轴正方向）的方块。

```typescript
above(steps?: number): Block | undefined
```

- steps?: number，向上查找的距离，以方块为单位，默认为 1。

**返回值**：[Block](#block-类) | undefined，该方向上的方块；若目标位置超出世界边界或位于未加载区块，返回`undefined`。

#### below 方法

<Version type="script" add="1.7.0" inline/>

返回该方块下方（Y 轴负方向）的方块。

```typescript
below(steps?: number): Block | undefined
```

- steps?: number，向下查找的距离，以方块为单位，默认为 1。

**返回值**：[Block](#block-类) | undefined，该方向上的方块；若目标位置超出世界边界或位于未加载区块，返回`undefined`。

#### bottomCenter 方法

<Version type="script" add="1.7.0" inline/>

返回该方块在 X、Z 轴上中心点的坐标。

```typescript
bottomCenter(): Vector3
```

**返回值**：[Vector3](../../server/general#vector3-接口)，底面中心点的坐标，即 (x + 0.5, y, z + 0.5)。

#### canBeDestroyedByLiquidSpread 方法

<Version type="script" add="1.18.0" inline/>

返回该方块被液体接触时是否会被破坏。

```typescript
canBeDestroyedByLiquidSpread(liquidType: LiquidType): boolean
```

- liquidType: [LiquidType](#liquidtype-枚举)，要检查的液体类型。

**返回值**：boolean，`true` 表示该方块被该液体接触时会被破坏。

#### canContainLiquid 方法

<Version type="script" add="1.18.0" inline/>

返回该方块上是否可以放置液体（即是否可以含水）。

```typescript
canContainLiquid(liquidType: LiquidType): boolean
```

- liquidType: [LiquidType](#liquidtype-枚举)，要检查的液体类型。

**返回值**：boolean，`true` 表示该方块上可以放置该液体。

#### center 方法

<Version type="script" add="1.7.0" inline/>

返回该方块在 X、Y、Z 三轴上中心点的坐标。

```typescript
center(): Vector3
```

**返回值**：[Vector3](../../server/general#vector3-接口)，几何中心点的坐标，即 (x + 0.5, y + 0.5, z + 0.5)。

#### east 方法

<Version type="script" add="1.7.0" inline/>

返回该方块东侧（X 轴正方向）的方块。

```typescript
east(steps?: number): Block | undefined
```

- steps?: number，向东查找的距离，以方块为单位，默认为 1。

**返回值**：[Block](#block-类) | undefined，该方向上的方块；若目标位置超出世界边界或位于未加载区块，返回`undefined`。

#### getComponent 方法

<Version type="script" add="1.3.0" inline/>

返回该方块上指定的脚本组件。

```typescript
getComponent<T extends string>(componentId: T): BlockComponentReturnType<T> | undefined
```

- componentId: T，脚本组件的标识符，例如`minecraft:inventory`。

**返回值**：[BlockComponentReturnType](../../server/block/component#blockcomponentreturntype-类型)&lt;T&gt; | undefined，该方块上指定的脚本组件；该组件不存在时为`undefined`。

#### getComponents 方法

<Version type="script" add="2.6.0" inline/>

返回该方块上所有脚本组件。

```typescript
getComponents(): BlockComponent[]
```

**返回值**：[BlockComponent](../../server/block/component#blockcomponent-类)[]，该方块上的脚本组件数组；没有组件时为空数组。

#### getItemStack 方法

<Version type="script" add="1.10.0" inline/>

基于该方块创建物品堆叠原型，可用于[Container](../item/container#container-类)/[ContainerSlot](../item/container#containerslot-类)接口。

```typescript
getItemStack(amount?: number, withData?: boolean): ItemStack | undefined
```

- amount?: number，物品堆叠的数量。默认为 1，范围从 1 到 255。
- withData?: boolean，是否包含物品堆叠的附加数据。默认为`false`。

**返回值**：[ItemStack](../../server/item/main#itemstack-类) | undefined，可用于[Container](../item/container#container-类)/[ContainerSlot](../item/container#containerslot-类)接口的物品堆叠原型；若该方块类型无法转换为物品，返回`undefined`。

#### getLightLevel 方法

<Version type="script" add="2.3.0" inline/> <RestrictedMode inline/>

返回照射在该方块上的总光照亮度。

```typescript
getLightLevel(): number
```

**返回值**：number，照射在该方块上的总光照亮度，范围从 0 到 15。

#### getParts 方法

<Version type="script" add="2.9.0" inline/>

若该方块具有`minecraft:multi_block`特征，返回其所有已加载的方块部分；若没有该特征则返回`undefined`。

```typescript
getParts(): Block[] | undefined
```

**返回值**：[Block](#block-类)[] | undefined，该方块所有已加载的方块部分；不具有`minecraft:multi_block`特征时为`undefined`。

#### getRedstonePower 方法

<Version type="script" add="1.15.0" inline/>

返回该方块的红石能量净值。若红石能量不适用于该方块，返回`undefined`。

```typescript
getRedstonePower(): number | undefined
```

**返回值**：number | undefined，红石能量净值；红石能量不适用于该方块时为`undefined`。

#### getSkyLightLevel 方法

<Version type="script" add="2.3.0" inline/> <RestrictedMode inline/>

返回天空照射在该方块上的光照亮度。

```typescript
getSkyLightLevel(): number
```

**返回值**：number，天空照射在该方块上的光照亮度，范围从 0 到 15。

#### getTags 方法

<Version type="script" add="1.8.0" inline/>

返回该方块的所有标签。

```typescript
getTags(): string[]
```

**返回值**：string[]，该方块的标签数组；没有任何标签时为空数组。

#### hasComponent 方法

<Version type="script" add="2.6.0" inline/>

返回该方块上是否存在指定的脚本组件。

```typescript
hasComponent(componentId: string): boolean
```

- componentId: string，脚本组件的标识符。

**返回值**：boolean，`true` 表示该方块上存在指定的脚本组件。

#### hasTag 方法

<Version type="script" add="1.8.0" inline/>

检查该方块的方块置换是否具有指定标签。

```typescript
hasTag(tag: string): boolean
```

- tag: string，要检查的标签。

**返回值**：boolean，`true` 表示该方块置换具有指定标签。

#### isLiquidBlocking 方法

<Version type="script" add="1.18.0" inline/>

返回该方块是否会阻止液体流动。

```typescript
isLiquidBlocking(liquidType: LiquidType): boolean
```

- liquidType: [LiquidType](#liquidtype-枚举)，要检查的液体类型。

**返回值**：boolean，`true` 表示该方块会阻止该液体流动。

#### liquidCanFlowFromDirection 方法

<Version type="script" add="1.18.0" inline/>

返回液体是否可以从指定方向流入该方块，或用桶向该方块放置液体时是否可以从该方向流出。

```typescript
liquidCanFlowFromDirection(liquidType: LiquidType, flowDirection: Direction): boolean
```

- liquidType: [LiquidType](#liquidtype-枚举)，要检查的液体类型。
- flowDirection: [Direction](../../server/general#direction-枚举)，液体流动的方向。

**返回值**：boolean，`true` 表示该液体可以从该方向流入或流出。

#### liquidSpreadCausesSpawn 方法

<Version type="script" add="1.18.0" inline/>

返回该方块被液体接触时是否会被破坏并掉落其物品。

```typescript
liquidSpreadCausesSpawn(liquidType: LiquidType): boolean
```

- liquidType: [LiquidType](#liquidtype-枚举)，要检查的液体类型。

**返回值**：boolean，`true` 表示该方块被该液体接触时会被破坏并掉落物品。

#### matches 方法

<Version type="script" add="1.11.0" inline/>

测试该方块是否匹配指定条件。

```typescript
matches(blockName: string, states?: Record<string, boolean | number | string>): boolean
```

- blockName: string，要比较的方块名称，例如`minecraft:stone`。
- states?: Record&lt;string, boolean | number | string&gt;，要比较的方块状态。

**返回值**：boolean，`true` 表示该方块匹配指定条件。

#### north 方法

<Version type="script" add="1.7.0" inline/>

返回该方块北侧（Z 轴负方向）的方块。

```typescript
north(steps?: number): Block | undefined
```

- steps?: number，向北查找的距离，以方块为单位，默认为 1。

**返回值**：[Block](#block-类) | undefined，该方向上的方块；若目标位置超出世界边界或位于未加载区块，返回`undefined`。

#### offset 方法

<Version type="script" add="1.7.0" inline/>

返回相对于该方块偏移指定向量的方块。若该方块无法获取（例如未加载），返回`undefined`。

```typescript
offset(offset: Vector3): Block | undefined
```

- offset: [Vector3](../../server/general#vector3-接口)，相对于该方块的偏移向量。

**返回值**：[Block](#block-类) | undefined，偏移后位置的方块；若该位置超出世界边界或位于未加载区块，返回`undefined`。

#### setPermutation 方法

<RestrictedMode inline/>

将该方块设置为指定的方块置换状态。

```typescript
setPermutation(permutation: BlockPermutation): void
```

- permutation: [BlockPermutation](#blockpermutation-类)，要设置的方块置换。

#### setType 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

设置该方块的类型。

```typescript
setType(blockType: BlockType | string): void
```

- blockType: [BlockType](#blocktype-类) | string，要设置的方块类型，可以是`BlockType`对象或方块类型的标识符。

#### setWaterlogged 方法

<Version type="script" add="1.17.0" inline/> <RestrictedMode inline/>

设置该方块是否为含水状态（例如楼梯是否被水淹没）。

```typescript
setWaterlogged(isWaterlogged: boolean): void
```

- isWaterlogged: boolean，是否设置为含水状态。

#### south 方法

<Version type="script" add="1.7.0" inline/>

返回该方块南侧（Z 轴正方向）的方块。

```typescript
south(steps?: number): Block | undefined
```

- steps?: number，向南查找的距离，以方块为单位，默认为 1。

**返回值**：[Block](#block-类) | undefined，该方向上的方块；若目标位置超出世界边界或位于未加载区块，返回`undefined`。

#### west 方法

<Version type="script" add="1.7.0" inline/>

返回该方块西侧（X 轴负方向）的方块。

```typescript
west(steps?: number): Block | undefined
```

- steps?: number，向西查找的距离，以方块为单位，默认为 1。

**返回值**：[Block](#block-类) | undefined，该方向上的方块；若目标位置超出世界边界或位于未加载区块，返回`undefined`。

#### canPlace 方法

<Version type="script" experimental="测试版API" inline/>

判断某方块类型或置换能否放置在该方块上。

```typescript
canPlace(
    blockToPlace: BlockPermutation | BlockType | string,
    faceToPlaceOn?: Direction,
): boolean
```

- blockToPlace: [BlockPermutation](#blockpermutation-类) | [BlockType](#blocktype-类) | string，要放置的方块置换、类型或标识符。
- faceToPlaceOn?: [Direction](../../server/general#direction-枚举)，放置所在的面（可选）。

**返回值**：boolean，该方块类型或置换可放置在该方块上则为`true`。

#### getAllScheduledNamedTicks 方法

<Version type="script" experimental="测试版API" inline/>

返回该方块上已计划的命名刻事件。

```typescript
getAllScheduledNamedTicks(): ScheduledNamedTick[]
```

**返回值**：[ScheduledNamedTick](../../server/system/custom_block_component#schedulednamedtick-接口)[]，该方块上已计划的命名刻事件数组。

#### getMapColor 方法

<Version type="script" experimental="测试版API" inline/>

获取该方块在地图上显示的颜色。

```typescript
getMapColor(): RGBA
```

**返回值**：[RGBA](../../server/general#rgba-接口)，该方块在地图上显示的颜色。

#### getScheduledNamedTickCount 方法

<Version type="script" experimental="测试版API" inline/>

返回当前在该方块计划的命名刻事件数量。

```typescript
getScheduledNamedTickCount(): number
```

**返回值**：number，当前在该方块计划的命名刻事件数量。

#### hasScheduledNamedTick 方法

<Version type="script" experimental="测试版API" inline/>

检查该方块是否有指定名称的命名刻计划。

```typescript
hasScheduledNamedTick(eventName: string): boolean
```

- eventName: string，要检查的命名刻事件名称。

**返回值**：boolean，该方块有指定名称的命名刻计划则为`true`。

#### removeScheduledNamedTicks 方法

<Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/>

移除该方块指定名称的所有命名刻计划。

```typescript
removeScheduledNamedTicks(eventName: string): void
```

- eventName: string，要移除的命名刻事件名称。

#### scheduleNamedTick 方法

<Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/>

在该方块上计划一个命名刻。

```typescript
scheduleNamedTick(eventName: string, tickDelay: number): void
```

- eventName: string，要计划的命名刻事件名称。
- tickDelay: number，触发前的游戏刻延迟。

#### trySetPermutation 方法

<Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/>

尝试设置该方块的置换。

```typescript
trySetPermutation(permutation: BlockPermutation): boolean
```

- permutation: [BlockPermutation](#blockpermutation-类)，要设置的方块置换。

**返回值**：boolean，方块置换数据设置成功则为`true`。

### BlockType 类

<Version type="script" add="1.8.0"/>

方块的类型（或模板），不包含除其所表示方块类型之外的方块置换数据。

```typescript
class BlockType {
    private constructor();
    readonly id: string;
    readonly localizationKey: string;
}
```

#### 属性

- <Version type="script" add="1.11.0" inline/> <ReadOnly/> id: string，方块类型名称，例如`minecraft:acacia_stairs`。
- <Version type="script" add="2.6.0" inline/> <ReadOnly/> localizationKey: string，方块类型名称在语言文件（`.lang`）中使用的本地化键名。

### BlockPermutation 类

<Version type="script" add="1.1.0"/>

方块置换，包含方块的状态数据与类型信息。

```typescript
class BlockPermutation {
    private constructor();
    readonly localizationKey: string;
    readonly "type": BlockType;
    canBeDestroyedByLiquidSpread(liquidType: LiquidType): boolean;
    canContainLiquid(liquidType: LiquidType): boolean;
    getAllStates(): Record<string, boolean | number | string>;
    getItemStack(amount?: number): ItemStack | undefined;
    getState<T extends keyof minecraftvanilladata.BlockStateSuperset>(
        stateName: T,
    ): minecraftvanilladata.BlockStateSuperset[T] | undefined;
    getTags(): string[];
    hasTag(tag: string): boolean;
    isLiquidBlocking(liquidType: LiquidType): boolean;
    liquidSpreadCausesSpawn(liquidType: LiquidType): boolean;
    matches<T extends string = minecraftvanilladata.MinecraftBlockTypes>(blockName: T, states?: BlockStateArg<T>): boolean;
    withState<T extends keyof minecraftvanilladata.BlockStateSuperset>(
        name: T,
        value: minecraftvanilladata.BlockStateSuperset[T],
    ): BlockPermutation;
    static resolve<T extends string = minecraftvanilladata.MinecraftBlockTypes>(
        blockName: T,
        states?: BlockStateArg<T>,
    ): BlockPermutation;
}
```

#### 属性

- <Version type="script" add="2.6.0" inline/> <ReadOnly/> localizationKey: string，方块置换的名称在语言文件（`.lang`）中使用的本地化键名。
- <Version type="script" add="1.11.0" inline/> <ReadOnly/> "type": [BlockType](#blocktype-类)，该方块置换所属的方块类型。

#### canBeDestroyedByLiquidSpread 方法

<Version type="script" add="1.18.0" inline/>

返回该方块被液体接触时是否会被破坏。

```typescript
canBeDestroyedByLiquidSpread(liquidType: LiquidType): boolean
```

- liquidType: [LiquidType](#liquidtype-枚举)，要检查的液体类型。

**返回值**：boolean，`true` 表示该方块被该液体接触时会被破坏。

#### canContainLiquid 方法

<Version type="script" add="1.18.0" inline/>

返回该方块上是否可以放置液体（即是否可以含水）。

```typescript
canContainLiquid(liquidType: LiquidType): boolean
```

- liquidType: [LiquidType](#liquidtype-枚举)，要检查的液体类型。

**返回值**：boolean，`true` 表示该方块上可以放置该液体。

#### getAllStates 方法

<Version type="script" add="1.9.0" inline/>

返回该方块置换的所有方块状态。

```typescript
getAllStates(): Record<string, boolean | number | string>
```

**返回值**：Record&lt;string, boolean | number | string&gt;，方块状态名称到对应值的映射。

#### getItemStack 方法

<Version type="script" add="1.10.0" inline/>

基于该方块置换获取物品堆叠原型，可用于物品的[Container](../item/container#container-类)/[ContainerSlot](../item/container#containerslot-类)接口。

```typescript
getItemStack(amount?: number): ItemStack | undefined
```

- amount?: number，物品堆叠的数量，默认为 1。

**返回值**：[ItemStack](../../server/item/main#itemstack-类) | undefined，可用于[Container](../item/container#container-类)/[ContainerSlot](../item/container#containerslot-类)接口的物品堆叠原型；若该方块置换无法转换为物品，返回`undefined`。

#### getState 方法

<Version type="script" add="1.8.0" inline/>

返回该方块置换中指定方块状态的值。

```typescript
getState<T extends keyof minecraftvanilladata.BlockStateSuperset>(
    stateName: T,
): minecraftvanilladata.BlockStateSuperset[T] | undefined
```

- stateName: T，方块状态的名称，例如`minecraft:cardinal_direction`。

**返回值**：minecraftvanilladata.BlockStateSuperset[T] | undefined，该方块状态的值；该状态不存在时为`undefined`。

#### getTags 方法

<Version type="script" add="1.12.0" inline/>

返回该方块置换的所有标签。

```typescript
getTags(): string[]
```

**返回值**：string[]，该方块置换的标签数组；没有任何标签时为空数组。

#### hasTag 方法

<Version type="script" add="1.12.0" inline/>

检查该方块置换是否具有指定标签。

```typescript
hasTag(tag: string): boolean
```

- tag: string，要检查的标签。

**返回值**：boolean，`true` 表示该方块置换具有指定标签。

#### isLiquidBlocking 方法

<Version type="script" add="1.18.0" inline/>

返回该方块是否会阻止液体流动。

```typescript
isLiquidBlocking(liquidType: LiquidType): boolean
```

- liquidType: [LiquidType](#liquidtype-枚举)，要检查的液体类型。

**返回值**：boolean，`true` 表示该方块会阻止该液体流动。

#### liquidSpreadCausesSpawn 方法

<Version type="script" add="1.18.0" inline/>

返回该方块被液体接触时是否会被破坏并掉落其物品。

```typescript
liquidSpreadCausesSpawn(liquidType: LiquidType): boolean
```

- liquidType: [LiquidType](#liquidtype-枚举)，要检查的液体类型。

**返回值**：boolean，`true` 表示该方块被该液体接触时会被破坏并掉落物品。

#### matches 方法

测试该方块置换是否匹配指定条件。

```typescript
matches<T extends string = minecraftvanilladata.MinecraftBlockTypes>(
    blockName: T,
    states?: BlockStateArg<T>,
): boolean
```

- blockName: T，要比较的方块名称，例如`minecraft:stone`。
- states?: [BlockStateArg](#blockstatearg-类型)&lt;T&gt;，要比较的方块状态。

**返回值**：boolean，`true` 表示该方块置换匹配指定条件。

#### withState 方法

<Version type="script" add="1.8.0" inline/>

返回修改指定方块状态后的新方块置换。

```typescript
withState<T extends keyof minecraftvanilladata.BlockStateSuperset>(
    name: T,
    value: minecraftvanilladata.BlockStateSuperset[T],
): BlockPermutation
```

- name: T，方块状态的名称，例如`minecraft:cardinal_direction`。
- value: minecraftvanilladata.BlockStateSuperset[T]，该方块状态要设置的值。

**返回值**：[BlockPermutation](#blockpermutation-类)，修改后的方块置换。

#### resolve 方法

<Static/>

```typescript
static resolve<T extends string = minecraftvanilladata.MinecraftBlockTypes>(
    blockName: T,
    states?: BlockStateArg<T>,
): BlockPermutation
```

- blockName: T
- states?: [BlockStateArg](#blockstatearg-类型)&lt;T&gt;

**返回值**：[BlockPermutation](#blockpermutation-类)

### BlockTypes 类

<Version type="script" add="1.11.0"/>

方块类型的目录，用于按名称获取或列出所有方块类型。

```typescript
class BlockTypes {
    private constructor();
    static get(typeName: string): BlockType | undefined;
    static getAll(): BlockType[];
}
```

#### get 方法

<Static/>

获取指定名称的方块类型。

```typescript
static get(typeName: string): BlockType | undefined
```

- typeName: string，方块类型名称。

**返回值**：[BlockType](#blocktype-类) | undefined，指定名称的方块类型；若不存在则为`undefined`。

#### getAll 方法

<Static/>

获取所有可用的方块类型。

```typescript
static getAll(): BlockType[]
```

**返回值**：[BlockType](#blocktype-类)[]，所有可用的方块类型组成的数组。

---

## 方块状态

### BlockStates 类

<Version type="script" add="1.9.0"/>

方块状态的目录，提供按标识符查询方块状态的方法。

```typescript
class BlockStates {
    private constructor();
    static get(stateName: string): BlockStateType | undefined;
    static getAll(): BlockStateType[];
}
```

#### get 方法

<Static/>

按标识符获取方块状态；该状态不存在时返回`undefined`。

```typescript
static get(stateName: string): BlockStateType | undefined
```

- stateName: string，方块状态的标识符。

**返回值**：[BlockStateType](#blockstatetype-类) | undefined，匹配的方块状态；不存在时为`undefined`。

#### getAll 方法

<Static/>

返回全部方块状态。

```typescript
static getAll(): BlockStateType[]
```

**返回值**：[BlockStateType](#blockstatetype-类)[]，全部方块状态组成的数组。

### BlockStateType 类

<Version type="script" add="1.9.0"/>

一种方块状态的定义。

```typescript
class BlockStateType {
    private constructor();
    readonly id: string;
    readonly validValues: (boolean | number | string)[];
}
```

#### 属性

- <ReadOnly/> id: string，该方块状态的标识符。
- <ReadOnly/> validValues: (boolean | number | string)[]，该方块状态允许的取值。

### BlockStateArg 类型

<Version type="script" add="1.18.0"/>

方块状态取值的类型工具；对原版方块类型会收窄为该方块合法状态的取值，其余情况为以状态名为键、布尔值、数字或字符串为值的映射。

```typescript
type BlockStateArg<T> = T extends `${minecraftvanilladata.MinecraftBlockTypes}`
    ? T extends keyof minecraftvanilladata.BlockStateMapping
        ? minecraftvanilladata.BlockStateMapping[T]
        : never
    : Record<string, boolean | number | string>
```

---

## 液体

### LiquidType 枚举

<Version type="script" add="1.18.0"/>

表示可放置于方块上、或在世界中动态流动的液体类型。

```typescript
enum LiquidType {
    Water = "Water", // 水
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
