---
sidebar_position: 3
---

# 方块自定义组件

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"
import Button from '/src/components/button/base';

> 适用版本：国际版 26.30，中国版 3.8（1.21.90）。

方块自定义组件（Block Custom Component）允许开发者在数据驱动方块中使用自己规定的格式的组件。

方块自定义组件可通过 ScriptAPI 中世界启动前事件中的`StartupEvent.blockComponentRegistry.registerCustomComponent()`方法注册。

```TypeScript
registerCustomComponent(name: string, customComponent: BlockCustomComponent): void
```

其中，`name`属性注册为自定义组件的名称，而`customComponent`是一个接口[`BlockCustomComponent`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable)。下面给出接口`BlockCustomComponent`允许的所有属性，每个属性都接收一个两参数的函数，第一个参数返回对应事件，第二个参数返回自定义组件中的参数。

**每个组件条目下方的高亮标签均含注释，可鼠标悬停或手机点击查看**。例：<Highlight text="这是一个特殊标签" color="yellowgreen" tooltip="这是标签下的特殊注解。"/>。

---

## `beforeOnPlayerPlace`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.20" tooltip="在server模块脚本版本1.12.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#beforeonplayerplace"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#beforeonplayerplace"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#beforeonplayerplace"/>

玩家放置方块前执行事件。

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

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="26.30" tooltip="在server模块脚本版本2.8.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onblockstatechange"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onblockstatechange"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onblockstatechange"/>

方块状态被更改时执行事件。

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

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.130" tooltip="在server模块脚本版本2.4.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onbreakblock"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onbreakblock"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onbreakblock"/>

方块被破坏时执行事件。

<Tabs><TabItem value="参数" label="参数" default>

```TypeScript
onBreak?: (arg0: BlockComponentBlockBreakEvent, arg1: CustomComponentParameters) => void
```

**参数**：

- `arg0`：[`BlockComponentBlockBreakEvent`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcomponentblockbreakevent?view=minecraft-bedrock-stable)类型，返回破坏方块的事件，包含方块、维度、方块破坏者等信息。
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

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="26.10" tooltip="在server模块脚本版本2.6.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onentity"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onentity"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onentity"/>

<!--

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

```JavaScript showLineNumbers
```

</TabItem></Tabs>

-->

---

## `onEntityFallOn`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.20" tooltip="在server模块脚本版本1.12.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onentityfallon"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onentityfallon"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onentityfallon"/>

<Tabs><TabItem value="参数" label="参数" default>

```TypeScript
beforeOnPlayerPlace?: (arg0: BlockComponentEntityFallOnEvent, arg1: CustomComponentParameters) => void
```

**参数**：

- `arg0`：[`BlockComponentEntityFallOnEvent`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcomponententityfallonevent?view=minecraft-bedrock-stable)类型，返回实体跌落的事件，包含方块、维度、跌落实体、跌落高度等信息。
- `arg1`：[`CustomComponentParameters`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/customcomponentparameters?view=minecraft-bedrock-stable)类型，返回自定义组件中的参数。

</TabItem><TabItem value="示例" label="示例">

