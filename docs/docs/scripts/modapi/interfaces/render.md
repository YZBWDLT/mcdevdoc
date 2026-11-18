---
sidebar_position: 12
---

# 渲染

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录渲染相关的接口，共 29 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/xuanran.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### AddArrowShape

<Version type="china" add="3.5"/>

<Client/> DrawingCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

新建箭头形状。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddArrowShape(
    startPos: Tuple[float, float, float],
    endPos: Tuple[float, float, float],
    color: Tuple[float, float, float] = (1,1,1),
    headSegmentsNum: int = 20,
    arrowHeadLength: float = 1,
    radius: float = 0.5,
) -> DrawingShapeCompClient
```

- startPos: Tuple[float, float, float]，箭头形状的起始位置。
- endPos: Tuple[float, float, float]，箭头形状的结束位置。
- color: Tuple[float, float, float]，箭头形状的颜色, RGB 值, 取值范围为[0,1], 默认为(1,1,1)。
- headSegmentsNum: int，组成箭头形状头部的网格数量, 最小为 3, 默认为 20。
- arrowHeadLength: float，箭头形状头部的长度, 默认为 1。
- radius: float，箭头形状头部的半径, 默认为 0.5。

**返回值**：DrawingShapeCompClient，新建的箭头形状。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
arrow = comp.AddArrowShape((20,100,20), (20,150,20), (1,0,0), 40, 5, 2.5)
```

</TabItem>
</Tabs>

---

### AddBoxShape

<Version type="china" add="3.5"/>

<Client/> DrawingCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

新建盒子形状。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddBoxShape(
    pos: Tuple[float, float, float],
    scale: Tuple[float, float, float] = (1,1,1),
    color: Tuple[float, float, float] = (1,1,1),
) -> DrawingShapeCompClient
```

- pos: Tuple[float, float, float]，盒子形状的位置。
- scale: Tuple[float, float, float]，盒子形状的大小, 默认为(1,1,1)。
- color: Tuple[float, float, float]，盒子形状的颜色, RGB 值, 取值范围为[0,1], 默认为(1,1,1)。

**返回值**：DrawingShapeCompClient，新建的盒子形状。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
shape = comp.AddBoxShape((-37, 100, 100),(5,5,5),(1,0,0))
```

</TabItem>
</Tabs>

---

### AddCircleShape

<Version type="china" add="3.5"/>

<Client/> DrawingCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

新建圆形状。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddCircleShape(
    pos: Tuple[float, float, float],
    radius: float,
    color: Tuple[float, float, float] = (1,1,1),
    plane: int = 2,
    segmentsNum: int,
) -> DrawingShapeCompClient
```

- pos: Tuple[float, float, float]，圆形状的位置。
- radius: float，圆形状的半径。
- color: Tuple[float, float, float]，圆形状的颜色, RGB 值, 取值范围为[0,1], 默认为(1,1,1)。
- plane: int，圆形状的平面, 0 时为不指定平面, 1 时为 XY 平面, 2 时为 XZ 平面, 3 时为 YZ 平面, 默认为 2。
- segmentsNum: int，圆形状的网格数量, 默认为 20, 最小为 1, 小于 1 后不渲染。

**返回值**：DrawingShapeCompClient，新建的圆形状。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
circle = comp.AddCircleShape((50,100,50), 5, (1,0,0))
```

</TabItem>
</Tabs>

---

### AddLineShape

<Version type="china" add="3.5"/>

<Client/> DrawingCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

新建线条形状。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddLineShape(
    startPos: Tuple[float, float, float],
    endPos: Tuple[float, float, float],
    color: Tuple[float, float, float] = (1,1,1),
) -> DrawingShapeCompClient
```

- startPos: Tuple[float, float, float]，线条形状的起始位置。
- endPos: Tuple[float, float, float]，线条形状的结束位置。
- color: Tuple[float, float, float]，线条形状的颜色, RGB 值, 取值范围为[0,1], 默认为(1,1,1)。

**返回值**：DrawingShapeCompClient，新建的线条形状。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
line = comp.AddLineShape((-37, 100, 100), (0,0,0),(1,0,0))
```

</TabItem>
</Tabs>

---

### AddSphereShape

<Version type="china" add="3.5"/>

<Client/> DrawingCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

