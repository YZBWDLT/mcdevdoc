---
sidebar_position: 103
---

# 调试

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录调试相关的接口，共 22 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/tongyong/tiaoshi.html"/>

---

### GetEnableReconnectNetgame

<Client/>

模块级函数，直接调用。

获取是否允许断线重连。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEnableReconnectNetgame() -> bool
```


**返回值**：bool，是否允许断线重连。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.GetEnableReconnectNetgame()
```

</TabItem>
</Tabs>

---

### GetKeepResourceWhenTransfer

<Client/>

模块级函数，直接调用。

获取快速切服设置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetKeepResourceWhenTransfer() -> bool
```


**返回值**：bool，是否设置快速切服。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 先打开快速切服开关
import mod.client.extraClientApi as clientApi
print clientApi.GetKeepResourceWhenTransfer()
```

</TabItem>
</Tabs>

---

### GetMcpModLogCanPostDump

<Server/>

模块级函数，直接调用。

获取是否可以打印错误信息到 McpModLog 日志。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMcpModLogCanPostDump() -> bool
```


**返回值**：bool，canPost 是否可以打印。

**备注**

- McpModLog 日志包括开发者组件的错误信息，不包括引擎错误信息，存在手机端本地。每个 McpModLog 日志只针对调用该接口的 Mcp 生效，最多可以保留 7 天的日志，可在开发者后台查看，打印接口默认关闭。
- 此接口在联机大厅等服务器环境下无效，服务端接口只对单机和本地联机房主生效。
- Mcp 指手机端组件中，行为包路径下，每个包含 modMain.py 脚本的文件夹所构成的代码模块，一个组件可以有多个 Mcp 模块，接口调用时会自动获取 Mcp 信息，不需要传入。
- 请引导玩家在反馈模组问题时勾选“同步上传 7 天内日志”后，在开发者平台下载并查看。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
print(serverApi.GetMcpModLogCanPostDump())
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取是否可以打印错误信息到 McpModLog 日志。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMcpModLogCanPostDump() -> bool
```


**返回值**：bool，canPost 是否可以打印。

**备注**

- McpModLog 日志包括开发者组件的错误信息，不包括引擎错误信息，存在手机端本地。每个 McpModLog 日志只针对调用该接口的 Mcp 生效，最多可以保留 7 天的日志，可在开发者后台查看，打印接口默认关闭。
- Mcp 指手机端组件中，行为包路径下，每个包含 modMain.py 脚本的文件夹所构成的代码模块，一个组件可以有多个 Mcp 模块，接口调用时会自动获取 Mcp 信息，不需要传入。
- 请引导玩家在反馈模组问题时勾选“同步上传 7 天内日志”后，在开发者平台下载并查看。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
print(clientApi.GetMcpModLogCanPostDump())
```

</TabItem>
</Tabs>

---

### GetResourceFastload

<Client/>

模块级函数，直接调用。

获取资源快速加载设置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetResourceFastload() -> bool
```


**返回值**：bool，是否开启资源快速加载。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
print clientApi.GetResourceFastload()
```

</TabItem>
</Tabs>

---

### PostMcpModDump

<Server/>

模块级函数，直接调用。

主动打印信息到 McpModLog 日志，需要先调用 [SetMcpModLogCanPostDump](/docs/docs/scripts/modapi/interfaces/general/debug#setmcpmodlogcanpostdump) 接口进行设置，才能生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PostMcpModDump(msg: str, *args: Any, **kwargs: Dict[str, Any]) -> Any
```

- msg: str，错误信息。
- *args: Any，此参数将作为可变参数传入 logger.error。
- **kwargs: Dict[str, Any]，此参数将作为关键字参数传入 logger.error。

**备注**

- McpModLog 日志包括开发者组件的错误信息，不包括引擎错误信息，存在手机端本地。每个 McpModLog 日志只针对调用该接口的 Mcp 生效，最多可以保留 7 天的日志，可在开发者后台查看，打印接口默认关闭。
- 此接口在联机大厅等服务器环境下无效，服务端接口只对单机和本地联机房主生效。
- Mcp 指手机端组件中，行为包路径下，每个包含 modMain.py 脚本的文件夹所构成的代码模块，一个组件可以有多个 Mcp 模块，接口调用时会自动获取 Mcp 信息，不需要传入。
- 请引导玩家在反馈模组问题时勾选“同步上传 7 天内日志”后，在开发者平台下载并查看。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.PostMcpModDump('Test Msg')
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

