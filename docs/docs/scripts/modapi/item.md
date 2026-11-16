---
sidebar_position: 6
---

# 物品

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录物品相关的接口，共 49 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/wupin.html"/>

---

### BindItemToMinecraftModel

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

将指定物品作为附作物动态挂接到实体原版模型上，在实体原版模型上渲染指定物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindItemToMinecraftModel(
    entityId: str,
    itemDict: Dict[str, Any],
    boneName: str = "root",
    isClientEntity: bool = False,
    offset: Tuple[float, float, float] = (0, 0, 0),
    rotation: Tuple[float, float, float] = (0, 0, 0),
    scale: float = 1.0,
) -> int
```

- entityId: str，需要挂接到的实体的 id。
- itemDict: Dict[str, Any]，需要挂接的物品的[信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- boneName: str，需要挂接到的骨骼名称(不区分大小写)，默认值为"root"。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。
- offset: Tuple[float, float, float]，绑定物品的偏移量，相对绑定 entity 脚下中心，默认值为(0, 0, 0)。
- rotation: Tuple[float, float, float]，绑定物品的三维旋转(单位为度，按照 ZYX 顺序旋转)，默认值为(0, 0, 0)。
- scale: float，绑定物品的缩放比例。默认值为 1.0。

**返回值**：int，绑定成功后，返回创建的物品模型 id。失败则返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头部绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToMinecraftModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
```

</TabItem>
</Tabs>

---

### BindItemToSkeletonModel

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

将指定物品作为附作物动态挂接到实体的网易版骨骼模型，在实体的网易版骨骼模型上指定骨骼渲染指定物品。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindItemToSkeletonModel(
    entityId: str,
    itemDict: Dict[str, Any],
    boneName: str = "root",
    isClientEntity: bool = False,
    offset: Tuple[float, float, float] = (0, 0, 0),
    rotation: Tuple[float, float, float] = (0, 0, 0),
    scale: float = 1.0,
) -> int
```

- entityId: str，需要挂接到的实体的 id。
- itemDict: Dict[str, Any]，需要挂接的物品的[信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- boneName: str，需要挂接到的骨骼名称(不区分大小写)，默认值为"root"。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。
- offset: Tuple[float, float, float]，绑定物品的偏移量，相对绑定的骨骼中心，默认值为(0, 0, 0)。
- rotation: Tuple[float, float, float]，绑定物品的三维旋转(单位为度，按照 ZYX 顺序旋转)，默认值为(0, 0, 0)。
- scale: float，绑定物品的缩放比例。默认值为 1.0。

**返回值**：int，绑定成功后，返回创建的物品模型 id。失败则返回-1。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头顶绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToSkeletonModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
```

</TabItem>
</Tabs>

---

### CancelShearsDestroyBlockSpeed

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(entityId)`

取消剪刀对某一方块的破坏速度设置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CancelShearsDestroyBlockSpeed(blockName: str) -> bool
```

- blockName: str，方块名称,包含命名空间。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(entityId)
comp.CancelShearsDestroyBlockSpeed("minecraft:obsidian")
```

</TabItem>
</Tabs>

---

### CancelShearsDestroyBlockSpeedAll

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(entityId)`

取消剪刀对全部方块的破坏速度设置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CancelShearsDestroyBlockSpeedAll() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(entityId)
comp.CancelShearsDestroyBlockSpeedAll()
```

</TabItem>
</Tabs>

---

### ChangeArmorTextures

<Client/> ActorRenderCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateActorRender(levelId)`

修改盔甲在场景中显示和在 UI 中显示的贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeArmorTextures(armorIdentifier: str, texturesDict: Dict[str, Any], uiIconTexture: str) -> bool
```

- armorIdentifier: str，盔甲标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0。
- texturesDict: Dict[str, Any]，场景中目标贴图的映射表，格式可参考"definitions/attachables/diamond_helmet.json"配置。
- uiIconTexture: str，盔甲 UI 图标的贴图, 为 None 或者""的话表示不修改 UI 上的图标。

**返回值**：bool，修改是否成功（因为采用延迟加载，此处返回成功不代表参数中的贴图路径正确，路径错误会导致渲染时贴图丢失显示异常）。

**备注**

- 无法跟物品的贴图动画同时使用。
- 有一定性能消耗，不建议频繁调用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateActorRender(levelId)
# 修改钻石头盔的显示为黄金头盔
textureDict = {
    "default": "textures/models/armor/gold_1",
    "enchanted": "textures/misc/enchanted_item_glint"
}
print(comp.ChangeArmorTextures("minecraft:diamond_helmet", textureDict, "textures/items/gold_helmet"))
```

</TabItem>
</Tabs>

---

### ChangeItemTexture

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

替换物品的贴图，修改后所有用到该贴图的物品都会被改变，后续创建的此类物品也会被改变。会同时修改物品在 UI 界面上的显示，手持时候的显示与场景掉落的显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeItemTexture(identifier: str, texturePath: str) -> bool
```

- identifier: str，物品标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0。
- texturePath: str，贴图路径。

**返回值**：bool，是否修改成功（因为采用延迟加载，此处返回成功不代表贴图路径正确，路径错误会导致渲染时贴图丢失显示异常）。

**备注**

- 因为会同时修改用到此贴图的所有物品，所以使用的时候尽量谨慎，不建议改原版的物品，建议只用于修改用到自定义新贴图的物品。
- 序列帧贴图物品暂不支持动态修改贴图。
- 部分物品有特殊逻辑无法修改：箱子，旗帜，生物头颅，盾牌，三叉戟，鱼杆。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
print(comp.ChangeItemTexture("mytool:hatchet_1:0", "textures/items/hatchet_1"))
```

</TabItem>
</Tabs>

---

### GetAllEnchantsInfo

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

获取目前已注册的所有附魔信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAllEnchantsInfo() -> List[Dict[str, Any]]
```


**返回值**：List[Dict[str, Any]]，附魔信息字典[附魔信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#附魔信息字典#附魔信息字典)。

**备注**

- 1.目前能获取原生及自定义附魔信息 2.由于原生附魔的消耗存在不相同的计算规则，目前不提供原生附魔的 costs 信息。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetAllEnchantsInfo()
```

