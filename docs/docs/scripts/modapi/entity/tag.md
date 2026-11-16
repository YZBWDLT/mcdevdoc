---
sidebar_position: 2
---

# 标签

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录标签相关的接口，共 4 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/biaoqian.html"/>

---

### AddEntityTag

<Server/> TagComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateTag(entityId)`

增加实体标签。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEntityTag(tag: str) -> bool
```

- tag: str，标签名。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateTag(entityId)
comp.AddEntityTag("AAA")
```

</TabItem>
</Tabs>

---

### EntityHasTag

<Server/> TagComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateTag(entityId)`

判断实体是否存在某个指定的标签。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EntityHasTag(tag: str) -> bool
```

- tag: str，标签名。

**返回值**：bool，是否包含标签。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateTag(entityId)
comp.EntityHasTag("AAA")
```

</TabItem>
</Tabs>

---

### GetEntityTags

<Server/> TagComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateTag(entityId)`

获取实体标签列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityTags() -> List[str]
```


**返回值**：List[str]，标签列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateTag(entityId)
comp.GetEntityTags()
```

</TabItem>
</Tabs>

---

### RemoveEntityTag

<Server/> TagComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateTag(entityId)`

移除实体某个指定的标签。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveEntityTag(tag: str) -> bool
```

- tag: str，标签名。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateTag(entityId)
comp.RemoveEntityTag("AAA")
```

</TabItem>
</Tabs>

---
