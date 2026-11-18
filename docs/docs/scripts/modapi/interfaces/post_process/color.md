---
sidebar_position: 4
---

# 色彩

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录色彩相关的接口，共 6 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/houchuli/secai.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### CheckColorAdjustmentEnabled

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

检测是否开启了色彩校正效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CheckColorAdjustmentEnabled() -> bool
```


**返回值**：bool，True 为已开启，False 为已关闭。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.CheckColorAdjustmentEnabled()
```

</TabItem>
</Tabs>

---

### SetColorAdjustmentBrightness

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整屏幕色彩亮度，亮度值越大，屏幕越亮，反之则越暗。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetColorAdjustmentBrightness(brightness: float) -> bool
```

- brightness: float，亮度值大小，值的范围为[0,5]，小于或大于这个范围的值将被截取为边界值 0 或 5。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整亮度值为3
comp.SetColorAdjustmentBrightness(3)
```

</TabItem>
</Tabs>

---

### SetColorAdjustmentContrast

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整屏幕色彩对比度，屏幕对比度值越大，色彩差异则越明显，反之则色彩差异越小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetColorAdjustmentContrast(contrast: float) -> bool
```

- contrast: float，对比度值大小，值的范围为[0,5]，小于或大于这个范围的值将被截取为边界值 0 或 5。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整对比度值为3
comp.SetColorAdjustmentContrast(3)
```

</TabItem>
</Tabs>

---

### SetColorAdjustmentSaturation

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整屏幕色彩饱和度，屏幕饱和度值越大，色彩则越明显，反之则越灰暗。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetColorAdjustmentSaturation(saturation: float) -> bool
```

- saturation: float，饱和度值大小，值的范围为[0,5]，小于或大于这个范围的值将被截取为边界值 0 或 5。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整饱和度值为3
comp.SetColorAdjustmentSaturation(3)
```

</TabItem>
</Tabs>

---

### SetColorAdjustmentTint

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

调整屏幕色彩的色调，根据输入的色调和强度来调整屏幕色彩，当强度越大时，屏幕整体颜色越偏向输入的色调。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetColorAdjustmentTint(
    intensity: float,
    color: Tuple[float, float, float],
) -> bool
```

- intensity: float，色调强度，值的范围为[0,1]，小于或大于这个范围的值将被截取为边界值 0 或 1。
- color: Tuple[float, float, float]，色调值，按顺序分别为颜色的 RGB 值，值的范围为[0,255]，小于或大于这个范围的值将被截取为边界值 0 或 255。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整屏幕色调为偏红色，强度为0.3
comp.SetColorAdjustmentTint(0.3, (255,0,0))
```

</TabItem>
</Tabs>

---

### SetEnableColorAdjustment

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置是否开启色彩校正效果，开启后可进行屏幕色彩调整，可通过色彩校正效果其他接口设置效果参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEnableColorAdjustment(enable: bool) -> bool
```

- enable: bool，是否开启色彩校正效果，True 为开启，False 为关闭。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.SetEnableColorAdjustment(True)
```

</TabItem>
</Tabs>

---
