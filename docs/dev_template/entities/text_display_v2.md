---
sidebar_position: 2
---

# 文本展示实体 v2

export const Highlight = ({children, color}) => (
  <span
    style={{ backgroundColor: color, borderRadius: '10px', color: '#fff', padding: '10px', cursor: 'pointer', }}
    onClick={() => {}}>
    {children}
  </span>
);

## [<Highlight color="#25c2a0">下载</Highlight>](https://app.nekodrive.net/s/VZMid)

**本包用于创建 Java 版中的辅助实体：[文本展示实体](https://zh.minecraft.wiki/w/展示实体)**。

文本展示实体又称悬浮文本，常常用于玩法地图或服务器中。它能够在半空中显示文本，通常显示效果都要远好于告示牌，因此深受开发者们的喜爱。然而实现文本展示实体并不是一件简单的事情，直到 Java 版 1.19.4 才存在原生的文本展示实体。

和标记类似，文本展示实体具有一些良好的性质：

- **无碰撞箱**，因此玩家不会和这种实体误接触或误伤。
- **无外观**，因此无需使用循环`/effect`强行为文本展示实体隐身，它本身就是不可见的。
- **无重力**，因此无需使用循环`/tp`强行定位文本展示实体的位置，即使在空中它也不会掉落。
- **行为少**，它只具有最基础的实体属性，这使得它在较大量存在的时候也不会影响太多性能。

您可以在很多情况下使用文本展示实体来代替告示牌的显示效果。不过需要注意一个问题：基岩版的文本展示实体会穿墙，目前暂时没有办法解决。

本包为**行为包**和**资源包**组合的包。

:::warning[温馨提示]

本文假定您已经能够独立编写属于自己的自定义实体。如果您还不能编写自定义实体，请阅读模块 2 的教程：[5.3.1 数据驱动实体](/docs/tutorials/a2_addons/b5_combined_addons/3_custom_entities/1_data_driven_entities)。

:::

---

## 文件架构

下面的文件架构中，粗体部分代表本包的核心文件。在您合并包时应当着重关注下面被粗体的文件。

其中可能会出现多个文件冲突。如果在粘贴过程中遇到冲突，**请务必选择跳过这些文件而非覆盖您原有的文件**，并按照下面可能需要修改的文件列表进行选择性粘贴。

- `BP_text_display/`：行为包根目录
  - `entities/`：实体服务端定义
    - `template/`：（*建议换名*）分类
      - **`text_display.server_entity.json`：文本展示实体的行为包定义**
  - `manifest.json`：（*有冲突风险*）清单文件
  - `pack_icon.png`：包图标
- `RP_text_display/`：资源包根目录
  - `entity/`：实体客户端定义
    - **`text_display.client_entity.json`：文本展示实体的资源包定义**
  - `render_controllers/`：渲染控制器
    - **`text_display.render_controllers.json`：文本展示实体的渲染控制器**
  - `texts/`：文本
    - **`zh_CN.lang`：（*有冲突风险*）中文翻译文本**
    - **`en_US.lang`：（*有冲突风险*）英文翻译文本**
  - **`sounds.json`：（*有冲突风险*）音效定义**
  - `manifest.json`：（*有冲突风险*）清单文件
  - `pack_icon.png`：包图标

### 合并时可能需要修改的文件

以下文件可能和您已有的包产生冲突。在复制这些文件时，如果产生冲突，请注意**以下文件不能直接复制，需要视情况手动粘贴其中的内容**。

- `RP/texts/*.lang`
- `RP/sounds.json`

以下文件中的自定义内容使用了字段`template`，然而**我们不推荐您在您的作品中使用该字段**。在正式使用本包之前，您应当将这些字段按您的需求进行改动。

- 全部核心文件。

## 使用方法

合并完成之后，您就可以使用下面的功能。

### 生成文本展示实体

文本展示实体被设置为不可使用刷怪蛋生成的，您必须使用命令`/summon`来生成文本展示实体。示例如下：

```mcfunction
summon template:text_display ~~~
```

请注意命名空间应当随着您使用的命名空间而变动。这样您就生成了一个文本展示实体。

文本展示实体可以命名。您可以使用命令`/summon`直接生成一个带有名称的文本展示实体。大多数情况下，文本展示实体都需要命名。示例如下：

```mcfunction
summon template:text_display "Enter here." 10 10 10
```

### 移除文本展示实体

您当然可以直接使用`/kill`命令直接清除一个文本展示实体。然而，这会导致其在死亡不久后产生一个死亡白雾，可能会影响视觉效果。

如果您不希望其在死亡时产生白雾，可以调用下面的事件直接移除之。

| 事件名 | 描述 |
| --- | --- |
| `template:remove_immediately` | 立刻移除该实体。 |

这样，该实体会在调用该事件时毫无声息地被立刻移除。示例如下：

```mcfunction
event entity @e[type=template:text_display] template:remove_immediately
```

## 实例

<details>

<summary>生成一个“开始游戏”的文本</summary>

使用一个一次性执行的函数`init.mcfunction`来定义一个文本展示实体：

```mcfunction title="init.mcfunction" showLineNumbers
summon template:text_display "§b点击按钮以开始游戏" 10 10 10
```

</details>

## 更新日志

相比于 v1 版本，v2 版本主要进行了如下更改：

- 提升了最低版本需求为 1.20.50。
- 不再使用`runtime_identifier`来移除文本展示实体的死亡动画及音效，而是使用更稳定的`minecraft:instant_despawn`。
- 将标记与文本展示实体分离，不再使用同一个文档。

## 过往版本下载

您可以在这里下载到过往版本。然而，我们已不再推荐使用这些旧版本。

[<Highlight color="#25c2a0">下载 v1 版本</Highlight>](https://app.nekodrive.net/s/zgGi4)

*备注：v1 版本将同时下载标记和文本展示实体*。
