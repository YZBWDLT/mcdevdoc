---
sidebar_position: 7
---

# 行为

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录行为相关的接口，共 59 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wanjia/xingwei.html"/>

---

### AddPlayerAroundEntityMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(playerId)`

给玩家添加对实体环绕运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerAroundEntityMotion(
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
- radius: float，环绕半径，当设置为-1 时环绕运动器使用当前与目标的距离作为半径，当设置为非负数时表示按设定的值作为环绕半径，默认为-1。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 该接口会在客户端和服务端同步进行，使用前请确保环绕的对象在客户端和服务端都已创建。
- 该接口不屏蔽玩家控制的移动以及重力作用，当有玩家控制发生时，最终的表现结果可能与预期有差异。由于玩家的头部与相机控制相关，若需要使运动器控制玩家的头部，请使用 [DepartCamera](/docs/docs/scripts/modapi/player/camera#departcamera) 分离玩家与摄像机。
- 环绕运动器可叠加多个，且可与速度运动器互相叠加，每一帧的最终效果为各个运动器计算出的瞬时向量之和。
- 由于引擎中有加载的区块限制以及客户端对实体管理进行了优化，建议将玩家与目标之间的半径控制在 30 以内。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(playerId)
axis=(-1, 1, 1)
mID = motionComp.AddPlayerAroundEntityMotion(eID, 1.0, axis, lockDir=False, stopRad=0, radius=2.0)
#启动该运动器
motionComp.StartPlayerMotion(mID)
```

</TabItem>
</Tabs>

---

### AddPlayerAroundPointMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(playerId)`

给玩家添加对点环绕运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerAroundPointMotion(
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
- lockDir: bool，是否在运动器生效时锁定实体的朝向，不锁定则玩家的朝向会随着运动而改变，默认为 False。
- stopRad: float，停止该运动器所需要的弧度，当 stopRad 为 0 时，该运动器会一直运行，默认为 0。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 该接口不屏蔽玩家控制的移动以及重力作用，当有玩家控制发生时，最终的表现结果可能与预期有差异。由于玩家的头部与相机控制相关，若需要使运动器控制玩家的头部，请使用 [DepartCamera](/docs/docs/scripts/modapi/player/camera#departcamera) 分离玩家与摄像机。
- 环绕运动器可叠加多个，且可与速度运动器互相叠加，每一帧的最终效果为各个运动器计算出的瞬时向量之和。
- 由于引擎中有加载的区块限制，建议将玩家的运动范围控制在当前位置±100 内。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(playerId)
center = (0, 8, 0)
axis=(-1, 1, 1)
mID = motionComp.AddPlayerAroundPointMotion(center, 1.0, axis, lockDir=False, stopRad=0)
#启动该运动器
motionComp.StartPlayerMotion(mID)
```

</TabItem>
</Tabs>

---

### AddPlayerTrackMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(playerId)`

给玩家添加轨迹运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerTrackMotion(
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
- startPos: Optional[Tuple[float, float, float]]，轨迹起点，默认为 None，表示以调用 [StartPlayerMotion](/docs/docs/scripts/modapi/player/behavior#startplayermotion) 的位置作为起点。
- relativeCoord: bool，是否使用相对坐标设置起点和终点的位置以及朝向，默认为 False。
- isLoop: bool，是否循环，若设为 True，则玩家会在起点和终点之间往复运动，默认为 False。
- targetRot: Optional[Tuple[float, float]]，玩家到达 targetPos 时的朝向，受参数 relativeCoord 影响，默认为 None，表示使用调用 [StartPlayerMotion](/docs/docs/scripts/modapi/player/behavior#startplayermotion) 时的朝向。
- startRot: Optional[Tuple[float, float]]，玩家到达 startPos 时的朝向，受参数 relativeCoord 影响，默认为 None，表示使用调用 [StartPlayerMotion](/docs/docs/scripts/modapi/player/behavior#startplayermotion) 时的朝向。
- useVelocityDir: bool，是否使用运动中的速度方向作为朝向，默认为 False，若为 True，则参数 targetRot 和 startRot 无效。
- ease: TimeEaseType，时间变化函数, 默认值为 serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/general/tool#getminecraftenum)().TimeEaseType.linear, 参数不在枚举值中也当作 linear。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 该接口不屏蔽玩家控制的移动，当有玩家控制发生时，最终的表现结果可能与预期有差异。由于玩家的头部与相机控制相关，若需要使运动器控制玩家的头部，请使用 [DepartCamera](/docs/docs/scripts/modapi/player/camera#departcamera) 分离玩家与摄像机。
- 轨迹运动器不可叠加，仅能添加一个。
- 设置朝向后会根据相应的参数计算出最终朝向，若此时的 targetRot > startRot，则会顺时针旋转，反之逆时针旋转。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(playerId)
target = (5, 0, 0)
rot1 = (0, 0)
rot2 = (0, 360)
mID = motionComp.AddPlayerTrackMotion(target, 3.0, startPos=None, relativeCoord=True, isLoop=False, targetRot=rot1, startRot=rot2, useVelocityDir=True, ease = serverApi.GetMinecraftEnum().TimeEaseType.linear)
#启动该运动器
motionComp.StartPlayerMotion(mID)
```

</TabItem>
</Tabs>

---

### AddPlayerVelocityMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(playerId)`

给玩家添加速度运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerVelocityMotion(
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

- 该接口不屏蔽玩家控制的移动以及重力作用，当有玩家控制发生时，最终的表现结果可能与预期有差异。由于玩家的头部与相机控制相关，若需要使运动器控制玩家的头部，请使用 [DepartCamera](/docs/docs/scripts/modapi/player/camera#departcamera) 分离玩家与摄像机。
- 速度运动器可叠加多个，且可与环绕运动器互相叠加。
- 由于引擎中有加载的区块限制，建议将玩家的运动范围控制在当前位置±100 内。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(playerId)
velocity = (0, 0, 1)
accelerate = (0, 0, -1)
mID = motionComp.AddPlayerVelocityMotion(velocity, accelerate, useVelocityDir=True)
#启动该运动器
motionComp.StartPlayerMotion(mID)
```

</TabItem>
</Tabs>

---

### BeginSprinting

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)`

使本地玩家进入并保持向前疾跑/冲刺状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BeginSprinting() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)
comp.BeginSprinting()
```

</TabItem>
</Tabs>

---

### ChangePlayerDimension

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(playerId)`

传送玩家。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangePlayerDimension(dimensionId: int, pos: Tuple[int, int, int]) -> bool
```

- dimensionId: int，维度，0-overWorld; 1-nether; 2-theEnd。
- pos: Tuple[int, int, int]，传送的坐标。

**返回值**：bool，是否设置成功。

**备注**

- 该接口在成功切换维度时 pos 位置为玩家头的位置，即比设定位置低 1.62。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(playerId)
comp.ChangePlayerDimension(0, (0,4,0))
```

</TabItem>
</Tabs>

---

### ChangePlayerFlyState

<Server/> FlyComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateFly(playerId)`

给予/取消飞行能力, 并根据 enterFly 参数确定是否进入飞行状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangePlayerFlyState(isFly: bool, enterFly: bool) -> bool
```

- isFly: bool，给予/取消飞行能力。
- enterFly: bool，是否进入飞行状态，当 isFly 为 true 时，该参数才有效，其他情况下均为 false。

**返回值**：bool，True:是 False:否；是否设置成功。

**备注**

- 不建议在 [OnGroundClientEvent](/docs/docs/scripts/modapi/events/entity#ongroundclientevent) 事件回调中 [NotifyToServer](/docs/docs/scripts/modapi/general/event#notifytoserver)，然后服务端收到数据后，调用 ChangePlayerFlyState 接口。如果仍然需要这样调用，则建议在服务端收到数据后，用 [AddTimer](/docs/docs/scripts/modapi/general/tool#addtimer) 延迟一帧后再调用 ChangePlayerFlyState 接口。
- 拥有飞行能力时，不会受到摔落伤害。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFly(playerId)
comp.ChangePlayerFlyState(True) # 给予飞行能力，并进入飞行状态
# comp.ChangePlayerFlyState(True, False)# 给予飞行能力，不进入飞行状态
# comp.ChangePlayerFlyState(False)# 取消飞行能力
```

</TabItem>
</Tabs>

---

### EnableKeepInventory

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家死亡不掉落物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EnableKeepInventory(enable: bool) -> bool
```

- enable: bool，True：不掉落，False：掉落。

**返回值**：bool，是否设置成功。

**备注**

- 只有全局的“保留物品栏”规则关闭时，才会使用该设置控制玩家是否掉落。如果全局的“保留物品栏”规则是开启的，那么所有玩家死亡时都不会掉落。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
succ = comp.EnableKeepInventory(True)
```

</TabItem>
</Tabs>

---

### EndSprinting

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)`

使本地玩家结束向前疾跑/冲刺状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EndSprinting() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)
comp.EndSprinting()
```

</TabItem>
</Tabs>

---

### GetEntityRider

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

获取骑乘者正在骑乘的实体的 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityRider() -> str
```


**返回值**：str，骑乘者直接骑乘对象的实体 id，假如骑乘者没有骑乘则返回“-1”。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
riderId = comp.GetEntityRider()
```

</TabItem>
</Tabs>

<Client/> RideCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateRide(entityId)`

获取骑乘者正在骑乘的实体的 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityRider() -> str
```


**返回值**：str，骑乘者直接骑乘对象的实体 id，假如该骑乘者没有骑乘则返回“-1”。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateRide(entityId)
riderId = comp.GetEntityRider()
```

</TabItem>
</Tabs>

---

### GetInteracteCenterOffset

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家服务端交互中心的偏移，对应使用 [SetPickCenterOffset](/docs/docs/scripts/modapi/player/behavior#setpickcenteroffset) 修改的偏移值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetInteracteCenterOffset() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，偏移量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetInteracteCenterOffset()
```

</TabItem>
</Tabs>

---

### GetIsBlocking

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家激活盾牌状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetIsBlocking() -> bool
```


**返回值**：bool，玩家盾牌状态是否激活。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetIsBlocking()
```

</TabItem>
</Tabs>

---

### GetPickCenterOffset

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家设置的第三人称下客户端交互中心的偏移。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPickCenterOffset() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，偏移量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetPickCenterOffset()
```

</TabItem>
</Tabs>

---

### GetPickRange

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家客户端的交互距离。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPickRange() -> float
```


**返回值**：float，交互范围。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetPickRange()
```

</TabItem>
</Tabs>

---

### GetPlayerDestroyTotalTime

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家破坏方块需要的时间，受玩家状态（急迫、潮涌、挖掘疲劳）和手持物及手持物附魔（效率）影响。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerDestroyTotalTime(blockName: str) -> float
```

- blockName: str，方块标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0。

**返回值**：float，需要消耗的时间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetPlayerDestroyTotalTime("minecraft:diamond_block")
```

</TabItem>
</Tabs>

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家破坏方块需要的时间，受玩家状态（急迫、潮涌、挖掘疲劳）和手持物及手持物附魔（效率）影响。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerDestroyTotalTime(blockName: str) -> float
```

- blockName: str，方块标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0。

**返回值**：float，需要消耗的时间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetPlayerDestroyTotalTime("minecraft:diamond_block")
```

</TabItem>
</Tabs>

---

### GetPlayerExhaustionRatioByType

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家某行为饥饿度消耗倍率。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerExhaustionRatioByType(type: int) -> float
```

- type: int，行为枚举[PlayerExhauseRatioType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/PlayerExhauseRatioType.html)。

**返回值**：float，饥饿度消耗倍率值, -1 为获取失败（例如在创造模式下）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
jumpType = serverApi.GetMinecraftEnum().PlayerExhauseRatioType.JUMP
ratio = comp.GetPlayerExhaustionRatioByType(jumpType)
```

</TabItem>
</Tabs>

---

### GetPlayerInteracteRange

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家服务端的交互距离。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerInteracteRange() -> float
```


**返回值**：float，交互半径。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetPlayerInteracteRange()
```

</TabItem>
</Tabs>

---

### GetPlayerIsFishing

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家是否在钓鱼。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerIsFishing() -> bool
```


**返回值**：bool，在钓鱼时为 True，没在钓鱼时为 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
isFishing = comp.GetPlayerIsFishing()
```

</TabItem>
</Tabs>

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家是否在钓鱼。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerIsFishing() -> bool
```


**返回值**：bool，在钓鱼时为 True，没在钓鱼时为 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
isFishing = comp.GetPlayerIsFishing()
```

</TabItem>
</Tabs>

---

### GetPlayerMotions

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(playerId)`

获取玩家身上的所有运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerMotions() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，运动器集合，key 值代表运动器 mID，value 值代表运动器类型 0：轨迹运动器、1：速度运动器、2：环绕运动器。

**备注**

- 运动器非人为停止后会被移除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(playerId)
motions = motionComp.GetPlayerMotions()
# motions = {
#   0:1,
#   1:2
# }
```

</TabItem>
</Tabs>

---

### GetPlayerRespawnPos

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家复活点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerRespawnPos() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，复活点信息，包括维度和坐标。

**备注**

- 使用 spawnpoint 指令设置玩家的出生点后，该接口可以获取到设置后的出生点。
- 未使用 setworldspawn 指令设置过出生点位置时，返回坐标的 y 轴是 32767。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
print comp.GetPlayerRespawnPos()
#结果示例 {'dimensionId': 0, 'pos': (44, 32767, 4)}
```

</TabItem>
</Tabs>

---

### GetRelevantPlayer

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取附近玩家 id 列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRelevantPlayer(exceptList: List[str]) -> List[str]
```

- exceptList: List[str]，排除的玩家 id 列表,默认值为 None,不排除其他玩家及自身。

**返回值**：List[str]，附近玩家 id 列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.GetRelevantPlayer(exceptId)
```

</TabItem>
</Tabs>

---

### IsEntityRiding

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

检查玩家是否骑乘。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsEntityRiding() -> bool
```


**返回值**：bool，是否骑乘。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
isRiding = comp.IsEntityRiding()
```

</TabItem>
</Tabs>

---

### IsInScaffolding

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家是否在脚手架中。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsInScaffolding() -> bool
```


**返回值**：bool，是否在脚手架中。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.IsInScaffolding()
```

</TabItem>
</Tabs>

---

### IsOnLadder

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家是否在梯子/藤蔓上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsOnLadder() -> bool
```


**返回值**：bool，是否在梯子/藤蔓上。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.IsOnLadder()
```

</TabItem>
</Tabs>

---

### IsPlayerCanFly

<Server/> FlyComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateFly(playerId)`

获取玩家能否飞行。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsPlayerCanFly() -> bool
```


**返回值**：bool，True:是 False:否。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFly(playerId)
comp.IsPlayerCanFly()
```

</TabItem>
</Tabs>

---

### IsPlayerFlying

<Server/> FlyComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateFly(playerId)`

获取玩家是否在飞行。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsPlayerFlying() -> bool
```


**返回值**：bool，True:是 False:否。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFly(playerId)
comp.IsPlayerFlying()
```

</TabItem>
</Tabs>

---

### OpenNeteaseContainer

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

打开自定义容器界面，不依赖于方块。该界面的物品数据需由开发者自行维护。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenNeteaseContainer(screenName: str, customDescription: str, isCloseReturnItem: bool) -> bool
```

- screenName: str，打开的容器 ui 的命名空间，格式[namespace.screenName]。
- customDescription: str，打开的容器 ui 的标题（复用原版 ui 时生效）。
- isCloseReturnItem: bool，关闭容器界面时，是否返还物品到背包；默认为 False（不返还），由开发者维护物品数据的存储。

**返回值**：bool，返回 True 则执行成功，不代表界面已打开。

**备注**

- 参数含义以及自定义容器 ui json 的编写，参考自定义容器教程。
- collection_name 需指定为 netease_ui_container。
- 如果 isCloseReturnItem 为 False，将在关闭界面后，容器内的物品不会返还到背包。
- 可使用 [GetPlayerUIItem](/docs/docs/scripts/modapi/block/container#getplayeruiitem)、[SetPlayerUIItem](/docs/docs/scripts/modapi/block/container#setplayeruiitem) 接口来获取、设置容器内的物品。
- 该接口打开的容器，可触发 [PlayerTryAddCustomContainerItemServerEvent](/docs/docs/scripts/modapi/events/item#playertryaddcustomcontaineritemserverevent)、[PlayerTryPutCustomContainerItemServerEvent](/docs/docs/scripts/modapi/events/item#playertryputcustomcontaineritemserverevent)、[PlayerTryRemoveCustomContainerItemServerEvent](/docs/docs/scripts/modapi/events/item#playertryremovecustomcontaineritemserverevent) 以及对应的客户端事件。
- 可通过监听 [PushScreenEvent](/docs/docs/scripts/modapi/events/ui#pushscreenevent)，来做容器内格子物品的初始化逻辑；建议每一个 ui namespace 单独对应一种功能，以免无法正确区分容器界面。
- 如出现“failed to create root control”等断言，请检查 ui json 的编写是否正确。
- 如出现物品无法放入容器界面、或者无法移动物品，请检查 ui json 的是否使用了 netease_ui_container。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.OpenNeteaseContainer("netease_container.netease_custom_container_screen", "容器标题")
```

</TabItem>
</Tabs>

---

### OpenWorkBench

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

在玩家当前位置打开工作台 UI，不依赖于工作台方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenWorkBench() -> bool
```


**返回值**：bool，打开结果。

**备注**

- 工作台有交互距离要求，太远了(与打开位置超过 5 格以上)打开工作台 UI 后会自动关闭。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)  # 此处playerId为使用物品的玩家
comp.OpenWorkBench()
```

</TabItem>
</Tabs>

---

### PickUpItemEntity

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

某个 Player 拾取物品 ItemEntity。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PickUpItemEntity(playerEntityId: str, itemEntityId: str) -> bool
```

- playerEntityId: str，拾取者的 playerEntityId。
- itemEntityId: str，要拾取的物品 itemEntityId。

**返回值**：bool，是否拾取成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.PickUpItemEntity(playerEntityId, itemEntityId)
```

</TabItem>
</Tabs>

---

### PlayerAttackEntity

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

玩家使用手持武器攻击某个生物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayerAttackEntity(entityId: str) -> bool
```

- entityId: str，生物 entityId。

**返回值**：bool，执行结果。

**备注**

- 1.会触发 [PlayerAttackEntityEvent](/docs/docs/scripts/modapi/events/player#playerattackentityevent) 事件，并且可以被这个事件 cancel。
- 2.此接口无视距离，但无法跨维度使用，同时需要目标区域已加载。
- 3.常加载区块的生物也不会执行 tick，生物受伤 cd 不会减少，无法对生物多次造成伤害，通过 [SetHurtCD](/docs/docs/scripts/modapi/world/game_rules#sethurtcd) 接口设置伤害间隔为 0，可以解决这个问题。
- 4.此接口不会播放原版攻击动作，可以使用 [Swing](/docs/docs/scripts/modapi/player/attribute#swing) 接口来播放原版攻击动作。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)  # 此处playerId为发起攻击的玩家
suc = comp.PlayerAttackEntity("-123456")
```

</TabItem>
</Tabs>

---

### PlayerDestroyBlock

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

使用手上工具破坏方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayerDestroyBlock(pos: Tuple[int, int, int], particle: int, sendInv: bool) -> bool
```

- pos: Tuple[int, int, int]，方块位置。
- particle: int，是否开启破坏粒子效果，默认为开。
- sendInv: bool，是否同步服务端背包信息，默认为不同步。因为破坏方块可能会造成手持物品耐久度降低等信息改变，不同步信息可能会造成后续一些逻辑异常，若大批量破坏方块，每次同步会有性能问题，建议前面的调用可令 sendInv 为 False，在最后一次调用此函数时传入 sendInv 为 True。

**返回值**：bool，设置结果。

**备注**

- 手上工具的附魔效果会生效，同时扣除耐久度。
- 会触发 [ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 事件，并且可以被这个事件 cancel。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)  # 此处playerId为block的破坏者
comp.PlayerDestroyBlock((0, 5, 0), 1, False)
comp.PlayerDestroyBlock((0, 6, 0), 1, True)

# 关闭破坏粒子效果
comp.PlayerDestroyBlock((0, 6, 0),0)
```

</TabItem>
</Tabs>

---

### PlayerUseItemToEntity

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

玩家使用手上物品对某个生物使用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayerUseItemToEntity(entityId: str) -> bool
```

- entityId: str，生物 entityId。

**返回值**：bool，设置结果。

**备注**

- 1.会触发 [PlayerInteractServerEvent](/docs/docs/scripts/modapi/events/player#playerinteractserverevent) 事件，并且可以被这个事件 cancel。
- 2.使用 PlayerUseItemToEntity 接口模拟玩家用命名牌重命名生物、用食物喂养生物时，可以触发 [PlayerNamedEntityServerEvent](/docs/docs/scripts/modapi/events/player#playernamedentityserverevent)、[PlayerFeedEntityServerEvent](/docs/docs/scripts/modapi/events/player#playerfeedentityserverevent) 事件，并且这两个事件都可以 cancel。
- 3.此接口无视距离，但无法跨维度使用，同时需要目标区域已加载。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)  # 此处playerId为使用物品的玩家
suc = comp.PlayerUseItemToEntity("-123456")
```

</TabItem>
</Tabs>

---

### PlayerUseItemToPos

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

模拟玩家对某个坐标使用物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayerUseItemToPos(pos: Tuple[int, int, int], posType: int, slotPos: int, facing: int) -> bool
```

- pos: Tuple[int, int, int]，坐标。
- posType: int，物品所在的地方[ItemPosType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemPosType.html)。
- slotPos: int，槽位，获取 INVENTORY 及 ARMOR 时需要设置，其他情况写 0 即可。
- facing: int，朝向，详见[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。

**返回值**：bool，设置结果。

**备注**

- 当使用抛射物时，只有在非创造模式下才会返回 True;如果要对"盔甲架"等实体使用物品，请使用 [PlayerUseItemToEntity](/docs/docs/scripts/modapi/player/behavior#playeruseitemtoentity) 接口;只能对玩家周边 200 格以内的坐标使用。
- 模拟玩家使用物品时，最终效果和右键使用物品类似，会先触发方块交互，再触发物品使用。因此，该接口同时也可用作方块交互目的。
- 使用 api 放置容器类方块（如箱子）后，立刻调用 PlayerUseItemToPos 尝试打开箱子，会因为当前客户端还没有这个方块而无法打开，同时导致服务端与客户端状态不同步，后续也无法打开其他容器与玩家背包。为防止此问题，请确保客户端获取到对应坐标是箱子，再调用服务端 PlayerUseItemToPos。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)  # 此处playerId为使用物品的玩家
comp.PlayerUseItemToPos((0, 5, 0), serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0, 1)
```

</TabItem>
</Tabs>

---

### RemovePlayerMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(playerId)`

移除玩家身上的运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemovePlayerMotion(motionId: int) -> bool
```

- motionId: int，要移除的某个运动器的 ID。

**返回值**：bool，是否成功移除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(playerId)
motionComp.RemovePlayerMotion(mID)
```

</TabItem>
</Tabs>

---

### SetBanPlayerFishing

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置是否屏蔽玩家钓鱼功能，屏蔽后玩家可以正常抛甩鱼竿，但无法钓起任何物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBanPlayerFishing(isBan: bool) -> bool
```

- isBan: bool，是否屏蔽玩家钓鱼功能，True 为屏蔽，False 为取消屏蔽。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetBanPlayerFishing(True)
```

</TabItem>
</Tabs>

---

### SetInteracteCenterOffset

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家服务端交互中心的偏移。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetInteracteCenterOffset(offset: Tuple[float, float, float]) -> bool
```

- offset: Tuple[float, float, float]，偏移量。

**返回值**：bool，是否设置成功。

**备注**

- 该接口只修改服务端的交互中心，所以需要使用 [SetCameraAnchor](/docs/docs/scripts/modapi/player/camera#setcameraanchor) 修改客户端第一人称的交互中心，使用 [SetPickCenterOffset](/docs/docs/scripts/modapi/player/behavior#setpickcenteroffset) 修改客户端第三人称的交互中心，否则客户端将无法选中方块，即无法发送正确的信息给服务端。
- 注：当前客户端能修改交互中心的有 [SetCameraAnchor](/docs/docs/scripts/modapi/player/camera#setcameraanchor) 修改第一人称，[SetPickCenterOffset](/docs/docs/scripts/modapi/player/behavior#setpickcenteroffset) 修改第三人称。服务端能使用 SetInteracteCenterOffset 修改玩家交互中心（服务端无第几人称概念）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetInteracteCenterOffset(offset)
```

</TabItem>
</Tabs>

---

### SetPickCenterOffset

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置第三人称下，玩家客户端交互中心的偏移。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPickCenterOffset(offset: Tuple[float, float, float]) -> bool
```

- offset: Tuple[float, float, float]，偏移量。

**返回值**：bool，设置是否成功。

**备注**

- 该接口只修改第三人称，第一人称下需要使用 [SetCameraAnchor](/docs/docs/scripts/modapi/player/camera#setcameraanchor) 接口设置交互中心。
- 该接口只修改客户端的交互中心，选中后客户端会将选中的消息发给服务端，所以需要使用 [SetInteracteCenterOffset](/docs/docs/scripts/modapi/player/behavior#setinteractecenteroffset) 修改服务端的的玩家交互中心，否则超出服务端允许的玩家可交互范围将被撤销。
- 注：当前客户端能修改交互中心的有 [SetCameraAnchor](/docs/docs/scripts/modapi/player/camera#setcameraanchor) 修改第一人称，SetPickCenterOffset 修改第三人称。服务端能使用 [SetInteracteCenterOffset](/docs/docs/scripts/modapi/player/behavior#setinteractecenteroffset) 修改玩家交互中心（服务端无第几人称概念）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPickCenterOffset(offset)
```

</TabItem>
</Tabs>

---

### SetPickRange

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家客户端的交互距离。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPickRange(pickRange: float) -> bool
```

- pickRange: float，交互半径。

**返回值**：bool，设置是否成功。

**备注**

- 该接口只修改客户端的交互距离，选中后客户端会将选中的消息发给服务端，所以需要使用 [SetPlayerInteracteRange](/docs/docs/scripts/modapi/player/behavior#setplayerinteracterange) 修改服务端玩家的交互距离，否则超出服务端允许的玩家可交互范围将被撤销。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPickRange(pickRange)
```

</TabItem>
</Tabs>

---

### SetPickUpArea

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家的拾取物品范围，设置后该玩家的拾取物品范围会在原版拾取范围的基础上进行改变。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPickUpArea(area: Tuple[float, float, float]) -> bool
```

- area: Tuple[float, float, float]，拾取物品范围，传入(0, 0, 0)时视作取消设置。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
# 玩家拾取物品范围在X轴正负方向各增加5格，在Z轴正负方向各增加3格，在Y轴保持不变
succ = comp.SetPickUpArea((5, 0, 3))
```

</TabItem>
</Tabs>

---

### SetPlayerAttackSpeedAmplifier

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家攻击速度倍数，1.0 表示正常水平，1.2 表示速度减益 20%，0.8 表示速度增益 20%。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerAttackSpeedAmplifier(amplifier: float) -> bool
```

- amplifier: float，攻击速度倍数，范围[0.5,2.0]。

**返回值**：bool，是否设置成功。

**备注**

- 该接口影响接口 [SetHurtCD](/docs/docs/scripts/modapi/world/game_rules#sethurtcd) 设置的全局受击间隔 CD。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPlayerAttackSpeedAmplifier(1.1)
```

</TabItem>
</Tabs>

---

### SetPlayerExhaustionRatioByType

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家某行为饥饿度消耗倍率。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerExhaustionRatioByType(type: int, ratio: float) -> bool
```

- type: int，行为枚举[PlayerExhauseRatioType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/PlayerExhauseRatioType.html)。
- ratio: float，倍率。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
jumpType = serverApi.GetMinecraftEnum().PlayerExhauseRatioType.JUMP
ratio = comp.SetPlayerExhaustionRatioByType(jumpType, 20)
```

</TabItem>
</Tabs>

---

### SetPlayerInteracteRange

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家服务端的交互距离。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerInteracteRange(interacteRange: float) -> bool
```

- interacteRange: float，交互半径。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPlayerInteracteRange(interacteRange)
```

</TabItem>
</Tabs>

---

### SetPlayerJumpable

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家是否可跳跃。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerJumpable(isJumpable: bool) -> bool
```

- isJumpable: bool，是否可跳跃,True 允许跳跃，False 禁止跳跃。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPlayerJumpable(False)
```

</TabItem>
</Tabs>

---

### SetPlayerMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateRot(entityId)`

设置玩家的瞬时移动方向向量(可解决 [SetMotion](/docs/docs/scripts/modapi/entity/behavior#setmotion) 闪现问题)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerMotion(motion: Tuple[float, float, float]) -> bool
```

- motion: Tuple[float, float, float]，世界坐标系下的向量，该方向为世界坐标系下的向量，以 x,z,y 三个轴的正方向为正值，可以通过当前生物的 rot 组件判断目前玩家面向的方向，可在开发模式下打开 F3 观察数值变化。

**返回值**：bool，设置是否成功。

**备注**

- 在 damageEvent 事件里面使用该接口时，需把 damageEvent 事件回调的 knock 参数设置为 False。
- [SetMotion](/docs/docs/scripts/modapi/entity/behavior#setmotion) 接口需要客户端服务端双端调用，但受限于网速、延迟等，会出现闪现情况，此接口可完美解决上述问题。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# 使生物向准星的方向突进一段距离
rotComp = serverApi.GetEngineCompFactory().CreateRot(entityId)
rot = rotComp.GetRot()
x, y, z = serverApi.GetDirFromRot(rot)
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(entityId)
motionComp.SetPlayerMotion((x * 5, y * 5, z * 5))
# rot 和 世界坐标系关系
#               ^ x -90°
#               |
# 180°/-180  ----------> z 0°
#               | 90°
```

</TabItem>
</Tabs>

---

### SetPlayerMovable

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家是否可移动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerMovable(isMovable: bool) -> bool
```

- isMovable: bool，是否可移动,True 允许移动，False 禁止移动。

**返回值**：bool，是否设置成功。

**备注**

- 注：该接口“不可移动”指不能移动、跳跃、飞行、潜行，并且飞行状态下也不能上升下降。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
comp.SetPlayerMovable(False)
```

</TabItem>
</Tabs>

---

### SetPlayerRespawnPos

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

设置玩家复活的位置与维度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerRespawnPos(pos: Tuple[int, int, int], dimensionId: int) -> bool
```

- pos: Tuple[int, int, int]，复活点的位置坐标。
- dimensionId: int，复活点的维度，默认值为 0（主世界），注意 1：维度 21 是不可用的；注意 2：不能在玩家死亡（[PlayerDieEvent](/docs/docs/scripts/modapi/events/player#playerdieevent)）之后设置复活点。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
suc = comp.SetPlayerRespawnPos((0, 4, 0), 0)
```

</TabItem>
</Tabs>

---

### StartPlayerMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(playerId)`

启动玩家身上的某个运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartPlayerMotion(motionId: int) -> bool
```

- motionId: int，要启动的某个运动器的 ID。

**返回值**：bool，是否成功启动。

**备注**

- 运动器控制的玩家会无视原生的碰撞逻辑而穿透方块，若需停止，请自行监听碰撞事件 [OnPlayerHitBlockServerEvent](/docs/docs/scripts/modapi/events/player#onplayerhitblockserverevent) 然后使用 [StopPlayerMotion](/docs/docs/scripts/modapi/player/behavior#stopplayermotion) 停止。
- 由于玩家的运动器需要在客户端与服务端之间同步，所以请以 [EntityMotionStartServerEvent](/docs/docs/scripts/modapi/events/entity#entitymotionstartserverevent) 事件的触发作为真正的开始时机。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(playerId)
motionComp.StartPlayerMotion(mID)
```

</TabItem>
</Tabs>

---

### StopPlayerMotion

<Server/> ActorMotionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateActorMotion(playerId)`

停止玩家身上的某个运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopPlayerMotion(motionId: int) -> bool
```

- motionId: int，要停止的某个运动器的 ID。

**返回值**：bool，是否成功停止。

**备注**

- 调用该接口不会触发事件 [EntityMotionStopServerEvent](/docs/docs/scripts/modapi/events/entity#entitymotionstopserverevent)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
motionComp = serverApi.GetEngineCompFactory().CreateActorMotion(playerId)
motionComp.StopPlayerMotion(mID)
```

</TabItem>
</Tabs>

---

### isGliding

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

是否鞘翅飞行。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isGliding() -> bool
```


**返回值**：bool，是否鞘翅飞行。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.isGliding()
```

</TabItem>
</Tabs>

---

### isInWater

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

是否在水中。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isInWater() -> bool
```


**返回值**：bool，是否在水中。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.isInWater()
```

</TabItem>
</Tabs>

---

### isMoving

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

是否在行走。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isMoving() -> bool
```


**返回值**：bool，是否在行走。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.isMoving()
```

</TabItem>
</Tabs>

---

### isRiding

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

是否骑乘。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isRiding() -> bool
```


**返回值**：bool，是否骑乘。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.isRiding()
```

</TabItem>
</Tabs>

---

### isSneaking

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家是否处于潜行状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isSneaking() -> bool
```


**返回值**：bool，当前玩家是否处于潜行状态。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
is_sneaking = comp.isSneaking()
```

</TabItem>
</Tabs>

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

是否潜行。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isSneaking() -> bool
```


**返回值**：bool，是否潜行。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.isSneaking()
```

</TabItem>
</Tabs>

---

### isSprinting

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

是否在疾跑。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isSprinting() -> bool
```


**返回值**：bool，是否在疾跑。

**备注**

- 注意，只有当玩家在疾跑时，该接口才返回 true，静止状态下，返回 false。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.isSprinting()
```

</TabItem>
</Tabs>

---

### isSwimming

<Server/> PlayerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreatePlayer(playerId)`

获取玩家是否处于游泳状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isSwimming() -> bool
```


**返回值**：bool，当前玩家是否处于游泳状态。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
is_swiming = comp.isSwimming()
```

</TabItem>
</Tabs>

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

是否游泳。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
isSwimming() -> bool
```


**返回值**：bool，是否游泳。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.isSwimming()
```

</TabItem>
</Tabs>

---

### setMoving

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

设置是否行走，只能设置本地玩家（只适用于移动端）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
setMoving() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.setMoving()
```

</TabItem>
</Tabs>

---

### setSneaking

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

设置是否潜行，只能设置本地玩家（只适用于移动端）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
setSneaking() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.setSneaking()
```

</TabItem>
</Tabs>

---

### setSprinting

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

设置行走模式为疾跑/冲刺，只能设置本地玩家（只适用于移动端）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
setSprinting() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.setSprinting()
```

</TabItem>
</Tabs>

---

### setUsingShield

<Client/> PlayerCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayer(entityId)`

激活盾牌状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
setUsingShield(flag: bool) -> int
```

- flag: bool，True 使用盾牌，False 取消使用盾牌。

**返回值**：int，1 设置成功，0 设置失败，-1 玩家未持盾。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = clientApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.setUsingShield(True)
```

</TabItem>
</Tabs>

---
