---
sidebar_position: 3
---

# 附魔

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Static from "/src/components/highlight/static"

本文主要记录附魔相关接口。

---

## 附魔

### Enchantment 接口

<Version type="script" add="1.11.0"/>

附魔的实例，记录附魔类型与其等级。

```typescript
interface Enchantment {
    level: number;
    type: EnchantmentType;
}
```

#### 属性

- level: number，该附魔的等级。
- type: [EnchantmentType](#enchantmenttype-类)，该附魔的类型。

### EnchantmentType 类

<Version type="script" add="1.11.0"/>

附魔类型的句柄，用于查询附魔的标识符与最高等级。

```typescript
class EnchantmentType {
    constructor(enchantmentType: string);
    readonly id: string;
    readonly maxLevel: number;
}
```

#### 属性

- <ReadOnly/> id: string，该附魔类型的标识符。
- <ReadOnly/> maxLevel: number，该附魔类型可达到的最高等级。

### EnchantmentTypes 类

<Version type="script" add="1.11.0"/>

附魔类型的目录，用于按标识符查询附魔类型。

```typescript
class EnchantmentTypes {
    private constructor();
    static get(enchantmentId: string): EnchantmentType | undefined;
    static getAll(): EnchantmentType[];
}
```

#### get 方法

<Static/>

获取指定标识符的附魔类型。

```typescript
static get(enchantmentId: string): EnchantmentType | undefined
```

- enchantmentId: string，附魔类型标识符。

**返回值**：[EnchantmentType](#enchantmenttype-类) | undefined，指定标识符的附魔类型；若不存在则为`undefined`。

#### getAll 方法

<Version type="script" add="1.12.0" inline/> <Static/>

获取所有可用的附魔类型。

```typescript
static getAll(): EnchantmentType[]
```

**返回值**：[EnchantmentType](#enchantmenttype-类)[]，所有可用的附魔类型组成的数组。

---

## 附魔槽位

### EnchantmentSlot 枚举

<Version type="script" add="1.11.0"/>

可接受附魔的物品槽位。

```typescript
enum EnchantmentSlot {
    ArmorFeet = "ArmorFeet", // 靴子
    ArmorHead = "ArmorHead", // 头盔
    ArmorLegs = "ArmorLegs", // 护腿
    ArmorTorso = "ArmorTorso", // 胸甲
    Axe = "Axe", // 斧
    Bow = "Bow", // 弓
    CarrotStick = "CarrotStick", // 胡萝卜钓竿
    CosmeticHead = "CosmeticHead", // 装饰性头部槽位
    Crossbow = "Crossbow", // 弩
    Elytra = "Elytra", // 鞘翅
    FishingRod = "FishingRod", // 钓鱼竿
    Flintsteel = "Flintsteel", // 打火石
    Hoe = "Hoe", // 锄
    MeleeSpear = "MeleeSpear", // 近战长矛
    Pickaxe = "Pickaxe", // 镐
    Shears = "Shears", // 剪刀
    Shield = "Shield", // 盾牌
    Shovel = "Shovel", // 锹
    Spear = "Spear", // 长矛
    Sword = "Sword", // 剑
}
```

---

## 错误

### EnchantmentLevelOutOfBoundsError 类

<Version type="script" add="1.11.0"/>

附魔等级超出允许范围时抛出该错误。

继承自Error。

```typescript
class EnchantmentLevelOutOfBoundsError extends Error {
    private constructor();
}
```

### EnchantmentTypeNotCompatibleError 类

<Version type="script" add="1.11.0"/>

附魔类型与物品不兼容时抛出该错误。

继承自Error。

```typescript
class EnchantmentTypeNotCompatibleError extends Error {
    private constructor();
}
```

### EnchantmentTypeUnknownIdError 类

<Version type="script" add="1.11.0"/>

附魔类型的标识符未知时抛出该错误。

继承自Error。

```typescript
class EnchantmentTypeUnknownIdError extends Error {
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
