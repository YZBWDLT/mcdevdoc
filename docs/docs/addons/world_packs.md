---
sidebar_position: 2
---

# 世界启用包文件

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

世界启用包文件用于记录世界启用的附加包。分为两个文件：<FileType type="file" name="world_behavior_packs.json"/>和<FileType type="file" name="world_resource_packs.json"/>，均在世界文件夹的根目录下，在游戏中对世界应用行为包和资源包时，会自动向这两个文件中写入内容。

## 文件路径

<treeview>

- <FileType type="folder" name="（世界文件夹）"/>：
  - <FileType type="folder" name="db"/>：世界数据文件夹
  - <FileType type="folder" name="behavior_packs"/>：世界行为包
  - <FileType type="folder" name="resource_packs"/>：世界资源包
  - <FileType type="file" name="level.dat"/>：世界核心数据文件
  - <FileType type="file" name="level.dat_old"/>：level.dat 的备份文件
  - <FileType type="file" name="levelname.txt"/>：世界名称
  - <FileType type="image" name="world_icon.jpeg"/>：世界图标
  - **<FileType type="file" name="world_behavior_packs.json"/>：世界启用的行为包**
  - **<FileType type="file" name="world_resource_packs.json"/>：世界启用的资源包**

</treeview>

## 参数

两个文件采用的格式为一致的。

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

- <DataType type="array"/>：根数组
  - <DataType type="object"/>：启用的附加包信息
    - <DataType type="string" name="pack_id" isRequired/>：附加包的 UUID。
    - <DataType type="array" name="version" isRequired/>：附加包的版本。
      - <DataType type="int" name="0" isRequired/>：代表主版本号。
      - <DataType type="int" name="1" isRequired/>：代表次版本号。
      - <DataType type="int" name="2" isRequired/>：代表修订版本号。

</treeview>

## 示例

<details>

<summary>世界启用的行为包文件示例</summary>

下面代表启用了两个附加包，从上到下应用。

```json showLineNumbers title="world_behavior_packs.json"
[
    {
        "pack_id": "1bd1439c-3e20-4b6a-b5a4-0180c8006148",
        "version": [ 1, 0, 0 ]
    },
    {
        "pack_id": "ce2905aa-1082-486e-ac78-943035179b84",
        "version": [ 1, 0, 0 ]
    }
]
```

</details>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
