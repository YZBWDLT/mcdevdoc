# 函数系统：主包 v2 文档

:::warning[注意]

本包是函数系统：主包 v3的旧版本，目前已经停止更新。我们将群文档迁移前的旧版文档留在这里，但我们将不再对其中的内容进行更新。

我们建议您使用新版的[函数系统](../functions/main_v3)来开发您的资源，新版的函数系统更直观易懂，并将继续维护更新。

:::

:::info[本包性质]

本包为**行为包**。

我们建议您把此包和「[标记实体和文本展示实体](../marker_and_test_display)」结合使用，效果更好。否则，其中的部分内容可能需要您的单独适配。

:::

本包已经搭建了一套较为初步的底层函数命令系统，以便您基于此底层系统编写命令。

:::note[注意：本文的通用语言]

在下文，我们把 a 记分板上名为 b 的追踪目标记为`a.b`。例如，检测`a.b`的分数是否为1，为`/execute if score b a matches 1`。

:::

## 系统函数 `system/`

系统函数是本包搭建的最基础的运行系统。本包循环执行函数`system/main`，执行以下功能：

### 主文件

:::info[文件路径]

控制此功能的文件位于 `system/main.mcfunction` 。本函数无条件地循环执行。

:::

此文件中的命令将无条件地循环执行。包括本包中的其他功能，也全部依靠该文件执行命令。您可以在其中键入一条简单的命令（例如`say 1`）之后`/reload`，您将看到您的服务器将不断发送消息。

### 时间控制器

:::info[文件路径]

控制此功能的文件位于 `system/timer.mcfunction` 。

:::

它将控制`time.tick`每 1 刻加`1`分，在`0`-`19`之间循环。

因此，您可以使用`execute if score tick time matches <0-19之间的任意一个整数> run <命令>`来每秒执行一次指定命令。

### 时间线

:::info[文件路径]

控制此功能的文件位于 `system/controller/timeline.mcfunction` 。

:::

用于一些**特殊情况**下的命令**循环执行**。是为了**解决函数难以设定延迟**的痛点而诞生的。

为使用时间线，您需要**先启用时间线**，时间线启用后，文件中的命令才会循环执行。**您要执行的命令需要在时间线文件中手动注册**。控制时间线启用的记分板变量是`active.timeline`。例如，您可以在时间线文件中加入一条新的命令：

```text title='system/controller/timeline.mcfunction'
say Hello,world!
```

那么，当您使用下面的命令后

```text
scoreboard players set timeline active 1
```

您将看见服务器不断的发送“Hello,world!”的消息。您可以**关闭时间线**来关闭这条命令：

```text
scoreboard players set timeline active 0
```

我们为时间线机制增加了一个功能：**时间流逝**，使其可以在特定的时间点做特定的事情。您可以调控`data.timeLapse`来启用这个功能，当该值大于`0`的时候，会启用时间流逝。您可以在变量`time.timeline`中获取到这个时间点。例如，如果您要在时间线启用的第 150 刻执行特定命令，您可以在时间线文件中加入一条新的命令：

```text title='system/controller/timeline.mcfunction'
execute if score timeline time matches 150 run say success!
```

然后，使用下面的命令**启用时间线和时间流逝**：

```text
## 启用时间线
scoreboard players set timeline active 1
## 启用时间流逝
scoreboard players set timeLapse data 1
```

若如此做，您将会在执行这两条命令后的 7.5 秒看到一条服务器发送的“success!”消息。

如果要关闭时间流逝，您可以关闭时间线和时间流逝，但**注意不要忘记把时间值也归零**：

```text
## 启用时间线
scoreboard players set timeline active 0
## 启用时间流逝
scoreboard players set timeLapse data 0
## 时间值归零
scoreboard players set timeline time 0
```

**我们会在后面的库函数（`lib/`）中介绍一些常用的时间线操作。**

时间线机制的另一个功能：**视角锁定**，使您可以强制控制玩家在什么位置面向什么地方。您可以调控`data.lockCamera`来启用这个功能，当该值大于`0`的时候，会启用时间流逝。此时，玩家会被传送到名为`playerPosition`的实体上，面向名为`facingPosition`的实体上，以锁定视角。

