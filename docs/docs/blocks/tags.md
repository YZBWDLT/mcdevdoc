---
sidebar_position: 4
---

# 方块标签

> 适用版本：国际版 26.10，中国版 3.8（1.21.90）。

---

方块标签（Item Tags）可以用于将多个方块在底层代码上进行分类，可用于[相关 Molang](./molang) 和[配方表](../items/recipes)中。方块标签可以在数据驱动方块中通过[方块组件`minecraft:tags`](./components#minecrafttags)（1.26.20+）或[方块组件`tag:(标签)`](./components#tag标签)（1.26.10-）定义。原版的方块也在大量使用方块标签。

本文档收录方块标签的相关信息。你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

---

## 原版使用的标签

原版可用的物品标签如下表所示。不展示已弃用的标签。读者可在[Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-tags)中查看更多相关信息。

| 标签 | 解释及功能 |
| :--- | :--- |
| `acacia` | 金合欢木 |
| `birch` | 白桦木 |
| `minecraft:cornerable_stairs` | 具有拐角状态的楼梯[^2] |
| `minecraft:crop` | 农作物，具有`minecraft:grows_crops`组件的实体可以对其授粉 |
| `dark_oak` | 深色橡木 |
| `minecraft:diamond_tier_destructible` | 只有钻石镐级别的工具才可挖掘掉落的方块，但对自定义方块无效 |
| `dirt` | 各类泥土 |
| `fertilize_area` | 可用骨粉施肥的区域 |
| `grass` | 草方块、泥土与砂土 |
| `gravel` | 各类沙砾 |
| `minecraft:iron_tier_destructible` | 只有铁镐级别的工具才可挖掘掉落的方块，但对自定义方块无效 |
| `minecraft:is_hatchet_item_destructible` | 斧挖掘速度更快的方块[^3] |
| `minecraft:is_hoe_item_destructible` | 锄挖掘速度更快的方块 |
| `minecraft:is_pickaxe_item_destructible` | 镐挖掘速度更快的方块 |
| `minecraft:is_shears_item_destructible` | 剪刀挖掘速度更快的方块 |
| `minecraft:is_shovel_item_destructible` | 锹挖掘速度更快的方块 |
| `minecraft:is_sword_item_destructible` | 剑挖掘速度更快的方块 |
| `jungle` | 丛林木 |
| `log` | 原木 |
| `metal` | 金属块 |
| `minecraft:is_item_tier_destructible` | [^1] |
| `minecraft:is_mace_item_destructible` | 重锤挖掘速度更快的方块[^1] |
| `mob_spawner` | 刷怪笼 |
| `not_feature_replaceable` | 地物无法替换的方块 |
| `minecraft:netherite_tier_destructible` | 只有下界合金镐级别的工具才可挖掘掉落的方块，但对自定义方块无效[^1] |
| `oak` | 橡木 |
| `one_way_collidable` | 单向碰撞，包括门、活板门、栅栏门，阻止在方块碰撞箱内的实体被挤压出去 |
| `plant` | 各类植物 |
| `pumpkin` | 南瓜及其变种 |
| `rail` | 各类铁轨 |
| `sand` | 各类沙子 |
| `snow` | 雪层 |
| `spruce` | 云杉木 |
| `stone` | 各类石料及其变种的台阶、楼梯、墙 |
| `minecraft:stone_tier_destructible` | 只有石镐级别的工具才可挖掘掉落的方块，但对自定义方块无效 |
| `text_sign` | 各类告示牌和悬挂式告示牌 |
| `trapdoors` | 各类活板门 |
| `water` | 水或流动的水 |
| `wood` | 各类木制品及其变种产物 |

[^1]: 在微软文档中记载，而 Bedrock Wiki 中未记载。
[^2]: 在Bedrock Wiki 中记载，而微软文档中未记载。
[^3]: 在Bedrock Wiki 中记载的是`minecraft:is_axe_item_destructible`，而微软文档中记载的是`minecraft:is_axe_item_destructible`，实际在用何种标签有待验证。

---

## 参考文档

- [方块标签 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/block-tags)
- [原版方块标签 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/vanilla-block-tags)