</TabItem>
</Tabs>

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

获取目前已注册的所有附魔信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAllEnchantsInfo() -> List[Dict[str, Any]]
```


**返回值**：List[Dict[str, Any]]，附魔信息字典[附魔信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#附魔信息字典#附魔信息字典)。

**备注**

- 1.目前能获取原生及自定义附魔信息 2.由于原生附魔的消耗存在不相同的计算规则，目前不提供原生附魔的 costs 信息。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetAllEnchantsInfo()
```

</TabItem>
</Tabs>

---

### GetBindBoneForBindItem

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

查询获取实体上已绑定的物品附着物所绑定的骨骼名称。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindBoneForBindItem(entityId: str, itemModelId: int, isClientEntity: bool = False) -> str
```

- entityId: str，需要查询的实体的 id。
- itemModelId: int，需要查询的物品模型 id。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。

**返回值**：str，绑定的骨骼名称。查询失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头部绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToMinecraftModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
# 使这个苹果绑定到手部
comp.SetBindBoneForBindItem(player_id, itemModelId, "rightarm")
# 获取当前绑定的骨骼名称
boneName = comp.GetBindBoneForBindItem(player_id, itemModelId)
print("The bone name of the bind item is:", boneName)
```

</TabItem>
</Tabs>

---

### GetBindItemOffset

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

查询获取实体上的物品附着物相对骨骼的位置偏移。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindItemOffset(entityId: str, itemModelId: int, isClientEntity: bool = False) -> Tuple[float, float, float]
```

- entityId: str，需要查询的实体的 id。
- itemModelId: int，需要查询的物品模型 id。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。

**返回值**：Tuple[float, float, float]，物品的位置偏移，查询如果失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头部绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToMinecraftModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
# 使这个苹果往x方向偏移10个单位
offset = comp.GetBindItemOffset(player_id, itemModelId)
print("offset is:", offset)
```

</TabItem>
</Tabs>

---

### GetBindItemRotation

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

查询获取实体上的物品附着物相对骨骼的旋转角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindItemRotation(
    entityId: str,
    itemModelId: int,
    isClientEntity: bool = False,
) -> Tuple[float, float, float]
```

- entityId: str，需要查询的实体的 id。
- itemModelId: int，需要查询物品模型 id。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。

**返回值**：Tuple[float, float, float]，返回物品的三维旋转，查询如果失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头部绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "enchantData" : [],                    # 附魔信息
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToMinecraftModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
# 获取这个苹果旋转角度
rotation = comp.GetBindItemRotation(player_id, itemModelId)
print("rotation is:", rotation)
```

</TabItem>
</Tabs>

---

### GetBindItemScale

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

查询获取实体上的物品附着物的缩放比例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindItemScale(entityId: str, itemModelId: int, isClientEntity: bool = False) -> float
```

- entityId: str，需要查询的实体的 id。
- itemModelId: int，需要查询的物品模型 id。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。

**返回值**：float，绑定物品的缩放比例。查询如果失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头部绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToMinecraftModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
# 使这个苹果变大1.5倍
scale = comp.GetBindItemScale(player_id, itemModelId)
print("scale is:", scale)
```

</TabItem>
</Tabs>

---

### GetCustomName

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取物品的自定义名称，与铁砧修改的名称一致。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCustomName(itemDict: Dict[str, Any]) -> str
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。如果是接口获取的 itemDict，应该包含 userData，即 getUserData 应该为 True。

**返回值**：str，自定义名称。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = comp.GetPlayerItem(serverApi.GetMinecraftEnum().ItemPosType.CARRIED, 0, True)
name = comp.GetCustomName(itemDict)
```

</TabItem>
</Tabs>

---

### GetFishingLineColor

<Server/> FishingLineCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateFishingLine(playerId)`

获取服务端当前设置的钓鱼线颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFishingLineColor(itemName: str) -> Tuple[float, float, float]
```

- itemName: str，鱼竿物品的完整名称，如 "minecraft:fishing_rod" 或自定义鱼竿名称。

**返回值**：Tuple[float, float, float]，rgb 颜色值，每个分量 0.0-1.0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFishingLine(playerId)
color = comp.GetFishingLineColor("mymod:custom_fishing_rod")
print color
```

</TabItem>
</Tabs>

<Client/> FishingLineCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFishingLine(playerId)`

获取钓鱼线的颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFishingLineColor(itemName: str) -> Tuple[float, float, float]
```

- itemName: str，鱼竿物品的完整名称，如 "minecraft:fishing_rod" 或自定义鱼竿名称。

**返回值**：Tuple[float, float, float]，rgb 颜色值，每个分量 0.0-1.0。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFishingLine(playerId)
color = comp.GetFishingLineColor("mymod:custom_fishing_rod")
print color
```

</TabItem>
</Tabs>

---

### GetFishingLineMax

<Server/> FishingLineCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateFishingLine(playerId)`

获取服务端当前设置的钓鱼线最大长度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFishingLineMax(itemName: str) -> float
```

- itemName: str，鱼竿物品的完整名称，如 "minecraft:fishing_rod" 或自定义鱼竿名称。

**返回值**：float，最大长度，单位为格。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFishingLine(playerId)
maxLen = comp.GetFishingLineMax("mymod:custom_fishing_rod")
```

</TabItem>
</Tabs>

<Client/> FishingLineCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateFishingLine(playerId)`

获取钓鱼线的最大长度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFishingLineMax(itemName: str) -> float
```

- itemName: str，鱼竿物品的完整名称，如 "minecraft:fishing_rod" 或自定义鱼竿名称。

**返回值**：float，最大长度，单位为格。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateFishingLine(playerId)
maxLen = comp.GetFishingLineMax("mymod:custom_fishing_rod")
```

</TabItem>
</Tabs>

---

### GetIconInfo

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

获取物品图标纹理在图集中的 UV 坐标位置与尺寸信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetIconInfo(itemDict: Dict[str, Any]) -> Tuple[float, float, float, float]
```

- itemDict: Dict[str, Any]，物品信息字典，格式。

**返回值**：Tuple[float, float, float, float]，物品图标在图集中的 UV 坐标与尺寸(u0,v0,w,h)，u0,v0 为左上角归一化 UV 坐标，w 为纹理宽度，h 为纹理高度。获取失败返回 None。

