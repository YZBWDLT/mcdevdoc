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

本文主要记录控制相关的事件，共 23 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/kongzhi.html"/>

---

### ClientJumpButtonPressDownEvent

<Client/>

跳跃按钮按下事件，返回值设置参数只对当次按下事件起作用。

```python
ClientJumpButtonPressDownEvent(continueJump: bool) -> Any
```

- continueJump: bool，设置是否执行跳跃逻辑。

---

### ClientJumpButtonReleaseEvent

<Client/>

跳跃按钮按下释放事件。

```python
ClientJumpButtonReleaseEvent() -> Any
```

---

### GetEntityByCoordEvent

<Client/>

玩家点击屏幕时触发，多个手指点在屏幕上时，只有第一个会触发。

```python
GetEntityByCoordEvent() -> Any
```

---

### GetEntityByCoordReleaseClientEvent

<Client/>

玩家点击屏幕后松开时触发，多个手指点在屏幕上时，只有最后一个手指松开时触发。

```python
GetEntityByCoordReleaseClientEvent() -> Any
```

---

### GyroSensorChangedClientEvent

<Client/>

触发时机：陀螺仪传感器姿态发生变化时。

```python
GyroSensorChangedClientEvent(
    xDiff: float,
    yDiff: float,
    zDiff: float,
    orientation: int,
    timestamp: float,
) -> Any
```

- xDiff: float，x 轴角速度，单位为弧度/s。
- yDiff: float，y 轴角速度，单位为弧度/s。
- zDiff: float，z 轴角速度，单位为弧度/s。
- orientation: int，当前屏幕朝向,0 竖屏正向 1 横屏向左 2 竖屏倒置 3 横屏向右。
- timestamp: float，触发时间戳,秒。

**备注**

- 该事件只适用于移动端。

---

### HoldBeforeClientEvent

<Client/>

