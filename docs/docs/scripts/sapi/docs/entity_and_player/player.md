---
sidebar_position: 2
---

# 玩家

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录玩家相关接口。

---

## 玩家

### Player 类

<Version type="script" add="1.0.0"/>

表示一个玩家。Player 继承自[Entity](./entity#entity-类)，本文只记录 Player 特有的成员。

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
}
```

#### 属性

- <Version type="script" add="1.6.0" inline/> <ReadOnly/> camera: [Camera](./camera#camera-类)，玩家的相机。
- <Version type="script" add="1.16.0" inline/> <ReadOnly/> clientSystemInfo: ClientSystemInfo，玩家的设备信息。
- <Version type="script" add="2.1.0" inline/> <RestrictedMode inline/> commandPermissionLevel: [CommandPermissionLevel](../custom_command#commandpermissionlevel-枚举)，玩家的命令权限等级。
- <Version type="script" add="2.10.0" inline/> <ReadOnly/> fogSettings: FogSettings，用于操作玩家渲染距离雾效设置的方法集合。
- <Version type="script" add="2.0.0" inline/> <ReadOnly/> graphicsMode: GraphicsMode，玩家客户端当前的图形模式。可在设置菜单的视频选项中更改。
- <Version type="script" add="1.17.0" inline/> <ReadOnly/> inputInfo: InputInfo，玩家的输入信息。
- <Version type="script" add="1.12.0" inline/> <ReadOnly/> inputPermissions: PlayerInputPermissions，玩家的输入权限。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isEmoting: boolean，若玩家当前正在发送表情，则为`true`。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isFlying: boolean，玩家是否正在飞行（例如处于创造模式或旁观模式）。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isGliding: boolean，玩家是否正在使用鞘翅滑翔。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> isJumping: boolean，玩家是否正在跳跃。玩家持续按住跳跃动作时该值保持为`true`。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> level: number，玩家当前的总等级（基于其经验值）。
- <Version type="script" add="2.8.0" inline/> <ReadOnly/> locatorBar: LocatorBar，玩家的定位栏，用于管理 HUD 上显示的路径点。
- <ReadOnly/> name: string，玩家的名称。
- <Version type="script" add="1.4.0" inline/> <ReadOnly/> onScreenDisplay: ScreenDisplay，用于操作玩家屏幕显示的方法集合。
- <Version type="script" add="2.1.0" inline/> <ReadOnly/> playerPermissionLevel: PlayerPermissionLevel，玩家的权限等级。
- <Version type="script" add="1.11.0" inline/> <RestrictedMode inline/> selectedSlotIndex: number，玩家当前选中的快捷栏槽位索引。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> totalXpNeededForNextLevel: number，玩家升到下一级所需的总经验值。
- <Version type="script" add="1.6.0" inline/> <ReadOnly/> xpEarnedAtCurrentLevel: number，玩家在当前等级已获得的经验值。

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

- targetEntity: [Entity](./entity#entity-类) | string，要清除属性覆盖的实体。

#### getAimAssist 方法

<Version type="script" add="2.7.0" inline/>

玩家的瞄准辅助设置。

```typescript
getAimAssist(): PlayerAimAssist
```

**返回值**：PlayerAimAssist，该玩家的瞄准辅助设置。

#### getControlScheme 方法

<Version type="script" add="2.4.0" inline/>

返回玩家当前的控制方式。

```typescript
getControlScheme(): ControlScheme
```

**返回值**：ControlScheme，该玩家当前的控制方案。

#### getGameMode 方法

<Version type="script" add="1.11.0" inline/>

获取该玩家当前生效的游戏模式。

```typescript
getGameMode(): GameMode
```

**返回值**：GameMode，该玩家当前生效的游戏模式。

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

**返回值**：DimensionLocation | undefined，该玩家当前的出生点；没有设置出生点时为`undefined`。

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
- musicOptions?: [MusicOptions](../world/main#musicoptions-接口)，音乐播放的选项。

#### playSound 方法

<Version type="script" add="1.2.0" inline/> <RestrictedMode inline/>

播放一个只有该玩家能听到的音效。

```typescript
playSound(soundId: SoundDefinition | string, soundOptions?: PlayerSoundOptions): SoundInstance
```

- soundId: [SoundDefinition](../world/main#sounddefinition-类) | string，要播放的声音，可以是声音定义或声音的标识符。
- soundOptions?: PlayerSoundOptions，声音播放的选项。

**返回值**：[SoundInstance](../dimension/sound#soundinstance-类)，可用于控制该音效的实例。

#### queueMusic 方法

<Version type="script" add="1.10.0" inline/> <RestrictedMode inline/>

追加一首只有该玩家能听到的音乐。若当前没有音乐在播放，则会立即播放。

```typescript
queueMusic(trackId: string, musicOptions?: MusicOptions): void
```

- trackId: string，要加入播放队列的音乐的标识符。
- musicOptions?: [MusicOptions](../world/main#musicoptions-接口)，音乐播放的选项。

#### removePropertyOverrideForEntity 方法

<Version type="script" add="1.19.0" inline/> <RestrictedMode inline/>

移除该玩家对某个实体属性的覆盖。该更改在下一个游戏刻才会应用。

```typescript
removePropertyOverrideForEntity(targetEntity: Entity, identifier: string): void
```

- targetEntity: [Entity](./entity#entity-类)，要移除属性覆盖的实体。
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

- message: ([RawMessage](../general#rawmessage-接口) | string)[] | [RawMessage](../general#rawmessage-接口) | string，要发送的消息，可以是字符串、原始消息对象或它们的数组。

#### setControlScheme 方法

<Version type="script" add="2.4.0" inline/> <RestrictedMode inline/>

设置玩家的控制方式。玩家的当前相机预设必须由脚本（如`camera.setCamera()`）或命令设置。

```typescript
setControlScheme(controlScheme?: ControlScheme): void
```

- controlScheme?: ControlScheme，要设置的控制方案。若不传入，则清除该玩家的控制方案，恢复为当前相机预设的默认控制方案。

#### setGameMode 方法

<Version type="script" add="1.11.0" inline/> <RestrictedMode inline/>

为该玩家设置游戏模式的覆盖值。

```typescript
setGameMode(gameMode?: GameMode): void
```

- gameMode?: GameMode，要设置的游戏模式。

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

- targetEntity: [Entity](./entity#entity-类)，要设置属性覆盖的实体。
- identifier: string，实体属性的标识符。
- value: boolean | number | string，覆盖后的实体属性值。

#### setSpawnPoint 方法

<Version type="script" add="1.4.0" inline/> <RestrictedMode inline/>

设置该玩家的出生点。

```typescript
setSpawnPoint(spawnPoint?: DimensionLocation): void
```

- spawnPoint?: DimensionLocation，要设置的出生点。

#### spawnParticle 方法

<Version type="script" add="1.18.0" inline/> <RestrictedMode inline/>

在世界中的指定位置创建一个粒子发射器，仅对该玩家可见。

```typescript
spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void
```

- effectName: string，要生成的粒子效果的名称。
- location: [Vector3](../general#vector3-接口)，生成粒子的坐标。
- molangVariables?: [MolangVariableMap](../dimension/main#molangvariablemap-类)，Molang 变量表，用于控制粒子的外观。

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

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
