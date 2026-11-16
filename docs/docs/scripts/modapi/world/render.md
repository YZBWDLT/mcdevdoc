---
sidebar_position: 12
---

# 渲染

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录渲染相关的接口，共 39 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/xuanran.html"/>

---

### AddTerrainDestroyParticleEffect

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

在指定位置播放指定方块被开始破坏时的粒子效果（如果有）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddTerrainDestroyParticleEffect(name: str, aux: int, pos: Tuple[float, float, float]) -> bool
```

- name: str，需要播放的粒子效果所属的方块名称(identifier)，例如 minecraft:stone。
- aux: int，方块附加值。
- pos: Tuple[float, float, float]，需要播放特效的位置。

**返回值**：bool，播放是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 在(30,66,30)这个位置播放石头被开始破坏时的粒子效果
comp.AddTerrainDestroyParticleEffect("minecraft:stone", 0, (30, 66, 30))
```

</TabItem>
</Tabs>

---

### AddUseItemParticleEffect

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

在指定位置播放指定物品被开始使用时的粒子效果（如果有）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddUseItemParticleEffect(name: str, aux: int, pos: Tuple[float, float, float]) -> bool
```

- name: str，需要播放的粒子效果所属的物品名称(identifier)，例如 minecraft:apple。
- aux: int，物品附加值。
- pos: Tuple[float, float, float]，需要播放特效的位置。

**返回值**：bool，播放是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
comp.AddUseItemParticleEffect("minecraft:apple", 0, (30, 66, 30))
```

</TabItem>
</Tabs>

---

### GetAmbientBrightness

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

获取环境光亮度，影响天空亮度，不影响实体与方块光照。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAmbientBrightness() -> float
```


**返回值**：float，范围 0 到 1 之间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
ambineBrightness = comp.GetAmbientBrightness()
```

</TabItem>
</Tabs>

---

### GetFogColor

<Client/> FogCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFog(levelId)`

获取当前雾效颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFogColor() -> Tuple[float, float, float, float]
```


**返回值**：Tuple[float, float, float, float]，颜色 rgba。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFog(levelId)
# 获取雾效颜色
fogColor = comp.GetFogColor()
```

</TabItem>
</Tabs>

---

### GetFogLength

<Client/> FogCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFog(levelId)`

获取雾效范围。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFogLength() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，雾效起始值与终点值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFog(levelId)
start,end = comp.GetFogLength()
```

</TabItem>
</Tabs>

---

### GetMoonRot

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

获取月亮角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMoonRot() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，第一个 float 表示南北偏移，第二个 float 表示月亮的自旋角度，第三个 float 表示月升月落。单位为角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
rot = comp.GetMoonRot()
```

</TabItem>
</Tabs>

---

### GetSkyColor

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

获取天空颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSkyColor() -> Tuple[float, float, float, float]
```


**返回值**：Tuple[float, float, float, float]，颜色 RGBA，0 到 1 之间，目前 a 值暂时没用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
color = comp.GetSkyColor()
```

</TabItem>
</Tabs>

---

### GetSkyTextures

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

获取当前维度天空盒贴图，天空盒共 6 张贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSkyTextures() -> Optional[List[str]]
```


**返回值**：Optional[List[str]]，天空盒贴图列表，该值可能为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 贴图列表按顺序分别对应世界坐标的 负Z轴方向， 正X轴方向，正Z轴方向，负X轴方向，正Y轴方向，负Y轴方向。 其中正Y轴即为上方（采用右手坐标系）。
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
textureList = comp.GetSkyTextures()
```

</TabItem>
</Tabs>

---

### GetStarBrightness

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

获取星星亮度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetStarBrightness() -> float
```


**返回值**：float，范围 0 到 1 之间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
starBrightness = comp.GetStarBrightness()
```

</TabItem>
</Tabs>

---

### GetSunRot

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

获取太阳角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSunRot() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，第一个 float 表示南北偏移，第二个 float 表示太阳的自旋角度，第三个 float 表示日升日落。单位为角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
rot = comp.GetSunRot()
```

</TabItem>
</Tabs>

---

### GetUseAmbientBrightness

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

判断是否在 mod 设置了环境光亮度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUseAmbientBrightness() -> bool
```


**返回值**：bool，是否设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
useAmbientBrightness = comp.GetUseAmbientBrightness()
```

</TabItem>
</Tabs>

---

### GetUseFogColor

<Client/> FogCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFog(levelId)`

