---
sidebar_position: 5
---

# 配方表

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

收录配方表的相关信息。

你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

:::info[本文更新时间]

本文于 2026 年 1 月 5 日更新，中国版最新版本为 1.21.50，国际版最新版本为 1.21.130。

:::

---

<FileType type="folder" name="recipes"/>下的文件为配方文件。中国版配方宜放在<FileType type="folder" name="netease_recipes"/>中，其支持的接口和国际版完全一致，但在中国版实测在<FileType type="folder" name="recipes"/>下配方文件也可正常工作。允许嵌套文件夹以整理文件。

以下为文件<FileType type="folder" name="recipes"/> - <FileType type="file" name="(物品 ID).recipe.json"/>的结构，可以为以下 4 种配方中的一种：

<Tabs><TabItem value="工作台合成配方" label="工作台合成配方" default>

工作台合成配方分为有序配方（Shaped Recipes）和无序配方（Shapeless Recipes）。有序配方要求玩家必须按照特定的搭配方式摆放合成材料才能合成物品，而无序配方则仅要求有对应类型的合成材料即可。

<Tabs><TabItem value="有序配方" label="有序配方" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本。决定物品采用何种配方表的定义格式。
  - <DataType type="object" name="minecraft:recipe_shaped" isRequired/>：定义该配方为有序配方。
    - <DataType type="object" name="description" isRequired/>：该配方的描述。
      - <DataType type="string" name="identifier" isRequired/>：配方的 ID。
    - <DataType type="array" name="tags" isRequired/>：该配方适用于的工作方块标签。
      - <DataType type="string" isRequired/>：工作方块的标签。对于有序配方，最常见的为`crafting_table`（适用于工作台），也可以适用于自定义工作台。
    - <DataType type="array" name="unlock" isRequired/>：（1.20.0+ 格式版本必需）（中国版配方中，此参数非必需）该配方的解锁条件。满足规定的条件之一的时候解锁此配方。应至少带有一个解锁条件。
      - <DataType type="object"/>：解锁此配方所需的上下文条件。
        - <DataType type="string" name="context" isRequired/>：可选值为：`AlwaysUnlocked`（始终解锁此配方）、`PlayerInWater`（玩家入水）、`PlayerHasManyItems`（玩家物品栏超过 10 种物品）。
      - <DataType type="object"/>：解锁此配方所需的物品。
        - <DataType type="string" name="item" isRequired/>：物品 ID。
        - <DataType type="string" name="data"/>：物品数据值。默认值为`0`。
      - <DataType type="object"/>：解锁此配方所需的物品标签。
        - <DataType type="string" name="tag" isRequired/>：物品标签。见[物品标签](tags)。
    - <DataType type="array" name="pattern"/>：该物品的合成配方图案。一个合成配方由 1~3 行的物品排列构成（例如面包为 1 行，船为 2 行，钻石镐为 3 行），每行由至多 3 个特定的字符表示合成所需的对应的物品或物品类型，这些字符所代表的含义在`key`中指定。每行中如果留空格则代表此位置需要留空（可见下文的实例）。每行超过 3 个字符的部分会自动忽略。每行的字符数原则上应当相同。
      - <DataType type="string" name="0"/>：第 1 行的合成配方。
      - <DataType type="string" name="1"/>：第 2 行的合成配方。
      - <DataType type="string" name="2"/>：第 3 行的合成配方。
    - <DataType type="object" name="key"/>：在`pattern`中使用的字符所代表的物品信息。每种字符可定义为以下两种对象中的一种。注意：字符不能为空格（` `），因为空格代表空位。
      - <DataType type="object" name="(字符)"/>：`pattern`中的`(字符)`所代表的具体物品。
        - <DataType type="string" name="item" isRequired/>：物品 ID。
        - <DataType type="string" name="data"/>：物品数据值。默认值为`0`。
      - <DataType type="object" name="(字符)"/>：`pattern`中的`(字符)`所代表的特定类型的物品。
        - <DataType type="string" name="tag" isRequired/>：物品标签，见[物品标签](tags)。
    - <DataType type="object" name="result" isRequired/>：该配方所合成的物品。
      - <DataType type="string" name="item" isRequired/>：物品 ID。
      - <DataType type="string" name="count"/>：合成出的物品数量。默认值为`1`。
      - <DataType type="string" name="data"/>：物品数据值。默认值为`0`。
      - <DataType type="array" name="durability"/>：（仅中国版配方可用）合成出的物品的耐久度。
        - <DataType type="int" name="0"/>：耐久度的最低值。
        - <DataType type="int" name="1"/>：耐久度的最高值。
    - <DataType type="boolean" name="assume_symmetry"/>：定义一个配方如果镜像对称地放置，是否会产出相同的结果（例如锄头、斧头）。默认值为`true`。
    - <DataType type="int" name="priority"/>：在配方书中，显示此配方的优先级。数字越低，则优先级越高。

