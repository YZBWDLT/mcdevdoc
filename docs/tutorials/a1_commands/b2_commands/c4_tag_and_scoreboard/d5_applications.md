---
sidebar_position: 5
---

# 2.4.5 记分板的运用 变量

在前面的内容中，我们已经学习了标签命令`/tag`和记分板命令`/scoreboard`。但是，这两个东西有什么用呢？我们在这一节，就来介绍如何检测分数，综合应用这些基本工具，并引入*变量*的概念。

## 检查分数的常用方法

我们在上一节简单了解了一下检测分数的命令`/scoreboard players test`，但是该命令只能检测而不能执行命令，所以在上一节中我们只将其列为了扩展内容。那么，实际工程中我们是如何检查分数的呢？

### 目标选择器参数`scores`

现在我们来了解一下这个新的目标选择器参数`scores`。它的语法如下：

```text
scores={<记分项: string>=<值: integer range>,...}
```

**它将筛选出在`记分项`上的分数在`值`内的实体**。`记分项`我们已经十分熟知，但`值`我们似乎还从来没见过，尤其是它的类型`integer range`。

其实，`integer range`非常简单。它既可以代表一个特定的值，也可以代表一个数值范围。

- **如果要指定一个具体的值，就直接写为这个值**。
  - 例如，指定分数为 1 分，就写为`1`。
- **如果要指定为范围，它的格式是`最小值..最大值`，并且含两端**。
  - 例如，指定分数范围在 1~5 分之内，就写为`1..5`。注意：中间是 2 个点哦！不要写为 3 个点。
  - 如果只想指定大于等于 1 分，那么可以不写最大值，直接写为`1..`。
  - 同样地，指定小于等于 5 分，可以不写最小值，直接写为`..5`。
- **`integer range`还支持反选，只需要在其最前面加上一个`!`即可**。
  - 例如，如果指定分数不在 1~5 分之内，就写为`!1..5`。
  - 如果分数不为 1 分，就写为`!1`。

我们在后面还会见到这个`integer range`类型，例如马上要提到的`execute if score`和之后要提到的`hasitem`的扩展。

:::tip[实验 2.4-18]

执行命令`/scoreboard players set @s data 5`，然后执行`/execute if entity @s[scores={data=1..10}]`。如上文所说，这条命令将检查执行者是否在`data`上拥有 1~10 分（取两端）。

然后，先执行`/scoreboard players set @s data 15`，再检查一次`/execute if entity @s[scores={data=1..10}]`。这时，这条命令就将检测失败。

:::info[思考 2.4-1]

这时执行`/execute if entity @s[scores={data=!10..}]`是执行成功还是失败？试分析之并在游戏内验证。

:::

而`...`则代表着，它可以同时检查一个实体的多个记分板上的分数是否符合条件。例如，查找`foo.@s`∈[5,10]并且`bar.@s`∉[3,+∞)的实体，就可以表示为

```mcfunction
/execute if entity @e[scores={foo=5..10,bar=!3..}]
```

### `/execute`的子命令`if score`

刚刚的`scores`目标选择器参数，虽然表达简洁易懂，也很好用，沾上目标选择器的命令就都能用，但是**它有一个致命缺陷——无法指定假名**。还是老问题：因为假名并不是真实存在的实体，所以不能用目标选择器指代。

这时，就该让我们的`/execute`登场啦！`/execute`有一条子命令`if score`可以处理这样的问题：

```text title="/execute if|unless score的语法" showLineNumbers
<if|unless> score <目标: target> <记分项: string> <操作方法: compare operator> <源目标: target> <记分项: string> -> execute
<if|unless> score <目标: target> <记分项: string> matches <范围: integer range> -> execute
```

我们先关注第一条语法。它表示，**当`目标`在其`记分项`上的分数和`源目标`在其`记分项`上的分数经过`操作方法`比较成立后，则检测通过**。

你是否还记得我们上一节曾讲过的`/scoreboard players operation`？那里也涉及到一个很类似的`操作`，而且也是左边的分数和右边的分数进行对比。但是，这里终究不完全一样，因为`/scoreboard players operation`的`操作`是`operator`类型，每个运算符都进行了赋值的操作；而这里是`compare operator`类型，代表它只进行对比而不赋值。其接受的运算符，就是典型的比较符号了：大于等于`>=`、小于等于`<=`、大于`>`、小于`<`、等于`=`。

:::tip[实验 2.4-19]

依次执行下面的命令。

```mcfunction
/scoreboard players set x data 100
/scoreboard players set y data 5
/execute if score x data >= y data
```

这 3 条命令中，前两条用来定义`data.x`和`data.y`，最后这条则是比较`data.x`是否大于等于`data.y`。显然，这条命令的条件检测一定会通过。

你可以变换一下其中的`操作方法`和`data.x`、`data.y`两个值，体验`/execute if score`的比较大小用法。

:::

而第二个语法，则是我们直接把`/scoreboard players test`打为“扩展内容”的直接原因。它表示，**当`目标`在`记分项`上的分数满足`范围`条件时，则检测通过**。看，`integer range`又回来了！

:::tip[实验 2.4-20]

在实验 2.4-19 的基础上，分别执行下面的几条命令，观察执行效果。注意：实践时很多开发者常常丢`matches`，不要忘了哦！

