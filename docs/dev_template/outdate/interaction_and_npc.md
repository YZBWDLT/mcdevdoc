# 交互实体与 NPC 文档

:::warning[注意]

本包是[实体预设：交互实体](./../entities/interaction_v2)和[实体预设：NPC](./../entities/npc/main_v2)的旧版本，目前已经停止更新。我们将群文档迁移前的旧版文档留在这里，但我们将不再对其中的内容进行更新。

我们建议您使用新版的实体预设来开发您的资源，新版的实体预设更稳定，并将继续维护更新。

:::

:::info[本包性质]

本包为**行为包**和**资源包**结合的包。

:::

:::warning[温馨提示]

使用此包之前，您需要确保您已经对自定义实体的运行机理有了大体的了解。否则，其中的自定义内容可能会让您感到理解起来非常吃力。

您可以在我们给出的一篇 Minecraft Wiki 的参考文章中了解到有关信息。

:::

装载本包之后，将在您的世界添加三种新实体：交互实体、NPC、适用于国际版的 NPC 。本包中含有 4 个文件夹。

- `BP_interaction_and_npc`：**基础**。通用于国际版和中国版的行为包内容。
- `RP_interaction_and_npc`：**基础**。通用于国际版和中国版的资源包内容。
- `BP_interaction_and_npc_international`：扩展包。适用于国际版的 NPC 扩展的行为包内容。
- `RP_interaction_and_npc_international`：扩展包。适用于国际版的 NPC 扩展的资源包内容。

## 交互实体

交互实体是 Java 版中一种无重力、无外观、无行为的实体。但是，该实体可以检测玩家对其进行的操作，即「攻击」和「交互」。

我们在基岩版实现了交互实体的基本功能，即攻击和交互的检测。

为防止其名称在玩家与其交互时显示出来，交互实体将常隐身。

为防止玩家在攻击交互实体时将其打死，交互实体将拥有高等级的抗性提升。

基本使用方法如下。

### 生成一个交互实体

您可以使用`/summon template:interaction ...`命令召唤一个交互实体。

您可以在生成时为其命名，便于您筛选合适的交互实体。例：

```text
summon template:interaction "bookshelf_interaction"
```

### 与交互实体右键（长按）交互时

在您与交互实体进行交互时，交互实体会执行函数`entities/interaction/interacted`。目前，我们在这个函数中写入了一条命令：

```text title="entities/interaction/interacted.mcfunction"
say 我被交互了！
```

因此，当您与该实体交互时，它将会说出“我被交互了！”。您可以自定义该函数的内容，使其在交互时能够符合您的需求。

### 与交互实体左键（点按）攻击时

在您攻击交互实体时，交互实体会执行函数`entities/interaction/attacked`。目前，我们在这个函数中写入了一条命令：

```text title="entities/interaction/attacked.mcfunction"
say 我被攻击了！
```

因此，当您攻击该实体时，它将会说出“我被攻击了！”。您可以自定义该函数的内容，使其在被攻击时能够符合您的需求。

### 自定义碰撞箱

我们指定了其默认状态下的碰撞箱为宽 1 格，高 1 格。但是，您可以自定义一个碰撞箱以符合您的需求。自定义的方法如下：

1. 打开交互实体的 SE 文件（`BP/entities/template/interaction.server_entity.json`），找到事件和组件组的内容：

   ```json title="BP/entities/template/interaction.server_entity.json"
   "events": {
       "minecraft:entity_spawned": { "add": { "component_groups": [ "default_size", "default_state" ] } },
       ...
   },
   "component_groups": {
       "default_size": {
           "minecraft:custom_hit_test": { "hitboxes": [ { "width": 1, "height": 1, "pivot": [ 0, 0.5, 0 ] } ] }
       },
       ...
   }
   ```

   这里，只展示了`"minecraft:entity_spawned"`事件和`"default_size"`组件组，是因为它们是决定碰撞箱的关键内容。只要您拥有一定的附加包基础，您可以很快理解这些内容。

2. 现在，我们要加入一个新的碰撞箱，例如宽 1 高 2 的交互实体。您需要加入一个新的组件组和新的事件：

   ```json title="BP/entities/template/interaction.server_entity.json"
   "events": {
       "minecraft:entity_spawned": { "add": { "component_groups": [ "default_size", "default_state" ] } },
       "w1_h2": { "add": { "component_groups": [ "w1_h2", "default_state" ] } },
       ...
   },
   "component_groups": {
       "default_size": {
           "minecraft:custom_hit_test": { "hitboxes": [ { "width": 1, "height": 1, "pivot": [ 0, 0.5, 0 ] } ] }
       },
       "w1_h2": {
           "minecraft:custom_hit_test": { "hitboxes": [ { "width": 1, "height": 2, "pivot": [ 0, 0.5, 0 ] } ] }
       },
       ...
   }
   ```

   其中`"w1_h2"`事件和`"w1_h2"`组件组是我们新加入的内容。

