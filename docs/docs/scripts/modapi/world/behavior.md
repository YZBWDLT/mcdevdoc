---
sidebar_position: 11
---

# 行为

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录行为相关的接口，共 3 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/xingwei.html"/>

---

### UseItemAttackEntity

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

使用指定物品攻击某个实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UseItemAttackEntity(
    itemDict: Dict[str, Any],
    entityId: str,
    cause: str,
    attackerPos: Optional[Tuple[float, float, float]] = None,
    knocked: bool = False,
    customTag: str,
    damageFormula: Optional[str] = None,
) -> Dict[str, Any]
```

- itemDict: Dict[str, Any]，物品字典数据。
- entityId: str，攻击实体 id。
- cause: str，伤害类型，默认值是 EntityAttack，详见 Minecraft 枚举值文档的[ActorDamageCause](https://mc.163.com/newdev/docs/api/meijuzhi/ActorDamageCause.html)。
- attackerPos: Optional[Tuple[float, float, float]]，伤害来源坐标，默认值为 None，该参数会影响击退效果的计算。
- knocked: bool，是否击退，默认值为 False，如果设置为 True，需同时设置 attackerPos。
- customTag: str，标识自定义伤害来源，只在 cause 为 Custom 生效，可在 [ActorHurtServerEvent](/docs/docs/scripts/modapi/events/entity#actorhurtserverevent)、[ActuallyHurtServerEvent](/docs/docs/scripts/modapi/events/entity#actuallyhurtserverevent)、[DamageEvent](/docs/docs/scripts/modapi/events/entity#damageevent)、[PlayerHurtEvent](/docs/docs/scripts/modapi/events/player#playerhurtevent)、[PlayerDieEvent](/docs/docs/scripts/modapi/events/player#playerdieevent)、[MobDieEvent](/docs/docs/scripts/modapi/events/entity#mobdieevent) 监听到标识。
- damageFormula: Optional[str]，伤害计算公式的字符串，公式格式参考以下备注，默认值为 None。

**返回值**：Dict[str, Any]，成功：返回使用过后的物品字典；失败：返回 None。

**备注**

- 无攻击力的物品，将会没有伤害（接口调用返回 None）。
- 有耐久的物品在攻击后，将会扣除部分耐久。
- 可通过 [DamageEvent](/docs/docs/scripts/modapi/events/entity#damageevent) 等事件修改伤害值。
- 如果 itemDict 写入了不可添加到该物品的附魔，该附魔效果将不会生效，返回的 itemDict 也不会带有该附魔信息。如果有需求，可考虑将附魔信息写入 userData。
- 公式参考：(%value% * 2 + 10.5)，其中%value%表示初始的伤害值，仅能使用+-*/以及()，仅能使用单条公式，数值是做浮点运算。公式字符串的长度必须小于 256。
- 如果公式解析失败，则会返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
itemDict = {
    "newItemName": "minecraft:iron_sword",
    "newAuxValue": 0,
    "count": 1,
    "durability": 256,
    "enchantData": [(9,1)]
}
print(comp.UseItemAttackEntity(itemDict, entityId))
```

</TabItem>
</Tabs>

---

### UseItemToEntity

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

模拟对某个实体使用物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UseItemToEntity(itemDict: Dict[str, Any], entityId: str) -> Dict[str, Any]
```

- itemDict: Dict[str, Any]，物品字典数据。
- entityId: str，目标实体 id。

**返回值**：Dict[str, Any]，成功：返回使用过后的物品字典；失败：返回 None。

**备注**

- 如果对实体使用物品成功后，接口返回的 itemDict 的重要数据（如 newItemName、count、durability 等等）没有发生变化，此时的意思是接口使用成功，但物品没有发生更改，需开发者注意甄别。
- 部分需要使用者的行为，调用该接口会返回没有发生变化的 itemDict。如与实体交易、乘骑实体、让玩家的宠物坐下、让动物信任自己等等。
- 使用该接口对实体使用拴绳，会执行成功，但拴绳不会出现。
- 使用该接口驯服实体，会导致实体的 owner 是一个不存在的实体 id。
- 对实体使用物品是否能成功，取决于行为组件中的 filter 规则，如 minecraft:interact、minecraft:breedable 组件等等；其中 is_owner 必定校验不通过，如给狼穿戴狼铠。
- 该接口不会触发事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
itemDict = {
    "newItemName": "minecraft:carrot",
    "newAuxValue": 0,
    "count": 1
}
print( gameComp.UseItemToEntity(itemDict, entityId) )
```

</TabItem>
</Tabs>

---

### UseItemToPos

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

对某个方块使用指定物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UseItemToPos(
    itemDict: Dict[str, Any],
    dimensionId: int,
    pos: Tuple[int, int, int],
    facing: int,
) -> Dict[str, Any]
```

- itemDict: Dict[str, Any]，使用的物品字典数据。
- dimensionId: int，坐标维度 id。
- pos: Tuple[int, int, int]，方块坐标。
- facing: int，点击方块的面向，详见[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。

**返回值**：Dict[str, Any]，成功：返回使用过后的物品字典；失败：返回 None。

**备注**

- 如果物品使用后会返还新物品，则会在 pos 位置掉落出来。如水桶、水瓶等。
- 如果 pos 所在的方块、或者手持物品的逻辑涉及到玩家，则会使用失败，如对栅栏使用拴绳、对方块使用磁石指针、使用床、使用工作台、使用告示牌方块等。
- 如果方块本身有使用的功能、且不依赖物品，则该接口返回的 itemDict 的重要数据（如 newItemName、count、durability 等等）不会有变化。如按钮、拉杆、门，活板门，栅栏门等。
- 如果对方块使用不正确的物品时，则该接口返回的 itemDict 的重要数据（如 newItemName、count、durability 等等）不会有变化。如对已放入物品的展示框再使用物品、对堆肥桶使用方块等。
- 使用失败（返回 None）的情况可能如下：itemDict 为空物品或错误物品字典，坐标方块为空气，坐标区块未加载，无法对方块使用该物品等等。无法摆放方块的比如：该位置有方块、有实体占位置等等。
- 使用打火石激活传送门时，会返回 None，需开发者自行做判断。
- 该接口不会触发事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
itemDict = {
    "newItemName": "minecraft:water_bucket",
    "newAuxValue": 0,
    "count": 1
}
print(comp.UseItemToPos(itemDict, 0, (30, 64, 30), 1))
```

</TabItem>
</Tabs>

---
