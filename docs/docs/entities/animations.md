---
sidebar_position: 6
---

# 动画与动画控制器

import Version from "/src/components/highlight/version"
import DataType from "/src/components/type/data"
import '/src/css/treeview.css';

> 适用版本：国际版 26.40，中国版 3.9（1.21.120）。

动画（Animations）与动画控制器（Animation Controllers）用于规定和控制实体动画。

动画规定实体的动画行为。播放动画主要通过时间线（Timeline）的方式运行，在触发该动画起直至特定的时间节点对实体的模型进行操作（包括旋转、平移、缩放等），或令实体执行客户端行为（例如播放音效、释放粒子等），并可选择是否需要重复播放。

动画控制器规定实体的数个状态（States）。在检查到实体符合指定条件后，会将实体从一个状态切换到另一个状态。由实体的状态来决定播放哪些动画。

## 资源包动画

## 行为包动画

在行为包中也可以使用动画与动画控制器，但其功能与一般的资源包动画和动画控制器有所不同：

- 动画：在特定的时间节点执行事件或命令，而非对实体的模型进行操作。
- 动画控制器：在进入特定状态后可执行命令。

在定义格式上，行为包动画也和资源包动画高度类似。

### 服务端实体定义

行为包动画需要定义在服务端实体定义的<DataType type="object" name="description" isRequired/>下。

<treeview>

- <DataType type="object" name="scripts"/>：定义实体的行为包脚本。
  - <DataType type="array" name="animate"/>：定义实体将会播放何种行为包动画。
    - <DataType type="string"/>：（写法 1）待播放的动画。应指定为`动画短 ID`。
    - <DataType type="object"/>：（写法 2）待播放的动画，只有满足特定条件时才会播放。
      - <DataType type="string" name="(动画短 ID)"/>：使用该 ID 需要满足的条件。应指定为一个 Molang 表达式。

</treeview>

<treeview>

- <DataType type="object" name="animations"/>：定义实体的行为包动画。应与 scripts 参数联合使用。
  - <DataType type="object" name="(动画短 ID)"/>：定义动画短 ID 所对应的动画长 ID。

</treeview>

---

## 参考文档
