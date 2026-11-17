---
sidebar_position: 1
---

# 背包

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录背包相关的接口，共 21 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wanjia/beibao.html"/>

---

### AddEnchantToInvItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

给物品栏的物品添加附魔信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEnchantToInvItem(slotPos: int, enchantType: int, level: int) -> bool
```

- slotPos: int，物品栏槽位。
- enchantType: int，附魔类型，可以查看枚举值文档。
- level: int，附魔等级。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.AddEnchantToInvItem(0, serverApi.GetMinecraftEnum().EnchantType.BowDamage, 2)
```

</TabItem>
</Tabs>

---

### AddModEnchantToInvItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

给物品栏中物品添加自定义附魔信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddModEnchantToInvItem(slotPos: int, modEnchantId: str, level: int) -> bool
```

- slotPos: int，物品栏槽位。
- modEnchantId: str，自定义附魔 identifier。
- level: int，自定义附魔等级。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.AddModEnchantToInvItem(0, "customenchant", 2)
```

</TabItem>
</Tabs>

---

### ChangePlayerItemTipsAndExtraId

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

修改玩家物品的自定义 tips 和自定义标识符。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangePlayerItemTipsAndExtraId(
    posType: int,
    slotPos: int,
    customTips: str,
    extraId: str,
) -> bool
```

- posType: int，[ItemPosType 枚举](/docs/docs/scripts/modapi/enums#itempostype)。
- slotPos: int，物品栏槽位。
- customTips: str，物品的自定义 tips。
- extraId: str，物品的自定义标识符。

**返回值**：bool，设置结果。

**备注**

- 该接口不支持设置盔甲栏。
- 建议使用 [GetEntityItem](/docs/docs/scripts/modapi/interfaces/entity/container#getentityitem)，[SetEntityItem](/docs/docs/scripts/modapi/interfaces/entity/container#setentityitem) 代替该接口：import mod.server.extraServerApi as serverApi comp = serverApi.[GetEngineCompFactory](/docs/docs/scripts/modapi/interfaces/general/component#getenginecompfactory)().CreateItem(playerId) itemDict = comp.[GetEntityItem](/docs/docs/scripts/modapi/interfaces/entity/container#getentityitem)(serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().ItemPosType.ARMOR, 0, True) itemDict['customTips'] = 'xxx' itemDict['extraId'] = 'yyy' comp.[SetEntityItem](/docs/docs/scripts/modapi/interfaces/entity/container#setentityitem)(serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().ItemPosType.ARMOR, itemDict, 0)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.ChangePlayerItemTipsAndExtraId(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0, "自定义tips", "自定义标识符")
```

</TabItem>
</Tabs>

---

### ChangeSelectSlot

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家当前选中快捷栏物品的 index。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeSelectSlot(slot: int) -> bool
```

- slot: int，快捷栏物品的 index，从 0 开始，最大为 8。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
success = comp.ChangeSelectSlot(0)
```

</TabItem>
</Tabs>

---

### GetCarriedItem

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(entityId)`

获取右手物品的信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCarriedItem(getUserData: bool = False) -> Dict[str, Any]
```

- getUserData: bool，是否获取物品的 userData，默认为 False。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

**备注**

- 3.8 新增的收纳袋的 userdata 与箱子类的 Items 列表不同，它的格式为 \{'bundle_weight': \{'type': 3, 'value': 7\}, 'storage_item_component_content': []\} 其中 bundle_weight 表示收纳袋当前的重量值，示例表示它里面有 7 个普通可堆叠物品，而 storage_item_component_content 与箱子的 Items 类似，但即使槽位为空，它也包含 64 个元素。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(entityId)
carriedData = comp.GetCarriedItem()
```

</TabItem>
</Tabs>

---

### GetInvItemEnchantData

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取物品栏的物品附魔信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetInvItemEnchantData(slotPos: int) -> List[Tuple[int, int]]
```

- slotPos: int，物品栏槽位。

