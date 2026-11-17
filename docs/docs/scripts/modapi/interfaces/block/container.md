---
sidebar_position: 8
---

# 容器

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录容器相关的接口，共 17 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/fangkuai/rongqi.html"/>

---

### GetBrewingStandSlotItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取酿造台指定槽位物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBrewingStandSlotItem(
    slot: int,
    pos: Tuple[int, int, int],
    dimensionId: int,
) -> Dict[str, Any]
```

- slot: int，槽位，详见枚举[酿造台槽位](https://mc.163.com/newdev/docs/api/meijuzhi/BrewingStandSlotType.html)。
- pos: Tuple[int, int, int]，容器位置。
- dimensionId: int，方块所在维度。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetBrewingStandSlotItem(serverApi.GetMinecraftEnum().BrewingStandSlotType.SLOT_FUEL, (x, y, z), 0)
```

</TabItem>
</Tabs>

---

### GetChestBoxSize

<Server/> ChestContainerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChestBlock(levelId)`

获取箱子容量大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChestBoxSize(
    playerId: None,
    pos: Tuple[int, int, int],
    dimensionId: int,
) -> int
```

- playerId: None，该参数已废弃。
- pos: Tuple[int, int, int]，箱子位置。
- dimensionId: int，箱子所在维度，可获取对应维度的常加载区块内箱子容量。

**返回值**：int，箱子大小，错误值-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChestBlock(levelId)
comp.GetChestBoxSize(None, (x, y, z), 0)
```

</TabItem>
</Tabs>

---

### GetChestPairedPosition

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

获取与箱子 A 合并成一个大箱子的箱子 B 的坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChestPairedPosition(
    pos: Tuple[int, int, int],
    dimensionId: int,
) -> Optional[Tuple[int, int, int]]
```

- pos: Tuple[int, int, int]，箱子 A 的位置坐标。
- dimensionId: int，箱子 A 所在维度。

**返回值**：Optional[Tuple[int, int, int]]，箱子 B 的位置坐标，假如输入的箱子 A 坐标上的方块不是箱子类方块或者没有和其他箱子方块组合成一个大箱子，就会返回 None。

**备注**

- 如果 dimensionId 不传或传入负值，该接口使用创建组件时的 playerId 来定位具体维度，且仅可获取玩家附近的方块，若方块位置离玩家太远，可能无法获取到正确的返回信息。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)
pos = (-1, 4, 34)
dimensionId = 0
otherPos = comp.GetChestPairedPosition(pos, dimensionId)
if otherPos:
    print "GetChestPairedPosition success pos=%s otherPos=%s" % (str(pos), str(otherPos))
else:
    print "GetChestPairedPosition failed pos=%s" % (str(pos), )
```

</TabItem>
</Tabs>

---

### GetContainerItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

获取容器内的物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetContainerItem(
    pos: Tuple[int, int, int],
    slotPos: int,
    dimensionId: int,
    getUserData: bool = False,
) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，容器位置。
- slotPos: int，容器槽位。
- dimensionId: int，方块所在维度。
- getUserData: bool，是否获取 userData，默认为 False。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

**备注**

- 容器的具体类型包括：箱子，陷阱箱，潜影盒，漏斗，木桶，投掷器，发射器。
- 此接口不支持末影箱。对应的末影箱接口请参考 [GetEnderChestItem](/docs/docs/scripts/modapi/interfaces/block/container#getenderchestitem)。
- 3.8 新增的收纳袋的 userdata 与箱子类的 Items 列表不同，它的格式为 \{'bundle_weight': \{'type': 3, 'value': 7\}, 'storage_item_component_content': []\} 其中 bundle_weight 表示收纳袋当前的重量值，示例表示它里面有 7 个普通可堆叠物品，而 storage_item_component_content 与箱子的 Items 类似，但即使槽位为空，它也包含 64 个元素。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetContainerItem((x,y,z), 0, 2)
```

</TabItem>
</Tabs>

---

### GetContainerSize

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

获取容器容量大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetContainerSize(pos: Tuple[int, int, int], dimensionId: int) -> int
```

- pos: Tuple[int, int, int]，箱子位置。
- dimensionId: int，容器所在维度。

**返回值**：int，箱子大小,错误值-1。

**备注**

- 此接口不支持末影箱，因为末影箱的 size 固定为 27。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetContainerSize((x, y, z), 0)
```

</TabItem>
</Tabs>

---

### GetEnderChestItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取末影箱内的物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEnderChestItem(
    playerId: str,
    slotPos: int,
    getUserData: bool = False,
) -> Dict[str, Any]
```

- playerId: str，玩家 id。
- slotPos: int，容器槽位。
- getUserData: bool，是否获取 userData，默认为 False。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

**备注**

- 3.8 新增的收纳袋的 userdata 与箱子类的 Items 列表不同，它的格式为 \{'bundle_weight': \{'type': 3, 'value': 7\}, 'storage_item_component_content': []\} 其中 bundle_weight 表示收纳袋当前的重量值，示例表示它里面有 7 个普通可堆叠物品，而 storage_item_component_content 与箱子的 Items 类似，但即使槽位为空，它也包含 64 个元素。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetEnderChestItem(playerId, 0)
```

