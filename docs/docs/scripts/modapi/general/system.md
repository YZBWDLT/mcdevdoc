---
sidebar_position: 108
---

# 系统

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录系统相关的接口，共 4 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/tongyong/xitong.html"/>

---

### GetClientSystemCls

<Client/>

模块级函数，直接调用。

用于获取客户端 system 基类。实现新的 system 时，需要继承该接口返回的类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetClientSystemCls() -> type(ClientSystem)
```


**返回值**：type(ClientSystem)，客户端系统类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()
class FpsClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
```

</TabItem>
</Tabs>

---

### GetServerSystemCls

<Server/>

模块级函数，直接调用。

用于获取服务器 system 基类。实现新的 system 时，需要继承该接口返回的类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetServerSystemCls() -> type(ServerSystem)
```


**返回值**：type(ServerSystem)，服务端系统类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
class FpsServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
```

</TabItem>
</Tabs>

---

### GetSystem

<Server/>

模块级函数，直接调用。

获取已注册的系统。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSystem(nameSpace: str, systemName: str) -> ServerSystem
```

- nameSpace: str，命名空间，建议为 mod 名字。
- systemName: str，系统名称，自定义名称，可以使用英文、拼音和下划线，建议尽量个性化。

**返回值**：ServerSystem，返回具体系统的实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverSystem = serverApi.GetSystem("TutorialMod", "TutorialServerSystem")
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

用于获取其他系统实例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSystem(nameSpace: str, systemName: str) -> ClientSystem
```

- nameSpace: str，系统注册的命名空间，一般为 mod 名字。
- systemName: str，要获取的系统名称。

**返回值**：ClientSystem，返回具体系统的实例，如果获取不到则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()
class FpsClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.tutorialSystem = clientApi.GetSystem("TutorialMod", "TutorialClientSystem")
```

</TabItem>
</Tabs>

---

### RegisterSystem

<Server/>

模块级函数，直接调用。

用于将系统注册到引擎中，引擎会创建一个该系统的实例，并在退出游戏时回收。系统可以执行我们引擎赋予的基本逻辑，例如监听事件、执行 Tick 函数、与客户端进行通讯等。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterSystem(nameSpace: str, systemName: str, clsPath: str) -> ServerSystem
```

- nameSpace: str，命名空间，建议为 mod 名字。
- systemName: str，系统名称，自定义名称，可以使用英文、拼音和下划线，建议尽量个性化。
- clsPath: str，组件类路径，路径从脚本的第一层开始算起。

**返回值**：ServerSystem，返回具体系统的实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# 系统system的注册是在modMain.py的MOD类中
# 服务端系统system的注册方式
@Mod.InitServer()
def TutorialServerInit(self):
    serverApi.RegisterSystem("TutorialMod", "TutorialServerSystem", "tutorialScripts.tutorialServerSystem.TutorialServerSystem")
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

用于将系统注册到引擎中，引擎会创建一个该系统的实例，并在退出游戏时回收。系统可以执行我们引擎赋予的基本逻辑，例如监听事件、执行 Tick 函数、与服务端进行通讯等。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterSystem(nameSpace: str, systemName: str, clsPath: str) -> ClientSystem
```

- nameSpace: str，命名空间，建议为 mod 名字。
- systemName: str，系统名称，自定义名称，可以使用英文、拼音和下划线，建议尽量个性化。
- clsPath: str，组件类路径，路径从脚本的第一层开始算起。

**返回值**：ClientSystem，返回具体系统的实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 系统system的注册是在modMain.py的MOD类中
# 客户端系统system的注册方式
@Mod.InitClient()
def TutorialClientInit(self):
    clientApi.RegisterSystem("TutorialMod", "TutorialClientSystem", "tutorialScripts.tutorialClientSystem.TutorialClientSystem")
```

</TabItem>
</Tabs>

---
