---
sidebar_position: 6
---

# 属性

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录属性相关的接口，共 36 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wanjia/shuxing.html"/>

---

### AddPlayerExperience

<Server/> ExpComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateExp(entityId)`

增加玩家经验值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerExperience(exp: int) -> bool
```

- exp: int，玩家经验值，可设置负数。

**返回值**：bool，设置是否成功。

**备注**

- 如果设置的 exp 值为负数，且超过当前等级已有的经验值，调用接口后，该玩家等级不会下降但是经验值会置为最小值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExp(entityId)
comp.AddPlayerExperience(25)
```

</TabItem>
</Tabs>

---

### AddPlayerLevel

<Server/> LevelComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateLv(playerId)`

修改玩家等级。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerLevel(level: int) -> bool
```

- level: int，玩家等级，可设置负数。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateLv(playerId)
comp.AddPlayerLevel(2)
```

</TabItem>
</Tabs>

---

### CollectOnlineClientData

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

收集在线玩家客户端数据，用于判断玩家是否作弊。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CollectOnlineClientData(
    collectTypes: List[str],
    callback: Callable,
    extraArgs: Optional[Dict[str, Any]] = None,
) -> Any
```

- collectTypes: List[str]，数据类型，不同类型收集到不同数据，具体说明参见备注。
- callback: Callable，回调函数，用于分析数据并判断玩家是否作弊，包含两个参数，第一个参数是 playerId，类型 str；第二个参数表示收集到的数据，dict 类型，内容由 collectTypes 决定的，具体参见备注，若数据收集失败则为 None（比如玩家不在线）。
- extraArgs: Optional[Dict[str, Any]]，默认为 None，根据 collectTypes 传入不同参数，具体说明参见备注。

**备注**

- collectTypes 中类型解释如下 game 类型收集到的数据字典解释如下：

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| gameType | int | 游戏模式，含义：-1：获取失败，0：生存模式，1：创造模式，2：冒险模式，3：旁观者模式 |
| levelGravity | float | 世界的重力因子 |

- player 类型收集到的数据字典解释如下：

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| playerHealth | int | 玩家生命值 |

- world 类型收集到的数据字典解释如下：

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| blockName | str | 某一位置方块的名称，要求 extraArgs 参数包含 pos 参数 |
| blockAuxValue | int | 某一位置方块的附加值 AuxValue，要求 extraArgs 参数字典中包含"pos"，若缺少则没有数据 |

- entity 类型收集到的数据字典解释如下：

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| entityPos | tuple(float,float,float) | 实体位置，具体参见客户端 GetPos 接口说明，要求 extraArgs 参数字典中包含"entityId"，若缺少则没有数据 |
| entityGravity | float | 获取实体的重力因子，当生物重力因子为 0 时则应用世界的重力因子，要求 extraArgs 参数字典中包含"entityId"，若缺少则没有数据 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
def ProcessData(playerId, data):
    #正常返回实例：ProcessData 123 {'blockAuxValue': 0, 'blockName': 'minecraft:air', 'blockBoxSize': (-1.0, -1.0), 'gameType': 1, 'entityPos': (123,456,789), 'levelGravity': -0.08, 'playerHealth': 20, 'entityGravity': 0.0}
    #失败返回实例：ProcessData 123 None
    print 'ProcessData', playerId, data
comp.CollectOnlineClientData(['player', 'world', 'entity', 'game'], ProcessData, {'entityId' :'123', 'pos' : (123,456,789))})
```

</TabItem>
</Tabs>

---

### GetArmorValue

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家护甲值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetArmorValue(playerId: str) -> int
```

- playerId: str，玩家 id。

**返回值**：int，获取玩家护甲值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetArmorValue(playerId))
```

</TabItem>
</Tabs>

---