</TabItem>
</Tabs>

---

### GetInputSlotItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

获取熔炉输入栏物品, 支持使用下面参数清空特定槽位:itemDict 为空，为\{\}, 或 itemName 为 minecraft:air，或者 count 为 0。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetInputSlotItem(pos: Tuple[int, int, int], dimensionId: int) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，容器位置。
- dimensionId: int，方块所在维度。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
itemName = comp.GetInputSlotItem((x, y, z), 1)
```

</TabItem>
</Tabs>

---

### GetOpenContainerItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取开放容器的物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOpenContainerItem(
    playerId: str,
    containerId: int,
    getUserData: bool = False,
) -> Dict[str, Any]
```

- playerId: str，玩家 id。
- containerId: int，[开放容器 Id 枚举](/docs/docs/scripts/modapi/enums#opencontainerid)。
- getUserData: bool，是否获取 userData，默认为 False。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

**备注**

- 需要在事件 [CraftItemOutputChangeServerEvent](/docs/docs/scripts/modapi/events/item#craftitemoutputchangeserverevent) 的监听函数里面才能获取正确的结果。
- 开放容器为临时容器，用来保存交互过程中的物品，如铁砧输入位，砂轮输入位。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetOpenContainerItem(playerId,serverApi.GetMinecraftEnum().OpenContainerId.AnvilInputContainer, True)
```

</TabItem>
</Tabs>

---

### GetOutputSlotItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

获取熔炉输出栏物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOutputSlotItem(pos: Tuple[int, int, int], dimensionId: int) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，容器位置。
- dimensionId: int，方块所在维度。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
itemName = comp.GetOutputSlotItem((x, y, z), 1)
```

</TabItem>
</Tabs>

---

### GetPlayerUIItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取合成容器的物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerUIItem(
    playerId: str,
    slot: int,
    getUserData: bool = False,
    isNeteaseUI: bool,
) -> Dict[str, Any]
```

- playerId: str，玩家 id。
- slot: int，容器槽位。在 isNeteaseUI 为 True 时代表 netease_ui_container 中对应槽位；isNeteaseUI 为 False 时含义见：[容器类型枚举](/docs/docs/scripts/modapi/enums#playeruislot)。
- getUserData: bool，是否获取 userData，默认为 False。
- isNeteaseUI: bool，默认为 false，true 时获取 netease_ui_container 的物品。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

**备注**

- 合成容器包括工作台、铁砧、附魔台、织布机、砂轮、切石机、制图台、锻造台。
- 所有合成容器槽位共享，不会根据不同容器重新排列。网易 ui 容器独立于原版合成容器，不同自定义容器中的 netease_ui_container 共享槽位。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetPlayerUIItem(playerId, slot, True)
```

</TabItem>
</Tabs>

---

### SetBrewingStandSlotItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置酿造台指定槽位物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBrewingStandSlotItem(
    itemDict: Dict[str, Any],
    slot: int,
    pos: Tuple[int, int, int],
    dimensionId: int,
) -> bool
```

- itemDict: Dict[str, Any]，物品字典信息, 包含三种 key: itemName, auxValue, count。
- slot: int，槽位，详见枚举[酿造台槽位](https://mc.163.com/newdev/docs/api/meijuzhi/BrewingStandSlotType.html)。
- pos: Tuple[int, int, int]，容器位置。
- dimensionId: int，方块所在维度。

**返回值**：bool，是否成功设置。

**备注**

- 该接口仅可设置酿造台支持放入的物品。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = {"itemName": "minecraft:blaze_powder", "auxValue": 0, "count": 64}
comp.SetBrewingStandSlotItem(itemDict, serverApi.GetMinecraftEnum().BrewingStandSlotType.SLOT_FUEL, (x, y, z),  0)
```

</TabItem>
</Tabs>

---

### SetChestBoxItemExchange

<Server/> ChestContainerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChestBlock(playerId)`

交换箱子里物品的槽位。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetChestBoxItemExchange(
    playerId: str,
    pos: Tuple[int, int, int],
    slotPos1: int,
    slotPos2: int,
) -> bool
```

- playerId: str，玩家 id。
- pos: Tuple[int, int, int]，箱子位置。
- slotPos1: int，箱子槽位 1。
- slotPos2: int，箱子槽位 2。

**返回值**：bool，设置成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChestBlock(playerId)
comp.SetChestBoxItemExchange(playerId, (x,y,z), 0, 1)
```

</TabItem>
</Tabs>

---

### SetChestBoxItemNum

<Server/> ChestContainerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateChestBlock(levelId)`

设置箱子槽位物品数目。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetChestBoxItemNum(
    playerId: None,
    pos: Tuple[int, int, int],
    slotPos: int,
    num: int,
    dimensionId: int,
) -> bool
```

- playerId: None，该参数已废弃。
- pos: Tuple[int, int, int]，箱子位置。
- slotPos: int，箱子槽位。
- num: int，物品数目。
- dimensionId: int，方块所在维度，可在对应维度的常加载区块设置方块。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChestBlock(levelId)
comp.SetChestBoxItemNum(None, (x,y,z), 0, 10, 0)
```

