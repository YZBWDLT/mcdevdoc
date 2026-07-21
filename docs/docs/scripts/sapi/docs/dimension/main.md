---
sidebar_position: 1
---

# 维度

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录维度相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 维度信息

### Dimension 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.Dimension.html"/>

```typescript
class Dimension {
    private constructor();
    readonly heightRange: minecraftcommon.NumberRange;
    readonly id: string;
    readonly localizationKey: string;
    containsBiomes(volume: BlockVolumeBase, biomeFilter: BiomeFilter, isSuperset: boolean): boolean;
    containsBlock(volume: BlockVolumeBase, filter: BlockFilter, allowUnloadedChunks?: boolean): boolean;
    createExplosion(location: Vector3, radius: number, explosionOptions?: ExplosionOptions): boolean;
    fillBlocks(volume: BlockVolumeBase, block: BlockPermutation | BlockType | string, options?: BlockFillOptions): ListBlockVolume;
    getBiome(location: Vector3): BiomeType;
    getBlock(location: Vector3): Block | undefined;
    getBlockAbove(location: Vector3, options?: BlockRaycastOptions): Block | undefined;
    getBlockBelow(location: Vector3, options?: BlockRaycastOptions): Block | undefined;
    getBlockFromRay(location: Vector3, direction: Vector3, options?: BlockRaycastOptions): BlockRaycastHit | undefined;
    getBlocks(volume: BlockVolumeBase, filter: BlockFilter, allowUnloadedChunks?: boolean): ListBlockVolume;
    getEntities(options?: EntityQueryOptions): Entity[];
    getEntitiesAtBlockLocation(location: Vector3): Entity[];
    getEntitiesFromRay(location: Vector3, direction: Vector3, options?: EntityRaycastOptions): EntityRaycastHit[];
    getLightLevel(location: Vector3): number;
    getPlayers(options?: EntityQueryOptions): Player[];
    getSkyLightLevel(location: Vector3): number;
    getTopmostBlock(locationXZ: VectorXZ, minHeight?: number): Block | undefined;
    isChunkLoaded(location: Vector3): boolean;
    placeFeature(featureName: string, location: Vector3, shouldThrow?: boolean): boolean;
    placeFeatureRule(featureRuleName: string, location: Vector3): boolean;
    playSound(soundId: string, location: Vector3, soundOptions?: WorldSoundOptions): void;
    runCommand(commandString: string): CommandResult;
    setBlockPermutation(location: Vector3, permutation: BlockPermutation): void;
    setBlockType(location: Vector3, blockType: BlockType | string): void;
    setWeather(weatherType: WeatherType, duration?: number): void;
    spawnEntity(identifier: EntityType | string, location: Vector3, options?: SpawnEntityOptions): Entity;
    spawnItem(itemStack: ItemStack, location: Vector3): Entity;
    spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void;
}
```

#### 属性

- <ReadOnly/> heightRange: NumberRange
- <ReadOnly/> id: string
- <ReadOnly/> <Version add="2.1.0" inline/> localizationKey: string，维度在语言文件中的键名。

#### calculateClosestBiomeFromSeed 方法

```typescript
```

#### cloneBlocks 方法

```typescript
```

#### containsBiomes 方法

```typescript
containsBiomes(volume: BlockVolumeBase, biomeFilter: BiomeFilter, isSuperset: boolean): boolean;
```

#### containsBlock 方法

```typescript
containsBlock(volume: BlockVolumeBase, filter: BlockFilter, allowUnloadedChunks?: boolean): boolean;
```

#### createExplosion 方法

```typescript
createExplosion(location: Vector3, radius: number, explosionOptions?: ExplosionOptions): boolean;
```

#### fillBlocks 方法

```typescript
fillBlocks(volume: BlockVolumeBase, block: BlockPermutation | BlockType | string, options?: BlockFillOptions): ListBlockVolume;
```

#### getBiome 方法

<Version add="2.3.0"/>

```typescript
getBiome(location: Vector3): BiomeType;
```

#### getBlock 方法

```typescript
getBlock(location: Vector3): Block | undefined;
```

#### getBlockAbove 方法

```typescript
getBlockAbove(location: Vector3, options?: BlockRaycastOptions): Block | undefined;
```

#### getBlockBelow 方法

```typescript
getBlockBelow(location: Vector3, options?: BlockRaycastOptions): Block | undefined;
```

#### getBlockFromRay 方法

```typescript
getBlockFromRay(location: Vector3, direction: Vector3, options?: BlockRaycastOptions): BlockRaycastHit | undefined;
```

#### getBlocks 方法

```typescript
getBlocks(volume: BlockVolumeBase, filter: BlockFilter, allowUnloadedChunks?: boolean): ListBlockVolume;
```

#### getEntities 方法

```typescript
getEntities(options?: EntityQueryOptions): Entity[];
```

#### getEntitiesAtBlockLocation 方法

```typescript
getEntitiesAtBlockLocation(location: Vector3): Entity[];
```

#### getEntitiesFromRay 方法

```typescript
getEntitiesFromRay(location: Vector3, direction: Vector3, options?: EntityRaycastOptions): EntityRaycastHit[];
```

#### getGeneratedStructures 方法

```typescript
```

#### getLightLevel 方法

<RestrictedMode/> <Version add="2.3.0"/>

获取特定位置的光照亮度。

```typescript
getLightLevel(location: Vector3): number;
```

**参数**：

