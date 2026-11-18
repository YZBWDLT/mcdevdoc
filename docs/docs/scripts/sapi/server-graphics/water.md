---
sidebar_position: 5
---

# 水体

import Version from "/src/components/highlight/version"
import RestrictedMode from "/src/components/highlight/restrictedMode"
import Button from '/src/components/button/base';

本文记录控制生物群系水体（水色与波浪）的接口。

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=sapi" color="green"/>

---

## BiomeWater 类

<Version type="script-graphics" add="1.0.0"/>

某个生物群系（或某个玩家）的水体设置。实例通过[getBiomeWater](./main#getbiomewater-函数)或[getPlayerWater](./main#getplayerwater-函数)获取。

该类的设置方法都只接受单个数值，不支持关键帧。调用任何设置方法都需要读写模式。

```typescript
class BiomeWater {
    private constructor();
    resetCDOM(): void;
    resetChlorophyll(): void;
    resetSuspendedSediment(): void;
    resetWavesDepth(): void;
    resetWavesDirectionIncrement(): void;
    resetWavesFrequency(): void;
    resetWavesFrequencyScaling(): void;
    resetWavesMix(): void;
    resetWavesOctaves(): void;
    resetWavesPull(): void;
    resetWavesShape(): void;
    resetWavesSpeed(): void;
    resetWavesSpeedScaling(): void;
    setCDOM(cdom: number): void;
    setChlorophyll(chlorophyll: number): void;
    setSuspendedSediment(suspendedSediment: number): void;
    setWavesDepth(wavesDepth: number): void;
    setWavesDirectionIncrement(wavesDirectionIncrement: number): void;
    setWavesFrequency(wavesFrequency: number): void;
    setWavesFrequencyScaling(wavesFrequencyScaling: number): void;
    setWavesMix(wavesMix: number): void;
    setWavesOctaves(wavesOctaves: number): void;
    setWavesPull(wavesPull: number): void;
    setWavesShape(wavesShape: number): void;
    setWavesSpeed(wavesSpeed: number): void;
    setWavesSpeedScaling(wavesSpeedScaling: number): void;
}
```

### 设置方法

<RestrictedMode/>

| 方法 | 参数 | 取值范围 | 说明 |
| :--- | :--- | :--- | :--- |
| `setCDOM` | cdom | `0` ~ `15` | 有色溶解有机物（CDOM）的浓度。浓度越高，水色越偏黄到黄褐，因为 CDOM 会强烈吸收蓝光。 |
| `setChlorophyll` | chlorophyll | `0` ~ `10` | 叶绿素的浓度。浓度越高，水色越偏绿，因为叶绿素会强烈吸收红光与蓝光。 |
| `setSuspendedSediment` | suspendedSediment | `0` ~ `300` | 悬浮沉积物的浓度。浓度越高，水色越偏红到红褐，因为悬浮物会强烈吸收蓝光。 |
| `setWavesDepth` | wavesDepth | `0` ~ `10` | 波浪对水面的位移深度。值越大，波浪起伏越明显。 |
| `setWavesDirectionIncrement` | wavesDirectionIncrement | `0` ~ `360`（度） | 每一层波浪相对于上一层的朝向变化量。 |
| `setWavesFrequency` | wavesFrequency | `0` ~ `10` | 每个水方块内的波浪数量，也可理解为波浪的大小。 |
| `setWavesFrequencyScaling` | wavesFrequencyScaling | `0` ~ `2` | 层与层之间频率的变化幅度。取`1`时频率不变。 |
| `setWavesMix` | wavesMix | `0` ~ `1` | 每一层波浪与相邻层的混合程度。 |
| `setWavesOctaves` | wavesOctaves | `1` ~ `10` | 参与叠加的波浪层数。层数越多，水面越复杂。 |
| `setWavesPull` | wavesPull | `-1` ~ `1` | 小波浪被并入大波浪的程度。取`0`时不并入。 |
| `setWavesShape` | wavesShape | `1` ~ `10` | 波浪的核心形状。取`1`时为纯正弦波，取值越大波峰越尖。 |
| `setWavesSpeed` | wavesSpeed | `0.01` ~ `10` | 第一层波浪的移动速度，同时作为速度缩放参数的基准。 |
| `setWavesSpeedScaling` | wavesSpeedScaling | `0` ~ `2` | 后一层波浪比前一层快多少。取`1`时各层速度相同。 |

### 重置方法

`resetCDOM`、`resetChlorophyll`、`resetSuspendedSediment`、`resetWavesDepth`、`resetWavesDirectionIncrement`、`resetWavesFrequency`、`resetWavesFrequencyScaling`、`resetWavesMix`、`resetWavesOctaves`、`resetWavesPull`、`resetWavesShape`、`resetWavesSpeed`、`resetWavesSpeedScaling`分别把对应的设置恢复为资源包中设定的值，或行为包此前通过同名`setXxx`设定过的值。

```typescript
resetWavesShape(): void
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [`@minecraft/server-graphics` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-graphics/changelog?view=minecraft-bedrock-stable)
