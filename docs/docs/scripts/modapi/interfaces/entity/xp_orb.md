---
sidebar_position: 6
---

# 经验球

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录经验球相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/jingyanqiu.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### GetOrbExperience

<Version type="china" add="1.21"/>

<Server/> ExpComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateExp(entityId)`

获取经验球的经验。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOrbExperience() -> int
```


**返回值**：int，经验值，正整数。获取失败的情况下返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExp(entityId)
print(comp.GetOrbExperience())
```

</TabItem>
</Tabs>

---

### SetOrbExperience

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> ExpComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateExp(entityId)`

设置经验球经验。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetOrbExperience(exp: int) -> bool
```

- exp: int，经验球经验。

**返回值**：bool，设置是否成功。

**备注**

- 设置经验球经验，entityId 是经验球的 entityId,如果经验小于等于 0，拾取后不再加经验。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateExp(entityId)
comp.SetOrbExperience(25)
```

</TabItem>
</Tabs>

---
