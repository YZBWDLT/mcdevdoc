---
sidebar_position: 100
---

# 第一章小结

import treeview from '/src/css/treeview.css';
import DataType from "/src/components/DataType"
import FileType from "/src/components/FileType"

在本章，我们学习了附加包的基本概念，并学习了如何构建一个附加包框架并导入到游戏中。我们来回顾一下第一章所学的内容：

## 附加包的概念

- 附加包（Add-ons）是一种受到官方支持的包，主要分为 4 类：行为包、资源包、世界模板、皮肤包。
- 几乎所有的游戏都有服务端（Server）和客户端（Client）。
  - 在 Minecraft，服务端主要负责底层的逻辑和计算。
  - 在 Minecraft，客户端主要负责画面的渲染和绘制。
  - 服务端的卡顿，会造成 TPS 的降低，也就是“高延迟”。
  - 客户端的卡顿，会造成 FPS 的降低，也就是“不流畅”。
- 行为包（Behavior Pack，BP）是一种能够更改世界运行方式的附加包，行为包影响服务端，它定义部分方块、物品、实体，以及各种各样的配方、战利品、交易品的运行方式。
- 资源包（Resource Pack，RP）是一种能够更改游戏界面、世界外观和渲染的附加包。资源包影响客户端，它决定方块、物品、实体如何显示、以及粒子、音效、翻译、界面等如何出现在你的屏幕上。
- 世界模板（World Template）允许你在游戏内基于它创建一张地图。它有版本锁定、设置锁定、便于在游戏内重新创建地图等优点，但是中国版并不支持。
- 皮肤包（Skin Pack）是一类将多个皮肤打包的附加包。但是中国版并不支持。
- 在附加包领域，我们已不再能仅局限于中文 Minecraft Wiki，诸如微软文档、Bedrock Wiki 等文档才是我们编写附加包时应参考的主要文档。

## JSON 语法基础

### JSON 中的数据类型

- **数字**（`number`）：包括整数`int`和浮点数`float`，例如：`3`、`-1`、`1.5`、`0.0`。
  - 虽然 JSON 中并不区分整数和浮点数，但是在实际运用中常常还是要注意区分。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="int" />代表整数，<DataType dataType="float" />代表浮点数。
- **布尔值**（`boolean`）：`true`和`false`。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="boolean" />代表布尔值。
- **字符串**（`string`）：用双引号`"`包裹起来的任意文本。
  - 有一些转义方法，例如`\n`、`\\`、`\"`等在 JSON 中是适用的。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="string" />代表字符串。
- **对象**（`object`）：用花括号（`{}`）包裹起来的**键值对的集合**。
  - **键值对**是由一个**键**（Key）和一个**值**（Value）配对组成的。
    - 格式为`key:value`。
    - `key`必须是一个字符串，代表对象的属性。
    - `value`可以是 JSON 中的任意的数据类型。
  - 键值对之间必须用逗号`,`分隔。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="object" />代表对象。
- **数组**（`array`）：用方括号（`[]`）包裹起来的**值的集合**。
  - 值之间必须用逗号`,`分隔。
  - 本教程和 Minecraft Wiki 中，使用<DataType dataType="array" />代表数组。

### 命令中的 JSON

