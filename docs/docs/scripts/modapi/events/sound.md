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

音乐停止时，当玩家调用 [StopCustomMusic](/docs/docs/scripts/modapi/audio#stopcustommusic) 来停止自定义背景音乐时，会触发该事件。

```python
def OnOnMusicStopClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["musicName"]: str，音乐名称。

---

### PlayMusicClientEvent

<Client/>

播放背景音乐时触发。

```python
def OnPlayMusicClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["name"]: str，即资源包中 sounds/music_definitions.json 中的 event_name，并且对应 sounds/sound_definitions.json 中的 key。
- args["cancel"]: bool，设为 True 可屏蔽该次音效播放。

---

### PlaySoundClientEvent

<Client/>

播放场景音效或 UI 音效时触发。

```python
def OnPlaySoundClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["name"]: str，即资源包中 sounds/sound_definitions.json 中的 key。
- args["pos"]: Tuple[float, float, float]，音效播放的位置。UI 音效为(0,0,0)。
- args["volume"]: float，音量，范围为 0-1。
- args["pitch"]: float，播放速度，正常速度为 1。
- args["cancel"]: bool，设为 True 可屏蔽该次音效播放。

---
