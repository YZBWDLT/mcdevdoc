---
sidebar_position: 1
---

# 获取组件

import Version from "/src/components/highlight/version"
import RestrictedMode from "/src/components/highlight/restrictedMode"
import Button from '/src/components/button/base';

本文记录获取各个图形组件的函数。各组件的设置方法与取值范围见对应的页面，设置项的通用写法见[设置约定](./concepts)，模块本身的说明见 [ScriptAPI 概述](../overview)。

每个生物群系都有一套图形设置，四个组件分别控制大气散射、光照、水体与调色。除了按生物群系获取，还可以按玩家获取同一套组件，玩家级的设置会覆盖生物群系级。

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=sapi" color="green"/>

---

## getBiomeAtmospherics 函数

<Version type="script-graphics" add="1.0.0"/>

<RestrictedMode/>

获取指定生物群系的大气组件，用于控制该生物群系在大气散射中的表现。

```typescript
getBiomeAtmospherics(biome: BiomeType): BiomeAtmospherics
```

- biome: [BiomeType](../server/dimension/biome#biometype-类)，要设置的生物群系。

**返回值**：[BiomeAtmospherics](./atmospherics#biomeatmospherics-类)，该生物群系的大气组件。

## getBiomeColorGrading 函数

<Version type="script-graphics" add="1.0.0"/>

<RestrictedMode/>

获取指定生物群系的调色组件，用于控制该生物群系的画面调色。

```typescript
getBiomeColorGrading(biome: BiomeType): BiomeColorGrading
```

- biome: [BiomeType](../server/dimension/biome#biometype-类)，要设置的生物群系。

**返回值**：[BiomeColorGrading](./color_grading#biomecolorgrading-类)，该生物群系的调色组件。

## getBiomeLighting 函数

<Version type="script-graphics" add="1.0.0"/>

<RestrictedMode/>

获取指定生物群系的光照组件，用于控制该生物群系的光照表现。

```typescript
getBiomeLighting(biome: BiomeType): BiomeLighting
```

- biome: [BiomeType](../server/dimension/biome#biometype-类)，要设置的生物群系。

**返回值**：[BiomeLighting](./lighting#biomelighting-类)，该生物群系的光照组件。

## getBiomeWater 函数

<Version type="script-graphics" add="1.0.0"/>

<RestrictedMode/>

获取指定生物群系的水体组件，用于控制该生物群系的水面颜色与波浪。

```typescript
getBiomeWater(biome: BiomeType): BiomeWater
```

- biome: [BiomeType](../server/dimension/biome#biometype-类)，要设置的生物群系。

**返回值**：[BiomeWater](./water#biomewater-类)，该生物群系的水体组件。

## getPlayerAtmospherics 函数

<Version type="script-graphics" add="1.0.0"/>

<RestrictedMode/>

获取某个玩家的玩家级大气组件。可调项与[getBiomeAtmospherics](#getbiomeatmospherics-函数)完全相同，但玩家级设置总是覆盖生物群系级设置。

```typescript
getPlayerAtmospherics(biome: BiomeType, player: Player): BiomeAtmospherics
```

- biome: [BiomeType](../server/dimension/biome#biometype-类)，玩家当前所在的生物群系。
- player: [Player](../server/entity_and_player/player#player-类)，要设置的玩家。

**返回值**：[BiomeAtmospherics](./atmospherics#biomeatmospherics-类)，该玩家的大气组件。返回类型与生物群系级相同。

## getPlayerColorGrading 函数

<Version type="script-graphics" add="1.0.0"/>

<RestrictedMode/>

获取某个玩家的玩家级调色组件。可调项与[getBiomeColorGrading](#getbiomecolorgrading-函数)完全相同，但玩家级设置总是覆盖生物群系级设置。

```typescript
getPlayerColorGrading(biome: BiomeType, player: Player): BiomeColorGrading
```

- biome: [BiomeType](../server/dimension/biome#biometype-类)，玩家当前所在的生物群系。
- player: [Player](../server/entity_and_player/player#player-类)，要设置的玩家。

**返回值**：[BiomeColorGrading](./color_grading#biomecolorgrading-类)，该玩家的调色组件。

## getPlayerLighting 函数

<Version type="script-graphics" add="1.0.0"/>

<RestrictedMode/>

获取某个玩家的玩家级光照组件。可调项与[getBiomeLighting](#getbiomelighting-函数)完全相同，但玩家级设置总是覆盖生物群系级设置。

```typescript
getPlayerLighting(biome: BiomeType, player: Player): BiomeLighting
```

- biome: [BiomeType](../server/dimension/biome#biometype-类)，玩家当前所在的生物群系。
- player: [Player](../server/entity_and_player/player#player-类)，要设置的玩家。

**返回值**：[BiomeLighting](./lighting#biomelighting-类)，该玩家的光照组件。

## getPlayerWater 函数

<Version type="script-graphics" add="1.0.0"/>

<RestrictedMode/>

获取某个玩家的玩家级水体组件。可调项与[getBiomeWater](#getbiomewater-函数)完全相同，但玩家级设置总是覆盖生物群系级设置。

```typescript
getPlayerWater(biome: BiomeType, player: Player): BiomeWater
```

- biome: [BiomeType](../server/dimension/biome#biometype-类)，玩家当前所在的生物群系。
- player: [Player](../server/entity_and_player/player#player-类)，要设置的玩家。

**返回值**：[BiomeWater](./water#biomewater-类)，该玩家的水体组件。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [`@minecraft/server-graphics` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-graphics/changelog?view=minecraft-bedrock-stable)
