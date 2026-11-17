---
sidebar_position: 3
---

# 世界

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录世界相关的接口，共 6 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/xunishijie/shijie.html"/>

---

### VirtualWorldCreate

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

创建虚拟世界，虚拟世界只允许存在一个，已经存在虚拟世界的情况下再调用此方法则无效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
VirtualWorldCreate() -> bool
```


**返回值**：bool，是否创建成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.VirtualWorldCreate()
```

</TabItem>
</Tabs>

---

### VirtualWorldDestroy

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

销毁虚拟世界。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
VirtualWorldDestroy() -> bool
```


**返回值**：bool，是否销毁成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.VirtualWorldDestroy()
```

</TabItem>
</Tabs>

---

### VirtualWorldSetCollidersVisible

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置虚拟世界中模型的包围盒是否显示,主要用于调试,默认为不显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
VirtualWorldSetCollidersVisible(isVisible: bool) -> bool
```

- isVisible: bool，是否显示。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.VirtualWorldSetCollidersVisible(True)

id = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetBoxCollider(id, (2.0, 2.0, 2.0), (0.0, 0.0, 0.0))
```

</TabItem>
</Tabs>

---

### VirtualWorldSetSkyBgColor

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置虚拟世界中天空背景的颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
VirtualWorldSetSkyBgColor(color: Tuple[float, float, float]) -> bool
```

- color: Tuple[float, float, float]，颜色的 r,g,b 值，均为 0.0 到 1.0 的浮点值。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
#设置天空为红色
virtualWorldComp.VirtualWorldSetSkyBgColor((1.0, 0.0, 0.0))
```

</TabItem>
</Tabs>

---

### VirtualWorldSetSkyTexture

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置虚拟世界中天空的贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
VirtualWorldSetSkyTexture(texturePath: str, mode: int) -> bool
```

- texturePath: str，贴图路径。
- mode: int，拉伸模式，0 或 1。0 代表贴图宽高都拉伸至全屏，可能造成贴图变形；1 代表高度拉伸至全屏，宽度按贴图原宽高比进行相应缩放，能保持贴图不被拉伸，但会造成贴图超出屏幕或不完全铺满屏幕。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.VirtualWorldSetSkyTexture("textures/virtualWorldSky", 0)
```

</TabItem>
</Tabs>

---

### VirtualWorldToggleVisibility

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置虚拟世界是否显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
VirtualWorldToggleVisibility(isVisible: bool) -> bool
```

- isVisible: bool，是否显示。

**返回值**：bool，是否设置成功。

**备注**

- 建议在需要频繁在主世界跟虚拟世界切换的时候使用该方法，若后续长时间不需要使用虚拟世界，建议调用 [VirtualWorldDestroy](/docs/docs/scripts/modapi/interfaces/virtual_world/world#virtualworlddestroy) 进行销毁释放资源。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.VirtualWorldToggleVisibility(False)
```

</TabItem>
</Tabs>

---
