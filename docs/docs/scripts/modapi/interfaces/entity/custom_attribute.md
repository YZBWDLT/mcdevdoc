---
sidebar_position: 14
---

# 自定义属性

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录自定义属性相关的接口，共 5 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/zidingyishuxing.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### GetAttr

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ModAttrComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateModAttr(entityId)`

获取 [SetAttr](/docs/docs/scripts/modapi/interfaces/entity/custom_attribute#setattr) 设置的属性值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(paramName: str, defaultValue: Any) -> Any
```

- paramName: str，属性名称，str 的名称建议以 mod 命名为前缀，避免多个 mod 之间冲突。
- defaultValue: Any，属性默认值，属性不存在时返回该默认值，此时属性值依然未设置。

**返回值**：Any，返回属性值。

**备注**

- defaultValue 不传的时候默认为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateModAttr(entityId)
comp.GetAttr('health')
# 如果直接修改GetAttr出来的集合类型，需要重新调用一遍SetAttr确保有进行更新
testDict = comp.GetAttr('testDict')
testDict['key'] = 'newValue'
comp.SetAttr('testDict', testDict)
```

</TabItem>
</Tabs>

<Client/> ModAttrComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModAttr(entityId)`

获取 [SetAttr](/docs/docs/scripts/modapi/interfaces/entity/custom_attribute#setattr) 设置的属性值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(paramName: str, defaultValue: Any) -> Any
```

- paramName: str，属性名称，str 的名称建议以 mod 命名为前缀，避免多个 mod 之间冲突。
- defaultValue: Any，属性默认值，属性不存在时返回该默认值，此时属性值依然未设置。

**返回值**：Any，返回属性值。

**备注**

- defaultValue 不传的时候默认为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModAttr(entityId)
comp.GetAttr('health')
```

</TabItem>
</Tabs>

---

### RegisterUpdateFunc

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ModAttrComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModAttr(entityId)`

注册属性值变换时的回调函数，当属性变化时会调用该函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterUpdateFunc(paramName: str, func: Callable) -> Any
```

- paramName: str，监听的属性名称。
- func: Callable，监听的回调函数。

**备注**

- 回调函数需要接受一个参数，参数是 dict，具体数据示例：

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 这个entityId传的是所需要监听的对象的Id
comp = clientApi.GetEngineCompFactory().CreateModAttr(entityId)
comp.RegisterUpdateFunc('health', self.jumpingText)
# 当脚本层的health属性变化时则会调用self.jumpingText
def jumpingText(self, data):
    entityId = data['entityId']
    oldValue = data['oldValue']
    newValue = data['newValue']
```

</TabItem>
</Tabs>

---

### SaveAttr

<Version type="china" add="2.10"/>

<Server/> ModAttrComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateModAttr(entityId)`

保存 [SetAttr](/docs/docs/scripts/modapi/interfaces/entity/custom_attribute#setattr) 设置的属性值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SaveAttr() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateModAttr(entityId)
#SetAttr第三个参数标记属性需要存储，第四个参数设置为不立刻存储
comp.SetAttr('health', 1, True, False)
comp.SetAttr('test', 123, True, False)
#此时调用SaveAttr会将'health'和'test'进行存储
comp.SaveAttr()
```

</TabItem>
</Tabs>

---

### SetAttr

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ModAttrComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateModAttr(entityId)`

设置属性值。服务端设置后会自动同步到客户端，可以用客户端的 [GetAttr](/docs/docs/scripts/modapi/interfaces/entity/custom_attribute#getattr) 获取。默认不会存档，需要存档的话可以设置 needRestore=True。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(
    paramName: str,
    paramValue: Any,
    needRestore: bool = False,
    autoSave: bool,
) -> Any
```

- paramName: str，属性名称，str 的名称建议以 mod 命名为前缀，避免多个 mod 之间冲突。
- paramValue: Any，属性值，支持 python 基础数据。
- needRestore: bool，该属性是否需要存档，默认为 False。
- autoSave: bool，是否需要立刻存档，当 needRestore 为 True 时生效。调用接口频繁时，可设置为 False 时，再另调用 [SaveAttr](/docs/docs/scripts/modapi/interfaces/entity/custom_attribute#saveattr) 进行统一存储，减少开销。

**备注**

- 注意：tuple、set 在同步时会转成 list。建议优先使用数字和字符串等非集合类型。
- 注意：当调用成功且 autoSave 参数为 True 时，会将之前所有 needRestore 标为 True 的属性做存储。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateModAttr(entityId)
comp.SetAttr('health', 1)
comp.SetAttr('testDict', {'key':'value'})
```

</TabItem>
</Tabs>

<Client/> ModAttrComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModAttr(entityId)`

设置客户端属性值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(paramName: str, paramValue: Any) -> Any
```

- paramName: str，属性名称，str 的名称建议以 mod 命名为前缀，避免多个 mod 之间冲突。
- paramValue: Any，属性值，支持 python 基础数据。

**备注**

- 注意：这里设置了只在本地有效，并不会同步到服务端和其他客户端。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModAttr(entityId)
comp.SetAttr('health', 1)
```

</TabItem>
</Tabs>

---

### UnRegisterUpdateFunc

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ModAttrComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModAttr(entityId)`

反注册属性值变换时的回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnRegisterUpdateFunc(paramName: str, func: Callable) -> Any
```

- paramName: str，监听的属性名称。
- func: Callable，监听的回调函数。

**备注**

- 需要传注册时的同一个函数作为参数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModAttr(entityId)
comp.UnRegisterUpdateFunc('health', self.jumpingText)
```

</TabItem>
</Tabs>

---
