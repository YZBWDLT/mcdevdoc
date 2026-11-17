---
sidebar_position: 1
---

# 模型

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录模型相关的接口，共 24 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/xunishijie/moxing.html"/>

---

### ModelCancelAllBoneMask

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

取消动画中的所有骨骼屏蔽。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelCancelAllBoneMask(objId: int, animationName: str) -> bool
```

- objId: int，模型对象的 id。
- animationName: str，模型的动画。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.ModelCancelAllBoneMask(objId, "attack")
```

</TabItem>
</Tabs>

---

### ModelCreateMinecraftObject

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

在虚拟世界中创建微软原版模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelCreateMinecraftObject(identifier: str) -> int
```

- identifier: str，模型的 identifier。

**返回值**：int，返回模型对象的 id, 失败时返回-1。

**备注**

- 创建模型后需要使用 [ModelUpdateAnimationMolangVariable](/docs/docs/scripts/modapi/interfaces/virtual_world/model#modelupdateanimationmolangvariable) 为该模型 json 动作文件里面的所有变量进行赋值，不然运行时会有大量非空判断处理，会产生性能下降。
- 模型创建时初始默认朝向为+z 方向, 位置为相机朝向的正前方 10 个单位，建议后续对坐标进行修改。
- 创建的原版模型需要改变播放的动作,只能通过 [ModelUpdateAnimationMolangVariable](/docs/docs/scripts/modapi/interfaces/virtual_world/model#modelupdateanimationmolangvariable) 接口修改 molang 变量进行控制,不兼容组件中的其它动作接口。
- 暂不支持的微软原版模型：minecraft:horse（马）、minecraft:donkey（驴）、minecraft:mule（骡子）、minecraft:skeleton_horse（骷髅马）、minecraft:zombie_horse（僵尸马）、minecraft:llama（羊驼）、minecraft:tropicalfish（热带鱼）、minecraft:slime（史莱姆）、minecraft:magma_cube（岩浆怪）、minecraft:ghast（恶魂）、minecraft:shulker（潜影贝）、minecraft:ender_dragon（末影龙）、minecraft:thrown_trident（三叉戟）、minecraft:ender_crystal（末影水晶）、minecraft:boat（船）、minecraft:tnt（TNT）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.ModelCreateMinecraftObject("minecraft:sheep")
virtualWorldComp.ModelUpdateAnimationMolangVariable(id, {"variable.state": 2, "variable.liedownamount": 0})
```

</TabItem>
</Tabs>

---

### ModelCreateObject

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

在虚拟世界中创建网易骨骼模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelCreateObject(modelName: str, animationName: str) -> int
```

- modelName: str，模型的资源。
- animationName: str，模型的动画。

**返回值**：int，返回模型对象的 id, 失败时返回-1。

**备注**

- 模型创建时初始默认朝向为+z 方向, 位置为相机朝向的正前方 10 个单位，建议后续对坐标进行修改。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.ModelCreateObject("datiangou", "run")
```

</TabItem>
</Tabs>

---

### ModelGetPos

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

获取模型的坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelGetPos(objId: int) -> Tuple[float, float, float]
```

- objId: int，模型对象的 id。

**返回值**：Tuple[float, float, float]，模型的坐标(x, y, z), 模型不存在的话则返回 None。

**备注**

- 若对象绑定到其它对象上，则返回无意义，以绑定时参数为准。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetPos(objId, (0.0, 0.0, -10.0))
pos = virtualWorldComp.ModelGetPos(objId)
```

</TabItem>
</Tabs>

---

### ModelGetRot

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

返回模型的旋转角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelGetRot(objId: int) -> Tuple[float, float, float]
```

- objId: int，模型对象的 id。

**返回值**：Tuple[float, float, float]，旋转角度(x, y, z), 模型不存在则返回 None。

**备注**

- 若对象绑定到其它对象上，则返回无意义，以绑定时参数为准。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetRot(objId, (0.0, 90.0, 0.0))
rot = virtualWorldComp.ModelGetRot(objId)
```

</TabItem>
</Tabs>

---

### ModelIsVisible

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

