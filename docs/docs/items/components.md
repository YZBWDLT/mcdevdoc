# 组件

收录所有已开放的命名空间为`minecraft`和`netease`的物品组件信息。官方文档请见：[物品组件 - 微软文档](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponentlist?view=minecraft-bedrock-stable)。

:::info[本文更新时间]

本文于 2025 年 5 月 7 日更新，中国版最新版本为 1.20.50，国际版最新版本为 1.21.80。

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note[温馨提示]

1. 在组件描述中，**中国版物品可用**标为否的物品表示不能在`netease_beh_items`中定义的中国版物品中使用该组件，但仍可以直接在`items`中定义的国际版物品中使用该组件，并不代表中国版不可用。判断中国版是否可用物品组件的标准应当是游戏版本。
2. 以`netease`为命名空间的物品，代表国际版一定不可用。请在使用时注意衡量利弊。

:::

---

## `minecraft:allow_off_hand`

允许玩家将物品放在副手。

| 加入版本 | 中国版物品可用 | 官方文档链接 |
| --- | :---: | :---: |
| `1.20.20` | 否 | [点我查阅](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_allow_off_hand?view=minecraft-bedrock-stable) |

<Tabs>

<TabItem value="parameters" label="参数" default>

| 参数 | 类型 | 默认值 | 描述 |
| :---: | :---: | :---: | --- |
| `value` | 布尔值 | `false` | 是否能将物品放在副手 |

允许简化的写法：`"minecraft:allow_off_hand": Boolean`

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
"minecraft:allow_off_hand": true
```

```json showLineNumbers
"minecraft:allow_off_hand": {
    "value": true
}
```

</TabItem>

</Tabs>

---

## `minecraft:block_placer`

可以在特定方块上放置特定方块。

| 加入版本 | 中国版物品可用 | 官方文档链接 |
| --- | :---: | :---: |
| `1.20.10` | 否 | [点我查阅](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_block_placer?view=minecraft-bedrock-stable) |

<Tabs>

<TabItem value="parameters" label="参数" default>

| 参数 | 类型 | 默认值 | 描述 |
| :---: | :---: | :---: | --- |
| `block` | 字符串：方块 ID | —— | 指定对方块使用该物品时将放置的方块 |

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
(示例1)
```

</TabItem>

</Tabs>

---

## `minecraft:(组件名)`

(描述)。

| 加入版本 | 中国版物品可用 | 官方文档链接 |
| --- | :---: | :---: |
| `(版本号)` | 否 | [点我查阅](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_(组件名)?view=minecraft-bedrock-stable) |

<Tabs>

<TabItem value="parameters" label="参数" default>

| 参数 | 类型 | 默认值 | 描述 |
| :---: | :---: | :---: | --- |
| `(参数1)` | (类型1) | `(默认值1)` | (描述1) |

</TabItem>

<TabItem value="example" label="示例">

```json showLineNumbers
(示例1)
```

</TabItem>

</Tabs>
