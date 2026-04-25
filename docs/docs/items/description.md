---
sidebar_position: 1
---

# 数据驱动物品

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

> 适用版本：国际版 1.21.130，中国版 3.7（1.21.50）。

数据驱动物品（Data-Driven Items，简称数驱物品）是由开发者给定数据，由游戏引擎自行注册的物品。

数驱物品由行为包和资源包组成。国际版和中国版均可编写数驱物品。数驱物品分为国际版物品和中国版物品，两者的编写流程有所不同。

---

## 文件架构

<Tabs><TabItem value="国际版" label="国际版" default>

| 可用性 | 可用版本 | 组件可用性 | 物品格式版本 |
| ----- | ------- | -------- | ---------- |
| 中国版和国际版均可用 | 1.20.0+ | <Version/> | `1.20.0`或更高 |

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="items"/>
    - **[<FileType type="file" name="(物品 ID).item.json"/>](#行为包定义格式)：定义物品的行为和渲染表现**
  - <FileType type="folder" name="item_catalog"/>
    - **[<FileType type="file" name="crafting_item_catalog.json"/>](./item_category_and_group#自定义物品组)：物品在创造模式物品栏和配方书中的分类信息（1.21.60+）**
  - <FileType type="folder" name="recipes"/>
    - **[<FileType type="file" name="(物品 ID).recipe.json"/>](recipes)：定义物品的配方表**，亦可用于原版物品
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="texts"/>
    - **[<FileType type="file" name="en_US.lang"/>](#语言文件键名)：定义物品的英文译名**
    - **[<FileType type="file" name="zh_CN.lang"/>](#语言文件键名)：定义物品的中文译名**
  - <FileType type="folder" name="textures"/>
    - <FileType type="folder" name="items"/>
      - **<FileType type="image" name="(物品 ID).png"/>：定义物品的贴图**
    - **[<FileType type="file" name="item_texture.json"/>](#item_texturejson)：物品贴图注册**

</treeview>

</TabItem><TabItem value="国际版（旧版）" label="国际版（旧版）" default>

| 可用性 | 可用版本 | 组件可用性 | 物品格式版本 |
| ----- | ------- | -------- | ---------- |
| 中国版和国际版均可用 | 1.11.0+ | <Version isLowVersion/> | `1.10`~`1.16.0` |

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="items"/>
    - **[<FileType type="file" name="(物品 ID).item.json"/>](#行为包定义格式)：定义物品的行为**
  - <FileType type="folder" name="recipes"/>
    - **[<FileType type="file" name="(物品 ID).recipe.json"/>](recipes)：定义物品的配方表**，亦可用于原版物品
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="items"/>
    - **[<FileType type="file" name="(物品 ID).json"/>](#资源包定义格式)：定义物品的渲染表现**
  - <FileType type="folder" name="texts"/>
    - **[<FileType type="file" name="en_US.lang"/>](#语言文件键名)：定义物品的英文译名**
    - **[<FileType type="file" name="zh_CN.lang"/>](#语言文件键名)：定义物品的中文译名**
  - <FileType type="folder" name="textures"/>
    - <FileType type="folder" name="items"/>
      - **<FileType type="image" name="(物品 ID).png"/>：定义物品的贴图**
    - **[<FileType type="file" name="item_texture.json"/>](#item_texturejson)：物品贴图注册**

</treeview>

</TabItem><TabItem value="中国版" label="中国版" default>

| 可用性 | 可用版本 | 组件可用性 | 物品格式版本 |
| ----- | ------- | -------- | ---------- |
| 中国版可用 | —— | <Version isChinaVersion/> | `1.10` |

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="netease_items_beh"/>
    - **[<FileType type="file" name="(物品 ID).json"/>](#行为包定义格式)：定义物品的行为**
  - <FileType type="folder" name="netease_group"/>
    - **[<FileType type="file" name="*.json"/>](./item_category_and_group#自定义物品组)：定义物品组，名称可任意指定（例如 crafting_item_catalog.json 或 group_config.json）**
  - <FileType type="folder" name="netease_tab"/>
    - **[<FileType type="file" name="*.json"/>](./item_category_and_group#自定义物品分类)：定义物品分类，名称可任意指定（例如  crafting_item_catalog.json 或 category_config.json）**
  - <FileType type="folder" name="netease_recipes"/>
    - **[<FileType type="file" name="(物品 ID).json"/>](recipes)：定义物品的配方表**，亦可用于原版物品
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="netease_items_res"/>
    - **[<FileType type="file" name="(物品 ID).json"/>](#资源包定义格式)：定义物品的渲染表现**
  - <FileType type="folder" name="texts"/>
    - **[<FileType type="file" name="en_US.lang"/>](#语言文件键名)：定义物品的英文译名**
    - **[<FileType type="file" name="zh_CN.lang"/>](#语言文件键名)：定义物品的中文译名**
  - <FileType type="folder" name="textures"/>
    - <FileType type="folder" name="items"/>
      - **<FileType type="image" name="(物品 ID).png"/>：定义物品的贴图**
    - **[<FileType type="file" name="item_texture.json"/>](#item_texturejson)：物品贴图注册**

</treeview>

</TabItem></Tabs>

---

## 行为包配置

### 行为包定义格式

以下为 <FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="items"/>（或<FileType type="folder" name="netease_items_beh"/>） - <FileType type="file" name="(物品 ID).json"/> 的结构。

<Tabs><TabItem value="国际版（1.20.30+）" label="国际版（1.20.30+）" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定物品可用的功能。应填写为`1.20.30`或更高的版本。
  - <DataType type="object" name="minecraft:item" isRequired/>：定义数驱物品。
    - <DataType type="object" name="description" isRequired/>：物品描述，定义物品的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义物品的命名空间和物品 ID。
      - <DataType type="object" name="menu_category"/>：定义物品的分类和组别。
        - <DataType type="string" name="category"/>：定义物品在创造模式物品栏中的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）、`none`（空）。
        - <DataType type="string" name="group"/>：定义物品在创造模式物品栏中置于何物品组中，详见[物品组与物品分类](./item_category_and_group#物品组)。  
        在格式版本为`1.21.50`或更低时，不能添加命名空间；在格式版本为`1.21.60`或更高时，必须添加命名空间。
        - <DataType type="boolean" name="is_hidden_in_commands"/>：定义物品是否隐藏在命令中。
    - <DataType type="object" name="components"/>：物品组件，定义物品的功能。
      - <DataType name="minecraft:(component)"/>：物品组件，可用的物品组件见[数据驱动物品组件](./components)。

</treeview>

</TabItem><TabItem value="国际版（1.20.0~1.20.30）" label="国际版（1.20.0~1.20.30）" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定物品可用的功能。应填写为`1.20.0`\~`1.20.30`的版本。
  - <DataType type="object" name="minecraft:item" isRequired/>：定义数驱物品。
    - <DataType type="object" name="description" isRequired/>：物品描述，定义物品的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义物品的命名空间和物品 ID。
      - <DataType type="string" name="category"/>：定义物品在创造模式物品栏中的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）。
    - <DataType type="object" name="components" isRequired/>：物品组件，定义物品的功能。
      - <DataType name="minecraft:(component)"/>：物品组件，可用的物品组件见[数据驱动物品组件](./components)。

</treeview>

</TabItem><TabItem value="国际版（旧版）" label="国际版（旧版）" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定物品可用的功能。应填写为`1.10`\~`1.16.0`的版本。
  - <DataType type="object" name="minecraft:item" isRequired/>：定义数驱物品。
    - <DataType type="object" name="description" isRequired/>：物品描述，定义物品的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义物品的命名空间和物品 ID。
    - <DataType type="object" name="components" isRequired/>：物品组件，定义物品的功能。
      - <DataType name="minecraft:(component)"/>：物品组件，可用的物品组件见[数据驱动物品组件（旧版）](./components#旧版本组件)。

</treeview>

</TabItem><TabItem value="中国版" label="中国版" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定物品可用的功能。应填写为`1.10`。
  - <DataType type="object" name="minecraft:item" isRequired/>：定义数驱物品。
    - <DataType type="object" name="description" isRequired/>：物品描述，定义物品的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义物品的命名空间和物品 ID。
      - <DataType type="string" name="category"/>：定义物品在创造模式物品栏中的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）、`commands`（只有命令和 API 可获取）、`none`（只有 API 可获取）。也可设置为自定义分类，详见[物品组与物品分类](./item_category_and_group#物品分类)。
      - <DataType type="boolean" name="register_to_create_menu"/>：是否注册到创造模式物品栏中。
      - <DataType type="string" name="custom_item_type"/>：自定义物品类别，可选值有`weapon`、`armor`、`egg`、`ranged_weapon`、`bucket`、`projectile_item`、`shield`。
    - <DataType type="object" name="components" isRequired/>：物品组件，定义物品的功能。
      - <DataType name="minecraft:(component)"/>：物品组件，可用的物品组件见[数据驱动物品组件（中国版）](./components#中国版组件)。

</treeview>

</TabItem></Tabs>

---

## 资源包配置

### 资源包定义格式

以下为 <FileType type="folder" name="resource_packs"/> - <FileType type="folder" name="items"/>（或<FileType type="folder" name="netease_items_res"/>） - <FileType type="file" name="(物品 ID).json"/> 的结构。

<Tabs><TabItem value="国际版（旧版）" label="国际版（旧版）" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定物品可用的功能。应填写为`1.10`\~`1.16.0`的版本。
  - <DataType type="object" name="minecraft:item" isRequired/>：定义数驱物品。
    - <DataType type="object" name="description" isRequired/>：物品描述，定义物品的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义物品的命名空间和物品 ID。
      - <DataType type="string" name="category"/>：定义物品在创造模式物品栏中的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）。
    - <DataType type="object" name="components" isRequired/>：物品组件，定义物品的功能。
      - <DataType name="minecraft:(component)"/>：物品组件，可用的物品组件见[数据驱动物品组件（旧版）](./components#旧版本组件)。

</treeview>

</TabItem><TabItem value="中国版" label="中国版" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定物品可用的功能。应填写为`1.10`。
  - <DataType type="object" name="minecraft:item" isRequired/>：定义数驱物品。
    - <DataType type="object" name="description" isRequired/>：物品描述，定义物品的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义物品的命名空间和物品 ID。
    - <DataType type="object" name="components" isRequired/>：物品组件，定义物品的功能。
      - <DataType name="minecraft:(component)"/>：物品组件，可用的物品组件见[数据驱动物品组件（中国版）](./components#中国版组件)。

</treeview>

</TabItem></Tabs>

### `item_texture.json`

以下为 <FileType type="folder" name="resource_packs"/> - <FileType type="folder" name="textures"/> - <FileType type="file" name="item_texture.json"/> 的结构。

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="resource_pack_name"/>：资源包的包名。原版使用`vanilla`。[^1]
  - <DataType type="string" name="texture_name"/>：贴图名。原版使用`atlas.items`。[^1]
  - <DataType type="object" name="texture_data" isRequired/>：贴图数据。
    - <DataType type="object" name="(短 ID)"/>：`短 ID`对应的实际贴图。`短 ID`由物品定义的`minecraft:icon`组件指定。
      - <DataType type="string" name="textures"/>：贴图路径，从`textures/`开始，不带后缀，例如`textures/items/apple`。

</treeview>

[^1]: 目前该参数的实际意义不明。

### 语言文件键名

- 对于国际版物品，键名一般为`item.(命名空间):(ID)`，除非使用`minecraft:display_name`组件更改。例如`doc:my_item`使用`item.doc:my_item`的键名。
- 对于国际版旧版物品或中国版物品，键名一般为`item.(命名空间):(ID).name`。例如`doc:my_item`使用`item.doc:my_item.name`的键名。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [物品定义属性 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemdefinition?view=minecraft-bedrock-stable)
- [自定义基础物品 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品.html?catalog=1)
- [物品文档 | 1.16.20.3 | bedrock.dev](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Item)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
