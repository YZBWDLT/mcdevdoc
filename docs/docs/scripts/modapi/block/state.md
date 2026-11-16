---
sidebar_position: 5
---

# 方块状态与附加值

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录方块状态与附加值相关的接口，共 4 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/fangkuai/fangkuaizhuangtaiyufujiazhi.html"/>

---

### GetBlockAuxValueFromStates

<Server/> BlockStateComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockState(levelId)`

根据方块名称和[方块状态](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#方块状态)获取方块附加值 AuxValue。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockAuxValueFromStates(blockName: str, states: Dict[str, Any]) -> int
```

- blockName: str，方块名称。
- states: Dict[str, Any]，方块状态。

**返回值**：int，方块附加值 AuxValue，异常时为-1。

**备注**

- 基岩版 1.19 更新后，部分包含多个种类的方块（例如，羊毛类，珊瑚类，栅栏类等类型的方块）被拆分成单独的方块 identifier 及方块附加值，因此原来的方块附加值及方块状态不再适用。请注意尽量使用新的方块 identifier，被拆分出来的这些单独的方块可能不会包含任何方块状态，例如橙色羊毛（minecraft:orange_wool）不会包含"color"的方块状态。因此无法使用"color"状态进行查询获取附加值。
- 截止至基岩版 1.20.10，被拆分的方块种类包含：羊毛类方块。根据羊毛颜色拆分成独立方块原木类方块。根据原木种类拆分成独立方块栅栏类方块。根据栅栏种类拆分成独立方块珊瑚类方块。根据珊瑚颜色拆分成独立方块地毯类方块。根据地毯颜色拆分成独立方块潜影盒类方块。根据潜影盒颜色拆分成独立方块混凝土类方块。根据混凝土颜色拆分成独立方块。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockState(levelId)
states = comp.GetBlockAuxValueFromStates("minecraft:hopper", {"facing_direction": 0, "toggle_bit": 0})
```

</TabItem>
</Tabs>

---

### GetBlockStates

<Server/> BlockStateComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockState(levelId)`

获取[方块状态](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#方块状态)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockStates(pos: Tuple[float, float, float], dimensionId: int) -> Dict[str, Any]
```

- pos: Tuple[float, float, float]，方块位置。
- dimensionId: int，方块所在维度。

**返回值**：Dict[str, Any]，方块状态，异常时为 None。

**备注**

- 仅可获取到已加载区块内的方块状态，支持获取对应维度的常加载区块内方块状态。
- 基岩版 1.19 更新后，部分包含多个种类的方块（例如，羊毛类，珊瑚类，栅栏类等类型的方块）被拆分成单独的方块 identifier 及方块附加值，因此原来的方块附加值及方块状态不再适用。请注意尽量使用新的方块 identifier，被拆分出来的这些单独的方块可能不会包含任何方块状态，例如橙色羊毛（minecraft:orange_wool）不会包含"color"的方块状态。因此会返回空的状态。
- 截止至基岩版 1.20.10，被拆分的方块种类包含：羊毛类方块。根据羊毛颜色拆分成独立方块原木类方块。根据原木种类拆分成独立方块栅栏类方块。根据栅栏种类拆分成独立方块珊瑚类方块。根据珊瑚颜色拆分成独立方块地毯类方块。根据地毯颜色拆分成独立方块潜影盒类方块。根据潜影盒颜色拆分成独立方块混凝土类方块。根据混凝土颜色拆分成独立方块。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockState(levelId)
comp.GetBlockStates((4,4,3), 0)
```

</TabItem>
</Tabs>

---

### GetBlockStatesFromAuxValue

<Server/> BlockStateComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockState(levelId)`

根据方块名称和方块附加值 AuxValue 获取[方块状态](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#方块状态)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockStatesFromAuxValue(blockName: str, auxValue: int) -> Dict[str, Any]
```

- blockName: str，方块名称。
- auxValue: int，方块附加值 AuxValue。

**返回值**：Dict[str, Any]，方块状态，异常时为 None。

**备注**

- 基岩版 1.19 更新后，部分包含多个种类的方块（例如，羊毛类，珊瑚类，栅栏类等类型的方块）被拆分成单独的方块 identifier 及方块附加值，因此原来的方块附加值及方块状态不再适用。请注意尽量使用新的方块 identifier，被拆分出来的这些单独的方块可能不会包含任何方块状态，例如橙色羊毛（minecraft:orange_wool）不会包含”color"的方块状态。因此查询橙色羊毛时会返回空的状态。
- 截止至基岩版 1.20.10，被拆分的方块种类包含：羊毛类方块。根据羊毛颜色拆分成独立方块原木类方块。根据原木种类拆分成独立方块栅栏类方块。根据栅栏种类拆分成独立方块珊瑚类方块。根据珊瑚颜色拆分成独立方块地毯类方块。根据地毯颜色拆分成独立方块潜影盒类方块。根据潜影盒颜色拆分成独立方块混凝土类方块。根据混凝土颜色拆分成独立方块。
- 特殊值和方块状态的对应关系见微软文档。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockState(levelId)
states = comp.GetBlockStatesFromAuxValue('minecraft:sapling', 9)
```

</TabItem>
</Tabs>

---

### SetBlockStates

<Server/> BlockStateComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateBlockState(levelId)`

设置[方块状态](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#方块状态)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockStates(pos: Tuple[float, float, float], data: Dict[str, Any], dimensionId: int) -> bool
```

- pos: Tuple[float, float, float]，方块位置。
- data: Dict[str, Any]，方块状态。
- dimensionId: int，方块所在维度。

**返回值**：bool，设置是否成功。

**备注**

- 仅可设置已加载区块内的方块状态，支持设置对应维度的常加载区块内方块状态。
- 基岩版 1.19 更新后，部分包含多个种类的方块（例如，羊毛类，珊瑚类，栅栏类等类型的方块）被拆分成单独的方块 identifier 及方块附加值，因此原来的方块附加值及方块状态不再适用。请注意尽量使用新的方块 identifier，被拆分出来的这些单独的方块可能不会包含任何方块状态，例如橙色羊毛（minecraft:orange_wool）不会包含"color"的方块状态。因此无法设置"color"状态。
- 截止至基岩版 1.20.10，被拆分的方块种类包含：羊毛类方块。根据羊毛颜色拆分成独立方块原木类方块。根据原木种类拆分成独立方块栅栏类方块。根据栅栏种类拆分成独立方块珊瑚类方块。根据珊瑚颜色拆分成独立方块地毯类方块。根据地毯颜色拆分成独立方块潜影盒类方块。根据潜影盒颜色拆分成独立方块混凝土类方块。根据混凝土颜色拆分成独立方块。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 将白色羊毛设置为橙色羊毛
pos = (4,4,3)
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateBlockState(levelId)
state = comp.GetBlockStates(pos, 0) # state = { 'color': 'white' }
state['color'] = 'orange'
comp.SetBlockStates(pos, state, 0)
```

</TabItem>
</Tabs>

---
