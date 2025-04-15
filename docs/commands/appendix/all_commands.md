# 附录：全部命令汇总

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

收录所有命令，并给出对应课时。其中，部分内容并未在模块 1 介绍，请阅读本篇文档的初学者注意甄别，如果需要，请学习相关知识。

:::info[本文更新时间]

本文于 2025 年 4 月 15 日更新，中国版最新版本为 1.20.50，国际版最新版本为 1.21.70。

:::

## 帮助命令

### `/help`（或`/?`）

显示帮助文档。

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 0（无需作弊） | [1.1 命令](../chapter1/section1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/help) |

<Tabs>

<TabItem value="页码帮助" label="页码帮助" default>

```text
/help [页码: int]
```

显示第`页码`页的帮助。

`页码`的默认值为`1`。

原版游戏中，`页码`为必选参数，然而根据`/help`的表现来看，应当为可选参数。

</TabItem>

<TabItem value="命令帮助" label="命令帮助">

```text
/help <命令: CommandName>
```

显示`命令`的帮助。

原版游戏中，`命令`为可选参数，然而根据`/help`的表现来看，应当为必选参数。

</TabItem>

</Tabs>

## 超高频命令

---

### `/execute`

按照特定的命令上下文执行命令，并检测条件。

`/execute`除了`run`子命令之外，通用语法为`/execute <子命令> -> execute`。从左到右解析。修饰子命令的`-> execute`是必选参数。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.3 命令执行原理 `/execute`](../chapter2/section3/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/execute) |

<Tabs>

<TabItem value="execute_run" label="运行子命令" default>

```text
run <命令: command>
```

按照修饰子命令所给定的上下文执行`命令`。

</TabItem>

<TabItem value="execute_modifier" label="修饰子命令">

更改命令的上下文信息。

<Tabs>

<TabItem value="execute_as" label="as" default>

```text
as <源目标: target> -> execute
```

更改执行者为`源目标`。

</TabItem>

<TabItem value="execute_at" label="at">

```text
at <源目标: target> -> execute
```

更改执行环境参数（位置、朝向、维度）为`源目标`的环境参数。

</TabItem>

<TabItem value="execute_positioned" label="positioned">

```text
positioned <位置: x y z> -> execute
```

更改命令的执行位置为`位置`。

```text
positioned as <源目标: target> -> execute
```

更改命令的执行位置为`源目标`的位置。

</TabItem>

<TabItem value="execute_align" label="align">

```text
align <坐标轴: string> -> execute
```

将`坐标轴`对应的执行位置坐标向下取整。

`x`、`y`、`z`各只能出现一次。修正的位置非方块中心，而为方块角落。

</TabItem>

<TabItem value="execute_anchored" label="anchored">

```text
anchored <eyes|feet> -> execute
```

更改执行位置为执行者的脚部或眼部的位置。

</TabItem>

<TabItem value="execute_facing" label="facing">

```text
facing <位置: x y z> -> execute
```

更改执行朝向为面向`位置`。

```text
facing entity <源目标: target> <eyes|feet> -> execute
```

更改执行朝向为面向`源目标`的眼睛或脚部。

</TabItem>

<TabItem value="execute_rotated" label="rotated">

```text
rotated <y旋转: value> <x旋转: value> -> execute
```

更改执行朝向为指定的旋转角度。

```text
rotated as <源目标: target> -> execute
```

更改执行朝向为`源目标`的朝向。

</TabItem>

<TabItem value="execute_in" label="in">

```text
in <维度: Dimension> -> execute
```

更改执行维度为`维度`。

不同维度的坐标应予以变换。

</TabItem>

</Tabs>

</TabItem>

<TabItem value="execute_condition" label="条件子命令">

检查按照当前的上下文信息是否符合条件。`if`为符合时检测通过，`unless`为不符合时检测通过。

<Tabs>

<TabItem value="execute_if_entity" label="entity">

```text
<if|unless> entity <目标: target> -> execute
```

检查`目标`是否存在。

</TabItem>

<TabItem value="execute_if_block" label="block">

```text
<if|unless> block <位置: x y z> <方块: Block> [方块状态: block states] -> execute
```

检查`位置`是否为`方块状态`的`方块`。

`方块状态`的默认值为对应方块默认的方块状态。

</TabItem>

<TabItem value="execute_if_blocks" label="blocks">

```text
<if|unless> blocks <起点: x y z> <终点: x y z> <目标点: x y z> <扫描模式: all|masked> -> execute
```

检查`起点`与`终点`确定的长方体源区域的方块是否与`目标点`确定的长方体目标区域一致。扫描模式为`all`时，扫描所有方块；为`masked`时，只检查源区域的非空气方块与目标区域是否一致。

会同时检查容器、告示牌等特定方块的数据是否完全一致。

</TabItem>

<TabItem value="execute_if_score" label="score">

```text
<if|unless> score <目标: target> <记分项: string> <操作方法: compare operator> <源目标: target> <记分项: string> -> execute
```

当`目标`在其`记分项`上的分数和`源目标`在其`记分项`上的分数经过`操作方法`比较成立后，则检测通过。

`操作方法`允许的值为：`=`、`>`、`>=`、`<`、`<=`。

```text
<if|unless> score <目标: target> <记分项: string> matches <范围: integer range> -> execute
```

当`目标`在`记分项`上的分数满足`范围`条件时，则检测通过。

</TabItem>

</Tabs>

</TabItem>

</Tabs>

---

### `/function`

执行函数。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | （模块 2）[2.1 函数](../../addons_simple/chapter2/section1/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/function) |

```text
/function <路径: filepath>
```

执行`路径`的函数文件。

`路径`是不带`functions/`和后缀的文件名。

---

### `/scoreboard`

管理记分项和追踪对象。其中，`玩家: target`可以是不存在的玩家，可以指定为`*`以代表所有追踪对象。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.4 标签与计算命令](../chapter2/section4/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/scoreboard) |

<Tabs>

<TabItem value="scoreboard_objective" label="objectives" default>

记分项命令，控制记分项。

<Tabs>

<TabItem value="obj_add" label="add" default>

```text
/scoreboard objectives add <记分项: string> dummy [显示名称: string]
```

添加显示为`显示名称`的`记分项`记分项。

`显示名称`的默认值为`记分项`。

</TabItem>

<TabItem value="obj_remove" label="remove">

```text
/scoreboard objectives remove <记分项: string>
```

移除`记分项`记分项。

</TabItem>
  
<TabItem value="obj_setdisplay" label="setdisplay">

```text
/scoreboard objectives setdisplay <list|sidebar> [记分项: string] [ascending|descending]
```

在玩家列表（`list`）或侧边栏（`sidebar`）按升序（`ascending`）或降序（`descending`）显示`记分项`记分项。

`记分项`为空时，清空对应显示位置。`ascending|descending`的默认值为`descending`。

```text
/scoreboard objectives setdisplay belowname [记分项: string]
```

在玩家名牌下显示`记分项`记分项。

`记分项`为空时，清空对应显示位置。

只能显示真实玩家的分数。
  
</TabItem>
  
<TabItem value="obj_list" label="list">

```text
/scoreboard objectives list
```

在聊天栏列举所有记分项的信息。

会受到游戏规则`sendCommandFeedBack`的影响。
  
</TabItem>

</Tabs>

</TabItem>

<TabItem value="scoreboard_players" label="players">

追踪对象命令，控制追踪对象的分数。

<Tabs>
  
