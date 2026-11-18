---
sidebar_position: 13
---

# 状态效果

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录状态效果相关的接口，共 5 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/zhuangtaixiaoguo.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### AddEffectToEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> EffectComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEffect(entityId)`

为实体添加指定状态效果，如果添加的状态已存在则有以下集中情况：1、等级大于已存在则更新状态等级及持续时间；2、状态等级相等且剩余时间 duration 大于已存在则刷新剩余时间；3、等级小于已存在则不做修改；4、粒子效果以新的为准。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEffectToEntity(
    effectName: str,
    duration: float,
    amplifier: int = 0,
    showParticles: bool,
) -> bool
```

- effectName: str，状态效果名称字符串，包括自定义状态效果和原版状态效果，原版状态效果可在 wiki 查询。
- duration: float，状态效果持续时间，单位秒。
- amplifier: int，状态效果的额外等级。必须在 0 至 255 之间（含）。若未指定，默认为 0。注意，状态效果的第一级（如生命恢复 I）对应为 0，因此第二级状态效果，如生命回复 II，应指定强度为 1。部分效果及自定义状态效果没有强度之分，如夜视。
- showParticles: bool，是否显示粒子效果，True 显示，False 不显示。

**返回值**：bool，True 表示设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEffect(entityId)
res = comp.AddEffectToEntity("speed", 30.0, 2, True)
```

</TabItem>
</Tabs>

---

### GetAllEffects

<Version type="china" add="2.6"/>

<Server/> EffectComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEffect(entityId)`

获取实体当前所有状态效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> Optional[List[Dict[str, Any]]]
```


**返回值**：Optional[List[Dict[str, Any]]]，状态效果信息字典的 list。无状态效果时返回 None。

**备注**

- 状态效果信息字典 effectDict。

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| effectName | str | 状态效果名称 |
| duration | int | 状态效果剩余持续时间，单位秒 |
| duration_f | float | 状态效果剩余持续时间(浮点型)，单位秒 |
| amplifier | int | 状态效果额外等级 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEffect(entityId)
effectDictList = comp.GetAllEffects()
```

</TabItem>
</Tabs>

<Client/> EffectComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateEffect(entityId)`

获取实体当前所有状态效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> Optional[List[Dict[str, Any]]]
```


**返回值**：Optional[List[Dict[str, Any]]]，状态效果信息字典的 list。无状态效果时返回 None。

**备注**

- 状态效果信息字典 effectDict。

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| effectName | str | 状态效果名称 |
| duration | int | 状态效果剩余持续时间，单位秒 |
| duration_f | float | 状态效果剩余持续时间(浮点型)，单位秒 |
| amplifier | int | 状态效果额外等级 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateEffect(entityId)
effectDictList = comp.GetAllEffects()
```

</TabItem>
</Tabs>

---

### GetLoadEffects

<Version type="china" add="3.3"/>

<Server/> EffectComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEffect(entityId)`

获取所有已加载的状态效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLoadEffects() -> List[str]
```


**返回值**：List[str]，返回状态效果列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEffect(entityId)
effectList = comp.GetLoadEffects()
```

</TabItem>
</Tabs>

---

### HasEffect

<Version type="china" add="2.6"/>

<Server/> EffectComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEffect(entityId)`

获取实体是否存在当前状态效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(effectName: str) -> bool
```

- effectName: str，状态效果名称字符串，包括自定义状态效果和原版状态效果，原版状态效果可在 wiki 查询。

**返回值**：bool，返回是否存在状态效果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEffect(entityId)
effectRes = comp.HasEffect(effectName)
```

</TabItem>
</Tabs>

<Client/> EffectComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateEffect(entityId)`

获取实体是否存在当前状态效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(effectName: str) -> bool
```

- effectName: str，状态效果名称字符串，包括自定义状态效果和原版状态效果，原版状态效果可在 wiki 查询。

**返回值**：bool，返回是否存在状态效果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateEffect(entityId)
effectRes = comp.HasEffect(effectName)
```

</TabItem>
</Tabs>

---

### RemoveEffectFromEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> EffectComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEffect(entityId)`

为实体删除指定状态效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveEffectFromEntity(effectName: str) -> bool
```

- effectName: str，状态效果名称字符串，包括自定义状态效果和原版状态效果，原版状态效果可在 wiki 查询。

**返回值**：bool，True 表示删除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEffect(entityId)
res = comp.RemoveEffectFromEntity("speed")
```

</TabItem>
</Tabs>

---
