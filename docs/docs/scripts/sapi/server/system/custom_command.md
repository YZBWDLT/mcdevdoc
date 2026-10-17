---
sidebar_position: 3
---

# 自定义命令

import Highlight from '/src/components/highlight/base';
import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"

本文主要记录自定义命令相关接口。

---

## 注册

以下接口用于注册自定义命令。

### CustomCommandRegistry 类

<Version type="script" add="2.1.0"/>

用于注册自定义命令。可通过系统启动前事件获取该注册表。

```typescript
class CustomCommandRegistry {
    private constructor();
    registerCommand(
        customCommand: CustomCommand,
        callback: (origin: CustomCommandOrigin, ...args: any[]) => CustomCommandResult | undefined,
    ): void;
    registerEnum(name: string, values: string[]): void;
}
```

#### registerCommand 方法

<Highlight text="早期执行" color="yellowgreen" tooltip="该方法可以在早期执行阶段调用。"/>

注册一条自定义命令。

```typescript
registerCommand(
    customCommand: CustomCommand,
    callback: (origin: CustomCommandOrigin, ...args: any[]) => CustomCommandResult | undefined,
): void
```

- customCommand: [CustomCommand](#customcommand-接口)，自定义命令的信息。
- callback: (origin: [CustomCommandOrigin](#customcommandorigin-类), ...args: any[]) => [CustomCommandResult](#customcommandresult-接口) | undefined，自定义命令要执行的逻辑，并返回的命令结果。

#### registerEnum 方法

<Highlight text="早期执行" color="yellowgreen" tooltip="该方法可以在早期执行阶段调用。"/>

注册一个自定义命令枚举。

```typescript
registerEnum(name: string, values: string[]): void
```

- name: string，自定义命令枚举的名称。
- values: string[]，自定义命令枚举中包含的枚举。

### CustomCommand 接口

<Version type="script" add="2.1.0"/>

定义自定义命令的信息。

```typescript
interface CustomCommand {
    cheatsRequired?: boolean;
    description: string;
    mandatoryParameters?: CustomCommandParameter[];
    name: string;
    optionalParameters?: CustomCommandParameter[];
    permissionLevel: CommandPermissionLevel;
}
```

- name: string，命令名称，必须包含命名空间。
- description: string，命令描述，显示在自动补全页面中命令条目的右侧。
- <Optional/> mandatoryParameters: [CustomCommandParameter](#customcommandparameter-接口)[]，命令的必选参数。
- <Optional/> optionalParameters: [CustomCommandParameter](#customcommandparameter-接口)[]，命令的可选参数。
- permissionLevel: [CommandPermissionLevel](#commandpermissionlevel-枚举)，命令的权限等级。
- <Optional/> cheatsRequired: boolean，命令是否需要作弊。默认值：true。

### CustomCommandParameter 接口

<Version type="script" add="2.1.0"/>

定义自定义命令参数的信息。

```typescript
interface CustomCommandParameter {
    enumName?: string;
    name: string;
    type: CustomCommandParamType;
}
```

- name: string，命令参数名称。
- type: [CustomCommandParamType](#customcommandparamtype-枚举)，命令参数类型。
- <Version type="script" experimental="测试版API" inline/> <Optional/> enumName: string，如果type指定为CustomCommandParamType.Enum，使用何种枚举。见[CustomCommandRegistry.registerEnum方法](#registerenum-方法)。

### CustomCommandParamType 枚举

<Version type="script" add="2.1.0"/>

定义自定义命令参数接受的类型。

```typescript
enum CustomCommandParamType {
    BlockType = "BlockType", // 该参数将会返回一个 BlockType
    Boolean = "Boolean", // 该参数将会返回一个 boolean
    EntitySelector = "EntitySelector", // 该参数将会返回一个 Entity
    EntityType = "EntityType", // 该参数将会返回一个 EntityType
    Enum = "Enum", // 该参数将会返回一个枚举
    Float = "Float", // 该参数将会返回一个 number（浮点数）
    Integer = "Integer", // 该参数将会返回一个 number（整数）
    ItemType = "ItemType", // 该参数将会返回一个 ItemType
    Location = "Location", // 该参数将会返回一个 Vector3
    PlayerSelector = "PlayerSelector", // 该参数将会返回一个 Player
    String = "String", // 该参数将会返回一个 string
}
```

### CommandPermissionLevel 枚举

<Version type="script" add="2.1.0"/>

定义自定义命令的权限等级。

```typescript
enum CommandPermissionLevel {
    Any = 0, // 所有人均可执行。
    GameDirectors = 1, // 操作员可执行，包括命令方块。
    Admin = 2, // 操作员可执行，但不包括命令方块。
    Host = 3, // 房主可执行。
    Owner = 4, // 仅 BDS 服务器可执行。
}
```

### CustomCommandOrigin 类

<Version type="script" add="2.1.0"/>

命令的来源信息。

```typescript
class CustomCommandOrigin {
    private constructor();
    readonly initiator?: Entity;
    readonly sourceBlock?: Block;
    readonly sourceEntity?: Entity;
    readonly sourceType: CustomCommandSource;
}
```

#### 属性

- <ReadOnly/> <Optional/> sourceEntity: [Entity](../entity_and_player/entity#entity-类)，若该命令由实体执行，返回该实体的信息。
- <ReadOnly/> <Optional/> initiator: [Entity](../entity_and_player/entity#entity-类)，若该命令通过 NPC 对话发起，返回发起该 NPC 对话的实体。
- <ReadOnly/> <Optional/> sourceBlock: [Block](../block/main#block-类)，若该命令由方块执行，返回该方块的信息。
- <ReadOnly/> sourceType: [CustomCommandSource](#customcommandsource-枚举)，该命令由何种来源执行。

### CustomCommandSource 枚举

<Version type="script" add="2.1.0"/>

自定义命令的执行者是何种来源。

```typescript
enum CustomCommandSource {
    Block = "Block", // 方块执行（特指命令方块）
    Entity = "Entity", // 实体执行
    NPCDialogue = "NPCDialogue", // NPC 对话框执行
    Server = "Server", // 服务器执行
}
```

### CustomCommandResult 接口

<Version type="script" add="2.1.0"/>

定义自定义命令返回的结果信息。

```typescript
interface CustomCommandResult {
    message?: string;
    status: CustomCommandStatus;
}
```

- status: [CustomCommandStatus](#customcommandstatus-枚举)，命令返回的状态。
- <Optional/> message: string，命令返回的消息。

### CustomCommandStatus 枚举

<Version type="script" add="2.1.0"/>

自定义命令的返回状态。

```typescript
enum CustomCommandStatus {
    Success = 0,
    Failure = 1,
}
```

---

## 抛出错误

以下接口会在自定义命令注册遇到错误的时候抛出。

### CustomCommandError 类

<Version type="script" add="2.1.0"/>

注册自定义命令时若遇到错误，抛出此类。

```typescript
class CustomCommandError extends Error {
    private constructor();
    readonly reason: CustomCommandErrorReason;
}
```

#### 属性

- name: string，错误名称。继承自 Error 类。
- message: string，错误消息。继承自 Error 类。
- <ReadOnly/> reason: [CustomCommandErrorReason](#customcommanderrorreason-枚举)，错误原因。

> 该类有更多的属性和方法，见[类 CustomCommandError](https://projectxero.top/sapi/classes/server.CustomCommandError.html)。

### CustomCommandErrorReason 枚举

<Version type="script" add="2.1.0"/>

自定义命令的错误原因。

```typescript
enum CustomCommandErrorReason {
    AlreadyRegistered = "AlreadyRegistered", // 已注册过命令
    EnumDependencyMissing = "EnumDependencyMissing", // 枚举类型未注册
    NamespaceMismatch = "NamespaceMismatch", // 命名空间不匹配上次的注册
    ParameterLimit = "ParameterLimit", // 定义了过多参数
    RegistryInvalid = "RegistryInvalid", // 世界初始化后不能注册
    RegistryReadOnly = "RegistryReadOnly", // reload 不能重新定义参数，只能重新定义逻辑
}
```

---

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
