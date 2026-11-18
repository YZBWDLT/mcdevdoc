---
sidebar_position: 2
---

# 刚体

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录刚体相关的接口，共 31 个。

:::warning[注意]

物理系列接口属于**实验性内容**，后续版本可能出现接口变更、开发环境变更等情况。网易建议开发者合理安排开发内容与正式版本，避免物理系统更新后出现模组失效。有关物理系统的完整说明与使用教程，请查阅网易的[物理的使用指南](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/20-wuliwanfakaifa/1-wulideshiyongzhinan.html)。

:::

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wuli/gangti.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### AddForce

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

对自定义刚体的质心施加全局坐标力；数值单位由 mode 决定，对运动学刚体无效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddForce(dir: Tuple[float, float, float], mode: int) -> bool
```

- dir: Tuple[float, float, float]，全局坐标输入向量：eFORCE 为力(N)，eIMPULSE 为冲量(N·s)，eVELOCITY_CHANGE 为速度变化(m/s)，eACCELERATION 为加速度(m/s²)。
- mode: int，[PxForceMode 枚举](/docs/docs/scripts/modapi/enums#pxforcemode)：eFORCE=0、eIMPULSE=1、eVELOCITY_CHANGE=2、eACCELERATION=3。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from common.minecraftEnum import PxForceMode
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
# 添加一个向上的速度
comp.AddForce((0,1,0), PxForceMode.eVELOCITY_CHANGE)
```

</TabItem>
</Tabs>

---

### AddForceAtPos

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

对自定义刚体的指定位置添加力，对运动学刚体无效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddForceAtPos(
    force: Tuple[float, float, float],
    mode: int,
    pos: Tuple[float, float, float],
) -> bool
```

- force: Tuple[float, float, float]，在全局坐标系中定义的力/冲量。
- mode: int，[PxForceMode 枚举](/docs/docs/scripts/modapi/enums#pxforcemode)，施加力/冲量时使用的模式。
- pos: Tuple[float, float, float]，在全局坐标系中定义的力/冲量作用点位置。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from common.minecraftEnum import PxForceMode
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
# 添加一个向上的速度
comp.AddForceAtPos((0,1,0), PxForceMode.eVELOCITY_CHANGE, (0,81,0))
```

</TabItem>
</Tabs>

---

### AddForceAtPosLocal

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

对自定义刚体的指定位置添加力，对运动学刚体无效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddForceAtPosLocal(
    force: Tuple[float, float, float],
    mode: int,
    pos: Tuple[float, float, float],
) -> bool
```

- force: Tuple[float, float, float]，在全局坐标系中定义的力/冲量。
- mode: int，[PxForceMode 枚举](/docs/docs/scripts/modapi/enums#pxforcemode)，施加力/冲量时使用的模式。
- pos: Tuple[float, float, float]，在局部坐标系中定义的力/冲量作用点偏移。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from common.minecraftEnum import PxForceMode
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
# 对实体左侧位置添加一个向前的力
comp.AddForceAtPosLocal((0,0,1000), PxForceMode.eFORCE, (1,0,0))
```

</TabItem>
</Tabs>

---

### AddTorque

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

对自定义刚体添加扭矩，对运动学刚体无效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddTorque(torque: Tuple[float, float, float], mode: int) -> bool
```

- torque: Tuple[float, float, float]，在全局坐标系中定义的扭矩。
- mode: int，[PxForceMode 枚举](/docs/docs/scripts/modapi/enums#pxforcemode)，施加力/冲量时使用的模式。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from common.minecraftEnum import PxForceMode
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.AddTorque((0,5000,0), PxForceMode.eFORCE)
```

</TabItem>
</Tabs>

---

### AddTorqueLocal

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

在自定义刚体本地坐标系中添加扭矩，对运动学刚体无效。X 轴为 Roll（滚转），Y 轴为 Yaw（偏航），Z 轴为 Pitch（俯仰）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddTorqueLocal(torque: Tuple[float, float, float], mode: int) -> bool
```

- torque: Tuple[float, float, float]，在刚体本地坐标系中定义的扭矩。
- mode: int，[PxForceMode 枚举](/docs/docs/scripts/modapi/enums#pxforcemode)，施加力/冲量时使用的模式。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from common.minecraftEnum import PxForceMode
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.AddTorqueLocal((100,0,0), PxForceMode.eIMPULSE)
```

</TabItem>
</Tabs>

---

### CreatePxActor

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

给实体创建自定义刚体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreatePxActor() -> bool
```

**返回值**：bool，是否成功。

**备注**

- 只能在 [AddEntityServerEvent](/docs/docs/scripts/modapi/events/world#addentityserverevent) 事件中使用，不存档。
- 只能对自定义生物使用，不支持玩家与原版实体。自定义生物需移除 minecraft:physics 等原生物理组件，并且使用 [SetBlockControlAi](/docs/docs/scripts/modapi/interfaces/entity/behavior#setblockcontrolai) 关闭 ai。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.CreatePxActor()
```

</TabItem>
</Tabs>

---

