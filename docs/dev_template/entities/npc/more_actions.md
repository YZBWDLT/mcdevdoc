---
sidebar_position: 2
---

# 扩展包：更多动作

import treeview from '/src/css/treeview.css';
import FileType from "/src/components/FileType"

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);

## [<Highlight color="#25c2a0">下载</Highlight>](https://app.nekodrive.net/s/8r3f1)

**本包用于为 NPC 主包中引入的 NPC 添加更多更生动的动作**。

本包为**行为包**和**资源包**组合的包。

:::warning[温馨提示]

- 本文的内容基于「[主包 v2](main_v2)」的架构。
- 本文假定您已经能够独立编写属于自己的自定义实体。如果您还不能编写自定义实体，请阅读模块 2 的教程：[5.3.1 数据驱动实体](/docs/tutorials/a2_addons/b5_combined_addons/3_custom_entities/1_data_driven_entities)。

:::

---

## 与主包合并

请注意：在本文提供的包并不是一个有效的附加包包体架构，而是基于[主包 v2](main_v2)扩展的架构，所以只提供扩展文件。如果您还没有下载主包，请前往下载并阅读相关文档。

解压我们给出的扩展包，然后将其中的文件或文件夹解压到主包对应的位置。粗体文件为扩展包的内容，如果和原文件冲突，请在进行对比后进行手动合并。通常，如果没有更改原文件的话，可以直接替换。

<div class="treeview">

- <FileType fileType="folder" name="BP_npc"/>：行为包根目录
  - <FileType fileType="folder" name="entities"/>：实体服务端定义
    - <FileType fileType="folder" name="template"/>：（*建议换名*）分类
      - **<FileType fileType="file" name="npc.server_entity.json"/>：NPC 的行为包定义**
  - <FileType fileType="file" name="manifest.json"/>：（*有冲突风险*）清单文件
  - <FileType fileType="image" name="pack_icon.png"/>：包图标
- <FileType fileType="folder" name="RP_npc"/>：资源包根目录
  - **<FileType fileType="folder" name="animations"/>：实体动画**
    - **<FileType fileType="file" name="npc.animations.json"/>：NPC 的动画**
  - **<FileType fileType="folder" name="animation_controllers"/>：实体动画控制器**
    - **<FileType fileType="file" name="npc.animations.json"/>：NPC 的动画控制器**
  - <FileType fileType="folder" name="entity"/>：实体客户端定义
    - **<FileType fileType="file" name="npc.client_entity.json"/>：NPC 的资源包定义**
  - <FileType fileType="folder" name="models"/>：模型
    - <FileType fileType="folder" name="entity"/>：实体模型
      - <FileType fileType="file" name="npc.geo.json"/>：NPC 的模型
  - <FileType fileType="folder" name="render_controllers"/>：渲染控制器
    - <FileType fileType="file" name="npc.render_controllers.json"/>：NPC 的渲染控制器
  - <FileType fileType="folder" name="texts"/>：文本
    - <FileType fileType="file" name="zh_CN.lang"/>：（*有冲突风险*）中文翻译文本
    - <FileType fileType="file" name="en_US.lang"/>：（*有冲突风险*）英文翻译文本
  - <FileType fileType="folder" name="textures"/>：贴图
    - <FileType fileType="folder" name="entity"/>：实体贴图
      - <FileType fileType="folder" name="npc"/>：NPC 贴图
        - <FileType fileType="image" name="0.png"/>：NPC 0 的贴图（Steve）
        - <FileType fileType="image" name="1.png"/>：NPC 1 的贴图（Alex）
  - <FileType fileType="file" name="manifest.json"/>：（*有冲突风险*）清单文件
  - <FileType fileType="image" name="pack_icon.png"/>：包图标

<br/></div>

以上部分文件中的自定义内容使用了字段`template`，然而**我们不推荐您在您的作品中使用该字段**。在正式使用本包之前，您应当将这些字段按您的需求进行改动。

## 使用方法

