---
sidebar_position: 1
---

# 地图

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录地图相关的接口，共 48 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/ditu.html"/>

---

### CanSee

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(entityId)`

判断起始对象是否可看见目标对象,基于对象的 Head 位置判断。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CanSee(
    fromId: str,
    targetId: str,
    viewRange: float = 8.0,
    onlySolid: bool,
    angleX: float,
    angleY: float,
) -> bool
```

- fromId: str，起始对象 ID。
- targetId: str，目标对象 ID。
- viewRange: float，视野距离,默认值 8.0。
- onlySolid: bool，只判断固体方块遮挡,默认 True; False 则液体方块也会遮挡。
- angleX: float，视野 X 轴角度,默认值 180.0 度。
- angleY: float，视野 Y 轴角度,默认值 180.0 度。

**返回值**：bool，是否可见。

**备注**

- angleX 表示上下角度的范围值，angleY 是左右角度的范围值。
- angleX 的判断依据是 fromId 和 targetId 的坐标向量与水平面的夹角，与 fromId 的 GetoRot()接口的 rotY 值无关。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(entityId)
comp.CanSee(entityId,targetId,20.0,True,180.0,180.0)
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

判断起始对象是否可看见目标对象,基于对象的 Head 位置判断。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CanSee(
    fromId: str,
    targetId: str,
    viewRange: float = 8.0,
    onlySolid: bool,
    angleX: float,
    angleY: float,
) -> bool
```

- fromId: str，起始对象 ID。
- targetId: str，目标对象 ID。
- viewRange: float，视野距离,默认值 8.0。
- onlySolid: bool，只判断固体方块遮挡,默认 True; False 则液体方块也会遮挡。
- angleX: float，视野 X 轴角度,默认值 180.0 度。
- angleY: float，视野 Y 轴角度,默认值 180.0 度。

**返回值**：bool，是否可见。

**备注**

- angleX 表示上下角度的范围值，angleY 是左右角度的范围值。
- angleX 的判断依据是 fromId 和 targetId 的坐标向量与水平面的夹角，与 fromId 的 GetoRot()接口的 rotY 值无关。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.CanSee(entityId, targetId, 20.0, True, 180.0, 180.0)
```

</TabItem>
</Tabs>

---

### CheckBlockToPos

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

判断位置之间是否有方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CheckBlockToPos(
    fromPos: Tuple[float, float, float],
    toPos: Tuple[float, float, float],
    dimensionId: int,
) -> int
```

- fromPos: Tuple[float, float, float]，起始位置。
- toPos: Tuple[float, float, float]，终止位置。
- dimensionId: int，位置所在维度。

**返回值**：int，result -1：获取失败 0：没有方块 1：有方块。

**备注**

- 支持判断对应维度的常加载区块内位置之间是否有方块。
- 返回-1 通常是由于传入维度不存在、传入错误参数、传入位置所在区块并未加载等。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from mod_log import logger as logger
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
if comp.CheckBlockToPos((0, 0, 0), (1, 1, 1), 0):
    logger.info("(0, 0, 0)与(1, 1, 1)之间有方块")
```

</TabItem>
</Tabs>

---

### CheckChunkState

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

判断指定位置的 chunk 是否加载完成。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CheckChunkState(dimension: int, pos: Tuple[int, int, int]) -> bool
```

- dimension: int，chunk 所在维度。
- pos: Tuple[int, int, int]，指定位置的坐标。

**返回值**：bool，加载是否完成。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
comp.CheckChunkState(0, (0, 0, 0))
```

</TabItem>
</Tabs>

---

### CreateDimension

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

创建新的 dimension。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateDimension(dimensionId: int) -> bool
```

- dimensionId: int，维度，0/1/2 维度是不需要创建的。创建大于 20 的维度，需要在 dimension_config.json 中注册，注意，维度 21 是不可用的。

**返回值**：bool，是否创建成功。

**备注**

- 建议在 mod 初始化时统一调用。
- 与维度相关的接口([SetUseLocalTime](/docs/docs/scripts/modapi/world/time#setuselocaltime),[SetDimensionUseLocalWeather](/docs/docs/scripts/modapi/world/weather#setdimensionuselocalweather) 等)会影响出生点的生成，如果要用主世界地形生成出生点，需要在 mod 初始化的时候优先调用一次 CreateDimension(0)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.CreateDimension(3)
```

</TabItem>
</Tabs>

---

### CreateExplosion

<Server/> ExplosionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateExplosion(levelId)`

用于生成爆炸。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateExplosion(
    pos: Tuple[float, float, float],
    radius: int,
    fire: bool,
    breaks: bool,
    sourceId: str,
    playerId: str,
) -> bool
```

