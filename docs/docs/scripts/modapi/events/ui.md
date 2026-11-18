---
sidebar_position: 7
---

# UI

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录UI相关的事件，共 17 个。监听方式见[事件工作机制](/docs/docs/scripts/modapi/overview#事件)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/UI.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_event" color="green"/>

---

### AchievementButtonMovedClientEvent

<Version type="china" add="2.9"/>

<Client/>

触发时机：使用自定义成就系统的时，拖动成就入口结束时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnAchievementButtonMovedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| oldPosition | Tuple[float, float] | 移动前该控件相对父节点的坐标信息，第一项为横轴，第二项为纵轴。 |
| newPosition | Tuple[float, float] | 移动后该控件相对父节点的坐标信息，第一项为横轴，第二项为纵轴。 |

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
            "AchievementButtonMovedClientEvent",
            self, self.OnAchievementButtonMovedClientEvent)

    def OnAchievementButtonMovedClientEvent(self, args):
        oldPosition = args["oldPosition"]
        newPosition = args["newPosition"]
```

</TabItem>
</Tabs>

---

### ClientChestCloseEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

关闭箱子界面时触发，包括小箱子，合并后大箱子和末影箱(实体容器不属于方块，不会触发该事件)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientChestCloseEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家实体 id。 |
| x | int | 箱子位置 x 值。 |
| y | int | 箱子位置 y 值。 |
| z | int | 箱子位置 z 值。 |
| fullName | str | 方块名称，如 minecraft:chest。 |
| auxData | int | 方块附加值。 |
| dimensionId | int | 维度 id。 |
| isLargeChest | bool | 是否是大箱子，仅箱子(chest)时存在该参数，末影箱/木桶/潜影盒不存在该参数。 |

**备注**

- 注：关闭时若容器管理器已提前释放，参数可能为空。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

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
            "ClientChestCloseEvent",
            self, self.OnClientChestCloseEvent)

    def OnClientChestCloseEvent(self, args):
        playerId = args["playerId"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
        fullName = args["fullName"]
        auxData = args["auxData"]
        dimensionId = args["dimensionId"]
        isLargeChest = args["isLargeChest"]
```

</TabItem>
</Tabs>

---

### ClientChestOpenEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

打开箱子界面时触发，包括小箱子，合并后大箱子和末影箱(实体容器不属于方块，不会触发该事件)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientChestOpenEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家实体 id。 |
| x | int | 箱子位置 x 值。 |
| y | int | 箱子位置 y 值。 |
| z | int | 箱子位置 z 值。 |
| fullName | str | 方块名称，如 minecraft:chest。 |
| auxData | int | 方块附加值。 |
| dimensionId | int | 维度 id。 |
| isLargeChest | bool | 是否是大箱子，仅箱子(chest)时存在该参数，末影箱/木桶/潜影盒不存在该参数。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

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
            "ClientChestOpenEvent",
            self, self.OnClientChestOpenEvent)

    def OnClientChestOpenEvent(self, args):
        playerId = args["playerId"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
        fullName = args["fullName"]
        auxData = args["auxData"]
        dimensionId = args["dimensionId"]
        isLargeChest = args["isLargeChest"]
```

</TabItem>
</Tabs>

---

### ClientPlayerInventoryCloseEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

关闭物品背包界面时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientPlayerInventoryCloseEvent(self, args: Dict[str, Any]) -> None: ...
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
            "ClientPlayerInventoryCloseEvent",
            self, self.OnClientPlayerInventoryCloseEvent)

    def OnClientPlayerInventoryCloseEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### ClientPlayerInventoryOpenEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

打开物品背包界面时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientPlayerInventoryOpenEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| isCreative | bool | 是否是创造模式背包界面。 |
| cancel | bool | 取消打开物品背包界面。 |

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
            "ClientPlayerInventoryOpenEvent",
            self, self.OnClientPlayerInventoryOpenEvent)

    def OnClientPlayerInventoryOpenEvent(self, args):
        isCreative = args["isCreative"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### CloseNeteaseShopEvent

<Version type="china" add="2.6"/>

<Client/>

关闭商城界面时触发，包括脚本商城和 Apollo 插件商城。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnCloseNeteaseShopEvent(self, args: Dict[str, Any]) -> None: ...
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
            "CloseNeteaseShopEvent",
            self, self.OnCloseNeteaseShopEvent)

    def OnCloseNeteaseShopEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### GridComponentSizeChangedClientEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

UI grid 控件里格子重新排列时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnGridComponentSizeChangedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| path | str | grid 网格所在的路径（从 UI 根节点算起）。 |

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
            "GridComponentSizeChangedClientEvent",
            self, self.OnGridComponentSizeChangedClientEvent)

    def OnGridComponentSizeChangedClientEvent(self, args):
        path = args["path"]
```

</TabItem>
</Tabs>

---

### HudButtonChangedClientEvent

<Version type="china" add="3.3"/>

<Client/>

当原生 HUD 按钮位置或大小发生改变时触发，例如玩家使用了自定义控件功能会触发，可在该事件中修改 mod 按钮的位置防止重叠。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnHudButtonChangedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| changedList | Tuple[Dict[str, Any]] | 修改后的按钮列表。 |

**备注**

- 修改后的按钮列表中，每个按钮的字段如下：

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| areaEnum | str | [HUD 原生 UI 枚举值](/docs/docs/scripts/modapi/enums#originguiname) |
| beforeSize | tuple(float,float,float,float) | (xMin, yMin, xMax, yMax)修改前原生 UI 的 Area |
| afterSize | tuple(float,float,float,float) | (xMin, yMin, xMax, yMax)修改后原生 UI 的 Area |

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
            "HudButtonChangedClientEvent",
            self, self.OnHudButtonChangedClientEvent)

    def OnHudButtonChangedClientEvent(self, args):
        changedList = args["changedList"]
```

</TabItem>
</Tabs>

---

### OnItemSlotButtonClickedEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

点击快捷栏、背包栏、盔甲栏、副手栏的物品槽时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnItemSlotButtonClickedEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| slotIndex | int | 点击的物品槽的编号，编号对应位置详见[[物品栏](https://zh.minecraft.wiki/w/%E7%89%A9%E5%93%81%E6%A0%8F)]。 |

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
            "OnItemSlotButtonClickedEvent",
            self, self.OnOnItemSlotButtonClickedEvent)

    def OnOnItemSlotButtonClickedEvent(self, args):
        slotIndex = args["slotIndex"]
```

</TabItem>
</Tabs>

---

### PlayerChatButtonClickClientEvent

<Version type="china" add="1.21"/>

<Client/>

玩家点击聊天按钮或回车键触发呼出聊天窗口时客户端抛出的事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerChatButtonClickClientEvent(self, args: Dict[str, Any]) -> None: ...
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
            "PlayerChatButtonClickClientEvent",
            self, self.OnPlayerChatButtonClickClientEvent)

    def OnPlayerChatButtonClickClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

