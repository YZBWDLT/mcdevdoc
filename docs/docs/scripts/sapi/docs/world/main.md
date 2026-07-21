---
sidebar_position: 0
---

# 世界

import Button from '/src/components/button/base';
import Version from "/src/components/highlight/scriptVersion"
import ReadOnly from "/src/components/highlight/readonly"
import Static from "/src/components/highlight/static"

本文主要记录世界相关接口。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

---

## 世界信息

### World 类

<Button text="projectxero.top" url="https://projectxero.top/sapi/classes/server.World.html"/>

```typescript
class World {
    private constructor();
    readonly afterEvents: WorldAfterEvents;
    readonly beforeEvents: WorldBeforeEvents;
    readonly gameRules: GameRules;
    readonly isHardcore: boolean;
    readonly primitiveShapesManager: PrimitiveShapesManager;
    readonly scoreboard: Scoreboard;
    readonly seed: string;
    readonly structureManager: StructureManager;
    readonly tickingAreaManager: TickingAreaManager;
    clearDynamicProperties(): void;
    getAbsoluteTime(): number;
    getAimAssist(): AimAssistRegistry;
    getAllPlayers(): Player[];
    getDay(): number;
    getDefaultSpawnLocation(): Vector3;
    getDifficulty(): Difficulty;
    getDimension(dimensionId: string): Dimension;
    getDynamicProperty(identifier: string): boolean | number | string | Vector3 | undefined;
    getDynamicPropertyIds(): string[];
    getDynamicPropertyTotalByteCount(): number;
    getEntity(id: string): Entity | undefined;
    getLootTableManager(): LootTableManager;
    getMoonPhase(): MoonPhase;
    getPackSettings(): Record<string, boolean | number | string>;
    getPlayers(options?: EntityQueryOptions): Player[];
    getTimeOfDay(): number;
    playMusic(trackId: string, musicOptions?: MusicOptions): void;
    queueMusic(trackId: string, musicOptions?: MusicOptions): void;
    sendMessage(message: (RawMessage | string)[] | RawMessage | string): void;
    setAbsoluteTime(absoluteTime: number): void;
    setDefaultSpawnLocation(spawnLocation: Vector3): void;
    setDifficulty(difficulty: Difficulty): void;
    setDynamicProperties(values: Record<string, boolean | number | string | Vector3 | undefined>): void;
    setDynamicProperty(identifier: string, value?: boolean | number | string | Vector3): void;
    setTimeOfDay(timeOfDay: number | TimeOfDay): void;
    stopMusic(): void;
}
```

#### 属性

- <ReadOnly/> afterEvents: WorldAfterEvents
- <ReadOnly/> beforeEvents: WorldBeforeEvents
- <ReadOnly/> gameRules: GameRules
- <ReadOnly/> isHardcore: boolean
- <ReadOnly/> primitiveShapesManager: PrimitiveShapesManager
- <ReadOnly/> scoreboard: Scoreboard
- <ReadOnly/> seed: string
- <ReadOnly/> structureManager: StructureManager
- <ReadOnly/> tickingAreaManager: TickingAreaManager

#### clearDynamicProperties 方法

```typescript
clearDynamicProperties(): void;
```

#### getAbsoluteTime 方法

```typescript
getAbsoluteTime(): number;
```

#### getAimAssist 方法

```typescript
getAimAssist(): AimAssistRegistry;
```

#### getAllPlayers 方法

```typescript
getAllPlayers(): Player[];
```

#### getDay 方法

```typescript
getDay(): number;
```

#### getDefaultSpawnLocation 方法

```typescript
getDefaultSpawnLocation(): Vector3;
```

#### getDifficulty 方法

```typescript
getDifficulty(): Difficulty;
```

#### getDimension 方法

```typescript
getDimension(dimensionId: string): Dimension;
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

#### getEntity 方法

```typescript
getEntity(id: string): Entity | undefined;
```

#### getLootTableManager 方法

```typescript
getLootTableManager(): LootTableManager;
```

#### getMoonPhase 方法

```typescript
getMoonPhase(): MoonPhase;
```

#### getPackSettings 方法

```typescript
getPackSettings(): Record<string, boolean | number | string>;
```

#### getPlayers 方法

```typescript
getPlayers(options?: EntityQueryOptions): Player[];
```

#### getTimeOfDay 方法

```typescript
getTimeOfDay(): number;
```

#### playMusic 方法

```typescript
playMusic(trackId: string, musicOptions?: MusicOptions): void;
```

#### queueMusic 方法

```typescript
queueMusic(trackId: string, musicOptions?: MusicOptions): void;
```

#### sendMessage 方法

```typescript
sendMessage(message: (RawMessage | string)[] | RawMessage | string): void;
```

#### setAbsoluteTime 方法

```typescript
setAbsoluteTime(absoluteTime: number): void;
```

#### setDefaultSpawnLocation 方法

```typescript
setDefaultSpawnLocation(spawnLocation: Vector3): void;
```

#### setDifficulty 方法

```typescript
setDifficulty(difficulty: Difficulty): void;
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

#### setTimeOfDay 方法

```typescript
setTimeOfDay(timeOfDay: number | TimeOfDay): void;
```

#### stopMusic 方法

```typescript
stopMusic(): void;
```

---
---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
