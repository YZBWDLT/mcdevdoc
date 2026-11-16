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

本文主要记录背包相关的接口，共 4 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/beibao.html"/>

---

### GetEntityItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(entityId)`

获取生物物品，支持获取背包，盔甲栏，副手以及主手物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityItem(posType: int, slotPos: int, getUserData: bool = False) -> Dict[str, Any]
```

- posType: int，[ItemPosType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemPosType.html)。
- slotPos: int，槽位，获取 INVENTORY 及 ARMOR 时需要设置，其他情况写 0 即可。
- getUserData: bool，是否获取 userData，默认为 False。

**返回值**：Dict[str, Any]，物品信息字典，没有物品则返回 None。

**备注**

- 左右手及装备可以替代 [GetPlayerItem](/docs/docs/scripts/modapi/player/container#getplayeritem) 接口获取玩家的物品，但背包不行。获取生物背包目前支持驴、骡、羊驼以及其他带背包的自定义生物。
- 3.8 新增的收纳袋的 userdata 与箱子类的 Items 列表不同，它的格式为 \{'bundle_weight': \{'type': 3, 'value': 7\}, 'storage_item_component_content': []\} 其中 bundle_weight 表示收纳袋当前的重量值，示例表示它里面有 7 个普通可堆叠物品，而 storage_item_component_content 与箱子的 Items 类似，但即使槽位为空，它也包含 64 个元素。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(entityId)
comp.GetEntityItem(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0)
```

</TabItem>
</Tabs>

---

### GetEquItemEnchant

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取装备槽位中盔甲的附魔。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEquItemEnchant(slotPos: int) -> List[Tuple[int, int]]
```

- slotPos: int，[ArmorSlotType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ArmorSlotType.html)枚举。

**返回值**：List[Tuple[int, int]]，盔甲的附魔。

**备注**

- 如果物品不存在，或者没有附魔值，返回 None。如果存在返回 tuple 数组，每个 tuple 由附魔类型(EnchantType 枚举)和附魔等级组成。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetEquItemEnchant(serverApi.GetMinecraftEnum().ArmorSlotType.HEAD)
```

</TabItem>
</Tabs>

---

### GetEquItemModEnchant

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取装备槽位中盔甲的自定义附魔。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEquItemModEnchant(slotPos: int) -> List[Tuple[str, int]]
```

- slotPos: int，[ArmorSlotType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ArmorSlotType.html)枚举。

**返回值**：List[Tuple[str, int]]，list 中每个 tuple 由自定义附魔 id 和附魔等级组成，没有自定义附魔则返回空列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetEquItemModEnchant(serverApi.GetMinecraftEnum().ArmorSlotType.HEAD)
```

</TabItem>
</Tabs>

---

### SetEntityItem

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(entityId)`

设置生物物品，建议开发者根据生物特性来进行设置，部分生物设置装备后可能不显示但是死亡后仍然会掉落所设置的装备。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityItem(posType: int, itemDict: Dict[str, Any], slotPos: int) -> bool
```

- posType: int，[ItemPosType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemPosType.html)。
- itemDict: Dict[str, Any]，生物身上不同位置的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)列表，如果传入 None 将清除当前位置的物品/装备。
- slotPos: int，容器槽位，如果 ItemPosType 为左右手可不传，如果 ItemPosType 为背包则对应背包槽位，如果 ItemPosType 为 armor 则对应装备位置，具体请看[ArmorSlotType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ArmorSlotType.html)。

**返回值**：bool，设置成功返回 True。

**备注**

- 设置生物背包目前支持驴、骡、羊驼以及其他带背包的自定义生物。该接口与 spawnTo 系列接口相比多了槽位限制，只能设置对应槽位的装备、左手物品，并且右手不能设置装备。溺尸暂不支持设置自定义装备。如果传入的 itemDict 为 None 或\{\}，itemName 为 minecraft:air，count 为 0，均可以达到清除物品的效果。玩家背包请使用 [SpawnItemToPlayerInv](/docs/docs/scripts/modapi/player/container#spawnitemtoplayerinv) 来生成物品，使用 [SetInvItemNum](/docs/docs/scripts/modapi/player/container#setinvitemnum) 设置 0 来清除物品，其他部位也可以用该接口设置。
- posType 设置成 serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/general/tool#getminecraftenum)().ItemPosType.OFFHAND，itemDict 设置成 None 可替代 ClearPlayerOffHand。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(entityId)
itemDict = {
    'itemName': 'minecraft:bow',
    'count': 1,
    'enchantData': [(serverApi.GetMinecraftEnum().EnchantType.BowDamage, 1),],
    'auxValue': 0,
    'customTips':'§c new item §r',
    'extraId': 'abc',
    'userData': {},
}
comp.SetEntityItem(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, itemDict, 0)

#替代ClearPlayerOffHand接口的做法
comp.SetEntityItem(serverApi.GetMinecraftEnum().ItemPosType.OFFHAND, None, 0)
```

</TabItem>
</Tabs>

---
