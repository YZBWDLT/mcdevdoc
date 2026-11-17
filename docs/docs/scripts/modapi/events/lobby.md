---
sidebar_position: 12
---

# 联机大厅

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录联机大厅相关的事件，共 2 个。监听方式见[事件工作机制](/docs/docs/scripts/modapi/overview#事件)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/lianjidating.html"/>

---

### RoomHostChangedServerEvent

<Server/>

联机大厅房主实际改变后触发。非联机大厅不触发；房主 uid 未变化不触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnRoomHostChangedServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| newUid | int | 新房主 uid。 |
| newEntityId | Optional[str] | 新房主 entityId，不在线则为 None。 |
| oldUid | int | 原房主 uid；首次设置房主时为 0。 |
| oldEntityId | Optional[str] | 原房主 entityId，不在线或首次设置时为 None。 |

**备注**

- 仅联机大厅触发。
- newEntityId/oldEntityId 依赖对应玩家是否在线，离线时为 None；uid 字段则始终有效。

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
            "RoomHostChangedServerEvent",
            self, self.OnRoomHostChangedServerEvent)

    def OnRoomHostChangedServerEvent(self, args):
        newUid = args["newUid"]
        newEntityId = args["newEntityId"]
        oldUid = args["oldUid"]
        oldEntityId = args["oldEntityId"]
```

</TabItem>
</Tabs>

---

### lobbyGoodBuySucServerEvent

<Server/>

玩家登录联机大厅服务器，或者联机大厅游戏内购买商品时触发。如果是玩家登录，触发时玩家客户端已经触发了 [UiInitFinished](/docs/docs/scripts/modapi/events/ui#uiinitfinished) 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnlobbyGoodBuySucServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| eid | str | 购买商品的玩家实体 id。 |
| buyItem | bool | 玩家登录时为 False，玩家购买了商品时为 True。 |

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
            "lobbyGoodBuySucServerEvent",
            self, self.OnlobbyGoodBuySucServerEvent)

    def OnlobbyGoodBuySucServerEvent(self, args):
        eid = args["eid"]
        buyItem = args["buyItem"]
```

</TabItem>
</Tabs>

---
