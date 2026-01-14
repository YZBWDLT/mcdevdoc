---
sidebar_position: 5
---

# 4.5 低版本物品

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

> 上次更新：2026 年 1 月 14 日

在前面，我们已学习过格式版本`1.20.0`或更高版本下物品的实现方法，我们后文统称高版本物品。总体来说，就是使用行为包定义物品行为，而资源包用来定义物品名称和物品贴图。

而我们在上一节知道，高版本物品在食物的实现上会有一定的限制性，主要体现在无法实现附加药效的物品，例如金苹果。在我们目前学习内容有限的情况下，使用脚本对我们来说门槛略高，但好在我们还可以使用低版本的物品来解决这个问题。下面，我们以上一节练习中定义的金面团为例，介绍一下如何通过低版本物品实现附加药效的食物。

:::warning[温馨提醒]

低版本物品实现附加药效的物品只是我们目前所介绍的一种**替代方案**，也就是说，随着我们在开发知识上的不断完善，在讲到脚本相关应用的时候，读者在最后应该能够使用高版本物品 + 脚本的方式实现附加药效的食物。目前来讲，无论是从官方角度还是从我们个人角度上来看，在非必要时，都高度建议使用高版本物品。

目前来说，我们认为在开发者知识不足的情况下，有且仅有**附加药效的食物**这一个需求可能有必要使用低版本物品实现。其他情况，请尽可能使用高版本物品。

:::

## 低版本物品的工作原理

我们首先需要了解低版本物品的工作原理。对于高版本物品，我们知道功能与渲染是完全区分开的，逻辑比较简单，文件架构是这样的：

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="items"/>
    - <FileType type="file" name="(物品 ID).item.json"/>：物品定义
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="texts"/>
    - <FileType type="file" name="en_US.lang"/>：物品英文译名
    - <FileType type="file" name="zh_CN.lang"/>：物品中文译名
  - <FileType type="folder" name="textures"/>
    - <FileType type="folder" name="items"/>
      - <FileType type="image" name="(物品 ID).png"/>：物品贴图
    - <FileType type="file" name="item_texture.json"/>：物品贴图注册

</treeview>

而低版本物品因为还不太成熟，所以逻辑上相比于高版本物品要复杂一些。相对地，它在资源包会多出一个新的物品定义：

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="items"/>
    - <FileType type="file" name="(物品 ID).item.json"/>：物品行为包定义
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="items"/>
    - **<FileType type="file" name="(物品 ID).item.json"/>：物品资源包定义**
  - <FileType type="folder" name="texts"/>
    - <FileType type="file" name="en_US.lang"/>：物品英文译名
    - <FileType type="file" name="zh_CN.lang"/>：物品中文译名
  - <FileType type="folder" name="textures"/>
    - <FileType type="folder" name="items"/>
      - <FileType type="image" name="(物品 ID).png"/>：物品贴图
    - <FileType type="file" name="item_texture.json"/>：物品贴图注册

</treeview>

**物品的资源包定义主要是决定在玩家的客户端中，物品如何表现**，比如其图标、动画、在创造模式物品栏中的位置等信息，从格式上来讲，行为包定义和资源包定义都是类似的，而旧版本物品的行为包定义的格式又和我们前面讲的高版本物品定义的格式是类似的，这就意味着我们可以如法炮制地写资源包物品定义！

