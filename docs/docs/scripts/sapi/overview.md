---
sidebar_position: 0
---

# ScriptAPI 概述

import RestrictedMode from "/src/components/highlight/restrictedMode"
import EarlyExecution from "/src/components/highlight/earlyExecution"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

ScriptAPI 是国际版的脚本接口，用 JavaScript 编写，运行在游戏内置的脚本引擎上。中国版也提供这套接口，但版本通常落后于国际版，并且必须额外申请。

中国版另有一套 Python 接口 ModAPI，两者的语法、运行方式和接口形态都不一样，不能混用，也不能互相调用，可参见 [ModAPI 概述](/docs/docs/scripts/modapi/overview)。

本文档的这一部分按模块记录接口，每个条目给出签名、参数、返回值与版本号。入门流程见[脚本系统概论](/docs/tutorials/a3_scripts/b0_introduction)。

---

## 模块

| 模块                         | 用途                                   | 中国版版本 |
| :--------------------------- | :------------------------------------- | :--------- |
| `@minecraft/server`          | 世界、实体、方块、物品与事件等游戏逻辑 | `2.4.0`    |
| `@minecraft/server-ui`       | 表单与界面                             | `2.0.0`    |
| `@minecraft/server-graphics` | 图形与渲染                             | 不提供     |

### @minecraft/server

提供脚本运行环境与全部游戏逻辑接口，包括世界、维度、实体、方块、物品、容器、事件、命令与记分板等。绝大多数脚本功能都在这个模块里。

### @minecraft/server-ui

提供表单与界面接口。传统表单用链式调用构造（如`ActionFormData`），数据驱动 UI 用 JSON 描述界面，两者都可通过界面管理器统一关闭。

### @minecraft/server-graphics

提供图形与渲染接口，用于调整 Vibrant Visuals 开启后的天空散射、光照、水体与调色。这些设置按生物群系生效，也可以为单个玩家单独覆盖。

该模块要求`@minecraft/server`的`2.3.0`或更高版本，中国版目前不提供。

---

## 执行权限

代码能做什么，取决于它运行在哪个阶段。官方把这类限制称为执行权限，共三种。

| 权限 | 何时进入 | 限制 |
| :--- | :--- | :--- |
| 默认执行 | 常规位置，如后事件的回调、`system.run` 内部 | 无限制，代码可正常执行。 |
| 受限执行 | 世界前事件的回调中 | 一切可能更改世界的操作都会被拦截并报错。 |
| 早期执行 | 世界完全加载之前，即脚本顶层与系统前事件 | 一切需要访问世界信息的操作都会被拦截并报错。 |

### 受限执行

世界前事件（`world.beforeEvents`）的回调在受限执行下运行。读取数据没有问题，但只要尝试改动世界就会抛出错误。

需要改动的部分可以用`system.run`推迟到本刻末尾，那里已经退出受限执行。

```javascript
import { system, world } from "@minecraft/server";

world.beforeEvents.playerPlaceBlock.subscribe((event) => {
    // 受限执行下直接调用会报错
    // event.player.playSound("random.orb");

    system.run(() => {
        // 这里已经退出受限执行
        event.player.playSound("random.orb");
    });
});
```

### 早期执行

脚本加载时世界还没有完全就绪，此时执行的就是早期执行。早期的脚本可以直接写在世界加载前，`2.0.0`引入早期执行之后，这段代码能调用的接口被大幅收窄。

早期执行阶段能做的多是注册类工作，例如在系统前事件里注册自定义组件、命令与世界时钟。

```javascript
import { system } from "@minecraft/server";

system.beforeEvents.startup.subscribe((event) => {
    // 早期执行：可以注册自定义内容，不能访问世界
});
```

需要世界信息的初始化应当放到世界加载后事件里。

```javascript
import { world } from "@minecraft/server";

world.afterEvents.worldLoad.subscribe(() => {
    // 世界已加载，可以正常访问世界信息
});
```

### 文中的标注

接口能否在受限执行或早期执行下调用，取决于它自身的权限。本文档在条目上标出两种情况：

- <RestrictedMode/>：该接口不能在受限执行下调用，需要放进`system.run`延后执行。
- <EarlyExecution/>：该接口可以在早期执行阶段调用，通常是注册类接口。

---

## 模块声明

在`manifest.json`的`dependencies`字段中声明要使用的模块，每个模块写成一个`module_name`与`version`的对象。

```json
{
    "dependencies": [
        {
            "module_name": "@minecraft/server",
            "version": "2.0.0"
        },
        {
            "module_name": "@minecraft/server-ui",
            "version": "2.0.0"
        }
    ]
}
```

使用`@minecraft/server-graphics`时再加一项，版本填`1.0.0`。

---

## 版本口径

各游戏版本对应的模块脚本版本见[脚本版本对应表](./version_table)。文中徽标上的版本号均指模块的脚本版本，不是游戏版本。

---

## 参考文档

- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
