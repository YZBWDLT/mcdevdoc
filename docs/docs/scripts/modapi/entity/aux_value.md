---
sidebar_position: 3
---

# 附加值

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录附加值相关的接口，共 1 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/fujiazhi.html"/>

---

### GetAuxValue

<Server/> AuxValueComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateAuxValue(entityId)`

获取射出的弓箭或投掷出的药水的附加值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAuxValue() -> int
```


**返回值**：int，auxValue。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAuxValue(entityId)
comp.GetAuxValue()
```

</TabItem>
</Tabs>

<Client/> AuxValueComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateAuxValue(entityId)`

获取射出的弓箭或投掷出的药水的附加值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAuxValue() -> int
```


**返回值**：int，具体数值见 wiki 的“箭”及“药水”页面。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateAuxValue(entityId)
auxValue = comp.GetAuxValue()
```

</TabItem>
</Tabs>

---
