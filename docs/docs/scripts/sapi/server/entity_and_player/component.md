---
sidebar_position: 4
---

# 实体组件

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录实体组件相关接口。

## 实体组件表

| 组件 | 组件类 | [脚本版本](../../version_table) |
| :--- | :--- | :---: |
| 可攀爬 | [`EntityCanClimbComponent`](#entitycanclimbcomponent-类) | `1.2.0` |
| 可飞行 | [`EntityCanFlyComponent`](#entitycanflycomponent-类) | `1.2.0` |
| 强力跳跃 | [`EntityCanPowerJumpComponent`](#entitycanpowerjumpcomponent-类) | `1.2.0` |
| 颜色 | [`EntityColorComponent`](#entitycolorcomponent-类) | `1.2.0` |
| 防火 | [`EntityFireImmuneComponent`](#entityfireimmunecomponent-类) | `1.2.0` |
| 液体漂浮 | [`EntityFloatsInLiquidComponent`](#entityfloatsinliquidcomponent-类) | `1.2.0` |
| 飞行速度 | [`EntityFlyingSpeedComponent`](#entityflyingspeedcomponent-类) | `1.2.0` |
| 摩擦力修正 | [`EntityFrictionModifierComponent`](#entityfrictionmodifiercomponent-类) | `1.2.0` |
| 物品栏 | [`EntityInventoryComponent`](#entityinventorycomponent-类) | `1.2.0` |
| 幼年 | [`EntityIsBabyComponent`](#entityisbabycomponent-类) | `1.2.0` |
| 充能 | [`EntityIsChargedComponent`](#entityischargedcomponent-类) | `1.2.0` |
| 携带箱子 | [`EntityIsChestedComponent`](#entityischestedcomponent-类) | `1.2.0` |
| 可染色 | [`EntityIsDyeableComponent`](#entityisdyeablecomponent-类) | `1.2.0` |
| 隐身隐藏 | [`EntityIsHiddenWhenInvisibleComponent`](#entityishiddenwheninvisiblecomponent-类) | `1.2.0` |
| 点燃 | [`EntityIsIgnitedComponent`](#entityisignitedcomponent-类) | `1.2.0` |
| 灾厄队长 | [`EntityIsIllagerCaptainComponent`](#entityisillagercaptaincomponent-类) | `1.2.0` |
| 装备鞍 | [`EntityIsSaddledComponent`](#entityissaddledcomponent-类) | `1.2.0` |
| 抖动 | [`EntityIsShakingComponent`](#entityisshakingcomponent-类) | `1.2.0` |
| 剪毛 | [`EntityIsShearedComponent`](#entityisshearedcomponent-类) | `1.2.0` |
| 可堆叠 | [`EntityIsStackableComponent`](#entityisstackablecomponent-类) | `1.2.0` |
| 眩晕 | [`EntityIsStunnedComponent`](#entityisstunnedcomponent-类) | `1.2.0` |
| 已驯服 | [`EntityIsTamedComponent`](#entityistamedcomponent-类) | `1.2.0` |
| 物品 | [`EntityItemComponent`](#entityitemcomponent-类) | `1.2.0` |
| 标记变体 | [`EntityMarkVariantComponent`](#entitymarkvariantcomponent-类) | `1.2.0` |
| 两栖移动 | [`EntityMovementAmphibiousComponent`](#entitymovementamphibiouscomponent-类) | `1.2.0` |
| 基础移动 | [`EntityMovementBasicComponent`](#entitymovementbasiccomponent-类) | `1.2.0` |
| 飞行移动 | [`EntityMovementFlyComponent`](#entitymovementflycomponent-类) | `1.2.0` |
| 通用移动 | [`EntityMovementGenericComponent`](#entitymovementgenericcomponent-类) | `1.2.0` |
| 悬停移动 | [`EntityMovementHoverComponent`](#entitymovementhovercomponent-类) | `1.2.0` |
| 跳跃移动 | [`EntityMovementJumpComponent`](#entitymovementjumpcomponent-类) | `1.2.0` |
| 弹跳移动 | [`EntityMovementSkipComponent`](#entitymovementskipcomponent-类) | `1.2.0` |
| 可穿过 | [`EntityPushThroughComponent`](#entitypushthroughcomponent-类) | `1.2.0` |
| 缩放 | [`EntityScaleComponent`](#entityscalecomponent-类) | `1.2.0` |
| 皮肤 | [`EntitySkinIdComponent`](#entityskinidcomponent-类) | `1.2.0` |
| 变体 | [`EntityVariantComponent`](#entityvariantcomponent-类) | `1.2.0` |
| 想要骑乘 | [`EntityWantsJockeyComponent`](#entitywantsjockeycomponent-类) | `1.2.0` |
| 可治疗 | [`EntityHealableComponent`](#entityhealablecomponent-类) | `1.3.0` |
| 生命值 | [`EntityHealthComponent`](#entityhealthcomponent-类) | `1.3.0` |
| 装备栏 | [`EntityEquippableComponent`](#entityequippablecomponent-类) | `1.5.0` |
| 着火 | [`EntityOnFireComponent`](#entityonfirecomponent-类) | `1.9.0` |
| 弹射物 | [`EntityProjectileComponent`](#entityprojectilecomponent-类) | `1.10.0` |
| 类型族 | [`EntityTypeFamilyComponent`](#entitytypefamilycomponent-类) | `1.10.0` |
| 添加骑乘者 | [`EntityAddRiderComponent`](#entityaddridercomponent-类) | `1.11.0` |
| 第二颜色 | [`EntityColor2Component`](#entitycolor2component-类) | `1.11.0` |
| 攀爬导航 | [`EntityNavigationClimbComponent`](#entitynavigationclimbcomponent-类) | `1.11.0` |
| 漂浮导航 | [`EntityNavigationFloatComponent`](#entitynavigationfloatcomponent-类) | `1.11.0` |
| 飞行导航 | [`EntityNavigationFlyComponent`](#entitynavigationflycomponent-类) | `1.11.0` |
| 通用导航 | [`EntityNavigationGenericComponent`](#entitynavigationgenericcomponent-类) | `1.11.0` |
| 悬停导航 | [`EntityNavigationHoverComponent`](#entitynavigationhovercomponent-类) | `1.11.0` |
| 行走导航 | [`EntityNavigationWalkComponent`](#entitynavigationwalkcomponent-类) | `1.11.0` |
| 可骑乘 | [`EntityRideableComponent`](#entityrideablecomponent-类) | `1.11.0` |
| 骑乘中 | [`EntityRidingComponent`](#entityridingcomponent-类) | `1.11.0` |
| 驯服坐骑 | [`EntityTameMountComponent`](#entitytamemountcomponent-类) | `1.11.0` |
| 可成长 | [`EntityAgeableComponent`](#entityageablecomponent-类) | `1.12.0` |
| 熔岩移动 | [`EntityLavaMovementComponent`](#entitylavamovementcomponent-类) | `1.12.0` |
| 移动速度 | [`EntityMovementComponent`](#entitymovementcomponent-类) | `1.12.0` |
| 滑翔移动 | [`EntityMovementGlideComponent`](#entitymovementglidecomponent-类) | `1.12.0` |
| 摆动移动 | [`EntityMovementSwayComponent`](#entitymovementswaycomponent-类) | `1.12.0` |
| 可驯服 | [`EntityTameableComponent`](#entitytameablecomponent-类) | `1.12.0` |
| 水下移动 | [`EntityUnderwaterMovementComponent`](#entityunderwatermovementcomponent-类) | `1.12.0` |
| 可拴绳 | [`EntityLeashableComponent`](#entityleashablecomponent-类) | `1.13.0` |
| 力量 | [`EntityStrengthComponent`](#entitystrengthcomponent-类) | `1.14.0` |
| 可呼吸 | [`EntityBreathableComponent`](#entitybreathablecomponent-类) | `1.15.0` |
| 疲劳度 | [`EntityExhaustionComponent`](#entityexhaustioncomponent-类) | `2.1.0` |
| 饥饿值 | [`EntityHungerComponent`](#entityhungercomponent-类) | `2.1.0` |
| 饱和度 | [`EntitySaturationComponent`](#entitysaturationcomponent-类) | `2.1.0` |
| 末影物品栏 | [`EntityEnderInventoryComponent`](#entityenderinventorycomponent-类) | `2.8.0` |
| NPC | [`EntityNpcComponent`](#entitynpccomponent-类) | `beta` |
| 光标物品栏 | [`PlayerCursorInventoryComponent`](#playercursorinventorycomponent-类) | `1.14.0` |

---

## 基类

### EntityComponent 类

<Version type="script" add="1.2.0"/>

实体组件的基类，其它实体组件均继承自它。

继承自[Component](../../server/general#component-类)。

```typescript
class EntityComponent extends Component {
    private constructor();
    readonly entity: Entity;
}
```

#### 属性

- <Version type="script" add="1.11.0" inline/> <ReadOnly/> entity: [Entity](../../server/entity_and_player/entity#entity-类)，拥有该组件的实体；实体被移除后为`undefined`。

### EntityComponentTypes 枚举

<Version type="script" add="1.10.0"/>

实体脚本组件的类型标识符。

```typescript
enum EntityComponentTypes {
    AddRider = "minecraft:addrider", // 添加骑乘者组件
    Ageable = "minecraft:ageable", // 可成长组件
    Breathable = "minecraft:breathable", // 可呼吸组件
    CanClimb = "minecraft:can_climb", // 可攀爬组件
    CanFly = "minecraft:can_fly", // 可飞行组件
    CanPowerJump = "minecraft:can_power_jump", // 可强力跳跃组件
    Color = "minecraft:color", // 颜色组件
    Color2 = "minecraft:color2", // 第二颜色组件
    CursorInventory = "minecraft:cursor_inventory", // 光标物品栏组件
    EnderInventory = "minecraft:ender_inventory", // 末影物品栏组件
    Equippable = "minecraft:equippable", // 装备栏组件
    FireImmune = "minecraft:fire_immune", // 防火组件
    FloatsInLiquid = "minecraft:floats_in_liquid", // 液体漂浮组件
    FlyingSpeed = "minecraft:flying_speed", // 飞行速度组件
    FrictionModifier = "minecraft:friction_modifier", // 摩擦力修正组件
    Healable = "minecraft:healable", // 可治疗组件
    Health = "minecraft:health", // 生命值组件
    Inventory = "minecraft:inventory", // 物品栏组件
    IsBaby = "minecraft:is_baby", // 幼年组件
    IsCharged = "minecraft:is_charged", // 充能组件
    IsChested = "minecraft:is_chested", // 携带箱子组件
    IsDyeable = "minecraft:is_dyeable", // 可染色组件
    IsHiddenWhenInvisible = "minecraft:is_hidden_when_invisible", // 隐身时隐藏组件
    IsIgnited = "minecraft:is_ignited", // 点燃组件
    IsIllagerCaptain = "minecraft:is_illager_captain", // 灾厄队长组件
    IsSaddled = "minecraft:is_saddled", // 装备鞍组件
    IsShaking = "minecraft:is_shaking", // 抖动组件
    IsSheared = "minecraft:is_sheared", // 已剪毛组件
    IsStackable = "minecraft:is_stackable", // 可堆叠组件
    IsStunned = "minecraft:is_stunned", // 眩晕组件
    IsTamed = "minecraft:is_tamed", // 已驯服组件
    Item = "minecraft:item", // 物品组件
    LavaMovement = "minecraft:lava_movement", // 熔岩移动组件
    Leashable = "minecraft:leashable", // 可拴绳组件
    MarkVariant = "minecraft:mark_variant", // 标记变体组件
    Movement = "minecraft:movement", // 移动组件
    MovementAmphibious = "minecraft:movement.amphibious", // 两栖移动组件
    MovementBasic = "minecraft:movement.basic", // 基础移动组件
    MovementFly = "minecraft:movement.fly", // 飞行移动组件
    MovementGeneric = "minecraft:movement.generic", // 通用移动组件
    MovementGlide = "minecraft:movement.glide", // 滑翔移动组件
    MovementHover = "minecraft:movement.hover", // 悬停移动组件
    MovementJump = "minecraft:movement.jump", // 跳跃移动组件
    MovementSkip = "minecraft:movement.skip", // 弹跳移动组件
    MovementSway = "minecraft:movement.sway", // 摆动移动组件
    NavigationClimb = "minecraft:navigation.climb", // 攀爬导航组件
    NavigationFloat = "minecraft:navigation.float", // 漂浮导航组件
    NavigationFly = "minecraft:navigation.fly", // 飞行导航组件
    NavigationGeneric = "minecraft:navigation.generic", // 通用导航组件
    NavigationHover = "minecraft:navigation.hover", // 悬停导航组件
    NavigationWalk = "minecraft:navigation.walk", // 行走导航组件
    OnFire = "minecraft:onfire", // 着火组件
    Exhaustion = "minecraft:player.exhaustion", // 疲劳度组件
    Hunger = "minecraft:player.hunger", // 饥饿值组件
    Saturation = "minecraft:player.saturation", // 饱和度组件
    Projectile = "minecraft:projectile", // 弹射物组件
    PushThrough = "minecraft:push_through", // 可穿过组件
    Rideable = "minecraft:rideable", // 可骑乘组件
    Riding = "minecraft:riding", // 正在骑乘组件
    Scale = "minecraft:scale", // 缩放组件
    SkinId = "minecraft:skin_id", // 皮肤 ID组件
    Strength = "minecraft:strength", // 力量组件
    Tameable = "minecraft:tameable", // 可驯服组件
    TameMount = "minecraft:tamemount", // 驯服坐骑组件
    TypeFamily = "minecraft:type_family", // 类型族组件
    UnderwaterMovement = "minecraft:underwater_movement", // 水下移动组件
    Variant = "minecraft:variant", // 变体组件
    WantsJockey = "minecraft:wants_jockey", // 想要骑乘组件
    Npc = "minecraft:npc", // NPC 组件
}
```

### EntityAttributeComponent 类

<Version type="script" add="1.3.0"/>

以数值为中心、可定义最小值、最大值与默认值的实体组件的基类。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityAttributeComponent extends EntityComponent {
    private constructor();
    readonly currentValue: number;
    readonly defaultValue: number;
    readonly effectiveMax: number;
    readonly effectiveMin: number;
    resetToDefaultValue(): void;
    resetToMaxValue(): void;
    resetToMinValue(): void;
    setCurrentValue(value: number): boolean;
}
```

#### 属性

- <ReadOnly/> currentValue: number，该属性在此实例上的当前值。
- <ReadOnly/> defaultValue: number，该属性默认的定义值。
- <ReadOnly/> effectiveMax: number，考虑其它环境组件或因素后，该属性的有效最大值。
- <ReadOnly/> effectiveMin: number，考虑其它环境组件或因素后，该属性的有效最小值。

#### resetToDefaultValue 方法

<RestrictedMode inline/>

```typescript
resetToDefaultValue(): void
```

#### resetToMaxValue 方法

<RestrictedMode inline/>

```typescript
resetToMaxValue(): void
```

#### resetToMinValue 方法

<RestrictedMode inline/>

```typescript
resetToMinValue(): void
```

#### setCurrentValue 方法

<RestrictedMode inline/>

```typescript
setCurrentValue(value: number): boolean
```

- value: number，要设置的当前值。

**返回值**：boolean，成功设置当前值时为`true`。

### EntityBaseMovementComponent 类

<Version type="script" add="1.2.0"/>

一组实体移动控制组件的基类。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityBaseMovementComponent extends EntityComponent {
    private constructor();
    readonly maxTurn: number;
}
```

#### 属性

- <ReadOnly/> maxTurn: number，该生物移动方式的最大转向速率。

### EntityNavigationComponent 类

<Version type="script" add="1.11.0"/>

实体导航组件的基类。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityNavigationComponent extends EntityComponent {
    private constructor();
    readonly avoidDamageBlocks: boolean;
    readonly avoidPortals: boolean;
    readonly avoidSun: boolean;
    readonly avoidWater: boolean;
    readonly canBreach: boolean;
    readonly canBreakDoors: boolean;
    readonly canFloat: boolean;
    readonly canJump: boolean;
    readonly canOpenDoors: boolean;
    readonly canOpenIronDoors: boolean;
    readonly canPassDoors: boolean;
    readonly canPathFromAir: boolean;
    readonly canPathOverLava: boolean;
    readonly canPathOverWater: boolean;
    readonly canSink: boolean;
    readonly canSwim: boolean;
    readonly canWalk: boolean;
    readonly canWalkInLava: boolean;
    readonly isAmphibious: boolean;
}
```

#### 属性

- <ReadOnly/> avoidDamageBlocks: boolean，寻路时是否避开会造成伤害的方块。
- <ReadOnly/> avoidPortals: boolean，寻路时是否避开传送门。
- <ReadOnly/> avoidSun: boolean，寻路时是否避开暴露在阳光下的方块。
- <ReadOnly/> avoidWater: boolean，寻路时是否避开水。
- <ReadOnly/> canBreach: boolean，能否像海豚那样跃出水面。
- <ReadOnly/> canBreakDoors: boolean，能否穿过并破坏关闭的门。
- <ReadOnly/> canFloat: boolean，能否漂浮。
- <ReadOnly/> canJump: boolean，能否跳上方块。
- <ReadOnly/> canOpenDoors: boolean，能否打开关闭的门并穿过。
- <ReadOnly/> canOpenIronDoors: boolean，能否打开关闭的铁门并穿过。
- <ReadOnly/> canPassDoors: boolean，能否穿过门。
- <ReadOnly/> canPathFromAir: boolean，能否在空中开始寻路。
- <ReadOnly/> canPathOverLava: boolean，能否在熔岩表面行进。
- <ReadOnly/> canPathOverWater: boolean，能否在水面行进。
- <ReadOnly/> canSink: boolean，在水中时是否会被重力拉下。
- <ReadOnly/> canSwim: boolean，能否在水中任意寻路。
- <ReadOnly/> canWalk: boolean，能否在水外地面行走。
- <ReadOnly/> canWalkInLava: boolean，能否像在地面行走那样在熔岩中行进。
- <ReadOnly/> isAmphibious: boolean，能否在地面行走或潜入水下。

---

## 实体生命值组件

### EntityHealthComponent 类

<Version type="script" add="1.3.0"/>

定义实体生命值的组件，封装`minecraft:health`属性。

继承自[EntityAttributeComponent](#entityattributecomponent-类)。

```typescript
class EntityHealthComponent extends EntityAttributeComponent {
    private constructor();
    static readonly componentId = 'minecraft:health';
}
```

---

## 实体饥饿值组件

### EntityHungerComponent 类

<Version type="script" add="2.1.0"/>

定义实体饥饿值的组件，封装`minecraft:player.hunger`属性。

继承自[EntityAttributeComponent](#entityattributecomponent-类)。

```typescript
class EntityHungerComponent extends EntityAttributeComponent {
    private constructor();
    static readonly componentId = 'minecraft:player.hunger';
}
```

---

## 实体饱和度组件

### EntitySaturationComponent 类

<Version type="script" add="2.1.0"/>

定义实体饱和度的组件，封装`minecraft:player.saturation`属性。

继承自[EntityAttributeComponent](#entityattributecomponent-类)。

```typescript
class EntitySaturationComponent extends EntityAttributeComponent {
    private constructor();
    static readonly componentId = 'minecraft:player.saturation';
}
```

---

## 实体疲劳度组件

### EntityExhaustionComponent 类

<Version type="script" add="2.1.0"/>

定义实体疲劳度的组件，封装`minecraft:player.exhaustion`属性。

继承自[EntityAttributeComponent](#entityattributecomponent-类)。

```typescript
class EntityExhaustionComponent extends EntityAttributeComponent {
    private constructor();
    static readonly componentId = 'minecraft:player.exhaustion';
}
```

---

## 实体力量组件

### EntityStrengthComponent 类

<Version type="script" add="1.14.0"/>

定义实体携带物品能力的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityStrengthComponent extends EntityComponent {
    private constructor();
    readonly max: number;
    readonly value: number;
    static readonly componentId = 'minecraft:strength';
}
```

#### 属性

- <ReadOnly/> max: number，该实体的最大力量，由实体类型定义决定。
- <ReadOnly/> value: number，该实体当前的力量值。

---

## 实体移动速度组件

### EntityMovementComponent 类

<Version type="script" add="1.12.0"/>

定义实体整体移动速度的组件。

继承自[EntityAttributeComponent](#entityattributecomponent-类)。

```typescript
class EntityMovementComponent extends EntityAttributeComponent {
    private constructor();
    static readonly componentId = 'minecraft:movement';
}
```

---

## 实体水下移动组件

### EntityUnderwaterMovementComponent 类

<Version type="script" add="1.12.0"/>

定义实体在水下移动速度的组件。

继承自[EntityAttributeComponent](#entityattributecomponent-类)。

```typescript
class EntityUnderwaterMovementComponent extends EntityAttributeComponent {
    private constructor();
    static readonly componentId = 'minecraft:underwater_movement';
}
```

---

## 实体熔岩移动组件

### EntityLavaMovementComponent 类

<Version type="script" add="1.12.0"/>

定义实体在熔岩中移动速度的组件。

继承自[EntityAttributeComponent](#entityattributecomponent-类)。

```typescript
class EntityLavaMovementComponent extends EntityAttributeComponent {
    private constructor();
    static readonly componentId = 'minecraft:lava_movement';
}
```

---

## 实体两栖移动组件

### EntityMovementAmphibiousComponent 类

<Version type="script" add="1.2.0"/>

使生物能在水中游泳、在陆地上行走的移动控制组件。

继承自[EntityBaseMovementComponent](#entitybasemovementcomponent-类)。

```typescript
class EntityMovementAmphibiousComponent extends EntityBaseMovementComponent {
    private constructor();
    static readonly componentId = 'minecraft:movement.amphibious';
}
```

---

## 实体基础移动组件

### EntityMovementBasicComponent 类

<Version type="script" add="1.2.0"/>

强调实体移动的移动控制组件。

继承自[EntityBaseMovementComponent](#entitybasemovementcomponent-类)。

```typescript
class EntityMovementBasicComponent extends EntityBaseMovementComponent {
    private constructor();
    static readonly componentId = 'minecraft:movement.basic';
}
```

---

## 实体飞行移动组件

### EntityMovementFlyComponent 类

<Version type="script" add="1.2.0"/>

使生物飞行的移动控制组件。

继承自[EntityBaseMovementComponent](#entitybasemovementcomponent-类)。

```typescript
class EntityMovementFlyComponent extends EntityBaseMovementComponent {
    private constructor();
    static readonly componentId = 'minecraft:movement.fly';
}
```

---

## 实体通用移动组件

### EntityMovementGenericComponent 类

<Version type="script" add="1.2.0"/>

使生物能飞行、游泳、攀爬等的通用移动控制组件。

继承自[EntityBaseMovementComponent](#entitybasemovementcomponent-类)。

```typescript
class EntityMovementGenericComponent extends EntityBaseMovementComponent {
    private constructor();
    static readonly componentId = 'minecraft:movement.generic';
}
```

---

## 实体滑翔移动组件

### EntityMovementGlideComponent 类

<Version type="script" add="1.12.0"/>

使生物滑翔的移动控制组件。

继承自[EntityBaseMovementComponent](#entitybasemovementcomponent-类)。

```typescript
class EntityMovementGlideComponent extends EntityBaseMovementComponent {
    private constructor();
    readonly speedWhenTurning: number;
    readonly startSpeed: number;
    static readonly componentId = 'minecraft:movement.glide';
}
```

#### 属性

- <ReadOnly/> speedWhenTurning: number，实体转向时生效的速度。
- <ReadOnly/> startSpeed: number，滑翔开始时的速度。

---

## 实体悬停移动组件

### EntityMovementHoverComponent 类

<Version type="script" add="1.2.0"/>

使生物悬停的移动控制组件。

继承自[EntityBaseMovementComponent](#entitybasemovementcomponent-类)。

```typescript
class EntityMovementHoverComponent extends EntityBaseMovementComponent {
    private constructor();
    static readonly componentId = 'minecraft:movement.hover';
}
```

---

## 实体跳跃移动组件

### EntityMovementJumpComponent 类

<Version type="script" add="1.2.0"/>

使生物按指定间隔跳跃移动的移动控制组件。

继承自[EntityBaseMovementComponent](#entitybasemovementcomponent-类)。

```typescript
class EntityMovementJumpComponent extends EntityBaseMovementComponent {
    private constructor();
    static readonly componentId = 'minecraft:movement.jump';
}
```

---

## 实体弹跳移动组件

### EntityMovementSkipComponent 类

<Version type="script" add="1.2.0"/>

使生物蹦跳前进的移动控制组件。

继承自[EntityBaseMovementComponent](#entitybasemovementcomponent-类)。

```typescript
class EntityMovementSkipComponent extends EntityBaseMovementComponent {
    private constructor();
    static readonly componentId = 'minecraft:movement.skip';
}
```

---

## 实体摆动移动组件

### EntityMovementSwayComponent 类

<Version type="script" add="1.12.0"/>

使生物左右摇摆前进的移动控制组件。

继承自[EntityBaseMovementComponent](#entitybasemovementcomponent-类)。

```typescript
class EntityMovementSwayComponent extends EntityBaseMovementComponent {
    private constructor();
    readonly swayAmplitude: number;
    readonly swayFrequency: number;
    static readonly componentId = 'minecraft:movement.sway';
}
```

#### 属性

- <ReadOnly/> swayAmplitude: number，摆动运动的振幅。
- <ReadOnly/> swayFrequency: number，摆动运动的频率。

---

## 实体飞行速度组件

### EntityFlyingSpeedComponent 类

<Version type="script" add="1.2.0"/>

表示实体飞行速度的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityFlyingSpeedComponent extends EntityComponent {
    private constructor();
    value: number;
    static readonly componentId = 'minecraft:flying_speed';
}
```

#### 属性

- <RestrictedMode inline/> value: number，关联实体的飞行速度当前值。

---

## 实体摩擦力修正组件

### EntityFrictionModifierComponent 类

<Version type="script" add="1.2.0"/>

定义摩擦力对实体影响程度的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityFrictionModifierComponent extends EntityComponent {
    private constructor();
    readonly value: number;
    static readonly componentId = 'minecraft:friction_modifier';
}
```

#### 属性

- <ReadOnly/> value: number，关联实体的摩擦力修正当前值。

---

## 实体攀爬导航组件

### EntityNavigationClimbComponent 类

<Version type="script" add="1.11.0"/>

使实体能沿垂直墙面寻路的导航组件。

继承自[EntityNavigationComponent](#entitynavigationcomponent-类)。

```typescript
class EntityNavigationClimbComponent extends EntityNavigationComponent {
    private constructor();
    static readonly componentId = 'minecraft:navigation.climb';
}
```

---

## 实体漂浮导航组件

### EntityNavigationFloatComponent 类

<Version type="script" add="1.11.0"/>

使实体能在空中漂浮飞行的导航组件。

继承自[EntityNavigationComponent](#entitynavigationcomponent-类)。

```typescript
class EntityNavigationFloatComponent extends EntityNavigationComponent {
    private constructor();
    static readonly componentId = 'minecraft:navigation.float';
}
```

---

## 实体飞行导航组件

### EntityNavigationFlyComponent 类

<Version type="script" add="1.11.0"/>

使实体能在空中飞行的导航组件。

继承自[EntityNavigationComponent](#entitynavigationcomponent-类)。

```typescript
class EntityNavigationFlyComponent extends EntityNavigationComponent {
    private constructor();
    static readonly componentId = 'minecraft:navigation.fly';
}
```

---

## 实体通用导航组件

### EntityNavigationGenericComponent 类

<Version type="script" add="1.11.0"/>

使实体能通过行走、游泳、飞行、攀爬等方式寻路的通用导航组件。

继承自[EntityNavigationComponent](#entitynavigationcomponent-类)。

```typescript
class EntityNavigationGenericComponent extends EntityNavigationComponent {
    private constructor();
    static readonly componentId = 'minecraft:navigation.generic';
}
```

---

## 实体悬停导航组件

### EntityNavigationHoverComponent 类

<Version type="script" add="1.11.0"/>

使实体能在空中悬停的导航组件。

继承自[EntityNavigationComponent](#entitynavigationcomponent-类)。

```typescript
class EntityNavigationHoverComponent extends EntityNavigationComponent {
    private constructor();
    static readonly componentId = 'minecraft:navigation.hover';
}
```

---

## 实体行走导航组件

### EntityNavigationWalkComponent 类

<Version type="script" add="1.11.0"/>

使实体能在地面行走并跳跃的导航组件。

继承自[EntityNavigationComponent](#entitynavigationcomponent-类)。

```typescript
class EntityNavigationWalkComponent extends EntityNavigationComponent {
    private constructor();
    static readonly componentId = 'minecraft:navigation.walk';
}
```

---

## 实体装备栏组件

### EntityEquippableComponent 类

<Version type="script" add="1.5.0"/>

实体的装备栏组件，用于读取与设置实体各装备槽位的装备。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityEquippableComponent extends EntityComponent {
    private constructor();
    readonly totalArmor: number;
    readonly totalToughness: number;
    static readonly componentId = 'minecraft:equippable';
    getEquipment(equipmentSlot: EquipmentSlot): ItemStack | undefined;
    getEquipmentSlot(equipmentSlot: EquipmentSlot): ContainerSlot;
    setEquipment(equipmentSlot: EquipmentSlot, itemStack?: ItemStack): boolean;
}
```

#### 属性

- <Version type="script" add="2.1.0" inline/> <ReadOnly/> totalArmor: number，拥有者的总盔甲值。
- <Version type="script" add="2.1.0" inline/> <ReadOnly/> totalToughness: number，拥有者的总盔甲韧性值。

#### getEquipment 方法

```typescript
getEquipment(equipmentSlot: EquipmentSlot): ItemStack | undefined
```

- equipmentSlot: [EquipmentSlot](#equipmentslot-枚举)，要查询的装备槽位。

**返回值**：[ItemStack](../../server/item/main#itemstack-类) | undefined，装备在指定槽位的物品；该槽位为空时为`undefined`。

#### getEquipmentSlot 方法

<Version type="script" add="1.9.0" inline/>

```typescript
getEquipmentSlot(equipmentSlot: EquipmentSlot): ContainerSlot
```

- equipmentSlot: [EquipmentSlot](#equipmentslot-枚举)，要获取容器槽位的装备槽位。

**返回值**：[ContainerSlot](../../server/item/container#containerslot-类)，对应指定装备槽位的容器槽位。

#### setEquipment 方法

<RestrictedMode inline/>

```typescript
setEquipment(equipmentSlot: EquipmentSlot, itemStack?: ItemStack): boolean
```

- equipmentSlot: [EquipmentSlot](#equipmentslot-枚举)，要替换装备的槽位。
- itemStack?: [ItemStack](../../server/item/main#itemstack-类)，要装备的物品（可选）；省略时清空该槽位。

**返回值**：boolean，成功替换装备时为`true`。

### EquipmentSlot 枚举

<Version type="script" add="1.5.0"/>

实体的装备槽位。

```typescript
enum EquipmentSlot {
    Chest = "Chest", // 胸甲槽，用于放置胸甲、鞘翅等物品
    Feet = "Feet", // 鞋子槽，用于放置靴子等物品
    Head = "Head", // 头盔槽，用于放置头盔、雕刻过的南瓜等物品
    Legs = "Legs", // 护腿槽，用于放置护腿等物品
    Mainhand = "Mainhand", // 主手槽
    Offhand = "Offhand", // 副手槽，用于放置盾牌等物品
    Body = "Body", // 身体槽
}
```

---

## 实体添加骑乘者组件

### EntityAddRiderComponent 类

<Version type="script" add="1.11.0"/>

使实体生成时带一名指定类型的骑乘者的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityAddRiderComponent extends EntityComponent {
    private constructor();
    readonly entityType: string;
    readonly spawnEvent: string;
    static readonly componentId = 'minecraft:addrider';
}
```

#### 属性

- <ReadOnly/> entityType: string，该实体生成时作为骑乘者添加的实体类型。
- <ReadOnly/> spawnEvent: string，骑乘者生成时触发的生成事件（可选）。

---

## 实体可骑乘组件

### EntityRideableComponent 类

<Version type="script" add="1.11.0"/>

使实体可被其它实体骑乘的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityRideableComponent extends EntityComponent {
    private constructor();
    readonly controllingSeat: number;
    readonly crouchingSkipInteract: boolean;
    readonly interactText: string;
    readonly passengerMaxWidth: number;
    readonly pullInEntities: boolean;
    readonly riderCanInteract: boolean;
    readonly seatCount: number;
    static readonly componentId = 'minecraft:rideable';
    addRider(rider: Entity): boolean;
    ejectRider(rider: Entity): void;
    ejectRiders(): void;
    getFamilyTypes(): string[];
    getRiders(): Entity[];
    getSeats(): Seat[];
}
```

#### 属性

- <ReadOnly/> controllingSeat: number，可用于控制该实体的座位索引（从 0 开始）。
- <ReadOnly/> crouchingSkipInteract: boolean，实体蹲下时是否跳过交互。
- <ReadOnly/> interactText: string，玩家看向该实体准备骑乘时显示的文本。
- <ReadOnly/> passengerMaxWidth: number，可作为乘客的生物的最大宽度。
- <ReadOnly/> pullInEntities: boolean，是否把处于正确`family_types`中的实体拉上座位。
- <ReadOnly/> riderCanInteract: boolean，骑乘者看向该实体时是否会被选中。
- <ReadOnly/> seatCount: number，该实体为骑乘者定义的座位数。

#### addRider 方法

<RestrictedMode inline/>

```typescript
addRider(rider: Entity): boolean
```

- rider: [Entity](../../server/entity_and_player/entity#entity-类)，要添加为骑乘者的实体。

**返回值**：boolean，骑乘者成功添加时为`true`。

#### ejectRider 方法

<RestrictedMode inline/>

```typescript
ejectRider(rider: Entity): void
```

- rider: [Entity](../../server/entity_and_player/entity#entity-类)，要赶下的骑乘者。

#### ejectRiders 方法

<RestrictedMode inline/>

```typescript
ejectRiders(): void
```

#### getFamilyTypes 方法

```typescript
getFamilyTypes(): string[]
```

**返回值**：string[]，该实体可支持的骑乘者实体类型字符串列表。

#### getRiders 方法

```typescript
getRiders(): Entity[]
```

**返回值**：[Entity](../../server/entity_and_player/entity#entity-类)[]，当前骑乘该实体的所有实体组成的数组。

#### getSeats 方法

```typescript
getSeats(): Seat[]
```

**返回值**：[Seat](#seat-类)[]，该实体各座位的位置与骑乘者数量列表。

### Seat 类

<Version type="script" add="1.11.0"/>

可骑乘实体上的一个座位。

```typescript
class Seat {
    private constructor();
    readonly lockRiderRotation: number;
    readonly maxRiderCount: number;
    readonly minRiderCount: number;
    readonly position: Vector3;
    readonly seatRotation: number;
}
```

#### 属性

- <ReadOnly/> lockRiderRotation: number，骑乘者骑乘时可旋转的角度，以度为单位。
- <ReadOnly/> maxRiderCount: number，该座位可支持的最大骑乘者数量。
- <ReadOnly/> minRiderCount: number，该座位位置可放置的最小骑乘者数量。
- <ReadOnly/> position: [Vector3](../../server/general#vector3-接口)，该座位相对实体位置的物理位置。
- <ReadOnly/> seatRotation: number，骑乘者旋转的角度，以度为单位。

---

## 实体骑乘中组件

### EntityRidingComponent 类

<Version type="script" add="1.11.0"/>

实体骑乘其它实体时会被添加的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityRidingComponent extends EntityComponent {
    private constructor();
    readonly entityRidingOn: Entity;
    static readonly componentId = 'minecraft:riding';
}
```

#### 属性

- <ReadOnly/> entityRidingOn: [Entity](../../server/entity_and_player/entity#entity-类)，该实体当前骑乘的实体。

---

## 实体驯服坐骑组件

### EntityTameMountComponent 类

<Version type="script" add="1.11.0"/>

根据骑乘者驯服可骑乘实体的相关选项。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityTameMountComponent extends EntityComponent {
    private constructor();
    readonly isTamed: boolean;
    readonly isTamedToPlayer: boolean;
    readonly tamedToPlayer?: Player;
    readonly tamedToPlayerId?: string;
    static readonly componentId = 'minecraft:tamemount';
    tame(showParticles: boolean): void;
    tameToPlayer(showParticles: boolean, player: Player): boolean;
}
```

#### 属性

- <Version type="script" add="1.12.0" inline/> <ReadOnly/> isTamed: boolean，该实体是否已被驯服。
- <Version type="script" add="1.12.0" inline/> <ReadOnly/> isTamedToPlayer: boolean，该实体是否已被玩家驯服。
- <Version type="script" add="1.12.0" inline/> <ReadOnly/> <Optional/> tamedToPlayer: [Player](../../server/entity_and_player/player#player-类)，驯服该实体的玩家；未被玩家驯服时为`undefined`。
- <Version type="script" add="1.12.0" inline/> <ReadOnly/> <Optional/> tamedToPlayerId: string，驯服该实体的玩家 ID；未被玩家驯服时为`undefined`。

#### tame 方法

<RestrictedMode inline/>

```typescript
tame(showParticles: boolean): void
```

- showParticles: boolean，驯服时是否显示粒子。

#### tameToPlayer 方法

<Version type="script" add="1.12.0" inline/> <RestrictedMode inline/>

```typescript
tameToPlayer(showParticles: boolean, player: Player): boolean
```

- showParticles: boolean，驯服时是否显示粒子。
- player: [Player](../../server/entity_and_player/player#player-类)，要驯服该实体的玩家。

**返回值**：boolean，成功被该玩家驯服时为`true`。

---

## 实体可驯服组件

### EntityTameableComponent 类

<Version type="script" add="1.12.0"/>

定义实体可被玩家驯服规则的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityTameableComponent extends EntityComponent {
    private constructor();
    readonly getTameItems: ItemStack[];
    readonly isTamed: boolean;
    readonly probability: number;
    readonly tamedToPlayer?: Player;
    readonly tamedToPlayerId?: string;
    static readonly componentId = 'minecraft:tameable';
    tame(player: Player): boolean;
}
```

#### 属性

- <ReadOnly/> getTameItems: [ItemStack](../../server/item/main#itemstack-类)[]，可用于驯服该实体的物品。
- <ReadOnly/> isTamed: boolean，该实体是否已被玩家驯服。
- <ReadOnly/> probability: number，每次使用物品驯服该实体的概率，取值 0.0~1.0。
- <ReadOnly/> <Optional/> tamedToPlayer: [Player](../../server/entity_and_player/player#player-类)，驯服该实体的玩家；未被玩家驯服时为`undefined`。
- <ReadOnly/> <Optional/> tamedToPlayerId: string，驯服该实体的玩家 ID；未被玩家驯服时为`undefined`。

#### tame 方法

<RestrictedMode inline/>

```typescript
tame(player: Player): boolean
```

- player: [Player](../../server/entity_and_player/player#player-类)，要驯服该实体的玩家。

**返回值**：boolean，成功被该玩家驯服时为`true`。

---

## 实体想要骑乘组件

### EntityWantsJockeyComponent 类

<Version type="script" add="1.2.0"/>

标识实体想要成为骑乘者的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityWantsJockeyComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:wants_jockey';
}
```

---

## 实体可拴绳组件

### EntityLeashableComponent 类

<Version type="script" add="1.13.0"/>

允许实体被拴绳拴住的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityLeashableComponent extends EntityComponent {
    private constructor();
    readonly canBeStolen: boolean;
    readonly hardDistance: number;
    readonly isLeashed: boolean;
    readonly leashHolder?: Entity;
    readonly leashHolderEntityId?: string;
    readonly maxDistance: number;
    readonly softDistance: number;
    static readonly componentId = 'minecraft:leashable';
    leashTo(leashHolder: Entity): void;
    unleash(): void;
}
```

#### 属性

- <ReadOnly/> canBeStolen: boolean，其它实体是否可通过牵走拴绳偷走该被拴实体。
- <ReadOnly/> hardDistance: number，拴绳绷紧并限制移动的距离，以方块为单位。
- <ReadOnly/> isLeashed: boolean，该实体是否已被拴住。
- <ReadOnly/> <Optional/> leashHolder: [Entity](../../server/entity_and_player/entity#entity-类)，牵着拴绳的实体。
- <ReadOnly/> <Optional/> leashHolderEntityId: string，牵着拴绳的实体标识符。
- <ReadOnly/> maxDistance: number，拴绳断裂的距离，以方块为单位。
- <ReadOnly/> softDistance: number，拴绳的弹性效果开始作用、保持该实体靠近的距离，以方块为单位。

#### leashTo 方法

<RestrictedMode inline/>

```typescript
leashTo(leashHolder: Entity): void
```

- leashHolder: [Entity](../../server/entity_and_player/entity#entity-类)，要拴住该实体的实体。

#### unleash 方法

<RestrictedMode inline/>

```typescript
unleash(): void
```

---

## 实体幼年组件

### EntityIsBabyComponent 类

<Version type="script" add="1.2.0"/>

标识实体处于幼年状态的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsBabyComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_baby';
}
```

---

## 实体充能组件

### EntityIsChargedComponent 类

<Version type="script" add="1.2.0"/>

标识实体处于充能状态的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsChargedComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_charged';
}
```

---

## 实体携带箱子组件

### EntityIsChestedComponent 类

<Version type="script" add="1.2.0"/>

标识实体当前携带箱子的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsChestedComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_chested';
}
```

---

## 实体可染色组件

### EntityIsDyeableComponent 类

<Version type="script" add="1.2.0"/>

标识实体可用染料改变颜色的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsDyeableComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_dyeable';
}
```

---

## 实体隐身隐藏组件

### EntityIsHiddenWhenInvisibleComponent 类

<Version type="script" add="1.2.0"/>

标识实体隐形时可对敌对生物隐藏的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsHiddenWhenInvisibleComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_hidden_when_invisible';
}
```

---

## 实体点燃组件

### EntityIsIgnitedComponent 类

<Version type="script" add="1.2.0"/>

标识实体当前着火的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsIgnitedComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_ignited';
}
```

---

## 实体灾厄队长组件

### EntityIsIllagerCaptainComponent 类

<Version type="script" add="1.2.0"/>

标识实体为灾厄队长的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsIllagerCaptainComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_illager_captain';
}
```

---

## 实体装备鞍组件

### EntityIsSaddledComponent 类

<Version type="script" add="1.2.0"/>

标识实体当前装备了鞍的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsSaddledComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_saddled';
}
```

---

## 实体抖动组件

### EntityIsShakingComponent 类

<Version type="script" add="1.2.0"/>

标识实体当前正在抖动的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsShakingComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_shaking';
}
```

---

## 实体剪毛组件

### EntityIsShearedComponent 类

<Version type="script" add="1.2.0"/>

标识实体当前已被剪毛的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsShearedComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_sheared';
}
```

---

## 实体可堆叠组件

### EntityIsStackableComponent 类

<Version type="script" add="1.2.0"/>

标识实体可被堆叠的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsStackableComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_stackable';
}
```

---

## 实体眩晕组件

### EntityIsStunnedComponent 类

<Version type="script" add="1.2.0"/>

标识实体当前处于眩晕状态的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsStunnedComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:is_stunned';
}
```

---

## 实体已驯服组件

### EntityIsTamedComponent 类

<Version type="script" add="1.2.0"/>

标识实体当前已被驯服的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityIsTamedComponent extends EntityComponent {
    private constructor();
    readonly tamedToPlayer?: Player;
    readonly tamedToPlayerId?: string;
    static readonly componentId = 'minecraft:is_tamed';
}
```

#### 属性

- <Version type="script" add="2.11.0" inline/> <ReadOnly/> <Optional/> tamedToPlayer: [Player](../../server/entity_and_player/player#player-类)，驯服该实体的玩家。
- <Version type="script" add="2.11.0" inline/> <ReadOnly/> <Optional/> tamedToPlayerId: string，驯服该实体的玩家 ID。

---

## 实体物品栏组件

### EntityInventoryComponent 类

<Version type="script" add="1.2.0"/>

定义实体物品栏属性的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityInventoryComponent extends EntityComponent {
    private constructor();
    readonly additionalSlotsPerStrength: number;
    readonly canBeSiphonedFrom: boolean;
    readonly container: Container;
    readonly containerType: string;
    readonly inventorySize: number;
    readonly "private": boolean;
    readonly restrictToOwner: boolean;
    static readonly componentId = 'minecraft:inventory';
}
```

#### 属性

- <ReadOnly/> additionalSlotsPerStrength: number，每增加一点力量可额外获得的槽位数。
- <ReadOnly/> canBeSiphonedFrom: boolean，物品栏内容是否可被漏斗抽出。
- <ReadOnly/> container: [Container](../../server/item/container#container-类)，该实体的容器；实体没有容器时为`undefined`。
- <ReadOnly/> containerType: string，该实体拥有的容器类型。
- <ReadOnly/> inventorySize: number，容器的槽位数。
- <ReadOnly/> "private": boolean，该实体死亡时是否不掉落物品栏。
- <ReadOnly/> restrictToOwner: boolean，物品栏是否只能由拥有者或实体自身访问。

---

## 实体末影物品栏组件

### EntityEnderInventoryComponent 类

<Version type="script" add="2.8.0"/>

表示实体末影物品栏属性的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityEnderInventoryComponent extends EntityComponent {
    private constructor();
    readonly container: Container;
    static readonly componentId = 'minecraft:ender_inventory';
}
```

#### 属性

- <ReadOnly/> container: [Container](../../server/item/container#container-类)，该实体的末影物品栏容器；容器尚未加载时为`undefined`。

---

## 实体物品组件

### EntityItemComponent 类

<Version type="script" add="1.2.0"/>

表示世界中由该实体代表的物品堆叠的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityItemComponent extends EntityComponent {
    private constructor();
    readonly itemStack: ItemStack;
    static readonly componentId = 'minecraft:item';
}
```

#### 属性

- <ReadOnly/> itemStack: [ItemStack](../../server/item/main#itemstack-类)，该实体在世界上代表的物品堆叠。

---

## 实体颜色组件

### EntityColorComponent 类

<Version type="script" add="1.2.0"/>

定义实体颜色的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityColorComponent extends EntityComponent {
    private constructor();
    value: number;
    static readonly componentId = 'minecraft:color';
}
```

#### 属性

- <RestrictedMode inline/> value: number，该颜色的值。

---

## 实体第二颜色组件

### EntityColor2Component 类

<Version type="script" add="1.11.0"/>

定义实体第二颜色的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityColor2Component extends EntityComponent {
    private constructor();
    readonly value: PaletteColor;
    static readonly componentId = 'minecraft:color2';
}
```

#### 属性

- <ReadOnly/> value: [PaletteColor](#palettecolor-枚举)，该第二颜色的值。

### PaletteColor 枚举

<Version type="script" add="1.11.0"/>

调色板颜色。

```typescript
enum PaletteColor {
    White = 0,
    Orange = 1,
    Magenta = 2,
    LightBlue = 3,
    Yellow = 4,
    Lime = 5,
    Pink = 6,
    Gray = 7,
    Silver = 8,
    Cyan = 9,
    Purple = 10,
    Blue = 11,
    Brown = 12,
    Green = 13,
    Red = 14,
    Black = 15,
}
```

---

## 实体标记变体组件

### EntityMarkVariantComponent 类

<Version type="script" add="1.2.0"/>

实体的标记变体值组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityMarkVariantComponent extends EntityComponent {
    private constructor();
    readonly value: number;
    static readonly componentId = 'minecraft:mark_variant';
}
```

#### 属性

- <ReadOnly/> value: number，该实体标记变体的值。

---

## 实体变体组件

### EntityVariantComponent 类

<Version type="script" add="1.2.0"/>

用于区分同一实体不同变体的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityVariantComponent extends EntityComponent {
    private constructor();
    readonly value: number;
    static readonly componentId = 'minecraft:variant';
}
```

#### 属性

- <ReadOnly/> value: number，该实体当前变体的值。

---

## 实体皮肤组件

### EntitySkinIdComponent 类

<Version type="script" add="1.2.0"/>

实体皮肤 ID 组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntitySkinIdComponent extends EntityComponent {
    private constructor();
    readonly value: number;
    static readonly componentId = 'minecraft:skin_id';
}
```

#### 属性

- <ReadOnly/> value: number，该实体皮肤 ID 的值。

---

## 实体缩放组件

### EntityScaleComponent 类

<Version type="script" add="1.2.0"/>

设置实体视觉大小的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityScaleComponent extends EntityComponent {
    private constructor();
    readonly value: number;
    static readonly componentId = 'minecraft:scale';
}
```

#### 属性

- <ReadOnly/> value: number，该实体当前的缩放值。

---

## 实体类型族组件

### EntityTypeFamilyComponent 类

<Version type="script" add="1.10.0"/>

实体类型族组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityTypeFamilyComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:type_family';
    getTypeFamilies(): string[];
    hasTypeFamily(typeFamily: string): boolean;
}
```

#### getTypeFamilies 方法

```typescript
getTypeFamilies(): string[]
```

**返回值**：string[]，该实体所属的类型族列表。

#### hasTypeFamily 方法

```typescript
hasTypeFamily(typeFamily: string): boolean
```

- typeFamily: string，要检查的类型族。

**返回值**：boolean，该实体属于指定类型族时为`true`。

---

## 实体可成长组件

### EntityAgeableComponent 类

<Version type="script" add="1.12.0"/>

为实体添加成长计时器的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityAgeableComponent extends EntityComponent {
    private constructor();
    readonly duration: number;
    readonly growUp: Trigger;
    readonly transformToItem: string;
    static readonly componentId = 'minecraft:ageable';
    getDropItems(): string[];
    getFeedItems(): EntityDefinitionFeedItem[];
}
```

#### 属性

- <ReadOnly/> duration: number，实体长大前的时间；-1 表示永远是幼年。
- <ReadOnly/> growUp: [Trigger](#trigger-类)，该实体长大时触发的事件。
- <ReadOnly/> transformToItem: string，成功喂食后，使用的饲料会转换成的物品。

#### getDropItems 方法

```typescript
getDropItems(): string[]
```

**返回值**：string[]，该实体长大时掉落的物品列表。

#### getFeedItems 方法

```typescript
getFeedItems(): EntityDefinitionFeedItem[]
```

**返回值**：[EntityDefinitionFeedItem](#entitydefinitionfeeditem-类)[]，可喂给该实体的物品列表。

### EntityDefinitionFeedItem 类

<Version type="script" add="1.12.0"/>

描述可喂给实体的物品。

```typescript
class EntityDefinitionFeedItem {
    private constructor();
    readonly growth: number;
    readonly item: string;
    readonly resultItem?: string;
}
```

#### 属性

- <ReadOnly/> growth: number，喂食该物品后实体年龄的增加量。
- <ReadOnly/> item: string，可喂食的物品类型标识符。
- <Version type="script" add="2.6.0" inline/> <ReadOnly/> <Optional/> resultItem: string，喂食后产生的物品类型 ID。

### Trigger 类

<Version type="script" add="1.12.0"/>

实体触发器，用于定义在特定事件发生时执行的命令。

```typescript
class Trigger {
    constructor(eventName: string);
    eventName: string;
}
```

#### 属性

- eventName: string，该触发器的事件名称。

---

## 实体可呼吸组件

### EntityBreathableComponent 类

<Version type="script" add="1.15.0"/>

定义实体可在哪些方块中呼吸的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityBreathableComponent extends EntityComponent {
    private constructor();
    readonly breathesAir: boolean;
    readonly breathesLava: boolean;
    readonly breathesSolids: boolean;
    readonly breathesWater: boolean;
    readonly generatesBubbles: boolean;
    readonly inhaleTime: number;
    readonly suffocateTime: number;
    readonly totalSupply: number;
    static readonly componentId = 'minecraft:breathable';
    getBreatheBlocks(): BlockPermutation[];
    getNonBreatheBlocks(): BlockPermutation[];
    airSupply: number;
    readonly canBreathe: boolean;
}
```

#### 属性

- <ReadOnly/> breathesAir: boolean，为`true`时，该实体能在空气中呼吸。
- <ReadOnly/> breathesLava: boolean，为`true`时，该实体能在熔岩中呼吸。
- <ReadOnly/> breathesSolids: boolean，为`true`时，该实体能在固体方块中呼吸。
- <ReadOnly/> breathesWater: boolean，为`true`时，该实体能在水中呼吸。
- <ReadOnly/> generatesBubbles: boolean，为`true`时，该实体在水中会显示气泡。
- <ReadOnly/> inhaleTime: number，呼吸值恢复到最大所需的时间，以秒为单位。
- <ReadOnly/> suffocateTime: number，两次窒息伤害之间的时间，以秒为单位。
- <ReadOnly/> totalSupply: number，该实体可屏息的时间，以秒为单位。
- <Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/> airSupply: number，当前空气供给。
- <Version type="script" experimental="测试版API" inline/> <ReadOnly/> canBreathe: boolean，是否可呼吸。

#### getBreatheBlocks 方法

```typescript
getBreatheBlocks(): BlockPermutation[]
```

**返回值**：[BlockPermutation](../../server/block/main#blockpermutation-类)[]，除各呼吸属性外，该实体还能在其中呼吸的方块列表。

#### getNonBreatheBlocks 方法

```typescript
getNonBreatheBlocks(): BlockPermutation[]
```

**返回值**：[BlockPermutation](../../server/block/main#blockpermutation-类)[]，该实体无法在其中呼吸的方块列表。

---

## 实体可攀爬组件

### EntityCanClimbComponent 类

<Version type="script" add="1.2.0"/>

标识实体可以攀爬梯子的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityCanClimbComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:can_climb';
}
```

---

## 实体可飞行组件

### EntityCanFlyComponent 类

<Version type="script" add="1.2.0"/>

标识实体可以飞行的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityCanFlyComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:can_fly';
}
```

---

## 实体强力跳跃组件

### EntityCanPowerJumpComponent 类

<Version type="script" add="1.2.0"/>

标识实体可像马一样强力跳跃的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityCanPowerJumpComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:can_power_jump';
}
```

---

## 实体防火组件

### EntityFireImmuneComponent 类

<Version type="script" add="1.2.0"/>

标识实体不受火焰伤害的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityFireImmuneComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:fire_immune';
}
```

---

## 实体液体漂浮组件

### EntityFloatsInLiquidComponent 类

<Version type="script" add="1.2.0"/>

标识实体可在液体方块中漂浮的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityFloatsInLiquidComponent extends EntityComponent {
    private constructor();
    static readonly componentId = 'minecraft:floats_in_liquid';
}
```

---

## 实体可治疗组件

### EntityHealableComponent 类

<Version type="script" add="1.3.0"/>

定义实体治疗方式的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityHealableComponent extends EntityComponent {
    private constructor();
    readonly forceUse: boolean;
    static readonly componentId = 'minecraft:healable';
    getFeedItems(): FeedItem[];
}
```

#### 属性

- <ReadOnly/> forceUse: boolean，实体满生命值时是否仍可使用该物品。

#### getFeedItems 方法

```typescript
getFeedItems(): FeedItem[]
```

**返回值**：[FeedItem](#feeditem-类)[]，可治疗该实体的物品集合。

### FeedItem 类

<Version type="script" add="1.3.0"/>

描述可喂给实体以治疗它的物品。

```typescript
class FeedItem {
    private constructor();
    readonly healAmount: number;
    readonly item: string;
    readonly resultItem?: string;
    getEffects(): FeedItemEffect[];
}
```

#### 属性

- <ReadOnly/> healAmount: number，喂食该物品后实体恢复的生命值。
- <ReadOnly/> item: string，可喂食的物品类型标识符。
- <Version type="script" add="2.6.0" inline/> <ReadOnly/> <Optional/> resultItem: string，喂食后产生的物品类型 ID。

#### getEffects 方法

```typescript
getEffects(): FeedItemEffect[]
```

**返回值**：[FeedItemEffect](#feeditemeffect-类)[]，喂食后可能产生的附加状态效果集合。

### FeedItemEffect 类

<Version type="script" add="1.3.0"/>

喂食实体后可能产生的附加状态效果。

```typescript
class FeedItemEffect {
    private constructor();
    readonly amplifier: number;
    readonly chance: number;
    readonly duration: number;
    readonly name: string;
}
```

#### 属性

- <ReadOnly/> amplifier: number，该状态效果被施加的等级。
- <ReadOnly/> chance: number，实体被喂食后应用该状态效果的概率。
- <ReadOnly/> duration: number，该状态效果的持续时长，以游戏刻为单位。
- <ReadOnly/> name: string，要应用的状态效果标识符。

---

## 实体着火组件

### EntityOnFireComponent 类

<Version type="script" add="1.9.0"/>

表示实体着火状态的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityOnFireComponent extends EntityComponent {
    private constructor();
    readonly onFireTicksRemaining: number;
    static readonly componentId = 'minecraft:onfire';
}
```

#### 属性

- <ReadOnly/> onFireTicksRemaining: number，火焰熄灭前剩余的持续时间，以游戏刻为单位。

---

## 实体弹射物组件

### EntityProjectileComponent 类

<Version type="script" add="1.10.0"/>

表示实体为弹射物的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityProjectileComponent extends EntityComponent {
    private constructor();
    airInertia: number;
    catchFireOnHurt: boolean;
    critParticlesOnProjectileHurt: boolean;
    destroyOnProjectileHurt: boolean;
    gravity: number;
    hitEntitySound?: string;
    hitGroundSound?: string;
    hitParticle?: string;
    lightningStrikeOnHit: boolean;
    liquidInertia: number;
    onFireTime: number;
    owner?: Entity;
    shouldBounceOnHit: boolean;
    stopOnHit: boolean;
    static readonly componentId = 'minecraft:projectile';
    shoot(velocity: Vector3, options?: ProjectileShootOptions): void;
}
```

#### 属性

- <RestrictedMode inline/> airInertia: number，在空中飞行时，弹射物每游戏刻保留的速度比例。
- <RestrictedMode inline/> catchFireOnHurt: boolean，为`true`时，弹射物受伤后会被点燃。
- <RestrictedMode inline/> critParticlesOnProjectileHurt: boolean，为`true`时，弹射物被玩家击中会生成暴击粒子。
- <RestrictedMode inline/> destroyOnProjectileHurt: boolean，为`true`时，弹射物受伤后会被摧毁。
- <RestrictedMode inline/> gravity: number，施加在弹射物上的重力。
- <RestrictedMode inline/> <Optional/> hitEntitySound: string，弹射物击中实体时播放的声音。
- <RestrictedMode inline/> <Optional/> hitGroundSound: string，弹射物击中方块时播放的声音。
- <RestrictedMode inline/> <Optional/> hitParticle: string，弹射物击中物体时生成的粒子。
- <RestrictedMode inline/> lightningStrikeOnHit: boolean，为`true`且雷雨天有视线时，弹射物命中会引发闪电。
- <RestrictedMode inline/> liquidInertia: number，在液体中飞行时，弹射物每游戏刻保留的速度比例。
- <RestrictedMode inline/> onFireTime: number，`catchFireOnHurt`触发时，被击中实体的着火时长，以秒为单位。
- <RestrictedMode inline/> <Optional/> owner: [Entity](../../server/entity_and_player/entity#entity-类)，弹射物的所有者，用于判断弹射物能击中谁。
- <RestrictedMode inline/> shouldBounceOnHit: boolean，为`true`时，弹射物未造成伤害时会从生物身上弹开。
- <RestrictedMode inline/> stopOnHit: boolean，为`true`时，弹射物击中实体会停止移动。

#### shoot 方法

<RestrictedMode inline/>

```typescript
shoot(velocity: Vector3, options?: ProjectileShootOptions): void
```

- velocity: [Vector3](../../server/general#vector3-接口)，弹射物发射的速度。
- options?: [ProjectileShootOptions](#projectileshootoptions-接口)，发射时的选项（可选）。

### ProjectileShootOptions 接口

<Version type="script" add="1.10.0"/>

弹射物发射时的选项。

```typescript
interface ProjectileShootOptions {
    uncertainty?: number;
}
```

#### 属性

- <Optional/> uncertainty: number，弹射物发射方向的不确定性（可选）。

---

## 实体可穿过组件

### EntityPushThroughComponent 类

<Version type="script" add="1.2.0"/>

设置实体可穿行距离的组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityPushThroughComponent extends EntityComponent {
    private constructor();
    readonly value: number;
    static readonly componentId = 'minecraft:push_through';
}
```

#### 属性

- <ReadOnly/> value: number，该实体可穿行距离的值。

---

## 实体NPC组件

### EntityNpcComponent 类

<Version type="script" experimental="测试版API"/>

实体 NPC 组件。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class EntityNpcComponent extends EntityComponent {
    private constructor();
    defaultScene: string;
    name: string;
    skinIndex: number;
    static readonly componentId = 'minecraft:npc';
}
```

#### 属性

- <RestrictedMode inline/> defaultScene: string，玩家首次与 NPC 交互时打开的对话场景。
- <RestrictedMode inline/> name: string，显示给玩家的 NPC 名称。
- <RestrictedMode inline/> skinIndex: number，NPC 使用的皮肤索引。

### PassengerOfBlockEmoteType 枚举

<Version type="script" experimental="测试版API"/>

方块上乘客的表情类型。

```typescript
enum PassengerOfBlockEmoteType {
    Laying = "Laying", // 实体躺在方块上
    Riding = "Riding", // 实体坐在方块上
    Standing = "Standing", // 实体站在方块上
}
```

---

## 玩家光标物品栏组件

### PlayerCursorInventoryComponent 类

<Version type="script" add="1.14.0"/>

玩家光标物品栏组件，表示玩家光标上持有的物品。

继承自[EntityComponent](#entitycomponent-类)。

```typescript
class PlayerCursorInventoryComponent extends EntityComponent {
    private constructor();
    readonly item?: ItemStack;
    static readonly componentId = 'minecraft:cursor_inventory';
    clear(): void;
}
```

#### 属性

- <ReadOnly/> <Optional/> item: [ItemStack](../../server/item/main#itemstack-类)，光标物品栏中持有的物品；光标为空时为`undefined`。

#### clear 方法

<RestrictedMode inline/>

清空光标物品栏。

```typescript
clear(): void
```

---

## 组件映射

### EntityComponentTypeMap 类型

<Version type="script" add="1.18.0"/>

实体组件标识符与组件类之间的映射，键为组件标识符，值为对应的组件类。

```typescript
type EntityComponentTypeMap = {
    addrider: EntityAddRiderComponent;
    ageable: EntityAgeableComponent;
    breathable: EntityBreathableComponent;
    can_climb: EntityCanClimbComponent;
    can_fly: EntityCanFlyComponent;
    can_power_jump: EntityCanPowerJumpComponent;
    color: EntityColorComponent;
    color2: EntityColor2Component;
    cursor_inventory: PlayerCursorInventoryComponent;
    ender_inventory: EntityEnderInventoryComponent;
    equippable: EntityEquippableComponent;
    fire_immune: EntityFireImmuneComponent;
    floats_in_liquid: EntityFloatsInLiquidComponent;
    flying_speed: EntityFlyingSpeedComponent;
    friction_modifier: EntityFrictionModifierComponent;
    healable: EntityHealableComponent;
    health: EntityHealthComponent;
    inventory: EntityInventoryComponent;
    is_baby: EntityIsBabyComponent;
    is_charged: EntityIsChargedComponent;
    is_chested: EntityIsChestedComponent;
    is_dyeable: EntityIsDyeableComponent;
    is_hidden_when_invisible: EntityIsHiddenWhenInvisibleComponent;
    is_ignited: EntityIsIgnitedComponent;
    is_illager_captain: EntityIsIllagerCaptainComponent;
    is_saddled: EntityIsSaddledComponent;
    is_shaking: EntityIsShakingComponent;
    is_sheared: EntityIsShearedComponent;
    is_stackable: EntityIsStackableComponent;
    is_stunned: EntityIsStunnedComponent;
    is_tamed: EntityIsTamedComponent;
    item: EntityItemComponent;
    lava_movement: EntityLavaMovementComponent;
    leashable: EntityLeashableComponent;
    mark_variant: EntityMarkVariantComponent;
    'minecraft:addrider': EntityAddRiderComponent;
    'minecraft:ageable': EntityAgeableComponent;
    'minecraft:breathable': EntityBreathableComponent;
    'minecraft:can_climb': EntityCanClimbComponent;
    'minecraft:can_fly': EntityCanFlyComponent;
    'minecraft:can_power_jump': EntityCanPowerJumpComponent;
    'minecraft:color': EntityColorComponent;
    'minecraft:color2': EntityColor2Component;
    'minecraft:cursor_inventory': PlayerCursorInventoryComponent;
    'minecraft:ender_inventory': EntityEnderInventoryComponent;
    'minecraft:equippable': EntityEquippableComponent;
    'minecraft:fire_immune': EntityFireImmuneComponent;
    'minecraft:floats_in_liquid': EntityFloatsInLiquidComponent;
    'minecraft:flying_speed': EntityFlyingSpeedComponent;
    'minecraft:friction_modifier': EntityFrictionModifierComponent;
    'minecraft:healable': EntityHealableComponent;
    'minecraft:health': EntityHealthComponent;
    'minecraft:inventory': EntityInventoryComponent;
    'minecraft:is_baby': EntityIsBabyComponent;
    'minecraft:is_charged': EntityIsChargedComponent;
    'minecraft:is_chested': EntityIsChestedComponent;
    'minecraft:is_dyeable': EntityIsDyeableComponent;
    'minecraft:is_hidden_when_invisible': EntityIsHiddenWhenInvisibleComponent;
    'minecraft:is_ignited': EntityIsIgnitedComponent;
    'minecraft:is_illager_captain': EntityIsIllagerCaptainComponent;
    'minecraft:is_saddled': EntityIsSaddledComponent;
    'minecraft:is_shaking': EntityIsShakingComponent;
    'minecraft:is_sheared': EntityIsShearedComponent;
    'minecraft:is_stackable': EntityIsStackableComponent;
    'minecraft:is_stunned': EntityIsStunnedComponent;
    'minecraft:is_tamed': EntityIsTamedComponent;
    'minecraft:item': EntityItemComponent;
    'minecraft:lava_movement': EntityLavaMovementComponent;
    'minecraft:leashable': EntityLeashableComponent;
    'minecraft:mark_variant': EntityMarkVariantComponent;
    'minecraft:movement': EntityMovementComponent;
    'minecraft:movement.amphibious': EntityMovementAmphibiousComponent;
    'minecraft:movement.basic': EntityMovementBasicComponent;
    'minecraft:movement.fly': EntityMovementFlyComponent;
    'minecraft:movement.generic': EntityMovementGenericComponent;
    'minecraft:movement.glide': EntityMovementGlideComponent;
    'minecraft:movement.hover': EntityMovementHoverComponent;
    'minecraft:movement.jump': EntityMovementJumpComponent;
    'minecraft:movement.skip': EntityMovementSkipComponent;
    'minecraft:movement.sway': EntityMovementSwayComponent;
    'minecraft:navigation.climb': EntityNavigationClimbComponent;
    'minecraft:navigation.float': EntityNavigationFloatComponent;
    'minecraft:navigation.fly': EntityNavigationFlyComponent;
    'minecraft:navigation.generic': EntityNavigationGenericComponent;
    'minecraft:navigation.hover': EntityNavigationHoverComponent;
    'minecraft:navigation.walk': EntityNavigationWalkComponent;
    'minecraft:npc': EntityNpcComponent;
    'minecraft:onfire': EntityOnFireComponent;
    'minecraft:player.exhaustion': EntityExhaustionComponent;
    'minecraft:player.hunger': EntityHungerComponent;
    'minecraft:player.saturation': EntitySaturationComponent;
    'minecraft:projectile': EntityProjectileComponent;
    'minecraft:push_through': EntityPushThroughComponent;
    'minecraft:rideable': EntityRideableComponent;
    'minecraft:riding': EntityRidingComponent;
    'minecraft:scale': EntityScaleComponent;
    'minecraft:skin_id': EntitySkinIdComponent;
    'minecraft:strength': EntityStrengthComponent;
    'minecraft:tameable': EntityTameableComponent;
    'minecraft:tamemount': EntityTameMountComponent;
    'minecraft:type_family': EntityTypeFamilyComponent;
    'minecraft:underwater_movement': EntityUnderwaterMovementComponent;
    'minecraft:variant': EntityVariantComponent;
    'minecraft:wants_jockey': EntityWantsJockeyComponent;
    movement: EntityMovementComponent;
    'movement.amphibious': EntityMovementAmphibiousComponent;
    'movement.basic': EntityMovementBasicComponent;
    'movement.fly': EntityMovementFlyComponent;
    'movement.generic': EntityMovementGenericComponent;
    'movement.glide': EntityMovementGlideComponent;
    'movement.hover': EntityMovementHoverComponent;
    'movement.jump': EntityMovementJumpComponent;
    'movement.skip': EntityMovementSkipComponent;
    'movement.sway': EntityMovementSwayComponent;
    'navigation.climb': EntityNavigationClimbComponent;
    'navigation.float': EntityNavigationFloatComponent;
    'navigation.fly': EntityNavigationFlyComponent;
    'navigation.generic': EntityNavigationGenericComponent;
    'navigation.hover': EntityNavigationHoverComponent;
    'navigation.walk': EntityNavigationWalkComponent;
    npc: EntityNpcComponent;
    onfire: EntityOnFireComponent;
    'player.exhaustion': EntityExhaustionComponent;
    'player.hunger': EntityHungerComponent;
    'player.saturation': EntitySaturationComponent;
    projectile: EntityProjectileComponent;
    push_through: EntityPushThroughComponent;
    rideable: EntityRideableComponent;
    riding: EntityRidingComponent;
    scale: EntityScaleComponent;
    skin_id: EntitySkinIdComponent;
    strength: EntityStrengthComponent;
    tameable: EntityTameableComponent;
    tamemount: EntityTameMountComponent;
    type_family: EntityTypeFamilyComponent;
    underwater_movement: EntityUnderwaterMovementComponent;
    variant: EntityVariantComponent;
    wants_jockey: EntityWantsJockeyComponent;
}
```

### EntityComponentReturnType 类型

<Version type="script" add="1.18.0"/>

按实体组件标识符取得对应组件类的类型工具；未知标识符会回退为[EntityComponent](#entitycomponent-类)。

```typescript
type EntityComponentReturnType<T extends string> = T extends keyof EntityComponentTypeMap
    ? EntityComponentTypeMap[T]
    : EntityComponent
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
