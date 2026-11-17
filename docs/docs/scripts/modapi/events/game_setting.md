---
sidebar_position: 11
---

# 游戏设置

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录游戏设置相关的事件，共 4 个。监听方式见[事件工作机制](/docs/docs/scripts/modapi/overview#事件)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/youxishezhi.html"/>

---

### OnCustomGamepadChangedEvent

<Client/>

当自定义手柄按键绑定发生改变时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnCustomGamepadChangedEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| name | str | 按键名称。 |
| oldKey | str | 旧的键码。 |
| newKey | str | 新的键码。 |

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
            "OnCustomGamepadChangedEvent",
            self, self.OnOnCustomGamepadChangedEvent)

    def OnOnCustomGamepadChangedEvent(self, args):
        name = args["name"]
        oldKey = args["oldKey"]
        newKey = args["newKey"]
```

</TabItem>
</Tabs>

---

### OnCustomGamepadPressInGame

<Client/>

当玩家按下自定义手柄按键时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnCustomGamepadPressInGame(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| name | str | 按键名称。 |
| key | str | 键码。 |
| category | str | 按键分类。 |
| isDown | str | 按下状态 ("1"为按下, "0"为抬起)，仅普通按键有效。 |
| magnitude | float | 扳机力度 (0.0-1.0)，仅扳机键有效。 |
| x | float | 摇杆 X 轴偏移 (-1.0-1.0)，仅摇杆键有效。 |
| y | float | 摇杆 Y 轴偏移 (-1.0-1.0)，仅摇杆键有效。 |
| screenName | str | 当前屏幕名称。 |

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
            "OnCustomGamepadPressInGame",
            self, self.OnOnCustomGamepadPressInGame)

    def OnOnCustomGamepadPressInGame(self, args):
        name = args["name"]
        key = args["key"]
        category = args["category"]
        isDown = args["isDown"]
        magnitude = args["magnitude"]
        x = args["x"]
        y = args["y"]
        screenName = args["screenName"]
```

</TabItem>
</Tabs>

---

### OnCustomKeyChangedEvent

<Client/>

当自定义按键绑定发生改变时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnCustomKeyChangedEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| name | str | 按键名称。 |
| oldKey | str | 旧的键码。 |
| newKey | str | 新的键码。 |

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
            "OnCustomKeyChangedEvent",
            self, self.OnOnCustomKeyChangedEvent)

    def OnOnCustomKeyChangedEvent(self, args):
        name = args["name"]
        oldKey = args["oldKey"]
        newKey = args["newKey"]
```

</TabItem>
</Tabs>

---

### OnCustomKeyPressInGame

<Client/>

当玩家按下自定义按键时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnCustomKeyPressInGame(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| name | str | 按键名称。 |
| key | str | 键码。 |
| category | str | 按键分类。 |
| isDown | str | 按下状态 ("1"为按下, "0"为抬起)。 |
| screenName | str | 当前屏幕名称。 |

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
            "OnCustomKeyPressInGame",
            self, self.OnOnCustomKeyPressInGame)

    def OnOnCustomKeyPressInGame(self, args):
        name = args["name"]
        key = args["key"]
        category = args["category"]
        isDown = args["isDown"]
        screenName = args["screenName"]
```

</TabItem>
</Tabs>

---
