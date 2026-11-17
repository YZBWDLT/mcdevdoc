---
sidebar_position: 5
---

# 配方

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录配方相关的接口，共 7 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/shijie/peifang.html"/>

---

### AddBrewingRecipes

<Server/> RecipeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())`

添加酿造台配方的接口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddBrewingRecipes(
    brewType: str,
    inputName: str,
    reagentName: str,
    outputName: str,
) -> bool
```

- brewType: str，recipe_brewing_mix 或者 recipe_brewing_container，recipe_brewing_mix 代表混合酿造配方，recipe_brewing_container 代表换容酿造配方。
- inputName: str，该配方接受的物品。
- reagentName: str，酿造所需要的额外物品。
- outputName: str，该配方输出的物品。

**返回值**：bool，是否设置成功。

**备注**

- 输出的物品无法和原来的物品堆叠一起。
- 对于已有的配方会返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())
print(comp.AddBrewingRecipes("recipe_brewing_container", "minecraft:potion", "minecraft:gunpowder", "minecraft:splash_potion"))
```

</TabItem>
</Tabs>

---

### AddRecipe

<Server/> RecipeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())`

动态注册配方，支持配方类型详见[[配方类型说明]](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/5-zidingyipeifang.html#配方类型说明)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddRecipe(rcp: Union[str, Dict[str, Any]]) -> bool
```

- rcp: Union[str, Dict[str, Any]]，配方 json 数据或者配方字典。

**返回值**：bool，是否成功。

**备注**

- 注意，按照基岩版 1.20 的酿造台特性，每个药水槽内一次只能放进一个物品，无法一次放入两个及以上的数量的物品。目前该接口无法在联机大厅生效，后续会修复。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())
dictData = {
"minecraft:recipe_brewing_container": {
    "description": {
    "identifier": "netease:splash_to_normal"
    },
    "tags": ["brewing_stand"],
    "input": "minecraft:splash_potion",
    "reagent": "minecraft:apple",
    "output": "minecraft:potion"
}
}

jsonData = '{
"minecraft:recipe_furnace": {
    "description": {
    "identifier": "netease:diamond_to_apple"
    },
    "tags": ["furnace"],
    "input": {
    "item": "minecraft:diamond",
    "count": 1
    },
    "output": {
    "item": "minecraft:apple"
    }
}
}'
print "dictionary data:", comp.AddRecipe(dictData)
print "json str data:", comp.AddRecipe(jsonData)
```

</TabItem>
</Tabs>

---

### GetRecipeByRecipeId

<Server/> RecipeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())`

根据配方 id 查询配方内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRecipeByRecipeId(recipeId: str, tag: str) -> Dict[str, Any]
```

- recipeId: str，配方 id,对应配方 json 文件中的 identifier 字段。
- tag: str，对应配方 json 中的 tags 字段里面的值，默认值为工作台配方"crafting_table"。

**返回值**：Dict[str, Any]，返回配方详细内容，不同类型的配方格式不一样。

**备注**

- 目前仅支持工作台、自定义工作台、制图台、切石机的配方；不支持熔炉、酿药台等其他配方。
- 详细的 resultDict 建议打印日志来观察，有序配方和无序配方格式是不同的。
- 在基岩版 1.20 更新后，配方里的部分物品不再是对应单一物品，而是对应某种类型的物品。即'item‘字段所对应的物品有可能是列表类型(list)，也可能为字符串类型(str)。如果是字符串类型，则为这个物品的 identifier，如果为列表类型，则包含了符合同种类型的所有物品的 identifier。例如，木板类型的物品，’item'则会返回包含'minecraft:mangrove_planks', 'minecraft:planks', 'minecraft:warped_planks'等木板在内的列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())
comp.GetRecipeByRecipeId("minecraft:WorkBench_recipeId", "crafting_table")
```

</TabItem>
</Tabs>

<Client/> RecipeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateRecipe(clientApi.GetLevelId())`

根据配方 id 查询配方内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRecipeByRecipeId(recipeId: str, tag: str) -> Dict[str, Any]
```

- recipeId: str，配方 id,对应配方 json 文件中的 identifier 字段。
- tag: str，对应配方 json 中的 tags 字段里面的值，默认值为工作台配方"crafting_table"。

**返回值**：Dict[str, Any]，返回配方详细内容，不同类型的配方格式不一样。

**备注**

- 目前仅支持工作台、自定义工作台、制图台、切石机的配方；不支持熔炉、酿药台等其他配方。
- 详细的 resultDict 建议打印日志来观察，有序配方和无序配方格式是不同的。
- 在基岩版 1.20 更新后，配方里的部分物品不再是对应单一物品，而是对应某种类型的物品。即'item‘字段所对应的物品有可能是列表类型(list)，也可能为字符串类型(str)。如果是字符串类型，则为这个物品的 identifier，如果为列表类型，则包含了符合同种类型的所有物品的 identifier。例如，木板类型的物品，’item'则会返回包含'minecraft:mangrove_planks', 'minecraft:planks', 'minecraft:warped_planks'等木板在内的列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateRecipe(clientApi.GetLevelId())
comp.GetRecipeByRecipeId("minecraft:WorkBench_recipeId", "crafting_table")
```

