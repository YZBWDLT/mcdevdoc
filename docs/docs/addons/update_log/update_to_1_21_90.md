# 关于网易更新到 1.21.90 的开发内容更新汇总

> 上次更新：2026 年 4 月 18 日

import DataType from "/src/components/type/data"

随着网易正式宣布加快更新节奏，这次网易将要正式发布 3.8 版本，并将版本进一步推进到 1.21.90，也正式拉近了和国际版的时间差距。这里将 1.21.60-1.21.90 的所有更新内容汇总到本文，供查阅本文的开发者参考！

关于网易的 3.8 版本的更新内容，参见[3.8 - 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcdocs/1-ModAPI-beta/%E6%9B%B4%E6%96%B0%E4%BF%A1%E6%81%AF/3.8.html?catalog=1)。我们在下文仅展示国际版重点更新内容。

**注**：我们仍然只挑出了一些重点内容，涵盖不完全，若有需要，读者可以在中文 Minecraft 查阅！

## 游戏内容

- 更新了[春意盎然](https://zh.minecraft.wiki/w/春意盎然)主题更新。
- 更新了[追逐天空](https://zh.minecraft.wiki/w/追逐天空)主题更新。
- 更新了多种超平坦预设（但没有虚空预设）。
- 在国际版更新了基于渲染龙的[Vibrant Visuals](https://zh.minecraft.wiki/w/Vibrant_Visuals)。

## 命令

- 现在嘎枝之心使用方块状态`creaking_heart_state`，可能的值为`uprooted`、`dormant`、`awake`。
- 新增游戏规则`locatorBar`。
- 新增了[`/loot`](/docs/docs/commands/all_commands#loot)的模拟挖掘重载`mine`。

  ```mcfunction
  /loot <目标> mine <目标方块位置: x y z> [<tool>|mainhand|offhand: string]
  ```

- 新增了[`/aimassist`](/docs/docs/commands/all_commands#aimassist)，用于修改玩家的瞄准辅助。

  ```mcfunction
  /aimassist <玩家: target> clear
  /aimassist <玩家: target> set [x角度: float] [y角度: float] [最远距离: float] [瞄准模式: AimAssistTargetMode] [预设ID: string]
  ```

- 新增了[`/place`](/docs/docs/commands/all_commands#place)，加入时仅可用于放置地物，*但是权限等级为 2，代表此命令不能在命令方块和函数中使用*。

  ```mcfunction
  /place feature <地物: features> [位置: x y z]
  /place featurerule <地物规则: featureRules> [位置: x y z]
  /place jigsaw <pool: filepath> <jigsawTarget: string> <maxDepth: int> [pos: x y z] [keepJigsaws: Boolean] [liquidSettings: LiquidSettings]
  /place structure <structure: string> [pos: x y z] [ignoreStartHeight: Boolean] [keepJigsaws: Boolean] [liquidSettings: LiquidSettings]
  ```

- 新增了[`/controlscheme`](/docs/docs/commands/all_commands#controlscheme)，用于修改相机预设的控制方案。此命令需要结合`/camera`使用。

  ```mcfunction
  /controlscheme <玩家: target> set <控制方案: controlscheme>
  /controlscheme <玩家: target> clear
  ```

## 附加包

- 现在可以通过在清单文件中指定元数据，使得安装附加包后仍可获得成就。
  
  ```json
  "metadata": {
      "product_type": "addon"
  }
  ```

## 编辑器

- 自 1.21.90 开始，Editor 在正式版可用。

## 物品

### 物品组件

- 拆分了组件[`minecraft:storage_item`](/docs/docs/items/components#minecraftstorage_item)中的两个参数为两个新组件[`minecraft:storage_weight_limit`](/docs/docs/items/components#minecraftstorage_weight_limit)和[`minecraft:storage_weight_modifier`](/docs/docs/items/components#minecraftstorage_weight_modifier)。
- 开放了组件[`minecraft:compostable`](/docs/docs/items/components#minecraftcompostable)，以定义物品可在堆肥桶中用于堆肥。
- 开放了组件[`minecraft:block_placer`](/docs/docs/items/components#minecraftblock_placer)中的`replace_block_placer`参数，以确定是否将此物品与对应方块绑定，若绑定则当方块被破坏后将掉落该物品。
- 开放了组件[`minecraft:wearable`](/docs/docs/items/components#minecraftwearable)中的`hides_player_location`参数，以确定穿戴后是否在定位栏中隐藏玩家位置。

### 自定义物品组件

:::warning[版本适用性警告]

请读者注意：自定义物品组件仍然只适用于国际版，并需要使用 ScriptAPI 定义其功能。

:::

- 自`1.21.90`格式版本开始，自定义物品组件采用 V2 版本，不再使用[`minecraft:custom_components`](/docs/docs/items/components#minecraftcustom_components)来指定自定义组件，而是使用类似于其他原版组件的写法，并可以在组件内部传入参数。例如：

  ```json
  "components": {
      "minecraft:icon": "stick",
      "test:execute_command_on_use": {
          "command": "say 1"
      }
  }
  ```

- 因此，[`minecraft:custom_components`](/docs/docs/items/components#minecraftcustom_components)组件已被弃用。

### 物品组

- 现在国际版正式支持[自定义物品组](/docs/docs/items/item_category_and_group#自定义物品组)。同时，`1.21.60`或更高格式版本的物品在指定物品组时必须指定命名空间。

### 战利品表

- 现在战利品表条件[`match_tool`](/docs/docs/items/loot_tables#match_tool)可以使用物品标签筛选。

## 方块

### 方块组件

- 开放了组件[`minecraft:item_visual`](/docs/docs/blocks/components#minecraftitem_visual)，以定义方块在物品栏中的外观。
- 开放了组件[`minecraft:liquid_detection`](/docs/docs/blocks/components#minecraftliquid_detection)，以定义方块在接触到液体后的行为。
- 开放了组件[`minecraft:material_instances`](/docs/docs/blocks/components#minecraftmaterial_instances)中的多个参数：
  - `ambient_occlusion`，定义方块的环境光遮挡。
  - `isotropic`，定义方块的各向同性（是否随机旋转 UV）。
  - `tint_method`，定义方块的着色方法。同时，手持此方块时也会着色（和平原群系一致）。
  - `render_method`，新增了 3 个预设渲染方法：`blend_to_opaque`、`alpha_test_to_opaque`、`alpha_test_single_sided_to_opaque`。
- 开放了组件[`minecraft:replaceable`](/docs/docs/blocks/components#minecraftreplaceable)，以定义方块是否可被另一种方块在原位替代（类似于水、草丛或空气）。
- 开放了组件[`minecraft:map_color`](/docs/docs/blocks/components#minecraftmap_color)的`tint_method`属性，以定义方块的着色方法，将将颜色与预定义的色调相乘。
- 开放了组件[`minecraft:destruction_particles`](/docs/docs/blocks/components#minecraftdestruction_particles)，以定义方块被破坏后掉落的粒子。
- 在格式版本`1.21.80`之后，使用[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件或[`minecraft:material_instances`](/docs/docs/blocks/components#minecraftmaterial_instances)组件时必须同时包含这两个组件。

### 自定义方块组件

:::warning[版本适用性警告]

请读者注意：自定义方块组件仍然只适用于国际版，并需要使用 ScriptAPI 定义其功能。

:::

- 自`1.21.90`格式版本开始，自定义方块组件采用 V2 版本，不再使用[`minecraft:custom_components`](/docs/docs/blocks/components#minecraftcustom_components)来指定自定义组件，而是使用类似于其他原版组件的写法，并可以在组件内部传入参数。例如：

  ```json
  "components": {
      "test:execute_command_on_break": {
          "command": "say 1"
      }
  }
  ```

- 因此，[`minecraft:custom_components`](/docs/docs/blocks/components#minecraftcustom_components)组件已被弃用。

### 方块面剔除

- 现在允许在资源包内通过`block_culling`文件夹指定[面剔除规则](/docs/docs/blocks/culling)，并能够通过[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件的`culling_layer`参数进行方块面剔除。

### 方块资源包定义

- 对`blocks.json`引入了`material_instances_exponent`以定义方块的环境光遮挡指数，并为损坏的`brightness_gamma`提供替代解决方案。

## 实体

### 实体组件

- 在格式版本`1.21.60`开放了组件[`minecraft:renders_when_invisible`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_renders_when_invisible?view=minecraft-bedrock-stable)，以保证实体在不可见（例如隐身）后仍然渲染。
- 在格式版本`1.21.60`开放了组件[`minecraft:breedable`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_breedable?view=minecraft-bedrock-stable)的诸多属性，以使得子代实体可以继承父代的属性。
- 在格式版本`1.21.60`开放了组件[`minecraft:looked_at`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_looked_at?view=minecraft-bedrock-stable)的`min_looked_at_duration`属性，以使得子代实体可以继承父代的属性。
- 一些使用效果持续时间的组件现在可以被设置为`infinite`。
- 在格式版本`1.21.70`开放了组件[`minecraft:is_collidable`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_is_collidable?view=minecraft-bedrock-stable)，以使得实体拥有不可穿过的碰撞箱（类似于船、快乐恶魂）。
- 在格式版本`1.21.70`开放了组件[`minecraft:entity_sensor`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_entity_sensor?view=minecraft-bedrock-stable)的 2 个参数`y_offset`和`find_players_only`。
- 在格式版本`1.21.70`开放了组件[`minecraft:body_rotation_axis_aligned`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_axis_aligned?view=minecraft-bedrock-stable)，以使得实体根据当前朝向自动旋转。
- 在格式版本`1.21.80`开放了组件[`minecraft:rideable`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_rideable?view=minecraft-bedrock-stable)的 5 个参数`dismount_mode`、`on_rider_enter_event`、`on_rider_exit_event`，在`seats`参数下开放了 2 个参数`third_person_camera_radius`和`camera_relax_distance_smoothing`。
- 在格式版本`1.21.80`更新了组件[`minecraft:leashable`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_leashable?view=minecraft-bedrock-stable)的`preset`属性，设置拴住实体的预设。
- 在格式版本`1.21.80`开放了组件[`minecraft:interact`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_interact?view=minecraft-bedrock-stable)的参数`drop_item_y_offset`，以定义丢弃物品时的 y 轴偏移。
- 在格式版本`1.21.90`开放了组件[`minecraft:remove_in_peaceful`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_remove_in_peaceful?view=minecraft-bedrock-stable)，以使得实体在和平难度下消失。
- 在格式版本`1.21.90`开放了组件[`minecraft:leashable_to`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_leashable_to?view=minecraft-bedrock-stable)，以使得玩家可以将自己正拴住的实体拴在该实体上。
- 在格式版本`1.21.90`开放了组件[`minecraft:input_air_controlled`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_input_air_controlled?view=minecraft-bedrock-stable)，以使得玩家可以控制可骑乘飞行实体。
- 在格式版本`1.21.90`开放了组件[`minecraft:body_rotation_always_follow_head`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_body_rotation_always_follow_head?view=minecraft-bedrock-stable)，以使得实体始终使自己的身体的旋转值对齐头部。

### 实体过滤器

- 加入了新的实体过滤器`home_distance`，以检查实体与其原点的距离，需要[`minecraft:home`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_home?view=minecraft-bedrock-stable)组件。
- 加入了新的实体过滤器`is_bound_to_creaking_heart`，以检查生成嘎枝的嘎枝之心是否存在。
- 加入了新的实体过滤器`has_equipment_tag`，以检查实体是否装备了特定物品标签的物品。
- 加入了新的实体过滤器`is_riding_self`，以检查实体是否被骑乘。
- 加入了新的实体过滤器`is_vehicle_family`，以检查实体是否正骑乘特定家族的实体。

### 实体事件

- 加入了新的实体事件`stop_movement`，使实体停止运动。可以指定`stop_vertical_movement`和`stop_horizontal_movement`分别控制实体停止竖直方向和水平方向的运动。
- 加入了新的实体事件`set_home_position`，设置实体的原点位置为当前位置。需要[`minecraft:home`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_home?view=minecraft-bedrock-stable)组件。
- 加入了新的实体事件`first_valid`，选定第一个符合条件的过滤器并执行。

### 实体音效

- 为`sounds.json`添加了可根据 Molang 数值读取特定变种音效的功能。可以在<DataType type="object" name="sounds"/> - <DataType type="string" name="key"/>中指定 Molang，在<DataType type="string" name="map"/>中根据读取 Molang 的值使用音效变种。例如：

  ```json showLineNumbers
  {
      "entity_sounds": {
          "entities": {
              "test_mob": {
                  "volume": 1.0,
                  "pitch": 1.0,
                  "events": {
                      "ambient": "mob.test_mob.ambient",
                      "death": "mob.test_mob.death",
                      "step": { "sound": "mob.test_mob.step", "volume": 0.8, "pitch": 1.0 },
                      "attack": "mob.test_mob.attack"
                  },
                  "variants": {
                      "key": "query.property('minecraft:emotional_state')",
                      "map": {
                          "neutral": {
                              "volume": 1.0,
                              "pitch": 1.0,
                              "events": { "death": "mob.test_mob.death.netural" }
                          },
                          "angry": {
                              "volume": 1.0,
                              "pitch": 1.0,
                              "events": { "death": "mob.test_mob.death.angry", "ambient": "mob.test_mob.ambient.angry" }
                          }
                      }
                  }
              }
          }
      }
  }
  ```

## Molang

- 开放了[`query.last_input_mode_is_any(...inputMode)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_last_input_mode_is_any?view=minecraft-bedrock-stable)，可传入玩家输入模式（`keyboard_and_mouse`、`touch`、`gamepad`或`motion_controller`）并返回是否有这些输入模式中的其中一种，仅可在资源包使用。
- 开放了[`query.touch_only_affects_hotbar`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_touch_only_affects_hotbar?view=minecraft-bedrock-stable)，返回触摸控制是否仅影响触控条，仅可在资源包使用。
- 开放了[`query.graphics_mode_is_any(...graphicsMode)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_graphics_mode_is_any?view=minecraft-bedrock-stable)，可传入玩家玩家画质设置（`simple`、`​fancy`、`​deferred`或​`raytraced`）并返回是否有这些画质设置中的其中一种，仅可在资源包使用。
- 开放了[`query.leashed_entity_count`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_leashed_entity_count?view=minecraft-bedrock-stable)，返回该实体拴住了多少个实体。
- 开放了[`query.has_any_leashed_entity_of_type(...entityType)`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_has_any_leashed_entity_of_type?view=minecraft-bedrock-stable)，返回该实体是否拴住了给定实体的其中一种。

## ScriptAPI（低于`2.0.0`版本）

SAPI 在从 1.21.60 到 1.21.90 的过程中，`@minecraft/server`的版本从`1.16.0`升级至`2.0.0`，`@minecraft/server-ui`的版本从`1.3.0`升级至`2.0.0`。需要注意：升级到`2.0.0`的脚本运行底层机制发生了变化，因此，贸然从旧版本升级到新版本的脚本可能会出现运行问题，请您逐步进行适配。

以下为`2.0.0`之前的版本中的功能变化：

### 系统

- 开放了`System.sendScriptEvent()`方法，以向脚本系统以服务器的名义发送脚本事件。

### 世界

- **难度**：
  - 开放了`Difficulty`枚举。
  - 开放了`World.getDifficulty()`方法和`World.setDifficulty()`方法，以获取或设置玩家的难度。
- **世界后事件**：
  - **输入模式改变事件**：开放了`PlayerInputModeChangeAfterEvent`类、`PlayerInputModeChangeAfterEventSignal`类和`WorldAfterEvents.playerInputModeChange`属性，可监听玩家输入模式的变更。
  - **玩家输入事件**：开放了`PlayerButtonInputAfterEvent`类、`PlayerButtonInputAfterEventSignal`类和`WorldAfterEvents.PlayerButtonInput`属性，可监听玩家输入。目前，可用于监听玩家是否按下潜行或跳跃按钮。
- **结构**：
  - 开放了`StructureManager.placeJigsaw()`和`StructureManager.placeJigsawStructure()`方法，以放置拼图和拼图结构。

### 维度

- 开放了`Dimension.placeFeature()`和`Dimension.placeFeatureRule()`方法，以放置地物。

### 方块

- **与水等流体相关的接口**：
  - 开放了`Block.isWaterlogged()`方法和`BlockPermutation.setWaterlogged()`方法，以指定方块是否含水。
  - 开放了`Block.canBeDestroyedByLiquidSpread()`和`BlockPermutation.canBeDestroyedByLiquidSpread()`方法，获取方块是否在接触水后被破坏。
  - 开放了`Block.canContainLiquid()`方法和`BlockPermutation.canContainLiquid()`方法，获取方块是否可以含水。
  - 开放了`Block.isLiquidBlocking()`方法和`BlockPermutation.isLiquidBlocking()`方法，获取方块是否会阻挡水的流动。
  - 开放了`Block.liquidCanFlowFromDirection()`方法和`BlockPermutation.liquidCanFlowFromDirection()`方法，获取水是否可以从给定方向流入此方块，或是否可以用水桶倒入此方块后从给定方向流出。
  - 开放了`Block.liquidSpreadCausesSpawn()`方法和`BlockPermutation.liquidSpreadCausesSpawn()`方法，获取方块接触水后是否会生成自身的掉落物。
  - 开放了`LiquidType`枚举。
- 自`1.18.0`版本开始，以下方法将使用泛型参数而非通用参数，这有助于编辑器的自动补全更好地计算。  
  但**需注意这对自定义方块的适配不佳**。如果你的脚本在更新到此版本后出现自动补全或 TypeScript 报错问题，可以使用`// @ts-ignore`忽略这些问题。
  - `Block.getComponent()`方法返回`BlockComponentReturnType<T> | undefined`泛型而非通用的`BlockComponent`。
  - `Block.getState()`方法使用`minecraftvanilladata.BlockStateSuperset[T] | undefined`泛型参数而非通用的`boolean | number | string`。
  - `Block.matches()`方法使用`BlockStateArg<T>`泛型参数而非通用的`Record<string, boolean | number | string>`。
  - `Block.resolve()`方法使用`BlockStateArg<T>`泛型参数而非通用的`Record<string, boolean | number | string>`。
  - `Block.withState()`方法使用`minecraftvanilladata.BlockStateSuperset[T]`泛型参数而非通用的`boolean | number | string`。

### 实体

- 自`1.18.0`版本开始，以下方法将使用泛型参数而非通用参数，这有助于编辑器的自动补全更好地计算。
  - `Entity.getComponent()`方法返回`EntityComponentReturnType<T> | undefined`泛型而非通用的`EntityComponent`。

### 玩家

- 开放了`Player.spawnParticle()`方法，以生成仅对该玩家可见的粒子。
- **玩家权限**：现在`InputPermissionCategory`枚举支持更多值，开放了`PlayerInputPermissions.isPermissionCategoryEnabled()`方法和`PlayerInputPermissions.setPermissionCategory()`方法以获取和设置玩家权限状态。
- **相机**：开放了`CameraTargetOptions`接口。
- **玩家输入**：
  - 开放了`InputInfo`类、`InputMode`枚举和`Player.inputInfo`属性，以获取玩家的输入操作信息。
  - 开放了`ButtonState`枚举、`InputButton`枚举。
- **客户端实体属性覆写**：
  - 开放了`Player.setPropertyOverrideForEntity()`方法、`Player.removePropertyOverrideForEntity()`方法、`Player.clearPropertyOverridesForEntity()`方法，以覆写玩家客户端层面观察到特定实体的实体属性。注意必须指定同步到客户端（`client_sync`为`true`）的实体属性。

### 物品

- **物品组件**：
  - 开放了在`ItemCompostableComponent`类，以获取物品的堆肥相关属性。
- 自`1.18.0`版本开始，以下方法将使用泛型参数而非通用参数，这有助于编辑器的自动补全更好地计算。
  - `ItemStack.getComponent()`方法返回`ItemComponentReturnType<T> | undefined`泛型而非通用的`ItemComponent`。

## ScriptAPI（`2.0.0`版本）

SAPI 在从 1.21.60 到 1.21.90 的过程中，`@minecraft/server`的版本从`1.16.0`升级至`2.0.0`，`@minecraft/server-ui`的版本从`1.3.0`升级至`2.0.0`。需要注意：升级到`2.0.0`的脚本运行底层机制发生了变化，因此，贸然从旧版本升级到新版本的脚本可能会出现运行问题，请您逐步进行适配。

`2.0.0`版本引入了**早期执行（Early-Execution）** 机制，因为在世界完全加载完毕之前，多数功能还不能正常执行，在世界加载完毕之前贸然执行某些代码可能出现问题。在引入了早期执行机制之后，只有少量内容可以在早期执行期间执行，例如监听某些事件、运行循环代码。例如，在`2.0.0`版本之前，这段代码可以正常执行：

```js showLineNumbers
import { world } from "@minecraft/server";

world.getPlayers().forEach(player => {
    player.sendMessage(`Hello, ${player.name}!`);
});
```

但`2.0.0`版本后，早期执行阶段不能调用`World.getPlayers()`方法，这会导致报错。作为替代，开发者可以在世界加载后事件`WorldLoadAfterEvent`中执行代码：

```js showLineNumbers
import { world } from "@minecraft/server";

world.afterEvents.worldLoad.subscribe(event => {
    world.getPlayers().forEach(player => {
        player.sendMessage(`Hello, ${player.name}!`);
    });
});
```

总体而言，`2.0.0`版本的脚本在世界加载时的变化如下图所示（图源来自[脚本 V2 概述 - Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/v2-overview?view=minecraft-bedrock-stable)）

![script_v2](/img/docs/docs/addons/update_log/update_to_1_21_90/script_v2.png)

以下为`2.0.0`的版本中的功能变化：

### 系统

- 开放了`System.isEditorWorld`属性，以获取是否为编辑器世界。
- **系统前事件**：开放了系统前事件`StartupEvent`类和`System.beforeEvent`属性，在游戏引擎发生某些事件前执行。
  - **启动事件**：将`WorldInitializeBeforeEvent`类、`WorldInitializeBeforeEventSignal`类和`WorldBeforeEvents.worldInitialize`属性分别重命名为`StartupEvent`类、`StartupBeforeEventSignal`类和`SystemBeforeEvents.startUp`属性，可在世界启动之前执行代码。
  - **关闭事件**：开放了`ShutdownEvent`类、`ShutdownBeforeEventSignal`类和`SystemBeforeEvents.shutdown`属性，可在世界关闭之前执行代码。
- 开放了`TicksPerDay`常量为`24000`。

### 世界

- **世界前事件**：
  - **玩家对方块使用物品事件**：移除此事件，同时移除了`ItemUseOnBeforeEvent`类、`ItemUseOnBeforeEventSignal`类和`WorldBeforeEvents.itemUseOn`属性，因为该事件与玩家与方块交互事件`PlayerInteractWithBlockBeforeEventSignal`功能重复。开发者应使用`WorldBeforeEvents.playerInteractWithBlock`代替之。
- **世界后事件**：
  - **按钮按下事件**：移除了`IButtonPushAfterEventSignal`类，因为这个类是多余的，事实上该事件在使用`ButtonPushAfterEventSignal`类。
  - **拉杆拉下事件**：移除了`ILeverActionAfterEventSignal`类，因为这个类是多余的，事实上该事件在使用`LeverActionAfterEventSignal`类。
  - **玩家进入事件**：移除了`IPlayerJoinAfterEventSignal`类，因为这个类是多余的，事实上该事件在使用`PlayerJoinAfterEventSignal`类。
  - **玩家离开事件**：移除了`IPlayerLeaveAfterEventSignal`类，因为这个类是多余的，事实上该事件在使用`PlayerLeaveAfterEventSignal`类。
  - **玩家生成事件**：移除了`IPlayerSpawnAfterEventSignal`类，因为这个类是多余的，事实上该事件在使用`PlayerSpawnAfterEventSignal`类。
  - **玩家对方块使用物品事件**：移除此事件，同时移除了`ItemUseOnAfterEvent`类、`ItemUseOnAfterEventSignal`类和`WorldAfterEvents.itemUseOn`属性，因为该事件与玩家与方块交互事件`PlayerInteractWithBlockAfterEventSignal`功能重复。开发者应使用`WorldAfterEvents.playerInteractWithBlock`代替之。
  - **世界加载事件**：将`WorldInitializeAfterEvent`类、`WorldInitializeAfterEventSignal`类和`WorldAfterEvents.worldInitialize`属性分别重命名为`WorldLoadAfterEvent`类、`WorldLoadAfterEventSignal`类和`WorldAfterEvents.worldLoad`属性。
- 移除了`World.playSound()`方法，开发者应使用`Dimension.playSound()`代替。
- **通用**
  - 对多个类加入了`isValid`属性，以检查其中的数据是否有效。这些类包括：
    - `Block`类。
    - `Camera`类。
    - `Component`类，包括其子类`EntityComponent`、`BlockComponent`、`ItemComponent`和子类的子类均有效。
    - `Container`类。
    - `ContainerSlot`类。
    - `Effect`类。
    - `Entity`类，包括其子类`Player`类。
    - `ScoreboardIdentity`类。
    - `ScoreboardObjective`类。
    - `ScreenDisplay`类。
    - `Structure`类。
  - 开放了`CustomComponentParameters`类，返回自定义组件（包括物品自定义组件和方块自定义组件）的参数值。
- 开放了`TintMethod`枚举。

### 维度

- 移除了`Dimension.runCommandAsync()`方法，因为事实上这个方法从来没有等待命令执行完毕才进行异步操作。开发者应使用`Dimension.runCommand()`取代。
- 开放了`Dimension.getBlockAbove()`和`Dimension.getBlockBelow()`方法，以获取特定位置上方或下方的方块。
- 更新了`Dimension.spawnEntity()`，更改了`identifier`参数的类型并提供了新的`options`参数。

### 方块

- **方块组件**：
  - 开放了`BlockMapColorComponent`，以获取方块在地图中显示颜色的相关属性。
- **自定义方块组件**：
  - 将`BlockComponentPlayerDestroyEvent`重命名为`BlockComponentPlayerBreakEvent`。
  - 开放了`BlockCustomComponentInstance`类，当使用`Block.getComponent()`获取自定义组件时返回该类。
  - 将`BlockFluidContainerComponent`中的`typeId`只读属性由`minecraft:fluidContainer`重命名为`minecraft:fluid_container`。

### 实体

- 更新了`Entity.applyKnockback()`方法，合并了参数`directionX: number, directionZ: number, horizontalStrength: number`为`horizontalForce: VectorXZ`以确定其水平方向的击退强度。
- 现在`Entity.hasComponent()`方法、`Entity.getComponent()`方法和`Entity.getComponents()`方法可能会抛出错误。
- 开放了`Entity.loolAt()`方法，使实体面向特定位置。
- 移除了`Entity.runCommandAsync()`方法，因为事实上这个方法从来没有等待命令执行完毕才进行异步操作。开发者应使用`Entity.runCommand()`取代。
- 移除了`EntityDamageCause`枚举中的`suicide`属性。
- **实体组件**：
  - 现在调用`EntityComponent.entity`属性可能会因实体无效而抛出错误。其子类的所有属性现在都可能会因实体无效而抛出错误。
  - 现在`EntityFrictionModifierComponent`类、`EntityMarkVariantComponent`类、`EntityPushThroughComponent`类、`EntityScaleComponent`类和`EntitySkinIdComponent`类的`value`是只读属性，开发者现在不应当再寻求通过脚本更改这些值。
  - 移除了`EntityGroundOffsetComponent`组件。

### 玩家

- 开放了`GraphicsMode`类和`Player.graphicsMode`属性，以获取玩家当前使用的画质设置。
- 将`GameMode`枚举中的属性全部重命名为首字母大写。
- 现在`PlayAnimationOptions`接口的`players`属性返回`Player[]`，而非`string[]`了。
- **相机**：
  - 移除了`CameraDefaultOptions`接口。
  - 将`CameraEaseOptions`接口重命名为`EaseOptions`接口。
  - 更改了`Camera.setCamera()`的类型要求。
  - 开放了`Camera.setDefaultCamera()`方法。
- **屏幕显示**：
  - 开放了`ScreenDisplay.resetHudElementsVisibility()`方法，以重置玩家的 HUD 可见性。

### 物品

- **自定义物品组件**：
  - 开放了`ItemCustomComponentInstance`类，当使用`ItemStack.getComponent()`获取自定义组件时返回该类。

### 脚本 UI

脚本 UI 的动作表单 UI 和模态表单 UI 现在都支持添加大标题、分割线和普通文本了，并且模态表单 UI 的元素还支持添加新的提示框。

![script_ui_v2](/img/docs/docs/addons/update_log/update_to_1_21_90/script_ui_v2.png)  
> 新版脚本 UI 演示，包括大标题和分割线，图片来自 xKingDark（取自[JaylyMC 的 SAPI 文档](https://jaylydev.github.io/scriptapi-docs/1.21.90/classes/_minecraft_server-ui.ModalFormData.html#dropdown)）。

- **动作表单 UI**：
  - 开放了`ActionFormUI.divider()`方法，以在 UI 内添加分割线。
  - 开放了`ActionFormUI.header()`方法，以在 UI 内添加一级标题。
  - 开放了`ActionFormUI.label()`方法，以在 UI 内添加文本。
- **模态表单 UI**：
  - 开放了`ModalFormUI.divider()`方法，以在 UI 内添加分割线。
  - 开放了`ModalFormUI.header()`方法，以在 UI 内添加一级标题。
  - 开放了`ModalFormUI.label()`方法，以在 UI 内添加文本。
  - 更新了`ModalFormUI.dropdown()`方法并开放了`ModalFormDataDropdownOptions`接口。
    - 将参数`options`更名为`items`。
    - 添加了新参数`dropdownOptions`，把原来的参数`defaultValueIndex`移动到了该选项中，并且支持通过`tooltip`添加提示框。
  - 更新了`ModalFormUI.slider()`方法并开放了`ModalFormDataSliderOptions`接口。
    - 添加了新参数`sliderOptions`，把原来的参数`valueStep`和`defaultValue`移动到了该选项中，并且支持通过`tooltip`添加提示框。
  - 更新了`ModalFormUI.textField()`方法并开放了`ModalFormDataTextFieldOptions`接口。
    - 添加了新参数`textFieldOptions`，把原来的参数`defaultValue`移动到了该选项中，并且支持通过`tooltip`添加提示框。
  - 更新了`ModalFormUI.toggle()`方法并开放了`ModalFormDataToggleOptions`接口。
    - 添加了新参数`toggleOptions`，把原来的参数`defaultValue`移动到了该选项中，并且支持通过`tooltip`添加提示框。

---

## 参考文档

- [基岩版 1.21.60 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%9F%BA%E5%B2%A9%E7%89%881.21.60)
- [基岩版 1.21.70 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%9F%BA%E5%B2%A9%E7%89%881.21.70)
- [基岩版 1.21.80 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%9F%BA%E5%B2%A9%E7%89%881.21.80)
- [基岩版 1.21.90 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%9F%BA%E5%B2%A9%E7%89%881.21.90)
- [Script API Reference - JaylyMC](https://jaylydev.github.io/scriptapi-docs/)（包括其中的文档也被参考）
- [`@minecraft/server` 更新日志 - Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
- [脚本 V2 概述 - Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/v2-overview?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
