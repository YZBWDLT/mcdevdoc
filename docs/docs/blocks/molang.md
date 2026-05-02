---
sidebar_position: 7
---

# 与方块有关的 Molang 查询函数

> 适用版本：国际版 26.10，中国版 3.8（1.21.90）。

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
| [`query.is_connect(face: int)`](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-connection) | （仅中国版可用）返回该方块特定面所接触的方块是否拥有`connection`属性。`face`允许的参数为：底：`0`、顶：`1`、北：`2`、南：`3`、西：`4`、东：`5`。 | 否：`0.0`，是：`1.0` | `query.is_connect(0)` |

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
