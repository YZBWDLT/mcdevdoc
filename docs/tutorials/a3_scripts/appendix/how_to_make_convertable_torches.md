# 附录：如何实现可变换的火把

:::warning[注意]

本文所述内容仅适用于国际版的 ScriptAPI。基于`@minecraft/server@2.1.0`制作。

:::

> 上次更新：2026 年 2 月 2 日
>
> 关键词：玩家与方块交互前事件（`PlayerInteractWithBlockBeforeEvent`）、方块状态替换（`Block.setPermutation()`）、方块状态解析（`BlockPermutation.resolve()`）、事件取消（`event.cancel`）等

火把、灵魂火把和铜火把的配方是如此的相像，它们都共用煤炭和木棍，而只相差一个材料而已。能不能实现使用特定材料与这些火把交互，并改变它们的类型呢？答案当然是可以！

利用玩家与方块交互的前事件（`PlayerInteractWithBlockBeforeEvent`），我们就可以实现这个有趣的小功能。

为什么不能用后事件（`PlayerInteractWithBlockAfterEvent`）呢？因为火把本身没有什么可交互的功能，而我们将要使用的铜粒也不是能交互的物品，在这种情况下使用后事件就没有效果了。

那我们来写一个前事件如下：

```javascript showLineNumbers
import * as minecraft from "@minecraft/server";

minecraft.world.beforeEvents.playerInteractWithBlock.subscribe(event => {
});

```

现在让我们理清我们的需求，什么条件下让替换方块的代码执行？

第一，首先玩家得拿着合适的物品，比如灵魂沙或者铜粒，交互时就分别变成灵魂火把和铜火把。而如果空手就把其他类型的火把变成普通火把。所以我们需要检查玩家这时所手持的物品，并且给出对应的将替换的火把 ID。如果检查到没有有效的待替换的火把 ID，就终止运行。这里的第 6 行是因为 VSC 在`newTorchId`对象这里不能够给出有效的类型信息，所以用`@type`标注（*我是一个对注释很执着的开发者 :)*）。

```javascript showLineNumbers {4-12}
import * as minecraft from "@minecraft/server";

minecraft.world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    // 检查玩家手持的是否为允许的物品，若不为允许的物品则终止运行
    const newMaterial = event.itemStack;
    /** @type {"minecraft:torch" | "minecraft:soul_torch" | "minecraft:copper_torch" | undefined} */
    const newTorchId = {
        undefined: "minecraft:torch",
        "minecraft:soul_sand": "minecraft:soul_torch",
        "minecraft:copper_nugget": "minecraft:copper_torch",
    }[newMaterial?.typeId] ?? void 0;
    if (!newTorchId) return;
});
```

第二，我们得让玩家交互的是火把吧？不是以上几种火把可不行。所以我们加上一段来检查玩家交互的是不是那几种火把：

```javascript showLineNumbers {15-18}
import * as minecraft from "@minecraft/server";

minecraft.world.beforeEvents.playerInteractWithBlock.subscribe(event => {

    // 检查玩家手持的是否为允许的物品，若不为允许的物品则终止运行
    const newMaterial = event.itemStack;
    /** @type {"minecraft:torch" | "minecraft:soul_torch" | "minecraft:copper_torch" | undefined} */
    const newTorchId = {
        undefined: "minecraft:torch",
        "minecraft:soul_sand": "minecraft:soul_torch",
        "minecraft:copper_nugget": "minecraft:copper_torch",
    }[newMaterial?.typeId] ?? void 0;
    if (!newTorchId) return;

    // 检查玩家交互的是否为火把，若不为火把则终止运行
    const oldTorch = event.block;
    const oldTorchId = oldTorch.typeId;
    if (!["minecraft:torch", "minecraft:soul_torch", "minecraft:copper_torch"].includes(oldTorchId)) return;

});

```

然后我们就可以来做主体逻辑了！如果以上两个情况都过滤得差不多了就可以做替换了。

这里，我们采用`Block.setPermutation()`方法来做替换。它接受一个方块状态的参数，但我们没法凭空给出一个方块状态。所以，还需要一个方块状态解析（`BlockPermutation.resolve()`）的静态方法。

