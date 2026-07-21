---
sidebar_position: 2
---

# 生物群系

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import ReadOnly from "/src/components/highlight/readonly"

本文主要记录生物群系相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 维度信息

### BiomeType 类

<Version add="2.3.0"/> <br/>

代表一个生物群系。

```typescript
class BiomeType {
    private constructor();
    readonly id: string;
    getTags(): string[];
    hasTags(tags: string[]): boolean;
}
```

#### 属性

- <ReadOnly/> id: string，生物群系的 ID。

#### getTags 方法

返回该生物群系的所有标签。

```typescript
getTags(): string[];
```

#### hasTags 方法

检查生物群系是否拥有所有给定的标签。

```typescript
hasTags(tags: string[]): boolean;
```

- tags: string[]，待检查的生物群系标签列表。

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
