---
sidebar_position: 8
---

# 抛射物

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录抛射物相关的接口，共 1 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/paoshewu.html"/>

---

### GetSourceEntityId

<Server/> BulletAttributesComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBulletAttributes(entityId)`

获取抛射物发射者实体 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSourceEntityId() -> str
```


**返回值**：str，抛射物发射者实体 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBulletAttributes(entityId)
comp.GetSourceEntityId()
```

</TabItem>
</Tabs>

---
