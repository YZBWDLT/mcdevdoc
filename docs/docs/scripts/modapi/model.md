---
sidebar_position: 11
---

# 模型

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录模型相关的接口，共 58 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/moxing.html"/>

---

### BindItemToBone

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

将使用了骨骼模型的玩家的手持物绑定到指定的骨骼上。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindItemToBone(
    modelId: int,
    boneName: str,
    bindSlot: int = 0,
    offset: Tuple[float, float, float] = (0,0,0),
    rotation: Tuple[float, float, float] = (0,0,0),
    scale: Tuple[float, float, float] = (1,1,1),
) -> bool
```

- modelId: int，指定挂接的骨骼模型 id。
- boneName: str，指定骨骼模型的骨骼名。
- bindSlot: int，绑定手持物的 slot，0 为主手，1 为副手，默认值为 0。
- offset: Tuple[float, float, float]，偏移量，默认值为(0,0,0)。
- rotation: Tuple[float, float, float]，旋转角度，默认值为(0,0,0)。
- scale: Tuple[float, float, float]，缩放，默认值为(1,1,1)。

**返回值**：bool，是否设置成功。

**备注**

- 旋转顺序为：先绕 z 轴的顺时针方向、再绕 x 轴的顺时针方向、最后绕 y 轴的逆时针方向。
- 如果需要 [SetLegacyBindRot](/docs/docs/scripts/modapi/model#setlegacybindrot)，需先调用 [SetLegacyBindRot](/docs/docs/scripts/modapi/model#setlegacybindrot)，再调用本接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.BindItemToBone(1, "rightHand", 0, (2.5,0,2), (0,0,0), (1,1.5,1))
```

</TabItem>
</Tabs>

---

### BindModelToEntity

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

实体替换骨骼模型后，再往上挂接其他骨骼模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindModelToEntity(
    boneName: str,
    modelName: str,
    offset: Tuple[float, float, float],
    rot: Tuple[float, float, float],
    scale: Tuple[float, float, float],
) -> int
```

- boneName: str，挂接的骨骼名称。
- modelName: str，要挂接的骨骼模型名称。
- offset: Tuple[float, float, float]，偏移量。
- rot: Tuple[float, float, float]，旋转。
- scale: Tuple[float, float, float]，缩放。

**返回值**：int，挂到骨骼上的骨骼模型的 Id，失败返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 把名称为gun的骨骼模型挂接到rightHand骨骼上
gunModelId = comp.BindModelToEntity("rightHand", "gun")
```

</TabItem>
</Tabs>

---

### BindModelToModel

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(11)`

在骨骼模型上挂接其他骨骼模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindModelToModel(boneName: str, modelName: str) -> int
```

- boneName: str，挂接的骨骼名称。
- modelName: str，要挂接的骨骼模型名称。

**返回值**：int，挂到骨骼上的骨骼模型的 Id，失败返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(11)
# 把名称为gun的骨骼模型挂接到modelId为11的模型的rightHand骨骼上
gunModelId = comp.BindModelToModel("rightHand", "gun")
```

</TabItem>
</Tabs>

---

### CancelAllBoneMask

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

取消动画中的所有骨骼屏蔽。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CancelAllBoneMask(modelId: int, aniName: str) -> bool
```

- modelId: int，需要设置的模型 id，包括实体模型以及自由模型。
- aniName: str，动画名称。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.CancelAllBoneMask(modelId, "attack")
```

</TabItem>
</Tabs>

---

### CreateFreeModel

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

创建自由的模型（无需绑定 Entity）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateFreeModel(modelName: str, dimensionId: int = -1) -> int
```

- modelName: str，模型名称。
- dimensionId: int，维度 id，-1 表示全维度可见，0 表示主世界，1 表示地狱，2 表示末地。默认-1。

**返回值**：int，创建成功返回 modelId，创建失败返回 0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
# 创建全维度可见的自由模型
model = comp.CreateFreeModel(modelName)
# 创建仅在主世界可见的自由模型
model = comp.CreateFreeModel(modelName, 0)
```

</TabItem>
</Tabs>

---

### GetAllBindModelToEntity

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

获取实体上某个骨骼上挂接的所有骨骼模型的 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAllBindModelToEntity(boneName: str) -> List[int]
```

- boneName: str，要获取的骨骼名称。

**返回值**：List[int]，骨骼模型的 id 的列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
modelIds = comp.GetAllBindModelToEntity("rightHand")
```

</TabItem>
</Tabs>

---

### GetAnimLength

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

获取某个骨骼动画的长度，单位为秒。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAnimLength(aniName: str, modelId: Optional[int] = None) -> float
```

- aniName: str，骨骼动画名称。
- modelId: Optional[int]，需要指定的模型 id，默认为 None，表示使用 CreateModel 时传入的 entityID 挂接的模型。

**返回值**：float，骨骼动画长度。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 操作实体目前加载的模型
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 获取run动画的长度
animLength = comp.GetAnimLength('run')

# 指定模型id，操作id对应的模型(创建组件时使用levelId)
import mod.client.extraClientApi as clientApi
modelId = 1
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
# 获取run动画的长度
animLength = comp.GetAnimLength('run', modelId)
```

</TabItem>
</Tabs>

---

### GetBonePositionFromMinecraftObject

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

获取原版模型的骨骼世界坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBonePositionFromMinecraftObject(boneName: str) -> Tuple[float, float, float]
```

- boneName: str，骨骼名称。

**返回值**：Tuple[float, float, float]，世界坐标, 未找到骨骼时返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
pos = comp.GetBonePositionFromMinecraftObject("rightleg")
```

</TabItem>
</Tabs>

---

### GetBoneWorldPos

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

获取骨骼的坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBoneWorldPos(boneName: str, modelId: Optional[int] = None) -> Tuple[float, float, float]
```

- boneName: str，骨骼名称。
- modelId: Optional[int]，需要指定的模型 id，默认为 None，表示使用 CreateModel 时传入的 entityID 挂接的模型。

**返回值**：Tuple[float, float, float]，位置坐标。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 操作实体目前加载的模型
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
bPos = comp.GetBoneWorldPos(boneName)

# 指定模型id，操作id对应的模型(创建组件时使用levelId)
import mod.client.extraClientApi as clientApi
modelId = 1
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
bPos = comp.GetBoneWorldPos(boneName, modelId)
```

</TabItem>
</Tabs>

---

### GetEntityBoneWorldPos

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

获取换了骨骼模型的实体的骨骼坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityBoneWorldPos(entityId: str, boneName: str) -> Tuple[float, float, float]
```