判断当前是否开启设置雾效颜色，该值默认为 False，使用 mod 传入的颜色值后为 True。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUseFogColor() -> bool
```


**返回值**：bool，是否设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFog(levelId)
# 获取是否开启设置雾效颜色
useFogColor = comp.GetUseFogColor()
```

</TabItem>
</Tabs>

---

### GetUseFogLength

<Client/> FogCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFog(levelId)`

判断当前是否开启设置雾效范围,该值默认为 False，使用 mod 传入的范围值后为 True。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUseFogLength() -> bool
```


**返回值**：bool，是否设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFog(levelId)
# 获取是否开启设置雾效范围
useFogLength = comp.GetUseFogLength()
```

</TabItem>
</Tabs>

---

### GetUseMoonRot

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

判断是否在 mod 设置了月亮角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUseMoonRot() -> bool
```


**返回值**：bool，是否设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
useMoonRot = comp.GetUseMoonRot()
```

</TabItem>
</Tabs>

---

### GetUseSkyColor

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

判断是否在 mod 设置了天空颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUseSkyColor() -> bool
```


**返回值**：bool，是否设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
useSkyColor = comp.GetUseSkyColor()
```

</TabItem>
</Tabs>

---

### GetUseStarBrightness

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

判断是否在 mod 设置了星星亮度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUseStarBrightness() -> bool
```


**返回值**：bool，是否设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
useStarBrightness = comp.GetUseStarBrightness()
```

</TabItem>
</Tabs>

---

### GetUseSunRot

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

判断是否在 mod 设置了太阳角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUseSunRot() -> bool
```


**返回值**：bool，是否设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
useSunRot = comp.GetUseSunRot()
```

</TabItem>
</Tabs>

---

### HideNameTag

<Client/>

模块级函数，直接调用。

隐藏场景内所有名字，包括玩家名字，生物的自定义名称，物品展示框与命令方块的悬浮文本等。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideNameTag(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**备注**

- 该接口用于隐藏或显示所有实体名字，实体名字显示与否还会受到实体本身的名字显示与否影响，详见接口 [SetShowName](/docs/docs/scripts/modapi/entity/render#setshowname)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideNameTag(True)
```

</TabItem>
</Tabs>

---

### IsHideNameTag

<Client/>

模块级函数，直接调用。

获取是否隐藏场景内所有名字。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsHideNameTag() -> bool
```


**返回值**：bool，是否隐藏。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.IsHideNameTag()
```

</TabItem>
</Tabs>

---

### RemoveTerrainDestroyParticleEffect

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

停止指定位置播放的方块被开始破坏时的粒子效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveTerrainDestroyParticleEffect(name: str, aux: int, pos: Tuple[float, float, float]) -> bool
```

- name: str，需要停止的粒子效果所属的方块名称(identifier)，例如 minecraft:stone。
- aux: int，方块附加值。
- pos: Tuple[float, float, float]，需要停止的特效的位置。

**返回值**：bool，播放是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 在(30,66,30)这个位置播放石头被开始破坏时的粒子效果
comp.AddTerrainDestroyParticleEffect("minecraft:stone", 0, (30, 66, 30))
# 停止这个位置里石头被开始破坏时的粒子效果
comp.RemoveTerrainDestroyParticleEffect("minecraft:stone", 0, (30, 66, 30))
```

</TabItem>
</Tabs>

---

### RemoveUseItemParticleEffect

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

停止指定位置播放的物品被开始使用时的粒子效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveUseItemParticleEffect(name: str, aux: int, pos: Tuple[float, float, float]) -> bool
```

- name: str，需要停止的粒子效果所属的物品名称(identifier)，例如 minecraft:apple。
- aux: int，物品附加值。
- pos: Tuple[float, float, float]，需要停止的特效的位置。

**返回值**：bool，停止播放是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在(30,66,30)这个位置播放苹果被开始吃时的粒子效果
comp.AddUseItemParticleEffect("minecraft:apple", 0, (30, 66, 30))
# 停止这个位置里苹果被开始吃时的粒子效果
comp.RemoveUseItemParticleEffect("minecraft:apple", 0, (30, 66, 30))
```

</TabItem>
</Tabs>

---

### ResetAmbientBrightness

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

