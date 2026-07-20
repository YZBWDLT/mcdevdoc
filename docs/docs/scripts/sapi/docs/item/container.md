---
sidebar_position: 3
---

# 容器

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import Optional from "/src/components/highlight/optional"

本文主要记录容器相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

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

## 容器槽位

### ContainerSlot 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.ContainerSlot.html"/>

#### getRawLore 方法

<Version add="2.2.0"/>

#### setLore 方法

为特定槽位设置物品备注。

```typescript
setLore(loreList?: (string | RawMessage)[]): void
```

- <Optional/> loreList: (string | [RawMessage](/docs/docs/scripts/sapi/docs/general#rawmessage-接口))[]，物品的备注信息。数组中的每个元素都代表一行。一行最多 50 字符，最多允许 20 行。若不指定则清除物品备注。
  - <Version add="2.2.0" inline/> 需注意：[RawMessage](/docs/docs/scripts/sapi/docs/general#rawmessage-接口) 类型仅限 2.2.0+ 版本下可用。

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
