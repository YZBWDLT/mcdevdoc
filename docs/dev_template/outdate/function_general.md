---
sidebar_position: 1
---

# 函数系统：主包 v1 文档

:::warning[注意]

本包是函数系统：主包 v3的旧版本，目前已经停止更新。我们将群文档迁移前的旧版文档留在这里，但我们将不再对其中的内容进行更新。

我们建议您使用新版的[函数系统](../functions/main_v3)来开发您的资源，新版的函数系统更直观易懂，并将继续维护更新。

:::

## 包性质

本包为行为包。

我们建议您把此包和「标记实体和文本展示实体」结合使用，效果更好。否则，其中的部分内容可能需要您的单独适配。

## 使用说明

* 本包已经搭建了一套较为初步的底层函数命令系统，以便您基于此底层系统编写命令。

* 在下文，我们把 a 记分板上名为 b 的追踪目标记为`a.b`。
  * 例如，检测`a.b`的分数是否为1，为`/execute if score b a matches 1`。

### 系统函数 `system/`

系统函数是本包搭建的最基础的运行系统。本包循环执行函数`system/main`，执行以下功能：

#### 时间控制器

它将控制`time.tick`每 1 刻加`1`分，在`0`-`19`之间循环。

因此，您可以使用`execute if score tick time matches <0-19之间的任意一个整数> run <命令>`来每秒执行一次指定命令。

#### 时间线

它可以用于一些**特殊情况**下的命令**循环执行**。是为了**解决函数难以设定延迟**的痛点而诞生的。

时间线有启用机制和时间线机制。

##### 启用机制

仅当时间线处于激活状态下，时间线文件（`system/controller/timeline`）中的命令才会始终执行。

> **注意**  
  这要求您必须确保您要执行的命令在时间线文件中注册过。

控制时间线启用的记分板变量是`active.timeline`。

##### 时间线机制

当启用状态为某些特殊的值的时候，会启用时间流逝，使得某些命令在某个特定的时间点执行。

记录时间线启用的时间的记分板变量是`time.timeline`。

例如，在时间线启用第135刻的时候执行`/say 1`。

##### 时间线在不同的启用状态下的执行方式

不同的启用状态可能会导致时间线的执行方式发生变化，如下表所示。

| 启用状态（`active.timeline`） | 时间值的变化（`time.timeline`） | 时间线文件的执行状态 |
| :---: | :---: | :---: |
| `1-5` | 每游戏刻自加 | 始终执行 |
| `6`或更大的值 | 不自加 | 始终执行 |
| `0`或更小的值 | 不自加 | 不执行 |

##### 一些例子

* 当时间线以状态`1`启用时，您可以用它在时间线文件内写一些**在规定时刻**执行的命令，例如在时间线启用 5 秒后执行`/gamemode`命令：

```text
execute if score timeline time matches 100 run gamemode adventure @a
```

* 当时间线以状态`6`启用时，您可以用它在时间线文件内写一些**单纯循环**执行的命令，例如时间线启用期间一直执行`/gamemode`命令：

```text
gamemode adventure @a
```

> **注意**  
  这种写法在状态`1-5`下也可以使用，但如果不需要特定时间特定命令的话，使用不会引起`time.timeline`变化的状态可以节省性能。

* 下面是节选与改编自30种死法2的时间线文件的部分内容：

```text
# ===== 时间线控制器 =====
# 该控制器将按照不同的data.level值执行不同的时间线效果。

# --- 计时 ---
# 1-5：启用并时间流逝
execute if score timeline active matches 1..5 run scoreboard players add timeline time 1

# --- 时间线函数文件列表 ---
...
## -14 | 烟花教程
execute if score level data matches -14 run function halls/record/firework/timeline
## -13 | 第一次结束主线时 | 主线关卡完成前 record.progress.mapStage = 0
execute if score level data matches -13 if score progress.mapStage record matches 0 run function halls/end/stage_1/timeline
## -13 | 第一次结束地图时 | 主线关卡完成后 record.progress.mapStage = 1~2
execute if score level data matches -13 if score progress.mapStage record matches 1..2 run function halls/end/stage_2/timeline
...
```

