---
sidebar_position: 21
---

# 山头服务器

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录山头服务器相关的接口，共 1 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shantoufuwuqi.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### GetHostPlayerUid

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> DomainGameCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDomainGame(levelId)`

获取服务器拥有者的 uid。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetHostPlayerUid() -> int
```


**返回值**：int，服务器拥有者 uid。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDomainGame(levelId)
uid = comp.GetHostPlayerUid()
```

</TabItem>
</Tabs>

---
