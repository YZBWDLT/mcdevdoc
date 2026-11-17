---
sidebar_position: 6
---

# 控制

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录控制相关的事件，共 23 个。监听方式见[事件工作机制](/docs/docs/scripts/modapi/overview#事件)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/kongzhi.html"/>

---

### ClientJumpButtonPressDownEvent

<Client/>

跳跃按钮按下事件，返回值设置参数只对当次按下事件起作用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientJumpButtonPressDownEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| continueJump | bool | 设置是否执行跳跃逻辑。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "ClientJumpButtonPressDownEvent",
            self, self.OnClientJumpButtonPressDownEvent)

    def OnClientJumpButtonPressDownEvent(self, args):
        continueJump = args["continueJump"]
```

</TabItem>
</Tabs>

---

### ClientJumpButtonReleaseEvent

<Client/>

跳跃按钮按下释放事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientJumpButtonReleaseEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "ClientJumpButtonReleaseEvent",
            self, self.OnClientJumpButtonReleaseEvent)

    def OnClientJumpButtonReleaseEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### GetEntityByCoordEvent

<Client/>

玩家点击屏幕时触发，多个手指点在屏幕上时，只有第一个会触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnGetEntityByCoordEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "GetEntityByCoordEvent",
            self, self.OnGetEntityByCoordEvent)

    def OnGetEntityByCoordEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### GetEntityByCoordReleaseClientEvent

<Client/>

玩家点击屏幕后松开时触发，多个手指点在屏幕上时，只有最后一个手指松开时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnGetEntityByCoordReleaseClientEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "GetEntityByCoordReleaseClientEvent",
            self, self.OnGetEntityByCoordReleaseClientEvent)

    def OnGetEntityByCoordReleaseClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### GyroSensorChangedClientEvent

<Client/>

触发时机：陀螺仪传感器姿态发生变化时。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnGyroSensorChangedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| xDiff | float | x 轴角速度，单位为弧度/s。 |
| yDiff | float | y 轴角速度，单位为弧度/s。 |
| zDiff | float | z 轴角速度，单位为弧度/s。 |
| orientation | int | 当前屏幕朝向,0 竖屏正向 1 横屏向左 2 竖屏倒置 3 横屏向右。 |
| timestamp | float | 触发时间戳,秒。 |

**备注**

- 该事件只适用于移动端。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "GyroSensorChangedClientEvent",
            self, self.OnGyroSensorChangedClientEvent)

    def OnGyroSensorChangedClientEvent(self, args):
        xDiff = args["xDiff"]
        yDiff = args["yDiff"]
        zDiff = args["zDiff"]
        orientation = args["orientation"]
        timestamp = args["timestamp"]
```

</TabItem>
</Tabs>

---

### HoldBeforeClientEvent

<Client/>