<TabItem value="pla_set" label="set" default>

```text
/scoreboard players set <玩家: target> <记分项: string> <数值: int>
```

设置`玩家`在`记分项`上的分数为`数值`。
  
</TabItem>
  
<TabItem value="pla_add" label="add">

```text
/scoreboard players add <玩家: target> <记分项: string> <数值: int>
```

为`玩家`在`记分项`上的分数加`数值`分。
  
</TabItem>
  
<TabItem value="pla_remove" label="remove">

```text
/scoreboard players remove <玩家: target> <记分项: string> <数值: int>
```

为`玩家`在`记分项`上的分数减`数值`分。

等同于`add`一个负的`数值`分。
  
</TabItem>
  
<TabItem value="pla_random" label="random">

```text
/scoreboard players random <玩家: target> <记分项: string> <最小值: int> <最大值: int>
```

为`玩家`在`记分项`上的分数在`最小值`到`最大值`之间随机取值。含两端。
  
</TabItem>
  
<TabItem value="pla_operator" label="operator">

```text
/scoreboard players operation <目标名称: target> <目标记分项: string> <操作: operator> <选择器: target> <记分项: string>
```

将两个分数进行运算。

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
  
</TabItem>
  
<TabItem value="pla_reset" label="reset">

```text
/scoreboard players reset <玩家: target> [记分项: string]
```

移除`玩家`在`记分项`上的分数。

`记分项`为空时，移除`玩家`在所有记分项上的分数。
  
</TabItem>
  
<TabItem value="pla_list" label="list">

```text
/scoreboard players list [玩家名称: target]
```

返回`玩家名称`在所有记分项上的分数。

`玩家名称`为空时，则返回全部追踪对象。

会受到游戏规则`sendCommandFeedBack`的影响。
  
</TabItem>
  
<TabItem value="pla_test" label="test">

```text
/scoreboard players test <玩家: target> <记分项: string> <最小值: wildcard int> [最大值: wildcard int]
```

检测`玩家`在`记分项`上的分数是否在`最小值`到`最大值`之间。含两端，*不常用*。

`最大值`的默认值为`*`。
  
</TabItem>

</Tabs>

</TabItem>

</Tabs>

---

### `/summon`

在特定位置生成特定名称、特定生成事件的实体。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/summon) |

<Tabs>

<TabItem value="summon_1" label="仅命名" default>

```text
/summon <实体: EntityType> <名称: string> [生成位置: x y z]
```

在`生成位置`生成名为`名称`的`实体`。

`生成位置`的默认值为执行位置。

</TabItem>

<TabItem value="summon_2" label="生成事件（旋转角度）">

```text
/summon <实体: EntityType> [生成位置: x y z] [y旋转: value] [x旋转: value] [生成事件: string] [名称: string]
```

在`生成位置`生成名为`名称`的特定旋转角度的`实体`。

`生成位置`的默认值为执行位置。`y旋转`和`x旋转`的默认值为执行朝向。`生成事件`的默认值为`minecraft:entity_spawned`。名称的默认值为空。

</TabItem>

<TabItem value="summon_3" label="生成事件（面向实体）">

```text
/summon <实体: EntityType> [生成位置: x y z] facing <面向实体: target> [生成事件: string] [名称: string]
```

在`生成位置`生成名为`名称`的面向`面向实体`的`实体`。

`生成位置`的默认值为执行位置。`生成事件`的默认值为`minecraft:entity_spawned`。名称的默认值为空。

</TabItem>

<TabItem value="summon_4" label="生成事件（面向坐标）">

```text
/summon <实体: EntityType> [生成位置: x y z] facing <面向位置: x y z> [生成事件: string] [名称: string]
```

在`生成位置`生成名为`名称`的面向`面向位置`的`实体`。

`生成位置`的默认值为执行位置。`生成事件`的默认值为`minecraft:entity_spawned`。名称的默认值为空。

</TabItem>

</Tabs>

---

### `/tag`

对实体的标签进行操作。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.4 标签与计算命令](../chapter2/section4/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/tag) |

<Tabs>

<TabItem value="tag_1" label="add" default>

```text
/tag <实体: target> add <名称: string>
```

为`实体`添加名为`名称`的标签。

</TabItem>

<TabItem value="tag_2" label="remove">

```text
/tag <实体: target> remove <名称: string>
```

为`实体`移除名为`名称`的标签。

</TabItem>

<TabItem value="tag_3" label="list">

```text
/tag <实体: target> list
```

在聊天栏返回`实体`的所有标签。

会受到游戏规则`sendCommandFeedBack`的影响。

</TabItem>

</Tabs>

---

### `/tellraw`

对特定玩家的聊天栏发送原始 JSON 文本。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★★ | 1 | [2.9 特效命令](../chapter2/section9/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/tellraw) |

```text
/tellraw <玩家: target> <原始JSON文本: json>
```

对`玩家`在聊天栏输出`原始JSON文本`。

`原始JSON文本`必须是有效的文本组件。

## 高频命令

---

### `/scriptevent`

配合 ScriptAPI 使用，对`system`类发送一个`scriptEventReceive`的后事件。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | （模块 5）[3.4 命令`/scriptevent`](../../sapi/chapter3/section4) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/scriptevent) |

```text
/scriptevent <消息ID: string> <消息: message>
```

向脚本系统发送一个消息，拥有`消息ID`的 ID 和`消息`的消息属性。

返回`ScriptEventCommandMessageAfterEvent`事件，脚本中可调用`id`属性获取命令中的`消息ID`，调用`message`属性获取命令中的`消息`。

---

### `/tp`（或`/teleport`）

传送实体到特定位置。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.2 简单命令](../chapter2/section2#传送玩家的命令tp或teleport) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/teleport) |

<Tabs>

<TabItem value="tp_executor" label="传送执行者">

<Tabs>

<TabItem value="tp_1_1" label="传送到实体" default>

```text
/tp <位置: target>
```

将执行者传送到`位置`。

</TabItem>

<TabItem value="tp_1_2" label="传送到坐标">

```text
/tp <位置: x y z> [检查卡墙: Boolean]
```

将执行者传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

</TabItem>

<TabItem value="tp_1_3" label="传送到坐标（旋转角度）">

```text
/tp <位置: x y z> [y旋转: value] [x旋转: value] [检查卡墙: Boolean]
```

将执行者按特定旋转角度传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

</TabItem>

<TabItem value="tp_1_4" label="传送到坐标（面向实体）">

```text
/tp <位置: x y z> facing <面向实体: target> [检查卡墙: Boolean]
```

将执行者按面向`面向实体`的朝向传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

</TabItem>

<TabItem value="tp_1_5" label="传送到坐标（面向坐标）">

```text
/tp <位置: x y z> facing <面向坐标: x y z> [检查卡墙: Boolean]
```

将执行者按面向`面向坐标`的朝向传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

</TabItem>

</Tabs>

</TabItem>

<TabItem value="tp_entity" label="传送任意实体" default>

<Tabs>

<TabItem value="tp_2_1" label="传送到实体" default>

```text
/tp <目标: target> <位置: target> [检查卡墙: Boolean]
```

将`目标`传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

</TabItem>

<TabItem value="tp_2_2" label="传送到坐标">

```text
/tp <目标: target> <位置: x y z> [检查卡墙: Boolean]
```

将`目标`传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

</TabItem>

<TabItem value="tp_2_3" label="传送到坐标（旋转角度）">

```text
/tp <目标: target> <位置: x y z> [y旋转: value] [x旋转: value] [检查卡墙: Boolean]
```

将`目标`按特定旋转角度传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

</TabItem>

<TabItem value="tp_2_4" label="传送到坐标（面向实体）">

```text
/tp <目标: target> <位置: x y z> facing <面向实体: target> [检查卡墙: Boolean]
```

将`目标`按面向`面向实体`的朝向传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

</TabItem>

<TabItem value="tp_2_5" label="传送到坐标（面向坐标）">

```text
/tp <目标: target> <位置: x y z> facing <面向坐标: x y z> [检查卡墙: Boolean]
```

将`目标`按面向`面向坐标`的朝向传送到`位置`。如果`检查卡墙`指定为`true`，则当传送点有方块会导致实体卡墙时阻止传送。

`检查卡墙`的默认值为`false`。

</TabItem>

</Tabs>

</TabItem>

</Tabs>

---

### `/titleraw`

对特定玩家发送原始 JSON 文本的标题。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/titleraw) |