在第一次结束特效中，控制其特效的函数的部分内容：

```text
# ===== 第一阶段的时间线 =====

# --- 主时间线 ---

## [40~50] 粒子效果
execute if score timeline time matches 40..50 run particle minecraft:totem_particle -40 11 28
execute if score timeline time matches 40..50 run particle minecraft:totem_particle -40 11 27
execute if score timeline time matches 40..50 run particle minecraft:totem_particle -40 11 26
execute if score timeline time matches 40..50 as @a at @s run playsound random.orb @s ~~~

## [120] 模拟爆炸 | 粒子、音效、视角摇晃、清理方块、清除掉落物
execute if score timeline time matches 120 run particle wstd:explosion -40 10 28
execute if score timeline time matches 120 run particle wstd:explosion -40 10 27
execute if score timeline time matches 120 run particle wstd:explosion -40 10 26
execute if score timeline time matches 120 as @a at @s run playsound random.explode @s
execute if score timeline time matches 120 run camerashake add @a 1 1 positional
execute if score timeline time matches 120 run fill -40 12 28 -39 9 26 air [] destroy
execute if score timeline time matches 120 run kill @e[type=item]

## [120] 设置信标
execute if score timeline time matches 120 run setblock -47 9 28 beacon

...
```

#### 剧情线

它可以用于`/tellraw`等命令在规定情况下执行，其**原理与时间线类似**。

剧情线有启用机制、时间线机制和视角锁定机制。

##### 启用机制

仅当剧情线处于激活状态下，剧情线文件（`system/controller/dialogue`）中的命令才会始终执行。

> **注意**  
  这要求您必须确保您要执行的命令在剧情线文件中注册过。

控制剧情线启用的记分板变量是`active.dialogue`。

##### 剧情线机制

剧情线启用时，会启用时间流逝，使得某些命令在某个特定的时间点执行。

记录剧情线启用的时间的记分板变量是`time.dialogue`。

##### 视角锁定机制

当启用状态为某些特殊的值的时候，会启用视角锁定。此时，玩家会被传送到名为`playerPosition`的实体上，面向名为`facingPosition`的实体上，以锁定视角。

##### 剧情线在不同的启用状态下的执行方式

不同的启用状态可能会导致剧情线的执行方式发生变化，如下表所示。

| 启用状态（`active.dialogue`） | 时间值的变化（`time.dialogue`） | 剧情线文件的执行状态 | 玩家视角锁定 |
| :---: | :---: | :---: | :---: |
| `1`-`5`以及`11`或更大的值 | 每游戏刻自加 | 始终执行 | 不锁定 |
| `6`-`10` | 每游戏刻自加 | 始终执行 | 锁定 |
| `0`或更小的值 | 不自加 | 不执行 | 不锁定 |

##### 一些例子

如果您要启用锁定视角的对话，只需要把剧情线的启用状态改为`6`，并且设定`playerPosition`实体和`facingPosition`实体的位置即可。

利用剧情线执行命令的方式，和时间线类似。

以下是 30 种死法 2 地图中，第一次结束特效使用的剧情线（节选）。

```text
# ===== 剧情线 =====

# --- 第一阶段时 ---

## [160] 播放标题
execute if score dialogue active matches 6 if score dialogue time matches 160 run titleraw @a title {"rawtext":[{"translate":"title.mainline_completed"}]}
execute if score dialogue active matches 6 if score dialogue time matches 160 run titleraw @a subtitle {"rawtext":[{"translate":"subtitle.mainline_completed"}]}
execute if score dialogue active matches 6 if score dialogue time matches 160 as @a at @s run playsound random.levelup @s ~~~ 1 0.75 1

## [161] 解除视角控制
execute if score dialogue active matches 6 if score dialogue time matches 161 run function lib/modify_states/dialogue/disable

...
```

#### 音效控制器

