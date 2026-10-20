---
sidebar_position: 2
---

# 6.2 制作第一个数驱实体

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"
import Image from "/src/components/image/standard"

:::warning

本页面仍在编写中，仅供参考。

:::

在本节，我们就来以制作一个自定义 NPC 为例，探讨数据驱动实体最基础的制作方法。

和数据驱动物品和方块类似，数据驱动实体仍然需要行为包和资源包的配合：

- 行为包：告诉游戏引擎（服务端），我们添加了一种全新的 NPC，在处理各种实体逻辑的时候不要忘记我们的 NPC。
- 资源包：告诉客户端，对于这个 NPC，我们应该使用什么模型、什么贴图、什么材质、什么动画、什么逻辑去处理 NPC 的渲染问题。

那么现在，让我们打开 VSC 的工作区开始制作吧！

---

## 实体的基本定义

### 行为包：服务端实体定义

有了前两章定义物品和方块的经验，对于数驱实体而言，其实这个过程仍然是大差不差：

1. 在行为包根目录创建<FileType type="folder" name="entities"/>，这回你想丢 s 都难了 >:)；
2. 在刚创建的<FileType type="folder" name="entities"/>内新增一个<FileType type="folder" name="test"/>，作为命名空间。对于这个命名空间文件夹，我们不过多解释了，读者应该是懂的都懂。
3. 最后，在命名空间<FileType type="folder" name="test"/>下新增一个<FileType type="file" name="custom_npc.server_entity.json"/>。同样地，加上一个`.server_entity`也是为了在将来有助于区分是服务端定义还是客户端定义。

照例，文件展示环节：

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
    - ……
    - <FileType type="folder" name="entities" />：实体定义
        - <FileType type="folder" name="test" />：以 test 作为实体的命名空间
            - <FileType type="file" name="custom_npc.server_entity.json" />：NPC 的服务端定义文件

</treeview>

而对于文件的编写，不用我说你也猜到了，**仍然遵循「格式版本 - 描述 - 组件」三段式定义**：

```json showLineNumbers title="custom_npc.server_entity.json" {3}
{
    "format_version": "1.21.120",
    "minecraft:entity": {
        "description": {
            "identifier": "test:custom_npc"
        },
        "components": {}
    }
}
```

注意到这里的第 3 行，告诉 Minecraft 我们定义的是一个实体就好了。

但是，到这里还没完。我们这里只是完成了实体的注册，但为了能够在游戏内生成我们的 NPC，必须要指定实体是可召唤（Is Summonable）的：

```json showLineNumbers title="custom_npc.server_entity.json" {6-7}
{
    "format_version": "1.21.120",
    "minecraft:entity": {
        "description": {
            "identifier": "test:custom_npc",
            "is_summonable": true,
            "is_spawnable": true
        },
        "components": {}
    }
}
```

这里，我们还指定了实体是可生成的（Is Spawnable），规定该参数为`true`之后可以使游戏自动注册一个对应的刷怪蛋。

![is_spawnable_1](/img/tutorials/a2_addons/b6_data_driven_entities/c2_make_first_entity/is_spawnable_1.png)

### 资源包：客户端实体定义

而在资源包这里，事情就开始变得复杂起来了。

- 在之前定义物品在资源包的表现的时候，我们的做法是使用<FileType type="file" name="item_texture.json"/>来定义物品的贴图，用两个语言文件来定义物品的翻译，这就是数驱物品在资源包方面的全部工作了。
- 而方块则要复杂一点，使用<FileType type="file" name="terrain_texture.json"/>来定义方块的贴图，<FileType type="file" name="blocks.json"/>来定义方块的音效（_注意，我们现在不通过该文件来定义方块的贴图定义，而通常使用`minecraft:material_instances`组件，未来更新了`minecraft:sound`组件之后，这个文件就彻底没有什么用武之地了_），以及两个语言文件定义翻译。在其他更进阶的地方，比如面剔除、翻书动画等，我们还要做进一步的定义。

可以看到物品和方块的定义方法其实还是很简单的。但在实体这里，资源包定义逻辑就变得和物品方块大相径庭了，不再能照搬以往的经验了。现在请按照我们的步骤往下走：

1. 在资源包根目录创建<FileType type="folder" name="entity"/>。注意！这回没有 s 了，这是单数形式！_~不要问为什么会这个样子，为什么不问问神奇 Mojang 呢？~_
2. 在刚创建的<FileType type="folder" name="entity"/>内新增一个<FileType type="folder" name="test"/>，作为命名空间。不多说了。
3. 最后，在命名空间<FileType type="folder" name="test"/>下新增一个<FileType type="file" name="custom_npc.client_entity.json"/>。

现在你的文件路径长成这样：

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
    - ……
    - <FileType type="folder" name="entities" />：服务端实体定义
        - <FileType type="folder" name="test" />
            - <FileType type="file" name="custom_npc.server_entity.json" />：NPC 的服务端定义文件
- <FileType type="folder" name="RP_test" />：资源包
    - ……
    - <FileType type="folder" name="entity" />：客户端实体定义
        - <FileType type="folder" name="test" />
            - <FileType type="file" name="custom_npc.client_entity.json" />：NPC 的客户端定义文件

</treeview>

是的，对于实体来说，每个实体都单独使用一个文件夹来定义客户端的表现行为！

现在让我们继续写入下面的内容：

```json showLineNumbers title="custom_npc.client_entity.json" {2}
{
    "format_version": "1.21.120",
    "minecraft:client_entity": {
        "description": {
            "identifier": "test:custom_npc"
        }
    }
}
```

直到这里，对于读者来说应该都是很简单的。

### 实体的材质、模型与贴图 渲染控制器简介

现在，我们完成了最基本的定义。但问题来了——我们这个实体究竟需要什么模型、什么贴图，我们还从来没有指定过呢！如果直接进入游戏测试，会发现即使生成了实体也是空无一物：

![rp_1](/img/tutorials/a2_addons/b6_data_driven_entities/c2_make_first_entity/rp_1.webp)

看来，我们需要定义实体的渲染表现。渲染一个实体，最重要的要素自然还是我们曾经讲过的：材质（Material）、模型（Model）和贴图（Texture）。