3. 然后，您可以使用下面的命令生成这样的实体：

   ```text
   summon template:interaction <坐标> <旋转> "w1_h2" [名称]
   ```

## NPC

本包添加了一种可用于交互和攻击的 NPC 。

### 生成一个 NPC

NPC 可以通过刷怪蛋生成，您可以在物品栏中找到名为「NPC 刷怪蛋」的刷怪蛋。生成后，实体将会被随机一个皮肤。

您也可以通过使用`/summon`命令直接生成一个带有名字的 NPC 。

### 与 NPC 右键（长按）交互时

和交互实体类似，在您与 NPC 进行交互时， NPC 会执行函数`entities/npc/interacted`。您可以自定义该函数的内容，使其在交互时能够符合您的需求。

如果您不需要此功能，请打开`BP/entities/template/npc.server_entity.json`，将以下代码删去：

```json title="BP/entities/template/npc.server_entity.json"
"minecraft:interact": {
    "interactions": [
        { "on_interact": { "event": "interacted", "target": "self" }, "interact_text": "action.interact.chat" }
    ]
}
```

然后，将该实体所对应的事件一并删去。

### 与 NPC 左键（点按）攻击时

和交互实体类似，在您攻击 NPC 时， NPC 会执行函数`entities/npc/attacked`。您可以自定义该函数的内容，使其在被攻击时能够符合您的需求。

如果您不需要此功能，请打开`BP/entities/template/npc.server_entity.json`，将以下代码删去：

```json title="BP/entities/template/npc.server_entity.json"
"minecraft:damage_sensor": { "triggers": [
    { "on_damage": { "event": "attacked", "target": "self" } }
] }
```

然后，将该实体所对应的事件一并删去。

### 自定义交互按钮

在手机版，与 NPC 交互时会在屏幕的下方展现一个交互的按钮。您可以在`RP/texts/en_US.lang`和`RP/texts/zh_CN.lang`中找到下面的内容：

```text
action.interact.chat=聊天
```

更改等号后面的内容，将改变按钮的显示内容。

### 为 NPC 更改或添加更多的皮肤

NPC 的所有皮肤在`RP/textures/entity/npc/`文件夹中。我们在提供的包中内置了以下内容：

- 4 个皮肤，作为范例。
- 2 个模型，`geometry.humanoid.default`为玩家模型的标准模型，`geometry.humanoid.slim`为玩家模型的纤细模型。

您可以更改我们提供的渲染控制器`RP/render_controllers/npc.render_controllers.json`中的内容，控制各个 NPC 的皮肤和模型，以符合您的需求。

## 适用于国际版的 NPC

如果您使用国际版，则您还可以尝试一下我们提供的国际版包。您可考虑将扩展包中的以下文件、文件夹粘贴到您的包中的对应位置：

- `BP/dialogue/`文件夹
- `BP/entities/template/npc_international.server_entity.json`
- `BP/function/entities/npc_international`文件夹
- `RP/entity/npc_international.client_entity.json`

同时，将以下文件中的内容选择性地复制粘贴到您的包中。**注意，不要直接复制粘贴以下文件，以防覆盖！**

- `RP/texts/`文件夹中的文件

国际版的 NPC 有一个好处：具有专门的对话框和按钮交互逻辑。您也可以使用`/dialogue`命令和行为包中的`dialogue`对话文件来自定义您的对话逻辑。我们在扩展包中提供了一些范例，但具体的内容请见参考文献 3 。

更改 NPC 的皮肤、模型的方法，参见上文 NPC - （5）为 NPC 更改或添加更多的皮肤。

## 注意事项

1. 该实体执行的函数的执行者为交互实体。无法精准获取交互玩家。您可以使用`@p`以近似处理。
2. 模板包中提供的交互实体的 ID 为`template:interaction`，请在发布前更改其命名空间，不要使用`template:`作为命名空间。
3. 您需要在复制粘贴时，注意以下可能造成冲突的文件：
   - `RP/texts/en_US.lang`
   - `RP/texts/zh_CN.lang`
   - `RP/sounds.json`

## 参考文献

- [交互实体 | 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/交互实体)
- [Tutorial:自定义实体 | 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/Tutorial:自定义实体)
- [创建 NPC | 微软文档](https://learn.microsoft.com/en-us/minecraft/creator/documents/createnpcs?view=minecraft-bedrock-stable)

## 更新日志

| 版本 | 更改 |
| :---: | --- |
| 1.0 | 加入了交互实体的支持 |
| 2.0 | 新增了对两种 NPC 的支持，将交互状态的`variant`更新为`mark_variant` |
| 3.0（未来的更新方向） | 加入对 NPC 的交互和攻击检测功能的可选的支持 |
