---
sidebar_position: 4
---

# 碰撞体

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录碰撞体相关的接口，共 8 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wuli/pengzhuangti.html"/>

---

### AddBoxGeometry

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

给自定义刚体创建盒形碰撞体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddBoxGeometry(
    localTransform: Tuple[float, float, float],
    halfX: float,
    halfY: float,
    halfZ: float,
    staticFriction: float,
    dynamicFriction: float,
    restitution: float,
    eventMask: int,
    userData: Optional[str] = None,
    density: float = 10.0,
) -> bool
```

- localTransform: Tuple[float, float, float]，盒子中心相对实体原点的偏移。
- halfX: float，表示盒子长度的一半。
- halfY: float，表示盒子高度的一半。
- halfZ: float，表示盒子宽度的一半。
- staticFriction: float，静摩擦系数。
- dynamicFriction: float，动摩擦系数。
- restitution: float，弹性恢复系数，范围：[0, 1]。
- eventMask: int，[PxEventMask 枚举](/docs/docs/scripts/modapi/enums#pxeventmask)，用于监听碰撞事件，默认为 PxEventMask.Null，即不需要碰撞事件。
- userData: Optional[str]，可记录自定义数据，长度不超过 20，默认为 None。
- density: float，碰撞体密度，必须大于 0，影响刚体总质量、质心和惯性张量，默认为 10.0。

**返回值**：bool，是否成功。

**备注**

- 可在创建刚体后的任意服务端脚本时机调用，运行时添加后会自动重算刚体质量、质心和惯性张量；碰撞体配置本身不存档。
- 当前世界中通过 PhysX 脚本接口创建且未移除的 Shape 总数上限为 8192 个，盒形、胶囊形、球形碰撞体和盒形触发器共同计数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.AddBoxGeometry((0, 0.9, 0), 0.3, 0.9, 0.3, 0.05, 0.05, 0)
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(entityId)`

给客户端本地自定义刚体创建盒形碰撞体。

```python
AddBoxGeometry(
    localTransform: Tuple[float, float, float],
    halfX: float,
    halfY: float,
    halfZ: float,
    staticFriction: float,
    dynamicFriction: float,
    restitution: float,
    eventMask: int,
    userData: Optional[str] = None,
    density: float = 10.0,
) -> bool
```

