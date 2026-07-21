---
sidebar_position: 2
---

# 方块

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import ReadOnly from "/src/components/highlight/readonly"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录方块相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 方块信息

### Block 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.Block.html"/>

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
    readonly 'type': BlockType;
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
}
```

#### 属性

- <ReadOnly/> dimension: [Dimension](../dimension/main#dimension-类)
- <ReadOnly/> isAir: boolean
- <ReadOnly/> isLiquid: boolean
- <ReadOnly/> isValid: boolean
- <ReadOnly/> isWaterlogged: boolean
- <ReadOnly/> <Version add="2.1.0" inline/> localizationKey: string，方块在语言文件中的键名。
- <ReadOnly/> location: [Vector3](../general#vector3-接口)
- <ReadOnly/> permutation: [BlockPermutation](#blockpermutation-类)
- <ReadOnly/> type: [BlockType](#blocktype-类)
- <ReadOnly/> typeId: string
- <ReadOnly/> x: number
- <ReadOnly/> y: number
- <ReadOnly/> z: number

#### above 方法

```typescript
above(steps?: number): Block | undefined;
```

#### below 方法

```typescript
below(steps?: number): Block | undefined;
```

#### bottomCenter 方法

```typescript
bottomCenter(): Vector3;
```

#### canBeDestroyedByLiquidSpread 方法

```typescript
canBeDestroyedByLiquidSpread(liquidType: LiquidType): boolean;
```

#### canContainLiquid 方法

```typescript
canContainLiquid(liquidType: LiquidType): boolean;
```

#### center 方法

```typescript
center(): Vector3;
```

#### east 方法

```typescript
east(steps?: number): Block | undefined;
```

#### getComponent 方法

```typescript
getComponent<T extends string>(componentId: T): BlockComponentReturnType<T> | undefined;
```

#### getComponents 方法

```typescript
getComponents(): BlockComponent[];
```

#### getItemStack 方法

```typescript
getItemStack(amount?: number, withData?: boolean): ItemStack | undefined;
```

#### getLightLevel 方法

<RestrictedMode/> <Version add="2.3.0"/>

获取该方块的光照亮度。

```typescript
getLightLevel(): number;
```

**返回值**：number，返回该方块的光照亮度。

#### getRedstonePower 方法

```typescript
getRedstonePower(): number | undefined;
```

#### getSkyLightLevel 方法

<RestrictedMode/> <Version add="2.3.0"/>

获取该方块的天空光照亮度。

```typescript
getSkyLightLevel(): number;
```

**返回值**：number，返回该方块的天空光照亮度。

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

#### isLiquidBlocking 方法

```typescript
isLiquidBlocking(liquidType: LiquidType): boolean;
```

#### liquidCanFlowFromDirection 方法

```typescript
liquidCanFlowFromDirection(liquidType: LiquidType, flowDirection: Direction): boolean;
```

#### liquidSpreadCausesSpawn 方法

```typescript
liquidSpreadCausesSpawn(liquidType: LiquidType): boolean;
```

#### matches 方法

```typescript
matches(blockName: string, states?: Record<string, boolean | number | string>): boolean;
```

#### north 方法

```typescript
north(steps?: number): Block | undefined;
```

#### offset 方法

```typescript
offset(offset: Vector3): Block | undefined;
```

#### setPermutation 方法

```typescript
setPermutation(permutation: BlockPermutation): void;
```

#### setType 方法

```typescript
setType(blockType: BlockType | string): void;
```

#### setWaterlogged 方法

```typescript
setWaterlogged(isWaterlogged: boolean): void;
```

#### south 方法

```typescript
south(steps?: number): Block | undefined;
```

#### west 方法

```typescript
west(steps?: number): Block | undefined;
```

### BlockType 类

包含方块类型信息，但注意不包含方块置换信息。

```typescript
class BlockType {
    private constructor();
    readonly id: string;
    readonly localizationKey: string;
}
```

#### 属性

- <ReadOnly/> id: string，表示方块类型，例如`minecraft:acacia_stairs`。
- <ReadOnly/> localizationKey: string，表示方块在语言文件`.lang`中使用的本地化键名。

### BlockPermutation 类

同时包含方块类型[BlockType](#blocktype-类)和方块相关属性（或方块状态）信息。

<details>
<summary> 示例：addTranslatedSign.ts </summary>

```typescript
import { world, BlockPermutation, BlockSignComponent, BlockComponentTypes, DimensionLocation } from '@minecraft/server';
import { MinecraftBlockTypes } from '@minecraft/vanilla-data';

function addTranslatedSign(log: (message: string, status?: number) => void, targetLocation: DimensionLocation) {
    const players = world.getPlayers();

    const dim = players[0].dimension;

    const signBlock = dim.getBlock(targetLocation);

    if (!signBlock) {
        log('Could not find a block at specified location.');
        return -1;
    }
    const signPerm = BlockPermutation.resolve(MinecraftBlockTypes.StandingSign, { ground_sign_direction: 8 });

    signBlock.setPermutation(signPerm);

    const signComponent = signBlock.getComponent(BlockComponentTypes.Sign) as BlockSignComponent;

    signComponent?.setText({ translate: 'item.skull.player.name', with: [players[0].name] });
}
```

</details>

```typescript
class BlockPermutation {
    private constructor();
    readonly localizationKey: string;
    readonly 'type': BlockType;
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
    matches<T extends string = minecraftvanilladata.MinecraftBlockTypes>(
        blockName: T,
        states?: BlockStateArg<T>,
    ): boolean;
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

- <ReadOnly/> localizationKey: string
- <ReadOnly/> type: [BlockType](#blocktype-类)

#### canBeDestroyedByLiquidSpread 方法

```typescript
canBeDestroyedByLiquidSpread(liquidType: LiquidType): boolean;
```

#### canContainLiquid 方法

```typescript
canContainLiquid(liquidType: LiquidType): boolean;
```

#### getAllStates 方法

```typescript
getAllStates(): Record<string, boolean | number | string>;
```

#### getItemStack 方法

```typescript
getItemStack(amount?: number): ItemStack | undefined;
```

#### getState 方法

```typescript
getState<T extends keyof minecraftvanilladata.BlockStateSuperset>(stateName: T): minecraftvanilladata.BlockStateSuperset[T] | undefined;
```

#### getTags 方法

```typescript
getTags(): string[];
```

#### hasTag 方法

```typescript
hasTag(tag: string): boolean;
```

#### isLiquidBlocking 方法

```typescript
isLiquidBlocking(liquidType: LiquidType): boolean;
```

#### liquidSpreadCausesSpawn 方法

```typescript
liquidSpreadCausesSpawn(liquidType: LiquidType): boolean;
```

#### matches 方法

```typescript
matches<T extends string = minecraftvanilladata.MinecraftBlockTypes>(blockName: T, states?: BlockStateArg<T>): boolean;
```

#### withState 方法

```typescript
withState<T extends keyof minecraftvanilladata.BlockStateSuperset>(name: T, value: minecraftvanilladata.BlockStateSuperset[T]): BlockPermutation;
```

#### resolve 静态方法

```typescript
static resolve<T extends string = minecraftvanilladata.MinecraftBlockTypes>(blockName: T, states?: BlockStateArg<T>): BlockPermutation;
```

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
