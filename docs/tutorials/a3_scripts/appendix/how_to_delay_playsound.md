# 附录：如何延迟音效播放

:::warning[注意]

本文所述内容仅适用于国际版的 ScriptAPI。基于`@minecraft/server@2.0.0`制作。

:::

> 上次更新：2026 年 4 月 5 日
>
> 关键词：脚本事件命令发送消息事件（`ScriptEventCommandMessageAfterEvent`）、脚本消息命令（`/scriptevent`）、延时执行代码（`System.runTimeout()`）、对玩家播放音效（`Player.playSound()`）、将字符串转换为整数（`parseInt()`）等

在地图制作过程中，我们总要有播放音效的需求。然而，在涉及到音效播放和传送同时执行的情况下则会遇到问题——音效无法正常播放。要解决这个问题是简单的，只需要使音效对特定玩家延时播放即可。

大体上来讲，自 1.21.50 开始，基于纯命令便有 2 种延时执行命令的办法：

1. 基于记分板的延时系统。比如使用下面的函数，在读者定义了`time.sound = 0`之后循环执行下面的代码便可实现延时播放音效。读者还可借此实现更复杂的延时系统。

   ```mcfunction
   scoreboard players add sound time 1
   execute if score sound time matches 3.. run playsound random.orb @a
   execute if score sound time matches 3.. run scoreboard players reset sound time
   ```

2. 基于`/schedule delay`。对于播放音效这种简单的工作，`/schedule`可以很好地胜任，它不需要你写一个复杂的逻辑就能工作。只需要创建一个函数（例如`random_orb.mcfunction`），写入命令

   ```mcfunction
   playsound random.orb @a
   ```

   然后执行`/schedule delay add random_orb 3t`即可实现延时播放音效。

但这些代码都涉及两个问题：

1. 难以指定对哪些玩家播放。`@a`是简单的，然而一旦指定对哪些玩家播放，就要开始出现大量的枚举。
2. 复杂。要播放的音效一多，要创建的文件也会大量地增加。

有没有一种方法可以既不大量枚举也能一条命令搞定呢？有的，我们可以创建一个脚本。

这里我们需要使用`ScriptEventCommandMessageAfterEvent`，也就是使用`/scriptevent`。这条命令常常用于进行命令系统和脚本系统之间的通讯。我们来基于脚本事件写一个“自定义命令”：

```js showLineNumbers {1-6}
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.afterEvents.scriptEventReceive.subscribe(event => {
});
```

- 第 1 行的`// @ts-check`启用了 TypeScript 级别的严格类型检查。
- 这里第 5 行是我们要的核心事件，它用于接收脚本事件并执行代码。

因为脚本事件的发送者可能是任意的东西，我们规定**只有玩家可以执行代码**。为此，我们要加入一定的类型检查：

```js showLineNumbers {6-9}
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.afterEvents.scriptEventReceive.subscribe(event => {
    /** @type {minecraft.Player} */ // @ts-ignore
    const player = event.sourceEntity;
    if (!player) return;
    if (player.typeId !== "minecraft:player") return;
});
```

这里，我们强行定义了`player`是一个`Player`，因为默认是`Entity | undefined`，而你不能对非玩家实体播放音效，这是没有意义的。因为我们启用了强制类型检查，所以加一行`// @ts-ignore`忽略它的报错，我们自己知道这一定会是一个`Player`就好了。

接下来要做的就很简单了，我们可以调用`system.runTimeout()`实现延时，然后调用`player.playSound()`播放音效。

```js showLineNumbers {11-13}
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.afterEvents.scriptEventReceive.subscribe(event => {
    /** @type {minecraft.Player} */ // @ts-ignore
    const player = event.sourceEntity;
    if (!player) return;
    if (player.typeId !== "minecraft:player") return;

    minecraft.system.runTimeout(() => {
        player.playSound("random.orb");
    }, 3);
});
```