:::danger[温馨提示]

网易在中国版更新 1.20.50 后新增了一条新命令 `/camera` 。我们强烈推荐您使用该命令配合 `/inputpermission` 实现更加优质的动画效果。我们会在后续的更新中**移除视角锁定**功能。

:::

例如，如果您希望在时间线启用后锁定视角对话，可以在时间线文件里新增下面的内容：

```text title='system/controller/timeline.mcfunction'
execute if score timeline time matches 80 run say 1
execute if score timeline time matches 160 run say 2
execute if score timeline time matches 240 run say 3
```

这代表着，当时间线被启用后，在特定的时间执行`/say`命令。显然，这需要开启时间流逝。您可以使用下面的命令启用时间线、时间流逝和**视角锁定**：

```text
## 启用时间线
scoreboard players set timeline active 1
## 启用时间流逝
scoreboard players set timeLapse data 1
## 启用视角锁定
scoreboard players set lockCamera data 1
```

若如此做，您将会在执行这两条命令后的 4 秒、 8 秒、 12 秒分别看到服务器发送的消息。同时，**您的视角将被固定，无法移动**。您可以分别尝试一下这些命令，或许会对您理解这个机制有积极作用：

```text
/tp @e[name=playerPosition] 0 64 0
```

```text
/tp @e[name=facingPosition] 10 64 10
```

```text
## 改变玩家位置
tp @e[name=playerPosition] ???
## 改变玩家朝向
tp @e[name=facingPosition] ???
```

### 音效控制器

:::info[文件路径]

控制此功能的文件位于 `system/controller/sound.mcfunction` 。

:::

当玩家传送后的瞬间执行`/playsound`命令会导致玩家无法听见这声音，音效控制器因此而生。音效控制器的原理是，当您启用音效控制器后，将启用一段时间很短的倒计时，倒计时结束后再播放音效，换言之，**延时播放音效**。

为使用音效控制器，您需要先**启用音效控制器**。控制音效控制器启用的记分板变量是`active.sound`。不同的音效控制器状态，会导致播放不同的音效。例如，我们在 30 种死法 2 中使用的音效控制器文件（节选）如下。

```text title='system/controller/sound.mcfunction' showLineNumbers
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
...
## 12 | random.anvil_land | 音调1
execute if score sound time matches 0 if score sound active matches 12 as @a at @s run playsound random.anvil_land @s ~~~ 1 1
## 13 | random.glass | 音调1
execute if score sound time matches 0 if score sound active matches 13 as @a at @s run playsound random.glass @s ~~~ 1 1

# --- 重置音效播放器 ---
# 当音效倒计时为0后执行
execute if score sound time matches 0 run function lib/modify_states/sound/reset
```

这样，当启用状态为`13`时，倒计时结束后将播放玻璃破碎的音效（`random.glass`）。因此，您必须确保您要执行的`/playsound`命令在音效控制器文件中注册过。

而控制倒计时时长的变量则为`time.sound`。若时间值为`1`或更大的值，则`time.sound`会每刻自减以进行倒计时，当倒计时归零后，系统会自动将启用状态改为`0`，并且`time.sound`会改为一个非零的值。在启用音效控制器之前，请先保证`time.sound`为一个非零的值。

### 反作弊系统

:::info[文件路径]

控制此功能的文件位于 `system/anticheating.mcfunction` 。本函数无条件地循环执行。

:::

您可以在其中插入您需要的反作弊命令。下面提供了一些您可能需要的反作弊字段。

```text title='system/anticheating.mcfunction' showLineNumbers
# --- 游戏模式限制 ---
# 仅在非开发者模式下执行
execute unless score developerMode settings matches 1 as @a[m=!adventure] run gamemode adventure @s
```

```text title='system/anticheating.mcfunction' showLineNumbers
# --- 禁止玩家放船 ---
kill @e[family=boat]
```

```text title='system/anticheating.mcfunction' showLineNumbers
# --- 禁止玩家投掷末影珍珠 ---
kill @e[family=ender_pearl]
```