</treeview>

<details>

<summary>实例：钻石镐</summary>

```json title="recipes/diamond_pickaxe.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_shaped": {
        "description": {
            "identifier": "minecraft:diamond_pickaxe"
        },
        "tags": [
            "crafting_table"
        ],
        "pattern": [
            "XXX",
            " # ",
            " # "
        ],
        "key": {
            "#": {
                "item": "minecraft:stick"
            },
            "X": {
                "item": "minecraft:diamond"
            }
        },
        "unlock": [
            {
                "item": "minecraft:diamond"
            }
        ],
        "result": {
            "item": "minecraft:diamond_pickaxe"
        }
    }
}
```

</details>

<details>

<summary>实例：木桶（运用了物品标签）</summary>

在木桶的合成配方中，因为使用任意木板和木台阶均可，因此使用物品标签来笼统地代指所有这类物品。

```json title="recipes/barrel.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_shaped": {
        "description": {
            "identifier": "minecraft:barrel_with_planks"
        },
        "tags": [
            "crafting_table"
        ],
        "pattern": [
            "#-#",
            "# #",
            "#-#"
        ],
        "key": {
            "#": {
                "tag": "minecraft:planks"
            },
            "-": {
                "tag": "minecraft:wooden_slabs"
            }
        },
        "unlock": [
            {
                "tag": "minecraft:planks"
            },
            {
                "tag": "minecraft:wooden_slabs"
            }
        ],
        "result": {
            "item": "minecraft:barrel"
        },
        "priority": -1
    }
}
```

</details>

</TabItem><TabItem value="无序配方" label="无序配方">
<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本。决定物品采用何种配方表的定义格式。
  - <DataType type="object" name="minecraft:recipe_shapeless" isRequired/>：定义该配方为无序配方。
    - <DataType type="object" name="description" isRequired/>：该配方的描述。
      - <DataType type="string" name="identifier" isRequired/>：配方的 ID。
    - <DataType type="array" name="tags" isRequired/>：该配方适用于的工作方块标签。
      - <DataType type="string" isRequired/>：工作方块的标签。对于无序配方，最常见的为`crafting_table`（适用于工作台）、`stonecutter`（适用于切石机）、`cartography_table`（适用于制图台）、也可以适用于自定义工作台。
    - <DataType type="array" name="unlock" isRequired/>：（1.20.0+ 格式版本必需）该配方的解锁条件。满足规定的条件之一的时候解锁此配方。应至少带有一个解锁条件。
      - <DataType type="object"/>：解锁此配方所需的上下文条件。
        - <DataType type="string" name="context" isRequired/>：可选值为：`AlwaysUnlocked`（始终解锁此配方）、`PlayerInWater`（玩家入水）、`PlayerHasManyItems`（玩家物品栏超过 10 个物品）。
      - <DataType type="object"/>：解锁此配方所需的物品。
        - <DataType type="string" name="item" isRequired/>：物品 ID。
        - <DataType type="string" name="data"/>：物品数据值。默认值为`0`。
      - <DataType type="object"/>：解锁此配方所需的物品标签。
        - <DataType type="string" name="tag" isRequired/>：物品标签。见[物品标签](tags)。
    - <DataType type="array" name="ingredients"/>：该物品的合成配方所需的材料。
      - <DataType type="object"/>：该配方所需的的物品。
        - <DataType type="string" name="item" isRequired/>：物品 ID。
        - <DataType type="string" name="count"/>：所需的物品数量。数量应保持在`1`~`9`之间。默认值为`1`。
        - <DataType type="string" name="data"/>：所需的物品数据值。默认值为`0`。
    - <DataType type="object" name="result" isRequired/>：该配方所合成的物品。
      - <DataType type="string" name="item" isRequired/>：物品 ID。
      - <DataType type="string" name="count"/>：合成出的物品数量。默认值为`1`。
      - <DataType type="string" name="data"/>：物品数据值。默认值为`0`。
      - <DataType type="array" name="durability"/>：（仅中国版配方可用）合成出的物品的耐久度。
        - <DataType type="int" name="0"/>：耐久度的最低值。
        - <DataType type="int" name="1"/>：耐久度的最高值。
    - <DataType type="int" name="priority"/>：在配方书中，显示此配方的优先级。数字越低，则优先级越高。

