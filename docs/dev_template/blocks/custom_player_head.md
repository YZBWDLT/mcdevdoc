---
sidebar_position: 1
---

# 自定义头颅

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import Download from "/src/components/highlight/download"

<Download url="https://app.nekodrive.net/s/dNACZ"/>

**本包用于创建更多自定义头颅**。

在 Java 版中，可以使用特定的命令获取特定玩家的头颅。本包旨在方便创作者根据玩家皮肤自定义一种新的自定义头颅。

:::warning[温馨提示]

本文假定您已经能够独立编写属于自己的自定义方块。如果您还不能编写自定义方块，请阅读模块 2 的教程：[5.1 数据驱动方块](/docs/tutorials/a2_addons/b5_data_driven_blocks/c1_data_driven_blocks)。

:::

:::warning[注意事项]

1. 目前，自定义头颅只支持 4 向放置，原版为 16 向。这有望在更高版本中使用最新的`minecraft:placement_direction`方块特征解决，因此未来可能会继续更新。
2. 目前，自定义头颅暂时不支持烟火之星的合成配方。
3. 包的最低需求版本为`1.21.110`，然而这是由方块模型文件的`item_display_transforms`引起的。若需要，读者可以删除相关字段，并将模型文件的格式版本改为`1.12.0`，这样包的最低需求版本就会降低为`1.21.90`，但如此做后会牺牲自定义头颅在物品栏、物品展示框、掉落物上的展示效果。

:::

## 文件架构

下面的文件架构中，粗体部分代表本包的核心文件。在您合并包时应当着重关注下面被粗体的文件。

其中可能会出现多个文件冲突。如果在粘贴过程中遇到冲突，**请务必选择跳过这些文件而非覆盖您原有的文件**，并按照下面可能需要修改的文件列表进行选择性粘贴。

<treeview>

- <FileType type="folder" name="BP_custom_player_head"/>：行为包根目录
  - <FileType type="folder" name="blocks"/>：方块定义
    - <FileType type="folder" name="player_head"/>：玩家头颅
      - <FileType type="file" name="andy7343.block.json"/>：**Andy7343 的头 方块定义**
      - <FileType type="file" name="greeleaf.block.json"/>：**GreeLeaf 的头 方块定义**
      - <FileType type="file" name="kriswenyu.block.json"/>：**KrisWenYu 的头 方块定义**
      - <FileType type="file" name="pigeonki.block.json"/>：**PigeonKI 的头 方块定义**
      - <FileType type="file" name="pumpkinjui.block.json"/>：**PumpkinJui 的头 方块定义**
      - <FileType type="file" name="yzbwdlt.block.json"/>：**YZBWDLT 的头 方块定义**
  - <FileType type="folder" name="items"/>：物品定义
    - <FileType type="folder" name="player_head"/>：玩家头颅
      - <FileType type="file" name="andy7343.item.json"/>：**Andy7343 的头 物品定义**
      - <FileType type="file" name="greeleaf.item.json"/>：**GreeLeaf 的头 物品定义**
      - <FileType type="file" name="kriswenyu.item.json"/>：**KrisWenYu 的头 物品定义**
      - <FileType type="file" name="pigeonki.item.json"/>：**PigeonKI 的头 物品定义**
      - <FileType type="file" name="pumpkinjui.item.json"/>：**PumpkinJui 的头 物品定义**
      - <FileType type="file" name="yzbwdlt.item.json"/>：**YZBWDLT 的头 物品定义**
  - <FileType type="file" name="manifest.json"/>：（*有冲突风险*）清单文件
  - <FileType type="image" name="pack_icon.png"/>：包图标