主动打印信息到 McpModLog 日志，需要先调用 [SetMcpModLogCanPostDump](/docs/docs/scripts/modapi/interfaces/general/debug#setmcpmodlogcanpostdump) 接口进行设置，才能生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PostMcpModDump(msg: str, *args: Any, **kwargs: Dict[str, Any]) -> Any
```

- msg: str，错误信息。
- *args: Any，此参数将作为可变参数传入 logger.error。
- **kwargs: Dict[str, Any]，此参数将作为关键字参数传入 logger.error。

**备注**

- McpModLog 日志包括开发者组件的错误信息，不包括引擎错误信息，存在手机端本地。每个 McpModLog 日志只针对调用该接口的 Mcp 生效，最多可以保留 7 天的日志，可在开发者后台查看，打印接口默认关闭。
- Mcp 指手机端组件中，行为包路径下，每个包含 modMain.py 脚本的文件夹所构成的代码模块，一个组件可以有多个 Mcp 模块，接口调用时会自动获取 Mcp 信息，不需要传入。
- 请引导玩家在反馈模组问题时勾选“同步上传 7 天内日志”后，在开发者平台下载并查看。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.PostMcpModDump('Test Msg')
```

</TabItem>
</Tabs>

---

### ReloadAllMaterials

<Client/>

模块级函数，直接调用。

重新加载所有材质文件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ReloadAllMaterials() -> bool
```


**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.ReloadAllMaterials()
```

</TabItem>
</Tabs>

---

### ReloadAllShaders

<Client/>

模块级函数，直接调用。

重新加载所有 Shader 文件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ReloadAllShaders() -> bool
```


**返回值**：bool，是否成功。

**备注**

- 若修改到材质，建议使用 [ReloadAllMaterials](/docs/docs/scripts/modapi/interfaces/general/debug#reloadallmaterials) 方法。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.ReloadAllShaders()
```

</TabItem>
</Tabs>

---

### ReloadOneShader

<Client/>

模块级函数，直接调用。

重新加载某个 Shader 文件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ReloadOneShader(shaderName: str) -> bool
```

- shaderName: str，shader 名称。

**返回值**：bool，是否成功。

**备注**

- 若同时修改了多个 Shader，建议使用 [ReloadAllShaders](/docs/docs/scripts/modapi/interfaces/general/debug#reloadallshaders) 方法。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.ReloadOneShader("entity.fragment")
```

</TabItem>
</Tabs>

---

### SetEnableReconnectNetgame

<Client/>

模块级函数，直接调用。

设置是否允许断线重连。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEnableReconnectNetgame(keep: bool) -> bool
```

- keep: bool，是否允许断线重连。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.SetEnableReconnectNetgame(True)
```

</TabItem>
</Tabs>

---

### SetKeepResourceWhenTransfer

<Client/>

模块级函数，直接调用。

设置快速切服。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetKeepResourceWhenTransfer(keep: bool) -> bool
```

- keep: bool，是否在切服时保留资源,True 为保留资源,False 为不保留资源。

**返回值**：bool，是否成功。

**备注**

- 快速切服通过在切服时保留资源实现，可以缩短切服等待时间。
- 切服前后的两个服，需要保证资源完全一样。
- 快速切服设置在退出游戏之前一直有效，如果要切到其他类型的服务器，需要在切服前调用 clientApi.SetKeepResourceWhenTransfer(False)。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 先打开快速切服开关
import mod.client.extraClientApi as clientApi
clientApi.SetKeepResourceWhenTransfer(True)

# 然后切服
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.TransferToOtherServer('123', 'game')
```

</TabItem>
</Tabs>

---

### SetMcpModLogCanPostDump

<Server/>

模块级函数，直接调用。

设置是否可以打印错误信息到 McpModLog 日志。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMcpModLogCanPostDump(canPost: bool) -> Any
```

- canPost: bool，是否可以打印。

**备注**

- McpModLog 日志包括开发者组件的错误信息，不包括引擎错误信息，存在手机端本地。每个 McpModLog 日志只针对调用该接口的 Mcp 生效，最多可以保留 7 天的日志，可在开发者后台查看，打印接口默认关闭。
- 此接口在联机大厅等服务器环境下无效，服务端接口只对单机和本地联机房主生效。
- Mcp 指手机端组件中，行为包路径下，每个包含 modMain.py 脚本的文件夹所构成的代码模块，一个组件可以有多个 Mcp 模块，接口调用时会自动获取 Mcp 信息，不需要传入。
- 请引导玩家在反馈模组问题时勾选“同步上传 7 天内日志”后，在开发者平台下载并查看。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.SetMcpModLogCanPostDump(True)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

设置是否可以打印错误信息到 McpModLog 日志。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMcpModLogCanPostDump(canPost: bool) -> Any
```

- canPost: bool，是否可以打印。

**备注**

- McpModLog 日志包括开发者组件的错误信息，不包括引擎错误信息，存在手机端本地。每个 McpModLog 日志只针对调用该接口的 Mcp 生效，最多可以保留 7 天的日志，可在开发者后台查看，打印接口默认关闭。
- Mcp 指手机端组件中，行为包路径下，每个包含 modMain.py 脚本的文件夹所构成的代码模块，一个组件可以有多个 Mcp 模块，接口调用时会自动获取 Mcp 信息，不需要传入。
- 请引导玩家在反馈模组问题时勾选“同步上传 7 天内日志”后，在开发者平台下载并查看。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.SetMcpModLogCanPostDump(True)
```

</TabItem>
</Tabs>

---

### SetResourceFastload

<Client/>

模块级函数，直接调用。

设置资源快速加载。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetResourceFastload(fastload: bool) -> bool
```

- fastload: bool，是否在进入游戏时快速加载资源,True 为快速加载资源,False 为不快速加载资源。

**返回值**：bool，是否成功。

**备注**

- 开启资源快速加载，可以缩短切服等待时间。
- 开启资源快速加载，切服速度比设置 [SetKeepResourceWhenTransfer](/docs/docs/scripts/modapi/interfaces/general/debug#setkeepresourcewhentransfer) 慢，但不要求切服前后两个服资源完全一致。
- 物品和方块的自定义贴图需要定义在 item_texture.json 和 terrain_texture.json 中，才能开启资源快速加载。
- 设置资源快速加载在退出游戏之前一直有效，退出游戏后自动恢复为 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 先设置资源快速加载
import mod.client.extraClientApi as clientApi
clientApi.SetResourceFastload(True)

# 然后切服
import lobbyGame.netgameApi as lobbyGameApi
lobbyGameApi.TransferToOtherServer('123', 'game')
```

</TabItem>
</Tabs>

---

### StartMemProfile

<Server/>

模块级函数，直接调用。

开始启动服务端脚本内存分析，启动后调用 [StopMemProfile](/docs/docs/scripts/modapi/interfaces/general/debug#stopmemprofile) 即可在路径 fileName 生成函数内存火焰图，此接口只支持 PC 端。生成的火焰图可以用浏览器打开，推荐 chrome 浏览器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartMemProfile() -> bool
```


**返回值**：bool，执行结果。

**备注**

- 由于分析时并不区分服务端和客户端，在进行分析时，只需要其中一端 startmemprofile 和 stopmemprofile 即可,无需双端同时进行。
- 将鼠标放在一个函数块上时，下方会显示当前函数对应的详细信息，具体含义可见获取性能分析火焰图。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.StartMemProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopMemProfile
serverApi.StopMemProfile(fileName)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

开始启动客户端脚本内存分析，启动后调用 [StopMemProfile](/docs/docs/scripts/modapi/interfaces/general/debug#stopmemprofile) 即可在路径 fileName 生成函数内存火焰图，此接口只支持 PC 端。生成的火焰图可以用浏览器打开，推荐 chrome 浏览器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartMemProfile() -> bool
```


**返回值**：bool，执行结果。

**备注**

- 由于分析时并不区分服务端和客户端，在进行分析时，只需要其中一端 startmemprofile 和 stopmemprofile 即可,无需双端同时进行。
- 将鼠标放在一个函数块上时，下方会显示当前函数对应的详细信息，具体含义可见获取性能分析火焰图。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.StartMemProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopMemProfile
clientApi.StopMemProfile(fileName)
```

</TabItem>
</Tabs>

---

### StartMultiProfile

<Server/>

模块级函数，直接调用。

开始启动服务端与客户端双端脚本性能分析，启动后调用 [StopMultiProfile](/docs/docs/scripts/modapi/interfaces/general/debug#stopmultiprofile) 即可在路径 fileName 生成函数性能火焰图。双端采集时数据误差较大，建议优先使用 [StartProfile](/docs/docs/scripts/modapi/interfaces/general/debug#startprofile) 单端版本，此接口只支持 PC 端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartMultiProfile() -> bool
```


**返回值**：bool，执行结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.StartMultiProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopMultiProfile
serverApi.StopMultiProfile()
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

开始启动服务端与客户端双端脚本性能分析，启动后调用 [StopMultiProfile](/docs/docs/scripts/modapi/interfaces/general/debug#stopmultiprofile) 即可在路径 fileName 生成函数性能火焰图。双端采集时数据误差较大，建议优先使用 [StartProfile](/docs/docs/scripts/modapi/interfaces/general/debug#startprofile) 单端版本，此接口只支持 PC 端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartMultiProfile() -> bool
```


**返回值**：bool，执行结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.StartMultiProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopMultiProfile
clientApi.StopMultiProfile()
```

</TabItem>
</Tabs>

---

### StartProfile

<Server/>

模块级函数，直接调用。

开始启动服务端脚本性能分析，启动后调用 [StopProfile](/docs/docs/scripts/modapi/interfaces/general/debug#stopprofile) 即可在路径 fileName 生成函数性能火焰图，此接口只支持 PC 端。生成的火焰图可以用浏览器打开，推荐 chrome 浏览器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartProfile() -> bool
```


**返回值**：bool，执行结果。

**备注**

- 火焰图主页面示例：
- 如火焰图所示，竖直方向表示调用栈，每一层都是一个函数。调用栈越深，火焰就越高，顶部就是正在执行的函数，下方都是它的父函数。分析性能时主要看火焰图的宽度（其中颜色没有特别意义），火焰图越宽，表示该函数对整体性能的消耗越大。因此需要对该函数进行优化。
- 将鼠标放在一个函数块上时，下方会显示当前函数对应的详细信息，具体含义可见获取性能分析火焰图。
- 优化的核心主要是减少调用次数以及优化函数的写法。其中对于开发者而言，只需要关注开发者开发的代码即可，对于部分函数调用到 mod 框架或者引擎顶层框架进而导致性能消耗较大的，可以尝试通过减少调用次数来进行优化。
- 另外，火焰图支持通过右上方的 Search 框或者“F3”快捷键对函数关键词进行搜索。同时可以点击函数缩放查看对应的调用栈。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.StartProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopProfile
serverApi.StopProfile()
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

开始启动客户端脚本性能分析，启动后调用 [StopProfile](/docs/docs/scripts/modapi/interfaces/general/debug#stopprofile) 即可在路径 fileName 生成函数性能火焰图，此接口只支持 PC 端。生成的火焰图可以用浏览器打开，推荐 chrome 浏览器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartProfile() -> bool
```


**返回值**：bool，执行结果。

**备注**

- 火焰图主页面示例：
- 如火焰图所示，竖直方向表示调用栈，每一层都是一个函数。调用栈越深，火焰就越高，顶部就是正在执行的函数，下方都是它的父函数。分析性能时主要看火焰图的宽度（其中颜色没有特别意义），火焰图越宽，表示该函数对整体性能的消耗越大。因此需要对该函数进行优化。
- 将鼠标放在一个函数块上时，下方会显示当前函数对应的详细信息，具体含义可见获取性能分析火焰图。
- 优化的核心主要是减少调用次数以及优化函数的写法。其中对于开发者而言，只需要关注开发者开发的代码即可，对于部分函数调用到 mod 框架或者引擎顶层框架进而导致性能消耗较大的，可以尝试通过减少调用次数来进行优化。
- 另外，火焰图支持通过右上方的 Search 框或者“F3”快捷键对函数关键词进行搜索。同时可以点击函数缩放查看对应的调用栈。
- 上架时请去掉这个接口的调用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.StartProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopProfile
clientApi.StopProfile()
```

</TabItem>
</Tabs>

---

### StartRecordEvent

<Server/>

模块级函数，直接调用。

开始启动服务端与客户端之间的脚本事件收发统计，启动后调用 [StopRecordEvent](/docs/docs/scripts/modapi/interfaces/general/debug#stoprecordevent) 即可获取两个函数调用之间脚本事件收发的统计信息，仅支持租赁服与 Apollo 网络服环境（不支持单机环境）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartRecordEvent() -> bool
```


**返回值**：bool，执行结果。

仅 Apollo 可用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
suc = serverApi.StartRecordEvent()
# 之后通过计时器或者其他触发方式调用StopRecordEvent
result = serverApi.StopRecordEvent()
for eventName, data in result.iteritems():
    print "event[{}] send={} sendSize={} recv={} recvSize={}".format(eventName, data["send_num"], data["send_size"], data["recv_num"], data["recv_size"])
```

</TabItem>
</Tabs>

---

### StartRecordPacket

<Server/>

模块级函数，直接调用。

开始启动服务端与客户端之间的引擎收发包统计，启动后调用 [StopRecordPacket](/docs/docs/scripts/modapi/interfaces/general/debug#stoprecordpacket) 即可获取两个函数调用之间引擎收发包的统计信息，仅支持租赁服与 Apollo 网络服环境（不支持单机环境）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StartRecordPacket() -> bool
```


**返回值**：bool，执行结果。

仅 Apollo 可用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
suc = serverApi.StartRecordPacket()
# 之后通过计时器或者其他触发方式调用StopRecordPacket
result = serverApi.StopRecordPacket()
for packetName, data in result.iteritems():
    print "packet[{}] send={} sendSize={} recv={} recvSize={}".format(packetName, data["send_num"], data["send_size"], data["recv_num"], data["recv_size"])
```

</TabItem>
</Tabs>

---

### StopMemProfile

<Server/>

模块级函数，直接调用。

停止服务端脚本内存分析并生成火焰图，与 [StartMemProfile](/docs/docs/scripts/modapi/interfaces/general/debug#startmemprofile) 配合使用，此接口只支持 PC 端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopMemProfile(fileName: str = "flamegraph.svg") -> bool
```

- fileName: str，具体路径，相对于 PC 开发包的路径，默认为"flamegraph.svg"，位于 PC 开发包目录下，自定义路径请确保文件后缀名为".svg"。

**返回值**：bool，执行结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.StartMemProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopMemProfile
serverApi.StopMemProfile(fileName)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

停止客户端脚本内存分析并生成火焰图，与 [StartMemProfile](/docs/docs/scripts/modapi/interfaces/general/debug#startmemprofile) 配合使用，此接口只支持 PC 端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopMemProfile(fileName: str = "flamegraph.svg") -> bool
```

- fileName: str，具体路径，相对于 PC 开发包的路径，默认为"flamegraph.svg"，位于 PC 开发包目录下，自定义路径请确保文件后缀名为".svg"。

**返回值**：bool，执行结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.StartMemProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopMemProfile
clientApi.StopMemProfile(fileName)
```

</TabItem>
</Tabs>

---

### StopMultiProfile

<Server/>

模块级函数，直接调用。

停止双端脚本性能分析并生成火焰图，与 [StartMultiProfile](/docs/docs/scripts/modapi/interfaces/general/debug#startmultiprofile) 配合使用，此接口只支持 PC 端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopMultiProfile(fileName: str = "flamegraph.svg") -> bool
```

- fileName: str，具体路径，相对于 PC 开发包的路径，默认为"flamegraph.svg"，位于 PC 开发包目录下，自定义路径请确保文件后缀名为".svg"。

**返回值**：bool，执行结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.StartMultiProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopMultiProfile
serverApi.StopMultiProfile()
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

停止双端脚本性能分析并生成火焰图，与 [StartMultiProfile](/docs/docs/scripts/modapi/interfaces/general/debug#startmultiprofile) 配合使用，此接口只支持 PC 端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopMultiProfile(fileName: str = "flamegraph.svg") -> bool
```

- fileName: str，具体路径，相对于 PC 开发包的路径，默认为"flamegraph.svg"，位于 PC 开发包目录下，自定义路径请确保文件后缀名为".svg"。

**返回值**：bool，执行结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.StartMultiProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopMultiProfile
clientApi.StopMultiProfile()
```

</TabItem>
</Tabs>

---

### StopProfile

<Server/>

模块级函数，直接调用。

停止服务端脚本性能分析并生成火焰图，与 [StartProfile](/docs/docs/scripts/modapi/interfaces/general/debug#startprofile) 配合使用，此接口只支持 PC 端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopProfile(fileName: str = "flamegraph.svg") -> bool
```

- fileName: str，具体路径，相对于 PC 开发包的路径，默认为"flamegraph.svg"，位于 PC 开发包目录下，自定义路径请确保文件后缀名为".svg"。

**返回值**：bool，执行结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.StartProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopProfile
serverApi.StopProfile()
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

停止客户端脚本性能分析并生成火焰图，与 [StartProfile](/docs/docs/scripts/modapi/interfaces/general/debug#startprofile) 配合使用，此接口只支持 PC 端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopProfile(fileName: str = "flamegraph.svg") -> bool
```

- fileName: str，具体路径，相对于 PC 开发包的路径，默认为"flamegraph.svg"，位于 PC 开发包目录下，自定义路径请确保文件后缀名为".svg"。

**返回值**：bool，执行结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.StartProfile()
modfunc()# 处理对应的逻辑
# 之后通过计时器或者其他触发方式调用StopProfile
clientApi.StopProfile()
```

</TabItem>
</Tabs>

---

### StopRecordEvent

<Server/>

模块级函数，直接调用。

停止服务端与客户端之间的脚本事件收发统计并输出结果，与 [StartRecordEvent](/docs/docs/scripts/modapi/interfaces/general/debug#startrecordevent) 配合使用，输出结果为字典，key 为网络包名，value 字典中记录收发信息，具体见示例，仅支持租赁服与 Apollo 网络服环境（不支持单机环境）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopRecordEvent() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，收发包信息，假如没有调用过 [StartRecordEvent](/docs/docs/scripts/modapi/interfaces/general/debug#startrecordevent)，则返回为 None。

仅 Apollo 可用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
suc = serverApi.StartRecordEvent()
# 之后通过计时器或者其他触发方式调用StopRecordEvent
result = serverApi.StopRecordEvent()
for eventName, data in result.iteritems():
    print "event[{}] send={} sendSize={} recv={} recvSize={}".format(eventName, data["send_num"], data["send_size"], data["recv_num"], data["recv_size"])
```

</TabItem>
</Tabs>

---

### StopRecordPacket

<Server/>

模块级函数，直接调用。

停止服务端与客户端之间的引擎收发包统计并输出结果，与 [StartRecordPacket](/docs/docs/scripts/modapi/interfaces/general/debug#startrecordpacket) 配合使用，输出结果为字典，key 为网络包名，value 字典中记录收发信息，具体见示例，仅支持租赁服与 Apollo 网络服环境（不支持单机环境）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopRecordPacket() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，收发包信息，假如没有调用过 [StartRecordPacket](/docs/docs/scripts/modapi/interfaces/general/debug#startrecordpacket)，则返回为 None。

仅 Apollo 可用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
suc = serverApi.StartRecordPacket()
# 之后通过计时器或者其他触发方式调用StopRecordPacket
result = serverApi.StopRecordPacket()
for packetName, data in result.iteritems():
    print "packet[{}] send={} sendSize={} recv={} recvSize={}".format(packetName, data["send_num"], data["send_size"], data["recv_num"], data["recv_size"])
```

</TabItem>
</Tabs>

---