新建球形状。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddSphereShape(
    pos: Tuple[float, float, float],
    radius: float,
    color: Tuple[float, float, float] = (1,1,1),
    segmentsNum: int,
) -> DrawingShapeCompClient
```

- pos: Tuple[float, float, float]，球形状的位置。
- radius: float，球形状的半径。
- color: Tuple[float, float, float]，球形状的颜色, RGB 值, 取值范围为[0,1], 默认为(1,1,1)。
- segmentsNum: int，球形状的网格数量, 默认为 20, 最小为 1, 小于等于 1 后不渲染。

**返回值**：DrawingShapeCompClient，新建的球形状。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
sphere = comp.AddSphereShape((-50, 100, -50), 5, (1,0,0))
```

</TabItem>
</Tabs>

---

### AddTextShape

<Version type="china" add="3.5"/>

<Client/> DrawingCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

新建文本形状。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddTextShape(
    pos: Tuple[float, float, float],
    text: str,
    color: Tuple[float, float, float] = (1,1,1),
) -> DrawingShapeCompClient
```

- pos: Tuple[float, float, float]，文本形状的位置。
- text: str，文本形状的文本。
- color: Tuple[float, float, float]，文本形状的颜色, RGB 值, 取值范围为[0,1], 默认为(1,1,1)。

**返回值**：DrawingShapeCompClient，新建的文本形状。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
text = comp.AddTextShape((20,100,20), "test 测试", (1,0,0))
```

</TabItem>
</Tabs>

---

### GetBoxScale

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 BoxShape 的大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBoxScale() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，BoxShape 的大小。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
box = comp.AddBoxShape((-37, 100, 100),(5,5,5),(1,0,0))
box.GetBoxScale()
```

</TabItem>
</Tabs>

---

### GetColor

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 Shape 的颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetColor() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，Shape 的颜色。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
box = comp.AddBoxShape((-37, 100, 100),(5,5,5),(1,0,0))
box.GetColor()
```

</TabItem>
</Tabs>

---

### GetEndPos

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 LineShape 或 ArrowShape 的结束位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEndPos() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，LineShape 或 ArrowShape 的结束位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
line = comp.AddLineShape((0, 100, 100), (20,20,2),(1,0,0))
line.GetEndPos()
```

</TabItem>
</Tabs>

---

### GetLength

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 ArrowShape 的头部长度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLength() -> float
```


**返回值**：float，ArrowShape 的头部长度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
arrow = comp.AddArrowShape((20,100,20), (20,150,20), (1,0,0), 40, 5)
arrow.GetLength()
```

</TabItem>
</Tabs>

---

### GetPos

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 Shape 的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPos() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，Shape 的位置。

**备注**

- 对于线条形状和箭头形状来说是指起点 Pos, 其他是指形状中心 Pos。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
box = comp.AddBoxShape((-37, 100, 100),(5,5,5),(1,0,0))
box.GetPos()
```

</TabItem>
</Tabs>

---

### GetPriority

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 Shape 的优先级。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPriority() -> int
```


**返回值**：int，Shape 的优先级。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
box = comp.AddBoxShape((-37, 100, 100),(5,5,5),(1,0,0))
box.GetPriority()
```

</TabItem>
</Tabs>

---

### GetRadius

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 CircleShape 或 ArrowShape 或 SphereShape 的半径。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRadius() -> float
```


**返回值**：float，CircleShape 或 ArrowShape 或 SphereShape 的半径。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
circle = comp.AddCircleShape((50,100,50), 5, (1,0,0))
circle.GetRadius()
```

</TabItem>
</Tabs>

---

### GetSegments

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 CircleShape 或 ArrowShape 头部的分段数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSegments() -> int
```


**返回值**：int，CircleShape 或 ArrowShape 头部的分段数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
circle = comp.AddCircleShape((50,100,50), 5, (1,0,0))
circle.GetSegments()
```

</TabItem>
</Tabs>

---

### GetText

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 TextShape 的文本。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetText() -> str
```


**返回值**：str，TextShape 的文本。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
text = comp.AddTextShape((20,100,20), "test 测试", (1,0,0))
text.GetText()
```

</TabItem>
</Tabs>

---

### GetType

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 Shape 的类型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetType() -> ShapeType
```


**返回值**：ShapeType，[Shape 的类型](/docs/docs/scripts/modapi/enums#shapetype)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
box = comp.AddBoxShape((-37, 100, 100),(5,5,5),(1,0,0))
box.GetType()
```

</TabItem>
</Tabs>

---

### GetVisible

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

获取 Shape 是否可见。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetVisible() -> bool
```


**返回值**：bool，Shape 是否可见。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
box = comp.AddBoxShape((-37, 100, 100),(5,5,5),(1,0,0))
box.GetVisible()
```

</TabItem>
</Tabs>