<Tabs>

<TabItem value="titleraw_pos" label="title | subtitle | actionbar" default>

```text
/titleraw <玩家: target> <标题位置: TitleRawSet> <原始JSON标题文本: json>
```

对`玩家`在`标题位置`显示`原始JSON标题文本`。

`标题位置`可选值为：

- `title`：主标题
- `subtitle`：副标题
- `actionbar`：快捷栏标题

</TabItem>

<TabItem value="titleraw_clear" label="clear">

```text
/titleraw <玩家: target> clear
```

清空`玩家`的标题。

与`/title`通用。

</TabItem>

<TabItem value="titleraw_reset" label="reset">

```text
/titleraw <玩家: target> reset
```

重置`玩家`的标题的淡入、停留和淡出时间。

与`/title`通用。

</TabItem>

<TabItem value="titleraw_times" label="times">

```text
/titleraw <玩家: target> times <淡入: int> <停留: int> <淡出: int>
```

将`玩家`的标题时间更改为淡入`淡入`游戏刻、停留`停留`游戏刻、淡出`淡出`游戏刻。

与`/title`通用。

</TabItem>

</Tabs>

---

### `/playsound`

对玩家播放音效。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/playsound) |

```text
/playsound <音效: string> [玩家: target] [位置: x y z] [音量: float] [音调: float] [最低音量: float]
```

对`玩家`在`位置`播放音量为`音量`、音调为`音调`、（可闻范围内）最低音量为`最低音量`、音效 ID 为`音效`的音效。

`玩家`的默认值为执行者。`位置`的默认值为执行位置。`音量`的默认值为`1`。`音调`的默认值为`1`。`最低音量`的默认值为`0`。

因位置限制，故常与`/execute`搭配使用。

---

### `/particle`

释放粒子。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/particle) |

```text
/particle <粒子效果: string> [位置: x y z]
```

在`位置`释放`粒子`。

`位置`的默认值为执行位置。

部分粒子可能会因为缺少上下文信息而不能正确释放。

---

### `/setblock`

在一个特定位置放置方块。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.8 方块操作命令](../chapter2/section8) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/setblock) |

<Tabs>

<TabItem value="setblock_1" label="有方块状态" default>

```text
/setblock <位置: x y z> <方块: Block> <方块状态: block states> [replace|destroy|keep]
```

在`位置`放置`方块状态`的`方块`，并选定*旧方块处理方式*（`replace|destroy|keep`）。

*旧方块处理方式*的默认值为`replace`，可选值为：

- `replace`：替换旧方块
- `destroy`：破坏旧方块后放置新方块
- `keep`：保留旧方块

</TabItem>

<TabItem value="setblock_2" label="无方块状态">

```text
/setblock <位置: x y z> <方块: Block> [replace|destroy|keep]
```

在`位置`放置`方块`，并选定*旧方块处理方式*（`replace|destroy|keep`）。

*旧方块处理方式*的默认值为`replace`，可选值为：

- `replace`：替换旧方块
- `destroy`：破坏旧方块后放置新方块
- `keep`：保留旧方块

</TabItem>

</Tabs>

---

### `/clear`

清除玩家的物品。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.2 简单命令](../chapter2/section2#清除物品的命令clear) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/clear) |

```text
/clear <玩家: target> <物品: Item> [数据值: int] [最大数量: int]
```

清除`玩家`至多`最大数量`个数据值为`数据值`的`物品`。

`数据值`的默认值为`-1`。`最大数量`的默认值为`-1`。

`最大数量`指定为`0`时，该命令用于检测玩家是否拥有物品。

---

### `/gamerule`

查询或更改游戏规则。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.5 世界操作命令](../chapter2/section5) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/gamerule) |

<Tabs>

<TabItem value="gamerule_1" label="查询" default>

```text
/gamerule
```

在聊天栏返回所有游戏规则的值。

会受到游戏规则`sendCommandFeedBack`的影响。

</TabItem>

<TabItem value="gamerule_2" label="布尔值型">

```text
/gamerule <规则: BoolGameRule> [值: Boolean]
```

将布尔值型`规则`设置为`值`。

`值`为空时，改为查询`规则`。

会受到游戏规则`sendCommandFeedBack`的影响。

</TabItem>

<TabItem value="gamerule_3" label="整数型">

```text
/gamerule <规则: IntGameRule> [值: int]
```

将整数型`规则`设置为`值`。

`值`为空时，改为查询`规则`。

会受到游戏规则`sendCommandFeedBack`的影响。

</TabItem>

</Tabs>

---

### `/structure`

保存、加载或删除一个结构。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [3.3 结构方块与结构空位](../chapter3/section3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/structure) |

<Tabs>

<TabItem value="structure_save" label="save" default>

保存结构。

<Tabs>

<TabItem value="save_1" label="标准" default>

```text
/structure save <名称: string> <起点: x y z> <终点: x y z> [存储模式: StructureSaveMode]
```

将`起点`和`终点`组成的源区域以`名称`保存。可选择存储模式（`存储模式`）。

`存储模式`的默认值为`memory`，可选值为：

- `memory`：保存在内存中，在*游戏关闭或存档关闭*[^1]后销毁。
- `disk`：保存在硬盘中。

[^1]: 有待验证。

</TabItem>

<TabItem value="save_2" label="扩展">

```text
/structure save <名称: string> <起点: x y z> <终点: x y z> [包含实体: Boolean] [存储模式: StructureSaveMode] [包含方块: Boolean]
```

将`起点`和`终点`组成的源区域以`名称`保存。可选择存储模式（`存储模式`）、结构内是否含有实体（`包含实体`）、结构内是否含有方块（`包含方块`）。

`存储模式`的默认值为`memory`，可选值为：

- `memory`：保存在内存中，在*游戏关闭或存档关闭*[^1]后销毁。
- `disk`：保存在硬盘中。

`包含实体`的默认值为`true`。`包含方块`的默认值为`true`。

</TabItem>

</Tabs>

</TabItem>

<TabItem value="structure_load" label="load">

<Tabs>

<TabItem value="load_1" label="标准" default>

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

</TabItem>

<TabItem value="load_2" label="带动画">

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

`包含实体`的默认值为`true`。`包含方块`的默认值为`true`。`动画秒数`的默认值为？[^1]。`含水`的默认值为`false`。`完整度`的默认值为`100`。`种子`为空时，随机取值。

</TabItem>

</Tabs>

</TabItem>

<TabItem value="structure_delete" label="delete">

```text
/structure delete <名称: string>
```