### GetActorFlags

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取 actor 当前 ActorFlags(诊断接口,bit1=eDISABLE_GRAVITY,bit2=eSEND_SLEEP_NOTIFIES,bit3=eDISABLE_SIMULATION)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetActorFlags() -> int
```

**返回值**：int，Actor 标记；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetActorFlags()
```

</TabItem>
</Tabs>

---

### GetAngularVelocity

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取自定义刚体的角速度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> Tuple[float, float, float]
```

**返回值**：Tuple[float, float, float]，角速度(rad/s)；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetAngularVelocity()
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取自定义刚体在世界坐标系下的角速度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> Tuple[float, float, float]
```

**返回值**：Tuple[float, float, float]，角速度(rad/s)，非自定义刚体返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetAngularVelocity()
```

</TabItem>
</Tabs>

---

### GetLinearVelocity

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取自定义刚体的线速度(world space)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> Tuple[float, float, float]
```

**返回值**：Tuple[float, float, float]，线速度；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetLinearVelocity()
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取自定义刚体在世界坐标系下的线速度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> Tuple[float, float, float]
```

**返回值**：Tuple[float, float, float]，线速度(blocks/s)，非自定义刚体返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetLinearVelocity()
```

</TabItem>
</Tabs>

---

### GetMass

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取自定义刚体的质量(PhysX 内部 mass,由 density+体积合成)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMass() -> float
```

**返回值**：float，质量；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetMass()
```

</TabItem>
</Tabs>

---

### GetMassSpaceInertiaTensor

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取刚体的惯性张量对角线分量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMassSpaceInertiaTensor() -> Tuple[float, float, float]
```

**返回值**：Tuple[float, float, float]，惯性张量(Ix,Iy,Iz)；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetMassSpaceInertiaTensor()
```

</TabItem>
</Tabs>

---

### GetQuaternion

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取自定义刚体的四元数旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> Tuple[float, float, float, float]
```

**返回值**：Tuple[float, float, float, float]，四元数。

**备注**

- 非自定义刚体返回(0,0,0,1)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetQuaternion()
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取自定义刚体的四元数旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> Tuple[float, float, float, float]
```

**返回值**：Tuple[float, float, float, float]，四元数。

**备注**

- 非自定义刚体返回(0,0,0,1)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetQuaternion()
```

</TabItem>
</Tabs>

---

### GetRigidBodyFlags

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取刚体当前 RigidBodyFlags(诊断接口,bit0=eKINEMATIC)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRigidBodyFlags() -> int
```

**返回值**：int，刚体标记；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetRigidBodyFlags()
```

</TabItem>
</Tabs>

---

### GetRigidDynamicLockFlags

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取动态刚体当前 RigidDynamicLockFlags(诊断接口,bit0-2=Linear XYZ lock,bit3-5=Angular XYZ lock)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRigidDynamicLockFlags() -> int
```

**返回值**：int，动态刚体锁定标记；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetRigidDynamicLockFlags()
```

</TabItem>
</Tabs>

---

### IsDefaultPxActor

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

是否为引擎默认创建的 PxActor(诊断接口,True 表示 mod [CreatePxActor](/docs/docs/scripts/modapi/interfaces/physics/rigid_body#createpxactor) 实际是 no-op)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsDefaultPxActor() -> bool
```

**返回值**：bool，是否为默认 PxActor；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.IsDefaultPxActor()
```

</TabItem>
</Tabs>

---

### IsSleeping

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

查询自定义刚体是否处于休眠状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsSleeping() -> bool
```

**返回值**：bool，是否休眠；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.IsSleeping()
```

</TabItem>
</Tabs>

---

### PutToSleep

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

强制刚体进入休眠。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PutToSleep() -> bool
```

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.PutToSleep()
```

</TabItem>
</Tabs>

---

### SetActorFlag

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置物理实体的行为开关。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetActorFlag(flag: int) -> bool
```

