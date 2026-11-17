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

本文主要记录行为相关的接口，共 61 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/xingwei.html"/>

---

### AddActorComponent

<Server/> EntityEventComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityEvent(entityId)`

给指定实体自定义添加实体 Component。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorComponent(componentName: str, componentValue: str) -> bool
```

- componentName: str，实体行为包中定义的 component 的键名。
- componentValue: str，实体行为包中定义的 component 的值的 json。

**返回值**：bool，指令是否成功发出。

**备注**

- 该接口不会判断生物的 json 是否具有传入的 Component，返回值的结果只代表指令是否正常发出。
- 重复添加 component，会覆盖原有的值（包括 [AddActorComponentGroup](/docs/docs/scripts/modapi/interfaces/entity/behavior#addactorcomponentgroup)）。
- AddActorComponent、[AddActorComponentGroup](/docs/docs/scripts/modapi/interfaces/entity/behavior#addactorcomponentgroup)、[RemoveActorComponent](/docs/docs/scripts/modapi/interfaces/entity/behavior#removeactorcomponent)、[RemoveActorComponentGroup](/docs/docs/scripts/modapi/interfaces/entity/behavior#removeactorcomponentgroup) 之间会互相影响，结果依据执行顺序而定。

</TabItem>
<TabItem value="示例" label="示例">

```python
#将实体攻击改成99
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityEvent(entityId)
comp.AddActorComponent("minecraft:attack", '{"damage": 99}')
```

</TabItem>
</Tabs>

---

### AddActorComponentGroup

<Server/> EntityEventComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityEvent(entityId)`

给指定实体添加实体 json 中配置的 ComponentGroup。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorComponentGroup(groupName: str) -> bool
```

- groupName: str，实体行为包中定义的 component_group 的键名。

**返回值**：bool，指令是否成功发出。

**备注**

- 该接口不会判断生物的 json 是否具有传入的 groupName，返回值的结果只代表指令是否正常发出。
- 在羊的 entity json 文件中 component_groups 字段下配置羊的颜色：

```text
"component_groups": {
    "minecraft:sheep_white": {
        "minecraft:color": {
        "value": 0
        }
    },
    "minecraft:sheep_brown": {
        "minecraft:color": {
        "value": 12
        }
    },
    "minecraft:sheep_black": {
        "minecraft:color": {
        "value": 15
        }
    },
    ......
    "minecraft:sheep_red": {
        "minecraft:color": {
        "value": 14
        }
    }
}
```

</TabItem>
<TabItem value="示例" label="示例">

```text
"component_groups": {
    "minecraft:sheep_white": {
        "minecraft:color": {
        "value": 0
        }
    },
    "minecraft:sheep_brown": {
        "minecraft:color": {
        "value": 12
        }
    },
    "minecraft:sheep_black": {
        "minecraft:color": {
        "value": 15
        }
    },
    ......
    "minecraft:sheep_red": {
        "minecraft:color": {
        "value": 14
        }
    }
}
```

</TabItem>
</Tabs>

---

### AddEntityAroundEntityMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

给实体（不含玩家）添加对实体环绕运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEntityAroundEntityMotion(
    eID: str,
    angularVelocity: float,
    axis: Tuple[float, float, float] = (0, 1, 0),
    lockDir: bool = False,
    stopRad: float = 0,
    radius: float = -1,
) -> int
```

- eID: str，要环绕的某个实体的 ID。
- angularVelocity: float，圆周运动的角速度（弧度/秒）。
- axis: Tuple[float, float, float]，圆周运动的轴，决定了在哪个平面上做圆周运动，默认为(0, 1, 0)。
- lockDir: bool，是否在运动器生效时锁定实体的朝向，不锁定则实体的朝向会随着运动而改变，默认为 False。
- stopRad: float，停止该运动器所需要的弧度，当 stopRad 为 0 时，该运动器会一直运行，默认为 0。
- radius: float，环绕半径，当设置为-1 时环绕运动器使用启动时与目标的距离作为半径，当设置为非负数时表示按设定的值作为环绕半径，默认为-1。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 该接口不屏蔽生物本身的 AI 运动以及重力作用，当有 AI 运动发生时，最终的表现结果可能与预期有差异。
- 环绕运动器可叠加多个，且可与速度运动器互相叠加，每一帧的最终效果为各个运动器计算出的瞬时向量之和。
- 由于引擎中在加载的区块以外的实体时会停止一切活动，建议将实体的运动范围控制在玩家位置±100 内。
- 参数中环绕半径 radius 和角速度 angularVelocity 需要配合调整，避免最后得出的线速度过大造成运动不平滑。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
axis=(-1, 1, 1)
mID = motionComp.AddEntityAroundEntityMotion(eID, 1.0, axis, lockDir=False, stopRad=0, radius=2.0)
#启动该运动器
motionComp.StartEntityMotion(mID)
```

</TabItem>
</Tabs>

---

### AddEntityAroundPointMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

给实体（不含玩家）添加对点环绕运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEntityAroundPointMotion(
    center: Tuple[float, float, float],
    angularVelocity: float,
    axis: Tuple[float, float, float] = (0, 1, 0),
    lockDir: bool = False,
    stopRad: float = 0,
) -> int
```

- center: Tuple[float, float, float]，要环绕的圆心点坐标。
- angularVelocity: float，圆周运动的角速度（弧度/秒）。
- axis: Tuple[float, float, float]，圆周运动的轴，决定了在哪个平面上做圆周运动，默认为(0, 1, 0)。
- lockDir: bool，是否在运动器生效时锁定实体的朝向，不锁定则实体的朝向会随着运动而改变，默认为 False。
- stopRad: float，停止该运动器所需要的弧度，当 stopRad 为 0 时，该运动器会一直运行，默认为 0。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 该接口不屏蔽生物本身的 AI 运动以及重力作用，当有 AI 运动发生时，最终的表现结果可能与预期有差异。
- 环绕运动器可叠加多个，且可与速度运动器互相叠加，每一帧的最终效果为各个运动器计算出的瞬时向量之和。
- 由于引擎中在加载的区块以外的实体时会停止一切活动，建议将实体的运动范围控制在玩家位置±100 内，同时避免线速度过大造成运动不平滑的现象。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
center = (0, 8, 0)
axis=(-1, 1, 1)
mID = motionComp.AddEntityAroundPointMotion(center, 1.0, axis, lockDir=False, stopRad=0)
#启动该运动器
motionComp.StartEntityMotion(mID)
```

</TabItem>
</Tabs>

---

### AddEntitySeat

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

增加坐骑座位。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEntitySeat(
    pos: Tuple[float, float, float],
    rot: float = 0,
    lock_rot: float,
) -> int
```

- pos: Tuple[float, float, float]，座位位置。
- rot: float，座位旋转，默认为 0。
- lock_rot: float，骑乘者允许旋转角度范围，默认不限制。

**返回值**：int，当前最大座位序号，增加失败返回-1。

**备注**

- 通常需要配合 [SetEntityRide](/docs/docs/scripts/modapi/interfaces/entity/behavior#setentityride)、[SetControl](/docs/docs/scripts/modapi/interfaces/entity/behavior#setcontrol) 一起使用，需要被骑乘生物 json 中骑乘组件支持骑乘者的生物类型。
- 非玩家实体即使所处座位的 lock_rot 参数为默认值，也不可 360 度旋转。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
seatIndex = comp.AddEntitySeat((1.0, 1.0, 1.0), 90.0, 90.0)
```

</TabItem>
</Tabs>

---

### AddEntityTrackMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

给实体（不含玩家）添加轨迹运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEntityTrackMotion(
    targetPos: Tuple[float, float, float],
    duraTime: float,
    startPos: Optional[Tuple[float, float, float]] = None,
    relativeCoord: bool = False,
    isLoop: bool = False,
    targetRot: Optional[Tuple[float, float]] = None,
    startRot: Optional[Tuple[float, float]] = None,
    useVelocityDir: bool = False,
    ease: TimeEaseType = TimeEaseType.linear,
) -> int
```

- targetPos: Tuple[float, float, float]，轨迹终点。
- duraTime: float，到达终点所需要的时间。
- startPos: Optional[Tuple[float, float, float]]，轨迹起点，默认为 None，表示以调用 [StartEntityMotion](/docs/docs/scripts/modapi/interfaces/entity/behavior#startentitymotion) 的位置作为起点。
- relativeCoord: bool，是否使用相对坐标设置起点和终点的位置以及朝向，默认为 False。
- isLoop: bool，是否循环，若设为 True，则实体会在起点和终点之间往复运动，默认为 False。
- targetRot: Optional[Tuple[float, float]]，实体到达 targetPos 时的朝向，受参数 relativeCoord 影响，默认为 None，表示使用调用 [StartEntityMotion](/docs/docs/scripts/modapi/interfaces/entity/behavior#startentitymotion) 时的朝向。
- startRot: Optional[Tuple[float, float]]，实体到达 startPos 时的朝向，受参数 relativeCoord 影响，默认为 None，表示使用调用 [StartEntityMotion](/docs/docs/scripts/modapi/interfaces/entity/behavior#startentitymotion) 时的朝向。
- useVelocityDir: bool，是否使用运动中的速度方向作为朝向，默认为 False，若为 True，则参数 targetRot 和 startRot 无效。
- ease: TimeEaseType，时间变化函数, 默认值为 serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().TimeEaseType.linear, 参数不在枚举值中也当作 linear。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 该接口不屏蔽生物本身的 AI 运动，并且生物在空中时会受到跌落伤害，当有 AI 运动发生时，最终的表现结果可能与预期有差异，建议将生物设置为 NPC。
- 轨迹运动器不可叠加，仅能添加一个。
- 由于引擎中在加载的区块以外的实体时会停止一切活动，建议将运动范围控制在玩家位置±100 内。
- 设置朝向后会根据相应的参数计算出最终朝向，若此时的 targetRot > startRot，则会顺时针旋转，反之逆时针旋转。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
target = (5, 0, 0)
rot1 = (0, 0)
rot2 = (0, 360)
mID = motionComp.AddEntityTrackMotion(target, 3.0, startPos=None, relativeCoord=True, isLoop=False, targetRot=rot1, startRot=rot2, useVelocityDir=True, ease = serverApi.GetMinecraftEnum().TimeEaseType.linear)
```

</TabItem>
</Tabs>

---

### AddEntityVelocityMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

给实体（不含玩家）添加速度运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEntityVelocityMotion(
    velocity: Tuple[float, float, float],
    accelerate: Optional[Tuple[float, float, float]] = None,
    useVelocityDir: bool = True,
) -> int
```

- velocity: Tuple[float, float, float]，速度，包含大小、方向。
- accelerate: Optional[Tuple[float, float, float]]，加速度，包含大小、方向，默认为 None，表示没有加速度。
- useVelocityDir: bool，是否使用当前速度的方向作为此刻实体的朝向，默认为 True。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 该接口不屏蔽生物本身的 AI 运动以及重力作用，当有 AI 运动发生时，最终的表现结果可能与预期有差异。
- 速度运动器可叠加多个，且可与环绕运动器互相叠加。
- 由于引擎中在加载的区块以外的实体时会停止一切活动，建议将实体的运动范围控制在玩家位置±100 内。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
velocity = (0, 0, 1)
accelerate = (0, 0, -1)
mID = motionComp.AddEntityVelocityMotion(velocity, accelerate, useVelocityDir=True)
#启动该运动器
motionComp.StartEntityMotion(mID)
```

</TabItem>
</Tabs>

---

### ChangeRiderSeat

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

设置骑乘者在当前坐骑上的序号。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeRiderSeat(riderIndex: int) -> bool
```

- riderIndex: int，指定实体成为第 n 个骑乘者，范围为 0~SeatCount-1。

**返回值**：bool，设置结果。

**备注**

- 通常需要配合 [SetEntityRide](/docs/docs/scripts/modapi/interfaces/entity/behavior#setentityride)、[SetControl](/docs/docs/scripts/modapi/interfaces/entity/behavior#setcontrol) 一起使用，需要被骑乘生物 json 中骑乘组件支持骑乘者的生物类型。
- 未通过 [SetEntityLockRider](/docs/docs/scripts/modapi/interfaces/entity/behavior#setentitylockrider) 锁定的实体，退出存档重进或有新的骑乘者时会遵循原版逻辑重置实体上的骑乘者。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.ChangeRiderSeat(1)
```

</TabItem>
</Tabs>

---

### DeleteEntitySeat

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

删除坐骑座位。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DeleteEntitySeat(seatIndex: int) -> bool
```

- seatIndex: int，座位序号，范围为 0~最大座位序号。

**返回值**：bool，设置结果。

**备注**

- 通常需要配合 [SetEntityRide](/docs/docs/scripts/modapi/interfaces/entity/behavior#setentityride)、[SetControl](/docs/docs/scripts/modapi/interfaces/entity/behavior#setcontrol) 一起使用，需要被骑乘生物 json 中骑乘组件支持骑乘者的生物类型。
- 只能删除通过接口 [AddEntitySeat](/docs/docs/scripts/modapi/interfaces/entity/behavior#addentityseat) 添加的座位。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.DeleteEntitySeat(1)
```

</TabItem>
</Tabs>

---

### GetAttackTarget

<Server/> ActionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAction(entityId)`

获取仇恨目标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAttackTarget() -> str
```


**返回值**：str，返回仇恨目标的实体 id。如果传入的实体 id 所对应的实体没有仇恨目标，则返回-1。如果传入的实体 id 所对应的实体不存在，则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAction(entityId)
comp.GetAttackTarget()
```

</TabItem>
</Tabs>

<Client/> ActionCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateAction(entityId)`

获取仇恨目标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAttackTarget() -> str
```


**返回值**：str，返回仇恨目标的实体 id。如果传入的实体 id 所对应的实体没有仇恨目标，则返回-1。如果传入的实体 id 所对应的实体不存在，则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateAction(entityId)
comp.GetAttackTarget()
```

</TabItem>
</Tabs>

---

### GetBlockControlAi

<Server/> ControlAiCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateControlAi(entityId)`

获取生物原生 AI 是否被屏蔽。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockControlAi() -> bool
```


**返回值**：bool，AI 是否保留。False 为 AI 被屏蔽。

**备注**

- 屏蔽 AI 后的生物无法行动，不受重力且不会被推动。但是可以受到伤害，也可以被玩家交互（例如马被骑或村民被交易）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateControlAi(entityId)
comp.GetBlockControlAi()
```

</TabItem>
</Tabs>

---

### GetComponents

<Server/> EntityEventComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityEvent(entityId)`

获取指定实体的生效 Components。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetComponents() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，指定实体的生效 Components。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityEvent(entityId)
print(comp.GetComponents())
```

</TabItem>
</Tabs>

---

### GetCustomGoalCls

<Server/>

模块级函数，直接调用。

用于获取服务器自定义行为节点的基类。实现新的行为节点时，需要继承该接口返回的类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCustomGoalCls() -> type(CustomGoal)
```


**返回值**：type(CustomGoal)，服务端自定义行为节点类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
CustomGoal = serverApi.GetCustomGoalCls()
class CustomGoalDemo(CustomGoal):
    def __init__(self, entityId, argsJson):
        CustomGoalCls.__init__(self, entityId, argsJson)
```

</TabItem>
</Tabs>

---

### GetEntityMotions

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

获取实体（不含玩家）身上的所有运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityMotions() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，运动器集合，key 值代表运动器 mID，value 值代表运动器类型 0：轨迹运动器、1：速度运动器、2：环绕运动器。

**备注**

- 运动器非人为停止后会被移除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
motions = motionComp.GetEntityMotions()
# motions = {
#   0:1,
#   1:2
# }
```

</TabItem>
</Tabs>

---

### GetJumpPower

<Server/> GravityComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGravity(entityId)`

获取生物跳跃力度，0.42 表示正常水平。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetJumpPower() -> float
```


**返回值**：float，返回生物跳跃力度。

**备注**

- 生物跳跃力度影响生物跳跃高度。
- 由于 python 浮点数值精度问题，返回的数据字典中的浮点数可能会带有小数点后多位的现象，例如跳跃力度原本为 0.2，则返回的的值可能会变为 0.20000000298，请注意。
- 兔子无法在外部通过 [SetJumpPower](/docs/docs/scripts/modapi/interfaces/entity/behavior#setjumppower) 设置跳跃力度，因此调用此接口时，获取到的为实际兔子的跳跃力度，而不是 [SetJumpPower](/docs/docs/scripts/modapi/interfaces/entity/behavior#setjumppower) 设置的值。
- 使用指令，跳跃药水，跳跃箭等改变能跳跃高度，但并不影响 jumpPower 的值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGravity(entityId)
comp.GetJumpPower()
```

</TabItem>
</Tabs>

---

### GetLeashHolder

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取实体被使用拴绳牵引时牵引者的 ID。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLeashHolder() -> str
```


**返回值**：str，牵引者 ID，调用失败或者没有则返回 -1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetLeashHolder()
```

</TabItem>
</Tabs>

---

### GetMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

获取生物（含玩家）的瞬时移动方向向量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMotion() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，瞬时移动方向向量，异常时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
motionComp.GetMotion()
```

</TabItem>
</Tabs>

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorMotion(entityId)`

获取生物的瞬时移动方向向量。与服务端不同，客户端不会计算摩擦等因素，获取到的是上一帧的向量，与服务器获取到的值会不相等。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMotion() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，瞬时移动方向向量，异常时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
motionComp = clientApi.GetEngineCompFactory().CreateActorMotion(entityId)
motionComp.GetMotion()
```

</TabItem>
</Tabs>

---

### GetOwnerId

<Server/> TameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateTame(entityId)`

获取驯服生物的主人 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOwnerId() -> str
```


**返回值**：str，主人 id，不存在时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateTame(entityId)
oid = comp.GetOwnerId()
```

</TabItem>
</Tabs>

<Client/> TameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTame(entityId)`

获取驯服生物的主人 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOwnerId() -> str
```


**返回值**：str，主人 id，不存在时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTame(entityId)
oid = comp.GetOwnerId()
```

</TabItem>
</Tabs>

---

### GetRiders

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

获取坐骑上的骑乘者信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRiders() -> List[Dict[str, Any]]
```


**返回值**：List[Dict[str, Any]]，骑乘者信息，包括骑乘者的 entityId，其在骑乘者列表中的序号 riderIndex 以及所坐的座位序号 seatIndex。

**备注**

- 通常需要配合 [SetEntityRide](/docs/docs/scripts/modapi/interfaces/entity/behavior#setentityride)、[SetControl](/docs/docs/scripts/modapi/interfaces/entity/behavior#setcontrol) 一起使用，需要被骑乘生物 json 中骑乘组件支持骑乘者的生物类型。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
riders = comp.GetRiders()
```

</TabItem>
</Tabs>

---

### GetStepHeight

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

返回玩家前进非跳跃状态下能上的最大台阶高度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetStepHeight() -> float
```


**返回值**：float，台阶高度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
print(comp.GetStepHeight())
```

</TabItem>
</Tabs>

---

### Hurt

<Server/> HurtCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateHurt(playerId)`

设置实体伤害。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Hurt(
    damage: float,
    cause: str,
    attackerId: Optional[str] = None,
    childAttackerId: Optional[str] = None,
    knocked: bool = True,
    customTag: str,
) -> bool
```

- damage: float，伤害值 SetHurtByEntityNew。
- cause: str，伤害来源，详见 Minecraft 枚举值文档的[ActorDamageCause 枚举](/docs/docs/scripts/modapi/enums#actordamagecause)。
- attackerId: Optional[str]，伤害来源的实体 id，默认为 None。
- childAttackerId: Optional[str]，伤害来源的子实体 id，默认为 None，比如玩家使用抛射物对实体造成伤害，该值应为抛射物 Id。
- knocked: bool，实体是否被击退，默认值为 True。
- customTag: str，标识自定义伤害来源，只在 cause 为 Custom 生效，可在 [ActorHurtServerEvent](/docs/docs/scripts/modapi/events/entity#actorhurtserverevent)、[ActuallyHurtServerEvent](/docs/docs/scripts/modapi/events/entity#actuallyhurtserverevent)、[DamageEvent](/docs/docs/scripts/modapi/events/entity#damageevent)、[PlayerHurtEvent](/docs/docs/scripts/modapi/events/player#playerhurtevent)、[PlayerDieEvent](/docs/docs/scripts/modapi/events/player#playerdieevent)、[MobDieEvent](/docs/docs/scripts/modapi/events/entity#mobdieevent) 监听到标识。

**返回值**：bool，是否设置成功。

**备注**

- 当 knocked 设为 True 时，必须同时设置伤害源 attackerId，knocked 才会生效，击退方向根据攻击源与实体的位置计算。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateHurt(playerId)
comp.Hurt(10, serverApi.GetMinecraftEnum().ActorDamageCause.EntityAttack, attackerId, None, False)
```

</TabItem>
</Tabs>

---

### ImmuneDamage

<Server/> HurtCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateHurt(entityId)`

设置实体是否免疫伤害（该属性存档）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ImmuneDamage(immune: bool) -> bool
```

- immune: bool，是否免疫伤害。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateHurt(entityId)
comp.ImmuneDamage(True)
```

</TabItem>
</Tabs>

---

### IsEating

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断非玩家实体是否在进食。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsEating() -> bool
```


**返回值**：bool，是否在进食。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsEating()
```

</TabItem>
</Tabs>

---

### IsEntityOnFire

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

获取实体是否着火。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsEntityOnFire() -> bool
```


**返回值**：bool，是否着火。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
isOnFire = comp.IsEntityOnFire()
```

</TabItem>
</Tabs>

---

### IsLootDropped

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取生物是否生成掉落物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsLootDropped() -> bool
```


**返回值**：bool，是否能生成战利品。

**备注**

- 仅在开启战利品生成效果下生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsLootDropped()
```

</TabItem>
</Tabs>

---

### IsPersistent

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断是否为持久性生物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsPersistent() -> bool
```


**返回值**：bool，是否为持久性生物。

**备注**

- 当前几乎所有自然生成的生物在模拟距离为 4 时都会在距离玩家 44 格或更远时被清除。模拟距离为 6 或更高时，生物会在模拟距离边界处（距最近的玩家至多 128 格）被清除。
- 所有鱼都会在距离玩家至少 40 格时被清除，无论模拟距离为何。
- 如果生物在距最近的玩家 32 至 44 格处，其必须在 30 秒内没有受伤，然后就会有八百分之一的概率被清除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsPersistent()
```

</TabItem>
</Tabs>

---

### IsRoaring

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断是否处于咆哮状态，截止至网易 2.9 版本，仅对劫掠兽有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsRoaring() -> bool
```


**返回值**：bool，是否处于咆哮状态。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsRoaring()
```

</TabItem>
</Tabs>

---

### IsStunned

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

判断是否处于眩晕状态，截止至网易 2.9 版本，仅对劫掠兽有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsStunned() -> bool
```


**返回值**：bool，是否处于眩晕状态。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.IsStunned()
```

</TabItem>
</Tabs>

---

### RemoveActorComponent

<Server/> EntityEventComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityEvent(entityId)`

删除指定实体的指定 Component。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveActorComponent(componentName: str) -> bool
```

- componentName: str，实体行为包中定义的 component 的键名。

**返回值**：bool，指令是否成功发出。

**备注**

- 该接口不会判断生物的 json 是否具有传入的 Component，返回值的结果只代表指令是否正常发出。
- [AddActorComponent](/docs/docs/scripts/modapi/interfaces/entity/behavior#addactorcomponent)、[AddActorComponentGroup](/docs/docs/scripts/modapi/interfaces/entity/behavior#addactorcomponentgroup)、RemoveActorComponent、[RemoveActorComponentGroup](/docs/docs/scripts/modapi/interfaces/entity/behavior#removeactorcomponentgroup) 之间会互相影响，结果依据执行顺序而定。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityEvent(entityId)
comp.RemoveActorComponent("minecraft:attack")
```

</TabItem>
</Tabs>

---

### RemoveActorComponentGroup

<Server/> EntityEventComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityEvent(entityId)`

移除指定实体在实体 json 中配置的 ComponentGroup。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveActorComponentGroup(groupName: str) -> bool
```

- groupName: str，实体行为包中定义的 component_group 的键名。

**返回值**：bool，指令是否成功发出。

**备注**

- 该接口不会判断生物的 json 是否具有传入的 groupName，返回值的结果只代表指令是否正常发出。
- 在羊的 entity json 文件中 component_groups 字段下配置羊的大小：

```text
"component_groups": {
    "minecraft:sheep_baby": {
        "minecraft:is_baby": {
        },
        "minecraft:scale": {
            "value": 0.5
        },
        "minecraft:ageable": {
            "duration": 1200,
            "feed_items": "wheat",
            "grow_up": {
                "event": "minecraft:ageable_grow_up",
                "target": "self"
            }
        },
        "minecraft:behavior.follow_parent": {
            "priority": 6,
            "speed_multiplier": 1.1
        }
    },
    "minecraft:sheep_adult": {
        "minecraft:experience_reward": {
            "on_bred": "Math.Random(1,7)",
            "on_death": "query.last_hit_by_player ? Math.Random(1,3) : 0"
        },
        "minecraft:behavior.breed": {
            "priority": 3,
            "speed_multiplier": 1.0
        },
        "minecraft:breedable": {
            "require_tame": false,
            "breeds_with": {
                "mate_type": "minecraft:sheep",
                "baby_type": "minecraft:sheep"
            },
            "breed_items": "wheat"
        }
    }
}
```

</TabItem>
<TabItem value="示例" label="示例">

```text
"component_groups": {
    "minecraft:sheep_baby": {
        "minecraft:is_baby": {
        },
        "minecraft:scale": {
            "value": 0.5
        },
        "minecraft:ageable": {
            "duration": 1200,
            "feed_items": "wheat",
            "grow_up": {
                "event": "minecraft:ageable_grow_up",
                "target": "self"
            }
        },
        "minecraft:behavior.follow_parent": {
            "priority": 6,
            "speed_multiplier": 1.1
        }
    },
    "minecraft:sheep_adult": {
        "minecraft:experience_reward": {
            "on_bred": "Math.Random(1,7)",
            "on_death": "query.last_hit_by_player ? Math.Random(1,3) : 0"
        },
        "minecraft:behavior.breed": {
            "priority": 3,
            "speed_multiplier": 1.0
        },
        "minecraft:breedable": {
            "require_tame": false,
            "breeds_with": {
                "mate_type": "minecraft:sheep",
                "baby_type": "minecraft:sheep"
            },
            "breed_items": "wheat"
        }
    }
}
```

</TabItem>
</Tabs>

---

### RemoveEntityMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

移除实体（不含玩家）身上的运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveEntityMotion(motionId: int) -> bool
```

- motionId: int，要移除的某个运动器的 ID。

**返回值**：bool，是否成功移除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
motionComp.RemoveEntityMotion(mID)
```

</TabItem>
</Tabs>

---

### ResetAttackTarget

<Server/> ActionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAction(entityId)`

清除仇恨目标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetAttackTarget() -> bool
```


**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAction(entityId)
comp.ResetAttackTarget()
```

</TabItem>
</Tabs>

---

### ResetMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

重置生物（不含玩家）的瞬时移动方向向量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetMotion() -> bool
```


**返回值**：bool，设置是否成功。

**备注**

- 该接口只能重置 [SetMotion](/docs/docs/scripts/modapi/interfaces/entity/behavior#setmotion) 所设置的瞬时移动方向向量，无法影响由生物本身的 AI 所产生的运动。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
motionComp.ResetMotion()
```

</TabItem>
</Tabs>

---

### ResetStepHeight

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

恢复引擎默认玩家前进非跳跃状态下能上的最大台阶高度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetStepHeight() -> bool
```


**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
comp.ResetStepHeight()
```

</TabItem>
</Tabs>

---

### SetActorCollidable

<Server/> ActorCollidableCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorCollidable(entityId)`

设置实体是否可碰撞。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetActorCollidable(isCollidable: int) -> bool
```

- isCollidable: int，0:可碰撞 1:不可碰撞。

**返回值**：bool，True 表示设置成功。

**备注**

- 碰撞是指生物碰撞盒重叠。
- 参数 isCollidable 是由 bool 控制的所以传入其它非 0 的 int 时等同于传入 1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateActorCollidable(entityId)
success = comp.SetActorCollidable(1)
```

</TabItem>
</Tabs>

---

### SetActorPushable

<Server/> ActorPushableCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorPushable(entityId)`

设置实体是否可推动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetActorPushable(isPushable: int) -> bool
```

- isPushable: int，0:不可推动 1:可推动。

**返回值**：bool，True 表示设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateActorPushable(entityId)
success = comp.SetActorPushable(1)
```

</TabItem>
</Tabs>

---

### SetAttackTarget

<Server/> ActionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAction(entityId)`

设置仇恨目标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAttackTarget(targetId: str) -> bool
```

- targetId: str，目标实体 id。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAction(entityId)
comp.SetAttackTarget(targetId)
```

</TabItem>
</Tabs>

---

### SetBlockControlAi

<Server/> ControlAiCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateControlAi(entityId)`

设置屏蔽生物原生 AI。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockControlAi(isBlock: bool, freezeAnim: bool = False) -> bool
```

- isBlock: bool，是否保留 AI，False 为屏蔽。
- freezeAnim: bool，屏蔽 AI 时是否冻结动作，默认为 False，仅当 isBlock 为 False 时生效。重进世界会恢复成初始动作。

**返回值**：bool，设置结果。

**备注**

- 屏蔽 AI 后的生物无法行动，不受重力且不会被推动，但是可以受到伤害，也可以被玩家交互（例如马被骑或村民被交易）。
- 对玩家无效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateControlAi(entityId)
comp.SetBlockControlAi(False, True)
```

</TabItem>
</Tabs>

---

### SetCanOtherPlayerRide

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

设置其他玩家是否有权限骑乘，True 表示每个玩家都能骑乘，False 只有驯服者才能骑乘。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanOtherPlayerRide(tamedEntityId: str, canRide: bool) -> bool
```

- tamedEntityId: str，可骑乘生物 id。
- canRide: bool，是否控制。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 驯服生物
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.SetCanOtherPlayerRide(entityId,False)
```

</TabItem>
</Tabs>

---

### SetControl

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

设置该生物无需装备鞍就可以控制行走跳跃。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetControl(tamedEntityId: str, isControl: bool) -> bool
```

- tamedEntityId: str，可骑乘生物 id。
- isControl: bool，是否控制。

**返回值**：bool，设置结果。

**备注**

- 该接口仅对已被驯服的可骑乘生物生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.SetControl(entityId,True)
```

</TabItem>
</Tabs>

---

### SetEntityInteractFilter

<Server/> InteractComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateInteract(entityId)`

设置与生物可交互的条件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityInteractFilter(index: int, interactFilter: str) -> bool
```

- index: int，交互列表下标。
- interactFilter: str，可交互的条件。

**返回值**：bool，设置结果。

**备注**

- 该接口修改 minecraft:interact->on_interact 中的 filters 的定义。
- 仅当生物存在 minecraft:interact 组件时才能调用该接口，例如牛、羊驼、猪灵等。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
import json
comp = serverApi.GetEngineCompFactory().CreateInteract(entityId)
filterDict = {
    "filters": {
        "all_of": [
            { "test": "is_family", "subject" : "other", "value" :  "player"},
            { "test": "has_equipment", "domain": "hand", "subject": "other", "value": "bucket:0"}
        ]
    }
}
filterStr = json.dumps(filterDict)
comp.SetEntityInteractFilter(0, filterStr)
```

</TabItem>
</Tabs>

---

### SetEntityLockRider

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

设置坐骑上的实体是否锁定序号。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityLockRider(isLock: bool) -> bool
```

- isLock: bool，是否锁定实体当前所处的序号。

**返回值**：bool，设置结果。

**备注**

- 通常需要配合 [SetEntityRide](/docs/docs/scripts/modapi/interfaces/entity/behavior#setentityride)、[SetControl](/docs/docs/scripts/modapi/interfaces/entity/behavior#setcontrol) 一起使用，需要被骑乘生物 json 中骑乘组件支持骑乘者的生物类型。
- 锁定以后，该坐骑上某个实体停止骑乘后不会改变坐骑上其他实体当前所处的座位。
- 解除锁定后，不会立刻改变坐骑上骑乘者的位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 锁定骑乘者序号
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.SetEntityLockRider(True)
```

</TabItem>
</Tabs>

---

### SetEntityOnFire

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

设置实体着火。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityOnFire(seconds: int, burn_damage: int = 1) -> bool
```

- seconds: int，着火时间（单位：秒），当传入参数 seconds 小于等于 0 时，将让着火的实体灭火。
- burn_damage: int，着火状态下每秒扣的血量,不传的话默认是 1。

**返回值**：bool，是否设置成功。

**备注**

- 在水中或者雨中不会生效，着火时间受生物装备、生物的状态影响。burn_damage 取值范围是 0~1000,小于 0 将取 0，大于 1000 将取 1000。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
comp.SetEntityOnFire(1, 2)
```

</TabItem>
</Tabs>

---

### SetEntityRide

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

驯服可骑乘生物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityRide(playerId: str, tamedEntityId: str) -> bool
```

- playerId: str，玩家 id。
- tamedEntityId: str，要驯服的可骑乘生物 id。

**返回值**：bool，设置结果。

**备注**

- 驯服信息会被存盘。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 驯服生物
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.SetEntityRide(playerId,entityId)
```

</TabItem>
</Tabs>

---

### SetEntitySeat

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

设置坐骑座位的位置、旋转以及允许实体旋转范围。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntitySeat(
    seatIndex: int,
    pos: Tuple[float, float, float],
    rot: float = 0,
    lock_rot: float,
) -> bool
```

- seatIndex: int，座位序号，范围为 0~最大座位序号。
- pos: Tuple[float, float, float]，座位位置。
- rot: float，座位旋转，默认为 0。
- lock_rot: float，骑乘者允许旋转角度范围，默认不限制。

**返回值**：bool，设置结果。

**备注**

- 通常需要配合 [SetEntityRide](/docs/docs/scripts/modapi/interfaces/entity/behavior#setentityride)、[SetControl](/docs/docs/scripts/modapi/interfaces/entity/behavior#setcontrol) 一起使用，需要被骑乘生物 json 中骑乘组件支持骑乘者的生物类型。
- 只能修改通过接口 [AddEntitySeat](/docs/docs/scripts/modapi/interfaces/entity/behavior#addentityseat) 添加的座位。
- 非玩家实体即使所处座位的 lock_rot 参数为默认值，也不可 360 度旋转。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.SetEntitySeat(0, (1.0, 1.0, 1.0), 90.0, 90.0)
```

</TabItem>
</Tabs>

---

### SetEntityShareablesItems

<Server/> ShareableComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateShareables(entityId)`

设置生物可分享/可拾取的物品列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityShareablesItems(items: List[Dict[str, Any]]) -> bool
```

- items: List[Dict[str, Any]]，可分享/可拾取的物品列表。

**返回值**：bool，设置结果。

**备注**

- 该接口修改 minecraft:shareables 的 items 定义。
- 仅当生物存在 minecraft:shareables 组件时才能调用该接口，例如狐狸、尸壳、猪灵等。若 admire 为 True,则生物还需要有 minecraft:admire_item 组件。若 barter 为 True,则生物还需有 minecraft:behavior.barter 行为。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateShareables(entityId)
shareableItems = []
shareableItems.append({
    "item": "minecraft:golden_sword",
    "auxValue": 0,
    "priority": 1,
    "pickupLimit": 1,
    "barter": True,
    "admire": True,
})
comp.SetEntityShareablesItems(shareableItems)
```

</TabItem>
</Tabs>

---

### SetEntityTamed

<Server/> TameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateTame(entityId)`

设置生物驯服，需要配合 entityEvent 组件使用。该类驯服不包含骑乘功能。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityTamed(playerId: str, tamedId: str) -> bool
```

- playerId: str，驯服玩家 Id。
- tamedId: str，被驯服的生物 Id。

**返回值**：bool，设置结果。

**备注**

- 驯服一个生物，需要按以下步骤：搭配修改生物 json 文件，使其能够被驯服：- 添加 minecraft:tameable 组件 - 添加一个 component group，包含 minecraft:is_tamed 组件，以及其他驯服后的行为 - 添加一个 event，添加刚刚添加的 component group，并移除不需要的 component group 使用 SetEntityTamed 使目标生物被驯服使用 [TriggerCustomEvent](/docs/docs/scripts/modapi/interfaces/entity/behavior#triggercustomevent) 触发驯服 event 如果是对原版可驯服生物使用，则无需按照第一步修改 json，而是找到已有的 event，在第三步中触发即可。
- 如修改苦力怕可被驯服，json 做如下修改：

```text
{
    "format_version": "1.8.0",
    "minecraft:entity": {
    "description": {
      "identifier": "minecraft:creeper",
      "is_spawnable": true,
      "is_summonable": true,
      "is_experimental": false
    },
    "component_groups": {
        ...
        //增加驯服状态
        "netease:creeper_tame":{
          "minecraft:is_tamed": {
          },
          //跟随主人
          "minecraft:behavior.follow_owner": {
            "priority": 4,  //优先级要高于其他移动行为
            "speed_multiplier": 1.0,
            "start_distance": 10,
            "stop_distance": 2
          }
        }
      },

      "components": {
        ...
        //增加驯服组件，使用骨头驯服
        "minecraft:tameable": {
          "probability": 0.33,
          "tameItems": "bone",
          "tame_event": {
            "event": "netease:on_tame",
            "target": "self"
          }
        }
      },

      "events": {
        ...
        //增加驯服事件
        "netease:on_tame": {
          //移除掉所有跟爆炸有关的逻辑
          "remove": {
            "component_groups": [
              "minecraft:exploding",
              "minecraft:charged_exploding",
              "minecraft:forced_exploding",
              "minecraft:forced_charged_exploding",
              "minecraft:charged_creeper"
            ]
          },
          //添加netease:creeper_tame
          "add": {
            "component_groups": [
              "netease:creeper_tame"
            ]
          }
        }
      }
    }
}
```

</TabItem>
<TabItem value="示例" label="示例">

```text
{
    "format_version": "1.8.0",
    "minecraft:entity": {
    "description": {
      "identifier": "minecraft:creeper",
      "is_spawnable": true,
      "is_summonable": true,
      "is_experimental": false
    },
    "component_groups": {
        ...
        //增加驯服状态
        "netease:creeper_tame":{
          "minecraft:is_tamed": {
          },
          //跟随主人
          "minecraft:behavior.follow_owner": {
            "priority": 4,  //优先级要高于其他移动行为
            "speed_multiplier": 1.0,
            "start_distance": 10,
            "stop_distance": 2
          }
        }
      },

      "components": {
        ...
        //增加驯服组件，使用骨头驯服
        "minecraft:tameable": {
          "probability": 0.33,
          "tameItems": "bone",
          "tame_event": {
            "event": "netease:on_tame",
            "target": "self"
          }
        }
      },

      "events": {
        ...
        //增加驯服事件
        "netease:on_tame": {
          //移除掉所有跟爆炸有关的逻辑
          "remove": {
            "component_groups": [
              "minecraft:exploding",
              "minecraft:charged_exploding",
              "minecraft:forced_exploding",
              "minecraft:forced_charged_exploding",
              "minecraft:charged_creeper"
            ]
          },
          //添加netease:creeper_tame
          "add": {
            "component_groups": [
              "netease:creeper_tame"
            ]
          }
        }
      }
    }
}
```

</TabItem>
</Tabs>

---

### SetJumpPower

<Server/> GravityComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGravity(entityId)`

设置生物跳跃力度，0.42 表示正常水平。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetJumpPower(jumpPower: float) -> bool
```

- jumpPower: float，跳跃力度，正常是 0.42。

**返回值**：bool，是否设置成功。

**备注**

- 生物跳跃力度影响生物跳跃高度；本接口调用时需要客户端加载完成，如在 AddServerPlayer 中，客户端还没加载完成，要延后执行才能生效。
- 兔子跳跃高度是内置的，无法通过 SetJumpPower 设置跳跃力度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGravity(entityId)
comp.SetJumpPower(0.84)
```

</TabItem>
</Tabs>

---

### SetLeashHolder

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

为实体添加牵引者，与原版拴绳的作用相同，详见[基岩版栓绳介绍](https://zh.minecraft.wiki/w/%E6%8B%B4%E7%BB%B3)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLeashHolder(holderId: str) -> bool
```

- holderId: str，牵引者 Id。

**返回值**：bool，是否成功。

**备注**

- 如果牵引者和被牵者距离太远将会瞬间断开。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetLeashHolder(playerId)
```

</TabItem>
</Tabs>

---

### SetLootDropped

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

设置生物是否生成掉落物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLootDropped(isLootDropped: bool) -> bool
```

- isLootDropped: bool，设置生物是否生成掉落物。

**返回值**：bool，是否设置成功。

**备注**

- 仅在开启战利品生成效果下生效，对玩家不生效，玩家可在设置界面设置死亡不掉。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.SetLootDropped(True)
```

</TabItem>
</Tabs>

---

### SetMobKnockback

<Server/> ActionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAction(entityId)`

设置击退的初始速度，需要考虑阻力的影响。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMobKnockback(
    xd: float,
    zd: float,
    power: float,
    height: float,
    heightCap: float,
) -> None
```

- xd: float，x 轴方向，用來控制角度。
- zd: float，z 轴方向，用來控制角度。
- power: float，用来控制水平方向的初速度。
- height: float，竖直方向的初速度。
- heightCap: float，向上速度阈值，当实体本身已经有向上的速度时需要考虑这个值，用来确保最终向上的速度不会超过 heightCap。

**返回值**：None，无返回值。

**备注**

- 在 damageEvent 事件里面使用该接口时，需把 damageEvent 事件回调的 knock 参数设置为 False。
- 该接口会触发 [OnKnockBackServerEvent](/docs/docs/scripts/modapi/events/entity#onknockbackserverevent) 事件，所以当需要在该事件中使用时，请编写逻辑避免循环调用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAction(entityId)
comp.SetMobKnockback(0.1, 0.1, 1.0, 1.0, 1.0)
```

</TabItem>
</Tabs>

---

### SetMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateRot(entityId)`

设置生物（不含玩家）的瞬时移动方向向量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMotion(motion: Tuple[float, float, float]) -> bool
```

- motion: Tuple[float, float, float]，世界坐标系下的向量，该方向为世界坐标系下的向量，以 x,z,y 三个轴的正方向为正值，可以通过当前生物的 rot 组件判断目前玩家面向的方向，可在开发模式下打开 F3 观察数值变化。

**返回值**：bool，设置是否成功。

**备注**

- 在 damageEvent 事件里面使用该接口时，需把 damageEvent 事件回调的 knock 参数设置为 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# 使生物向准星的方向突进一段距离
rotComp = serverApi.GetEngineCompFactory().CreateRot(entityId)
rot = rotComp.GetRot()
x, y, z = serverApi.GetDirFromRot(rot)
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
motionComp.SetMotion((x * 5, y * 5, z * 5))
# rot 和 世界坐标系关系
#               ^ x -90°
#               |
# 180°/-180  ----------> z 0°
#               | 90°
```

</TabItem>
</Tabs>

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateRot(localPlayerId)`

设置瞬时的移动方向向量，用于本地玩家。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMotion(motion: Tuple[float, float, float]) -> bool
```

- motion: Tuple[float, float, float]，世界坐标系下的向量，该方向为世界坐标系下的向量，以 x,z,y 三个轴的正方向为正值，可以通过当前玩家的 rot 组件判断目前玩家面向的方向，可在开发模式下打开 F3 观察数值变化。

**返回值**：bool，设置是否成功。

**备注**

- 如果频繁快速修改本地玩家的瞬时移动向量，可能会触发引擎服务端的反作弊机制（例如掉落伤害），需要频繁快速修改时最好搭配服务端 SetMotion 同步修改。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 使玩家向准星的方向突进一段距离
localPlayerId = clientApi.GetLocalPlayerId()
rotComp = clientApi.GetEngineCompFactory().CreateRot(localPlayerId)
rot = rotComp.GetRot()
x, y, z = clientApi.GetDirFromRot(rot)
motionComp = clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)
motionComp.SetMotion((x * 5, y * 5, z * 5))
# rot 和 世界坐标系关系
#               ^ x -90°
#               |
# 180°/-180  ----------> z 0°
#               | 90°
```

</TabItem>
</Tabs>

---

### SetMoveSetting

<Server/> MoveToComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateMoveTo(entityId)`

寻路组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMoveSetting(
    pos: Tuple[float, float, float],
    speed: float,
    maxIteration: int = 200,
    callback: Callable,
) -> Any
```

- pos: Tuple[float, float, float]，寻路目标位置。
- speed: float，移动速度，指正常移动速度的倍率。如 1.0 表示正常速度，2.0 表示两倍速。
- maxIteration: int，寻路算法最大迭代次数 默认 200。
- callback: Callable，寻路结束回调函数。

**备注**

- 使用该接口时，需要在生物中配置有寻路的 json 组件。配置寻路 json 组件后，该接口会自动选择相应类型的寻路 目前支持的寻路 json 组件包括：minecraft:navigation.walk 陆地寻路，与原版僵尸的寻路相同 minecraft:navigation.generic 水陆寻路，支持陆地与水中，与原版溺尸的寻路相同 minecraft:navigation.climb 陆地寻路，但是支持爬墙，与原版蜘蛛的寻路相同。这种寻路可能会被头顶方块阻挡，一直无法抵达目的地 minecraft:navigation.fly 空中寻路，与原版鹦鹉的寻路相同 以上的寻路都需要搭配一些其他 json 组件（例如 movement）使用，具体可以参考 NavigationMod 的示例 上面没有提到的 navigation 类型暂不支持，例如 minecraft:navigation.float（如原版恶魂），minecraft:navigation.hover（如原版蜜蜂）。
- 不同的生物拥有不同的默认最大跟随距离，若要寻路的目标点距离大于此值引擎会拒绝寻路，要修改该距离可以通过在 entity 的 json 中配置.。

```json
{
  "format_version": "1.8.0",
  "minecraft:entity": {
      "components": {
          "minecraft:follow_range": {
            "value": 48,
            "max": 48
          }
      }
  }
}
```

- 关于 maxIteration 参数 该参数会影响实际寻到路径的长度。若寻路算法迭代一定次数后，未寻到目标点，会返回局部最优解，即生物只会走到半路。在无大型障碍物的情况下，参数对应的参考寻路距离如下：该参数默认值 200，最大值 2000,请开发者根据实际情况选择。

| maxIteration | 与目标点直线距离 |
| --- | --- |
| 200 | 13 |
| 500 | 20 |
| 1000 | 30 |
| 2000 | 43 |

- 关于 callback 函数 该函数需要接受两个参数，第一个参数为寻路的 entityId，类型 str，第二个参数为寻路结果，类型 int （玩家获取到的位置比地面会高 1.62 格，若以玩家位置为目标点需要先把 y 轴减去 1.62，否则 callback 会一直返回 1）。

| 结果 | 说明 |
| --- | --- |
| -3 | 寻路失败，大于跟随距离，或者生物周围没有可行走位置，或者对正在寻路的飞行系生物使用 |
| -2 | 寻路失败，生物没有寻路组件（指 minecraft:navigation） |
| -1 | 寻路失败，参数错误，或生物不存在 |
| 0 | 寻路完成。到达设定的目标点 |
| 1 | 寻路完成，但未到达目标点（可能由于 maxIteration 参数偏小） |
| 2 | 寻路中断。中途遇到障碍物被阻碍 |
| 3 | 寻路中断。被生物原版寻路行为覆盖，或寻路未结束时重复调用 moveTo 组件。<br/>若生物的移速太低（真实速度小于 0.3 格每秒），也会被当成寻路被卡住，返回该错误码 |

- 对于各种类型寻路的生物，还需要满足以下初始条件：陆地寻路，水陆寻路与爬墙寻路：需要满足以下任一条件：生物着地生物正在骑乘，并且骑乘物着地生物在液体中生物是凋零飞行寻路：需要满足以下任一条件：不在骑乘状态在液体中生物着地 json 配置中的 can_path_from_air 属性为 true。
- demo 简介：聊天栏输入 walk/generic/climb/fly 会原地生成一个使用对应 navigation json 组件的生物，然后跑到其他位置，再输入 go，会将刚才生成的生物导航到玩家当前位置。这 4 种示例生物的行为 json 可以在 NavigationMod_behavior/entities 目录查看。4 种示例生物的最大寻路距离都设置为了 48 格。

</TabItem>
<TabItem value="示例" label="示例">

```json
{
  "format_version": "1.8.0",
  "minecraft:entity": {
      "components": {
          "minecraft:follow_range": {
            "value": 48,
            "max": 48
          }
      }
  }
}
```

</TabItem>
</Tabs>

---

### SetPersistence

<Server/> PersistenceCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePersistence(entityId)`

设置实体是否持久化。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPersistence(isPersistent: bool) -> Any
```

- isPersistent: bool，True 为设置实体持久化，False 为设置实体不持久化。

**备注**

- 游戏中，实体默认持久化，若设置不持久化，则实体会在区块卸载和退出存档时被删除，不会存档。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePersistence(entityId)
comp.SetPersistence(True)
```

</TabItem>
</Tabs>

---

### SetRidePos

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

设置生物骑乘位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRidePos(tamedEntityId: str, pos: Tuple[float, float, float]) -> bool
```

- tamedEntityId: str，可骑乘生物 id。
- pos: Tuple[float, float, float]，骑乘时挂接点。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.SetRidePos(entityId,(1,1,1))
```

</TabItem>
</Tabs>

---

### SetRiderRideEntity

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

设置实体骑乘生物（或者船与矿车）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRiderRideEntity(riderId: str, riddenEntityId: str, riderIndex: int) -> bool
```

- riderId: str，骑乘生物 id。
- riddenEntityId: str，被骑乘生物 id。要求被骑乘生物的定义中具有 minecraft:rideable 组件，且组件中 family_types 含有可骑乘者的类型声明。
- riderIndex: int，指定实体成为第 n 个骑乘者，范围为 0~SeatCount-1，默认不指定。

**返回值**：bool，设置结果。

**备注**

- 通常需要配合 [SetEntityRide](/docs/docs/scripts/modapi/interfaces/entity/behavior#setentityride)、[SetControl](/docs/docs/scripts/modapi/interfaces/entity/behavior#setcontrol) 一起使用，需要被骑乘生物 json 中骑乘组件支持骑乘者的生物类型 当被控制的 entity 有多个位置时且开发者想要添加多个玩家时，第一个被添加的玩家会被引擎默认设置为控制者（riderIndex 参数为默认值时）。
- 当控制位为空，实体设置到控制位时，无论后座是否还有玩家，实体仍为控制者。
- 未通过 [SetEntityLockRider](/docs/docs/scripts/modapi/interfaces/entity/behavior#setentitylockrider) 锁定的实体，退出存档重进或有新的骑乘者时会遵循原版逻辑重置实体上的骑乘者。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 骑上坐骑
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.SetRiderRideEntity(playerId,rideEntityId)
```

</TabItem>
</Tabs>

---

### SetStepHeight

<Server/> AttrCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAttr(entityId)`

设置玩家前进非跳跃状态下能上的最大台阶高度, 默认值为 0.5625，1 的话表示能上一个台阶。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetStepHeight(stepHeight: float) -> bool
```

- stepHeight: float，最大高度，需要大于 0。

**返回值**：bool，是否设置成功。

**备注**

- 为了避免因浮点数误差导致错误，设置的时候通常会增加 1/16 个方块大小，即 0.0625。所以此处我们设置 2.0625。游戏中默认值是 0.5625，即半格高度。
- 只对玩家生效，无法修改其它实体该属性。
- 修改后不影响跳跃逻辑及跳跃高度，并不会因此而跳到更高，因此在某些特定情况下，你可以走上方块但跳不上去。
- 设置的步长值较大时，可能会存在可以跨到方块顶部，却走不到方块中间空隙的特殊情况。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAttr(entityId)
#如果前面放置有两格高的方块，玩家按前进能直接上去，无须跳跃
comp.SetStepHeight(2.0625)
```

</TabItem>
</Tabs>

---

### StartEntityMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

启动实体（不含玩家）身上的某个运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartEntityMotion(motionId: int) -> bool
```

- motionId: int，要启动的某个运动器的 ID。

**返回值**：bool，是否成功启动。

**备注**

- 运动器控制的实体会无视原生的碰撞逻辑而穿透方块，若需停止，请自行监听碰撞事件 [OnMobHitBlockServerEvent](/docs/docs/scripts/modapi/events/entity#onmobhitblockserverevent) 然后使用 [StopEntityMotion](/docs/docs/scripts/modapi/interfaces/entity/behavior#stopentitymotion) 停止。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
motionComp.StartEntityMotion(mID)
```

</TabItem>
</Tabs>

---

### StopEntityMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(entityId)`

停止实体（不含玩家）身上的某个运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopEntityMotion(motionId: int) -> bool
```

- motionId: int，要停止的某个运动器的 ID。

**返回值**：bool，是否成功停止。

**备注**

- 调用该接口不会触发事件 [EntityMotionStopServerEvent](/docs/docs/scripts/modapi/events/entity#entitymotionstopserverevent)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
motionComp.StopEntityMotion(mID)
```

</TabItem>
</Tabs>

---

### StopEntityRiding

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

强制骑乘者下坐骑。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopEntityRiding() -> bool
```


**返回值**：bool，当骑乘者当前正在骑乘并成功下坐骑返回 True，否则返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
success = comp.StopEntityRiding()
```

</TabItem>
</Tabs>

---

### TriggerCustomEvent

<Server/> EntityEventComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityEvent(entityId)`

触发生物自定义事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
TriggerCustomEvent(entityId: str, eventName: str) -> bool
```

- entityId: str，生物 Id。
- eventName: str，事件名称。

**返回值**：bool，设置结果。

**备注**

- 触发苦力怕爆炸 在苦力怕的 entity json 文件中 events 字段下增加如下事件,然后在 mod 中运行示例代码：

```text
"netease:custom_exploading":{
          "sequence": [
            {
              "filters": {
            "test": "has_component",
                "operator": "!=",
                "value": "minecraft:is_charged"
              },
              "add": {
                "component_groups": [
                  "minecraft:forced_exploding"
                ]
              }
            },
            {
              "filters": {
                "test": "has_component",
                "value": "minecraft:is_charged"
              },
              "add": {
                "component_groups": [
                  "minecraft:forced_charged_exploding"
                ]
              }
            }
          ]
        }
```

- 触发事件所添加或移除的 component_groups，会在下一帧才真正生效。

</TabItem>
<TabItem value="示例" label="示例">

```text
"netease:custom_exploading":{
          "sequence": [
            {
              "filters": {
            "test": "has_component",
                "operator": "!=",
                "value": "minecraft:is_charged"
              },
              "add": {
                "component_groups": [
                  "minecraft:forced_exploding"
                ]
              }
            },
            {
              "filters": {
                "test": "has_component",
                "value": "minecraft:is_charged"
              },
              "add": {
                "component_groups": [
                  "minecraft:forced_charged_exploding"
                ]
              }
            }
          ]
        }
```

</TabItem>
</Tabs>

---
