---
sidebar_position: 3
---

# 方块几何体模型

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录方块几何体模型相关的接口，共 10 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/fangkuai/fangkuaijihetimoxing.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### CombineBlockBetweenPosToGeometry

<Version type="china" add="2.1"/>

<Client/> BlockGeometryCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)`

根据输入的两个位置，搜索这两个位置之间的所有方块，并将这些方块合并和转换为能用于实体的几何体模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CombineBlockBetweenPosToGeometry(
    startPos: Tuple[int, int, int],
    endPos: Tuple[int, int, int],
    geometryName: str,
    unsupportedMode: int,
    useStructureVoid: bool = False,
) -> BlockPaletteComponent
```

- startPos: Tuple[int, int, int]，起始位置。
- endPos: Tuple[int, int, int]，终点位置。
- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- unsupportedMode: int，不支持方块处理方式枚举，可选参数，可输入的值为 0、1。默认的值为 0。如果方块调色板中有不支持转变为几何体的方块的话，将按以下方式处理：0：跳过不支持的方块继续生成。1：停止生成。
- useStructureVoid: bool，是否使用结构空位代替空气方块，可选参数，默认值为 False。True 表示使用结构空位，False 表示不使用结构空位。

**返回值**：BlockPaletteComponent，返回合并过程中生成的方块调色板实例，如创建失败则返回 None。

**备注**

- 如果之前已经拥有一个相同名称几何体模型，合并出来的新模型会覆盖之前的模型。因此需要注意，每次合并不同外观的模型时 geometryName 都应该互不相同。
- 如果每次合并的模型都是外观相同的模型，则我们建议使用相同的 geometryName,以节省存储模型的内存。当然，最优的情况下是尽量复用之前已经创建的方块几何体模型，而不是重复合并新的模型。
- 自定义方块实体外观的 render/姿态（offset、rotation、scale、multipass）依赖客户端运行时才能获取。因此：外观尚不支持动画，渲染效果为不带动画的默认姿态；若调色板数据由服务端接口序列化产出，则该类方块的自定义外观会退化为默认姿态。建议使用客户端接口序列化 dataDict（[GetBlockPaletteBetweenPos](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettebetweenpos)/[GetBlockPaletteFromPosList](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettefromposlist) 客户端版）。
- 目前尚不支持的方块类型有 (后续版本将陆续支持)：微缩方块（见开发指南-玩法开发-自定义游戏内容-微缩方块）屏障末地传送门，末地折跃门。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
blockGeometryComp = clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)
palette = blockGeometryComp.CombineBlockBetweenPosToGeometry((200,64,200),(201,65,202),"my_block_geometry")
```

</TabItem>
</Tabs>

---

### CombineBlockFromPosListToGeometry

<Version type="china" add="2.1"/>

<Client/> BlockGeometryCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)`

根据输入的方块位置列表，搜索这些位置的所有方块，并将这些方块合并和转换为能用于实体的几何体模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CombineBlockFromPosListToGeometry(
    posList: List[Tuple[int, int, int]],
    geometryName: str,
    unsupportedMode: int,
    useStructureVoid: bool = False,
) -> BlockPaletteComponent
```

- posList: List[Tuple[int, int, int]]，方块位置列表。
- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- unsupportedMode: int，不支持方块处理方式枚举，可选参数，可输入的值为 0、1。默认的值为 0。如果方块调色板中有不支持转变为几何体的方块的话，将按以下方式处理：0：跳过不支持的方块继续生成。1：停止生成。
- useStructureVoid: bool，是否使用结构空位代替空气方块，可选参数，默认值为 False。True 表示使用结构空位，False 表示不使用结构空位。

**返回值**：BlockPaletteComponent，返回合并过程中生成的方块调色板实例，如创建失败则返回 None。

**备注**

- 如果之前已经拥有一个相同名称几何体模型，合并出来的新模型会覆盖之前的模型。因此需要注意，每次合并不同外观的模型时 geometryName 都应该互不相同。
- 如果每次合并的模型都是外观相同的模型，则我们建议使用相同的 geometryName,以节省存储模型的内存。当然，最优的情况下是尽量复用之前已经创建的方块几何体模型，而不是重复合并新的模型。
- 自定义方块实体外观的 render/姿态（offset、rotation、scale、multipass）依赖客户端运行时才能获取。因此：外观尚不支持动画，渲染效果为不带动画的默认姿态。若调色板数据由服务端接口序列化产出，则该类方块的自定义外观会退化为默认姿态。建议使用客户端接口序列化 dataDict（[GetBlockPaletteBetweenPos](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettebetweenpos)/[GetBlockPaletteFromPosList](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettefromposlist) 客户端版）。
- 目前尚不支持的方块类型有 (后续版本将陆续支持)：微缩方块（见开发指南-玩法开发-自定义游戏内容-微缩方块）屏障末地传送门，末地折跃门。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
blockGeometryComp = clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)
palette = blockGeometryComp.CombineBlockFromPosListToGeometry([(200,64,200),(201,65,202)],"my_block_geometry")
```

