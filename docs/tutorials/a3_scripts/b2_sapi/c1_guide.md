---
sidebar_position: 1
---

# 2.1 ScriptAPI 入门

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

在学习了 JavaScript 之后，我们就可以正式开始学习 ScriptAPI 了。随着[网易宣布 3.9 版本引入 ScriptAPI](https://www.bilibili.com/opus/1208160569399443608?spm_id_from=333.1387.0.0)，显然 SAPI 已经成为包括中国版开发者在内的全体开发者的必修课程。

应该指明的是，**读者学会了 JavaScript 的基础操作之后，其实就已经学会 50% 的 SAPI 了**！而要学会另外的 50%，我们只需要领读者入个门就可以了！是的，因为脚本的逻辑事实上是相当简单的。我们在模块 1 学习了命令、在模块 2 学习了附加包，已经对 Minecraft 的基础概念十分熟悉，所以一旦读者能够成功入门，就可以迅速地学会 SAPI 并投入使用！

## 配置自动补全

:::warning[注意]

本部分所介绍的内容仅电脑端可用。对于手机端的开发者，仍然可以选用 MT 管理器等编辑器进行代码的编写，但读者需要经常查阅文档，并需要注意可能出现的报错（例如调用`undefined`的属性）无法及时地提示出来。在条件允许的情况下，我们强烈建议使用 VSC 进行脚本代码的编写！

:::

编写代码，自动补全不可谓不重要。有自动补全可以大幅提高我们的开发效率，并减少可能出现的错误。在本文，我们依然会使用 VSC 来进行代码的编写，因为只要进行一些简单的配置，VSC 可以在我们编写脚本的过程中提供十分强大的自动补全！

### 下载`node.js`

首先，我们需要下载 node.js。简单来说，它允许我们在除了浏览器之外的地方编写 JavaScript 代码并运行。我们下载它的目的也很简单，**就是为了使用一个官方提供的自动补全包**。我们进入它的官网：[https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)：

![node_js_1](/img/tutorials/a3_scripts/b2_guide/c1_sapi/node_js_1.png)

点击**获取 Node.js**，选择**Windows 安装程序 (.msi)**，这会自动下载 node.js 的安装程序。如果你是用的不是 Windows，可以按需下载。

![node_js_2](/img/tutorials/a3_scripts/b2_guide/c1_sapi/node_js_2.png)

我们打开刚下载好的安装程序，稍等一会儿后点 Next，接受协议并一路点 Next 安装即可。继续稍等一会儿，在 Node.js 安装过后点击 Finish，我们就可以关掉 Node.js 了。

### 下载官方的自动补全包

Node.js 可以从外部下载依赖库、工具包等，我们这里主要使用的就是 Node.js 自带的包管理工具 NPM（Node Package Manager）。Mojang 在 NPM 上发布了 ScriptAPI 的接口包。

ScriptAPI 的**正式版**的包主要由两部分组成：

- **服务端脚本，即`@minecraft/server`**（也称作`server`模块），专门用来处理游戏中的各种事件，或调用游戏的各种接口，是最核心的脚本内容。
- **服务端 UI 脚本，即`@minecraft/server-ui`**（也称作`server-ui`模块），专门用来调用一个可供玩家操作、选择、输入的 UI，并根据玩家输入的内容处理逻辑。
  - 是的，你没看错，**是直接调用一个新的 UI**！这就是非脚本手段无法实现的内容了。

此外，ScriptAPI 还拥有大量的测试版的包，这些包必须开启「测试版 API」实验性玩法才能使用，比如`@minecraft/server-gametest`等，因为长期没有“转正”，在本教程系列中我们就不再过多赘述，感兴趣的读者可以自行查阅并学习。

以及，ScriptAPI 并不是所有包都可以直接使用的，例如**官方提供的`@minecraft/vanilla-data`模块事实上并不是内置于游戏中的模块**，而只是方便 TypeScript[^1] 脚本的编写者编写逻辑的，因此在我们本节使用的 JavaScript 脚本中，是不能直接使用这个模块的。基本上， **JavaScript 脚本可用的模块就只有`server`和`server-ui`两种模块**。在未来讲到 TypeScript 脚本的时候，我们会强调其他模块的更多细节。

[^1]: 在讲到 JavaScript 的时候曾提过，这是一个由微软定义的 JavaScript 的方言，在编程领域十分流行，必须把 TypeScript 脚本编译为 JavaScript 脚本才能直接使用。

现在我们来下载官方的自动补全包。打开**终端**的**命令提示符**[^2]，和 Minecraft 的命令方块类似，这就是 Windows 的命令控制台。我们来输入以下命令：

```bat
npm i @minecraft/server
```

在稍等一会儿后，node.js 应该会为你自动安装服务端脚本的补全包。

![npm_1](/img/tutorials/a3_scripts/b2_guide/c1_sapi/npm_1.png)

这些补全包是安装在 Windows 的`C:\Users\(你的用户名)\node_modules\@minecraft\server\`文件夹里的，如果读者感兴趣可以看看这些文件。最核心的文件就是其中的<FileType type="file" name="index.d.ts"/>了，它是用于自动补全的重要文件。

[^2]: 命令提示符可以在 Windows 的搜索找到；可以右键 Windows 的开始菜单打开终端；也可以使用<kbd>Win</kbd>+<kbd>R</kbd>运行`cmd`打开命令提示符。

同样地，我们来继续输入以下命令：

```bat
npm i @minecraft/server-ui
```

![npm_2](/img/tutorials/a3_scripts/b2_guide/c1_sapi/npm_2.png)

这样，我们就把两个核心补全包给安装好了！现在我们就可以关闭命令提示符了。

### 脚本版本

当然，还有一些事情要强调。脚本也是拥有一套属于自己的版本管理系统的，这意味着脚本系统同样拥有向下兼容性（这和网易的 ModAPI 是不同的，网易的脚本不具有向下兼容性）。脚本自 1.19.50 发布以来，几乎每次大小更新（不含热更新）都会引入大量有关脚本的接口、事件，甚至游戏的新特性等。

第一，**和格式版本不同，脚本的版本并不跟随游戏版本**。例如 1.19.50 初次正式开放 ScriptAPI 时，只有`server`模块的`1.0.0`版本是可用的；1.21.0 则有`server`模块的`1.11.0`版本和`server-ui`模块的`1.1.0`版本可用。因此，要使用哪个游戏版本的脚本，就需要查找对应的脚本版本。我们在[文档：脚本版本对应表](/docs/docs/scripts/sapi/version_table)中整理了脚本版本，读者可按需查阅。

第二，脚本是可能会出现**破坏性更改**的，也就是会出现**旧版本脚本写法和新版本脚本写法不兼容**的情况。例如 1.21.90 就引入了`server`模块和`server-ui`模块的`2.0.0`版本。直接在 1.21.90 使用`1.x.0`版本的脚本是没有问题的，但强行升级到`2.0.0`则会报错，需要额外的适配了。未来，如果脚本版本的主版本号发生变更，我们需要知道这个版本存在破坏性更改。

第三，这也意味着**高版本的脚本在低版本下同样有可能是不适用的**。我们刚刚安装自动补全时，安装的都是最新版本的脚本。如果读者需要旧版本包的自动补全，可以在使用`npm`命令时声明版本，例如

```bat
npm i @minecraft/server@2.0.0
npm i @minecraft/server-ui@2.0.0
```

这样的话，NPM 会自动安装`2.0.0`版本的`server`模块和`2.0.0`版本的`server-ui`模块。

## 编写第一个脚本

现在终于到了我们的重头戏——我们现在来编写第一个脚本吧！比如……**在玩家使用木棍时公告`Hello, world!`**！

通过模块 2 的学习我们知道，要使玩家使用物品时执行命令是很复杂的，需要使用行为包的动画控制器，并修改`player.json`，会极大地降低对其他模组的兼容性。而现在有了脚本，我们就可以更进一步！

### 修改清单文件

首先需要让游戏知道我们要使用脚本。我们来打开行为包的清单文件，为我们的清单文件新增以下高亮内容：

```json showLineNumbers title="manifest.json" {16-22,24-33}
{
    "format_version": 2,
    "header": {
        "name": "实验行为包",
        "description": "",
        "uuid": "60d33b76-0916-4943-8f0e-b027603365eb",
        "version": [1, 0, 0],
        "min_engine_version": [1, 21, 90]
    },
    "modules": [
        {
            "type": "data",
            "uuid": "b02118b3-8fcf-4bba-bf53-dce1d1ae0f3e",
            "version": [1, 0, 0]
        },
        {
            "type": "script",
            "uuid": "1473806f-de25-4d62-bb2a-d3b71750aa62",
            "version": [1, 0, 0],
            "entry": "scripts/main.js",
            "language": "javascript"
        }
    ],
    "dependencies": [
        {
            "module_name": "@minecraft/server",
            "version": "2.0.0"
        },
        {
            "module_name": "@minecraft/server-ui",
            "version": "2.0.0"
        }
    ]
}
```

做一个简单的解释：

- 第一个高亮是声明我们需要使用脚本模块，并且**将入口文件设置为`scripts/main.js`**。其中，`uuid`和`version`可以随意设置，只要不要让这个`uuid`和其他地方重复。入口文件会在游戏加载时，或者`/reload`后执行一次。
- 第二个高亮则是声明我们需要使用的脚本模块，我们这里设置为使用`2.0.0`的`server`模块和`2.0.0`的`server-ui`模块。越高的版本，可使用的脚本功能也就越多，我们建议开发者与时俱进，尽可能使用更高版本的正式版脚本。

### 编写脚本逻辑

现在，我们来创建我们刚设定的入口文件。在行为包下创建一个文件夹<FileType type="folder" name="scripts"/>，再在下面创建一个新文件<FileType type="file" name="main.js"/>。现在，你的项目内应该有这些文件：

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
  - ……
  - <FileType type="folder" name="scripts" />：脚本
    - <FileType type="file" name="main.js" />：主文件

</treeview>

我们来写入脚本吧！首先，我们可以启用 TypeScript 级别的类型检查：

```js showLineNumbers title="main.js"
// @ts-check

```

引入这个注释就可以启用 TypeScript 级别的类型检查了。TS 的类型检查是很严格的，它在检查到类型不正确、检查不到特定变量名等情况的时候就会出现报错，提醒开发者这里可能出现错误。而且，这个注释并不会影响程序的正常运行。使用 TS 级别的类型检查可以很大程度上避免程序运行时因为变量类型不当而发生报错。

现在，我们来导入 Minecraft 的`server`模块，使用其中的`world`常量：

```js showLineNumbers title="main.js" {3}
// @ts-check

import { world } from "@minecraft/server";

```

`world`常量代表这个世界，它是由`World`类实例化而来的，可以用来获取这个世界的大量信息，并让这个世界做一些事情。需要注意，`World`类的构造函数是**私有（Private）** 属性，这意味着我们是不能够实例化`World`类的，而只能使用游戏本体通过`World`类实例化之后提供的`world`常量。

例如，对于我们的需求，我们需要让玩家在使用木棍时执行代码，这样的话，我们就可以这么写：

```js showLineNumbers title="main.js" {5}
// @ts-check

import { world } from "@minecraft/server";

world.afterEvents.itemUse.subscribe(event => {});

```

这里我们又添加了一行，但这一行需要做很多解释。我们现在在做的事情是在**订阅事件（Subscribe Event，也可以称为监听事件，Listen Event）**。游戏内有着形形色色的不同的事件，比如玩家使用物品、玩家破坏方块、玩家攻击生物等。在订阅了事件之后，游戏就会在这个事件发生之后执行我们预先就定义好的函数。

- 首先，我们调用了`world`的`afterEvents`属性，也就是**世界后事件（World After Events）**。**后事件是指已经发生了的，无法阻止既定事实的事件，并且在这个事件发生之后能够返回这个事件的一些基本信息**。例如，玩家对一个方块交互也是一个事件，玩家和工作台交互后，游戏引擎会认定玩家与工作台交互过，然后再执行我们给出的代码。

  与后事件相对的概念是**前事件（Before Events）**，即**在事件发生之前就可以返回事件的基本信息的事件**。并且**多数前事件都可控制是否允许这个事件发生**，例如同样是玩家对方块交互的事件，如果通过前事件取消这个事件的发生，游戏引擎就会认定玩家和工作台没有交互过，连工作台的 UI 都不会弹出！但是，**前事件的使用具有一定限制，不必要的话使用后事件会相对稳定一些**。因此，我们这个例子中，只需要使用后事件就可以了。
- 然后，我们调用了`afterEvents`的`itemUse`属性，这个属性所对应的就是使用物品的后事件。
- 接下来，我们调用了`itemUse`的`subscribe`方法，这个方法接收一个参数`callback: (arg0: ItemUseAfterEvent) => void`，我们注意到这个参数的类型是一个函数。这种**函数 A 作为另一个函数 B 的参数的情况并不少见，我们将函数 A 称为回调函数（Callback Function）**。

  这里的回调函数是一个单参数的函数，因此我们传入了一个匿名函数`event => {}`，参照回调函数的参数类型，我们知道这里的`event`的类型是`ItemUseAfterEvent`，这里的`ItemUseAfterEvent`就代表事件的基本信息。

所以，这一行实际在做的事情是，**订阅玩家使用物品后事件，并把事件信息传递给回调函数内的`event`**。

顺带一提，如果一切正常，读者应当能够看到自动补全：

![first_program_1](/img/tutorials/a3_scripts/b2_guide/c1_sapi/first_program_1.png)

借助自动补全，我们同样可以看`event`有哪些可访问的属性：

![first_program_2](/img/tutorials/a3_scripts/b2_guide/c1_sapi/first_program_2.png)

可以看到，我们可以访问`itemStack`，也就是使用的物品的信息；同时也可以获取`source`，获取使用者的信息。我们来写代码：

```js showLineNumbers title="main.js" {6-8}
// @ts-check

import { world } from "@minecraft/server";

world.afterEvents.itemUse.subscribe(event => {
    if (event.itemStack.typeId === "minecraft:stick") {
        world.sendMessage(`Hello, world!`);
    }
});
```

读者应当能比较容易地看懂新增的这段代码的含义，也就是当物品的`typeId`是`minecraft:stick`时，就会执行``world.sendMessage(`Hello, world!`)``。这里我们调用了世界`world`的方法`sendMessage(message: string | RawMessage | (string | RawMessage)[]): void`，只需要传入一个字符串即可。

现在我们进入游戏，来拿出木棍试一试效果：

![first_program_3](/img/tutorials/a3_scripts/b2_guide/c1_sapi/first_program_3.png)

啊哈！你看，这就成功了，是不是其实并不算难呢？我们刚刚使用后事件写出了一段简洁而优雅的代码哦，不需要什么动画控制器，也不需要什么实体文件，更没有任何物品限制，连原版物品都照样适用！这就是脚本系统的威力！

## 世界前事件

### 可取消的事件

现在我们再来编写一个世界前事件的例子。比如各路服务器中都十分常见的——禁止生存模式破坏方块！显然，这是一个需要我们阻止事件发生的要求，这就必须要使用世界前事件了。我们来看世界前事件有什么能用的……

![before_events_1](/img/tutorials/a3_scripts/b2_guide/c1_sapi/before_events_1.png)

嗯，这个`playerBreakBlock`就不错！显然，它应该是玩家破坏方块的前事件，只要我们阻止这个事件，玩家就不再能够破坏方块。这样，我们就可以来订阅这个事件：

```js showLineNumbers title="main.js" {11}
// @ts-check

import { world } from "@minecraft/server";

world.afterEvents.itemUse.subscribe(event => {
    if (event.itemStack.typeId === "minecraft:stick") {
        world.sendMessage(`Hello, world!`);
    }
});

world.beforeEvents.playerBreakBlock.subscribe(event => {});

```

我们来看看这个事件有什么可以指定的：

![before_events_2](/img/tutorials/a3_scripts/b2_guide/c1_sapi/before_events_2.png)

看起来，可以获取的有：方块信息`block`、是否取消这个事件`cancel`、维度信息`dimension`、破坏方块使用的物品`itemStack`，以及破坏方块的玩家`player`。我们正是需要`cancel`属性！所以，直接把`cancel`指定为`true`：

```js showLineNumbers title="main.js" {12}
// @ts-check

import { world } from "@minecraft/server";

world.afterEvents.itemUse.subscribe(event => {
    if (event.itemStack.typeId === "minecraft:stick") {
        world.sendMessage(`Hello, world!`);
    }
});

world.beforeEvents.playerBreakBlock.subscribe(event => {
    event.cancel = true;
});

```

然后，我们只需要`/reload`即可重载我们的脚本，同样十分方便！现在读者会发现自己连一株向日葵都无法破坏：

![before_events_3](/img/tutorials/a3_scripts/b2_guide/c1_sapi/before_events_3.png)

当然了，什么都无法破坏肯定不好。我们可以更进一步，当玩家空手时才无法破坏。这样，我们就需要获取玩家破坏方块使用的物品`itemStack`。注意到这个属性是`itemStack?`，**后面带了一个`?`，表示这个属性是可选值**，它有可能返回`undefined`。不难猜测，返回`undefined`的时候应该就是玩家空手的时候，我们就可以利用这一点：

```js showLineNumbers title="main.js" {2}
world.beforeEvents.playerBreakBlock.subscribe(event => {
    if (event.itemStack) return;
    event.cancel = true;
});
```

这里第 2 行是指，如果`event.itemStack`是一个真值，也就是它不是`undefined`的时候，就返回。返回什么呢？我们没有指定，也就是这里默认返回的就是`void`。返回什么并不重要，重要的是，一旦程序遇到`return`，这个函数会直接终止，下面的代码就不再执行。因此，这个第 2 行的意思就是指，当`itemStack`是一个有效内容的时候，我们就不再执行阻止事件发生的代码。

**这种`if (...) return;`的写法是很常见的，它可以有效地防止多层`if`嵌套，提升代码的可读性**。

现在我们再来`/reload`，会发现只要我们手里有东西就可以破坏方块了，而空手就不能破坏：

![before_events_4](/img/tutorials/a3_scripts/b2_guide/c1_sapi/before_events_4.png)

### 执行权限 `system`常量

我们不妨再来加一些新功能，比如提醒玩家并播放音效：

```js showLineNumbers title="main.js" {4-6}
world.beforeEvents.playerBreakBlock.subscribe(event => {
    if (event.itemStack) return;
    event.cancel = true;
    const player = event.player;
    player.sendMessage(`§c你不能在空手时破坏方块！`);
    player.playSound("mob.villager.no");
});
```

然而，我们发现游戏出现了报错：

![before_events_5](/img/tutorials/a3_scripts/b2_guide/c1_sapi/before_events_5.png)

```text
[Scripting][error]-[实验行为包] ReferenceError: Native function [Player::playSound] cannot be used in restricted execution.    at <anonymous> (main.js:16)
```

简单翻译一下：

「RefrenceError：函数 [Player::playSound] 不能在受限执行下使用。位于\<匿名函数> （main.js：第 16 行）」

看来我们在这里遇到了一个特殊的**执行权限（Execution Privilege）**：**受限执行（Restricted Execution）**。

我们先来介绍什么是执行权限。为了脚本代码的运行稳定，Mojang 规定了部分代码在某些特殊时刻是不能执行的。目前一共有 3 种执行权限：

1. **默认执行（Default Execution）**：这种权限下，一切代码都可以正常执行。
2. **受限执行**：这个权限通常**是前事件环境中使用的**。在受限执行下，**一切可能对世界造成更改的操作都会被拦截并报错**，这是为了前事件的执行稳定。我们播放音效的操作也可以认为是可能对世界造成更改的操作，因此被拦截掉了。
3. **早期执行（Early Execution）**：这个权限则是**在世界完全加载前使用的，在`2.0.0`的脚本中引入**。在早期执行下，**一切需要访问世界信息的操作都会被拦截并报错**。事实上，如果读者已经习惯编写函数（mcfunction），会发现 mcfunction 会在世界完全加载之前就开始执行，并导致某些奇奇怪怪的问题，早期执行就是为了防止这种情况发生的。因此，为了代码正常运行不报错，我们通常都需要使用世界加载后事件`world.afterEvents.worldLoad`，来执行可能会在早期执行阶段出错的代码。

难道受限执行就意味着我们就什么都做不了了吗？当然不是，既然在事件发生前不能执行，我们可以延后到事件发生之后执行嘛。这就需要使用 **`system`常量**了。和`world`类似，`system`也是从`System`类经过游戏实例化之后得到的常量，**用来控制游戏引擎的行为**。从`system`中，我们可以得到游戏运行到多少刻的信息，以及延迟或循环执行代码。这里，我们使用`system`常量的`run(callback: () => void): number`方法：

```js showLineNumbers title="main.js" {1,8,12}
import { world, system } from "@minecraft/server";

...

world.beforeEvents.playerBreakBlock.subscribe(event => {
    if (event.itemStack) return;
    event.cancel = true;
    system.run(() => {
        const player = event.player;
        player.sendMessage(`§c你不能在空手时破坏方块！`);
        player.playSound("mob.villager.no");
    });
});
```

- 首先，不要忘记还要导入`system`常量。
- 其次，简单介绍一下 **`run`方法**，这个方法可以**在本游戏刻内的前事件执行完毕后执行其中的代码**，或者**在后一个游戏刻等待执行代码**，即**延迟执行代码**。因此，只要前事件执行完毕并退出受限执行，在`run`里头的函数就可以正常执行。
- 此外，我们看到`run`方法接收一个回调函数并返回一个数值，数值是取消这个延迟队列用的，我们在后面的教程中会详细介绍。

![before_events_6](/img/tutorials/a3_scripts/b2_guide/c1_sapi/before_events_6.png)

现在就可以看到，它不会再有问题了！

### 早期执行

在`2.0.0`脚本更新之前，如果我们把脚本直接写在脚本的根位置，脚本可以正常运行，不会出现问题。然而，刚刚我们提过，为了脚本能够正确运行，`2.0.0`引入了早期执行，这就导致只有一小部分的 API 可以写在脚本的根位置，主要是前事件、后事件、以及各类运行函数（`system.run*`），而其他的 API 几乎都没有直接早期执行的权限。例如：

```js showLineNumbers title="main.js"
import { world, system } from "@minecraft/server";

world.sendMessage("Hello, world");
```

很遗憾，这段代码将会直接报错：

![early_execution_1](/img/tutorials/a3_scripts/b2_guide/c1_sapi/early_execution_1.png)

```text
[Scripting][error]-[实验行为包] ReferenceError: Native function [World::sendMessage] cannot be used in early execution.    at <anonymous> (main.js:21)
[Scripting][error]-Plugin [实验行为包 - 1.0.0] - [main.js] ran with error: [ReferenceError: Native function [World::sendMessage] cannot be used in early execution.    at <anonymous> (main.js:21)
```

简单翻译一下：

「RefrenceError：函数 [World::sendMessage] 不能在早期执行下使用。位于\<匿名函数> （main.js：第 21 行）」

因此，我们必须使用世界加载后事件，这样写完的代码就不会再出现问题了。

```js showLineNumbers title="main.js" {3-5}
import { world, system } from "@minecraft/server";

world.afterEvents.worldLoad.subscribe(event => {
    world.sendMessage("Hello, world!");
});
```

![early_execution_2](/img/tutorials/a3_scripts/b2_guide/c1_sapi/early_execution_2.png)

## 编写循环逻辑

我们知道，循环执行代码也是很重要的，我们编写的模组的很多逻辑都是要循环执行的。Mojang 也同样提供了一套十分好用的循环执行逻辑，也就是使用`system`的`runInterval(callback: () => void, tickInterval?: number): number`方法，也就是**间隔执行**。我们看到这个方法接收两个参数：

1. `callback`：接收一个函数，写入需要执行的逻辑。
2. `tickInterval`：每次循环执行的间隔，单位是游戏刻。例如设置为 20 时，就会每 20 游戏刻执行一次`callback`函数的内容。

那么，我们来写一个玩家潜行的检测吧！当玩家潜行时，我们就发送快捷栏标题：「你正在潜行！」，否则发送「你没在潜行！」，显然这是需要高频循环检测的。

我们还是一步一步来。首先先使用间隔执行的方法：

```js showLineNumbers title="main.js"
system.runInterval(() => {});
```

写入逻辑，我们可以看到`world`类并没有什么直接播放快捷栏标题的方法，因此我们需要先获取玩家的信息才行：

```js showLineNumbers title="main.js"
system.runInterval(() => {
    world.getPlayers().forEach(player => {});
});
```

这里我们使用了`world`的`getPlayers(options?: EntityQueryOptions | undefined): Player[]`方法，它可以返回全体玩家或指定玩家的信息数组。然后，使用数组内置的`forEach`方法进行遍历，对每个玩家都执行`player => {}`函数，这里的`player`的类型就是`Player`类了。

现在我们来检查玩家是否潜行，我们发现`Player`类下面可以直接获取`isSneaking`属性：

![loop_1](/img/tutorials/a3_scripts/b2_guide/c1_sapi/loop_1.png)

看，这就是脚本相比于命令的优势，获取玩家的相关属性就是如此简单粗暴！`isSneaking`属性是一个类型为`boolean`的**只读（Read Only）属性**，注意它是不允许修改的，SAPI 中有很多属性都是这种只读属性，一旦试图更改就会报错。

那么，我们可以用最简单粗暴的`if - else`语句来判断玩家是否潜行：

```js showLineNumbers title="main.js" {3-7}
system.runInterval(() => {
    world.getPlayers().forEach(player => {
        if (player.isSneaking) {
            // 潜行代码
        } else {
            // 未潜行代码
        }
    });
});
```

而对玩家使用快捷栏标题，则需要使用`Player`类中的`onScreenDisplay`属性，我们看到里面有一个`setActionBar`的方法：

![loop_2](/img/tutorials/a3_scripts/b2_guide/c1_sapi/loop_2.png)

鼠标指向`setActionBar`就可以查看它的类型、信息、报错条件等，包括其他变量和方法都可以这样，十分方便，因此我们以后非必要也就不再强调参数类型了。

![loop_3](/img/tutorials/a3_scripts/b2_guide/c1_sapi/loop_3.png)

我们来写入：

```js showLineNumbers title="main.js" {4,6}
system.runInterval(() => {
    world.getPlayers().forEach(player => {
        if (player.isSneaking) {
            player.onScreenDisplay.setActionBar("你正在潜行！");
        } else {
            player.onScreenDisplay.setActionBar("你没在潜行！");
        }
    });
});
```

![loop_4](/img/tutorials/a3_scripts/b2_guide/c1_sapi/loop_4.png)

所以，编写这种功能，使用脚本就是十分甚至九分的简单！

此外，注意到两段代码事实上都是相同的内容，都在调用`setActionBar`方法，那我们其实可以继续简化这段代码：

```js showLineNumbers title="main.js" {3}
system.runInterval(() => {
    world.getPlayers().forEach(player => {
        player.onScreenDisplay.setActionBar(player.isSneaking ? "你正在潜行！" : "你没在潜行！");
    });
});
```

这里使用了一个三元运算符。

## 学会查看文档

应该要说明的是，目前 SAPI 的更新速度依旧很快，并且时不时就会推出非常重磅的新内容，这也就意味着本文以至于本系列的脚本相关文章都具有一定的时效性。因此，读者必须培养自己查阅文档的能力。我们这里给出几个常用的 SAPI 文档：

### JaylyMC 的 SAPI 文档

目前来说，最好用的 SAPI 文档是 [JaylyMC 的 SAPI 文档](https://jaylydev.github.io/scriptapi-docs/)，这份文档详细记载了各个游戏版本下的可用 API：

![doc_1](/img/tutorials/a3_scripts/b2_guide/c1_sapi/doc_1.png)

并且还拥有非常好用的搜索功能：

![doc_2](/img/tutorials/a3_scripts/b2_guide/c1_sapi/doc_2.png)

此外，各个类型间的链接也都做得很好，属性和方法之间的分隔，以及接口、枚举、类和变量之间的分隔做的也都相对不错。

然而，这个文档最大的问题在于国内的网络难以连接……你懂得。此外，它还是一个纯英文的文档。

我们可以看到 SAPI 提供的接口非常多，有巨多无比的类，让人难以下手。**这里给一个可以大幅降低你入门难度的建议：先看`World`和`System`类**！剩下的几乎其他类都是从这两个类延伸出来的，所以当然要从世界和系统类先下手。要获取方块、实体时，先考虑从世界类获取维度，然后就可以获取方块和实体了。

### ProjectXero 的 SAPI 文档

其次，国内也拥有一个相对好用的 SAPI 文档，是[命令助手和 MCBEID 表的作者 Xero 所搭建的 SAPI 文档](https://projectxero.top/sapi/index.html)。这份文档采用了和 JaylyMC 的 SAPI 文档同样的构建技术，并且国内的访问也很快，部分 API 甚至有中文介绍。

![doc_3](/img/tutorials/a3_scripts/b2_guide/c1_sapi/doc_3.png)

美中不足的是，它缺少了旧版本的接口列表，这意味着部分旧版无法使用的新版接口是无法给出的，比如如果使用此文档发现`EntityEnderInventoryComponent`类可用，但在 1.21.90 试图访问这个类时就会报错，因为这是 26.30 才开放的接口。此外，本文档主要锚定的版本是最新的`beta`版本，这也同时意味着文档里含有大量的预览版接口，在未使用实验性玩法时是不能访问的，读者应注意甄别。

### 微软官方文档

最后是[微软的官方文档](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/minecraft-server?view=minecraft-bedrock-stable)。

![doc_4](/img/tutorials/a3_scripts/b2_guide/c1_sapi/doc_4.png)

官方文档肯定还是相对权威的，而且还能查到过往版本的更新日志。最大的问题就是难看。对。

---

## 总结

在本节，我们介绍了如何使用 SAPI。

我们首先介绍了如何安装自动补全，通过安装 Node.js 后，在 cmd 中执行两条命令：

```bat
npm i @minecraft/server
npm i @minecraft/server-ui
```

就可以在我们的电脑安装自动补全了，十分简单。

然后，我们介绍了如何编写脚本：

1. 在清单文件声明好自己需要使用脚本。
2. 在入口文件导入 Minecraft 的脚本模块即可！

我们还引入了脚本的两个基本概念：事件和运行。

- **事件（Events）**，包括**前事件（Before Events）** 和**后事件（After Events）**，前事件是在事件实际发生之前执行的代码，而后事件是在事件发生之后执行的代码。多数前事件是可以取消事件的发生的，而后事件则不行。几乎每个事件都会返回大量的信息。
- **运行（Run）**，我们这节主要讲了**延迟执行**`system.run()`和**间隔执行**`system.runInterval()`，但其实`system`下还有许多`run*`方法，比如`runJob()`是运行生成器；`runTimeout()`也是延迟执行，但可以规定游戏刻；`waitTicks()`则用于异步，等等……

在讲到事件的时候，我们还介绍过脚本运行存在**执行权限（Execution Privilege）**，主要包括三种：

1. **默认执行（Default Execution）**：一切代码都可以正常执行的权限。
2. **受限执行（Restricted Execution）**：**一切可能对世界造成更改的操作都会被拦截的权限**。这个权限通常**是前事件使用的**，这是为了前事件的执行稳定。
3. **早期执行（Early Execution）**：**一切需要访问世界信息的操作都会被拦截的权限**。这个权限则**是在世界完全加载前使用的**。为代码正常运行，需要使用世界加载后事件`world.afterEvents.worldLoad`来执行早期执行阶段无法执行的代码。

除此之外，我们还很零散地提到了一些小概念：

- **私有（Private）**：是指类内部可访问，外部不可访问的特性。这意味着我们是不能够随意实例化原版的类的，只有少量的原版的类可供我们实例化。
  - 遗憾的是，我们自己写代码时，只有 TypeScript 脚本才能用`private`字段。例如，在 JS 中我们不能这么写，只有在 TS 中我们才能这么做：

    ```js title="main.js" {2}
    class TestClass {
        private constructor() { // 会报错
            this.myVar = "awa";
        }
    }
    ```

- **回调函数（Callback Function）**：是指作为另一个函数的参数的函数。通常为函数传入一个函数是为了实现一些相对复杂的逻辑。
- **只读（Read Only）**：是指只可访问，但不可修改的属性。尝试修改原版的只读属性会导致报错。
  - 同样，只有 TypeScript 脚本才能用`readonly`字段：

    ```js title="main.js" {2}
    class TestClass {
        readonly myVar = "awa"; // 会报错
    }
    ```

我们还介绍了一个获取所有玩家的方法，也就是使用`World.getPlayers(): Player[]`。

最后，我们介绍了三个常用的文档，各有千秋，读者可以按需查阅。学习 SAPI 一定要学会看文档，否则是难以学会 SAPI 的！

- [JaylyMC 的 SAPI 文档](https://jaylydev.github.io/scriptapi-docs/)
- [ProjectXero 的 SAPI 文档](https://projectxero.top/sapi/index.html)
- [微软官方文档](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/minecraft-server?view=minecraft-bedrock-stable)

## 练习

:::info[练习 2.1]

哎呀……激动人心的练习时刻！想必读者已经发现了，脚本系统实际上就是超级进阶版的命令系统！它主要是为了实现更加复杂的逻辑的。在下面的练习题中，请读者打开上面 3 个文档中的一个，多加进行查阅和学习，我们也会给读者一些提示的。

在初学时，**读者应该格外关注几个重要的大类的学习，大体了解它们都拥有什么属性、什么方法，以掌握实际我们可以用脚本系统做什么**。它们分别是：`World`类（世界）、`System`类（系统）、`Dimension`类（维度）、`Block`类（方块）、`Entity`类（实体）、`Player`类（玩家）、`ItemStack`类（物品）。其实就是物品方块实体三件套！除此之外，**读者还应该格外关注我们都有哪些世界前事件和世界后事件可用，因为它们的性能好，功能强，我们在很多情况下就是用它们解决问题的**。

现在我们正式开始练习吧。越到后面的题目，我们越会面对更加复杂的需求！

1. 实现**玩家**死亡执行命令`function events/player_die`——但是注意，这回不要用循环代码！读者可以尝试使用实体死亡后事件，并且注意`Entity`类有`runCommand`方法。
2. 让 TNT 除了能炸掉玻璃之外，其他一切方块都炸不掉！读者可以考虑使用爆炸前事件。
3. 让玩家在吃掉苹果之后，增加 1 级的经验。读者可以考虑使用完成使用物品后事件。
4. 让玩家在拥有标签`red`时，把自己的名字改为红色。读者可以修改`Player`类的`nameTag`属性——这个属性可不是只读的！
5. 阻止冒险模式的玩家拿走花盆里的花。读者可以考虑使用玩家与方块交互前事件。
6. 最激动人心的时刻来了——当玩家和钻石块交互时，为玩家手中的物品添加备注：「拥有钻石块幸运加成的物品」，并设置为死亡不掉落。这个需求命令和纯附加包都是无法实现的——但脚本可以轻易实现！考虑`ItemStack`类的`clone()`方法、`setLore()`方法和`keepOnDeath`属性，此外使用玩家与方块交互前事件。读者也可以试试看如果使用后事件可不可行，并总结玩家与方块交互前事件和后事件的区别。
7. 当玩家试图和酿造台交互时，检查它下方的方块。如果是红色染色玻璃则阻止玩家和酿造台交互，然后给予玩家一瓶瞬间治疗药水（`potion`，数据值为`21`），并播放酿造台酿造的音效。暂时先不考虑`Block`的`below()`方法（虽然这个方法在这里更好用）。
8. 当玩家在拥有`removeImmediately`标签时，不论它们攻击何种实体（玩家除外），都立刻移除这个实体。读者可以考虑使用实体受伤后事件。注意实体有`remove()`方法，可以直接移除实体而没有任何动画。
9. 当玩家使用火药和方块交互时，阻止玩家——然后在玩家交互的方块的位置直接创造一次爆炸！读者可以使用`Dimension`类的`createExplosion`方法直接导致一次爆炸，位置可以设定为通过事件获取的方块位置。
10. 当玩家手持音符和和牛交互时，对玩家发送消息「你在对牛弹琴吗？你在开玩笑。」。使用玩家与实体交互后事件。
11. 尝试实现 Java 版的`minecraft:killed.minecraft:zombie`准则，这是一种当玩家击杀僵尸就会自加分数的准则。现在我们定义`killedZombie`记分板，让这个记分板具有这个功能。使用实体死亡后事件。不要用`scoreboard`命令！命令的效率很低。使用`world`的`scoreboard`记分板管理器。
12. 一旦玩家受到来自虚空的伤害，立刻追加 200 点虚空伤害！使用实体受伤后事件。
13. 当玩家进入游戏时，令该玩家执行命令`function events/player_join`。可以考虑使用玩家生成事件，不使用玩家加入事件主要是因为目前还得不到玩家的完整`Player`对象。
14. 当按下金块上的石按钮时，给予随机一名玩家金锭。使用按下按钮后事件。注意：这里你可能需要额外定义一个生成随机整数的函数`randomInt(min: number, max: number): number`。可以考虑把它放到一个工具类里，并将它设置为静态方法。举例：
    <!--markdownlint-disable MD031-->
    ```js
    class JSUtil {
        /** 生成在[min, max]之间的整数（含）
         * @param {number} min
         * @param {number} max
         */
        static randomInt(min, max) {}
    }
    ```
    这里使用了 JSDoc，是为了声明这些变量的类型，防止`@ts-check`报错，并且有助于我们后续做相关处理和提供自动补全。
15. 现在给定一个对象：
    ```js
    /** @type {Record<string, import("@minecraft/server").Vector3>} */
    const teamChest = {
        red: { x: 0, y: 60, z: 60 },
        blue: { x: 60, y: 60, z: 0 },
        green: { x: 0, y: 60, z: -60 },
        yellow: { x: -60, y: 60, z: 0 },
    };
    ```
    这里先对第一行做一个解释，这是声明`teamChest`的类型为一个键为`string`，值为`Vector3`的对象。现在我们假定这是 4 个队伍的箱子位置，要求在其他队伍的玩家（分别具有对应的标签，例如红队玩家拥有标签`red`，蓝队玩家拥有标签`blue`，以此类推）开箱时禁止打开其他队伍的箱子。从本题开始，我们就不再给出需要使用什么事件了，现在试试自行判断需要使用什么事件！
16. 当玩家投掷雪球砸到木板的侧面时，传送玩家到木板的侧面 0.5 格远的位置。如果雪球砸中底面则传送到木板下方 2 格的位置，砸中顶面则传送到木板上方 1 格的位置。同样地，我们不告诉你要用什么事件了！
17. 当玩家使用木剑时，在玩家上方 5 格的位置生成 1 颗钻石，名为「§e木剑生成的钻石」。对，是直接生成掉落物！提示：`ItemStack`对象是可以实例化的。考虑使用`Dimension`的`spawnItem`方法。
18. 现在给出一个坐标工具类`Vector3Util`，定义一个双参数的静态方法`distance(location1: Vector3, location2: Vector3)`，返回两坐标点的距离。提示：数学上定义两点间距离 d=√(Δx²+Δy²+Δz²)。编程领域，数学很重要哦！
19. 将玩家的 xyz 位置分别*实时*打印到记分板`playerData`的`x`、`y`、`z`假名上，向下取整。例如当玩家位于(0.5, -60.5, 35)的时候，记载`playerData.x`为`0`，`playerData.y`为`-61`，`playerData.z`为`35`。现在可以和二分法取坐标说再见了！
20. 第二十道题！！哈哈哈，SAPI 当然值得这个待遇啦！现在我们给小木棍升个级，当小木棍对一个方块使用后，当方块具有`minecraft:vertical_half`方块状态时，把该方块状态的值换成另一个，比如如果是下半砖，就在小木棍对其交互后改成上半砖；如果是上半砖就改成下半砖！这就是一个很简易的调试棒功能了。提示：可以使用`Block`类的`permutation`属性获取方块状态，然后用`withState()`方法定义一个新的`BlockPermutation`，再用`Block.setPermutation()`方法应用新`BlockPermutation`。别忘了再加个快捷栏标题，比如「已选择“minecraft:vertical_half”（"top"）」，这就更像了。

:::

<details>

<summary>练习题答案（1-5题）</summary>

1. 注意，题里强调了是玩家执行命令，这样我们就需要筛选是不是玩家死亡了。筛选的办法是检查死亡实体的类型。
    ```js showLineNumbers
    world.afterEvents.entityDie.subscribe(event => {
        // 判断是否为玩家死亡
        const player = event.deadEntity;
        if (player.typeId !== "minecraft:player") return;
        // 执行命令
        player.runCommand(`function events/player_die`);
    });
    ```
    这个问题还有另一个解法。注意到这个事件的订阅方法实际上是一个双参数方法，接收第二个参数`options?: EntityEventOptions`，我们可以在这里事先确定究竟监听哪些实体死亡。查阅文档，跟随自动补全的写法，就可以很快给出解法二：
    ```js showLineNumbers
    world.afterEvents.entityDie.subscribe(
        event => {
            event.deadEntity.runCommand(`function events/player_die`);
        },
        {
            entityTypes: ["minecraft:player"],
        },
    );
    ```
    不是所有事件的订阅方法都支持筛选选项的，但如果真的支持，可以充分利用。
2. 这里使用爆炸前事件。观察事件属性，我们可以通过`setImpactedBlocks(blocks: Block[])`方法设定将被影响的方块。实现思路是，首先判断爆炸源是不是 TNT，然后获取将被影响的方块，筛选出玻璃，最后设定影响玻璃就可以了。
    ```js showLineNumbers
    world.beforeEvents.explosion.subscribe(event => {
        // 检查爆炸源是否是 TNT
        const tnt = event.source;
        if (!tnt) return; // <- 这里，因为event.source可能返回undefined，即爆炸不来自于实体时，必须要进行判断
        if (tnt.typeId !== "minecraft:tnt") return;
        // 筛选将被影响的方块
        const blocks = event.getImpactedBlocks().filter(block => block.typeId === "minecraft:glass");
        // 设定刚筛选出来的方块
        event.setImpactedBlocks(blocks);
    });
    ```
    ![practice_2](/img/tutorials/a3_scripts/b2_guide/c1_sapi/practice_2.png)
3. 这里使用完成使用物品后事件。和我们上面的使用物品后事件相比，这里更强调 **Complete**，也就是**完成**使用，典例就是吃掉食物。思路很简单，检查玩家吃掉的是不是苹果，是的话就给 1 级。
    ```js showLineNumbers {2}
    world.afterEvents.itemCompleteUse.subscribe(event => {
        const { source: player, itemStack: apple } = event;
        if (apple.typeId !== "minecraft:apple") return;
        player.addLevels(1);
    });
    ```
    注意，这里第 2 行我们用了一个 JS 的**解构（Destructuring）** 的写法。解构可以快速地把对象、数组中的元素提取出来赋给对应的值。在这个例子中，我们知道`event`具有 3 个属性：`source`、`itemStack`、`useDuration`。我们在左侧也定义一个带有`source`和`itemStack`属性的对象，值分别是`player`和`apple`，这样的话这两个值就会分别被对应赋值。因此，
    ```js showLineNumbers
    const { source: player, itemStack: apple } = event;
    ```
    是等效于
    ```js showLineNumbers
    const player = event.source;
    const apple = event.itemStack;
    ```
    的。类似地，数组也可以这么做，例如
    ```js showLineNumbers
    const [command, player, itemId] = ["/give", "YZBWDLT", "apple"];
    console.log(command); // '/give'
    console.log(player); // 'YZBWDLT'
    console.log(itemId); // 'apple'
    ```
    也等效于
    ```js showLineNumbers
    const commandArray = ["/give", "YZBWDLT", "apple"];
    const command = commandArray[0];
    const player = commandArray[1];
    const itemId = commandArray[2];
    console.log(command); // '/give'
    console.log(player); // 'YZBWDLT'
    console.log(itemId); // 'apple'
    ```
    解构的写法是很常见的，解构也不止这一种写法。我们后面也会经常使用这个写法。
    ![practice_3](/img/tutorials/a3_scripts/b2_guide/c1_sapi/practice_3.png)
4. 思路很简单，用`hasTag`方法筛选就可以了。因为需要实时更改，所以循环执行。
    ```js showLineNumbers
    system.runInterval(() => {
        world.getPlayers().forEach(player => {
            if (player.hasTag("red")) player.nameTag = `§c${player.name}`;
        });
    });
    ```
5. 思路很简单，首先检查玩家的游戏模式是不是冒险模式，其次检查交互的方块是不是花盆。这两个条件都符合之后再阻止交互。
    ```js showLineNumbers
    import { world, system, GameMode } from "@minecraft/server";

    world.beforeEvents.playerInteractWithBlock.subscribe(event => {
        // 如果不为冒险模式玩家，则终止代码
        const player = event.player;
        if (player.getGameMode() !== GameMode.Adventure) return;
        // 如果不为花盆，则终止代码
        const flowerPot = event.block;
        if (flowerPot.typeId !== "minecraft:flower_pot") return;
        // 其余情况，阻止玩家对花盆的交互
        event.cancel = true;
    });
    ```
    这里我们引入了一个`GameMode`，这是一个枚举，事实上`GameMode.Adventure`就是`"Adventure"`。读者也可以直接写为`player.getGameMode() !== "Adventure"`。引用原版给出的枚举会让人更安心一些 =P

</details>

<details>

<summary>练习题答案（6-10题）</summary>

6. 思路是，先检查玩家是否有交互物品，然后对物品做更改。然而，这里我们可以发现，如果直接按照下面这么写是没有效果的：
    ```js showLineNumbers
    world.beforeEvents.playerInteractWithBlock.subscribe(event => {
        const { itemStack: item, isFirstEvent, block: diamondBlock, player } = event;
        // 若不是首次交互，终止运行
        if (!isFirstEvent) return;
        // 若交互时没有物品，终止运行
        if (!item) return;
        // 若方块不是钻石块，终止运行
        if (diamondBlock.typeId !== "minecraft:diamond_block") return;
        // 判断结束后，添加lore和死亡不掉落
        system.run(() => {
            item.keepOnDeath = true;
            item.setLore(["拥有钻石块幸运加成的物品§r"]);
        });
    });
    ```
    这是因为，**我们现在手上的物品已经是被实例化的物品，而已经被实例化的物品的属性是固定死的，不能更改**。虽然这确实很令人困惑，但好在我们还有一个略微绕弯子的方法，就是复制物品信息后，清除该物品并重新给予一个更改过的物品。因此，我们要做一些改进：
    ```js showLineNumbers {11-15}
    world.beforeEvents.playerInteractWithBlock.subscribe(event => {
        const { itemStack: item, isFirstEvent, block: diamondBlock, player } = event;
        // 若不是首次交互，终止运行
        if (!isFirstEvent) return;
        // 若交互时没有物品，终止运行
        if (!item) return;
        // 若方块不是钻石块，终止运行
        if (diamondBlock.typeId !== "minecraft:diamond_block") return;
        // 判断结束后，添加lore和死亡不掉落
        system.run(() => {
            const newItem = item.clone();
            newItem.keepOnDeath = true;
            newItem.setLore(["拥有钻石块幸运加成的物品§r"]);
            player.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 air`);
            player.addItem(newItem);
        });
    });
    ```
    现在我们就得到了一个同时拥有 lore 和死亡不掉落标签的物品了！
    ![practice_6](/img/tutorials/a3_scripts/b2_guide/c1_sapi/practice_6.png)
    对代码部分做一些解释：
    - 因为玩家在交互时，事实上可能是连续按下鼠标右键的（即在一段时间内一直处于交互状态），这样就会导致事件会始终触发。我们这里使用`isFirstEvent`就是判断这是不是玩家首次进行交互。
    - 这里我们清空物品使用了命令`/replaceitem`，在学习组件之后我们会得到一个性能更高的写法。
    - 需要再次强调：**每当读者需要修改玩家的物品时，都应当先移除该物品之后再给予此物品，不能在原有物品的基础之上进行更改**。
7. 思路是，先检查是否为酿造台，然后检查酿造台下方的方块是否为红色染色玻璃。
    ```js showLineNumbers
    world.beforeEvents.playerInteractWithBlock.subscribe(event => {
        const { isFirstEvent, block: brewingStand, player } = event;
        // 若不是首次交互，终止运行
        if (!isFirstEvent) return;
        // 若方块不是酿造台，终止运行
        if (brewingStand.typeId !== "minecraft:brewing_stand") return;
        // 若方块下方不是红色染色玻璃，终止运行
        const { location, dimension } = brewingStand;
        const redStainedGlass = dimension.getBlock({ ...location, y: location.y - 1 });
        if (redStainedGlass?.typeId !== "minecraft:red_stained_glass") return;
        // 阻止玩家打开 UI，并进行后续操作
        event.cancel = true;
        system.run(() => {
            player.runCommand("give @s potion 1 21");
            player.playSound("random.potion.brewed");
        });
    });
    ```
    对代码做一些解释：
    - 我们看这里的第 9 行，这叫做**展开语法（Spread Syntax）**。展开语法可以将对象、数组中的元素快速展开为多个值。例如
      ```js
      const location = { x: 0, y: 0, z: 0 };
      const locationWithDimension = { ...location, dimension: "overworld" };
      ```
      就等效于
      ```js
      const location = { x: 0, y: 0, z: 0 };
      const locationWithDimension = { x: location.x, y: location.y, z: location.z, dimension: "overworld" };
      ```
      对于数组也是类似的，可以快速展开其中的元素：
      ```js
      const numberList1 = [1, 2, 3];
      const numberList2 = [...numberList1, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]
      const numberList3 = [4, 5, ...numberList1, 6]; // [4, 5, 1, 2, 3, 6]
      ```
      和解构类似，展开语法也很实用。我们这里写的`{ ...location, y: location.y - 1 }`就代表继承原来`location`的属性，然后把`y`改为`location.y - 1`。
    - 第 10 行的`redStainedGlass?.typeId`就用到了我们以前介绍过的可选链。因为`getBlock()`可能返回`undefined`，这是一种保护代码的措施。如果读者仍在使用`// @ts-check`，这个可选链是会由 VSC 帮你自动补全的，很方便。
    ![practice_7](/img/tutorials/a3_scripts/b2_guide/c1_sapi/practice_7.png)
8. 思路是，当玩家攻击其他实体时，先进行条件判断，成功后直接`remove()`即可：
    ```js showLineNumbers
    world.afterEvents.entityHurt.subscribe(event => {
        const { hurtEntity, damageSource } = event;
        const sourcePlayer = damageSource.damagingEntity;
        // 如果伤害玩家是无效的，或不是玩家，或没有removeImmediately标签，终止运行
        if (!sourcePlayer) return;
        if (sourcePlayer.typeId !== "minecraft:player") return;
        if (!sourcePlayer.hasTag("removeImmediately")) return;
        // 如果受伤实体是玩家，终止运行
        if (hurtEntity.typeId === "minecraft:player") return;
        // 移除实体
        hurtEntity.remove();
    });
    ```

</details>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
