---
sidebar_position: 10
---

# 属性

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录属性相关的接口，共 83 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/shuxing.html"/>

---

### AddModifier

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

为指定生物增加属性修饰符。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddModifier(attrType: int, modifierId: str, amount: float, operation: int, operand: int) -> bool
```

- attrType: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。
- modifierId: str，修饰符的唯一标识符。
- amount: float，修饰符的数值。
- operation: int，[AttributeModifierOperation 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttributeModifierOperation.html)，修饰符的运算方式。
- operand: int，[AttributeOperands 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttributeOperands.html)，修饰符作用的操作数。

**返回值**：bool，添加结果，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
AttrType = serverApi.GetMinecraftEnum().AttrType
AttributeModifierOperation = serverApi.GetMinecraftEnum().AttributeModifierOperation
AttributeOperands = serverApi.GetMinecraftEnum().AttributeOperands
# 为指定生物增加修饰Health最大值的属性修饰符"testmod:health_modifier_1", 修饰方法为最大值增量+10
comp.AddModifier(AttrType.HEALTH, "testmod:health_modifier_1", 10, AttributeModifierOperation.OperationAddition, AttributeOperands.OperandMax)
```

</TabItem>
</Tabs>

---

### ChangeEntityDimension

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(entityId)`

传送实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeEntityDimension(dimensionId: int, pos: Tuple[int, int, int]) -> bool
```

- dimensionId: int，维度 id，0-主世界; 1-下界; 2-末地; 或其他自定义维度。
- pos: Tuple[int, int, int]，传送的坐标，假如输入 None，那么就优先选择目标维度的传送门作为目的地，其次使用维度坐标映射逻辑确定目的地。

**返回值**：bool，是否设置成功。

**备注**

