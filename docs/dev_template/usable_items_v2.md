---
sidebar_position: 3
---

# 可使用物品 v2

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);

## [<Highlight color="#25c2a0">下载</Highlight>](https://app.nekodrive.net/s/K0Qu0)

本包用于**创建一个可右键使用的物品**。

在实际工程中，难免会遇到一些需要右键使用物品的情况。这时候我们希望物品右键使用之后能够有一些反应，例如运行函数。本包基于两种不同的原理，实现了右键物品执行函数的功能。正常情况下，我们强烈推荐使用第 1 种包。

1. 国际版和中国版各自的脚本系统。
   - **优点**：易于维护和自定义；限制少，可适用于原版物品；使用方法简单
   - **缺点**：需要分别对两个版本做适配。
2. 玩家动画控制器。
   - **优点**：天生支持两个版本，理解门槛相对较低。
   - **缺点**：因为修改了`player.json`，侵入性强，高版本兼容性会比较差；只能适用于真正的可使用物品，无法应用到原版的一切物品上；不易于维护和自定义。

本包为**行为包**和**资源包**组合的包。

:::warning[温馨提示]

本文假定您已经能够独立编写属于自己的自定义物品。如果您还不能编写自定义物品，请阅读模块 3 的教程：[1.1 数据驱动物品](../addons_complex/chapter1/section1)。

:::

---

## 文件架构

- `BP_usable_item_script/`：**基于脚本原理的自定义物品行为包**。
  - `functions/`：函数
    - `items/`：物品执行的函数
      - `usable_item.mcfunction`：对于`namespace:id`的物品，自动执行`items/(id)`函数
  - `items/`：物品定义
    - `template/`：（*建议换名*）分类
      - `usable_item.item.json`：自定义物品定义
  - `scripts/`：脚本
    - `main.js`：（*有冲突风险*）国际版脚本，使用`@minecraft/server@1.7.0`版本
    - `__init__.py`：（*有冲突风险*）中国版脚本
    - `modMain.py`：（*有冲突风险*）中国版脚本入口文件
    - `templateClient.py`：（*有冲突风险*）中国版脚本客户端文件，目前暂时没用到
    - `templateServer.py`：（*有冲突风险*）中国版脚本服务端文件
  - `manifest.json`：（*有冲突风险*）清单文件，包含脚本信息
  - `pack_icon.png`：包图标
- `BP_usable_item_ac/`：**基于动画控制器原理的自定义物品行为包**。
  - `animation_controllers/`：动画控制器
    - `player.animation_controllers.json`：（*有冲突风险*）玩家执行的动画控制器
  - `entities/`：实体定义
    - `vanilla/`：原版实体
      - `player.json`：（*有冲突风险*）玩家的实体定义，用于执行动画控制器
  - `functions/`：同基于脚本原理
    - `items/`：同基于脚本原理
      - `usable_item.mcfunction`：同基于脚本原理
  - `items/`：同基于脚本原理
    - `template/`：同基于脚本原理
      - `usable_item.item.json`：同基于脚本原理，但存在一定的差别
  - `manifest.json`：清单文件
  - `pack_icon.png`：包图标
- `RP_usable_item/`：**自定义物品资源包**。
  - `texts/`：翻译文本
    - `zh_CN.lang`：（*有冲突风险*）中文翻译文本
    - `en_US.lang`：（*有冲突风险*）英文翻译文本
  - `textures/`：贴图
    - `items/`：物品贴图
      - `usable_item.png`：自定义物品贴图
    - `item_texture.json`：（*有冲突风险*）物品贴图定义
  - `manifest.json`：（*有冲突风险*）清单文件
  - `pack_icon.png`：包图标

### 合并到您的包中

如果您选择使用**基于脚本原理的包，请合并`BP_usable_item_script`和`RP_usable_item`到您的包**中。

如果您选择使用**基于动画控制器原理的包，请合并`BP_usable_item_ac`和`RP_usable_item`到您的包**中。

