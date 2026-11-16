---
sidebar_position: 1
---

# 世界

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录世界相关的事件，共 44 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/shijie.html"/>

---

### AchievementCompleteEvent

<Server/>

玩家完成自定义成就时触发该事件。

```python
AchievementCompleteEvent(
    playerId: str,
    rootNodeId: str,
    achievementId: str,
    title: str,
    description: str,
) -> Any
```

- playerId: str，玩家 id。
- rootNodeId: str，所属的页面的根节点成就 id。
- achievementId: str，达成的成就 id。
- title: str，成就标题。
- description: str，成就描述。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AddEntityClientEvent

<Client/>

客户端侧创建新实体时触发。

```python
AddEntityClientEvent(
    id: str,
    posX: float,
    posY: float,
    posZ: float,
    dimensionId: int,
    isBaby: bool,
    engineTypeStr: str,
    itemName: str,
    auxValue: int,
) -> Any
```

- id: str，实体 id。
- posX: float，位置 x。
- posY: float，位置 y。
- posZ: float，位置 z。
- dimensionId: int，实体维度。
- isBaby: bool，是否为幼儿。
- engineTypeStr: str，实体类型。
- itemName: str，物品 identifier（仅当物品实体时存在该字段）。
- auxValue: int，物品附加值（仅当物品实体时存在该字段）。

**备注**

- 创建玩家时不会触发该事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AddEntityServerEvent

<Server/>

服务端侧创建新实体，或实体从存档加载时触发。

```python
AddEntityServerEvent(
    id: str,
    posX: float,
    posY: float,
    posZ: float,
    dimensionId: int,
    isBaby: bool,
    engineTypeStr: str,
    itemName: str,
    auxValue: int,
) -> Any
```

- id: str，实体 id。
- posX: float，位置 x。
- posY: float，位置 y。
- posZ: float，位置 z。
- dimensionId: int，实体维度。
- isBaby: bool，是否为幼儿。
- engineTypeStr: str，实体类型，即实体 identifier。
- itemName: str，物品 identifier（仅当物品实体时存在该字段）。
- auxValue: int，物品附加值（仅当物品实体时存在该字段）。

**备注**

- 创建玩家时不会触发该事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AddPlayerAOIClientEvent

<Client/>

玩家加入游戏时视野内存在其他玩家，或者其余玩家进入当前玩家视野时触发的事件，替换 AddPlayerEvent。

```python
AddPlayerAOIClientEvent(playerId: str) -> Any
```

- playerId: str，玩家 id。

**备注**

