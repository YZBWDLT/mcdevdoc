---
sidebar_position: 15
---

# 自定义数据

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录自定义数据相关的接口，共 5 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/zidingyishuju.html"/>

---

### CleanExtraData

<Server/> ExDataCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateExtraData(entityId)`

清除实体的自定义数据或者世界的自定义数据，清除实体数据时使用对应实体 id 创建组件，清除世界数据时使用 levelId 创建组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CleanExtraData(key: str) -> bool
```

- key: str，自定义 key。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# 清除实体数据
entitycomp = serverApi.GetEngineCompFactory().CreateExtraData(entityId)
suc = entitycomp.CleanExtraData("nickname")
print "CleanExtraData entity=%s suc=%s" % (entityId, suc)
# 清除全局数据
levelcomp = serverApi.GetEngineCompFactory().CreateExtraData(levelId)
suc = levelcomp.CleanExtraData("globalMsg")
print "CleanExtraData for level suc=%s" % suc
```

</TabItem>
</Tabs>

---

### GetExtraData

<Server/> ExDataCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateExtraData(levelId)`

获取实体的自定义数据或者世界的自定义数据，某个键所对应的值。获取实体数据时使用对应实体 id 创建组件，获取世界数据时使用 levelId 创建组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetExtraData(key: str) -> Any
```

- key: str，自定义 key。

**返回值**：Any，key 对应的值。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 获取全局数据
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExtraData(levelId)
levelExData = comp.GetExtraData("globalMsg")
# 获取
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExtraData(entityId)
nickName = comp.GetExtraData("nickName")
```

</TabItem>
</Tabs>

---

### GetWholeExtraData

<Server/> ExDataCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateExtraData(entityId)`

获取完整的实体的自定义数据或者世界的自定义数据，获取实体数据时使用对应实体 id 创建组件，获取世界数据时使用 levelId 创建组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetWholeExtraData() -> Optional[Dict[str, Any]]
```


**返回值**：Optional[Dict[str, Any]]，获取指定实体或者全局的额外存储数据字典，假如没有任何额外存储数据，那么返回 None 或者空字典。

</TabItem>
<TabItem value="示例" label="示例">

```python
#获取实体数据字典
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExtraData(entityId)
dataDict = comp.GetWholeExtraData()
if dataDict:
    for key, value in dataDict.iteritems():
        print "key=%s value=%s" % (key, str(value))
#获取全局数据字典
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExtraData(levelId)
dataDict = comp.GetWholeExtraData()
if dataDict:
    for key, value in dataDict.iteritems():
        print "key=%s value=%s" % (key, str(value))
```

</TabItem>
</Tabs>

---

### SaveExtraData

<Server/> ExDataCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateExtraData(entityId)`

用于保存实体的自定义数据或者世界的自定义数据。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SaveExtraData() -> bool
```


**返回值**：bool，保存结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# 设置实体的自定义数据
entitycomp = serverApi.GetEngineCompFactory().CreateExtraData(entityId)
entitycomp.SetExtraData("nickname", "steve", False)
entitycomp.SetExtraData("score", 256, False)
# more data to set
entitycomp.SaveExtraData()
```

</TabItem>
</Tabs>

---

### SetExtraData

<Server/> ExDataCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateExtraData(entityId)`

用于设置实体的自定义数据或者世界的自定义数据，数据以键值对的形式保存。设置实体数据时使用对应实体 id 创建组件，设置世界数据时使用 levelId 创建组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetExtraData(key: str, value: Any, autoSave: bool) -> bool
```

- key: str，自定义 key。
- value: Any，key 对应的值，支持 python 基本数据类型。
- autoSave: bool，默认自动保存，默认为 True，如果批量设置数据，请将该参数设置为 False，同时在设置数据完毕时调用 [SaveExtraData](/docs/docs/scripts/modapi/interfaces/world/custom_data#saveextradata) 接口。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# 设置实体的自定义数据
entitycomp = serverApi.GetEngineCompFactory().CreateExtraData(entityId)
entitycomp.SetExtraData("nickname","steve")
entitycomp.SetExtraData("score",256)
# 设置世界的自定义数据
levelcomp = serverApi.GetEngineCompFactory().CreateExtraData(levelId)
levelcomp.SetExtraData("globalMsg","helloWorld")
```

</TabItem>
</Tabs>

---
