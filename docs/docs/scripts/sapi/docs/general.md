---
sidebar_position: 0
---

# 通用

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/version"

本文主要记录通用接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 坐标

### Vector3 接口

表示一个向量。

```typescript
interface Vector3 {
    x: number;
    y: number;
    z: number;
}
```

- x: number，向量的 X 坐标。
- y: number，向量的 Y 坐标。
- z: number，向量的 Z 坐标。

### Vector2 接口

<Version type="script" add="1.3.0"/>

表示一个二维向量。

```typescript
interface Vector2 {
    x: number;
    y: number;
}
```

#### 属性

- x: number，二维向量的 X 分量。
- y: number，二维向量的 Y 分量。

### VectorXZ 接口

<Version type="script" add="1.13.0"/>

表示一个水平面上的二维向量，只有 X、Z 两个分量。

```typescript
interface VectorXZ {
    x: number;
    z: number;
}
```

#### 属性

- x: number，向量的 X 坐标。
- z: number，向量的 Z 坐标。

---

## 颜色

### RGB 接口

<Version type="script" add="1.5.0"/>

表示一个可完全自定义的颜色，各分量取值范围为 0 到 1.0。

```typescript
interface RGB {
    blue: number;
    green: number;
    red: number;
}
```

#### 属性

- blue: number，颜色的蓝色分量。
- green: number，颜色的绿色分量。
- red: number，颜色的红色分量。

### RGBA 接口

<Version type="script" add="1.5.0"/>

在[RGB](#rgb-接口)的基础上追加透明度分量，取值范围为 0（完全透明）到 1.0（完全不透明）。

```typescript
interface RGBA extends RGB {
    alpha: number;
}
```

#### 属性

- alpha: number，颜色的透明度分量。

---

## 碰撞箱

### AABB 接口

<Version type="script" add="2.4.0"/>

表示一个轴对齐的碰撞箱。

```typescript
interface AABB {
    center: Vector3;
    extent: Vector3;
}
```

#### 属性

- center: [Vector3](#vector3-接口)，该碰撞箱的中心点。
- extent: [Vector3](#vector3-接口)，中心点到碰撞箱各边界的距离，相当于长、高、宽的一半，始终按正数处理。

---

## 方向

### Direction 枚举

<Version type="script" add="1.4.0"/>

通用的相对方位枚举。

```typescript
enum Direction {
    Down = "Down", // 该方块下方的方块（y - 1）
    East = "East", // 该方块东侧的方块（x + 1）
    North = "North", // 该方块北侧的方块（z + 1）
    South = "South", // 该方块南侧的方块（z - 1）
    Up = "Up", // 该方块上方的方块（y + 1）
    West = "West", // 该方块西侧的方块（x - 1）
}
```

---

## 原始消息

### RawMessage 接口

<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.RawMessage.html"/>

---

## 组件

### Component 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.Component.html"/>

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
