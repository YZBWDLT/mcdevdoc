---
sidebar_position: 8
---

# 与物品有关的 Molang 查询函数

> 适用版本：国际版 1.21.130，中国版 3.7（1.21.50）。

下文的所有 Molang 均链接到官方文档，读者可点击查阅。

## 物品标签

以下 Molang 可用于查询物品是否拥有特定标签。

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.all_tags(...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_all_tags?view=minecraft-bedrock-stable) | 返回该物品或方块是否拥有所有特定标签。 | 否：`0.0`，是：`1.0` | `query.all_tags('example:tag')` |
| [`query.any_tag(...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_any_tag?view=minecraft-bedrock-stable) | 返回该物品或方块是否拥有任一特定标签。 | 否：`0.0`，是：`1.0` | `query.any_tag('example:tag')` |
| [`query.equipped_item_all_tags(slot: string, ...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_equipped_item_all_tags?view=minecraft-bedrock-stable) | 返回正在装备的物品是否拥有所有特定标签。 | 否：`0.0`，是：`1.0` | `query.equipped_item_all_tags('slot.weapon.mainhand', 'example:tag')` |
| [`query.equipped_item_any_tag(slot: string, ...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_equipped_item_any_tag?view=minecraft-bedrock-stable) | 返回正在装备的物品是否拥有任一特定标签。 | 否：`0.0`，是：`1.0` | `query.equipped_item_any_tag('slot.weapon.mainhand', 'example:tag')` |

---

## 参考文档

- [物品标签 | Bedrock Wiki](https://wiki.bedrock.dev/items/item-tags)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
