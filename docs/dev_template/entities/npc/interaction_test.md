---
sidebar_position: 3
---

# 扩展包：交互检测

import treeview from '/src/css/treeview.css';
import FileType from "/src/components/FileType"

**本文用于为 NPC 主包中引入的 NPC 添加交互检测**。

:::warning[温馨提示]

- 本文的内容基于「[主包 v2](main_v2)」的架构。如果您还没有下载主包，请前往下载并阅读相关文档。
- 本文假定您已经能够独立编写属于自己的自定义实体。如果您还不能编写自定义实体，请阅读模块 2 的教程：[5.3.1 数据驱动实体](/docs/tutorials/a2_addons/b5_combined_addons/3_custom_entities/1_data_driven_entities)。

:::

## 添加交互检测

在本文中，我们要更改或新增下面的粗体文件，请提前准备：

<div class="treeview">

- <FileType fileType="folder" name="BP_npc"/>：行为包根目录
  - <FileType fileType="folder" name="entities"/>：实体服务端定义
    - <FileType fileType="folder" name="template"/>：（*建议换名*）分类
      - **<FileType fileType="file" name="npc.server_entity.json"/>：NPC 的行为包定义**（更改）
  - **<FileType fileType="folder" name="functions"/>：函数**（新增）
    - **<FileType fileType="folder" name="entities"/>**（新增）
      - **<FileType fileType="folder" name="npc"/>**（新增）
        - **<FileType fileType="file" name="interact.mcfunction"/>：NPC 被交互后调用的函数**（新增）
  - <FileType fileType="file" name="manifest.json"/>：清单文件
  - <FileType fileType="image" name="pack_icon.png"/>：包图标
- <FileType fileType="folder" name="RP_npc"/>：资源包根目录
  - <FileType fileType="folder" name="entity"/>：实体客户端定义
    - <FileType fileType="file" name="npc.client_entity.json"/>：NPC 的资源包定义
  - <FileType fileType="folder" name="models"/>：模型
    - <FileType fileType="folder" name="entity"/>：实体模型
      - <FileType fileType="file" name="npc.geo.json"/>：NPC 的模型
  - <FileType fileType="folder" name="render_controllers"/>：渲染控制器
    - <FileType fileType="file" name="npc.render_controllers.json"/>：NPC 的渲染控制器
  - <FileType fileType="folder" name="texts"/>：文本
    - **<FileType fileType="file" name="zh_CN.lang"/>：中文翻译文本**（更改）
    - **<FileType fileType="file" name="en_US.lang"/>：英文翻译文本**（更改）
  - <FileType fileType="folder" name="textures"/>：贴图
    - <FileType fileType="folder" name="entity"/>：实体贴图
      - <FileType fileType="folder" name="npc"/>：NPC 贴图
        - <FileType fileType="image" name="0.png"/>：NPC 0 的贴图（Steve）
        - <FileType fileType="image" name="1.png"/>：NPC 1 的贴图（Alex）
  - <FileType fileType="file" name="manifest.json"/>：清单文件
  - <FileType fileType="image" name="pack_icon.png"/>：包图标

<br/></div>

打开 NPC 的行为包定义，在其组件（`components`）内部添加一个[`minecraft:interaction`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_interact?view=minecraft-bedrock-stable)组件，然后添加对应的事件调用：

```json showLineNumbers title="BP_npc/entities/template/npc.server_entity.json" {8,13}
{
    "format_version": "1.21.0",
    "minecraft:entity": {
        ...,
        "components": {
            ...,
            "minecraft:equipment": { "slot_drop_chance": [ { "slot": "slot.weapon.mainhand", "drop_chance": 0 } ] },
            "minecraft:interact": { "interactions": [ { "interact_text": "action.interact.chat", "on_interact": { "event": "template:interacted", "target": "self" } } ] }
        },
        "events": {
            ...,

            "template:interacted": { "queue_command": { "command": [ "function entities/npc/interact" ] } }
        }
        ...
    }
}
```

这样，函数`entities/npc/interact`就将在被交互时，以 NPC 为执行者、NPC 的环境为执行环境参数执行其中的命令。例如，可以设置 NPC 在被交互时执行`say`命令：

```json showLineNumbers title="BP_npc/functions/entities/npc/interact.mcfunction"
# ===== NPC 被交互 =====
say Hello, world!
```

记得设置聊天按钮的文本：

```json showLineNumbers title="RP_npc/texts/en_US.lang"
## ===== Interaction Buttons =====
action.interact.chat=Chat
```

```json showLineNumbers title="RP_npc/texts/zh_CN.lang"
## ===== 聊天按钮 =====
action.interact.chat=聊天
```

import GiscusComponent from "/src/components/GiscusComponent/component.js"

<GiscusComponent/>
