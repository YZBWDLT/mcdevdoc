---
sidebar_position: 0
---

# 通用

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录在各分类间通用的接口。

---

## 坐标

### Vector3 接口

表示一个向量。

```typescript
interface Vector3 {
    x: number;
    y: number;
    z: number;
}
```

- x: number，向量的 X 坐标。
- y: number，向量的 Y 坐标。
- z: number，向量的 Z 坐标。

### Vector2 接口

<Version type="script" add="1.3.0"/>

表示一个二维向量。

```typescript
interface Vector2 {
    x: number;
    y: number;
}
```

#### 属性

- x: number，二维向量的 X 分量。
- y: number，二维向量的 Y 分量。

### VectorXZ 接口

<Version type="script" add="1.13.0"/>

表示一个水平面上的二维向量，只有 X、Z 两个分量。

```typescript
interface VectorXZ {
    x: number;
    z: number;
}
```

#### 属性

- x: number，向量的 X 坐标。
- z: number，向量的 Z 坐标。

### DimensionLocation 接口

<Version type="script" add="1.4.0"/>

世界中的精确坐标，包含所属维度与具体位置。

```typescript
interface DimensionLocation {
    dimension: Dimension;
    x: number;
    y: number;
    z: number;
}
```

#### 属性

- dimension: [Dimension](./dimension/main#dimension-类)，该坐标关联的维度。
- x: number，该维度位置的 X 分量。
- y: number，该维度位置的 Y 分量。
- z: number，该维度位置的 Z 分量。

---

## 颜色

### RGB 接口

<Version type="script" add="1.5.0"/>

表示一个可完全自定义的颜色，各分量取值范围为 0 到 1.0。

```typescript
interface RGB {
    blue: number;
    green: number;
    red: number;
}
```

#### 属性

- blue: number，颜色的蓝色分量。
- green: number，颜色的绿色分量。
- red: number，颜色的红色分量。

### RGBA 接口

<Version type="script" add="1.5.0"/>

在[RGB](#rgb-接口)的基础上追加透明度分量，取值范围为 0（完全透明）到 1.0（完全不透明）。

```typescript
interface RGBA extends RGB {
    alpha: number;
}
```

#### 属性

- alpha: number，颜色的透明度分量。

---

## 碰撞箱

### AABB 接口

<Version type="script" add="2.4.0"/>

表示一个轴对齐的碰撞箱。

```typescript
interface AABB {
    center: Vector3;
    extent: Vector3;
}
```

#### 属性

- center: [Vector3](#vector3-接口)，该碰撞箱的中心点。
- extent: [Vector3](#vector3-接口)，中心点到碰撞箱各边界的距离，相当于长、高、宽的一半，始终按正数处理。

---

## 方向

### Direction 枚举

<Version type="script" add="1.4.0"/>

通用的相对方位枚举。

```typescript
enum Direction {
    Down = "Down", // 该方块下方的方块（y - 1）
    East = "East", // 该方块东侧的方块（x + 1）
    North = "North", // 该方块北侧的方块（z + 1）
    South = "South", // 该方块南侧的方块（z - 1）
    Up = "Up", // 该方块上方的方块（y + 1）
    West = "West", // 该方块西侧的方块（x - 1）
}
```

---

## 筛选器

### EntityFilter 接口

<Version type="script" add="1.11.0"/>

筛选实体时使用的条件集合，[EntityQueryOptions](./entity_and_player/entity#entityqueryoptions-接口)与[EntityRaycastOptions](./dimension/raycast#entityraycastoptions-接口)继承其中的全部字段。

```typescript
interface EntityFilter {
    excludeFamilies?: string[];
    excludeGameModes?: GameMode[];
    excludeNames?: string[];
    excludeTags?: string[];
    excludeTypes?: string[];
    families?: string[];
    gameMode?: GameMode;
    maxHorizontalRotation?: number;
    maxLevel?: number;
    maxVerticalRotation?: number;
    minHorizontalRotation?: number;
    minLevel?: number;
    minVerticalRotation?: number;
    name?: string;
    propertyOptions?: EntityQueryPropertyOptions[];
    scoreOptions?: EntityQueryScoreOptions[];
    tags?: string[];
    type?: string;
}
```

#### 属性

- <Optional/> excludeFamilies: string[]，排除属于指定族系中任一族系的实体。
- <Optional/> excludeGameModes: [GameMode](./entity_and_player/player#gamemode-枚举)[]，排除处于指定游戏模式的实体。
- <Optional/> excludeNames: string[]，排除名称与指定值之一相同的实体。
- <Optional/> excludeTags: string[]，排除带有指定标签中任一标签的实体。
- <Optional/> excludeTypes: string[]，排除属于指定类型之一的实体。
- <Optional/> families: string[]，指定时只包含同时属于全部指定族系的实体。
- <Optional/> gameMode: [GameMode](./entity_and_player/player#gamemode-枚举)，指定时只包含处于该游戏模式的实体。
- <Optional/> maxHorizontalRotation: number，指定时只包含水平旋转角不大于该值的实体。
- <Optional/> maxLevel: number，指定时只包含等级不高于该值的玩家。
- <Optional/> maxVerticalRotation: number，指定时只包含垂直旋转角不大于该值的实体。
- <Optional/> minHorizontalRotation: number，指定时只包含水平旋转角不小于该值的实体。
- <Optional/> minLevel: number，指定时只包含等级不低于该值的玩家。
- <Optional/> minVerticalRotation: number，指定时只包含垂直旋转角不小于该值的实体。
- <Optional/> name: string，只包含具有该名称的实体。
- <Version type="script" add="1.14.0" inline/> <Optional/> propertyOptions: [EntityQueryPropertyOptions](./entity_and_player/entity#entityquerypropertyoptions-接口)[]，按实体属性筛选实体时使用的条件集合。
- <Optional/> scoreOptions: [EntityQueryScoreOptions](./entity_and_player/entity#entityqueryscoreoptions-接口)[]，按记分项分数筛选实体时使用的条件集合。
- <Optional/> tags: string[]，只包含同时带有全部指定标签的实体。
- <Optional/> type: string，指定时只包含该类型的实体。

### BlockFilter 接口

<Version type="script" add="1.11.0"/>

按类型、标签或方块置换包含或排除方块的条件集合。未设置任何包含条件时，选中所有未被排除条件排除的方块；设置了至少一个包含条件时，方块必须匹配其中之一。[BlockQueryOptions](./dimension/volume#blockqueryoptions-接口)与[BlockRaycastOptions](./dimension/raycast#blockraycastoptions-接口)继承其中的全部字段。

```typescript
interface BlockFilter {
    excludePermutations?: BlockPermutation[];
    excludeTags?: string[];
    excludeTypes?: string[];
    includePermutations?: BlockPermutation[];
    includeTags?: string[];
    includeTypes?: string[];
}
```

#### 属性

- <Optional/> excludePermutations: [BlockPermutation](./block/main#blockpermutation-类)[]，若与其中的任意方块置换匹配，则被该筛选条件排除。
- <Optional/> excludeTags: string[]，若与其中的任意方块标签匹配，则被该筛选条件排除。
- <Optional/> excludeTypes: string[]，若属于其中的任意方块类型，则被该筛选条件排除。
- <Optional/> includePermutations: [BlockPermutation](./block/main#blockpermutation-类)[]，若与其中的任意方块置换匹配，则被该筛选条件选中。
- <Optional/> includeTags: string[]，若与其中的任意方块标签匹配，则被该筛选条件选中。
- <Optional/> includeTypes: string[]，若属于其中的任意方块类型，则被该筛选条件选中。

---

## 声音

### SoundDefinition 类

<Version type="script" add="2.10.0"/>

`sound_definitions.json`中声明的一条声音的静态元数据。

```typescript
class SoundDefinition {
    private constructor();
    readonly durationInfo?: SoundDefinitionDurationInfo;
    readonly musicInfo?: SoundDefinitionMusicInfo;
    readonly soundEventId: string;
    readonly tags?: Record<string, string[]>;
}
```

#### 属性

- <ReadOnly/> <Optional/> durationInfo: [SoundDefinitionDurationInfo](#sounddefinitiondurationinfo-接口)，该声音声明的时长信息；未声明时长时为`undefined`。
- <ReadOnly/> <Optional/> musicInfo: [SoundDefinitionMusicInfo](#sounddefinitionmusicinfo-接口)，该声音声明的音乐信息；未声明`music_info`时为`undefined`。
- <ReadOnly/> soundEventId: string，该定义所声明的声音事件标识符，形式为`namespace:name`。
- <ReadOnly/> <Optional/> tags: Record&lt;string, string[]&gt;，该声音声明的标签，以标签名到取值数组的映射表示。

### SoundDefinitionDurationInfo 接口

<Version type="script" add="2.10.0"/>

声音定义中声明的时长信息。

```typescript
interface SoundDefinitionDurationInfo {
    duration: number;
}
```

#### 属性

- duration: number，该声音的时长，以秒为单位。

### SoundDefinitionMusicInfo 接口

<Version type="script" add="2.10.0"/>

声音定义中声明的音乐信息。

```typescript
interface SoundDefinitionMusicInfo {
    artist?: string;
    genres?: string[];
    moods?: string[];
    title?: string;
}
```

#### 属性

- <Optional/> artist: string，该音乐的作者。
- <Optional/> genres: string[]，该音乐所属的流派。
- <Optional/> moods: string[]，该音乐的情绪分类。
- <Optional/> title: string，该音乐的标题。

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
- <Version type="script" add="2.10.0" inline/> <ReadOnly/> <Optional/> recipient: [Player](./entity_and_player/player#player-类)，播放该声音的玩家；声音向所有玩家广播时为`undefined`。
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

### WorldSoundOptions 接口

<Version type="script" add="1.2.0"/>

播放声音时的附加选项，用于[Dimension.playSound](./dimension/main#playsound-方法)与[BlockInstrumentComponent.playInstrumentSound](./block/component#playinstrumentsound-方法)。

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
- <Version type="script" add="2.11.0" inline/> <Optional/> loopCount: number，首次播放后额外重复的次数。`0`（默认）表示只播放一次，`-1`表示无限循环，正整数`N`表示总共播放 N + 1 次，例如`loopCount: 1`会播放两次。该值在声音开始播放时固定，之后不能更改；使用`-1`时须留意[SoundInstance](#soundinstance-类)的句柄生命周期要求。
- <Optional/> pitch: number，播放该声音时的音调。
- <Optional/> volume: number，播放该声音时的相对音量与可听范围。

### PlayerSoundOptions 接口

<Version type="script" add="1.2.0"/>

为玩家播放声音的附加选项。

```typescript
interface PlayerSoundOptions {
    location?: Vector3;
    loopCount?: number;
    pitch?: number;
    volume?: number;
}
```

#### 属性

- <Optional/> location: [Vector3](#vector3-接口)，声音播放的位置；未指定时，声音在玩家附近播放。
- <Version type="script" add="2.11.0" inline/> <Optional/> loopCount: number，声音循环播放的次数。
- <Optional/> pitch: number，声音的音高（可选）。
- <Optional/> volume: number，声音的音量（可选）。

### MusicOptions 接口

<Version type="script" add="1.2.0"/>

播放音乐时的附加选项，用于[World.playMusic](./world/main#playmusic-方法)、[World.queueMusic](./world/main#queuemusic-方法)与[Player.playMusic](./entity_and_player/player#playmusic-方法)。

```typescript
interface MusicOptions {
    fade?: number;
    loop?: boolean;
    volume?: number;
}
```

#### 属性

- <Optional/> fade: number，音乐结束时的淡出重叠时长。
- <Optional/> loop: boolean，是否循环播放该音乐。
- <Optional/> volume: number，音乐的相对音量。

---

## 原始消息

### RawMessage 接口

<Version type="script" add="1.1.0"/>

用于描述一段可本地化的消息。

```typescript
interface RawMessage {
    rawtext?: RawMessage[];
    score?: RawMessageScore;
    text?: string;
    translate?: string;
    with?: string[] | RawMessage;
}
```

#### 属性

- rawtext: [RawMessage](#rawmessage-接口)[]，当前消息的原始文本（rawtext）等价表示。
- score: [RawMessageScore](#rawmessagescore-接口)，会被替换为记分板分数值的占位符。
- text: string，要使用的字符串字面值。
- translate: string，翻译标识符；若客户端拥有匹配该标识符的语言资源，会本地化为对应语言。
- with: string[] | [RawMessage](#rawmessage-接口)，翻译标识符的参数。

### RawMessageScore 接口

<Version type="script" add="1.1.0"/>

表示会被替换为记分板分数值的占位符。

```typescript
interface RawMessageScore {
    name?: string;
    objective?: string;
}
```

#### 属性

- name: string，要匹配的分数的名称。
- objective: string，要匹配的分数的记分项。

---

## 组件

### Component 类

<Version type="script" add="1.2.0"/>

所有组件的基类，提供组件的通用信息。

```typescript
class Component {
    private constructor();
    readonly isValid: boolean;
    readonly typeId: string;
}
```

#### 属性

- <ReadOnly/> isValid: boolean，该组件是否有效；其所属对象有效、且该组件自身校验通过时，组件才有效。
- <ReadOnly/> typeId: string，该组件的标识符。

---

## 错误

### CommandError 类

<Version type="script" add="1.4.0"/>

执行命令失败时抛出该错误。

```typescript
class CommandError extends Error {
    private constructor();
}
```

### RawMessageError 类

<Version type="script" add="1.19.0"/>

原始消息的格式不合法时抛出该错误。

```typescript
class RawMessageError extends Error {
    private constructor();
}
```

### NamespaceNameError 类

<Version type="script" add="1.18.0"/>

名称需要使用命名空间、而命名空间校验失败时抛出该错误，可通过`reason`判断具体原因。

```typescript
class NamespaceNameError extends Error {
    private constructor();
    readonly reason: NamespaceNameErrorReason;
}
```

#### 属性

- <ReadOnly/> reason: [NamespaceNameErrorReason](#namespacenameerrorreason-枚举)，该错误的产生原因。

### NamespaceNameErrorReason 枚举

<Version type="script" add="1.18.0"/>

命名空间校验失败的原因。

```typescript
enum NamespaceNameErrorReason {
    DisallowedNamespace = "DisallowedNamespace", // 使用了不允许的命名空间
    NoNamespace = "NoNamespace", // 名称缺少命名空间
}
```

### LocationInUnloadedChunkError 类

<Version type="script" add="1.4.0"/>

给定位置或区域所在的区块尚未加载时抛出该错误。

```typescript
class LocationInUnloadedChunkError extends Error {
    private constructor();
}
```

### LocationOutOfWorldBoundariesError 类

<Version type="script" add="1.4.0"/>

给定位置或区域超出维度的最低或最高高度限制时抛出该错误。

```typescript
class LocationOutOfWorldBoundariesError extends Error {
    private constructor();
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