删除名为`名称`的结构。

</TabItem>

</Tabs>

---

### `/clone`

将一个区域的方块复制到另一个区域。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.8 方块操作命令](../chapter2/section8) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/clone) |

<Tabs>

<TabItem value="clone_1" label="非 filtered" default>

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

</TabItem>

<TabItem value="clone_2" label="filtered">

```text
/clone <起点: x y z> <终点: x y z> <目的地: x y z> filtered <复制模式: CloneMode> <方块: Block> [方块状态: block states]
```

将从`起点`到`终点`组成的源区域的`方块状态`的`方块`复制到`目的地`决定的目标区域。可选择按照如何进行复制（`复制模式`）。

`复制模式`的默认值为`normal`，可选值为：

- `force`：无视源区域和目标区域的重叠复制。
- `move`：将源区域复制后全部替换为空气。
- `normal`：正常复制。

`方块状态`的默认值为对应方块默认的方块状态。

</TabItem>

</Tabs>

---

### `/event`

触发一个实体的生成事件。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/event) |

```text
/event entity <目标: target> <生成事件: string>
```

使`目标`触发`生成事件`。

`生成事件`是由实体行为文件（SE 文件）所定义的`events`的键名。

---

### `/camera`

对玩家的相机填充颜色，或设置玩家的相机视角。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/camera) |

<Tabs>

<TabItem value="camera_clear" label="clear">

```text
camera <玩家: target> clear
```

清除`玩家`的自定义相机。

</TabItem>

<TabItem value="camera_fade" label="fade">

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

</TabItem>

<TabItem value="camera_set" label="set">

<Tabs>

<TabItem value="1" label="通用" default>

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

</TabItem>

<TabItem value="2" label="自由视角相机">

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

</TabItem>

<TabItem value="3" label="轨道相机">

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

</TabItem>

</Tabs>

</TabItem>

<TabItem value="target_entity" label="target_entity">

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

</TabItem>

<TabItem value="remove_target" label="remove_target">

```text
camera <玩家: target> remove_target
```

:::warning[版本适用性警告]

取消聚焦实体语法仅限 1.21.60+ 版本可用。

:::

当`玩家`使用自由视角相机（`minecraft:free`）聚焦实体时，取消之。

</TabItem>

</Tabs>

---

### `/effect`

对实体施加或移除状态效果。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★★☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/effect) |

<Tabs>

<TabItem value="give" label="give" default>

<Tabs>

<TabItem value="1" label="有限时长">

```text
/effect <实体: target> <状态效果: Effect> [秒数: int] [放大倍率: int] [隐藏粒子: Boolean]
```

对`实体`施加`秒数`秒的、放大`放大倍率`倍的`状态效果`。可选择隐藏粒子（`隐藏粒子`）。

`秒数`的默认值为`30`。`放大倍率`的默认值为`0`。`隐藏粒子`的默认值为`false`。

对于瞬时效果（饱和、瞬间伤害、瞬间治疗），`秒数`的单位为游戏刻。

`放大倍率`与状态效果的等级关系为：等级 = 放大倍率 + 1。

</TabItem>

<TabItem value="2" label="无限时长">

```text
/effect <实体: target> <状态效果: Effect> infinite [放大倍率: int] [隐藏粒子: Boolean]
```

:::warning[版本适用性警告]

无限时长语法仅限 1.21.40+ 版本可用。

:::

对`实体`施加无限时长的、放大`放大倍率`倍的`状态效果`。可选择隐藏粒子（`隐藏粒子`）。

`放大倍率`的默认值为`0`。`隐藏粒子`的默认值为`false`。

`放大倍率`与状态效果的等级关系为：等级 = 放大倍率 + 1。

</TabItem>

</Tabs>

</TabItem>

<TabItem value="clear" label="clear">

```text
effect <实体: target> clear [状态效果: Effect]
```

:::warning[版本适用性警告]

`状态效果`参数仅限 1.21.40+ 版本可用。

:::

移除`实体`的`状态效果`。

`状态效果`为空时，移除实体的所有状态效果。

</TabItem>

</Tabs>

## 中频命令

---

### `/give`

给予玩家物品。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#give的扩展语法) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/give) |

```text
/give <玩家: target> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

给予`玩家` `数量`个含有特定`组件`、特定`数据值`的`物品`。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

---

### `/kill`

清除实体。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#清除实体的命令kill) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/kill) |

```text
/kill <实体: target>
```

清除`实体`。

---

### `/replaceitem`

替换实体的物品栏为特定物品。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.7 物品操作命令](../chapter2/section7) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/replaceitem) |

<Tabs>

<TabItem value="block" label="block">

<Tabs>

<TabItem value="1" label="不检查旧物品">

```text
replaceitem block <位置: x y z> slot.container <槽位ID: int> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

将位于`位置`的容器的第(`槽位ID`+1)个槽位设置为`数量`个含有特定`组件`、特定`数据值`的`物品`。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

</TabItem>

<TabItem value="2" label="检查旧物品">

```text
replaceitem block <位置: x y z> slot.container <槽位ID: int> <旧物品处理: ReplaceMode> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

将位于`位置`的容器的第(`槽位ID`+1)个槽位设置为`数量`个含有特定`组件`、特定`数据值`的`物品`。可选择旧物品处理方法（`旧物品处理`）。

`旧物品处理`的可选值为：

- `keep`：若原槽位含有物品，则不替换。
- `destroy`：无论原槽位是否含有物品，都替换。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

</TabItem>

</Tabs>

</TabItem>

<TabItem value="entity" label="entity">

<Tabs>

<TabItem value="1" label="不检查旧物品">

```text
replaceitem entity <实体: target> <槽位类型: EntityEquipmentSlot> <槽位ID: int> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

将`实体`的槽位类型为`槽位类型`的第(`槽位ID`+1)个槽位设置为`数量`个含有特定`组件`、特定`数据值`的`物品`。

`EntityEquipmentSlot`的可选值详见 Wiki。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

</TabItem>

<TabItem value="2" label="检查旧物品">

```text
replaceitem entity <实体: target> <槽位类型: EntityEquipmentSlot> <槽位ID: int> <旧物品处理: ReplaceMode> <物品: Item> [数量: int] [数据值: int] [组件: json]
```

将`实体`的槽位类型为`槽位类型`的第(`槽位ID`+1)个槽位设置为`数量`个含有特定`组件`、特定`数据值`的`物品`。可选择旧物品处理方法（`旧物品处理`）。

`旧物品处理`的可选值为：

- `keep`：若原槽位含有物品，则不替换。
- `destroy`：无论原槽位是否含有物品，都替换。

`EntityEquipmentSlot`的可选值详见 Wiki。

`数量`的默认值为`1`。`数据值`的默认值为`0`。`组件`为空时，不添加任何组件。

</TabItem>

</Tabs>

</TabItem>

</Tabs>

---

### `/inputpermission`

设置玩家的权限。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/inputpermission) |

<Tabs>

<TabItem value="query" label="query">

```text
inputpermission query <玩家: target> <权限: permission> [状态: state]
```

:::warning[版本适用性警告]

除`camera`和`movement`权限之外，其他权限仅限 1.21.50+ 可用。

:::

查询有多少`玩家`的`权限`处于`状态`下。

会受到游戏规则`sendCommandFeedBack`的影响。

</TabItem>

<TabItem value="set" label="set">

```text
inputpermission set <玩家: target> <权限: permission> <状态: state>
```

