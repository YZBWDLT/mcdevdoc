---
sidebar_position: 11
---

# 与实体有关的 Molang 查询函数

> 适用版本：国际版 26.60，中国版 3.10（1.21.130）。

下文收录了实体定义、动画与渲染中最常用的 Molang 查询函数。所有 Molang 均链接到官方文档，读者可点击查阅。

Molang 的查询函数本身是通用的，不区分物品、方块或实体；本页只列出与实体相关且常用的部分，完整列表见[官方文档](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions?view=minecraft-bedrock-stable)。其中与属性有关的用法见[实体属性](./property#读取与修改)。

---

## 实体属性

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.property`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_property?view=minecraft-bedrock-stable) | 返回指定属性的值；属性不存在时返回`0.0`。 | 属性值 | `query.property('example:state') == 'on'` |
| [`query.has_property`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_has_property?view=minecraft-bedrock-stable) | 返回实体是否拥有指定属性。 | 否：`0.0`，是：`1.0` | `query.has_property('example:state')` |
| [`query.had_component_group`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_had_component_group?view=minecraft-bedrock-stable) | 仅在行为包中、于属性的默认值表达式内可用。若实体由带有指定组件组的旧存档加载而来则返回`1.0`。 | 否：`0.0`，是：`1.0` | `query.had_component_group('has_nectar')` |

---

## 身份与状态

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.is_alive`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_alive?view=minecraft-bedrock-stable) | 返回实体是否存活。 | 否：`0.0`，是：`1.0` | `query.is_alive` |
| [`query.is_baby`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_baby?view=minecraft-bedrock-stable) | 返回实体是否为幼年体。 | 否：`0.0`，是：`1.0` | `query.is_baby` |
| [`query.is_elder`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_elder?view=minecraft-bedrock-stable) | 返回实体是否为成年体（守卫者等生物的「长者」形态）。 | 否：`0.0`，是：`1.0` | `query.is_elder` |
| [`query.is_tamed`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_tamed?view=minecraft-bedrock-stable) | 返回实体是否已被驯服。 | 否：`0.0`，是：`1.0` | `query.is_tamed` |
| [`query.is_saddled`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_saddled?view=minecraft-bedrock-stable) | 返回实体是否已装备鞍。 | 否：`0.0`，是：`1.0` | `query.is_saddled` |
| [`query.is_chested`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_chested?view=minecraft-bedrock-stable) | 返回实体是否装备了箱子。 | 否：`0.0`，是：`1.0` | `query.is_chested` |
| [`query.is_sheared`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_sheared?view=minecraft-bedrock-stable) | 返回实体是否已被剪毛。 | 否：`0.0`，是：`1.0` | `query.is_sheared` |
| [`query.is_charged`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_charged?view=minecraft-bedrock-stable) | 返回实体是否处于充能状态（如苦力怕、蜜蜂）。 | 否：`0.0`，是：`1.0` | `query.is_charged` |
| [`query.is_pregnant`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_pregnant?view=minecraft-bedrock-stable) | 返回实体是否怀孕。 | 否：`0.0`，是：`1.0` | `query.is_pregnant` |
| [`query.is_ignited`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_ignited?view=minecraft-bedrock-stable) | 返回实体是否已被点燃。 | 否：`0.0`，是：`1.0` | `query.is_ignited` |
| [`query.is_stunned`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_stunned?view=minecraft-bedrock-stable) | 返回实体是否处于眩晕状态。 | 否：`0.0`，是：`1.0` | `query.is_stunned` |
| [`query.is_invisible`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_invisible?view=minecraft-bedrock-stable) | 返回实体是否隐形。 | 否：`0.0`，是：`1.0` | `query.is_invisible` |
| [`query.anger_level`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_anger_level?view=minecraft-bedrock-stable) | 返回实体的愤怒等级`[0, n)`；无愤怒等级时返回`0`。仅服务端可用。 | 愤怒等级 | `query.anger_level > 0` |
| [`query.variant`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_variant?view=minecraft-bedrock-stable) | 返回实体的变种编号。 | 变种编号 | `query.variant == 2` |
| [`query.mark_variant`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_mark_variant?view=minecraft-bedrock-stable) | 返回实体的标记变种编号。 | 标记变种编号 | `query.mark_variant == 1` |
| [`query.skin_id`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_skin_id?view=minecraft-bedrock-stable) | 返回实体的皮肤编号。 | 皮肤编号 | `query.skin_id` |
| [`query.is_powered`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_powered?view=minecraft-bedrock-stable) | 返回实体是否处于充能状态。 | 否：`0.0`，是：`1.0` | `query.is_powered` |

