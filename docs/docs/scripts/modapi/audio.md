---
sidebar_position: 15
---

# 音效

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录音效相关的接口，共 8 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/yinxiao.html"/>

---

### DisableOriginMusic

<Client/> AudioCustomComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)`

停止原生背景音乐。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DisableOriginMusic(disable: bool) -> bool
```

- disable: bool，True 表示停止，False 表示恢复。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)
comp.DisableOriginMusic(True)
```

</TabItem>
</Tabs>

---

### PlayCustomMusic

<Client/> AudioCustomComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)`

播放场景音效，包括原版音效及自定义音效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayCustomMusic(
    name: str,
    pos: Tuple[float, float, float],
    volume: float,
    pitch: float,
    loop: bool,
    entityId: Optional[str] = None,
) -> str
```

- name: str，音效名称。
- pos: Tuple[float, float, float]，播放位置。
- volume: float，音量倍率，范围 0-1，与 json 中的 volume 乘算后为游戏中实际播放的音量大小。
- pitch: float，播放速度，范围 0-256，1 表示原速，可以从 json 文件里进行修改。
- loop: bool，是否循环播放。
- entityId: Optional[str]，绑定的实体 id，默认为 None，若有绑定的实体，则 pos 参数为相对于实体的坐标。

**返回值**：str，音乐播放 id，可用于控制音乐的停止和循环。

**备注**

- 当播放音乐错误时，将返回相应的错误 id。

| 错误 | 错误描述 |
| --- | --- |
| -1 | 无法在服务端播放音效 |
| -2 | 播放位置错误 |
| -3 | 已有同名背景音乐正在播放 |
| -4 | 播放失败 |
| -5 | 绑定实体不存在 |
| -6 | **位置距离本地玩家距离大于 16 格，跳过音效播放**（绑定实体的音效不受此限制） |

- 当背景音乐在播放的时候，请不要播放同名的场景音效。
- 针对比较大的音乐，请将 load_on_low_memory 和 stream 设为 true。但使用 stream 的音频无法同时播放两个音效实例，多次调用的效果是从头播放音频（不使用 stream 的音频，多次调用会同时播放多个）。
- 该接口触发 [PlaySoundClientEvent](/docs/docs/scripts/modapi/events/sound#playsoundclientevent)。
- 与示例对应的 sound_definitions.json 配置：

```json
{
  "sound001": {
    "min_distance": 0,
    "max_distance": 20.0,
    "sounds": [
      {
        "name": "sounds/testaudio/largeBlast1",
        "load_on_low_memory": true,
        "stream": true,
        "pitch": 1,
        "volume": 1
      }
    ]
  }
}
```

</TabItem>
<TabItem value="示例" label="示例">

```json
{
  "sound001": {
    "min_distance": 0,
    "max_distance": 20.0,
    "sounds": [
      {
        "name": "sounds/testaudio/largeBlast1",
        "load_on_low_memory": true,
        "stream": true,
        "pitch": 1,
        "volume": 1
      }
    ]
  }
}
```

</TabItem>
</Tabs>

---

### PlayCustomUIMusic

<Client/> AudioCustomComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)`

播放 UI 音效，包括原版音效及自定义音效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayCustomUIMusic(name: str, volume: float, pitch: float, loop: bool) -> str
```

- name: str，音效名称。
- volume: float，音量倍率，范围 0-1，与 json 中的 volume 乘算后为游戏中实际播放的音量大小。
- pitch: float，播放速度，范围 0-256，1 表示原速，可以从 json 文件里进行修改。
- loop: bool，是否循环播放。

**返回值**：str，音乐播放 id，可用于控制音乐的停止和循环。

**备注**

- 当播放音乐错误时，将返回相应的错误 id。

| 错误 | 错误描述 |
| --- | --- |
| -1 | 无法在服务端播放音效 |
| -2 | 播放失败 |
| -3 | 已有同名背景音乐正在播放 |

- 当背景音乐在播放的时候，请不要播放同名的场景音效。
- 该接口触发 [PlaySoundClientEvent](/docs/docs/scripts/modapi/events/sound#playsoundclientevent)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)
musicId = comp.PlayCustomUIMusic("mob.cat.beg", 1, 1, False)
```

</TabItem>
</Tabs>

---

### PlayGlobalCustomMusic

<Client/> AudioCustomComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)`

播放背景音乐。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayGlobalCustomMusic(name: str, volume: float, loop: bool) -> bool
```

