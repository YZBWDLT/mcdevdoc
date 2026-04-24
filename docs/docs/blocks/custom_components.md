---
sidebar_position: 3
---

# 自定义方块组件

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

> 适用版本：国际版 26.10，中国版 3.8（1.21.90）。

:::warning[注意]

自定义方块组件仅限国际版的 ScriptAPI 可用。

:::

自定义方块组件可通过世界启动前事件（`StartupEvent`）的`blockComponentRegistry`属性中的`registerCustomComponent()`方法注册。其中，`name`属性注册为自定义组件的名称，而`customComponent`是一个接口`BlockCustomComponent`。

```TypeScript
registerCustomComponent(name: string, customComponent: BlockCustomComponent): void
```

下面给出接口`BlockCustomComponent`允许的所有属性，每个属性都接收一个两参数的函数，第一个参数返回对应事件，第二个参数返回自定义组件中的参数。

---

## `beforeOnPlayerPlace`属性

<Version version="1.21.20"/>

玩家放置方块前执行事件。适用脚本`@minecraft/server`版本`1.12.0`或更高。

<Tabs><TabItem value="参数" label="参数" default>

```TypeScript
beforeOnPlayerPlace?: (arg0: BlockComponentPlayerPlaceBeforeEvent, arg1: CustomComponentParameters) => void
```

**参数**：

- `arg0`：[`BlockComponentPlayerPlaceBeforeEvent`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcomponentplayerplacebeforeevent?view=minecraft-bedrock-stable)类型，返回放置方块前的事件，包含方块、维度、放置玩家等信息。
- `arg1`：[`CustomComponentParameters`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/customcomponentparameters?view=minecraft-bedrock-stable)类型，返回自定义组件中的参数。

</TabItem><TabItem value="示例" label="示例">

注册一个阻止非管理员放置方块的组件`test:prevent_member_place`，该组件不接收任何参数。

```JavaScript showLineNumbers
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.beforeEvents.startup.subscribe(event => {
    /** @type {minecraft.BlockCustomComponent} */
    const preventMemberPlaceComponent = {
        beforeOnPlayerPlace: (compEvent) => {
            const player = compEvent.player;
            if (!player) return;
            if (player.playerPermissionLevel < minecraft.PlayerPermissionLevel.Operator) compEvent.cancel = true;
        },
    };
    event.blockComponentRegistry.registerCustomComponent("test:prevent_member_place", preventMemberPlaceComponent);
});
```

</TabItem></Tabs>

---

## `onBlockStateChange`属性

<Version version="26.20" isBeta/>

:::danger[警告]

该属性仍处于实验性玩法，必须开启「测试版 API」才可使用。在实验性玩法中，该属性存在功能不稳定、功能更改甚至未来被移除的风险。

:::

方块状态被更改时执行事件。适用脚本`@minecraft/server`版本`beta`。

<Tabs><TabItem value="参数" label="参数" default>

```TypeScript
onBlockStateChange?: (arg0: BlockComponentBlockStateChangeEvent, arg1: CustomComponentParameters) => void
```

**参数**：

- `arg0`：[`BlockComponentBlockStateChangeEvent`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcomponentblockstatechangeevent?view=minecraft-bedrock-stable)类型，返回放置方块前的事件，包含方块、维度、上一个方块置换等信息。
- `arg1`：[`CustomComponentParameters`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/customcomponentparameters?view=minecraft-bedrock-stable)类型，返回自定义组件中的参数。

</TabItem><TabItem value="示例" label="示例">

注册一个当`test:is_lit`方块状态变化时播放音效的组件`test:playsound_on_lit_state_changed`，该组件不接收任何参数。

```JavaScript showLineNumbers
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.beforeEvents.startup.subscribe(event => {
    /** @type {minecraft.BlockCustomComponent} */
    const playsoundOnLitStateChangedComponent = {
        onBlockStateChange: compEvent => {
            /** @type {boolean} */ // @ts-ignore
            const prevIsLit = compEvent.previousPermutation.getState("test:is_lit");
            // 熄灭后播放信标失效音效，点亮后播放信标激活音效
            compEvent.dimension.playSound(prevIsLit ? "beacon.deactivate" : "beacon.activate", compEvent.block.location);
        },
    };
    event.blockComponentRegistry.registerCustomComponent("test:playsound_on_lit_state_changed", playsoundOnLitStateChangedComponent);
});
```