**备注**

- 获取的是物品图标所在图集的 UV 信息，方块类物品的图标位于 atlas.terrain 图集，普通物品图标位于 atlas.items 图集，两者返回的均为归一化 UV 坐标。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
uv = comp.GetIconInfo({"itemName": "minecraft:apple", "auxValue": 0})
# uv = (0.1064453125, 0.0009765625, 0.015625, 0.015625)
```

</TabItem>
</Tabs>

---

### GetItemBasicInfo

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

获取物品的基础信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemBasicInfo(itemName: str, auxValue: int = 0, isEnchanted: bool = False) -> Dict[str, Any]
```

- itemName: str，item 的 identifier。
- auxValue: int，物品的附加值 auxvalue，默认为 0。
- isEnchanted: bool，是否附魔，默认为 False。用于返回的 id_aux。

**返回值**：Dict[str, Any]，基础信息，详见备注。

**备注**

- auxValue 默认值是 0，可以不设置。如果物品不存在，返回值为 None。

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| itemName | str | 本地化的物品名字 |
| maxStackSize | int | 物品最大堆叠数目 |
| maxDurability | int | 物品最大耐久值 |
| id_aux | int | 主要用于客户端的 ui 绑定，详见客户端接口 |
| tierDict | dict | 自定义方块定义的挖掘相关的属性 netease:tier,没有设置时返回 None |
| itemCategory | str | 创造栏分类 |
| itemType | str | 物品类型 |
| customItemType | str | 自定义物品类型 |
| tags | list(str) | 物品的 tags 列表，如['minecraft:is_food'] |
| customTips | str | 自定义物品/方块 tips |
| itemTierLevel | int | 工具等级 |
| fuelDuration | float | 燃料时长 |
| foodNutrition | int | 食物营养值 |
| foodSaturation | float | 食物饱食度 |
| weaponDamage | int | 武器攻击力 |
| armorDefense | int | 防具防御力 |
| armorSlot | int | 防具槽位 |
| armorToughness | int | 防具韧性 |
| armorKnockbackResistance | float | 防具击退抗性 |
| enchant_slot_type | int | 附魔槽位枚举标志 [自定义附魔文档](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/11-zidingyifumowendang.html) |

- 部分原版物品较为特殊，获取不到个别字段的返回值 方块类燃料获取不到燃料时长，弓、弩获取不到武器攻击力，蛋糕获取不到营养值和饱食度，马铠获取不到防具防御力，上述物品获取对应字段返回值为 0。
- 创造栏分类说明。

| 创造栏分类 | 意义 |
| --- | --- |
| construction | 建筑 |
| nature | 自然 |
| equipment | 装备 |
| items | 物品 |
| custom | 自定义 |
| 空字符串 | 不在创造栏 |

- 物品类型，值为空字符串或者下列类型名之一:。

| 类型名 | 意义 |
| --- | --- |
| book | 书 |
| sword | 剑 |
| shears | 剪刀 |
| axe | 斧头 |
| clock | 时钟 |
| bucket | 桶 |
| fishing_rod | 钓鱼竿 |
| hoe | 锄头 |
| shovel | 锹 |
| pickaxe | 镐 |
| dye | 骨粉 |
| food | 食物 |
| block | 方块 |
| armor | 盔甲 |
| custom_ranged_weapon | 自定义远程武器 |
| compass | 指南针 |
| trident | 三叉戟 |
| potion | 药水 |
| crossbow | 弩 |

- 自定义物品类型物品类型，值为行为包里 minecraft:item 内 description 的 custom_item_type 字段值。
- 工具等级代表不同的材质，没有工具等级时为值-1，工具等级与材质对应关系如下。

| 工具等级 | 材质 |
| --- | --- |
| 0 | 木制/金制工具 |
| 1 | 石制工具 |
| 2 | 铁制工具 |
| 3 | 钻石工具 |
| 4 | 合金工具 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
info = comp.GetItemBasicInfo("minecraft:bow")
enchant_slot_type = info["enchant_slot_type"]
support_sword = (enchant_slot_type & EnchantSlotType.SWORD) > 0
```

</TabItem>
</Tabs>

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(playerId)`

获取物品的基础信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemBasicInfo(itemName: str, auxValue: int = 0, isEnchanted: bool = False) -> Dict[str, Any]
```

- itemName: str，item 的 identifier。
- auxValue: int，物品的附加值 auxvalue，默认为 0。
- isEnchanted: bool，是否附魔，默认为 False。用于返回的 id_aux。

**返回值**：Dict[str, Any]，基础信息字典，见备注。

**备注**

- auxValue 默认值是 0，可以不设置。如果物品不存在，返回值为 None。

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| itemName | str | 本地化的物品名字 |
| maxStackSize | int | 物品最大堆叠数目 |
| maxDurability | int | 物品最大耐久值 |
| id_aux | int | 用于给 UI 的 inventory_item_renderer 类型控件绑定#item_id_aux 字段，详见备注 |
| tierDict | dict | 自定义方块定义的挖掘相关的属性 netease:tier,没有设置时返回 None |
| itemCategory | str | 创造栏分类 |
| itemType | str | 物品类型 |
| customItemType | str | 自定义物品类型 |
| tags | list(str) | 物品的 tags 列表，如['minecraft:is_food'] |
| customTips | str | 自定义物品/方块 tips |
| itemTierLevel | int | 工具等级 |
| fuelDuration | float | 燃料时长 |
| foodNutrition | int | 食物营养值 |
| foodSaturation | float | 食物饱食度 |
| weaponDamage | int | 武器攻击力 |
| armorDefense | int | 防具防御力 |
| armorSlot | int | 防具槽位 |
| armorToughness | int | 防具韧性 |
| armorKnockbackResistance | float | 防具击退抗性 |
| enchant_slot_type | int | 附魔槽位枚举标志 [自定义附魔文档](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/11-zidingyifumowendang.html) |

- 部分原版物品较为特殊，获取不到个别字段的返回值 方块类燃料获取不到燃料时长，弓、弩获取不到武器攻击力，蛋糕获取不到营养值和饱食度，马铠获取不到防具防御力，上述物品获取对应字段返回值为 0。
- id_aux 字段的示例：在 ui 中添加一个 inventory_item_renderer 控件以及#item_id_aux 的绑定。

```text
"my_item_renderer": {
    "type": "custom",
    "renderer": "inventory_item_renderer",
    "size": [ 160, 160 ],
    "bindings" : [
        {
            "binding_condition" : "always_when_visible",
            "binding_name" : "#GetItemIdAux",
            "binding_name_override" : "#item_id_aux"
        }
    ]
}
```

- 然后在 python 中添加绑定回调。

```python
@ViewBinder.binding(ViewBinder.BF_BindInt, "#GetItemIdAux")
def OnStarkGridResize(self):
    comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
    info = comp.GetItemBasicInfo("minecraft:bow", 0, True)
    return info['id_aux']
