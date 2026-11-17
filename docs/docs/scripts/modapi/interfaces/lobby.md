---
sidebar_position: 18
---

# 联机大厅

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录联机大厅相关的接口，共 14 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/lianjidating.html"/>

---

### GetHostPlayerUid

<Server/> LobbyGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)`

获取当前联机大厅房主的 uid，非联机大厅时返回空字符串。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetHostPlayerUid() -> int
```


**返回值**：int，房主 uid；非联机大厅或房主 uid 不存在时返回 0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
lobbyComp = serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)
uid = lobbyComp.GetHostPlayerUid()
```

</TabItem>
</Tabs>

---

### GetPlayerRoomId

<Server/> LobbyGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)`

异步获取 uid 对应的玩家所在的房间 id，非联机大厅时回调返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerRoomId(callback: Callable, uid: int) -> bool
```

- callback: Callable，回调函数，需接受一个参数：成功时为玩家所在房间 id(int)，失败/非联机大厅时为 None。
- uid: int，玩家 uid。

**返回值**：bool，是否已发起请求，非联机大厅时返回 False。结果经 callback 异步返回。

**备注**

- callback(int)的参数为玩家所在的房间 id，为 None 表示该玩家当前不在线/不在该作品房间内。
- 当玩家进入房间（此时玩家不一定已经进入游戏里），接口即可返回房间 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
lobbyComp = serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)
def cb(roomId):
    if roomId is None:
        print("获取失败或玩家不在联机大厅")
    else:
        print(roomId)
lobbyComp.GetPlayerRoomId(cb, playerUid)
```

</TabItem>
</Tabs>

---

### GetPlayerUid

<Server/> HttpToWebServerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateHttp(levelId)`

获取玩家的 uid。只有在线玩家才可获取。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayerUid(playerId: str) -> int
```

- playerId: str，玩家实体 id。

**返回值**：int，玩家 uid。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateHttp(levelId)
uid = comp.GetPlayerUid(playerId)
```

</TabItem>
</Tabs>

---

### GetRoomInfo

<Server/> LobbyGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)`

获取当前所在联机大厅的房间信息，非联机大厅时返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRoomInfo() -> Optional[Dict[str, Any]]
```


**返回值**：Optional[Dict[str, Any]]，房间信息字典，

**备注**

- 房间信息字典字段说明：包含 roomId、modId、playerCount、maxCount、ownerEntityId、ownerUid 字段。
- ownerEntityId 为 None 表示房主不在当前游戏世界中。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
lobbyComp = serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)
roomInfo = lobbyComp.GetRoomInfo()
if roomInfo:
    roomId = roomInfo["roomId"]
    modId = roomInfo["modId"]
    ownerEntityId = roomInfo["ownerEntityId"]
```

</TabItem>
</Tabs>

---

### GetRoomMeta

<Server/> LobbyGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)`

异步获取指定房间的所有元数据。非联机大厅时返回 False。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRoomMeta(callback: Callable, roomId: int) -> bool
```

- callback: Callable，回调函数，需接受一个参数：成功时为包含房间所有元数据的 dict，失败/房间不存在时为 None。
- roomId: int，目标房间 id。

**返回值**：bool，是否已发起请求，非联机大厅时返回 False。结果经 callback 异步返回。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
lobbyComp = serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)
def cb(meta):
    if meta is None:
        print("获取失败或房间不存在")
    else:
        print(meta)
roomInfo = lobbyComp.GetRoomInfo()
if roomInfo:
    lobbyComp.GetRoomMeta(cb, roomInfo["roomId"])
```

</TabItem>
</Tabs>

---

### KickPlayer

<Server/> LobbyGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)`

踢出玩家，可传入自定义提示信息在客户端断线提示中展示，非联机大厅时返回 False。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
KickPlayer(playerId: str, message: Optional[str] = None) -> bool
```

- playerId: str，被踢出玩家的 entityId。
- message: Optional[str]，自定义踢出提示信息，默认为 None，使用默认提示。

**返回值**：bool，是否踢出成功。

**备注**

- 返回 true 表示该玩家必定被踢出，但因退出逻辑是异步，所以此时玩家仍然在 playerList 中。
- 该接口不能踢房主。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
lobbyComp = serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)
# 使用默认提示踢出玩家
lobbyComp.KickPlayer(playerId)
# 使用自定义提示踢出玩家
lobbyComp.KickPlayer(playerId, "自定义踢出信息")
```

</TabItem>
</Tabs>

---

### KickPlayerByUid

<Server/> LobbyGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)`

通过 uid 踢出玩家，可传入自定义提示信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
KickPlayerByUid(uid: int, message: Optional[str] = None) -> bool
```

- uid: int，玩家 uid。
- message: Optional[str]，自定义踢出提示信息，默认 None，使用默认提示。

**返回值**：bool，是否踢出成功。

**备注**