- 该接口无法对玩家使用，玩家请使用 [ChangePlayerDimension](/docs/docs/scripts/modapi/player/behavior#changeplayerdimension)。
- 该接口只能传送到另一个维度，如果实体已经在这个维度会返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(entityId)
comp.ChangeEntityDimension(0, (0,4,0))
```

</TabItem>
</Tabs>

---

### GetAllComponentsName

<Server/> EntityComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityComponent(entityId)`

获取实体所拥有的原版组件 list。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAllComponentsName() -> List[str]
```


**返回值**：List[str]，原版组件名 list，[EntityComponentType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/EntityComponentType.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityComponent(entityId)
print comp.GetAllComponentsName()
```

</TabItem>
</Tabs>

---

### GetAllModifiers

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

获取指定生物的某属性所有属性修饰符。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAllModifiers(attrType: int) -> List[Dict[str, Any]]
```

- attrType: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。

**返回值**：List[Dict[str, Any]]，属性修饰符列表，每个元素为 dict，包含 modifierId, amount, operation, operand 字段；如果没有修饰符返回空列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
AttrType = serverApi.GetMinecraftEnum().AttrType
# 获取指定生物修饰Health的所有属性修饰符
modifiers = comp.GetAllModifiers(AttrType.HEALTH)
# 返回示例：[{"modifierId": "testmod:health_modifier_1", "amount": 10.0, "operation": 0, "operand": 1}]
```

</TabItem>
</Tabs>

---

### GetAttrMaxValue

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

获取实体的引擎属性的最大值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAttrMaxValue(type: int) -> float
```

- type: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。

**返回值**：float，属性值结果。

**备注**

- attack_damage，knockback_resistance，jump_strength 这三个值目前实现中并不会同步给客户端，因此这几个值通过客户端获取的为默认值。只有通过服务端的 [GetAttr](/docs/docs/scripts/modapi/entity/custom_attribute#getattr) 才能获取到准确值。
- 因为护甲为身上盔甲总防御值，因此目前不支持获取护甲的最大值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
comp.GetAttrMaxValue(serverApi.GetMinecraftEnum().AttrType.HEALTH)
```

</TabItem>
</Tabs>

<Client/> AttrCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateAttr(entityId)`

获取属性最大值，包括生命值，饥饿度，移速等。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAttrMaxValue(type: int) -> float
```

- type: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。

**返回值**：float，属性值结果。

**备注**

- attack_damage，knockback_resistance，jump_strength 这三个值目前实现中并不会同步给客户端，因此这几个值通过客户端获取的为默认值。只有通过服务端的 [GetAttr](/docs/docs/scripts/modapi/entity/custom_attribute#getattr) 才能获取到准确值。
- 因为护甲为身上盔甲总防御值，因此目前不支持获取护甲的最大值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateAttr(entityId)
comp.GetAttrMaxValue(clientApi.GetMinecraftEnum().AttrType.HEALTH)
```

</TabItem>
</Tabs>

---

### GetAttrValue

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

获取实体的引擎属性。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAttrValue(attrType: int) -> float
```

- attrType: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。

**返回值**：float，属性结果。

**备注**

- damage，knockback_resistance，jump_strength 这三个值目前实现中并不会同步给客户端，因此这几个值通过客户端获取的为默认值。只有通过服务端的 [GetAttr](/docs/docs/scripts/modapi/entity/custom_attribute#getattr) 才能获取到准确值。
- 当生物不存在该属性时，返回-1。部分属性的最大值默认为 1，可通过 entity 的 json 配置来设置，详见 attrType 连接。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
comp.GetAttrValue(serverApi.GetMinecraftEnum().AttrType.HEALTH)
```

</TabItem>
</Tabs>

<Client/> AttrCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateAttr(entityId)`

获取属性值，包括生命值，饥饿度，移速。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAttrValue(attrType: int) -> float
```

- attrType: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。

**返回值**：float，属性结果。

**备注**

- damage，knockback_resistance，jump_strength 这三个值目前实现中并不会同步给客户端，因此这几个值通过客户端获取的为默认值。只有通过服务端的 [GetAttr](/docs/docs/scripts/modapi/entity/custom_attribute#getattr) 才能获取到准确值。
- 当生物不存在该属性时，返回-1。部分属性的最大值默认为 1，可通过 entity 的 json 配置来设置，详见 attrType 连接。
- 护甲值，取决于身上穿戴的护甲总防御量和接口增加的额外护甲值。客户端无法获取接口增加的护甲值，建议开发者自行同步。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateAttr(entityId)
comp.GetAttrValue(clientApi.GetMinecraftEnum().AttrType.HEALTH)
```

</TabItem>
</Tabs>

---

### GetBodyRot

<Client/> RotComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateRot(entityId)`

获取实体的身体的角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBodyRot() -> float
```


**返回值**：float，身体绕竖直方向的角度，单位是角度，如果没有身体，返回为 0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateRot(entityId)
y = comp.GetBodyRot()
```

</TabItem>
</Tabs>

---

### GetCurrentAirSupply

<Server/> BreathCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBreath(entityId)`

生物当前氧气储备值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCurrentAirSupply() -> int
```


**返回值**：int，生物当前氧气储备值。

**备注**

- 注意：该值返回的是当前氧气储备的支持的逻辑帧数 = 氧气储备值 * 逻辑帧数（每秒 20 帧数）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBreath(entityId)
comp.GetCurrentAirSupply()
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

生物当前氧气储备值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCurrentAirSupply(entityId: str) -> int
```

- entityId: str，玩家 id。

**返回值**：int，生物当前氧气储备值。

**备注**

- 注意：该值返回的是当前氧气储备的支持的逻辑帧数 = 氧气储备值 * 逻辑帧数（每秒 20 帧数）。
- 相关逻辑计算仅服务端有，客户端获取到的是服务端计算后的值，非生物实体获取到的值为默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetCurrentAirSupply(entityId))
```

</TabItem>
</Tabs>

---

### GetDeathTime

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取生物死亡后持续的时间（刻，1 秒 20 刻），用于控制死亡动画。0 表示生物未死亡。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDeathTime() -> int
```


**返回值**：int，死亡时间，0 表示生物未死亡, -1 为调用失败。

**备注**

- 凋零的死亡动画有特殊逻辑，无法通过该接口获取。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetDeathTime()
```

</TabItem>
</Tabs>

---

### GetEntitiesBySelector

<Server/> EntityComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityComponent(entityId)`

传入目标选择器，获取对应实体 id (最大范围是所有已加载的实体)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntitiesBySelector(command: str) -> List[str]
```

- command: str，目标选择器指令。

**返回值**：List[str]，目标实体 id 列表。

**备注**

- 要使用范围进行筛选时，需要在创建 Component 时传入作为中心的 entityId。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityComponent(entityId)
print(comp.GetEntitiesBySelector("@e[type=rabbit]"))
```

</TabItem>
</Tabs>

---

### GetEntityDamage

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取生物(包括玩家)的攻击力。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityDamage(entityId: str, targetEntityId: str) -> float
```

- entityId: str，生物的实体 Id。
- targetEntityId: str，可选参数，攻击目标的实体 Id（部分附魔的武器，会针对不同的生物产生伤害的加成，例如“节肢克星”附魔，对节肢生物有伤害加成）。

**返回值**：float，返回生物(包括玩家)攻击力。

**备注**

- 注：该接口获取的是生物的基础攻击力，手持武器，buff 效果，附魔效果的总和，抛射物不在计算范围内，使用技能或者抛射物攻击的敌对生物的攻击力不在计算范围内，例如骷髅、恶魂、唤魔者、掠夺者、流浪者、凋灵等。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetEntityDamage(entityId,targetEntityId))
```

</TabItem>
</Tabs>

---

### GetEntityDimensionId

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(entityId)`

获取实体所在维度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityDimensionId() -> int
```


**返回值**：int，维度 id，0-主世界; 1-下界; 2-末地; 或其他自定义维度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(entityId)
comp.GetEntityDimensionId()
```

</TabItem>
</Tabs>

---

### GetEntityFallDistance

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取实体的坠落高度，越大的值会给予实体更大的坠落伤害，建议在[OnGroundServerEvent](https://mc.163.com/newdev/docs/api/shijian/shiti.html#ongroundserverevent)事件中调用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityFallDistance() -> float
```


**返回值**：float，坠落高度，无坠落为 0，获取失败为-1。

**备注**

- 该接口不支持抛射物。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetEntityFallDistance()
```

</TabItem>
</Tabs>

---

### GetEntityLinksTag

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取实体相连接的实体，如获取 entityId 为马，会返回骑乘者的信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityLinksTag() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，相连接实体的 dict。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetEntityLinksTag()
```

</TabItem>
</Tabs>

---

### GetEntityOwner

<Server/> ActorOwnerComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorOwner(entityId)`

获取实体的属主（包括可驯服生物的主人，或者掉落物的丢弃者，弹射物的发射者等）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityOwner() -> str
```


**返回值**：str，实体属主 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateActorOwner(entityId)
ownerId = comp.GetEntityOwner()
```

</TabItem>
</Tabs>

---

### GetFootPos

<Server/> PosComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePos(entityId)`

获取实体脚所在的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFootPos() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，位置信息。

**备注**

- 获取实体脚底的位置（除了睡觉时）。
- 类似接口参见获取实体位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePos(entityId)
entityFootPos = comp.GetFootPos()
```

</TabItem>
</Tabs>

<Client/> PosComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePos(entityId)`

获取实体脚所在的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFootPos() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，位置信息。

**备注**

- 获取实体脚底的位置（除了睡觉时）。
- 类似接口参见获取实体位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePos(entityId)
#获取位置：
entityFootPos = comp.GetFootPos()
```

</TabItem>
</Tabs>

---

### GetGravity

<Server/> GravityComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGravity(entityId)`

获取实体的重力因子，当生物重力因子为 0 时则应用世界的重力因子。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetGravity() -> float
```


**返回值**：float，重力因子。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGravity(entityId)
comp.GetGravity()
```

</TabItem>
</Tabs>

---

### GetLoadActors

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取已加载的实体 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLoadActors() -> List[str]
```


**返回值**：List[str]，实体 id 列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetLoadActors())
```

</TabItem>
</Tabs>

---

### GetMarkVariant

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取实体的标记变种属性值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMarkVariant() -> int
```


**返回值**：int，标记变种枚举值，获取失败返回-1，详见[马的标记变种枚举](https://mc.163.com/newdev/docs/api/meijuzhi/HorseSpotType.html)、[V2 版村民服装枚举](https://mc.163.com/newdev/docs/api/meijuzhi/VillagerClothingType.html).。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetMarkVariant()
```

</TabItem>
</Tabs>

---

### GetMaxAirSupply

<Server/> BreathCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBreath(entityId)`

获取生物最大氧气储备值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMaxAirSupply() -> int
```


**返回值**：int，最大氧气储备值。

**备注**

- 注意：该值返回的是最大氧气储备的支持的逻辑帧数 = 氧气储备值 * 逻辑帧数（每秒 20 帧数）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBreath(entityId)
comp.GetMaxAirSupply()
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

生物最大氧气储备值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMaxAirSupply(entityId: str) -> int
```

- entityId: str，实体 id。

**返回值**：int，生物最大氧气储备值。

**备注**

- 注意：该值返回的是当前氧气储备的支持的逻辑帧数 = 氧气储备值 * 逻辑帧数（每秒 20 帧数）。
- 相关逻辑计算仅服务端有，客户端获取到的是服务端计算后的值，非生物实体获取到的值为默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetMaxAirSupply(entityId))
```

</TabItem>
</Tabs>

---

### GetMobColor

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取生物的颜色，截止至网易 2.9 版本，只对羊和热带鱼有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMobColor() -> int
```


**返回值**：int，颜色枚举值，详见[EntityColorType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/EntityColorType.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetMobColor()
```

</TabItem>
</Tabs>

---

### GetMobStrength

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取生物的强度，截止至网易 2.9 版本，只对羊驼有效，强度越大羊驼驮运的箱子时格子数量越多。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMobStrength() -> int
```


**返回值**：int，强度值，取值范围为 1~5。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetMobStrength()
```

</TabItem>
</Tabs>

---

### GetMobStrengthMax

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取生物强度的最大值，截止至网易 2.9 版本，只对羊驼有效，强度越大羊驼驮运的箱子时格子数量越多，[SetMobStrength](/docs/docs/scripts/modapi/entity/attribute#setmobstrength) 无法超过 [SetMobStrengthMax](/docs/docs/scripts/modapi/entity/attribute#setmobstrengthmax) 的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMobStrengthMax() -> int
```


**返回值**：int，强度值，取值范围为 1~5，原版默认值为 5。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetMobStrengthMax()
```

</TabItem>
</Tabs>

---

### GetName

<Server/> NameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateName(entityId)`

获取生物的自定义名称（即使用命名牌或者 [SetName](/docs/docs/scripts/modapi/entity/attribute#setname) 接口设置的名称），或者玩家的名字。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetName() -> str
```


**返回值**：str，生物的自定义名称，或者玩家的名字。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateName(entityId)
comp.GetName()
```

</TabItem>
</Tabs>

<Client/> NameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateName(entityId)`

获取生物的自定义名称（即使用命名牌或者 [SetName](/docs/docs/scripts/modapi/entity/attribute#setname) 接口设置的名称），或者玩家的名字。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetName() -> str
```


**返回值**：str，生物的自定义名称，或者玩家的名字。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateName(entityId)
comp.GetName()
```

</TabItem>
</Tabs>

---

### GetPos

<Server/> PosComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePos(entityId)`

获取实体位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPos() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，位置信息。

**备注**

- 对于非玩家，获取到的是脚底部位的位置。
- 对于玩家，如果处于行走，站立，游泳，潜行，滑翔状态，获得的位置比脚底位置高 1.62；如果处于睡觉状态，获得的位置比最低位置高 0.2。
- 类似接口有 [GetFootPos](/docs/docs/scripts/modapi/entity/attribute#getfootpos)，对任何实体都是获取脚底部位的位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePos(entityId)
comp.GetPos()
```

</TabItem>
</Tabs>

<Client/> PosComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePos(entityId)`

获取实体位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPos() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，实体的坐标。

**备注**

- 对于非玩家，获取到的是脚底部位的位置。
- 对于玩家，如果处于行走，站立，游泳，潜行，滑翔状态，获得的位置比脚底位置高 1.62，如果处于睡觉状态，获得的位置比最低位置高 0.2。
- 类似接口有 [GetFootPos](/docs/docs/scripts/modapi/entity/attribute#getfootpos)，对任何实体都是获取脚底部位的位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePos(entityId)
#获取位置：
entityPos = comp.GetPos()
```

</TabItem>
</Tabs>

---

### GetRiderId

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家坐骑 entityid。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRiderId(playerId: str) -> str
```

- playerId: str，玩家 id。

**返回值**：str，获取玩家坐骑 entityid，无骑乘时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetRiderId(playerId))
```

</TabItem>
</Tabs>

---

### GetRot

<Server/> RotComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateRot(entityId)`

获取实体头与水平方向的俯仰角度和竖直方向的旋转角度，获得角度后可用 [GetDirFromRot](/docs/docs/scripts/modapi/general/math#getdirfromrot) 接口转换为朝向的单位向量 [MC 坐标系说明](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/10-Vector3.html)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRot() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，（上下角度，左右角度）单位是角度而不是弧度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRot(entityId)
comp.GetRot()
```

</TabItem>
</Tabs>

<Client/> RotComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateRot(entityId)`

获取实体头与水平方向的俯仰角度和竖直方向的旋转角度，获得角度后可用 [GetDirFromRot](/docs/docs/scripts/modapi/general/math#getdirfromrot) 接口转换为朝向的单位向量 [MC 坐标系说明](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/10-Vector3.html)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRot() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，俯仰角度及绕竖直方向旋转的角度，单位是角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateRot(entityId)
x, y = comp.GetRot()
```

</TabItem>
</Tabs>

---

### GetSize

<Server/> CollisionBoxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateCollisionBox(entityId)`

获取实体的包围盒。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSize() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，包围盒大小。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateCollisionBox(entityId)
comp.GetSize()
```

</TabItem>
</Tabs>

<Client/> CollisionBoxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCollisionBox(entityId)`

获取实体的包围盒。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSize() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，包围盒大小。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCollisionBox(entityId)
comp.GetSize()
```

</TabItem>
</Tabs>

---

### GetTradeLevel

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取村民的交易等级。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTradeLevel() -> int
```


**返回值**：int，村民的交易等级，调用失败返回 -1，详见[TradeLevelType](https://mc.163.com/newdev/docs/api/meijuzhi/TradeLevelType.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetTradeLevel()
```

</TabItem>
</Tabs>

---

### GetTypeFamily

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

获取生物行为包字段 type_family。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTypeFamily() -> List[str]
```


**返回值**：List[str]，type_family 列表，例['cow', 'mob']。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
comp.GetTypeFamily()
```

</TabItem>
</Tabs>

---

### GetUnitBubbleAirSupply

<Server/> BreathCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBreath(levelId)`

单位气泡数对应的氧气储备值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUnitBubbleAirSupply() -> int
```


**返回值**：int，单位气泡数对应的氧气储备值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBreath(levelId)
comp.GetUnitBubbleAirSupply()
```

</TabItem>
</Tabs>

---

### GetVariant

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取实体的变种属性值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetVariant() -> int
```


**返回值**：int，变种枚举值，获取失败返回-1，详见[猫变种枚举](https://mc.163.com/newdev/docs/api/meijuzhi/CatVariantType.html)、[马变种枚举](https://mc.163.com/newdev/docs/api/meijuzhi/HorseType.html)、[狐狸变种枚举](https://mc.163.com/newdev/docs/api/meijuzhi/FoxType.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetVariant()
```

</TabItem>
</Tabs>

---

### HasChest

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断生物是否背负了箱子，截止至网易 2.9 版本，只对羊驼、驴、骡生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HasChest() -> bool
```


**返回值**：bool，是否背负了箱子，获取失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.HasChest()
```

</TabItem>
</Tabs>

---

### HasComponent

<Server/> EntityComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityComponent(entityId)`

判断实体是否有原版组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HasComponent(attrType: int) -> bool
```

- attrType: int，[EntityComponentType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/EntityComponentType.html)。

**返回值**：bool，是否有对应组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityComponent(entityId)
print comp.HasComponent(serverApi.GetMinecraftEnum().EntityComponentType.attack)
```

</TabItem>
</Tabs>

---

### HasModifier

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

获取指定生物是否含有属性修饰符。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HasModifier(attrType: int, modifierId: str) -> bool
```

- attrType: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。
- modifierId: str，修饰符的唯一标识符。

**返回值**：bool，存在返回 True，不存在返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
AttrType = serverApi.GetMinecraftEnum().AttrType
# 获取指定生物是否含有修饰Health的属性修饰符"testmod:health_modifier_1"
has = comp.HasModifier(AttrType.HEALTH, "testmod:health_modifier_1")
```

</TabItem>
</Tabs>

---

### HasSaddle

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断实体是否装备了鞍。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HasSaddle() -> bool
```


**返回值**：bool，是否装备了鞍，调用失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.HasSaddle()
```

</TabItem>
</Tabs>

---

### IsAngry

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断实体是否处于激怒状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsAngry() -> bool
```


**返回值**：bool，是否处于激怒状态，调用失败返回 None。

**备注**

- 该接口对铁傀儡无效，友好型生物如羊、猪没有激怒状态，可通过生物行为包中的 json 确定。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsAngry()
```

</TabItem>
</Tabs>

---

### IsBaby

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断实体是否为幼年。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsBaby() -> bool
```


**返回值**：bool，是否为幼年，调用失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsBaby()
```

</TabItem>
</Tabs>

---

### IsConsumingAirSupply

<Server/> BreathCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBreath(entityId)`

获取生物当前是否在消耗氧气。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsConsumingAirSupply() -> bool
```


**返回值**：bool，是否消耗氧气。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBreath(entityId)
comp.IsConsumingAirSupply()
```

</TabItem>
</Tabs>

---

### IsIllagerCaptain

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断实体是否为袭击队长，截止至网易 2.9 版本，只对掠夺者和卫道士有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsIllagerCaptain() -> bool
```


**返回值**：bool，是否为袭击队长，是返回 True，否返回 False，调用失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsIllagerCaptain()
```

</TabItem>
</Tabs>

---

### IsNaturallySpawned

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取生物是否为自然生成的。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsNaturallySpawned() -> bool
```


**返回值**：bool，是否为自然生成的，调用失败返回 None。

**备注**

- 一些自然生成的生物拥有持久性（例如末影龙、随大型结构生成的生物），则 IsNaturallySpawned 会返回 False，详见基岩版持久性生物介绍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsNaturallySpawned()
```

</TabItem>
</Tabs>

---

### IsOutOfControl

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断实体是否处于失控状态，截止至网易 2.9 版本，只对船有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsOutOfControl() -> bool
```


**返回值**：bool，是否失控，调用失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsOutOfControl()
```

</TabItem>
</Tabs>

---

### IsPregnant

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取生物是否怀孕，截止至网易 2.9 版本，只对海龟有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsPregnant() -> bool
```


**返回值**：bool，是否怀孕，调用失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsPregnant()
```

</TabItem>
</Tabs>

---

### IsSheared

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断实体是否被剃毛，截止至网易 2.9 版本，只对羊有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsSheared() -> bool
```


**返回值**：bool，已经被剃毛返回 True，没有返回 False，调用失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsSheared()
```

</TabItem>
</Tabs>

---

### IsSitting

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断实体是否处于坐下状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsSitting() -> bool
```


**返回值**：bool，是否处于坐下状态，调用失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsSitting()
```

</TabItem>
</Tabs>

---

### IsTamed

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断实体是否被驯服。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsTamed() -> bool
```


**返回值**：bool，是否为被驯服，调用失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsTamed()
```

</TabItem>
</Tabs>

---

### LockLocalPlayerRot

<Client/> RotComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

在分离摄像机时，锁定本地玩家的头部角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockLocalPlayerRot(lock: bool) -> bool
```

- lock: bool，传入 True 为锁定本地玩家头部角度<br/>传入 False 为解锁本地玩家头部角度。

**返回值**：bool，True：设置成功<br/>False：设置失败。

**备注**

- 只能设置 localplayer，即本地玩家自己。
- 玩家重生、切换维度时会重置头部角度。
- 锁定本地玩家头部角度时第一人称视角下可以旋转镜头，但玩家头部角度不会发生改变，下次切换到第一人称视角时镜头角度仍为锁定时的角度。
- 锁定本地玩家头部角度后，玩家划船时头部角度会尽量靠近锁定时的角度，若无法转到该角度，则会向左或向右看（视哪边距离目标角度更近而定）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 分离摄像机
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.DepartCamera()
# 锁定本地玩家的头部角度
comp = clientApi.GetEngineCompFactory().CreateRot(entityId)
comp.LockLocalPlayerRot(True)
```

</TabItem>
</Tabs>

---

### PromoteToIllagerCaptain

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

晋升实体为袭击队长，截止至网易 2.9 版本，只对掠夺者和卫道士有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PromoteToIllagerCaptain() -> bool
```


**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.PromoteToIllagerCaptain()
```

</TabItem>
</Tabs>

---

### RemoveModifier

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

为指定生物移除属性修饰符。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveModifier(attrType: int, modifierId: str) -> bool
```

- attrType: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。
- modifierId: str，修饰符的唯一标识符。

**返回值**：bool，移除结果，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
AttrType = serverApi.GetMinecraftEnum().AttrType
# 为指定生物移除修饰Health的属性修饰符"testmod:health_modifier_1"
comp.RemoveModifier(AttrType.HEALTH, "testmod:health_modifier_1")
```

</TabItem>
</Tabs>

---

### ResetToDefaultValue

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

重置实体引擎属性到默认值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetToDefaultValue(type: int) -> bool
```

- type: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。

**返回值**：bool，设置结果。

**备注**

- 本接口对伤害吸收生命值 ABSORPTION、护甲 ARMOR 属性无效。
- 由于 [SetAttrValue](/docs/docs/scripts/modapi/entity/attribute#setattrvalue) 接口旧有实现多数情况下会同时修改默认值，因此配合使用本接口时，请在 [SetAttrValue](/docs/docs/scripts/modapi/entity/attribute#setattrvalue) 时指定参数 setDefault=0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
comp.ResetToDefaultValue(serverApi.GetMinecraftEnum().AttrType.HEALTH)
# 在同类型属性的相关事件触发过程中，调用此接口可能会被相关事件覆盖无效，如受伤时，自动恢复到默认血量
# 解决方案是通过定时器在下一帧再执行相应的Reset操作
def ResetToDefaultHealth(self, entityId):
    comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
    comp.ResetToDefaultValue(serverApi.GetMinecraftEnum().AttrType.HEALTH)

def ActorHurtServerEvent(self, args):
    entityId = args.get("entityId")
    # 无效，调用后会被ActorHurtServerEvent覆盖
    ResetToDefaultHealth(entityId)
    # 有效，下一帧恢复
    gameComp = serverApi.GetEngineCompFactory().CreateGame(serverApi.GetLevelId())
    gameComp.AddTimer(0, self.ResetToDefaultHealth, entityId)
```

</TabItem>
</Tabs>

---

### ResetToMaxValue

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

重置实体引擎属性到最大值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetToMaxValue(type: int) -> bool
```

- type: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。

**返回值**：bool，设置结果。

**备注**

- 本接口对伤害吸收生命值 ABSORPTION、护甲 ARMOR 属性无效。
- 若属性的最大值为+∞且未被显式设置过，则重置为属性的默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
comp.ResetToMaxValue(serverApi.GetMinecraftEnum().AttrType.HEALTH)
# 在同类型属性的相关事件触发过程中，调用此接口可能会被相关事件覆盖导致无效，如受伤时，自动恢复满血
# 解决方案是通过定时器在下一帧再执行相应的Reset操作
def ResetToMaxHealth(self, entityId):
    comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
    comp.ResetToMaxValue(serverApi.GetMinecraftEnum().AttrType.HEALTH)

def ActorHurtServerEvent(self, args):
    entityId = args.get("entityId")
    # 无效，调用后会被ActorHurtServerEvent覆盖
    ResetToMaxHealth(entityId)
    # 有效，下一帧恢复
    gameComp = serverApi.GetEngineCompFactory().CreateGame(serverApi.GetLevelId())
    gameComp.AddTimer(0, self.ResetToMaxHealth, entityId)
```

</TabItem>
</Tabs>

---

### SetAngry

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置实体是否处于激怒状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAngry(isAngry: bool, targerId: str) -> bool
```

- isAngry: bool，是否设置为激怒状态。
- targerId: str，攻击的目标 id，设置为 True 时必须设置目标，设置为 isAngry 为 False 的时候不用填。

**返回值**：bool，是否设置成功。

**备注**

- target 必须在被激怒的生物的可见范围内，否则无法正常生效。
- 友好型生物如羊、猪没有激怒状态，可通过生物行为包中的 json 确定。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetAngry(True, playerId)
```

</TabItem>
</Tabs>

---

### SetAsAdult

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置实体为成年体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAsAdult() -> bool
```


**返回值**：bool，是否为成功。

**备注**

- 该接口只对定义有 "minecraft:ageable_grow_up" 事件的实体生效。如果有需要，可自行添加，例如实现僵尸实体添加如下事件到 events：'''json "minecraft:ageable_grow_up": \{ "add": \{ "component_groups": [ "minecraft:zombie_adult" ] \}, "remove": \{ "component_groups": [ "minecraft:zombie_baby" ] \} \}, '''。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetAsAdult()
```

</TabItem>
</Tabs>

---

### SetAttrMaxValue

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

设置实体的引擎属性的最大值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAttrMaxValue(type: int, value: float) -> bool
```

- type: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。
- value: float，属性值。

**返回值**：bool，设置结果。

**备注**

- 在设置属性的时候，需要注意判断是否超过原版的值范围，如果设置的数值超过原版值的范围，则返回 False。
- 设置的最大饱和度不能超过当前的饥饿值; 食用食物后，最大饱和度会被原版游戏机制修改。
- 需要注意的是护甲值由身上的护甲累计计算所得，并不能通过该接口直接修改。
- 对于饥饿度，SetAttrMaxValue 总是同时修改最大值与默认值，对于其他属性，它只修改最大值不修改默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
comp.SetAttrMaxValue(serverApi.GetMinecraftEnum().AttrType.SPEED,0.2)
```

</TabItem>
</Tabs>

---

### SetAttrValue

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

设置实体的引擎属性。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAttrValue(attrType: int, value: float, setDefault: int) -> bool
```

- attrType: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。
- value: float，属性值。
- setDefault: int，是否同时设置默认值，1 会同时设置默认值，0 则不会，缺省时默认为 1。

**返回值**：bool，设置结果。

**备注**

- 在设置属性的时候，需要注意判断是否超过原版的值范围或是当前属性的值范围，如果设置的数值超过原版值的范围，则返回 False。
- 如果超过当前属性的最大值，则需要先调用 [SetAttrMaxValue](/docs/docs/scripts/modapi/entity/attribute#setattrmaxvalue) 接口来扩充该属性的最大值，否则设置的值过大时会由于超过该属性的最大值而被截取成该最大值。如果设置的值低于当前属性的最小值，则会被设置成原版的最小值。
- 关于基础属性的原版最大值或最小值限制，可查看 AttrType 枚举。
- 设置的护甲值属于额外的,会与装备带来的护甲值叠加,只能为非负整数,会覆盖掉原有生物(除潜影贝和岩浆怪)自带的护甲值,以下生物的护甲值最高为 20:僵尸,僵尸村民,僵尸猪人,尸壳,溺尸,唤魔者,凋灵。
- setDefault 参数对于饥饿度与饱和度属性无效，只会修改当前值，不会修改默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
# 如果设置的值超过属性当前的最大值，需要先扩充该属性的最大值，否则不生效。
comp.SetAttrMaxValue(serverApi.GetMinecraftEnum().AttrType.HEALTH, 30)
comp.SetAttrValue(serverApi.GetMinecraftEnum().AttrType.HEALTH, 30)
```

</TabItem>
</Tabs>

---

### SetChest

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置生物是否背负了箱子，截止至网易 2.9 版本，只对羊驼、驴、骡生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetChest(hasChest: bool) -> bool
```

- hasChest: bool，是否背负箱子。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetChest(True)
```

</TabItem>
</Tabs>

---

### SetCurrentAirSupply

<Server/> BreathCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBreath(entityId)`

设置生物氧气储备值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCurrentAirSupply(data: int) -> bool
```

- data: int，设置生物当前氧气值。

**返回值**：bool，设置结果。

**备注**

- 注意：该值设置的是当前氧气储备的支持的逻辑帧数 = 氧气储备值 * 逻辑帧数（每秒 20 帧数）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBreath(entityId)
comp.SetCurrentAirSupply(300)
```

</TabItem>
</Tabs>

---

### SetEntityLookAtPos

<Server/> RotComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateRot(entityId)`

设置非玩家的实体看向某个位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityLookAtPos(
    targetPos: Tuple[float, float, float],
    minTime: float,
    maxTime: float,
    reject: bool,
) -> bool
```

- targetPos: Tuple[float, float, float]，要看向的目标位置。
- minTime: float，凝视行为最短维持时间，单位为秒。
- maxTime: float，凝视行为最长维持时间，单位为秒，最大值为 60<br/>实际行为维持时间将在 minTime 和 maxTime 之间取随机值。
- reject: bool，在进行凝视行为时，是否禁止触发其他行为<br/>True 为禁止其他行为<br/>False 为允许其他行为（此时凝视行为可能表现不明显）。

**返回值**：bool，是否设置成功，True 为成功，False 为失败。

**备注**

- 调用本接口会打断该生物正在进行的行为，且该生物不会立刻看向目标位置，而是逐渐看向目标位置。
- 对部分不会转向的实体调用此接口，可能会返回失败或返回成功但实际无表现。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRot(entityId)
# 设置该实体看向(0,78,0)这个位置，该凝视行为最少持续2秒，最多持续3秒，凝视过程中禁止触发其他行为
comp.SetEntityLookAtPos((0,78,0), 2, 3, True)
```

</TabItem>
</Tabs>

---

### SetEntityOwner

<Server/> ActorOwnerComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorOwner(entityId)`

设置实体的属主（包括可驯服生物的主人，或者掉落物的丢弃者，弹射物的发射者等）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityOwner(targetId: str) -> bool
```

- targetId: str，属主实体 id，为 None 时设置实体的属主为空。

**返回值**：bool，设置是否成功，True 表示设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateActorOwner(entityId)
result = comp.SetEntityOwner(targetId)
```

</TabItem>
</Tabs>

---

### SetFootPos

<Server/> PosComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePos(entityId)`

设置实体脚底所在的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFootPos(footPos: Tuple[float, float, float]) -> bool
```

- footPos: Tuple[float, float, float]，实体脚所在的位置。

**返回值**：bool，是否设置成功。

**备注**

- 行为与使用 tp 命令一致，实体会瞬移到目标点。
- 在床上时调用该接口会返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePos(entityId)
comp.SetFootPos((0, 4, 0))
```

</TabItem>
</Tabs>

---

### SetGravity

<Server/> GravityComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGravity(entityId)`

设置实体的重力因子，当生物重力因子为 0 时则应用世界的重力因子。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetGravity(gravity: float) -> bool
```

- gravity: float，负数，表示每帧向下的速度。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGravity(entityId)
comp.SetGravity(-0.08)
```

</TabItem>
</Tabs>

---

### SetMarkVariant

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置实体的标记变种属性值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMarkVariant(variantType: int) -> bool
```

- variantType: int，变种枚举值，详见[马的标记变种枚举](https://mc.163.com/newdev/docs/api/meijuzhi/HorseSpotType.html)、[V2 版村民服装枚举](https://mc.163.com/newdev/docs/api/meijuzhi/VillagerClothingType.html).。

**返回值**：bool，是否设置成功。

**备注**

- 如果想设置其他生物的变种属性，可以直接查看 behavior_packs 中各个版本的 entities 文件下对应种类 json 中的"minecraft:mark_variant"属性。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetMarkVariant(1)
```

</TabItem>
</Tabs>

---

### SetMaxAirSupply

<Server/> BreathCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBreath(entityId)`

设置生物最大氧气储备值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMaxAirSupply(data: int) -> bool
```

- data: int，设置生物最大氧气值。

**返回值**：bool，设置结果。

**备注**

- 注意：该值设置的是最大氧气储备的支持的逻辑帧数 = 氧气储备值 * 逻辑帧数（每秒 20 帧数）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBreath(entityId)
comp.SetMaxAirSupply(400)
```

</TabItem>
</Tabs>

---

### SetMobColor

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置生物的颜色，截止至网易 2.9 版本，只对羊和热带鱼有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMobColor(colorType: int) -> bool
```

- colorType: int，颜色枚举值，详见[EntityColorType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/EntityColorType.html)。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
import common.minecraftEnum as minecraftEnum
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetMobColor(minecraftEnum.EntityColorType.LightGreen)
```

</TabItem>
</Tabs>

---

### SetMobStrength

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置生物的强度，截止至网易 2.9 版本，只对羊驼有效，强度越大羊驼驮运的箱子时格子数量越多。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMobStrength(strength: int) -> bool
```

- strength: int，强度值，取值范围为 1~5，如果设置值大于 [GetMobStrengthMax](/docs/docs/scripts/modapi/entity/attribute#getmobstrengthmax) 的值，将被设置为 [GetMobStrengthMax](/docs/docs/scripts/modapi/entity/attribute#getmobstrengthmax) 的值。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetMobStrength(5)
```

</TabItem>
</Tabs>

---

### SetMobStrengthMax

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置生物强度的最大值，截止至网易 2.9 版本，只对羊驼有效，强度越大羊驼驮运的箱子时格子数量越多，[SetMobStrength](/docs/docs/scripts/modapi/entity/attribute#setmobstrength) 无法超过 SetMobStrengthMax 的值。由于引擎限制，在羊驼被打时候会 reload 组件，strengthMax 会恢复成 llama.json 中的配置值(minecraft:strength)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMobStrengthMax(strength: int = 5) -> bool
```

- strength: int，强度值，取值范围为 1~5，原版默认值为 5。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetMobStrengthMax(5)
```

</TabItem>
</Tabs>

---

### SetName

<Server/> NameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateName(entityId)`

用于设置生物的自定义名称，跟原版命名牌作用相同，玩家和新版流浪商人暂不支持。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetName(name: str) -> bool
```

- name: str，名称。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateName(entityId)
comp.SetName("new Name")
```

</TabItem>
</Tabs>

---

### SetOutOfControl

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置实体是否处于失控状态，截止至网易 2.9 版本，只对船有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetOutOfControl(isOutOfControl: bool) -> bool
```

- isOutOfControl: bool，是否处于失控状态。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetOutOfControl(True)
```

</TabItem>
</Tabs>

---

### SetPersistent

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

设置实体不会因为离玩家太远而被[清除](https://zh.minecraft.wiki/w/%E7%94%9F%E6%88%90#%E6%B8%85%E9%99%A4)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPersistent(persistent: bool) -> bool
```

- persistent: bool，设置为 True 时，则实体不会被清除。

**返回值**：bool，是否成功。

**备注**

- 使用 [CreateEngineEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createengineentitybytypestr) 创建 isNpc 为 True 的实体时，默认不会被清除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
comp.SetPersistent(True)
```

</TabItem>
</Tabs>

---

### SetPlayerLookAtPos

<Client/> RotComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateRot(localPlayerId)`

设置本地玩家看向某个位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerLookAtPos(
    targetPos: Tuple[float, float, float],
    pitchStep: float,
    yawStep: float,
    blockInput: bool,
) -> bool
```

- targetPos: Tuple[float, float, float]，要看向的目标位置。
- pitchStep: float，俯仰角方向旋转的角速度（每帧），最小为 0.2。
- yawStep: float，偏航角方向旋转的角速度（每帧），最小为 0.2。
- blockInput: bool，转向目标角度时是否屏蔽玩家操作，默认为 True<br/>True:屏蔽玩家操作，此时玩家无法转向、移动<br/>False:不屏蔽玩家操作，此时如果玩家有移动、镜头转向操作将会打断通过本接口设置的转向。

**返回值**：bool，是否设置成功，True 为成功，False 为失败。

**备注**

- 当本地玩家未与摄像机分离时，调用本接口会导致摄像机一同看向指定位置当本地玩家与摄像机分离时，调用本接口将只改变本地玩家模型的朝向。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateRot(localPlayerId)
# 设置本地玩家以0.2度每帧的俯仰角速度、1度每帧的偏航角速度看向(0,78,0)这个位置，转向过程中屏蔽玩家操作
comp.SetPlayerLookAtPos((0,78,0), 0.2, 1, True)
```

</TabItem>
</Tabs>

---

### SetPos

<Server/> PosComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePos(entityId)`

设置实体位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPos(pos: Tuple[float, float, float]) -> bool
```

- pos: Tuple[float, float, float]，xyz 值。

**返回值**：bool，设置结果。

**备注**

- 行为与使用 tp 命令一致，实体会瞬移到目标点。
- 对于所有类型的实体都是设置脚底位置，与 [SetFootPos](/docs/docs/scripts/modapi/entity/attribute#setfootpos) 等价。
- 在床上时调用该接口会返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePos(entityId)
comp.SetPos((1,2,3))
```

</TabItem>
</Tabs>

---

### SetPosForClientEntity

<Client/> PosComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePos(entityId)`

设置客户端实体位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPosForClientEntity(pos: Tuple[float, float, float]) -> bool
```

- pos: Tuple[float, float, float]，客户端实体的坐标。

**返回值**：bool，设置是否成功。

**备注**

- 仅能用于 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePos(entityId)
comp.SetPosForClientEntity((30, 64, 30))
```

</TabItem>
</Tabs>

---

### SetRecoverTotalAirSupplyTime

<Server/> BreathCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBreath(entityId)`

设置恢复最大氧气量的时间，单位秒。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRecoverTotalAirSupplyTime(timeSec: float) -> bool
```

- timeSec: float，恢复生物最大氧气值。

**返回值**：bool，是否设置成功。

**备注**

- 注意：当设置的最大氧气值小于（timeSec*10）时，生物每帧恢复氧气量的值为 0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBreath(entityId)
comp.SetRecoverTotalAirSupplyTime(10)
```

</TabItem>
</Tabs>

---

### SetRot

<Server/> RotComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateRot(entityId)`

设置实体头与水平方向的俯仰角度和竖直方向的旋转角度 [MC 坐标系说明](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/10-Vector3.html)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRot(rot: Tuple[float, float]) -> bool
```

- rot: Tuple[float, float]，（上下角度，左右角度）单位是角度而不是弧度。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRot(entityId)
comp.SetRot((30,0))
```

</TabItem>
</Tabs>

<Client/> RotComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateRot(entityId)`

设置实体头与水平方向的俯仰角度和竖直方向的旋转角度 [MC 坐标系说明](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/10-Vector3.html)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRot(rot: Tuple[float, float]) -> bool
```

- rot: Tuple[float, float]，俯仰角度及绕竖直方向旋转的角度，单位是角度。

**返回值**：bool，设置是否成功。

**备注**

- 建议只用来设置本地玩家。如果设置其他生物，会被生物自身行为覆盖。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateRot(entityId)
# 设为向上仰视45度，并朝向世界z轴正方向
comp.SetRot((-45, 0))
```

</TabItem>
</Tabs>

---

### SetRotForClientEntity

<Client/> RotComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateRot(entityId)`

设置客户端实体头与水平方向的俯仰角度和竖直方向的旋转角度 [MC 坐标系说明](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/10-Vector3.html)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRotForClientEntity(rot: Tuple[float, float]) -> bool
```

- rot: Tuple[float, float]，俯仰角度及绕竖直方向旋转的角度，单位是角度。

**返回值**：bool，设置是否成功。

**备注**

- 仅能用于 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateRot(entityId)
comp.SetRotForClientEntity((30, 30))
```

</TabItem>
</Tabs>

---

### SetSheared

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置实体是否被剃毛，截止至网易 2.9 版本，只对羊有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSheared(isSheared: bool) -> bool
```

- isSheared: bool，是否剃毛。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetSheared(True)
```

</TabItem>
</Tabs>

---

### SetSitting

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置生物是否坐下。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSitting(shouldSitDown: bool) -> bool
```

- shouldSitDown: bool，是否坐下。

**返回值**：bool，是否设置成功。

**备注**

- 该接口对熊猫无效，熊猫坐下有特殊游戏逻辑。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetSitting()
```

</TabItem>
</Tabs>

---

### SetSize

<Server/> CollisionBoxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateCollisionBox(entityId)`

设置实体的包围盒。设置过大会导致游戏卡顿。实体的 scale 的立方乘以包围盒的体积不可超过 32768。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSize(size: Tuple[float, float]) -> bool
```

- size: Tuple[float, float]，第一位表示宽度和长度，第二位表示高度。

**返回值**：bool，设置结果。

**备注**

- 对新生产的实体需要经过 5 帧之后再设置包围盒的大小才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateCollisionBox(entityId)
comp.SetSize((2,3))
```

</TabItem>
</Tabs>

---

### SetTradeLevel

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置村民的交易等级。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTradeLevel(holderId: int) -> bool
```

- holderId: int，村民的交易等级，详见[TradeLevelType](https://mc.163.com/newdev/docs/api/meijuzhi/TradeLevelType.html)。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
import common.minecraftEnum as minecraftEnum
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetTradeLevel(minecraftEnum.TradeLevelType.Master)
```

</TabItem>
</Tabs>

---

### SetVariant

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置实体的变种属性值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetVariant(variantType: int) -> bool
```

- variantType: int，变种枚举值，详见[猫变种枚举](https://mc.163.com/newdev/docs/api/meijuzhi/CatVariantType.html)、[马变种枚举](https://mc.163.com/newdev/docs/api/meijuzhi/HorseType.html)、[狐狸变种枚举](https://mc.163.com/newdev/docs/api/meijuzhi/FoxType.html)。

**返回值**：bool，是否设置成功。

**备注**

- 如果想设置其他生物的变种属性，可以直接查看 behavior_packs 中各个版本的 entities 文件下对应种类 json 中的"minecraft:variant"属性。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetVariant(1)
```

</TabItem>
</Tabs>

---

### UpdateModifier

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

为指定生物更新属性修饰符。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UpdateModifier(attrType: int, modifierId: str, amount: float, operation: int, operand: int) -> bool
```

- attrType: int，[AttrType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttrType.html)。
- modifierId: str，修饰符的唯一标识符。
- amount: float，修饰符的新数值。
- operation: int，[AttributeModifierOperation 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttributeModifierOperation.html)，修饰符的运算方式。
- operand: int，[AttributeOperands 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/AttributeOperands.html)，修饰符作用的操作数。

**返回值**：bool，更新结果，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
AttrType = serverApi.GetMinecraftEnum().AttrType
AttributeModifierOperation = serverApi.GetMinecraftEnum().AttributeModifierOperation
AttributeOperands = serverApi.GetMinecraftEnum().AttributeOperands
# 为指定生物更新修饰Health最大值的属性修饰符"testmod:health_modifier_1", 修饰方法为最大值增量+20
comp.UpdateModifier(AttrType.HEALTH, "testmod:health_modifier_1", 20, AttributeModifierOperation.OperationAddition, AttributeOperands.OperandMax)
```

</TabItem>
</Tabs>

---

### isEntityInLava

<Client/> AttrCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateAttr(entityId)`

实体是否在岩浆中。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isEntityInLava() -> bool
```


**返回值**：bool，是否在岩浆中，True 为在岩浆中，False 为不在岩浆中。

**备注**

- 只能获取到本地客户端已加载的实体是否在岩浆中，若实体在其他维度或未加载（距离本地玩家太远），将获取失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreateAttr(entityId)
isInLava = comp.isEntityInLava()
```

</TabItem>
</Tabs>

---

### isEntityOnGround

<Client/> AttrCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateAttr(entityId)`

实体是否触地。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isEntityOnGround() -> bool
```


**返回值**：bool，是否触地，True 为触地，False 为不触地。

**备注**

- 客户端实体刚创建时引擎计算还没完成，此时获取该实体是否着地将返回默认值 True，需要延迟一帧进行获取才能获取到正确的数据。
- 生物处于骑乘状态时，如玩家骑在猪身上，也视作触地。
- 只能获取到本地客户端已加载的实体是否触地，若实体在其他维度或未加载（距离本地玩家太远），将获取失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreateAttr(entityId)
isOnGound = comp.isEntityOnGround()
```

</TabItem>
</Tabs>

---