```

- 创造栏分类说明。

| 创造栏分类 | 意义 |
| --- | --- |
| construction | 建筑 |
| nature | 自然 |
| equipment | 装备 |
| items | 物品 |
| custom | 自定义 |

- 物品类型，值为空字符串或者下列类型名之一:。

| 类型名 | 意义 |
| --- | --- |
| book | 书 |
| sword | 剑 |
| shears | 剪刀 |
| axe | 斧头 |
| clock | 时钟 |
| bucket | 桶 |
| fishing_rod | 钓鱼竿 |
| hoe | 锄头 |
| shovel | 锹 |
| pickaxe | 镐 |
| dye | 骨粉 |
| food | 食物 |
| block | 方块 |
| armor | 盔甲 |
| custom_ranged_weapon | 自定义远程武器 |
| compass | 指南针 |
| trident | 三叉戟 |
| potion | 药水 |
| crossbow | 弩 |

- 自定义物品类型物品类型，值为行为包里 minecraft::item 内的 custom_item_type 字段值。
- 工具等级代表不同的材质，没有工具等级时为值-1，工具等级与材质对应关系如下。

| 工具等级 | 材质 |
| --- | --- |
| 0 | 木制/金制工具 |
| 1 | 石制工具 |
| 2 | 铁制工具 |
| 3 | 钻石工具 |
| 4 | 合金工具 |

</TabItem>
<TabItem value="示例" label="示例">

```text
"my_item_renderer": {
    "type": "custom",
    "renderer": "inventory_item_renderer",
    "size": [ 160, 160 ],
    "bindings" : [
        {
            "binding_condition" : "always_when_visible",
            "binding_name" : "#GetItemIdAux",
            "binding_name_override" : "#item_id_aux"
        }
    ]
}
```

</TabItem>
</Tabs>

---

### GetItemDefenceAngle

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取盾牌物品的抵挡角度范围。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemDefenceAngle(posType: int, slotPos: int) -> List[float]
```

- posType: int，[ItemPosType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemPosType.html)。
- slotPos: int，槽位。

**返回值**：List[float]，角度范围。

**备注**

- 当传入的玩家 id 不正确，玩家手里没手持盾牌，传入不存在的槽位时，会返回空列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetItemDefenceAngle(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0)
```

</TabItem>
</Tabs>

---

### GetItemDurability

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取指定槽位的物品耐久。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemDurability(posType: int, slotPos: int) -> int
```

- posType: int，[ItemPosType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemPosType.html)。
- slotPos: int，槽位，当 posType 为 ItemPosType.INVENTORY 或 ItemPosType.ARMOR 时才有意义。

**返回值**：int，物品的耐久值。

**备注**

- posType 设置成 serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/general/tool#getminecraftenum)().ItemPosType.INVENTORY 可替代 GetInvItemDurability；posType 设置成 serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/general/tool#getminecraftenum)().ItemPosType.ARMOR 可替代 GetEquItemDurability；

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetItemDurability(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 1)

#替代GetInvItemDurability的方法
comp.GetItemDurability(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 1)

#替代GetEquItemDurability的方法
comp.GetItemDurability(serverApi.GetMinecraftEnum().ItemPosType.ARMOR, 1)
```

</TabItem>
</Tabs>

---

### GetItemEffectName

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

获取物品的状态描述，如：§7 保护 0§r。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemEffectName(itemName: str, auxValue: int, userData: Optional[Dict[str, Any]] = None) -> str
```

- itemName: str，item 的 identifier。
- auxValue: int，物品的附加值 auxValue，默认为不指定 auxValue（0）。
- userData: Optional[Dict[str, Any]]，物品 userData，默认为 None。

**返回值**：str，物品的状态描述。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 灾厄旗帜
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetItemEffectName("minecraft:banner", 15, {'Type': 1})
```

</TabItem>
</Tabs>

---

### GetItemFormattedHoverText

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

获取物品的格式化 hover 文本，如：§f 灾厄旗帜§r。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemFormattedHoverText(
    itemName: str,
    auxValue: int,
    showCategory: bool = False,
    userData: Optional[Dict[str, Any]] = None,
) -> str
```

- itemName: str，item 的 identifier。
- auxValue: int，物品的附加值 auxValue，默认为不指定 auxValue（0）。
- showCategory: bool，是否包括 item 的类别信息，默认 False。
- userData: Optional[Dict[str, Any]]，物品 userData，默认为 None。

**返回值**：str，物品的格式化 hover 文本。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 灾厄旗帜
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetItemFormattedHoverText("minecraft:banner", 15, True, {'Type': 1})
```

</TabItem>
</Tabs>

---

### GetItemHoverName

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

获取物品的 hover 名称，如：灾厄旗帜§r。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemHoverName(itemName: str, auxValue: int, userData: Optional[Dict[str, Any]] = None) -> str
```

- itemName: str，item 的 identifier。
- auxValue: int，物品的附加值 auxValue，默认为不指定 auxValue（0）。
- userData: Optional[Dict[str, Any]]，物品 userData，默认为 None。

**返回值**：str，物品 hover 名称。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 灾厄旗帜
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetItemHoverName("minecraft:banner", 15, {'Type': 1})
```

</TabItem>
</Tabs>

---

### GetItemInfoByBlockName

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

通过方块名称及 aux 值获取物品信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemInfoByBlockName(blockName: str, auxValue: int, isLegacy: bool = True) -> Dict[str, Any]
```

