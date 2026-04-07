# 常用功能与算法

import Highlight from '/src/components/highlight/standard';
import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

本文档收录命令领域常用的部分算法。如果你有更好的建议，欢迎在评论区进行补充。

:::info[本文更新时间]

本文于 2026 年 3 月 13 日更新，中国版最新版本为 1.21.50，国际版最新版本为 26.0。

:::

:::info[注意]

在下文中，以函数系统为基础。我们建议读者学习[函数系统](/docs/tutorials/a2_addons/b2_functions_and_structures/c1_function)，但不学习函数系统依然可以阅读本文。

- **`system/main`函数为始终执行的函数**。对于未学习过函数的读者而言，可以将这里的命令认定为循环命令方块链。
- 其他函数为普通函数。对于未学习过函数的读者而言，可以将这里的命令认定为脉冲命令方块链。
- 若读者需要采用命令方块构建命令系统，可以自行优化算法，恕本文不提供具体解决思路。

各功能或算法下，<Highlight text="教程"/>是可点击的，点击该按钮将链接到本网站的教程。

:::

## 事件

当世界发生了某件事件之后，触发函数。

### 玩家进入时

<Highlight text="教程" url="/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d5_applications#处理多人游戏下退出重进的玩家的问题" />

当玩家进入时，执行`events/player_join`函数。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="events"/>
    - <FileType type="file" name="player_join.mcfunction"/>：事件函数：玩家进入游戏
  - <FileType type="folder" name="system"/>
    - <FileType type="file" name="main.mcfunction"/>：主函数，每刻循环执行
  - <FileType type="file" name="tick.json"/>
</treeview>

```mcfunction showLineNumbers title="主函数 system/main"
# --- 反退出重进 ---
## 获取退出重进的玩家
scoreboard players add @a isOnline 0
## 令退出重进玩家执行的命令
execute as @a[scores={isOnline=0}] at @s run function events/player_join
## 将所有玩家设置为在线模式
scoreboard objectives remove isOnline
scoreboard objectives add isOnline dummy "玩家在线"
scoreboard players set @a isOnline 1
```

```mcfunction showLineNumbers title="事件函数 events/player_join"
# ===== 事件：玩家进入游戏 =====
# 用于规定玩家进入游戏时执行的命令。
# 调用此方法时：需修饰执行者为进入的玩家，执行位置为该玩家的位置（execute as @a[scores={isOnline=0}] at @s）。

# (要执行的命令，如要指定退出重进的玩家请设为 @s)
# (例如，give @s apple 将给予进入游戏的玩家一个苹果)
```

### 玩家离开时