```mcfunction showLineNumbers
/execute if score x data matches 1..
/execute if score x data matches ..10
/execute if score x data matches 1..10
/execute if score x data matches !1..10
/execute if score x data matches 100
```

:::

因为在实验 2.4-19 中，定义了`data.x`=`100`，所以：

- 第一条命令执行成功，因为 100≥1 成立；
- 第二条命令执行失败，因为 100≤10 不成立；
- 第三条命令执行失败，因为 1≤100≤10 不成立；
- 第四条命令执行成功，因为 1≤100≤10 不成立（注意有一个`!`）；
- 第五条命令执行成功，因为 100=100 成立。

显然，`/execute if score x data matches !1..10`和`/execute unless score x data matches 1..10`也是等价的。具体采用哪种写法，就看你的个人风格了。

基本上，可以认为`/execute if score`是目标选择器`scores`的扩展版，因为它支持假名。同时，你还可以认为`/execute if score`是`/scoreboard players test`的扩展版，因为它不仅完全支持特定范围的检测，还支持比较两个分数的大小关系，并且还能够在条件通过后继续执行命令。

总体来说，**`scores`目标选择器参数和`/execute if score`都是极为常用的检测分值的方法**。

:::info[思考 2.4-2]

你可以只用`/scoreboard players operation`命令，完成两个分数的大小比较吗？比如，当`data.x`>`data.y`时，执行命令`/say 1`，但是不能用`/execute if score x data > y data`去检测！

:::

## 记分板的运用实例

可能你会问：既然记分板和标签的添加，对实体、对世界不会有任何影响，那么我们要这两样东西究竟有什么用呢？别忘了，我们引入标签和记分板的目的只有一个——**标记**！我们会按照我们自己的需求进行变量的定义和标记，这对于我们条件性地执行命令是有很大意义的。

现在，我们就几个常见的应用场景和疑难问题进行一些思路分享，这对你未来在项目中的实战也许会有很大的帮助。

### 信息板

记分板的一个很常用的实例，是作为信息展板。在很多地图和服务器中，你都能看到屏幕右侧的基本信息展示，例如在 Hypixel 的起床战争中，就有一个标准的记分板式的信息展板，展示各队当前床的情况、队伍情况、击杀数等信息。

然而，目前基岩版的记分板只能对所有玩家显示，还做不到对特定的玩家显示特定的信息，因此只能展示那些针对所有玩家的信息，例如在起床战争中，就可以展示队伍信息。

我们在学习记分板的时候，已经知道记分板的文本展示是按照分数的高低排序的，利用这一点我们可以指定特定的信息显示在什么位置上。现在我们不妨假设存在一个后台数据的记分板`data`，关于红队，记录着他们是否有床`data.teamRedHasBed`、剩余人数`data.memberAmount`、是否淘汰`data.isEliminated`三个参数，显示他们的信息在`display`记分板上。我们可以先创建这个记分板并显示出来：

```mcfunction
scoreboard objectives add display dummy "§e起床战争"
scoreboard objectives setdisplay sidebar display ascending
```

备注：§e代表黄色。**`§`+`0-9,a-z`时会呈现不同的文本格式和颜色，所以被称为格式代码**。这里，我们指定为了升序`ascending`，便于我们按照队伍顺序排序。

然后，按照该队伍的分值信息，显示该队伍的状态。该队伍的床还在的话，就显示一个“√”；床不在但还有人，就显示当前剩余人数；否则，显示一个“×”。基于这个原理，以及所给定的分数信息，我们可以写出下面的内容

```mcfunction
execute if score teamRedHasBed data matches 1 run scoreboard players set "§c红队 §a√" display 1
execute if score teamRedHasBed data matches 0 if score memberAmount data matches 4 run scoreboard players set "§c红队 §e4" display 1
execute if score teamRedHasBed data matches 0 if score memberAmount data matches 3 run scoreboard players set "§c红队 §e3" display 1
execute if score teamRedHasBed data matches 0 if score memberAmount data matches 2 run scoreboard players set "§c红队 §e2" display 1
execute if score teamRedHasBed data matches 0 if score memberAmount data matches 1 run scoreboard players set "§c红队 §e1" display 1
execute if score teamRedHasBed data matches 0 if score memberAmount data matches 0 run scoreboard players set "§c红队 §c×" display 1
```

然而，一旦情况发生了变化，比如红队失去了床之后，我们必须及时把“§c红队 §a√”给移除掉，否则记分板上将同时出现两个名字“§c红队 §a√”和“§c红队 §e4”，立刻穿帮。所以，我们还要写一个清除分数的逻辑。

```mcfunction
scoreboard players reset "§c红队 §a√" display
scoreboard players reset "§c红队 §e4" display
scoreboard players reset "§c红队 §e3" display
scoreboard players reset "§c红队 §e2" display
scoreboard players reset "§c红队 §e1" display
scoreboard players reset "§c红队 §c×" display
```

对于其他队伍，也如法炮制即可。事实上，这就是《30 种死法 2》中采用的记分板信息显示的基本逻辑。

### 抽奖机

现在假设我们要做一个抽奖机，投入一颗绿宝石后，有 95% 的概率给予一组泥土，还有 5% 的概率给予 10 颗钻石。