</TabItem>
</Tabs>

---

### GetRecipeResult

<Server/> RecipeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())`

根据配方 id 获取配方结果。仅支持合成配方。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRecipeResult(recipeId: str) -> List[Dict[str, Any]]
```

- recipeId: str，配方 id,对应配方 json 文件中的 identifier 字段。

**返回值**：List[Dict[str, Any]]，list 的元素 resultDict 字典见备注。

**备注**

- resultDict 字典内容如下。

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| fullItemName | str | 物品的 identifier |
| auxValue | int | 物品附加值 |
| num | int | 物品数目 |

- 在基岩版 1.20 更新后，配方里的部分物品不再是对应单一物品，而是对应某种类型的物品。即'item‘字段所对应的物品有可能是列表类型(list)，也可能为字符串类型(str)。如果是字符串类型，则为这个物品的 identifier，如果为列表类型，则包含了符合同种类型的所有物品的 identifier。例如，木板类型的物品，’item'则会返回包含'minecraft:mangrove_planks', 'minecraft:planks', 'minecraft:warped_planks'等木板在内的列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())
comp.GetRecipeResult("minecraft:boat")
```

</TabItem>
</Tabs>

---

### GetRecipesByInput

<Server/> RecipeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())`

通过输入物品查询配方。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRecipesByInput(
    inputIdentifier: str,
    tag: str,
    aux: int = 0,
    maxResultNum: int = -1,
) -> List[Dict[str, Any]]
```

- inputIdentifier: str，输入物品的标识符。
- tag: str，对应配方 json 中的 tags 字段里面的值。
- aux: int，输入物品的附加值, 不传参的话默认为 0。
- maxResultNum: int，最大输出条目数，若大于等于 0 时，结果超过 maxResultNum，则只返回 maxResultNum 条。默认-1，表示返回全部。

**返回值**：List[Dict[str, Any]]，返回符合条件的配方列表。

**备注**

- 获取熔炉配方时，若输出物品数量为 1 时，output 使用字符串表示物品 identifier 及附加值；若输出物品数量大于 1 时，output 为一个 dict。
- 在获取酿造台配方时，不匹配 tag 标签与 aux 值，药水的 identifier 需要输入全称，例如：minecraft:potion_type:long_turtle_master，否则无法获取正确的配方。
- 需要遍历较多数据，不建议频繁调用。
- 在基岩版 1.20 更新后，配方里的部分物品不再是对应单一物品，而是对应某种类型的物品。即'item‘字段所对应的物品有可能是列表类型(list)，也可能为字符串类型(str)。如果是字符串类型，则为这个物品的 identifier，如果为列表类型，则包含了符合同种类型的所有物品的 identifier。例如，木板类型的物品，’item'则会返回包含'minecraft:mangrove_planks', 'minecraft:planks', 'minecraft:warped_planks'等木板在内的列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())
print(comp.GetRecipesByInput("minecraft:log", "crafting_table", 0, -1))
```

</TabItem>
</Tabs>

<Client/> RecipeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateRecipe(clientApi.GetLevelId())`

通过输入物品查询配方。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRecipesByInput(
    inputIdentifier: str,
    tag: str,
    aux: int = 0,
    maxResultNum: int = -1,
) -> List[Dict[str, Any]]
```

- inputIdentifier: str，输入物品的标识符。
- tag: str，对应配方 json 中的 tags 字段里面的值。
- aux: int，输出物品的附加值, 不传参的话默认为 0。
- maxResultNum: int，最大输出条目数，若大于等于 0 时，结果超过 maxResultNum，则只返回 maxResultNum 条。默认-1，表示返回全部。

**返回值**：List[Dict[str, Any]]，返回符合条件的配方列表。

**备注**

- 获取熔炉配方时，若输出物品数量为 1 时，output 使用字符串表示物品 identifier 及附加值；若输出物品数量大于 1 时，output 为一个 dict。
- 在获取酿造台配方时，不匹配 tag 标签与 aux 值，药水的 identifier 需要输入全称，例如：minecraft:potion_type:long_turtle_master，否则无法获取正确的配方。
- 需要遍历较多数据，不建议频繁调用。
- 在基岩版 1.20 更新后，配方里的部分物品不再是对应单一物品，而是对应某种类型的物品。即'item‘字段所对应的物品有可能是列表类型(list)，也可能为字符串类型(str)。如果是字符串类型，则为这个物品的 identifier，如果为列表类型，则包含了符合同种类型的所有物品的 identifier。例如，木板类型的物品，’item'则会返回包含'minecraft:mangrove_planks', 'minecraft:planks', 'minecraft:warped_planks'等木板在内的列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateRecipe(clientApi.GetLevelId())
print(comp.GetRecipesByInput("minecraft:log", "crafting_table", 0, -1))
```

</TabItem>
</Tabs>

---

### GetRecipesByResult

<Server/> RecipeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())`