其中可能会出现多个文件冲突。如果在粘贴过程中遇到冲突，**请务必选择跳过这些文件而非覆盖您原有的文件**，并按照下面可能需要修改的文件列表进行选择性粘贴。

### 合并时可能需要修改的文件（基于脚本原理的行为包）

以下文件可能和您已有的包产生冲突。在复制这些文件时，如果产生冲突，请注意**以下文件不能直接复制，需要视情况手动粘贴其中的内容**。

- `BP/manifest.json`，应当加入国际版脚本所对应的`dependencies`和`modules`。如果不打算支持国际版，可忽略。使用`@minecraft/server`的`1.x.x`版本原则上都不会出现问题。
- `BP/scripts/main.js`，在您已经使用国际版脚本的情况下可能产生冲突，请自行将相关代码整合到您的包内。
- `BP/scripts/*.py`，在您已经使用中国版脚本的情况下可能产生冲突，请自行将相关代码整合到您的包内。

以下文件中的自定义内容使用了字段`template`，然而**我们不推荐您在您的作品中使用该字段**。在正式使用本包之前，您应当将这些字段按您的需求进行改动。

- `BP/items/template/*`，包括`template`文件夹在内的所有文件
- `BP/scripts/*.py`，应当把文件内所有的`template`全部换成您专属的统一字段（例如命名空间），然后更改名称。

<details>

<summary>更改示例：将中国版脚本的所有`template`全部更换为`adventureWorld`</summary>

其中还有一些`Tutorial`的残留，虽然不碍事，但也请一并改掉。其中，15 行和 23 行的方法的第 3 个参数（比如`scripts.adventureWorldServer.adventureWorldServerSystem`）是文件路径，所以这里千万不要写错，不要遗漏什么东西。

```python title="modMain.py" showLineNumbers {7-8,14-15,18,22-23,26}
# -*- coding: utf-8 -*-

from mod.common.mod import Mod
import mod.server.extraServerApi as serverApi
import mod.client.extraClientApi as clientApi

@Mod.Binding(name = "adventureWorldMod", version = "1.0.0")
class adventureWorldMod(object):

    def __init__(self):
        pass

    @Mod.InitServer()
    def AdventureWorldServerInit(self):
        serverApi.RegisterSystem("adventureWorldMod", "adventureWorldServerSystem", "scripts.adventureWorldServer.adventureWorldServerSystem")

    @Mod.DestroyServer()
    def AdventureWorldServerDestroy(self):
        pass
    
    @Mod.InitClient()
    def AdventureWorldClientInit(self):
        clientApi.RegisterSystem("adventureWorldMod", "adventureWorldClientSystem", "scripts.adventureWorldClient.adventureWorldClientSystem")
    
    @Mod.DestroyClient()
    def AdventureWorldClientDestroy(self):
        pass

```

客户端脚本。注意改文件名。

```python title="adventureWorldClient.py" showLineNumbers {6,9}
# -*- coding: utf-8 -*-

import mod.client.extraClientApi as clientApi
ClientSystem = clientApi.GetClientSystemCls()

class adventureWorldClientSystem(ClientSystem):

    def __init__(self, namespace, systemName):
        super(adventureWorldClientSystem, self).__init__(namespace, systemName)

```

服务端脚本。注意改文件名。其中`itemUse`函数内的大段注释是对应的 SAPI 代码，可删去。

```python title="adventureWorldServer.py" showLineNumbers {9,12}
# -*- coding: utf-8 -*-

import mod.server.extraServerApi as serverApi
ServerSystem = serverApi.GetServerSystemCls()
compFactory = serverApi.GetEngineCompFactory()

usableItems = [ "template:usable_item" ]

class adventureWorldServerSystem(ServerSystem):

    def __init__(self, namespace, systemName):
        super(adventureWorldServerSystem, self).__init__(namespace, systemName)
        self.levelId = serverApi.GetLevelId()
        self.subscribe()

    def subscribe(self):
        self.ListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(), "ItemUseAfterServerEvent", self, self.itemUse)

    def unsubscribe(self):
        pass

    def itemUse(self, event):
        source = event["entityId"]
        itemStack = event["itemDict"]

        # world.afterEvents.itemUse.subscribe( event => {
        #     if ( usableItems.includes( event.itemStack.typeId ) ) {
        #         event.source.runCommand( `function items/${event.itemStack.typeId.split(":")[1]}` );
        #     }
        # } )

        if itemStack["newItemName"] in usableItems:
            compFactory.CreateCommand(self.levelId).SetCommand("/function items/{}".format(itemStack["newItemName"].split(":")[1]), source, False)

```

