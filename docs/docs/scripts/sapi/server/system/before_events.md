---
sidebar_position: 1
---

# 系统前事件

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import EarlyExecution from "/src/components/highlight/earlyExecution"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录系统前事件相关接口。

系统前事件往往用于注册自定义游戏内容。在前事件的回调中，代码处于受限执行状态，无法执行会更改系统的代码，必须使用`system.run()`延后执行。

---

## 系统前事件表

**系统前事件（System Before Events）** 是指事件实际发生前执行的代码。前事件会导致代码进入受限执行，无法执行会更改系统的代码，必须使用`system.run()`延后执行。往往使用系统前事件是为了注册自定义游戏内容。

| 事件         |                               事件类                               | [脚本版本](../../version_table) |
| :----------- | :----------------------------------------------------------------: | :-----------------------------: |
| 系统关闭     |                [`ShutdownEvent`](#shutdownevent-类)                |             `2.0.0`             |
| **系统启动** |                 [`StartupEvent`](#startupevent-类)                 |             `2.0.0`             |
| 看门狗终止   | [`WatchdogTerminateBeforeEvent`](#watchdogterminatebeforeevent-类) |             `beta`              |

---

## 系统关闭事件

### ShutdownBeforeEventSignal 类

<Version type="script" add="2.0.0"/>

当系统关闭前触发该事件信号。

```typescript
class ShutdownBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: ShutdownEvent) => void): (arg0: ShutdownEvent) => void;
    unsubscribe(callback: (arg0: ShutdownEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ShutdownEvent](#shutdownevent-类)) => void) => (arg0: [ShutdownEvent](#shutdownevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ShutdownEvent](#shutdownevent-类)) => void) => void，取消订阅该事件。

### ShutdownEvent 类

<Version type="script" add="2.0.0"/>

系统关闭前的事件信息。

```typescript
class ShutdownEvent {
    private constructor();
}
```

---

## 系统启动事件

### StartupBeforeEventSignal 类

<Version type="script" add="2.0.0"/>

当系统启动前触发该事件信号。

```typescript
class StartupBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: StartupEvent) => void): (arg0: StartupEvent) => void;
    unsubscribe(callback: (arg0: StartupEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [StartupEvent](#startupevent-类)) => void) => (arg0: [StartupEvent](#startupevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [StartupEvent](#startupevent-类)) => void) => void，取消订阅该事件。

### StartupEvent 类

<Version type="script" add="2.0.0"/>

系统启动前的事件信息。

```typescript
class StartupEvent {
    private constructor();
    readonly blockComponentRegistry: BlockComponentRegistry;
    readonly customCommandRegistry: CustomCommandRegistry;
    readonly dimensionRegistry: DimensionRegistry;
    readonly itemComponentRegistry: ItemComponentRegistry;
    readonly worldClockRegistry: WorldClockRegistry;
}
```

#### 属性

- <ReadOnly/> blockComponentRegistry: [BlockComponentRegistry](./custom_block_component#blockcomponentregistry-类)，方块组件注册表，用于注册自定义方块组件。
- <Version type="script" add="2.1.0" inline/> <ReadOnly/> customCommandRegistry: [CustomCommandRegistry](./custom_command#customcommandregistry-类)，自定义命令注册表，用于注册自定义命令。
- <Version type="script" add="2.8.0" inline/> <ReadOnly/> dimensionRegistry: [DimensionRegistry](./custom_dimension#dimensionregistry-类)，自定义维度注册表，用于注册自定义维度。
- <ReadOnly/> itemComponentRegistry: [ItemComponentRegistry](./custom_component#itemcomponentregistry-类)，物品组件注册表，用于注册自定义物品组件。
- <Version type="script" add="2.11.0" inline/> <ReadOnly/> worldClockRegistry: [WorldClockRegistry](./custom_world_clock#worldclockregistry-类)，世界时钟注册表，用于注册自定义世界时钟。

---

## 看门狗终止事件

### WatchdogTerminateBeforeEventSignal 类

<Version type="script" experimental="测试版API"/>

当看门狗即将终止脚本运行时触发该事件信号。

```typescript
class WatchdogTerminateBeforeEventSignal {
    private constructor();
    subscribe(callback: (arg0: WatchdogTerminateBeforeEvent) => void): (arg0: WatchdogTerminateBeforeEvent) => void;
    unsubscribe(callback: (arg0: WatchdogTerminateBeforeEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [WatchdogTerminateBeforeEvent](#watchdogterminatebeforeevent-类)) => void) => (arg0: [WatchdogTerminateBeforeEvent](#watchdogterminatebeforeevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [WatchdogTerminateBeforeEvent](#watchdogterminatebeforeevent-类)) => void) => void，取消订阅该事件。

### WatchdogTerminateBeforeEvent 类

<Version type="script" experimental="测试版API"/>

看门狗即将终止脚本运行时的事件信息。

```typescript
class WatchdogTerminateBeforeEvent {
    private constructor();
    cancel: boolean;
    readonly terminateReason: WatchdogTerminateReason;
}
```

#### 属性

- cancel: boolean，若设为`true`，将取消对脚本运行的终止。请注意，取决于服务器配置，取消终止可能并不会生效。
- <ReadOnly/> terminateReason: [WatchdogTerminateReason](#watchdogterminatereason-枚举)，脚本运行将被终止的原因。

### WatchdogTerminateReason 枚举

<Version type="script" experimental="测试版API"/>

脚本运行将被终止的原因。

```typescript
enum WatchdogTerminateReason {
    Hang = "Hang", // 脚本执行挂起。
    StackOverflow = "StackOverflow", // 脚本栈溢出。
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
