---
sidebar_position: 10
---

# 消息

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录消息相关的接口，共 10 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/xiaoxi.html"/>

---

### NotifyOneMessage

<Server/> MsgComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateMsg(playerId)`

给指定玩家发送聊天框消息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
NotifyOneMessage(playerId: str, msg: str, color: str) -> Any
```

- playerId: str，指定玩家 id。
- msg: str，消息内容。
- color: str，颜色样式代码字符串，可参考 wiki[样式代码](https://zh.minecraft.wiki/w/%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%BB%A3%E7%A0%81)，默认为白色。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateMsg(playerId)
comp.NotifyOneMessage(playerId, "test", "§c")
```

</TabItem>
</Tabs>

---

### SendMsg

<Server/> MsgComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateMsg(levelId)`

模拟玩家给所有人发送聊天栏消息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SendMsg(name: str, msg: str) -> bool
```

- name: str，发送者玩家的名字。
- msg: str，消息内容。

**返回值**：bool，设置结果。

**备注**

- name 参数需要设置玩家的名字(可通过 name 组件的 [GetName](/docs/docs/scripts/modapi/entity/attribute#getname) 接口获取)，如果设置的玩家名字不存在，则随机找一个玩家发出该消息。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateMsg(levelId)
comp.SendMsg("playerName","test")
```

</TabItem>
</Tabs>

---

### SendMsgToPlayer

<Server/> MsgComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateMsg(levelId)`

模拟玩家给另一个玩家发送聊天栏消息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SendMsgToPlayer(fromEntityId: str, toEntityId: str, msg: str) -> Any
```

- fromEntityId: str，发送者玩家 ID。
- toEntityId: str，接受者玩家 ID。
- msg: str，消息内容。

</TabItem>
<TabItem value="示例" label="示例">

```python
comp = serverApi.GetEngineCompFactory().CreateMsg(levelId)
comp.SendMsgToPlayer(fromPlayerId, toPlayerId, "test")
```

</TabItem>
</Tabs>

---

### SetLeftCornerNotify

<Client/> TextNotifyComponet

获取组件：`clientApi.GetEngineCompFactory().CreateTextNotifyClient(levelId)`

客户端设置左上角通知信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLeftCornerNotify(textMsg: str) -> bool
```

- textMsg: str，通知内容。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextNotifyClient(levelId)
comp.SetLeftCornerNotify("做好准备")
```

</TabItem>
</Tabs>

---

### SetNotifyMsg

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

设置消息通知。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetNotifyMsg(msg: str, color: str) -> bool
```

- msg: str，消息内容。
- color: str，使用 GenerateColor 接口获取的颜色，默认为白色。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.SetNotifyMsg("消息通知", serverApi.GenerateColor('BLUE'))
```

</TabItem>
</Tabs>

---

### SetOnePopupNotice

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(playerId)`

在具体某个玩家的物品栏上方弹出 popup 类型通知，位置位于 tip 类型消息下方，此功能更建议客户端使用 game 组件的对应接口 [SetPopupNotice](/docs/docs/scripts/modapi/world/message#setpopupnotice)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetOnePopupNotice(playerId: str, message: str, subtitle: str) -> bool
```

- playerId: str，具体玩家 Id。
- message: str，消息内容,可以在消息前增加 extraServerApi.GenerateColor("RED")字符来设置颜色，具体参考样例。
- subtitle: str，消息子标题内容,效果同 message，也可设置颜色，位置位于 message 上方。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(playerId)
# playerId 变量改为具体的玩家Id
comp.SetOnePopupNotice(playerId, serverApi.GenerateColor("RED") + "消息通知", "消息子标题")
```

</TabItem>
</Tabs>

---

### SetOneTipMessage

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(playerId)`

在具体某个玩家的物品栏上方弹出 tip 类型通知，位置位于 popup 类型通知上方，此功能更建议在客户端使用 game 组件的对应接口 [SetTipMessage](/docs/docs/scripts/modapi/world/message#settipmessage)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetOneTipMessage(playerId: str, message: str) -> bool
```

- playerId: str，具体玩家 Id。
- message: str，消息内容,可以在消息前增加 extraServerApi.GenerateColor("RED")字符来设置颜色，具体参考样例。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(playerId)
# playerId 变量改为具体的玩家Id
comp.SetOneTipMessage(playerId, serverApi.GenerateColor("RED") + "tip提示")
```

</TabItem>
</Tabs>

---

### SetPopupNotice

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

在所有玩家物品栏上方弹出 popup 类型通知，位置位于 tip 类型消息下方。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPopupNotice(message: str, subtitle: str) -> bool
```

- message: str，消息内容,可以在消息前增加 extraServerApi.GenerateColor("RED")字符来设置颜色，具体参考样例。
- subtitle: str，消息子标题内容,效果同 message，也可设置颜色，位置位于 message 上方。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.SetPopupNotice(serverApi.GenerateColor("RED") + "消息通知", "消息子标题")
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(entityId)`

在本地玩家的物品栏上方弹出 popup 类型通知，位置位于 tip 类型消息下方。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPopupNotice(message: str, subtitle: str) -> bool
```

- message: str，消息内容,可以在消息前增加 extraClientApi.GenerateColor("RED")字符来设置颜色，具体参考样例。
- subtitle: str，消息子标题内容,效果同 message，也可设置颜色，位置位于 message 上方。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(entityId)
comp.SetPopupNotice(clientApi.GenerateColor("RED") + "消息通知", "消息子标题")
```

</TabItem>
</Tabs>

---

### SetPopupState

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(entityId)`

设置 Popup 消息栏状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPopupState(state: int) -> bool
```

- state: int，状态值，0 为原版开启状态，1 为关闭，2 为使用接口设置的物品 dict 中 customTips 的第一行作为弹出信息。

**返回值**：bool，是否成功。

**备注**

- 注意：该设置不会存档，如果是配在 json 里面的 custom_tips 组件中的内容，使用 2 模式是无法显示的，只有使用物品 dict 相关的接口设置的 customTips 才能生效、

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(entityId)
comp.SetPopupState(2)
```

</TabItem>
</Tabs>

---

### SetTipMessage

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

在所有玩家物品栏上方弹出 tip 类型通知，位置位于 popup 类型通知上方。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTipMessage(message: str) -> bool
```

- message: str，消息内容,可以在消息前增加 extraServerApi.GenerateColor("RED")字符来设置颜色，具体参考样例。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
comp.SetTipMessage(serverApi.GenerateColor("RED") + "tip提示")
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(entityId)`

在本地玩家的物品栏上方弹出 tip 类型通知，位置位于 popup 类型通知上方。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTipMessage(message: str) -> bool
```

- message: str，消息内容,可以在消息前增加 extraClientApi.GenerateColor("RED")字符来设置颜色，具体参考样例。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(entityId)
comp.SetTipMessage(clientApi.GenerateColor("RED") + "tip提示")
```

</TabItem>
</Tabs>

---