当玩家死亡时，执行`events/player_leave`函数。这需要你事先实现[获取数据：获取玩家数量](#获取实体数量)，将玩家数定义到`data.playerAmount`上。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="events"/>
    - <FileType type="file" name="player_leave.mcfunction"/>：事件函数：玩家离开
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="get_data"/>
      - <FileType type="file" name="player_amount.mcfunction"/>：获取玩家数量
  - <FileType type="folder" name="system"/>
    - <FileType type="file" name="main.mcfunction"/>：主函数，每刻循环执行
  - <FileType type="file" name="tick.json"/>
</treeview>

:::warning[温馨提示]

下文主函数的命令请放到文件开头，防止其他命令先行调用`lib/get_data/player_amount`导致此功能失效。需注意命令方块系统可能会因为时序问题而出现运行问题。

:::

```mcfunction showLineNumbers title="主函数 system/main"
# --- 玩家离开检测 ---
scoreboard players set currentPlayerAmount data 0
execute as @a run scoreboard players add currentPlayerAmount data 1
execute if score currentPlayerAmount data < playerAmount data run function events/player_leave
function lib/get_data/player_amount
```

```mcfunction showLineNumbers title="事件函数 events/player_leave"
# ===== 事件：玩家离开 =====
# 用于规定玩家进入主世界时执行的命令。
# 调用此方法时：无需修饰。

# (要执行的命令)
# (例如，give @a apple 将在有玩家退出时给予其他玩家一个苹果)
```

### 玩家死亡时

<Highlight text="教程" url="/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d5_applications#补偿准则缺憾的实例死亡榜的实现" />

当玩家死亡时，执行`events/player_die`函数。这需要你事先创建`deathState`记分项。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="events"/>
    - <FileType type="file" name="player_die.mcfunction"/>：事件函数：玩家死亡
  - <FileType type="folder" name="system"/>
    - <FileType type="file" name="main.mcfunction"/>：主函数，每刻循环执行
  - <FileType type="file" name="tick.json"/>
</treeview>

```mcfunction showLineNumbers title="主函数 system/main"
# --- 玩家死亡检测 ---
## 玩家死亡检测
scoreboard players set @a[scores={deathState=!2}] deathState 1
scoreboard players set @e[type=player] deathState 0
execute as @a[scores={deathState=1}] at @s run function events/player_die
scoreboard players set @a[scores={deathState=1}] deathState 2
## 死亡玩家执行命令
# execute as @a[scores={deathState=2}] run (死亡的玩家执行的命令)
```

```mcfunction showLineNumbers title="事件函数 events/player_die"
# ===== 事件：玩家死亡 =====
# 用于规定玩家死亡时执行的命令。
# 调用此方法时：需修饰执行者为死亡的玩家，执行位置为该玩家的位置（execute as @a[scores={deathState=1}] at @s）。

# (要执行的命令，如要指定死亡的玩家请设为 @s)
# (例如，scoreboard players add @s deathCount 1 将为刚死亡的玩家添加 1 分)
```

### 玩家复活时

当玩家复活时，执行`events/player_respawn`函数。这需要你事先实现[事件：玩家死亡时](#玩家死亡时)和[数据获取：获取玩家存活状态]。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="events"/>
    - <FileType type="file" name="player_respawn.mcfunction"/>：事件函数：玩家复活
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="get_data"/>
      - <FileType type="file" name="player_is_alive.mcfunction"/>：获取玩家存活状态
  - <FileType type="folder" name="system"/>
    - <FileType type="file" name="main.mcfunction"/>：主函数，每刻循环执行
  - <FileType type="file" name="tick.json"/>
</treeview>

:::warning[温馨提示]

下文主函数高亮的命令请放到玩家死亡检测开头，防止其他命令先行检测玩家死亡状态导致此功能失效。需注意命令方块系统可能会因为时序问题而出现运行问题。

:::

```mcfunction showLineNumbers title="主函数 system/main"
# --- 玩家死亡检测 ---
## 玩家复活检测
function lib/get_data/player_is_alive
execute as @a[tag=isAlive,scores={deathState=2}] run function events/player_respawn
## 玩家死亡检测
scoreboard players set @a[scores={deathState=!2}] deathState 1
scoreboard players set @e[type=player] deathState 0
execute as @a[scores={deathState=1}] at @s run function events/player_die
scoreboard players set @a[scores={deathState=1}] deathState 2
## 死亡玩家执行命令
# execute as @a[scores={deathState=2}] run (死亡的玩家执行的命令)
```

```mcfunction showLineNumbers title="事件函数 events/player_respawn"
# ===== 事件：玩家重生 =====
# 用于规定玩家重生时执行的命令。
# 调用此方法时：需修饰执行者为重生的玩家，执行位置为该玩家的位置（execute as @a[tag=isAlive,scores={deathState=1..2}] run）。

# (要执行的命令，如要指定重生的玩家请设为 @s)
# (例如，scoreboard players add @s respawnCount 1 将为刚重生的玩家添加 1 分)
```

### 玩家切换维度时

当玩家死亡时，执行`events/player_changed_dimension/...`函数。这需要你事先实现[获取数据：获取玩家所处维度](#获取玩家所处维度)。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="events"/>
    - <FileType type="folder" name="player_changed_dimension"/>
      - <FileType type="file" name="overworld.mcfunction"/>：事件函数：玩家切换到主世界
      - <FileType type="file" name="nether.mcfunction"/>：事件函数：玩家切换到下界
      - <FileType type="file" name="the_end.mcfunction"/>：事件函数：玩家切换到末地
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="get_data"/>
      - <FileType type="file" name="player_dimension.mcfunction"/>：获取玩家所处维度
  - <FileType type="folder" name="system"/>
    - <FileType type="file" name="main.mcfunction"/>：主函数，每刻循环执行
  - <FileType type="file" name="tick.json"/>
</treeview>

:::warning[温馨提示]

下文主函数的命令请放到文件开头，防止其他命令先行调用`lib/get_data/player_dimension`导致此功能失效。需注意命令方块系统可能会因为时序问题而出现运行问题。

:::

```mcfunction showLineNumbers title="主函数 system/main"
# --- 玩家切换维度检测 ---
## 玩家切换维度检测
execute in overworld as @a[rm=0] at @s if entity @s[scores={dimension=!0}] run function events/player_changed_dimension/overworld
execute in nether as @a[rm=0] at @s if entity @s[scores={dimension=!1}] run function events/player_changed_dimension/nether
execute in the_end as @a[rm=0] at @s if entity @s[scores={dimension=!2}] run function events/player_changed_dimension/the_end
## 重新检测
function lib/get_data/player_dimension

```

```mcfunction showLineNumbers title="事件函数 events/player_changed_dimension/overworld"
# ===== 事件：玩家切换维度到主世界 =====
# 用于规定玩家进入主世界时执行的命令。
# 调用此方法时：需修饰执行者为切换维度的玩家，执行位置为该玩家的位置（execute in overworld as @a[rm=0] at @s if entity @s[scores={dimension=!0}]）。

# (要执行的命令，如要指定切换维度的玩家请设为 @s)
# (例如，give @s apple 将为刚进入主世界的玩家给予一个苹果)
```

```mcfunction showLineNumbers title="事件函数 events/player_changed_dimension/nether"
# ===== 事件：玩家切换维度到下界 =====
# 用于规定玩家进入下界时执行的命令。
# 调用此方法时：需修饰执行者为切换维度的玩家，执行位置为该玩家的位置（execute in nether as @a[rm=0] at @s if entity @s[scores={dimension=!1}]）。

# (要执行的命令，如要指定切换维度的玩家请设为 @s)
# (例如，give @s apple 将为刚进入下界的玩家给予一个苹果)
```

```mcfunction showLineNumbers title="事件函数 events/player_changed_dimension/the_end"
# ===== 事件：玩家切换维度到末地 =====
# 用于规定玩家进入末地时执行的命令。
# 调用此方法时：需修饰执行者为切换维度的玩家，执行位置为该玩家的位置（execute in the_end as @a[rm=0] at @s if entity @s[scores={dimension=!2}]）。

# (要执行的命令，如要指定切换维度的玩家请设为 @s)
# (例如，give @s apple 将为刚进入末地的玩家给予一个苹果)
```

## 系统

### 反作弊

进行一些常见而简单的反作弊措施。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="system"/>
    - <FileType type="file" name="main.mcfunction"/>：主函数，每刻循环执行
  - <FileType type="file" name="tick.json"/>
</treeview>

```mcfunction showLineNumbers title="主函数 system/main"
# --- 反作弊 ---
## 游戏模式限制
# gamemode adventure @a[m=!adventure]
## 禁止玩家放船
# kill @e[family=boat]
## 禁止玩家投掷末影珍珠
# kill @e[family=ender_pearl]
## 禁止玩家搭建传送门
# execute as @a at @s run fill -5 -5 -5 5 5 5 air replace portal
# execute as @a at @s run fill -5 -5 -5 5 5 5 air replace end_portal
```

### 计时器

<Highlight text="教程" url="/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d5_applications#计时器" />

实现全局的计时器。这需要你事先声明`time`记分项。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="system"/>
    - <FileType type="file" name="main.mcfunction"/>：主函数，每刻循环执行
  - <FileType type="file" name="tick.json"/>
</treeview>

```mcfunction showLineNumbers title="主函数 system/main"
# --- 计时器 ---
## time.tick
scoreboard players add tick time 1
execute unless score tick time matches 0..19 run scoreboard players set tick time 0
## time.playedSecond & time.playedMinute
execute if score tick time matches 19 run scoreboard players add playedSecond time 1
execute if score playedSecond time matches 60.. run scoreboard players add playedMinute time 1
execute if score playedSecond time matches 60.. run scoreboard players remove playedSecond time 60
```

其中，`time.tick`是很有用的，你可以用它轻易地实现每秒执行 1 次命令，以降低多数命令的执行频率。

## 数据获取

数据获取函数用于从世界中获取一些数据并保存到特定的记分板中。放置于`lib/get_data/`中。

### 获取实体数量

<Highlight text="教程" url="/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d5_applications#获取实体数目" />

调用`lib/get_data/entity_amount`以获取实体数量，结果保存在`data.entityAmount`。这需要你事先声明`data`记分项。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="get_data"/>
      - <FileType type="file" name="entity_amount.mcfunction"/>：获取实体数量
</treeview>

```mcfunction showLineNumbers title="lib/get_data/entity_amount" {6}
# ===== 获取实体数量 =====
# 用于检测当前情况下的实体数量并输出到data.entityAmount下。
# 调用此方法时：无需修饰

scoreboard players set entityAmount data 0
execute as @e run scoreboard players add entityAmount data 1
```

更改第 6 行的目标选择器`@e`可用于检查特定实体的数量。请新建一个新的变量以保存数据，不要混用同一个变量。

### 获取客户端（检查国际版和中国版）

调用`lib/get_data/client`以获取玩家使用的客户端信息，结果保存在`data.client`里，`0`为国际版，`1`为中国版。这需要你事先声明`data`记分项。

:::warning[温馨提示]

本段代码因实际需求，被迫采用不雅用语，请理性看待，日常生活请文明发言。

:::

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="get_data"/>
      - <FileType type="file" name="client.mcfunction"/>：获取客户端
</treeview>

```mcfunction showLineNumbers title="lib/get_data/client"
# ===== 获取客户端 =====
# 用于检测玩家使用的版本为国际版/网易版。若为国际版，输出data.client=0；若为网易版，输出data.client=1。
# 调用此方法时：无需修饰。

# 假定当前正在使用网易版
scoreboard players set client data 1
# 试图在记分板添加data.肏（这是屏蔽词，如果为网易版，该命令无法执行）
scoreboard players set 肏 data 0
# 若检测到data.肏的分数，即上一条命令未被屏蔽，证明是国际版，更改data.client
execute if score 肏 data matches 0 run scoreboard players set client data 0
# 移除data.肏
scoreboard players reset 肏 data
```

### 获取玩家存活状态

<Highlight text="教程" url="/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d1_tag#运用标签的实例" />

调用`lib/get_data/player_is_alive`以获取玩家使用的客户端信息，结果保存在标签`isAlive`里，有标签为存活，无标签为死亡。

:::tip[温馨提示]

如果你已使用了 **[事件：玩家死亡时](#玩家死亡时)**，则无需使用本方法获取玩家死亡状态。该事件将实时返回`deathState.@s`，为`0`时为未死亡，为`1`时为刚刚死亡，为`2`时为长期死亡。

:::

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="get_data"/>
      - <FileType type="file" name="player_is_alive.mcfunction"/>：获取玩家存活状态
</treeview>

```mcfunction showLineNumbers title="lib/get_data/player_is_alive"
# ===== 玩家存活检测 =====
# 用于检测玩家是否处于存活状态。存活玩家将获得isAlive标签。
# 调用此方法时：无需修饰。

tag @a remove isAlive
tag @e[type=player] add isAlive
```

### 获取玩家站立状态

<Highlight text="教程" url="/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d5_applications#检测站立潜行爬行和睡觉的玩家" />

调用`lib/get_data/player_state`以获取玩家状态，结果保存在标签`state.@s`里，`0`为站立，`1`为潜行，`2`为爬行，`3`为睡觉。这需要你事先声明`state`记分项。调用此方法时，需修饰执行者为玩家，执行位置为玩家位置（`execute as @a[...] at @s`）。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="get_data"/>
      - <FileType type="file" name="player_state.mcfunction"/>：获取玩家状态
</treeview>

```mcfunction showLineNumbers title="lib/get_data/player_state"
# ===== 获取玩家状态 =====
# 用于检测玩家处于站立、潜行、爬行或睡觉状态，分别输出state.@s为0,1,2,3
# 调用此方法时：需修饰执行者为玩家，执行位置为玩家位置（execute as @a[...] at @s）。

# 当在玩家脚开始往上1.7格仍能检测到玩家，则玩家站立（玩家站立为1.8格）
execute if entity @s[x=~,y=~1.7,z=~,dx=0,dy=0,dz=0] run scoreboard players set @s state 0
# 当在玩家脚开始往上1.4~1.7格仍能检测到玩家，则玩家潜行（玩家潜行为1.5格）
execute if entity @s[x=~,y=~1.4,z=~,dx=0,dy=0,dz=0] unless entity @s[x=~,y=~1.7,z=~,dx=0,dy=0,dz=0] run scoreboard players set @s state 1
# 当在玩家脚开始往上0.5~1.4格仍能检测到玩家，则玩家爬行（玩家爬行为0.6格）
execute if entity @s[x=~,y=~0.5,z=~,dx=0,dy=0,dz=0] unless entity @s[x=~,y=~1.4,z=~,dx=0,dy=0,dz=0] run scoreboard players set @s state 2
# 当在玩家脚开始往上0.5格以内仍能检测到玩家（或0.5格以上检测不到玩家），则玩家睡觉（玩家睡觉为0.2格）
execute unless entity @s[x=~,y=~0.5,z=~,dx=0,dy=0,dz=0] run scoreboard players set @s state 3
```

### 获取玩家所处维度

调用`lib/get_data/player_dimension`以获取玩家所处维度，结果保存在标签`dimension.@s`里，`0`为主世界，`1`为下界，`2`为末地。这需要你事先声明`dimension`记分项。调用此方法时，需修饰执行者为玩家，执行位置为玩家位置（`execute as @a[...] at @s`）。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="get_data"/>
      - <FileType type="file" name="player_dimension.mcfunction"/>：获取玩家所处维度
</treeview>

```mcfunction showLineNumbers title="lib/get_data/player_dimension"
# ===== 获取玩家所处维度 =====
# 用于检测玩家的维度，当玩家处于主世界、下界、末地时，分别输出dimension.@s为0,1,2。
# 调用此方法时：需修饰执行者为玩家，执行位置为玩家位置（execute as @a[...] at @s）。

# 检测玩家处于主世界
execute in overworld as @a[rm=0] run scoreboard players set @s dimension 0
# 检测玩家处于下界
execute in nether as @a[rm=0] run scoreboard players set @s dimension 1
# 检测玩家处于主世界
execute in the_end as @a[rm=0] run scoreboard players set @s dimension 2
```

### 获取玩家是否空手

调用`lib/get_data/player_is_empty_hand`以获取玩家使用的客户端信息，结果保存在标签`emptyHand`里，有标签为空手，无标签为未空手。

:::warning[温馨提示]

此方法不宜高频执行，因`replaceitem`命令高频执行会阻碍物品栏切换。此方法适宜在需要的某个时刻执行，或低频执行。

:::

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="get_data"/>
      - <FileType type="file" name="player_is_empty_hand.mcfunction"/>：获取玩家存活状态
</treeview>

```mcfunction showLineNumbers title="lib/get_data/player_is_empty_hand"
# ===== 获取玩家是否为空手 =====
# 用于检测玩家是否为空手。空手玩家将获得emptyHand标签。
# 调用此方法时：无需修饰。

tag @a remove emptyHand
replaceitem entity @a slot.weapon.mainhand 0 keep bedrock
tag @a[hasitem={item=bedrock,location=slot.weapon.mainhand}] add emptyHand
replaceitem entity @a[hasitem={item=bedrock,location=slot.weapon.mainhand}] slot.weapon.mainhand 0 air
```

## 工具

工具函数用于执行某些特定功能。放置于`lib/utils/`中。

### 显示空标题

调用`lib/utils/show_empty_title`以显示一个空标题。主要用于显示一个纯副标题。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="utils"/>
      - <FileType type="file" name="show_empty_title.mcfunction"/>：显示空标题
</treeview>

```mcfunction showLineNumbers title="lib/utils/show_empty_title"
# ===== 工具：显示空标题 =====
# 用于显示一个空的标题，便于直接执行副标题。
# 调用此方法时：无需修饰。

title @a times 0 60 0
title @a title §1
```

### 恢复玩家视角

调用`lib/utils/recover_camera`以使用动画将相机恢复到玩家视角。在恢复后需要自行使用`camera @a clear`清除玩家的视角。调用此方法时，需修饰执行者为恢复视角的玩家（`execute as @a[...]`）。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="utils"/>
      - <FileType type="file" name="recover_camera.mcfunction"/>：恢复玩家视角
</treeview>

```mcfunction showLineNumbers title="lib/utils/recover_camera"
# ===== 工具：恢复玩家视角 =====
# 用于将相机恢复到玩家视角。
# 调用此方法时：需修饰执行者为恢复视角的玩家（execute as @a[...]）。

execute at @s anchored eyes run camera @s set minecraft:free ease 3 in_out_quad pos ^^^0.3 facing ^^^1
```

### 长时黑屏

调用`lib/utils/set_black_screen`以创建一个长时间的黑屏任务。调用此方法时，需提前输入`time.blackScreen`值（`scoreboard players set blackScreen time ?`）。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="utils"/>
      - <FileType type="file" name="set_black_screen.mcfunction"/>：长时黑屏
</treeview>

```mcfunction showLineNumbers title="lib/utils/set_black_screen"
# ===== 工具：长时黑屏 =====
# 用于创建一个长于 10 秒的黑屏。短于 10 秒的黑屏请直接使用 camera 命令。
# 调用此方法时：需提前输入 time.blackScreen 值（scoreboard players set blackScreen time ?）。

execute if score blackScreen time matches 1.. run camera @a fade time 0 1.1 0
execute if score blackScreen time matches 1.. run schedule delay add lib/utils/set_black_screen 1s replace
execute if score blackScreen time matches 1.. run scoreboard players remove blackScreen time 1
```

### 游戏模式切换器

调用`lib/utils/change_gamemode`以根据玩家手持的物品切换游戏模式。调用此方法时，需修饰执行者为特定玩家（`execute as @a[...]`），通常不建议所有玩家都能执行此命令。建议循环执行。

这段命令将默认在玩家手持金苹果时切换为创造模式，手持铁剑时切换为生存模式，手持空地图时切换为冒险模式，手持末影之眼时切换为旁观模式，并且会在玩家物品栏没有这些物品时补充。当玩家手持这些物品时，将自动清除。当玩家在旁观模式下抬头时，将自动切换为创造模式。

<treeview>
- <FileType type="folder" name="functions"/>
  - <FileType type="folder" name="lib"/>
    - <FileType type="folder" name="utils"/>
      - <FileType type="file" name="change_gamemode.mcfunction"/>：游戏模式切换器
</treeview>

```mcfunction showLineNumbers title="lib/utils/change_gamemode"
# ===== 游戏模式切换器 =====
# 用于在玩家手持对应更改游戏模式的物品时，切换游戏模式。
# 调用此方法时：需修饰执行者为特定玩家（execute as @a[...]），通常不建议所有玩家都能执行此命令。

# --- 给予全体玩家4种变换模式的工具 ---
replaceitem entity @s[hasitem={item=golden_apple,quantity=0}] slot.inventory 0 golden_apple
replaceitem entity @s[hasitem={item=iron_sword,quantity=0}] slot.inventory 1 iron_sword
replaceitem entity @s[hasitem={item=empty_map,quantity=0}] slot.inventory 2 empty_map
replaceitem entity @s[hasitem={item=ender_eye,quantity=0}] slot.inventory 3 ender_eye

# --- 手持 切换为创造 物品时，切换该玩家为创造模式 ---

## 当玩家处于创造模式时，执行失败
tellraw @s[m=creative,hasitem={item=golden_apple,location=slot.weapon.mainhand}] { "rawtext": [ { "translate": "§c你已为创造模式，无法做出更改" } ] }
## 当玩家不处于创造模式时，执行成功
tellraw @s[m=!creative,hasitem={item=golden_apple,location=slot.weapon.mainhand}] { "rawtext": [ { "translate": "你已被调整为创造模式" } ] }
gamemode creative @s[m=!creative,hasitem={item=golden_apple,location=slot.weapon.mainhand}]
## 将玩家手中的物品清除
replaceitem entity @s[hasitem={item=golden_apple,location=slot.weapon.mainhand}] slot.weapon.mainhand 0 air
## 当玩家处于旁观模式抬头时，变回创造模式
tellraw @s[m=spectator,rx=-85,rxm=-90] { "rawtext": [ { "translate": "你已被调整为创造模式" } ] }
gamemode creative @s[m=spectator,rx=-85,rxm=-90]

# --- 手持 切换为生存 物品时，切换该玩家为生存模式 ---

## 当玩家处于生存模式时，执行失败
tellraw @s[m=survival,hasitem={item=iron_sword,location=slot.weapon.mainhand}] { "rawtext": [ { "translate": "§c你已为生存模式，无法做出更改" } ] }
## 当玩家不处于生存模式时，执行成功
tellraw @s[m=!survival,hasitem={item=iron_sword,location=slot.weapon.mainhand}] { "rawtext": [ { "translate": "你已被调整为生存模式" } ] }
gamemode survival @s[m=!survival,hasitem={item=iron_sword,location=slot.weapon.mainhand}]
## 将玩家手中的物品清除
replaceitem entity @s[hasitem={item=iron_sword,location=slot.weapon.mainhand}] slot.weapon.mainhand 0 air

# --- 手持 切换为冒险 物品时，切换该玩家为冒险模式 ---

## 当玩家处于冒险模式时，执行失败
tellraw @s[m=adventure,hasitem={item=empty_map,location=slot.weapon.mainhand}] { "rawtext": [ { "translate": "§c你已为冒险模式，无法做出更改" } ] }
## 当玩家不处于冒险模式时，执行成功
tellraw @s[m=!adventure,hasitem={item=empty_map,location=slot.weapon.mainhand}] { "rawtext": [ { "translate": "你已被调整为冒险模式" } ] }
gamemode adventure @s[m=!adventure,hasitem={item=empty_map,location=slot.weapon.mainhand}]
## 将玩家手中的物品清除
replaceitem entity @s[hasitem={item=empty_map,location=slot.weapon.mainhand}] slot.weapon.mainhand 0 air

# --- 手持 切换为旁观 物品时，切换该玩家为旁观模式 ---

## 当玩家处于旁观模式时，执行失败
tellraw @s[m=spectator,hasitem={item=ender_eye,location=slot.weapon.mainhand}] { "rawtext": [ { "translate": "§c你已为旁观模式，无法做出更改" } ] }
## 当玩家不处于旁观模式时，执行成功
tellraw @s[m=!spectator,hasitem={item=ender_eye,location=slot.weapon.mainhand}] { "rawtext": [ { "translate": "你已被调整为旁观模式，抬头调整回创造模式" } ] }
gamemode spectator @s[m=!spectator,hasitem={item=ender_eye,location=slot.weapon.mainhand}]
## 将玩家手中的物品清除
replaceitem entity @s[hasitem={item=ender_eye,location=slot.weapon.mainhand}] slot.weapon.mainhand 0 air

```

<!--

### 二分法获取实体坐标

### 实体遍历

### FMBE

-->

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
