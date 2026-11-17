---
sidebar_position: 3
---

# 大气散射

import Version from "/src/components/highlight/version"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文记录控制生物群系大气散射（天空颜色、雾霾与散射强度）的接口。数值与关键帧的写法见[设置约定](./concepts#数值与关键帧)。

---

## BiomeAtmospherics 类

<Version type="script-graphics" add="1.0.0"/>

某个生物群系（或某个玩家）的大气散射设置。实例通过[getBiomeAtmospherics](./main#getbiomeatmospherics-函数)或[getPlayerAtmospherics](./main#getplayeratmospherics-函数)获取。

调用任何设置方法都需要读写模式。

```typescript
class BiomeAtmospherics {
    private constructor();
    resetHorizonBlendMax(): void;
    resetHorizonBlendMieStart(): void;
    resetHorizonBlendMin(): void;
    resetHorizonBlendStart(): void;
    resetMoonMieStrength(): void;
    resetRayleighStrength(): void;
    resetSkyHorizonColor(): void;
    resetSkyZenithColor(): void;
    resetSunGlareShape(): void;
    resetSunMieStrength(): void;
    setHorizonBlendMax(blendMax: number | Record<number, number>): void;
    setHorizonBlendMieStart(blendMieStart: number | Record<number, number>): void;
    setHorizonBlendMin(blendMin: number | Record<number, number>): void;
    setHorizonBlendStart(blendStart: number | Record<number, number>): void;
    setMoonMieStrength(moonMieStrength: number | Record<number, number>): void;
    setRayleighStrength(rayleighStrength: number | Record<number, number>): void;
    setSkyHorizonColor(color: Record<number, RGB> | RGB): void;
    setSkyZenithColor(color: Record<number, RGB> | RGB): void;
    setSunGlareShape(sunGlareShape: number | Record<number, number>): void;
    setSunMieStrength(sunMieStrength: number | Record<number, number>): void;
}
```

### 设置方法

<RestrictedMode/>

| 方法 | 参数 | 取值范围 | 说明 |
| :--- | :--- | :--- | :--- |
| `setHorizonBlendMax` | blendMax | `0` ~ `1` | 地平线混合的上限。 |
| `setHorizonBlendMieStart` | blendMieStart | `0` ~ `1.2` | 地平线米氏散射混合的起点。 |
| `setHorizonBlendMin` | blendMin | `0` ~ `1` | 地平线混合的下限。 |
| `setHorizonBlendStart` | blendStart | `0` ~ `1` | 地平线混合的起点。 |
| `setMoonMieStrength` | moonMieStrength | `0` ~ `60` | 月球的米氏散射强度。 |
| `setRayleighStrength` | rayleighStrength | `0` ~ `11` | 瑞利散射的强度。 |
| `setSkyHorizonColor` | color | RGB | 天空在地平线处的颜色。 |
| `setSkyZenithColor` | color | RGB | 天空在天顶处的颜色。 |
| `setSunGlareShape` | sunGlareShape | `0` ~ `50` | 太阳眩光的形状。 |
| `setSunMieStrength` | sunMieStrength | `0` ~ `60` | 太阳的米氏散射强度。 |

颜色类方法的`color`参数可传一个 RGB 三元组，也可传一组以时刻为键的关键帧。数值类方法同理。

### 重置方法

`resetHorizonBlendMax`、`resetHorizonBlendMieStart`、`resetHorizonBlendMin`、`resetHorizonBlendStart`、`resetMoonMieStrength`、`resetRayleighStrength`、`resetSkyHorizonColor`、`resetSkyZenithColor`、`resetSunGlareShape`、`resetSunMieStrength`分别把对应的设置恢复为资源包中设定的值，或行为包此前通过同名`setXxx`设定过的值。

```typescript
resetSkyZenithColor(): void
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [`@minecraft/server-graphics` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-graphics/changelog?view=minecraft-bedrock-stable)
