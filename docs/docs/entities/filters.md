---
sidebar_position: 5
---

# 实体过滤器

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"
import Highlight from '/src/components/highlight/base';
import Usable from "/src/components/highlight/usable"
import Version from "/src/components/highlight/version"
import Button from '/src/components/button/base';

> 适用版本：国际版 26.30，中国版 3.8（1.21.90）。

:::warning[注意]

本文正在编辑中，缺少大量信息，仅供参考。

:::

实体过滤器（Entity Filters）用于在组件或事件中过滤出符合条件的实体。

## 过滤器格式

## 过滤器条件

## 全部过滤器列表

### actor_has_item_with_enchantment_in_slot

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/actor_has_item_with_enchantment_in_slot?view=minecraft-bedrock-stable"/>

Tests that an actor has an item equipped with a given enchantment.

---

### actor_health

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/actor_health?view=minecraft-bedrock-stable"/>

Tests the health of the subject.

---

### all_slots_empty

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/all_slots_empty?view=minecraft-bedrock-stable"/>

Returns true when the designated equipment location for the subject entity is completely empty.

<Version add="1.21.120" inline/> 现在支持`main_hand`作为装备位置。

---

### any_slot_empty

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/any_slot_empty?view=minecraft-bedrock-stable"/>

Returns true when the designated equipment location for the subject entity has any empty slot.

<Version add="1.21.120" inline/> 现在支持`main_hand`作为装备位置。

---

### bool_property

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/bool_property?view=minecraft-bedrock-stable"/>

Returns true when the bool actor property matches the value provided.

---

### clock_time

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/clock_time?view=minecraft-bedrock-stable"/>

Compares the current time with a float value in the range (0.0, 1.0). 0.0= Noon 0.25= Sunset 0.5= Midnight 0.75= Sunrise

---

### distance_to_nearest_player

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/distance_to_nearest_player?view=minecraft-bedrock-stable"/>

Compares the distance to the nearest Player with a float value.

---

### enum_property

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/enum_property?view=minecraft-bedrock-stable"/>

Returns true when the actor property matches the value provided.

---

### float_property

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/float_property?view=minecraft-bedrock-stable"/>

Returns true when the float actor property matches the value provided.

---

### has_ability

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_ability?view=minecraft-bedrock-stable"/>

Returns true when the subject entity has the named ability.

---

### has_biome_tag

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_biome_tag?view=minecraft-bedrock-stable"/>

Tests whether the biome the subject is in has the specified tag.

---

### has_component

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_component?view=minecraft-bedrock-stable"/>

Returns true when the subject entity contains the named component.

---

### has_container_open

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_container_open?view=minecraft-bedrock-stable"/>

Returns true when the subject Player entity has opened a container.

---

### has_damage

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_damage?view=minecraft-bedrock-stable"/>

Returns true when the subject entity receives the named damage type.

---

### has_damaged_equipment

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_damaged_equipment?view=minecraft-bedrock-stable"/>

Tests for the presence of a damaged named item in the designated slot of the subject entity.

---

### has_equipment

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_equipment?view=minecraft-bedrock-stable"/>

Tests for the presence of a named item in the designated slot of the subject entity.

<Version add="1.21.120" inline/> 现在支持`main_hand`作为装备位置。

---

### has_equipment_block_tag

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_equipment_block_tag?view=minecraft-bedrock-stable"/>

Tests for the presence of a block item with the specified block tag in the specified slot of the entity.

---

### has_equipment_tag

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_equipment_tag?view=minecraft-bedrock-stable"/>

Tests for the presence of an item with the named tag in the designated slot of the subject entity.

---

### has_item_with_component

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_item_with_component?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is holding a item with the specified component.

---

### has_mob_effect

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_mob_effect?view=minecraft-bedrock-stable"/>

Tests whether the Subject has the specified mob effect.

---

### has_nametag

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_nametag?view=minecraft-bedrock-stable"/>

Tests if the subject has been given a custom name.

---

### has_property

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_property?view=minecraft-bedrock-stable"/>

Tests for the presence of a property of the subject entity.

---

### has_ranged_weapon

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_ranged_weapon?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is holding a ranged weapon like a bow or crossbow.

---

### has_same_equipment_in_slot_as

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_same_equipment_in_slot_as?view=minecraft-bedrock-stable"/>

Returns whether the subject entity has the same item equipped in the specified slot as calling entity.

---

### has_silk_touch

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_silk_touch?view=minecraft-bedrock-stable"/>

Tests if the subject is holding an item with silk touch.

---

### has_tag

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_tag?view=minecraft-bedrock-stable"/>

Returns true if the subject entity has the tag provided.

---

