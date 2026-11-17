---
sidebar_position: 4
---

# 方块

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录方块相关的事件，共 52 个。监听方式见[事件工作机制](/docs/docs/scripts/modapi/overview#事件)。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/fangkuai.html"/>

---

### BlockAnimateRandomTickEvent

<Client/>

触发时机：以摄像机为中心，随机选取周围的方块触发 Tick，触发的数量取决于设备性能。只有添加了 netease:block_animate_random_tick 的自定义方块才会触发此事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockAnimateRandomTickEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockPos | Tuple[float, float, float] | 方块坐标。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxData | int | 方块附加值。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "BlockAnimateRandomTickEvent",
            self, self.OnBlockAnimateRandomTickEvent)

    def OnBlockAnimateRandomTickEvent(self, args):
        blockPos = args["blockPos"]
        blockName = args["blockName"]
        auxData = args["auxData"]
```

</TabItem>
</Tabs>

---

### BlockDestroyByLiquidServerEvent

<Server/>

触发时机：方块被水流破坏的事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockDestroyByLiquidServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| liquidName | str | 流体方块 id。 |
| blockName | str | 方块 id。 |
| auxValue | int | 方块附加值。 |
| dimensionId | int | 方块所在维度 id。 |

**备注**

- 指令或者接口的设置不会触发该事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockDestroyByLiquidServerEvent",
            self, self.OnBlockDestroyByLiquidServerEvent)

    def OnBlockDestroyByLiquidServerEvent(self, args):
        x = args["x"]
        y = args["y"]
        z = args["z"]
        liquidName = args["liquidName"]
        blockName = args["blockName"]
        auxValue = args["auxValue"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

---

### BlockLiquidStateChangeAfterServerEvent

<Server/>

触发时机：方块转为含水或者脱离含水(流体)后触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockLiquidStateChangeAfterServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxValue | int | 方块附加值。 |
| dimension | int | 方块维度。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| turnLiquid | bool | 是否转为含水，true 则转为含水，false 则脱离含水。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockLiquidStateChangeAfterServerEvent",
            self, self.OnBlockLiquidStateChangeAfterServerEvent)

    def OnBlockLiquidStateChangeAfterServerEvent(self, args):
        blockName = args["blockName"]
        auxValue = args["auxValue"]
        dimension = args["dimension"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
        turnLiquid = args["turnLiquid"]
```

</TabItem>
</Tabs>

---

### BlockLiquidStateChangeServerEvent

<Server/>