玩家长按屏幕，即将响应到游戏内时触发。仅在移动端或 pc 的 F11 模式下触发。pc 的非 F11 模式可以监听 [RightClickBeforeClientEvent](/docs/docs/scripts/modapi/events/control#rightclickbeforeclientevent) 事件。

```python
HoldBeforeClientEvent(cancel: bool) -> Any
```

- cancel: bool，设置为 True 可拦截原版的挖方块/使用物品/与实体交互响应。

**备注**

- 玩家长按屏幕的处理顺序为：玩家点击屏幕，在长按判定时间内（默认为 400 毫秒，可通过 [SetHoldTimeThreshold](/docs/docs/scripts/modapi/control#setholdtimethreshold) 接口修改）一直没有进行拖动或松手触发该事件若事件没有 cancel，则根据主手上的物品，准心处的物体类型以及与玩家的距离，进行挖方块/使用物品/与实体交互等操作 即该事件只会在到达长按判定时间的瞬间触发一次，后面一直按住不会连续触发，可以使用 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 监听长按后松手。
- 与 [TapBeforeClientEvent](/docs/docs/scripts/modapi/events/control#tapbeforeclientevent) 事件类似，被 ui 层捕获，没有穿透到世界的点击不会触发该事件。
- 点触流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

---

### LeftClickBeforeClientEvent

<Client/>

玩家按下攻击/摧毁键时触发，例如鼠标左键、新触控攻击键、手柄右扳机键。鼠标左键仅在 pc 的普通控制模式（即非 F11 模式）下触发。

```python
LeftClickBeforeClientEvent(cancel: bool) -> Any
```

- cancel: bool，设置为 True 可拦截原版的挖方块或攻击响应。

**备注**

- 按键控制流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

---

### LeftClickReleaseClientEvent

<Client/>

玩家松开攻击/摧毁键时触发，例如鼠标左键、新触控攻击键、手柄右扳机键。鼠标左键仅在 pc 的普通控制模式（即非 F11 模式）下触发。

```python
LeftClickReleaseClientEvent() -> Any
```


**备注**

- 按键控制流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

---

### MouseWheelClientEvent

<Client/>

鼠标滚轮滚动时触发。

```python
MouseWheelClientEvent(direction: int) -> Any
```

- direction: int，1 为向上滚动，0 为向下滚动。

---

### OnBackButtonReleaseClientEvent

<Client/>

返回按钮（目前特指安卓系统导航中的返回按钮）松开时触发。

```python
OnBackButtonReleaseClientEvent() -> Any
```


**备注**

- 目前仅安卓平台可用。

---

### OnClientPlayerStartMove

<Client/>

移动按钮按下触发事件，在按住一个方向键的同时，去按另外一个方向键，不会触发第二次。

```python
OnClientPlayerStartMove() -> Any
```

---

### OnClientPlayerStopMove

<Client/>

移动按钮按下释放时触发事件，同时按下多个方向键，需要释放所有的方向键才会触发事件。

```python
OnClientPlayerStopMove() -> Any
```

---

### OnGamepadControllerLayoutChangeClientEvent

<Client/>

游戏手柄按键映射改变事件。

```python
OnGamepadControllerLayoutChangeClientEvent(action: str, newKey: int, oldKey: int) -> Any
```

- action: str，行为。
- newKey: int，修改后的键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。
- oldKey: int，修改前的键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。

---

### OnGamepadKeyPressClientEvent

<Client/>

游戏手柄按键事件。

```python
OnGamepadKeyPressClientEvent(screenName: str, key: int, isDown: str) -> Any
```

- screenName: str，当前 screenName。
- key: int，键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。
- isDown: str，是否按下，按下为 1，弹起为 0。

---

### OnGamepadStickClientEvent

<Client/>

游戏手柄摇杆事件。

```python
OnGamepadStickClientEvent(key: int, x: float, y: float) -> Any
```

- key: int，键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。
- x: float，摇杆水平方向的值，从左到右取值为 -1.0 ~ 1.0。
- y: float，摇杆竖直方向的值，从下到上取值为 -1.0 ~ 1.0。

**备注**

- 触发时机：当摇杆摇动位置发生改变时。

---

### OnGamepadTriggerClientEvent

<Client/>

游戏手柄扳机事件。

```python
OnGamepadTriggerClientEvent(key: int, magnitude: float) -> Any
```

- key: int，键码，详见[GamepadKeyType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/GamepadKeyType.html)。
- magnitude: float，扣动扳机的力度，取值为 0 ~ 1.0。

**备注**

- 触发时机：当扣动扳机的力度发生改变时。

---

### OnKeyPressInGame

<Client/>

按键按下或按键释放时触发。

```python
OnKeyPressInGame(screenName: str, key: str, isDown: str) -> Any
```

- screenName: str，当前 screenName。
- key: str，键码（注：这里的 int 型被转成了 str 型，比如"1"对应的就是枚举值文档中的 1），详见[KeyBoardType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/KeyBoardType.html)。
- isDown: str，是否按下，按下为 1，弹起为 0。

---

### OnKeyboardControllerLayoutChangeClientEvent

<Client/>

键盘按键映射改变事件。

```python
OnKeyboardControllerLayoutChangeClientEvent(action: str, newKey: int, oldKey: int) -> Any
```

- action: str，行为。
- newKey: int，修改后的键码，详见[KeyBoardType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/KeyBoardType.html)。
- oldKey: int，修改前的键码，详见[KeyBoardType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/KeyBoardType.html)。

---

### OnMouseMiddleDownClientEvent

<Client/>

鼠标按下中键时触发。

```python
OnMouseMiddleDownClientEvent(isDown: int, mousePositionX: float, mousePositionY: float) -> Any
```

- isDown: int，1 为按下，0 为弹起。
- mousePositionX: float，按下时的 x 坐标。
- mousePositionY: float，按下时的 y 坐标。

**备注**

- 仅通过 [PushScreen](/docs/docs/scripts/modapi/custom_ui/general#pushscreen) 创建的界面能够正常返回坐标，开启 F11 模式的时候，返回最后点击屏幕时的坐标。

---

### RightClickBeforeClientEvent

<Client/>

玩家按下使用物品/放置方块键时触发，例如鼠标右键、新触控交互键、手柄左扳机键。

```python
RightClickBeforeClientEvent(cancel: bool) -> Any
```

- cancel: bool，设置为 True 可拦截原版的物品使用/实体交互响应。

**备注**

- 按键控制流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

---

### RightClickReleaseClientEvent

<Client/>

玩家松开使用物品/放置方块键时触发，例如鼠标右键、新触控交互键、手柄左扳机键。

```python
RightClickReleaseClientEvent() -> Any
```


**备注**

- 按键控制流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

---

### TapBeforeClientEvent

<Client/>

玩家点击屏幕并松手，即将响应到游戏内时触发。仅在移动端或 pc 的 F11 模式下触发。pc 的非 F11 模式可以监听 [LeftClickBeforeClientEvent](/docs/docs/scripts/modapi/events/control#leftclickbeforeclientevent) 事件。

```python
TapBeforeClientEvent(cancel: bool) -> Any
```

- cancel: bool，设置为 True 可拦截原版的攻击或放置响应。

**备注**

- 玩家点击屏幕的处理顺序为：玩家点击屏幕，没有进行拖动，并在短按判定时间（250 毫秒）内松手触发该事件若事件没有 cancel，则根据准心处的物体类型以及与玩家的距离，进行攻击或放置等操作。
- 与 [GetEntityByCoordEvent](/docs/docs/scripts/modapi/events/control#getentitybycoordevent) 事件不同的是，被 ui 层捕获，没有穿透到世界的点击不会触发该事件，例如：点击原版的移动/跳跃等按钮通过 [SetIsHud](/docs/docs/scripts/modapi/custom_ui/screen#setishud)(0)屏蔽了游戏操作对按钮使用 AddTouchEventHandler 接口时 isSwallow 参数设置为 True。
- 点触流程的图片讲解见 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件的备注。

---

### TapOrHoldReleaseClientEvent

<Client/>

玩家点击屏幕后松手时触发。仅在移动端或 pc 的 F11 模式下触发。pc 的非 F11 模式可以使用 [LeftClickReleaseClientEvent](/docs/docs/scripts/modapi/events/control#leftclickreleaseclientevent) 与 [RightClickReleaseClientEvent](/docs/docs/scripts/modapi/events/control#rightclickreleaseclientevent) 事件监听鼠标松开。

```python
TapOrHoldReleaseClientEvent() -> Any
```


**备注**

- 短按及长按后松手都会触发该事件。
- 一张图读懂点触和按键事件触发流程。

---