返回模型可见性。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelIsVisible(objId: int) -> bool
```

- objId: int，模型对象的 id。

**返回值**：bool，是否可见。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
id = virtualWorldComp.ModelCreateObject("datiangou", "run")
print(virtualWorldComp.ModelIsVisible(id))
```

</TabItem>
</Tabs>

---

### ModelMoveTo

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置模型平移运动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelMoveTo(
    objId: int,
    pos: Tuple[float, float, float],
    time: float,
    ease: TimeEaseType = TimeEaseType.linear,
) -> bool
```

- objId: int，模型对象的 id。
- pos: Tuple[float, float, float]，坐标值(x, y, z)。
- time: float，单位秒，运动时长（大于 0 的浮点数）。
- ease: TimeEaseType，时间变化函数, 默认值为 clientApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().TimeEaseType.linear, 参数不在枚举值中也当作 linear。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetPos(objId, (0.0, 0.0, 0.0))
virtualWorldComp.ModelMoveTo(objId, (0.0, 0.0, -10.0), 3.0, clientApi.GetMinecraftEnum().TimeEaseType.linear)
```

</TabItem>
</Tabs>

---

### ModelPlayAnimation

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

模型播放动画，支持动作融合，其功能与模型接口 [ModelPlayAni](/docs/docs/scripts/modapi/interfaces/model#modelplayani) 相同。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelPlayAnimation(
    objId: int,
    animationName: str,
    loop: bool,
    isBlended: bool = False,
    layer: int = 0,
) -> bool
```

- objId: int，模型对象的 id。
- animationName: str，模型的动画。
- loop: bool，是否循环播放。
- isBlended: bool，播放时是与当前动画混合还是中止当前动画的播放，默认 False，即中止当前动画播放。设置为 True 时，将允许即将播放的动画进行混合(注意，在没有设置骨骼屏蔽或是设置线性混合参数的情况下不会产生混合效果)。另外，动画混合仅在相同层级的动画之间进行。若当前播放的动画与即将播放的动画层级不一样，则 isBlended 参数无效。
- layer: int，设置骨骼动画的层级，范围为 0~255，默认为 0。注意，如果播放的动画已经存在，则会将原有的动画层级覆盖。动画层级越大，则优先度越高，骨骼模型的骨骼优先播放优先度最高的动画。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelPlayAnimation(objId, "fengxi", True)
```

</TabItem>
</Tabs>

---

### ModelRegisterAnim1DControlParam

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

当同时播放多个骨骼动画时，新建用于控制动画进行 1D 线性混合的参数。目前线性混合仅支持对两个动画进行混合。新建的参数值范围为[0,1]。指定的骨骼将会按照这个参数的值对两个动画进行线性混合。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelRegisterAnim1DControlParam(
    objId: int,
    leftAniName: str,
    rightAniName: str,
    paramName: str,
) -> bool
```

- objId: int，模型对象的 id。
- leftAniName: str，混合的第一个动画名称，当 1D 参数的值为 0 时指定的骨骼仅播放这个动画。
- rightAniName: str，混合的第二个动画名称，当 1D 参数的值为 1 时指定的骨骼仅播放这个动画。
- paramName: str，自定义的 1D 参数名称。该参数新建后的初始值为 0。

**返回值**：bool，设置是否成功。

**备注**

- 注意，如果对某个骨骼使用了骨骼屏蔽，则这个 1D 线性混合将对该骨骼不会生效。另外，如果在使用该接口时新建一个已经存在的参数名称，则会将原来的参数覆盖。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
# 新建1D控制参数，用于对attack和walk这两个动画进行线性混合，参数的名称为“arm_control_param”。
virtualWorldComp.ModelRegisterAnim1DControlParam(objId, "attack", "walk", "arm_control_param")
# 相继播放这两个动画，设置isBlend为True，开启动画混合。
virtualWorldComp.ModelPlayAnimation(objId, "attack", True, True)
virtualWorldComp.ModelPlayAnimation(objId, "walk",True, True)
# 改变1D控制参数的值，两个动画将根据该值进行线性混合。可根据实际情况进行动态调整。
virtualWorldComp.ModelSetAnim1DControlParam(objId, "arm_control_param", 0.5)
```

