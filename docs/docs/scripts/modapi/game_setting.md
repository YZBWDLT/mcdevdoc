---
sidebar_position: 17
---

# 游戏设置

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录游戏设置相关的接口，共 13 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/youxishezhi.html"/>

---

### GetControllerLayout

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

获取玩家控制器绑定映射。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetControllerLayout(layoutType: int) -> Dict[str, Any]
```

- layoutType: int，选择获取的控制器映射类型，0 为键盘鼠标，1 为游戏手柄。

**返回值**：Dict[str, Any]，按键映射字典，操作名：按键枚举值，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)和[KeyBoardType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/KeyBoardType.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
comp.GetControllerLayout(1) #获取手柄的绑定映射
```

</TabItem>
</Tabs>

---

### GetGamepadKeyMappings

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

获取自定义手柄按键映射。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetGamepadKeyMappings(name: str) -> int
```

- name: str，按键名称。

**返回值**：int，当前映射的手柄按键码，如果未找到返回 0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
# 获取冲刺键的当前手柄按键映射
keyCode = comp.GetGamepadKeyMappings("sprint")
print("当前冲刺手柄按键码:", keyCode)
```

</TabItem>
</Tabs>

---

### GetKeyMappings

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

获取指定的自定义按键映射配置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetKeyMappings(name: str) -> int
```

- name: str，按键名称。

**返回值**：int，返回当前键码，如果未找到则返回 0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
keyCode = comp.GetKeyMappings("sprint")
print("当前冲刺键码:", keyCode)
```

</TabItem>
</Tabs>

---

### GetSliderOption

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

获得某个滑动条设置选项的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSliderOption(optionId: str) -> float
```

- optionId: str，[SliderOptionId 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/SliderOptionId.html)。

**返回值**：float，-1：类型不支持；返回值范围详见[SliderOptionId 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/SliderOptionId.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
print(comp.GetSliderOption(clientApi.GetMinecraftEnum().SliderOptionId.MOUSE_SENSITIVITY))
```

</TabItem>
</Tabs>

---

### GetToggleOption

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

获得某个开关设置值的接口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetToggleOption(optionId: str) -> int
```

- optionId: str，[OptionId 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/OptionId.html)。

**返回值**：int，-1：类型不支持；0：开关关闭；1: 开关打开；

**备注**

- 选择 INPUT_MODE 时，返回值为 InputMode 枚举。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
print(comp.GetToggleOption(clientApi.GetMinecraftEnum().OptionId.HIDE_PAPERDOLL))
```

</TabItem>
</Tabs>

---

### GetUIProfile

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

获取"UI 档案"模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUIProfile() -> int
```


**返回值**：int，0 表示经典模式，1 表示 Pocket 模式。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
profile = comp.GetUIProfile()
```

</TabItem>
</Tabs>

---

### HighlightBoxSelection

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

镜头移动时高亮当前视角中心所指的方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HighlightBoxSelection(isHighlight: bool) -> Any
```

- isHighlight: bool，是否高亮，True 为高亮，False 为不高亮，默认为不高亮。

**备注**

- 功能实现上面其实是 设置->视频->轮廓 这一设置的一层代码封装，但不会影响到原本轮廓设置的值，可在开启轮廓选择的情况下，用此接口开关高亮效果，如果在游戏中已经关闭了轮廓选择，则方块只会高亮显示。
- 重启后设置失效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
#设置为高亮
comp.HighlightBoxSelection(True)
```

</TabItem>
</Tabs>

---

### RegisterCustomGamepadMapping

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

注册自定义手柄按键映射。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterCustomGamepadMapping(name: str, key: int, category: str) -> bool
```

- name: str，按键名称。
- key: int，默认手柄按键码。
- category: str，按键分类。

**返回值**：bool，是否注册成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
# 注册一个冲刺键的手柄映射，默认为按键1
success = comp.RegisterCustomGamepadMapping("sprint", 1, "movement")
print("注册结果:", success)
```

</TabItem>
</Tabs>

---

### RegisterCustomKeyMapping

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

注册自定义按键映射。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterCustomKeyMapping(name: str, key: int, category: str) -> bool
```

- name: str，按键名称。
- key: int，默认键码，详见[KeyBoardType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/KeyBoardType.html)。
- category: str，按键分类。

**返回值**：bool，是否注册成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
# 注册一个冲刺键，默认为空格键(32)
success = comp.RegisterCustomKeyMapping("sprint", 32, "movement")
print("注册结果:", success)
```

</TabItem>
</Tabs>

---

### SetSliderOption

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

设置某个滑动条设置选项的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSliderOption(optionId: str, value: float) -> bool
```

- optionId: str，[SliderOptionId 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/SliderOptionId.html)。
- value: float，值范围详见[SliderOptionId 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/SliderOptionId.html)。

**返回值**：bool，是否设置成功。

**备注**

- 该设置全局生效，在一个存档中修改此项设置后，进入另一个存档后该设置也会保留生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
print(comp.SetSliderOption(clientApi.GetMinecraftEnum().SliderOptionId.MOUSE_SENSITIVITY, 0.5))
```

</TabItem>
</Tabs>

---

### SetSplitControlCanChange

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

设置是否允许使用准星瞄准按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSplitControlCanChange(canChange: bool) -> bool
```

- canChange: bool，是否允许。

**返回值**：bool，是否设置成功。

**备注**

- 该设置全局生效，在一个存档中修改此项设置后，进入另一个存档后该设置也会保留生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
print(comp.SetSplitControlCanChange(True))
```

</TabItem>
</Tabs>

---

### SetToggleOption

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

修改开关型设置的接口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetToggleOption(optionId: str, isOn: bool) -> bool
```

- optionId: str，[OptionId 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/OptionId.html)。
- isOn: bool，是否打开开关，True 为开，False 为关。

**返回值**：bool，是否设置成功。

**备注**

- GRAPHICS 选项已不支持通过此接口修改。
- INPUT_MODE 为控制器模式，不支持设置。
- “花俏的树叶”开关修改后，已渲染的树叶并不会立刻变化，需要对应区块变化或者周围方块变化时，树叶方块才会有变化。
- “渲染云”开关开启后，需要在“美丽的天空”开关也开启的情况下，天空中才会渲染出云层。
- 该设置全局生效，在一个存档中修改此项设置后，进入另一个存档后该设置也会保留生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
#设置隐藏纸娃娃选项为打开
print(comp.SetToggleOption(clientApi.GetMinecraftEnum().OptionId.HIDE_PAPERDOLL, True))
```

</TabItem>
</Tabs>

---

### SetUIProfile

<Client/> PlayerViewCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerView(levelId)`

设置"UI 档案"模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetUIProfile(profileType: int) -> bool
```

- profileType: int，0 表示经典模式，1 表示 Pocket 模式。

**返回值**：bool，是否设置成功。

**备注**

- 该设置全局生效，在一个存档中修改此项设置后，进入另一个存档后该设置也会保留生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerView(levelId)
#设置为Pocket模式
print(comp.SetUIProfile(1))
```

</TabItem>
</Tabs>

---
