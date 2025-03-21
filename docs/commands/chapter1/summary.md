---
sidebar_position: 100
---

# 第一章小结

至此，我们对命令基础概念的认识已经接近尾声。虽然命令当然远不止这些东西，但学习这些之后已经让你有了对命令的基本概念，在遇到新的命令的时候，这些基本概念可以帮助你快速地理解这些命令的用法。我们来回顾一下我们所学的内容：

## 命令的使用方法 命令参数

- 要使用命令，必须开启作弊。
- 命令一般都是以斜杠打头的。
- 在聊天栏里，输入一条命令并发送出去，就是执行这条命令。
- 在后续的命令学习中，我们要经常运用`/help`或查询 Minecraft Wiki 来了解一条命令的具体用法。查询文档是非常重要的技能！
- 绝大多数情况下，一条命令由它的主体和后面的参数组成，并由空格分隔。由尖括号`<>`所包裹的参数叫做必选参数，由方括号`[]`所包裹的参数叫做可选参数，而未被包裹的参数则按照原来的字面量进行填写，也是必选参数的一种。
- 对于参数`<名称: 类型>`或`[名称: 类型]`，`名称`表示这个参数最基本的描述，而`类型`则限制了这个参数可以填写的值。

## 命令参数的类型

虽然在第 1 节，我们给出了这张表，但当时的你对这张表并不一定印象深刻。现在回过头来看，相信你对它能够有全新的理解！

| `类型` | `类型`的中文翻译 | 意义 |
| --- | --- | --- |
| `int` | `整数` | 该参数可以传入数学意义上的整数。例：`1`、`0`、`-5`。 |
| `float` | `浮点数` | 该参数可以传入数学意义上的整数或小数。例：`1.0`、`-5.5`。 |
| `Boolean` | `布尔值` | 该参数可以传入`true`（真）或`false`（假）。 |
| `string` | `字符串` | 该参数可以传入由英文双（单）引号包裹的任意文本。例：`"awa"`、`"这是一个字符串"`。特殊地，如果字符串内没有空格、斜杠等可能产生歧义的内容，引号可以省略。 |
| `x y z` | `坐标` | 该参数可以传入一个坐标。例：`15 74 32`。 |
| `Block` | `方块` | 该参数可以传入一个允许的方块 ID。例：`grass_block`。 |
| `EntityType` | `实体` | 该参数可以传入一个允许的实体 ID。例：`zombie_pigman`。 |
| `Item` | `物品` | 该参数可以传入一个允许的物品 ID。例：`stick`。 |
| `target` | `目标` | 该参数可以传入一个代表玩家、实体的目标选择器参数，或者直接传入玩家名。例：`YZBWDLT`、`@e[type=zombie]`。 |

### 坐标

- 坐标反映一个物体所处的位置，在 Minecraft 中用三个数字表示。玩家、生物的坐标，代表其脚部所处的位置。
- 由三个确定的数字组成的坐标，叫做绝对坐标。
- 用波浪线和一个数字来表示相对位置的坐标，叫做相对坐标。相对坐标的表示方法为`~(+x) ~(+y) ~(+z)`，并且在特定情况下可省略特定的符号。相对坐标可以和绝对坐标混用，但不得省略空格。
- 用折线和一个数字来表示相对于朝向位置的坐标，叫做局部坐标。局部坐标的表示方法为`^(+左) ^(+上) ^(+前)`，但是不可与相对坐标、局部坐标混用。
- 一个接受`x y z`类型的命令参数，可以填入绝对坐标、相对坐标或局部坐标。

### 实体

- 实体包括在 Minecraft 中所有动态的、移动中的对象。简单来说，实体是生物与部分特殊动态移动对象的集合，实体就是广义概念上的生物。
- 实体 ID 是为了在代码中表示这个实体的种类而设置的唯一标识符。绝大部分的实体 ID 都是其英文名改写来的，即：全小写后再将中间的空格改为下划线。但是，少数实体因为历史原因，其 ID 与其英文名并不完全一致。

### 物品

- 命令中的物品概念，专门指代物品栏中的物品。
- 物品 ID 与实体 ID 类似，都是为了在代码中表示这个物品的种类而设置的唯一标识符。绝大部分的物品 ID 也都是其英文名改写来的。少数物品因为历史原因，其 ID 与其英文名并不完全一致。

