---
sidebar_position: 12
---

# 渲染

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录渲染相关的接口，共 64 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shiti/xuanran.html"/>

---

### AddActorAnimation

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加生物渲染动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorAnimation(
    actorIdentifier: str,
    animationKey: str,
    animationName: str,
) -> bool
```

- actorIdentifier: str，实体 identifier。
- animationKey: str，动画键。
- animationName: str，动画名称。

**返回值**：bool，是否成功。

**备注**

- 某些动画资源可能用到了 molang 表达式，在添加动画时请务必确保这些 molang 表达式也存在。
- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddActorAnimation("minecraft:pig", "custom_move", "animation.pig.custom_move")
```

</TabItem>
</Tabs>

---

### AddActorAnimationController

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

增加生物渲染动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorAnimationController(
    actorIdentifier: str,
    animationControllerKey: str,
    animationControllerName: str,
) -> bool
```

- actorIdentifier: str，生物的 identifier。
- animationControllerKey: str，动画控制器键。
- animationControllerName: str，动画控制器名称。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.AddActorAnimationController("minecraft:skeleton", "controller__use_item_progress", "controller.animation.humanoid.use_item_progress")
```

</TabItem>
</Tabs>

---

### AddActorBlockGeometry

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)`

为实体添加方块几何体模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorBlockGeometry(
    geometryName: str,
    offset: Tuple[float, float, float] = (0, 0, 0),
    rotation: Tuple[float, float, float] = (0, 0, 0),
    rotateFirst: bool = False,
) -> bool
```

- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- offset: Tuple[float, float, float]，方块几何体模型相对实体的位置偏移值，可选参数，默认为(0, 0, 0)。
- rotation: Tuple[float, float, float]，方块几何体模型相对实体的旋转角度，可选参数，默认为(0, 0, 0)，分别表示绕 x,y,z 轴的旋转角度，旋转顺序按 z,x,y 顺序旋转。
- rotateFirst: bool，控制先旋转后偏移，还是先偏移后旋转。默认是 False。

**返回值**：bool，添加是否成功，成功返回 True，失败返回 False。如果实体已经拥有了相同名称的模型，则也会返回 True。

**备注**

