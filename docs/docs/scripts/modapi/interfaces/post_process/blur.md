---
sidebar_position: 3
---

# 模糊

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录模糊相关的接口，共 3 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/houchuli/mohu.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### CheckGaussianBlurEnabled

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

检测是否开启了高斯模糊效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CheckGaussianBlurEnabled() -> bool
```


**返回值**：bool，True 为已开启，False 为已关闭。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.CheckGaussianBlurEnabled()
```

</TabItem>
</Tabs>

---

### SetEnableGaussianBlur

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置是否开启高斯模糊效果，开启后玩家屏幕周围被模糊，可通过高斯模糊其他接口设置效果参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEnableGaussianBlur(enable: bool) -> bool
```

- enable: bool，是否开启高斯模糊效果，True 为开启，False 为关闭。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
comp.SetEnableGaussianBlur(True)
```

</TabItem>
</Tabs>

---

### SetGaussianBlurRadius

<Version type="china" add="1.25"/>

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置高斯模糊效果的模糊半径，半径越大，模糊程度越大，反之则模糊程度越小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetGaussianBlurRadius(radius: float) -> bool
```

- radius: float，模糊半径大小，值的范围为[0,10]，小于或大于这个范围的值将被截取为边界值 0 或 10。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 调整高斯模糊半径为3
comp.SetGaussianBlurRadius(3)
```

</TabItem>
</Tabs>

---
