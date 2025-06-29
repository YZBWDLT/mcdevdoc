---
sidebar_position: 1
---

# 2.1 命令的分类

在第一章，我们学习了一些基本概念，例如坐标、实体、目标选择器等。从本章开始，我们就将开始学习各个具体的命令。不过，考虑到现在很多命令都是和附加包相关的，所以在本章，很多命令会暂且按下不表。

请注意：本教程的重点，是帮助你了解我们在工程中所常用的命令，以及命令的大体用途。本教程不会具体地介绍每条命令的用法。关于具体的用法，你可以参阅[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/命令)的条目，或者`/help`。应该说的是，记载信息非常详细的文档已经有很多，微软文档、Wiki 都有大量权威且详细的记载，因此已经掌握了命令基础知识的读者，可以配合 Wiki 进行学习。**本教程是为新手准备的**，包括逻辑、学习路线等都是为新手准备的。因此如果你是新手，可以在看完我们的教程后再看 Wiki，新手直接看 Wiki 是很容易看不懂的。

言归正传，在本节，我们将命令按照不同的分类方式简单分个类，让你对这些命令有一些大体的了解。

## 按频率分类（按重要性分类）

根据[附录 1](../appendix/command_frequency_table)，我们可以将一些命令按照在实际工程中的频率进行分类。这个频率表可以帮助你了解各个命令的重要性。

- 带有\*的为和附加包（Add-on）有关的命令，本章不会介绍，或不会过于具体地介绍，而会在相关模块介绍相关功能时再介绍该命令或具体内容。你可以看到，命令和附加包现在是深度绑定的！

| 等级 | 命令 | 在一个较大型地图项目中的出现频次 |
| --- | --- | :---: |
| 超高频命令 | `/execute`<br/>`/function`\*<br/>`/scoreboard`<br/>`/summon`\*[^1]<br/>`/tag`<br/>`/tellraw` | 500~ |
| 高频命令 | `/scriptevent`\*<br/>`/tp`（或`/teleport`）<br/>`/titleraw`<br/>`/playsound`\*[^2]<br/>`/particle`\*[^3]<br/>`/setblock`\*[^4]<br/>`/clear`\*[^5]<br/>`/gamerule`<br/>`/structure`\*[^6]<br/>`/clone`<br/>`/event`\*[^1]<br/>`/camera`\*[^7]<br/>`/effect` | 51~500 |
| 中频命令 | `/give`\*[^5]<br/>`/kill`\*[^1]<br/>`/replaceitem`\*[^5]<br/>`/inputpermission`<br/>`/fill`\*[^4]<br/>`/spawnpoint`<br/>`/dialogue`\*<br/>`/gamemode`<br/>`/say`<br/>`/playanimation`\*[^1]<br/>`/setworldspawn`<br/>`/tell`（或`/msg`、`/w`）<br/>`/time` | 6~50 |
| 低频命令 | `/difficulty`<br/>`/music`\*[^2]<br/>`/schedule`\*<br/>`/stopsound`\*[^2]<br/>`/tickingarea`<br/>`/ride`\*[^1]<br/>`/weather`<br/>`/enchant`<br/>`/mobevent`<br/>`/xp`<br/>`/camerashake`<br/>`/damage`<br/>`/loot`\*[^1]<br/>`/title` | 1~5 |
| 零频命令 | `/alwaysday`（或`/daylock`）<br/>`/clearspawnpoint`<br/>`/fog`\*[^8]<br/>`/gametest`\*<br/>`/hud`<br/>`/me`<br/>`/recipe`\*[^9]<br/>`/script`\*<br/>`/spreadplayers`<br/>`/testfor`<br/>`/testforblock`<br/>`/testforblocks`<br/>`/toggledownfall` | 几乎用不到 |
| 服务器常用命令 | `/op`<br/>`/deop`<br/>`/kick`<br/>`/list`<br/>`/locate`<br/>`/connect`<br/>`/reload`\*<br/>`/stop`<br/>`/setmaxplayers`<br/>`/allowlist` | — |

也许看到这些命令，你会非常迷茫：这都啥？啥？啥？没关系，这只是一个简单了解而已。在本章后续，你就会逐渐了解这些命令。

## 按用途分类

