---
sidebar_position: 2
---

# 镜头效果

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录镜头效果相关的接口，共 13 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/houchuli/jingtouxiaoguo.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### CheckDepthOfFieldEnabled

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

检测是否开启了景深效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CheckDepthOfFieldEnabled() -> bool
```


**返回值**：bool，True 为已开启，False 为已关闭。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.CheckDepthOfFieldEnabled()
```

</TabItem>
</Tabs>

---

### CheckLensStainEnabled

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

检测是否开启了镜头污迹效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CheckLensStainEnabled() -> bool
```


**返回值**：bool，True 为已开启，False 为已关闭。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.CheckLensStainEnabled()
```

</TabItem>
</Tabs>

---

### ResetLensStainTexture

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

重置污迹效果使用的贴图为系统默认贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetLensStainTexture() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.ResetLensStainTexture()
```

</TabItem>
</Tabs>

---

### SetDepthOfFieldBlurRadius

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整景深效果模糊半径，模糊半径越大，模糊程度越大，反之则越小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDepthOfFieldBlurRadius(radius: float) -> bool
```

- radius: float，模糊半径值大小，值的范围为[0,5]，小于或大于这个范围的值将被截取为边界值 0 或 5。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整模糊半径值为0.3
comp.SetDepthOfFieldBlurRadius(0.3)
```

</TabItem>
</Tabs>

---

### SetDepthOfFieldFarBlurScale

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整景深效果远景模糊大小，远景模糊大小越大，远景的模糊程度越大，反之则越小。注意，远景模糊程度的调节依赖于焦点距离，如果焦点处于较近的距离，那么此时远景处于较清晰的状态，模糊程度大小调节不会很明显。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDepthOfFieldFarBlurScale(scale: float) -> bool
```

- scale: float，远景模糊大小，值的范围为[0,15]，小于或大于这个范围的值将被截取为边界值 0 或 15。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整远景模糊大小值为1.0
comp.SetDepthOfFieldFarBlurScale(1.0)
```

</TabItem>
</Tabs>

---

### SetDepthOfFieldFocusDistance

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整景深效果焦点距离，距离越小，则远处模糊，近处清晰；距离越大，则远处清晰，近处模糊。该距离为实际距离，即以玩家相机为起点的世界坐标距离。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDepthOfFieldFocusDistance(distance: float) -> bool
```

- distance: float，焦点距离值大小，值的范围为[0,100]，小于或大于这个范围的值将被截取为边界值 0 或 100。距离值接近 100 时将被视为无限远的远景。

**返回值**：bool，设置是否成功。

**备注**

