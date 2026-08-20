---
sidebar_position: 1
---

# 数据驱动实体

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from "/src/components/highlight/base"
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

> 适用版本：国际版 26.40，中国版 3.9（1.21.120）。

数据驱动实体（Data-Driven Blocks，简称数驱实体）是由开发者给定数据，由游戏引擎自行注册的实体。

数驱实体由行为包和资源包组成。国际版和中国版均可编写数驱实体，两者的编写流程完全相同。

## 文件架构

<treeview>

- <FileType type="folder" name="behavior_packs"/>
  - <FileType type="folder" name="entities"/>：服务端实体定义
    - <FileType type="file" name="(实体 ID).server_entity.json"/>：实体定义
- <FileType type="folder" name="resource_packs"/>
  - <FileType type="folder" name="entity"/>：客户端实体定义
    - <FileType type="file" name="(实体 ID).client_entity.json"/>：实体定义

</treeview>

## 行为包配置

### 行为包定义格式

以下为 <FileType type="folder" name="behavior_packs"/> - <FileType type="folder" name="entities"/> - <FileType type="file" name="(实体 ID).server_entity.json"/> 的结构。

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定实体可用的功能。填写版本取决于目标版本，如果是低于 26.0 的版本（1.xx.yy）填写为`1.xx.y0`，高于 26.0 的版本（xx.yy）填写为`1.xx.y0`。
  - <DataType type="object" name="minecraft:entity" isRequired/>：定义数驱实体。
    - <DataType type="object" name="description" isRequired/>：实体描述，定义实体的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义实体的命名空间和实体 ID。
      - <DataType type="boolean" name="is_summonable"/>：实体是否可通过`/summon`命令等方法召唤。默认值为`false`。
      - <DataType type="boolean" name="is_spawnable"/>：是否要为实体注册一个刷怪蛋。默认值为`false`。
      - <DataType type="object" name="scripts"/>：定义实体的行为包脚本。另见[动画与动画控制器](./animations)。
      - <DataType type="object" name="animations"/>：定义实体的行为包动画。另见[动画与动画控制器](./animations)。
      - <DataType type="object" name="entity_version"/>：<Version add="1.26.30" inline/> 定义实体的版本控制。另见[实体版本](./entity_version)。
      - <DataType type="object" name="properties"/>：定义实体的实体属性。另见[实体属性](./property)。
      - <DataType type="string" name="runtime_identifier"/>：定义实体的运行时 ID。该属性允许实体使用类似于原版相关实体的行为。
      - <DataType type="string" name="spawn_category"/>：<Version add="1.20.80" tooltip="实际加入版本存疑。" inline/> 定义实体的生成类别，该类别会影响实体的自然生成上限。可选值为`ambient`、`axolotls`、`creature`、`misc`、`monster`、`underground_water_creature`、`water_ambient`、`water_creature`。
    - <DataType type="object" name="components" isRequired/>：实体组件，定义实体的功能。
      - `minecraft:(component)`：实体组件，可用的实体组件见[数据驱动实体组件](./components)。
    - <DataType type="object" name="events"/>：实体事件，定义实体在触发相关事件之后会调用的组件组、或执行的功能等。另见[实体事件](./events)。
    - <DataType type="object" name="component_groups"/>：实体组件组，可通过实体事件加减的组件。
      - <DataType type="object" name="(组件组 ID)"/>：实体组件组使用的组件。
        - `minecraft:(component)`：实体组件，可用的实体组件见[数据驱动实体组件](./components)。
    - <DataType type="object" name="upgrades"/>：<Version add="1.26.30" inline/> 实体更新事件，定义实体更新之后会调用的组件组、或执行的功能等。另见[实体事件](./events)。

</treeview>

## 资源包配置

### 资源包定义格式

以下为 <FileType type="folder" name="resource_packs"/> - <FileType type="folder" name="entity"/> - <FileType type="file" name="(实体 ID).client_entity.json"/> 的结构。

:::info[注意]

格式版本`1.8.0`与格式版本`1.10.0`及更高版本的定义有一些细微的区别，本文记录`1.10.0`及更高版本的定义格式。

:::

<treeview>

- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定该文件采用何种版本的方法解析。填写版本取决于目标版本，如果是低于 26.0 的版本（1.xx.yy）填写为`1.xx.y0`，高于 26.0 的版本（xx.yy）填写为`1.xx.y0`。
  - <DataType type="object" name="minecraft:client_entity" isRequired/>：定义数驱客户端实体。
    - <DataType type="object" name="description" isRequired/>：实体描述，定义实体的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义实体的命名空间和实体 ID。
      - <DataType type="array" name="render_controllers"/>：定义实体使用的[渲染控制器](#渲染控制器)。若不指定，则实体不会正常渲染。
        - <DataType type="string"/>：渲染控制器的 ID。
      - <DataType type="object" name="materials"/>：定义实体的材质列表。
        - <DataType type="string" name="(材质短 ID)"/>：定义实体使用的材质。`材质短 ID`应与在渲染控制器中定义的`material.(材质短 ID)`一一对应。另见[实体材质](./material)。
      - <DataType type="object" name="geometry"/>：定义实体的模型列表。
        - <DataType type="string" name="(模型短 ID)"/>：定义实体使用的模型，应指定为模型长 ID。`模型短 ID`应与在渲染控制器中定义的`geometry.(模型短 ID)`一一对应。另见[实体模型](./geometry)。
      - <DataType type="object" name="textures"/>：定义实体的贴图列表。
        - <DataType type="string" name="(贴图短 ID)"/>：定义实体使用的贴图路径，从`textures/`开始，不带后缀（例：`textures/entity/steve`）。`贴图短 ID`应与在渲染控制器中定义的`texture.(贴图短 ID)`一一对应。
      - <DataType type="object" name="particle_effects"/>：定义实体的粒子列表。
        - <DataType type="string" name="(粒子短 ID)"/>：定义实体使用的粒子，应指定为粒子发射器文件定义的粒子长 ID。`粒子短 ID`应与在[动画与动画控制器](./animations)中定义的`粒子短 ID`一一对应。
      - <DataType type="object" name="sound_effects"/>：定义实体的音效列表。
        - <DataType type="string" name="(音效短 ID)"/>：定义实体使用的音效，应指定为音效文件定义的音效长 ID。`音效短 ID`应与在[动画与动画控制器](./animations)中定义的`音效短 ID`一一对应。
      - <DataType type="object" name="spawn_egg"/>：（写法 1，旧版刷怪蛋贴图定义）定义实体的刷怪蛋贴图。
        - <DataType type="string" name="base_color"/>：刷怪蛋的基底颜色。应指定为 16 进制的颜色代码（`#XXXXXX`）。
        - <DataType type="string" name="overlay_color"/>：刷怪蛋的斑点颜色。应指定为 16 进制的颜色代码（`#XXXXXX`）。
      - <DataType type="object" name="spawn_egg"/>：（写法 2，新版刷怪蛋贴图定义）定义实体的刷怪蛋贴图。
        - <DataType type="string" name="texture"/>：刷怪蛋使用的贴图。应指定为[`item_texture.json`](/docs/docs/items/description#item_texturejson)定义的`短 ID`。
        - <DataType type="string" name="texture_index"/>：使用该贴图中的第几个索引。默认值为`0`。
      - <DataType type="object" name="scripts"/>：定义实体的脚本。另见[动画与动画控制器](./animations)。
      - <DataType type="object" name="animations"/>：定义实体的动画。另见[动画与动画控制器](./animations)。
      - <DataType type="boolean" name="enable_attachables"/>：是否为实体启用附着物。默认值为`false`。
      - <DataType type="boolean" name="held_item_ignores_lighting"/>：实体手持物品是否忽略环境光照，若忽略（`true`）则以全亮度渲染手持物品。默认值为`false`。
      - <DataType type="float" name="held_item_scale"/>：<Version add="1.26.10" inline/> 实体手持物品放大多少倍渲染。默认值为`1.0`。
      - <DataType type="boolean" name="hide_armor"/>：是否隐藏实体的盔甲。默认值为`false`。
      - <DataType type="string" name="min_engine_version"/>：定义实体文件使用的最小引擎格式版本，主要用于对旧版的实体文件提供支持。有关该版本的说明，见 [bedrock.dev](https://bedrock.dev/docs/stable/Entities#min_engine_version)。

</treeview>

### 渲染控制器

### `sounds.json`

---

## 参考文档

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