- blockName: str，方块 identifier。
- auxValue: int，aux 值。
- isLegacy: bool，方块是否为原生方块，默认为 True，即使用旧版 aux 对应的 state。

**返回值**：Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
blockDict = comp.GetItemInfoByBlockName("minecraft:stone")
```

</TabItem>
</Tabs>

---

### GetItemLayer

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取物品的叠加贴图。物品叠加贴图详见 [SetItemLayer](/docs/docs/scripts/modapi/item#setitemlayer)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemLayer(itemDict: Dict[str, Any], layer: int) -> str
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- layer: int，贴图的层级。可以为-2，-1，1，2，3。

**返回值**：str，贴图的名字，不存在返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = comp.GetPlayerItem(serverApi.GetMinecraftEnum().ItemPosType.CARRIED, 0, True)
texture = comp.GetItemLayer(itemDict, 1)
```

</TabItem>
</Tabs>

---

### GetItemMaxDurability

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

获取指定槽位的物品耐最大耐久。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemMaxDurability(posType: int, slotPos: int, isUserData: bool) -> int
```

- posType: int，[ItemPosType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemPosType.html)。
- slotPos: int，槽位，当 posType 为 ItemPosType.INVENTORY 或 ItemPosType.ARMOR 时才有意义。
- isUserData: bool，如果为 True，则只尝试获取该物品 userData 特殊设置的值，没有特殊设置过则返回 0。如果为 False，则会先尝试获取 userData 中的值，没有的话获取该类物品通用值。

**返回值**：int，物品的最大耐久。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.GetItemMaxDurability(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 1, False)
```

</TabItem>
</Tabs>

---

### GetItemTags

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

获取物品的 tags 列表，包含原版 minecraft:tags 中定义的 tags，以及 netease_tags 中注册并挂载到物品上的自定义标签。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemTags(itemName: str, auxValue: int) -> List[str]
```

- itemName: str，item 的 identifier。
- auxValue: int，物品的附加值 auxValue，默认为不指定 auxValue（0）。

**返回值**：List[str]，物品 tags 列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetItemTags("minecraft:apple")
```

</TabItem>
</Tabs>

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

获取物品的 tags 列表，包含原版 minecraft:tags 中定义的 tags，以及 netease_tags 中注册并挂载到物品上的自定义标签。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemTags(itemName: str, auxValue: int) -> List[str]
```

- itemName: str，item 的 identifier。
- auxValue: int，物品的附加值 auxValue，默认为不指定 auxValue（0）。

**返回值**：List[str]，物品 tags 列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
comp.GetItemTags("minecraft:apple")
```

</TabItem>
</Tabs>

---

### GetItemTexture

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

获取 item_texture.json 中物品的贴图路径。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetItemTexture(identifier: str) -> str
```

- identifier: str，物品标识符，格式[namespace:name:auxvalue]，auxvalue 默认为 0。

**返回值**：str，物品的贴图路径。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
print(comp.GetItemTexture("mytool:hatchet_1:0"))
```

</TabItem>
</Tabs>

---

### GetLoadItems

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

获取已经加载的物品 id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetLoadItems(flag: bool = True) -> List[str]
```

- flag: bool，True 获取所有物品，False 仅获取注册到创造栏的物品，默认为 True。

**返回值**：List[str]，物品 id 列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
itemName = comp.GetLoadItems(True)
```

</TabItem>
</Tabs>

---

### GetUserDataInEvent

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

使物品相关服务端事件的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)参数带有 userData。在 mod 初始化时调用即可。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUserDataInEvent(eventName: str) -> bool
```

- eventName: str，引擎事件名。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
# 这样调用之后，PlayerEatFoodServerEvent事件的itemDict参数会带有userData字段
comp.GetUserDataInEvent("PlayerEatFoodServerEvent")
```

</TabItem>
</Tabs>

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

使物品相关客户端事件的[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)参数带有 userData。在 mod 初始化时调用即可。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUserDataInEvent(eventName: str) -> bool
```

- eventName: str，引擎事件名。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 这样调用之后，ActorAcquiredItemClientEvent事件的itemDict参数会带有userData字段
comp.GetUserDataInEvent("ActorAcquiredItemClientEvent")
```

</TabItem>
</Tabs>

---

### LookupItemByName

<Server/> GameComponentServer

获取组件：`serverApi.GetEngineCompFactory().CreateGame(levelId)`

判定指定 identifier 的物品是否存在。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LookupItemByName(itemName: str) -> bool
```

- itemName: str，物品的 identifier。类似"minecraft:bed"，支持自定义物品。

**返回值**：bool，True 为对应的物品存在，False 为对应物品不存在。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
gameComp = serverApi.GetEngineCompFactory().CreateGame(levelId)
exist = gameComp.LookupItemByName("minecraft:bed")
```

</TabItem>
</Tabs>

---

### LookupItemsByItemTag

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(levelId)`

根据 netease_tags 中注册的物品 tag 名，查找该 tag 下所有物品，支持#引用的标签自动展开；同一 tag 名被多个模组注册时自动合并去重；未注册的原版 tag 可直接查询。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LookupItemsByItemTag(itemTag: str) -> List[Dict[str, Any]]
```

- itemTag: str，物品 tag 名，如 common:apple。

**返回值**：List[Dict[str, Any]]，物品字典列表，dict 包含 itemName 键。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(levelId)
comp.LookupItemsByItemTag("common:apple")
```

</TabItem>
</Tabs>

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

根据 netease_tags 中注册的物品 tag 名，查找该 tag 下所有物品，支持#引用的标签自动展开；同一 tag 名被多个模组注册时自动合并去重；未注册的原版 tag 可直接查询。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
LookupItemsByItemTag(itemTag: str) -> List[Dict[str, Any]]
```

- itemTag: str，物品 tag 名，如 common:apple。

**返回值**：List[Dict[str, Any]]，物品字典列表，dict 包含 itemName 键。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
comp.LookupItemsByItemTag("common:apple")
```

</TabItem>
</Tabs>

---

### RemoveItemLayer

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

移除物品的叠加贴图。物品叠加贴图详见 [SetItemLayer](/docs/docs/scripts/modapi/item#setitemlayer)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveItemLayer(itemDict: Dict[str, Any], layer: int) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- layer: int，贴图的层级。可以为-2，-1，1，2，3。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = comp.GetPlayerItem(serverApi.GetMinecraftEnum().ItemPosType.CARRIED, 0, True)
success = comp.RemoveItemLayer(itemDict, 1)
if success:
    comp.SpawnItemToPlayerCarried(itemDict, playerId)
```

