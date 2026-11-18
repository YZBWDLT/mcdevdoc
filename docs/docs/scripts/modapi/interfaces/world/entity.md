---
sidebar_position: 8
---

# 实体管理

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录实体管理相关的接口，共 23 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/shitiguanli.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### CreateClientEntityByTypeStr

<Version type="china" add="3.3"/>

<Client/> ClientSystem

系统方法，在自定义 System 类中直接调用。

创建客户端实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateClientEntityByTypeStr(
    engineTypeStr: str,
    pos: Tuple[float, float, float],
    rot: Tuple[float, float],
) -> Optional[str]
```

- engineTypeStr: str，实体 identifier，例如'minecraft:husk'。
- pos: Tuple[float, float, float]，生成坐标。
- rot: Tuple[float, float]，生物面向。

**返回值**：Optional[str]，实体 Id 或者 None。

**备注**

- 切换维度时,会自动清除全部客户端实体.退出游戏时,不会存档。
- 暂不支持的微软原版模型：minecraft:shulker（潜影贝）,minecraft:tropicalfish（热带鱼）,minecraft:iron_golem（铁傀儡）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()
class MyClientSystem(ClientSystem):
    def createClientEntity(self):
        entityId = self.CreateClientEntityByTypeStr('minecraft:husk', (0, 5, 0), (0, 0))
```

</TabItem>
</Tabs>

---

### CreateEngineEntityByNBT

<Version type="china" add="3.0"/>

<Server/> ServerSystem

系统方法，在自定义 System 类中直接调用。

根据 nbt 数据创建实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateEngineEntityByNBT(
    nbtDict: Dict[str, Any],
    pos: Optional[Tuple[float, float, float]],
    rot: Optional[Tuple[float, float]],
    dimensionId: int = 0,
    isNpc: bool = False,
    isGlobal: Optional[bool] = None,
) -> Optional[str]
```

- nbtDict: Dict[str, Any]，实体 nbt 数据，可以通过 EntityDefinitionsCompServer.[GetEntityNBTTags](/docs/docs/scripts/modapi/interfaces/entity/type#getentitynbttags) 获取。
- pos: Optional[Tuple[float, float, float]]，生成坐标,如果为空,则读取 nbt 中的 Pos。
- rot: Optional[Tuple[float, float]]，生成旋转,如果为空,则读取 nbt 中的 Rotation。
- dimensionId: int，生成维度,默认为 0。
- isNpc: bool，是否为 npc，默认值为 False。npc 不会移动、转向、存盘。
- isGlobal: Optional[bool]，是否创建为全局实体，默认为 None。None 表示沿用 nbt 中是否为全局实体。设置为 True 或 False 表示覆盖 nbt 中的属性。全局实体不会因为玩家视野、加载范围限制而被卸载，行为与 tick 会一直跑，但不代表会一直存在，依然会受[清除](https://minecraft.fandom.com/zh/wiki/%E7%94%9F%E6%88%90#.E5.9F.BA.E5.B2.A9.E7.89.88_2)等原生逻辑影响，比如如果对有 minecraft:despawn 组件的生物创建全局实体，则还需要设置 [SetPersistent](/docs/docs/scripts/modapi/interfaces/entity/attribute#setpersistent)，否则离远后实体仍然会消失。全局实体会影响游戏性能，建议整个存档内同时存在的数量不超过 10 个。

**返回值**：Optional[str]，实体 Id 或者 None。

**备注**

- 无法创建玩家实体,因为玩家是一个特殊的实体。
- 如果要直接通过 nbtDict["Rotation"]修改旋转,需要注意 nbt 中 y 分量在第一位,x 分量在第二位。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
nbt = comp.GetEntityNBTTags()
newEntityId = self.CreateEngineEntityByNBT(nbt)
```

</TabItem>
</Tabs>

---

### CreateEngineEntityByTypeStr

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ServerSystem

系统方法，在自定义 System 类中直接调用。