---

## 生命

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.health`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_health?view=minecraft-bedrock-stable) | 返回实体的当前血量。 | 血量 | `query.health < 10` |
| [`query.max_health`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_max_health?view=minecraft-bedrock-stable) | 返回实体的最大血量。 | 血量 | `query.health / query.max_health < 0.5` |
| [`query.death_ticks`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_death_ticks?view=minecraft-bedrock-stable) | 返回实体开始死亡后经过的刻数。 | 刻数 | `query.death_ticks > 20` |
| [`query.hurt_time`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_hurt_time?view=minecraft-bedrock-stable) | 返回实体的受伤时间。 | 游戏刻 | `query.hurt_time > 0` |
| [`query.hurt_direction`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_hurt_direction?view=minecraft-bedrock-stable) | 返回实体受伤的方向。 | 角度 | `query.hurt_direction` |
| [`query.invulnerable_ticks`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_invulnerable_ticks?view=minecraft-bedrock-stable) | 返回实体剩余的无敌刻数。 | 刻数 | `query.invulnerable_ticks` |

---

## 战斗

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.has_target`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_has_target?view=minecraft-bedrock-stable) | 返回实体是否有目标。 | 否：`0.0`，是：`1.0` | `query.has_target` |
| [`query.target_x_rotation`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_target_x_rotation?view=minecraft-bedrock-stable) | 返回瞄准当前目标所需的俯仰角；无目标时返回`0.0`。 | 角度 | `query.target_x_rotation` |
| [`query.target_y_rotation`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_target_y_rotation?view=minecraft-bedrock-stable) | 返回瞄准当前目标所需的偏航角；无目标时返回`0.0`。 | 角度 | `query.target_y_rotation` |
| [`query.blocking`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_blocking?view=minecraft-bedrock-stable) | 返回实体是否正在格挡。 | 否：`0.0`，是：`1.0` | `query.blocking` |
| [`query.is_critical`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_critical?view=minecraft-bedrock-stable) | 返回实体是否处于暴击状态。 | 否：`0.0`，是：`1.0` | `query.is_critical` |
| [`query.fuse_time`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_fuse_time?view=minecraft-bedrock-stable) | 返回实体剩余的引信时间；实体没有`minecraft:explode`组件时返回`-1`。 | 秒 | `query.fuse_time < 1.0` |
| [`query.can_damage_nearby_mobs`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_can_damage_nearby_mobs?view=minecraft-bedrock-stable) | 返回实体能否伤害附近的生物。 | 否：`0.0`，是：`1.0` | `query.can_damage_nearby_mobs` |

---