玩家长按屏幕，即将响应到游戏内时触发。仅在移动端或 pc 的 F11 模式下触发。pc 的非 F11 模式可以监听 [RightClickBeforeClientEvent](/docs/docs/scripts/modapi/events/control#rightclickbeforeclientevent) 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnHoldBeforeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| cancel | bool | 设置为 True 可拦截原版的挖方块/使用物品/与实体交互响应。 |

**备注**

- 玩家长按屏幕的处理顺序为：玩家点击屏幕，在长按判定时间内（默认为 400 毫秒，可通过 [SetHoldTimeThreshold](/docs/docs/scripts/modapi/interfaces/control#setholdtimethreshold) 接口修改）一直没有进行拖动或松手触发该事件若事件没有 cancel，则根据主手上的物品，准心处的物体类型以及与玩家的距离，进行挖方块/使用物品/与实体交互等操作 即该事件只会在到达长按判定时间的瞬间触发一次，后面一直按住不会连续触发，可以使用 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 监听长按后松手。
- 与 [TapBeforeClientEvent](/docs/docs/scripts/modapi/events/control#tapbeforeclientevent) 事件类似，被 ui 层捕获，没有穿透到世界的点击不会触发该事件。
- 点触流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "HoldBeforeClientEvent",
            self, self.OnHoldBeforeClientEvent)

    def OnHoldBeforeClientEvent(self, args):
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### LeftClickBeforeClientEvent

<Client/>

玩家按下攻击/摧毁键时触发，例如鼠标左键、新触控攻击键、手柄右扳机键。鼠标左键仅在 pc 的普通控制模式（即非 F11 模式）下触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnLeftClickBeforeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| cancel | bool | 设置为 True 可拦截原版的挖方块或攻击响应。 |

**备注**

- 按键控制流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "LeftClickBeforeClientEvent",
            self, self.OnLeftClickBeforeClientEvent)

    def OnLeftClickBeforeClientEvent(self, args):
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### LeftClickReleaseClientEvent

<Client/>

玩家松开攻击/摧毁键时触发，例如鼠标左键、新触控攻击键、手柄右扳机键。鼠标左键仅在 pc 的普通控制模式（即非 F11 模式）下触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnLeftClickReleaseClientEvent(self, args: Dict[str, Any]) -> None: ...
```


**备注**

- 按键控制流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "LeftClickReleaseClientEvent",
            self, self.OnLeftClickReleaseClientEvent)

    def OnLeftClickReleaseClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### MouseWheelClientEvent

<Client/>

鼠标滚轮滚动时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnMouseWheelClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| direction | int | 1 为向上滚动，0 为向下滚动。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "MouseWheelClientEvent",
            self, self.OnMouseWheelClientEvent)

    def OnMouseWheelClientEvent(self, args):
        direction = args["direction"]
```

</TabItem>
</Tabs>

---

### OnBackButtonReleaseClientEvent

<Client/>

返回按钮（目前特指安卓系统导航中的返回按钮）松开时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnBackButtonReleaseClientEvent(self, args: Dict[str, Any]) -> None: ...
```


**备注**

- 目前仅安卓平台可用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnBackButtonReleaseClientEvent",
            self, self.OnOnBackButtonReleaseClientEvent)

    def OnOnBackButtonReleaseClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### OnClientPlayerStartMove

<Client/>

移动按钮按下触发事件，在按住一个方向键的同时，去按另外一个方向键，不会触发第二次。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnClientPlayerStartMove(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnClientPlayerStartMove",
            self, self.OnOnClientPlayerStartMove)

    def OnOnClientPlayerStartMove(self, args):
        pass
```

</TabItem>
</Tabs>

---

### OnClientPlayerStopMove

<Client/>

移动按钮按下释放时触发事件，同时按下多个方向键，需要释放所有的方向键才会触发事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnClientPlayerStopMove(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnClientPlayerStopMove",
            self, self.OnOnClientPlayerStopMove)

    def OnOnClientPlayerStopMove(self, args):
        pass
```

</TabItem>
</Tabs>

---

### OnGamepadControllerLayoutChangeClientEvent

<Client/>

游戏手柄按键映射改变事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnGamepadControllerLayoutChangeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| action | str | 行为。 |
| newKey | int | 修改后的键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。 |
| oldKey | int | 修改前的键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnGamepadControllerLayoutChangeClientEvent",
            self, self.OnOnGamepadControllerLayoutChangeClientEvent)

    def OnOnGamepadControllerLayoutChangeClientEvent(self, args):
        action = args["action"]
        newKey = args["newKey"]
        oldKey = args["oldKey"]
```

</TabItem>
</Tabs>

---

### OnGamepadKeyPressClientEvent

<Client/>

游戏手柄按键事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnGamepadKeyPressClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| screenName | str | 当前 screenName。 |
| key | int | 键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。 |
| isDown | str | 是否按下，按下为 1，弹起为 0。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnGamepadKeyPressClientEvent",
            self, self.OnOnGamepadKeyPressClientEvent)

    def OnOnGamepadKeyPressClientEvent(self, args):
        screenName = args["screenName"]
        key = args["key"]
        isDown = args["isDown"]
```

</TabItem>
</Tabs>

---

### OnGamepadStickClientEvent

<Client/>

游戏手柄摇杆事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnGamepadStickClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| key | int | 键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。 |
| x | float | 摇杆水平方向的值，从左到右取值为 -1.0 ~ 1.0。 |
| y | float | 摇杆竖直方向的值，从下到上取值为 -1.0 ~ 1.0。 |

**备注**

- 触发时机：当摇杆摇动位置发生改变时。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnGamepadStickClientEvent",
            self, self.OnOnGamepadStickClientEvent)

    def OnOnGamepadStickClientEvent(self, args):
        key = args["key"]
        x = args["x"]
        y = args["y"]
```

</TabItem>
</Tabs>

---

### OnGamepadTriggerClientEvent

<Client/>

游戏手柄扳机事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnGamepadTriggerClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| key | int | 键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。 |
| magnitude | float | 扣动扳机的力度，取值为 0 ~ 1.0。 |

**备注**

- 触发时机：当扣动扳机的力度发生改变时。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnGamepadTriggerClientEvent",
            self, self.OnOnGamepadTriggerClientEvent)

    def OnOnGamepadTriggerClientEvent(self, args):
        key = args["key"]
        magnitude = args["magnitude"]
```

</TabItem>
</Tabs>

---

### OnKeyPressInGame

<Client/>

按键按下或按键释放时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnKeyPressInGame(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| screenName | str | 当前 screenName。 |
| key | str | 键码（注：这里的 int 型被转成了 str 型，比如"1"对应的就是枚举值文档中的 1），详见[KeyBoardType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/KeyBoardType.html)。 |
| isDown | str | 是否按下，按下为 1，弹起为 0。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnKeyPressInGame",
            self, self.OnOnKeyPressInGame)

    def OnOnKeyPressInGame(self, args):
        screenName = args["screenName"]
        key = args["key"]
        isDown = args["isDown"]
```

