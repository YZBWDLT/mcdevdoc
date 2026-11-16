---
sidebar_position: 10
---

# 渲染

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录渲染相关的接口，共 18 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/fangkuai/xuanran.html"/>

---

### AddDropItemToWorld

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

在客户端添加一个掉落物渲染。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddDropItemToWorld(
    itemDict: Dict[str, Any],
    dimension_id: int,
    position: Tuple[float, float, float],
    bobSpeed: float = 0,
    spinSpeed: float = 0,
) -> str
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- dimension_id: int，生成的掉落物所在维度。
- position: Tuple[float, float, float]，生成的掉落物所在位置。
- bobSpeed: float，单位时间上下移动的距离，负数为向下移动，填 2 即为原版两倍上下移动速度，不填默认为 0。
- spinSpeed: float，单位时间旋转的速度，负数为反方向，填-2 即为原版两倍反方向旋转速度，不填默认为 0。

**返回值**：str，返回该掉落物的 entityId。

**备注**

- 当掉落物是可合堆时，若 count 大于 1 会渲染已合堆的掉落物。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
itemDict = {
    'itemName': 'minecraft:bow',
    'count': 1,
    'enchantData': [(clientApi.GetMinecraftEnum().EnchantType.BowDamage, 1),],
    'auxValue': 0,
}
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 即在维度为0，位置为(10,10,10)，生成一个不会上下移动，旋转方向与原版相反，旋转速度为原版两倍的附魔弓
comp.AddDropItemToWorld(itemDict, 0, (10,10,10), 0, -2)
```

</TabItem>
</Tabs>

---

### ChangeBlockTextures

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

替换方块贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeBlockTextures(blockName: str, tileName: str, texturePath: str) -> bool
```

- blockName: str，方块标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0; 只支持普通的没有特殊渲染逻辑的方形方块，否则可能会显示异常。
- tileName: str，原贴图在图集中对应的名字，对应 terrain_texture.json 中的配置。
- texturePath: str，打算替换成的贴图的路径。

**返回值**：bool，是否设置成功（因为采用延迟加载，此处返回成功不代表贴图路径正确，路径错误会导致渲染时贴图丢失显示异常）。

**备注**

- 对纹理会动态变化的方块无效。
- 调用此接口后 tileName 不会发生变化，后续如果想恢复设置，依旧需要用这个 tileName。
- 贴图的分辨率高度需要为宽度的整数倍。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
#设置朝上的面的贴图为work_block_other
print(comp.ChangeBlockTextures("myblock:work_block:0", "myblock:work_block_faceup", "textures/blocks/work_block_other"))
#恢复朝上的面的贴图
#print(comp.ChangeBlockTextures("myblock:work_block:0", "myblock:work_block_faceup", "textures/blocks/work_block_faceup"))
```

</TabItem>
</Tabs>

---

### DeleteClientDropItemEntity

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

删除 [AddDropItemToWorld](/docs/docs/scripts/modapi/block/render#adddropitemtoworld) 创建的客户端掉落物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DeleteClientDropItemEntity(entityId: str) -> bool
```

