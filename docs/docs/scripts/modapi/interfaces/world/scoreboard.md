---
sidebar_position: 4
---

# 记分板

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录记分板相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/jifenban.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### GetAllPlayerScoreboardObjects

<Version type="china" add="2.11"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家记分项。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> List[Dict[str, Any]]
```


**返回值**：List[Dict[str, Any]]，[玩家记分项信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#玩家记分项信息字典列表#玩家记分项信息字典列表)列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetAllPlayerScoreboardObjects())
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取玩家记分项。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> List[Dict[str, Any]]
```


**返回值**：List[Dict[str, Any]]，[玩家记分项信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#玩家记分项信息字典列表#玩家记分项信息字典列表)列表。

**备注**

- 注意，只有使用命令 /scoreboard objectives setdisplay sidebar xxx 设置显示后的记分项才能在客户端侧获取到。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetAllPlayerScoreboardObjects())
```

</TabItem>
</Tabs>

---

### GetAllScoreboardObjects

<Version type="china" add="2.11"/>

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

获取所有记分板项。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> List[Dict[str, Any]]
```


**返回值**：List[Dict[str, Any]]，[记分准则信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#记分板记分准则信息字典#记分板记分准则信息字典)列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetAllScoreboardObjects())
```

</TabItem>
</Tabs>

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取所有记分板项。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> List[Dict[str, Any]]
```


**返回值**：List[Dict[str, Any]]，[记分准则信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#记分板记分准则信息字典#记分板记分准则信息字典)列表。

**备注**

- 注意，只有使用命令 /scoreboard objectives setdisplay sidebar xxx 设置显示后的记分项才能在客户端侧获取到。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.GetAllScoreboardObjects())
```

</TabItem>
</Tabs>

---