注册一个当实体落地即执行命令的组件`test:run_command_on_entity_fall_on`，该组件接收 1 个参数：<DataType type="string" name="command"/>（实体待执行的命令）。可结合[`minecraft:entity_fall_on`](./components#minecraftentity_fall_on)组件控制至少要高于多高的高度才能执行。

```JavaScript showLineNumbers
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.beforeEvents.startup.subscribe(event => {
    /** @type {minecraft.BlockCustomComponent} */
    const runCommandOnEntityFallOnComponent = {
        onEntityFallOn: (compEvent, arg) => {
            /** @type {{command: string}} */ // @ts-ignore
            const params = arg.params;
            compEvent.entity?.runCommand(params.command);
        },
    };
    event.blockComponentRegistry.registerCustomComponent("test:run_command_on_entity_fall_on", runCommandOnEntityFallOnComponent);
});
```

</TabItem></Tabs>

---

## `onPlace`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.20" tooltip="在server模块脚本版本1.12.0+下可用。"/>  <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onplace"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onplace"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onplace"/>

---

## `onPlayerBreak`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.20" tooltip="在server模块脚本版本1.12.0+下可用。"/> <Highlight text="更名" tooltip="在server模块脚本版本1.12.0-1.19.0，请使用onPlayerDestroy。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onplayerbreak"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onplayerbreak"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onplayerbreak"/>

对于曾用名`onPlayerDestroy`，另见：

<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/1.21.80/interfaces/_minecraft_server.BlockCustomComponent.html#onplayerdestroy"/>

---

## `onPlayerInteract`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.20" tooltip="在server模块脚本版本1.12.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onplayerinteract"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onplayerinteract"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onplayerinteract"/>

---

## `onRandomTick`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.20" tooltip="在server模块脚本版本1.12.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onrandomtick"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onrandomtick"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onrandomtick"/>

---

## `onRedstoneUpdate`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="26.0" tooltip="在server模块脚本版本2.0.0+下可用。"/> <Highlight text="需要前置组件" tooltip="要使用该组件，请事先定义minecraft:redstone_consumer组件。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onredstoneupdate"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onredstoneupdate"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onredstoneupdate"/>

此方块接收的红石信号更新后执行事件。

另见：*[`minecraft:redstone_consumer`](./components#minecraftredstone_consumer)组件*。

<Tabs><TabItem value="参数" label="参数" default>

```TypeScript
beforeOnPlayerPlace?: (arg0: BlockComponentRedstoneUpdateEvent, arg1: CustomComponentParameters) => void
```

**参数**：

- `arg0`：[`BlockComponentRedstoneUpdateEvent`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcomponentredstoneupdateevent?view=minecraft-bedrock-stable)类型，返回实体跌落的事件，包含方块、维度、新红石信号强度和旧红石信号强度（1.26.10+，脚本版本`2.6.0`+）等信息。
- `arg1`：[`CustomComponentParameters`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/customcomponentparameters?view=minecraft-bedrock-stable)类型，返回自定义组件中的参数。

</TabItem><TabItem value="示例" label="示例">

注册一个当接收到红石信号即使方块发光的组件`test:lit_on_redstone_update`，该组件接收 1 个参数：<DataType type="int" name="min_power"/>（至少应为多大的红石强度可激活）。可结合[`minecraft:redstone_consumer`](./components#minecraftredstone_consumer)组件控制至少要大于等于多少红石信号才能执行。

```JavaScript showLineNumbers title="脚本逻辑"
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.beforeEvents.startup.subscribe(event => {
    /** @type {minecraft.BlockCustomComponent} */
    const litOnRestoneUpdateComponent = {
        onRedstoneUpdate: (compEvent, arg) => {
            /** @type {{min_power: number}} */ // @ts-ignore
            const params = arg.params;
            // @ts-ignore
            const newBlockPermutation = compEvent.block.permutation.withState("test:is_lit", compEvent.powerLevel >= params.min_power ? true : false);
            compEvent.block.setPermutation(newBlockPermutation);
        },
    };
    event.blockComponentRegistry.registerCustomComponent("test:lit_on_redstone_update", litOnRestoneUpdateComponent);
});
```

这里定义了一个只有红石信号强度高于 10 才能被激活的红石灯。

```json showLineNumbers title="方块定义"
{
    "format_version": "1.26.10",
    "minecraft:block": {
        "description": {
            "identifier": "test:my_custom_lamp",
            "menu_category": {
                "category": "construction"
            },
            "states": {
                "test:is_lit": [false, true]
            }
        },
        "components": {
            "minecraft:geometry": "geometry.full_block",
            "minecraft:material_instances": { "*": { "texture": "redstone_lamp_off", "render_method": "blend" } },
            "minecraft:redstone_consumer": { "min_power": 0, "propagates_power": true },
            "test:lit_on_redstone_update": { "min_power": 10 }
        },
        "permutations": [
            {
                "condition": "query.block_state('test:is_lit')",
                "components": {
                    "minecraft:material_instances": { "*": { "texture": "redstone_lamp_on" } },
                    "minecraft:light_emission": 15
                }
            },
            {
                "condition": "!query.block_state('test:is_lit')",
                "components": {
                    "minecraft:material_instances": { "*": { "texture": "redstone_lamp_off" } },
                    "minecraft:light_emission": 0
                }
            }
        ]
    }
}
```

</TabItem></Tabs>

---

## `onStepOff`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.20" tooltip="在server模块脚本版本1.12.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onstepoff"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onstepoff"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onstepoff"/>

---

## `onStepOn`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.20" tooltip="在server模块脚本版本1.12.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#onstepon"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#onstepon"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#onstepon"/>

---

## `onTick`属性

<Usable type="onlyInternational" tooltip="因为该组件必须配合ScriptAPI使用。"/> <Version type="game" add="1.21.20" tooltip="在server模块脚本版本1.12.0+下可用。"/> <br/>

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable#ontick"/>
<Button text="JaylyMC" url="https://jaylydev.github.io/scriptapi-docs/latest/interfaces/_minecraft_server.BlockCustomComponent.html#ontick"/>
<Button text="projectxero.top" url="https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html#ontick"/>

<Tabs><TabItem value="参数" label="参数" default>

```TypeScript
beforeOnPlayerPlace?: (arg0: BlockComponentTickEvent, arg1: CustomComponentParameters) => void
```

**参数**：

- `arg0`：[`BlockComponentTickEvent`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcomponenttickevent?view=minecraft-bedrock-stable)类型，返回方块循环执行的事件，包含方块、维度。
- `arg1`：[`CustomComponentParameters`](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/customcomponentparameters?view=minecraft-bedrock-stable)类型，返回自定义组件中的参数。

</TabItem><TabItem value="示例" label="示例">

注册一个循环执行命令的组件`test:run_command_on_tick`，该组件接收 1 个参数：<DataType type="string" name="command"/>（实体待执行的命令）。可结合[`minecraft:tick`](./components#minecrafttick)组件控制循环执行频率。

```JavaScript showLineNumbers
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.beforeEvents.startup.subscribe(event => {
    /** @type {minecraft.BlockCustomComponent} */
    const runCommandOnTickComponent = {
        onTick: (compEvent, arg) => {
            /** @type {{command: string}} */ // @ts-ignore
            const params = arg.params;
            compEvent.dimension.runCommand(params.command);
        },
    };
    event.blockComponentRegistry.registerCustomComponent("test:run_command_on_tick", runCommandOnTickComponent);
});
```

</TabItem></Tabs>

---
---

## 参考文档

- [接口`BlockCustomComponent` | projectxero.top](https://projectxero.top/sapi/interfaces/server.BlockCustomComponent.html)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
