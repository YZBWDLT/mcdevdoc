---
sidebar_position: 16
---

# Molang 表达式

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录Molang 表达式相关的接口，共 9 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/molang-biaodashi.html"/>

---

### EvalMolangExpression

<Server/> QueryVariableComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateQueryVariable(entityId)`

在实体上下文上执行 molang 表达式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EvalMolangExpression(expression: str) -> Dict[str, Any]
```

- expression: str，molang 表达式。

**返回值**：Dict[str, Any]，执行结果在"value"的键中，如果有执行错误，通过"error"的键返回错误信息。

**备注**

- molang 最初是为渲染设计的，所以在服务端上大部分接口是无法获取到数据的。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.EvalMolangExpression('query.can_fly')
```

</TabItem>
</Tabs>

<Client/> QueryVariableComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)`

在实体上下文上执行 molang 表达式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EvalMolangExpression(expression: str) -> Dict[str, Any]
```

- expression: str，molang 表达式。

**返回值**：Dict[str, Any]，执行结果在"value"的键中，如果有执行错误，通过"error"的键返回错误信息。

**备注**

- `本接口执行时没有渲染上下文，某些molang无法通过该种方式获取到正确的值，如query.actor_count【获取最近一帧渲染实体数量】 会永远返回0。`。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.EvalMolangExpression('query.can_fly')
```

</TabItem>
</Tabs>

---

### Get

<Client/> QueryVariableComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)`

获取某一个实体计算节点的值，如果不存在返回注册时的默认值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Get(variableName: str) -> float
```

- variableName: str，节点名称，必须以"query.mod."开头。

**返回值**：float，节点的值。

**备注**

- 自定义的"query.mod.xxxx"类型的 molang 变量需要先调用 [Register](/docs/docs/scripts/modapi/entity/molang#register) 接口进行注册，才能正常设置/读取。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.Get('query.mod.state')
```

</TabItem>
</Tabs>

---

### GetAllProperties

<Server/> QueryVariableComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateQueryVariable(entityId)`

获取实体属性列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAllProperties() -> Tuple[str]
```


**返回值**：Tuple[str]，所有已注册 properties，每个 str 为 properties 的名称，如果有错误，返回 None。

**备注**

- 可配合 query.property，使用 [EvalMolangExpression](/docs/docs/scripts/modapi/entity/molang#evalmolangexpression) 获取实体属性的值。在客户端只能获取到 client_sync 为 true 的属性。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.GetAllProperties()
```

</TabItem>
</Tabs>

---

### GetMolangValue

<Client/> QueryVariableComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)`

获取实体 molang 变量的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMolangValue(molangName: str) -> Union[float, int]
```

- molangName: str，molang 变量名称，如 query.can_fly。

**返回值**：Union[float, int]，节点的值，不存在返回 None。

**备注**

- 因为没有渲染上下文，某些 molang 无法通过该种方式获取到正确的值，如 query.is_first_person、variable.is_first_person 等。
- 当 molangName 传入 query.get_name 或者 query.owner_identifier 等需要返回字符串的变量值时，返回其 hash64，类型是个 long，可以用于与 [GetStringHash64](/docs/docs/scripts/modapi/entity/molang#getstringhash64) 获取的值比较。query.get_name：返回生物的名字；query.owner_identifier：返回其 owner 的 identifier。
- 该接口无法进行 molang 运算，例如无法计算 query.average_frame_time(20)。
- 该接口对客户端实体([CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr))使用时，涉及到服务端逻辑的 molang 无法返回正确的值，比如 query.health、query.in_water、query.can_fly 等等。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.GetMolangValue('query.can_fly')
```

</TabItem>
</Tabs>

---

### GetStringHash64

<Client/> QueryVariableComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateQueryVariable(levelId)`

返回字符串变量的 hash64。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetStringHash64(key: str) -> int
```

- key: str，需要计算的字符串变量,如“steve"。

**返回值**：int，结果值，如果传入不是字符串则返回 None。

**备注**

- 可以配合 [GetMolangValue](/docs/docs/scripts/modapi/entity/molang#getmolangvalue) 使用，可以获取 query.get_name 或者 query.owner_identifier 等返回 hash64 的是不是等于某个值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(levelId)
result = comp.GetStringHash64('steve')
```

</TabItem>
</Tabs>

---

### Register

<Client/> QueryVariableComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateQueryVariable(levelId)`

注册实体计算节点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Register(variableName: str, defalutValue: float) -> bool
```

- variableName: str，节点名称，必须以"query.mod."开头。
- defalutValue: float，默认值。

**返回值**：bool，注册是否成功。

**备注**

- 注意节点的值使用单精度浮点数存储，如果用来设置整数，那么值大于 16777216（或小于-16777216）时就会有误差。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(levelId)
result = comp.Register('query.mod.state', 0.0)
```

</TabItem>
</Tabs>

---

### Set

<Client/> QueryVariableComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)`

设置某一个实体计算节点的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Set(variableName: str, value: float) -> bool
```

- variableName: str，节点名称，必须以"query.mod."开头。
- value: float，计算节点的值。

**返回值**：bool，设置是否成功。

**备注**

- 注意节点的值使用单精度浮点数存储，如果用来设置整数，那么值大于 16777216（或小于-16777216）时就会有误差。
- 自定义的"query.mod.xxxx"类型的 molang 变量需要先调用 [Register](/docs/docs/scripts/modapi/entity/molang#register) 接口进行注册，才能正常设置/读取。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.Set('query.mod.state', 1.0)
```

</TabItem>
</Tabs>

---

### SetPropertyValue

<Server/> QueryVariableComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateQueryVariable(entityId)`

设置实体属性的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPropertyValue(propertyName: str, value: str) -> bool
```

- propertyName: str，属性名，如 minecraft:has_nectar。
- value: str，属性值支持 int/float/bool/enum(str)，支持 molang 表达式。

**返回值**：bool，是否执行成功。

**备注**

- molang 表达式需无副作用，例如不能设置 molang 变量的值，例如"variable.moo = 1;return variable.moo;"。query 仅支持 query.has_property、query.property。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateQueryVariable(entityId)
result = comp.SetPropertyValue('minecraft:has_nectar', True)
```

</TabItem>
</Tabs>

---

### UnRegister

<Client/> QueryVariableComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateQueryVariable(levelId)`

注销实体计算节点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnRegister(variableName: str) -> bool
```

- variableName: str，节点名称，必须以"query.mod."开头。

**返回值**：bool，注销是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateQueryVariable(levelId)
result = comp.UnRegister('query.mod.state')
```

</TabItem>
</Tabs>

---
