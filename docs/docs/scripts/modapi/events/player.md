---
sidebar_position: 3
---

# 玩家

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录玩家相关的事件，共 45 个。监听方式见[事件工作机制](/docs/docs/scripts/modapi/overview#事件)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/wanjia.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_event" color="green"/>

---

### AddExpEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：当玩家增加经验时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnAddExpEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 玩家 id。 |
| addExp | int | 增加的经验值。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "AddExpEvent",
            self, self.OnAddExpEvent)

    def OnAddExpEvent(self, args):
        id = args["id"]
        addExp = args["addExp"]
```

</TabItem>
</Tabs>

---

### AddLevelEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：当玩家升级时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnAddLevelEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 玩家 id。 |
| addLevel | int | 增加的等级值。 |
| newLevel | int | 新的等级。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "AddLevelEvent",
            self, self.OnAddLevelEvent)

    def OnAddLevelEvent(self, args):
        id = args["id"]
        addLevel = args["addLevel"]
        newLevel = args["newLevel"]
```

</TabItem>
</Tabs>

---

### CameraMotionStartClientEvent

<Version type="china" add="2.5"/>

<Client/>

相机运动器开始事件。相机添加运动器后，运动器开始运行时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnCameraMotionStartClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| motionId | int | 运动器 id。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "CameraMotionStartClientEvent",
            self, self.OnCameraMotionStartClientEvent)

    def OnCameraMotionStartClientEvent(self, args):
        motionId = args["motionId"]
```

</TabItem>
</Tabs>

---

### CameraMotionStopClientEvent

<Version type="china" add="2.5"/>

<Client/>

相机运动器停止事件。相机添加运动器并开始运行后，运动器自动停止时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnCameraMotionStopClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| motionId | int | 运动器 id。 |
| remove | bool | 是否移除该运动器，设置为 False 则保留，默认为 True，即运动器停止后自动移除。 |

**备注**

- 注意：该事件触发表示运动器播放顺利完成，手动调用的 [StopCameraMotion](/docs/docs/scripts/modapi/interfaces/player/camera#stopcameramotion)、[RemoveCameraMotion](/docs/docs/scripts/modapi/interfaces/player/camera#removecameramotion) 不会触发该事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "CameraMotionStopClientEvent",
            self, self.OnCameraMotionStopClientEvent)

    def OnCameraMotionStopClientEvent(self, args):
        motionId = args["motionId"]
        remove = args["remove"]
```

</TabItem>
</Tabs>

---

### ChangeLevelUpCostServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：获取玩家下一个等级升级经验时，用于重载玩家的升级经验，每个等级在重置之前都只会触发一次。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnChangeLevelUpCostServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| level | int | 玩家当前等级。 |
| levelUpCostExp | int | 当前等级升级到下个等级需要的经验值，当设置升级经验小于 1 时会被强制调整到 1。 |
| changed | bool | 设置为 True，重载玩家升级经验才会生效。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ChangeLevelUpCostServerEvent",
            self, self.OnChangeLevelUpCostServerEvent)

    def OnChangeLevelUpCostServerEvent(self, args):
        level = args["level"]
        levelUpCostExp = args["levelUpCostExp"]
        changed = args["changed"]
```

</TabItem>
</Tabs>

#### ClearDefinedLevelUpCost

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

接口用于重置升级经验。使用 ChangeLevelUpCostServerEvent 事件设置升级经验后，升级经验无法调整。需要调整升级经验时，可使用该接口。使用步骤如下：1、使用 ClearDefineLevelUpconst，2、在升级抛出 ChangeLevelUpCostServerEvent 事件后重新设置经验。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClearDefinedLevelUpCost(level: int) -> bool
```

- level: int，指定清理的等级，加入传入的数值小于 0，则清理所有等级的升级经验值缓存。

**返回值**：bool，是否清理成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
suc = comp.ClearDefinedLevelUpCost(1)
```

</TabItem>
</Tabs>

---

### DimensionChangeClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

玩家维度改变时客户端抛出。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnDimensionChangeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家实体 id。 |
| fromDimensionId | int | 维度改变前的维度。 |
| toDimensionId | int | 维度改变后的维度。 |
| fromX | float | 改变前的位置 x。 |
| fromY | float | 改变前的位置 Y。 |
| fromZ | float | 改变前的位置 Z。 |
| toX | float | 改变后的位置 x。 |
| toY | float | 改变后的位置 Y。 |
| toZ | float | 改变后的位置 Z。 |

**备注**

- 当通过传送门从末地回到主世界时，toY 值为 32767，其他情况一般会比设置值高 1.62。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "DimensionChangeClientEvent",
            self, self.OnDimensionChangeClientEvent)

    def OnDimensionChangeClientEvent(self, args):
        playerId = args["playerId"]
        fromDimensionId = args["fromDimensionId"]
        toDimensionId = args["toDimensionId"]
        fromX = args["fromX"]
        fromY = args["fromY"]
        fromZ = args["fromZ"]
        toX = args["toX"]
        toY = args["toY"]
        toZ = args["toZ"]
```

</TabItem>
</Tabs>

---

### DimensionChangeFinishClientEvent

