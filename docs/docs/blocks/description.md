---
sidebar_position: 1
---

# 数据驱动方块

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

> 上次更新：2026 年 4 月 21 日。中国版最新版本为 1.21.90，国际版最新版本为 26.10。

数据驱动方块（Data-Driven Blocks，简称数驱方块）是由开发者给定数据，由游戏引擎自行注册的方块。

数驱方块由行为包和资源包组成。国际版和中国版均可编写数驱方块。数驱方块分为国际版方块和中国版方块，两者的编写流程有所不同。

## 文件架构

<Tabs><TabItem value="国际版" label="国际版" default>

| 可用性 | 可用版本 | 组件可用性 | 物品格式版本 |
| ----- | ------- | -------- | ---------- |
| 中国版和国际版均可用 | 1.12.0+ | <Version/> | `1.10.0`或更高 |

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="blocks"/>
    - **<FileType type="file" name="(方块 ID).block.json"/>：行为包方块定义**
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="block_culling"/>
    - **<FileType type="file" name="*.json"/>：定义方块面剔除规则**
  - <FileType type="folder" name="models"/>
    - <FileType type="folder" name="block"/>
      - **<FileType type="file" name="*.geo.json"/>：定义方块模型**
  - <FileType type="folder" name="texts"/>
    - **<FileType type="file" name="en_US.lang"/>：定义方块的英文译名**
    - **<FileType type="file" name="zh_CN.lang"/>：定义方块的中文译名**
  - <FileType type="folder" name="textures"/>
    - <FileType type="folder" name="blocks"/>
      - **<FileType type="image" name="*.png"/>：定义方块的贴图，通常建议命名为和方块 ID 有关的文件名**
    - **<FileType type="file" name="terrain_texture.json"/>：方块贴图注册**
  - **<FileType type="file" name="blocks.json"/>：资源包方块定义**
  - **<FileType type="file" name="sounds.json"/>：音效定义，定义方块的音效**

</treeview>

</TabItem><TabItem value="中国版" label="中国版" default>

| 可用性 | 可用版本 | 组件可用性 | 物品格式版本 |
| ----- | ------- | -------- | ---------- |
| 中国版可用 | —— | <Version isChinaVersion/> | `1.10` |

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="netease_blocks"/>
    - **<FileType type="file" name="(方块 ID).block.json"/>：行为包方块定义**
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="texts"/>
    - **<FileType type="file" name="en_US.lang"/>：定义方块的英文译名**
    - **<FileType type="file" name="zh_CN.lang"/>：定义方块的中文译名**
  - <FileType type="folder" name="textures"/>
    - <FileType type="folder" name="blocks"/>
      - **<FileType type="image" name="*.png"/>：定义方块的贴图，通常建议命名为和方块 ID 有关的文件名**
    - **<FileType type="file" name="terrain_texture.json"/>：方块贴图注册**
  - **<FileType type="file" name="blocks.json"/>：资源包方块定义**
  - **<FileType type="file" name="sounds.json"/>：音效定义，定义方块的音效**

</treeview>

</TabItem></Tabs>

## 行为包配置

### 行为包定义格式

以下为 <FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="blocks"/>（或<FileType type="folder" name="netease_blocks"/>） - <FileType type="file" name="(方块 ID).json"/> 的结构。

