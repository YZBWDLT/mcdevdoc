# 附录：全部命令汇总

收录所有命令，并给出对应课时。其中，部分内容并未在模块 1 介绍，请阅读本篇文档的初学者注意甄别，如果需要，请学习相关知识。

:::info[本文更新时间]

本文于 2025 年 4 月 15 日更新，中国版最新版本为 1.20.50，国际版最新版本为 1.21.70。

:::

## 超高频命令

---
---

### `/execute`

按照特定的命令上下文执行命令，并检测条件。

`/execute`除了`run`子命令之外，通用语法为`/execute <子命令> -> execute`。从左到右解析。修饰子命令的`-> execute`是必选参数。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.3 命令执行原理 `/execute`](../chapter2/section3/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/execute) |

---

```text
run <命令: command>
```

**`run`子命令**。按照修饰子命令所给定的上下文执行`命令`。

---

```text
as <源目标: target> -> execute
```

**修饰子命令**。更改执行者为`源目标`。

---

```text
at <源目标: target> -> execute
```

**修饰子命令**。更改执行环境参数（位置、朝向、维度）为`源目标`的环境参数。

---

```text
positioned as <源目标: target> -> execute
```

**修饰子命令**。更改命令的执行位置为`源目标`的位置。

---

```text
positioned <位置: x y z> -> execute
```

**修饰子命令**。更改命令的执行位置为`位置`。

---

```text
align <坐标轴: string> -> execute
```

**修饰子命令**。将`坐标轴`对应的执行位置坐标向下取整。

`x`、`y`、`z`各只能出现一次。修正的位置非方块中心，而为方块角落。

---

```text
anchored <eyes|feet> -> execute
```

**修饰子命令**。更改执行位置为执行者的脚部或眼部的位置。

---

```text
facing <位置: x y z> -> execute
```

**修饰子命令**。更改执行朝向为面向`位置`。

---

```text
facing entity <源目标: target> <eyes|feet> -> execute
```

**修饰子命令**。更改执行朝向为面向`源目标`的眼睛或脚部。

---

```text
rotated <y旋转: value> <x旋转: value> -> execute
```

**修饰子命令**。更改执行朝向为指定的旋转角度。

---

```text
rotated as <源目标: target> -> execute
```

**修饰子命令**。更改执行朝向为`源目标`的朝向。

---

```text
in <维度: Dimension> -> execute
```

**修饰子命令**。更改执行维度为`维度`。

不同维度的坐标应予以变换。

---

```text
<if|unless> entity <目标: target> -> execute
```

**条件子命令**。检查`目标`是否存在。

---

```text
<if|unless> block <位置: x y z> <方块: Block> [方块状态: block states] -> execute
```

**条件子命令**。检查`位置`是否为`方块状态`的`方块`。

`方块状态`的默认值为对应方块默认的方块状态。

---

```text
<if|unless> blocks <起点: x y z> <终点: x y z> <目标点: x y z> <扫描模式: all|masked> -> execute
```

**条件子命令**。检查`起点`与`终点`确定的长方体源区域的方块是否与`目标点`确定的长方体目标区域一致。扫描模式为`all`时，扫描所有方块；为`masked`时，只检查源区域的非空气方块与目标区域是否一致。

会同时检查容器、告示牌等特定方块的数据是否完全一致。

---

```text
<if|unless> score <目标: target> <记分项: string> <操作方法: compare operator> <源目标: target> <记分项: string> -> execute
```

**条件子命令**。当`目标`在其`记分项`上的分数和`源目标`在其`记分项`上的分数经过`操作方法`比较成立后，则检测通过。

`操作方法`允许的值为：`=`、`>`、`>=`、`<`、`<=`。

---

```text
<if|unless> score <目标: target> <记分项: string> matches <范围: integer range> -> execute
```

**条件子命令**。当`目标`在`记分项`上的分数满足`范围`条件时，则检测通过。

---
---

### `/function`

执行函数。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | （模块 2）[2.1 函数](../../addons_simple/chapter2/section1/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/function) |

---

```text
/function <路径: filepath>
```

执行`路径`的函数文件。

`路径`是不带`functions/`和后缀的文件名。

---
---

### `/scoreboard`

管理记分项和追踪对象。其中，`玩家: target`可以是不存在的玩家，可以指定为`*`以代表所有追踪对象。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.4 标签与计算命令](../chapter2/section4/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/scoreboard) |

---

```text
/scoreboard objectives add <记分项: string> dummy [显示名称: string]
```

**记分项命令**。添加显示为`显示名称`的`记分项`记分项。

`显示名称`的默认值为`记分项`。

---

```text
/scoreboard objectives remove <记分项: string>
```

**记分项命令**。移除`记分项`记分项。

---

```text
/scoreboard objectives setdisplay <list|sidebar> [记分项: string] [ascending|descending]
```

**记分项命令**。在玩家列表（`list`）或侧边栏（`sidebar`）按升序（`ascending`）或降序（`descending`）显示`记分项`记分项。

