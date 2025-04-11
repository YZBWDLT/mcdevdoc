---
sidebar_position: 2
---

# 可使用物品

:::danger[温馨提示]

本文档正在更新，但本文档所指向的资源已经可供下载。文档将在更新完毕后删除旧内容并删除此标记状态，然而目前该文档暂时无法支持您的阅读。

:::

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);

## [<Highlight color="#25c2a0">下载</Highlight>](https://app.nekodrive.net/s/nWkCK)

本包用于**创建一个可右键使用的物品**。

在实际工程中，难免会遇到一些需要右键使用物品的情况。这时候我们希望物品右键使用之后能够有一些反应，例如运行函数。本包基于两种不同的原理，实现了右键物品执行函数的功能。正常情况下，我们强烈推荐使用第 1 种包。

1. 国际版和中国版各自的脚本系统。这种原理的包更易于维护和自定义，而且使用方法简单，但是需要分别对两个版本做适配。
2. 玩家动画控制器。这种原理的包天生支持两个版本，但是因为修改了`player.json`，侵入性强，高版本兼容性会比较差，也不易于维护和自定义。

本包为**行为包**和**资源包**组合的包。

---

## 文件架构

- `BP_usable_item_script`：**基于脚本原理的自定义物品行为包**。
  - `functions`：函数
    - `items`：物品执行的函数
      - `usable_item.mcfunction`：对于`namespace:id`的物品，自动执行`items/(id)`函数
  - `items`：物品定义
    - `template`：分类（建议换名）
      - `usable_item.item.json`：自定义物品定义
  - `scripts`：脚本
    - `main.js`：（*有冲突风险*）国际版脚本，使用`@minecraft/server@1.7.0`版本
    - `__init__.py`：（*有冲突风险*）中国版脚本
    - `modMain.py`：（*有冲突风险*）中国版脚本入口文件
    - `templateClient.py`：（*有冲突风险*）中国版脚本客户端文件，目前暂时没用到
    - `templateServer.py`：（*有冲突风险*）中国版脚本服务端文件
  - `manifest.json`：（*有冲突风险*）清单文件，包含脚本信息
  - `pack_icon.png`：包图标
- `BP_usable_item_ac`：**基于动画控制器原理的自定义物品行为包**。
  - `animation_controllers`：动画控制器
    - `player.animation_controllers.json`：（*有冲突风险*）玩家执行的动画控制器
  - `entities`：实体定义
    - `vanilla`：原版实体
      - `player.json`：（*有冲突风险*）玩家的实体定义，用于执行动画控制器
  - `functions`：同基于脚本原理
    - `items`：同基于脚本原理
      - `usable_item.mcfunction`：同基于脚本原理
  - `items`：同基于脚本原理
    - `template`：同基于脚本原理
      - `usable_item.item.json`：同基于脚本原理，但存在一定的差别
  - `manifest.json`：清单文件
  - `pack_icon.png`：包图标
- `RP_usable_item`：**自定义物品资源包**。
  - `texts`：翻译文本
    - `zh_CN.lang`：（*有冲突风险*）中文翻译文本
    - `en_US.lang`：（*有冲突风险*）英文翻译文本
  - `textures`：贴图
    - `items`：物品贴图
      - `usable_item.png`：自定义物品贴图
    - `item_texture.json`：（*有冲突风险*）物品贴图定义
  - `manifest.json`：清单文件
  - `pack_icon.png`：包图标

### 合并到您的包中

如果您选择使用基于脚本原理的包，请合并`BP_usable_item_script`和`RP_usable_item`到您的包中。

如果您选择使用基于动画控制器原理的包，请合并`BP_usable_item_ac`和`RP_usable_item`到您的包中。

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

## 使用方法（基于玩家动画控制器原理）

## 可用函数

## 实例

## 更新日志

## 过往版本下载

---

:::info[本包性质]

本包为**行为包**和**资源包**结合的包。

:::

装载本包之后，将在您的世界添加一种可使用的新物品，并在使用时执行特定函数。

## 原理

本包实现的原理如下：

1. 创建了一个新的物品（`BP_usable_items/items/template/usable_item.item.json`），其为一个使用时长为 9999999 刻的食物，并且带有 20 刻的`usable_item`类型的冷却。
2. 更改了玩家的服务端实体文件（`BP_usable_items/entities/vanilla/player.json`），使其链接到一个行为包动画控制器（`BP_usable_items/animation_controllers/player.animation_controllers.json`）。
3. 此行为包动画控制器会检测玩家物品的使用状态，并执行一条函数命令（`BP_usable_items/functions/entities/player/using_usable_items.mcfunction`）。

