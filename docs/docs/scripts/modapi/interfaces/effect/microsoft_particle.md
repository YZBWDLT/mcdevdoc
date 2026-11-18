---
sidebar_position: 4
---

# 微软粒子

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录微软粒子相关的接口，共 36 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/texiao/weiruanlizi.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### BindEntity

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

绑定粒子发射器到指定实体的指定骨骼上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindEntity(
    par_id: int,
    entity_id: Union[str, int],
    bone_name: str = "body",
    offset: Tuple[float, float, float] = (0, 0, 0),
    rotation: Tuple[float, float, float] = (0, 0, 0),
) -> bool
```

- par_id: int，粒子发射器 id 需要已经创建且未被销毁的粒子发射器。
- entity_id: Union[str, int]，需要绑定的实体 id。
- bone_name: str，需要绑定的骨骼名称(不区分大小写) 默认值为"body"，传入空字符串时代表根骨骼。包含多个根骨骼的情况下，选择按骨骼名称排序后的首个根骨骼。
- offset: Tuple[float, float, float]，三维 表示粒子发射器的绑定偏移 默认值为(0, 0, 0)。
- rotation: Tuple[float, float, float]，表示粒子发射器绑定的三维旋转(角度制，按照 ZYX 顺序旋转) 默认值为(0, 0, 0)。

**返回值**：bool，表示调用是否成功。

**备注**

- 绑定变换的计算是在局部空间下完成的。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.Create("netease:tutorial_particle")
comp.BindEntity(parId, localId, "rightitem", (0, 0, 0), (0, 0, 0))
```

</TabItem>
</Tabs>

---

### BindModel

<Version type="china" add="1.22"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(clientApi.GetLevelId())`

绑定粒子发射器到指定骨骼模型的指定骨骼上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindModel(
    par_id: int,
    model_id: int,
    bone_name: str = "root",
    offset: Tuple[float, float, float] = (0, 0, 0),
    rotation: Tuple[float, float, float] = (0, 0, 0),
) -> bool
```

