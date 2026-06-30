---
sidebar_position: 2
---

# 世界启用包文件

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

> 适用版本：国际版 1.21.80，中国版 3.8（1.21.50）。

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
