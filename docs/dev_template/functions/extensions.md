---
sidebar_position: 2
---

# 主包扩展

本文提供一些您可能需要的命令合集，以使您选择性地插入并合并到您的函数系统中。

:::info[温馨提醒]

- 本文的内容基于「[主包 v3](main_v3)」的架构。
- 在下文中，您会多次看到`BP/functions/lib/modify_data/init/data.mcfunction`文件，**这是声明全局变量的步骤**，请**新增**这些内容，而非替换原有的旧内容。
- 如果您发现我们给出的文件路径在您的包中不存在，请在对应位置新建该文件。
- 本文档不对特定内容的具体实现原理做详细说明，如果原理讲述不清，请您自行分析其中的代码。如果该代码在我们的教程中出现，我们会给出链接。
- 本文，我们把`objective`记分板上名为`name`的追踪目标的分数`score`记为`objective.name`=`score`。
  - 例如，检测`objective.name`的分数是否为`1`，为`/execute if score name objective matches 1`。

:::

---

## 系统

系统函数负责运行底层内容，或者全局性地检测一些需要检测的内容、执行一些需要执行的逻辑。以下提供了一些可用的子系统。

### 反作弊系统

用于防止玩家进行作弊。

- **条件**：无
- **函数**：无需调用
- **原理**：无
- **代码**：

<details>

<summary>注册系统</summary>

新增下面的字段到主文件中。

```mcfunction title="BP/functions/system/main.mcfunction" showLineNumbers
# --- 反作弊 ---
function system/anticheating

```

</details>

<details>

<summary>反作弊文件</summary>

去除注释以启用相关命令。您可根据自己的地图实际修改该文件。

```mcfunction title="BP/functions/system/anticheating.mcfunction" showLineNumbers
# ===== 反作弊系统 =====
# 判断玩家是否作弊。

# --- 游戏模式限制 ---
# gamemode adventure @a[m=!adventure]

# --- 禁止玩家放船 ---
# kill @e[family=boat]

# --- 禁止玩家投掷末影珍珠 ---
# kill @e[family=ender_pearl]

# --- 禁止玩家搭建传送门 ---
# execute as @a at @s run fill  -5 -5 -5 5 5 5 air replace portal
# execute as @a at @s run fill  -5 -5 -5 5 5 5 air replace end_portal

```

</details>

- **示例**：

<details>

<summary>在《30 种死法 2》中使用的防作弊的函数</summary>

基于该地图 2.4 版本，基于 1.20.10 的函数系统。

```mcfunction title="BP_wstd/functions/system/anticheating.mcfunction" showLineNumbers
# ===== 反作弊系统 =====
# 该系统用于判断玩家是否作弊，以及在开发者模式下用于按需更改游戏模式

# --- 非开发者模式下 ---

## ~ 游戏模式限制 ~
## 如果地图权限等级不为0，关闭游戏模式的限制。

### 在浏览地图时 | 改为强制旁观模式
execute if score oplevel settings matches 0 if score level data matches -8 as @a[m=!spectator] run tellraw @s {"rawtext":[{"translate":"chat.error.cheating.line1"},{"text":"\n"},{"translate":"chat.error.cheating.line2"}]}
execute if score oplevel settings matches 0 if score level data matches -8 as @a[m=!spectator] run gamemode spectator @s
### 未在浏览地图时 | 改为强制冒险模式
### 判断玩家是否处于DIY的编辑模式，如果不是则强制改模式
execute if score oplevel settings matches 0 unless score level data matches -8 run scoreboard players set anticheating.isdiyLevels.isEditMode data 0
execute if score oplevel settings matches 0 unless score level data matches -8 if score level data matches 51..60 if score diyLevels.isEditMode data matches 1 run scoreboard players set anticheating.isdiyLevels.isEditMode data 1
execute if score oplevel settings matches 0 unless score level data matches -8 if score anticheating.isdiyLevels.isEditMode data matches 0 as @a[m=!adventure] run tellraw @s {"rawtext":[{"translate":"chat.error.cheating.line1"},{"text":"\n"},{"translate":"chat.error.cheating.line2"}]}
execute if score oplevel settings matches 0 unless score level data matches -8 if score anticheating.isdiyLevels.isEditMode data matches 0 as @a[m=!adventure] run gamemode adventure @s

## ~ 防特性 ~
## 如果不是第28关（该关卡就是用船过的），则清除船
execute unless score level data matches 28 if entity @e[family=boat] as @a run tellraw @s {"rawtext":[{"translate":"chat.anti_cheating.boat_not_allowed"}]}
execute unless score level data matches 28 as @e[family=boat] run kill @s
## 如果不是第13关第3部分（该关卡采用自己的防末影珍珠机制）和第18关（该关卡有进度），则清除末影珍珠
execute unless score level data matches 31 unless score level data matches 18 if entity @e[family=ender_pearl] as @a run tellraw @s {"rawtext":[{"translate":"chat.anti_cheating.ender_pearl_not_allowed"}]}
execute unless score level data matches 31 unless score level data matches 18 as @e[family=ender_pearl] run kill @s
## 如果是自定义关卡且玩家在自定义关卡区域内，移除传送门（防止玩家进入）
execute if score level data matches 51..60 as @a[x=-132,y=0,z=-41,dx=31,dy=31,dz=31] at @s run fill ~-5~-5~-5~5~5~5 air replace portal
execute if score level data matches 51..60 as @a[x=-132,y=0,z=-41,dx=31,dy=31,dz=31] at @s run fill ~-5~-5~-5~5~5~5 air replace end_portal

# --- 开发者模式下 ---

## 快捷游戏模式更改
execute if score developerMode settings matches 1 run function lib/modify_data/developer_gamemode

## 通关时间记为-1（作废）
execute if score developerMode settings matches 1 run scoreboard players set endTime.tick record -1
```

