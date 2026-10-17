---
sidebar_position: 1
---

# 维度

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录维度相关接口。

---

## 维度信息

### Dimension 类

<Version type="script" add="1.0.0"/>

表示世界中的一个特定维度，例如主世界、下界或末地。

```typescript
class Dimension {
    private constructor();
    readonly heightRange: minecraftcommon.NumberRange;
    readonly id: string;
    readonly localizationKey: string;
    calculateClosestBiomeFromSeed(pos: Vector3, biomeToFind: BiomeType | string, options?: BiomeSearchOptions): Vector3 | undefined;
    cloneBlocks(beginLocation: Vector3, endLocation: Vector3, destination: Vector3, cloneMode: CloneMode, filter?: BlockFilter): void;
    containsBiomes(volume: BlockVolumeBase, biomeFilter: BiomeFilter, isSuperset: boolean): boolean;
    containsBlock(volume: BlockVolumeBase, filter: BlockFilter, allowUnloadedChunks?: boolean): boolean;
    createExplosion(location: Vector3, radius: number, explosionOptions?: ExplosionOptions): boolean;
    fillBlocks(volume: BlockVolumeBase, block: BlockPermutation | BlockType | string, options?: BlockFillOptions): ListBlockVolume;
    getBiome(location: Vector3): BiomeType;
    getBlock(location: Vector3): Block | undefined;
    getBlockAbove(location: Vector3, options?: BlockRaycastOptions): Block | undefined;
    getBlockBelow(location: Vector3, options?: BlockRaycastOptions): Block | undefined;
    getBlockFromRay(location: Vector3, direction: Vector3, options?: BlockRaycastOptions): BlockRaycastHit | undefined;
    getBlocks(volume: BlockVolumeBase, options: BlockQueryOptions, allowUnloadedChunks?: boolean): ListBlockVolume;
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
    playSound(soundId: string, location: Vector3, soundOptions?: WorldSoundOptions): SoundInstance;
    runCommand(commandString: string): CommandResult;
    setBlockPermutation(location: Vector3, permutation: BlockPermutation): void;
    setBlockType(location: Vector3, blockType: BlockType | string): void;
    setWeather(weatherType: WeatherType, duration?: number): void;
    spawnEntity(identifier: EntityType | string, location: Vector3, options?: SpawnEntityOptions): Entity;
    spawnItem(itemStack: ItemStack, location: Vector3): Entity;
    spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void;
    spawnXp(location: Vector3, amount: number): void;
}
```

#### 属性

- <Version type="script" add="1.7.0" inline/> <ReadOnly/> heightRange: [minecraftcommon.NumberRange](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/common/numberrange?view=minecraft-bedrock-stable)，该维度的高度范围。
- <ReadOnly/> id: string，该维度的标识符。
- <Version type="script" add="2.1.0" inline/> <ReadOnly/> localizationKey: string，维度名称在语言文件（`.lang`）中使用的本地化键名。

#### calculateClosestBiomeFromSeed 方法

<Version type="script" add="2.9.0" inline/>

根据世界种子计算指定类型生物群系最近的位置。请注意，该操作可能开销较大。

```typescript
calculateClosestBiomeFromSeed(
    pos: Vector3,
    biomeToFind: BiomeType | string,
    options?: BiomeSearchOptions,
): Vector3 | undefined
```