- <FileType type="folder" name="RP_custom_player_head"/>：资源包根目录
  - <FileType type="folder" name="attachables"/>：附着物定义
    - <FileType type="folder" name="player_head"/>：玩家头颅
      - <FileType type="file" name="andy7343.attachable.json"/>：**Andy7343 的头 附着物定义**
      - <FileType type="file" name="greeleaf.attachable.json"/>：**GreeLeaf 的头 附着物定义**
      - <FileType type="file" name="kriswenyu.attachable.json"/>：**KrisWenYu 的头 附着物定义**
      - <FileType type="file" name="pigeonki.attachable.json"/>：**PigeonKI 的头 附着物定义**
      - <FileType type="file" name="pumpkinjui.attachable.json"/>：**PumpkinJui 的头 附着物定义**
      - <FileType type="file" name="yzbwdlt.attachable.json"/>：**YZBWDLT 的头 附着物定义**
  - <FileType type="folder" name="models"/>：模型
    - <FileType type="folder" name="blocks"/>：方块模型
      - <FileType type="file" name="custom_player_head.geo.json"/>：**自定义玩家头颅 方块模型**
    - <FileType type="folder" name="entity"/>：实体模型
      - <FileType type="file" name="custom_player_head.geo.json"/>：**自定义玩家头颅 实体附着物模型**
  - <FileType type="folder" name="texts"/>：文本
    - <FileType type="file" name="zh_CN.lang"/>：**（*有冲突风险*）中文翻译文本**
    - <FileType type="file" name="en_US.lang"/>：**（*有冲突风险*）英文翻译文本**
  - <FileType type="folder" name="textures"/>：贴图
    - <FileType type="folder" name="entity"/>：实体贴图
      - <FileType type="file" name="andy7343.png"/>：**Andy7343 皮肤**
      - <FileType type="file" name="greeleaf.png"/>：**GreeLeaf 皮肤**
      - <FileType type="file" name="kriswenyu.png"/>：**KrisWenYu 皮肤**
      - <FileType type="file" name="pigeonki.png"/>：**PigeonKI 皮肤**
      - <FileType type="file" name="pumpkinjui.png"/>：**PumpkinJui 皮肤**
      - <FileType type="file" name="yzbwdlt.png"/>：**YZBWDLT 皮肤**
    - <FileType type="file" name="terrain_texture.json"/>：**（*有冲突风险*）方块贴图定义文件**
  - <FileType type="file" name="manifest.json"/>：（*有冲突风险*）清单文件
  - <FileType type="image" name="pack_icon.png"/>：包图标

</treeview>

## 使用方法

您可正常使用我们提供的 6 个预设头颅。它们和原版的头颅具有相同的碰撞箱、选择箱，并且都会被水冲掉，且会隐藏定位栏。

## 自定义新头颅

基于我们的预设，您完全可以自行设定任意数量的新玩家头颅。但在此之前，您需要先准备一个或多个皮肤文件。下面的教程中，我们假设您准备了一个皮肤<FileType type="file" name="playername.png"/>。现在请按照以下步骤进行：

1. 在行为包的<FileType type="folder" name="blocks"/> - <FileType type="folder" name="player_head"/>中新建<FileType type="file" name="playername.block.json"/>，将<FileType type="file" name="yzbwdlt.block.json"/>的内容复制过去，然后替换掉所有带`yzbwdlt`的字段（也就是高亮部分）：

    <details>
    <summary>方块定义</summary>

    ```json showLineNumbers title="playername.block.json" {5,19}
    {
        "format_version": "1.21.90",
        "minecraft:block": {
            "description": {
                "identifier": "player_head:playername",
                "menu_category": { "category": "items", "group": "minecraft:itemGroup.name.skull" },
                "traits": {
                    "minecraft:placement_direction": {
                        "enabled_states": [ "minecraft:cardinal_direction" ],
                        "y_rotation_offset": 180
                    },
                    "minecraft:placement_position": {
                        "enabled_states": [ "minecraft:block_face" ]
                    }
                }
            },
            "components": {
                "minecraft:geometry": { "identifier": "geometry.custom_player_head", "bone_visibility": { "player_head_wall": "false" } },
                "minecraft:material_instances": { "*": { "texture": "player_head_playername", "render_method": "alpha_test" } },
                "minecraft:collision_box": { "origin": [ -4, 0, -4 ], "size": [ 8, 8, 8 ] },
                "minecraft:selection_box": { "origin": [ -4, 0, -4 ], "size": [ 8, 8, 8 ] },
                "minecraft:destructible_by_explosion": { "explosion_resistance": 1 },
                "minecraft:destructible_by_mining": { "seconds_to_destroy": 1 },
                "minecraft:liquid_detection": { "detection_rules": [ { "on_liquid_touches": "popped" } ] },
                "minecraft:destruction_particles": { "texture": "soul_sand", "particle_count": 50 }
            },
            "permutations": [
                {
                    "condition": "q.block_state('minecraft:block_face') != 'up' && q.block_state('minecraft:block_face') != 'down'",
                    "components": {
                        "minecraft:collision_box": { "origin": [ 0, 4.5, -4 ], "size": [ 8, 8, 8 ] },
                        "minecraft:selection_box": { "origin": [ 0, 4, -4 ], "size": [ 8, 8, 8 ] },
                        "minecraft:geometry": { "identifier": "geometry.custom_player_head", "bone_visibility": { "player_head_ground": "false" } }
                    }
                },
                {
                    "condition": "q.block_state('minecraft:cardinal_direction') == 'north' || q.block_state('minecraft:block_face') == 'north'",
                    "components": { "minecraft:transformation": { "rotation": [ 0, 90, 0 ] } }
                },
                {
                    "condition": "q.block_state('minecraft:cardinal_direction') == 'west' || q.block_state('minecraft:block_face') == 'west'",
                    "components": { "minecraft:transformation": { "rotation": [ 0, 180, 0 ] } }
                },
                {
                    "condition": "q.block_state('minecraft:cardinal_direction') == 'south' || q.block_state('minecraft:block_face') == 'south'",
                    "components": { "minecraft:transformation": { "rotation": [ 0, 270, 0 ] } }
                }
            ]
        }
    }
    ```

    </details>