</TabItem>
</Tabs>

---

### ModelRemove

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

销毁虚拟世界中的模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelRemove(objId: int) -> bool
```

- objId: int，模型对象的 id。

**返回值**：bool，是否销毁成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelRemove(objId)
```

</TabItem>
</Tabs>

---

### ModelRotate

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

模型绕某个轴旋转多少度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelRotate(
    objId: int,
    degreeAngle: float,
    axis: Tuple[float, float, float],
) -> bool
```

- objId: int，模型对象的 id。
- degreeAngle: float，旋转角度，为了避免数值过大出现浮点误差，建议角度范围控制在-360 度到 360 度。
- axis: Tuple[float, float, float]，旋转轴(x, y, z)。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelRotate(objId, 90.0, (0.0, 1.0, 0.0))
```

</TabItem>
</Tabs>

---

### ModelRotateTo

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置模型旋转运动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelRotateTo(
    objId: int,
    rot: Tuple[float, float, float],
    time: float,
    ease: TimeEaseType = TimeEaseType.linear,
) -> bool
```

- objId: int，模型对象的 id。
- rot: Tuple[float, float, float]，旋转值(x, y, z)。
- time: float，单位秒，运动时长（大于 0 的浮点数）。
- ease: TimeEaseType，时间变化函数, 默认值为 clientApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/interfaces/general/tool#getminecraftenum)().TimeEaseType.linear, 参数不在枚举值中也当作 linear。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetRot(objId, (0.0, 0.0, 0.0))
virtualWorldComp.ModelRotateTo(objId, (0.0, 90.0, 0.0), 3.0, clientApi.GetMinecraftEnum().TimeEaseType.linear)
```

</TabItem>
</Tabs>

---

### ModelSetAnim1DControlParam

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

新建动画的 1D 控制参数后，使用该接口对相应的参数进行控制。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelSetAnim1DControlParam(objId: int, paramName: str, value: float) -> bool
```

- objId: int，模型对象的 id。
- paramName: str，使用接口 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/interfaces/model#registeranim1dcontrolparam) 所新建的自定义 1D 参数名称。该参数新建后的初始值为 0。
- value: float，参数的值，范围为[0,1]。当 1D 参数的值为 0 时仅播放接口 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/interfaces/model#registeranim1dcontrolparam) 中的 leftAniName 参数指定的动画，当 1D 参数的值为 1 时仅播放接口 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/interfaces/model#registeranim1dcontrolparam) 中的 rightAniName 参数指定的动画。

**返回值**：bool，设置是否成功。

**备注**

- 注意，如果对某个骨骼使用了骨骼屏蔽，则这个 1D 线性混合将对该骨骼不会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
# 新建1D控制参数，用于对attack和walk这两个动画进行线性混合，参数的名称为“arm_control_param”。
virtualWorldComp.ModelRegisterAnim1DControlParam(objId, "attack", "walk", "arm_control_param")
# 相继播放这两个动画，设置isBlend为True，开启动画混合。
virtualWorldComp.ModelPlayAnimation(objId, "attack", True, True)
virtualWorldComp.ModelPlayAnimation(objId, "walk",True, True)
# 改变1D控制参数的值，两个动画将根据该值进行线性混合。可根据实际情况进行动态调整。
virtualWorldComp.ModelSetAnim1DControlParam(objId, "arm_control_param", 0.5)
```

</TabItem>
</Tabs>

---