- 对于材质而言，我们曾讲过，它代表的是组成这个物体的材料。可能你会疑惑——实体不都是肉做的吗，要区分吗？要的兄弟，要的。例如：铁傀儡就是铁做的；盔甲架就是木棍做的，像这种情况就必须要做区分。事实上，原版实体区分每个实体的材质都十分细致，几乎每种实体都有一种材质。但遗憾的是，读者现在只需要知道，材质都是写到材质文件里的，而官方并不太推荐开发者动材质文件，因为可能会导致一些意外的错误。

    既然这样，我们就可以使用原版提供的一种材质：`entity_alphatest`。这是一种全透明的实体材质，和我们曾经在方块那一章学过的`alpha_test`是同理的。对于实体而言，半透明的需求其实较为少见，我们在多数非必要情况下就可以直接应用这种材质。

- 对于模型而言，我们可以使用原版的一种模型：`geometry.humanoid`。这是一种人形模型，有不少实体都是利用这个模型，或这个模型的变种。
- 对于贴图而言，我们就先使用史蒂夫的贴图吧，路径是`textures/entity/steve`。

这样的话，我们就可以给出实体的材质、模型与贴图的引用：

```json showLineNumbers title="custom_npc.client_entity.json" {6-9}
{
    "format_version": "1.10.0",
    "minecraft:client_entity": {
        "description": {
            "identifier": "test:custom_npc",
            "render_controllers": ["controller.render.default"],
            "materials": { "default": "entity_alphatest" },
            "geometry": { "default": "geometry.humanoid" },
            "textures": { "default": "textures/entity/steve" }
        }
    }
}
```

等一下！现在我们加的东西有点多了。我们现在要着重解释第 6 行是什么情况。

这里，我们定义了一个**渲染控制器（Render Controller）**。我们都知道，一个相同 ID 的实体可能对应多种不同的状态。以羊为例，它就拥有 16 种不同的颜色。这样的话，我们就要引用 16 张不同的贴图，可游戏怎么知道什么时候该引用什么贴图呢？这就是渲染控制器的工作了。**它可以用于监控实体的状态、或某些特定的变量，然后根据这些状态或变量的值，给出实际使用什么材质、模型或贴图**。比如，如果这时候应该是蓝色的羊，那么渲染控制器就会根据给定的变量挑出蓝色贴图并使用。

有关渲染控制器的细节，我们将在后面的教程中详细介绍。

而在这里，我们使用的是原版给出的默认渲染控制器`controller.render.default`，它会获取客户端实体文件中定义的`default`材质、`default`模型和`default`贴图，也就是我们在 7-9 行分别给出的`default`的值，然后把这些值应用到实体上。

现在让我们再进入游戏试一下看看……

![rp_2](/img/tutorials/a2_addons/b6_data_driven_entities/c2_make_first_entity/rp_2.webp)

好，现在一个“史蒂夫”就出现在我们的眼前了！

_~btw，这里我加上了 Prizma 2.2 的光影特效——我真的很喜欢它的光影效果！~_

## 原版实例

在上文，我们了解了实体的基本定义，和数驱物品方块类似，我们通过行为包的服务端定义文件就可以定义这个实体的存在，至于资源包部分则要复杂一些——我们需要在资源包定义实体的材质、模型和贴图，并且需要用渲染控制器控制它们该如何运行。在后面，我们将会更进一步地介绍实体模型、贴图和渲染控制器的更多细节。

不过，我们也发现，一个完全无组件的实体的默认行为显然是十分诡异的——我们打它一下，它居然会“原地飞升”！

![vanilla_instance_1](/img/tutorials/a2_addons/b6_data_driven_entities/c2_make_first_entity/vanilla_instance_1.webp)

显然这不是我们想要的效果。为了让实体拥有正常的行为，显然我们要做的第一件事情是为实体添加一个物理效果。

按理来说，现在是我们翻阅实体组件列表的时候了。但是对于实体，我们没有必要这么做——因为读者可以看一看[实体的组件](/docs/docs/entities/components)有多少，一眼望过去根本看不完（事实上在本文成稿时，文档页面仍然没有施工完毕，组件太多了，根本整理不完）！事实上，实体的组件要远比物品和方块复杂的多，因为数据驱动实体的发展也远远要比物品和方块早的多。

:::note[扩展：数据驱动实体的发展]

讲起这个那可就真的是老资历了——我们有一些 MC 经历十分长的老玩家或许听说过附加包（不考虑纯贴图包，那个还要更早）是什么版本引入的，是 0.16 版本——当时还被称作携带版！是的，实体就是从那个时候开始开放数据驱动组件的。虽然当时开放的组件很少，但 PE 0.16 版本距离 2026 年已经有 10 年之久了。

而反观方块和物品的发展史，基本上都是在 1.10-1.12 时期才开始开放，大约也仅有 6-7 年之久。而且方块和物品的发展也十分曲折，直到 1.19-1.20 开始才迎来大的发展。

也正因如此，你可以在数据驱动实体上看到非常多之前的影子（~_低情商：史山_~），数驱实体的基本逻辑也没有过特别大的变动。

:::

因此，我们现在有必要为大家介绍另一种学会数据驱动实体的方法——**多看实例**！也就是别人是如何实现的，我们仿照着它做，稍加魔改，不就是我们自己的东西了吗？

_*可能有一些好奇宝宝要问：这不是抄袭吗？这话说的，我们写代码的人的事，那怎么能叫抄呢？那叫借鉴（bushi）*_

咳咳，玩笑归玩笑，言归正传。多数情况下，**我们只需要借鉴一下原版的实体是怎么写的就可以了**，毕竟原版绝大多数实体都是数据驱动的，Mojang 也公开了原版数据驱动实体的代码，在我们前几章下载的模板包中就有这些东西。比如，如果你需要实体能够攻击玩家，就可以参考僵尸的代码；如果你需要实体能够交易，就可以参考村民的代码，等等。只要你对原版实体足够熟悉，需要的时候就参考原版实体就可以了。当然，你也可以借鉴其他开发者的代码，前提是他们允许你这么做，并且注意不要大段大段复制粘贴——那就真的是抄袭了。

### 从原版实例取用组件

考虑到我们现在的要求不高，只需要一个物理属性的组件，因此让我们来打开一个行为比较简单的实体，毕竟原版实体绝大多数都有物理组件。比如，盔甲架应该是一个足够简单的实体：

