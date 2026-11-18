---
sidebar_position: 107
---

# 组件

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录组件相关的接口，共 6 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/tongyong/zujian.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### CreateComponent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

给实体创建服务端组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(entityId: Union[str, int], nameSpace: str, name: str) -> BaseComponent
```

- entityId: Union[str, int]，该组件属主的实体 id。
- nameSpace: str，组件的命名空间，registerComponent 的 namespace。
- name: str，组件的名字。

**返回值**：BaseComponent，组件实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.CreateComponent(entityId, "Minecraft", "item")
# 拿到comp后就可以做一些逻辑内容，与GetComponent类似，如果已经创建会自动直接Get
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

给实体创建客户端组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(entityId: Union[str, int], nameSpace: str, name: str) -> BaseComponent
```

- entityId: Union[str, int]，该组件属主的实体 id。
- nameSpace: str，组件的命名空间，registerComponent 的 namespace。
- name: str，组件的名字。

**返回值**：BaseComponent，组件实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.CreateComponent(clientApi.GetLocalPlayerId(), "Minecraft", "item")
# 拿到comp后就可以做一些逻辑内容，与GetComponent类似，如果已经创建会自动直接Get
```

</TabItem>
</Tabs>

---

### DestroyComponent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

删除实体的服务端组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(entityId: str, nameSpace: str, name: str) -> Any
```

- entityId: str，该组件属主的实体 id。
- nameSpace: str，组件的命名空间，registerComponent 的 namespace。
- name: str，组件的名字。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# entityId 根据游戏实际Id获取，这里'-12345678910'只是随便写的
comp = serverApi.DestroyComponent('-12345678910', "Minecraft", "item")
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

删除实体的客户端组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(entityId: str, nameSpace: str, name: str) -> Any
```

- entityId: str，该组件属主的实体 id。
- nameSpace: str，组件的命名空间，registerComponent 的 namespace。
- name: str，组件的名字。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.DestroyComponent(clientApi.GetLocalPlayerId(), "Minecraft", "item")
```

</TabItem>
</Tabs>

---

### GetComponent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

获取实体的服务端组件。一般用来判断某个组件是否创建过，其他情况请使用 [CreateComponent](/docs/docs/scripts/modapi/interfaces/general/component#createcomponent)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(entityId: str, nameSpace: str, name: str) -> BaseComponent
```

- entityId: str，该组件属主的实体 id。
- nameSpace: str，组件的命名空间，registerComponent 的 namespace。
- name: str，组件的名字。

**返回值**：BaseComponent，组件实例或者 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetComponent(entityId, "Minecraft", "item")
# 拿到comp后就可以做一些逻辑内容，如果没有创建过会返回None
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取实体的客户端组件。一般用来判断某个组件是否创建过，其他情况请使用 [CreateComponent](/docs/docs/scripts/modapi/interfaces/general/component#createcomponent)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(entityId: str, nameSpace: str, name: str) -> BaseComponent
```

- entityId: str，该组件属主的实体 id。
- nameSpace: str，组件的命名空间，registerComponent 的 namespace。
- name: str，组件的名字。

**返回值**：BaseComponent，组件实例或者 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetComponent(clientApi.GetLocalPlayerId(), "Minecraft", "item")
# 拿到comp后就可以做一些逻辑内容，如果没有创建过会返回None
```

</TabItem>
</Tabs>

---

### GetComponentCls

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

用于获取服务器 component 基类。实现新的 component 时，需要继承该接口返回的类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> type(BaseComponent)
```


**返回值**：type(BaseComponent)，组件基类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerComponentCls = serverApi.GetComponentCls()
# Component要继承于基类才能生效
class ShootComponentServer(ServerComponentCls):
    def __init__(self, entityId):
        ServerComponentCls.__init__(self, entityId)
        # 这里设置了一个开关来开关更新射击
        self.mShoot = False
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

用于获取客户端 component 基类。实现新的 component 时，需要继承该接口返回的类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> type(BaseComponent)
```


**返回值**：type(BaseComponent)，组件基类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientComponentCls = clientApi.GetComponentCls()
# Component要继承于基类才能生效
class ShootComponentClient(ClientComponentCls):
    def __init__(self, entityId):
        ClientComponentCls.__init__(self, entityId)
        # 这里设置了一个开关来开关更新射击
        self.mShoot = False
```

</TabItem>
</Tabs>

---

### GetEngineCompFactory

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

获取引擎组件的工厂，通过工厂可以创建服务端的引擎组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> EngineCompFactoryServer
```


**返回值**：EngineCompFactoryServer，服务端引擎组件工厂。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
compFactory = serverApi.GetEngineCompFactory()
gameComp = compFactory.CreateGame(serverApi.GetLevelId())
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取引擎组件的工厂，通过工厂可以创建客户端的引擎组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> EngineCompFactoryClient
```


**返回值**：EngineCompFactoryClient，客户端引擎组件工厂。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
compFactory = clientApi.GetEngineCompFactory()
gameComp = compFactory.CreateGame(clientApi.GetLevelId())
```

</TabItem>
</Tabs>

---

### RegisterComponent

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

用于将组件注册到引擎中。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(nameSpace: str, name: str, clsPath: str) -> bool
```

- nameSpace: str，命名空间，建议为 mod 名字。
- name: str，组件名称。
- clsPath: str，组件类路径，路径从脚本的第一层开始算起。

**返回值**：bool，注册成功与否。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
@Mod.InitServer()
def TutorialServerInit(self):
    # 注册一个自定义的服务端Component
    serverApi.RegisterComponent("TutorialMod", "ServerShoot", "tutorialScripts.modServer.serverComponent.shootComponentServer.ShootComponentServer")
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

用于将组件注册到引擎中。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(nameSpace: str, name: str, clsPath: str) -> bool
```

- nameSpace: str，命名空间，建议为 mod 名字。
- name: str，组件名称。
- clsPath: str，组件类路径，路径从脚本的第一层开始算起。

**返回值**：bool，注册成功与否。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
@Mod.InitClient()
def TutorialClientInit(self):
    # 注册一个自定义的客户端Component
    clientApi.RegisterComponent("TutorialMod", "ClientShoot", "tutorialScripts.modClient.clientComponent.shootComponentClient.ShootComponentClient")
```

</TabItem>
</Tabs>

---
