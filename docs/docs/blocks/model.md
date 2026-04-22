---
sidebar_position: 5
---

# 方块模型

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

> 上次更新：2026 年 4 月 21 日。中国版最新版本为 1.21.90，国际版最新版本为 26.10。

## 方块模型文件格式

## 原版使用的方块模型

| 模型 ID | 描述 | 示例 |
| --- | --- | --- |
| `minecraft:geometry.full_block` | 完整的 16×16×16 方块模型 | ![model_full_block_1](/img/docs/docs/blocks/model/model_full_block_1.png) |
| `minecraft:geometry.cross` | 类似于花、草一样的贴图交叉模型 | ![model_cross_1](/img/docs/docs/blocks/model/model_cross_1.png) |

> 图片取自中文 Minecraft Wiki。

开发者在使用原版方块模型时应该注意：

1. **原版方块模型不是数据驱动的**，因此对这些模型的骨骼操作（例如`culling`、`bone_visibility`等）是无效的。
2. 在 26.0 更新前，使用完整方块模型`minecraft:geometry.full_block`的底面不会旋转 180°，这和原版方块的表现并不相符。26.0 更新后，Mojang 更新了这个模型，但使用格式版本`1.26.0`之前版本的方块仍然保持原来的表现（即底面不会旋转）。26.0 后，若想使用底面不旋转的完整方块模型，请使用`minecraft:geometry.full_block_v1`。

---

## 参考文档

- [原版方块模型 | Bedrock Wiki](https://wiki.bedrock.dev/blocks/vanilla-block-models)
- [方块组件文档`minecraft:geometry` | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_geometry?view=minecraft-bedrock-stable)