## 移动与姿态

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.can_climb`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_can_climb?view=minecraft-bedrock-stable) | 返回实体能否攀爬。 | 否：`0.0`，是：`1.0` | `query.can_climb` |
| [`query.can_fly`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_can_fly?view=minecraft-bedrock-stable) | 返回实体能否飞行。 | 否：`0.0`，是：`1.0` | `query.can_fly` |
| [`query.can_swim`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_can_swim?view=minecraft-bedrock-stable) | 返回实体能否游泳。 | 否：`0.0`，是：`1.0` | `query.can_swim` |
| [`query.can_walk`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_can_walk?view=minecraft-bedrock-stable) | 返回实体能否行走。 | 否：`0.0`，是：`1.0` | `query.can_walk` |
| [`query.can_power_jump`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_can_power_jump?view=minecraft-bedrock-stable) | 返回实体能否蓄力跳跃。 | 否：`0.0`，是：`1.0` | `query.can_power_jump` |
| [`query.ground_speed`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_ground_speed?view=minecraft-bedrock-stable) | 返回实体的地面速度，单位为米/秒。 | 米/秒 | `query.ground_speed > 0.1` |
| [`query.modified_move_speed`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_modified_move_speed?view=minecraft-bedrock-stable) | 返回实体的当前移动速度，已被`is_baby`、着火等状态修正。 | 米/秒 | `query.modified_move_speed > 0.2` |
| [`query.modified_distance_moved`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_modified_distance_moved?view=minecraft-bedrock-stable) | 返回实体累计水平移动的距离，单位为米，从上次加载算起；该值会被`is_baby`、着火等状态修正。 | 米 | `query.modified_distance_moved` |
| [`query.vertical_speed`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_vertical_speed?view=minecraft-bedrock-stable) | 返回实体的垂直速度，单位为米/秒，向上为正。 | 米/秒 | `query.vertical_speed < 0` |
| [`query.is_moving`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_moving?view=minecraft-bedrock-stable) | 返回实体是否正在移动。 | 否：`0.0`，是：`1.0` | `query.is_moving` |
| [`query.is_sneaking`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_sneaking?view=minecraft-bedrock-stable) | 返回实体是否正在潜行。 | 否：`0.0`，是：`1.0` | `query.is_sneaking` |
| [`query.is_sprinting`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_sprinting?view=minecraft-bedrock-stable) | 返回实体是否正在疾跑。 | 否：`0.0`，是：`1.0` | `query.is_sprinting` |
| [`query.is_jumping`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_jumping?view=minecraft-bedrock-stable) | 返回实体是否正在跳跃。 | 否：`0.0`，是：`1.0` | `query.is_jumping` |
| [`query.is_on_ground`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_on_ground?view=minecraft-bedrock-stable) | 返回实体是否站在地面上。 | 否：`0.0`，是：`1.0` | `query.is_on_ground` |
| [`query.is_swimming`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_swimming?view=minecraft-bedrock-stable) | 返回实体是否正在游泳。 | 否：`0.0`，是：`1.0` | `query.is_swimming` |
| [`query.is_gliding`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_gliding?view=minecraft-bedrock-stable) | 返回实体是否正在滑翔。 | 否：`0.0`，是：`1.0` | `query.is_gliding` |
| [`query.is_crawling`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_crawling?view=minecraft-bedrock-stable) | 返回实体是否正在爬行。 | 否：`0.0`，是：`1.0` | `query.is_crawling` |
| [`query.is_sleeping`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_sleeping?view=minecraft-bedrock-stable) | 返回实体是否正在睡觉。 | 否：`0.0`，是：`1.0` | `query.is_sleeping` |
| [`query.is_sitting`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_sitting?view=minecraft-bedrock-stable) | 返回实体是否正在坐下。 | 否：`0.0`，是：`1.0` | `query.is_sitting` |
| [`query.is_standing`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_standing?view=minecraft-bedrock-stable) | 返回实体是否正在站立。 | 否：`0.0`，是：`1.0` | `query.is_standing` |
| [`query.is_eating`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_eating?view=minecraft-bedrock-stable) | 返回实体是否正在进食。 | 否：`0.0`，是：`1.0` | `query.is_eating` |
| [`query.is_using_item`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_using_item?view=minecraft-bedrock-stable) | 返回实体是否正在使用物品。 | 否：`0.0`，是：`1.0` | `query.is_using_item` |
| [`query.is_dancing`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_dancing?view=minecraft-bedrock-stable) | 返回实体是否正在跳舞。 | 否：`0.0`，是：`1.0` | `query.is_dancing` |

---

## 环境

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.is_in_water`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_in_water?view=minecraft-bedrock-stable) | 返回实体是否位于水中。 | 否：`0.0`，是：`1.0` | `query.is_in_water` |
| [`query.head_is_in_water`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_head_is_in_water?view=minecraft-bedrock-stable) | 返回实体的头部是否位于水中。 | 否：`0.0`，是：`1.0` | `query.head_is_in_water` |
| [`query.is_in_lava`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_in_lava?view=minecraft-bedrock-stable) | 返回实体是否位于熔岩中。 | 否：`0.0`，是：`1.0` | `query.is_in_lava` |
| [`query.is_on_fire`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_on_fire?view=minecraft-bedrock-stable) | 返回实体是否着火。 | 否：`0.0`，是：`1.0` | `query.is_on_fire` |
| [`query.is_in_contact_with_water`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_in_contact_with_water?view=minecraft-bedrock-stable) | 返回实体是否接触水，包括水、雨水与喷溅水瓶。 | 否：`0.0`，是：`1.0` | `query.is_in_contact_with_water` |
| [`query.is_in_water_or_rain`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_in_water_or_rain?view=minecraft-bedrock-stable) | 返回实体是否位于水中或雨中。 | 否：`0.0`，是：`1.0` | `query.is_in_water_or_rain` |
| [`query.has_biome_tag`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_has_biome_tag?view=minecraft-bedrock-stable) | 返回当前位置的生物群系是否带有指定标签。可传入`(tag)`、`(tag, x, z)`或`(tag, x, y, z)`。 | 否：`0.0`，是：`1.0` | `query.has_biome_tag('spawns_warm_variant_farm_animals')` |
| [`query.entity_biome_has_any_tags`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_entity_biome_has_any_tags?view=minecraft-bedrock-stable) | 返回实体所在生物群系是否带有任一指定标签。仅资源包（客户端）可用。 | 否：`0.0`，是：`1.0` | `query.entity_biome_has_any_tags('forest', 'jungle')` |
| [`query.time_of_day`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_time_of_day?view=minecraft-bedrock-stable) | 返回实体所在维度的时间：午夜`0.0`、日出`0.25`、正午`0.5`、日落`0.75`。 | `0.0`-`1.0` | `query.time_of_day > 0.75` |
| [`query.moon_phase`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_moon_phase?view=minecraft-bedrock-stable) | 返回月相：满月`0`、亏凸月`1`、上弦月`2`、残月`3`、新月`4`、娥眉月`5`、下弦月`6`、盈凸月`7`。 | `0`-`7` | `query.moon_phase == 0` |