<Version type="china" add="1.23"/>

<Client/>

玩家维度改变完成后客户端抛出。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnDimensionChangeFinishClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家实体 id。 |
| fromDimensionId | int | 维度改变前的维度。 |
| toDimensionId | int | 维度改变后的维度。 |
| toPos | Tuple[float, float, float] | 改变后的位置 x,y,z,其中 y 值为脚底加上角色的身高值。 |

**备注**

- 当通过传送门从末地回到主世界时，toPos 的 y 值为 32767，其他情况一般会比设置值高 1.62。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "DimensionChangeFinishClientEvent",
            self, self.OnDimensionChangeFinishClientEvent)

    def OnDimensionChangeFinishClientEvent(self, args):
        playerId = args["playerId"]
        fromDimensionId = args["fromDimensionId"]
        toDimensionId = args["toDimensionId"]
        toPos = args["toPos"]
```

</TabItem>
</Tabs>

---

### DimensionChangeFinishServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

玩家维度改变完成后服务端抛出。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnDimensionChangeFinishServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家实体 id。 |
| fromDimensionId | int | 维度改变前的维度。 |
| toDimensionId | int | 维度改变后的维度。 |
| toPos | Tuple[float, float, float] | 改变后的位置 x,y,z,其中 y 值为脚底加上角色的身高值。 |

**备注**

- 当通过传送门从末地回到主世界时，toPos 的 y 值为 32767，其他情况一般会比设置值高 1.62。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "DimensionChangeFinishServerEvent",
            self, self.OnDimensionChangeFinishServerEvent)

    def OnDimensionChangeFinishServerEvent(self, args):
        playerId = args["playerId"]
        fromDimensionId = args["fromDimensionId"]
        toDimensionId = args["toDimensionId"]
        toPos = args["toPos"]
```

</TabItem>
</Tabs>

---

### DimensionChangeServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

玩家维度改变时服务端抛出。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnDimensionChangeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家实体 id。 |
| fromDimensionId | int | 维度改变前的维度。 |
| toDimensionId | int | 维度改变后的维度。 |
| fromX | float | 改变前的位置 x。 |
| fromY | float | 改变前的位置 Y。 |
| fromZ | float | 改变前的位置 Z。 |
| toX | float | 改变后的位置 x。 |
| toY | float | 改变后的位置 Y。 |
| toZ | float | 改变后的位置 Z。 |

**备注**

- 当通过传送门从末地回到主世界时，toY 值为 32767，其他情况一般会比设置值高 1.62。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "DimensionChangeServerEvent",
            self, self.OnDimensionChangeServerEvent)

    def OnDimensionChangeServerEvent(self, args):
        playerId = args["playerId"]
        fromDimensionId = args["fromDimensionId"]
        toDimensionId = args["toDimensionId"]
        fromX = args["fromX"]
        fromY = args["fromY"]
        fromZ = args["fromZ"]
        toX = args["toX"]
        toY = args["toY"]
        toZ = args["toZ"]
```

</TabItem>
</Tabs>

---

### ExtinguishFireClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

玩家扑灭火焰时触发。下雨，倒水等方式熄灭火焰不会触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnExtinguishFireClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| pos | Tuple[float, float, float] | 火焰方块的坐标。 |
| playerId | str | 玩家 id。 |
| cancel | bool | 修改为 True 时，可阻止玩家扑灭火焰。需要与 [ExtinguishFireServerEvent](/docs/docs/scripts/modapi/events/player#extinguishfireserverevent) 一起修改。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "ExtinguishFireClientEvent",
            self, self.OnExtinguishFireClientEvent)

    def OnExtinguishFireClientEvent(self, args):
        pos = args["pos"]
        playerId = args["playerId"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### ExtinguishFireServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

玩家扑灭火焰时触发。下雨，倒水等方式熄灭火焰不会触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnExtinguishFireServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| pos | Tuple[float, float, float] | 火焰方块的坐标。 |
| playerId | str | 玩家 id。 |
| cancel | bool | 修改为 True 时，可阻止玩家扑灭火焰。需要与 [ExtinguishFireClientEvent](/docs/docs/scripts/modapi/events/player#extinguishfireclientevent) 一起修改。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ExtinguishFireServerEvent",
            self, self.OnExtinguishFireServerEvent)

    def OnExtinguishFireServerEvent(self, args):
        pos = args["pos"]
        playerId = args["playerId"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### GameTypeChangedClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

个人游戏模式发生变化时客户端触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnGameTypeChangedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 Id。 |
| oldGameType | int | 切换前的游戏模式。 |
| newGameType | int | 切换后的游戏模式。 |

**备注**

- 游戏模式：[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().GameType.*:Survival，Creative，Adventure 分别为 0~2 默认游戏模式发生变化时最后反映在个人游戏模式之上。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "GameTypeChangedClientEvent",
            self, self.OnGameTypeChangedClientEvent)

    def OnGameTypeChangedClientEvent(self, args):
        playerId = args["playerId"]
        oldGameType = args["oldGameType"]
        newGameType = args["newGameType"]
```

</TabItem>
</Tabs>

---

### GameTypeChangedServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

