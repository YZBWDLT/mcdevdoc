---
sidebar_position: 3
---

# 物品标签

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

收录物品标签的相关信息。

你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

:::info[本文更新时间]

本文于 2026 年 1 月 5 日更新，中国版最新版本为 1.21.50，国际版最新版本为 1.21.130。

:::

---

## 原版使用的标签

原版可用的物品标签如下表所示。你也可以为你的自定义物品或方块添加标签组件（参见[物品组件`minecraft:tags`](components#minecrafttags)）。

读者也可在[Bedrock Wiki](https://wiki.bedrock.dev/items/item-tags)中查看更多相关信息。

| 标签 | 解释及功能 |
| :--- | :--- |
| `minecraft:arrow` | 箭 |
| `minecraft:banner` | 旗帜 |
| `minecraft:boat` | 各类船和运输船 |
| `minecraft:boats` | 各类船和运输船 |
| `minecraft:bookshelf_books` | 可存储于雕纹书架的书，**带有此标签的物品也可存储于雕纹书架** |
| `minecraft:chainmail_tier` | 锁链盔甲 |
| `minecraft:chest_boat` | 运输船[^1] |
| `minecraft:coals` | 煤炭和木炭 |
| `minecraft:copper_tier` | 铜盔甲、武器和工具[^2] |
| `minecraft:crimson_stems` | 绯红菌柄及其变种 |
| `minecraft:decorated_pot_sherds` | 各类陶片[^2]，**带有此标签的物品将被视为陶片** |
| `minecraft:diamond_tier` | 钻石盔甲、武器和工具 |
| `minecraft:digger` | 各类用于加速挖掘的工具（镐斧锹锄） |
| `minecraft:door` | 各类门（不包括活板门） |
| `minecraft:egg` | 鸡蛋及其变种[^2] |
| `minecraft:golden_tier` | 金盔甲、武器和工具 |
| `minecraft:hanging_actor` | 悬挂物（当前仅有画） |
| `minecraft:hanging_sign` | 各类悬挂式告示牌 |
| `minecraft:harness` | 各色挽具[^2] |
| `minecraft:horse_armor` | 各类马铠 |
| `minecraft:iron_tier` | 铁盔甲、武器和工具 |
| `minecraft:is_armor` | 各类盔甲（包括海龟壳） |
| `minecraft:is_axe` | 各类斧，**带有此标签的物品对原木使用可对其去皮** |
| `minecraft:is_cooked` | 各类熟食 |
| `minecraft:is_fish` | 鱼及其变种 |
| `minecraft:is_food` | 各类食物，**会被狐狸捡走** |
| `minecraft:is_hoe` | 各类锄 |
| `minecraft:is_meat` | 各类肉 |
| `minecraft:is_minecart` | 矿车及其变种 |
| `minecraft:is_pickaxe` | 各类镐 |
| `minecraft:is_shears` | 剪刀[^2] |
| `minecraft:is_shovel` | 锹，**带有此标签的物品可用于铲雪变为雪球；可用于生成土径；可用于熄灭营火** |
| `minecraft:is_spear` | 各类矛[^2] |
| `minecraft:is_sword` | 各类剑（包括重锤） |
| `minecraft:is_tool` | 各类工具（剑镐斧锹锄和重锤） |
| `minecraft:is_trident` | 三叉戟[^2] |
| `minecraft:leather_tier` | 皮革盔甲 |
| `minecraft:lectern_books` | 可放置于讲台的书（当前仅有书与笔） |
| `minecraft:logs` | 各类原木和去皮原木（包括菌柄变种），**带有此标签的物品可用于合成营火和灵魂营火** |
| `minecraft:logs_that_burn` | 各类可燃烧的原木和去皮原木，**带有此标签的物品可用于烧制为木炭** |
| `minecraft:mangrove_logs` | 红树原木及其变种 |
| `minecraft:music_disc` | 各类音乐唱片 |
| `minecraft:is_spear` | 各类鹦鹉螺铠[^2] |
| `minecraft:netherite_tier` | 下界合金盔甲、武器和工具 |
| `minecraft:piglin_loved` | 猪灵喜欢的物品[^1] |
| `minecraft:piglin_repellents` | 猪灵排斥的物品[^1] |
| `minecraft:planks` | 各类木板，**带有此标签的物品可用于在配方中视为木板合成** |
| `minecraft:sand` | 沙子及其变种 |
| `minecraft:sign` | 各类告示牌和悬挂式告示牌 |
| `minecraft:soul_fire_base_blocks` | 灵魂火方块（灵魂沙和灵魂土），**带有此标签的物品可用于合成灵魂营火和灵魂火把** |
| `minecraft:spawn_egg` | 各类刷怪蛋 |
| `minecraft:stone_bricks` | 石砖及其变种 |
| `minecraft:stone_crafting_materials` | 石合成材料，**带有此标签的物品可类似于圆石用于合成** |
| `minecraft:stone_tier` | 石武器和工具 |
| `minecraft:stone_tool_materials` | 石工具材料，**带有此标签的物品可用于合成石制工具** |
| `minecraft:transform_materials` | 锻造升级配方材料（当前仅有下界合金锭）[^2] |
| `minecraft:transform_templates` | 锻造升级配方模板[^2] |
| `minecraft:transformable_items` | 锻造升级配方基底物品[^2] |
| `minecraft:trim_materials` | 锻造纹饰配方材料（当前仅有下界合金锭）[^2] |
| `minecraft:trim_templates` | 锻造纹饰配方模板[^2] |
| `minecraft:trimmable_armors` | 锻造纹饰配方基底盔甲[^2] |
| `minecraft:vibration_damper` | 掉在地上不会产生振动的物品，**带有此标签的物品亦将带有此功能** |
| `minecraft:warped_stems` | 诡异菌柄及其变种 |
| `minecraft:wooden_slabs` | 各类木台阶 |
| `minecraft:wooden_tier` | 木武器和工具 |
| `minecraft:wool` | 各类羊毛 |

[^1]: 在微软文档中记载，而 Bedrock Wiki 中未记载。
[^2]: 在Bedrock Wiki 中记载，而微软文档中未记载。

## 标签的用途

### 相关 Molang

使用 Molang 可以判断物品带有的标签。

| Molang | 含义 |
| --- | :--- |
| `query.equipped_item_all_tags(slot, ...tags)` | 实体的特定位置是否均为特定标签的物品 |
| `query.equipped_item_any_tag(slot, ...tags)` | 实体的特定位置是否存在特定标签的物品 |
| `query.all_tags(...tags)` | 物品是否具有全部列出的标签 |
| `query.any_tag(...tags)` | 物品是否存在列出的标签 |

### 配方

可以在配方表中指定特定标签的物品用于合成。见[配方表](recipes)。

## 参考文档

- [配方文档 - 物品标签 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/recipetaglist?view=minecraft-bedrock-stable)
- [物品标签 | Bedrock Wiki](https://wiki.bedrock.dev/items/item-tags)