- localTransform: Tuple[float, float, float]，盒子中心相对实体原点的偏移。
- halfX: float，盒子长度的一半。
- halfY: float，盒子高度的一半。
- halfZ: float，盒子宽度的一半。
- staticFriction: float，静摩擦系数。
- dynamicFriction: float，动摩擦系数。
- restitution: float，弹性恢复系数，范围：[0, 1]。
- eventMask: int，[PxEventMask 枚举](/docs/docs/scripts/modapi/enums#pxeventmask)，碰撞事件掩码，默认为 PxEventMask.Null。
- userData: Optional[str]，自定义数据，长度不超过 20，默认为 None。
- density: float，碰撞体密度，必须大于 0，默认为 10.0。

**返回值**：bool，是否成功。

**备注**

- 仅添加到客户端本地 PhysX 副本，不会自动同步到服务端；世界中同时存在的碰撞体上限为 8192 个。

---

### AddBoxTrigger

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

给自定义刚体创建盒子形触发器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddBoxTrigger(
    localTransform: Tuple[float, float, float],
    halfX: float,
    halfY: float,
    halfZ: float,
    eventMask: int,
    userData: Optional[str] = None,
    density: float = 10.0,
) -> bool
```

- localTransform: Tuple[float, float, float]，盒子中心相对实体原点的偏移。
- halfX: float，盒子在 x 轴方向的一半长度。
- halfY: float，盒子在 y 轴方向的一半长度。
- halfZ: float，盒子在 z 轴方向的一半长度。
- eventMask: int，[PxEventMask 枚举](/docs/docs/scripts/modapi/enums#pxeventmask)，用于监听碰撞事件，默认为 PxEventMask.Null，即不需要碰撞事件。
- userData: Optional[str]，可记录自定义数据，长度不超过 20，默认为 None。
- density: float，触发器碰撞体密度，必须大于 0；触发器不参与刚体质量计算，该参数用于保持接口参数格式一致，默认为 10.0。

**返回值**：bool，是否成功。

**备注**

- 可在创建刚体后的任意服务端脚本时机调用；触发器本身不参与刚体质量计算，碰撞体配置本身不存档。
- 当前世界中通过 PhysX 脚本接口创建且未移除的 Shape 总数上限为 8192 个，盒形、胶囊形、球形碰撞体和盒形触发器共同计数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.AddBoxTrigger((0, 0.9, 0), 0.3, 0.9, 0.3)
```

</TabItem>
</Tabs>

---

### AddCapsuleGeometry

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

给自定义刚体创建胶囊形碰撞体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddCapsuleGeometry(
    localTransform: Tuple[float, float, float],
    radius: float,
    halfHeight: float,
    staticFriction: float,
    dynamicFriction: float,
    restitution: float,
    eventMask: int,
    userData: Optional[str] = None,
    density: float = 10.0,
) -> bool
```

- localTransform: Tuple[float, float, float]，胶囊中心相对实体原点的偏移。
- radius: float，胶囊半径。
- halfHeight: float，胶囊高度的一半。
- staticFriction: float，静摩擦系数。
- dynamicFriction: float，动摩擦系数。
- restitution: float，弹性恢复系数，范围：[0, 1]。
- eventMask: int，[PxEventMask 枚举](/docs/docs/scripts/modapi/enums#pxeventmask)，用于监听碰撞事件，默认为 PxEventMask.Null，即不需要碰撞事件。
- userData: Optional[str]，可记录自定义数据，长度不超过 20，默认为 None。
- density: float，碰撞体密度，必须大于 0，影响刚体总质量、质心和惯性张量，默认为 10.0。

**返回值**：bool，是否成功。

**备注**

- 可在创建刚体后的任意服务端脚本时机调用，运行时添加后会自动重算刚体质量、质心和惯性张量；碰撞体配置本身不存档。
- 当前世界中通过 PhysX 脚本接口创建且未移除的 Shape 总数上限为 8192 个，盒形、胶囊形、球形碰撞体和盒形触发器共同计数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.AddCapsuleGeometry((0, 0.9, 0), 0.3, 0.9, 0.05, 0.05, 0)
```

</TabItem>
</Tabs>

---

### AddSphereGeometry

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

给自定义刚体创建球形碰撞体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddSphereGeometry(
    localTransform: Tuple[float, float, float],
    radius: float,
    staticFriction: float,
    dynamicFriction: float,
    restitution: float,
    eventMask: int,
    userData: Optional[str] = None,
    density: float = 10.0,
) -> bool
```

- localTransform: Tuple[float, float, float]，球心相对实体原点的偏移。
- radius: float，球半径。
- staticFriction: float，静摩擦系数。
- dynamicFriction: float，动摩擦系数。
- restitution: float，弹性恢复系数，范围：[0, 1]。
- eventMask: int，[PxEventMask 枚举](/docs/docs/scripts/modapi/enums#pxeventmask)，用于监听碰撞事件，默认为 PxEventMask.Null，即不需要碰撞事件。
- userData: Optional[str]，可记录自定义数据，长度不超过 20，默认为 None。
- density: float，碰撞体密度，必须大于 0，影响刚体总质量、质心和惯性张量，默认为 10.0。

**返回值**：bool，是否成功。

**备注**

- 可在创建刚体后的任意服务端脚本时机调用，运行时添加后会自动重算刚体质量、质心和惯性张量；碰撞体配置本身不存档。
- 当前世界中通过 PhysX 脚本接口创建且未移除的 Shape 总数上限为 8192 个，盒形、胶囊形、球形碰撞体和盒形触发器共同计数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.AddSphereGeometry((0, 0.9, 0), 0.3, 0.05, 0.05, 0)
```

</TabItem>
</Tabs>

---

### GetShapeCount

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取自定义刚体当前的碰撞 shape 数量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetShapeCount() -> int
```


**返回值**：int，shape 数量；非自定义刚体时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetShapeCount()
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取客户端本地自定义刚体当前的碰撞 shape 数量。

```python
GetShapeCount() -> int
```


**返回值**：int，shape 数量；客户端没有本地自定义刚体时返回 None。

---

### GetShapeInfo

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取指定碰撞 shape 的信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetShapeInfo(shapeIndex: int) -> Dict[str, Any]
```

- shapeIndex: int，shape 索引，范围为 0 到 [GetShapeCount](/docs/docs/scripts/modapi/interfaces/physics/collider#getshapecount)()-1。

**返回值**：Dict[str, Any]，包含 localTransform、userData、geometry 等信息；无效索引返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
print comp.GetShapeInfo(0) # 返回第一个 shape 的 localTransform、userData 等信息
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(entityId)`

获取客户端本地指定碰撞 shape 的信息。

```python
GetShapeInfo(shapeIndex: int) -> Dict[str, Any]
```

- shapeIndex: int，shape 索引，范围为 0 到 [GetShapeCount](/docs/docs/scripts/modapi/interfaces/physics/collider#getshapecount)()-1。

**返回值**：Dict[str, Any]，包含 localTransform、userData、geometry 等信息；无效索引返回 None。

---

### RemoveShape

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

删除自定义刚体上指定索引的碰撞 shape，适用于盒形、胶囊形、球形碰撞体和触发器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveShape(shapeIndex: int) -> bool
```

- shapeIndex: int，shape 索引，范围为 0 到 [GetShapeCount](/docs/docs/scripts/modapi/interfaces/physics/collider#getshapecount)()-1。

**返回值**：bool，是否成功。

**备注**

- 通用删除接口，不需要按 Shape 类型分别调用 RemoveBoxGeometry 等接口。删除后后续 Shape 的索引可能变化，建议重新查询后再删除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.RemoveShape(0) # 删除第一个已添加的碰撞 shape
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(entityId)`

删除客户端本地自定义刚体上指定索引的碰撞 shape。

```python
RemoveShape(shapeIndex: int) -> bool
```

- shapeIndex: int，shape 索引，范围为 0 到 [GetShapeCount](/docs/docs/scripts/modapi/interfaces/physics/collider#getshapecount)()-1。

**返回值**：bool，是否成功。

**备注**

- 仅操作客户端本地 PhysX 副本，不会同步删除服务端 Shape；删除后后续 Shape 的索引可能变化。

---

### RemoveShapeByUserData

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

删除所有 userData 与指定值相同的碰撞 shape。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveShapeByUserData(userData: str) -> int
```

- userData: str，创建 shape 时传入的自定义标识。

**返回值**：int，实际删除的 shape 数量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
removedCount = comp.RemoveShapeByUserData("wheel")
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(entityId)`

删除客户端本地所有 userData 与指定值相同的碰撞 shape。

```python
RemoveShapeByUserData(userData: str) -> int
```

- userData: str，创建 shape 时传入的自定义标识。

**返回值**：int，实际删除的 shape 数量。

**备注**

- 仅操作客户端本地 PhysX 副本，不会同步删除服务端 Shape。

---