### GetEnchantmentSeed

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家的附魔种子，该种子会决定附魔台上准备附魔的装备的附魔项。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEnchantmentSeed() -> int
```


**返回值**：int，附魔种子。

**备注**

- 该属性会自动存档。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetEnchantmentSeed()
```

</TabItem>
</Tabs>

---

### GetPlayerCurLevelExp

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家当前等级需要的经验值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerCurLevelExp(playerId: str) -> int
```

- playerId: str，玩家 id。

**返回值**：int，玩家当前等级需要的经验值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetPlayerCurLevelExp(playerId))
```

</TabItem>
</Tabs>

---

### GetPlayerCurrentExhaustionValue

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家 foodExhaustionLevel 的当前消耗度。详见[消耗度介绍](https://zh.minecraft.wiki/w/%E9%A5%A5%E9%A5%BF#%E6%9C%BA%E5%88%B6)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerCurrentExhaustionValue() -> float
```


**返回值**：float，玩家 foodExhaustionLevel 的当前消耗度,

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
value = comp.GetPlayerCurrentExhaustionValue()
```

</TabItem>
</Tabs>

---

### GetPlayerExp

<Server/> ExpComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateExp(entityId)`

获取玩家当前等级下的经验值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerExp(isPercent: bool) -> float
```

- isPercent: bool，是否为百分比。

**返回值**：float，玩家经验值。

**备注**

- 如果设置返回百分比为 False，则返回玩家当前等级下经验的绝对值（非当前玩家总经验值）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExp(entityId)
print(comp.GetPlayerExp(False))
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家当前等级下的经验值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerExp(playerId: str, isPercent: bool) -> float
```

- playerId: str，玩家 id。
- isPercent: bool，是否为百分比, 如果设置返回百分比为 False，则返回玩家当前等级下经验的绝对值（非当前玩家总经验值）。

**返回值**：float，玩家经验值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetPlayerExp(playerId, False))
```

</TabItem>
</Tabs>

---

### GetPlayerHealthLevel

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

获取玩家健康临界值，当饥饿值大于等于健康临界值时会自动恢复血量，开启饥饿值且开启自然恢复时有效。原版默认值为 18。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerHealthLevel() -> int
```


**返回值**：int，健康临界值，-1 表示获取失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
print(comp.GetPlayerHealthLevel())
```

</TabItem>
</Tabs>

---

### GetPlayerHealthTick

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

获取玩家自然恢复速度，当饥饿值大于等于健康临界值时会自动恢复血量，开启饥饿值且开启自然恢复时有效。原版默认值为 80 刻（即每 4 秒）恢复 1 点血量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerHealthTick() -> int
```


**返回值**：int，自然恢复速度，-1 表示获取失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
print(comp.GetPlayerHealthTick())
```

</TabItem>
</Tabs>

---

### GetPlayerHunger

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家饥饿度，展示在 UI 饥饿度进度条上，初始值为 20，即每一个鸡腿代表 2 个饥饿度。**饱和度(saturation)**：玩家当前饱和度，初始值为 5，最大值始终为玩家当前饥饿度(hunger)，该值直接影响玩家**饥饿度(hunger)**。<br/>1）增加方法：吃食物。<br/>2）减少方法：每触发一次**消耗事件**，该值减少 1，如果该值不大于 0，直接把玩家 **饥饿度(hunger)** 减少 1。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerHunger() -> float
```


**返回值**：float，玩家饥饿度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetPlayerHunger()
```

</TabItem>
</Tabs>

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家饥饿度，展示在 UI 饥饿度进度条上，初始值为 20，即每一个鸡腿代表 2 个饥饿度。**饱和度(saturation)**：玩家当前饱和度，初始值为 5，最大值始终为玩家当前饥饿度(hunger)，该值直接影响玩家**饥饿度(hunger)**。<br/>1）增加方法：吃食物。<br/>2）减少方法：每触发一次**消耗事件**，该值减少 1，如果该值不大于 0，直接把玩家 **饥饿度(hunger)** 减少 1。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerHunger() -> float
```


**返回值**：float，玩家饥饿度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetPlayerHunger()
```

</TabItem>
</Tabs>

---

### GetPlayerLevel

<Server/> LevelComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateLv(playerId)`

获取玩家等级。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerLevel() -> int
```


**返回值**：int，玩家等级。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateLv(playerId)
comp.GetPlayerLevel()
```

</TabItem>
</Tabs>

---

### GetPlayerMaxExhaustionValue

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家 foodExhaustionLevel 的归零值，常量值，默认为 4。**消耗度（exhaustion）**是指玩家当前消耗度水平，初始值为 0，该值会随着玩家一系列动作（如跳跃）的影响而增加，当该值大于最大消耗度（maxExhaustion）后归零，并且把饱和度（saturation）减少 1（为了说明饥饿度机制，我们将此定义为**消耗事件**）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerMaxExhaustionValue() -> float
```


**返回值**：float，玩家 foodExhaustionLevel 的归零值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetPlayerMaxExhaustionValue()
```

</TabItem>
</Tabs>

---

### GetPlayerStarveLevel

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

获取玩家饥饿临界值，当饥饿值小于饥饿临界值时会自动扣除血量，开启饥饿值且开启饥饿掉血时有效。原版默认值为 1。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerStarveLevel() -> int
```


**返回值**：int，饥饿临界值 -1 表示获取失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
print(comp.GetPlayerStarveLevel())
```

</TabItem>
</Tabs>

---

### GetPlayerStarveTick

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

获取玩家饥饿掉血速度，当饥饿值小于饥饿临界值时会自动扣除血量，开启饥饿值且开启饥饿掉血时有效。原版默认值为 80 刻（即每 4 秒）扣除 1 点血量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerStarveTick() -> int
```


**返回值**：int，饥饿掉血速度，-1 表示获取失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
print(comp.GetPlayerStarveTick())
```

</TabItem>
</Tabs>

---

### GetPlayerTotalExp

<Server/> ExpComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateExp(entityId)`

获取玩家的总经验值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerTotalExp() -> int
```


**返回值**：int，总经验值，正整数。获取失败的情况下返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExp(entityId)
print(comp.GetPlayerTotalExp())
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家的总经验值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerTotalExp(playerId: str) -> int
```

- playerId: str，玩家 id。

**返回值**：int，总经验值，正整数。获取失败的情况下返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetPlayerTotalExp(playerId))
```

</TabItem>
</Tabs>

---

### IsHighLevelMultiJointOfficialSkin

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家穿戴的皮肤是否为史诗及以上的多关节官方 4d 皮肤 在接收到 [UpdatePlayerSkinClientEvent](/docs/docs/scripts/modapi/events/player#updateplayerskinclientevent) 事件后调用 此事件在客户端接收到玩家皮肤信息同步后触发 参数仅 playerId。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsHighLevelMultiJointOfficialSkin(playerId: str) -> bool
```

