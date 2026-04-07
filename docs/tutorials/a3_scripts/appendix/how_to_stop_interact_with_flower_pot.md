# 附录：如何阻止玩家与花盆交互

:::warning[注意]

本文所述内容仅适用于国际版的 ScriptAPI。基于`@minecraft/server@2.0.0`制作。

:::

> 上次更新：2026 年 4 月 5 日
>
> 关键词：玩家与方块交互前事件（`PlayerInteractWithBlockBeforeEvent`）、`GameMode`枚举等

在玩法地图开发过程中，我们总会发现存在一个问题：冒险模式的玩家可以拿走花盆内的物品。我们多数情况都不希望玩家能够和花盆交互，因为花盆通常是用于装饰的，而里面的内容物通常是花等。如果玩家拿走其中的物品，可能会导致某些意外情况的发生。这样，我们就必须想办法**阻止冒险模式的玩家和花盆交互**。

这思路是很简单的：使用玩家与方块交互前事件，只要玩家是冒险模式且交互的方块是花盆就取消掉这个事件。因为代码简单，我们甚至可以直接给出代码：

```js showLineNumbers
// @ts-check

import * as minecraft from "@minecraft/server";

// 如果玩家为冒险模式，则禁止交互花盆
minecraft.world.beforeEvents.playerInteractWithBlock.subscribe(event => {

    // 如果不为冒险模式玩家，则终止代码
    const player = event.player;
    if (player.getGameMode() !== minecraft.GameMode.Adventure) return;

    // 如果不为花盆，则终止代码
    const flowerPot = event.block;
    if (flowerPot.typeId !== "minecraft:flower_pot") return;

    // 其余情况，阻止玩家对花盆的交互
    event.cancel = true;

});
```

现在，冒险模式的玩家就不再能对花盆交互了。
