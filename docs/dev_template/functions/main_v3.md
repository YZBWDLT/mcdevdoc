---
sidebar_position: 1
---

# 主包 v3

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);

## [<Highlight color="#25c2a0">下载</Highlight>](https://app.nekodrive.net/s/mZpF1)

本包已经搭建了一套**较为完善的计时函数命令系统**，以便您基于此底层系统编写命令。

目前为止，基岩版的函数系统相比于命令方块系统仍旧有两大硬伤。第一是条件性命令，这个缺陷随着`/execute`的更新已经缓解许多。**而计时问题，则是函数系统的第二大硬伤**。为了解决这个问题，我们专门基于记分板搭建了一个自带计时功能的命令系统。

本包为**行为包**。本包是其他众多函数系统包的基础包。

:::note[注意：本文的通用语言]

在下文，我们把 a 记分板上名为 b 的追踪目标记为`a.b`。例如，检测`a.b`的分数是否为1，为`/execute if score b a matches 1`。

:::

## 使用方法

### 文件架构

我们必须介绍一下我们的函数包都由什么样的文件结构组成——这是至关重要的，您需要简单了解一下我们各个文件、文件夹都有什么用。

打开`BP/functions/`文件夹，您可以看到 2 个文件夹`system/`、`lib/`和一个`tick.json`。

### 计时器

### 利用时间线条件性循环执行命令

### 启用时间线的时间流逝功能

## 可用函数

您可以对本包中的下面的函数进行修改、调用。

| 文件名（`.mcfunction`） | 用途 | 输出数据（变量、标签） |
| --- | --- | --- |
| `system/main` | 主文件，保持循环执行 | —— |
| `system/timer` | 计时器 | `time.tick` |
| `system/controller/timeline` | 时间线注册文件，用于控制执行的时间线 | —— |
| `lib/modify_data/init/data` | 重置或注册变量 | —— |
| `lib/modify_data/init/gamerule` | 重置默认的游戏规则 | —— |
| `lib/modify_states/timeline/disable` | 禁用时间线 | `active.timeline`=`0`，`time.timeline`=`0`, `data.timeLapse`=`0` |
| `lib/modify_states/timeline/disable_keep` | 禁用时间线，但是保留时间值`time.timeline` | `active.timeline`=`0`, `data.timeLapse`=`0` |
| `lib/modify_states/timeline/disable_time_lapse` | 禁用时间线的时间流逝 | `time.timeline`=`0`, `data.timeLapse`=`0` |
| `lib/modify_states/timeline/disable_time_lapse_keep` | 禁用时间线的时间流逝，但是保留时间值`time.timeline` | `data.timeLapse`=`0` |
| `lib/modify_states/timeline/enable` | 启用时间线 | `active.timeline`=`1`，`time.timeline`=`0` |
| `lib/modify_states/timeline/enable_keep` | 启用时间线，但是保留时间值`time.timeline` | `active.timeline`=`1` |
| `lib/modify_states/timeline/enable_time_lapse` | 启用时间线的时间流逝 | `time.timeline`=`0`, `data.timeLapse`=`1` |
| `lib/modify_states/timeline/enable_time_lapse_keep` | 启用时间线的时间流逝，但是保留时间值`time.timeline` | `data.timeLapse`=`1` |

## 实例

## 更新日志

### v3 版本

相比于 v2 版本，v3 版本主要进行了如下更改：

- 提升最低版本需求为 1.20.50
- 移除和拆分了其中的绝大多数内容，仅保留时间线
  - 但是，被移除的内容存储在[常用方法合集](./useful_methods)中，可供开发者需要时再取用
- 随着`/camera`的更新，锁定视角已不再需要，因此移除了`data.lockCamera`变量
  - 因此，本包也不再依赖标记实体

### v2 版本

相比于 v1 版本，v2 版本主要进行了如下更改：

- 合并了剧情线和时间线，进行了一些更改
  - 使用`data.lockCamera`变量决定是否锁定视角
  - 使用`data.timeLapse`变量决定是否时间流逝，而不是时间线的状态值`active.timeline`

## 过往版本下载

[<Highlight color="#25c2a0">下载 v2 版本</Highlight>](https://app.nekodrive.net/s/77Yf5) [<Highlight color="#25c2a0">下载 v1 版本</Highlight>](https://app.nekodrive.net/s/D5Jcm)
