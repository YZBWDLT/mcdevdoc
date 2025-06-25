---
sidebar_position: 1
---

# 主包 v3

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import Download from "/src/components/highlight/download"

<Download url="https://app.nekodrive.net/s/qw1tO"/>

本包已经搭建了一套**较为完善的计时函数命令系统**，以便您基于此底层系统编写命令。

目前为止，基岩版的函数系统相比于命令方块系统仍旧有两大硬伤。第一是条件性命令，这个缺陷随着`/execute`的更新已经缓解许多。**而计时问题，则是函数系统的第二大硬伤**。为了解决这个问题，我们专门基于记分板搭建了一个自带计时功能的命令系统。

本包为**行为包**。本包是其他众多函数系统包的基础包。

:::note[注意：本文的通用语言]

- **变量表示**：本文，我们把`objective`记分板上名为`name`的追踪目标的分数`score`记为`objective.name`=`score`。
  - 例如，检测`objective.name`的分数是否为`1`，为`/execute if score name objective matches 1`。

:::

## 使用方法

### 文件架构

我们必须介绍一下我们的函数包都由什么样的文件结构组成——这是至关重要的，您需要简单了解一下我们各个文件、文件夹都有什么用。

打开<FileType type="folder" name="BP/functions"/>，您可以看到 2 个文件夹<FileType type="folder" name="system"/>、<FileType type="folder" name="lib"/>和一个<FileType type="file" name="tick.json"/>。如果看到了您不熟悉的名词（例如时间线），可以在后文看到它们的原理和用法。

<treeview>

- <FileType type="folder" name="functions"/>：行为包根目录
  - <FileType type="folder" name="system"/>：**系统函数**，运行最底层的内容。
    - <FileType type="file" name="main.mcfunction"/>：**主函数**，通过`tick.json`循环执行的函数。
    - <FileType type="file" name="timer.mcfunction"/>：**计时器**，进行时间计时，每刻执行，包括常规计时器和时间线计时器。
    - <FileType type="folder" name="controller"/>：**控制器**，用于控制底层函数的执行，*在特定条件下*执行的系统级函数。
      - <FileType type="file" name="timeline.mcfunction"/>：**时间线控制器**，当时间线启用后执行的函数。
  - <FileType type="folder" name="lib"/>：**库函数**，被高频调用的函数。在编写函数的过程中，常常发现一些可能需要不断使用的重复的命令，这时就可以将它们打包为一个库函数。
    - <FileType type="folder" name="get_data"/>：**获取数据的函数**，通常进行一些对世界影响不大或者几乎认为无影响的操作，然后将获取到的数据输出到一个记分板变量或标签中。  
      虽然没有任何预设文件，但我们在[常用方法合集：获取数据](./useful_methods/get_data)中整合了一些可能有用的方法供你使用。您可以视需求选择性粘贴。
    - <FileType type="folder" name="modify_data"/>：**修改数据的函数**，通常进行一些对世界影响较大的操作，或者对玩家执行某些命令，或者强制地修改记分板或标签的值。
      - <FileType type="folder" name="init"/>：**初始化函数**，常在地图或模组初始化时执行，但何时执行由您自行指定。
        - <FileType type="file" name="data.mcfunction"/>：**数据初始化函数**，用于初始化全局（记分板、标签）变量。
        - <FileType type="file" name="gamerule.mcfunction"/>：**游戏规则初始化函数**，用于初始化游戏规则。
      - <FileType type="folder" name="states"/>：**修改状态**，用于修改时间线、或者可能涉及状态的内容。
        - <FileType type="folder" name="timeline"/>：**修改时间线状态**，例如启用或禁用时间线，启用或禁用时间流逝。
          - <FileType type="file" name="enable.mcfunction"/>：**启用时间线**。
          - <FileType type="file" name="disable.mcfunction"/>：**禁用时间线**。
          - <FileType type="file" name="enable_time_lapse.mcfunction"/>：**启用时间线的时间流逝**。
          - <FileType type="file" name="disable_time_lapse.mcfunction"/>：**禁用时间线的时间流逝**。
          - <FileType type="file" name="keep_value.mcfunction"/>：**保留时间值**。声明在调用*修改时间线状态*的库函数时，保留时间线的时间值。
          - <FileType type="file" name="disable_time_lapse.mcfunction"/>：**不保留时间值**。声明在调用*修改时间线状态*的库函数时，不保留时间线的时间值。

