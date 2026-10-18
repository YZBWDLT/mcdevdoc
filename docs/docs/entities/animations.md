---
sidebar_position: 9
---

# 动画与动画控制器

import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import '/src/css/treeview.css';

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

动画（Animations）规定骨骼如何随时间变化；动画控制器（Animation Controllers）规定在什么条件下播放哪些动画。二者配合，就能用状态机的方式组织实体的动作。

资源包中的动画作用于模型：按时间线旋转、平移、缩放骨骼，或在指定时间点播放音效与粒子；行为包中的动画作用于逻辑：在时间点执行[事件](#事件)，驱动实体的状态变化，不改变模型。

两者的条件与参数都可以填写 [Molang 表达式](./molang)，可用的查询见[与实体有关的 Molang 查询函数](./molang)。

## 事件

事件（Event）指动画系统在某个时刻执行的一串指令，统一以字符串表示，共三类：

| 类别          | 写法示例                       | 执行端         |
| ------------- | ------------------------------ | -------------- |
| 实体事件      | `@s minecraft:ageable_grow_up` | 仅服务端       |
| 斜杠命令      | `/tell @a hello`               | 仅服务端       |
| Molang 表达式 | `variable.foo = 3;`            | 客户端与服务端 |

- 实体事件是[实体定义](./description#行为包定义格式)中`events`段声明的事件，写法为`@s`加事件 ID，只能作用于实体自身，另见[实体事件](./events)。
- 斜杠命令以`/`开头，执行者即为该实体，例如`/tp ~ ~10 ~`会把该实体向上传送。
- [Molang 表达式](./molang)用于执行计算或修改变量，常见用途是让后续的状态转变读到新的变量值。

两端都具备这套机制，区别在于能执行哪几类：客户端（资源包）只执行 Molang 表达式，实体事件与斜杠命令写进去也不会生效；服务端（行为包）三类都能执行。

## 资源包动画

动画文件放在资源包的<FileType type="folder" name="animations"/>下。资源包动画只负责视觉表现，其中的音效与粒子不属于[事件](#事件)；在时间点触发事件是行为包的能力，见[行为包动画与动画控制器](#行为包动画与动画控制器)。

### 文件格式

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="string" name="format_version" isRequired/>：格式版本。
    - <DataType type="object" name="animations" isRequired/>：动画列表。
        - <DataType type="object" name="(动画 ID)"/>：定义一个动画，ID 习惯以`animation.`开头。
            - <DataType type="boolean" name="loop"/>：（写法 1）动画结束后是否从`0`重新播放。默认值为`false`。
            - <DataType type="string" name="loop"/>：（写法 2）填写`hold_on_last_frame`时停在最后一帧，不回到开头。
            - <DataType type="float" name="animation_length"/>：动画被视为结束的时间（秒）。默认值为最后一个关键帧的时间。
            - <DataType type="float" name="blend_weight"/>：该动画与其他动画的混合程度。`0.0`为关闭，`1.0`为完全应用。默认值为`1.0`，也可填写 [Molang 表达式](./molang)。
            - <DataType type="boolean" name="override_previous_animation"/>：为`true`时先把骨骼重置到绑定姿态，再应用该动画，从而覆盖此前已应用的动画。默认值为`false`。
            - <DataType type="string" name="anim_time_update"/>：用 [Molang 表达式](./molang)决定动画时间如何推进。原版常用[`query.modified_distance_moved`](./molang#移动与姿态)让行走动画与实际位移同步。
            - <DataType type="string" name="start_delay"/>：动画首次播放前的等待时间（秒），可填 [Molang 表达式](./molang)。
            - <DataType type="string" name="loop_delay"/>：每次循环结束后的等待时间（秒），可填 [Molang 表达式](./molang)。仅对循环动画有效。
            - <DataType type="object" name="sound_effects"/>：在指定时间点播放音效。
                - <DataType type="string" name="(时间点)"/>：音效的 ID。
            - <DataType type="object" name="particle_effects"/>：在指定时间点播放粒子。
                - <DataType type="string" name="(时间点)"/>：粒子的 ID。
            - <DataType type="object" name="bones" isRequired/>：参与动画的骨骼。
                - <DataType type="object" name="(骨骼名)"/>：骨骼名必须与[实体模型](./model)中的骨骼完全一致。
                    - <DataType type="float" name="position"/>：（写法 1）单个数值，同时作用于三个轴。单位为 1/16 米，即模型中的一个像素。
                    - <DataType type="array" name="position"/>：（写法 2）由 3 个`float`组成，分别对应 X、Y、Z。
                    - <DataType type="object" name="position"/>：（写法 3）关键帧对象，键为时间点（秒），值为前两种写法之一。另见[关键帧](#关键帧)。
                        - <DataType type="object" name="(时间点)"/>：一个关键帧。
                            - <DataType type="float"/><DataType type="array"/><DataType type="string" name="pre"/>：向该关键帧插值时使用的值，可为单个数值、三元素数组或 [Molang 表达式](./molang)。
                            - <DataType type="float"/><DataType type="array"/><DataType type="string" name="post"/>：从该关键帧插值走时使用的值，写法同上。
                            - <DataType type="string" name="lerp_mode"/>：插值方式，目前可写`catmullrom`。另见[插值](#插值)。
                    - <DataType type="float" name="rotation"/>：（写法 1）单个数值，同时作用于三个轴。单位为度，顺序为欧拉 X→Y→Z。
                    - <DataType type="array" name="rotation"/>：（写法 2）由 3 个`float`组成。
                    - <DataType type="object" name="rotation"/>：（写法 3）关键帧对象，结构同`position`。
                    - <DataType type="float" name="scale"/>：（写法 1）单个数值，同时作用于三个轴。
                    - <DataType type="array" name="scale"/>：（写法 2）由 3 个`float`组成。
                    - <DataType type="object" name="scale"/>：（写法 3）关键帧对象，结构同`position`。目前仅支持等比缩放。
                    - <DataType type="string" name="relative_to"/>：该骨骼的变换相对哪一根骨骼计算。

</treeview>

动画与动画控制器共用同一套格式版本，本节说明后文不再重复。这个值决定解析器如何理解文件，近几个版本主要是修正行为，而非增删字段：

| 格式版本  | 主要变化                                                                   |
| --------- | -------------------------------------------------------------------------- |
| `1.17.30` | 转变中的 Molang 表达式含大写字母时可正确求值，此前字符串会被强制转为小写。 |
| `1.18.10` | 修复默认状态中定义的控制器事件，在控制器立即切换到其他状态时被跳过的问题。 |
| `1.18.20` | `pre_animation`与`initialize`中带大写字母的 Molang 表达式可正确求值。      |

### 关键帧

模型中的每根骨骼都带一组变换——位置、旋转与缩放。动画要做的事情就是给这三者各自排一条随时间变化的值曲线，因此同一根骨骼上有三个互相独立的通道：

- `position`：平移，单位与模型一致。
- `rotation`：旋转角，单位为度，顺序为欧拉 X→Y→Z。
- `scale`：缩放比例，目前仅支持等比。

每个通道都有三种写法：

1. 单个数值作用于全部轴：

    ```json showLineNumbers
    "rotation": 45.0
    ```

2. 三元素数组分别对应 X、Y、Z：

    ```json showLineNumbers
    "rotation": [30.0, 0.0, 45.0]
    ```

3. 通道内可以按任意时间点（秒）设置**关键帧**（Key Frame）：

    ```json showLineNumbers
    "rotation": {
        "0.0": [80.0, 0.0, 0.0],
        "0.1667": [-80.0, 0.0, 0.0],
        "0.333": [80.0, 0.0, 0.0]
    }
    ```

    其中，键是时间戳（单位：秒），而值可以是前两种写法的一个。若完全不设关键帧，系统会在`0.0`处自动生成一个，通道数据都存放在其中。  
    相邻关键帧之间由引擎插值过渡，默认是线性插值，但可以采用其他的插值方式，见[插值](#插值)。

### 插值

采用线性插值时，曲线在关键帧处出现折角。若希望过渡圆滑，可以在关键帧对象里写`lerp_mode`：

```json showLineNumbers
"position": {
    "0.0": { "post": [0, 0, 0], "lerp_mode": "catmullrom" },
    "1.0": { "post": [0, -0.5, 0], "lerp_mode": "catmullrom" },
    "2.0": { "post": [0, 0, 0], "lerp_mode": "catmullrom" }
}
```

原版悦灵（<FileType type="file" name="allay.animation.json"/>）的`animation.allay.idle`用这段让头部平滑地上下浮动。`catmullrom`把相邻关键帧一并当作控制点做样条插值，因此运动到关键帧时不会出现折角。

关键帧的值也可以是`pre`与`post`，分别表示「向该关键帧插值时使用的值」与「从该关键帧插值走时使用的值」，两者可以取不同格式。这是做瞬间跳变的手段：

```json showLineNumbers
"rotation": {
    "0.0": [80.0, 0.0, 0.0],
    "0.4": {
        "pre": [80.0, 0.0, 0.0],
        "post": [0.0, 0.0, 0.0]
    },
    "0.8": [-80.0, 0.0, 0.0]
}
```

上例中，骨骼在`0.4`秒前保持`80`度，到`0.4`秒时直接跳到`0`度，再线性过渡到`0.8`秒的`-80`度。

:::note[编者注]

Blockbench 一类模型编辑器通常提供四种关键帧插值，落到基岩版文件时并不都是原生支持：

- 线性：默认写法，不加任何额外字段。
- 平滑：写`"lerp_mode": "catmullrom"`。
- 阶跃：写成`pre`与`post`取值不同的关键帧。
- 贝塞尔：导出时按时间间隔烘焙成多个线性关键帧，文件里看不到贝塞尔本身。

官方动画文档的插值一节仍写着「目前只支持线性插值」，但原版资源包动画中`"lerp_mode": "catmullrom"`出现了近两千次，以实际文件为准。

:::

:::info[提示]

每帧开始时，骨骼会先重置到模型定义中的默认姿态，然后各动画按通道逐项相加。所有动画叠加完毕后才会统一转换为一次变换，因此多个动画同时作用于同一根骨骼时，结果是「相加」而不是「覆盖」。

:::

### 示例

原版四足动物（<FileType type="file" name="quadruped.animation.json"/>）：用[`query.anim_time`](./molang#动画与渲染)驱动四条腿摆动，并让动画时间跟实际位移同步。

```json showLineNumbers
"animation.quadruped.walk": {
    "anim_time_update": "query.modified_distance_moved",
    "loop": true,
    "bones": {
        "leg0": { "rotation": [ "math.cos(query.anim_time * 38.17) *  80.0", 0.0, 0.0 ] },
        "leg1": { "rotation": [ "math.cos(query.anim_time * 38.17) * -80.0", 0.0, 0.0 ] },
        "leg2": { "rotation": [ "math.cos(query.anim_time * 38.17) * -80.0", 0.0, 0.0 ] },
        "leg3": { "rotation": [ "math.cos(query.anim_time * 38.17) *  80.0", 0.0, 0.0 ] }
    }
}
```

`anim_time_update`使动画时间不再按真实时间推进，改由实体走过的距离驱动，因此实体停下时摆动也随之停止。四条腿的旋转角正负号两两相反，形成交替迈步的动作。

## 资源包动画控制器

控制器文件放在资源包的<FileType type="folder" name="animation_controllers"/>下。

### 文件格式

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="string" name="format_version" isRequired/>：格式版本。
    - <DataType type="object" name="animation_controllers" isRequired/>：动画控制器列表。
        - <DataType type="object" name="(控制器 ID)"/>：定义一个控制器，ID 习惯以`controller.animation.`开头。
            - <DataType type="string" name="initial_state"/>：初始状态名。省略时使用`states`中的第一个状态。
            - <DataType type="object" name="states" isRequired/>：状态列表。
                - <DataType type="object" name="(状态名)"/>：一个状态。
                    - <DataType type="array" name="animations"/>：该状态播放的动画。
                        - <DataType type="string"/>：（写法 1）动画的短 ID。
                        - <DataType type="object"/>：（写法 2）带混合权重的动画，键为动画短 ID，值为 [Molang 表达式](./molang)，用作该动画的混合权重。
                    - <DataType type="array" name="transitions"/>：状态转变列表，按顺序求值。
                        - <DataType type="object"/>：一个转变，键为目标状态名，值为 [Molang 表达式](./molang)，用作是否切换的判断条件：返回非零值时切换到该状态。
                    - <DataType type="float" name="blend_transition"/>：离开该状态时的交叉淡化时间（秒）。也可写成按时间点映射的曲线对象。
                    - <DataType type="boolean" name="blend_via_shortest_path"/>：为`true`时，混合到其他状态的过程中各欧拉轴按最短旋转路径插值。
                    - <DataType type="array" name="on_entry"/>：进入该状态时触发的事件，另见[事件](#事件)。资源包中只有 Molang 表达式会执行。
                        - <DataType type="string"/>：一个事件。
                    - <DataType type="array" name="on_exit"/>：离开该状态时触发的事件，写法同上。
                        - <DataType type="string"/>：一个事件。
                    - <DataType type="array" name="particle_effects"/>：进入该状态时播放的粒子。
                        - <DataType type="object"/>：一个粒子，键为`effect`。
                    - <DataType type="array" name="sound_effects"/>：进入该状态时播放的音效。
                        - <DataType type="object"/>：一个音效，键为`effect`。
                    - <DataType type="object" name="variables"/>：状态内可用的变量，仅在该状态生效。
                        - <DataType type="object" name="(变量名)"/>
                            - <DataType type="string" name="input"/>：取值用的 [Molang 表达式](./molang)。
                            - <DataType type="object" name="remap_curve"/>：把输入值线性映射到新值的曲线，键为输入值、值为输出值。

</treeview>

### 状态与转变

动画控制器是一个状态机：任意时刻只有一个当前状态，状态里列出这一状态要播放的动画，以及可以转向哪些其他状态。引擎每帧检查当前状态的转变列表，决定是否切换。

转变按顺序求值，**一旦某个表达式返回非零值就立即切换到对应状态**，并且**每帧只处理一个转变**。全部表达式都返回`0`时保持当前状态。

:::warning[注意]

因为每帧只处理一个转变，转变列表的书写顺序就等于优先级：排在前面的条件会先被判断，命中后就当帧完成切换，后面的条件不再评估。

:::

状态之间默认直接切换，没有过渡。若需要过渡，在**离开的那个状态**上写`blend_transition`，值为交叉淡化的秒数，引擎会在该时间内对两个状态的结果做线性插值。

### 示例

原版绵羊（<FileType type="file" name="sheep.animation_controllers.json"/>）：两个状态来回切换，`walk`按移动速度决定混合权重。

```json showLineNumbers
"controller.animation.sheep.move": {
    "initial_state": "default",
    "states": {
        "default": {
            "animations": [
                { "walk": "query.modified_move_speed" }
            ],
            "transitions": [
                { "grazing": "query.is_grazing" }
            ]
        },
        "grazing": {
            "animations": [
                { "grazing": "!query.is_baby" },
                { "baby_grazing": "query.is_baby" }
            ],
            "transitions": [
                { "default": "query.any_animation_finished" }
            ]
        }
    }
}
```

默认状态只播放`walk`，权重取当前移动速度，摆幅随速度增大；进入`grazing`后按是否幼年播放两套不同的低头动作，动画播完再切回默认状态。

## 在客户端实体中引用

客户端实体需要先把动画与控制器注册为短 ID，再通过`scripts.animate`决定实际播放哪些：

```json showLineNumbers
"animations": {
    "walk": "animation.quadruped.walk",
    "move": "controller.animation.sheep.move"
},
"scripts": {
    "animate": [ "move" ]
}
```

`animate`中的元素也可以写成对象，用 [Molang 表达式](./molang)控制开关：

```json showLineNumbers
"scripts": {
    "animate": [
        { "walk": "query.modified_move_speed" }
    ]
}
```

## 行为包动画与动画控制器

服务端不参与渲染，骨骼动画不会呈现在画面上。但动画系统的本质是「状态机 + 时间线」，这套机制在服务端同样运行，作用从驱动骨骼转为驱动[事件](#事件)。

行为包的动画与控制器放在行为包的<FileType type="folder" name="animations"/>与<FileType type="folder" name="animation_controllers"/>下，注册位置从客户端实体换到了服务端实体。与资源包不同，三类事件在这里都能执行，实体事件与斜杠命令也因此只在行为包中有效。

### 动画文件格式

行为包动画与资源包动画共用同一套文件结构，但服务端不渲染模型，骨骼变换、音效、粒子等字段不会产生任何效果。实际有意义的字段如下：

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="string" name="format_version" isRequired/>：格式版本。
    - <DataType type="object" name="animations" isRequired/>：动画列表。
        - <DataType type="object" name="(动画 ID)"/>：定义一个动画。
            - <DataType type="boolean" name="loop"/>：（写法 1）时间线结束后是否从头重新触发。默认值为`false`。
            - <DataType type="string" name="loop"/>：（写法 2）填写`hold_on_last_frame`时停在最后一帧。
            - <DataType type="float" name="animation_length"/>：动画时长（秒），决定时间线何时结束。
            - <DataType type="string" name="anim_time_update"/>：用 [Molang 表达式](./molang)决定动画时间如何推进。
            - <DataType type="object" name="timeline"/>：在指定时间点触发事件，另见[事件](#事件)。
                - <DataType type="string"/><DataType type="array" name="(时间点)"/>：（写法 1）一个事件。（写法 2）由多个事件组成的数组，按顺序依次触发。

</treeview>

### 动画控制器文件格式

同理，控制器中与视觉混合相关的字段在服务端没有作用，实际有意义的字段如下：

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="string" name="format_version" isRequired/>：格式版本。
    - <DataType type="object" name="animation_controllers" isRequired/>：动画控制器列表。
        - <DataType type="object" name="(控制器 ID)"/>：定义一个控制器。
            - <DataType type="string" name="initial_state"/>：初始状态名。省略时使用`states`中的第一个状态。
            - <DataType type="object" name="states" isRequired/>：状态列表。
                - <DataType type="object" name="(状态名)"/>：一个状态。
                    - <DataType type="array" name="animations"/>：该状态运行的动画。
                        - <DataType type="string"/>：动画的短 ID。
                    - <DataType type="array" name="transitions"/>：状态转变列表，按顺序求值。
                        - <DataType type="object"/>：一个转变，键为目标状态名，值为 [Molang 表达式](./molang)，用作是否切换的判断条件：返回非零值时切换到该状态。
                    - <DataType type="array" name="on_entry"/>：进入该状态时触发的事件，另见[事件](#事件)。与资源包不同，三类事件在这里都会执行。
                        - <DataType type="string"/>：一个事件。
                    - <DataType type="array" name="on_exit"/>：离开该状态时触发的事件，写法同上。
                        - <DataType type="string"/>：一个事件。

</treeview>

:::note[编者注]

官方文档的表述是「行为包使用与资源包相同的动画与控制器设置」，因此文件结构本身并没有裁剪，`variables`、`blend_transition`、`blend_via_shortest_path`、`particle_effects`、`sound_effects`等字段都能写进去。但这些字段服务于客户端的骨骼混合与表现，服务端既不渲染模型，也就无从体现，本文因此只列出实际有意义的字段。

:::

### 服务端实体定义

行为包动画与服务端实体中其他数据一样，注册在<DataType type="object" name="description" isRequired/>下。

<treeview>

- <DataType type="object" name="scripts"/>：定义实体的行为包脚本。
    - <DataType type="array" name="animate"/>：定义实体将会播放何种行为包动画。
        - <DataType type="string"/>：（写法 1）待播放的动画。应指定为`动画短 ID`。
        - <DataType type="object"/>：（写法 2）待播放的动画，只有满足特定条件时才会播放。
            - <DataType type="string" name="(动画短 ID)"/>：使用该 ID 需要满足的条件。应指定为一个 [Molang 表达式](./molang)。

</treeview>

<treeview>

- <DataType type="object" name="animations"/>：定义实体的行为包动画。应与 scripts 参数联合使用。
    - <DataType type="object" name="(动画短 ID)"/>：定义动画短 ID 所对应的动画长 ID。

</treeview>

### 示例

行为包动画（改写自官方文档示例）：在时间线上依次触发实体事件与命令，到`2`秒生成、到`4`秒成长为成年体并广播消息。

```json showLineNumbers
"animation.test_events": {
    "timeline": {
        "2.0": "@s minecraft:entity_born",
        "4.0": [
            "@s minecraft:ageable_grow_up",
            "/say 已成长为成年体"
        ]
    },
    "animation_length": 5.0
}
```

`2.0`处只写了一个事件，`4.0`处写成数组，两个事件按顺序执行：先触发实体事件把实体转换为成年体，再执行命令。

行为包控制器（改写自官方文档示例）：`on_entry`与`on_exit`分别在该状态进入与离开时触发事件。

```json showLineNumbers
"controller.animation.test": {
    "states": {
        "default": {
            "on_entry": [ "@s minecraft:entity_born", "/say 进入默认状态" ],
            "on_exit": [ "@s minecraft:ageable_grow_up" ]
        }
    }
}
```

`on_entry`里先触发生成事件，再广播一条消息；`on_exit`在离开该状态时把实体转换为成年体。

配合服务端实体中的注册：

```json showLineNumbers
"animations": {
    "test_events": "animation.test_events",
    "test_controller": "controller.animation.test"
},
"scripts": {
    "animate": [ "test_controller" ]
}
```

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [Animations | bedrock.dev](https://bedrock.dev/docs/stable/Animations)
- [Entity Timeline Events | bedrock.dev](https://bedrock.dev/docs/stable/Entity%20Timeline%20Events)
- [Entity Modeling and Animation | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/entitymodelingandanimation?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