通过输出物品查询配方所需要的输入材料。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRecipesByResult(
    resultIdentifier: str,
    tag: str,
    aux: int = 0,
    maxResultNum: int = -1,
) -> List[Dict[str, Any]]
```

- resultIdentifier: str，输出物品的标识符。
- tag: str，对应配方 json 中的 tags 字段里面的值。
- aux: int，输出物品的附加值, 不传参的话默认为 0。
- maxResultNum: int，最大输出条目数，若大于等于 0 时，结果超过 maxResultNum，则只返回 maxResultNum 条。默认-1，表示返回全部。

**返回值**：List[Dict[str, Any]]，返回符合条件的配方列表。

**备注**

- 获取熔炉配方时，若输出物品数量为 1 时，output 使用字符串表示物品 identifier 及附加值；若输出物品数量大于 1 时，output 为一个 dict。
- 在获取酿造台配方时，不匹配 tag 标签与 aux 值，药水的 identifier 需要输入全称，例如：minecraft:potion_type:long_turtle_master，否则无法获取正确的配方。
- 在基岩版 1.20 更新后，配方里的部分物品不再是对应单一物品，而是对应某种类型的物品。即'item‘字段所对应的物品有可能是列表类型(list)，也可能为字符串类型(str)。如果是字符串类型，则为这个物品的 identifier，如果为列表类型，则包含了符合同种类型的所有物品的 identifier。例如，木板类型的物品，’item'则会返回包含'minecraft:mangrove_planks', 'minecraft:planks', 'minecraft:warped_planks'等木板在内的列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())
print(comp.GetRecipesByResult("minecraft:boat", "crafting_table", 4, -1))
```

</TabItem>
</Tabs>

<Client/> RecipeCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateRecipe(clientApi.GetLevelId())`

通过输出物品查询配方所需要的输入材料。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRecipesByResult(
    resultIdentifier: str,
    tag: str,
    aux: int = 0,
    maxResultNum: int = -1,
) -> List[Dict[str, Any]]
```

- resultIdentifier: str，输出物品的标识符。
- tag: str，对应配方 json 中的 tags 字段里面的值。
- aux: int，输出物品的附加值, 不传参的话默认为 0。
- maxResultNum: int，最大输出条目数，若大于等于 0 时，结果超过 maxResultNum，则只返回 maxResultNum 条。默认-1，表示返回全部。

**返回值**：List[Dict[str, Any]]，返回符合条件的配方列表。

**备注**

- 获取熔炉配方时，若输出物品数量为 1 时，output 使用字符串表示物品 identifier 及附加值；若输出物品数量大于 1 时，output 为一个 dict。
- 在获取酿造台配方时，不匹配 tag 标签与 aux 值，药水的 identifier 需要输入全称，例如：minecraft:potion_type:long_turtle_master，否则无法获取正确的配方。
- 在基岩版 1.20 更新后，配方里的部分物品不再是对应单一物品，而是对应某种类型的物品。即'item‘字段所对应的物品有可能是列表类型(list)，也可能为字符串类型(str)。如果是字符串类型，则为这个物品的 identifier，如果为列表类型，则包含了符合同种类型的所有物品的 identifier。例如，木板类型的物品，’item'则会返回包含'minecraft:mangrove_planks', 'minecraft:planks', 'minecraft:warped_planks'等木板在内的列表。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateRecipe(clientApi.GetLevelId())
print(comp.GetRecipesByResult("minecraft:boat", "crafting_table", 4, -1))
```

</TabItem>
</Tabs>

---

### RemoveRecipe

<Server/> RecipeCompServer

获取组件：`serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())`

动态禁用配方。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveRecipe(rcpIdentifier: str, rcpTypeStr: str) -> bool
```

- rcpIdentifier: str，配方 identifier。
- rcpTypeStr: str，配方类型,省略前缀"minecraft"。详见[[配方类型说明]](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/15-zidingyiyouxineirong/5-zidingyipeifang.html#配方类型说明)。

**返回值**：bool，是否成功。

**备注**

- 目前动态移除配方接口不支持移除原生配方。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.server.extraServerApi as serverApi
comp = serverApi.GetEngineCompFactory().CreateRecipe(serverApi.GetLevelId())
comp.RemoveRecipe("netease:splash_to_normal", "recipe_brewing_container")
comp.RemoveRecipe("netease:diamond_to_apple", "recipe_furnace")
```

</TabItem>
</Tabs>

---