## 创建自己的可使用物品

您可以基于此包，快速创建一个属于您自己的可使用物品。只需要按照下面的清单做好这些工作即可：

1. 创建一个新的物品（`BP/items/<命名空间或自定义字段>/<物品ID>.item.json`）：

   ```json title="BP/items/<命名空间或自定义字段>/<物品ID>.item.json"
   {
       "format_version": "1.16.0",
       "minecraft:item": {
           "description": {
               "identifier": "<命名空间>:<物品ID>"
           },
           "components": {
               "minecraft:max_stack_size": <整数，自定义>,
               "minecraft:food": { "can_always_eat": true, "nutrition": 0, "cooldown_time": <整数，冷却时长，单位：游戏刻>, "cooldown_type": "<物品ID>" },
               "minecraft:use_duration": 9999999
           }
       }
   }
   ```

   其中，如果您不需要物品冷却，可以将`"cooldown_time"`和`"cooldown_type"`的键值对移除。不要更改其它的字段，除非您知道您在做什么。

2. 将本模板包所给出的玩家服务端实体文件、以及行为包动画控制器复制到您的包里。
3. 打开行为包动画控制器，其格式如下：

   ```json title="BP/animation_controllers/player.animation_controllers.json"
   {
       "format_version": "1.10.0",
       "animation_controllers": {
           "controller.animation.player.item_using_test": {
               "states": {
                   "default": {
                       "transitions": [
                           { "is_using_<物品ID>": "query.is_item_name_any('slot.weapon.mainhand', 0, '<命名空间>:<物品ID>') && query.is_using_item" },
                           ...
                       ]
                   },
                   "is_using_<物品ID>": {
                       "on_entry": [ "/function entities/player/using_<物品ID>" ],
                       "transitions": [
                           { "default": "!query.is_item_name_any('slot.weapon.mainhand', 0, '<命名空间>:<物品ID>') || !query.is_using_item" }
                       ]
                   },
                   ...
               }
           }
       }
   }
   ```

   如果您不知道这个文件该如何编写，请见参考文献 1，但您要更改的具体字段已悉数标出。

4. 新建一个新的函数（`BP/functions/entities/player/using_<物品ID>.mcfunction`），在此处写下您要通过此物品执行的命令。
5. 将资源包的物品客户端定义（`RP/items/<命名空间或自定义字段>/<物品ID>.item.json`）补充完整：

   ```json title="RP/items/<命名空间或自定义字段>/<物品ID>.item.json"
   {
       "format_version": "1.16.0",
       "minecraft:item": {
           "description": {
               "identifier": "<命名空间>:<物品ID>",
               "category": "Items"
           },
           "components": {
               "minecraft:icon": "<物品贴图短ID>"
           }
       }
   }
   ```

6. 将物品的贴图放到`RP/textures/items/`文件夹下，命名为 \<物品ID\>.png ，然后更改物品贴图定义文件（`RP/textures/item_texture.json`）：

   ```json title="RP/textures/item_texture.json"
   {
       "resource_pack_name": "vanilla",
       "texture_name": "atlas.items",
       "texture_data": {
           "<物品贴图短ID>": { "textures": "textures/items/<物品ID>" }
       }
   }
   ```

7. 添加物品键名，更改语言文件（`RP/texts/zh_CN.lang`和`RP/texts/en_US.lang`）：

   ```plaintext title="RP/texts/zh_CN.lang 或 RP/texts/en_US.lang"
   item.<命名空间>:<物品ID>.name=<物品名称>
   ```

其中第 5~7 步都是标准的创建物品的步骤，您可以查阅参考文献 2 来了解更多。

:::warning[注意事项]

将此包与您已有的包进行整合时，请注意以下事项：

- 两实体的`ID`的命名空间均为`template:`，请按照您的需求自行更改，不要直接使用此命名空间。
- 资源包的`texts`文件夹的内容可能会与您原有的包冲突。
- 资源包的`textures/item_texture.json`的内容可能会与您原有的包冲突。
- 行为包的`animation_controllers/player.animation_controllers.json`的内容可能会与您原有的包冲突。
- 如果您要使用中国版，在上文的第 5 步请参考我们给出的`RP_usable_items_netease`包，您只需要在描述中将格式版本改为`1.10`，并添加`"register_to_create_menu"`字段，然后把资源包的`items`文件夹重命名为`netease_items_res`即可。否则，您的物品可能无法显示其贴图。

:::

## 参考文献

- [Tutorial:自定义实体 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/Tutorial:自定义实体#实现可使用物品)
- [Tutorial:自定义物品 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/Tutorial:自定义物品)