</TabItem>
</Tabs>

---

### SetAttackDamage

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置物品的攻击伤害值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAttackDamage(itemDict: Dict[str, Any], attackDamage: int) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- attackDamage: int，攻击伤害值。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = comp.GetPlayerItem(serverApi.GetMinecraftEnum().ItemPosType.CARRIED, 0, True)
success = comp.SetAttackDamage(itemDict, 5)
if success:
    comp.SpawnItemToPlayerCarried(itemDict, playerId)
```

</TabItem>
</Tabs>

---

### SetBindBoneForBindItem

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

改变实体上已绑定的物品附着物所绑定的骨骼，又或者移除该物品附着物。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBindBoneForBindItem(entityId: str, itemModelId: int, boneName: str, isClientEntity: bool = False) -> bool
```

- entityId: str，需要设置的实体的 id。
- itemModelId: int，需要设置的物品模型 id。
- boneName: str，需要挂接到的骨骼名称(不区分大小写)。如果传入空字符串，则移除该物品附着物。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。

**返回值**：bool，操作成功后返回 True。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头部绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToMinecraftModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
# 使这个苹果绑定到手部
comp.SetBindBoneForBindItem(player_id, itemModelId, "rightarm")
# 移除这个苹果
comp.SetBindBoneForBindItem(player_id, itemModelId, "")
```

</TabItem>
</Tabs>

---

### SetBindItemOffset

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

设置实体上的物品附着物相对骨骼的位置偏移。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBindItemOffset(
    entityId: str,
    itemModelId: int,
    offset: Tuple[float, float, float],
    isClientEntity: bool = False,
) -> bool
```

- entityId: str，需要设置的实体的 id。
- itemModelId: int，需要设置的物品模型 id。
- offset: Tuple[float, float, float]，需要设置物品的位置偏移。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。

**返回值**：bool，设置是否成功，成功返回 True。

**备注**

- 1.物品的偏移方向是相对于骨骼的，因此对于不同的骨骼，其偏移方向可能不同。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头部绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToMinecraftModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
# 使这个苹果往y方向偏移0.5个单位
comp.SetBindItemOffset(player_id, itemModelId, (0, 0.5, 0))
```

</TabItem>
</Tabs>

---

### SetBindItemRotation

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

设置实体上的物品附着物相对骨骼的旋转角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBindItemRotation(
    entityId: str,
    itemModelId: int,
    rotation: Tuple[float, float, float],
    isClientEntity: bool = False,
) -> bool
```

- entityId: str，需要设置的实体的 id。
- itemModelId: int，需要设置的物品模型 id。
- rotation: Tuple[float, float, float]，需要设置物品的三维旋转(单位为度，按照 ZYX 顺序旋转)。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。

**返回值**：bool，设置是否成功，成功返回 True。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头部绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToMinecraftModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
# 使这个苹果绕y轴旋转90度
comp.SetBindItemRotation(player_id, itemModelId, (0, 90, 0))
```

</TabItem>
</Tabs>

---

### SetBindItemScale

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(levelId)`

设置实体上的物品附着物的缩放比例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBindItemScale(entityId: str, itemModelId: int, scale: float, isClientEntity: bool = False) -> bool
```

- entityId: str，需要设置的实体的 id。
- itemModelId: int，需要设置的物品模型 id。
- scale: float，绑定物品的缩放比例。
- isClientEntity: bool，是否是客户端实体。如果实体是由 [CreateClientEntityByTypeStr](/docs/docs/scripts/modapi/world/entity#createcliententitybytypestr) 接口创建的客户端实体,则需要传入 True.默认为 False。

**返回值**：bool，设置是否成功，成功返回 True。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(levelId)
# 在玩家的头部绑定一个附魔的金苹果
# 物品信息字典主要需要以下4个字段
itemDict = {
   "newItemName" : "minecraft:apple",     # 物品的identifier
   "newAuxValue" : 0,                     # 物品的auxvalue
   "isEnchanted" : True,                  # 是否附魔
   "userData":{}                          # 物品的userData，用于旗帜等物品
}
player_id = clientApi.GetLocalPlayerId()
itemModelId = comp.BindItemToMinecraftModel(player_id, itemDict, "head", False, (0,0,0), (0,0,0), 1.0)
print("Successfully bind item with id:", itemModelId)
# 使这个苹果变大1.5倍
comp.SetBindItemScale(player_id, itemModelId, 1.5)
```

</TabItem>
</Tabs>

---

### SetCompassEntity

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(playerId)`

设置指南针朝向的实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCompassEntity(entityId: str) -> bool
```

- entityId: str，实体 id。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(playerId)
comp.SetCompassEntity(entityId)
```

</TabItem>
</Tabs>

---

### SetCompassTarget

<Client/> ItemCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateItem(playerId)`

设置指南针的朝向位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCompassTarget(x: int, y: int, z: int) -> bool
```

- x: int，方块 x 坐标。
- y: int，方块 y 坐标。
- z: int，方块 z 坐标。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateItem(playerId)
comp.SetCompassTarget(x,y,z)
```

</TabItem>
</Tabs>

---

### SetCustomName

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置物品的自定义名称，与使用铁砧重命名一致。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCustomName(itemDict: Dict[str, Any], name: str) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- name: str，物品名称。支持 unicode。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = comp.GetPlayerItem(serverApi.GetMinecraftEnum().ItemPosType.CARRIED, 0, True)
comp.SetCustomName(itemDict, '史蒂夫')
comp.SpawnItemToPlayerCarried(itemDict, playerId)
```

</TabItem>
</Tabs>

---

### SetFishingLineColor

<Server/> FishingLineCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateFishingLine(playerId)`

设置钓鱼线的颜色，设置后会自动同步到所有客户端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFishingLineColor(itemName: str, color: Tuple[float, float, float]) -> bool
```

- itemName: str，鱼竿物品的完整名称，如 "minecraft:fishing_rod" 或自定义鱼竿名称。
- color: Tuple[float, float, float]，鱼线颜色 rgb，取值[0, 1]。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFishingLine(playerId)
comp.SetFishingLineColor("mymod:custom_fishing_rod", (1.0, 0.0, 0.0))
```