现在，请读者查阅我们给出的旧版本物品定义的组件文档，其中注意带有 **RP** 字样的就是资源包定义（[组件文档传送门](/docs/docs/items/components#旧版本组件)）。读者会发现，旧版本的组件比起新版本的组件，功能少了很多，所以掌握起来也相对容易。

:::warning[中国版对低版本物品的额外要求]

中国版在更新 1.20 后，要求`minecraft:icon`组件写入行为包定义才可使该组件生效。

:::

## 低版本食物

### 从高版本物品降级为低版本物品

现在我们来把上一节练习中定义的金面团改成低版本的食物。来看上一节练习我们定义的代码：

```json showLineNumbers title="BP/items/golden_dough.item.json"
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

现在，我们使用旧版本组件，就把格式版本的`1.21.50`改为`1.16.0`。查阅文档可以看到，上面我们所定义的组件中，在行为包中支持的就只有以下几个：

- `minecraft:food`：它合并了高版本的`minecraft:food`和高版本的`minecraft:cooldown`的功能；
- `minecraft:use_duration`：功能上也就是高版本的`minecraft:use_modifiers`，不过`movement_modifier`参数的功能就无法实现了；
- 为了适配中国版，我们再加上`minecraft:icon`组件。

所以我们把上面的内容改写为：

```json showLineNumbers title="BP/items/golden_dough.item.json"
{
    "format_version": "1.16.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:golden_dough"
        },
        "components": {
            "minecraft:icon": "golden_dough",
            "minecraft:food": {
                "can_always_eat": true,
                "nutrition": 10,
                "saturation_modifier": "normal",
                "cooldown_type": "golden_dough",
                "cooldown_time": 1200
            },
            "minecraft:use_duration": 32
        }
    }
}
```

这里的代码相信读者可以读懂，但需要注意，我们看到`minecraft:food`组件在冷却时间和使用时间上，单位是游戏刻，所以我们这里写了`1200`和`32`，而非原来的`60`和`1.6`。

然后，我们再把资源包的组件放在物品资源包定义中，资源包定义也就支持三个组件，我们这里主要采用两个组件：

- `minecraft:icon`
- `minecraft:use_animation`

```json showLineNumbers title="RP/items/golden_dough.item.json"
{
    "format_version": "1.16.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:golden_dough",
            "category": "items"
        },
        "components": {
            "minecraft:icon": "golden_dough",
            "minecraft:use_animation": "eat"
        }
    }
}
```

进入游戏，我们看到物品确实是可以正常运行的：

![effect_food_1](/img/tutorials/a2_addons/b4_data_driven_items/c5_low_version_items/effect_food_1.png)

:::info[思考 4.5-1]

我们在上面的图片中特意留了一个破绽，你发现了么？

<details>

<summary>答案（思考过后再翻看哦~）</summary>

**名字仍然显示为键名**。读者可以发现在低版本物品中，默认使用的键名变成了`item.(命名空间 ID).name`而非`item.(命名空间 ID)`。我们当时在 4.2 讲到物品翻译时有提及过，读者在编写旧版本物品时应当尤其注意。

</details>

:::

### 为食物添加药效

在完成了基本的定义之后，我们来添加药效吧！根据文档对`minecraft:food`的记载，我们将上面的行为包定义改为

```json showLineNumbers title="BP/items/golden_dough.item.json" {15-21}
{
    "format_version": "1.16.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:golden_dough"
        },
        "components": {
            "minecraft:icon": "golden_dough",
            "minecraft:food": {
                "can_always_eat": true,
                "nutrition": 10,
                "saturation_modifier": "normal",
                "cooldown_type": "golden_dough",
                "cooldown_time": 1200,
                "effects": [
                    {
                        "name": "regeneration",
                        "duration": 60,
                        "amplifier": 0
                    }
                ]
            },
            "minecraft:use_duration": 32
        }
    }
}
```

高亮部分就是我们新增的部分了，相信对已学会`/effect`命令的读者来说，上面新增的内容并不难理解，它代表着我们对金面团添加了 60 秒的生命恢复效果。

看，吃下之后，效果真不错（请无视那个抗火效果）！

![effect_food_2](/img/tutorials/a2_addons/b4_data_driven_items/c5_low_version_items/effect_food_2.png)

## `1.16.100`~`1.20.0`之间的格式版本断档是怎么回事？

我们再来专门用一个小节来解释一下，为什么我们不能使用`1.16.100`-`1.20.0`之间的格式版本。

读者可能知道，1.16.100 这个版本对于开发者来说意义重大。在 1.16.100 之前，读者可以看到物品组件非常之少，代表它能实现的功能也非常之少。1.16.100 更新后，在「假日创作者实验性玩法」下新增了一大批物品组件，极大地扩展了数驱物品的功能。

提到「假日创作者实验性玩法」，我们需要多说一嘴。你能见到在 1.16.100 - 1.20.0 之间的资源，地图也好附加包也罢，很多都已经开启或要求玩家开启这个实验性玩法，因为这样才能应用物品的更多功能，侧面也印证了原来物品的功能是真的很少。

好在 1.20.0 开始，Mojang 逐渐从实验性玩法开始开放物品组件到正式版，开放到现在已经有 40 多个物品组件，远远多于当时的物品组件数量，**不过必须要使用更高的格式版本**。由于初期开放得不够，所以在 1.20.0 发布后一段时间内，仍有很多开发者在使用实验性玩法。直到 1.20.30 的时候，「假日创作者实验性玩法」中的绝大多数组件才都走出了实验性玩法（即正式开放），成为正式版的一部分。

然而，「假日创作者实验性玩法」中所提供的组件并未全部走出实验性玩法。事实上，「假日创作者实验性玩法」的物品格式要比现在复杂一些，有一些组件可以触发事件，而这些事件又可以执行特殊功能，比如执行命令、施加药效等，这类组件和事件都未能走出实验性玩法，因为在 1.19.50 正式推出的 ScriptAPI 可以做到完全的平替。不过，因为 ScriptAPI 需要 JavaScript 的基础，这让很多知识储备并不充足的开发者望而却步。

后来，随着 1.21.20 的更新，**「假日创作者实验性玩法」被彻底移除，这同时也意味着基于此实验性玩法的内容将不再能够正常运行**，因此招致了社区不少人的反对。不过也有支持的声音，认为开发者既然开启了实验性玩法，就要承受开启它所带来的风险和后果。这也同时意味着，那些未能走出实验性玩法的组件和事件，将再也无法回归了。

截止至截稿的今天，网易也即将更新到 1.21.50 版本，届时「假日创作者实验性玩法」将彻底完成它的历史使命。

所以，对于上述物品组件的发展史，相信读者已经清楚了我们在本小节所提出的问题的答案——因为它是由物品组件从实验性玩法到正式开放中的空档期所导致的，而我们使用这些格式版本就可能导致解析不稳定，不能轻易使用。同时，我们必须再次强调：

:::danger[警告！]

非必要情况下，**绝对不要在你的作品中开启实验性玩法，因为实验性玩法的内容有可能会在未来版本中移除**！除非，你已经准备好承受开启它所带来的风险，并做好长期维护的准备！！！

:::

---

## 总结

我们在本节介绍了低版本物品。低版本物品是稳定玩法，所以读者不必担心实验性玩法的问题。目前来说，我们要用低版本物品的需求只有一个——实现附加药效的食物。对于其他需求，都应使用高版本物品实现。

低版本物品除了要在行为包定义物品之外，还要在资源包定义物品。二者可使用的组件也均为旧版本组件，[查阅文档](/docs/docs/items/components#旧版本组件)时应着重关注旧版本组件的接口。

在未来，我们就要介绍如何通过高版本物品结合脚本的方式实现附加药效的食物。到那时，我们就可以完全抛弃旧版物品了。

## 练习

:::info[练习 4.4]

本节我们的练习题只有一个——实现一种随机药水，每种药效在喝下后各有 10% 的概率获取，不恢复饱食度，使用饮用动画。药效列表自定。

:::

<details>

<summary>练习题答案</summary>

我们现在以 10% 生命恢复 II 5 秒、10% 饥饿 II 5 秒、10% 抗性提升 II 5 秒为例，来定义这个物品：

```json showLineNumbers title="随机药水行为包定义文件"
{
    "format_version": "1.16.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:random_potion"
        },
        "components": {
            "minecraft:icon": "random_potion",
            "minecraft:food": {
                "can_always_eat": true,
                "nutrition": 0,
                "saturation_modifier": "poor",
                "effects": [
                    { "name": "regeneration", "duration": 5, "amplifier": 1, "chance": 0.1 },
                    { "name": "hunger", "duration": 5, "amplifier": 1, "chance": 0.1 },
                    { "name": "resistance", "duration": 5, "amplifier": 1, "chance": 0.1 }
                ]
            },
            "minecraft:use_duration": 32
        }
    }
}
```

注意`amplifier`的含义和命令`/effect`是一致的，在设定 II 级药效的时候，这个参数要设为`1`。

```json showLineNumbers title="随机药水资源包定义文件"
{
    "format_version": "1.16.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:random_potion",
            "category": "items"
        },
        "components": {
            "minecraft:icon": "random_potion",
            "minecraft:use_animation": "drink"
        }
    }
}
```

</details>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
