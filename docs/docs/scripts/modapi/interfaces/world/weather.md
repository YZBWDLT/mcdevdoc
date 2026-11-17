---
sidebar_position: 9
---

# 天气

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录天气相关的接口，共 10 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/tianqi.html"/>

---

### GetDimensionLocalWeatherInfo

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

获取独立维度天气信息(必须先使用 [SetDimensionUseLocalWeather](/docs/docs/scripts/modapi/interfaces/world/weather#setdimensionuselocalweather) 接口设置此维度拥有自己的独立天气)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDimensionLocalWeatherInfo(dimension: int) -> Dict[str, Any]
```

- dimension: int，维度 id。

**返回值**：Dict[str, Any]，独立维度天气信息(下雨强度，下雨时间，打雷强度，打雷时间，是否开启天气循环)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.GetDimensionLocalWeatherInfo(0)
```

</TabItem>
</Tabs>

---

### GetDimensionUseLocalWeather

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

获取某个维度是否拥有自己的天气规则。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDimensionUseLocalWeather(dimension: int) -> bool
```

- dimension: int，维度 id。

**返回值**：bool，是否使用了独立天气规则。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.GetDimensionUseLocalWeather(0)
```

</TabItem>
</Tabs>

---

### IsRaining

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

获取是否下雨。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsRaining() -> bool
```


**返回值**：bool，是否下雨。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.IsRaining()
```

</TabItem>
</Tabs>

---

### IsThunder

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

获取是否打雷。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsThunder() -> bool
```


**返回值**：bool，是否打雷。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.IsThunder()
```

</TabItem>
</Tabs>

---

### SetDimensionLocalDoWeatherCycle

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

设置某个维度是否开启天气循环(必须先使用 [SetDimensionUseLocalWeather](/docs/docs/scripts/modapi/interfaces/world/weather#setdimensionuselocalweather) 接口设置此维度拥有自己的独立天气)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDimensionLocalDoWeatherCycle(dimension: int, value: bool) -> bool
```

- dimension: int，维度 id。
- value: bool，是否开启天气循环。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.SetDimensionLocalDoWeatherCycle(0, True)
```

</TabItem>
</Tabs>

---

### SetDimensionLocalRain

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

设置某个维度下雨(必须先使用 [SetDimensionUseLocalWeather](/docs/docs/scripts/modapi/interfaces/world/weather#setdimensionuselocalweather) 接口设置此维度拥有自己的独立天气)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDimensionLocalRain(dimension: int, rainLevel: float, rainTime: int) -> bool
```

- dimension: int，维度 id。
- rainLevel: float，下雨强度，范围 0-1。
- rainTime: int，下雨的持续时间，单位为帧，一秒 20 帧。持续时间结束后会自动转换为相反的天气。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.SetDimensionLocalRain(0, 0.5, 180)
```

</TabItem>
</Tabs>

---

### SetDimensionLocalThunder

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

设置某个维度打雷(必须先使用 [SetDimensionUseLocalWeather](/docs/docs/scripts/modapi/interfaces/world/weather#setdimensionuselocalweather) 接口设置此维度拥有自己的独立天气)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDimensionLocalThunder(
    dimension: int,
    thunderLevel: float,
    thunderTime: int,
) -> bool
```

- dimension: int，维度 id。
- thunderLevel: float，打雷强度，范围 0-1。
- thunderTime: int，打雷的持续时间，单位为帧，一秒 20 帧。持续时间结束后会自动转换为相反的天气。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.SetDimensionLocalThunder(0, 0.5, 180)
```

</TabItem>
</Tabs>

---

### SetDimensionUseLocalWeather

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

设置某个维度拥有自己的天气规则，开启后该维度可以拥有与其他维度不同的天气和天气更替的规则。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDimensionUseLocalWeather(dimension: int, value: bool) -> bool
```

- dimension: int，维度 id。
- value: bool，是否开启独立天气。

**返回值**：bool，是否成功。

**备注**

- 我们对主世界以及自定义维度新增了“局部天气”的概念。在此之前，所有的维度会共享一个“全局天气”，即设置天气或天气循环规则时，会对所有维度生效。现在，我们可以将某个维度使用局部天气规则，并且单独设置它的下雨强度，下雨时间，打雷强度，打雷时间，是否开启天气循环（见 [SetDimensionLocalRain](/docs/docs/scripts/modapi/interfaces/world/weather#setdimensionlocalrain)、[SetDimensionLocalThunder](/docs/docs/scripts/modapi/interfaces/world/weather#setdimensionlocalthunder)、[SetDimensionLocalDoWeatherCycle](/docs/docs/scripts/modapi/interfaces/world/weather#setdimensionlocaldoweathercycle)）。在下文中，我们会将使用局部天气规则的维度称为“局部维度”，而使用全局天气的维度称为“全局维度”。默认情况下，维度都是全局维度。原版的 weather 指令，接口 [SetRaining](/docs/docs/scripts/modapi/interfaces/world/weather#setraining)、[SetThunder](/docs/docs/scripts/modapi/interfaces/world/weather#setthunder) 均不会对局部维度产生影响。
- 启用局部天气规则时，默认继承全局的天气强度和时间，局部维度天气循环默认开启。
- 天气规则对原版的下界与末地无效，这两个维度并没有天气系统。
- 建议统一在游戏启动时调用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.SetDimensionUseLocalWeather(0, True)
```

</TabItem>
</Tabs>

---

### SetRaining

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

设置是否下雨。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRaining(level: float, time: int) -> bool
```

- level: float，下雨强度，范围为 0-1。
- time: int，天气的持续时间，单位为帧，一秒 20 帧。持续时间结束后会自动转换为相反的天气。注意，需要在游戏设置中开启天气更替后该参数才会生效。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.SetRaining(0.5,1000)
```

</TabItem>
</Tabs>

---

### SetThunder

<Server/> WeatherComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateWeather(levelId)`

设置是否打雷。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetThunder(level: float, time: int) -> bool
```

- level: float，打雷强度，范围为 0-1。
- time: int，打雷持续时间，单位为帧，一秒 20 帧。注意，需要在游戏设置中开启天气更替后该参数才会生效。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateWeather(levelId)
comp.SetThunder(0.5,1000)set_lightning
```

</TabItem>
</Tabs>

---