- 返回 true 表示该玩家必定被踢出，但因退出逻辑是异步，所以此时玩家仍然在 playerList 中。
- 该接口不能踢房主。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
lobbyComp = serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)
lobbyComp.KickPlayerByUid(uid, "自定义踢出信息")
```

</TabItem>
</Tabs>

---

### LobbyGetStorage

<Server/> HttpToWebServerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateHttp(levelId)`

获取存储的数据。仅联机大厅可用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LobbyGetStorage(callback: Callable, uid: int, keys: List[str]) -> Any
```

- callback: Callable，请求回调函数。
- uid: int，玩家 uid，如果传 0 表示获取全局数据。
- keys: List[str]，查询数据的 key 列表，排序 key 与非排序 key 都可获取。

**备注**

- 可以使用 uid 为 0，key 为 op_config 获取开发者平台的运营管理配置中配置的 json。
- callback 需要接受一个参数 当请求失败时，参数返回 None，当请求成功时，参数为一个 dict，格式如下。（获取的 key 如果没有设置过，就不会出现在返回的最新数据中）。

```python
{
    "entity": {
        "data": [
            {
                "key": str,     # 数据的key
                "value": int/float/str  # 数据的值
            },
            ...
        ]
    }
}
```

- 该接口有调用频率限流，同一个组件所有联机大厅房间的请求频率最多为每秒 200 次。如果请求超过该频率会导致阻塞，请求的相应时间变长。

</TabItem>
<TabItem value="示例" label="示例">

```python
{
    "entity": {
        "data": [
            {
                "key": str,     # 数据的key
                "value": int/float/str  # 数据的值
            },
            ...
        ]
    }
}
```

</TabItem>
</Tabs>

---

### LobbyGetStorageBySort

<Server/> HttpToWebServerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateHttp(levelId)`

排序获取存储的数据。仅联机大厅可用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LobbyGetStorageBySort(
    callback: Callable,
    key: str,
    ascend: bool,
    offset: int,
    length: int,
) -> Any
```

- callback: Callable，请求回调函数。
- key: str，查询数据的 key。在开发者平台上配置的可排序的 key 才可以查询。
- ascend: bool，是否升序。
- offset: int，从排序后的第几个数据开始返回（从 0 开始计算）。
- length: int，返回多少个数据，上限为 50。

**备注**

- 全局数据（即 uid 为 0）不参与排序。
- 最多只能获取前 200 的数据（升序前 200 及降序前 200）。
- 返回的结果不一定是最新数据，会有两分钟的刷新间隔，建议只用来作客户端显示，获取业务逻辑所需的数据请使用 [LobbyGetStorage](/docs/docs/scripts/modapi/interfaces/lobby#lobbygetstorage)。
- callback 需要接受一个参数 当请求失败时，参数返回 None，当请求成功时，参数为一个 dict，格式如下。（获取的 key 如果没有设置过，就不会出现在返回的最新数据中）。

```python
{
    "entity": {
        "data": [
            {
                "uid": int,     # 玩家uid
                "nickname": str     # 玩家的用户名
                "value": int/float/str,  # 数据的值
            },
            ...
        ]
    }
}
```

</TabItem>
<TabItem value="示例" label="示例">

```python
{
    "entity": {
        "data": [
            {
                "uid": int,     # 玩家uid
                "nickname": str     # 玩家的用户名
                "value": int/float/str,  # 数据的值
            },
            ...
        ]
    }
}
```

</TabItem>
</Tabs>

---

### LobbySetStorageAndUserItem

<Server/> HttpToWebServerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateHttp(levelId)`