重置环境光亮度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetAmbientBrightness() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.ResetAmbientBrightness()
```

</TabItem>
</Tabs>

---

### ResetFogColor

<Client/> FogCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFog(levelId)`

重置雾效颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetFogColor() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFog(levelId)
comp.ResetFogColor()
```

</TabItem>
</Tabs>

---

### ResetFogLength

<Client/> FogCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFog(levelId)`

重置雾效范围。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetFogLength() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFog(levelId)
comp.ResetFogLength()
```

</TabItem>
</Tabs>

---

### ResetMoonRot

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

重置月亮角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetMoonRot() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.ResetMoonRot()
```

</TabItem>
</Tabs>

---

### ResetSkyColor

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

重置天空颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetSkyColor() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.ResetSkyColor()
```

</TabItem>
</Tabs>

---

### ResetSkyTextures

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

重置当前维度天空盒贴图。如果有使用 addon 配置贴图则会使用配置的贴图，否则为游戏内默认无贴图的情况。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetSkyTextures() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.ResetSkyTextures()
```

</TabItem>
</Tabs>

---

### ResetStarBrightness

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

重置星星亮度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetStarBrightness() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.ResetStarBrightness()
```

</TabItem>
</Tabs>

---

### ResetSunRot

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

重置太阳角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetSunRot() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.ResetSunRot()
```

</TabItem>
</Tabs>

---

### SetAmbientBrightness

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

设置环境光亮度，影响天空亮度，不影响实体与方块光照。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAmbientBrightness(brightness: float) -> bool
```

- brightness: float，范围 0 到 1 之间。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.SetAmbientBrightness(0.1)
```

</TabItem>
</Tabs>

---

### SetFogColor

<Client/> FogCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFog(levelId)`

设置雾效颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFogColor(color: Tuple[float, float, float, float]) -> bool
```

- color: Tuple[float, float, float, float]，颜色 RGBA，范围 0 到 1 之间，a 值主要用于水下效果。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFog(levelId)
# 雾效设置为全白色
comp.SetFogColor((1.0,1.0,1.0,1.0))
```

</TabItem>
</Tabs>

---

### SetFogLength

<Client/> FogCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFog(levelId)`

设置雾效范围。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFogLength(start: float, end: float) -> bool
```

- start: float，雾效起始距离。
- end: float，雾效终点范围。

**返回值**：bool，设置是否成功。

**备注**

- start 和 end 的单位长度为一个方块的距离。
- 最终渲染出的雾的效果会受能见度的影响，例如能见度设置为 10，此时调用 SetFogLength(0，160)，然后将能见度设置为 5，由于能见度降低，雾的 end 值也会拉近，此时雾的效果将会变得更厚。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFog(levelId)
comp.SetFogLength(10, 50)
```

</TabItem>
</Tabs>

---

### SetMoonRot

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

设置月亮所在角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMoonRot(rot: Tuple[float, float, float]) -> bool
```

- rot: Tuple[float, float, float]，第一个 float 表示南北偏移，第二个 float 表示月亮的自旋角度，第三个 float 表示月升月落。单位为角度。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.SetMoonRot((10, 0, 10))
```

</TabItem>
</Tabs>

---

### SetSkyColor

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

设置天空颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSkyColor(color: Tuple[float, float, float, float]) -> bool
```

- color: Tuple[float, float, float, float]，颜色 RGBA，0 到 1 之间，目前 a 值暂时没用。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.SetSkyColor((0.5, 0.5, 0.8, 1.0))
```

</TabItem>
</Tabs>

---

### SetSkyTextures

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

设置当前维度天空盒贴图，天空盒需要 6 张贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSkyTextures(textureList: List[str]) -> bool
```

- textureList: List[str]，需要为 6 张贴图的路径，路径为从 textures 目录开始的绝对路径，如果天空盒某个方向不需要设置，则传空字符串。

**返回值**：bool，设置是否成功。

**备注**

- 游戏内切 dimension 的时候会重设天空盒贴图，因此开发者需要监听对应的切换维度完成事件([DimensionChangeFinishClientEvent](/docs/docs/scripts/modapi/events/player#dimensionchangefinishclientevent))进行贴图的处理。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 贴图列表按顺序分别对应世界坐标的 负Z轴方向， 正X轴方向，正Z轴方向，负X轴方向，正Y轴方向，负Y轴方向。 其中正Y轴即为上方（采用右手坐标系）。
textureList = ['', 'textures/environment/positiveX','textures/environment/positiveZ', '', 'textures/environment/positiveY', '']
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.SetSkyTextures(textureList)
```

