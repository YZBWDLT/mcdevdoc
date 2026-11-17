---
sidebar_position: 9
---

# 属性

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录属性相关的接口，共 5 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/fangkuai/shuxing.html"/>

---

### GetBlockBasicInfo

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取方块基本信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockBasicInfo(blockName: str) -> Dict[str, Any]
```

- blockName: str，方块 identifier。

**返回值**：Dict[str, Any]，[方块基本信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#方块基本信息字典#方块基本信息字典)。

**备注**

- 基本信息字典中部分字段只在自定义方块时加上指定组件才会取到数据，具体见方块基本信息字典。
- 历史原因，方块基本信息字典中的 tier 中的 digger 值类型为 int。shovel(铲)为 0，pickaxe(镐)为 1，hatchet(斧)为 2，hoe(锄)为 3。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
blockDict = comp.GetBlockBasicInfo("minecraft:stone")
```

</TabItem>
</Tabs>

---

### GetBlockTags

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取方块在 tags:*中定义的 tags 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockTags(blockName: str) -> List[str]
```

- blockName: str，方块 identifierge。

**返回值**：List[str]，方块 tags 列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.GetBlockTags("minecraft:stone")
```

</TabItem>
</Tabs>

---

### GetLoadBlocks

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取已经加载的方块 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLoadBlocks() -> List[Any]
```


**返回值**：List[Any]，方块 id 列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
suc = comp.GetLoadBlocks()
```

</TabItem>
</Tabs>

---

### SetBlockBasicInfo

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

设置方块基本信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockBasicInfo(
    blockName: str,
    infoDict: Dict[str, Any],
    auxValue: int = 0,
) -> bool
```

- blockName: str，方块 identifier。
- infoDict: Dict[str, Any]，方块的[方块基本信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#方块基本信息字典#方块基本信息字典)。
- auxValue: int，方块附加值，默认是 0。

**返回值**：bool，设置是否成功。

**备注**

- 目前本接口支持的属性有 destroyTime:硬度；explosionResistance:爆炸抗性；loot:掉落属性；tier:挖掘属性；solid:是否实心；当方块 json 配置里有对应的组件才能修改。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
blockDict = comp.SetBlockBasicInfo("custom:custom_block", {"destroyTime":1,
"loot":"loot_tables/block/custom_block_drop.json",
"solid":False,
"tier":{"level":3}})
```

</TabItem>
</Tabs>

---

### SetChestLootTable

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

设置箱子战利品表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetChestLootTable(
    blockPos: Tuple[int, int, int],
    dimensionId: int,
    lootTable: str,
    isIgnoreSpilt: bool = False,
) -> bool
```

- blockPos: Tuple[int, int, int]，方块的坐标。
- dimensionId: int，方块所在的维度。
- lootTable: str，战利品表位置字符串，如"loot_tables/entities/zombie.json"。
- isIgnoreSpilt: bool，是否屏蔽随机分堆，默认为 False。

**返回值**：bool，是否设置成功。

**备注**

- 仅支持未打开过的箱子，若箱子已经打开过，则设置失败。
- 维度需要已经加载。如有玩家在相应维度上，则算维度已加载，若完全没玩家在对应维度上，则维度未加载。
- 末影箱仍是箱子的一种，但是末影箱本身并不直接存储物品。因此虽然设置战利品表返回成功，实际在打开末影箱时，并不会用到战利品表！

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
suc = comp.SetChestLootTable(blockPos, dimensionId, lootTable)
```

</TabItem>
</Tabs>

---
