---
sidebar_position: 3
---

# 自定义成就系统

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录自定义成就系统相关的接口，共 6 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/zidingyi-ui/zidingyichengjiuxitong.html"/>

---

### AddNodeProgress

<Server/> AchievementCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAchievement(levelId)`

增加对应玩家的对应成就节点的成就进度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddNodeProgress(playerId: str, nodeId: str, delta: int, callback: Callable, getExtra: Callable) -> bool
```

- playerId: str，玩家 ID。
- nodeId: str，节点 ID。
- delta: int，增加该节点进度的值,只能填写大于 0 的正整数。
- callback: Callable，请求回调函数,如果节点的 json 配置了为云节点，则调用此接口必须填写此参数，否则无法传到云端。
- getExtra: Callable，用于返回存储更新后的数据的函数，用于云成就节点，返回值必须为 str 类型，可选。

**返回值**：bool，是否设置成功，当为云成就上报的时候，True 表示上报了，具体情况请查阅 callback 函数的参数信息，False 表示未上报。

**备注**

- callback 需要接受一个参数 当请求失败时，参数返回 None。当请求成功时，参数为一个 dict，包含返回码，最新数据等信息。- 当 code 为 0 时，表示设置成功。- 当 code 为 5 时，表示数据冲突，此时系统不会存储此次上传的数据，当开发者通过 callback 处理完冲突后，必须返回一个 Bool 值。当 callback 的返回值为 True，系统会自动再自动调用一次 getExtra 来获取最新的 extra 数据，并自动存储进度与 extra。如果不想系统再自动调用，将 callback 返回值设置为 False，系统将不会再进行一次进度存储，可选。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
def cb(data):
        if data:
            print { {}.format(data["entity"]) }
        else:
            print "获取数据失败"
def get():
        return extraData
comp = serverApi.GetEngineCompFactory().CreateAchievement(levelId)
#增加该玩家成就进度：
comp.AddNodeProgress(playerId, nodeId, delta, callback = cb, getExtra = get)
```

</TabItem>
</Tabs>

---

### GetAchievementGatePosition

<Client/> AchievementCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateAchievement(playerId)`

获取自定义成就系统的入口按钮位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAchievementGatePosition() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，坐标信息，tuple(横轴坐标，竖轴坐标)，获取失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateAchievement(playerId)
result = comp.GetAchievementGatePosition()
```

</TabItem>
</Tabs>

---

### GetChildrenNode

<Server/> AchievementCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAchievement(levelId)`

获得该成就节点的下一级所有孩子节点的 list。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChildrenNode(nodeId: str) -> List[str]
```

- nodeId: str，节点 ID。

**返回值**：List[str]，返回值为是否设置成功，成功为该节点的下一级所有孩子节点的 list，失败为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAchievement(levelId)
#获得该成就节点的下一级所有孩子节点的list：
NodeChildren = comp.GetChildrenNode(nodeId)
```

</TabItem>
</Tabs>

---

### GetNodeDetailInfo

<Server/> AchievementCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAchievement(levelId)`

获取对应玩家的对应节点信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetNodeDetailInfo(playerId: str, nodeId: str) -> Dict[str, Any]
```

- playerId: str，玩家 ID。
- nodeId: str，节点 ID。

**返回值**：Dict[str, Any]，获取成功为对应玩家的对应节点的所有信息，包括 json 内的所有信息，外加一个“progress”属性用来存储该玩家该节点的进度，失败为 None。

**备注**

- 该接口获取到的信息只有 json 里面配置的信息，如果可选内容不配，该接口获取不到不配的可选内容信息。
- 不可在“[AddServerPlayerEvent](/docs/docs/scripts/modapi/events/world#addserverplayerevent)”和"[ClientLoadAddonsFinishServerEvent](/docs/docs/scripts/modapi/events/world#clientloadaddonsfinishserverevent)"事件中调用该接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAchievement(levelId)
#获取信息：
NodeDetail = comp.GetNodeDetailInfo(playerId, nodeId)
```

</TabItem>
</Tabs>

---

### SetAchievementGatePosition

<Client/> AchievementCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateAchievement(playerId)`

设置自定义成就系统的入口按钮位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAchievementGatePosition(x: float, y: float) -> bool
```

- x: float，横轴坐标。
- y: float，竖轴坐标。

**返回值**：bool，是否设置成功。

**备注**

- 如果设置的位置超过边界，将设置到目标最近的边界位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateAchievement(playerId)
result = comp.SetAchievementGatePosition(10, 10)
```

</TabItem>
</Tabs>

---

### SetNodeFinish

<Server/> AchievementCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAchievement(levelId)`

设置对应玩家的对应成就节点完成。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetNodeFinish(playerId: str, nodeId: str, callback: Callable, getExtra: Callable) -> bool
```

- playerId: str，玩家 ID。
- nodeId: str，节点 ID。
- callback: Callable，请求回调函数,如果节点的 json 配置了为云节点，则调用此接口必须填写此参数，否则无法传到云端。
- getExtra: Callable，用于返回存储更新后的数据的函数，用于云成就节点，返回值必须为 str 类型，可选。

**返回值**：bool，是否设置成功，当为云成就上报的时候，True 表示上报了，具体情况请查阅 callback 函数的参数信息，False 表示未上报。

**备注**

- callback 需要接受一个参数 当请求失败时，参数返回 None。当请求成功时，参数为一个 dict，包含返回码，最新数据等信息。- 当 code 为 0 时，表示设置成功。- 当 code 为 5 时，表示数据冲突，此时系统不会存储此次上传的数据，当开发者通过 callback 处理完冲突后，必须返回一个 Bool 值。当 callback 的返回值为 True，系统会自动再自动调用一次 getExtra 来获取最新的 extra 数据，并自动存储进度与 extra。如果不想系统再自动调用，将 callback 放回值设置为 False，系统将不会再进行一次进度存储，可选。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
def cb(data):
        if data:
            print { {}.format(data["entity"]) }
        else:
            print "获取数据失败"
def get():
        return extraData
comp = serverApi.GetEngineCompFactory().CreateAchievement(levelId)
#设置该成就完成：
comp.SetNodeFinish(playerId, nodeId, callback = cb, getExtra = get)
```

</TabItem>
</Tabs>

---
