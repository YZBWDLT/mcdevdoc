---
sidebar_position: 1
---

# 场景

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录场景相关的接口，共 7 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wuli/changjing.html"/>

---

### ClearRemoteVisualSync

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

清除该自定义 PhysX 刚体的运行时远端同步配置，恢复实体定义的默认带宽优化行为，仅服务端可调用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClearRemoteVisualSync() -> bool
```


**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.ClearRemoteVisualSync()
```

</TabItem>
</Tabs>

---

### ConnectPvd

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

连接本机 PhysX Visual Debugger（PVD）以调试当前 PhysX 场景。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ConnectPvd() -> bool
```


**返回值**：bool，是否连接成功。

**备注**

- 全局 PhysX 调试操作，与当前组件绑定的实体无关。请先启动 PVD 并监听本机端口，再调用该接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.ConnectPvd()
```

</TabItem>
</Tabs>

---

### DisconnectPvd

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

断开当前 PhysX 场景与本机 PhysX Visual Debugger（PVD）的连接。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DisconnectPvd() -> None
```


**返回值**：None，无返回值。

**备注**

- 全局 PhysX 调试操作，与当前组件绑定的实体无关。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.DisconnectPvd()
```

</TabItem>
</Tabs>

---

### Raycast

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(levelId)`

射线检测，获取与射线相交的碰撞体。目前仅支持获取自定义刚体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Raycast(
    dimensionId: int,
    origin: Tuple[float, float, float],
    dir: Tuple[float, float, float],
    maxDist: float,
    maxHits: int = 1,
) -> List[Dict[str, Any]]
```

- dimensionId: int，维度 id。
- origin: Tuple[float, float, float]，射线的起点。
- dir: Tuple[float, float, float]，射线的方向。
- maxDist: float，射线的最大长度，最大 128。
- maxHits: int，获取射线相交的前 N 个碰撞体，最大为 16，默认为 1。

**返回值**：List[Dict[str, Any]]，返回相交的碰撞体的信息。每个元素的内容见备注。

**备注**

- 返回列表的每个元素为一个 dict，内容如下：\{ "entityId": str, # 碰撞体所属的实体 id "userData": str 或 None, # 碰撞体的 userData "pos": (float,float,float), # 相交的位置 "normal": (float,float,float), # 碰撞体在相交位置的法线 "dist": float, # 射线起点与相交点的距离 \}。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(levelId)
print comp.Raycast(0, (0,80,0), (0,1,0), 5)
```

</TabItem>
</Tabs>

<Client/> PhysxComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreatePhysx(levelId)`

射线检测，获取与射线相交的碰撞体。目前仅支持获取自定义刚体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Raycast(
    origin: Tuple[float, float, float],
    dir: Tuple[float, float, float],
    maxDist: float,
    maxHits: int = 1,
) -> List[Dict[str, Any]]
```

- origin: Tuple[float, float, float]，射线的起点。
- dir: Tuple[float, float, float]，射线的方向。
- maxDist: float，射线的最大长度，最大 128。
- maxHits: int，获取射线相交的前 N 个碰撞体，最大为 16，默认为 1。

**返回值**：List[Dict[str, Any]]，按顺序返回相交的碰撞体的信息。每个元素的内容见备注。

**备注**

- 返回列表的每个元素为一个 dict，内容如下：\{ "entityId": str, # 碰撞体所属的实体 id "userData": str 或 None, # 碰撞体的 userData "pos": (float,float,float), # 相交的位置 "normal": (float,float,float), # 碰撞体在相交位置的法线 "dist": float, # 射线起点与相交点的距离 \}。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePhysx(levelId)
print comp.Raycast(0, (0,80,0), (0,1,0), 5)
```

</TabItem>
</Tabs>

---

### SampleBuoyancy

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

使用 C++批量采样自定义刚体的浸没体积、浮力合力和浮心；本接口只计算，不施力，仅服务端可调用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SampleBuoyancy(
    samples: List[Tuple[float, float, float, float]],
    yOffset: float,
    fluidDensities: Dict[str, Any],
    gravityMagnitude: float = 9.81,
    forceScale: float = 2.0,
) -> Dict[str, Any]
```

- samples: List[Tuple[float, float, float, float]]，局部空间采样点列表，每项为(x,y,z,体积权重)，最多 4096 项。
- yOffset: float，所有采样点的局部 Y 轴附加偏移。
- fluidDensities: Dict[str, Any]，液体 identifier 到密度的映射，例如。
- gravityMagnitude: float，重力加速度绝对值，必须大于 0，默认 9.81。
- forceScale: float，浮力调节倍率，必须大于 0，默认 2.0。

**返回值**：Dict[str, Any]，成功时返回 fSub、force、center、position、totalVolume、submergedVolume 和 queryCount，失败返回 None。

**备注**

- 本接口读取刚体姿态和已加载地形中的液体，不会修改重力、速度、阻尼或施加浮力。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
result = comp.SampleBuoyancy(
    [(0.0, 0.0, 0.0, 1.0)],
    -1.5,
    {"minecraft:water": 90.0, "minecraft:flowing_water": 90.0}
)
```

</TabItem>
</Tabs>

---

### SetRemoteVisualSync

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(entityId)`

设置该自定义 PhysX 刚体的远端位置与四元数同步降频参数，整个刚体的所有 shape/mesh 一并生效，仅服务端可调用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRemoteVisualSync(maxOptimizedDistance: float, maxDroppedTicks: int) -> bool
```

- maxOptimizedDistance: float，开始按距离线性降低同步频率的最大距离，必须大于等于 0。
- maxDroppedTicks: int，允许连续跳过的最大服务端 Tick 数，0 表示禁用远距离降频并始终完整同步。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePhysx(entityId)
comp.SetRemoteVisualSync(80.0, 0) # 80 格内不丢同步 tick
```

</TabItem>
</Tabs>

---

### SetSceneGravity

<Server/> PhysxComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())`

设置指定维度 PhysX 场景的全局重力，仅服务端可调用；立即影响该维度内全部受重力的动态 PhysX 刚体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSceneGravity(dimensionId: int, gravity: Tuple[float, float, float]) -> bool
```

- dimensionId: int，维度 ID。
- gravity: Tuple[float, float, float]，重力加速度向量，例如(0.0, -9.8, 0.0)。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelComp = serverApi.GetEngineCompFactory().CreatePhysx(serverApi.GetLevelId())
levelComp.SetSceneGravity(0, (0.0, -9.8, 0.0))
```

</TabItem>
</Tabs>

---