现在只要传入一个脚本事件（比如`/scriptevent test:awa ""`）就会延迟 3 游戏刻为该玩家播放`random.orb`音效了。但这还不够，我们必须能自定义我们播放的音效。使用`/scriptevent`命令要为其传入事件 ID 和事件消息。我们暂且定义事件 ID 为`test:playSound`，只有事件 ID 符合这个 ID 时才会触发延时执行音效的代码。然后，我们为我们自定义的命令传入一个参数`<音效 ID>`，以控制播放的音效。这样，我们只需要输入

```mcfunction
/scriptevent test:playSound <音效 ID>
```

就可以延时播放音效。注意到`音效 ID`是属于脚本消息的，我们可以这么写：

```js showLineNumbers {11-15}
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.afterEvents.scriptEventReceive.subscribe(event => {
    /** @type {minecraft.Player} */ // @ts-ignore
    const player = event.sourceEntity;
    if (!player) return;
    if (player.typeId !== "minecraft:player") return;

    switch (event.id) {
        case "test:playSound":
            minecraft.system.runTimeout(() => player.playSound(event.message), 3);
            break;
    };
});
```

读者可以执行`/scriptevent test:playSound random.levelup`，现在它会延时 3 游戏刻后播放`random.levelup`。

那如果我们想更进一步呢？比如延时多久后执行。引入一个新的参数`[延时]`：

```mcfunction
/scriptevent test:playSound <音效 ID> [延时]
```

那么，上面的代码必须相应地更改，否则这段代码的脚本消息将包含延时信息，导致音效无法播放。我们可以调用 js 字符串内置的`split()`方法，将提供的消息拆分为几个参数。

```js showLineNumbers {13-15}
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.afterEvents.scriptEventReceive.subscribe(event => {
    /** @type {minecraft.Player} */ // @ts-ignore
    const player = event.sourceEntity;
    if (!player) return;
    if (player.typeId !== "minecraft:player") return;

    switch (event.id) {
        case "test:playSound":
            const soundId = event.message.split(" ")[0];
            const tickDelay = parseInt(event.message.split(" ")[1]) || 0;
            minecraft.system.runTimeout(() => player.playSound(soundId), tickDelay);
            break;
    };
});
```

这里需要注意的是，`String.split()`方法会获得字符串，而`system.runTimeout()`需要的延时信息是一个整数。所以，我们必须使用`parseInt()`方法把字符串解析为一个整数。然而，这个方法在解析失败的情况下会返回`NaN`，这会导致游戏内脚本报错，因此我们必须避免这种情况。我们可以使用或运算符，在`parseInt()`得到假值时强行返回`0`，也就是它的默认值。

读者可以执行`/scriptevent test:playSound random.levelup 20`，现在它会延时 1 秒后播放`random.levelup`。

如果我们还需要自定义音调，就类似地再引入一个新的参数`[音调]`：

```mcfunction
/scriptevent test:playSound <音效 ID> [延时] [音调]
```

```js showLineNumbers {15-16}
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.afterEvents.scriptEventReceive.subscribe(event => {
    /** @type {minecraft.Player} */ // @ts-ignore
    const player = event.sourceEntity;
    if (!player) return;
    if (player.typeId !== "minecraft:player") return;

    switch (event.id) {
        case "test:playSound":
            const soundId = event.message.split(" ")[0];
            const tickDelay = parseInt(event.message.split(" ")[1]) || 0;
            const pitch = parseInt(event.message.split(" ")[2]) || 1;
            minecraft.system.runTimeout(() => player.playSound(soundId, { pitch: pitch }), tickDelay);
            break;
    };
});
```

这就是一个比较完备的延迟播放音效的命令了。如果在函数文件内，只需要使用`execute as @a[...] run scriptevent test:playSound ...`就可以指定对哪些玩家播放。

事实上，`/scriptevent`的作用远不止于此，它正如我们前文所说，通常用于命令系统和脚本系统的通讯，因此是很重要的。

当然，如果读者使用纯脚本系统，那就不必如此大费周章了。