- par_id: int，粒子发射器 id 需要已经创建且未被销毁的粒子发射器。
- model_id: int，绑定的骨骼模型的 ID（见 model 组件的 [GetModelId](/docs/docs/scripts/modapi/interfaces/custom_ui/control#getmodelid)）。
- bone_name: str，绑定具体骨骼的名称(不区分大小写)，默认值为"root"。
- offset: Tuple[float, float, float]，三维 表示粒子发射器的绑定偏移 默认值为(0, 0, 0)。
- rotation: Tuple[float, float, float]，表示粒子发射器绑定的三维旋转(角度制，按照 ZYX 顺序旋转) 默认值为(0, 0, 0)。

**返回值**：bool，表示调用是否成功。

**备注**

- 绑定变换的计算是在局部空间下完成的，没有指定骨骼的情况下默认绑定到"root"上，如果 root 不存在则该粒子不会显示，也不会被销毁。
- 切换至其他骨骼模型后导致 model_id 改变，所以绑定到原 model_id 上的粒子发射器也会一起消失。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(clientApi.GetLevelId())

par_Id = comp.Create("netease:tutorial_particle")
comp.BindModel(par_Id, model_id, "root", (0, 0, 0), (0, 0, 0))
```

</TabItem>
</Tabs>

---

### Create

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

创建粒子发射器, 创建后立即播放。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Create(
    effect_name: str,
    offset: Tuple[float, float, float] = (0, 0, 0),
    rotation: Tuple[float, float, float] = (0, 0, 0),
) -> int
```

- effect_name: str，粒子发射器名称(粒子发射器 json 文件中的 identifier)。
- offset: Tuple[float, float, float]，三维 表示在某处创建粒子发射器 默认值为(0, 0, 0)。
- rotation: Tuple[float, float, float]，粒子发射器创建后使用的三维旋转(使用角度制，按照 ZYX 顺序旋转) 默认值为(0, 0, 0)。

**返回值**：int，粒子发射器实例 ID 返回 0 表示创建失败。

**备注**

- 粒子发射器 json 文件可以通过微软官方编辑器 SnowStorm 进行创建编辑，开发者们可以通过访问在线网站 https://snowstorm.app 或在 Visual Studio Code 扩展商店中搜索"snowstorm"来使用这个编辑器。
- 粒子发射器 json 文件应存放在 资源包/particles 路径下。
- 粒子发射器 json 文件内容不应该包含中文，否则会无法解析。
- 请注意，如果粒子发射器出现在世界空间(即 没有绑定实体)，即使粒子发射器 json 文件定义了 minecraft:emitter_lifetime_looping 组件，也只会播放一次或一个周期，随后销毁。
- 部分原版粒子使用了 minecraft:emitter_rate_manual 组件，需要额外调用 [EmitManually](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#emitmanually) 函数才能发射粒子。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
parId = comp.Create("netease:tutorial_particle", (0, 0, 0), (0, 0, 0))
```

</TabItem>
</Tabs>

---

### CreateBindEntityNew

<Version type="china" add="2.11"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

创建粒子发射器并绑定到指定实体的指定骨骼上, 创建后立即播放。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateBindEntityNew(
    effect_name: str,
    entity_id: Union[str, int],
    bone_name: str,
    offset: Tuple[float, float, float] = (0, 0, 0),
    rotation: Tuple[float, float, float] = (0, 0, 0),
) -> int
```

- effect_name: str，粒子发射器名称(粒子发射器 json 文件中的 identifier)。
- entity_id: Union[str, int]，需要绑定的实体 id。
- bone_name: str，需要绑定的骨骼名称(不区分大小写) 默认值为"body",传入空字符串时代表根骨骼。包含多个根骨骼的情况下，选择按骨骼名称排序后的首个根骨骼。
- offset: Tuple[float, float, float]，三维 表示粒子发射器的绑定偏移 默认值为(0, 0, 0)。
- rotation: Tuple[float, float, float]，表示粒子发射器绑定的三维旋转(使用角度制，按照 ZYX 顺序旋转) 默认值为(0, 0, 0)。

**返回值**：int，粒子发射器实例 id 返回 0 表示创建失败。

**备注**

- 粒子发射器 json 文件可以通过微软官方编辑器 SnowStorm 进行创建编辑，开发者们可以通过访问在线网站 https://snowstorm.app 或在 Visual Studio Code 扩展商店中搜索"snowstorm"来使用这个编辑器。
- 粒子发射器 json 文件应存放在 资源包/particles 路径下。
- 粒子发射器 json 文件内容不应该包含中文，否则会无法解析。
- 绑定变换的计算是在局部空间下完成的。
- 部分原版粒子使用了 minecraft:emitter_rate_manual 组件，需要额外调用 [EmitManually](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#emitmanually) 函数才能发射粒子。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntityNew("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
```

</TabItem>
</Tabs>

---

### EmitManually

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

手动发射粒子一次。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EmitManually(par_id: int) -> bool
```

- par_id: int，粒子发射器 id 需要已经创建且未被销毁的粒子发射器。

**返回值**：bool，表示调用是否成功。

**备注**

- 部分原版粒子使用了 minecraft:emitter_rate_manual 组件，在创建粒子发射器后不会自动发射粒子，需要额外调用该函数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("minecraft:water_evaporation_manual", localId, "rightitem")
comp.EmitManually(parId) # 手动发射一次粒子
```

</TabItem>
</Tabs>

---

### Exist

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

判断指定粒子发射器是否存在。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Exist(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，返回 True 时，表示指定的粒子发射器存在于场景中。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.Exist(parId)
comp.RemoveAll()
print comp.Exist(parId)
```

</TabItem>
</Tabs>

---

### GetActiveDuration

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

获取粒子发射器的激活周期。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetActiveDuration(par_id: int) -> float
```

- par_id: int，粒子发射器 id。

**返回值**：float，表示粒子发射器激活周期 粒子发射器无效时会返回 0.0。

**备注**

- 粒子发射器的激活周期在其对应的 json 文件(资源包/particles/xxx.json)中定义。
- 粒子发射器的播放周期等于 激活周期(active_time) + 休眠周期(sleep_time)。
- 对于没有定义激活周期的粒子发射器，其返回值为一个较大的数字(大约为 1000000)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.GetActiveDuration(parId)
```

</TabItem>
</Tabs>

---

### GetBindingID

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

返回粒子绑定的实体 id，没有则返回"0"。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindingID(par_id: int) -> str
```

- par_id: int，粒子发射器 id。

**返回值**：str，绑定的实体 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.Create("netease:tutorial_particle")
comp.BindEntity(parId, localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.GetBindingID(parId)
```

</TabItem>
</Tabs>

---

### GetBindingModelID

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

返回绑定的骨骼模型 id 没有则返回-1。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindingModelID(par_id: int) -> int
```

- par_id: int，粒子发射器 id。

**返回值**：int，绑定的骨骼模型 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
compFactory = clientApi.GetEngineCompFactory()
comp = compFactory.CreateParticleSystem(clientApi.GetLevelId())
parId = comp.Create("netease:tutorial_particle")
comp.BindModel(parId, modelId, 'root', (0, 0, 0), (0, 0, 0))
print comp.GetBindingModelID(parId)
```

</TabItem>
</Tabs>

---

### GetDuration

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

获取粒子发射器的播放周期(激活+休眠时间)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetDuration(par_id: int) -> float
```

- par_id: int，粒子发射器 id。

**返回值**：float，表示粒子发射器播放周期 粒子发射器无效时会返回 0.0。

**备注**

- 粒子发射器的播放周期在其对应的 json 文件(资源包/particles/xxx.json)中定义。
- 粒子发射器的播放周期等于 激活周期(active_time) + 休眠周期(sleep_time)。
- 对于没有定义播放周期的粒子发射器，其返回值为一个较大的数字(大约为 1000000)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.GetDuration(parId)
```

</TabItem>
</Tabs>

---

### GetFacingMode

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

返回粒子发射器的粒子朝向模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFacingMode(par_id: int) -> str
```

- par_id: int，粒子发射器 id。

**返回值**：str，粒子朝向模式字符串 返回字符串"none"表示非法。

**备注**

- 朝向模式暂不支持使用脚本设置，可以在粒子编辑器 SnowStorm 中编辑该属性:[https://snowstorm.app](https://snowstorm.app)。
- 目前支持的朝向模式如下:`rotate_xyz 粒子朝向相机，面片与相机视角垂直
 rotate_y 粒子朝向相机，但是面片只旋转世界Y轴
 lookat_xyz 粒子旋转XYZ轴看向相机位置
 lookat_y 粒子仅旋转Y轴来看向相机位置
 lookat_direction 可以选择根据速度方向或者自定义方向来决定粒子面片朝向
 direction_x 粒子面片朝向发射器的x轴
 direction_y 粒子面片朝向发射器的y轴
 direction_z 粒子面片朝向发射器的z轴
 emitter_transform_xy 跟随粒子发射器的xy面朝向
 emitter_transform_xz 跟随粒子发射器的xz面朝向
 emitter_transform_yz 跟随粒子发射器的yz面朝向`。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.GetFacingMode(parId)
```

</TabItem>
</Tabs>

---

### GetLoopAge

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

获取粒子发射器当前播放周期内已播放的时间。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLoopAge(par_id: int) -> float
```

- par_id: int，粒子发射器 id。

**返回值**：float，表示粒子发射器在当前播放周期内已播放的时间 粒子发射器 id 无效时会返回 0.0。

**备注**

- 0.0 \<= 已播放的时间 \<= 粒子发射器播放周期。
- 返回的周期内已播放时间，受到 [SetTimeScale](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#settimescale)、[Replay](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#replay) 和 [PlayAt](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#playat) 等函数的影响。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.GetLoopAge(parId)
comp.PlayAt(parId, 0.5)
print comp.GetLoopAge(parId)
```

</TabItem>
</Tabs>

---

### GetPos

<Version type="china" add="1.24"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

获取粒子发射器位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPos(par_id: int, is_local: bool) -> Tuple
```

- par_id: int，粒子发射器 id。
- is_local: bool，是否获取局部空间。

**返回值**：Tuple，表示粒子发射器位置的三维向量。

**备注**

- 如果粒子没有进行绑定(即 没有放在世界空间)，则它的局部空间位置等于世界空间位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId0 = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 1, 0), (0, 0, 0))
parId1 = comp.Create("netease:tutorial_particle", (0, 1, 0), (0, 0, 0))
print 'local position:', comp.GetPos(parId0, True)
print 'local position:', comp.GetPos(parId1)

print 'world position:', comp.GetPos(parId0, False)
print 'world position:', comp.GetPos(parId1, False)
```

</TabItem>
</Tabs>

---

### GetRot

<Version type="china" add="1.24"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

获取粒子发射器局部旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRot(par_id: int, is_local: bool) -> Tuple
```

- par_id: int，粒子发射器 id。
- is_local: bool，表示是否获取局部空间旋转 默认值为 True(即 默认获取局部空间旋转)。

**返回值**：Tuple，粒子发射器三维旋转(使用角度制)。

**备注**

- 如果粒子发射器没有进行绑定，则它的局部空间旋转等于世界空间旋转。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (45, 0, 45))
print comp.GetRot(parId) # True
print comp.GetRot(parId, False)
```

</TabItem>
</Tabs>

---

### GetSleepDuration

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

获取粒子发射器的休眠周期。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSleepDuration(par_id: int) -> float
```

- par_id: int，粒子发射器 id。

**返回值**：float，表示粒子发射器休眠周期 粒子发射器无效时会返回 0.0。

**备注**

- 粒子发射器的休眠周期在其对应的 json 文件(资源包/particles/xxx.json)中定义。
- 粒子发射器的播放周期等于 激活周期(active_time) + 休眠周期(sleep_time)。
- 对于没有定义休眠周期的粒子发射器，其返回值为 0.0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.GetSleepDuration(parId)
```

</TabItem>
</Tabs>

---

### GetTimeScale

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

获取粒子发射器的播放速度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTimeScale(par_id: int) -> float
```

- par_id: int，粒子发射器 id。

**返回值**：float，表示粒子发射器播放速度 粒子发射器无效时会返回 0.0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem")
print comp.GetTimeScale(parId)
comp.SetTimeScale(parId, 0.2)
print comp.GetTimeScale(parId)
```

</TabItem>
</Tabs>

---

### GetVariable

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

获取粒子发射器的 Molang 变量值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetVariable(par_id: int, variable_name: str) -> float
```

- par_id: int，粒子发射器 id。
- variable_name: str，Molang 变量名(例如 variable.emitter_age)。

**返回值**：float，表示粒子发射器的 Molang 变量值 无效时会返回 0.0。

**备注**

- Molang 变量可以在粒子发射器 json 文件内自行定义。
- 另外，粒子发射器以及粒子内置了一些 Molang 变量可供使用:`variable.emitter_random_1 粒子发射器随机数，范围是0.0到1.0，仅在粒子发射器创建时生成一次
 variable.emitter_random_2 粒子发射器随机数，范围是0.0到1.0，仅在粒子发射器创建时生成一次
 variable.emitter_random_3 粒子发射器随机数，范围是0.0到1.0，仅在粒子发射器创建时生成一次
 variable.emitter_random_4 粒子发射器随机数，范围是0.0到1.0，仅在粒子发射器创建时生成一次
 variable.emitter_lifetime 粒子发射器的播放周期(生命周期)
 variable.emitter_age 粒子发射器当前播放时间
 variable.emitter_speed 粒子发射器的世界空间移动速度，标量，目前仅网易版我的世界可用
 variable.entity_scale 当粒子发射器绑定实体时，这个值表示绑定实体的大小缩放
 variable.particle_lifetime 粒子的生命周期
 variable.particle_age 粒子生成后已经过的时间
 variable.particle_random_1 粒子随机数，范围是0.0到1.0，仅在粒子生成时生成一次
 variable.particle_random_2 粒子随机数，范围是0.0到1.0，仅在粒子生成时生成一次
 variable.particle_random_3 粒子随机数，范围是0.0到1.0，仅在粒子生成时生成一次
 variable.particle_random_4 粒子随机数，范围是0.0到1.0，仅在粒子生成时生成一次`。
- 关于 Molang 表达式的使用，目前大家可以参考微软官方文档: [https://docs.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/molangintroduction](https://docs.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/molangintroduction)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.GetVariable(parId, 'variable.custom_size') # variable.custom_size 是粒子json文件中自定义的变量
```

</TabItem>
</Tabs>

---

### Hide

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

隐藏粒子发射器(不渲染)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Hide(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，表示调用是否成功。

**备注**

- 请注意，这个函数并不停止粒子发射器的更新，因此粒子发射器在没有绑定实体或被设计为仅播放一次的情况下，会因为播放结束而自然销毁。
- 可以和 [Show](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#show) 函数配合使用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.IsHiding(parId)

# 可以等待粒子出现后调用
comp.Hide(parId)
print comp.IsHiding(parId)
```

</TabItem>
</Tabs>

---

### IsHiding

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

返回粒子发射器是否正在被隐藏(不渲染)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsHiding(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，表示粒子发射器是否正在隐藏。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.IsHiding(parId)
comp.Hide(parId)
print comp.IsHiding(parId)
```

</TabItem>
</Tabs>

---

### IsPausing

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

返回粒子发射器的逻辑是否正在被暂停。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsPausing(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，表示粒子发射器是否被暂停。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.IsPausing(parId)
comp.Pause(parId)
print comp.IsPausing(parId)
```

</TabItem>
</Tabs>

---

### Pause

<Version type="china" add="2.0"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

暂停粒子发射器的逻辑更新，但保持渲染状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Pause(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，表示调用是否成功。

**备注**

- 可以和 [Resume](/docs/docs/scripts/modapi/interfaces/effect/model#resume) 函数配合使用，用于暂停粒子发射器的逻辑。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.IsPausing(parId)

# 等待一段时间后调用可以看到时间静止的效果
comp.Pause(parId)
print comp.IsPausing(parId)
```

</TabItem>
</Tabs>

---

### Play

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

播放粒子发射器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Play(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，表示调用是否成功。

**备注**

- 粒子发射器在创建时就会立即播放，因此不需要手动调用这个函数。
- 这个函数等价于调用 [Resume](/docs/docs/scripts/modapi/interfaces/effect/model#resume) 和 [Show](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#show)，如果同时需要这两个功能，建议直接使用这个函数。
- 这个函数用于和 [Stop](/docs/docs/scripts/modapi/interfaces/effect/particle#stop) 函数配合使用，可以使粒子发射器在被停止的时间点继续播放(恢复逻辑更新、开启渲染)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
comp.Stop(parId)
print comp.IsHiding(parId)
print comp.IsPausing(parId)

comp.Play(parId)
print comp.IsHiding(parId)
print comp.IsPausing(parId)
```

</TabItem>
</Tabs>

---

### PlayAt

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

设置粒子发射器播放时间点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayAt(par_id: int, at_second: float) -> bool
```

- par_id: int，粒子发射器 id。
- at_second: float，播放时间点。

**返回值**：bool，表示调用是否成功。

**备注**

- 这个函数可以和 [Stop](/docs/docs/scripts/modapi/interfaces/effect/particle#stop) 函数配合使用(跳转到指定时间点、继续逻辑更新且开启渲染)。
- 这个函数可以使粒子发射器跳转到它的某个时间点进行播放。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.GetLoopAge(parId)

comp.PlayAt(parId, 0.5)
print comp.GetLoopAge(parId)
```

</TabItem>
</Tabs>

---

### Remove

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

销毁指定粒子发射器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Remove(par_id: int) -> bool
```

- par_id: int，粒子发射器 id 对于不存在的粒子发射器 id 不会进行任何操作。

**返回值**：bool，表示调用是否成功。

**备注**

- 原版的雨水等粒子发射器目前无法通过类似接口销毁，可能是因为它们使用了旧版的微软粒子系统。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.Exist(parId)
comp.Remove(parId)
print comp.Exist(parId)
```

</TabItem>
</Tabs>

---

### RemoveByName

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

销毁场景中指定名称(粒子发射器 json 中的 identifier)的所有粒子发射器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveByName(effect_name: str) -> bool
```

- effect_name: str，粒子发射器名称(json 中的 identifier)。

**返回值**：bool，表示调用是否成功。

**备注**

- 原版的雨水等粒子发射器目前无法通过类似接口销毁，可能是因为它们使用了旧版的微软粒子系统进行管理。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.Exist(parId)
comp.RemoveByName("netease:tutorial_particle")
print comp.Exist(parId)
```

</TabItem>
</Tabs>

---

### Replay

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

重播粒子发射器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Replay(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，表示调用是否成功。

**备注**

- 这个函数可以和 [Stop](/docs/docs/scripts/modapi/interfaces/effect/particle#stop) 函数配合使用(重新进行逻辑更新、开启渲染)。
- 这个函数可以使粒子发射器回到它的时间点零，重新播放(不能用于已经被销毁的粒子发射器)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))

# 可以等待一段时间后调用
comp.Replay(parId)
```

</TabItem>
</Tabs>

---

### Resume

<Version type="china" add="2.0"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

恢复粒子发射器的逻辑更新，不影响渲染状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Resume(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，表示调用是否成功。

**备注**

- 可以和 [Pause](/docs/docs/scripts/modapi/interfaces/effect/particle#pause) 函数配合使用，用于恢复粒子发射器的逻辑更新。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
comp.Pause(parId)
print comp.IsPausing(parId)

# 可以等待一段时间后调用
comp.Resume(parId)
print comp.IsPausing(parId)
```

</TabItem>
</Tabs>

---

### SetPos

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

设置粒子发射器位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPos(par_id: int, pos: Tuple = (0, 0, 0)) -> bool
```

- par_id: int，粒子发射器 id。
- pos: Tuple，三维 表示粒子发射器局部空间位置 默认值为(0, 0, 0)。

**返回值**：bool，表示调用是否成功。

**备注**

- 粒子发射器没有进行绑定(即 被放在世界空间)时，它的局部空间位置就是世界空间位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId0 = comp.CreateBindEntity("netease:tutorial_particle", localId, "leftitem", (0, 1, 0), (0, 0, 0))
parId1 = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, -1, 0), (0, 0, 0))

comp.SetPos(parId0, (0, 0.5, 0))
comp.SetPos(parId1) # (0, 0, 0)
```

</TabItem>
</Tabs>

---

### SetRelative

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

设置粒子是否在局部空间进行计算。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRelative(par_id: int, is_relative: bool) -> bool
```

- par_id: int，粒子发射器 id 需要粒子发射器已绑定实体。
- is_relative: bool，表示粒子是否在局部空间进行计算 默认参数值为 True。

**返回值**：bool，表示调用是否成功。

**备注**

- 此函数对于没有绑定的粒子发射器无效。
- 有关的值可以在粒子发射器 json 文件中的 minecraft:emitter_local_space 组件内预先定义，如果没有该组件，则默认在世界坐标系下(False)进行变换。
- 设置 relative 为 False 时，涉及粒子运动相关的计算都会当作是在世界空间进行的。
- 设置 relative 为 True 时，涉及粒子运动相关的计算都会当作是在局部空间进行的。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

# 开发者可以对比两者的区别来理解两个不同的计算空间
parId0 = comp.CreateBindEntity("netease:tutorial_particle", localId, "leftitem", (0, 1.0, 0), (90, 0, 0))
comp.SetRelative(parId0, False)
parId1 = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 1.0, 0), (90, 0, 0))
comp.SetRelative(parId1, True)
```

</TabItem>
</Tabs>

---

### SetRot

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

设置粒子发射器局部旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRot(par_id: int, rot: Tuple = (0, 0, 0)) -> bool
```

- par_id: int，粒子发射器 id。
- rot: Tuple，粒子发射器三维旋转(使用角度制，按照 ZYX 顺序旋转) 默认值为(0, 0, 0)。

**返回值**：bool，表示调用是否成功。

**备注**

- 如果粒子发射器没有进行绑定，则它的局部空间旋转就是世界空间旋转。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId0 = comp.CreateBindEntity("netease:tutorial_particle", localId, "leftitem", (0, 0, 0), (0, 0, 0))
parId1 = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
comp.SetRot(parId1, (0, 0, 90))
```

</TabItem>
</Tabs>

---

### SetRotUseZXY

<Version type="china" add="1.24"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

设置粒子发射器局部旋转，旋转顺序按照绕 z,x,y 轴旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRotUseZXY(par_id: int, rot: Tuple = (0, 0, 0)) -> bool
```

- par_id: int，粒子发射器 id。
- rot: Tuple，粒子发射器三维旋转(使用角度制，按照 ZXY 顺序旋转) 默认值为(0, 0, 0)。

**返回值**：bool，表示调用是否成功。

**备注**

- 如果粒子发射器没有进行绑定，则它的局部空间旋转就是世界空间旋转。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId0 = comp.CreateBindEntity("netease:tutorial_particle", localId, "leftitem", (0, 0, 0), (0, 0, 0))
parId1 = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
# 绕z轴旋转90度，然后绕x轴旋转90度，最后再绕y轴旋转90度
comp.SetRotUseZXY(parId1, (90, 90, 90))
```

</TabItem>
</Tabs>

---

### SetTimeScale

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

设置粒子发射器的播放速度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTimeScale(par_id: int, scale: float) -> bool
```

- par_id: int，粒子发射器 id。
- scale: float，表示播放倍率 可以为负数进行倒放。

**返回值**：bool，表示调用是否成功。

**备注**

- 倒放时已经消失的粒子(请注意是单个粒子而不是粒子发射器)不会重新出现，也不会生成新的粒子。
- 如果倒放到了时间点 0，没有绑定或者不循环播放的粒子发射器会被销毁。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId0 = comp.CreateBindEntity("netease:tutorial_particle", localId, "leftitem")
# comp.SetTimeScale(parId0, 1.0)
parId1 = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem")
comp.SetTimeScale(parId1, 0.2)
```

</TabItem>
</Tabs>

---

### SetVariable

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

设置粒子发射器的 Molang 变量值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetVariable(par_id: int, variable_name: str, value: float) -> bool
```

- par_id: int，粒子发射器 id。
- variable_name: str，Molang 变量名。
- value: float，表示粒子发射器的 Molang 变量值。

**返回值**：bool，表示调用是否成功。

**备注**

- Molang 变量可以在粒子发射器 json 文件内自行定义。
- 另外，粒子发射器以及粒子内置了一些 Molang 变量可供使用:`variable.emitter_random_1 粒子发射器随机数，范围是0.0到1.0，仅在粒子发射器创建时生成一次
 variable.emitter_random_2 粒子发射器随机数，范围是0.0到1.0，仅在粒子发射器创建时生成一次
 variable.emitter_random_3 粒子发射器随机数，范围是0.0到1.0，仅在粒子发射器创建时生成一次
 variable.emitter_random_4 粒子发射器随机数，范围是0.0到1.0，仅在粒子发射器创建时生成一次
 variable.emitter_lifetime 粒子发射器的播放周期(生命周期)
 variable.emitter_age 粒子发射器当前播放时间
 variable.emitter_speed 粒子发射器的世界空间移动速度，标量，目前仅网易版我的世界可用
 variable.entity_scale 当粒子发射器绑定实体时，这个值表示绑定实体的大小缩放
 variable.particle_lifetime 粒子的生命周期
 variable.particle_age 粒子生成后已经过的时间
 variable.particle_random_1 粒子随机数，范围是0.0到1.0，仅在粒子生成时生成一次
 variable.particle_random_2 粒子随机数，范围是0.0到1.0，仅在粒子生成时生成一次
 variable.particle_random_3 粒子随机数，范围是0.0到1.0，仅在粒子生成时生成一次
 variable.particle_random_4 粒子随机数，范围是0.0到1.0，仅在粒子生成时生成一次`部分内置的变量(例如 variable.emitter_age)会每帧进行刷新，修改它们的值可能会没有任何效果。
- 关于 Molang 表达式的使用，目前大家可以参考微软官方文档: [https://docs.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/molangintroduction](https://docs.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/molangintroduction)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId0 = comp.CreateBindEntity("netease:tutorial_particle", localId, "leftitem", (0, 0, 0), (0, 0, 0))
parId1 = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))

comp.SetVariable(parId1, "variable.custom_size", 0.1) # 修改内置的Molang值效果不明显甚至无效，因此建议自定义变量名
```

</TabItem>
</Tabs>

---

### Show

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

显示粒子发射器(开启渲染)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Show(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，表示调用是否成功。

**备注**

- 可以和 [Hide](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#hide) 函数配合使用，用于恢复粒子发射器的显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
# 可以等待粒子出现后调用
comp.Hide(parId)
print comp.IsHiding(parId)

# 可以等待粒子隐藏后调用
comp.Show(parId)
print comp.IsHiding(parId)
```

</TabItem>
</Tabs>

---

### Stop

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

停止粒子发射器播放(不渲染且不更新逻辑)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Stop(par_id: int) -> bool
```

- par_id: int，粒子发射器 id。

**返回值**：bool，表示调用是否成功。

**备注**

- 这个函数等价于调用 [Pause](/docs/docs/scripts/modapi/interfaces/effect/particle#pause) 和 [Hide](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#hide)，如果同时需要这两个功能，建议直接使用这个函数。
- 因为逻辑被停止更新，所以粒子发射器不会由于播放结束而被自然销毁。
- 可以使用 [Play](/docs/docs/scripts/modapi/interfaces/effect/particle#play)、[Replay](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#replay) 或 [PlayAt](/docs/docs/scripts/modapi/interfaces/effect/microsoft_particle#playat) 函数来播放被停止的粒子发射器。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (0, 0, 0), (0, 0, 0))
print comp.IsHiding(parId)
print comp.IsPausing(parId)

# 可以等待一段时间后调用
comp.Stop(parId)
print comp.IsHiding(parId)
print comp.IsPausing(parId)
```

</TabItem>
</Tabs>

---

### Unbind

<Version type="china" add="2.2"/>

<Client/> ParticleSystemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateParticleSystem(None)`

解除指定粒子发射器的绑定状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Unbind(
    par_id: int,
    keep_position: bool = True,
    keep_rotation: bool = True,
) -> bool
```

- par_id: int，粒子发射器 id 需要已经创建且未被销毁的粒子发射器。
- keep_position: bool，解绑后是否保持粒子发射器在世界空间的位置 默认值为 True。
- keep_rotation: bool，解绑后是否保持粒子发射器在世界空间的旋转 默认值为 True。

**返回值**：bool，表示调用是否成功。

**备注**

- keep_position 为 False 时，解绑后的粒子发射器将使用绑定时的局部偏移作为世界空间位置(即例子中的(6, 6, 6)) keep_rotation 为 False 时，解绑后的粒子发射器将使用绑定时的局部旋转作为世界空间旋转(即例子中的(0, 0, 0))。
- keep_position 为 True 时，解绑后的粒子发射器会保持在解绑前一刻所在的世界空间位置 keep_rotation 为 True 时，解绑后的粒子发射器会保持解绑前一刻的世界空间旋转。
- 请注意，如果粒子发射器出现在世界空间(即 没有绑定实体)，即使粒子发射器 json 文件定义了 minecraft:emitter_lifetime_looping 组件，也只会播放一次或一个周期，随后销毁。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateParticleSystem(None)
localId = clientApi.GetLocalPlayerId()

parId = comp.CreateBindEntity("netease:tutorial_particle", localId, "rightitem", (6, 6, 6), (0, 0, 0))
comp.Unbind(parId)
```

</TabItem>
</Tabs>

---
