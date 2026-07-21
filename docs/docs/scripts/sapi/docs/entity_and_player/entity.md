---
sidebar_position: 1
---

# 实体

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import ReadOnly from "/src/components/highlight/readonly"

本文主要记录实体相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 实体

### Entity 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.Entity.html"/>

代表世界中的一个实体（可能是一个生物，一个玩家，或其他类似于矿车的移动物体）的状态。

```typescript
class Entity {
    private constructor();
    readonly dimension: Dimension;
    readonly id: string;
    readonly isClimbing: boolean;
    readonly isFalling: boolean;
    readonly isInWater: boolean;
    readonly isOnGround: boolean;
    readonly isSleeping: boolean;
    isSneaking: boolean;
    readonly isSprinting: boolean;
    readonly isSwimming: boolean;
    readonly isValid: boolean;
    readonly localizationKey: string;
    readonly location: Vector3;
    nameTag: string;
    readonly scoreboardIdentity?: ScoreboardIdentity;
    readonly typeId: string;
    addEffect(effectType: EffectType | string, duration: number, options?: EntityEffectOptions): Effect | undefined;
    addItem(itemStack: ItemStack): ItemStack | undefined;
    addTag(tag: string): boolean;
    applyDamage(amount: number, options?: EntityApplyDamageByProjectileOptions | EntityApplyDamageOptions): boolean;
    applyImpulse(vector: Vector3): void;
    applyKnockback(horizontalForce: VectorXZ, verticalStrength: number): void;
    clearDynamicProperties(): void;
    clearVelocity(): void;
    extinguishFire(useEffects?: boolean): boolean;
    getAABB(): AABB;
    getAllBlocksStandingOn(options?: GetBlocksStandingOnOptions): Block[];
    getBlockFromViewDirection(options?: BlockRaycastOptions): BlockRaycastHit | undefined;
    getBlockStandingOn(options?: GetBlocksStandingOnOptions): Block | undefined;
    getComponent<T extends string>(componentId: T): EntityComponentReturnType<T> | undefined;
    getComponents(): EntityComponent[];
    getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined;
    getDynamicPropertyIds(): string[];
    getDynamicPropertyTotalByteCount(): number;
    getEffect(effectType: EffectType | string): Effect | undefined;
    getEffects(): Effect[];
    getEntitiesFromViewDirection(options?: EntityRaycastOptions): EntityRaycastHit[];
    getHeadLocation(): Vector3;
    getProperty(identifier: string): boolean | number | string | undefined;
    getRotation(): Vector2;
    getTags(): string[];
    getVelocity(): Vector3;
    getViewDirection(): Vector3;
    hasComponent(componentId: string): boolean;
    hasTag(tag: string): boolean;
    kill(): boolean;
    lookAt(targetLocation: Vector3): void;
    matches(options: EntityQueryOptions): boolean;
    playAnimation(animationName: string, options?: PlayAnimationOptions): void;
    remove(): void;
    removeEffect(effectType: EffectType | string): boolean;
    removeTag(tag: string): boolean;
    resetProperty(identifier: string): boolean | number | string;
    runCommand(commandString: string): CommandResult;
    setDynamicProperties(values: Record<string, boolean | number | string | Vector3 | undefined>): void;
    setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void;
    setOnFire(seconds: number, useEffects?: boolean): boolean;
    setProperty(identifier: string, value: boolean | number | string): void;
    setRotation(rotation: Vector2): void;
    teleport(location: Vector3, teleportOptions?: TeleportOptions): void;
    triggerEvent(eventName: string): void;
    tryTeleport(location: Vector3, teleportOptions?: TeleportOptions): boolean;
}
```

#### 属性

