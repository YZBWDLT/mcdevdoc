---
sidebar_position: 13
---

# 控制

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录控制相关的接口，共 48 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/kongzhi.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### AddPickBlacklist

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

添加使用 camera 组件（例如 [GetChosen](/docs/docs/scripts/modapi/interfaces/control#getchosen) 接口、[PickFacing](/docs/docs/scripts/modapi/interfaces/control#pickfacing) 接口）选取实体时的黑名单，即该实体不会被选取到。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPickBlacklist(entityId: str) -> bool
```

- entityId: str，实体 id。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
# 添加黑名单
comp.AddPickBlacklist(entityId)
```

</TabItem>
</Tabs>

---

### ClearPickBlacklist

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

清除使用 camera 组件（例如 [GetChosen](/docs/docs/scripts/modapi/interfaces/control#getchosen) 接口、[PickFacing](/docs/docs/scripts/modapi/interfaces/control#pickfacing) 接口）选取实体的黑名单。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClearPickBlacklist() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
# 清除黑名单中所有实体
comp.ClearPickBlacklist()
```

</TabItem>
</Tabs>

---

### GetChosen

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取屏幕点击位置的实体或方块信息，通常与 [GetEntityByCoordEvent](/docs/docs/scripts/modapi/events/control#getentitybycoordevent) 配合使用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChosen() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，选中目标的数据，详见[PickFacing 接口](#pickfacing)的备注。

**备注**

- 目前只有在第一人称视角才能准确获取。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 当玩家点击屏幕时获取点击位置的entityId
class MyClientSystem(ClientSystem):
    def __init__(self, namespace, name):
        ClientSystem.__init__(self, namespace, name)
        self.ListenForEvent('Minecraft', 'Engine', 'GetEntityByCoordEvent', self, self.click)
    def click(self, args):
        comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
        pickData = comp.GetChosen()
```

</TabItem>
</Tabs>

---

### GetChosenEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取屏幕点击位置的实体 id，通常与 [GetEntityByCoordEvent](/docs/docs/scripts/modapi/events/control#getentitybycoordevent) 配合使用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChosenEntity() -> str
```


**返回值**：str，实体 id。

**备注**

- 目前只有在第一人称视角才能准确获取。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 当玩家点击屏幕时获取点击位置的entityId
import mod.client.extraClientApi as clientApi
class MyClientSystem(ClientSystem):
    def __init__(self, namespace, name):
        ClientSystem.__init__(self, namespace, name)
        self.ListenForEvent('Minecraft', 'Engine', 'GetEntityByCoordEvent', self, self.click)
    def click(self, args):
        comp = clientApi.GetEngineCompFactory().CreateCamera(levelId)
        entityId = comp.GetChosenEntity()
```

</TabItem>
</Tabs>

---

### GetHoldTimeThresholdInMs

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取长按判定时间，即按着屏幕多长时间会触发长按操作。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetHoldTimeThresholdInMs() -> int
```


**返回值**：int，时间，单位毫秒。默认为 400。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
timeMs = comp.GetHoldTimeThresholdInMs()
```

</TabItem>
</Tabs>

---

### GetInputVector

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)`

获取方向键（移动轮盘）的输入。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetInputVector() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，返回一个单位向量，向量第一项为向左的大小，第二项为向前的大小。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)
left, up = comp.GetInputVector()
```

</TabItem>
</Tabs>

---

### GetMousePosition

<Version type="china" add="2.5"/>

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)`

获取鼠标位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMousePosition() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，返回一个 tuple，第一个元素为 x 坐标，第一个元素为 y 坐标，非 PC 会返回 None。

**备注**

- 仅在 PC 有效果，非 PC 会返回 None。仅在 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 时正常获取。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)
comp.GetMousePosition()
```

</TabItem>
</Tabs>

---

### GetTouchPos

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

模块级函数，直接调用。