</TabItem>
</Tabs>

---

### OnKeyboardControllerLayoutChangeClientEvent

<Client/>

键盘按键映射改变事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnKeyboardControllerLayoutChangeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| action | str | 行为。 |
| newKey | int | 修改后的键码，详见[KeyBoardType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/KeyBoardType.html)。 |
| oldKey | int | 修改前的键码，详见[KeyBoardType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/KeyBoardType.html)。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnKeyboardControllerLayoutChangeClientEvent",
            self, self.OnOnKeyboardControllerLayoutChangeClientEvent)

    def OnOnKeyboardControllerLayoutChangeClientEvent(self, args):
        action = args["action"]
        newKey = args["newKey"]
        oldKey = args["oldKey"]
```

</TabItem>
</Tabs>

---

### OnMouseMiddleDownClientEvent

<Client/>

鼠标按下中键时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnMouseMiddleDownClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| isDown | int | 1 为按下，0 为弹起。 |
| mousePositionX | float | 按下时的 x 坐标。 |
| mousePositionY | float | 按下时的 y 坐标。 |

**备注**

- 仅通过 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 创建的界面能够正常返回坐标，开启 F11 模式的时候，返回最后点击屏幕时的坐标。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnMouseMiddleDownClientEvent",
            self, self.OnOnMouseMiddleDownClientEvent)

    def OnOnMouseMiddleDownClientEvent(self, args):
        isDown = args["isDown"]
        mousePositionX = args["mousePositionX"]
        mousePositionY = args["mousePositionY"]
```

</TabItem>
</Tabs>

---

### RightClickBeforeClientEvent

<Client/>

玩家按下使用物品/放置方块键时触发，例如鼠标右键、新触控交互键、手柄左扳机键。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnRightClickBeforeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| cancel | bool | 设置为 True 可拦截原版的物品使用/实体交互响应。 |

**备注**

- 按键控制流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "RightClickBeforeClientEvent",
            self, self.OnRightClickBeforeClientEvent)

    def OnRightClickBeforeClientEvent(self, args):
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### RightClickReleaseClientEvent

<Client/>

玩家松开使用物品/放置方块键时触发，例如鼠标右键、新触控交互键、手柄左扳机键。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnRightClickReleaseClientEvent(self, args: Dict[str, Any]) -> None: ...
```


**备注**

- 按键控制流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "RightClickReleaseClientEvent",
            self, self.OnRightClickReleaseClientEvent)

    def OnRightClickReleaseClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### TapBeforeClientEvent

<Client/>

玩家点击屏幕并松手，即将响应到游戏内时触发。仅在移动端或 pc 的 F11 模式下触发。pc 的非 F11 模式可以监听 [LeftClickBeforeClientEvent](/docs/docs/scripts/modapi/events/control#leftclickbeforeclientevent) 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnTapBeforeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| cancel | bool | 设置为 True 可拦截原版的攻击或放置响应。 |

**备注**

- 玩家点击屏幕的处理顺序为：玩家点击屏幕，没有进行拖动，并在短按判定时间（250 毫秒）内松手触发该事件若事件没有 cancel，则根据准心处的物体类型以及与玩家的距离，进行攻击或放置等操作。
- 与 [GetEntityByCoordEvent](/docs/docs/scripts/modapi/events/control#getentitybycoordevent) 事件不同的是，被 ui 层捕获，没有穿透到世界的点击不会触发该事件，例如：点击原版的移动/跳跃等按钮通过 [SetIsHud](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#setishud)(0)屏蔽了游戏操作对按钮使用 AddTouchEventHandler 接口时 isSwallow 参数设置为 True。
- 点触流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "TapBeforeClientEvent",
            self, self.OnTapBeforeClientEvent)

    def OnTapBeforeClientEvent(self, args):
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### TapOrHoldReleaseClientEvent

<Client/>

玩家点击屏幕后松手时触发。仅在移动端或 pc 的 F11 模式下触发。pc 的非 F11 模式可以使用 [LeftClickReleaseClientEvent](/docs/docs/scripts/modapi/events/control#leftclickreleaseclientevent) 与 [RightClickReleaseClientEvent](/docs/docs/scripts/modapi/events/control#rightclickreleaseclientevent) 事件监听鼠标松开。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnTapOrHoldReleaseClientEvent(self, args: Dict[str, Any]) -> None: ...
```


**备注**

- 短按及长按后松手都会触发该事件。
- 一张图读懂点触和按键事件触发流程。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "TapOrHoldReleaseClientEvent",
            self, self.OnTapOrHoldReleaseClientEvent)

    def OnTapOrHoldReleaseClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---