</TabItem>
</Tabs>

---

### SetStarBrightness

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

设置星星亮度，白天也可以显示星星。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetStarBrightness(brightness: float) -> bool
```

- brightness: float，范围 0 到 1 之间。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.SetStarBrightness(0.1)
```

</TabItem>
</Tabs>

---

### SetSunRot

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

设置太阳所在角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSunRot(rot: Tuple[float, float, float]) -> bool
```

- rot: Tuple[float, float, float]，第一个 float 表示南北偏移，第二个 float 表示太阳的自旋角度，第三个 float 表示日升日落。单位为角度。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateSkyRender(levelId)
comp.SetSunRot((10, 0, 10))
```

</TabItem>
</Tabs>

---

### SkyTextures

<Client/> SkyRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateSkyRender(levelId)`

修改太阳、月亮、云层分布、天空盒的贴图。使用 addon 配置，非 python 接口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SkyTextures() -> Any
```


**备注**

- 游戏提供了重载贴图的方式来修改太阳、月亮、云层分布、天空盒的贴图。**末地和下界没有太阳月亮和云层，另外末地的天空是用一张贴图 end_sky.png 而不是天空盒贴图，end_sky.png 要结合雾效颜色使用。下界暂不支持此功能**。具体路径为：

| 贴图 | 路径 |
| --- | --- |
| 太阳贴图 | modResource 目录/textures/environment/\{dimName\}_sun.png |
| 月亮贴图 | modResource 目录/textures/environment/\{dimName\}_moon_phases.png |
| 云层分布贴图 | modResource 目录/textures/environment/\{dimName\}_clouds.png |
| 天空盒贴图 | modResource 目录/textures/environment/\{dimName\}_cubemap/cubemap_0.png |

- 其中：天空盒贴图需要放 6 张图，即最后需要包含`cubemap_0.png`到`cubemap_5.png`，而`\{dimName\}`表示 dimension 的名称，各个 dimension 名称如下：

| dimension | 名称 |
| --- | --- |
| 末地 | theend |
| 下界 | nether |
| 上界 | overworld |
| 其他复制出来的 dimension 镜像 | 从 3 到 20 的数字 id |

- 示例：

```text
modResource/textures/environment/4_sun.png
modResource/textures/environment/overworld_moon_phases.png
modResource/textures/environment/3_clouds.png
modResource/textures/environment/overworld_cubemap/cubemap_0.png # -z方向
modResource/textures/environment/overworld_cubemap/cubemap_1.png #  x方向
modResource/textures/environment/overworld_cubemap/cubemap_2.png #  z方向
modResource/textures/environment/overworld_cubemap/cubemap_3.png # -x方向
modResource/textures/environment/overworld_cubemap/cubemap_4.png #  y方向
modResource/textures/environment/overworld_cubemap/cubemap_5.png # -y方向
modResource/textures/environment/end_sky.png #末地天空渲染贴图
```

</TabItem>
<TabItem value="示例" label="示例">

```text
modResource/textures/environment/4_sun.png
modResource/textures/environment/overworld_moon_phases.png
modResource/textures/environment/3_clouds.png
modResource/textures/environment/overworld_cubemap/cubemap_0.png # -z方向
modResource/textures/environment/overworld_cubemap/cubemap_1.png #  x方向
modResource/textures/environment/overworld_cubemap/cubemap_2.png #  z方向
modResource/textures/environment/overworld_cubemap/cubemap_3.png # -x方向
modResource/textures/environment/overworld_cubemap/cubemap_4.png #  y方向
modResource/textures/environment/overworld_cubemap/cubemap_5.png # -y方向
modResource/textures/environment/end_sky.png #末地天空渲染贴图
```

</TabItem>
</Tabs>

---

### SpawnDestroyParticleEffect

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

在指定位置播放指定方块的破坏爆发粒子效果（一次性，强度与原版一致）。

```python
SpawnDestroyParticleEffect(name: str, aux: int, pos: Tuple[float, float, float]) -> bool
```

- name: str，方块名称(identifier)，例如 minecraft:stone。
- aux: int，方块附加值。
- pos: Tuple[float, float, float]，需要播放特效的位置。

**返回值**：bool，播放是否成功。

---
