---
sidebar_position: 5
---

# 官方聊天扩展

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录官方聊天扩展相关的接口，共 7 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/guanfangliaotiankuozhan.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### AddCommonPhrases

<Version type="china" add="2.7"/>

<Server/> ChatExtensionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateChatExtension(playerId)`

为官方聊天扩展功能添加常用短语。单人模式下单个模组最多添加 12 条，联机大厅和网络服无条数限制。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddCommonPhrases(id: int, content: str) -> bool
```

- id: int，聊天短语的唯一 id，若使用了相同的 id 会覆盖原有文本内容。
- content: str，聊天短语的文本内容，文本字数限制 20，超出时添加失败。

**返回值**：bool，添加结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChatExtension(playerId)
comp.AddCommonPhrases(1001, "大家一起合作吧")
```

</TabItem>
</Tabs>

---

### Disable

<Version type="china" add="2.5"/>

<Server/> ChatExtensionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateChatExtension(playerId)`

关闭官方聊天扩展功能。需要在 [ClientLoadAddonsFinishServerEvent](/docs/docs/scripts/modapi/events/world#clientloadaddonsfinishserverevent) 事件中调用。仅在联机大厅和网络服中生效。

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
comp = serverApi.GetEngineCompFactory().CreateChatExtension(playerId)
comp.Disable()
```

</TabItem>
</Tabs>

---

### Enable

<Version type="china" add="2.5"/>

<Server/> ChatExtensionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateChatExtension(playerId)`

启用官方聊天扩展功能。需要在 [ClientLoadAddonsFinishServerEvent](/docs/docs/scripts/modapi/events/world#clientloadaddonsfinishserverevent) 事件中调用。仅在联机大厅和网络服中生效。

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
comp = serverApi.GetEngineCompFactory().CreateChatExtension(playerId)
comp.Enable()
```

</TabItem>
</Tabs>

---

### RegisterChatPrefix

<Version type="china" add="2.7"/>

<Server/> ChatExtensionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateChatExtension(playerId)`

为游戏内指定玩家注册聊天前缀。仅在主界面消息框和聊天界面游戏频道生效。建议在 [AddServerPlayerEvent](/docs/docs/scripts/modapi/events/world#addserverplayerevent) 事件中调用，为新玩家添加前缀。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterChatPrefix(prefix: str, prefixColor: str) -> bool
```

- prefix: str，聊天前缀文本。字数限制 10，超出部分舍弃尾部字符。若在前缀文本中额外使用颜色代码会导致 prefixColor 参数失效，颜色代码同样占用字数限制。
- prefixColor: str，聊天前缀文本颜色代码。可以使用 GenerateColor 接口传入参数。

**返回值**：bool，注册结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChatExtension(playerId)
comp.RegisterChatPrefix("魔王", serverApi.GenerateColor('RED'))
```

</TabItem>
</Tabs>

---

### RemoveCommonPhrases

<Version type="china" add="2.7"/>

<Server/> ChatExtensionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateChatExtension(playerId)`

为官方聊天扩展功能移除常用短语。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveCommonPhrases(id: int) -> bool
```

- id: int，聊天短语的唯一 id。

**返回值**：bool，移除结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChatExtension(playerId)
comp.RemoveCommonPhrases(1001)
```

</TabItem>
</Tabs>

---

### SetShowOfficialPhrases

<Version type="china" add="2.7"/>

<Server/> ChatExtensionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateChatExtension(playerId)`

设置是否显示官方的常用聊天短语。仅在联机大厅和网络服中生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetShowOfficialPhrases(show: bool) -> bool
```

- show: bool，是否显示。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChatExtension(playerId)
comp.SetShowOfficialPhrases(False) # 不显示
```

</TabItem>
</Tabs>

---

### SetShowSocialNearbyInfo

<Version type="china" add="2.7"/>

<Server/> ChatExtensionComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateChatExtension(playerId)`

设置是否显示官方聊天社交界面中同一游戏玩家是否在附近信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetShowSocialNearbyInfo(show: bool) -> bool
```

- show: bool，是否显示。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateChatExtension(playerId)
comp.SetShowSocialNearbyInfo(False) # 不显示
```

</TabItem>
</Tabs>

---