当玩家传送后的瞬间执行`/playsound`命令会导致玩家无法听见这声音，音效控制器因此而生。

音效控制器有启用机制和时间线机制。

##### 启用机制

仅当音效控制器处于激活状态下，才会延时播放音效。不同的音效控制器状态，会导致播放不同的音效。音效控制器文件位于`system/controller/sound`。

> **注意**  
  这要求您必须确保您要执行的`/playsound`命令在音效控制器文件中注册过。

音效控制器的启用，由`active.sound`控制。

##### 时间线机制

音效控制器的时间值，由`time.sound`记录。

若时间值为`1`或更大的值，则`time.sound`会每刻自减以进行倒计时，当倒计时归零后，系统会自动将启用状态改为`0`，并且`time.sound`会改为一个非零的值。

> **注意**  
  在启用音效控制器之前，请先保证`time.sound`为一个非零的值。

##### 一些例子

在 30 种死法 2 中使用的音效控制器文件如下。

```text
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

这样，当启用状态为`13`时，倒计时结束后将播放玻璃破碎的音效。

#### 反作弊系统

> **注意**  
  此函数无条件地循环执行。

您可以在其中插入您需要的反作弊命令。下面提供了一些您可能需要的反作弊字段。

```text
# --- 游戏模式限制 ---
# 仅在非开发者模式下执行
execute unless score developerMode settings matches 1 as @a[m=!adventure] run gamemode adventure @s
```

```text
# --- 禁止玩家放船 ---
kill @e[family=boat]
```

```text
# --- 禁止玩家投掷末影珍珠 ---
kill @e[family=ender_pearl]
```

```text
# --- 禁止玩家搭建传送门 ---
execute as @a at @s run fill  -5 -5 -5 5 5 5 air replace portal
execute as @a at @s run fill  -5 -5 -5 5 5 5 air replace end_portal
```

#### 反退出系统

> **注意**  
  此函数无条件地循环执行。

此函数将检测玩家是否为重进地图的玩家，如果是，则该玩家的`isOnline.@s`将被改为`0`，这样，您就可以通过反退出系统令退出重进的玩家执行特定的命令，防止他们对您的地图造成严重打击。

如果您对此系统的运行机理感兴趣，您可自行查看对应函数的命令了解详情。

### 库函数 `lib/`

库函数是在您的资源各处都多次调用的，由几条简单的命令组成的函数。

如果您在编写函数的过程中，发现了一些您可能需要不断使用的重复的命令，您就可以将它们打包为一个库函数。

使用库函数的好处很多，最大的优点莫过于「**一次更改，全局生效**」！

在库函数中装了一些您可能需要的获取数据、或更改数据的函数。

#### 获取数据的函数

1. 获取玩家数目（`lib/get_data/amount_player`），它会将玩家数目输出到变量`data.playerAmount`中。

2. 获取玩家客户端为国际版还是网易版（`lib/get_data/client`），它会将目前服务端正在使用的版本输出到变量`data.client`中，`0`代表国际版，`1`代表中国版。

3. 获取玩家是否在游戏意义上地存活（`lib/get_data/player_is_alive`）。使用此函数后，仍然存活的玩家（即未处于死亡状态）将拥有`isAlive`标签。

4. 获取玩家是否退出重进（`lib/get_data/player_is_online_before`和`lib/get_data/player_is_online_after`）。这是反退出系统的基础函数，请勿修改。

5. 获取玩家状态是站立、潜行、爬行和游泳、睡觉（`lib/get_data/player_state`），并将这状态输出到变量`state.@s`中。`0`代表站立，`1`代表潜行，`2`代表爬行，`3`代表睡觉。

#### 更改数据的函数

1. 初始化所有记分板数值（`lib/modify_data/init/data`）。您需要将您需要的变量在此进行注册。

2. 初始化所有 gamerule（`lib/modify_data/init/gamerule`）。您可按需修改这些值。

#### 更改时间线、剧情线、音效控制器状态的函数

以下是包自带的更改时间线、剧情线、音效控制器状态的函数。**我们建议使用这些库函数更改它们的状态！**

1. 设置时间线状态（`lib/modify_states/timeline/`），其中带`_keep`的是不会更改`time.timeline`值的函数。

2. 设置剧情线状态（`lib/modify_states/dialogue/`），其中带`_keep`的是不会更改`time.dialogue`值的函数。

3. 设置音效控制器状态（`lib/modify_states/sound/`）。

##### 一些例子

* 启用时间值流逝的时间线，并且重置时间值：

```text
function lib/modify_states/timeline/enable_pass_1
```

* 启用锁定玩家视角的剧情线，但不重置时间值：

```text
function lib/modify_states/dialogue/enable_lock_6_keep
```

* 延时播放`random.orb`音效：

```text
function lib/modify_states/sound/random_orb
```

#### 自定义库函数

您在开发过程中一定会遇到需要重复使用某几条命令的情况。在这种情况下，我们强烈建议您打包成一个库函数，并在您需要的时候重复调用。如果您要编写一个库函数，您可以按照下面的格式编写：

```text
# ===== <函数功能> =====
# <函数具体功能>