</details>

### 反退出重进系统

用于令进入地图的玩家执行命令。

- **条件**：无
- **函数**：无需调用
- **原理**：[2.4.5 记分板的运用 变量](/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d5_applications#处理多人游戏下退出重进的玩家的问题)
- **代码**：

<details>

<summary>注册系统</summary>

新增下面的字段到主文件中。

```mcfunction title="BP/functions/system/main.mcfunction" showLineNumbers
# --- 反退出重进 ---
function system/antileave

```

</details>

<details>

<summary>反退出重进文件</summary>

应在`--- 令退出重进玩家执行的命令 ---`模块中令`isOnline.@s`=`0`的玩家执行命令。您可根据自己的地图实际修改该文件。

```mcfunction title="BP/functions/system/antileave.mcfunction" showLineNumbers {8}
# ===== 反退出重进系统 =====
# 本系统仅对退出重进的玩家有效。

# --- 获取退出重进的玩家 ---
scoreboard players add @a isOnline 0

# --- 令退出重进玩家执行的命令 ---
# execute as @a[scores={isOnline=0}] at @s run (退出重进的玩家将会执行这条命令)

# --- 将所有玩家设置为在线模式 ---
scoreboard objectives remove isOnline
scoreboard objectives add isOnline dummy "玩家在线"
scoreboard players set @a isOnline 1

```

</details>

- **示例**：

<details>

<summary>在《冒险小世界：剑之试炼》中使用的防退出重进系统</summary>

:::warning[温馨提示]

以下所示内容基于该地图 4.1 版本，基于 1.18.30 的函数系统，仅供参考。在不久之后我们会给出 4.2 版本使用的相关系统。

:::

```mcfunction title="BP_aw_main_old/functions/system/antileave.mcfunction" showLineNumbers
# ===== 防退出机制 =====
# 本系统仅对退出重进的玩家有效。

# --- 获取退出重进的玩家 ---
function lib/get_data/is_online_before

# --- 判断中途进入的玩家是否拥有记分板的值，没有值的予以添加或更新 ---
execute @a[scores={isOnline=0}] ~~~ function lib/init/player_data

# --- 将中途进入的玩家传送到respawner上 ---
execute @a[scores={isOnline=0}] ~~~ tp @s @e[family=respawner,c=1]

# --- 在游戏过程中，给予中途进入的玩家物品、药水和箭 ---
execute @e[name=developerMode,scores={data=0}] ~~~ execute @a[scores={isOnline=0}] ~~~ clear @s
execute @a[scores={isOnline=0}] ~~~ function lib/supplier/items
execute @a[scores={isOnline=0}] ~~~ function lib/supplier/potion
execute @a[scores={isOnline=0}] ~~~ function lib/supplier/arrow

# --- 播放音乐 ---
## 提示玩家
execute @a[scores={isOnline=0}] ~~~ tellraw @a[scores={isOnline=!0}] {"rawtext":[{"translate":"§e检测到有玩家进入游戏，为确保游戏体验，将重新播放场景音乐"}]}
execute @a[scores={isOnline=0}] ~~~ function lib/music_player

# --- 如果是网易版进入，则纠正游戏模式和游戏规则 ---
execute @a[scores={isOnline=0}] ~~~ function lib/get_data/using_client
execute @a[scores={isOnline=0}] ~~~ scoreboard players operation @s temp = isNetease data
execute @a[scores={isOnline=0,temp=1}] ~~~ function lib/correct_data

# --- 进行提醒 ---
execute @a[scores={isOnline=0}] ~~~ tellraw @s {"rawtext":[{"translate":"§e检测到您重新进入游戏，已将您传送到附近的重生点"}]}

# --- 将所有玩家设置为在线模式 ---
function lib/get_data/is_online_after
```

</details>

### 音效控制器系统（延时播放音效）

:::warning[温馨提示]

如果您使用 1.21.50 以上的版本，请使用`/schedule delay <function> <time> [replace|append]`执行`/playsound`命令。在该命令更新后，已没有必要再使用更加复杂的音效控制器系统。

该系统的介绍将于中国版更新 1.21.50 后移除。

:::

用于延时播放音效，以处理当玩家传送后的瞬间执行`/playsound`命令会导致玩家无法听见音效的问题。当您调用了音效控制器后，将启用一段时间很短的倒计时，倒计时结束后再播放音效，也就是**延时播放音效**。

- **条件**：`active.sound`>=`1` && `time.sound`\<=`0`
- **函数**：使用`/function lib/modify_data/states/sounds/(...)`调用
- **原理**：
  - 音效控制器使用两个变量控制它的运行：*状态*（`active.sound`）和*计时器*（`time.sound`）
  - 如果*状态*为`0`，则代表音效控制器处于**禁用状态**。如果*状态*大于或等于`1`，则代表音效控制器处于**启用状态**。
  - 如果*计时器*的时间大于 0：进行倒计时，每一游戏刻*计时器*将自减 1 分；
  - 如果*计时器*的时间等于 0：通过*状态*来决定播放哪个音效；然后，关闭音效控制器（将状态设置为`0`以表示关闭），并设置*计时器*默认为`3`游戏刻的倒计时。
- **代码**：

<details>

<summary>注册系统</summary>

新增下面的字段到主文件中。

```mcfunction title="BP/functions/system/main.mcfunction" showLineNumbers
# --- 音效控制器 ---
# 仅当启用后执行
execute if score sound active matches 1.. if score sound time matches ..0 run function system/controller/sound

```

</details>

<details>

<summary>注册计时器</summary>

新增下面的字段到计时器文件中。

```mcfunction title="BP/functions/system/timer.mcfunction" showLineNumbers
# --- time.sound ---
# 仅当启用后执行
execute if score sound active matches 1.. run scoreboard players remove sound time 1

```

</details>

<details>

<summary>音效控制器系统</summary>

在该系统文件中添加需要延迟播放的音效事件。添加的命令的位置应位于`--- 音效事件 ---`模块，格式应类似于高亮部分。

```mcfunction title="BP/functions/system/controller/sound.mcfunction" showLineNumbers {5}
# ===== 音效播放器 =====
# 仅当音效播放器启用且倒计时为0后执行

# --- 音效事件 ---
execute if score sound active matches (状态) as @a at @s run playsound (音效ID) @s ~~~ (音量) (音调)

# --- 重置音效播放器 ---
function lib/modify_data/states/sound_player/reset

```

</details>

<details>

<summary>可用于调用的库函数</summary>

添加一个库函数以便于您调控要播放的音效事件。**注意：请不要修改`./reset.mcfunction`文件**！

- **重置音效控制器的库函数**：
  - **请勿修改该函数**，直接原封不动地粘贴上去即可。

```mcfunction title="BP/functions/lib/modify_data/states/sound/reset.mcfunction" showLineNumbers
# ===== 禁用音效控制器 =====
# 用于禁用音效控制器。

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 禁用音效播放线，将时间调为非零

# --- 禁用音效控制器 ---

## 禁用音效控制器
scoreboard players set sound active 0
## 将音效控制器时间重置
scoreboard players set sound time 3

```

- **自定义音效控制器的库函数**
  - `(???)`推荐写为该音效的ID和音调。例如：
    - 要播放`random.orb`，可写为`random_orb`。
    - 要播放音调 0.75 的`random.levelup`，可写为`random_levelup_0_75`。

```mcfunction title="BP/functions/lib/modify_data/states/sound/(???).mcfunction" showLineNumbers
# ===== 播放音效(音效ID) =====
# 用于延时播放音效(音效ID)。

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · (倒计时，默认为3)刻后播放音效(音效ID)

# --- 启用音效播放器 ---

## 启用音效播放器
scoreboard players set sound active (状态)
## 将音效播放器时间重置
scoreboard players set sound time (倒计时，默认为3)

```

</details>

- **示例**：

<details>

<summary>简单的应用：将*状态* 1 设置为`random.orb`</summary>

- **修改音效控制器**

```mcfunction title="BP/functions/system/controller/sound.mcfunction" showLineNumbers {5}
# ===== 音效播放器 =====
# 仅当音效播放器启用且倒计时为0后执行

# --- 音效事件 ---
execute if score sound active matches 1 as @a at @s run playsound random.orb @s ~~~ 1 1

# --- 重置音效播放器 ---
function lib/modify_data/states/sound_player/reset

```

- **新增用于调用的库函数**

```mcfunction title="BP/functions/lib/modify_data/states/sound/random_orb.mcfunction" showLineNumbers
# ===== 播放音效random.orb =====
# 用于延时播放音效random.orb。

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 3刻后播放音效random.orb

# --- 启用音效播放器 ---

## 启用音效播放器
scoreboard players set sound active 1
## 将音效播放器时间重置
scoreboard players set sound time 3

```

这样，执行`/function lib/modify_data/states/sound/random_orb`之后将在 3 游戏刻后向所有玩家播放经验球的音效。

</details>

<details>

<summary>在《30 种死法 2》中使用的音效控制器</summary>

:::warning[温馨提示]

基于该地图 2.4 版本，基于 1.20.10 的函数系统。使用旧版音效控制器系统，仅供参考。

:::

- **音效控制器文件**：

```mcfunction title="BP_wstd/functions/system/controller/sound.mcfunction" showLineNumbers
# ===== 音效播放器 =====
# 该控制器将按照不同的active.sound值执行不同的音效效果。
# <!> 注意：该函数仅当音效播放器启用后执行

# --- 音效倒计时 ---
scoreboard players remove sound time 1

# --- 音效事件 ---
# 当音效倒计时为0后执行

## 1 | random.orb | 音调1
execute if score sound time matches 0 if score sound active matches 1 as @a at @s run playsound random.orb @s ~~~ 1 1
## 2 | random.orb | 音调2
execute if score sound time matches 0 if score sound active matches 2 as @a at @s run playsound random.orb @s ~~~ 1 2
## 3 | mob.villager.yes | 音调1
execute if score sound time matches 0 if score sound active matches 3 as @a at @s run playsound mob.villager.yes @s ~~~ 1 1
## 4 | mob.villager.no | 音调1
execute if score sound time matches 0 if score sound active matches 4 as @a at @s run playsound mob.villager.no @s ~~~ 1 1
## 5 | mob.cat.meow | 音调0.75
execute if score sound time matches 0 if score sound active matches 5 as @a at @s run playsound mob.cat.meow @s ~~~ 1 0.75
## 6 | random.anvil_break | 音调0.5
execute if score sound time matches 0 if score sound active matches 6 as @a at @s run playsound random.anvil_break @s ~~~ 1 0.5
## 7 | random.levelup | 音调1
execute if score sound time matches 0 if score sound active matches 7 as @a at @s run playsound random.levelup @s ~~~ 1 1
## 8 | random.levelup | 音调2
execute if score sound time matches 0 if score sound active matches 8 as @a at @s run playsound random.levelup @s ~~~ 1 2
## 9 | smithing_table.use | 音调1
execute if score sound time matches 0 if score sound active matches 9 as @a at @s run playsound smithing_table.use @s ~~~ 1 1
## 10 | hard_achievement_complete | 音调1，音量0.5
execute if score sound time matches 0 if score sound active matches 10 as @a at @s run playsound hard_achievement_complete @s ~~~ 0.5 1
## 11 | random.pop | 音调1
execute if score sound time matches 0 if score sound active matches 11 as @a at @s run playsound random.pop @s ~~~ 1 1
## 12 | random.anvil_land | 音调1
execute if score sound time matches 0 if score sound active matches 12 as @a at @s run playsound random.anvil_land @s ~~~ 1 1
## 13 | random.glass | 音调1
execute if score sound time matches 0 if score sound active matches 13 as @a at @s run playsound random.glass @s ~~~ 1 1

# --- 重置音效播放器 ---
# 当音效倒计时为0后执行
execute if score sound time matches 0 run function lib/modify_states/sound/reset
```

- **其中一个库函数**：

```mcfunction title="BP_wstd/functions/lib/modify_states/sound/random_levelup_2.mcfunction" showLineNumbers
# ===== 播放升级音效 =====
# 用于延时播放升级音效。

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 3刻后播放升级音效（音调2）

# --- 启用音效播放器 ---

## 启用音效播放器
scoreboard players set sound active 8
## 将音效播放器时间重置
scoreboard players set sound time 3

```

</details>

### 死亡榜与死亡检测系统

返回死亡榜，并返回玩家的存活与死亡状态。可以令死亡的玩家执行命令。

- **条件**：无
- **函数**：无需调用
- **返回**：
  - `deathCount.@s`：玩家自记分板创建以来的死亡次数
  - `deathState.@s`：`0`=未死亡，`1`=死亡但未记录，`2`=死亡
- **原理**：[2.4.5 记分板的运用 变量](/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d5_applications#补偿准则缺憾的实例死亡榜的实现)
- **代码**：

<details>

<summary>注册系统</summary>

新增下面的字段到主文件中。

```mcfunction title="BP/functions/system/main.mcfunction" showLineNumbers
# --- 玩家死亡检测 ---
# 控制死亡榜和玩家死亡后运行的命令
function system/player_die

```

</details>

<details>

<summary>声明全局变量</summary>

```mcfunction title="BP/functions/lib/modify_data/init/data.mcfunction" showLineNumbers
## 玩家死亡信息
scoreboard objectives add deathCount dummy "死亡榜"
scoreboard objectives add deathState dummy "死亡状态"
scoreboard players set @a deathCount 0
scoreboard players set @a deathState 0

```

</details>

<details>

<summary>死亡检测系统</summary>

您可根据自己的地图实际修改该文件。与重进玩家检测不同，`deathState.@s`和`deathCount.@s`是全局变量，可以全局使用。

```mcfunction title="BP/functions/system/player_die.mcfunction" showLineNumbers
# ===== 死亡机制 =====
# 判定死亡玩家并执行命令。

# --- 运行死亡榜 ---
scoreboard players set @a[scores={deathState=!2}] deathState 1
scoreboard players set @e[type=player] deathState 0
scoreboard players add @a[scores={deathState=1}] deathCount 1
scoreboard players set @a[scores={deathState=1}] deathState 2

# --- 死亡的玩家执行的命令 ---
# execute as @a[scores={deathState=2}] run (死亡的玩家执行的命令)

```

</details>

- **示例**：

<details>

<summary>当玩家死亡超过 5 次后执行命令</summary>

```mcfunction title="BP/functions/system/main.mcfunction" showLineNumbers
execute as @a[scores={deathCount=5..}] run say 1

```

</details>

---

## 库函数：获取数据

下面是一些**获取数据的函数**，它们通常进行一些对世界影响不大或者几乎认为无影响的操作，然后将获取到的数据输出到一个记分板变量或标签中。如果您有下面的任意一种相关需求，可以取用下面的函数。也欢迎您在这里补充您认为的一些有用的获取数据的函数。

### 检测实体数量

返回满足条件的实体数量。

- **返回**：`data.entity`：输出实体数量
- **函数**：`/function lib/get_data/entity_amount`
- **原理**：[2.4.5 记分板的运用 变量](/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d5_applications#获取实体数目)
- **代码**:

<details>

<summary>声明全局变量</summary>

```mcfunction title="BP/functions/lib/modify_data/init/data.mcfunction" showLineNumbers
## 实体数目
scoreboard players set entityAmount data 0

```

</details>

<details>

<summary>检测文件</summary>

您可以更改第 15 行的目标选择器`@e`为您需要筛选的实体，并把`entityAmount`改为合适的名字，这样该变量就输出为您需要筛选的实体的数量。

```mcfunction title="BP/functions/lib/get_data/entity_amount.mcfunction" showLineNumbers {15}
# ===== 获取实体数目 =====
# 用于检测当前情况下的实体数目。

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 输出实体数目并保存到data.entityAmount下

# --- 主体部分 ---

## 初始化
scoreboard players set entityAmount data 0
## 令每个实体都执行一次该命令，如此可记录实体数
execute as @e run scoreboard players add entityAmount data 1

```

</details>

- **示例**：

<details>

<summary>玩家人数为 14 人时执行命令</summary>

注意：下面更改了变量名为`data.playerAmount`以符合需求。

```mcfunction title="system/main.mcfunction" showLineNumbers
function lib/get_data/entity_amount
execute if score playerAmount data matches 14 run say 1

```

</details>

### 检测客户端（检测中国版或国际版）

返回玩家或服务器拥有者所正在使用的客户端，为国际版还是中国版。

- **返回**：`data.client`：输出客户端，`0`=国际版，`1`=中国版。
- **函数**：`/function lib/get_data/client`
- **原理**：网易屏蔽词屏蔽整条命令。
- **代码**:

<details>

<summary>声明全局变量</summary>

```mcfunction title="BP/functions/lib/modify_data/init/data.mcfunction" showLineNumbers
...

## 玩家使用的客户端，0=国际版，1=中国版
scoreboard players set client data 0

```

</details>

<details>

<summary>检测文件</summary>

```mcfunction title="BP/functions/lib/get_data/client.mcfunction" showLineNumbers
# ===== 获取玩家使用的游戏版本 =====
# 用于检测玩家使用的版本为国际版/网易版。

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 若为国际版，输出data.client=0；若为网易版，输出data.client=1。

# --- 主体部分 ---

## 假定当前正在使用网易版
scoreboard players set client data 1
## 试图在记分板添加data.sb（这是屏蔽词，如果为网易版，该命令无法执行）
scoreboard players set sb data 0
## 若检测到data.sb的分数，即上一条命令未被屏蔽，证明是国际版，更改data.client
execute if score sb data matches 0 run scoreboard players set client data 0
## 移除data.sb
scoreboard players reset sb data
```

</details>

- **示例**：

<details>

<summary>为国际版时执行命令，为中国版时执行另一条命令</summary>

```mcfunction title="system/main.mcfunction" showLineNumbers
function lib/get_data/client
## 国际版
execute if score client data matches 0 run say 0
## 中国版
execute if score client data matches 1 run say 1

```

</details>

### 检测玩家为存活或死亡状态

:::tip[温馨提示]

如果您使用了上面的[死亡榜与死亡检测系统](#死亡榜与死亡检测系统)，您可以直接使用`deathState.@s`实现相同的效果。

:::

返回玩家是否处于存活状态。

- **返回**：标签`isAlive`：玩家是否存活。
- **函数**：`/function lib/get_data/player_is_alive`
- **原理**：[2.4.1 标签命令](/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d1_tag#运用标签的实例)
- **代码**:

<details>

<summary>检测文件</summary>

```mcfunction title="BP/functions/lib/get_data/player_is_alive.mcfunction" showLineNumbers
# ===== 玩家存活检测 =====
# 用于检测玩家是否处于存活状态

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 若玩家存活，则有isAlive标签；若处于死亡状态，则移除isAlive标签

# --- 主体部分 ---
# 假定所有玩家均未存活（@a对全体玩家生效）
tag @a remove isAlive
# 为存活玩家添加存活标签（@e[type=player]仅对存活玩家生效）
tag @e[type=player] add isAlive
```

</details>

- **示例**：

<details>

<summary>令已死亡的玩家执行命令</summary>

```mcfunction title="system/main.mcfunction" showLineNumbers
function lib/get_data/player_is_alive
execute as @a[tag=!isAlive] as @s run say 1

```

</details>

### 检测玩家站立状态（站立潜行爬行睡觉检测）

返回玩家当前的站立状态。

- **返回**：`state.@s`：输出玩家当前的站立状态，`0`=站立，`1`=潜行，`2`=爬行，`3`=睡觉。
- **函数**：`/function lib/get_data/player_state`
- **原理**：[2.4.5 记分板的运用 变量](/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d5_applications#检测站立潜行爬行和睡觉的玩家)
- **代码**:

<details>

<summary>声明全局变量</summary>

```mcfunction title="BP/functions/lib/modify_data/init/data.mcfunction" showLineNumbers
## 玩家站立状态检测
scoreboard objectives add state dummy "玩家状态"
scoreboard players set @a state 0

```

</details>

<details>

<summary>检测文件</summary>

```mcfunction title="BP/functions/lib/get_data/player_state.mcfunction" showLineNumbers
# ===== 获取玩家潜行状态 =====
# 用于检测玩家是否处于潜行状态

# 调用此方法时：
# · 执行者为玩家
# · 执行位置为玩家当前位置
# 输出结果：
# · 若玩家站立，输出state.@s=0；若玩家潜行，输出state.@s=1；若玩家爬行，输出state.@s=2；若玩家睡觉，输出state.@s=3

# --- 检测站立 ---
# 当在玩家脚开始往上1.7格仍能检测到玩家，证明玩家站立（玩家站立为1.8格）
execute if entity @s[x=~,y=~1.7,z=~,dx=0,dy=0,dz=0] run scoreboard players set @s state 0

# --- 检测潜行 ---
# 当在玩家脚开始往上1.4~1.7格仍能检测到玩家，证明玩家潜行（玩家潜行为1.5格）
execute if entity @s[x=~,y=~1.4,z=~,dx=0,dy=0,dz=0] unless entity @s[x=~,y=~1.7,z=~,dx=0,dy=0,dz=0] run scoreboard players set @s state 1

# --- 检测爬行 ---
# 当在玩家脚开始往上0.5~1.4格仍能检测到玩家，证明玩家爬行（玩家爬行为0.6格）
execute if entity @s[x=~,y=~0.5,z=~,dx=0,dy=0,dz=0] unless entity @s[x=~,y=~1.4,z=~,dx=0,dy=0,dz=0] run scoreboard players set @s state 2

# --- 检测睡觉 ---
# 当在玩家脚开始往上0.5格以内仍能检测到玩家（或0.5格以上检测不到玩家），证明玩家睡觉（玩家睡觉为0.2格）
execute unless entity @s[x=~,y=~0.5,z=~,dx=0,dy=0,dz=0] run scoreboard players set @s state 3

```

</details>

- **示例**：

<details>

<summary>令潜行的玩家执行命令</summary>

```mcfunction title="system/main.mcfunction" showLineNumbers
function lib/get_data/player_state
execute as @a[scores={state=1}] as @s run say 1

```

</details>

### 检测玩家所处维度

返回玩家当前所处于的维度信息。

- **返回**：`dimension.@s`：输出玩家当前所处维度，`0`=主世界，`1`=下界，`2`=末地。
- **函数**：`/function lib/get_data/player_dimension`
- **原理**：[2.3.2 修饰子命令和`run`子命令](/docs/tutorials/a1_commands/b2_commands/c3_execute/d2_subcommands_1#更改执行维度的子命令in)
- **代码**:

<details>

<summary>声明全局变量</summary>

```mcfunction title="BP/functions/lib/modify_data/init/data.mcfunction" showLineNumbers
## 玩家维度检测
scoreboard objectives add dimension dummy "玩家维度"
scoreboard players set @a dimension 0

```

</details>

<details>

<summary>检测文件</summary>

```mcfunction title="BP/functions/lib/get_data/player_dimension.mcfunction" showLineNumbers
# ===== 获取玩家维度 =====
# 用于检测玩家的维度

# 调用此方法时：
# · 执行者为玩家
# · 执行位置为玩家当前位置
# 输出结果：
# · 若玩家位于主世界，输出dimension.@s=0；若玩家位于下界，输出dimension.@s=1；若玩家位于末地，输出dimension.@s=2

# --- 检测玩家处于主世界 ---
execute in overworld as @a[rm=0] run scoreboard players set @s dimension 0

# --- 检测玩家处于下界 ---
execute in nether as @a[rm=0] run scoreboard players set @s dimension 1

# --- 检测玩家处于主世界 ---
execute in the_end as @a[rm=0] run scoreboard players set @s dimension 2

```

</details>

- **示例**：

<details>

<summary>令位于下界的玩家执行命令</summary>

```mcfunction title="system/main.mcfunction" showLineNumbers
function lib/get_data/player_dimension
execute as @a[scores={dimension=1}] as @s run say 1

```

</details>

---

## 库函数：修改数据

下面是一些修改数据的函数，它们通常进行一些对世界影响较大的操作，或者对玩家执行某些命令，或者强制地修改记分板或标签的值。

### 显示空的主标题

为玩家显示一个空的主标题，以便于直接显示副标题。可设置标题时间。

- **返回**：——
- **函数**：`/function lib/modify_data/title`
- **原理**：[2.9.1 文本操作命令](/docs/tutorials/a1_commands/b2_commands/c9_effect_cmds/d1_text_cmds#格式化代码)
- **代码**:

<details>

<summary>库文件</summary>

```mcfunction title='BP/functions/lib/modify_data/title.mcfunction' showLineNumbers
# ===== 显示标题 =====
# 用于显示一个空的标题，便于直接执行副标题

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# · 执行副标题命令前先执行此命令
# 输出结果：
# · 输出一个长3秒的空标题

title @a times 0 60 0
title @a title §1

```

</details>

- **示例**：

<details>

<summary>仅显示一个副标题</summary>

```mcfunction title="system/main.mcfunction" showLineNumbers
function lib/modify_data/title
title @a subtitle 1

```

</details>

---

## 关卡构建

一张地图的关卡，往往涉及到几个基本逻辑：进入和离开（玩家主动离开、玩家因通关成功而离开、玩家因通关失败而离开）。在关卡中，可能还要循环执行命令以检测或实现特定功能。

一张地图在绝大多数情况下都可以视为是各种不同类型关卡的集合，包括各种不同的大厅、关卡、场景，甚至是同一个场景里的不同阶段、或者非线性迷宫的不同场景，都可以看作是一种“抽象的关卡”。它们基本上都可以使用上面的基本逻辑。

为了使时间线能够在不同关卡下执行不同的内容，需要人为构建一个**关卡 ID**，这是一种很常用的手法，例如将第 9 关设置为`data.level`=`9`。不过有时候往往只有一个 ID 不一定够用，例如如果涉及到不同章节、或者不同类型的关卡的变换，则需要更多的变量来表达。

关卡相关文件往往放到`levels/`文件夹中。

### 关卡启动

关卡启动往往进行一个关卡的初始化，并为后续的检测项目、循环执行的命令创造条件。

- **函数**：`/function levels/(...)/start`
- **示例**：

<details>

<summary>一种关卡启动文件模板</summary>

1. **设置关卡 ID**。在启动关卡的逻辑中，我们通常希望设置这个关卡的 ID，便于我们了解玩家究竟在玩哪一关，以及时间线究竟该执行哪一个文件。因此，我们记`data.level`为关卡 ID，并写入启动文件中。
2. **控制时间线是否启用**。非必要时，应关闭时间线以优化性能。第 7-8 行中，需要哪一个就留哪一行。
3. **其他关卡设置**。一些杂项功能，见对应注释。如果你不需要该功能，就在模板中将其删去。重置关卡可以考虑使用`/structure`或`/clone`等命令重置。
4. **音效设置**。如果您需要为玩家播放音效，使用音效控制器对玩家延时播放音效。第 16-17 行的内容，需要您安装了[音效控制器](#音效控制器系统延时播放音效)后才能使用。

下面的代码，就是我们所编写的启动关卡模板的成品。**您应当根据您的地图的实际，进行改造**。

```mcfunction title='BP/functions/levels/(关卡编号)/start.mcfunction' showLineNumbers
# ===== 启动&重启关卡 =====

## 关卡 ID
## scoreboard players set level data (ID)

## (启用/禁用)时间线
## function lib/modify_states/timeline/enable
## function lib/modify_states/timeline/disable

## 重置关卡
## structure load (...) (坐标)

## 传送玩家
## tp @a (位置) facing (面向位置)

## 音效提醒
## function lib/modify_states/sound/(音效事件)

## 清除玩家的物品
## clear @a

## 设置玩家的游戏模式
## gamemode adventure @a

## 清空玩家的药效，并恢复玩家的血量
## effect @a clear
## effect @a instant_health 1 255 true

## 显示标题
## titleraw @a title {"rawtext":[{"translate":"(主标题内容)"}]}
## titleraw @a subtitle {"rawtext":[{"translate":"(副标题内容)"}]}

## 清除多余实体
## kill @e[type=!player,type=!armor_stand]

## 特殊分值
## scoreboard players set (...)

```

</details>

### 关卡退出

关卡退出往往销毁本关的临时内容或重置本关的特殊环境，然后开启另一个关卡（往往是上一个关卡、下一个关卡或者上一级关卡、下一级关卡）。关卡通过往往也属于关卡退出的一种特殊类型（当然这种说法并不绝对）。

:::note[备注：关卡退出需要开启另一个关卡的原因]

因为一张地图往往不是只由一种关卡组成，是由若干种包括关卡、大厅、场景等广义关卡所组成的，哪怕是回到大厅或者回到什么地方，本质上也是开启了这个新的大厅关卡（只是这个关卡的运行方式和普通关卡肯定是不一样的）。

:::

- **函数**：`/function levels/(...)/quit`、`/function levels/(...)/complete`、`/function levels/(...)/fail`等
- **示例**：

<details>

<summary>一种退出关卡到上一级关卡的文件模板</summary>

下面的代码，就是我们所编写的退出关卡到上一级关卡（例如返回大厅）的模板的成品。**您应当根据您的地图的实际，进行改造**。

```mcfunction title='BP/functions/levels/(关卡编号)/quit.mcfunction' showLineNumbers
# ===== 退出关卡 =====

## (启用/禁用)时间线
## function lib/modify_states/timeline/enable
## function lib/modify_states/timeline/disable

## 调用上一级的启动函数
## function (.../start)

## 停用特殊分值
## scoreboard players reset (...)

```

</details>

<details>

<summary>一种通过关卡的文件模板</summary>

下面的代码，就是我们所编写的通过关卡的模板的成品。**您应当根据您的地图的实际，进行改造**。

```mcfunction title='BP/functions/levels/(关卡编号)/quit.mcfunction' showLineNumbers
# ===== 退出关卡 =====

## 解锁下一关
## (...)

## (启用/禁用)时间线
## function lib/modify_states/timeline/enable
## function lib/modify_states/timeline/disable

## 调用下一关或大厅的启动函数
## function (.../start)

## 停用特殊分值
## scoreboard players reset (...)

```

</details>

### 关卡时间线

关卡时间线往往执行有关本关卡的基本逻辑。这些逻辑是独立于全局之外的基本逻辑，并且常常需要循环执行或检测。

- **函数**：`/function levels/(...)/timeline`等
  - 请务必将该函数在时间线控制器（`system/controller/timeline`）按照变量`data.level`注册。
- **示例**：

<details>

<summary>一种关卡时间线的文件模板</summary>

下面的代码，就是我们所编写的通过关卡的模板的成品。**您应当根据您的地图的实际，进行改造**。

- **时间线文件的注册**

```mcfunction title='BP/functions/system/controller/timeline.mcfunction' showLineNumbers
execute if score level data matches (关卡ID) run function levels/(关卡编号)/timeline

```

- **关卡时间线模板**
  - 添加`execute if score timeline time matches (数值) run`会使得该命令在时间线运行到该数值时运行。常用于剧情设计。
  - 添加`execute if score tick time matches (数值) run`会使得该命令在每一秒运行一次。常用于无需高频运行的命令，例如`/effect`。
  - 如果直接执行命令，会使得该命令在时间线启用后每游戏刻运行一次。常用于需要时刻进行检测的命令。

```mcfunction title='BP/functions/levels/(关卡编号)/timeline.mcfunction' showLineNumbers
# ===== 时间线 =====
# 仅限在lib/function_lists/timeline注册后，且启用时间线后执行

# --- 快捷栏标题 ---
execute if score tick time matches 1 run titleraw @a actionbar {"rawtext":[{"translate":"(要播放的快捷栏标题)"}]}

# --- (用途) ---
# execute if score timeline time matches (数值) run (第 数值 刻执行的命令)
# execute if score tick time matches (数值) run (每秒执行的命令)
# (每刻执行的命令)

```

</details>

### 冒险模式物品的检测

检测冒险模式物品，以将通过合成、交易等途径获取的冒险模式不可用的物品转化为冒险模式可用的物品。

- **原理**：
  - 通过一个临时变量`data.temp.(xxx)`来检测物品。
  - 当获取物品后，清除并重新给予物品，然后调整该变量以停止检测。
  - 如果玩家以特定方式离开该关卡，请尽可能用`scoreboard players reset`销毁创建的临时变量，以防影响到其他关卡。
- **代码**：

<details>

<summary>关卡启动文件</summary>

进行变量的初始化。关于`temp.(xxx)`，请自行重命名，推荐使用驼峰命名法以与其他变量保持一致。

```mcfunction title="BP/functions/levels/(关卡编号)/start.mcfunction"
## 变量初始化
scoreboard players set temp.(xxx) data 0

```

</details>

<details>

<summary>关卡时间线文件</summary>

用于物品检测。请提前将您的关卡时间线在`system/controller/timeline`中注册，防止其不执行。

```mcfunction title="BP/functions/levels/(关卡编号)/timeline.mcfunction"
## 物品检测
execute if score temp.(xxx) data matches 0 as @a[hasitem={item=(物品ID)}] run function levels/(关卡编号)/events/get_(物品ID)

```

</details>

<details>

<summary>物品处理文件</summary>

用于清除并重给予文件。您也可以在其中添加一些音效或文本提示，提示玩家可以放置物品。

```mcfunction title="BP/functions/levels/(关卡编号)/events/get_(物品ID).mcfunction"
## 清除物品
clear @s (物品ID)

## 给予可用的物品
give @s (物品ID) 1 0 {"can_place_on":{"blocks":[(方块ID),(方块ID),...]}}

## 停止该物品的检测
scoreboard players set temp.(xxx) data 0

```

</details>

<details>

<summary>关卡退出文件</summary>

用于销毁变量。适用于任何形式的关卡退出。

```mcfunction title="BP/functions/levels/(关卡编号)/quit.mcfunction"
## 销毁临时变量
scoreboard players reset temp.(xxx) data

```

</details>

- **示例**：

<details>

<summary>获得工作台后，可放置到石英块上</summary>

- **关卡启动文件**

```mcfunction title="BP/functions/levels/level9/start.mcfunction"
## 变量初始化
scoreboard players set temp.itemTestCraftingTable data 0

```

- **关卡时间线文件**

```mcfunction title="BP/functions/levels/level9/timeline.mcfunction"
## 物品检测
execute if score temp.itemTestCraftingTable data matches 0 as @a[hasitem={item=crafting_table}] run function levels/level9/events/get_crafting_table

```

- **物品处理文件**

```mcfunction title="BP/functions/levels/level9/events/get_crafting_table.mcfunction"
## 清除物品
clear @s crafting_table

## 给予可用的物品
give @s crafting_table 1 0 {"can_place_on":{"blocks":["quartz_block"]}}

## 停止该物品的检测
scoreboard players set temp.itemTestCraftingTable data 0

```

- **关卡离开文件**

```mcfunction title="BP/functions/levels/level9/quit.mcfunction"
## 销毁临时变量
scoreboard players reset temp.itemTestCraftingTable data

```

</details>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