显然，对于这种概率和随机事件，使用`/scoreboard players random`是最好不过的选择了。我们可以在 1\~100 之间随机一个数字，当这个数字为 1\~95 的时候就给予泥土，当数字为 96\~100 的时候就给予钻石，这便是基本思路了。

顺着这个基本思路，我们便写出下面的命令：

```mcfunction showLineNumbers
scoreboard players random lottery data 1 100
execute if score lottery data matches 1..95 run give @p dirt 64
execute if score lottery data matches 96..100 run give @p diamond 10
```

接下来有什么优化空间呢？首先要求得投入一颗绿宝石，但直接一开始就贸然清理绿宝石固然不是个好选择，除非使用条件制约型命令方块（检查是否成功执行了命令的一种执行命令的方块），否则是否清除了物品很难界定。既然如此，我们不妨换个思路，比如检查附近玩家是否拥有绿宝石？检查到之后就先执行抽奖的命令，然后再清除绿宝石也未尝不可嘛。这样，我们就能写出改进后的命令：

```mcfunction showLineNumbers
execute as @p if entity @s[hasitem={item=emerald}] run scoreboard players random lottery data 1 100
execute as @p if entity @s[hasitem={item=emerald}] if score lottery data matches 1..95 run give @s dirt 64
execute as @p if entity @s[hasitem={item=emerald}] if score lottery data matches 96..100 run give @s diamond 10
execute as @p if entity @s[hasitem={item=emerald}] run clear @s emerald
```

基本上，就是给每条命令都加上一个拥有绿宝石的最近玩家的前提。但是，这么写未免也太冗长了！我们可以借助标签来再进行一下简化：

```mcfunction showLineNumbers
execute as @p if entity @s[hasitem={item=emerald}] run tag @s add lottery
execute as @p[tag=lottery] run scoreboard players random lottery data 1 100
execute as @p[tag=lottery] if score lottery data matches 1..95 run give @s dirt 64
execute as @p[tag=lottery] if score lottery data matches 96..100 run give @s diamond 10
execute as @p[tag=lottery] run clear @s emerald
tag @a remove lottery
```

这样，就形成了一套逻辑相对完整又易读的命令系统了。

### 实现随机的对话

在一些地图中常常能看见一些 NPC 的随机对话。怎么实现呢？显然，这种情况也是非`/scoreboard players random`不可。

我们现在假设有一种自定义的 NPC（ID 为`custom:npc`），右键交互后便获得`talking`标签（这确是可实现的，在模块 2 中你就看到它的实现方法）。现在，我们就来基于这些条件实现随机的对话吧！

我们可以在检测到有`talking`标签的 NPC 时，让这些 NPC 使用`/scoreboard players random`随机几种情况，使他们对玩家说话，说完话之后再移除`talking`标签，为下次的右键做好准备。

```mcfunction showLineNumbers
## 指定要随机说哪句话
execute as @e[type=custom:npc,tag=talking] run scoreboard players random @s data 1 5
## 按照data.@s的数据对玩家说话
execute as @e[type=custom:npc,tag=talking] if score @s data matches 1 run say 你好呀~
execute as @e[type=custom:npc,tag=talking] if score @s data matches 2 run say 好久不见！
execute as @e[type=custom:npc,tag=talking] if score @s data matches 3 run say 欢迎！
execute as @e[type=custom:npc,tag=talking] if score @s data matches 4 run say 有空常来哦~
execute as @e[type=custom:npc,tag=talking] if score @s data matches 5 run say Hello!
## 移除标签和随机数据
execute as @e[type=custom:npc] run tag @e remove talking
execute as @e[type=custom:npc] run scoreboard players reset @s data
```

事实上，这正是地图《触发》中，与 NPC 交互的基本原理，只是其中执行的具体内容和上文所列举的有若干差异。

### 检测站立、潜行、爬行和睡觉的玩家

假设现在我们在做一个难度很高的跑酷游戏，禁止玩家潜行，否则将其传送回出生点。检测潜行怎么做呢？我们可以从 1.20.10 加入的潜行高度上入手。玩家在站立时的高度是 1.8 格，而潜行时的高度仅为 1.5 格。也就是说，只要我们能够抓住这个高度变化，就能够检测到玩家潜行了。

![player_height](../img/c4_tag_and_scoreboard/player_height.png)

这不由得让我们想起目标选择器，因为基本上只有它能在不依靠任何外部环境的情况下做检测。而检测位置的参数，主要有`x`、`y`、`z`、`dx`、`dy`、`dz`、`r`和`rm`，这些都是**判定碰撞箱是否和检测区域重叠**。利用这些，我们就可以考虑从玩家的位置开始，在 1.6 格高度处看能不能检测到这个玩家的碰撞箱，如果检测得到，那么玩家必定处于站立状态下，为站立玩家添加`isStanding`标签，否则就不处于站立状态，没有`isStanding`标签。用命令来写，就是：

```mcfunction showLineNumbers
tag @a remove isStanding
execute as @a at @s if entity @s[y=~1.6,dy=0.1] run tag @s add isStanding
```