当默认游戏模式或个人游戏模式发生变化时服务端触发，如果个人游戏模式不为默认时，修改默认游戏模式也会同时修改个人游戏模式，此时会触发两次该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnGameTypeChangedServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 Id，[SetDefaultGameType](https://mc.163.com/newdev/docs/api/jiekou/shijie/youxiguize.html#setdefaultgametype)接口改变游戏模式时该参数为空字符串。 |
| oldGameType | int | 切换前的游戏模式。 |
| newGameType | int | 切换后的游戏模式。 |

**备注**

- 游戏模式：[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().GameType.*:Survival，Creative，Adventure 分别为 0~2，Spectator 为 6 默认游戏模式发生变化时最后反映在个人游戏模式之上。注意：避免在该事件中调用修改 ability 相关的接口，比如 [ChangePlayerFlyState](/docs/docs/scripts/modapi/interfaces/player/behavior#changeplayerflystate) 等接口，如确实需要，可加定时器延后调用。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "GameTypeChangedServerEvent",
            self, self.OnGameTypeChangedServerEvent)

    def OnGameTypeChangedServerEvent(self, args):
        playerId = args["playerId"]
        oldGameType = args["oldGameType"]
        newGameType = args["newGameType"]
```

</TabItem>
</Tabs>

---

### MountTamingEvent

<Version type="china" add="3.3"/>

<Server/>

玩家通过骑乘驯服生物后触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnMountTamingEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| eid | str | 生物 id。 |
| pid | str | 玩家 id。 |

**备注**

- 该事件是检测 minecraft:tamemount 行为包组件，即玩家通过不断骑乘生物，使其冒出爱心时触发。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "MountTamingEvent",
            self, self.OnMountTamingEvent)

    def OnMountTamingEvent(self, args):
        eid = args["eid"]
        pid = args["pid"]
```

</TabItem>
</Tabs>

---

### OnLocalPlayerActionClientEvent

<Version type="china" add="3.2"/>

<Client/>

玩家动作事件，当本地玩家开始/停止某些动作时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnLocalPlayerActionClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| actionType | int | 动作事件枚举，详见 Minecraft 枚举值文档的[PlayerActionType](/docs/docs/scripts/modapi/enums#playeractiontype)。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnLocalPlayerActionClientEvent",
            self, self.OnOnLocalPlayerActionClientEvent)

    def OnOnLocalPlayerActionClientEvent(self, args):
        actionType = args["actionType"]
```

</TabItem>
</Tabs>

---

### OnLocalPlayerStartJumpClientEvent

<Version type="china" add="3.2"/>

<Client/>

本地玩家开始跳跃时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnLocalPlayerStartJumpClientEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnLocalPlayerStartJumpClientEvent",
            self, self.OnOnLocalPlayerStartJumpClientEvent)

    def OnOnLocalPlayerStartJumpClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### OnPlayerActionServerEvent

<Version type="china" add="3.2"/>

<Server/>

玩家动作事件，当玩家开始/停止某些动作时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnPlayerActionServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |
| actionType | int | 动作事件枚举，详见 Minecraft 枚举值文档的[PlayerActionType](/docs/docs/scripts/modapi/enums#playeractiontype)。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "OnPlayerActionServerEvent",
            self, self.OnOnPlayerActionServerEvent)

    def OnOnPlayerActionServerEvent(self, args):
        playerId = args["playerId"]
        actionType = args["actionType"]
```

</TabItem>
</Tabs>

---

### OnPlayerHitBlockClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

触发时机：通过 OpenPlayerHitBlockDetection 打开方块碰撞检测后，当玩家碰撞到方块时触发该事件。玩家着地时会触发 [OnGroundClientEvent](/docs/docs/scripts/modapi/events/entity#ongroundclientevent)，而不是该事件。客户端和服务端分别作碰撞检测，可能两个事件返回的结果略有差异。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnPlayerHitBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 碰撞到方块的玩家 Id。 |
| posX | int | 碰撞方块 x 坐标。 |
| posY | int | 碰撞方块 y 坐标。 |
| posZ | int | 碰撞方块 z 坐标。 |
| blockId | str | 碰撞方块的 identifier。 |
| auxValue | int | 碰撞方块的附加值。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnPlayerHitBlockClientEvent",
            self, self.OnOnPlayerHitBlockClientEvent)

    def OnOnPlayerHitBlockClientEvent(self, args):
        playerId = args["playerId"]
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        blockId = args["blockId"]
        auxValue = args["auxValue"]
```

</TabItem>
</Tabs>

#### OpenPlayerHitBlockDetection

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

开启碰撞方块的检测，开启后碰撞时会触发 OnPlayerHitBlockClientEvent 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenPlayerHitBlockDetection(precision: float) -> bool
```

- precision: float，碰撞检测精度，参数需要在区间[0, 1)，值越小，表示碰撞检测精度越高（可以理解为轻轻碰一下就能触发）。

**返回值**：bool，是否设置成功。

**备注**

- 注：该碰撞检测会屏蔽草、空气、火、高草四种方块。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.OpenPlayerHitBlockDetection(0.0001)
```

</TabItem>
</Tabs>

#### ClosePlayerHitBlockDetection

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

关闭碰撞方块的检测，关闭后将不会触发 OnPlayerHitBlockClientEvent 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClosePlayerHitBlockDetection() -> bool
```


**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.ClosePlayerHitBlockDetection()
```

</TabItem>
</Tabs>

---

### OnPlayerHitBlockServerEvent

<Version type="china" add="1.21"/>

<Server/>

触发时机：通过 OpenPlayerHitBlockDetection 打开方块碰撞检测后，当玩家碰撞到方块时触发该事件。监听玩家着地请使用客户端的 [OnGroundClientEvent](/docs/docs/scripts/modapi/events/entity#ongroundclientevent)。客户端和服务端分别作碰撞检测，可能两个事件返回的略有差异。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnPlayerHitBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 碰撞到方块的玩家 Id。 |
| posX | int | 碰撞方块 x 坐标。 |
| posY | int | 碰撞方块 y 坐标。 |
| posZ | int | 碰撞方块 z 坐标。 |
| blockId | str | 碰撞方块的 identifier。 |
| auxValue | int | 碰撞方块的附加值。 |
| dimensionId | int | 维度 id。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "OnPlayerHitBlockServerEvent",
            self, self.OnOnPlayerHitBlockServerEvent)

    def OnOnPlayerHitBlockServerEvent(self, args):
        playerId = args["playerId"]
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        blockId = args["blockId"]
        auxValue = args["auxValue"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

#### OpenPlayerHitBlockDetection

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

开启碰撞方块的检测，开启后碰撞时会触发 OnPlayerHitBlockServerEvent 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenPlayerHitBlockDetection(precision: float) -> bool
```

- precision: float，碰撞检测精度，参数需要在区间[0, 1)，值越小，表示碰撞检测精度越高（可以理解为轻轻碰一下就能触发）。

**返回值**：bool，是否设置成功。

**备注**

- 注：该碰撞检测会屏蔽草、空气、火、高草四种方块。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.OpenPlayerHitBlockDetection(0.0001)
```

</TabItem>
</Tabs>

#### ClosePlayerHitBlockDetection

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

关闭碰撞方块的检测，关闭后将不会触发 OnPlayerHitBlockServerEvent 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClosePlayerHitBlockDetection() -> bool
```


**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.ClosePlayerHitBlockDetection()
```

</TabItem>
</Tabs>

---

### PerspChangeClientEvent

<Version type="china" add="1.21"/>

<Client/>

视角切换时会触发的事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPerspChangeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| from | int | 切换前的视角。 |
| to | int | 切换后的视角。 |

**备注**

- 视角数字代表含义 0: 第一人称 1: 第三人称背面 2: 第三人称正面。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "PerspChangeClientEvent",
            self, self.OnPerspChangeClientEvent)

    def OnPerspChangeClientEvent(self, args):
        from_ = args["from"]
        to = args["to"]
```

</TabItem>
</Tabs>

---

### PlayerAttackEntityEvent

<Version type="china" add="3.3"/>

<Server/>

触发时机：当玩家攻击时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerAttackEntityEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |
| victimId | str | 受击者 id。 |
| damage | float | 伤害值：引擎传过来的值是 0 允许脚本层修改为其他数。 |
| isValid | int | 脚本是否设置伤害值：1 表示是；0 表示否。 |
| cancel | bool | 是否取消该次攻击，默认不取消。 |
| isKnockBack | bool | 是否支持击退效果，默认支持，当不支持时将屏蔽武器击退附魔效果。 |
| isCrit | bool | 本次攻击是否产生暴击,不支持修改。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerAttackEntityEvent",
            self, self.OnPlayerAttackEntityEvent)

    def OnPlayerAttackEntityEvent(self, args):
        playerId = args["playerId"]
        victimId = args["victimId"]
        damage = args["damage"]
        isValid = args["isValid"]
        cancel = args["cancel"]
        isKnockBack = args["isKnockBack"]
        isCrit = args["isCrit"]
```

</TabItem>
</Tabs>

<Client/>

触发时机：当本地玩家攻击时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerAttackEntityEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |
| victimId | str | 受击者 id。 |
| damage | float | 客户端收到的是真实伤害值，且修改无效。 |
| isCrit | bool | 本次攻击是否产生暴击,不支持修改。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "PlayerAttackEntityEvent",
            self, self.OnPlayerAttackEntityEvent)

    def OnPlayerAttackEntityEvent(self, args):
        playerId = args["playerId"]
        victimId = args["victimId"]
        damage = args["damage"]
        isCrit = args["isCrit"]
```

</TabItem>
</Tabs>

---

### PlayerCheatSpinAttackServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：玩家开始/结束快速旋转攻击并且不符合发送快速旋转攻击条件时触发（装备激流附魔的三叉戟、在水中或雨中，且未骑乘）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerCheatSpinAttackServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家的 entityId。 |
| isStart | bool | True 时代表开始快速旋转攻击；False 时代表结束快速旋转攻击。 |

**备注**

- 假如没有自定义类似三叉戟/激流附魔的物品，那么触发此事件说明此有很大可能此玩家使用了【杀戮光环】外挂。

仅 Apollo 可用

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerCheatSpinAttackServerEvent",
            self, self.OnPlayerCheatSpinAttackServerEvent)

    def OnPlayerCheatSpinAttackServerEvent(self, args):
        playerId = args["playerId"]
        isStart = args["isStart"]