```json title="armor_stand.json" showLineNumbers
{
    "format_version": "1.26.0",
    "minecraft:entity": {
        "description": {
            "identifier": "minecraft:armor_stand",
            "is_experimental": false,
            "is_summonable": true,
            "is_spawnable": false,
            "spawn_category": "misc"
        },
        "components": {
            "minecraft:collision_box": { "height": 1.975, "width": 0.5 },
            "minecraft:conditional_bandwidth_optimization": {},
            "minecraft:health": { "max": 6, "value": 6 },
            "minecraft:hurt_on_condition": {
                "damage_conditions": [
                    {
                        "cause": "lava",
                        "damage_per_tick": 4,
                        "filters": { "operator": "==", "test": "in_lava", "subject": "self", "value": true }
                    }
                ]
            },
            "minecraft:knockback_resistance": { "value": 1.0 },
            "minecraft:loot": { "table": "loot_tables/entities/armor_stand.json" },
            "minecraft:nameable": {},
            "minecraft:persistent": {},
            "minecraft:physics": {},
            "minecraft:pushable": { "is_pushable": false, "is_pushable_by_piston": true },
            "minecraft:type_family": { "family": ["armor_stand", "inanimate", "mob"] }
        },
        "events": {}
    }
}
```

结合我们对盔甲架的认知，我们就可以看懂它究竟写的是什么了。

- `minecraft:collision_box`：和物品方块类似，这里是定义盔甲架的碰撞箱。
- `minecraft:conditional_bandwidth_optimization`：暂时看不懂它是做什么用的？_不要紧，我们可以暂时把它跳过去_。它事实上是一个网络带宽优化的组件，要介绍起来一时半会儿也说不完。
- `minecraft:health`：显然是定义盔甲架的血量。
- `minecraft:hurt_on_condition`：定义了盔甲架的受伤条件。结合内容我们知道，这是用于施加熔岩伤害的。
- `minecraft:knockback_resistance`：定义了盔甲架的击退抗性。这里定义为了`1.0`，代表最大的击退抗性，这也就是为什么你打盔甲架不会被击退。
- `minecraft:loot`：定义了盔甲架的战利品表。考虑到我们现在还没有正式学习战利品表，让我们先跳过这个组件。
- `minecraft:nameable`：定义盔甲架可用命名牌重命名。事实上这个组件还可以决定实体的名称是否常显示，而不必仅仅在准星对准实体时才显示名字。
- `minecraft:persistent`：定义盔甲架不会被“刷新掉”——或者更严谨地说，定义实体的持久性，不会随着玩家距离变远而自然消失。有关自然消失的定义，我们曾经在讲到`/tickingarea`时有提及过，这里我们就不再过多解释。如果没有这个组件，你在外面冒险完回家后就会惊奇的发现你的盔甲架全部消失了！
- `minecraft:physics`：定义实体的物理属性，主要包括会和方块碰撞、以及会受到重力作用。
- `minecraft:pushable`：定义实体可被推动。结合内容，这里主要是可被其他实体和可被玩家推动。不过，读者需要注意——这个组件在更高的版本已被拆分，读者需要了解一下更高版本使用的组件。
- `minecraft:type_family`：定义实体的家族。有关家族的问题，我们在下文就会详细介绍。

显然，现在我们需要的就是这个`minecraft:physics`，我们直接把它扔到我们自己的实体中：

```json showLineNumbers title="custom_npc.server_entity.json" {10}
{
    "format_version": "1.21.120",
    "minecraft:entity": {
        "description": {
            "identifier": "test:custom_npc",
            "is_summonable": true,
            "is_spawnable": true
        },
        "components": {
            "minecraft:physics": {}
        }
    }
}
```

**小退重进（/reload all 即可）** 可以重新加载我们的实体的新行为。现在再打一次实体，可以发现没有问题了！虽然它的动画看起来还是有些怪异——或者更准确的说，压根没有动画，但那就是我们之后要解决的问题了。

![vanilla_instance_2](/img/tutorials/a2_addons/b6_data_driven_entities/c2_make_first_entity/vanilla_instance_2.webp)

### 更进一步的实例——让实体拥有一个背包

显然，只有一个物理属性是不能满足我们的，我们需要更多功能，比如……现在我们希望让实体拥有一个物品栏，并且可以打开！

我们来想想有什么实体拥有这样的性质：拥有一个物品栏，并且还可以打开这个物品栏……你也许想到了——**运输矿车**！我们现在就来看看运输矿车是怎么写的……

```json showLineNumbers title="chest_minecart.json"
{
    "format_version": "1.26.30",
    "minecraft:entity": {
        "description": {
            "identifier": "minecraft:chest_minecart",
            "is_experimental": false,
            "is_summonable": true,
            "is_spawnable": false,
            "spawn_category": "misc"
        },
        "components": {
            "minecraft:collision_box": { "height": 0.7, "width": 0.98 },
            "minecraft:conditional_bandwidth_optimization": {
                "conditional_values": [
                    {
                        "conditional_values": [{ "operator": "==", "test": "is_moving", "subject": "self", "value": true }],
                        "max_dropped_ticks": 0,
                        "max_optimized_distance": 0.0
                    }
                ],
                "default_values": { "max_dropped_ticks": 20, "max_optimized_distance": 60.0, "use_motion_prediction_hints": true }
            },
            "minecraft:inventory": { "can_be_siphoned_from": true, "inventory_size": 27, "container_type": "minecart_chest" },
            "minecraft:is_stackable": {},
            "minecraft:physics": {},
            "minecraft:pushable_by_entity": {
                "presets": [
                    {
                        "push_mode": "legacy_minecart",
                        "strength_multiplier": 0.1,
                        "min_distance": 0.01,
                        "push_scale_self": 0.5,
                        "push_scale_other": 0.25
                    }
                ]
            },
            "minecraft:pushable_by_block": {},
            "minecraft:rail_movement": {},
            "minecraft:type_family": { "family": ["minecart", "inanimate"] }
        },
        "events": null
    }
}
```

显然，这里有不少组件，在上面的盔甲架中我们都见到过，这说明它们的应用是十分广泛的。我们来看一看我们还没有遇到的组件：

