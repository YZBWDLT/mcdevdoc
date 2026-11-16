---
sidebar_position: 4
---

# 相机

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录相机相关的接口，共 10 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/xunishijie/xiangji.html"/>

---

### CameraGetClickModel

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

获取相机当前指向的模型的 id，会返回离相机最近的，通常与 [GetEntityByCoordEvent](/docs/docs/scripts/modapi/events/control#getentitybycoordevent) 配合使用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraGetClickModel() -> int
```


**返回值**：int，模型的 id, 相机没有指向模型则返回-1。

**备注**

- 模型需要设置包围盒才能响应点击。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 当玩家点击屏幕时获取点击位置的模型的id
import mod.client.extraClientApi as clientApi
class MyClientSystem(ClientSystem):
    def __init__(self, namespace, name):
        ClientSystem.__init__(self, namespace, name)
        self.ListenForEvent('Minecraft', 'Engine', 'GetEntityByCoordEvent', self, self.click)
        self.initModel()

    def initModel(self):
        virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
        id = virtualWorldComp.ModelCreateObject("datiangou", "run")
        # 设置了包围盒才能响应点击
        virtualWorldComp.ModelSetBoxCollider(id, (2.0, 2.0, 2.0), (0.0, 0.0, 0.0))

    def click(self, args):
        import client.extraClientApi as clientApi
        virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
        id = virtualWorldComp.CameraGetClickModel()
        if id > 0:
            print("select:", id)
```

</TabItem>
</Tabs>

---

### CameraGetFov

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

获取相机视野大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraGetFov() -> float
```


**返回值**：float，视野大小( field of view )，单位为角度, 范围为[30, 110]。不修改时默认为 45。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
fov = virtualWorldComp.CameraGetFov()
```

</TabItem>
</Tabs>

---

### CameraGetPos

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

返回相机位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraGetPos() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，坐标值(x, y, z), 若虚拟世界没有创建则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
cameraPos = virtualWorldComp.CameraGetPos()
```

</TabItem>
</Tabs>

---

### CameraGetZoom

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

获取相机的缩放值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraGetZoom() -> float
```


**返回值**：float，缩放值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
zoom = virtualWorldComp.CameraGetZoom()
```

</TabItem>
</Tabs>

---

### CameraLookAt

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

修改相机朝向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraLookAt(targetPos: Tuple[float, float, float], upVector: Tuple[float, float, float] = (0,1,0)) -> bool
```

- targetPos: Tuple[float, float, float]，目标的坐标。
- upVector: Tuple[float, float, float]，相机向上方向的向量, (x,y,z)初始默认为(0,1,0)。

**返回值**：bool，是否修改成功。

**备注**

- 相机初始默认朝向为-z 轴。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.CameraLookAt((0.0, 0.0, -10.0), (0.0, 1.0, 0.0))
```

</TabItem>
</Tabs>

---

### CameraMoveTo

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置相机移动动画, 会根据当前相机状态与传入参数按时间进行插值显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraMoveTo(
    pos: Tuple[float, float, float],
    targetPos: Tuple[float, float, float],
    upVector: Tuple[float, float, float],
    zoom: float,
    time: float,
    ease: TimeEaseType = TimeEaseType.linear,
) -> bool
```

- pos: Tuple[float, float, float]，目标点的坐标。
- targetPos: Tuple[float, float, float]，到达目标点后朝向的位置。
- upVector: Tuple[float, float, float]，到达目标点后相机向上方向的向量。
- zoom: float，到达目标点相机的缩放值。
- time: float，单位秒，动作时长（大于 0 的浮点数）。为了镜头连贯性，相机的运动与实际帧率有关，默认以 60 帧计算，会因实际帧率波动稍有偏差。
- ease: TimeEaseType，时间变化函数, 默认值为 clientApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/general/tool#getminecraftenum)().TimeEaseType.linear, 参数不在枚举值中也当作 linear。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.CameraMoveTo((0.0, 0.0, -10.0), (1.0, 1.0, -10.0), (0.0,1.0, 0.0), 1.0, 3.0, clientApi.GetMinecraftEnum().TimeEaseType.linear)
```

</TabItem>
</Tabs>

---

### CameraSetFov

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置相机视野大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraSetFov(fov: float = 45) -> bool
```

- fov: float，视野大小( field of view )，单位为角度, 范围为[30, 110]，若 fov 小于 30 则设置为 30，若 fov 大于 110，则设置为 110。不修改时默认为 45。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.CameraSetFov(60)
```

</TabItem>
</Tabs>

---

### CameraSetPos

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置相机位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraSetPos(pos: Tuple[float, float, float] = (0,0,0)) -> bool
```

- pos: Tuple[float, float, float]，坐标值(x,y,z)初始默认为 (0,0,0)，且朝向 z 轴负方向。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.CameraSetPos((0.0, 6.0, 0.0))
```

</TabItem>
</Tabs>

---

### CameraSetZoom

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置相机缩放。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraSetZoom(zoom: float = 1) -> bool
```

- zoom: float，缩放值, 范围为[0.1,100.0]，小于 0.1 则设置为 0.1，大于 100 则设置为 100，不修改时默认为 1。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.CameraSetZoom(2.0)
```

</TabItem>
</Tabs>

---

### CameraStopActions

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

停止相机移动动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CameraStopActions() -> bool
```


**返回值**：bool，是否停止成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.CameraMoveTo((0.0, 0.0, -10.0), (1.0, 1.0, -10.0), (0.0,1.0, 0.0), 1.0, 3.0, clientApi.GetMinecraftEnum().TimeEaseType.linear)
virtualWorldComp.CameraStopActions()
```

</TabItem>
</Tabs>

---