</details>

### 合并时可能需要修改的文件（基于动画控制器原理的行为包）

以下文件可能和您已有的包产生冲突。在复制这些文件时，如果产生冲突，请注意**以下文件不能直接复制，需要视情况手动粘贴其中的内容**。

- `BP/animation_controllers/player.animation_controllers.json`，在您已经使用玩家动画控制器的情况下可能产生冲突，请自行将相关代码整合到您的包内。
- `BP/entities/vanilla/player.json`，在您已经更改玩家行为的情况下可能产生冲突，请自行将相关代码整合到您的包内。

以下文件中的自定义内容使用了字段`template`，然而**我们不推荐您在您的作品中使用该字段**。在正式使用本包之前，您应当将这些字段按您的需求进行改动。

- `BP/items/template/*`，包括`template`文件夹在内的所有文件

### 合并时可能需要修改的文件（资源包）

以下文件可能和您已有的包产生冲突。在复制这些文件时，如果产生冲突，请注意**以下文件不能直接复制，需要视情况手动粘贴其中的内容**。

- `RP/texts/*.lang`
- `RP/textures/item_texture.json`

以下文件中的自定义内容使用了字段`template`，然而**我们不推荐您在您的作品中使用该字段**。在正式使用本包之前，您应当将这些字段按您的需求进行改动。

- `RP/texts/*.lang`

## 使用方法（基于脚本原理）

合并完成之后，按照下面的方法实现可使用的自定义物品。

### 基本原理

<details>

<summary>本包的基本原理</summary>

使用国际版的`world`类的后事件`itemUse`订阅玩家使用物品，以及中国版的`ItemUseAfterServerEvent`事件监听玩家使用物品，使其执行一个相同的函数，该函数路径由物品的 ID 决定。

</details>

### 基本注册步骤

1. 在国际版脚本注册您要指定的可使用物品的 ID（带命名空间，可以指定原版物品），位于该文件第 6 行：

```javascript title="BP/scripts/main.js" showLineNumbers
/** 可执行命令的物品 */
const usableItems = [ "template:usable_item" ];
```

2. 在中国版服务端脚本注册您要指定的可使用物品的 ID（带命名空间，可以指定原版物品），位于该文件第 7 行：

```Python title="BP/scripts/(???)Server.js" showLineNumbers
usableItems = [ "template:usable_item" ]
```

3. 然后，更改`BP/functions/items/(物品ID，不带命名空间).mcfunction`即可实现使用该物品调用该函数。
   - 例如，指定了可使用物品为`minecraft:stick`后，使用物品会执行`items/stick`函数。

### 其他自定义物品的适用性

其他自定义物品也可以使用类似的方法注册。使用本原理的自定义物品无需指定食物、弹射物等可用属性，只要定义其最基本的属性即可。

## 使用方法（基于玩家动画控制器原理）

合并完成之后，按照下面的方法实现可使用的自定义物品。

### 基本原理

<details>

<summary>本包的基本原理</summary>

修改玩家的实体定义`player.json`，使其执行到一个玩家行为包动画控制器上，通过 Molang 检测玩家手持物品是否为该物品，并且玩家是否正在使用物品，即可实现可使用物品的检测。

</details>

### 基本注册步骤

1. 打开玩家动画控制器，将您要注册的可使用的物品（必须为食物、弹射物等可使用的物品类型）按照下面的方式注册：

