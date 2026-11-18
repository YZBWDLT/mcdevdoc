---
sidebar_position: 2
---

# 方块调色板

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录方块调色板相关的接口，共 8 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/fangkuai/fangkuaitiaoseban.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### DeleteBlockInBlockPalette

<Version type="china" add="2.1"/>

<Server/> <Client/> BlockPaletteComponent

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

删除方块调色板 BlockPalette 中某个类型的方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DeleteBlockInBlockPalette(blockName: str, auxValue: int = -1) -> int
```

- blockName: str，方块名称。
- auxValue: int，方块附加值。可选参数，默认值为-1。不填写方块附加值时删除所有符合这个名称的方块。

**返回值**：int，返回成功删除的方块数量。

**备注**

- 在删除门或者床的类型方块时，请使用床头的附加值或者门的下半部分的附加值进行删除。使用床尾及门的上半部分的附加值时删除过程将会无效。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 客户端调用
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
count = palette.DeleteBlockInBlockPalette("minecraft:grass", 0)
print count
# 服务端调用
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos(0, (200,64,200),(201,65,202))
count = palette.DeleteBlockInBlockPalette("minecraft:grass", 0)
print count
```

</TabItem>
</Tabs>

---

### DeserializeBlockPalette

<Version type="china" add="2.1"/>

<Server/> <Client/> BlockPaletteComponent

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

反序列化方块调色板数据字典中的数据，用于方块调色板在客户端及服务端的事件数据之间传输。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DeserializeBlockPalette(dataDict: Dict[str, Any]) -> bool
```

- dataDict: Dict[str, Any]，方块调色板数据字典。使用接口 [SerializeBlockPalette](/docs/docs/scripts/modapi/interfaces/block/palette#serializeblockpalette) 获取。

**返回值**：bool，反序列化是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 客户端调用
# 事件回调函数中
def onGetBlockPalette(self, data):
    dataDict = data['data']
    comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
    newPalette = comp.GetBlankBlockPalette()
    newPalette.DeserializeBlockPalette(dataDict)

# 服务端调用
# 事件回调函数中
def onGetBlockPalette(self, data):
    dataDict = data['data']
    comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
    newPalette = comp.GetBlankBlockPalette()
    newPalette.DeserializeBlockPalette(dataDict)
```

</TabItem>
</Tabs>

---

### GetBlockCountInBlockPalette

<Version type="china" add="2.1"/>

<Server/> <Client/> BlockPaletteComponent

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

获取方块调色板 BlockPalette 中某个类型的方块的数量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockCountInBlockPalette(blockName: str, auxValue: int = -1) -> int
```

- blockName: str，方块名称。
- auxValue: int，方块附加值。可选参数，默认值为-1。不填写方块附加值时获取所有符合这个名称的方块的数量。

**返回值**：int，返回该类型的方块数量。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 客户端调用
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
count = palette.GetBlockCountInBlockPalette("minecraft:grass", 0)
print count
# 服务端调用
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos(0, (200,64,200),(201,65,202))
count = palette.GetBlockCountInBlockPalette("minecraft:grass", 0)
print count
```

</TabItem>
</Tabs>

---

### GetLocalPosListOfBlocks

<Version type="china" add="2.1"/>

<Server/> <Client/> BlockPaletteComponent

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

获取方块调色板中某种方块的相对位置列表。方块调色板记录了多个方块组成的一个三维空间下的方块组合，而相对位置则指的是，以这些方块中最小坐标的方块所在位置作为原点的坐标轴下的相对位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLocalPosListOfBlocks(
    blockName: str,
    auxValue: int = -1,
) -> List[Tuple[int, int, int]]
```

- blockName: str，方块名称。
- auxValue: int，方块附加值。可选参数，默认值为-1。不填写方块附加值时则获取所有符合这个方块名称的方块的相对位置列表。

**返回值**：List[Tuple[int, int, int]]，返回该类型方块的所占据相对位置列表。如该方块不存在，则返回空列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 客户端调用
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
result = palette.GetLocalPosListOfBlocks("minecraft:grass")
print result
# 服务端调用
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos(0, (200,64,200),(201,65,202))
result = palette.GetLocalPosListOfBlocks("minecraft:grass")
print result
```

</TabItem>
</Tabs>

---

### GetVolumeOfBlockPalette

<Version type="china" add="2.1"/>

<Server/> <Client/> BlockPaletteComponent

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