```text title='system/anticheating.mcfunction' showLineNumbers
# --- 禁止玩家搭建传送门 ---
execute as @a at @s run fill  -5 -5 -5 5 5 5 air replace portal
execute as @a at @s run fill  -5 -5 -5 5 5 5 air replace end_portal
```

### 反退出系统

:::info[文件路径]

控制此功能的文件位于 `system/antileave.mcfunction` 。本函数无条件地循环执行。

:::

此函数将检测玩家是否为重进地图的玩家，如果是，则该玩家的`isOnline.@s`将被改为`0`，这样，您就可以通过反退出系统令退出重进的玩家执行特定的命令，防止他们对您的地图造成严重打击。

如果您对此系统的运行机理感兴趣，您可自行查看对应函数的命令了解详情。

## 库函数 `lib/`

库函数是在您的资源各处都多次调用的，由几条简单的命令组成的函数。

如果您在编写函数的过程中，发现了一些您可能需要不断使用的重复的命令，您就可以将它们打包为一个库函数。

使用库函数的好处很多，最大的优点莫过于「**一次更改，全局生效**」！

在库函数中装了一些您可能需要的获取数据、或更改数据的函数。

### 获取数据的函数

:::info[文件路径]

控制此功能的文件位于 `lib/get_data/` 文件夹。

:::

获取数据的函数通常进行一些对世界影响不大或者几乎认为无影响的操作，然后将获取到的数据输出到一个记分板变量或标签中。我们编写了以下的几个预设函数，可能会对您有所帮助。

| 文件名（`.mcfunction`） | 用途 | 输出数据（变量、标签） |
| --- | --- | --- |
| `amount_player` | 获取玩家数目 | `data.playerAmount`：玩家数目 |
| `client` | 获取玩家服务端为国际版还是网易版 | `data.client`，`0`：国际版，`1`：中国版 |
| `player_is_alive` | 获取玩家是否在游戏意义上地存活 | `isAlive`（标签）：存活的玩家将拥有此标签 |
| `player_is_online_before` & `player_is_online_after` | 获取玩家是否退出重进 | `isOnline.@s`，0：刚进入游戏，1：在线 |
| `player_state` | 获取玩家状态 | `state.@s`，`0`：站立，`1`：潜行，`2`：爬行，`3`：睡觉 |

:::danger[警告]

`player_is_online_before`和`player_is_online_after`是反退出系统的基础函数，请勿修改。

:::

### 更改数据的函数

:::info[文件路径]

控制此功能的文件位于 `lib/modify_data/` 文件夹。

:::

更改数据的函数通常进行一些对世界影响较大的操作，或者对玩家执行某些命令，或者强制地修改记分板或标签的值。我们编写了以下的几个预设函数，可能会对您有所帮助。

| 文件名（`.mcfunction`） | 用途 | 输出数据（变量、标签） |
| --- | --- | --- |
| `init/data` | 重置注册变量 | —— |
| `init/gamerule` | 重置默认的游戏规则 | —— |
| `title` | 播放一个特定时长的空标题，以便于开发者快捷使用`title ... subtitle` | —— |

### 更改状态的函数

:::info[文件路径]

控制此功能的文件位于 `lib/modify_states/` 文件夹。

:::

