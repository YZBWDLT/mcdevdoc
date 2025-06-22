---
sidebar_position: 2
---

# 1.2 JSON 语法基础

import '/src/css/treeview.css';
import DataType from "/src/components/DataType"

**在附加包的编写中，我们要时时刻刻跟 JSON 这个东西打交道**。其实这东西已经不是你第一次见了，在模块 1 的物品组件和文本组件中，我们就曾见过 JSON，只是当时我们只给出了一个固定的格式，却从来没有说过为什么要这么写。可以说，学会 JSON 语法是附加包的一个基础门槛，学不会 JSON 语法就无从谈起写附加包。不过好在，JSON 的语法其实是十分简单的——至少它可比`/execute`简单得多。为了满足我们附加包的编写需求，必须要在系统学习附加包之前先学习 JSON 语法。

## JSON

关于 JSON 的基本表述，可以在这篇[官方网站](https://www.json.org/json-zh.html)中了解到。

JSON 的全称是 JavaScript Object Notation，它脱胎于常常用于网址开发的编程语言 JavaScript（这个语言我们在模块 3 中也会见到），并根据其他不同编程语言（如 C、Java、Python、JavaScript）的特点，提炼出了它们的数据表达的精髓，才有了这么一种便于数据交换的格式。现如今，大多数的编程语言都支持解析 JSON，并转换成自己语言可用的数据格式。

所以，使用 JSON 是出于在不同的编程语言下，“统一规范”的需求。

## 基本数据类型

数据类型是一种声明不同类型变量或函数的系统。数据本身也是有着很多类型的，在模块 1 中，我们已经学习过命令参数类型的概念，了解了整数、浮点数、布尔值、字符串这些概念。其实，这些就是非常基本的数据类型了。

- **数字**（`number`）：在模块 1，我们曾学过整数`int`和浮点数`float`，显然这两种数都是数字。举例：`3`、`-1`、`1.5`、`0.0`都是数字。当然，虽然 JSON 中并不区分整数和浮点数，但是在实际运用中常常还是要注意区分。
- **布尔值**（`boolean`）：也就是`true`和`false`。
- **字符串**（`string`）：用双引号`"`包裹起来的任意文本。在模块 1 我们看到字符串的一些转义方法，例如`\n`、`\\`、`\"`等。通常这些转义方法在附加包领域也已经够用了。

在本教程中，以及中文 Minecraft Wiki 等资料中，对这几种数据类型通常用以下几种记号来标记。

- <DataType dataType="int"/>：代表一个整数（**I**nteger）。
- <DataType dataType="float"/>：代表一个浮点数（**F**loat）。
- <DataType dataType="string"/>：代表一个字符串。
- <DataType dataType="boolean"/>：代表一个布尔值。

## 键值对

键值对是一种描述属性的方法。例如我们说小明是 15 岁，可以用一个变量赋值`age=15`，代表他是 15 岁。在 JSON 中，我们用**一个键（Key）和一个值（Value）所组成的配对，也就是键值对**来表示这样的属性关系。键的数据类型是一个字符串，而值的数据类型可以是数字、布尔值、字符串，也可以是下面的对象或数组，值的选择范围是很灵活的。

例如，下面的几种都是合适的键值对。

- `"name":"Steve"`：键是`"name"`，值是一个字符串`"Steve"`。
- `"age":15`：键是`"age"`，值是一个数字`15`。
- `"isAlive":true`：键是`"isAlive"`，值是一个布尔值`true`。

对于上面的键值对，在本站和 Wiki 的文档中这么表示：

- <DataType dataType="string" name="name"/>：代表`"name"`为键，值接受字符串。
- <DataType dataType="int" name="age"/>：代表`"age"`为键，值接受整数。
- <DataType dataType="boolean" name="isAlive"/>：代表`"isAlive"`为键，值接受布尔值。

## 对象`object`

**对象（Object）是一种键值对的集合**，换言之，里面的内容应该是一个个的键值对。**这些键值对的外围，用一个花括号`{}`包裹，并且键值对与键值对之间，需要用逗号分隔**。例如：

```json
{"name":"Steve","age":15,"isAlive":true}
```

这就是一个有效的 JSON 了，它是一个对象。这个对象由三个键值对`"name":"Steve"`、`"age":15`、`"isAlive":true`组成，并且这三个键值对中间以逗号分隔。对象在本站和 Wiki 的记号为<DataType dataType="object"/>。

对象本身也是一种基本数据类型，所以对象也可以成为键值对的值，比如：

```json
{"playerInfo":{"name":"Steve"}}
```

这同样也是一个有效的 JSON，它是一个对象。这个对象由一个键值对`"playerInfo":{"name":"Steve"}`组成，其中这个键值对的值就是一个对象`{"name":"Steve"}`，由键值对`"name":"Steve"`组成。

对于上面的对象，在本站和 Wiki 的文档中这么表示：

<treeview>

- <DataType dataType="object"/>：根对象
  - <DataType dataType="object" name="playerInfo"/>
    - <DataType dataType="string" name="name"/>

<br/>
</treeview>

代表根对象下接受一个`playerInfo`，它的值为一个对象，对象内接受一个`name`，它的值为字符串。

## 换行和空格

在专门的 JSON 文件中，是**允许在 JSON 中出现任意的换行和空格的**，这时同样是能够解析的。例如还是这个例子：

```json
{"name":"Steve","age":15,"isAlive":true}
```

在`{`、`:`和`,`的后面添加一个空格，然后在`}`的前面添加一个空格，也是正确的：

```json
{ "name": "Steve", "age": 15, "isAlive": true }
```

可以看到，虽然只是简单加了几个空格，但是却使得观感变得更自然了一些。毕竟 JSON 设计的初衷，还希望兼顾人们的阅读体验哦。

当然，对于这种简单结构的 JSON 对象，如果可以换行，并且换行的观感要更好的话，我们也会选择插入换行。也就是这样的效果：

```json showLineNumbers
{
    "name": "Steve",
    "age": 15,
    "isAlive": true
}
```

对于这里的 JSON，我们在每个键值对前面插入了 1 个换行和 4 空格的缩进（在前面加上空格可以清晰地展现出层级关系，叫做缩进），这也是目前十分常用的缩进配置。当然，2 空格的缩进也是很常见的。

而对于下面的 JSON：

```json
{"playerInfo":{"Steve":{"age":15,"isAlive":true},"Alex":{"age":17,"isAlive":false}}}
```

我们也可以用类似的方法，在`:`后面插入一个空格，插入换行和 4 空格的缩进：

```json showLineNumbers
{
    "playerInfo": {
        "Steve": {
            "age": 15,
            "isAlive": true
        },
        "Alex": {
            "age": 17,
            "isAlive": false
        }
    }
}
```

看，相比于改写前，这个层级关系是不是一目了然？

但是，虽然说是 JSON 内可以任意加换行和空格，请不要在字符串内、数字内部等展现关键数据的地方添加空格或空行，比如`"Steve"`加空格变成`"Steve "`，以及`15`加空格变成`1 5`这种，那这就完全不是同一个东西了。

## 数组`array`

**数组（Array）和对象是类似的，只不过它是值的集合**。这些值的外围，用一个方括号`[]`包裹，并且值与值之间，需要用逗号分隔。例如：

```json
[ "Beijing", "Shanghai", "Guangzhou", "Shenzhen" ]
```

这里，就是由 4 个值：`"Beijing"`、`"Shanghai"`、`"Guangzhou"`、`"Shenzhen"`所组成的，这 4 个值都是字符串。

数组在本站和 Wiki 的记号为<DataType dataType="array"/>。

同样的，这里的值不仅可以为数字、布尔值、字符串，也可以为对象或者数组。例如：

```json
[
    "firstElement",
    2,
    true,
    {
        "example1": "1-1",
        "example2": "1-2",
        "example3": "1-3"
    },
    [
        "2-1",
        "2-2",
        "2-3"
    ]
]
```

在这个数组里，一共有 5 个值：

- 字符串`"firstElement"`；
- 数字`2`；
- 布尔值`true`；
- 对象`{ "example1": "1-1", "example2": "1-2", "example3": "1-3" }`，它拥有 3 个键值对作为元素：
  - `"example1": "1-1"`；
  - `"example2": "1-2"`；
  - `"example3": "1-3"`。
- 数组`[ "2-1", "2-2", "2-3" ]`，它拥有 3 个值作为元素：
  - 字符串`"2-1"`；
  - 字符串`"2-2"`；
  - 字符串`"2-3"`。

## 命令中的 JSON

在命令中，我们曾经讲过文本组件和物品组件，不知道你是否还有印象，我们一起回顾一下。

### 文本组件

文本组件以`rawtext`打头，然后用`text`、`translate`和`with`、`selector`和`score` 4 种可用的文本组件显示特定文本。格式分别如下：

```json
{"rawtext":[{"text":"你好，"},{"selector":"@s"},{"translate":"，你的分数是 %%s。","with":{"rawtext":[{"score":{"objective":"data","name":"@s"}}]}}]}
```

因为命令并不支持换行，所以在当时我们并没有将它换行来写。实际上如果换行的话，这段 JSON 的层级关系就将一清二楚。

```json showLineNumbers
{
    "rawtext": [
        {
            "text": "你好，"
        },
        {
            "selector": "@s"
        },
        {
            "translate": "，你的分数是 %%s。",
            "with": {
                "rawtext": [
                    {
                        "score": {
                            "objective": "data",
                            "name": "@s"
                        }
                    }
                ]
            }
        }
    ]
}
```

或者我们也可以换一个缩进方式，随你喜好而定，只要易读就都是好的缩进设计。

```json showLineNumbers
{
    "rawtext": [
        { "text": "你好，" },
        { "selector": "@s" },
        {
            "translate": "，你的分数是 %%s。",
            "with": {
                "rawtext": [
                    { "score": { "objective": "data", "name": "@s" } }
                ]
            }
        }
    ]
}
```

我们来分析一下。这个 JSON 由一个对象表示，内含一个<DataType dataType="array" name="rawtext" isRequired />（键为`"rawtext"`，值为一个数组，就称为`rawtext`数组，标记为<DataType dataType="array" name="rawtext" />；如果右上角标记星号且键名加粗，则代表这个值是必填的）。这个数组中有 3 个对象，也就是 3 个文本组件。

- 第 1 个对象中，包含一个<DataType dataType="string" name="text" isRequired />，代表普通文本组件。
- 第 2 个对象中，包含一个<DataType dataType="string" name="selector" isRequired />，代表选择器文本组件。
- 第 3 个对象中，包含一个<DataType dataType="string" name="translate" isRequired />和一个<DataType dataType="object" name="with" />，这个对象中是一个新的<DataType dataType="array" name="rawtext" isRequired />，也就是翻译文本组件。

所以，我们便看到在模块 1 中所没有提及到的细节性内容，比如为什么`rawtext`后接的是方括号而不是花括号，正是因为数组和对象之间的差异所导致的。所以，从本节开始，读者应当能够从 JSON 语法的角度出发去理解文本组件，而不应该仅仅局限于模板的套用了。

### 物品组件

物品组件就要更加简单。我们曾经学过 4 个物品组件：`can_place_on`、`can_destroy`、`item_lock`、`keep_on_death`。我们来回顾一下它们的写法。

```json
{"can_place_on":{"blocks":["grass_block"]},"can_destroy":{"blocks":["dirt","gravel"]},"item_lock":{"mode":"lock_in_inventory"},"keep_on_death":{}}
```

我们同样地换行空格大法，一眼便能看出它们的层级关系。

```json showLineNumbers
{
    "can_place_on": {
        "blocks": ["grass_block"]
    },
    "can_destroy": {
        "blocks": ["dirt","gravel"]
    },
    "item_lock": {
        "mode": "lock_in_inventory"
    },
    "keep_on_death": {}
}
```

可见，这个物品组件中由一个对象表达。对象中含有 4 个键值对：

- <DataType dataType="object" name="can_place_on" />，内含一个<DataType dataType="array" name="blocks" isRequired />，数组内写为各方块的 ID 以代表可以放置的方块。
- <DataType dataType="object" name="can_destroy" />，内含一个<DataType dataType="array" name="blocks" isRequired />，数组内写为各方块的 ID 以代表可以破坏的方块。
- <DataType dataType="object" name="item_lock" />，内含一个<DataType dataType="string" name="mode" isRequired />，代表物品的锁定位置。
- <DataType dataType="object" name="keep_on_death" />，内部不含任何元素。

和文本组件一样，我们同样要求读者能够从 JSON 语法的角度出发去理解物品组件，而不应仅仅局限于模板的套用。

## 常见错误

JSON 虽然语法简单易懂，但是对错误还是很“挑剔”的。只要 JSON 中出现了哪怕一个意料之外的符号，都会直接报错导致整个 JSON 都无法解析。为此，我们必须强调在 JSON 中的一些常见错误。

### 意外的或遗漏的逗号

前文我们提到，在对象中的键值对，和在数组中的值以逗号分隔。如果这其中的逗号多了一个或者少了一个，都会出现错误。

:::tip[实验 1.2-1]

```json showLineNumbers
{
    "can_place_on": {
        "blocks": ["grass_block"]
    },
    "can_destroy": {
        "blocks": ["dirt","gravel"]
    }
    "item_lock": {
        "mode": "lock_in_inventory"
    },
    "keep_on_death": {}
}
```

这个 JSON 最终会解析失败，你能找到问题出在哪里吗？

:::

<details>

<summary>答案</summary>

问题出在第 7 行，`can_destroy`对象和`item_lock`对象中没有逗号分隔。

```json showLineNumbers
{
    "can_place_on": {
        "blocks": ["grass_block"]
    },
    "can_destroy": {
        "blocks": ["dirt","gravel"]
    }   // <- 解析失败：没有“,”分隔
    "item_lock": {
        "mode": "lock_in_inventory"
    },
    "keep_on_death": {}
}
```

当然，如果是在打命令的时候出现这种问题，是很难发现的：

```json showLineNumbers
{ "can_place_on": { "blocks": ["grass_block"] }, "can_destroy": { "blocks": ["dirt","gravel"] } "item_lock": { "mode": "lock_in_inventory" }, "keep_on_death": {} }
```

不妨在记事本或者一些文本编辑器中缩进一下看看，就很快能发现问题。

</details>

我们再来看一种更经典的错误。

:::tip[实验 1.2-2]

```json showLineNumbers
{
    "can_place_on": {
        "blocks": ["grass_block"]
    },
    "can_destroy": {
        "blocks": ["dirt","gravel"]
    },
    "item_lock": {
        "mode": "lock_in_inventory"
    },
    "keep_on_death": {},
}
```

这个 JSON 最终也会解析失败，你能找到问题出在哪里吗？

:::

<details>

<summary>答案</summary>

问题出在第 11 行，`keep_on_death`对象后面出现了多余的逗号。

```json showLineNumbers
{
    "can_place_on": {
        "blocks": ["grass_block"]
    },
    "can_destroy": {
        "blocks": ["dirt","gravel"]
    },
    "item_lock": {
        "mode": "lock_in_inventory"
    },
    "keep_on_death": {},    // <- 解析失败：“,”后没有元素
}
```

所以，我们说元素间以逗号分隔，**是不应该在末尾加逗号的**，因为逗号就代表着后面还有新的元素。

</details>

### 意外的或遗漏的括号

有时候，我们在输入 JSON 的时候还容易多一个或者少一个括号出来，造成解析错误。

:::tip[实验 1.2-3]

```json showLineNumbers
{
    "rawtext": [
        {
            "text": "你好，"
        },
        {
            "selector": "@s"
        },
        {
            "translate": "，你的分数是 %%s。",
            "with": {
                "rawtext": [
                    {
                        "score": {
                            "objective": "data",
                            "name": "@s"
                    }
                }
            ]
        }
    ]
}
```

请找出这个 JSON 中所存在的问题。

:::

这也是 JSON 中比较难以解决的“丢括号”问题，乍一看，不会发现有什么问题。然而，既然出现的是解析问题，我们就必然不能无视，这意味着我们从语法上出发就已经出错了，通常就是我们在什么地方多了或者少了什么东西。

如何解决这个问题呢？好在这时候我们已经将这个 JSON 进行了缩进，好吧，除了能够让层级关系更直观更清晰之外，正确的缩进还有一个作用就是可以帮我们定位括号问题。你有没有发现，`"score"`这个对象的下面是不是在视觉上就缺了点什么东西？没错，缺的可能就是我们要找的括号！但先不要盲目地直接加`}`上去，因为这个 JSON 可能是经过重排版的，下面那 6 个括号我们不确定究竟是在哪儿缺的。

为了确定究竟是什么地方缺了括号，**我们应该将 JSON 从里向外添加正确的缩进过去**。也就是说，末尾的 6 个括号我们应该从第 1 个开始加缩进，看看能否对应到上面的括号，如果能对应就继续给第 2 个加缩进……一直加到下面的情况，我们开始发现不对了。

```json showLineNumbers
{
    "rawtext": [
        {
            "text": "你好，"
        },
        {
            "selector": "@s"
        },
        {
            "translate": "，你的分数是 %%s。",
            "with": {
                "rawtext": [
                    {
                        "score": {
                            "objective": "data",
                            "name": "@s"
                        }
                    }
                ]
            }
    ]
}
```

很显然，倒数第 2 个方括号并不能和`translate`前面的那个花括号正确地对应。看来就是这个地方出现了问题，我们将这个花括号补上，也就是倒数第 3 个位置添加一个花括号`}`：

```json showLineNumbers
{
    "rawtext": [
        {
            "text": "你好，"
        },
        {
            "selector": "@s"
        },
        {
            "translate": "，你的分数是 %%s。",
            "with": {
                "rawtext": [
                    {
                        "score": {
                            "objective": "data",
                            "name": "@s"
                        }
                    }
                ]
            }
        }
    ]
}
```

这样我们就修复了“丢括号”的问题。可见，“丢括号”已经不像“丢逗号”那么好找，要解决起来需要挨个括号排查，对大型 JSON 来讲出现这种问题是十分不友好的。**这就要求我们必须在编辑 JSON 的时候就养成良好的习惯，先打完一整对括号再写入内容**。同时，**养成良好的缩进习惯也是十分重要的**，它能迅速帮助我们找到“病根”所在。如果确实不幸真的丢了括号，可以利用逐个缩进的方法找到无法对应的括号。

### 概念混淆

虽然我们一再强调 JSON 语法是编写附加包的基础，然而还是有很多开发者期望直接上手，最后招致的结果就是出现十分荒谬的 JSON 语法错误。

:::tip[实验 1.2-4]

```json
{
    "can_place_on": {
        "blocks": { "grass_block", "dirt", "gravel" }
    }
}
```

找到这个 JSON 中的问题。

:::

虽然这个 JSON 中并没有丢括号、丢逗号的问题出现，然而能写出这种 JSON 本身就说明开发者对 JSON 的概念不了解。我们看到，在`blocks`对象中写为的是一堆值的集合而不是键值对的集合，这自然就会报错。只需要把`blocks`对象改成`blocks`数组，问题自然就会解决。

```json
{
    "can_place_on": {
        "blocks": [ "grass_block", "dirt", "gravel" ]
    }
}
```

同理地，也有开发者会在数组里面写上一堆键值对，这都是十分明显的错误。

### 中文符号

相比起上面的几种明显的错误而言，中文符号所带来的错误就很隐晦了。

:::tip[实验 1.2-5]

```json
{
    "can_place_on": {
        "blocks": [ "grass_block" ]
    },
    "can_destroy": {
        "blocks": [ "dirt"，"gravel" ]
    },
    "item_lock": {
        "mode": "lock_in_inventory"
    },
    "keep_on_death": {}
}
```

找到这个 JSON 中的问题。当然这个问题没那么好找，找不到也不要灰心哦。

:::

<details>

<summary>答案</summary>

问题出在第 6 行，`dirt`和`gravel`之间使用了中文逗号。

```json showLineNumbers
{
    "can_place_on": {
        "blocks": [ "grass_block" ]
    },
    "can_destroy": {
        "blocks": [ "dirt"，"gravel" ] // <- 解析错误：无法解析“，”，应为“,”
    },
    "item_lock": {
        "mode": "lock_in_inventory"
    },
    "keep_on_death": {}
}
```

如果你能找到这个逗号，那你真是火眼金睛，太厉害了！这是一个很易犯的错误，但是如果我们使用专业的文本编辑器来写 JSON 的话，其中的自动纠错系统就可以帮助我们最大限度地防止这个问题。

</details>

### JSON 的注释

在前面你可以看到我们在答案里添加了类似于`// <- 解析错误：……`的内容，这其实就是公认的 JSON 的注释。JSON 的注释以`//`打头，后面的内容都不会读取。

按理来讲，**我们都是不推荐读者在 JSON 中添加注释的，因为原则上 JSON 本来也就不支持注释**，在上面的示例中，也只是为了说明错误出现的位置而已。有一个好消息是，Minecraft 基岩版是专门支持了这东西的。所以读者如果需要的话，可以在附加包的文件内添加注释。但是我们后面使用的文本编辑器可能会对注释疯狂报错，所以如果不想看着心烦的话，就尽量不要用了。

---

## 总结

在本节，我们已经了解了 JSON 语法，以及其中所允许的数据类型。然后，我们还介绍了编写 JSON 时常见的错误，希望读者能够在实际编写时尽可能避免，也同时给出了这些错误的排查方法。话不多说，我们现在来进行总结吧。

### JSON 中的数据类型

- **数字**（`number`）：包括整数`int`和浮点数`float`，例如：`3`、`-1`、`1.5`、`0.0`。
  - 虽然 JSON 中并不区分整数和浮点数，但是在实际运用中常常还是要注意区分。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="int" />代表整数，<DataType dataType="float" />代表浮点数。
- **布尔值**（`boolean`）：`true`和`false`。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="boolean" />代表布尔值。
- **字符串**（`string`）：用双引号`"`包裹起来的任意文本。
  - 有一些转义方法，例如`\n`、`\\`、`\"`等在 JSON 中是适用的。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="string" />代表字符串。
- **对象**（`object`）：用花括号（`{}`）包裹起来的**键值对的集合**。
  - **键值对**是由一个**键**（Key）和一个**值**（Value）配对组成的。
    - 格式为`key:value`。
    - `key`必须是一个字符串，代表对象的属性。
    - `value`可以是 JSON 中的任意的数据类型。
  - 键值对之间必须用逗号`,`分隔。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="object" />代表对象。
- **数组**（`array`）：用方括号（`[]`）包裹起来的**值的集合**。
  - 值之间必须用逗号`,`分隔。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="array" />代表数组。

### 命令中的 JSON

- 文本组件：由一个对象组成。其中的内容为：
  <treeview>
  - <DataType dataType="object" />：根对象
    - <DataType dataType="array" name="rawtext" isRequired />：代表一个原始 JSON 文本，允许以下 4 种组件。至少应指定一种组件。
      - <DataType dataType="object" />：代表一个普通文本组件（Text）。
        - <DataType dataType="string" name="text" isRequired />：显示为写入的文本。
      - <DataType dataType="object" />：代表一个选择器文本组件（Selector）。
        - <DataType dataType="string" name="selector" isRequired />：填入目标选择器。显示为符合选择器的实体的名称。
      - <DataType dataType="object" />：代表一个分数文本组件（Score）。
        - <DataType dataType="object" name="score" isRequired />：显示为特定目标的分数。
          - <DataType dataType="string" name="objective" isRequired />：填入该目标的记分项。
          - <DataType dataType="string" name="name" isRequired />：填入该目标的名称或特定的目标选择器。
      - <DataType dataType="object" />：代表一个翻译文本组件（Translate）。
        - <DataType dataType="string" name="translate" isRequired />：要翻译的文本或翻译的键名。
        - <DataType dataType="array" name="with" />：（写法 1）代入的格式化文本。
        - <DataType dataType="object" name="with" />：（写法 2）代入的格式化文本。
          - <DataType dataType="array" name="rawtext" isRequired />：代表一个原始 JSON 文本。允许以上 4 种组件。至少应指定一种组件。
            - ……
  </treeview>
  - 但事实上，文本组件的 JSON 语法树要更复杂一些。更通用的情况可见[文本组件 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/文本组件#基岩版)。
- 物品组件：由一个对象组成。其中允许的内容为：
  <treeview>
  - <DataType dataType="object" />：根对象，允许以下 4 种组件，至少应指定一种。
    - <DataType dataType="object" name="can_place_on" />：可放置到的方块。可添加`minecraft:`命名空间。
      - <DataType dataType="array" name="blocks" isRequired />
        - <DataType dataType="string" isRequired />：填入方块 ID，代表物品可放置到的方块。
    - <DataType dataType="object" name="can_destroy" />：可破坏的方块。可添加`minecraft:`命名空间。
      - <DataType dataType="array" name="blocks" isRequired />
        - <DataType dataType="string" isRequired />：填入方块 ID，代表物品可破坏的方块。
    - <DataType dataType="object" name="item_lock" />：物品锁定方法。可添加`minecraft:`命名空间。
      - <DataType dataType="string" name="mode" isRequired />：仅允许`"lock_in_inventory"`、`"lock_in_slot"`，表示物品锁定方法
    - <DataType dataType="object" name="keep_on_death" />：物品在死亡后保留。可添加`minecraft:`命名空间。
  </treeview>

### 常见错误

- 丢逗号或多逗号
- 丢括号或多括号
- 概念混淆，在对象中写为值的集合或在数组中写为键值对的集合
- 中文符号问题，误将`"`打为`“`或`,`打为`，`等

## 练习

:::info[练习 1.2]

本节的练习我们不强调编写 JSON，编写问题在我们下节讲过文本编辑器之后再谈。现在的练习中，我们只强调对 JSON 的概念的理解。

分析下面的 JSON，判断它们是否有误，如果有误则说明在哪行出现了哪个问题；如果无误则分析 JSON 中的对象、数组等信息。下面的题目中不会出现中文符号的问题（因为它们确实过于不可见）。下面出现错误的 JSON 至多出现 1 个错误。

例 1：

```json showLineNumbers
{
    "message": "Hello, world!",
    "players": [ "YZBWDLT", "Andy7343" ]
}
```

答案：这是一个有效的 JSON 对象。其含有一个`message`字符串和`players`数组，数组中由两个字符串组成。

例 2：

```json showLineNumbers
{
    "message": "Hello, world!",
    "players"; [ "YZBWDLT", "Andy7343" ]
}
```

答案：这个 JSON 存在语法错误，错误出现在第 3 行的`;`，应当为`:`。

1.

```json showLineNumbers
{
    "key1": {
        "key2": "value2",
        "key3"
    }
}
```

2.

```json showLineNumbers
{
    "minecraft:food": {
        "nutrition: 4,
        "saturation_modifier": 0.3
    }
}
```

3.

```json showLineNumbers
{
  "format_version": "1.20.50",
  "minecraft:item": {
    "description": {
      "identifier": "minecraft:apple",
      "category": "nature"
    },
    "components": {
    }
  }
}
```

4.

```json showLineNumbers
{
    "minecraft:hurt_on_condition": {
        "damage_conditions": [
            {
                "filters": {
                    "test": "in_lava",
                    "subject": "self",
                    "operator": "==",
                    "value": true
                },
                "cause": "lava",
                "damage_per_tick": 4,
            }
        ]
    }
}
```

5.

```json showLineNumbers
{
    "text": "Hello, "world"! "
}
```

6.

```json showLineNumbers
"minecraft:type_family": [
    "family": [ "armor_stand", "inanimate", "mob" ]
]
```

7.

```json showLineNumbers
[
    "minecraft:nameable": {
    },
    "minecraft:persistent": {
    },
    "minecraft:physics": {
    },
]
```

8.

```json showLineNumbers
{
    "minecraft:spawns_on_surface": {},
    "minecraft:spawns_on_block_filter": "minecraft:grass",
    "minecraft:brightness_filter": { "min": 7, "max": 15, "adjust_for_weather": false }
}
```

9.

```json showLineNumbers
{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "minecraft:string",
          "weight": 1,
          "functions": [
            {
              "function": "set_count",
              "count": {
                "min": 0,
                "max": 2
              }
            }
          ]
        }
    }
  ]
}
```

10.

```json showLineNumbers
{
    "modules": [
        {
            "description": "Example vanilla behavior pack",
            "type": "data",
            "uuid": "fa6e90c8-c925-460f-8155-c8a60b753caa",
            "version": [0, 0, 1]
        }
    ]
}
```

11.

```json showLineNumbers
{
    "distance": {
            "water": {
                "fog_start": 0.0,
                "fog_end": 60.0,
                "fog_color": "#157cab",
                "render_distance_type": "fixed"
            }
        }
    } 
```

:::

<details>

<summary>练习题答案</summary>

1.

```json showLineNumbers
{
    "key1": {
        "key2": "value2",
        "key3"  // <- 不是一个有效的键值对。
    }
}
```

2.

```json showLineNumbers
{
    "minecraft:food": {
        "nutrition: 4,  // <- 在nutrition的后面丢失了一个"。
        "saturation_modifier": 0.3
    }
}
```

3.

```json showLineNumbers
{
  "format_version": "1.20.50",
  "minecraft:item": {
    "description": {
      "identifier": "minecraft:apple",
      "category": "nature"
    },
    "components": {
    }
  }
}
```

这是一个有效的 JSON 对象。其含有一个`format_version`字符和一个`minecraft:item`对象。

- 在`minecraft:item`对象中含有一个`description`对象和`components`对象。
  - 在`description`对象中，含有一个`identifier`字符串和一个`category`字符串。
  - 在`components`对象中，不含有任何键值对。

4.

```json showLineNumbers
{
    "minecraft:hurt_on_condition": {
        "damage_conditions": [
            {
                "filters": {
                    "test": "in_lava",
                    "subject": "self",
                    "operator": "==",
                    "value": true
                },
                "cause": "lava",
                "damage_per_tick": 4,   // <- 出现了尾随逗号。
            }
        ]
    }
}
```

5.

```json showLineNumbers
{
    "text": "Hello, "world"! "  // <- 无法解析的字符串，应为"Hello, \"world\"! "。
}
```

6.

```json showLineNumbers
"minecraft:type_family": [  // <- 应为{}而非[]，因为其包裹的是一个键值对。
    "family": [ "armor_stand", "inanimate", "mob" ]
]
```

7.

```json showLineNumbers
[   // <- 应为{}而非[]，因为其包裹的是一个键值对。
    "minecraft:nameable": {
    },
    "minecraft:persistent": {
    },
    "minecraft:physics": {
    },
]
```

8.

```json showLineNumbers
{
    "minecraft:spawns_on_surface": {},
    "minecraft:spawns_on_block_filter": "minecraft:grass",
    "minecraft:brightness_filter": { "min": 7, "max": 15, "adjust_for_weather": false }
}
```

这是一个有效的 JSON 对象。其含有一个`minecraft:spawns_on_surface`对象、一个`minecraft:spawns_on_block_filter`字符串和一个`minecraft:brightness_filter`对象。

- 在`minecraft:spawns_on_surface`对象中，不含有任何键值对。
- 在`minecraft:brightness_filter`对象中，含有`min`整数、`max`整数和`adjust_for_weather`布尔值。

9.

```json showLineNumbers
{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "minecraft:string",
          "weight": 1,
          "functions": [
            {
              "function": "set_count",
              "count": {
                "min": 0,
                "max": 2
              }
            }
          ]
        }
        // <- 缺少]。
    }
  ]
}
```

10.

```json showLineNumbers
{
    "modules": [
        {
            "description": "Example vanilla behavior pack",
            "type": "data",
            "uuid": "fa6e90c8-c925-460f-8155-c8a60b753caa",
            "version": [0, 0, 1]
        }
    ]
}
```

这是一个有效的 JSON 对象。其含有一个`modules`数组。在这个数组中含有一个对象作为值。这个对象中含有`description`字符串、`type`字符串、`uuid`字符串和一个`version`数组，其中这个数组内含有三个整数作为值。

11.

```json showLineNumbers
{
    "distance": {
            "water": {
                "fog_start": 0.0,
                "fog_end": 60.0,
                "fog_color": "#157cab",
                "render_distance_type": "fixed"
            }
        }
    } 
```

这是一个有效的 JSON 对象，虽然它的缩进混乱，但确实所有括号都能对应的上。不正确的缩进来源于`water`对象多了一个缩进，改成下面这样就是合理的缩进了：

```json showLineNumbers
{
    "distance": {
        "water": {
            "fog_start": 0.0,
            "fog_end": 60.0,
            "fog_color": "#157cab",
            "render_distance_type": "fixed"
        }
    }
} 
```

其含有一个`distance`对象，对象中含有一个`water`对象。在这个对象中含有`fog_start`和`fog_end`浮点数，和`fog_color`和`render_distance_type`字符串。

</details>

import GiscusComponent from "/src/components/GiscusComponent/component.js"

<GiscusComponent/>
