---
sidebar_position: 2
---

# 修改数据

本文提供一些用于**便捷修改数据的方法**，以供您选择性地安装到您的包体中，不必再安装一些毫无必要的方法到地图中。

本文的内容基于「[主包 v3](../main_v3)」的架构。

:::note[注意：本文的通用语言]

- **路径表示**：如无特殊说明，本文的路径`./`均指代`BP/functions/lib/modify_data/`。
  - 例如，`./title.mcfunction`指代`BP/functions/lib/modify_data/title.mcfunction`。
- **变量表示**：本文，我们把`objective`记分板上名为`name`的追踪目标的分数`score`记为`objective.name`=`score`。
  - 例如，检测`objective.name`的分数是否为`1`，为`/execute if score name objective matches 1`。

:::

---

## 播放一个空标题

### 原理

为播放副标题，必须额外播放一个非空的主标题。本方法用于播放一个看似为空标题的主标题，并设置标题时间。

### 代码实现

在您的包中新增一个文件，位于`./title.mcfunction`，内容如下：

```mcfunction title='./title.mcfunction' showLineNumbers
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

之后，您便可以使用下面的命令播放一个空标题，用于仅播放副标题。

```mcfunction showLineNumbers
/function lib/modify_data/title
```
