---
sidebar_position: 102
---

# 本地设备

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录本地设备相关的接口，共 6 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/tongyong/bendishebei.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### GetEngineVersion

<Version type="china" add="3.3"/>

<Client/>

模块级函数，直接调用。

获取游戏版本-客户端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEngineVersion() -> str
```


**返回值**：str，版本号。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
print(clientApi.GetEngineVersion())
```

</TabItem>
</Tabs>

---

### GetIP

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/>

模块级函数，直接调用。

获取本地玩家的 ip 地址。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetIP() -> str
```


**返回值**：str，本地玩家的 ip 地址。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.GetIP()
```

</TabItem>
</Tabs>

---

### GetMinecraftVersion

<Version type="china" add="3.3"/>

<Server/>

模块级函数，直接调用。

获取 Minecraft 版本-服务端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> str
```


**返回值**：str，版本号。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
print(serverApi.GetMinecraftVersion())
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取 Minecraft 版本-客户端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> str
```


**返回值**：str，版本号。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
print(clientApi.GetMinecraftVersion())
```

</TabItem>
</Tabs>

---

### GetPlatform

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

获取脚本运行的平台。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> int
```


**返回值**：int，0：Windows 平台；1：IOS；2：Android；-1：其他，例如联机大厅，阿波罗等 linux 服务器。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.GetPlatform()
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取脚本运行的平台。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> int
```


**返回值**：int，0：Windows 平台；1：IOS；2：Android。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.GetPlatform()
```

</TabItem>
</Tabs>

---

### IsInApollo

<Version type="china" add="1.21"/>

<Server/>

模块级函数，直接调用。

返回当前游戏 Mod 是否运行在 Apollo 网络服。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsInApollo() -> bool
```


**返回值**：bool，True：当前 Mod 运行于 Apollo 网络服环境<br/>False：当前 Mod 运行于租赁服、联机大厅或者单机环境。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
IsInApollo = serverApi.IsInApollo()
```

</TabItem>
</Tabs>

---

### IsInServer

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

获取当前游戏是否跑在服务器环境下。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsInServer() -> bool
```


**返回值**：bool，True:在服务器环境下<br/>False:不在服务器环境下。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
isInServer = serverApi.IsInServer()
```

</TabItem>
</Tabs>

---