获取点击的屏幕坐标。可以监听 [TapBeforeClientEvent](/docs/docs/scripts/modapi/events/control#tapbeforeclientevent) 或 [TapOrHoldReleaseClientEvent](/docs/docs/scripts/modapi/events/control#taporholdreleaseclientevent) 事件，调用本 API 获取点击坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTouchPos() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，屏幕坐标。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
def GetTouchPosTest():
    touchX, touchY = clientApi.GetTouchPos()
```

</TabItem>
</Tabs>

---

### IsCanAttack

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应攻击。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanAttack() -> bool
```


**返回值**：bool，是否响应攻击。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanAttack()
```

</TabItem>
</Tabs>

---

### IsCanChat

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应聊天按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanChat() -> bool
```


**返回值**：bool，是否响应聊天按钮。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanChat()
```

</TabItem>
</Tabs>

---

### IsCanDrag

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应屏幕拖动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanDrag() -> bool
```


**返回值**：bool，是否响应屏幕拖动。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanDrag()
```

</TabItem>
</Tabs>

---

### IsCanInair

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应打上升下降按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanInair() -> bool
```


**返回值**：bool，是否响应打上升下降按钮。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanInair()
```

</TabItem>
</Tabs>

---

### IsCanJump

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应跳跃（以及在水中浮起）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanJump() -> bool
```


**返回值**：bool，是否响应跳跃（以及在水中浮起）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanJump()
```

</TabItem>
</Tabs>

---

### IsCanMove

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应移动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanMove() -> bool
```


**返回值**：bool，是否响应移动。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanMove()
```

</TabItem>
</Tabs>

---

### IsCanOpenInv

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应打开背包按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanOpenInv() -> bool
```


**返回值**：bool，是否响应打开背包按钮。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanOpenInv()
```

</TabItem>
</Tabs>

---

### IsCanPause

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应暂停按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanPause() -> bool
```


**返回值**：bool，是否响应暂停按钮。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanPause()
```

</TabItem>
</Tabs>

---

### IsCanPauseScreen

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否可以打开暂停界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanPauseScreen() -> bool
```


**返回值**：bool，是否可以打开暂停界面。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanPauseScreen()
```

</TabItem>
</Tabs>

---

### IsCanPerspective

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应切换视角。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanPerspective() -> bool
```


**返回值**：bool，是否响应切换视角。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanPerspective()
```

</TabItem>
</Tabs>

---

### IsCanScreenShot

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应截图按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanScreenShot() -> bool
```


**返回值**：bool，是否响应截图按钮。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanScreenShot()
```

</TabItem>
</Tabs>

---

### IsCanWalkMode

<Version type="china" add="2.11"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

获取玩家是否响应切换行走模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsCanWalkMode() -> bool
```


**返回值**：bool，是否响应切换行走模式。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.IsCanWalkMode()
```

</TabItem>
</Tabs>

---

### IsTouchWithMouse

<Version type="china" add="3.0"/>

<Client/>

模块级函数，直接调用。

获取是否正在使用鼠标点击模拟触屏。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsTouchWithMouse() -> bool
```


**返回值**：bool，是否在用鼠标模拟触屏。

**备注**

- 该接口只适用于 PC 端。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.IsTouchWithMouse()
```

</TabItem>
</Tabs>

---

### LockInputVector

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateRot(localPlayerId)`

锁定本地玩家方向键（移动轮盘）的输入，可使本地玩家持续向指定方向前行，且不会再受玩家输入影响。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockInputVector(inputVector: Tuple[float, float]) -> bool
```

- inputVector: Tuple[float, float]，输入向量，第一项控制向左的大小，第二项控制向前的大小。传入(0, 0)时玩家将会被强制固定在原地，不允许移动。

**返回值**：bool，是否锁定成功，True:成功 False:失败。

**备注**

- 传入的向量会被转化为单位向量，因此传入(10, 0)与传入(0.1, 0)效果相同。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 使玩家向左前方持续移动
localPlayerId = clientApi.GetLocalPlayerId()
rotComp = clientApi.GetEngineCompFactory().CreateRot(localPlayerId)
motionComp = clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)
motionComp.LockInputVector((1, 1))
```

</TabItem>
</Tabs>

---

### LockVerticalMove

<Version type="china" add="2.6"/>

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)`

模拟上升或下降，调用后一直上升或下降。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LockVerticalMove(flag: bool) -> Any
```

- flag: bool，True 上升，False 下降。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)
comp.LockVerticalMove(flag)
```

</TabItem>
</Tabs>

---

### PickFacing

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> CameraComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCamera(levelId)`