- <ReadOnly/> dimension: [Dimension](../dimension/main#dimension-类)，实体目前所处的维度。
- <ReadOnly/> id: string
- <ReadOnly/> isClimbing: boolean
- <ReadOnly/> isFalling: boolean
- <ReadOnly/> isInWater: boolean
- <ReadOnly/> isOnGround: boolean
- <ReadOnly/> isSleeping: boolean
- isSneaking: boolean
- <ReadOnly/> isSprinting: boolean
- <ReadOnly/> isSwimming: boolean
- <ReadOnly/> isValid: boolean
- <ReadOnly/> <Version add="2.1.0" inline/> localizationKey: string，实体在语言文件中的键名。
- <ReadOnly/> location: Vector3
- <ReadOnly/> nameplateDepthTested
- <ReadOnly/> nameplateRenderDistance
- nameTag: string
- <ReadOnly/> scoreboardIdentity?: ScoreboardIdentity
- <ReadOnly/> target?: [Entity](#entity-类)
- <ReadOnly/> typeId: string

#### addEffect 方法

```typescript
addEffect(effectType: EffectType | string, duration: number, options?: EntityEffectOptions): Effect | undefined;
```

#### addItem 方法

```typescript
addItem(itemStack: ItemStack): ItemStack | undefined;
```

#### addTag 方法

```typescript
addTag(tag: string): boolean;
```

#### applyDamage 方法

```typescript
applyDamage(amount: number, options?: EntityApplyDamageByProjectileOptions | EntityApplyDamageOptions): boolean;
```

#### applyImpulse 方法

```typescript
applyImpulse(vector: Vector3): void;
```

#### applyKnockback 方法

```typescript
applyKnockback(horizontalForce: VectorXZ, verticalStrength: number): void;
```

#### clearDynamicProperties 方法

```typescript
clearDynamicProperties(): void;
```

#### clearVelocity 方法

```typescript
clearVelocity(): void;
```

#### extinguishFire 方法

```typescript
extinguishFire(useEffects?: boolean): boolean;
```

#### getAABB 方法

```typescript
getAABB(): AABB;
```

#### getAllBlocksStandingOn 方法

```typescript
getAllBlocksStandingOn(options?: GetBlocksStandingOnOptions): Block[];
```

#### getBlockFromViewDirection 方法

```typescript
getBlockFromViewDirection(options?: BlockRaycastOptions): BlockRaycastHit | undefined;
```

#### getBlockStandingOn 方法

```typescript
getBlockStandingOn(options?: GetBlocksStandingOnOptions): Block | undefined;
```

#### getComponent 方法

```typescript
getComponent<T extends string>(componentId: T): EntityComponentReturnType<T> | undefined;
```

#### getComponents 方法

```typescript
getComponents(): EntityComponent[];
```

#### getDynamicProperty 方法

```typescript
getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined;
```

#### getDynamicPropertyIds 方法

```typescript
getDynamicPropertyIds(): string[];
```

#### getDynamicPropertyTotalByteCount 方法

```typescript
getDynamicPropertyTotalByteCount(): number;
```

#### getEffect 方法

```typescript
getEffect(effectType: EffectType | string): Effect | undefined;
```

#### getEffects 方法

```typescript
getEffects(): Effect[];
```

#### getEntitiesFromViewDirection 方法

```typescript
getEntitiesFromViewDirection(options?: EntityRaycastOptions): EntityRaycastHit[];
```

#### getHeadLocation 方法

```typescript
getHeadLocation(): Vector3;
```

#### getProperty 方法

```typescript
getProperty(identifier: string): boolean | number | string | undefined;
```

#### getRotation 方法

```typescript
getRotation(): Vector2;
```

#### getTags 方法

```typescript
getTags(): string[];
```

#### getVelocity 方法

```typescript
getVelocity(): Vector3;
```

#### getViewDirection 方法

```typescript
getViewDirection(): Vector3;
```

#### hasComponent 方法

```typescript
hasComponent(componentId: string): boolean;
```

#### hasTag 方法

```typescript
hasTag(tag: string): boolean;
```

#### kill 方法

```typescript
kill(): boolean;
```

#### lookAt 方法

```typescript
lookAt(targetLocation: Vector3): void;
```

#### matches 方法

```typescript
matches(options: EntityQueryOptions): boolean;
```

#### playAnimation 方法

```typescript
playAnimation(animationName: string, options?: PlayAnimationOptions): void;
```

#### remove 方法

```typescript
remove(): void;
```

#### removeEffect 方法

```typescript
removeEffect(effectType: EffectType | string): boolean;
```

#### removeTag 方法

```typescript
removeTag(tag: string): boolean;
```

#### resetProperty 方法

```typescript
resetProperty(identifier: string): boolean | number | string;
```

#### runCommand 方法

```typescript
runCommand(commandString: string): CommandResult;
```

#### setDynamicProperties 方法

<Version add="2.3.0"/>

将多个动态属性设置为特定的值。

```typescript
setDynamicProperties(values: Record<string, boolean | number | string | Vector3 | undefined>): void;
```

**参数**：

- values: Record\<string, boolean | number | string | [Vector3](../general#vector3-接口) | undefined\>，代表动态属性的对象。若未设定数据则移除该属性。

#### setDynamicProperty 方法

```typescript
setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void;
```

#### setOnFire 方法

```typescript
setOnFire(seconds: number, useEffects?: boolean): boolean;
```

#### setProperty 方法

```typescript
setProperty(identifier: string, value: boolean | number | string): void;
```

#### setRotation 方法

```typescript
setRotation(rotation: Vector2): void;
```

#### teleport 方法

```typescript
teleport(location: Vector3, teleportOptions?: TeleportOptions): void;
```

#### triggerEvent 方法

```typescript
triggerEvent(eventName: string): void;
```

#### tryTeleport 方法

```typescript
tryTeleport(location: Vector3, teleportOptions?: TeleportOptions): boolean;
```

---

### EntityType 类

包含实体类型信息。

```typescript
class EntityType {
    private constructor();
    readonly id: string;
    readonly localizationKey: string;
}
```

#### 属性

- <ReadOnly/> id: string，表示实体类型，例如`minecraft:skeleton`。
- <ReadOnly/> localizationKey: string，表示实体在语言文件`.lang`中使用的本地化键名。

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
