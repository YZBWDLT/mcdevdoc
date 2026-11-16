---
sidebar_position: 7
---

# 时间

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录时间相关的接口，共 10 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/shijian.html"/>

---

### GetLocalDoDayNightCycle

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

获取维度是否打开昼夜更替。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLocalDoDayNightCycle(dimension: int) -> bool
```

- dimension: int，维度 id。

**返回值**：bool，是否打开昼夜更替。

**备注**

- 维度使用局部时间规则时，返回维度自身的昼夜更替规则；没有使用时返回全局的昼夜更替规则。
- 关于“局部时间规则”，见 [SetUseLocalTime](/docs/docs/scripts/modapi/world/time#setuselocaltime)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.GetLocalDoDayNightCycle(3)
```

</TabItem>
</Tabs>

---

### GetLocalTime

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

获取维度的时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLocalTime(dimension: int) -> int
```

- dimension: int，维度 id。

**返回值**：int，时间，单位为帧数，表示该存档从新建起经过的时间，而非当前游戏天内的时间。mc 中一个游戏天相当于现实的 20 分钟，即 24000 帧。

**备注**

- 维度使用局部时间规则时，返回局部时间；没有使用时返回全局时间。
- 关于“局部时间规则”，见 [SetUseLocalTime](/docs/docs/scripts/modapi/world/time#setuselocaltime)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
# 从游戏开始经过的总帧数
passedTime = comp.GetLocalTime(3)
# 当前游戏天内的帧数
timeOfDay = passedTime % 24000
# 从游戏开始经过的游戏天数
day = passedTime / 24000
```

</TabItem>
</Tabs>

<Client/> DimensionCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDimension(levelId)`

获取当前维度的时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLocalTime() -> int
```


**返回值**：int，时间，单位为帧数，表示该存档从新建起经过的时间，而非当前游戏天内的时间。mc 中一个游戏天相当于现实的 20 分钟，即 24000 帧。

**备注**