### 方块

- 方块，是一个与实体相对的定义，即那些不太动态的，不可移动的世界中的东西。
- 方块 ID，与物品 ID 和实体 ID 类似，都是为了在代码中表示这个方块的种类而设置的唯一标识符。它的一般命名原则与另外二者一致。一般来说，方块 ID 与方块类的物品的 ID 是一致的，但仍有一些特例。因为历史原因，不规则的方块 ID 较多。

### 碰撞箱 两点确定长方体区域原理

- **碰撞箱**：每个实体都拥有一个大小不同的碰撞箱。碰撞箱是一个长宽相等，高度独立于长宽的长方体。实体的许多判定经常依赖于碰撞箱，例如 1.8 格高的玩家穿不过 1.5 格高的洞口。在命令中，只要碰撞箱有和检测区域重叠的部分，就视为检测通过。
- **两点确定长方体区域原理**：两个坐标可以确定一个各边均与 x,y,z 坐标平行的长方体区域。

## 本章所学习的新命令

| 命令 | 含义 | 备注 |
| --- | --- | --- |
| `/help` | 显示第 1 页的命令帮助 | |
| `/help <页码: int>` | 显示第`页码`页的命令帮助 | |
| `/tp <目标: target> <位置: x y z>` | 将`目标`传送到`位置` | 扩展语法 |
| `/summon <实体：EntityType>` | 生成`实体` | 不能生成被设置为不可生成的实体 |
| `/give <玩家: target> <物品: Item>` | 给予`玩家` 1 个`物品` | `玩家`仅限玩家类实体；能够给予创造模式物品栏中所不存在的物品，但仍然有部分物品不能给予 |
| `/setblock <位置：x y z> <方块：Block>` | 在`位置`放置`方块` | |
| `/testfor <目标: target>` | 检测`目标`是否存在 | |

## 本章所学习的目标选择器

- 目标选择器是用于在无需指定确切的玩家名称的情况下，在命令中选择任意玩家与实体的基本工具。
- 大量的命令中，都含有所需类型为`target`的参数，因此目标选择器在命令中极为常用。
- 目标选择器由目标选择器变量（必选）和目标选择器参数（可选）组成。
- 目标选择器变量用于大体上地选中实体，写法为`@变量`，具体如下表所示：

| 目标选择器变量 | 取自于 | 意义 | 检测死亡实体？ | 备注 |
| :---: | --- | --- | :---: | --- |
| `@a` | **A**ll Players | 选中所有玩家 | 是 | 禁止使用`type`指定实体类型 |
| `@e` | **E**ntities | 选中所有实体 | 否 | 要注意参数是否限定玩家类型（`<player: target>`） |
| `@p` | Nearest **P**layer | 选中最近的玩家 | 否 | 禁止使用`type`指定实体类型；用`x`、`y`、`z`指定基准检测坐标 |
| `@r` | **R**andom Player | 选中随机的玩家 | 否 | |
| `@s` | **S**elf | 选中执行者自身 | 是 | |

- 目标选择器参数用于在选中的实体的基础上进行进一步的筛选，写法为`@变量[参数1=值1,参数2=值2,...]`，本章所学习的为基础用法，具体如下表所示：

