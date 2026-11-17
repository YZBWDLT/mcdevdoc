---
sidebar_position: 1
---

# 床

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录床相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/fangkuai/chuang.html"/>

---

### GetBedColor

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

获取床（方块）的颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBedColor(pos: Tuple[int, int, int], dimensionId: int) -> int
```

- pos: Tuple[int, int, int]，床的位置坐标（床占地两格，任意一个格子都可以）。
- dimensionId: int，床所在维度。

**返回值**：int，[ItemColor 枚举](/docs/docs/scripts/modapi/enums#itemcolor)。

**备注**

- 当输入的坐标位置的方块不是床的时候，返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)
pos = (-1, 4, 34)
dimensionId = 0
color = comp.GetBedColor(pos, dimensionId)
print "GetBedColor color={}".format(color)
```

</TabItem>
</Tabs>

---

### SetBedColor

<Server/> BlockInfoComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)`

设置床（方块）的颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBedColor(pos: Tuple[int, int, int], color: int, dimensionId: int) -> bool
```

- pos: Tuple[int, int, int]，床的位置坐标（床占地两格，任意一个格子都可以）。
- color: int，[ItemColor 枚举](/docs/docs/scripts/modapi/enums#itemcolor)。
- dimensionId: int，床所在维度。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockInfo(playerId)
pos = (-1, 4, 34)
dimensionId = 0
suc = comp.SetBedColor(pos, serverApi.GetMinecraftEnum().ItemColor.Blue, dimensionId)
print "SetBedColor suc={}".format(suc)
```

</TabItem>
</Tabs>

---