```

</TabItem>
</Tabs>

---

### PlayerDieEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：当玩家死亡时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerDieEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 玩家 id。 |
| attacker | str | 伤害来源 id。 |
| customTag | str | 使用[Hurt 接口](https://mc.163.com/newdev/docs/api/jiekou/shiti/xingwei.html#hurt)传入的自定义伤害类型。 |
| cause | str | 伤害来源，详见 Minecraft 枚举值文档的[ActorDamageCause](/docs/docs/scripts/modapi/enums#actordamagecause)。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerDieEvent",
            self, self.OnPlayerDieEvent)

    def OnPlayerDieEvent(self, args):
        id = args["id"]
        attacker = args["attacker"]
        customTag = args["customTag"]
        cause = args["cause"]
```

</TabItem>
</Tabs>

---

### PlayerDoInteractServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

玩家与有 minecraft:interact 组件的生物交互时触发该事件，例如玩家手持空桶对牛挤奶、玩家手持打火石点燃苦力怕。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerDoInteractServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |
| itemDict | Dict[str, Any] | 交互时使用物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。 |
| interactEntityId | str | 交互的生物 entityId。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerDoInteractServerEvent",
            self, self.OnPlayerDoInteractServerEvent)

    def OnPlayerDoInteractServerEvent(self, args):
        playerId = args["playerId"]
        itemDict = args["itemDict"]
        interactEntityId = args["interactEntityId"]
