---
sidebar_position: 8
---

# 图元形状

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"

本文主要记录图元形状相关接口。

---

## 图元形状

### PrimitiveShapesManager 类

<Version type="script" add="2.8.0"/>

图元形状的管理器，用于在世界上添加与移除文字图元。可通过[World](./main#world-类)的`primitiveShapesManager`属性获取。

```typescript
class PrimitiveShapesManager {
    private constructor();
    readonly maxShapes: number;
    addText(text: TextPrimitive, dimension?: Dimension): void;
    getShapes(options?: PrimitiveShapeQueryOptions): PrimitiveShape[];
    removeAll(): void;
    removeText(text: TextPrimitive): void;
}
```

#### 属性

- <ReadOnly/> maxShapes: number，允许存在的图元形状数量上限。

#### addText 方法

向世界添加一个新的文字图元。

```typescript
addText(text: TextPrimitive, dimension?: Dimension): void
```

- text: [TextPrimitive](#textprimitive-类)，要添加的文字图元。
- dimension?: [Dimension](../dimension/main#dimension-类)

#### getShapes 方法

<Version type="script" add="2.10.0" inline/>

查询管理器中保存的全部图元形状，并以形状句柄数组的形式返回结果。

```typescript
getShapes(options?: PrimitiveShapeQueryOptions): PrimitiveShape[]
```

- options?: [PrimitiveShapeQueryOptions](#primitiveshapequeryoptions-接口)，查询已有形状时的可选筛选条件，用于收窄结果。

**返回值**：[PrimitiveShape](#primitiveshape-类)[]，符合筛选条件的图元形状数组；没有匹配项时为空数组。

#### removeAll 方法

从世界移除全部文字图元。

```typescript
removeAll(): void
```

#### removeText 方法

从世界移除一个文字图元，等同于对该文字图元调用[PrimitiveShape.remove](#remove-方法)。

```typescript
removeText(text: TextPrimitive): void
```

- text: [TextPrimitive](#textprimitive-类)，要移除的文字图元。

### PrimitiveShape 类

<Version type="script" add="2.8.0"/>

图元形状的基类，表示世界中的一个对象及其基础属性。

```typescript
class PrimitiveShape {
    private constructor();
    attachedTo?: Entity;
    color: RGBA;
    readonly dimension: Dimension;
    readonly hasDuration: boolean;
    readonly location: Vector3;
    maximumRenderDistance?: number;
    rotation: Vector3;
    scale: number;
    timeLeft?: number;
    readonly totalTimeLeft?: number;
    visibleTo: Player[];
    remove(): void;
    setLocation(location: DimensionLocation | Vector3): void;
}
```

#### 属性

- <Optional/> attachedTo: [Entity](../entity_and_player/entity#entity-类)，该形状附着到的实体；设置后该形状会跟随实体的根位置，并以自身的`location`作为偏移。
- color: [RGBA](../general#rgba-接口)，该形状的颜色。
- <ReadOnly/> dimension: [Dimension](../dimension/main#dimension-类)，该形状可见的维度；未指定时在所有维度中显示。
- <ReadOnly/> hasDuration: boolean，该形状是否具有有限的存续时间。
- <ReadOnly/> location: [Vector3](../general#vector3-接口)，该形状的位置。
- <Optional/> maximumRenderDistance: number，该图元对每个客户端的最大渲染距离，最小值为 0；未指定时与客户端的渲染距离设置一致。
- rotation: [Vector3](../general#vector3-接口)，该形状的旋转（欧拉角，依次为俯仰角、偏航角、翻滚角）。
- scale: number，该形状的缩放，取值范围 [-1000, 1000]。
- <Optional/> timeLeft: number，该形状自动移除前的剩余时间，以秒为单位；形状没有存续时限时为`undefined`。
- <ReadOnly/> <Optional/> totalTimeLeft: number，该形状自动移除前的初始存续时间，以秒为单位；形状没有存续时限时为`undefined`。
- visibleTo: [Player](../entity_and_player/player#player-类)[]，能看见该形状的玩家列表；留空则对所有玩家可见。

#### remove 方法

从世界移除该形状，之后可通过[PrimitiveShapesManager.addText](#addtext-方法)重新添加。

```typescript
remove(): void
```

#### setLocation 方法

设置该形状的位置与维度；维度为`undefined`时在所有维度中显示。

```typescript
setLocation(location: DimensionLocation | Vector3): void
```

- location: DimensionLocation | [Vector3](../general#vector3-接口)，该形状的新位置，可同时指定维度。

---

## 文字图元

### TextPrimitive 类

<Version type="script" add="2.8.0"/>

图元形状的一种，表示世界中的一个带背景的文字标签。

```typescript
class TextPrimitive extends PrimitiveShape {
    private constructor();
    backfaceVisible: boolean;
    backgroundColorOverride?: RGBA;
    depthTest: boolean;
    lineGapHeight: number;
    readonly text: RawMessage | string;
    textBackfaceVisible: boolean;
    useRotation: boolean;
    setText(text: RawMessage | string): void;
}
```

#### 属性

- backfaceVisible: boolean，是否渲染背景板的背面，默认为`true`；`useRotation`为`false`时始终为`false`。
- <Optional/> backgroundColorOverride: [RGBA](../general#rgba-接口)，文字背景板的颜色；未指定时使用默认颜色。
- depthTest: boolean，是否让文字被方块或实体遮挡，默认为`false`，即始终渲染。
- <Version type="script" add="2.11.0" inline/> lineGapHeight: number，文字各行之间的间距，默认为 0。
- <ReadOnly/> text: [RawMessage](../general#rawmessage-接口) | string，该文字图元上的文字；以[RawMessage](../general#rawmessage-接口)或`RawText`设置过时返回原始文本对象，否则返回字符串。
- textBackfaceVisible: boolean，是否渲染文字的背面，默认为`true`；`useRotation`为`false`时始终为`false`。
- useRotation: boolean，是否让文字不朝向摄像机，而改用该形状自身的旋转。

#### constructor 方法

创建一个文字图元，随后可通过[PrimitiveShapesManager.addText](#addtext-方法)添加到世界。

```typescript
constructor(location: DimensionLocation | Vector3, text: RawMessage | string)
```

- location: DimensionLocation | [Vector3](../general#vector3-接口)，该文字图元的位置，可同时指定维度。
- text: [RawMessage](../general#rawmessage-接口) | string，该文字图元显示的文字。

#### setText 方法

设置该文字图元显示的文字。

```typescript
setText(text: RawMessage | string): void
```

- text: [RawMessage](../general#rawmessage-接口) | string，要显示的文字。

---

## 查询

### PrimitiveShapeQueryOptions 接口

<Version type="script" add="2.10.0"/>

查询图元形状时的可选筛选条件，用于收窄返回结果。

```typescript
interface PrimitiveShapeQueryOptions {
    attachedTo?: Entity;
    location?: Vector3;
    maxDistance?: number;
    minDistance?: number;
}
```

#### 属性

- <Optional/> attachedTo: [Entity](../entity_and_player/entity#entity-类)，指定时只返回附着到该实体的形状。
- <Optional/> location: [Vector3](../general#vector3-接口)，查询的种子位置，与距离相关的属性配合使用。
- <Optional/> maxDistance: number，指定时只包含与`location`距离小于该值的形状。
- <Optional/> minDistance: number，指定时只包含与`location`距离不小于该值的形状。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