</treeview>

<details>

<summary>实例：打火石</summary>

```json title="recipes/flint_and_steel.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_shapeless": {
        "description": {
            "identifier": "minecraft:flint_and_steel"
        },
        "tags": [
            "crafting_table"
        ],
        "ingredients": [
            {
                "item": "minecraft:iron_ingot"
            },
            {
                "item": "minecraft:flint"
            }
        ],
        "unlock": [
            {
                "item": "minecraft:flint"
            },
            {
                "item": "minecraft:obsidian"
            }
        ],
        "result": {
            "item": "minecraft:flint_and_steel"
        }
    }
}
```

</details>

<details>

<summary>实例：安山岩楼梯（切石机配方）</summary>

注意：因为切石机只有一个槽位，所以合成材料应有且只有一个物品。

```json title="recipes/stonecutter_andesite_stairs.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_shapeless": {
        "description": {
            "identifier": "minecraft:stonecutter_andesite_stairs"
        },
        "tags": [
            "stonecutter"
        ],
        "priority": 1,
        "ingredients": [
            {
                "item": "minecraft:andesite"
            }
        ],
        "unlock": [
            {
                "item": "minecraft:andesite"
            }
        ],
        "result": {
            "item": "minecraft:andesite_stairs",
            "data": 0,
            "count": 1
        }
    }
}
```

</details>

</TabItem></Tabs>

</TabItem><TabItem value="熔炉烧炼配方" label="熔炉烧炼配方">

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本。决定物品采用何种配方表的定义格式。
  - <DataType type="object" name="minecraft:recipe_furnace" isRequired/>：定义该配方为烧炼配方。
    - <DataType type="object" name="description" isRequired/>：该配方的描述。
      - <DataType type="string" name="identifier" isRequired/>：配方的 ID。
    - <DataType type="array" name="tags" isRequired/>：该配方适用于的工作方块标签。
      - <DataType type="string" isRequired/>：工作方块的标签。对于烧炼配方，可选值为`furnace`（适用于熔炉）、`blast_furnace`（适用于高炉）、`smoker`（适用于烟熏炉）、`campfire`（适用于营火）、`soul_campfire`（适用于灵魂营火）。
    - <DataType type="array" name="unlock" isRequired/>：（1.20.0+ 格式版本必需）该配方的解锁条件。满足规定的条件之一的时候解锁此配方。应至少带有一个解锁条件。
      - <DataType type="object"/>：解锁此配方所需的上下文条件。
        - <DataType type="string" name="context" isRequired/>：可选值为：`AlwaysUnlocked`（始终解锁此配方）、`PlayerInWater`（玩家入水）、`PlayerHasManyItems`（玩家物品栏超过 10 个物品）。
      - <DataType type="object"/>：解锁此配方所需的物品。
        - <DataType type="string" name="item" isRequired/>：物品 ID。
        - <DataType type="string" name="data"/>：物品数据值。默认值为`0`。
      - <DataType type="object"/>：解锁此配方所需的物品标签。
        - <DataType type="string" name="tag" isRequired/>：物品标签。见[物品标签](tags)。
    - <DataType type="string"/><DataType type="object" name="input" isRequired/>：该烧炼配方所需的物品 ID。可以使用`(namespace):(id):(aux id)`的方法声明其数据值，也可以采用以下的对象型额外声明其数据值：
      - <DataType type="string" name="item" isRequired/>：物品 ID。
      - <DataType type="string" name="data"/>：所需的物品数据值。默认值为`0`。
    - <DataType type="string"/><DataType type="object" name="output" isRequired/>：该烧炼配方所输出的物品 ID。可以使用`(namespace):(id):(aux id)`的方法声明其数据值，也可以采用以下的对象型额外声明其数据值和数量：
      - <DataType type="string" name="item" isRequired/>：物品 ID。
      - <DataType type="string" name="count"/>：合成出的物品数量。默认值为`1`。
      - <DataType type="string" name="data"/>：物品数据值。默认值为`0`。