- 该事件触发只表明在服务端数据中接收到了新玩家，并不能代表此时玩家在客户端中可见，若想在玩家进入视野后立马调用玩家渲染相关接口，建议使用 [AddPlayerCreatedClientEvent](/docs/docs/scripts/modapi/events/world#addplayercreatedclientevent)。
- 玩家加入游戏时视野内每存在一位其他玩家便触发一次该事件，若无其他玩家，则不触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AddPlayerCreatedClientEvent

<Client/>

玩家进入当前玩家所在的区块 AOI 后，玩家皮肤数据异步加载完成后触发的事件。

```python
AddPlayerCreatedClientEvent(playerId: str) -> Any
```

- playerId: str，玩家 id。

**备注**

- 由于玩家皮肤是异步加载的原因，该事件触发时机比 [AddPlayerAOIClientEvent](/docs/docs/scripts/modapi/events/world#addplayeraoiclientevent) 晚，触发该事件后可以对该玩家调用相关玩家渲染接口。
- 当前客户端每加载好一个玩家的皮肤，就会触发一次该事件，比如刚进入世界时，localPlayer 加载好会触发一次，周围的所有玩家加载好后也会分别触发一次。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### AddServerPlayerEvent

<Server/>

触发时机：玩家加入时触发该事件。

```python
AddServerPlayerEvent(
    id: str,
    isTransfer: bool,
    isReconnect: bool,
    isPeUser: bool,
    transferParam: str,
    uid: Union[int, int],
    proxyId: int,
) -> Any
```

- id: str，玩家 id。
- isTransfer: bool，是否是切服时进入服务器，仅用于 Apollo。如果是 True，则表示切服时加入服务器，若是 False，则表示登录进入网络游戏。
- isReconnect: bool，是否是断线重连，仅用于 Apollo。如果是 True，则表示本次登录是断线重连，若是 False，则表示本次是正常登录或者转服。
- isPeUser: bool，是否从手机端登录，仅用于 Apollo。如果是 True，则表示本次登录是从手机端登录，若是 False，则表示本次登录是从 PC 端登录。
- transferParam: str，切服传入参数，仅用于 Apollo。调用【TransferToOtherServer】或【TransferToOtherServerById】传入的切服参数。
- uid: Union[int, int]，仅用于 Apollo，玩家的 netease uid，玩家的唯一标识。
- proxyId: int，仅用于 Apollo，当前客户端连接的 proxy 服务器 id。

**备注**

- 触发此事件时，客户端 mod 未加载完毕，因此响应本事件时不能客户端发送事件。若需要在玩家进入世界时，服务器往客户端发送事件，请使用 [ClientLoadAddonsFinishServerEvent](/docs/docs/scripts/modapi/events/world#clientloadaddonsfinishserverevent)。
- 触发此事件时，玩家的实体还未加载完毕，请勿在这时切换维度。请在客户端监听 [OnLocalPlayerStopLoading](/docs/docs/scripts/modapi/events/world#onlocalplayerstoploading) 事件并发送事件到 server 端再进行维度切换。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ChunkAcquireDiscardedClientEvent

<Client/>

触发时机：客户端区块即将被卸载时。

```python
ChunkAcquireDiscardedClientEvent(dimension: int, chunkPosX: int, chunkPosZ: int) -> Any
```

- dimension: int，区块所在维度。
- chunkPosX: int，区块的 x 坐标，对应方块 X 坐标区间为[x * 16, x * 16 + 15]。
- chunkPosZ: int，区块的 z 坐标，对应方块 Z 坐标区间为[z * 16, z * 16 + 15]。

**备注**

- 区块卸载：游戏只会加载玩家周围的区块，玩家移动到别的区域时，原来所在区域的区块会被卸载，参考区块介绍。

---

### ChunkAcquireDiscardedServerEvent

<Server/>

服务端区块即将被卸载时触发。

```python
ChunkAcquireDiscardedServerEvent(
    dimension: int,
    chunkPosX: int,
    chunkPosZ: int,
    entities: List[str],
    blockEntities: List[Dict[str, Any]],
) -> Any
```

- dimension: int，区块所在维度。
- chunkPosX: int，区块的 x 坐标，对应方块 X 坐标区间为[x * 16, x * 16 + 15]。
- chunkPosZ: int，区块的 z 坐标，对应方块 Z 坐标区间为[z * 16, z * 16 + 15]。
- entities: List[str]，随区块卸载而从世界移除的实体 id 的列表。注意事件触发时已经无法获取到这些实体的信息，仅供脚本资源回收用。
- blockEntities: List[Dict[str, Any]]，随区块卸载而从世界移除的自定义方块实体的坐标的列表，列表元素 dict 包含 posX，posY，posZ 三个 int 表示自定义方块实体的坐标，blockName 表示方块的 identifier，包含命名空间及名称。注意事件触发时已经无法获取到这些方块实体的信息，仅供脚本资源回收用。

**备注**

- 区块卸载：游戏只会加载玩家周围的区块，玩家移动到别的区域时，原来所在区域的区块会被卸载，参考区块介绍。

---

### ChunkGeneratedServerEvent

<Server/>

触发时机：区块创建完成时触发。

```python
ChunkGeneratedServerEvent(
    dimension: int,
    chunkPosX: int,
    chunkPosZ: int,
    blockEntityData: Optional[[\{"blockName":str,"posX":int,"posY":int,"posZ":int\}...]],
) -> Any
```

- dimension: int，该区块所在的维度。
- chunkPosX: int，区块的 x 坐标，对应方块 X 坐标区间为[x * 16, x * 16 + 15]。
- chunkPosZ: int，区块的 z 坐标，对应方块 Z 坐标区间为[z * 16, z * 16 + 15]。
- blockEntityData: Optional[[\{"blockName":str,"posX":int,"posY":int,"posZ":int\}...]]，该区块中的自定义方块实体列表，通常是由自定义特征生成的自定义方块，没有自定义方块实体时该值为 None。

---

### ChunkLoadedClientEvent

<Client/>

触发时机：客户端区块加载完成时。

```python
ChunkLoadedClientEvent(dimension: int, chunkPosX: int, chunkPosZ: int) -> Any
```

- dimension: int，区块所在维度。
- chunkPosX: int，区块的 x 坐标，对应方块 X 坐标区间为[x * 16, x * 16 + 15]。
- chunkPosZ: int，区块的 z 坐标，对应方块 Z 坐标区间为[z * 16, z * 16 + 15]。

---

### ChunkLoadedServerEvent

<Server/>

触发时机：服务端区块加载完成时。

```python
ChunkLoadedServerEvent(
    dimension: int,
    chunkPosX: int,
    chunkPosZ: int,
    blockEntities: List[Dict[str, Any]],
) -> Any
```

- dimension: int，区块所在维度。
- chunkPosX: int，区块的 x 坐标，对应方块 X 坐标区间为[x * 16, x * 16 + 15]。
- chunkPosZ: int，区块的 z 坐标，对应方块 Z 坐标区间为[z * 16, z * 16 + 15]。
- blockEntities: List[Dict[str, Any]]，随区块加载而加载进世界的自定义方块实体的坐标的列表，列表元素 dict 包含 posX，posY，posZ 三个 int 表示自定义方块实体的坐标，blockName 表示方块的 identifier，包含命名空间及名称。

**备注**

- 注意：服务端的自定义方块实体加载完成时对应的客户端的自定义方块实体并没有初始化完成，无法使用该事件对客户端的自定义方块实体进行相关操作。

---

### ClientLoadAddonsFinishServerEvent

<Server/>

触发时机：客户端 mod 加载完成时，服务端触发此事件。服务器可以使用此事件，往客户端发送数据给其初始化。

```python
ClientLoadAddonsFinishServerEvent(playerId: str) -> Any
```

- playerId: str，玩家 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### CommandEvent

<Server/>

玩家请求执行指令时触发。

```python
CommandEvent(entityId: str, command: str, cancel: bool) -> Any
```

- entityId: str，玩家 ID。
- command: str，指令字符串。
- cancel: bool，是否取消。

**备注**

- 该事件是玩家请求执行指令时触发的 Hook，该事件不响应命令方块的指令和通过 modSDK 调用的指令，阻止玩家的该条指令只需要将 cancel 设置为 True。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### CustomCommandTriggerServerEvent

<Server/>

自定义命令触发事件。

```python
CustomCommandTriggerServerEvent(
    command: str,
    args: List[Dict[str, Any]],
    variant: int,
    origin: Dict[str, Any],
    return_failed: bool = False,
    return_msg_key: str,
) -> Any
```

- command: str，自定义命令名称，对应 json 中的 name 字段。
- args: List[Dict[str, Any]]，自定义命令参数，详情见下方。
- variant: int，表示是哪条变体，范围[0, 9]，对应 json 中 args 键中的数字，未配置变体则为 0。
- origin: Dict[str, Any]，触发源的信息，详情见下方。
- return_failed: bool，设置自定义命令是否执行失败，默认为 False，如果执行失败，返回信息以红色字体显示。
- return_msg_key: str，设置返回给玩家或命令方块的信息，也支持通过语言文件(.lang)定义，默认值为 commands.custom.success(自定义命令执行成功)。

**备注**

- origin 参数说明如下。

| 键 | 类型 | 解释 |
| --- | --- | --- |
| entityId | str | 触发指令的实体 id，**若由命令方块触发，则不会含有此字段** |
| dimension | int | 指令触发的维度 id，0-主世界; 1-下界; 2-末地; 或其他自定义维度 |
| blockPos | tuple | 触发指令的实体或命令方块的整数坐标 |

- 自定义命令参数中的 dict 说明如下。

| 键 | 类型 | 解释 |
| --- | --- | --- |
| name | str | 参数名称，对应 json 中的 name 字段 |
| type | str | 参数类型，对应 json 中的 type 字段 |
| value | any | 参数的值，若玩家没传，则采用 json 中填写的 default 的值，但会转为 python 变量格式。如 null 转为 None，array 转为 tuple |

- 对于玩家传入的参数，type 不同则对应的 value 也不同，type 对应 value 的类型和具体数据格式如下。

| type | value 类型 | 解释 |
| --- | --- | --- |
| int | int | 整数，如 114 |
| float | float | 浮点数，如 5.14 |
| bool | bool | 布尔值，如 True |
| str | str | 字符串，如'niganma' |
| enum | str | 开发者在 json 中指定的某个字符串 |
| enum_short | str | 开发者在 json 中指定的某个字符串 |
| block | str | 方块的 identifier，如'minecraft:grass' |
| item | dict | 含有物品名称，如 |
| pos | tuple | 含有三个 float 的坐标，如(-0.93, 81.25, -5.67) |
| target | tuple | 含有对应的所有目标 entityId，如('-139816907912', '-263852559602') |
| entity | dict | 含有实体名称，如 |
| effect | dict | 含有状态效果名称和对应的[EffectType](https://mc.163.com/newdev/docs/api/meijuzhi/EffectType.html)枚举，如 |
| dimension | dict | 含有维度名称和对应数字 id，如 |
| biome | dict | 含有生物群系名称和对应的[BiomeType](https://mc.163.com/newdev/docs/api/meijuzhi/BiomeType.html)枚举，如 |
| structure | dict | 含有结构名称和对应的[StructureFeatureType](https://mc.163.com/newdev/docs/api/meijuzhi/StructureFeatureType.html)枚举，如 |
| enchant | dict | 含有附魔名称和对应的[EnchantType](https://mc.163.com/newdev/docs/api/meijuzhi/EnchantType.html)枚举，如 |

---

### DelServerPlayerEvent

<Server/>

触发时机：删除玩家时触发该事件。

```python
DelServerPlayerEvent(id: str, isTransfer: bool, uid: Union[int, int]) -> Any
```

- id: str，玩家 id。
- isTransfer: bool，是否是切服时退出服务器，仅用于 Apollo。如果是 True，则表示切服时退出服务器；若是 False，则表示退出网络游戏。
- uid: Union[int, int]，玩家的 netease uid，玩家的唯一标识。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### EntityRemoveEvent

<Server/>

实体被删除时触发。

```python
EntityRemoveEvent(id: str) -> Any
```

- id: str，实体 id。

**备注**

- 触发情景：实体从场景中被删除，例如：生物死亡，生物被清除，玩家退出游戏，船/盔甲架被破坏，掉落物/经验球被捡起或清除。
- 当生物随区块卸载时，不会触发该事件，而是 [ChunkAcquireDiscardedServerEvent](/docs/docs/scripts/modapi/events/world#chunkacquirediscardedserverevent) 事件。
- 关于生物的清除：当生物离玩家大于 wiki 所说的距离，并且还在玩家的模拟距离内时，会被清除。也就是说，如果玩家瞬间传送到远处，原处的生物马上离开了模拟距离，并不会被清除。
- 玩家退出游戏时，EntityRemoveEvent，[DelServerPlayerEvent](/docs/docs/scripts/modapi/events/world#delserverplayerevent) 按顺序依次触发。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ExplosionServerEvent

<Server/>

当发生爆炸时触发。

```python
ExplosionServerEvent(
    blocks: List[[x,y,z,cancel]],
    victims: Optional[List[Any]],
    sourceId: Optional[str],
    explodePos: List[Any],
    dimensionId: int,
) -> Any
```

- blocks: List[[x,y,z,cancel]]，爆炸导致的被破坏方块坐标(x,y,z)，cancel 是一个 bool 值。
- victims: Optional[List[Any]]，受伤实体 id 列表，当该爆炸创建者 id 为 None 时，victims 也为 None。
- sourceId: Optional[str]，爆炸创建者 id。
- explodePos: List[Any]，爆炸位置[x,y,z]。
- dimensionId: int，维度 id。

**备注**

- 通过设置 blocks 中 cancel 的 bool 值为 True 可以将该方块的爆炸取消，例如(x,y,z,True)。
- 某些情况下爆炸创建者 id 为 None，此时受伤实体 id 列表也为 None，比如爬行者所造成的爆炸。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### GameRenderTickEvent

<Client/>

客户端渲染帧开始时触发该事件,一秒触发次数为当前的帧数。

```python
GameRenderTickEvent() -> Any
```

---

### GlobalCommandServerEvent

<Server/>

服务端全局命令事件，包括聊天栏发送、[SetCommand](/docs/docs/scripts/modapi/world/command#setcommand) 接口、命令方块（矿车）、行为包动画执行命令。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GlobalCommandServerEvent(
    entityId: str,
    command: str,
    blockPos: Tuple[int, int, int],
    dimension: int,
    cancel: bool,
) -> Any
```

- entityId: str，执行命令的实体 id, 如果没有此键，则是命令方块执行的命令。
- command: str，将要被执行的命令。
- blockPos: Tuple[int, int, int]，执行命令的实体或方块的方块坐标。
- dimension: int，执行命令的实体或方块所在维度 id。
- cancel: bool，设置为 True 可以取消命令执行。

**备注**

- 有实体的事件参数例子：

```python
{
    'cancel' : False,
    'entityId' : '-8589934591',
    'command' : '/kill @e',
    'dimension' : 0,
    'blockPos' : (227,66,569)
}
```

- 命令方块(无实体)的事件参数例子：

```python
{
    'cancel' : False,
    'command' : '/say I am a command_block',
    'dimension' : 0,
    'blockPos' : (226,64,579)
}
```


在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
{
    'cancel' : False,
    'entityId' : '-8589934591',
    'command' : '/kill @e',
    'dimension' : 0,
    'blockPos' : (227,66,569)
}
```

</TabItem>
</Tabs>

---

### LoadClientAddonScriptsAfter

<Client/>

客户端加载 mod 完成事件。

```python
LoadClientAddonScriptsAfter() -> Any
```

---

### LoadServerAddonScriptsAfter

<Server/>

服务器加载完 mod 时触发。

```python
LoadServerAddonScriptsAfter() -> Any
```

---

### NewOnEntityAreaEvent

<Server/>

触发时机：通过 RegisterEntityAOIEvent 注册过 AOI 事件后，当有实体进入或离开注册感应区域时触发该事件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
NewOnEntityAreaEvent(name: str, enteredEntities: List[str], leftEntities: List[str]) -> Any
```

- name: str，注册感应区域名称。
- enteredEntities: List[str]，进入该感应区域的实体 id 列表。
- leftEntities: List[str]，离开该感应区域的实体 id 列表。

**备注**

- 本事件代替原有的 OnEntityAreaEvent 事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
# ServerSystem
import mod.server.extraServerApi as serverApi
self.ListenForEvent(serverApi.GetEngineNamespace(),
                    serverApi.GetEngineSystemName(),
                    "NewOnEntityAreaEvent",
                    self, self.NewOnEntityAreaEvent)
def NewOnEntityAreaEvent(self, args):
    name = args['name']
```

</TabItem>
</Tabs>

<Server/>

```python
NewOnEntityAreaEvent() -> Any
```

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

注册感应区域，有实体进入时和离开时会有消息通知。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
NewOnEntityAreaEvent(
    dimension: int,
    name: str,
    aabb: Tuple[float, float, float, float, float, float],
    ignoredEntities: List[str],
    entityType: int,
) -> bool
```

- dimension: int，维度 id。
- name: str，注册的感应区域名。
- aabb: Tuple[float, float, float, float, float, float]，感应区域的坐标范围，依次为 minX, minY, minZ, maxX, maxY, maxZ。
- ignoredEntities: List[str]，忽略的实体 id 列表。
- entityType: int，期望响应的实体类型，不传则响应所有的实体类型[EntityType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/EntityType.html)。

**返回值**：bool，是否注册成功。

**备注**

- 注册完感应区域后，需通过监听 OnEntityAreaEvent 或 NewOnEntityAreaEvent 事件来获取感应事件。
- 不支持长或宽大于 2000 格的区域。对于大范围区域，建议在脚本中每隔一段时间获取实体坐标判断来实现。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.RegisterEntityAOIEvent(0, "test", (0, 0, 0, 1, 1, 1), None)
```

</TabItem>
</Tabs>

<Server/> DimensionCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateDimension(levelId)`

反注册感应区域。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
NewOnEntityAreaEvent(dimension: int, name: str) -> bool
```

- dimension: int，维度 id。
- name: str，需要反注册的感应区域名。

**返回值**：bool，是否注册成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateDimension(levelId)
comp.UnRegisterEntityAOIEvent(0, "test")
```

</TabItem>
</Tabs>

---

### OnCommandOutputClientEvent

<Client/>

当 command 命令有成功消息输出时触发。

```python
OnCommandOutputClientEvent(command: str, message: str) -> Any
```

- command: str，命令名称。
- message: str，命令返回的消息。

**备注**

- 部分命令在返回的时候没有命令名称，[SetCommand](/docs/docs/scripts/modapi/world/command#setcommand) 接口需要 showOutput 参数为 True 时才会有返回。

---

### OnCommandOutputServerEvent

<Server/>

Command 命令执行成功事件。

```python
OnCommandOutputServerEvent(command: str, message: str) -> Any
```

- command: str，命令名称。
- message: str，命令返回的消息。

**备注**

- 部分命令在返回的时候没有命令名称，[SetCommand](/docs/docs/scripts/modapi/world/command#setcommand) 接口需要 showOutput 参数为 True 时才会有返回。

---

### OnContainerFillLoottableServerEvent

<Server/>

触发时机：随机奖励箱第一次打开根据 loottable 生成物品时。

```python
OnContainerFillLoottableServerEvent(
    loottable: str,
    playerId: str,
    itemList: List[Any],
    dirty: bool = False,
) -> Any
```

- loottable: str，奖励箱子所读取的 loottable 的 json 路径。
- playerId: str，打开奖励箱子的玩家的 playerId。
- itemList: List[Any]，掉落物品列表，每个元素为一个 itemDict，格式可参考[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- dirty: bool，默认为 False，如果需要修改掉落列表需将该值设为 True。

**备注**

- 只有当 dirty 为 True 时才会重新读取 item 列表并生成对应的掉落物，如果不需要修改掉落结果的话请勿随意修改 dirty 值。
- 可疑的沙子也具有奖励箱性质，使用刷子刷可疑的沙子也会触发该事件。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnLightningLevelChangeServerEvent

<Server/>

打雷强度发生改变。

```python
OnLightningLevelChangeServerEvent(oldLevel: float, newLevel: float) -> Any
```

- oldLevel: float，改变前的打雷强度。
- newLevel: float，改变后的打雷强度。

---

### OnLocalLightningLevelChangeServerEvent

<Server/>

独立维度天气打雷强度发生改变时触发。

```python
OnLocalLightningLevelChangeServerEvent(oldLevel: float, newLevel: float, dimensionId: int) -> Any
```

- oldLevel: float，改变前的打雷强度。
- newLevel: float，改变后的打雷强度。
- dimensionId: int，独立天气维度 id。

---

### OnLocalPlayerStopLoading

<Client/>

触发时机：玩家进入存档，出生点地形加载完成时触发。该事件触发时可以进行切换维度的操作。

```python
OnLocalPlayerStopLoading(playerId: str) -> Any
```

- playerId: str，加载完成的玩家 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### OnLocalRainLevelChangeServerEvent

<Server/>

独立维度天气下雨强度发生改变时触发。

```python
OnLocalRainLevelChangeServerEvent(oldLevel: float, newLevel: float, dimensionId: int) -> Any
```

- oldLevel: float，改变前的下雨强度。
- newLevel: float，改变后的下雨强度。
- dimensionId: int，独立天气维度 id。

---

### OnRainLevelChangeServerEvent

<Server/>

下雨强度发生改变。

```python
OnRainLevelChangeServerEvent(oldLevel: float, newLevel: float) -> Any
```

- oldLevel: float，改变前的下雨强度。
- newLevel: float，改变后的下雨强度。

---

### OnScriptTickClient

<Client/>

客户端 tick 事件,1 秒 30 次。

```python
OnScriptTickClient() -> Any
```

---

### OnScriptTickServer

<Server/>

服务器 tick 时触发,1 秒有 30 个 tick。

```python
OnScriptTickServer() -> Any
```

---

### PlaceNeteaseLargeFeatureServerEvent

<Server/>

触发时机：网易版大型结构即将生成时服务端抛出该事件。

```python
PlaceNeteaseLargeFeatureServerEvent(
    dimensionId: int,
    pos: Tuple,
    rot: int,
    depth: int,
    centerPool: str,
    ignoreFitInContext: bool,
    cancel: bool,
) -> Any
```

- dimensionId: int，维度 id。
- pos: Tuple，中心结构放置坐标(x, z)。
- rot: int，中心结构顺时针旋转角度。
- depth: int，大型结构递归深度。
- centerPool: str，中心池的 identifier。
- ignoreFitInContext: bool，是否允许生成过结构的地方是否可以继续生成结构。
- cancel: bool，设置为 True 时可阻止该大型结构的放置。

**备注**

- 1.使用 [PlaceNeteaseLargeFeature](/docs/docs/scripts/modapi/world/map#placeneteaselargefeature) 接口触发此事件时，可正常调用其他 Mod SDK 接口 2.使用自定义大型特征功能，配置 Json 的方式触发此事件时，调用其他 Mod SDK 接口将无法生效，强烈建议仅用于设置结构放置与否。

---

### PlaceNeteaseStructureFeatureEvent

<Server/>

触发时机：首次生成地形时，结构特征即将生成时服务端抛出该事件。

```python
PlaceNeteaseStructureFeatureEvent(
    structureName: str,
    x: int,
    y: int,
    z: int,
    biomeType: int,
    biomeName: str,
    dimensionId: int,
    cancel: bool,
) -> Any
```

- structureName: str，结构名称，可修改。
- x: int，结构坐标最小方块所在的 x 坐标。
- y: int，结构坐标最小方块所在的 y 坐标。
- z: int，结构坐标最小方块所在的 z 坐标。
- biomeType: int，该 feature 所放置区块的生物群系类型。
- biomeName: str，该 feature 所放置区块的生物群系名称。
- dimensionId: int，维度 id。
- cancel: bool，设置为 True 时可阻止该结构的放置。

**备注**

- 需要配合 AddNeteaseFeatureWhiteList 接口一同使用 若在本监听事件中调用其他 mod SDK 接口将无法生效，强烈建议本事件仅用于设置结构放置与否 该事件只会在网易版结构放置时抛出 structureName 参数修改为不存在结构或者原生结构时，开发包会出现断言。

<Server/>

```python
PlaceNeteaseStructureFeatureEvent() -> Any
```

<Server/> FeatureCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateFeature(levelId)`

添加结构对 PlaceNeteaseStructureFeatureEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlaceNeteaseStructureFeatureEvent(structureName: str) -> bool
```

- structureName: str，结构的 identifier。

**返回值**：bool，是否增加成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFeature(levelId)
# 注意structureName格式为floderName:structureName
comp.AddNeteaseFeatureWhiteList("test:pumpkins")
```

</TabItem>
</Tabs>

<Server/> FeatureCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateFeature(levelId)`

移除 structureName 对 PlaceNeteaseStructureFeatureEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlaceNeteaseStructureFeatureEvent(structureName: str) -> bool
```

- structureName: str，结构名称。

**返回值**：bool，是否移除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFeature(levelId)
# 注意structureName格式为floderName:structureName
comp.RemoveNeteaseFeatureWhiteList("test:pumpkins")
```

</TabItem>
</Tabs>

<Server/> FeatureCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateFeature(levelId)`

清空所有已添加 Netease Structure Feature 对 PlaceNeteaseStructureFeatureEvent 事件的脚本层监听。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlaceNeteaseStructureFeatureEvent() -> bool
```


**返回值**：bool，是否清空成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFeature(levelId)
comp.ClearAllNeteaseFeatureWhiteList()
```

</TabItem>
</Tabs>

---

### PlayerIntendLeaveServerEvent

<Server/>

触发时机：即将删除玩家时触发该事件，此时可以通过各种 API 获取玩家的当前状态。

```python
PlayerIntendLeaveServerEvent(playerId: str) -> Any
```

- playerId: str，玩家 id。

**备注**

- 与【[DelServerPlayerEvent](/docs/docs/scripts/modapi/events/world#delserverplayerevent)】事件不同，此时可以通过各种 API 获取玩家的当前状态。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerJoinMessageEvent

<Server/>

触发时机：准备显示“xxx 加入游戏”的玩家登录提示文字时服务端抛出的事件。

```python
PlayerJoinMessageEvent(id: str, name: str, cancel: bool, message: str) -> Any
```

- id: str，玩家实体 id。
- name: str，玩家昵称。
- cancel: bool，是否显示提示文字，允许修改。True：不显示提示。
- message: str，玩家加入游戏的提示文字，允许修改。

**备注**

- 对于联机类游戏（如联机大厅、网络游戏等），请勿在此事件的回调函数中使用 [SetFootPos](/docs/docs/scripts/modapi/entity/attribute#setfootpos) 接口修改玩家的位置，否则可能会因为触发服务端反作弊机制而传送失败。如需要在进入游戏时使用 [SetFootPos](/docs/docs/scripts/modapi/entity/attribute#setfootpos) 接口，建议监听 [AddServerPlayerEvent](/docs/docs/scripts/modapi/events/world#addserverplayerevent) 并设置位置。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PlayerLeftMessageServerEvent

<Server/>

触发时机：准备显示“xxx 离开游戏”的玩家离开提示文字时服务端抛出的事件。

```python
PlayerLeftMessageServerEvent(id: str, name: str, cancel: bool, message: str) -> Any
```

- id: str，玩家实体 id。
- name: str，玩家昵称。
- cancel: bool，是否显示提示文字，允许修改。True：不显示提示。
- message: str，玩家离开游戏的提示文字，允许修改。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### RemoveEntityClientEvent

<Client/>

客户端侧实体被移除时触发。

```python
RemoveEntityClientEvent(id: str) -> Any
```

- id: str，移除的实体 id。

**备注**

- 客户端接收到了服务端监测实体离开玩家视野时触发，原事件名 RemoveEntityPacketEvent。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### RemovePlayerAOIClientEvent

<Client/>

玩家离开当前玩家视野时触发的事件。

```python
RemovePlayerAOIClientEvent(playerId: str) -> Any
```

- playerId: str，玩家 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ServerChatEvent

<Server/>

玩家发送聊天信息时触发。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ServerChatEvent(
    username: str,
    playerId: str,
    message: str,
    cancel: bool,
    bChatById: bool,
    bForbid: bool,
    toPlayerIds: List[str],
    gameChatPrefix: str,
    gameChatPrefixColorR: float,
    gameChatPrefixColorG: float,
    gameChatPrefixColorB: float,
) -> Any
```

- username: str，玩家名称。
- playerId: str，玩家 id。
- message: str，玩家发送的聊天消息内容。
- cancel: bool，是否取消这个聊天事件，若取消可以设置为 True。
- bChatById: bool，是否把聊天消息发送给指定在线玩家，而不是广播给所有在线玩家，若只发送某些玩家可以设置为 True。
- bForbid: bool，是否禁言，仅 apollo 可用。true：被禁言，玩家聊天会提示“你已被管理员禁言”。
- toPlayerIds: List[str]，接收聊天消息的玩家 id 列表，bChatById 为 True 时生效。
- gameChatPrefix: str，设置当前玩家在网易聊天界面中的前缀，字数限制 4，从字符串头部开始取。前缀文本输入非字符串格式时会被置为空。若 cancel 为 True，会取消掉本次的前缀修改。
- gameChatPrefixColorR: float，设置当前玩家在网易聊天界面中前缀颜色 rgb 的 r 值，范围为[0,1]。颜色数值输入其他格式时会被置为 0。若 cancel 为 True，会取消掉本次的颜色修改。
- gameChatPrefixColorG: float，设置当前玩家在网易聊天界面中前缀颜色 rgb 的 g 值，范围为[0,1]。颜色数值输入其他格式时会被置为 0。若 cancel 为 True，会取消掉本次的颜色修改。
- gameChatPrefixColorB: float，设置当前玩家在网易聊天界面中前缀颜色 rgb 的 b 值，范围为[0,1]。颜色数值输入其他格式时会被置为 0。若 cancel 为 True，会取消掉本次的颜色修改。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

</TabItem>
<TabItem value="示例" label="示例">

```python
# ServerSystem
import mod.server.extraServerApi as serverApi
from mod_log import logger as logger
# 监听引擎的事件 ：self指ServerSystem类的实例  ServerChatEvent是系统事件
self.ListenForEvent(serverApi.GetEngineNamespace(),
                    serverApi.GetEngineSystemName(),
                    "ServerChatEvent",
                    self, self.OnServerChat)
def OnServerChat(self, args):
    #可以设置username或者message的样式代码 详见mc维基 样式代码
    args["username"] = "§rl"+args[username]+"§r"
    args["message"] = "test"
    args["gameChatPrefix"] = "史蒂夫1号" # 最终显示前缀：史蒂夫1
    args["gameChatPrefixColorR"] = 1.0
    args["gameChatPrefixColorG"] = 0.0
    args["gameChatPrefixColorB"] = 0.0 # 最终前缀底板颜色rgb：(1.0, 0.0, 0.0) 红色
    logger.info("ServerChatEvent %s" % args)
```

</TabItem>
</Tabs>

---

### ServerPostBlockPatternEvent

<Server/>

触发时机：用方块组合生成生物，生成生物之后触发该事件。

```python
ServerPostBlockPatternEvent(
    entityId: str,
    entityGenerated: str,
    x: int,
    y: int,
    z: int,
    dimensionId: int,
) -> Any
```

- entityId: str，生成生物的 id。
- entityGenerated: str，生成生物的名字，如"minecraft:pig"。
- x: int，方块 x 坐标。
- y: int，方块 y 坐标。
- z: int，方块 z 坐标。
- dimensionId: int，维度 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ServerPreBlockPatternEvent

<Server/>

触发时机：用方块组合生成生物，在放置最后一个组成方块时触发该事件。

```python
ServerPreBlockPatternEvent(
    enable: bool,
    x: int,
    y: int,
    z: int,
    dimensionId: int,
    entityWillBeGenerated: str,
) -> Any
```

- enable: bool，是否允许继续生成。若设为 False，可阻止生成生物。
- x: int，方块 x 坐标。
- y: int，方块 y 坐标。
- z: int，方块 z 坐标。
- dimensionId: int，维度 id。
- entityWillBeGenerated: str，即将生成生物的名字，如"minecraft:pig"。

---

### ServerSpawnMobEvent

<Server/>

游戏内自动生成生物，以及使用 api 生成生物时触发。

```python
ServerSpawnMobEvent(
    entityId: str,
    identifier: str,
    type: int,
    baby: bool,
    x: float,
    y: float,
    z: float,
    dimensionId: int,
    realIdentifier: str,
    cancel: bool,
) -> Any
```

- entityId: str，实体 id。
- identifier: str，生成实体的命名空间。
- type: int，生成实体的类型，参考[EntityType](https://mc.163.com/newdev/docs/api/meijuzhi/EntityType.html)。
- baby: bool，生成怪物是否是幼年怪。
- x: float，生成实体坐标 x。
- y: float，生成实体坐标 y。
- z: float，生成实体坐标 z。
- dimensionId: int，生成实体的维度，默认值为 0（0 为主世界，1 为地狱，2 为末地）。
- realIdentifier: str，生成实体的命名空间，通过 MOD API 生成的生物在这个参数也能获取到真正的命名空间，而不是以 custom 开头的。
- cancel: bool，是否取消生成该实体。

**备注**

- 如果通过 MOD API 生成，identifier 命名空间为 custom。如果需要屏蔽原版的生物生成，可以判断 identifier 命名空间不为 custom 时设置 cancel 为 True。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### UnLoadClientAddonScriptsBefore

<Client/>

客户端卸载 mod 之前触发。

```python
UnLoadClientAddonScriptsBefore() -> Any
```

---
