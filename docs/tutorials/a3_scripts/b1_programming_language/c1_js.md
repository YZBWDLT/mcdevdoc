---
sidebar_position: 1
---

# 1.1 JavaScript 基础

> 上次更新：2026 年 3 月 9 日

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

## 条件语句

### `if ...`

### `if ... else ...`

### `if ... else if ... else ...`

### `switch ... case ...`

### 基于对象的条件执行

## 循环语句

### `for`循环

### `while`循环

### 递归

### `break`与`continue`

## 函数

### 匿名函数

### 回调函数

## 类

### 类的定义、属性与方法

### 类的实例化

### 类的继承

### 静态方法

## 数组常用方法

## 字符串常用方法

## 对象常用方法

## 生成器与迭代器

## 异步
