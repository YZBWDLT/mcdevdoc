---
sidebar_position: 1
---

# 获取数据

本文提供一些用于**便捷获取数据的方法**，以供您选择性地安装到您的包体中，不必再安装一些毫无必要的方法到地图中。

本文的内容基于「[主包 v3](../main_v3)」的架构。

:::note[注意：本文的通用语言]

- **路径表示**：如无特殊说明，本文的路径`./`均指代`BP/functions/lib/get_data/`。
  - 例如，`./entity_amount.mcfunction`指代`BP/functions/lib/get_data/entity_amount.mcfunction`。
- **变量表示**：本文，我们把`objective`记分板上名为`name`的追踪目标的分数`score`记为`objective.name`=`score`。
  - 例如，检测`objective.name`的分数是否为`1`，为`/execute if score name objective matches 1`。

:::

---

## 检测实体数量

### 原理

我们需要设置一个记分板变量`data.entityAmount`来表示实体数目。先初始化该值，然后用`/execute`命令使每个实体都使该变量加 1 分，即可将实体数目输出为该变量。

### 代码实现

首先我们需要初始化变量。打开文件`BP/functions/lib/modify_data/init/data.mcfunction`，您可在高亮处新增高亮的内容。

```mcfunction title='BP/functions/lib/modify_data/init/data.mcfunction' showLineNumbers {8-9}
...

## 时间线
scoreboard players set timeline active 0
scoreboard players set timeline time 0
scoreboard players set timeLapse data 0

## 实体数目
scoreboard players set entityAmount data 1

```

然后，在您的包中新增一个文件，位于`./entity_amount.mcfunction`，内容如下：

```mcfunction title='./entity_amount.mcfunction' showLineNumbers {15}
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

您可以更改第 15 行的目标选择器`@e`为您需要筛选的实体，把`entityAmount`改为合适的名字，这样该变量就输出为您需要筛选的实体的数量。

之后，您便可以使用下面的命令获取实体数目（`data.entityAmount`）。

```mcfunction showLineNumbers
/function lib/get_data/entity_amount
```

## 检测中国版和国际版

### 原理

**利用中国版的屏蔽词会屏蔽整条命令的特性**，特意加一个中国版会屏蔽但国际版不会屏蔽的标签，判断该命令是否成功执行。

我们需要设置一个记分板变量`data.client`来表示玩家使用的客户端。记`0`=国际版，`1`=中国版。

### 代码实现

首先我们需要初始化变量。打开文件`BP/functions/lib/modify_data/init/data.mcfunction`，您可在高亮处新增高亮的内容。

```mcfunction title='BP/functions/lib/modify_data/init/data.mcfunction' showLineNumbers {8-9}
...

## 时间线
scoreboard players set timeline active 0
scoreboard players set timeline time 0
scoreboard players set timeLapse data 0

## 玩家使用的客户端，0=国际版，1=中国版
scoreboard players set client data 0

```

然后，在您的包中新增一个文件，位于`./client.mcfunction`，内容如下：

```mcfunction title='./client.mcfunction' showLineNumbers
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
execute if score sb matches 0 run scoreboard players set client data 0
## 移除data.sb
scoreboard players reset sb data
```

之后，您便可以使用下面的命令获取玩家使用的客户端版本（`data.client`，`0`=国际版，`1`=中国版）。

```mcfunction showLineNumbers
/function lib/get_data/client
```

## 检测玩家为存活或死亡状态

### 原理

利用`@a`会选中死亡玩家，而`@e[type=player]`不会选中死亡玩家的性质检测。该方法**常用于检测卡在聊天栏、暂停菜单等其他界面的死亡玩家**。

### 代码实现

在您的包中新增一个文件，位于`./player_is_alive.mcfunction`，内容如下：

```mcfunction title='./player_is_alive.mcfunction' showLineNumbers
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

之后，您便可以使用下面的命令获取玩家是否存活（有`isAlive`标签的玩家即为存活玩家）。

```mcfunction showLineNumbers
/function lib/get_data/player_is_alive
```

## 检测玩家状态（站立潜行爬行睡觉检测）

### 原理

利用玩家下蹲、爬行、睡觉时的高度不同的特性，以及目标选择器参数`x,y,z,dx,dy,dz`检测实体碰撞箱是否与检测区域有交集，可以做出这样的检测。

我们需要设置一个记分板变量`state.@s`来表示玩家的状态。记`0`=站立、`1`=潜行、`2`=爬行、`3`=睡觉。

### 代码实现

首先我们需要初始化变量。打开文件`BP/functions/lib/modify_data/init/data.mcfunction`，您可在高亮处新增高亮的内容。

```mcfunction title='BP/functions/lib/modify_data/init/data.mcfunction' showLineNumbers {18,30-31}
# ===== 数据重置 =====
# 用于重置游戏数据

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 重置记分板、变量和标记实体到默认值下

# --- 常加载区域重置 ---
tickingarea add 0 0 0 15 0 15 "originArea"

# --- 记分板重置 ---
scoreboard objectives add active dummy "激活状态"
scoreboard objectives add data dummy "数据"
scoreboard objectives add settings dummy "设置"
scoreboard objectives add time dummy "时间"
scoreboard objectives add state dummy "玩家状态"

# --- 数据变量重置 ---

## 基础时间数据
scoreboard players set tick time 0

## 时间线
scoreboard players set timeline active 0
scoreboard players set timeline time 0
scoreboard players set timeLapse data 0

## 玩家状态
scoreboard players set @a state 0

```

然后，在您的包中新增一个文件，位于`./player_state.mcfunction`，内容如下：

```mcfunction title='./player_state.mcfunction' showLineNumbers
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

之后，您便可以使用下面的命令获取玩家目前的状态（`state.@s`，`0`=站立、`1`=潜行、`2`=爬行、`3`=睡觉）。

```mcfunction showLineNumbers
/function lib/get_data/player_state
```

## 检测玩家所处维度

### 原理

利用`/execute in`的特性，结合`rm`，可以做出这样的检测。

我们需要设置一个记分板变量`dimension.@s`来表示玩家的维度。记`0`=主世界、`1`=下界、`2`=末地。

### 代码实现

首先我们需要初始化变量。打开文件`BP/functions/lib/modify_data/init/data.mcfunction`，您可在高亮处新增高亮的内容。

```mcfunction title='BP/functions/lib/modify_data/init/data.mcfunction' showLineNumbers {18,30-31}
# ===== 数据重置 =====
# 用于重置游戏数据

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 重置记分板、变量和标记实体到默认值下

# --- 常加载区域重置 ---
tickingarea add 0 0 0 15 0 15 "originArea"

# --- 记分板重置 ---
scoreboard objectives add active dummy "激活状态"
scoreboard objectives add data dummy "数据"
scoreboard objectives add settings dummy "设置"
scoreboard objectives add time dummy "时间"
scoreboard objectives add dimension dummy "玩家维度"

# --- 数据变量重置 ---

## 基础时间数据
scoreboard players set tick time 0

## 时间线
scoreboard players set timeline active 0
scoreboard players set timeline time 0
scoreboard players set timeLapse data 0

## 玩家状态
scoreboard players set @a dimension 0

```

然后，在您的包中新增一个文件，位于`./player_dimension.mcfunction`，内容如下：

```mcfunction title='./player_dimension.mcfunction' showLineNumbers
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

之后，您便可以使用下面的命令获取玩家目前的状态（`dimension.@s`，`0`=主世界、`1`=下界、`2`=末地）。

```mcfunction showLineNumbers
/function lib/get_data/player_dimension
```

如果您有检测其他实体的需求，该方法一样可行，稍加改造即可做到。
