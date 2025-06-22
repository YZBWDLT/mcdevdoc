# 玩家血量监控 文档

:::warning[注意]

本包是[实体预设：玩家血量监控 v2](./../scripts#血量监控)和[实体预设：玩家血量设定 v2](./../entities/players/health_set_v2)的旧版本，目前已经停止更新。我们将群文档迁移前的旧版文档留在这里，但我们将不再对其中的内容进行更新。

我们建议您使用新版的实体预设来开发您的资源，新版的实体预设更稳定，并将继续维护更新。

:::

:::info[本包性质]

本包为**行为包**。

:::

本包内置了一套玩家的**血量监测系统**，可以帮助您**控制玩家的血量上限**，以及**检测玩家当前的血量**。

:::note[注意：本文的通用语言]

在下文，我们把 a 记分板上名为 b 的追踪目标记为`a.b`。例如，检测`a.b`的分数是否为1，为`/execute if score b a matches 1`。

:::

## 控制玩家血量上限

### 基本使用方法

您可以**使用下面的命令以控制玩家的血量上限**：

```text
/event entity @a max_health_<数值>
```

其中，我们提供的`<数值>`的可选值为：6、8、10、12、14、16、18、20、22、24、26、28、30、32、34、36、38、40。

使用这条命令后，将立即更改玩家的血量上限。当您想设置一个较低的血量上限的时候，它将会非常有用。

### 自定义血量上限

您也可以考虑自定义您所需要的玩家血量上限。原理非常简单，请打开包中的`BP/entities/vanilla/player.json`。您会看到我们已经对玩家文件进行了修改，并使用了多个事件和组件组进行区分。您可以仿照已有内容的写法进行扩展。

例如，假设我们现在需要让玩家的血量上限改为 3 。找到实体文件中的事件`events`，您会看到以下的内容：

```json title="BP/entities/vanilla/player.json"
"events": {
    ...,
    "max_health_38": { "add": { "component_groups": [ "max_health_38" ] } },
    "max_health_40": { "add": { "component_groups": [ "max_health_40" ] } }
}
```

我们仿照着编写一个新的实体生成事件如下：

```json title="BP/entities/vanilla/player.json"
"max_health_3": { "add": { "component_groups": [ "max_health_3" ] } }
```

将它插入到`events`的末尾，请注意 JSON 文件语法的逗号要求：

```json title="BP/entities/vanilla/player.json"
"events": {
    ...,
    "max_health_38": { "add": { "component_groups": [ "max_health_38" ] } },
    "max_health_40": { "add": { "component_groups": [ "max_health_40" ] } },
    "max_health_3": { "add": { "component_groups": [ "max_health_3" ] } }
}
```

然后，补充在上文中提到的`max_health_3`组件组。找到组件组`component_groups`：

```json title="BP/entities/vanilla/player.json"
"component_groups": {
    ...,
    "max_health_38": {
        "minecraft:health": { "max": 38 }
    },
    "max_health_40": {
        "minecraft:health": { "max": 40 }
    }
}
```

同理，按照下文的方式扩写：

```json title="BP/entities/vanilla/player.json"
"component_groups": {
    ...,
    "max_health_38": {
        "minecraft:health": { "max": 38 }
    },
    "max_health_40": {
        "minecraft:health": { "max": 40 }
    },
    "max_health_3": {
        "minecraft:health": { "max": 3 }
    }
}
```

这样，当您使用命令

```text
event entity @a max_health_3
```

后，玩家的血量上限就会被改为 3 了。

## 检测玩家当前血量

### 基本使用方法

使用方法非常简单。首先，您可以使用下面的命令创建一个检测血量所需的记分板`health`：

```text
function lib/modify_data/init/data
```

也可以使用下面的命令：

```text
scoreboard objectives add health dummy "玩家血量"
```

记分板创建好后，便万事大吉了！您可以**读取`health.@s`的分值以获取玩家的血量**。例如，检测玩家的血量是否为 10 点或更高：

```text
execute as @a if score @s health matches 10.. run (命令)
```

本包所提供的检测玩家血量的范围在 0~40 。在极大多数情况下，这样的范围应该已经能够符合您的需求。

### 自定义检测范围

如果我们所提供的血量检测范围无法满足您的需求，则您可以自行扩充。请您打开包中的`BP/animation_controllers/player.animation_controllers.json`，您会看到一个经过大量穷举的文件：

```json title="BP/animation_controllers/player.animation_controllers.json"
{
    "format_version": "1.10.0",
    "animation_controllers": {
        "controller.animation.player.health_test": {
            "states": {
                "default": {
                    "transitions": [
                        { "0_health": "query.health == 0" },
                        { "1_health": "query.health >= 0 && query.health <= 1" },
                        ...
                        { "39_health": "query.health >= 38 && query.health <= 39" },
                        { "40_health": "query.health >= 39 && query.health <= 40" }
                    ]
                },
                "0_health": { "on_entry": [ "/scoreboard players set @s health 0" ], "transitions": [ { "default": "1" } ] },
                "1_health": { "on_entry": [ "/scoreboard players set @s health 1" ], "transitions": [ { "default": "1" } ] },
                ...,
                "39_health": { "on_entry": [ "/scoreboard players set @s health 39" ], "transitions": [ { "default": "1" } ] },
                "40_health": { "on_entry": [ "/scoreboard players set @s health 40" ], "transitions": [ { "default": "1" } ] }
            }
        }
    }
}
```

如果您想要扩展范围，例如将检测范围扩展到 50 ，需要按照类似的方法在`default`状态中，以及`(41~50)_health`状态进行穷举：

```json title="BP/animation_controllers/player.animation_controllers.json"
"default": {
    "transitions": [
        { "41_health": "query.health >= 40 && query.health <= 41" },
        { "42_health": "query.health >= 41 && query.health <= 42" },
        ...
        { "49_health": "query.health >= 48 && query.health <= 49" },
        { "50_health": "query.health >= 49 && query.health <= 50" }
    ]
},
"41_health": { "on_entry": [ "/scoreboard players set @s health 41" ], "transitions": [ { "default": "1" } ] },
"42_health": { "on_entry": [ "/scoreboard players set @s health 42" ], "transitions": [ { "default": "1" } ] },
...,
"49_health": { "on_entry": [ "/scoreboard players set @s health 49" ], "transitions": [ { "default": "1" } ] },
"50_health": { "on_entry": [ "/scoreboard players set @s health 50" ], "transitions": [ { "default": "1" } ] }
```

我们建议使用例如 Python 的脚本自动生成这些代码。如果您要检测的范围实在过于大，请考虑降低检测精度，或使用诸如 SAPI 等更高级的工具实现更大范围的精确检测。

## 注意事项

1. 玩家的血量检测无法检测由「伤害吸收」效果所带来的黄心。例如，如果您吃了一颗金苹果，那么检测到的血量最高仍为 20 ，而非 24 。
2. 您需要在复制粘贴时，注意以下可能造成冲突的文件：
   - `BP/entities/vanilla/player.json`
   - `BP/animation_controllers/player.animation_controllers.json`
   - `BP/functions/lib/modify_data/init/data.mcfunction`

## 参考文献

- [Tutorial:自定义实体#事件与组件组 | 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/Tutorial:自定义实体#事件与组件组)
- [实体文档 - minecraft:health | 微软文档](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_health?view=minecraft-bedrock-stable)
- [Tutorial:自定义实体#行为包动画与动画控制器 | 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/Tutorial:自定义实体#行为包动画与动画控制器)
