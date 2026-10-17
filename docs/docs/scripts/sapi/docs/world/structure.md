---
sidebar_position: 7
---

# 结构

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录结构相关接口。

---

## 结构

### StructureManager 类

<Version type="script" add="1.10.0"/>

结构的管理器，提供创建、获取、放置与删除结构的接口。可通过[World](./main#world-类)的`structureManager`属性获取。

```typescript
class StructureManager {
    private constructor();
    createEmpty(identifier: string, size: Vector3, saveMode?: StructureSaveMode): Structure;
    createFromWorld(identifier: string, dimension: Dimension, from: Vector3, to: Vector3, options?: StructureCreateOptions): Structure;
    delete(structure: string | Structure): boolean;
    get(identifier: string): Structure | undefined;
    getPackStructureIds(): string[];
    getWorldStructureIds(): string[];
    place(structure: string | Structure, dimension: Dimension, location: Vector3, options?: StructurePlaceOptions): void;
    placeJigsaw(
        pool: string,
        targetJigsaw: string,
        maxDepth: number,
        dimension: Dimension,
        location: Vector3,
        options?: JigsawPlaceOptions,
    ): BlockBoundingBox;
    placeJigsawStructure(
        identifier: string,
        dimension: Dimension,
        location: Vector3,
        options?: JigsawStructurePlaceOptions,
    ): BlockBoundingBox;
}
```

#### createEmpty 方法

<RestrictedMode inline/>

在内存中创建一个空结构，之后可填充方块并通过[Structure.saveToWorld](#savetoworld-方法)保存改动。

```typescript
createEmpty(identifier: string, size: Vector3, saveMode?: StructureSaveMode): Structure
```

- identifier: string，该结构的名称，标识符必须带命名空间且唯一。
- size: [Vector3](../general#vector3-接口)，该结构的尺寸，例如单方块结构的尺寸为`{x: 1, y: 1, z: 1}`。
- saveMode?: [StructureSaveMode](#structuresavemode-枚举)，结构创建时的保存方式，默认为[StructureSaveMode.Memory](#structuresavemode-枚举)。

**返回值**：[Structure](#structure-类)，新创建的结构；标识符不合法时抛出错误。

#### createFromWorld 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

从世界中的方块创建一个新结构，功能等同于`/structure save`命令。

```typescript
createFromWorld(
    identifier: string,
    dimension: Dimension,
    from: Vector3,
    to: Vector3,
    options?: StructureCreateOptions,
): Structure
```

- identifier: string，该结构的名称，标识符必须带命名空间且唯一。
- dimension: [Dimension](../dimension/main#dimension-类)，读取方块所在的维度。
- from: [Vector3](../general#vector3-接口)，包围盒的一个角坐标。
- to: [Vector3](../general#vector3-接口)，包围盒的对角坐标。
- options?: [StructureCreateOptions](#structurecreateoptions-接口)，从世界创建结构的附加选项。

**返回值**：[Structure](#structure-类)，新创建的结构；标识符不合法、结构尺寸超出上限或范围内含有世界边界外的方块时抛出错误。

#### delete 方法

<RestrictedMode inline/>

从内存与世界（若存在）中删除一个结构。

```typescript
delete(structure: string | Structure): boolean
```

- structure: string | [Structure](#structure-类)，要删除的结构，或其标识符。删除后该结构对象将失效。

**返回值**：boolean，`true` 表示该结构已被移除；无法移除时（例如加载自行为包的结构）抛出错误。

#### get 方法

<RestrictedMode inline/>

返回保存到内存或世界中的指定结构。

```typescript
get(identifier: string): Structure | undefined
```

- identifier: string，要获取的结构名称。

**返回值**：[Structure](#structure-类) | undefined，指定的结构；该结构不存在时为`undefined`。

#### getPackStructureIds 方法

<Version type="script" add="2.8.0" inline/> <RestrictedMode inline/>

返回行为包中包含的全部结构的标识符；不包含保存到世界或内存中的结构。

```typescript
getPackStructureIds(): string[]
```

**返回值**：string[]，行为包中包含的结构标识符数组。

#### getWorldStructureIds 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

返回保存到世界与内存中的全部结构的标识符；不包含行为包中包含的结构。

```typescript
getWorldStructureIds(): string[]
```

**返回值**：string[]，保存到世界与内存中的结构标识符数组。

#### place 方法

<RestrictedMode inline/>

将一个结构放置到世界中；放置位置若位于未加载的区块，会排队等待加载。

```typescript
place(
    structure: string | Structure,
    dimension: Dimension,
    location: Vector3,
    options?: StructurePlaceOptions,
): void
```

- structure: string | [Structure](#structure-类)，要放置的结构，或其标识符。
- dimension: [Dimension](../dimension/main#dimension-类)，放置结构所在的维度。
- location: [Vector3](../general#vector3-接口)，放置结构在该维度中的位置。
- options?: [StructurePlaceOptions](#structureplaceoptions-接口)，结构放置的附加选项。

#### placeJigsaw 方法

<Version type="script" add="1.19.0" inline/> <RestrictedMode inline/>

在世界中的指定拼图方块上生成部分拼图结构，用于调试拼图方块之间的连接。

```typescript
placeJigsaw(
    pool: string,
    targetJigsaw: string,
    maxDepth: number,
    dimension: Dimension,
    location: Vector3,
    options?: JigsawPlaceOptions,
): BlockBoundingBox
```

- pool: string，起始模板池的标识符。
- targetJigsaw: string，起始拼图方块的名称，该方块必须至少出现在起始模板池的某个结构模板中。
- maxDepth: number，拼图结构的最大递归深度，取值范围 [1, 20]。
- dimension: [Dimension](../dimension/main#dimension-类)，放置拼图结构所在的维度。
- location: [Vector3](../general#vector3-接口)，拼图结构相对起始拼图方块开始生成的位置。
- options?: [JigsawPlaceOptions](#jigsawplaceoptions-接口)，生成拼图结构时使用的附加选项。

**返回值**：[BlockBoundingBox](#blockboundingbox-接口)，表示该拼图结构最大边界的包围盒；`maxDepth`超出 [1, 20] 范围、生成失败或放置位置含有世界边界外的方块时抛出错误。

#### placeJigsawStructure 方法

<Version type="script" add="1.19.0" inline/> <RestrictedMode inline/>

在世界中的指定位置生成一个拼图结构。

```typescript
placeJigsawStructure(
    identifier: string,
    dimension: Dimension,
    location: Vector3,
    options?: JigsawStructurePlaceOptions,
): BlockBoundingBox
```

- identifier: string，该拼图结构的标识符。
- dimension: [Dimension](../dimension/main#dimension-类)，放置拼图结构所在的维度。
- location: [Vector3](../general#vector3-接口)，拼图结构开始生成的位置；除设置`ignoreStartHeight`选项外，其 y 值会被结构的起始高度覆盖。
- options?: [JigsawStructurePlaceOptions](#jigsawstructureplaceoptions-接口)，生成拼图结构时使用的附加选项。

**返回值**：[BlockBoundingBox](#blockboundingbox-接口)，表示该拼图结构最大边界的包围盒；生成失败或放置位置含有世界边界外的方块时抛出错误。

### Structure 类

<Version type="script" add="1.10.0"/>

表示一个已加载的结构模板（`.mcstructure`文件）。结构可通过`/structure`命令或[StructureManager](#structuremanager-类)的接口放置到世界中。

```typescript
class Structure extends ISerializable {
    private constructor();
    readonly id: string;
    readonly isValid: boolean;
    readonly size: Vector3;
    getBlockPermutation(location: Vector3): BlockPermutation | undefined;
    getIsWaterlogged(location: Vector3): boolean;
    saveAs(identifier: string, saveMode?: StructureSaveMode): Structure;
    saveToWorld(): void;
    setBlockPermutation(location: Vector3, blockPermutation?: BlockPermutation, waterlogged?: boolean): void;
}
```

#### 属性

- <ReadOnly/> id: string，该结构的名称，其标识符必须带命名空间。通过`/structure`命令或结构方块创建的结构，命名空间默认为`mystructure`。
- <ReadOnly/> isValid: boolean，该结构是否有效；结构被删除后会变为无效。
- <ReadOnly/> size: [Vector3](../general#vector3-接口)，该结构的尺寸，单方块结构的尺寸为`{x: 1, y: 1, z: 1}`。

#### getBlockPermutation 方法

返回该结构中指定位置上的方块对应的方块置换。

```typescript
getBlockPermutation(location: Vector3): BlockPermutation | undefined
```

- location: [Vector3](../general#vector3-接口)，相对该结构原点的方块坐标。

**返回值**：[BlockPermutation](../block/main#blockpermutation-类) | undefined，该位置上的方块置换；该位置没有方块时为`undefined`。

#### getIsWaterlogged 方法

返回该结构中指定位置上的方块是否含水。

```typescript
getIsWaterlogged(location: Vector3): boolean
```

- location: [Vector3](../general#vector3-接口)，相对该结构原点的方块坐标。

**返回值**：boolean，`true` 表示该位置上的方块含水；该位置没有方块时为`false`。

#### saveAs 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

创建该结构的副本并以新名称保存。

```typescript
saveAs(identifier: string, saveMode?: StructureSaveMode): Structure
```

- identifier: string，新创建的结构的名称，标识符必须带命名空间且唯一。
- saveMode?: [StructureSaveMode](#structuresavemode-枚举)，该结构的保存方式，默认为保存到世界。

**返回值**：[Structure](#structure-类)，新创建的结构；标识符不合法或原结构已被删除时抛出错误。

#### saveToWorld 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

将改动后的结构保存到世界文件。

```typescript
saveToWorld(): void
```

#### setBlockPermutation 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

设置该结构中指定位置上的方块置换。

```typescript
setBlockPermutation(
    location: Vector3,
    blockPermutation?: BlockPermutation,
    waterlogged?: boolean,
): void
```

- location: [Vector3](../general#vector3-接口)，相对该结构原点的方块坐标。
- blockPermutation?: [BlockPermutation](../block/main#blockpermutation-类)，要设置的方块置换，默认为空。
- waterlogged?: boolean，该方块是否含水，默认为`false`；空气与未定义的方块不能含水。

---

## 创建与保存

### StructureCreateOptions 接口

<Version type="script" add="1.10.0"/>

[StructureManager.createFromWorld](#createfromworld-方法)的附加选项。

```typescript
interface StructureCreateOptions {
    includeBlocks?: boolean;
    includeEntities?: boolean;
    saveMode?: StructureSaveMode;
}
```

#### 属性

- <Optional/> includeBlocks: boolean，是否将方块包含进结构，默认为`true`。
- <Optional/> includeEntities: boolean，是否将实体包含进结构，默认为`true`。
- <Optional/> saveMode: [StructureSaveMode](#structuresavemode-枚举)，结构的保存方式，默认为[StructureSaveMode.World](#structuresavemode-枚举)。

### StructureSaveMode 枚举

<Version type="script" add="1.10.0"/>

结构的保存方式。

```typescript
enum StructureSaveMode {
    Memory = "Memory", // 结构临时保存到内存中，世界关闭后即丢失
    World = "World", // 结构保存到世界文件，在世界多次加载之间持续存在，可通过 StructureManager 的 delete 方法从世界中移除
}
```

---

## 放置

### StructurePlaceOptions 接口

<Version type="script" add="1.10.0"/>

[StructureManager.place](#place-方法)的附加选项。

```typescript
interface StructurePlaceOptions {
    animationMode?: StructureAnimationMode;
    animationSeconds?: number;
    includeBlocks?: boolean;
    includeEntities?: boolean;
    integrity?: number;
    integritySeed?: string;
    mirror?: StructureMirrorAxis;
    rotation?: StructureRotation;
    waterlogged?: boolean;
}
```

#### 属性

- <Optional/> animationMode: [StructureAnimationMode](#structureanimationmode-枚举)，结构放置时的动画方式。
- <Optional/> animationSeconds: number，动画持续的秒数。
- <Optional/> includeBlocks: boolean，是否放置结构中的方块，默认为`true`。
- <Optional/> includeEntities: boolean，是否放置结构中的实体，默认为`true`。
- <Optional/> integrity: number，放置的方块比例，取值 1 表示放置全部方块、0 表示一个都不放；具体放置哪些方块由`integritySeed`随机决定。
- <Optional/> integritySeed: string，决定随机放置哪些方块的种子，默认使用随机种子。
- <Optional/> mirror: [StructureMirrorAxis](#structuremirroraxis-枚举)，结构放置时的镜像轴，默认为`StructureMirrorAxis.None`。
- <Optional/> rotation: [StructureRotation](#structurerotation-枚举)，结构放置时的旋转角度，默认为不旋转。
- <Optional/> waterlogged: boolean，结构放置时是否含水，默认为`false`；设为`true`时，放置在水中的方块会变为含水。

### StructureAnimationMode 枚举

<Version type="script" add="1.10.0"/>

结构放置时的动画方式。

```typescript
enum StructureAnimationMode {
    Blocks = "Blocks", // 方块逐个随机放置，可用 animationSeconds 选项控制全部方块放置完毕所需的时长
    Layers = "Layers", // 方块自下而上逐层放置，可用 animationSeconds 选项控制全部方块放置完毕所需的时长
    None = "None", // 全部方块立即放置
}
```

### StructureMirrorAxis 枚举

<Version type="script" add="1.10.0"/>

结构放置时的镜像轴。

```typescript
enum StructureMirrorAxis {
    None = "None", // 不镜像
    X = "X", // 沿 X 轴镜像
    XZ = "XZ", // 同时沿 X 轴与 Z 轴镜像
    Z = "Z", // 沿 Z 轴镜像
}
```

### StructureRotation 枚举

<Version type="script" add="1.10.0"/>

结构放置时的旋转角度。

```typescript
enum StructureRotation {
    None = "None", // 不旋转
    Rotate180 = "Rotate180", // 旋转 180 度
    Rotate270 = "Rotate270", // 旋转 270 度
    Rotate90 = "Rotate90", // 旋转 90 度
}
```

---

## 拼图结构

### JigsawPlaceOptions 接口

<Version type="script" add="1.19.0"/>

[StructureManager.placeJigsaw](#placejigsaw-方法)的附加选项。

```typescript
interface JigsawPlaceOptions {
    includeEntities?: boolean;
    keepJigsaws?: boolean;
    liquidSettings?: LiquidSettings;
}
```

#### 属性

- <Optional/> includeEntities: boolean，是否包含结构中的实体，默认为`true`。
- <Optional/> keepJigsaws: boolean，生成结构时是否保留拼图方块，默认为`false`。
- <Version type="script" add="2.4.0" inline/> <Optional/> liquidSettings: [LiquidSettings](#liquidsettings-枚举)，可含水方块与已有液体重叠时的处理方式，默认为`ApplyWaterlogging`。

### JigsawStructurePlaceOptions 接口

<Version type="script" add="1.19.0"/>

[StructureManager.placeJigsawStructure](#placejigsawstructure-方法)的附加选项。

```typescript
interface JigsawStructurePlaceOptions {
    ignoreStartHeight?: boolean;
    includeEntities?: boolean;
    keepJigsaws?: boolean;
    liquidSettings?: LiquidSettings;
}
```

#### 属性

- <Optional/> ignoreStartHeight: boolean，是否忽略拼图结构定义中的起始高度并改用指定的 y 坐标，默认为`false`。
- <Optional/> includeEntities: boolean，是否包含结构中的实体，默认为`true`。
- <Optional/> keepJigsaws: boolean，生成结构时是否保留拼图方块，默认为`false`。
- <Version type="script" add="2.4.0" inline/> <Optional/> liquidSettings: [LiquidSettings](#liquidsettings-枚举)，可含水方块与已有液体重叠时的处理方式，默认为`ApplyWaterlogging`。

### LiquidSettings 枚举

<Version type="script" add="2.4.0"/>

可含水方块与已有液体重叠时的处理方式。

```typescript
enum LiquidSettings {
    ApplyWaterlogging = "ApplyWaterlogging", // 可含水方块与已有液体重叠时变为含水
    IgnoreWaterlogging = "IgnoreWaterlogging", // 可含水方块与已有液体重叠时不含水
}
```

---

## 包围盒

### BlockBoundingBox 接口

<Version type="script" add="1.19.0"/>

一个轴对齐的矩形包围盒。它只是数学构造，不与任何方块类型关联：最小值与最大值分别表示矩形的两个对角，因此从 (0, 0, 0) 到 (0, 0, 0) 的矩形尺寸为 (0, 0, 0)。构造时假定其处于合法状态（最小值各分量不大于最大值），但无法保证。

```typescript
interface BlockBoundingBox {
    max: Vector3;
    min: Vector3;
}
```

#### 属性

- max: [Vector3](../general#vector3-接口)，矩形较大的一角坐标。
- min: [Vector3](../general#vector3-接口)，矩形较小的一角坐标。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