:::warning[版本适用性警告]

除`camera`和`movement`权限之外，其他权限仅限 1.21.50+ 可用。

:::

设定`玩家`的`权限`的状态为`状态`。

</TabItem>

</Tabs>

---

### `/fill`

填充一片区域为特定方块。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.8 方块操作命令](../chapter2/section8) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/fill) |

<Tabs>

<TabItem value="no_replace" label="非 replace">

<Tabs>

<TabItem value="1" label="有方块状态">

```text
fill <起点: x y z> <终点: x y z> <方块: Block> <方块状态: block states> [旧方块处理: FillMode]
```

将从`起点`到`终点`组成的区域按照`旧方块处理`方式填充`方块状态`的`方块`。

`旧方块处理`的默认值为`replace`（replace 语法，有方块状态），可选值为：

- `replace`：直接替换。（replace 语法，有方块状态）
- `destroy`：先破坏区域原有的方块后再替换。
- `keep`：保留区域原有的方块，替换其余空气方块。
- `outline`：替换外壳，内部不受影响。
- `hollow`：内部镂空。

</TabItem>

<TabItem value="2" label="无方块状态">

```text
fill <起点: x y z> <终点: x y z> <方块: Block> [旧方块处理: FillMode]
```

将从`起点`到`终点`组成的区域按照`旧方块处理`方式填充`方块`。

`旧方块处理`的默认值为`replace`（replace 语法，无方块状态），可选值为：

- `replace`：直接替换。（replace 语法，无方块状态）
- `destroy`：先破坏区域原有的方块后再替换。
- `keep`：保留区域原有的方块，替换其余空气方块。
- `outline`：替换外壳，内部不受影响。
- `hollow`：内部镂空。

</TabItem>

</Tabs>

</TabItem>

<TabItem value="replace" label="replace">

<Tabs>

<TabItem value="1" label="有方块状态">

```text
fill <起点: x y z> <终点: x y z> <方块: Block> <方块状态: block states> replace [替换方块: Block] [替换方块状态: block states]
```

将从`起点`到`终点`组成的区域将`替换方块状态`的`替换方块`替换为`方块状态`的`方块`。

`替换方块`和`替换方块状态`为空时，指定区域内的所有方块。

</TabItem>

<TabItem value="2" label="无方块状态">

```text
fill <起点: x y z> <终点: x y z> <方块: Block> replace [替换方块: Block] [替换方块状态: block states]
```

将从`起点`到`终点`组成的区域将`替换方块状态`的`替换方块`替换为`方块`。

`替换方块`和`替换方块状态`为空时，指定区域内的所有方块。

</TabItem>

</Tabs>

</TabItem>

</Tabs>

---

### `/spawnpoint`

设置玩家的重生点。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/spawnpoint) |

```text
spawnpoint [玩家: target] [重生点: x y z]
```

将`玩家`的重生点设置在`重生点`。

`玩家`的默认值为执行者。`重生点`的默认值为执行位置。

---

### `/dialogue`

:::danger[版本适用性警告]

中国版移除了 NPC 的功能，包括实体定义的`minecraft:npc`组件。因此，该命令在中国版的执行结果无论如何都是无效。

:::

调用 NPC 的对话框。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | （模块 2）[2.6 NPC 对话预设](../../addons_simple/chapter2/section6) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/dialogue) |

<Tabs>

<TabItem value="open" label="open">

```text
dialogue open <NPC: target> <玩家: target> [场景: string]
```

为`玩家`以`NPC`的身份调用一个`场景`对话框。

`场景`为空时，默认调用该 NPC 自身的对话框。`场景`必须是一个有效的对话文件。

`NPC`必须是一个拥有`minecraft:npc`组件的实体。

</TabItem>

<TabItem value="change" label="change">

```text
dialogue change <NPC: target> <场景: string> [玩家: target]
```

令`NPC`为`玩家`调用一个新的`场景`对话框。

`玩家`为空时，默认对全体玩家生效。

`场景`必须是一个有效的对话文件。

`NPC`必须是一个拥有`minecraft:npc`组件的实体。

</TabItem>

</Tabs>

---

### `/gamemode`

调整玩家的游戏模式。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#更改玩家游戏模式的命令gamemode) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/gamemode) |

---

```text
/gamemode <游戏模式: GameMode> [玩家: target]
/gamemode <游戏模式: int> [玩家: target]
```

将`玩家`的游戏模式改为`游戏模式`。

`玩家`的默认值为执行者。

`游戏模式`的可选值为：

- `survival`或`s`或`0`：生存模式。
- `creative`或`c`或`1`：创造模式。
- `adventure`或`a`或`2`：冒险模式。
- `default`或`d`或`3`：默认模式。
- `spectator`：旁观模式。

---

### `/say`

在服务器公告消息。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#发送消息的命令say) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/say) |

```text
/say <消息: message>
```

对全体玩家发送`消息`。

---

### `/playanimation`

令实体运行动画。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | （模块 3）[3 实体](../../addons_complex/chapter3/section1)（具体章节待定） | [点我进入 Wiki](https://zh.minecraft.wiki/命令/playanimation) |

```text
playanimation <实体: target> <动画: string> [下个状态: string] [淡出时间: float] [终止表达式: string] [控制器: string]
```

令`实体`播放`动画`。动画受对应的动画控制器的控制。

---

### `/setworldspawn`

设置世界的出生点。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/setworldspawn) |

```text
setworldspawn [出生点: x y z]
```

将世界出生点设置在`重生点`。

`重生点`的默认值为执行位置。

---

### `/tell`（或`/msg`、`/w`）

私聊玩家。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 0（无需作弊） | [2.9 特效命令](../chapter2/section9/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/tell) |

```text
tell <玩家: target> <消息: message>
msg <玩家: target> <消息: message>
w <玩家: target> <消息: message>
```

对`玩家`私聊发送`消息`。

当执行者的权限等级为`0`时，不能使用目标选择器。

---

### `/time`

控制或查询世界时间。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★★☆☆ | 1 | [2.2 简单命令](../chapter2/section2#调整时间的命令time) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/time) |

<Tabs>

<TabItem value="add" label="add">

```text
/time add <数值: int>
```

加快世界时间`数值`游戏刻。

</TabItem>

<TabItem value="query" label="query">

```text
/time query <daytime|gametime|day>
```

查询世界处于第几天、或时间、或存在总时长。

</TabItem>

<TabItem value="set" label="set">

```text
/time set <数值: int>
```

设置世界的时间为`数值`游戏刻。

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

</TabItem>

</Tabs>

## 低频命令

### `/difficulty`

设置游戏难度。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.5 世界操作命令](../chapter2/section5) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/difficulty) |

---

```text
/difficulty <难度: Difficulty>
/difficulty <难度: int>
```

设置游戏难度为`难度`。

`难度`的可选值为：

- `peaceful`或`p`或`0`：和平。
- `easy`或`e`或`1`：简单。
- `normal`或`n`或`2`：普通。
- `hard`或`h`或`3`：困难。

---

### `/music`

对玩家播放或停止音乐。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/music) |

<Tabs>

<TabItem value="play" label="play" default>

```text
/music play <音轨名: string> [音量: float] [淡入淡出秒数: float] [循环模式: MusicRepeatMode]
```

对全体玩家立刻播放音乐`音轨名`。可选择音量为`音量`，在刚开始或即将结束时以`淡入淡出秒数`秒淡入淡出，可指定`循环模式`。