</treeview>

### 主函数

主函数为`system/main.mcfunction`。您可以在这里指定需要**全局强制循环执行**的功能。

<details>
<summary>实例：使用主函数提供全局饱和效果</summary>

高亮部分为新增内容。

```mcfunction title="system/main.mcfunction" showLineNumbers {9-10}
# ===== 主函数 =====

# --- 时间控制器 ---
function system/timer

# --- 时间线 ---
execute if score timeline active matches 1.. run function system/controller/timeline

# --- 提供饱和效果 ---
effect @a saturation 5 0 true
```

</details>

<details>
<summary>实例：使用主函数进行全局附魔效率 V 效果</summary>

高亮部分为新增内容。

```mcfunction title="system/main.mcfunction" showLineNumbers {9-10}
# ===== 主函数 =====

# --- 时间控制器 ---
function system/timer

# --- 时间线 ---
execute if score timeline active matches 1.. run function system/controller/timeline

# --- 提供效率 V ---
enchant @a efficiency 5
```

</details>

### 初始化

在使用下面的功能之前，请先使用下面的命令进行变量和游戏规则初始化。

```mcfunction showLineNumbers
/function lib/modify_data/init/data
/function lib/modify_data/init/gamerule
```

### 计时器

计时器也是本系统的核心函数之一。它可以进行计时。

在我们给出的预设中，它主要更改两个值：`time.tick`和`time.timeline`。

`time.tick`每游戏刻自加 1 分，并在达到 20 时复原到 0。因此，这个值将在 0\~19 之间循环，循环周期为 1 秒。您可以利用这个特性写一个每秒执行的函数。格式大体为：

```mcfunction title="每秒执行一次命令" showLineNumbers
execute if score tick time matches (0~19的任意整数) run (命令)
```

<details>
<summary>实例：使用主函数**每秒**提供全局饱和效果</summary>

高亮部分为新增内容。

```mcfunction title="system/main.mcfunction" showLineNumbers {9-10}
# ===== 主函数 =====

# --- 时间控制器 ---
function system/timer

# --- 时间线 ---
execute if score timeline active matches 1.. run function system/controller/timeline

# --- 提供饱和效果 ---
execute if score tick time matches 0 run effect @a saturation 5 0 true
```

</details>

如果有其他的计时项目，您也可以写在此文件中。

### 时间线：条件性循环执行命令

和主函数**全局的、强制的**循环执行不同，时间线是我们提供的用于**局部的、条件性的**循环执行工具，也是实际上更常用的循环执行工具。

通过时间线循环执行的命令，请写到时间线控制器（`system/controllers/timeline.mcfunction`）里面执行或间接执行。

时间线运行的原理是：

- 当时间线**启用**后，执行时间线控制器。
- 您可以控制时间线的**时间值**。
  - 但是，时间值在时间线启用状态下默认不会流逝。
  - 您可以调整时间线**流逝值**，控制每刻的时间值的增量。
  - 使用时间值，可以使命令在特定时刻下执行。
