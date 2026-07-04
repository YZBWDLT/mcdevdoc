---
sidebar_position: 4
---

# 物品

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/scriptVersion"
import Button from '/src/components/button/base';

本文主要记录物品相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 物品堆叠

### ItemStack 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.ItemStack.html"/>

#### 属性

- <Highlight text="只读" inline/> <Version add="2.1.0" inline/> localizationKey: string，物品在语言文件中的键名。

---

## 物品组件

以下接口为物品组件，物品组件代表物品的独有功能。

### ItemDyeableComponent 类

<Version add="2.1.0"/>

物品可染色组件。

另见：*[`minecraft:dyeable`](/docs/docs/items/components#minecraftdyeable)物品组件*。

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.ItemDyeableComponent.html"/>

---

## 容器

### Container 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.Container.html"/>

#### contains 方法

<Version add="2.1.0"/>

#### ​firstEmptySlot 方法

<Version add="2.1.0"/>

#### ​firstItem 方法

<Version add="2.1.0"/>

#### ​find 方法

<Version add="2.1.0"/>

#### ​findLast 方法

<Version add="2.1.0"/>

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