---

### Remove

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

删除 Shape。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Remove() -> bool
```


**返回值**：bool，删除是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
arrow = comp.AddArrowShape((20,100,20), (20,150,20), (1,0,0),40, 5, 2.5)
arrow.Remove()
```

</TabItem>
</Tabs>

---

### RemoveAll

<Version type="china" add="3.5"/>

<Client/> DrawingCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

删除当前所有 Shape。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveAll() -> bool
```


**返回值**：bool，删除是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
comp.RemoveAll()
```

</TabItem>
</Tabs>

---

### SetBoxScale

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置 BoxShape 的大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBoxScale(scale: Tuple[float, float, float]) -> bool
```

- scale: Tuple[float, float, float]，BoxShape 的目标大小。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
box = comp.AddBoxShape((-37,100,100),(5,5,5),(1,0,0))
box.SetBoxScale((9,9,9))
```

</TabItem>
</Tabs>

---

### SetColor

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置 Shape 的颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetColor(color: Tuple[float, float, float]) -> bool
```

- color: Tuple[float, float, float]，Shape 的颜色, RGB 值, 取值范围为[0,1]。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
arrow = comp.AddArrowShape((20,100,20), (20,150,20), (1,0,0),40, 5, 2.5)
arrow.SetColor((0,0,0))
```

</TabItem>
</Tabs>

---

### SetEndPos

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置 LineShape 或 ArrowShape 的结束位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEndPos(endPos: Tuple[float, float, float]) -> bool
```

- endPos: Tuple[float, float, float]，LineShape 或 ArrowShape 的结束位置。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
line = comp.AddLineShape((0, 100, 100), (0,100,50),(1,0,0))
line.SetEndPos((20,200, 20))
```

</TabItem>
</Tabs>

---

### SetLength

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置组成 ArrowShape 头部的长度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLength(length: float) -> bool
```

- length: float，组成 ArrowShape 头部的长度。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
arrow = comp.AddArrowShape((20,100,20), (20,150,20), (1,0,0),40, 5, 2.5)
arrow.SetLength(10)
```

</TabItem>
</Tabs>

---

### SetPos

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置 Shape 的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPos(pos: Tuple[float, float, float]) -> bool
```

- pos: Tuple[float, float, float]，Shape 的目标位置。

**返回值**：bool，设置是否成功。

**备注**

- 对于线条形状和箭头形状来说是指起点 Pos, 其他是指形状中心 Pos。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
line = comp.AddLineShape((0,100,100), (0,100,50),(1,0,0))
line.SetPos((0,100,70))
```

</TabItem>
</Tabs>

---

### SetPriority

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置 Shape 的渲染优先级, 同一像素点处优先渲染优先级高的 Shape, 默认为 0。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPriority(priority: int) -> bool
```

- priority: int，Shape 的渲染优先级。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
arrow = comp.AddArrowShape((20,100,20), (20,150,20), (1,0,0),40, 5, 2.5)
arrow.SetPriority(10)
```

</TabItem>
</Tabs>

---

### SetRadius

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置 CircleShape 或 ArrowShape 或 SphereShape 的半径。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRadius(radius: float) -> bool
```

- radius: float，CircleShape 或 ArrowShape 或 SphereShape 的半径。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
circle = comp.AddCircleShape((50,100,50), 5, (1,0,0))
print circle.SetRadius(2.0)
```

</TabItem>
</Tabs>

---

### SetSegments

<Version type="china" add="3.5"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置组成 ArrowShape 头部的网格数量, 最小为 3。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSegments(segments: int) -> bool
```

- segments: int，组成 ArrowShape 头部的网格数量, 最小为 3。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
arrow = comp.AddArrowShape((20,100,20), (20,150,20), (1,0,0),40, 5, 2.5)
arrow.SetSegments(100)
```

</TabItem>
</Tabs>

---

### SetText

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置 TextShape 的文本内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetText(text: str) -> bool
```

- text: str，TextShape 的文本内容。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
text = comp.AddTextShape((20,100,20), "test 测试", (1,0,0))
text.SetText("tteesstt")
```

</TabItem>
</Tabs>

---

### SetVisible

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> DrawingShapeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateDrawing(levelId)`

设置 Shape 是否可见。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetVisible(visible: bool) -> bool
```

- visible: bool，Shape 是否可见。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateDrawing(levelId)
arrow = comp.AddArrowShape((20,100,20), (20,150,20), (1,0,0),40, 5, 2.5)
arrow.SetVisible(False)
```

</TabItem>
</Tabs>

---
