---
sidebar_position: 20
---

# 成就

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录成就相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/chengjiu.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### LobbyGetAchievementStorage

<Version type="china" add="2.2"/>

<Server/> AchievementCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAchievement(levelId)`

获取成就节点的存储的数据。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LobbyGetAchievementStorage(callback: Callable, playerId: int) -> Any
```

- callback: Callable，请求回调函数。
- playerId: int，玩家 playerId。

**备注**

- callback 需要接受一个参数，当请求失败时，参数返回 None。当请求成功时，参数为一个 dict，包含返回码，最新数据等信息。当 code 为 0 时，表示设置成功。当 code 为 5 时，表示数据冲突。callback 参数如下。

```python
{
    "code": 0,
    "message": "正常返回",
    "details": "",
    "entity": [
        {
            "achievement_id": "Node2",
            "completed_at": 1652950659,
            "extra": "",
            "max_progress": 10,
            "progress": 10,
            "version": 4
        }
    ]
}
```

- 可通过"completed_at"判断成就是否完成，非 0 为完成，请勿使用"max_progress"与"progress"比较判断是否完成。

</TabItem>
<TabItem value="示例" label="示例">

```python
{
    "code": 0,
    "message": "正常返回",
    "details": "",
    "entity": [
        {
            "achievement_id": "Node2",
            "completed_at": 1652950659,
            "extra": "",
            "max_progress": 10,
            "progress": 10,
            "version": 4
        }
    ]
}
```

</TabItem>
</Tabs>

---

### LobbySetAchievementStorage

<Version type="china" add="2.2"/>

<Server/> AchievementCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateAchievement(levelId)`

添加成就节点的进度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LobbySetAchievementStorage(
    callback: Callable,
    playerId: int,
    nodeId: str,
    delta: int,
    getExtraData: Callable,
) -> Any
```

- callback: Callable，请求回调函数。
- playerId: int，玩家 playerId。
- nodeId: str，成就节点 ID。
- delta: int，进度值的变化量（必须大于 0）。
- getExtraData: Callable，用于返回存储更新后的数据的函数，返回值必须为 str 类型，可选。

**备注**

- callback 需要接受一个参数，当请求失败时，参数返回 None。当请求成功时，参数为一个 dict，包含返回码和设置进度前的数据信息。当 code 为 0 时，表示设置成功。当 code 为 5 时，表示数据冲突。此时系统不会存储此次上传的数据，当开发者通过 callback 处理完冲突后，必须返回一个 Bool 值。当 callback 的返回值为 True，系统会自动再自动调用一次 getExtra 来获取最新的 extra 数据，并自动存储进度与 extra。如果不想系统再自动调用，将 callback 返回值设置为 False，系统将不会再进行一次进度存储 callback 参数如下。

```python
{
    "code": 5,
    "message": "操作冲突",
    "details": "",
    "entity": {
        "completed_at": 0,
        "extra": "",
        "progress": 1,
        "version": 1
    }
}
```

- 可通过"completed_at"判断成就是否完成，非 0 为完成，请勿使用"max_progress"与"progress"比较判断是否完成。

</TabItem>
<TabItem value="示例" label="示例">

```python
{
    "code": 5,
    "message": "操作冲突",
    "details": "",
    "entity": {
        "completed_at": 0,
        "extra": "",
        "progress": 1,
        "version": 1
    }
}
```

</TabItem>
</Tabs>

---