`记分项`为空时，清空对应显示位置。`ascending|descending`的默认值为`descending`。

---

```text
/scoreboard objectives setdisplay belowname [记分项: string]
```

**记分项命令**。在玩家名牌下显示`记分项`记分项。

`记分项`为空时，清空对应显示位置。

只能显示真实玩家的分数。

---

```text
/scoreboard objectives list
```

**记分项命令**。在聊天栏列举所有记分项的信息。

会受到游戏规则`sendCommandFeedBack`的影响。

---

```text
/scoreboard players set <玩家: target> <记分项: string> <数值: int>
```

**追踪对象命令**。设置`玩家`在`记分项`上的分数为`数值`。

---

```text
/scoreboard players add <玩家: target> <记分项: string> <数值: int>
```

**追踪对象命令**。为`玩家`在`记分项`上的分数加`数值`分。

---

```text
/scoreboard players remove <玩家: target> <记分项: string> <数值: int>
```

**追踪对象命令**。为`玩家`在`记分项`上的分数减`数值`分。

等同于`add`一个负的`数值`分。

---

```text
/scoreboard players random <玩家: target> <记分项: string> <最小值: int> <最大值: int>
```

**追踪对象命令**。为`玩家`在`记分项`上的分数在`最小值`到`最大值`之间随机取值。含两端。

---

```text
/scoreboard players operation <目标名称: target> <目标记分项: string> <操作: operator> <选择器: target> <记分项: string>
```

**追踪对象命令**。将两个分数进行运算。

所有`<操作: operator>`可用的操作符及含义如下表所示。下表中，分数 1 是`<目标名称: target> <目标记分项: string>`对应的分数（操作符左边），而分数 2 是`<选择器: target> <记分项: string>`对应的分数（操作符右边）。

| 运算符 | 含义 | 示例 | 备注 |
| :---: | --- | --- | --- |
| `=` | 将右边的值赋给左边 | 分数 1 = 分数 2 | |
| `+=` | 将左加右赋给左边 | 分数 1 = 分数 1 + 分数 2 | |
| `-=` | 将左减右赋给左边 | 分数 1 = 分数 1 - 分数 2 | |
| `*=` | 将左乘右赋给左边 | 分数 1 = 分数 1 * 分数 2 | |
| `/=` | 将左除以右赋给左边 | 分数 1 = 分数 1 / 分数 2 | 分数 2 为 0 时，什么也不发生；结果向零取整 |
| `%=` | 将左除以右的模赋给左边 | 分数 1 = 分数 1 % 分数 2 | 分数 2 为 0 时，什么也不发生 |
| `>` | 左右取大赋给左边 | 分数 1 = max(分数 1, 分数 2) | |
| `<` | 左右取小赋给左边 | 分数 1 = min(分数 1, 分数 2) | |
| `><` | 左右分数对调 | 分数 1和分数 2 对调 | 唯一能影响分数 2 的运算 |

---

```text
/scoreboard players reset <玩家: target> [记分项: string]
```

**追踪对象命令**。移除`玩家`在`记分项`上的分数。

`记分项`为空时，移除`玩家`在所有记分项上的分数。

---

```text
/scoreboard players list [玩家名称: target]
```

**追踪对象命令**。返回`玩家名称`在所有记分项上的分数。

`玩家名称`为空时，则返回全部追踪对象。

会受到游戏规则`sendCommandFeedBack`的影响。

---

```text
/scoreboard players test <玩家: target> <记分项: string> <最小值: wildcard int> [最大值: wildcard int]
```

**追踪对象命令**。检测`玩家`在`记分项`上的分数是否在`最小值`到`最大值`之间。含两端，*不常用*。

`最大值`的默认值为`*`。

---
---

### `/summon`

在特定位置生成特定名称、特定生成事件的实体。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/summon) |

---

```text
/summon <实体: EntityType> <名称: string> [生成位置: x y z]
```

在`生成位置`生成名为`名称`的`实体`。

`生成位置`的默认值为执行位置。

---

```text
/summon <实体: EntityType> [生成位置: x y z] [y旋转: value] [x旋转: value] [生成事件: string] [名称: string]
```

在`生成位置`生成名为`名称`的特定旋转角度的`实体`。

`生成位置`的默认值为执行位置。`y旋转`和`x旋转`的默认值为执行朝向。`生成事件`的默认值为`minecraft:entity_spawned`。名称的默认值为空。

---

```text
/summon <实体: EntityType> [生成位置: x y z] facing <面向实体: target> [生成事件: string] [名称: string]
```

在`生成位置`生成名为`名称`的面向`面向实体`的`实体`。

`生成位置`的默认值为执行位置。`生成事件`的默认值为`minecraft:entity_spawned`。名称的默认值为空。

---

```text
/summon <实体: EntityType> [生成位置: x y z] facing <面向位置: x y z> [生成事件: string] [名称: string]
```

