---
sidebar_position: 3
---

# 关节

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录关节相关的接口，共 21 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wuli/guanjie.html"/>

---

### CreateDistanceJoint

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

创建距离关节，限制两个锚点之间的距离范围，可配弹簧。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateDistanceJoint(
    entityId0: str,
    entityId1: str,
    anchor0: Tuple[float, float, float],
    anchor1: Tuple[float, float, float],
) -> int
```

- entityId0: str，第一个实体 id，传空字符串""表示锚定到世界。
- entityId1: str，第二个实体 id。
- anchor0: Tuple[float, float, float]，第一个 Joint frame 原点的世界坐标。
- anchor1: Tuple[float, float, float]，第二个 Joint frame 原点的世界坐标，可与 anchor0 不同。

**返回值**：int，关节 id；失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
jointId = levelComp.CreateDistanceJoint(entityId0, entityId1, (0, 80, 0), (0, 77, 0))
levelComp.SetDistanceJointParams(jointId, 2.0, 4.0, 200.0, 30.0, 14)
```

</TabItem>
</Tabs>

---

### CreateFixedJoint

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

创建固定关节，两个刚体刚性连接，无自由度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateFixedJoint(
    entityId0: str,
    entityId1: str,
    anchor0: Tuple[float, float, float],
    anchor1: Tuple[float, float, float],
) -> int
```

- entityId0: str，第一个实体 id，传空字符串""表示锚定到世界。
- entityId1: str，第二个实体 id，传空字符串""表示锚定到世界。
- anchor0: Tuple[float, float, float]，第一个 Joint frame 原点的世界坐标，通常与 anchor1 相同。
- anchor1: Tuple[float, float, float]，第二个 Joint frame 原点的世界坐标，通常与 anchor0 相同。

**返回值**：int，关节 id；失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
jointId = levelComp.CreateFixedJoint(entityId0, entityId1, (0, 80, 0), (0, 80, 0))
```

</TabItem>
</Tabs>

---

### CreatePrismaticJoint

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

创建滑动关节；两个刚体仅能沿指定轴相对平移，旋转被锁定，可加行程限制。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreatePrismaticJoint(
    entityId0: str,
    entityId1: str,
    anchor0: Tuple[float, float, float],
    anchor1: Tuple[float, float, float],
    axis: Tuple[float, float, float],
) -> int
```

- entityId0: str，第一个实体 id，传空字符串""表示锚定到世界。
- entityId1: str，第二个实体 id。
- anchor0: Tuple[float, float, float]，第一个 Joint frame 原点的世界坐标，通常与 anchor1 相同。
- anchor1: Tuple[float, float, float]，第二个 Joint frame 原点的世界坐标，通常与 anchor0 相同。
- axis: Tuple[float, float, float]，世界坐标系滑动轴方向，无需预归一化，对应 Joint frame 的+X 轴；零向量退化为世界+X 轴。

**返回值**：int，关节 id；失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
jointId = levelComp.CreatePrismaticJoint(entityId0, entityId1, (0, 80, 0), (0, 80, 0), (1, 0, 0))
```

</TabItem>
</Tabs>

---

### CreateRevoluteJoint

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

创建铰链关节，绕指定轴单轴旋转，可加角度限制和电机。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateRevoluteJoint(
    entityId0: str,
    entityId1: str,
    anchor0: Tuple[float, float, float],
    anchor1: Tuple[float, float, float],
    axis: Tuple[float, float, float],
) -> int
```

- entityId0: str，第一个实体 id，传空字符串""表示锚定到世界。
- entityId1: str，第二个实体 id。
- anchor0: Tuple[float, float, float]，第一个 Joint frame 原点的世界坐标，通常与 anchor1 相同。
- anchor1: Tuple[float, float, float]，第二个 Joint frame 原点的世界坐标，通常与 anchor0 相同。
- axis: Tuple[float, float, float]，世界坐标系旋转轴方向，无需预归一化，对应 Joint frame 的+X 轴；零向量退化为世界+X 轴。

**返回值**：int，关节 id；失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
jointId = levelComp.CreateRevoluteJoint(entityId0, entityId1, (0, 80, 0), (0, 80, 0), (0, 1, 0))
```

