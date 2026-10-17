---
sidebar_position: 4
---

# 记分板

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录记分板相关接口。

---

## 记分板

### Scoreboard 类

<Version type="script" add="1.4.0"/>

表示该世界的记分板。可通过[World](./main#world-类)的`scoreboard`属性获取。

```typescript
class Scoreboard {
    private constructor();
    addObjective(objectiveId: string, displayName?: string): ScoreboardObjective;
    clearObjectiveAtDisplaySlot(displaySlotId: DisplaySlotId): ScoreboardObjective | undefined;
    getObjective(objectiveId: string): ScoreboardObjective | undefined;
    getObjectiveAtDisplaySlot(displaySlotId: DisplaySlotId): ScoreboardObjectiveDisplayOptions | undefined;
    getObjectives(): ScoreboardObjective[];
    getParticipants(): ScoreboardIdentity[];
    removeObjective(objectiveId: ScoreboardObjective | string): boolean;
    setObjectiveAtDisplaySlot(
        displaySlotId: DisplaySlotId,
        objectiveDisplaySetting: ScoreboardObjectiveDisplayOptions,
    ): ScoreboardObjective | undefined;
}
```

#### addObjective 方法

<RestrictedMode inline/>

在记分板上新增一个记分项。

```typescript
addObjective(objectiveId: string, displayName?: string): ScoreboardObjective
```

- objectiveId: string，记分项的标识符。
- displayName?: string，记分项的显示名称。若不传入则使用标识符。

**返回值**：[ScoreboardObjective](#scoreboardobjective-类)，新创建的记分项。

#### clearObjectiveAtDisplaySlot 方法

<RestrictedMode inline/>

清除显示槽位中的记分项。

```typescript
clearObjectiveAtDisplaySlot(displaySlotId: DisplaySlotId): ScoreboardObjective | undefined
```

- displaySlotId: [DisplaySlotId](#displayslotid-枚举)，要清除的显示槽位。

**返回值**：[ScoreboardObjective](#scoreboardobjective-类) | undefined，原本位于该显示槽位的记分项；槽位为空时为`undefined`。

#### getObjective 方法

按标识符返回指定的记分项。

```typescript
getObjective(objectiveId: string): ScoreboardObjective | undefined
```

- objectiveId: string，记分项的标识符。

**返回值**：[ScoreboardObjective](#scoreboardobjective-类) | undefined，指定的记分项；该记分项不存在时为`undefined`。

#### getObjectiveAtDisplaySlot 方法

返回显示槽位中的记分项及显示设置。

```typescript
getObjectiveAtDisplaySlot(
    displaySlotId: DisplaySlotId,
): ScoreboardObjectiveDisplayOptions | undefined
```

- displaySlotId: [DisplaySlotId](#displayslotid-枚举)，要查询的显示槽位。

**返回值**：[ScoreboardObjectiveDisplayOptions](#scoreboardobjectivedisplayoptions-接口) | undefined，该显示槽位的记分项及显示设置；槽位为空时为`undefined`。

#### getObjectives 方法

返回全部已定义的记分项。

```typescript
getObjectives(): ScoreboardObjective[]
```

**返回值**：[ScoreboardObjective](#scoreboardobjective-类)[]，全部记分项组成的数组；没有记分项时为空数组。

#### getParticipants 方法

返回全部已定义的记分板身份。

```typescript
getParticipants(): ScoreboardIdentity[]
```

**返回值**：[ScoreboardIdentity](#scoreboardidentity-类)[]，全部记分板身份组成的数组；没有身份时为空数组。

#### removeObjective 方法

<RestrictedMode inline/>

从记分板上移除一个记分项。

```typescript
removeObjective(objectiveId: ScoreboardObjective | string): boolean
```

- objectiveId: [ScoreboardObjective](#scoreboardobjective-类) | string，要移除的记分项，或它的标识符。

**返回值**：boolean，`true` 表示移除成功；该记分项不存在时为`false`。

#### setObjectiveAtDisplaySlot 方法

<RestrictedMode inline/>

将记分项放入显示槽位，并设置其显示方式。

```typescript
setObjectiveAtDisplaySlot(
    displaySlotId: DisplaySlotId,
    objectiveDisplaySetting: ScoreboardObjectiveDisplayOptions,
): ScoreboardObjective | undefined
```

- displaySlotId: [DisplaySlotId](#displayslotid-枚举)，要设置的显示槽位。
- objectiveDisplaySetting: [ScoreboardObjectiveDisplayOptions](#scoreboardobjectivedisplayoptions-接口)，记分项及其显示方式。

**返回值**：[ScoreboardObjective](#scoreboardobjective-类) | undefined，原本位于该显示槽位的记分项；槽位为空时为`undefined`。

### ScoreboardObjective 类

<Version type="script" add="1.4.0"/>

记分板上的一个记分项，包含显示名称与参与者的分数。

```typescript
class ScoreboardObjective {
    private constructor();
    readonly displayName: string;
    readonly id: string;
    readonly isValid: boolean;
    addScore(participant: Entity | ScoreboardIdentity | string, scoreToAdd: number): number;
    getParticipants(): ScoreboardIdentity[];
    getScore(participant: Entity | ScoreboardIdentity | string): number | undefined;
    getScores(): ScoreboardScoreInfo[];
    hasParticipant(participant: Entity | ScoreboardIdentity | string): boolean;
    removeParticipant(participant: Entity | ScoreboardIdentity | string): boolean;
    setScore(participant: Entity | ScoreboardIdentity | string, score: number): void;
}
```

#### 属性

- <ReadOnly/> displayName: string，该记分项对玩家显示的名称。
- <ReadOnly/> id: string，该记分项的标识符。
- <ReadOnly/> isValid: boolean，该记分项的引用是否仍然有效。

#### addScore 方法

<RestrictedMode inline/>

为指定参与者在该记分项上增加分数。

```typescript
addScore(participant: Entity | ScoreboardIdentity | string, scoreToAdd: number): number
```

- participant: [Entity](../entity_and_player/entity#entity-类) | [ScoreboardIdentity](#scoreboardidentity-类) | string，要增加分数的参与者，可以是实体、记分板身份或参与者名称。
- scoreToAdd: number，要增加的分数，可以为负数。

**返回值**：number，增加后的分数。

#### getParticipants 方法

返回该记分项的全部参与者身份。

```typescript
getParticipants(): ScoreboardIdentity[]
```

**返回值**：[ScoreboardIdentity](#scoreboardidentity-类)[]，该记分项的参与者身份数组。

#### getScore 方法

返回指定参与者在该记分项上的分数。

```typescript
getScore(participant: Entity | ScoreboardIdentity | string): number | undefined
```

- participant: [Entity](../entity_and_player/entity#entity-类) | [ScoreboardIdentity](#scoreboardidentity-类) | string，要查询的参与者，可以是实体、记分板身份或参与者名称。

**返回值**：number | undefined，该参与者的分数；该参与者不是本记分项的参与者时为`undefined`。

#### getScores 方法

返回该记分项上所有参与者的分数。

```typescript
getScores(): ScoreboardScoreInfo[]
```

**返回值**：[ScoreboardScoreInfo](#scoreboardscoreinfo-类)[]，各参与者的分数信息数组。

#### hasParticipant 方法

指定身份是否是该记分项的参与者。

```typescript
hasParticipant(participant: Entity | ScoreboardIdentity | string): boolean
```

- participant: [Entity](../entity_and_player/entity#entity-类) | [ScoreboardIdentity](#scoreboardidentity-类) | string，要检查的参与者，可以是实体、记分板身份或参与者名称。

**返回值**：boolean，`true` 表示该身份是本记分项的参与者。

#### removeParticipant 方法

<RestrictedMode inline/>

从该记分项中移除一个参与者。

```typescript
removeParticipant(participant: Entity | ScoreboardIdentity | string): boolean
```

- participant: [Entity](../entity_and_player/entity#entity-类) | [ScoreboardIdentity](#scoreboardidentity-类) | string，要移除的参与者，可以是实体、记分板身份或参与者名称。

**返回值**：boolean，`true` 表示移除成功；该参与者不存在时为`false`。

#### setScore 方法

<RestrictedMode inline/>

设置指定参与者在该记分项上的分数。

```typescript
setScore(participant: Entity | ScoreboardIdentity | string, score: number): void
```

- participant: [Entity](../entity_and_player/entity#entity-类) | [ScoreboardIdentity](#scoreboardidentity-类) | string，要设置分数的参与者，可以是实体、记分板身份或参与者名称。
- score: number，要设置的分数。

### ScoreboardScoreInfo 类

<Version type="script" add="1.4.0"/>

某一参与者在某个记分项上的分数信息。

```typescript
class ScoreboardScoreInfo {
    private constructor();
    readonly participant: ScoreboardIdentity;
    readonly score: number;
}
```

#### 属性

- <ReadOnly/> participant: [ScoreboardIdentity](#scoreboardidentity-类)，该分数对应的参与者身份。
- <ReadOnly/> score: number，该参与者的分数。

### ScoreboardIdentity 类

<Version type="script" add="1.4.0"/>

记分板中的一个身份，对应实体、玩家或虚拟玩家。

```typescript
class ScoreboardIdentity {
    private constructor();
    readonly displayName: string;
    readonly id: number;
    readonly isValid: boolean;
    readonly "type": ScoreboardIdentityType;
    getEntity(): Entity | undefined;
}
```

#### 属性

- <ReadOnly/> displayName: string，该身份对玩家显示的名称。
- <ReadOnly/> id: number，该身份的标识符。
- <ReadOnly/> isValid: boolean，该身份的引用是否仍然有效。
- <ReadOnly/> "type": [ScoreboardIdentityType](#scoreboardidentitytype-枚举)，该身份的类型。

#### getEntity 方法

若该身份是实体或玩家，返回它对应的实体。

```typescript
getEntity(): Entity | undefined
```

**返回值**：[Entity](../entity_and_player/entity#entity-类) | undefined，该身份对应的实体；身份类型为虚拟玩家时为`undefined`。

### ScoreboardObjectiveDisplayOptions 接口

<Version type="script" add="1.4.0"/>

记分项在显示槽位中的显示方式。

```typescript
interface ScoreboardObjectiveDisplayOptions {
    objective: ScoreboardObjective;
    sortOrder?: ObjectiveSortOrder;
}
```

#### 属性

- objective: [ScoreboardObjective](#scoreboardobjective-类)，要显示的记分项。
- <Optional/> sortOrder: [ObjectiveSortOrder](#objectivesortorder-枚举)，记分项中各条目的排列顺序。

### DisplaySlotId 枚举

<Version type="script" add="1.4.0"/>

记分项的显示位置。

```typescript
enum DisplaySlotId {
    BelowName = "BelowName", // 显示在玩家名称下方
    List = "List", // 在暂停界面的玩家列表中显示
    Sidebar = "Sidebar", // 显示在屏幕右侧
}
```

### ScoreboardIdentityType 枚举

<Version type="script" add="1.4.0"/>

记分板身份的类型。

```typescript
enum ScoreboardIdentityType {
    Entity = "Entity", // 普通实体
    FakePlayer = "FakePlayer", // 虚拟玩家，由命令创建
    Player = "Player", // 真实玩家
}
```

### ObjectiveSortOrder 枚举

<Version type="script" add="1.4.0"/>

记分项中条目的排列顺序。

```typescript
enum ObjectiveSortOrder {
    Ascending = 0, // 升序，分数从小到大
    Descending = 1, // 降序，分数从大到小
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