- `minecraft:inventory`：这就是我们所需要的核心组件，它定义了一个实体拥有物品栏。根据其中的内容，我们还可以知道它能否被吸取物品、物品栏大小和容器类型。容器类型是什么我们先不用去管它，一般来说在相关文档里面都有记载。
- `minecraft:is_stackable`：定义运输矿车可以堆叠。  
  <Image src="/img/tutorials/a2_addons/b6_data_driven_entities/c2_make_first_entity/stacked_minecart_1.webp" text="堆叠组件的效果，由下至上堆叠了 4 辆运输矿车，一般的实体是不可堆叠的" size="35%"/>
- `minecraft:pushable_by_entity`和`minecraft:pushable_by_block`：这就是我们前文提到过的被拆分的`minecraft:pushable`。什么时候使用拆分前或拆分后的组件，取决于你使用的格式版本。对于这个组件，`1.26.10`和之后的版本就要使用拆分后的组件了。这个在我们的文档中也是有记录的。事实上，现在有很多组件、或组件内的功能都和格式版本有关，读者在写实体文件时请务必注意。
- `minecraft:rail_movement`：定义实体可以在铁轨上移动。不要小看这个（或这类，之后我们还会接触到许多运动组件）组件，没有这类运动组件，实体就是不可以移动的！

现在，我们把`minecraft:inventory`的组件直接粘贴过去：

```json showLineNumbers title="custom_npc.server_entity.json" {11}
{
    "format_version": "1.21.120",
    "minecraft:entity": {
        "description": {
            "identifier": "test:custom_npc",
            "is_summonable": true,
            "is_spawnable": true
        },
        "components": {
            "minecraft:physics": {},
            "minecraft:inventory": { "inventory_size": 27, "container_type": "minecart_chest" }
        }
    }
}
```

这里我们不希望 NPC 的物品可以被吸走，所以把`can_be_siphoned_from`删掉就好了（但删除的时候需要确保它不是一个必需参数）。现在我们再来试试效果：

<Image src="/img/tutorials/a2_addons/b6_data_driven_entities/c2_make_first_entity/inventory_1.webp" text="自定义 NPC 的物品栏"/>

看，现在我们就可以打开实体的物品栏了！

所以，利用原版实体编写自定义实体就是这样的流程——**先思考我们需要什么功能，然后思考哪些原版实体有这样的功能，再对应地去找相关组件就可以了**。

### 运行时 ID

现在，你有可能跃跃欲试，迫不及待地想要自定义一个新实体了吧？但别急，在这之前我必须要给你浇一盆冷水。

现在我们来打开末影龙的实体文件，我们姑且先不谈`component_groups`和`events`是什么东西，那是我们之后的内容。光是从组件内容上，比如`minecraft:behavior.dragondeath`等，你也可以看到这个组件显然是只给末影龙用的。

```json showLineNumbers title="ender_dragon.json" {31,33-36,40-42}
{
    "format_version": "1.26.0",
    "minecraft:entity": {
        "description": {
            "identifier": "minecraft:ender_dragon",
            "is_summonable": true,
            "is_spawnable": true,
            "spawn_category": "monster"
        },
        "components": {
            "minecraft:attack": { "damage": 3 },
            "minecraft:boss": { "hud_range": 125, "should_darken_sky": false },
            "minecraft:collision_box": { "height": 4, "width": 13 },
            "minecraft:damage_sensor": { "triggers": { "cause": "fall", "deals_damage": "no" } },
            "minecraft:dimension_bound": {},
            "minecraft:fire_immune": {},
            "minecraft:flying_speed": { "value": 0.6 },
            "minecraft:game_event_movement_tracking": { "emit_flap": true },
            "minecraft:health": { "max": 200, "value": 200 },
            "minecraft:is_hidden_when_invisible": {},
            "minecraft:knockback_resistance": { "max": 100, "value": 100 },
            "minecraft:movement": { "value": 0.3 },
            "minecraft:on_death": { "event": "minecraft:start_death", "target": "self" },
            "minecraft:on_start_landing": { "event": "minecraft:start_land", "target": "self" },
            "minecraft:on_start_takeoff": { "event": "minecraft:start_fly", "target": "self" },
            "minecraft:persistent": {},
            "minecraft:physics": { "has_collision": false, "has_gravity": false },
            "minecraft:type_family": { "family": ["dragon", "mob"] }
        },
        "component_groups": {
            "dragon_death": { "minecraft:behavior.dragondeath": { "priority": 0 } },
            "dragon_flying": {
                "minecraft:behavior.dragonchargeplayer": { "priority": 1 },
                "minecraft:behavior.dragonholdingpattern": { "priority": 3 },
                "minecraft:behavior.dragonstrafeplayer": { "priority": 2 },
                "minecraft:behavior.dragontakeoff": { "priority": 0 },
                "minecraft:shooter": { "def": "minecraft:dragon_fireball" }
            },
            "dragon_sitting": {
                "minecraft:behavior.dragonflaming": { "priority": 1 },
                "minecraft:behavior.dragonlanding": { "priority": 0 },
                "minecraft:behavior.dragonscanning": { "priority": 2 }
            }
        },
        "events": {
            "minecraft:entity_spawned": { "add": { "component_groups": ["dragon_flying"] }, "remove": {} },
            "minecraft:start_death": {
                "add": { "component_groups": ["dragon_death"] },
                "remove": { "component_groups": ["dragon_sitting", "dragon_flying"] }
            },
            "minecraft:start_fly": {
                "add": { "component_groups": ["dragon_flying"] },
                "remove": { "component_groups": ["dragon_sitting"] }
            },
            "minecraft:start_land": {
                "add": { "component_groups": ["dragon_sitting"] },
                "remove": { "component_groups": ["dragon_flying"] }
            }
        }
    }
}
```

是的，我们这里在谈的仍然是数据驱动实体的**局限性**，我们即使凭借着原版的 300 多个组件，也依然不能够还原我们 100% 的需求。

更糟糕的是，原版的数据驱动实体也不是完全由组件驱动的。在下面这个实验，你会很清楚地看到这一点。

:::tip[实验 6-1]

久违的实验模块又出现了！我们现在来用原版代码尝试一下自定义一个盔甲架。新增以下文件：

<treeview>

- <FileType type="folder" name="BP_test" />
    - ……
    - <FileType type="folder" name="entities" />
        - <FileType type="folder" name="test" />
            - ……
            - <FileType type="file" name="test_armor_stand.server_entity.json" />：自定义盔甲架的服务端定义文件
