---
sidebar_position: 7
---

# 与方块有关的 Molang 查询函数

> 上次更新：2026 年 4 月 15 日。中国版最新版本为 1.21.90，国际版最新版本为 26.10。

下文的所有 Molang 均链接到官方文档，读者可点击查阅。

## 方块标签

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.all_tags(...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_all_tags?view=minecraft-bedrock-stable) | 返回该物品或方块是否拥有所有特定标签。 | 否：`0.0`，是：`1.0` | `query.all_tags('example:tag')` |
| [`query.any_tag(...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_any_tag?view=minecraft-bedrock-stable) | 返回该物品或方块是否拥有任一特定标签。 | 否：`0.0`，是：`1.0` | `query.any_tag('example:tag')` |
| [`query.block_has_all_tags(x: float, y: float, z: float, ...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_block_has_all_tags?view=minecraft-bedrock-stable) | 返回特定位置的方块是否拥有所有特定标签。 | 否：`0.0`，是：`1.0` | `query.block_has_all_tags(30, 30, 30, 'example:tag')` |
| [`query.block_has_any_tag(x: float, y: float, z: float, ...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_block_has_any_tag?view=minecraft-bedrock-stable) | 返回特定位置的方块是否拥有任一特定标签。 | 否：`0.0`，是：`1.0` | `query.block_has_any_tag(30, 30, 30, 'example:tag')` |
| [`query.relative_block_has_all_tags(x: float, y: float, z: float, ...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_relative_block_has_all_tags?view=minecraft-bedrock-stable) | 返回实体相对坐标位置的方块是否拥有所有特定标签。 | 否：`0.0`，是：`1.0` | `query.relative_block_has_all_tags(0, -1, 0, 'example:tag')` |
| [`query.relative_block_has_any_tag(x: float, y: float, z: float, ...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_relative_block_has_any_tag?view=minecraft-bedrock-stable) | 返回实体相对坐标位置的方块是否拥有任一特定标签。 | 否：`0.0`，是：`1.0` | `query.relative_block_has_any_tag(0, -1, 0, 'example:tag')` |
| [`query.block_neighbor_has_all_tags(x: float, y: float, z: float, ...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_block_neighbor_has_all_tags?view=minecraft-bedrock-stable) | 返回此方块临近位置的方块是否拥有所有特定标签。 | 否：`0.0`，是：`1.0` | `query.block_neighbor_has_all_tags(0, -1, 0, 'example:tag')` |
| [`query.block_neighbor_has_any_tag(x: float, y: float, z: float, ...tags: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_block_neighbor_has_any_tag?view=minecraft-bedrock-stable) | 返回此方块临近位置的方块是否拥有任一特定标签。 | 否：`0.0`，是：`1.0` | `query.block_neighbor_has_any_tag(0, -1, 0, 'example:tag')` |

## 方块状态

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.block_state(block_state: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_block_state?view=minecraft-bedrock-stable) | 返回该方块的方块状态值。 | 方块状态值 | `query.block_state('example:color') == 'blue'` |
| [`query.has_block_state(block_state: string)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_has_block_state?view=minecraft-bedrock-stable) | 返回该方块是否拥有给定的方块状态。 | 否：`0.0`，是：`1.0` | `query.has_block_state('example:color')` |

## 其他

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.block_face`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_block_face?view=minecraft-bedrock-stable) | 返回该方块的面（仅限放置方块或与方块交互时可用）。 | 底：`0.0`、顶：`1.0`、北：`2.0`、南：`3.0`、西：`4.0`、东：`5.0`、未定义：`6.0` | `query.block_face == 1.0` |

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
