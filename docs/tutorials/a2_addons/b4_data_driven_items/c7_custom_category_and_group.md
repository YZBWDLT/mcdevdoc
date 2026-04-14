---
sidebar_position: 7
---

# 4.7 物品组与物品分类

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';

> 上次更新：2026 年 4 月 14 日

在前面的学习中，我们已经学会加入了许许多多的物品。然而，随着我们添加的物品逐渐变多，往往发现这些物品堆积在创造模式物品栏中难以区分。这就要求我们将具有类似性质的物品进行整理合并。

我们在前面已经学过，在物品定义中可以在<DataType type="object" name="description"/> - <DataType type="object" name="menu_category"/> - <DataType type="string" name="group"/>中指定一个物品所归属的物品组，但是我们只能将它们归类到[原版的物品组](/docs/docs/items/description#原版使用的物品组)中。有没有一种方式能够允许我们自定义一个新的物品组呢？答案是：有！

## 物品组定义

### 国际版定义法

:::warning[版本适用性警告]

本部分涉及 1.21.60 新增的内容。

:::

为了定义一个物品组，我们需要在行为包新建一个新的文件夹<FileType type="folder" name="item_catalog"/>，然后在该文件夹内部新建一个<FileType type="file" name="crafting_item_catalog.json"/>。这两个文件都是官方固定的文件名，没有我们进一步修改的余地。

<treeview>

- <FileType type="folder" name="BP_test" />
  - <FileType type="folder" name="item_catalog"/>：物品组定义
    - <FileType type="file" name="crafting_item_catalog.json"/>：定义物品在创造模式物品栏和配方书中的分类信息

</treeview>

接下来，我们要向这个 json 文件写入一些东西进去了。我们先定义格式版本，格式版本必须是高于`1.21.60`的版本。

```json showLineNumbers title="crafting_item_catalog.json"
{
    "format_version": "1.21.60"
}
```

现在我们就可以定义物品组了！但首先，我们需要清楚我们究竟要把物品组置于什么物品分类下，这可以按如下的方式实现，这里我们把物品分类设定为「物品」。

```json showLineNumbers title="crafting_item_catalog.json" {3-9}
{
    "format_version": "1.21.60",
    "minecraft:crafting_items_catalog": {
        "categories": [
            {
                "category_name": "items"
            }
        ]
    }
}
```

接下来定义物品组的基本属性，也就是其图标和名称。这里，我们可以考虑新建一个“面团”的物品组，并且把图标设置为面团。这里需要强调的是，将物品组命名为`test:itemGroup.name.dough`完全是出于原版物品组的习惯。读者完全可以命名为其他名字，比如`test:dough`，**但无论如何物品组必须带有命名空间**。

```json showLineNumbers title="crafting_item_catalog.json" {7-14}
{
    "format_version": "1.21.60",
    "minecraft:crafting_items_catalog": {
        "categories": [
            {
                "category_name": "items",
                "groups": [
                    {
                        "group_identifier": {
                            "icon": "test:dough",
                            "name": "test:itemGroup.name.dough"
                        }
                    }
                ]
            }
        ]
    }
}
```

最后，我们只需要指定要把哪些物品放进去：

```json showLineNumbers title="crafting_item_catalog.json" {13-16}
{
    "format_version": "1.21.60",
    "minecraft:crafting_items_catalog": {
        "categories": [
            {
                "category_name": "items",
                "groups": [
                    {
                        "group_identifier": {
                            "icon": "test:dough",
                            "name": "test:itemGroup.name.dough"
                        },
                        "items": [
                            "test:dough",
                            "test:golden_dough"
                        ]
                    }
                ]
            }
        ]
    }
}
```

看，效果是不是很好？

![item_group_1](/img/tutorials/a2_addons/b4_data_driven_items/c7_custom_category_and_group/item_group_1.png)

**我们也可以在数驱物品定义中将其放入我们新增的物品组**。比如，对于面团，我们可以提高其格式版本到`1.21.60`（这是为了在
<DataType type="string" name="group"/>参数中能够允许命名空间），然后新增<DataType type="string" name="group"/>的定义：

```json showLineNumbers title="dough.item.json" {2,8}
{
    "format_version": "1.21.60",
    "minecraft:item": {
        "description": {
            "identifier": "test:dough",
            "menu_category": {
                "category": "items",
                "group": "test:itemGroup.name.dough"
            }
        },
        ...
    }
}
```

这样，就无需在<FileType type="file" name="crafting_item_catalog.json"/>再次进行定义了。

在实际注册到创造模式物品栏的过程中，游戏会先按顺序注册<FileType type="file" name="crafting_item_catalog.json"/>中的物品，再注册分立的物品。

![item_group_2](/img/tutorials/a2_addons/b4_data_driven_items/c7_custom_category_and_group/item_group_2.png)

现在读者可以在[我们提供的文档](/docs/docs/items/description#物品分类与物品组)中查阅国际版物品组所支持的格式。

### 中国版定义法

中国版和国际版则不太一样。中国版在很早之前就已经加入了这个功能，所以读者事实上可以不需要担心版本是否过低的问题。但也正因如此，中国版的写法和国际版是完全不一样的。

:::warning[版本适用性警告]

本部分介绍的内容仅限中国版且仅限中国版物品可用，因为国际版物品无法在中国版的创造模式物品栏中注册。

:::

现在，我们要在行为包新建一个新的文件夹<FileType type="folder" name="netease_group"/>，然后在该文件夹内部新建一个<FileType type="file" name="group_config.json"/>。和国际版不同，json 文件的名称是读者任意指定的，这里我们采用中国版官方的规范。

<treeview>

- <FileType type="folder" name="BP_test" />
  - <FileType type="folder" name="netease_group"/>：物品组定义
    - <FileType type="file" name="group_config.json"/>：定义物品在创造模式物品栏和配方书中的分类信息

</treeview>

类似地，我们现在来定义一个新的物品分组。和国际版不一样的是，**中国版的物品分组置于何种物品分类下取决于图标物品，因此无需我们来额外指定分组的物品分类**。例如，我们定义面团的物品组如下：

```json showLineNumbers title="group_config.json"
{
    "groups": [
        {
            "group_name": "test:itemGroup.name.dough",
            "icon": "test:dough",
            "list": [
                "test:dough",
                "test:golden_dough"
            ]
        }
    ]
}
```

读者可以发现，和国际版的定义相比，我们都定义了物品组的名称、图标和物品列表，而国际版还需要额外指定物品分类。要注意，只有`test:dough`和`test:golden_dough`均为中国版物品且处于同一个物品分类时，才能正确创建物品组。有关中国版的物品组定义方法，读者可见[我们提供的这篇文档](/docs/docs/items/description#物品分类与物品组)。

![item_group_3](/img/tutorials/a2_addons/b4_data_driven_items/c7_custom_category_and_group/item_group_3.png)

## 物品分类定义

:::warning[版本适用性警告]

本部分介绍的内容仅限中国版且仅限中国版物品可用，因为国际版物品无法在中国版的创造模式物品栏中注册。

:::

中国版除了可以自定义物品组之外，还可以自定义物品分类！

我们现在来定义一个新的物品分类`test`，然后把我们定义的物品都放在这里面。我们先按照下文创建新的文件路径，同样地，json 文件的名称是读者任意指定的，这里我们继续采用中国版官方的规范。

<treeview>

- <FileType type="folder" name="BP_test" />
  - <FileType type="folder" name="netease_tab"/>：物品分类定义
    - <FileType type="file" name="category_config.json"/>

</treeview>

然后如此定义：

```json showLineNumbers title="category_config.json"
{
    "category": [
        {
            "name": "test",
            "labelText": "itemCategory.name.test",
            "icon": "textures/items/dough"
        }
    ]
}
```

这段代码的效果如下：

![item_category_1](/img/tutorials/a2_addons/b4_data_driven_items/c7_custom_category_and_group/item_category_1.png)

这段代码是很好解释的。我们定义了一个名为`test`的物品分类，就像原版的`nature`、`equipment`等一样。同时，通过`labelText`字段定义了物品分类的显示名称，并用`icon`定义了它的图标。注意这里的图标应该定义完整的文件路径，而不再是某个特殊的物品。

此外，每个物品分类还允许一个<DataType type="boolean" name="sort_by_identifier"/>属性，以进行物品排序。同样地，有关中国版的物品分类定义方法，读者可见[我们提供的这篇文档](/docs/docs/items/description#物品分类与物品组)。

要把物品放到我们自定义的物品分类中，只需要在物品定义中的描述部分指定它的`category`即可：

```json showLineNumbers title="BP/netease_items_beh/dough.item.json" {6}
{
    "format_version": "1.16.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:dough",
            "category": "test"
        },
        "components": { ... }
    }
}
```

---

## 总结

到此为止，我们就介绍完了几乎全部有关自定义物品的内容了！在本节我们主要介绍了如何自定义物品组和物品分类。

国际版可以自定义物品组，在<FileType type="folder" name="BP"/> - <FileType type="folder" name="item_catalog"/> - <FileType type="file" name="crafting_item_catalog.json"/>中定义新的物品组。

中国版不仅可以自定义物品组，也可以自定义物品分类。中国版在<FileType type="folder" name="BP"/> - <FileType type="folder" name="netease_group"/> - <FileType type="file" name="*.json"/>中定义物品组，在<FileType type="folder" name="BP"/> - <FileType type="folder" name="netease_tab"/> - <FileType type="file" name="*.json"/>中定义物品分类。和国际版不同，物品组处于何种物品分类取决于图标的物品分类。

[我们提供的这篇文档](/docs/docs/items/description#物品分类与物品组)记载了详细的格式信息，读者可以查阅。

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