- entityId: str，掉落物的 entityId，entityId 可在调用 [AddDropItemToWorld](/docs/docs/scripts/modapi/block/render#adddropitemtoworld) 时保存返回值，或者通过 [GetClientDropItemEntityIdList](/docs/docs/scripts/modapi/block/render#getclientdropitementityidlist) 接口获取 list。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
print comp.DeleteClientDropItemEntity(entityId)
```

</TabItem>
</Tabs>

---

### DestroyCrackFrame

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

销毁特定方块位置上的破坏纹理（仅能销毁 [SetCrackFrame](/docs/docs/scripts/modapi/block/render#setcrackframe) 接口创建的破坏纹理）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DestroyCrackFrame(dimensionId: int, blockPos: Tuple[int, int, int]) -> bool
```

- dimensionId: int，方块所在维度。
- blockPos: Tuple[int, int, int]，目标方块的坐标。

**返回值**：bool，是否执行成功。

**备注**

- 如果方块被替换，需开发者主动销毁裂纹。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 销毁位置(30,66,30)的破坏纹理
comp.DestroyCrackFrame(0, (30, 66, 30))
```

</TabItem>
</Tabs>

---

### GetBlockEntityExtraUniforms

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取在自定义方块实体的 shader 当中使用的自定义变量的值，该自定义变量总共可设置 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4，总共 4 组，每组为一个 vec4(float, float, float ,float)类型的向量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockEntityExtraUniforms(pos: Tuple[int, int, int], uniformIndex: int) -> Tuple[float, float, float, float]
```

- pos: Tuple[int, int, int]，方块实体所在位置。
- uniformIndex: int，需要设置的自定义变量的下标，值范围为 1~4。分别对应 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4。

**返回值**：Tuple[float, float, float, float]，返回的对应自定义变量的值。获取失败则返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 获取坐标位于(100,66,100)的自定义方块实体的自定义变量EXTRA_ACTOR_UNIFORM2的值
print comp.GetBlockEntityExtraUniforms((100,66,100), 2)
# 获取坐标位于(100,66,101)的自定义方块实体的自定义变量EXTRA_ACTOR_UNIFORM4的值
print comp.SetBlockEntityExtraUniforms((100,66,101), 4)
```

</TabItem>
</Tabs>

---

### GetBlockRenderDistance

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取玩家周围的可渲染距离。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockRenderDistance() -> float
```


**返回值**：float，玩家周围的可渲染距离，未设置过渲染距离时，返回的是原版能见度对应的渲染距离。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
print comp.GetBlockRenderDistance()
```

</TabItem>
</Tabs>

---

### GetBlockTextures

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取方块的初始贴图信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBlockTextures(blockName: str, face: int = 6) -> Dict[str, Any]
```

- blockName: str，方块标识符，格式[namespace:name]。
- face: int，需要获取的方块面，参考[Facing 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/Facing.html)，face 默认值为 6，此时获取方块所有面的贴图信息。

**返回值**：Dict[str, Any]，方块的贴图信息 textureInfoDict，获取错误（如特殊方块：门、床等）则返回为 None。

**备注**

- name 为贴图在图集中对应的名字，方块所用的贴图名字见 blocks.json。
- 每一个贴图名 name 在 terrain_texture.json 中可能存在多个路径，因此该接口也会返回同样多的路径。
- 该接口只作为校验用，获取到的贴图信息为游戏加载后的初始信息，[ChangeBlockTextures](/docs/docs/scripts/modapi/block/render#changeblocktextures) 修改后该接口返回的仍是初始信息。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
textureInfoDict = comp.GetBlockTextures("customblocks:customblocks_test_ore")
# textureInfoDict 信息如下
# {
#   'North': {'paths': ['textures/blocks/customblocks_ore'], 'name': 'customblocks:customblocks_test_ore'},
#   'West': {'paths': ['textures/blocks/customblocks_ore'],'name': 'customblocks:customblocks_test_ore'},
#   'Up': {'paths': ['textures/blocks/customblocks_ore'], 'name': 'customblocks:customblocks_test_ore'},
#   'Down': {'paths': ['textures/blocks/customblocks_ore'], 'name': 'customblocks:customblocks_test_ore'},
#   'East': {'paths': ['textures/blocks/customblocks_ore'], 'name': 'customblocks:customblocks_test_ore'},
#   'South': {'paths': ['textures/blocks/customblocks_ore'], 'name': 'customblocks:customblocks_test_ore'}
# }
```

</TabItem>
</Tabs>

---

### GetClientDropItemEntityIdList

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

获得所有通过 [AddDropItemToWorld](/docs/docs/scripts/modapi/block/render#adddropitemtoworld) 创建的 entityId 的 list。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetClientDropItemEntityIdList() -> List[str]
```


**返回值**：List[str]，返回所有通过 [AddDropItemToWorld](/docs/docs/scripts/modapi/block/render#adddropitemtoworld) 创建的 entityId 的 list。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
print comp.GetClientDropItemEntityIdList()
```

</TabItem>
</Tabs>

---

### GetTextureAtlasUV

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

获取指定纹理在 atlas.terrain 图集中的 UV 坐标位置与尺寸信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTextureAtlasUV(textureKey: str) -> Tuple[float, float, float, float]
```

- textureKey: str，纹理在 terrain_texture.json 中 texture_data 下的 key 值，如 grass_top。

**返回值**：Tuple[float, float, float, float]，纹理在图集中的 UV 坐标与尺寸(u0,v0,w,h)，u0,v0 为左上角归一化 UV 坐标，w 为纹理宽度，h 为纹理高度。获取失败返回 None。

**备注**

- textureKey 为方块贴图名 name，方块所用的贴图名见 blocks.json，textureKey 值见资源包 terrain_texture.json 的 texture_data。
- 该接口只支持 atlas.terrain 图集（方块图集），物品图标图集（atlas.items）不适用，获取物品图标 UV 请使用 [GetIconInfo](/docs/docs/scripts/modapi/item#geticoninfo)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
uv = comp.GetTextureAtlasUV("grass_top")
# uv = (0.80078125, 0.26953125, 0.0078125, 0.0078125)
```

</TabItem>
</Tabs>

---

### SetBlockEntityExtraUniforms

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

设置可在自定义方块实体的 shader 当中使用的自定义变量的值，该自定义变量总共可设置 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4，总共 4 组，每组为一个 vec4(float, float, float ,float)类型的向量，向量的默认值为(1.0,1.0,1.0,1.0)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockEntityExtraUniforms(
    pos: Tuple[int, int, int],
    uniformIndex: int,
    data: Tuple[float, float, float, float],
) -> bool
```

- pos: Tuple[int, int, int]，方块实体所在位置。
- uniformIndex: int，需要设置的自定义变量的下标，值范围为 1~4。分别对应 EXTRA_ACTOR_UNIFORM1,EXTRA_ACTOR_UNIFORM2,EXTRA_ACTOR_UNIFORM3,EXTRA_ACTOR_UNIFORM4。
- data: Tuple[float, float, float, float]，需要设置的自定义变量的值。

**返回值**：bool，设置是否成功，成功返回 True，否则返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 对坐标位于(100,66,100)的自定义方块实体设置自定义变量EXTRA_ACTOR_UNIFORM1的值
print comp.SetBlockEntityExtraUniforms((100,66,100), 1, (2.5,2.5,2.5,2.5))
# 对坐标位于(100,66,101)的自定义方块实体设置自定义变量EXTRA_ACTOR_UNIFORM3的值
print comp.SetBlockEntityExtraUniforms((100,66,101), 3, (2.5,2.5,2.5,2.5))
# 接下来，我们找到这个自定义方块实体所使用的材质，在其中定义的vertex shader或是fragment shader中做如下声明及使用：
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

### SetBlockEntityFramePosOffset

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

设置自定义方块实体中序列帧特效位置偏移值，用于调整序列帧特效相对于方块位置的偏移。与特效/序列帧/[SetPos](/docs/docs/scripts/modapi/effect/particle#setpos) 接口不同，该接口调整的是相对于方块位置的位置偏移值，而不是世界坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockEntityFramePosOffset(
    pos: Tuple[int, int, int],
    frameKeyName: str,
    effectPosOffset: Tuple[int, int, int],
) -> bool
```

- pos: Tuple[int, int, int]，方块所在位置。
- frameKeyName: str，该序列帧特效的自定义键值名称。
- effectPosOffset: Tuple[int, int, int]，序列帧特效相对于方块位置的 x，y，z 方向的偏移值。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 调整序列帧特效的位置，在方块的位置上向+x轴方向偏移1, +y轴方向偏移2, +z轴方向偏移1
comp.SetBlockEntityFramePosOffset(pos, "my_frame1", (1,2,1))
```

</TabItem>
</Tabs>

---

### SetBlockEntityModelPosOffset

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

设置自定义方块实体的实体模型位置偏移值，用于调整实体模型相对于方块位置的偏移。可通过该接口来调整自定义方块实体的实体模型的位置。只有自定义方块实体定义实体模型才生效，实体模型在 resource_pack/entity/下定义，详细可参考自定义方块实体动画的教学文档。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockEntityModelPosOffset(pos: Tuple[int, int, int], modelPosOffset: Tuple[int, int, int]) -> bool
```

- pos: Tuple[int, int, int]，方块所在位置。
- modelPosOffset: Tuple[int, int, int]，实体模型相对于方块位置的 x，y，z 方向的偏移值。

**返回值**：bool，设置是否成功。

**备注**

- 在调整实体模型的位置时，注意不要设置模型位置离方块实体的位置过远。如果设置过远，在玩家将屏幕移动到其他地方而看不到方块实体时，实体模型会由于玩家屏幕里不存在该方块实体而停止渲染。在这种情况下，每当玩家屏幕里看不到这个方块实体所在的位置时，实体模型都会消失。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 调整模型的位置，偏移值为向+x轴方向偏移1, +y轴方向偏移2, +z轴方向偏移1
comp.SetBlockEntityModelPosOffset(pos, (1,2,1))
```

</TabItem>
</Tabs>

---

### SetBlockEntityModelRotation

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

设置自定义方块实体的实体模型在各个轴上的旋转值，可通过该接口来调整自定义方块实体的实体模型的旋转。只有自定义方块实体定义实体模型才生效，实体模型在 resource_pack/entity/下定义，详细可参考自定义方块实体动画的教学文档。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockEntityModelRotation(pos: Tuple[int, int, int], angles: float, rotateAxis: str) -> bool
```

- pos: Tuple[int, int, int]，方块所在位置。
- angles: float，旋转角度，范围为[-360,360]。
- rotateAxis: str，旋转轴，绕该轴进行旋转，该参数仅支持填写以下三个值之一: "x", "y", "z"，大小写均可。

**返回值**：bool，设置是否成功。

**备注**

- 在调整旋转角度时，注意旋转的顺序和角度的设置，避免出现万向锁的问题。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 调整模型旋转，绕x轴旋转30度
comp.SetBlockEntityModelRotation(pos, 30, "x")
# 调整模型旋转，绕y轴旋转30度
comp.SetBlockEntityModelRotation(pos, 30, "y")
# 调整模型旋转，绕z轴旋转30度
comp.SetBlockEntityModelRotation(pos, 30, "z")
```

</TabItem>
</Tabs>

---

### SetBlockEntityModelScale

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

设置自定义方块实体的实体模型大小的缩放值，可通过该接口来调整自定义方块实体的实体模型的大小。只有自定义方块实体定义实体模型才生效，实体模型在 resource_pack/entity/下定义，详细可参考自定义方块实体动画的教学文档。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockEntityModelScale(pos: Tuple[int, int, int], scale: Tuple[float, float, float]) -> bool
```

- pos: Tuple[int, int, int]，方块所在位置。
- scale: Tuple[float, float, float]，实体模型在 x,y,z 各个轴上的缩放值。支持负值，当某一轴的缩放值为负值时，表示模型将会在这个轴上进行以另外两个轴为对称平面的镜像变换。

**返回值**：bool，设置是否成功。

**备注**

- 模型的大小可以通过两个方式来调整：(1) 在 entity.json 中 scripts 字段下定义 scale，如下所示："minecraft:client_entity": \{ ... "scripts":\{ // 整体模型大小缩放值，定义了"scale"之后 scalex，scaley，scalez 将无效 "scale" : "0.9375", // 对三个轴方向的缩放值。注释掉上方"scale", 以下三个缩放值将生效。"scalex": "0.9375", "scaley": "0.9375", "scalez": "0.9375", ... \} \} (2) 使用本接口 SetBlockEntityModelScale 来设置模型缩放值。以上两种方式，第一种方式是对所有的使用这个模型的方块实体生效，第二种方式是对指定的方块实体的模型生效。如果同时使用了第一种方式以及第二种方式来调整模型大小，则模型会先按照第一种方式来进行缩放，再按照第二种方式来进行缩放。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 调整模型大小为x轴方向放大为原来的2倍，y轴方向放大为原来的2倍，z轴方向缩小为原来的0.5倍
comp.SetBlockEntityModelScale(pos, (2,2,0.5))
```

</TabItem>
</Tabs>

---

### SetBlockEntityParticlePosOffset

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

设置自定义方块实体中粒子特效位置偏移值，用于调整粒子特效相对于方块位置的偏移。与特效/粒子/[SetPos](/docs/docs/scripts/modapi/effect/particle#setpos) 接口不同，该接口调整的是相对于方块位置的位置偏移值，而不是世界坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockEntityParticlePosOffset(
    pos: Tuple[int, int, int],
    particleKeyName: str,
    effectPosOffset: Tuple[int, int, int],
) -> bool
```

- pos: Tuple[int, int, int]，方块所在位置。
- particleKeyName: str，该粒子特效的自定义键值名称。
- effectPosOffset: Tuple[int, int, int]，粒子特效相对于方块位置的 x，y，z 方向的偏移值。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 调整粒子特效的位置，在方块的位置上向+x轴方向偏移1, +y轴方向偏移2, +z轴方向偏移1
comp.SetBlockEntityParticlePosOffset(pos, "my_particle1", (1,2,1))
```

</TabItem>
</Tabs>

---

### SetBlockRenderDistance

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

设置玩家周围方块的可渲染距离。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBlockRenderDistance(distance: float) -> bool
```

- distance: float，区块的可渲染距离，有效值范围为大于等于 16，传入无效值则使用原版游戏内的能见度，能见度区块数 x 与渲染距离 dis 的换算方法约为 dis = x*16 + 13.8564。

**返回值**：bool，设置是否成功，成功返回 True，失败返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 设置方块的可渲染距离为48
print comp.SetBlockRenderDistance(48)
```

</TabItem>
</Tabs>

---

### SetCrackFrame

<Client/> BlockInfoComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)`

仅客户端的破坏纹理的渲染，可自定义破坏阶段在第几帧。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCrackFrame(dimensionId: int, blockPos: Tuple[int, int, int], frame: int) -> bool
```

- dimensionId: int，方块所在维度。
- blockPos: Tuple[int, int, int]，目标方块的坐标。
- frame: int，第几张纹理（取值范围 0-9）。

**返回值**：bool，是否执行成功（不代表必定能显示裂纹）。

**备注**

- 目前自定义方块实体外观，不支持裂纹的显示（client_entity、netease_model）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateBlockInfo(levelId)
# 在(30,66,30)这个位置播放破坏方块的纹理，进度为1
comp.SetCrackFrame(0, (30, 66, 30), 1)
```

</TabItem>
</Tabs>

---

### SetDropItemTransform

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

设置通过 [AddDropItemToWorld](/docs/docs/scripts/modapi/block/render#adddropitemtoworld) 添加的掉落物的位置、角度和缩放。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetDropItemTransform(
    entityId: str,
    position: Tuple[float, float, float],
    rotation: Optional[Tuple[float, float, float]] = None,
    scale: Optional[float] = None,
) -> bool
```

- entityId: str，掉落物的 entityId，entityId 可在调用 [AddDropItemToWorld](/docs/docs/scripts/modapi/block/render#adddropitemtoworld) 时保存返回值，或者通过 [GetClientDropItemEntityIdList](/docs/docs/scripts/modapi/block/render#getclientdropitementityidlist) 接口获取 list。
- position: Tuple[float, float, float]，生成的掉落物所在位置。如需设置后续参数需填写 None 占位，传 None 表示不修改。
- rotation: Optional[Tuple[float, float, float]]，选填，设置掉落物的角度，不填默认为 None，设置 rotation 后将会固定角度 [AddDropItemToWorld](/docs/docs/scripts/modapi/block/render#adddropitemtoworld) 设置的 spinSpeed 无效。如需设置后续参数需填写 None 占位，传 None 表示不修改。
- scale: Optional[float]，选填，设置掉落物的缩放，不填默认为 None，传 None 表示不修改。

**返回值**：bool，是否成功。

**备注**

- Scale 不能为负数，设置过大可能会导致掉落物消失，同时 Scale 过大会出现某些摄像机视角不会渲染的情况。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
print comp.SetDropItemTransform(entityId, (10, 10, 10), (90, 45, 30), 1.5) # entityId需要AddDropItemToWorld接口获取
```

</TabItem>
</Tabs>

---
