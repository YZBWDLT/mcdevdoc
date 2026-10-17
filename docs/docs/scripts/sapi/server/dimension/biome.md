---
sidebar_position: 2
---

# 生物群系

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import Static from "/src/components/highlight/static"

本文主要记录生物群系相关接口。

---

## 生物群系

### BiomeType 类

<Version type="script" add="2.3.0"/>

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
getTags(): string[]
```

**返回值**：string[]，该生物群系的所有标签。

#### hasTags 方法

检查生物群系是否拥有所有给定的标签。

```typescript
hasTags(tags: string[]): boolean
```

- tags: string[]，待检查的生物群系标签列表。

**返回值**：boolean，`true` 表示该生物群系拥有全部给定标签。

### BiomeTypes 类

<Version type="script" add="2.7.0"/>

生物群系的目录，用于按名称获取或列出所有生物群系。

```typescript
class BiomeTypes {
    private constructor();
    static get(typeName: string): BiomeType | undefined;
    static getAll(): BiomeType[];
}
```

#### get 方法

<Static/>

获取指定名称的生物群系。

```typescript
static get(typeName: string): BiomeType | undefined
```

- typeName: string，生物群系名称。

**返回值**：[BiomeType](#biometype-类) | undefined，指定名称的生物群系；若不存在则为`undefined`。

#### getAll 方法

<Static/>

获取所有可用的生物群系。

```typescript
static getAll(): BiomeType[]
```

**返回值**：[BiomeType](#biometype-类)[]，所有可用的生物群系组成的数组。

---

## 筛选与搜索

### BiomeFilter 接口

<Version type="script" add="2.6.0"/>

按生物群系或标签包含、排除生物群系的条件集合，可传给[Dimension.containsBiomes](./main#containsbiomes-方法)。

```typescript
interface BiomeFilter {
    excludeBiomes?: string[];
    excludeTags?: string[];
    includeBiomes?: string[];
    includeTags?: string[];
}
```

#### 属性

- <Optional/> excludeBiomes: string[]，排除指定标识符的生物群系。
- <Optional/> excludeTags: string[]，排除带有指定标签的生物群系。
- <Optional/> includeBiomes: string[]，只包含指定标识符的生物群系。
- <Optional/> includeTags: string[]，只包含带有指定标签的生物群系。

### BiomeSearchOptions 接口

<Version type="script" add="2.9.0"/>

[Dimension.calculateClosestBiomeFromSeed](./main#calculateclosestbiomefromseed-方法)的附加选项。

```typescript
interface BiomeSearchOptions {
    boundingSize?: Vector3;
}
```

#### 属性

- <Optional/> boundingSize: [Vector3](../general#vector3-接口)，搜索时使用的包围盒体积大小。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
