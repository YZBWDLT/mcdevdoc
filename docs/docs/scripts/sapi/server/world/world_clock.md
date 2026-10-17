---
sidebar_position: 6
---

# 世界时钟

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录世界时钟相关接口。

---

## 世界时钟

### WorldClock 类

<Version type="script" add="2.11.0"/>

表示世界中的一个计时器，其时间推进独立于世界的昼夜时间。可通过[World.getClock](./main#getclock-方法)按名称获取。

```typescript
class WorldClock {
    private constructor();
    isPaused: boolean;
    readonly name: string;
    time: number;
    readonly timeMarkers: TimeMarker[];
    addTimeMarker(timeMarkerOptions: TimeMarkerOptions): void;
    removeTimeMarker(timeMarker: string | TimeMarker): void;
    rewindTo(timeMarker: string | TimeMarker): void;
    set(timeMarker: string | TimeMarker): void;
    skipTo(timeMarker: string | TimeMarker): void;
}
```

#### 属性

- <RestrictedMode inline/> isPaused: boolean，该计时器当前是否处于暂停状态。
- <ReadOnly/> name: string，该计时器的标识符。
- <RestrictedMode inline/> time: number，该计时器当前的时间，以游戏刻为单位，最小值为 0。
- <ReadOnly/> timeMarkers: [TimeMarker](#timemarker-类)[]，该计时器当前已有的全部时间标记。

#### addTimeMarker 方法

<RestrictedMode inline/>

为该计时器新增一个时间标记。

```typescript
addTimeMarker(timeMarkerOptions: TimeMarkerOptions): void
```

- timeMarkerOptions: [TimeMarkerOptions](#timemarkeroptions-接口)，创建时间标记的选项。

#### removeTimeMarker 方法

<RestrictedMode inline/>

从该计时器上移除一个已存在的时间标记。

```typescript
removeTimeMarker(timeMarker: string | TimeMarker): void
```

- timeMarker: string | [TimeMarker](#timemarker-类)，要移除的时间标记，或其名称。

#### rewindTo 方法

<RestrictedMode inline/>

将该计时器的时间回退到指定时间标记的上一次出现处。

```typescript
rewindTo(timeMarker: string | TimeMarker): void
```

- timeMarker: string | [TimeMarker](#timemarker-类)，要回退到的时间标记，或其名称。

#### set 方法

<RestrictedMode inline/>

将该计时器的时间设为指定时间标记所在的时间。

```typescript
set(timeMarker: string | TimeMarker): void
```

- timeMarker: string | [TimeMarker](#timemarker-类)，要跳转到的时间标记，或其名称。

#### skipTo 方法

<RestrictedMode inline/>

将该计时器的时间前进到指定时间标记的下一次出现处；若下一次出现超出上限，则回到第一次出现处。

```typescript
skipTo(timeMarker: string | TimeMarker): void
```

- timeMarker: string | [TimeMarker](#timemarker-类)，要前进到的时间标记，或其名称。

### TimeMarker 类

<Version type="script" add="2.11.0"/>

计时器上的一个时间标记，可只出现一次，也可按周期重复出现。

```typescript
class TimeMarker {
    private constructor();
    readonly name: string;
    readonly period?: number;
    readonly time: number;
}
```

#### 属性

- <ReadOnly/> name: string，该时间标记的标识符。
- <ReadOnly/> <Optional/> period: number，该时间标记重复的间隔，以游戏刻为单位；未指定时表示只出现一次。
- <ReadOnly/> time: number，该时间标记在计时器上出现的时间，以游戏刻为单位。

### TimeMarkerOptions 接口

<Version type="script" add="2.11.0"/>

[WorldClock.addTimeMarker](#addtimemarker-方法)的选项，用于创建一个时间标记。

```typescript
interface TimeMarkerOptions {
    name: string;
    period?: number;
    time: number;
}
```

#### 属性

- name: string，该时间标记的名称，必须带命名空间且只含合法标识符字符，形如`mypack:my_time_marker`。
- <Optional/> period: number，该时间标记重复的间隔，以游戏刻为单位，最小值为 0；未指定时表示只出现一次。
- time: number，该时间标记出现的时间，以游戏刻为单位，最小值为 0。

---

## 错误

### WorldClockAddTimeMarkerError 类

<Version type="script" add="2.11.0"/>

为世界时钟添加时间标记失败时抛出该错误。

继承自Error。

```typescript
class WorldClockAddTimeMarkerError extends Error {
    private constructor();
}
```

### WorldClockInvalidRegistryError 类

<Version type="script" add="2.11.0"/>

在系统启动事件之外注册世界时钟时抛出该错误。

继承自Error。

```typescript
class WorldClockInvalidRegistryError extends Error {
    private constructor();
}
```

### WorldClockInvalidTimeMarkerError 类

<Version type="script" add="2.11.0"/>

时间标记已失效时抛出该错误，例如访问已被移除的时间标记的数据。

继承自Error。

```typescript
class WorldClockInvalidTimeMarkerError extends Error {
    private constructor();
}
```

### WorldClockNotFoundError 类

<Version type="script" add="2.11.0"/>

在世界时钟注册表中找不到指定的世界时钟时抛出该错误。

继承自Error。

```typescript
class WorldClockNotFoundError extends Error {
    private constructor();
}
```

### WorldClockRegistrationError 类

<Version type="script" add="2.11.0"/>

注册世界时钟失败时抛出该错误。

继承自Error。

```typescript
class WorldClockRegistrationError extends Error {
    private constructor();
}
```

### WorldClockReloadNewWorldClockError 类

<Version type="script" add="2.11.0"/>

重新加载时注册了此前不存在的世界时钟时抛出该错误；重新加载期间不能新增世界时钟。

继承自Error。

```typescript
class WorldClockReloadNewWorldClockError extends Error {
    private constructor();
}
```

### WorldClockReloadTimeMarkerError 类

<Version type="script" add="2.11.0"/>

重新加载时以无效的时间标记重新注册已有世界时钟时抛出该错误。

继承自Error。

```typescript
class WorldClockReloadTimeMarkerError extends Error {
    private constructor();
}
```

### WorldClockRemoveMinecraftTimeMarkerError 类

<Version type="script" add="2.11.0"/>

试图移除带有`minecraft`命名空间的时间标记时抛出该错误。

继承自Error。

```typescript
class WorldClockRemoveMinecraftTimeMarkerError extends Error {
    private constructor();
}
```

### WorldClockRewindError 类

<Version type="script" add="2.11.0"/>

世界时钟的时间已早于时间标记首次出现的时间时，[WorldClock.rewindTo](#rewindto-方法)抛出该错误。

继承自Error。

```typescript
class WorldClockRewindError extends Error {
    private constructor();
}
```

### WorldClockTimeMarkerNotFoundError 类

<Version type="script" add="2.11.0"/>

对世界时钟执行操作时找不到指定的时间标记，抛出该错误。

继承自Error。

```typescript
class WorldClockTimeMarkerNotFoundError extends Error {
    private constructor();
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
