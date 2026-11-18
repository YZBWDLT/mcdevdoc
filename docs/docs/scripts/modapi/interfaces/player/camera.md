---
sidebar_position: 5
---

# 摄像机

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录摄像机相关的接口，共 45 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wanjia/shexiangji.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### AddCameraAroundEntityMotion

<Version type="china" add="2.5"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

给相机添加对实体环绕运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddCameraAroundEntityMotion(
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
- lockDir: bool，是否在运动器生效时锁定相机的朝向，不锁定则相机的朝向会随着运动而改变，默认为 False。
- stopRad: float，停止该运动器所需要的弧度，当 stopRad 为 0 时，该运动器会一直运行，默认为 0。
- radius: float，环绕半径，当设置为-1 时环绕运动器使用当前与目标的距离作为半径，当设置为非负数时表示按设定的值作为环绕半径，默认为-1。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 环绕运动器可叠加多个，且可与速度运动器互相叠加。当有多个运动器叠加时，位置为各个运动器计算出的瞬时向量之和，朝向以后添加的运动器设置的朝向为准。
- 运动器的朝向也会受到玩家视角转动的影响，若要完全使用运动器的朝向，建议使用 [SetCanDrag](/docs/docs/scripts/modapi/interfaces/control#setcandrag) 接口屏蔽玩家的视角操作。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
axis=(-1, 1, 1)
mID = comp.AddCameraAroundEntityMotion(eID, 1.0, axis, lockDir=False, stopRad=0, radius=2.0)
```

</TabItem>
</Tabs>

---

### AddCameraAroundPointMotion

<Version type="china" add="2.5"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

给相机添加对点环绕运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddCameraAroundPointMotion(
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
- lockDir: bool，是否在运动器生效时锁定相机的朝向，不锁定则相机的朝向会随着运动而改变，默认为 False。
- stopRad: float，停止该运动器所需要的弧度，当 stopRad 为 0 时，该运动器会一直运行，默认为 0。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 环绕运动器可叠加多个，且可与速度运动器互相叠加。当有多个运动器叠加时，位置为各个运动器计算出的瞬时向量之和，朝向以后添加的运动器设置的朝向为准。
- 运动器的朝向也会受到玩家视角转动的影响，若要完全使用运动器的朝向，建议使用 [SetCanDrag](/docs/docs/scripts/modapi/interfaces/control#setcandrag) 接口屏蔽玩家的视角操作。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
center = (0, 8, 0)
axis=(-1, 1, 1)
mID = comp.AddCameraAroundPointMotion(center, 1.0, axis, lockDir=False, stopRad=0)
```

</TabItem>
</Tabs>

---

### AddCameraTrackMotion

<Version type="china" add="2.5"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

给相机添加轨迹运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddCameraTrackMotion(
    targetPos: Tuple[float, float, float],
    duraTime: float,
    startPos: Optional[Tuple[float, float, float]] = None,
    relativeCoord: bool = False,
    isLoop: bool = False,
    targetRot: Optional[Tuple[float, float, float]] = None,
    startRot: Optional[Tuple[float, float, float]] = None,
    useVelocityDir: bool = False,
    ease: TimeEaseType = TimeEaseType.linear,
) -> int
```

- targetPos: Tuple[float, float, float]，轨迹终点。
- duraTime: float，到达终点所需要的时间。
- startPos: Optional[Tuple[float, float, float]]，轨迹起点，默认为 None，表示以调用 [StartCameraMotion](/docs/docs/scripts/modapi/interfaces/player/camera#startcameramotion) 的位置作为起点。
- relativeCoord: bool，是否使用相对坐标设置起点和终点，默认为 False。
- isLoop: bool，是否循环，若设为 True，则相机会在起点和终点之间往复运动，默认为 False。
- targetRot: Optional[Tuple[float, float, float]]，相机到达 targetPos 时的朝向，受参数 relativeCoord 影响，默认为 None，表示使用调用 [StartCameraMotion](/docs/docs/scripts/modapi/interfaces/player/camera#startcameramotion) 时的朝向。
- startRot: Optional[Tuple[float, float, float]]，相机到达 startPos 时的朝向，受参数 relativeCoord 影响，默认为 None，表示使用调用 [StartCameraMotion](/docs/docs/scripts/modapi/interfaces/player/camera#startcameramotion) 时的朝向。
- useVelocityDir: bool，是否使用运动中的速度方向作为朝向，默认为 False，若为 True，则参数 targetRot 和 startRot 无效。
- ease: TimeEaseType，时间变化函数, 默认值为 clientApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().TimeEaseType.linear, 参数不在枚举值中也当作 linear。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 轨迹运动器不可叠加，仅能添加一个。相机会在运动器停止后自动回到原始状态。
- 运动器的相对坐标设置(relativeCoord)是根据启动运动器时的相机位置计算所得，并不是在添加运动器时计算。使用相对坐标时，是以相机自身的局部坐标系(右手坐标系)为参考。引擎中的相机镜头默认朝向自身局部坐标系的-Z 轴方向，当设置朝向时，实际上是设置了相机的 Z 轴的方位角，比如设置 startRot=(0,0)，相机镜头会朝向世界坐标的-Z 轴方向。
- 设置朝向后会根据相应的参数计算出最终朝向，若此时的 targetRot > startRot，则会顺时针旋转，反之逆时针旋转。
- 当相机被设置为 lock 后，添加相机轨迹运动器相关的接口失效！

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
target = (5, 0, 0)
rot1 = (0, 0, 0)
rot2 = (0, 360, 0)
mID = comp.AddCameraTrackMotion(target, 3.0, startPos=None, relativeCoord=True, isLoop=False, targetRot=rot1, startRot=rot2, useVelocityDir=True, ease = clientApi.GetMinecraftEnum().TimeEaseType.linear)
```

</TabItem>
</Tabs>

---

### AddCameraVelocityMotion

<Version type="china" add="2.5"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

给相机添加速度运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddCameraVelocityMotion(
    velocity: Tuple[float, float, float],
    accelerate: Optional[Tuple[float, float, float]] = None,
    useVelocityDir: bool = True,
) -> int
```

- velocity: Tuple[float, float, float]，速度，包含大小、方向。
- accelerate: Optional[Tuple[float, float, float]]，加速度，包含大小、方向，默认为 None，表示没有加速度。
- useVelocityDir: bool，是否使用当前速度的方向作为此刻相机的朝向，默认为 True。

**返回值**：int，运动器 ID，添加失败时返回-1。

**备注**

- 速度运动器可叠加多个，且可与环绕运动器互相叠加。当有多个运动器叠加时，相机的朝向以后添加的运动器设置的朝向为准。
- 运动器的朝向也会受到玩家视角转动的影响，若要完全使用运动器的朝向，建议使用 [SetCanDrag](/docs/docs/scripts/modapi/interfaces/control#setcandrag) 接口屏蔽玩家的视角操作。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
velocity = (0, 0, 1)
accelerate = (0, 0, -1)
mID = comp.AddCameraVelocityMotion(velocity, accelerate, useVelocityDir=True)
```

</TabItem>
</Tabs>

---

### DepartCamera

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

分离玩家与摄像机。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DepartCamera() -> Any
```


**备注**

- 分离之后，可以看到玩家四周，旋转镜头时玩家面向的方向不再跟随镜头旋转而变化。注意，分离镜头后乘船时，船的组件 minecraft:rideable 中的 lock_rider_rotation 字段将失去效果。另外，在骑乘马或者其他生物的情况下，分离镜头后由于玩家的方向不再跟随镜头旋转，因此骑乘时无法进行转向，请注意这一点。
- 注意，使用后会默认解除视角移动锁定，效果等同 comp.[LockModCameraYaw](/docs/docs/scripts/modapi/interfaces/player/camera#lockmodcamerayaw)(0) # 解除锁定左右视角 comp.[LockModCameraPitch](/docs/docs/scripts/modapi/interfaces/player/camera#lockmodcamerapitch)(0) # 解除锁定上下视角。
- 该接口的效果会与 lockcamera 互相覆盖。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 第三人称锁定视角例子
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.DepartCamera()
comp.LockModCameraYaw(1) # 锁定左右视角
comp.LockModCameraPitch(1) # 锁定上下视角
comp.SetCameraOffset((0, 0, 15))
comp.SetCameraRotation((45.0, 0.0, 0.0))
```

</TabItem>
</Tabs>

---

### GetAspectRatio

<Version type="china" add="3.10"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取画面宽高比。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAspectRatio() -> float
```


**返回值**：float，画面宽高比（宽度/高度）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
aspect = comp.GetAspectRatio()
```

</TabItem>
</Tabs>

---

### GetCameraAnchor

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取相机锚点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCameraAnchor() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，锚点偏移量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.GetCameraAnchor()
```

</TabItem>
</Tabs>

---

### GetCameraMotions

<Version type="china" add="2.5"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取相机上的所有运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCameraMotions() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，运动器集合，key 值代表运动器 mID，value 值代表运动器类型 0：轨迹运动器、1：速度运动器、2：环绕运动器。

**备注**

- 运动器非人为停止后会被移除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
motions = comp.GetCameraMotions()
# motions = {
#   0:1,
#   1:2
# }
```

</TabItem>
</Tabs>

---

### GetCameraOffset

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取摄像机偏移量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCameraOffset() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，偏移量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.GetCameraOffset()
```

</TabItem>
</Tabs>

---

### GetCameraPitchLimit

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取摄像机上下角度限制值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCameraPitchLimit() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，上下角度限制值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.GetCameraPitchLimit()
```

</TabItem>
</Tabs>

---

### GetCameraRotation

<Version type="china" add="2.9"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取摄像机的朝向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCameraRotation() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，朝向，分别代表 Pitch（俯仰角），Yaw（偏航角），Roll（翻滚角）的角度。

**备注**

- 若在使用 [SetCameraRotation](/docs/docs/scripts/modapi/interfaces/player/camera#setcamerarotation) 立马调用该接口，会得到修改前的结果，因为摄像机是在逻辑帧之间插值移动变化的，而不是马上改变。
- 与 F3 显示的相机调试信息的 Pitch、Yaw 相反。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
rot = comp.GetCameraRotation()
```

</TabItem>
</Tabs>

---

### GetForward

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

返回相机向前的方向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetForward() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，向前的方向。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.GetForward()
```

</TabItem>
</Tabs>

---

### GetFov

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取视野大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFov() -> float
```


**返回值**：float，即视频设置中的视野，单位为角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
fov = comp.GetFov()
```

</TabItem>
</Tabs>

---

### GetFpHeight

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取本地玩家当前状态下，第一人称视角时的摄像机高度偏移量。游泳时，滑翔时以及普通状态下会有所不同。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFpHeight() -> float
```


**返回值**：float，高度偏移量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
heightOffset = comp.GetFpHeight()
```

</TabItem>
</Tabs>

---

### GetNearFarPlane

<Version type="china" add="3.10"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取近远裁剪面距离。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetNearFarPlane() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，依次为近裁剪面距离与远裁剪面距离。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
near, far = comp.GetNearFarPlane()
```

</TabItem>
</Tabs>

---

### GetPerspective

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(entityId)`

获取当前的视角模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPerspective() -> int
```


**返回值**：int，0：第一人称视角；1：第三人称视角；2：前视第三人称视角。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(entityId)
persp = comp.GetPerspective()
```

</TabItem>
</Tabs>

---

### GetPosition

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

返回相机中心。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPosition() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，相机中心位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.GetPosition()
```

</TabItem>
</Tabs>

---

### GetProjectionMatrix

<Version type="china" add="3.10"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取当前帧的相机投影矩阵，为标准透视投影矩阵，开发者可自行计算。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetProjectionMatrix(

) -> Tuple[Tuple[float, float, float, float], Tuple[float, float, float, float], Tuple[float, float, float, float], Tuple[float, float, float, float]]
```


**返回值**：Tuple[Tuple[float, float, float, float], Tuple[float, float, float, float], Tuple[float, float, float, float], Tuple[float, float, float, float]]，嵌套 4x4 投影矩阵，外层为行、内层为列，使用 projMat[row][col]访问第 row 行第 col 列元素，若当前不在游戏场景内则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
projMat = comp.GetProjectionMatrix()
# 取出第1行第1列元素（索引从0开始计算）
element = projMat[0][0]
```

</TabItem>
</Tabs>

---

### GetViewMatrix

<Version type="china" add="3.10"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取视图矩阵，为以相机位置为原点的相对空间视图矩阵（右手系），即仅描述相机朝向的旋转矩阵，不含相机位置平移，开发者可自行计算。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetViewMatrix(

) -> Tuple[Tuple[float, float, float, float], Tuple[float, float, float, float], Tuple[float, float, float, float], Tuple[float, float, float, float]]
```


**返回值**：Tuple[Tuple[float, float, float, float], Tuple[float, float, float, float], Tuple[float, float, float, float], Tuple[float, float, float, float]]，嵌套 4x4 视图矩阵，外层为行、内层为列，使用 viewMat[row][col]访问第 row 行第 col 列元素。矩阵为相对相机位置的空间（坐标原点在相机位置），做世界坐标变换时需先减去相机位置（[WorldToScreenPoint](/docs/docs/scripts/modapi/interfaces/player/camera#worldtoscreenpoint) 等已处理），若当前不在游戏场景内则返回 None。

**备注**

- 该矩阵包含玩家完整视角（俯仰/翻滚），与 [GetWorldRayFromScreenPoint](/docs/docs/scripts/modapi/interfaces/player/camera#getworldrayfromscreenpoint) 的射线方向一致；平移列为(0,0,0,1)，属于相对相机位置空间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
viewMat = comp.GetViewMatrix()
# 取出第2行第3列元素（索引从0开始计算）
element = viewMat[1][2]
```

</TabItem>
</Tabs>

---

### GetWorldRayFromScreenPoint

<Version type="china" add="3.10"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

将屏幕坐标转换为一条世界射线，可用于自定义拾取、瞄准辅助等玩法。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetWorldRayFromScreenPoint(screenX: float, screenY: float) -> Dict[str, Any]
```

- screenX: float，屏幕 X 坐标（像素），以屏幕左上角为原点，取值范围为[0,视口宽]，屏幕中心的 X 坐标为视口宽/2。
- screenY: float，屏幕 Y 坐标（像素），以屏幕左上角为原点，取值范围为[0,视口高]，屏幕中心的 Y 坐标为视口高/2。

**返回值**：Dict[str, Any]，射线数据，包含 origin 与 direction 两个键：origin 为射线原点的世界坐标（近平面上的点），类型为 tuple(float,float,float)，对应相机当前所在位置，玩家和相机未移动时该值保持不变；direction 为射线方向的单位向量，类型为 tuple(float,float,float)，长度恒为 1，与玩家当前视角一致。

**备注**

- direction 三个分量取值范围均为[-1,1]，分别表示射线在世界坐标系三个轴上的方向分量：第 1 个元素为 X 分量（正为东，负为西）、第 2 个元素为 Y 分量（正为上，负为下）、第 3 个元素为 Z 分量（正为南，负为北），绝对值越大表示该方向成分越多。
- 屏幕坐标必须使用真实渲染视口坐标（可通过 [GetScreenViewInfo](/docs/docs/scripts/modapi/interfaces/native_ui#getscreenviewinfo) 获取视口宽高）。
- 射线方向与玩家屏幕中看到的画面严格一致：屏幕中心对应的射线即玩家准星瞄准方向，屏幕四角对应的射线分别指向画面的四个角落。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
width, height, _, _ = clientApi.GetEngineCompFactory().CreateGame(levelId).GetScreenViewInfo()
ray = comp.GetWorldRayFromScreenPoint(width / 2, height / 2)
origin = ray['origin']
direction = ray['direction']
```

</TabItem>
</Tabs>

---

### IsModCameraLockPitch

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

是否锁定摄像机上下角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsModCameraLockPitch() -> bool
```


**返回值**：bool，是否锁定。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.IsModCameraLockPitch()
```

</TabItem>
</Tabs>

---

### IsModCameraLockYaw

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

是否锁定摄像机左右角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsModCameraLockYaw() -> bool
```


**返回值**：bool，是否锁定。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.IsModCameraLockYaw()
```

</TabItem>
</Tabs>

---

### LockCamera

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

锁定摄像机。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockCamera(
    lockPos: Tuple[float, float, float],
    lockRot: Tuple[float, float, float],
) -> bool
```

- lockPos: Tuple[float, float, float]，世界坐标。
- lockRot: Tuple[float, float, float]，摄像机的角度（俯仰角,偏航角,横滚角）。

**返回值**：bool，设置是否成功。

**备注**

- 锁定摄像机时只是锁定画面视角，玩家仍然可以移动。
- 该接口的效果会与 departcamera 互相覆盖。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
# 把摄像机固定在(0, 6, 0)，并且30度俯视，朝向世界z轴正方向
comp.LockCamera((0, 6, 0), (30, 0, 0))
```

</TabItem>
</Tabs>

---

### LockModCameraPitch

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

锁定摄像机上下角度（第三人称下生效，锁定后不能上下调整视角）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockModCameraPitch(enable: int) -> bool
```

- enable: int，1:锁定 0:解锁。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.LockModCameraPitch(1)
```

</TabItem>
</Tabs>

---

### LockModCameraYaw

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

锁定摄像机左右角度（第三人称下生效，锁定后不能通过鼠标左右调整视角）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockModCameraYaw(enable: int) -> bool
```

- enable: int，1:锁定 0:解锁。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.LockModCameraYaw(1)
```

</TabItem>
</Tabs>

---

### LockPerspective

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(entityId)`

锁定玩家的视角模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockPerspective(lock: int) -> bool
```

- lock: int，0：第一人称视角；1：第三人称视角；2：前视第三人称视角 其他值：解除锁定。

**返回值**：bool，是否锁定成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(entityId)
comp.LockPerspective(1)
```

</TabItem>
</Tabs>

---

### RemoveCameraMotion

<Version type="china" add="2.5"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

移除相机上的某个运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveCameraMotion(motionId: int) -> bool
```

- motionId: int，要移除的某个运动器的 ID。

**返回值**：bool，是否成功移除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.RemoveCameraMotion(mID)
```

</TabItem>
</Tabs>

---

### ResetCameraBindActorId

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

将摄像机重新绑定回主角身上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetCameraBindActorId() -> bool
```


**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.ResetCameraBindActorId()
```

</TabItem>
</Tabs>

---

### ResetCameraPos

<Version type="china" add="3.8"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

重置相机位置模式，使相机恢复跟随玩家。用于取消 [SetCameraPos](/docs/docs/scripts/modapi/interfaces/player/camera#setcamerapos) 设置的独立相机位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetCameraPos() -> None
```


**返回值**：None，无返回值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
# 先设置相机位置
comp.SetCameraPos((100, 80, 100))
# 之后恢复相机跟随玩家
comp.ResetCameraPos()
```

</TabItem>
</Tabs>

---

### SetCameraAnchor

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

设置相机锚点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCameraAnchor(offset: Tuple[float, float, float]) -> bool
```

- offset: Tuple[float, float, float]，锚点偏移量。

**返回值**：bool，是否设置成功。

**备注**

- (1) 调用了该接口会对第一人称下客户端的交互中心进行同样的偏移，如果需要修改第三人称的交互中心可使用 [SetPickCenterOffset](/docs/docs/scripts/modapi/interfaces/player/behavior#setpickcenteroffset) (2) 在第一人称调高了摄像头会导致交互被撤销，这是由于服务端的交互中心还是在人物的位置，需要使用 [SetInteracteCenterOffset](/docs/docs/scripts/modapi/interfaces/player/behavior#setinteractecenteroffset) 进行修正 (3) 在第一人称调高了摄像头会导致无法交互到地面或者远距离的方块，可以使用 [SetPickRange](/docs/docs/scripts/modapi/interfaces/player/behavior#setpickrange) 修改客户端的交互半径，使用 [SetPlayerInteracteRange](/docs/docs/scripts/modapi/interfaces/player/behavior#setplayerinteracterange) 修改服务端的交互半径.。
- 注：当前客户端能修改交互中心的有 SetCameraAnchor 修改第一人称，[SetPickCenterOffset](/docs/docs/scripts/modapi/interfaces/player/behavior#setpickcenteroffset) 修改第三人称。服务端能使用 [SetInteracteCenterOffset](/docs/docs/scripts/modapi/interfaces/player/behavior#setinteractecenteroffset) 修改玩家交互中心（服务端无第几人称概念）。
- 与 [SetCameraOffset](/docs/docs/scripts/modapi/interfaces/player/camera#setcameraoffset) 不同的是，该接口改变的是相机的轨道的圆心位置。对第一人称和第三人称模式均生效,需要注意的是，改变后，鼠标或者触屏旋转，最终绕该圆心运动，不再绕玩家为中心。可以简单理解为，默认 anchor 为玩家中心。
- 注意，设置后的效果不会存档。
- 注意，如果摄像头进入墙体里面会出现透视的情况，在联机模式时可能会破坏游戏的平衡，请谨慎使用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.SetCameraAnchor((0,1,0))
```

</TabItem>
</Tabs>

---

### SetCameraBindActorId

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

将摄像机绑定到目标实体身上（调用者与目标必须在同一个 dimension，同时需要在加载范围之内，若绑定后目标离开了范围或者死亡，则会自动解除绑定）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCameraBindActorId(targetId: str) -> bool
```

- targetId: str，目标实体 id。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.SetCameraBindActorId('1234')
```

</TabItem>
</Tabs>

---

### SetCameraDistanceFixed

<Version type="china" add="2.8"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

设置相机弹簧臂固定，即设置当相机遇到阻挡时是否压缩与人物之间的距离。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCameraDistanceFixed(isFixed: bool) -> bool
```

- isFixed: bool，是否固定相机距离。

**返回值**：bool，是否设置成功。

**备注**

- 注意，当设置为 True 时，如果摄像头进入墙体里面会出现透视的情况，在联机模式时可能会破坏游戏的平衡，请谨慎使用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.SetCameraDistanceFixed(True)
```

</TabItem>
</Tabs>

---

### SetCameraOffset

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

设置摄像机偏移量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCameraOffset(offset: Tuple[float, float, float]) -> bool
```

- offset: Tuple[float, float, float]，偏移量。

**返回值**：bool，是否设置成功。

**备注**

- 注意，该接口仅改变第三人称的相机（包括前视第三人称和后视第三人称）的偏移量，对第一人称模式下的相机无效。
- 与 [SetCameraAnchor](/docs/docs/scripts/modapi/interfaces/player/camera#setcameraanchor) 不同的是，该接口改变的是相机的位置偏移值，不会对相机轨道的圆心位置进行改变。
- 注意，设置后的效果不会存档。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.SetCameraOffset((1, 1, 1))
```

</TabItem>
</Tabs>

---

### SetCameraPitchLimit

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

设置摄像机上下角度限制值，默认是（-90，90）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCameraPitchLimit(limit: Tuple[float, float]) -> bool
```

- limit: Tuple[float, float]，上下角度限制值。

**返回值**：bool，是否成功。

**备注**

- 注意，设置后的效果不会存档。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.DepartCamera()
comp.SetCameraPitchLimit((-30, 30))
```

</TabItem>
</Tabs>

---

### SetCameraPos

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

设置相机中心的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCameraPos(pos: Tuple[float, float, float]) -> bool
```

- pos: Tuple[float, float, float]，位置。

**返回值**：bool，是否设置成功。

**备注**

- 注意，设置后的效果不会存档。
- 需先调用 [DepartCamera](/docs/docs/scripts/modapi/interfaces/player/camera#departcamera)()接口分离相机，再调用这个接口后相机会自动进入独立位置模式（不跟随玩家），如需恢复相机跟随玩家，请调用 [ResetCameraPos](/docs/docs/scripts/modapi/interfaces/player/camera#resetcamerapos)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.DepartCamera()
comp.SetCameraPos((1, 1, 1))
```

</TabItem>
</Tabs>

---

### SetCameraRotation

<Version type="china" add="2.8"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

设定摄像机的朝向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCameraRotation(rot: Tuple[float, float, float]) -> bool
```

- rot: Tuple[float, float, float]，朝向，其中 3 个值分别代表 Pitch（俯仰角），Yaw（偏航角），Roll（翻滚角）的角度。如果传进来的 tuple 长度为 2，则 Roll（翻滚角）的角度默认为 0。

**返回值**：bool，是否设置成功。

**备注**

- 与 F3 显示的相机调试信息的 Pitch、Yaw 相反。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.SetCameraRotation((1, 1, 1))
```

</TabItem>
</Tabs>

---

### SetFov

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

设置视野大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFov(fov: float) -> bool
```

- fov: float，单位为角度, 范围为[30, 110]，若 fov 小于 30 则设置为 30，，若 fov 大于 110，则设置为 110.。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.SetFov(60)
```

</TabItem>
</Tabs>

---

### SetPerspective

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(entityId)`

设置视角模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPerspective(persp: int) -> bool
```

- persp: int，0：第一人称视角；1：第三人称视角；2：前视第三人称视角。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(entityId)
comp.SetPerspective(1)
```

</TabItem>
</Tabs>

---

### SetPlayerFovScale

<Version type="china" add="3.2"/>

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

将渲染实际使用的 fov 变为设置中的 fov 乘以 fovScale,fovScale 越接近 0，其效果越接近原版望远镜效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerFovScale(fovScale: float) -> bool
```

- fovScale: float，有效范围为[0,100]。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
print(comp.SetPlayerFovScale(0.5))
```

</TabItem>
</Tabs>

---

### SetSpeedFovLock

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

是否锁定相机视野 fov，锁定后不随速度变化而变化。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSpeedFovLock(isLocked: bool) -> Any
```

- isLocked: bool，是否锁定。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.SetSpeedFovLock(True)
```

</TabItem>
</Tabs>

---

### StartCameraMotion

<Version type="china" add="2.5"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

启动相机上的某个运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartCameraMotion(motionId: int) -> bool
```

- motionId: int，要启动的某个运动器的 ID。

**返回值**：bool，是否成功启动。

**备注**

- 启动运动器后相机的位置朝向变化会同步更改 player 的朝向，若要避免修改，可以使用 [DepartCamera](/docs/docs/scripts/modapi/interfaces/player/camera#departcamera) 接口。
- 相机第一人称模式下，屏幕会渲染出 player 的手臂，此时手臂位置与相机位置无关。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.StartCameraMotion(mID)
```

</TabItem>
</Tabs>

---

### StopCameraMotion

<Version type="china" add="2.5"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

停止相机上的某个运动器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopCameraMotion(motionId: int) -> bool
```

- motionId: int，要停止的某个运动器的 ID。

**返回值**：bool，是否成功停止。

**备注**

- 调用该接口不会触发事件 [CameraMotionStopClientEvent](/docs/docs/scripts/modapi/events/player#cameramotionstopclientevent)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.StopCameraMotion(mID)
```

</TabItem>
</Tabs>

---

### UnDepartCamera

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

绑定玩家与摄像机。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnDepartCamera() -> Any
```


**备注**

- 绑定之后，只能看到玩家背部。
- 注意，使用后会默认解除视角移动锁定，效果等同 comp.[LockModCameraYaw](/docs/docs/scripts/modapi/interfaces/player/camera#lockmodcamerayaw)(0) # 解除锁定左右视角 comp.[LockModCameraPitch](/docs/docs/scripts/modapi/interfaces/player/camera#lockmodcamerapitch)(0) # 解除锁定上下视角。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.UnDepartCamera()
```

</TabItem>
</Tabs>

---

### UnLockCamera

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

解除摄像机锁定。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnLockCamera() -> bool
```


**返回值**：bool，设置是否成功。

**备注**

- 注意，使用后会默认解除视角移动锁定，效果等同 comp.[LockModCameraYaw](/docs/docs/scripts/modapi/interfaces/player/camera#lockmodcamerayaw)(0) # 解除锁定左右视角 comp.[LockModCameraPitch](/docs/docs/scripts/modapi/interfaces/player/camera#lockmodcamerapitch)(0) # 解除锁定上下视角。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
comp.UnLockCamera()
```

</TabItem>
</Tabs>

---

### WorldToScreenPoint

<Version type="china" add="3.10"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

将世界坐标转换为屏幕坐标，可用于 UI 指示箭头、血条跟随等玩法。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
WorldToScreenPoint(x: float, y: float, z: float) -> Dict[str, Any]
```

- x: float，世界 X 坐标。
- y: float，世界 Y 坐标。
- z: float，世界 Z 坐标。

**返回值**：Dict[str, Any]，屏幕坐标数据，包含 screenX（屏幕 X 坐标，float）、screenY（屏幕 Y 坐标，float）、depth（归一化深度，float）、isInScreen（是否在屏幕可见范围内，bool）四个键。

**备注**

- 深度（depth）为线性归一化深度，表示世界点距相机的距离按比例映射到[0,1]：近裁剪面处为 0，远裁剪面处为 1，数值越大离相机越远，与距离成线性关系（如 0.5 即表示位于近远裁剪面的正中间位置）。相机背后的点或超出远裁剪面的点，depth 会落在[0,1]之外，此时 isInScreen 为 False。
- 屏幕坐标系以屏幕左上角为原点，单位为像素。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
screenData = comp.WorldToScreenPoint(10, 60, 10)
isInScreen = screenData['isInScreen']
```

</TabItem>
</Tabs>

---
