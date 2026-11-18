---
sidebar_position: 104
---

# 工具

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录工具相关的接口，共 16 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/tongyong/gongju.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### AddRepeatedTimer

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

添加服务端触发的定时器，重复执行。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(delay: float, func: Callable, *args: Any, **kwargs: Any) -> Callable
```

- delay: float，延迟时间，单位秒。
- func: Callable，定时器触发函数。
- *args: Any，变长参数，可以不设置。
- **kwargs: Any，字典变长参数，可以不设置。

**返回值**：Callable，返回触发的定时器实例，传入 func 不是函数类型时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.AddRepeatedTimer(3.0,func,args,kwargs)
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

添加客户端触发的定时器，重复执行。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(delay: float, func: Callable, *args: Any, **kwargs: Any) -> Callable
```

- delay: float，延迟时间，单位秒。
- func: Callable，定时器触发函数。
- *args: Any，变长参数，可以不设置。
- **kwargs: Any，字典变长参数，可以不设置。

**返回值**：Callable，返回触发的定时器实例，传入 func 不是函数类型时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.AddRepeatedTimer(3.0,func,args,kwargs)
```

</TabItem>
</Tabs>

---

### AddTimer

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

添加服务端触发的定时器，非重复。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(delay: float, func: Callable, *args: Any, **kwargs: Any) -> Callable
```

- delay: float，延迟时间，单位秒。
- func: Callable，定时器触发函数。
- *args: Any，变长参数，可以不设置。
- **kwargs: Any，字典变长参数，可以不设置。

**返回值**：Callable，返回单次触发的定时器实例，传入 func 不是函数类型时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.AddTimer(3.0,func,args,kwargs)
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

添加客户端触发的定时器，非重复。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(delay: float, func: Callable, *args: Any, **kwargs: Any) -> Callable
```

- delay: float，延迟时间，单位秒。
- func: Callable，定时器触发函数。
- *args: Any，变长参数，可以不设置。
- **kwargs: Any，字典变长参数，可以不设置。

**返回值**：Callable，返回单次触发的定时器实例，传入 func 不是函数类型时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.AddTimer(3.0,func,args,kwargs)
```

</TabItem>
</Tabs>

---

### CancelTimer

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

取消定时器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(timer: Callable) -> Any
```

- timer: Callable，[AddTimer](/docs/docs/scripts/modapi/interfaces/general/tool#addtimer) 和 [AddRepeatedTimer](/docs/docs/scripts/modapi/interfaces/general/tool#addrepeatedtimer) 时返回的定时器实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.CancelTimer(timer)
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

取消定时器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(timer: Callable) -> Any
```

