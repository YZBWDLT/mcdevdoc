---
sidebar_position: 11
---

# 2.11 *中国版独有命令

:::warning[温馨提示]

本节内容仅限中国版可用，主要用于启用和禁用 NPC。国际版的玩家可以直接使用 NPC，因此无需使用下面的命令。

:::

这一节我们来快速了解两条命令：`/enableedunpc`和`/removeedunpc`。

很多人看到这两条命令不太清楚其中的含义。其实，这两条命令中是各存在 3 个英文单词的，分别是“Enable Edu NPC”和“Remove Edu NPC”。其中“enable”、“remove”和“npc”想必已无需我们过多解释，至于“edu”其实就是教育版“Education Edition”的简称，因为 NPC 原本是教育版独有实体，只不过后来基岩版本体也可用了而已。

它们的语法也很简单：

```text showLineNumbers
/enableedunpc [启用NPC: Boolean]
/removeedunpc
```

分别代表是否启用 NPC，以及移除所有 NPC。

中国版玩家还需要注意：即使启用了 NPC，中国版的 NPC 也不存在任何功能。通常 NPC 在中国版主要用来实现悬浮文本，具体原理可见[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/Tutorial:自定义实体#纯命令实现文本展示实体)，主要分为 3 步：

1. 利用中国版独有的命令`/enableedunpc true`启用 NPC。当然，这里并没有启用 NPC 的功能，也不允许`/summon`出一个 NPC，它只是允许了 NPC 的存在。
2. 使用`/give @s spawn_egg 1 51`获得 NPC 的刷怪蛋。将刷怪蛋命名为自己想要的文本，然后将NPC放在地上。
3. 使用循环型命令方块，执行命令`/playanimation @e[family=npc] animation.creeper.swelling * 99999`，可以看到 NPC 只剩下一个影子，但其上方的名称仍在显示，达成了悬浮文本的效果。
