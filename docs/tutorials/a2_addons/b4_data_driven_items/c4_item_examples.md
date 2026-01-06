---
sidebar_position: 4
---

# 4.4 常见的物品实例

> 上次更新：2026 年 1 月 6 日

:::warning[提示]

本文仍在编辑中，内容仅供参考。

:::

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

上节，我们讲解了合成配方，并布置了一些练习题，要求读者做完，这节需要用到。什么？你还没做？快回去至少看一眼我们干了什么 >:)（[上一节习题的传送门](c3_recipes#练习)）

目前为止，我们的文件架构为

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
  - ……
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

```json showLineNumbers title="dough.item.json" {8,16-34}
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

所以，这些就是我们的剑所用到的组件了！虽然用了很多组件，但好在这些组件相对来说都是很好理解的。除了耐久值问题之外，这把剑已经和原版的剑已经几乎一致了！

## 工具

## 盔甲

## 弹射物

## 原版实例：收纳袋

## *自定义陶片

---

## 总结

## 练习

- 做一把秒人斧
