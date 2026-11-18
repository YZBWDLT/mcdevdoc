---
sidebar_position: 7
---

# 魔法指令

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录魔法指令相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/mofazhiling.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### Disable

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

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

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

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
