---
sidebar_position: 8
---

# 渲染

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录渲染相关的接口，共 18 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wanjia/xuanran.html"/>

---

### AddPlayerAnimation

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

增加玩家渲染动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerAnimation(animationKey: str, animationName: str) -> bool
```

- animationKey: str，动画键。
- animationName: str，动画名称。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。
- 该接口的 animationName 参数不能传入带有大写字母的字符串，否则动画将注册失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerAnimation("move.arms", "animation.player.move.arms_custom")
```

</TabItem>
</Tabs>

---

### AddPlayerAnimationController

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

增加玩家渲染动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerAnimationController(
    animationControllerKey: str,
    animationControllerName: str,
) -> bool
```

- animationControllerKey: str，动画控制器键。
- animationControllerName: str，动画控制器名称。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerAnimationController("root", "controller.animation.player.root_custom")
```

</TabItem>
</Tabs>

---

### AddPlayerAnimationIntoState

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

在玩家的动画控制器中的状态添加动画或者动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerAnimationIntoState(
    animationControllerName: str,
    stateName: str,
    animationName: str,
    condition: str,
) -> bool
```

- animationControllerName: str，动画控制器名称，如 root（controller.animation.player.root）。
- stateName: str，动画状态名称，如 first_person。
- animationName: str，添加的动画名称或动画控制器名称，如 first_person_attack_controller_new。
- condition: str，动画控制表达式，默认为空，如 query.mod.index > 0。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerAnimationIntoState("root", "first_person", "first_person_attack_controller_new", "query.mod.index > 0")
```

</TabItem>
</Tabs>

---

### AddPlayerGeometry

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

增加玩家渲染几何体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerGeometry(geometryKey: str, geometryName: str) -> bool
```

- geometryKey: str，渲染几何体键，如玩家默认几何体 default。
- geometryName: str，渲染几何体名称，如玩家默认几何体 geometry.humanoid.custom。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 动画和贴图都是与几何体密切相关的，改变几何体也需要改变动画与贴图。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerGeometry("default", "geometry.player.custom")
```

</TabItem>
</Tabs>

---

### AddPlayerParticleEffect

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

增加玩家特效资源。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerParticleEffect(effectKey: str, effectName: str) -> bool
```

- effectKey: str，特效资源 Key，如 bee.entity.json 中的 nectar_dripping。
- effectName: str，特效资源名称，如 minecraft:nectar_drip_particle。

**返回值**：bool，是否成功。

**备注**

- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。
- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerParticleEffect("nectar_dripping", "minecraft:nectar_drip_particle")
```

</TabItem>
</Tabs>

---

### AddPlayerRenderController

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

增加玩家[渲染控制器](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_7-自定义渲染控制器)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerRenderController(renderControllerName: str, condition: str) -> bool
```

- renderControllerName: str，渲染控制器名称。
- condition: str，渲染控制器条件。

**返回值**：bool，添加是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerRenderController('custom_render_controller_name', 'query.mod.condition')
```

</TabItem>
</Tabs>

---

### AddPlayerRenderMaterial

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

增加玩家渲染需要的[材质](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_3-自定义材质)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerRenderMaterial(materialKey: str, materialName: str) -> bool
```

- materialKey: str，材质 key。
- materialName: str，材质名称。

**返回值**：bool，添加是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerRenderMaterial('custom_material_key', 'custom_material_name')
```

</TabItem>
</Tabs>

---

### AddPlayerScriptAnimate

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

在玩家的客户端实体定义（minecraft:client_entity）json 中的 scripts/animate 节点添加动画/动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerScriptAnimate(
    animateName: str,
    condition: str,
    autoReplace: bool = False,
) -> bool
```

- animateName: str，动画/动画控制器名称，如 look_at_target。
- condition: str，动画/动画控制器控制表达式，默认为空，如 query.mod.index > 0。
- autoReplace: bool，是否覆盖已存在的动画/动画控制器，默认值为 False。

**返回值**：bool，是否成功。

**备注**

- 该接口只对 CreateActorRender 时传入的 playerId 起效果。
- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerAnimationController("animation_controller_short_name", "controller.animation.player.root_custom")
comp.AddPlayerScriptAnimate("animation_controller_short_name", "query.mod.index > 0")
```

</TabItem>
</Tabs>

---

### AddPlayerSoundEffect

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

增加玩家音效资源。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerSoundEffect(soundKey: str, soundName: str) -> bool
```

- soundKey: str，音效资源 Key。
- soundName: str，音效资源名称。

**返回值**：bool，是否成功。

**备注**

- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。
- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 音效在 RP/entities/player.entity.json # minecraft:client_entity / description 中的定义如下："sound_effects": \{ "sound_thunder": "ambient.weather.thunder" # ambient.weather.thunder 是 sound_definitions 中定义 \} 如果在动作中同步播放音频，可以在 RP/animations/player.animation_controllers.json # animation_controllers / controller.animation.player.root 中定义如下："dripping": \{ "sound_effects": [ \{ "effect": "sound_thunder" \} ], "transitions": [ \{ "third_person": "!query.mod.is_powered" \} ] \},

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerSoundEffect("sound_thunder", "ambient.weather.thunder")
```

