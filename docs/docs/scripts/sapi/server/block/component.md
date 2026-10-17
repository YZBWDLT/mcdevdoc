---
sidebar_position: 3
---

# 方块组件

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录方块组件相关接口。

## 方块组件表

| 组件 | 组件类 | [脚本版本](../../version_table) |
| :--- | :--- | :---: |
| 物品栏 | [`BlockInventoryComponent`](#blockinventorycomponent-类) | `1.2.0` |
| 活塞 | [`BlockPistonComponent`](#blockpistoncomponent-类) | `1.9.0` |
| 告示牌 | [`BlockSignComponent`](#blocksigncomponent-类) | `1.9.0` |
| 唱片机 | [`BlockRecordPlayerComponent`](#blockrecordplayercomponent-类) | `1.14.0` |
| 流体容器 | [`BlockFluidContainerComponent`](#blockfluidcontainercomponent-类) | `1.16.0` |
| 地图颜色 | [`BlockMapColorComponent`](#blockmapcolorcomponent-类) | `2.0.0` |
| 可移动 | [`BlockMovableComponent`](#blockmovablecomponent-类) | `2.1.0` |
| 降水交互 | [`BlockPrecipitationInteractionsComponent`](#blockprecipitationinteractionscomponent-类) | `2.4.0` |
| 红石生产者 | [`BlockRedstoneProducerComponent`](#blockredstoneproducercomponent-类) | `2.4.0` |
| 动态属性 | [`BlockDynamicPropertiesComponent`](#blockdynamicpropertiescomponent-类) | `2.10.0` |
| 乐器 | [`BlockInstrumentComponent`](#blockinstrumentcomponent-类) | `2.10.0` |
| 实体存储 | [`BlockEntityStorageComponent`](#blockentitystoragecomponent-类) | `beta` |
| 配方合成 | [`BlockRecipeCraftingComponent`](#blockrecipecraftingcomponent-类) | `beta` |
| 配方加工 | [`BlockRecipeProcessingComponent`](#blockrecipeprocessingcomponent-类) | `beta` |
| 振动属性 | [`BlockVibrationPropertiesComponent`](#blockvibrationpropertiescomponent-类) | `beta` |


---

## 基类

### BlockComponent 类

<Version type="script" add="1.3.0"/>

与方块相关的组件的基类型。

继承自[Component](../../server/general#component-类)。

```typescript
class BlockComponent extends Component {
    private constructor();
    readonly block: Block;
}
```

#### 属性

- <ReadOnly/> block: [Block](../../server/block/main#block-类)，该组件所属的方块实例。

### BlockComponentTypes 枚举

<Version type="script" add="1.10.0"/>

可通过函数`Block.getComponent`访问的方块组件类型。

```typescript
enum BlockComponentTypes {
    DynamicProperties = "minecraft:dynamic_properties", // 动态属性组件
    FluidContainer = "minecraft:fluid_container", // 流体容器组件
    Instrument = "minecraft:instrument_sound", // 乐器组件
    Inventory = "minecraft:inventory", // 世界中方块的物品栏，用于箱子等方块
    MapColor = "minecraft:map_color", // 方块在地图上显示时的颜色
    Movable = "minecraft:movable", // 可移动的方块（如活塞）
    Piston = "minecraft:piston", // 类活塞行为，含发现方块活塞状态的附加属性
    PrecipitationInteractions = "minecraft:precipitation_interactions", // 方块与降水（如雨或雪）交互的方式
    RecordPlayer = "minecraft:record_player", // 可播放唱片的方块
    RedstoneProducer = "minecraft:redstone_producer", // 可输出红石信号的方块
    Sign = "minecraft:sign", // 可显示文本的方块
    EntityStorage = "minecraft:entity_storage", // 方块实体存储组件
    RecipeCrafting = "minecraft:recipe_crafting", // 方块配方合成组件
    RecipeProcessing = "minecraft:recipe_processing", // 方块配方加工组件
    VibrationProperties = "minecraft:vibration_properties", // 方块振动属性组件
}
```

---

## 方块物品栏组件

### BlockInventoryComponent 类

<Version type="script" add="1.2.0"/>

表示世界中方块的物品栏，用于箱子等方块。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockInventoryComponent extends BlockComponent {
    private constructor();
    readonly container?: Container;
    static readonly componentId = 'minecraft:inventory';
}
```

#### 属性

- <ReadOnly/> <Optional/> container: [Container](../../server/item/container#container-类)，容纳物品堆叠的容器。

---

## 方块活塞组件

### BlockPistonComponent 类

<Version type="script" add="1.9.0"/>

当存在时，该方块具有类活塞行为，包含用于发现方块活塞状态的附加属性。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockPistonComponent extends BlockComponent {
    private constructor();
    readonly isMoving: boolean;
    readonly state: BlockPistonState;
    static readonly componentId = 'minecraft:piston';
    getAttachedBlocks(): Block[];
    getAttachedBlocksLocations(): Vector3[];
}
```

#### 属性

- <ReadOnly/> isMoving: boolean，活塞是否正在伸出或缩回过程中。
- <ReadOnly/> state: [BlockPistonState](#blockpistonstate-枚举)，活塞的当前状态。

#### getAttachedBlocks 方法

```typescript
getAttachedBlocks(): Block[]
```

**返回值**：[Block](../../server/block/main#block-类)[]，与该活塞连接的一组方块。

#### getAttachedBlocksLocations 方法

```typescript
getAttachedBlocksLocations(): Vector3[]
```

**返回值**：[Vector3](../../server/general#vector3-接口)[]，与该活塞连接的一组方块位置。

### BlockPistonState 枚举

<Version type="script" add="1.9.0"/>

描述方块活塞状态的枚举。

```typescript
enum BlockPistonState {
    Expanded = "Expanded", // 活塞完全伸出
    Expanding = "Expanding", // 活塞正在伸出
    Retracted = "Retracted", // 活塞完全缩回
    Retracting = "Retracting", // 活塞正在缩回
}
```

---

## 方块告示牌组件

### BlockSignComponent 类

<Version type="script" add="1.9.0"/>

表示可显示文本的方块。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockSignComponent extends BlockComponent {
    private constructor();
    readonly isWaxed: boolean;
    static readonly componentId = 'minecraft:sign';
    getRawText(side?: SignSide): RawText | undefined;
    getText(side?: SignSide): string | undefined;
    getTextDyeColor(side?: SignSide): DyeColor | undefined;
    setText(message: RawMessage | string, side?: SignSide): void;
    setTextDyeColor(color?: DyeColor, side?: SignSide): void;
    setWaxed(waxed: boolean): void;
}
```

#### 属性

- <ReadOnly/> isWaxed: boolean，玩家是否可编辑该告示牌。若告示牌被使用过蜜脾或调用过`setWaxed`，则为`true`。

#### getRawText 方法

```typescript
getRawText(side?: SignSide): RawText | undefined
```

- side?: [SignSide](#signside-枚举)，要读取的面（可选）。

**返回值**：[RawText](#rawtext-接口) | undefined，告示牌的原始文本；若`setText`未使用原始消息或`RawText`对象调用则为`undefined`。

#### getText 方法

```typescript
getText(side?: SignSide): string | undefined
```

- side?: [SignSide](#signside-枚举)，要读取的面（可选）。

**返回值**：string | undefined，告示牌的文本；若`setText`未使用字符串调用则为`undefined`。

#### getTextDyeColor 方法

```typescript
getTextDyeColor(side?: SignSide): DyeColor | undefined
```

- side?: [SignSide](#signside-枚举)，要读取的面（可选）。

**返回值**：[DyeColor](#dyecolor-枚举) | undefined，文本上的染料颜色；若告示牌未被染色则为`undefined`。

#### setText 方法

<RestrictedMode inline/>

```typescript
setText(message: RawMessage | string, side?: SignSide): void
```

- message: [RawMessage](../../server/general#rawmessage-接口) | string，要设置的文本，可为原始消息或字符串。
- side?: [SignSide](#signside-枚举)，要设置的面（可选）。

#### setTextDyeColor 方法

<RestrictedMode inline/>

```typescript
setTextDyeColor(color?: DyeColor, side?: SignSide): void
```

- color?: [DyeColor](#dyecolor-枚举)，要设置的染料颜色（可选）。
- side?: [SignSide](#signside-枚举)，要设置的面（可选）。

#### setWaxed 方法

<RestrictedMode inline/>

```typescript
setWaxed(waxed: boolean): void
```

- waxed: boolean，是否使玩家无法编辑该告示牌。

### SignSide 枚举

<Version type="script" add="1.9.0"/>

表示告示牌的一面。

```typescript
enum SignSide {
    Back = "Back", // 告示牌背面
    Front = "Front", // 告示牌正面
}
```

### RawText 接口

<Version type="script" add="1.9.0"/>

只含`rawtext`属性的原始消息。当原始消息被序列化时，其内容会放入 rawtext 属性中，因此在读取告示牌文本时很有用。

```typescript
interface RawText {
    rawtext?: RawMessage[];
}
```

#### 属性

- <Optional/> rawtext: [RawMessage](../../server/general#rawmessage-接口)[]，关联告示牌当前值的序列化。

### DyeColor 枚举

<Version type="script" add="1.9.0"/>

指定用作染料的不同颜色。

```typescript
enum DyeColor {
    Black = "Black", // 黑色
    Blue = "Blue", // 蓝色
    Brown = "Brown", // 棕色
    Cyan = "Cyan", // 青色
    Gray = "Gray", // 灰色
    Green = "Green", // 绿色
    LightBlue = "LightBlue", // 淡蓝色
    Lime = "Lime", // 黄绿色
    Magenta = "Magenta", // 品红色
    Orange = "Orange", // 橙色
    Pink = "Pink", // 粉红色
    Purple = "Purple", // 紫色
    Red = "Red", // 红色
    Silver = "Silver", // 银色
    White = "White", // 白色
    Yellow = "Yellow", // 黄色
}
```

---

## 方块唱片机组件

### BlockRecordPlayerComponent 类

<Version type="script" add="1.14.0"/>

表示可播放唱片的方块。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockRecordPlayerComponent extends BlockComponent {
    private constructor();
    static readonly componentId = 'minecraft:record_player';
    ejectRecord(): void;
    getRecord(): ItemStack | undefined;
    isPlaying(): boolean;
    pauseRecord(): void;
    playRecord(): void;
    setRecord(recordItemType?: ItemType | string, startPlaying?: boolean): void;
}
```

#### ejectRecord 方法

<RestrictedMode inline/>

```typescript
ejectRecord(): void
```

#### getRecord 方法

```typescript
getRecord(): ItemStack | undefined
```

**返回值**：[ItemStack](../../server/item/main#itemstack-类) | undefined，当前设置的唱片；若未设置则为`undefined`。

#### isPlaying 方法

```typescript
isPlaying(): boolean
```

**返回值**：boolean，若该唱片机方块正在播放唱片则为`true`。

#### pauseRecord 方法

<RestrictedMode inline/>

```typescript
pauseRecord(): void
```

#### playRecord 方法

<RestrictedMode inline/>

```typescript
playRecord(): void
```

#### setRecord 方法

<RestrictedMode inline/>

```typescript
setRecord(recordItemType?: ItemType | string, startPlaying?: boolean): void
```

- recordItemType?: [ItemType](../../server/item/main#itemtype-类) | string，要设置的唱片物品类型或标识符（可选）。
- startPlaying?: boolean，设置后是否立即开始播放（可选）。

---

## 方块流体容器组件

### BlockFluidContainerComponent 类

<Version type="script" add="1.16.0"/>

表示世界中方块的流体容器，用于炼药锅等方块。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockFluidContainerComponent extends BlockComponent {
    private constructor();
    fillLevel: number;
    fluidColor: RGBA;
    static readonly componentId = 'minecraft:fluid_container';
    addDye(dye: ItemType): void;
    getFluidType(): FluidType;
    setFluidType(fluidType: FluidType): void;
    setPotion(itemStack: ItemStack): void;
}
```

#### 属性

- <RestrictedMode inline/> fillLevel: number，流体容器的相对填充等级。
- <RestrictedMode inline/> fluidColor: [RGBA](../../server/general#rgba-接口)，容器中流体的自定义颜色。

#### addDye 方法

<RestrictedMode inline/>

```typescript
addDye(dye: ItemType): void
```

- dye: [ItemType](../../server/item/main#itemtype-类)，要添加的染料。

#### getFluidType 方法

<RestrictedMode inline/>

```typescript
getFluidType(): FluidType
```

**返回值**：[FluidType](#fluidtype-枚举)，容器中当前的流体类型。

#### setFluidType 方法

<RestrictedMode inline/>

```typescript
setFluidType(fluidType: FluidType): void
```

- fluidType: [FluidType](#fluidtype-枚举)，要设置的流体类型。

#### setPotion 方法

<RestrictedMode inline/>

```typescript
setPotion(itemStack: ItemStack): void
```

- itemStack: [ItemStack](../../server/item/main#itemstack-类)，要在容器中设置的药水物品。

### FluidType 枚举

<Version type="script" add="1.8.0"/>

表示流体容器（如炼药锅）内使用的流体类型。

```typescript
enum FluidType {
    Lava = "Lava", // 熔岩
    Potion = "Potion", // 药水
    PowderSnow = "PowderSnow", // 细雪
    Water = "Water", // 水
}
```

### FluidContainer 类

<Version type="script" add="1.16.0"/>

方块流体容器组件中流体所占用的填充等级范围。

```typescript
class FluidContainer {
    private constructor();
    static readonly maxFillLevel = 6;
    static readonly minFillLevel = 0;
}
```

---

## 方块地图颜色组件

### BlockMapColorComponent 类

<Version type="script" add="2.0.0"/>

表示方块在地图上显示时的颜色。

另见：数据驱动方块组件[`minecraft:map_color`](/docs/docs/blocks/components#minecraftmap_color)。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockMapColorComponent extends BlockComponent {
    private constructor();
    readonly color: RGBA;
    readonly tintedColor: RGBA;
    readonly tintMethod: TintMethod;
    static readonly componentId = 'minecraft:map_color';
}
```

#### 属性

- <ReadOnly/> color: [RGBA](../../server/general#rgba-接口)，该方块定义的基础地图颜色。
- <ReadOnly/> tintedColor: [RGBA](../../server/general#rgba-接口)，基础颜色乘以在给定位置评估的色调所得的颜色。
- <ReadOnly/> tintMethod: [TintMethod](#tintmethod-枚举)，应用于颜色的色调类型。

### TintMethod 枚举

<Version type="script" add="2.0.0"/>

应用于方块或方块某部分的色调逻辑。当世界位置属于上下文的一部分时，颜色可能变化，因为生物群系常会对其产生影响。

```typescript
enum TintMethod {
    BirchFoliage = "BirchFoliage", // 白桦树叶色调
    DefaultFoliage = "DefaultFoliage", // 默认树叶色调
    DryFoliage = "DryFoliage", // 干旱树叶色调
    EvergreenFoliage = "EvergreenFoliage", // 常绿树叶色调
    Grass = "Grass", // 草地色调
    None = "None", // 无色调，呈现为白色
    Water = "Water", // 水色调
}
```

---

## 方块可移动组件

### BlockMovableComponent 类

<Version type="script" add="2.1.0"/>

表示可移动的方块（如活塞）。

另见：数据驱动方块组件[`minecraft:movable`](/docs/docs/blocks/components#minecraftmovable)。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockMovableComponent extends BlockComponent {
    private constructor();
    readonly movementType: MovementType;
    readonly stickyType: StickyType;
    static readonly componentId = 'minecraft:movable';
}
```

#### 属性

- <ReadOnly/> movementType: [MovementType](#movementtype-枚举)，方块的移动类型。
- <ReadOnly/> stickyType: [StickyType](#stickytype-枚举)，方块的粘性类型。

### MovementType 枚举

<Version type="script" add="2.1.0"/>

被活塞推动的行为类型。

```typescript
enum MovementType {
    Immovable = "Immovable", // 不可移动
    Popped = "Popped", // 被弹出（掉落为物品）
    Push = "Push", // 可被推动
    PushPull = "PushPull", // 可被推动与拉动
}
```

### StickyType 枚举

<Version type="script" add="2.1.0"/>

方块是否具有粘性。

```typescript
enum StickyType {
    None = "None", // 无粘性
    Same = "Same", // 与相邻方块同粘性
}
```

---

## 方块降水交互组件

### BlockPrecipitationInteractionsComponent 类

<Version type="script" add="2.4.0"/>

表示方块与降水（如雨或雪）交互的方式。

另见：数据驱动方块组件[`minecraft:precipitation_interactions`](/docs/docs/blocks/components#minecraftprecipitation_interactions)。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockPrecipitationInteractionsComponent extends BlockComponent {
    private constructor();
    static readonly componentId = 'minecraft:precipitation_interactions';
    accumulatesSnow(): boolean;
    isSnowLoggable(): boolean;
    obstructsRain(): boolean;
}
```

#### accumulatesSnow 方法

```typescript
accumulatesSnow(): boolean
```

**返回值**：boolean，若落雪会自然堆积在该方块上则为`true`。

#### isSnowLoggable 方法

<Version type="script" add="2.8.0" inline/>

```typescript
isSnowLoggable(): boolean
```

**返回值**：boolean，若该方块内部可容纳雪（如被雪淹没的花）则为`true`。

#### obstructsRain 方法

```typescript
obstructsRain(): boolean
```

**返回值**：boolean，若雨不会穿过该方块则为`true`。

---

## 方块红石生产者组件

### BlockRedstoneProducerComponent 类

<Version type="script" add="2.4.0"/>

表示可输出红石信号的方块。

另见：数据驱动方块组件[`minecraft:redstone_producer`](/docs/docs/blocks/components#minecraftredstone_producer)。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockRedstoneProducerComponent extends BlockComponent {
    private constructor();
    readonly power: number;
    static readonly componentId = 'minecraft:redstone_producer';
    getConnectedFaces(): Direction[];
    getStronglyPoweredFace(): Direction | undefined;
}
```

#### 属性

- <ReadOnly/> power: number，该方块输出到电路系统的功率。

#### getConnectedFaces 方法

```typescript
getConnectedFaces(): Direction[]
```

**返回值**：[Direction](../../server/general#direction-枚举)[]，该方块可连接电路并输出功率的面。

#### getStronglyPoweredFace 方法

```typescript
getStronglyPoweredFace(): Direction | undefined
```

**返回值**：[Direction](../../server/general#direction-枚举) | undefined，强力充能接触方块的方块面；若未定义强充能面则为`undefined`。

---

## 方块动态属性组件

### BlockDynamicPropertiesComponent 类

<Version type="script" add="2.10.0"/>

使方块可存储动态属性（键值对）的组件。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockDynamicPropertiesComponent extends BlockComponent {
    private constructor();
    static readonly componentId = 'minecraft:dynamic_properties';
    get(key: string): boolean | number | string | Vector3 | undefined;
    set(key: string, value?: boolean | number | string | Vector3): void;
    totalByteCount(): number;
}
```

#### get 方法

```typescript
get(key: string): boolean | number | string | Vector3 | undefined
```

- key: string，要检索的动态属性键。

**返回值**：boolean | number | string | [Vector3](../../server/general#vector3-接口) | undefined，存储在该键下的动态属性；若该键下未存储属性则为`undefined`。

#### set 方法

<RestrictedMode inline/>

```typescript
set(key: string, value?: boolean | number | string | Vector3): void
```

- key: string，要设置的动态属性键。
- value?: boolean | number | string | [Vector3](../../server/general#vector3-接口)，要设置的动态属性值（可选）。

#### totalByteCount 方法

```typescript
totalByteCount(): number
```

**返回值**：number，该方块实体动态属性存储的当前大小（字节）。

---

## 方块乐器组件

### BlockInstrumentComponent 类

<Version type="script" add="2.10.0"/>

表示方块可分配给其上面与下面的乐器。

另见：数据驱动方块组件[`minecraft:instrument_sound`](/docs/docs/blocks/components#minecraftinstrument_sound)。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockInstrumentComponent extends BlockComponent {
    private constructor();
    static readonly componentId = 'minecraft:instrument_sound';
    getInstrumentName(face: Direction): string;
    playInstrumentSound(face: Direction, soundOptions?: WorldSoundOptions): void;
}
```

#### getInstrumentName 方法

```typescript
getInstrumentName(face: Direction): string
```

- face: [Direction](../../server/general#direction-枚举)，要获取乐器的有效面方向。

**返回值**：string，给定有效面方向的乐器名称。

#### playInstrumentSound 方法

<RestrictedMode inline/>

```typescript
playInstrumentSound(face: Direction, soundOptions?: WorldSoundOptions): void
```

- face: [Direction](../../server/general#direction-枚举)，要播放乐器声音的有效面方向。
- soundOptions?: [WorldSoundOptions](../../server/general#worldsoundoptions-接口)，播放声音的选项（可选）。

---

## 方块实体存储组件

### BlockEntityStorageComponent 类

<Version type="script" experimental="测试版API"/>

方块实体存储组件，可在方块内存储实体。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockEntityStorageComponent extends BlockComponent {
    private constructor();
    static readonly componentId = 'minecraft:entity_storage';
    getEntities(): BlockEntityStorageInfo[];
    release(entityId: string): Entity;
    size(): number;
    store(entity: Entity): string;
    transfer(entityId: string, targetBlock: Block): void;
}
```

#### getEntities 方法

```typescript
getEntities(): BlockEntityStorageInfo[]
```

**返回值**：[BlockEntityStorageInfo](#blockentitystorageinfo-类)[]，存储在该方块实体存储中的实体信息数组。

#### release 方法

<RestrictedMode inline/>

```typescript
release(entityId: string): Entity
```

- entityId: string，要释放的实体的唯一 ID。

**返回值**：[Entity](../../server/entity_and_player/entity#entity-类)，释放并重新生成到世界中的实体。

#### size 方法

```typescript
size(): number
```

**返回值**：number，当前内容包存储在该方块实体存储中的实体数量。

#### store 方法

<RestrictedMode inline/>

```typescript
store(entity: Entity): string
```

- entity: [Entity](../../server/entity_and_player/entity#entity-类)，要存储的实体。

**返回值**：string，实体的唯一 ID。

#### transfer 方法

<RestrictedMode inline/>

```typescript
transfer(entityId: string, targetBlock: Block): void
```

- entityId: string，要转移的实体的唯一 ID。
- targetBlock: [Block](../../server/block/main#block-类)，接收实体的目标方块。

### BlockEntityStorageInfo 类

<Version type="script" experimental="测试版API"/>

方块实体存储中已存储实体的信息。

```typescript
class BlockEntityStorageInfo {
    private constructor();
    readonly definitionId: string;
    readonly uniqueId: string;
}
```

#### 属性

- <ReadOnly/> definitionId: string，实体的定义 ID，例如 `minecraft:pig`。
- <ReadOnly/> uniqueId: string，已存储实体的唯一 ID，供释放或转移时使用。

---

## 方块配方合成组件

### BlockRecipeCraftingComponent 类

<Version type="script" experimental="测试版API"/>

方块配方合成组件。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockRecipeCraftingComponent extends BlockComponent {
    private constructor();
    readonly players: Player[];
    static readonly componentId = 'minecraft:recipe_crafting';
    getCraftingContext(player: Player): RecipeCraftingContext | undefined;
}
```

#### 属性

- <ReadOnly/> players: [Player](../../server/entity_and_player/player#player-类)[]，当前与该方块交互的所有玩家组成的数组。

#### getCraftingContext 方法

```typescript
getCraftingContext(player: Player): RecipeCraftingContext | undefined
```

- player: [Player](../../server/entity_and_player/player#player-类)，要获取合成上下文的玩家。

**返回值**：[RecipeCraftingContext](#recipecraftingcontext-类) | undefined，该玩家的配方合成上下文；若玩家未交互则为`undefined`。

### RecipeCraftingContext 类

<Version type="script" experimental="测试版API"/>

配方合成上下文。

```typescript
class RecipeCraftingContext {
    private constructor();
    readonly inputSlotCount: number;
    readonly isValid: boolean;
    readonly validRecipes: string[];
    getInputItem(slot: number): ItemStack | undefined;
    getOutputItem(): ItemStack | undefined;
    setInputItem(slot: number, item?: ItemStack): void;
    setSelectedRecipe(recipeId: string): void;
}
```

#### 属性

- <ReadOnly/> inputSlotCount: number，可寻址输入槽的数量。
- <ReadOnly/> isValid: boolean，该配方合成上下文是否有效。玩家关闭合成界面或离开后失效。
- <ReadOnly/> validRecipes: string[]，对当前输入物品有效的配方标识符。

#### getInputItem 方法

```typescript
getInputItem(slot: number): ItemStack | undefined
```

- slot: number，要读取的输入槽。

**返回值**：[ItemStack](../../server/item/main#itemstack-类) | undefined，输入槽中的物品堆叠；若槽为空则为`undefined`。

#### getOutputItem 方法

```typescript
getOutputItem(): ItemStack | undefined
```

**返回值**：[ItemStack](../../server/item/main#itemstack-类) | undefined，当前选中配方的输出物品堆叠；若无输出则为`undefined`。

#### setInputItem 方法

<RestrictedMode inline/>

```typescript
setInputItem(slot: number, item?: ItemStack): void
```

- slot: number，要设置的输入槽。
- item?: [ItemStack](../../server/item/main#itemstack-类)，要放入输入槽的物品（可选）。

#### setSelectedRecipe 方法

<RestrictedMode inline/>

```typescript
setSelectedRecipe(recipeId: string): void
```

- recipeId: string，要选中的配方标识符。

### InvalidRecipeError 类

<Version type="script" experimental="测试版API"/>

无效配方错误。

继承自Error。

```typescript
class InvalidRecipeError extends Error {
    private constructor();
    readonly recipeId: string;
}
```

#### 属性

- <ReadOnly/> recipeId: string，无效配方的标识符。

---

## 方块配方加工组件

### BlockRecipeProcessingComponent 类

<Version type="script" experimental="测试版API"/>

方块配方加工组件。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockRecipeProcessingComponent extends BlockComponent {
    private constructor();
    readonly inputSlotCount: number;
    static readonly componentId = 'minecraft:recipe_processing';
    getInputItem(slot: number): ItemStack | undefined;
    getInputSlotEnabled(slot: number): boolean;
    getOutputItem(): ItemStack | undefined;
    setInputItem(slot: number, item?: ItemStack): void;
    setInputSlotEnabled(slot: number, enabled: boolean): void;
}
```

#### 属性

- <ReadOnly/> inputSlotCount: number，可寻址输入槽的数量。

#### getInputItem 方法

```typescript
getInputItem(slot: number): ItemStack | undefined
```

- slot: number，要读取的输入槽。

**返回值**：[ItemStack](../../server/item/main#itemstack-类) | undefined，输入槽中的物品堆叠；若槽为空则为`undefined`。

#### getInputSlotEnabled 方法

```typescript
getInputSlotEnabled(slot: number): boolean
```

- slot: number，要读取的输入槽。

**返回值**：boolean，该输入槽是否启用。

#### getOutputItem 方法

```typescript
getOutputItem(): ItemStack | undefined
```

**返回值**：[ItemStack](../../server/item/main#itemstack-类) | undefined，输出物品堆叠；若当前输入未产生输出则为`undefined`。

#### setInputItem 方法

<RestrictedMode inline/>

```typescript
setInputItem(slot: number, item?: ItemStack): void
```

- slot: number，要设置的输入槽。
- item?: [ItemStack](../../server/item/main#itemstack-类)，要放入输入槽的物品（可选）。

#### setInputSlotEnabled 方法

<RestrictedMode inline/>

```typescript
setInputSlotEnabled(slot: number, enabled: boolean): void
```

- slot: number，要设置的输入槽。
- enabled: boolean，是否启用该输入槽。

---

## 方块振动属性组件

### BlockVibrationPropertiesComponent 类

<Version type="script" experimental="测试版API"/>

方块振动属性组件。

继承自[BlockComponent](#blockcomponent-类)。

```typescript
class BlockVibrationPropertiesComponent extends BlockComponent {
    private constructor();
    static readonly componentId = 'minecraft:vibration_properties';
    getCanDampenVibrations(): boolean;
    getCanOccludeVibrations(): boolean;
}
```

#### getCanDampenVibrations 方法

```typescript
getCanDampenVibrations(): boolean
```

**返回值**：boolean，该方块是否能抑制振动。

#### getCanOccludeVibrations 方法

```typescript
getCanOccludeVibrations(): boolean
```

**返回值**：boolean，该方块是否能遮挡振动。

---

## 组件映射

### BlockComponentTypeMap 类型

<Version type="script" add="1.18.0"/>

方块组件标识符与组件类之间的映射，键为组件标识符，值为对应的组件类。

```typescript
type BlockComponentTypeMap = {
    dynamic_properties: BlockDynamicPropertiesComponent;
    entity_storage: BlockEntityStorageComponent;
    fluid_container: BlockFluidContainerComponent;
    instrument_sound: BlockInstrumentComponent;
    inventory: BlockInventoryComponent;
    map_color: BlockMapColorComponent;
    'minecraft:dynamic_properties': BlockDynamicPropertiesComponent;
    'minecraft:entity_storage': BlockEntityStorageComponent;
    'minecraft:fluid_container': BlockFluidContainerComponent;
    'minecraft:instrument_sound': BlockInstrumentComponent;
    'minecraft:inventory': BlockInventoryComponent;
    'minecraft:map_color': BlockMapColorComponent;
    'minecraft:movable': BlockMovableComponent;
    'minecraft:piston': BlockPistonComponent;
    'minecraft:precipitation_interactions': BlockPrecipitationInteractionsComponent;
    'minecraft:recipe_crafting': BlockRecipeCraftingComponent;
    'minecraft:recipe_processing': BlockRecipeProcessingComponent;
    'minecraft:record_player': BlockRecordPlayerComponent;
    'minecraft:redstone_producer': BlockRedstoneProducerComponent;
    'minecraft:sign': BlockSignComponent;
    'minecraft:vibration_properties': BlockVibrationPropertiesComponent;
    movable: BlockMovableComponent;
    piston: BlockPistonComponent;
    precipitation_interactions: BlockPrecipitationInteractionsComponent;
    recipe_crafting: BlockRecipeCraftingComponent;
    recipe_processing: BlockRecipeProcessingComponent;
    record_player: BlockRecordPlayerComponent;
    redstone_producer: BlockRedstoneProducerComponent;
    sign: BlockSignComponent;
    vibration_properties: BlockVibrationPropertiesComponent;
}
```

### BlockComponentReturnType 类型

<Version type="script" add="1.18.0"/>

按方块组件标识符取得对应组件类的类型工具；未知标识符会回退为[BlockCustomComponentInstance](../system/custom_block_component#blockcustomcomponentinstance-类)。

```typescript
type BlockComponentReturnType<T extends string> = T extends keyof BlockComponentTypeMap
    ? BlockComponentTypeMap[T]
    : BlockCustomComponentInstance
```

---

## 错误

### InvalidBlockComponentError 类

<Version type="script" add="2.4.0"/>

方块已失效，或访问方块并不具备的组件时抛出该错误。

继承自Error。

```typescript
class InvalidBlockComponentError extends Error {
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
