---
sidebar_position: 3
---

# 方块组合

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录方块组合相关的接口，共 7 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/fangkuaizuhe.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### CreateMicroBlockResStr

<Version type="china" add="1.23"/>

<Server/> BlockCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlock(levelId)`

生成微缩方块资源 Json 字符串。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateMicroBlockResStr(
    identifier: str,
    start: Tuple[int, int, int],
    end: Tuple[int, int, int],
    colorMap: Optional[Dict[str, Any]] = None,
    isMerge: bool = False,
    icon: str = "",
) -> str
```

- identifier: str，微缩方块唯一标识。
- start: Tuple[int, int, int]，微缩起始坐标。
- end: Tuple[int, int, int]，微缩结束坐标。
- colorMap: Optional[Dict[str, Any]]，默认为 None，微缩方块颜色对应表。
- isMerge: bool，默认为 False，是否合并同类型方块。
- icon: str，默认为空字符串，微缩方块图标，需要定义在 terrain_texture.json 中。

**返回值**：str，生成的微缩方块的资源字符串。

**备注**

- 联机大厅不支持。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
result = comp.CreateMicroBlockResStr("x", (12, 60, 12), (26, 76, 26), colorMap={'minecraft:grass': [12, 22, 123, 255]}, isMerge=True, icon="micro_block_datiangou")
with open("micro_block_x.json", "w+") as f:
    f.write(result)
#该例子中，方块将以 (12 60 12) 为起点，以 (26 76 26) 为终点进行微缩，最终微缩方块里所有草方块的颜色为 rgba(12,22,123,255)，实际显示颜色会依据环境光照微调，物品栏里的图标为 terrain_texture.json 里 micro_block_datiangou 对应的图片。
```

</TabItem>
</Tabs>

---

### GetBlankBlockPalette

<Version type="china" add="2.1"/>

<Server/> BlockCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlock(levelId)`

获取一个空白的方块调色板。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口() -> BlockPaletteComponent
```


**返回值**：BlockPaletteComponent，返回生成的方块调色板实例，如获取失败则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
blankPalette = comp.GetBlankBlockPalette()
```

</TabItem>
</Tabs>

<Client/> BlockCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

获取一个空白的方块调色板。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口() -> BlockPaletteComponent
```


**返回值**：BlockPaletteComponent，返回生成的方块调色板实例，如获取失败则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
blankPalette = comp.GetBlankBlockPalette()
```

</TabItem>
</Tabs>

---

### GetBlockPaletteBetweenPos

<Version type="china" add="2.1"/>

<Server/> BlockCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlock(entityId)`

根据输入的两个方块位置创建并获取一个方块调色板，方块调色板用于描述和记录世界中的多个方块的组合。这个方块调色板包含了这两个位置之间的所有方块及其相对位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(
    dimensionId: int,
    startBlockPos: Tuple[int, int, int],
    endBlockPos: Tuple[int, int, int],
    eliminateAir: bool,
) -> BlockPaletteComponent
```

- dimensionId: int，方块所在维度。
- startBlockPos: Tuple[int, int, int]，起始方块位置。
- endBlockPos: Tuple[int, int, int]，终点方块位置。
- eliminateAir: bool，生成的方块调色板中是否剔除起始方块位置和终点方块位置之间多余的空气方块，默认 true。值为 True 时，方块调色板中不记录这两个位置范围内多余的空气方块；值为 False 时，方块调色板中将记录这两个位置范围内多余的空气方块。

**返回值**：BlockPaletteComponent，返回生成的方块调色板实例，如创建失败则返回 None。如果输入的两个方块位置之间全是空气，在 eliminateAir 为 False 情况下，则返回一个包含所有空气方块的方块调色板，而在 eliminateAir 为 True 情况下，则直接返回 None。

**备注**

- 对于床方块，方块调色板获取床方块时，只会添加床头的方块，床尾方块会进行忽略。对于门方块，则只会添加门的下半部分的方块，门的上半部分会进行忽略。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# entityId可以为None，也可以传入玩家的id。当传入的dimensionId为0或正值时，依赖dimensionId来获取区域；当传入的dimensionId为负值时，依赖传入的playerId来获取区域。
comp = serverApi.GetEngineCompFactory().CreateBlock(entityId)
palette = comp.GetBlockPaletteBetweenPos(0, (200,64,200),(201,65,202))
```

</TabItem>
</Tabs>

<Client/> BlockCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

根据输入的两个位置创建并获取一个方块调色板，该接口会搜索这两个位置之间的所有方块创建方块调色板，方块调色板用于描述和记录世界中的多个方块的组合。这个方块调色板包含了这两个位置之间的所有方块及其相对位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(
    startPos: Tuple[int, int, int],
    endPos: Tuple[int, int, int],
    eliminateAir: bool = True,
) -> BlockPaletteComponent
```

