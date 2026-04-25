---
sidebar_position: 4
---

# 物品组与物品分类

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Highlight from '/src/components/highlight/standard';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Image from "/src/components/image/standard"

> 适用版本：国际版 26.10，中国版 3.8（1.21.90）。  
> 本文档配备教程，您可以点击下面的「教程」按钮查看我们提供的教程。

<Highlight text="教程" url="/docs/tutorials/a2_addons/b4_data_driven_items/c7_custom_category_and_group" />

---

## 物品组

物品组（Item Group）可以在创造模式物品栏中将少量相似功能的物品、方块折叠到一起。例如下图：

<Image src="/img/docs/docs/items/item_category_and_group/item_group_1.png" text="物品组"/>

### 自定义物品组

国际版和中国版使用不同的物品组定义方法。

<Tabs><TabItem value="国际版" label="国际版" default>

以下为 <FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="item_catalog"/> - <FileType type="file" name="crafting_item_catalog.json"/> 的结构。

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
              - <DataType type="string" name="icon" isRequired/>：定义物品组的图标使用何物品的图标。
              - <DataType type="string" name="name" isRequired/>：定义物品组的名称和 ID。可以指定为原版物品组（必须带`minecraft:`命名空间），详见[原版使用的物品组](./item_category_and_group#原版使用的物品组)，也可以自行新建（必须带命名空间）。
            - <DataType type="string" name="items" isRequired/>：定义哪些物品归类进该物品组。

</treeview>

</TabItem><TabItem value="中国版" label="中国版">

以下为 <FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="netease_group"/> - <FileType type="file" name="*.json"/> 的结构，用于新建物品组。官方文档表达了更多需要注意的事项，[见此](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/12-%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E5%93%81%E5%88%86%E7%BB%84.html?catalog=1)。

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="array" name="groups"/>：定义物品组。
    - <DataType type="object"/>
      - <DataType type="string" name="group_name"/>：定义物品组的名称和 ID。可以指定为原版物品组，详见[原版使用的物品组](./item_category_and_group#原版使用的物品组)，也可以自行新建。
      - <DataType type="string" name="icon"/>：定义物品组的图标使用何物品的图标。
      - <DataType type="array" name="list"/>：定义哪些物品归类进该物品组。
        - <DataType type="string"/>：物品 ID。

</treeview>

</TabItem></Tabs>

### 原版使用的物品组

备注：本处采用 [Minecraft Wiki 提供的标准译名包](https://github.com/ff98sha/mclangcn)的译名。使用最新国际正式版的数据。需要注意，**在`1.21.60`或更高的格式版本中使用原版物品组必须带上`minecraft:`命名空间**。

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
| `itemGroup.name.lightning_rod` | 避雷针 |
| `itemGroup.name.copper` | 铜块 |
| `itemGroup.name.harnesses` | 挽具 |
| `itemGroup.name.shelf` | 展示架 |
| `itemGroup.name.copper_golem_statue` | 铜傀儡像 |
| `itemGroup.name.bars` | 栏杆 |
| `itemGroup.name.chains` | 锁链 |
| `itemGroup.name.lanterns` | 灯笼 |
| `itemGroup.name.spear` | 矛 |
| `itemGroup.name.nautilus_armor` | 鹦鹉螺铠 |
| `itemGroup.name.chemistrytable` | 化学设备 |
| `itemGroup.name.element` | 元素 |

</details>

---

## 物品分类

物品分类（Item Category）则将大量物品囊括到一个大分类中。例如下图：

<Image src="/img/docs/docs/items/item_category_and_group/item_category_1.png" text="物品分类"/>

原版拥有 4 个物品分类：建筑（`construction`）、装备（`equipment`）、物品（`items`）和自然（`nature`）。

### 自定义物品分类

:::warning[版本适用性警告]

以下内容仅限中国版且仅限中国版物品可用。

:::

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
        分类中既有分组物品和未分组物品时，则按照分组中第一个物品的 ID 和未分组物品的 ID 排序。

</treeview>

---

## 参考文档

- [物品目录 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/craftingitemcatalogdocumentation?view=minecraft-bedrock-stable)
- [自定义物品分组 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/12-%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E5%93%81%E5%88%86%E7%BB%84.html?catalog=1)
- [自定义物品分页 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/13-%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E5%93%81%E5%88%86%E9%A1%B5.html?catalog=1)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