- pos: Tuple[float, float, float]，爆炸位置。
- radius: int，爆炸威力，具体含义可参考[wiki](https://zh.minecraft.wiki/w/%E7%88%86%E7%82%B8)对爆炸的解释。
- fire: bool，是否带火。
- breaks: bool，是否破坏方块。
- sourceId: str，爆炸伤害源的实体 id。
- playerId: str，爆炸创造的实体 id。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExplosion(levelId)
comp.CreateExplosion((50,50,50),10,True,True,sourceId,playerId)
```

</TabItem>
</Tabs>

---

### DeleteAllArea

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

删除所有常加载区域。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DeleteAllArea() -> int
```


**返回值**：int，删除的区域数目，错误时为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
comp.DeleteAllArea()
```

</TabItem>
</Tabs>

---

### DeleteArea

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

删除一个常加载区域。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DeleteArea(key: str) -> bool
```

- key: str，常加载区域的名称。

**返回值**：bool，删除是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
comp.DeleteArea('Area0')
```

</TabItem>
</Tabs>

---

### DetectStructure

<Server/> PortalComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePortal(levelId)`

检测自定义门的结构。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DetectStructure(
    playerId: None,
    pattern: List[str],
    defines: Dict[str, Any],
    touchPos: List[Tuple[int, int]],
    pos: Tuple[int, int, int],
    dimensionId: int,
) -> Tuple[bool, Tuple[int, int, int], Tuple[int, int, int]]
```

- playerId: None，该参数未使用，直接传入 None 即可。
- pattern: List[str]，传送门形状。
- defines: Dict[str, Any]，传送门定义。
- touchPos: List[Tuple[int, int]]，传送门可激活的位置（相对参数 pattern 中定义的位置）。
- pos: Tuple[int, int, int]，使用物品坐标。
- dimensionId: int，传送门所在维度。

**返回值**：Tuple[bool, Tuple[int, int, int], Tuple[int, int, int]]，检测结果,传送门起始位置,方向。

</TabItem>
<TabItem value="示例" label="示例">

```python
#传送门定义
defines = {
    '#': 'minecraft:glowstone',
    '*': 'minecraft:air'
}
#传送门形状
pattern = [
    '####',
    '#**#',
    '#**#',
    '####',
]
# 最下面中间的两个位置点击激活
touchPos =[(3,1),(3,2)]
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePortal(levelId)
ret = comp.DetectStructure(None, pattern, defines, touchPos, (12, 1, 5), 0)
if ret[0]:
    logger.info('自定义传送门构建成功')
else:
    logger.info('自定义传送门构建失败')
```

</TabItem>
</Tabs>

---

### DoTaskOnChunkAsync

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

异步加载指定范围区块，加载完成后调用输入的回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DoTaskOnChunkAsync(
    dimensionId: int,
    posMin: Tuple[int, int, int],
    posMax: Tuple[int, int, int],
    callback: Callable,
) -> bool
```

- dimensionId: int，区块所在维度。
- posMin: Tuple[int, int, int]，指定范围坐标最小值,y 值不会起到限制区块范围的作用。posMin 每一项均需小于 posMax。
- posMax: Tuple[int, int, int]，指定范围坐标最大值,y 值不会起到限制区块范围的作用。
- callback: Callable，加载完成后调用的回调函数。

**返回值**：bool，是否成功。

**备注**

- 回调函数需要能够接收数据结构为字典的输入参数，即示例中的 data。data = \{ 'code':1 \}。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
def callback(data):
    code = data.get('code', 0)
    if code == 1:
        #区块加载成功
        print 'success'
    elif code == 0:
        #区块加载失败
        print 'fail'
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
comp.DoTaskOnChunkAsync(0, (0,0,0),(100,100,100),callback)
```

</TabItem>
</Tabs>

---

### GetAllAreaKeys

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

获取所有常加载区域名称列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAllAreaKeys() -> List[str]
```


**返回值**：List[str]，名称列表 list。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
comp.GetAllAreaKeys()
```

</TabItem>
</Tabs>

---

### GetBiomeInfo

<Server/> BiomeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBiome(levelId)`

获取群系天气相关参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBiomeInfo(biomeName: str) -> Dict[str, Any]
```

- biomeName: str，群系名字。

**返回值**：Dict[str, Any]，群系天气相关参数,获取失败返回 None。

**备注**

- 群系名字参数需要填写命名空间，无命名空间的参数接口将会自动补全 minecraft 的命名空间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBiome(levelId)
info = comp.GetBiomeInfo("desert")
```

</TabItem>
</Tabs>

---

### GetBiomeName

<Server/> BiomeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBiome(levelId)`

获取某一位置所属的生物群系信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBiomeName(pos: Tuple[int, int, int], dimId: int) -> str
```

- pos: Tuple[int, int, int]，指定位置。
- dimId: int，维度 id。

**返回值**：str，该位置所属生物群系 name。

**备注**

- 支持获取未加载区块的群系。但对于未加载的区块，将使用地形生成器来计算群系，而非存档内保存的群系。因此对于使用地图修改器修改过群系的地图，获取未加载区块的群系，结果可能与实际不符，建议确认区块加载完毕后再获取。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBiome(levelId)
biomeName = comp.GetBiomeName((0, 80, 0), 0)
```

</TabItem>
</Tabs>

<Client/> BiomeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBiome(levelId)`

获取客户端当前维度已加载区域某一位置所属的生物群系信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBiomeName(pos: Tuple[int, int, int]) -> str
```

- pos: Tuple[int, int, int]，指定位置。

**返回值**：str，该位置所属生物群系 name。

**备注**

- 如果该位置区域未加载，则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBiome(levelId)
biomeName = comp.GetBiomeName((0, 80, 0))
```

</TabItem>
</Tabs>

---

### GetBlockLightLevel

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取方块位置的光照等级。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockLightLevel(pos: Tuple[int, int, int], dimensionId: int) -> int
```

- pos: Tuple[int, int, int]，方块位置。
- dimensionId: int，方块所在维度。

**返回值**：int，光照等级。

**备注**

- 仅能获取到已加载区块内方块位置的光照等级，支持获取对应维度的常加载区块内光照等级。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
lightlevel = comp.GetBlockLightLevel((x,y,z), 0)
```

</TabItem>
</Tabs>

---

### GetChunkEntites

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

获取指定位置的区块中，全部的实体和玩家的 ID 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChunkEntites(dimension: int, pos: Tuple[int, int, int]) -> Optional[List[str]]
```

- dimension: int，维度。
- pos: Tuple[int, int, int]，指定位置的坐标。

**返回值**：Optional[List[str]]，实体和玩家的 ID 的列表，当指定位置的区块不存在或尚未加载时，返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
entityList = comp.GetChunkEntites(0, (0, 0, 0))
print "GetChunkEntites entityList={}".format(entityList)
```

</TabItem>
</Tabs>

---

### GetChunkMaxPos

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(entityId)`

获取某区块最大点的坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChunkMaxPos(chunkPos: Tuple[int, int]) -> Optional[Tuple[int, int, int]]
```

- chunkPos: Tuple[int, int]，指定区块的坐标。

**返回值**：Optional[Tuple[int, int, int]]，该区块最大点的坐标。

**备注**

- 当传入的 chunkPos 类型不是 tuple 或者长度不为 2 时，返回值为 None。
- 请传入具体实体 id 来构造 comp，此时代表具体实体所在维度的最大坐标值。否则获取到的值有问题。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(entityId)
maxPos = comp.GetChunkMaxPos((1, 3))
```

</TabItem>
</Tabs>

---

### GetChunkMinPos

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(entityId)`

获取某区块最小点的坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChunkMinPos(chunkPos: Tuple[int, int]) -> Optional[Tuple[int, int, int]]
```

- chunkPos: Tuple[int, int]，指定区块的坐标。

**返回值**：Optional[Tuple[int, int, int]]，该区块最小点的坐标。

**备注**

- 当传入的 chunkPos 类型不是 tuple 或者长度不为 2 时，返回值为 None。
- 请传入具体实体 id 来构造 comp，此时代表具体实体所在维度的最小坐标值。否则获取到的值有问题。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(entityId)
minPos = comp.GetChunkMinPos((1, 3))
```

</TabItem>
</Tabs>

---

### GetChunkMobNum

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

获取某区块中的生物数量（不包括玩家，但包括盔甲架）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChunkMobNum(dimension: int, chunkPos: Tuple[int, int]) -> int
```

- dimension: int，区块所在维度。
- chunkPos: Tuple[int, int]，指定区块的坐标。

**返回值**：int，该区块中的生物数量。

**备注**

- 返回值为-1 通常是由于该维度未加载、该区块未加载。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
mobNum = comp.GetChunkMobNum(0, (1, 3))
```

</TabItem>
</Tabs>

---

### GetChunkPosFromBlockPos

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

通过方块坐标获得该方块所在区块坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChunkPosFromBlockPos(blockPos: Tuple[int, int, int]) -> Optional[Tuple[int, int]]
```

- blockPos: Tuple[int, int, int]，方块的坐标。

**返回值**：Optional[Tuple[int, int]]，该方块所在区块的坐标。

**备注**

- 当传入的 blockPos 类型不是 tuple 或者长度不为 3 时，返回值为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
chunkPos = comp.GetChunkPosFromBlockPos((90, 40, -4))
```

</TabItem>
</Tabs>

<Client/> ChunkSourceCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateChunkSource(LevelId)`

通过方块坐标获得该方块所在区块坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChunkPosFromBlockPos(blockPos: Tuple[int, int, int]) -> Optional[Tuple[int, int]]
```

- blockPos: Tuple[int, int, int]，方块的坐标。

**返回值**：Optional[Tuple[int, int]]，该方块所在区块的坐标。

**备注**

- 当传入的 blockPos 类型不是 tuple 或者长度不为 3 时，返回值为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateChunkSource(LevelId)
chunkPos = comp.GetChunkPosFromBlockPos((90, 40, -4))
```

</TabItem>
</Tabs>

---

### GetCurrentDimension

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取客户端当前维度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCurrentDimension() -> int
```


**返回值**：int，维度 id。客户端未登录完成或正在切维度时返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
dimId = comp.GetCurrentDimension()
```

</TabItem>
</Tabs>

---

### GetEntitiesAround

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(entityId)`

获取区域内的 entity 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntitiesAround(entityId: str, radius: int, filters: Dict[str, Any]) -> List[str]
```

- entityId: str，某个 entityId。
- radius: int，正方体区域半径。
- filters: Dict[str, Any]，过滤设置字典。

**返回值**：List[str]，返回 entityId 的 list。

**备注**

- 过滤器在对区域内的所有实体进行过滤时，会把每一个实体设置为 other，同时把 entityId 对应的实体设置为 self。关于过滤器的详细说明，用户可以查看基岩版 wiki：Entity Filters 介绍。
- 过滤器中"subject"表示过滤判断的实体类型，"subject"="self"表示对每个实体设置的 self 进行过滤判断,"subject"="other"表示对每个实体设置的 other 进行过滤判断。

</TabItem>
<TabItem value="示例" label="示例">

```python
#利用过滤器获取玩家身边的entity
#样例中的过滤器表示满足“是玩家”或者“没有头戴南瓜帽”的entity
filters = {
    "any_of": [
        {
            "subject" : "other",
            "test" :  "is_family",
            "value" :  "player"
        },
        {
            "test" :  "has_equipment",
            "domain": "head",
            "subject" : "other",
            "operator" : "not",
            "value" : "carved_pumpkin"
        }
    ]
}
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(entityId)
comp.GetEntitiesAround(entityId, 100, filters)
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(entityId)`

获取区域内的 entity 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntitiesAround(entityId: str, radius: int, filters: Dict[str, Any]) -> List[str]
```

- entityId: str，某个 entityId。
- radius: int，正方体区域半径。
- filters: Dict[str, Any]，过滤设置字典。

**返回值**：List[str]，返回 entityId 的 list。

**备注**

- 过滤器在对区域内的所有实体进行过滤时，会把每一个实体设置为 other，同时把 entityId 对应的实体设置为 self。关于过滤器的详细说明，用户可以查看基岩版 wiki：Entity Filters 介绍。
- 过滤器中"subject"表示过滤判断的实体类型，"subject"="self"表示对每个实体设置的 self 进行过滤判断,"subject"="other"表示对每个实体设置的 other 进行过滤判断。
- 客户端请不要使用 is_family 过滤，因为客户端并没有相关数据，会导致所有实体被过滤掉。

</TabItem>
<TabItem value="示例" label="示例">

```python
#利用过滤器获取玩家身边的entity
#样例中的过滤器表示“没有头戴南瓜帽”的entity
filters = {
    "any_of": [
        {
            "test" :  "has_equipment",
            "domain": "head",
            "subject" : "other",
            "operator" : "not",
            "value" : "carved_pumpkin"
        }
    ]
}
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(entityId)
comp.GetEntitiesAround(entityId, 100, filters)
```

</TabItem>
</Tabs>

---

### GetEntitiesAroundByType

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取区域内的某类型的 entity 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntitiesAroundByType(entityId: str, radius: int, entityType: int) -> List[str]
```

- entityId: str，区域中心的 entityId,如某个玩家的 entityid。
- radius: int，区域半径。
- entityType: int，[EntityType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/EntityType.html)。

**返回值**：List[str]，返回 entityId 的 list。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# 获取身边10格内的掉落物
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.GetEntitiesAroundByType(entityId, 10, serverApi.GetMinecraftEnum().EntityType.ItemEntity)
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取区域内的某类型的 entity 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntitiesAroundByType(entityId: str, radius: int, entityType: int) -> List[str]
```

- entityId: str，区域中心的 entityId,如某个玩家的 entityid。
- radius: int，区域半径。
- entityType: int，[EntityType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/EntityType.html)。

**返回值**：List[str]，返回 entityId 的 list。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 获取身边10格内的掉落物
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.GetEntitiesAroundByType(entityId, 10, clientApi.GetMinecraftEnum().EntityType.ItemEntity)
```

</TabItem>
</Tabs>

---

### GetEntitiesAroundForClientEntity

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(entityId)`

获取区域内的客户端实体列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntitiesAroundForClientEntity(entityId: str, radius: int, filters: Dict[str, Any]) -> List[str]
```

- entityId: str，实体 Id。
- radius: int，正方体区域半径。
- filters: Dict[str, Any]，过滤设置字典。

**返回值**：List[str]，返回客户端实体 Id 的 list。

**备注**

- 仅能用于获取通过 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体。
- 维度为客户端所在维度。
- 过滤器在对区域内的所有实体进行过滤时，会把每一个实体设置为 other，同时把 entityId 对应的实体设置为 self。关于过滤器的详细说明，用户可以查看基岩版 wiki：Entity Filters 介绍。
- 过滤器中"subject"表示过滤判断的实体类型，"subject"="self"表示对每个实体设置的 self 进行过滤判断,"subject"="other"表示对每个实体设置的 other 进行过滤判断。
- 客户端请不要使用 is_family 过滤，因为客户端并没有相关数据，会导致所有实体被过滤掉。
- 过滤器中如果使用了涉及服务端逻辑的 filter，将会获取失败，如 in_water 等等。

</TabItem>
<TabItem value="示例" label="示例">

```python
#利用过滤器获取玩家身边的entity
#样例中的过滤器表示“没有头戴南瓜帽”的entity
filters = {
    "any_of": [
        {
            "test" :  "has_equipment",
            "domain": "head",
            "subject" : "other",
            "operator" : "not",
            "value" : "carved_pumpkin"
        }
    ]
}
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(entityId)
comp.GetEntitiesAroundForClientEntity(entityId, 100, filters)
```

</TabItem>
</Tabs>

---

### GetEntitiesInSquareArea

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取区域内的 entity 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntitiesInSquareArea(
    entityId: None,
    startPos: Tuple[int, int, int],
    endPos: Tuple[int, int, int],
    dimensionId: int,
) -> List[str]
```

- entityId: None，该参数已废弃。
- startPos: Tuple[int, int, int]，初始位置。
- endPos: Tuple[int, int, int]，结束位置，结束位置应大于初始位置，否则会返回空列表。
- dimensionId: int，区域所在维度，可获取对应维度的常加载区块内的实体列表。

**返回值**：List[str]，返回 entityId 的 list。

**备注**

- 检测的方法是使用分离轴定理，当两个 AABB 有重合的时候才判断为碰撞，表面相接不视为碰撞。
- 计算时请注意，方块的坐标代表顶点坐标，而非方块正中心位置，与实体的位置坐标含义不同。
- 输入的位置为精确坐标，以单个轴举例，如 AABB 要覆盖坐标为 1、2、3 三个方块大小的范围，需要 startPos 为 0，endPos 为 3。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.GetEntitiesInSquareArea(None, (0,0,0), (100,100,100), 0)
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取区域内的 entity 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntitiesInSquareArea(
    entityId: None,
    startPos: Tuple[int, int, int],
    endPos: Tuple[int, int, int],
) -> List[str]
```

- entityId: None，该参数已废弃。
- startPos: Tuple[int, int, int]，初始位置。
- endPos: Tuple[int, int, int]，结束位置，结束位置应大于初始位置，否则会返回空列表。

**返回值**：List[str]，返回 entityId 的 list。

**备注**

- 维度为玩家自身所在维度。
- 检测的方法是使用分离轴定理，当两个 AABB 有重合的时候才判断为碰撞，表面相接不视为碰撞。
- 计算时请注意，方块的坐标代表顶点坐标，而非方块正中心位置，与实体的位置坐标含义不同。
- 输入的位置为精确坐标，以单个轴举例，如 AABB 要覆盖坐标为 1、2、3 三个方块大小的范围，需要 startPos 为 0，endPos 为 3。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.GetEntitiesInSquareArea(None, (0,0,0), (100,100,100))
```

</TabItem>
</Tabs>

---

### GetEntitiesInSquareAreaForClientEntity

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取区域内的客户端实体列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntitiesInSquareAreaForClientEntity(
    startPos: Tuple[int, int, int],
    endPos: Tuple[int, int, int],
) -> List[str]
```

- startPos: Tuple[int, int, int]，初始位置。
- endPos: Tuple[int, int, int]，结束位置，结束位置应大于初始位置，否则会返回空列表。

**返回值**：List[str]，返回 entityId 的 list。

**备注**

- 仅能用于获取通过 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体。
- 维度为客户端所在维度。
- 计算时请注意，方块的坐标代表顶点坐标，而非方块正中心位置，与实体的位置坐标含义不同。
- 输入的位置为精确坐标，以单个轴举例，如 AABB 要覆盖坐标为 1、2、3 三个方块大小的范围，需要 startPos 为 0，endPos 为 3。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.GetEntitiesInSquareAreaForClientEntity((0,0,0), (100,100,100))
```

</TabItem>
</Tabs>

---

### GetLevelId

<Server/>

模块级函数，直接调用。

获取 levelId。某些组件需要 levelId 创建，可以用此接口获取 levelId。其中 level 即为当前地图的游戏。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLevelId() -> str
```


**返回值**：str，当前地图的 levelId。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def ExtraDataTest(args):
        extraDataComp = serverApi.GetEngineCompFactory().CreateExtraData(serverApi.GetLevelId())
        extraDataComp.score = 100
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取 levelId。某些组件需要 levelId 创建，可以用此接口获取 levelId。其中 level 即为当前地图的游戏。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLevelId() -> str
```


**返回值**：str，当前地图的 levelId。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()
class FpsClientSystem(ClientSystem):
    def CameraCompTest(args):
        cameraComp = clientApi.GetComponent(clientApi.GetLevelId(), 'Minecraft', 'camera')
        cameraComp.fov = 60
```

</TabItem>
</Tabs>

---

### GetLoadedChunks

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

获取指定维度当前已经加载完毕的全部区块的坐标列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLoadedChunks(dimension: int) -> Optional[List[Tuple[int, int]]]
```

- dimension: int，维度。

**返回值**：Optional[List[Tuple[int, int]]]，区块坐标的列表（区块坐标为(x,z)），当指定维度不存在或尚未创建时，返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
result = comp.GetLoadedChunks(0)
print "dimension {} has chunk {}".format(0, result)
```

</TabItem>
</Tabs>

---

### GetSpawnDimension

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取世界出生维度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSpawnDimension() -> int
```


**返回值**：int，维度 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
spawnDimension = gameComp.GetSpawnDimension()
```

</TabItem>
</Tabs>

---

### GetSpawnPosition

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取世界出生点坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSpawnPosition() -> Tuple[int, int, int]
```


**返回值**：Tuple[int, int, int]，出生点坐标。

**备注**

- 返回的坐标不一定是精确的出生点坐标，也不一定是安全的出生点，玩家出生时会在该坐标附近随机选取一个满足出生条件的坐标。
- 未使用 setworldspawn 指令设置过出生点位置时，返回坐标的 y 轴是 32767。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
spawnPos = gameComp.GetSpawnPosition()
```

</TabItem>
</Tabs>

---

### GetStructureSize

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取结构体的长宽高。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetStructureSize(structureName: str) -> Tuple[int, int, int]
```

- structureName: str，结构名称。

**返回值**：Tuple[int, int, int]，结构体的长宽高，获取失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.GetStructureSize("test:structureName")
```

</TabItem>
</Tabs>

---

### IsChunkGenerated

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

获取某个区块是否生成过。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsChunkGenerated(dimensionId: int, chunkPos: Tuple[int, int]) -> bool
```

- dimensionId: int，区块所在维度。
- chunkPos: Tuple[int, int]，指定区块的坐标。

**返回值**：bool，该区块是否生成过。

**备注**

- 玩家探索过（以玩家为中心，模拟距离（在游戏的设置页面内）为半径内的区块），或者使用 [SetAddArea](/docs/docs/scripts/modapi/world/map#setaddarea) 设置常加载区块附近的区块，都是生成过的区块。这些区块会保存到存档里，再次探索时会从存档读取，不会重新生成。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
# 获取主世界(10000,0,10000)坐标所在的区块是否生成过
result = comp.IsChunkGenerated(0, comp.GetChunkPosFromBlockPos((10000, 0, 10000)))
```

</TabItem>
</Tabs>

---

### IsSlimeChunk

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

获取某个区块是否是史莱姆区块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsSlimeChunk(dimensionId: int, chunkPos: Tuple[int, int]) -> bool
```

- dimensionId: int，区块所在维度。
- chunkPos: Tuple[int, int]，指定区块的坐标。

**返回值**：bool，该区块是否史莱姆区块。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
result = comp.IsSlimeChunk(0, comp.GetChunkPosFromBlockPos((10000, 0, 10000)))
```

</TabItem>
</Tabs>

---

### LocateNeteaseFeatureRule

<Server/> FeatureCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateFeature(levelId)`

与[/locate 指令](https://zh.minecraft.wiki/w/%E5%91%BD%E4%BB%A4/locate)相似，用于定位[网易自定义特征规则](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/4-zidingyiweidu/4-zidingyitezheng.html#特征规则（feature-rules）)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LocateNeteaseFeatureRule(
    ruleName: str,
    dimensionId: int,
    pos: Tuple[int, int, int],
    mustBeInNewChunk: bool = False,
) -> Optional[Tuple[float, float, float]]
```

- ruleName: str，特征规则名称，形式为 namespace:featureRuleIdentifier，如 custombiomes:overworld_pumpkins_feature_rule。
- dimensionId: int，查找维度，**要求该维度已加载**。
- pos: Tuple[int, int, int]，以该位置为中心来查找满足网易自定义特征规则分布条件的坐标。
- mustBeInNewChunk: bool，是否只在未加载区块中寻找。默认值为 False，表示只在加载过的区块中寻找。

**返回值**：Optional[Tuple[float, float, float]]，最近的满足网易自定义特征规则分布条件的坐标，定位失败则返回 None。

**备注**

- 定位失败通常是由于传入维度不存在、维度未加载、没有满足该自定义特征规则分布条件的坐标、目标坐标距离传入位置过远（以该位置为中心，半径 100 个区块内无法找到）等。
- 若在 feature rules 中"conditions"内的"minecraft:biome_filter"中填写了判断维度以外的过滤规则，将有概率无法定位到满足该自定义特征规则分布条件的坐标。建议开发者在"distribution"的"iterations"中使用 query.is_biome 代替。
- 定位原理是根据网易自定义特征规则分布条件寻找可能的位置，因此有可能会定位到在 [PlaceNeteaseStructureFeatureEvent](/docs/docs/scripts/modapi/events/world#placeneteasestructurefeatureevent) 事件中被取消生成的结构位置。开发者应注意甄别，尽量避免对可能在 [PlaceNeteaseStructureFeatureEvent](/docs/docs/scripts/modapi/events/world#placeneteasestructurefeatureevent) 事件中被取消放置的结构对应特征规则文件调用定位函数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFeature(levelId)
pos = comp.LocateNeteaseFeatureRule("custombiomes:overworld_pumpkins_feature_rule", 0, (0, 64, 0), False)
```

</TabItem>
</Tabs>

---

### LocateStructureFeature

<Server/> FeatureCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateFeature(levelId)`

与[/locate 指令](https://zh.minecraft.wiki/w/%E5%91%BD%E4%BB%A4/locate)相似，用于定位原版的部分结构，如海底神殿、末地城等。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LocateStructureFeature(
    featureType: int,
    dimensionId: int,
    pos: Tuple[int, int, int],
    useNewChunksOnly: bool = False,
) -> Optional[Tuple[float, float]]
```

- featureType: int，原版的结构类型，[StructureFeatureType](https://mc.163.com/newdev/docs/api/meijuzhi/StructureFeatureType.html)枚举。
- dimensionId: int，结构所在维度，**要求该维度已加载**。
- pos: Tuple[int, int, int]，以该位置为中心来查找最近的结构。
- useNewChunksOnly: bool，是否只在未生成的区块中寻找。默认值为 False，表示只在加载过的区块中寻找。

**返回值**：Optional[Tuple[float, float]]，最近的结构所在区块位置(x 坐标,z 坐标)，y 坐标不定，若定位失败则返回 None。

**备注**

- 定位失败通常是由于该维度不存在、该维度未加载、该维度中不存在该结构、该结构距离传入位置过远等。
- 该接口返回值为对应结构所在区块的坐标，与结构实际生成位置可能相距一定距离。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFeature(levelId)
pos = comp.LocateStructureFeature(serverApi.GetMinecraftEnum().StructureFeatureType.Village, 0, (0, 64, 0), False)
```

</TabItem>
</Tabs>

---

### MayPlace

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

判断方块是否可以放置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
MayPlace(identifier: str, blockPos: Tuple[int, int, int], facing: int, dimensionId: int) -> bool
```

- identifier: str，方块 identifier，如 minecraft:wheat。
- blockPos: Tuple[int, int, int]，方块将要放置的坐标。
- facing: int，朝向，详见[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- dimensionId: int，维度，默认为主世界 0。

**返回值**：bool，方块是否可以放置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
pos = (-1, 4, 34)
canPlace = comp.MayPlace("minecraft:wheat", pos, serverApi.GetMinecraftEnum().Facing.Up, 0)
```

</TabItem>
</Tabs>

---

### MayPlaceOn

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

判断物品是否可以放到指定的位置上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
MayPlaceOn(identifier: str, auxValue: int, blockPos: Tuple[int, int, int], facing: int) -> bool
```

- identifier: str，物品标识，如 minecraft:dye。
- auxValue: int，物品的附加值。
- blockPos: Tuple[int, int, int]，位置坐标。
- facing: int，朝向，详见[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。

**返回值**：bool，是否可以放置。

**备注**

- 不支持常加载区块。
- 不支持使用是生成实体的物品，比如船，盔甲架，刷怪蛋。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.MayPlaceOn("minecraft:dye", 3, (1,2,3), serverApi.GetMinecraftEnum().Facing.Up)
```

</TabItem>
</Tabs>

---

### MirrorDimension

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

复制不同 dimension 的地形。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
MirrorDimension(fromId: int, toId: int) -> bool
```

- fromId: int，原 dimensionId。
- toId: int，目标 dimensionId。

**返回值**：bool，是否设置成功。

**备注**

- 仅复制源维度已经生成的区块信息到新的维度，对于未生成的源维度区块无法完全复制生成逻辑，可能采用部分新维度自己的信息。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.MirrorDimension(0, 1)
```

</TabItem>
</Tabs>

---

### OpenClientChunkGeneration

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

开启/关闭客户端区块生成功能，需要在 [LoadServerAddonScriptsAfter](/docs/docs/scripts/modapi/events/world#loadserveraddonscriptsafter) 事件触发时调用。开启客户端区块生成功能时，如果使用了 netease:structure_feature 或修改了大部分地图，会导致客户端和服务端地图不一致的问题。此时可以通过关闭客户端区块生成功能解决该问题。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenClientChunkGeneration(val: bool) -> bool
```

- val: bool，开启/关闭，该功能默认开启。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
result = comp.OpenClientChunkGeneration(False) #关闭客户端区块生成功能
```

</TabItem>
</Tabs>

---

### PlaceFeature

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

放置特征，与[/placefeature 指令](https://zh.minecraft.wiki/w/%E5%91%BD%E4%BB%A4/placefeature)相似。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlaceFeature(featureName: str, dimensionId: int, pos: Tuple[int, int, int]) -> bool
```

- featureName: str，特征名称，形式为 namespace:featureName，如 test:pumpkins。
- dimensionId: int，特征放置维度。
- pos: Tuple[int, int, int]，放置位置。

**返回值**：bool，是否放置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.PlaceFeature("test:pumpkins", 0, (0, 64, 0))
```

</TabItem>
</Tabs>

---

### PlaceNeteaseLargeFeature

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

放置[网易版大型结构特征](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/4-zidingyiweidu/6-zidingyidaxingtezheng.html#自定义大型特征)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlaceNeteaseLargeFeature(
    poolName: str,
    dimensionId: int,
    pos: Tuple[int, int, int],
    rotation: int,
    maxDepth: int,
) -> bool
```

- poolName: str，中心池 identifier，请参考大型特征结构池注册规则。
- dimensionId: int，大型结构放置维度(仅支持主世界类型维度)。
- pos: Tuple[int, int, int]，放置位置。
- rotation: int，中心结构旋转角度(0:顺时针旋转 0°；90:顺时针旋转 90°;180:顺时针旋转 180°；270:顺时针旋转 270°)。
- maxDepth: int，大型结构递归最大深度。

**返回值**：bool，是否放置成功(由于区块未加载导致放置不全也算放置成功)。

**备注**

- 放置时需要确保所放置的区块都已加载，否则会放置失败或者部分缺失。
- 建议使用 [SetAddArea](/docs/docs/scripts/modapi/world/map#setaddarea) 接口将大型结构所在的区块都设置为常加载，以保证所有结构可被正常摆放。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.PlaceNeteaseLargeFeature("minecraft:centerPool", 0, (0, 65, 0), 90, 5)
```

</TabItem>
</Tabs>

---

### PlaceStructure

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

放置结构。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlaceStructure(
    playerId: None,
    pos: Tuple[float, float, float],
    structureName: str,
    dimensionId: int = -1,
    rotation: int = 180,
    animationMode: int = 0,
    animationTime: float = 0,
    inculdeEntity: bool = True,
    removeBlock: bool = False,
    mirrorMode: int = 0,
    integrity: float = 100,
    seed: int = -1,
) -> bool
```

- playerId: None，该参数已废弃。
- pos: Tuple[float, float, float]，放置结构的位置。
- structureName: str，结构名称。
- dimensionId: int，希望放置结构的维度，可在对应维度的常加载区块放置结构，默认为-1。
- rotation: int，放置结构的旋转角度，默认为 0(只可旋转 90，180，270 度)。
- animationMode: int，动画模式，详见[AnimationModeType](https://mc.163.com/newdev/docs/api/meijuzhi/AnimationModeType.html)，默认值为 0，即不使用动画。
- animationTime: float，动画时间，默认为 0。
- inculdeEntity: bool，是否包含实体，默认为 True。
- removeBlock: bool，是否移除方块，默认为 False。
- mirrorMode: int，镜像模式，详见[MirrorModeType](https://mc.163.com/newdev/docs/api/meijuzhi/MirrorModeType.html)，默认值为 0，即不使用镜像放置。
- integrity: float，完整性，默认为 100。
- seed: int，随机种子，默认为-1。

**返回值**：bool，是否放置成功，True 为放置成功，False 为放置失败。

**备注**

- 放置时需要确保所放置的区块都已加载，否则会放置失败或者部分缺失。
- 该接口是同步执行的，请勿在一帧内放置大量结构，会造成游戏卡顿。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.PlaceStructure(None, (100, 70, 100), "test:structureName", 0, 0)
```

</TabItem>
</Tabs>

---

### SetAddArea

<Server/> ChunkSourceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChunkSource(levelId)`

设置区块的常加载。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAddArea(key: str, dimensionId: int, minPos: Tuple[int, int, int], maxPos: Tuple[int, int, int]) -> bool
```

- key: str，常加载区域的名称。
- dimensionId: int，区块所在的维度。
- minPos: Tuple[int, int, int]，加载区域的最小坐标。
- maxPos: Tuple[int, int, int]，加载区域的最大坐标。

**返回值**：bool，设置是否成功。

**备注**

- key 必须唯一，若添加区域时 key 已存在将添加失败。
- 该方式创建的常加载区域不会 tick，即实体，方块实体，随机刻都不会进行更新。若需要区域被 tick，请使用原版 tickingarea 指令。
- 将当前未加载的区块设置为常加载区块时，不会从存档加载生物。但如果是当前已加载的区块，则玩家远离区块后，区块内的实体会一直保持加载。
- 常加载区块内可以使用 api 创建实体、放置方块、放置结构、修改方块实体数据。
- 由于区块加载算法的特性，不保证最小到最大坐标的区块完全加载并可用（即 [CheckChunkState](/docs/docs/scripts/modapi/world/map#checkchunkstate) 接口返回 True），建议将操作位置的四周外延 80 格的区域都设置为常加载，例如需要在(0,5,0)的位置生成生物/放置方块，需要将(-80,0,-80)到(80,0,80)的区域设置为常加载。
- 通过本接口添加的区块不被 tick 时，无法使用 fill 指令在区块内填充方块。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChunkSource(levelId)
comp.SetAddArea('Area0', 0, (-80,0,-80), (80,0,80))
```

</TabItem>
</Tabs>

---

### SetBiomeByPos

<Server/> BiomeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBiome(levelId)`

设置某一位置所属的生物群系信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBiomeByPos(pos: Tuple[int, int, int], biomeName: str, dimId: int) -> bool
```

- pos: Tuple[int, int, int]，指定位置。
- biomeName: str，指定生物群系名称。
- dimId: int，维度 id。

**返回值**：bool，是否设置成功。

**备注**

- 只支持设置已加载的坐标，支持设置 2D 和 3D 群系，3D 群系有特殊规则(详情参考：3D 群系是特殊)。
- 群系名字参数需要填写命名空间，无命名空间的参数接口将会自动补全 minecraft 的命名空间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBiome(levelId)
setState = comp.SetBiomeByPos((0, 80, 0), "desert", 0)
```

</TabItem>
</Tabs>

---

### SetBiomeByPosList

<Server/> BiomeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBiome(levelId)`

设置所有列表中位置所属的生物群系信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBiomeByPosList(posList: List[Tuple[int, int, int]], biomeName: str, dimId: int) -> Dict[str, Any]
```

- posList: List[Tuple[int, int, int]]，要设置的位置列表。
- biomeName: str，指定生物群系名称。
- dimId: int，维度 id。

**返回值**：Dict[str, Any]，设置状态信息。

**备注**

- 只支持设置已加载的坐标，支持设置 2D 和 3D 群系，3D 群系有特殊规则(详情参考：3D 群系是特殊)。
- 群系名字参数需要填写命名空间，无命名空间的参数接口将会自动补全 minecraft 的命名空间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBiome(levelId)
posList = [(0, 80, 0)]
setPosListState = comp.SetBiomeByPosList(posList, "desert", 0)
#返回字典中 "Update"表示整体设置是否成功，类型bool，有任何一个坐标设置失败 Update就会被设置为False
setAllState = setPosListState["Update"]
#返回字典中 "BlockList"表示设置失败的坐标列表，类型list，list中的Python Object和传入的list中的Python Object是同一个，比如传入非法的字符串"a"，那么"BlockList"中也会返回"a"
setFailList = setPosListState["BlockList"]
```

</TabItem>
</Tabs>

---

### SetBiomeByVolume

<Server/> BiomeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBiome(levelId)`

设置长方体空间中所属的生物群系信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBiomeByVolume(
    minPos: Tuple[int, int, int],
    maxPos: Tuple[int, int, int],
    biomeName: str,
    dimId: int,
) -> bool
```

- minPos: Tuple[int, int, int]，长方体中最小的位置坐标。
- maxPos: Tuple[int, int, int]，长方体中最大的位置坐标。
- biomeName: str，指定生物群系名称。
- dimId: int，维度 id。

**返回值**：bool，设置是否全部都成功，有任何部分空间设置失败都会返回 False。

**备注**

- 只支持设置已加载的区块，设置超出维度范围的空间会被忽视掉，支持设置 2D 和 3D 群系，3D 群系有特殊规则(详情参考：3D 群系是特殊)。
- 群系名字参数需要填写命名空间，无命名空间的参数接口将会自动补全 minecraft 的命名空间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBiome(levelId)
minPos = (0, 0, 0)
maxPos = (31,31,31)
setState = comp.SetBiomeByVolume(minPos, maxPos, "desert", 0)
```

</TabItem>
</Tabs>

---

### SetBiomeInfo

<Server/> BiomeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBiome(levelId)`

设置群系天气相关参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBiomeInfo(
    biomeName: str,
    snowAccumulation: Tuple[float, float],
    temperature: float,
    downfall: float,
    isRain: bool,
) -> bool
```

- biomeName: str，群系名字。
- snowAccumulation: Tuple[float, float]，积雪堆积量的最小值和最大值,最小值必须小于最大值。
- temperature: float，温度,小于等于 0.15 时将会下雪,大于 1 没有特殊意义。
- downfall: float，降雨(雪)强度,会影响湿度。
- isRain: bool，是否降雨(雪),只有为 True 时才会下雨(雪)。

**返回值**：bool，是否设置成功。

**备注**

- 此接口设置的值退出游戏时无法被保存,每次进入游戏后,需要重新设置。
- 群系名字参数需要填写命名空间，无命名空间的参数接口将会自动补全 minecraft 的命名空间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBiome(levelId)
result = comp.SetBiomeInfo("desert", (0.125, 1), 0.15, 1, True)
```

</TabItem>
</Tabs>

---

### SetMergeSpawnItemRadius

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置新生成的物品是否合堆。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMergeSpawnItemRadius(radius: float) -> bool
```

- radius: float，合堆检测半径，范围可设置为 0 到 5，初始为 0。若为 0 代表不合堆，若大于 0，则地图中生成一个物品时，会检测这个半径内是否有相同物品，若有且未达到堆叠上限，则不生成新物品，而是使地图上该物品的数量增加。

**返回值**：bool，success True 为设置成功，False 为设置失败。

**备注**

- 该接口主要应用于优化会一次性大量生成掉落物品的场景，使用此方式后生成结果就是一堆物品，不会先生成多个物品再进行合堆检测，可大大减少掉落物品实体数量，大幅提升性能。
- 该接口不会影响游戏本身的每帧合堆检测逻辑，手中丢弃的物品不受上述合堆逻辑影响。
- 合堆范围是 AABB(方形)，而不是一个圆。例子：在（0,100,0）初始掉落物品，在（5,100,0,）和（0,100,5）的掉落物能合堆，在生成（5,100,5）的掉落物也能合堆。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
gameComp.SetMergeSpawnItemRadius(5.0)
```

</TabItem>
</Tabs>

---

### SetSpawnDimensionAndPosition

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置世界出生点维度与坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSpawnDimensionAndPosition(dimensionId: Optional[int], pos: Optional[Tuple[int, int, int]]) -> bool
```

- dimensionId: Optional[int]，维度 id。
- pos: Optional[Tuple[int, int, int]]，出生点坐标。

**返回值**：bool，是否成功。

**备注**

- 同时设置 dimensionId 与 pos 时，出生点被设置在对应维度的对应坐标。只设置 dimensionId，而 pos 为 None 时，出生点设置为对应维度，而坐标将通过基岩版世界生成搜索决定。只设置 pos，而 dimensionId 为 None，则出生点设置为当前出生维度的对应坐标，与 setworldspawn 指令相同。
- 将 pos 的 y 轴设置为 65535，表示出生到 xz 坐标轴的最高实心方块上。
- 当出生维度的类型是地狱和末地时，不会像主世界一样寻找一个安全的位置出生。
- 关于世界出生点与个人出生点的规则，详见玩家的生成。
- 注意:如果和/spawnpoint 一起使用，则/spawnpoint 的优先级更高，SetSpawnDimensionAndPosition 将失效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
# 设置世界出生点到dm3维度的某个坐标
gameComp.SetSpawnDimensionAndPosition(3, (0, 60, 0))
```

</TabItem>
</Tabs>

---

### UpgradeMapDimensionVersion

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

提升指定地图维度的版本号，版本号不符的维度，地图存档信息将被废弃。使用后存档的地图版本均会同步提升至最新版本，假如希望使用此接口清理指定维度的地图存档，需要在保证该维度区块都没有被加载时调用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UpgradeMapDimensionVersion(dimension: int, version: int) -> bool
```

- dimension: int，维度的数字 ID，0 代表主世界。
- version: int，维度地图的版本号，取值范围为 1-999。

**返回值**：bool，success True 为设置成功，False 为设置失败。

**备注**

- 对于本地游戏来说，由于引擎加载时机比 mod 早，因此可能出现区块加载比 mod 加载更早的情况，此时在初始化时使用该接口升级当前维度会出现失效的情况，建议本地游戏中先将玩家移出需要升级的维度，等区块卸载完成（可以使用 [CheckChunkState](/docs/docs/scripts/modapi/world/map#checkchunkstate) 判断玩家离开前位置）后再升级该维度。
- 对于网络服游戏来说，因为服务端加载 mod 总是比玩家登录要早，因此可以在 mod 初始化时调用该接口升级指定维度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
success = gameComp.UpgradeMapDimensionVersion(0, 10)
```

</TabItem>
</Tabs>

---