- 我们提供了许多的库函数，可以帮助您快速掌控这些变量。它们位于`lib/modify_data/states/timeline/...`。包括：
  - 快捷启用时间线的方法（`enable.mcfunction`）。
  - 快捷禁用时间线的方法（`disable.mcfunction`）。同时将流逝值改为 0。
  - 快捷启用时间线流逝的方法（`enable_time_lapse.mcfunction`）。同时如果未启用时间线时，启用时间线。
  - 快捷禁用时间线流逝的方法（`disable_time_lapse.mcfunction`）。
  - 调用上面的方法时，声明保留原有的时间值（`keep_value.mcfunction`）。应在调用上面的方法前使用。
  - 调用上面的方法时，声明不保留原有的时间值（`dont_keep_value.mcfunction`）。应在调用上面的方法前使用。

时间线的参数变量的具体含义如下：

| 变量 | 含义 | 对应值的意义 |
| --- | --- | --- |
| `active.timeline` | **时间线状态**，控制时间线是否启用，以及运行的状态 | - 当为 **`0`或更低**时，时间线处于**禁用**状态，时间线控制器不会运行<br/>- 当为 **`1`或更高**时，时间线处于**启用**状态，时间线控制器将会运行 |
| `time.timeline` | **时间线时间值**，规定时间线的时间值 | - 可以通过调整`data.timeLapse`来控制时间值的流逝 |
| `data.timeLapse` | **时间线流逝值**，规定时间线时间值的流逝值 | - 在时间线启用（`active.timeline`>=`1`）时，`time.timeline`将每刻自加`data.timeLapse`（由计时器定义）<br/>- 例如，当`data.timeLapse`=`2`时，`time.timeline`将每刻自加`2` |
| `data.keepValue` | **时间线时间值是否保留**，表示调用相关库函数时，是否保留原有的时间值 | - 若该值为`1`，则在调用库函数时，保留时间值<br/>- 其余情况，则在调用库函数时，抛弃时间值（设置`time.timeline`=`0`） |

<details>
<summary>实例：当时间线启用后，则循环设置为和平</summary>

首先更改时间线控制文件（高亮部分为更改或新增部分）：

```mcfunction title="system/controllers/timeline.mcfunction" showLineNumbers {5}
# ===== 时间线控制器 =====
# 该函数仅当时间线启用后执行

# --- 需要启用的时间线文件 ---
difficulty peaceful
```

然后，执行下面的命令以启用时间线：

```mcfunction showLineNumbers
/function lib/modify_data/states/timeline/enable
```

</details>

<details>
<summary>实例：当`data.level`=`5`时，执行函数并施加防火</summary>

首先更改时间线控制文件（高亮部分为更改或新增部分）：

```mcfunction title="system/controllers/timeline.mcfunction" showLineNumbers {5}
# ===== 时间线控制器 =====
# 该函数仅当时间线启用后执行

# --- 需要启用的时间线文件 ---
execute if score level data matches 5 run function levels/level_5/timeline
```

因为在这里，我们通过特定条件执行了一个“*子时间线*”，所以我们常常称这个过程为**注册时间线文件**。

然后，我们需要在这个子时间线中，定义防火药效。

```mcfunction title="levels/level_5/timeline.mcfunction" showLineNumbers
# ===== 时间线 =====

# --- 施加防火 ---
execute if score tick time matches 2 run effect @a fire_resistance 30 0 true

```

然后，执行下面的命令以启用时间线并执行规定函数：

```mcfunction showLineNumbers
/function lib/modify_data/states/timeline/enable
/scoreboard players set level data 5
```

</details>

<details>
<summary>实例：按照特定时间顺序执行命令</summary>

*以下内容改编自《冒险小世界：剑之试炼》*。要求是，当`data.level`=`301`时，对玩家播放特定剧情。这个需求，是需要时间来延时执行的，所以不仅需要时间线，还需要启用时间线流逝。

首先注册时间线文件：

```mcfunction title="system/controllers/timeline.mcfunction" showLineNumbers {5}
# ===== 时间线控制器 =====
# 该函数仅当时间线启用后执行

# --- 需要启用的时间线文件 ---
execute if score level data matches 301 run function levels/chapter3/3_0/timeline
```

