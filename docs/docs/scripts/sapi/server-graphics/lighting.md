---
sidebar_position: 4
---

# 光照

import Version from "/src/components/highlight/version"
import RestrictedMode from "/src/components/highlight/restrictedMode"
import Button from '/src/components/button/base';

本文记录控制生物群系光照（环境光、日月颜色与照度、闪光）的接口。数值与关键帧的写法见[设置约定](./concepts#数值与关键帧)。

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=sapi" color="green"/>

---

## BiomeLighting 类

<Version type="script-graphics" add="1.0.0"/>

某个生物群系（或某个玩家）的光照设置。实例通过[getBiomeLighting](./main#getbiomelighting-函数)或[getPlayerLighting](./main#getplayerlighting-函数)获取。

调用任何设置方法都需要读写模式。

```typescript
class BiomeLighting {
    private constructor();
    resetAmbientColor(): void;
    resetAmbientIlluminance(): void;
    resetEmissiveDesaturation(): void;
    resetFlashColor(): void;
    resetFlashIlluminance(): void;
    resetMoonColor(): void;
    resetMoonIlluminance(): void;
    resetOrbitalOffsetDegrees(): void;
    resetSkyIntensity(): void;
    resetSunColor(): void;
    resetSunIlluminance(): void;
    setAmbientColor(color: Record<number, RGB> | RGB): void;
    setAmbientIlluminance(illuminance: number | Record<number, number>): void;
    setEmissiveDesaturation(value: number): void;
    setFlashColor(color: Record<number, RGB> | RGB): void;
    setFlashIlluminance(illuminance: number | Record<number, number>): void;
    setMoonColor(color: Record<number, RGB> | RGB): void;
    setMoonIlluminance(illuminance: number | Record<number, number>): void;
    setOrbitalOffsetDegrees(degrees: number | Record<number, number>): void;
    setSkyIntensity(intensity: number | Record<number, number>): void;
    setSunColor(color: Record<number, RGB> | RGB): void;
    setSunIlluminance(illuminance: number | Record<number, number>): void;
}
```

### 设置方法

<RestrictedMode/>

| 方法 | 参数 | 说明 |
| :--- | :--- | :--- |
| `setAmbientColor` | color | 环境光的颜色。 |
| `setAmbientIlluminance` | illuminance | 环境光的照度。 |
| `setEmissiveDesaturation` | value | 自发光的去饱和程度。该方法只接受单个数值，不支持关键帧。 |
| `setFlashColor` | color | 闪光（如闪电照亮天空）的颜色。 |
| `setFlashIlluminance` | illuminance | 闪光的照度。 |
| `setMoonColor` | color | 月光的颜色。 |
| `setMoonIlluminance` | illuminance | 月光的照度。 |
| `setOrbitalOffsetDegrees` | degrees | 天体轨道的偏移角度，以度为单位。 |
| `setSkyIntensity` | intensity | 天空的强度。 |
| `setSunColor` | color | 日光的颜色。 |
| `setSunIlluminance` | illuminance | 日光的照度。 |

颜色类方法的`color`参数可传一个 RGB 三元组，也可传一组以时刻为键的关键帧。照度、强度等方法同理。

### 重置方法

`resetAmbientColor`、`resetAmbientIlluminance`、`resetEmissiveDesaturation`、`resetFlashColor`、`resetFlashIlluminance`、`resetMoonColor`、`resetMoonIlluminance`、`resetOrbitalOffsetDegrees`、`resetSkyIntensity`、`resetSunColor`、`resetSunIlluminance`分别把对应的设置恢复为资源包中设定的值，或行为包此前通过同名`setXxx`设定过的值。

```typescript
resetSunColor(): void
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [`@minecraft/server-graphics` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-graphics/changelog?view=minecraft-bedrock-stable)
