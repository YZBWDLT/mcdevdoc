---
sidebar_position: 5
---

# 物品

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录物品相关的事件，共 52 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/wupin.html"/>

---

### ActorAcquiredItemClientEvent

<Client/>

触发时机：玩家获得物品时客户端抛出的事件（有些获取物品方式只会触发客户端事件，有些获取物品方式只会触发服务端事件，在使用时注意一点。）。

```python
ActorAcquiredItemClientEvent(
    actor: str,
    secondaryActor: str,
    itemDict: Dict[str, Any],
    acquireMethod: int,
) -> Any
```

- actor: str，获得物品玩家实体 id。
- secondaryActor: str，物品给予者玩家实体 id，如果不存在给予者的话，这里为空字符串。
- itemDict: Dict[str, Any]，获取到的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- acquireMethod: int，获得物品的方法，详见[ItemAcquisitionMethod](https://mc.163.com/newdev/docs/api/meijuzhi/ItemAcquisitionMethod.html)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ActorAcquiredItemServerEvent

<Server/>

触发时机：玩家获得物品时服务端抛出的事件（有些获取物品方式只会触发客户端事件，有些获取物品方式只会触发服务端事件，在使用时注意一点。）。

```python
ActorAcquiredItemServerEvent(
    actor: str,
    secondaryActor: str,
    itemDict: Dict[str, Any],
    acquireMethod: int,
) -> Any
```

- actor: str，获得物品玩家实体 id。
- secondaryActor: str，物品给予者玩家实体 id，如果不存在给予者的话，这里为空字符串。
- itemDict: Dict[str, Any]，获得的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- acquireMethod: int，获得物品的方法，详见[ItemAcquisitionMethod 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemAcquisitionMethod.html)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ActorUseItemClientEvent

<Client/>

触发时机：玩家使用物品时客户端抛出的事件（比较特殊不走该事件的例子：1）染料对有水的炼药锅使用；2）盔甲架装备盔甲）;3)喝牛奶。

```python
ActorUseItemClientEvent(playerId: str, itemDict: Dict[str, Any], useMethod: int) -> Any
```

- playerId: str，玩家实体 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- useMethod: int，使用物品的方法，详见[ItemUseMethodEnum 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemUseMethodEnum.html)。

**备注**

- 注意，喝牛奶不会触发该事件，但是会触发 [ActorUseItemServerEvent](/docs/docs/scripts/modapi/events/item#actoruseitemserverevent)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ActorUseItemServerEvent

<Server/>

触发时机：玩家使用物品生效之前服务端抛出的事件（比较特殊不走该事件的例子：1）染料对有水的炼药锅使用；2）盔甲架装备盔甲）。

```python
ActorUseItemServerEvent(playerId: str, itemDict: Dict[str, Any], useMethod: int) -> Any
```

- playerId: str，玩家实体 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- useMethod: int，使用物品的方法，详见[ItemUseMethodEnum 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemUseMethodEnum.html)。

**备注**

- 注意，喝牛奶会触发该事件，但是不会触发 [ActorUseItemClientEvent](/docs/docs/scripts/modapi/events/item#actoruseitemclientevent)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AnvilCreateResultItemAfterClientEvent

<Client/>

玩家点击铁砧合成得到的物品时抛出的事件。

```python
AnvilCreateResultItemAfterClientEvent(
    playerId: str,
    itemShowName: str,
    itemDict: Dict[str, Any],
    oldItemDict: Dict[str, Any],
    materialItemDict: Dict[str, Any],
) -> Any
```

- playerId: str，玩家实体 id。
- itemShowName: str，合成后的物品显示名称。
- itemDict: Dict[str, Any]，合成后的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- oldItemDict: Dict[str, Any]，合成前的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)（铁砧内第一个物品）。
- materialItemDict: Dict[str, Any]，合成所使用材料的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)（铁砧内第二个物品）。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ClientItemTryUseEvent

<Client/>

玩家点击右键尝试使用物品时客户端抛出的事件，可以通过设置 cancel 为 True 取消使用物品。

```python
ClientItemTryUseEvent(playerId: str, itemDict: Dict[str, Any], cancel: bool) -> Any
```

- playerId: str，玩家 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- cancel: bool，取消使用物品。

**备注**