获取准星选中的实体或者方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PickFacing() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，选中目标的数据，详见备注。

**备注**

- 选中目标为实体时，返回值为：

```python
{
    "type": "Entity",
    "entityId":  entityId,
    "hitPosX" : x, #精准碰撞点的x轴坐标，类型为float
    "hitPosY" : y, #精准碰撞点的y轴坐标，类型为float
    "hitPosZ" : z  #精准碰撞点的z轴坐标，类型为float
}
```

- 选中目标为方块时，返回值为：

```python
{
    "type": "Block",
    "x":  x,
    "y":  y,
    "z":  z,
    "face": face,
    "hitPosX" : x, #精准碰撞点的x轴坐标，类型为float
    "hitPosY" : y, #精准碰撞点的y轴坐标，类型为float
    "hitPosZ" : z  #精准碰撞点的z轴坐标，类型为float
}
```

- 没有选中目标时，返回值为：

```python
{
    "type": "None"
}
```

- 备注：由于引擎限制，准星指向实体时候的 hitPosXYZ 依旧是实体脚底中心的坐标，而不是射线与碰撞箱实际的相交坐标。

</TabItem>
<TabItem value="示例" label="示例">

```python
{
    "type": "Entity",
    "entityId":  entityId,
    "hitPosX" : x, #精准碰撞点的x轴坐标，类型为float
    "hitPosY" : y, #精准碰撞点的y轴坐标，类型为float
    "hitPosZ" : z  #精准碰撞点的z轴坐标，类型为float
}
```

</TabItem>
</Tabs>

---

### SetCanAll

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