</TabItem>
</Tabs>

---

### CreateSphericalJoint

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

创建球窝关节，允许三轴旋转，可加锥形角度限制。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateSphericalJoint(
    entityId0: str,
    entityId1: str,
    anchor0: Tuple[float, float, float],
    anchor1: Tuple[float, float, float],
) -> int
```

- entityId0: str，第一个实体 id，传空字符串""表示锚定到世界。
- entityId1: str，第二个实体 id。
- anchor0: Tuple[float, float, float]，第一个 Joint frame 原点的世界坐标，通常与 anchor1 相同。
- anchor1: Tuple[float, float, float]，第二个 Joint frame 原点的世界坐标，通常与 anchor0 相同。

**返回值**：int，关节 id；失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
jointId = levelComp.CreateSphericalJoint(entityId0, entityId1, (0, 80, 0), (0, 80, 0))
```

</TabItem>
</Tabs>

---

### DestroyAllJoints

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

销毁所有关节。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DestroyAllJoints() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.DestroyAllJoints()
```

</TabItem>
</Tabs>

---

### DestroyJoint

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

销毁关节。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DestroyJoint(jointId: int) -> bool
```

- jointId: int，关节 id。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.DestroyJoint(jointId)
```

</TabItem>
</Tabs>

---

### DestroyJointsForEntity

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

销毁指定实体上所有关联的关节，应在实体销毁前调用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DestroyJointsForEntity(entityId: str) -> int
```

- entityId: str，实体 id。

**返回值**：int，销毁的关节数量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
destroyedCount = levelComp.DestroyJointsForEntity(entityId)
```

</TabItem>
</Tabs>

---

### GetJointBreakForce

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

获取关节的断裂力和断裂扭矩。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetJointBreakForce(jointId: int) -> Tuple[float, float]
```

- jointId: int，关节 id。

**返回值**：Tuple[float, float]，(force, torque)；无效关节返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
print levelComp.GetJointBreakForce(jointId)
```

</TabItem>
</Tabs>

---

### GetJointFrames

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

获取关节两端当前的本地 frame 和世界 frame。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetJointFrames(jointId: int) -> Dict[str, Any]
```

- jointId: int，关节 id。

**返回值**：Dict[str, Any]，localFrame0/localFrame1/worldFrame0/worldFrame1 各包含 position 和 rotation；actor0IsWorld/actor1IsWorld 表示该端是否为世界锚点；无效 id 返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
print levelComp.GetJointFrames(jointId)
```

</TabItem>
</Tabs>

---

### GetJointType

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

查询关节类型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetJointType(jointId: int) -> int
```

- jointId: int，关节 id。

**返回值**：int，0=Fixed, 1=Distance, 2=Spherical, 3=Revolute, 4=Prismatic；无效关节返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
print levelComp.GetJointType(jointId)
```

</TabItem>
</Tabs>

---

### GetRevoluteJointAngle

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

获取铰链关节当前相对于创建零位的旋转角度。仅对 RevoluteJoint 有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRevoluteJointAngle(jointId: int) -> float
```

- jointId: int，关节 id。

**返回值**：float，当前角度(rad)；非 RevoluteJoint 或无效 id 返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
print levelComp.GetRevoluteJointAngle(jointId)
```

</TabItem>
</Tabs>

---

### GetRevoluteJointVelocity

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

获取铰链关节当前角速度。仅对 RevoluteJoint 有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRevoluteJointVelocity(jointId: int) -> float
```

- jointId: int，关节 id。

**返回值**：float，当前角速度(rad/s)；非 RevoluteJoint 或无效 id 返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
print levelComp.GetRevoluteJointVelocity(jointId)
```

</TabItem>
</Tabs>

---

### IsJointBroken

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

查询关节是否已断裂。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsJointBroken(jointId: int) -> bool
```