设置订单已发货或者存数据。仅联机大厅可用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LobbySetStorageAndUserItem(
    callback: Callable,
    uid: int,
    orderId: Optional[int],
    entitiesGetter: Optional[Callable],
) -> Any
```

- callback: Callable，请求回调函数。
- uid: int，玩家 uid，如果传 0 表示设置全局数据。
- orderId: Optional[int]，订单 Id，可选。
- entitiesGetter: Optional[Callable]，用于返回存储的数据的函数，可选。

**备注**

- uid 为 0，key 为 op_config 对应开发者平台的运营管理配置中配置的 json，使用这个接口时请避免覆盖掉。
- callback 需要接受一个参数 当请求**失败**时，参数返回 None。当请求**成功**时，参数为一个 dict，包含返回码，最新数据等信息。当 code 为 0 时，表示设置成功。当 code 为 2 时，表示数据冲突，例如多个房间同时设置同一个玩家的数据或者全局数据。当 code 为 5 时，表示订单冲突，例如该订单已经标记为发货了。当请求成功时，无论返回码是多少，都应该使用返回的最新数据更新本地数据。当数据冲突时，callback 回调结束后会自动重新调用 entitiesGetter 获取数据并发起重试。当订单冲突时，callback 回调结束后不会重试。（当发生冲突时，设置的 key 如果之前没有设置过，就不会出现在返回的最新数据中）） 具体格式如下：

```python
{
    “code”: int,  # 返回码
    "message": str  # 返回信息
    "entity": {
        "data": [  # 数据库最新值
            {
                "key": str,     # 数据的key
                "value": object  # 数据的值
            },
            ...
        ]
    }
}
```

- entitiesGetter 需要返回一个 list(dict)，格式为：

```python
[
    {
        "key": str,  # 数据的key，长度最大为64个字符
                     # uid为0，key为op_config对应开发者平台的运营管理配置中配置的json，请注意避免覆盖掉
        "value": object  # 数据的值
                         # 1. 如果是排序的key，value只能是int或者long，范围为-2^63到2^63-1
                         # 2. 如果是非排序的key，value需要是可以被json序列化的对象，如int/float/str/list/dict等
                         #   该object序列化为json字符串后，最大不能超过1024*1024个字符
                         #   中文字符串需要是utf8编码，不要用unicode
                         #   请留意json跟dict的区分，例如json的key一定要是字符串，json没有tuple等
    },
    ...
]
```

- **该接口有调用频率限流，同一个组件所有联机大厅房间的请求频率最多为每秒 50 次。如果请求超过该频率会导致阻塞，请求的相应时间变长。**。
- 同一个 uid 的 [LobbyGetStorage](/docs/docs/scripts/modapi/interfaces/lobby#lobbygetstorage) 与 LobbySetStorageAndUserItem 调用会保证顺序执行。

</TabItem>
<TabItem value="示例" label="示例">

```python
{
    “code”: int,  # 返回码
    "message": str  # 返回信息
    "entity": {
        "data": [  # 数据库最新值
            {
                "key": str,     # 数据的key
                "value": object  # 数据的值
            },
            ...
        ]
    }
}
```

</TabItem>
</Tabs>

---

### QueryLobbyUserItem

<Server/> HttpToWebServerCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateHttp(levelId)`

查询还没发货的订单。仅联机大厅可用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
QueryLobbyUserItem(callback: Callable, uid: int) -> Any
```

- callback: Callable，请求回调函数。
- uid: int，玩家 uid。

**备注**

- callback 需要接受一个参数 当请求失败时，参数返回 None，当请求成功时，参数为一个 dict，格式为：

```python
{
    "entity": {
        "orders": [
            {
                "order_id": int,    # 订单id
                "timestamp": int,   # 购买时间
                "cmd": str          # 实现指令
                "product_count": int  # 购买数量。目前不允许一次购买多个，所以返回都是1
            },
            ...
        ]
    }
}
```

</TabItem>
<TabItem value="示例" label="示例">

```python
{
    "entity": {
        "orders": [
            {
                "order_id": int,    # 订单id
                "timestamp": int,   # 购买时间
                "cmd": str          # 实现指令
                "product_count": int  # 购买数量。目前不允许一次购买多个，所以返回都是1
            },
            ...
        ]
    }
}
```

</TabItem>
</Tabs>

---

### SetRoomMeta

<Server/> LobbyGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)`

设置当前联机大厅房间的元数据，房间关闭时清除数据。非联机大厅返回 False。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRoomMeta(key: str, value: Any) -> bool
```

- key: str，元数据键名。
- value: Any，元数据值，须为 JSON 可序列化类型（dict/list/str/int/float/bool/None 及其嵌套），非 JSON 可序列化时返回 False。

**返回值**：bool，是否设置成功。

**备注**

- 非联机大厅、key 非 str、value 非 JSON 可序列化时返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
lobbyComp = serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)
lobbyComp.SetRoomMeta("seasonId", 2026)
lobbyComp.SetRoomMeta("scores", {"p1": 10})
```

</TabItem>
</Tabs>

---

### TransferRoomHost

<Server/> LobbyGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)`

将联机大厅房主转移给指定在线玩家。仅联机大厅可用，且目标玩家必须在线。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
TransferRoomHost(playerId: str) -> bool
```

- playerId: str，目标玩家 entityId，必须为当前在线玩家。

**返回值**：bool，是否转移成功。非联机大厅、目标不在线、目标非玩家、或与当前房主相同时返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
lobbyComp = serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)
lobbyComp.TransferRoomHost(targetPlayerId)
```

</TabItem>
</Tabs>

---

### TransferRoomHostByUid

<Server/> LobbyGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)`

通过 uid 将联机大厅房主转移给指定在线玩家。仅联机大厅可用，且目标玩家必须在线。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
TransferRoomHostByUid(playerUid: str) -> bool
```

- playerUid: str，目标玩家 uid，必须为当前在线玩家。

**返回值**：bool，是否转移成功。非联机大厅、目标不在线、或与当前房主相同时返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
levelId = serverApi.GetLevelId()
lobbyComp = serverApi.GetEngineCompFactory().CreateLobbyGame(levelId)
lobbyComp.TransferRoomHostByUid(targetUid)
```

</TabItem>
</Tabs>

---
