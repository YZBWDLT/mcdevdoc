---
sidebar_position: 105
---

# 事件

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录事件相关的接口，共 11 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/tongyong/shijian.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### BroadcastEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> <Client/> BaseSystem

系统方法，在自定义 System 类中直接调用。

本地广播事件，客户端 system 广播的事件仅客户端 system 能监听，服务器 system 广播的事件仅服务端 system 能监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BroadcastEvent(eventName: str, eventData: Dict[str, Any]) -> Any
```

- eventName: str，事件名。
- eventData: Dict[str, Any]，事件参数，一般用 [CreateEventData](/docs/docs/scripts/modapi/interfaces/general/event#createeventdata) 的返回值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def BroadCastEventTest(self, args):
        self.BroadcastEvent("bulletShootEvent", args)
```

</TabItem>
</Tabs>

---

### BroadcastToAllClient

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ServerSystem

系统方法，在自定义 System 类中直接调用。

服务器广播事件到所有客户端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BroadcastToAllClient(eventName: str, eventData: Dict[str, Any]) -> Any
```

- eventName: str，事件名。
- eventData: Dict[str, Any]，事件参数，一般用 [CreateEventData](/docs/docs/scripts/modapi/interfaces/general/event#createeventdata) 的返回值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def BroadCastEventTest(self, args):
        self.BroadcastToAllClient("bulletShootEvent", args)
```

</TabItem>
</Tabs>

---

### CreateEventData

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> <Client/> BaseSystem

系统方法，在自定义 System 类中直接调用。

创建自定义事件的数据，eventData 用于发送事件。创建的 eventData 可以理解为一个 dict，可以嵌套赋值 dict,list 和基本数据类型，但不支持 tuple。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateEventData() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，事件数据。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def shoot(self):
        shootData = self.CreateEventData()
        shootData["id"] = self.mPlayerId
        # 向客户端发送事件，传递了一个playerId
        self.NotifyToClient('-12345678910','BulletHit', shootData)
```

</TabItem>
</Tabs>

---

### GetEngineNamespace

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

获取引擎事件的命名空间。监听引擎事件时，namespace 传该接口返回的 namespace。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> str
```


**返回值**：str，引擎的命名空间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(), ‘AddServerPlayerEvent’, self, self.OnPlayerAdd)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取引擎事件的命名空间。监听引擎事件时，namespace 传该接口返回的 namespace。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> str
```


**返回值**：str，引擎的命名空间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()
class FpsClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(clientApi.GetEngineNamespace(), clientApi.GetEngineSystemName(), 'UiInitFinished', self, self.OnUIInitFinished)
```

</TabItem>
</Tabs>

---

### GetEngineSystemName

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

获取引擎系统名。监听引擎事件时，systemName 传该接口返回的 systemName。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> str
```


**返回值**：str，引擎的 systemName。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(), ‘AddServerPlayerEvent’, self, self.OnPlayerAdd)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取引擎系统名。监听引擎事件时，systemName 传该接口返回的 systemName。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> str
```


**返回值**：str，引擎的 systemName。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()
class FpsClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(clientApi.GetEngineNamespace(), clientApi.GetEngineSystemName(), 'UiInitFinished', self, self.OnUIInitFinished)
```

</TabItem>
</Tabs>

---

### ListenForEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> <Client/> BaseSystem

系统方法，在自定义 System 类中直接调用。

注册监听某个系统抛出的事件。若监听引擎事件时，namespace 和 systemName 分别为 [GetEngineNamespace](/docs/docs/scripts/modapi/interfaces/general/event#getenginenamespace)()和 [GetEngineSystemName](/docs/docs/scripts/modapi/interfaces/general/event#getenginesystemname)()。具体每个事件的详细事件 data 可以参考"事件"分类下的内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ListenForEvent(
    namespace: str,
    systemName: str,
    eventName: str,
    instance: Any,
    func: Callable,
    priority: int = 0,
) -> Any
```

- namespace: str，所监听事件的来源系统的 namespace。
- systemName: str，所监听事件的来源系统的 systemName。
- eventName: str，事件名。
- instance: Any，回调函数所属的类的实例。
- func: Callable，回调函数。
- priority: int，这个回调函数的优先级。默认值为 0，这个数值越大表示被执行的优先级越高，最高为 10。

**备注**

- 服务端 system 监听的客户端系统事件的回调参数中会自带一个叫"__id__"的 key，值为对应客户端的玩家 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def ListenEvent(self):
        # 监听了引擎事件'ServerChatEvent'
        self.ListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(), 'ServerChatEvent', self, self.OnServerChat)
        # 监听客户端系统事件
        self.ListenForEvent("MyFpsMod", "FpsClientSystem", "MyEvent", self, self.OnMyEvent)

    def OnServerChat(self, args):
        print 'OnServerChat', args

    def OnMyEvent(self, args):
        print 'OnMyEvent', args['__id__'], args
