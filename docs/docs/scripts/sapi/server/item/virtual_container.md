---
sidebar_position: 6
---

# 虚拟容器

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"
import EarlyExecution from "/src/components/highlight/earlyExecution"

本文主要记录虚拟容器相关接口。

虚拟容器是一种只存在于内存中的容器。它不依附于任何方块、实体或世界，也不会被存档，因此附加包可以完全脱离方块和实体来构建物品栏界面，常用于自定义商店、背包、仓库等场景。

---

## 创建

### VirtualContainerManager 类

<Version type="script" experimental="测试版API"/>

创建虚拟容器的管理器。

```typescript
class VirtualContainerManager {
    private constructor();
    create(options: VirtualContainerOptions): VirtualContainer;
}
```

#### create 方法

<RestrictedMode/>

创建一个新的空虚拟容器。

```typescript
create(options: VirtualContainerOptions): VirtualContainer
```

- options: [VirtualContainerOptions](#virtualcontaineroptions-接口)，容器的槽位数量与标题。

**返回值**：[VirtualContainer](#virtualcontainer-类)，新创建的虚拟容器。

### VirtualContainerOptions 接口

<Version type="script" experimental="测试版API"/>

`VirtualContainerManager.create`的创建选项。

```typescript
interface VirtualContainerOptions {
    size: number;
    title?: string;
}
```

#### 属性

- size: number，容器的槽位数量，取值范围为 1~54；屏幕按每行 9 个槽位排列。
- <Optional/> title: string，容器屏幕的标题，最长 256 字节。若为本地化键名则会显示为对应译文，此时长度限制针对键名而非译文。默认为无标题。

创建后，槽位数量与标题均不可更改。

---

## 容器

### VirtualContainer 类

<Version type="script" experimental="测试版API"/>

表示一个只存在于内存中的容器。

继承自[Container](./container#container-类)。

```typescript
class VirtualContainer extends Container {
    private constructor();
    readonly title: string;
    close(player?: Player): number;
    getViewers(): Player[];
    open(player: Player): void;
}
```

该容器支持完整的Container接口，并可通过 open 同时展示给任意多个玩家。容器实例由 [World.virtualContainerManager](../../server/world/main#world-类)的 create 方法创建。

当脚本不再引用该容器、且没有玩家正在查看时，容器会被销毁。世界关闭或脚本重载时，已打开的屏幕会直接关闭而不触发关闭事件；若容器内容需要跨会话保留，应在[ShutdownEvent](../../server/system/before_events#shutdownevent-类)中将其保存。

#### 属性

- <ReadOnly/> title: string，容器屏幕的标题。若为本地化键名则会显示为对应译文。

#### close 方法

<RestrictedMode/>

请求关闭某个玩家的容器屏幕；不指定玩家时，关闭所有正在查看该容器的玩家的屏幕。

关闭请求生效后，这些玩家将无法再通过屏幕更改该容器。每个屏幕会在客户端关闭界面、且挂起的物品栏请求处理完毕后，触发一次[VirtualContainerCloseAfterEvent](../world/after_events#virtualcontainercloseafterevent-类)，原因为`ServerClosed`。关闭可能要到之后的游戏刻才完成。

```typescript
close(player?: Player): number
```

- player?: [Player](../../server/entity_and_player/player#player-类)，要关闭其屏幕的玩家。省略时关闭所有查看者的屏幕。

**返回值**：number，被请求关闭的屏幕数量；已经在关闭过程中的屏幕不会重复计数。

#### getViewers 方法

获取当前正在查看该容器的玩家。

```typescript
getViewers(): Player[]
```

**返回值**：[Player](../../server/entity_and_player/player#player-类)[]，当前在该容器上打开了屏幕的玩家。

#### open 方法

<RestrictedMode/>

以箱子样式向指定玩家展示该容器。

屏幕只有该玩家可见；任意多个玩家可以同时查看同一个容器，每人拥有自己的屏幕。玩家切换维度时屏幕会以`ServerClosed`关闭，死亡时以`PlayerDied`关闭，切换到旁观模式时以`PlayerSpectating`关闭。

```typescript
open(player: Player): void
```

- player: [Player](../../server/entity_and_player/player#player-类)，要展示该容器的玩家。

该方法未抛出错误，只表示屏幕请求已发出，并不代表屏幕已经显示：玩家设备仍可能拒绝显示，此时屏幕会以`UserBusy`关闭。

---

## 错误

### VirtualContainerOpenError 类

<Version type="script" experimental="测试版API"/>

无法向玩家展示虚拟容器时抛出该错误，其中包含指明原因的原因代码。

继承自Error。

```typescript
class VirtualContainerOpenError extends Error {
    private constructor();
    readonly reason: VirtualContainerOpenErrorReason;
}
```

#### 属性

- <ReadOnly/> reason: [VirtualContainerOpenErrorReason](#virtualcontaineropenerrorreason-枚举)，表明屏幕请求未能发出的原因。

### VirtualContainerOpenErrorReason 枚举

<Version type="script" experimental="测试版API"/>

`VirtualContainerOpenError`被抛出的原因。

```typescript
enum VirtualContainerOpenErrorReason {
    ContainerScreenOpen = "ContainerScreenOpen", // 玩家已打开容器屏幕，例如物品栏、箱子或其他虚拟容器
    PlayerDead = "PlayerDead", // 玩家已死亡
    PlayerNotReady = "PlayerNotReady", // 玩家仍在加载世界、正在切换维度或正站在传送门中
    PlayerSleeping = "PlayerSleeping", // 玩家正在睡觉
    PlayerSpectating = "PlayerSpectating", // 玩家处于旁观模式
    PreviousScreenClosing = "PreviousScreenClosing", // 玩家上一个容器屏幕仍在关闭中
}
```

- 当原因为`ContainerScreenOpen`时，应在玩家关闭已有屏幕后重试。
- 当原因为`PlayerDead`时，应在玩家重生后重试。
- 当原因为`PlayerNotReady`时，应在之后的游戏刻重试。
- 当原因为`PlayerSleeping`时，应在玩家醒来后重试。
- 当原因为`PreviousScreenClosing`时，应等上一个容器触发[VirtualContainerCloseAfterEvent](../world/after_events#virtualcontainercloseafterevent-类)后再打开下一个，或在之后的游戏刻重试。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
