---
sidebar_position: 5
---

# 声音

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录声音播放相关接口。

---

## 播放选项

### WorldSoundOptions 接口

<Version type="script" add="1.2.0"/>

[Dimension.playSound](./main#playsound-方法)的附加选项。

```typescript
interface WorldSoundOptions {
    isBroadcast?: boolean;
    loopCount?: number;
    pitch?: number;
    volume?: number;
}
```

#### 属性

- <Version type="script" add="2.11.0" inline/> <Optional/> isBroadcast: boolean，设为`true`时向所有玩家广播该声音，而不是只让附近的玩家听到。
- <Version type="script" add="2.11.0" inline/> <Optional/> loopCount: number，首次播放后额外重复的次数。`0`（默认）表示只播放一次，`-1`表示无限循环，正整数`N`表示总共播放 N + 1 次，例如`loopCount: 1`会播放两次。该值在声音开始播放时固定，之后不能更改；使用`-1`时须留意 SoundInstance 的句柄生命周期要求。
- <Optional/> pitch: number，播放该声音时的音调。
- <Optional/> volume: number，播放该声音时的相对音量与可听范围。

---

## 声音实例

### SoundInstance 类

<Version type="script" add="2.9.0"/>

一个正在播放的声音的句柄，需要通过它控制播放过程（例如 stop、setVolume、setPitch、fade、seekTo）。以`loop: -1`开始的无限循环声音会在最后一个[SoundInstance](#soundinstance-类)引用被丢弃时自动停止，因此需要保留句柄直到声音播完。

```typescript
class SoundInstance {
    private constructor();
    readonly durationInfo?: SoundDurationInfo;
    readonly id: string;
    readonly recipient?: Player;
    readonly soundEventId: string;
    fade(duration: number, targetVolume: number): void;
    pause(): void;
    resume(): void;
    seekTo(seconds: number): void;
    setPitch(pitch: number): void;
    setVolume(volume: number): void;
    stop(): void;
}
```

#### 属性

- <Version type="script" add="2.10.0" inline/> <ReadOnly/> <Optional/> durationInfo: [SoundDurationInfo](#sounddurationinfo-类)，该声音的时长与播放信息；声音未声明时长时为`undefined`。
- <Version type="script" add="2.10.0" inline/> <ReadOnly/> id: string，该声音实例的唯一标识符。
- <Version type="script" add="2.10.0" inline/> <ReadOnly/> <Optional/> recipient: [Player](../entity_and_player/player#player-类)，播放该声音的玩家；声音向所有玩家广播时为`undefined`。
- <Version type="script" add="2.10.0" inline/> <ReadOnly/> soundEventId: string，该声音实例启动时所使用的声音事件标识符。

#### fade 方法

<Version type="script" add="2.11.0" inline/> <RestrictedMode inline/>

在指定的时长内，把该声音实例从当前音量倍率淡入或淡出到目标倍率。音量倍率相对于所选声音变体的音量；要从静音淡入，需先调用`setVolume(0.0)`，要淡出则传入 0.0 作为目标音量。

```typescript
fade(duration: number, targetVolume: number): void
```

- duration: number，淡入淡出的时长，以秒为单位，最小值为 0。
- targetVolume: number，目标音量倍率，相对于所选声音变体的音量，最小值为 0。

#### pause 方法

<Version type="script" add="2.11.0" inline/> <RestrictedMode inline/>

暂停该声音的播放。

```typescript
pause(): void
```

#### resume 方法

<Version type="script" add="2.11.0" inline/> <RestrictedMode inline/>

继续播放已暂停的该声音。

```typescript
resume(): void
```

#### seekTo 方法

<Version type="script" add="2.11.0" inline/> <RestrictedMode inline/>

设置该声音实例的播放位置。

```typescript
seekTo(seconds: number): void
```

- seconds: number，要跳转到的播放位置，以秒为单位，取值范围为 0 到 107374184；若该声音有已知时长且超过该时长则抛出错误。

#### setPitch 方法

<Version type="script" add="2.11.0" inline/> <RestrictedMode inline/>

设置该声音实例的音调倍率。

```typescript
setPitch(pitch: number): void
```

- pitch: number，音调倍率，1.0 为正常音调，取值范围为 0.01 到 10.0。

#### setVolume 方法

<Version type="script" add="2.11.0" inline/> <RestrictedMode inline/>

设置该声音实例相对于所选声音变体音量的音量倍率。

```typescript
setVolume(volume: number): void
```

- volume: number，音量倍率，1.0 表示使用所选声音变体本身的音量，取值范围为 0 到 10.0。

#### stop 方法

<RestrictedMode inline/>

停止该声音实例的播放。

```typescript
stop(): void
```

### SoundDurationInfo 类

<Version type="script" add="2.10.0"/>

已声明时长的声音的时长与播放信息。

```typescript
class SoundDurationInfo {
    private constructor();
    readonly duration: number;
    readonly isActive: boolean;
    getPlaybackPosition(): number;
}
```

#### 属性

- <ReadOnly/> duration: number，该声音的总时长，以秒为单位。
- <ReadOnly/> isActive: boolean，该声音是否仍在被追踪。

#### getPlaybackPosition 方法

<RestrictedMode inline/>

```typescript
getPlaybackPosition(): number
```

**返回值**：number，该声音当前的播放位置，以秒为单位，自声音开头起算。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
