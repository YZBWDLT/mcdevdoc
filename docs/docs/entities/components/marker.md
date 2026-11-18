---
sidebar_position: 6
sidebar_label: 标记组件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"

# 标记组件

标记组件是用于标记实体状态的组件，它们并不具有任何功能，只能在相关 Molang 中读取其状态。在旧版本中，常常使用这些标记组件记录实体的状态，但 1.19.50 开放的[实体属性](../property)完全可以完全替代下文的标记组件，因此现在这些组件已不常使用。

要定位某一条，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=entity_component" color="green"/>

### `minecraft:is_baby`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体为幼年体。

另见：_[EntityIsBabyComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisbabycomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_baby"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体为幼年体（<FileType type="file" name="armadillo.json"/>）：

```json showLineNumbers
"minecraft:is_baby": {}
```

</TabItem></Tabs>

---

### `minecraft:is_charged`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体为充能状态。

另见：_[EntityIsChargedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityischargedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_charged"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体处于闪电强化的状态（<FileType type="file" name="creeper.json"/>）：

```json showLineNumbers
"minecraft:is_charged": {}
```

</TabItem></Tabs>

---

### `minecraft:is_chested`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前携带箱子。

另见：_[EntityIsChestedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityischestedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_chested"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前驮着箱子（<FileType type="file" name="donkey.json"/>）：

```json showLineNumbers
"minecraft:is_chested": {}
```

</TabItem></Tabs>

---

### `minecraft:is_ignited`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前处于着火状态。

另见：_[EntityIsIgnitedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisignitedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_ignited"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前处于点燃状态（<FileType type="file" name="tnt_minecart.json"/>）：

```json showLineNumbers
"minecraft:is_ignited": {}
```

</TabItem></Tabs>

---

### `minecraft:is_pregnant`

<Usable type="all"/> <Version add="1.20.0"/> <br/>

设置该实体当前处于怀孕状态。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_pregnant"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前处于怀孕状态（<FileType type="file" name="sniffer.json"/>）：

```json showLineNumbers
"minecraft:is_pregnant": {}
```

</TabItem></Tabs>

---

### `minecraft:is_saddled`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前装备了鞍。

另见：_[EntityIsSaddledComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityissaddledcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_saddled"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前已装上鞍（<FileType type="file" name="camel.json"/>）：

```json showLineNumbers
"minecraft:is_saddled": {}
```

</TabItem></Tabs>

---

### `minecraft:is_shaking`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前处于颤抖状态。

另见：_[EntityIsShakingComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisshakingcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_shaking"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前正在颤抖（例如正在转化为僵尸）（<FileType type="file" name="hoglin.json"/>）：

```json showLineNumbers
"minecraft:is_shaking": {}
```

</TabItem></Tabs>

---

### `minecraft:is_sheared`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前已被剪毛。

另见：_[EntityIsShearedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisshearedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_sheared"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前已被剪毛（<FileType type="file" name="sheep.json"/>）：

```json showLineNumbers
"minecraft:is_sheared": {}
```

</TabItem></Tabs>

---

### `minecraft:is_stunned`

<Usable type="all"/> <Version add="1.11.0"/> <br/>

设置该实体当前处于眩晕状态。

另见：_[EntityIsStunnedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityisstunnedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_stunned"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前处于眩晕状态（<FileType type="file" name="ravager.json"/>）：

```json showLineNumbers
"minecraft:is_stunned": {}
```

</TabItem></Tabs>

---

### `minecraft:is_tamed`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

设置该实体当前已被驯服。

另见：_[EntityIsTamedComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityistamedcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:is_tamed"/>：根对象，不含任何参数。
</treeview>

</TabItem><TabItem value="示例" label="示例">

设置该实体当前已被驯服（<FileType type="file" name="camel.json"/>）：

```json showLineNumbers
"minecraft:is_tamed": {}
```

</TabItem></Tabs>

---

### `minecraft:mark_variant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

“Mark Variant”通常用于在 `variant` 之外，以按类型区分同一生物的其他外观形态。

另见：_[EntityMarkVariantComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entitymarkvariantcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:mark_variant"/>：根对象。
  - <DataType type="int" name="value"/>：标记变体的编号，按惯例`0`为基础形态。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

蜜蜂（<FileType type="file" name="bee.json"/>）：

```json showLineNumbers
"minecraft:mark_variant": {
    "value": 1
}
```

</TabItem></Tabs>

---

### `minecraft:skin_id`

<Usable type="all"/> <Version add="1.12.0"/> <br/>

皮肤 ID 值。

另见：_[EntitySkinIdComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityskinidcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:skin_id"/>：根对象。
  - <DataType type="int" name="value"/>：皮肤编号，按惯例`0`为基础皮肤。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

村民（<FileType type="file" name="villager_v2.json"/>）：

```json showLineNumbers
"minecraft:skin_id": {
    "value": 2
}
```

</TabItem></Tabs>

---

### `minecraft:variant`

<Usable type="all"/> <Version add="1.2.0"/> <br/>

“Variant”通常用于按类型区分同一生物的不同外观形态。

另见：_[EntityVariantComponent 类](/docs/docs/scripts/sapi/server/entity_and_player/component#entityvariantcomponent-类)_。

<Tabs><TabItem value="参数" label="参数" default>

<treeview>
- <DataType type="object" name="minecraft:variant"/>：根对象。
  - <DataType type="int" name="value"/>：变体编号，按惯例`0`为基础形态。默认值为`0`。
</treeview>

</TabItem><TabItem value="示例" label="示例">

美西螈（<FileType type="file" name="axolotl.json"/>）：不同颜色的变体分别使用`0`至`4`。

```json showLineNumbers
"minecraft:variant": {
    "value": 3
}
```

</TabItem></Tabs>
import GiscusComment from "/src/components/comment/giscus.js"
import Button from '/src/components/button/base';

<GiscusComment/>