- 维度使用局部时间规则时，返回局部时间；没有使用时返回全局时间。
- 关于“局部时间规则”，见 [SetUseLocalTime](/docs/docs/scripts/modapi/world/time#setuselocaltime)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDimension(levelId)
# 从游戏开始经过的总帧数
passedTime = comp.GetLocalTime()
# 当前游戏天内的帧数
timeOfDay = passedTime % 24000
# 从游戏开始经过的游戏天数
day = passedTime / 24000
```

</TabItem>
</Tabs>

---

### GetTime

<Server/> TimeComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateTime(levelId)`

获取当前世界时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTime() -> int
```


**返回值**：int，当前时间，单位为帧数，表示该存档从新建起经过的时间，而非当前游戏天内的时间。mc 中一个游戏天相当于现实的 20 分钟，即 24000 帧。

**备注**

- 注意关闭昼夜更替后当前世界的时间会暂停。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateTime(levelId)
# 从游戏开始经过的总帧数
passedTime = comp.GetTime()
# 当前游戏天内的帧数
timeOfDay = passedTime % 24000
# 从游戏开始经过的游戏天数
day = passedTime / 24000
```

</TabItem>
</Tabs>

<Client/> TimeComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTime(levelId)`

获取当前世界时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTime() -> int
```


**返回值**：int，当前时间，单位为帧数，表示该存档从新建起经过的时间，而非当前游戏天内的时间。mc 中一个游戏天相当于现实的 20 分钟，即 24000 帧。

**备注**

- 注意关闭昼夜更替后当前世界的时间会暂停。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTime(levelId)
# 从游戏开始经过的总帧数
passedTime = comp.GetTime()
# 当前游戏天内的帧数
timeOfDay = passedTime % 24000
# 从游戏开始经过的游戏天数
day = passedTime / 24000
```

</TabItem>
</Tabs>

---

### GetUseLocalTime

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

获取某个维度是否设置了使用局部时间规则。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUseLocalTime(dimension: int) -> bool
```

- dimension: int，维度 id。

**返回值**：bool，是否使用局部时间规则。

**备注**

- 关于“局部时间规则”，见 [SetUseLocalTime](/docs/docs/scripts/modapi/world/time#setuselocaltime)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.GetUseLocalTime(3)
```

</TabItem>
</Tabs>

---

### SetLocalDoDayNightCycle

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

设置使用局部时间规则的维度是否打开昼夜更替。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLocalDoDayNightCycle(dimension: int, value: bool) -> bool
```

- dimension: int，维度 id。
- value: bool，是否打开昼夜更替。

**返回值**：bool，是否设置成功。

**备注**

- 只有使用局部时间规则维度才能设置。
- 关于“局部时间规则”，见 [SetUseLocalTime](/docs/docs/scripts/modapi/world/time#setuselocaltime)。
- 在 pc 开发包下，可以在聊天栏键入 dmtime cycle on 或 dmtime cycle off 来测试开启与关闭当前维度的昼夜更替。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.SetLocalDoDayNightCycle(3, False)
```

</TabItem>
</Tabs>

---

### SetLocalTime

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

设置使用局部时间规则维度的时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLocalTime(dimension: int, time: int) -> bool
```

- dimension: int，维度 id。
- time: int，时间，单位为帧数。表示该存档从新建起经过的时间，而非当前游戏天内的时间。mc 中一个游戏天相当于现实的 20 分钟，即 24000 帧。

**返回值**：bool，是否设置成功。

**备注**

- 游戏有天数的概念，使用时需要进行考虑。您也可以直接使用 [SetLocalTimeOfDay](/docs/docs/scripts/modapi/world/time#setlocaltimeofday) 设置一天内所在的时间而不用计算天数。
- 只有使用局部时间规则维度才能设置。
- 关于“局部时间规则”，见 [SetUseLocalTime](/docs/docs/scripts/modapi/world/time#setuselocaltime)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
# 获取当前的时间
passedTime = comp.GetLocalTime(3)
# 获取当前的天数
day = passedTime / 24000
# 设置为当天的正午
comp.SetLocalTime(3, day * 24000 + 6000)
# 设置为次日的日出
comp.SetLocalTime(3, (day + 1) * 24000 + 0)
```

</TabItem>
</Tabs>

---

### SetLocalTimeOfDay

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

设置使用局部时间规则维度在一天内所在的时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLocalTimeOfDay(dimension: int, timeOfDay: int) -> bool
```

- dimension: int，维度 id。
- timeOfDay: int，时间，单位为帧数，表示游戏天内的时间，范围为 0 到 24000。mc 中一个游戏天相当于现实的 20 分钟，即 24000 帧。

**返回值**：bool，设置是否成功。

**备注**

- 具体的逻辑与 time 指令相同，若 timeOfDay 比当前时间晚，则设置到当天的 timeOfDay；若 timeOfDay 比当前时间早，则设置到次日的 timeOfDay。
- 在 pc 开发包下，可以在聊天栏键入 dmtime time \<int:帧数>来测试设置当前维度的局部时间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
# 设置为正午
comp.SetLocalTimeOfDay(3, 6000)
```

</TabItem>
</Tabs>

---

### SetTime

<Server/> TimeComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateTime(levelId)`

设置当前世界时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTime(time: int) -> bool
```

- time: int，时间，单位为帧数，表示该存档从新建起经过的时间，而非当前游戏天内的时间。mc 中一个游戏天相当于现实的 20 分钟，即 24000 帧。

**返回值**：bool，设置是否成功。

**备注**

- 游戏有天数的概念，使用时需要进行考虑。您也可以直接使用 [SetTimeOfDay](/docs/docs/scripts/modapi/world/time#settimeofday) 设置一天内所在的时间而不用计算天数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateTime(levelId)
# 获取当前的时间
passedTime = comp.GetTime()
# 获取当前的天数
day = passedTime / 24000
# 设置为当天的正午
comp.SetTime(day * 24000 + 6000)
# 设置为次日的日出
comp.SetTime((day + 1) * 24000 + 0)
```

</TabItem>
</Tabs>

---

### SetTimeOfDay

<Server/> TimeComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateTime(levelId)`

设置当前世界在一天内所在的时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTimeOfDay(timeOfDay: int) -> bool
```

- timeOfDay: int，时间，单位为帧数，表示游戏天内的时间，范围为 0 到 24000。mc 中一个游戏天相当于现实的 20 分钟，即 24000 帧。

**返回值**：bool，设置是否成功。

**备注**

- 具体的逻辑与 time 指令相同，若 timeOfDay 比当前时间晚，则设置到当天的 timeOfDay；若 timeOfDay 比当前时间早，则设置到次日的 timeOfDay。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateTime(levelId)
# 设置为正午
comp.SetTimeOfDay(6000)
```

</TabItem>
</Tabs>

---

### SetUseLocalTime

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

让某个维度拥有自己的局部时间规则，开启后该维度可以拥有与其他维度不同的时间与是否昼夜更替的规则。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetUseLocalTime(dimension: int, value: bool) -> bool
```

- dimension: int，维度 id。
- value: bool，是否开启局部时间规则。

**返回值**：bool，是否设置成功。

**备注**

- 我们对主世界以及自定义维度新增了“局部时间规则”的概念。在此之前，所有的维度会共享一个“全局时间”，即设置时间或 dodaynightcycle 规则时，会对所有维度生效。现在，我们可以将某个维度使用局部时间规则，并且单独设置他的时间（见 [SetLocalTime](/docs/docs/scripts/modapi/world/time#setlocaltime)）与 dodaynightcycle 规则（见 [SetLocalDoDayNightCycle](/docs/docs/scripts/modapi/world/time#setlocaldodaynightcycle)）。在下文中，我们会将使用局部时间规则的维度称为“局部维度”，而使用全局时间的维度称为“全局维度”。默认情况下，维度都是全局维度。原版的 time 指令，gamerule dodaylightcycle 指令与开启昼夜更替的设置，daylock 指令与终为白日的设置，均不会对局部维度生效。当世界上同时存在局部维度与全局维度时，只有以下两种情况可以睡觉来跳过黑夜：所有玩家都在全局维度睡觉。这时会将全局时间跳到第二天早上。当一个局部维度的睡觉玩家数量达到可以跳过黑夜的数量之后，这时会将该局部维度的时间跳到第二天早上。
- 启用局部时间规则时，默认继承全局的时间与昼夜更替规则。
- 时间规则对原版的下界与末地无效，这两个维度永远为黑夜且没有昼夜更替。
- 建议统一在游戏启动时调用。
- 在 pc 开发包下，可以在聊天栏键入 dmtime on 或 dmtime off 来测试开启与关闭当前维度的局部时间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.SetUseLocalTime(3, True)
```

</TabItem>
</Tabs>

---
