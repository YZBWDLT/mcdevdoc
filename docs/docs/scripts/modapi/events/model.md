---
sidebar_position: 8
---

# 模型

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录模型相关的事件，共 9 个。监听方式见[事件工作机制](/docs/docs/scripts/modapi/overview#事件)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/moxing.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_event" color="green"/>

---

### AttackAnimBeginClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

攻击动作开始时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnAttackAnimBeginClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 实体 id。 |

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 替换骨骼模型后，该事件才生效。

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
            "AttackAnimBeginClientEvent",
            self, self.OnAttackAnimBeginClientEvent)

    def OnAttackAnimBeginClientEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### AttackAnimBeginServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

当攻击动作开始时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnAttackAnimBeginServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 实体 id。 |

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 替换骨骼模型后，该事件才生效。

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
            "AttackAnimBeginServerEvent",
            self, self.OnAttackAnimBeginServerEvent)

    def OnAttackAnimBeginServerEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### AttackAnimEndClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

攻击动作结束时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnAttackAnimEndClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 实体 id。 |

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 替换骨骼模型后，该事件才生效。

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
            "AttackAnimEndClientEvent",
            self, self.OnAttackAnimEndClientEvent)

    def OnAttackAnimEndClientEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### AttackAnimEndServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

当攻击动作结束时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnAttackAnimEndServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 实体 id。 |

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 替换骨骼模型后，该事件才生效。

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
            "AttackAnimEndServerEvent",
            self, self.OnAttackAnimEndServerEvent)

    def OnAttackAnimEndServerEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### JumpAnimBeginServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

当跳跃动作开始时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnJumpAnimBeginServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 实体 id。 |

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 替换骨骼模型后，该事件才生效。

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
            "JumpAnimBeginServerEvent",
            self, self.OnJumpAnimBeginServerEvent)

    def OnJumpAnimBeginServerEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### WalkAnimBeginClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

走路动作开始时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnWalkAnimBeginClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 实体 id。 |

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 替换骨骼模型后，该事件才生效。

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
            "WalkAnimBeginClientEvent",
            self, self.OnWalkAnimBeginClientEvent)

    def OnWalkAnimBeginClientEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### WalkAnimBeginServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

当走路动作开始时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnWalkAnimBeginServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 实体 id。 |

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 替换骨骼模型后，该事件才生效。

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
            "WalkAnimBeginServerEvent",
            self, self.OnWalkAnimBeginServerEvent)

    def OnWalkAnimBeginServerEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### WalkAnimEndClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

走路动作结束时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnWalkAnimEndClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 实体 id。 |

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 替换骨骼模型后，该事件才生效。

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
            "WalkAnimEndClientEvent",
            self, self.OnWalkAnimEndClientEvent)

    def OnWalkAnimEndClientEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---

### WalkAnimEndServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

当走路动作结束时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnWalkAnimEndServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| id | str | 实体 id。 |

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 替换骨骼模型后，该事件才生效。

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
            "WalkAnimEndServerEvent",
            self, self.OnWalkAnimEndServerEvent)

    def OnWalkAnimEndServerEvent(self, args):
        id = args["id"]
```

</TabItem>
</Tabs>

---
