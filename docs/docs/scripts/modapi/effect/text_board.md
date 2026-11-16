---
sidebar_position: 5
---

# 文字面板

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录文字面板相关的接口，共 11 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/texiao/wenzimianban.html"/>

---

### CreateTextBoardInWorld

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

创建文字面板。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateTextBoardInWorld(
    text: str,
    textColor: Tuple[float, float, float, float],
    boardColor: Optional[Tuple[float, float, float, float]] = None,
    faceCamera: bool = True,
) -> int
```

- text: str，文字显示内容。
- textColor: Tuple[float, float, float, float]，文字颜色的 RGBA 值，范围 0-1。
- boardColor: Optional[Tuple[float, float, float, float]]，可选参数，默认 None，设置为黑色，面板颜色的 RGBA 值，范围 0-1。
- faceCamera: bool，是否始终朝向相机, 默认为 True。

**返回值**：int，返回生成的 id，如果生成失败，返回 None。

**备注**

- 切换维度后会自动隐藏非本维度创建的而且没有绑定实体的文字面板, 回到该维度后会自动重新显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
comp.CreateTextBoardInWorld("我显示在世界坐标位置",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1), True)
```

</TabItem>
</Tabs>

---

### RemoveTextBoard

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

删除文字面板。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveTextBoard(boardId: int) -> bool
```

- boardId: int，创建的时候返回的 id。

**返回值**：bool，是否删除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("我显示在世界坐标位置",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1), True)
if boardId:
    comp.RemoveTextBoard(boardId)
```

</TabItem>
</Tabs>

---

### SetBoardBackgroundColor

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

修改背景颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBoardBackgroundColor(boardId: int, backgroundColor: Tuple[float, float, float, float]) -> bool
```

- boardId: int，文字面板的 id。
- backgroundColor: Tuple[float, float, float, float]，颜色的 RGBA 值，范围 0-1。

**返回值**：bool，返回是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("我显示在玩家头顶",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1),True)
if boardId:
    comp.SetBoardBindEntity(boardId, clientApi.GetLocalPlayerId(), (0.0, 1.5, 0.0), (0.0, 0.0, 0.0))
    comp.SetBoardBackgroundColor(boardId, (1.0, 1.0, 1.0, 1.0))
```

</TabItem>
</Tabs>

---

### SetBoardBindEntity

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

文字面板绑定实体对象。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBoardBindEntity(
    boardId: int,
    bindEntityId: str,
    offset: Tuple[float, float, float],
    rot: Tuple[float, float, float],
) -> bool
```

- boardId: int，文字面板的 id。
- bindEntityId: str，绑定 entity 的 Id; 如果为 None，则为取消实体绑定, 此时下面参数为世界坐标和旋转。
- offset: Tuple[float, float, float]，相对于实体的偏移量。
- rot: Tuple[float, float, float]，相对于实体的偏移角度。

**返回值**：bool，返回是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("我显示在玩家头顶",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1),True)
if boardId:
    comp.SetBoardBindEntity(boardId, clientApi.GetLocalPlayerId(), (0.0, 1.5, 0.0), (0.0, 0.0, 0.0))
```

</TabItem>
</Tabs>

---

### SetBoardDepthTest

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

设置是否开启深度测试, 默认状态下是开启。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBoardDepthTest(boardId: int, depthTest: bool) -> bool
```

- boardId: int，文字面板的 id。
- depthTest: bool，True 为开启深度测试,False 为不开启。

**返回值**：bool，返回是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("我显示在玩家头顶",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1),True)
if boardId:
    comp.SetBoardBindEntity(boardId, clientApi.GetLocalPlayerId(), (0.0, 1.5, 0.0), (0.0, 0.0, 0.0))
    comp.SetBoardDepthTest(boardId, False)
```

</TabItem>
</Tabs>

---

### SetBoardFaceCamera

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

设置文字面板的朝向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBoardFaceCamera(boardId: int, faceCamera: bool = True) -> bool
```

- boardId: int，文字面板的 id。
- faceCamera: bool，是否始终朝向相机, 默认为 True。

**返回值**：bool，返回是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("我显示在玩家头顶",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1),True)
if boardId:
    comp.SetBoardBindEntity(boardId, clientApi.GetLocalPlayerId(), (0.0, 1.5, 0.0), (0.0, 0.0, 0.0))
    comp.SetBoardFaceCamera(boardId, True)
```

</TabItem>
</Tabs>

---

### SetBoardPos

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

修改位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBoardPos(boardId: int, pos: Tuple[float, float, float]) -> bool
```

- boardId: int，文字面板的 id。
- pos: Tuple[float, float, float]，坐标。

**返回值**：bool，返回是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("我显示在玩家头顶",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1),True)
if boardId:
    comp.SetBoardBindEntity(boardId, clientApi.GetLocalPlayerId(), (0.0, 1.5, 0.0), (0.0, 0.0, 0.0))
    comp.SetBoardPos(boardId, (0.0, 3.0, 0.0))
```

</TabItem>
</Tabs>

---

### SetBoardRot

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

修改旋转角度, 若设置了文本朝向相机，则旋转角度的修改不会生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBoardRot(boardId: int, rot: Tuple[float, float, float]) -> bool
```

- boardId: int，文字面板的 id。
- rot: Tuple[float, float, float]，角度(不是弧度)。

**返回值**：bool，返回是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("我显示在玩家头顶",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1),True)
if boardId:
    comp.SetBoardBindEntity(boardId, clientApi.GetLocalPlayerId(), (0.0, 1.5, 0.0), (0.0, 0.0, 0.0))
    comp.SetBoardRot(boardId, (45.0, 90.0, 0.0))
```

</TabItem>
</Tabs>

---

### SetBoardScale

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

内容整体缩放。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBoardScale(boardId: int, scale: Tuple[float, float]) -> bool
```

- boardId: int，文字面板的 id。
- scale: Tuple[float, float]，x,y 方向上的缩放值,要求值大于 0,正常状态下是(1.0,1.0)。

**返回值**：bool，返回是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("我显示在玩家头顶",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1),True)
if boardId:
    comp.SetBoardBindEntity(boardId, clientApi.GetLocalPlayerId(), (0.0, 1.5, 0.0), (0.0, 0.0, 0.0))
    comp.SetBoardScale(boardId, (2.0, 2.0))
```

</TabItem>
</Tabs>

---

### SetBoardTextColor

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

修改字体颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBoardTextColor(boardId: int, textColor: Tuple[float, float, float, float]) -> bool
```

- boardId: int，文字面板的 id。
- textColor: Tuple[float, float, float, float]，颜色的 RGBA 值，范围 0-1。

**返回值**：bool，返回是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("我显示在玩家头顶",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1),True)
if boardId:
    comp.SetBoardBindEntity(boardId, clientApi.GetLocalPlayerId(), (0.0, 1.5, 0.0), (0.0, 0.0, 0.0))
    comp.SetBoardTextColor(boardId, (1.0, 1.0, 0.0, 0.8))
```

</TabItem>
</Tabs>

---

### SetText

<Client/> TextBoardComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())`

修改文字面板内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetText(boardId: int, text: str) -> bool
```

- boardId: int，文字面板 id。
- text: str，文字内容。

**返回值**：bool，是否修改成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
boardId = comp.CreateTextBoardInWorld("初始文字",(0.5, 0.4, 0.3, 0.8),(0, 0, 0, 1),True)
if boardId:
    comp.SetText(boardId, "修改后的文字")
```

</TabItem>
</Tabs>

---
