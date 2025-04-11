---
sidebar_position: 5
---

# 开发者系统 v2

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);

## [<Highlight color="#25c2a0">下载</Highlight>](https://app.nekodrive.net/s/XM0fY)

本包已经搭建了一套较为初步的开发者系统，**以便您基于此编写一些您在开发时所独有的功能，便于您的开发**。

本包为**行为包**和**资源包**结合的包。

:::warning[温馨提醒]

我们建议您把此包和「[主包 v3](main_v3)」结合使用，否则其中的部分内容可能需要您的单独适配。

:::

## 合并到您的包中

您可以直接将我们所给出的文件通过复制粘贴的方法粘贴到您的包中。但是，如果在粘贴过程中遇到冲突，**请务必选择跳过这些文件而非覆盖您原有的文件**，并按照下面可能需要修改的文件列表进行选择性粘贴。

:::danger[温馨提醒]

再次强调！如果在粘贴过程中遇到冲突，**请务必选择跳过这些文件而非覆盖您原有的文件**！

:::

### 合并时可能需要修改的文件

以下文件中的自定义内容使用了命名空间`template:`，然而**我们不推荐您在您的作品中使用该命名空间**。在正式使用本包之前，请将这些命名空间按您的需求进行改动。

- `BP_developer_mode/items/template/`文件夹中的所有文件
- `RP_developer_mode/texts/`文件夹中的所有文件

以下文件可能和您已有的包产生冲突。在复制这些文件时，请注意**以下文件不能直接复制，需要视情况手动粘贴其中的内容**。

该列表中不列出`manifest.json`（附加包清单文件）和`pack_icon.png`（附加包图标）。

- `BP_developer_mode/functions/lib/modify_data/init/data.mcfunction`（行为包 - 函数 - 库函数 - 初始化数据）
- `BP_developer_mode/functions/system/main.mcfunction`（行为包 - 函数 - 主文件）
- `RP_developer_mode/texts/`文件夹中的所有文件（资源包 - 文本文件）
- `RP_developer_mode/textures/item_texture.json`（资源包 - 物品贴图清单）

## 使用方法

**安装「[主包 v3](main_v3)」并与本包合并，进行初始化变量后，即可使用以下功能**。

### 启用开发者模式

您可以使用

```mcfunction showLineNumbers
/function settings/developer_mode
```

命令以启用开发者模式。

### 快捷查询记分板与标签变量

启用开发者模式后，您可以使用

```mcfunction showLineNumbers
/function developer/query/variables
```

便捷地查询各记分板和标签变量。

如果您需要额外添加新变量，并且通过本函数查询，**需要手动在此文件中添加您的新变量的描述**。

### 快捷启用特定游戏规则

启用开发者模式后，您可以使用

```mcfunction showLineNumbers
/function developer/gamerule
```

以启用在开发者模式时的特定游戏模式，方便您的调试。

### 快捷切换游戏模式

启用开发者模式后，您将获得 4 个物品，手持它们即可切换模式。在旁观模式下抬头可切换为创造模式。

### 快捷获取开发物品

:::warning[注意]

该功能仅限开发者系统 v2 或更高版本使用。

:::

启用开发者模式后，您可以使用

```mcfunction showLineNumbers
/function developer/get_items
```

快捷获取命令方块、结构方块、屏障、拒绝方块等开发用方块。

### 以及快捷做任何只有开发情况下才能做的事

如果您还需要添加其他开发者函数，您可以在`functions/developer/`下添加新的开发者函数。为了防止玩家误执行该命令，建议您基于以下命令进行编写。

```mcfunction showLineNumbers title="developer/xxx.mcfunction"
# ===== (该函数的用途) =====
# 仅限开发者模式下启用

# --- 未开启开发者模式时 ---
execute unless score developerMode settings matches 1 run tellraw @s { "rawtext": [ { "translate": "§c该功能仅限在开发者模式下使用" } ] }

# --- 开启开发者模式时 ---

## (功能注释)
execute if score developerMode settings matches 1 run (你要执行的命令)
execute if score developerMode settings matches 1 run (你要执行的命令)

```

## 可用函数

