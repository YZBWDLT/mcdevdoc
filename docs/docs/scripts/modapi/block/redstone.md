---
sidebar_position: 7
---

# 红石

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录红石相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/fangkuai/hongshi.html"/>

---

### GetBlockPoweredState

<Server/> RedStoneComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateRedStone(levelId)`

获取某个坐标方块的充能状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockPoweredState(pos: Tuple[float, float, float], dimensionId: int) -> int
```

- pos: Tuple[float, float, float]，方块坐标位置。
- dimensionId: int，目标维度。

**返回值**：int，充能状态 0:未充能；1：弱充能；2：强充能。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRedStone(levelId)
comp.GetBlockPoweredState((1,1,1), 0)
```

</TabItem>
</Tabs>

---

### GetStrength

<Server/> RedStoneComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateRedStone(levelId)`

获取某个坐标的红石信号强度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetStrength(pos: Tuple[float, float, float], dimensionId: int) -> int
```

- pos: Tuple[float, float, float]，坐标位置。
- dimensionId: int，目标维度。

**返回值**：int，红石信号强度[0, 15]。

**备注**

- 可获取对应维度的常加载区块内红石信号强度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRedStone(levelId)
comp.GetStrength((1,1,1), 0)
```

</TabItem>
</Tabs>

---