- name: str，音乐名称。
- volume: float，音量大小，范围 0-1，与 json 中的 volume 乘算后为游戏中实际播放的音量大小。
- loop: bool，是否循环播放。

**返回值**：bool，播放是否成功。

**备注**

- 背景音乐同时仅能播放一个，当播放背景音乐时，会停止掉当前播放的音乐。这个规则也包括原版的背景音乐，所以为了避免原版背景音乐覆盖掉自定义背景音乐，建议先使用 [DisableOriginMusic](/docs/docs/scripts/modapi/audio#disableoriginmusic) 屏蔽原版背景音乐。
- 背景音乐的优先级大于场景音效，当背景音乐在播放时，会让同名场景音效播放失败。
- 背景音乐的播放速度需要从配置 json 里进行修改。
- 针对比较大的背景音乐，请将 load_on_low_memory 和 stream 设为 true。
- 背景音乐需要在 json 里定义 category 为 music。
- 该接口触发 [PlayMusicClientEvent](/docs/docs/scripts/modapi/events/sound#playmusicclientevent)。
- 与示例对应的 sound_definitions.json 配置：

```json
{
  "Gsound001": {
    "category": "music",
    "sounds": [
      {
        "name": "sounds/testaudio/Music001",
        "load_on_low_memory": true,
        "stream": true,
        "pitch": 1,
        "volume": 1
      }
    ]
  }
}
```

</TabItem>
<TabItem value="示例" label="示例">

```json
{
  "Gsound001": {
    "category": "music",
    "sounds": [
      {
        "name": "sounds/testaudio/Music001",
        "load_on_low_memory": true,
        "stream": true,
        "pitch": 1,
        "volume": 1
      }
    ]
  }
}
```

</TabItem>
</Tabs>

---

### SetCustomMusicLoop

<Client/> AudioCustomComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)`

设定指定音乐是否循环播放，包括场景音效与背景音乐。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCustomMusicLoop(name: str, loop: bool) -> bool
```

- name: str，音乐名称。
- loop: bool，True 则循环播放，False 则停止循环，停止会持续到播放到本次结束。

**返回值**：bool，停止是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)
comp.SetCustomMusicLoop("soundName", True)
```

</TabItem>
</Tabs>

---

### SetCustomMusicLoopById

<Client/> AudioCustomComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)`

设定指定音乐是否循环播放。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCustomMusicLoopById(musicId: str, loop: bool) -> bool
```

- musicId: str，音乐 id，播放指定音乐获取的音乐 id。
- loop: bool，True 则循环播放，False 则停止循环，停止会持续到播放到本次结束。

**返回值**：bool，停止是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)
musicId = comp.PlayCustomMusic("sound001", (1,1,1), 1, 1, False, False)
comp.SetCustomMusicLoopById(musicId, True)
```

</TabItem>
</Tabs>

---

### StopCustomMusic

<Client/> AudioCustomComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)`

停止音效，包括场景音效与背景音乐，将依据 fadeOutTime 触发 [OnMusicStopClientEvent](/docs/docs/scripts/modapi/events/sound#onmusicstopclientevent) 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopCustomMusic(name: str, fadeOutTime: float) -> bool
```

- name: str，音乐名称。
- fadeOutTime: float，停止的淡出时间，单位为秒，如果剩余时间小于淡出时间，将以剩余时间为准。

**返回值**：bool，停止是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)
comp.StopCustomMusic("music.global0", 0)
```

</TabItem>
</Tabs>

---

### StopCustomMusicById

<Client/> AudioCustomComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)`

停止场景音效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopCustomMusicById(musicId: str, fadeOutTime: float) -> bool
```

- musicId: str，音乐 id，播放指定音乐获取的音乐 id。
- fadeOutTime: float，停止的淡出时间，单位为秒。

**返回值**：bool，停止是否成功。

**备注**

- 使用 [PlayCustomMusic](/docs/docs/scripts/modapi/audio#playcustommusic) 播放音效或音乐后，7 帧内再使用 StopCustomMusicById 接口停止播放该 musicId 音乐/音效，会有概率停止失败，且后续再使用 StopCustomMusicById 接口停止播放该 musicId 音乐/音效无效。因此在上述情况下，建议开发者使用计时器延迟 15 帧以上执行该接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateCustomAudio(levelId)
musicId = comp.PlayCustomMusic("sound001", (1,1,1), 1, 1, False, False)
comp.StopCustomMusicById(musicId, 0)
```

</TabItem>
</Tabs>

---