<Tabs><TabItem value="国际版" label="国际版" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定方块可用的功能。填写版本取决于目标版本，如果是低于 26.0 的版本（1.xx.yy）填写为`1.xx.y0`，高于 26.0 的版本（xx.yy）填写为`1.xx.y0`。
  - <DataType type="object" name="minecraft:block" isRequired/>：定义数驱方块。
    - <DataType type="object" name="description" isRequired/>：方块描述，定义方块的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义方块的命名空间和方块 ID。
      - <DataType type="object" name="menu_category" isRequired/>：（1.19.30+）定义方块的分类和组别。
        - <DataType type="string" name="category"/>：定义方块在创造模式物品栏中的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）、`none`（空）。
        - <DataType type="string" name="group"/>：定义方块在创造模式物品栏中置于何物品组中，详见[物品组与物品分类](../items/item_category_and_group#物品组)。  
        在格式版本为`1.21.50`或更低时，不能添加命名空间；在格式版本为`1.21.60`或更高时，必须添加命名空间。
        - <DataType type="boolean" name="is_hidden_in_commands"/>：（1.19.40+）定义方块是否隐藏在命令中。
      - <DataType type="object" name="states"/>[^1]：（1.20.20+）定义方块状态。
        - <DataType type="array" name="(方块状态 ID)"/>：方块状态，需注意每种方块状态允许的状态值不能超过 16 种
          - <DataType type="string"/><DataType type="boolean"/><DataType type="int"/>：方块状态枚举
      - <DataType type="object" name="traits"/>：（1.20.20+）定义方块特征，以引用原版的方块特征并应用原版的方块状态。
        - <DataType type="object" name="minecraft:(traits)"/>：方块特征，可用的方块特征详见[方块特征](./traits)。
    - <DataType type="object" name="components" isRequired/>：方块组件，定义方块的功能。
      - <DataType name="minecraft:(component)"/>：方块组件，可用的方块组件见[数据驱动方块组件](./components)。
    - <DataType type="array" name="permutations"/>：（1.19.70+）方块置换，定义方块在满足特定条件时使用何种特定功能。
      - <DataType type="object"/>
        - <DataType type="string" name="condition"/>：使用该方块置换的条件。应填写为一个 [Molang 表达式](./molang)（常用`query.block_state()`）。
        - <DataType type="object" name="components"/>：使用此置换时使用的方块组件，定义方块的功能。
          - <DataType name="minecraft:(component)"/>：方块组件，可用的方块组件见[数据驱动方块组件](./components)。

</treeview>

[^1]: 关于方块状态的定义，不止有(方块状态 ID)数组一种定义方法，然而我们给出的数组定义方法已可以解决所有情况。感兴趣的读者可以阅读[参考文档的*方块状态 | Bedrock Wiki*](#参考文档)了解更多。

</TabItem><TabItem value="中国版" label="中国版" default>

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定方块可用的功能。应填写为`1.10`。
  - <DataType type="object" name="minecraft:block" isRequired/>：定义数驱方块。
    - <DataType type="object" name="description" isRequired/>：方块描述，定义方块的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义方块的命名空间和方块 ID。
      - <DataType type="string" name="category"/>：定义物品在创造模式物品栏中的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）、`commands`（只有命令和 API 可获取）、`none`（只有 API 可获取）。也可设置为自定义分类，详见[物品组与物品分类](../items/item_category_and_group#物品分类)。
      - <DataType type="boolean" name="register_to_create_menu"/>：是否注册到创造模式物品栏中。
      - <DataType type="string" name="base_block"/>：定义方块的基础行为，可选值有`mob_spawner`（刷怪笼）、`portal`（传送门）、`custom_crop_block`（农作物）、`custom_heavy_block`（重力方块）、`liquid`（静态流体）、`flowing_liquid`（动态流体）、`netease_container`（容器）。
    - <DataType type="object" name="components"/>：方块组件，定义方块的功能。
      - <DataType name="minecraft:(component)"/>：方块组件，可用的方块组件见[数据驱动物品组件（中国版）](./components#中国版组件)。

</treeview>

</TabItem></Tabs>

## 资源包配置

在资源包内通过<FileType type="file" name="blocks.json"/>定义方块在资源包中的表现，然后进一步通过<FileType type="file" name="terrain_texture.json"/>定义方块的贴图，用<FileType type="file" name="sounds.json"/>定义方块的音效。

### `blocks.json`

以下为<FileType type="folder" name="resource_packs"/> - <FileType type="file" name="blocks.json"/>的结构。

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，默认为`1.1.0`。不填写此字段时会报错（警告）。
  - <DataType type="object" name="(方块 ID)" isRequired/>：定义方块使用的资源。`方块 ID`应是带命名空间的 ID。
    - <DataType type="string" name="textures"/>：定义方块使用的贴图（写法 1），使方块六面全部使用[`terrain_texture.json`](#terrain_texturejson)中对应的贴图路径。
    - <DataType type="object" name="textures"/>：定义方块使用的贴图（写法 2）。使用此写法时将定义方块顶底侧面各采用[`terrain_texture.json`](#terrain_texturejson)中对应的贴图路径。
      - <DataType type="string" name="up"/>：方块顶面贴图 ID。
      - <DataType type="string" name="down"/>：方块底面贴图 ID。
      - <DataType type="string" name="side"/>：方块侧面贴图 ID。
    - <DataType type="object" name="textures"/>：定义方块使用的贴图（写法 3）。使用此写法时将定义方块顶底东西南北面各采用[`terrain_texture.json`](#terrain_texturejson)中对应的贴图路径。
      - <DataType type="string" name="up"/>：方块顶面贴图 ID。
      - <DataType type="string" name="down"/>：方块底面贴图 ID。
      - <DataType type="string" name="east"/>：方块东面贴图 ID。
      - <DataType type="string" name="west"/>：方块西面贴图 ID。
      - <DataType type="string" name="south"/>：方块南面贴图 ID。
      - <DataType type="string" name="north"/>：方块北面贴图 ID。
    - <DataType type="string" name="sound"/>：定义方块的音效。音效可以在<FileType type="file" name="sounds.json"/>中定义，也可以使用原版正在使用的音效（见 [Bedrock Wiki](https://wiki.bedrock.dev/blocks/vanilla-block-sounds)）。默认值为`stone`。
    - <DataType type="string"/><DataType type="object" name="carried_textures"/>：定义在手持此方块时，在手中所显示的贴图。同样允许类似于<DataType type="object" name="textures"/>的 3 种写法。
    - <DataType type="boolean"/><DataType type="object" name="isotropic"/>：定义方块面是各向同性的。指定为`true`或确定哪些面使用各向同性后，贴图将会随机旋转。这可用于防止方块贴图过于一致使得世界外观过于单调，常常被用在大量生成的地形方块中，例如草方块或深板岩。默认值为`false`。同样允许类似于<DataType type="object" name="textures"/>的 3 种写法，以确定哪些面使用各向同性。
    - <DataType type="float" name="brightness_gamma"/>：（已弃用，请使用<DataType type="float" name="ambient_occlusion_exponent"/>）定义方块的 gamma 值。
    - <DataType type="float" name="ambient_occlusion_exponent"/>：（1.21.60+）定义方块的环境光遮挡指数。

</treeview>

备注：在方块指定了[`minecraft:material_instance`](./components#minecraftmaterial_instances)组件后，请在该组件内部指定方块贴图，无需在<FileType type="file" name="blocks.json"/>中通过<DataType type="object" name="textures"/>指定方块的贴图。

### `terrain_texture.json`

### `sounds.json`

---

## 参考文档

- [方块简介 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/blocks-intro)
- [自定义方块概述 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/0-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97%E6%A6%82%E8%BF%B0.html?catalog=1)
- [方块状态 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-states)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