```json title="BP/animation_controllers/player.animation_controllers.json" showLineNumbers {8,11-16}
{
    "format_version": "1.10.0",
    "animation_controllers": {
        "controller.animation.player.item_using_test": {
            "states": {
                "default": {
                    "transitions": [
                        { "is_using_usable_item": "query.is_item_name_any('slot.weapon.mainhand', 0, 'template:usable_item') && query.is_using_item" }
                    ]
                },
                "is_using_usable_item": {
                    "on_entry": [ "/function items/usable_item" ],
                    "transitions": [
                        { "default": "!query.is_item_name_any('slot.weapon.mainhand', 0, 'template:usable_item') || !query.is_using_item" }
                    ]
                }
            }
        }
    }
}

```

<details>

<summary>举例：注册一个 ID 为`mcdevdoc:settings`的物品</summary>

```json title="BP/animation_controllers/player.animation_controllers.json" showLineNumbers {9,18-23}
{
    "format_version": "1.10.0",
    "animation_controllers": {
        "controller.animation.player.item_using_test": {
            "states": {
                "default": {
                    "transitions": [
                        { "is_using_usable_item": "query.is_item_name_any('slot.weapon.mainhand', 0, 'template:usable_item') && query.is_using_item" },
                        { "is_using_settings": "query.is_item_name_any('slot.weapon.mainhand', 0, 'mcdevdoc:settings') && query.is_using_item" }
                    ]
                },
                "is_using_usable_item": {
                    "on_entry": [ "/function items/usable_item" ],
                    "transitions": [
                        { "default": "!query.is_item_name_any('slot.weapon.mainhand', 0, 'template:usable_item') || !query.is_using_item" }
                    ]
                },
                "is_using_settings": {
                    "on_entry": [ "/function items/settings" ],
                    "transitions": [
                        { "default": "!query.is_item_name_any('slot.weapon.mainhand', 0, 'mcdevdoc:settings') || !query.is_using_item" }
                    ]
                }
            }
        }
    }
}

```

</details>

2. 然后，更改`BP/functions/items/(物品ID，不带命名空间).mcfunction`即可实现使用该物品调用该函数。
   - 函数路径由`on_entry`定义的路径决定。

### 其他自定义物品的适用性

其他自定义物品也可以使用类似的方法注册。使用本原理的自定义物品**必须指定食物、弹射物等可用属性**，因此不能指定原版物品中非食物、弹射物等不可使用物品。此外，它也导致该物品是可能会被消耗掉的，所以请使用`minecraft:use_modifiers`将该物品的使用时间设置得尽可能长。示例可以参见我们给出的例子。

## 实例

<details>

<summary>当玩家使用木棍时，如果玩家手里有 4 个以上木棍则给予其 2 个木板</summary>

该功能只能适用基于脚本原理的包实现。首先按照[合并指南](#合并到您的包中)完成包合并。然后按照[基本注册步骤](#基本注册步骤)完成物品注册，如下所示。

```javascript title="BP/scripts/main.js" showLineNumbers
/** 可执行命令的物品 */
const usableItems = [ "template:usable_item", "minecraft:stick" ];
```

```Python title="BP/scripts/(???)Server.js" showLineNumbers
usableItems = [ "template:usable_item", "minecraft:stick" ]
```

最后，定义一个函数`items/stick`，写入下面的内容即可。

```mcfunction title="BP/functions/items/stick.mcfunction" showLineNumbers
execute if entity @s[hasitem={item=stick,quantity=4..}] run give @s oak_planks 2
execute if entity @s[hasitem={item=stick,quantity=4..}] run clear @s stick -1 4
```

</details>

## 更新日志

相比于 v1 版本，v2 版本主要进行了如下更改：

- 提升了最低版本需求为 1.20.50。
- 示例的自定义物品的格式版本升级到 1.20.50，以同时适用于国际版和中国版。
- 加入了对双端脚本的支持。

## 过往版本下载

您可以在这里下载到过往版本。然而，我们已不再推荐使用这些旧版本。

[<Highlight color="#25c2a0">下载 v1 版本</Highlight>](https://app.nekodrive.net/s/y0Bsg)
