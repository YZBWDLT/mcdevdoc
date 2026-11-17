---
sidebar_position: 6
---

# 序列帧

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录序列帧相关的接口，共 21 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/texiao/xuliezhen.html"/>

---

### Bind

<Client/> FrameAniSkeletonBindComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniEntityBind(frameEntityId)`

绑定 entity。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Bind(
    bindEntityId: str,
    offset: Tuple[float, float, float],
    rot: Tuple[float, float, float],
) -> bool
```

- bindEntityId: str，绑定的 entity 的 ID。
- offset: Tuple[float, float, float]，绑定的偏移量。
- rot: Tuple[float, float, float]，绑定的旋转角度。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniEntityBind(frameEntityId)
comp.Bind(entityId, (0, 1, 0), (0, 0, 0))
```

</TabItem>
</Tabs>

---

### CreateEngineSfx

<Client/> ClientSystem

系统方法，在自定义 System 类中直接调用。

创建序列帧特效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateEngineSfx(
    path: str,
    pos: Tuple[float, float, float],
    rot: Tuple[float, float, float],
    scale: Tuple[float, float, float],
) -> Optional[int]
```

- path: str，特效资源路径，不用后缀名。
- pos: Tuple[float, float, float]，创建位置，可选，没传则可以创建完用 frameAniTrans 组件设置。
- rot: Tuple[float, float, float]，角度，可选，没传则可以创建完用 frameAniTrans 组件设置。
- scale: Tuple[float, float, float]，缩放系数，可选，没传则可以创建完用 frameAniTrans 组件设置。

**返回值**：Optional[int]，frameEntityId 或者 None。

**备注**

- 创建序列帧后，可以用返回的 frameEntityId 创建序列帧分类中的相关组件，设置所需属性，以实现各种表现效果。
- 切换维度后会自动隐藏非本维度创建的而且没有绑定实体的序列帧, 回到该维度后会自动重新显示。
- 需要注意，序列帧创建之后需要调用 frameAniControl 组件的 play 函数才会播放,如果播放非本维度创建的序列帧,会同时修改该序列帧的创建维度为当前维度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
class MyClientSystem(ClientSystem):
    # 创建
    def createSfx(self):
        frameEntityId = self.CreateEngineSfx("textures/sfxs/snow_3")
        frameAniTransComp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
        frameAniTransComp.SetPos((10,10,10))
        frameAniTransComp.SetRot((0,0,0))
        frameAniTransComp.SetScale((1,1,1))
        frameAniControlComp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
        frameAniControlComp.Play()

    # 删除
    def removeSfx(self, frameEntityId):
        self.DestroyEntity(frameEntityId)
```

</TabItem>
</Tabs>

---

### CreateEngineSfxFromEditor

<Client/> ClientSystem

系统方法，在自定义 System 类中直接调用。

指使用资源包中 effects/xxx.json，按照编辑器中编辑好的参数创建序列帧。支持环状序列帧。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateEngineSfxFromEditor(
    path: str,
    pos: Tuple[float, float, float],
    rot: Tuple[float, float, float],
    scale: Tuple[float, float, float],
) -> Optional[int]
```

- path: str，特效配置路径，需要为"effects/xxx.json"，"xxx"为编辑器创建序列帧时填写的名称。
- pos: Tuple[float, float, float]，创建位置，可选，没传则可以创建完用 frameAniTrans 组件设置，一般需要设置播放的位置。
- rot: Tuple[float, float, float]，角度，可选，没传则可以创建完用 frameAniTrans 组件设置。
- scale: Tuple[float, float, float]，缩放系数，可选，没传则可以创建完用 frameAniTrans 组件设置。

**返回值**：Optional[int]，frameEntityId 或者 None。

**备注**

- 创建序列帧后，可以用返回的 frameEntityId 创建序列帧分类中的相关组件，设置所需属性，以实现各种表现效果。
- 需要注意，序列帧创建之后需要调用 frameAniControl 组件的 play 函数才会播放。
- 根据 editor 配置生成序列帧后还需要设置位置或绑定，以及进行播放。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
class MyClientSystem(ClientSystem):
    # 创建
    def createSfxFromEditor(self):
        frameEntityId = self.CreateEngineSfxFromEditor("effects/mySfx.json")
        frameAniTransComp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
        frameAniTransComp.SetPos((10,10,10))
        frameAniTransComp.SetRot((0,0,0))
        frameAniTransComp.SetScale((1,1,1))
        frameAniControlComp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
        frameAniControlComp.Play()

    # 删除
    def removeSfx(self, frameEntityId):
        self.DestroyEntity(frameEntityId)
```

</TabItem>
</Tabs>

---

### GetPos

<Client/> FrameAniTransComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)`

获取序列帧特效的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPos() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，返回序列帧特效的世界坐标位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
comp.GetPos()
```

</TabItem>
</Tabs>

---

### GetRot

<Client/> FrameAniTransComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)`

获取序列帧特效的旋转角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRot() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，返回序列帧特效的旋转角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
comp.GetRot()
```

</TabItem>
</Tabs>

---

### GetScale

<Client/> FrameAniTransComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)`

获取序列帧特效的缩放值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetScale() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，返回序列帧特效的缩放值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
comp.GetScale()
```

</TabItem>
</Tabs>

---

### Pause

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

暂停播放，序列帧定格在当前时刻，再次调用 [Play](/docs/docs/scripts/modapi/interfaces/effect/particle#play) 时继续播放。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Pause() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
comp.Pause()
```

</TabItem>
</Tabs>