---

## 装备

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.equipment_count`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_equipment_count?view=minecraft-bedrock-stable) | 返回实体已装备的盔甲件数`0`-`5`，不含手持物品。 | `0`-`5` | `query.equipment_count == 0` |
| [`query.has_armor_slot`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_has_armor_slot?view=minecraft-bedrock-stable) | 返回实体指定盔甲槽位是否有装备。槽位索引为`0`（头）、`1`（胸）、`2`（腿）、`3`（脚）。 | 否：`0.0`，是：`1.0` | `query.has_armor_slot(0)` |
| [`query.armor_damage_slot`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_armor_damage_slot?view=minecraft-bedrock-stable) | 返回指定盔甲槽位的损伤值。槽位索引为`0`（头）、`1`（胸）、`2`（腿）、`3`（脚）、`4`（身）。 | 损伤值 | `query.armor_damage_slot(0)` |
| [`query.armor_color_slot`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_armor_color_slot?view=minecraft-bedrock-stable) | 返回指定盔甲槽位的颜色。槽位索引为`0`（头）、`1`（胸）、`2`（腿）、`3`（脚）、`4`（身）。 | 颜色 | `query.armor_color_slot(0)` |
| [`query.equipped_item_all_tags`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_equipped_item_all_tags?view=minecraft-bedrock-stable) | 返回指定槽位的物品是否带有全部指定标签。 | 否：`0.0`，是：`1.0` | `query.equipped_item_all_tags('slot.weapon.mainhand', 'minecraft:is_tool')` |
| [`query.equipped_item_any_tag`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_equipped_item_any_tag?view=minecraft-bedrock-stable) | 返回指定槽位的物品是否带有任一指定标签。 | 否：`0.0`，是：`1.0` | `query.equipped_item_any_tag('slot.weapon.mainhand', 'minecraft:is_tool')` |
| [`query.is_item_equipped`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_item_equipped?view=minecraft-bedrock-stable) | 返回指定手持槽位是否有物品。参数为`0`或`main_hand`（主手）、`1`或`off_hand`（副手），省略时视为主手。 | 否：`0.0`，是：`1.0` | `query.is_item_equipped('main_hand')` |
| [`query.is_item_name_any`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_item_name_any?view=minecraft-bedrock-stable) | 返回指定槽位的物品是否为给定名称之一。可传入空字符串`''`以检查空槽位。 | 否：`0.0`，是：`1.0` | `query.is_item_name_any('slot.weapon.mainhand', 'minecraft:bow')` |
| [`query.remaining_durability`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_remaining_durability?view=minecraft-bedrock-stable) | 返回物品剩余的耐久度。 | 耐久度 | `query.remaining_durability > 0` |
| [`query.main_hand_item_use_duration`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_main_hand_item_use_duration?view=minecraft-bedrock-stable) | 返回主手物品的使用时间。 | 秒 | `query.main_hand_item_use_duration` |

---

## 骑乘与从属

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.is_riding`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_riding?view=minecraft-bedrock-stable) | 返回实体是否正在骑乘其他实体。 | 否：`0.0`，是：`1.0` | `query.is_riding` |
| [`query.has_rider`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_has_rider?view=minecraft-bedrock-stable) | 返回实体身上是否有骑乘者。 | 否：`0.0`，是：`1.0` | `query.has_rider` |
| [`query.has_player_rider`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_has_player_rider?view=minecraft-bedrock-stable) | 返回实体身上是否有玩家骑乘。 | 否：`0.0`，是：`1.0` | `query.has_player_rider` |
| [`query.is_leashed`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_is_leashed?view=minecraft-bedrock-stable) | 返回实体是否被拴绳拴住。 | 否：`0.0`，是：`1.0` | `query.is_leashed` |
| [`query.has_owner`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_has_owner?view=minecraft-bedrock-stable) | 返回实体是否拥有主人。 | 否：`0.0`，是：`1.0` | `query.has_owner` |