在`生成位置`生成名为`名称`的面向`面向位置`的`实体`。

`生成位置`的默认值为执行位置。`生成事件`的默认值为`minecraft:entity_spawned`。名称的默认值为空。

---
---

### `/tag`

对实体的标签进行操作。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.4 标签与计算命令](../chapter2/section4/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/tag) |

---

```text
/tag <实体: target> add <名称: string>
```

为`实体`添加名为`名称`的标签。

---

```text
/tag <实体: target> remove <名称: string>
```

为`实体`移除名为`名称`的标签。

---

```text
/tag <实体: target> list
```

在聊天栏返回`实体`的所有标签。

会受到游戏规则`sendCommandFeedBack`的影响。

---
---

### `/tellraw`

对特定玩家的聊天栏发送原始 JSON 文本。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.9 特效命令](../chapter2/section9/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/tellraw) |

---

```text
/tellraw <玩家: target> <原始JSON文本: json>
```

对`玩家`在聊天栏输出`原始JSON文本`。

`原始JSON文本`必须是有效的文本组件。

## 高频命令

---
---

### `/scriptevent`

配合 ScriptAPI 使用，对`system`类发送一个`scriptEventReceive`的后事件。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | （模块 5）[3.4 命令`/scriptevent`](../../sapi/chapter3/section4) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/scriptevent) |

---

```text
/scriptevent <消息ID: string> <消息: message>
```

向脚本系统发送一个消息，拥有`消息ID`的 ID 和`消息`的消息属性。

返回`ScriptEventCommandMessageAfterEvent`事件，脚本中可调用`id`属性获取命令中的`消息ID`，调用`message`属性获取命令中的`消息`。

---
---

### `/tp`（或`/teleport`）

传送实体到特定位置。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.2 简单命令](../chapter2/section2#传送玩家的命令tp或teleport) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/teleport) |

---

```text
/tp <位置: target>
```

将执行者传送到`位置`。

---

```text
/tp <位置: x y z> [检查卡墙: Boolean]
```

将执行者传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

---

```text
/tp <位置: x y z> [y旋转: value] [x旋转: value] [检查卡墙: Boolean]
```

将执行者按特定旋转角度传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

---

```text
/tp <位置: x y z> facing <面向实体: target> [检查卡墙: Boolean]
```

将执行者按面向`面向实体`的朝向传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

---

```text
/tp <位置: x y z> facing <面向坐标: x y z> [检查卡墙: Boolean]
```

将执行者按面向`面向坐标`的朝向传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

---

```text
/tp <目标: target> <位置: target> [检查卡墙: Boolean]
```

将`目标`传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

---

```text
/tp <目标: target> <位置: x y z> [检查卡墙: Boolean]
```

将`目标`传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

---

```text
/tp <目标: target> <位置: x y z> [y旋转: value] [x旋转: value] [检查卡墙: Boolean]
```

将`目标`按特定旋转角度传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

---

```text
/tp <目标: target> <位置: x y z> facing <面向实体: target> [检查卡墙: Boolean]
```

将`目标`按面向`面向实体`的朝向传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

---

```text
/tp <目标: target> <位置: x y z> facing <面向坐标: x y z> [检查卡墙: Boolean]
```

将`目标`按面向`面向坐标`的朝向传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

---
---

### `/titleraw`

对特定玩家发送原始 JSON 文本的标题。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/titleraw) |

---

```text
/titleraw <玩家: target> <标题位置: TitleRawSet> <原始JSON标题文本: json>
```

对`玩家`在`标题位置`显示`原始JSON标题文本`。

`标题位置`可选值为：

- `title`：主标题
- `subtitle`：副标题
- `actionbar`：快捷栏标题

---

```text
/titleraw <玩家: target> clear
```

清空`玩家`的标题。

---

```text
/titleraw <玩家: target> reset
```

重置`玩家`的标题的淡入、停留和淡出时间。

---

```text
/titleraw <玩家: target> times <淡入: int> <停留: int> <淡出: int>
```

将`玩家`的标题时间更改为淡入`淡入`游戏刻、停留`停留`游戏刻、淡出`淡出`游戏刻。

---
---

### `/playsound`

对玩家播放音效。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/playsound) |

---

```text
/playsound <音效: string> [玩家: target] [位置: x y z] [音量: float] [音调: float] [最低音量: float]
```

对`玩家`在`位置`播放音量为`音量`、音调为`音调`、（可闻范围内）最低音量为`最低音量`、音效 ID 为`音效`的音效。

`玩家`的默认值为执行者。`位置`的默认值为执行位置。`音量`的默认值为`1`。`音调`的默认值为`1`。`最低音量`的默认值为`0`。

因位置限制，故常与`/execute`搭配使用。

---
---

### `/particle`

释放粒子。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/particle) |

---

```text
/particle <粒子效果: string> [位置: x y z]
```

在`位置`释放`粒子`。

`位置`的默认值为执行位置。

