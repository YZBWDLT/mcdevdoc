---
sidebar_position: 3
---

# 方块组件

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import ReadOnly from "/src/components/highlight/readonly"
import Static from "/src/components/highlight/static"

本文主要记录方块组件相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 基类

### BlockComponent 类

和方块相关的组件的基类。

```typescript
class BlockComponent extends Component {
    private constructor();
    readonly block: Block;
}
```

**继承自**：[Component](../general#component-类)。

#### 属性

- block: [Block](./main#block-类)，和此组件相关的方块实例。

---

## 可推动组件

### BlockMovableComponent 类

<Version add="2.1.0"/>

方块可推动组件（例如被活塞推动）。

另见：*[`minecraft:movable`](/docs/docs/blocks/components#minecraftmovable)方块组件*。

```typescript
class BlockMovableComponent extends BlockComponent {
    private constructor();
    readonly movementType: MovementType;
    readonly stickyType: StickyType;
    static readonly componentId = 'minecraft:movable';
}
```

**继承自**：[BlockComponent](#blockcomponent-类)。

#### 属性

- movementType: [MovementType](#movementtype-枚举)。
- stickyType: [StickyType](#stickytype-枚举)。
- <ReadOnly/> <Static/> componentId: 'minecraft:movable'，组件的 ID。

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