创建指定 identifier 的实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateEngineEntityByTypeStr(
    engineTypeStr: str,
    pos: Tuple[float, float, float],
    rot: Tuple[float, float],
    dimensionId: int,
    isNpc: bool = False,
    isGlobal: bool = False,
) -> Optional[str]
```

- engineTypeStr: str，实体 identifier，例如'minecraft:husk'。
- pos: Tuple[float, float, float]，生成坐标。
- rot: Tuple[float, float]，（上下角度，左右角度）实体水平方向的俯仰角度和竖直方向的旋转角度，单位是角度而不是弧度。[MC 坐标系说明](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/10-Vector3.html)。
- dimensionId: int，生成的维度，默认值为 0（0 为主世界，1 为地狱，2 为末地）。
- isNpc: bool，是否为 npc，默认值为 False。npc 不会移动、转向、存盘。
- isGlobal: bool，是否创建为全局实体，默认为 False。全局实体不会因为玩家视野、加载范围限制而被卸载，行为与 tick 会一直跑，但不代表会一直存在，依然会受[清除](https://minecraft.fandom.com/zh/wiki/%E7%94%9F%E6%88%90#.E5.9F.BA.E5.B2.A9.E7.89.88_2)等原生逻辑影响，比如如果对有 minecraft:despawn 组件的生物创建全局实体，则还需要设置 [SetPersistent](/docs/docs/scripts/modapi/interfaces/entity/attribute#setpersistent)，否则离远后实体仍然会消失。全局实体会影响游戏性能，建议整个存档内同时存在的数量不超过 10 个。

**返回值**：Optional[str]，实体 Id 或者 None。

**备注**

- 在未加载的 chunk 无法创建 生成村民请使用"minecraft:villager_v2"。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class MyServerSystem(ServerSystem):
    def createMob(self):
        # 在主世界(0，5，0)的位置创建一个朝向为(0, 0)的尸壳
        entityId = self.CreateEngineEntityByTypeStr('minecraft:husk', (0, 5, 0), (0, 0), 0)
```

</TabItem>
</Tabs>

---

### CreateEngineItemEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ServerSystem

系统方法，在自定义 System 类中直接调用。

用于创建物品实体（即掉落物），返回物品实体的 entityId。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateEngineItemEntity(
    itemDict: Dict[str, Any],
    dimensionId: int,
    pos: Tuple[float, float, float],
) -> Optional[str]
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- dimensionId: int，设置 dimension，默认为主世界。
- pos: Tuple[float, float, float]，生成坐标。

**返回值**：Optional[str]，实体 Id 或者 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
itemDict = {
    'itemName': 'minecraft:bow',
    'count': 1,
    'enchantData': [(serverApi.GetMinecraftEnum().EnchantType.BowDamage, 1),],
    'auxValue': 0,
    'customTips':'§c new item §r',
    'extraId': 'abc',
    'userData': { 'color': { '__type__':8, '__value__':'gray'} },
}
itemEntityId = self.CreateEngineItemEntity(itemDict, 0, (0, 5, 0))
```

</TabItem>
</Tabs>

---

### CreateEntityAOI

<Version type="china" add="2.11"/>

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

注册感应区域，有实体进入时和离开时会触发回调函数 func。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateEntityAOI(
    dimension: int,
    name: str,
    aabb: Tuple[float, float, float, float, float, float],
    func: Callable,
) -> bool
```

- dimension: int，维度 id。
- name: str，注册的感应区域名。
- aabb: Tuple[float, float, float, float, float, float]，感应区域的坐标范围，依次为 minX, minY, minZ, maxX, maxY, maxZ。
- func: Callable，回调函数，参数 dict 请看备注。

**返回值**：bool，是否注册成功。

**备注**

- 每个实体都会触发一次 func，第一次创建感应区时会检测一次区域内原有的生物并触发 func。
- 不支持长或宽大于 2000 格的区域。对于大范围区域，建议在脚本中每隔一段时间获取实体坐标判断来实现。
- 回调函数传入的参数 dict。