部分粒子可能会因为缺少上下文信息而不能正确释放。

---
---

### `/setblock`

在一个特定位置放置方块。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.8 方块操作命令](../chapter2/section8) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/setblock) |

---

```text
/setblock <位置: x y z> <方块: Block> <方块状态: block states> [replace|destroy|keep]
```

在`位置`放置`方块状态`的`方块`，并选定*旧方块处理方式*（`replace|destroy|keep`）。

*旧方块处理方式*的默认值为`replace`，可选值为：

- `replace`：替换旧方块
- `destroy`：破坏旧方块后放置新方块
- `keep`：保留旧方块

---

```text
/setblock <位置: x y z> <方块: Block> [replace|destroy|keep]
```

在`位置`放置`方块`，并选定*旧方块处理方式*（`replace|destroy|keep`）。

*旧方块处理方式*的默认值为`replace`，可选值为：

- `replace`：替换旧方块
- `destroy`：破坏旧方块后放置新方块
- `keep`：保留旧方块

---
---

### `/clear`

清除玩家的物品。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.2 简单命令](../chapter2/section2#清除物品的命令clear) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/clear) |

---

```text
/clear <玩家: target> <物品: Item> [数据值: int] [最大数量: int]
```

清除`玩家`至多`最大数量`个数据值为`数据值`的`物品`。

`数据值`的默认值为`-1`。`最大数量`的默认值为`-1`。

`最大数量`指定为`0`时，该命令用于检测玩家是否拥有物品。

---
---

### `/gamerule`

查询或更改游戏规则。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.5 世界操作命令](../chapter2/section5) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/gamerule) |

---

```text
/gamerule
```

在聊天栏返回所有游戏规则的值。

会受到游戏规则`sendCommandFeedBack`的影响。

---

```text
/gamerule <规则: BoolGameRule> [值: Boolean]
```

将布尔值型`规则`设置为`值`。

`值`为空时，改为查询`规则`。

会受到游戏规则`sendCommandFeedBack`的影响。

---

```text
/gamerule <规则: IntGameRule> [值: int]
```

将整数型`规则`设置为`值`。

`值`为空时，改为查询`规则`。

会受到游戏规则`sendCommandFeedBack`的影响。

---
---

### `/structure`

保存、加载或删除一个结构。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [3.3 结构方块与结构空位](../chapter3/section3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/structure) |

---

```text
/structure save <名称: string> <起点: x y z> <终点: x y z> [存储模式: StructureSaveMode]
```

将`起点`和`终点`组成的源区域以`名称`保存。可选择存储模式（`存储模式`）。

`存储模式`的默认值为`memory`，可选值为：

- `memory`：保存在内存中，在*游戏关闭或存档关闭*[^1]后销毁。
- `disk`：保存在硬盘中。

[^1]: 有待验证。

---

```text
/structure save <名称: string> <起点: x y z> <终点: x y z> [包含实体: Boolean] [存储模式: StructureSaveMode] [包含方块: Boolean]
```

将`起点`和`终点`组成的源区域以`名称`保存。可选择存储模式（`存储模式`）、结构内是否含有实体（`包含实体`）、结构内是否含有方块（`包含方块`）。

`存储模式`的默认值为`memory`，可选值为：

- `memory`：保存在内存中，在*游戏关闭或存档关闭*[^1]后销毁。
- `disk`：保存在硬盘中。

`包含实体`的默认值为`true`。`包含方块`的默认值为`true`。

---

```text
/structure load <名称: string> <目的地: x y z> [旋转: Rotation] [镜像: Mirror] [包含实体: Boolean] [包含方块: Boolean] [含水: Boolean] [完整度: float] [种子: string]
```

将名为`名称`的结构在`目的地`处加载。可选择顺时针旋转加载（`旋转`）、沿 x 或 z 轴镜像加载（`镜像`）、是否加载结构内的实体（`包含实体`）、是否加载结构内的方块（`包含方块`）、是否含水[^2]（`含水`）、按照多大的完整度加载（`完整度`）、以及在完整度低于 100% 时，通过什么样的种子随机加载（`种子`）。

[^2]: 需要验证该参数的运行方式。

`旋转`的默认值为`0_degree`，可选值为：

- `0_degree`：不旋转加载结构。
- `90_degrees`：顺时针 90° 加载结构。
- `180_degrees`：顺时针 180° 加载结构。
- `270_degrees`：顺时针 270° 加载结构。

`镜像`的默认值为`none`，可选值为：

- `none`：不沿 x 轴或 z 轴镜像加载结构。
- `x`：沿 x 轴镜像加载结构。
- `z`：沿 z 轴镜像加载结构。
- `xz`：同时沿 x 和 z 轴镜像加载结构。

`包含实体`的默认值为`true`。`包含方块`的默认值为`true`。`含水`的默认值为`false`。`完整度`的默认值为`100`。`种子`为空时，随机取值。

---

