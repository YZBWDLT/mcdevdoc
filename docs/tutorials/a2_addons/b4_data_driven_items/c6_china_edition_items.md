---
sidebar_position: 6
---

# 4.6 中国版物品

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

> 上次更新：2026 年 4 月 14 日

:::warning[注意]

本教程所介绍的内容仅中国版可用。

:::

现在我们来学习中国版物品。

在前面五节，我们学习的都是国际版物品的写法。对于中国版来说，虽然国际版物品当然也是可用的，但难免会遇到接口不足的情况。好在，不管网易目前处于什么样的舆论状态，有一点是我们必须要承认的 —— 网易在 Minecraft 开发这方面是比国际版要上心的。因此，你也能看见在我们所给出的[物品文档](/docs/docs/items/components#中国版组件)中，**中国版的独有物品组件确实占下了很大一部分**。而且，这些组件早在国际版 1.20 物品组件大开放之前就早已开放，可以说在这方面，网易是远远超前于微软的。

话虽如此，放到现在来讲，超前性放到现在来讲可能也是一种负担 —— 因为**网易所基于的数驱物品仍然是旧版本的数驱物品**，这代表着有不少高版本的组件我们都不能在中国版物品中使用。例如在 1.21.40 加入的`minecraft:storage_item`组件，就不要想着能在中国版物品应用了，乖乖使用高版本的国际版物品吧。

:::warning[注意]

国际版物品在中国版定义会出现问题：

- **高版本物品无法注册到创造模式的物品栏中，只能通过命令获取**。
- 定义到<FileType type="folder" name="items"/>中的国际版物品均会在内容日志报错：`[Item][warning]-Item '(物品ID)' has already been overridden by a pack higher in the pack stack!`

如果你无法接受这一点，请使用中国版物品。

:::

## 编写中国版物品

要让中国版的 Minecraft 识别出这是中国版物品，我们就不能再把物品放到<FileType type="folder" name="items" />文件夹里了。按照[网易所提供的文档](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/1-%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E5%93%81/1-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9F%BA%E7%A1%80%E7%89%A9%E5%93%81.html?catalog=1)，我们要将物品的服务端文件放到行为包的<FileType type="folder" name="netease_items_beh" />里，而客户端文件放到资源包的<FileType type="folder" name="netease_items_res" />里，也就是：

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="netease_items_beh"/>
    - **<FileType type="file" name="(物品 ID).json"/>：定义物品的行为**
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="netease_items_res"/>
    - **<FileType type="file" name="(物品 ID).json"/>：定义物品的渲染表现**

</treeview>

接下来我们就可以开始定义了。

### 中国版物品的描述

和国际版旧版本物品相比，中国版物品的描述多了一些内容，读者可以[在我们给出的文档](/docs/docs/items/description#行为包定义格式)中查看。具体来说，是多了下面三个内容：

- <DataType type="string" name="category"/>：定义物品在创造模式物品栏中的分类。
- <DataType type="boolean" name="register_to_create_menu"/>：是否注册到创造模式物品栏中。
- <DataType type="string" name="custom_item_type"/>：自定义物品类别，可选值有`weapon`、`armor`、`egg`、`ranged_weapon`、`bucket`、`projectile_item`、`shield`。在后面的内容中，我们才会看到这个参数是有用的。

这里，你还能看到中国版的超前性，例如`register_to_create_menu`参数就是先于国际版加入的，高版本国际版物品使用`is_hidden_in_commands`参数，而低版本的国际版物品并不支持这个参数。

### 中国版物品的组件

中国版的物品是基于旧版本组件的，在我们的文档中给出「中国版」标签的即为中国版可用的标签。中国版独有的物品组件一共有 18 个，而其中 9 个都能实现一定程度上的平替。具体的组件内容读者可以阅读我们给出的[物品组件文档](/docs/docs/items/components#中国版组件)。

## 在中国版实现自定义的剑

现在我们以前面实现过的红宝石剑为例，通过旧版本组件和中国版组件实现一把红宝石剑！查阅所有组件，我们看到大概需要用到下面的组件：

- [`minecraft:hand_equipped`](/docs/docs/items/components#minecrafthand_equipped-1)
- [`minecraft:icon`](/docs/docs/items/components#minecrafticon-1)
- [`minecraft:max_damage`](/docs/docs/items/components#minecraftmax_damage)
- [`minecraft:max_stack_size`](/docs/docs/items/components#minecraftmax_stack_size-1)
- [`netease:weapon`](/docs/docs/items/components#neteaseweapon)：定义物品为武器

注意到`netease:weapon`组件要求我们在描述中规定`custom_item_type`为`weapon`，因此我们需要先行规定。此外需要注意，因为我们写的是中国版物品，所以`minecraft:icon`依然要在客户端文件中指定，当然我们推荐两个文件都写上，没什么坏处。

我们先来回顾一下我们按照高版本组件是如何实现的红宝石剑：

```json showLineNumbers title="ruby_sword.item.json"
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

现在，对应地，我们按照文档的指示可以得到下面的中国版物品专用代码：

```json showLineNumbers title="ruby_sword.item.json（行为包）"
{
    "format_version": "1.16.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:ruby_sword",
            "category": "equipment",
            "register_to_create_menu": true,
            "custom_item_type": "weapon"
        },
        "components": {
            "minecraft:hand_equipped": true,
            "minecraft:max_damage": 1500,
            "minecraft:max_stack_size": 1,
            "netease:weapon": {
                "type": "sword",
                "level": 3,
                "speed": 0,
                "attack_damage": 7,
                "enchantment": 13
            }
        }
    }
}
```

```json showLineNumbers title="ruby_sword.item.json（资源包）"
{
    "format_version": "1.16.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:ruby_sword",
            "category": "equipment"
        },
        "components": {
            "minecraft:icon": "ruby_sword"
        }
    }
}
```

可以看到，效果还是很不错的：

![ruby_sword_1](/img/tutorials/a2_addons/b4_data_driven_items/c6_china_edition_items/ruby_sword_1.png)

因为设定了`"custom_item_type": "weapon"`，所以这个物品事实上也拥有了剑的独有的物品属性，比如不可破坏、挖竹子蜘蛛网会加速等，而不需要额外指定对应组件。然而，相比于拥有后发优势的国际版，中国版的自定义剑仍然有一个缺陷 —— 不能指定修复物品。按照上文所写出来的自定义剑，必须使用钻石才能修复，而不是用一个单独的`minecraft:repairable`组件指定修复物品。可以看到，中国版数驱物品同样有很大的局限性。

![ruby_sword_2](/img/tutorials/a2_addons/b4_data_driven_items/c6_china_edition_items/ruby_sword_2.png)

中国版的超前性在某种程度上也体现为落后性，例如要实现镐、斧、锹、锄等工具的时候，`netease:weapon`组件依然是关键组件，这却是比较反直觉的。

## 中国版专属编辑器：MCStudio

中国版还有一个很明显的优势在于 —— 网易专门为中国版的开发者开发了一套可视化的编程 IDE！它的全名叫 MCStudio，我们通常习惯称其为 MCS。你可以在中国版的官网找到 MCS 并下载，但需要注意使用 MCS 必须拥有一个开发者账号。本文不希望在如何注册开发者账号的问题上多费笔墨，读者可以自行阅读[网易给出的这篇教程](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/12-%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/10-%E6%B3%A8%E5%86%8C%E6%88%90%E4%B8%BA%E5%BC%80%E5%8F%91%E8%80%85.html?catalog=1)。

MCS 的一个关键功能在于，你可以直接打开一个中国版测试版的开发实例，按下图操作即可。

![mcs_1](/img/tutorials/a2_addons/b4_data_driven_items/c6_china_edition_items/mcs_1.png)

:::note

比较滑稽的是，在我的电脑上暂时无法开启编辑器，总是会卡「下载失败，错误代码 -2」……所以后面的教程暂时写不了了，等之后有时间，MCS 变得正常了之后再补上。

:::

<!--

在登录了 MCS 后，我们便可以开始写我们的附加包了。首先我们从一个空白模板出发进行设计：

![mcs_1](/img/tutorials/a2_addons/b4_data_driven_items/c6_china_edition_items/mcs_1.png)

注意指定命名空间，这里我们采用`test`命名空间，然后启动编辑：

![mcs_2](/img/tutorials/a2_addons/b4_data_driven_items/c6_china_edition_items/mcs_2.png)

-->

---

## 总结

编写中国版物品，需要注意在中国版物品的专属文件夹下编写。

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="netease_items_beh"/>
    - **<FileType type="file" name="(物品 ID).json"/>：定义物品的行为**
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="netease_items_res"/>
    - **<FileType type="file" name="(物品 ID).json"/>：定义物品的渲染表现**

</treeview>

文档内已经给出中国版物品的可用描述参数、组件等，读者可按需查阅。注意中国版物品可用的组件仅限旧版本组件和中国版组件，不能使用高版本组件。

此外，中国版开发者还可以尝试灵活运用 MCS，它的可视化编辑页面可以帮助你在不写代码的情况下就实现某些简单功能。

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
