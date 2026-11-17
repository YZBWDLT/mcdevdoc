---
sidebar_position: 4
---

# 官方伙伴

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录官方伙伴相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/guanfanghuoban.html"/>

---

### Disable

<Server/> PetComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePet(levelId)`

关闭官方伙伴功能，单人游戏以及本地联机不支持该接口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Disable() -> bool
```


**返回值**：bool，关闭结果。

**备注**

- 请在 mod 初始化时调用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePet(levelId)
comp.Disable()
```

</TabItem>
</Tabs>

---

### Enable

<Server/> PetComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreatePet(levelId)`

启用官方伙伴功能，单人游戏以及本地联机不支持该接口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Enable() -> bool
```


**返回值**：bool，启用结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreatePet(levelId)
comp.Enable()
```

</TabItem>
</Tabs>

---
