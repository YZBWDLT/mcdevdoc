---
sidebar_position: 106
---

# 数学

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录数学相关的接口，共 5 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/tongyong/shuxue.html"/>

---

### GetDirFromRot

<Server/>

模块级函数，直接调用。

通过旋转角度获取朝向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDirFromRot(rot: Tuple[float, float]) -> Tuple[float, float, float]
```

- rot: Tuple[float, float]，俯仰角度及绕竖直方向的角度，单位是角度。

**返回值**：Tuple[float, float, float]，玩家朝向的单位向量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
direction = serverApi.GetDirFromRot((0, 0))
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

通过旋转角度获取朝向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDirFromRot(rot: Tuple[float, float]) -> Tuple[float, float, float]
```

- rot: Tuple[float, float]，俯仰角度及绕竖直方向的角度，单位是角度。

**返回值**：Tuple[float, float, float]，玩家朝向的单位向量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
direction = clientApi.GetDirFromRot((0, 0))
```

</TabItem>
</Tabs>

---

### GetIntPos

<Server/>

模块级函数，直接调用。

获取坐标所在方块的位置，即浮点数坐标向下取整后的整数坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetIntPos(pos: Tuple[float, float, float]) -> Tuple[int, int, int]
```

- pos: Tuple[float, float, float]，坐标元组。

**返回值**：Tuple[int, int, int]，坐标所在方块的位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
serverApi.GetIntPos((1.2,1.3,1.4))
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取坐标所在方块的位置，即浮点数坐标向下取整后的整数坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetIntPos(pos: Tuple[float, float, float]) -> Tuple[int, int, int]
```

- pos: Tuple[float, float, float]，坐标元组。

**返回值**：Tuple[int, int, int]，坐标所在方块的位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.GetIntPos((1.2,1.3,1.4))
```

</TabItem>
</Tabs>

---

### GetLocalPosFromWorld

<Server/>

模块级函数，直接调用。

获取基于实体的世界坐标对应的局部坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLocalPosFromWorld(pos: Tuple[float, float, float], entityId: str) -> Tuple[float, float, float]
```

- pos: Tuple[float, float, float]，基于实体的世界坐标。
- entityId: str，实体 id。

**返回值**：Tuple[float, float, float]，世界坐标对应的局部坐标。

**备注**

- 可能存在精度差。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
position = serverApi.GetLocalPosFromWorld((90, 65, -95), entityId)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取基于实体的世界坐标对应的局部坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLocalPosFromWorld(pos: Tuple[float, float, float], entityId: str) -> Tuple[float, float, float]
```

- pos: Tuple[float, float, float]，基于实体的世界坐标。
- entityId: str，实体 id。

**返回值**：Tuple[float, float, float]，世界坐标对应的局部坐标。

**备注**

- 可能存在精度差。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
position = clientApi.GetLocalPosFromWorld((90, 65, -95), entityId)
```

</TabItem>
</Tabs>

---

### GetRotFromDir

<Server/>

模块级函数，直接调用。

通过朝向获取旋转角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRotFromDir(dir: Tuple[float, float, float]) -> Tuple[float, float]
```

- dir: Tuple[float, float, float]，玩家朝向的单位向量。

**返回值**：Tuple[float, float]，俯仰角度及绕竖直方向的角度，单位是角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
rot = serverApi.GetRotFromDir((1, 0, 1))
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

通过朝向获取旋转角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRotFromDir(dir: Tuple[float, float, float]) -> Tuple[float, float]
```

- dir: Tuple[float, float, float]，玩家朝向的单位向量。

**返回值**：Tuple[float, float]，俯仰角度及绕竖直方向的角度，单位是角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
rot = clientApi.GetRotFromDir((1, 0, 1))
```

</TabItem>
</Tabs>

---

### GetWorldPosFromLocal

<Server/>

模块级函数，直接调用。

获取基于实体的局部坐标对应的世界坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetWorldPosFromLocal(pos: Tuple[float, float, float], entityId: str) -> Tuple[float, float, float]
```

- pos: Tuple[float, float, float]，基于实体的局部坐标。
- entityId: str，实体 id。

**返回值**：Tuple[float, float, float]，局部坐标对应的世界坐标。

**备注**

- 可能存在精度差。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
position = serverApi.GetWorldPosFromLocal((0, 0, 1), entityId)
```

</TabItem>
</Tabs>

<Client/>

模块级函数，直接调用。

获取基于实体的局部坐标对应的世界坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetWorldPosFromLocal(pos: Tuple[float, float, float], entityId: str) -> Tuple[float, float, float]
```

- pos: Tuple[float, float, float]，基于实体的局部坐标。
- entityId: str，实体 id。

**返回值**：Tuple[float, float, float]，局部坐标对应的世界坐标。

**备注**

- 可能存在精度差。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
position = clientApi.GetWorldPosFromLocal((0, 0, 1), entityId)
```

</TabItem>
</Tabs>

---
