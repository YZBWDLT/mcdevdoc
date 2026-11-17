---
sidebar_position: 2
---

# 设置约定

import Version from "/src/components/highlight/version"

本文记录各组件的通用设置写法。获取组件的函数见[获取组件](./main)，模块本身的说明见 [ScriptAPI 简述](../overview)。

这些设置只影响 Vibrant Visuals 开启后的渲染效果，关闭时不会生效。

---

## 数值与关键帧

以下示例假设已经通过[获取组件](./main)拿到了组件实例。

多数设置方法接受`number | Record<number, number>`类型，两种写法可以选其一：

- 直接传入一个数字，效果恒定。
- 传入一组关键帧，按一天中的时刻插值。

关键帧的键是一个`0`到`1`之间的数字，表示一天中的时刻。其中`0.0`与`1.0`为正午，`0.25`为日落，`0.5`为午夜，`0.75`为日出。键对应的值就是该时刻的设置值。

```javascript
// 恒定值
atmospherics.setHorizonBlendMax(0.5);

// 关键帧：正午与午夜取不同的值
atmospherics.setHorizonBlendMax({ 0.0: 0.8, 0.5: 0.2 });
```

每种设置方法对值的取值范围有自己的限制，超出范围会抛出错误。取值范围见各页的方法表。

水体和调色的参数只接受单个数值或向量，不支持关键帧。

## 颜色

接受颜色的方法有两种写法：

- 直接传入一个[RGB](../server/general#rgb-接口)三元组。
- 传入一组关键帧，键同样是一天中的时刻，值为 RGB 三元组。

```javascript
atmospherics.setSkyZenithColor({ red: 79, green: 145, blue: 255 });
```

## 重置方法

每个设置方法都配套一个`resetXxx`方法，用于把该项恢复为资源包中设定的值，或行为包此前通过对应`setXxx`设定过的值。

```javascript
lighting.resetSunColor();
```

## 生效范围

同一套组件可以从两个层级获取：

- 按生物群系获取（`getBiomeXxx`），对该群系中的所有玩家生效。
- 按玩家获取（`getPlayerXxx`），只对该玩家生效。

玩家级的设置总是覆盖生物群系级。两者的返回类型相同，可调项也完全一致。

```javascript
import { getBiomeLighting, getPlayerLighting } from "@minecraft/server-graphics";

const biome = overworld.getBiome({ x: 0, y: 64, z: 0 });

// 整个生物群系的日光亮度
getBiomeLighting(biome).setSunIlluminance(2);

// 只把某个玩家的日光调暗
getPlayerLighting(biome, player).setSunIlluminance(1);
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
