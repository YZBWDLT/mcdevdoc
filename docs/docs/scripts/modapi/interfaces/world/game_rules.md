---
sidebar_position: 13
---

# 游戏规则

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录游戏规则相关的接口，共 36 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/youxiguize.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### AddBannedItem

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ItemBannedCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItemBanned(levelId)`

增加禁用物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddBannedItem(itemName: str) -> bool
```

- itemName: str，物品标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0，auxvalue 为*时候匹配任意 auxvalue 值。例如：minecraft:egg（也可以通过填写配置文件 config/banned_items.json 进行启动禁用）。

**返回值**：bool，是否增加成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItemBanned(levelId)
comp.AddBannedItem("minecraft:egg")
```

</TabItem>
</Tabs>

---

### AddBlockProtectField

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置一个方块无法被玩家/实体破坏的区域。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddBlockProtectField(
    dimensionId: int,
    startPos: Tuple[int, int, int],
    endPos: Tuple[int, int, int],
) -> int
```

- dimensionId: int，不可破坏区域所在维度。
- startPos: Tuple[int, int, int]，初始位置，不可破坏区域 AABB 包围盒的最小点。
- endPos: Tuple[int, int, int]，结束位置，不可破坏区域 AABB 包围盒的最大点。

**返回值**：int，成功时返回区域的唯一 ID，可用于取消不可破坏区域，失败时返回-1。

仅 Apollo 可用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
field = gameComp.AddBlockProtectField(0, (-20, 0, -20), (20, 255, 20))
if field > 0:
    print "AddBlockProtectField success field={}".format(field)
else:
    print "AddBlockProtectField fail"
```

</TabItem>
</Tabs>

---

### CleanBlockProtectField

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

取消全部已设置的方块无法被玩家/实体破坏的区域。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CleanBlockProtectField() -> bool
```


**返回值**：bool，success True 为取消成功，False 为取消失败。

仅 Apollo 可用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
suc = gameComp.CleanBlockProtectField()
print "CleanBlockProtectField suc={}".format(suc)
```

</TabItem>
</Tabs>

---

### ClearBannedItems

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ItemBannedCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItemBanned(levelId)`

清空禁用物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClearBannedItems() -> bool
```


**返回值**：bool，是否清空成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItemBanned(levelId)
comp.ClearBannedItems()
```

</TabItem>
</Tabs>

---

### DisableVineBlockSpread

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置是否禁用藤曼蔓延生长。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DisableVineBlockSpread(disable: bool) -> Any
```

- disable: bool，True:禁用 False:非禁用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.DisableVineBlockSpread(disable)
```

</TabItem>
</Tabs>

---

### ForbidLiquidFlow

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

禁止/允许地图中的流体流动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ForbidLiquidFlow(forbid: bool) -> bool
```

- forbid: bool，True 为禁止流体流动 False 为允许流体流动。

**返回值**：bool，success True 为设置成功，False 为设置失败。

**备注**

- 禁止流动后的流体，在重新允许流动之后，不会立刻向四周流动，直到受到方块更新（如相邻的方块发生改变）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
success = gameComp.ForbidLiquidFlow(True)
```

</TabItem>
</Tabs>

---

### GetBannedItemList

<Version type="china" add="1.21"/>

<Server/> ItemBannedCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItemBanned(levelId)`

获取禁用物品列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBannedItemList() -> Optional[List[str]]
```


**返回值**：Optional[List[str]]，禁用物品列表或者 None(异常情况),list 元素为物品标识符,格式[namespace:name:auxvalue]，auxvalue 默认为 0，auxvalue 为*时候匹配任意 auxvalue 值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItemBanned(levelId)
comp.GetBannedItemList()
```

</TabItem>
</Tabs>

---

### GetGameDiffculty

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(entityId)`

获取游戏难度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetGameDiffculty() -> int
```


**返回值**：int，[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().GameDiffculty.*:Peaceful，Easy，Normal，Hard 分别为 0~3。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(entityId)
difficulty = comp.GetGameDiffculty()
```

</TabItem>
</Tabs>

---

### GetGameRulesInfoServer

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取游戏规则。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetGameRulesInfoServer() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，游戏规则字典。

**备注**

