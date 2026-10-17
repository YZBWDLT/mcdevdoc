---
sidebar_position: 6
---

# 常加载区域

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录常加载区域相关接口。

---

## 常加载区域

### TickingAreaManager 类

<Version type="script" add="2.6.0"/>

管理本附加包添加的临时常加载区域。这些区域受每个附加包固定的区块数量上限约束，与`/tickingarea`命令的限制相互独立；管理器无法修改或查询由其他附加包或命令添加的常加载区域。可通过[World](./main#world-类)的`tickingAreaManager`属性获取。

```typescript
class TickingAreaManager {
    private constructor();
    readonly chunkCount: number;
    readonly maxChunkCount: number;
    createTickingArea(identifier: string, options: TickingAreaOptions): Promise<void>;
    getAllTickingAreas(): TickingArea[];
    getTickingArea(identifier: string | TickingArea): TickingArea | undefined;
    hasCapacity(options: TickingAreaOptions): boolean;
    hasTickingArea(identifier: string): boolean;
    removeAllTickingAreas(): void;
    removeTickingArea(identifier: string | TickingArea): void;
}
```

#### 属性

- <ReadOnly/> chunkCount: number，该管理器当前正在计算的区块数量。
- <ReadOnly/> maxChunkCount: number，该管理器允许的最大区块数量；相互重叠的常加载区域，其区块会重复计入总数。

#### createTickingArea 方法

<RestrictedMode inline/>

创建一个常加载区域，返回的 Promise 会在区域内所有区块加载完成并开始计算后兑现。

```typescript
createTickingArea(identifier: string, options: TickingAreaOptions): Promise<void>
```

- identifier: string，该常加载区域的唯一标识符。
- options: [TickingAreaOptions](#tickingareaoptions-接口)，创建常加载区域的选项。

**返回值**：Promise&lt;void&gt;

#### getAllTickingAreas 方法

<RestrictedMode inline/>

返回该管理器添加的全部常加载区域。

```typescript
getAllTickingAreas(): TickingArea[]
```

**返回值**：[TickingArea](#tickingarea-接口)[]，该管理器添加的全部常加载区域；没有常加载区域时为空数组。

#### getTickingArea 方法

<RestrictedMode inline/>

按标识符返回指定的常加载区域。

```typescript
getTickingArea(identifier: string | TickingArea): TickingArea | undefined
```

- identifier: string | [TickingArea](#tickingarea-接口)，要获取的常加载区域，或其标识符。

**返回值**：[TickingArea](#tickingarea-接口) | undefined，指定的常加载区域；该标识符不存在时为`undefined`。

#### hasCapacity 方法

<RestrictedMode inline/>

判断该管理器是否还有足够的区块余量容纳指定的常加载区域；若区域的长或宽超过 255 个区块也返回`false`。

```typescript
hasCapacity(options: TickingAreaOptions): boolean
```

- options: [TickingAreaOptions](#tickingareaoptions-接口)，待检查的常加载区域选项。

**返回值**：boolean，`true` 表示区块余量足够。

#### hasTickingArea 方法

<RestrictedMode inline/>

判断该管理器中是否已存在指定标识符的常加载区域。

```typescript
hasTickingArea(identifier: string): boolean
```

- identifier: string，要检查的标识符。

**返回值**：boolean，`true` 表示该标识符已存在。

#### removeAllTickingAreas 方法

<RestrictedMode inline/>

移除该管理器添加的全部常加载区域。

```typescript
removeAllTickingAreas(): void
```

#### removeTickingArea 方法

<RestrictedMode inline/>

按标识符移除指定的常加载区域。

```typescript
removeTickingArea(identifier: string | TickingArea): void
```

- identifier: string | [TickingArea](#tickingarea-接口)，要移除的常加载区域，或其标识符。

### TickingArea 接口

<Version type="script" add="2.6.0"/>

一个常加载区域的信息。

```typescript
interface TickingArea {
    boundingBox: BlockBoundingBox;
    chunkCount: number;
    dimension: Dimension;
    identifier: string;
    isFullyLoaded: boolean;
}
```

#### 属性

- boundingBox: [BlockBoundingBox](./structure#blockboundingbox-接口)，包含该常加载区域内全部方块的包围盒。
- chunkCount: number，该常加载区域包含的区块数量。
- dimension: [Dimension](../dimension/main#dimension-类)，该常加载区域所在的维度。
- identifier: string，该常加载区域的唯一标识符。
- isFullyLoaded: boolean，该常加载区域的区块是否已全部加载并开始计算。

### TickingAreaOptions 接口

<Version type="script" add="2.6.0"/>

创建常加载区域的选项。

```typescript
interface TickingAreaOptions {
    dimension: Dimension;
    from: Vector3;
    to: Vector3;
}
```

#### 属性

- dimension: [Dimension](../dimension/main#dimension-类)，该常加载区域所在的维度。
- from: [Vector3](../general#vector3-接口)，包围盒的一个角所在的方块坐标。
- to: [Vector3](../general#vector3-接口)，包围盒的对角所在的方块坐标。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
