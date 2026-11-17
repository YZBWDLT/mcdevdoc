---
sidebar_position: 0
---

# ModAPI 概论

import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10（游戏 1.21.130）。

ModAPI 是中国版（网易版）的脚本接口，只能用在中国版上。国际版没有这套接口，对应的实现是 [Script API](/docs/docs/scripts/sapi/version_table)。两套脚本的语法、运行方式和接口形态都不一样，不能混用，也不能互相调用。

本文档的这一部分是一个索引。网易的接口说明按功能分成二十多个分类，这里照原样保留分类和顺序，每个接口给出端标识、参数、返回值、备注和示例，方便直接在站内查。入门流程见[脚本系统概论](/docs/tutorials/a3_scripts/b0_introduction)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/api-suoyinbiao.html"/>

## 运行环境

:::info

在 2026 年 10 月的网易开发者大会上，网易宣布 [ModAPI 将会更新到 Python 3](https://mc.163.com/newdev/news/activity/20261030/43767_1318166.html)，并将在不久的未来后更新。

:::

ModAPI 的脚本跑在 Python 2.7 上，不是 Python 3。写代码时需要注意 `print` 是语句，字符串默认是 `str` 而不是 `unicode`，除法默认取整。

游戏内的脚本目录必须以`Scripts`结尾，入口文件是`modMain.py`，并且只能放在脚本目录的根层。这两条是打包时的判定条件，放错位置会导致脚本在手机端不加载。

## 服务端与客户端

ModAPI 把脚本分成服务端脚本和客户端脚本两部分，两者的模块名分别是`mod.server.extraServerApi`和`mod.client.extraClientApi`，习惯上分别别名为`serverApi`和`clientApi`。

这两部分互相独立。服务端脚本里 import 客户端的模块不会生效，调用客户端的接口也不会生效，反过来一样。一般来说，游戏逻辑写在服务端（给物品、改方块、算伤害），表现写在客户端（UI、特效、相机）。

两端之间靠自定义事件通信。服务端用`NotifyToClient`发给指定玩家，用`BroadcastToAllClient`发给所有客户端；客户端用`NotifyToServer`发给服务端。事件需要先`CreateEventData`创建数据，再发给对应的系统。

## 组件

ModAPI 的接口大部分挂在组件上。取组件的入口是引擎组件工厂：

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(entityId)
comp.GetPlayerHunger()
```

网易的接口页只写方法属于哪个组件类（`method in mod.server.component.xxx.XxxComponent`），不写怎么把这个组件拿到手，读者只能翻示例去反推。所以本站每个接口下面多给一行「获取组件」，直接写出取该组件的调用。

工厂方法的第一个参数是对象 ID，不同接口要的不一样。作用于实体的传实体 ID（`entityId`、`playerId`），作用于全局的传`serverApi.GetLevelId()`或`clientApi.GetLevelId()`。同一个组件类在两端也可能要不同的 ID，比如`CreateGame`在服务端常传实体 ID、在客户端传等级 ID，所以每行的实参都照官方示例原样给出。

`GetEngineCompFactory()`在服务端和客户端各有一套，方法名基本对齐，但同一个组件在两端能用的接口不一定相同。文档里每个接口上方的<Server/>与<Client/>标签就是指出这一点。

也有少数接口不属于任何组件。这类会在标签下面直接写明「模块级函数，直接调用」，例如`RegisterSystem`、`GetEngineNamespace`；系统类的方法写「系统方法，在自定义 System 类中直接调用」；UI 控件的方法写「控件方法，先用 GetBaseUIControl 取得控件实例再调用」。

## 事件

事件依赖系统（System）。系统继承`ServerSystem`或`ClientSystem`，在`modMain.py`里用`RegisterSystem`注册，然后在系统的`__init__`里用`ListenForEvent`注册回调：

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ServerChatEvent",
            self, self.OnServerChat)

    def OnServerChat(self, args):
        print args["message"]
```

`ListenForEvent`的五个参数依次是命名空间、系统名、事件名、监听者实例和回调函数。事件名是一个字符串，不是函数，所以事件不需要「获取组件」，也不能直接调用。

客户端把`mod.server.extraServerApi`换成`mod.client.extraClientApi`，`GetServerSystemCls()`换成`GetClientSystemCls()`，事件名换成客户端事件即可。回调函数的名字可以自己定。

回调函数必须接受一个参数，类型是 dict。引擎事件的 dict 由引擎给出，其中有些键是可设置参数，改掉它们的值会改变引擎接下来的行为。不要往这个 dict 里塞自己的键，需要额外数据时自己复制一份。

事件文档里每个事件只列回调参数，也就是这个 dict 里有哪些键，写作`args["名字"]`。写法上先用`def On事件名(self, args)`声明回调，再从 args 里取值。

自定义事件用`BroadcastEvent`在同一个端内广播，用`NotifyToClient`、`NotifyToServer`跨端发送。

## 关于类型声明

每个接口下面有一行签名，按 PEP 484 的写法标出参数和返回值的类型：

```python
GetConfigData(configName: str, isGlobal: bool = False) -> Dict[str, Any]
```

这行只是类型说明。ModAPI 跑在 Python 2.7 上，函数注解语法要到 Python 3 才有，所以不能把它直接抄进代码。参数顺序与官方参数表一致，默认值取官方说明里写了的那种，官方没写的不标。

类型统一按`typing`模块的写法：坐标写成`Tuple[float, float, float]`，可能为空的写成`Optional[str]`，字典写成`Dict[str, Any]`，没有返回值写成`-> None`。签名太长时会按 PEP 8 折行。

需要注意：个别接口官方把带默认值的参数写在了必选参数前面，照抄到 IDE 里会报语法错误，这时按实际调用顺序调整即可。

## 页面组织

侧边栏分三块：

- **接口**：全部接口，按通用、世界、实体、玩家、方块、物品、自定义 UI、特效、后处理、虚拟世界、模型、渲染、控制、物理、音效、原生 UI、游戏设置、联机大厅、商城、成就、山头服务器分节
- **事件**：全部事件，按世界、实体、玩家、方块、物品、控制、UI、模型、物理、音效、游戏设置、联机大厅分节
- **[枚举值](/docs/docs/scripts/modapi/enums)**：接口参数里用到的枚举类与取值

每个分节内部的页面数量不多，点开分类就能看到。

## 参考文档

- [网易 ModAPI 接口索引表](https://mc.163.com/newdev/docs/api/jiekou/api-suoyinbiao.html)
- [网易 ModAPI 事件索引表](https://mc.163.com/newdev/docs/api/shijian/shijiansuoyinbiao.html)
- [ModSDK 补全库（PyPI）](https://pypi.org/project/mc-netease-sdk/)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
