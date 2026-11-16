---
sidebar_position: 2
---

# 方块管理

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录方块管理相关的接口，共 11 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/fangkuaiguanli.html"/>

---

### GetBlock

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取某一位置的 block。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlock(pos: Tuple[float, float, float]) -> Tuple[str, int]
```

- pos: Tuple[float, float, float]，方块位置。

**返回值**：Tuple[str, int]，参数 1:方块的名称，参数 2:方块的附加值 AuxValue。

**备注**

- 已经加载的地形才设置、获取方块信息。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.GetBlock((x,y,z))
```

</TabItem>
</Tabs>

---

### GetBlockClip

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取某一位置方块当前[clip 的 aabb](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/2-zidingyifangkuai/1-json-zujian.html#netease-aabb)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockClip(pos: Tuple[int, int, int], dimensionId: int = -1) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，方块位置。
- dimensionId: int，方块所在维度,不填时默认为-1。

**返回值**：Dict[str, Any]，方块 clip 的 aabb 字典。

**备注**

- 已经加载的地形才能获取方块信息，支持获取对应维度的常加载区块内方块信息。
- 由于方块的碰撞盒可以随临近方块改变而改变，因此该接口返回的是调用时方块 clip 的 aabb。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
blockDict = comp.GetBlockClip((0, 5, 0), 0)
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取指定位置方块当前 clip 的 aabb。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockClip(pos: Tuple[int, int, int]) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，方块位置。

**返回值**：Dict[str, Any]，方块 aabb 字典。

**备注**

- 由于方块的碰撞盒可以随临近方块改变而改变，因此该接口返回的是调用时方块 clip 的 aabb。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.GetBlockClip((x,y,z))
```

</TabItem>
</Tabs>

---

### GetBlockCollision

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取某一位置方块当前 collision 的 aabb。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockCollision(pos: Tuple[int, int, int], dimensionId: int = -1, getAll: bool = False) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，方块位置。
- dimensionId: int，方块所在维度,不填时默认为-1。
- getAll: bool，是否打印 netease:aabb 碰撞参数，默认为 False。

**返回值**：Dict[str, Any]，方块 aabb 字典, 如果 getAll 为 True 则返回 netease:aabb 字典。

**备注**

- 已经加载的地形才能获取方块信息，支持获取对应维度的常加载区块内方块信息。
- 由于方块的碰撞盒可以随临近方块改变而改变，因此该接口返回的是调用时方块 collision 的 aabb。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
blockDict = comp.GetBlockCollision((0, 5, 0), 0)
# getAll为True则返回netease:aabb字典
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
blockDict = comp.GetBlockCollision((0, 5, 0), 0, True)
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取指定位置方块当前 collision 的 aabb。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockCollision(pos: Tuple[int, int, int], getAll: bool = False) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，方块位置。
- getAll: bool，是否打印 netease:aabb 碰撞参数，默认为 False。

**返回值**：Dict[str, Any]，方块 aabb 字典, 如果 getAll 为 True 则返回 netease:aabb 字典。

**备注**

- 由于方块的碰撞盒可以随临近方块改变而改变，因此该接口返回的是调用时方块 collision 的 aabb。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.GetBlockCollision((x,y,z))
# getAll为True则返回netease:aabb字典
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.GetBlockCollision((x,y,z), True)
```

</TabItem>
</Tabs>

---

### GetBlockNew

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取某一位置的 block。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockNew(pos: Tuple[int, int, int], dimensionId: int) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，方块位置。
- dimensionId: int，方块所在维度。

**返回值**：Dict[str, Any]，[方块信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#方块信息字典)。

**备注**

- 已经加载的地形才能获取方块信息，支持获取对应维度的常加载区块内方块信息。
- 对于有多种状态的方块，aux 计算比较复杂，推荐使用 [GetBlockStates](/docs/docs/scripts/modapi/block/state#getblockstates) 获取方块状态字典。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
blockDict = comp.GetBlockNew((0, 5, 0), 0)
```

</TabItem>
</Tabs>

---

### GetDestroyTotalTime

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取使用物品破坏方块需要的时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDestroyTotalTime(blockName: str, itemName: str, miningArgs: Dict[str, Any]) -> float
```

- blockName: str，方块标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0。
- itemName: str，物品标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0，默认为 None（不使用物品）。
- miningArgs: Dict[str, Any]，挖掘参数，包含以下字段：急迫等级 haste、潮涌能量等级 conduit_power、挖掘疲劳 mining_fatigue 以及挖掘效率等级 mining_efficiency，默认为 None（所有参数为 0）。

**返回值**：float，需要消耗的时间。

**备注**

- 挖掘参数 miningArgs。

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| haste | int | 急迫等级，模拟玩家获得急迫状态效果 |
| conduit_power | int | 潮涌能量等级，模拟玩家获得潮涌能量状态效果 |
| mining_fatigue | int | 挖掘疲劳等级，模拟玩家获得挖掘疲劳状态效果 |
| mining_efficiency | int | 挖掘效率等级，模拟工具获得效率附魔 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
args = {
    "haste": 1,
    "conduit_power": 1,
    "mining_fatigue": 1,
    "mining_efficiency": 1
}
comp.GetDestroyTotalTime("minecraft:diamond_block", "minecraft:stone_pickaxe", args)
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取使用物品破坏方块需要的时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDestroyTotalTime(blockName: str, itemName: str, miningArgs: Dict[str, Any]) -> float
```

- blockName: str，方块标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0。
- itemName: str，物品标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0，默认为 None（不使用物品）。
- miningArgs: Dict[str, Any]，挖掘参数，包含以下字段：急迫等级 haste、潮涌能量等级 conduit_power、挖掘疲劳 mining_fatigue 以及挖掘效率等级 mining_efficiency，默认为 None（所有参数为 0）。

**返回值**：float，需要消耗的时间。

**备注**

- 挖掘参数 miningArgs。

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| haste | int | 急迫等级，模拟玩家获得急迫状态效果 |
| conduit_power | int | 潮涌能量等级，模拟玩家获得潮涌能量状态效果 |
| mining_fatigue | int | 挖掘疲劳等级，模拟玩家获得挖掘疲劳状态效果 |
| mining_efficiency | int | 挖掘效率等级，模拟工具获得效率附魔 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
args = {
    "haste": 1,
    "conduit_power": 1,
    "mining_fatigue": 1,
    "mining_efficiency": 1
}
comp.GetDestroyTotalTime("minecraft:diamond_block", "minecraft:stone_pickaxe", args)
```

</TabItem>
</Tabs>

---

### GetLiquidBlock

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取某个位置的方块所含流体的信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLiquidBlock(pos: Tuple[int, int, int], dimensionId: int) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，方块位置。
- dimensionId: int，方块所在维度。

**返回值**：Dict[str, Any]，[方块信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#方块信息字典)。

**备注**

- 已经加载的地形才能获取方块信息，支持获取对应维度的常加载区块内方块信息。
- 对于不含水或者不是流体的方块，则返回 None。对于一个含水的方块，如含水的橡木栅栏，GetLiquidBlock 会返回其含有的流体的信息(包括自定义流体)，[GetBlockNew](/docs/docs/scripts/modapi/world/block#getblocknew) 则会返回橡木栅栏的信息。而对于一般的水方块(包括自定义流体)，GetLiquidBlock 和 [GetBlockNew](/docs/docs/scripts/modapi/world/block#getblocknew) 则都会返回水的信息(包括自定义流体)。因此可以用 GetLiquidBlock 和 [GetBlockNew](/docs/docs/scripts/modapi/world/block#getblocknew) 判断某个方块是否流体。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
liquidBlockDict = comp.GetLiquidBlock((0, 5, 0), 0)
```

</TabItem>
</Tabs>

---

### GetTopBlockHeight

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取某一位置最高的非空气方块的高度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTopBlockHeight(pos: Tuple[int, int], dimension: int = 0) -> Optional[int]
```

- pos: Tuple[int, int]，x 轴与 z 轴位置。
- dimension: int，维度 id，默认为 0，可在获取常加载区块内最高非空气方块高度。

**返回值**：Optional[int]，高度。若区块未加载返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
height = comp.GetTopBlockHeight((5, 5), 0)
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取当前维度某一位置最高的非空气方块的高度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTopBlockHeight(pos: Tuple[int, int]) -> Optional[int]
```

- pos: Tuple[int, int]，x 轴与 z 轴位置。

**返回值**：Optional[int]，高度。若区块未加载返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
height = comp.GetTopBlockHeight((5, 5))
```

</TabItem>
</Tabs>

---

### SetBlockNew

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockState(levelId)`

设置某一位置的方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockNew(
    pos: Tuple[int, int, int],
    blockDict: Dict[str, Any],
    oldBlockHandling: int = 0,
    dimensionId: int,
    isLegacy: bool = False,
    updateNeighbors: bool,
) -> bool
```

- pos: Tuple[int, int, int]，方块位置。
- blockDict: Dict[str, Any]，[方块信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#方块信息字典)。
- oldBlockHandling: int，0：替换，1：销毁，2：保留，默认为 0。
- dimensionId: int，方块所在维度，必需参数。
- isLegacy: bool，是否设置为传统的 aux，建议设置为 True，即 aux 对应的 state 不随着版本迭代而变化。默认为 False。
- updateNeighbors: bool，是否给相邻的方块触发[方块更新](https://zh.minecraft.wiki/w/%E6%96%B9%E5%9D%97%E6%9B%B4%E6%96%B0)以及 [BlockNeighborChangedServerEvent](/docs/docs/scripts/modapi/events/block#blockneighborchangedserverevent) 事件。默认为 True 触发。若选择不触发可节省约 30%的性能消耗。

**返回值**：bool，方块是否发生了改变，是则返回 True，否则返回 False。

**备注**

- 已经加载的地形才能设置方块，支持在对应维度的常加载区块内设置方块。
- 若设置前后为同一个方块（方块名和附加值都相同），则接口返回 False。
- 若设置前后方块实体类型相同时（方块名相同），箱子、熔炉等容器内的物品将被清空（尽管前后附加值也相同时接口会返回 False），而告示牌、物品展示框、自定义方块实体的内容会被保留（如果希望清空，可以先设置为空气再设置相应方块）。
- 随着版本更新，aux 值对应的方块 state 会发生改变，对于有多种状态的方块，aux 计算方式比较复杂，推荐先通过 [GetBlockAuxValueFromStates](/docs/docs/scripts/modapi/block/state#getblockauxvaluefromstates) 获取传统 aux 值再进行设置。
- 若调用 SetBlockNew 接口后立即调用其它会影响客户端表现的服务端接口，并且这个表现和此方块有关系（比如使用 SetBlockNew 放置一个箱子，并立即调用 [PlayerUseItemToPos](/docs/docs/scripts/modapi/player/behavior#playeruseitemtopos) 接口打开这个箱子），可能会出现异常表现，如有类似需求，建议在下一帧对方块进行操作。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi

comp = serverApi.GetEngineCompFactory().CreateBlockState(levelId)
# GetBlockAuxValueFromStates 只需要调用一次，得到的auxValue可以缓存以来以供后续使用
auxValue = comp.GetBlockAuxValueFromStates("minecraft:wool", { 'color': 'orange' })

blockDict = {
    'name': 'minecraft:wool',
    'aux': auxValue
}
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.SetBlockNew((0, 5, 0), blockDict, 0, 0, True)
# updateNeighbors置为False，则不会触发相邻方块的更新。例如将耕地替换成泥土，其上方的小麦不会掉落。
comp.SetBlockNew((0, 6, 0), blockDict, 0, 0, True, False)
```

</TabItem>
</Tabs>

---

### SetJigsawBlock

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockState(serverApi.GetLevelId())`

在某一位置放置拼图方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetJigsawBlock(pos: Tuple[int, int, int], blockDict: Dict[str, Any], dimensionId: int) -> bool
```

- pos: Tuple[int, int, int]，方块位置。
- blockDict: Dict[str, Any]，拼图方块的方块信息字典。
- dimensionId: int，方块所在维度，必需参数。

**返回值**：bool，设置结果。

**备注**

- 已经加载的地形才能设置方块，支持在对应维度的常加载区块内设置方块。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi

comp = serverApi.GetEngineCompFactory().CreateBlockState(serverApi.GetLevelId())
# GetBlockAuxValueFromStates 只需要调用一次，得到的auxValue可以缓存以来以供后续使用
auxValue = comp.GetBlockAuxValueFromStates("minecraft:jigsaw", { "facing_direction":1 })

print auxValue
blockDict = {
    'name': 'minecraft:jigsaw',
    'aux': auxValue,
    'jigsaw_name':"minecraft:empty",
    'jigsaw_target_name' : "minecraft:empty",
    'jigsaw_target_pool' : "minecraft:empty",
    'jigsaw_final_block' : 'minecraft:empty',
    'jigsaw_join_type' : 0 #"jigsaw_join_type"的值只能为0或1(0表示设置拼图方块的接点类型为"可滚动"；1表示设置拼图方块的接点类型为"一致")
}
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(serverApi.GetLevelId())
print comp.SetJigsawBlock((0, 100, 0), blockDict, 0)
```

</TabItem>
</Tabs>

---

### SetLiquidBlock

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

设置某一位置的方块的 extraBlock，可在此设置方块含水等。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLiquidBlock(pos: Tuple[int, int, int], blockDict: Dict[str, Any], dimensionId: int) -> bool
```

- pos: Tuple[int, int, int]，方块位置。
- blockDict: Dict[str, Any]，流体方块的[方块信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#方块信息字典)。
- dimensionId: int，方块所在维度，必需参数。

**返回值**：bool，设置结果。

**备注**

- 已经加载的地形才能设置方块，支持在对应维度的常加载区块内设置方块。
- dimensionId 需要是 playerId 对应玩家所在的维度；如果 dimensionId 是-1 则默认使用 playerId 对应玩家所在的维度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
blockDict = {
    'name': 'minecraft:water',
    'aux': 5
}
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)
comp.SetLiquidBlock((0, 5, 0), blockDict, 0)
```

</TabItem>
</Tabs>

---

### SetSnowBlock

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

设置某一位置的方块含雪。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSnowBlock(pos: Tuple[int, int, int], dimensionId: int, height: int = 1) -> bool
```

- pos: Tuple[int, int, int]，方块位置。
- dimensionId: int，方块所在维度，必需参数。
- height: int，雪块的高度，默认是 1。

**返回值**：bool，设置结果。

**备注**

- 已经加载的地形才能设置方块，支持在对应维度的常加载区块内设置方块。
- dimensionId 需要是 playerId 对应玩家所在的维度；如果 dimensionId 是-1 则默认使用 playerId 对应玩家所在的维度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)
comp.SetSnowBlock((0, 5, 0), 0, 1)
```

</TabItem>
</Tabs>

---
