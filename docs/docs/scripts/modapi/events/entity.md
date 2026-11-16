---
sidebar_position: 2
---

# 实体

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录实体相关的事件，共 42 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/shiti.html"/>

---

### ActorHurtServerEvent

<Server/>

触发时机：生物（包括玩家）受伤时触发。

```python
ActorHurtServerEvent(entityId: str, cause: str, damage: float, absorbedDamage: int, customTag: str) -> Any
```

- entityId: str，生物 Id。
- cause: str，伤害来源，详见 Minecraft 枚举值文档的[ActorDamageCause](https://mc.163.com/newdev/docs/api/meijuzhi/ActorDamageCause.html)。
- damage: float，伤害值（被伤害吸收后的值），不可修改。
- absorbedDamage: int，被伤害吸收效果吸收的伤害值。
- customTag: str，使用[Hurt 接口](https://mc.163.com/newdev/docs/api/jiekou/shiti/xingwei.html#hurt)传入的自定义伤害类型。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ActuallyHurtServerEvent

<Server/>

实体实际受到伤害时触发，相比于 [DamageEvent](/docs/docs/scripts/modapi/events/entity#damageevent)，该伤害为经过护甲及 buff 计算后，实际的扣血量。

```python
ActuallyHurtServerEvent(
    srcId: str,
    projectileId: str,
    entityId: str,
    damage: float,
    invulnerableTime: int,
    lastHurt: float,
    cause: str,
    customTag: str,
) -> Any
```

- srcId: str，伤害源 id。
- projectileId: str，投射物 id。
- entityId: str，被伤害 id。
- damage: float，伤害值（被伤害吸收后的值），允许修改，设置为 0 则此次造成的伤害为 0，若设置数值和原来一样则视为没有修改。
- invulnerableTime: int，实体受击后，剩余的无懈可击帧数，在无懈可击时间内，damage 和 damage_f 为超过上次伤害的部分。
- lastHurt: float，实体上次受到的伤害。
- cause: str，伤害来源，详见 Minecraft 枚举值文档的[ActorDamageCause](https://mc.163.com/newdev/docs/api/meijuzhi/ActorDamageCause.html)。
- customTag: str，使用[Hurt 接口](https://mc.163.com/newdev/docs/api/jiekou/shiti/xingwei.html#hurt)传入的自定义伤害类型。

**备注**

- 药水与状态效果造成的伤害不触发，可以使用 [ActorHurtServerEvent](/docs/docs/scripts/modapi/events/entity#actorhurtserverevent)。
- 为了游戏运行效率请尽可能避免将火的伤害设置为 0，因为这样会导致大量触发该事件。
- 若要修改 damage 的值，请确保修改后的值与原值不同，且支持转换为浮点型，否则引擎会忽略这次修改。
- 青蛙、山羊跳跃落地时也会触发此伤害事件，但它们的掉落伤害实际会有减免，青蛙减少 5，山羊减少 10。
- 在无懈可击时间内，只要实体受到高于上次受击的伤害，可以连续触发不受 [SetHurtCD](/docs/docs/scripts/modapi/world/game_rules#sethurtcd) 影响，如实体连续受到 1 伤害，如果在本事件中修改 damage 为 0.5，则引擎会认为每次都有 0.5 的溢出伤害，可以通过 invulnerableTime 和 lastHurt 来判断是否取消这次伤害。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AddEffectServerEvent

<Server/>

触发时机：实体获得状态效果时。

```python
AddEffectServerEvent(
    entityId: str,
    effectName: str,
    effectDuration: int,
    effectAmplifier: int,
    damage: float,
) -> Any
```

- entityId: str，实体 id。
- effectName: str，实体获得状态效果的名字。
- effectDuration: int，状态效果的持续时间，单位秒。
- effectAmplifier: int，状态效果的放大倍数。
- damage: float，状态造成的伤害值（真实扣除生命值的量）。只有持续时间为 0 时有用。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ApproachEntityClientEvent

<Client/>

玩家靠近生物时触发。

```python
ApproachEntityClientEvent(playerId: str, entityId: str) -> Any
```

- playerId: str，玩家实体 id。
- entityId: str，靠近的生物实体 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ChangeSwimStateServerEvent

<Server/>

触发时机：实体开始或者结束游泳时。

```python
ChangeSwimStateServerEvent(entityId: str, formState: bool, toState: bool) -> Any
```

- entityId: str，实体的唯一 ID。
- formState: bool，事件触发前，实体是否在游泳状态。
- toState: bool，事件触发后，实体是否在游泳状态。

**备注**

- 当实体的状态没有变化时，不会触发此事件，即 formState 和 toState 必定一真一假。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### DamageEvent

<Server/>

实体受到伤害时触发。

```python
DamageEvent(
    srcId: str,
    projectileId: str,
    entityId: str,
    damage: float,
    absorption: int,
    cause: str,
    knock: bool,
    ignite: bool,
    customTag: str,
) -> Any
```

- srcId: str，伤害源 id。
- projectileId: str，投射物 id。
- entityId: str，被伤害 id。
- damage: float，伤害值（被伤害吸收前的值），允许修改，设置为 0 则此次造成的伤害为 0。
- absorption: int，受到伤害时，扣除黄心前，实体拥有的黄心血量（见[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)的 ABSORPTION）。
- cause: str，伤害来源，详见 Minecraft 枚举值文档的[ActorDamageCause](https://mc.163.com/newdev/docs/api/meijuzhi/ActorDamageCause.html)。
- knock: bool，是否击退被攻击者，允许修改，设置该值为 False 则不产生击退。
- ignite: bool，是否点燃被伤害者，允许修改，设置该值为 True 产生点燃效果。
- customTag: str，使用[Hurt 接口](https://mc.163.com/newdev/docs/api/jiekou/shiti/xingwei.html#hurt)传入的自定义伤害类型。

**备注**

- damage 值会被护甲和 absorption 等吸收，不一定是最终扣血量。通过设置这个伤害值可以取消伤害，但不会取消由击退效果或者点燃效果带来的伤害。
- 该事件在实体受伤之前触发，由于部分伤害是在 tick 中处理，因此持续触发受伤时（如站在火中）会每帧触发事件（可以使用 [ActorHurtServerEvent](/docs/docs/scripts/modapi/events/entity#actorhurtserverevent) 来避免）。
- 这里的 damage 是伤害源具有的攻击伤害值，并非实体真实的扣血量，如果需要获取真实伤害，可以使用 [ActuallyHurtServerEvent](/docs/docs/scripts/modapi/events/entity#actuallyhurtserverevent) 事件。
- 当目标无法被击退时，knock 值无效。
- 药水与状态效果造成的伤害不触发，可以使用 [ActorHurtServerEvent](/docs/docs/scripts/modapi/events/entity#actorhurtserverevent)。
- 由于点燃的实现原因，此处 ignite 设置为 false 并不能取消实体的点燃效果（如果需要取消点燃效果，请通过 [OnFireHurtEvent](/docs/docs/scripts/modapi/events/entity#onfirehurtevent) 事件实现）。
- 青蛙、山羊跳跃落地时也会触发此伤害事件，但它们的掉落伤害实际会有减免，青蛙减少 5，山羊减少 10。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityChangeDimensionServerEvent

<Server/>

实体维度改变时服务端抛出。

```python
EntityChangeDimensionServerEvent(
    entityId: str,
    fromDimensionId: int,
    toDimensionId: int,
    fromX: float,
    fromY: float,
    fromZ: float,
    toX: float,
    toY: float,
    toZ: float,
) -> Any
```

- entityId: str，实体 id。
- fromDimensionId: int，维度改变前的维度。
- toDimensionId: int，维度改变后的维度。
- fromX: float，改变前的位置 x。
- fromY: float，改变前的位置 Y。
- fromZ: float，改变前的位置 Z。
- toX: float，改变后的位置 x。
- toY: float，改变后的位置 Y。
- toZ: float，改变后的位置 Z。

**备注**

- 实体转移维度时，如果对应维度的对应位置的区块尚未加载，实体会缓存在维度自身的缓冲区中，直到对应区块被加载时才会创建对应的实体，此事件的抛出只代表实体从原维度消失，不代表必定会在对应维度出现。
- 注意，玩家维度改变时不触发该事件，而是会触发 [DimensionChangeServerEvent](/docs/docs/scripts/modapi/events/player#dimensionchangeserverevent) 事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityDefinitionsEventServerEvent

<Server/>

触发时机：生物定义 json 文件中设置的 event 触发时同时触发。生物行为变更事件。

```python
EntityDefinitionsEventServerEvent(entityId: str, eventName: str) -> Any
```

- entityId: str，生物 id。
- eventName: str，触发的事件名称。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityDieLoottableAfterServerEvent

<Server/>

触发时机：生物死亡掉落物品之后。

```python
EntityDieLoottableAfterServerEvent(
    dieEntityId: str,
    attacker: str,
    itemList: List[Dict[str, Any]],
    itemEntityIdList: List[str],
) -> Any
```

- dieEntityId: str，死亡实体的 entityId。
- attacker: str，伤害来源的 entityId。
- itemList: List[Dict[str, Any]]，掉落物品列表，每个元素为一个 itemDict，格式可参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- itemEntityIdList: List[str]，掉落物品 entityId 列表。

**备注**

- 该事件为生物死亡掉落物品生成后触发，可以得到掉落物的 id 列表，如果需要更改掉落物，请使用 [EntityDieLoottableServerEvent](/docs/docs/scripts/modapi/events/entity#entitydieloottableserverevent)。
- 该事件在生物死亡后会触发，无论是否掉落物品，因此掉落物品列表可能存在为空的情况。
- 掉落物不包含玩家或生物携带以及背包内的物品，若要获取死亡后由背包扔出的物品请参考 [EntityDroppedItemServerEvent](/docs/docs/scripts/modapi/events/entity#entitydroppeditemserverevent) 事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityDieLoottableServerEvent

<Server/>

触发时机：生物死亡掉落物品时。

```python
EntityDieLoottableServerEvent(
    dieEntityId: str,
    attacker: str,
    itemList: List[Dict[str, Any]],
    dirty: bool = False,
) -> Any
```

- dieEntityId: str，死亡实体的 entityId。
- attacker: str，伤害来源的 entityId。
- itemList: List[Dict[str, Any]]，掉落物品列表，每个元素为一个 itemDict，格式可参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- dirty: bool，默认为 False，如果需要修改掉落列表需将该值设为 True。

**备注**

- 只有当 dirty 为 True 时才会重新读取 item 列表并生成对应的掉落物，如果不需要修改掉落结果的话请勿随意修改 dirty 值。
- 该事件在生物死亡后会触发，无论是否掉落物品，因此掉落物品列表可能存在为空的情况。
- 掉落物不包含玩家或生物携带以及背包内的物品，若要获取死亡后由背包扔出的物品请参考 [EntityDroppedItemServerEvent](/docs/docs/scripts/modapi/events/entity#entitydroppeditemserverevent) 事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityDroppedItemServerEvent

<Server/>

触发时机：生物扔出物品时触发。

```python
EntityDroppedItemServerEvent(entityId: str, itemDict: Dict[str, Any], itemEntityId: str) -> Any
```

- entityId: str，生物 Id。
- itemDict: Dict[str, Any]，扔出的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- itemEntityId: str，物品实体 Id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityEffectDamageServerEvent

<Server/>

生物受到状态伤害/回复事件。

```python
EntityEffectDamageServerEvent(
    entityId: str,
    damage: float,
    attributeBuffType: int,
    duration: float,
    lifeTimer: float,
    isInstantaneous: bool,
    cause: str,
) -> Any
```

- entityId: str，实体 id。
- damage: float，伤害值（伤害吸收后实际扣血量），负数表示生命回复量。
- attributeBuffType: int，状态类型，取值范围 0~12，参考[AttributeBuffType](https://mc.163.com/newdev/docs/api/meijuzhi/AttributeBuffType.html)。
- duration: float，状态持续时间，单位秒（s）。
- lifeTimer: float，状态生命时间，单位秒（s）。
- isInstantaneous: bool，是否为立即生效状态。
- cause: str，伤害来源，详见 Minecraft 枚举值文档的[ActorDamageCause](https://mc.163.com/newdev/docs/api/meijuzhi/ActorDamageCause.html)。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityLoadScriptEvent

<Server/>

数据库加载实体自定义数据时触发。

```python
EntityLoadScriptEvent(args: List[Any]) -> Any
```

- args: List[Any]，该事件的参数为长度为 2 的 list，而非 dict，其中 list 的第一个元素为实体 id。

**备注**

- 只有使用过 extraData 组件的 [SetExtraData](/docs/docs/scripts/modapi/world/custom_data#setextradata) 接口的实体才有此事件，触发时可以通过 extraData 组件的 [GetExtraData](/docs/docs/scripts/modapi/world/custom_data#getextradata) 或 [GetWholeExtraData](/docs/docs/scripts/modapi/world/custom_data#getwholeextradata) 接口获取该实体的自定义数据。

---

### EntityModelChangedClientEvent

<Client/>

触发时机：实体模型切换时触发。

```python
EntityModelChangedClientEvent(entityId: str, newModel: str, oldModel: str) -> Any
```

- entityId: str，实体 id。
- newModel: str，新的模型名字。
- oldModel: str，原来的模型名字。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityMotionStartServerEvent

<Server/>

实体运动器开始事件。实体（包含玩家）添加运动器后，运动器开始运行时触发。

```python
EntityMotionStartServerEvent(motionId: int, entityId: str) -> Any
```

- motionId: int，运动器 id。
- entityId: str，实体 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityMotionStopServerEvent

<Server/>

实体运动器停止事件。实体（包含玩家）添加运动器并开始运行后，运动器自动停止时触发。

```python
EntityMotionStopServerEvent(motionId: int, entityId: str, remove: bool = True) -> Any
```

- motionId: int，运动器 id。
- entityId: str，实体 id。
- remove: bool，是否移除该运动器，设置为 False 则保留，默认为 True，即运动器停止后自动移除，该参数设置只对非玩家实体有效。

**备注**

- 注意：该事件触发表示运动器播放顺利完成，手动调用的 [StopEntityMotion](/docs/docs/scripts/modapi/entity/behavior#stopentitymotion)、[RemoveEntityMotion](/docs/docs/scripts/modapi/entity/behavior#removeentitymotion) 以及实体被销毁导致的运动器停止不会触发该事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityPickupItemServerEvent

<Server/>

有 minecraft:behavior.pickup_items 行为的生物拾取物品时触发该事件，例如村民拾取面包、猪灵拾取金锭。

```python
EntityPickupItemServerEvent(entityId: str, itemDict: Dict[str, Any], secondaryActor: str) -> Any
```

- entityId: str，生物 Id。
- itemDict: Dict[str, Any]，拾取的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- secondaryActor: str，物品给予者 id（一般是玩家），如果不存在给予者的话，这里为空字符串。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityStartRidingEvent

<Server/>

当实体骑乘上另一个实体时触发。

```python
EntityStartRidingEvent(id: str, rideId: str) -> Any
```

- id: str，乘骑者实体 id。
- rideId: str，被乘骑者实体 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityStopRidingEvent

<Server/>

触发时机：当实体停止骑乘时。

```python
EntityStopRidingEvent(
    id: str,
    rideId: str,
    exitFromRider: bool,
    entityIsBeingDestroyed: bool,
    switchingRides: bool,
    cancel: bool,
) -> Any
```

- id: str，实体 id。
- rideId: str，坐骑 id。
- exitFromRider: bool，是否下坐骑。
- entityIsBeingDestroyed: bool，坐骑是否将要销毁。
- switchingRides: bool，是否换乘坐骑。
- cancel: bool，设置为 True 可以取消（需要与客户端事件一同取消）。

**备注**

- 以下情况不允许取消 ride 组件 [StopEntityRiding](/docs/docs/scripts/modapi/entity/behavior#stopentityriding) 接口玩家传送时坐骑死亡时玩家睡觉时玩家死亡时未驯服的马怕水的生物坐骑进入水里切换维度。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Client/>

触发时机：当实体停止骑乘时。

```python
EntityStopRidingEvent(
    id: str,
    rideId: str,
    exitFromRider: bool,
    entityIsBeingDestroyed: bool,
    switchingRides: bool,
    cancel: bool,
) -> Any
```

- id: str，实体 id。
- rideId: str，坐骑 id。
- exitFromRider: bool，是否下坐骑。
- entityIsBeingDestroyed: bool，坐骑是否将要销毁。
- switchingRides: bool，是否换乘坐骑。
- cancel: bool，设置为 True 可以取消（需要与服务端事件一同取消）。

**备注**

- 以下情况不允许取消 ride 组件 [StopEntityRiding](/docs/docs/scripts/modapi/entity/behavior#stopentityriding) 接口玩家传送时坐骑死亡时玩家睡觉时玩家死亡时未驯服的马怕水的生物坐骑进入水里切换维度。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityTickServerEvent

<Server/>

实体 tick 时触发。该事件为 20 帧每秒。需要使用 AddEntityTickEventWhiteList 添加触发该事件的实体类型白名单。

```python
EntityTickServerEvent(entityId: str, identifier: str) -> Any
```

- entityId: str，实体 id。
- identifier: str，实体 identifier。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Server/>

```python
EntityTickServerEvent() -> Any
```

<Server/>

模块级函数，直接调用。

添加实体类型到 EntityTickServerEvent 事件的触发白名单。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EntityTickServerEvent(identifier: str) -> bool
```

- identifier: str，实体的类型名，原版的实体需要加上 minecraft 命名空间。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# 让牛触发EntityTickServerEvent事件
serverApi.AddEntityTickEventWhiteList('minecraft:cow')
```

</TabItem>
</Tabs>

---

### HealthChangeBeforeServerEvent

<Server/>

生物生命值或最大生命值发生变化之前触发。

```python
HealthChangeBeforeServerEvent(entityId: str, from: float, to: float, byScript: bool, cancel: bool) -> Any
```

- entityId: str，实体 id。
- from: float，变化前的生命值。
- to: float，将要变化到的生命值，cancel 设置为 True 时可以取消该变化，但是此参数不变。
- byScript: bool，是否通过 [SetAttrValue](/docs/docs/scripts/modapi/entity/attribute#setattrvalue) 或 [SetAttrMaxValue](/docs/docs/scripts/modapi/entity/attribute#setattrmaxvalue) 调用产生的变化。
- cancel: bool，是否取消该变化。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### HealthChangeClientEvent

<Client/>

生物生命值发生变化时触发。

```python
HealthChangeClientEvent(entityId: str, from: float, to: float) -> Any
```

- entityId: str，实体 id。
- from: float，变化前的生命值。
- to: float，变化后的生命值。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### HealthChangeServerEvent

<Server/>

生物生命值发生变化时触发。

```python
HealthChangeServerEvent(entityId: str, from: float, to: float, byScript: bool) -> Any
```

- entityId: str，实体 id。
- from: float，变化前的生命值。
- to: float，变化后的生命值。
- byScript: bool，是否通过 [SetAttrValue](/docs/docs/scripts/modapi/entity/attribute#setattrvalue) 或 [SetAttrMaxValue](/docs/docs/scripts/modapi/entity/attribute#setattrmaxvalue) 调用产生的变化。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### LeaveEntityClientEvent

<Client/>

玩家远离生物时触发。

```python
LeaveEntityClientEvent(playerId: str, entityId: str) -> Any
```

- playerId: str，玩家实体 id。
- entityId: str，远离的生物实体 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### MobDieEvent

<Server/>

实体死亡时触发。

```python
MobDieEvent(id: str, attacker: str, cause: str, customTag: str) -> Any
```

- id: str，实体 id。
- attacker: str，伤害来源 id。
- cause: str，伤害来源，详见 Minecraft 枚举值文档的[ActorDamageCause](https://mc.163.com/newdev/docs/api/meijuzhi/ActorDamageCause.html)。
- customTag: str，使用[Hurt 接口](https://mc.163.com/newdev/docs/api/jiekou/shiti/xingwei.html#hurt)传入的自定义伤害类型。

**备注**

- 注意：不能在该事件回调中对此玩家手持物品进行修改，如 [SpawnItemToPlayerCarried](/docs/docs/scripts/modapi/player/container#spawnitemtoplayercarried)、[ChangePlayerItemTipsAndExtraId](/docs/docs/scripts/modapi/player/container#changeplayeritemtipsandextraid) 等接口。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### MobGriefingBlockServerEvent

<Server/>

环境生物改变方块时触发，触发的时机与 mobgriefing 游戏规则影响的行为相同。

```python
MobGriefingBlockServerEvent(
    cancel: bool = False,
    blockX: int,
    blockY: int,
    blockZ: int,
    entityId: str,
    blockName: str,
    dimensionId: int,
) -> Any
```

- cancel: bool，是否允许触发，默认为 False，若设为 True，可阻止触发后续物理交互事件。
- blockX: int，方块 x 坐标。
- blockY: int，方块 y 坐标。
- blockZ: int，方块 z 坐标。
- entityId: str，触发的 entity 的唯一 ID。
- blockName: str，方块的 identifier，包含命名空间及名称。
- dimensionId: int，维度 id。

**备注**

- 触发的时机包括：生物踩踏耕地、破坏单个方块、破门、火矢点燃方块、凋灵 boss 破坏方块、末影龙破坏方块、末影人捡起方块、蠹虫破坏被虫蚀的方块、蠹虫把方块变成被虫蚀的方块、凋零杀死生物生成凋零玫瑰、生物踩坏海龟蛋。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnFireHurtEvent

<Server/>

生物受到火焰伤害时触发。

```python
OnFireHurtEvent(victim: str, src: str, fireTime: float, cancel: bool, cancelIgnite: bool) -> Any
```

- victim: str，受伤实体 id。
- src: str，火焰创建者 id。
- fireTime: float，着火时间，单位秒, 不支持修改。
- cancel: bool，是否取消此处火焰伤害。
- cancelIgnite: bool，是否取消点燃效果。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnGroundClientEvent

<Client/>

实体着地事件。玩家，沙子，铁砧，掉落的物品，点燃的 TNT 掉落地面时触发，其余实体着地不触发。

```python
OnGroundClientEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 因为掉落是服务端与客户端各自计算的，对于掉落的方块，有时会出现服务端先着地，然后把 FallingBlock 实体移除掉了，导致客户端没触发着地事件的情况。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnGroundServerEvent

<Server/>

实体着地事件。实体，掉落的物品，点燃的 TNT 掉落地面时触发。

```python
OnGroundServerEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 不支持抛射物实体。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnKnockBackServerEvent

<Server/>

实体被击退时触发。

```python
OnKnockBackServerEvent(id: str) -> Any
```

- id: str，实体 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnMobHitBlockServerEvent

<Server/>

触发时机：通过 OpenMobHitBlockDetection 打开方块碰撞检测后，当生物（不包括玩家）碰撞到方块时触发该事件。

```python
OnMobHitBlockServerEvent(
    entityId: str,
    posX: int,
    posY: int,
    posZ: int,
    blockId: str,
    auxValue: int,
    dimensionId: int,
) -> Any
```

- entityId: str，碰撞到方块的生物 Id。
- posX: int，碰撞方块 x 坐标。
- posY: int，碰撞方块 y 坐标。
- posZ: int，碰撞方块 z 坐标。
- blockId: str，碰撞方块的 identifier。
- auxValue: int，碰撞方块的附加值。
- dimensionId: int，维度 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Server/>

```python
OnMobHitBlockServerEvent() -> Any
```

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

开启碰撞方块的检测，开启后，生物（不包括玩家）碰撞到方块时会触发 OnMobHitBlockServerEvent 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OnMobHitBlockServerEvent(entityId: str, precision: float) -> bool
```

- entityId: str，生物的实体 Id。
- precision: float，碰撞检测精度，参数需要在区间[0, 1)，值越小，表示碰撞检测精度越高（可以理解为轻轻碰一下就能触发）。

**返回值**：bool，是否设置成功。

**备注**

- 注：该碰撞检测会屏蔽草、空气、火、高草四种方块。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.OpenMobHitBlockDetection("-123456",0.0001)
```

</TabItem>
</Tabs>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

关闭碰撞方块的检测，关闭后，生物（不包括玩家）碰撞到方块时将不会触发 OnMobHitBlockServerEvent 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OnMobHitBlockServerEvent(entityId: str) -> bool
```

- entityId: str，生物的实体 Id。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.CloseMobHitBlockDetection("-123456")
```

</TabItem>
</Tabs>

---

### OnMobHitMobClientEvent

<Client/>

触发时机：通过 OpenPlayerHitMobDetection 打开生物碰撞检测后，当生物间（包含玩家）碰撞时触发该事件。注：客户端和服务端分别作碰撞检测，可能两个事件返回的略有差异。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OnMobHitMobClientEvent(mobId: str, hittedMobList: List[str]) -> Any
```

- mobId: str，当前生物的 id。
- hittedMobList: List[str]，当前生物碰撞到的其他所有生物 id 的 list。

**备注**

- 本事件代替原有的 OnPlayerHitMobClientEvent 事件。
- 监听本事件会导致客户端在实体较多时严重掉帧，建议监听服务端版本事件 [OnMobHitMobServerEvent](/docs/docs/scripts/modapi/events/entity#onmobhitmobserverevent)。

</TabItem>
<TabItem value="示例" label="示例">

```python
# ClientSystem
import mod.client.extraClientApi as clientApi
self.ListenForEvent(clientApi.GetEngineNamespace(),
                    clientApi.GetEngineSystemName(),
                    "OnMobHitMobClientEvent",
                    self, self.OnMobHitMobClientEvent)
def OnMobHitMobClientEvent(self, args):
    mobId = args.get('mobId', '')
    hittedMobs = args.get('hittedMobList', [])
```

</TabItem>
</Tabs>

<Client/>

```python
OnMobHitMobClientEvent() -> Any
```

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

开启对其他生物的碰撞检测，开启后和生物间发生碰撞时会触发 OnMobHitMobClientEvent 事件。（该接口对生物同样有效）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OnMobHitMobClientEvent() -> bool
```


**返回值**：bool，是否开启成功。

**备注**

- 该接口对生物同样有效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.OpenPlayerHitMobDetection()
```

</TabItem>
</Tabs>

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

关闭碰撞生物的检测，关闭后将不会触发 OnMobHitMobClientEvent 事件。（该接口对生物同样有效）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OnMobHitMobClientEvent() -> bool
```


**返回值**：bool，是否关闭成功。

**备注**

- 该接口对生物同样有效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.ClosePlayerHitMobDetection()
```

</TabItem>
</Tabs>

---

### OnMobHitMobServerEvent

<Server/>

触发时机：通过 OpenPlayerHitMobDetection 打开生物碰撞检测后，当生物间（包含玩家）碰撞时触发该事件。注：客户端和服务端分别作碰撞检测，可能两个事件返回的略有差异。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OnMobHitMobServerEvent(mobId: str, hittedMobList: List[str]) -> Any
```

- mobId: str，当前生物的 id。
- hittedMobList: List[str]，当前生物碰撞到的其他所有生物 id 的 list。

**备注**

- 本事件代替原有的 OnPlayerHitMobServerEvent 事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
# ServerSystem
import mod.server.extraServerApi as serverApi
self.ListenForEvent(serverApi.GetEngineNamespace(),
                    serverApi.GetEngineSystemName(),
                    "OnMobHitMobServerEvent",
                    self, self.OnMobHitMobServerEvent)
def OnMobHitMobServerEvent(self, args):
    mobId = args.get('mobId', '')
    hittedMobs = args.get('hittedMobList', [])
```

</TabItem>
</Tabs>

<Server/>

```python
OnMobHitMobServerEvent() -> Any
```

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

开启对其他生物的碰撞检测，开启后和生物间发生碰撞时会触发 OnMobHitMobServerEvent 事件。（该接口对生物同样有效）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OnMobHitMobServerEvent() -> bool
```


**返回值**：bool，是否开启成功。

**备注**

- 该接口对生物同样有效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.OpenPlayerHitMobDetection()
```

</TabItem>
</Tabs>

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

关闭碰撞生物的检测，关闭后将不会触发 OnMobHitMobServerEvent 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OnMobHitMobServerEvent() -> bool
```


**返回值**：bool，是否关闭成功。

**备注**

- 该接口对生物同样有效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.ClosePlayerHitMobDetection()
```

</TabItem>
</Tabs>

---

### ProjectileCritHitEvent

<Server/>

触发时机：当抛射物与头部碰撞时触发该事件。注：需调用 OpenPlayerCritBox 开启玩家爆头后才能触发。

```python
ProjectileCritHitEvent(id: str, targetId: str) -> Any
```

- id: str，抛射物 id。
- targetId: str，碰撞目标 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Server/>

```python
ProjectileCritHitEvent() -> Any
```

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

开启玩家爆头，开启后该玩家头部被击中后会触发 ProjectileCritHitEvent 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ProjectileCritHitEvent() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.OpenPlayerCritBox()
```

</TabItem>
</Tabs>

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

关闭玩家爆头，关闭后将无法触发 ProjectileCritHitEvent 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ProjectileCritHitEvent() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.ClosePlayerCritBox()
```

</TabItem>
</Tabs>

---

### ProjectileDoHitEffectEvent

<Server/>

触发时机：当抛射物碰撞时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ProjectileDoHitEffectEvent(
    id: str,
    hitTargetType: str,
    targetId: str,
    hitFace: int,
    x: float,
    y: float,
    z: float,
    blockPosX: int,
    blockPosY: int,
    blockPosZ: int,
    srcId: str,
    cancel: bool,
) -> Any
```

- id: str，抛射物 id。
- hitTargetType: str，碰撞目标类型,'ENTITY'或是'BLOCK'。
- targetId: str，碰撞目标 id。
- hitFace: int，撞击在方块上的面 id，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- x: float，碰撞 x 坐标。
- y: float，碰撞 y 坐标。
- z: float，碰撞 z 坐标。
- blockPosX: int，碰撞是方块时，方块 x 坐标。
- blockPosY: int，碰撞是方块时，方块 y 坐标。
- blockPosZ: int，碰撞是方块时，方块 z 坐标。
- srcId: str，创建者 id。
- cancel: bool，是否取消这个碰撞事件，若取消可以设置为 True。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
# ServerSystem
import mod.server.extraServerApi as serverApi
# 监听引擎的事件 ：self指ServerSystem类的实例  ProjectileDoHitEffectEvent是系统事件
self.ListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(),
                    "ProjectileDoHitEffectEvent", self, self.OnProjectileDoHitEffectEvent)
def OnProjectileDoHitEffectEvent(self, args):
    # 设为True后，将取消这次的抛射物碰撞事件
    args["cancel"] = True
```

</TabItem>
</Tabs>

---

### RefreshEffectServerEvent

<Server/>

触发时机：实体身上状态效果更新时触发，更新条件 1、新增状态等级较高，更新状态等级及时间；2、新增状态等级不变，时间较长，更新状态持续时间。

```python
RefreshEffectServerEvent(
    entityId: str,
    effectName: str,
    effectDuration: int,
    effectAmplifier: int,
    damage: float,
) -> Any
```

- entityId: str，实体 id。
- effectName: str，更新状态效果的名字。
- effectDuration: int，更新后状态效果剩余持续时间，单位秒。
- effectAmplifier: int，更新后的状态效果放大倍数。
- damage: float，状态造成的伤害值，如药水。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### RemoveEffectServerEvent

<Server/>

触发时机：实体身上状态效果被移除时。

```python
RemoveEffectServerEvent(entityId: str, effectName: str, effectDuration: int, effectAmplifier: int) -> Any
```

- entityId: str，实体 id。
- effectName: str，被移除状态效果的名字。
- effectDuration: int，被移除状态效果的剩余持续时间，单位秒。
- effectAmplifier: int，被移除状态效果的放大倍数。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### SpawnProjectileServerEvent

<Server/>

触发时机：抛射物生成时触发。

```python
SpawnProjectileServerEvent(projectileId: str, projectileIdentifier: str, spawnerId: str) -> Any
```

- projectileId: str，抛射物的实体 id。
- projectileIdentifier: str，抛射物的 identifier。
- spawnerId: str，发射者的实体 id，没有发射者时为-1。

**备注**

- 该事件里无法获取弹射物实体的 auxvalue。如有需要可以延迟一帧获取，或者在 [ProjectileDoHitEffectEvent](/docs/docs/scripts/modapi/events/entity#projectiledohiteffectevent) 获取。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### StartRidingClientEvent

<Client/>

触发时机：一个实体即将骑乘另外一个实体。

```python
StartRidingClientEvent(actorId: str, victimId: str) -> Any
```

- actorId: str，骑乘者的唯一 ID。
- victimId: str，被骑乘实体的唯一 ID。

**备注**

- 如果需要修改 cancel，请通过服务端事件 [StartRidingServerEvent](/docs/docs/scripts/modapi/events/entity#startridingserverevent) 同步修改，客户端触发该事件时，实体已经骑乘成功。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### StartRidingServerEvent

<Server/>

触发时机：一个实体即将骑乘另外一个实体。

```python
StartRidingServerEvent(cancel: bool = False, actorId: str, victimId: str) -> Any
```

- cancel: bool，是否允许触发，默认为 False，若设为 True，可阻止触发后续的实体交互事件。
- actorId: str，骑乘者的唯一 ID。
- victimId: str，被骑乘实体的唯一 ID。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### WillAddEffectServerEvent

<Server/>

触发时机：实体即将获得状态效果前。

```python
WillAddEffectServerEvent(
    entityId: str,
    effectName: str,
    effectDuration: int,
    effectAmplifier: int,
    cancel: bool,
    damage: float,
) -> Any
```

- entityId: str，实体 id。
- effectName: str，实体获得状态效果的名字。
- effectDuration: int，状态效果的持续时间，单位秒。
- effectAmplifier: int，状态效果的放大倍数。
- cancel: bool，设置为 True 可以取消。
- damage: float，状态将会造成的伤害值，如药水；需要注意，该值不一定是最终的伤害值，例如被伤害吸收效果扣除。只有持续时间为 0 时有用。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### WillTeleportToServerEvent

<Server/>

实体即将传送或切换维度。

```python
WillTeleportToServerEvent(
    cancel: bool = False,
    entityId: str,
    fromDimensionId: int,
    toDimensionId: int,
    fromX: int,
    fromY: int,
    fromZ: int,
    toX: int,
    toY: int,
    toZ: int,
    cause: str,
) -> Any
```

- cancel: bool，是否允许触发，默认为 False，若设为 True，可阻止触发后续的传送。
- entityId: str，实体的唯一 ID。
- fromDimensionId: int，传送前所在的维度。
- toDimensionId: int，传送后的目标维度。
- fromX: int，传送前所在的 x 坐标。
- fromY: int，传送前所在的 y 坐标。
- fromZ: int，传送前所在的 z 坐标。
- toX: int，传送目标地点的 x 坐标。
- toY: int，传送目标地点的 y 坐标。
- toZ: int，传送目标地点的 z 坐标。
- cause: str，传送理由，详情见 MinecraftEnum.EntityTeleportCause。

**备注**

- 假如目标维度尚未在内存中创建（即服务器启动之后，到传送之前，没有玩家进入过这个维度），那么此时事件中返回的目标地点坐标是算法生成的，不能保证正确。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---