按照文档的引导，我们需要给出旧火把的方块状态，所以再用一个`BlockPermutation.getState()`获取原来的方块状态，并应用到新火把上。这样，我们得到新的代码：

```javascript showLineNumbers {23-27}
import * as minecraft from "@minecraft/server";

minecraft.world.beforeEvents.playerInteractWithBlock.subscribe(event => {

    // 如果不是第一次点击，终止运行
    if (!event.isFirstEvent) return;

    // 检查玩家手持的是否为允许的物品，若不为允许的物品则终止运行
    const newMaterial = event.itemStack;
    /** @type {"minecraft:torch" | "minecraft:soul_torch" | "minecraft:copper_torch" | undefined} */
    const newTorchId = {
        undefined: "minecraft:torch",
        "minecraft:soul_sand": "minecraft:soul_torch",
        "minecraft:copper_nugget": "minecraft:copper_torch",
    }[newMaterial?.typeId] ?? void 0;
    if (!newTorchId) return;

    // 检查玩家交互的是否为火把，若不为火把则终止运行
    const oldTorch = event.block;
    const oldTorchId = oldTorch.typeId;
    if (!["minecraft:torch", "minecraft:soul_torch", "minecraft:copper_torch"].includes(oldTorchId)) return;

    // 判断结束后，放置新的火把
    minecraft.system.run(() => {
        const oldTorchFacingDirection = oldTorch.permutation.getState("torch_facing_direction") ?? "unknown";
        oldTorch.setPermutation(minecraft.BlockPermutation.resolve(newTorchId, {torch_facing_direction: oldTorchFacingDirection}));
    });

});

```

读者必须注意使用`system.run()`做替换逻辑，因为这些是会更改世界的方法，而这些方法不能在前事件中直接应用。

现在我们完成了初步的逻辑，再来加点东西吧！比如：我们加上一个点燃的音效，清除玩家对应的材料，并返还玩家旧火把的材料：

```javascript showLineNumbers {21-24,28-30}
import * as minecraft from "@minecraft/server";

minecraft.world.beforeEvents.playerInteractWithBlock.subscribe(event => {

    // 检查玩家手持的是否为允许的物品，若不为允许的物品则终止运行
    const newMaterial = event.itemStack;
    /** @type {"minecraft:torch" | "minecraft:soul_torch" | "minecraft:copper_torch" | undefined} */
    const newTorchId = {
        undefined: "minecraft:torch",
        "minecraft:soul_sand": "minecraft:soul_torch",
        "minecraft:copper_nugget": "minecraft:copper_torch",
    }[newMaterial?.typeId] ?? void 0;
    if (!newTorchId) return;

    // 检查玩家交互的是否为火把，若不为火把则终止运行
    const oldTorch = event.block;
    const oldTorchId = oldTorch.typeId;
    if (!["minecraft:torch", "minecraft:soul_torch", "minecraft:copper_torch"].includes(oldTorchId)) return;

    // 判断结束后，取消事件（防止放置方块）、放置新的火把、播放音效并清除玩家的物品
    const oldTorchMaterial = {
        "minecraft:soul_torch": "minecraft:soul_sand",
        "minecraft:copper_torch": "minecraft:copper_nugget",
    }[oldTorchId];
    minecraft.system.run(() => {
        const oldTorchFacingDirection = oldTorch.permutation.getState("torch_facing_direction") ?? "unknown";
        oldTorch.setPermutation(minecraft.BlockPermutation.resolve(newTorchId, {torch_facing_direction: oldTorchFacingDirection}));
        oldTorch.dimension.playSound("mob.blaze.shoot", oldTorch.location);
        if (newMaterial) event.player.runCommand(`clear @s ${newMaterial.typeId} -1 1`);
        if (oldTorchMaterial) event.player.runCommand(`give @s ${oldTorchMaterial} 1`)
    });

});

```

我们发现这样写完的代码有点问题，主要为：

1. 鼠标按了一下就发出很多声响并清除了很多物品；
2. 同类火把之间仍然可以做替换；
3. 灵魂沙可以放在火把上。

所以我们需要阻止这些情况。这些情况都是比较好解决的，可以看高亮部分的代码：