`音量`的默认值为`1`。`淡入淡出秒数`的默认值为`0`。

`循环模式`的默认值为`play_once`，可选值为：

- `play_once`：只播放一次。
- `loop`：循环播放。

`音轨名`必须是在资源包的`sound_definitions.json`中被指定为音乐（`music`）或唱片（`record`）类型的音效才能正常播放。

</TabItem>

<TabItem value="queue" label="queue">

```text
/music queue <音轨名: string> [音量: float] [淡入淡出秒数: float] [循环模式: MusicRepeatMode]
```

对全体玩家将 ID 为`音轨名`的音乐加入到播放队列中。可选择音量为`音量`，在刚开始或即将结束时以`淡入淡出秒数`秒淡入淡出，可指定`循环模式`。

`音量`的默认值为`1`。`淡入淡出秒数`的默认值为`0`。

`循环模式`的默认值为`play_once`，可选值为：

- `play_once`：只播放一次。
- `loop`：循环播放。

`音轨名`必须是在资源包的`sound_definitions.json`中被指定为音乐（`music`）或唱片（`record`）类型的音效才能正常播放。

不能在循环播放的音乐后添加播放队列。

</TabItem>

<TabItem value="stop" label="stop">

```text
/music stop [淡出秒数: float]
```

以`淡出秒数`秒淡出停止音乐。

`淡出秒数`的默认值为`0`。

</TabItem>

<TabItem value="volume" label="volume">

```text
/music volume <音量: float>
```

调整音乐的音量为`音量`。

</TabItem>

</Tabs>

---

### `/schedule`

队列执行函数。当玩家满足特定条件后，执行函数。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | （模块 2）[2.1 函数](../../addons_simple/chapter2/section1/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/schedule) |

<Tabs>

<TabItem value="delay" label="delay" default>

:::warning[版本适用性警告]

队列延时语法仅适用于 1.21.50+ 版本。

:::

<Tabs>

<TabItem value="1" label="add (游戏刻)" default>

```text
schedule delay add <函数: filepath> <时间: int> [replace|append]
schedule delay add <函数: filepath> <时间: int>T [replace|append]
```

令`函数`在`时间`游戏刻后执行。可选择*队列执行方法*（`replace|append`）。

*队列执行方法*的默认值为`replace`，可选值为：

- `replace`：取代同名函数现有的计划
- `append`：即使同名函数现有计划，也添加新的计划

</TabItem>

<TabItem value="2" label="add (秒)">

```text
schedule delay add <函数: filepath> <时间: int>S [replace|append]
```

令`函数`在`时间`秒后执行。可选择*队列执行方法*（`replace|append`）。

*队列执行方法*的默认值为`replace`，可选值为：

- `replace`：取代同名函数现有的计划
- `append`：即使同名函数现有计划，也添加新的计划

</TabItem>

<TabItem value="3" label="add (游戏天数)">

```text
schedule delay add <函数: filepath> <时间: int>D [replace|append]
```

令`函数`在`时间`游戏日（24000 游戏刻）后执行。可选择*队列执行方法*（`replace|append`）。

*队列执行方法*的默认值为`replace`，可选值为：

- `replace`：取代同名函数现有的计划
- `append`：即使同名函数现有计划，也添加新的计划

</TabItem>

<TabItem value="4" label="clear">

```text
schedule delay clear <函数: filepath>
```

移除延时队列的`函数`。

</TabItem>

</Tabs>

</TabItem>

<TabItem value="on_area_loaded" label="on_area_loaded">

<Tabs>

<TabItem value="add" label="add" default>

```text
schedule on_area_loaded add <起点: x y z> <终点: x y z> <函数: filepath>
```

令`函数`在`起点`和`终点`组成的区域全部加载后执行。

</TabItem>

<TabItem value="add circle" label="add circle">

```text
schedule on_area_loaded add circle <中心: x y z> <半径: int> <函数: filepath>
```

令`函数`在`中心`周围`半径`范围内的圆形区块全部加载后执行。

</TabItem>

<TabItem value="add tickingarea" label="add tickingarea">

```text
schedule on_area_loaded add tickingarea <名称: string> <函数: filepath>
```

令`函数`在名为`名称`的常加载区域加载后执行。

</TabItem>

<TabItem value="clear function" label="clear function">

:::warning[版本适用性警告]

队列清除语法仅适用于 1.21.40+ 版本。

:::

```text
schedule on_area_loaded clear function <函数: filepath>
```

移除区域加载队列的`函数`。

</TabItem>

<TabItem value="clear tickingarea" label="clear tickingarea">

:::warning[版本适用性警告]

队列清除语法仅适用于 1.21.40+ 版本。

:::

```text
schedule on_area_loaded clear tickingarea <名称: string> [函数: filepath]
```

移除区域加载队列的名为`名称`的常加载区域，可选择移除该常加载区域下的特定的`函数`。

</TabItem>

</Tabs>

</TabItem>

<TabItem value="clear" label="clear">

:::warning[版本适用性警告]

队列清除语法仅适用于 1.21.40+ 版本。

:::

```text
schedule clear <函数: filepath>
```

移除队列中的`函数`。

</TabItem>

</Tabs>

---

### `/stopsound`

停止播放音效。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/stopsound) |

```text
/stopsound <玩家: target> [音效: string]
```

停止对`玩家`播放`音效`。

`音效`为空时，停止播放一切音效。

---

### `/tickingarea`

添加常加载区域。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.5 简单命令](../chapter2/section5) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/tickingarea) |

<Tabs>

<TabItem value="add" label="add" default>

```text
/tickingarea add <起点: x y z> <终点: x y z> [名称: string] [预加载: Boolean]
```

添加含`起点`到`终点`组成的长方体区域的所有区块为名为`名称`的常加载区域，可设定预加载信息为`预加载`。

`名称`的默认值为`AreaX`，其中`X`为从`0`开始的第 n-1 个常加载区域。`预加载`的默认值为`false`。

```text
/tickingarea add <中心: x y z> <半径: int> [名称: string] [预加载: Boolean]
```

添加由`中心`和`半径`确定的圆形区块为名为`名称`的常加载区域，可设定预加载信息为`预加载`。

`名称`的默认值为`AreaX`，其中`X`为从`0`开始的第 n-1 个常加载区域。`预加载`的默认值为`false`。

</TabItem>

<TabItem value="remove" label="remove">

```text
/tickingarea remove <位置: x y z>
```

移除包含`位置`的常加载区域。

```text
/tickingarea remove <名称: string>
```

移除名为`名称`的常加载区域。

```text
/tickingarea remove_all
```

移除所有常加载区域。

</TabItem>

<TabItem value="preload" label="preload">

```text
/tickingarea preload <名称: string> [预加载: Boolean]
```

将名为`名称`的常加载区域设定预加载信息为`预加载`。

`预加载`为空时，返回符合条件的常加载区域的预加载信息。会受到游戏规则`sendCommandFeedBack`的影响。

```text
/tickingarea preload <位置: x y z> [预加载: Boolean]
```

将包含`位置`的常加载区域设定预加载信息为`预加载`。

`预加载`为空时，返回符合条件的常加载区域的预加载信息。会受到游戏规则`sendCommandFeedBack`的影响。

</TabItem>

<TabItem value="list" label="list">

```text
/tickingarea list [全维度: AllDimensions]
```

显示当前执行维度的常加载区域。

`全维度`为空时，返回当前维度的常加载区域。`全维度`只能传入`all-dimensions`。`全维度`传入`all-dimensions`时，返回所有维度的常加载区域。