```text
/structure load <名称: string> <目的地: x y z> [旋转: Rotation] [镜像: Mirror] [动画模式: StructureAnimationMode] [动画秒数: float] [包含实体: Boolean] [包含方块: Boolean] [含水: Boolean] [完整度: float] [种子: string]
```

将名为`名称`的结构在`目的地`处加载。可选择顺时针旋转加载（`旋转`）、沿 x 或 z 轴镜像加载（`镜像`）、按照何种动画加载（`动画模式`和`动画秒数`）、是否加载结构内的实体（`包含实体`）、是否加载结构内的方块（`包含方块`）、是否含水[^2]（`含水`）、按照多大的完整度加载（`完整度`）、以及在完整度低于 100% 时，通过什么样的种子随机加载（`种子`）。

`旋转`的默认值为`0_degree`，可选值为：

- `0_degree`：不旋转加载结构。
- `90_degrees`：顺时针 90° 加载结构。
- `180_degrees`：顺时针 180° 加载结构。
- `270_degrees`：顺时针 270° 加载结构。

`镜像`的默认值为`none`，可选值为：

- `none`：不沿 x 轴或 z 轴镜像加载结构。
- `x`：沿 x 轴镜像加载结构。
- `z`：沿 z 轴镜像加载结构。
- `xz`：同时沿 x 和 z 轴镜像加载结构。

`动画模式`对应的参数若指定为布尔值，则使用上一个语法。可选值为：

- `block_by_block`：逐个方块加载。
- `layer_by_layer`：逐层加载。

`包含实体`的默认值为`true`。`包含方块`的默认值为`true`。`动画秒数`的默认值为？[^3]。`含水`的默认值为`false`。`完整度`的默认值为`100`。`种子`为空时，随机取值。

[^3]: 有待验证。

---

```text
/structure delete <名称: string>
```

删除名为`名称`的结构。

---
---

### `/clone`

将一个区域的方块复制到另一个区域。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.8 方块操作命令](../chapter2/section8) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/clone) |

---

```text
/clone <起点: x y z> <终点: x y z> <目的地: x y z> [过滤模式: MaskMode] [复制模式: CloneMode]
```

将从`起点`到`终点`组成的源区域复制到`目的地`决定的目标区域。可选择按照特定的过滤模式筛选要复制的方块（`过滤模式`），以及如何进行复制（`复制模式`）。

`过滤模式`的默认值为`replace`，可选值为：

- `masked`：将源区域的非空气方块复制到目标区域。
- `replace`：将源区域的所有方块复制到目标区域。

`复制模式`的默认值为`normal`，可选值为：

- `force`：无视源区域和目标区域的重叠复制。
- `move`：将源区域复制后全部替换为空气。
- `normal`：正常复制。

---

```text
/clone <起点: x y z> <终点: x y z> <目的地: x y z> filtered <复制模式: CloneMode> <方块: Block> [方块状态: block states]
```

将从`起点`到`终点`组成的源区域的`方块状态`的`方块`复制到`目的地`决定的目标区域。可选择按照如何进行复制（`复制模式`）。

`复制模式`的默认值为`normal`，可选值为：

- `force`：无视源区域和目标区域的重叠复制。
- `move`：将源区域复制后全部替换为空气。
- `normal`：正常复制。

`方块状态`的默认值为对应方块默认的方块状态。

---
---

### `/event`

触发一个实体的生成事件。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/event) |

---

```text
/event entity <目标: target> <生成事件: string>
```

使`目标`触发`生成事件`。

`生成事件`是由实体行为文件（SE 文件）所定义的`events`的键名。

---
---

### `/camera`

对玩家的相机填充颜色，或设置玩家的相机视角。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/camera) |

---

```text
camera <玩家: target> clear
```

清除`玩家`的自定义相机。

---

```text
camera <玩家: target> fade [渐变时间] [颜色]
```

使`玩家`的自定义相机按照`渐变时间`的要求渐变到`颜色`上。

`渐变时间`和`颜色`可任意缺少一个或若干个，但顺序上必须是`渐变时间`在前，`颜色`在后。对应关系如下表所示。

| 完整语法 | 简写语法 | 含义 |
| --- | :---: | --- |
| `color <红: int> <绿: int> <蓝: int>` | `[颜色]` | 将相机颜色设置为 RGB 三原色按照不同强度（`红`、`绿`、`蓝`）组合后的颜色 |
| `time <淡入秒数: float> <持续秒数: float> <淡出秒数: float>` | `[渐变时间]` | 将相机设置为淡入`淡入秒数`秒、持续`持续秒数`秒、淡出`淡出秒数`秒 |

`[渐变时间]`的默认值为`time 1.5 0 1.5`[^4]。`[颜色]`的默认值为`color 0 0 0`（黑色）。

[^4]: 缺少资料。

---

```text
camera <玩家: target> set <预设: string>
```

:::warning[版本适用性警告]