- startPos: Tuple[int, int, int]，起始位置。
- endPos: Tuple[int, int, int]，终点位置。
- eliminateAir: bool，生成的方块调色板中是否剔除起始位置和终点位置之间多余的空气方块，默认 True。值为 True 时，方块调色板中不记录这两个位置范围内多余的空气方块；值为 False 时，方块调色板中将记录这两个位置范围内多余的空气方块。

**返回值**：BlockPaletteComponent，返回生成的方块调色板实例，如创建失败则返回 None。如果输入的两个方块位置之间全是空气，在 eliminateAir 为 False 情况下，则返回一个包含所有空气方块的方块调色板，而在 eliminateAir 为 True 情况下，则直接返回 None。

**备注**

- 对于床方块，方块调色板获取床方块时，只会添加床头的方块，床尾方块会进行忽略。对于门方块，则只会添加门的下半部分的方块，门的上半部分会进行忽略。
- 需要等区域内的方块完全加载才能正确获取调色板。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
```

</TabItem>
</Tabs>

---

### GetBlockPaletteFromPosList

<Version type="china" add="2.1"/>

<Server/> BlockCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlock(entityId)`

根据输入的方块位置列表创建并获取一个方块调色板，方块调色板用于描述和记录世界中的多个方块的组合。创建的方块调色板包含了这个位置列表中的所有方块及其相对位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(
    dimensionId: int,
    posList: List[Tuple[int, int, int]],
) -> BlockPaletteComponent
```

- dimensionId: int，方块所在维度。
- posList: List[Tuple[int, int, int]]，方块位置列表。

**返回值**：BlockPaletteComponent，返回生成的方块调色板实例，如创建失败则返回 None。

**备注**

- 对于床方块，方块调色板获取床方块时，只会添加床头的方块，床尾方块会进行忽略。对于门方块，则只会添加门的下半部分的方块，门的上半部分会进行忽略。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
# entityId可以为None，也可以传入玩家的id。当传入的dimensionId为0或正值时，依赖dimensionId来获取区域；当传入的dimensionId为负值时，依赖传入的playerId来获取区域。
comp = serverApi.GetEngineCompFactory().CreateBlock(entityId)
palette = comp.GetBlockPaletteFromPosList(0,
[(200,64,200),
(201,64,200)
(202,64,200)
])
```

</TabItem>
</Tabs>

<Client/> BlockCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

根据输入的方块位置列表创建并获取一个方块调色板，方块调色板用于描述和记录世界中的多个方块的组合。创建的方块调色板包含了这个位置列表中的所有方块及其相对位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(posList: List[Tuple[int, int, int]]) -> BlockPaletteComponent
```

- posList: List[Tuple[int, int, int]]，方块位置列表。

**返回值**：BlockPaletteComponent，返回生成的方块调色板实例，如创建失败则返回 None。

**备注**

- 对于床方块，方块调色板获取床方块时，只会添加床头的方块，床尾方块会进行忽略。对于门方块，则只会添加门的下半部分的方块，门的上半部分会进行忽略。
- 需要等列表内的方块完全加载才能正确获取调色板。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
palette = comp.GetBlockPaletteFromPosList([
(200,64,200),
(201,64,200)
(202,64,200)
])
```

</TabItem>
</Tabs>

---

### LookupBlocksByBlockTag

<Version type="china" add="3.10"/>

<Server/> BlockCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlock(levelId)`

根据 netease_tags 中注册的方块 tag 名，查找该 tag 下所有方块，支持#引用的标签自动展开；同一 tag 名被多个模组注册时自动合并去重；未注册的原版 tag 可直接查询。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
服务端接口(blockTag: str) -> List[Dict[str, Any]]
```

- blockTag: str，方块 tag 名，如 common:stone_tag。