- 文本组件：由一个对象组成。其中的内容为：
  <div class="treeview">
  - <DataType dataType="object" />：根对象
    - <DataType dataType="array" name="rawtext" isRequired />：代表一个原始 JSON 文本，允许以下 4 种组件。至少应指定一种组件。
      - <DataType dataType="object" />：代表一个普通文本组件（Text）。
        - <DataType dataType="string" name="text" isRequired />：显示为写入的文本。
      - <DataType dataType="object" />：代表一个选择器文本组件（Selector）。
        - <DataType dataType="string" name="selector" isRequired />：填入目标选择器。显示为符合选择器的实体的名称。
      - <DataType dataType="object" />：代表一个分数文本组件（Score）。
        - <DataType dataType="object" name="score" isRequired />：显示为特定目标的分数。
          - <DataType dataType="string" name="objective" isRequired />：填入该目标的记分项。
          - <DataType dataType="string" name="name" isRequired />：填入该目标的名称或特定的目标选择器。
      - <DataType dataType="object" />：代表一个翻译文本组件（Translate）。
        - <DataType dataType="string" name="translate" isRequired />：要翻译的文本或翻译的键名。
        - <DataType dataType="array" name="with" />：（写法 1）代入的格式化文本。
        - <DataType dataType="object" name="with" />：（写法 2）代入的格式化文本。
          - <DataType dataType="array" name="rawtext" isRequired />：代表一个原始 JSON 文本。允许以上 4 种组件。至少应指定一种组件。
            - ……
  </div>
  - 但事实上，文本组件的 JSON 语法树要更复杂一些。更通用的情况可见[文本组件 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/文本组件#基岩版)。
- 物品组件：由一个对象组成。其中允许的内容为：
  <div class="treeview">
  - <DataType dataType="object" />：根对象，允许以下 4 种组件，至少应指定一种。
    - <DataType dataType="object" name="can_place_on" />：可放置到的方块。可添加`minecraft:`命名空间。
      - <DataType dataType="array" name="blocks" isRequired />
        - <DataType dataType="string" isRequired />：填入方块 ID，代表物品可放置到的方块。
    - <DataType dataType="object" name="can_destroy" />：可破坏的方块。可添加`minecraft:`命名空间。
      - <DataType dataType="array" name="blocks" isRequired />
        - <DataType dataType="string" isRequired />：填入方块 ID，代表物品可破坏的方块。
    - <DataType dataType="object" name="item_lock" />：物品锁定方法。可添加`minecraft:`命名空间。
      - <DataType dataType="string" name="mode" isRequired />：仅允许`"lock_in_inventory"`、`"lock_in_slot"`，表示物品锁定方法
    - <DataType dataType="object" name="keep_on_death" />：物品在死亡后保留。可添加`minecraft:`命名空间。
  </div>

### 常见错误

- 丢逗号或多逗号
- 丢括号或多括号
- 概念混淆，在对象中写为值的集合或在数组中写为键值对的集合
- 中文符号问题，误将`"`打为`“`或`,`打为`，`等

## 常用的文本编辑器

通常，我们都使用 VSC（Visual Studio Code）来进行 Minecraft 基岩版的开发。同时，还要装一些必备的插件，学习一些常用的快捷方式和文件管理器的必要配置。详情见 [1.3.1](./c3_addon_framework/d1_ide)。

## 清单文件

清单文件相当于附加包的“身份证”，是游戏识别我们编写的附加包的关键的一环。其语法结构如下。更完整的语法结构可见[附加包文档：清单文件](/docs/docs/addons/manifest)。

<div class="treeview">

- <DataType dataType="object"/>：根对象
  - <DataType dataType="int" name="format_version" isRequired/>：清单文件的格式版本。**强烈建议为`2`，非必要不要改动。**
  - <DataType dataType="object" name="header" isRequired/>：包的公开基本信息，包括包名、包描述、包 UUID 等。
    - <DataType dataType="string" name="name" isRequired/>：包的名称。
    - <DataType dataType="string" name="description"/>：包的描述。建议简短而清晰，不要写得过长。
    - <DataType dataType="string" name="uuid" isRequired/>：包的 UUID。表示包的唯一识别码，是 Minecraft 识别包与其他包不同的关键信息，应与其他包区分开。  
      格式为`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`，其中每一个`x`均为十六进制数（`0-9`或`a-f`）。建议使用随机 UUID 生成器以有效地与其他包区分开来。
    - <DataType dataType="array" name="version" isRequired/>：包的版本。
      - <DataType dataType="int" name="0" isRequired/>：代表主版本号。通常主版本号应为`1`或更高的值。
      - <DataType dataType="int" name="1" isRequired/>：代表次版本号。
      - <DataType dataType="int" name="2" isRequired/>：代表修订版本号。
    - <DataType dataType="array" name="min_engine_version" isRequired/>：包的最小引擎版本。规定使用此附加包至少需要使用何种版本的 Minecraft，并决定了游戏对包的向下兼容能力。
      - <DataType dataType="int" name="0" isRequired/>：写为`1`，代表 Minecraft 的主版本号。
      - <DataType dataType="int" name="1" isRequired/>：代表 Minecraft 的次版本号。
      - <DataType dataType="int" name="2" isRequired/>：代表 Minecraft 的修订版本号。
  - <DataType dataType="array" name="modules" isRequired/>：包会应用的功能模块。至少应指定一个模块。
    - <DataType dataType="object" isRequired/>：指代一个或多个模块。
      - <DataType dataType="string" name="type" isRequired/>：模块会使用的功能。仅限填写为下面的值，并规定包为对应的类型。
        <!-- markdownlint-disable MD058 -->
        | `type`的值 | 包类型 |
        | :---: | :---: |
        | `"data"` | 行为包 |
        | `"resources"` | 资源包 |
        | `"world_template"` | 地图模板 |
        | `"skin_pack"` | 皮肤包 |
        <!-- markdownlint-enable MD058 -->
      - <DataType dataType="string" name="uuid" isRequired/>：模块的 UUID。格式要求同`header`。不宜和`header`的 UUID 相同。
      - <DataType dataType="array" name="version" isRequired/>：模块的版本。
        - <DataType dataType="int" name="0" isRequired/>：代表主版本号。通常主版本号应为`1`或更高的值。
        - <DataType dataType="int" name="1" isRequired/>：代表次版本号。
        - <DataType dataType="int" name="2" isRequired/>：代表修订版本号。
  - <DataType dataType="array" name="dependencies"/>：包依赖的其他包。只有这些包安装后，本包才能正常启用。指定该字段时，至少应指定一个依赖的附加包或脚本模块。
    - <DataType dataType="object"/>：指代要依赖的附加包。依赖其他附加包时接受以下参数。
      - <DataType dataType="string" name="uuid" isRequired/>：依赖包的 UUID。为依赖包在`header`中所定义的 UUID。
      - <DataType dataType="array" name="version" isRequired/>：依赖包的版本。为依赖包在`header`中所定义的版本。
        - <DataType dataType="int" name="0" isRequired/>：代表主版本号。通常主版本号应为`1`或更高的值。
        - <DataType dataType="int" name="1" isRequired/>：代表次版本号。
        - <DataType dataType="int" name="2" isRequired/>：代表修订版本号。
  - <DataType dataType="object" name="metadata"/>：包有关的元数据（例如作者、许可信息等）。
    - <DataType dataType="array" name="authors"/>：本包的作者。
      - <DataType dataType="string" isRequired/>：作者昵称。
    - <DataType dataType="string" name="license"/>：本包采用的协议。
    - <DataType dataType="object" name="generated_with"/>：本包的清单文件等文件使用哪个（些）软件自动生成。
      - <DataType dataType="array" name="(软件名)" isRequired/>：使用的软件版本。通常由该软件自行生成。
        - <DataType dataType="string" isRequired/>：指代使用到的软件版本。通常由该软件自行生成。
    - <DataType dataType="string" name="product_type"/>：本包的类型。设置此参数时，行为包不再影响成就的获取。仅限填写为`"addon"`。
    - <DataType dataType="string" name="url"/>：网站。通常链接到作者的个人网站或公司的公司网站。

<br/></div>

## 创建并导入第一个附加包

- 游戏数据文件夹：是保存游戏核心数据的文件夹。不同版本、不同平台，都有不同的游戏数据存储路径。
  - 国际版（Windows）：`%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang`
  - 国际版（Android）：`Android/data/com.mojang.minecraftpe/files/games/com.mojang/`
    - 因 Android 限制，这个路径通常难以访问。
  - 中国版（Windows）：`%appdata%\MinecraftPE_Netease`
  - 中国版（Android）：`Android/data/com.netease.(渠道名，官方渠道为x19)/files/`
    - 因 Android 限制，这个路径通常难以访问。
- 导入附加包的方法：
  - 直接导入法：
    - 仅适用于国际版。这种方法导入的附加包是全局和地图均可用的。
    - 如果开发纯附加包类型的资源（即不依托特定地图应用），推荐这种方法。
    - 直接在<FileType fileType="folder" name="com.mojang"/>下的<FileType fileType="folder" name="development_behavior_packs"/>和<FileType fileType="folder" name="development_resource_packs"/>中导入包。
    - 示例：
      <div class="treeview">
      - <FileType fileType="folder" name="com.mojang"/>
        - <FileType fileType="folder" name="development_behavior_packs"/>：开发行为包文件夹
          - **<FileType fileType="folder" name="BP_test"/>：测试行为包**
            - <FileType fileType="file" name="manifest.json"/>：行为包的清单文件
            - <FileType fileType="image" name="pack_icon.png"/>：行为包的图标文件
        - <FileType fileType="folder" name="development_resource_packs"/>：开发资源包文件夹
          - **<FileType fileType="folder" name="RP_test"/>：测试资源包**
            - <FileType fileType="file" name="manifest.json"/>：资源包的清单文件
            - <FileType fileType="image" name="pack_icon.png"/>：资源包的图标文件
      <br/></div>
  - 特定地图导入法（强制导入法）：
    - 国际版与中国版均适用。这种导入方法仅适用于特定地图。
    - 如果开发地图类型的资源，推荐这种方法。
    - 直接在<FileType fileType="folder" name="minecraftWorld"/>下的世界文件夹中，在<FileType fileType="folder" name="behavior_packs"/>和<FileType fileType="folder" name="resource_packs"/>中导入包。
    - 示例：
      <div class="treeview">
      - <FileType fileType="folder" name="com.mojang"/>（在中国版，Windows 平台为<FileType fileType="folder" name="MinecraftPE_Netease"/>，Android 平台为<FileType fileType="folder" name="files"/>）
        - <FileType fileType="folder" name="minecraftWorlds"/>
          - <FileType fileType="folder" name="（地图文件夹）"/>
            - <FileType fileType="folder" name="behavior_packs"/>：地图的行为包
              - **<FileType fileType="folder" name="BP_test"/>：测试行为包**
                - <FileType fileType="file" name="manifest.json"/>：清单文件
                - <FileType fileType="image" name="pack_icon.png"/>：图标
            - <FileType fileType="folder" name="resource_packs"/>：地图的资源包
              - **<FileType fileType="folder" name="RP_test"/>：测试资源包**
                - <FileType fileType="file" name="manifest.json"/>：清单文件
                - <FileType fileType="image" name="pack_icon.png"/>：图标
            - ……
            - <FileType fileType="file" name="world_behavior_packs.json"/>：地图启用的行为包
            - <FileType fileType="file" name="world_resource_packs.json"/>：地图启用的资源包
      <br/></div>
    - 在国际版游戏内，直接在游戏内的地图设置中启用导入的包。
    - 在中国版或者 BDS 等没有 UI 的地方，直接更改<FileType fileType="file" name="world_behavior_packs.json"/>和<FileType fileType="file" name="world_resource_packs.json"/>来强制导入包，即强制导入法。
  - 打包导入法：
    - 仅适用于国际版。这种导入方法是全局和地图均可用的。
    - 对于无法访问游戏数据路径的开发者来说，这种方法可能比较好用（虽然日后导出地图可能也是个问题）。
    - 但对于普通玩家来说，却是最常见且最简单的导入方法。
    - 方法是，将行为包和资源包文件夹压缩到一个`.zip`文件中，并改后缀为`.mcaddon`。然后，双击该文件（Windows）或“以文本形式打开 - Minecraft”（Android）导入。

做附加包开发的话，使用电脑和 VSC 会使得我们的开发变得易上手许多，所以如果读者有条件的话，请尽可能地在电脑上进行开发。虽然手机上也可以做，但确实门槛稍高，而且处处都充满了不便。在未来的教程中，我们就不再强调手机与电脑上编程的差异了（因为差异基本都体现在环境和编辑软件上）。