</TabItem>

</Tabs>

---

### `/ride`

建立骑乘关系。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/ride) |

<Tabs>

<TabItem value="start_riding" label="start_riding" default>

```text
/ride <乘客: target> start_riding <坐骑: target> [传送规则: TeleportRules] [填充规则: FillType]
```

令`乘客`骑乘`坐骑`。可指定传送规则（`传送规则`）和填充规则（`填充规则`）。

`传送规则`的默认值为`teleport_rider`，可选值为：

- `teleport_ride`：传送坐骑到乘客的位置。
- `teleport_rider`：传送乘客到坐骑的位置。

`填充规则`的默认值为`until_full`，可选值为：

- `if_group_fits`：仅当指定的乘客全部能骑乘到坐骑上时，才能建立骑乘关系。
- `until_full`：乘客依次建立骑乘关系，直到骑满为止。

`坐骑`只能指定一个。`坐骑`必须在行为包实体定义中有允许`乘客`骑乘的组件`minecraft:rideable`。

</TabItem>

<TabItem value="stop_riding" label="stop_riding">

```text
/ride <乘客: target> stop_riding
```

令正在骑乘的`乘客`停止骑乘。

</TabItem>

<TabItem value="evict_riders" label="evict_riders">

```text
/ride <坐骑: target> evict_riders
```

令正在被骑乘的`坐骑`驱逐其乘客。

</TabItem>

<TabItem value="summon_rider" label="summon_rider">

```text
/ride <坐骑: target> summon_rider <乘客: EntityType> [生成事件: string] [名称: string]
```

令`坐骑`生成一个`乘客`并立刻建立骑乘关系。可指定乘客的生成事件（`生成事件`）和名称（`名称`）。

`生成事件`的默认值为`minecraft:entity_spawned`。`名称`若为空，则不指定。

`坐骑`必须在行为包实体定义中有允许`乘客`骑乘的组件`minecraft:rideable`。

</TabItem>

<TabItem value="summon_ride" label="summon_ride">

```text
/ride <乘客: target> summon_ride <坐骑: EntityType> [骑乘规则: RideRules] [生成事件: string] [名称: string]
```

令`乘客`生成一个`坐骑`并立刻建立骑乘关系。可指定骑乘规则（`骑乘规则`）、坐骑的生成事件（`生成事件`）和名称（`名称`）。

`骑乘规则`的默认值为`reassign_rides`，可选值为：

- `skip_riders`：仅为并未骑乘坐骑的`乘客`生成坐骑。
- `no_ride_change`：仅为并未骑乘坐骑且并未被骑乘的`乘客`生成坐骑。
- `reassign_rides`：令所有`乘客`停止骑乘，然后生成坐骑。

`生成事件`的默认值为`minecraft:entity_spawned`。`名称`若为空，则不指定。

`坐骑`必须在行为包实体定义中有允许`乘客`骑乘的组件`minecraft:rideable`。

</TabItem>

</Tabs>

---

### `/weather`

调整或查询天气状态。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.2 简单命令](../chapter2/section2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/weather) |

<Tabs>

<TabItem value="set" label="set" default>

```text
weather <clear|rain|thunder> [时长: int]
```

设置特定的天气（`clear|rain|thunder`）为`时长`游戏刻。

若`时长`为空，则设置为`6000`\~`18000`（5\~15 分钟）之间的一个随机值。

</TabItem>

<TabItem value="query" label="query">

```text
weather query
```

查询天气。

会受到游戏规则`sendCommandFeedBack`的影响。

</TabItem>

</Tabs>

---

### `/enchant`

附魔玩家手里的物品。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.7 物品操作命令](../chapter2/section7) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/enchant) |

```text
enchant <玩家: target> <附魔: int> [等级: int]
enchant <玩家: target> <附魔: Enchant> [等级: int]
```

将`玩家`手持的物品设置为`等级`的`附魔`。

`等级`的默认值为`1`。

附魔不能超过物品所允许的魔咒类别和魔咒等级。

---

### `/mobevent`

更改世界生物生成事件。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.5 简单命令](../chapter2/section5) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/mobevent) |

```text
/mobevent <事件: MobEvent> [值: Boolean]
```

设置生物生成的`事件`为`值`。

`值`为空时，改为查询事件。会受到游戏规则`sendCommandFeedBack`的影响。

---

### `/xp`

增加或移除玩家的经验。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/xp) |

<Tabs>

<TabItem value="1" label="经验点数" default>

```text
/xp <数值: int> [玩家: target]
```

给予`玩家` `数值`点经验值。

`玩家`的默认值为执行者。

`数值`必须是正数。

</TabItem>

<TabItem value="2" label="经验等级">

```text
/xp <数值: int>L [玩家: target]
```

给予`玩家` `数值`等级的经验。

`玩家`的默认值为执行者。

`数值`允许为负数，此时将改为移除玩家对应等级的经验值。

</TabItem>

</Tabs>

---

### `/camerashake`

摇晃玩家的相机。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/camerashake) |

<Tabs>

<TabItem value="add" label="add" default>

```text
/camerashake add <玩家: target> [强度: float] [秒数: float] [摇晃类型: CameraShakeType]
```

对`玩家`施加`秒数`秒的、强度为`强度`的`摇晃类型`视角摇晃。

`强度`的默认值为`0.5`[^1]。`秒数`的默认值为`1`[^1]。

`摇晃`的默认值为`positional`，可选值为：

- `positional`：坐标摇晃。
- `rotational`：角度摇晃。

</TabItem>

<TabItem value="stop" label="stop">

```text
/camerashake stop [玩家: target]
```

立刻停止`玩家`的视角摇晃。

`玩家`的默认值为执行者。

</TabItem>

</Tabs>

---

### `/damage`

对实体造成伤害。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/damage) |

<Tabs>

<TabItem value="实体伤害" label="实体伤害" default>

```text
/damage <目标: target> <伤害值: int> <成因: DamageCause> entity <伤害者: target>
```

给`目标`施加伤害类型为`成因`、施加伤害的实体为`伤害者`的`伤害值`点伤害。

</TabItem>

<TabItem value="执行者伤害" label="执行者伤害">

```text
/damage <目标: target> <伤害值: int> [成因: DamageCause]
```

给`目标`施加伤害类型为`成因`的`伤害值`点伤害。

</TabItem>

</Tabs>

---

### `/loot`

生成、给予、插入、替换战利品。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | （模块 2）[2.3 战利品表与交易表](../../addons_simple/chapter2/section3/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/loot) |

---

```text
/loot <目标> <来源>
```

对`目标`按照`来源`的战利品表进行规定操作。

`目标`确定操作的目标和操作方法。可用的子命令如下表所示。其中，`[数量: int]`的默认值为`1`。

| 子命令 | 含义 |
| --- | --- |
| `give <玩家: target>` | 给予`玩家`战利品 |
| `insert <位置: x y z>` | 向`位置`的容器按顺序插入战利品 |
| `spawn <位置: x y z>` | 在`位置`生成战利品 |
| `replace block <位置: x y z> slot.container <槽位ID: int> [数量: int]` | 对`位置`处的容器，从`槽位ID`的槽位开始，清除`数量`个槽位后，再插入至多`数量`种战利品 |
| `replace entity <实体: target> <槽位类型: EntityEquipmentSlot> <槽位ID: int> [数量: int]` | 对`实体`的物品栏，从`槽位ID`的槽位开始，清除`数量`个`槽位类型`的槽位后，再插入至多`数量`种战利品 |