</TabItem></Tabs>

---

## `onBreak`属性

<Version version="1.21.130"/>

玩家放置方块前执行事件。适用脚本`@minecraft/server`版本`2.4.0`或更高。

<Tabs><TabItem value="参数" label="参数" default>

```TypeScript
onBreak?: (arg0: BlockComponentBlockBreakEvent, arg1: CustomComponentParameters) => void
```

**参数**：

- `arg0`：[`BlockComponentBlockBreakEvent`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcomponentblockbreakevent?view=minecraft-bedrock-stable)类型，返回放置方块前的事件，包含方块、维度、方块破坏者等信息。
- `arg1`：[`CustomComponentParameters`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/customcomponentparameters?view=minecraft-bedrock-stable)类型，返回自定义组件中的参数。

</TabItem><TabItem value="示例" label="示例">

注册一个当方块被破坏后即生成实体的组件`"test:spawn_entity_on_break"`，该组件接收 2 个参数：<DataType type="string" name="entity_id" isRequired/>（生成的实体）和<DataType type="int" name="count"/>（生成的实体数量）。

```JavaScript showLineNumbers
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.beforeEvents.startup.subscribe(event => {
    /** @type {minecraft.BlockCustomComponent} */
    const spawnEntityOnBreakComponent = {
        onBreak: (compEvent, arg) => {
            /** @type {{entity_id: string, count?: number}} */ // @ts-ignore
            const params = arg.params;
            const entityId = params.entity_id;
            const count = params.count ?? 1;
            for (let i = 0; i < count; i++) { // @ts-ignore
                compEvent.dimension.spawnEntity(entityId, compEvent.block.location);
            }
        },
    };
    event.blockComponentRegistry.registerCustomComponent("test:spawn_entity_on_break", spawnEntityOnBreakComponent);
});
```

</TabItem></Tabs>

---

## `onEntity`属性

<Version version="26.10"/>

当实体触发`execute_event_on_home_block`事件时执行事件。适用脚本`@minecraft/server`版本`2.6.0`或更高。

:::warning[注意]

要使用`onEntity`事件，

:::

<Tabs><TabItem value="参数" label="参数" default>

```TypeScript
onEntity?: (arg0: BlockComponentEntityEvent, arg1: CustomComponentParameters) => void
```

**参数**：

- `arg0`：[`BlockComponentEntityEvent`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcomponententityevent?view=minecraft-bedrock-stable)类型，返回放置方块前的事件，包含方块、维度、触发实体等信息。
- `arg1`：[`CustomComponentParameters`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/customcomponentparameters?view=minecraft-bedrock-stable)类型，返回自定义组件中的参数。

</TabItem><TabItem value="示例" label="示例">

注册一个当方块被破坏后即生成实体的组件`"test:spawn_entity_on_break"`，该组件接收 2 个参数：<DataType type="string" name="entity_id" isRequired/>（生成的实体）和<DataType type="int" name="count"/>（生成的实体数量）。

```JavaScript showLineNumbers
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.beforeEvents.startup.subscribe(event => {
    /** @type {minecraft.BlockCustomComponent} */
    const spawnEntityOnBreakComponent = {
        onBreak: (compEvent, arg) => {
            /** @type {{entity_id: string, count?: number}} */ // @ts-ignore
            const params = arg.params;
            const entityId = params.entity_id;
            const count = params.count ?? 1;
            for (let i = 0; i < count; i++) { // @ts-ignore
                compEvent.dimension.spawnEntity(entityId, compEvent.block.location);
            }
        },
    };
    event.blockComponentRegistry.registerCustomComponent("test:spawn_entity_on_break", spawnEntityOnBreakComponent);
});
```

</TabItem></Tabs>

---
---

## 参考文档

- [接口`BlockCustomComponent` | projectxero.top](https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
