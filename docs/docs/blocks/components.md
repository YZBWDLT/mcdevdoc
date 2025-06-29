---
sidebar_position: 2
---

# 方块组件

收录所有已开放或即将开放的命名空间为`minecraft`和`netease`的方块组件信息。

你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

:::info[本文更新时间]

本文于 2025 年 6 月 30 日更新，中国版最新版本为 1.21.0，国际版最新版本为 1.21.90。

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

:::note[组件可用性提示]

1. 标签记号说明：

    - 标注了<Version isLowVersion/>的组件，代表其为**旧版国际版组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。`format_version`必须指定`1.10.0`~`1.16.0`以内时才可使用。

    - 标注了<Version version="版本号"/>的组件，代表其为**新版国际版组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。其中，`（版本号）`代表方块定义的`format_version`必须指定为该版本号或更高才可使用。

    - 标注了<Version isChinaVersion/>的组件，代表其为**中国版组件**，可应用于**中国版方块定义**（在行为包<FileType type="folder" name="netease_blocks"/>定义的方块）。

    - 标注了<Version isBeta/>的组件，代表其为**实验性玩法组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。本文档不记载已被移除的实验性玩法组件（尤其是假日创作者功能的组件）。开发者在使用这些组件的时候应当万分小心，因为它们随时可能会被移除，这会导致你的资源的关键功能失效。

    - **注意：中国版可以同时使用国际版方块定义和中国版方块定义，但是国际版只能使用国际版方块定义**。

2. 如果官方文档中有记载，以上这些标签将会链接到官方文档。

:::

---

## `minecraft:block_light_absorption`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-block-light-absorption" isChinaVersion />

