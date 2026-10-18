---
sidebar_position: 6
---

# 实体材质

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Usable from "/src/components/highlight/usable"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

实体材质（Entity Materials）决定实体用哪一套着色器与渲染状态渲染——是否支持透明、是否自发光、是否剔除背面等。材质只影响渲染，不影响服务端行为。

材质名可以是原版材质（如`entity_alphatest`），也可以是资源包中自定义的材质。材质名不带命名空间。

:::warning[注意]

部分原版材质的行为尚不明确，甚至有导致崩溃的风险（例如`entity_alphablend_nocolorentity_static`）。更换材质时建议逐个测试，不要直接套用到成批的实体上。

:::

## 客户端实体中的引用

材质在客户端实体定义的<DataType type="object" name="description" isRequired/>下登记，写成「材质短 ID → 材质名」的形式：

<treeview>

- <DataType type="object" name="materials"/>：实体的材质列表。
    - <DataType type="string" name="(材质短 ID)"/>：该短 ID 使用的材质名。

</treeview>

同一个实体可以登记多个短 ID，供渲染控制器分别取用。苦力怕（<FileType type="file" name="creeper.entity.json"/>）就是一个短 ID 用于本体、另一个用于充能后的外壳：

```json showLineNumbers
"materials": {
    "default": "creeper",
    "charged": "charged_creeper"
}
```

材质短 ID 由开发者自行命名，与材质名无关，只需与引用它的地方保持一致。渲染控制器如何按骨骼选择材质、如何按条件切换，见[渲染控制器](./render_controller)。

## 常用材质

| 材质                            | 说明                                                   | 典型用途                                   |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------ |
| `entity`                        | 完全不透明，剔除背面。                                 | 绝大多数实体。                             |
| `entity_alphatest`              | 按像素判断透明，只支持全透明与完全不透明。             | 有镂空边缘的贴图，如盔甲纹饰、破损的衣物。 |
| `entity_alphablend`             | 支持半透明，可透出后方的内容。                         | 玻璃、幽灵一类需要渐变透明的实体。         |
| `entity_emissive`               | 不受光照影响；Alpha 通道用作自发光强度，整体仍不透明。 | 发光部件，如烈焰人的火焰。                 |
| `entity_emissive_alpha`         | 兼顾自发光与半透明；完全黑色且透明的像素不渲染。       | 半透明的发光体，如灵魂火焰。               |
| `entity_alphatest_change_color` | Alpha 测试，并允许实体的颜色覆盖贴图。                 | 需要染色的实体，如羊、羊驼。               |
| `entity_change_color`           | 完全不透明，并允许实体的颜色覆盖贴图。                 | 同上，但贴图无需镂空。                     |
| `entity_multitexture`           | 支持两张贴图叠加混合。                                 | 需要叠加花纹或多层结构的实体。             |
| `entity_nocull`                 | 不剔除背面，正反两面都会渲染。                         | 披风、旗帜等单层薄片。                     |
| `charged_creeper`               | 自发光并带固定透明度。                                 | 充能苦力怕的外壳。                         |
| `guardian_ghost`                | 守卫者幽灵层的专用材质。                               | 守卫者的幽灵形态。                         |

### 示例

猪（<FileType type="file" name="pig.entity.json"/>）：使用原版为猪定义的材质。

```json showLineNumbers
"materials": {
    "default": "pig"
}
```

自定义实体：为材质的短 ID 指定一个可用的原版材质。

```json showLineNumbers
"materials": {
    "default": "entity_alphatest"
}
```

:::info[提示]

使用半透明贴图时，需要把带透明贴图的元件放在模型元素列表的底部，否则位于其后的元件不会被渲染。

:::

## 自定义材质

材质文件放在资源包的<FileType type="folder" name="materials"/>下，后缀为`.material`，一个文件可定义任意多个材质。实体与粒子均可引用自定义材质，其余元素的材质为硬编码。

:::danger[警告]

**自定义材质风险较高**。材质按名称全局生效：定义与原版同名的材质，会一并改掉所有使用该材质的实体。字段写错时通常不会有明确提示，多数情况只是内容日志中多出一条报错，或者模型不再显示；错误的材质配置也可能导致游戏崩溃。改动前应备份原有文件，确认可用后再实装到作品中。

