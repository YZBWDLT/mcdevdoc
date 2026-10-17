---
sidebar_position: 4
---

# 射线检测

import Version from "/src/components/highlight/version"
import Optional from "/src/components/highlight/optional"

本文主要记录射线检测相关接口。

---

## 方块射线

### BlockRaycastOptions 接口

<Version type="script" add="1.4.0"/>

[Dimension.getBlockFromRay](./main#getblockfromray-方法)的附加选项。

```typescript
interface BlockRaycastOptions {
    includeLiquidBlocks?: boolean;
    includePassableBlocks?: boolean;
    maxDistance?: number;
}
```

#### 属性

- <Optional/> includeLiquidBlocks: boolean，设为`true`时，液体方块也会被视为阻挡射线的方块。
- <Optional/> includePassableBlocks: boolean，设为`true`时，藤蔓、鲜花等可穿过方块也会被视为阻挡射线的方块。
- <Optional/> maxDistance: number，射线的最远距离，以方块为单位。

### BlockRaycastHit 接口

<Version type="script" add="1.4.0"/>

方块射线检测的命中结果。

```typescript
interface BlockRaycastHit {
    block: Block;
    face: Direction;
    faceLocation: Vector3;
}
```

#### 属性

- block: [Block](../block/main#block-类)，命中的方块。
- face: [Direction](../general#direction-枚举)，命中处所在的面。
- faceLocation: [Vector3](../general#vector3-接口)，命中位置相对于该方块底部西北角的坐标。

---

## 实体射线

### EntityRaycastOptions 接口

<Version type="script" add="1.4.0"/>

[Dimension.getEntitiesFromRay](./main#getentitiesfromray-方法)的附加选项。

```typescript
interface EntityRaycastOptions {
    ignoreBlockCollision?: boolean;
    includeLiquidBlocks?: boolean;
    includePassableBlocks?: boolean;
    maxDistance?: number;
}
```

#### 属性

- <Version type="script" add="1.12.0" inline/> <Optional/> ignoreBlockCollision: boolean，设为`true`时，方块不会被视为阻挡射线的方块。
- <Version type="script" add="1.12.0" inline/> <Optional/> includeLiquidBlocks: boolean，设为`true`时，液体方块也会被视为阻挡射线的方块。
- <Version type="script" add="1.12.0" inline/> <Optional/> includePassableBlocks: boolean，设为`true`时，藤蔓、鲜花等可穿过方块也会被视为阻挡射线的方块。
- <Optional/> maxDistance: number，射线的最远距离，以方块为单位。

### EntityRaycastHit 接口

<Version type="script" add="1.4.0"/>

实体射线检测的命中结果。

```typescript
interface EntityRaycastHit {
    distance: number;
    entity: Entity;
}
```

#### 属性

- distance: number，射线起点到该实体碰撞箱的距离。
- entity: [Entity](../entity_and_player/entity#entity-类)，命中的实体。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
