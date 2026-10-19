---
sidebar_position: 7
---

# 实体模型

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Version from "/src/components/highlight/version"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

实体模型（Entity Geometry）定义实体的形状——由骨骼（Bone）与被骨骼驱动的立方体（Cube）构成。模型文件的位置见[文件架构](./description#文件架构)，每个模型以模型标识符（如`geometry.armadillo`）登记。

模型标识符习惯以`geometry.`开头。模型只影响外观，不影响碰撞箱等行为；碰撞箱由[`minecraft:collision_box`](./components#minecraftcollision_box)决定。

:::warning[注意]

实体模型建议使用 [Blockbench](https://blockbench.net/) 等模型编辑器制作后导出，不建议手工编写 JSON。骨骼层级、立方体尺寸与 UV 坐标都是空间数值，手写极易出错，而错误在游戏中往往只表现为模型缺失或贴图错位，排查成本较高。

:::

:::info[提示]

模型文件目前有`1.8.0`与`1.12.0`两种格式：`1.8.0`以顶层键（如`geometry.pig.v1.8`）直接作为标识符，`1.12.0`改为`minecraft:geometry`数组，并支持逐面 UV。本文记录`1.12.0`格式。

:::

## 模型文件格式

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="string" name="format_version" isRequired/>：模型文件的格式版本。建议填写`1.12.0`。
    - <DataType type="boolean" name="debug"/>：调试开关。
    - <DataType type="array" name="minecraft:geometry" isRequired/>：模型列表，一个文件可以定义多个模型。
        - <DataType type="object"/>：一个模型。
            - <DataType type="object" name="description" isRequired/>：模型的描述。
                - <DataType type="string" name="identifier" isRequired/>：模型标识符，如`geometry.armadillo.baby`。
                - <DataType type="int" name="texture_width" isRequired/>：贴图宽度（像素），决定 UV 坐标系的横向范围。
                - <DataType type="int" name="texture_height" isRequired/>：贴图高度（像素），决定 UV 坐标系的纵向范围。
                - <DataType type="float" name="visible_bounds_width"/>：模型可见范围的宽度。
                - <DataType type="float" name="visible_bounds_height"/>：模型可见范围的高度。
                - <DataType type="array" name="visible_bounds_offset"/>：可见范围相对模型原点的偏移，由 3 个`float`组成。
            - <DataType type="string" name="cape"/>：披风模型的标识符。原版实体模型未使用该字段。
            - <DataType type="array" name="bones" isRequired/>：骨骼列表。
                - <DataType type="object"/>：一根骨骼。
                    - <DataType type="string" name="name" isRequired/>：骨骼名，动画中通过该名称引用骨骼。
                    - <DataType type="string" name="parent"/>：父骨骼的名字。子骨骼会跟随父骨骼一起运动。
                    - <DataType type="array" name="pivot"/>：骨骼的旋转中心，由 3 个`float`组成。
                    - <DataType type="array" name="rotation"/>：骨骼的初始旋转角，由 3 个`float`组成。
                    - <DataType type="boolean" name="mirror"/>：是否沿 X 轴镜像该骨骼。
                    - <DataType type="float" name="inflate"/>：该骨骼下所有立方体的统一膨胀距离。默认值为`0`。
                    - <DataType type="int" name="render_group_id"/>：渲染分组编号。
                    - <DataType type="boolean" name="debug"/>：调试开关。
                    - <DataType type="array" name="cubes"/>：挂在骨骼上的立方体列表。
                        - <DataType type="object"/>：一个立方体。
                            - <DataType type="array" name="origin" isRequired/>：立方体最小角的坐标，由 3 个`float`组成。
                            - <DataType type="array" name="size" isRequired/>：立方体的尺寸，由 3 个`float`组成。
                            - <DataType type="array" name="uv" isRequired/>：立方体使用贴图的哪一部分，写成`[u, v]`，即矩形左上角在贴图上的坐标。
                            - <DataType type="object" name="uv"/>：另一种写法，按面指定 UV，键为`north`、`south`、`east`、`west`、`up`、`down`。未列出的面不会被绘制。
                                - <DataType type="object" name="north"/>：北面的 UV。
                                    - <DataType type="array" name="uv" isRequired/>：该面的 UV 起点，由 2 个`float`组成。
                                    - <DataType type="array" name="uv_size"/>：该面占用的贴图像素尺寸，由 2 个`float`组成。省略时取立方体尺寸。
                                    - <DataType type="string" name="material_instance"/>：该面使用的材质实例。
                                - <DataType type="object" name="south"/>：南面，结构同北面。
                                - <DataType type="object" name="east"/>：东面，结构同北面。
                                - <DataType type="object" name="west"/>：西面，结构同北面。
                                - <DataType type="object" name="up"/>：顶面，结构同北面。
                                - <DataType type="object" name="down"/>：底面，结构同北面。
                            - <DataType type="float" name="inflate"/>：立方体各面向外膨胀的距离。默认值为`0`。
                            - <DataType type="array" name="pivot"/>：立方体自身的旋转中心，由 3 个`float`组成。
                            - <DataType type="array" name="rotation"/>：立方体自身的旋转角，由 3 个`float`组成。
                            - <DataType type="boolean" name="mirror"/>：是否沿 X 轴镜像该立方体。
                    - <DataType type="object" name="locators"/>：定位点列表，供牵引绳、手持物品等挂接使用。
                        - <DataType type="array" name="(定位点名)"/>：定位点的坐标，由 3 个`float`组成。
                        - <DataType type="object" name="(定位点名)"/>：定位点的完整写法，可附带旋转与缩放设置。
                            - <DataType type="array" name="offset" isRequired/>：定位点的坐标，由 3 个`float`组成。
                            - <DataType type="array" name="rotation"/>：定位点的旋转角，由 3 个`float`组成。
                            - <DataType type="boolean" name="ignore_inherited_scale"/>：是否忽略从父骨骼继承的缩放。
                    - <DataType type="object" name="poly_mesh"/>：实验性字段，用三角或四边形网格代替立方体。
                        - <DataType type="boolean" name="normalized_uvs"/>：UV 是否归一化到`0`–`1`。
                        - <DataType type="array" name="positions"/>：顶点坐标，每项由 3 个`float`组成。
                        - <DataType type="array" name="normals"/>：顶点法线，每项由 3 个`float`组成。
                        - <DataType type="array" name="uvs"/>：顶点 UV，每项由 2 个`float`组成。
                        - <DataType type="array" name="polys"/>：多边形的顶点索引。
                    - <DataType type="array" name="texture_meshes"/>：实验性字段，把贴图中的像素转成立方体。
                        - <DataType type="object"/>：一个贴图网格。
                            - <DataType type="string" name="texture" isRequired/>：使用的贴图名。
                            - <DataType type="array" name="position"/>：放置位置，由 3 个`float`组成。
                            - <DataType type="array" name="local_pivot"/>：旋转中心在贴图空间中的位置，由 3 个`float`组成。
                            - <DataType type="array" name="rotation"/>：旋转角，由 3 个`float`组成。
                            - <DataType type="array" name="scale"/>：缩放比例，由 3 个`float`组成。

</treeview>

## 客户端实体中的引用

完成模型文件后，还需在客户端实体的<DataType type="object" name="geometry"/>中登记，渲染控制器才能取用。登记时把模型标识符映射到一个短 ID：

```json showLineNumbers
"geometry": {
    "default": "geometry.armadillo",
    "baby": "geometry.armadillo.baby"
}
```

短 ID 由开发者自行命名，只需与引用它的地方保持一致。渲染控制器如何按条件选择模型，见[渲染控制器](./render_controller)。

## 示例

犰狳幼体（<FileType type="file" name="baby_armadillo.geo.json"/>）：`body`骨骼带两个立方体，`tail`骨骼以`body`为父骨骼。

```json showLineNumbers
{
    "format_version": "1.12.0",
    "minecraft:geometry": [
        {
            "description": {
                "identifier": "geometry.armadillo.baby",
                "texture_width": 64,
                "texture_height": 64,
                "visible_bounds_width": 4,
                "visible_bounds_height": 2.5,
                "visible_bounds_offset": [0, 0.75, 0]
            },
            "bones": [
                {
                    "name": "body",
                    "pivot": [0, 4, 0.5],
                    "cubes": [
                        {
                            "origin": [-2.5, 2, -3],
                            "size": [5, 4, 7],
                            "inflate": 0.3,
                            "uv": [0, 0]
                        },
                        {
                            "origin": [-2.5, 2, -2.5],
                            "size": [5, 4, 6],
                            "uv": [0, 11]
                        }
                    ]
                },
                {
                    "name": "tail",
                    "parent": "body",
                    "pivot": [0, 4, 3.9],
                    "cubes": [
                        {
                            "origin": [-0.5, 2, 2.9],
                            "size": [1, 1, 4],
                            "pivot": [0, 2.5, 4.9],
                            "rotation": [-60, 0, 0],
                            "uv": [22, 11]
                        }
                    ]
                }
            ]
        }
    ]
}
```

悦灵（<FileType type="file" name="allay.geo.json"/>）：`root`骨骼上的`lead_hold`定位点用于挂接牵引绳。

```json showLineNumbers
"locators": {
    "lead_hold": [0, 25, 0]
}
```

原版箭（<FileType type="file" name="arrow.geo.json"/>）：按面写法只给出`east`一个面，其余五面不绘制，用于箭杆这类只需单面可见的细长物体。

```json showLineNumbers
"uv": {
    "east": {
        "uv": [0.0, 0.0]
    }
}
```

## 提示

- `texture_width`与`texture_height`必须与贴图实际的像素尺寸一致，否则 UV 会整体错位。
- 超出`visible_bounds`的模型部分会被裁剪掉，模型较大时应同步调大这两个值。
- 立方体的`uv`在`1.12.0`格式下既可以写成`[u, v]`，也可以写成按面指定的对象；模型编辑器导出的文件多为后者，手写时使用`[u, v]`更简洁。
- 按面写法中未列出的面不会被绘制，因此贴图分辨率有限时，可用这种方式省略不会被看到的面。
- 骨骼的`pivot`同时是旋转中心与子骨骼的坐标基准，位置偏移会使整段动画绕错误的轴心旋转。

:::note[编者注]

官方 schema 中，`description`里除`identifier`外都是可选项，`bones`、`origin`、`size`、`uv`也标为可选。但模型缺少这些字段时无法正常渲染，本文按实际使用标注为必填。

立方体的`pivot`在`1.12.0`格式中竖直方向是翻转的，官方 schema 注明该问题在`1.14.0`中修正。使用`1.12.0`编写带旋转的立方体时需要留意。

原版`crossbow.geo.json`（格式版本`1.16.0`）的骨骼上还有一个`binding`字段，值为 Molang 表达式（如`q.item_slot_to_bone_name(c.item_slot)`），用于按物品槽位绑定骨骼名。该字段未出现在官方 schema 中，原版也仅此一例，本文未收录。

:::

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [Entity Modeling and Animation | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/entitymodelingandanimation?view=minecraft-bedrock-stable)
- [Bedrock Modeling | Bedrock Wiki](https://wiki.bedrock.dev/visuals/bedrock-modeling)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