---

### PlayerInventoryOpenScriptServerEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

某个客户端打开物品背包界面时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerInventoryOpenScriptServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 客户端对应的玩家 entity 的唯一 ID。 |
| isCreative | bool | 是否是创造模式背包界面。 |

**备注**

- 可以监听此事件判定客户端是否打开了创造背包。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PlayerInventoryOpenScriptServerEvent",
            self, self.OnPlayerInventoryOpenScriptServerEvent)

    def OnPlayerInventoryOpenScriptServerEvent(self, args):
        playerId = args["playerId"]
        isCreative = args["isCreative"]
```

</TabItem>
</Tabs>

---

### PopScreenAfterClientEvent

<Version type="china" add="2.6"/>

<Client/>

screen 移除触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPopScreenAfterClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| screenName | str | UI 名字。 |
| screenDef | str | 包含命名空间的 UI 名字，格式为 namespace.screenName。 |

**备注**

- 与 [PopScreenEvent](/docs/docs/scripts/modapi/events/ui#popscreenevent) 不同，PopScreenAfterClientEvent 触发时机是在完全把 UI 弹出后，返回的参数是弹出后最顶层 UI 的。

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
            "PopScreenAfterClientEvent",
            self, self.OnPopScreenAfterClientEvent)

    def OnPopScreenAfterClientEvent(self, args):
        screenName = args["screenName"]
        screenDef = args["screenDef"]
```

</TabItem>
</Tabs>

---

### PopScreenEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

screen 移除触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPopScreenEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| screenName | str | UI 名字。 |
| screenDef | str | 包含命名空间的 UI 名字，格式为 namespace.screenName。 |

**备注**

- screenName 为正在弹出的 Screen 名，如果需要获取下一个 Screen 可使用 [PopScreenAfterClientEvent](/docs/docs/scripts/modapi/events/ui#popscreenafterclientevent)。

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
            "PopScreenEvent",
            self, self.OnPopScreenEvent)

    def OnPopScreenEvent(self, args):
        screenName = args["screenName"]
        screenDef = args["screenDef"]
```

</TabItem>
</Tabs>

---

### PushScreenEvent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

screen 创建触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPushScreenEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| screenName | str | UI 名字。 |
| screenDef | str | 包含命名空间的 UI 名字，格式为 namespace.screenName。 |

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
            "PushScreenEvent",
            self, self.OnPushScreenEvent)

    def OnPushScreenEvent(self, args):
        screenName = args["screenName"]
        screenDef = args["screenDef"]
```

</TabItem>
</Tabs>

---

### ScreenSizeChangedClientEvent

<Version type="china" add="2.5"/>

<Client/>

改变屏幕大小时会触发的事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnScreenSizeChangedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| beforeX | float | 屏幕大小改变前的宽度。 |
| beforeY | float | 屏幕大小改变前的高度。 |
| afterX | float | 屏幕大小改变后的宽度。 |
| afterY | float | 屏幕大小改变后的高度。 |

**备注**

- 该事件仅支持 PC。

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
            "ScreenSizeChangedClientEvent",
            self, self.OnScreenSizeChangedClientEvent)

    def OnScreenSizeChangedClientEvent(self, args):
        beforeX = args["beforeX"]
        beforeY = args["beforeY"]
        afterX = args["afterX"]
        afterY = args["afterY"]
```

</TabItem>
</Tabs>

---

### UiInitFinished

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

UI 初始化框架完成,此时可以创建 UI。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnUiInitFinished(self, args: Dict[str, Any]) -> None: ...
```


**备注**

- 切换维度后会重新初始化 UI 并触发该事件。

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
            "UiInitFinished",
            self, self.OnUiInitFinished)

    def OnUiInitFinished(self, args):
        pass
```

</TabItem>
</Tabs>

---

### UrgeShipEvent

<Version type="china" add="2.4"/>

<Server/>

玩家点击商城催促发货按钮时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnUrgeShipEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 id。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "UrgeShipEvent",
            self, self.OnUrgeShipEvent)

    def OnUrgeShipEvent(self, args):
        playerId = args["playerId"]
```

</TabItem>
</Tabs>

---
