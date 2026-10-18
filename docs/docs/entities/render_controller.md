---
sidebar_position: 8
---

# 渲染控制器

import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import '/src/css/treeview.css';

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

渲染控制器（Render Controller）决定客户端实体用哪套模型、材质与贴图渲染，以及在什么条件下切换。

渲染控制器本身不含资源，只按短 ID 取用[客户端实体](./description#资源包配置)中已声明的模型、材质与贴图。模型与材质本身的写法分别见[实体模型](./model)与[实体材质](./material)。

一个客户端实体可以挂多个渲染控制器，按`render_controllers`数组的顺序依次叠加渲染。各字段都可以填写 [Molang 表达式](./molang)，可用的查询见[与实体有关的 Molang 查询函数](./molang)。

## 渲染控制器文件格式

渲染控制器文件放在资源包的<FileType type="folder" name="render_controllers"/>下，后缀为`.json`。

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="string" name="format_version" isRequired/>：格式版本。
    - <DataType type="object" name="render_controllers" isRequired/>：渲染控制器列表。
        - <DataType type="object" name="(控制器 ID)"/>：定义一个渲染控制器，ID 习惯以`controller.render.`开头。
            - <DataType type="object" name="arrays"/>：可由 Molang 索引的资源数组。另见[数组](#数组)。
                - <DataType type="object" name="geometries"/>：模型数组，元素为`Geometry.(短 ID)`。
                    - <DataType type="array" name="(数组名)"/>：数组名习惯以`Array.`开头。
                - <DataType type="object" name="materials"/>：材质数组，元素为`Material.(短 ID)`。
                    - <DataType type="array" name="(数组名)"/>：同上。
                - <DataType type="object" name="textures"/>：贴图数组，元素为`Texture.(短 ID)`。
                    - <DataType type="array" name="(数组名)"/>：同上。
            - <DataType type="string" name="geometry" isRequired/>：使用的模型，可写`Geometry.(短 ID)`、`Array.(数组名)[(索引)]`或 Molang 表达式。只能指定一个模型，模型本身的写法见[实体模型](./model)。
            - <DataType type="array" name="materials"/>：材质映射。另见[材质映射](#材质映射)。
                - <DataType type="object"/>：一条映射，键为骨骼名或通配，值为`Material.(短 ID)`，也可填 Molang 表达式。
            - <DataType type="array" name="textures"/>：贴图层，按书写顺序从下往上叠加。
                - <DataType type="string"/>：一层贴图，可写`Texture.(短 ID)`、`Array.(数组名)[(索引)]`或 Molang 表达式。
            - <DataType type="array" name="part_visibility"/>：骨骼可见性。另见[部件可见性](#部件可见性)。
                - <DataType type="object"/>：一条规则，键为骨骼名或通配，值为`boolean`或 Molang 表达式。
            - <DataType type="object" name="color"/>：整体染色，由`r`、`g`、`b`、`a`四个分量构成，各分量可填 Molang 表达式。另见[颜色与贴图动画](#颜色与贴图动画)。
            - <DataType type="object" name="overlay_color"/>：叠加色，结构同上。常用于受伤闪光、充能一类效果。另见[颜色与贴图动画](#颜色与贴图动画)。
            - <DataType type="object" name="is_hurt_color"/>：受伤时叠加的颜色，结构同上。另见[颜色与贴图动画](#颜色与贴图动画)。
            - <DataType type="object" name="on_fire_color"/>：<Version add="1.10.0" inline/>[^1] 着火时叠加的颜色，结构同上。另见[颜色与贴图动画](#颜色与贴图动画)。
            - <DataType type="object" name="uv_anim"/>：随时间移动的贴图 UV。另见[颜色与贴图动画](#颜色与贴图动画)。
                - <DataType type="array" name="offset"/>：UV 偏移，由 2 个 Molang 表达式构成，分别对应 U 与 V。
                - <DataType type="array" name="scale"/>：UV 缩放，同样由 2 个 Molang 表达式构成。
            - <DataType type="boolean" name="ignore_lighting"/>：为`true`时忽略环境光照，始终以最大亮度渲染。
            - <DataType type="boolean" name="filter_lighting"/>：<Version add="1.10.0" inline/>[^1] 为`true`时过滤环境光照，原版用于物品形态与投影物。
            - <DataType type="float" name="light_color_multiplier"/>：环境光照的颜色乘数，可填 Molang 表达式。
            - <DataType type="boolean" name="rebuild_animation_matrices"/>：为`true`时重建动画矩阵。具体影响未见官方说明。

</treeview>

[^1]: 有待验证。暂时没有官方文档表明`on_fire_color`和`filter_lighting`是`1.10.0`或更高版本可用，而仅仅是推断。官方 schema 只收录到`render_controller:1.8.0`，`1.10.0`的差异没有正式文档说明。

## 短 ID

客户端实体把要用的资源登记为若干短 ID，渲染控制器再用「前缀 + 短 ID」取用。三类前缀分别对应客户端实体中的三个字段：

| 前缀        | 客户端实体中的字段 | 值指向                                |
| ----------- | ------------------ | ------------------------------------- |
| `Geometry.` | `geometry`         | 模型标识符，如`geometry.pig`          |
| `Texture.`  | `textures`         | 贴图路径，从`textures/`开始且不带后缀 |
| `Material.` | `materials`        | 材质名，如`entity_alphatest`          |

短 ID 只是文件内部使用的名称，与资源本身的标识符无关，也不要求带命名空间。同一个名称可以在三类中各登记一次，互不冲突（原版几乎每个客户端实体都同时拥有`geometry.default`、`textures.default`与`materials.default`）。下面是一个最简的登记方式：

```json showLineNumbers title="客户端实体，节选"
"materials": { "(材质短 ID)": "entity_alphatest" },
"textures": { "(贴图短 ID)": "textures/entity/example" },
"geometry": { "(模型短 ID)": "geometry.example" }
```

而渲染控制器中需要分别写作`Geometry.(模型短 ID)`、`Texture.(贴图短 ID)`与`Material.(材质短 ID)`：

```json showLineNumbers title="渲染控制器，节选"
"geometry": "Geometry.(模型短 ID)",
"materials": [ { "*": "Material.(材质短 ID)" } ],
"textures": [ "Texture.(贴图短 ID)" ]
```

同一客户端实体的所有渲染控制器共用这套短 ID，多个控制器可以引用同一个`default`。三类短 ID 的登记方法与字段含义，分别见[实体模型](./model#客户端实体中的引用)与[实体材质](./material#客户端实体中的引用)。

## 数组

`arrays`把同一类资源的多个短 ID 收进一个有序数组，渲染时再按下标取其中一个，用于在一组模型、材质或贴图之间动态选择。它有三个子容器，与三类前缀一一对应：

- `geometries`：元素为`Geometry.(短 ID)`。
- `materials`：元素为`Material.(短 ID)`。
- `textures`：元素为`Texture.(短 ID)`。

数组名习惯以`Array.`开头，引用时写作`Array.(数组名)[(索引)]`。索引从`0`开始，取`0`得到第一个元素；布尔值可以直接用作索引，`false`取`0`、`true`取`1`。索引也可以是任意 Molang 表达式，因此可以直接用变种编号、[实体属性](./property)一类随时变化的值来选择资源。

### 示例

1. 蜘蛛（<FileType type="file" name="spider.render_controllers.json"/>）准备了正常与隐形两套材质，由隐身状态决定用哪一套。数组放在`materials`下，引用时同样写`Array.(数组名)[(索引)]`：

    ```json showLineNumbers title="spider.render_controllers.json，节选"
    "arrays": {
        "materials": {
            "Array.materials": [ "Material.default", "Material.invisible" ]
        }
    },
    "geometry": "Geometry.default",
    "materials": [ { "*": "Array.materials[query.is_invisible]" } ],
    "textures": [ "Texture.default" ]
    ```

    `Array.materials`的两个元素都是材质短 ID，[`query.is_invisible`](./molang#身份与状态)返回布尔值，未隐身时取`0`用`Material.default`，隐身时取`1`用`Material.invisible`。

2. 狼（<FileType type="file" name="wolf.render_controllers.json"/>）的数组更多：按是否愤怒、是否驯服分成三组，每组再按变种编号（[`query.variant`](./molang#身份与状态)）取贴图（每个数组原版有 9 项，此处各保留前三个）：

    ```json showLineNumbers title="wolf.render_controllers.json，节选"
    "arrays": {
        "textures": {
            "Array.default": [ "Texture.pale_default", "Texture.ashen_default", "Texture.black_default" ],
            "Array.angry": [ "Texture.pale_angry", "Texture.ashen_angry", "Texture.black_angry" ],
            "Array.tame": [ "Texture.pale_tame", "Texture.ashen_tame", "Texture.black_tame" ]
        }
    },
    "geometry": "Geometry.default",
    "materials": [ { "*": "Material.default" } ],
    "textures": [
        "query.is_angry ? Array.angry[query.variant] : (query.is_tamed ? Array.tame[query.variant] : Array.default[query.variant])"
    ]
    ```

    三个索引都取自经常变化的值，贴图会随变种、愤怒与驯服状态自动切换。

## 材质映射

`materials`的每一项是一个「骨骼名 → `Material.(短 ID)`」的对象。短 ID 能对应哪些材质名、各有什么效果，见[实体材质](./material)。键有三种写法：

- `*`：匹配全部骨骼，原版一律写在第一条作为默认。
- 具体骨骼名：如`head`。
- 带`*`的通配：`head*`匹配以`head`开头的骨骼，`*leg`匹配以`leg`结尾的骨骼，`*saddle*`匹配名称中含`saddle`的骨骼。

值除了写固定的`Material.(短 ID)`，也可以写 Molang 表达式，按条件在几种材质之间切换。

### 示例

1. 烈焰人（<FileType type="file" name="blaze.render_controllers.json"/>）用`*`把全部骨骼设为`Material.body`，再用`head`覆盖头部。

    ```json showLineNumbers title="blaze.render_controllers.json"
    "materials": [
        { "*": "Material.body" },
        { "head": "Material.head" }
    ]
    ```

    :::warning[注意]

    列表按顺序应用，**后面的规则会覆盖前面的**。因此`*`必须写在最前面作为默认值，写在后面会把前面所有具体规则一并覆盖掉。

    :::

2. 雪傀儡（<FileType type="file" name="snow_golem.render_controllers.json"/>）的南瓜头用另一套材质：短 ID 为`head`，对应材质`snow_golem_pumpkin`；身体用的是短 ID`default`，对应`snow_golem`。它用`head*`匹配所有以`head`开头的骨骼：

    ```json showLineNumbers title="snow_golem.render_controllers.json"
    "materials": [
        { "*": "Material.default" },
        { "head*": "Material.head" }
    ]
    ```

3. 美西螈（<FileType type="file" name="axolotl.render_controllers.json"/>）的四肢用另一套材质：短 ID 为`limbs`，对应材质`axolotl_limbs`。模型中的四条肢体名为`left_arm`、`right_arm`、`left_leg`、`right_leg`，因此`*arm`与`*leg`刚好匹配前后肢各两条：

    ```json showLineNumbers title="axolotl.render_controllers.json"
    "materials": [
        { "*": "Material.default" },
        { "*arm": "Material.limbs" },
        { "*leg": "Material.limbs" }
    ]
    ```

## 部件可见性

`part_visibility`按骨骼控制部件是否渲染，作用于本控制器所选模型中的骨骼。每项是一个「骨骼名 → 布尔或 Molang」的对象，值为`false`或返回`0`时该骨骼不渲染；未列入的骨骼保持可见。键的写法与`materials`相同，顺序上也一样，即后面的条目覆盖前面的。

键中的骨骼名必须与[实体模型](./model#模型文件格式)中定义的骨骼完全一致。

> **备注**：原版在需要隐藏整条骨骼链时一律用前缀通配，而不是只写父骨骼名，据此判断子骨骼不会随父骨骼一起隐藏；这一点官方文档未作说明，上述判断来自原版用例。

### 示例

1. 铜傀儡（<FileType type="file" name="copper_golem.render_controllers.json"/>）的花单独用一个控制器渲染，这里有两层原因。

    花是可选外观：铜傀儡会自己捡起花戴在身上，玩家也可以用剪刀把花剪下，有无花记录在实体属性`minecraft:has_flower`中。该属性在实体定义里声明了`client_sync`（见[实体属性](./property)），客户端才读得到它，所以这里能直接用[`query.property`](./molang#实体属性)读取该属性的值。

    它的客户端实体同时挂了三个控制器，花、本体、眼睛依次叠加：

    ```json showLineNumbers title="copper_golem.entity.json"
    "render_controllers": [
        "controller.render.copper_golem_flower",
        "controller.render.copper_golem",
        "controller.render.copper_golem_eyes"
    ]
    ```

    花用的是独立模型`geometry.copper_golem.flower`，以及与本体不同的材质和贴图。这个模型为了对齐位置，保留了本体的`root`、`body`、`head`、`right_arm`等骨骼，真正新增的只有`flower`一根。若不先把其余骨骼关掉，它们会被这个控制器再画一遍，与本体控制器叠加后出现重复渲染。因此先用`{"*": "false"}`关闭全部，再单独打开花：

    ```json showLineNumbers title="copper_golem.render_controllers.json"
    "part_visibility": [
        { "*": "false" },
        { "flower": "query.property('minecraft:has_flower')" }
    ]
    ```

    `"false"`以字符串形式书写，作为 Molang 表达式求值为`0`；属性为`false`时整个控制器不产出任何可见内容，花随之消失。

2. 犰狳（<FileType type="file" name="armadillo.render_controllers.json"/>）靠一个布尔变量在完全展开与缩壳两套骨骼之间切换：

    ```json showLineNumbers title="armadillo.render_controllers.json"
    "part_visibility": [
        { "body": "!variable.use_rolled_up_model" },
        { "tail": "!variable.use_rolled_up_model" },
        { "left_hind_leg": "!variable.use_rolled_up_model" },
        { "right_hind_leg": "!variable.use_rolled_up_model" },
        { "body_rolled_up": "variable.use_rolled_up_model" }
    ]
    ```

3. 马（<FileType type="file" name="horse_v3.render_controllers.json"/>）用前缀通配一次处理整条骨骼链，其中鞍、辔头由[`query.is_saddled`](./molang#身份与状态)控制，缰绳还要求有[骑乘者](./molang#骑乘与从属)（`query.has_rider`）：

    ```json showLineNumbers title="horse_v3.render_controllers.json"
    "part_visibility": [
        { "Saddle": "query.is_saddled" },
        { "Bit*": "query.is_saddled" },
        { "Bridle": "query.is_saddled" },
        { "Reins*": "query.is_saddled && query.has_rider" },
        { "Bag*": false },
        { "MuleEar*": false }
    ]
    ```

## 颜色与贴图动画

`color`、`overlay_color`、`is_hurt_color`与`on_fire_color`结构相同，都是`r`、`g`、`b`、`a`四个分量，各自可填 Molang 表达式，也允许只写其中几个。

- `color`：整体染色，通常配合可染色的材质使用，如`entity_change_color`（见[实体材质](./material)）。
- `overlay_color`：叠加色，常用于充能、闪光一类效果。
- `is_hurt_color`、`on_fire_color`：受伤与着火时的叠加色。

`uv_anim`让贴图 UV 随时间滚动或缩放，`offset`与`scale`各由 2 个值构成，分别对应 U 与 V。`offset`的单位是 UV 比例，`1.0`相当于整张贴图宽或高。

### 示例

1. 苦力怕（<FileType type="file" name="creeper.render_controllers.json"/>）在引信闪烁时叠一层白，其余时间保持原色。三元表达式成立时取`this`，表示该分量沿用原本的颜色值；不成立时`r`、`g`、`b`取`1.0`、`a`取`0.5`，叠上一层半透明白光。

    若想关掉某种状态的染色，把`a`设为`0.0`即可——披风（<FileType type="file" name="cape.render_controllers.json"/>）与火球（<FileType type="file" name="fireball.render_controllers.json"/>）就是这么做的。

    ```json showLineNumbers title="creeper.render_controllers.json"
    "overlay_color": {
        "r": "((variable.flash == 0.0) || (query.swelling_dir < 0.0)) ? this : 1.0",
        "g": "((variable.flash == 0.0) || (query.swelling_dir < 0.0)) ? this : 1.0",
        "b": "((variable.flash == 0.0) || (query.swelling_dir < 0.0)) ? this : 1.0",
        "a": "((variable.flash == 0.0) || (query.swelling_dir < 0.0)) ? this : 0.5"
    }
    ```

2. 充能苦力怕外壳（<FileType type="file" name="creeper_armor.render_controllers.json"/>）在充能时滚动贴图，做出电流流动的效果。[`query.life_time`](./molang#动画与渲染)与[`query.frame_alpha`](./molang#动画与渲染)配合，把时间量化到每刻一格，于是贴图一格格跳动而非连续滑动。旋风人的风场贴图用了同类写法，只是系数取`0.02`。

    ```json showLineNumbers title="creeper_armor.render_controllers.json，节选"
    "uv_anim": {
        "offset": [
            "(query.is_powered) ? (Math.floor(query.life_time * 20.0) + query.frame_alpha) * 0.01 : 0.0",
            "(query.is_powered) ? (Math.floor(query.life_time * 20.0) + query.frame_alpha) * 0.01 : 0.0"
        ],
        "scale": [ 1.0, 1.0 ]
    }
    ```

## 光照与动画矩阵

- `ignore_lighting`：忽略环境光照，始终以最大亮度渲染。悦灵、恼鬼、监守者与充能苦力怕外壳都用它，避免实体在暗处发黑。
- `light_color_multiplier`：环境光照的颜色乘数。充能苦力怕外壳取`0.5`压暗，旋风人的风场取`1.8`提亮，风弹取`1.6`。
- `filter_lighting`：为`true`时过滤环境光照，原版用在箭、蛋、经验瓶、投掷药水、烟花火箭等 9 个渲染控制器上，都是物品形态与投影物。

> `ignore_lighting`与`filter_lighting`名字相近，但原版实例中的分工明确：前者让实体自身不被环境光压暗，后者用于物品形态与投影物。然而，两者的具体差别，官方文档与 Bedrock Wiki 都没有说明。

`rebuild_animation_matrices`为`true`时重建动画矩阵，原版用在玩家、村民一家、沼骸、流髑与披风上，实际作用同样未见官方说明。

## 在客户端实体中引用

`render_controllers`是一个数组，可以直接写控制器 ID，也可以写带 Molang 条件的对象：

```json showLineNumbers title="creeper.entity.json，节选"
"render_controllers": [
    "controller.render.creeper",
    { "controller.render.creeper_armor": "query.is_powered" }
]
```

字符串无条件挂载，对象则以键为控制器 ID、值为 Molang 条件——条件成立时才挂载。苦力怕（<FileType type="file" name="creeper.entity.json"/>）本体始终渲染，外壳只在[`query.is_powered`](./molang#身份与状态)成立时叠加，靠的就是数组中的这一项。

从原版用例看，数组中靠后的控制器渲染在上层，因此外壳能覆盖在本体之上。若把两者拆开各自引用，也可以按需分别开关。

## 示例

猪（<FileType type="file" name="pig.render_controllers.json"/>）：最简的完整渲染控制器，用布尔值索引贴图数组。

```json showLineNumbers
{
    "format_version": "1.8.0",
    "render_controllers": {
        "controller.render.pig": {
            "arrays": {
                "textures": {
                    "Array.skins": ["Texture.default", "Texture.saddled"]
                }
            },
            "geometry": "Geometry.default",
            "materials": [{ "*": "Material.default" }],
            "textures": ["Array.skins[query.is_saddled]"]
        }
    }
}
```

`query.is_saddled`返回布尔值，未上鞍时取`0`用`Texture.default`，上鞍后取`1`用`Texture.saddled`，省去了写条件表达式。

绵羊（<FileType type="file" name="sheep.v2.render_controllers.json"/>）：幼年换模型，同时按是否被剪毛换贴图。

```json showLineNumbers
{
    "format_version": "1.8.0",
    "render_controllers": {
        "controller.render.sheep.v2": {
            "arrays": {
                "geometries": {
                    "Array.geos": ["Geometry.default", "Geometry.sheared"]
                }
            },
            "geometry": "query.is_baby ? Geometry.baby : Array.geos[query.is_sheared]",
            "materials": [{ "*": "Material.default" }],
            "textures": ["query.is_baby ? Texture.baby : Texture.default"]
        }
    }
}
```

条件表达式可以嵌套：先判断是否幼年，再在数组里按是否被剪毛取模型。

马（<FileType type="file" name="horse_v3.render_controllers.json"/>）：三层贴图叠加，分别为底色、花纹与盔甲（数组内容有删节）。

```json showLineNumbers
"arrays": {
    "textures": {
        "Array.base": [ "Texture.base_white", "Texture.base_chestnut", "Texture.base_black" ],
        "Array.markings": [ "Texture.markings_none", "Texture.markings_white" ],
        "Array.armor": [ "Texture.armor_none", "Texture.armor_iron", "Texture.armor_diamond" ]
    }
},
"geometry": "Geometry.default",
"materials": [ { "*": "Material.default" } ],
"textures": [
    "Array.base[query.variant]",
    "Array.markings[query.mark_variant]",
    "Array.armor[variable.armor_texture_slot]"
]
```

三层贴图按书写顺序从下往上叠加，上层贴图的透明像素会露出下层。这样只改花纹就不用重画整套底色。

自定义实体：先在客户端实体中声明三组短 ID，再由渲染控制器引用。

```json showLineNumbers
"materials": { "default": "entity_alphatest" },
"textures": { "default": "textures/entity/example" },
"geometry": { "default": "geometry.example" },
"render_controllers": [ "controller.render.example" ]
```

```json showLineNumbers
{
    "format_version": "1.8.0",
    "render_controllers": {
        "controller.render.example": {
            "geometry": "Geometry.default",
            "materials": [{ "*": "Material.default" }],
            "textures": ["Texture.default"]
        }
    }
}
```

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [Render Controllers | Bedrock Wiki](https://wiki.bedrock.dev/entities/render-controllers)
- [Schemas | bedrock.dev](https://bedrock.dev/docs/1.18.0.0/1.18.10.4/Schemas)
- [Entity Modeling and Animation | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/entitymodelingandanimation?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
