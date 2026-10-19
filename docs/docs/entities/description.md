---
sidebar_position: 1
---

# 数据驱动实体

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Version from "/src/components/highlight/version"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

数据驱动实体（Data-Driven Entity，简称数驱实体）是由开发者给定数据、由游戏引擎自行注册的实体。

数驱实体由行为包与资源包组成：行为包定义实体的逻辑与服务端行为，资源包定义实体的外观。国际版和中国版均可编写数驱实体，两者的编写流程完全相同。

## 文件架构

与实体有关的文件分布如下。

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="entities"/>：服务端实体定义
    - <FileType type="file" name="(实体 ID).server_entity.json"/>：实体定义
  - <FileType type="folder" name="animations"/>：行为包动画
  - <FileType type="folder" name="animation_controllers"/>：行为包动画控制器
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="entity"/>：客户端实体定义
    - <FileType type="file" name="(实体 ID).client_entity.json"/>：实体定义
  - <FileType type="folder" name="models"/> - <FileType type="folder" name="entity"/>：实体模型
  - <FileType type="folder" name="animations"/>：资源包动画
  - <FileType type="folder" name="animation_controllers"/>：资源包动画控制器
  - <FileType type="folder" name="render_controllers"/>：渲染控制器
  - <FileType type="folder" name="materials"/>：材质
  - <FileType type="folder" name="textures"/> - <FileType type="folder" name="entity"/>：实体贴图
  - <FileType type="folder" name="sounds"/>：音频文件（`.fsb`或`.ogg`）与声音定义
    - <FileType type="file" name="sound_definitions.json"/>：声音定义
  - <FileType type="file" name="sounds.json"/>：实体音效事件

</treeview>