### has_target

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_target?view=minecraft-bedrock-stable"/>

Returns true if the subject entity has a valid target.

---

### has_trade_supply

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/has_trade_supply?view=minecraft-bedrock-stable"/>

Tests whether the target has any trade supply left.

---

### home_distance

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/home_distance?view=minecraft-bedrock-stable"/>

Tests the distance between the subject and its home.

---

### hourly_clock_time

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/hourly_clock_time?view=minecraft-bedrock-stable"/>

Compares the current 24 hour time with an int value in the range[0, 24000]

---

### inactivity_timer

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/inactivity_timer?view=minecraft-bedrock-stable"/>

Tests if the specified duration in seconds of inactivity for despawning has been reached.

---

### int_property

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/int_property?view=minecraft-bedrock-stable"/>

Returns true when the int actor property matches the value provided.

---

### in_block

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/in_block?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is inside a specified Block type.

---

### in_caravan

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/in_caravan?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is in a caravan.

---

### in_clouds

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/in_clouds?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is in the clouds.

---

### in_contact_with_water

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/in_contact_with_water?view=minecraft-bedrock-stable"/>

Returns true when the subject entity in contact with any water: water, rain, splash water bottle.

---

### in_lava

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/in_lava?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is in lava.

---

### in_nether

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/in_nether?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is in Nether.

---

### in_overworld

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/in_overworld?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is in Overworld.

---

### in_water

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/in_water?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is in water.

---

### in_water_or_rain

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/in_water_or_rain?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is in water or rain.

---

### is_altitude

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_altitude?view=minecraft-bedrock-stable"/>

Tests the current altitude against a provided value.

---

### is_avoiding_mobs

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_avoiding_mobs?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is fleeing from other mobs.

---

### is_baby

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_baby?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is a baby.

---

### is_biome

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_biome?view=minecraft-bedrock-stable"/>

Tests whether the Subject is currently in the named biome.

---

### is_block

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_block?view=minecraft-bedrock-stable"/>

Returns true when the block has the given name.

---

### is_bound_to_creaking_heart

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_bound_to_creaking_heart?view=minecraft-bedrock-stable"/>

Tests that the Creaking Heart that spawned the subject Creaking still exists.

---

### is_brightness

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_brightness?view=minecraft-bedrock-stable"/>

Tests the current brightness against a provided value in the range (0.0f, 1.0f).

---

### is_climbing

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_climbing?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is climbing.

---

### is_color

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_color?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is the named color.

---

### is_controlling_passenger_family

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_controlling_passenger_family?view=minecraft-bedrock-stable"/>

Returns true when the subject entity's controlling passenger is a member of the named family.

---

### is_daytime

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_daytime?view=minecraft-bedrock-stable"/>

Returns true during the daylight hours.

---

### is_difficulty

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_difficulty?view=minecraft-bedrock-stable"/>

Tests the current difficulty level of the game.

---

### is_family

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_family?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is a member of the named family.

---

### is_game_rule

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_game_rule?view=minecraft-bedrock-stable"/>

Tests whether a named game rule is active.

---

### is_humid

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_humid?view=minecraft-bedrock-stable"/>

Tests whether the Subject is in an area with humidity

---

### is_immobile

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_immobile?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is immobile.

---

### is_in_same_vehicle

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_in_same_vehicle?view=minecraft-bedrock-stable"/>

Returns whether the subject entity is in the same vehicle as the calling entity.

---

### is_in_village

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_in_village?view=minecraft-bedrock-stable"/>

Tests whether the Subject is inside the bounds of a village.

---

### is_leashed

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_leashed?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is leashed.

---

### is_leashed_to

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_leashed_to?view=minecraft-bedrock-stable"/>

Returns true if the subject entity leashed to the calling entity.

---

### is_mark_variant

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_mark_variant?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is the mark variant number provided.

---

### is_missing_health

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_missing_health?view=minecraft-bedrock-stable"/>

Tests if the subject is not at full health.

---

### is_moving

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_moving?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is moving.

---

### is_navigating

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_navigating?view=minecraft-bedrock-stable"/>

Tests if the subject is currently pathfinding.

---

### is_owner

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_owner?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is the owner of the calling entity.

---

### is_panicking

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_panicking?view=minecraft-bedrock-stable"/>

Tests if the subject is panicking.

---

### is_persistent

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_persistent?view=minecraft-bedrock-stable"/>

Tests if the subject's persistence matches the bool value passed in.

---

### is_raider

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_raider?view=minecraft-bedrock-stable"/>

Tests if the subject is a raider.

---

### is_riding

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_riding?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is riding on another entity.

---

### is_riding_self

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_riding_self?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is riding the calling entity.