`minecraft:follow_orbit`预设仅限 1.21.40+ 版本可用，`minecraft:fixed_boom`预设仅限 1.21.70+ 版本可用。

:::

设置`玩家`的自定义相机为`预设`。可用预设为：

- `minecraft:first_person`：第一人称
- `minecraft:third_person`：第三人称背面
- `minecraft:third_person_front`：第三人称正面
- `minecraft:follow_orbit`：轨道相机
- `minecraft:fixed_boom`：轨道相机，锁定视角
- `minecraft:free`：自由视角

---

```text
camera <玩家: target> set minecraft:free [缓动] [位置] [朝向]
```

**仅限`minecraft:free`预设**。设置`玩家`的自由相机按照特定的`缓动`动画移动到`位置`和`朝向`。

`缓动`、`位置`和`颜色`可任意缺少一个或若干个，但顺序上必须是`缓动`在前，`位置`其次，`颜色`在后。对应关系如下表所示。

| 完整语法 | 简写语法 | 含义 |
| --- | :---: | --- |
| `ease <缓动时间: float> <缓动类型: Easing>` | `[缓动]` | 将玩家的相机按照`缓动类型`决定的运镜方式，在`缓动时间`秒内将玩家的相机从起点移动到终点 |
| `pos <位置: x y z>` | `[位置]` | 玩家的相机移动到的`位置` |
| `facing <面向实体: target>`或`facing <面向坐标: x y z>`或`rot <x旋转: value> <y旋转: value>` | `[朝向]` | 玩家的相机的朝向 |

`[缓变]`为空时，直接切换视角。`[位置]`的默认值为`pos 0 0 0`[^4]。`[朝向]`的默认值为`rot 0 0`[^4]。

`Easing`类型的可选值详见 Wiki。

---

```text
camera <玩家: target> set <预设: string> [朝向] [视角偏移] [实体偏移]
```

:::warning[版本适用性警告]

`minecraft:follow_orbit`预设仅限 1.21.40+ 版本可用，`minecraft:fixed_boom`预设仅限 1.21.70+ 版本可用。

:::

设置玩家的轨道相机为特定`朝向`，同时设置相机相对玩家位置的偏移为`实体偏移`，相对玩家视角的偏移为`视角偏移`。

`预设`仅限设置为`minecraft:follow_orbit`或`minecraft:fixed_boom`时有效。

`朝向`、`视角偏移`和`实体偏移`可任意缺少一个或若干个，但顺序上必须是`朝向`在前，`视角偏移`其次，`实体偏移`在后。对应关系如下表所示。

| 完整语法 | 简写语法 | 含义 |
| --- | :---: | --- |
| `rot <x旋转: value> <y旋转: value>` | `[朝向]` | 设置相机的旋转角度 |
| `entity_offset <x实体偏移: float> <y实体偏移: float> <z实体偏移: float>` | `[实体偏移]` | 相机焦点相对于玩家位置的偏移 |
| `view_offset <x视角偏移: float> <y视角偏移: float>` | `[视角偏移]` | 相机焦点相对于玩家视角的偏移 |

`[朝向]`的默认值为`rot 0 0`。`[实体偏移]`为空时，不改变位置偏移。`[视角偏移]`为空时，不改变视角偏移。

---

```text
camera <玩家: target> target_entity <实体: target> [实体中心偏移]
```

:::warning[版本适用性警告]

聚焦实体语法仅限 1.21.60+ 版本可用。

:::

当`玩家`使用自由视角相机（`minecraft:free`）时，将相机焦点对准`实体`。可设置`实体中心偏移`。

`实体中心偏移`的对应关系如下表所示。

| 完整语法 | 简写语法 | 含义 |
| --- | :---: | --- |
| `target_center_offset <x目标中心偏移: float> <y目标中心偏移: float> <z目标中心偏移: float>` | `[实体中心偏移]` | 设置相机的焦点相对于实体中心点的偏移 |

`[实体中心偏移]`为空时，不改变焦点偏移。

如不再使用聚焦实体，必须使用`remove_target`移除聚焦，而不能只`clear`自由相机。

---

```text
camera <玩家: target> remove_target
```

:::warning[版本适用性警告]

取消聚焦实体语法仅限 1.21.60+ 版本可用。

:::

当`玩家`使用自由视角相机（`minecraft:free`）聚焦实体时，取消之。

---
---

### `/effect`

对实体施加或移除状态效果。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/effect) |

---

```text
/effect <实体: target> <状态效果: Effect> [秒数: int] [放大倍率: int] [隐藏粒子: Boolean]
```

对`实体`施加`秒数`秒的、放大`放大倍率`倍的`状态效果`。可选择隐藏粒子（`隐藏粒子`）。

`秒数`的默认值为`30`。`放大倍率`的默认值为`0`。`隐藏粒子`的默认值为`false`。

对于瞬时效果（饱和、瞬间伤害、瞬间治疗），`秒数`的单位为游戏刻。

`放大倍率`与状态效果的等级关系为：等级 = 放大倍率 + 1。