2. 在行为包的<FileType type="folder" name="items"/> - <FileType type="folder" name="player_head"/>中新建<FileType type="file" name="playername.item.json"/>，将<FileType type="file" name="yzbwdlt.item.json"/>的内容复制过去，然后替换掉所有带`yzbwdlt`的字段（也就是高亮部分）：

    <details>
    <summary>物品定义</summary>

    ```json showLineNumbers title="playername.item.json" {5,9,11}
    {
        "format_version": "1.21.90",
        "minecraft:item": {
            "description": {
                "identifier": "player_head:playername",
                "menu_category": { "category": "items", "group": "minecraft:itemGroup.name.skull" }
            },
            "components": {
                "minecraft:block_placer": { "block": "player_head:playername", "replace_block_item": true },
                "minecraft:wearable": { "slot": "slot.armor.head", "hides_player_location": true },
                "minecraft:display_name": { "value": "tile.player_head:playername.name" },
                "minecraft:rarity": "uncommon"
            }
        }
    }
    ```

    </details>

3. 在资源包的<FileType type="folder" name="attachables"/> - <FileType type="folder" name="player_head"/>中新建<FileType type="file" name="playername.attachable.json"/>，将<FileType type="file" name="yzbwdlt.attachable.json"/>的内容复制过去，然后替换掉所有带`yzbwdlt`的字段（也就是高亮部分）：

    <details>
    <summary>附着物定义</summary>

    ```json showLineNumbers title="playername.attachable.json" {5,9}
    {
        "format_version": "1.10.0",
        "minecraft:attachable": {
            "description": {
                "identifier": "player_head:playername",
                
                "render_controllers": [ "controller.render.default" ],
                "materials": { "default": "armor" },
                "textures": { "default": "textures/entity/playername" },
                "geometry": { "default": "geometry.custom_player_head.entity" }
            }
        }
    }
    ```

    </details>

4. 更改资源包的<FileType type="folder" name="texts"/>中的<FileType type="folder" name="en_US.lang"/>和<FileType type="file" name="zh_CN.lang"/>，新增方块名称。

    <details>
    <summary>语言文件</summary>

    ```lang showLineNumbers title="en_US.lang" {8}
    ## ===== Blocks =====
    tile.player_head:yzbwdlt.name=YZBWDLT's Head
    tile.player_head:andy7343.name=Andy7343's Head
    tile.player_head:greeleaf.name=GreeLeaf's Head
    tile.player_head:pigeonki.name=PigeonKI's Head
    tile.player_head:pumpkinjui.name=PumpkinJui's Head
    tile.player_head:kriswenyu.name=KrisWenYu's Head
    tile.player_head:playername.name=PlayerName's Head
    ```

    ```lang showLineNumbers title="zh_CN.lang" {8}
    ## ===== Blocks =====
    tile.player_head:yzbwdlt.name=YZBWDLT 的头
    tile.player_head:andy7343.name=Andy7343 的头
    tile.player_head:greeleaf.name=GreeLeaf 的头
    tile.player_head:pigeonki.name=PigeonKI 的头
    tile.player_head:pumpkinjui.name=PumpkinJui 的头
    tile.player_head:kriswenyu.name=KrisWenYu 的头
    tile.player_head:playername.name=PlayerName 的头
    ```

    </details>

5. 更改资源包的<FileType type="folder" name="textures"/>中的<FileType type="file" name="terrain_texture.json"/>，新增方块贴图 ID。

    <details>
    <summary>方块贴图定义</summary>

    ```json showLineNumbers title="terrain_texture.json" {10}
    {
        "resource_pack_name": "player_head",
        "texture_data": {
            "player_head_yzbwdlt": { "textures": "textures/entity/yzbwdlt" },
            "player_head_andy7343": { "textures": "textures/entity/andy7343" },
            "player_head_greeleaf": { "textures": "textures/entity/greeleaf" },
            "player_head_pigeonki": { "textures": "textures/entity/pigeonki" },
            "player_head_pumpkinjui": { "textures": "textures/entity/pumpkinjui" },
            "player_head_kriswenyu": { "textures": "textures/entity/kriswenyu" },
            "player_head_playername": { "textures": "textures/entity/playername" }
        }
    }
    ```

    </details>

6. 在资源包的<FileType type="folder" name="textures"/> - <FileType type="folder" name="entity"/>，将玩家的皮肤复制进去并命名为<FileType type="image" name="playername.png"/>。

现在大退重进游戏，你就能够得到一个新的玩家头颅了！

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
