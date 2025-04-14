---
sidebar_position: 11
---

# 2.11 *新版命令前瞻

在这篇教程中，我们定义当前中国版到目前最新国际正式版中间的这些版本可用的命令，称为新版命令。**均为稳定玩法**，只要是和命令有关的，就都会放到这里来讲。其中，有一些内容在 2.1\~2.10 中，可能已经有所涉及，但是还是在这里简单提一嘴。

希望这篇文档可以帮助你区分目前中国版中还有哪些命令或功能是无法使用的，以及帮助你为未来的中国版更新做好准备。

:::info[本文更新时间]

本文于 2025 年 4 月 14 日更新，中国版最新版本为 1.20.50，国际版最新版本为 1.21.70。

:::

:::warning[超纲警告]

下文将涉及众多和附加包结合使用的命令，对于超纲的内容，我们会在章节前面加一个\*表示，请注意区分。

:::

## 目标选择器参数：实体属性`has_property`

1.20.70

## 玩家信息栏命令`/hud`

1.20.80

## 随机扩散玩家`/spreadplayers`：最大高度

1.21.10

## *重载命令`/reload`：全部重加载

1.21.30

## 相机命令`/camera`：轨道相机的第三人称

| 更新版本 | 权限等级 | 课时 |
| :---: | :---: | :---: |
| 1.21.40 | 1 | [2.9.2 屏幕控制命令](./section9/subsection2#更多的第三人称预设轨道相机) |

轨道相机的第三人称预设`minecraft:follow_orbit`是一种新型的第三人称视角，它允许你按照特定的半径值设定第三人称视角（默认是离玩家 10 格远），并设定位置偏移。**类似于拉得更远的第三人称背面相机**。可用语法如下：

```text title="/camera的语法（适用于minecraft:follow_orbit，1.21.40）" showLineNumbers
camera <玩家: target> set minecraft:follow_orbit
camera <玩家: target> set minecraft:follow_orbit entity_offset <x实体偏移: float> <y实体偏移: float> <z实体偏移: float>
camera <玩家: target> set minecraft:follow_orbit rot <x旋转: value> <y旋转: value>
camera <玩家: target> set minecraft:follow_orbit rot <x旋转: value> <y旋转: value> entity_offset <x实体偏移: float> <y实体偏移: float> <z实体偏移: float>
```

其中，`<预设: string>`均取为`minecraft:follow_orbit`，上述语法为适用于该预设的语法。经过实测，其他子命令（`ease`、`pos`、`facing`）对该预设没有任何作用。

涉及`entity_offset`子命令的语法，截止 1.21.40 仅`minecraft:follow_orbit`可用。

读者应注意，虽然这是相机命令，但**使用其中的`rot`子命令会一并更改对应玩家的旋转角度**。因为这种相机预设本质上是一种第三人称视角，是以玩家视角为基准计算的。所以更改相机旋转角度会一并更改玩家的旋转角度。不指定`rot`时，默认设置为`0 0`。

该命令的`rot`解析疑似存在问题。使用波浪线表述的情况下，无论写为何值（哪怕是`~~`），都会导致玩家的水平朝向顺时针旋转 90°，而竖直朝向无变化。读者在应用该命令时，应尽可能避免使用`~~`写法，除非有所需要。

## *队列命令`/schedule`：清空队列

1.21.40

## 状态效果命令`/effect`：无限时长与清除特定效果

1.21.40

## 相机命令`/camera`：`view_offset`语法

| 更新版本 | 权限等级 | 课时 |
| :---: | :---: | :---: |
| 1.21.50 | 1 | [2.9.2 屏幕控制命令](./section9/subsection2#更多的第三人称预设轨道相机) |

该版本为`minecraft:follow_orbit`新增了`view_offset`语法，可以以玩家视角为基准进行相机偏移，而非以坐标为基准偏移。

```text title="/camera的语法（适用于minecraft:follow_orbit，1.21.50）" showLineNumbers
camera <玩家: target> set minecraft:follow_orbit rot <x旋转: value> <y旋转: value> view_offset <x视角偏移: float> <y视角偏移: float>
camera <玩家: target> set minecraft:follow_orbit rot <x旋转: value> <y旋转: value> view_offset <x视角偏移: float> <y视角偏移: float> entity_offset <x实体偏移: float> <y实体偏移: float> <z实体偏移: float>
camera <玩家: target> set minecraft:follow_orbit view_offset <x视角偏移: float> <y视角偏移: float>
camera <玩家: target> set minecraft:follow_orbit view_offset <x视角偏移: float> <y视角偏移: float> entity_offset <x实体偏移: float> <y实体偏移: float> <z实体偏移: float>
```

涉及`view_offset`子命令的语法，截止 1.21.50 仅`minecraft:follow_orbit`可用。

## 权限命令`/inputpermission`：更多可用权限

1.21.50

## *队列命令`/schedule`：延时队列

1.21.50

## 相机命令`/camera`：聚焦实体

| 更新版本 | 权限等级 | 课时 |
| :---: | :---: | :---: |
| 1.21.60 | 1 | [2.9.2 屏幕控制命令](./section9/subsection2#聚焦实体的相机camera--target_entity与camera--reset_target) |

聚焦实体允许你在使用自由视角`minecraft:free`预设时，将焦点自动对准一个实体。这个功能是依靠`remove_target`和`target_entity`子命令实现的。语法：

```text showLineNumbers
/camera <玩家: target> remove_target
/camera <玩家: target> target_entity <实体: target>
/camera <玩家: target> target_entity <实体: target> target_center_offset <x目标中心偏移: float> <y目标中心偏移: float> <z目标中心偏移: float>
```

较类似于下面的命令重复执行。但不同的是，你还可以选择视角距离该实体在`x`、`y`、`z`方向上的偏移量。

```text
/camera (玩家) set minecraft:free pos ... facing (实体)
```

跟踪目标是持续的，哪怕已经撤除了自由视角相机。要想在使用新的自由视角时不再跟踪实体，必须使用`remove_target`解除跟踪。

## *战利品命令`/loot`：模拟挖掘

1.21.60

## 相机命令`/camera`：锁视角的第三人称

| 更新版本 | 权限等级 | 课时 |
| :---: | :---: | :---: |
| 1.21.70 | 1 | [2.9.2 屏幕控制命令](./section9/subsection2#更多的第三人称预设锁定视角) |

锁定视角的第三人称预设`minecraft:fixed_boom`是一种新型的第三人称视角，类似于`minecraft:follow_orbit`，只是不同点在于你不能转动视角，类似于`/inputpermission`禁用了`camera`权限一样。

涉及`entity_offset`和`view_offset`子命令的语法，在 1.21.70 更新之后仅`minecraft:follow_orbit`和`minecraft:fixed_boom`可用。

## 瞄准辅助`/aimassist`

1.21.70

## 放置命令`/place`

1.21.70

## 放置命令`/place`：拼图和结构用法

1.21.80
