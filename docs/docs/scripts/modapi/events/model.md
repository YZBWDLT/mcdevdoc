---
sidebar_position: 8
---

# 模型

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录模型相关的事件，共 9 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/moxing.html"/>

---

### AttackAnimBeginClientEvent

<Client/>

攻击动作开始时触发。

```python
AttackAnimBeginClientEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/model#setmodel) 替换骨骼模型后，该事件才生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AttackAnimBeginServerEvent

<Server/>

当攻击动作开始时触发。

```python
AttackAnimBeginServerEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/model#setmodel) 替换骨骼模型后，该事件才生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AttackAnimEndClientEvent

<Client/>

攻击动作结束时触发。

```python
AttackAnimEndClientEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/model#setmodel) 替换骨骼模型后，该事件才生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AttackAnimEndServerEvent

<Server/>

当攻击动作结束时触发。

```python
AttackAnimEndServerEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/model#setmodel) 替换骨骼模型后，该事件才生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### JumpAnimBeginServerEvent

<Server/>

当跳跃动作开始时触发。

```python
JumpAnimBeginServerEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/model#setmodel) 替换骨骼模型后，该事件才生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### WalkAnimBeginClientEvent

<Client/>

走路动作开始时触发。

```python
WalkAnimBeginClientEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/model#setmodel) 替换骨骼模型后，该事件才生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### WalkAnimBeginServerEvent

<Server/>

当走路动作开始时触发。

```python
WalkAnimBeginServerEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/model#setmodel) 替换骨骼模型后，该事件才生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### WalkAnimEndClientEvent

<Client/>

走路动作结束时触发。

```python
WalkAnimEndClientEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/model#setmodel) 替换骨骼模型后，该事件才生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### WalkAnimEndServerEvent

<Server/>

当走路动作结束时触发。

```python
WalkAnimEndServerEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 使用 [SetModel](/docs/docs/scripts/modapi/model#setmodel) 替换骨骼模型后，该事件才生效。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---
