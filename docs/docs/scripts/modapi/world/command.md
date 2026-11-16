---
sidebar_position: 14
---

# 指令

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录指令相关的接口，共 5 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/zhiling.html"/>

---

### GetCommandPermissionLevel

<Server/> CommandCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateCommand(levelId)`

返回设定使用/op 命令时 OP 的权限等级（对应 server.properties 中的 op-permission-level 配置）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCommandPermissionLevel() -> int
```


**返回值**：int，权限等级：1-OP 可以绕过重生点保护；2-OP 可以使用所有单人游戏作弊命令；3-OP 可以使用大多数多人游戏中独有的命令；4-OP 可以使用所有命令。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateCommand(levelId)
opLevel = comp.GetCommandPermissionLevel()
print "GetCommandPermissionLevel oplevel={}".format(opLevel)
```

</TabItem>
</Tabs>

---

### GetDefaultPlayerPermissionLevel

<Server/> CommandCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateCommand(levelId)`

返回新玩家加入时的权限身份（对应 server.properties 中的 default-player-permission-level 配置）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDefaultPlayerPermissionLevel() -> int
```


**返回值**：int，权限身份：0-Visitor；1-Member；2-Operator；3-自定义。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateCommand(levelId)
opLevel = comp.GetDefaultPlayerPermissionLevel()
print "GetDefaultPlayerPermissionLevel oplevel={}".format(opLevel)
```

</TabItem>
</Tabs>

---

### SetCommand

<Server/> CommandCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateCommand(levelId)`

使用游戏内指令。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCommand(cmdStr: str, entityId: str, showOutput: bool = False) -> bool
```

- cmdStr: str，指令。
- entityId: str，实体 Id:可选，如果不设置，则随机选择玩家。
- showOutput: bool，是否输出到聊天窗口：可选，默认 False，如果为 True 的话，指令正确时，才会和聊天框输入原生指令一样输出返回信息。只有当该参数为 True 的时候会触发 [OnCommandOutputServerEvent](/docs/docs/scripts/modapi/events/world#oncommandoutputserverevent) 与 [OnCommandOutputClientEvent](/docs/docs/scripts/modapi/events/world#oncommandoutputclientevent)。

**返回值**：bool，命令是否执行成功。

**备注**

- entityId 为非玩家时，即使 showOutput 为 true，也不会输出到聊天窗口，且 [OnCommandOutputClientEvent](/docs/docs/scripts/modapi/events/world#oncommandoutputclientevent) 事件不会被触发。
- 极限模式下 需要开启作弊的指令无法调用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateCommand(levelId)
comp.SetCommand("/tp @p 100 5 100")#传送指令
```

</TabItem>
</Tabs>

---

### SetCommandPermissionLevel

<Server/> CommandCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateCommand(levelId)`

设置当玩家使用/op 命令时 OP 的权限等级（对应 server.properties 中的 op-permission-level 配置）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCommandPermissionLevel(opLevel: int) -> bool
```

- opLevel: int，权限等级：1-OP 可以绕过重生点保护；2-OP 可以使用所有单人游戏作弊命令；3-OP 可以使用大多数多人游戏中独有的命令；4-OP 可以使用所有命令。

**返回值**：bool，命令是否执行成功。

**备注**

- 此 API 不会修改已经获取了 op 的玩家的权限等级，仅影响调用 API 之后才获取 op 的玩家，建议在游戏初始化时调用此 API。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateCommand(levelId)
opLevel = 4
suc = comp.SetCommandPermissionLevel(opLevel)
print "SetCommandPermissionLevel to {} suc={}".format(opLevel, suc)
```

</TabItem>
</Tabs>

---

### SetDefaultPlayerPermissionLevel

<Server/> CommandCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateCommand(levelId)`

设置新玩家加入时的权限身份（对应 server.properties 中的 default-player-permission-level 配置）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDefaultPlayerPermissionLevel(opLevel: int) -> bool
```

- opLevel: int，权限身份：0-Visitor；1-Member；2-Operator；3-自定义。

**返回值**：bool，命令是否执行成功。

**备注**

- 此 API 不会修改已经加入过游戏的玩家的权限身份，仅影响调用 API 之后才新加入的玩家，建议在游戏初始化时调用此 API。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateCommand(levelId)
opLevel = 1
suc = comp.SetDefaultPlayerPermissionLevel(opLevel)
print "SetDefaultPlayerPermissionLevel to {} suc={}".format(opLevel, suc)
```

</TabItem>
</Tabs>

---
