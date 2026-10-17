---
sidebar_position: 0
---

# 系统

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import EarlyExecution from "/src/components/highlight/earlyExecution"

本文主要记录系统相关接口。`system` 是全局唯一的 `System` 实例，用于调度代码执行、获取系统前事件与系统后事件。

---

## 系统对象

### system 常量

<Version type="script" add="1.0.0"/>

```typescript
const system: System;
```

[System](#system-类)，表示一个系统，全局唯一，用于调度代码执行并提供系统事件。

### System 类

<Version type="script" add="1.0.0"/>

系统级接口，全局对象`system`是它的唯一实例。

```typescript
class System {
    private constructor();
    readonly afterEvents: SystemAfterEvents;
    readonly beforeEvents: SystemBeforeEvents;
    readonly currentTick: number;
    readonly isEditorWorld: boolean;
    readonly serverSystemInfo: SystemInfo;
    clearJob(jobId: number): void;
    clearRun(runId: number): void;
    run(callback: () => void): number;
    runInterval(callback: () => void, tickInterval?: number): number;
    runJob(generator: Generator<void, void, void>): number;
    runTimeout(callback: () => void, tickDelay?: number): number;
    sendScriptEvent(id: string, message: string): void;
    waitTicks(ticks: number): Promise<void>;
}
```

#### 属性

- <Version type="script" add="1.4.0" inline/> <ReadOnly/> afterEvents: [SystemAfterEvents](#systemafterevents-类)，系统后事件的事件集合。
- <Version type="script" add="2.0.0" inline/> <ReadOnly/> beforeEvents: [SystemBeforeEvents](#systembeforeevents-类)，系统前事件的事件集合。
- <Version type="script" add="1.1.0" inline/> <ReadOnly/> currentTick: number，服务器当前的世界游戏刻。
- <Version type="script" add="2.0.0" inline/> <ReadOnly/> isEditorWorld: boolean，当前世界是否已加载编辑器。
- <Version type="script" add="1.16.0" inline/> <ReadOnly/> serverSystemInfo: [SystemInfo](#systeminfo-类)，服务器的设备信息。

#### 方法

- <Version type="script" add="1.12.0" inline/> <EarlyExecution/> clearJob: (jobId: number) => void，取消通过`System.runJob`排队的任务。
- <Version type="script" add="1.1.0" inline/> <EarlyExecution/> clearRun: (runId: number) => void，取消此前通过`System.run`调度的函数。
- <EarlyExecution/> run: (callback: () => void) => number，在下一个可用的未来时刻运行指定的函数。常用于实现延迟行为与游戏循环。
- <Version type="script" add="1.1.0" inline/> <EarlyExecution/> runInterval: (callback: () => void, tickInterval?: number) => number，按固定间隔运行一段代码。
- <Version type="script" add="1.12.0" inline/> <EarlyExecution/> runJob: (generator: Generator&lt;void, void, void&gt;) => number，将一个生成器加入队列直到运行完毕。生成器每个游戏刻会获得一个时间片，运行到`yield`或结束时暂停。
- <Version type="script" add="1.1.0" inline/> <EarlyExecution/> runTimeout: (callback: () => void, tickDelay?: number) => number，在由`tickDelay`指定的未来时刻运行一段代码。
- <Version type="script" add="1.18.0" inline/> sendScriptEvent: (id: string, message: string) => void，以指定的消息标识符和负载触发一个脚本内事件。
- <Version type="script" add="1.12.0" inline/> <EarlyExecution/> waitTicks: (ticks: number) => Promise&lt;void&gt;，返回一个在指定游戏刻数后兑现的`Promise`。

### SystemBeforeEvents 类

<Version type="script" add="2.0.0"/>

系统前事件的事件集合。

```typescript
class SystemBeforeEvents {
    private constructor();
    readonly shutdown: ShutdownBeforeEventSignal;
    readonly startup: StartupBeforeEventSignal;
    readonly watchdogTerminate: WatchdogTerminateBeforeEventSignal;
}
```

#### 属性

- <ReadOnly/> shutdown: [ShutdownBeforeEventSignal](./before_events#shutdownbeforeeventsignal-类)，系统关闭前事件。
- <ReadOnly/> startup: [StartupBeforeEventSignal](./before_events#startupbeforeeventsignal-类)，系统启动前事件。
- <Version type="script" experimental="测试版API" inline/> <ReadOnly/> watchdogTerminate: [WatchdogTerminateBeforeEventSignal](./before_events#watchdogterminatebeforeeventsignal-类)，看门狗终止前事件。

### SystemAfterEvents 类

<Version type="script" add="1.4.0"/>

系统后事件的事件集合。

```typescript
class SystemAfterEvents {
    private constructor();
    readonly scriptEventReceive: ScriptEventCommandMessageAfterEventSignal;
}
```

#### 属性

- <ReadOnly/> scriptEventReceive: [ScriptEventCommandMessageAfterEventSignal](./after_events#scripteventcommandmessageaftereventsignal-类)，接收脚本事件后事件。

### SystemInfo 类

<Version type="script" add="1.16.0"/>

服务器的设备信息。

```typescript
class SystemInfo {
    private constructor();
    readonly memoryTier: MemoryTier;
}
```

#### 属性

- <ReadOnly/> memoryTier: [MemoryTier](#memorytier-枚举)，设备的可用内存等级。

### MemoryTier 枚举

<Version type="script" add="1.16.0"/>

设备的可用内存等级。

```typescript
enum MemoryTier {
    SuperLow = 0, // 设备内存不超过 1.5 GB。
    Low = 1, // 设备内存不超过 2 GB。
    Mid = 2, // 设备内存不超过 4 GB。
    High = 3, // 设备内存不超过 8 GB。
    SuperHigh = 4, // 设备内存超过 8 GB。
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