同时设置 [SetCanMove](/docs/docs/scripts/modapi/interfaces/control#setcanmove)，[SetCanJump](/docs/docs/scripts/modapi/interfaces/control#setcanjump)，[SetCanAttack](/docs/docs/scripts/modapi/interfaces/control#setcanattack)，[SetCanWalkMode](/docs/docs/scripts/modapi/interfaces/control#setcanwalkmode)，[SetCanPerspective](/docs/docs/scripts/modapi/interfaces/control#setcanperspective)，[SetCanPause](/docs/docs/scripts/modapi/interfaces/control#setcanpause)，[SetCanChat](/docs/docs/scripts/modapi/interfaces/control#setcanchat)，[SetCanScreenShot](/docs/docs/scripts/modapi/interfaces/control#setcanscreenshot)，[SetCanOpenInv](/docs/docs/scripts/modapi/interfaces/control#setcanopeninv)，[SetCanDrag](/docs/docs/scripts/modapi/interfaces/control#setcandrag)，[SetCanInair](/docs/docs/scripts/modapi/interfaces/control#setcaninair)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanAll(all: bool) -> bool
```

- all: bool，True 为全部响应。

**返回值**：bool，设置是否成功。

**备注**

- 要在其他属性设置之前设置，不然在 all 之前设置的会被覆盖掉。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 全部设置为不响应
comp.SetCanAll(False)
```

</TabItem>
</Tabs>

---

### SetCanAttack

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应攻击。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanAttack(attack: bool) -> bool
```

- attack: bool，True 为可攻击。

**返回值**：bool，设置是否成功。

**备注**

- 触屏模式下，设置 SetCanAttack(False)后，将屏蔽点击效果。\<攻击实体，放置方块，开关门，拉动拉杆，点击有 UI 界面的方块(如工作台)> 将失效。注意，不屏蔽点击交互按钮（例如交易、骑乘等按钮），不屏蔽破坏方块。
- PC 的键鼠模式下，设置 SetCanAttack(False)后，将屏蔽鼠标左键效果。\<攻击实体，破坏方块> 将失效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应攻击
comp.SetCanAttack(False)
```

</TabItem>
</Tabs>

---

### SetCanChat

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应聊天按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanChat(chat: bool) -> bool
```

- chat: bool，True 为可打开聊天页面。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应聊天按钮
comp.SetCanChat(False)
```

</TabItem>
</Tabs>

---

### SetCanDrag

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应屏幕拖动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanDrag(drag: bool) -> bool
```

- drag: bool，True 为可拖动屏幕。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应屏幕拖动
comp.SetCanDrag(False)
```

</TabItem>
</Tabs>

---

### SetCanInair

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应上升下降按钮（飞在空中时右下角的三个按钮）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanInair(inair: bool) -> bool
```

- inair: bool，True 为可点击。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应空中控制按钮
comp.SetCanInair(False)
```

</TabItem>
</Tabs>

---

### SetCanJump

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应跳跃（以及在水中浮起）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanJump(jump: bool) -> bool
```

- jump: bool，True 为可跳跃。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应跳跃
comp.SetCanJump(False)
```

</TabItem>
</Tabs>

---

### SetCanMove

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应移动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanMove(move: bool) -> bool
```

- move: bool，True 为可移动。

**返回值**：bool，设置是否成功。

**备注**

- 与 [SetMoveLock](/docs/docs/scripts/modapi/interfaces/control#setmovelock) 的区别：调用 SetCanMove 会清除当前 Input Vector，例如玩家一直按着前进键，调用 SetCanMove(False)会立即停下来，调用 [SetMoveLock](/docs/docs/scripts/modapi/interfaces/control#setmovelock)(True)则不会。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应移动
comp.SetCanMove(False)
```

</TabItem>
</Tabs>

---

### SetCanOpenInv

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应打开背包按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanOpenInv(open: bool) -> bool
```

- open: bool，True 为可打开背包。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应打开背包按钮
comp.SetCanOpenInv(False)
```

</TabItem>
</Tabs>

---

### SetCanPause

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应暂停按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanPause(pause: bool) -> bool
```

- pause: bool，True 为可打开暂停页面。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应暂停按钮
comp.SetCanPause(False)
```

</TabItem>
</Tabs>

---

### SetCanPauseScreen

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否可以打开暂停界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanPauseScreen(pause: bool) -> bool
```

- pause: bool，True 为可打开暂停页面。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应暂停按钮
comp.SetCanPauseScreen(False)
```

</TabItem>
</Tabs>

---

### SetCanPerspective

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应切换视角。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanPerspective(persp: bool) -> bool
```

- persp: bool，True 为可切换。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应切换视角
comp.SetCanPerspective(False)
```

</TabItem>
</Tabs>

---

### SetCanScreenShot

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应截图按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanScreenShot(shot: bool) -> bool
```

- shot: bool，True 为可截图。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应截图按钮
comp.SetCanScreenShot(False)
```

</TabItem>
</Tabs>

---

### SetCanWalkMode

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否响应切换行走模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCanWalkMode(walkmode: bool) -> bool
```

- walkmode: bool，True 为可切换。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 不响应切换行走模式
comp.SetCanWalkMode(False)
```

</TabItem>
</Tabs>

---

### SetControlMode

<Version type="china" add="3.2"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置控制模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetControlMode(mode: int) -> bool
```

- mode: int，控制模式，0:摇杆并点击互动, 1:摇杆并瞄准十字线, 2:方向键并点击互动。

**返回值**：bool，设置成功返回 true，失败返回 false。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.SetControlMode(mode)
```

</TabItem>
</Tabs>

---

### SetControlModeLock

<Version type="china" add="3.2"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置控制模式是否可以被改变。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetControlModeLock(lock: bool) -> bool
```

- lock: bool，true 则控制模式锁定，无法打开对应设置界面，false 则控制模式可以被改变。

**返回值**：bool，设置成功返回 true，失败返回 false。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.SetControlModeLock(lock)
```

</TabItem>
</Tabs>

---

### SetDeviceVibrate

<Version type="china" add="1.23"/>

<Client/> DeviceCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDevice(entityId)`

设置设备震动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDeviceVibrate(milliSeconds: int) -> bool
```

- milliSeconds: int，震动时间（单位：毫秒），iOS 设备该参数无效，无论传入多少均只震动一下，替代方案：可以通过高频调用实现长震动，如每秒调用本接口 30 次。

**返回值**：bool，设置是否成功。

**备注**

- 部分设备 1 分钟内累计震动时间过长会导致设置失败，请尽量不要设置过长的震动时间。
- 设置震动失败（函数返回 False）的可能原因：当前已经处于震动状态、设备不支持震动等。
- 即使函数返回值为 True，也有可能因为未正确判断设备是否支持震动、设备权限上禁止震动等原因未能真正震动。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDevice(entityId)
comp.SetDeviceVibrate(1000)
```

</TabItem>
</Tabs>

---

### SetGyroSensorReportRate

<Version type="china" add="2.11"/>

<Client/>

模块级函数，直接调用。

设置陀螺仪传感器(上报/触发)频率。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetGyroSensorReportRate(reportRate: int) -> bool
```

- reportRate: int，上报/触发频率，默认为 1hz,范围为 1hz - 200hz。

**返回值**：bool，是否设置成功。

**备注**

- 注意: 设置的上报频率只是期望频率,由于硬件的实现，实际上的上报频率会比设置值高。
- 该接口只适用于移动端。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.SetGyroSensorReportRate(reportRate)
```

</TabItem>
</Tabs>

---

### SetHoldTimeThreshold

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置长按判定时间，即按着屏幕多长时间会触发长按操作。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetHoldTimeThreshold(time: int = 400) -> bool
```

- time: int，时间，单位毫秒。默认为 400。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
comp.SetHoldTimeThreshold(100)
```

</TabItem>
</Tabs>

---

### SetMoveLock

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> OperationCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateOperation(levelId)`

设置是否锁住移动。实际上为是否响应十字键与遥感的操作。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMoveLock(movelock: bool) -> bool
```

- movelock: bool，True 为锁住。

**返回值**：bool，设置是否成功。

**备注**

- 与 [SetCanMove](/docs/docs/scripts/modapi/interfaces/control#setcanmove) 的区别：调用 [SetCanMove](/docs/docs/scripts/modapi/interfaces/control#setcanmove) 会清除当前 Input Vector，例如玩家一直按着前进键，调用 [SetCanMove](/docs/docs/scripts/modapi/interfaces/control#setcanmove)(False)会立即停下来，调用 SetMoveLock(True)则不会。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateOperation(levelId)
# 锁住移动
comp.SetMoveLock(True)
```

</TabItem>
</Tabs>

---

### SetShowRideUI

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> RideCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRide(entityId)`

设置是否显示马匹的 UI 界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetShowRideUI(tamedEntityId: str, isShowUI: bool) -> bool
```

- tamedEntityId: str，可骑乘生物 id。
- isShowUI: bool，是否显示 UI。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRide(entityId)
comp.SetShowRideUI(entityId,False)
```

</TabItem>
</Tabs>

---

### SimulateTouchWithMouse

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

模拟使用鼠标控制 UI（PC F11 快捷键）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SimulateTouchWithMouse(touch: bool) -> bool
```

- touch: bool，True:进入鼠标模式，False:退出鼠标模式。

**返回值**：bool，模拟结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.SimulateTouchWithMouse(True)
```

</TabItem>
</Tabs>

---

### ToggleGyroSensor

<Version type="china" add="2.11"/>

<Client/>

模块级函数，直接调用。

开启或关闭陀螺仪传感器采集。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ToggleGyroSensor(isOpen: bool = False) -> bool
```

- isOpen: bool，True 开启，False 关闭，默认 False。

**返回值**：bool，是否设置成功。

**备注**

- 注意: 开启后需要重新设置一次上报频率。
- 该接口只适用于移动端。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.ToggleGyroSensor(False)
# 开启后需要重新设置一次上报频率
clientApi.SetGyroSensorReportRate(10)
```

</TabItem>
</Tabs>

---

### UnLockVerticalMove

<Version type="china" add="2.6"/>

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)`

解除上升或下降状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnLockVerticalMove() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)
comp.UnLockVerticalMove()
```

</TabItem>
</Tabs>

---

### UnlockInputVector

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ActorMotionComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)`

解锁本地玩家方向键（移动轮盘）的输入。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnlockInputVector() -> bool
```


**返回值**：bool，是否解锁成功，True:成功 False:失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 解锁使用LockInputVector锁定的本地玩家方向键（移动轮盘）输入
comp = clientApi.GetEngineCompFactory().CreateActorMotion(localPlayerId)
motionComp.UnlockInputVector()
```

</TabItem>
</Tabs>

---