- <FileType type="folder" name="RP_test" />
    - ……
    - <FileType type="folder" name="entity" />
        - <FileType type="folder" name="test" />
            - ……
            - <FileType type="file" name="test_armor_stand.client_entity.json" />：自定义盔甲架的客户端定义文件

</treeview>

现在，我们把原版的盔甲架的行为包实体文件和资源包实体文件扔到这两个文件里去，不过我们先不用管这两个文件的具体含义。

```json showLineNumbers title="test_armor_stand.server_entity.json"
{
    "format_version": "1.26.0",
    "minecraft:entity": {
        "description": {
            "identifier": "test:armor_stand",
            "is_experimental": false,
            "is_summonable": true,
            "is_spawnable": false,
            "spawn_category": "misc"
        },
        "components": {
            "minecraft:collision_box": { "height": 1.975, "width": 0.5 },
            "minecraft:conditional_bandwidth_optimization": {},
            "minecraft:health": { "max": 6, "value": 6 },
            "minecraft:hurt_on_condition": {
                "damage_conditions": [
                    {
                        "cause": "lava",
                        "damage_per_tick": 4,
                        "filters": { "operator": "==", "test": "in_lava", "subject": "self", "value": true }
                    }
                ]
            },
            "minecraft:knockback_resistance": { "value": 1.0 },
            "minecraft:loot": { "table": "loot_tables/entities/armor_stand.json" },
            "minecraft:nameable": {},
            "minecraft:persistent": {},
            "minecraft:physics": {},
            "minecraft:pushable": { "is_pushable": false, "is_pushable_by_piston": true },
            "minecraft:type_family": { "family": ["armor_stand", "inanimate", "mob"] }
        }
    }
}
```

```json showLineNumbers title="test_armor_stand.client_entity.json"
{
    "format_version": "1.10.0",
    "minecraft:client_entity": {
        "description": {
            "identifier": "test:armor_stand",
            "min_engine_version": "1.8.0",
            "render_controllers": ["controller.render.armor_stand"],
            "textures": { "default": "textures/entity/armor_stand" },
            "materials": { "default": "armor_stand" },
            "geometry": { "default": "geometry.armor_stand" },
            "animations": {
                "default_pose": "animation.armor_stand.default_pose",
                "no_pose": "animation.armor_stand.no_pose",
                "solemn_pose": "animation.armor_stand.solemn_pose",
                "athena_pose": "animation.armor_stand.athena_pose",
                "brandish_pose": "animation.armor_stand.brandish_pose",
                "honor_pose": "animation.armor_stand.honor_pose",
                "entertain_pose": "animation.armor_stand.entertain_pose",
                "salute_pose": "animation.armor_stand.salute_pose",
                "riposte_pose": "animation.armor_stand.riposte_pose",
                "zombie_pose": "animation.armor_stand.zombie_pose",
                "cancan_a_pose": "animation.armor_stand.cancan_a_pose",
                "cancan_b_pose": "animation.armor_stand.cancan_b_pose",
                "hero_pose": "animation.armor_stand.hero_pose",
                "wiggle": "animation.armor_stand.wiggle",
                "controller.pose": "controller.animation.armor_stand.pose",
                "controller.wiggling": "controller.animation.armor_stand.wiggle",
                "holding_heavy_core": "animation.armor_stand.holding_heavy_core",
                "controller.holding_heavy_core": "controller.animation.armor_stand.holding_heavy_core"
            },
            "scripts": {
                "initialize": ["variable.armor_stand.pose_index = 0;", "variable.armor_stand.hurt_time = 0;"],
                "animate": ["controller.pose", "controller.wiggling", "controller.holding_heavy_core"]
            },
            "enable_attachables": true
        }
    }
}
```

现在直接进入游戏，执行命令：

```text
/summon test:armor_stand
```

现在我们就得到一个自定义的盔甲架。

![custom_armor_stand_1](/img/tutorials/a2_addons/b6_data_driven_entities/c2_make_first_entity/custom_armor_stand_1.webp)

现在，请你尝试击打一下这个盔甲架，再试图给这个盔甲架装备物品，你立刻就能体会到为什么我们说「原版的数据驱动实体也不是完全由组件驱动的」。

:::

显然，单纯用组件定义的盔甲架并不能很好地还原盔甲架的功能。这是因为**原版实体仍然有硬编码的功能**，例如对于盔甲架，受伤方式和装备物品的行为均和纯数据驱动有所区别。为了还原这些硬编码的功能，我们必须在实体描述中添加一个**运行时 ID（Runtime Identifier）**：

```json showLineNumbers title="test_armor_stand.server_entity.json" {7}
{
    "format_version": "1.26.0",
    "minecraft:entity": {
        "description": {
            "identifier": "test:armor_stand",
            ...,
            "runtime_identifier": "minecraft:armor_stand"
        },
        "components": {...}
    }
}
```

在 /reload all 之后，我们立刻看到现在我们的盔甲架和原版的盔甲架已经别无二致。是的，运行时 ID 就是用来启用原版实体的硬编码功能的。

![custom_armor_stand_2](/img/tutorials/a2_addons/b6_data_driven_entities/c2_make_first_entity/custom_armor_stand_2.webp)

相信你也能够看得出来，使用运行时 ID 事实上有一个很致命的缺陷——它会添加一些多余的功能上去。例如，如果我们现在有还原盔甲架的放置装备的需求，但是受伤行为要和一般实体一致的需求时，使用运行时 ID 就无法做到这一点了——因为运行时 ID 只能两个功能都应用，不能选一个去应用。因此，要使用运行时 ID，必须充分考虑到运行时 ID 的缺陷。

## 寻路与运动组件

现在我们定义了两个实体，但我们都知道原版绝大多数的生物（实体）是可以移动的。对于默认实体而言，它是没有任何行为的，也不能进行移动的操作。那究竟是什么让它们移动？

要回答这个问题，我们不妨再打开一个生物的实例，例如……苦力怕！可以看得出来这已经是一个比较复杂的定义文件，现在我们只关注高亮的部分，在下面的第 91、92 和 94 行（下面的代码已经过格式化处理）。如果读者感兴趣，也可以把整个文件的内容都看完，或许你会有新的收获。

