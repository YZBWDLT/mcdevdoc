---
sidebar_position: 2
---

# 玩家

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录玩家相关接口。

---

## 玩家

### Player 类

<Version type="script" add="1.0.0"/>

表示一个玩家。Player 继承自[Entity](./entity#entity-类)，本文只记录 Player 特有的成员。

继承自[Entity](../../server/entity_and_player/entity#entity-类)。

```typescript
class Player extends Entity {
    private constructor();
    readonly camera: Camera;
    readonly clientSystemInfo: ClientSystemInfo;
    commandPermissionLevel: CommandPermissionLevel;
    readonly fogSettings: FogSettings;
    readonly graphicsMode: GraphicsMode;
    readonly inputInfo: InputInfo;
    readonly inputPermissions: PlayerInputPermissions;
    readonly isEmoting: boolean;
    readonly isFlying: boolean;
    readonly isGliding: boolean;
    readonly isJumping: boolean;
    readonly level: number;
    readonly locatorBar: LocatorBar;
    readonly name: string;
    readonly onScreenDisplay: ScreenDisplay;
    readonly playerPermissionLevel: PlayerPermissionLevel;
    selectedSlotIndex: number;
    readonly totalXpNeededForNextLevel: number;
    readonly xpEarnedAtCurrentLevel: number;
    addExperience(amount: number): number;
    addLevels(amount: number): number;
    clearPropertyOverridesForEntity(targetEntity: Entity | string): void;
    getAimAssist(): PlayerAimAssist;
    getControlScheme(): ControlScheme;
    getGameMode(): GameMode;
    getItemCooldown(cooldownCategory: string): number;
    getSpawnPoint(): DimensionLocation | undefined;
    getTotalXp(): number;
    playMusic(trackId: string, musicOptions?: MusicOptions): void;
    playSound(soundId: SoundDefinition | string, soundOptions?: PlayerSoundOptions): SoundInstance;
    queueMusic(trackId: string, musicOptions?: MusicOptions): void;
    removePropertyOverrideForEntity(targetEntity: Entity, identifier: string): void;
    resetLevel(): void;
    sendMessage(message: (RawMessage | string)[] | RawMessage | string): void;
    setControlScheme(controlScheme?: ControlScheme): void;
    setGameMode(gameMode?: GameMode): void;
    setPropertyOverrideForEntity(targetEntity: Entity, identifier: string, value: boolean | number | string): void;
    setSpawnPoint(spawnPoint?: DimensionLocation): void;
    spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void;
    startItemCooldown(cooldownCategory: string, tickDuration: number): void;
    stopMusic(): void;
    readonly chatDisplayName: string;
    chatMessagePrefix?: string;
    chatNamePrefix?: string;
    chatNameSuffix?: string;
    readonly persistentId: string;
    eatItem(itemStack: ItemStack): void;
    getPing(): number;
    getSplitScreenSlot(): PlayerSplitScreenSlot | undefined;
    postClientMessage(id: string, value: string): void;
    stopAllSounds(): void;
    stopSound(soundId: string): void;
}
```

#### 属性

- <Version type="script" add="1.6.0" inline/> <ReadOnly/> camera: [Camera](../../server/entity_and_player/camera#camera-类)，玩家的相机。
- <Version type="script" add="1.16.0" inline/> <ReadOnly/> clientSystemInfo: [ClientSystemInfo](#clientsysteminfo-类)，玩家的设备信息。
- <Version type="script" add="2.1.0" inline/> <RestrictedMode inline/> commandPermissionLevel: [CommandPermissionLevel](../../server/system/custom_command#commandpermissionlevel-枚举)，玩家的命令权限等级。
- <Version type="script" add="2.10.0" inline/> <ReadOnly/> fogSettings: [FogSettings](#fogsettings-类)，用于操作玩家渲染距离雾效设置的方法集合。
- <Version type="script" add="2.0.0" inline/> <ReadOnly/> graphicsMode: [GraphicsMode](#graphicsmode-枚举)，玩家客户端当前的图形模式。可在设置菜单的视频选项中更改。
- <Version type="script" add="1.17.0" inline/> <ReadOnly/> inputInfo: [InputInfo](../../server/entity_and_player/input#inputinfo-类)，玩家的输入信息。
- <Version type="script" add="1.12.0" inline/> <ReadOnly/> inputPermissions: [PlayerInputPermissions](../../server/entity_and_player/input#playerinputpermissions-类)，玩家的输入权限。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isEmoting: boolean，若玩家当前正在发送表情，则为`true`。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isFlying: boolean，玩家是否正在飞行（例如处于创造模式或旁观模式）。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isGliding: boolean，玩家是否正在使用鞘翅滑翔。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isJumping: boolean，玩家是否正在跳跃。玩家持续按住跳跃动作时该值保持为`true`。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> level: number，玩家当前的总等级（基于其经验值）。
- <Version type="script" add="2.8.0" inline/> <ReadOnly/> locatorBar: [LocatorBar](../../server/entity_and_player/locator_bar#locatorbar-类)，玩家的定位栏，用于管理 HUD 上显示的路径点。
- <ReadOnly/> name: string，玩家的名称。
- <Version type="script" add="1.4.0" inline/> <ReadOnly/> onScreenDisplay: [ScreenDisplay](#screendisplay-类)，用于操作玩家屏幕显示的方法集合。
- <Version type="script" add="2.1.0" inline/> <ReadOnly/> playerPermissionLevel: [PlayerPermissionLevel](../../server/entity_and_player/input#playerpermissionlevel-枚举)，玩家的权限等级。
- <Version type="script" add="1.11.0" inline/> <RestrictedMode inline/> selectedSlotIndex: number，玩家当前选中的快捷栏槽位索引。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> totalXpNeededForNextLevel: number，玩家升到下一级所需的总经验值。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> xpEarnedAtCurrentLevel: number，玩家在当前等级已获得的经验值。
- <Version type="script" experimental="测试版API" inline/> <ReadOnly/> chatDisplayName: string，显示为聊天消息作者的名称。
- <Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/> <Optional/> chatMessagePrefix: string，聊天消息文本的前缀。
- <Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/> <Optional/> chatNamePrefix: string，聊天名称的前缀。
- <Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/> <Optional/> chatNameSuffix: string，聊天名称的后缀。
- <Version type="script" experimental="测试版API" inline/> <ReadOnly/> persistentId: string，玩家的持久化 ID。

#### addExperience 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

为玩家增加或减少经验值，并返回玩家当前的经验值。

```typescript
addExperience(amount: number): number
```

- amount: number，要增加的经验值数量。

**返回值**：number，增加后的当前经验值。

#### addLevels 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

为玩家增加或减少等级，并返回玩家当前的等级。

```typescript
addLevels(amount: number): number
```

- amount: number，要增加的等级数。

**返回值**：number，增加后的当前等级。

#### clearPropertyOverridesForEntity 方法

<Version type="script" add="1.19.0" inline/> <RestrictedMode inline/>

移除该玩家对目标实体上所有实体属性的覆盖。该更改在下一个游戏刻才会应用。

```typescript
clearPropertyOverridesForEntity(targetEntity: Entity | string): void
```

- targetEntity: [Entity](../../server/entity_and_player/entity#entity-类) | string，要清除属性覆盖的实体。

#### getAimAssist 方法

<Version type="script" add="2.7.0" inline/>

玩家的瞄准辅助设置。

```typescript
getAimAssist(): PlayerAimAssist
```

**返回值**：[PlayerAimAssist](../../server/entity_and_player/aim_assist#playeraimassist-类)，该玩家的瞄准辅助设置。

#### getControlScheme 方法

<Version type="script" add="2.4.0" inline/>

返回玩家当前的控制方式。

```typescript
getControlScheme(): ControlScheme
```

**返回值**：[ControlScheme](../../server/entity_and_player/input#controlscheme-枚举)，该玩家当前的控制方案。

#### getGameMode 方法

<Version type="script" add="1.11.0" inline/>

获取该玩家当前生效的游戏模式。

```typescript
getGameMode(): GameMode
```

**返回值**：[GameMode](#gamemode-枚举)，该玩家当前生效的游戏模式。

#### getItemCooldown 方法

<Version type="script" add="1.11.0" inline/>

获取指定冷却类别的物品当前冷却时间。

```typescript
getItemCooldown(cooldownCategory: string): number
```

- cooldownCategory: string，物品冷却的类别名称。

**返回值**：number，该冷却类别剩余的冷却时间，以游戏刻为单位。

#### getSpawnPoint 方法

<Version type="script" add="1.4.0" inline/>

获取该玩家当前的出生点。

```typescript
getSpawnPoint(): DimensionLocation | undefined
```

**返回值**：[DimensionLocation](../../server/general#dimensionlocation-接口) | undefined，该玩家当前的出生点；没有设置出生点时为`undefined`。

#### getTotalXp 方法

<Version type="script" add="1.6.0" inline/>

获取该玩家的总经验值。

```typescript
getTotalXp(): number
```

**返回值**：number，该玩家当前的总经验值。

#### playMusic 方法

<Version type="script" add="1.10.0" inline/> <RestrictedMode inline/>

播放一首只有该玩家能听到的音乐。

```typescript
playMusic(trackId: string, musicOptions?: MusicOptions): void
```

- trackId: string，要播放的音乐的标识符。
- musicOptions?: [MusicOptions](../../server/general#musicoptions-接口)，音乐播放的选项。

#### playSound 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

播放一个只有该玩家能听到的音效。

```typescript
playSound(soundId: SoundDefinition | string, soundOptions?: PlayerSoundOptions): SoundInstance
```

- soundId: [SoundDefinition](../../server/general#sounddefinition-类) | string，要播放的声音，可以是声音定义或声音的标识符。
- soundOptions?: [PlayerSoundOptions](../../server/general#playersoundoptions-接口)，声音播放的选项。

**返回值**：[SoundInstance](../../server/general#soundinstance-类)，可用于控制该音效的实例。

#### queueMusic 方法

<Version type="script" add="1.10.0" inline/> <RestrictedMode inline/>

追加一首只有该玩家能听到的音乐。若当前没有音乐在播放，则会立即播放。

```typescript
queueMusic(trackId: string, musicOptions?: MusicOptions): void
```

- trackId: string，要加入播放队列的音乐的标识符。
- musicOptions?: [MusicOptions](../../server/general#musicoptions-接口)，音乐播放的选项。

#### removePropertyOverrideForEntity 方法

<Version type="script" add="1.19.0" inline/> <RestrictedMode inline/>

移除该玩家对某个实体属性的覆盖。该更改在下一个游戏刻才会应用。

```typescript
removePropertyOverrideForEntity(targetEntity: Entity, identifier: string): void
```

- targetEntity: [Entity](../../server/entity_and_player/entity#entity-类)，要移除属性覆盖的实体。
- identifier: string，要移除的实体属性的标识符。

#### resetLevel 方法

<Version type="script" add="1.6.0" inline/> <RestrictedMode inline/>

重置该玩家的等级。

```typescript
resetLevel(): void
```

#### sendMessage 方法

<Version type="script" add="1.1.0" inline/>

向该玩家发送消息。

```typescript
sendMessage(message: (RawMessage | string)[] | RawMessage | string): void
```

- message: ([RawMessage](../../server/general#rawmessage-接口) | string)[] | [RawMessage](../../server/general#rawmessage-接口) | string，要发送的消息，可以是字符串、原始消息对象或它们的数组。

#### setControlScheme 方法

<Version type="script" add="2.4.0" inline/> <RestrictedMode inline/>

设置玩家的控制方式。玩家的当前相机预设必须由脚本（如`camera.setCamera()`）或命令设置。

```typescript
setControlScheme(controlScheme?: ControlScheme): void
```

- controlScheme?: [ControlScheme](../../server/entity_and_player/input#controlscheme-枚举)，要设置的控制方案。若不传入，则清除该玩家的控制方案，恢复为当前相机预设的默认控制方案。

#### setGameMode 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

为该玩家设置游戏模式的覆盖值。

```typescript
setGameMode(gameMode?: GameMode): void
```

- gameMode?: [GameMode](#gamemode-枚举)，要设置的游戏模式。

#### setPropertyOverrideForEntity 方法

<Version type="script" add="1.19.0" inline/> <RestrictedMode inline/>

为该玩家将目标实体上的某个实体属性覆盖为指定值。该属性必须已客户端同步。

```typescript
setPropertyOverrideForEntity(
    targetEntity: Entity,
    identifier: string,
    value: boolean | number | string,
): void
```

- targetEntity: [Entity](../../server/entity_and_player/entity#entity-类)，要设置属性覆盖的实体。
- identifier: string，实体属性的标识符。
- value: boolean | number | string，覆盖后的实体属性值。

#### setSpawnPoint 方法

<Version type="script" add="1.4.0" inline/> <RestrictedMode inline/>

设置该玩家的出生点。

```typescript
setSpawnPoint(spawnPoint?: DimensionLocation): void
```

- spawnPoint?: [DimensionLocation](../../server/general#dimensionlocation-接口)，要设置的出生点。

#### spawnParticle 方法

<Version type="script" add="1.18.0" inline/> <RestrictedMode inline/>

在世界中的指定位置创建一个粒子发射器，仅对该玩家可见。

```typescript
spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void
```

- effectName: string，要生成的粒子效果的名称。
- location: [Vector3](../../server/general#vector3-接口)，生成粒子的坐标。
- molangVariables?: [MolangVariableMap](../../server/dimension/main#molangvariablemap-类)，Molang 变量表，用于控制粒子的外观。

#### startItemCooldown 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

设置指定冷却类别的物品冷却时间。

```typescript
startItemCooldown(cooldownCategory: string, tickDuration: number): void
```

- cooldownCategory: string，物品冷却的类别名称。
- tickDuration: number，冷却持续的时长，以游戏刻为单位。

#### stopMusic 方法

<Version type="script" add="1.10.0" inline/> <RestrictedMode inline/>

停止该玩家正在播放的所有音乐。

```typescript
stopMusic(): void
```

#### eatItem 方法

<Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/>

让玩家食用物品。

```typescript
eatItem(itemStack: ItemStack): void
```

- itemStack: [ItemStack](../../server/item/main#itemstack-类)，要食用的物品堆叠。

#### getPing 方法

<Version type="script" experimental="测试版API" inline/>

返回玩家延迟（毫秒）。

```typescript
getPing(): number
```

**返回值**：number，玩家的延迟（毫秒）。

#### getSplitScreenSlot 方法

<Version type="script" experimental="测试版API" inline/>

返回玩家的分屏槽位。

```typescript
getSplitScreenSlot(): PlayerSplitScreenSlot | undefined
```

**返回值**：[PlayerSplitScreenSlot](#playersplitscreenslot-枚举) | undefined，玩家的分屏槽位；若玩家不在分屏会话中则为`undefined`。

#### postClientMessage 方法

<Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/>

向该玩家的客户端发送消息。

```typescript
postClientMessage(id: string, value: string): void
```

- id: string，要发送的消息标识符。
- value: string，要发送的消息内容。

#### stopAllSounds 方法

<Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/>

停止该玩家所有声音。

```typescript
stopAllSounds(): void
```

#### stopSound 方法

<Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/>

停止该玩家指定声音。

```typescript
stopSound(soundId: string): void
```

- soundId: string，要停止的声音标识符。

---

## 游戏模式

### GameMode 枚举

<Version type="script" add="1.1.0"/>

表示当前世界的游戏模式。

```typescript
enum GameMode {
    Adventure = "Adventure", // 冒险模式，世界处于更受限的体验，方块可能无法被破坏
    Creative = "Creative", // 创造模式，玩家拥有全部资源，可瞬间破坏方块
    Spectator = "Spectator", // 旁观模式，旁观者始终飞行，可穿过方块和实体
    Survival = "Survival", // 生存模式，玩家会受到伤害，需收集资源生存
}
```

---

## 显示

### HudElementsCount 常量

<Version type="script" add="1.11.0"/>

```typescript
const HudElementsCount = 13;
```

玩家界面上可显示的元素数量，即[HudElement](#hudelement-枚举)枚举的取值个数，值为`13`。

### HudVisibilityCount 常量

<Version type="script" add="1.11.0"/>

```typescript
const HudVisibilityCount = 2;
```

界面可见状态的数量，即[HudVisibility](#hudvisibility-枚举)枚举的取值个数，值为`2`。

### ScreenDisplay 类

<Version type="script" add="1.4.0"/>

玩家的屏幕显示，用于管理标题、动作栏与 HUD 元素。

```typescript
class ScreenDisplay {
    private constructor();
    readonly isValid: boolean;
    getHiddenHudElements(): HudElement[];
    hideAllExcept(hudElements?: HudElement[]): void;
    isForcedHidden(hudElement: HudElement): boolean;
    resetHudElementsVisibility(): void;
    setActionBar(text: (RawMessage | string)[] | RawMessage | string): void;
    setHudVisibility(visible: HudVisibility, hudElements?: HudElement[]): void;
    setTitle(title: (RawMessage | string)[] | RawMessage | string, options?: TitleDisplayOptions): void;
    updateSubtitle(subtitle: (RawMessage | string)[] | RawMessage | string): void;
}
```

#### 属性

- <ReadOnly/> isValid: boolean，当前对该屏幕显示管理器对象的引用是否有效且可用。

#### getHiddenHudElements 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

```typescript
getHiddenHudElements(): HudElement[]
```

**返回值**：[HudElement](#hudelement-枚举)[]，当前被隐藏的 HUD 元素组成的数组。

#### hideAllExcept 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

```typescript
hideAllExcept(hudElements?: HudElement[]): void
```

- hudElements?: [HudElement](#hudelement-枚举)[]，除这些元素外，其余 HUD 元素全部隐藏（可选）。

#### isForcedHidden 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

```typescript
isForcedHidden(hudElement: HudElement): boolean
```

- hudElement: [HudElement](#hudelement-枚举)，要检查的 HUD 元素。

**返回值**：boolean，该 HUD 元素被强制隐藏时为`true`。

#### resetHudElementsVisibility 方法

<Version type="script" add="2.0.0" inline/> <RestrictedMode inline/>

```typescript
resetHudElementsVisibility(): void
```

#### setActionBar 方法

<RestrictedMode inline/>

```typescript
setActionBar(text: (RawMessage | string)[] | RawMessage | string): void
```

- text: ([RawMessage](../../server/general#rawmessage-接口) | string)[] | [RawMessage](../../server/general#rawmessage-接口) | string，要显示在标题下方、快捷栏上方的动作栏文本。

#### setHudVisibility 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

```typescript
setHudVisibility(visible: HudVisibility, hudElements?: HudElement[]): void
```

- visible: [HudVisibility](#hudvisibility-枚举)，HUD 元素的可见性处理方式。
- hudElements?: [HudElement](#hudelement-枚举)[]，要设置的 HUD 元素（可选）。

#### setTitle 方法

<RestrictedMode inline/>

```typescript
setTitle(
    title: (RawMessage | string)[] | RawMessage | string,
    options?: TitleDisplayOptions,
): void
```

- title: ([RawMessage](../../server/general#rawmessage-接口) | string)[] | [RawMessage](../../server/general#rawmessage-接口) | string，要显示的标题。
- options?: [TitleDisplayOptions](#titledisplayoptions-接口)，标题显示选项（可选）。

#### updateSubtitle 方法

<RestrictedMode inline/>

```typescript
updateSubtitle(subtitle: (RawMessage | string)[] | RawMessage | string): void
```

- subtitle: ([RawMessage](../../server/general#rawmessage-接口) | string)[] | [RawMessage](../../server/general#rawmessage-接口) | string，要更新的副标题。

### HudElement 枚举

<Version type="script" add="1.11.0"/>

HUD（抬头显示）中的元素。

```typescript
enum HudElement {
    PaperDoll = 0, // 纸娃娃（玩家模型）
    Armor = 1, // 盔甲栏
    ToolTips = 2, // 物品提示框
    TouchControls = 3, // 触摸控制按钮
    Crosshair = 4, // 准星
    Hotbar = 5, // 快捷栏
    Health = 6, // 生命值
    ProgressBar = 7, // 进度条
    Hunger = 8, // 饥饿值
    AirBubbles = 9, // 氧气泡
    HorseHealth = 10, // 坐骑的生命值
    StatusEffects = 11, // 状态效果
    ItemText = 12, // 物品名称文本
}
```

### HudVisibility 枚举

<Version type="script" add="1.11.0"/>

指定如何处理 HUD 元素的可见性。

```typescript
enum HudVisibility {
    Hide = 0, // 隐藏该 HUD 元素
    Reset = 1, // 将该 HUD 元素重置为默认状态（大多数 HUD 元素默认可见，部分可由玩家在设置中隐藏）
}
```

### TitleDisplayOptions 接口

<Version type="script" add="1.4.0"/>

显示标题与可选副标题时的附加选项。

```typescript
interface TitleDisplayOptions {
    fadeInDuration: number;
    fadeOutDuration: number;
    stayDuration: number;
    subtitle?: (RawMessage | string)[] | RawMessage | string;
}
```

#### 属性

- fadeInDuration: number，标题与副标题的淡入时长，以游戏刻为单位。
- fadeOutDuration: number，标题与副标题的淡出时长，以游戏刻为单位。
- stayDuration: number，标题与副标题保持显示的时间，以游戏刻为单位。
- <Optional/> subtitle: ([RawMessage](../../server/general#rawmessage-接口) | string)[] | [RawMessage](../../server/general#rawmessage-接口) | string，可选的副标题文本。

---

## 物品栏

### PlayerInventoryType 枚举

<Version type="script" add="2.1.0"/>

玩家物品栏的类型。

```typescript
enum PlayerInventoryType {
    Hotbar = "Hotbar", // 快捷栏
    Inventory = "Inventory", // 主物品栏
}
```

---

## 其它

### ClientSystemInfo 类

<Version type="script" add="1.16.0"/>

客户端实例的设备信息。

继承自[SystemInfo](../../server/system/main#systeminfo-类)。

```typescript
class ClientSystemInfo extends SystemInfo {
    private constructor();
    readonly locale: string;
    readonly maxRenderDistance: number;
    readonly platformType: PlatformType;
}
```

#### 属性

- <Version type="script" add="2.8.0" inline/> <ReadOnly/> locale: string，客户端选择的语言区域（例如`en_US`、`fr_FR`、`ja_JP`）。
- <ReadOnly/> maxRenderDistance: number，设备的最高渲染距离，以区块为单位。
- <ReadOnly/> platformType: [PlatformType](#platformtype-枚举)，设备的平台类型。

### PlatformType 枚举

<Version type="script" add="1.16.0"/>

描述设备所属的平台类型。

```typescript
enum PlatformType {
    Console = "Console", // 游戏主机
    Desktop = "Desktop", // 个人电脑（PC）
    Mobile = "Mobile", // 智能手机、平板等手持设备
}
```

### FogSettings 类

<Version type="script" add="2.10.0"/>

提供玩家实体的迷雾定义堆栈的访问，允许脚本压入、弹出、移除与查询当前激活的迷雾定义。

```typescript
class FogSettings {
    private constructor();
    getStack(): string[];
    getTags(): string[];
    pop(tag?: string): string | undefined;
    push(fogId: string, tag?: string): number;
    remove(tag?: string): boolean;
    setStack(fogIds: string[], tag?: string): void;
}
```

#### getStack 方法

<RestrictedMode inline/>

```typescript
getStack(): string[]
```

**返回值**：string[]，玩家迷雾堆栈中当前的迷雾定义标识符数组，从底到顶排列。

#### getTags 方法

<RestrictedMode inline/>

```typescript
getTags(): string[]
```

**返回值**：string[]，玩家迷雾堆栈中当前存在的标签字符串数组。

#### pop 方法

<RestrictedMode inline/>

```typescript
pop(tag?: string): string | undefined
```

- tag?: string，要弹出的迷雾定义所带的标签（可选）；提供时从栈顶向下搜索并移除最近压入的带该标签条目，省略时移除最近压入的条目。

**返回值**：string | undefined，被弹出的迷雾定义标识符，若堆栈未变化则为`undefined`。

#### push 方法

<RestrictedMode inline/>

```typescript
push(fogId: string, tag?: string): number
```

- fogId: string，要压入堆栈的迷雾定义标识符（例如`minecraft:fog_bamboo_jungle`）。
- tag?: string，用于标记该迷雾定义的标签（可选），便于后续用`pop`或`remove`定位；省略时以`untagged`存储。

**返回值**：number，该迷雾定义插入堆栈的位置（从 0 开始的索引）。

#### remove 方法

<RestrictedMode inline/>

```typescript
remove(tag?: string): boolean
```

- tag?: string，要移除的条目所带的标签（可选）；省略时清空全部迷雾定义。

**返回值**：boolean，至少移除一个条目时为`true`，否则为`false`。

#### setStack 方法

<RestrictedMode inline/>

```typescript
setStack(fogIds: string[], tag?: string): void
```

- fogIds: string[]，要设置到玩家迷雾堆栈的迷雾定义标识符数组（例如`['minecraft:fog_bamboo_jungle']`），最多 16 个。
- tag?: string，与这些新条目关联的标签（可选），用于后续用`pop`或`remove`定位。

### GraphicsMode 枚举

<Version type="script" add="2.0.0"/>

描述客户端的图形模式。

```typescript
enum GraphicsMode {
    Deferred = "Deferred", // 延迟技术预览画质
    Fancy = "Fancy", // 精美画质，大多数特殊图形效果会开启
    RayTraced = "RayTraced", // 光线追踪画质
    Simple = "Simple", // 流畅画质，大多数图形效果会关闭
}
```

### PlayerWaypointsMode 枚举

<Version type="script" experimental="测试版API"/>

玩家路径点模式。

```typescript
enum PlayerWaypointsMode {
    Everyone = "Everyone", // 所有人可见
    Off = "Off", // 关闭
}
```

### PlayerSplitScreenSlot 枚举

<Version type="script" add="2.9.0"/>

玩家的分屏槽位。

```typescript
enum PlayerSplitScreenSlot {
    First = "First", // 第一个分屏槽位
    Fourth = "Fourth", // 第四个分屏槽位
    Second = "Second", // 第二个分屏槽位
    Third = "Third", // 第三个分屏槽位
}
```

---

## 错误

### FogSettingsError 类

<Version type="script" add="2.10.0"/>

迷雾堆栈超出上限或迷雾标识符不合法时，[FogSettings](#fogsettings-类)的操作抛出该错误。

继承自Error。

```typescript
class FogSettingsError extends Error {
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