然后，我们需要在这个子时间线中，定义剧情内容，并在剧情播放完毕之后关闭时间线。

```mcfunction title="levels/chapter3/3_0/timeline.mcfunction" showLineNumbers
# ===== 时间线 =====

# --- 倒计时剧情 ---
execute if score timeline time matches 20 run say 5
execute if score timeline time matches 40 run say 4
execute if score timeline time matches 60 run say 3
execute if score timeline time matches 80 run say 2
execute if score timeline time matches 100 run say 1

# --- 剧情结束后，关闭时间线 ---
# 此处不需要保留时间值
execute if score timeline time matches 101 run function lib/modify_data/states/timeline/dont_keep_value
execute if score timeline time matches 101 run function lib/modify_data/states/timeline/disable

```

然后，执行下面的命令以初始化时间值`time.timeline`=`0`，启用时间线和时间流逝并执行规定函数：

```mcfunction showLineNumbers
/function lib/modify_data/states/timeline/dont_keep_value
/function lib/modify_data/states/timeline/enable_time_lapse
/scoreboard players set level data 301
```

</details>

## 可用函数

您可以对本包中的下面的函数进行修改、调用。

| 文件名（`.mcfunction`） | 用途 | 输出数据（变量、标签） |
| --- | --- | --- |
| `system/main` | 主文件，保持循环执行 | —— |
| `system/timer` | 计时器 | - `time.tick`<br/>- `time.timeline`+=`data.timeLapse` |
| `system/controller/timeline` | 时间线控制器，注册文件，用于控制执行的时间线 | —— |
| `lib/modify_data/init/data` | 重置或注册全局变量 | —— |
| `lib/modify_data/init/gamerule` | 重置默认的游戏规则 | —— |
| `lib/modify_data/states/timeline/enable` | 启用时间线 | - `active.timeline`=`1`<br/>- `time.timeline`=`0`（当`data.keepValue`!=`1`时） |
| `lib/modify_data/states/timeline/disable` | 禁用时间线 | - `active.timeline`=`0`<br/>- `data.timeLapse`=`0`<br/>- `time.timeline`=`0`（当`data.keepValue`!=`1`时） |
| `lib/modify_data/states/timeline/enable_time_lapse` | 启用时间线的时间流逝 | - `active.timeline`=`1`（当`active.timeline`\<=`0`时）<br/>- `data.timeLapse`=`1`<br/>- `time.timeline`=`0`（当`data.keepValue`!=`1`时） |
| `lib/modify_data/states/timeline/disable_time_lapse` | 禁用时间线的时间流逝 | - `data.timeLapse`=`0`<br/>- `time.timeline`=`0`（当`data.keepValue`!=`1`时） |

## 更新日志

### v3 版本

相比于 v2 版本，v3 版本主要进行了如下更改：

- 提升最低版本需求为 1.20.50。
- 移除和拆分了其中的绝大多数内容，仅保留时间线。
  - 但是，被移除的内容存储在[常用方法合集](./useful_methods)中，可供开发者需要时再取用。
- 移除了时间线的`_keep`类函数，使用`data.keepValue`代替。
- 将`lib/modify_states/`移动到了`lib/modify_data/states/`。
- 随着`/camera`的更新，锁定视角已不再需要，因此移除了`data.lockCamera`变量。
  - 因此，本包也不再依赖标记实体。

### v2 版本

相比于 v1 版本，v2 版本主要进行了如下更改：

- 合并了剧情线和时间线，进行了一些更改。
  - 使用`data.lockCamera`变量决定是否锁定视角。
  - 使用`data.timeLapse`变量决定是否时间流逝，而不是时间线的状态值`active.timeline`。

## 过往版本下载

<Download text="下载 v2 版本" url="https://app.nekodrive.net/s/77Yf5" isInline/> <Download text="下载 v1 版本" url="https://app.nekodrive.net/s/D5Jcm" isInline/>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
