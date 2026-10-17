---
sidebar_position: 7
---

# 玩家瞄准辅助

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录玩家瞄准辅助相关接口。

---

## 注册表

### AimAssistRegistry 类

<Version type="script" add="2.7.0"/>

与世界瞄准辅助设置相关的 API 容器。

```typescript
class AimAssistRegistry {
    private constructor();
    static readonly DefaultCategoryId = 'minecraft:default';
    static readonly DefaultPresetId = 'minecraft:aim_assist_default';
    addCategory(category: AimAssistCategorySettings): AimAssistCategory;
    addPreset(preset: AimAssistPresetSettings): AimAssistPreset;
    getCategories(): AimAssistCategory[];
    getCategory(categoryId: string): AimAssistCategory | undefined;
    getPreset(presetId: string): AimAssistPreset | undefined;
    getPresets(): AimAssistPreset[];
}
```

#### addCategory 方法

<RestrictedMode inline/>

```typescript
addCategory(category: AimAssistCategorySettings): AimAssistCategory
```

- category: [AimAssistCategorySettings](#aimassistcategorysettings-类)，要添加的类别设置。

**返回值**：[AimAssistCategory](#aimassistcategory-类)，创建的类别句柄。

#### addPreset 方法

<RestrictedMode inline/>

```typescript
addPreset(preset: AimAssistPresetSettings): AimAssistPreset
```

- preset: [AimAssistPresetSettings](#aimassistpresetsettings-类)，要添加的预设设置。

**返回值**：[AimAssistPreset](#aimassistpreset-类)，创建的预设句柄。

#### getCategories 方法

```typescript
getCategories(): AimAssistCategory[]
```

**返回值**：[AimAssistCategory](#aimassistcategory-类)[]，注册表中所有可用类别组成的数组。

#### getCategory 方法

<RestrictedMode inline/>

```typescript
getCategory(categoryId: string): AimAssistCategory | undefined
```

- categoryId: string，要查询的类别标识符。

**返回值**：[AimAssistCategory](#aimassistcategory-类) | undefined，该类别对象；不存在时为`undefined`。

#### getPreset 方法

<RestrictedMode inline/>

```typescript
getPreset(presetId: string): AimAssistPreset | undefined
```

- presetId: string，要查询的预设标识符。

**返回值**：[AimAssistPreset](#aimassistpreset-类) | undefined，该预设对象；不存在时为`undefined`。

#### getPresets 方法

```typescript
getPresets(): AimAssistPreset[]
```

**返回值**：[AimAssistPreset](#aimassistpreset-类)[]，注册表中所有可用预设组成的数组。

---

## 类别与预设

### AimAssistCategory 类

<Version type="script" add="2.7.0"/>

世界中存在的瞄准辅助类别句柄。

```typescript
class AimAssistCategory {
    private constructor();
    readonly defaultBlockPriority: number;
    readonly defaultEntityPriority: number;
    readonly identifier: string;
    getBlockPriorities(): Record<string, number>;
    getBlockTagPriorities(): Record<string, number>;
    getEntityPriorities(): Record<string, number>;
    getEntityTypeFamilyPriorities(): Record<string, number>;
}
```

#### 属性

- <ReadOnly/> defaultBlockPriority: number，未在方块优先级中找到的方块类型使用的默认目标优先级。
- <ReadOnly/> defaultEntityPriority: number，未在实体优先级中找到的实体类型使用的默认目标优先级。
- <ReadOnly/> identifier: string，与该类别关联的唯一标识符。

#### getBlockPriorities 方法

```typescript
getBlockPriorities(): Record<string, number>
```

**返回值**：Record&lt;string, number&gt;，映射方块标识符到优先级设置的记录。

#### getBlockTagPriorities 方法

```typescript
getBlockTagPriorities(): Record<string, number>
```

**返回值**：Record&lt;string, number&gt;，映射方块标签到优先级设置的记录。

#### getEntityPriorities 方法

```typescript
getEntityPriorities(): Record<string, number>
```

**返回值**：Record&lt;string, number&gt;，映射实体标识符到优先级设置的记录。

#### getEntityTypeFamilyPriorities 方法

```typescript
getEntityTypeFamilyPriorities(): Record<string, number>
```

**返回值**：Record&lt;string, number&gt;，映射实体类型族到优先级设置的记录。

### AimAssistCategorySettings 类

<Version type="script" add="2.7.0"/>

与`AimAssistRegistry.addCategory`配合创建瞄准辅助类别时使用的设置。

```typescript
class AimAssistCategorySettings {
    constructor(identifier: string);
    defaultBlockPriority: number;
    defaultEntityPriority: number;
    readonly identifier: string;
    getBlockPriorities(): Record<string, number>;
    getBlockTagPriorities(): Record<string, number>;
    getEntityPriorities(): Record<string, number>;
    getEntityTypeFamilyPriorities(): Record<string, number>;
    setBlockPriorities(blockPriorities: Record<string, number>): void;
    setBlockTagPriorities(blockTagPriorities: Record<string, number>): void;
    setEntityPriorities(entityPriorities: Record<string, number>): void;
    setEntityTypeFamilyPriorities(entityTypeFamilyPriorities: Record<string, number>): void;
}
```

#### 属性

- <RestrictedMode inline/> defaultBlockPriority: number，未通过`setBlockPriorities`提供的方块类型使用的默认目标优先级（可选）。
- <RestrictedMode inline/> defaultEntityPriority: number，未通过`setEntityPriorities`提供的实体类型使用的默认目标优先级（可选）。
- <ReadOnly/> identifier: string，注册该类别所用的唯一标识符，必须带命名空间。

#### getBlockPriorities 方法

```typescript
getBlockPriorities(): Record<string, number>
```

**返回值**：Record&lt;string, number&gt;，映射方块标识符到优先级设置的记录。

#### getBlockTagPriorities 方法

```typescript
getBlockTagPriorities(): Record<string, number>
```

**返回值**：Record&lt;string, number&gt;，映射方块标签到优先级设置的记录。

#### getEntityPriorities 方法

```typescript
getEntityPriorities(): Record<string, number>
```

**返回值**：Record&lt;string, number&gt;，映射实体标识符到优先级设置的记录。

#### getEntityTypeFamilyPriorities 方法

```typescript
getEntityTypeFamilyPriorities(): Record<string, number>
```

**返回值**：Record&lt;string, number&gt;，映射实体类型族到优先级设置的记录。

#### setBlockPriorities 方法

<RestrictedMode inline/>

```typescript
setBlockPriorities(blockPriorities: Record<string, number>): void
```

- blockPriorities: Record&lt;string, number&gt;，映射方块标识符到优先级值的记录。

#### setBlockTagPriorities 方法

<RestrictedMode inline/>

```typescript
setBlockTagPriorities(blockTagPriorities: Record<string, number>): void
```

- blockTagPriorities: Record&lt;string, number&gt;，映射方块标签到优先级值的记录。

#### setEntityPriorities 方法

<RestrictedMode inline/>

```typescript
setEntityPriorities(entityPriorities: Record<string, number>): void
```

- entityPriorities: Record&lt;string, number&gt;，映射实体标识符到优先级值的记录。

#### setEntityTypeFamilyPriorities 方法

<RestrictedMode inline/>

```typescript
setEntityTypeFamilyPriorities(entityTypeFamilyPriorities: Record<string, number>): void
```

- entityTypeFamilyPriorities: Record&lt;string, number&gt;，映射实体类型族到优先级值的记录。

### AimAssistPreset 类

<Version type="script" add="2.7.0"/>

世界中存在的瞄准辅助预设句柄。

```typescript
class AimAssistPreset {
    private constructor();
    readonly defaultItemSettings?: string;
    readonly handSettings?: string;
    readonly identifier: string;
    getExcludedBlockTagTargets(): string[];
    getExcludedBlockTargets(): string[];
    getExcludedEntityTargets(): string[];
    getExcludedEntityTypeFamilyTargets(): string[];
    getItemSettings(): Record<string, string>;
    getLiquidTargetingItems(): string[];
}
```

#### 属性

- <ReadOnly/> <Optional/> defaultItemSettings: string，未在物品设置中提供的物品使用的默认瞄准辅助类别标识符（可选）。
- <ReadOnly/> <Optional/> handSettings: string，空手时使用的瞄准辅助类别标识符（可选）。
- <ReadOnly/> identifier: string，与该预设关联的唯一标识符。

#### getExcludedBlockTagTargets 方法

```typescript
getExcludedBlockTagTargets(): string[]
```

**返回值**：string[]，要排除在瞄准辅助目标之外的方块标签数组。

#### getExcludedBlockTargets 方法

```typescript
getExcludedBlockTargets(): string[]
```

**返回值**：string[]，要排除在瞄准辅助目标之外的方块标识符数组。

#### getExcludedEntityTargets 方法

```typescript
getExcludedEntityTargets(): string[]
```

**返回值**：string[]，要排除在瞄准辅助目标之外的实体标识符数组。

#### getExcludedEntityTypeFamilyTargets 方法

```typescript
getExcludedEntityTypeFamilyTargets(): string[]
```

**返回值**：string[]，要排除在瞄准辅助目标之外的实体类型族数组。

#### getItemSettings 方法

```typescript
getItemSettings(): Record<string, string>
```

**返回值**：Record&lt;string, string&gt;，映射物品标识符到瞄准辅助类别标识符的记录。

#### getLiquidTargetingItems 方法

```typescript
getLiquidTargetingItems(): string[]
```

**返回值**：string[]，持有时可对液体方块进行瞄准辅助的物品标识符数组。

### AimAssistPresetSettings 类

<Version type="script" add="2.7.0"/>

与`AimAssistRegistry.addPreset`配合创建瞄准辅助预设时使用的设置。

```typescript
class AimAssistPresetSettings {
    constructor(identifier: string);
    defaultItemSettings?: string;
    handSettings?: string;
    readonly identifier: string;
    getExcludedBlockTagTargets(): string[] | undefined;
    getExcludedBlockTargets(): string[] | undefined;
    getExcludedEntityTargets(): string[] | undefined;
    getExcludedEntityTypeFamilyTargets(): string[] | undefined;
    getItemSettings(): Record<string, string>;
    getLiquidTargetingItems(): string[] | undefined;
    setExcludedBlockTagTargets(blockTagTargets?: string[]): void;
    setExcludedBlockTargets(blockTargets?: string[]): void;
    setExcludedEntityTargets(entityTargets?: string[]): void;
    setExcludedEntityTypeFamilyTargets(entityTypeFamilyTargets?: string[]): void;
    setItemSettings(itemSettings: Record<string, string>): void;
    setLiquidTargetingItems(items?: string[]): void;
}
```

#### 属性

- <RestrictedMode inline/> <Optional/> defaultItemSettings: string，未通过`setItemSettings`提供的物品使用的默认瞄准辅助类别标识符（可选）。
- <RestrictedMode inline/> <Optional/> handSettings: string，空手时使用的瞄准辅助类别标识符（可选）。
- <ReadOnly/> identifier: string，注册该预设所用的唯一标识符，必须带命名空间。

#### getExcludedBlockTagTargets 方法

```typescript
getExcludedBlockTagTargets(): string[] | undefined
```

**返回值**：string[] | undefined，要排除在瞄准辅助目标之外的方块标签数组。

#### getExcludedBlockTargets 方法

```typescript
getExcludedBlockTargets(): string[] | undefined
```

**返回值**：string[] | undefined，要排除在瞄准辅助目标之外的方块标识符数组。

#### getExcludedEntityTargets 方法

```typescript
getExcludedEntityTargets(): string[] | undefined
```

**返回值**：string[] | undefined，要排除在瞄准辅助目标之外的实体标识符数组。

#### getExcludedEntityTypeFamilyTargets 方法

```typescript
getExcludedEntityTypeFamilyTargets(): string[] | undefined
```

**返回值**：string[] | undefined，要排除在瞄准辅助目标之外的实体类型族数组。

#### getItemSettings 方法

```typescript
getItemSettings(): Record<string, string>
```

**返回值**：Record&lt;string, string&gt;，映射物品标识符到瞄准辅助类别标识符的记录。

#### getLiquidTargetingItems 方法

```typescript
getLiquidTargetingItems(): string[] | undefined
```

**返回值**：string[] | undefined，持有时可对液体方块进行瞄准辅助的物品标识符数组。

#### setExcludedBlockTagTargets 方法

<RestrictedMode inline/>

```typescript
setExcludedBlockTagTargets(blockTagTargets?: string[]): void
```

- blockTagTargets?: string[]，要排除在瞄准辅助目标之外的方块标签数组（可选）。

#### setExcludedBlockTargets 方法

<RestrictedMode inline/>

```typescript
setExcludedBlockTargets(blockTargets?: string[]): void
```

- blockTargets?: string[]，要排除在瞄准辅助目标之外的方块标识符数组（可选）。

#### setExcludedEntityTargets 方法

<RestrictedMode inline/>

```typescript
setExcludedEntityTargets(entityTargets?: string[]): void
```

- entityTargets?: string[]，要排除在瞄准辅助目标之外的实体标识符数组（可选）。

#### setExcludedEntityTypeFamilyTargets 方法

<RestrictedMode inline/>

```typescript
setExcludedEntityTypeFamilyTargets(entityTypeFamilyTargets?: string[]): void
```

- entityTypeFamilyTargets?: string[]，要排除在瞄准辅助目标之外的实体类型族数组（可选）。

#### setItemSettings 方法

<RestrictedMode inline/>

```typescript
setItemSettings(itemSettings: Record<string, string>): void
```

- itemSettings: Record&lt;string, string&gt;，映射物品标识符到瞄准辅助类别标识符的记录。

#### setLiquidTargetingItems 方法

<RestrictedMode inline/>

```typescript
setLiquidTargetingItems(items?: string[]): void
```

- items?: string[]，持有时可对液体方块进行瞄准辅助的物品标识符数组（可选）。

---

## 玩家瞄准辅助

### PlayerAimAssist 类

<Version type="script" add="2.7.0"/>

玩家瞄准辅助相关 API 的容器。

```typescript
class PlayerAimAssist {
    private constructor();
    readonly settings?: PlayerAimAssistSettings;
    set(settings?: PlayerAimAssistSettings): void;
}
```

#### 属性

- <ReadOnly/> <Optional/> settings: [PlayerAimAssistSettings](#playeraimassistsettings-接口)，玩家当前激活的瞄准辅助设置；未激活时为`undefined`。

#### set 方法

<RestrictedMode inline/>

```typescript
set(settings?: PlayerAimAssistSettings): void
```

- settings?: [PlayerAimAssistSettings](#playeraimassistsettings-接口)，要设置的瞄准辅助设置（可选）。

### PlayerAimAssistSettings 接口

<Version type="script" add="2.7.0"/>

与玩家瞄准辅助目标选择相关的设置。

```typescript
interface PlayerAimAssistSettings {
    distance?: number;
    presetId: string;
    targetMode?: AimAssistTargetMode;
    viewAngle?: Vector2;
}
```

#### 属性

- <Optional/> distance: number，瞄准辅助目标选择的距离限制。
- presetId: string，要激活的瞄准辅助预设标识符，必须带命名空间。
- <Optional/> targetMode: [AimAssistTargetMode](#aimassisttargetmode-枚举)，瞄准辅助目标选择的模式。
- <Optional/> viewAngle: [Vector2](../../server/general#vector2-接口)，瞄准辅助目标选择的视角限制。

### AimAssistTargetMode 枚举

<Version type="script" add="2.7.0"/>

瞄准辅助的目标选择模式。

```typescript
enum AimAssistTargetMode {
    Angle = "Angle", // 基于角度的目标选择
    Distance = "Distance", // 基于距离的目标选择
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
