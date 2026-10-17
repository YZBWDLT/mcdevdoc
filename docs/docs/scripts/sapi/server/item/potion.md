---
sidebar_position: 4
---

# 药水

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Static from "/src/components/highlight/static"
import Optional from "/src/components/highlight/optional"

本文主要记录药水相关接口。

---

## 药水

### Potions 类

<Version type="script" add="2.4.0"/>

药水的工具类，用于查询药水效果类型与递送类型，并据此构造药水物品堆叠。

```typescript
class Potions {
    private constructor();
    static getAllDeliveryTypes(): PotionDeliveryType[];
    static getAllEffectTypes(): PotionEffectType[];
    static getDeliveryType(potionDeliveryId: string): PotionDeliveryType | undefined;
    static getEffectType(potionEffectId: string): PotionEffectType | undefined;
    static resolve(potionEffectType: PotionEffectType | string, potionDeliveryType: PotionDeliveryType | string): ItemStack;
}
```

#### getAllDeliveryTypes 方法

<Static/>

获取所有已注册的药水递送类型。

```typescript
static getAllDeliveryTypes(): PotionDeliveryType[]
```

**返回值**：[PotionDeliveryType](#potiondeliverytype-类)[]，所有已注册的药水递送类型组成的数组。

#### getAllEffectTypes 方法

<Static/>

获取所有已注册的药水效果类型。

```typescript
static getAllEffectTypes(): PotionEffectType[]
```

**返回值**：[PotionEffectType](#potioneffecttype-类)[]，所有已注册的药水效果类型组成的数组。

#### getDeliveryType 方法

<Static/>

获取指定标识符的药水递送类型。

```typescript
static getDeliveryType(potionDeliveryId: string): PotionDeliveryType | undefined
```

- potionDeliveryId: string，药水递送类型标识符。

**返回值**：[PotionDeliveryType](#potiondeliverytype-类) | undefined，指定标识符的药水递送类型；若不存在则为`undefined`。

#### getEffectType 方法

<Static/>

获取指定标识符的药水效果类型。

```typescript
static getEffectType(potionEffectId: string): PotionEffectType | undefined
```

- potionEffectId: string，药水效果类型标识符。

**返回值**：[PotionEffectType](#potioneffecttype-类) | undefined，指定标识符的药水效果类型；若不存在则为`undefined`。

#### resolve 方法

<Static/>

由药水效果类型与递送类型构造药水物品堆叠。

```typescript
static resolve(
    potionEffectType: PotionEffectType | string,
    potionDeliveryType: PotionDeliveryType | string,
): ItemStack
```

- potionEffectType: [PotionEffectType](#potioneffecttype-类) | string，药水效果类型，或其标识符。
- potionDeliveryType: [PotionDeliveryType](#potiondeliverytype-类) | string，药水递送类型，或其标识符。

**返回值**：[ItemStack](../../server/item/main#itemstack-类)，由该效果与递送类型构造出的药水物品堆叠。

---

## 效果与递送

### PotionEffectType 类

<Version type="script" add="2.4.0"/>

药水效果类型的句柄，描述药水所施加的状态效果。

```typescript
class PotionEffectType {
    private constructor();
    readonly durationTicks?: number;
    readonly id: string;
}
```

#### 属性

- <ReadOnly/> <Optional/> durationTicks: number，该效果类型的默认持续时间（游戏刻）；若该效果无持续时间则为`undefined`。
- <ReadOnly/> id: string，该效果类型的标识符。

### PotionDeliveryType 类

<Version type="script" add="2.4.0"/>

药水递送类型的句柄，描述药水以何种形式承载。

```typescript
class PotionDeliveryType {
    private constructor();
    readonly id: string;
}
```

#### 属性

- <ReadOnly/> id: string，该递送类型的标识符。

---

## 错误

### InvalidPotionDeliveryTypeError 类

<Version type="script" add="2.4.0"/>

药水的投递类型不合法时抛出该错误。

继承自Error。

```typescript
class InvalidPotionDeliveryTypeError extends Error {
    private constructor();
}
```

### InvalidPotionEffectTypeError 类

<Version type="script" add="2.4.0"/>

药水的状态效果类型不合法时抛出该错误。

继承自Error。

```typescript
class InvalidPotionEffectTypeError extends Error {
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