获取方块调色板 BlockPalette 所占据的长方体的长宽高。长指的是在方块调色板 BlockPalette 在世界坐标中占据的 x 轴方向的长度，宽指的是 z 轴方向的长度，高指的是 y 轴方向的长度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetVolumeOfBlockPalette() -> Tuple[int, int, int]
```


**返回值**：Tuple[int, int, int]，返回方块调色板 BlockPalette 的长宽高元组，按顺序分别为长，宽，高的数值。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 客户端调用
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
result = palette.GetVolumeOfBlockPalette()
print result
# 服务端调用
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos(0, (200,64,200),(201,65,202))
result = palette.GetVolumeOfBlockPalette()
print result
```

</TabItem>
</Tabs>

---

### ReplaceAirByStructureVoid

<Version type="china" add="2.1"/>

<Server/> <Client/> BlockPaletteComponent

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

设置是否将方块调色板 BlockPalette 中所有空气替换为结构空位。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ReplaceAirByStructureVoid(enable: bool) -> bool
```

- enable: bool，是否将空气方块替换为结构空位。True 为替换为结构空位，False 为使用空气方块。

**返回值**：bool，替换是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 客户端调用
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
print palette.ReplaceAirByStructureVoid(True)
# 服务端调用
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos(0, (200,64,200),(201,65,202))
print palette.ReplaceAirByStructureVoid(True)
```

</TabItem>
</Tabs>

---

### ReplaceBlockInBlockPalette

<Version type="china" add="2.1"/>

<Server/> <Client/> BlockPaletteComponent

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

替换方块调色板 BlockPalette 中某个类型的方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ReplaceBlockInBlockPalette(
    newblockName: str,
    newBlockAux: int,
    oldBlockName: str,
    oldBlockAux: int,
) -> int
```

- newblockName: str，新的方块名称。
- newBlockAux: int，新的方块的附加值。
- oldBlockName: str，将要被替换的方块名称。
- oldBlockAux: int，将要被替换的方块名称的附加值。可选参数。不填写附加值时将替换所有符合这个名称的方块。

**返回值**：int，返回成功替换的方块数量。

**备注**

- 注意，在替换方块时，如果新的方块使用的是床方块以及床尾的附加值，或者是门方块以及的门的上半部分方块的附加值时，则该替换过程将会被忽略，请使用床头或门的下半部分的附加值进行替换。同理，被替换的方块也请使用床头或者门的上半部分的附加值。
- 注意，在使用床方块以及床头的附加值，或者是门方块以及门的下半部分的附加值替换其他方块后，使用接口 [SetBlockByBlockPalette](/docs/docs/scripts/modapi/interfaces/world/block_palette#setblockbyblockpalette) 设置该调色板时，如果床尾位置或者门的上半部分存在其他方块调色板中的方块，将会造成冲突，冲突的处理方式会按照接口 [SetBlockByBlockPalette](/docs/docs/scripts/modapi/interfaces/world/block_palette#setblockbyblockpalette) 中的冲突模式参数进行处理。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 客户端调用
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
count = palette.ReplaceBlockInBlockPalette("minecraft:vine", 4,"minecraft:grass", 0)
print count
# 服务端调用
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos(0, (200,64,200),(201,65,202))
count = palette.ReplaceBlockInBlockPalette("minecraft:vine", 4,"minecraft:grass", 0)
print count
```

</TabItem>
</Tabs>

---

### SerializeBlockPalette

<Version type="china" add="2.1"/>

<Server/> <Client/> BlockPaletteComponent

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

序列化方块调色板中的数据，用于方块调色板在客户端及服务端的事件数据之间传输。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SerializeBlockPalette() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，方块调色板的序列化数据。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 客户端调用
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
sourcePalette = comp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
dataDict = sourcePalette.SerializeBlockPalette()
# 用于在事件中传递方块调色板数据
eventData = self.CreateEventData()
eventData['data'] = dataDict
self.NotifyToServer(modConfig.GetBlockPaletteEvent, eventData)

# 服务端调用
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
sourcePalette = comp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
dataDict = sourcePalette.SerializeBlockPalette()
# 用于在事件中传递方块调色板数据
eventData = self.CreateEventData()
eventData['data'] = dataDict
self.NotifyToClient(modConfig.GetBlockPaletteEvent, eventData)
```

</TabItem>
</Tabs>

---
