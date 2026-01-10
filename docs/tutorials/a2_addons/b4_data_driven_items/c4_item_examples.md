---
sidebar_position: 4
---

# 4.4 常见的物品实例

> 上次更新：2026 年 1 月 10 日

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

上节，我们讲解了合成配方，并布置了一些练习题，要求读者做完，这节需要用到。什么？你还没做？快回去至少看一眼我们干了什么 >:)（[上一节习题的传送门](c3_recipes#练习)）

目前为止，我们的文件架构为

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
  - ...
  - <FileType type="folder" name="items" />：物品定义
    - <FileType type="folder" name="test" />
      - <FileType type="file" name="dough.item.json" />：面团
      - <FileType type="file" name="flour.item.json" />：面粉
      - <FileType type="file" name="ruby_axe.item.json" />：红宝石斧
      - <FileType type="file" name="ruby_boots.item.json" />：红宝石靴子
      - <FileType type="file" name="ruby_chestplate.item.json" />：红宝石胸甲
      - <FileType type="file" name="ruby_helmet.item.json" />：红宝石头盔
      - <FileType type="file" name="ruby_hoe.item.json" />：红宝石锄
      - <FileType type="file" name="ruby_leggings.item.json" />：红宝石护腿
      - <FileType type="file" name="ruby_pickaxe.item.json" />：红宝石镐
      - <FileType type="file" name="ruby_shovel.item.json" />：红宝石锹
      - <FileType type="file" name="ruby_sword.item.json" />：红宝石剑
      - <FileType type="file" name="ruby.item.json" />：红宝石
  - <FileType type="folder" name="recipes" />：配方表
    - <FileType type="folder" name="test" />
      - <FileType type="folder" name="crafting_table" />：工作台配方
        - ...
      - <FileType type="folder" name="furnace" />：熔炉配方
        - ...
- <FileType type="folder" name="RP_test" />：资源包
  - ...

</treeview>

但是，目前我们还没有为这些物品添加任何功能，只有个贴图和标签。现在，我们正式利用物品组件为物品添加功能！

目前来说，截止 1.21.130，国际版一共支持 46 个物品组件。我们不会再像模块 1 讲 60 多条命令那样详细讲解这 46 个组件了，只着重强调重点组件在这些重点实例中的应用。**从一开始我们就提过，读者应当养成良好的自学能力**，在学完本节之后，要大体了解一下这些物品组件的功能。（[全部物品组件的传送门](/docs/docs/items/components)）

---

## 食物

虽然生吃面团这件事有点恶心，但是好歹面团确实理论上是能吃的嘛。是的，我们现在要让面团成为食物！**遍览所有组件（请读者先去遍览一下，了解一下这些组件是做什么用的，注意看国际版组件，先不要看旧版组件和中国版组件，看完之后再回来看本页）（[全部物品组件的传送门](/docs/docs/items/components)）**，可以知道在食物中，需要的关键组件有：

- [`minecraft:food`](/docs/docs/items/components#minecraftfood)：定义物品为食物
- [`minecraft:use_modifiers`](/docs/docs/items/components#minecraftuse_modifiers)：定义物品的使用信息
- [`minecraft:use_animation`](/docs/docs/items/components#minecraftuse_animation)：定义物品的使用动画

其中，这些组件对应的文档我们已给出链接，读者可自行查阅，下文相同，我们不再赘述。按照文档所述，我们可以将面团继续定义为：

```json showLineNumbers title="dough.item.json" {15-24}
{
    "format_version": "1.21.50",
    "minecraft:item": {
        "description": {
            "identifier": "test:dough",
            "menu_category": {
                "category": "items"
            }
        },
        "components": {
            "minecraft:icon": "dough",
            "minecraft:tags": {
                "tags": [ "minecraft:is_food" ]
            },
            "minecraft:food": {
                "can_always_eat": true,
                "nutrition": 2,
                "saturation_modifier": 0.6
            },
            "minecraft:use_animation": "eat",
            "minecraft:use_modifiers": {
                "use_duration": 1.6,
                "movement_modifier": 0.35
            }
        }
    }
}
```

进入游戏试试看，这个面团就能吃下去了！

![food_1](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/food_1.png)

其中，第 15\~24 行就是我们新加的内容。我们来简单分析一下：

- `minecraft:food`组件定义了这个物品作为食物，里面的参数定义了此物品始终可以食用，回复的饥饿值为 2 点（也就是 1 个鸡腿），并回复 2.4 个饱和度（根据文档：回复饱和度的数量为饥饿值×饱和度系数×2）。定义了该组件之后，Minecraft 就会认为这是一种食物，玩家右键即可食用。
- `minecraft:use_modifiers`组件定义了这个物品的使用参数。这里，定义了使用时长为 1.6 秒，在使用时玩家的速度降为正常情况的 0.35 倍，这正是原版食物所使用的参数。
  - 注意，这个组件不是什么时候都能发挥作用的，必须带有其他特定组件的时候才能发挥作用，如果我们不定义食物组件，右键使用此物品也不会使玩家降速。反过来说，根据文档，食物组件又必须依赖这个组件才能发挥作用。有很多组件都是这样互相依赖的，我们在之后还会遇到。
- `minecraft:use_animation`组件则定义了这个物品的使用动画。这里，定义了使用动画为`eat`，这样我们在使用此物品时就会播放食用动画了。

看，我们一个小小的吃东西的动作，在代码上，也是拆分成了形形色色的小组件小功能，通过“食物+使用参数+使用动画”组成了这样一个大一点的功能，这些小功能也在各自发挥着自己的作用。

你可能会疑惑，那金苹果那种吃下就给予状态效果的情况，怎么没看到接口里有支持呢？其实只要看一下金苹果的定义文件就不难发现了：

```json showLineNumbers title="BP_vanilla/items/golden_apple.json" {2}
{
    "format_version": "1.10",
    "minecraft:item": {
        "description": {
            "identifier": "minecraft:golden_apple"
        },
        "components": {
            "minecraft:stacked_by_data": true,
            "minecraft:use_duration": 32,
            "minecraft:foil": false,
            "minecraft:food": {
                "nutrition": 4,
                "saturation_modifier": "supernatural",
                "can_always_eat": true,
                "effects": [
                    {
                        "name": "regeneration",
                        "chance": 1.0,
                        "duration": 5,
                        "amplifier": 1
                    },
                    {
                        "name": "absorption",
                        "chance": 1.0,
                        "duration": 120,
                        "amplifier": 0
                    }
                ]
            }
        }
    }
}
```

重点关注第 2 行，这里金苹果用的还是旧版的格式版本`1.10`。是的，旧版的组件反而支持附加状态效果！这也是我们下一节将要讨论的东西。当然，就现在的情况而言，微软其实是更推荐开发者使用更新的写法的，但这就需要脚本（ScriptAPI）的支持了。在我们目前还没有掌握脚本技术的情况下，要实现带状态效果的物品就只能使用旧版语法了。

## 剑

现在我们来看剑。典例是我们刚定义的红宝石剑，目前我们还没有给它以功能，各方面表现得都不太像剑。

**遍览所有组件（对，再去览一次看看可能用到什么）（[全部物品组件的传送门](/docs/docs/items/components)）**，这个可能用到的组件有点多，我们挑出来有以下几个组件可以用到：

- [`minecraft:durability`](/docs/docs/items/components#minecraftdurability)：定义物品的耐久度
- [`minecraft:max_stack_size`](/docs/docs/items/components#minecraftmax_stack_size)：定义物品的最大堆叠数（毕竟我们从来没见过一格 64 个剑的情况啊）
- [`minecraft:can_destroy_in_creative`](/docs/docs/items/components#minecraftcan_destroy_in_creative)：定义物品是否能在创造模式破坏方块
- [`minecraft:damage`](/docs/docs/items/components#minecraftdamage)：定义物品增加伤害
- [`minecraft:digger`](/docs/docs/items/components#minecraftdigger)：定义物品挖掘方块的速度
- [`minecraft:enchantable`](/docs/docs/items/components#minecraftenchantable)：定义物品可以附魔
- [`minecraft:hand_equipped`](/docs/docs/items/components#minecrafthand_equipped)：定义物品在手持时直立在手上
- [`minecraft:repairable`](/docs/docs/items/components#minecraftrepairable)：定义物品可以被修复

按照你的需求，也可能会用到其他组件。不过，我们先按照以上这几个组件的要求补全剑的功能吧！

```json showLineNumbers title="ruby_sword.item.json" {8,16-34}
{
    "format_version": "1.21.50",
    "minecraft:item": {
        "description": {
            "identifier": "test:ruby_sword",
            "menu_category": {
                "category": "equipment",
                "group": "itemGroup.name.sword"
            }
        },
        "components": {
            "minecraft:icon": "ruby_sword",
            "minecraft:tags": {
                "tags": [ "minecraft:is_sword" ]
            },
            "minecraft:durability": { "max_durability": 1500 },
            "minecraft:max_stack_size": 1,
            "minecraft:can_destroy_in_creative": false,
            "minecraft:damage": 7,
            "minecraft:digger": {
                "destroy_speeds": [
                    { "block": "minecraft:web", "speed": 15 },
                    { "block": "minecraft:bamboo", "speed": 30 },
                    { "block": "minecraft:bamboo_sapling", "speed": 30 }
                ],
                "use_efficiency": true
            },
            "minecraft:enchantable": { "slot": "sword", "value": 13 },
            "minecraft:hand_equipped": true,
            "minecraft:repairable": {
                "repair_items": [
                    { "items": [ "test:ruby" ], "repair_amount": 375 }
                ]
            }
        }
    }
}
```

好吧好吧，我承认，加的东西有点多了，不过效果很好啊！

![sword_1](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/sword_1.png)

加了这么多东西，当然要一一解释一下，不然你一定会头晕眼花的。

- 第 8 行的`"group": "itemGroup.name.sword"`，就是我们把它塞进剑分组里的诀窍。在 [4.2](c2_make_first_item#description物品描述)，我们曾经讲过在<DataType type="object" name="description" isRequired/>里面加一个<DataType type="string" name="group"/>就可以把物品放进分组。这里，我们就刚好把物品放到已有的剑的分组`itemGroup.name.sword`去了。
- 从第 16 行开始就都是新增的组件了。`minecraft:durability`组件规定了这个物品的耐久值有多少，我们定义了它会有 1500 的耐久值。
  - 然而，读者会发现使用此物品挖掘方块时，耐久度并不会降低。这是由耐久组件的特性引起的，它会检查右键的使用情况和对生物的攻击情况，并降低耐久。但是，遗憾的是，破坏方块并不在此列，所以我们必须使用脚本强行降低它的耐久度；
  - 除此之外，每次攻击生物都会使我们的物品降低 2 点耐久度，而原版的剑只会降低 1 点耐久度。所以，读者在运用此组件时应当注意这些问题。
- `minecraft:max_stack_size`组件规定这个物品一组只能为 1 个物品，简单易懂。
- `minecraft:can_destroy_in_creative`组件规定这个物品在创造模式下不能破坏方块。这和其他剑是一致的。
- `minecraft:damage`组件规定了这个物品增加多少伤害。我们在这里设定为了`7`，也就是和钻石剑一致。
- `minecraft:digger`组件规定了这个物品挖掘特定方块的加成。这里，我们设定了在挖掘蜘蛛网和竹子时分别有不同的速度加成，同时也把这个红宝石剑设定为了蜘蛛网的合适挖掘工具。
  - 根据[中文 Minecraft Wiki 关于剑的记载](https://zh.minecraft.wiki/w/%E5%89%91#%E6%8C%96%E6%8E%98%E5%B7%A5%E5%85%B7)，剑可以加速很多方块的挖掘。然而，`speed`参数并不能设定为浮点数，所以我们就只保留了竹子、竹笋和蜘蛛网这三个挖掘速度加成比较明显的数据。关于挖掘速度，读者可以参考[挖掘 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E6%8C%96%E6%8E%98#%E6%8C%96%E6%8E%98%E9%80%9F%E5%BA%A6)的内容。
- `minecraft:enchantable`组件规定了这个物品使用什么样的附魔。我们在这里设定此物品使用剑的附魔，同时设定了此物品的附魔能力。有关附魔能力，读者也可以参考[附魔 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/附魔（物品修饰）#附魔能力)，简单来说，这个值越高，在附魔台附出更好属性的可能性就更高。
- `minecraft:hand_equipped`组件规定了这个物品在手持时直立在手上，也就是如图所示的效果：
  ![sword_2](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/sword_2.png)
- `minecraft:repairable`组件规定了这个物品可以在铁砧中通过原材料修复。我们在这里设定为了红宝石，并且每次修复回复的耐久都是最大耐久值的 1/4（375 点耐久值）。

所以，这些就是我们的剑所用到的组件了！虽然用了很多组件，但好在这些组件相对来说都是很好理解的。除了耐久值问题之外，这把剑已经和原版的剑已经几乎一致了！至于这问题，我们将在讲到脚本时再介绍。

## 工具：以镐为例

类似地，现在我们来实现红宝石镐的功能。读者可以发现，镐和剑的功能是很类似的，所以剑的组件中，除了`minecraft:can_destroy_in_creative`之外都可用到：

- [`minecraft:durability`](/docs/docs/items/components#minecraftdurability)：定义物品的耐久度
- [`minecraft:max_stack_size`](/docs/docs/items/components#minecraftmax_stack_size)：定义物品的最大堆叠数
- [`minecraft:damage`](/docs/docs/items/components#minecraftdamage)：定义物品增加伤害
- [`minecraft:digger`](/docs/docs/items/components#minecraftdigger)：定义物品挖掘方块的速度
- [`minecraft:enchantable`](/docs/docs/items/components#minecraftenchantable)：定义物品可以附魔
- [`minecraft:hand_equipped`](/docs/docs/items/components#minecrafthand_equipped)：定义物品在手持时直立在手上
- [`minecraft:repairable`](/docs/docs/items/components#minecraftrepairable)：定义物品可以被修复

我们来假设红宝石镐拥有和钻石镐一致的挖掘等级，也就是可以挖掘黑曜石。并且，在挖掘速度方面也和钻石镐一样，我们可以这么定义：

```json showLineNumbers title="ruby_pickaxe.item.json" {8,16-32}
{
    "format_version": "1.21.50",
    "minecraft:item": {
        "description": {
            "identifier": "test:ruby_pickaxe",
            "menu_category": {
                "category": "equipment",
                "group": "itemGroup.name.pickaxe"
            }
        },
        "components": {
            "minecraft:icon": "ruby_pickaxe",
            "minecraft:tags": {
                "tags": [ "minecraft:is_pickaxe" ]
            },
            "minecraft:durability": { "max_durability": 1500 },
            "minecraft:max_stack_size": 1,
            "minecraft:damage": 5,
            "minecraft:digger": {
                "destroy_speeds": [
                    { "block": "minecraft:obsidian", "speed": 8 }
                ],
                "use_efficiency": true
            },
            "minecraft:enchantable": { "slot": "pickaxe", "value": 13 },
            "minecraft:hand_equipped": true,
            "minecraft:repairable": {
                "repair_items": [
                    { "items": [ "test:ruby" ], "repair_amount": 375 }
                ]
            }
        }
    }
}
```

这样，我们自定义的镐子就可以快速破坏黑曜石了！相信在介绍过剑的各项参数后，理解我们现在写了什么对读者来说应该不是什么难事了。

不过，细心的读者一定发现了一个问题——破坏其他镐子本能破坏的方块的时候，比如石头，是不能加速的。原则上，这可通过添加方块列表来实现，不过仔细看一下镐子可加速破坏方块的列表，读者会立刻发现这么做不现实：我们有几百种镐子可加速破坏的方块（详见[镐 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E9%95%90)）！

![pickaxe_1](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/pickaxe_1.png)

这个问题可以引入**方块标签（Block Tags）** 来解决，然而这不是我们本节的重点，请容我们暂且按下不表，在下一章讲到数驱方块的时候，我们会回过头来看这个问题。在本节的练习题中，我们也只会让读者解决特定方块的加速破坏问题，而不是一类方块的加速破坏问题。

## 盔甲：以靴子为例

现在让我们把目光面向盔甲，我们以靴子为例，**遍览所有组件（[全部物品组件的传送门](/docs/docs/items/components)）** 后可以发现需要的组件可能有以下这些：

- [`minecraft:durability`](/docs/docs/items/components#minecraftdurability)：定义物品的耐久度
- [`minecraft:max_stack_size`](/docs/docs/items/components#minecraftmax_stack_size)：定义物品的最大堆叠数
- [`minecraft:enchantable`](/docs/docs/items/components#minecraftenchantable)：定义物品可以附魔
- [`minecraft:repairable`](/docs/docs/items/components#minecraftrepairable)：定义物品可以被修复
- [`minecraft:wearable`](/docs/docs/items/components#minecraftwearable)：定义物品可以穿戴

我们来对靴子做如下的定义：

```json showLineNumbers title="ruby_boots.item.json" {8,16-24}
{
    "format_version": "1.21.50",
    "minecraft:item": {
        "description": {
            "identifier": "test:ruby_boots",
            "menu_category": {
                "category": "equipment",
                "group": "itemGroup.name.boots"
            }
        },
        "components": {
            "minecraft:icon": "ruby_boots",
            "minecraft:tags": {
                "tags": [ "minecraft:is_armor" ]
            },
            "minecraft:durability": { "max_durability": 1500 },
            "minecraft:max_stack_size": 1,
            "minecraft:enchantable": { "slot": "armor_feet", "value": 13 },
            "minecraft:repairable": {
                "repair_items": [
                    { "items": [ "test:ruby" ], "repair_amount": 375 }
                ]
            },
            "minecraft:wearable": { "slot": "slot.armor.feet", "protection": 3 }
        }
    }
}
```

现在穿上我们刚定义的靴子，可以看到护甲值确实有所提升：

![boots_1](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/boots_1.png)

其他组件我们都讲过，这里不再细提，我们来着重关注`minecraft:wearable`这个组件。这个组件倒也不难理解，读者可以很轻松地看出它需要装备的槽位<DataType type="string" name="slot" isRequired/>和它所提供的保护值<DataType type="int" name="protection"/>。只是，受限于 Mojang 没有开放盔甲韧性和击退抗性的接口，我们是没有办法定义我们自定义装备的这些属性的。到这里，我们其实已经看到数据驱动也有着自己的局限性。

此外，在装备了我们自定义的靴子后，我们看到靴子并没有穿在我们身上的贴图。好在这是可以解决的，在我们之后讲到数驱实体的**附着物（Attachables）** 的时候，我们再回过头来解决这个问题。

## 提升物品稀有度：以下界之星为例

首先，我们需要先声明一下——下界之星是一个原版硬编码物品，所以我们这里做的并不是覆盖原版物品，而是做一个独立于原版的新物品。那这样的话，我们来做一个……假的下界之星，来骗，来偷袭我们的朋友吧 >:)

我们先来定义我们的下界之星：

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
  - ...
  - <FileType type="folder" name="items" />：物品定义
    - <FileType type="folder" name="test" />
      - ...
      - <FileType type="file" name="fake_nether_star.item.json" />：下界之星
- <FileType type="folder" name="RP_test" />：资源包
  - ...

</treeview>

```json showLineNumbers title="fake_nether_star.item.json"
{
    "format_version": "1.21.50",
    "minecraft:item": {
        "description": {
            "identifier": "test:fake_nether_star",
            "menu_category": {
                "category": "items"
            }
        },
        "components": {
            "minecraft:icon": "nether_star"
        }
    }
}
```

其中，贴图`"nether_star"`是原版`item_texture.json`所定义的。这样，我们便得到了我们的假的下界之星：

![nether_star_1](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/nether_star_1.png)

可以看到，我们所定义的下界之星和原版的长相上来看还有些差距，首先是贴图没有附魔光泽，这一眼就会被人识破；其次，我们的下界之星是白色名称，还是青色名称看着更像那么回事对吧。所以遍览所有组件，我们可以看到有两个组件符合我们的需求：

- [`minecraft:glint`](/docs/docs/items/components#minecraftglint)：定义物品的附魔光泽
- [`minecraft:rarity`](/docs/docs/items/components#minecraftrarity)：定义物品的稀有度

这两个组件是很简单的。读者可以先去文档研究这两个组件，然后再来看下文。这样，我们把我们的物品定义改为

```json showLineNumbers title="fake_nether_star.item.json" {12-13}
{
    "format_version": "1.21.50",
    "minecraft:item": {
        "description": {
            "identifier": "test:fake_nether_star",
            "menu_category": {
                "category": "items"
            }
        },
        "components": {
            "minecraft:icon": "nether_star",
            "minecraft:glint": true,
            "minecraft:rarity": "rare"
        }
    }
}
```

哇咔咔，简直以假乱真，除了名字和不能合成信标之外就没什么区别了！

![nether_star_2](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/nether_star_2.png)

:::info[思考 4.4-1]

为了获得青色名称，我们也可以直接在翻译文件中命名为“§b下界之星”来解决问题。试想：这样做有什么问题？

<details>

<summary>答案（思考过后再翻看哦~）</summary>

在铁砧里会露馅。而且，通过铁砧命名之后，无论怎么命名，只要不带上颜色代码就总是能保持青色。

对于真正需要提升稀有度的物品来说，比如金苹果甚至附魔金苹果，通常是不建议在翻译文件里定义颜色代码的，一般用[`minecraft:rarity`](/docs/docs/items/components#minecraftrarity)或[`minecraft:hover_text_color`](/docs/docs/items/components#minecrafthover_text_color)来解决问题。

</details>

:::

## *收纳袋

Mojang 更新了 1.21.40 之后，正式在游戏中加入了收纳袋。一个天大的好消息是：收纳袋是原版为数不多的数据驱动物品！所以我们直接以原版的黑色收纳袋为例，来看收纳袋是怎么定义的：

```json showLineNumbers title="BP_vanilla/items/black_bundle.json"
{
    "format_version": "1.21.80",
    "minecraft:item": {
        "description": {
            "identifier": "minecraft:black_bundle"
        },
        "components": {
            "minecraft:icon": {
                "textures": {
                    "default": "bundle_black",
                    "bundle_open_back": "bundle_black_open_back",
                    "bundle_open_front": "bundle_black_open_front"
                }
            },
            "minecraft:max_stack_size": 1,
            "minecraft:storage_item": {
                "max_slots": 64,
                "allow_nested_storage_items": true,
                "banned_items": [ "minecraft:shulker_box", "minecraft:undyed_shulker_box" ]
            },
            "minecraft:storage_weight_limit": {
                "max_weight_limit": 64
            },
            "minecraft:storage_weight_modifier": {
                "weight_in_storage_item": 4
            },
            "minecraft:bundle_interaction": {
                "num_viewable_slots": 12
            }
        }
    }
}
```

可以看到这里的核心组件有：

- [`minecraft:max_stack_size`](/docs/docs/items/components#minecraftmax_stack_size)
- [`minecraft:storage_item`](/docs/docs/items/components#minecraftstorage_item)：定义物品可存储其他物品
- [`minecraft:storage_weight_limit`](/docs/docs/items/components#minecraftstorage_weight_limit)：定义物品可存储物品的最大数量
- [`minecraft:storage_weight_modifier`](/docs/docs/items/components#minecraftstorage_weight_modifier)L定义此物品在其他可存储物品中占用多大空间
- [`minecraft:bundle_interaction`](/docs/docs/items/components#minecraftbundle_interaction)：为物品启用收纳袋的交互模式和物品提示

后四个组件便都是用于收纳袋的。按照文档所给出的数据，我们也可以做出自己的收纳袋。

## *自定义陶片

> 本部分教程引用自 [Bedrock Wiki](https://wiki.bedrock.dev/items/custom-pottery-sherds)。

上一节我们引入了物品标签的概念，知道物品标签常用于自定义陶片。这里，我们也同样需要物品标签来定义新的自定义陶片。从[我们给出的文档](/docs/docs/items/tags#原版使用的标签)可以看到，这个物品标签就是`minecraft:decorated_pot_sherds`。我们来定义一个这样的物品，首先准备陶片的贴图如下：

空陶片物品：![empty_pottery_sherd](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/empty_pottery_sherd.png) 空陶片的陶罐图案：![empty_pottery_pattern](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/empty_pottery_pattern.png)

接下来我们准备一个 Ciallo～(∠・ω< )⌒☆ 图案吧，不过因为画幅大小，我就只准备以下这两幅图了，很简陋：

Ciallo～(∠・ω< )⌒☆ 陶片物品：![ciallo_pottery_sherd](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/ciallo_pottery_sherd.png) Ciallo～(∠・ω< )⌒☆ 陶片的陶罐图案：![ciallo_pottery_pattern](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/ciallo_pottery_pattern.png)

然后，我们定义陶片如下：

```json showLineNumbers title="ciallo_pottery_sherd.item.json" {14-15}
{
    "format_version": "1.21.50",
    "minecraft:item": {
        "description": {
            "identifier": "test:ciallo_pottery_sherd",
            "menu_category": {
                "category": "items",
                "group": "itemGroup.name.potterySherds"
            }
        },
        "components": {
            "minecraft:icon": "ciallo_pottery_sherd",
            "minecraft:tags": { "tags": [ "minecraft:decorated_pot_sherds" ] },
            "minecraft:display_name": { "value": "item.test:ciallo_pottery_sherd.name" },
            "minecraft:rarity": "uncommon"
        }
    }
}
```

这里我们解释一下后两个组件`minecraft:display_name`和`minecraft:rarity`的用途。因为合成出的陶罐中，会显示都含有哪些陶片，我们必须使用旧版的物品命名格式`item.(命名空间 ID).name`而非默认的`item.(命名空间 ID)`才能让它正常显示：

![pottery_1](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/pottery_1.png)

而定义稀有度，则是因为其他陶片都是少见的稀有度：

![pottery_2](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/pottery_2.png)

在定义完物品后，我们需要在资源包新增一个资源包<FileType type="folder" name="entity" />，再在这个文件夹中新建一个文件<FileType type="file" name="decorated_pot.client_entity.json" />。我们之后在实体那一章会讲到，这个文件叫做**实体客户端文件（Client Entity File）**，目前读者先权且这么做，暂时不需要理解原理。然后，在此文件中写入：

```json showLineNumbers title="decorated_pot.client_entity.json" {7}
{
    "format_version": "1.8.0",
    "minecraft:client_entity": {
        "description": {
            "identifier": "minecraft:decorated_pot",
            "textures": {
                "ciallo_pottery_sherd": "textures/blocks/ciallo_pottery_pattern"
            }
        }
    }
}
```

第 7 行代表了陶片所对应的方块贴图，读者可根据自己的定义按需更改。目前，读者为添加自定义陶片需要的文件包括：

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
  - <FileType type="folder" name="items" />：物品定义
    - <FileType type="folder" name="test" />：以 test 作为物品的命名空间
      - <FileType type="file" name="ciallo_pottery_sherd.item.json" />：新陶片的定义文件
- <FileType type="folder" name="RP_test" />：资源包
  - <FileType type="folder" name="entity" />：实体客户端定义
    - <FileType type="file" name="decorated_pot.client_entity.json" />：饰纹陶罐的实体客户端定义
  - <FileType type="folder" name="textures" />：贴图
    - <FileType type="folder" name="items" />：物品贴图
      - <FileType type="image" name="ciallo_pottery_sherd.png" />：新陶片的物品贴图
    - <FileType type="folder" name="blocks" />：物品贴图
      - <FileType type="image" name="ciallo_pottery_pattern.png" />：新陶片的方块贴图
    - <FileType type="file" name="item_texture.json" />：物品贴图注册

</treeview>

如果一切正常，读者便可以获得一个带有表情包的陶罐！

![pottery_3](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/pottery_3.png)

---

## 总结

在本节，我们对一些常见的物品实例做了详细介绍，主要是为了向读者展现一些常用物品组件的使用方法。在我们后续的附加包制作中，物品是不可或缺的一环，我们应对各个组件能做到什么有一个大致的了解。

本节我们介绍的比较重要的物品实例如下：

| 实例 | 使用的组件 | 待解决的问题 |
| --- | :--- | --- |
| 食物 | [`minecraft:icon`](/docs/docs/items/components#minecrafticon)、[`minecraft:food`](/docs/docs/items/components#minecraftfood)、[`minecraft:use_modifiers`](/docs/docs/items/components#minecraftuse_modifiers)、[`minecraft:use_animation`](/docs/docs/items/components#minecraftuse_animation) | **目前**还没有添加带有药水效果的食物 |
| 剑 | [`minecraft:icon`](/docs/docs/items/components#minecrafticon)、[`minecraft:tags`](/docs/docs/items/components#minecrafttags)、[`minecraft:durability`](/docs/docs/items/components#minecraftdurability)、[`minecraft:max_stack_size`](/docs/docs/items/components#minecraftmax_stack_size)、[`minecraft:can_destroy_in_creative`](/docs/docs/items/components#minecraftcan_destroy_in_creative)、[`minecraft:damage`](/docs/docs/items/components#minecraftdamage)、[`minecraft:digger`](/docs/docs/items/components#minecraftdigger)、[`minecraft:enchantable`](/docs/docs/items/components#minecraftenchantable)、[`minecraft:hand_equipped`](/docs/docs/items/components#minecrafthand_equipped)、[`minecraft:repairable`](/docs/docs/items/components#minecraftrepairable) | **目前**破坏方块不能降低耐久度 |
| 工具（镐） | [`minecraft:icon`](/docs/docs/items/components#minecrafticon)、[`minecraft:tags`](/docs/docs/items/components#minecrafttags)、[`minecraft:durability`](/docs/docs/items/components#minecraftdurability)、[`minecraft:max_stack_size`](/docs/docs/items/components#minecraftmax_stack_size)、[`minecraft:damage`](/docs/docs/items/components#minecraftdamage)、[`minecraft:digger`](/docs/docs/items/components#minecraftdigger)、[`minecraft:enchantable`](/docs/docs/items/components#minecraftenchantable)、[`minecraft:hand_equipped`](/docs/docs/items/components#minecrafthand_equipped)、[`minecraft:repairable`](/docs/docs/items/components#minecraftrepairable) | **目前**破坏方块不能降低耐久度；**目前**需要破坏的方块适配过于困难 |
| 盔甲（靴子） | [`minecraft:icon`](/docs/docs/items/components#minecrafticon)、[`minecraft:tags`](/docs/docs/items/components#minecrafttags)、[`minecraft:durability`](/docs/docs/items/components#minecraftdurability)、[`minecraft:max_stack_size`](/docs/docs/items/components#minecraftmax_stack_size)、[`minecraft:enchantable`](/docs/docs/items/components#minecraftenchantable)、[`minecraft:repairable`](/docs/docs/items/components#minecraftrepairable)、[`minecraft:wearable`](/docs/docs/items/components#minecraftwearable) | 无法定义盔甲韧性和击退抗性；**目前**没有显示穿在身上的贴图 |

还有一些其他实例，我们就不再过多强调了，因为使用的模组比较简单，功能也比较简单。

## 练习

:::info[练习 4.3]

现在我们已经基本上完成了对数驱物品定义的介绍！我们下面的习题要求读者能够对新版本的 40 多个组件都有基本了解，而不仅仅局限于我们所讲过的实例。不过，我们所讲过的实例的占比确实也是占多数的。准备好了吗？做完之后别忘记在游戏内实践，以验证你的更改确实有效！

1. 做一把秒人斧，耐久度为 1，使用金斧贴图，伤害改成 233！哇哈哈哈……直接来一手偷袭！>:)
2. 完善我们上一节练习中所创建的红宝石斧的功能，要求可以加速破坏橡木原木和橡木木板。提示：按照 Wiki 的记载，我们先把本题的红宝石工具的挖掘效率设置为 8，具体可以参见[挖掘 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E6%8C%96%E6%8E%98#%E6%8C%96%E6%8E%98%E9%80%9F%E5%BA%A6)。同理地，完善我们上一节练习中所创建的红宝石锹和红宝石锄的功能，要求红宝石锹可以加速破坏沙砾和沙子，而红宝石锄可以加速破坏橡树树叶。在下一章讲到方块标签的时候我们就介绍如何加速破坏一类方块。记得把这些物品收到对应的物品组中！
3. 完善我们上一节练习中所创建的红宝石头盔、红宝石胸甲和红宝石护腿，要求其护甲值和钻石套一致。同样地，暂时不要求添加玩家身上的盔甲贴图，这个问题在我们第六章讲到附着物后再回过头来解决。同样记得把这些物品收到对应的物品组中！
4. 定义一个炸药包物品，当试图放下这个物品后就召唤 TNT，这是实现 TNT 放下即炸的一种可行思路！读者可参考我们给出的贴图：![tnt](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/tnt.png)。
5. 定义一个金面团，吃下它可以回复 10 点饥饿值和 10 点饱和度！然后，定义它的合成配方与金苹果类似，用 8 个金锭环绕面团合成。最后，设置金面团的冷却为 1 分钟。贴图自创。
6. 定义一种物品，使其可以直接扔出箭，就像雪球一样。后续在学到实体的时候，我们会回过头来完善我们定义的弹射物的功能。提示：可以用组件`minecraft:throwable`。
7. 定义一种和原版铁锭外观一致的物品，然后令它的掉落物不会消失。是的！如果你做到了，其实这就是在我开发的起床战争中，资源不会消失的秘籍。

:::

<details>

<summary>练习题答案</summary>

以下答案中，我们只给出对应的物品行为包定义，必要时附带其他内容。读者在定义物品时应当尤其注意，我们定义物品的流程是定义文件 → 贴图 → 文本，之后可能还会有和方块、实体等内容的联动。我们不标明并不代表这些步骤是不重要的，只是因为工作内容高度重复，我们就不再赘述了。

1. ```json showLineNumbers title="秒人斧定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:killer_axe",
                "menu_category": {
                    "category": "equipment"
                }
            },
            "components": {
                "minecraft:icon": "killer_axe",
                "minecraft:tags": { "tags": [ "minecraft:is_axe" ] },
                "minecraft:durability": { "max_durability": 1 },
                "minecraft:max_stack_size": 1,
                "minecraft:damage": 233,
                "minecraft:hand_equipped": true,
                "minecraft:rarity": "epic"
            }
        }
    }
   ```

   ![practice_1](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/practice_1.png)  
   吓哭了。另：题意没有要求`minecraft:rarity`，但我觉得秒人斧这东西还是值得的（

2. ```json showLineNumbers title="红宝石斧定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:ruby_axe",
                "menu_category": {
                    "category": "equipment",
                    "group": "itemGroup.name.axe"
                }
            },
            "components": {
                "minecraft:icon": "ruby_axe",
                "minecraft:tags": { "tags": [ "minecraft:is_axe" ] },
                "minecraft:durability": { "max_durability": 1500 },
                "minecraft:max_stack_size": 1,
                "minecraft:damage": 6,
                "minecraft:digger": {
                    "destroy_speeds": [
                        { "block": "minecraft:oak_log", "speed": 8 },
                        { "block": "minecraft:oak_planks", "speed": 8 }
                    ],
                    "use_efficiency": true
                },
                "minecraft:enchantable": { "slot": "axe", "value": 13 },
                "minecraft:hand_equipped": true,
                "minecraft:repairable": {
                    "repair_items": [
                        { "items": [ "test:ruby" ], "repair_amount": 375 }
                    ]
                }
            }
        }
    }
   ```

   ![practice_2](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/practice_2.png)  

   ```json showLineNumbers title="红宝石锹定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:ruby_shovel",
                "menu_category": {
                    "category": "equipment",
                    "group": "itemGroup.name.shovel"
                }
            },
            "components": {
                "minecraft:icon": "ruby_shovel",
                "minecraft:tags": { "tags": [ "minecraft:is_shovel" ] },
                "minecraft:durability": { "max_durability": 1500 },
                "minecraft:max_stack_size": 1,
                "minecraft:damage": 4,
                "minecraft:digger": {
                    "destroy_speeds": [
                        { "block": "minecraft:sand", "speed": 8 },
                        { "block": "minecraft:gravel", "speed": 8 }
                    ],
                    "use_efficiency": true
                },
                "minecraft:enchantable": { "slot": "shovel", "value": 13 },
                "minecraft:hand_equipped": true,
                "minecraft:repairable": {
                    "repair_items": [
                        { "items": [ "test:ruby" ], "repair_amount": 375 }
                    ]
                }
            }
        }
    }
   ```

   ![practice_3](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/practice_3.png)

   ```json showLineNumbers title="红宝石锄定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:ruby_hoe",
                "menu_category": {
                    "category": "equipment",
                    "group": "itemGroup.name.hoe"
                }
            },
            "components": {
                "minecraft:icon": "ruby_hoe",
                "minecraft:tags": { "tags": [ "minecraft:is_hoe" ] },
                "minecraft:durability": { "max_durability": 1500 },
                "minecraft:max_stack_size": 1,
                "minecraft:damage": 5,
                "minecraft:digger": {
                    "destroy_speeds": [
                        { "block": "minecraft:oak_leaves", "speed": 8 }
                    ],
                    "use_efficiency": true
                },
                "minecraft:enchantable": { "slot": "hoe", "value": 13 },
                "minecraft:hand_equipped": true,
                "minecraft:repairable": {
                    "repair_items": [
                        { "items": [ "test:ruby" ], "repair_amount": 375 }
                    ]
                }
            }
        }
    }
   ```

   ![practice_4](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/practice_4.png)  

3. ```json showLineNumbers title="红宝石头盔定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:ruby_helmet",
                "menu_category": {
                    "category": "equipment",
                    "group": "itemGroup.name.helmet"
                }
            },
            "components": {
                "minecraft:icon": "ruby_helmet",
                "minecraft:tags": { "tags": [ "minecraft:is_armor" ] },
                "minecraft:durability": { "max_durability": 1500 },
                "minecraft:max_stack_size": 1,
                "minecraft:enchantable": { "slot": "armor_head", "value": 13 },
                "minecraft:repairable": { "repair_items": [ { "items": [ "test:ruby" ], "repair_amount": 375 } ] },
                "minecraft:wearable": { "slot": "slot.armor.head", "protection": 3 }
            }
        }
    }
   ```

   ```json showLineNumbers title="红宝石胸甲定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:ruby_chestplate",
                "menu_category": {
                    "category": "equipment",
                    "group": "itemGroup.name.chestplate"
                }
            },
            "components": {
                "minecraft:icon": "ruby_chestplate",
                "minecraft:tags": { "tags": [ "minecraft:is_armor" ] },
                "minecraft:durability": { "max_durability": 1500 },
                "minecraft:max_stack_size": 1,
                "minecraft:enchantable": { "slot": "armor_torso", "value": 13 },
                "minecraft:repairable": { "repair_items": [ { "items": [ "test:ruby" ], "repair_amount": 375 } ] },
                "minecraft:wearable": { "slot": "slot.armor.chest", "protection": 8 }
            }
        }
    }
   ```

   ```json showLineNumbers title="红宝石护腿定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:ruby_leggings",
                "menu_category": {
                    "category": "equipment",
                    "group": "itemGroup.name.leggings"
                }
            },
            "components": {
                "minecraft:icon": "ruby_leggings",
                "minecraft:tags": { "tags": [ "minecraft:is_armor" ] },
                "minecraft:durability": { "max_durability": 1500 },
                "minecraft:max_stack_size": 1,
                "minecraft:enchantable": { "slot": "armor_legs", "value": 13 },
                "minecraft:repairable": { "repair_items": [ { "items": [ "test:ruby" ], "repair_amount": 375 } ] },
                "minecraft:wearable": { "slot": "slot.armor.legs", "protection": 6 }
            }
        }
    }
   ```

   ![practice_5](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/practice_5.png)  
   ![practice_6](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/practice_6.png)  

4. ```json showLineNumbers title="炸药包定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:tnt",
                "menu_category": {
                    "category": "items"
                }
            },
            "components": {
                "minecraft:icon": "test_tnt",
                "minecraft:entity_placer": { "entity": "minecraft:tnt" }
            }
        }
    }
   ```

   ![practice_7](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/practice_7.png)  

5. 我们提供一个参考贴图如图：![golden_dough](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/golden_dough.png)，以下为使用的代码：

   ```json showLineNumbers title="金面团定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:golden_dough",
                "menu_category": {
                    "category": "items"
                }
            },
            "components": {
                "minecraft:icon": "golden_dough",
                "minecraft:tags": { "tags": [ "minecraft:is_food" ] },
                "minecraft:food": { "can_always_eat": true, "nutrition": 10, "saturation_modifier": 0.5 },
                "minecraft:use_animation": "eat",
                "minecraft:use_modifiers": { "use_duration": 1.6, "movement_modifier": 0.35 },
                "minecraft:cooldown": { "category": "golden_dough", "duration": 60 }
            }
        }
    }
   ```

   ![practice_8](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/practice_8.png)  

6. ```json showLineNumbers title="可投掷的箭定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:throwable_arrow",
                "menu_category": {
                    "category": "items"
                }
            },
            "components": {
                "minecraft:icon": "arrow",
                "minecraft:projectile": { "projectile_entity": "minecraft:arrow" },
                "minecraft:throwable": { }
            }
        }
    }
   ```

   ![practice_9](/img/tutorials/a2_addons/b4_data_driven_items/c4_item_examples/practice_9.png)  
   这里投出的箭速度很快，而且没有动画，读者可以根据`minecraft:throwable`进行修改。可以用这段代码做类似于飞刀一样的物品！

7. ```json showLineNumbers title="不会消失的铁锭定义文件"
    {
        "format_version": "1.21.50",
        "minecraft:item": {
            "description": {
                "identifier": "test:iron_ingot",
                "menu_category": {
                    "category": "items"
                }
            },
            "components": {
                "minecraft:icon": "iron_ingot",
                "minecraft:should_despawn": false
            }
        }
    }
   ```

</details>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
