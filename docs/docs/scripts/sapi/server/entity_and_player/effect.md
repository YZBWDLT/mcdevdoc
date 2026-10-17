---
sidebar_position: 3
---

# 状态效果

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Static from "/src/components/highlight/static"
import Optional from "/src/components/highlight/optional"

本文主要记录实体状态效果相关接口。

---

## 状态效果

### Effect 类

<Version type="script" add="1.3.0"/>

表示已添加到实体上的某种状态效果（例如中毒）。

```typescript
class Effect {
    private constructor();
    readonly amplifier: number;
    readonly displayName: string;
    readonly duration: number;
    readonly isValid: boolean;
    readonly typeId: string;
}
```

#### 属性

- <ReadOnly/> amplifier: number，该状态效果被施加的等级，取值范围通常为 0~4；例如“跳跃提升 II”的等级值为 1。
- <ReadOnly/> displayName: string，该状态效果对玩家友好的名称。
- <ReadOnly/> duration: number，该状态效果的总持续时长，以游戏刻为单位（1 秒等于 20 游戏刻）。
- <ReadOnly/> isValid: boolean，该状态效果实例在当前上下文中是否可用。
- <ReadOnly/> typeId: string，该状态效果的类型标识符。

### EffectType 类

<Version type="script" add="1.3.0"/>

表示可施加到实体上的一种状态效果类型（例如中毒）。

```typescript
class EffectType {
    private constructor();
    getName(): string;
}
```

#### getName 方法

```typescript
getName(): string
```

**返回值**：string，该状态效果类型的标识符。

### EffectTypes 类

<Version type="script" add="1.9.0"/>

状态效果的目录，提供按标识符查询状态效果的方法。

```typescript
class EffectTypes {
    private constructor();
    static get(identifier: string): EffectType | undefined;
    static getAll(): EffectType[];
}
```

#### get 方法

<Static/>

按标识符获取状态效果；该效果不存在时返回`undefined`。

```typescript
static get(identifier: string): EffectType | undefined
```

- identifier: string，状态效果的标识符。

**返回值**：[EffectType](#effecttype-类) | undefined，匹配的状态效果；不存在时为`undefined`。

#### getAll 方法

<Static/>

返回全部状态效果。

```typescript
static getAll(): EffectType[]
```

**返回值**：[EffectType](#effecttype-类)[]，全部状态效果组成的数组。

### EntityEffectOptions 接口

<Version type="script" add="1.3.0"/>

实体状态效果的附加选项。

```typescript
interface EntityEffectOptions {
    amplifier?: number;
    showParticles?: boolean;
}
```

#### 属性

- <Optional/> amplifier: number，状态效果的强度。
- <Optional/> showParticles: boolean，设为`true`时，实体身上会显示粒子。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
