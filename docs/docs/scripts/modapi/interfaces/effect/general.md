---
sidebar_position: 3
---

# 通用

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录通用相关的接口，共 1 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/texiao/tongyong.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### DestroyEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ClientSystem

系统方法，在自定义 System 类中直接调用。

销毁特效。

```python
DestroyEntity(entityId: int) -> bool
```

- entityId: int，销毁的特效 ID。

**返回值**：bool，是否销毁成功。

**备注**

- 支持销毁粒子，序列帧及模型特效，示例见对应的创建接口。

---