</treeview>

注意：原则上，一切烧炼配方都应适用于熔炉，矿物类在适用于熔炉的同时适用高炉，而食物类在适用于熔炉的同时适用于烟熏炉营火和灵魂营火。

<details>

<summary>实例：干海带</summary>

```json title="recipes/furnace_kelp.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_furnace": {
        "description": {
            "identifier": "minecraft:furnace_kelp"
        },
        "unlock": [
            {
                "item": "minecraft:kelp"
            }
        ],
        "tags": [
            "furnace",
            "smoker",
            "campfire",
            "soul_campfire"
        ],
        "input": "minecraft:kelp",
        "output": "minecraft:dried_kelp"
    }
}
```

</details>

<details>

<summary>实例：仙人掌绿（带有数据值的写法）</summary>

```json title="recipes/furnace_cactus.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_furnace": {
        "description": {
            "identifier": "minecraft:furnace_cactus"
        },
        "unlock": [
            {
                "item": "minecraft:cactus"
            }
        ],
        "tags": [
            "furnace"
        ],
        "input": "minecraft:cactus",
        "output": "minecraft:dye:2"
    }
}
```

</details>

</TabItem><TabItem value="酿造台酿造配方" label="酿造台酿造配方">

酿造台酿造配方分为换容配方（Potion Brewing Container Recipes）和混合配方（Potion Brewing Mix Recipes）。换容配方会更改药水的容器形式（例如从普通药水变成喷溅型或滞留型药水），混合配方则更改药水的药效，就像原材料混入药水中混合过一样。

<Tabs><TabItem value="换容配方" label="换容配方" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本。决定物品采用何种配方表的定义格式。
  - <DataType type="object" name="minecraft:recipe_brewing_container" isRequired/>：定义该配方为换容配方。
    - <DataType type="object" name="description" isRequired/>：该配方的描述。
      - <DataType type="string" name="identifier" isRequired/>：配方的 ID。
    - <DataType type="array" name="tags" isRequired/>：该配方适用于的工作方块标签。
      - <DataType type="string" isRequired/>：工作方块的标签。对于换容配方，可选值为`brewing_stand`（适用于酿造台）。
    - <DataType type="string" name="input" isRequired/>：该换容配方所需的药水物品 ID。
    - <DataType type="string" name="reagent" isRequired/>：该换容配方所需的试剂物品 ID。
    - <DataType type="string" name="output" isRequired/>：该换容配方所输出的药水物品 ID。

</treeview>

<details>

<summary>实例：喷溅型药水</summary>

```json title="recipes/brew_potion_sulphur.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_brewing_container": {
        "description": {
            "identifier": "minecraft:brew_potion_sulphur"
        },
        "tags": [
            "brewing_stand"
        ],
        "input": "minecraft:potion",
        "reagent": "minecraft:gunpowder",
        "output": "minecraft:splash_potion"
    }
}
```

</details>

</TabItem><TabItem value="混合配方" label="混合配方">

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本。决定物品采用何种配方表的定义格式。
  - <DataType type="object" name="minecraft:recipe_brewing_mix" isRequired/>：定义该配方为混合配方。
    - <DataType type="object" name="description" isRequired/>：该配方的描述。
      - <DataType type="string" name="identifier" isRequired/>：配方的 ID。
    - <DataType type="array" name="tags" isRequired/>：该配方适用于的工作方块标签。
      - <DataType type="string" isRequired/>：工作方块的标签。对于混合配方，可选值为`brewing_stand`（适用于酿造台）。
    - <DataType type="string" name="input" isRequired/>：该混合配方所需的药水 ID。可选值见下文。
    - <DataType type="string" name="reagent" isRequired/>：该混合配方所需的试剂物品 ID。
    - <DataType type="string" name="output" isRequired/>：该混合配方所输出的药水 ID。可选值见下文。