```

</TabItem>
</Tabs>

---

### PlayerEatFoodServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：玩家吃下食物时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerEatFoodServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 Id。 |
| itemDict | Dict[str, Any] | 食物物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。 |
| hunger | int | 食物增加的饥饿值，可修改。 |
| nutrition | float | 食物的营养价值，回复饱和度 = 食物增加的饥饿值 * 食物的营养价值 * 2，饱和度最大不超过当前饥饿值，可修改。 |

**备注**

- 由于牛奶本身并没有饱食度的概念，因此，当喝牛奶触发该事件时，饥饿度、营养价值字段无效并始终为 0。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerEatFoodServerEvent",
            self, self.OnPlayerEatFoodServerEvent)

    def OnPlayerEatFoodServerEvent(self, args):
        playerId = args["playerId"]
        itemDict = args["itemDict"]
        hunger = args["hunger"]
        nutrition = args["nutrition"]
```

</TabItem>
</Tabs>

---

### PlayerFeedEntityServerEvent

<Version type="china" add="2.9"/>

<Server/>

玩家喂养生物时触发，例如玩家手持小麦喂养牛、玩家手持胡萝卜喂养幼年猪。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerFeedEntityServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 主动喂养生物的玩家的唯一 ID。 |
| entityId | str | 被喂养生物的唯一 ID。 |
| itemDict | Dict[str, Any] | 当前玩家手持物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。 |
| cancel | bool | 是否取消触发，默认为 False，若设为 True，可阻止触发后续的生物喂养逻辑。 |

**备注**

- 1.对于幼年生物，用对应的物品喂养后就可以触发事件，例如用小麦喂养幼年牛、用生鲑鱼喂养幼年猫；2.对于成年生物，用对应的物品喂养后，该生物要进入“求爱模式”（持续散发红心粒子），才可以触发事件。特殊的成年生物列举如下：a.可骑乘生物，例如马，玩家要驯服马后，再给它喂养食物（例如金苹果、金萝卜），才可以触发事件；已驯服的马受伤后，用金苹果喂养时会治疗马，不触发事件，马的血量回满时，再喂养金苹果，才会触发事件；b.可驯服生物，例如狼，玩家要用骨头驯服狼后，再给它喂养肉类物品（例如熟猪排），才可以触发事件；c.需要在特定环境下才能繁殖的生物，例如熊猫，玩家用竹子喂养熊猫时，熊猫的 5 格内至少要有 8 根竹子，喂养后才可以触发事件。3.该事件中如需调用使用手持物相关的接口，如 [PlayerUseItemToEntity](/docs/docs/scripts/modapi/interfaces/player/behavior#playeruseitemtoentity) 或其他设置物品数量的接口，会导致接口正常调用但是物品数量计算异常，建议通过 timer 延迟调用。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerFeedEntityServerEvent",
            self, self.OnPlayerFeedEntityServerEvent)

    def OnPlayerFeedEntityServerEvent(self, args):
        playerId = args["playerId"]
        entityId = args["entityId"]
        itemDict = args["itemDict"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### PlayerFishingAfterServerEvent

<Version type="china" add="3.8"/>

<Server/>

玩家钓鱼成功收杆后触发，在钓鱼掉落物生成后触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerFishingAfterServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 钓鱼的玩家 id。 |
| hookEntity | str | 鱼钩实体 id。 |
| itemDict | Dict[str, Any] | 玩家手持鱼竿的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。 |
| itemList | List[Dict[str, Any]] | 钓鱼获得的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)列表（只读）。 |
| itemEntityIdList | List[str] | 钓鱼生成的掉落物实体 id 列表，与 itemList 一一对应。 |

