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

```python
def OnBlockAnimateRandomTickEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockPos"]: Tuple[float, float, float]，方块坐标。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxData"]: int，方块附加值。

---

### BlockDestroyByLiquidServerEvent

<Server/>

触发时机：方块被水流破坏的事件。

```python
def OnBlockDestroyByLiquidServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["liquidName"]: str，流体方块 id。
- args["blockName"]: str，方块 id。
- args["auxValue"]: int，方块附加值。
- args["dimensionId"]: int，方块所在维度 id。

**备注**

- 指令或者接口的设置不会触发该事件。

---

### BlockLiquidStateChangeAfterServerEvent

<Server/>

触发时机：方块转为含水或者脱离含水(流体)后触发。

```python
def OnBlockLiquidStateChangeAfterServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxValue"]: int，方块附加值。
- args["dimension"]: int，方块维度。
- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["turnLiquid"]: bool，是否转为含水，true 则转为含水，false 则脱离含水。

---

### BlockLiquidStateChangeServerEvent

<Server/>

触发时机：方块转为含水或者脱离含水(流体)前触发。

```python
def OnBlockLiquidStateChangeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxValue"]: int，方块附加值。
- args["dimension"]: int，方块维度。
- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["turnLiquid"]: bool，是否转为含水，true 则转为含水，false 则脱离含水。

---

### BlockNeighborChangedServerEvent

<Server/>

触发时机：自定义方块周围的方块发生变化时，需要配置 netease:neighborchanged_sendto_script，详情请查阅《自定义农作物》文档。

```python
def OnBlockNeighborChangedServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["dimensionId"]: int，维度。
- args["posX"]: int，方块 x 坐标。
- args["posY"]: int，方块 y 坐标。
- args["posZ"]: int，方块 z 坐标。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxValue"]: int，方块附加值。
- args["neighborPosX"]: int，变化方块 x 坐标。
- args["neighborPosY"]: int，变化方块 y 坐标。
- args["neighborPosZ"]: int，变化方块 z 坐标。
- args["fromBlockName"]: str，方块变化前的 identifier，包含命名空间及名称。
- args["fromBlockAuxValue"]: int，方块变化前附加值。
- args["toBlockName"]: str，方块变化后的 identifier，包含命名空间及名称。
- args["toAuxValue"]: int，方块变化后附加值。

---

### BlockRandomTickServerEvent

<Server/>

触发时机：自定义方块配置[netease:random_tick](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/2-zidingyifangkuai/1-json-zujian.html#netease-random-tick)随机 tick 时。

```python
def OnBlockRandomTickServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["posX"]: int，方块 x 坐标。
- args["posY"]: int，方块 y 坐标。
- args["posZ"]: int，方块 z 坐标。
- args["blockName"]: str，方块名称。
- args["fullName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxValue"]: int，方块附加值。
- args["brightness"]: int，方块亮度。
- args["dimensionId"]: int，方块所在维度。

---

### BlockRemoveServerEvent

<Server/>

