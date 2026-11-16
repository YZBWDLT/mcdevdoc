---
sidebar_position: 4
---

# 权限

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录权限相关的接口，共 12 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wanjia/quanxian.html"/>

---

### GetPlayerAbilities

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家具体权限。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerAbilities() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，具体权限，详见备注。

**备注**

- 具体权限说明。

| 权限字段 | 数据类型 | 说明 |
| --- | --- | --- |
| build | bool | 放置方块 |
| mine | bool | 采集方块 |
| doorsandswitches | bool | 使用门和开关 |
| opencontainers | bool | 打开容器 |
| attackplayers | bool | 攻击玩家 |
| attackmobs | bool | 攻击生物 |
| op | bool | 操作员命令 |
| teleport | bool | 使用传送 |

- 返回值示例。

```python
{'teleport': True, 'opencontainers': True, 'mine': True, 'build': True, 'op': True, 'attackmobs': True, 'doorsandswitches': True, 'attackplayers': True}
```

</TabItem>
<TabItem value="示例" label="示例">

```python
{'teleport': True, 'opencontainers': True, 'mine': True, 'build': True, 'op': True, 'attackmobs': True, 'doorsandswitches': True, 'attackplayers': True}
```

</TabItem>
</Tabs>

---

### GetPlayerOperation

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家权限类型信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerOperation() -> int
```


**返回值**：int，权限类型，Visitor 为 0，Member 为 1，Operator 为 2，Custom 为 3。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
operation = comp.GetPlayerOperation()
```

</TabItem>
</Tabs>

---

### SetAttackMobsAbility

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家能否攻击生物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAttackMobsAbility(canAttack: bool) -> bool
```

- canAttack: bool，能否攻击生物。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetAttackMobsAbility(False)
```

</TabItem>
</Tabs>

---

### SetAttackPlayersAbility

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家能否攻击其他玩家。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAttackPlayersAbility(canAttack: bool) -> bool
```

- canAttack: bool，能否攻击其他玩家。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetAttackPlayersAbility(False)
```

</TabItem>
</Tabs>

---

### SetBuildAbility

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家能否放置方块，该接口的设置会存档，且只影响生存模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBuildAbility(canBuild: bool) -> bool
```

- canBuild: bool，能否放置方块。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetBuildAbility(False)
```

</TabItem>
</Tabs>

---

### SetMineAbility

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家能否摧毁方块，该接口的设置会存档，且只影响生存模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMineAbility(canMine: bool) -> bool
```

- canMine: bool，能否摧毁方块。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetMineAbility(False)
```

</TabItem>
</Tabs>

---

### SetOpenContainersAbility

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家能否打开容器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetOpenContainersAbility(canOpen: bool) -> bool
```

- canOpen: bool，能否打开容器。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetOpenContainersAbility(False)
```

</TabItem>
</Tabs>

---

### SetOperateDoorsAndSwitchesAbility

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家能否与门和开关交互。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetOperateDoorsAndSwitchesAbility(canOperate: bool) -> bool
```

- canOperate: bool，能否与门和开关交互。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetOperateDoorsAndSwitchesAbility(False)
```

</TabItem>
</Tabs>

---

### SetOperatorCommandAbility

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家是否具有操作员命令权限。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetOperatorCommandAbility(canOperate: bool) -> bool
```

- canOperate: bool，是否能发送操作员命令。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetOperatorCommandAbility(False)
```

</TabItem>
</Tabs>

---

### SetPermissionLevel

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家权限等级。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPermissionLevel(level: int) -> bool
```

- level: int，权限等级，0 为访客、1 为成员、2 为操作员、3 为自定义。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPermissionLevel(3)
```

</TabItem>
</Tabs>

---

### SetPlayerMute

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家是否禁言，该接口的设置不存档。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerMute(isMute: bool) -> bool
```

- isMute: bool，是否禁言。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPlayerMute(True)
```

</TabItem>
</Tabs>

---

### SetTeleportAbility

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家能否使用 TP 指令。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTeleportAbility(canTeleport: bool) -> bool
```

- canTeleport: bool，能否使用 TP 指令。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetTeleportAbility(False)
```

</TabItem>
</Tabs>

---
