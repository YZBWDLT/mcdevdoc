---
sidebar_position: 1
---

# 清单文件

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"

清单文件为附加包根目录中的`manifest.json`，它描述附加包的基本信息，决定 Minecraft 如何识别这个附加包的功能。

:::info[本文更新时间]

本文于 2025 年 5 月 23 日更新，中国版最新版本为 1.20.50，国际版最新版本为 1.21.80。

:::

## 参数

:::info[标记示意]

参数左侧的图案决定该参数的数据类型。这个图案机制在 Minecraft Wiki 中也广泛应用。分别如下：

- <DataType type="object"/>：代表一个对象。例如：<DataType type="object" name="param"/>代表`"param"`的值是一个对象`{...}`。
- <DataType type="array"/>：代表一个数组。例如：<DataType type="array" name="param"/>代表`"param"`的值是一个数组`[...]`。
  - 若在数组中声明了数字，则代表对应索引的类型。例如<DataType type="array" name="0"/>，代表索引`0`的类型是数组。
- <DataType type="int"/>：代表一个整数。例如：<DataType type="int" name="param"/>代表`"param"`的值是整数。
- <DataType type="float"/>：代表一个浮点数。例如：<DataType type="float" name="param"/>代表`"param"`的值是浮点数。
- <DataType type="string"/>：代表一个字符串。例如：<DataType type="string" name="param"/>代表`"param"`的值是字符串。
- <DataType type="boolean"/>：代表一个布尔值。例如：<DataType type="boolean" name="param"/>代表`"param"`的值是布尔值。

关于可选参数和必选参数：

- 参数右上角标星号的，且参数本身被粗体表示的，代表该参数为必选参数。例如：<DataType type="object" name="param" isRequired/>。
- 参数右上角不标星号的，代表该参数为可选参数。例如：<DataType type="object" name="param"/>。
  - 若可选参数下存在必选参数，则代表在指定该可选参数后必须指定这个（些）必选参数。

:::

<treeview>