</TabItem>
</Tabs>

---

### SetFishingLineMax

<Server/> FishingLineCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateFishingLine(playerId)`

设置钓鱼线的最大长度（超过此长度会断线），设置后会自动同步到所有客户端。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFishingLineMax(itemName: str, maxLength: float = 32.0) -> bool
```

- itemName: str，鱼竿物品的完整名称，如 "minecraft:fishing_rod" 或自定义鱼竿名称。
- maxLength: float，最大长度，单位为格，钓鱼竿默认值为 32.0。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateFishingLine(playerId)
comp.SetFishingLineMax("mymod:custom_fishing_rod", 64.0)
```

</TabItem>
</Tabs>

---

### SetItemDefenceAngle

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置盾牌物品的抵挡角度范围。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetItemDefenceAngle(posType: int, slotPos: int, angleLeft: float, angleRight: float) -> bool
```

- posType: int，[ItemPosType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemPosType.html)。
- slotPos: int，槽位。
- angleLeft: float，左边的范围，不想设置左范围传 None,取值范围是[-180,180]。
- angleRight: float，右边的范围，不想设置右范围传 None,取值范围是[-180,180],且 angleLeft\<angleRight。

**返回值**：bool，是否设置成功。

**备注**

- 当设置的物品不是盾牌物品时，返回 False；原生盾牌会返回 True 但是仍然走原生的逻辑。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.SetItemDefenceAngle(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0, -60, 70)
```

</TabItem>
</Tabs>

---

### SetItemDurability

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置物品的耐久值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetItemDurability(posType: int, slotPos: int, durability: int) -> bool
```

- posType: int，[ItemPosType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemPosType.html)。
- slotPos: int，槽位，当 posType 为 ItemPosType.INVENTORY 或 ItemPosType.ARMOR 时才有意义。
- durability: int，耐久值。

**返回值**：bool，设置结果。

**备注**

- 在使用物品事件中调用这个接口时，建议使用 [AddTimer](/docs/docs/scripts/modapi/general/tool#addtimer) 延迟一下，不然接口设置可能会失效。
- 设置的耐久值超过物品的最大耐久值时，使用最大耐久值；最小耐久值为 0。
- posType 设置成 serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/general/tool#getminecraftenum)().ItemPosType.INVENTORY 时可以代替 SetInvItemDurability；posType 设置成 serverApi.[GetMinecraftEnum](/docs/docs/scripts/modapi/general/tool#getminecraftenum)().ItemPosType.ARMOR 时可以代替 SetEquItemDurability；

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.SetItemDurability(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0, 5)

#替代SetInvItemDurability的方法
comp.SetItemDurability(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0, 5)
#替代SetEquItemDurability的方法
comp.SetItemDurability(serverApi.GetMinecraftEnum().ItemPosType.ARMOR, 0, 5)
```

</TabItem>
</Tabs>

---

### SetItemLayer

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置物品的叠加贴图，可以在物品的上层与下层叠加自定义贴图。具体使用可参考 CustomItemsMod 示例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetItemLayer(itemDict: Dict[str, Any], layer: int, texture: str) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- layer: int，贴图的层级。可以为-2，-1，1，2，3。负数层级显示在物品下方，正数的层级显示在物品上方。层级大的显示在层级小的上方。
- texture: str，贴图的名字，对应 item_texture.json 中的 key。

**返回值**：bool，设置是否成功。

**备注**

- 如果需要在自定义 ui 中显示叠加贴图，需要在您的物品渲染控件下添加 top_layer_3，top_layer_2，top_layer_1，bottom_layer_1，bottom_layer_2 共 5 个图片控件，即可使用 [SetUiItem](/docs/docs/scripts/modapi/custom_ui/control#setuiitem) 显示叠加贴图。可参考 CustomFurnaceMod 示例。

```text
"customItemLayer@common.item_renderer_additional_layer": {
    "bindings": [
        {
            "binding_name": "#visible",
            "binding_condition": "always"
        },
        {
            "binding_name": "#uv",
            "binding_condition": "always_when_visible"
        },
        {
            "binding_name": "#uv_size",
            "binding_condition": "always_when_visible"
        },
        {
            "binding_name": "#texture",
            "binding_condition": "always_when_visible"
        }
    ]
},
"itemImg" : {
    "anchor_from" : "center",
    "anchor_to" : "center",
    "controls" : [
        {
            "top_layer_3@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": 3
            }
        },
        {
            "top_layer_2@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": 2
            }
        },
        {
            "top_layer_1@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": 1
            }
        },
        {
            "bottom_layer_1@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": -1
            }
        },
        {
            "bottom_layer_2@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": -2
            }
        },
        {
        "itemNum@neteaseCommonUI.itemNum" : {}
        }
    ],
    "layer" : 3,
    "offset" : [ 0, 0 ],
    "renderer" : "inventory_item_renderer",
    "size" : [ 24, 24 ],
    "type" : "custom",
    "visible" : true
}
```

- 需要为 5 层叠加贴图预留 ui 层级，让他可以显示在背包背景之上，物品数量之下。例如在 CustomFurnaceMod 示例中，itemBtn 中的 default/hover/pressed 贴图的层级为 2，物品渲染控件 itemImg 的层级为 5，五个叠加贴图的层级分别为 3/4/6/7/8，selectedImg 的层级为 9，itemNum 的层级为 10，durabilityBar 的层级为 11。

</TabItem>
<TabItem value="示例" label="示例">

```text
"customItemLayer@common.item_renderer_additional_layer": {
    "bindings": [
        {
            "binding_name": "#visible",
            "binding_condition": "always"
        },
        {
            "binding_name": "#uv",
            "binding_condition": "always_when_visible"
        },
        {
            "binding_name": "#uv_size",
            "binding_condition": "always_when_visible"
        },
        {
            "binding_name": "#texture",
            "binding_condition": "always_when_visible"
        }
    ]
},
"itemImg" : {
    "anchor_from" : "center",
    "anchor_to" : "center",
    "controls" : [
        {
            "top_layer_3@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": 3
            }
        },
        {
            "top_layer_2@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": 2
            }
        },
        {
            "top_layer_1@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": 1
            }
        },
        {
            "bottom_layer_1@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": -1
            }
        },
        {
            "bottom_layer_2@neteaseCommonUI.customItemLayer": {
                "$item_renderer_additional_layer_layer": -2
            }
        },
        {
        "itemNum@neteaseCommonUI.itemNum" : {}
        }
    ],
    "layer" : 3,
    "offset" : [ 0, 0 ],
    "renderer" : "inventory_item_renderer",
    "size" : [ 24, 24 ],
    "type" : "custom",
    "visible" : true
}
```

</TabItem>
</Tabs>

---

### SetItemMaxDurability

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置物品的最大耐久值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetItemMaxDurability(posType: int, slotPos: int, maxDurability: int, isUserData: bool) -> bool
```

