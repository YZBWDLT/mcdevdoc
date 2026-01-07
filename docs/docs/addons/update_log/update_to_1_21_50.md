# 关于网易更新到 1.21.50 的开发内容更新汇总

> 上次更新：2026 年 1 月 7 日

import DataType from "/src/components/type/data"

距离上一次发类似文章时隔半年。在寒假期间，网易将要正式发布 3.7 版本，并将版本进一步推进到 1.21.50。因此，同样地，这里将 1.21.0-1.21.50 的所有更新内容汇总到本文，供查阅本文的开发者参考！

关于网易的 3.7 版本的更新内容，参见[3.7 - 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcdocs/1-ModAPI-beta/%E6%9B%B4%E6%96%B0%E4%BF%A1%E6%81%AF/3.7.html?catalog=1)。我们在下文仅展示国际版重点更新内容。

**注**：我们仍然只挑出了一些重点内容，涵盖不完全，若有需要，读者可以在中文 Minecraft 查阅！

## 命令

> 备注：以下给出的命令都是可以点击的，会自动跳转到我们提供的文档。

### 新命令或新命令语法

- 为[`/spreadplayers`](/docs/docs/commands/all_commands#spreadplayers)加入了`[最高高度: value]`参数，以指定随机传送的最高高度：

  ```mcfunction
  /spreadplayers <x: value> <z: value> <实体间距离: float> <最大范围: float> <实体: target> [最高高度: value]
  ```

- 为[`/camera`](/docs/docs/commands/all_commands#camera)加入了一种新的第三人称相机预设`minecraft:follow_orbit`，称为轨道相机。详情见我们给出的文档（set - 轨道相机）。

  ```mcfunction
  /camera <玩家: target> set minecraft:follow_orbit [朝向] [视角偏移] [实体偏移]
  ```

- 为[`/reload`](/docs/docs/commands/all_commands#reload)加入了`[全部: reload_all]`参数，指定此参数后将自动退出地图并重进以应用大部分的附加包更改。

  ```mcfunction
  /reload [全部: reload_all]
  ```

- 为[`/effect`](/docs/docs/commands/all_commands#effect)加入了无限时长重载和移除特定状态效果的重载。

  ```mcfunction
  /effect <实体: target> <状态效果: Effect> infinite [放大倍率: int] [隐藏粒子: Boolean]
  /effect <实体: target> clear [状态效果: Effect]
  ```

- 为[`/schedule`](/docs/docs/commands/all_commands#schedule)加入了清除队列函数的重载。

  ```mcfunction
  /schedule clear <函数: filepath>
  /schedule on_area_loaded clear function <函数: filepath>
  /schedule on_area_loaded clear tickingarea <名称: string> [函数: filepath]
  ```

- 为[`/schedule`](/docs/docs/commands/all_commands#schedule)加入了延迟执行函数的重载，同时加入了清除延迟执行函数的重载。

  ```mcfunction
  /schedule delay add <函数: filepath> <时间: int> [replace|append]
  /schedule delay add <函数: filepath> <时间: int>T [replace|append]
  /schedule delay add <函数: filepath> <时间: int>S [replace|append]
  /schedule delay add <函数: filepath> <时间: int>D [replace|append]
  /schedule delay clear <函数: filepath>
  ```

- 新增了[`/aimassist`](/docs/docs/commands/all_commands#aimassist)，用于修改玩家的瞄准辅助，*但是仍为实验性玩法*。

  ```mcfunction
  /aimassist <玩家: target> clear
  /aimassist <玩家: target> set [x角度: float] [y角度: float] [最远距离: float] [瞄准模式: AimAssistTargetMode] [预设ID: string]
  ```

- 新增了[`/loot`](/docs/docs/commands/all_commands#loot)的模拟挖掘重载`mine`，*但是仍为实验性玩法*。

  ```mcfunction
  /loot <目标> mine <目标方块位置: x y z> [<tool>|mainhand|offhand: string]
  ```

- 新增了[`/place`](/docs/docs/commands/all_commands#place)，加入时仅可用于放置地物，*但是仍为实验性玩法，并且权限等级为 2，代表此命令不能在命令方块和函数中使用*。

  ```mcfunction
  /place feature <地物: features> [position: x y z]
  /place featurerule <featurerule: featureRules> [position: x y z]
  ```

### 命令改动

- 现在[`/stopsound`](/docs/docs/commands/all_commands#stopsound)不再能够停止音乐。
- 移除了方块状态`structure_void_type`。在相关命令的应用中需要注意。
- 移除了`/volumearea`（此命令最终仍然没能走出实验性玩法）。
- 加入了一种新的伤害类型`mace_smash`，可用于[`/damage`](/docs/docs/commands/all_commands#damage)。
- 现在游戏规则`showRecipeMessages`不再被视为作弊内容。
- 现在`/inputpermission`支持控制更多输入权限：`dismount`、`​jump`、`​lateral_movement`、`​mount`、`​move_backward`、`​move_forward`、`​move_left`、`​move_right`、`​sneak`。

### ID 拆分

| 物品或方块 | 旧 ID | 新 ID |
| --- | --- | --- |
| 铁砧 | `anvil` | `anvil`、`​chipped_anvil`、`​damaged_anvil`、`​deprecated_anvil` |
| 墙上的珊瑚扇 | `coral_fan_hang`、`coral_fan_hang2`、`coral_fan_hang3` | `tube_coral_wall_fan`、`​brain_coral_wall_fan`、`bubble_coral_wall_fan`、`​fire_coral_wall_fan`、`horn_coral_wall_fan`、`​dead_tube_coral_wall_fan`、`​dead_brain_coral_wall_fan`、`​dead_bubble_coral_wall_fan`、`​dead_fire_coral_wall_fan`、`​dead_horn_coral_wall_fan` |
| 蒲公英 | `yellow_flower` | `dandelion` |
| 泥土和砂土 | `dirt` | `dirt`、`​coarse_dirt` |
| 虫蚀方块 | `monster_egg` | `infested_stone`、`​infested_cobblestone`、`​infested_stone_bricks`、`​infested_mossy_stone_bricks`、`​infested_cracked_stone_bricks`、`​infested_chiseled_stone_bricks` |
| 光源方块 | `light_block` | `light_block_0`、​`light_block_1`、​`light_block_2`、​`light_block_3`、​`light_block_4`、​`light_block_5`、​`light_block_6`、​`light_block_7`、​`light_block_8`、​`light_block_9`、​`light_block_10`、​`light_block_11`、​`light_block_12`、​`light_block_13`、​`light_block_14`、​`light_block_15` |
| 海晶石及其变种 | `prismarine` | `prismarine`、`​dark_prismarine`、`​prismarine_bricks` |
| 石英块及其变种 | `quartz_block` | `quartz_block`、​`chiseled_quartz_block`、`​quartz_pillar`、`​smooth_quartz` |
| 红砂岩及其变种 | `red_sandstone` | `red_sandstone`、`​chiseled_red_sandstone`、`​cut_red_sandstone`、`​smooth_red_sandstone` |
| 沙子和红沙 | `sand` | `sand`、`​red_sand` |
| 砂岩及其变种 | `sandstone` | `sandstone`、`​chiseled_sandstone`、`​cut_sandstone`、​`smooth_sandstone` |
| 台阶 | `stone_block_slab2`、`stone_block_slab3`、`stone_block_slab4` | `red_sandstone_slab`、`​purpur_slab`、`​prismarine_slab`、`​dark_prismarine_slab`、`​prismarine_brick_slab`、`​mossy_cobblestone_slab`、`​smooth_sandstone_slab`、`​red_nether_brick_slab`、`end_stone_brick_slab`、`​smooth_red_sandstone_slab`、`​polished_andesite_slab`、`​andesite_slab`、`​diorite_slab`、`​polished_diorite_slab`、`​granite_slab`、`​polished_granite_slab`、`mossy_stone_brick_slab`、`​smooth_quartz_slab`、`​normal_stone_slab`、`​cut_sandstone_slab`、`​cut_red_sandstone_slab` |
| 双层台阶 | `double_stone_block_slab`、`double_stone_block_slab2`、`double_stone_block_slab3`、`double_stone_block_slab4` | `smooth_stone_double_slab`、`​sandstone_double_slab`、`​petrified_oak_double_slab`、`​cobblestone_double_slab`、`​brick_double_slab`、`​stone_brick_double_slab`、`​quartz_double_slab`、`​nether_brick_double_slab`、`red_sandstone_double_slab`、`​purpur_double_slab`、`​prismarine_double_slab`、`​dark_prismarine_double_slab`、`​prismarine_brick_double_slab`、`​mossy_cobblestone_double_slab`、`​smooth_sandstone_double_slab`、`​red_nether_brick_double_slab`、`end_stone_brick_double_slab`、`​smooth_red_sandstone_double_slab`、`​polished_andesite_double_slab`、`​andesite_double_slab`、`​diorite_double_slab`、`​polished_diorite_double_slab`、`​granite_double_slab`、`​polished_granite_double_slab`、`mossy_stone_brick_double_slab`、`​smooth_quartz_double_slab`、`​normal_stone_double_slab`、`​cut_sandstone_double_slab`、`​cut_red_sandstone_double_slab` |
| 石砖 | `stonebrick` | `sandstone`、`​chiseled_sandstone`、`​cut_sandstone`、​`smooth_sandstone` |
| 紫珀块及其变种 | `purpur_block` | `purpur_block`、`​purpur_pillar`、`​deprecated_purpur_block_1`、`​deprecated_purpur_block_2` |
| 墙 | `cobblestone_wall` | `cobblestone_wall`、`​mossy_cobblestone_wall`、`​granite_wall`、`​diorite_wall`、`​andesite_wall`、`​sandstone_wall`、`​brick_wall`、`​stone_brick_wall`、`​mossy_stone_brick_wall`、`​nether_brick_wall`、`​end_stone_brick_wall`、`​prismarine_wall`、`​red_sandstone_wall`、`​red_nether_brick_wall` |
| 彩色火把 | `colored_torch_rg`、`​colored_torch_bp` | `colored_torch_red`、`​colored_torch_green`、`​colored_torch_blue`、`​colored_torch_purple` |
| 海绵和湿海绵 | `sponge` | `sponge`、`​wet_sponge` |
| TNT 和水下 TNT | `tnt` | `tnt`、`​underwater_tnt` |
| 化合物创建器及其变种 | `chemistry_table` | `compound_creator`、`​material_reducer`、`​element_constructor`、`​lab_table` |
| 头颅 | `skull` | `skeleton_skull`、`​wither_skeleton_skull`、`​zombie_head`、`​player_head`、`​creeper_head`、`​dragon_head`、`​piglin_head` |
| 蘑菇柄 | —— | `mushroom_stem` |

## 物品

> 备注：以下给出的组件是可以点击的，会自动跳转到我们提供的文档。

### 物品组件

- 开放了组件[`minecraft:custom_components`](/docs/docs/items/components#minecraftcustom_components)。*注意，这个组件对中国版是无效的，因为它需要 SAPI 才能发挥作用*。
- 开放了组件[`minecraft:damage_absorption`](/docs/docs/items/components#minecraftdamage_absorption)，以定义该物品在穿戴时可吸收何种类型的伤害，类似狼铠。
- 开放了组件[`minecraft:durability_sensor`](/docs/docs/items/components#minecraftdurability_sensor)，以定义物品在降低耐久度后触发的事件。
- 开放了组件[`minecraft:rarity`](/docs/docs/items/components#minecraftrarity)，以定义物品的稀有度。
- 开放了组件[`minecraft:storage_item`](/docs/docs/items/components#minecraftstorage_item)，以定义该物品为可存储物品，可以存储其他物品，类似于收纳袋。
- 开放了组件[`minecraft:bundle_interaction`](/docs/docs/items/components#minecraftbundle_interaction)，为物品启用收纳袋的交互模式和物品提示。
- 开放了组件[`minecraft:dyeable`](/docs/docs/items/components#minecraftdyeable)，以定义物品在炼药锅中可染色。
- 为组件[`minecraft:block_placer`](/docs/docs/items/components#minecraftblock_placer)添加了`replace_block_item`参数，使自定义物品使用所指定的对应方块的图标。

### 战利品表

- 开放了`set_potion`物品功能，以对箭或药水添加药效。

### 交易表

- 自 1.21.30 开始，村民交易表文件已版本化。

## 方块

> 备注：以下给出的组件是可以点击的，会自动跳转到我们提供的文档。

### 方块组件

- 开放了以下组件，*注意，这些组件对中国版是无效的，因为它们需要 SAPI 才能发挥作用*。
  - [`minecraft:custom_components`](/docs/docs/blocks/components#minecraftcustom_components)
  - [`minecraft:entity_fall_on`](/docs/docs/blocks/components#minecraftentity_fall_on)
  - [`minecraft:tick`](/docs/docs/blocks/components#minecrafttick)
- 开放了组件[`minecraft:redstone_conductivity`](/docs/docs/blocks/components#minecraftredstone_conductivity)，以定义方块的红石导体属性。
- 开放了组件[`minecraft:destructible_by_mining`](/docs/docs/blocks/components#minecraftdestructible_by_mining)的`item_specific_speeds`参数。

### 其它

- 加入了一个原版方块标签`one_way_collidable`，用于模拟不会推动碰撞箱内的生物的门、活板门和栅栏门的单向碰撞。
- 高于格式版本`1.21.30`的`blocks.json`会认为已被扁平化的方块 ID 是过时 ID（例如：`stone_block_slab_4`），现在应该使用新版的已扁平化的 ID。
- 更新了拼图方块。

## 实体

> 备注：以下给出的组件是可以点击的，会自动跳转到 Microsoft Learn。

### 实体组件

- 在 1.21.20 开放了[`minecraft:follow_owner`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_follow_owner?view=minecraft-bedrock-stable)组件的`post_teleport_distance`参数。
- 在 1.21.20 开放了[`minecraft:behavior.swim_up_for_breath`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_swim_up_for_breath?view=minecraft-bedrock-stable)组件。
  - 原版河豚使用了此组件，任何基于`1.21.20`或更高版本的海豚构建的自定义内容都需要添加该组件以启用此 AI 行为。
- 在 1.21.20 开放了[`behavior.teleport_to_owner`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_teleport_to_owner?view=minecraft-bedrock-stable)组件。
- 在 1.21.20 将`minecraft:behavior.move_away_from_target`组件更名为[`minecraft:behavior.move_around_target`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_around_target?view=minecraft-bedrock-stable)组件。
- 1.21.30 后，组件[`minecraft:behavior.fire_at_target`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_fire_at_target?view=minecraft-bedrock-stable)、[`minecraft:behavior.jump_around_target`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_jump.around_target?view=minecraft-bedrock-stable)、[`minecraft:behavior.move_around_target`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_move_around_target?view=minecraft-bedrock-stable)不再限制于原版内容。
- 在 1.21.40 开放了[`minecraft:home`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_home?view=minecraft-bedrock-stable)组件的`restriction_type`参数，以定义如何将实体限制在其原点位置。
- 在 1.21.40 开放了[`minecraft:dimension_bound`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_dimension_bound?view=minecraft-bedrock-stable)组件，以阻止生物通过传送门切换维度。
- 在 1.21.40 开放了[`minecraft:transient`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_transient?view=minecraft-bedrock-stable)组件，以使其永远不会被世界保存（例如浮漂）。
- 在 1.21.40 将`minecraft:lookat`组件更名为[`minecraft:looked_at`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_looked_at?view=minecraft-bedrock-stable)组件，并大幅扩展了该组件的功能。
- 在 1.21.40，[`minecraft:damage_sensor`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_damage_sensor?view=minecraft-bedrock-stable)组件的`deals_damage`参数不再支持布尔值，而改为支持`yes`、`no`、`no_but_side_effects_apply`。
- 在 1.21.40，扩展了[`minecraft:explode`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_explode?view=minecraft-bedrock-stable)组件的功能。
- 在 1.21.50，扩展了[`behavior.summon_entity`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitygoals/minecraftbehavior_summon_entity?view=minecraft-bedrock-stable)组件，允许立即在所召唤的实体上调用事件。目前用于唤魔者。
- 在 1.21.50 开放了[`minecraft:cannot_be_attacked`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_cannot_be_attacked?view=minecraft-bedrock-stable)组件，以阻止其他实体攻击此实体。目前用于恶魂。
- 在 1.21.50 开放了[`minecraft:ignore_cannot_be_attacked`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_cannot_be_attacked?view=minecraft-bedrock-stable)组件，以允许其他实体攻击带有`minecraft:cannot_be_attacked`组件的实体。这样可以防止修改原版生物。

### 实体过滤器

- 加入了新的实体过滤器`owner_distance`，用于检查实体与其主人之间的距离。

### 实体事件

- 加入了新的实体事件`execute_event_on_home_block`，以令实体在位于其原点位置的方块上执行事件，*但是仍为实验性玩法*。目前用于嘎枝。
- 加入了新的实体事件`reset_target`，以令实体重置目标。目前用于嘎枝。
- 加入了新的实体事件`play_sound`，以令实体播放音效。1.21.50 时用于嘎枝，后续版本还对快乐恶魂、铜傀儡适用。
- 加入了新的实体事件`emit_particle`，以令实体释放粒子。目前用于嘎枝。

## Molang

- 开放了[`query.state_time`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_state_time?view=minecraft-bedrock-stable)，仅可在动画控制器中使用。
- 开放了[`query.client_memory_tier`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_client_memory_tier?view=minecraft-bedrock-stable)，返回表示客户端 RAM 内存层的数字，仅可在资源包使用。
- 开放了[`query.server_memory_tier`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_server_memory_tier?view=minecraft-bedrock-stable)，返回表示服务端 RAM 内存层的数字，仅可在行为包使用。
- 开放了[`query.client_max_render_distance`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_client_max_render_distance?view=minecraft-bedrock-stable)，返回当前客户端的区块中的最大渲染距离，仅可在资源包使用。
- 开放了[`query.last_input_mode_is_any`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_last_input_mode_is_any?view=minecraft-bedrock-stable)，返回上一次输入的控制方式，仅可在资源包使用。
- 开放了[`query.touch_only_affects_hotbar`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_touch_only_affects_hotbar?view=minecraft-bedrock-stable)，若触摸控制仅影响触控条，则返回`1.0`，否则返回`0.0`，仅可在资源包使用。

## ScriptAPI

SAPI 在从 1.21.20 到 1.21.50 的过程中，`@minecraft/server`的版本从`1.11.0`升级至`1.16.0`，`@minecraft/server-ui`的版本从`1.1.0`升级至`1.3.0`。以下为这些版本中的功能变化：

~*另外我是真的很想吐槽，Mojang 写脚本方面的更新日志简直太乱了，让人怀疑他们是不是连 markdown 都不会写。仔细一看就知道他们的更新日志写的真的是一坨，整理起来真的很耗精力！！*~

### 系统

- **运行代码**
  - 开放了`System.runJob()`方法、`System.clearJob()`方法，用于控制生成器运行。
  - 开放了`System.waitTicks()`方法，用于控制异步运行。
- **平台信息检查**
  - 开放了`MemoryTier`枚举，代表内存性能。
  - 开放了`SystemInfo`类
  - 开放了`System.serverSystemInfo`属性，以获取服务器的信息。

### 世界

- **游戏规则**：开放了`GameRule.ShowDaysPlayed`属性和`GameRules.showDaysPlayed`属性。
- **世界前事件**
  - **世界初始化事件**：开放了`WorldInitializeBeforeEvent`类、`WorldInitializeBeforeEventSignal`类和`WorldBeforeEvents.worldInitialize`属性。在该事件中定义自定义物品和方块组件。
  - **玩家与方块交互前事件**：
    - 开放了`PlayerInteractWithBlockBeforeEvent.isFirstEvent`属性，以判断这次交互是不是自玩家开始交互以来的第一次交互。
    - 开放了`ItemUseOnBeforeEvent.isFirstEvent`属性，以判断这次交互是不是自玩家开始交互以来的第一次交互。
    - 开放了`WorldBeforeEvents.playerInteractWithBlock`属性，玩家与方块交互前触发事件。
  - **玩家与实体交互前事件**：
    - 开放了`WorldBeforeEvents.playerInteractWithEntity`属性，玩家与实体交互前触发事件。
- **世界后事件**
  - **方块爆炸事件**：开放了`BlockExplodeAfterEvent`类、`BlockExplodeAfterEventSignal`类和`WorldAfterEvents.blockExplode`属性，可监听类似重生锚爆炸的事件。
  - **玩家权限更改事件**：开放了`PlayerInputPermissionCategoryChangeAfterEvent`类、`PlayerInputPermissionCategoryChangeAfterEventSignal`类和`WorldAfterEvents.playerInputPermissionCategoryChanged`属性，可监听玩家权限更改。
  - **实体击打方块事件**：开放了`EntityHitBlockAfterEvent.hitBlockPermutation`属性。
  - **玩家播放表情事件**：开放了`PlayerEmoteAfterEvent`类、`PlayerEmoteAfterEventSignal`类和`WorldAfterEvents.playerEmote`属性，用于监听玩家播放类似挥手动作的事件。
  - **玩家与方块交互后事件**：
    - 开放了`PlayerInteractWithBlockAfterEvent.isFirstEvent`属性，以判断这次交互是不是自玩家开始交互以来的第一次交互；
    - 开放了`PlayerInteractWithBlockAfterEvent.beforeItemStack`属性，返回在交互前所使用的物品信息；
    - 现在只有成功交互后才会触发后事件，因此空手时不会触发此事件；
    - 开放了`ItemUseOnAfterEvent.isFirstEvent`属性，以判断这次交互是不是自玩家开始交互以来的第一次交互。
    - 开放了`WorldAfterEvents.playerInteractWithBlock`属性，玩家与方块交互后触发事件。
  - **玩家与实体交互后事件**：
    - 开放了`WorldAfterEvents.playerInteractWithEntity`属性，玩家与实体交互后触发事件。
- 开放了`World.isHardcore`属性，用于判断这个世界是否为极限模式。

### 维度

- 开放了`Dimension.getTopmostBlock()`方法和`VectorXZ`接口，以获取最高处方块。
- 开放了`Dimension.setBlockPermutation()`方法和`Dimension.setBlockType()`方法，以在世界中便捷地放置方块。
- 开放了`Dimension.containsBlock()`，检查提供的方块域是否含有特定方块。
- 开放了`Dimension.getBlocks()`，获取提供的方块域内特定的方块信息。
- **方块填充**
  - 开放了`Dimension.fillBlocks()`方法，在提供的方块域内按要求填充方块。
  - 开放了`BlockFillOptions`接口。
  - 开放了`UnloadedChunksError`类，在玩家尝试在已加载的区块外填充方块时报错。

### 方块

- **方块组件**：
  - 开放了`BlockRecordPlayerComponent`类，以获取方块的唱片机性质。
  - 开放了`BlockFluidContainerComponent`类，以获取液体容器的性质（类似炼药锅）。
- **自定义数据驱动方块组件**
  - 开放了`BlockCustomComponent`接口。
  - 开放了`BlockComponentRegistry`类，用于注册自定义方块组件。
  - 开放了`BlockComponentStepOnEvent`类，用于在实体踏上此方块后执行代码。
  - 开放了`BlockComponentStepOffEvent`类，用于在实体离开此方块后执行代码。
  - 开放了`BlockComponentTickEvent`类，用于此方块定期地循环执行代码。
  - 开放了`BlockComponentRandomTickEvent`类，用于此方块根据随机刻循环执行代码。
  - 开放了`BlockComponentEntityFallOnEvent`类，用于在实体落到此方块后执行代码。
  - 开放了`BlockComponentPlayerInteractEvent`类，用于在玩家与此方块交互后执行代码。
  - 开放了`BlockComponentPlayerPlaceBeforeEvent`类，用于在玩家放置此方块之前执行代码。
  - 开放了`BlockComponentPlayerDestroyEvent`类，用于在玩家破坏此方块后执行代码。
  - 开放了`BlockComponentOnPlaceEvent`类，用于在此方块被放下前执行代码。
  - 开放了`BlockCustomComponentAlreadyRegisteredError`类，当此组件已被注册时报错。
  - 开放了`BlockCustomComponentReloadVersionError`类，当使用不同脚本版本在重载之间注册自定义方块组件时报错。
  - 开放了`BlockCustomComponentReloadNewEventError`类，当注册自定义方块组件，该组件实现了新的事件时报错。
  - 开放了`BlockCustomComponentReloadNewComponentError`类，当在重载之间注册自定义方块组件时报错。
- 开放了`BlockPermutation.getTags()`方法和`BlockPermutation.hasTag()`方法，以获取方块标签。
- 开放了`Block.getRedstonePower()`方法，获取方块的充能能量。
- **方块域**
  - 开放了`BlockVolume`类，以定义方块域。
  - 开放了`BlockVolumeIntersection`枚举，代表两个方块域的重叠情况。
  - 开放了`BlockLocationIterator`类，以定义方块域的位置迭代器。
  - 开放了`BlockVolumeBase.getBlockLocationIterator()`方法，以获取方块域对应的位置迭代器。
  - 开放了`InvalidIteratorError`类，当迭代器无效时报错。
- 开放了`FluidContainer`类。

### 实体

- **实体组件**
  - 为多个实体组件类的`setCurrentValue`加入了越界检查。
  - 开放了`EntityTameableComponent`类，获取实体可被驯服参数。
  - 开放了`EntityAgeableComponent`类，获取实体长大参数。
  - 开放了`EntityLeashableComponent`类，获取实体可被栓绳拴住参数。
  - 开放了`EntityMovementComponent`类，获取实体移动参数。
  - 开放了`EntityLavaMovementComponent`类，获取实体在熔岩中的移动参数。
  - 开放了`EntityMovementGlideComponent`类，获取实体滑翔的移动参数。
  - 开放了`EntityMovementSwayComponent`类，获取实体~左右横跳~左右移动的移动参数。
  - 开放了`EntityUnderwaterMovementComponent`类，获取实体在水下中的移动参数。
  - 开放了`EntityBreathableComponent`类，获取实体呼吸的移动参数。
  - 开放了`EntityStrengthComponent`类，获取实体承载物品能力的参数（例如驴、羊驼）。
  - 完善了`EntityTameMountComponent`类，开放`tameToPlayer()`方法和`tamedToPlayerId`、`​tamedToPlayer`、`​isTamed`和`​isTamedToPlayer`属性。
- 开放了`Entity.addEffect()`方法，以对实体添加状态效果。
- 完善了`EntityRaycastOptions`接口，开放`ignoreBlockCollision`属性、`includeLiquidBlocks`属性和`includePassableBlocks`属性。
- 开放了`EntityQueryPropertyOptions`接口。

### 玩家

- **玩家权限**：开放了`PlayerInputPermissions`类、`Player.inputPermissions`属性和`InputPermissionCategory`枚举，以获取玩家的输入权限。
- **玩家组件**：开放了`PlayerCursorInventoryComponent`类，以获取玩家鼠标光标选取的物品。在移动端不会起作用。
- **平台信息检查**：
  - 开放了`PlatformType`枚举，代表玩家当前所使用的平台。
  - 开放了`ClientSystemInfo`类，以获取玩家当前所使用的平台信息。
  - 开放了`Player.clientSystemInfo`属性，以获取玩家客户端的信息。

### 物品

- **附魔**：开放了`EnchantmentTypes.getAll()`方法，以获取此物品上的全部附魔。
- **自定义数据驱动物品组件**：
  - 开放了`ItemCustomComponent`接口。
  - 开放了`ItemComponentRegistry`类，用于注册自定义物品组件。
  - 开放了`ItemComponentBeforeDurabilityDamageEvent`类，用于在物品损失耐久度前执行代码。
  - 开放了`ItemComponentCompleteUseEvent`类，用于在此物品使用完成后执行代码。
  - 开放了`ItemComponentConsumeEvent`类，用于在物品被食用后执行代码。
  - 开放了`ItemComponentHitEntityEvent`类，用于在用此物品击中实体时执行代码。
  - 开放了`ItemComponentMineBlockEvent`类，用于在用此物品挖掘方块时执行代码。
  - 开放了`ItemComponentUseEvent`类，用于在使用此物品时执行代码。
  - 开放了`ItemComponentUseOnEvent`类，用于在对某个方块使用此物品时执行代码。
- 开放了`ItemTypes`类，用于快速获取某个或全部 Minecraft 已有的物品并输出为`ItemType`。

### 脚本 UI

- 开放了`UIManager`类和`uiManager`对象，以便捷关闭所有玩家的 UI。
- 开放了`ModalFormData.submitButton()`方法，以更改 Modal 表单的“提交”按钮文本。

---

## 参考文档

- [基岩版 1.21.20 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%9F%BA%E5%B2%A9%E7%89%881.21.20)
- [基岩版 1.21.30 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%9F%BA%E5%B2%A9%E7%89%881.21.30)
- [基岩版 1.21.40 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%9F%BA%E5%B2%A9%E7%89%881.21.40)
- [基岩版 1.21.50 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%9F%BA%E5%B2%A9%E7%89%881.21.50)
- [Script API Reference - JaylyMC](https://jaylydev.github.io/scriptapi-docs/)（包括其中的文档也被参考）

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