在前文的[时间线](#时间线)和[音效控制器](#音效控制器)中，实质上它们都是各种**状态**之间的变换。例如，从时间流逝状态变为停止流逝状态、从启用音效倒计时进入停止音效倒计时的状态转变。因此，您可以在这里编写有关时间线和音效控制器，以至于您的项目中所需要的状态转换，都可以写在这里。我们编写了以下的几个预设函数，可能会对您有所帮助。

:::tip[温馨提示]

我们建议使用这些库函数更改它们的状态。因为这些状态的变换一般是多条命令实现的，使用我们提供的库函数有助于您的代码简洁而直观。

:::

| 文件名（`.mcfunction`） | 用途 | 输出数据（变量、标签） |
| --- | --- | --- |
| `sound/random_orb` | 准备播放`random.orb`音效所需的变量 | `active.sound`=`1`, `time.sound`=`3` |
| `sound/reset` | 重置音效控制器相关变量 | `active.sound`=`0`, `time.sound`=`3` |
| `timeline/disable` | 禁用时间线 | `active.timeline`=`0`，`time.timeline`=`0`, `data.timeLapse`=`0`, `data.lockCamera`=`0` |
| `timeline/disable_keep` | 禁用时间线，但是保留时间值`time.timeline` | `active.timeline`=`0`, `data.timeLapse`=`0`, `data.lockCamera`=`0` |
| `timeline/disable_lock_camera` | 禁用时间线的视角锁定，并解除玩家的隐身状态 | `data.lockCamera`=`0` |
| `timeline/disable_time_lapse` | 禁用时间线的时间流逝 | `time.timeline`=`0`, `data.timeLapse`=`0` |
| `timeline/disable_time_lapse_keep` | 禁用时间线的时间流逝，但是保留时间值`time.timeline` | `data.timeLapse`=`0` |
| `timeline/enable` | 启用时间线 | `active.timeline`=`1`，`time.timeline`=`0` |
| `timeline/enable_keep` | 启用时间线，但是保留时间值`time.timeline` | `active.timeline`=`1` |
| `timeline/enable_lock_camera` | 启用时间线的视角锁定，如果有多名玩家则施加隐身状态 | `data.lockCamera`=`1` |
| `timeline/enable_time_lapse` | 启用时间线的时间流逝 | `time.timeline`=`0`, `data.timeLapse`=`1` |
| `timeline/enable_time_lapse_keep` | 启用时间线的时间流逝，但是保留时间值`time.timeline` | `data.timeLapse`=`1` |

:::tip[温馨提示]

`sound/random_orb`是我们为您提供的一个模板样例。您可根据这个模板写出更多您所需的延时播放音效的库函数控制文件。

:::

:::danger[警告]

- `sound/reset`是重置音效控制器的重要文件。除非您知道更改它会意味着什么，否则请勿更改。
- 已知问题：`timeline/enable`和`timeline/enable_keep`不能正确地将`active.timeline`改为`1`，请自行手动调整，我们会在后续的更新中修复此问题，

:::

例如，您可以使用下面的命令来延时播放`random.orb`音效

```text
function lib/modify_states/sound/random_orb
```

### 自定义库函数

您在开发过程中一定会遇到需要重复使用某几条命令的情况。在这种情况下，我们强烈建议您打包成一个库函数，并在您需要的时候重复调用。如果您要编写一个库函数，您可以按照下面的格式编写：

```text title='lib/.../?.mcfunction'
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

例如，如果您需要延时播放`random.levelup`音效，这个实例并没有在包中给出，但我们可以模仿已有的内容进行编写。首先您需要打开音效控制器文件，包中的内容如下，您可以加入其中我们高亮的那一行：

```text title='system/controller/sound.mcfunction' showLineNumbers {10}
# ===== 音效播放器 =====
# <!> 注意：该函数仅当音效播放器启用后执行

# --- 音效倒计时 ---
scoreboard players remove sound time 1

# --- 音效事件 ---
# 当音效倒计时为0后执行
execute if score sound time matches 0 if score sound active matches 1 as @a at @s run playsound random.orb @s ~~~ 1 1
execute if score sound time matches 0 if score sound active matches 2 as @a at @s run playsound random.levelup @s ~~~ 1 1

# --- 重置音效播放器 ---
# 当音效倒计时为0后执行
execute if score sound time matches 0 run function lib/modify_states/sound_player/reset

```

即在音效控制器启用状态为`2`时执行`playsound random.levelup @s ~~~ 1 1`命令。然后，在库更改状态的文件夹中创建一个新的函数`random_levelup.mcfunction`，写入以下内容：

```text title='lib/modify_states/sound/random_levelup.mcfunction' showLineNumbers
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

另一个例子是 30 种死法 2 中的一个给予物品的库函数。它位于`lib/modify_data/reset_and_quit`。在该地图中，重置与退出物品是经常要给予的物品，因此需要使用这样的库函数不断地重复调用。

```text title='lib/modify_data/reset_and_quit.mcfunction' showLineNumbers
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