</TabItem>
</Tabs>

---

### CombineBlockPaletteToGeometry

<Version type="china" add="2.1"/>

<Client/> BlockGeometryCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlock(levelId)`

将 BlockPalette 中的所有方块合并并转换为能用于实体的几何体模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CombineBlockPaletteToGeometry(
    blockPalette: BlockPaletteComponent,
    geometryName: str,
    unsupportedMode: int,
) -> str
```

- blockPalette: BlockPaletteComponent，方块调色板，由 [GetBlockPaletteBetweenPos](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettebetweenpos)、[GetBlockPaletteFromPosList](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettefromposlist)、以及 [GetBlankBlockPalette](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblankblockpalette)+[DeserializeBlockPalette](/docs/docs/scripts/modapi/interfaces/block/palette#deserializeblockpalette) 接口获取。
- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- unsupportedMode: int，不支持方块处理方式枚举，可选参数，可输入的值为 0、1。默认的值为 0。如果方块调色板中有不支持转变为几何体的方块的话，将按以下方式处理：0：跳过不支持的方块继续生成。1：停止生成。

**返回值**：str，生成成功后返回几何体模型的名称，生成失败返回 None。几何体模型名称与输入的参数 geometryName 一致。

**备注**

- 如果之前已经拥有一个相同名称几何体模型，合并出来的新模型会覆盖之前的模型。因此需要注意，每次合并不同外观的模型时 geometryName 都应该互不相同。
- 如果每次合并的模型都是外观相同的模型，则我们建议使用相同的 geometryName,以节省存储模型的内存。当然，最优的情况下是尽量复用之前已经创建的方块几何体模型，而不是重复合并新的模型。
- 自定义方块实体外观的 render/姿态（offset、rotation、scale、multipass）依赖客户端运行时才能获取。因此：外观尚不支持动画，渲染效果为不带动画的默认姿态；若调色板数据由服务端接口序列化产出，则该类方块的自定义外观会退化为默认姿态。建议使用客户端接口序列化 dataDict（[GetBlockPaletteBetweenPos](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettebetweenpos)/[GetBlockPaletteFromPosList](/docs/docs/scripts/modapi/interfaces/world/block_palette#getblockpalettefromposlist) 客户端版）。
- 目前尚不支持的方块类型有 (后续版本将陆续支持)：微缩方块（见开发指南-玩法开发-自定义游戏内容-微缩方块）屏障末地传送门，末地折跃门。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
blockComp = clientApi.GetEngineCompFactory().CreateBlock(levelId)
palette = blockComp.GetBlockPaletteBetweenPos((200,64,200),(201,65,202))
blockGeometryComp = clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)
geometryName = blockGeometryComp.CombineBlockPaletteToGeometry(palette,"my_block_geometry")
print geometryName
```

</TabItem>
</Tabs>

---

### EnableActorBlockGeometryTransparent

<Version type="china" add="2.2"/>

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")`

设置是否允许实体的方块几何体模型产生透明度，允许开启后通过调节方块几何体的透明度将会使得方块几何体模型变得透明。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EnableActorBlockGeometryTransparent(geometryName: str, enable: bool) -> bool
```

- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- enable: bool，是否允许实体的方块几何体模型产生透明度，True 表示允许，False 表示不允许。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
# 允许方块几何体模型产生透明度
print actorRenderComp.EnableActorBlockGeometryTransparent("my_block_geometry", True)
# 调节方块几何体模型的透明度为0.5
print actorRenderComp.SetActorBlockGeometryTransparency("my_block_geometry", 0.5)
```

</TabItem>
</Tabs>

---

### GetActorBlockGeometryScale

<Version type="china" add="3.2"/>

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")`

获取实体的方块几何体模型的缩放倍率。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetActorBlockGeometryScale(geometryName: str) -> Tuple[float, float, float]
```

- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。

**返回值**：Tuple[float, float, float]，获取成功返回缩放方块几何模型在 x,y,z 各个轴上的缩放值，失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
print actorRenderComp.GetActorBlockGeometryScale("my_block_geometry")
```

</TabItem>
</Tabs>

---

### SetActorBlockGeometryOffset

<Version type="china" add="2.2"/>

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")`

设置实体的方块几何体模型的位置偏移。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetActorBlockGeometryOffset(
    geometryName: str,
    offset: Tuple[float, float, float] = (0, 0, 0),
) -> bool
```

- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- offset: Tuple[float, float, float]，方块几何体模型相对实体的位置偏移值，默认为(0, 0, 0)。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
print actorRenderComp.SetActorBlockGeometryOffset("my_block_geometry", (1,1,1))
```

</TabItem>
</Tabs>

---

### SetActorBlockGeometryRotation

<Version type="china" add="2.2"/>

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")`

设置实体的方块几何体模型的旋转角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetActorBlockGeometryRotation(
    geometryName: str,
    rotation: Tuple[float, float, float] = (0, 0, 0),
) -> bool
```

- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- rotation: Tuple[float, float, float]，方块几何体模型相对实体的旋转角度，默认为(0, 0, 0)，分别表示绕 x,y,z 轴的旋转角度，旋转顺序按 z,x,y 顺序旋转。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
print actorRenderComp.SetActorBlockGeometryRotation("my_block_geometry", (90,0,0))
```

</TabItem>
</Tabs>

---

### SetActorBlockGeometryRotationQuat

<Version type="china" add="3.10"/>

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

使用四元数设置实体的方块几何体模型的旋转，避免欧拉角万向锁问题。

```python
SetActorBlockGeometryRotationQuat(
    geometryName: str,
    quat: Tuple[float, float, float, float],
) -> bool
```

- geometryName: str，几何体模型的名称。
- quat: Tuple[float, float, float, float]，四元数(x,y,z,w)，默认为(0,0,0,1)即无旋转。

**返回值**：bool，设置是否成功。

---

### SetActorBlockGeometryScale

<Version type="china" add="3.2"/>

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")`

设置实体的方块几何体模型的缩放倍率。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetActorBlockGeometryScale(
    geometryName: str,
    scale: Tuple[float, float, float],
) -> bool
```

- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- scale: Tuple[float, float, float]，方块几何模型在 x,y,z 各个轴上的缩放值。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
print actorRenderComp.SetActorBlockGeometryScale("my_block_geometry", (0.5, 0.5, 0.5))
```

</TabItem>
</Tabs>

---

### SetActorBlockGeometryTransparency

<Version type="china" add="2.2"/>

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")`

设置实体的方块几何体模型的透明度。注意，只有调用接口 [EnableActorBlockGeometryTransparent](/docs/docs/scripts/modapi/interfaces/block/geometry#enableactorblockgeometrytransparent) 开启了方块几何体模型的透明度后该接口才会生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetActorBlockGeometryTransparency(geometryName: str, transparent: float) -> bool
```

- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- transparent: float，方块几何体模型的透明度，范围值为[0,1]，超过这个范围的值将会被截取为 0 或 1。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
# 允许方块几何体模型产生透明度
print actorRenderComp.EnableActorBlockGeometryTransparent("my_block_geometry", True)
# 调节方块几何体模型的透明度为0.5
print actorRenderComp.SetActorBlockGeometryTransparency("my_block_geometry", 0.5)
```

</TabItem>
</Tabs>

---
