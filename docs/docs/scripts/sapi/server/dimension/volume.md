---
sidebar_position: 3
---

# 方块体积

import Version from "/src/components/highlight/version"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录方块体积相关接口。

---

## 方块体积

### BlockVolume 类

<Version type="script" add="1.15.0"/>

由两个对角位置定义的长方体方块区域。

继承自[BlockVolumeBase](#blockvolumebase-类)。

```typescript
class BlockVolume extends BlockVolumeBase {
    constructor(from: Vector3, to: Vector3);
    "from": Vector3;
    to: Vector3;
    doesLocationTouchFaces(pos: Vector3): boolean;
    doesVolumeTouchFaces(other: BlockVolume): boolean;
    intersects(other: BlockVolume): BlockVolumeIntersection;
}
```

#### 属性

- "from": [Vector3](../../server/general#vector3-接口)，该区域的一个对角位置。
- to: [Vector3](../../server/general#vector3-接口)，该区域的另一个对角位置。

#### doesLocationTouchFaces 方法

判断指定位置是否与该区域的表面接触。

```typescript
doesLocationTouchFaces(pos: Vector3): boolean
```

- pos: [Vector3](../../server/general#vector3-接口)，要判断的位置。

**返回值**：boolean，相接时返回`true`。

#### doesVolumeTouchFaces 方法

判断另一个方块区域是否与该区域的表面接触。

```typescript
doesVolumeTouchFaces(other: BlockVolume): boolean
```

- other: [BlockVolume](#blockvolume-类)，要判断的另一个方块区域。

**返回值**：boolean，相接时返回`true`。

#### intersects 方法

返回该区域与另一个方块区域的相交关系。

```typescript
intersects(other: BlockVolume): BlockVolumeIntersection
```

- other: [BlockVolume](#blockvolume-类)，要比较的另一个方块区域。

**返回值**：[BlockVolumeIntersection](#blockvolumeintersection-枚举)，两个区域的相交关系。

### BlockVolumeBase 类

<Version type="script" add="1.11.0"/>

方块体积的基类，表示世界中由方块组成的一块区域。

```typescript
class BlockVolumeBase {
    private constructor();
    getBlockLocationIterator(): BlockLocationIterator;
    getCapacity(): number;
    getClosest(count: number, location: Vector3): Vector3[];
    getFarthest(count: number, location: Vector3): Vector3[];
    getMax(): Vector3;
    getMin(): Vector3;
    getSpan(): Vector3;
    isInside(location: Vector3): boolean;
    translate(delta: Vector3): void;
    getBoundingBox(): BlockBoundingBox;
}
```

#### getBlockLocationIterator 方法

<Version type="script" add="1.15.0" inline/>

返回一个方块位置迭代器，其中包含该体积内的全部方块坐标。

```typescript
getBlockLocationIterator(): BlockLocationIterator
```

**返回值**：[BlockLocationIterator](#blocklocationiterator-类)，遍历该体积内全部方块坐标的迭代器。

#### getCapacity 方法

返回该体积的方块总数，即长 × 宽 × 高。

```typescript
getCapacity(): number
```

**返回值**：number，该体积内的方块总数。

#### getClosest 方法

<Version type="script" add="2.10.0" inline/>

返回体积内距离指定位置最近的若干个方块坐标，按距离由近到远排列。

```typescript
getClosest(count: number, location: Vector3): Vector3[]
```

- count: number，返回的方块坐标数量。
- location: [Vector3](../../server/general#vector3-接口)，用于计算距离的参照位置。

**返回值**：[Vector3](../../server/general#vector3-接口)[]，距离最近的若干个方块坐标，按距离由近到远排列。

#### getFarthest 方法

<Version type="script" add="2.10.0" inline/>

返回体积内距离指定位置最远的若干个方块坐标，按距离由远到近排列。

```typescript
getFarthest(count: number, location: Vector3): Vector3[]
```

- count: number，返回的方块坐标数量。
- location: [Vector3](../../server/general#vector3-接口)，用于计算距离的参照位置。

**返回值**：[Vector3](../../server/general#vector3-接口)[]，距离最远的若干个方块坐标，按距离由远到近排列。

#### getMax 方法

返回该体积较大的一角坐标，保证不小于最小角。

```typescript
getMax(): Vector3
```

**返回值**：[Vector3](../../server/general#vector3-接口)，该体积较大的一角坐标。

#### getMin 方法

返回该体积较小的一角坐标，保证不大于最大角。

```typescript
getMin(): Vector3
```

**返回值**：[Vector3](../../server/general#vector3-接口)，该体积较小的一角坐标。

#### getSpan 方法

返回一个向量，其各分量分别表示该体积沿各轴的方块数量。

```typescript
getSpan(): Vector3
```

**返回值**：[Vector3](../../server/general#vector3-接口)，该体积沿各轴的方块数量。

#### isInside 方法

判断指定的世界方块坐标是否位于该体积内。

```typescript
isInside(location: Vector3): boolean
```

- location: [Vector3](../../server/general#vector3-接口)，待判断的世界方块坐标。

**返回值**：boolean，`true` 表示该坐标位于体积内。

#### translate 方法

将该体积整体移动指定的方块数量。

```typescript
translate(delta: Vector3): void
```

- delta: [Vector3](../../server/general#vector3-接口)，移动的方块数量。

#### getBoundingBox 方法

<Version type="script" experimental="测试版API" inline/>

返回该体积的包围盒。

```typescript
getBoundingBox(): BlockBoundingBox
```

**返回值**：[BlockBoundingBox](../../server/world/structure#blockboundingbox-接口)，表示该体积有效最小、最大坐标的包围盒。

### ListBlockVolume 类

<Version type="script" add="1.11.0"/>

由一组互不相同的方块坐标组成的体积，坐标的先后顺序不影响结果。

继承自[BlockVolumeBase](#blockvolumebase-类)。

```typescript
class ListBlockVolume extends BlockVolumeBase {
    constructor(locations: Vector3[]);
    add(locations: Vector3[]): void;
    remove(locations: Vector3[]): void;
}
```

#### add 方法

向该体积中加入方块坐标。

```typescript
add(locations: Vector3[]): void
```

- locations: [Vector3](../../server/general#vector3-接口)[]，要加入该体积的方块坐标数组。

#### remove 方法

从该体积中移除方块坐标。

```typescript
remove(locations: Vector3[]): void
```

- locations: [Vector3](../../server/general#vector3-接口)[]，要从该体积移除的方块坐标数组。

### BlockLocationIterator 类

<Version type="script" add="1.15.0"/>

遍历方块体积内全部方块坐标的迭代器，可直接用于`for...of`循环。

```typescript
class BlockLocationIterator {
    private constructor();
    next(): IteratorResult<Vector3>;
    isValid(): boolean;
}
```

#### next 方法

<RestrictedMode inline/>

返回迭代器的下一个结果；迭代完毕时返回表示结束的结果。

```typescript
next(): IteratorResult<Vector3>
```

**返回值**：IteratorResult&lt;[Vector3](../../server/general#vector3-接口)&gt;，该迭代器中下一个方块的坐标。

#### isValid 方法

<Version type="script" experimental="测试版API" inline/>

迭代器是否有效。

```typescript
isValid(): boolean
```

**返回值**：boolean，迭代器有效则为`true`。

### BlockVolumeIntersection 枚举

<Version type="script" add="1.15.0"/>

两个方块区域之间的相交关系。

```typescript
enum BlockVolumeIntersection {
    Disjoint = 0, // 两个区域互不相交
    Contains = 1, // 该区域完全包含另一个区域
    Intersects = 2, // 两个区域部分相交
}
```

---

## 方块查询

### BlockQueryOptions 接口

<Version type="script" add="2.10.0"/>

在体积内查询方块时使用的选项，除本接口自身的字段外，还继承了[BlockFilter](../general#blockfilter-接口)的全部筛选字段。

```typescript
interface BlockQueryOptions {
    closest?: number;
    farthest?: number;
    location?: Vector3;
}
```

#### 属性

- <Optional/> closest: number，指定时只返回距离`location`最近的若干个方块，必须大于 0，不能与`farthest`同时使用，且必须设置`location`。
- <Optional/> farthest: number，指定时只返回距离`location`最远的若干个方块，必须大于 0，不能与`closest`同时使用，且必须设置`location`。
- <Optional/> location: [Vector3](../../server/general#vector3-接口)，计算`closest`或`farthest`距离时的参照坐标，设置这两项时必须指定。

---

## 方块填充

### BlockFillOptions 接口

<Version type="script" add="1.16.0"/>

填充方块时的附加选项。

```typescript
interface BlockFillOptions {
    blockFilter?: BlockFilter;
    ignoreChunkBoundErrors?: boolean;
}
```

#### 属性

- <Optional/> blockFilter: [BlockFilter](../../server/general#blockfilter-接口)，指定后，填充操作会包含或排除该筛选条件中列出的方块。
- <Optional/> ignoreChunkBoundErrors: boolean，设为`true`时，填充范围超出已加载区块的部分不会报错，而是跳过这些方块继续填充。

---

## 克隆模式

### CloneMode 枚举

<Version type="script" add="2.10.0"/>

克隆方块时使用的模式。

```typescript
enum CloneMode {
    Copy = 0, // 把源区域的方块克隆到目标区域，源区域保持不变
    ForceCopy = 1, // 把源区域的方块克隆到目标区域，允许源区域与目标区域相互重叠
    Move = 2, // 把源区域的方块克隆到目标区域，并把源区域替换为空气
}
```

---

## 错误

### InvalidIteratorError 类

<Version type="script" add="1.15.0"/>

迭代器已失效时抛出该错误。

继承自Error。

```typescript
class InvalidIteratorError extends Error {
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
