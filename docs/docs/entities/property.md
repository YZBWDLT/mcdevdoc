---
sidebar_position: 5
---

# 实体属性

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Version from "/src/components/highlight/version"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

<Version add="1.19.50"/>

实体属性（Entity Properties），又称活动对象属性（Actor Properties），用于为实体存储自定义状态，作用类似于方块状态。

同一类型实体的每个实例都拥有独立的属性值，且该值会随存档保存。属性还可以选择同步到客户端，供资源包的动画、动画控制器与渲染控制器读取。

用属性来表达状态，可以避免为了一个无关的状态去借用`minecraft:is_baby`这类组件——既不会引入组件的副作用，数据结构也更清晰。

## 实体定义文件格式

属性定义在服务端实体定义的[`description`](./description#行为包定义格式)下的<DataType type="object" name="properties"/>中。

<treeview>

- <DataType type="object" name="properties"/>：实体属性列表。
    - <DataType type="object" name="(属性 ID)"/>：定义一个属性。属性 ID 必须带命名空间，且不可使用`minecraft`。
        - <DataType type="string" name="type" isRequired/>：属性的类型。可选值为`bool`、`int`、`float`、`enum`。
        - <DataType type="array" name="range"/>：属性的取值范围，仅`int`与`float`使用。填写为`[最小值, 最大值]`的两元素数组。
            - <DataType type="int"/>：最小值。
            - <DataType type="int"/>：最大值。
        - <DataType type="array" name="values"/>：`enum`类型的全部合法取值，最多 16 项。
            - <DataType type="string"/>：一个枚举值。
        - <DataType type="boolean" name="default"/>：（写法 1）布尔型默认值。
        - <DataType type="int" name="default"/>：（写法 2）整数型默认值。
        - <DataType type="float" name="default"/>：（写法 3）浮点型默认值。
        - <DataType type="string" name="default"/>：（写法 4）字符串型默认值，或返回值的 Molang 表达式。表达式有两条限制：不能读取或赋值 Molang 变量（此时实体尚未构造），且唯一可用的查询是`query.had_component_group`。后者用于兼容旧存档——实体从旧数据加载时，可以据此还原旧组件组对应的状态。
        - <DataType type="boolean" name="client_sync"/>：是否将属性同步到客户端。默认值为`false`。设为`true`后属性会同步到客户端，资源包中的动画、动画控制器与渲染控制器即可通过`query.property`读取。

</treeview>

**实例 1**：嘎枝（<FileType type="file" name="creaking.json"/>）：一个带范围的整数属性与一个枚举属性。

```json showLineNumbers
"properties": {
    "minecraft:creaking_swaying_ticks": {
        "type": "int",
        "range": [0, 6],
        "default": 0,
        "client_sync": true
    },
    "minecraft:creaking_state": {
        "type": "enum",
        "values": ["neutral", "hostile_observed", "hostile_unobserved", "twitching", "crumbling"],
        "default": "neutral",
        "client_sync": true
    }
}
```

**实例 2**：蜜蜂（<FileType type="file" name="bee.json"/>）：`default`运用表达式的一个原版实例，若旧存档中的蜜蜂带有`has_nectar`组件组，则属性初始化为`true`。

```json showLineNumbers
"properties": {
    "minecraft:has_nectar": {
        "type": "bool",
        "client_sync": true,
        "default": "query.had_component_group('has_nectar')"
    }
}
```

**实例 3**：犰狳（<FileType type="file" name="armadillo.json"/>）：`minecraft:armadillo_state`开启了同步。

```json showLineNumbers
"minecraft:armadillo_state": {
    "type": "enum",
    "values": ["unrolled", "rolled_up", "rolled_up_peeking", "rolled_up_relaxing", "rolled_up_unrolling"],
    "default": "unrolled",
    "client_sync": true
}
```

资源包中据此预先计算动画变量（<FileType type="file" name="armadillo.entity.json"/>）：

```json showLineNumbers
"scripts": {
    "pre_animation": [
        "variable.is_rolled_up = query.property('minecraft:armadillo_state') != 'unrolled';",
        "variable.is_peeking = query.property('minecraft:armadillo_state') == 'rolled_up_peeking';"
    ]
}
```

## 读取与修改

### Molang

`query.property`接收属性 ID，返回该属性的值；属性不存在时会返回`0`并输出内容日志错误。`query.has_property`用于判断属性是否存在，存在返回`1`、不存在返回`0`。实体常用的其他查询见[与实体有关的 Molang 查询函数](./molang)。

### 过滤器

属性可以被[实体过滤器](./filters)读取，对应[`bool_property`](./filters#bool_property)、[`int_property`](./filters#int_property)、[`float_property`](./filters#float_property)、[`enum_property`](./filters#enum_property)与[`has_property`](./filters#has_property)五种测试。类型对应的测试用`domain`指定属性 ID。

旋风人（<FileType type="file" name="breeze.json"/>）：只有当闲置音效正在播放时才执行停止逻辑。

```json showLineNumbers
"filters": {
    "test": "bool_property",
    "domain": "minecraft:is_playing_idle_ground_sound",
    "value": true
}
```

### 实体事件

属性通过[`set_property`](./events#set_property)事件响应写入，也可在该响应中填写 Molang 表达式。表达式不能赋值 Molang 变量，但可以读取；除`query.property`与`query.has_property`外不能使用其他查询。

旋风人（<FileType type="file" name="breeze.json"/>）：播放音效的同时把属性记为`true`。

```json showLineNumbers
"minecraft:start_playing_idle_ground_sound": {
    "add": {
        "component_groups": ["minecraft:playing_idle_ground_sound"]
    },
    "set_property": {
        "minecraft:is_playing_idle_ground_sound": true
    }
}
```

### 脚本

脚本 API 中可通过_[Entity.getProperty 方法](/docs/docs/scripts/sapi/server/entity_and_player/entity#getproperty-方法)_读取属性值，用_[Entity.setProperty 方法](/docs/docs/scripts/sapi/server/entity_and_player/entity#setproperty-方法)_写入。

```ts showLineNumbers
customEntity.getProperty("minecraft:climate_variant");
```

## 限制

- 每个实体类型最多定义 **32 个**属性，其中开启`client_sync`的数量不限。
- `enum`类型的`values`最多 **16 项**，每项长度 1–32 字符，首字符必须是字母，其余可为字母、数字或下划线。
- `int`与`float`的值始终被限制在`range`内。超出范围时会被静默钳制，不会报错也不会输出警告。
- `int`属性通过 Molang 表达式赋值时存在浮点精度问题，建议将取值控制在 -100 万至 100 万之间。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [Introduction to Entity Properties | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoentityproperties?view=minecraft-bedrock-stable)
- [Entity Properties | Bedrock Wiki](https://wiki.bedrock.dev/entities/entity-properties)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
