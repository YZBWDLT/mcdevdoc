---
sidebar_position: 7
---

# 自定义世界时钟

import Version from "/src/components/highlight/version"
import Optional from "/src/components/highlight/optional"
import EarlyExecution from "/src/components/highlight/earlyExecution"

本文主要记录自定义世界时钟相关接口。

---

## 注册

### WorldClockRegistry 类

<Version type="script" add="2.11.0"/>

用于注册自定义世界时钟的注册表。

```typescript
class WorldClockRegistry {
    private constructor();
    registerClock(name: string, registrationOptions?: WorldClockRegistrationOptions): void;
}
```

#### registerClock 方法

<EarlyExecution/>

注册一个新的自定义世界时钟。

```typescript
registerClock(name: string, registrationOptions?: WorldClockRegistrationOptions): void
```

- name: string，要注册的自定义世界时钟名称。
- registrationOptions?: [WorldClockRegistrationOptions](#worldclockregistrationoptions-接口)，注册选项（可选）。

### WorldClockRegistrationOptions 接口

<Version type="script" add="2.11.0"/>

世界时钟注册选项。

```typescript
interface WorldClockRegistrationOptions {
    timeMarkers?: TimeMarkerOptions[];
}
```

#### 属性

- <Optional/> timeMarkers: [TimeMarkerOptions](../../server/world/world_clock#timemarkeroptions-接口)[]，注册期间包含时间标记的选项集合。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