- entityId: str，实体 id。
- boneName: str，骨骼名称。

**返回值**：Tuple[float, float, float]，位置坐标。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
bPos = comp.GetEntityBoneWorldPos(entityId, boneName)
```

</TabItem>
</Tabs>

---

### GetEntityScale

<Server/> ScaleComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateScale(entityId)`

获取实体的放缩比例大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEntityScale() -> float
```


**返回值**：float，比例因子。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateScale(entityId)
result = comp.GetEntityScale()
```

</TabItem>
</Tabs>

---

### GetExtraUniformValue

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

获取在骨骼模型 shader 中使用的自定义变量 Uniform 的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetExtraUniformValue(modelId: int, uniformIndex: int) -> Tuple[float, float, float, float]
```

- modelId: int，需要查询的骨骼模型 modelId。
- uniformIndex: int，需要设置的自定义变量的下标，值范围为 1~4，分别对应 Shader 中的 EXTRA_VECTOR1,EXTRA_VECTOR2,EXTRA_VECTOR3,EXTRA_VECTOR4。

**返回值**：Tuple[float, float, float, float]，返回的对应自定义变量的值。获取失败则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
modelId = comp.GetModelId()
# 获取该骨骼模型shader中使用的EXTRA_VECTOR1这个自定义变量的值
print comp.GetExtraUniformValue(modelId, 1)
# 获取该骨骼模型shader中使用的EXTRA_VECTOR4这个自定义变量的值
print comp.GetExtraUniformValue(modelId, 4)
```

</TabItem>
</Tabs>

---

### GetModelId

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

获取骨骼模型的 Id，主要用于特效绑定骨骼模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetModelId() -> int
```


**返回值**：int，当前骨骼模型实例的 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
modelId = comp.GetModelId()
```

</TabItem>
</Tabs>

---

### GetModelMaterial

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

