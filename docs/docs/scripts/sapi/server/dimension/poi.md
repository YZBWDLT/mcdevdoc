---
sidebar_position: 5
---

# 兴趣点

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录兴趣点（POI）相关接口。

---

## 兴趣点

### PoiManager 类

<Version type="script" experimental="测试版API"/>

兴趣点管理器，提供对维度中方块兴趣点的访问。

```typescript
class PoiManager {
    private constructor();
    readonly blocks: PoiBlockManager;
}
```

#### 属性

- <ReadOnly/> blocks: [PoiBlockManager](#poiblockmanager-类)，提供对维度中方块兴趣点的访问。

### PoiBlockManager 类

<Version type="script" experimental="测试版API"/>

方块兴趣点管理器，用于查询、认领与释放方块兴趣点。

```typescript
class PoiBlockManager {
    private constructor();
    addTemporary(position: Vector3, poi: PoiBlockType | string | number): void;
    at(position: Vector3): PoiBlockType | undefined;
    exists(position: Vector3, filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter): boolean;
    getInRange(
        filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter,
        center: Vector3,
        blockRadius: number,
        occupancyFilter?: PoiBlockOccupancyFilter,
    ): PoiBlockInstance[];
    getInRangeSorted(
        filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter,
        center: Vector3,
        blockRadius: number,
        occupancyFilter?: PoiBlockOccupancyFilter,
    ): PoiDistancePair[];
    getInSquare(
        filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter,
        center: Vector3,
        blockRadius: number,
        occupancyFilter?: PoiBlockOccupancyFilter,
    ): PoiBlockInstance[];
    release(center: Vector3): boolean;
    take(
        filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter,
        center: Vector3,
        blockRadius: number,
    ): Vector3 | undefined;
}
```

#### addTemporary 方法

<RestrictedMode inline/>

```typescript
addTemporary(position: Vector3, poi: PoiBlockType | string | number): void
```

- position: [Vector3](../../server/general#vector3-接口)，要添加临时兴趣点的位置。
- poi: [PoiBlockType](#poiblocktype-类) | string | number，兴趣点类型、名称或 ID。

#### at 方法

<RestrictedMode inline/>

```typescript
at(position: Vector3): PoiBlockType | undefined
```

- position: [Vector3](../../server/general#vector3-接口)，要查询的位置。

**返回值**：[PoiBlockType](#poiblocktype-类) | undefined，该位置的兴趣点类型；若不存在则为`undefined`。

#### exists 方法

<RestrictedMode inline/>

```typescript
exists(
    position: Vector3,
    filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter,
): boolean
```

- position: [Vector3](../../server/general#vector3-接口)，要查询的位置。
- filter: ((arg0: [PoiBlockType](#poiblocktype-类)) =&gt; boolean) | [PoiNameFilter](#poinamefilter-接口) | [PoiTagFilter](#poitagfilter-接口)，要匹配的类型筛选。

**返回值**：boolean，该位置存在匹配筛选的兴趣点则为`true`。

#### getInRange 方法

<RestrictedMode inline/>

```typescript
getInRange(
    filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter,
    center: Vector3,
    blockRadius: number,
    occupancyFilter?: PoiBlockOccupancyFilter,
): PoiBlockInstance[]
```

- filter: ((arg0: [PoiBlockType](#poiblocktype-类)) =&gt; boolean) | [PoiNameFilter](#poinamefilter-接口) | [PoiTagFilter](#poitagfilter-接口)，要匹配的类型筛选。
- center: [Vector3](../../server/general#vector3-接口)，查询中心位置。
- blockRadius: number，查询半径（方块数）。
- occupancyFilter?: [PoiBlockOccupancyFilter](#poiblockoccupancyfilter-枚举)，占用筛选（可选）。

**返回值**：[PoiBlockInstance](#poiblockinstance-类)[]，匹配类型与占用筛选、且在指定距离内的兴趣点实例数组。

#### getInRangeSorted 方法

<RestrictedMode inline/>

```typescript
getInRangeSorted(
    filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter,
    center: Vector3,
    blockRadius: number,
    occupancyFilter?: PoiBlockOccupancyFilter,
): PoiDistancePair[]
```

- filter: ((arg0: [PoiBlockType](#poiblocktype-类)) =&gt; boolean) | [PoiNameFilter](#poinamefilter-接口) | [PoiTagFilter](#poitagfilter-接口)，要匹配的类型筛选。
- center: [Vector3](../../server/general#vector3-接口)，查询中心位置。
- blockRadius: number，查询半径（方块数）。
- occupancyFilter?: [PoiBlockOccupancyFilter](#poiblockoccupancyfilter-枚举)，占用筛选（可选）。

**返回值**：[PoiDistancePair](#poidistancepair-接口)[]，匹配的兴趣点实例按距离排序的对数组。

#### getInSquare 方法

<RestrictedMode inline/>

```typescript
getInSquare(
    filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter,
    center: Vector3,
    blockRadius: number,
    occupancyFilter?: PoiBlockOccupancyFilter,
): PoiBlockInstance[]
```

- filter: ((arg0: [PoiBlockType](#poiblocktype-类)) =&gt; boolean) | [PoiNameFilter](#poinamefilter-接口) | [PoiTagFilter](#poitagfilter-接口)，要匹配的类型筛选。
- center: [Vector3](../../server/general#vector3-接口)，查询中心位置。
- blockRadius: number，查询半径（方块数）。
- occupancyFilter?: [PoiBlockOccupancyFilter](#poiblockoccupancyfilter-枚举)，占用筛选（可选）。

**返回值**：[PoiBlockInstance](#poiblockinstance-类)[]，匹配类型与占用筛选、且在轴对齐方形内的兴趣点实例数组。

#### release 方法

<RestrictedMode inline/>

```typescript
release(center: Vector3): boolean
```

- center: [Vector3](../../server/general#vector3-接口)，要释放票据的兴趣点位置。

**返回值**：boolean，若成功释放票据则为`true`；若不存在兴趣点或没有可释放票据则为`false`。

#### take 方法

<RestrictedMode inline/>

```typescript
take(
    filter: ((arg0: PoiBlockType) => boolean) | PoiNameFilter | PoiTagFilter,
    center: Vector3,
    blockRadius: number,
): Vector3 | undefined
```

- filter: ((arg0: [PoiBlockType](#poiblocktype-类)) =&gt; boolean) | [PoiNameFilter](#poinamefilter-接口) | [PoiTagFilter](#poitagfilter-接口)，要匹配的类型筛选。
- center: [Vector3](../../server/general#vector3-接口)，查询中心位置。
- blockRadius: number，查询半径（方块数）。

**返回值**：[Vector3](../../server/general#vector3-接口) | undefined，认领到兴趣点的方块位置；若范围内无可用兴趣点则为`undefined`。

### PoiBlockType 类

<Version type="script" experimental="测试版API"/>

方块兴趣点类型。

```typescript
class PoiBlockType {
    private constructor();
    readonly id: number;
    readonly name: string;
    readonly tickets: number;
    readonly usableRange: number;
    equals(other: PoiBlockType): boolean;
    hasTag(tag: string): boolean;
}
```

#### 属性

- <ReadOnly/> id: number，该兴趣点类型的数字标识符。
- <ReadOnly/> name: string，该兴趣点类型的命名空间标识符。
- <ReadOnly/> tickets: number，可从该类型每个兴趣点实例认领的最大票据数。
- <ReadOnly/> usableRange: number，该兴趣点类型视为可用的最大范围（方块数）。

#### equals 方法

<RestrictedMode inline/>

```typescript
equals(other: PoiBlockType): boolean
```

- other: [PoiBlockType](#poiblocktype-类)，要比较的兴趣点类型。

**返回值**：boolean，两个对象描述同一兴趣点类型则为`true`。

#### hasTag 方法

<RestrictedMode inline/>

```typescript
hasTag(tag: string): boolean
```

- tag: string，要检查的标签。

**返回值**：boolean，该类型包含指定标签则为`true`。

### PoiBlockInstance 类

<Version type="script" experimental="测试版API"/>

方块兴趣点实例。

```typescript
class PoiBlockInstance {
    private constructor();
    readonly position: Vector3;
    readonly tickets: number;
    readonly "type": PoiBlockType;
}
```

#### 属性

- <ReadOnly/> position: [Vector3](../../server/general#vector3-接口)，该兴趣点实例的方块位置。
- <ReadOnly/> tickets: number，该兴趣点实例当前可认领的票据数。
- <ReadOnly/> "type": [PoiBlockType](#poiblocktype-类)，该兴趣点实例的类型。

---

## 筛选

### PoiBlockOccupancyFilter 枚举

<Version type="script" experimental="测试版API"/>

方块兴趣点占用筛选。

```typescript
enum PoiBlockOccupancyFilter {
    Any = "Any", // 包含所有兴趣点实例，无论占用情况或可用票据数
    Full = "Full", // 只包含无可用票据的兴趣点实例
    HasVacancy = "HasVacancy", // 只包含至少有一张票据可认领的兴趣点实例
}
```

### PoiNameFilter 接口

<Version type="script" experimental="测试版API"/>

兴趣点名称筛选。

```typescript
interface PoiNameFilter {
    name: string;
}
```

#### 属性

- name: string，要匹配的兴趣点类型命名空间标识符（精确匹配）。

### PoiTagFilter 接口

<Version type="script" experimental="测试版API"/>

兴趣点标签筛选。

```typescript
interface PoiTagFilter {
    tags: string[];
}
```

#### 属性

- tags: string[]，匹配类型必须包含的命名空间兴趣点标签，数组中的所有标签都必须满足。

### PoiDistancePair 接口

<Version type="script" experimental="测试版API"/>

兴趣点距离对，记录兴趣点实例到查询中心的距离。

```typescript
interface PoiDistancePair {
    distance: number;
    poi: PoiBlockInstance;
}
```

#### 属性

- distance: number，从查询中心到兴趣点位置的三维距离的平方（方块²）。
- poi: [PoiBlockInstance](#poiblockinstance-类)，该距离处的兴趣点实例。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
