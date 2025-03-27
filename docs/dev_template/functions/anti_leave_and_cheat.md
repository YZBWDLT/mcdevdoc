---
sidebar_position: 3
---

# 反作弊与反退出系统

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);

## [<Highlight color="#25c2a0">下载</Highlight>](https://app.nekodrive.net/s/Zkriw)

本包**搭建了反作弊系统**，便于您构建属于自己的反作弊逻辑。同时，本包还**搭建了反退出系统**，可以**自动让中途进入的玩家执行命令**，这对于多人情况尤其有效。

本包为**行为包**。

:::warning[温馨提醒]

我们建议您把此包和「[主包 v3](main_v3)」结合使用，否则其中的部分内容可能需要您的单独适配。

:::

## 使用方法

**安装「[主包 v3](main_v3)」并与本包合并，进行初始化变量后，即可使用以下功能**。

### 启用反作弊

您可以修改`system/anticheating.mcfunction`的内容来自定义反作弊，该函数将始终执行。

我们已经为您预设了几个反作弊功能，但是默认状态并未启用，去除掉这些命令的注释即可启用它们。

### 使中途进入的玩家执行命令

您可以修改`system/antileave.mcfunction`的内容**来使中途进入的玩家执行命令**，从而**阻止他们的重新进入对游戏体验的破坏**。该函数将始终执行。

这个功能对多人游戏的情况尤其重要且有效。

**下文中高亮的部分部分请勿修改**。

```mcfunction showLineNumbers title="system/antileave.mcfunction" {4-5,15-17}
# ===== 反退出重进系统 =====
# 本系统仅对退出重进的玩家有效。

# --- 获取退出重进的玩家 ---
scoreboard players add @a isOnline 0

# --- 令退出重进玩家执行的命令 ---

## 获取当前玩家使用的版本
execute as @a[scores={isOnline=0}] at @s run function lib/get_data/client

## 其他命令
# execute as @a[scores={isOnline=0}] at @s run (退出重进的玩家将会执行这条命令)

# --- 将所有玩家设置为在线模式 ---
scoreboard players reset * isOnline
scoreboard players set @a isOnline 1

```

## 可用函数

您可以对本包中的下面的函数进行修改、调用。

| 文件名（`.mcfunction`） | 用途 | 输出数据（变量、标签） |
| --- | --- | --- |
| `system/anticheating` | 反作弊（循环执行） | — |
| `system/antileave` | 令中途退出的玩家执行命令 | — |

## 实例

<details>

<summary>在《冒险小世界：剑之试炼》中使用的防退出重进系统</summary>

基于 1.18.30 的函数系统。

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

<details>

<summary>在《30 种死法 2》中使用的防作弊的函数</summary>

基于 1.20.10 的函数系统。

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

## 合并时可能需要修改的文件

以下文件可能和您已有的包产生冲突。在复制这些文件时，请注意**以下文件不能直接复制，需要视情况手动粘贴其中的内容**。

该列表中不列出`manifest.json`（附加包清单文件）和`pack_icon.png`（附加包图标）。

- `BP_developer_mode/functions/lib/modify_data/init/data.mcfunction`（行为包 - 函数 - 库函数 - 初始化数据）
- `BP_developer_mode/functions/system/main.mcfunction`（行为包 - 函数 - 主文件）

## 更新日志

该包拆自主包 v2，并主要进行了如下更改：

- 提升最低版本需求为 1.20.50
- 将相关变量从主包中独立出来
- 移除了相关库函数方法，现在直接在函数内部检测