获取骨骼模型的正在使用的材质名称，也可获取骨骼模型中指定骨骼所使用的[材质名称](https://mc.163.com/newdev/docs/mcguide/16-meishu/6-moxinghedongzuo/04-gugemoxingdeshiyong.html#7.模型使用自定义材质及更多贴图)。如果获取指定骨骼所使用的材质，需要先在 netease_model.json 下设置"useSplitMeshes"字段为 true。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetModelMaterial(modelId: int, boneName: str = "") -> List[str]
```

- modelId: int，需要进行设置材质操作的骨骼模型 Id。
- boneName: str，骨骼模型中的骨骼名称。默认值为空字符串。

**返回值**：List[str]，正在使用的材质名称列表。

**备注**

- 如果需要查询的骨骼模型开启了骨骼拆分，即在 netease_model.json 下设置"useSplitMeshes"字段为 true 后，使用该接口查询骨骼模型的材质时，如果不指定 boneName，则此时获取的是本体模型正在使用的材质。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 创建大天狗骨骼模型。
modelId = comp.SetModel("datiangou")
# 所有使用到的自定义材质都需已定义在resource_pack/materials/entity.material中。
# 查询骨骼模型正在使用的材质。
print comp.GetModelMaterial(modelId)
# 查询骨骼模型中指定骨骼正在使用的材质。
# 注意，需要用户先在资源包resource_pack/model/netease_model.json中对骨骼模型配置字段"useSplitMeshes"为true以及"splitBonesGroup"中指定了该骨骼，该效果才会生效，否则不生效。
print comp.GetModelMaterial(modelId, "L_wing01")
```

</TabItem>
</Tabs>

---

### GetModelName

<Server/> ModelComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateModel(entityId)`

获取实体的模型名称。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetModelName() -> str
```


**返回值**：str，模型名称。

**备注**

- 在服务端获取，客户端不生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateModel(entityId)
modelName = comp.GetModelName()
```

</TabItem>
</Tabs>

---

### GetModelStyle

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(playerId)`

获取模型类型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetModelStyle() -> str
```


**返回值**：str，normal 表示正常，slim 表示纤细，custom 表示自定义。

**备注**

- 当玩家的模型被个性化皮肤、接口等修改为非 Steve、Alex 的其他类型后，返回 custom。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(playerId)
comp.GetModelStyle()
```

</TabItem>
</Tabs>

---

### GetPlayingAnimList

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

获取指定的骨骼模型中正处于播放状态的骨骼动画名称列表。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPlayingAnimList(modelId: int) -> List[str]
```

- modelId: int，骨骼模型 Id。

**返回值**：List[str]，骨骼动画名称列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
playingAnimList = comp.GetPlayingAnimList(modelId)
```

</TabItem>
</Tabs>

---

### GetTexture

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

获取骨骼模型的贴图路径。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTexture(modelId: Optional[int] = None) -> str
```

- modelId: Optional[int]，需要指定的模型 id，默认为 None，表示使用 CreateModel 时传入的 entityID 挂接的模型。

**返回值**：str，贴图路径, 以 textures\models 为当前路径的相对路径。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 操作实体目前加载的模型
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
texturePath = comp.GetTexture()

# 指定模型id，操作id对应的模型(创建组件时使用levelId)
import mod.client.extraClientApi as clientApi
modelId = 1
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
texturePath = comp.GetTexture(modelId)
```

</TabItem>
</Tabs>

---

### HideModel

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

隐藏纯模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideModel(modelId: int) -> None
```

- modelId: int，要隐藏的 modelId。

**返回值**：None，无返回值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.HideModel(modelId)
```

</TabItem>
</Tabs>

---

### ModelPlayAni

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

纯骨骼播放动作。支持骨骼动画混合，可参考 [SetAnimationBoneMask](/docs/docs/scripts/modapi/model#setanimationbonemask) 接口以及 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/model#registeranim1dcontrolparam) 接口说明。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelPlayAni(
    modelId: int,
    aniName: str,
    isLoop: bool = False,
    isBlended: bool = False,
    layer: int = 0,
) -> bool
```

- modelId: int，需要设置的模型 id，包括实体模型以及自由模型。
- aniName: str，要设置的动画名称。
- isLoop: bool，是否循环播放，默认为 False。
- isBlended: bool，播放时是与当前动画混合还是中止当前动画的播放，默认 False，即中止当前动画播放。设置为 True 时，将允许即将播放的动画进行混合。注意，动画混合仅在相同层级的动画之间进行。若当前播放的动画与即将播放的动画层级不一样，则 isBlended 参数无效。
- layer: int，设置骨骼动画的层级，范围为 0~255，默认为 0。注意，如果播放的动画已经存在，则会将原有的动画层级覆盖。动画层级越大，则优先度越高，骨骼模型的骨骼优先播放优先度最高的动画。

**返回值**：bool，设置是否成功。

**备注**

- 在动画的层级相同的情况下，动画的优先度播放顺序则首先按照：1.是否与需要其他动画进行混合。2.是否率先播放 这两个因素来先后决定。例如，我们首先对动画 A，动画 B 使用接口 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/model#registeranim1dcontrolparam) 注册 1D 线性混合参数 alpha，然后对动画 A 和动画 C 使用接口 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/model#registeranim1dcontrolparam) 注册线性混合参数 beta。接着，先后播放动画 A, 动画 C，动画 B，动画 D。这时，由于动画 A，动画 C 具有混合需要，并且率先播放，因此骨骼模型会率先播放动画 A 和动画 C 的混合动画（注意，1D 线性混合参数的初始值为 0，因此此时混合动画的表现还是动画 A），如果此时再暂停动画 C，则会播放动画 A 与动画 B 的混合动画。接着暂停动画 B，则会播放动画 A，最后再暂停动画 A，则才会播放动画 D。
- 如动画需要参与混合，必须将 isBlended 设为 True，否则可能会出现调用 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/model#registeranim1dcontrolparam) 或 [RegisterAnim1DMultiControlParam](/docs/docs/scripts/modapi/model#registeranim1dmulticontrolparam) 接口返回值异常或功能失效的情况。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.ModelPlayAni(modelId, 'run', True, False, 0)
```

</TabItem>
</Tabs>

---

### ModelStopAni

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

暂停指定的骨骼动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ModelStopAni(modelId: int, aniName: str) -> bool
```

- modelId: int，需要设置的模型 id，包括实体模型以及自由模型。
- aniName: str，动画名称。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.ModelStopAni(modelId, "attack")
```

</TabItem>
</Tabs>

---

### PlayAnim

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

播放骨骼动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayAnim(aniName: str, isLoop: bool, modelId: Optional[int] = None) -> bool
```

- aniName: str，动画名称。
- isLoop: bool，是否循环播放。
- modelId: Optional[int]，需要指定的模型 id，默认为 None，表示使用 CreateModel 时传入的 entityID 挂接的模型。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 操作实体目前加载的模型
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.PlayAnim("run", True)

# 指定模型id，操作id对应的模型(创建组件时使用levelId)
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
modelId = 1
comp.PlayAnim("run", True, modelId)
```

</TabItem>
</Tabs>

---

### RegisterAnim1DControlParam

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

当同时播放多个骨骼动画时，新建用于控制动画进行 1D 线性混合的参数。目前线性混合仅支持对两个动画进行混合。新建的参数值范围为[0,1]。指定的骨骼将会按照这个参数的值对两个动画进行线性混合。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterAnim1DControlParam(modelId: int, leftAniName: str, rightAniName: str, paramName: str) -> bool
```

- modelId: int，骨需要设置的模型 id，包括实体模型以及自由模型。
- leftAniName: str，混合的第一个动画名称，当 1D 参数的值为 0 时指定的骨骼仅播放这个动画。
- rightAniName: str，混合的第二个动画名称，当 1D 参数的值为 1 时指定的骨骼仅播放这个动画。
- paramName: str，自定义的 1D 参数名称。该参数新建后的初始值为 0。

**返回值**：bool，设置是否成功。

**备注**

- 注意，如果对某个骨骼使用了骨骼屏蔽，则这个 1D 线性混合将对该骨骼不会生效。另外，如果在使用该接口时新建一个已经存在的参数名称，则会将原来的参数覆盖。
- 在动画的层级相同的情况下，动画的优先度播放顺序则首先按照：1.是否与需要其他动画进行混合。2.是否率先播放 这两个因素来先后决定。例如，我们首先对动画 A，动画 B 使用接口 RegisterAnim1DControlParam 注册 1D 线性混合参数 alpha，然后对动画 A 和动画 C 使用接口 RegisterAnim1DControlParam 注册线性混合参数 beta。接着，先后播放动画 A, 动画 C，动画 B，动画 D。这时，由于动画 A，动画 C 具有混合需要，并且率先播放，因此骨骼模型会率先播放动画 A 和动画 C 的混合动画（注意，由于 1D 线性混合参数的初始值为 0，因此此时混合动画的表现还是动画 A），如果此时再暂停动画 C，则会播放动画 A 与动画 B 的混合动画。接着暂停动画 B，则会播放动画 A，最后再暂停动画 A，则才会播放动画 D。
- 另一种需要注意的情况：如果我们首先对动画 A，动画 B 使用接口 RegisterAnim1DControlParam 注册 1D 线性混合参数 alpha，然后对动画 A 和动画 C 使用接口 RegisterAnim1DControlParam 注册线性混合参数 beta。接着，先后播放动画 A, 动画 B，动画 C。这时，我们调用 [SetAnim1DControlParam](/docs/docs/scripts/modapi/model#setanim1dcontrolparam) 接口设置参数 beta 的值为 0.5。此时模型仍然是播放动画 A，这是由于动画 A 和动画 B 具有混合需求并且率先播放的，即率先凑齐了参数混合两个动画，因此此时模型实际上是在进行动画 A 和动画 B 的混合，但是由于 alpha 的值为 0，因此模型还是表现为动画 A，如果此时再用 [SetAnim1DControlParam](/docs/docs/scripts/modapi/model#setanim1dcontrolparam) 接口设置参数 alpha 的值为 0.5，则能够看到动画 A 和动画 B 的混合动画了。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 新建1D控制参数，用于对attack和walk这两个动画进行线性混合，参数的名称为“arm_control_param”。
comp.RegisterAnim1DControlParam(modelId, "attack", "walk", "arm_control_param")
# 相继播放这两个动画，设置isBlend为True，开启动画混合。
comp.ModelPlayAni(modelId, "attack", True, True)
comp.ModelPlayAni(modelId, "walk",True, True)
# 改变1D控制参数的值，两个动画将根据该值进行线性混合。可根据实际情况进行动态调整。
comp.SetAnim1DControlParam(modelId, "arm_control_param", 0.5)
```

</TabItem>
</Tabs>

---

### RegisterAnim1DMultiControlParam

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

当同时播放多个骨骼动画时，注册用于根据权重控制多动画进行混合的参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterAnim1DMultiControlParam(modelId: int, paramName: str, animList: List[str]) -> bool
```

- modelId: int，模型 id。
- paramName: str，自定义的多动作混合参数名称。
- animList: List[str]，需要混合的动作列表。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 相继播放这三个动画，设置isBlend为True，开启动画混合。
comp.ModelPlayAni(modelId, "attack", True, True)
comp.ModelPlayAni(modelId, "walk",True, True)
comp.ModelPlayAni(modelId, "run",True, True)
# 新建多动作混合控制参数，用于对attack、walk和run这三个动画根据权重进行混合，参数的名称为"multi_blend_key"。
comp.RegisterAnim1DMultiControlParam(modelId, "multi_blend_key", ["attack", "walk", "run"])
# 改变多动作混合控制参数的值，将根据dict中每个动画的权重进行混合。可根据实际情况进行动态调整。
comp.SetAnim1DMultiControlParam(modelId, "multi_blend_key", {"walk":0.5, "run":0.3, "attack":0.2})
```

</TabItem>
</Tabs>

---

### RemoveAnim1DMultiControlParam

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

删除用于根据权重控制多动画进行混合的参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveAnim1DMultiControlParam(modelId: int, paramName: str) -> bool
```

- modelId: int，模型 id。
- paramName: str，自定义的多动作混合参数名称。

**返回值**：bool，设置删除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi

comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.RemoveAnim1DMultiControlParam(modelId, "multi_blend_key")
```

</TabItem>
</Tabs>

---

### RemoveFreeModel

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

移除自由模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveFreeModel(modelId: int) -> bool
```

- modelId: int，要移除的 modelId。

**返回值**：bool，是否成功移除。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp.RemoveFreeModel(modelId)
```

</TabItem>
</Tabs>

---

### ResetModel

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

恢复实体为原版模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ResetModel() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.ResetModel()
```

</TabItem>
</Tabs>

---

### SetAnim1DControlParam

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

新建动画的 1D 控制参数后，使用该接口对相应的参数进行控制。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnim1DControlParam(modelId: int, paramName: str, value: float) -> bool
```

- modelId: int，需要设置的模型 id，包括实体模型以及自由模型。
- paramName: str，使用接口 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/model#registeranim1dcontrolparam) 所新建的自定义 1D 参数名称。该参数新建后的初始值为 0。
- value: float，参数的值，范围为[0,1]。当 1D 参数的值为 0 时仅播放接口 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/model#registeranim1dcontrolparam) 中的 leftAniName 参数指定的动画，当 1D 参数的值为 1 时仅播放接口 [RegisterAnim1DControlParam](/docs/docs/scripts/modapi/model#registeranim1dcontrolparam) 中的 rightAniName 参数指定的动画。

**返回值**：bool，设置是否成功。

**备注**

- 注意，如果对某个骨骼使用了骨骼屏蔽，则这个 1D 线性混合将对该骨骼不会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 新建1D控制参数，用于对attack和walk这两个动画进行线性混合，参数的名称为“arm_control_param”。
comp.RegisterAnim1DControlParam(modelId, "attack", "walk", "arm_control_param")
# 相继播放这两个动画，设置isBlend为True，开启动画混合。
comp.ModelPlayAni(modelId, "attack", True, True)
comp.ModelPlayAni(modelId, "walk",True, True)
# 改变1D控制参数的值，两个动画将根据该值进行线性混合。可根据实际情况进行动态调整。
comp.SetAnim1DControlParam(modelId, "arm_control_param", 0.5)
```

</TabItem>
</Tabs>

---

### SetAnim1DMultiControlParam

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

新建动画的 1D 控制参数后，设置用于根据权重控制多动画进行混合的参数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnim1DMultiControlParam(modelId: int, paramName: str, animWeightDict: Dict[str, Any]) -> bool
```

- modelId: int，模型 id。
- paramName: str，自定义的多动作混合参数名称。
- animWeightDict: Dict[str, Any]，动作权重表，可在表中设置每个动作的混合权重。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 相继播放这三个动画，设置isBlend为True，开启动画混合。
comp.ModelPlayAni(modelId, "attack", True, True)
comp.ModelPlayAni(modelId, "walk",True, True)
comp.ModelPlayAni(modelId, "run",True, True)
# 新建多动作混合控制参数，用于对attack、walk和run这三个动画根据权重进行混合，参数的名称为"multi_blend_key"。
comp.RegisterAnim1DMultiControlParam(modelId, "multi_blend_key", ["attack", "walk", "run"])
# 改变多动作混合控制参数的值，将根据dict中每个动画的权重进行混合。可根据实际情况进行动态调整。
comp.SetAnim1DMultiControlParam(modelId, "multi_blend_key", {"walk":0.5, "run":0.3, "attack":0.2})
```

</TabItem>
</Tabs>

---

### SetAnimLayer

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

设置骨骼动画的层级，动画层级越大，则优先度越高，骨骼模型的骨骼优先播放优先度最高的动画，相同层级的动画则优先播放率先播放的动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnimLayer(modelId: int, aniName: str, layer: int) -> bool
```

- modelId: int，需要设置的模型 id，包括实体模型以及自由模型。
- aniName: str，动画名称。
- layer: int，动画层级，正整数，范围为 0~255。

**返回值**：bool，设置是否成功。

**备注**

- 注意，设置层级相同的情况下不会改变当前的优先播放序列。举个例子：当前存在动画 A 及动画 B，动画 A 的层级为 1，动画 B 的层级为 0，此时骨骼模型播放的动画为动画 A。如果将动画 A 的层级设置为 0，即动画 A 及动画 B 的层级相同，则当前仍然会播放动画 A，因为层级相同的情况下不会改变目前的优先播放序列。要想让骨骼模型播放动画 B，则需要动画 B 的层级比动画 A 的层级高。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetAnimLayer(modelId, "attack", 1)
```

</TabItem>
</Tabs>

---

### SetAnimSpeed

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

设置某个骨骼动画的播放速度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnimSpeed(aniName: str, speed: float, modelId: Optional[int] = None) -> bool
```

- aniName: str，骨骼动画名称。
- speed: float，速度倍率。
- modelId: Optional[int]，需要指定的模型 id，默认为 None，表示使用 CreateModel 时传入的 entityID 挂接的模型。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 操作实体目前加载的模型
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# run动作三倍速
comp.SetAnimSpeed("run", 3.0)

# 指定模型id，操作id对应的模型(创建组件时使用levelId)
import mod.client.extraClientApi as clientApi
modelId = 1
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
# run动作三倍速
comp.SetAnimSpeed("run", 3.0, modelId)
```

</TabItem>
</Tabs>

---

### SetAnimationAllBoneMask

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

设置是否屏蔽动画中所有骨骼的动画，若开启骨骼屏蔽后，该骨骼将不再播放该动画中的动作。该接口会对该动画中所有骨骼生效，可通过参数 ignoreBoneList 来指定不受影响的骨骼名称。通过屏蔽指定骨骼的动画可实现同一个骨骼模型同时在不同骨骼上播放不同的动作动画，从而实现快捷的动作融合。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnimationAllBoneMask(
    modelId: int,
    aniName: str,
    ignoreBonesList: List[str],
    enable: bool,
    applyToChild: bool = True,
) -> bool
```

- modelId: int，需要设置的模型 id，包括实体模型以及自由模型。
- aniName: str，动画名称。
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
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 屏蔽名为attack动画中所有骨骼的动画，"l_arm"及"r_arm"这两个不受影响，其子骨骼也不受影响
comp.SetAnimationAllBoneMask(modelId, "attack", ["l_arm", "r_arm"], False, True)
```

</TabItem>
</Tabs>

---

### SetAnimationBoneMask

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

设置是否屏蔽动画中指定的骨骼的动画，若开启骨骼屏蔽后，该骨骼将不再播放该动画中的动作。通过屏蔽指定骨骼的动画可实现同一个骨骼模型同时在不同骨骼上播放不同的动作动画，从而实现快捷的动作融合。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnimationBoneMask(
    modelId: int,
    aniName: str,
    boneNamesList: List[str],
    enable: bool,
    applyToChild: bool = True,
) -> bool
```

- modelId: int，需要设置的模型 id，包括实体模型以及自由模型。
- aniName: str，动画名称。
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
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 屏蔽名为attack动画中的"l_arm"及"r_arm"的骨骼的动画，对其子骨骼也生效
comp.SetAnimationBoneMask(modelId, "attack", ["l_arm", "r_arm"], False, True)
```

</TabItem>
</Tabs>

---

### SetBrightness

<Client/> BrightnessCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateBrightness(entityId)`

设置实体的亮度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBrightness(brightness: float) -> bool
```

- brightness: float，0：纯黑<br/>1：正常亮度<br/>1-14：较亮甚至纯白<br/>超过 14：通常为纯白，即使数值改变也没有明显变化。

**返回值**：bool，True:设置成功 False:设置失败。

**备注**

- 目前只支持修改替换了骨骼模型的实体亮度，使用游戏原生模型的实体暂不予支持。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBrightness(entityId)
success = comp.SetBrightness(0.5)
```

</TabItem>
</Tabs>

---

### SetEntityOpacity

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

设置骨骼模型的透明度，只能对骨骼模型生效，如果设置的是原版模型，则模型的影子会被隐藏。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityOpacity(opacity: float) -> Any
```

- opacity: float，透明度值，取值范围为[0, 1]，值越小越透明。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetEntityOpacity(0.2)
```

</TabItem>
</Tabs>

---

### SetEntityScale

<Server/> ScaleComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateScale(entityId)`

设置实体的放缩比例大小，设置比例过大会导致游戏卡顿，建议控制在 20 倍以内。实体的 scale 的立方乘以包围盒的体积不可超过 32768。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityScale(entityId: str, scale: float) -> int
```

- entityId: str，要设置的实体。
- scale: float，比例因子。

**返回值**：int，成功返回 1，失败返回-1。

**备注**

- 该接口支持设置实体替换骨骼模型后的大小，以及受 minecraft:scale 组件影响的原版模型（如矿车，三叉戟则无效）。
- 使用该接口设置大小后，则不再受 minecraft:scale 组件控制。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateScale(entityId)
result = comp.SetEntityScale(entityId, scale)
```

</TabItem>
</Tabs>

---

### SetEntityShadowShow

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

设置实体打开/关闭影子渲染。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEntityShadowShow(flag: bool) -> Any
```

- flag: bool，True 为打开影子渲染，False 为关闭影子渲染。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetEntityShadowShow(False)
```

</TabItem>
</Tabs>

---

### SetExtraUniformValue

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

设置 shader 中特定 Uniform 的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetExtraUniformValue(modelId: int, uniformIndex: int, vec4data: Tuple[float, float, float, float]) -> bool
```

- modelId: int，要设置的 modelId。
- uniformIndex: int，要设置的 uniform 下标，目前支持 4 个，范围为 1 到 4。分别对应 Shader 中的 EXTRA_VECTOR1,EXTRA_VECTOR2,EXTRA_VECTOR3,EXTRA_VECTOR4。
- vec4data: Tuple[float, float, float, float]，要设置的 vec4 的值。初始值为(0.0, 0.0, 0.0, 0.0)。

**返回值**：bool，是否设置成功。

**备注**

- 若在游戏运行过程中修改 shader 文件，需要调用 clientApi.[ReloadAllShaders](/docs/docs/scripts/modapi/general/debug#reloadallshaders)()或者重启游戏才会生效。

</TabItem>
<TabItem value="示例" label="示例">

```python
# python代码：
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
modelId = comp.GetModelId()
#可向shader传rgba代表红色
comp.SetExtraUniformValue(modelId, 1, (1.0, 0.0, 0.0, 1.0))

// shader代码(分两步):
//第一步, include头文件
#include "uniformExtraVectorConstants.h"

//第二步, shader中直接使用设置的值
void main()
{
    vec4 pythonColor = EXTRA_VECTOR1;
    ...(此处省略无关代码)
}
```

</TabItem>
</Tabs>

---

### SetFreeModelAniSpeed

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(clientApi.GetLevelId())`

设置自由模型动画的播放速度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFreeModelAniSpeed(modelId: int, aniName: str, speed: float) -> bool
```

- modelId: int，要设置的 modelId。
- aniName: str，要设置的动画名称。
- speed: float，播放速度,速度上限为动画帧数,正负数效果相同。

**返回值**：bool，是否成功设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(clientApi.GetLevelId())
# 在玩家脚下位置创建自由模型
playerId = clientApi.GetLocalPlayerId()
posComp = clientApi.GetEngineCompFactory().CreatePos(playerId)
playerPos = posComp.GetPos()
modelId = comp.CreateFreeModel("alloy_barrier_1_1_set")
comp.SetFreeModelPos(modelId, playerPos[0], playerPos[1]-3, playerPos[2])
# 需要模型对应的动画在播放才能设置动画速度
comp.ModelPlayAni(modelId, "recover", True)
comp.SetFreeModelAniSpeed(modelId, "recover", 10)
```

</TabItem>
</Tabs>

---

### SetFreeModelBoundingBox

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

设置自由模型的包围盒。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFreeModelBoundingBox(
    modelId: int,
    min: Tuple[float, float, float],
    max: Tuple[float, float, float],
) -> bool
```

- modelId: int，要设置的 modelId。
- min: Tuple[float, float, float]，包围盒最小点。
- max: Tuple[float, float, float]，包围盒最大点。

**返回值**：bool，成功返回 True，失败返回 False。

**备注**

- min 的元素一定要比对应的 max 的元素小。
- 模型包围盒用于判断渲染剔除：判断一个模型要不要渲染，要看它在不在视野范围内，也就是看游戏摄像机的视锥体（摄像机拍到的范围）和这个包围盒有没有交集。有则说明在视野范围内，反之则不在视野范围内。进而可以剔除掉该模型，不进行渲染。例如创建的自由模型显示上的大小是 3x3x3 个方块，那么需要将包围盒大小也设置为 3x3x3，否则，如果包围盒比较小，例如使用了默认的 1x1x1 包围盒，那么当模型处于屏幕的边缘，模型就会不渲染。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp.SetFreeModelBoundingBox(modelId, (-1, -0.9, -0.8), (1, 1, 1))
```

</TabItem>
</Tabs>

---

### SetFreeModelDimensionId

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

设置自由模型的维度归属。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFreeModelDimensionId(modelId: int, dimensionId: int) -> bool
```

- modelId: int，要设置的 modelId。
- dimensionId: int，维度 id，-1 表示全维度可见，0 表示主世界，1 表示地狱，2 表示末地。

**返回值**：bool，是否成功设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
# 将模型设置为仅在主世界可见
comp.SetFreeModelDimensionId(modelId, 0)
# 将模型设置为全维度可见
comp.SetFreeModelDimensionId(modelId, -1)
```

</TabItem>
</Tabs>

---

### SetFreeModelPos

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

设置自由模型的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFreeModelPos(modelId: int, x: float, y: float, z: float) -> bool
```

- modelId: int，要设置的 modelId。
- x: float，要设置的位置 X 轴参数。
- y: float，要设置的位置 Y 轴参数。
- z: float，要设置的位置 Z 轴参数。

**返回值**：bool，是否成功设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp.SetFreeModelPos(modelId, 0, 0, 0)
```

</TabItem>
</Tabs>

---

### SetFreeModelRot

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

设置自由模型的方向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFreeModelRot(modelId: int, x: float, y: float, z: float) -> bool
```

- modelId: int，要设置的 modelId。
- x: float，沿 X 方向的旋转参数。
- y: float，沿 Y 方向的旋转参数。
- z: float，沿 Z 方向的旋转参数。

**返回值**：bool，是否成功设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp.SetFreeModelRot(modelId, 0, 0, 0)
```

</TabItem>
</Tabs>

---

### SetFreeModelScale

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

设置自由模型的大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFreeModelScale(modelId: int, x: float, y: float, z: float) -> bool
```

- modelId: int，要设置的 modelId。
- x: float，沿 X 方向的比例因子。
- y: float，沿 Y 方向的比例因子。
- z: float，沿 Z 方向的比例因子。

**返回值**：bool，是否成功设置。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp.SetFreeModelScale(modelId, 1, 1, 1)
```

</TabItem>
</Tabs>

---

### SetLegacyBindRot

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

用于修复特效挂接到骨骼时的方向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLegacyBindRot(enable: bool, modelId: Optional[int] = None) -> bool
```

- enable: bool，设置为 False 时，可以使特效与骨骼方向一致。
- modelId: Optional[int]，需要指定的模型 id，默认为 None，表示使用 CreateModel 时传入的 entityID 挂接的模型。

**返回值**：bool，设置是否成功。

**备注**

- 在挂接特效前调用即可。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 操作实体目前加载的模型
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetLegacyBindRot(False)

# 指定模型id，操作id对应的模型(创建组件时使用levelId)
import mod.client.extraClientApi as clientApi
modelId = 1
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp.SetLegacyBindRot(False, modelId)
```

</TabItem>
</Tabs>

---

### SetModel

<Server/> ModelComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateModel(entityId)`

设置骨骼模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetModel(modelName: str) -> bool
```

- modelName: str，模型名称,值为""时重置模型。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
#设置名称
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetModel("xuenv")
```

</TabItem>
</Tabs>

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

替换实体的骨骼模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetModel(modelName: str) -> int
```

- modelName: str，骨骼模型的名称。

**返回值**：int，替换的骨骼模型实例的 id。失败返回-1。

**备注**

- 要恢复原版模型请使用 [ResetModel](/docs/docs/scripts/modapi/model#resetmodel) 接口。
- 使用客户端组件更换模型不会同步及存盘，仅是纯客户端表现，如需要同步及存盘，请使用服务器的 model 组件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetModel("xuenv")
```

</TabItem>
</Tabs>

---

### SetModelMaterial

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

设置骨骼模型所使用的的材质，除了可以设置骨骼模型所使用的[自定义材质](https://mc.163.com/newdev/docs/mcguide/16-meishu/6-moxinghedongzuo/04-gugemoxingdeshiyong.html#7.模型使用自定义材质及更多贴图)以外，也可对单个骨骼设置所使用的[自定义材质](https://mc.163.com/newdev/docs/mcguide/16-meishu/6-moxinghedongzuo/04-gugemoxingdeshiyong.html#7.模型使用自定义材质及更多贴图)。如果需要设置单个骨骼所使用的材质，需要先在 netease_model.json 下设置"useSplitMeshes"字段为 true。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetModelMaterial(modelId: int, material: str, materialcpu: str = "", boneName: str = "") -> bool
```

- modelId: int，需要进行设置材质操作的骨骼模型 Id。
- material: str，需要设置的自定义材质的名称。该材质为 GPU 骨骼渲染下所使用的材质，大多数情况下只会使用到这个材质。
- materialcpu: str，需要设置的自定义材质的名称，该材质为针对部分低端机设备所使用的 CPU 蒙皮材质，大多数情况下不会使用到这个参数，默认值为空字符串。如果该参数为空，或者所填入的 CPU 材质名称不存在，则会使用 GPU 材质替代。因此此时如果 GPU 材质设置成功，则接口也会返回 True.。
- boneName: str，骨骼模型中的骨骼名称。默认值为空字符串。

**返回值**：bool，设置是否成功。

**备注**

- CPU 蒙皮材质的说明可看自定义材质，目前大多数设备都不会用到 CPU 蒙皮材质，仅在部分低端安卓设备中会使用 CPU 蒙皮材质。如果开发者如无需要，都可以不设置 CPU 蒙皮材质。如开发者有需要，则可以参考官方骨骼模型材质 data/vanilla_netease/materials/entity.material 中的”entity_for_skeleton_cpu“制作自己的 CPU 蒙皮材质。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 创建大天狗骨骼模型。
modelId = comp.SetModel("datiangou")
# 所有使用到的自定义材质都需已定义在resource_pack/materials/entity.material中。
# 对该骨骼模型设置自己所定义的材质。
print comp.SetModelMaterial(modelId, "my_custom_mat")
# 对该骨骼模型设置自己所定义的材质及低端设备使用到的CPU蒙皮材质。
print comp.SetModelMaterial(modelId, "my_custom_mat", "my_custom_mat_cpu")
# 对该骨骼模型中的某个骨骼设置自己所定义的材质。
# 注意，需要用户先在资源包resource_pack/model/netease_model.json中对骨骼模型配置字段"useSplitMeshes"为true以及"splitBonesGroup"中指定了该骨骼，该效果才会生效，否则不生效。
print comp.SetModelMaterial(modelId, "my_custom_mat", "", "L_wing01")
```

</TabItem>
</Tabs>

---

### SetModelMultiPassMaterial

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

设置骨骼模型多 pass 中使用到的[材质列表](https://mc.163.com/newdev/docs/mcguide/16-meishu/6-moxinghedongzuo/04-gugemoxingdeshiyong.html#9.骨骼模型自定义多pass)，也可对单个骨骼设置所使用的自定义多 Pass 材质。如果需要设置单个骨骼所使用的多 Pass 材质，需要先在 netease_model.json 下设置"useSplitMeshes"字段为 true。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetModelMultiPassMaterial(
    modelId: int,
    materialList: List[str],
    materialCpuList: Optional[List[str]] = None,
    boneName: str = "",
) -> bool
```

- modelId: int，需要进行设置材质操作的骨骼模型 Id。
- materialList: List[str]，多 pass 所使用的材质列表。
- materialCpuList: Optional[List[str]]，多 pass 所使用的 CPU 蒙皮材质列表。这些材质为针对部分低端机设备所使用的 CPU 蒙皮材质。默认值为 None。大多数情况下不会使用到这个参数，如果该参数为 None，或者为空列表，或者所填入的 CPU 材质名称不存在，则会使用 GPU 材质替代。因此此时如果 GPU 材质设置成功，则接口也会返回 True.。
- boneName: str，骨骼模型中的骨骼名称。默认值为空字符串。

**返回值**：bool，设置是否成功。

**备注**

- 注意，材质列表中的首个材质将会覆盖骨骼模型原本的默认材质。例如，使用了 [SetModelMaterial](/docs/docs/scripts/modapi/model#setmodelmaterial) 接口设置了自定义材质 A，再使用 SetModelMultiPassMaterial 设置多 Pass 材质 B,C,D，则这个自定义材质 A 将会被 B 覆盖。骨骼模型此时生效的材质为 B,C,D。
- CPU 蒙皮材质的说明可看自定义材质，目前大多数设备都不会用到 CPU 蒙皮材质，仅在部分低端安卓设备中会使用 CPU 蒙皮材质。如果开发者如无需要，都可以不设置 CPU 蒙皮材质。如开发者有需要，则可以参考官方骨骼模型材质 data/vanilla_netease/materials/entity.material 中的”entity_for_skeleton_cpu“制作自己的 CPU 蒙皮材质。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 创建大天狗骨骼模型。
modelId = comp.SetModel("datiangou")
# 设置所使用的到的多pass材质列表
print comp.SetModelMultiPassMaterial(modelId, ["my_mat_default", "my_mat_for_pass_1", "my_mat_for_pass_2"])
# 对该骨骼模型中的某个骨骼设置自己所定义的多pass材质列表。
# 注意，需要用户先在资源包resource_pack/model/netease_model.json中对骨骼模型配置字段"useSplitMeshes"为true以及"splitBonesGroup"中指定了该骨骼，该效果才会生效，否则不生效。
print comp.SetModelMultiPassMaterial(modelId, ["my_mat_default", "my_mat_for_pass_1", "my_mat_for_pass_2"], None, "L_wing01")
```

</TabItem>
</Tabs>

---

### SetModelOffset

<Server/> ModelComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateModel(entityId)`

设置骨骼模型相对于局部坐标系的偏移量，初始值为(0, 0, 0)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetModelOffset(offset: Tuple[float, float, float]) -> Any
```

- offset: Tuple[float, float, float]，偏移量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetModelOffset((0, 3, 0))
```

</TabItem>
</Tabs>

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

模型增加偏移量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetModelOffset(offset: Tuple[float, float, float]) -> Any
```

- offset: Tuple[float, float, float]，偏移向量。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetModelOffset((0, 1, 0))
```

</TabItem>
</Tabs>

---

### SetModelPartVisible

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

对骨骼模型中指定的骨骼进行渲染屏蔽，屏蔽后该骨骼不会被渲染出来。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetModelPartVisible(modelId: int, boneName: str, visible: bool) -> bool
```

- modelId: int，需要进行屏蔽操作的骨骼模型 Id。
- boneName: str，骨骼模型中的骨骼名称。
- visible: bool，显示或者屏蔽。True 为显示，False 为屏蔽。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
# 创建大天狗骨骼模型。
modelId = comp.SetModel("datiangou")
# 屏蔽指定骨骼
print comp.SetModelPartVisible(modelId, "r_wing01", False)
# 注意，需要用户先在资源包resource_pack/model/netease_model.json中对骨骼模型配置以下字段"useSplitMeshes"以及"splitBonesGroup"，该接口才会生效，否则不生效。
# 例子：
# "datiangou": {
#         "skeleton": "skeleton/datiangou_skeleton.json",
#         "mesh": "mesh/datiangou_mesh.json",
#         "animation": {
#             "idle": "animation/datiangou_animation_run.json",
#             "fengxi": "animation/datiangou_animation_fengxi.json",
#             "run": "animation/datiangou_animation_run.json"
#         },
#         "arm_model": "datiangou_arm",
#
#         // "useSplitMeshes"设为true时，读取该模型的时候将按bones来分别生成和存储mesh，而不会按以往方法来合成一整个mesh，
#         // 分离mesh后，骨骼模型渲染时，也会按照所包含的meshes来逐个渲染，因此如果不是需要使用骨骼渲染屏蔽功能，建议不要将这个字段设置为true，否则会增加性能消耗。
#         "useSplitMeshes": true,
#         // 分离骨骼组
#         "splitBonesGroup": {
#         // 指定需要分离出来的骨骼名称，指定后能够使用SetModelPartVisible接口进行渲染屏蔽。需要与该骨骼模型的skeleton.json文件中存在的骨骼名称一致，大小写一致。
#             "R_wing01":{},
#             "L_wing01":{},
#             "R_arm":{}
#         }
#     },
```

</TabItem>
</Tabs>

---

### SetModelPerspectiveEffect

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

设置模型透视效果。注：只对自定义骨骼模型生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetModelPerspectiveEffect(isPerspective: bool, color: Tuple[float, float, float, float]) -> Any
```

- isPerspective: bool，是否显示透视颜色。
- color: Tuple[float, float, float, float]，透视颜色的 RGBA 值，范围 0-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetModelPerspectiveEffect(True, (1, 0.9, 0, 0.2))
```

</TabItem>
</Tabs>

---

### SetModelTexture

<Server/> ModelComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateModel(entityId)`

设置骨骼模型贴图，该接口与 [SetTexture](/docs/docs/scripts/modapi/model#settexture) 功能相同，但属于服务端接口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetModelTexture(texture: str) -> bool
```

- texture: str，贴图路径，以 textures\models 为当前路径的相对路径。

**返回值**：bool，设置结果。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetModelTexture("Osteve")
```

</TabItem>
</Tabs>

---

### SetShowArmModel

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

设置使用骨骼模型后切换至第一人称时是否显示手部模型。需要先为骨骼模型定义 arm_model，arm_model 的定义可参考 demo 示例-AwesomeMod 中的 resourcePack/models/netease_models.json 中的大天狗模型定义。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetShowArmModel(modelId: int, show: bool) -> bool
```

- modelId: int，模型 id。
- show: bool，是否显示。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
modelId = comp.SetModel(“datiangou”)
# 隐藏手部模型
comp.SetShowArmModel(modelId, False)
```

</TabItem>
</Tabs>

---

### SetTexture

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

设置骨骼模型的贴图，该接口与 [SetModelTexture](/docs/docs/scripts/modapi/model#setmodeltexture) 功能相同，但属于客户端接口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTexture(texture: str, modelId: Optional[int] = None) -> bool
```

- texture: str，贴图路径，以 textures\models 为当前路径的相对路径。
- modelId: Optional[int]，需要指定的模型 id，默认为 None，表示使用 CreateModel 时传入的 entityID 挂接的模型。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 操作实体目前加载的模型
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.SetTexture("Osteve")

# 指定模型id，操作id对应的模型(创建组件时使用levelId)
import mod.client.extraClientApi as clientApi
modelId = 1
comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp.SetTexture("Osteve", modelId)
```

</TabItem>
</Tabs>

---

### ShowCommonHurtColor

<Server/> ModelComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateModel(entityId)`

设置挂接骨骼模型的实体是否显示通用的受伤变红效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ShowCommonHurtColor(show: bool) -> bool
```

- show: bool，是否显示。

**返回值**：bool，设置是否成功。

**备注**

- 引擎默认打开该选项，需要改变受伤效果可以关闭之后再进行定制。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateModel(entityId)
comp.ShowCommonHurtColor(True)
```

</TabItem>
</Tabs>

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

设置挂接骨骼模型的实体是否显示通用的受伤变红效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ShowCommonHurtColor(show: bool) -> bool
```

- show: bool，是否显示。

**返回值**：bool，设置是否成功。

**备注**

- 引擎默认打开该选项，需要改变受伤效果可以关闭之后再进行定制。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.ShowCommonHurtColor(False)
```

</TabItem>
</Tabs>

---

### ShowModel

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(levelId)`

显示纯模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ShowModel(modelId: int) -> None
```

- modelId: int，要显示的 modelId。

**返回值**：None，无返回值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
## 当需要自由模型时，建议使用LevelId
# comp = clientApi.GetEngineCompFactory().CreateModel(levelId)
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.ShowModel(modelId)
```

</TabItem>
</Tabs>

---

### UnBindModelToEntity

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(entityId)`

取消实体上挂接的某个骨骼模型。取消挂接后，这个 modelId 的模型便会销毁，无法再使用，如果是临时隐藏可以使用 [HideModel](/docs/docs/scripts/modapi/model#hidemodel)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnBindModelToEntity(modelId: int) -> bool
```

- modelId: int，要取消挂接的骨骼模型的 id。

**返回值**：bool，取消挂接是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(entityId)
comp.UnBindModelToEntity(gunModelId)
```

</TabItem>
</Tabs>

---

### UnBindModelToModel

<Client/> ModelComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateModel(11)`

取消骨骼模型上挂接的某个骨骼模型。取消挂接后，这个 modelId 的模型便会销毁，无法再使用，如果是临时隐藏可以使用 [HideModel](/docs/docs/scripts/modapi/model#hidemodel)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnBindModelToModel(modelId: int) -> bool
```

- modelId: int，要取消挂接的骨骼模型的 id。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateModel(11)
# subModelId已经绑定在modelId为11的骨骼模型上
comp.UnBindModelToModel(subModelId)
```

</TabItem>
</Tabs>

---