**备注**

- 此事件在掉落物实体生成后触发，可通过 itemEntityIdList 获取生成的掉落物实体 id 进行后续操作。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerFishingAfterServerEvent",
            self, self.OnPlayerFishingAfterServerEvent)

    def OnPlayerFishingAfterServerEvent(self, args):
        playerId = args["playerId"]
        hookEntity = args["hookEntity"]
        itemDict = args["itemDict"]
        itemList = args["itemList"]
        itemEntityIdList = args["itemEntityIdList"]
```

</TabItem>
</Tabs>

---

### PlayerFishingServerEvent

<Version type="china" add="3.8"/>

<Server/>

玩家钓鱼成功收杆时触发，在钓鱼掉落物生成前触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerFishingServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 钓鱼的玩家 id。 |
| hookEntity | str | 鱼钩实体 id。 |
| itemDict | Dict[str, Any] | 玩家手持鱼竿的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。 |
| itemList | List[Dict[str, Any]] | 钓鱼获得的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)列表，支持修改。修改后需将 itemChange 设置为 True。 |
| itemChange | bool | 是否修改了 itemList，默认为 False。当修改了 itemList 时需要设置为 True 才能生效。 |
| cancel | bool | 是否取消钓鱼成功，设置为 True 时不会生成掉落物。 |

**备注**

- 设置 cancel 为 True 时，不会生成掉落物，也不会触发 [PlayerFishingAfterServerEvent](/docs/docs/scripts/modapi/events/player#playerfishingafterserverevent) 事件。
- 修改 itemList 后必须设置 itemChange 为 True，否则修改不会生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerFishingServerEvent",
            self, self.OnPlayerFishingServerEvent)

    def OnPlayerFishingServerEvent(self, args):
        playerId = args["playerId"]
        hookEntity = args["hookEntity"]
        itemDict = args["itemDict"]
        itemList = args["itemList"]
        itemChange = args["itemChange"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### PlayerHungerChangeServerEvent

<Version type="china" add="2.10"/>

<Server/>

玩家饥饿度变化时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerHungerChangeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |
| hungerBefore | float | 变化前的饥饿度。 |
| hunger | float | 变化后的饥饿度。 |
| cancel | bool | 是否取消饥饿度变化。 |

**备注**

- 当通过 setplayerhunger 接口设置饥饿度时，不会触发服务端对应的事件。
- 当通过/hunger 等指令设置饥饿度设置时，hunger 字段值可能会超过最大饥饿度。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerHungerChangeServerEvent",
            self, self.OnPlayerHungerChangeServerEvent)

    def OnPlayerHungerChangeServerEvent(self, args):
        playerId = args["playerId"]
        hungerBefore = args["hungerBefore"]
        hunger = args["hunger"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### PlayerHurtEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：当玩家受伤害前触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerHurtEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 受击玩家 id。 |
| attacker | str | 伤害来源实体 id，若没有实体攻击，例如高空坠落，id 为-1。 |
| customTag | str | 使用[Hurt 接口](https://mc.163.com/newdev/docs/api/jiekou/shiti/xingwei.html#hurt)传入的自定义伤害类型。 |
| cause | str | 伤害来源，详见 Minecraft 枚举值文档的[ActorDamageCause](/docs/docs/scripts/modapi/enums#actordamagecause)。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerHurtEvent",
            self, self.OnPlayerHurtEvent)

    def OnPlayerHurtEvent(self, args):
        id = args["id"]
        attacker = args["attacker"]
        customTag = args["customTag"]
        cause = args["cause"]
```

</TabItem>
</Tabs>

---

### PlayerInteractServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：玩家可以与实体交互时。如果是鼠标控制模式，则当准心对着实体时触发。如果是触屏模式，则触发时机与屏幕下方的交互按钮显示的时机相同。玩家真正与实体发生交互的事件见 [PlayerDoInteractServerEvent](/docs/docs/scripts/modapi/events/player#playerdointeractserverevent)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerInteractServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| cancel | bool | 是否取消触发，默认为 False，若设为 True，可阻止触发后续的实体交互事件。 |
| playerId | str | 主动与实体互动的玩家的唯一 ID。 |
| itemDict | Dict[str, Any] | 当前玩家手持物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。 |
| victimId | str | 被动的实体的唯一 ID。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerInteractServerEvent",
            self, self.OnPlayerInteractServerEvent)

    def OnPlayerInteractServerEvent(self, args):
        cancel = args["cancel"]
        playerId = args["playerId"]
        itemDict = args["itemDict"]
        victimId = args["victimId"]