</treeview>

对于上文的<DataType type="string" name="input" isRequired/>和<DataType type="string" name="output" isRequired/>，可填写的内容为`minecraft:potion_type:(药效)`，药效的可用值如下表所示：

| | 默认 | 延长版药水 | 增强版药水 |
| --- | --- | --- | --- |
| 普通药水 | `water` | —— | —— |
| 粗制的药水 | `awkward` | —— | —— |
| 平凡的药水 | `mundane` | —— | —— |
| 浓稠的药水 | `thick` | —— | —— |
| 治疗药水 | `healing` | —— | `strong_healing` |
| 抗火药水 | `fire_resistance` | `long_fire_resistance` | —— |
| 再生药水 | `regeneration` | `long_regeneration` | `strong_regeneration` |
| 力量药水 | `strength` | `long_strength` | `strong_strength` |
| 迅捷药水 | `swiftness` | `long_swiftness` | `strong_swiftness` |
| 夜视药水 | `nightvision` | `long_nightvision` | —— |
| 隐身药水 | `invisibility` | `long_invisibility` | —— |
| 水肺药水 | `water_breathing` | `long_water_breathing` | —— |
| 跳跃药水 | `leaping` | `long_leaping` | `strong_leaping` |
| 缓降药水 | `slow_falling` | `long_slow_falling` | —— |
| 剧毒药水 | `poison` | `long_poison` | `strong_poison` |
| 虚弱药水 | `weakness` | `long_weakness` | —— |
| 伤害药水 | `harming` | —— | `strong_harming` |
| 迟缓药水 | `slowness` | `long_slowness` | `strong_slowness` |
| 蓄风药水 | `wind_charged` | —— | —— |
| 渗浆药水 | `oozing` | —— | —— |
| 盘丝药水 | `weaving` | —— | —— |
| 虫蚀药水 | `infested` | —— | —— |
| 神龟药水 | `turtle_master` | `long_turtle_master` | `strong_turtle_master` |
| 衰变药水 | `wither` | —— | —— |

<details>

<summary>实例：治疗药水</summary>

```json title="recipes/brew_awkward_speckled_melon.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_brewing_mix": {
        "description": {
            "identifier": "minecraft:brew_water_breathing_speckled_melon"
        },
        "tags": [
            "brewing_stand"
        ],
        "input": "minecraft:potion_type:awkward",
        "reagent": "minecraft:speckled_melon",
        "output": "minecraft:potion_type:healing"
    }
}
```

</details>

</TabItem></Tabs>

</TabItem><TabItem value="锻造台锻造配方" label="锻造台锻造配方">

锻造台锻造配方分为升级配方（Smithing Transform Recipes）和纹饰配方（Smithing Trim Recipes）。升级配方类似于下界合金升级，会将一个物品通过模板转换为另一个物品；而纹饰配方则类似于其他纹饰模板，为一个物品（专指盔甲类物品）添加纹饰。