定义方块会吸收光，降低光照等级。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:light_dampening`](#minecraftlight_dampening)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)中查看该组件接受的参数。

:::

---

## `minecraft:block_light_emission`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-block-light-emission" isChinaVersion />

定义方块会发出光，提供光照等级。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:light_emission`](#minecraftlight_emission)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)中查看该组件接受的参数。

:::

---

## `minecraft:collision_box`

<Version version="1.19.50" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_collision_box?view=minecraft-bedrock-stable"/>

定义方块的碰撞箱。

---

## `minecraft:crafting_table`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_crafting_table?view=minecraft-bedrock-stable"/>

定义方块为一种工作台。

---

## `minecraft:custom_components`

<Version version="1.21.20 - 1.21.90" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_custom_components?view=minecraft-bedrock-stable"/>

定义方块的自定义组件。自定义组件的行为需要在世界初始化前事件`WorldInitializeBeforeEvent`中定义。

---

## `minecraft:destroy_time`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-destroy-time" isChinaVersion />

定义方块的挖掘时长。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:destructible_by_mining`](#minecraftdestructible_by_mining)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)中查看该组件接受的参数。

:::

---

## `minecraft:destructible_by_explosion`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_destructible_by_explosion?view=minecraft-bedrock-stable"/>

定义方块是否可被爆炸破坏，及其爆炸抗性。

---

## `minecraft:destructible_by_mining`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_destructible_by_mining?view=minecraft-bedrock-stable"/>

定义方块是否可被挖掘，及其挖掘时长。

---

## `minecraft:destruction_particles`

<Version version="1.21.70" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_destruction_particles?view=minecraft-bedrock-stable"/>

定义方块被破坏后掉落的粒子。

---

## `minecraft:display_name`

<Version version="1.19.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_display_name?view=minecraft-bedrock-stable"/>

定义方块在物品栏的悬浮文本。

---

## `minecraft:entity_fall_on`

<Version version="1.21.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_entity_fall_on?view=minecraft-bedrock-stable"/>

定义实体在多高处落到该方块上之后，才能触发 ScriptAPI 中自定义方块组件定义的`onEntityFallOn`事件。

---

## `minecraft:explosion_resistance`

<Version isLowVersion/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-explosion-resistance" isChinaVersion />

定义方块的爆炸抗性。

:::info[新版组件替代]

该组件在更高版本中用[`minecraft:destructible_by_explosion`](#minecraftdestructible_by_explosion)代替。你可以在这里的[旧版文档](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)中查看该组件接受的参数。

:::

---

## `minecraft:flammable`

<Version isLowVersion/> <Version version="1.19.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_flammable?view=minecraft-bedrock-stable"/>

定义方块为可燃方块。

---

## `minecraft:friction`

<Version isLowVersion/> <Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_friction?view=minecraft-bedrock-stable"/>

定义方块的摩擦力。

---

## `minecraft:geometry`

<Version version="1.21.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_geometry?view=minecraft-bedrock-stable"/>

定义方块的模型。

---

## `minecraft:item_visual`

<Version version="1.21.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_item_visual?view=minecraft-bedrock-stable"/>

定义方块在物品栏中的外观。

---

## `minecraft:light_dampening`

<Version version="1.19.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_light_dampening?view=minecraft-bedrock-stable"/>

定义方块会吸收光，降低光照等级。

---

## `minecraft:light_emission`

<Version version="1.19.20" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_light_emission?view=minecraft-bedrock-stable"/>

定义方块会发出光，提供光照等级。

---

## `minecraft:liquid_detection`

<Version version="1.21.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_liquid_detection?view=minecraft-bedrock-stable"/>

定义方块在接触到液体后的行为。

---

## `minecraft:loot`

<Version isLowVersion/> <Version docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_loot?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-loot" isChinaVersion />

定义方块被破坏后的战利品表。

---

## `minecraft:max_stack_size`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-max-stack-size" isChinaVersion />

定义方块物品最大堆叠数量。

---

## `minecraft:map_color`

<Version isLowVersion/> <Version docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_map_color?view=minecraft-bedrock-stable"/> <Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#minecraft-map-color" isChinaVersion />

定义方块在地图（物品）上显示的颜色。

---

## `minecraft:material_instances`

<Version version="1.19.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_material_instances?view=minecraft-bedrock-stable"/>

定义方块的材质实例。

---

## `minecraft:movable`

<Version version="1.21.90" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_movable?view=minecraft-bedrock-stable" isBeta/>

定义方块是否可被活塞推动，及其属性。

:::danger[警告]

要使用该组件，必须启用“即将到来的创作者功能”实验性玩法。需要注意：启用实验性玩法可能会导致游戏不稳定，并且正在实验性玩法的组件有可能会在后续的版本中被移除。

:::

---

## `minecraft:placement_filter`

<Version version="1.19.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_placement_filter?view=minecraft-bedrock-stable"/>

定义方块允许被放置或允许存在的条件。

---

## `minecraft:random_offset`

<Version version="1.21.100" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_random_offset?view=minecraft-bedrock-stable"/>

定义方块的贴图如何随机产生偏移。

---

## `minecraft:redstone_conductivity`

<Version version="1.21.40" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_redstone_conductivity?view=minecraft-bedrock-stable"/>

定义方块的红石导体属性。

---

## `minecraft:replaceable`

<Version version="1.21.70" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_replaceable?view=minecraft-bedrock-stable"/>

定义方块是否可被另一种方块在原位替代（类似于水、草丛或空气）。

---

## `minecraft:selection_box`

<Version version="1.19.60" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_selection_box?view=minecraft-bedrock-stable"/>

定义方块的选择箱。

---

## `tag:(标签)`

<Version version="?" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_tag?view=minecraft-bedrock-stable"/>

定义方块的标签。

---

## `minecraft:tick`

<Version version="1.21.10" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_tick?view=minecraft-bedrock-stable"/>

定义方块的更新频率，并触发 ScriptAPI 中自定义方块组件定义的`onTick`事件。

---

## `minecraft:transformation`

<Version version="1.21.0" docUrl="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_transformation?view=minecraft-bedrock-stable"/>

定义方块的平移、旋转、缩放变换。

---

## `netease:aabb`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-aabb" isChinaVersion />

定义方块的碰撞箱。

---

## `netease:block_animate_random_tick`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-animate-random-tick" isChinaVersion />

定义方块会高频率随机更新，并触发 ModAPI 的`BlockAnimateRandomTickEvent`。

---

## `netease:block_chest`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-chest" isChinaVersion />

定义方块的箱子功能。

---

## `netease:block_container`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-container" isChinaVersion />

定义方块为一种自定义容器。

---

## `netease:block_crafting_table`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/10-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B7%A5%E4%BD%9C%E5%8F%B0.html?catalog=1" isChinaVersion />

定义方块为一种自定义工作台。

---

## `netease:block_entity`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-entity" isChinaVersion />

定义方块的方块实体属性。

---

## `netease:block_properties`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-properties" isChinaVersion />

定义方块的属性。

:::note[编者注]

这里的方块属性不等于方块状态，请注意在这里不要混淆概念。

:::

---

## `netease:block_random_offset`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-block-random-offset" isChinaVersion />

定义方块的偏移（类似于花）。

---

## `netease:can_built_over`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/9-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E9%9B%AA%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块是否可被另一种方块在原位替代（类似于水、草丛或空气）。

---

## `netease:connection`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-connection" isChinaVersion />

定义方块的连接属性。

---

## `netease:custom_tips`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-custom-tips" isChinaVersion />

定义方块物品的物品信息描述。

---

## `netease:face_directional`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-face-directional" isChinaVersion />

定义方块的多面向功能。

---

## `netease:fall`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/6-%E8%87%AA%E5%AE%9A%E4%B9%89%E9%87%8D%E5%8A%9B%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块为重力方块，会受到重力的影响（类似于沙子）。

---

## `netease:fire_resistant`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-fire-resistant" isChinaVersion />

定义方块的防火属性。

---

## `netease:fuel`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-fuel" isChinaVersion />

定义方块对应物品的燃料属性。

---

## `netease:liquid`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/5-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B5%81%E4%BD%93.html?catalog=1" isChinaVersion />

定义方块为一种自定义流体。

---

## `netease:listen_block_remove`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-listen-block-remove" isChinaVersion />

定义方块在被移除后会触发 ModAPI 的`BlockRemoveServerEvent`事件。

---

## `netease:may_place_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-may-place-on" isChinaVersion />

定义方块允许被放置或允许存在的条件。

---

## `netease:mob_spawner`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/1-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%B7%E6%80%AA%E7%AE%B1.html?catalog=1" isChinaVersion />

定义方块为一种自定义刷怪笼。

---

## `netease:neighborchanged_sendto_script`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-neighborchanged-sendto-script" isChinaVersion />

定义方块在周围环境变化时，触发 ModAPI 的`BlockNeighborChangedServerEvent`事件。

---

## `netease:no_crop_face_block`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-no-crop-face-block" isChinaVersion />

定义方块与其他方块的相邻面能够正常渲染（类似于树叶）。

---

## `netease:on_after_fall_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-after-fall-on" isChinaVersion />

定义实体刚掉落到该方块上的时候是否触发 ModAPI 的`OnAfterFallOnBlockClientEvent`和`OnAfterFallOnBlockServerEvent`事件。

---

## `netease:on_before_fall_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-before-fall-on" isChinaVersion />

定义实体刚掉落到该方块上的时候是否触发 ModAPI 的`OnBeforeFallOnBlockServerEvent`事件。

---

## `netease:on_entity_inside`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-entity-inside" isChinaVersion />

定义实体碰撞箱内有实体的时候是否触发 ModAPI 的`OnEntityInsideBlockClientEvent`和`OnEntityInsideBlockServerEvent`事件。

---

## `netease:on_stand_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-stand-on" isChinaVersion />

定义当实体站在该方块后是否触发 ModAPI 的`OnStandOnBlockClientEvent`和`OnStandOnBlockServerEvent`事件。

---

## `netease:on_step_off`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-step-off" isChinaVersion />

定义当实体移动至该方块上后是否触发 ModAPI 的`StepOffBlockClientEvent`和`StepOffBlockServerEvent`事件。

---

## `netease:on_step_on`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-on-step-on" isChinaVersion />

定义当实体离开该方块上后是否触发 ModAPI 的`StepOnBlockClientEvent`和`StepOnBlockServerEvent`事件。

---

## `netease:pathable`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-pathable" isChinaVersion />

定义方块在实体 AI 寻路时是否被认作为障碍物。

---

## `netease:portal`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BC%A0%E9%80%81%E9%97%A8%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块为一种自定义传送门。

---

## `netease:random_tick`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-random-tick" isChinaVersion />

定义方块会随机更新，并触发 ModAPI 的`BlockRandomTickServerEvent`事件。

---

## `netease:redstone`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-redstone" isChinaVersion />

定义方块的红石电源元件或红石机械元件属性。

---

## `netease:redstone_property`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-redstone-property" isChinaVersion />

定义方块的红石属性。

---

## `netease:render_layer`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-render-layer" isChinaVersion />

定义方块渲染材质。

---

## `netease:snow_recover_able`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/9-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E9%9B%AA%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块是否可含雪（类似草方块、菌丝）。

---

## `netease:solid`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-solid" isChinaVersion />

定义方块是否实心。

---

## `netease:tier`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1#netease-tier" isChinaVersion />

定义方块的挖掘等级和挖掘相关属性。

---

## `netease:transform`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/3-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%9C%E4%BD%9C%E7%89%A9%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块的转换条件。用于自定义农作物。

---

## `netease:water_flow_source`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块在水源或水流中表现为含水方块。

---

## `netease:water_destroy`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块会被水流摧毁，且无法放置在水中（类似红石粉、火把等）。

---

## `netease:water_only`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块只能放置在水中（类似海带、海草等）。

---

## `netease:water_source`

<Version docUrl="https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/3-%E7%89%B9%E6%AE%8A%E6%96%B9%E5%9D%97/7-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%AB%E6%B0%B4%E6%96%B9%E5%9D%97.html?catalog=1" isChinaVersion />

定义方块在水源中表现为含水方块（类似台阶、楼梯等）。

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [方块组件列表 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/blockcomponentslist?view=minecraft-bedrock-stable)
- [JSON 组件 | 我的世界开发者官网](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/15-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B8%E6%88%8F%E5%86%85%E5%AE%B9/2-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%B9%E5%9D%97/1-JSON%E7%BB%84%E4%BB%B6.html?catalog=1)
- [方块文档 | 1.16.20.3 | bedrock.dev](https://bedrock.dev/docs/1.16.0.0/1.16.20.3/Blocks)
- [方块组件 | Bedrock Wki](https://wiki.bedrock.dev/blocks/block-components)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