```

</TabItem>
</Tabs>

---

### PlayerNamedEntityServerEvent

<Version type="china" add="2.9"/>

<Server/>

玩家用命名牌重命名实体时触发，例如玩家手持命名牌对羊修改名字、玩家手持命名牌对盔甲架修改名字。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerNamedEntityServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 主动命名实体的玩家的唯一 ID。 |
| entityId | str | 被命名实体的唯一 ID。 |
| preName | str | 实体当前的名字。 |
| afterName | str | 实体重命名后的名字。 |
| cancel | bool | 是否取消触发，默认为 False，若设为 True，可阻止触发后续的实体命名逻辑。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerNamedEntityServerEvent",
            self, self.OnPlayerNamedEntityServerEvent)

    def OnPlayerNamedEntityServerEvent(self, args):
        playerId = args["playerId"]
        entityId = args["entityId"]
        preName = args["preName"]
        afterName = args["afterName"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### PlayerPermissionChangeClientEvent

<Version type="china" add="3.5"/>

<Client/>

玩家权限变更事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerPermissionChangeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| causePlayerId | str | 发起者 id。 |
| playerId | str | 玩家 id。 |
| oldPermission | Dict[str, Any] | 变化前的权限字典。 |
| newPermission | Dict[str, Any] | 变化后的权限字典。 |
| changeCause | int | 变化原因，详见 Minecraft 枚举值文档的[PermissionChangeCause](/docs/docs/scripts/modapi/enums#permissionchangecause)。 |

**备注**

- 具体权限说明：

| 权限字段 | 类型 | 说明 |
| --- | --- | --- |
| build | bool | 放置方块 |
| mine | bool | 采集方块 |
| doorsandswitches | bool | 使用门和开关 |
| opencontainers | bool | 打开容器 |
| attackplayers | bool | 攻击玩家 |
| attackmobs | bool | 攻击生物 |
| op | bool | 操作员命令 |
| teleport | bool | 使用传送 |

- 当 [PlayerPermissionChangeServerEvent](/docs/docs/scripts/modapi/events/player#playerpermissionchangeserverevent) 事件返回"cancel"为 True 时，权限变动被取消，该事件不会触发。
- 如果进入游戏的玩家权限为“成员”时，不会触发此事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "PlayerPermissionChangeClientEvent",
            self, self.OnPlayerPermissionChangeClientEvent)

    def OnPlayerPermissionChangeClientEvent(self, args):
        causePlayerId = args["causePlayerId"]
        playerId = args["playerId"]
        oldPermission = args["oldPermission"]
        newPermission = args["newPermission"]
        changeCause = args["changeCause"]
```

</TabItem>
</Tabs>

---

### PlayerPermissionChangeServerEvent

<Version type="china" add="3.5"/>

<Server/>

玩家权限变更事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerPermissionChangeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| causePlayerId | str | 发起者 id。 |
| playerId | str | 玩家 id。 |
| oldPermission | Dict[str, Any] | 变化前的权限字典。 |
| newPermission | Dict[str, Any] | 变化后的权限字典。 |
| changeCause | int | 变化原因，详见 Minecraft 枚举值文档的[PermissionChangeCause](/docs/docs/scripts/modapi/enums#permissionchangecause)。 |
| cancel | bool | 为 true 时，取消本次权限变更。 |

**备注**

- 具体权限说明：

| 权限字段 | 类型 | 说明 |
| --- | --- | --- |
| build | bool | 放置方块 |
| mine | bool | 采集方块 |
| doorsandswitches | bool | 使用门和开关 |
| opencontainers | bool | 打开容器 |
| attackplayers | bool | 攻击玩家 |
| attackmobs | bool | 攻击生物 |
| op | bool | 操作员命令 |
| teleport | bool | 使用传送 |


在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerPermissionChangeServerEvent",
            self, self.OnPlayerPermissionChangeServerEvent)

    def OnPlayerPermissionChangeServerEvent(self, args):
        causePlayerId = args["causePlayerId"]
        playerId = args["playerId"]
        oldPermission = args["oldPermission"]
        newPermission = args["newPermission"]
        changeCause = args["changeCause"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### PlayerRespawnEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：玩家复活时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerRespawnEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 玩家 id。 |

**备注**

- 该事件为玩家点击重生按钮时触发，但是触发时玩家可能尚未完成复活，此时请勿对玩家进行切维度或设置生命值等操作 一般情况下推荐使用 [PlayerRespawnFinishServerEvent](/docs/docs/scripts/modapi/events/player#playerrespawnfinishserverevent)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerRespawnEvent",
            self, self.OnPlayerRespawnEvent)

    def OnPlayerRespawnEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### PlayerRespawnFinishServerEvent

<Version type="china" add="1.21"/>

<Server/>

触发时机：玩家复活完毕时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerRespawnFinishServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |

**备注**

- 该事件触发时玩家已重生完毕，可以安全使用切维度等操作。
- 通过末地传送门回到主世界时也算重生，同样也会触发该事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerRespawnFinishServerEvent",
            self, self.OnPlayerRespawnFinishServerEvent)

    def OnPlayerRespawnFinishServerEvent(self, args):
        playerId = args["playerId"]
```

</TabItem>
</Tabs>

---

### PlayerSleepServerEvent

<Version type="china" add="1.24"/>

<Server/>

玩家使用床睡觉成功。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerSleepServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |
| fullName | str | 方块 id。 |
| auxData | int | 方块附加值。 |
| dimensionid | int | 维度 id。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerSleepServerEvent",
            self, self.OnPlayerSleepServerEvent)

    def OnPlayerSleepServerEvent(self, args):
        playerId = args["playerId"]
        fullName = args["fullName"]
        auxData = args["auxData"]
        dimensionid = args["dimensionid"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
```