```json showLineNumbers title="creeper.json" {91,92,94}
{
    "format_version": "1.26.0",
    "minecraft:entity": {
        "description": {
            "identifier": "minecraft:creeper",
            "is_experimental": false,
            "is_summonable": true,
            "is_spawnable": true,
            "spawn_category": "monster"
        },
        "components": {
            "minecraft:attack": { "damage": 3 },
            "minecraft:behavior.avoid_mob_type": {
                "entity_types": [
                    {
                        "filters": {
                            "AND": [
                                {
                                    "OR": [
                                        { "test": "is_family", "subject": 1, "operator": 0, "value": "ocelot" },
                                        { "test": "is_family", "subject": 1, "operator": 0, "value": "cat" }
                                    ]
                                }
                            ]
                        },
                        "max_dist": 6,
                        "sprint_speed_multiplier": 1.2
                    }
                ],
                "priority": 3
            },
            "minecraft:behavior.float": { "priority": 0 },
            "minecraft:behavior.hurt_by_target": { "priority": 2 },
            "minecraft:behavior.look_at_player": { "look_time": { "min": 1, "max": 2 }, "priority": 6 },
            "minecraft:behavior.melee_attack": { "reach_multiplier": 0, "speed_multiplier": 1.25, "priority": 4 },
            "minecraft:behavior.nearest_attackable_target": {
                "must_see": true,
                "entity_types": [{ "filters": { "AND": [{ "test": "is_family", "subject": 1, "operator": 0, "value": "player" }] } }],
                "priority": 1
            },
            "minecraft:behavior.random_look_around": { "priority": 6 },
            "minecraft:behavior.random_stroll": { "priority": 5, "speed_multiplier": 1 },
            "minecraft:behavior.swell": { "priority": 2, "start_distance": 2.5, "stop_distance": 6 },
            "minecraft:breathable": { "suffocate_time": 0, "total_supply": 15 },
            "minecraft:can_climb": {},
            "minecraft:collision_box": { "height": 1.8, "width": 0.6 },
            "minecraft:conditional_bandwidth_optimization": {},
            "minecraft:damage_sensor": {
                "triggers": {
                    "deals_damage": "no",
                    "on_damage": {
                        "event": "minecraft:become_charged",
                        "filters": { "subject": "other", "test": "is_family", "value": "lightning" }
                    }
                }
            },
            "minecraft:despawn": { "despawn_from_distance": {} },
            "minecraft:experience_reward": { "on_death": { "expression": "query.last_hit_by_player ? 5 : 0", "version": 12 } },
            "minecraft:health": { "max": 20, "value": 20 },
            "minecraft:hurt_on_condition": {
                "damage_conditions": [
                    {
                        "cause": "lava",
                        "damage_per_tick": 4,
                        "filters": { "operator": "==", "test": "in_lava", "subject": "self", "value": true }
                    }
                ]
            },
            "minecraft:interact": {
                "interactions": {
                    "hurt_item": 1,
                    "interact_text": "action.interact.creeper",
                    "on_interact": {
                        "event": "minecraft:start_exploding_forced",
                        "filters": {
                            "all_of": [
                                { "subject": "other", "test": "is_family", "value": "player" },
                                { "domain": "hand", "subject": "other", "test": "has_equipment", "value": "flint_and_steel" },
                                { "operator": "!=", "test": "has_component", "value": "minecraft:explode" }
                            ]
                        },
                        "target": "self"
                    },
                    "play_sounds": "ignite",
                    "swing": true
                }
            },
            "minecraft:is_hidden_when_invisible": {},
            "minecraft:jump.static": {},
            "minecraft:loot": { "table": "loot_tables/entities/creeper.json" },
            "minecraft:movement": { "value": 0.2 },
            "minecraft:movement.basic": {},
            "minecraft:nameable": {},
            "minecraft:navigation.walk": { "can_path_over_water": true, "using_door_annotation": true },
            "minecraft:on_target_escape": { "event": "minecraft:stop_exploding", "target": "self" },
            "minecraft:physics": {},
            "minecraft:pushable": { "is_pushable": true, "is_pushable_by_piston": true },
            "minecraft:target_nearby_sensor": {
                "inside_range": 2.5,
                "on_inside_range": { "event": "minecraft:start_exploding", "target": "self" },
                "on_vision_lost_inside_range": { "event": "minecraft:stop_exploding", "target": "self" },
                "must_see": true,
                "on_outside_range": { "event": "minecraft:stop_exploding", "target": "self" },
                "outside_range": 6
            },
            "minecraft:type_family": { "family": ["creeper", "monster", "mob"] }
        },
        "component_groups": {
            "minecraft:charged_creeper": { "minecraft:is_charged": {} },
            "minecraft:charged_exploding": {
                "minecraft:explode": {
                    "causes_fire": false,
                    "fuse_lit": true,
                    "power": 6,
                    "destroy_affected_by_griefing": true,
                    "fuse_length": 1.5
                }
            },
            "minecraft:exploding": {
                "minecraft:explode": {
                    "causes_fire": false,
                    "fuse_lit": true,
                    "power": 3,
                    "destroy_affected_by_griefing": true,
                    "fuse_length": 1.5
                }
            },
            "minecraft:forced_charged_exploding": {
                "minecraft:explode": {
                    "causes_fire": false,
                    "fuse_lit": true,
                    "power": 6,
                    "destroy_affected_by_griefing": true,
                    "fuse_length": 1.5
                },
                "minecraft:on_target_escape": {},
                "minecraft:target_nearby_sensor": {}
            },
            "minecraft:forced_exploding": {
                "minecraft:explode": {
                    "causes_fire": false,
                    "fuse_lit": true,
                    "power": 3,
                    "destroy_affected_by_griefing": true,
                    "fuse_length": 1.5
                },
                "minecraft:on_target_escape": {},
                "minecraft:target_nearby_sensor": {}
            }
        },
        "events": {
            "minecraft:become_charged": {
                "add": { "component_groups": ["minecraft:charged_creeper"] },
                "remove": { "component_groups": ["minecraft:exploding"] }
            },
            "minecraft:stop_exploding": { "remove": { "component_groups": ["minecraft:exploding"] } },
            "minecraft:start_exploding": {
                "sequence": [
                    {
                        "filters": { "test": "has_component", "operator": "!=", "value": "minecraft:is_charged" },
                        "add": { "component_groups": ["minecraft:exploding"] }
                    },
                    {
                        "filters": { "test": "has_component", "value": "minecraft:is_charged" },
                        "add": { "component_groups": ["minecraft:charged_exploding"] }
                    }
                ]
            },
            "minecraft:start_exploding_forced": {
                "sequence": [
                    {
                        "filters": { "test": "has_component", "operator": "!=", "value": "minecraft:is_charged" },
                        "add": { "component_groups": ["minecraft:forced_exploding"] }
                    },
                    {
                        "filters": { "test": "has_component", "value": "minecraft:is_charged" },
                        "add": { "component_groups": ["minecraft:forced_charged_exploding"] }
                    }
                ]
            }
        }
    }
}
```