- posType: int，[ItemPosType 枚举](https://mc.163.com/newdev/docs/api/meijuzhi/ItemPosType.html)。
- slotPos: int，槽位，当 posType 为 ItemPosType.INVENTORY 或 ItemPosType.ARMOR 时才有意义。
- maxDurability: int，最大耐久值，可设为 0~32767。
- isUserData: bool，如果为 True，则该设置只对指定物品生效，如果为 False，则对同一类所有物品生效。

**返回值**：bool，设置结果。

**备注**

- 若物品堆叠数量大于 1 时，耐久度的变更对整一叠的物品生效。并且耐久度为 0 后，每次消耗耐久度的行为会使数量减一。
- 为物品设置的 userData 最大耐久度在计算时优先级最高，userData 数据存盘。
- 在砂轮或背包合并时，若两个物品都有 userData，只会保留其中一个。在铁砧中修复时，最大耐久取被修复物品的耐久。
- 当最大耐久值被更改时，当前耐久度也会按比例修复。
- 对同一类所有物品设置的最大耐久度不存盘，每次重启世界都会重新初始化，可以通过对应 item json 的 minecraft:max_damage 组件设置初始化最大耐久度。
- 如果设置的是背包物品，当 slot 值为-1 时，设置左手物品的最大耐久值。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
comp.SetItemMaxDurability(serverApi.GetMinecraftEnum().ItemPosType.INVENTORY, 0, 5, False)
```

</TabItem>
</Tabs>

---

### SetItemTierLevel

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置工具类物品的挖掘等级。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetItemTierLevel(itemDict: Dict[str, Any], level: int) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- level: int，挖掘等级。

**返回值**：bool，设置是否成功。

**备注**

- 对于不总是可以破坏的方块（包括方块材质为 Stone，Metal，TopSnow，Snow，Web），需要使用不同挖掘等级（level）的工具才能破坏并产生掉落物。

| level | 类型 |
| --- | --- |
| 0 | 木 |
| 1 | 石 |
| 2 | 铁 |
| 3 | 钻石 |
| 4 | 下界 |

- 剑和剪刀都可以对蜘蛛网进行破坏并产生掉落物；铲可以对雪和顶层雪进行破坏并产生掉落物；镐是否可以破坏判断：1）对于黑曜石、下界类方块、远古残骸，需要 Level 大于等于 3 的镐才能破坏并产生掉落物；2）对于钻石块、钻石矿石、绿宝石块、绿宝石矿石、金块、金矿石、红石矿石、发光的红石矿石，需要 Level 大于等于 2 的镐才能破坏并产生掉落物；3）对于铁块、铁矿石、青金石块、青金石矿石，需要 Level 大于等于 1 的镐才能破坏并产生掉落物；4）对于其他 Stone 和 Metal 材质的方块，需要 Level 大于等于 0 的镐才能破坏并产生掉落物。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = comp.GetPlayerItem(serverApi.GetMinecraftEnum().ItemPosType.CARRIED, 0, True)
success = comp.SetItemTierLevel(itemDict, 5)
if success:
    comp.SpawnItemToPlayerCarried(itemDict, playerId)
```

</TabItem>
</Tabs>

---

### SetItemTierSpeed

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置工具类物品的挖掘速度(可通过 userData 中的 ModTierSpeed 获取挖掘速度)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetItemTierSpeed(itemDict: Dict[str, Any], speed: float) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- speed: float，挖掘速度。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = comp.GetPlayerItem(serverApi.GetMinecraftEnum().ItemPosType.CARRIED, 0, True)
success = comp.SetItemTierSpeed(itemDict, 32)
if success:
    comp.SpawnItemToPlayerCarried(itemDict, playerId)
```

</TabItem>
</Tabs>

---

### SetMaxStackSize

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(playerId)`

设置物品的最大堆叠数量（存档）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMaxStackSize(itemDict: Dict[str, Any], maxStackSize: int) -> bool
```

- itemDict: Dict[str, Any]，[物品信息字典](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/10-jibengainian/1-wodeshijiejichugainian.html#物品信息字典#物品信息字典)。
- maxStackSize: int，最大堆叠数量，不能超过 64，如果该值小于物品的堆叠数量，会返回失败。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(playerId)
itemDict = comp.GetPlayerItem(serverApi.GetMinecraftEnum().ItemPosType.CARRIED, 0, True)
success = comp.SetMaxStackSize(itemDict, 32)
if success:
    comp.SpawnItemToPlayerCarried(itemDict, playerId)
```

</TabItem>
</Tabs>

---

### SetShearsDestroyBlockSpeed

<Server/> ItemCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateItem(entityId)`

设置剪刀对某一方块的破坏速度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetShearsDestroyBlockSpeed(blockName: str, speed: float) -> bool
```

- blockName: str，方块名称,包含命名空间。
- speed: float，破坏速度。

**返回值**：bool，设置是否成功。

**备注**

- 设置的速度最终会加上剪刀的附魔：效率计算。
- 原版剪刀对蜘蛛网的破坏速度为 15，羊毛的破坏速度为 5，也可以用该接口重写对这两个方块的破坏速度。
- 设置的速度必须大于 1，否则该接口返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateItem(entityId)
comp.SetShearsDestroyBlockSpeed("minecraft:obsidian", 100)
```

</TabItem>
</Tabs>

---