| 参数名 | 类型 | 解释 |
| --- | --- | --- |
| AOIName | str | 注册时传入的感应区域名 |
| entityType | int | 详见[EntityType 枚举](/docs/docs/scripts/modapi/enums#entitytype) |
| pos | tuple(float,float,float) | 实体位置，只有进入的时候有 |
| dimension | int | 维度 |
| entityId | str | 实体 Id |
| identifier | str | 实体 identifier |
| isEnter | bool | 是否进入 AOI，进入为 True，退出为 False |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
def fun(args):
    print "entitiy trigger AOI:{}".format(args)
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.CreateEntityAOI(0, "myTest", (0, 0, 0, 1, 1, 1), fun)
```

</TabItem>
</Tabs>

---

### CreateExperienceOrb

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ExpComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateExp(entityId)`

创建专属经验球。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateExperienceOrb(
    exp: int,
    position: Tuple[float, float, float],
    isSpecial: bool,
) -> bool
```

- exp: int，经验球经验。
- position: Tuple[float, float, float]，创建的位置。
- isSpecial: bool，是否专属经验球。

**返回值**：bool，设置是否成功。

**备注**

- 设置经验球经验，entityId 是玩家的 entityId。专属的经验球只有对应 entityId 的玩家才能拾取。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExp(entityId)
comp.CreateExperienceOrb(25,(10,10,10),False)
```

</TabItem>
</Tabs>

---

### CreateProjectileEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ProjectileComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateProjectile(levelId)`

创建抛射物（直接发射）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateProjectileEntity(
    spawnerId: str,
    entityIdentifier: str,
    param: Optional[Dict[str, Any]] = None,
) -> str
```

- spawnerId: str，创建者 Id。
- entityIdentifier: str，创建抛射物的 identifier，如 minecraft:snowball。
- param: Optional[Dict[str, Any]]，默认为 None，详细说明请见备注。

**返回值**：str，创建抛射物的 Id，失败时为“-1”。

**备注**

- param 参数解释如下：

| 参数 | 类型 | 解释 |
| --- | --- | --- |
| position | tuple(float,float,float) | 初始位置 |
| direction | tuple(float,float,float) | 初始朝向 |
| power | float | 投掷的力量值 |
| gravity | float | 抛射物重力因子，默认为 json 配置中的值 |
| damage | float | 抛射物伤害值，默认为 json 配置中的值 |
| targetId | str | 抛射物目标（指定了 target 之后，会和潜影贝生物发射的跟踪导弹的那个投掷物是一个效果），默认不指定 |
| isDamageOwner | bool | 对创建者是否造成伤害，默认不造成伤害 |
| auxValue | int | 抛射物 auxValue(目前只对原生弓箭、喷溅药水有效) |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateProjectile(levelId)
param = {
    'position': (1,1,1),
    'direction': (1,1,1)
}
comp.CreateProjectileEntity(playerId, "minecraft:snowball", param)
```

</TabItem>
</Tabs>

---

### DeleteEntityAOI

<Version type="china" add="2.11"/>

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

删除使用 [CreateEntityAOI](/docs/docs/scripts/modapi/interfaces/world/entity#createentityaoi) 注册的感应区。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DeleteEntityAOI(dimension: int, name: str) -> bool
```

- dimension: int，维度 id。
- name: str，需要删除的感应区域名。

**返回值**：bool，是否删除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.DeleteEntityAOI(0, "myTest")
```

</TabItem>
</Tabs>

---

### DestroyClientEntity

<Version type="china" add="3.3"/>

<Client/> ClientSystem

系统方法，在自定义 System 类中直接调用。

销毁客户端实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DestroyClientEntity(entityId: str) -> Any
```

- entityId: str，客户端实体 Id。

**备注**

- 仅能销毁通过 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/interfaces/world/entity#createcliententitybytypestr) 创建的客户端实体。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()
class MyClientSystem(ClientSystem):
    def createClientEntity(self):
        entityId = self.CreateClientEntityByTypeStr('minecraft:husk', (0, 5, 0), (0, 0))
        self.DestroyClientEntity(entityId)
```

</TabItem>
</Tabs>

---

### DestroyEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ServerSystem

系统方法，在自定义 System 类中直接调用。

销毁实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DestroyEntity(entityId: str) -> bool
```

- entityId: str，销毁的实体 ID。

**返回值**：bool，是否销毁成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def testDestroyEntity(self, entityId):
        self.DestroyEntity(entityId)
```

</TabItem>
</Tabs>

---

### GetDroppedItem

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

获取掉落物的物品信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDroppedItem(itemEntityId: str, getUserData: bool = False) -> Dict[str, Any]
```

- itemEntityId: str，掉落物的 entityId。
- getUserData: bool，是否获取 userData，默认为 False。

**返回值**：Dict[str, Any]，信息。

**备注**

- 如果掉落物实体不存在，返回值为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetDroppedItem(entityId)
```

</TabItem>
</Tabs>

---

### GetEngineActor

<Version type="china" add="2.7"/>

<Server/>

模块级函数，直接调用。

获取所有维度中已加载的所有实体（不包含玩家）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，当前地图中的所有实体信息，key：实体 id，value：实体信息字典。

**备注**

- 实体信息字典 entityDict。

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| dimensionId | int | 维度 id |
| identifier | str | 实体 identifier |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
entityDicts = serverApi.GetEngineActor()
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取客户端当前维度中已加载的所有实体（不包含玩家）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，当前地图中的所有实体信息，key：实体 id，value：实体信息字典。

**备注**

- 实体信息字典 entityDict。

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| dimensionId | int | 维度 id |
| identifier | str | 实体 identifier |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
entityDicts = clientApi.GetEngineActor()
```

</TabItem>
</Tabs>

---

### GetLocalPlayerId

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

模块级函数，直接调用。

获取本地玩家的 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLocalPlayerId() -> str
```


**返回值**：str，客户端玩家 Id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
localId = clientApi.GetLocalPlayerId()
```

</TabItem>
</Tabs>

---

### GetLootItems

<Version type="china" add="2.8"/>

<Server/> LootComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateLoot(playerId)`

指定战利品表获取一次战利品，返回的物品与 json 定义的概率有关。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLootItems(
    lootPath: str,
    entityId: str = "-1",
    killerId: str = "-1",
    luck: float = 0.0,
    getUserData: bool = False,
) -> List[Dict[str, Any]]
```

- lootPath: str，战利品表的路径。
- entityId: str，模拟被击杀的实体 ID，默认为"-1"。
- killerId: str，模拟击杀该实体的实体 ID，默认为"-1"。
- luck: float，模拟击杀该实体的玩家的幸运值，默认为 0.0。
- getUserData: bool，是否获取 UserData，默认为 False。

**返回值**：List[Dict[str, Any]]，根据战利品表随机生成的物品字典列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateLoot(playerId)
result = comp.GetLootItems("loot_tables/entities/zombie.json")
```

</TabItem>
</Tabs>

---

### GetPlayerList

<Version type="china" add="2.7"/>

<Server/>

模块级函数，直接调用。

获取所有维度中的全部玩家的 id 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> List[str]
```


**返回值**：List[str]，返回玩家 id 列表。

**备注**

- 由于引擎中的玩家 id 是无序存储的，所以该接口返回列表的先后顺序没有实际意义，仅为在多平台下表现一致。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
print serverApi.GetPlayerList()
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取所有维度中的全部玩家的 id 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> List[str]
```


**返回值**：List[str]，返回玩家 id 列表。

**备注**

- 由于引擎中的玩家 id 是无序存储的，所以该接口返回列表的先后顺序没有实际意义，仅为在多平台下表现一致。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
print clientApi.GetPlayerList()
```

</TabItem>
</Tabs>

---

### HasEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

判断 entity 是否存在。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HasEntity(entityId: str) -> int
```

- entityId: str，实体 id。

**返回值**：int，0 表示不存在，1 表示存在。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
exist = comp.HasEntity(entityId)
```

</TabItem>
</Tabs>

---

### IsEntityAlive

<Version type="china" add="1.23"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

判断生物实体是否存活或非生物实体是否存在。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(entityId: str) -> bool
```

- entityId: str，实体 id。

**返回值**：bool，false 表示生物实体已死亡或非生物实体已销毁，true 表示生物实体存活或非生物实体存在。

**备注**

- 注意，如果检测的实体所在的区块被卸载，则该接口返回 False。因此，需要注意实体所在的区块是否被加载。
- 区块卸载：游戏只会加载玩家周围的区块，玩家移动到别的区域时，原来所在区域的区块会被卸载，参考区块介绍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
alive = comp.IsEntityAlive(entityId)
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

判断生物实体是否存活或非生物实体是否存在。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(entityId: str) -> bool
```

- entityId: str，实体 id。

**返回值**：bool，false 表示生物实体已死亡或非生物实体已销毁，true 表示生物实体存活或非生物实体存在。

**备注**

- 注意，如果检测的实体所在的区块被卸载，则该接口返回 False。因此，需要注意实体所在的区块是否被加载。
- 区块卸载：游戏只会加载玩家周围的区块，玩家移动到别的区域时，原来所在区域的区块会被卸载，参考区块介绍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
alive = comp.IsEntityAlive(entityId)
```

</TabItem>
</Tabs>

---

### KillEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

杀死某个 Entity。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
KillEntity(entityId: str) -> bool
```

- entityId: str，要杀死的目标的 entityId。

**返回值**：bool，是否杀死成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.KillEntity(entityId)
```

</TabItem>
</Tabs>

---

### SpawnLootTable

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ActorLootComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorLoot(playerId)`

使用生物类型模拟一次随机掉落，生成的物品与 json 定义的概率有关。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SpawnLootTable(
    pos: Tuple[int, int, int],
    identifier: str,
    playerKillerId: Optional[str] = None,
    damageCauseEntityId: Optional[str] = None,
) -> bool
```

- pos: Tuple[int, int, int]，掉落位置。
- identifier: str，实体 identifier，如 minecraft:guardian。
- playerKillerId: Optional[str]，玩家杀手（只能是玩家），默认 None。
- damageCauseEntityId: Optional[str]，伤害来源实体 Id（掉落与该实体手持物品的抢夺附魔等级有关），默认 None。

**返回值**：bool，是否成功生成掉落。

**备注**

- 需要在对应的 player 实体附近生成，否则会生成失败。对于某些特殊的生物，如 minecraft:sheep，需要使用 [SpawnLootTableWithActor](/docs/docs/scripts/modapi/interfaces/world/entity#spawnloottablewithactor) 接口来模拟随机掉落。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateActorLoot(playerId)
result = comp.SpawnLootTable((1, 4, 5), 'minecraft:guardian')
```

</TabItem>
</Tabs>

---

### SpawnLootTableWithActor

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ActorLootComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorLoot(playerId)`

使用生物实例模拟一次随机掉落，生成的物品与 json 定义的概率有关。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SpawnLootTableWithActor(
    pos: Tuple[int, int, int],
    entityId: str,
    playerKillerId: Optional[str] = None,
    damageCauseEntityId: Optional[str] = None,
) -> bool
```

- pos: Tuple[int, int, int]，掉落位置。
- entityId: str，模拟生物的生物 Id。
- playerKillerId: Optional[str]，玩家杀手（只能是玩家），默认 None。
- damageCauseEntityId: Optional[str]，伤害来源实体 Id（掉落与该实体手持物品的抢夺附魔等级有关），默认 None。

**返回值**：bool，是否成功生成掉落。

**备注**

- 需要在对应的 player 实体附近生成，否则会生成失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateActorLoot(playerId)
result = comp.SpawnLootTableWithActor((1, 4, 5), '-335007449086')
```

</TabItem>
</Tabs>

---

### SpawnResources

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

产生方块随机掉落（该方法不适用于实体方块）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SpawnResources(
    identifier: str,
    pos: Tuple[int, int, int],
    aux: int,
    probability: float,
    bonusLootLevel: int = 0,
    dimensionId: int = -1,
    allowRandomness: bool = True,
    spawnOrb: bool,
) -> bool
```

- identifier: str，方块的 identifier，如 minecraft:wool。
- pos: Tuple[int, int, int]，掉落位置。
- aux: int，方块的附加值。
- probability: float，掉落概率，范围为[0, 1]，0 为不掉落，1 为 100%掉落。
- bonusLootLevel: int，[时运等级](https://zh.minecraft.wiki/w/%E6%97%B6%E8%BF%90)，默认为 0。
- dimensionId: int，掉落方块的维度，默认值为-1，传入非负值时用于获取产生方块掉落的维度；否则将随机挑选一个存在玩家的维度产生掉落。
- allowRandomness: bool，是否允许随机采集，默认为 True，如果为 False，掉落概率 probability 无效。
- spawnOrb: bool，是否生成经验球，默认都不生成，设成 True 时按原版采集逻辑进行经验球掉落，如矿石类方块会产生随机数量的经验球。

**返回值**：bool，是否成功。

**备注**

- 时运等级[bonusLootLevel]只对部分方块生效 掉落概率[probability]对部分农作物树叶不生效。
- 可在对应维度的常加载区块产生掉落。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 金矿石掉落
result = comp.SpawnResources('minecraft:gold_ore', (1,1,1), 7, 1.0, 10)
# 指定维度产生掉落
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
result = comp.SpawnResources('minecraft:gold_ore', (1,1,1), 7, 1.0, 10, 0)
```

</TabItem>
</Tabs>

---

### SpawnResourcesSilkTouched

<Version type="china" add="1.22"/>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

模拟方块精准采集掉落。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SpawnResourcesSilkTouched(
    identifier: str,
    pos: Tuple[int, int, int],
    aux: int,
    dimensionId: int = -1,
) -> bool
```

- identifier: str，方块的 identifier，如 minecraft:wool。
- pos: Tuple[int, int, int]，掉落位置。
- aux: int，方块的附加值。
- dimensionId: int，掉落方块的维度，默认值为-1，传入非负值时用于获取产生方块掉落的维度；否则将随机挑选一个存在玩家的维度产生掉落。

**返回值**：bool，是否成功。

**备注**

- 如果指定方块不属于精准采集方块，返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
result = comp.SpawnResourcesSilkTouched('minecraft:gold_ore', (1,1,1), 7)
```

</TabItem>
</Tabs>

---

### getEntitiesOrBlockFromRay

<Version type="china" add="2.8"/>

<Server/>

模块级函数，直接调用。

从指定位置发射一条射线，获取与射线相交的实体和方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(
    dimensionId: int,
    pos: Tuple[float, float, float],
    rot: Tuple[float, float, float],
    distance: int,
    isThrough: bool,
    filterType: Any = RayFilterType.OnlyEntities,
) -> List[Dict[str, Any]]
```

- dimensionId: int，生成的维度（必填）（0 为主世界，1 为下界，2 为末地）。
- pos: Tuple[float, float, float]，指定位置坐标（必填）。
- rot: Tuple[float, float, float]，射线方向单位向量（必填）。
- distance: int，射线长度(一个方块长度为 1)（选填，默认 16）。
- isThrough: bool，是否穿透，如穿透，则返回所有射线穿过的实体或方块，如不穿透，则返回第一个碰撞到的实体或方块（选填，默认为 False）。
- filterType: Any，[RayFilterType 枚举](/docs/docs/scripts/modapi/enums#rayfiltertype)（选填，默认为 serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().RayFilterType.OnlyEntities）。

**返回值**：List[Dict[str, Any]]，返回实体信息列表(根据距指定位置由近到远排序, id 越靠前距离指定位置越近)，详细见备注。

**备注**

- 选中目标为实体时，返回值为：

```python
[{
    "type": "Entity",
    "entityId": entityId,
    "identifier": identifier,
    "hitPos" : (x, y, z)  #精准碰撞坐标，类型为tuple(float,float,float)
},
{
    ...
}]
```

- 选中目标为方块时，返回值为：

```python
[{
    "type": "Block",
    "pos" : (0, 1, 0),
    "identifier": identifier,
    "hitPos" : (x, y, z) #精准碰撞坐标，类型为tuple(float,float,float)
},
{
    ...
}]
```

- 没有选中目标时，返回值为：None。
- 假设方块的 clip(计算射线检测时用的碰撞盒)没有体积时，射线检测将会无视这个方块，例如原版的火焰，灵魂火等；自定义方块的 clip 可以在 netease:aabb 中进行设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
[{
    "type": "Entity",
    "entityId": entityId,
    "identifier": identifier,
    "hitPos" : (x, y, z)  #精准碰撞坐标，类型为tuple(float,float,float)
},
{
    ...
}]
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

从指定位置发射一条射线，获取与射线相交的实体和方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(
    pos: Tuple[float, float, float],
    rot: Tuple[float, float, float],
    distance: int,
    isThrough: bool,
    filterType: Any = RayFilterType.OnlyEntities,
) -> List[Dict[str, Any]]
```

- pos: Tuple[float, float, float]，指定位置坐标（必填）。
- rot: Tuple[float, float, float]，射线方向单位向量（必填）。
- distance: int，射线长度(一个方块长度为 1)（选填，默认 16）。
- isThrough: bool，是否穿透，如穿透，则返回所有射线穿过的实体或方块，如不穿透，则返回第一个碰撞到的实体或方块（选填，默认为 False）。
- filterType: Any，[RayFilterType 枚举](/docs/docs/scripts/modapi/enums#rayfiltertype)（选填，默认为 serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().RayFilterType.OnlyEntities）。

**返回值**：List[Dict[str, Any]]，返回实体信息列表(根据距指定位置由近到远排序, id 越靠前距离指定位置越近)，详细见备注。

**备注**

- 选中目标为实体时，返回值为：

```python
[{
    "type": "Entity",
    "entityId": entityId,
    "identifier": identifier,
    "hitPos" : (x, y, z)  #精准碰撞坐标，类型为tuple(float,float,float)
},
{
    ...
}]
```

- 选中目标为方块时，返回值为：

```python
[{
    "type": "Block",
    "pos" : (0, 1, 0),
    "identifier": identifier,
    "hitPos" : (x, y, z) #精准碰撞坐标，类型为tuple(float,float,float)
},
{
    ...
}]
```

- 没有选中目标时，返回值为：None。
- 假设方块的 clip(计算射线检测时用的碰撞盒)没有体积时，射线检测将会无视这个方块，例如原版的火焰，灵魂火等；自定义方块的 clip 可以在 netease:aabb 中进行设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
[{
    "type": "Entity",
    "entityId": entityId,
    "identifier": identifier,
    "hitPos" : (x, y, z)  #精准碰撞坐标，类型为tuple(float,float,float)
},
{
    ...
}]
```

</TabItem>
</Tabs>

---
