---
sidebar_position: 0
---

# ScriptAPI 简述

import RestrictedMode from "/src/components/highlight/restrictedMode"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

ScriptAPI 是国际版的脚本接口，用 JavaScript 编写，运行在游戏内置的脚本引擎上。中国版也提供这套接口，但版本通常落后于国际版，并且必须额外申请。

中国版另有一套 Python 接口 ModAPI，两者的语法、运行方式和接口形态都不一样，不能混用，也不能互相调用，可参见 [ModAPI 简述](/docs/docs/scripts/modapi/overview)。

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

需要读写权限的接口在文中以<RestrictedMode/>标注，这类接口不能在只读模式下调用（例如多数事件回调中）。

### @minecraft/server-ui

提供表单与界面接口。传统表单用链式调用构造（如`ActionFormData`），数据驱动 UI 用 JSON 描述界面，两者都可通过界面管理器统一关闭。

### @minecraft/server-graphics

提供图形与渲染接口，用于调整 Vibrant Visuals 开启后的天空散射、光照、水体与调色。这些设置按生物群系生效，也可以为单个玩家单独覆盖。

该模块要求`@minecraft/server`的`2.3.0`或更高版本，中国版目前不提供。

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