- flag: int，[PxActorFlag 枚举](/docs/docs/scripts/modapi/enums#pxactorflag)。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from common.minecraftEnum import PxActorFlag
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
# 不受重力
comp.SetActorFlag(PxActorFlag.eDISABLE_GRAVITY, True)
```

</TabItem>
</Tabs>

---

### SetAngularDamping

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置动态刚体的角阻尼，值越大角速度衰减越快。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAngularDamping(damping: float) -> bool
```

- damping: float，角阻尼，必须大于等于 0。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetAngularDamping(1.0) # 角速度衰减系数
```

</TabItem>
</Tabs>

---

### SetAngularVelocity

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置自定义刚体的角速度，对运动学刚体无效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAngularVelocity(velocity: Tuple[float, float, float]) -> bool
```

- velocity: Tuple[float, float, float]，角速度(rad/s)。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetAngularVelocity((0.0, 3.14, 0.0)) # 绕世界 Y 轴旋转
```

</TabItem>
</Tabs>

---

### SetCMassLocalPose

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置质心相对于 actor 原点的偏移，用于手动调整重心。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCMassLocalPose(pos: Tuple[float, float, float]) -> bool
```

- pos: Tuple[float, float, float]，质心在局部坐标中的位置。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetCMassLocalPose((0.0, -0.5, 0.0)) # 将重心下移半格
```

</TabItem>
</Tabs>

---

### SetGlobalPose

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置自定义刚体的变换（直接瞬移）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(
    pos: Optional[Tuple[float, float, float]],
    rot: Optional[Tuple[float, float, float, float]],
) -> bool
```

- pos: Optional[Tuple[float, float, float]]，目标位置，None 表示位置不变。
- rot: Optional[Tuple[float, float, float, float]]，目标旋转，用四元数表示，None 表示旋转不变。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
# 瞬移到0,80,0，旋转不变
comp.SetGlobalPose((0,80,0), None)
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置客户端本地自定义刚体的变换（直接瞬移）。

```python
客户端接口(
    pos: Optional[Tuple[float, float, float]],
    rot: Optional[Tuple[float, float, float, float]],
) -> bool
```

- pos: Optional[Tuple[float, float, float]]，目标位置，None 表示位置不变。
- rot: Optional[Tuple[float, float, float, float]]，目标旋转，用四元数表示，None 表示旋转不变。

**返回值**：bool，是否成功。

**备注**

- 仅更新客户端本地 PhysX 副本，可用于视觉预测；不会同步到服务端权威刚体。

---

### SetKinematicTarget

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置运动学刚体的目标变换，仅对开启了 PxRigidBodyFlag.eKINEMATIC 的自定义刚体生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetKinematicTarget(
    pos: Optional[Tuple[float, float, float]],
    rot: Optional[Tuple[float, float, float, float]],
) -> bool
```

- pos: Optional[Tuple[float, float, float]]，目标位置，None 表示位置不变。
- rot: Optional[Tuple[float, float, float, float]]，目标旋转，用四元数表示，None 表示旋转不变。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
# 位置移动到0,80,0，旋转不变
comp.SetKinematicTarget((0,80,0), None)
```

</TabItem>
</Tabs>

---

### SetLinearDamping

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置动态刚体的线性阻尼，值越大线速度衰减越快。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLinearDamping(damping: float) -> bool
```

- damping: float，线性阻尼，必须大于等于 0。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetLinearDamping(0.5) # 线速度衰减系数
```

</TabItem>
</Tabs>

---

### SetLinearVelocity

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置自定义刚体的线速度(world space),仅对 PxRigidDynamic 生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLinearVelocity(velocity: Tuple[float, float, float]) -> bool
```

- velocity: Tuple[float, float, float]，目标线速度(vx,vy,vz)。

**返回值**：bool，成功返回 True,失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetLinearVelocity((0.0, 0.0, 8.0)) # 立即设为向 +Z 匀速运动
```

</TabItem>
</Tabs>

---

### SetMass

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置动态刚体质量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMass(mass: float) -> bool
```

- mass: float，目标质量，必须大于 0。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetMass(20.0)
```

</TabItem>
</Tabs>

---

### SetMaxAngularVelocity

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置自定义刚体的最大角速度，防止碰撞后疯转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMaxAngularVelocity(maxVel: float = 100) -> bool
```

- maxVel: float，最大角速度(rad/s)，必须大于 0，默认 100。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetMaxAngularVelocity(20.0) # 限制为 20 rad/s
```

</TabItem>
</Tabs>

---

### SetMaxLinearVelocity

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置自定义刚体的最大线速度，防止物体飞出天际。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMaxLinearVelocity(maxVel: float) -> bool
```

- maxVel: float，最大线速度(m/s)，默认无限。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetMaxLinearVelocity(30.0)
```

</TabItem>
</Tabs>

---

### SetRigidBodyFlag

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置自定义刚体的行为开关。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRigidBodyFlag(flag: int, val: bool) -> bool
```

- flag: int，[PxRigidBodyFlag 枚举](/docs/docs/scripts/modapi/enums#pxrigidbodyflag)。
- val: bool，开关。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from common.minecraftEnum import PxRigidBodyFlag
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetRigidBodyFlag(PxRigidBodyFlag.eKINEMATIC, True) # 设置为运动学刚体
```

</TabItem>
</Tabs>

---

### SetRigidDynamicLockFlags

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置自定义刚体的约束。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRigidDynamicLockFlags(flag: int) -> bool
```

- flag: int，[PxRigidDynamicLockFlag 枚举](/docs/docs/scripts/modapi/enums#pxrigiddynamiclockflag)。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from common.minecraftEnum import PxRigidDynamicLockFlag
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
# 锁定xyz轴旋转
comp.SetRigidDynamicLockFlags(PxRigidDynamicLockFlag.eLOCK_ANGULAR_X | PxRigidDynamicLockFlag.eLOCK_ANGULAR_Y | PxRigidDynamicLockFlag.eLOCK_ANGULAR_Z)
```

</TabItem>
</Tabs>

---

### WakeUp

<Version type="china" add="3.10"/>

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

唤醒休眠中的刚体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
WakeUp() -> bool
```

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.WakeUp()
```

</TabItem>
</Tabs>

---
