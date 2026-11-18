---
sidebar_position: 3
---

# 动画

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录动画相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wanjia/donghua.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### PlayTpAnimation

<Version type="china" add="1.22"/>

<Client/> PlayerAnimCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerAnim(playerId)`

第三人称视角播放玩家通用动作。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayTpAnimation(anim: str) -> bool
```

- anim: str，动作名称，如 sneaking。

**返回值**：bool，是否成功。

**备注**

- 支持的动作包括：sneaking、sneaking_inverted、swim、sleeping、holding_left、holding_right、crossbow_hold、crossbow_equipped、bow_equipped、upside_down、tp_attack。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerAnim(playerId)
comp.PlayTpAnimation("sneaking")
```

</TabItem>
</Tabs>

---

### StopAnimation

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> PlayerAnimCompClient

获取组件：`clientApi.GetEngineCompFactory().CreatePlayerAnim(playerId)`

停止播放玩家通用动作。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopAnimation(anim: str) -> bool
```

- anim: str，动作名称，如 sneaking。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreatePlayerAnim(playerId)
comp.StopAnimation("sneaking")
```

</TabItem>
</Tabs>

---