### ModelSetAnimAllBoneMask

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置是否屏蔽动画中所有骨骼的动画，若开启骨骼屏蔽后，该骨骼将不再播放该动画中的动作。该接口会对该动画中所有骨骼生效，可通过参数 ignoreBoneList 来指定不受影响的骨骼名称。通过屏蔽指定骨骼的动画可实现同一个骨骼模型同时在不同骨骼上播放不同的动作动画，从而实现快捷的动作融合。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelSetAnimAllBoneMask(
    objId: int,
    animationName: str,
    ignoreBonesList: List[str],
    enable: bool,
    applyToChild: bool = True,
) -> bool
```

- objId: int，模型对象的 id。
- animationName: str，模型的动画。
- ignoreBonesList: List[str]，忽视的骨骼名称列表。在这个列表中的骨骼将不会被影响。输入空列表时则对所有骨骼执行这次设置。
- enable: bool，是否启用该骨骼的动画。True 为不屏蔽，启动该骨骼的动画。False 为屏蔽，不启动该骨骼的动画。
- applyToChild: bool，True 为对 ignoreBoneList 中的骨骼的子骨骼也生效，False 为仅对 ignoreBoneList 中的骨骼生效，默认为 True。若 ignoreBoneList 为空列表，则 applyToChild 无效果。

**返回值**：bool，设置是否成功。

**备注**

- 在使用该接口屏蔽上下半身的动画时，如果骨骼当中存在 root 骨骼，并且 root 骨骼的子骨骼包含上下半身的骨骼的话，root 骨骼往往会控制整体骨骼模型的移动，要注意 root 骨骼对其他骨骼的影响。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
# 屏蔽名为attack动画中所有骨骼的动画，"l_arm"及"r_arm"这两个不受影响，其子骨骼也不受影响
virtualWorldComp.ModelSetAnimAllBoneMask(objId, "attack", ["l_arm", "r_arm"], False, True)
```

</TabItem>
</Tabs>

---

### ModelSetAnimBoneMask

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置是否屏蔽动画中指定的骨骼的动画，若开启骨骼屏蔽后，该骨骼将不再播放该动画中的动作。通过屏蔽指定骨骼的动画可实现同一个骨骼模型同时在不同骨骼上播放不同的动作动画，从而实现快捷的动作融合。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelSetAnimBoneMask(
    objId: int,
    animationName: str,
    boneNamesList: List[str],
    enable: bool,
    applyToChild: bool = True,
) -> bool
```

- objId: int，模型对象的 id。
- animationName: str，模型的动画。
- boneNamesList: List[str]，骨骼名称列表。
- enable: bool，是否启用该骨骼的动画。True 为不屏蔽，启动该骨骼的动画。False 为屏蔽，不启动该骨骼的动画。
- applyToChild: bool，True 为对该骨骼及其子骨骼生效，False 为仅对该骨骼生效，默认为 True。

**返回值**：bool，设置是否成功。

**备注**

- 在使用该接口屏蔽上下半身的动画时，如果骨骼当中存在 root 骨骼，并且 root 骨骼的子骨骼包含上下半身的骨骼的话，root 骨骼往往会控制整体骨骼模型的移动，要注意 root 骨骼对其他骨骼的影响。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
# 屏蔽名为attack动画中的"l_arm"及"r_arm"的骨骼的动画，对其子骨骼也生效
virtualWorldComp.ModelSetAnimBoneMask(objId, "attack", ["l_arm", "r_arm"], False, True)
```

</TabItem>
</Tabs>

---

### ModelSetAnimLayer

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置骨骼动画的层级，动画层级越大，则优先度越高，骨骼模型的骨骼优先播放优先度最高的动画，相同层级的动画则优先播放率先播放的动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelSetAnimLayer(objId: int, animationName: str, layer: int) -> bool
```

- objId: int，模型对象的 id。
- animationName: str，模型的动画。
- layer: int，动画层级，正整数，范围为 0~255。

**返回值**：bool，设置是否成功。

**备注**

- 注意，设置层级相同的情况下不会改变当前的优先播放序列。举个例子：当前存在动画 A 及动画 B，动画 A 的层级为 1，动画 B 的层级为 0，此时骨骼模型播放的动画为动画 A。如果将动画 A 的层级设置为 0，即动画 A 及动画 B 的层级相同，则当前仍然会播放动画 A，因为层级相同的情况下不会改变目前的优先播放序列。要想让骨骼模型播放动画 B，则需要动画 B 的层级比动画 A 的层级高。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.ModelSetAnimLayer(objId, "attack", 1)
```

</TabItem>
</Tabs>

---

