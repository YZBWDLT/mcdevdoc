---
sidebar_position: 19
---

# 商城

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录商城相关的接口，共 5 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shangcheng.html"/>

---

### CloseShopWindow

<Client/> NeteaseShopCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)`

关闭网易商城窗口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CloseShopWindow() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)
comp.CloseShopWindow()
```

</TabItem>
</Tabs>

---

### HideShopGate

<Client/> NeteaseShopCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)`

隐藏网易商城入口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideShopGate() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)
comp.HideShopGate()
```

</TabItem>
</Tabs>

---

### OpenItemDetailWindow

<Client/> NeteaseShopCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)`

打开特定商品的详情界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenItemDetailWindow(categoryName: str, itemName: str) -> Any
```

- categoryName: str，商品分类名称。
- itemName: str，商品名称。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)
comp.OpenItemDetailWindow("商品", "测试商品1")
```

</TabItem>
</Tabs>

---

### OpenShopWindow

<Client/> NeteaseShopCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)`

打开网易商城窗口。PC 端无效（Apollo 的 PC 端请使用商城插件）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenShopWindow() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)
comp.OpenShopWindow()
```

</TabItem>
</Tabs>

---

### ShowShopGate

<Client/> NeteaseShopCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)`

显示网易商城入口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ShowShopGate() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateNeteaseShop(levelId)
comp.ShowShopGate()
```

</TabItem>
</Tabs>

---
