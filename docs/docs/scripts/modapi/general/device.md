---
sidebar_position: 102
---

# 本地设备

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录本地设备相关的接口，共 6 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/tongyong/bendishebei.html"/>

---

### GetEngineVersion

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

<Server/>

模块级函数，直接调用。

获取 Minecraft 版本-服务端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMinecraftVersion() -> str
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
GetMinecraftVersion() -> str
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

<Server/>

模块级函数，直接调用。

获取脚本运行的平台。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlatform() -> int
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
GetPlatform() -> int
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