---

```text
/effect <实体: target> <状态效果: Effect> infinite [放大倍率: int] [隐藏粒子: Boolean]
```

:::warning[版本适用性警告]

无限时长语法仅限 1.21.40+ 版本可用。

:::

对`实体`施加无限时长的、放大`放大倍率`倍的`状态效果`。可选择隐藏粒子（`隐藏粒子`）。

`放大倍率`的默认值为`0`。`隐藏粒子`的默认值为`false`。

`放大倍率`与状态效果的等级关系为：等级 = 放大倍率 + 1。

---

```text
effect <实体: target> clear [状态效果: Effect]
```

:::warning[版本适用性警告]

`状态效果`参数仅限 1.21.40+ 版本可用。

:::

移除`实体`的`状态效果`。

`状态效果`为空时，移除实体的所有状态效果。

---
---

## 中频命令

---
---

### `/give`

给予玩家物品。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#give的扩展语法) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/give) |

---

```text
/give <玩家: target> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

给予`玩家` `数量`个含有特定`组件`、特定`数据值`的`物品`。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

---
---

### `/kill`

清除实体。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#清除实体的命令kill) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/kill) |

---

```text
/kill <实体: target>
```

清除`实体`。

---
---

### `/replaceitem`

替换实体的物品栏为特定物品。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.7 物品操作命令](../chapter2/section7) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/replaceitem) |

---

```text
replaceitem block <位置: x y z> slot.container <槽位ID: int> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

将位于`位置`的容器的第(`槽位ID`+1)个槽位设置为`数量`个含有特定`组件`、特定`数据值`的`物品`。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

---

```text
replaceitem block <位置: x y z> slot.container <槽位ID: int> <旧物品处理: ReplaceMode> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

将位于`位置`的容器的第(`槽位ID`+1)个槽位设置为`数量`个含有特定`组件`、特定`数据值`的`物品`。可选择旧物品处理方法（`旧物品处理`）。

`旧物品处理`的可选值为：

- `keep`：若原槽位含有物品，则不替换。
- `destroy`：无论原槽位是否含有物品，都替换。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

---

```text
replaceitem entity <实体: target> <槽位类型: EntityEquipmentSlot> <槽位ID: int> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

将`实体`的槽位类型为`槽位类型`的第(`槽位ID`+1)个槽位设置为`数量`个含有特定`组件`、特定`数据值`的`物品`。

`EntityEquipmentSlot`的可选值详见 Wiki。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

---