# 调用此方法时：
# · 执行者为<某实体>
# · 执行位置为<某位置>
# 输出结果：
# · <会造成的某种结果，例如记分板数值的输出>

# --- <功能> ---
<具体命令>
```

##### 例子 - 延时播放`random.levelup`音效

这个实例并没有在包中给出，但我们可以模仿已有的内容进行编写。首先你需要打开音效控制器文件，包中的内容如下：

```text
# ===== 音效播放器 =====
# <!> 注意：该函数仅当音效播放器启用后执行

# --- 音效倒计时 ---
scoreboard players remove sound time 1

# --- 音效事件 ---
# 当音效倒计时为0后执行
execute if score sound time matches 0 if score sound active matches 1 as @a at @s run playsound random.orb @s ~~~ 1 1

# --- 重置音效播放器 ---
# 当音效倒计时为0后执行
execute if score sound time matches 0 run function lib/modify_states/sound_player/reset
```

您可以在「音效事件」模块中加入下面一行：

```text
execute if score sound time matches 0 if score sound active matches 2 as @a at @s run playsound random.levelup @s ~~~ 1 1
```

即在音效控制器启用状态为`2`时执行`playsound random.levelup @s ~~~ 1 1`命令。然后，在库文件夹（`lib/modify_states/sound/`）中创建一个新的函数`random_levelup.mcfunction`，写入以下内容：

```text
# ===== 播放升级音效 =====
# 用于延时播放升级音效。

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 3刻后播放升级音效

# --- 启用音效播放器 ---

## 启用音效播放器
scoreboard players set sound active 2
## 将音效播放器时间重置
scoreboard players set sound time 3
```

时间参数是您可以自定义的。这样，您便可以通过使用下面的命令延时播放这个音效：

```text
function lib/modify_states/sound/random_levelup
```

##### 例子 - 30 种死法 2 中的一个给予物品的库函数

位于`lib/modify_data/reset_and_quit`。在该地图中，重置与退出物品是经常要给予的物品，因此需要使用这样的库函数不断地重复调用。

```text
# ===== 重置与退出 =====
# 用于给予玩家重置与退出

# 调用此方法时：
# · 执行者为玩家
# · 执行位置任意
# 输出结果：
# · 若玩家没有重置与退出物品，则给予玩家重置与退出

# --- 清除物品 ---
function lib/modify_data/item/clear

# --- 给予重置与退出 ---
give @s[hasitem={item=wstd:reset,quantity=0}] wstd:reset 1 0 { "item_lock": { "mode": "lock_in_inventory" } }
give @s[hasitem={item=wstd:quit,quantity=0}] wstd:quit 1 0 { "item_lock": { "mode": "lock_in_inventory" } }
replaceitem entity @s[hasitem={item=wstd:play_music,quantity=0}] slot.inventory 8 wstd:play_music 1 0 { "item_lock": { "mode": "lock_in_inventory" } }
```
