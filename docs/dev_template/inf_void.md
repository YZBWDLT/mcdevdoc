---
sidebar_position: 5
---

# 无限虚空

import Download from "/src/components/highlight/download"

<Download url="https://app.nekodrive.net/s/3XVI2"/>

本包用于**生成一个无限虚空的世界**。

众所周知，基岩版不允许生成虚空类型的超平坦，然而，根据这篇微软文档[^1]，使用行为包**可以在主世界、下界和末地未加载的区块上产生无限虚空**。其中，**主世界还能够更改高度上下限**。

本包为**行为包**。

## 使用方法

将`dimensions/`文件夹合并到您的包中，然后您便可以使用下面的功能：

### 虚空生成

您可以选择性地保留文件，以对特定的维度生效。更改维度的文件为`dimensions/`文件夹下的内容：

- `dimensions/overworld.json`：对主世界应用虚空生成
- `dimensions/nether.json`：对下界应用虚空生成
- `dimensions/the_end.json`：对末地应用虚空生成

### 自定义高度

此外，您可以利用此包更改主世界的最高高度和最低高度。您可以打开`dimensions/overworld.json`对下面的内容进行更改：

```json title="dimensions/overworld.json"
"minecraft:dimension_bounds": { "min": -64, "max": 320 }
```

请注意最小值和最大值都应该是 16 的倍数。

[^1]: [数据驱动的主世界高度和虚空生成](https://learn.microsoft.com/en-us/minecraft/creator/documents/datadrivenoverworldheight?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
