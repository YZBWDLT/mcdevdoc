---
sidebar_position: 10
---

# 音效

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录音效相关的事件，共 3 个。监听方式见[事件工作机制](/docs/docs/scripts/modapi/overview#事件)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/yinxiao.html"/>

---

### OnMusicStopClientEvent

<Client/>

音乐停止时，当玩家调用 [StopCustomMusic](/docs/docs/scripts/modapi/interfaces/audio#stopcustommusic) 来停止自定义背景音乐时，会触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnMusicStopClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| musicName | str | 音乐名称。 |

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
            "OnMusicStopClientEvent",
            self, self.OnOnMusicStopClientEvent)

    def OnOnMusicStopClientEvent(self, args):
        musicName = args["musicName"]
```

</TabItem>
</Tabs>

---

### PlayMusicClientEvent

<Client/>

播放背景音乐时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayMusicClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| name | str | 即资源包中 sounds/music_definitions.json 中的 event_name，并且对应 sounds/sound_definitions.json 中的 key。 |
| cancel | bool | 设为 True 可屏蔽该次音效播放。 |

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
            "PlayMusicClientEvent",
            self, self.OnPlayMusicClientEvent)

    def OnPlayMusicClientEvent(self, args):
        name = args["name"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### PlaySoundClientEvent

<Client/>

播放场景音效或 UI 音效时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlaySoundClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| name | str | 即资源包中 sounds/sound_definitions.json 中的 key。 |
| pos | Tuple[float, float, float] | 音效播放的位置。UI 音效为(0,0,0)。 |
| volume | float | 音量，范围为 0-1。 |
| pitch | float | 播放速度，正常速度为 1。 |
| cancel | bool | 设为 True 可屏蔽该次音效播放。 |

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
            "PlaySoundClientEvent",
            self, self.OnPlaySoundClientEvent)

    def OnPlaySoundClientEvent(self, args):
        name = args["name"]
        pos = args["pos"]
        volume = args["volume"]
        pitch = args["pitch"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---