</TabItem>
</Tabs>

---

### AddPlayerTexture

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

增加玩家渲染贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPlayerTexture(textureKey: str, textureName: str) -> bool
```

- textureKey: str，贴图键。
- textureName: str，贴图路径。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.AddPlayerTexture("default", "textures/misc/missing_texture")
```

</TabItem>
</Tabs>

---

### RebuildPlayerRender

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

重建玩家的数据渲染器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RebuildPlayerRender(clearBindParticle: bool = False) -> bool
```

- clearBindParticle: bool，是否清除粒子，默认为 False。

**返回值**：bool，重建是否成功。

**备注**

- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.RebuildPlayerRender()
```

</TabItem>
</Tabs>

---

### RemovePlayerAnimationController

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

移除玩家渲染动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemovePlayerAnimationController(animationControllKey: str) -> bool
```

- animationControllKey: str，动画控制器键。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.RemovePlayerAnimationController("root")
```

</TabItem>
</Tabs>

---

### RemovePlayerAnimationFromState

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

在玩家的动画控制器中的状态移除动画或者动画控制器。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemovePlayerAnimationFromState(
    animationControllerName: str,
    stateName: str,
    animationName: str,
) -> bool
```

- animationControllerName: str，动画控制器名称，如 root（controller.animation.player.root）。
- stateName: str，动画状态名称，如 first_person。
- animationName: str，要移除的动画名称或动画控制器名称，如 first_person_attack_controller_new。

**返回值**：bool，是否成功。controller/state 不存在或参数错误返 False；动画不在该 state 中视为幂等成功，返 True。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.RemovePlayerAnimationFromState("root", "first_person", "first_person_attack_controller_new")
```

</TabItem>
</Tabs>

---

### RemovePlayerGeometry

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

删除玩家渲染几何体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemovePlayerGeometry(geometryKey: str) -> bool
```

- geometryKey: str，渲染几何体名称键，如玩家默认几何体 default。

**返回值**：bool，是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 动画和贴图都是与几何体密切相关的，改变几何体也需要改变动画与贴图。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# geometry definition in player.entity.json
"geometry": {
    "default": "geometry.humanoid.custom",
    "cape": "geometry.cape"
}
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.RemovePlayerGeometry("default")
```

</TabItem>
</Tabs>

---

### RemovePlayerRenderController

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

删除玩家[渲染控制器](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/3-zidingyishengwu/01-zidingyijichushengwu.html#_7-自定义渲染控制器)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemovePlayerRenderController(renderControllerName: str) -> bool
```

- renderControllerName: str，渲染控制器名称。

**返回值**：bool，删除是否成功。

**备注**

- 调用该接口后需要调用 [RebuildPlayerRender](/docs/docs/scripts/modapi/interfaces/player/render#rebuildplayerrender) 才会生效。
- 该玩家重新进入视野时仍会生效，引擎会自动重新调用一遍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.RemovePlayerRenderController('custom_render_controller_name')
```

</TabItem>
</Tabs>

---

### ResetSkin

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(playerId)`

还原默认皮肤。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetSkin(isSteve: bool) -> bool
```

- isSteve: bool，是否还原成 Steve 默认皮肤, 默认为 True。当 isSteve 为 False 时，则还原成资源中心中购买并穿戴的皮肤。

**返回值**：bool，设置是否成功。

**备注**

- 还原后，对玩家使用过的 actorRender 组件接口（如 [AddPlayerRenderController](/docs/docs/scripts/modapi/interfaces/player/render#addplayerrendercontroller) 依然生效）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(playerId)
comp.ResetSkin()
```

</TabItem>
</Tabs>

---

### SetPlayerItemInHandVisible

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

设置是否隐藏玩家的手持物品模型显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPlayerItemInHandVisible(visible: bool, mode: int = 0) -> bool
```

- visible: bool，设置是否显示或隐藏，True 表示显示，False 表示隐藏。
- mode: int，设置隐藏手持物品在哪一个视角模式生效。mode=0 时，表示第一人称和第三人称下均隐藏手持物品；mode=1 时表示仅隐藏第三人称下的手持物品；mode=2 时表示仅隐藏第一人称下的手持物品。默认值为 0。填入 0,1,2 以外的数值会被强制设置为 0。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
actorRenderComp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
# 隐藏指定玩家的手持物品模型显示
print actorRenderComp.SetPlayerItemInHandVisible(False, 0)
```

</TabItem>
</Tabs>

---

### SetSkin

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(playerId)`

更换原版自定义皮肤。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSkin(skin: str) -> bool
```

- skin: str，贴图路径，以 textures/models 为当前路径的相对路径。

**返回值**：bool，设置是否成功。

**备注**

- 会覆盖原有皮肤（包括 4d 皮肤）。但会被骨骼模型覆盖。
- 只能修改 Steve 模型的皮肤，不能修改 Alex 模型的皮肤。
- 如需修改细手臂模型皮肤，请使用 [AddPlayerTexture](/docs/docs/scripts/modapi/interfaces/player/render#addplayertexture) 修改 default 键对应的贴图。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(playerId)
comp.SetSkin("kagura")
```

</TabItem>
</Tabs>

---