```javascript showLineNumbers {5-6,23-24,31}
import * as minecraft from "@minecraft/server";

minecraft.world.beforeEvents.playerInteractWithBlock.subscribe(event => {

    // 如果不是第一次点击，终止运行
    if (!event.isFirstEvent) return;

    // 检查玩家手持的是否为允许的物品，若不为允许的物品则终止运行
    const newMaterial = event.itemStack;
    /** @type {"minecraft:torch" | "minecraft:soul_torch" | "minecraft:copper_torch" | undefined} */
    const newTorchId = {
        undefined: "minecraft:torch",
        "minecraft:soul_sand": "minecraft:soul_torch",
        "minecraft:copper_nugget": "minecraft:copper_torch",
    }[newMaterial?.typeId] ?? void 0;
    if (!newTorchId) return;

    // 检查玩家交互的是否为火把，若不为火把则终止运行
    const oldTorch = event.block;
    const oldTorchId = oldTorch.typeId;
    if (!["minecraft:torch", "minecraft:soul_torch", "minecraft:copper_torch"].includes(oldTorchId)) return;

    // 如果旧 ID 和新 ID 相同，即无需替换的时候则终止运行
    if (newTorchId === oldTorchId) return;

    // 判断结束后，取消事件（防止放置方块）、放置新的火把、播放音效并清除玩家的物品
    const oldTorchMaterial = {
        "minecraft:soul_torch": "minecraft:soul_sand",
        "minecraft:copper_torch": "minecraft:copper_nugget",
    }[oldTorchId];
    event.cancel = true;
    minecraft.system.run(() => {
        const oldTorchFacingDirection = oldTorch.permutation.getState("torch_facing_direction") ?? "unknown";
        oldTorch.setPermutation(minecraft.BlockPermutation.resolve(newTorchId, {torch_facing_direction: oldTorchFacingDirection}));
        oldTorch.dimension.playSound("mob.blaze.shoot", oldTorch.location);
        if (newMaterial) event.player.runCommand(`clear @s ${newMaterial.typeId} -1 1`);
        if (oldTorchMaterial) event.player.runCommand(`give @s ${oldTorchMaterial} 1`)
    });

});

```

最终代码为：

```javascript showLineNumbers
import * as minecraft from "@minecraft/server";

minecraft.world.beforeEvents.playerInteractWithBlock.subscribe(event => {

    // 如果不是第一次点击，终止运行
    if (!event.isFirstEvent) return;

    // 检查玩家手持的是否为允许的物品，若不为允许的物品则终止运行
    const newMaterial = event.itemStack;
    /** @type {"minecraft:torch" | "minecraft:soul_torch" | "minecraft:copper_torch" | undefined} */
    const newTorchId = {
        undefined: "minecraft:torch",
        "minecraft:soul_sand": "minecraft:soul_torch",
        "minecraft:copper_nugget": "minecraft:copper_torch",
    }[newMaterial?.typeId] ?? void 0;
    if (!newTorchId) return;

    // 检查玩家交互的是否为火把，若不为火把则终止运行
    const oldTorch = event.block;
    const oldTorchId = oldTorch.typeId;
    if (!["minecraft:torch", "minecraft:soul_torch", "minecraft:copper_torch"].includes(oldTorchId)) return;

    // 如果旧 ID 和新 ID 相同，即无需替换的时候则终止运行
    if (newTorchId === oldTorchId) return;

    // 判断结束后，取消事件（防止放置方块）、放置新的火把、播放音效并清除玩家的物品
    const oldTorchMaterial = {
        "minecraft:soul_torch": "minecraft:soul_sand",
        "minecraft:copper_torch": "minecraft:copper_nugget",
    }[oldTorchId];
    event.cancel = true;
    minecraft.system.run(() => {
        const oldTorchFacingDirection = oldTorch.permutation.getState("torch_facing_direction") ?? "unknown";
        oldTorch.setPermutation(minecraft.BlockPermutation.resolve(newTorchId, {torch_facing_direction: oldTorchFacingDirection}));
        oldTorch.dimension.playSound("mob.blaze.shoot", oldTorch.location);
        if (newMaterial) event.player.runCommand(`clear @s ${newMaterial.typeId} -1 1`);
        if (oldTorchMaterial) event.player.runCommand(`give @s ${oldTorchMaterial} 1`)
    });

});

```

这一套逻辑对其他方块也适用，读者可以自行在此基础上进一步优化。
