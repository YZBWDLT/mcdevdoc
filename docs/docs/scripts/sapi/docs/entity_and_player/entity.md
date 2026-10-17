---
sidebar_position: 1
---

# 实体

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录实体相关接口。

---

## 实体

### Entity 类

<Version type="script" add="1.0.0"/>

表示游戏世界中的一个实体，例如生物、玩家或物品实体。

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
    nameplateDepthTested: boolean;
    nameplateRenderDistance: number;
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

- <Version type="script" add="1.1.0" inline/> <ReadOnly/> dimension: [Dimension](../dimension/main#dimension-类)，该实体当前所在的维度。
- <ReadOnly/> id: string，实体的唯一标识符。该标识符在世界多次加载之间保持一致，但不应从中推断任何含义。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isClimbing: boolean，该实体是否接触可攀爬的方块（例如玩家站在梯子旁，或蜘蛛站在石墙旁）。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isFalling: boolean，该实体的下落距离是否大于 `0`；滑翔时是否大于 `1`。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isInWater: boolean，该实体是否有任何部分位于水方块内。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isOnGround: boolean，该实体是否站在固体方块上。该属性的行为可能不符合预期。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isSleeping: boolean，该实体当前是否正在睡觉。
- <Version type="script" add="1.6.0" inline/> <RestrictedMode inline/> isSneaking: boolean，该实体是否正在潜行（即移动更慢、更安静）。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isSprinting: boolean，该实体是否正在疾跑（例如玩家执行疾跑动作、豹猫逃跑，或猪吃下胡萝卜钓竿后加速）。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isSwimming: boolean，该实体是否处于游泳状态（例如玩家执行游泳动作，或鱼在水中）。
- <Version type="script" add="1.4.0" inline/> <ReadOnly/> isValid: boolean，该实体是否可被脚本操作。当玩家的`EntityLifetimeState`为`Loaded`时，玩家被视为有效。
- <Version type="script" add="2.1.0" inline/> <ReadOnly/> localizationKey: string，实体名称在语言文件（`.lang`）中使用的本地化键名。
- <Version type="script" add="1.1.0" inline/> <ReadOnly/> location: [Vector3](../general#vector3-接口)，该实体的当前位置。
- <Version type="script" add="2.9.0" inline/> <RestrictedMode inline/> nameplateDepthTested: boolean，玩家名牌是否进行深度测试以决定可见性。
- <Version type="script" add="2.9.0" inline/> <RestrictedMode inline/> nameplateRenderDistance: number，该实体名牌的渲染距离。
- <Version type="script" add="1.1.0" inline/> <RestrictedMode inline/> nameTag: string，为该实体指定的名称。
- <Version type="script" add="1.4.0" inline/> <ReadOnly/> <Optional/> scoreboardIdentity: [ScoreboardIdentity](../world/scoreboard#scoreboardidentity-类)，返回代表该实体的记分板身份。实体被杀死后该身份仍然有效。
- <ReadOnly/> typeId: string，实体的类型标识符，例如`minecraft:skeleton`。即使`Entity.isValid`为`false`，该属性仍可访问。

#### addEffect 方法

<Version type="script" add="1.3.0" inline/> <RestrictedMode inline/>

向该实体添加或更新状态效果（如中毒）。持续时间以游戏刻为单位。

```typescript
addEffect(
    effectType: EffectType | string,
    duration: number,
    options?: EntityEffectOptions,
): Effect | undefined
```

- effectType: EffectType | string，要添加的状态效果的类型。
- duration: number，状态效果持续的时长，以游戏刻为单位。
- options?: EntityEffectOptions，状态效果的附加选项。

**返回值**：Effect | undefined，添加或更新的状态效果。

#### addItem 方法

<Version type="script" add="2.7.0" inline/> <RestrictedMode inline/>

向该实体的物品栏添加物品。若物品全部添加成功则返回`undefined`；否则返回包含剩余物品的物品堆叠。

```typescript
addItem(itemStack: ItemStack): ItemStack | undefined
```

- itemStack: [ItemStack](../item/main#itemstack-类)，要添加的物品堆叠。

**返回值**：[ItemStack](../item/main#itemstack-类) | undefined，全部添加成功时为`undefined`；否则返回包含剩余物品的物品堆叠。

#### addTag 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

为该实体添加指定标签。若该标签已存在，则返回`false`。

```typescript
addTag(tag: string): boolean
```

- tag: string，要添加的标签。

**返回值**：boolean，`true` 表示添加成功；该标签已存在时为`false`。

#### applyDamage 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

对该实体造成一定量的伤害。若实体免疫伤害，可能返回`false`。

```typescript
applyDamage(
    amount: number,
    options?: EntityApplyDamageByProjectileOptions | EntityApplyDamageOptions,
): boolean
```

- amount: number，要造成的伤害值。
- options?: EntityApplyDamageByProjectileOptions | EntityApplyDamageOptions，伤害的附加选项，例如伤害的来源。

**返回值**：boolean，`true` 表示伤害生效；实体免疫伤害或伤害被取消时为`false`。

#### applyImpulse 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

向该实体当前的速度施加冲量向量。请注意，该方法直到`2.2.0`版本才能对玩家使用。

```typescript
applyImpulse(vector: Vector3): void
```

- vector: [Vector3](../general#vector3-接口)，施加的冲量向量。

#### applyKnockback 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

向该实体当前的速度施加水平与垂直方向的击退冲量。

```typescript
applyKnockback(horizontalForce: VectorXZ, verticalStrength: number): void
```

- horizontalForce: [VectorXZ](../general#vectorxz-接口)，水平方向的击退力度。
- verticalStrength: number，竖直方向的击退力度。

#### clearDynamicProperties 方法

<Version type="script" add="1.7.0" inline/>

清除该实体上设置的所有动态属性。

```typescript
clearDynamicProperties(): void
```

#### clearVelocity 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

将该实体的当前速度设为零。请注意，该方法直到`2.2.0`版本才能对玩家使用。

```typescript
clearVelocity(): void
```

#### extinguishFire 方法

<Version type="script" add="1.9.0" inline/> <RestrictedMode inline/>

若该实体着火，则将其身上的火扑灭。可通过`getComponent('minecraft:onfire')`判断实体是否着火。

```typescript
extinguishFire(useEffects?: boolean): boolean
```

- useEffects?: boolean，是否显示与灭火相关的视觉效果。默认为`true`。

**返回值**：boolean，`true` 表示该实体原本处于着火状态。

#### getAABB 方法

<Version type="script" add="2.4.0" inline/>

获取该实体的碰撞箱。

```typescript
getAABB(): AABB
```

**返回值**：[AABB](../general#aabb-接口)，该实体碰撞箱的轴对齐包围盒。

#### getAllBlocksStandingOn 方法

<Version type="script" add="2.4.0" inline/>

获取该实体正站立的固体方块（忽略压力板）。

```typescript
getAllBlocksStandingOn(options?: GetBlocksStandingOnOptions): Block[]
```

- options?: GetBlocksStandingOnOptions，方块查询的选项。

**返回值**：[Block](../block/main#block-类)[]，实体正站立的固体方块数组；没有站立在方块上时为空数组。

#### getBlockFromViewDirection 方法

<Version type="script" add="1.4.0" inline/>

返回该实体视线方向上第一个相交的方块。

```typescript
getBlockFromViewDirection(options?: BlockRaycastOptions): BlockRaycastHit | undefined
```

- options?: [BlockRaycastOptions](../dimension/raycast#blockraycastoptions-接口)，方块射线检测的选项。

**返回值**：[BlockRaycastHit](../dimension/raycast#blockraycasthit-接口) | undefined，视线命中的方块信息；没有命中时为`undefined`。

#### getBlockStandingOn 方法

<Version type="script" add="2.4.0" inline/>

获取该实体正站立且最靠近实体中心的固体方块（忽略压力板）。

```typescript
getBlockStandingOn(options?: GetBlocksStandingOnOptions): Block | undefined
```

- options?: GetBlocksStandingOnOptions，方块查询的选项。

**返回值**：[Block](../block/main#block-类) | undefined，最靠近实体中心的固体方块；实体处于飞行或跳跃状态时为`undefined`。

#### getComponent 方法

<Version type="script" add="1.2.0" inline/>

返回该实体上指定的脚本组件。

```typescript
getComponent<T extends string>(componentId: T): EntityComponentReturnType<T> | undefined
```

- componentId: T，脚本组件的标识符，例如`minecraft:health`。

**返回值**：EntityComponentReturnType&lt;T&gt; | undefined，该实体上指定的脚本组件；该组件不存在时为`undefined`。

#### getComponents 方法

<Version type="script" add="1.2.0" inline/>

返回该实体上所有脚本组件。

```typescript
getComponents(): EntityComponent[]
```

**返回值**：EntityComponent[]，该实体上的脚本组件数组。

#### getDynamicProperty 方法

<Version type="script" add="1.7.0" inline/>

返回动态属性的值。若该属性尚未设置，返回`undefined`。

```typescript
getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined
```

- identifier: string，动态属性的标识符。

**返回值**：boolean | number | string | [Vector3](../general#vector3-接口) | undefined，动态属性的值；该属性尚未设置时为`undefined`。

#### getDynamicPropertyIds 方法

<Version type="script" add="1.7.0" inline/>

返回该实体上已使用的动态属性标识符集合。

```typescript
getDynamicPropertyIds(): string[]
```

**返回值**：string[]，已设置的动态属性标识符数组。

#### getDynamicPropertyTotalByteCount 方法

<Version type="script" add="1.7.0" inline/>

返回该实体当前存储的所有动态属性的总大小（单位：字节）。

```typescript
getDynamicPropertyTotalByteCount(): number
```

**返回值**：number，全部动态属性占用的总字节数。

#### getEffect 方法

<Version type="script" add="1.3.0" inline/>

返回该实体上指定类型的状态效果；若该效果不存在则返回`undefined`。

```typescript
getEffect(effectType: EffectType | string): Effect | undefined
```

- effectType: EffectType | string，要获取的状态效果的类型。

**返回值**：Effect | undefined，该类型的状态效果；该效果不存在时为`undefined`。

#### getEffects 方法

<Version type="script" add="1.3.0" inline/>

返回施加在该实体上的一组状态效果。

```typescript
getEffects(): Effect[]
```

**返回值**：Effect[]，当前施加在该实体上的状态效果数组。

#### getEntitiesFromViewDirection 方法

<Version type="script" add="1.4.0" inline/>

从该实体视角发射射线，获取其视线中的实体。

```typescript
getEntitiesFromViewDirection(options?: EntityRaycastOptions): EntityRaycastHit[]
```

- options?: [EntityRaycastOptions](../dimension/raycast#entityraycastoptions-接口)，实体射线检测的选项。

**返回值**：[EntityRaycastHit](../dimension/raycast#entityraycasthit-接口)[]，视线命中的实体信息数组。

#### getHeadLocation 方法

<Version type="script" add="1.1.0" inline/>

返回该实体头部组件当前的位置。

```typescript
getHeadLocation(): Vector3
```

**返回值**：[Vector3](../general#vector3-接口)，头部当前位置的坐标。

#### getProperty 方法

<Version type="script" add="1.6.0" inline/>

获取实体属性的值。若在同一游戏刻内通过`setProperty`修改过，读取到的可能仍是更新前的值。

```typescript
getProperty(identifier: string): boolean | number | string | undefined
```

- identifier: string，实体属性的标识符。

**返回值**：boolean | number | string | undefined，实体属性的值；若在同一游戏刻内刚用`setProperty`修改过，可能仍是更新前的值。

#### getRotation 方法

<Version type="script" add="1.6.0" inline/>

返回该实体当前的旋转角度（单位：度）。

```typescript
getRotation(): Vector2
```

**返回值**：[Vector2](../general#vector2-接口)，该实体当前的朝向角度，以度为单位。

#### getTags 方法

<Version type="script" add="1.2.0" inline/>

返回与该实体关联的所有标签。

```typescript
getTags(): string[]
```

**返回值**：string[]，该实体的标签数组；没有任何标签时为空数组。

#### getVelocity 方法

<Version type="script" add="1.1.0" inline/>

返回该实体当前的速度向量。

```typescript
getVelocity(): Vector3
```

**返回值**：[Vector3](../general#vector3-接口)，该实体当前的速度向量。

#### getViewDirection 方法

<Version type="script" add="1.1.0" inline/>

返回该实体当前的视线方向。

```typescript
getViewDirection(): Vector3
```

**返回值**：[Vector3](../general#vector3-接口)，该实体当前视线方向的单位向量。

#### hasComponent 方法

<Version type="script" add="1.2.0" inline/>

返回该实体上是否存在指定的脚本组件。

```typescript
hasComponent(componentId: string): boolean
```

- componentId: string，脚本组件的标识符。

**返回值**：boolean，`true` 表示该实体上存在指定的脚本组件。

#### hasTag 方法

<Version type="script" add="1.2.0" inline/>

返回该实体是否具有指定标签。

```typescript
hasTag(tag: string): boolean
```

- tag: string，要检查的标签。

**返回值**：boolean，`true` 表示该实体具有指定标签。

#### kill 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

杀死该实体。实体将照常掉落战利品。若实体无法被杀死，返回`false`。

```typescript
kill(): boolean
```

**返回值**：boolean，`true` 表示杀死成功；该实体无法被杀死时为`false`。

#### lookAt 方法

<Version type="script" add="2.0.0" inline/> <RestrictedMode inline/>

将该实体的旋转设置为朝向目标位置（俯仰角与偏航角都会设置）。

```typescript
lookAt(targetLocation: Vector3): void
```

- targetLocation: [Vector3](../general#vector3-接口)，要看向的坐标。

#### matches 方法

<Version type="script" add="1.7.0" inline/>

将实体与传入的选项进行匹配。若选项中未指定位置，则使用实体的位置进行匹配。

```typescript
matches(options: EntityQueryOptions): boolean
```

- options: [EntityQueryOptions](#entityqueryoptions-接口)，实体的筛选项。

**返回值**：boolean，`true` 表示该实体与筛选条件匹配。

#### playAnimation 方法

<Version type="script" add="1.9.0" inline/> <RestrictedMode inline/>

使该实体播放指定动画。

```typescript
playAnimation(animationName: string, options?: PlayAnimationOptions): void
```

- animationName: string，要播放的动画的名称。
- options?: PlayAnimationOptions，动画播放的选项。

#### remove 方法

<Version type="script" add="1.7.0" inline/> <RestrictedMode inline/>

立即将该实体从世界中移除。被移除的实体不会播放死亡动画，也不会掉落战利品。

```typescript
remove(): void
```

#### removeEffect 方法

<Version type="script" add="1.3.0" inline/> <RestrictedMode inline/>

移除该实体上的指定状态效果；若该效果不存在则返回`false`。

```typescript
removeEffect(effectType: EffectType | string): boolean
```

- effectType: EffectType | string，要移除的状态效果的类型。

**返回值**：boolean，`true` 表示移除成功；该效果不存在时为`false`。

#### removeTag 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

从该实体移除指定标签。

```typescript
removeTag(tag: string): boolean
```

- tag: string，要移除的标签。

**返回值**：boolean，`true` 表示移除成功；该标签不存在时为`false`。

#### resetProperty 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

将实体属性重置为实体定义中指定的默认值。该更改在下一个游戏刻才会应用。

```typescript
resetProperty(identifier: string): boolean | number | string
```

- identifier: string，要重置的实体属性的标识符。

**返回值**：boolean | number | string，重置后的实体属性值。

#### runCommand 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

在该实体的上下文中同步执行命令。

```typescript
runCommand(commandString: string): CommandResult
```

- commandString: string，要执行的命令，不需要以斜杠开头。

**返回值**：[CommandResult](../dimension/main#commandresult-接口)，命令的执行结果，包含是否执行成功与错误信息。

#### setDynamicProperties 方法

<Version type="script" add="2.3.0" inline/>

批量设置多个动态属性的值。

```typescript
setDynamicProperties(
    values: Record<string, boolean | number | string | Vector3 | undefined>,
): void
```

- values: Record&lt;string, boolean | number | string | [Vector3](../general#vector3-接口) | undefined&gt;，代表动态属性的对象。若其中某个属性的值为`undefined`，则移除该属性。

#### setDynamicProperty 方法

<Version type="script" add="1.7.0" inline/>

将指定动态属性设置为某个值。

```typescript
setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void
```

- identifier: string，动态属性的标识符。
- value?: boolean | number | string | [Vector3](../general#vector3-接口)，要设置的值。若不传入，则移除该属性。

#### setOnFire 方法

<Version type="script" add="1.9.0" inline/> <RestrictedMode inline/>

使该实体着火（若不在水中或雨中）。

```typescript
setOnFire(seconds: number, useEffects?: boolean): boolean
```

- seconds: number，燃烧持续的秒数。
- useEffects?: boolean，是否应用副作用（例如解冻冻结），并考虑雨水、抗火等因素。默认为`true`。

**返回值**：boolean，`true` 表示设置成功；秒数不大于 0、实体潮湿或免疫火焰时为`false`。

#### setProperty 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

将实体属性设置为指定值。该更改在下一个游戏刻才会应用。

```typescript
setProperty(identifier: string, value: boolean | number | string): void
```

- identifier: string，实体属性的标识符。
- value: boolean | number | string，要设置的实体属性的值。

#### setRotation 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

设置该实体的主旋转。

```typescript
setRotation(rotation: Vector2): void
```

- rotation: [Vector2](../general#vector2-接口)，要设置的朝向，仅包含 X（俯仰）与 Y（偏航）两个角度。

#### teleport 方法

<Version type="script" add="1.3.0" inline/> <RestrictedMode inline/>

将该实体传送到新位置。

```typescript
teleport(location: Vector3, teleportOptions?: TeleportOptions): void
```

- location: [Vector3](../general#vector3-接口)，传送到的坐标。
- teleportOptions?: TeleportOptions，传送的附加选项。

#### triggerEvent 方法

<Version type="script" add="1.5.0" inline/> <RestrictedMode inline/>

触发实体类型事件。每个实体在其定义中都为若干实体行为定义了事件。

```typescript
triggerEvent(eventName: string): void
```

- eventName: string，要触发的实体事件的名称。

#### tryTeleport 方法

<Version type="script" add="1.3.0" inline/> <RestrictedMode inline/>

尝试传送，但可能无法完成（例如目的地存在方块）。

```typescript
tryTeleport(location: Vector3, teleportOptions?: TeleportOptions): boolean
```

- location: [Vector3](../general#vector3-接口)，传送到的坐标。
- teleportOptions?: TeleportOptions，传送的附加选项。

**返回值**：boolean，`true` 表示传送成功。

### EntityType 类

<Version type="script" add="1.10.0"/>

实体的类型（或模板）。

```typescript
class EntityType {
    private constructor();
    readonly id: string;
    readonly localizationKey: string;
}
```

#### 属性

- <ReadOnly/> id: string，该实体类型的标识符，例如`minecraft:skeleton`。
- <Version type="script" add="2.6.0" inline/> <ReadOnly/> localizationKey: string，实体类型名称在语言文件（`.lang`）中使用的本地化键名。

---

## 实体查询

### EntityQueryOptions 接口

<Version type="script" add="1.1.0"/>

在某个区域内筛选实体时使用的选项，除本接口自身的字段外，还继承了[EntityFilter](#entityfilter-接口)的全部筛选字段。

```typescript
interface EntityQueryOptions {
    closest?: number;
    farthest?: number;
    location?: Vector3;
    maxDistance?: number;
    minDistance?: number;
    volume?: Vector3;
}
```

#### 属性

- <Optional/> closest: number，限制返回的实体数量，只返回距离最近的若干个；必须同时指定`location`。
- <Optional/> farthest: number，限制返回的实体数量，只返回距离最远的若干个；必须同时指定`location`。
- <Optional/> location: [Vector3](../general#vector3-接口)，查询的种子位置，与`closest`、`farthest`、`volume`及各距离属性配合使用。
- <Optional/> maxDistance: number，指定时只包含与`location`距离小于该值的实体。
- <Optional/> minDistance: number，指定时只包含与`location`距离不小于该值的实体。
- <Version type="script" add="1.11.0" inline/> <Optional/> volume: [Vector3](../general#vector3-接口)，与`location`配合，指定要包含的实体所在的长方体范围。

### EntityFilter 接口

<Version type="script" add="1.11.0"/>

筛选实体时使用的条件集合，[EntityQueryOptions](#entityqueryoptions-接口)继承其中的全部字段。

```typescript
interface EntityFilter {
    excludeFamilies?: string[];
    excludeGameModes?: GameMode[];
    excludeNames?: string[];
    excludeTags?: string[];
    excludeTypes?: string[];
    families?: string[];
    gameMode?: GameMode;
    maxHorizontalRotation?: number;
    maxLevel?: number;
    maxVerticalRotation?: number;
    minHorizontalRotation?: number;
    minLevel?: number;
    minVerticalRotation?: number;
    name?: string;
    propertyOptions?: EntityQueryPropertyOptions[];
    scoreOptions?: EntityQueryScoreOptions[];
    tags?: string[];
    type?: string;
}
```

#### 属性

- <Optional/> excludeFamilies: string[]，排除属于指定族系中任一族系的实体。
- <Optional/> excludeGameModes: GameMode[]，排除处于指定游戏模式的实体。
- <Optional/> excludeNames: string[]，排除名称与指定值之一相同的实体。
- <Optional/> excludeTags: string[]，排除带有指定标签中任一标签的实体。
- <Optional/> excludeTypes: string[]，排除属于指定类型之一的实体。
- <Optional/> families: string[]，指定时只包含同时属于全部指定族系的实体。
- <Optional/> gameMode: GameMode，指定时只包含处于该游戏模式的实体。
- <Optional/> maxHorizontalRotation: number，指定时只包含水平旋转角不大于该值的实体。
- <Optional/> maxLevel: number，指定时只包含等级不高于该值的玩家。
- <Optional/> maxVerticalRotation: number，指定时只包含垂直旋转角不大于该值的实体。
- <Optional/> minHorizontalRotation: number，指定时只包含水平旋转角不小于该值的实体。
- <Optional/> minLevel: number，指定时只包含等级不低于该值的玩家。
- <Optional/> minVerticalRotation: number，指定时只包含垂直旋转角不小于该值的实体。
- <Optional/> name: string，只包含具有该名称的实体。
- <Version type="script" add="1.14.0" inline/> <Optional/> propertyOptions: [EntityQueryPropertyOptions](#entityquerypropertyoptions-接口)[]，按实体属性筛选实体时使用的条件集合。
- <Optional/> scoreOptions: [EntityQueryScoreOptions](#entityqueryscoreoptions-接口)[]，按记分项分数筛选实体时使用的条件集合。
- <Optional/> tags: string[]，只包含同时带有全部指定标签的实体。
- <Optional/> type: string，指定时只包含该类型的实体。

### EntityQueryScoreOptions 接口

<Version type="script" add="1.1.0"/>

按记分项上的分数筛选实体时使用的附加条件。

```typescript
interface EntityQueryScoreOptions {
    exclude?: boolean;
    maxScore?: number;
    minScore?: number;
    objective?: string;
}
```

#### 属性

- <Optional/> exclude: boolean，设为`true`时，处于该分数范围内的实体会被排除出查询结果。
- <Optional/> maxScore: number，指定时只包含分数不高于该值的实体。
- <Optional/> minScore: number，指定时只包含分数不低于该值的实体。
- <Optional/> objective: string，用于筛选的记分项标识符。

### EntityQueryPropertyOptions 接口

<Version type="script" add="1.14.0"/>

按实体属性筛选实体时使用的条件。

```typescript
interface EntityQueryPropertyOptions {
    exclude?: boolean;
    propertyId: string;
    value?:
        | boolean
        | string
        | EqualsComparison
        | GreaterThanComparison
        | GreaterThanOrEqualsComparison
        | LessThanComparison
        | LessThanOrEqualsComparison
        | NotEqualsComparison
        | RangeComparison;
}
```

#### 属性

- <Optional/> exclude: boolean，设为`true`时，满足该属性条件的实体会被排除出查询结果。
- propertyId: string，要筛选的实体属性标识符。
- <Optional/> value: | boolean | string | EqualsComparison | GreaterThanComparison | GreaterThanOrEqualsComparison | LessThanComparison | LessThanOrEqualsComparison | NotEqualsComparison | RangeComparison，该属性需要满足的取值或比较条件，可直接传入布尔值或字符串，也可传入`EqualsComparison`等比较对象。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