---

### is_sitting

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_sitting?view=minecraft-bedrock-stable"/>

Tests if the subject is sitting.

---

### is_skin_id

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_skin_id?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is the skin id number provided.

---

### is_sleeping

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_sleeping?view=minecraft-bedrock-stable"/>

Tests whether the Subject is sleeping.

---

### is_sneaking

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_sneaking?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is sneaking.

---

### is_sneak_held

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_sneak_held?view=minecraft-bedrock-stable"/>

Returns true if the subject entity has the sneak input held.

---

### is_snow_covered

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_snow_covered?view=minecraft-bedrock-stable"/>

Tests whether the Subject is in an area with snow cover

---

### is_sprinting

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_sprinting?view=minecraft-bedrock-stable"/>

Tests if the subject is sprinting.

---

### is_tamed

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_tamed?view=minecraft-bedrock-stable"/>

Tests whether the Subject is tamed.

---

### is_target

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_target?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is the target of the calling entity.

---

### is_temperature_type

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_temperature_type?view=minecraft-bedrock-stable"/>

Tests whether the current temperature is a given type.

---

### is_temperature_value

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_temperature_value?view=minecraft-bedrock-stable"/>

Tests the current temperature against a provided value in the range (0.0, 1.0) where 0.0f is the coldest temp and 1.0f is the hottest.

---

### is_underground

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_underground?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is underground.

---

### is_underwater

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_underwater?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is under water.

---

### is_variant

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_variant?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is the variant number provided.

---

### is_vehicle_family

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_vehicle_family?view=minecraft-bedrock-stable"/>

Returns true when the subject entity's vehicle is a member of the named family.

---

### is_visible

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_visible?view=minecraft-bedrock-stable"/>

Returns true if the subject entity is visible.

---

### is_waterlogged

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_waterlogged?view=minecraft-bedrock-stable"/>

Tests if the subject block is submerged in water.

---

### is_weather

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/is_weather?view=minecraft-bedrock-stable"/>

DEPRECATED

---

### light_level

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/light_level?view=minecraft-bedrock-stable"/>

Tests is the mob is outside of the specified light level range (0, 16).

---

### moon_intensity

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/moon_intensity?view=minecraft-bedrock-stable"/>

Compares the current moon intensity with a float value in the range (0.0, 1.0)

---

### moon_phase

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/moon_phase?view=minecraft-bedrock-stable"/>

Compares the current moon phase with an integer value in the range (0, 7).

---

### on_fire

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/on_fire?view=minecraft-bedrock-stable"/>

Tests if the subject is on fire.

---

### on_ground

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/on_ground?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is on ground.

---

### on_hot_block

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/on_hot_block?view=minecraft-bedrock-stable"/>

Tests if the subject is on a hot block.

---

### on_ladder

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/on_ladder?view=minecraft-bedrock-stable"/>

Returns true when the subject entity is on a ladder.

---

### owner_distance

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/owner_distance?view=minecraft-bedrock-stable"/>

Tests the distance between the subject and its owner.

---

### random_chance

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/random_chance?view=minecraft-bedrock-stable"/>

Returns true if the random chance rolls 0 out of a specified max range.

---

### redstone_strength_at_position

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/redstone_strength_at_position?view=minecraft-bedrock-stable"/>

Tests the redstone strength at the subject's position.

---

### rider_count

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/rider_count?view=minecraft-bedrock-stable"/>

Returns the number of riders on this entity.

---

### surface_mob

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/surface_mob?view=minecraft-bedrock-stable"/>

Tests if the subject is a surface mob.

---

### taking_fire_damage

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/taking_fire_damage?view=minecraft-bedrock-stable"/>

Tests if the subject is taking fire damage.

---

### target_distance

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/target_distance?view=minecraft-bedrock-stable"/>

Tests the distance between the calling entity and its target.

---

### trusts

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/trusts?view=minecraft-bedrock-stable"/>

Returns true if the subject is trusted by entity.

---

### was_last_hurt_by

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/was_last_hurt_by?view=minecraft-bedrock-stable"/>

Tests if the subject is the last player who attacked the entity in the last 400 seconds, or the last mob to do so in the last 60 seconds.

---

### weather

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/weather?view=minecraft-bedrock-stable"/>

Tests the current weather in the dimension against a provided weather value.

---

### weather_at_position

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/weather_at_position?view=minecraft-bedrock-stable"/>

Tests the current weather, at the actor's position, against a provided weather value.

---

### y_rotation

<Button text="Microsoft Learn" url="https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/filters/y_rotation?view=minecraft-bedrock-stable"/>

Returns the Y rotation of this entity.