`来源`确定调用的战利品表。可用的子命令如下表所示：

:::warning[版本适用性警告]

`mine`子命令仅限 1.21.60+ 版本可用。

:::

| 子命令 | 含义 |
| --- | --- |
| `kill <实体: target> [<tool>\|mainhand\|offhand: string]` | 模拟使用指定工具杀死`实体`后的战利品表 |
| `loot <战利品表: string> [<tool>\|mainhand\|offhand: string]` | 模拟使用指定工具直接调用`战利品表`（不带`loot_tables/`和`.json`后缀） |
| `mine <目标方块位置: x y z> [<tool>\|mainhand\|offhand: string]` | 模拟使用指定工具挖掘`目标方块位置`后的战利品表 |

---

### `/title`

对特定玩家发送标题。

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★★☆☆☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/title) |

<Tabs>

<TabItem value="title_pos" label="title | subtitle | actionbar" default>

```text
/title <player: target> <title|subtitle|actionbar> <标题文本: message>
```

对`玩家`在*标题位置*（`title|subtitle|actionbar`）显示`标题文本`。

*标题位置*可选值为：

- `title`：主标题
- `subtitle`：副标题
- `actionbar`：快捷栏标题

</TabItem>

<TabItem value="title_clear" label="clear">

```text
/title <玩家: target> clear
```

清空`玩家`的标题。

与`/titleraw`通用。

</TabItem>

<TabItem value="title_reset" label="reset">

```text
/title <玩家: target> reset
```

重置`玩家`的标题的淡入、停留和淡出时间。

与`/titleraw`通用。

</TabItem>

<TabItem value="title_times" label="times">

```text
/title <玩家: target> times <淡入: int> <停留: int> <淡出: int>
```

将`玩家`的标题时间更改为淡入`淡入`游戏刻、停留`停留`游戏刻、淡出`淡出`游戏刻。

与`/titleraw`通用。

</TabItem>

</Tabs>

## 零频命令

### `/alwaysday`（或`/daylock`）

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.5 世界操作命令](../chapter2/section5) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/alwaysday) |

---

### `/clearspawnpoint`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/clearspawnpoint) |

---

### `/fog`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection2)、（模块 2）[3.6 迷雾](../../addons_simple/chapter3/section6) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/fog) |

---

### `/gametest`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | —— | [点我进入 Wiki](https://zh.minecraft.wiki/命令/gametest) |

---

### `/locate`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.10 特效命令](../chapter2/section9/subsection10) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/locate) |

---

### `/me`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.9 特效命令](../chapter2/section9/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/me) |

---

### `/recipe`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | （模块 2）[2.4 配方表](../../addons_simple/chapter2/section4/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/recipe) |

---

### `/script`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | —— | [点我进入 Wiki](https://zh.minecraft.wiki/命令/script) |

---

### `/spreadplayers`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.6 实体操作命令](../chapter2/section6/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/spreadplayers) |

:::warning[版本适用性警告]

`[最高高度: value]`参数仅限 1.21.10+ 版本可用。

:::

---

### `/testfor`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.3 命令执行原理 `/execute`](../chapter2/section3/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/testfor) |

---

### `/testforblock`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.3 命令执行原理 `/execute`](../chapter2/section3/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/testforblock) |

---

### `/testforblocks`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.3 命令执行原理 `/execute`](../chapter2/section3/subsection3) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/testforblocks) |

---

### `/toggledownfall`

!

| 使用频率 | 权限等级 | 课时 | Wiki 页面 |
| :---: | :---: | --- | :---: |
| ★☆☆☆☆ | 1 | [2.5 世界操作命令](../chapter2/section5) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/toggledownfall) |

---

## 服务器命令

---

### `/op`

!

:::warning[权限等级适用性警告]

该命令需要至少`2`的权限等级运行，因此不能使用命令方块、函数或脚本等自动化程序执行。

:::

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 2 | [2.10 服务器、联机与生存常用命令](../chapter2/section10) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/op) |

---

### `/deop`

!

:::warning[权限等级适用性警告]

该命令需要至少`2`的权限等级运行，因此不能使用命令方块、函数或脚本等自动化程序执行。

:::

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 2 | [2.10 服务器、联机与生存常用命令](../chapter2/section10) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/deop) |

---

### `/kick`

!

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 1（无需作弊） | [2.10 服务器、联机与生存常用命令](../chapter2/section10) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/kick) |

---

### `/list`

!

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 0（无需作弊） | [2.10 服务器、联机与生存常用命令](../chapter2/section10) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/list) |

---

### `/connect`

!

:::warning[权限等级适用性警告]

该命令需要至少`2`的权限等级运行，因此不能使用命令方块、函数或脚本等自动化程序执行。

:::

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 2 | —— | [点我进入 Wiki](https://zh.minecraft.wiki/命令/connect) |

---

### `/reload`

!

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 2 | （模块 2）[2.1 函数](../../addons_simple/chapter2/section1/subsection1) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/reload) |

---

```text
/reload [全部: reload_all]
```

:::warning[版本适用性警告]

`[全部: reload_all]`参数仅限 1.21.30+ 版本可用。

:::

---

### `/stop`

!

:::warning[权限等级适用性警告]

该命令需要至少`4`的权限等级运行，因此不能使用命令方块、函数或脚本等自动化程序执行。

:::

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 4 | [2.10 服务器、联机与生存常用命令](../chapter2/section10) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/stop) |

---

### `/setmaxplayers`

!

:::warning[权限等级适用性警告]

该命令需要至少`3`的权限等级运行，因此不能使用命令方块、函数或脚本等自动化程序执行。

:::

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 3 | [2.10 服务器、联机与生存常用命令](../chapter2/section10) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/setmaxplayers) |

---

### `/allowlist`

!

:::warning[权限等级适用性警告]

该命令需要至少`4`的权限等级运行，因此不能使用命令方块、函数或脚本等自动化程序执行。

:::

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 4 | [2.10 服务器、联机与生存常用命令](../chapter2/section10) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/allowlist) |

---

## 新版命令

定义当前中国版到目前最新国际正式版中间的这些版本可用的命令，称为新版命令，均为稳定玩法。

---

### `/hud`

:::warning[版本适用性警告]

该命令仅限 1.20.80+ 版本可用。

:::

!

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 1 | [2.9 特效命令](../chapter2/section9/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/hud) |

---

### `/aimassist`

:::warning[版本适用性警告]

该命令仅限 1.21.70+ 版本可用。

:::

!

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 1 | [2.9 特效命令](../chapter2/section9/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/aimassist) |

---

### `/place`

:::warning[版本适用性警告]

该命令仅限 1.21.70+ 版本可用。其中，`jigsaw`和`structure`用法仅限 1.21.80+ 版本可用。

:::

:::warning[权限等级适用性警告]

该命令需要至少`2`的权限等级运行，因此不能使用命令方块、函数或脚本等自动化程序执行。

:::

!

| 权限等级 | 课时 | Wiki 页面 |
| :---: | --- | :---: |
| 2 | [2.9 特效命令](../chapter2/section9/subsection2) | [点我进入 Wiki](https://zh.minecraft.wiki/命令/place) |

---

## 参考资料

- [中文 Minecraft Wiki](https://zh.minecraft.wiki/)
- [Minecraft 命令更新日志 | 命令助手](https://ca.projectxero.top/blog/command/command-history/)