根据用途分类命令，可以将这些命令简单分为如下几类：

| 用途 | 命令 | 用途简介 |
| --- | --- | --- |
| 执行其他命令 | `/execute`<br/>`/function`<br/>`/reload`<br/>`/schedule` | 当符合特定条件后，执行其他命令 |
| 标记与计算命令 | `/scoreboard`<br/>`/tag` | 用于进行数值计算、标记实体等 |
| 世界操作 | `/gamerule`<br/>`/time`<br/>`/difficulty`<br/>`/tickingarea`<br/>`/weather`<br/>`/mobevent`<br/>`/alwaysday`(`/daylock`)<br/>`/toggledownfall` | 对全世界总体进行一定程度的更改，例如更新天气<br/>更新游戏规则等 |
| 实体操作·生成与移除 | `/summon`<br/>`/kill` | 生成或移除实体，或控制玩家的生成 |
| 实体操作·位置与朝向 | `/tp`(`/teleport`)<br/>`/spreadplayers` | 控制实体的位置和朝向，或控制玩家能否改变位置朝向等 |
| 实体操作·实体属性 | `/event`<br/>`/effect`<br/>`/playanimation`<br/>`/ride`<br/>`/damage`<br/>`/testfor` | 控制实体属性 |
| 实体操作·玩家操作 | `/inputpermission`<br/>`/gamemode`<br/>`/xp`<br/>`/spawnpoint`<br/>`/setworldspawn`<br/>`/clearspawnpoint` | 控制玩家属性 |
| 物品操作·给予物品 | `/give`<br/>`/loot` | 给予玩家或实体物品 |
| 物品操作·清除物品 | `/clear` | 清除玩家物品 |
| 物品操作·修改物品 | `/replaceitem`<br/>`/enchant`<br/>`/recipe` | 修改玩家或实体物品 |
| 方块操作·单方块操作 | `/setblock`<br/>`/testforblock` | 对一个方块进行更改或检测 |
| 方块操作·多方块操作 | `/structure`<br/>`/clone`<br/>`/fill`<br/>`/testforblocks` | 对一片区域进行多方块批量操作 |
| 特效·文本命令 | `/tellraw`<br/>`/titleraw`<br/>`/say`<br/>`/tell`(`/msg`、`/w`)<br/>`/title`<br/>`/me` | 将文本消息输出到聊天栏或屏幕上 |
| 特效·屏幕控制 | `/camera`<br/>`/dialogue`<br/>`/camerashake`<br/>`/fog`<br/>`/hud` | 对玩家的相机、屏幕进行控制 |
| 特效·音效与粒子 | `/playsound`<br/>`/particle`<br/>`/music`<br/>`/stopsound` | 播放音效、释放粒子 |
| 服务器、联机与生存常用命令 | `/help`(`/?`)<br/>`/kick`<br/>`/list`<br/>`/locate`<br/>`/op`<br/>`/deop`<br/>`/connect`<br/>`/reload`<br/>`/stop`<br/>`/setmaxplayers`<br/>`/allowlist` | 常用于服务器控制台或聊天栏的命令 |
| 其他命令 | `/scriptevent`<br/>`/gametest`<br/>`/script` | 控制脚本的命令 |

可以看到，这些命令在各个领域都有非常广泛的应用和用途。接下来，我们将以“按用途分类”的顺序依次讲解这些命令，对于重要性高的命令，我们会详细讲解，而对于重要性比较低的命令，讲解的就不会特别细致了。

[^1]: 可能涉及自定义实体。但脱离附加包该命令也可用。
[^2]: 可能涉及自定义音效。但脱离附加包该命令也可用。
[^3]: 可能涉及自定义粒子。但脱离附加包该命令也可用。
[^4]: 可能涉及自定义方块。但脱离附加包该命令也可用。
[^5]: 可能涉及自定义物品。但脱离附加包该命令也可用。
[^6]: 可能涉及结构包。但脱离附加包该命令也可用。
[^7]: 可能涉及相机预设。但脱离附加包该命令也可用。
[^8]: 可能涉及自定义迷雾。但脱离附加包该命令也可用。
[^9]: 可能涉及自定义配方。但脱离附加包该命令也可用。

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