这三个组件：

```json
"minecraft:movement": { "value": 0.2 },
"minecraft:movement.basic": {},
"minecraft:navigation.walk": { "can_path_over_water": true, "using_door_annotation": true },
...
```

就是我们这一部分所关注的重点。我们来下个定义——它们分别叫做**运动组件（Movement Components）** 与**寻路组件（Navigation Components）**。

前两个带`movement`的**运动组件给了实体以运动的能力**。其中：

- 第一个`minecraft:movement`是最基础的运动属性，决定实体在运动时的速度如何，`value`越大则速度越快；
- 而后面的`minecraft:movement.basic`则代表了实体以何种形式运动。Minecraft 中包含各类实体，有着不同的运动方式：天上飞的，水里游的，地上跑的，运动方式不尽相同。例如，如果你想让实体在天上飞，那就可以用`minecraft:movement.fly`；如果你想让实体在水里游，那就可以用`minecraft:movement.sway`，以此类推。

而后面的寻路组件`minecraft:navigation.walk`则**允许实体生成一条通往目的地的路径，并引导实体按这个路径走下去**，也就是我们所说的**寻路**。这里的`.walk`显然是允许实体通过走路步行的方式到达目的地。如果你在前面使用了`minecraft:movement.fly`，那就可以让实体使用`minecraft:navigation.fly`寻路方法；如果使用了`minecraft:movement.sway`，则可以使用`minecraft:navigation.swim`，以此类推。

上面的苦力怕的例子中，它就允许了实体可以穿过水直接到达你附近。至于`using_door_annotation`……这个目前文档没有记载，所以我们就先跳过去吧 =P

通常来说，寻路组件和运动组件是一一对应的，但具体什么时候该用什么组件，还是要取决于你的需求。