- 游戏规则字典 gameRule 见代码注释。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
type = comp.GetGameRulesInfoServer()
#返回值如下
{
'option_info': {
    'pvp': bool, #玩家间伤害
    'show_coordinates': bool, #显示坐标
    'fire_spreads': bool, #火焰蔓延
    'tnt_explodes': bool, #TNT爆炸
    'mob_loot': bool, #生物战利品
    'natural_regeneration': bool, #自然生命恢复
    'respawn_block_explosion': bool, #重生方块爆炸
    'respawn_radius': int, #重生半径，请注意范围,目前支持[0,128]
    'tile_drops': bool, #方块掉落
    'immediate_respawn':bool #立即重生
    'experimental_biomes': bool, # 自定义生物群系
    'experimental_modding': bool, # 即将推出的创作者功能
    'experimental_holiday': bool, # 假日创造者功能
    },
'cheat_info': {
    'enable': bool, #激活作弊
    'always_day': bool, #终为白日
    'mob_griefing': bool, #生物破坏
    'keep_inventory': bool, #保留物品栏
    'weather_cycle': bool, #天气更替
    'mob_spawn': bool, #生物生成
    'entities_drop_loot': bool, #实体掉落战利品
    'daylight_cycle': bool, #开启昼夜更替
    'command_blocks_enabled': bool, #启用命令方块
    'random_tick_speed': int,#随机刻速度
    }
}
```

</TabItem>
</Tabs>

---

### GetGameType

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(entityId)`

获取默认游戏模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetGameType() -> int
```


**返回值**：int，[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().GameType.*:Survival，Creative，Adventure 分别为 0~2。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(entityId)
type = comp.GetGameType()
```

</TabItem>
</Tabs>

---

### GetLevelGravity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取重力因子。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLevelGravity() -> float
```


**返回值**：float，重力因子。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.GetLevelGravity()
```

</TabItem>
</Tabs>

---

### GetPistonMaxInteractionCount

<Version type="china" add="3.2"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取活塞/粘性活塞最多推动的方块数量，默认为 12 个方块，可能被其他开发者修改。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> int
```


**返回值**：int，最大推动的方块数量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetPistonMaxInteractionCount())
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取活塞/粘性活塞最多推动的方块数量，默认为 12 个方块，可能被其他开发者修改。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> int
```


**返回值**：int，最大推动的方块数量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetPistonMaxInteractionCount())
```

</TabItem>
</Tabs>

---

### GetSeed

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取存档种子。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSeed() -> int
```


**返回值**：int，存档种子。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
seed = comp.GetSeed()
```

</TabItem>
</Tabs>

---

### IsDisableCommandMinecart

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取当前是否允许运行命令方块矿车内置逻辑指令，当前仅 Apollo 网络服可用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsDisableCommandMinecart() -> bool
```


**返回值**：bool，True：当前禁止运行命令方块矿车内置逻辑指令；False：当前允许运行命令方块矿车内置逻辑指令。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
isDisable = comp.IsDisableCommandMinecart()
```

</TabItem>
</Tabs>

---

### IsLockDifficulty

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取当前世界的游戏难度是否被锁定。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsLockDifficulty() -> bool
```


**返回值**：bool，isLock True 为已锁定，False 为未锁定。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
isLock = comp.IsLockDifficulty()
```

</TabItem>
</Tabs>

---

### IsLockGameRulesInfo

<Version type="china" add="2.8"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取当前世界的游戏规则是否被锁定。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsLockGameRulesInfo() -> bool
```


**返回值**：bool，isLock True 为已锁定，False 为未锁定。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
isLock = comp.IsLockGameRulesInfo()
```

</TabItem>
</Tabs>

---

### IsLockGameType

<Version type="china" add="2.8"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取当前世界的游戏类型是否被锁定，包括默认游戏类型和个人游戏类型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsLockGameType() -> bool
```


**返回值**：bool，isLock True 为已锁定，False 为未锁定。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
isLock = comp.IsLockGameType()
```

</TabItem>
</Tabs>

---

### LockDifficulty

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

锁定当前世界游戏难度（仅本次游戏有效），锁定后任何玩家在游戏内都无法通过指令或暂停菜单修改游戏难度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockDifficulty(lock: bool) -> bool
```

- lock: bool，True:锁定 False:解锁。

**返回值**：bool，result 是否操作成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.LockDifficulty(True)
```

</TabItem>
</Tabs>

---

### LockGameRulesInfo

<Version type="china" add="2.8"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

锁定当前世界游戏规则（仅本次游戏有效），玩家无法通过指令、游戏菜单或 api 修改游戏规则（包括 [SetGameRulesInfoServer](/docs/docs/scripts/modapi/interfaces/world/game_rules#setgamerulesinfoserver) 示例中列举的规则）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockGameRulesInfo(lock: bool) -> bool
```

- lock: bool，True:锁定 False:解锁。

**返回值**：bool，result 是否操作成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.LockGameRulesInfo(True)
```

</TabItem>
</Tabs>

---

### LockGameType

<Version type="china" add="2.8"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

锁定当前世界游戏类型（仅本次游戏有效），玩家无法通过指令、游戏菜单或相关 api 如 [SetPlayerGameType](/docs/docs/scripts/modapi/interfaces/player/game_mode#setplayergametype) 和 [SetDefaultGameType](/docs/docs/scripts/modapi/interfaces/world/game_rules#setdefaultgametype) 修改游戏类型，包括默认游戏类型和个人游戏类型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockGameType(lock: bool) -> bool
```

