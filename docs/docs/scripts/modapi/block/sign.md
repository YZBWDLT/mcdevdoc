---
sidebar_position: 6
---

# 告示牌

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录告示牌相关的接口，共 4 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/fangkuai/gaoshipai.html"/>

---

### GetSignBlockText

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取告示牌（方块）的文本内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSignBlockText(pos: Tuple[int, int, int], dimensionId: int, side: int) -> str
```

- pos: Tuple[int, int, int]，告示牌的位置坐标。
- dimensionId: int，告示牌所在维度。
- side: int，设置 正/反 面的文本样式，0 表示正面，1 表示背面，默认为正面。

**返回值**：str，告示牌上的文本内容。

**备注**

- 当输入的坐标位置的方块不是告示牌的时候，返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(levelId)
pos = (-1, 4, 34)
dimensionId = 0
text = comp.GetSignBlockText(pos, dimensionId)
print "GetSignBlockText text={}".format(text)
```

</TabItem>
</Tabs>

---

### GetSignTextStyle

<Server/> BlockEntityCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockEntity(levelId)`

获取告示牌的文本样式信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSignTextStyle(pos: Tuple[int, int, int], dimensionId: int, side: int) -> Dict[str, Any]
```

- pos: Tuple[int, int, int]，方块位置。
- dimensionId: int，方块所在维度。
- side: int，告示牌正/背面，0 表示正面，1 表示背面，默认为正面。

**返回值**：Dict[str, Any]，样式信息颜色 rgba 和发光，格式：

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockEntity(levelId)
print comp.GetSignTextStyle((x, y, z), 0)
```

</TabItem>
</Tabs>

---

### SetSignBlockText

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

设置告示牌（方块）的文本内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSignBlockText(pos: Tuple[int, int, int], text: str, dimensionId: int, side: int) -> bool
```

- pos: Tuple[int, int, int]，告示牌的位置坐标。
- text: str，想要设置的文本内容。
- dimensionId: int，告示牌所在维度。
- side: int，设置 正/反 面的文本样式，0 表示正面，1 表示背面，默认为正面。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)
pos = (-1, 4, 34)
dimensionId = 0
suc = comp.SetSignBlockText(pos, "文本内容", dimensionId)
print "SetSignBlockText suc={}".format(suc)
```

</TabItem>
</Tabs>

---

### SetSignTextStyle

<Server/> BlockEntityCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockEntity(levelId)`

设置告示牌的文本样式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSignTextStyle(
    pos: Tuple[int, int, int],
    dimensionId: int,
    color: Tuple[float, float, float, float],
    lighting: bool,
    side: int,
) -> bool
```

- pos: Tuple[int, int, int]，方块位置。
- dimensionId: int，方块所在维度。
- color: Tuple[float, float, float, float]，颜色通道值(r, g, b, a)。
- lighting: bool，是否发光，即是否显示被发光墨囊染色后的效果。
- side: int，设置 正/反 面的文本样式，0 表示正面，1 表示背面，默认为正面。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockEntity(levelId)
print comp.SetSignTextStyle((x, y, z), 0, (0, 1, 0, 0.5), True)
```

</TabItem>
</Tabs>

---
