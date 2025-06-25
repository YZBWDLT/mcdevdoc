---
sidebar_position: 2
---

# 方块组件

收录所有已开放或即将开放的命名空间为`minecraft`和`netease`的方块组件信息。

你可以使用<kbd>Ctrl</kbd>+<kbd>F</kbd>来查找你需要的条目。

:::info[本文更新时间]

本文于 2025 年 6 月 26 日更新，中国版最新版本为 1.21.0，国际版最新版本为 1.21.90。

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import Version from "/src/components/highlight/version"
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

:::note[组件可用性提示]

1. 标签记号说明：

    - 标注了<Version isLowVersion/>的组件，代表其为**旧版国际版组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。`format_version`必须指定`1.10.0`~`1.16.0`以内时才可使用。

    - 标注了<Version version="版本号"/>的组件，代表其为**新版国际版组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。其中，`（版本号）`代表方块定义的`format_version`必须指定为该版本号或更高才可使用。

    - 标注了<Version isChinaVersion/>的组件，代表其为**中国版组件**，可应用于**中国版方块定义**（在行为包<FileType type="folder" name="netease_blocks"/>定义的方块）。

    - 标注了<Version isBeta/>的组件，代表其为**实验性玩法组件**，可应用于**国际版方块定义**（在行为包<FileType type="folder" name="blocks"/>定义的方块）。本文档不记载已被移除的实验性玩法组件（尤其是假日创作者功能的组件）。开发者在使用这些组件的时候应当万分小心，因为它们随时可能会被移除，这会导致你的资源的关键功能失效。

    - **注意：中国版可以同时使用国际版方块定义和中国版方块定义，但是国际版只能使用国际版方块定义**。

2. 如果官方文档中有记载，以上这些标签将会链接到官方文档。

:::

---