- <DataType type="object"/>：根对象
  - <DataType type="int" name="format_version" isRequired/>：清单文件的格式版本。**强烈建议为`2`，非必要不要改动。**
  - <DataType type="object" name="header" isRequired/>：包的公开基本信息，包括包名、包描述、包 UUID 等。
    - <DataType type="string" name="name" isRequired/>：包的名称。
    - <DataType type="string" name="description"/>：包的描述。建议简短而清晰，不要写得过长。
    - <DataType type="string" name="uuid" isRequired/>：包的 UUID。表示包的唯一识别码，是 Minecraft 识别包与其他包不同的关键信息，应与其他包区分开。  
      格式为`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`，其中每一个`x`均为十六进制数（`0-9`或`a-f`）。建议使用随机 UUID 生成器以有效地与其他包区分开来。
    - <DataType type="array" name="version" isRequired/>：包的版本。
      - <DataType type="int" name="0" isRequired/>：代表主版本号。通常主版本号应为`1`或更高的值。
      - <DataType type="int" name="1" isRequired/>：代表次版本号。
      - <DataType type="int" name="2" isRequired/>：代表修订版本号。
    - <DataType type="string" name="version" isRequired/>：（替代写法）包的版本。应为 [SemVer](https://semver.org/) 约定的版本格式的字符串。
    - <DataType type="array" name="min_engine_version" isRequired/>：（仅限**行为包和资源包**有意义）包的最小引擎版本。规定使用此附加包至少需要使用何种版本的 Minecraft，并决定了游戏对包的向下兼容能力。  
      `format_version`会影响该值的解析。详见[清单文件 - 基岩版开发文档](https://www.mcbe-dev.net/addons/data-driven/general/manifest.html)。
      - <DataType type="int" name="0" isRequired/>：写为`1`，代表 Minecraft 的主版本号。
      - <DataType type="int" name="1" isRequired/>：代表 Minecraft 的次版本号。
      - <DataType type="int" name="2" isRequired/>：代表 Minecraft 的修订版本号。
    - <DataType type="string" name="pack_scope"/>：（仅限**资源包**有意义）包是否在全局可用，若为`"world"`则仅限地图内可用。仅限填写为`"world"`或`"any"`，默认为`"any"`。
    - <DataType type="array" name="base_game_version" isRequired/>：（仅限**地图模板**有意义）包的基游戏版本。规定使用此附加包使用何版本下的 Minecraft 的特性。通常用于给地图“锁版本”。
      - <DataType type="int" name="0" isRequired/>：写为`1`，代表 Minecraft 的主版本号。
      - <DataType type="int" name="1" isRequired/>：代表 Minecraft 的次版本号。
      - <DataType type="int" name="2" isRequired/>：代表 Minecraft 的修订版本号。
    - <DataType type="boolean" name="allow_random_seed"/>：包是否在每次生成地图的时候随机选择种子，或允许玩家自定义种子。
    - <DataType type="boolean" name="lock_template_options" isRequired/>：（仅限**地图模板**有意义）包是否锁定地图设置，阻止玩家更改。
  - <DataType type="array" name="modules" isRequired/>：包会应用的功能模块。至少应指定一个模块。
    - <DataType type="object" isRequired/>：指代一个或多个模块。
      - <DataType type="string" name="type" isRequired/>：模块会使用的功能。仅限填写为下面的值，并规定包为对应的类型。
        <!-- markdownlint-disable MD058 -->
        | `type`的值 | 包类型 |
        | :---: | :---: |
        | `"data"` | 行为包 |
        | `"resources"` | 资源包 |
        | `"world_template"` | 地图模板 |
        | `"skin_pack"` | 皮肤包 |
        | `"script"` | 会使用到脚本功能，通常结合`data`模块使用 |
        <!-- markdownlint-enable MD058 -->
      - <DataType type="string" name="uuid" isRequired/>：模块的 UUID。格式要求同`header`。不宜和`header`的 UUID 相同。
      - <DataType type="array" name="version" isRequired/>：模块的版本。
        - <DataType type="int" name="0" isRequired/>：代表主版本号。通常主版本号应为`1`或更高的值。
        - <DataType type="int" name="1" isRequired/>：代表次版本号。
        - <DataType type="int" name="2" isRequired/>：代表修订版本号。
      - <DataType type="string" name="description"/>：模块的描述。
      - <DataType type="string" name="language"/>：（仅限**使用`script`类型的模块**时有意义）模块使用的编程语言。仅限填写为`"javascript"`。
      - <DataType type="string" name="entry"/>：（仅限**使用`script`类型的模块**时有意义）脚本的入口文件。
  - <DataType type="array" name="dependencies"/>：包依赖的其他包。只有这些包安装后，本包才能正常启用。指定该字段时，至少应指定一个依赖的附加包或脚本模块。
    - <DataType type="object"/>：指代要依赖的附加包。依赖其他附加包时接受以下参数。
      - <DataType type="string" name="uuid" isRequired/>：依赖包的 UUID。为依赖包在`header`中所定义的 UUID。
      - <DataType type="array" name="version" isRequired/>：依赖包的版本。为依赖包在`header`中所定义的版本。
        - <DataType type="int" name="0" isRequired/>：代表主版本号。通常主版本号应为`1`或更高的值。
        - <DataType type="int" name="1" isRequired/>：代表次版本号。
        - <DataType type="int" name="2" isRequired/>：代表修订版本号。
      - <DataType type="string" name="version" isRequired/>：（替代写法）包的版本。应为 [SemVer](https://semver.org/) 约定的版本格式的字符串。
    - <DataType type="object"/>：指代要依赖的脚本模块。依赖脚本模块时接受以下参数。
      - <DataType type="string" name="module_name" isRequired/>：调用的脚本模块。例如：`@minecraft/server`。
      - <DataType type="string" name="version" isRequired/>：调用的脚本模块所使用的版本，应为 [SemVer](https://semver.org/) 约定的版本格式的字符串。
  - <DataType type="object" name="metadata"/>：包有关的元数据（例如作者、许可信息等）。
    - <DataType type="array" name="authors"/>：本包的作者。
      - <DataType type="string" isRequired/>：作者昵称。
    - <DataType type="string" name="license"/>：本包采用的协议。
    - <DataType type="object" name="generated_with"/>：本包的清单文件等文件使用哪个（些）软件自动生成。
      - <DataType type="array" name="(软件名)" isRequired/>：使用的软件版本。通常由该软件自行生成。
        - <DataType type="string" isRequired/>：指代使用到的软件版本。通常由该软件自行生成。
    - <DataType type="string" name="product_type"/>：本包的类型。设置此参数时，行为包不再影响成就的获取。仅限填写为`"addon"`。
    - <DataType type="string" name="url"/>：网站。通常链接到作者的个人网站或公司的公司网站。
  - <DataType type="array" name="subpack"/>：包的子包设置。玩家可以通过设置包以应用不同的设定。运用于资源包[^1]。
    - <DataType type="object"/>：子包设置
      - <DataType type="string" name="folder_name" isRequired/>：子包的包名，Minecraft 将会应用`RP/subpacks/(folder_name)`下的文件。
      - <DataType type="string" name="name" isRequired/>：子包的设置名，Minecraft 将会在资源包设置中显示该设置的名称，以使玩家了解其正在实用的设置。
      - <DataType type="int" name="memory_tier"/>：子包的内存需求，在选中此设置后将需要额外分配的内存。每一级都需要额外的 256MB 的内存。
  - <DataType type="array" name="capabilities"/>：包将会额外影响的 Minecraft 游戏特性。
    - <DataType type="string" isRequired/>：包会影响的特性。仅限填写为下面的值，并规定包影响的游戏特性。
      <!-- markdownlint-disable MD058 -->
      | 允许值 | 包影响的特性 |
      | :---: | :---: |
      | `"chemistry"` | 添加、移除或影响化学用品的行为。 |
      | `"editorExtension"` | 会影响 Minecraft 编辑器的插件。 |
      | `"experimental_custom_ui"` | 包可以使用 HTML 文件来创建、使用或修改自定义 UI。 |
      | `"raytraced"` | 包使用光线追踪的功能，并可能使用自定义着色器。 |
      <!-- markdownlint-enable MD058 -->

</treeview>

[^1]: 是否可以运用到行为包有待验证。

---

## 示例

<details>

<summary>行为包清单文件模板（最简）</summary>

```json showLineNumbers title="manifest.json"
{
    "format_version": 2,
    "header": {
        "name": "(包名)",
        "description": "(包描述)",
        "uuid": "(uuid1)",
        "version": [ 1, 0, 0 ],
        "min_engine_version": [ 1, 20, 50 ]
    },
    "modules": [
        {
            "type": "data",
            "uuid": "(uuid2)",
            "version": [ 1, 0, 0 ]
        }
    ]
}
```

</details>

<details>

<summary>资源包清单文件模板（最简）</summary>

```json showLineNumbers title="manifest.json"
{
    "format_version": 2,
    "header": {
        "name": "(包名)",
        "description": "(包描述)",
        "uuid": "(uuid1)",
        "version": [ 1, 0, 0 ],
        "min_engine_version": [ 1, 20, 50 ]
    },
    "modules": [
        {
            "type": "resources",
            "uuid": "(uuid2)",
            "version": [ 1, 0, 0 ]
        }
    ]
}
```

</details>

<details>

<summary>地图模板清单文件模板（最简）</summary>

```json showLineNumbers title="manifest.json"
{
    "format_version": 2,
    "header": {
        "name": "(包名)",
        "description": "(包描述)",
        "uuid": "(uuid1)",
        "version": [ 1, 0, 0 ],
        "base_game_version": [ 1, 20, 50 ],
        "lock_template_options": true
    },
    "modules": [
        {
            "type": "world_template",
            "uuid": "(uuid2)",
            "version": [ 1, 0, 0 ]
        }
    ]
}
```

</details>

<details>

<summary>示例：启用了依赖项的行为包清单文件</summary>

```json showLineNumbers title="manifest.json"
{
    "format_version": 2,
    "header": {
        "name": "依赖项测试包",
        "description": "一个启用了依赖其他资源包的行为包",
        "uuid": "e7a3f199-6505-4398-baf7-8ba15bca441a",
        "version": [ 1, 0, 0 ],
        "min_engine_version": [ 1, 20, 50 ]
    },
    "modules": [
        {
            "type": "data",
            "uuid": "fd6e3abd-7160-439b-85ba-b208914c78ca",
            "version": [ 1, 0, 0 ]
        }
    ],
    "dependencies": [
        {
            "uuid": "714dc36a-1308-4d94-a67c-2c60cb580862",
            "version": [ 1, 0, 0 ]
        }
    ]
}
```

</details>

<details>

<summary>示例：启用了脚本的行为包清单文件</summary>

```json showLineNumbers title="manifest.json"
{
    "format_version": 2,
    "header": {
        "name": "脚本测试包",
        "description": "一个启用了脚本的行为包",
        "uuid": "cbf56a50-81b1-4835-b1f9-bfdbc37d0dd7",
        "version": [ 1, 0, 0 ],
        "min_engine_version": [ 1, 20, 50 ]
    },
    "modules": [
        {
            "type": "data",
            "uuid": "47eaf802-9d96-4537-b320-09908df6557d",
            "version": [ 1, 0, 0 ]
        },
        {
            "type": "script",
            "uuid": "b915ee94-62b9-453f-8571-9715b022bb04",
            "version": [ 1, 0, 0 ],
            "entry": "scripts/main.js",
            "language": "javascript"
        }
    ],
    "dependencies": [
        {
            "module_name": "@minecraft/server",
            "version": "1.7.0"
        }
    ]
}
```

</details>

<details>

<summary>示例：启用了元数据的行为包清单文件</summary>

```json showLineNumbers title="manifest.json"
{
    "format_version": 2,
    "header": {
        "name": "元数据测试包",
        "description": "一个启用了作者信息记录的行为包",
        "uuid": "fbf600e2-a00f-4905-8d10-e04a1bdacbde",
        "version": [ 1, 0, 0 ],
        "min_engine_version": [ 1, 20, 50 ]
    },
    "modules": [
        {
            "type": "data",
            "uuid": "d5d2004c-2db3-4833-88ce-fff05f9099eb",
            "version": [ 1, 0, 0 ]
        }
    ],
    "metadata": {
        "authors": [ "YZBWDLT" ],
        "url": "https://docs.nekoawa.com",
        "license": "cc-by-nc-sa 4.0",
        "product_type": "addon"
    }
}
```

</details>

## 参考资料

- [包清单 JSON - 微软文档](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/packmanifest?view=minecraft-bedrock-stable)
- [清单文件 - 基岩版开发文档](https://www.mcbe-dev.net/addons/data-driven/general/manifest.html)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
