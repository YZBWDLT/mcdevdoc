---
sidebar_position: 9
---

# 游戏模式

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录游戏模式相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wanjia/youximoshi.html"/>

---

### GetPlayerGameType

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取指定玩家的游戏模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerGameType(playerId: str) -> int
```

- playerId: str，玩家 id。

**返回值**：int，[GameType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GameType.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
gameType = comp.GetPlayerGameType(playerId)
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取指定玩家的游戏模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerGameType(playerId: str) -> int
```

- playerId: str，玩家 id。

**返回值**：int，[GameType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GameType.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
gameType = comp.GetPlayerGameType(playerId)
```

</TabItem>
</Tabs>

---

### SetPlayerGameType

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家个人游戏模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerGameType(gameType: int) -> bool
```

- gameType: int，[GameType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GameType.html)。

**返回值**：bool，是否设置成功。

**备注**

- 极限模式不可修改玩家个人游戏模式。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPlayerGameType(serverApi.GetMinecraftEnum().GameType.Survival)
```

</TabItem>
</Tabs>

---