您可以对本包中的下面的函数进行修改、调用。

| 文件名（`.mcfunction`） | 用途 | 输出数据（变量、标签） |
| --- | --- | --- |
| `settings/developer_mode` | 启用开发者模式 | `settings.developerMode`=`1` |
| `developer/query/variables` | 查询记分板和标签变量 | — |
| `developer/gamerule` | 启用开发者游戏规则 | — |
| `developer/get_items` | 快捷获取开发用方块 | — |

## 实例

<details>

<summary>在《冒险小世界：剑之试炼》中使用的查询变量的函数</summary>

基于 1.18.30 的函数系统。

```mcfunction title="BP_aw_main_old/functions/developer/query/variables.mcfunction" showLineNumbers
# ===== 记分板查询函数 =====
# 调用此函数以查询所有记分板的值 | 仅限开发者模式下启用

## --- 未开启开发者模式时 ---
scoreboard players operation @s temp = @e[name=developerMode] data
tellraw @s[scores={temp=0}] {"rawtext":[{"translate":"§c该功能仅限在开发者模式下使用"}]}

## --- 开启开发者模式时 ---
tellraw @s[scores={temp=1}] {"rawtext":[{"text":"下文反馈格式: (记分项).(标记名) = (值)，并反馈注释\n§e*黄色：假名（即非标记实体）变量 §b*蓝色：玩家个人数据"}]}

tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§l===== 玩家个人数据记分项 ====="}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§bdeathTimes.@s = §a%%s §7# 玩家死亡次数","with":{"rawtext":[{"score":{"objective":"deathTimes","name":"@s"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§bhookshot.@s = §a%%s §7# 玩家发射出绳枪的时间，单位：刻","with":{"rawtext":[{"score":{"objective":"hookshot","name":"@s"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§bisAlive.@s = §a%%s §7# 玩家存活状态，0：游戏时死亡，1：游戏时存活，2：未在游戏中，3：进入新的关卡区域","with":{"rawtext":[{"score":{"objective":"isAlive","name":"@s"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§bisOnline.@s = §a%%s §7# 玩家是否为在线的玩家，0：不在线，1：在线","with":{"rawtext":[{"score":{"objective":"isOnline","name":"@s"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§bkillAmount.@s = §a%%s §7# 玩家击杀的怪物数","with":{"rawtext":[{"score":{"objective":"killAmount","name":"@s"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§bposition.@s = §a%%s §7# 玩家所在的关卡区域","with":{"rawtext":[{"score":{"objective":"position","name":"@s"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§btime.@s = §a%%s §7# 玩家持续未重生的时间，单位：刻","with":{"rawtext":[{"score":{"objective":"time","name":"@s"}}]}}]}

tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§l===== active记分项 ====="}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"active.dialogue = §a%%s §7# 对话控制器，0：不启用对话，1：启用不固定视角的对话，2：启用固定视角的对话","with":{"rawtext":[{"score":{"objective":"active","name":"@e[name=dialogue]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"active.levelCompleteDelay = §a%%s §7# 关卡完成延迟（启用值），0：无延迟完成关卡，大于0：按照该值延迟完成关卡，-1：永远不按照怪物数目完成关卡","with":{"rawtext":[{"score":{"objective":"active","name":"@e[name=levelCompleteDelay]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"active.monsterSummonDelay = §a%%s §7# 怪物生成延迟（启用值），0：无延迟，1：有延迟","with":{"rawtext":[{"score":{"objective":"active","name":"@e[name=monsterSummonDelay]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"active.soundPlayer = §a%%s §7# 音效播放器，0：不激活，不为0：根据本值决定播放何种音效","with":{"rawtext":[{"score":{"objective":"active","name":"@e[name=soundPlayer]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"active.timeline = §a%%s §7# 时间线控制器：为1时开始计时","with":{"rawtext":[{"score":{"objective":"active","name":"@e[name=timeline]"}}]}}]}

tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§l===== data记分项 ====="}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"检测实体数目的变量"}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.alivePlayersAmount = §a%%s §7# 记录存活玩家数目","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=alivePlayersAmount]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.arrowAmount = §a%%s §7# 记录箭数目","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=arrowAmount]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.hookshotAmount = §a%%s §7# 记录绳枪数目","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=hookshotAmount]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§edata.maxMonsterAmount = §a%%s §7# 记录怪物数目","with":{"rawtext":[{"score":{"objective":"data","name":"maxMonsterAmount"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.maxPlayersAmount = §a%%s §7# 记录所有玩家数目","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=maxPlayersAmount]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.monsterAmount = §a%%s §7# 记录怪物数目","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=monsterAmount]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.realDeadPlayersAmount = §a%%s §7# 记录死亡玩家（游戏意义上）的数目","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=realDeadPlayersAmount]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"关卡数据变量"}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.chapter = §a%%s §7# 章节数据","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=chapter]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.gameId = §a%%s §7# 关卡ID数据，三位数分别为(章节)(关卡)(是否已完成)","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=gameId]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.level = §a%%s §7# 关卡数据","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=level]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.levelCompleted = §a%%s §7# 关卡是否完成，0=游戏状态，1=完成状态","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=levelCompleted]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"其他变量"}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.allFailedTimes = §a%%s §7# 记录所有关卡累计的失败次数","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=allFailedTimes]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.achievement = §a%%s §7# 记录显示第几个成就","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=achievement]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.difficulty = §a%%s §7# 记录难度。","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=difficulty]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.difficultyAdder = §a%%s §7# 游戏难度加和，以difficulty+本值得到最终的难度值（data.difficulty）。","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=difficultyAdder]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.developerMode = §a%%s §7# 开发者模式,0：不启用，1：启用","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=developerMode]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.failedTimes = §a%%s §7# 记录单个关卡的失败次数，当失败次数过多时将给予buff辅助过关","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=failedTimes]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.isNetease = §a%%s §7# 记录是否为netease版本","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=isNetease]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.maxWave = §a%%s §7# 记录该关卡最大波数，仅在需要时获取","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=maxWave]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.randomLocation = §a%%s §7# 随机怪物刷新位置","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=randomLocation]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.randomMonster = §a%%s §7# 随机怪物种类","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=randomMonster]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.storyMode = §a%%s §7# 是否启用剧情模式，0：不启用，1：启用","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=storyMode]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.score = §a%%s §7# 地图结束后的评分，S：120+，A：95~119，B：75~94，C：60~74，D：50~59，E：40~49，F：0~39，F-：-1（仅作弊）","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=score]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"data.wave = §a%%s §7# 记录波数数据","with":{"rawtext":[{"score":{"objective":"data","name":"@e[name=wave]"}}]}}]}

tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§l===== record记分项 ====="}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.bestTimeMinute1 = §a%%s §7# 难度1下的最佳时间（分钟）","with":{"rawtext":[{"score":{"objective":"record","name":"bestTimeMinute1"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.bestTimeSecond1 = §a%%s §7# 难度1下的最佳时间（秒）","with":{"rawtext":[{"score":{"objective":"record","name":"bestTimeSecond1"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.bestTimeMinute2 = §a%%s §7# 难度2下的最佳时间（分钟）","with":{"rawtext":[{"score":{"objective":"record","name":"bestTimeMinute2"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.bestTimeSecond2 = §a%%s §7# 难度2下的最佳时间（秒）","with":{"rawtext":[{"score":{"objective":"record","name":"bestTimeSecond2"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.bestTimeMinute3 = §a%%s §7# 难度3下的最佳时间（分钟）","with":{"rawtext":[{"score":{"objective":"record","name":"bestTimeMinute3"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.bestTimeSecond3 = §a%%s §7# 难度3下的最佳时间（秒）","with":{"rawtext":[{"score":{"objective":"record","name":"bestTimeSecond3"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.bestTimeMinute4 = §a%%s §7# 难度4下的最佳时间（分钟）","with":{"rawtext":[{"score":{"objective":"record","name":"bestTimeMinute4"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.bestTimeSecond4 = §a%%s §7# 难度4下的最佳时间（秒）","with":{"rawtext":[{"score":{"objective":"record","name":"bestTimeSecond4"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.mapCompletedTimes = §a%%s §7# 地图通关次数","with":{"rawtext":[{"score":{"objective":"record","name":"mapCompletedTimes"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.nextGame.difficultyAdder = §a%%s §7# 下一局启用的难度加和","with":{"rawtext":[{"score":{"objective":"record","name":"nextGame.difficultyAdder"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§erecord.nextGame.storyMode = §a%%s §7# 下一局启用的模式","with":{"rawtext":[{"score":{"objective":"record","name":"nextGame.storyMode"}}]}}]}

tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§l===== time记分项 ====="}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"time.dialogue = §a%%s §7# 剧情线，单位：刻","with":{"rawtext":[{"score":{"objective":"time","name":"@e[name=dialogue]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"time.levelCompleteDelay = §a%%s §7# 关卡完成延迟，0：无延迟完成关卡，大于0：按照该值延迟完成关卡，-1：永远不按照怪物数目完成关卡，单位：刻","with":{"rawtext":[{"score":{"objective":"time","name":"@e[name=levelCompleteDelay]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"time.monsterSummonDelay = §a%%s §7# 怪物生成延迟，单位：刻","with":{"rawtext":[{"score":{"objective":"time","name":"@e[name=monsterSummonDelay]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"time.playedMinute = §a%%s §7# 游玩时长，从试炼开始时开始计时，单位：分钟","with":{"rawtext":[{"score":{"objective":"time","name":"@e[name=playedMinute]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"time.playedSecond = §a%%s §7# 游玩时长，从试炼开始时开始计时，单位：秒","with":{"rawtext":[{"score":{"objective":"time","name":"@e[name=playedSecond]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"time.soundPlayer = §a%%s §7# 音效播放器，单位：刻","with":{"rawtext":[{"score":{"objective":"time","name":"@e[name=soundPlayer]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"time.tick = §a%%s §7# 每1刻加1分，每20刻归零，单位：刻","with":{"rawtext":[{"score":{"objective":"time","name":"@e[name=tick]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"time.timeline = §a%%s §7# 时间线，单位不定","with":{"rawtext":[{"score":{"objective":"time","name":"@e[name=timeline]"}}]}}]}
tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"time.@e[family=blaze_king] = §a%%s §7# 烈焰之魂试图随机传送的倒计时，单位：秒","with":{"rawtext":[{"score":{"objective":"time","name":"@e[family=blaze_king]"}}]}}]}

tellraw @s[scores={temp=1}] {"rawtext":[{"translate":"§l===== 标签类型（tag）项 ====="}]}

tellraw @s[scores={temp=1},tag=!bootsHeld] {"rawtext":[{"translate":"§ebootsHeld = §afalse §7# 玩家是否手持过钻石靴子（aw:diamond_boots） | true=是，false=否"}]}
tellraw @s[scores={temp=1},tag=bootsHeld] {"rawtext":[{"translate":"§ebootsHeld = §atrue §7# 玩家是否手持过钻石靴子（aw:diamond_boots） | true=是，false=否"}]}

tellraw @s[scores={temp=1},tag=!cheated] {"rawtext":[{"translate":"§echeated = §afalse §7# 玩家是否开启过创造模式 | true=是，false=否"}]}
tellraw @s[scores={temp=1},tag=cheated] {"rawtext":[{"translate":"§echeated = §atrue §7# 玩家是否开启过创造模式 | true=是，false=否"}]}

tellraw @s[scores={temp=1},tag=!helmetHeld] {"rawtext":[{"translate":"§ehelmetHeld = §afalse §7# 玩家是否手持过钻石头盔（aw:diamond_helmet） | true=是，false=否"}]}
tellraw @s[scores={temp=1},tag=helmetHeld] {"rawtext":[{"translate":"§ehelmetHeld = §atrue §7# 玩家是否手持过钻石头盔（aw:diamond_helmet） | true=是，false=否"}]}

tellraw @s[scores={temp=1},tag=!isAlive] {"rawtext":[{"translate":"§eisAlive = §afalse §7# 玩家是否存活 | true=是，false=否"}]}
tellraw @s[scores={temp=1},tag=isAlive] {"rawtext":[{"translate":"§eisAlive = §atrue §7# 玩家是否存活 | true=是，false=否"}]}

tellraw @s[scores={temp=1},tag=!potionUsed] {"rawtext":[{"translate":"§epotionUsed = §afalse §7# 玩家是否使用过除治疗药水以外的药水 | true=是，false=否"}]}
tellraw @s[scores={temp=1},tag=potionUsed] {"rawtext":[{"translate":"§epotionUsed = §atrue §7# 玩家是否使用过除治疗药水以外的药水 | true=是，false=否"}]}

tellraw @s[scores={temp=1},tag=!virtualCrosshairEnabled] {"rawtext":[{"translate":"§evirtualCrosshairEnabled = §afalse §7# 玩家是否启用了虚拟准星 | true=是，false=否"}]}
tellraw @s[scores={temp=1},tag=virtualCrosshairEnabled] {"rawtext":[{"translate":"§evirtualCrosshairEnabled = §atrue §7# 玩家是否启用了虚拟准星 | true=是，false=否"}]}

scoreboard players set @s temp 0
```