**返回值**：List[Tuple[int, int]]，list 中每个 tuple 由附魔类型([EnchantType 枚举](/docs/docs/scripts/modapi/enums#enchanttype))和附魔等级组成。没有附魔则为空 list。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetInvItemEnchantData(0)
```

</TabItem>
</Tabs>

---

### GetInvItemModEnchantData

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取物品栏的物品自定义附魔信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetInvItemModEnchantData(slotPos: int) -> List[Tuple[str, int]]
```

- slotPos: int，物品栏槽位。

**返回值**：List[Tuple[str, int]]，list 中每个 tuple 由自定义附魔 id 和附魔等级组成，没有自定义附魔则为空 list。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetInvItemModEnchantData(0)
```

</TabItem>
</Tabs>

---

### GetOffhandItem

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(entityId)`

获取左手物品的信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOffhandItem(getUserData: bool = False) -> Dict[str, Any]
```

- getUserData: bool，是否获取物品的 userData，默认为 False。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(entityId)
offhandData = comp.GetOffhandItem()
```

</TabItem>
</Tabs>

---

### GetPlayerAllItems

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取玩家指定的槽位的批量物品信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerAllItems(
    posType: int,
    getUserData: bool = False,
) -> List[Dict[str, Any]]
```

- posType: int，[ItemPosType 枚举](/docs/docs/scripts/modapi/enums#itempostype)。
- getUserData: bool，是否获取 userData，默认为 False。

**返回值**：List[Dict[str, Any]]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)的数组，没有物品的位置为 None。

**备注**

- 3.8 新增的收纳袋的 userdata 与箱子类的 Items 列表不同，它的格式为 \{'bundle_weight': \{'type': 3, 'value': 7\}, 'storage_item_component_content': []\} 其中 bundle_weight 表示收纳袋当前的重量值，示例表示它里面有 7 个普通可堆叠物品，而 storage_item_component_content 与箱子的 Items 类似，但即使槽位为空，它也包含 64 个元素。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetPlayerAllItems(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY)
```

</TabItem>
</Tabs>

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(playerId)`

获取玩家指定的槽位的批量物品信息，支持获取盔甲栏，副手以及主手物品，背包物品仅支持本地玩家。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerAllItems(
    posType: int,
    getUserData: bool = False,
) -> List[Dict[str, Any]]
```

- posType: int，[ItemPosType 枚举](/docs/docs/scripts/modapi/enums#itempostype)。
- getUserData: bool，是否获取 userData，默认为 False。

**返回值**：List[Dict[str, Any]]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)的数组，没有物品的位置为 None。

**备注**

- 3.8 新增的收纳袋的 userdata 与箱子类的 Items 列表不同，它的格式为 \{'bundle_weight': \{'type': 3, 'value': 7\}, 'storage_item_component_content': []\} 其中 bundle_weight 表示收纳袋当前的重量值，示例表示它里面有 7 个普通可堆叠物品，而 storage_item_component_content 与箱子的 Items 类似，但即使槽位为空，它也包含 64 个元素。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetPlayerAllItems(clientApi.GetMinecraftEnum().ItemPosType.INVENTORY)
```

</TabItem>
</Tabs>

---

### GetPlayerFishHookEntity

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取玩家钓鱼时候的鱼漂实体 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerFishHookEntity() -> List[str]
```


**返回值**：List[str]，玩家正在钓鱼时候生成的鱼漂实体 id，如果玩家未在钓鱼则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
fishHookEntityId = comp.GetPlayerFishHookEntity()
```

</TabItem>
</Tabs>

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(playerId)`

获取玩家钓鱼时候的鱼漂实体 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerFishHookEntity() -> List[str]
```


**返回值**：List[str]，玩家正在钓鱼时候生成的鱼漂实体 id，如果玩家未在钓鱼则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(playerId)
fishHookEntityId = comp.GetPlayerFishHookEntity()
```

</TabItem>
</Tabs>

---

### GetPlayerFishItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取玩家钓鱼时候的鱼竿物品字典。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerFishItem(getUserData: bool = False) -> Dict[str, Any]
```

- getUserData: bool，是否获取物品的 userData，默认为 False。

**返回值**：Dict[str, Any]，玩家正在钓鱼时候使用的鱼竿物品字典，如果玩家未在钓鱼则返回 None。

**备注**

- 返回的物品字典包含 userData 信息(如果 getUserData 为 True, 会包含 userData 信息)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
fishItem = comp.GetPlayerFishItem()
```

</TabItem>
</Tabs>

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(playerId)`

获取玩家钓鱼时候的鱼竿物品字典。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerFishItem(getUserData: bool = False) -> Dict[str, Any]
```

- getUserData: bool，是否获取物品的 userData，默认为 False。

**返回值**：Dict[str, Any]，玩家正在钓鱼时候使用的鱼竿物品字典，如果玩家未在钓鱼则返回 None。

**备注**

- 返回的物品字典(如果 getUserData 为 True, 会包含 userData 信息)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(playerId)
fishItem = comp.GetPlayerFishItem()
```

</TabItem>
</Tabs>

---

### GetPlayerItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取玩家物品，支持获取背包，盔甲栏，副手以及主手物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerItem(
    posType: int,
    slotPos: int,
    getUserData: bool = False,
) -> Dict[str, Any]
```

- posType: int，[ItemPosType 枚举](/docs/docs/scripts/modapi/enums#itempostype)。
- slotPos: int，槽位，获取 INVENTORY 及 ARMOR 时需要设置，其他情况写 0 即可。
- getUserData: bool，是否获取 userData，默认为 False。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

**备注**

- 左右手及装备可以替代 [GetEntityItem](/docs/docs/scripts/modapi/interfaces/entity/container#getentityitem) 接口获取生物的物品，但背包不行。
- 3.8 新增的收纳袋的 userdata 与箱子类的 Items 列表不同，它的格式为 \{'bundle_weight': \{'type': 3, 'value': 7\}, 'storage_item_component_content': []\} 其中 bundle_weight 表示收纳袋当前的重量值，示例表示它里面有 7 个普通可堆叠物品，而 storage_item_component_content 与箱子的 Items 类似，但即使槽位为空，它也包含 64 个元素。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetPlayerItem(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0)
```

</TabItem>
</Tabs>

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(playerId)`

获取玩家物品，支持获取背包（本地玩家），盔甲栏，副手以及主手物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerItem(
    posType: int,
    slotPos: int,
    getUserData: bool = False,
) -> Dict[str, Any]
```

- posType: int，[ItemPosType 枚举](/docs/docs/scripts/modapi/enums#itempostype)。
- slotPos: int，槽位，获取 INVENTORY 及 ARMOR 时需要设置，其他情况写 0 即可。
- getUserData: bool，是否获取 userData，默认为 False。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，没有物品则返回 None。

**备注**

- 客户端不支持获取其他玩家的背包物品。
- 3.8 新增的收纳袋的 userdata 与箱子类的 Items 列表不同，它的格式为 \{'bundle_weight': \{'type': 3, 'value': 7\}, 'storage_item_component_content': []\} 其中 bundle_weight 表示收纳袋当前的重量值，示例表示它里面有 7 个普通可堆叠物品，而 storage_item_component_content 与箱子的 Items 类似，但即使槽位为空，它也包含 64 个元素。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetPlayerItem(clientApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0)
```

</TabItem>
</Tabs>

---

### GetSelectSlotId

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取玩家当前选中槽位。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSelectSlotId() -> int
```


**返回值**：int，当前槽位，错误时返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetSelectSlotId()
```

</TabItem>
</Tabs>

---

### GetSlotId

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(entityId)`

获取当前手持的快捷栏的槽 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSlotId() -> int
```


**返回值**：int，0 到 8。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(entityId)
slotId = comp.GetSlotId()
```

</TabItem>
</Tabs>

---

### RemoveEnchantToInvItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

给物品栏的物品移除附魔信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveEnchantToInvItem(slotPos: int, enchantType: int) -> bool
```

- slotPos: int，物品栏槽位。
- enchantType: int，附魔类型，可以查看枚举值文档。

**返回值**：bool，移除结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.RemoveEnchantToInvItem(0, serverApi.GetMinecraftEnum().EnchantType.BowDamage)
```

</TabItem>
</Tabs>

---

### RemoveModEnchantToInvItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

给物品栏中物品移除自定义附魔信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveModEnchantToInvItem(slotPos: int, modEnchantId: str) -> bool
```

- slotPos: int，物品栏槽位。
- modEnchantId: str，自定义附魔 identifier。

**返回值**：bool，移除结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.RemoveModEnchantToInvItem(0, "customenchant")
```

</TabItem>
</Tabs>

---

### SetInvItemExchange

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

交换玩家背包物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetInvItemExchange(pos1: int, pos2: int) -> bool
```

- pos1: int，物品位置。
- pos2: int，物品位置。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.SetInvItemExchange(0, 2)
```

</TabItem>
</Tabs>

---

### SetInvItemNum

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置玩家背包物品数目。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetInvItemNum(slotPos: int, num: int) -> bool
```

- slotPos: int，物品栏槽位。
- num: int，物品数目，可以通过设置数量为 0 来达到清除背包物品的效果。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.SetInvItemNum(0, 10)
```

</TabItem>
</Tabs>

---

### SetPlayerAllItems

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

添加批量物品信息到指定槽位。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerAllItems(itemsDictMap: Dict[str, Any]) -> Dict[str, Any]
```

- itemsDictMap: Dict[str, Any]，需要添加的物品的字典，字典的 key 是 tuple([ItemPosType](/docs/docs/scripts/modapi/enums#itempostype), slotPos)，value 是需要添加的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

**返回值**：Dict[str, Any]，设置结果，字典的 key 是 tuple(ItemPosType, slot)，value 为 bool 代表该槽位设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
itemsDict = {
    'itemName': 'minecraft:bow',
    'count': 1,
    'enchantData': [(serverApi.GetMinecraftEnum().EnchantType.BowDamage, 1),],
    'auxValue': 0,
    'customTips':'§c new item §r',
    'extraId': 'abc',
    'userData': { },
}
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemsDictMap = {}
for i in xrange(36):
    if i % 3 == 0:
        itemsDictMap[(minecraftEnum.ItemPosType.INVENTORY, i)] = itemsDict
itemsDictMap[(minecraftEnum.ItemPosType.CARRIED, 0)] = itemsDict
itemsDictMap[(minecraftEnum.ItemPosType.OFFHAND, 0)] = itemsDict
comp.SetPlayerAllItems(itemsDictMap)
```

</TabItem>
</Tabs>

---

### SpawnItemToPlayerCarried

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

生成物品到玩家右手。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SpawnItemToPlayerCarried(itemDict: Dict[str, Any], playerId: str) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- playerId: str，玩家 id。

**返回值**：bool，设置结果。

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
comp.SpawnItemToPlayerCarried(itemDict, playerId)
```

</TabItem>
</Tabs>

---

### SpawnItemToPlayerInv

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

生成物品到玩家背包。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SpawnItemToPlayerInv(
    itemDict: Dict[str, Any],
    playerId: str,
    slotPos: int,
) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- playerId: str，玩家 id。
- slotPos: int，背包槽位(可选)。

**返回值**：bool，设置结果。

**备注**

- 当 slotPos 不设置时，当设置的数量超过单个槽位堆叠的上限时，会将多余的物品设置到另外的空闲槽位.如果生成的物品与背包中有的槽位的物品种类一致，该接口也会将物品增加到这些槽位中。注意：如果背包中剩余的物品数目和增加的物品数目之和大于 64，则会生成物品数目到 64，但是接口返回失败。

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
comp.SpawnItemToPlayerInv(itemDict, playerId, 0)
```

</TabItem>
</Tabs>

---