</TabItem>
</Tabs>

---

### PlayerSpinAttackServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：玩家开始/结束快速旋转攻击时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerSpinAttackServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家的 entityId。 |
| isInWaterOrRain | bool | 是否在水中或雨中。 |
| isRiding | bool | 是否骑乘状态。 |
| isStart | bool | True 时代表开始快速旋转攻击；False 时代表结束快速旋转攻击。 |

仅 Apollo 可用

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerSpinAttackServerEvent",
            self, self.OnPlayerSpinAttackServerEvent)

    def OnPlayerSpinAttackServerEvent(self, args):
        playerId = args["playerId"]
        isInWaterOrRain = args["isInWaterOrRain"]
        isRiding = args["isRiding"]
        isStart = args["isStart"]
```

</TabItem>
</Tabs>

---

### PlayerStartFishingServerEvent

<Version type="china" add="3.8"/>

<Server/>

玩家开始钓鱼，生成鱼钩时在服务端触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerStartFishingServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 钓鱼成功的玩家 id。 |
| hookEntity | str | 鱼钩实体 id。 |
| itemDict | Dict[str, Any] | 玩家手持鱼竿的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。 |
| cancel | bool | 是否取消，设置为 True 时会取消生成鱼漂。 |

**备注**

- 此事件在鱼钩实体生成后触发，设置 cancel 为 True 可取消本次抛竿操作。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerStartFishingServerEvent",
            self, self.OnPlayerStartFishingServerEvent)

    def OnPlayerStartFishingServerEvent(self, args):
        playerId = args["playerId"]
        hookEntity = args["hookEntity"]
        itemDict = args["itemDict"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### PlayerStopSleepServerEvent

<Version type="china" add="1.24"/>

<Server/>

玩家停止睡觉。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerStopSleepServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |
| fullName | str | 方块 id。 |
| auxData | int | 方块附加值。 |
| dimensionid | int | 维度 id。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerStopSleepServerEvent",
            self, self.OnPlayerStopSleepServerEvent)

    def OnPlayerStopSleepServerEvent(self, args):
        playerId = args["playerId"]
        fullName = args["fullName"]
        auxData = args["auxData"]
        dimensionid = args["dimensionid"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
```

</TabItem>
</Tabs>

---

### PlayerTeleportEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：当玩家传送时触发该事件，如：玩家使用末影珍珠或 tp 指令时。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerTeleportEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 玩家 id。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerTeleportEvent",
            self, self.OnPlayerTeleportEvent)

    def OnPlayerTeleportEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### PlayerTrySleepServerEvent

<Version type="china" add="1.24"/>

<Server/>

玩家尝试使用床睡觉。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerTrySleepServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |
| cancel | bool | 是否取消（开发者传入）。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerTrySleepServerEvent",
            self, self.OnPlayerTrySleepServerEvent)

    def OnPlayerTrySleepServerEvent(self, args):
        playerId = args["playerId"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### ServerPlayerGetExperienceOrbEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机：玩家获取经验球时触发的事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerPlayerGetExperienceOrbEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |
| experienceValue | int | 经验球经验值。 |
| cancel | bool | 是否取消（开发者传入）。 |

**备注**

- cancel 值设为 True 时，捡起的经验球不会增加经验值，但是经验球一样会消失。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ServerPlayerGetExperienceOrbEvent",
            self, self.OnServerPlayerGetExperienceOrbEvent)

    def OnServerPlayerGetExperienceOrbEvent(self, args):
        playerId = args["playerId"]
        experienceValue = args["experienceValue"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### StoreBuySuccServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

触发时机:玩家游戏内购买商品时服务端抛出的事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStoreBuySuccServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 购买商品的玩家实体 id。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
self.ListenForEvent(serverApi.GetEngineNamespace(),serverApi.GetEngineSystemName(),
    "StoreBuySuccServerEvent",
    self, self.OnStoreBuySucc)
def OnStoreBuySucc(self, args):
    entityId = args['playerId']
    print 'Ship Item.EntityId:', playerId
```

</TabItem>
</Tabs>

---

### UpdatePlayerSkinClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

触发时机：玩家加入游戏或通过更衣室局内换肤后 同步皮肤信息至客户端后触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnUpdatePlayerSkinClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 更换皮肤的玩家 id。 |

**备注**

- 此事件配合 [IsOfficialSkin](/docs/docs/scripts/modapi/interfaces/player/attribute#isofficialskin) [IsHighLevelOfficialSkin](/docs/docs/scripts/modapi/interfaces/player/attribute#ishighlevelofficialskin) [IsHighLevelMultiJointOfficialSkin](/docs/docs/scripts/modapi/interfaces/player/attribute#ishighlevelmultijointofficialskin) 接口 用于获取玩家的皮肤信息。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "UpdatePlayerSkinClientEvent",
            self, self.OnUpdatePlayerSkinClientEvent)

    def OnUpdatePlayerSkinClientEvent(self, args):
        playerId = args["playerId"]
```

</TabItem>
</Tabs>

---
