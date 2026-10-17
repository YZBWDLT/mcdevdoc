---
sidebar_position: 2
---

# 系统后事件

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import EarlyExecution from "/src/components/highlight/earlyExecution"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录系统后事件相关接口。

---

## 系统后事件表

**系统后事件（System After Events）** 是指事件实际发生后执行的代码，无法阻止事件的发生。

| 事件         |                                      事件类                                      |                               是否支持筛选项                               | [脚本版本](../../version_table) |
| :----------- | :------------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :-----------------------------: |
| 接收脚本事件 | [`ScriptEventCommandMessageAfterEvent`](#scripteventcommandmessageafterevent-类) | [`ScriptEventMessageFilterOptions`](#scripteventmessagefilteroptions-接口) |             `1.4.0`             |

**备注**：

- *是否支持筛选项*是指事件的订阅函数`subscribe`是否支持第二个参数`options`。若支持，则给出它的类型。

---

## 接收脚本事件

### ScriptEventCommandMessageAfterEventSignal 类

<Version type="script" add="1.4.0"/>

当执行`/scriptevent`命令后触发该事件信号。

```typescript
class ScriptEventCommandMessageAfterEventSignal {
    private constructor();
    subscribe(
        callback: (arg0: ScriptEventCommandMessageAfterEvent) => void,
        options?: ScriptEventMessageFilterOptions,
    ): (arg0: ScriptEventCommandMessageAfterEvent) => void;
    unsubscribe(callback: (arg0: ScriptEventCommandMessageAfterEvent) => void): void;
}
```

#### 方法

- <RestrictedMode inline/> <EarlyExecution/> subscribe: (callback: (arg0: [ScriptEventCommandMessageAfterEvent](#scripteventcommandmessageafterevent-类)) => void, options?: [ScriptEventMessageFilterOptions](#scripteventmessagefilteroptions-接口)) => (arg0: [ScriptEventCommandMessageAfterEvent](#scripteventcommandmessageafterevent-类)) => void，订阅该事件，返回的函数可用于取消订阅。
- <RestrictedMode inline/> <EarlyExecution/> unsubscribe: (callback: (arg0: [ScriptEventCommandMessageAfterEvent](#scripteventcommandmessageafterevent-类)) => void) => void，取消订阅该事件。

### ScriptEventCommandMessageAfterEvent 类

<Version type="script" add="1.4.0"/>

执行`/scriptevent`命令后的事件信息。

```typescript
class ScriptEventCommandMessageAfterEvent {
    private constructor();
    readonly id: string;
    readonly initiator?: Entity;
    readonly message: string;
    readonly sourceBlock?: Block;
    readonly sourceEntity?: Entity;
    readonly sourceType: ScriptEventSource;
}
```

#### 属性

- <ReadOnly/> id: string，该脚本事件命令消息的标识符。
- <ReadOnly/> <Optional/> initiator: [Entity](../entity_and_player/entity#entity-类)，若该命令通过 NPC 发起，返回发起该 NPC 对话的实体。
- <ReadOnly/> message: string，随脚本事件命令传入的附加数据。
- <ReadOnly/> <Optional/> sourceBlock: [Block](../block/main#block-类)，若该命令由方块（如命令方块）触发，返回该方块。
- <ReadOnly/> <Optional/> sourceEntity: [Entity](../entity_and_player/entity#entity-类)，若该命令由实体（如 NPC）触发，返回该实体。
- <ReadOnly/> sourceType: [ScriptEventSource](#scripteventsource-枚举)，触发该命令的来源类型。

### ScriptEventMessageFilterOptions 接口

<Version type="script" add="1.4.0"/>

指定接收脚本事件的筛选项。

```typescript
interface ScriptEventMessageFilterOptions {
    namespaces: string[];
}
```

- namespaces: string[]，用于筛选入站脚本事件消息的命名空间列表。

### ScriptEventSource 枚举

<Version type="script" add="1.4.0"/>

触发脚本事件的来源类型。

```typescript
enum ScriptEventSource {
    Block = "Block", // 方块。
    Entity = "Entity", // 实体。
    NPCDialogue = "NPCDialogue", // NPC 对话。
    Server = "Server", // 服务器。
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
