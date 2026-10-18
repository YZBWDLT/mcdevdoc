---
sidebar_position: 10
---

# 运行时 ID

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Version from "/src/components/highlight/version"

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

运行时 ID（Runtime Identifier）用于让自定义实体继承某个原版实体的硬编码行为。举例来说，把自己的弹射物声明为`minecraft:arrow`，它就会获得箭的飞行物理与击退效果，而不必自己实现一遍。

需要注意，运行时 ID 只会解析**原版实体中被硬编码的部分**：

- **只接受原版实体的 ID**。把一个纯数据驱动的实体填进运行时 ID 不会产生任何效果，因为它没有硬编码行为可继承。
- **部分原版实体的硬编码行为会覆盖数据驱动组件**，例如潜影贝的碰撞箱尺寸无法由[`minecraft:collision_box`](./components#minecraftcollision_box)改变。
- 使用运行时 ID 后，实体的名称也会变成被继承实体所用的名称。

:::warning[注意]

运行时 ID 有可能会**直接破坏实体的正常行为**，并且使用其中的硬编码功能几乎必定会带来副作用——其硬编码的功能要么照单全收，要么全部放弃。因此该功能只适合在明确知道后果时使用。

:::

## 实体定义文件格式

运行时 ID 定义在服务端实体定义的<DataType type="object" name="description" isRequired/>下。

<treeview>

- <DataType type="string" name="runtime_identifier"/>：原版实体的 ID，如`minecraft:shulker`。

</treeview>

示例：让一个自定义实体表现得像潜影贝。

```json showLineNumbers
"description": {
    "identifier": "example:my_box",
    "runtime_identifier": "minecraft:shulker",
    "is_spawnable": true,
    "is_summonable": true
}
```

## 常见运行时 ID 及其效果

以下效果整理自社区实测，官方文档未收录完整列表。

### 投影物与特效

| 运行时 ID                     | 效果                                                                   |
| ----------------------------- | ---------------------------------------------------------------------- |
| `minecraft:arrow`             | 获得箭的飞行物理与击退；关闭死亡动画、音效与粒子；无法交互；阴影变小。 |
| `minecraft:thrown_trident`    | 获得三叉戟的飞行物理与击退；关闭死亡动画、音效与粒子。                 |
| `minecraft:snowball`          | 移除碰撞箱与阴影；不受重力影响；只朝南；无法交互；无声。               |
| `minecraft:shulker_bullet`    | 留下潜影贝子弹的粒子拖尾。                                             |
| `minecraft:evocation_fang`    | 接触即造成伤害；完全禁用碰撞。                                         |
| `minecraft:xp_orb`            | 禁用碰撞；接触玩家时给予经验。                                         |
| `minecraft:area_effect_cloud` | 禁用与世界及其他实体的碰撞；继承药水云的存在时长、施加状态效果与粒子。 |

### 生物与坐骑

| 运行时 ID              | 效果                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `minecraft:horse`      | 模型、贴图与动画替换为马。                                                                          |
| `minecraft:boat`       | 骑乘时显示船的界面；禁止旋转；船形实体碰撞箱。                                                      |
| `minecraft:minecart`   | 移除阴影；禁止旋转；死亡时掉落矿车。                                                                |
| `minecraft:blaze`      | 增加烈焰人的燃烧音效与粒子；即使没有飞行意向也会飞行。                                              |
| `minecraft:ghast`      | 使用`minecraft:behavior.random_look_around`的实体会偶尔直视上方。                                   |
| `minecraft:slime`      | 下落时生成史莱姆粒子；死亡时按变种分裂；攻击时可正常旋转。                                          |
| `minecraft:spider`     | 蜘蛛网不再减速；限制在光照等级`0`生成。                                                             |
| `minecraft:skeleton`   | 受到治疗伤害、被瞬间伤害治疗、免疫再生与中毒；亡灵杀手造成额外伤害；变种为`1`及以上时攻击附带凋零。 |
| `minecraft:parrot`     | 翅膀拍打动画可用；缓慢下落；随唱片跳舞。                                                            |
| `minecraft:panda`      | 配合`minecraft:behavior.random_sitting`让`query.is_grazing`、`query.sit_mount`生效。                |
| `minecraft:sheep`      | 配合`minecraft:behavior.eat_block`让`query.is_grazing`生效。                                        |
| `minecraft:piglin`     | 使`minecraft:celebrate_hunt`生效；装填弩时播放音效。                                                |
| `minecraft:iron_golem` | 攻击附带向上的额外击退；四肢动画加快（需手动调回）。                                                |
| `minecraft:squid`      | 可使用鱿鱼专属的行为组件；受伤时喷出墨汁粒子。                                                      |
| `minecraft:wither`     | 死亡时爆炸。                                                                                        |

### 伪装与特殊用途

| 运行时 ID                 | 效果                                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `minecraft:shulker`       | 获得`1`×`1`×`1`的实体碰撞箱；贴附在方块中心；所在方块被移除时传送到附近；碰撞箱尺寸不可改。          |
| `minecraft:armor_stand`   | 移除阴影；被击打立即消失；可穿脱装备；死亡掉落盔甲架。                                               |
| `minecraft:npc`           | 无视`minecraft:health`；创造模式下被击打立即消失，生存模式下不会被击伤。                             |
| `minecraft:ender_crystal` | 固定在生成位置；无法受到伤害；始终可被穿过；生成时着火。                                             |
| `minecraft:ender_dragon`  | 继承末影龙碰撞箱；破坏碰撞箱内的方块；只能通过[`/kill`](/docs/docs/commands/all_commands#kill)清除。 |
| `minecraft:falling_block` | 接触地面即消失；无法拥有状态效果。                                                                   |
| `minecraft:player`        | 启用`query.movement_direction`查询。                                                                 |
| `minecraft:creeper`       | 限制在光照等级`0`生成；带有`minecraft:owner_hurt_target`的实体不再以其为目标。                       |

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [Runtime Identifiers | Bedrock Wiki](https://wiki.bedrock.dev/entities/runtime-identifier)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