触发时机：监听该事件的方块在销毁时触发，可以通过 ListenOnBlockRemoveEvent 方法进行监听，或者通过 json 组件[netease:listen_block_remove](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/2-zidingyifangkuai/1-json-zujian.html#netease-listen-block-remove)进行配置。

```python
def OnBlockRemoveServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["x"]: int，方块位置 x。
- args["y"]: int，方块位置 y。
- args["z"]: int，方块位置 z。
- args["fullName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxValue"]: int，方块的附加值。
- args["dimension"]: int，该方块所在的维度。

<Server/>

```python
def OnBlockRemoveServerEvent(self, args: Dict[str, Any]) -> None: ...
```

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

是否监听方块 BlockRemoveServerEvent 事件，可以动态修改 json 组件[netease:listen_block_remove](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/2-zidingyifangkuai/1-json-zujian.html#netease-listen-block-remove)的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnBlockRemoveServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["identifier"]: str，方块 identifier，如 minecraft:wheat。
- args["listen"]: bool，是否监听。

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

```python
def OnBlockSnowStateChangeAfterServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["dimension"]: int，方块维度。
- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["turnSnow"]: bool，是否转为含雪，true 则转为含雪，false 则脱离含雪。
- args["setBlockType"]: int，方块进入脱离含雪的原因，参考[SetBlockType](https://mc.163.com/newdev/docs/api/meijuzhi/SetBlockType.html)。

---

### BlockSnowStateChangeServerEvent

<Server/>

触发时机：方块转为含雪或者脱离含雪前触发。

```python
def OnBlockSnowStateChangeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["dimension"]: int，方块维度。
- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["turnSnow"]: bool，是否转为含雪，true 则转为含雪，false 则脱离含雪。
- args["setBlockType"]: int，方块进入脱离含雪的原因，参考[SetBlockType](https://mc.163.com/newdev/docs/api/meijuzhi/SetBlockType.html)。

---

### BlockStrengthChangedServerEvent

<Server/>

触发时机：自定义机械元件方块红石信号量发生变化时触发。

```python
def OnBlockStrengthChangedServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["posX"]: int，方块 x 坐标。
- args["posY"]: int，方块 y 坐标。
- args["posZ"]: int，方块 z 坐标。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxValue"]: int，方块附加值。
- args["newStrength"]: int，变化后的红石信号量。
- args["oldStrength"]: int，变化前的红石信号量。
- args["dimensionId"]: int，维度。

---

### ChestBlockTryPairWithServerEvent

<Server/>

触发时机：两个并排的小箱子方块准备组合为一个大箱子方块时。

```python
def OnChestBlockTryPairWithServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["cancel"]: bool，是否允许触发，默认为 False，若设为 True，可阻止小箱子组合成为一个大箱子。
- args["blockX"]: int，小箱子方块 x 坐标。
- args["blockY"]: int，小箱子方块 y 坐标。
- args["blockZ"]: int，小箱子方块 z 坐标。
- args["otherBlockX"]: int，将要与之组合的另外一个小箱子方块 x 坐标。
- args["otherBlockY"]: int，将要与之组合的另外一个小箱子方块 y 坐标。
- args["otherBlockZ"]: int，将要与之组合的另外一个小箱子方块 z 坐标。
- args["dimensionId"]: int，维度 id。

---

### ClientBlockUseEvent

<Client/>

触发时机：玩家右键点击新版自定义方块（或者通过接口 AddBlockItemListenForUseEvent 增加监听的 MC 原生游戏方块）时客户端抛出该事件（该事件 tick 执行，需要注意效率问题）。

```python
def OnClientBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["playerId"]: str，玩家 Id。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["aux"]: int，方块附加值。
- args["cancel"]: bool，设置为 True 可拦截与方块交互的逻辑。
- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["clickX"]: float，点击点的 x 比例位置。
- args["clickY"]: float，点击点的 y 比例位置。
- args["clickZ"]: float，点击点的 z 比例位置。

**备注**

- 如果拦截与方块交互的逻辑，则不会给服务端发送对应的网络包。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Client/>

```python
def OnClientBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

<Client/> BlockUseEventWhiteListComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(clientApi.GetLevelId())`

增加 blockName 方块对 ClientBlockUseEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnClientBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块名称，格式：namespace:name:auxvalue，其中 namespace:name:*匹配所有的 auxvalue。

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

- args["blockName"]: str，方块名称，格式：namespace:name:auxvalue，其中 namespace:name:*匹配所有的 auxvalue。

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

```python
def OnCommandBlockContainerOpenEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["playerId"]: str，玩家实体 id。
- args["isBlock"]: bool，是否以方块坐标的形式定位命令方块，当为 True 时下述的 blockX/blockY/blockZ 有意义，当为 False 时，下述的 victimId 有意义。
- args["blockX"]: int，命令方块位置 x，当 isBlock 为 True 时有效。
- args["blockY"]: int，命令方块位置 y，当 isBlock 为 True 时有效。
- args["blockZ"]: int，命令方块位置 z，当 isBlock 为 True 时有效。
- args["victimId"]: str，命令方块对应的逻辑实体的唯一 id，当 isBlock 为 False 时有效。
- args["cancel"]: bool，修改为 True 时，可以阻止玩家打开命令方块的设置界面。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### CommandBlockUpdateEvent

<Server/>

触发时机：玩家尝试修改命令方块的内置命令时。

```python
def OnCommandBlockUpdateEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["playerId"]: str，玩家实体 id。
- args["playerUid"]: Union[int, int]，玩家的 uid。
- args["command"]: str，企图修改的命令方块中的命令内容字符串。
- args["isBlock"]: bool，是否以方块坐标的形式定位命令方块，当为 True 时下述的 blockX/blockY/blockZ 有意义，当为 False 时，下述的 victimId 有意义。
- args["blockX"]: int，命令方块位置 x，当 isBlock 为 True 时有效。
- args["blockY"]: int，命令方块位置 y，当 isBlock 为 True 时有效。
- args["blockZ"]: int，命令方块位置 z，当 isBlock 为 True 时有效。
- args["victimId"]: str，命令方块对应的逻辑实体的唯一 id，当 isBlock 为 False 时有效。
- args["cancel"]: bool，修改为 True 时，可以阻止玩家修改命令方块的内置命令。

**备注**

- 当修改的目标为命令方块矿车时（此时 isBlock 为 False），设置 cancel 为 True，依旧可以阻止修改命令方块矿车的内部指令，但是从客户端能够看到命令方块矿车的内部指令变化了，不过这仅仅是假象，重新登录或者其他客户端打开命令方块矿车的设置界面，就会发现其实内部指令没有变化。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### DestroyBlockEvent

<Server/>

触发时机：当方块已经被玩家破坏时触发该事件。

```python
def OnDestroyBlockEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["face"]: int，方块被敲击的面向 id，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- args["fullName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxData"]: int，方块附加值。
- args["playerId"]: str，破坏方块的玩家 ID。
- args["dimensionId"]: int，维度 id。
- args["dropEntityIds"]: List[str]，掉落物实体 id 列表。

**备注**

- 在生存模式或创造模式下都会触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### DirtBlockToGrassBlockServerEvent

<Server/>

触发时机：泥土方块变成草方块时触发。

```python
def OnDirtBlockToGrassBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["dimension"]: int，方块维度。
- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。

**备注**

- 指令或者接口的设置不会触发该事件。

---

### EntityPlaceBlockAfterServerEvent

<Server/>

触发时机：当生物成功放置方块后触发。

```python
def OnEntityPlaceBlockAfterServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["fullName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxData"]: int，方块附加值。
- args["entityId"]: str，试图放置方块的生物 ID。
- args["dimensionId"]: int，维度 id。
- args["face"]: int，点击方块的面，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。

**备注**

- 部分放置后会产生实体的方块、可操作的方块、带有特殊逻辑的方块，不会触发该事件，包括但不限于床、门、告示牌、花盆、红石中继器、船、炼药锅、头部模型、蛋糕、酿造台、盔甲架等。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### FallingBlockBreakServerEvent

<Server/>

触发时机：当下落的方块实体被破坏时，服务端触发该事件。

```python
def OnFallingBlockBreakServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["fallingBlockId"]: str，下落的方块实体 id。
- args["fallingBlockX"]: float，下落的方块实体位置 x。
- args["fallingBlockY"]: float，下落的方块实体位置 y。
- args["fallingBlockZ"]: float，下落的方块实体位置 z。
- args["blockName"]: str，重力方块的 identifier，包含命名空间及名称。
- args["fallTickAmount"]: int，下落的方块实体持续下落了多少 tick。
- args["dimensionId"]: int，下落的方块实体维度 id。
- args["cancelDrop"]: bool，是否取消方块物品掉落，可以在脚本层中设置。

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。

---

### FallingBlockCauseDamageBeforeClientEvent

<Client/>

触发时机：当下落的方块开始计算砸到实体的伤害时，客户端触发该事件。

```python
def OnFallingBlockCauseDamageBeforeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["fallingBlockId"]: int，下落的方块实体 id。
- args["fallingBlockX"]: float，下落的方块实体位置 x。
- args["fallingBlockY"]: float，下落的方块实体位置 y。
- args["fallingBlockZ"]: float，下落的方块实体位置 z。
- args["blockName"]: str，重力方块的 identifier，包含命名空间及名称。
- args["dimensionId"]: int，下落的方块实体维度 id。
- args["collidingEntitys"]: List[str]，当前碰撞到的实体列表 id（客户端只能获取到玩家），如果没有的话是 None。
- args["fallTickAmount"]: int，下落的方块实体持续下落了多少 tick。
- args["fallDistance"]: float，下落的方块实体持续下落了多少距离。
- args["isHarmful"]: bool，客户端始终为 false，因为客户端不会计算伤害值。
- args["fallDamage"]: int，对实体的伤害。

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。
- 当该事件的参数数据（fallTickAmount，fallDistance，collidingEntitys，fallDamage）与服务端事件 [FallingBlockCauseDamageBeforeServerEvent](/docs/docs/scripts/modapi/events/block#fallingblockcausedamagebeforeserverevent) 数据有差异时，请以服务端事件数据为准。

---

### FallingBlockCauseDamageBeforeServerEvent

<Server/>

触发时机：当下落的方块开始计算砸到实体的伤害时，服务端触发该事件。

```python
def OnFallingBlockCauseDamageBeforeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["fallingBlockId"]: str，下落的方块实体 id。
- args["fallingBlockX"]: float，下落的方块实体位置 x。
- args["fallingBlockY"]: float，下落的方块实体位置 y。
- args["fallingBlockZ"]: float，下落的方块实体位置 z。
- args["blockName"]: str，重力方块的 identifier，包含命名空间及名称。
- args["dimensionId"]: int，下落的方块实体维度 id。
- args["collidingEntitys"]: List[str]，当前碰撞到的实体列表 id，如果没有的话是 None。
- args["fallTickAmount"]: int，下落的方块实体持续下落了多少 tick。
- args["fallDistance"]: float，下落的方块实体持续下落了多少距离。
- args["isHarmful"]: bool，是否计算对实体的伤害，引擎传来的值由 json 配置和伤害是否大于 0 决定，可在脚本层修改传回引擎。
- args["fallDamage"]: int，对实体的伤害，引擎传来的值距离和 json 配置决定，可在脚本层修改传回引擎。

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。
- 服务端通常触发在客户端之后，而且有时会相差一个 tick，这就意味着可能发生以下现象:服务端 fallTickAmount 比配置强制破坏时间多 1tick，下落的距离、下落的伤害计算出来比客户端时间多 1tick 的误差。

---

### FallingBlockReturnHeavyBlockServerEvent

<Server/>

触发时机：当下落的方块实体变回普通重力方块时，服务端触发该事件。

```python
def OnFallingBlockReturnHeavyBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["fallingBlockId"]: int，下落的方块实体 id。
- args["blockX"]: int，方块位置 x。
- args["blockY"]: int，方块位置 y。
- args["blockZ"]: int，方块位置 z。
- args["heavyBlockName"]: str，重力方块的 identifier，包含命名空间及名称。
- args["prevHereBlockName"]: str，变回重力方块时，原本方块位置的 identifier，包含命名空间及名称。
- args["dimensionId"]: int，下落的方块实体维度 id。
- args["fallTickAmount"]: int，下落的方块实体持续下落了多少 tick。

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。

---

### FarmBlockToDirtBlockServerEvent

<Server/>

触发时机：耕地退化为泥土时触发。

```python
def OnFarmBlockToDirtBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["dimension"]: int，方块维度。
- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["setBlockType"]: int，耕地退化为泥土的原因，参考[SetBlockType](https://mc.163.com/newdev/docs/api/meijuzhi/SetBlockType.html)。

**备注**

- 指令或者接口的设置不会触发该事件。

---

### GrassBlockToDirtBlockServerEvent

<Server/>

触发时机：草方块变成泥土方块时触发。

```python
def OnGrassBlockToDirtBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["dimension"]: int，方块维度。
- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。

**备注**

- 指令或者接口的设置不会触发该事件。

---

### HeavyBlockStartFallingServerEvent

<Server/>

触发时机：当重力方块变为下落的方块实体后，服务端触发该事件。

```python
def OnHeavyBlockStartFallingServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["fallingBlockId"]: str，下落的方块实体 id。
- args["blockX"]: int，方块位置 x。
- args["blockY"]: int，方块位置 y。
- args["blockZ"]: int，方块位置 z。
- args["blockName"]: str，重力方块的 identifier，包含命名空间及名称。
- args["dimensionId"]: int，下落的方块实体维度 id。

**备注**

- 不是所有下落的方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义重力方块）。

---

### HopperTryPullInServerEvent

<Server/>

触发时机：当漏斗上方连接容器后，容器往漏斗开始输入物品时触发，事件仅触发一次。

```python
def OnHopperTryPullInServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["x"]: int，漏斗位置 x。
- args["y"]: int，漏斗位置 y。
- args["z"]: int，漏斗位置 z。
- args["abovePosX"]: int，交互的容器位置 x。
- args["abovePosY"]: int，交互的容器位置 y。
- args["abovePosZ"]: int，交互的容器位置 z。
- args["dimensionId"]: int，维度 id。
- args["canHopper"]: bool，是否允许容器往漏斗加东西(要关闭此交互，需先监听此事件再放置容器)。

---

### HopperTryPullOutServerEvent

<Server/>

触发时机：当漏斗以毗邻的方式连接容器时，即从旁边连接容器时，漏斗向容器开始输出物品时触发，事件仅触发一次。

```python
def OnHopperTryPullOutServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["x"]: int，漏斗位置 x。
- args["y"]: int，漏斗位置 y。
- args["z"]: int，漏斗位置 z。
- args["attachedPosX"]: int，交互的容器位置 x。
- args["attachedPosY"]: int，交互的容器位置 y。
- args["attachedPosZ"]: int，交互的容器位置 z。
- args["dimensionId"]: int，维度 id。
- args["canHopper"]: bool，是否允许漏斗往容器加东西(要关闭此交互，需先监听此事件再放置容器)。

---

### ModBlockEntityLoadedClientEvent

<Client/>

客户端自定义方块实体初始化完成时触发。

```python
def OnModBlockEntityLoadedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["posX"]: int，自定义方块实体的位置 X。
- args["posY"]: int，自定义方块实体的位置 Y。
- args["posZ"]: int，自定义方块实体的位置 Z。
- args["dimensionId"]: int，维度 id。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。

**备注**

- 只有添加了自定义方块实体扩展功能的自定义方块实体才能触发该事件（见自定义方块实体外观），请用该事件来初始化自定义方块实体的 molang，否则方块实体未初始化完成会设置失败。
- 实际触发时机是自定义方块实体第一次出现在玩家视野中时触发，玩家离开后又回来时方块实体会重新加载并初始化。但由于出生点是常加载区域，来回传送不会重复触发此事件。
- 该事件在 [OnModBlockNeteaseEffectCreatedClientEvent](/docs/docs/scripts/modapi/events/block#onmodblockneteaseeffectcreatedclientevent) 后触发。

---

### ModBlockEntityRemoveClientEvent

<Client/>

客户端自定义方块实体卸载时触发。

```python
def OnModBlockEntityRemoveClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["posX"]: int，自定义方块实体的位置 X。
- args["posY"]: int，自定义方块实体的位置 Y。
- args["posZ"]: int，自定义方块实体的位置 Z。
- args["dimensionId"]: int，维度 id。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。

---

### ModBlockEntityTickClientEvent

<Client/>

客户端自定义方块实体 tick 事件。

```python
def OnModBlockEntityTickClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["posX"]: int，自定义方块实体的位置 X。
- args["posY"]: int，自定义方块实体的位置 Y。
- args["posZ"]: int，自定义方块实体的位置 Z。
- args["dimensionId"]: int，维度 id。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。

**备注**

- 只有 client_tick 字段为 true 的自定义方块实体才能触发该事件（见自定义方块实体。
- 目前客户端实体 tick 范围为硬编码，范围为玩家为中心的等腰等斜边八边形，其中斜边长度为 5，非斜边长度为 3。

---

### OnAfterFallOnBlockClientEvent

<Client/>

触发时机：当实体降落到方块后客户端触发，主要用于力的计算。

```python
def OnOnAfterFallOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["entityId"]: str，实体 id。
- args["posX"]: float，实体位置 x。
- args["posY"]: float，实体位置 y。
- args["posZ"]: float，实体位置 z。
- args["motionX"]: float，瞬时移动 X 方向的力。
- args["motionY"]: float，瞬时移动 Y 方向的力。
- args["motionZ"]: float，瞬时移动 Z 方向的力。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["calculate"]: bool，是否按脚本层传值计算力。

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件）。
- 如果要在脚本层修改 motion，回传的需要是浮点型，例如需要赋值 0.0 而不是 0。
- 如果需要修改实体的力，最好配合服务端事件同步修改，避免产生非预期现象。
- 因为引擎最后一定会按照原版方块规则计算力（普通方块置 0，床、粘液块等反弹），所以脚本层如果想直接修改当前力需要将 calculate 设为 true 取消原版计算，按照传回值计算。
- 引擎在落地之后 OnAfterFallOnBlockClientEvent 会一直触发，因此请在脚本层中做对应的逻辑判断。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnAfterFallOnBlockServerEvent

<Server/>

触发时机：当实体降落到方块后服务端触发，主要用于力的计算。

```python
def OnOnAfterFallOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["entityId"]: str，实体 id。
- args["posX"]: float，实体位置 x。
- args["posY"]: float，实体位置 y。
- args["posZ"]: float，实体位置 z。
- args["motionX"]: float，瞬时移动 X 方向的力。
- args["motionY"]: float，瞬时移动 Y 方向的力。
- args["motionZ"]: float，瞬时移动 Z 方向的力。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["calculate"]: bool，是否按脚本层传值计算力。

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件）。
- 如果要在脚本层修改 motion，回传的需要是浮点型，例如需要赋值 0.0 而不是 0。
- 如果需要修改实体的力，最好配合客户端事件同步修改，避免产生非预期现象。
- 因为引擎最后一定会按照原版方块规则计算力（普通方块置 0，床、粘液块等反弹），所以脚本层如果想直接修改当前力需要将 calculate 设为 true 取消原版计算，按照传回值计算。
- 引擎在落地之后，OnAfterFallOnBlockServerEvent 会一直触发，因此请在脚本层中做对应的逻辑判断。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnBeforeFallOnBlockServerEvent

<Server/>

触发时机：当实体刚降落到方块上时服务端触发，主要用于伤害计算。

```python
def OnOnBeforeFallOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["entityId"]: str，实体 id。
- args["blockX"]: int，方块位置 x。
- args["blockY"]: int，方块位置 y。
- args["blockZ"]: int，方块位置 z。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["fallDistance"]: float，实体下降距离，可在脚本层传给引擎。
- args["cancel"]: bool，是否取消引擎对实体下降伤害的计算。

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件）。
- 如果要在脚本层修改 fallDistance，回传的一定要是浮点型，例如需要赋值 0.0 而不是 0。
- 可能会因为轻微的反弹触发多次，可在脚本层针对 fallDistance 的值进行判断。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnEntityInsideBlockClientEvent

<Client/>

触发时机：当实体碰撞盒所在区域有方块时，客户端持续触发。

```python
def OnOnEntityInsideBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["entityId"]: str，实体 id。
- args["dimensionId"]: int，实体所在维度 id。
- args["slowdownMultiX"]: float，实体移速 X 方向的减速比例。
- args["slowdownMultiY"]: float，实体移速 Y 方向的减速比例。
- args["slowdownMultiZ"]: float，实体移速 Z 方向的减速比例。
- args["blockX"]: int，方块位置 x。
- args["blockY"]: int，方块位置 y。
- args["blockZ"]: int，方块位置 z。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["cancel"]: bool，可由脚本层回传 True 给引擎，阻止触发后续原版逻辑。

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnEntityInside 接口注册才能触发。
- 压力板和拌线钩不支持该事件，如需监听请参考 [OnEntityInsideBlockServerEvent](/docs/docs/scripts/modapi/events/block#onentityinsideblockserverevent) 事件。
- 如果需要修改 slowdownMulti/cancel，强烈建议与服务端事件同步修改，避免出现被服务端矫正等非预期现象。
- 如果要在脚本层修改 slowdownMulti，回传的一定要是浮点型，例如需要赋值 1.0 而不是 1。
- 有任意 slowdownMulti 参数被传回非 0 值时生效减速比例。
- slowdownMulti 参数更像是一个 Buff，例如并不是立刻计算，而是先保存在实体属性里延后计算、在已经有 slowdownMulti 属性的情况下会取最低的值、免疫掉落伤害等，与原版蜘蛛网逻辑基本一致。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Client/>

```python
def OnOnEntityInsideBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_entity_inside 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

```python
def OnOnEntityInsideBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["entityId"]: str，实体 id。
- args["slowdownMultiX"]: float，实体移速 X 方向的减速比例，可在脚本层被修改。
- args["slowdownMultiY"]: float，实体移速 Y 方向的减速比例，可在脚本层被修改。
- args["slowdownMultiZ"]: float，实体移速 Z 方向的减速比例，可在脚本层被修改。
- args["blockX"]: int，方块位置 x。
- args["blockY"]: int，方块位置 y。
- args["blockZ"]: int，方块位置 z。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["cancel"]: bool，可由脚本层回传 True 给引擎，阻止触发后续原版逻辑。

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnEntityInside 接口注册才能触发。
- 如果需要修改 slowdownMulti/cancel，强烈建议与客户端事件同步修改，避免出现客户端表现不一致等非预期现象。
- 如果要在脚本层修改 slowdownMulti，回传的一定要是浮点型，例如需要赋值 1.0 而不是 1。
- 有任意 slowdownMulti 参数被传回非 0 值时生效减速比例。
- slowdownMulti 参数更像是一个 Buff，例如并不是立刻计算，而是先保存在实体属性里延后计算、在已经有 slowdownMulti 属性的情况下会取最低的值、免疫掉落伤害等，与原版蜘蛛网逻辑基本一致。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Server/>

```python
def OnOnEntityInsideBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_entity_inside 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnEntityInsideBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

自定义方块实体绑定的特效创建成功事件，在自定义方块实体中绑定的特效创建成功时触发以及使用接口 [CreateFrameEffectForBlockEntity](/docs/docs/scripts/modapi/block/block_entity#createframeeffectforblockentity) 或 [CreateParticleEffectForBlockEntity](/docs/docs/scripts/modapi/block/block_entity#createparticleeffectforblockentity) 为自定义方块实体添加特效成功时触发。

```python
def OnOnModBlockNeteaseEffectCreatedClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["effectName"]: str，创建成功的特效的自定义键值名称。
- args["id"]: int，该特效的 id。
- args["effectType"]: int，该特效的类型，0 为粒子特效，1 为序列帧特效。
- args["blockPos"]: Tuple[float, float, float]，该特效绑定的自定义方块实体的世界坐标。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnStandOnBlockClientEvent

<Client/>

触发时机：当实体站立到方块上时客户端持续触发。

```python
def OnOnStandOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["entityId"]: str，实体 id。
- args["dimensionId"]: int，实体所在维度 id。
- args["posX"]: float，实体位置 x。
- args["posY"]: float，实体位置 y。
- args["posZ"]: float，实体位置 z。
- args["motionX"]: float，瞬时移动 X 方向的力。
- args["motionY"]: float，瞬时移动 Y 方向的力。
- args["motionZ"]: float，瞬时移动 Z 方向的力。
- args["blockX"]: int，方块位置 x。
- args["blockY"]: int，方块位置 y。
- args["blockZ"]: int，方块位置 z。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["cancel"]: bool，可由脚本层回传 True 给引擎，阻止触发后续原版逻辑。

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStandOn 接口注册才能触发。
- 如果要在脚本层修改 motion/cancel，强烈建议配合 [OnStandOnBlockServerEvent](/docs/docs/scripts/modapi/events/block#onstandonblockserverevent) 服务端事件同步修改，避免出现被服务端矫正等非预期现象。
- 如果要在脚本层修改 motion，回传的一定要是浮点型，例如需要赋值 0.0 而不是 0。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Client/>

```python
def OnOnStandOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_stand_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

```python
def OnOnStandOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["entityId"]: str，实体 id。
- args["dimensionId"]: int，实体所在维度 id。
- args["posX"]: float，实体位置 x。
- args["posY"]: float，实体位置 y。
- args["posZ"]: float，实体位置 z。
- args["motionX"]: float，瞬时移动 X 方向的力。
- args["motionY"]: float，瞬时移动 Y 方向的力。
- args["motionZ"]: float，瞬时移动 Z 方向的力。
- args["blockX"]: int，方块位置 x。
- args["blockY"]: int，方块位置 y。
- args["blockZ"]: int，方块位置 z。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["cancel"]: bool，可由脚本层回传 True 给引擎，阻止触发后续原版逻辑。

**备注**

- 不是所有方块都会触发该事件，需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStandOn 接口注册才能触发。
- 如果需要修改 motion/cancel，强烈建议配合客户端事件同步修改，避免出现客户端表现不一致等现象。
- 如果要在脚本层修改 motion，回传的一定要是浮点型，例如需要赋值 0.0 而不是 0。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Server/>

```python
def OnOnStandOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_stand_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnOnStandOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

```python
def OnPistonActionServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["cancel"]: bool，是否允许触发，默认为 False，若设为 True，可阻止触发后续的事件。
- args["action"]: str，推送时=expanding；缩回时=retracting。
- args["pistonFacing"]: int，活塞的朝向，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- args["pistonMoveFacing"]: int，活塞的运动方向，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- args["dimensionId"]: int，活塞方块所在的维度。
- args["pistonX"]: int，活塞方块的 x 坐标。
- args["pistonY"]: int，活塞方块的 y 坐标。
- args["pistonZ"]: int，活塞方块的 z 坐标。
- args["blockList"]: List[Tuple[int, int, int]]，活塞运动影响到产生被移动效果的方块坐标[x,y,z]，均为 int 类型。
- args["breakBlockList"]: List[Tuple[int, int, int]]，活塞运动影响到产生被破坏效果的方块坐标[x,y,z]，均为 int 类型。
- args["entityList"]: List[string]，活塞运动影响到产生被移动或被破坏效果的实体的 ID 列表。

---

### PlayerTryDestroyBlockClientEvent

<Client/>

当玩家即将破坏方块时，客户端线程触发该事件。主要用于床，旗帜，箱子这些根据方块实体数据进行渲染的方块，一般情况下请使用 [ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent)。

```python
def OnPlayerTryDestroyBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["face"]: int，方块被敲击的面向 id，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxData"]: int，方块附加值。
- args["playerId"]: str，试图破坏方块的玩家 ID。
- args["cancel"]: bool，默认为 False，在脚本层设置为 True 就能取消该方块的破坏。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ServerBlockEntityTickEvent

<Server/>

触发时机：自定义方块配置了 netease:block_entity 组件并设 tick 为 true，方块在玩家的模拟距离（新建存档时可以设置，默认为 4 个区块）内，或者在 tickingarea 内的时候触发。

```python
def OnServerBlockEntityTickEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，该方块名称。
- args["dimension"]: int，该方块所在的维度。
- args["posX"]: int，该方块的 x 坐标。
- args["posY"]: int，该方块的 y 坐标。
- args["posZ"]: int，该方块的 z 坐标。

**备注**

- 方块实体的 tick 事件频率为每秒钟 20 次。
- 触发本事件时，若正在退出游戏，将无法获取到抛出本事件的方块实体数据（[GetBlockEntityData](/docs/docs/scripts/modapi/block/block_entity#getblockentitydata) 函数返回 None），也无法对其进行操作。

---

### ServerBlockUseEvent

<Server/>

触发时机：玩家右键点击新版自定义方块（或者通过接口 AddBlockItemListenForUseEvent 增加监听的 MC 原生游戏方块）时服务端抛出该事件（该事件 tick 执行，需要注意效率问题）。

```python
def OnServerBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["playerId"]: str，玩家 Id。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["aux"]: int，方块附加值。
- args["cancel"]: bool，设置为 True 可拦截与方块交互的逻辑。
- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["clickX"]: float，点击点的 x 比例位置。
- args["clickY"]: float，点击点的 y 比例位置。
- args["clickZ"]: float，点击点的 z 比例位置。
- args["face"]: int，点击方块的面，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- args["itemDict"]: Dict[str, Any]，使用的物品的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- args["dimensionId"]: int，维度 id。

**备注**

- 客户端对应事件 [ClientBlockUseEvent](/docs/docs/scripts/modapi/events/block#clientblockuseevent) 如果开启拦截开关，则服务端也不会收到对应事件，即 ServerBlockUseEvent 不会触发。
- 当对原生方块进行使用时，如堆肥桶等类似有 使用 功能的方块使用物品时，会触发该事件，而 [ServerItemUseOnEvent](/docs/docs/scripts/modapi/events/item#serveritemuseonevent) 则不会被触发。对应的客户端事件同理。
- 部分工具对方块的使用效果，如锹犁地，不一定能通过该事件 cancel，还需同时使用 ItemUseOnServerEvent 进行取消 目前已知有：锹犁地相关的方块：草地、泥土、砂土、菌丝体、灰化土、缠根泥土，均需同时通过 ServerBlockUseEvent 和 ItemUseOnServerEvent 进行取消。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Server/>

```python
def OnServerBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

<Server/> BlockUseEventWhiteListComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockUseEventWhiteList(levelId)`

增加 blockName 方块对 ServerBlockUseEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnServerBlockUseEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块名称，格式：namespace:name:auxvalue，其中 namespace:name:*匹配所有的 auxvalue。

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

- args["blockName"]: str，方块名称，格式：namespace:name:auxvalue，其中 namespace:name:*匹配所有的 auxvalue。

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

```python
def OnServerEntityTryPlaceBlockEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["x"]: int，方块 x 坐标,支持修改。
- args["y"]: int，方块 y 坐标,支持修改。
- args["z"]: int，方块 z 坐标,支持修改。
- args["fullName"]: str，方块的 identifier，包含命名空间及名称,支持修改。
- args["auxData"]: int，方块附加值,支持修改。
- args["entityId"]: str，试图放置方块的生物 ID。
- args["dimensionId"]: int，维度 id。
- args["face"]: int，点击方块的面，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- args["cancel"]: bool，默认为 False，在脚本层设置为 True 就能取消该方块的放置。
- args["clickX"]: float，点击点的 x 比例位置。
- args["clickY"]: float，点击点的 y 比例位置。
- args["clickZ"]: float，点击点的 z 比例位置。

**备注**

- 部分放置后会产生实体的方块、可操作的方块、带有特殊逻辑的方块，不会触发该事件，包括但不限于床、门、告示牌、船、头部模型、盔甲架，半台阶方块叠加时等。
- 修改放置方块信息只对一般方块有效，对一些特殊方块无效，会导致放置取消，特殊方块包括：钟、蜡烛、管珊瑚扇、台阶、青蛙卵、脚手架、海泡菜、顶层雪、睡莲。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ServerPlaceBlockEntityEvent

<Server/>

触发时机：手动放置或通过接口创建含自定义方块实体的方块时触发，此时可向该方块实体中存放数据。

```python
def OnServerPlaceBlockEntityEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，该方块名称。
- args["dimension"]: int，该方块所在的维度。
- args["posX"]: int，该方块的 x 坐标。
- args["posY"]: int，该方块的 y 坐标。
- args["posZ"]: int，该方块的 z 坐标。

---

### ServerPlayerTryDestroyBlockEvent

<Server/>

当玩家即将破坏方块时，服务端线程触发该事件。

```python
def OnServerPlayerTryDestroyBlockEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["x"]: int，方块 x 坐标。
- args["y"]: int，方块 y 坐标。
- args["z"]: int，方块 z 坐标。
- args["face"]: int，方块被敲击的面向 id，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。
- args["fullName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxData"]: int，方块附加值。
- args["playerId"]: str，试图破坏方块的玩家 ID。
- args["dimensionId"]: int，维度 id。
- args["cancel"]: bool，默认为 False，在脚本层设置为 True 就能取消该方块的破坏。
- args["spawnResources"]: bool，是否生成掉落物，默认为 True，在脚本层设置为 False 就能取消生成掉落物。

**备注**

- 若需要禁止某些特殊方块的破坏，需要配合 [PlayerTryDestroyBlockClientEvent](/docs/docs/scripts/modapi/events/block#playertrydestroyblockclientevent) 一起使用，例如床，旗帜，箱子这些根据方块实体数据进行渲染的方块。
- 该服务端事件触发于玩家破坏方块时，当方块为秒破方块时（破坏方块所需时间为 0 或未设置破坏时间），本事件触发在 [StartDestroyBlockServerEvent](/docs/docs/scripts/modapi/events/block#startdestroyblockserverevent) 事件之前;当方块为非秒破方块时，本事件触发在 [StartDestroyBlockServerEvent](/docs/docs/scripts/modapi/events/block#startdestroyblockserverevent) 事件之后。
- 可通过 minecraft:destroy_time 方块组件来修改方块的破坏时间。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ShearsDestoryBlockBeforeClientEvent

<Client/>

触发时机：玩家手持剪刀破坏方块时，有剪刀特殊效果的方块会在客户端线程触发该事件。

```python
def OnShearsDestoryBlockBeforeClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockX"]: int，方块位置 x。
- args["blockY"]: int，方块位置 y。
- args["blockZ"]: int，方块位置 z。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxData"]: int，方块附加值。
- args["dropName"]: str，触发剪刀效果的掉落物 identifier，包含命名空间及名称。
- args["dropCount"]: int，触发剪刀效果的掉落物数量。
- args["playerId"]: str，触发剪刀效果的玩家 id。
- args["dimensionId"]: int，玩家触发时的维度 id。
- args["cancelShears"]: bool，是否取消剪刀效果。

**备注**

- 目前仅绊线会触发，需要取消剪刀效果得配合 [ShearsDestoryBlockBeforeServerEvent](/docs/docs/scripts/modapi/events/block#shearsdestoryblockbeforeserverevent) 同时使用。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ShearsDestoryBlockBeforeServerEvent

<Server/>

触发时机：玩家手持剪刀破坏方块时，有剪刀特殊效果的方块会在服务端线程触发该事件。

```python
def OnShearsDestoryBlockBeforeServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockX"]: int，方块位置 x。
- args["blockY"]: int，方块位置 y。
- args["blockZ"]: int，方块位置 z。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxData"]: int，方块附加值。
- args["dropName"]: str，触发剪刀效果的掉落物 identifier，包含命名空间及名称。
- args["dropCount"]: int，触发剪刀效果的掉落物数量。
- args["playerId"]: str，触发剪刀效果的玩家 id。
- args["dimensionId"]: int，玩家触发时的维度 id。
- args["cancelShears"]: bool，是否取消剪刀效果。

**备注**

- 该事件触发在 [ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 之后，如果在 [ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 事件中设置了取消 Destory 或取消掉落物会导致该事件不触发。
- 取消剪刀效果后不掉落任何东西的方块类型：蜘蛛网、枯萎的灌木、草丛、下界苗、树叶、海草、藤蔓。
- 绊线取消剪刀效果需要配合 [ShearsDestoryBlockBeforeClientEvent](/docs/docs/scripts/modapi/events/block#shearsdestoryblockbeforeclientevent) 同时使用，否则在表现上可能展现出来的还是剪刀剪断后的效果。绊线取消剪刀效果后依然会掉落成线。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### StartDestroyBlockClientEvent

<Client/>

玩家开始挖方块时触发。创造模式下不触发。

```python
def OnStartDestroyBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["pos"]: Tuple[float, float, float]，方块的坐标。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxValue"]: int，方块的附加值。
- args["playerId"]: str，玩家 id。
- args["cancel"]: bool，修改为 True 时，可阻止玩家进入挖方块的状态。需要与 [StartDestroyBlockServerEvent](/docs/docs/scripts/modapi/events/block#startdestroyblockserverevent) 一起修改。
- args["face"]: int，方块被敲击面,参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。

**备注**

- 如果是隔着火焰挖方块，即使将该事件 cancel 掉，火焰也会被扑灭。如果要阻止火焰扑灭，需要配合 [ExtinguishFireClientEvent](/docs/docs/scripts/modapi/events/player#extinguishfireclientevent) 使用。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### StartDestroyBlockServerEvent

<Server/>

玩家开始挖方块时触发。创造模式下不触发。

```python
def OnStartDestroyBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["pos"]: Tuple[float, float, float]，方块的坐标。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["auxValue"]: int，方块的附加值。
- args["playerId"]: str，玩家 id。
- args["dimensionId"]: int，维度 id。
- args["cancel"]: bool，修改为 True 时，可阻止玩家进入挖方块的状态。需要与 [StartDestroyBlockClientEvent](/docs/docs/scripts/modapi/events/block#startdestroyblockclientevent) 一起修改。
- args["face"]: int，方块被敲击面,参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)。

**备注**

- 如果是隔着火焰挖方块，即使将该事件 cancel 掉，火焰也会被扑灭。如果要阻止火焰扑灭，需要配合 [ExtinguishFireServerEvent](/docs/docs/scripts/modapi/events/player#extinguishfireserverevent) 使用。
- 该服务端事件触发于服务端收到玩家破坏操作时，当方块为秒破方块时（破坏方块所需时间为 0 或未设置破坏时间），[ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 事件触发在本事件之前;当方块为非秒破方块时，[ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 事件触发在本事件之后。
- 秒破方块在本事件触发前已经被服务端删除，此时本事件获取到的 blockName 为 minecraft:air，且无法通过本事件进行取消操作,以下是两个解决方法：（1）用 [ServerPlayerTryDestroyBlockEvent](/docs/docs/scripts/modapi/events/block#serverplayertrydestroyblockevent) 获取到正确的方块信息或取消操作。（2）通过 minecraft:destroy_time 方块组件来修改方块的破坏时间。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### StepOffBlockClientEvent

<Client/>

触发时机：实体移动离开一个实心方块时触发。

```python
def OnStepOffBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockX"]: int，方块 x 坐标。
- args["blockY"]: int，方块 y 坐标。
- args["blockZ"]: int，方块 z 坐标。
- args["entityId"]: str，触发的 entity 的唯一 ID。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["dimensionId"]: int，维度 id。

**备注**

- 不是所有方块都会触发该事件，自定义方块需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStepOff 接口注册才能触发。
- 压力板与绊线钩这种非实心方块不会触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Client/>

```python
def OnStepOffBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_step_off 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

```python
def OnStepOffBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockX"]: int，方块 x 坐标。
- args["blockY"]: int，方块 y 坐标。
- args["blockZ"]: int，方块 z 坐标。
- args["entityId"]: str，触发的 entity 的唯一 ID。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["dimensionId"]: int，维度 id。

**备注**

- 不是所有方块都会触发该事件，自定义方块需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStepOff 接口注册才能触发。
- 压力板与绊线钩这种非实心方块不会触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Server/>

```python
def OnStepOffBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_step_off 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOffBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

```python
def OnStepOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["cancel"]: bool，是否允许触发，默认为 False，若设为 True，可阻止触发后续原版逻辑。
- args["blockX"]: int，方块 x 坐标。
- args["blockY"]: int，方块 y 坐标。
- args["blockZ"]: int，方块 z 坐标。
- args["entityId"]: str，触发的 entity 的唯一 ID。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["dimensionId"]: int，维度 id。

**备注**

- 在合并微软更新之后，本事件触发时机与微软 molang 实验性玩法组件"minecraft:on_step_on"一致。
- 版本更新后，不再支持压力板和拌线钩这两种非实心方块触发此事件，如需监听请参考 [OnEntityInsideBlockServerEvent](/docs/docs/scripts/modapi/events/block#onentityinsideblockserverevent) 事件。
- 不是所有方块都会触发该事件，自定义方块需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStepOn 接口注册才能触发。原版的红石矿默认注册了，但深层红石矿没有默认注册。
- 如果需要修改 cancel，强烈建议配合服务端事件同步修改，避免出现被服务端矫正等非预期现象。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Client/>

```python
def OnStepOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_step_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockClientEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

```python
def OnStepOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["cancel"]: bool，是否允许触发，默认为 False，若设为 True，可阻止触发后续物理交互事件。
- args["blockX"]: int，方块 x 坐标。
- args["blockY"]: int，方块 y 坐标。
- args["blockZ"]: int，方块 z 坐标。
- args["entityId"]: str，触发的 entity 的唯一 ID。
- args["blockName"]: str，方块的 identifier，包含命名空间及名称。
- args["dimensionId"]: int，维度 id。

**备注**

- 在合并微软更新之后，本事件触发时机与微软 molang 实验性玩法组件"minecraft:on_step_on"一致。
- 压力板与绊线钩在过去的版本的事件是可以触发的，但在更新后这种非实心方块并不会触发，有需要的可以使用 [OnEntityInsideBlockServerEvent](/docs/docs/scripts/modapi/events/block#onentityinsideblockserverevent) 事件。
- 不是所有方块都会触发该事件，自定义方块需要在 json 中先配置触发开关（详情参考：自定义方块 JSON 组件），原版方块需要先通过 RegisterOnStepOn 接口注册才能触发。原版的红石矿默认注册了，但深层红石矿没有默认注册。
- 如果需要修改 cancel，强烈建议配合客户端事件同步修改，避免出现客户端表现不一致等非预期现象。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

<Server/>

```python
def OnStepOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

可以动态注册与修改 netease:on_step_on 组件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
def OnStepOnBlockServerEvent(self, args: Dict[str, Any]) -> None: ...
```

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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

- args["blockName"]: str，方块标识符，包含命名空间，如 minecraft:grass。

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