:::

### 文件位置

<treeview>

- <FileType type="folder" name="materials"/>：材质目录，位于资源包根目录。
    - <FileType type="file" name="common.json"/>：始终加载的材质清单。
    - <FileType type="file" name="fancy.json"/>：开启「精美图像」时加载的材质清单。
    - <FileType type="file" name="sad.json"/>：关闭「精美图像」时加载的材质清单。
    - <FileType type="file" name="entity.material"/>：原版实体材质。自定义的`.material`文件同样放在这个目录下。

</treeview>

材质文件不会自动加载，必须登记在上面三个清单之一，否则整个文件都会被忽略。`common.json`不分画质，进游戏就加载；`fancy.json`与`sad.json`随「设置 → 视频 → 精美图像」开关二选一，开销较大的效果可放入`fancy.json`，低配版本放入`sad.json`。

```json showLineNumbers
[{ "path": "materials/entity.material" }, { "path": "materials/example.material", "+defines": ["FANCY"] }]
```

清单条目除`path`外还可带`+defines`与`-defines`，效果作用于该文件中的所有材质。上例将`example.material`整体标记为精美画质专用。

### 材质文件格式

<treeview>

- <DataType type="object"/>：根对象。
    - <DataType type="object" name="materials" isRequired/>：材质定义列表。
        - <DataType type="string" name="version" isRequired/>：材质文件的格式版本，通常写`1.0.0`。
        - <DataType type="object" name="(材质名)"/>：定义一个材质。写成`(新材质名):(基材质名)`表示继承，只写名字则是全新定义。
            - <DataType type="string" name="vertexShader"/>：顶点着色器路径，相对资源包根目录，如`shaders/entity.vertex`。
            - <DataType type="string" name="fragmentShader"/>：片元着色器路径，如`shaders/entity.fragment`。
            - <DataType type="string" name="geometryShader"/>：几何着色器路径，仅部分平台使用。
            - <DataType type="string" name="vrGeometryShader"/>：VR 几何着色器路径。
            - <DataType type="array" name="defines"/>：覆盖基材质的宏列表。另见[宏](#宏)。
                - <DataType type="string"/>：宏名。
            - <DataType type="array" name="+defines"/>：在基材质的基础上追加宏。
                - <DataType type="string"/>：宏名。
            - <DataType type="array" name="-defines"/>：从基材质中移除宏。
                - <DataType type="string"/>：宏名。
            - <DataType type="array" name="states"/>：覆盖基材质的渲染状态。另见[渲染状态](#渲染状态)。
                - <DataType type="string"/>：状态名。
            - <DataType type="array" name="+states"/>：在基材质的基础上追加渲染状态。
                - <DataType type="string"/>：状态名。
            - <DataType type="array" name="-states"/>：在基材质的基础上删去渲染状态。
                - <DataType type="string"/>：状态名。
            - <DataType type="array" name="samplerStates"/>：覆盖基材质的采样设置。另见[采样设置](#采样设置)。
                - <DataType type="object"/>：一条采样设置。
                    - <DataType type="int" name="samplerIndex"/>：第几张纹理，从`0`开始，最多 8 张。
                    - <DataType type="string" name="textureFilter"/>：过滤方式。默认值为`Point`。
                    - <DataType type="string" name="textureWrap"/>：寻址方式。
            - <DataType type="array" name="+samplerStates"/>：在基材质的基础上追加采样设置。
                - <DataType type="object"/>：一条采样设置，结构同上。
            - <DataType type="array" name="-samplerStates"/>：保留字段，删去功能尚不可用。
            - <DataType type="array" name="vertexFields"/>：传递给着色器的顶点属性。另见[顶点属性](#顶点属性)。
                - <DataType type="object"/>：一条属性。
                    - <DataType type="string" name="field"/>：属性名。
            - <DataType type="array" name="variants"/>：材质变体。声明后实际可用的名称是`(材质名).(变体名)`。
                - <DataType type="object"/>：一个变体。
                    - <DataType type="object" name="(变体名)"/>：变体定义，可写材质支持的全部字段。
            - <DataType type="array" name="-variants"/>：保留字段，删去功能尚不可用。
            - <DataType type="string" name="blendSrc"/>：源混合因子。默认值为`SourceAlpha`。另见[混合因子](#混合因子)。
            - <DataType type="string" name="blendDst"/>：目标混合因子。默认值为`OneMinusSrcAlpha`。另见[混合因子](#混合因子)。
            - <DataType type="string" name="alphaSrc"/>：Alpha 通道的源混合因子。默认值为`One`。另见[混合因子](#混合因子)。
            - <DataType type="string" name="alphaDst"/>：Alpha 通道的目标混合因子。默认值为`OneMinusSrcAlpha`。另见[混合因子](#混合因子)。
            - <DataType type="string" name="depthFunc"/>：深度测试函数。另见[深度测试函数](#深度测试函数)。
            - <DataType type="string" name="msaaSupport"/>：MSAA 支持级别，可选值为`NonMSAA`、`MSAA`、`Both`。默认值为`NonMSAA`。另见[光栅化与图元](#光栅化与图元)。
            - <DataType type="string" name="primitiveMode"/>：图元模式，可选值为`None`、`QuadList`、`TriangleList`、`TriangleStrip`、`LineList`、`Line`。默认值为`TriangleList`。另见[光栅化与图元](#光栅化与图元)。

</treeview>

### 宏

宏（Macro）对应着色器源码中的`#define`。原版以同一份着色器代码配合不同宏，编译出表现各异的多个版本，材质通过`defines`声明采用其中哪一套。着色器里写作：

```text showLineNumbers
#ifdef ALPHA_TEST
    // 启用镂空判断的分支
#else
    // 不做镂空
#endif
```

宏在编译期就展开，不产生运行时分支开销。`defines`、`+defines`、`-defines`三者结构相同，都是字符串数组，区别只在合并方式（覆盖、追加、删去）。可用的宏名如下：

| 宏                     | 作用                                                     |
| ---------------------- | -------------------------------------------------------- |
| `ALPHA_TEST`           | 按像素的透明度决定是否丢弃该像素（镂空）。               |
| `TINTED_ALPHA_TEST`    | 带染色的镂空判断。                                       |
| `USE_EMISSIVE`         | 启用自发光。                                             |
| `USE_ONLY_EMISSIVE`    | 只按自发光渲染，不受光照影响。                           |
| `USE_OVERLAY`          | 启用叠加色，配合渲染控制器的`overlay_color`。            |
| `USE_SKINNING`         | 使用骨骼蒙皮，骨骼模型必用。                             |
| `USE_MULTITEXTURE`     | 使用第二张纹理。                                         |
| `MASKED_MULTITEXTURE`  | 用第二张纹理做遮罩。                                     |
| `COLOR_SECOND_TEXTURE` | 第二张纹理参与颜色计算。                                 |
| `MULTI_COLOR_TINT`     | 多点染色。                                               |
| `MULTIPLICATIVE_TINT`  | 乘法染色。                                               |
| `COLOR_BASED`          | 按顶点色着色。                                           |
| `DISABLE_TINTING`      | 关闭染色。                                               |
| `USE_COLOR_MASK`       | 启用颜色遮罩。                                           |
| `USE_UV_ANIM`          | 启用 UV 动画，配合渲染控制器的`uv_anim`。                |
| `ENABLE_FOG`           | 受雾效影响。                                             |
| `ENABLE_LIGHT`         | 受光照影响。                                             |
| `FANCY`                | 精美画质分支。                                           |
| `GLINT`                | 附魔光效。                                               |
| `ITEM_IN_HAND`         | 手持物品的渲染方式。                                     |
| `NO_TEXTURE`           | 不使用纹理。                                             |
| `UI_ENTITY`            | 在界面中渲染实体。                                       |
| `NETEASE_SKINNING`     | <Usable type="onlyChina" inline/> 网易骨骼模型的蒙皮宏。 |

`NETEASE_SKINNING`把顶点着色器中的蒙皮计算切换到网易骨骼模型：顶点位置与法线改由`BONES_70`常量缓冲配合`BONEID_0`顶点属性驱动，取代原版的`BONES`与`BONE`。该宏仅在中国版可用，且需配合`netease_models.json`中定义的骨骼模型。

:::note[编者注]

宏名为引擎内置的枚举，不存在自定义宏：着色器未按该宏编译，填写后不会产生效果。上表按宏名与常见用法整理，具体行为取决于对应着色器的实现，改动前应查询`entity.material`中原版材质的写法。

:::

### 渲染状态

渲染状态（Render State）是图形管线中与着色器无关的一类开关，控制剔除、深度、颜色写入与混合等绘制行为，相当于在提交绘制前设置对应的图形 API 参数。`states`、`+states`、`-states`三者结构相同，均为字符串数组，区别同样只在合并方式。

| 状态                    | 说明                                                            |
| ----------------------- | --------------------------------------------------------------- |
| `Blending`              | 开启颜色混合，用于半透明。通常要同时指定混合因子。              |
| `DisableCulling`        | 关闭背面剔除，正反两面都会渲染。                                |
| `InvertCulling`         | 反向剔除，只保留背面。                                          |
| `DisableDepthTest`      | 关闭深度测试。                                                  |
| `DisableDepthWrite`     | 不写深度缓冲，半透明物体常需要。                                |
| `DisableColorWrite`     | 不写颜色缓冲，RGBA 都不写。                                     |
| `DisableAlphaWrite`     | 不写 Alpha 通道，RGB 照常写。                                   |
| `DisableRGBWrite`       | <Usable type="onlyChina" inline/> 不写 RGB 通道，Alpha 照常写。 |
| `Wireframe`             | 以线框渲染。                                                    |
| `EnableAlphaToCoverage` | 半透明的顺序无关渲染，仅在支持 MSAA 的环境下有效。              |
| `StencilWrite`          | 开启蒙版写入。                                                  |
| `EnableStencilTest`     | 开启蒙版测试。                                                  |

### 深度测试函数

深度测试决定一个片元能否覆盖屏幕上已有的像素。每个像素除颜色外还记录一个深度值（离相机的距离），绘制新片元时，引擎将其深度与缓冲区中的值按`depthFunc`比较，通过才写入颜色与深度，不通过则丢弃。

可选值沿用 OpenGL 的深度比较语义，「源」指当前正在绘制的片元，「目标」指缓冲区中已有的值：

| 值             | 说明                                           |
| -------------- | ---------------------------------------------- |
| `Less`         | 源深度小于目标深度时通过，即新片元更近才覆盖。 |
| `LessEqual`    | 源深度小于或等于目标深度时通过。               |
| `Equal`        | 源深度等于目标深度时通过。                     |
| `NotEqual`     | 源深度不等于目标深度时通过。                   |
| `Greater`      | 源深度大于目标深度时通过，用于反向深度。       |
| `GreaterEqual` | 源深度大于或等于目标深度时通过。               |
| `Always`       | 总通过，源深度不参与判断。                     |
| `Never`        | 总不通过，等同不渲染该片元。                   |

未指定`depthFunc`时由引擎取默认值，原版绝大多数材质不写该字段，仅在需要特殊效果时覆盖。例如村民的`villager_v2_masked`覆盖为`LessEqual`，使与既有像素等距的片元也能通过，避免遮罩层与本体在共面处闪烁。

`depthFunc`与两个渲染状态容易混淆：

- `depthFunc`决定「怎样的比较算通过」，比较本身仍在进行。
- `DisableDepthTest`关闭整个比较过程，效果近似于`Always`，但语义上是停用深度测试。
- `DisableDepthWrite`照常比较，只是不把深度写回缓冲区。半透明图层依赖这一点，避免遮挡其后的物体。

### 混合因子

混合因子（Blend Factor）决定两个颜色相加时各占多少比例，用于半透明、叠加发光一类效果。`blendSrc`、`blendDst`、`alphaSrc`、`alphaDst`的可选值为：

| 因子                | 含义                    |
| ------------------- | ----------------------- |
| `Zero`              | `(0, 0, 0)`             |
| `One`               | `(1, 1, 1)`             |
| `SourceColor`       | 当前片元的颜色          |
| `DestColor`         | 颜色缓冲中已有的颜色    |
| `SourceAlpha`       | 当前片元的透明度        |
| `DestAlpha`         | 颜色缓冲中已有的透明度  |
| `OneMinusSrcColor`  | `(1, 1, 1)`减去当前颜色 |
| `OneMinusDestColor` | `(1, 1, 1)`减去缓冲颜色 |
| `OneMinusSrcAlpha`  | `1`减去当前透明度       |

渲染时按下面的公式混合：

```text
输出颜色 = 当前片元颜色 × blendSrc + 颜色缓冲颜色 × blendDst
```

### 采样设置

采样设置描述引擎如何从贴图上取颜色，主要包括：纹理被放大或缩小时用何种过滤方式（`textureFilter`），UV 超出`0`–`1`范围时如何取值（`textureWrap`）。一个纹理对应一条设置，`samplerIndex`为客户端实体里贴图的序号，最多 8 张。

`textureFilter`的可选值：

| 值               | 说明                                               |
| ---------------- | -------------------------------------------------- |
| `Point`          | 最近邻采样，纹理放大后保持硬边，亦为默认值。       |
| `Bilinear`       | 双线性采样，放大后平滑，略有模糊。                 |
| `Trilinear`      | 三线性采样，在双线性之上再对 Mip 层之间做过渡。    |
| `MipMapBilinear` | 按 Mip 映射采样。                                  |
| `TexelAA`        | 纹素抗锯齿采样，并非所有设备支持。                 |
| `PCF`            | 通过比较函数采样，用于阴影一类需要比较深度的场合。 |

`textureWrap`的可选值：

| 值               | 说明                                             |
| ---------------- | ------------------------------------------------ |
| `Repeat`         | 重复平铺，UV 对`1`取模，用于需要连续纹理的场合。 |
| `Clamp`          | 钳制到边缘，超出范围时取最近边缘的像素。         |
| `MirroredRepeat` | 镜像重复平铺，当前暂不可用。                     |

### 顶点属性

顶点属性（Vertex Field）是网格每个顶点携带的数据通道。`vertexFields`声明该材质用到的通道，着色器据此取得位置、法线与 UV 等信息。原版材质通常包含`Position`、`Normal`、`UV0`，骨骼模型还需`BoneId0`。

| 属性                | 说明                   |
| ------------------- | ---------------------- |
| `Position`          | 模型空间坐标           |
| `Color`             | 顶点颜色               |
| `Normal`            | 法向                   |
| `Tangent`           | 切向                   |
| `UV0`、`UV1`、`UV2` | 第 0、1、2 张纹理的 UV |
| `BoneId0`           | 第 0 个骨骼的 ID       |
| `PBRTextureIdx`     | PBR 纹理索引           |
| `Mers`              | PBR 纹理的 MERS 值     |
| `PreviousPosition`  | 上一帧的位置           |

### 光栅化与图元

`msaaSupport`与`primitiveMode`控制光栅化阶段的行为。

MSAA（多重采样抗锯齿）在每个像素上取多个采样点计算覆盖率，用于减轻边缘锯齿。该字段声明材质在什么情况下可用：

| 值        | 说明                           |
| --------- | ------------------------------ |
| `NonMSAA` | 仅在关闭 MSAA 时可用，默认值。 |
| `MSAA`    | 仅在开启 MSAA 时可用。         |
| `Both`    | 无论是否开启 MSAA 均可用。     |

`primitiveMode`决定顶点按什么规则组装成图元：

| 值              | 说明                                         |
| --------------- | -------------------------------------------- |
| `TriangleList`  | 每三个顶点构成一个三角形，默认值。           |
| `TriangleStrip` | 每个顶点与前两个顶点构成三角形，数据量更省。 |
| `QuadList`      | 每四个顶点构成一个四边形。                   |
| `LineList`      | 每两个顶点构成一条线段。                     |
| `Line`          | 每个顶点与前一个顶点构成线段，即线段条带。   |
| `None`          | 不渲染。                                     |

### 继承与合并

写成`(新材质名):(基材质名)`时，新材质继承基材质的全部字段，只需写出改动部分。原版`entity.material`里仍然大量使用这种写法（如`villager_v2_masked:entity_multitexture_masked`）。

:::warning[注意]

**格式版本 1.16.100 起，资源包中新增的材质继承会触发内容日志错误**。替代方案是把冒号后的基材质名留空，写成`(材质名):`——不继承任何材质，自己补齐着色器路径与`vertexFields`，本文示例都按这种写法。中国版文档中的示例仍在用继承写法，两版在此处的行为可能不同，国际版请以空基名为准并自行核对游戏日志。另见 [Materials | Bedrock Wiki](https://wiki.bedrock.dev/visuals/materials#_1-16-100-notes)。

:::

多个文件定义同名材质时，后加载的覆盖先加载的。`defines`、`states`、`samplerStates`三者例外，还支持用`+`添加、`-`删除，且顺序固定为「先全部覆盖、再全部添加、最后全部删除」。

### 材质文件示例

半透明材质（完整的材质文件）：开启混合与双向渲染，并关闭深度写入，用于玻璃一类需要透出后方内容的实体。

```json showLineNumbers
{
    "materials": {
        "version": "1.0.0",
        "example_glass:": {
            "vertexShader": "shaders/entity.vertex",
            "fragmentShader": "shaders/entity.fragment",
            "vertexFields": [{ "field": "Position" }, { "field": "BoneId0" }, { "field": "Normal" }, { "field": "UV0" }],
            "+defines": ["USE_SKINNING"],
            "+states": ["Blending", "DisableCulling", "DisableDepthWrite"],
            "blendSrc": "SourceAlpha",
            "blendDst": "OneMinusSrcAlpha",
            "msaaSupport": "Both"
        }
    }
}
```

`DisableDepthWrite`使后面的物体不被这层半透明遮挡，`DisableCulling`保证从内侧也能看到该面。上述状态与混合因子均为渲染参数，不涉及着色器代码，在 Render Dragon 下仍可生效。

自发光材质（只列出材质定义）：沿用原版的着色器，追加一个自发光宏。

```json showLineNumbers
"example_glow:": {
    "vertexShader": "shaders/entity.vertex",
    "fragmentShader": "shaders/entity.fragment",
    "vertexFields": [
        { "field": "Position" },
        { "field": "BoneId0" },
        { "field": "Normal" },
        { "field": "UV0" }
    ],
    "+defines": [ "USE_SKINNING", "USE_ONLY_EMISSIVE" ],
    "msaaSupport": "Both"
}
```

:::note[编者注]

`+defines`能否起作用，取决于着色器是否按该宏编译过。Render Dragon 的着色器是预编译的（打包在`material.bin`里），资源包无法触发重新编译，基岩版开发 Wiki 对此的表述是「Render Dragon 下不可自定义宏定义」。该示例主要用于记录字段写法：自定义宏必然无效，引擎已识别的宏（如`USE_ONLY_EMISSIVE`）是否生效需实测。

:::

自定义着色器（只列出材质定义）：沿用原版的顶点着色器，只替换片元着色器的路径。

```json showLineNumbers
"example_reverse:": {
    "vertexShader": "shaders/entity.vertex",
    "fragmentShader": "shaders/example_reverse.fragment",
    "vertexFields": [
        { "field": "Position" },
        { "field": "BoneId0" },
        { "field": "Normal" },
        { "field": "UV0" }
    ],
    "+defines": [ "USE_SKINNING" ],
    "msaaSupport": "Both"
}
```

:::warning[注意]

**Render Dragon 渲染引擎不再支持自定义着色器**：1.16.200 之后的 Windows 与主机、1.18.30 之后的其他设备都无法加载自行编写的着色器。上例在当前版本下不会生效，此处仅用于说明字段用法。

:::

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [Vanilla Materials | Bedrock Wiki](https://wiki.bedrock.dev/documentation/materials)
- [Materials | Bedrock Wiki](https://wiki.bedrock.dev/visuals/materials)
- [Material Configuration Description | Bedrock Wiki](https://wiki.bedrock.dev/documentation/material-config-description)
- [Bedrock Modeling | Bedrock Wiki](https://wiki.bedrock.dev/visuals/bedrock-modeling)
- [手册:材质 | Minecraft 基岩版开发 Wiki](https://wiki.mcbe-dev.net/p/Manual:%E6%9D%90%E8%B4%A8)
- [材质配置说明 | 我的世界开发者官网](https://mc.163.com/m/dev/mcmanual/mc-dev/mcguide/16-%E7%BE%8E%E6%9C%AF/7-%E6%9D%90%E8%B4%A8%E4%B8%8E%E7%9D%80%E8%89%B2%E5%99%A8/3-%E6%9D%90%E8%B4%A8%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E.html)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