- pos: [Vector3](../general#vector3-接口)，搜索的起始坐标。
- biomeToFind: [BiomeType](./biome#biometype-类) | string，要查找的生物群系类型。
- options?: [BiomeSearchOptions](./biome#biomesearchoptions-接口)，生物群系搜索的选项。

**返回值**：[Vector3](../general#vector3-接口) | undefined，最近位置的坐标；找不到符合条件的生物群系时为`undefined`。

#### cloneBlocks 方法

<Version type="script" add="2.10.0" inline/> <RestrictedMode inline/>

将该维度中一块区域的方块克隆到另一处。

```typescript
cloneBlocks(
    beginLocation: Vector3,
    endLocation: Vector3,
    destination: Vector3,
    cloneMode: CloneMode,
    filter?: BlockFilter,
): void
```

- beginLocation: [Vector3](../general#vector3-接口)，源区域的最小角坐标。
- endLocation: [Vector3](../general#vector3-接口)，源区域的最大角坐标。
- destination: [Vector3](../general#vector3-接口)，克隆到的目标坐标。
- cloneMode: [CloneMode](./volume#clonemode-枚举)，克隆的模式，指定如何处理空气方块与原有方块。
- filter?: [BlockFilter](./volume#blockfilter-接口)，方块筛选项，只有符合筛选条件的方块才会被克隆。

#### containsBiomes 方法

<Version type="script" add="2.6.0" inline/>

检查某区域是否包含指定的生物群系。若该区域部分位于世界边界之外，则只搜索边界内的部分。

```typescript
containsBiomes(volume: BlockVolumeBase, biomeFilter: BiomeFilter, isSuperset: boolean): boolean
```

- volume: [BlockVolumeBase](./volume#blockvolumebase-类)，要检查的方块区域。
- biomeFilter: [BiomeFilter](./biome#biomefilter-接口)，生物群系的筛选项。
- isSuperset: boolean，是否要求该区域内的所有方块都属于筛选的生物群系。

**返回值**：boolean，`true` 表示该区域内存在符合筛选条件的生物群系。

#### containsBlock 方法

<Version type="script" add="1.16.0" inline/>

在该方块体积内搜索满足方块筛选器的方块。

```typescript
containsBlock(
    volume: BlockVolumeBase,
    filter: BlockFilter,
    allowUnloadedChunks?: boolean,
): boolean
```

- volume: [BlockVolumeBase](./volume#blockvolumebase-类)，要检查的方块区域。
- filter: [BlockFilter](./volume#blockfilter-接口)，方块的筛选项。
- allowUnloadedChunks?: boolean，若为`true`，区域部分或全部位于未加载区块时不抛出错误，只处理已加载区块内的方块。默认为`false`。

**返回值**：boolean，`true` 表示该区域内至少有一个方块满足筛选条件。

#### createExplosion 方法

<Version type="script" add="1.9.0" inline/> <RestrictedMode inline/>

在指定位置创建爆炸。

```typescript
createExplosion(location: Vector3, radius: number, explosionOptions?: ExplosionOptions): boolean
```

- location: [Vector3](../general#vector3-接口)，爆炸发生的坐标。
- radius: number，爆炸的半径，以方块为单位，范围从 0 到 1000。
- explosionOptions?: [ExplosionOptions](#explosionoptions-接口)，爆炸的其他选项。

**返回值**：boolean，`true` 表示爆炸成功创建。

#### fillBlocks 方法

<Version type="script" add="1.16.0" inline/> <RestrictedMode inline/>

用指定方块类型填充一片区域。

```typescript
fillBlocks(
    volume: BlockVolumeBase,
    block: BlockPermutation | BlockType | string,
    options?: BlockFillOptions,
): ListBlockVolume
```

- volume: [BlockVolumeBase](./volume#blockvolumebase-类)，要填充的方块区域。
- block: [BlockPermutation](../block/main#blockpermutation-类) | [BlockType](../block/main#blocktype-类) | string，要填充的方块。
- options?: [BlockFillOptions](./volume#blockfilloptions-接口)，方块填充的选项。

**返回值**：[ListBlockVolume](./volume#listblockvolume-类)，包含所有被放置方块的方块体积。

#### getBiome 方法

<Version type="script" add="2.3.0" inline/>

返回指定位置的生物群系类型。

```typescript
getBiome(location: Vector3): BiomeType
```

- location: [Vector3](../general#vector3-接口)，要获取生物群系的坐标。

**返回值**：[BiomeType](./biome#biometype-类)，该位置的生物群系类型。

#### getBlock 方法

<Version type="script" add="1.1.0" inline/>

返回指定位置的方块实例。若该位置位于未加载的区块中，返回`undefined`。

```typescript
getBlock(location: Vector3): Block | undefined
```

- location: [Vector3](../general#vector3-接口)，要获取的方块的坐标。

**返回值**：[Block](../block/main#block-类) | undefined，该位置的方块；若该位置位于未加载的区块中，返回`undefined`。

#### getBlockAbove 方法

<Version type="script" add="2.0.0" inline/>

根据给定选项，获取指定方块位置上方搜索到的第一个方块（默认查找第一个固体方块）。

```typescript
getBlockAbove(location: Vector3, options?: BlockRaycastOptions): Block | undefined
```

- location: [Vector3](../general#vector3-接口)，搜索的起始坐标。
- options?: [BlockRaycastOptions](./raycast#blockraycastoptions-接口)，方块射线检测的选项。

**返回值**：[Block](../block/main#block-类) | undefined，搜索到的第一个方块；未找到时为`undefined`。

#### getBlockBelow 方法

<Version type="script" add="2.0.0" inline/>

根据给定选项，获取指定方块位置下方搜索到的第一个方块（默认查找第一个固体方块）。

```typescript
getBlockBelow(location: Vector3, options?: BlockRaycastOptions): Block | undefined
```

- location: [Vector3](../general#vector3-接口)，搜索的起始坐标。
- options?: [BlockRaycastOptions](./raycast#blockraycastoptions-接口)，方块射线检测的选项。

**返回值**：[Block](../block/main#block-类) | undefined，搜索到的第一个方块；未找到时为`undefined`。

#### getBlockFromRay 方法

<Version type="script" add="1.4.0" inline/>

获取从某位置发出的向量最先相交的方块。

```typescript
getBlockFromRay(
    location: Vector3,
    direction: Vector3,
    options?: BlockRaycastOptions,
): BlockRaycastHit | undefined
```

- location: [Vector3](../general#vector3-接口)，射线起点的坐标。
- direction: [Vector3](../general#vector3-接口)，射线的方向向量。
- options?: [BlockRaycastOptions](./raycast#blockraycastoptions-接口)，方块射线检测的选项。

**返回值**：[BlockRaycastHit](./raycast#blockraycasthit-接口) | undefined，射线命中的方块信息，包含方块本身与命中面；未命中时为`undefined`。

#### getBlocks 方法

<Version type="script" add="1.16.0" inline/>

获取某体积内所有满足筛选器的方块。

```typescript
getBlocks(
    volume: BlockVolumeBase,
    options: BlockQueryOptions,
    allowUnloadedChunks?: boolean,
): ListBlockVolume
```

- volume: [BlockVolumeBase](./volume#blockvolumebase-类)，要获取的方块区域。
- options: [BlockQueryOptions](./volume#blockqueryoptions-接口)，方块查询的选项。
- allowUnloadedChunks?: boolean，若为`true`，区域部分或全部位于未加载区块时不抛出错误，只处理已加载区块内的方块。默认为`false`。

**返回值**：[ListBlockVolume](./volume#listblockvolume-类)，包含所有满足筛选条件方块的方块体积。

#### getEntities 方法

<Version type="script" add="1.1.0" inline/>

根据`EntityQueryOptions`筛选条件返回一组实体。

```typescript
getEntities(options?: EntityQueryOptions): Entity[]
```

- options?: [EntityQueryOptions](../entity_and_player/entity#entityqueryoptions-接口)，实体的筛选项。

**返回值**：[Entity](../entity_and_player/entity#entity-类)[]，符合筛选条件的实体数组。

#### getEntitiesAtBlockLocation 方法

<Version type="script" add="1.1.0" inline/>

返回指定位置处的一组实体。

```typescript
getEntitiesAtBlockLocation(location: Vector3): Entity[]
```

- location: [Vector3](../general#vector3-接口)，方块所在的坐标。

**返回值**：[Entity](../entity_and_player/entity#entity-类)[]，该位置上的实体数组。

#### getEntitiesFromRay 方法

<Version type="script" add="1.4.0" inline/>

获取与从某位置发出的向量相交的实体。

```typescript
getEntitiesFromRay(
    location: Vector3,
    direction: Vector3,
    options?: EntityRaycastOptions,
): EntityRaycastHit[]
```

- location: [Vector3](../general#vector3-接口)，射线起点的坐标。
- direction: [Vector3](../general#vector3-接口)，射线的方向向量。
- options?: [EntityRaycastOptions](./raycast#entityraycastoptions-接口)，实体射线检测的选项。

**返回值**：[EntityRaycastHit](./raycast#entityraycasthit-接口)[]，与射线相交的实体信息数组。

#### getLightLevel 方法

<Version type="script" add="2.3.0" inline/>

返回照射在指定方块位置上的总光照亮度。

```typescript
getLightLevel(location: Vector3): number
```

- location: [Vector3](../general#vector3-接口)，要获取光照亮度的坐标。

**返回值**：number，照射在该位置上的总光照亮度，范围从 0 到 15。

#### getPlayers 方法

<Version type="script" add="1.1.0" inline/>

根据`EntityQueryOptions`筛选条件返回一组玩家。

```typescript
getPlayers(options?: EntityQueryOptions): Player[]
```

- options?: [EntityQueryOptions](../entity_and_player/entity#entityqueryoptions-接口)，玩家的筛选项。

**返回值**：[Player](../entity_and_player/player#player-类)[]，符合筛选条件的玩家数组。

#### getSkyLightLevel 方法

<Version type="script" add="2.3.0" inline/>

返回天空照射在指定方块位置上的光照亮度。

```typescript
getSkyLightLevel(location: Vector3): number
```

- location: [Vector3](../general#vector3-接口)，要获取天空光照亮度的坐标。

**返回值**：number，天空照射在该位置上的光照亮度，范围从 0 到 15。

#### getTopmostBlock 方法

<Version type="script" add="1.13.0" inline/>

返回指定 XZ 位置处最高的方块。

```typescript
getTopmostBlock(locationXZ: VectorXZ, minHeight?: number): Block | undefined
```

- locationXZ: [VectorXZ](../general#vectorxz-接口)，要搜索的 X、Z 坐标。
- minHeight?: number，搜索的起始 Y 坐标，默认为该维度的最大高度。

**返回值**：[Block](../block/main#block-类) | undefined，该 XZ 位置处最高的方块；找不到时为`undefined`。

#### isChunkLoaded 方法

<Version type="script" add="2.3.0" inline/>

若指定位置所在的区块已加载（且可用于脚本），返回`true`。

```typescript
isChunkLoaded(location: Vector3): boolean
```

- location: [Vector3](../general#vector3-接口)，要检查的坐标。

**返回值**：boolean，`true` 表示该位置所在的区块已加载且可供脚本使用。

#### placeFeature 方法

<Version type="script" add="1.19.0" inline/> <RestrictedMode inline/>

将指定的特征放置到该维度的指定位置。

```typescript
placeFeature(featureName: string, location: Vector3, shouldThrow?: boolean): boolean
```

- featureName: string，要放置的特征的名称，例如`minecraft:oak_tree`。
- location: [Vector3](../general#vector3-接口)，放置特征的坐标。
- shouldThrow?: boolean，无法放置时是否抛出错误。默认为`false`。若特征名称无效或位于未加载区块，则始终抛出错误。

**返回值**：boolean，`true` 表示特征放置成功。

#### placeFeatureRule 方法

<Version type="script" add="1.19.0" inline/> <RestrictedMode inline/>

将指定的特征规则放置到该维度的指定位置。

```typescript
placeFeatureRule(featureRuleName: string, location: Vector3): boolean
```

- featureRuleName: string，要使用的特征规则的名称。
- location: [Vector3](../general#vector3-接口)，特征规则生效的坐标。

**返回值**：boolean，`true` 表示特征规则放置成功。

#### playSound 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

为所有玩家播放音效。

```typescript
playSound(soundId: string, location: Vector3, soundOptions?: WorldSoundOptions): SoundInstance
```

- soundId: string，要播放的声音的标识符。
- location: [Vector3](../general#vector3-接口)，播放声音的坐标。
- soundOptions?: [WorldSoundOptions](./sound#worldsoundoptions-接口)，声音播放的选项。

**返回值**：[SoundInstance](./sound#soundinstance-类)，可用于控制该音效的实例。

#### runCommand 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

以该维度的上下文同步执行命令。

```typescript
runCommand(commandString: string): CommandResult
```

- commandString: string，要执行的命令，不需要以斜杠开头。

**返回值**：[CommandResult](#commandresult-接口)，命令的执行结果，包含是否执行成功与错误信息。

#### setBlockPermutation 方法

<Version type="script" add="1.12.0" inline/> <RestrictedMode inline/>

使用方块置换设置世界中的方块。方块置换是带有特定状态的方块。

```typescript
setBlockPermutation(location: Vector3, permutation: BlockPermutation): void
```

- location: [Vector3](../general#vector3-接口)，要设置方块的坐标。
- permutation: [BlockPermutation](../block/main#blockpermutation-类)，要设置的方块置换。

#### setBlockType 方法

<Version type="script" add="1.12.0" inline/> <RestrictedMode inline/>

设置该维度中指定位置的方块。

```typescript
setBlockType(location: Vector3, blockType: BlockType | string): void
```

- location: [Vector3](../general#vector3-接口)，要设置方块的坐标。
- blockType: [BlockType](../block/main#blocktype-类) | string，要设置的方块类型，可以是`BlockType`对象或方块类型的标识符。

#### setWeather 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

设置该维度当前的天气。

```typescript
setWeather(weatherType: WeatherType, duration?: number): void
```

- weatherType: [WeatherType](#weathertype-枚举)，要设置的天气类型。
- duration?: number，天气持续的时长，以游戏刻为单位，范围从 1 到 1000000。若不传入，则在 300 到 900 秒之间随机。

#### spawnEntity 方法

<Version type="script" add="1.3.0" inline/> <RestrictedMode inline/>

在指定位置创建一个新实体（如生物）。

```typescript
spawnEntity(
    identifier: EntityType | string,
    location: Vector3,
    options?: SpawnEntityOptions,
): Entity
```

- identifier: [EntityType](../entity_and_player/entity#entitytype-类) | string，要生成的实体的类型。
- location: [Vector3](../general#vector3-接口)，生成实体的坐标。
- options?: [SpawnEntityOptions](#spawnentityoptions-接口)，生成实体的附加选项。

**返回值**：[Entity](../entity_and_player/entity#entity-类)，新创建的实体。

#### spawnItem 方法

<Version type="script" add="1.3.0" inline/> <RestrictedMode inline/>

在指定位置创建一个物品堆叠实体。

```typescript
spawnItem(itemStack: ItemStack, location: Vector3): Entity
```

- itemStack: [ItemStack](../item/main#itemstack-类)，要生成的物品堆叠。
- location: [Vector3](../general#vector3-接口)，生成物品的坐标。

**返回值**：[Entity](../entity_and_player/entity#entity-类)，新创建的物品实体。

#### spawnParticle 方法

<Version type="script" add="1.5.0" inline/> <RestrictedMode inline/>

在世界中的指定位置创建一个粒子发射器。

```typescript
spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void
```

- effectName: string，要生成的粒子效果的名称。
- location: [Vector3](../general#vector3-接口)，生成粒子的坐标。
- molangVariables?: [MolangVariableMap](#molangvariablemap-类)，Molang 变量表，用于控制粒子的外观。

#### spawnXp 方法

<Version type="script" add="2.11.0" inline/> <RestrictedMode inline/>

在指定位置生成指定数量的经验球。

```typescript
spawnXp(location: Vector3, amount: number): void
```

- location: [Vector3](../general#vector3-接口)，生成经验球的坐标。
- amount: number，要生成的经验值数量。

### SpawnEntityOptions 接口

<Version type="script" add="2.0.0"/>

指定生成实体时的附加选项。

```typescript
interface SpawnEntityOptions {
    initialPersistence?: boolean;
    initialRotation?: number;
    spawnEvent?: string;
}
```

#### 属性

- <Version type="script" add="2.3.0" inline/> <Optional/> initialPersistence: boolean，该实体是否应持久存在于游戏世界中。持久化可防止实体自动消失。
- <Version type="script" add="2.3.0" inline/> <Optional/> initialRotation: number，实体生成时设置的初始旋转角度（单位：度）。
- <Optional/> spawnEvent: string，实体生成后向其发送的生成事件。

---

## 命令结果

### CommandResult 接口

<Version type="script" add="1.0.0"/>

命令执行结果的信息。

```typescript
interface CommandResult {
    readonly successCount: number;
}
```

#### 属性

- <ReadOnly/> successCount: number，若该命令作用于若干实体、方块或物品，则返回命令成功应用的次数。

---

## 爆炸

### ExplosionOptions 接口

<Version type="script" add="1.9.0"/>

[Dimension.createExplosion](#createexplosion-方法)的附加选项。

```typescript
interface ExplosionOptions {
    allowUnderwater?: boolean;
    breaksBlocks?: boolean;
    causesFire?: boolean;
    source?: Entity;
}
```

#### 属性

- <Optional/> allowUnderwater: boolean，爆炸的部分效果是否也能作用于水下。
- <Optional/> breaksBlocks: boolean，爆炸是否会破坏波及范围内的方块。
- <Optional/> causesFire: boolean，设为`true`时，爆炸范围内或附近会伴随产生火焰。
- <Optional/> source: [Entity](../entity_and_player/entity#entity-类)，该爆炸的来源实体。

---

## 天气

### WeatherType 枚举

<Version type="script" add="1.6.0"/>

世界中的天气类型。

```typescript
enum WeatherType {
    Clear = "Clear", // 晴朗天气
    Rain = "Rain", // 下雨天气
    Thunder = "Thunder", // 雷雨天气
}
```

---

## 粒子变量

### MolangVariableMap 类

<Version type="script" add="1.5.0"/>

一组用于定义渲染与动画表现的附加变量值。

```typescript
class MolangVariableMap {
    private constructor();
    setColorRGB(variableName: string, color: RGB): void;
    setColorRGBA(variableName: string, color: RGBA): void;
    setFloat(variableName: string, number: number): void;
    setSpeedAndDirection(variableName: string, speed: number, direction: Vector3): void;
    setVector3(variableName: string, vector: Vector3): void;
}
```

#### setColorRGB 方法

向莫兰中添加该颜色对应的变量：`<变量名>.r` 红色值、`<变量名>.g` 绿色值、`<变量名>.b` 蓝色值，各值取值范围为 0 到 1。

```typescript
setColorRGB(variableName: string, color: RGB): void
```

- variableName: string，所添加颜色的变量名称。
- color: [RGB](../general#rgb-接口)，要写入的颜色。

#### setColorRGBA 方法

在设置颜色的基础上再添加透明度变量`<变量名>.a`，与各颜色分量一样，取值范围为 0 到 1。

```typescript
setColorRGBA(variableName: string, color: RGBA): void
```

- variableName: string，所添加颜色的变量名称。
- color: [RGBA](../general#rgba-接口)，要写入的颜色。

#### setFloat 方法

设置莫兰变量映射中的一个数值。

```typescript
setFloat(variableName: string, number: number): void
```

- variableName: string，所设置数值的变量名称。
- number: number，该变量的取值。

#### setSpeedAndDirection 方法

向莫兰中添加该速度与方向对应的变量：`<变量名>.speed` 速度、`<变量名>.direction_x`、`<变量名>.direction_y`、`<变量名>.direction_z` 方向的分量。

```typescript
setSpeedAndDirection(variableName: string, speed: number, direction: Vector3): void
```

- variableName: string，所添加速度与方向的变量名称。
- speed: number，速度数值。
- direction: [Vector3](../general#vector3-接口)，方向向量。

#### setVector3 方法

向莫兰中添加该向量对应的变量：`<变量名>.x`、`<变量名>.y`、`<变量名>.z` 各分量的值。

```typescript
setVector3(variableName: string, vector: Vector3): void
```

- variableName: string，所添加向量的变量名称。
- vector: [Vector3](../general#vector3-接口)，要写入的向量。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
