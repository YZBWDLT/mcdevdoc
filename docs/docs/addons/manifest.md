---
sidebar_position: 1
---

# 清单文件

清单文件为附加包根目录中的`manifest.json`，它描述附加包的基本信息，决定 Minecraft 如何识别这个附加包的功能。

:::info[本文更新时间]

本文于 2025 年 5 月 21 日更新，中国版最新版本为 1.20.50，国际版最新版本为 1.21.80。

:::

## 参数

| 名称 | 类型 | 默认值[^1] | 描述 | 备注 |
| :---: | :---: | :---: | --- | --- |
| `format_version` | 整数 | 必填 | 清单文件的格式版本。 | 强烈建议为`2`。非必要不改动。 |
| `header` | 对象 | 必填，见[`header`](#header) | 包的公开基本信息，包括包名、包描述、包 UUID 等。 | |
| `modules` | 数组 | 必填，见[`modules`](#modules) | 包会应用的功能模块。 | |
| `dependencies` | 数组 | 必填，见[`dependencies`](#dependencies) | 包依赖的其他包。只有这些包安装后，本包才能正常启用。 | |

[^1]: 默认值代表该参数可以不填写，若不填写时将采用的值。若为“必填”，则该参数必须存在且必须手动填写。

<details>

<summary>示例</summary>

```json
{
    "format_version": 2,
    "header": {...},
    "modules": [...]
}
```

</details>

### `header`

`header`是一个对象，接受的参数如下表所示。

| 名称 | 类型 | 默认值[^1] | 描述 | 备注 |
| :---: | :---: | :---: | --- | --- |
| `name` | 字符串 | 必填 | 包的名称。 | |
| `description` | 字符串 | 必填 | 包的描述。 | 建议简短而清晰，不要写得过长。 |
| `uuid` | 字符串 | 必填 | 包的 UUID。表示包的唯一识别码，是 Minecraft 识别包与其他包不同的关键信息，应与其他包区分开。格式为`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`，其中每一个`x`均为十六进制数（`0-9`或`a-f`）。 | 建议使用随机 UUID 生成器以有效地与其他包区分开来。 |
| `version` | 整数数组`[主版本号, 次版本号, 修订版本号]`或 [SemVer](https://semver.org/) 字符串 | 必填 | 包的版本。 | 通常使用整数数组。通常主版本号应为`1`或更高的值。 |
| `min_engine_version` | 整数数组`[ 1, 次版本号, 修订版本号]` | 必填（仅限行为包或资源包） | 包的最小引擎版本。规定使用此附加包至少需要使用何种版本的 Minecraft，并决定了游戏对包的向下兼容能力。 | `format_version`会影响该值的解析。详见[清单文件 - 基岩版开发文档](https://www.mcbe-dev.net/addons/data-driven/general/manifest.html)。 |
| `pack_scope` | `"world"`或`"any"` | `"any"` | 包是否在全局可用，若为`"world"`则仅限地图内可用。 | 仅限资源包可用。 |
| `base_game_version` | 整数数组`[ 1, 次版本号, 修订版本号]` | 必填（仅限地图模板） | 包的基游戏版本。规定使用此附加包使用何版本下的 Minecraft 的特性。 | 仅限地图模板可用。通常用于给地图“锁版本”。 |
| `allow_random_seed` | 布尔值 | `false`[^2] | 包是否在每次生成地图的时候随机选择种子，或允许玩家自定义种子。 | 仅限地图模板可用。 |
| `lock_template_options` | 布尔值 | 必填（仅限地图模板） | 包是否锁定地图设置，阻止玩家更改。 | 仅限地图模板可用。 |

[^2]: 需要验证。

<details>

<summary>示例（针对行为包和资源包）</summary>

```json
"header": {
    "name": "包名",
    "description": "这是一段包的简单描述。",
    "uuid": "1df1d582-4389-4f70-a107-41949bb8f155",
    "version": [ 1, 0, 0 ],
    "min_engine_version": [ 1, 20, 50 ],
    "pack_scope": false
}
```

</details>

<details>

<summary>示例（针对地图模板）</summary>

```json
"header": {
    "name": "世界名",
    "description": "这是一段世界的简单描述。",
    "uuid": "18d48c0c-2122-4e7d-9e20-5ee7c914c512",
    "version": [ 1, 0, 0 ],
    "base_game_version": [ 1, 20, 50 ],
    "lock_template_options": true,
    "allow_random_seed": false
}
```

</details>

### `modules`

`modules`是一个数组，接受一个或多个以对象表示的功能模块，每个模块对象的接受值如下表所示。

| 名称 | 类型 | 默认值[^1] | 描述 | 备注 |
| :---: | :---: | :---: | --- | --- |
| `type` | `"data"`、<br/>`"resources"`、<br/>`"world_template"`、<br/>`"skin_pack"`、<br/>`"script"` | 必填 | 模块会使用的功能。写入下面的值时，会规定包为对应的类型。<br/>**·** `"data"`：行为包。<br/>**·** `"resources"`：资源包。<br/>**·** `"world_template"`：世界模板。<br/>**·** `"skin_pack"`：皮肤包。<br/>**·** `"script"`：会使用到脚本功能，通常结合`data`模块使用。 | |
| `uuid` | 字符串 | 必填 | 模块的 UUID。格式要求同`header`。 | 不宜和`header`的 UUID 相同。 |
| `version` | 整数数组`[主版本号, 次版本号, 修订版本号]` | 必填 | 模块的版本。 | |
| `description` | 字符串 | `""` | 模块的描述。 | |
| `language` | `"javascript"` | `"javascript"` | 模块会使用的编程语言。 | 仅限使用`script`类型的模块时有意义。 |
| `entry` | 字符串 | 必填 | 脚本的入口文件。 | 仅限使用`script`类型的模块时有意义。 |

<details>

<summary>示例（行为包）</summary>

```json
"modules": [
    {
        "type": "data",
        "uuid": "d9849849-f48f-403b-927f-c85d6091ea3e",
        "version": [ 1, 0, 0 ],
        "description": "这是一个行为包"
    }
]
```

</details>

<details>

<summary>示例（启用了脚本的行为包）</summary>

```json
"modules": [
    {
        "type": "data",
        "uuid": "aa808c75-f852-442a-a9c6-9b5692f4a07a",
        "version": [ 1, 0, 0 ],
        "description": "这是一个启用了脚本的行为包"
    },
    {
        "type": "script",
        "uuid": "b915ee94-62b9-453f-8571-9715b022bb04",
        "version": [ 1, 0, 0 ],
        "description": "这是启用的脚本",
        "entry": "scripts/main.js",
        "language": "javascript"
    },
]
```

</details>

### `dependencies`

`dependencies`是一个数组，接受一个或多个以对象表示的依赖包，每个依赖包对象的接受值如下表所示。

#### 当依赖其他附加包时

| 名称 | 类型 | 默认值[^1] | 描述 | 备注 |
| :---: | :---: | :---: | --- | --- |
| `uuid` | 字符串 | 必填 | 依赖包的 UUID。为依赖包在`header`中所定义的 UUID。 | |
| `version` | 整数数组`[主版本号, 次版本号, 修订版本号]`或 [SemVer](https://semver.org/) 字符串 | 必填 | 依赖包的版本。为依赖包在`header`中所定义的版本。 | |

#### 当依赖脚本模块时

:::warning[版本适用性警告]

因为中国版移除了 ScriptAPI 的功能，所以在中国版调用脚本模块时，将不会有任何意义。

:::

| 名称 | 类型 | 默认值[^1] | 描述 | 备注 |
| :---: | :---: | :---: | --- | --- |
| `module_name` | 字符串 | 必填 | 调用的脚本模块。例如：`@minecraft/server`。 | |
| `version` | [SemVer](https://semver.org/) 字符串 | 必填 | 调用的脚本模块所使用的版本 | |

---

## 示例

## 参考资料

- [包清单 JSON - 微软文档](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/packmanifest?view=minecraft-bedrock-stable)
- [清单文件 - 基岩版开发文档](https://www.mcbe-dev.net/addons/data-driven/general/manifest.html)