合并完成之后，在主包可实现功能的基础上，您还可以使用下面的功能。

### 调用状态动作

我们设计了 5 种状态动作：站立、行走、坐下、坐下并抬头、趴下。这 5 种状态动作是始终播放的，默认播放站立动画。

除了行走状态（行走状态为站立时且 NPC 移动时自动播放）之外，其他 4 种状态可以通过实体属性检测。

| 实体属性 | 类型 | 描述 |
| --- | :---: | --- |
| `template:state` | `stand`、`sit`、`sit_raising_head`、`lie` | NPC 当前的状态动作。 |

也可以通过事件人为调用。

| 事件名 | 描述 |
| --- | --- |
| `template:stand` | 设置 NPC 的状态为站立。 |
| `template:sit` | 设置 NPC 的状态为坐下。 |
| `template:sit_raising_head` | 设置 NPC 的状态为坐下并抬头。 |
| `template:lie` | 设置 NPC 的状态为趴下。 |

例如，下面的命令会让所有坐下的 NPC 站起来：

```mcfunction
event entity @e[has_property={template:state="sit"}] template:stand
event entity @e[has_property={template:state="sit_raising_head"}] template:stand
```

### 调用特殊动作

我们设计了 8 种特殊动作，包括：挥手、说话（包含 4 种动作）、鼓掌、放置方块、环视、点头、摇头、坏笑。这 8 种特殊动作需要通过事件调用才能播放。

以上的所有特殊动作都可以通过实体属性检测：

| 实体属性 | 类型 | 描述 |
| --- | :---: | --- |
| `template:animation` | `none`、`wave_hand`、`speak`、`applause`、`place_block`、`look_around`、`nod`、`shake_head`、`bad_smile` | NPC 当前的特殊动作。其中`none`代表无动作，当实体的动画播放完后自动切换为无动作状态。 |
| `template:speak_mode` | 整数（`1`-`4`） | NPC 当前说话时的特殊说话动作。 |

通过事件人为调用这些动作可以使其播放特殊动作。注意：这些动作全部适用于站立状态和坐下状态，但全部都不适用于趴下的状态。

| 事件名 | 描述 |
| --- | --- |
| `template:no_animation` | 停止 NPC 的特殊动作。 |
| `template:wave_hand` | 令 NPC 挥手。 |
| `template:speak` | 令 NPC 说话。 |
| `template:applause` | 令 NPC 鼓掌。 |
| `template:place_block` | 令 NPC 放置方块（仅动作）。 |
| `template:look_around` | 令 NPC 环视。 |
| `template:nod` | 令 NPC 点头。 |
| `template:shake_head` | 令 NPC 摇头。 |
| `template:bad_smile` | 令 NPC 坏笑。 |

例如，下面的命令会让所有无动作的 NPC 左右环视：

```mcfunction
event entity @e[has_property={template:animation="none"}] template:look_around
```

### 添加更多动作

您可以在 Blockbench 中，基于我们的动作进行优化、或者进行全新的设计，以符合您的定制需求。不要忘记在行为包实体定义中添加对应实体属性和事件哦。

## 实例

<details>

<summary>制作一个 NPC 放置方块的动画</summary>

执行一次。以放置石头为例，事先需要确定 NPC 的位置、朝向。假设下文的坐标为 NPC 前方的方块。首先执行`init`函数。

```mcfunction title="init.mcfunction" showLineNumbers
event entity @e[type=template:npc] template:place_block
replaceitem entity @e[type=template:npc] slot.weapon.mainhand 0 stone
# 约15ticks的时候出现放置方块的动作
schedule delay add setblock 15t
```

```mcfunction title="setblock.mcfunction" showLineNumbers
setblock 0 0 0 stone
playsound stone.use @a 0 0 0
replaceitem entity @e[type=template:npc] slot.weapon.mainhand 0 air
```

</details>

import GiscusComponent from "/src/components/GiscusComponent/component.js"

<GiscusComponent/>
