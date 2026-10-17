---
sidebar_position: 6
---

# 定位栏

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录定位栏相关接口。

---

## 定位栏

### LocatorBar 类

<Version type="script" add="2.8.0"/>

定位栏，用于显示与查询路标。

```typescript
class LocatorBar {
    private constructor();
    readonly count: number;
    readonly maxCount: number;
    addWaypoint(waypoint: Waypoint): void;
    getAllWaypoints(): Waypoint[];
    hasWaypoint(waypoint: Waypoint): boolean;
    removeAllWaypoints(): void;
    removeWaypoint(waypoint: Waypoint): void;
}
```

#### 属性

- <ReadOnly/> count: number，定位栏中当前的路标数量。
- <ReadOnly/> maxCount: number，定位栏可添加的路标数量上限。

#### addWaypoint 方法

<RestrictedMode inline/>

```typescript
addWaypoint(waypoint: Waypoint): void
```

- waypoint: [Waypoint](#waypoint-类)，要添加的路标。

#### getAllWaypoints 方法

<RestrictedMode inline/>

```typescript
getAllWaypoints(): Waypoint[]
```

**返回值**：[Waypoint](#waypoint-类)[]，定位栏中当前所有路标组成的数组。

#### hasWaypoint 方法

<RestrictedMode inline/>

```typescript
hasWaypoint(waypoint: Waypoint): boolean
```

- waypoint: [Waypoint](#waypoint-类)，要检查的路标。

**返回值**：boolean，存在该路标时为`true`。

#### removeAllWaypoints 方法

<RestrictedMode inline/>

```typescript
removeAllWaypoints(): void
```

#### removeWaypoint 方法

<RestrictedMode inline/>

```typescript
removeWaypoint(waypoint: Waypoint): void
```

- waypoint: [Waypoint](#waypoint-类)，要移除的路标。

### Waypoint 类

<Version type="script" add="2.8.0"/>

定位栏中的一个路标。

```typescript
class Waypoint {
    private constructor();
    color?: RGB;
    isEnabled: boolean;
    readonly isValid: boolean;
    textureSelector: WaypointTextureSelector;
    getDimensionLocation(): DimensionLocation;
    remove(): void;
}
```

#### 属性

- <RestrictedMode inline/> <Optional/> color: [RGB](../../server/general#rgb-接口)，应用于路标图标的颜色着色（可选）；未指定时使用默认颜色。
- <RestrictedMode inline/> isEnabled: boolean，控制路标是否显示在玩家屏幕上；禁用时路标被隐藏但仍有效。
- <ReadOnly/> isValid: boolean，路标当前是否有效；当其跟踪的实体不再有效时，路标会变为无效。
- <RestrictedMode inline/> textureSelector: [WaypointTextureSelector](#waypointtextureselector-接口)，决定根据距离或其它条件显示哪个图标纹理的路标纹理选择器。

#### getDimensionLocation 方法

<RestrictedMode inline/>

```typescript
getDimensionLocation(): DimensionLocation
```

**返回值**：[DimensionLocation](../../server/general#dimensionlocation-接口)，该路标当前的位置；实体路标返回实体的当前位置，位置路标返回存储的位置。

#### remove 方法

<RestrictedMode inline/>

```typescript
remove(): void
```

### WaypointTextureSelector 接口

<Version type="script" add="2.8.0"/>

定义路标纹理如何随距离变化。

```typescript
interface WaypointTextureSelector {
    textureBoundsList: WaypointTextureBounds[];
}
```

#### 属性

- textureBoundsList: [WaypointTextureBounds](#waypointtexturebounds-接口)[]，定义不同距离范围显示纹理的边界数组，系统据此按到路标的当前距离决定合适纹理，最多 16 个。

### WaypointTextureBounds 接口

<Version type="script" add="2.8.0"/>

定义某个距离范围内显示的路标纹理。

```typescript
interface WaypointTextureBounds {
    lowerBound: number;
    texture: CustomTexture | WaypointTexture;
    upperBound?: number;
}
```

#### 属性

- lowerBound: number，该纹理的距离下界；到路标的距离大于该值时显示该纹理，必须不小于 0。
- texture: [CustomTexture](#customtexture-接口) | [WaypointTexture](#waypointtexture-枚举)，该距离范围内显示的纹理。
- <Optional/> upperBound: number，该纹理的距离上界；到路标的距离不大于该值时显示该纹理，未指定时无上限，必须不小于 0。

### WaypointTexture 枚举

<Version type="script" add="2.8.0"/>

路标图标纹理。

```typescript
enum WaypointTexture {
    Circle = "minecraft:circle", // 圆形路标图标纹理
    SmallSquare = "minecraft:small_square", // 小方形路标图标纹理
    SmallStar = "minecraft:small_star", // 小星形路标图标纹理
    Square = "minecraft:square", // 方形路标图标纹理
}
```

### CustomTexture 接口

<Version type="script" add="2.8.0"/>

自定义纹理。

```typescript
interface CustomTexture {
    iconHeight: number;
    iconWidth: number;
    path: string;
}
```

#### 属性

- iconHeight: number，图标的高度，以相对单位表示，取值须在 0.0~1.0 之间。
- iconWidth: number，图标的宽度，以相对单位表示，取值须在 0.0~1.0 之间。
- path: string，自定义纹理的资源路径。

### EntityWaypoint 类

<Version type="script" add="2.8.0"/>

跟踪实体的路标，随跟踪的实体移动。

继承自[Waypoint](#waypoint-类)。

```typescript
class EntityWaypoint extends Waypoint {
    constructor(entity: Entity, textureSelector: WaypointTextureSelector, entityRules: EntityVisibilityRules, color?: RGB);
    readonly entity: Entity;
    readonly entityRules: EntityVisibilityRules;
}
```

#### 属性

- <ReadOnly/> entity: [Entity](../../server/entity_and_player/entity#entity-类)，该路标跟踪的实体。
- <ReadOnly/> entityRules: [EntityVisibilityRules](#entityvisibilityrules-接口)，该路标对实体生效的可见性规则。

### LocationWaypoint 类

<Version type="script" add="2.8.0"/>

跟踪固定位置的路标。

继承自[Waypoint](#waypoint-类)。

```typescript
class LocationWaypoint extends Waypoint {
    constructor(dimensionLocation: DimensionLocation, textureSelector: WaypointTextureSelector, color?: RGB);
    setDimensionLocation(dimensionLocation: DimensionLocation): void;
}
```

#### setDimensionLocation 方法

<RestrictedMode inline/>

设置该路标跟踪的位置。

```typescript
setDimensionLocation(dimensionLocation: DimensionLocation): void
```

- dimensionLocation: [DimensionLocation](../../server/general#dimensionlocation-接口)，该路标要跟踪的位置。

### PlayerWaypoint 类

<Version type="script" add="2.8.0"/>

跟踪玩家的路标。

继承自[EntityWaypoint](#entitywaypoint-类)。

```typescript
class PlayerWaypoint extends EntityWaypoint {
    constructor(player: Player, textureSelector: WaypointTextureSelector, playerRules: PlayerVisibilityRules, color?: RGB);
    readonly playerRules: PlayerVisibilityRules;
}
```

#### 属性

- <ReadOnly/> playerRules: [PlayerVisibilityRules](#playervisibilityrules-接口)，该路标对玩家生效的可见性规则。

---

## 可见性规则

### EntityVisibilityRules 接口

<Version type="script" add="2.8.0"/>

实体路标的可见性规则。

```typescript
interface EntityVisibilityRules {
    showDead?: boolean;
    showInvisible?: boolean;
    showSneaking?: boolean;
}
```

#### 属性

- <Optional/> showDead: boolean，是否显示已死亡的实体。
- <Optional/> showInvisible: boolean，是否显示隐身的实体。
- <Optional/> showSneaking: boolean，是否显示潜行的实体。

### PlayerVisibilityRules 接口

<Version type="script" add="2.8.0"/>

玩家路标的可见性规则，在实体可见性规则的基础上追加玩家专属的选项。

```typescript
interface PlayerVisibilityRules {
    showHidden?: boolean;
    showSpectator?: boolean;
    showSpectatorToSpectator?: boolean;
}
```

#### 属性

- <Optional/> showHidden: boolean，是否显示处于隐藏状态的玩家。
- <Optional/> showSpectator: boolean，是否显示旁观模式的玩家。
- <Optional/> showSpectatorToSpectator: boolean，旁观模式的玩家是否能看到其他旁观模式的玩家。

---

## 错误

### LocatorBarError 类

<Version type="script" add="2.8.0"/>

定位栏操作失败时抛出该错误，可通过`reason`判断具体原因。

继承自Error。

```typescript
class LocatorBarError extends Error {
    private constructor();
    readonly reason: LocatorBarErrorReason;
}
```

#### 属性

- <ReadOnly/> reason: [LocatorBarErrorReason](#locatorbarerrorreason-枚举)，定位栏操作失败的原因。

### LocatorBarErrorReason 枚举

<Version type="script" add="2.8.0"/>

定位栏操作失败的原因。

```typescript
enum LocatorBarErrorReason {
    WaypointAlreadyExists = "WaypointAlreadyExists", // 该标识符的路标已存在
    WaypointLimitExceeded = "WaypointLimitExceeded", // 路标数量已达上限
    WaypointNotFound = "WaypointNotFound", // 找不到该路标
}
```

### InvalidWaypointError 类

<Version type="script" add="2.8.0"/>

对已失效的路标执行操作时抛出该错误；路标被移除或其跟踪的实体失效后会失效。

继承自Error。

```typescript
class InvalidWaypointError extends Error {
    private constructor();
}
```

### InvalidWaypointTextureSelectorError 类

<Version type="script" add="2.8.0"/>

路标的纹理选择器不合法时抛出该错误。

继承自Error。

```typescript
class InvalidWaypointTextureSelectorError extends Error {
    private constructor();
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