**返回值**：List[Dict[str, Any]]，方块字典列表，dict 包含 blockName 键。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
comp.LookupBlocksByBlockTag("common:stone_tag")
```

</TabItem>
</Tabs>

<Client/> BlockCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

根据 netease_tags 中注册的方块 tag 名，查找该 tag 下所有方块，支持#引用的标签自动展开；同一 tag 名被多个模组注册时自动合并去重；未注册的原版 tag 可直接查询。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
客户端接口(blockTag: str) -> List[Dict[str, Any]]
```

- blockTag: str，方块 tag 名，如 common:stone_tag。

**返回值**：List[Dict[str, Any]]，方块字典列表，dict 包含 blockName 键。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
comp.LookupBlocksByBlockTag("common:stone_tag")
```

</TabItem>
</Tabs>

---

### RegisterBlockPatterns

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> BlockCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlock(levelId)`

注册特殊方块组合。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterBlockPatterns(
    pattern: List[str],
    defines: Dict[str, Any],
    result_actor_name: str,
) -> bool
```

- pattern: List[str]，方块组合位置。
- defines: Dict[str, Any]，方块组合类型。
- result_actor_name: str，合成结果。

**返回值**：bool，设置结果。

**备注**

- 注意：该 pattern 不限定方向，只要能在任一平面上组合成功就能合成对应的实体。
- 如示例代码所示，不需要放方块的位置需要显式定义为空气方块。
- 如示例代码所示，如果填了空格，表示该位置可以匹配任意方块。
- 当引擎中已注册过相同的 pattern 和 defines 时，该接口不会更新 result_actor_name，并返回 False。
- namespace:name:aux_value，当 aux_value 不填或者填时为通配，如果有具体 aux_value 时只匹配特定方块 如'minecraft:wood'、'minecraft🪵'均通配木头，而'minecraft🪵0'只匹配橡木。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(levelId)
pattern = [
    'A#A',
    'XXX',
    'AXA'
    ]
defines ={
    '#': 'minecraft:gold_block',
    'X': 'minecraft:iron_block',
    'A': 'minecraft:air',
}
comp.RegisterBlockPatterns(pattern,defines,'minecraft:chicken')
#该例子左中右下放铁块，上面放金块，会生成一只鸡

import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(playerId)
value = comp.RegisterBlockPatterns(['# #'],{'#': 'minecraft:iron_block'},'minecraft:cat')
#该例子中，玩家左右放俩铁块，无论中间是空气还是任意方块，均可生成一只猫
```

</TabItem>
</Tabs>

---

### SetBlockByBlockPalette

<Version type="china" add="2.1"/>

<Server/> BlockCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlock(entityId)`

根据输入的方块调色板内容，将调色板内记录的所有方块设置为实际的方块。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockByBlockPalette(
    blockPalette: BlockPaletteComponent,
    dimensionId: int,
    pos: Tuple[int, int, int],
    rotation: int,
    conflictMode: int = 0,
) -> bool
```

- blockPalette: BlockPaletteComponent，方块调色板，由 [GetBlockPaletteBetweenPos](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettebetweenpos) 以及 [GetBlockPaletteFromPosList](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettefromposlist) 接口获取。
- dimensionId: int，方块所在维度。如果输入的数值小于 0，则使用 entityId 获取设置方块的区块。
- pos: Tuple[int, int, int]，设置方块的原点位置，将以这个位置作为原点设置方块。
- rotation: int，方块组合体的旋转，旋转方向为绕设置方块的原点位置所在的 y 轴进行旋转，旋转角度仅支持-270,-180,-90,0,90,180,270。如果传入的不是这些值，将取其中最接近输入值的数值。
- conflictMode: int，冲突模式枚举，可选参数，默认为 0。在生成过程中，遇到生成的位置有其他方块的情况时，那么将会根据冲突模式来进行处理。可以输入的值为:0,1,2, 分别代表: 0: 替换地图中的方块，1: 跳过这个方块，2: 放弃之后的生成过程。

**返回值**：bool，生成过程是否成功，无法完成整个生成过程返回 False，完成整个生成过程则返回 True。如果冲突模式为 2 时，遇到冲突方块时放弃之后的生成过程，这时候接口也会返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlock(entityId)
palette = comp.GetBlockPaletteBetweenPos(0, (200,64,200),(201,65,202))
# 将方块以(205,64,200)为原点设置palette中的方块，旋转90度，冲突模式为0，即替代地图中的方块
comp.SetBlockByBlockPalette(palette, 0, (205,64,200),90,0)
```

</TabItem>
</Tabs>

---
