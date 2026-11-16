---
sidebar_position: 7
---

# 魔法指令

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录魔法指令相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/mofazhiling.html"/>

---

### Disable

<Server/> AiCommandComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateAiCommand(playerId)`

关闭官方魔法指令功能。需要在 [ClientLoadAddonsFinishServerEvent](/docs/docs/scripts/modapi/events/world#clientloadaddonsfinishserverevent) 事件中调用。仅在联机大厅中生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Disable() -> bool
```


**返回值**：bool，关闭结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateAiCommand(playerId)
comp.Disable()
```

</TabItem>
</Tabs>

---

### Enable

<Server/> AiCommandComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateAiCommand(playerId)`

启用官方魔法指令功能。需要在 [ClientLoadAddonsFinishServerEvent](/docs/docs/scripts/modapi/events/world#clientloadaddonsfinishserverevent) 事件中调用。仅在联机大厅中生效。

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
comp = serverApi.GetEngineCompFactory().CreateAiCommand(playerId)
comp.Enable()
```

</TabItem>
</Tabs>

---