| 目标选择器参数（`参数=值`） | 取自于 | 意义 | 分类依据 | 备注 |
| :---: | --- | --- | :---: | --- |
| `x=<值: x>` | **x** | 目标选择器原点（参考位置）的 x 坐标 | 坐标 | 一般结合`r`、`rm`、`dx`、`dy`、`dz`使用，默认为执行者位置 |
| `y=<值: y>` | **y** | 目标选择器原点（参考位置）的 y 坐标 | 坐标 | 一般结合`r`、`rm`、`dx`、`dy`、`dz`使用，默认为执行者位置 |
| `z=<值: z>` | **z** | 目标选择器原点（参考位置）的 z 坐标 | 坐标 | 一般结合`r`、`rm`、`dx`、`dy`、`dz`使用，默认为执行者位置 |
| `r=<值: float>` | **R**adius | 距离目标选择器原点`值`以内的实体 | 坐标 | 必须满足`r`>`rm`，默认为无穷大[^1] |
| `rm=<值: float>` | **M**inimum **R**adius | 距离目标选择器原点`值`以外的实体 | 坐标 | 必须满足`r`>`rm`，默认为 0 |
| `dx=<值: float>` | **D**elta **X** | x 坐标满足`x`~`x`+`dx`的实体 | 坐标 | 默认为 0 |
| `dy=<值: float>` | **D**elta **Y** | y 坐标满足`y`~`y`+`dy`的实体 | 坐标 | 默认为 0 |
| `dz=<值: float>` | **D**elta **Z** | z 坐标满足`z`~`z`+`dz`的实体 | 坐标 | 默认为 0 |
| `type=<类型: EntityType>` | **Type** | 类型为`类型`的实体 | 实体数据 | 允许反选（`type=!...`） |
| `name=<名称: string>` | **Name** | 名称为`名称`的实体 | 实体数据 | 允许反选（`name=!...`），可选中特定名称的掉落物（*慎用此特性*） |
| `hasitem={item=<物品: Item>}` | **Has Item** | 拥有物品`物品`的实体 | 实体数据 | |
| `c=<最大数量: int>` | **C**ount | 至多从近到远选中**至多**`最大数量`个符合条件的实体 | 其他 | 可以指定为负数，并选中从远到近**至多**\|`最大数量`\|个实体 |

## 思考题答案

:::info[思考 1.2-1]

这是因为如果不输入为空格，例如`~256~`，那么 Minecraft 会将`~256`看作为是`x`的值，而不是将`~`看作`x`，`256`看作`y`。这样，`x y z`就少了一个坐标`z`，而这又是一个必选参数，所以这种情况下 Minecraft 就会报错。

:::

## 练习答案

:::info[练习 1.1 答案]

1. `/help 17`
2. `/help difficulty`；`/difficulty`的用法为`/difficulty <难度>`，指定难度的参数即可选定世界所处的难度。

:::

:::info[练习 1.2 答案]

1. `/tp 11 45 14`
2. `/tp ~5~~5`
3. `/tp ~42~~-17`
4. `/tp ~ -64 ~`
5. `/tp ~~-1~`
6. `/tp ^^5^`，这样的传送和相对坐标的区别在于：假如我们视角本身朝上，那么执行`/tp ^^5^`将变为将玩家向后传送 5 格，而`/tp ~~5~`是向上传送 5 格。换言之，采用局部坐标的“上”是相对于玩家视角的上，而采用相对坐标的“上”则是绝对的上。
7. 埋到土里 1 格。

:::

:::info[练习 1.3 答案]

1. ID 为`lightning_bolt`，生成闪电束为`/summon ligtning_bolt`
2. ID 为`end_crystal`，生成末地水晶为`/summon end_crystal`
3. `/summon command_block_minecart`

:::

:::info[练习 1.4 答案]

1. `/give "你的昵称" diamond`
2. `/give "你的昵称" barrier`
3. `/give "你的昵称" diamond_block`

:::

:::info[练习 1.5 答案]

1. `/setblock ~~~ grass_block`
2. `/setblock ^^^5 dirt`
3. `/setblock ~~-1~ air`

:::

:::info[练习 1.6 答案]

1. `/tp Steve ~ 500 ~`
2. `/testfor @a`，当服务器没人时，或刚进入单人存档之初，玩家未加载时，执行该命令会检测失败。
3. `/testfor @e`
4. `/testfor @s[y=~1.6,dy=0.1]`。这条命令将检测执行者上方 1.6~1.7 格是否有执行者自身。潜行时，玩家的高度仅为 1.4 格，因此该命令将执行失败；而站立时，玩家的高度为 1.8 格，所以该命令执行成功。之所以设置为 1.6，主要是防止处于临界值（例如 1.49）时会出现问题。
5. `/testfor @e[x=0,y=-60,z=0,rm=5,r=20]`
6. 我们假设(0,0,0)~(6,6,6)存在一个空心火柴盒，这样，里面的实体就可以用`/testfor @e[x=1,y=1,z=1,dx=4,dy=4,dz=4]`检测。牛可以用`/testfor @e[x=1,y=1,z=1,dx=4,dy=4,dz=4,type=cow]`检测。
7. `/tp @e[type=!player] ~~10~`
8. `/tp @a[name=!"你的昵称"] ~~10~`
9. `/testfor @a[hasitem={item=tnt}]`

:::
