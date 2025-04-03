# 可使用物品 文档

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
