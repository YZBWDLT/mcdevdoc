---
sidebar_position: 9
---

# 物理

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录物理相关的事件，共 9 个。监听方式见[事件工作机制](/docs/docs/scripts/modapi/overview#事件)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/wuli.html"/>

---

### PhysXJointBreakServerEvent

<Server/>

脚本创建的 PhysX 关节受力超过 [SetJointBreakForce](/docs/docs/scripts/modapi/interfaces/physics/joint#setjointbreakforce) 设置的阈值并断裂后触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPhysXJointBreakServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| jointId | int | 已断裂关节的 ID。 |
| entityId0 | Optional[str] | 关节第 0 端实体 ID；该端连接世界时为 None。 |
| entityId1 | Optional[str] | 关节第 1 端实体 ID；该端连接世界时为 None。 |
| jointType | int | 关节类型：0 固定关节，1 距离关节，2 球关节，3 铰链关节，4 滑动关节。 |
| breakForce | float | 断裂当次模拟中关节承受的线性约束力大小。 |
| breakTorque | float | 断裂当次模拟中关节承受的角约束力矩大小。 |
| dimensionId | int | 关节所在维度 ID。 |

**备注**

- 事件在 PhysX 模拟完成后同步触发。同一关节最多触发一次；事件触发后关节仍可通过 [IsJointBroken](/docs/docs/scripts/modapi/interfaces/physics/joint#isjointbroken) 查询，并应使用 [DestroyJoint](/docs/docs/scripts/modapi/interfaces/physics/joint#destroyjoint) 显式释放。

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
            "PhysXJointBreakServerEvent",
            self, self.OnPhysXJointBreakServerEvent)

    def OnPhysXJointBreakServerEvent(self, args):
        jointId = args["jointId"]
        entityId0 = args["entityId0"]
        entityId1 = args["entityId1"]
        jointType = args["jointType"]
        breakForce = args["breakForce"]
        breakTorque = args["breakTorque"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

---

### PhysXPostSimulateClientEvent

<Client/>

客户端本地玩家当前维度完成 PhysX fetchResults 后触发，可通过 PhysX 组件读取当前帧最新线速度、角速度和四元数旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPhysXPostSimulateClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimensionId | int | 当前完成物理模拟的维度 id。 |
| deltaTime | float | 本次物理模拟的固定时间步长，固定为 0.05 秒。 |

**备注**

- 仅在本地玩家当前维度实际执行物理模拟时触发。事件为同步高频事件，回调中不要执行耗时 IO，也不要销毁实体、维度或物理场景。
- 该事件触发时 PhysX 刚体状态已更新，但普通实体的位置与旋转组件可能尚未完成本游戏刻回写。需要读取当帧结果时应使用 PhysX 组件的速度或四元数接口。
- 事件名大小写敏感，名称中的 PhysX 必须使用大写 X；不要写成 PhysxPostSimulateClientEvent。旧事件 [PhysxTouchClientEvent](/docs/docs/scripts/modapi/events/physics#physxtouchclientevent) 与 [PhysxTriggerClientEvent](/docs/docs/scripts/modapi/events/physics#physxtriggerclientevent) 的命名不同。

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
            "PhysXPostSimulateClientEvent",
            self, self.OnPhysXPostSimulateClientEvent)

    def OnPhysXPostSimulateClientEvent(self, args):
        dimensionId = args["dimensionId"]
        deltaTime = args["deltaTime"]
```

</TabItem>
</Tabs>

---

### PhysXPostSimulateServerEvent

<Server/>

服务端每个参与物理模拟的维度完成 PhysX fetchResults 后触发，可读取当次模拟产生的最新 PhysX 线速度、角速度和旋转状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPhysXPostSimulateServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimensionId | int | 当前刚完成物理模拟的维度 id。 |
| deltaTime | float | 本次物理模拟的固定时间步长，固定为 0.05 秒。 |

**备注**

- 该事件触发时 PhysX 刚体状态已更新，但普通实体位置与旋转组件可能尚未完成本游戏刻回写。需要读取当帧结果时应使用 PhysX 组件的速度或状态接口。
- 该事件为同步高频事件，回调中应只执行轻量读取，不要执行耗时 IO，也不要销毁实体、维度或物理场景。
- 事件名大小写敏感，名称中的 PhysX 必须使用大写 X；不要写成 PhysxPostSimulateServerEvent。旧事件 [PhysxTouchServerEvent](/docs/docs/scripts/modapi/events/physics#physxtouchserverevent) 与 [PhysxTriggerServerEvent](/docs/docs/scripts/modapi/events/physics#physxtriggerserverevent) 的命名不同。

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
            "PhysXPostSimulateServerEvent",
            self, self.OnPhysXPostSimulateServerEvent)

    def OnPhysXPostSimulateServerEvent(self, args):
        dimensionId = args["dimensionId"]
        deltaTime = args["deltaTime"]
```

</TabItem>
</Tabs>

---

### PhysXPreSimulateClientEvent

<Client/>

客户端本地玩家当前维度执行 PhysX simulate 前触发，可用于轻量的视觉预测准备。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPhysXPreSimulateClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimensionId | int | 当前即将执行物理模拟的维度 id。 |
| deltaTime | float | 本次物理模拟的固定时间步长，固定为 0.05 秒。 |

**备注**

- 仅在本地玩家当前维度实际执行物理模拟时触发。该事件为同步高频事件，回调中不要执行耗时 IO，也不要销毁实体、维度或物理场景。
- 当前客户端 PhysX 组件未提供 [AddForce](/docs/docs/scripts/modapi/interfaces/physics/rigid_body#addforce) 或 [AddTorque](/docs/docs/scripts/modapi/interfaces/physics/rigid_body#addtorque) 接口，不能通过本事件向本地刚体施加力或扭矩；客户端可写接口的用途仅限本地视觉预测。
- 事件名大小写敏感，名称中的 PhysX 必须使用大写 X；不要写成 PhysxPreSimulateClientEvent。旧事件 [PhysxTouchClientEvent](/docs/docs/scripts/modapi/events/physics#physxtouchclientevent) 与 [PhysxTriggerClientEvent](/docs/docs/scripts/modapi/events/physics#physxtriggerclientevent) 的命名不同。

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
            "PhysXPreSimulateClientEvent",
            self, self.OnPhysXPreSimulateClientEvent)

    def OnPhysXPreSimulateClientEvent(self, args):
        dimensionId = args["dimensionId"]
        deltaTime = args["deltaTime"]
```

</TabItem>
</Tabs>

---

### PhysXPreSimulateServerEvent

<Server/>

服务端每个参与物理模拟的维度执行 PhysX simulate 前触发。在本事件中对当前维度刚体施加的力或扭矩会参与当次模拟。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPhysXPreSimulateServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimensionId | int | 当前即将执行物理模拟的维度 id。 |
| deltaTime | float | 本次物理模拟的固定时间步长，固定为 0.05 秒。 |

**备注**

- 该事件为同步高频事件，每个参与模拟的维度每游戏刻触发一次。回调中应只执行轻量的物理状态读写，不要执行耗时 IO，也不要销毁实体、维度或物理场景。
- 事件名大小写敏感，名称中的 PhysX 必须使用大写 X；不要写成 PhysxPreSimulateServerEvent。旧事件 [PhysxTouchServerEvent](/docs/docs/scripts/modapi/events/physics#physxtouchserverevent) 与 [PhysxTriggerServerEvent](/docs/docs/scripts/modapi/events/physics#physxtriggerserverevent) 的命名不同。

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
            "PhysXPreSimulateServerEvent",
            self, self.OnPhysXPreSimulateServerEvent)

    def OnPhysXPreSimulateServerEvent(self, args):
        dimensionId = args["dimensionId"]
        deltaTime = args["deltaTime"]
```

</TabItem>
</Tabs>

---

### PhysxTouchClientEvent

<Client/>

给自定义刚体添加的碰撞体，与其他碰撞体或原版实体发生碰撞/结束碰撞时触发。需要在碰撞体创建时使用 PxEventMask.Client 才会触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPhysxTouchClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| touch | List[Dict[str, Any]] | 开始接触的碰撞体对的信息。一个碰撞体在创建时使用了 PxEventMask.Found，他与其他碰撞体/原版实体开始接触时，会出现在列表中。 |
| lost | List[Dict[str, Any]] | 结束接触的碰撞体对的信息。一个碰撞体在创建时使用了 PxEventMask.Lost，他与其他碰撞体/原版实体结束接触时，会出现在列表中。 |

**备注**

- touch 列表每个元素的内容：

```text
{
    "entityId0": str,    // 一个碰撞体所属实体的entityId
    "identifier0": str,  // 一个碰撞体所属实体的identifier
    "shape0": str或None, // 一个碰撞体的userData
    "entityId1": str,    // 另一个碰撞体所属实体的entityId
    "identifier1": str,  // 另一个碰撞体所属实体的identifier
    "shape1": str或None,  // 另一个碰撞体的userData
    "pos": (float,float,float),  // 碰撞点的世界坐标。其中一个碰撞体在创建时使用了PxEventMask.Found_Detail才有该字段
    "normal":(float,float,float)  // 碰撞产生的力的方向，由碰撞体1指向碰撞体0。其中一个碰撞体在创建时使用了PxEventMask.Found_Detail才有该字段
}
```

- lost 列表每个元素的内容：

```text
 {
    "entityId0": str,     // 一个碰撞体所属实体的entityId
    "identifier0": str,   // 一个碰撞体所属实体的identifier
    "shape0": str或None,  // 一个碰撞体的userData
    "entityId1": str,     // 另一个碰撞体所属实体的entityId
    "identifier1": str,   // 另一个碰撞体所属实体的identifier
    "shape1": str或None   // 另一个碰撞体的userData
}
```

- 列表中的碰撞对不分先后，每个碰撞对中的碰撞体 0 与碰撞体 1 也不分先后。

</TabItem>
<TabItem value="示例" label="示例">

```text
{
    "entityId0": str,    // 一个碰撞体所属实体的entityId
    "identifier0": str,  // 一个碰撞体所属实体的identifier
    "shape0": str或None, // 一个碰撞体的userData
    "entityId1": str,    // 另一个碰撞体所属实体的entityId
    "identifier1": str,  // 另一个碰撞体所属实体的identifier
    "shape1": str或None,  // 另一个碰撞体的userData
    "pos": (float,float,float),  // 碰撞点的世界坐标。其中一个碰撞体在创建时使用了PxEventMask.Found_Detail才有该字段
    "normal":(float,float,float)  // 碰撞产生的力的方向，由碰撞体1指向碰撞体0。其中一个碰撞体在创建时使用了PxEventMask.Found_Detail才有该字段
}
```

</TabItem>
</Tabs>

---

### PhysxTouchServerEvent

<Server/>

给自定义刚体添加的碰撞体，与其他碰撞体或原版实体发生碰撞/结束碰撞时触发。需要在碰撞体创建时使用 PxEventMask.Server 才会触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPhysxTouchServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| touch | List[Dict[str, Any]] | 开始接触的碰撞体对的信息。一个碰撞体在创建时使用了 PxEventMask.Found，他与其他碰撞体/原版实体开始接触时，会出现在列表中。 |
| lost | List[Dict[str, Any]] | 结束接触的碰撞体对的信息。一个碰撞体在创建时使用了 PxEventMask.Lost，他与其他碰撞体/原版实体结束接触时，会出现在列表中。 |

**备注**

- touch 列表每个元素的内容：

```text
{
    "entityId0": str,    // 一个碰撞体所属实体的entityId
    "identifier0": str,  // 一个碰撞体所属实体的identifier
    "shape0": str或None, // 一个碰撞体的userData
    "entityId1": str,    // 另一个碰撞体所属实体的entityId
    "identifier1": str,  // 另一个碰撞体所属实体的identifier
    "shape1": str或None,  // 另一个碰撞体的userData
    "pos": (float,float,float),  // 碰撞点的世界坐标。其中一个碰撞体在创建时使用了PxEventMask.Found_Detail才有该字段
    "normal":(float,float,float)  // 碰撞产生的力的方向，由碰撞体1指向碰撞体0。其中一个碰撞体在创建时使用了PxEventMask.Found_Detail才有该字段
}
```

- lost 列表每个元素的内容：

```text
 {
    "entityId0": str,     // 一个碰撞体所属实体的entityId
    "identifier0": str,   // 一个碰撞体所属实体的identifier
    "shape0": str或None,  // 一个碰撞体的userData
    "entityId1": str,     // 另一个碰撞体所属实体的entityId
    "identifier1": str,   // 另一个碰撞体所属实体的identifier
    "shape1": str或None   // 另一个碰撞体的userData
}
```

- 列表中的碰撞对不分先后，每个碰撞对中的碰撞体 0 与碰撞体 1 也不分先后。

</TabItem>
<TabItem value="示例" label="示例">

```text
{
    "entityId0": str,    // 一个碰撞体所属实体的entityId
    "identifier0": str,  // 一个碰撞体所属实体的identifier
    "shape0": str或None, // 一个碰撞体的userData
    "entityId1": str,    // 另一个碰撞体所属实体的entityId
    "identifier1": str,  // 另一个碰撞体所属实体的identifier
    "shape1": str或None,  // 另一个碰撞体的userData
    "pos": (float,float,float),  // 碰撞点的世界坐标。其中一个碰撞体在创建时使用了PxEventMask.Found_Detail才有该字段
    "normal":(float,float,float)  // 碰撞产生的力的方向，由碰撞体1指向碰撞体0。其中一个碰撞体在创建时使用了PxEventMask.Found_Detail才有该字段
}
```

</TabItem>
</Tabs>

---

### PhysxTriggerClientEvent

<Client/>

给自定义刚体添加的触发器，与其他碰撞体或原版实体进入/离开触发器时触发。需要在触发器创建时使用 PxEventMask.Client 才会触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPhysxTriggerClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| found | List[Dict[str, Any]] | 进入触发器的碰撞体对的信息。它与其他碰撞体/原版实体进入触发器时，会出现在列表中。 |
| lost | List[Dict[str, Any]] | 离开触发器的碰撞体对的信息。它与其他碰撞体/原版实体离开触发器时，会出现在列表中。 |

**备注**

- found 列表每个元素的内容：

```text
{
    "entityId0": str,    // 触发器所属实体的entityId
    "identifier0": str,  // 触发器所属实体的identifier
    "shape0": dict|None, // 触发器的userData (NeEvent::Object)
    "entityId1": str,    // 另一方实体的entityId
    "identifier1": str,  // 另一方实体的identifier
    "shape1": dict|None  // 另一方碰撞体的userData (NeEvent::Object)
}
```

- lost 列表每个元素的内容：

```text
 {
    "entityId0": str,     // 触发器所属实体的entityId
    "identifier0": str,   // 触发器所属实体的identifier
    "shape0": dict|None,  // 触发器的userData
    "entityId1": str,     // 另一方实体的entityId
    "identifier1": str,   // 另一方实体的identifier
    "shape1": dict|None   // 另一方碰撞体的userData
}
```

</TabItem>
<TabItem value="示例" label="示例">

```text
{
    "entityId0": str,    // 触发器所属实体的entityId
    "identifier0": str,  // 触发器所属实体的identifier
    "shape0": dict|None, // 触发器的userData (NeEvent::Object)
    "entityId1": str,    // 另一方实体的entityId
    "identifier1": str,  // 另一方实体的identifier
    "shape1": dict|None  // 另一方碰撞体的userData (NeEvent::Object)
}
```

</TabItem>
</Tabs>

---

### PhysxTriggerServerEvent

<Server/>

给自定义刚体添加的触发器，与其他碰撞体或原版实体发生进入触发器/离开触发器时触发。需要在触发器创建时使用 PxEventMask.Server 才会触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPhysxTriggerServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| found | List[Dict[str, Any]] | 进入触发器的碰撞体对的信息。一个碰撞体在创建时使用了 PxEventMask.Found，它与其他碰撞体/原版实体进入触发器时，会出现在列表中。 |
| lost | List[Dict[str, Any]] | 离开触发器的碰撞体对的信息。一个碰撞体在创建时使用了 PxEventMask.Lost，它与其他碰撞体/原版实体离开触发器时，会出现在列表中。 |

**备注**

- found 列表每个元素的内容：

```text
{
    "entityId0": str,    // 触发器所属实体的entityId
    "identifier0": str,  // 触发器所属实体的identifier
    "shape0": str或None, // 触发器的userData (NeEvent::Object)
    "entityId1": str,    // 进入触发器的碰撞体所属实体的entityId
    "identifier1": str,  // 进入触发器的碰撞体所属实体的identifier
    "shape1": str或None  // 进入触发器的碰撞体的userData (NeEvent::Object)
}
```

- lost 列表每个元素的内容：

```text
    {
    "entityId0": str,     // 触发器所属实体的entityId
    "identifier0": str,   // 触发器所属实体的identifier
    "shape0": str或None,  // 触发器的userData (NeEvent::Object)
    "entityId1": str,     // 离开触发器的碰撞体所属实体的entityId
    "identifier1": str,   // 离开触发器的碰撞体所属实体的identifier
    "shape1": str或None   // 离开触发器的碰撞体的userData (NeEvent::Object)
}
```

- 列表中的碰撞对不分先后，每个碰撞对中的碰撞体 0 与碰撞体 1 的具体角色取决于底层触发逻辑。

</TabItem>
<TabItem value="示例" label="示例">

```text
{
    "entityId0": str,    // 触发器所属实体的entityId
    "identifier0": str,  // 触发器所属实体的identifier
    "shape0": str或None, // 触发器的userData (NeEvent::Object)
    "entityId1": str,    // 进入触发器的碰撞体所属实体的entityId
    "identifier1": str,  // 进入触发器的碰撞体所属实体的identifier
    "shape1": str或None  // 进入触发器的碰撞体的userData (NeEvent::Object)
}
```

</TabItem>
</Tabs>

---
