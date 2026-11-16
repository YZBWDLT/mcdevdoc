---
sidebar_position: 9
---

# 实体类型

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录实体类型相关的接口，共 4 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/shitileixing.html"/>

---

### GetEngineType

<Server/> EngineTypeComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEngineType(entityId)`

获取实体类型，主要用于判断实体是否属于某一类型的生物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEngineType() -> int
```


**返回值**：int，详见[EntityType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/EntityType.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
from mod_log import logger as logger
comp = serverApi.GetEngineCompFactory().CreateEngineType(entityId)
entityType = comp.GetEngineType()
EntityTypeEnum = serverApi.GetMinecraftEnum().EntityType
# 判断是否是生物(Mob)
if entityType & EntityTypeEnum.Mob == EntityTypeEnum.Mob:
    logger.info("{} is Mob".format(comp.GetEngineTypeStr()))
# 判断是否是弹射物(Projectile)
if entityType & EntityTypeEnum.Projectile == EntityTypeEnum.Projectile:
    logger.info("{} is Projectile".format(comp.GetEngineTypeStr()))
```

</TabItem>
</Tabs>

<Client/> EngineTypeComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateEngineType(entityId)`

获取实体类型，主要用于判断实体是否属于某一类型的生物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEngineType() -> int
```


**返回值**：int，详见[EntityType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/EntityType.html)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
from mod_log import logger as logger
comp = clientApi.GetEngineCompFactory().CreateEngineType(entityId)
entityType = comp.GetEngineType()
EntityTypeEnum = clientApi.GetMinecraftEnum().EntityType
# 判断是否是生物(Mob)
if entityType & EntityTypeEnum.Mob == EntityTypeEnum.Mob:
    logger.info("{} is Mob".format(comp.GetEngineTypeStr()))
# 判断是否是弹射物(Projectile)
if entityType & EntityTypeEnum.Projectile == EntityTypeEnum.Projectile:
    logger.info("{} is Projectile".format(comp.GetEngineTypeStr()))
```

</TabItem>
</Tabs>

---

### GetEngineTypeStr

<Server/> EngineTypeComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateEngineType(entityId)`

获取实体的类型名称。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEngineTypeStr() -> str
```


**返回值**：str，实体类型名称，如 minecraft:husk。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEngineType(entityId)
comp.GetEngineTypeStr()
```

</TabItem>
</Tabs>

<Client/> EngineTypeComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateEngineType(entityId)`

获取实体的类型名称。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEngineTypeStr() -> str
```


**返回值**：str，实体类型名称，如 minecraft:husk。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateEngineType(entityId)
strType = comp.GetEngineTypeStr()
```

</TabItem>
</Tabs>

---

### GetEntityDefinitions

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取实体的命名空间 ID 及其当前和之前的定义组件群。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityDefinitions() -> List[str]
```


**返回值**：List[str]，实体的命名空间 ID 及其当前和之前的定义组件群的 list。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetEntityDefinitions()
```

</TabItem>
</Tabs>

---

### GetEntityNBTTags

<Server/> EntityDefinitionsCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)`

获取实体的 NBT 标签。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityNBTTags() -> Optional[Dict[str, Any]]
```


**返回值**：Optional[Dict[str, Any]]，实体 NBT 标签的 dict。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateEntityDefinitions(entityId)
result = comp.GetEntityNBTTags()
```

</TabItem>
</Tabs>

---