但是，这么做只能检测是否站立，但是我们在标题中要求多个状态的检测。这时候用标签来标记玩家的状态其实就不太合适了，因为这里涉及了 4 个状态，所以我们至少要定义 2 个标签（有1有2、有1无2、无1有2、无1无2），并且每次进行状态变换时，都要对两个标签同时变换。如果要追求可读性，就要定义 4 个标签`isStanding`、`isSneaking`、`isCrawling`、`isSleeping`，每次状态变换时甚至要对 4 个标签同时变换。然而，**对于这种相互互斥的多状态情况，用记分板来标记状态，则是再好不过的选择**。毕竟我们只需要定义站立时为`0`、潜行时为`1`、爬行时为`2`、睡觉时为`3`，而不必考虑旧状态标签残留的情况。

记分板的基本路线确定之后，我们就用`state`记分板来记录玩家的数据。刚刚，我们已经找到了站立的玩家是 1.6 格高处的玩家。潜行的玩家怎么表达呢？可以用 1.3~1.4 格的玩家来表达：`@s[y=~1.3,dy=0.1]`，但是此时站立的玩家也将处于这个检测范围之间，这时我们可以用`unless`来排除 1.6 格或更高的情况。于是结合上面的思路，我们可以写为

```mcfunction showLineNumbers
execute as @a at @s if entity @s[y=~1.6,dy=0.1] run scoreboard players set @s state 0
execute as @a at @s if entity @s[y=~1.3,dy=0.1] unless entity @s[y=~1.6,dy=0.1] run scoreboard players set @s state 1
```

:::info[思考 2.4-3]

根据上面的思路，补齐检测爬行和睡觉的玩家的命令。

:::

然后，获取到潜行数据之后，传送回重生点就只需要立刻杀死玩家即可。当然，你也可以使用`/tp`。

```mcfunction showLineNumbers
execute as @a if score @s state matches 1 run kill @s
```

### 记分板商店