- jointId: int，关节 id。

**返回值**：bool，是否已断裂；无效关节返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
print levelComp.IsJointBroken(jointId)
```

</TabItem>
</Tabs>

---

### SetDistanceJointParams

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

设置距离关节参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDistanceJointParams(
    jointId: int,
    minDist: float,
    maxDist: float,
    stiffness: float,
    damping: float,
    flags: int,
) -> bool
```

- jointId: int，关节 id。
- minDist: float，最小距离。
- maxDist: float，最大距离。
- stiffness: float，弹簧刚度。
- damping: float，弹簧阻尼。
- flags: int，距离关节 flag 位组合(2=eMAX_DISTANCE_ENABLED, 4=eMIN_DISTANCE_ENABLED, 8=eSPRING_ENABLED)。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
# 2=最大距离，4=最小距离，8=弹簧；14 表示三项全部开启
levelComp.SetDistanceJointParams(jointId, 2.0, 4.0, 200.0, 30.0, 14)
```

</TabItem>
</Tabs>

---

### SetJointBreakForce

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

设置关节可承受的约束力/约束扭矩阈值；PhysX 求解出的实际约束载荷超过任一阈值时自动断裂。冲量(eIMPULSE，单位 N·s)不能直接与力阈值(N)比较。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetJointBreakForce(jointId: int, force: float, torque: float) -> bool
```

- jointId: int，关节 id。
- force: float，最大允许约束力(N)；必须为非负有限数，-1 表示不可断裂。
- torque: float，最大允许约束扭矩(N·m)；必须为非负有限数，-1 表示不可断裂。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.SetJointBreakForce(jointId, 500.0, 100.0)
```

</TabItem>
</Tabs>

---

### SetJointCollisionEnabled

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

设置关节关联的两个刚体之间是否发生碰撞，适用于所有关节类型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetJointCollisionEnabled(jointId: int, enabled: bool) -> bool
```

- jointId: int，关节 id。
- enabled: bool，True 表示允许碰撞，False 表示忽略相互碰撞。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.SetJointCollisionEnabled(jointId, False)
```

</TabItem>
</Tabs>

---

### SetPrismaticJointLimit

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

设置滑动关节的行程限制并启用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPrismaticJointLimit(jointId: int, lower: float, upper: float) -> bool
```

- jointId: int，关节 id。
- lower: float，沿滑动轴的下限距离（格）。
- upper: float，沿滑动轴的上限距离（格）。

**返回值**：bool，是否成功；要求下限不大于上限。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.SetPrismaticJointLimit(jointId, -3.0, 3.0)
```

</TabItem>
</Tabs>

---

### SetRevoluteJointDrive

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

设置铰链关节的电机并启用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRevoluteJointDrive(jointId: int, velocity: float, forceLimit: float) -> bool
```

- jointId: int，关节 id。
- velocity: float，目标角速度(rad/s)。
- forceLimit: float，最大扭矩。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.SetRevoluteJointDrive(jointId, 1.5, 100000.0)
```

</TabItem>
</Tabs>

---

### SetRevoluteJointLimit

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

设置铰链关节的角度限制并启用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRevoluteJointLimit(jointId: int, lower: float, upper: float) -> bool
```

- jointId: int，关节 id。
- lower: float，下限角度(弧度)。
- upper: float，上限角度(弧度)。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import math
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.SetRevoluteJointLimit(jointId, -math.pi / 3.0, math.pi / 3.0)
```

</TabItem>
</Tabs>

---

### SetSphericalJointLimitCone

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

设置球窝关节的锥形角度限制并启用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSphericalJointLimitCone(jointId: int, yAngle: float, zAngle: float) -> bool
```

- jointId: int，关节 id。
- yAngle: float，Y 轴方向最大摆角(弧度)。
- zAngle: float，Z 轴方向最大摆角(弧度)。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import math
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.SetSphericalJointLimitCone(jointId, math.pi / 4.0, math.pi / 4.0)
```

</TabItem>
</Tabs>

---