- lock: bool，True:锁定 False:解锁。

**返回值**：bool，result 是否操作成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.LockGameType(True)
```

</TabItem>
</Tabs>

---

### OpenCityProtect

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

开启城市保护，包括禁止破坏方块，禁止对方块使用物品，禁止怪物攻击玩家，禁止玩家之间互相攻击，禁止日夜切换，禁止天气变化，禁止怪物群落刷新。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenCityProtect() -> bool
```


**返回值**：bool，success True 为设置成功，False 为设置失败。

仅 Apollo 可用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
success = gameComp.OpenCityProtect()
```

</TabItem>
</Tabs>

---

### RemoveBannedItem

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ItemBannedCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItemBanned(levelId)`

移除禁用物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveBannedItem(itemName: str) -> bool
```

- itemName: str，物品标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0，auxvalue 为*时候匹配任意 auxvalue 值。

**返回值**：bool，是否移除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItemBanned(levelId)
comp.RemoveBannedItem("minecraft:stained_glass:2")
```

</TabItem>
</Tabs>

---

### RemoveBlockProtectField

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

取消一个方块无法被玩家/实体破坏的区域。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveBlockProtectField(field: int) -> bool
```

- field: int，不可破坏区域的唯一 ID，[AddBlockProtectField](/docs/docs/scripts/modapi/interfaces/world/game_rules#addblockprotectfield) 的返回值。

**返回值**：bool，success True 为取消成功，False 为取消失败。

仅 Apollo 可用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
field = gameComp.AddBlockProtectField(0, (-20, 0, -20), (20, 255, 20))
if field > 0:
    print "AddBlockProtectField success field={}".format(field)
    suc = gameComp.RemoveBlockProtectField(field)
    print "RemoveBlockProtectField field={} suc={}".format(field, suc)
```

</TabItem>
</Tabs>

---

### SetCanActorSetOnFireByLightning

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

禁止/允许闪电点燃实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanActorSetOnFireByLightning(enable: bool) -> bool
```

- enable: bool，True 为允许闪电点燃实体 False 为禁止闪电点燃实体。

**返回值**：bool，success True 为设置成功，False 为设置失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
success = gameComp.SetCanActorSetOnFireByLightning(False)
```

</TabItem>
</Tabs>

---

### SetCanBlockSetOnFireByLightning

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

禁止/允许闪电点燃方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanBlockSetOnFireByLightning(enable: bool) -> bool
```

- enable: bool，True 为允许闪电点燃方块 False 为禁止闪电点燃方块。

**返回值**：bool，success True 为设置成功，False 为设置失败。

**备注**

- 只有当游戏难度为普通及以上，并且开启了火焰蔓延，闪电才会点燃方块。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
success = gameComp.SetCanBlockSetOnFireByLightning(False)
```

</TabItem>
</Tabs>

---

### SetDefaultGameType

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(playerId)`

设置默认游戏模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDefaultGameType(gameType: int) -> bool
```