- location: [Vector3](../general#vector3-接口)。

**返回值**：number，返回给定位置的光照亮度。

#### getPlayers 方法

```typescript
getPlayers(options?: EntityQueryOptions): Player[];
```

#### getSkyLightLevel 方法

<RestrictedMode/> <Version add="2.3.0"/>

获取特定位置的天空光照亮度。

```typescript
getSkyLightLevel(location: Vector3): number;
```

**参数**：

- location: [Vector3](../general#vector3-接口)。

**返回值**：number，返回给定位置的天空光照亮度。

#### getTopmostBlock 方法

```typescript
getTopmostBlock(locationXZ: VectorXZ, minHeight?: number): Block | undefined;
```

#### getWeather 方法

```typescript
```

#### isChunkLoaded 方法

<Version add="2.3.0"/>

```typescript
isChunkLoaded(location: Vector3): boolean;
```

#### placeFeature 方法

```typescript
placeFeature(featureName: string, location: Vector3, shouldThrow?: boolean): boolean;
```

#### placeFeatureRule 方法

```typescript
placeFeatureRule(featureRuleName: string, location: Vector3): boolean;
```

#### playSound 方法

```typescript
playSound(soundId: string, location: Vector3, soundOptions?: WorldSoundOptions): void;
```

#### runCommand 方法

```typescript
runCommand(commandString: string): CommandResult;
```

#### setBlockPermutation 方法

```typescript
setBlockPermutation(location: Vector3, permutation: BlockPermutation): void;
```

#### setBlockType 方法

```typescript
setBlockType(location: Vector3, blockType: BlockType | string): void;
```

#### setWeather 方法

```typescript
setWeather(weatherType: WeatherType, duration?: number): void;
```

#### spawnEntity 方法

<RestrictedMode/>

在特定位置生成实体。

```typescript
spawnEntity(identifier: EntityType | string, location: Vector3, options?: SpawnEntityOptions): Entity;
```

**参数**：

- identifier: [EntityType](../entity_and_player/entity#entitytype-类) | string，待生成的实体类型。若未指定命名空间，则默认为`minecraft:`。
- location: [Vector3](../general#vector3-接口)，生成实体的位置。
- <Optional/> options: [SpawnEntityOptions](#spawnentityoptions-接口)，生成实体的其他选项。

**返回值**：[Entity](../entity_and_player/entity#entity-类)，返回在给定位置新增的实体信息。

<details>
<summary> 示例：spawnAdultHorse.ts </summary>

```typescript
import { DimensionLocation } from '@minecraft/server';
import { Vector3Utils } from '@minecraft/math';

function spawnAdultHorse(log: (message: string, status?: number) => void, targetLocation: DimensionLocation) {
    log('Create a horse and triggering the ageable_grow_up event, ensuring the horse is created as an adult');
    targetLocation.dimension.spawnEntity(
        'minecraft:horse<minecraft:ageable_grow_up>',
        Vector3Utils.add(targetLocation, { x: 0, y: 1, z: 0 })
    );
}
```

</details>

<details>
<summary> 示例：quickFoxLazyDog.ts </summary>

```typescript
import { DimensionLocation } from '@minecraft/server';
import { MinecraftEntityTypes, MinecraftEffectTypes } from '@minecraft/vanilla-data';

function quickFoxLazyDog(log: (message: string, status?: number) => void, targetLocation: DimensionLocation) {
    const fox = targetLocation.dimension.spawnEntity(MinecraftEntityTypes.Fox, {
        x: targetLocation.x + 1,
        y: targetLocation.y + 2,
        z: targetLocation.z + 3,
    });

    fox.addEffect(MinecraftEffectTypes.Speed, 10, {
        amplifier: 2,
    });
    log('Created a fox.');

    const wolf = targetLocation.dimension.spawnEntity(MinecraftEntityTypes.Wolf, {
        x: targetLocation.x + 4,
        y: targetLocation.y + 2,
        z: targetLocation.z + 3,
    });
    wolf.addEffect(MinecraftEffectTypes.Slowness, 10, {
        amplifier: 2,
    });
    wolf.isSneaking = true;
    log('Created a sneaking wolf.', 1);
}
```

</details>

<details>
<summary> 示例：triggerEvent.ts </summary>

```typescript
import { DimensionLocation } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';

function triggerEvent(targetLocation: DimensionLocation) {
    const creeper = targetLocation.dimension.spawnEntity(MinecraftEntityTypes.Creeper, targetLocation);

    creeper.triggerEvent('minecraft:start_exploding_forced');
}
```

</details>

#### spawnItem 方法

```typescript
spawnItem(itemStack: ItemStack, location: Vector3): Entity;
```

#### spawnParticle 方法

```typescript
spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void;
```

#### spawnXp 方法

```typescript
```

#### stopAllSounds 方法

```typescript
```

#### stopSound 方法

```typescript
```

### SpawnEntityOptions 接口

生成实体时使用的额外选项。

```typescript
interface SpawnEntityOptions {
    initialPersistence?: boolean;
    initialRotation?: number;
    spawnEvent?: string;
}
```

- <Optional/> <Version add="2.3.0" inline/> initialPersistence: boolean，该实体是否持久于世界之中，即不会被刷新掉。
- <Optional/> <Version add="2.3.0" inline/> initialRotation: number，设定实体生成时的初始面向角度，单位：角度。
- <Optional/> spawnEvent: string，实体生成后使用的[生成事件](/docs/docs/entities/events)。

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