- playerId: str，玩家 ID。

**返回值**：bool，史诗及以上的多关节官方 4d 皮肤返回 True。

</TabItem>
<TabItem value="示例" label="示例">

```python
self.ListenForEvent('Minecraft', "Engine", 'UpdatePlayerSkinClientEvent', self, self.onUpdatePlayerSkinClientEvent)
def onUpdatePlayerSkinClientEvent(self,args):
    import mod.client.extraClientApi as clientApi
    comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
    comp.IsHighLevelMultiJointOfficialSkin(args['playerId'])
```

</TabItem>
</Tabs>

---

### IsHighLevelOfficialSkin

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家穿戴的皮肤是否为史诗及以上的官方 4d 皮肤 在接收到 [UpdatePlayerSkinClientEvent](/docs/docs/scripts/modapi/events/player#updateplayerskinclientevent) 事件后调用 此事件在客户端接收到玩家皮肤信息同步后触发 参数仅 playerId。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsHighLevelOfficialSkin(playerId: str) -> bool
```

- playerId: str，玩家 ID。

**返回值**：bool，史诗及以上的官方 4d 皮肤返回 True。

</TabItem>
<TabItem value="示例" label="示例">

```python
self.ListenForEvent('Minecraft', "Engine", 'UpdatePlayerSkinClientEvent', self, self.onUpdatePlayerSkinClientEvent)
def onUpdatePlayerSkinClientEvent(self,args):
    import mod.client.extraClientApi as clientApi
    comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
    comp.IsHighLevelOfficialSkin(args['playerId'])
```

</TabItem>
</Tabs>

---

### IsMultiJointOfficialSkin

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家穿戴的皮肤是否为多关节官方 4d 皮肤 在接收到 [UpdatePlayerSkinClientEvent](/docs/docs/scripts/modapi/events/player#updateplayerskinclientevent) 事件后调用 此事件在客户端接收到玩家皮肤信息同步后触发 参数仅 playerId。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsMultiJointOfficialSkin(playerId: str) -> bool
```

- playerId: str，玩家 ID。

**返回值**：bool，多关节官方 4d 皮肤返回 True。

</TabItem>
<TabItem value="示例" label="示例">

```python
self.ListenForEvent('Minecraft', "Engine", 'UpdatePlayerSkinClientEvent', self, self.onUpdatePlayerSkinClientEvent)
def onUpdatePlayerSkinClientEvent(self,args):
    import mod.client.extraClientApi as clientApi
    comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
    comp.IsMultiJointOfficialSkin(args['playerId'])
```

</TabItem>
</Tabs>

---

### IsOfficialSkin

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家穿戴的皮肤是否为官方 4d 皮肤 在接收到 [UpdatePlayerSkinClientEvent](/docs/docs/scripts/modapi/events/player#updateplayerskinclientevent) 事件后调用 此事件在客户端接收到玩家皮肤信息同步后触发 参数仅 playerId。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsOfficialSkin(playerId: str) -> bool
```

- playerId: str，玩家 ID。

**返回值**：bool，官方 4d 皮肤返回 True。

</TabItem>
<TabItem value="示例" label="示例">

```python
self.ListenForEvent('Minecraft', "Engine", 'UpdatePlayerSkinClientEvent', self, self.onUpdatePlayerSkinClientEvent)
def onUpdatePlayerSkinClientEvent(self,args):
    import mod.client.extraClientApi as clientApi
    comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
    comp.IsOfficialSkin(args['playerId'])
```

</TabItem>
</Tabs>

---

### IsPlayerNaturalRegen

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

是否开启玩家自然恢复，当饥饿值大于等于健康临界值时会自动恢复血量，开启饥饿值且开启自然恢复时有效。原版默认开启。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsPlayerNaturalRegen() -> bool
```


**返回值**：bool，True 表示开启，False 表示关闭，None 表示获取失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
print(comp.IsPlayerNaturalRegen())
```

</TabItem>
</Tabs>

---

### IsPlayerNaturalStarve

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

是否开启玩家饥饿掉血，当饥饿值小于饥饿临界值时会自动恢复血量，开启饥饿值且开启饥饿掉血时有效。原版默认开启。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsPlayerNaturalStarve() -> bool
```


**返回值**：bool，True 表示开启，False 表示关闭，None 表示获取失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
print(comp.IsPlayerNaturalStarve())
```

</TabItem>
</Tabs>

---

### SetEnchantmentSeed

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家的附魔种子，该种子会决定附魔台上准备附魔的装备的附魔项。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEnchantmentSeed(enchantmentSeed: int) -> bool
```

- enchantmentSeed: int，种子，随机数量多，开发者可使用 [GetEnchantmentSeed](/docs/docs/scripts/modapi/interfaces/player/attribute#getenchantmentseed) 获取当前的随机种子，自行记录。

**返回值**：bool，是否设置成功。

**备注**

- 该属性会自动存档。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetEnchantmentSeed(32)
```

</TabItem>
</Tabs>

---

### SetPlayerCurrentExhaustionValue

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家 foodExhaustionLevel 的当前消耗度。详见[消耗度介绍](https://zh.minecraft.wiki/w/%E9%A5%A5%E9%A5%BF#%E6%9C%BA%E5%88%B6)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerCurrentExhaustionValue(value: float) -> bool
```

- value: float，当前消耗度。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
result = comp.SetPlayerCurrentExhaustionValue(2.0)
```

</TabItem>
</Tabs>

---

### SetPlayerHealthLevel

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

设置玩家健康临界值，当饥饿值大于等于健康临界值时会自动恢复血量，开启饥饿值且开启自然恢复时有效.原版默认值为 18。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerHealthLevel(healthLevel: int) -> bool
```

- healthLevel: int，健康临界值。

**返回值**：bool，是否设置成功。

**备注**

- 注：健康临界值始终大于等于饥饿临界值。如果设置的健康临界值小于饥饿临界值，饥饿临界值将被设置为当前的健康临界值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.SetPlayerHealthLevel(16) # 饥饿值大于等于16就会进入自然恢复状态，默认每隔4秒恢复1点血量
```

</TabItem>
</Tabs>

---

### SetPlayerHealthTick

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

设置玩家自然恢复速度，当饥饿值大于等于健康临界值时会自动恢复血量，开启饥饿值且开启自然恢复时有效.原版默认值为 80 刻（即每 4 秒）恢复 1 点血量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerHealthTick(healthTick: int) -> bool
```

- healthTick: int，自然恢复速度。

**返回值**：bool，是否设置成功。

**备注**

- 注：最小值为 1，即每秒恢复 20 点血量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.SetPlayerHealthTick(40) # 自然恢复状态下每隔2（40/20）秒恢复1点血量
```

</TabItem>
</Tabs>

---

### SetPlayerHunger

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家饥饿度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerHunger(value: float) -> bool
```

- value: float，饥饿度。

**返回值**：bool，是否设置成功。

**备注**

- 该接口修改的饥饿度不能触发 [PlayerHungerChangeServerEvent](/docs/docs/scripts/modapi/events/player#playerhungerchangeserverevent) 事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPlayerHunger(10)
```

</TabItem>
</Tabs>

---

### SetPlayerMaxExhaustionValue

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家**最大消耗度(maxExhaustion)**，通过调整 **最大消耗度(maxExhaustion)** 的大小，就可以调整 **饥饿度(hunger)** 的消耗速度，当 **最大消耗度(maxExhaustion)** 很大时，饥饿度可以看似一直不下降。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerMaxExhaustionValue(value: float) -> bool
```

- value: float，**最大消耗度(maxExhaustion)**。

**返回值**：bool，是否设置成功。

**备注**

- 例如：当 最大消耗度(maxExhaustion) 为 4 时，玩家的饥饿消耗速度是 最大消耗度(maxExhaustion) 为 8 时的两倍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPlayerMaxExhaustionValue(10.0)
```

</TabItem>
</Tabs>

---

### SetPlayerNaturalRegen

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

设置是否开启玩家自然恢复，当饥饿值大于等于健康临界值时会自动恢复血量，开启饥饿值且开启自然恢复时有效.原版默认开启。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerNaturalRegen(value: bool) -> bool
```

- value: bool，True 开启，False 关闭。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.SetPlayerNaturalRegen(False) # 关闭自然恢复，即使饥饿值大于健康临界值时也不会恢复血量
```

</TabItem>
</Tabs>

---

### SetPlayerNaturalStarve

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

设置是否开启玩家饥饿掉血，当饥饿值小于饥饿临界值时会自动扣除血量，开启饥饿值且开启饥饿掉血时有效.原版默认开启。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerNaturalStarve(value: bool) -> bool
```

- value: bool，True 开启，False 关闭。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.SetPlayerNaturalStarve(False) # 关闭饥饿掉血，即使饥饿值小于饥饿临界值时也不会扣除血量
```

</TabItem>
</Tabs>

---

### SetPlayerPrefixAndSuffixName

<Server/> NameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateName(playerId)`

设置玩家前缀和后缀名字。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerPrefixAndSuffixName(
    prefix: str,
    prefixColor: str,
    suffix: str,
    suffixColor: str,
    nameColor: str,
) -> bool
```

- prefix: str，前缀内容。
- prefixColor: str，前缀内容颜色描述，可以使用 GenerateColor 接口传入参数。
- suffix: str，后缀内容。
- suffixColor: str，后缀内容颜色描述，可以使用 GenerateColor 接口传入参数。
- nameColor: str，名字颜色描述，可以使用 GenerateColor 接口传入参数,默认为空。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateName(playerId)
comp.SetPlayerPrefixAndSuffixName("红队",serverApi.GenerateColor('RED'),'肉盾',serverApi.GenerateColor('RED'), serverApi.GenerateColor('BLUE'))
```

</TabItem>
</Tabs>

---

### SetPlayerStarveLevel

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

设置玩家饥饿临界值，当饥饿值小于饥饿临界值时会自动扣除血量，开启饥饿值且开启饥饿掉血时有效。原版默认值为 1。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerStarveLevel(starveLevel: int) -> bool
```

- starveLevel: int，饥饿临界值。

**返回值**：bool，是否设置成功。

**备注**

- 注：健康临界值始终大于等于饥饿临界值。如果设置的饥饿临界值大于健康临界值，将被设置为当前的健康临界值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.SetPlayerStarveLevel(2) # 饥饿值小于等于2就会进入饥饿掉血状态，默认每隔4秒掉1点血量
```

</TabItem>
</Tabs>

---

### SetPlayerStarveTick

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(entityId)`

设置玩家饥饿掉血速度，当饥饿值小于饥饿临界值时会自动扣除血量，开启饥饿值且开启饥饿掉血时有效.原版默认值为 80 刻（即每 4 秒）扣除 1 点血量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerStarveTick(starveTick: int) -> bool
```

- starveTick: int，饥饿掉血速度。

**返回值**：bool，是否设置成功。

**备注**

- 注：最小值为 1，即每秒扣 20 点血量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.SetPlayerStarveTick(40) # 饥饿掉血状态下每隔2（40/20）秒扣除1点血量
```

</TabItem>
</Tabs>

---

### SetPlayerTotalExp

<Server/> ExpComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateExp(entityId)`

设置玩家的总经验值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerTotalExp(exp: int) -> bool
```

- exp: int，总经验值，正整数。

**返回值**：bool，设置是否成功。

**备注**

- 根据总经验值会重新计算等级，该接口可引起等级的变化。
- 内部运算采用浮点数，数值较大时会出现误差。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExp(entityId)
comp.SetPlayerTotalExp(25)
```

</TabItem>
</Tabs>

---

### Swing

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(clientApi.GetLevelId())`

本地玩家播放原版攻击动作。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Swing() -> bool
```


**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(clientApi.GetLevelId())
comp.Swing()
```

</TabItem>
</Tabs>

---

### getUid

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

获取本地玩家的 uid。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
getUid() -> Optional[int]
```


**返回值**：Optional[int]，玩家 uid。

**备注**

- 不是客户端线程或者没有经过登录认证获取的 uid 为 None。在当前机器上调用该接口获取的值为固定值，不依赖创建的 player。
- getUid 接口不能在加载 mod 过程中使用，推荐开发者在 [OnLocalPlayerStopLoading](/docs/docs/scripts/modapi/events/world#onlocalplayerstoploading) 事件触发之后再使用。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
uid = comp.getUid()
```

</TabItem>
</Tabs>

---