- gameType: int，[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().GameType.*:Survival，Creative，Adventure 分别为 0~2。

**返回值**：bool，是否设置成功。

**备注**

- 极限模式不可修改默认游戏模式。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(playerId)
# 设置创造模式为默认游戏模式
comp.SetDefaultGameType(1)
```

</TabItem>
</Tabs>

---

### SetDisableCommandMinecart

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置停止/开启运行命令方块矿车内置逻辑指令，当前仅 Apollo 网络服可用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDisableCommandMinecart(isDisable: bool) -> bool
```

- isDisable: bool，True：停止运行命令方块矿车内置逻辑指令；False：开启运行命令方块矿车内置逻辑指令。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
suc = comp.SetDisableCommandMinecart(True)
```

</TabItem>
</Tabs>

---

### SetDisableContainers

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(entityId)`

禁止所有容器界面的打开，包括玩家背包，各种包含背包界面的容器方块如工作台与箱子，以及包含背包界面的实体交互如马背包与村民交易。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDisableContainers(isDisable: bool) -> bool
```

- isDisable: bool，是否禁止容器界面。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(entityId)
comp.SetDisableContainers(True)
```

</TabItem>
</Tabs>

---

### SetDisableDropItem

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(entityId)`

设置禁止丢弃物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDisableDropItem(isDisable: bool) -> bool
```

- isDisable: bool，是否禁止丢弃物品。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 1、开启开关后，玩家死亡会所有物品消失；如需保证物品不掉落，可以配合/gamerule keepInventory true 使用
# 2、创造模式下物品依然能丢弃。
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(entityId)
comp.SetDisableDropItem(True)
```

</TabItem>
</Tabs>

---

### SetDisableGravityInLiquid

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

是否屏蔽所有实体在液体（水、岩浆）中的重力。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDisableGravityInLiquid(isDisable: bool) -> bool
```

- isDisable: bool，True:屏蔽 False:取消屏蔽。

**返回值**：bool，是否设置成功。

**备注**

- 设置屏蔽实体在液体中的重力后，实体将不能上浮也不能下潜。对玩家而言，当水/岩浆淹没腰部及以上时（约在水面/岩浆表面 0.7 格及以下），将无法上岸。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.SetDisableGravityInLiquid(True)
```

</TabItem>
</Tabs>

---

### SetDisableHunger

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(entityId)`

设置是否屏蔽饥饿度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDisableHunger(isDisable: bool) -> bool
```

- isDisable: bool，是否屏蔽饥饿度。

**返回值**：bool，设置是否成功。

**备注**

- 如需隐藏饥饿度请使用 extraClientApi 的 [HideHungerGui](/docs/docs/scripts/modapi/interfaces/native_ui#hidehungergui)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(entityId)
comp.SetDisableHunger(True)
```

</TabItem>
</Tabs>

---

### SetGameDifficulty

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置游戏难度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetGameDifficulty(difficulty: int) -> bool
```

- difficulty: int，[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().GameDiffculty.*:Peaceful，Easy，Normal，Hard 分别为 0~3。

**返回值**：bool，是否设置成功，True 为成功，False 为失败。

**备注**

- 若已经锁定了游戏难度，除非调用 [LockDifficulty](/docs/docs/scripts/modapi/interfaces/world/game_rules#lockdifficulty) 解锁游戏难度，否则将无法成功修改游戏难度。
- 极限模式不可修改游戏难度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
result = comp.SetGameDifficulty(0)
```

</TabItem>
</Tabs>

---

### SetGameRulesInfoServer

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置游戏规则。所有参数均可选。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetGameRulesInfoServer(gameRuleDict: Dict[str, Any]) -> bool
```

- gameRuleDict: Dict[str, Any]，游戏规则字典。

**返回值**：bool，是否设置成功。

**备注**

- 其中游戏规则字典中每一项都为可选参数,但是设置 option_info 或者 cheat_info 其中一项子项后，必须加上 option_info 或者 cheat_info。
- 极限模式不可修改 cheat_info 部分的游戏规则。

</TabItem>
<TabItem value="示例" label="示例">

```python
###游戏规则字典说明
gameRuleDict ={
'option_info': {
    'pvp': bool, #玩家间伤害
    'show_coordinates': bool, #显示坐标
    'fire_spreads': bool, #火焰蔓延
    'tnt_explodes': bool, #TNT爆炸
    'mob_loot': bool, #生物战利品
    'natural_regeneration': bool, #自然生命恢复
    'respawn_block_explosion': bool, #重生方块爆炸
    'respawn_radius': int, #重生半径，请注意范围,目前支持[0,128]
    'tile_drops': bool, #方块掉落
    'immediate_respawn':bool #立即重生
    },
'cheat_info': {
    'enable': bool, #激活作弊
    'always_day': bool, #终为白日
    'mob_griefing': bool, #生物破坏
    'keep_inventory': bool, #保留物品栏
    'weather_cycle': bool, #天气更替
    'mob_spawn': bool, #生物生成
    'entities_drop_loot': bool, #实体掉落战利品
    'daylight_cycle': bool, #开启昼夜更替
    'command_blocks_enabled': bool, #启用命令方块
    'random_tick_speed': int,#随机刻速度
    }
}
###
ruleDict ={
    'cheat_info': {
        'enable': True,
        'always_day': True,

    }
}
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.SetGameRulesInfoServer(ruleDict)
```

</TabItem>
</Tabs>

---

### SetHurtCD

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置全局受击间隔 CD。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetHurtCD(cdTime: int) -> bool
```

- cdTime: int，单位帧数。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.SetHurtCD(1)
```

</TabItem>
</Tabs>

---

### SetLevelGravity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置重力因子。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLevelGravity(data: float) -> bool
```

- data: float，重力因子。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
#生物可单独设置重力因子，当生物的重力因子非0时则该生物单独有自己的重力因子，具体参见实体重力组件
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.SetLevelGravity(-0.08)
```

</TabItem>
</Tabs>

---

### SetPistonMaxInteractionCount

<Version type="china" add="3.2"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置活塞/粘性活塞最多推动的方块数量，默认为 12 个方块。该设置不存档。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPistonMaxInteractionCount(value: int) -> bool
```

- value: int，最大推动的方块数量，取值范围为 1 至 1024。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.SetPistonMaxInteractionCount(1))
```

</TabItem>
</Tabs>

---
