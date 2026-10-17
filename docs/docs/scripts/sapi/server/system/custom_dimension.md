---
sidebar_position: 6
---

# 自定义维度

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Static from "/src/components/highlight/static"
import EarlyExecution from "/src/components/highlight/earlyExecution"

本文主要记录自定义维度相关接口。

---

## 注册

### DimensionRegistry 类

<Version type="script" add="2.8.0"/>

提供注册自定义维度的功能。自定义维度只能在系统启动事件期间注册。

```typescript
class DimensionRegistry {
    private constructor();
    registerCustomDimension(typeId: string): void;
}
```

#### registerCustomDimension 方法

<EarlyExecution/>

注册一个新的自定义维度类型。

```typescript
registerCustomDimension(typeId: string): void
```

- typeId: string，要注册的自定义维度类型标识符。

---

## 维度类型

### DimensionType 类

<Version type="script" add="1.9.0"/>

表示维度类型。目前仅适用于原版维度。

```typescript
class DimensionType {
    private constructor();
    readonly typeId: string;
}
```

#### 属性

- <ReadOnly/> typeId: string，维度类型的标识符。

### DimensionTypes 类

<Version type="script" add="1.9.0"/>

用于访问所有可用的维度类型。目前仅适用于原版维度。

```typescript
class DimensionTypes {
    private constructor();
    static get(dimensionTypeId: string): DimensionType | undefined;
    static getAll(): DimensionType[];
}
```

#### get 方法

<Static/> <EarlyExecution/>

获取指定标识符的维度类型。

```typescript
static get(dimensionTypeId: string): DimensionType | undefined
```

- dimensionTypeId: string，要获取的维度类型标识符。

**返回值**：[DimensionType](#dimensiontype-类) | undefined，指定标识符的维度类型；若不存在则为`undefined`。

#### getAll 方法

<Static/> <EarlyExecution/>

获取所有可用的维度类型。

```typescript
static getAll(): DimensionType[]
```

**返回值**：[DimensionType](#dimensiontype-类)[]，所有可用的维度类型组成的数组。

---

## 错误

### CustomDimensionAlreadyRegisteredError 类

<Version type="script" add="2.8.0"/>

注册的自定义维度名称已被占用时抛出该错误。

继承自Error。

```typescript
class CustomDimensionAlreadyRegisteredError extends Error {
    private constructor();
}
```

### CustomDimensionInvalidRegistryError 类

<Version type="script" add="2.8.0"/>

在系统启动事件之外注册自定义维度时抛出该错误。

继承自Error。

```typescript
class CustomDimensionInvalidRegistryError extends Error {
    private constructor();
}
```

### CustomDimensionNameError 类

<Version type="script" add="2.8.0"/>

自定义维度的名称含有不合法字符时抛出该错误。

继承自Error。

```typescript
class CustomDimensionNameError extends Error {
    private constructor();
}
```

### CustomDimensionReloadNewDimensionError 类

<Version type="script" add="2.8.0"/>

重新加载时注册了此前不存在的自定义维度时抛出该错误；重新加载期间不能新增自定义维度。

继承自Error。

```typescript
class CustomDimensionReloadNewDimensionError extends Error {
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
