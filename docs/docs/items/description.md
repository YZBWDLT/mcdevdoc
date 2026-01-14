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

数据驱动物品（Data-Driven Items，简称数驱物品）是由开发者给定数据，由游戏引擎自行注册的物品。

数驱物品由行为包和资源包组成。国际版和中国版均可编写数驱物品。数驱物品分为国际版物品和中国版物品，两者的编写流程有所不同。

:::info[本文更新时间]

本文于 2026 年 1 月 2 日更新，中国版最新版本为 1.21.0，国际版最新版本为 1.21.130。

:::

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
    - **[<FileType type="file" name="crafting_item_catalog.json"/>](#物品分类与物品组)：物品在创造模式物品栏和配方书中的分类信息（1.21.60+）**
  - <FileType type="folder" name="recipes"/>
    - **[<FileType type="file" name="(物品 ID).recipe.json"/>](recipes)：定义物品的配方表**，亦可用于原版物品
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="texts"/>
    - **[<FileType type="file" name="en_US.lang"/>](#语言文件键名)：定义物品的英文译名**
    - **[<FileType type="file" name="zh_CN.lang"/>](#语言文件键名)：定义物品的中文译名**
  - <FileType type="folder" name="textures"/>
    - <FileType type="folder" name="items"/>
      - **<FileType type="image" name="(物品 ID).png"/>：定义物品的贴图**
    - **[<FileType type="file" name="item_texture.json"/>](#贴图文件格式)：物品贴图注册**

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
    - **[<FileType type="file" name="item_texture.json"/>](#贴图文件格式)：物品贴图注册**

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
    - **[<FileType type="file" name="*.json"/>](#物品分类与物品组)：定义物品组，名称可任意指定（例如 crafting_item_catalog.json 或 group_config.json）**
  - <FileType type="folder" name="netease_tab"/>
    - **[<FileType type="file" name="*.json"/>](#物品分类与物品组)：定义物品分类，名称可任意指定（例如  crafting_item_catalog.json 或 category_config.json）**
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
    - **[<FileType type="file" name="item_texture.json"/>](#贴图文件格式)：物品贴图注册**

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
        - <DataType type="string" name="group"/>：定义物品在创造模式物品栏中置于何物品组中，详见[物品分类与物品组](#物品分类与物品组)。  
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
      - <DataType type="string" name="category"/>：定义物品在创造模式物品栏中的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）、`commands`（只有命令和 API 可获取）、`none`（只有 API 可获取）。也可设置为自定义分类，详见[物品分类与物品组](#物品分类与物品组)。
      - <DataType type="boolean" name="register_to_create_menu"/>：是否注册到创造模式物品栏中。
      - <DataType type="string" name="custom_item_type"/>：自定义物品类别，可选值有`weapon`、`armor`、`egg`、`ranged_weapon`、`bucket`、`projectile_item`、`shield`。
    - <DataType type="object" name="components" isRequired/>：物品组件，定义物品的功能。
      - <DataType name="minecraft:(component)"/>：物品组件，可用的物品组件见[数据驱动物品组件（中国版）](./components#中国版组件)。

</treeview>

</TabItem></Tabs>

### 物品分类与物品组

<Tabs><TabItem value="国际版" label="国际版" default>

以下为 <FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="item_catalog"/> - <FileType type="file" name="crafting_item_catalog.json"/> 的结构。

可用于新建物品组，但不能新建物品分类。

:::warning[注意]

该功能仅限 1.21.60 及更高版本可用。

:::

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本。应填写为`1.21.60`或更高版本。
  - <DataType type="object" name="minecraft:crafting_item_catalog" isRequired/>：定义物品分类数据。
    - <DataType type="array" name="categories" isRequired/>：指定物品分类。
      - <DataType type="object"/>
        - <DataType type="string" name="category_name" isRequired/>：定义创造模式物品栏的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）。
        - <DataType type="array" name="groups" isRequired/>：定义物品组。
          - <DataType type="object"/>
            - <DataType type="object" name="group_identifier"/>：定义物品组。如果不指定该参数将直接指定下面<DataType type="string" name="items" isRequired/>中的物品为分散在物品栏中的物品。
              - <DataType type="string" name="icon"/>：定义物品组的图标使用何物品的图标。
              - <DataType type="string" name="name"/>：定义物品组的名称和 ID。可以指定为原版物品组（必须带`minecraft:`命名空间），详见[原版使用的物品组](#原版使用的物品组)，也可以自行新建（必须带命名空间）。
            - <DataType type="string" name="items" isRequired/>：定义哪些物品归类进该物品组。

</treeview>

</TabItem><TabItem value="中国版" label="中国版" default>

中国版可以独立创建新的物品分类和新的物品组。

以下为 <FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="netease_group"/> - <FileType type="file" name="*.json"/> 的结构，用于新建物品组。官方文档表达了更多需要注意的事项，[见此](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/12-%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E5%93%81%E5%88%86%E7%BB%84.html?catalog=1)。

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="array" name="groups"/>：定义物品组。
    - <DataType type="object"/>
      - <DataType type="string" name="group_name"/>：定义物品组的名称和 ID。可以指定为原版物品组，详见[原版使用的物品组](#原版使用的物品组)，也可以自行新建。
      - <DataType type="string" name="icon"/>：定义物品组的图标使用何物品的图标。
      - <DataType type="array" name="list"/>：定义哪些物品归类进该物品组。
        - <DataType type="string"/>：物品 ID。

</treeview>

以下为 <FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="netease_tab"/> - <FileType type="file" name="*.json"/> 的结构，用于新建物品组。官方文档表达了更多需要注意的事项，[见此](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/13-%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E5%93%81%E5%88%86%E9%A1%B5.html?catalog=1)。

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="array" name="category"/>：定义物品分类。
    - <DataType type="object"/>
      - <DataType type="string" name="name"/>：定义物品分类的名称。在数驱物品中可在`category`字段中指定该值，以将该物品放入此分类中。
      - <DataType type="string" name="labelText"/>：定义物品分类的描述。在<FileType type="file" name="zh_CN.lang"/>中定义译名（例如“自然”、“建筑”）。
      - <DataType type="string" name="icon"/>：定义物品分类的图标路径，从`textures/`开始，不带后缀。
      - <DataType type="boolean" name="sort_by_identifier"/>：定义物品分类中的物品是否进行排序，默认为`false`。分类规则为：  
        分类中全部为未分组物品时，则按照物品的 ID 排序；  
        分类中全部为具有分组的物品时，则按照分组中第一个物品的 ID 排序；  
        分类中既有分组物品和未分组物品时，则按照分组中第一个物品的 ID 和未分组物品的 ID 排序；

</treeview>

</TabItem></Tabs>

### 原版使用的物品组

备注：本处采用 [Minecraft Wiki 提供的标准译名包](https://github.com/ff98sha/mclangcn)的译名。使用最新国际正式版的数据。

<details>

<summary>展开</summary>

| 物品组 | 物品组名 |
| :--- | --- |
| `itemGroup.name.planks` | 木板 |
| `itemGroup.name.walls` | 墙 |
| `itemGroup.name.fence` | 栅栏 |
| `itemGroup.name.fenceGate` | 栅栏门 |
| `itemGroup.name.stairs` | 楼梯 |
| `itemGroup.name.door` | 门 |
| `itemGroup.name.glass` | 玻璃 |
| `itemGroup.name.glassPane` | 玻璃板 |
| `itemGroup.name.permission` | 权限方块 |
| `itemGroup.name.slab` | 台阶 |
| `itemGroup.name.stoneBrick` | 石砖 |
| `itemGroup.name.sandstone` | 砂岩 |
| `itemGroup.name.wool` | 羊毛 |
| `itemGroup.name.woolCarpet` | 羊毛地毯 |
| `itemGroup.name.concretePowder` | 混凝土粉末 |
| `itemGroup.name.concrete` | 混凝土 |
| `itemGroup.name.stainedClay` | 陶瓦 |
| `itemGroup.name.glazedTerracotta` | 带釉陶瓦 |
| `itemGroup.name.dye` | 染料 |
| `itemGroup.name.ore` | 矿石 |
| `itemGroup.name.stone` | 石头 |
| `itemGroup.name.log` | 原木 |
| `itemGroup.name.leaves` | 树叶 |
| `itemGroup.name.sapling` | 树苗 |
| `itemGroup.name.seed` | 种子 |
| `itemGroup.name.crop` | 农作物 |
| `itemGroup.name.grass` | 草 |
| `itemGroup.name.flower` | 花 |
| `itemGroup.name.rawFood` | 生食 |
| `itemGroup.name.cookedFood` | 熟食 |
| `itemGroup.name.miscFood` | 其他食物 |
| `itemGroup.name.mushroom` | 蘑菇 |
| `itemGroup.name.monsterStoneEgg` | 虫蚀石头 |
| `itemGroup.name.mobEgg` | 刷怪蛋 |
| `itemGroup.name.helmet` | 头盔 |
| `itemGroup.name.chestplate` | 胸甲 |
| `itemGroup.name.leggings` | 护腿 |
| `itemGroup.name.boots` | 靴子 |
| `itemGroup.name.horseArmor` | 马铠 |
| `itemGroup.name.sword` | 剑 |
| `itemGroup.name.axe` | 斧 |
| `itemGroup.name.pickaxe` | 镐 |
| `itemGroup.name.shovel` | 锹 |
| `itemGroup.name.hoe` | 锄 |
| `itemGroup.name.arrow` | 箭 |
| `itemGroup.name.potion` | 药水 |
| `itemGroup.name.splashPotion` | 喷溅药水 |
| `itemGroup.name.lingeringPotion` | 滞留药水 |
| `itemGroup.name.ominousBottle` | 不祥之瓶 |
| `itemGroup.name.bed` | 床 |
| `itemGroup.name.chalkboard` | 黑板 |
| `itemGroup.name.anvil` | 铁砧 |
| `itemGroup.name.chest` | 箱子 |
| `itemGroup.name.shulkerBox` | 潜影盒 |
| `itemGroup.name.record` | 唱片 |
| `itemGroup.name.skull` | 生物头颅 |
| `itemGroup.name.boat` | 船 |
| `itemGroup.name.chestboat` | 运输船 |
| `itemGroup.name.rail` | 铁轨 |
| `itemGroup.name.minecart` | 矿车 |
| `itemGroup.name.pressurePlate` | 压力板 |
| `itemGroup.name.trapdoor` | 活板门 |
| `itemGroup.name.enchantedBook` | 附魔书 |
| `itemGroup.name.banner` | 旗帜 |
| `itemGroup.name.firework` | 烟花火箭 |
| `itemGroup.name.fireworkStars` | 烟火之星 |
| `itemGroup.name.coral` | 珊瑚块 |
| `itemGroup.name.coral_decorations` | 珊瑚装饰 |
| `itemGroup.name.buttons` | 按钮 |
| `itemGroup.name.sign` | 告示牌 |
| `itemGroup.name.wood` | 木头 |
| `itemGroup.name.banner_pattern` | 旗帜图案 |
| `itemGroup.name.netherWartBlock` | 下界疣块 |
| `itemGroup.name.candles` | 蜡烛 |
| `itemGroup.name.goatHorn` | 山羊角 |
| `itemGroup.name.compounds` | 化合物 |
| `itemGroup.name.products` | 产物 |
| `itemGroup.name.bundles` | 收纳袋 |
| `itemGroup.name.sculk` | 幽匿 |
| `itemGroup.name.hanging_sign` | 悬挂式告示牌 |
| `itemGroup.name.potterySherds` | 纹样陶片 |
| `itemGroup.name.smithing_templates` | 锻造模板 |
| `itemGroup.name.copper` | 铜块 |
| `itemGroup.name.harnesses` | 挽具 |
| `itemGroup.name.chemistrytable` | 化学设备 |
| `itemGroup.name.element` | 元素 |

</details>

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

### 贴图文件格式

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
- [物品目录 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/craftingitemcatalogdocumentation?view=minecraft-bedrock-stable)
- [自定义物品分组 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/12-%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E5%93%81%E5%88%86%E7%BB%84.html?catalog=1)
- [自定义物品分页 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/13-%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E5%93%81%E5%88%86%E9%A1%B5.html?catalog=1)
- [自定义配方 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/5-%E8%87%AA%E5%AE%9A%E4%B9%89%E9%85%8D%E6%96%B9.html?catalog=1)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
