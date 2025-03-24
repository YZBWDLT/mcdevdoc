---
sidebar_position: 3
---

# 2.3.3 条件子命令

刚刚的部分中，我们已经介绍了 8 条能够更改命令上下文的修饰子命令。此外，`/execute`还可以**进行条件检测与判断**，这就是**条件子命令**的作用。

条件子命令只有 2 条：`if`和`unless`。让我们来看看它们的语法：

```text title="if|unless的语法" showLineNumbers
<if|unless> block <位置: x y z> <方块: Block> <方块状态: block states> -> execute
<if|unless> block <位置: x y z> <方块: Block> -> execute
<if|unless> blocks <起点: x y z> <终点: x y z> <目标点: x y z> <扫描模式: all|masked> -> execute
<if|unless> entity <目标: target> -> execute
<if|unless> score <目标: target> <记分项: string> <操作方法: compare operator> <源目标: target> <记分项: string> -> execute
<if|unless> score <目标: target> <记分项: string> matches <范围: integer range> -> execute
```

可以看到，它们后面所跟随的检测项目`block`、`blocks`、`entity`、`score`都是一样的，我们可以把它们写成一个更统一的格式：

```text title="if|unless的通用语法" showLineNumbers
<if|unless> <检测项目> -> execute
```

其中，如果`检测项目`给出的条件成立，那么`if`和`unless`将分别表现为：

- `if 检测项目`将检测通过，继续执行`-> execute`的内容；
- `unless 检测项目`将检测不通过，命令执行失败并中断。

显然，`if`和`unless`就是“是”与“非”的关系，它们的执行效果是完全相反的。例如，`execute if (项目1) run say 1`会在`项目1`成立时执行`say 1`，而`execute unless (项目2) run say 2`反而会在`项目2`不成立时执行`say 2`。

因为`score`目前来讲已经“超纲”了，我们本节暂且先按下不表。不过，下一节我们就将看到它的用法。接下来，我们来看看剩下 3 个检测项目怎么使用吧！

## 检测实体的子命令：`<if|unless> entity`

`execute if entity`用于检测实体。

```text title="if|unless entity的语法" showLineNumbers
<if|unless> entity <目标: target> -> execute
```

**检查`目标`是否存在**。你应该还记得，我们在第 1 章曾经学过一个`/testfor <目标: target>`的命令，这条命令的用法和它的用法完全一致，功能上则“有过之而无不及”，不要忘了`/execute`可是能多次嵌套的，`/execute`能够在检测成功的同时执行一条命令，而`/testfor`是做不到这一点的，它只有检测功能。

:::tip[实验 2.3-8]

执行命令`/execute if entity @e[type=armor_stand] run say 检测到盔甲架！`，在有盔甲架和无盔甲架时分别执行一次，体验`if entity`的效果。

然后，再执行一次命令`/execute unless entity @e[type=armor_stand] run say 未检测到盔甲架！`，在有盔甲架和无盔甲架时分别执行一次，体验`unless`和`if`的区别。

:::

通过实验，

## 检测方块的子命令：`<if|unless> block`

```text title="if|unless block的语法" showLineNumbers
<if|unless> block <位置: x y z> <方块: Block> <方块状态: block states> -> execute
<if|unless> block <位置: x y z> <方块: Block> -> execute
```

## 检测区域的子命令：`<if|unless> blocks`

```text title="if|unless blocks的语法" showLineNumbers
<if|unless> blocks <起点: x y z> <终点: x y z> <目标点: x y z> <扫描模式: all|masked> -> execute
```