在 [2.2](../c2_simple_cmds#清除物品的命令clear) 中，我们曾说过基于`/clear`商店的一个最大问题在于它不能指定清除的最小数目，以至于当玩家的货币数量不足时，仍然能够执行成功并完成交易。因此，在`hasitem`更新前，各路开发者就想到使用记分板来解决这些问题。玩家将自己的记分板分数作为货币，通过某些途径可以获取分数（即货币数量），而且它还具有非实体化的特点（不存在于物品栏内），这就使得它不会拥有上限，直到现在记分板商店仍然是一种十分常用的商店模式。

假设有一个记分板`money`，各路玩家的分数作为货币数据被储存在这里。我们假设玩家使用 100 货币购买一把石剑，用 1000 货币购买一把钻石剑，这样我们直接检测分数就可以。

```mcfunction
execute as @a if score @s money matches 100.. run give @s stone_sword
```

```mcfunction
execute as @a if score @s money matches 1000.. run give @s diamond_sword
```

那么如果我们还想加一个购买失败的反馈怎么做呢？我们可以检测到玩家不满足这个分数时，为他反馈。

```mcfunction
execute as @a if score @s money matches 100.. run give @s stone_sword
execute as @a unless score @s money matches 100.. run say 你没有足够的货币购买石剑！
```

```mcfunction
execute as @a if score @s money matches 1000.. run give @s diamond_sword
execute as @a unless score @s money matches 1000.. run say 你没有足够的货币购买钻石剑！
```

不过，这么做有一个问题就是，所有玩家都会看到这个反馈。在后面，我们将陆续学到一些命令，以对特定玩家说话。

### 计时器

记分板还有一个常用的用途就是计时器。我们可以新建一个记分板`time`，用来存储时间数据。如何指定 1 秒呢？我们在前面曾经学习过一个时间变换原理，1 秒 =20 游戏刻，也就是说只要我们能够保证每一个游戏刻都执行命令，这原理就是可行的，好在事实上也是可行的，在后面我们学习命令方块和函数的时候就会看到这一点。

现在，基于上面的原理，我们可以添加一个分数`time.tick`，用来指代当前的游戏刻数据，让它每刻都加一分：

```mcfunction
scoreboard players add tick time 1
```

然后，当`time.tick`达到 20 分的时候，将秒数`time.second`加 1 分，代表添加了 1 秒。然后，将`time.tick`复原回 0 分进行循环：

```mcfunction
execute if score tick time matches 20.. run scoreboard players add second time 1
execute if score tick time matches 20.. run scoreboard players remove tick time 20
```

同样地，对于分钟，我们可以当`time.second`达到 60 分的时候，为`time.minute`加 1 分并复原`time.second`。

```mcfunction
execute if score second time matches 60.. run scoreboard players add minute time 1
execute if score second time matches 60.. run scoreboard players remove second time 60
```

:::info[思考 2.4-4]

根据上面的思路，补齐小时的计时器的检测。使用分数`time.hour`。

:::

### 获取实体数目

在很多情况下，我们都要获取一些实体的数目。例如当玩家数目达到 14 人时，才能开启游戏。问题在于，如何获取人数呢？

我们可以用一个记分板的分数`data.playerAmount`来记录人数，并且一开始的时候需要初始化分数为`0`。

```mcfunction
scoreboard players set playerAmount data 0
```

接下来，我们需要想个办法，获取玩家人数并记录在`data.playerAmount`上。可能你已经想到了，只要让每名玩家都执行一次特定的命令就可以了，而这个特定的命令也很简单：

```mcfunction {2}
scoreboard players set playerAmount data 0
execute as @a run scoreboard players add playerAmount data 1
```

就直接让每名玩家给`data.playerAmount`加一分就行啦！加完之后不就是总人数了么？

更改`@a`为特定的目标选择器，那么就筛选出符合要求的特定实体的数量，但别忘了把`playerAmount`的名字改掉！

### 处理“玩家下线”问题

在多人游戏下，当玩家下线后，其分数并不会被消除，而是转变为“玩家下线”继续留在记分板上，等到该玩家回到游戏后，再恢复其分数。

然而，“玩家下线”往往会造成许多非常头疼的问题。首先，这种情况下的玩家分数是无法使用目标选择器指代的，因为此时该玩家并不存在于这个世界，而目标选择器只能指代真实存在的实体；其次，“玩家下线”的分数又是一个真实的玩家的分数，这就导致使用假名也不能指代“玩家下线”的分数，例如 Alex 退出了游戏后成为“玩家下线”，此时再直接更改 Alex 的分数，就是假名（虚拟玩家）类型而不是真玩家类型了；最后，这些“玩家下线”还会非常难看地显示在记分板上面。

所以，现在我们的关键问题在于：假设所有玩家的数据都保存在`data`记分板上面，如何在我们需要显示数据的记分板`display`上面移除掉这些难看的“玩家下线”呢？我们首先想到可以使用`/scoreboard players reset`的用法。虽然选择器和假名都无法指代下线的真玩家，但是`*`可以。所以，我们便可以使用`*`移除所有玩家（包括玩家下线）在`display`上面的数据：

```mcfunction
scoreboard players reset * display
execute as @a run scoreboard players operation @s display = @s data
```

但是，经过众多租赁服服主的实测发现：当历史玩家逐渐增多的时候，使用`reset`移除所有玩家的分数会渐渐造成更大的负载。这负载是不难理解的，因为随着玩家人数增多，`data`上记载了大量的数据，而`*`即便是只对`display`记分板生效，也仍然会尝试移除`data`正在追踪的对象，这些对象每个都要穷举一次执行一次命令，导致单游戏刻上堆积了大量的命令响应需求，会导致在清除的那一瞬间变得极为卡顿，就更不要说实际工程中其他大量的记分板了。看来这是一个很严重的问题，有什么办法处理呢？在 B 站上，有一些租赁服开发者给出了他们的答案：将记分板整个移除[^1] [^2]！但是，移除了我们用什么呢？很简单，再加回来就是了嘛。

[^1]: [Bilibili，@黑白格小板凳：【【租赁服】还在用高加载的reset去除玩家下线吗？最新版去除玩家下线，非高频.】](https://www.bilibili.com/video/BV1ae4y1A77S?vd_source=7359c02da6506153a61386c9dea981c1)
[^2]: [Bilibili，@F_小仿：【新型删除计分板玩家下线 不要再用reset*了 网易租赁服必备】](https://www.bilibili.com/video/BV1YvFTeAEFJ?vd_source=7359c02da6506153a61386c9dea981c1)

```mcfunction
scoreboard objectives remove display
scoreboard objectives add display dummy "数据"
scoreboard objectives setdisplay sidebar display
execute as @a run scoreboard players operation @s display = @s data
```

不过，即便是这么做了，记分板也依然会在移除和重新添加的一瞬间闪烁。所以，常用来解决这种问题的办法是：使用一个备用记分板`display1`顶替，两个记分板交替显示，就不会闪了。但是这种方法对执行时机有严格的把控要求，必须在显示后的特定时间段内执行对应命令。所以，在这里我们就不说太多了，等到学习到命令方块的时候你会见到这一点。

### 处理多人游戏下退出重进的玩家的问题

多人游戏下，退出重进的玩家通常会造成很大的问题。为了性能优化，现在的很多地图通常不会对全地图做出检测，而只在需要运行命令的区域执行命令，其他区域则完全不会运行命令。例如，对于《15 周年》地图而言，假设玩家们都已经在水族馆展厅中，然后突然有一个从主展厅退出后又进来的玩家，这时候这个玩家在主展厅极其容易在主展厅的代码未执行的情况下损坏主展厅。这样的问题，在多人游戏下是非常常见、严重而棘手的问题。因此，我们就必须对这些退出重进的玩家进行检测，让他们事先在进入地图时就做好初始化，以适应当前游戏的要求。

事实上，在练习 2.4-3 的第 4 题中，我们已经看到了解决退出重进问题的基本思路。我们现在把这个问题的答案放到这里：

```mcfunction showLineNumbers title="防退出重进逻辑"
scoreboard players add @a isOnline 0
scoreboard players reset * isOnline
scoreboard players set @a isOnline 1
```

这样，对于正常玩家而言，他们的`isOnline.@s`将一直是`1`；当玩家退出后，`reset`命令可以将“玩家下线”清除掉；而他们回来后，因为`isOnline.@s`丢失，所以通过`add`命令使他们重新处于被追踪状态，但是这时这些重进的玩家的分数是`0`。接下来执行命令 2 和 3 后，他们的分数又恢复为`1`，即为在线玩家了。所以，当命令 1 执行后检测到有`isOnline.@s`=`0`的玩家，这些玩家就必定是退出重进的玩家，这时再让他们执行命令。

例如，如果有玩家重进之后，就返回位于(0,-60,0)的大厅，可以这么做：

```mcfunction showLineNumbers {2}
scoreboard players add @a isOnline 0
execute as @a[scores={isOnline=0}] run tp 0 -60 0
scoreboard players reset * isOnline
scoreboard players set @a isOnline 1
```

一定要注意，对于这种`isOnline.@s`=`0`的玩家，要在第一条命令执行后再使他们执行命令。不要等到这三条命令全部执行后再执行此命令，这时这些重进的玩家的分数也是`1`，此时再执行就已经来不及了。

:::info[思考 2.4-5]

这里，我们同样也使用了`reset *`的方法。按照前文所述的逻辑，在出现大量追踪对象的情况下，会造成很严重的卡顿。你能否按照前文所述的逻辑，对防退出重进逻辑的命令进行优化呢？

:::

### 补偿准则缺憾的实例：死亡榜的实现

我们在 [2.4.3](./d3_obj_cmd) 中曾经讲过 Java 版中一个**准则**的概念。其中，我们讲到 Java 版含有众多统计类型的准则，然而基岩版目前只有一个`dummy`，远远落后于 Java 版。

难道就没有一个方法可以弥补这些差距吗？虽然没有办法完全弥补，但总归还是有一些方法可以实现类似的效果。办法是人想出来的，现在我们就来实现 Java 版中的死亡榜。我们创建一个新的记分板`deathCount`，来指代玩家的死亡次数，并且用下面的命令对所有玩家进行初始化。

```mcfunction
scoreboard players add @a deathCount 0
```

然后，如何检测已经死亡的玩家呢？其实我们曾经介绍过一种基于`@a`和`@e[type=player]`的标签检测法，不知道你是否还有印象：

```mcfunction
tag @a remove isAlive
tag @e[type=player] add isAlive
```

这样，不存在`isAlive`标签的玩家就是死亡的玩家了，我们似乎能写出死亡榜的逻辑：

```mcfunction
scoreboard players add @a[tag=!isAlive] deathCount 1
```

且慢！我们必须要考虑这样一种情况。这种检测一般都是每游戏刻进行一次的（如何实现，后面会讲），如果有玩家一直处于死亡状态，岂不是每游戏刻他都要增加分数？本来只死了 1 次，结果一重生一看，自己已经死了 500 多次了，那怎么能行？

看来，我们必须额外标记一种状态，就是玩家处于持续的死亡状态。这样，我们就有 3 种状态：存活、刚刚死亡、持续死亡，显然这时用记分板是最佳的选择。但是死亡榜一般都是要显示出来的，而且玩家的数据也在上面占用过了。这样说，我们就必须要另外创立一个新的记分板`deathState`了。标记存活为`0`、刚刚死亡为`1`、持续死亡为`2`。类似于标签的逻辑，我们令所有存活的玩家的状态锁定为`0`，其余玩家则为`1`：

```mcfunction
scoreboard players set @a deathState 1
scoreboard players set @e[type=player] deathState 0
```

这样算是还原了原来标签的方法，但是还不够，在第一条命令我们不能误伤到已经持续死亡的玩家，否则持续死亡的玩家将被一直标记为刚刚死亡，这不是我们要的结果。也就是说，让它不能对持续死亡的玩家生效：

```mcfunction {1}
scoreboard players set @a[scores={deathState=!2}] deathState 1
scoreboard players set @e[type=player] deathState 0
```

然后接下来，如果有玩家刚刚死亡，就为他的死亡榜添加一分后，再将其设置为持续死亡的状态。注意持续死亡的状态一定要放在死亡榜加分的后面，要先记录下刚刚死亡的玩家的死亡榜分数，再转变为持续死亡的状态。同时，这两条命令必须要放在设置存活状态的玩家后面（也就是第二条命令后面），否则第一条命令设置存活玩家和刚刚死亡的玩家为刚刚死亡，然后立刻执行插入的两条命令，会误伤存活的玩家。

```mcfunction {3-4} title="死亡榜的基本原理"
scoreboard players set @a[scores={deathState=!2}] deathState 1
scoreboard players set @e[type=player] deathState 0
scoreboard players add @a[scores={deathState=1}] deathCount 1
scoreboard players set @a[scores={deathState=1}] deathState 2
```

这样，我们就完成了一个精确的死亡榜的实现！

## 变量

现在，我们来引入在计算机领域中常用的变量的概念。你在前面的众多例子中看到，标签和记分板看似独立，实则为同一个需求而服务。在实际的编程语言中，变量基本上有如下定义：

> 变量来源于数学，是计算机语言中能储存计算结果或能表示值的抽象概念。  
> 变量可以通过变量名访问。在指令式语言中，变量通常是可变的；但在纯函数式语言（如Haskell）中，变量可能是不可变的。

变量通常具有许多种类型，例如整数`int`、浮点数`float`、字符串`string`、布尔值`boolean`等众多编程语言通用的类型：

```javascript
let a = 1;
let b = 2;
let c = a + b; // c = 3
```

还可能会有一些编程语言特有的类型，例如在 JavaScript 中，变量还可能是一个数组`array`或对象`object`；在 Python 中，变量可能是一个列表`list`或字典`dict`，等等……它们都是作为表示值和计算结果的概念。

在 Minecraft 中，我们可以**将标签抽象为一种布尔值变量**，当特定实体拥有特定标签`tag`时，说`tag` = `true`，否则说`tag` = `false`。同样地，可以**将记分板抽象为一种整数变量**，并且说名为`name`的追踪对象在记分项`obj`上的分数为`score`时，将`obj.name`视为变量，而将`score`视为值。

在未来，我们将会把标签和记分板统一视作为变量，并声明变量的类型是记分板变量还是标签变量。如果未特殊说明，或者以`obj.score`形式出现的变量，默认都是记分板变量。

### 数据库的“增删改查”

计算机领域中，对于大量的数据，称为数据库。在一个记分板下的众多变量，或者众多实体的标签变量，这些也可以抽象地看作是一种数据库。**对于数据库而言，基本的操作就是“增删改查”**[^3]。数据库并不是仅仅局限于这种变量的集合，在后面哪怕是物品操作、方块操作等，我们都会看到这种增删改查的思想。

[^3]: 由于编者并非计算机专业毕业，如有疏漏或不严谨之处请见谅。

对于记分板的记分项命令来说，所谓的“增”，就是添加一个记分项，例如`add`；“删”，就是`remove`；“改”，就是更改记分项的属性，例如`setdisplay`和`modify`（当然，这个仅限 Java 版）；“查”，就是`list`。

对于记分板的追踪对象命令来说，“增”，就是将一个未追踪的对象添加为追踪对象，例如`add` 0 分；“删”，就是`reset`；“改”，就是更改追踪对象的分值，我们学习了很多，例如`add`、`set`、`random`等都属于这个范畴；而“查”，就是检测和查询追踪对象的分值，例如`test`和`list`。

对于标签，“增”、“删”和“改”的界限就比较模糊，几乎可以认为是同义，也就是`add`和`remove`；而“查”就是`list`。

看！这样的思想无处不在，基于这种思想你很快就能理解所有记分板和标签命令的用途。

### 灵活运用标签和记分板的方法：由状态数决定

我们刚刚定义了标签是一种抽象的布尔值变量，而记分板是一种抽象的整数变量。既然二者用途类似，都是抽象的变量，那么何时使用记分板？何时使用标签？

在刚刚的众多记分板的例子中，我们看到标签在那些仅需两个状态，也就是`true`和`false`的状态的情况下，运行得很好。例如，在检测玩家是否站立的例子中：

```mcfunction showLineNumbers
tag @a remove isStanding
execute as @a at @s if entity @s[y=~1.6,dy=0.1] run tag @s add isStanding
```

这里，我们就只有两个状态：站立和不站立。这时候，可以完美地对应到`true`和`false`的情况。所以，如果标记只涉及到两个状态的时候，我们首选标签变量。

而如果涉及的状态大于 2 个，比如检测玩家站立潜行爬行睡觉，这里就涉及到 4 个状态，此时`true`和`false`是没有办法一一对应的，所以我们便只能寄希望于整数类型的记分板变量。

当然，只有两个状态的情况，记分板同样可以应对，这是因为在实际的编程中，`false`往往认为和`0`等价，而`true`往往认为和非`0`的值等价，常常设为`1`。但是，因为**记分板需要提前定义记分项，还必须要让追踪对象处于被追踪状态，这就难免增加了一些复杂度**；而标签则不需要提前定义，哪怕提前什么都没有定义过，`tag`目标选择器参数依然可以成功执行并检测。所以，我们才说两个状态的时候，通常首选标签。

此外，如果涉及的状态需要用到全局，比如地图是否解锁了某个区域，这时候我们就不能再依托要用到实体身上的标签了，此时还是用记分板的假名更合适（例如`data.areaUnlocked`=`0`/`1`）。

总而言之，**当涉及到实体本身的两种状态的变换时，用标签，其他情况用记分板**。

## 总结与练习

本节，我们介绍了检测分数的常用方法、记分板的一些运用实例和抽象出的变量概念。现在我们一起来回顾一下吧！

- **参数类型`integer range`**
  - 用于指代一个特定的值，或一个特定的范围。
  - 指代特定的值的时候，表示为`<值: int>`。
  - 指代大于等于某个值的时候，表示为`<最小值: int>..`。
  - 指代小于等于某个值的时候，表示为`..<最大值: int>`。
  - 指代在两个值之间的时候，表示为`<最小值: int>..<最大值: int>`。
  - 允许反选，在它们的表示前面加上一个`!`即可。
- **`scores`目标选择器参数**
  - 格式为`scores={<记分项: string>=<值: integer range>,...}`，判断实体在`记分项`上的分数是否满足`值`的要求。
  - `...`代表允许同时检测一个实体上多个记分项的分数。
- **`execute in score`子命令**
  - 语法 1：`<if|unless> score <目标: target> <记分项: string> <操作方法: compare operator> <源目标: target> <记分项: string> -> execute`
    - 当`目标`在其`记分项`上的分数和`源目标`在其`记分项`上的分数经过`操作方法`比较成立后，则检测通过。
    - `操作方法`允许的值为：`=`、`>`、`>=`、`<`、`<=`
  - 语法 2：`<if|unless> score <目标: target> <记分项: string> matches <范围: integer range> -> execute`
    - 当`目标`在`记分项`上的分数满足`范围`条件时，则检测通过。
- **记分板的实际应用**
  - 利用假名的性质和排序方法的特性，可以实现信息板，并按照特定变量条件将信息打印到记分板上。
  - 利用追踪对象命令`random`，可以实现抽奖机、随机对话等涉及到随机事件的特性。
  - 利用记分板的大范围整数类型，可以用于进行多状态标记，例如死亡状态、玩家站立状态等。
  - 利用记分板的数值特性，可以用于记录虚拟金币、经验等需要大范围数值的情况。并且利用分值可检测范围的特性，可以再基于此制作记分板商店。
  - 利用时间变换原理（1秒=20游戏刻），可以制作计时器。
  - 利用“玩家下线”的原理，可以用于解决多人情况下玩家退出重进的棘手问题。
    - 然而，“玩家下线”本身的问题也比较棘手，现在常用移除记分板再重建的方法来移除“玩家下线”的分数，而不是`reset *`。
  - 利用`@a`和`@e[type=player]`的筛选差异，还可以制作死亡榜。
  - 等等……
- **变量与数据库**
  - 变量是一种表示存储值或计算结果的抽象概念。数据库则认为是各种各样抽象的数据组成的集合。
  - 记分板的分数可以视作是一种整数型变量，标签可以视作是一种布尔值变量。
  - 对于数据库中的各类数据而言，“增删改查”是基本操作。
    - 对于记分板和标签的众多命令而言，都有非常明确的“增删改查”的原理存在。
  - 当涉及到实体本身的两种状态的变换时，用标签，其他情况用记分板。

:::info[练习 2.4-4]

1. 现在我们回顾练习 2.3-2 的第一个问题：  
   在地图《30 种死法 2》的第 17 关中，有一个进度要求玩家放下所有刷怪蛋。这个进度要获取的条件有 5 条：  
   （1）所给出的箱子（位于(-1,22,85)）被玩家拿空；  
   （2）检测不到任何掉落物存在（防止玩家扔出物品触发进度）；  
   （3）检测到存在骷髅；  
   （4）检测不到物品栏有骷髅刷怪蛋的玩家；  
   （5）该进度尚未获取；  
   （6）上一个进度已经获取，  
   在当时，我们忽略了（5）和（6）的条件，这是因为当时我们还不能实现类似的效果，但现在可以了。假设该进度对应的变量为`advancement.adv1`，上一个进度对应的变量为`advancement.adv0`，并且标记：`-1`=未解锁，`0`=已解锁但未获取，`1`=已获取。当符合所有条件时，执行命令`/say 恭喜你获取进度！`。试写出该命令。已知可供用于检测的空箱子位于(10,5,7)。
2. 在地图《冒险世界：筑梦》中，有一个跑酷小游戏。地图使用`time.timeline`记录跑酷时间，用`data.parkour`记录跑酷最佳成绩。试写出一条命令，破纪录后则更新最佳成绩。注意：记录应该是时间越短越好！
3. 在 Hypixel 的起床战争中，4v4v4v4 模式下设定了 14 人为开启游戏倒计时的最低人数阈值。试写 4 条命令，当人数大于等于 14 的时候，使`time.startCountdown`每刻减 1，当人数小于 14 的时候，将`time.startCountdown`复原回 400。
4. 在起床战争中，假定红队的床在(30,65,30)上，当床被破坏后则标记为红队的床被破坏。假定`data.redBedState`为标记红队床状态的变量，记`0`=被破坏，`1`=未被破坏，并且其初始值为`1`。写 2 条命令，当红队的床被破坏后公告全体玩家“§c红队的床已被破坏！”并标记红队的床为被破坏状态。
5. 在第 4 题的基础上，若一名带标签`teamRed`的玩家死亡后，并且红队的床处于破坏状态，则设置为被淘汰状态。假定标签`isEliminated`，当玩家拥有此标签时则代表被淘汰，反之则没有。试使用 3 条命令实现之。提示：如果该玩家已被淘汰，不必重复添加。
6. 假设接下来你要写的命令全部为每游戏刻执行一次。允许使用变量`time.tick`，该变量的初始值为`0`。试基于此变量，在 3 秒后对玩家说“Hello,world!”。
7. 若新进入服务器的玩家拥有标签`vip`，则全服公告“欢迎玩家 xxx 回到服务器”，自定义变量和记分板，用命令实现之。用`/say`实现公告效果。
8. 若玩家在一次跑酷中死亡超过 5 次，则公告“xxx 闯关失败”，自定义变量和记分板，用命令实现之。用`/say`实现公告效果。
9. 一个抽奖机，消耗一个泥土，有 0.01% 的概率抽出附魔金苹果，自定义变量和记分板，用命令实现之。
10. 试用命令检查处于死亡状态的人数，并输出到`data.deadPlayerAmount`上。
11. （难度较高，选做）现在假设你要做一个冰船竞速的小游戏，赛道成环，在赛道中有 3 个记录点：(-52,60,82)、(-4,60,76)、(-63,60,106)，玩家必须划船依次通过这 3 个记录点划 3 圈才算成功。允许使用记分板`boatRace`，试用命令写出你的思路。
12. （难度较高，选做）假设起床战争中有玩家在游戏中离开，重新进入后已是下一局，试分析如果什么也不做会导致什么问题？试用命令写出你的解决思路，允许额外定义变量。

:::
