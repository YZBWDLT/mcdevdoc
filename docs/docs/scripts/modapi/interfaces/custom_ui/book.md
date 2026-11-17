---
sidebar_position: 4
---

# 自定义书本

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录自定义书本相关的接口，共 1 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/zidingyi-ui/zidingyishuben.html"/>

---

### GetBookManager

<Client/>

模块级函数，直接调用。

获取书本管理对象。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBookManager() -> BookManager
```


**返回值**：BookManager，所有书本的管理对象。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
bookManager = clientApi.GetBookManager()
```

</TabItem>
</Tabs>

---
