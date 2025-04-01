---
sidebar_position: 3
---

# 音效控制器（延时播放音效）

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);

## [<Highlight color="#25c2a0">下载</Highlight>](https://app.nekodrive.net/s/pMKTj)

本包**搭建了一个延时播放音效的系统**，在**传送玩家并且需要播放音效的场景**非常有用。

当玩家传送后的瞬间执行`/playsound`命令会导致玩家无法听见这声音，音效控制器因此而生。音效控制器的原理是，当您启用音效控制器后，将启用一段时间很短的倒计时，倒计时结束后再播放音效，也就是**延时播放音效**。

本包为**行为包**。

:::warning[温馨提醒]

我们建议您把此包和「[主包 v3](main_v3)」结合使用，否则其中的部分内容可能需要您的单独适配。

:::

:::note[注意：本文的通用语言]

- **路径表示**：如无特殊说明，本文的路径`./`均指代`BP/functions/lib/modify_data/states/sounds/`。
  - 例如，`./reset.mcfunction`指代`BP/functions/lib/modify_data/states/sounds/reset.mcfunction`。
- **变量表示**：本文，我们把`objective`记分板上名为`name`的追踪目标的分数`score`记为`objective.name`=`score`。
  - 例如，检测`objective.name`的分数是否为`1`，为`/execute if score name objective matches 1`。

:::

## 使用方法

**安装「[主包 v3](main_v3)」并与本包合并，进行初始化变量后，即可使用以下功能**。

### 实现原理

在您正式使用本包之前，我们必须向您介绍我们实现延时播放音效的原理。否则，您可能会在使用本包时感到吃力。

基本原理是，我们有两个变量：音效控制器的状态（`active.sound`）和计时器（`time.sound`）。如果**状态（`active.sound`）为`0`**，则代表音效控制器处于**禁用状态**。如果**状态大于或等于`1`**，则代表音效控制器处于**启用状态**。

启用状态下：

- 如果计时器（`time.sound`）的时间大于 0：
  - 进行倒计时，每一刻该值将自减 1 分；
- 如果计时器（`time.sound`）的时间等于 0：
  - 通过状态（`active.sound`）来决定播放哪个音效；
  - 然后，关闭音效控制器（将状态设置为`0`以表示关闭），并设置计时器默认为`3`游戏刻的倒计时。

### 启用或禁用音效控制器

您可以调用`./`文件夹中的文件来控制状态（`active.sound`）和计时器（`time.sound`）。我们提供了一个控制文件`./random_orb.mcfunction`，您可以使用

```mcfunction showLineNumbers
/function lib/modify_data/states/sound/random_orb
```

以延时 3 游戏刻播放`random.orb`（经验球）音效。您还可以使用

```mcfunction showLineNumbers
/function lib/modify_data/states/sound/reset
```

立刻禁用音效控制器。**注意：请不要修改`./reset.mcfunction`文件**！

### 新增音效事件

您可按照下面的代码来新增一个可用于调用的音效控制器控制文件`./xxx.mcfunction`（`xxx`为自定名称，**高亮部分可更改**）：

```mcfunction showLineNumbers title="./xxx.mcfunction" {1-2,8,13,15}
# ===== 播放音效(音效ID) =====
# 用于延时播放音效(音效ID)。

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · (倒计时，默认为3)刻后播放音效(音效ID)

# --- 启用音效播放器 ---

## 启用音效播放器
scoreboard players set sound active (状态)
## 将音效播放器时间重置
scoreboard players set sound time (倒计时，默认为3)

```

然后，在音效控制器注册文件（`system/controller/sound.mcfunction`）中，在高亮代码处仿照着注册一个新的音效事件：

```mcfunction showLineNumbers title="./xxx.mcfunction" {10}
# ===== 音效播放器 =====
# 仅当音效播放器启用后执行

# --- 音效倒计时 ---
scoreboard players remove sound time 1

# --- 音效事件 ---
# 当音效倒计时为0后执行
execute if score sound time matches 0 if score sound active matches 1 as @a at @s run playsound random.orb @s ~~~ 1 1
execute if score sound time matches 0 if score sound active matches (状态) as @a at @s run playsound (音效ID) @s ~~~ (音量) (音调)

# --- 重置音效播放器 ---
# 当音效倒计时为0后执行
execute if score sound time matches 0 run function lib/modify_data/states/sound_player/reset

```

最后，执行

```mcfunction showLineNumbers
/function lib/modify_data/states/sound/xxx
```

即可播放您新增的音效事件。

## 可用函数

您可以对本包中的下面的函数进行修改、调用。

| 文件名（`.mcfunction`） | 用途 | 输出数据（变量、标签） |
| --- | --- | --- |
| `system/controller/sound` | 倒计时，以及控制何状态播放何种音效 | — |
| `./random_orb` | 3 游戏刻后播放经验球音效 | `active.sound`=`1`,`time.sound`=`3` |
| `./reset` | 禁用音效控制器（**不要改动**） | `active.sound`=`1`,`time.sound`=`3` |

## 实例

<details>

<summary>在《30 种死法 2》中使用的音效控制器</summary>

基于 1.20.10 的函数系统。

音效控制器注册文件：

```mcfunction title="BP_wstd/functions/system/controller/sound.mcfunction" showLineNumbers
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
execute if score sound time matches 0 run function lib/modify_data/states/sound/reset
```

其中一个音效控制器控制文件：

```mcfunction title="BP_wstd/functions/lib/modify_states/sound/random_levelup_2.mcfunction" showLineNumbers
# ===== 播放升级音效 =====
# 用于延时播放升级音效。

# 调用此方法时：
# · 执行者任意
# · 执行位置任意
# 输出结果：
# · 3刻后播放升级音效（音调2）

# --- 启用音效播放器 ---

## 启用音效播放器
scoreboard players set sound active 8
## 将音效播放器时间重置
scoreboard players set sound time 3

```

</details>

## 合并时可能需要修改的文件

以下文件可能和您已有的包产生冲突。在复制这些文件时，请注意**以下文件不能直接复制，需要视情况手动粘贴其中的内容**。

该列表中不列出`manifest.json`（附加包清单文件）和`pack_icon.png`（附加包图标）。

- `BP/functions/lib/modify_data/init/data.mcfunction`（行为包 - 函数 - 库函数 - 初始化数据）
- `BP/functions/system/main.mcfunction`（行为包 - 函数 - 主文件）

## 更新日志

该包拆自主包 v2，并主要进行了如下更改：

- 提升最低版本需求为 1.20.50
- 将相关变量从主包中独立出来