### ModelSetBoxCollider

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置模型的包围盒。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelSetBoxCollider(
    objId: int,
    lengths: Tuple[float, float, float],
    offset: Tuple[float, float, float] = (0.0,0.0,0.0),
) -> bool
```

- objId: int，模型对象的 id。
- lengths: Tuple[float, float, float]，模型包围盒各个方向的长度,(x,y,z)。
- offset: Tuple[float, float, float]，模型包围盒中心的偏移,(x,y,z),默认为(0.0,0.0,0.0)。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetBoxCollider(objId, (2.0, 2.0, 2.0), (0.0, 0.0, 0.0))
```

</TabItem>
</Tabs>

---

### ModelSetPos

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置模型坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelSetPos(objId: int, pos: Tuple[float, float, float]) -> bool
```

- objId: int，模型对象的 id。
- pos: Tuple[float, float, float]，坐标(x, y, z)。

**返回值**：bool，是否设置成功。

**备注**

- 若对象绑定到其它对象上，则修改无效，实际位置以绑定时参数为准。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetPos(objId, (0.0, 0.0, -10.0))
```

</TabItem>
</Tabs>

---

### ModelSetRot

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置模型的旋转角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelSetRot(objId: int, rot: Tuple[float, float, float] = (0, 0, 0)) -> bool
```

- objId: int，模型对象的 id。
- rot: Tuple[float, float, float]，旋转角度(x, y, z)初始默认为(0, 0, 0)，指向 z 轴负方向。为了避免数值过大出现浮点误差，建议各维度角度控制范围在-360 度到 360 度。

**返回值**：bool，是否设置成功。

**备注**

- 若对象绑定到其它对象上，则修改无效，实际旋转角度以绑定时参数为准。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetRot(objId, (0.0, 90.0, 0.0))
```

</TabItem>
</Tabs>

---

### ModelSetScale

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置模型的缩放值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelSetScale(objId: int, scales: Tuple[float, float, float]) -> bool
```

- objId: int，模型对象的 id。
- scales: Tuple[float, float, float]，缩放值(x, y, z)。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetScale(objId, (2.0, 2.0, 2.0))
```

</TabItem>
</Tabs>

---

### ModelSetVisible

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

设置模型可见性。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelSetVisible(objId: int, isVisible: bool) -> bool
```

- objId: int，模型对象的 id。
- isVisible: bool，是否可见。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
id = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetVisible(id, False)
```

</TabItem>
</Tabs>

---

### ModelStopActions

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

停止模型的移动和旋转运动。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelStopActions(objId: int) -> bool
```

- objId: int，模型对象的 id。

**返回值**：bool，是否停止成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
virtualWorldComp.ModelSetPos(objId, (0.0, 0.0, 0.0))
virtualWorldComp.ModelSetRot(objId, (0.0, 0.0, 0.0))
virtualWorldComp.ModelMoveTo(objId, (0.0, 0.0, -10.0), 3.0, clientApi.GetMinecraftEnum().TimeEaseType.linear)
virtualWorldComp.ModelRotateTo(objId, (0.0, 90.0, 0.0), 3.0, clientApi.GetMinecraftEnum().TimeEaseType.linear)
virtualWorldComp.ModelStopActions(objId)
```

</TabItem>
</Tabs>

---

### ModelStopAnimation

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

停止播放指定的模型动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelStopAnimation(objId: int, animationName: str) -> bool
```

- objId: int，模型对象的 id。
- animationName: str，模型的动画。

**返回值**：bool，是否暂停成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.ModelStopAnimation(objId, "fengxi")
```

</TabItem>
</Tabs>

---

### ModelUpdateAnimationMolangVariable

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

更新微软原版模型表达式变量，可控制动作的改变。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelUpdateAnimationMolangVariable(
    objId: int,
    molangDict: Dict[str, Any],
) -> bool
```

- objId: int，模型对象的 id。
- molangDict: Dict[str, Any]，键值对形式的数据。

**返回值**：bool，是否设置成功。

**备注**

- 如果创建模型后同一帧内马上调用该接口，则客户端实体配置中的 scripts/initialize 字段不再会执行。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
id = virtualWorldComp.ModelCreateMinecraftObject("minecraft:cat")
virtualWorldComp.ModelUpdateAnimationMolangVariable(id, {"variable.state": 2, "variable.liedownamount": 0})
```

</TabItem>
</Tabs>

---
