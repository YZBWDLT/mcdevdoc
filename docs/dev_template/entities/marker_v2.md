---
sidebar_position: 1
---

# 标记 v2

import treeview from '/src/css/treeview.css';
import FileType from "/src/components/FileType"

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);

## [<Highlight color="#25c2a0">下载</Highlight>](https://app.nekodrive.net/s/BORHx)

**本包用于创建 Java 版中的辅助实体：标记**。

现在的地图或服务器常常使用盔甲架作为辅助实体。虽然盔甲架足够稳定且无行为，然而其可交互性、可见性和重力效果却常常影响实际效果。Java 版中存在一种实体叫做[标记](https://zh.minecraft.wiki/w/标记)，这种实体存在一些良好的性质，包括：

- **无碰撞箱**，因此玩家不会和这种实体误接触或误伤。
- **无外观**，因此无需使用循环`/effect`强行为标记隐身，它本身就是不可见的。
- **无重力**，因此无需使用循环`/tp`强行定位标记的位置，即使在空中它也不会掉落。
- **行为少**，它只具有最基础的实体属性，这使得它在较大量存在的时候也不会影响太多性能。

因此，标记在绝大多数情况下能够成为盔甲架的良好替代。

本包为**行为包**和**资源包**组合的包。

:::warning[温馨提示]

本文假定您已经能够独立编写属于自己的自定义实体。如果您还不能编写自定义实体，请阅读模块 2 的教程：[5.3.1 数据驱动实体](/docs/tutorials/a2_addons/b5_combined_addons/3_custom_entities/1_data_driven_entities)。

:::

---

## 文件架构

下面的文件架构中，粗体部分代表本包的核心文件。在您合并包时应当着重关注下面被粗体的文件。

其中可能会出现多个文件冲突。如果在粘贴过程中遇到冲突，**请务必选择跳过这些文件而非覆盖您原有的文件**，并按照下面可能需要修改的文件列表进行选择性粘贴。

<div class="treeview">

- <FileType fileType="folder" name="BP_marker"/>：行为包根目录
  - <FileType fileType="folder" name="entities"/>：实体服务端定义
    - <FileType fileType="folder" name="template"/>：（*建议换名*）分类
      - <FileType fileType="file" name="marker.server_entity.json"/>：**标记的行为包定义**
  - <FileType fileType="file" name="manifest.json"/>：（*有冲突风险*）清单文件
  - <FileType fileType="image" name="pack_icon.png"/>：包图标
- <FileType fileType="folder" name="RP_marker"/>：资源包根目录
  - <FileType fileType="folder" name="entity"/>：实体客户端定义
    - <FileType fileType="file" name="marker.client_entity.json"/>：**标记的资源包定义**
  - <FileType fileType="folder" name="render_controllers"/>：渲染控制器
    - <FileType fileType="file" name="marker.render_controllers.json"/>：**标记的渲染控制器**
  - <FileType fileType="folder" name="texts"/>：文本
    - <FileType fileType="file" name="zh_CN.lang"/>：**（*有冲突风险*）中文翻译文本**
    - <FileType fileType="file" name="en_US.lang"/>：**（*有冲突风险*）英文翻译文本**
  - <FileType fileType="file" name="sounds.json"/>：**（*有冲突风险*）音效定义**
  - <FileType fileType="file" name="manifest.json"/>：（*有冲突风险*）清单文件
  - <FileType fileType="image" name="pack_icon.png"/>：包图标

<br/></div>

### 合并时可能需要修改的文件

以下文件可能和您已有的包产生冲突。在复制这些文件时，如果产生冲突，请注意**以下文件不能直接复制，需要视情况手动粘贴其中的内容**。

- `RP/texts/*.lang`
- `RP/sounds.json`

以下文件中的自定义内容使用了字段`template`，然而**我们不推荐您在您的作品中使用该字段**。在正式使用本包之前，您应当将这些字段按您的需求进行改动。

- 全部核心文件。

## 使用方法

合并完成之后，您就可以使用下面的功能。

### 生成标记

标记被设置为不可使用刷怪蛋生成的，您必须使用命令`/summon`来生成标记。示例如下：

```mcfunction
summon template:marker ~~~
```

请注意命名空间应当随着您使用的命名空间而变动。这样您就生成了一个标记。

标记可以命名。您可以使用命令`/summon`直接生成一个带有名称的标记。这个名字无法因玩家的指向而显现，所以可以用一个特殊的名字直接指向一个唯一的标记。示例如下：

```mcfunction
summon template:marker facingPosition 10 10 10
```

这样，使用下面的命令时将把您的视角改为面向该实体。

```mcfunction
tp @s ~~~ facing @e[name=facingPosition,c=1]
```

### 移除标记

您当然可以直接使用`/kill`命令直接清除一个标记。然而，这会导致其在死亡不久后产生一个死亡白雾，可能会影响视觉效果。

如果您不希望其在死亡时产生白雾，可以调用下面的事件直接移除之。

| 事件名 | 描述 |
| --- | --- |
| `template:remove_immediately` | 立刻移除该实体。 |

这样，该实体会在调用该事件时毫无声息地被立刻移除。示例如下：

```mcfunction
event entity @e[type=template:marker] template:remove_immediately
```

## 实例

<details>

<summary>制作一个视角旋转动画</summary>

使用一个一次性执行的函数`init.mcfunction`来定义一个标记`facingPos`：

```mcfunction title="init.mcfunction" showLineNumbers
summon template:marker facingPos 10 10 10
```

然后，基于[教程模块 1，3.5](/docs/tutorials/a1_commands/b3_command_systems/c5_system_on_cb#基于命令方块的命令系统的一个实例旋转动画) 的旋转视角的原理，使用一个循环执行的函数`main.mcfunction`来定义玩家的相机旋转行为。假设手持钻石时旋转相机。

```mcfunction title="main.mcfunction" showLineNumbers
execute as @e[name=facingPos] at @s run tp @s ~~~ ~1
execute as @e[name=facingPos] at @s positioned ^^^5 run camera @a[hasitem={item=diamond,location=slot.weapon.mainhand}] set minecraft:free ease 0.1 linear pos ~~~ facing @s
camera @a[hasitem={item=diamond,location=slot.weapon.mainhand,quantity=0}] clear
```

因为标记本身不可见，因此无需特意添加隐身效果，也无需使用`/tp`固定标记的位置。

</details>

## 更新日志

相比于 v1 版本，v2 版本主要进行了如下更改：

- 提升了最低版本需求为 1.20.50。
- 不再使用`runtime_identifier`来移除标记的死亡动画及音效，而是使用更稳定的`minecraft:instant_despawn`。
- 将标记与文本展示实体分离，不再使用同一个文档。

## 过往版本下载

您可以在这里下载到过往版本。然而，我们已不再推荐使用这些旧版本。

[<Highlight color="#25c2a0">下载 v1 版本</Highlight>](https://app.nekodrive.net/s/zgGi4)

*备注：v1 版本将同时下载标记和文本展示实体*。

import GiscusComponent from "/src/components/GiscusComponent/component.js"

<GiscusComponent/>
