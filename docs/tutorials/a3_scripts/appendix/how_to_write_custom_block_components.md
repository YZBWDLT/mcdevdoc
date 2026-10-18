# 附录：如何编写方块自定义组件

import Version from "/src/components/highlight/version"

:::warning[注意]

本文所述内容仅适用于国际版的 ScriptAPI。示例基于`@minecraft/server@2.8.0`制作，每个实例都标注了各自的**最低**脚本版本。

:::

> 上次更新：2026 年 10 月 18 日
>
> 关键词：方块自定义组件（`BlockCustomComponent`）、组件注册（`BlockComponentRegistry.registerCustomComponent()`）、世界启动前事件（`StartupEvent`）、组件参数（`CustomComponentParameters`）等

方块自定义组件允许我们为数据驱动方块编写自定义的行为。它的思路很简单：先在方块 JSON 里以`"命名空间:组件名": { 参数 }`的形式使用一个「不存在的组件」，再在脚本启动时把这个名字注册成真正的逻辑，参数会原样传给脚本。

接口定义与各事件的字段详见[自定义方块组件](/docs/docs/scripts/sapi/server/system/custom_block_component)，本文只给出若干可直接套用的实例。

所有实例的注册方式都一样，统一写在世界启动前事件中：

```javascript showLineNumbers
import * as minecraft from "@minecraft/server";

minecraft.system.beforeEvents.startup.subscribe(event => {
    event.blockComponentRegistry.registerCustomComponent("命名空间:组件名", {
        // 事件回调
    });
});
```

在方块 JSON 的`components`中这样使用：

```json showLineNumbers
{
    "format_version": "1.21.20",
    "minecraft:block": {
        "description": {
            "identifier": "test:my_block",
            "menu_category": { "category": "construction" }
        },
        "components": {
            "minecraft:geometry": "geometry.full_block",
            "minecraft:material_instances": { "*": { "texture": "stone" } },
            "test:my_component": {}
        }
    }
}
```

---

## 限制玩家放置

<Version type="script" add="1.12.0"/>

注册组件`test:prevent_member_place`，阻止没有管理员权限的玩家放置方块。该组件不接收任何参数。

```javascript showLineNumbers
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

## 状态变化时播放音效

<Version type="script" add="2.8.0"/>

注册组件`test:playsound_on_lit_state_changed`，在`test:is_lit`方块状态变化时播放信标的激活／失效音效。该组件不接收任何参数。

```javascript showLineNumbers
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

## 破坏后生成实体

<Version type="script" add="2.4.0"/>

注册组件`test:spawn_entity_on_break`，方块被破坏后在原地生成若干个实体。该组件接收 2 个参数：`entity_id`（生成的实体）和`count`（生成的实体数量，可省略，默认为`1`）。

```json showLineNumbers
"test:spawn_entity_on_break": {
    "entity_id": "minecraft:zombie",
    "count": 3
}
```

```javascript showLineNumbers
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

## 实体落地时执行命令

<Version type="script" add="1.12.0"/>

注册组件`test:run_command_on_entity_fall_on`，实体落到方块上时执行指定命令。该组件接收 1 个参数：`command`（实体待执行的命令）。可以配合[`minecraft:entity_fall_on`](/docs/docs/blocks/components#minecraftentity_fall_on)组件，控制至少要高于多高的高度才会触发。

```json showLineNumbers
"test:run_command_on_entity_fall_on": {
    "command": "say 落地了"
}
```

```javascript showLineNumbers
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

## 红石控制方块发光

<Version type="script" add="2.5.0"/>

注册组件`test:lit_on_redstone_update`，方块收到足够的红石信号时点亮。该组件接收 1 个参数：`min_power`（至少应为多大的红石强度可激活），并配合[`minecraft:redstone_consumer`](/docs/docs/blocks/components#minecraftredstone_consumer)组件限制触发门槛。

下面是一个只有红石信号强度**大于等于 10** 才会被点亮的红石灯：

```javascript showLineNumbers title="脚本逻辑"
// @ts-check

import * as minecraft from "@minecraft/server";

minecraft.system.beforeEvents.startup.subscribe(event => {
    /** @type {minecraft.BlockCustomComponent} */
    const litOnRedstoneUpdateComponent = {
        onRedstoneUpdate: (compEvent, arg) => {
            /** @type {{min_power: number}} */ // @ts-ignore
            const params = arg.params;
            // @ts-ignore
            const newBlockPermutation = compEvent.block.permutation.withState("test:is_lit", compEvent.powerLevel >= params.min_power ? true : false);
            compEvent.block.setPermutation(newBlockPermutation);
        },
    };
    event.blockComponentRegistry.registerCustomComponent("test:lit_on_redstone_update", litOnRedstoneUpdateComponent);
});
```

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

## 定时执行命令

<Version type="script" add="1.12.0"/>

注册组件`test:run_command_on_tick`，按方块的更新频率循环执行命令。该组件接收 1 个参数：`command`（待执行的命令）。可以配合[`minecraft:tick`](/docs/docs/blocks/components#minecrafttick)组件调整执行频率。

```json showLineNumbers
"test:run_command_on_tick": {
    "command": "say 滴答"
}
```

```javascript showLineNumbers
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

---

## 参考文档

- [自定义方块组件 | 脚本文档](/docs/docs/scripts/sapi/server/system/custom_block_component)
- [方块自定义组件接口 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcustomcomponent?view=minecraft-bedrock-stable)