```text
replaceitem entity <实体: target> <槽位类型: EntityEquipmentSlot> <槽位ID: int> <旧物品处理: ReplaceMode> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

将`实体`的槽位类型为`槽位类型`的第(`槽位ID`+1)个槽位设置为`数量`个含有特定`组件`、特定`数据值`的`物品`。可选择旧物品处理方法（`旧物品处理`）。

`旧物品处理`的可选值为：

- `keep`：若原槽位含有物品，则不替换。
- `destroy`：无论原槽位是否含有物品，都替换。

`EntityEquipmentSlot`的可选值详见 Wiki。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

---
---

### `/inputpermission`

设置玩家的权限。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/inputpermission) |

---

```text
inputpermission query <玩家: target> <权限: permission> [状态: state]
```

:::warning[版本适用性警告]

除`camera`和`movement`权限之外，其他权限仅限 1.21.50+ 可用。

:::

查询有多少`玩家`的`权限`处于`状态`下。

会受到游戏规则`sendCommandFeedBack`的影响。

---

```text
inputpermission set <玩家: target> <权限: permission> <状态: state>
```

:::warning[版本适用性警告]

除`camera`和`movement`权限之外，其他权限仅限 1.21.50+ 可用。

:::

设定`玩家`的`权限`的状态为`状态`。

---
---

### `/fill`

填充一片区域为特定方块。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.8 方块操作命令](../chapter2/section8) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/fill) |

---

```text
fill <起点: x y z> <终点: x y z> <方块: Block> <方块状态: block states> [旧方块处理: FillMode]
```

将从`起点`到`终点`组成的区域按照`旧方块处理`方式填充`方块状态`的`方块`。

`旧方块处理`的默认值为`replace`（第 3 条语法），可选值为：

- `replace`：直接替换。（第 3 条语法）
- `destroy`：先破坏区域原有的方块后再替换。
- `keep`：保留区域原有的方块，替换其余空气方块。
- `outline`：替换外壳，内部不受影响。
- `hollow`：内部镂空。

---

```text
fill <起点: x y z> <终点: x y z> <方块: Block> [旧方块处理: FillMode]
```

将从`起点`到`终点`组成的区域按照`旧方块处理`方式填充`方块`。

`旧方块处理`的默认值为`replace`（第 4 条语法），可选值为：

- `replace`：直接替换。（第 4 条语法）
- `destroy`：先破坏区域原有的方块后再替换。
- `keep`：保留区域原有的方块，替换其余空气方块。
- `outline`：替换外壳，内部不受影响。
- `hollow`：内部镂空。

---

```text
fill <起点: x y z> <终点: x y z> <方块: Block> <方块状态: block states> replace [替换方块: Block] [替换方块状态: block states]
```

将从`起点`到`终点`组成的区域将`替换方块状态`的`替换方块`替换为`方块状态`的`方块`。

`替换方块`和`替换方块状态`为空时，指定区域内的所有方块。

---

```text
fill <起点: x y z> <终点: x y z> <方块: Block> replace [替换方块: Block] [替换方块状态: block states]
```

将从`起点`到`终点`组成的区域将`替换方块状态`的`替换方块`替换为`方块`。

`替换方块`和`替换方块状态`为空时，指定区域内的所有方块。

---
---

### `/spawnpoint`

设置玩家的重生点。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/spawnpoint) |

---

```text
spawnpoint [玩家: target] [重生点: x y z]
```

将`玩家`的重生点设置在`重生点`。

`玩家`的默认值为执行者。`重生点`的默认值为执行位置。

---
---

### `/dialogue`

:::danger[版本适用性警告]

中国版移除了 NPC 的功能，包括实体定义的`minecraft:npc`组件。因此，该命令在中国版的执行结果无论如何都是无效。

:::

调用 NPC 的对话框。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | （模块 2）[2.6 NPC 对话预设](../../addons_simple/chapter2/section6) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/dialogue) |

---

```text
dialogue open <NPC: target> <玩家: target> [场景: string]
```

为`玩家`以`NPC`的身份调用一个`场景`对话框。

`场景`为空时，默认调用该 NPC 自身的对话框。`场景`必须是一个有效的对话文件。

`NPC`必须是一个拥有`minecraft:npc`组件的实体。

---

```text
dialogue change <NPC: target> <场景: string> [玩家: target]
```

令`NPC`为`玩家`调用一个新的`场景`对话框。

`玩家`为空时，默认对全体玩家生效。

`场景`必须是一个有效的对话文件。

`NPC`必须是一个拥有`minecraft:npc`组件的实体。

---
---

### `/gamemode`

调整玩家的游戏模式。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#更改玩家游戏模式的命令gamemode) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/gamemode) |

---

```text
/gamemode <游戏模式: GameMode> [玩家: target]
```

将`玩家`的游戏模式改为`游戏模式`。

`玩家`的默认值为执行者。

`游戏模式`的可选值为：

- `survival`或`s`：生存模式。
- `creative`或`c`：创造模式。
- `adventure`或`a`：冒险模式。
- `default`或`d`：默认模式。
- `spectator`：旁观模式。

---

```text
/gamemode <游戏模式: int> [玩家: target]
```

将`玩家`的游戏模式改为`游戏模式`。

`玩家`的默认值为执行者。

旁观模式不可通过该语法设置。

---
---

### `/say`

在服务器公告消息。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#发送消息的命令say) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/say) |

---

```text
/say <消息: message>
```

对全体玩家发送`消息`。

---
---

### `/playanimation`

令实体运行动画。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | （模块 3）[3 实体](../../addons_complex/chapter3/section1)（具体章节待定） | [点我进入 Wiki](https://zh.minecraft.wiki/命令/playanimation) |

---

```text
playanimation <实体: target> <动画: string> [下个状态: string] [淡出时间: float] [终止表达式: string] [控制器: string]
```

令`实体`播放`动画`。动画受对应的动画控制器的控制。

---
---

### `/setworldspawn`

设置世界的出生点。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/setworldspawn) |

---

```text
setworldspawn [出生点: x y z]
```

将世界出生点设置在`重生点`。

`重生点`的默认值为执行位置。

---
---

### `/tell`（或`/msg`、`/w`）

私聊玩家。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/tell) |

---

```text
tell <玩家: target> <消息: message>
```

对`玩家`私聊发送`消息`。

当执行者的权限等级为`0`时，不能使用目标选择器。

---
---

### `/time`

控制或查询世界时间。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#调整时间的命令time) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/time) |

---

```text
/time add <数值: int>
```

加快世界时间`数值`游戏刻。

---

```text
/time query <daytime|gametime|day>
```

查询世界处于第几天、或时间、或存在总时长。

---

```text
/time set <数值: int>
```

设置世界的时间为`数值`游戏刻。

---

```text
/time set <时间: TimeSpec>
```

设置世界的时间为`时间`。

`时间`可选值为：

- `sunrise`：日出
- `day`：早上
- `noon`：中午
- `sunset`：日落
- `night`：晚上
- `midnight`：午夜

---
---

## 低频命令

---
---

## 零频命令

---
---

## 服务器命令

---
---

## 新版命令

---
---

## 参考资料

- [中文 Minecraft Wiki](https://zh.minecraft.wiki/)
- [Minecraft 命令更新日志 | 命令助手](https://ca.projectxero.top/blog/command/command-history/)
