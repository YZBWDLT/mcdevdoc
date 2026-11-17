---
sidebar_position: 6
---

# 调色

import Version from "/src/components/highlight/version"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文记录控制生物群系调色（高光、中间调、阴影与色温）的接口。

---

## BiomeColorGrading 类

<Version type="script-graphics" add="1.0.0"/>

某个生物群系（或某个玩家）的调色设置。实例通过[getBiomeColorGrading](./main#getbiomecolorgrading-函数)或[getPlayerColorGrading](./main#getplayercolorgrading-函数)获取。

调色按亮度把画面分成高光、中间调与阴影三段，每段各有对比度、增益、伽马、偏移与饱和度等参数。该类的设置方法都不支持关键帧，需要读写模式。

```typescript
class BiomeColorGrading {
    private constructor();
    resetHighlightsContrast(): void;
    resetHighlightsGain(): void;
    resetHighlightsGamma(): void;
    resetHighlightsMin(): void;
    resetHighlightsOffset(): void;
    resetHighlightsSaturation(): void;
    resetMidtonesContrast(): void;
    resetMidtonesGain(): void;
    resetMidtonesGamma(): void;
    resetMidtonesOffset(): void;
    resetMidtonesSaturation(): void;
    resetShadowsContrast(): void;
    resetShadowsGain(): void;
    resetShadowsGamma(): void;
    resetShadowsMax(): void;
    resetShadowsOffset(): void;
    resetShadowsSaturation(): void;
    resetTemperature(): void;
    setHighlightsContrast(highlightsContrast: Vector3): void;
    setHighlightsGain(highlightsGain: Vector3): void;
    setHighlightsGamma(highlightsGamma: Vector3): void;
    setHighlightsMin(highlightsMin: number): void;
    setHighlightsOffset(highlightsOffset: Vector3): void;
    setHighlightsSaturation(highlightsSaturation: Vector3): void;
    setMidtonesContrast(midtonesContrast: Vector3): void;
    setMidtonesGain(midtonesGain: Vector3): void;
    setMidtonesGamma(midtonesGamma: Vector3): void;
    setMidtonesOffset(midtonesOffset: Vector3): void;
    setMidtonesSaturation(midtonesSaturation: Vector3): void;
    setShadowsContrast(shadowsContrast: Vector3): void;
    setShadowsGain(shadowsGain: Vector3): void;
    setShadowsGamma(shadowsGamma: Vector3): void;
    setShadowsMax(shadowsMax: number): void;
    setShadowsOffset(shadowsOffset: Vector3): void;
    setShadowsSaturation(shadowsSaturation: Vector3): void;
    setTemperature(temperature: number): void;
}
```

### 设置方法

<RestrictedMode/>

| 方法 | 参数 | 取值范围 | 说明 |
| :--- | :--- | :--- | :--- |
| `setHighlightsContrast` | highlightsContrast | `0` ~ `4`（三分量） | 高光的对比度，即亮暗像素之间的亮度差。 |
| `setHighlightsGain` | highlightsGain | `0` ~ `10`（三分量） | 高光的增益，作为乘数施加到各颜色通道，调整整体亮度。 |
| `setHighlightsGamma` | highlightsGamma | `0` ~ `4`（三分量） | 高光的伽马，作为对最终颜色的指数调整。 |
| `setHighlightsMin` | highlightsMin | `1` ~ `20` | 判定高光的阈值，与场景平均亮度相乘后决定哪些像素算作高光。 |
| `setHighlightsOffset` | highlightsOffset | `-1` ~ `1`（三分量） | 高光的偏移量，与平均亮度相乘后叠加到颜色上。 |
| `setHighlightsSaturation` | highlightsSaturation | `0` ~ `10`（三分量） | 高光的饱和度。取`1`时不改变。 |
| `setMidtonesContrast` | midtonesContrast | `0` ~ `4`（三分量） | 中间调的对比度。 |
| `setMidtonesGain` | midtonesGain | `0` ~ `10`（三分量） | 中间调的增益。 |
| `setMidtonesGamma` | midtonesGamma | `0` ~ `4`（三分量） | 中间调的伽马。 |
| `setMidtonesOffset` | midtonesOffset | `-1` ~ `1`（三分量） | 中间调的偏移量。 |
| `setMidtonesSaturation` | midtonesSaturation | `0` ~ `10`（三分量） | 中间调的饱和度。取`1`时不改变。 |
| `setShadowsContrast` | shadowsContrast | `0` ~ `4`（三分量） | 阴影的对比度。 |
| `setShadowsGain` | shadowsGain | `0` ~ `10`（三分量） | 阴影的增益。 |
| `setShadowsGamma` | shadowsGamma | `0` ~ `4`（三分量） | 阴影的伽马。 |
| `setShadowsMax` | shadowsMax | `0` ~ `1` | 判定阴影的阈值，与场景平均亮度相乘后决定哪些像素算作阴影。 |
| `setShadowsOffset` | shadowsOffset | `-1` ~ `1`（三分量） | 阴影的偏移量。 |
| `setShadowsSaturation` | shadowsSaturation | `0` ~ `10`（三分量） | 阴影的饱和度。取`1`时不改变。 |
| `setTemperature` | temperature | `1000` ~ `15000` | 画面整体的色温，以开尔文为单位。默认值为`6500`，即标准日光。 |

标注「三分量」的参数类型为[Vector3](../server/general#vector3-接口)，三个分量分别对应红、绿、蓝通道。

### 重置方法

`resetHighlightsContrast`、`resetHighlightsGain`、`resetHighlightsGamma`、`resetHighlightsMin`、`resetHighlightsOffset`、`resetHighlightsSaturation`、`resetMidtonesContrast`、`resetMidtonesGain`、`resetMidtonesGamma`、`resetMidtonesOffset`、`resetMidtonesSaturation`、`resetShadowsContrast`、`resetShadowsGain`、`resetShadowsGamma`、`resetShadowsMax`、`resetShadowsOffset`、`resetShadowsSaturation`、`resetTemperature`分别把对应的设置恢复为资源包中设定的值，或行为包此前通过同名`setXxx`设定过的值。

```typescript
resetTemperature(): void
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [`@minecraft/server-graphics` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-graphics/changelog?view=minecraft-bedrock-stable)
