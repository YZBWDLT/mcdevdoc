---
sidebar_position: 5
---

# 公告板 v2

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import Download from "/src/components/highlight/download"

<Download url="https://app.nekodrive.net/s/gvdck"/>

本包用于创建一个公告板实体。

在现在的众多高端地图中，总是会有一些「公告板」来宣传作者和团队信息。例如，下图为著名的 *15 Years Journey* 地图中的公告板：

![billboard_1](/img/dev_template/billboard/billboard_1.png)

为此，我们创建了一个类似的实体模板，便于广大地图开发者使用。

效果图（开启 Vibrant Visuals）：

![billboard_2](/img/dev_template/billboard/billboard_2.png)

本包为**行为包**和**资源包**组合的包。

:::warning[温馨提示]

本文假定您已经能够独立编写属于自己的自定义实体。如果您还不能编写自定义实体，请阅读模块 2 的教程：[6.1 数据驱动实体](/docs/tutorials/a2_addons/b6_data_driven_entities/c1_data_driven_entities)。

:::

---

## 文件架构

下面的文件架构中，粗体部分代表本包的核心文件。在您合并包时应当着重关注下面被粗体的文件。

其中可能会出现多个文件冲突。如果在粘贴过程中遇到冲突，**请务必选择跳过这些文件而非覆盖您原有的文件**，并按照下面可能需要修改的文件列表进行选择性粘贴。

<treeview>

- <FileType type="folder" name="BP_billboard"/>：行为包根目录
  - <FileType type="folder" name="entities"/>：实体服务端定义
    - <FileType type="folder" name="template"/>：（*建议换名*）分类
      - <FileType type="file" name="billboard.server_entity.json"/>：**公告板的行为包定义**
  - <FileType type="file" name="manifest.json"/>：（*有冲突风险*）清单文件
  - <FileType type="image" name="pack_icon.png"/>：包图标
- <FileType type="folder" name="RP_billboard"/>：资源包根目录
  - <FileType type="folder" name="animations"/>：实体动画定义
    - <FileType type="file" name="billboard.animations.json"/>：**公告板的动画定义**
  - <FileType type="folder" name="entity"/>：实体客户端定义
    - <FileType type="file" name="billboard.client_entity.json"/>：**公告板的资源包定义**
  - <FileType type="folder" name="models"/>：模型
    - <FileType type="folder" name="entity"/>：实体模型
      - <FileType type="file" name="billboard.geo.json"/>：**公告板的模型**
  - <FileType type="folder" name="render_controllers"/>：渲染控制器
    - <FileType type="file" name="billboard.render_controllers.json"/>：**公告板的渲染控制器**
  - <FileType type="folder" name="texts"/>：文本
    - <FileType type="file" name="zh_CN.lang"/>：**（*有冲突风险*）中文翻译文本**
    - <FileType type="file" name="en_US.lang"/>：**（*有冲突风险*）英文翻译文本**
  - <FileType type="folder" name="textures"/>：贴图
    - <FileType type="folder" name="entity"/>：实体贴图
      - <FileType type="image" name="billboard.png"/>：**公告板的贴图**
  - <FileType type="file" name="manifest.json"/>：（*有冲突风险*）清单文件
  - <FileType type="image" name="pack_icon.png"/>：包图标
- <FileType type="file" name="模板PPT.pptx"/>：**公告板的画板 PPT**

</treeview>

### 合并时可能需要修改的文件

以下文件可能和您已有的包产生冲突。在复制这些文件时，如果产生冲突，请注意**以下文件不能直接复制，需要视情况手动粘贴其中的内容**。

- `RP/texts/*.lang`

以下文件中的自定义内容使用了字段`template`，然而**我们不推荐您在您的作品中使用该字段**。在正式使用本包之前，您应当将这些字段按您的需求进行改动。

- 全部核心文件。

> 提示：您可以使用 VSC 的全局搜索功能，将所有的`template`更改为您的命名空间。

## 使用方法

合并完成之后，您就可以使用下面的功能。

### 生成公告板

公告板可以使用刷怪蛋生成。然而，我们推荐您使用命令`/summon`来生成公告板。示例如下：

```mcfunction
summon template:billboard ~~~
```

请注意命名空间应当随着您使用的命名空间而变动。这样您就生成了一个公告板。

### 移除公告板

您当然可以直接使用`/kill`命令直接清除一个公告板。然而，这会导致其在死亡不久后产生一个死亡白雾，可能会影响视觉效果。

如果您不希望其在死亡时产生白雾，可以调用下面的事件直接移除之。

| 事件名 | 描述 |
| --- | --- |
| `template:remove_immediately` | 立刻移除该实体。 |

这样，该实体会在调用该事件时毫无声息地被立刻移除。示例如下：

```mcfunction
event entity @e[type=template:billboard] template:remove_immediately
```

### 使公告板无法穿过

因为基岩版的实体引擎限制，公告板是可以被穿过的。所以，您需要额外使用屏障阻挡公告板。

首先，考虑到屏障的限制，您需要限制公告板的朝向为朝向正东、正西、正北或正南，然后，按照您设置的`ry`值，使用对应的命令设置屏障：

```mcfunction title="ry=0的命令"
summon template:billboard x y z 0 0
execute as @e[type=template:billboard,rym=-2,ry=2] at @s positioned ~-2~~ run fill ~~~~4~3~ barrier
```

```mcfunction title="ry=90的命令"
summon template:billboard x y z 90 0
execute as @e[type=template:billboard,rym=88,ry=92] at @s positioned ~~~-2 run fill ~~~~~3~4 barrier
```

```mcfunction title="ry=180的命令"
summon template:billboard x y z 180 0
execute as @e[type=template:billboard,rym=-180,ry=-178] at @s positioned ~-2~~ run fill ~~~~4~3~ barrier
```

```mcfunction title="ry=270的命令"
summon template:billboard x y z 270 0
execute as @e[type=template:billboard,rym=-92,ry=-88] at @s positioned ~~~-2 run fill ~~~~~3~4 barrier
```

### 自定义公告板内容

我们提供的公告板模板中，有一个 PPT 文件<FileType type="file" name="模板PPT.pptx"/>，您可以在此文件中设计公告板的内容：

![custom_content](/img/dev_template/billboard/custom_content.png)

然后，截取一张 720×405（宽高比 16:9）的截图，并将此截图覆盖到公告板贴图<FileType type="image" name="billboard.png"/>的对应区域上即可。

## 更新日志

相比于 v1 版本，v2 版本主要进行了如下更改：

- 提升了最低版本需求为 1.21.0。
- 现在可以调用`template:remove_immediately`来无痕移除公告板。

## 过往版本下载

您可以在这里下载到过往版本。然而，我们已不再推荐使用这些旧版本。

<Download text="下载 v1 版本" url="https://app.nekodrive.net/s/lXPSl" isInline/>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