</details>

<details>

<summary>在《30 种死法 2》中使用的获取物品的函数</summary>

基于 1.20.10 的函数系统。

```mcfunction title="BP_wstd/functions/developer/get_items.mcfunction" showLineNumbers
# ===== 获取物品 =====
# 用于获取一些辅助物品

# --- 不符合执行条件的情况 ---

## 未开启开发者模式
execute unless score developerMode settings matches 1 run tellraw @s {"rawtext":[{"translate":"chat.error.not_developer_mode"}]}
## 开启了开发者模式，但权限不足
execute if score developerMode settings matches 1 unless score oplevel settings matches 2 run tellraw @s {"rawtext":[{"translate":"chat.error.oplevel_too_low"}]}
## 开启了开发者模式，且权限充足，但玩家不为创造模式
execute if score developerMode settings matches 1 if score oplevel settings matches 2 unless entity @s[m=creative] run tellraw @s {"rawtext":[{"translate":"chat.error.not_creative_mode"}]}

# --- 符合执行条件的情况 ---

## 提示玩家
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run tellraw @s {"rawtext":[{"translate":"chat.developer.get_items"}]}

## 给予物品
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s netherite_sword
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s command_block
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s chain_command_block
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s repeating_command_block
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s barrier
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s border_block
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s structure_block
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s structure_void
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s light_block 1 15
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s allow
execute if score developerMode settings matches 1 if score oplevel settings matches 2 if entity @s[m=creative] run give @s deny
```

