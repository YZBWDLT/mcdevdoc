---
sidebar_position: 3
---

# 建立关卡

本文提供一个**使用函数创建新关卡的方法**，以便于您根据您的关卡设定做出个性化调整。

本文的内容基于「[主包 v3](../main_v3)」的架构。

:::note[注意：本文的通用语言]

- **路径表示**：如无特殊说明，本文的路径`./`均指代`BP/functions/levels/(xxx)/`，代表`(xxx)`关的文件。
  - 例如，`./start.mcfunction`指代`BP/functions/levels/(xxx)/start.mcfunction`。
- **变量表示**：本文，我们把`objective`记分板上名为`name`的追踪目标的分数`score`记为`objective.name`=`score`。
  - 例如，检测`objective.name`的分数是否为`1`，为`/execute if score name objective matches 1`。

:::

## 建立关卡模板

### 原理

一个关卡通常都需要设定进入和离开时所执行的命令，以及通常都需要设定本关需要循环检测、计时的内容。因此，**您可以事先建立一个关卡模板**，以便后续所有关卡套用使用。

在您的关卡设置中，我们假定下列文件的用途为：

- `BP/functions/levels/template/start.mcfunction`：**启动文件（模板）**，用于启动该关卡，并进行初始化，决定是否开启特定的功能。
- `BP/functions/levels/template/timeline.mcfunction`：**时间线文件（模板）**，用于在该关卡内进行循环检测或计时。
- `BP/functions/levels/template/quit.mcfunction`：**离开文件（模板）**，用于离开该关卡。
- `BP/functions/levels/template/complete.mcfunction`：**通关文件（模板）**，用于通过该关卡，标记该关卡已完成。

其中`levels`的内容视您个人情况而定。如果您已有了类似功能的文件，请使用您已有的文件。如果您还没有类似功能的文件，请按照您的个人习惯新建一个。

### 启动文件（模板）的代码实现

1. **设置关卡 ID**。在启动关卡的逻辑中，我们通常希望设置这个关卡的 ID，便于我们了解玩家究竟在玩哪一关，以及时间线究竟该执行哪一个文件。因此，我们记`data.level`为关卡 ID，并写入启动文件中。
2. **控制时间线是否启用**。非必要时，应关闭时间线以优化性能。第 7-8 行中，需要哪一个就留哪一行。
3. **其他关卡设置**。一些杂项功能，见对应注释。如果你不需要该功能，就在模板中将其删去。重置关卡可以考虑使用`/structure`或`/clone`等命令重置。
4. **音效设置**。如果您需要为玩家播放音效，使用音效控制器对玩家延时播放音效。第 16-17 行的内容，需要您安装了[音效控制器](../sound_controller)后才能使用。

下面的代码，就是我们所编写的启动关卡模板的成品。您还需要根据您的地图的实际，进行改造。

```mcfunction title='启动文件（模板）' showLineNumbers
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

### 时间线文件（模板）的代码实现

时间线做一个简单预留即可。因为并不是所有关卡都需要用到时间线。

- 添加`execute if score timeline time matches (数值) run`会使得该命令在时间线运行到该数值时运行。常用于剧情设计。
- 添加`execute if score tick time matches (数值) run`会使得该命令在每一秒运行一次。常用于无需高频运行的命令，例如`/effect`。
- 如果直接执行命令，会使得该命令在时间线启用后每游戏刻运行一次。常用于需要时刻进行检测的命令。

```mcfunction title='启动文件（模板）' showLineNumbers
# ===== 时间线 =====
# 仅限在lib/function_lists/timeline注册后，且启用时间线后执行

# --- 快捷栏标题 ---
execute if score tick time matches 1 run titleraw @a actionbar {"rawtext":[{"translate":"(要播放的快捷栏标题)"}]}

# --- (用途) ---
# execute if score timeline time matches (数值) run (第 数值 刻执行的命令)
# execute if score tick time matches (数值) run (每秒执行的命令)
# (每刻执行的命令)

```

### 离开文件（模板）的代码实现

玩家离开某一关，一般为回到大厅。本质上来讲，就是开启了一个特殊的关卡——大厅，因此直接调用大厅的启动函数即可。

```mcfunction title='离开文件（模板）' showLineNumbers
# ===== 退出关卡 =====

## (启用/禁用)时间线
## function lib/modify_states/timeline/enable
## function lib/modify_states/timeline/disable

## 调用上一级的启动函数
## function (.../start)

## 停用特殊分值
## scoreboard players reset (...)

```

### 通关文件（模板）的代码实现

玩家通过某一关，需要进行标记，然后视情况确认是进入下一关还是返回大厅。本质上和离开文件类似。

```mcfunction title='通关文件（模板）' showLineNumbers
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

### 模板实例化

我们假设现在使用模板来构建第一关。您使用这些模板的基本步骤如下：

1. 新建一个文件夹`BP/functions/levels/level_1`，标记为第 1 关；
2. 将模板中的 4 个文件全部复制到该文件夹中；
3. 逐行检查进行更改。

### 实例

## 检测冒险模式物品

### 原理

### 代码实现

这个功能需要变量的初始化和循环检测。

1. 在您的关卡设置中，我们假定下列文件的用途为：

- `BP/functions/(levels)/(xxx)/start.mcfunction`：**启动文件**，用于启动该关卡，并进行初始化，决定是否开启特定的功能
- `BP/functions/(levels)/(xxx)/timeline.mcfunction`：**时间线文件**，用于在该关卡内进行循环检测或计时
- `BP/functions/(levels)/(xxx)/quit.mcfunction`：**离开文件**，用于离开该关卡
- `BP/functions/(levels)/(xxx)/item_test/(物品ID).mcfunction`：**物品给予文件**，用于给予玩家一个新的

其中`(levels)`和`(xxx)`的内容视您个人情况而定。如果您已有了类似功能的文件，请使用您已有的文件。如果您还没有类似功能的文件，请按照您的个人习惯新建一个。  

2. 将您的时间线文件注册到时间线控制文件中：

```mcfunction title='BP/functions/system/controller/timeline.mcfunction' showLineNumbers {9}
# ===== 时间线控制器 =====
# <!> 注意：该函数仅当时间线启用后执行

# --- 时间值流逝 ---
# 当data.timeLapse > 0时，会导致time.timeline每游戏刻自加
execute if score timeLapse data matches 1.. run scoreboard players add timeline time 1

# --- 需要启用的时间线文件 ---
execute if score (level data) matches (分值) run function (levels/xxx/timeline)

```

其中，`data.level`代表正在进行的关卡的 ID，您可以视您个人情况确定这个检测内容。

3. 在您的启动文件中，您需要新增一个用于检测的变量`active.(物品ID)Test`，习惯上使用驼峰法命名（例如`diamondSwordTest`、`grassBlockTest`），但您完全可以依照个人习惯命名。在启动文件中新增下面两行：

```mcfunction title='启动文件' showLineNumbers
## (物品)检测
scoreboard players set (物品ID)Test active 1
```

我们标记这个检测变量为`1`时处于检测状态，为`0`时处于停止检测的状态。

4. 在时间线中添加用于物品检测的内容。

```mcfunction title='时间线文件' showLineNumbers
# ===== 时间线 =====
# 仅限在lib/function_lists/timeline注册后，且启用时间线后执行

# --- 物品检测 ---
execute if score (物品ID)Test active matches 1 as @a[hasitem={item=(物品ID)}] run function levels/xxx/item_tests/(物品ID)

```