<Tabs><TabItem value="升级配方" label="升级配方">

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本。决定物品采用何种配方表的定义格式。
  - <DataType type="object" name="minecraft:recipe_smithing_transform" isRequired/>：定义该配方为升级配方。
    - <DataType type="object" name="description" isRequired/>：该配方的描述。
      - <DataType type="string" name="identifier" isRequired/>：配方的 ID。
    - <DataType type="array" name="tags" isRequired/>：该配方适用于的工作方块标签。
      - <DataType type="string" isRequired/>：工作方块的标签。对于升级配方，可选值为`smithing_table`（适用于锻造台）。
    - <DataType type="string" name="template" isRequired/>：（中国版配方中，此参数非必需）该升级配方所需的模板物品 ID。该物品必须拥有标签`minecraft:transform_templates`（参见[物品组件`minecraft:tags`](components#minecrafttags)）。
    - <DataType type="string" name="base" isRequired/>：该升级配方所需的基底物品 ID。该物品必须为工具或盔甲，并且拥有标签`minecraft:transformable_items`（参见[物品组件`minecraft:tags`](components#minecrafttags)）。
    - <DataType type="string" name="addition" isRequired/>：该升级配方所需的转换物品 ID。目前，只支持指定为下界合金锭（`netherite_ingot`）。
    - <DataType type="string" name="result" isRequired/>：该升级配方所输出的物品 ID。输出的物品将继承基底物品 ID 的物品属性（例如附魔等）。

</treeview>

<details>

<summary>实例：下界合金剑</summary>

```json title="recipes/smithing_netherite_sword.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_smithing_transform": {
        "description": {
            "identifier": "minecraft:smithing_netherite_sword"
        },
        "tags": [
            "smithing_table"
        ],
        "template": "minecraft:netherite_upgrade_smithing_template",
        "base": "minecraft:diamond_sword",
        "addition": "minecraft:netherite_ingot",
        "result": "minecraft:netherite_sword"
    }
}
```

</details>

</TabItem><TabItem value="纹饰配方" label="纹饰配方">

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本。决定物品采用何种配方表的定义格式。
  - <DataType type="object" name="minecraft:recipe_smithing_trim" isRequired/>：定义该配方为纹饰配方。
    - <DataType type="object" name="description" isRequired/>：该配方的描述。
      - <DataType type="string" name="identifier" isRequired/>：配方的 ID。
    - <DataType type="array" name="tags" isRequired/>：该配方适用于的工作方块标签。
      - <DataType type="string" isRequired/>：工作方块的标签。对于纹饰配方，可选值为`smithing_table`（适用于锻造台）。
    - <DataType type="string" name="template" isRequired/>：该纹饰配方所需的模板物品 ID。该物品必须拥有标签`minecraft:trim_templates`（参见[物品组件`minecraft:tags`](components#minecrafttags)）。
    - <DataType type="string" name="base" isRequired/>：该纹饰配方所需的基底物品 ID。该物品必须为工具或盔甲，并且拥有标签`minecraft:trimable_armors`（参见[物品组件`minecraft:tags`](components#minecrafttags)）。
    - <DataType type="string" name="addition" isRequired/>：该纹饰配方所需的纹饰物品 ID。该物品必须拥有标签`minecraft:trim_materials`（参见[物品组件`minecraft:tags`](components#minecrafttags)）。

</treeview>

<details>

<summary>实例：纹饰盔甲</summary>

备注：从这个配方表可以看出，纹饰盔甲的配方表是没有什么修改空间的。

```json title="recipes/smithing_armor_trim.json" showLineNumbers
{
    "format_version": "1.20.10",
    "minecraft:recipe_smithing_trim": {
        "description": {
            "identifier": "minecraft:smithing_armor_trim"
        },
        "tags": [
            "smithing_table"
        ],
        "template": {
            "tag": "minecraft:trim_templates"
        },
        "base": {
            "tag": "minecraft:trimmable_armors"
        },
        "addition": {
            "tag": "minecraft:trim_materials"
        }
    }
}
```

</details>

</TabItem></Tabs>

</TabItem></Tabs>

---

## 参考文档

- [配方简介 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/RecipeIntroduction?view=minecraft-bedrock-stable)
- [配方文档 - 有序配方 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/minecraftrecipe_shaped?view=minecraft-bedrock-stable)
- [配方文档 - 无序配方 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/minecraftrecipe_shapeless?view=minecraft-bedrock-stable)
- [配方文档 - 熔炉配方 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/minecraftrecipe_furnace?view=minecraft-bedrock-stable)
- [配方文档 - 换容酿造配方 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/minecraftrecipe_potionbrewing?view=minecraft-bedrock-stable)
- [配方文档 - 混合酿造配方 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/minecraftrecipe_potionbrewingmix?view=minecraft-bedrock-stable)
- [配方文档 - 锻造升级配方 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/minecraftrecipe_smithingtransform?view=minecraft-bedrock-stable)
- [配方文档 - 锻造纹饰配方 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/minecraftrecipe_smithingtrim?view=minecraft-bedrock-stable)
- [配方 | Bedrock Wiki](https://wiki.bedrock.dev/loot/recipes)
- [自定义配方 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/5-%E8%87%AA%E5%AE%9A%E4%B9%89%E9%85%8D%E6%96%B9.html?catalog=1)
- [配方书 | 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E9%85%8D%E6%96%B9%E4%B9%A6)
- [药水酿造 | 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E8%8D%AF%E6%B0%B4%E9%85%BF%E9%80%A0)