- timer: Callable，[AddTimer](/docs/docs/scripts/modapi/interfaces/general/tool#addtimer) 和 [AddRepeatedTimer](/docs/docs/scripts/modapi/interfaces/general/tool#addrepeatedtimer) 时返回的定时器实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.CancelTimer(timer)
```

</TabItem>
</Tabs>

---

### CheckNameValid

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

检查昵称是否合法，即不包含敏感词。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(name: str) -> bool
```

- name: str，昵称。

**返回值**：bool，True:昵称合法 False:昵称非法。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
isValid = comp.CheckNameValid("史蒂夫")
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

检查昵称是否合法，即不包含敏感词。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(name: str) -> bool
```

- name: str，昵称。

**返回值**：bool，True:昵称合法 False:昵称非法。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
isValid = comp.CheckNameValid("史蒂夫")
```

</TabItem>
</Tabs>

---

### CheckWordsValid

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

检查语句是否合法，即不包含敏感词。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(words: str) -> bool
```

- words: str，语句。

**返回值**：bool，True:语句合法<br/>False:语句非法。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
isValid = comp.CheckWordsValid("creeper? Aww man")
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

检查语句是否合法，即不包含敏感词。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(words: str) -> bool
```

- words: str，语句。

**返回值**：bool，True:语句合法<br/>False:语句非法。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
isValid = comp.CheckWordsValid("creeper? Aww man")
```

</TabItem>
</Tabs>

---

### GetChinese

<Version type="china" add="1.23"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取 langStr 对应的中文，可参考 PC 开发包中\handheld\localization\handheld\data\resource_packs\vanilla\texts\zh_CN.lang。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(langStr: str) -> str
```

- langStr: str，传入的 langStr。

**返回值**：str，langStr 对应的中文，若找不到对应的中文，则会返回 langStr 本身,字符编码为 Unicode。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
# 获取"entity.wolf.name"对应的中文（"狼"）
Chinese = comp.GetChinese("entity.wolf.name")
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取 langStr 对应的中文，可参考 PC 开发包中\handheld\localization\handheld\data\resource_packs\vanilla\texts\zh_CN.lang。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(langStr: str) -> str
```

- langStr: str，传入的 langStr。

**返回值**：str，langStr 对应的中文，若找不到对应的中文，则会返回 langStr 本身,字符编码为 Unicode。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
# 获取"entity.wolf.name"对应的中文（"狼"）
Chinese = comp.GetChinese("entity.wolf.name")
```

</TabItem>
</Tabs>

---

### GetClipboardContent

<Version type="china" add="3.3"/>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取系统剪贴板内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetClipboardContent() -> str
```


**返回值**：str，剪贴板内容，获取失败时返回 None。

**备注**

- 如果剪贴板里的内容并非文本内容，或者剪贴板里没有内容，则返回空字符串。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
# 从其他地方复制一段文本后
# 获取剪贴板内容
content = comp.GetClipboardContent()
```

</TabItem>
</Tabs>

---

### GetFps

<Version type="china" add="2.4"/>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取 fps。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFps() -> float
```


**返回值**：float，当前 fps 值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
fps = comp.GetFps()
```

</TabItem>
</Tabs>

---

### GetHostPlayerId

<Version type="china" add="3.4"/>

<Server/>

模块级函数，直接调用。

获取房主的 entityId。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> str
```


**返回值**：str，房主/服主的 entityId,若房主/服主未加入则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.GetHostPlayerId()
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取房主的 entityId。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> str
```


**返回值**：str，房主/服主的 entityId,若房主/服主未加入则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.GetHostPlayerId()
```

</TabItem>
</Tabs>

---

### GetMinecraftEnum

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

用于获取[枚举值文档](https://mc.163.com/newdev/docs/api/meijuzhi.html)中的枚举值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> Any
```


**返回值**：Any，枚举集合类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePlayer(playerId)
# 使用枚举值作为其他接口的参数
comp.SetPlayerGameType(serverApi.GetMinecraftEnum().GameType.Survival)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

用于获取[枚举值文档](https://mc.163.com/newdev/docs/api/meijuzhi.html)中的枚举值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> Any
```


**返回值**：Any，枚举集合类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 使用枚举值与事件参数比较
class BattleUI(ScreenNode):
    def OnButtonTouch(self, args):
        touchEventEnum = clientApi.GetMinecraftEnum().TouchEvent
        if touchEvent == touchEventEnum.TouchUp:
            pass

    def Create(self):
        self.AddTouchEventHandler("/panel/test_btn", self.OnButtonTouch, {"isSwallow":True})
```

</TabItem>
</Tabs>

---

### GetModConfigJson

<Version type="china" add="1.23"/>

<Server/>

模块级函数，直接调用。

以字典形式返回指定路径的 json 格式配置文件的内容，文件必须放置在行为包的/modconfigs 目录下。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(path: str) -> Dict[str, Any]
```

- path: str，指定路径的 json 文件。

**返回值**：Dict[str, Any]，配置内容的字典，当读取文件失败时返回空字典。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
data = serverApi.GetModConfigJson("modconfigs/monster.json")
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

以字典形式返回指定路径的 json 格式配置文件的内容，文件必须放置在资源包的/modconfigs 目录下。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(path: str) -> Dict[str, Any]
```

- path: str，指定路径的 json 文件。

**返回值**：Dict[str, Any]，配置内容的字典，当读取文件失败时返回空字典。

**备注**

- 服务端同名接口只能读取行为包的 modconfigs 目录下文件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
data = clientApi.GetModConfigJson("modconfigs/monster.json")
```

</TabItem>
</Tabs>

---

### GetServerTickTime

<Version type="china" add="2.6"/>

<Server/>

模块级函数，直接调用。

获取服务端引擎上一帧的帧消耗时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetServerTickTime() -> float
```


**返回值**：float，时间，单位为毫秒。

**备注**

- 服务端引擎的帧率为 20 帧，而服务端脚本的帧率为 30 帧，因此当脚本每帧获取引擎帧消耗时间时，有可能连续获取到的是同一个引擎帧的时间。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
print serverApi.GetServerTickTime()
```

</TabItem>
</Tabs>

---

### ImportModule

<Version type="china" add="2.8"/>

<Server/>

模块级函数，直接调用。

使用字符串路径导入模块，作用与 importlib.import_module 类似，但只能导入当前加载的 mod 中的模块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(path: str) -> Any
```

- path: str，模块的绝对路径。

**返回值**：Any，模块对象，当前加载的所有 mod 中不存在该模块则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.ImportModule("tutorialScripts.tutorialServerSystem")
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

使用字符串路径导入模块，作用与 importlib.import_module 类似，但只能导入当前加载的 mod 中的模块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(path: str) -> Any
```

- path: str，模块的绝对路径。

**返回值**：Any，模块对象，当前加载的所有 mod 中不存在该模块则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.ImportModule("tutorialScripts.tutorialClientSystem")
```

</TabItem>
</Tabs>

---

### SetClipboardContent

<Version type="china" add="3.3"/>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

设置系统剪贴板内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetClipboardContent(content: str) -> bool
```

- content: str，需要设置的剪贴板内容。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
# 设置剪贴板内容为"Hello, minecraft"
comp.SetClipboardContent("Hello, minecraft")
# 可以粘贴到其他地方
```

</TabItem>
</Tabs>

---

### StartCoroutine

<Version type="china" add="1.24"/>

<Server/>

模块级函数，直接调用。

开启服务端协程，实现函数分段式执行，可用于缓解复杂逻辑计算导致游戏卡顿问题。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(
    iterOrFunc: Union[Generator, Callable],
    callback: Optional[Callable] = None,
) -> Generator
```

- iterOrFunc: Union[Generator, Callable]，传入带有 yield 的函数或传入生成器。如传入生成器则将从生成器中断位置开始执行,如传入函数将从头开始执行。
- callback: Optional[Callable]，协程执行完后的回调函数，默认为 None。

**返回值**：Generator，函数生成器。如果传入的 iterOrFunc 不是带有 yield 的函数或者生成器时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
#通过生成器执行协程
import server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(serverApi.GetLevelId())

def callback():
    print "callback"

def coroutineTest():
    for i in xrange(1000):
        print i
        yield

generator = serverApi.StartCoroutine(coroutineTest, callback)
#执行1秒后停止协程
comp.AddTimer(1.0, serverApi.StopCoroutine, generator)
#5秒后传入StartCoroutine返回的生成器，则函数将从停止位置继续执行
comp.AddTimer(5.0, serverApi.StartCoroutine, generator, callback)

#----------------------------------------------------------------

#通过函数执行协程
import server.extraServerApi as serverApi
def callback():
    print "callback"

def coroutineTest():
    for i in xrange(1000):
        print i
        yield
#传入函数，函数将从头开始执行
serverApi.StartCoroutine(coroutineTest, callback)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

开启客户端协程，实现函数分段式执行，可用于缓解复杂逻辑计算导致游戏卡顿问题。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(
    iterOrFunc: Union[Generator, Callable],
    callback: Optional[Callable] = None,
) -> Generator
```

- iterOrFunc: Union[Generator, Callable]，传入带有 yield 的函数或传入生成器。如传入生成器则将从生成器中断位置开始执行,如传入函数将从头开始执行。
- callback: Optional[Callable]，协程执行完后的回调函数，默认为 None。

**返回值**：Generator，函数生成器。如果传入的 iterOrFunc 不是带有 yield 的函数或者生成器时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
#通过生成器执行协程
import client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(clientApi.GetLevelId())

def callback():
    print "callback"

def coroutineTest():
    for i in xrange(1000):
        print i
        yield

generator = clientApi.StartCoroutine(coroutineTest, callback)
#执行1秒后停止协程
comp.AddTimer(1.0, clientApi.StopCoroutine, generator)
#执行5秒后传入StartCoroutine返回的生成器，则函数将从停止位置继续执行
comp.AddTimer(5.0, clientApi.StartCoroutine, generator, callback)

#----------------------------------------------------------------

#通过函数执行协程
import client.extraClientApi as clientApi
def callback():
    print "callback"

def coroutineTest():
    for i in xrange(1000):
        print i
        yield
#传入函数，函数将从头开始执行
clientApi.StartCoroutine(coroutineTest, callback)
```

</TabItem>
</Tabs>

---

### StopCoroutine

<Version type="china" add="1.24"/>

<Server/>

模块级函数，直接调用。

停止协程。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(iter: Generator) -> bool
```

- iter: Generator，需要停止的生成器对象,[StartCoroutine](/docs/docs/scripts/modapi/interfaces/general/tool#startcoroutine) 的返回值。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.StopCoroutine(generator)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

停止客户端协程。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(iter: Generator) -> bool
```

- iter: Generator，需要停止的生成器对象,[StartCoroutine](/docs/docs/scripts/modapi/interfaces/general/tool#startcoroutine) 的返回值。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.StopCoroutine(generator)
```

</TabItem>
</Tabs>

---