</details>

<details>

<summary>在《冒险小世界：剑之试炼》中使用的快速初始化地图的函数</summary>

基于 1.18.30 的命令系统。

```mcfunction title="BP_aw_main_old/functions/developer/release_map.mcfunction" showLineNumbers
# ===== 发布地图 =====

# --- 未开启开发者模式时 ---
scoreboard players operation @s temp = @e[name=developerMode] data
tellraw @s[scores={temp=0}] {"rawtext":[{"translate":"§c该功能仅限在开发者模式下使用"}]}

# --- 开启开发者模式时 ---

## 清除一些独有结构
execute @s[scores={temp=1}] ~~~ function levels/end/stage_3/on_exit
execute @s[scores={temp=1}] ~~~ function levels/end/stage_4/on_exit

execute @s[scores={temp=1}] ~~~ kill @e[type=aw:npc]
execute @s[scores={temp=1}] ~~~ kill @e[type=aw:npc_author]
execute @s[scores={temp=1}] ~~~ function lib/init/data_reset_stats
execute @s[scores={temp=1}] ~~~ function levels/open/before_opening/start

```

</details>

## 更新日志

相比于 v1 版本，v2 版本主要进行了如下更改：

- 提升最低版本需求为 1.20.50
- 使用了主包 v2 的最新变量名
- 现在函数内的`/tellraw`默认使用中文，而不再使用翻译键名
- 新增了`BP_developer_mode/functions/developer/get_items`

## 过往版本下载

您可以在这里下载到过往版本。然而，我们已不再推荐使用这些旧版本。

[<Highlight color="#25c2a0">下载 v1 版本</Highlight>](https://app.nekodrive.net/s/vg2ue)