</TabItem>
</Tabs>

---

### SetInputSlotItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置熔炉输入栏物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetInputSlotItem(
    itemDict: Dict[str, Any],
    pos: Tuple[int, int, int],
    dimensionId: int,
) -> bool
```

- itemDict: Dict[str, Any]，物品字典信息, 包含三种 key: itemName, auxValue, count。
- pos: Tuple[int, int, int]，容器位置。
- dimensionId: int，方块所在维度。

**返回值**：bool，是否成功设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.SetInputSlotItem({"itemName": "minecraft:iron_ore", "auxValue": 0, "count": 1}, (x, y, z), 1)
```

</TabItem>
</Tabs>

---

### SetPlayerUIItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置合成容器的物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerUIItem(
    playerId: str,
    slot: int,
    itemDict: Dict[str, Any],
    needBack: bool = True,
    isNeteaseUI: bool,
) -> bool
```

- playerId: str，玩家 id。
- slot: int，容器槽位。在 isNeteaseUI 为 True 时代表 netease_ui_container 中对应槽位；isNeteaseUI 为 False 时含义见：[容器类型枚举](/docs/docs/scripts/modapi/enums#playeruislot)。
- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。
- needBack: bool，是否将容器槽位的已有物品放回至玩家背包中，默认为 True。设置为 False 时，则会直接用 itemDict 中的物品覆盖容器槽位的已有物品。
- isNeteaseUI: bool，默认为 false，true 时设置 netease_ui_container 的物品。

**返回值**：bool，设置结果。

**备注**

- 合成容器包括工作台、铁砧、附魔台、织布机、砂轮、切石机、制图台、锻造台。
- 如果原槽位有物品，则会将原有物品放入玩家背包。如果玩家背包已满，则会在世界中玩家当前的位置生成对应的物品掉落物。
- 注意，所有合成容器槽位共享，不会根据不同容器重新排列，没有打开容器或者打开了别的容器，该接口会返回 False。
- 如果设置的是 netease_ui_container，即使没有打开容器也能设置成功，所有 netease_ui_container 槽位共享。
- 下面情况视为清空特定槽位:itemDict 为 None，为\{\}, 或 itemName 为 minecraft:air，或者 count 为 0，同时 needBack 参数为 False。
- 由于创造输出物品生成位比较特殊，该接口已经屏蔽了 slot = 50 的情况，即无法设置创造输出位的物品。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = {
    'itemName': 'minecraft:bow',
    'count': 1, # 可填入0达到删除某槽位物品的效果
    'auxValue': 0,
}
comp.SetPlayerUIItem(playerId, slot, itemDict)
# 也可以直接使用 comp.SetPlayerUIItem(playerId, slot, None, False) 来清空物品
```

</TabItem>
</Tabs>

---

### SpawnItemToContainer

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

生成物品到容器方块的物品栏。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SpawnItemToContainer(
    itemDict: Dict[str, Any],
    slotPos: int,
    blockPos: Tuple[int, int, int],
    dimensionId: int,
) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- slotPos: int，箱子槽位。
- blockPos: Tuple[int, int, int]，箱子位置。
- dimensionId: int，容器所在维度。

**返回值**：bool，设置结果。

**备注**

- 此接口不支持末影箱。对应的末影箱接口请参考 [SpawnItemToEnderChest](/docs/docs/scripts/modapi/interfaces/block/container#spawnitemtoenderchest)。
- 下面情况视为清空特定槽位:itemDict 为空，为\{\}, 或 itemName 为 minecraft:air，或者 count 为 0。
- 目前该接口支持的容器类型方块：箱子、潜影盒、漏斗、木桶、投掷器、发射器、自定义容器。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
itemDict = {
    'itemName': 'minecraft:bow',
    'count': 1, # 可填入0达到删除某槽位物品的效果
    'enchantData': [(serverApi.GetMinecraftEnum().EnchantType.BowDamage, 1),],
    'auxValue': 0,
    'customTips':'§c new item §r',
    'extraId': 'abc',
    'userData': { },
}
# 生成物品到容器的0号槽位，容器位于维度0，坐标为(x,y,z)
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
comp.SpawnItemToContainer(itemDict, 0, (x,y,z), 0)
```

</TabItem>
</Tabs>

---

### SpawnItemToEnderChest

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

生成物品到末影箱。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SpawnItemToEnderChest(itemDict: Dict[str, Any], slotPos: int) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- slotPos: int，末影箱槽位。

**返回值**：bool，设置结果。

**备注**

- 下面情况视为清空特定槽位:itemDict 为空，为\{\}, 或 itemName 为 minecraft:air，或者 count 为 0。

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
    'userData': { },
}
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.SpawnItemToEnderChest(itemDict, 0)
```

</TabItem>
</Tabs>

---
