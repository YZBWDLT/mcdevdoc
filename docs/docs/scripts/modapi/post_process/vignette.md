---
sidebar_position: 1
---

# 渐晕

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录渐晕相关的接口，共 6 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/houchuli/jianyun.html"/>

---

### CheckVignetteEnabled

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

检测是否开启了屏幕渐晕（Vignette）效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CheckVignetteEnabled() -> bool
```


**返回值**：bool，True 为已开启，False 为已关闭。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.CheckVignetteEnabled()
```

</TabItem>
</Tabs>

---

### SetEnableVignette

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置是否开启屏幕渐晕（Vignette）效果，开启后玩家屏幕周围将出现渐晕，可通过 Vignette 其他接口设置效果参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEnableVignette(enable: bool) -> bool
```

- enable: bool，是否开启 Vignette 效果，True 为开启，False 为关闭。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.SetEnableVignette(True)
```

</TabItem>
</Tabs>

---

### SetVignetteCenter

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置渐晕（Vignette）的渐晕中心位置，可改变屏幕渐晕的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetVignetteCenter(center: Tuple[float, float]) -> bool
```

- center: Tuple[float, float]，按顺序分别为屏幕位置的 x 及 y 值。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整渐晕中心位置为屏幕中心
comp.SetVignetteCenter((0.5,0.5))
```

</TabItem>
</Tabs>

---

### SetVignetteRGB

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置渐晕（Vignette）的渐晕颜色，可改变屏幕渐晕的颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetVignetteRGB(color: Tuple[float, float, float]) -> bool
```

- color: Tuple[float, float, float]，按顺序分别为颜色的 RGB 值，值的范围为[0,255]，小于或大于这个范围的值将被截取为边界值 0 或 255。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 设置颜色的值为红色。
comp.SetVignetteRGB((255,0,0))
```

</TabItem>
</Tabs>

---

### SetVignetteRadius

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置渐晕（Vignette）的渐晕半径，半径越大，渐晕越小，玩家的视野范围越大。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetVignetteRadius(radius: float) -> bool
```

- radius: float，渐晕半径大小，值的范围为[0,1]，小于或大于这个范围的值将被截取为边界值 0 或 1。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整渐晕半径为0.5
comp.SetVignetteRadius(0.5)
```

</TabItem>
</Tabs>

---

### SetVignetteSmoothness

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置渐晕（Vignette）的渐晕模糊系数，模糊系数越大，则渐晕边缘越模糊，模糊的范围也越大。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetVignetteSmoothness(radius: float) -> bool
```

- radius: float，渐晕模糊系数，值的范围为[0,1]，小于或大于这个范围的值将被截取为边界值 0 或 1。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整渐晕模糊系数为0.5
comp.SetVignetteSmoothness(0.5)
```

</TabItem>
</Tabs>

---