各类文件的写法见对应的分页：[实体模型](./model)、[实体材质](./material)、[渲染控制器](./render_controller)、[动画与动画控制器](./animations)、[`sounds.json`](#soundsjson)。

## 行为包配置

### 行为包定义格式

以下为 <FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="entities"/> - <FileType type="file" name="(实体 ID).server_entity.json"/> 的结构。

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="string" name="format_version" isRequired/>：格式版本，决定实体可用的功能。格式版本与游戏版本一一对应，且固定以`1.`开头：游戏版本`1.21.90`对应`1.21.90`，游戏版本`26.60`对应`1.26.60`。填写较低的格式版本时，实体会按该版本的功能解析。
    - <DataType type="object" name="minecraft:entity" isRequired/>：定义数驱实体。
        - <DataType type="object" name="description" isRequired/>：实体描述，定义实体的基本属性。
            - <DataType type="string" name="identifier" isRequired/>：定义实体的命名空间和实体 ID。
            - <DataType type="boolean" name="is_summonable"/>：实体是否可通过[`/summon`](/docs/docs/commands/all_commands#summon)命令等方法召唤。默认值为`false`。
            - <DataType type="boolean" name="is_spawnable"/>：是否要为实体注册一个刷怪蛋。默认值为`false`。
            - <DataType type="boolean" name="is_experimental"/>：是否将该实体标记为实验性内容。默认值为`false`。[^1]
            - <DataType type="string" name="runtime_identifier"/>：定义实体的运行时 ID，用于继承某个原版实体的硬编码行为。另见[运行时 ID](./runtime_identifier)。
            - <DataType type="string" name="spawn_category"/>：<Version add="1.20.80" tooltip="实际加入版本存疑。" inline/> 定义实体的生成类别，该类别会影响实体的自然生成上限。可选值为`ambient`、`axolotls`、`creature`、`misc`、`monster`、`underground_water_creature`、`water_ambient`、`water_creature`。
            - <DataType type="object" name="properties"/>：定义实体的实体属性。另见[实体属性](./property)。
            - <DataType type="object" name="entity_version"/>：<Version add="1.26.30" inline/> 实体版本，声明各升级步骤与升级处理器的对应关系。另见[实体版本](#实体版本)。
                - <DataType type="array" name="upgrades" isRequired/>：升级步骤列表。
                    - <DataType type="object"/>：一个升级步骤。
                        - <DataType type="int" name="upgrade_to" isRequired/>：该步骤将实体升级到的版本号。从`1`开始，必须连续且不可重复。
                        - <DataType type="string" name="name" isRequired/>：该步骤对应的升级处理器名，须在顶层<DataType type="object" name="upgrades"/>中定义，不可为空。
            - <DataType type="object" name="animations"/>：登记行为包动画与动画控制器的短 ID，与`scripts`配合使用。另见[行为包动画与动画控制器](./animations#行为包动画与动画控制器)。
                - <DataType type="string" name="(短 ID)"/>：动画或动画控制器的 ID。
            - <DataType type="object" name="scripts"/>：定义实体要运行的行为包动画与动画控制器。原版实体中没有使用该字段的实例，写法见[行为包动画与动画控制器](./animations#行为包动画与动画控制器)。
                - <DataType type="array" name="animate"/>：要运行的动画与动画控制器。
                    - <DataType type="string"/>：（写法 1）动画或动画控制器的短 ID。
                    - <DataType type="object"/>：（写法 2）以短 ID 为键、[Molang 表达式](./molang)为值，条件成立时才运行。
        - <DataType type="object" name="components" isRequired/>：实体组件，定义实体的功能。
            - `minecraft:(component)`：实体组件，可用的实体组件见[数据驱动实体组件](./components)。
        - <DataType type="object" name="events"/>：实体事件，定义实体在触发相关事件之后会调用的组件组、或执行的功能等。另见[实体事件](./events)。
        - <DataType type="object" name="component_groups"/>：实体组件组，可通过[实体事件](./events)增减的组件。
            - <DataType type="object" name="(组件组 ID)"/>：一个组件组。
                - `minecraft:(component)`：实体组件，可用的实体组件见[数据驱动实体组件](./components)。
        - <DataType type="object" name="upgrades"/>：<Version add="1.26.30" inline/> 升级处理器，语法与[事件响应](./events#事件响应)相同。另见[实体版本](#实体版本)。
            - <DataType type="object" name="(升级处理器 ID)"/>：一个升级处理器。

</treeview>

### 实体版本

<Version add="1.26.30"/>

实体版本（Entity Version）用于自动更新世界中已存在的实体。

在引入实体版本之前，修改实体定义后，先前存在于世界中的实体仍保留修改之前的行为。开发者只能借助[`minecraft:environment_sensor`](./components#minecraftenvironment_sensor)与一个布尔属性逐刻轮询，才能把旧实体迁移到新的定义上——既带来每刻开销，也让定义文件中混入大量迁移逻辑。

实体版本用一串连续的整数记录实体已经历的升级步骤，游戏在加载存档时自动补跑缺失的步骤，使实体总处于最新的状态下。

实体版本不同于格式版本：格式版本决定游戏以何种结构解析定义文件，而实体版本只用于判断某个实体实例需要执行哪些升级步骤。一切实体的默认实体版本均为`0`。

#### 升级的执行时机

游戏在实体生成或从存档加载时比对版本，决定是否执行升级：

- **新生成的实体**：直接把实体版本设为最新，不执行任何升级处理器。
- **版本落后于定义的实体**：从「已保存的版本」之后的步骤开始，按顺序执行到最新版本，然后把实体版本更新为最新。
- **版本与定义一致的实体**：不执行任何升级处理器。
- **版本高于定义的实体**：把实体版本降为最新，不执行任何升级处理器。这一条用于处理实体功能被回滚的情况。

#### 注意事项

- 升级步骤必须从`1`开始且连续：`1`、`2`、`3`合法，`1`、`3`不合法，版本号也不能重复。
- **已经发布的升级处理器不要删除**。玩家世界中的实体可能停在旧版本，需要依次跑完所有步骤才能到达最新版本；删除其中一环会让这条链断掉。确实不再需要的处理器应保留为空对象`{}`，而不是删掉。
- 升级处理器与实体事件是两个独立的概念，彼此不能互相触发：升级处理器无法触发事件，事件也无法触发升级处理器。脚本 API 的[Entity.triggerEvent](/docs/docs/scripts/sapi/server/entity_and_player/entity#triggerevent-方法)同样只对事件有效，传入升级处理器的名称不会产生任何效果。
- 升级处理器执行时会派发[实体更新事件](/docs/docs/scripts/sapi/server/world/after_events#实体更新事件)，但不会经过数据驱动实体触发事件。

#### 示例

在`description`中声明两个升级步骤：

```json showLineNumbers
"description": {
    "identifier": "example:my_entity",
    "entity_version": {
        "upgrades": [
            { "upgrade_to": 1, "name": "example:upgrade_v1" },
            { "upgrade_to": 2, "name": "example:upgrade_v2" }
        ]
    }
}
```

在顶层`upgrades`中定义这两个处理器：第一步添加新行为的组件组，第二步在实体未被驯服时补齐驯服后的默认组件。

```json showLineNumbers
"upgrades": {
    "example:upgrade_v1": {
        "add": {
            "component_groups": ["example:new_behavior"]
        }
    },
    "example:upgrade_v2": {
        "sequence": [
            {
                "filters": {
                    "test": "has_component",
                    "operator": "!=",
                    "value": "minecraft:is_tamed"
                },
                "add": {
                    "component_groups": ["example:tamed_defaults"]
                }
            }
        ]
    }
}
```

此后，停在版本`0`的实体会连续执行两个处理器，停在版本`1`的实体只执行第二步，停在版本`2`的实体不执行任何处理器。

## 资源包配置

### 资源包定义格式

以下为 <FileType type="folder" name="resource_packs"/> - <FileType type="folder" name="entity"/> - <FileType type="file" name="(实体 ID).client_entity.json"/> 的结构。

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="string" name="format_version" isRequired/>：格式版本，决定该文件采用何种版本的方法解析。格式版本与游戏版本一一对应，且固定以`1.`开头：游戏版本`26.60`对应`1.26.60`。[^2]
    - <DataType type="object" name="minecraft:client_entity" isRequired/>：定义数驱客户端实体。
        - <DataType type="object" name="description" isRequired/>：实体描述，定义实体的基本属性。
            - <DataType type="string" name="identifier" isRequired/>：定义实体的命名空间和实体 ID。
            - <DataType type="array" name="render_controllers"/>：定义实体使用的[渲染控制器](./render_controller)，用于按条件应用材质、模型与贴图。若不指定，则实体不会正常渲染。
                - <DataType type="string"/>：（写法 1）渲染控制器的 ID，该控制器始终挂载。
                - <DataType type="object"/>：（写法 2）以渲染控制器的 ID 为键、[Molang 表达式](./molang)为值，条件成立时才挂载该控制器。
            - <DataType type="object" name="materials"/>：定义实体的材质列表。
                - <DataType type="string" name="(材质短 ID)"/>：定义实体使用的材质。`材质短 ID`应与在渲染控制器中定义的`Material.(材质短 ID)`一一对应。另见[实体材质](./material)。
            - <DataType type="object" name="geometry"/>：定义实体的模型列表。
                - <DataType type="string" name="(模型短 ID)"/>：定义实体使用的模型，应指定为模型标识符。`模型短 ID`应与在渲染控制器中定义的`Geometry.(模型短 ID)`一一对应。另见[实体模型](./model)。
            - <DataType type="object" name="textures"/>：定义实体的贴图列表。
                - <DataType type="string" name="(贴图短 ID)"/>：定义实体使用的贴图路径，从`textures/`开始，不带后缀（例：`textures/entity/steve`）。`贴图短 ID`应与在渲染控制器中定义的`Texture.(贴图短 ID)`一一对应。
            - <DataType type="object" name="locators"/>：定义定位器，用于指明牵引绳、骑乘位一类附着点。
                - <DataType type="object" name="(定位器名)"/>：一个定位器。
                    - <DataType type="array" name="(骨骼名)"/>：由 3 个`float`组成，表示该定位器在这根骨骼坐标系中的位置。
            - <DataType type="object" name="particle_effects"/>：定义实体的粒子短 ID，供[动画](./animations#资源包动画)的`particle_effects`引用。
                - <DataType type="string" name="(粒子短 ID)"/>：应指定为粒子发射器文件中定义的粒子标识符。
            - <DataType type="object" name="sound_effects"/>：定义实体的音效短 ID，供[动画](./animations#资源包动画)的`sound_effects`引用。
                - <DataType type="string" name="(音效短 ID)"/>：应指定为声音定义 ID，如`mob.armadillo.roll`。声音定义与音效事件的区别见[`sounds.json`](#soundsjson)一节。
            - <DataType type="object" name="spawn_egg"/>：（写法 1，旧版刷怪蛋贴图定义）定义实体的刷怪蛋贴图。
                - <DataType type="string" name="base_color"/>：刷怪蛋的基底颜色。应指定为 16 进制的颜色代码（`#XXXXXX`）。
                - <DataType type="string" name="overlay_color"/>：刷怪蛋的斑点颜色。应指定为 16 进制的颜色代码（`#XXXXXX`）。
            - <DataType type="object" name="spawn_egg"/>：（写法 2，新版刷怪蛋贴图定义）定义实体的刷怪蛋贴图。
                - <DataType type="string" name="texture"/>：刷怪蛋使用的贴图。应指定为[`item_texture.json`](/docs/docs/items/description#item_texturejson)定义的`短 ID`。
                - <DataType type="string" name="texture_index"/>：使用该贴图中的第几个索引。默认值为`0`。
            - <DataType type="object" name="animations"/>：登记资源包动画与动画控制器的短 ID，与`scripts`配合使用。另见[动画与动画控制器](./animations)。
                - <DataType type="string" name="(短 ID)"/>：动画或动画控制器的 ID。
            - <DataType type="array" name="animation_controllers"/>：<Version add="1.8.0" deprecated="1.10.0" tooltip="在更高版本使用scripts的animate登记控制器。" inline/> 动画控制器列表。
                - <DataType type="object"/>：一个元素。
                    - <DataType type="string" name="(控制器短 ID)"/>：控制器 ID。
            - <DataType type="object" name="scripts"/>：定义实体的客户端脚本。
                - <DataType type="array" name="animate"/>：<Version add="1.10.0" inline/> 要播放的动画与动画控制器。
                    - <DataType type="string"/>：（写法 1）动画或动画控制器的短 ID。
                    - <DataType type="object"/>：（写法 2）以短 ID 为键、[Molang 表达式](./molang)为值，条件成立时才播放。
                - <DataType type="array" name="pre_animation"/>：每帧计算动画之前执行的 [Molang 表达式](./molang)，常用于更新后面要用的变量。
                    - <DataType type="string"/>：一条 Molang 表达式。
                - <DataType type="array" name="initialize"/>：<Version add="1.10.0" inline/> 实体初始化时执行一次的 Molang 表达式。
                    - <DataType type="string"/>：一条 Molang 表达式。
                - <DataType type="float"/><DataType type="string" name="scale"/>：实体的整体缩放比例，可填数值或 Molang 表达式。
                - <DataType type="float"/><DataType type="string" name="scaleX"/>：X 轴方向的缩放比例，写法同上。
                - <DataType type="float"/><DataType type="string" name="scaleY"/>：Y 轴方向的缩放比例，写法同上。
                - <DataType type="float"/><DataType type="string" name="scaleZ"/>：Z 轴方向的缩放比例，写法同上。
                - <DataType type="object" name="variables"/>：<Version add="1.10.0" inline/> 客户端变量，可在动画与渲染控制器中读取。
                    - <DataType type="string" name="variable.(变量名)"/>：声明一个客户端变量。客户端只接受`public`这一个值，表示该变量对其他实体公开，可用`->`运算符读取。
                - <DataType type="string" name="parent_setup"/>：计算骨骼父子关系时执行的 [Molang 表达式](./molang)。
                - <DataType type="string" name="should_update_bones_and_effects_offscreen"/>：<Version add="1.10.0" inline/> 实体不在屏幕内时，该表达式的求值结果非`0`则仍更新骨骼与效果。
                - <DataType type="string" name="should_update_effects_offscreen"/>：<Version add="1.10.0" inline/> 实体不在屏幕内时，该表达式的求值结果非`0`则仍更新效果。
            - <DataType type="boolean" name="enable_attachables"/>：是否为实体启用附着物。默认值为`false`。
            - <DataType type="boolean" name="held_item_ignores_lighting"/>：实体手持物品是否忽略环境光照，若忽略（`true`）则以全亮度渲染手持物品。默认值为`false`。
            - <DataType type="float" name="held_item_scale"/>：<Version add="1.26.10" inline/> 实体手持物品放大多少倍渲染。默认值为`1.0`。
            - <DataType type="boolean" name="hide_armor"/>：是否隐藏实体的盔甲。默认值为`false`。
            - <DataType type="string" name="min_engine_version"/>：实体文件可被解析所需的最低引擎版本，机制见[最低引擎版本](#最低引擎版本)。

</treeview>

### 最低引擎版本

`min_engine_version`用于在同一个资源包内保留同一实体的多个版本，让不同版本的引擎读到各自合适的定义。

游戏会把这个值与**位于资源包堆栈顶部的资源包所构建的引擎版本**比较——也就是顶部资源包`manifest.json`中`min_engine_version`的值，而不是当前游戏的版本。规则有三条：

- 定义的`min_engine_version`高于该版本时，这个定义**不会被解析**。
- 多个定义文件可以使用同一个`identifier`，此时只会加载其中一个。
- 被加载的是`min_engine_version`与顶部资源包引擎版本相同、或最接近且不超过的那一个，其余同标识符的定义一律不解析。

因此它的实际用途是兼容旧环境：用旧版本引擎构建的资源包放在堆栈顶部时，游戏会选中为旧版本准备的定义；其他情况下则用新定义。

```json showLineNumbers
"min_engine_version": "1.21.90"
```

#### 示例一：新旧两套定义并存

资源包中放两个客户端实体文件，`identifier`同为`example:my_entity`，一个是当前使用的定义，另一个为旧版本引擎准备：

```json showLineNumbers title="my_entity.entity.json，节选"
"description": {
    "identifier": "example:my_entity",
    "min_engine_version": "1.21.90",
    "geometry": { "default": "geometry.my_entity" }
}
```

```json showLineNumbers title="my_entity_legacy.entity.json，节选"
"description": {
    "identifier": "example:my_entity",
    "min_engine_version": "1.16.0",
    "geometry": { "default": "geometry.my_entity_legacy" }
}
```

两份定义不会同时生效，实际加载哪一份由顶部资源包的引擎版本决定：

| 顶部资源包的引擎版本 | 加载的定义                     | 原因                                     |
| -------------------- | ------------------------------ | ---------------------------------------- |
| `1.21.90`            | `my_entity.entity.json`        | 与该版本相同，优先选中                   |
| `1.20.0`             | `my_entity_legacy.entity.json` | `1.16.0`是最接近且不超过该版本的一个     |
| `1.10.0`             | 都不加载                       | 两份定义都高于该版本，实体没有客户端定义 |

#### 示例二：只有一份定义

只保留`my_entity.entity.json`、`min_engine_version`写`1.21.90`时，只要顶部资源包的引擎版本低于`1.21.90`，这个文件就完全不被解析。行为包中的实体仍然存在，但资源包没有提供外观，实体不会被渲染。

起作用的始终是**堆栈顶部那个包**的引擎版本，而不是定义所在包的版本。新版资源包排在旧版资源包之下、由旧版包置顶时，判定依据依旧是旧版包的引擎版本。

### `sounds.json`

`sounds.json`登记实体在各类音效事件（例如实体的受伤、死亡、行走）发生时播放的声音。

表中的值不是音频文件路径，而是<FileType type="folder" name="sounds"/> - <FileType type="file" name="sound_definitions.json"/>定义的声音定义 ID，`sounds.json`与客户端实体的`sound_effects`再引用这些 ID。

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="object" name="entity_sounds"/>：实体音效。另见[实体音效](#实体音效)。
        - <DataType type="object" name="defaults"/>：所有实体共用的默认音效，结构同下。未单独定义的实体会沿用这里的设置。
        - <DataType type="object" name="entities"/>：按实体单独定义的音效。
            - <DataType type="object" name="(实体 ID)"/>：一个实体的音效定义。原版实体可省略命名空间。
                - <DataType type="object" name="events"/>：音效事件与声音定义的对应关系。`事件名`可填写的值另见[默认事件名](#默认事件名)。
                    - <DataType type="string" name="(事件名)"/>：（写法 1）声音定义 ID，如`mob.allay.idle`。
                    - <DataType type="object" name="(事件名)"/>：（写法 2）一个对象，可单独为该事件指定音调与音量。
                        - <DataType type="string" name="sound" isRequired/>：声音定义 ID，如`mob.allay.idle`。
                        - <DataType type="float" name="pitch"/>：该事件使用的音调，覆盖实体级别的`pitch`。
                        - <DataType type="float" name="volume"/>：该事件使用的音量，覆盖实体级别的`volume`。
                - <DataType type="float"/><DataType type="array" name="pitch"/>：音高，可写单个数值或`[最小值, 最大值]`的区间。
                - <DataType type="float"/><DataType type="array" name="volume"/>：音量，写法同上。
                - <DataType type="int" name="__molang_version"/>：该定义使用的 Molang 版本，原版均写`13`。
                - <DataType type="object" name="variants"/>：按变种区分的音效。另见[变种音效](#变种音效)。
                    - <DataType type="string" name="key"/>：决定取哪个变种的 Molang 表达式。
                    - <DataType type="object" name="map"/>：按变种名索引的音效定义。每个变种的结构与实体一级的音效定义相同，可写`events`、`pitch`、`volume`，变种未覆盖的事件回退到实体一级。

</treeview>

#### 实体音效

原版悦灵（<FileType type="file" name="sounds.json"/>）：`events`的每一项对应一个音效事件，值直接写声音定义 ID。

```json showLineNumbers title="sounds.json，节选"
"entity_sounds": {
    "entities": {
        "allay": {
            "events": {
                "ambient": "mob.allay.idle",
                "ambient.tame": "mob.allay.idle_holding",
                "death": "mob.allay.death",
                "hurt": "mob.allay.hurt"
            },
            "pitch": [ 0.8, 1.2 ],
            "volume": 1
        }
    }
}
```

`pitch`写区间时，每次播放会在区间内随机取值，同一个音效因此不会每次都完全一致。

#### 默认事件名

事件名由游戏定义，在对应时机自动触发。官方未给出完整清单，以下是原版中使用最多的若干事件：

| 事件名               | 触发时机           |
| -------------------- | ------------------ |
| `ambient`            | 闲置时随机播放     |
| `death`              | 死亡时             |
| `hurt`               | 受伤时             |
| `step`               | 行走时             |
| `eat`                | 进食时             |
| `attack`             | 攻击时             |
| `throw`              | 投掷时             |
| `shoot`              | 射击时             |
| `swim`               | 游泳时             |
| `splash`             | 入水时             |
| `jump`               | 跳跃时             |
| `land`               | 落地时             |
| `mad`                | 进入愤怒状态时     |
| `celebrate`          | 庆祝时，如袭击胜利 |
| `saddle`、`unsaddle` | 装上、卸下鞍时     |
| `add.chest`          | 装上箱子时         |

原版还会用到`ambient.in.water`、`hurt.in.water`、`death.in.water`这类带`.in.water`后缀的变体，以及按生物定制的`haggle`、`roll`、`squish.big`等事件名，完整的事件名共一百六十余个。

#### 自定义事件名

事件名不由`sounds.json`决定。引擎在某个时机（受伤、死亡、落地等）发出一个事件名，再按这个名称到`sounds.json`中查表，查到才播放。因此这些时机只能使用引擎内置的事件名；自定义的名称写入表中不会被自动播放，除非有某个字段显式要求播放它。

数据驱动侧唯一能自行指定事件名的地方是[`minecraft:ambient_sound_interval`](./components#minecraftambient_sound_interval)的`event_name`与`event_names`。把自定义的事件名填进这两个字段，环境音计时器到点时会按该名称查表：[^3]

```json showLineNumbers title="行为包中的实体定义，节选"
"minecraft:ambient_sound_interval": {
    "event_name": "example:custom_ambient",
    "value": 8,
    "range": 16
}
```

```json showLineNumbers title="sounds.json，节选"
"entities": {
    "example:my_entity": {
        "events": {
            "example:custom_ambient": "example.my_entity.ambient"
        }
    }
}
```

若只想在某个已知时机播放某个音效，不必经过`sounds.json`：[`/playsound`](/docs/docs/commands/all_commands#playsound)命令与[Dimension.playSound](/docs/docs/scripts/sapi/server/dimension/main#playsound-方法)方法直接接受`sound_definitions.json`中的声音定义 ID，何时调用由开发者决定。

#### 变种音效

同一个实体按状态或变种换音效时，用`variants`。`key`是一段 Molang 表达式，求值结果作为`map`的键，据此选用对应的音效定义。

原版猫（<FileType type="file" name="sounds.json"/>）：幼年猫的音高被压低，不同变种也有各自的音效。

```json showLineNumbers title="sounds.json，节选"
"cat": {
    "__molang_version": 13,
    "variants": {
        "key": "query.is_baby ? 'baby' : query.property('minecraft:sound_variant')",
        "map": {
            "baby": {
                "events": {
                    "ambient": { "sound": "mob.baby_cat.ambient", "pitch": 0.5, "volume": 1.0 },
                    "death": { "sound": "mob.baby_cat.death", "pitch": 0.5, "volume": 1.0 }
                }
            }
        }
    }
}
```

`key`先判断是否幼年，是则取`baby`，否则取实体属性`minecraft:sound_variant`的值作为变种名。使用`variants`的原版定义都会同时声明`__molang_version`，该字段的作用未见官方说明。

[^1]: 原版 30 个实体填写了该字段，其中 29 个为`false`，只有`cushion`为`true`。官方文档未收录该字段，具体行为有待验证。

[^2]: 原版客户端实体仍有大量文件沿用旧格式，`1.8.0`与`1.10.0`是其中的两个分界版本，两者在字段上存在差异。本文记录`1.10.0`及更高版本的写法。

[^3]: 官方未说明该字段接受的事件名范围，此处结论由`sounds.json`的查表机制与原版用法推得，未经实测。

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [Entities | bedrock.dev](https://bedrock.dev/docs/stable/Entities)
- [Sounds | Bedrock Wiki](https://wiki.bedrock.dev/concepts/sounds)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