触发时机：方块转为含水或者脱离含水(流体)前触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockLiquidStateChangeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxValue | int | 方块附加值。 |
| dimension | int | 方块维度。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| turnLiquid | bool | 是否转为含水，true 则转为含水，false 则脱离含水。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockLiquidStateChangeServerEvent",
            self, self.OnBlockLiquidStateChangeServerEvent)

    def OnBlockLiquidStateChangeServerEvent(self, args):
        blockName = args["blockName"]
        auxValue = args["auxValue"]
        dimension = args["dimension"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
        turnLiquid = args["turnLiquid"]
```

</TabItem>
</Tabs>

---

### BlockNeighborChangedServerEvent

<Server/>

触发时机：自定义方块周围的方块发生变化时，需要配置 netease:neighborchanged_sendto_script，详情请查阅《自定义农作物》文档。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockNeighborChangedServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimensionId | int | 维度。 |
| posX | int | 方块 x 坐标。 |
| posY | int | 方块 y 坐标。 |
| posZ | int | 方块 z 坐标。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxValue | int | 方块附加值。 |
| neighborPosX | int | 变化方块 x 坐标。 |
| neighborPosY | int | 变化方块 y 坐标。 |
| neighborPosZ | int | 变化方块 z 坐标。 |
| fromBlockName | str | 方块变化前的 identifier，包含命名空间及名称。 |
| fromBlockAuxValue | int | 方块变化前附加值。 |
| toBlockName | str | 方块变化后的 identifier，包含命名空间及名称。 |
| toAuxValue | int | 方块变化后附加值。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockNeighborChangedServerEvent",
            self, self.OnBlockNeighborChangedServerEvent)

    def OnBlockNeighborChangedServerEvent(self, args):
        dimensionId = args["dimensionId"]
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        blockName = args["blockName"]
        auxValue = args["auxValue"]
        neighborPosX = args["neighborPosX"]
        neighborPosY = args["neighborPosY"]
        neighborPosZ = args["neighborPosZ"]
        fromBlockName = args["fromBlockName"]
        fromBlockAuxValue = args["fromBlockAuxValue"]
        toBlockName = args["toBlockName"]
        toAuxValue = args["toAuxValue"]
```

</TabItem>
</Tabs>

---

### BlockRandomTickServerEvent

<Server/>

触发时机：自定义方块配置[netease:random_tick](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/2-zidingyifangkuai/1-json-zujian.html#netease-random-tick)随机 tick 时。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockRandomTickServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| posX | int | 方块 x 坐标。 |
| posY | int | 方块 y 坐标。 |
| posZ | int | 方块 z 坐标。 |
| blockName | str | 方块名称。 |
| fullName | str | 方块的 identifier，包含命名空间及名称。 |
| auxValue | int | 方块附加值。 |
| brightness | int | 方块亮度。 |
| dimensionId | int | 方块所在维度。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockRandomTickServerEvent",
            self, self.OnBlockRandomTickServerEvent)

    def OnBlockRandomTickServerEvent(self, args):
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        blockName = args["blockName"]
        fullName = args["fullName"]
        auxValue = args["auxValue"]
        brightness = args["brightness"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

---

### BlockRemoveServerEvent

<Server/>

触发时机：监听该事件的方块在销毁时触发，可以通过 ListenOnBlockRemoveEvent 方法进行监听，或者通过 json 组件[netease:listen_block_remove](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/2-zidingyifangkuai/1-json-zujian.html#netease-listen-block-remove)进行配置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockRemoveServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| x | int | 方块位置 x。 |
| y | int | 方块位置 y。 |
| z | int | 方块位置 z。 |
| fullName | str | 方块的 identifier，包含命名空间及名称。 |
| auxValue | int | 方块的附加值。 |
| dimension | int | 该方块所在的维度。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockRemoveServerEvent",
            self, self.OnBlockRemoveServerEvent)

    def OnBlockRemoveServerEvent(self, args):
        x = args["x"]
        y = args["y"]
        z = args["z"]
        fullName = args["fullName"]
        auxValue = args["auxValue"]
        dimension = args["dimension"]
```

</TabItem>
</Tabs>

<Server/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockRemoveServerEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockRemoveServerEvent",
            self, self.OnBlockRemoveServerEvent)

    def OnBlockRemoveServerEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

是否监听方块 BlockRemoveServerEvent 事件，可以动态修改 json 组件[netease:listen_block_remove](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/2-zidingyifangkuai/1-json-zujian.html#netease-listen-block-remove)的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockRemoveServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| identifier | str | 方块 identifier，如 minecraft:wheat。 |
| listen | bool | 是否监听。 |

**返回值**：bool，是否设置成功。

**备注**

- 对于一些特殊的方块，注意要使用对应的方块 Id 参数（如砖块楼梯，监听的方块 Id 应该为 minecraft:brick_block）。
- 如果用骨粉改变了发光浆果，也会触发一次事件，它实际是从 cave_vines 变成了 cave_vines_head_with_berries。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.ListenOnBlockRemoveEvent("minecraft:wheat", True)
```

</TabItem>
</Tabs>

---

### BlockSnowStateChangeAfterServerEvent

<Server/>

触发时机：方块转为含雪或者脱离含雪后触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockSnowStateChangeAfterServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimension | int | 方块维度。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| turnSnow | bool | 是否转为含雪，true 则转为含雪，false 则脱离含雪。 |
| setBlockType | int | 方块进入脱离含雪的原因，参考[SetBlockType](/docs/docs/scripts/modapi/enums#setblocktype)。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockSnowStateChangeAfterServerEvent",
            self, self.OnBlockSnowStateChangeAfterServerEvent)

    def OnBlockSnowStateChangeAfterServerEvent(self, args):
        dimension = args["dimension"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
        turnSnow = args["turnSnow"]
        setBlockType = args["setBlockType"]
```

</TabItem>
</Tabs>

---

### BlockSnowStateChangeServerEvent

<Server/>

触发时机：方块转为含雪或者脱离含雪前触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockSnowStateChangeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimension | int | 方块维度。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| turnSnow | bool | 是否转为含雪，true 则转为含雪，false 则脱离含雪。 |
| setBlockType | int | 方块进入脱离含雪的原因，参考[SetBlockType](/docs/docs/scripts/modapi/enums#setblocktype)。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockSnowStateChangeServerEvent",
            self, self.OnBlockSnowStateChangeServerEvent)

    def OnBlockSnowStateChangeServerEvent(self, args):
        dimension = args["dimension"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
        turnSnow = args["turnSnow"]
        setBlockType = args["setBlockType"]
```

</TabItem>
</Tabs>

---

### BlockStrengthChangedServerEvent

<Server/>

触发时机：自定义机械元件方块红石信号量发生变化时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockStrengthChangedServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| posX | int | 方块 x 坐标。 |
| posY | int | 方块 y 坐标。 |
| posZ | int | 方块 z 坐标。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxValue | int | 方块附加值。 |
| newStrength | int | 变化后的红石信号量。 |
| oldStrength | int | 变化前的红石信号量。 |
| dimensionId | int | 维度。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "BlockStrengthChangedServerEvent",
            self, self.OnBlockStrengthChangedServerEvent)

    def OnBlockStrengthChangedServerEvent(self, args):
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        blockName = args["blockName"]
        auxValue = args["auxValue"]
        newStrength = args["newStrength"]
        oldStrength = args["oldStrength"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

---

### ChestBlockTryPairWithServerEvent

<Server/>

触发时机：两个并排的小箱子方块准备组合为一个大箱子方块时。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnChestBlockTryPairWithServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| cancel | bool | 是否允许触发，默认为 False，若设为 True，可阻止小箱子组合成为一个大箱子。 |
| blockX | int | 小箱子方块 x 坐标。 |
| blockY | int | 小箱子方块 y 坐标。 |
| blockZ | int | 小箱子方块 z 坐标。 |
| otherBlockX | int | 将要与之组合的另外一个小箱子方块 x 坐标。 |
| otherBlockY | int | 将要与之组合的另外一个小箱子方块 y 坐标。 |
| otherBlockZ | int | 将要与之组合的另外一个小箱子方块 z 坐标。 |
| dimensionId | int | 维度 id。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ChestBlockTryPairWithServerEvent",
            self, self.OnChestBlockTryPairWithServerEvent)

    def OnChestBlockTryPairWithServerEvent(self, args):
        cancel = args["cancel"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        otherBlockX = args["otherBlockX"]
        otherBlockY = args["otherBlockY"]
        otherBlockZ = args["otherBlockZ"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

---

### ClientBlockUseEvent

<Client/>

触发时机：玩家右键点击新版自定义方块（或者通过接口 AddBlockItemListenForUseEvent 增加监听的 MC 原生游戏方块）时客户端抛出该事件（该事件 tick 执行，需要注意效率问题）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 Id。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| aux | int | 方块附加值。 |
| cancel | bool | 设置为 True 可拦截与方块交互的逻辑。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| clickX | float | 点击点的 x 比例位置。 |
| clickY | float | 点击点的 y 比例位置。 |
| clickZ | float | 点击点的 z 比例位置。 |

**备注**

- 如果拦截与方块交互的逻辑，则不会给服务端发送对应的网络包。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "ClientBlockUseEvent",
            self, self.OnClientBlockUseEvent)

    def OnClientBlockUseEvent(self, args):
        playerId = args["playerId"]
        blockName = args["blockName"]
        aux = args["aux"]
        cancel = args["cancel"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
        clickX = args["clickX"]
        clickY = args["clickY"]
        clickZ = args["clickZ"]
```

</TabItem>
</Tabs>

<Client/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "ClientBlockUseEvent",
            self, self.OnClientBlockUseEvent)

    def OnClientBlockUseEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Client/> BlockUseEventWhiteListComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(clientApi.GetLevelId())`

增加 blockName 方块对 ClientBlockUseEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块名称，格式：namespace:name:auxvalue，其中 namespace:name:*匹配所有的 auxvalue。 |

**返回值**：bool，是否增加成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(clientApi.GetLevelId())
comp.AddBlockItemListenForUseEvent("minecraft:nether_brick_stairs:2")
# 注意blockName格式为namespace:name:auxvalue，如果不填auxvalue，则默认为所有auxvalue
# auxValue详细值详见官方wiki，如https://zh.minecraft.wiki/w/楼梯 中的‘方块数据值’
```

</TabItem>
</Tabs>

<Client/> BlockUseEventWhiteListComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(clientApi.GetLevelId())`

移除 blockName 方块对 ClientBlockUseEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块名称，格式：namespace:name:auxvalue，其中 namespace:name:*匹配所有的 auxvalue。 |

**返回值**：bool，是否移除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(clientApi.GetLevelId())
comp.RemoveBlockItemListenForUseEvent("minecraft:nether_brick_stairs:2")
# 注意blockName格式为namespace:name:auxvalue，如果不填auxvalue，则默认为所有auxvalue
# auxValue详细值详见官方wiki，如https://zh.minecraft.wiki/w/楼梯 中的‘方块数据值’
```

</TabItem>
</Tabs>

<Client/> BlockUseEventWhiteListComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(clientApi.GetLevelId())`

清空所有已添加方块对 ClientBlockUseEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```


**返回值**：bool，是否清空成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(clientApi.GetLevelId())
comp.ClearAllListenForBlockUseEventItems()
```

</TabItem>
</Tabs>

---

### CommandBlockContainerOpenEvent

<Server/>

触发时机：玩家点击命令方块，尝试打开命令方块的设置界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnCommandBlockContainerOpenEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家实体 id。 |
| isBlock | bool | 是否以方块坐标的形式定位命令方块，当为 True 时下述的 blockX/blockY/blockZ 有意义，当为 False 时，下述的 victimId 有意义。 |
| blockX | int | 命令方块位置 x，当 isBlock 为 True 时有效。 |
| blockY | int | 命令方块位置 y，当 isBlock 为 True 时有效。 |
| blockZ | int | 命令方块位置 z，当 isBlock 为 True 时有效。 |
| victimId | str | 命令方块对应的逻辑实体的唯一 id，当 isBlock 为 False 时有效。 |
| cancel | bool | 修改为 True 时，可以阻止玩家打开命令方块的设置界面。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "CommandBlockContainerOpenEvent",
            self, self.OnCommandBlockContainerOpenEvent)

    def OnCommandBlockContainerOpenEvent(self, args):
        playerId = args["playerId"]
        isBlock = args["isBlock"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        victimId = args["victimId"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### CommandBlockUpdateEvent

<Server/>

触发时机：玩家尝试修改命令方块的内置命令时。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnCommandBlockUpdateEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家实体 id。 |
| playerUid | Union[int, int] | 玩家的 uid。 |
| command | str | 企图修改的命令方块中的命令内容字符串。 |
| isBlock | bool | 是否以方块坐标的形式定位命令方块，当为 True 时下述的 blockX/blockY/blockZ 有意义，当为 False 时，下述的 victimId 有意义。 |
| blockX | int | 命令方块位置 x，当 isBlock 为 True 时有效。 |
| blockY | int | 命令方块位置 y，当 isBlock 为 True 时有效。 |
| blockZ | int | 命令方块位置 z，当 isBlock 为 True 时有效。 |
| victimId | str | 命令方块对应的逻辑实体的唯一 id，当 isBlock 为 False 时有效。 |
| cancel | bool | 修改为 True 时，可以阻止玩家修改命令方块的内置命令。 |

**备注**

- 当修改的目标为命令方块矿车时（此时 isBlock 为 False），设置 cancel 为 True，依旧可以阻止修改命令方块矿车的内部指令，但是从客户端能够看到命令方块矿车的内部指令变化了，不过这仅仅是假象，重新登录或者其他客户端打开命令方块矿车的设置界面，就会发现其实内部指令没有变化。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "CommandBlockUpdateEvent",
            self, self.OnCommandBlockUpdateEvent)

    def OnCommandBlockUpdateEvent(self, args):
        playerId = args["playerId"]
        playerUid = args["playerUid"]
        command = args["command"]
        isBlock = args["isBlock"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        victimId = args["victimId"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### DestroyBlockEvent

<Server/>

触发时机：当方块已经被玩家破坏时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnDestroyBlockEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| face | int | 方块被敲击的面向 id，参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |
| fullName | str | 方块的 identifier，包含命名空间及名称。 |
| auxData | int | 方块附加值。 |
| playerId | str | 破坏方块的玩家 ID。 |
| dimensionId | int | 维度 id。 |
| dropEntityIds | List[str] | 掉落物实体 id 列表。 |

**备注**

- 在生存模式或创造模式下都会触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "DestroyBlockEvent",
            self, self.OnDestroyBlockEvent)

    def OnDestroyBlockEvent(self, args):
        x = args["x"]
        y = args["y"]
        z = args["z"]
        face = args["face"]
        fullName = args["fullName"]
        auxData = args["auxData"]
        playerId = args["playerId"]
        dimensionId = args["dimensionId"]
        dropEntityIds = args["dropEntityIds"]
```

</TabItem>
</Tabs>

---

### DirtBlockToGrassBlockServerEvent

<Server/>

触发时机：泥土方块变成草方块时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnDirtBlockToGrassBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimension | int | 方块维度。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |

**备注**

- 指令或者接口的设置不会触发该事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "DirtBlockToGrassBlockServerEvent",
            self, self.OnDirtBlockToGrassBlockServerEvent)

    def OnDirtBlockToGrassBlockServerEvent(self, args):
        dimension = args["dimension"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
```

</TabItem>
</Tabs>

---

### EntityPlaceBlockAfterServerEvent

<Server/>

触发时机：当生物成功放置方块后触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnEntityPlaceBlockAfterServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| fullName | str | 方块的 identifier，包含命名空间及名称。 |
| auxData | int | 方块附加值。 |
| entityId | str | 试图放置方块的生物 ID。 |
| dimensionId | int | 维度 id。 |
| face | int | 点击方块的面，参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |

**备注**

- 部分放置后会产生实体的方块、可操作的方块、带有特殊逻辑的方块，不会触发该事件，包括但不限于床、门、告示牌、花盆、红石中继器、船、炼药锅、头部模型、蛋糕、酿造台、盔甲架等。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "EntityPlaceBlockAfterServerEvent",
            self, self.OnEntityPlaceBlockAfterServerEvent)

    def OnEntityPlaceBlockAfterServerEvent(self, args):
        x = args["x"]
        y = args["y"]
        z = args["z"]
        fullName = args["fullName"]
        auxData = args["auxData"]
        entityId = args["entityId"]
        dimensionId = args["dimensionId"]
        face = args["face"]
```

</TabItem>
</Tabs>

---

### FallingBlockBreakServerEvent

<Server/>

触发时机：当下落的方块实体被破坏时，服务端触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnFallingBlockBreakServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| fallingBlockId | str | 下落的方块实体 id。 |
| fallingBlockX | float | 下落的方块实体位置 x。 |
| fallingBlockY | float | 下落的方块实体位置 y。 |
| fallingBlockZ | float | 下落的方块实体位置 z。 |
| blockName | str | 重力方块的 identifier，包含命名空间及名称。 |
| fallTickAmount | int | 下落的方块实体持续下落了多少 tick。 |
| dimensionId | int | 下落的方块实体维度 id。 |
| cancelDrop | bool | 是否取消方块物品掉落，可以在脚本层中设置。 |

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "FallingBlockBreakServerEvent",
            self, self.OnFallingBlockBreakServerEvent)

    def OnFallingBlockBreakServerEvent(self, args):
        fallingBlockId = args["fallingBlockId"]
        fallingBlockX = args["fallingBlockX"]
        fallingBlockY = args["fallingBlockY"]
        fallingBlockZ = args["fallingBlockZ"]
        blockName = args["blockName"]
        fallTickAmount = args["fallTickAmount"]
        dimensionId = args["dimensionId"]
        cancelDrop = args["cancelDrop"]
```

</TabItem>
</Tabs>

---

### FallingBlockCauseDamageBeforeClientEvent

<Client/>

触发时机：当下落的方块开始计算砸到实体的伤害时，客户端触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnFallingBlockCauseDamageBeforeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| fallingBlockId | int | 下落的方块实体 id。 |
| fallingBlockX | float | 下落的方块实体位置 x。 |
| fallingBlockY | float | 下落的方块实体位置 y。 |
| fallingBlockZ | float | 下落的方块实体位置 z。 |
| blockName | str | 重力方块的 identifier，包含命名空间及名称。 |
| dimensionId | int | 下落的方块实体维度 id。 |
| collidingEntitys | List[str] | 当前碰撞到的实体列表 id（客户端只能获取到玩家），如果没有的话是 None。 |
| fallTickAmount | int | 下落的方块实体持续下落了多少 tick。 |
| fallDistance | float | 下落的方块实体持续下落了多少距离。 |
| isHarmful | bool | 客户端始终为 false，因为客户端不会计算伤害值。 |
| fallDamage | int | 对实体的伤害。 |

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。
- 当该事件的参数数据（fallTickAmount，fallDistance，collidingEntitys，fallDamage）与服务端事件 [FallingBlockCauseDamageBeforeServerEvent](/docs/docs/scripts/modapi/events/block#fallingblockcausedamagebeforeserverevent) 数据有差异时，请以服务端事件数据为准。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "FallingBlockCauseDamageBeforeClientEvent",
            self, self.OnFallingBlockCauseDamageBeforeClientEvent)

    def OnFallingBlockCauseDamageBeforeClientEvent(self, args):
        fallingBlockId = args["fallingBlockId"]
        fallingBlockX = args["fallingBlockX"]
        fallingBlockY = args["fallingBlockY"]
        fallingBlockZ = args["fallingBlockZ"]
        blockName = args["blockName"]
        dimensionId = args["dimensionId"]
        collidingEntitys = args["collidingEntitys"]
        fallTickAmount = args["fallTickAmount"]
        fallDistance = args["fallDistance"]
        isHarmful = args["isHarmful"]
        fallDamage = args["fallDamage"]
```

</TabItem>
</Tabs>

---

### FallingBlockCauseDamageBeforeServerEvent

<Server/>

触发时机：当下落的方块开始计算砸到实体的伤害时，服务端触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnFallingBlockCauseDamageBeforeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| fallingBlockId | str | 下落的方块实体 id。 |
| fallingBlockX | float | 下落的方块实体位置 x。 |
| fallingBlockY | float | 下落的方块实体位置 y。 |
| fallingBlockZ | float | 下落的方块实体位置 z。 |
| blockName | str | 重力方块的 identifier，包含命名空间及名称。 |
| dimensionId | int | 下落的方块实体维度 id。 |
| collidingEntitys | List[str] | 当前碰撞到的实体列表 id，如果没有的话是 None。 |
| fallTickAmount | int | 下落的方块实体持续下落了多少 tick。 |
| fallDistance | float | 下落的方块实体持续下落了多少距离。 |
| isHarmful | bool | 是否计算对实体的伤害，引擎传来的值由 json 配置和伤害是否大于 0 决定，可在脚本层修改传回引擎。 |
| fallDamage | int | 对实体的伤害，引擎传来的值距离和 json 配置决定，可在脚本层修改传回引擎。 |

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。
- 服务端通常触发在客户端之后，而且有时会相差一个 tick，这就意味着可能发生以下现象:服务端 fallTickAmount 比配置强制破坏时间多 1tick，下落的距离、下落的伤害计算出来比客户端时间多 1tick 的误差。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "FallingBlockCauseDamageBeforeServerEvent",
            self, self.OnFallingBlockCauseDamageBeforeServerEvent)

    def OnFallingBlockCauseDamageBeforeServerEvent(self, args):
        fallingBlockId = args["fallingBlockId"]
        fallingBlockX = args["fallingBlockX"]
        fallingBlockY = args["fallingBlockY"]
        fallingBlockZ = args["fallingBlockZ"]
        blockName = args["blockName"]
        dimensionId = args["dimensionId"]
        collidingEntitys = args["collidingEntitys"]
        fallTickAmount = args["fallTickAmount"]
        fallDistance = args["fallDistance"]
        isHarmful = args["isHarmful"]
        fallDamage = args["fallDamage"]
```

</TabItem>
</Tabs>

---

### FallingBlockReturnHeavyBlockServerEvent

<Server/>

触发时机：当下落的方块实体变回普通重力方块时，服务端触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnFallingBlockReturnHeavyBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| fallingBlockId | int | 下落的方块实体 id。 |
| blockX | int | 方块位置 x。 |
| blockY | int | 方块位置 y。 |
| blockZ | int | 方块位置 z。 |
| heavyBlockName | str | 重力方块的 identifier，包含命名空间及名称。 |
| prevHereBlockName | str | 变回重力方块时，原本方块位置的 identifier，包含命名空间及名称。 |
| dimensionId | int | 下落的方块实体维度 id。 |
| fallTickAmount | int | 下落的方块实体持续下落了多少 tick。 |

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "FallingBlockReturnHeavyBlockServerEvent",
            self, self.OnFallingBlockReturnHeavyBlockServerEvent)

    def OnFallingBlockReturnHeavyBlockServerEvent(self, args):
        fallingBlockId = args["fallingBlockId"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        heavyBlockName = args["heavyBlockName"]
        prevHereBlockName = args["prevHereBlockName"]
        dimensionId = args["dimensionId"]
        fallTickAmount = args["fallTickAmount"]
```

</TabItem>
</Tabs>

---

### FarmBlockToDirtBlockServerEvent

<Server/>

触发时机：耕地退化为泥土时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnFarmBlockToDirtBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimension | int | 方块维度。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| setBlockType | int | 耕地退化为泥土的原因，参考[SetBlockType](/docs/docs/scripts/modapi/enums#setblocktype)。 |

**备注**

- 指令或者接口的设置不会触发该事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "FarmBlockToDirtBlockServerEvent",
            self, self.OnFarmBlockToDirtBlockServerEvent)

    def OnFarmBlockToDirtBlockServerEvent(self, args):
        dimension = args["dimension"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
        setBlockType = args["setBlockType"]
```

</TabItem>
</Tabs>

---

### GrassBlockToDirtBlockServerEvent

<Server/>

触发时机：草方块变成泥土方块时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnGrassBlockToDirtBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| dimension | int | 方块维度。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |

**备注**

- 指令或者接口的设置不会触发该事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "GrassBlockToDirtBlockServerEvent",
            self, self.OnGrassBlockToDirtBlockServerEvent)

    def OnGrassBlockToDirtBlockServerEvent(self, args):
        dimension = args["dimension"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
```

</TabItem>
</Tabs>

---

### HeavyBlockStartFallingServerEvent

<Server/>

触发时机：当重力方块变为下落的方块实体后，服务端触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnHeavyBlockStartFallingServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| fallingBlockId | str | 下落的方块实体 id。 |
| blockX | int | 方块位置 x。 |
| blockY | int | 方块位置 y。 |
| blockZ | int | 方块位置 z。 |
| blockName | str | 重力方块的 identifier，包含命名空间及名称。 |
| dimensionId | int | 下落的方块实体维度 id。 |

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "HeavyBlockStartFallingServerEvent",
            self, self.OnHeavyBlockStartFallingServerEvent)

    def OnHeavyBlockStartFallingServerEvent(self, args):
        fallingBlockId = args["fallingBlockId"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        blockName = args["blockName"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

---

### HopperTryPullInServerEvent

<Server/>

触发时机：当漏斗上方连接容器后，容器往漏斗开始输入物品时触发，事件仅触发一次。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnHopperTryPullInServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| x | int | 漏斗位置 x。 |
| y | int | 漏斗位置 y。 |
| z | int | 漏斗位置 z。 |
| abovePosX | int | 交互的容器位置 x。 |
| abovePosY | int | 交互的容器位置 y。 |
| abovePosZ | int | 交互的容器位置 z。 |
| dimensionId | int | 维度 id。 |
| canHopper | bool | 是否允许容器往漏斗加东西(要关闭此交互，需先监听此事件再放置容器)。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "HopperTryPullInServerEvent",
            self, self.OnHopperTryPullInServerEvent)

    def OnHopperTryPullInServerEvent(self, args):
        x = args["x"]
        y = args["y"]
        z = args["z"]
        abovePosX = args["abovePosX"]
        abovePosY = args["abovePosY"]
        abovePosZ = args["abovePosZ"]
        dimensionId = args["dimensionId"]
        canHopper = args["canHopper"]
```

</TabItem>
</Tabs>

---

### HopperTryPullOutServerEvent

<Server/>

触发时机：当漏斗以毗邻的方式连接容器时，即从旁边连接容器时，漏斗向容器开始输出物品时触发，事件仅触发一次。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnHopperTryPullOutServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| x | int | 漏斗位置 x。 |
| y | int | 漏斗位置 y。 |
| z | int | 漏斗位置 z。 |
| attachedPosX | int | 交互的容器位置 x。 |
| attachedPosY | int | 交互的容器位置 y。 |
| attachedPosZ | int | 交互的容器位置 z。 |
| dimensionId | int | 维度 id。 |
| canHopper | bool | 是否允许漏斗往容器加东西(要关闭此交互，需先监听此事件再放置容器)。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "HopperTryPullOutServerEvent",
            self, self.OnHopperTryPullOutServerEvent)

    def OnHopperTryPullOutServerEvent(self, args):
        x = args["x"]
        y = args["y"]
        z = args["z"]
        attachedPosX = args["attachedPosX"]
        attachedPosY = args["attachedPosY"]
        attachedPosZ = args["attachedPosZ"]
        dimensionId = args["dimensionId"]
        canHopper = args["canHopper"]
```

</TabItem>
</Tabs>

---

### ModBlockEntityLoadedClientEvent

<Client/>

客户端自定义方块实体初始化完成时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnModBlockEntityLoadedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| posX | int | 自定义方块实体的位置 X。 |
| posY | int | 自定义方块实体的位置 Y。 |
| posZ | int | 自定义方块实体的位置 Z。 |
| dimensionId | int | 维度 id。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |

**备注**

- 只有添加了自定义方块实体扩展功能的自定义方块实体才能触发该事件（见自定义方块实体外观），请用该事件来初始化自定义方块实体的 molang，否则方块实体未初始化完成会设置失败。
- 实际触发时机是自定义方块实体第一次出现在玩家视野中时触发，玩家离开后又回来时方块实体会重新加载并初始化。但由于出生点是常加载区域，来回传送不会重复触发此事件。
- 该事件在 [OnModBlockNeteaseEffectCreatedClientEvent](/docs/docs/scripts/modapi/events/block#onmodblockneteaseeffectcreatedclientevent) 后触发。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "ModBlockEntityLoadedClientEvent",
            self, self.OnModBlockEntityLoadedClientEvent)

    def OnModBlockEntityLoadedClientEvent(self, args):
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        dimensionId = args["dimensionId"]
        blockName = args["blockName"]
```

</TabItem>
</Tabs>

---

### ModBlockEntityRemoveClientEvent

<Client/>

客户端自定义方块实体卸载时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnModBlockEntityRemoveClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| posX | int | 自定义方块实体的位置 X。 |
| posY | int | 自定义方块实体的位置 Y。 |
| posZ | int | 自定义方块实体的位置 Z。 |
| dimensionId | int | 维度 id。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "ModBlockEntityRemoveClientEvent",
            self, self.OnModBlockEntityRemoveClientEvent)

    def OnModBlockEntityRemoveClientEvent(self, args):
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        dimensionId = args["dimensionId"]
        blockName = args["blockName"]
```

</TabItem>
</Tabs>

---

### ModBlockEntityTickClientEvent

<Client/>

客户端自定义方块实体 tick 事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnModBlockEntityTickClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| posX | int | 自定义方块实体的位置 X。 |
| posY | int | 自定义方块实体的位置 Y。 |
| posZ | int | 自定义方块实体的位置 Z。 |
| dimensionId | int | 维度 id。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |

**备注**

- 只有 client_tick 字段为 true 的自定义方块实体才能触发该事件（见自定义方块实体。
- 目前客户端实体 tick 范围为硬编码，范围为玩家为中心的等腰等斜边八边形，其中斜边长度为 5，非斜边长度为 3。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "ModBlockEntityTickClientEvent",
            self, self.OnModBlockEntityTickClientEvent)

    def OnModBlockEntityTickClientEvent(self, args):
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        dimensionId = args["dimensionId"]
        blockName = args["blockName"]
```

</TabItem>
</Tabs>

---

### OnAfterFallOnBlockClientEvent

<Client/>

触发时机：当实体降落到方块后客户端触发，主要用于力的计算。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnAfterFallOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| entityId | str | 实体 id。 |
| posX | float | 实体位置 x。 |
| posY | float | 实体位置 y。 |
| posZ | float | 实体位置 z。 |
| motionX | float | 瞬时移动 X 方向的力。 |
| motionY | float | 瞬时移动 Y 方向的力。 |
| motionZ | float | 瞬时移动 Z 方向的力。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| calculate | bool | 是否按脚本层传值计算力。 |

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件）。
- 如果要在脚本层修改 motion，回传的需要是浮点型，例如需要赋值 0.0 而不是 0。
- 如果需要修改实体的力，最好配合服务端事件同步修改，避免产生非预期现象。
- 因为引擎最后一定会按照原版方块规则计算力（普通方块置 0，床、粘液块等反弹），所以脚本层如果想直接修改当前力需要将 calculate 设为 true 取消原版计算，按照传回值计算。
- 引擎在落地之后 OnAfterFallOnBlockClientEvent 会一直触发，因此请在脚本层中做对应的逻辑判断。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnAfterFallOnBlockClientEvent",
            self, self.OnOnAfterFallOnBlockClientEvent)

    def OnOnAfterFallOnBlockClientEvent(self, args):
        entityId = args["entityId"]
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        motionX = args["motionX"]
        motionY = args["motionY"]
        motionZ = args["motionZ"]
        blockName = args["blockName"]
        calculate = args["calculate"]
```

</TabItem>
</Tabs>

---

### OnAfterFallOnBlockServerEvent

<Server/>

触发时机：当实体降落到方块后服务端触发，主要用于力的计算。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnAfterFallOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| entityId | str | 实体 id。 |
| posX | float | 实体位置 x。 |
| posY | float | 实体位置 y。 |
| posZ | float | 实体位置 z。 |
| motionX | float | 瞬时移动 X 方向的力。 |
| motionY | float | 瞬时移动 Y 方向的力。 |
| motionZ | float | 瞬时移动 Z 方向的力。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| calculate | bool | 是否按脚本层传值计算力。 |

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件）。
- 如果要在脚本层修改 motion，回传的需要是浮点型，例如需要赋值 0.0 而不是 0。
- 如果需要修改实体的力，最好配合客户端事件同步修改，避免产生非预期现象。
- 因为引擎最后一定会按照原版方块规则计算力（普通方块置 0，床、粘液块等反弹），所以脚本层如果想直接修改当前力需要将 calculate 设为 true 取消原版计算，按照传回值计算。
- 引擎在落地之后，OnAfterFallOnBlockServerEvent 会一直触发，因此请在脚本层中做对应的逻辑判断。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "OnAfterFallOnBlockServerEvent",
            self, self.OnOnAfterFallOnBlockServerEvent)

    def OnOnAfterFallOnBlockServerEvent(self, args):
        entityId = args["entityId"]
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        motionX = args["motionX"]
        motionY = args["motionY"]
        motionZ = args["motionZ"]
        blockName = args["blockName"]
        calculate = args["calculate"]
```

</TabItem>
</Tabs>

---

### OnBeforeFallOnBlockServerEvent

<Server/>

触发时机：当实体刚降落到方块上时服务端触发，主要用于伤害计算。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnBeforeFallOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| entityId | str | 实体 id。 |
| blockX | int | 方块位置 x。 |
| blockY | int | 方块位置 y。 |
| blockZ | int | 方块位置 z。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| fallDistance | float | 实体下降距离，可在脚本层传给引擎。 |
| cancel | bool | 是否取消引擎对实体下降伤害的计算。 |

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件）。
- 如果要在脚本层修改 fallDistance，回传的一定要是浮点型，例如需要赋值 0.0 而不是 0。
- 可能会因为轻微的反弹触发多次，可在脚本层针对 fallDistance 的值进行判断。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "OnBeforeFallOnBlockServerEvent",
            self, self.OnOnBeforeFallOnBlockServerEvent)

    def OnOnBeforeFallOnBlockServerEvent(self, args):
        entityId = args["entityId"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        blockName = args["blockName"]
        fallDistance = args["fallDistance"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### OnEntityInsideBlockClientEvent

<Client/>

触发时机：当实体碰撞盒所在区域有方块时，客户端持续触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| entityId | str | 实体 id。 |
| dimensionId | int | 实体所在维度 id。 |
| slowdownMultiX | float | 实体移速 X 方向的减速比例。 |
| slowdownMultiY | float | 实体移速 Y 方向的减速比例。 |
| slowdownMultiZ | float | 实体移速 Z 方向的减速比例。 |
| blockX | int | 方块位置 x。 |
| blockY | int | 方块位置 y。 |
| blockZ | int | 方块位置 z。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| cancel | bool | 可由脚本层回传 True 给引擎，阻止触发后续原版逻辑。 |

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnEntityInside 接口注册才能触发。
- 压力板和拌线钩不支持该事件，如需监听请参考 [OnEntityInsideBlockServerEvent](/docs/docs/scripts/modapi/events/block#onentityinsideblockserverevent) 事件。
- 如果需要修改 slowdownMulti/cancel，强烈建议与服务端事件同步修改，避免出现被服务端矫正等非预期现象。
- 如果要在脚本层修改 slowdownMulti，回传的一定要是浮点型，例如需要赋值 1.0 而不是 1。
- 有任意 slowdownMulti 参数被传回非 0 值时生效减速比例。
- slowdownMulti 参数更像是一个 Buff，例如并不是立刻计算，而是先保存在实体属性里延后计算、在已经有 slowdownMulti 属性的情况下会取最低的值、免疫掉落伤害等，与原版蜘蛛网逻辑基本一致。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnEntityInsideBlockClientEvent",
            self, self.OnOnEntityInsideBlockClientEvent)

    def OnOnEntityInsideBlockClientEvent(self, args):
        entityId = args["entityId"]
        dimensionId = args["dimensionId"]
        slowdownMultiX = args["slowdownMultiX"]
        slowdownMultiY = args["slowdownMultiY"]
        slowdownMultiZ = args["slowdownMultiZ"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        blockName = args["blockName"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

<Client/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnEntityInsideBlockClientEvent",
            self, self.OnOnEntityInsideBlockClientEvent)

    def OnOnEntityInsideBlockClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_entity_inside 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否注册成功。

**备注**

- 目前仅能动态添加与修改原版方块的 netease:on_entity_inside 组件。
- 可以多次调用修改原组件的值，删除组件请使用 UnRegisterOnEntityInside 接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.RegisterOnEntityInside("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态删除 netease:on_entity_inside 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否删除成功。

**备注**

- 目前仅能动态删除原版方块的 netease:on_entity_inside 组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.UnRegisterOnEntityInside("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

---

### OnEntityInsideBlockServerEvent

<Server/>

触发时机：当实体碰撞盒所在区域有方块时，服务端持续触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| entityId | str | 实体 id。 |
| slowdownMultiX | float | 实体移速 X 方向的减速比例，可在脚本层被修改。 |
| slowdownMultiY | float | 实体移速 Y 方向的减速比例，可在脚本层被修改。 |
| slowdownMultiZ | float | 实体移速 Z 方向的减速比例，可在脚本层被修改。 |
| blockX | int | 方块位置 x。 |
| blockY | int | 方块位置 y。 |
| blockZ | int | 方块位置 z。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| cancel | bool | 可由脚本层回传 True 给引擎，阻止触发后续原版逻辑。 |

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnEntityInside 接口注册才能触发。
- 如果需要修改 slowdownMulti/cancel，强烈建议与客户端事件同步修改，避免出现客户端表现不一致等非预期现象。
- 如果要在脚本层修改 slowdownMulti，回传的一定要是浮点型，例如需要赋值 1.0 而不是 1。
- 有任意 slowdownMulti 参数被传回非 0 值时生效减速比例。
- slowdownMulti 参数更像是一个 Buff，例如并不是立刻计算，而是先保存在实体属性里延后计算、在已经有 slowdownMulti 属性的情况下会取最低的值、免疫掉落伤害等，与原版蜘蛛网逻辑基本一致。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "OnEntityInsideBlockServerEvent",
            self, self.OnOnEntityInsideBlockServerEvent)

    def OnOnEntityInsideBlockServerEvent(self, args):
        entityId = args["entityId"]
        slowdownMultiX = args["slowdownMultiX"]
        slowdownMultiY = args["slowdownMultiY"]
        slowdownMultiZ = args["slowdownMultiZ"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        blockName = args["blockName"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

<Server/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "OnEntityInsideBlockServerEvent",
            self, self.OnOnEntityInsideBlockServerEvent)

    def OnOnEntityInsideBlockServerEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_entity_inside 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否注册成功。

**备注**

- 目前仅能动态添加与修改原版方块的 netease:on_entity_inside 组件。
- （非租赁服联机）使用服务端接口注册会影响到房主客户端组件。
- 可以多次调用修改原组件的值，删除组件请使用 UnRegisterOnEntityInside 接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.RegisterOnEntityInside("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态删除 netease:on_entity_inside 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否删除成功。

**备注**

- 目前仅能动态删除原版方块的 netease:on_entity_inside 组件。
- （非租赁服联机）使用服务端接口注册会影响到房主客户端组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.UnRegisterOnEntityInside("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

---

### OnModBlockNeteaseEffectCreatedClientEvent

<Client/>

自定义方块实体绑定的特效创建成功事件，在自定义方块实体中绑定的特效创建成功时触发以及使用接口 [CreateFrameEffectForBlockEntity](/docs/docs/scripts/modapi/interfaces/block/block_entity#createframeeffectforblockentity) 或 [CreateParticleEffectForBlockEntity](/docs/docs/scripts/modapi/interfaces/block/block_entity#createparticleeffectforblockentity) 为自定义方块实体添加特效成功时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnModBlockNeteaseEffectCreatedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| effectName | str | 创建成功的特效的自定义键值名称。 |
| id | int | 该特效的 id。 |
| effectType | int | 该特效的类型，0 为粒子特效，1 为序列帧特效。 |
| blockPos | Tuple[float, float, float] | 该特效绑定的自定义方块实体的世界坐标。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnModBlockNeteaseEffectCreatedClientEvent",
            self, self.OnOnModBlockNeteaseEffectCreatedClientEvent)

    def OnOnModBlockNeteaseEffectCreatedClientEvent(self, args):
        effectName = args["effectName"]
        id = args["id"]
        effectType = args["effectType"]
        blockPos = args["blockPos"]
```

</TabItem>
</Tabs>

---

### OnStandOnBlockClientEvent

<Client/>

触发时机：当实体站立到方块上时客户端持续触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| entityId | str | 实体 id。 |
| dimensionId | int | 实体所在维度 id。 |
| posX | float | 实体位置 x。 |
| posY | float | 实体位置 y。 |
| posZ | float | 实体位置 z。 |
| motionX | float | 瞬时移动 X 方向的力。 |
| motionY | float | 瞬时移动 Y 方向的力。 |
| motionZ | float | 瞬时移动 Z 方向的力。 |
| blockX | int | 方块位置 x。 |
| blockY | int | 方块位置 y。 |
| blockZ | int | 方块位置 z。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| cancel | bool | 可由脚本层回传 True 给引擎，阻止触发后续原版逻辑。 |

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStandOn 接口注册才能触发。
- 如果要在脚本层修改 motion/cancel，强烈建议配合 [OnStandOnBlockServerEvent](/docs/docs/scripts/modapi/events/block#onstandonblockserverevent) 服务端事件同步修改，避免出现被服务端矫正等非预期现象。
- 如果要在脚本层修改 motion，回传的一定要是浮点型，例如需要赋值 0.0 而不是 0。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnStandOnBlockClientEvent",
            self, self.OnOnStandOnBlockClientEvent)

    def OnOnStandOnBlockClientEvent(self, args):
        entityId = args["entityId"]
        dimensionId = args["dimensionId"]
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        motionX = args["motionX"]
        motionY = args["motionY"]
        motionZ = args["motionZ"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        blockName = args["blockName"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

<Client/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "OnStandOnBlockClientEvent",
            self, self.OnOnStandOnBlockClientEvent)

    def OnOnStandOnBlockClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_stand_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否注册成功。

**备注**

- 目前仅能动态添加与修改原版方块的 netease:on_stand_on 组件。
- 游戏原版逻辑是不会跑方块客户端 OnStandOn 相关逻辑，使用接口给原版方块添加客户端组件的话，都会使原版方块多跑客户端相关逻辑，例如粘液块这种会有一定物理计算的方块，在客户端多跑一次计算之后，会有手感上的差别。
- 可以多次调用修改原组件的值，删除组件请使用 UnRegisterOnStandOn 接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.RegisterOnStandOn("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态删除 netease:on_stand_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否删除成功。

**备注**

- 目前仅能动态删除原版方块的 netease:on_stand_on 组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.UnRegisterOnStandOn("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

---

### OnStandOnBlockServerEvent

<Server/>

触发时机：当实体站立到方块上时服务端持续触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| entityId | str | 实体 id。 |
| dimensionId | int | 实体所在维度 id。 |
| posX | float | 实体位置 x。 |
| posY | float | 实体位置 y。 |
| posZ | float | 实体位置 z。 |
| motionX | float | 瞬时移动 X 方向的力。 |
| motionY | float | 瞬时移动 Y 方向的力。 |
| motionZ | float | 瞬时移动 Z 方向的力。 |
| blockX | int | 方块位置 x。 |
| blockY | int | 方块位置 y。 |
| blockZ | int | 方块位置 z。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| cancel | bool | 可由脚本层回传 True 给引擎，阻止触发后续原版逻辑。 |

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStandOn 接口注册才能触发。
- 如果需要修改 motion/cancel，强烈建议配合客户端事件同步修改，避免出现客户端表现不一致等现象。
- 如果要在脚本层修改 motion，回传的一定要是浮点型，例如需要赋值 0.0 而不是 0。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "OnStandOnBlockServerEvent",
            self, self.OnOnStandOnBlockServerEvent)

    def OnOnStandOnBlockServerEvent(self, args):
        entityId = args["entityId"]
        dimensionId = args["dimensionId"]
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
        motionX = args["motionX"]
        motionY = args["motionY"]
        motionZ = args["motionZ"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        blockName = args["blockName"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

<Server/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "OnStandOnBlockServerEvent",
            self, self.OnOnStandOnBlockServerEvent)

    def OnOnStandOnBlockServerEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_stand_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否注册成功。

**备注**

- 目前仅能动态添加与修改原版方块的 netease:on_stand_on 组件。
- （非租赁服联机）使用服务端接口注册会影响到房主客户端组件。
- 游戏原版逻辑是不会跑方块客户端 OnStandOn 相关逻辑，使用接口给原版方块添加客户端组件的话，都会使原版方块多跑客户端相关逻辑，例如粘液块这种会有一定物理计算的方块，在客户端多跑一次计算之后，会有手感上的差别。
- 可以多次调用修改原组件的值，删除组件请使用 UnRegisterOnStandOn 接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.RegisterOnStandOn("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态删除 netease:on_stand_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否删除成功。

**备注**

- 目前仅能动态删除原版方块的 netease:on_stand_on 组件。
- （非租赁服联机）使用服务端接口注册会影响到房主客户端组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.UnRegisterOnStandOn("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

---

### PistonActionServerEvent

<Server/>

触发时机：活塞或者粘性活塞推送/缩回影响附近方块时。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPistonActionServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| cancel | bool | 是否允许触发，默认为 False，若设为 True，可阻止触发后续的事件。 |
| action | str | 推送时=expanding；缩回时=retracting。 |
| pistonFacing | int | 活塞的朝向，参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |
| pistonMoveFacing | int | 活塞的运动方向，参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |
| dimensionId | int | 活塞方块所在的维度。 |
| pistonX | int | 活塞方块的 x 坐标。 |
| pistonY | int | 活塞方块的 y 坐标。 |
| pistonZ | int | 活塞方块的 z 坐标。 |
| blockList | List[Tuple[int, int, int]] | 活塞运动影响到产生被移动效果的方块坐标[x,y,z]，均为 int 类型。 |
| breakBlockList | List[Tuple[int, int, int]] | 活塞运动影响到产生被破坏效果的方块坐标[x,y,z]，均为 int 类型。 |
| entityList | List[string] | 活塞运动影响到产生被移动或被破坏效果的实体的 ID 列表。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "PistonActionServerEvent",
            self, self.OnPistonActionServerEvent)

    def OnPistonActionServerEvent(self, args):
        cancel = args["cancel"]
        action = args["action"]
        pistonFacing = args["pistonFacing"]
        pistonMoveFacing = args["pistonMoveFacing"]
        dimensionId = args["dimensionId"]
        pistonX = args["pistonX"]
        pistonY = args["pistonY"]
        pistonZ = args["pistonZ"]
        blockList = args["blockList"]
        breakBlockList = args["breakBlockList"]
        entityList = args["entityList"]
```

</TabItem>
</Tabs>

---

### PlayerTryDestroyBlockClientEvent

<Client/>

当玩家即将破坏方块时，客户端线程触发该事件。主要用于床，旗帜，箱子这些根据方块实体数据进行渲染的方块，一般情况下请使用 [ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnPlayerTryDestroyBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| face | int | 方块被敲击的面向 id，参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxData | int | 方块附加值。 |
| playerId | str | 试图破坏方块的玩家 ID。 |
| cancel | bool | 默认为 False，在脚本层设置为 True 就能取消该方块的破坏。 |

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "PlayerTryDestroyBlockClientEvent",
            self, self.OnPlayerTryDestroyBlockClientEvent)

    def OnPlayerTryDestroyBlockClientEvent(self, args):
        x = args["x"]
        y = args["y"]
        z = args["z"]
        face = args["face"]
        blockName = args["blockName"]
        auxData = args["auxData"]
        playerId = args["playerId"]
        cancel = args["cancel"]
```

</TabItem>
</Tabs>

---

### ServerBlockEntityTickEvent

<Server/>

触发时机：自定义方块配置了 netease:block_entity 组件并设 tick 为 true，方块在玩家的模拟距离（新建存档时可以设置，默认为 4 个区块）内，或者在 tickingarea 内的时候触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerBlockEntityTickEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 该方块名称。 |
| dimension | int | 该方块所在的维度。 |
| posX | int | 该方块的 x 坐标。 |
| posY | int | 该方块的 y 坐标。 |
| posZ | int | 该方块的 z 坐标。 |

**备注**

- 方块实体的 tick 事件频率为每秒钟 20 次。
- 触发本事件时，若正在退出游戏，将无法获取到抛出本事件的方块实体数据（[GetBlockEntityData](/docs/docs/scripts/modapi/interfaces/block/block_entity#getblockentitydata) 函数返回 None），也无法对其进行操作。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ServerBlockEntityTickEvent",
            self, self.OnServerBlockEntityTickEvent)

    def OnServerBlockEntityTickEvent(self, args):
        blockName = args["blockName"]
        dimension = args["dimension"]
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
```

</TabItem>
</Tabs>

---

### ServerBlockUseEvent

<Server/>

触发时机：玩家右键点击新版自定义方块（或者通过接口 AddBlockItemListenForUseEvent 增加监听的 MC 原生游戏方块）时服务端抛出该事件（该事件 tick 执行，需要注意效率问题）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| playerId | str | 玩家 Id。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| aux | int | 方块附加值。 |
| cancel | bool | 设置为 True 可拦截与方块交互的逻辑。 |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| clickX | float | 点击点的 x 比例位置。 |
| clickY | float | 点击点的 y 比例位置。 |
| clickZ | float | 点击点的 z 比例位置。 |
| face | int | 点击方块的面，参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |
| itemDict | Dict[str, Any] | 使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。 |
| dimensionId | int | 维度 id。 |

**备注**

- 客户端对应事件 [ClientBlockUseEvent](/docs/docs/scripts/modapi/events/block#clientblockuseevent) 如果开启拦截开关，则服务端也不会收到对应事件，即 ServerBlockUseEvent 不会触发。
- 当对原生方块进行使用时，如堆肥桶等类似有 使用 功能的方块使用物品时，会触发该事件，而 [ServerItemUseOnEvent](/docs/docs/scripts/modapi/events/item#serveritemuseonevent) 则不会被触发。对应的客户端事件同理。
- 部分工具对方块的使用效果，如锹犁地，不一定能通过该事件 cancel，还需同时使用 ItemUseOnServerEvent 进行取消 目前已知有：锹犁地相关的方块：草地、泥土、砂土、菌丝体、灰化土、缠根泥土，均需同时通过 ServerBlockUseEvent 和 ItemUseOnServerEvent 进行取消。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ServerBlockUseEvent",
            self, self.OnServerBlockUseEvent)

    def OnServerBlockUseEvent(self, args):
        playerId = args["playerId"]
        blockName = args["blockName"]
        aux = args["aux"]
        cancel = args["cancel"]
        x = args["x"]
        y = args["y"]
        z = args["z"]
        clickX = args["clickX"]
        clickY = args["clickY"]
        clickZ = args["clickZ"]
        face = args["face"]
        itemDict = args["itemDict"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

<Server/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ServerBlockUseEvent",
            self, self.OnServerBlockUseEvent)

    def OnServerBlockUseEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Server/> BlockUseEventWhiteListComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(levelId)`

增加 blockName 方块对 ServerBlockUseEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块名称，格式：namespace:name:auxvalue，其中 namespace:name:*匹配所有的 auxvalue。 |

**返回值**：bool，是否增加成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(levelId)
comp.AddBlockItemListenForUseEvent("minecraft:nether_brick_stairs:2")
# 注意blockName格式为namespace:name:auxvalue，如果不填auxvalue，则默认为所有auxvalue
# auxValue详细值详见官方wiki，如https://zh.minecraft.wiki/w/楼梯 中的‘方块数据值’
```

</TabItem>
</Tabs>

<Server/> BlockUseEventWhiteListComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(levelId)`

移除 blockName 方块对 ServerBlockUseEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块名称，格式：namespace:name:auxvalue，其中 namespace:name:*匹配所有的 auxvalue。 |

**返回值**：bool，是否移除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(levelId)
comp.RemoveBlockItemListenForUseEvent("minecraft:nether_brick_stairs:2")
# 注意blockName格式为namespace:name:auxvalue，如果不填auxvalue，则默认为所有auxvalue
# auxValue详细值详见官方wiki，如https://zh.minecraft.wiki/w/楼梯 中的‘方块数据值’
```

</TabItem>
</Tabs>

<Server/> BlockUseEventWhiteListComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(levelId)`

清空所有已添加方块对 ServerBlockUseEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```


**返回值**：bool，是否清空成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(levelId)
comp.ClearAllListenForBlockUseEventItems()
```

</TabItem>
</Tabs>

---

### ServerEntityTryPlaceBlockEvent

<Server/>

触发时机：当生物试图放置方块时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerEntityTryPlaceBlockEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| x | int | 方块 x 坐标,支持修改。 |
| y | int | 方块 y 坐标,支持修改。 |
| z | int | 方块 z 坐标,支持修改。 |
| fullName | str | 方块的 identifier，包含命名空间及名称,支持修改。 |
| auxData | int | 方块附加值,支持修改。 |
| entityId | str | 试图放置方块的生物 ID。 |
| dimensionId | int | 维度 id。 |
| face | int | 点击方块的面，参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |
| cancel | bool | 默认为 False，在脚本层设置为 True 就能取消该方块的放置。 |
| clickX | float | 点击点的 x 比例位置。 |
| clickY | float | 点击点的 y 比例位置。 |
| clickZ | float | 点击点的 z 比例位置。 |

**备注**

- 部分放置后会产生实体的方块、可操作的方块、带有特殊逻辑的方块，不会触发该事件，包括但不限于床、门、告示牌、船、头部模型、盔甲架，半台阶方块叠加时等。
- 修改放置方块信息只对一般方块有效，对一些特殊方块无效，会导致放置取消，特殊方块包括：钟、蜡烛、管珊瑚扇、台阶、青蛙卵、脚手架、海泡菜、顶层雪、睡莲。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ServerEntityTryPlaceBlockEvent",
            self, self.OnServerEntityTryPlaceBlockEvent)

    def OnServerEntityTryPlaceBlockEvent(self, args):
        x = args["x"]
        y = args["y"]
        z = args["z"]
        fullName = args["fullName"]
        auxData = args["auxData"]
        entityId = args["entityId"]
        dimensionId = args["dimensionId"]
        face = args["face"]
        cancel = args["cancel"]
        clickX = args["clickX"]
        clickY = args["clickY"]
        clickZ = args["clickZ"]
```

</TabItem>
</Tabs>

---

### ServerPlaceBlockEntityEvent

<Server/>

触发时机：手动放置或通过接口创建含自定义方块实体的方块时触发，此时可向该方块实体中存放数据。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerPlaceBlockEntityEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 该方块名称。 |
| dimension | int | 该方块所在的维度。 |
| posX | int | 该方块的 x 坐标。 |
| posY | int | 该方块的 y 坐标。 |
| posZ | int | 该方块的 z 坐标。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ServerPlaceBlockEntityEvent",
            self, self.OnServerPlaceBlockEntityEvent)

    def OnServerPlaceBlockEntityEvent(self, args):
        blockName = args["blockName"]
        dimension = args["dimension"]
        posX = args["posX"]
        posY = args["posY"]
        posZ = args["posZ"]
```

</TabItem>
</Tabs>

---

### ServerPlayerTryDestroyBlockEvent

<Server/>

当玩家即将破坏方块时，服务端线程触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerPlayerTryDestroyBlockEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| x | int | 方块 x 坐标。 |
| y | int | 方块 y 坐标。 |
| z | int | 方块 z 坐标。 |
| face | int | 方块被敲击的面向 id，参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |
| fullName | str | 方块的 identifier，包含命名空间及名称。 |
| auxData | int | 方块附加值。 |
| playerId | str | 试图破坏方块的玩家 ID。 |
| dimensionId | int | 维度 id。 |
| cancel | bool | 默认为 False，在脚本层设置为 True 就能取消该方块的破坏。 |
| spawnResources | bool | 是否生成掉落物，默认为 True，在脚本层设置为 False 就能取消生成掉落物。 |

**备注**

- 若需要禁止某些特殊方块的破坏，需要配合 [PlayerTryDestroyBlockClientEvent](/docs/docs/scripts/modapi/events/block#playertrydestroyblockclientevent) 一起使用，例如床，旗帜，箱子这些根据方块实体数据进行渲染的方块。
- 该服务端事件触发于玩家破坏方块时，当方块为秒破方块时（破坏方块所需时间为 0 或未设置破坏时间），本事件触发在 [StartDestroyBlockServerEvent](/docs/docs/scripts/modapi/events/block#startdestroyblockserverevent) 事件之前;当方块为非秒破方块时，本事件触发在 [StartDestroyBlockServerEvent](/docs/docs/scripts/modapi/events/block#startdestroyblockserverevent) 事件之后。
- 可通过 minecraft:destroy_time 方块组件来修改方块的破坏时间。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ServerPlayerTryDestroyBlockEvent",
            self, self.OnServerPlayerTryDestroyBlockEvent)

    def OnServerPlayerTryDestroyBlockEvent(self, args):
        x = args["x"]
        y = args["y"]
        z = args["z"]
        face = args["face"]
        fullName = args["fullName"]
        auxData = args["auxData"]
        playerId = args["playerId"]
        dimensionId = args["dimensionId"]
        cancel = args["cancel"]
        spawnResources = args["spawnResources"]
```

</TabItem>
</Tabs>

---

### ShearsDestoryBlockBeforeClientEvent

<Client/>

触发时机：玩家手持剪刀破坏方块时，有剪刀特殊效果的方块会在客户端线程触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnShearsDestoryBlockBeforeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockX | int | 方块位置 x。 |
| blockY | int | 方块位置 y。 |
| blockZ | int | 方块位置 z。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxData | int | 方块附加值。 |
| dropName | str | 触发剪刀效果的掉落物 identifier，包含命名空间及名称。 |
| dropCount | int | 触发剪刀效果的掉落物数量。 |
| playerId | str | 触发剪刀效果的玩家 id。 |
| dimensionId | int | 玩家触发时的维度 id。 |
| cancelShears | bool | 是否取消剪刀效果。 |

**备注**

- 目前仅绊线会触发，需要取消剪刀效果得配合 [ShearsDestoryBlockBeforeServerEvent](/docs/docs/scripts/modapi/events/block#shearsdestoryblockbeforeserverevent) 同时使用。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "ShearsDestoryBlockBeforeClientEvent",
            self, self.OnShearsDestoryBlockBeforeClientEvent)

    def OnShearsDestoryBlockBeforeClientEvent(self, args):
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        blockName = args["blockName"]
        auxData = args["auxData"]
        dropName = args["dropName"]
        dropCount = args["dropCount"]
        playerId = args["playerId"]
        dimensionId = args["dimensionId"]
        cancelShears = args["cancelShears"]
```

</TabItem>
</Tabs>

---

### ShearsDestoryBlockBeforeServerEvent

<Server/>

触发时机：玩家手持剪刀破坏方块时，有剪刀特殊效果的方块会在服务端线程触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnShearsDestoryBlockBeforeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockX | int | 方块位置 x。 |
| blockY | int | 方块位置 y。 |
| blockZ | int | 方块位置 z。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxData | int | 方块附加值。 |
| dropName | str | 触发剪刀效果的掉落物 identifier，包含命名空间及名称。 |
| dropCount | int | 触发剪刀效果的掉落物数量。 |
| playerId | str | 触发剪刀效果的玩家 id。 |
| dimensionId | int | 玩家触发时的维度 id。 |
| cancelShears | bool | 是否取消剪刀效果。 |

**备注**

- 该事件触发在 [ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 之后，如果在 [ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 事件中设置了取消 Destory 或取消掉落物会导致该事件不触发。
- 取消剪刀效果后不掉落任何东西的方块类型：蜘蛛网、枯萎的灌木、草丛、下界苗、树叶、海草、藤蔓。
- 绊线取消剪刀效果需要配合 [ShearsDestoryBlockBeforeClientEvent](/docs/docs/scripts/modapi/events/block#shearsdestoryblockbeforeclientevent) 同时使用，否则在表现上可能展现出来的还是剪刀剪断后的效果。绊线取消剪刀效果后依然会掉落成线。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "ShearsDestoryBlockBeforeServerEvent",
            self, self.OnShearsDestoryBlockBeforeServerEvent)

    def OnShearsDestoryBlockBeforeServerEvent(self, args):
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        blockName = args["blockName"]
        auxData = args["auxData"]
        dropName = args["dropName"]
        dropCount = args["dropCount"]
        playerId = args["playerId"]
        dimensionId = args["dimensionId"]
        cancelShears = args["cancelShears"]
```

</TabItem>
</Tabs>

---

### StartDestroyBlockClientEvent

<Client/>

玩家开始挖方块时触发。创造模式下不触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStartDestroyBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| pos | Tuple[float, float, float] | 方块的坐标。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxValue | int | 方块的附加值。 |
| playerId | str | 玩家 id。 |
| cancel | bool | 修改为 True 时，可阻止玩家进入挖方块的状态。需要与 [StartDestroyBlockServerEvent](/docs/docs/scripts/modapi/events/block#startdestroyblockserverevent) 一起修改。 |
| face | int | 方块被敲击面,参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |

**备注**

- 如果是隔着火焰挖方块，即使将该事件 cancel 掉，火焰也会被扑灭。如果要阻止火焰扑灭，需要配合 [ExtinguishFireClientEvent](/docs/docs/scripts/modapi/events/player#extinguishfireclientevent) 使用。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "StartDestroyBlockClientEvent",
            self, self.OnStartDestroyBlockClientEvent)

    def OnStartDestroyBlockClientEvent(self, args):
        pos = args["pos"]
        blockName = args["blockName"]
        auxValue = args["auxValue"]
        playerId = args["playerId"]
        cancel = args["cancel"]
        face = args["face"]
```

</TabItem>
</Tabs>

---

### StartDestroyBlockServerEvent

<Server/>

玩家开始挖方块时触发。创造模式下不触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStartDestroyBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| pos | Tuple[float, float, float] | 方块的坐标。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| auxValue | int | 方块的附加值。 |
| playerId | str | 玩家 id。 |
| dimensionId | int | 维度 id。 |
| cancel | bool | 修改为 True 时，可阻止玩家进入挖方块的状态。需要与 [StartDestroyBlockClientEvent](/docs/docs/scripts/modapi/events/block#startdestroyblockclientevent) 一起修改。 |
| face | int | 方块被敲击面,参考[Facing 枚举](/docs/docs/scripts/modapi/enums#facing)。 |

**备注**

- 如果是隔着火焰挖方块，即使将该事件 cancel 掉，火焰也会被扑灭。如果要阻止火焰扑灭，需要配合 [ExtinguishFireServerEvent](/docs/docs/scripts/modapi/events/player#extinguishfireserverevent) 使用。
- 该服务端事件触发于服务端收到玩家破坏操作时，当方块为秒破方块时（破坏方块所需时间为 0 或未设置破坏时间），[ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 事件触发在本事件之前;当方块为非秒破方块时，[ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 事件触发在本事件之后。
- 秒破方块在本事件触发前已经被服务端删除，此时本事件获取到的 blockName 为 minecraft:air，且无法通过本事件进行取消操作,以下是两个解决方法：（1）用 [ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 获取到正确的方块信息或取消操作。（2）通过 minecraft:destroy_time 方块组件来修改方块的破坏时间。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "StartDestroyBlockServerEvent",
            self, self.OnStartDestroyBlockServerEvent)

    def OnStartDestroyBlockServerEvent(self, args):
        pos = args["pos"]
        blockName = args["blockName"]
        auxValue = args["auxValue"]
        playerId = args["playerId"]
        dimensionId = args["dimensionId"]
        cancel = args["cancel"]
        face = args["face"]
```

</TabItem>
</Tabs>

---

### StepOffBlockClientEvent

<Client/>

触发时机：实体移动离开一个实心方块时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockX | int | 方块 x 坐标。 |
| blockY | int | 方块 y 坐标。 |
| blockZ | int | 方块 z 坐标。 |
| entityId | str | 触发的 entity 的唯一 ID。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| dimensionId | int | 维度 id。 |

**备注**

- 不是所有方块都会触发该事件，自定义方块需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStepOff 接口注册才能触发。
- 压力板与绊线钩这种非实心方块不会触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "StepOffBlockClientEvent",
            self, self.OnStepOffBlockClientEvent)

    def OnStepOffBlockClientEvent(self, args):
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        entityId = args["entityId"]
        blockName = args["blockName"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

<Client/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "StepOffBlockClientEvent",
            self, self.OnStepOffBlockClientEvent)

    def OnStepOffBlockClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_step_off 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否注册成功。

**备注**

- 目前仅能动态添加与修改原版方块的 netease:on_step_off 组件。
- 可以多次调用修改原组件的值，删除组件请使用 UnRegisterOnStepOff 接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.RegisterOnStepOff("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态删除 netease:on_step_off 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否删除成功。

**备注**

- 目前仅能动态删除原版方块的 netease:on_step_off 组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.UnRegisterOnStepOff("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

---

### StepOffBlockServerEvent

<Server/>

触发时机：实体移动离开一个实心方块时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockX | int | 方块 x 坐标。 |
| blockY | int | 方块 y 坐标。 |
| blockZ | int | 方块 z 坐标。 |
| entityId | str | 触发的 entity 的唯一 ID。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| dimensionId | int | 维度 id。 |

**备注**

- 不是所有方块都会触发该事件，自定义方块需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStepOff 接口注册才能触发。
- 压力板与绊线钩这种非实心方块不会触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "StepOffBlockServerEvent",
            self, self.OnStepOffBlockServerEvent)

    def OnStepOffBlockServerEvent(self, args):
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        entityId = args["entityId"]
        blockName = args["blockName"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

<Server/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "StepOffBlockServerEvent",
            self, self.OnStepOffBlockServerEvent)

    def OnStepOffBlockServerEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_step_off 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否注册成功。

**备注**

- 目前仅能动态添加与修改原版方块的 netease:on_step_off 组件。
- （非租赁服联机）使用服务端接口注册会影响到房主客户端组件。
- 可以多次调用修改原组件的值，删除组件请使用 UnRegisterOnStepOff 接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.RegisterOnStepOff("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态删除 netease:on_step_off 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否删除成功。

**备注**

- 目前仅能动态删除原版方块的 netease:on_step_off 组件。
- （非租赁服联机）使用服务端接口注册会影响到房主客户端组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.UnRegisterOnStepOff("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

---

### StepOnBlockClientEvent

<Client/>

触发时机：实体刚移动至一个新实心方块时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| cancel | bool | 是否允许触发，默认为 False，若设为 True，可阻止触发后续原版逻辑。 |
| blockX | int | 方块 x 坐标。 |
| blockY | int | 方块 y 坐标。 |
| blockZ | int | 方块 z 坐标。 |
| entityId | str | 触发的 entity 的唯一 ID。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| dimensionId | int | 维度 id。 |

**备注**

- 在合并微软更新之后，本事件触发时机与微软 molang 实验性玩法组件"minecraft:on_step_on"一致。
- 版本更新后，不再支持压力板和拌线钩这两种非实心方块触发此事件，如需监听请参考 [OnEntityInsideBlockServerEvent](/docs/docs/scripts/modapi/events/block#onentityinsideblockserverevent) 事件。
- 不是所有方块都会触发该事件，自定义方块需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStepOn 接口注册才能触发。原版的红石矿默认注册了，但深层红石矿没有默认注册。
- 如果需要修改 cancel，强烈建议配合服务端事件同步修改，避免出现被服务端矫正等非预期现象。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "StepOnBlockClientEvent",
            self, self.OnStepOnBlockClientEvent)

    def OnStepOnBlockClientEvent(self, args):
        cancel = args["cancel"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        entityId = args["entityId"]
        blockName = args["blockName"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

<Client/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class MyClientSystem(ClientSystem):
    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            "StepOnBlockClientEvent",
            self, self.OnStepOnBlockClientEvent)

    def OnStepOnBlockClientEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_step_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否注册成功。

**备注**

- 目前仅能动态添加与修改原版方块的 netease:on_step_on 组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.RegisterOnStepOn("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态删除 netease:on_step_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否删除成功。

**备注**

- 目前仅能动态删除原版方块的 netease:on_step_on 组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.UnRegisterOnStepOn("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

---

### StepOnBlockServerEvent

<Server/>

触发时机：实体刚移动至一个新实心方块时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| cancel | bool | 是否允许触发，默认为 False，若设为 True，可阻止触发后续物理交互事件。 |
| blockX | int | 方块 x 坐标。 |
| blockY | int | 方块 y 坐标。 |
| blockZ | int | 方块 z 坐标。 |
| entityId | str | 触发的 entity 的唯一 ID。 |
| blockName | str | 方块的 identifier，包含命名空间及名称。 |
| dimensionId | int | 维度 id。 |

**备注**

- 在合并微软更新之后，本事件触发时机与微软 molang 实验性玩法组件"minecraft:on_step_on"一致。
- 压力板与绊线钩在过去的版本的事件是可以触发的，但在更新后这种非实心方块并不会触发，有需要的可以使用 [OnEntityInsideBlockServerEvent](/docs/docs/scripts/modapi/events/block#onentityinsideblockserverevent) 事件。
- 不是所有方块都会触发该事件，自定义方块需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStepOn 接口注册才能触发。原版的红石矿默认注册了，但深层红石矿没有默认注册。
- 如果需要修改 cancel，强烈建议配合客户端事件同步修改，避免出现客户端表现不一致等非预期现象。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "StepOnBlockServerEvent",
            self, self.OnStepOnBlockServerEvent)

    def OnStepOnBlockServerEvent(self, args):
        cancel = args["cancel"]
        blockX = args["blockX"]
        blockY = args["blockY"]
        blockZ = args["blockZ"]
        entityId = args["entityId"]
        blockName = args["blockName"]
        dimensionId = args["dimensionId"]
```

</TabItem>
</Tabs>

<Server/>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()

class MyServerSystem(ServerSystem):
    def __init__(self, namespace, systemName):
        ServerSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            serverApi.GetEngineNamespace(),
            serverApi.GetEngineSystemName(),
            "StepOnBlockServerEvent",
            self, self.OnStepOnBlockServerEvent)

    def OnStepOnBlockServerEvent(self, args):
        pass
```

</TabItem>
</Tabs>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_step_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否注册成功。

**备注**

- 目前仅能动态添加与修改原版方块的 netease:on_step_on 组件。
- （非租赁服联机）使用服务端接口注册会影响到房主客户端组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.RegisterOnStepOn("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态删除 netease:on_step_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

| args的参数名 | 类型 | 说明 |
| --- | --- | --- |
| blockName | str | 方块标识符，包含命名空间，如 minecraft:grass。 |

**返回值**：bool，是否删除成功。

**备注**

- 目前仅能动态删除原版方块的 netease:on_step_on 组件。
- （非租赁服联机）使用服务端接口注册会影响到房主客户端组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
comp.UnRegisterOnStepOn("minecraft:redstone_ore")
```

</TabItem>
</Tabs>

---