- 请在确保世界已经初始化完成后（例如，监听 [UiInitFinished](/docs/docs/scripts/modapi/events/ui#uiinitfinished) 事件）再调用该接口，否则过早调用会导致接口执行失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
blockGeometryComp = clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
# 合并方块并转换为名叫"my_block_geometry"的方块几何体模型
geometryName = blockGeometryComp.CombineBlockFromPosListToGeometry([(200,64,200),(201,65,202)],"my_block_geometry")
# 添加到实体id为-4294967295的实体中
print actorRenderComp.AddActorBlockGeometry(geometryName)
```

</TabItem>
</Tabs>

---

### AddActorGeometry

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加生物渲染几何体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorGeometry(
    actorIdentifier: str,
    geometryKey: str,
    geometryName: str,
) -> bool
```

- actorIdentifier: str，生物实体 identifier。
- geometryKey: str，渲染几何体的键，如 default。
- geometryName: str，渲染几何体名称，如熊猫几何体 geometry.panda。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效 动画和贴图都是与几何体密切相关的，改变几何体也需要改变动画与贴图。建议先修改生物的动画以及动画控制器后再修改生物的几何。
- 某些生物受初始动画影响，几何体会有初始偏移，会导致修改几何体后表现异常。若修改后的几何体没有当前动画需要的骨骼时，会触发报错。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddActorGeometry("minecraft:sheep", "default", "geometry.panda")
```

</TabItem>
</Tabs>

---

### AddActorParticleEffect

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加生物特效资源。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorParticleEffect(
    actorIdentifier: str,
    effectKey: str,
    effectName: str,
) -> bool
```

- actorIdentifier: str，实体 identifier。
- effectKey: str，特效资源 Key，如 bee.entity.json 中的 nectar_dripping。
- effectName: str，特效资源名称，如 minecraft:nectar_drip_particle。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddActorParticleEffect("minecraft:villager", "nectar_dripping", "minecraft:nectar_drip_particle")
```

</TabItem>
</Tabs>

---

### AddActorRenderController

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加生物[渲染控制器](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_7-自定义渲染控制器)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorRenderController(
    actorIdentifier: str,
    renderControllerName: str,
    condition: str,
) -> bool
```

- actorIdentifier: str，生物 identifier。
- renderControllerName: str，渲染控制器名称。
- condition: str，渲染控制器条件，当该条件成立时，renderControllerName 指向的渲染控制器才会生效。

**返回值**：bool，添加是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddActorRenderController('minecraft:villager', 'custom_render_controller_name', 'query.mod.condition')
```

</TabItem>
</Tabs>

---

### AddActorRenderControllerArray

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

增加生物渲染控制器列表中字典 arrays 元素。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorRenderControllerArray(
    actorIdentifier: str,
    renderControllerName: str,
    arrayType: int,
    arrayName: str,
    expression: str,
) -> bool
```

- actorIdentifier: str，实体 identifier。
- renderControllerName: str，实体生物渲染控制器名称。
- arrayType: int，渲染控制器 arrays 类型([渲染控制器 arrays 类型枚举](/docs/docs/scripts/modapi/enums#rendercontrollerarraytype))。
- arrayName: str，数组名称。
- expression: str，待添加元素表达式。

**返回值**：bool，是否成功。

**备注**

- 该接口增加 render_controller->arrays—>materials/textures/geometries->array.***中的元素。
- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.AddActorRenderControllerArray("minecraft:pig", "controller.render.pig", clientApi.GetMinecraftEnum().RenderControllerArrayType.Texture, "Array.skins", "Texture.test")
```

</TabItem>
</Tabs>

---

### AddActorRenderMaterial

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加生物渲染需要的[材质](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_3-自定义材质)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorRenderMaterial(
    actorIdentifier: str,
    materialKey: str,
    materialName: str,
) -> bool
```

- actorIdentifier: str，生物的 identifier。
- materialKey: str，材质的键。
- materialName: str，材质名称。

**返回值**：bool，添加是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddActorRenderMaterial('minecraft:villager', 'custom_material_key', 'custom_material_name')
```

</TabItem>
</Tabs>

---

### AddActorScriptAnimate

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

在生物的客户端实体定义（minecraft:client_entity）json 中的 scripts/animate 节点添加动画/动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorScriptAnimate(
    actorIdentifier: str,
    animateName: str,
    condition: str,
    autoReplace: bool = False,
) -> bool
```

- actorIdentifier: str，实体 identifier。
- animateName: str，动画/动画控制器名称，如 look_at_target。
- condition: str，动画/动画控制器控制表达式，默认为空，如 query.mod.index > 0。
- autoReplace: bool，是否覆盖已存在的动画/动画控制器，默认值为 False。

**返回值**：bool，是否成功。

**备注**

- 对于已经存在的生物，在调用 CreateActorRender 时需要传生物 Id 才能马上生效，对于不存在的生物，直接传 levelId 即可。
- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.AddActorAnimationController("minecraft:pig", "animation_controller_short_name", "controller.animation.pig.custom_animation_controller")
comp.AddActorScriptAnimate("minecraft:pig", "animation_controller_short_name", "query.mod.index > 0")
```

</TabItem>
</Tabs>

---

### AddActorSoundEffect

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加生物音效资源。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorSoundEffect(actorIdentifier: str, soundKey: str, soundName: str) -> bool
```

- actorIdentifier: str，实体 identifier。
- soundKey: str，音效资源 Key。
- soundName: str，音效资源名称。

**返回值**：bool，是否成功。

**备注**

- 目前只支持在动作(animation)中播放音效，不支持在动作控制器(animation controller)中播放音效。
- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddActorSoundEffect("minecraft:villager", "sound_thunder", "ambient.weather.thunder")
```

</TabItem>
</Tabs>

---

### AddActorTexture

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加生物渲染贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddActorTexture(actorIdentifier: str, textureKey: str, texturePath: str) -> bool
```

- actorIdentifier: str，生物实体 identifier。
- textureKey: str，贴图键。
- texturePath: str，贴图路径。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddActorTexture("minecraft:sheep", "default", "textures/entity/panda/panda")
```

</TabItem>
</Tabs>

---

### AddAnimationControllerToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

增加单个生物渲染动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddAnimationControllerToOneActor(
    entityId: str,
    animationControllerKey: str,
    animationControllerName: str,
) -> bool
```

- entityId: str，生物的 entityId。
- animationControllerKey: str，动画控制器键。
- animationControllerName: str，动画控制器名称。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.AddAnimationControllerToOneActor(entityId, "controller__use_item_progress", "controller.animation.humanoid.use_item_progress")
```

</TabItem>
</Tabs>

---

### AddAnimationToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加单个生物渲染动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddAnimationToOneActor(
    entityId: str,
    animationKey: str,
    animationName: str,
) -> bool
```

- entityId: str，实体 entityId。
- animationKey: str，动画键。
- animationName: str，动画名称。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。
- 某些动画资源可能用到了 molang 表达式，在添加动画时请务必确保这些 molang 表达式也存在。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddAnimationToOneActor(entityId, "custom_move", "animation.armor_stand.default_pose")
```

</TabItem>
</Tabs>

---

### AddGeometryToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加单个生物渲染几何体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddGeometryToOneActor(
    entityId: str,
    geometryKey: str,
    geometryName: str,
) -> bool
```

- entityId: str，生物实体 entityId。
- geometryKey: str，渲染几何体的键，如 default。
- geometryName: str，渲染几何体名称，如熊猫几何体 geometry.panda。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效 动画和贴图都是与几何体密切相关的，改变几何体也需要改变动画与贴图。建议先修改生物的动画以及动画控制器后再修改生物的几何。
- 某些生物受初始动画影响，几何体会有初始偏移，会导致修改几何体后表现异常。若修改后的几何体没有当前动画需要的骨骼时，会触发报错。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddGeometryToOneActor(entityId, "default", "geometry.panda")
```

</TabItem>
</Tabs>

---

### AddParticleEffectToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加生物特效资源。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddParticleEffectToOneActor(
    entityId: str,
    effectKey: str,
    effectName: str,
) -> bool
```

- entityId: str，实体 entityId。
- effectKey: str，特效资源 Key，如 bee.entity.json 中的 nectar_dripping。
- effectName: str，特效资源名称，如 minecraft:nectar_drip_particle。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddParticleEffectToOneActor(entityId, "nectar_dripping", "minecraft:nectar_drip_particle")
```

</TabItem>
</Tabs>

---

### AddRenderControllerToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加单个生物[的渲染控制器](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_7-自定义渲染控制器)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddRenderControllerToOneActor(
    entityId: str,
    renderControllerName: str,
    condition: str,
) -> bool
```

- entityId: str，生物 entityId。
- renderControllerName: str，渲染控制器名称。
- condition: str，渲染控制器条件，当该条件成立时，renderControllerName 指向的渲染控制器才会生效。

**返回值**：bool，添加是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddRenderControllerToOneActor(entityId, 'controller.render.llama', 'query.mod.condition')
```

</TabItem>
</Tabs>

---

### AddRenderMaterialToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加单个生物渲染需要的[材质](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_3-自定义材质)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddRenderMaterialToOneActor(
    entityId: str,
    materialKey: str,
    materialName: str,
) -> bool
```

- entityId: str，生物的 entityId。
- materialKey: str，材质的键。
- materialName: str，材质名称。

**返回值**：bool，添加是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddRenderMaterialToOneActor(entityId, 'custom_material_key', 'custom_material_name')
```

</TabItem>
</Tabs>

---

### AddScriptAnimateToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

在单个生物的客户端实体定义（minecraft:client_entity）json 中的 scripts/animate 节点添加动画/动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddScriptAnimateToOneActor(
    entityId: str,
    animateName: str,
    condition: str,
    autoReplace: bool = False,
) -> bool
```

- entityId: str，实体 entityId。
- animateName: str，动画/动画控制器名称，如 look_at_target。
- condition: str，动画/动画控制器控制表达式，默认为空，如 query.mod.index > 0。
- autoReplace: bool，是否覆盖已存在的动画/动画控制器，默认值为 False。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.AddAnimationControllerToOneActor(entityId, animation_controller_short_name", "controller.animation.pig.custom_animation_controller")
comp.AddScriptAnimateToOneActor(entityId, "animation_controller_short_name", "query.mod.index > 0")
```

</TabItem>
</Tabs>

---

### AddSoundEffectToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加单个生物的音效资源。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddSoundEffectToOneActor(entityId: str, soundKey: str, soundName: str) -> bool
```

- entityId: str，实体 entityId。
- soundKey: str，音效资源 Key。
- soundName: str，音效资源名称。

**返回值**：bool，是否成功。

**备注**

- 目前只支持在动作(animation)中播放音效，不支持在动作控制器(animation controller)中播放音效。
- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddSoundEffectToOneActor(entityId, "sound_thunder", "ambient.weather.thunder")
```

</TabItem>
</Tabs>

---

### AddTextureToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

增加单个生物的渲染贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddTextureToOneActor(entityId: str, textureKey: str, texturePath: str) -> bool
```

- entityId: str，生物实体 entityId。
- textureKey: str，贴图键。
- texturePath: str，贴图路径。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.AddTextureToOneActor(entityId, "default", "textures/entity/panda/panda")
```

</TabItem>
</Tabs>

---

### BindEntityToEntity

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

绑定骨骼模型跟随其他 entity,如果当前 entity 是本地玩家，摄像机也跟随其他 entity。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindEntityToEntity(bindEntityId: str) -> bool
```

- bindEntityId: str，绑定跟随的实体 Id。

**返回值**：bool，False 表示失败，True 表示成功。

**备注**

- 本接口只实现视觉效果，本质上实体还是在原地，因此需要调用接口设置实体的位置到其他 entity 的位置上，否则当实体本身不在摄像机范围内的时候就会不进行渲染了。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 将entityId的实体绑定至bindEntityId的实体
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.BindEntityToEntity(bindEntityId)
```

</TabItem>
</Tabs>

---

### ClearActorBlockGeometry

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)`

删除实体中所有的方块几何体模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClearActorBlockGeometry() -> bool
```


**返回值**：bool，删除是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
blockGeometryComp = clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
# 合并方块并转换为名叫"my_block_geometry"的方块几何体模型
geometryName = blockGeometryComp.CombineBlockFromPosListToGeometry([(200,64,200),(201,65,202)],"my_block_geometry")
# 添加到实体id为-4294967295的实体中
print actorRenderComp.AddActorBlockGeometry(geometryName)
# 清空实体中所有的方块几何体
print actorRenderComp.ClearActorBlockGeometry()
```

</TabItem>
</Tabs>

---

### CopyActorGeometryFromPlayer

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

将渲染几何体从某个玩家拷贝到某类生物 identifier 上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CopyActorGeometryFromPlayer(
    fromPlayerId: str,
    toActorIdentifier: str,
    fromGeometryKey: str,
    newGeometryKey: str,
) -> bool
```

- fromPlayerId: str，源玩家 id。
- toActorIdentifier: str，拷贝到的生物 identifier。
- fromGeometryKey: str，源渲染几何体的键。
- newGeometryKey: str，拷贝后新渲染几何体的键。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效 动画和贴图都是与几何体密切相关的，改变几何体也需要改变动画与贴图。建议先修改生物的动画以及动画控制器后再修改生物的几何。
- 某些生物受初始动画影响，几何体会有初始偏移，会导致修改几何体后表现异常。若修改后的几何体没有当前动画需要的骨骼时，会触发报错。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.CopyActorGeometryFromPlayer(playerId, "minecraft:sheep", "default", "default")
```

</TabItem>
</Tabs>

---

### CopyActorRenderMaterialFromPlayer

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

将渲染[材质](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_3-自定义材质)从某个玩家拷贝到某类生物 identifier 上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CopyActorRenderMaterialFromPlayer(
    fromPlayerId: str,
    toActorIdentifier: str,
    fromMaterialKey: str,
    newMaterialKey: str,
) -> bool
```

- fromPlayerId: str，源玩家 id。
- toActorIdentifier: str，拷贝到的生物 identifier。
- fromMaterialKey: str，源材质的键。
- newMaterialKey: str，拷贝后新材质的键。

**返回值**：bool，添加是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.CopyActorRenderMaterialFromPlayer(playerId, 'minecraft:sheep', 'default', 'default')
```

</TabItem>
</Tabs>

---

### CopyActorTextureFromPlayer

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

将贴图从某个玩家拷贝到某类生物 identifier 上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CopyActorTextureFromPlayer(
    fromPlayerId: str,
    toActorIdentifier: str,
    fromTextureKey: str,
    newTextureKey: str,
) -> bool
```

- fromPlayerId: str，源玩家 id。
- toActorIdentifier: str，拷贝到的生物 identifier。
- fromTextureKey: str，贴图键。
- newTextureKey: str，拷贝后新贴图的键。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.CopyActorTextureFromPlayer(playerId, "minecraft:sheep", "default", "default")
```

</TabItem>
</Tabs>

---

### CopyPlayerGeometryToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

将渲染几何体从某个玩家拷贝到某个生物上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CopyPlayerGeometryToOneActor(
    fromPlayerId: str,
    fromGeometryKey: str,
    newGeometryKey: str,
) -> bool
```

- fromPlayerId: str，源玩家 id。
- fromGeometryKey: str，源渲染几何体的键。
- newGeometryKey: str，拷贝后新渲染几何体的键。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效 动画和贴图都是与几何体密切相关的，改变几何体也需要改变动画与贴图。建议先修改生物的动画以及动画控制器后再修改生物的几何。
- 该接口使用时，会将这类生物当前的客户端数据拷贝一份，独立给这个实体使用（如果这个实体已经独自持有客户端数据则不会再次拷贝）。
- 当生物离开再出现在视野时，不会恢复 oneActor 类渲染接口的设置，需要开发者监听 [AddEntityClientEvent](/docs/docs/scripts/modapi/events/world#addentityclientevent) 再次设置 entity 类渲染接口进行恢复。
- 某些生物受初始动画影响，几何体会有初始偏移，会导致修改几何体后表现异常。若修改后的几何体没有当前动画需要的骨骼时，会触发报错。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.CopyPlayerGeometryToOneActor(playerId, "default", "default")
```

</TabItem>
</Tabs>

---

### CopyPlayerRenderMaterialToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

将渲染[材质](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_3-自定义材质)从某个玩家拷贝到某个生物上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CopyPlayerRenderMaterialToOneActor(
    fromPlayerId: str,
    fromMaterialKey: str,
    newMaterialKey: str,
) -> bool
```

- fromPlayerId: str，源玩家 id。
- fromMaterialKey: str，源材质的键。
- newMaterialKey: str，拷贝后新材质的键。

**返回值**：bool，添加是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。
- 该接口使用时，会将这类生物当前的客户端数据拷贝一份，独立给这个实体使用（如果这个实体已经独自持有客户端数据则不会再次拷贝）。
- 当生物离开再出现在视野时，不会恢复 oneActor 类渲染接口的设置，需要开发者监听 [AddEntityClientEvent](/docs/docs/scripts/modapi/events/world#addentityclientevent) 再次设置 entity 类渲染接口进行恢复。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.CopyPlayerRenderMaterialToOneActor(playerId, 'default', 'default')
```

</TabItem>
</Tabs>

---

### CopyPlayerTextureToOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

将贴图从某个玩家拷贝到某个生物上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CopyPlayerTextureToOneActor(
    fromPlayerId: str,
    fromTextureKey: str,
    newTextureKey: str,
) -> bool
```

- fromPlayerId: str，源玩家 id。
- fromTextureKey: str，贴图键。
- newTextureKey: str，拷贝后新贴图的键。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。
- 该接口使用时，会将这类生物当前的客户端数据拷贝一份，独立给这个实体使用（如果这个实体已经独自持有客户端数据则不会再次拷贝）。
- 当生物离开再出现在视野时，不会恢复 oneActor 类渲染接口的设置，需要开发者监听 [AddEntityClientEvent](/docs/docs/scripts/modapi/events/world#addentityclientevent) 再次设置 entity 类渲染接口进行恢复。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.CopyPlayerTextureToOneActor(playerId, "default", "default")
```

</TabItem>
</Tabs>

---

### DeleteActorBlockGeometry

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)`

删除实体中指定方块几何体模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DeleteActorBlockGeometry(geometryName: str) -> bool
```

- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。

**返回值**：bool，删除是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
blockGeometryComp = clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
# 合并方块并转换为名叫"my_block_geometry"的方块几何体模型
geometryName = blockGeometryComp.CombineBlockFromPosListToGeometry([(200,64,200),(201,65,202)],"my_block_geometry")
# 添加到实体id为-4294967295的实体中
print actorRenderComp.AddActorBlockGeometry(geometryName)
# 删除刚才添加的方块几何体
print actorRenderComp.DeleteActorBlockGeometry(geometryName)
```

</TabItem>
</Tabs>

---

### GetActorRenderParams

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

获取实体（包括玩家）渲染参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetActorRenderParams(
    entityId: str,
    paramTypeStr: str,
    getValue: bool = False,
) -> List[str]
```

- entityId: str，实体 Id。
- paramTypeStr: str，渲染参数类型，可选类型有"textures","geometry","materials","animations","render_controllers","particle_effects","sound_effects"。
- getValue: bool，是否获取详细值，默认为 False。该参数对 render_controllers 无效。

**返回值**：List[str]，参数列表，如获取失败则返回 None。

**备注**

- 无法用于获取 Player 的 ColorTexture。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
textureKeys = comp.GetActorRenderParams(entityId, "textures")
```

</TabItem>
</Tabs>

---

### GetEntityExtraUniforms

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

获取在实体 shader 当中使用的自定义变量的值。该自定义变量包含 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4，总共 4 组，每组为一个 vec4(float, float, float ,float)类型的向量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityExtraUniforms(uniformIndex: int) -> Tuple[float, float, float, float]
```

- uniformIndex: int，需要设置的自定义变量的下标，值范围为 1~4。分别对应 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4。

**返回值**：Tuple[float, float, float, float]，返回的对应自定义变量的值。获取失败则返回 None。

**备注**

- 此接口是针对使用了原版 BB 模型的实体，使用了骨骼模型的实体和玩家请使用 [SetExtraUniformValue](/docs/docs/scripts/modapi/interfaces/model#setextrauniformvalue) 接口进行动态设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
# 获取实体id为entityId的实体正在使用的自定义变量EXTRA_ACTOR_UNIFORM2的值
print actorRenderComp.GetEntityExtraUniforms(2)
# 获取实体id为entityId的实体正在使用的自定义变量EXTRA_ACTOR_UNIFORM4的值
print actorRenderComp.GetEntityExtraUniforms(4)
```

</TabItem>
</Tabs>

---

### GetEntityRenderDistance

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

获取玩家的实体可渲染距离。玩家周围的实体指这个区块内的实体，也包含玩家自身。实体的渲染距离指，实体的位置到玩家相机位置的距离。可渲染距离指，如果实体的渲染距离在可渲染距离之内，则实体会被渲染出来，如果在距离以外，则实体不会被渲染出来。仅对本地玩家有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityRenderDistance() -> float
```


**返回值**：float，实体可渲染距离。如果获取失败，则返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
# 获取当前玩家的实体可渲染距离
print actorRenderComp.GetEntityRenderDistance()
```

</TabItem>
</Tabs>

---

### GetEntityUIExtraUniforms

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(None)`

获取在实体 shader 当中使用的 UI 自定义变量的值，该变量可在微软 UI 纸娃娃（paperdoll）及网易版纸娃娃（neteasepaperdoll)上使用 identifier 渲染某一类生物实体时使用。该自定义变量包含 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4，总共 4 组，每组为一个 vec4(float, float, float ,float)类型的向量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityUIExtraUniforms(
    entityIdentifier: str,
    uniformIndex: int,
) -> Tuple[float, float, float, float]
```

- entityIdentifier: str，需要设置的实体 identifier。如果获取玩家，则填写 minecraft:player。
- uniformIndex: int，需要设置的自定义变量的下标，值范围为 1~4。分别对应 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4。

**返回值**：Tuple[float, float, float, float]，返回的对应自定义变量的值。获取失败则返回 None。

**备注**

- 此接口是针对使用了原版 BB 模型的实体，使用了骨骼模型的实体和玩家请使用 [SetExtraUniformValue](/docs/docs/scripts/modapi/interfaces/model#setextrauniformvalue) 接口进行动态设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender(None)
# 获取苦力怕正在使用的UI自定义变量EXTRA_ACTOR_UNIFORM2的值
print actorRenderComp.GetEntityUIExtraUniforms("minecraft:creeper", 2)
# 获取玩家正在使用的UI自定义变量EXTRA_ACTOR_UNIFORM4的值
print actorRenderComp.GetEntityUIExtraUniforms("minecraft:player",4)
```

</TabItem>
</Tabs>

---

### GetNotRenderAtAll

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

获取实体是否不渲染。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetNotRenderAtAll() -> bool
```


**返回值**：bool，True 表示不渲染。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
notRender = comp.GetNotRenderAtAll()
```

</TabItem>
</Tabs>

---

### GetQueryableBoneOrientation

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(player_id)`

获取实体的原版模型指定骨骼的骨骼矩阵信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetQueryableBoneOrientation(
    boneName: str,
    isClientEntity: bool = False,
) -> List[Tuple[float, float, float, float]]
```

- boneName: str，骨骼名称。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/interfaces/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。

**返回值**：List[Tuple[float, float, float, float]]，获取成功返回对应 4x4 骨骼矩阵。获取失败则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
player_id = clientApi.GetLocalPlayerId()
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender(player_id)
print actorRenderComp.GetQueryableBoneOrientation("head")
```

</TabItem>
</Tabs>

---

### IsShowName

<Client/> NameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateName(entityId)`

获取生物名字是否按照默认游戏逻辑显示（包括玩家）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsShowName() -> bool
```


**返回值**：bool，返回是否按照默认游戏逻辑显示。

**备注**

- 获取的值仅代表实体名字是否显示，但是最终是否显示还会受到全局名字是否显示影响，详见接口 [HideNameTag](/docs/docs/scripts/modapi/interfaces/world/render#hidenametag)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateName(entityId)
comp.IsShowName()
```

</TabItem>
</Tabs>

---

### RebuildActorRender

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

重建生物的数据渲染器（该接口不支持玩家，玩家请使用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender)）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RebuildActorRender(actorIdentifier: str) -> bool
```

- actorIdentifier: str，实体 identifier。

**返回值**：bool，重建是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.RebuildActorRender('minecraft:villager')
```

</TabItem>
</Tabs>

---

### RebuildRenderForOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

使用完 entity 类渲染接口后，重建单个生物渲染控制器（该接口不支持玩家，玩家请使用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender)）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RebuildRenderForOneActor() -> bool
```


**返回值**：bool，重建是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.RebuildRenderForOneActor()
```

</TabItem>
</Tabs>

---

### RemoveActorAnimationController

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

移除生物渲染动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveActorAnimationController(
    actorIdentifier: str,
    animationControllKey: str,
) -> bool
```

- actorIdentifier: str，生物的 identifier。
- animationControllKey: str，动画控制器键，注意，该值需要在 json 中动画控制器键加上前缀“controller__”。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.RemoveActorAnimationController("minecraft:villager", "controller__use_item_progress")
```

</TabItem>
</Tabs>

---

### RemoveActorGeometry

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

删除生物渲染几何体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveActorGeometry(actorIdentifier: str, geometryKey: str) -> bool
```

- actorIdentifier: str，生物实体 identifier。
- geometryKey: str，渲染几何体名称，如熊猫几何体 geometry.panda。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效 动画和贴图都是与几何体密切相关的，改变几何体也需要改变动画与贴图。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# geometry definition in panda.entity.json
# "geometry": {
#     "default": "geometry.panda"
# },
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.RemoveActorGeometry("minecraft:panda", "default")
```

</TabItem>
</Tabs>

---

### RemoveActorRenderController

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

删除生物[渲染控制器](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_7-自定义渲染控制器)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveActorRenderController(
    actorIdentifier: str,
    renderControllerName: str,
) -> bool
```

- actorIdentifier: str，生物 identifier。
- renderControllerName: str，渲染控制器名称。

**返回值**：bool，删除是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.RemoveActorRenderController('minecraft:villager', 'custom_render_controller_name')
```

</TabItem>
</Tabs>

---

### RemoveActorTexture

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

删除生物渲染贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveActorTexture(actorIdentifier: str, textureKey: str) -> bool
```

- actorIdentifier: str，生物实体 identifier。
- textureKey: str，贴图键，如 default。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildActorRender](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildactorrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# texture definition in panda.entity.json
# "textures": {
#     "default": "textures/entity/panda/panda",
#     "lazy": "textures/entity/panda/panda_lazy",
#     "worried": "textures/entity/panda/panda_worried",
#     "playful": "textures/entity/panda/panda_playful",
#     "brown": "textures/entity/panda/panda_brown",
#     "weak": "textures/entity/panda/panda_sneezy",
#     "aggressive": "textures/entity/panda/panda_aggressive"
# }
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.RemoveActorTexture("minecraft:panda", "default")
```

</TabItem>
</Tabs>

---

### RemoveAnimationControllerForOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

移除单个生物渲染动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveAnimationControllerForOneActor(
    entityId: str,
    animationControllKey: str,
) -> bool
```

- entityId: str，生物的 entityId。
- animationControllKey: str，动画控制器键，注意，该值需要在 json 中动画控制器键加上前缀“controller__”。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.RemoveAnimationControllerForOneActor(entityId, "controller__use_item_progress")
```

</TabItem>
</Tabs>

---

### RemoveGeometryForOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

删除单个生物的渲染几何体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveGeometryForOneActor(entityId: str, geometryKey: str) -> bool
```

- entityId: str，生物实体 entityId。
- geometryKey: str，渲染几何体名称，如熊猫几何体 geometry.panda。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效 动画和贴图都是与几何体密切相关的，改变几何体也需要改变动画与贴图。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# geometry definition in panda.entity.json
# "geometry": {
#     "default": "geometry.panda"
# },
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.RemoveGeometryForOneActor("0", "default")
```

</TabItem>
</Tabs>

---

### RemoveRenderControllerForOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

删除单个生物[的渲染控制器](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_7-自定义渲染控制器)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveRenderControllerForOneActor(
    entityId: str,
    renderControllerName: str,
) -> bool
```

- entityId: str，生物 entityId。
- renderControllerName: str，渲染控制器名称。

**返回值**：bool，删除是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.RemoveRenderControllerForOneActor('0', 'custom_render_controller_name')
```

</TabItem>
</Tabs>

---

### RemoveTextureForOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

删除单个生物的渲染贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveTextureForOneActor(entityId: str, textureKey: str) -> bool
```

- entityId: str，生物实体 entityId。
- textureKey: str，贴图键，如 default。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.RemoveTextureForOneActor("0", "default")
```

</TabItem>
</Tabs>

---

### ResetActorRender

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

重置实体渲染接口，包括动画、动画控制器、渲染控制器、贴图、材质、特效资源、音效资源等。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetActorRender(actorIdentifier: str) -> bool
```

- actorIdentifier: str，生物的 identifier。

**返回值**：bool，是否成功。

**备注**

- 该接口目前只对生物生效，无法对玩家实体生效。只有修改过的实体才能 reset 成功，并且 reset 后在有新修改前，都无法 reset 成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
comp.ResetActorRender("minecraft:sheep")
```

</TabItem>
</Tabs>

---

### ResetBindEntity

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

取消目标 entity 的绑定实体，取消后不再跟随任何其他 entity。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetBindEntity() -> bool
```


**返回值**：bool，False 表示失败，True 表示成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.ResetBindEntity()
```

</TabItem>
</Tabs>

---

### ResetEntityExtraSkin

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

清除通过 actorRender 接口为实体（包括玩家）额外添加的皮肤渲染组件（几何体、动画、动画控制器、贴图、材质、渲染控制器），还原实体到原始渲染状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetEntityExtraSkin(entityId: str, skinType: int) -> bool
```

- entityId: str，实体的 entityId。
- skinType: int，要清除的皮肤组件类型，使用 ExtraSkinType 枚举值，默认为 None（等同于 ExtraSkinType.ALL，清除全部）。

**返回值**：bool，操作是否成功。

**备注**

- 调用本接口后需手动调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender)（玩家）或 [RebuildRenderForOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#rebuildrenderforoneactor)（非玩家实体）才会生效。本接口只清除通过 mod 接口额外添加的渲染属性，不影响实体原版定义中的渲染配置。针对玩家实体，同时清理 operationHistory 中的对应历史，确保该玩家重进 AOI 时不会重复应用已清除的组件。skinType 可选值参考 [GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().ExtraSkinType。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
# 清除所有额外皮肤组件后重建渲染
comp.ResetEntityExtraSkin(entityId)
comp.RebuildPlayerRender()  # 玩家实体
# comp.RebuildRenderForOneActor()  # 非玩家实体
```

</TabItem>
</Tabs>

---

### ResetRenderForOneActor

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

将调用 OneActor 类渲染接口([CopyPlayerTextureToOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#copyplayertexturetooneactor)、[CopyPlayerRenderMaterialToOneActor](/docs/docs/scripts/modapi/interfaces/entity/render#copyplayerrendermaterialtooneactor) 等)的生物重置回种群。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetRenderForOneActor() -> bool
```


**返回值**：bool，重置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.ResetRenderForOneActor()
```

</TabItem>
</Tabs>

---

### SetActorAllBlockGeometryVisible

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)`

设置实体中所有的方块几何体模型是否显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetActorAllBlockGeometryVisible(visible: bool) -> bool
```

- visible: bool，设置是否显示或隐藏，True 表示显示，False 表示隐藏。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
blockGeometryComp = clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
# 合并方块并转换为名叫"my_block_geometry"的方块几何体模型
geometryName = blockGeometryComp.CombineBlockFromPosListToGeometry([(200,64,200),(201,65,202)],"my_block_geometry")
# 添加到实体id为-4294967295的实体中
print actorRenderComp.AddActorBlockGeometry(geometryName)
# 隐藏所有的方块几何体
print actorRenderComp.SetActorAllBlockGeometryVisible(False)
```

</TabItem>
</Tabs>

---

### SetActorBlockGeometryVisible

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)`

设置实体中指定的方块几何体模型是否显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetActorBlockGeometryVisible(geometryName: str, visible: bool) -> bool
```

- geometryName: str，几何体模型的名称，用于标识每个几何体模型，相当于是该模型的 id。
- visible: bool，设置是否显示或隐藏，True 表示显示，False 表示隐藏。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
blockGeometryComp = clientApi.GetEngineCompFactory().CreateBlockGeometry(levelId)
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender("-4294967295")
# 合并方块并转换为名叫"my_block_geometry"的方块几何体模型
geometryName = blockGeometryComp.CombineBlockFromPosListToGeometry([(200,64,200),(201,65,202)],"my_block_geometry")
# 添加到实体id为-4294967295的实体中
print actorRenderComp.AddActorBlockGeometry(geometryName)
# 隐藏刚才添加的方块几何体
print actorRenderComp.SetActorBlockGeometryVisible(geometryName, False)
```

</TabItem>
</Tabs>

---

### SetAlwaysShowName

<Client/> NameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateName(entityId)`

设置生物名字是否一直显示，瞄准点不指向生物时也能显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAlwaysShowName(show: bool) -> bool
```

- show: bool，True 为显示。

**返回值**：bool，返回是否设置成功。

**备注**

- 该接口只对普通生物生效，对玩家设置不起作用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateName(entityId)
# 不显示头上的名字
comp.SetAlwaysShowName(False)
```

</TabItem>
</Tabs>

---

### SetColor

<Client/> HealthComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateHealth(entityId)`

设置血条的颜色及背景色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetColor(
    front: Tuple[float, float, float, float],
    back: Tuple[float, float, float, float],
) -> Any
```

- front: Tuple[float, float, float, float]，血条颜色的 RGBA 值，范围 0-1。
- back: Tuple[float, float, float, float]，背景颜色的 RGBA 值，范围 0-1。

**备注**

- 必须用 game 组件设置 [ShowHealthBar](/docs/docs/scripts/modapi/interfaces/entity/render#showhealthbar) 时才能显示血条！！

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateHealth(entityId)
comp.SetColor((0, 0, 0, 1), (1, 1, 1, 1))
```

</TabItem>
</Tabs>

---

### SetEntityExtraUniforms

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

设置可在实体 shader 当中使用的自定义变量的值。该自定义变量总共可设置 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4，总共 4 组，每组为一个 vec4(float, float, float ,float)类型的向量，向量的默认值为(1.0,1.0,1.0,1.0)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityExtraUniforms(
    uniformIndex: int,
    data: Tuple[float, float, float, float],
) -> bool
```

- uniformIndex: int，需要设置的自定义变量的下标，值范围为 1~4。分别对应 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4。
- data: Tuple[float, float, float, float]，需要设置的自定义变量的值。

**返回值**：bool，设置是否成功，成功返回 True，否则返回 False。

**备注**

- 此接口是针对使用了原版 BB 模型的实体，使用了骨骼模型的实体和玩家请使用 [SetExtraUniformValue](/docs/docs/scripts/modapi/interfaces/model#setextrauniformvalue) 接口进行动态设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
# 对实体id为entityId的实体设置自定义变量EXTRA_ACTOR_UNIFORM1的值
print actorRenderComp.SetEntityExtraUniforms(1, (2.5,2.5,2.5,2.5))
# 对实体id为entityId的实体设置自定义变量EXTRA_ACTOR_UNIFORM3的值
print actorRenderComp.SetEntityExtraUniforms(3, (3.0,3.0,3.0,3.0))
# 接下来，我们在实体的vertex shader或是fragment shader中做如下声明及使用：
#
# // .. 省略其他代码
# // 声明这两个自定义变量
# uniform vec4 EXTRA_ACTOR_UNIFORM1;
# uniform vec4 EXTRA_ACTOR_UNIFORM3;
#
# void main() {
#    vec4 my_custom_value = EXTRA_ACTOR_UNIFORM1;
#    vec4 my_custom_value = EXTRA_ACTOR_UNIFORM3;
#    // .. do what you want ..
# }
```

</TabItem>
</Tabs>

---

### SetEntityRenderDistance

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

设置玩家周围的实体的可渲染距离。玩家周围的实体指这个区块内的实体，也包含玩家自身。实体的渲染距离指，实体的位置到玩家相机位置的距离。可渲染距离指，如果实体的渲染距离在可渲染距离之内，则实体会被渲染出来，如果在距离以外，则实体不会被渲染出来。仅对本地玩家有效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityRenderDistance(distance: float) -> bool
```

- distance: float，实体的可渲染距离，有效值范围为大于等于 0。如果小于 0，则使用原版游戏内的默认可渲染距离。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

**备注**

- 需要特别注意，该渲染距离指的是实体的位置到玩家相机的位置，而非玩家的位置。当玩家相机视觉上下转动或是左右转动时，玩家相机的位置是绕以相机中心为球心的球形表面进行旋转。因此视觉转动时，玩家相机位置与实体之间距离也会进行改变，导致该实体的渲染距离改变。一些玩法会改变相机位置制作来超远或者超过视角的，可能会出现看不到玩家自身模型的问题。此时可以调用该接口来调整渲染距离，从而使得玩家自身可见或不可见。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
# 设置实体的可渲染距离为48
print actorRenderComp.SetEntityRenderDistance(48)
```

</TabItem>
</Tabs>

---

### SetEntityUIExtraUniforms

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(None)`

设置可在实体 shader 当中使用的 UI 自定义变量的值，可在微软 UI 纸娃娃（paperdoll）及网易版纸娃娃（neteasepaperdoll)上使用 identifier 渲染某一类生物实体时使用。该自定义变量总共可设置 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4，总共 4 组，每组为一个 vec4(float, float, float ,float)类型的向量，向量的默认值为(1.0,1.0,1.0,1.0)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityUIExtraUniforms(
    entityIdentifier: str,
    uniformIndex: int,
    data: Tuple[float, float, float, float],
) -> bool
```

- entityIdentifier: str，需要设置的实体 identifier。如果需要对玩家设置，则填写 minecraft:player。
- uniformIndex: int，需要设置的自定义变量的下标，值范围为 1~4。分别对应 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4。
- data: Tuple[float, float, float, float]，需要设置的自定义变量的值。

**返回值**：bool，设置是否成功，成功返回 True，否则返回 False。

**备注**

- 此接口是针对使用了原版 BB 模型的实体，使用了骨骼模型的实体和玩家请使用 [SetExtraUniformValue](/docs/docs/scripts/modapi/interfaces/model#setextrauniformvalue) 接口进行动态设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender(None)
# 对苦力怕设置自定义变量EXTRA_ACTOR_UNIFORM1的值
print actorRenderComp.SetEntityUIExtraUniforms("minecraft:creeper", 1, (2.5,2.5,2.5,2.5))
# 对玩家实体设置自定义变量EXTRA_ACTOR_UNIFORM3的值
print actorRenderComp.SetEntityUIExtraUniforms("minecraft:player", 3, (3.0,3.0,3.0,3.0))
# 接下来，我们在实体的vertex shader或是fragment shader中做如下声明及使用：
#
# // .. 省略其他代码
# // 声明这两个自定义变量
# uniform vec4 EXTRA_ACTOR_UNIFORM1;
# uniform vec4 EXTRA_ACTOR_UNIFORM3;
#
# void main() {
#    vec4 my_custom_value = EXTRA_ACTOR_UNIFORM1;
#    vec4 my_custom_value = EXTRA_ACTOR_UNIFORM3;
#    // .. do what you want ..
# }
```

</TabItem>
</Tabs>

---

### SetHealthBarDeviation

<Client/> HealthComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateHealth(entityId)`

设置某个 entity 血条的相对高度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetHealthBarDeviation(health_bar_deviation: float) -> bool
```

- health_bar_deviation: float，血条的相对高度。

**返回值**：bool，是否设置成功。

**备注**

- 必须用 game 组件设置 [ShowHealthBar](/docs/docs/scripts/modapi/interfaces/entity/render#showhealthbar) 时才能显示血条；血条默认在生物 AABB 上方 1.5 高度处。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateHealth(entityId)
# 设置血条的相对高度
comp.SetHealthBarDeviation(1.0)
```

</TabItem>
</Tabs>

---

### SetNameDeeptest

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

设置名字是否透视。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetNameDeeptest(deeptest: bool) -> bool
```

- deeptest: bool，True 为不透视。默认情况下为透视。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
# 设置为不透视
comp.SetNameDeeptest(True)
```

</TabItem>
</Tabs>

---

### SetNotRenderAtAll

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(entityId)`

设置是否关闭实体渲染。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetNotRenderAtAll(notRender: bool) -> bool
```

- notRender: bool，True 表示不渲染该实体。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 不渲染单个实体 entityId
comp = clientApi.GetEngineCompFactory().CreateActorRender(entityId)
comp.SetNotRenderAtAll(True)
# 重新开始渲染该实体
comp.SetNotRenderAtAll(False)
```

</TabItem>
</Tabs>

---

### SetRenderLocalPlayer

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

设置本地玩家是否渲染。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRenderLocalPlayer(render: bool) -> bool
```

- render: bool，True 为渲染。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
# 不渲染本地玩家
comp.SetRenderLocalPlayer(False)
```

</TabItem>
</Tabs>

---

### SetShowName

<Client/> NameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateName(entityId)`

设置生物名字是否按照默认游戏逻辑显示（包括玩家）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetShowName(show: bool) -> bool
```

- show: bool，True 为显示。

**返回值**：bool，返回是否设置成功。

**备注**

- 当设置为 True 时，生物的名字显示遵循游戏默认的渲染逻辑，即普通生物需要中心点指向生物才显示名字，玩家则是会一直显示名字但设置为 False 时，生物名字不再显示。生物名字显示与否还会受到全局名字显示与否影响，详见接口 [HideNameTag](/docs/docs/scripts/modapi/interfaces/world/render#hidenametag)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateName(entityId)
# 不显示头上的名字
comp.SetShowName(False)
```

</TabItem>
</Tabs>

---

### ShowHealth

<Client/> HealthComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateHealth(entityId)`

设置某个 entity 是否显示血条，默认为显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ShowHealth(show: bool) -> Any
```

- show: bool，设置是否显示。

**备注**

- 必须用 game 组件设置 [ShowHealthBar](/docs/docs/scripts/modapi/interfaces/entity/render#showhealthbar) 时才能显示血条！！

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateHealth(entityId)
# 设置该entity不显示血条
comp.ShowHealth(False)
```

</TabItem>
</Tabs>

---

### ShowHealthBar

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

设置是否显示血条。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ShowHealthBar(show: bool) -> bool
```

- show: bool，True 为显示。开启后可用 health 组件的 [SetColor](/docs/docs/scripts/modapi/interfaces/entity/render#setcolor)、[ShowHealth](/docs/docs/scripts/modapi/interfaces/entity/render#showhealth) 接口，单独设置某个实体的血条颜色及是否显示。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.ShowHealthBar(True)
```

</TabItem>
</Tabs>

---