读者可以在[我们提供的组件列表](/docs/docs/entities/components#寻路与运动组件)中查到所有的寻路和运动组件。

## AI 意向组件

现在，我们可以让实体拥有寻路的能力，也拥有运动到目的地的能力。但问题在于：我们怎么去定义实体的目的地？毕竟没有目的地的情况下，即使实体有寻路的能力，也只能“按兵不动”。这就不得不提到实体的**意向**了。

我们都知道，僵尸会追逐村民、苦力怕会躲避猫、村民会自发地前往工作点，看起来好像实体有自己的智能一样，它们都知道自己要做的事情——是的，这都是实体的 AI 意向导致的。我们仍然来关注一下苦力怕的组件，你注意到下面高亮的组件和未高亮组件的区别了吗？

```json showLineNumbers title="creeper.json" {10-40}
{
    "format_version": "1.26.0",
    "minecraft:entity": {
        "description": {
            "identifier": "minecraft:creeper",
            ...
        },
        "components": {
            "minecraft:attack": { "damage": 3 },
            "minecraft:behavior.avoid_mob_type": {
                "entity_types": [
                    {
                        "filters": {
                            "AND": [
                                {
                                    "OR": [
                                        { "test": "is_family", "subject": 1, "operator": 0, "value": "ocelot" },
                                        { "test": "is_family", "subject": 1, "operator": 0, "value": "cat" }
                                    ]
                                }
                            ]
                        },
                        "max_dist": 6,
                        "sprint_speed_multiplier": 1.2
                    }
                ],
                "priority": 3
            },
            "minecraft:behavior.float": { "priority": 0 },
            "minecraft:behavior.hurt_by_target": { "priority": 2 },
            "minecraft:behavior.look_at_player": { "look_time": { "min": 1, "max": 2 }, "priority": 6 },
            "minecraft:behavior.melee_attack": { "reach_multiplier": 0, "speed_multiplier": 1.25, "priority": 4 },
            "minecraft:behavior.nearest_attackable_target": {
                "must_see": true,
                "entity_types": [{ "filters": { "AND": [{ "test": "is_family", "subject": 1, "operator": 0, "value": "player" }] } }],
                "priority": 1
            },
            "minecraft:behavior.random_look_around": { "priority": 6 },
            "minecraft:behavior.random_stroll": { "priority": 5, "speed_multiplier": 1 },
            "minecraft:behavior.swell": { "priority": 2, "start_distance": 2.5, "stop_distance": 6 },
            "minecraft:breathable": { "suffocate_time": 0, "total_supply": 15 },
            "minecraft:can_climb": {},
            "minecraft:collision_box": { "height": 1.8, "width": 0.6 },
            "minecraft:conditional_bandwidth_optimization": {},
            "minecraft:damage_sensor": {...},
            "minecraft:despawn": { "despawn_from_distance": {} },
            "minecraft:experience_reward": { "on_death": { "expression": "query.last_hit_by_player ? 5 : 0", "version": 12 } },
            "minecraft:health": { "max": 20, "value": 20 },
            "minecraft:hurt_on_condition": {...},
            "minecraft:interact": {...},
            "minecraft:is_hidden_when_invisible": {},
            "minecraft:jump.static": {},
            "minecraft:loot": { "table": "loot_tables/entities/creeper.json" },
            "minecraft:movement": { "value": 0.2 },
            "minecraft:movement.basic": {},
            "minecraft:nameable": {},
            "minecraft:navigation.walk": { "can_path_over_water": true, "using_door_annotation": true },
            "minecraft:on_target_escape": { "event": "minecraft:stop_exploding", "target": "self" },
            "minecraft:physics": {},
            "minecraft:pushable": { "is_pushable": true, "is_pushable_by_piston": true },
            "minecraft:target_nearby_sensor": {...},
            "minecraft:type_family": { "family": ["creeper", "monster", "mob"] }
        },
        "component_groups": {...},
        "events": {...}
    }
}
```

没错！这些组件都是以`minecraft:behavior.`开头的，它们叫做 **AI 意向组件（AI Goal Components）**，这些组件直接决定实体的 AI。我们来看上面涉及到的 AI 意向组件，相信读者能够更直观地感受到这一点：

- `minecraft:behavior.avoid_mob_type`：定义了苦力怕会躲避生物。结合内容，我们知道它会导致苦力怕躲避猫和豹猫。
- `minecraft:behavior.float`：定义了苦力怕会漂浮。事实上，这是说苦力怕会在水中尝试漂浮到水面上，如果不定义，它就会沉底把自己淹死。
- `minecraft:behavior.hurt_by_target`：定义了苦力怕会把攻击自己的实体作为目标。这通常就是我们所说的「仇恨转移」的来源。
- `minecraft:behavior.look_at_player`：定义了苦力怕会在无目标时面向附近的玩家。
    - 如果你对此感到一头雾水，不妨开创造模式后召唤一个苦力怕。当它试图面向你的时候，这时候就是这个组件生效了。
- `minecraft:behavior.melee_attack`：定义了苦力怕会进行近战攻击。
    - 这一点可能会导致你的好奇——苦力怕怎么会近战攻击玩家？事实上，**这主要是为了让苦力怕能够以近战的方式靠近玩家**，而不是真的进行近战，毕竟苦力怕靠近玩家一定距离就会导致爆炸。我们看到有一个参数`reach_multiplier`被设置为 0，就导致苦力怕实际上不能通过近战打到任何一个实体。
- `minecraft:behavior.nearest_attackable_target`：定义了苦力怕会攻击最近的实体。结合内容，我们知道它会导致苦力怕把附近的玩家视为目标。
- `minecraft:behavior.random_look_around`：定义苦力怕在无目标时会随机看向其他地方。
    - 同样地，当苦力怕不再面向你，而是四处乱看时，就是这个组件生效了。如果不定义，苦力怕就会一直盯着你👀
- `minecraft:behavior.random_stroll`：定义苦力怕在无目标时会随机四处游荡。如果不定义，苦力怕就会自生成开始一直待在原地。
- `minecraft:behavior.swell`：定义苦力怕的膨胀行为。
    - 不过不要误会——苦力怕实际的爆炸行为并不是由这个组件决定的，而是一个`minecraft:target_nearby_sensor`组件决定的，它用于在玩家靠近时触发苦力怕的事件，进而触发了爆炸组件启动——这是我们下一节要介绍的内容了。
    - 这个组件只是单纯地给客户端传递一个值，进而影响视觉效果，它并不实际影响实体的运行。
    - 更糟糕的是——文档中记载此组件*只能由苦力怕运行*。┓( ´\_` )┏

希望这些例子能够让读者体会到它们的作用。

### 优先级

我们还需要强调另一个关于 AI 意向的问题。在上面的例子中，我们看到`minecraft:behavior.hurt_by_target`导致仇恨转移（将攻击它的实体视为目标），而`minecraft:behavior.nearest_attackable_target`则会将最近的实体作为目标。

你有没有发现一个问题——这两个组件干的事情好像“冲突”了？

如果在多人游戏中，去攻击已存在目标的苦力怕，会发现苦力怕根本不会进行仇恨转移，而是继续攻击一开始定位到的目标。反观僵尸和骷髅，它们同样拥有这两个组件（读者可以打开对应的文件找一找，虽然很长），并且能迅速将仇恨转移到刚攻击它们的目标。

这就是**优先级（Priority）** 在起作用。**优先级可以在两个组件的目标冲突时，优先使用优先级高的组件**。

**一切 AI 意向组件都可以定义优先级，优先级数字越小，则代表优先级越高**。我们来看苦力怕的例子：

```json showLineNumbers {1,5}
"minecraft:behavior.hurt_by_target": { "priority": 2 },
"minecraft:behavior.nearest_attackable_target": {
    "must_see": true,
    "entity_types": [{ "filters": { "AND": [{ "test": "is_family", "subject": 1, "operator": 0, "value": "player" }] } }],
    "priority": 1
},
```

这里，仇恨转移的优先级是 2，而攻击第一个目标的优先级是 1，这样我们就知道为什么苦力怕不会进行仇恨转移——因为攻击第一目标的优先级更高！那仇恨转移什么时候生效呢？很简单——在苦力怕原本没有目标时，这时没有第一目标，就会进行仇恨转移了。

我们再来看看骷髅的例子。篇幅太长了，我们直接只列出这两个组件的定义：

```json showLineNumbers title="骷髅的仇恨转移组件和攻击第一目标组件定义" {3,20}
"minecraft:behavior.hurt_by_target": {
    "entity_types": [{ "filters": { "operator": "not", "test": "is_family", "subject": "other", "value": "breeze" } }],
    "priority": 1
},
"minecraft:behavior.nearest_attackable_target": {
    "reselect_targets": true,
    "must_see": true,
    "entity_types": [
        { "filters": { "test": "is_family", "subject": "other", "value": "player" } },
        { "filters": { "test": "is_family", "subject": "other", "value": "irongolem" } },
        {
            "filters": {
                "all_of": [
                    { "test": "is_family", "subject": "other", "value": "baby_turtle" },
                    { "test": "in_water", "subject": "other", "value": false }
                ]
            }
        }
    ],
    "priority": 2
},
```

这里就完全反过来了——仇恨转移的优先级要高于攻击第一目标，因此骷髅会出现明显的反击行为。

因此，**在定义 AI 意向时，也需要考虑优先级的作用**。当然，如果你的实体逻辑比较简单，那倒是不需要考虑什么——默认定义优先级是`0`就行了。

## 常用的实体组件 家族及相关命令

考虑到实体的组件实在过多，要求读者一次性全部学会所有组件其实是不太现实的。因此，我们在我们的文档中优先整理了一些[基础属性组件](/docs/docs/entities/components#基础属性组件)，请读者在组件列表中学习。而在使用其他组件时，则可以考虑参考原版实体的功能。

对于家族（Family）这个概念，我们则需要额外强调。通过基础属性组件列表，我们知道我们可以通过`minecraft:type_family`规定实体的家族类型。然而，在命令中，我们却有一点没有介绍过——family 目标选择器参数！是的，我们之所以现在才讲这个参数正是为此。

我们可以通过这个选择器参数选中所有带有同一个家族属性的实体，例如令所有怪物执行命令：

```text
execute as @e[family=monster] run say 我是怪物！
```

## 常见文档