---

### Play

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

播放序列帧。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Play() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
comp.Play()
```

</TabItem>
</Tabs>

---

### SetDeepTest

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

设置序列帧是否透视，默认为否。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDeepTest(deepTest: bool) -> bool
```

- deepTest: bool，False 表示透视，则被物体/方块阻挡时仍然能看到序列帧。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
# 设置为透视
comp.SetDeepTest(False)
```

</TabItem>
</Tabs>

---

### SetFaceCamera

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

设置序列帧是否始终朝向摄像机，默认为是。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFaceCamera(face: bool) -> bool
```

- face: bool，True 表示朝摄像机。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
# 设置为不始终朝摄像机
comp.SetFaceCamera(False)
```

</TabItem>
</Tabs>

---

### SetFadeDistance

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

设置序列帧开始自动调整透明度的距离。序列帧与摄像机之间的距离小于该值时会自动调整序列帧的透明度，距离摄像机越近，序列帧越透明。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFadeDistance(fadeDistance: float) -> bool
```

- fadeDistance: float，自动调整透明度的距离，应为正数，负数将视作零来处理。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
# 设置该序列帧在与相机距离小于3时会自动调整透明度
comp.SetFadeDistance(3)
```

</TabItem>
</Tabs>

---

### SetGlobal

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

设置序列帧是否是全局的，默认为否。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetGlobal(isGlobal: bool) -> bool
```

- isGlobal: bool，True 为全局，False 为非全局。

**返回值**：bool，设置是否成功。

**备注**

- 全局时，不会因摄像机的视野范围而被裁剪。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
comp.SetGlobal(True)
```

</TabItem>
</Tabs>

---

### SetLayer

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

设置序列帧渲染层级，默认层级为 1，当层级不为 1 时表示该特效开启特效分层渲染功能。特效（粒子和帧动画）分层渲染时，层级越高渲染越靠后，层级大的会遮挡层级低的，且同一层级的特效会根据特效的相对位置产生正确的相互遮挡关系。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLayer(layer: int) -> bool
```

- layer: int，粒子渲染层级，总共包含 0-15 的层级。

**返回值**：bool，设置是否成功。

**备注**

- 该接口只针对序列帧进行设置，粒子特效请使用 particleControl 组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
# 设置为渲染层级为2
comp.SetLayer(2)
```

</TabItem>
</Tabs>

---

### SetLoop

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

设置序列帧是否循环播放，默认为否。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLoop(loop: bool) -> bool
```

- loop: bool，True 表示循环播放。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
# 设置为循环播放
comp.SetLoop(True)
```

</TabItem>
</Tabs>

---

### SetMixColor

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

设置序列帧混合颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMixColor(color: Tuple[float, float, float, float]) -> bool
```

- color: Tuple[float, float, float, float]，颜色的 RGBA 值，范围 0-1。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
# 设置颜色为红色半透明
color = (1, 0, 0, 0.5)
comp.SetMixColor(color)
```

</TabItem>
</Tabs>

---

### SetPos

<Client/> FrameAniTransComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)`

设置序列帧的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPos(pos: Tuple[float, float, float]) -> bool
```

- pos: Tuple[float, float, float]，世界坐标。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
comp.SetPos((0, 5, 0))
```

</TabItem>
</Tabs>

---

### SetRot

<Client/> FrameAniTransComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)`

设置序列帧的旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRot(rot: Tuple[float, float, float]) -> bool
```

- rot: Tuple[float, float, float]，按顺序绕局部坐标系的+x，-y，+z 轴旋转的角度。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
# 绕y轴旋转90度，然后绕z轴旋转90度
comp.SetRot((0, 90, 90))
```

</TabItem>
</Tabs>

---

### SetRotUseZXY

<Client/> FrameAniTransComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)`

设置序列帧的旋转，旋转顺序按照绕 z,x,y 轴旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRotUseZXY(rot: Tuple[float, float, float]) -> bool
```

- rot: Tuple[float, float, float]，绕局部坐标系的+z，+x，+y 轴旋转的角度，旋转顺序按照绕 z,x,y 轴旋转。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
# 绕z轴旋转90度，然后绕y轴旋转90度
comp.SetRotUseZXY((0, 90, 90))
```

</TabItem>
</Tabs>

---

### SetScale

<Client/> FrameAniTransComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)`

设置序列帧的缩放。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetScale(scale: Tuple[float, float, float]) -> bool
```

- scale: Tuple[float, float, float]，对于平面序列帧，第一个参数为贴图横向上的缩放，第二个参数为纵向上的缩放，第三个参数无用。对于环状序列帧，为三个坐标轴上的缩放。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
# 横向拉伸为2倍，纵向不变
comp.SetScale((2, 1, 1))
```

</TabItem>
</Tabs>

---

### SetUsePointFiltering

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

设置序列帧是否使用点滤波。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetUsePointFiltering(use: bool) -> bool
```

- use: bool，True 为使用点滤波，False 为使用双线性插值（默认使用）。

**返回值**：bool，设置是否成功。

**备注**

- 使用点滤波的图像通常边缘清晰、可能会有较强烈的锯齿感；使用双线性插值的图像通常比较平滑、可能会使图像一定程度上变得模糊。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
# 设置该序列帧使用点滤波
comp.SetUsePointFiltering(True)
```

</TabItem>
</Tabs>

---

### Stop

<Client/> FrameAniControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)`

停止序列帧（不是暂停）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Stop() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
comp.Stop()
```

</TabItem>
</Tabs>

---
