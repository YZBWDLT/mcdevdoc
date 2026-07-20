---
sidebar_position: 2
---

# 方块

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import ReadOnly from "/src/components/highlight/readonly"

本文主要记录方块相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 方块信息

### Block 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.Block.html"/>

#### 属性

- <ReadOnly/> <Version add="2.1.0" inline/> localizationKey: string，方块在语言文件中的键名。

---

## 方块组件

以下接口为方块组件，方块组件代表方块的独有功能。

### BlockMovableComponent 类

<Version add="2.1.0"/>

方块可被活塞推动组件。

另见：*[`minecraft:movable`](/docs/docs/blocks/components#minecraftmovable)方块组件*。

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.BlockMovableComponent.html"/>

---

## 其他

### MovementType 枚举

<Version add="2.1.0"/>

被活塞推动的行为类型。

```ts
enum MovementType {
    Immovable = 'Immovable',
    Popped = 'Popped',
    Push = 'Push',
    PushPull = 'PushPull',
}
```

---

### StickyType 枚举

<Version add="2.1.0"/>

是否具有粘性。

```ts
enum StickyType {
    None = 'None',
    Same = 'Same',
}
```

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