```

</TabItem>
</Tabs>

---

### NotifyToClient

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ServerSystem

系统方法，在自定义 System 类中直接调用。

服务器发送事件到指定客户端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
NotifyToClient(targetId: str, eventName: str, eventData: Dict[str, Any]) -> Any
```

- targetId: str，客户端对应的 Id，一般就是玩家 Id。
- eventName: str，事件名。
- eventData: Dict[str, Any]，事件参数，一般用 [CreateEventData](/docs/docs/scripts/modapi/interfaces/general/event#createeventdata) 的返回值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def NotifyToClientTest(self, args):
        self.NotifyToClient('-1234567890',"bulletShootEvent", args)
```

</TabItem>
</Tabs>

---

### NotifyToMultiClients

<Version type="china" add="2.0"/>

<Server/> ServerSystem

系统方法，在自定义 System 类中直接调用。

服务器发送事件到指定一批客户端，相比于在 for 循环内使用 [NotifyToClient](/docs/docs/scripts/modapi/interfaces/general/event#notifytoclient) 性能更好。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
NotifyToMultiClients(
    targetIdList: List[str],
    eventName: str,
    eventData: Dict[str, Any],
) -> Any
```

- targetIdList: List[str]，客户端对应的 playerId 列表，playerId 为玩家的 entityId。
- eventName: str，事件名。
- eventData: Dict[str, Any]，事件参数，一般用 [CreateEventData](/docs/docs/scripts/modapi/interfaces/general/event#createeventdata) 的返回值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def NotifyToClientTest(self, args):
        self.NotifyToMultiClients(['-1234567890', '-321654987'],"bulletShootEvent", args)
```

</TabItem>
</Tabs>

---

### NotifyToServer

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ClientSystem

系统方法，在自定义 System 类中直接调用。

客户端发送事件到服务器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
NotifyToServer(eventName: str, eventData: Dict[str, Any]) -> Any
```

- eventName: str，事件名。
- eventData: Dict[str, Any]，事件参数，一般用 [CreateEventData](/docs/docs/scripts/modapi/interfaces/general/event#createeventdata) 的返回值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()
class FpsClientSystem(ClientSystem):
    def NotifyToServerTest(self, args):
        self.NotifyToServer("bulletShootEvent", args)
```

</TabItem>
</Tabs>

---

### UnListenAllEvents

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> <Client/> BaseSystem

系统方法，在自定义 System 类中直接调用。

反注册监听某个系统抛出的所有事件，即不再监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnListenAllEvents() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def ListenEvent(self):
        # 服务端脚本自定义了1个事件
        self.DefineEvent('BulletHit')
        # 服务器端脚本监听了引擎的1个事件'ServerChatEvent'
        # 具体每个事件的详细事件data可以参考《MODSDK文档》
        self.ListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(), 'ServerChatEvent', self, self.OnServerChat)
    def UnListenEvent(self):
        # 取消自定义的事件
        self.UnDefineEvent('BulletHit')
        # 取消监听的系统事件
        self.UnListenAllEvents()
```

</TabItem>
</Tabs>

---

### UnListenForEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> <Client/> BaseSystem

系统方法，在自定义 System 类中直接调用。

反注册监听某个系统抛出的事件，即不再监听。若是引擎事件，则 namespace 和 systemName 分别为 [GetEngineNamespace](/docs/docs/scripts/modapi/interfaces/general/event#getenginenamespace) 和 [GetEngineSystemName](/docs/docs/scripts/modapi/interfaces/general/event#getenginesystemname)。与 [ListenForEvent](/docs/docs/scripts/modapi/interfaces/general/event#listenforevent) 对应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnListenForEvent(
    namespace: str,
    systemName: str,
    eventName: str,
    instance: Any,
    func: Callable,
    priority: int = 0,
) -> Any
```

- namespace: str，所监听事件的来源系统的 namespace。
- systemName: str，所监听事件的来源系统的 systemName。
- eventName: str，事件名。
- instance: Any，回调函数所属的类的实例。
- func: Callable，回调函数。
- priority: int，这个回调函数的优先级。默认值为 0，这个数值越大表示被执行的优先级越高。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def ListenEvent(self):
        # 服务端脚本自定义了1个事件
        self.DefineEvent('BulletHit')
        # 服务器端脚本监听了引擎的1个事件'ServerChatEvent'
        self.ListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(), 'ServerChatEvent', self, self.OnServerChat)
    def UnListenEvent(self):
        # 取消自定义的事件
        self.UnDefineEvent('BulletHit')
        # 取消监听的系统事件
        self.UnListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(), 'ServerChatEvent', self, self.OnServerChat)
```

</TabItem>
</Tabs>

---
