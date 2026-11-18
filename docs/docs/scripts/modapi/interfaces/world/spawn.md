---
sidebar_position: 6
---

# 生物生成

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录生物生成相关的接口，共 3 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/shengwushengcheng.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### GetEntityLimit

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

获取世界最大可生成实体数量上限。可生成实体的含义见 [SetEntityLimit](/docs/docs/scripts/modapi/interfaces/world/spawn#setentitylimit)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityLimit() -> int
```


**返回值**：int，最大可生成实体数量上限。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
print serverApi.GetEntityLimit()
```

</TabItem>
</Tabs>

---

### SetEntityLimit

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/>

模块级函数，直接调用。

设置世界最大可生成实体数量上限。可生成实体指具有 spawnrule 的实体。当前世界上被加载的可生成实体数量超过这个上限时，生物就不会再通过 spawnrule 刷出。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityLimit(num: int) -> bool
```

- num: int，最大可生成实体数量上限。

**返回值**：bool，返回是否设置成功。

**备注**

- 该上限与生物 json 文件中配置的种群密度共同作用，比如上限是 200，但种群密度是 10，那么该生物随机生成不会超过 10 个。此外生物上限还和适合生成的区块容量相关，设置上限过高的话可能因其他限制条件而不能达到该高度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
print serverApi.SetEntityLimit(300)
```

</TabItem>
</Tabs>

---

### SpawnCustomModule

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Server/> MobSpawnComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateMobSpawn(levelId)`

设置自定义刷怪。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SpawnCustomModule(
    biomeType: int,
    change: int,
    entityType: int,
    probability: int,
    minCount: int,
    maxCount: int,
    environment: int,
    minBrightness: int,
    maxBrightness: int,
    minHeight: int,
    maxHeight: int,
) -> bool
```

- biomeType: int，[BiomeType 枚举](/docs/docs/scripts/modapi/enums#biometype)。
- change: int，[Change 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Change.html)。
- entityType: int，[EntityType 枚举](/docs/docs/scripts/modapi/enums#entitytype)。
- probability: int，生成的权重[1, 10]。
- minCount: int，最小生成数量[0, 10]。
- maxCount: int，最大生成数量[0, 10]。
- environment: int，1:生成在表面；2:生成在水里。
- minBrightness: int，生成该生物时的最小光照[1, 15]，不设置时使用默认值。
- maxBrightness: int，生成该生物时的最大光照[1, 15]，不设置时使用默认值。
- minHeight: int，生成该生物时最小的海拔高度[0, 256]，不设置时使用默认值。
- maxHeight: int，生成该生物时最大的海拔高度[0, 256]，不设置时使用默认值。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateMobSpawn(levelId)
comp.SpawnCustomModule(BiomeType.river,Change.Add,EntityType.Dolphin,10,1,10,2)
```

</TabItem>
</Tabs>

---