- ClientItemTryUseEvent 事件设置 cancel 时即可取消使用，无需服务端 [ServerItemTryUseEvent](/docs/docs/scripts/modapi/events/item#serveritemtryuseevent) 再次 cancel，且服务端事件将不再触发。
- [ServerItemTryUseEvent](/docs/docs/scripts/modapi/events/item#serveritemtryuseevent)/ClientItemTryUseEvent 不能取消对方块使用物品的行为，如使用生物蛋，使用桶倒出/收集，使用打火石点燃草等；如果想要取消这种行为，请使用 [ClientItemUseOnEvent](/docs/docs/scripts/modapi/events/item#clientitemuseonevent) 和 [ServerItemUseOnEvent](/docs/docs/scripts/modapi/events/item#serveritemuseonevent)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ClientItemUseOnEvent

<Client/>

玩家在对方块使用物品时客户端抛出的事件。

```python
ClientItemUseOnEvent(
    entityId: str,
    itemDict: Dict[str, Any],
    x: int,
    y: int,
    z: int,
    blockName: str,
    blockAuxValue: int,
    face: int,
    clickX: float,
    clickY: float,
    clickZ: float,
    ret: bool,
) -> Any
```

- entityId: str，玩家实体 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- x: int，方块 x 坐标值。
- y: int，方块 y 坐标值。
- z: int，方块 z 坐标值。
- blockName: str，方块的 identifier。
- blockAuxValue: int，方块的附加值。
- face: int，点击方块的面，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- clickX: float，点击点的 x 比例位置。
- clickY: float，点击点的 y 比例位置。
- clickZ: float，点击点的 z 比例位置。
- ret: bool，设为 True 可取消物品的使用。

**备注**

- 事件设置 ret = True 时即可取消使用，无需服务端再次设置 [ServerItemUseOnEvent](/docs/docs/scripts/modapi/events/item#serveritemuseonevent) 取消，且服务端事件将不再触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ClientShapedRecipeTriggeredEvent

<Client/>

玩家合成物品时触发。

```python
ClientShapedRecipeTriggeredEvent(recipeId: str) -> Any
```

- recipeId: str，配方 id，对应配方 json 文件中的 identifier 字段。

---

### ContainerItemChangedServerEvent

<Server/>

容器物品变化事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ContainerItemChangedServerEvent(
    pos: Optional[Tuple[int, int, int]],
    containerType: int,
    slot: int,
    dimensionId: int,
    oldItemDict: Dict[str, Any],
    newItemDict: Dict[str, Any],
) -> Any
```

- pos: Optional[Tuple[int, int, int]]，容器坐标。
- containerType: int，容器类型，类型含义见：[容器类型枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ContainerType.html)。
- slot: int，容器槽位。
- dimensionId: int，维度 id。
- oldItemDict: Dict[str, Any]，旧物品，格式参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- newItemDict: Dict[str, Any]，新物品，格式参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

**备注**

- 储物容器(箱子，潜影箱)，熔炉，酿造台，发射器，投掷器，漏斗，炼药锅，唱片机，高炉，烟熏炉中物品发生变化会触发此事件。
- 工作台、铁砧、附魔台、织布机、砂轮、切石机、制图台、锻造台为合成容器，不会触发此事件，此类容器可通过 [UIContainerItemChangedServerEvent](/docs/docs/scripts/modapi/events/item#uicontaineritemchangedserverevent) 监听具体生成容器物品变化。
- 炼药锅只在使用染料时触发本事件，且 slot 为 2。
- 唱片机只在从漏斗放入唱片触发此事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from mod_log import logger as logger
# 监听引擎的事件
self.ListenForEvent(serverApi.GetEngineNamespace(),
                    serverApi.GetEngineSystemName(),
                    "ContainerItemChangedServerEvent",
                    self, self.OnContainerItemChangedServerEvent)

def OnContainerItemChangedServerEvent(self, args):
    playerId = args['playerId']
    logger.info("OnContainerItemChangedServerEvent args:%s", args)
    if args['containerType'] == serverApi.GetMinecraftEnum().ContainerType.SMOKER:
        print '烟熏炉发生变化'
```

</TabItem>
</Tabs>

---

### CraftItemOutputChangeServerEvent

<Server/>

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

玩家从容器拿出生成物品时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CraftItemOutputChangeServerEvent(
    playerId: str,
    itemDict: Dict[str, Any],
    screenContainerType: int,
    cancel: bool,
) -> Any
```

- playerId: str，玩家实体 id。
- itemDict: Dict[str, Any]，生成的物品，格式参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- screenContainerType: int，当前界面类型,类型含义见：[容器类型枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ContainerType.html)。
- cancel: bool，是否取消生成物品。

**备注**

- 支持工作台，铁砧，砂轮等工作方块。
- screenContainerType = serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/general/tool#getminecraftenum)().ContainerType.INVENTORY 时，表示从创造模式物品栏中拿出物品，或者从合成栏中拿出合成物品。
- 通过 cancel 参数取消生成物品，可用于禁止外挂刷物品。
- cancel=True 时无法从创造模式物品栏拿物品。
- cancel=True 时铁砧无法修复或重命名物品，但仍会扣除经验值。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from mod_log import logger as logger
# 监听引擎的事件
self.ListenForEvent(serverApi.GetEngineNamespace(),
                    serverApi.GetEngineSystemName(),
                    "CraftItemOutputChangeServerEvent",
                    self, self.OnCraftItemOutputChangeServerEvent)

def OnCraftItemOutputChangeServerEvent(self, args):
    playerId = args['playerId']
    comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
    logger.info("OnCraftItemOutputChangeServerEvent args:%s", args)

    # 铁砧触发
    if args['screenContainerType'] == serverApi.GetMinecraftEnum().ContainerType.ANVIL:
        anvilInputItem = comp.GetOpenContainerItem(playerId,serverApi.GetMinecraftEnum().OpenContainerId.AnvilInputContainer,True)
        if anvilInputItem != None:
            # 铁砧输入位有物品，该事件为拿出铁砧生成物触发的
            if anvilInputItem['itenName'] != args['itemDict']['itemName']:
                # 输入物品和生成物品不是同一类型，可能是作弊，取消物品生成
                args['cancel'] = True
```

</TabItem>
</Tabs>

---

### CraftUpdateResultItemClientEvent

<Client/>

玩家工作台界面更新显示可合成物品时抛出的事件。

```python
CraftUpdateResultItemClientEvent(playerId: str, itemDict: Dict[str, Any]) -> Any
```

- playerId: str，玩家实体 id。
- itemDict: Dict[str, Any]，合成后的物品的[[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)]。

**备注**

- 该事件在打开 3×3 工作台界面，2×2 工作台界面，向工作台放入物品，预览配方时触发。
- 如果无可合成的物品，或预览的配方因材料不足而无法合成，则传递的物品参数为 minecraft:air。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### FurnaceBurnFinishedServerEvent

<Server/>

服务端熔炉烧制触发事件。熔炉, 高炉，烟熏炉烧出物品时触发。

```python
FurnaceBurnFinishedServerEvent(
    dimensionId: int,
    posX: float,
    posY: float,
    posZ: float,
    itemDict: Dict[str, Any],
) -> Any
```

- dimensionId: int，维度 id。
- posX: float，位置 x。
- posY: float，位置 y。
- posZ: float，位置 z。
- itemDict: Dict[str, Any]，物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，当新物品为空时，此项属性为 None。

---

### GrindStoneRemovedEnchantClientEvent

<Client/>

玩家点击砂轮合成得到的物品时抛出的事件。

```python
GrindStoneRemovedEnchantClientEvent(
    playerId: str,
    oldItemDict: Dict[str, Any],
    additionalItemDict: Dict[str, Any],
    newItemDict: Dict[str, Any],
    exp: int,
) -> Any
```

- playerId: str，玩家实体 id。
- oldItemDict: Dict[str, Any]，合成前的物品[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)（砂轮内第一个物品）。
- additionalItemDict: Dict[str, Any]，作为合成材料的物品[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)（砂轮内第二个物品）。
- newItemDict: Dict[str, Any]，合成后的物品[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- exp: int，本次合成返还的经验。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### InventoryItemChangedClientEvent

<Client/>

玩家背包物品变化时客户端抛出的事件。

```python
InventoryItemChangedClientEvent(
    playerId: str,
    slot: int,
    oldItemDict: Dict[str, Any],
    newItemDict: Dict[str, Any],
) -> Any
```

- playerId: str，玩家实体 id。
- slot: int，背包槽位。
- oldItemDict: Dict[str, Any]，变化前槽位中的物品，格式参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- newItemDict: Dict[str, Any]，变化后槽位中的物品，格式参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

**备注**

- 如果槽位变空，变化后槽位中物品为空气。
- 触发时槽位物品仍为变化前物品。
- 背包内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### InventoryItemChangedServerEvent

<Server/>

玩家背包物品变化时服务端抛出的事件。

```python
InventoryItemChangedServerEvent(
    playerId: str,
    slot: int,
    oldItemDict: Dict[str, Any],
    newItemDict: Dict[str, Any],
) -> Any
```

- playerId: str，玩家实体 id。
- slot: int，背包槽位。
- oldItemDict: Dict[str, Any]，变化前槽位中的物品，格式参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- newItemDict: Dict[str, Any]，变化后槽位中的物品，格式参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

**备注**

- 如果槽位变空，变化后槽位中物品为空气。
- 触发时槽位物品仍为变化前物品。
- 玩家进入游戏时，身上的物品会触发该事件。
- 背包内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ItemDurabilityChangedServerEvent

<Server/>

物品耐久度变化事件。

```python
ItemDurabilityChangedServerEvent(
    entityId: str,
    itemDict: Dict[str, Any],
    durabilityBefore: int,
    durability: int,
    canChange: bool,
) -> Any
```

- entityId: str，物品拥有者的实体 id。
- itemDict: Dict[str, Any]，物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- durabilityBefore: int，变化前耐久度。
- durability: int，变化后耐久度,支持修改。但是请注意修改范围，支持范围为[-32768,32767)。
- canChange: bool，是否支持修改，为 true 时支持通过 durability 修改，为 false 时不支持。

**备注**

- 目前只有存在耐久的物品，并且有物主的物品才会触发该事件，存在发射器中发射导致的物品耐久变化不会触发该事件。
- 目前铁砧修复、经验修补魔咒、[SetItemDurability](/docs/docs/scripts/modapi/item#setitemdurability) 接口触发的耐久度变化中 canChange 为 false，并且不支持修改变化后耐久度。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ItemPullOutCustomContainerServerEvent

<Server/>

漏出物品到漏斗时触发该事件。

```python
ItemPullOutCustomContainerServerEvent(
    itemDict: Dict[str, Any],
    collectionName: str,
    collectionIndex: int,
    x: int,
    y: int,
    z: int,
    dimension: int,
    cancel: bool,
) -> Any
```

- itemDict: Dict[str, Any]，漏斗漏出物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，漏出物品的容器名称，目前仅支持 netease_container。
- collectionIndex: int，漏出物品的容器索引。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。
- dimension: int，容器方块所在的维度 id。
- cancel: bool，是否取消该操作，默认为 false，事件中改为 true 时拒绝此次漏出物品的操作。

---

### ItemPushInCustomContainerServerEvent

<Server/>

漏斗漏入物品时触发该事件。

```python
ItemPushInCustomContainerServerEvent(
    itemDict: Dict[str, Any],
    collectionName: str,
    collectionIndex: int,
    x: int,
    y: int,
    z: int,
    dimension: int,
    cancel: bool,
) -> Any
```

- itemDict: Dict[str, Any]，漏斗漏入物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，目标容器名称，目前仅支持 netease_container。
- collectionIndex: int，目标容器索引。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。
- dimension: int，容器方块所在的维度 id。
- cancel: bool，是否取消该操作，默认为 false，事件中改为 true 时拒绝此次漏入物品的操作。

---

### ItemReleaseUsingClientEvent

<Client/>

触发时机：释放正在使用的物品。

```python
ItemReleaseUsingClientEvent(
    playerId: str,
    durationLeft: float,
    itemDict: Dict[str, Any],
    maxUseDuration: int,
    cancel: bool,
) -> Any
```

- playerId: str，玩家 id。
- durationLeft: float，蓄力剩余时间(当物品缺少"minecraft:maxduration"组件时,蓄力剩余时间为负数)。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- maxUseDuration: int，最大蓄力时长。
- cancel: bool，设置为 True 可以取消，需要同时取消服务端事件 [ItemReleaseUsingServerEvent](/docs/docs/scripts/modapi/events/item#itemreleaseusingserverevent)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ItemReleaseUsingServerEvent

<Server/>

触发时机：释放正在使用的物品时。

```python
ItemReleaseUsingServerEvent(
    playerId: str,
    durationLeft: float,
    itemDict: Dict[str, Any],
    maxUseDuration: int,
    cancel: bool,
    changeItem: bool,
) -> Any
```

- playerId: str，玩家 id。
- durationLeft: float，蓄力剩余时间(当物品缺少"minecraft:maxduration"组件时,蓄力剩余时间为负数)。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- maxUseDuration: int，最大蓄力时长。
- cancel: bool，设置为 True 可以取消，需要同时取消客户端事件 [ItemReleaseUsingClientEvent](/docs/docs/scripts/modapi/events/item#itemreleaseusingclientevent)。
- changeItem: bool，如果要在该事件的回调中修改当前使用槽位的物品，需设置这个参数为 True，否则将修改物品失败，例如修改耐久度或者替换成新物品。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ItemUseAfterServerEvent

<Server/>

玩家在使用物品之后服务端抛出的事件。

```python
ItemUseAfterServerEvent(entityId: str, itemDict: Dict[str, Any]) -> Any
```

- entityId: str，玩家实体 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

**备注**

- 做出使用物品这个动作之后触发，一些需要蓄力的物品使用事件([ActorUseItemServerEvent](/docs/docs/scripts/modapi/events/item#actoruseitemserverevent))会在之后触发。如投掷三叉戟，先触发本事件，投出去之后再触发 [ActorUseItemServerEvent](/docs/docs/scripts/modapi/events/item#actoruseitemserverevent)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ItemUseOnAfterServerEvent

<Server/>

玩家在对方块使用物品之后服务端抛出的事件。

```python
ItemUseOnAfterServerEvent(
    entityId: str,
    itemDict: Dict[str, Any],
    x: int,
    y: int,
    z: int,
    face: int,
    clickX: float,
    clickY: float,
    clickZ: float,
    blockName: str,
    blockAuxValue: int,
    dimensionId: int,
) -> Any
```

- entityId: str，玩家实体 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- x: int，方块 x 坐标值。
- y: int，方块 y 坐标值。
- z: int，方块 z 坐标值。
- face: int，点击方块的面，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- clickX: float，点击点的 x 比例位置。
- clickY: float，点击点的 y 比例位置。
- clickZ: float，点击点的 z 比例位置。
- blockName: str，方块的 identifier。
- blockAuxValue: int，方块的附加值。
- dimensionId: int，维度 id。

**备注**

- 在 [ServerItemUseOnEvent](/docs/docs/scripts/modapi/events/item#serveritemuseonevent) 和原版物品使用事件（例如 [StartUsingItemClientEvent](/docs/docs/scripts/modapi/events/item#startusingitemclientevent)）之后触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### LiquidClippedClientEvent

<Client/>

玩家客户端点击流体时触发（支持原版流体与自定义流体）。

```python
LiquidClippedClientEvent(
    playerId: str,
    blockName: str,
    aux: int,
    blockPos: Tuple[int, int, int],
    dimensionId: int,
    floatPos: Tuple[float, float, float],
) -> Any
```

- playerId: str，玩家 Id。
- blockName: str，方块的 identifier，包含命名空间及名称。
- aux: int，方块附加值。
- blockPos: Tuple[int, int, int]，方块坐标(x,y,z)。
- dimensionId: int，维度 id。
- floatPos: Tuple[float, float, float]，点击的精准坐标(x,y,z)。

**备注**

- 需要在物品中添加 netease:liquid_clipped: True 组件才能触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### LiquidClippedServerEvent

<Server/>

玩家服务端点击流体时触发（支持原版流体与自定义流体）。

```python
LiquidClippedServerEvent(
    playerId: str,
    blockName: str,
    aux: int,
    blockPos: Tuple[int, int, int],
    dimensionId: int,
    floatPos: Tuple[float, float, float],
) -> Any
```

- playerId: str，玩家 Id。
- blockName: str，方块的 identifier，包含命名空间及名称。
- aux: int，方块附加值。
- blockPos: Tuple[int, int, int]，方块坐标(x,y,z)。
- dimensionId: int，维度 id。
- floatPos: Tuple[float, float, float]，点击的精准坐标(x,y,z)。

**备注**

- 需要在物品中添加 netease:liquid_clipped: True 组件才能触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnCarriedNewItemChangedClientEvent

<Client/>

手持物品发生变化时，触发该事件；数量改变不会通知。

```python
OnCarriedNewItemChangedClientEvent(itemDict: Dict[str, Any]) -> Any
```

- itemDict: Dict[str, Any]，切换后物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

---

### OnCarriedNewItemChangedServerEvent

<Server/>

触发时机：玩家切换主手物品时触发该事件。

```python
OnCarriedNewItemChangedServerEvent(
    oldItemDict: Optional[Dict[str, Any]],
    newItemDict: Optional[Dict[str, Any]],
    playerId: str,
) -> Any
```

- oldItemDict: Optional[Dict[str, Any]]，旧物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，当旧物品为空时，此项属性为 None。
- newItemDict: Optional[Dict[str, Any]]，新物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，当新物品为空时，此项属性为 None。
- playerId: str，玩家 entityId。

**备注**

- 切换耐久度不同的相同物品，不会触发该事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnItemPutInEnchantingModelServerEvent

<Server/>

触发时机：玩家将可附魔物品放到附魔台上时。

```python
OnItemPutInEnchantingModelServerEvent(playerId: str, slotType: int, options: List[Any], change: bool) -> Any
```

- playerId: str，玩家 id，参数类型为 str。
- slotType: int，玩家放入物品的[EnchantSlotType](https://mc.163.com/newdev/docs/api/meijuzhi/EnchantSlotType.html)。
- options: List[Any]，附魔台选项。
- change: bool，传入 True 时，附魔台选项会被新传入的 options 覆盖。

**备注**

- options 为包含三个 dict 的 list，单个 dict 的格式形如\{'cost': 1, 'enchantData': [(1,1)], 'modEnchantData': [('custom_enchant, 1')]\}，cost 为解锁该选项所需的玩家等级，enchantData 为该附魔选项包含的原版附魔数据，modEnchantData 为该选项包含的自定义附魔数据。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnNewArmorExchangeServerEvent

<Server/>

触发时机：玩家切换盔甲时触发该事件。

```python
OnNewArmorExchangeServerEvent(
    slot: int,
    oldArmorDict: Optional[Dict[str, Any]],
    newArmorDict: Optional[Dict[str, Any]],
    playerId: str,
) -> Any
```

- slot: int，槽位 id。
- oldArmorDict: Optional[Dict[str, Any]]，旧装备的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，当旧物品为空时，此项属性为 None。
- newArmorDict: Optional[Dict[str, Any]]，新装备的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，当新物品为空时，此项属性为 None。
- playerId: str，玩家 entityId。

**备注**

- 当玩家登录时，每个盔甲槽位会触发两次该事件，第一次为 None 切换到身上的装备，第二次的 old 和 new 都为身上装备。如果槽位为空，则是触发两次从 None 切换到 None 的事件。
- 注意：避免在该事件回调中对玩家修改盔甲栏装备，如 [SetEntityItem](/docs/docs/scripts/modapi/entity/container#setentityitem) 接口，会导致事件循环触发造成堆栈溢出。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnOffhandItemChangedServerEvent

<Server/>

触发时机：玩家切换副手物品时触发该事件。

```python
OnOffhandItemChangedServerEvent(
    oldItemDict: Optional[Dict[str, Any]],
    newItemDict: Optional[Dict[str, Any]],
    playerId: str,
) -> Any
```

- oldItemDict: Optional[Dict[str, Any]]，旧物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，当旧物品为空时，此项属性为 None。
- newItemDict: Optional[Dict[str, Any]]，新物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)，当新物品为空时，此项属性为 None。
- playerId: str，玩家 entityId。

**备注**

- 当原有的物品槽内容为空时，oldItemName 值为'minecraft:air'，且 oldItem 其余字段不存在当切换原有物品，且新物品为空时，参数值同理。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnPlayerActiveShieldServerEvent

<Server/>

触发时机：玩家激活/取消激活盾牌触发的事件。包括玩家持盾进入潜行状态，以及在潜行状态切换盾牌（切换耐久度不同的相同盾牌不会触发）。

```python
OnPlayerActiveShieldServerEvent(
    playerId: str,
    isActive: bool,
    itemDict: Dict[str, Any],
    cancelable: bool,
    cancel: bool,
) -> Any
```

- playerId: str，玩家 Id。
- isActive: bool，True:尝试激活,False:尝试取消激活。
- itemDict: Dict[str, Any]，盾牌物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- cancelable: bool，是否可以取消。如果玩家在潜行状态切换盾牌，则无法取消。
- cancel: bool，是否取消这次激活。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnPlayerBlockedByShieldAfterServerEvent

<Server/>

触发时机：玩家使用盾牌抵挡伤害之后触发。

```python
OnPlayerBlockedByShieldAfterServerEvent(
    playerId: str,
    sourceId: str,
    itemDict: Dict[str, Any],
    damage: float,
) -> Any
```

- playerId: str，玩家 Id。
- sourceId: str，伤害来源实体 Id，没有实体返回"-1"。
- itemDict: Dict[str, Any]，盾牌物品字典[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- damage: float，抵挡的伤害数值。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnPlayerBlockedByShieldBeforeServerEvent

<Server/>

触发时机：玩家使用盾牌抵挡伤害之前触发。

```python
OnPlayerBlockedByShieldBeforeServerEvent(
    playerId: str,
    sourceId: str,
    itemDict: Dict[str, Any],
    damage: float,
) -> Any
```

- playerId: str，玩家 Id。
- sourceId: str，伤害来源实体 Id，没有实体返回"-1"。
- itemDict: Dict[str, Any]，盾牌物品字典[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- damage: float，抵挡的伤害数值。

**备注**

- 盾牌抵挡了所有伤害时，才会触发事件；部分抛射物造成的伤害无法全部抵挡，无法触发事件，例如带有穿透魔咒的弩。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerAddCustomContainerItemClientEvent

<Client/>

玩家成功将物品添加到自定义容器时触发该事件。

```python
PlayerAddCustomContainerItemClientEvent(
    beforeItemDict: Dict[str, Any],
    changedItemDict: Dict[str, Any],
    afterItemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    x: int,
    y: int,
    z: int,
) -> Any
```

- beforeItemDict: Dict[str, Any]，操作前目标槽位的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- changedItemDict: Dict[str, Any]，实际添加的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- afterItemDict: Dict[str, Any]，操作后目标槽位的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，容器槽位索引。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。

**备注**

- 该事件仅在目标容器为 netease_container 或 netease_ui_container 时触发。
- 该事件在物品成功添加后触发，无 cancel 参数，无法取消操作。
- 容器内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。

---

### PlayerAddCustomContainerItemServerEvent

<Server/>

玩家向自定义容器中添加物品成功后触发该事件。该事件不可取消，仅用于通知物品添加操作已完成。

```python
PlayerAddCustomContainerItemServerEvent(
    beforeItemDict: Dict[str, Any],
    changedItemDict: Dict[str, Any],
    afterItemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    playerId: str,
    x: int,
    y: int,
    z: int,
) -> Any
```

- beforeItemDict: Dict[str, Any]，操作前目标槽位的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- changedItemDict: Dict[str, Any]，实际添加的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- afterItemDict: Dict[str, Any]，操作后目标槽位的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，目标容器索引。
- playerId: str，玩家 id。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。

**备注**

- 该事件仅在操作成功后触发，且不可取消。事件提供三个物品字典：操作前状态、实际变化的物品、操作后状态，便于精确追踪物品变化。
- 当目标槽位接近满仓时，实际添加的数量可能小于请求添加的数量，changedItemDict 反映实际添加的物品信息。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerDropItemServerEvent

<Server/>

触发时机：玩家丢弃物品时触发。

```python
PlayerDropItemServerEvent(playerId: str, itemEntityId: str) -> Any
```

- playerId: str，玩家 id。
- itemEntityId: str，物品 entityId。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerPickupArrowServerEvent

<Server/>

玩家即将捡起抛射物时触发，包括使用"netease:pick_up"的自定义抛射物。

```python
PlayerPickupArrowServerEvent(
    playerId: str,
    arrowId: str,
    itemDict: Dict[str, Any],
    cancel: bool,
    pickupDelay: int,
) -> Any
```

- playerId: str，玩家 Id。
- arrowId: str，抛射物 Id。
- itemDict: Dict[str, Any]，触碰的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- cancel: bool，设置为 True 时将取消本次拾取。
- pickupDelay: int，取消拾取后重新设置该物品的拾取 cd，小于 15 帧将视作 15 帧，大于等于 97813 帧将视作无法拾取，每秒 30 帧。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerRemoveCustomContainerItemClientEvent

<Client/>

玩家成功从自定义容器中移除物品时触发该事件。

```python
PlayerRemoveCustomContainerItemClientEvent(
    beforeItemDict: Dict[str, Any],
    changedItemDict: Dict[str, Any],
    afterItemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    x: int,
    y: int,
    z: int,
) -> Any
```

- beforeItemDict: Dict[str, Any]，操作前目标槽位的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- changedItemDict: Dict[str, Any]，实际移除的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- afterItemDict: Dict[str, Any]，操作后目标槽位的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，容器槽位索引。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。

**备注**

- 该事件仅在源容器为 netease_container 或 netease_ui_container 时触发。
- 该事件在物品成功移除后触发，无 cancel 参数，无法取消操作。
- 容器内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。

---

### PlayerRemoveCustomContainerItemServerEvent

<Server/>

玩家从自定义容器中移除物品成功后触发该事件。该事件不可取消，仅用于通知物品移除操作已完成。

```python
PlayerRemoveCustomContainerItemServerEvent(
    beforeItemDict: Dict[str, Any],
    changedItemDict: Dict[str, Any],
    afterItemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    playerId: str,
    x: int,
    y: int,
    z: int,
) -> Any
```

- beforeItemDict: Dict[str, Any]，操作前目标槽位的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- changedItemDict: Dict[str, Any]，实际移除的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- afterItemDict: Dict[str, Any]，操作后目标槽位的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，目标容器索引。
- playerId: str，玩家 id。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。

**备注**

- 该事件仅在操作成功后触发，且不可取消。事件提供三个物品字典：操作前状态、实际变化的物品、操作后状态，便于精确追踪物品变化。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerTryAddCustomContainerItemClientEvent

<Client/>

玩家尝试将物品添加到自定义容器时触发该事件。

```python
PlayerTryAddCustomContainerItemClientEvent(
    itemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    x: int,
    y: int,
    z: int,
    cancel: bool,
) -> Any
```

- itemDict: Dict[str, Any]，尝试添加物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，放入容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，放入容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，放入容器索引。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。
- cancel: bool，是否取消该操作，默认为 false，事件中改为 true 时拒绝此次放入自定义容器的操作。

**备注**

- 容器内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。
- cancel 取消本次操作后不会触发对应服务端事件。

---

### PlayerTryAddCustomContainerItemServerEvent

<Server/>

玩家尝试将物品添加到自定义容器时触发该事件。

```python
PlayerTryAddCustomContainerItemServerEvent(
    itemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    playerId: str,
    x: int,
    y: int,
    z: int,
) -> Any
```

- itemDict: Dict[str, Any]，尝试添加物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，放入容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，放入容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，放入容器索引。
- playerId: str，玩家 id。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。

**备注**

- 容器内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerTryDropItemClientEvent

<Client/>

触发时机：玩家丢弃物品时触发。

```python
PlayerTryDropItemClientEvent(playerId: str, itemDict: Dict[str, Any], cancel: bool) -> Any
```

- playerId: str，玩家 id。
- itemDict: Dict[str, Any]，物品 dict。
- cancel: bool，是否取消此次操作。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerTryPutCustomContainerItemClientEvent

<Client/>

玩家尝试将物品放入自定义容器时触发该事件。

```python
PlayerTryPutCustomContainerItemClientEvent(
    itemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    x: int,
    y: int,
    z: int,
    cancel: bool,
) -> Any
```

- itemDict: Dict[str, Any]，尝试放入物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，放入容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，放入容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，放入容器索引。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。
- cancel: bool，是否取消该操作，默认为 false，事件中改为 true 时拒绝此次放入自定义容器的操作。

**备注**

- 该事件只有目标槽位为空或交换物品时触发，如果目标槽位有相同物品时只会触发 [PlayerTryAddCustomContainerItemServerEvent](/docs/docs/scripts/modapi/events/item#playertryaddcustomcontaineritemserverevent) 事件。
- PC 存在 shift 键移动全部物品，放入同种物品时，可能会触发 tryadd 和 tryput，请开发者注意适配。
- 容器内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。
- cancel 取消本次操作后不会触发对应服务端事件。

---

### PlayerTryPutCustomContainerItemServerEvent

<Server/>

玩家尝试将物品放入自定义容器时触发该事件。

```python
PlayerTryPutCustomContainerItemServerEvent(
    itemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    playerId: str,
    x: int,
    y: int,
    z: int,
    cancel: bool,
) -> Any
```

- itemDict: Dict[str, Any]，尝试放入物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，放入容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，放入容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，放入容器索引。
- playerId: str，玩家 id。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。
- cancel: bool，是否取消该操作，默认为 false，事件中改为 true 时拒绝此次放入自定义容器的操作。

**备注**

- 该事件只有目标槽位为空时触发，如果目标槽位有相同物品时只会触发 [PlayerTryAddCustomContainerItemServerEvent](/docs/docs/scripts/modapi/events/item#playertryaddcustomcontaineritemserverevent) 事件。
- PC 存在 shift 键移动全部物品，放入同种物品时，可能会触发 tryadd 和 tryput，请开发者注意适配。
- 容器内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerTryRemoveCustomContainerItemClientEvent

<Client/>

玩家尝试从自定义容器中移除物品时触发该事件。

```python
PlayerTryRemoveCustomContainerItemClientEvent(
    itemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    x: int,
    y: int,
    z: int,
    cancel: bool,
) -> Any
```

- itemDict: Dict[str, Any]，尝试移除物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，放入容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，放入容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，目标容器索引。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。
- cancel: bool，是否取消该操作，默认为 false，事件中改为 true 时拒绝此次移除物品的操作。

**备注**

- 该事件在关闭容器物品自动返回背包时也会触发，此时如果取消操作物品将会被留在容器中，容器被破坏物品也不会掉落（因为实际存储于玩家身上），当再次打开 netease_ui_container 容器时会显示。
- 容器内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。
- cancel 取消本次操作后不会触发对应服务端事件。

---

### PlayerTryRemoveCustomContainerItemServerEvent

<Server/>

玩家尝试从自定义容器中移除物品时触发该事件。

```python
PlayerTryRemoveCustomContainerItemServerEvent(
    itemDict: Dict[str, Any],
    collectionName: str,
    collectionType: str,
    collectionIndex: int,
    playerId: str,
    x: int,
    y: int,
    z: int,
) -> Any
```

- itemDict: Dict[str, Any]，尝试移除物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- collectionName: str，放入容器名称，对应容器 json 中"custom_description"字段。
- collectionType: str，放入容器类型，目前仅支持 netease_container 和 netease_ui_container。
- collectionIndex: int，目标容器索引。
- playerId: str，玩家 id。
- x: int，容器方块 x 坐标。
- y: int，容器方块 y 坐标。
- z: int，容器方块 z 坐标。

**备注**

- 容器内物品移动，合堆，分堆的操作会分多次事件触发并且顺序不定，编写逻辑时请勿依赖事件触发顺序。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ServerItemTryUseEvent

<Server/>

玩家点击右键尝试使用物品时服务端抛出的事件。

```python
ServerItemTryUseEvent(playerId: str, itemDict: Dict[str, Any], cancel: bool) -> Any
```

- playerId: str，玩家 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- cancel: bool，设为 True 可取消物品的使用。

**备注**

- [ClientItemTryUseEvent](/docs/docs/scripts/modapi/events/item#clientitemtryuseevent) 的 cancel 设置为 True 时，服务端事件不会被触发了。
- ServerItemTryUseEvent/[ClientItemTryUseEvent](/docs/docs/scripts/modapi/events/item#clientitemtryuseevent) 不能取消对方块使用物品的行为，如使用生物蛋，使用桶倒出/收集，使用打火石点燃草等；如果想要取消这种行为，请使用 [ClientItemUseOnEvent](/docs/docs/scripts/modapi/events/item#clientitemuseonevent) 和 [ServerItemUseOnEvent](/docs/docs/scripts/modapi/events/item#serveritemuseonevent)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ServerItemUseOnEvent

<Server/>

玩家在对方块使用物品之前服务端抛出的事件。

```python
ServerItemUseOnEvent(
    entityId: str,
    itemDict: Dict[str, Any],
    x: int,
    y: int,
    z: int,
    blockName: str,
    blockAuxValue: int,
    face: int,
    dimensionId: int,
    clickX: float,
    clickY: float,
    clickZ: float,
    ret: bool,
) -> Any
```

- entityId: str，玩家实体 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- x: int，方块 x 坐标值。
- y: int，方块 y 坐标值。
- z: int，方块 z 坐标值。
- blockName: str，方块的 identifier。
- blockAuxValue: int，方块的附加值。
- face: int，点击方块的面，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- dimensionId: int，维度 id。
- clickX: float，点击点的 x 比例位置。
- clickY: float，点击点的 y 比例位置。
- clickZ: float，点击点的 z 比例位置。
- ret: bool，设为 True 可取消物品的使用。

**备注**

- 客户端事件 [ClientItemUseOnEvent](/docs/docs/scripts/modapi/events/item#clientitemuseonevent) 设置 ret 设置为 True 时，服务端不再会接受到这个事件。
- 当对原生方块进行使用时，如堆肥桶等类似有 使用 功能的方块使用物品时，不会触发该事件。而当原生方块加入监听后，[ServerBlockUseEvent](/docs/docs/scripts/modapi/events/block#serverblockuseevent) 会触发。当需要获取触发时使用的物品时，可以通过 item 组件（例如 [GetPlayerItem](/docs/docs/scripts/modapi/player/container#getplayeritem) 接口）获取手中持有的物品，对应的客户端事件同理。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ServerPlayerTryTouchEvent

<Server/>

玩家即将捡起物品时触发。

```python
ServerPlayerTryTouchEvent(
    playerId: str,
    entityId: str,
    itemDict: Dict[str, Any],
    cancel: bool,
    pickupDelay: int,
) -> Any
```

- playerId: str，玩家 Id。
- entityId: str，物品实体的 Id。
- itemDict: Dict[str, Any]，触碰的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- cancel: bool，设置为 True 时将取消本次拾取。
- pickupDelay: int，取消拾取后重新设置该物品的拾取 cd，小于 15 帧将视作 15 帧，大于等于 97813 帧将视作无法拾取。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ShearsUseToBlockBeforeServerEvent

<Server/>

触发时机：实体手持剪刀对方块使用时，有剪刀特殊效果的方块会在服务端线程触发该事件。

```python
ShearsUseToBlockBeforeServerEvent(
    blockX: int,
    blockY: int,
    blockZ: int,
    blockName: str,
    auxData: int,
    dropName: str,
    dropCount: int,
    entityId: str,
    dimensionId: int,
    cancelShears: bool,
) -> Any
```

- blockX: int，方块位置 x。
- blockY: int，方块位置 y。
- blockZ: int，方块位置 z。
- blockName: str，方块的 identifier，包含命名空间及名称。
- auxData: int，方块附加值。
- dropName: str，触发剪刀效果的掉落物 identifier，包含命名空间及名称。
- dropCount: int，触发剪刀效果的掉落物数量。
- entityId: str，触发剪刀效果的实体 id，目前仅玩家会触发。
- dimensionId: int，玩家触发时的维度 id。
- cancelShears: bool，是否取消剪刀效果。

**备注**

- 目前会触发该事件的方块：南瓜、蜂巢。
- 该事件触发在 [ServerItemUseOnEvent](/docs/docs/scripts/modapi/events/item#serveritemuseonevent) 之后，如果 [ServerItemUseOnEvent](/docs/docs/scripts/modapi/events/item#serveritemuseonevent) 中取消了物品使用，该事件无法被触发。
- 和 [ServerItemUseOnEvent](/docs/docs/scripts/modapi/events/item#serveritemuseonevent) 一样该事件判定在 tick 执行，意味着如果取消剪刀效果该事件可能会多次触发（取决于玩家按下使用键时长）。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### StartUsingItemClientEvent

<Client/>

玩家使用物品（目前仅支持 Bucket（奶桶）、Trident（三叉戟）、RangedWeapon（弓）、Food（食物）、Potion（药水）、Crossbow（弩））时抛出。

```python
StartUsingItemClientEvent(playerId: str, itemDict: Dict[str, Any]) -> Any
```

- playerId: str，玩家实体 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### StopUsingItemClientEvent

<Client/>

玩家停止使用物品（目前仅支持 Bucket（奶桶）、Trident（三叉戟）、RangedWeapon（弓）、Food（食物）、Potion（药水）、Crossbow（弩））时抛出。

```python
StopUsingItemClientEvent(playerId: str, itemDict: Dict[str, Any]) -> Any
```

- playerId: str，玩家实体 id。
- itemDict: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### UIContainerItemChangedServerEvent

<Server/>

合成容器物品发生变化时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UIContainerItemChangedServerEvent(
    playerId: str,
    slot: int,
    oldItemDict: Dict[str, Any],
    newItemDict: Dict[str, Any],
) -> Any
```

- playerId: str，玩家实体 id。
- slot: int，容器槽位，含义见：[容器类型枚举](https://mc.163.com/newdev/docs/api/meijuzhi/PlayerUISlot.html)。
- oldItemDict: Dict[str, Any]，旧物品，格式参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- newItemDict: Dict[str, Any]，生成的物品，格式参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

**备注**

- 合成容器包括工作台、铁砧、附魔台、织布机、砂轮、切石机、制图台、锻造台，输入物品发生变化时会触发本事件。
- 可通过容器槽位区分不同的生成容器类型。
- 合成容器的生成槽位生成物品时不触发本事件，生成物品可通过 [CraftItemOutputChangeServerEvent](/docs/docs/scripts/modapi/events/item#craftitemoutputchangeserverevent) 监听。
- 储物容器(箱子，潜影箱)，熔炉，酿造台，发射器，投掷器，漏斗，炼药锅，唱片机，高炉，烟熏炉中物品发生变化不会触发此事件，此类容器可通过 [ContainerItemChangedServerEvent](/docs/docs/scripts/modapi/events/item#containeritemchangedserverevent) 监听。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from mod_log import logger as logger
# 监听引擎的事件
self.ListenForEvent(serverApi.GetEngineNamespace(),
                    serverApi.GetEngineSystemName(),
                    "UIContainerItemChangedServerEvent",
                    self, self.OnUIContainerItemChangedServerEvent)

def OnUIContainerItemChangedServerEvent(self, args):
    playerId = args['playerId']
    logger.info("OnUIContainerItemChangedServerEvent args:%s", args)
    if args['slot'] == serverApi.GetMinecraftEnum().PlayerUISlot.GrindstoneInput:
        print '砂轮输入位发生变化'
```

</TabItem>
</Tabs>

---
