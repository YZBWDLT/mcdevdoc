---
sidebar_position: 3
---

# 检测冒险模式的物品

本文提供一个**用于检测冒险模式物品的方法，以将通过合成、交易等途径获取的冒险模式不可用的物品转化为冒险模式可用的物品**。

本文的内容基于「[主包 v3](../main_v3)」的架构。

:::note[注意：本文的通用语言]

- **路径表示**：如无特殊说明，本文的路径`./`均指代`BP/functions/lib/get_data/`。
  - 例如，`./entity_amount.mcfunction`指代`BP/functions/lib/get_data/entity_amount.mcfunction`。
- **变量表示**：本文，我们把 a 记分板上名为 b 的追踪目标记为`a.b`。
  - 例如，检测`a.b`的分数是否为1，为`/execute if score b a matches 1`。

:::

## 原理

使用`hasitem`检测。而且，应当采用一个临时变量（我们这里记为`active.(物品ID)Test`）阻止重复检测。

该方法适用于各类关卡之中。

## 代码实现

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