- 如果想要较好地确认聚焦平面的位置，可以先使用 [SetDepthOfFieldNearBlurScale](/docs/docs/scripts/modapi/interfaces/post_process/lens#setdepthoffieldnearblurscale) 以及 [SetDepthOfFieldFarBlurScale](/docs/docs/scripts/modapi/interfaces/post_process/lens#setdepthoffieldfarblurscale) 将近景模糊大小和远景模糊大小均设置到最大值，此时只有聚焦平面所在的区域显得清晰，这样可以较为直观的看到聚焦平面的位置，从而方便地调节聚焦平面距离。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整焦点距离值为4，即聚焦在距离玩家4个方块边长的位置上
comp.SetDepthOfFieldFocusDistance(4)
```

</TabItem>
</Tabs>

---

### SetDepthOfFieldNearBlurScale

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整景深效果近景模糊大小，近景模糊大小越大，近景的模糊程度越大，反之则越小。注意，近景模糊程度的调节依赖于焦点距离，如果焦点处于较近的距离，那么此时近景处于较清晰的状态，模糊程度大小调节不会很明显。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDepthOfFieldNearBlurScale(scale: float) -> bool
```

- scale: float，近景模糊大小，值的范围为[0,15]，小于或大于这个范围的值将被截取为边界值 0 或 15。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整近景模糊大小值为1.0
comp.SetDepthOfFieldNearBlurScale(1.0)
```

</TabItem>
</Tabs>

---

### SetDepthOfFieldUseCenterFocus

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置景深效果是否开启屏幕中心聚焦模式，开启后聚焦距离将被自动设置为屏幕中心所对应的物体所在的距离。在第一人称视角下，聚焦距离将被自动设置为屏幕准心所对应的物体与相机的距离，即自动聚焦准心所对应的物体。在第三人称视角下，由于屏幕中心总是对应着玩家，因此聚焦距离将被自动设置为玩家与相机的距离，即自动聚焦在玩家自己。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDepthOfFieldUseCenterFocus(enable: bool) -> bool
```

- enable: bool，是否开启景深效果屏幕中心聚焦模式，True 为开启，False 为关闭。开启后，原有的焦点距离设置将不再有效，接口 [SetDepthOfFieldFocusDistance](/docs/docs/scripts/modapi/interfaces/post_process/lens#setdepthoffieldfocusdistance) 也将失效。

**返回值**：bool，设置是否成功。

**备注**

- 同样，如果想要较好地确认聚焦点所在的位置，可以先使用 [SetDepthOfFieldNearBlurScale](/docs/docs/scripts/modapi/interfaces/post_process/lens#setdepthoffieldnearblurscale) 以及 [SetDepthOfFieldFarBlurScale](/docs/docs/scripts/modapi/interfaces/post_process/lens#setdepthoffieldfarblurscale) 将近景模糊大小和远景模糊大小均设置到最大值，此时只有聚焦平面所在的区域显得清晰，这样可以较为直观的看到聚焦平面的位置，从而方便地调节聚焦平面距离。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 开启屏幕中心聚焦模式
comp.SetDepthOfFieldUseCenterFocus(True)
```

</TabItem>
</Tabs>

---

### SetEnableDepthOfField

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置是否开启景深效果，开启后屏幕出现景深效果，根据焦点距离呈现远处模糊近处清晰或者近处模糊远处清晰的效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEnableDepthOfField(enable: bool) -> bool
```

- enable: bool，是否开启景深效果，True 为开启，False 为关闭。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.SetEnableDepthOfField(True)
```

</TabItem>
</Tabs>

---

### SetEnableLensStain

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置是否开启镜头污迹效果，开启后镜头出现污迹效果，可改变使用的污迹贴图及污迹颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEnableLensStain(enable: bool) -> bool
```

- enable: bool，是否开启镜头污迹效果，True 为开启，False 为关闭。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.SetEnableLensStain(True)
```

</TabItem>
</Tabs>

---

### SetLensStainColor

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整镜头污迹颜色，根据输入的颜色和强度来调整污迹色彩，当强度越大时，污迹颜色越偏向输入的颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLensStainColor(intensity: float, color: Tuple[float, float, float]) -> bool
```

- intensity: float，颜色强度，值的范围为[0,1]，小于或大于这个范围的值将被截取为边界值 0 或 1。
- color: Tuple[float, float, float]，颜色值，按顺序分别为颜色的 RGB 值，值的范围为[0,255]，小于或大于这个范围的值将被截取为边界值 0 或 255。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整镜头污迹颜色为偏红色，强度为0.3
comp.SetLensStainColor(0.3, (255,0,0))
```

</TabItem>
</Tabs>

---

### SetLensStainIntensity

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整镜头污迹强度，强度越大，污迹越明显，反之则越透明。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLensStainIntensity(intensity: float) -> bool
```

- intensity: float，镜头污迹强度值大小，值的范围为[0,1]，小于或大于这个范围的值将被截取为边界值 0 或 1。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整污迹强度值为0.4
comp.SetLensStainIntensity(0.4)
```

</TabItem>
</Tabs>

---

### SetLensStainTexture

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

开启镜头污迹效果后，污迹效果使用的为系统默认贴图。该接口可改变镜头污迹所使用的贴图。注意贴图最好使用透明背景，否则屏幕将被贴图覆盖。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLensStainTexture(texturePath: str) -> bool
```

- texturePath: str，贴图的相对路径，以“textures/"开头，不需要后缀名。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 改变污迹贴图为textures/postprocess目录下的my_dirtiness.png。
comp.SetLensStainTexture("textures/postprocess/my_dirtiness")
```

</TabItem>
</Tabs>

---