---

## 动画与渲染

| Molang | 描述 | 返回值 | 示例 |
| --- | --- | --- | --- |
| [`query.anim_time`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_anim_time?view=minecraft-bedrock-stable) | 返回当前动画已播放的时间，单位为秒；不在动画中时返回`0.0`。 | 秒 | `query.anim_time > 0.5` |
| [`query.life_time`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_life_time?view=minecraft-bedrock-stable) | 返回当前动画已播放的时间，单位为秒；不在动画中时返回`0.0`。 | 秒 | `query.life_time > 1.0` |
| [`query.delta_time`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_delta_time?view=minecraft-bedrock-stable) | 返回距上一帧经过的时间，单位为秒。 | 秒 | `query.delta_time` |
| [`query.frame_alpha`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_frame_alpha?view=minecraft-bedrock-stable) | 返回本帧在两个 AI 刻之间的插值比例`0`-`1`。 | `0`-`1` | `query.frame_alpha` |
| [`query.all_animations_finished`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_all_animations_finished?view=minecraft-bedrock-stable) | 仅在动画控制器中可用。返回当前状态的全部动画是否都至少播放过一次。 | 否：`0.0`，是：`1.0` | `query.all_animations_finished` |
| [`query.any_animation_finished`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_any_animation_finished?view=minecraft-bedrock-stable) | 仅在动画控制器中可用。返回当前状态是否有动画至少播放过一次。 | 否：`0.0`，是：`1.0` | `query.any_animation_finished` |
| [`query.state_time`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_state_time?view=minecraft-bedrock-stable) | 仅在动画控制器中可用。返回进入当前状态后经过的时间，单位为秒。 | 秒 | `query.state_time > 1.0` |
| [`query.base_swing_duration`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_base_swing_duration?view=minecraft-bedrock-stable) | 返回生物挥击/攻击动画的时长，由手持物品决定，不受状态效果影响。 | 秒 | `query.base_swing_duration` |
| [`query.walk_distance`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_walk_distance?view=minecraft-bedrock-stable) | 返回实体在地面且未潜行时累计移动的距离。 | 方块 | `query.walk_distance > 100` |
| [`query.body_y_rotation`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_body_y_rotation?view=minecraft-bedrock-stable) | 返回实体的身体偏航角，非实体返回`0.0`。 | 角度 | `query.body_y_rotation` |
| [`query.head_y_rotation`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_head_y_rotation?view=minecraft-bedrock-stable) | 返回实体头部的偏航角。马、驴等生物需要第二个参数以限定角度。 | 角度 | `query.head_y_rotation(0)` |
| [`query.yaw_speed`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_yaw_speed?view=minecraft-bedrock-stable) | 返回实体的偏航角速度。 | 角度/秒 | `query.yaw_speed` |
| [`query.model_scale`](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions/query_model_scale?view=minecraft-bedrock-stable) | 返回当前实体的缩放比例。 | 倍数 | `query.model_scale` |

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [Molang 查询函数 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/queryfunctions?view=minecraft-bedrock-stable)

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
