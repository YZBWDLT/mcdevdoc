---
sidebar_position: 1
---

# 1.1 JavaScript 基础

> 上次更新：2026 年 3 月 10 日

:::warning[注意]

本文仍在编写中，仅供参考。

:::

:::warning[注意]

本文仅限国际版的 ScriptAPI 可用。

:::

从本节开始，我们将要开始逐步了解国际版的 ScriptAPI，简称 SAPI。但是，在正式了解 SAPI 之前，我们必须充分且快速地学习 JavaScript。你可能听说过 JavaScript 的大名，它的简称是 js，广泛应用于网页编写，和 HTML、CSS 一起用于实现网页的复杂功能。好消息是我们学习 js 仅仅为了 Minecraft 的脚本服务，因此不用学习 HTML、CSS。但坏消息是，为了写出质量过关的 js 代码，你可能必须要花大约 1 个小时甚至数个小时的时间进行快速入门。

> **关于 JavaScript 的历史**
>
> 在上个世纪的 1995 年，当时的网景公司正凭借其 Navigator 浏览器成为 Web 时代开启时最著名的第一代互联网公司。
>
> 由于网景公司希望能在静态 HTML 页面上添加一些动态效果，于是叫 Brendan Eich 这哥们在两周之内设计出了 JavaScript 语言。你没看错，这哥们只用了 10 天时间。
>
> 为什么起名叫 JavaScript？原因是当时 Java 语言非常红火，所以网景公司希望借 Java 的名气来推广，但事实上 JavaScript 除了语法上有点像 Java，其他部分基本上没啥关系。
>
> —— [JavaScript 历史 - JavaScript 教程 - 廖雪峰的官方网站](https://liaoxuefeng.com/books/javascript/history/index.html)

让我们正式开始学习 JavaScript 的基础。顺便一提，网上有非常多优质的 js 教程，因为 js 本身就是一门非常常见的编程语言。我们列出如下几个常见的 js 教程，希望可以帮助你快速入门！

- [菜鸟教程](https://www.runoob.com/js/js-tutorial.html)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide...)
- [廖雪峰的官方网站](https://liaoxuefeng.com/books/javascript/introduction/index.html)
- [javascript.info](https://zh.javascript.info/intro)

读者应该注意，**本文不打算也没有能力做专门的 js 教程，本文仅限入门参考，并且只保证你在多数情况下能够使用到本文的知识点——甚至不敢保证是绝大多数。如果读者追求更全面的 js 教程，可以考虑阅读我们上面给出的几个教程，我们也强烈建议读者随着经验的不断提升，应该阅读上面的教程以丰富自己的知识面**。以及，我们在 Minecraft 中使用的 JavaScript 通常都是高版本的规范，支持定义类、做异步编程等等，所以请大胆使用最新版的功能吧！

## 执行第一串 js 代码

js 和其他的编程语言并不太一样。因为 js 通常是专门用于浏览器的，广泛用于网页的逻辑编写，一般不需要进行额外编译，这和 C、Python 等语言还是有些不同的。自然解析 js 代码的“编译器”就是 —— 浏览器了！我们打开浏览器，这里以 Edge 浏览器为例，按下<kbd>F12</kbd>就可以打开开发工具啦，我们点击控制台：

![console_1](/img/tutorials/a3_scripts/b1_programming_language/c1_js/console_1.png)

现在让我们以经典的输出`Hello,world!`作为开篇吧！我们在控制台输入以下代码，按下回车<kbd>Enter</kbd>：

```javascript
console.log("Hello,world!");
```

![console_2](/img/tutorials/a3_scripts/b1_programming_language/c1_js/console_2.png)

上面的代码就是一个 **JavaScript 语句（JavaScript Statements）**。对于初学者，每个语句之间都要用`;`分隔，并且为了美观和稳定考虑，要用换行分隔不同的语句。

读者还需要注意：和命令不同，编程语言的程序一旦报错会导致整段代码终止运行，这会导致严重的运行问题。所以在脚本的实际运行过程中，**我们必须全力阻止脚本发生报错**。

## 变量与常量

**变量（Variables）** 与 **常量（Constants）** 是用来储存数据的。现在我们接触的是一门真正的编程语言，自然少不了和变量打交道。

变量必须提前定义之后才能使用。在 js 中，使用`let`关键字来定义一个新的变量，例如下面的代码将定义变量`a`和`b`：

```javascript
let a = 1;
let b = 2;
```

注意，**JavaScript 区分大小写**。例如，变量`ironGolem`和`irongolem`不是同一个变量。

通常来说，为了自己和其他人能够更容易地看懂代码，变量的命名需要符合驼峰命名法或下划线命名法，例如`userName`或`user_name`；而像`yonghuming`、`yhm`或者`a`这些显然都是很糟糕的命名。在[模块 1](/docs/tutorials/a1_commands/b2_commands/c4_tag_and_scoreboard/d3_obj_cmd#为记分项命名的规范)，我们也曾强调过这一点。此外，在编程语言中，应该避免使用中文作为变量名。

此外，为了避免程序歧义，有一些[保留字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E4%BF%9D%E7%95%99%E5%AD%97)是不能够命名为变量名的。例如这样的变量命名会报错：

```javascript
let let = 1;
```

而在 js 中，我们使用`const`关键字来定义一个新的常量：

```javascript
const tickPerSecond = 20;
```

和变量不同的是，变量是可以在后续随意更改的：

```javascript
let playerAmount = 20;
playerAmount = 25;
```

而常量是不可以更改的，这段代码将会报错：

```javascript
const PI = 3.1415926;
PI = 4;
```

## 注释

常见的编程语言都支持注释，连函数（mcfunction）都支持注释，js 当然也不例外。js 支持两种注释格式：

1. `//`，它会将其后面的所有文本都视为注释。例如

   ```javascript
   // 定义玩家数
   let playerAmount = 20;
   playerAmount = 25; // 扩大玩家数
   ```

   是的，js 的注释是可以写到语句后面的！

2. `/* */`，它会将内部的所有文本视为注释，例如

   ```javascript
   /* 定义玩家数 */
   let playerAmount = 20;
   playerAmount = 25; /* 扩大玩家数 */
   ```

   相比于第一种注释，它还支持 [JSDoc](https://www.jsdoc.com.cn/)，方便编辑器（例如 VSC）判断具体代码的具体含义：

   ![comments_1](/img/tutorials/a3_scripts/b1_programming_language/c1_js/comments_1.png)

   为了使编辑器能够认出 JSDoc，我们后面使用的第二类注释将使用两星的`/** */`。

同样地，**我们强烈建议读者的代码应该带有必要的注释，以提高你的代码的可读性**。

## 数据类型

我们在模块 1 曾经学过多种**数据类型（Data Type）**，代表存储数据的方式有所不同，命令的数据类型主要包括整数、浮点数、布尔值、字符串等。在 JavaScript 中，这几个仍然是可以沿用的。

JavaScript 是一门**动态类型**的编程语言。所谓动态类型，是指变量的类型由编程语言自行解析，**定义后的变量仍然可以更改其类型**。像是 JavaScript 和 Python 就都是这样的语言。比如，一开始我们定义变量是整数，后面改成字符串也是可以的：

```javascript
let myVariable = 10;
myVariable = "awa";
```

当然，一般来说我们不推荐这么做。对于某些**静态类型**语言，比如 C 语言就不允许这么做。甚至于 JavaScript 的一个常见“方言” TypeScript 也特意被规定为了静态类型语言。可见动态类型在某些情况下是比较容易出错的，读者在这方面应该当心。

现在我们来介绍 js 中的几种常见类型。

### 数字（number）

数字主要包含整数和浮点数。例如`3`、`-1`、`2.4`都是`number`类型。

特殊地，js 里面还有几个特殊的数字：

- `Infinity`：代表无限大。这是一个比任何数字都更大的数字，常常通过`1/0`等数学操作后得到。
- `NaN`：代表不是一个数字（Not a Number）。这通常是由错误的数学操作得到的，比如`"awa"/1`。如果代码计算出了`NaN`，往往需要注意是否有代码写错了。
  > **冷知识**：2022 年 7 月，b 站曾经历过一次大规模的服务器崩溃。那次崩溃的根本原因就是一处代码使用了一个字符串`"0"`对一个值求余数导致了`NaN`，并在函数内部导致了死循环，从而导致了大崩溃。虽然那次崩溃是基于 Lua 语言的，但 Lua 和 js 都是动态类型语言——我不说你也明白了！要当心啊！

### 字符串（string）

和我们以前在命令、json 中学习的类似，js 的字符串是由单引号（`'`）或双引号（`"`）包裹起来的任意内容。转义方法在 js 同样适用。

然而，和以前所不同的是，js 还支持一种**模板字符串**，是由反引号（<code>\`</code>）包裹起来的任意内容。模板字符串支持使用`${...}`来对括号内的变量、表达式等进行计算，并带入到模板中，有些类似于我们曾学过的文本组件的`translate`：

```javascript
let playerName = "YZBWDLT";
let playingVersion = "26.0";
console.log(`${playerName} is playing ${playingVersion}`); // 输出：YZBWDLT is playing 26.0
```

字符串支持使用`+`拼接，例如上面的代码等效于下面的代码，这又有些类似于我们曾学过的多个文本组件拼接的效果：

```javascript
let playerName = "YZBWDLT";
let playingVersion = "26.0";
console.log(playerName + ` is playing ` + playingVersion); // 输出：YZBWDLT is playing 26.0
```

一般我们都推荐使用模板字符串做字符串拼接和输出。

### 布尔值（boolean）

和我们以前在命令、json 中学习的类似，布尔值包括`true`和`false`。有关布尔值的更多运算，我们不多强调，读者若感兴趣可以在相关教程自行查阅。

### 未知值（`null`）和未定义（`undefined`）

在 js 中用`null`表示一个值未知，而用`undefined`表示一个值未定义。在一开始定义的时候，我们不必立刻给出一个变量的值，例如：

```javascript
let trader; // 此时 trader 为 undefined
```

在实际工程中，虽然一般情况下建议对刚定义的默认值采用`undefined`，而后续未知的值为`null`，例如：

```javascript
let trader; // 此时 trader 为 undefined
trader = null; // 此时 trader 为 null
```

但事实上，这两个东西的应用通常没有任何区别。

> JavaScript 的设计者希望用`null`表示一个空的值，而`undefined`表示值未定义。事实证明，这并没有什么卵用，区分两者的意义不大。大多数情况下，我们都应该用`null`。`undefined`仅仅在判断函数参数是否传递的情况下有用。
>
> —— [数据类型和变量 - JavaScript 教程 - 廖雪峰的官方网站](https://liaoxuefeng.com/books/javascript/quick-start/data-types/index.html)

### 数组（array）

在 json 中，我们曾学习过数组的概念，它是各种值的集合。在 js 中，这也基本上是正确的：

```javascript
let players = ["YZBWDLT", "Andy7343", "GreeLeaf", "PigeonKI", "KrisWenYu", "PumpkinJui"];
```

我们可以通过**索引（Index）** 来访问数组中的元素，注意第一个元素的索引是`0`，例如：

```javascript
let players = ["YZBWDLT", "Andy7343", "GreeLeaf", "PigeonKI", "KrisWenYu", "PumpkinJui"];
console.log(players[0]); // 输出第1个元素：YZBWDLT
console.log(players[3]); // 输出第4个元素：PigeonKI
console.log(players[6]); // 输出第7个元素，超出索引范围，输出：undefined
```

### 对象（object）

在 json 中，我们也学习过对象的概念，它是各种键值对的集合。嗯，是的，事实上 JSON 是起源自 JavaScript 的！

例如：

```javascript
let player = {
    "name": "YZBWDLT",
    "health": 20,
    "hunger": 20,
    "inventory": ["minecraft:stick"], // js 内是允许尾逗号的，但 json 不允许
};
```

如果键名是字符串，还可以把双引号省略掉，例如上面的代码和下面的代码是一致的：

```javascript
let player = {
    name: "YZBWDLT",
    health: 20,
    hunger: 20,
    inventory: ["minecraft:stick"],
};
```

为了访问对象中的属性（即键值对），我们有两种表示方法，分别是`object.key`和`object["key"]`，比如：

```javascript
let player = {
    name: "YZBWDLT",
    health: 20,
    hunger: 20,
    inventory: ["minecraft:stick"],
};
console.log(player.name); // 输出：YZBWDLT
console.log(player["name"]); // 输出：YZBWDLT
console.log(player.pets); // 因为没有 pets 这个键，所以输出 undefined
```

我们还可以通过[解构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring)来提取对象的值。关于解构，读者可以查看我们提供的 MDN 的文档。例如对于上面的代码，可以做如下定义：

```javascript
let player = {
    name: "YZBWDLT",
    health: 20,
    hunger: 20,
    inventory: ["minecraft:stick"],
};
const {name: playerName, health: playerHealth, hunger: playerHunger, inventory: playerInventory} = player;
playerName; // YZBWDLT
playerHealth; // 20
playerHunger; // 20
playerInventory; // ["minecraft:stick"]
```

或者也可以做简化定义，直接采用对象内部的命名：

```javascript
let player = {
    name: "YZBWDLT",
    health: 20,
    hunger: 20,
    inventory: ["minecraft:stick"],
};
const {name, health, hunger, inventory} = player;
name; // YZBWDLT
health; // 20
hunger; // 20
inventory; // ["minecraft:stick"]
```

比较反直觉的一点是——事实上，在 js 中，数组其实是对象的一种。

除了以上类型之外，js 还有 bigint 类型和 symbol 类型，但在 Minecraft 的脚本编写中，这两种类型并不多见，读者可以自行查阅相关信息。

为判断数据类型，我们可以用`typeof`关键字进行判断：

```javascript
typeof 10; // "number"
typeof true; // "boolean"
typeof "true"; // "string"，仍然要注意"true"不等于true！
typeof undefined; // "undefined"
typeof { awa: "qwq" }; // "object"
typeof [1, 2, 3, 4, 5]; // "object"，注意数组返回的是"object"，所以不能用 typeof 判断数组是不是数组
```

特别地，可以用`Array.isArray(...)`来判断一个对象是不是数组，例如：

```javascript
Array.isArray([1, 2, 3, 4, 5]); // true
Array.isArray({ awa: "qwq" }); // false
```

## 运算符

既然是编程语言，自然需要有运算符对数据进行处理和计算。js 的运算符有很多种，我们一一介绍。

### 算术运算符

**算术运算符用于进行基本的数学运算**。主要包括以下几种：`+`（加法）、`-`（减法）、`*`（乘法）、`/`（除法）、`%`（取余）、`**`（取幂）、`++`（自增）和`--`（自减）。例如：

```javascript
2 + 1; // 3
2 - 1; // 1
2 * 1; // 2
2 / 1; // 2
2 % 1; // 0
2 ** 3; // 8
```

自增和自减则是对`number`类型的变量使用的，用于立刻对变量值加 1 或减 1，例如

```javascript
let playerAmount = 0;
playerAmount++;
playerAmount; // 1
playerAmount--;
playerAmount; // 0
```

自增和自减还有很多有趣的性质，比如`var++`和`++var`在返回值上是有不同的，但它们都对`var`自增。感兴趣的读者可以查阅相关文档了解更多。

### 赋值运算符

**赋值运算符主要对一个变量或常量进行赋值**。主要包括以下几种：`=`（直接赋值）、`+=`（加法赋值）、`-=`（减法赋值）、`*=`（乘法赋值）、`/=`（除法赋值）、`%=`（取余赋值）。

请注意：**你必须明确地将`=`和数学中的等号区分开来，这里的`=`是赋值，不是等于**。例如

```javascript
let a = 0;
// 下面这条语句代表将原来的 a（即为 0）加上 2 之后重新赋给 a，此时 a 是 2
// 在数学上，a = a + 2 无论什么情况都不成立
a = a + 2;
console.log(a); // 2
```

它们的格式都为`(变量) (赋值运算符) (值)`，等效于对应的算术运算符做`(变量) = (变量) (算术运算符) (值)`的运算。例如：

```javascript
let a = 0;
a += 3; // 等效于 a = a + 3，即 0 + 3，此时 a 为 3
a -= 5; // 等效于 a = a - 5，即 3 - 5，此时 a 为 -2
a *= -4; // 等效于 a = a * -4，即 -2 * -4，此时 a 为 8
a /= 4; // 等效于 a = a / 4，即 8 / 4，此时 a 为 2
a %= 2; // 等效于 a = a % 2，即 2 % 2，此时 a 为 0
```

### 比较运算符

我们可以对各种数据进行比较，这就需要**比较运算符**了。比较运算符将两个数据作比较，形成一个表达式，并判断这个表达式是否成立。如果成立，就返回`true`，否则就会返回`false`。比较运算符主要包括以下几种：`==`（相等）、`===`（严格相等）、`!=`（不相等）、`!==`（严格不相等）、`>`（大于）、`>=`（大于等于）、`<`（小于）、`<=`（小于等于）。

这里需要强调一下相等和严格相等的关系。因为 js 是一门动态类型的语言，它在检查相等的时候会尝试转换类型，比如会得到下面这样的结论：

```javascript
2 == "2"; // true
```

这很麻烦，这不是我们想要的结果。所幸还有一个严格相等的运算符，会同时检查类型是否一致：

```javascript
2 === "2"; // false
```

因此，**为了避免很多奇怪的问题，一般判断相等都用严格相等（`===`）符号**。当然，避免这种问题的最根本方法还是避免把两种不同类型的东西放在一起比较。

再对其他运算符做一些示例：

```javascript
1 == true; // true，因为对 true 做了类型转换，相当于 1
1 != "1"; // false，因为对 "1" 做了类型转换，相当于 1
1 === true; // false，因为 1 和 true 分别为 number 和 boolean，类型不一
1 !== "1"; // true
30 >= 30; // true
30 > 30; // false
35 <= 40; // true
35 < 25; // false
```

比较反直觉的是，字符串也是可以比较大小的，感兴趣的读者可以查阅相关文档。~*是的，js 就是这么神奇，以至于事实上总有人在吐槽 js 的设计。*~

### 逻辑运算符

我们曾经在讲到红石基础的时候，曾经提过 3 个基本逻辑：与、或、非。它们在 js 分别对应 3 个逻辑运算符：`&&`、`||`、`!`。同样地，我们来举几个最简单的例子：

```javascript
true && false; // 真且假为假，false
true || false; // 真或假为真，true
!true; // 非真为假，false
```

上面的`true`和`false`也可以换为表达式，比如：

```javascript
let value = 5;
value >= 5 && value < 3; // 5 >= 5 为真，5 < 3 为假，真且假为假，false
```

逻辑与和逻辑或运算符也有对应的赋值运算符`&&=`、`||=`，感兴趣的读者可以自行查阅相关文档。

### 其他运算符

此外，还有一些其他的运算符，主要用作条件判断。这主要包括以下几种：

1. 逻辑或（`||`）。对，事实上它也可以是一种条件运算符。它的特殊之处在于，如果它左侧的表达式不成立，就会返回右侧表达式的值，否则返回左侧表达式的值。这个特性通常可以用来做默认值的设定。比如：

   ```javascript
   let playerAmount = 0;
   let amount = playerAmount || 1; // 当 playerAmount 为真值时，则令 amount 等于 playerAmount；否则，令 amount 为 1
   amount; // 1；在这个例子中，因为 0 不是一个真值，所以此时 amount 为 1。
   ```

2. 空值合并运算符（`??`）。它和逻辑或是类似的，但仅当左侧为`null`或`undefined`时才输出右边的值，否则输出左边的值（哪怕是`false`、`0`这种假值）。比如：

   ```javascript
   let playerAmount = 0;
   let amount = playerAmount ?? 1; // 当 playerAmount 不为空值或未定义时，令 amount 等于 playerAmount；否则令 amount 为 1
   amount; // 0；在这个例子中，因为 0 不为空值或未定义，所以此时 amount 为 playerAmount，即为 0。
   ```

3. 可选链运算符（`?.`）。它可以用来保护代码，防止在调用未定义（`undefined`）的方法或属性时出错。例如，对于下面的代码，因为`playerData.inventory`不存在，为`undefined`，试图调用`undefined`的属性`size`会报错，这是很危险的：

   ```javascript
   let playerData = {
       name: "YZBWDLT",
   };
   let playerInventorySize = playerData.inventory.size;
   // 报错 Uncaught TypeError: Cannot read properties of undefined (reading 'size')
   ```

   因此，我们需要用`?.`，这样就变成了`undefined?.size`，而`?.`又能在调用失败时返回`undefined`，这样下面的`playerInventorySize`就变成`undefined`了：

   ```javascript
   let playerData = {
       name: "YZBWDLT",
   };
   let playerInventorySize = playerData.inventory?.size; // undefined
   ```

   这时候，如果我们需要一个有效的默认值，则还能结合空值合并运算符，例如：

   ```javascript
   let playerData = {
       name: "YZBWDLT",
   };
   let playerInventorySize = playerData.inventory?.size ?? 27; // 27
   ```

4. 条件运算符（三元运算符）（`?:`），格式为（`条件 ? 语句 1 : 语句 2`），它用于判断`?`前的条件，并根据结果判断执行何种语句。如果`条件`成立（为`true`等真值）则执行`语句 1`，否则就会执行`语句 2`。

   我们在后面也会学到，这和`if ... else ...`的逻辑是很类似的，因此它常用作`if ... else ...`的简化版本。

   ```javascript
   let hasQuiver = true;
   let maxArrowAmount = hasQuiver ? 64 : 32; // 64，如果 hasQuiver 为 false 则为 32
   ```

除此之外，还有一些位运算符我们没有介绍，因为在实际应用中，它们特别少遇到。如果读者需要，可以查阅相关文档。

### 运算符的优先级

以上介绍到的运算符的优先级各不相同。高优先级的运算符会先行运算，比如`**`会先于`*`进行计算：

```javascript
2 * 3 ** 4; // 162，因为先计算 3 的 4 次方为 81 后，再乘 2
```

很多运算符的优先级和我们在小学就曾学过的运算优先级一致。我们也可以通过添加括号来人为提高一段运算的优先级。

```javascript
(2 * 3) ** 4; // 1296，因为先计算 2*3=6，再计算 6 的 4 次方为 1296
```

有关运算符的优先级，读者可以在 [MDN 的这篇文章](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_precedence)了解更多。

## 条件语句

和我们曾经学习命令时类似，我们经常需要在某些条件下才执行特定代码。这就是条件语句的用途了。条件语句主要有以下这么几类：

### `if`语句 块语句

`if ...`语句的语法是：

```javascript
if (condition) {
    statement;
}
```

即：在`condition`为真值时，执行`statement`的内容。其中，`{...}`叫做**块语句**，代表由多个 JavaScript 语句组成的一整块语句。注意，块语句内部的变量不能给块外使用，比如下面的代码就会因为`a`未定义而报错：

```javascript
{
    let a = 1;
    console.log(a); // 1
}
console.log(a); // Uncaught ReferenceError: a is not defined
```

内部对一个变量重定义后，也不会影响外部的变量：

```javascript
let a = 5;
{
    let a = 1;
    console.log(a); // 1
}
console.log(a); // 5
```

我们来举一个`if`语句的例子：

```javascript
let playerAmount = 0;
if (playerAmount >= 4) {
    console.log("游戏即将开始！"); // 当 playerAmount >= 4 时，执行块语句内的代码
};
```

特别地，如果语句块内只有一个语句的情况下，事实上不需要语句块：

```javascript
let playerAmount = 0;
if (playerAmount >= 4) console.log("游戏即将开始！");
```

### `if else`语句

而`if else`则是用于在条件不通过后执行代码的。语法如下：

```javascript
if (condition) {
    statement1;
}
else {
    statement2;
}
```

当`condition`为真值时，执行`statement1`，否则执行`statement2`。我们来举一个例子：

```javascript
let playerAmount = 0;
if (playerAmount >= 4) {
    console.log("游戏即将开始！"); // 当 playerAmount >= 4 时执行
} // 注意这里不要加分号，因为if else是一体的语句，加分号意味着从中间断开
else {
    console.log("玩家人数不足！"); // 当 playerAmount < 4 时执行
};
```

因为`if else`语句本身是一个语句，所以`if else`是可以嵌套的，即`if ... else if ... else ...`：

```javascript
const item = {
    typeId: "potion_invisibility",
};
if (item.typeId === "potion_jump_boost") {
    console.log("添加了跳跃提升效果！");
}
else if (item.typeId === "potion_speed") { // 当item.typeId不为"potion_jump_boost"时跳转到这里
    console.log("添加了迅捷效果！");
}
else if (item.typeId === "potion_invisibility") { // 当item.typeId不为"potion_jump_boost"和"potion_speed"时跳转到这里
    console.log("添加了隐身效果！");
};
else { // 以上情况全部不满足时跳转到这里
    console.log("未添加任何效果！");
}
```

如果读者写命令和函数（mcfunction）比较多的话，相信这个功能应该是很多开发者所需要的。

### `switch`语句

此外，我们还可以用一种特殊的语句，来检查单个变量的值，并按照这个值的情况执行代码，这就是`switch`语句。它的语法为

```javascript
switch (expression) {
    case caseExpression1:
        statements
    case caseExpression2:
        statements
    // …
    case caseExpressionN:
        statements
    default:
        statements
}
```

在`expression`的值符合`caseExpressionN`时，那么代码将从`caseExpressionN`开始运行，直到遇到`break`终止`switch`语句或`switch`语句本身终止。在所有的`case`都不满足时，从`default`开始执行。例如，对于上面给出的示例代码，我们还可以写成下面的形式：

```javascript
const item = {
    typeId: "potion_invisibility",
};
switch (item.typeId) {
    case "potion_jump_boost":
        console.log("添加了跳跃提升效果！");
        break; // 使用 break 终止 switch 语句，这个 break 是必要的，否则下面的所有代码也都会执行
    case "potion_speed":
        console.log("添加了迅捷效果！");
        break;
    case "potion_invisibility":
        console.log("添加了隐身效果！");
        break;
    default: // 以上情况全部不满足时则从 default 开始执行
        console.log("未添加任何效果！");
        break;
};
```

### 基于对象的条件执行

除此之外，我们还可以通过将要执行的内容写到对象里，并通过调用对象的属性来实现条件执行代码。通常认为，这样做更有助于节省性能。以下是一个示例：

```javascript
const item = {
    typeId: "potion_invisibility",
};
const itemMessage = {
    "potion_jump_boost": "添加了跳跃提升效果！",
    "potion_speed": "添加了迅捷效果！",
    "potion_invisibility": "添加了隐身效果！",
};
console.log(itemMessage[item.typeId] ?? "未添加任何效果！");
// itemMessage[item.typeId] 尝试在 itemMessage 中寻找对应消息，并插入到log()里面
// 而如果没找到，itemMessage[item.typeId] 会返回 undefined，这时用 ?? 做默认值替换
```

## 循环语句

和我们学习命令时一样，我们也总是会遇到循环执行代码的需求。为了循环执行一串代码，我们主要要介绍到 2 种循环语句：`for`语句和`while`语句。

### `while`语句

`while`语句执行循环的逻辑很简单，只要满足条件就开始循环其中的代码。

```javascript
while (condition)
    statement
```

例如，为输出 1~10 的所有数，可以这么做：

```javascript
let num = 1;
while (num <= 10) {
    console.log(num);
    num++;
};
```

:::danger[警告]

使用循环语句必须当心——**你必须保证你的循环代码是能够跳出循环的**！否则一旦代码陷入死循环，不仅要导致极其严重的性能问题（严重到程序将彻底卡死），还会导致此代码后面的逻辑全部失效！比如，这段代码就是极其危险的：

```javascript
let num = 1;
while (num <= 10) { // 每次进入循环时，num 总为 1，无法跳出循环
    console.log(num);
};
```

:::

此外，事实上还有一个`do ... while`语句，但这个语句用得相对较少。感兴趣的读者可以自行查阅相关文档。

### `for`语句

`for`语句相比于`while`语句来说，则允许我们进行初始化变量和每次循环后执行表达式。语法是

```javascript
for (initialization; condition; afterthought)
    statement
```

例如，还是刚刚的代码，我们可以这么定义：

```javascript
// 初始化 num 为 1，在每次循环后都自增，当小于等于 10 时执行代码块的代码
for (let num = 1; num <= 10; num++) {
    console.log(num);
};
```

通常，为了控制一段代码最多执行 n 次，我们更多地用`for`语句，而计数器通常用`i`表示，代表这是第`i`次循环（当然你也可以用更好的变量名来表达）：

```javascript
let n = 10;
for (let i = 0; i < n; i++) {
    console.log(`这是第 ${i + 1} 次执行此代码！`);
};
```

### `break`与`continue`

对于某些情况，我们不能限定一段代码执行多少次，而只在满足特定情况下时跳出循环，那么可以用`break`语句和`continue`语句。

`break`语句用于**直接打破循环，跳转到后续的代码**。例如

```javascript
let num = 1;
while (true) {
    console.log(num);
    num++;
    if (num > 10) break;
};
```

虽然上面的`while (true)`看起来是很危险的，但在代码中我们指定了一个打破循环的方法，所以这也是没有问题的。

而`continue`则用于**终止本次循环，但不打破循环**。例如

```javascript
let num = 1;
while (num <= 10) {
    if (num === 5) {
        num++; // 这里的 num++ 是为了防止 num 不变导致无法跳出循环
        continue;
    };
    console.log(num);
    num++;
};
```

这段代码将输出除了 5 之外的 1~10 之内的数。这段代码其实也可以直接写为

```javascript
let num = 1;
while (num <= 10) {
    if (num !== 5) console.log(num);
    num++;
};
```

但在一些特定情况下，你会需要`continue`的。

### `for in`语句

除了以上应用之外，对于对象这种由多个内容所共同组成的类型来说，我们可以**遍历**其中所有的键值对并输出出来。

**`for in`语句就是专门用来迭代对象的，它把对象里的属性（键名）依次提取出来并用于循环**。它的语法是：

```javascript
for (variable in object)
    statement
```

我们举一个例子：

```javascript
let player = {
    name: "YZBWDLT",
    health: 20,
    hunger: 20,
    inventory: ["minecraft:stick"],
};
for (let property in player) {
    console.log(`player 对象里有属性 ${property}，它的值为 ${player[property]}`);
};
```

这段代码的执行结果是：

```text
player 对象里有属性 name，它的值为 YZBWDLT
player 对象里有属性 health，它的值为 20
player 对象里有属性 hunger，它的值为 20
player 对象里有属性 inventory，它的值为 minecraft:stick
```

数组作为一种特殊的对象，自然也可以用`for in`来迭代其中的属性。读者可以自行尝试。

### `for of`语句

而 **`for of`语句就是专门用来迭代数组、字符串等可迭代对象的**。它会把数组、字符串内的属性值提取出来用于循环。语法是：

```javascript
for (variable of iterable)
    statement
```

我们来举一个例子：

```javascript
for (let num of [1,2,3,4,6,7,8,9,10]) {
    console.log(num);
}
```

它会输出 1~10 中除了 5 之外的所有值。

注意：**一般的对象并不是可迭代对象**，例如下面的代码会报错：

```javascript
let player = {
    name: "YZBWDLT",
    health: 20,
    hunger: 20,
    inventory: ["minecraft:stick"],
};
for (let value of player) { // Uncaught TypeError: player is not iterable
    console.log(`player 对象里有值为 ${value}`);
};
```

## 函数

在实际应用中，我们经常会遇到很多重复的逻辑。我们可以引入一个新的概念——**函数（Function）**，来实现这样重复的功能。

请注意：**请严格把我们在编程领域提到的函数和我们曾在附加包学过的函数的概念区分开**。前者是程序内为执行重复逻辑而创建的代码功能，而后者是由多串命令（或者更具体来说，Minecraft 命令）组成的功能。在本模块，如果未特别指定的情况下，一般都指前者，而后者我们会用函数（mcfunction）或函数文件来指代。

### 函数的定义，调用与返回值

为了定义一个新的函数，我们用`function`关键字来命名。它的具体语法是：

```javascript
function name(param0) {
    statements
}
function name(param0, param1) {
    statements
}
function name(param0, param1, /* …, */ paramN) {
    statements
}
```

即，创建一个名为`name`的函数。例如，创建一个发送消息的函数：

```javascript showLineNumbers
function sendMessage(message) {
    console.log(message);
};

sendMessage("这是我们创建的第一个函数！");
```

这里，我们创建了一个名为`sendMessage`的函数`sendMessage(message)`，它接收一个参数`message`。使用已创建的函数的过程称为**调用函数**。在调用函数时，我们写为`sendMessage()`，并按照它的要求传入参数。

我们也可以引入前面介绍过的一种特殊的注释 JSDoc。它可以让 VSC 等编辑器知道它的用途和参数允许的类型。这里，我们就声明了`message`的类型为`string`，即字符串。我们在后面，**用`变量: 类型`来传达`变量`的数据类型应当为`类型`的信息**。事实上，你已经在 Minecraft 的命令中见过这样的表达方法了！例如，这里我们就会写为`sendMessage(message: string)`。

```javascript showLineNumbers
/** 发送消息
 * @param {string} message
 */
function sendMessage(message) {
    console.log(message);
};

sendMessage("这是我们创建的第一个函数！");
```

不同参数间用逗号分隔。例如我们要做一个加法的函数：

```javascript showLineNumbers
/** 对两个值进行相加，然后输出
 * @param {number} value1
 * @param {number} value2
 */
function add(value1, value2) {
    console.log(value1 + value2);
};

add(0.1, 0.2); // 不同参数间用逗号分隔，这里代表 value1 = 0.1, value2 = 0.2
```

顺带一提，读者会注意到这个东西最后输出为`0.30000000000000004`。要解释这个问题比较复杂，总体来说是因为浮点数的计算总是会导致误差。读者可以阅读其他文档了解更多。

那如果我们要从函数内部获取一些东西要怎么办呢？这时候我们可以用`return`语句来返回特定的内容，这个特定的内容就是**返回值**。比如，我们希望创建一个求 x²+1 的函数，可以这么做：

```javascript showLineNumbers
/** 获取 value 的平方 + 1
 * @param {number} value
 */
function getSquaredPlusOne(value) {
    return value ** 2 + 1;
};

let a = getSquaredPlusOne(3);
console.log(a); // 10
```

我们看到，首先我们定义了一个函数`getSquaredPlusOne(value: number)`，因为它对一个`number`值做计算，所以返回值也是一个`number`，这样，我们通常用`getSquaredPlusOne(value: number): number`来完整地表示一个函数。

事实上，这正是 TypeScript 对一个函数的表达方式，即 **`函数名(参数0: 类型, 参数1: 类型, ...): 返回值类型`**。随着读者阅历的不断增多，读者可能也会对 TypeScript 感兴趣。**读者需要培养看懂函数信息的能力，因为后面用到的文档总要和这些东西打交道**。例如：

- 对于前面的`sendMessage`函数，完整地写来应该是`sendMessage(message: string): void`，**因为没有用`return`指定返回值，默认的返回值就是`undefined`**（`void`也是一个语句，最终返回值为`undefined`）。
- 对于前面的`add`函数，完整地写来应该是`add(value1: number, value2: number): void`。
- 而对于刚刚的`getSquaredPlusOne`函数，它的类型是`getSquaredPlusOne(value: number): number`。

回过头来，接下来我们让一个变量`a`等于`getSquaredPlusOne(3)`的返回值，这个顺序是：先执行这个函数，做完计算之后，把返回值赋给`a`。这样，`a`便等于 3²+1=10 了。

有了函数之后，很多情况下它便可以大幅简化我们的工作。在此请读者注意：**不要重复造轮子，如果遇到重复功能，不要吝啬，请创建一个新的函数，因为你永远不知道这些功能什么时候会被更改**。

### 默认值

在 js 中，如果不给函数传入任何值，那么其中的参数就会变为`undefined`。很多情况下，这或许不是我们想要的结果。例如

```javascript showLineNumbers
/** 获取 value 的平方 + 1
 * @param {number} value
 */
function getSquaredPlusOne(value) {
    return value ** 2 + 1;
};

let a = getSquaredPlusOne(3); // 10
let b = getSquaredPlusOne("awa"); // NaN
let c = getSquaredPlusOne(); // NaN，因为此时 value = undefined
```

对于这种情况，我们可以考虑做类型检查，并结合`if else`语句来保护这个函数：

```javascript showLineNumbers
/** 获取 value 的平方 + 1
 * @param {number} value
 */
function getSquaredPlusOne(value) {
    if (typeof value === "number") {
        return value ** 2 + 1;
    }
    else {
        return undefined;
    }
};

let a = getSquaredPlusOne(3); // 10
let b = getSquaredPlusOne("awa"); // undefined
```

这样这个函数就变为`getSquaredPlusOne(value: number): number | undefined`。注意我们用`类型1 | 类型2`表示一个值可能是类型 1，也可能是类型 2。

而更多情况下，我们其实更推荐使用`return`。`return`会立刻中止函数，无论这个函数运行到什么地方，运行到什么地步。所以通常，我们也可以用`return`结构来优化许多的`if else`链：

```javascript showLineNumbers
/** 获取 value 的平方 + 1
 * @param {number} value
 */
function getSquaredPlusOne(value) {
    // 如果不为 number 就直接终止代码运行
    // 提前终止代码有助于防止后续冗杂的 else 判断，节省性能
    // 这里 return; 等效于 return undefined;，一般也用void 0来得到undefined
    if (typeof value !== "number") return;
    // 能执行到这里代表 value 一定是 number，进行计算
    return value ** 2 + 1;
};
```

当然，我们还有一计 —— 引入**默认值（Default Value）**。我们可以在一个参数后面用一个`=`接上一个值，这样如果这个参数没有传入，就会使用这个默认值。例如

```javascript showLineNumbers {4}
/** 获取 value 的平方 + 1
 * @param {number} value
 */
function getSquaredPlusOne(value = 0) {
    if (typeof value !== "number") return;
    return value ** 2 + 1;
};

let a = getSquaredPlusOne(); // 1，此时 value 未传参，默认为 0
```

此时，我们认为带有默认值的参数为**可选参数**，这和当时我们学习命令时的逻辑是一样的。我们用`value?: number`（即带有问号的`?:`）来表示这是一个可选参数。这样这个函数就变为`getSquaredPlusOne(value?: number): number | undefined`。

如果不希望它的返回值是`undefined`，可以继续改进这个函数，比如输出为`-1`，这样这个函数就变为`getSquaredPlusOne(value?: number): number`：

```javascript showLineNumbers {5}
/** 获取 value 的平方 + 1
 * @param {number} value
 */
function getSquaredPlusOne(value = 0) {
    if (typeof value !== "number") return -1;
    return value ** 2 + 1;
};
```

当然，很多情况下，只要不要乱传参（例如声明了应为`number`还传入`string`，这是自找麻烦），通常能避免很多错误。

### 箭头函数

我们也可以使用一种比较新的格式来定义一个函数：

```javascript
(param0) => {
    statements
}
(param0, param1) => {
    statements
}
(param0, param1, /* …, */ paramN) => {
    statements
}
```

这叫**箭头函数（Arrow Function）**。箭头函数通常是为了简化写法而使用的，并且它还具有一些其他的性质，在后面介绍到的类里通常使用较多。

我们可以像定义一个普通的变量一样定义一个箭头函数：

```javascript
/** 获取 value 的平方 + 1
 * @param {number} value
 */
const getSquaredPlusOne = (value = 0) => {
    if (typeof value !== "number") return -1;
    return value ** 2 + 1;
};

getSquaredPlusOne(3); // 10
```

如果表达式简单，这个表达还能得到进一步简化：

```javascript
/** 获取 value 的平方 + 1
 * @param {number} value
 */
const getSquaredPlusOne = value => value ** 2 + 1;
getSquaredPlusOne(3); // 10
```

即，在只有一个参数和一个表达式的情况下可以分别简化掉括号`()`和后面的花括号`{}`。

### JavaScript 提升

函数是一个比较特殊的东西，它具有一个性质：**JavaScript 提升（JavaScript Hoisting）**。所谓 JavaScript 提升，其实就是你可以先用再声明，就像这样：

```javascript
square(5); // 25

function square(value) {
    return value ** 2;
};
```

对于一般的变量，就不能这么干：

```javascript
let result = num ** 2; // Uncaught ReferenceError: num is not defined
let num = 5;
```

基本原理是，具有提升性质的对象（比如函数、类、导入语句），会在解析时就自动把它们挪到代码开头。读者如果感兴趣，可以查阅 [MDN 的这篇文章](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)了解更多。

### 匿名函数 立即执行一个匿名函数

事实上我们可以不对一个函数命名。例如，下面的函数就是没有名字的函数，这样的函数叫做**匿名函数（Anonymous Function）**。

```javascript showLineNumbers {4}
/** 获取 value 的平方 + 1
 * @param {number} value
 */
function (value = 0) {
    if (typeof value !== "number") return;
    return value ** 2 + 1;
};
```

匿名函数因为没有办法按照常规的方法调用，通常都是即时定义即时调用的。例如：

```javascript showLineNumbers
let square = function (value = 0) {
    return value ** 2
};
```

这叫做**函数表达式（Function Expression）**。这里实质上是创建了一个对该函数的引用。虽然和一般的函数相比，我们都是通过`squared()`来调用这个函数，但这样定义的函数不会有提升。

此外，我们还可以定义一个函数并立刻执行一次：

```javascript showLineNumbers
let square = (function (value = 0) {
    return value ** 2
})(5); // 25
```

在这段代码中，使用括号`()`将函数整体包裹起来，并在后面接上一个`()`，代表立即执行这个函数。你也可以写成箭头函数的形式：

```javascript showLineNumbers
let square = (value => value ** 2)(5); // 25
```

### 回调函数

回调函数是指将一个函数作为另一个函数的参数。是的，函数本身也能作为参数！例如下面这个例子：

```javascript showLineNumbers
function calculate(x, calculateFunc) {
    calculateFunc(x)
};

calculate(5, value => 2 * value + 1); // 11
```

这段代码传入了`x`为 5，并且传入了一个计算的匿名函数`value => 2 * value + 1`，即 2x+1，显然它接收一个参数`value`。在实际计算时，`calculate`函数会把`x`传入到匿名函数的`value`里面，并执行这个匿名函数的逻辑。

回调函数是很重要的，在 SAPI 的所有事件中都要用到回调函数。

### 递归

## 类

### 类的定义、属性与方法

### 类的实例化

### 类的继承

### 静态方法

## 数组常用方法

## 字符串常用方法

## 对象常用方法

## 模块导入

## 生成器与迭代器

## 异步
