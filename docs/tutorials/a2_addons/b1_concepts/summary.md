---
sidebar_position: 100
---

# 第一章小结

## 练习问题答案

### 练习 1.2

1.

```json showLineNumbers
{
    "key1": {
        "key2": "value2",
        "key3"  // <- 不是一个有效的键值对。
    }
}
```

2.

```json showLineNumbers
{
    "minecraft:food": {
        "nutrition: 4,  // <- 在nutrition的后面丢失了一个"。
        "saturation_modifier": 0.3
    }
}
```

3.

```json showLineNumbers
{
  "format_version": "1.20.50",
  "minecraft:item": {
    "description": {
      "identifier": "minecraft:apple",
      "category": "nature"
    },
    "components": {
    }
  }
}
```

这是一个有效的 JSON 对象。其含有一个`format_version`字符和一个`minecraft:item`对象。

- 在`minecraft:item`对象中含有一个`description`对象和`components`对象。
  - 在`description`对象中，含有一个`identifier`字符串和一个`category`字符串。
  - 在`components`对象中，不含有任何键值对。

4.

```json showLineNumbers
{
    "minecraft:hurt_on_condition": {
        "damage_conditions": [
            {
                "filters": {
                    "test": "in_lava",
                    "subject": "self",
                    "operator": "==",
                    "value": true
                },
                "cause": "lava",
                "damage_per_tick": 4,   // <- 出现了尾随逗号。
            }
        ]
    }
}
```

5.

```json showLineNumbers
{
    "text": "Hello, "world"! "  // <- 无法解析的字符串，应为"Hello, \"world\"! "。
}
```

6.

```json showLineNumbers
"minecraft:type_family": [  // <- 应为{}而非[]，因为其包裹的是一个键值对。
    "family": [ "armor_stand", "inanimate", "mob" ]
]
```

7.

```json showLineNumbers
[   // <- 应为{}而非[]，因为其包裹的是一个键值对。
    "minecraft:nameable": {
    },
    "minecraft:persistent": {
    },
    "minecraft:physics": {
    },
]
```

8.

```json showLineNumbers
{
    "minecraft:spawns_on_surface": {},
    "minecraft:spawns_on_block_filter": "minecraft:grass",
    "minecraft:brightness_filter": { "min": 7, "max": 15, "adjust_for_weather": false }
}
```

这是一个有效的 JSON 对象。其含有一个`minecraft:spawns_on_surface`对象、一个`minecraft:spawns_on_block_filter`字符串和一个`minecraft:brightness_filter`对象。

- 在`minecraft:spawns_on_surface`对象中，不含有任何键值对。
- 在`minecraft:brightness_filter`对象中，含有`min`整数、`max`整数和`adjust_for_weather`布尔值。

9.

```json showLineNumbers
{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "minecraft:string",
          "weight": 1,
          "functions": [
            {
              "function": "set_count",
              "count": {
                "min": 0,
                "max": 2
              }
            }
          ]
        }
        // <- 缺少]。
    }
  ]
}
```

10.

```json showLineNumbers
{
    "modules": [
        {
            "description": "Example vanilla behavior pack",
            "type": "data",
            "uuid": "fa6e90c8-c925-460f-8155-c8a60b753caa",
            "version": [0, 0, 1]
        }
    ]
}
```

这是一个有效的 JSON 对象。其含有一个`modules`数组。在这个数组中含有一个对象作为值。这个对象中含有`description`字符串、`type`字符串、`uuid`字符串和一个`version`数组，其中这个数组内含有三个整数作为值。

11.

```json showLineNumbers
{
    "distance": {
            "water": {
                "fog_start": 0.0,
                "fog_end": 60.0,
                "fog_color": "#157cab",
                "render_distance_type": "fixed"
            }
        }
    } 
```

这是一个有效的 JSON 对象，虽然它的缩进混乱，但确实所有括号都能对应的上。不正确的缩进来源于`water`对象多了一个缩进，改成下面这样就是合理的缩进了：

```json showLineNumbers
{
    "distance": {
        "water": {
            "fog_start": 0.0,
            "fog_end": 60.0,
            "fog_color": "#157cab",
            "render_distance_type": "fixed"
        }
    }
} 
```

其含有一个`distance`对象，对象中含有一个`water`对象。在这个对象中含有`fog_start`和`fog_end`浮点数，和`fog_color`和`render_distance_type`字符串。

### 练习 1.3-1

1.

```json showLineNumbers title="manifest_rp.json"
{
    "format_version": 2,
    "header": {
        "name": "实验资源包",
        "description": "",
        "uuid": "1eb80b4e-848f-4787-a28f-1058f637c9b3",
        "version": [ 1, 0, 0 ],
        "min_engine_version": [ 1, 20, 50 ]
    },
    "modules": [
        {
            "type": "resources",
            "uuid": "639d861e-4df0-4194-b3d2-86a04752b6b3",
            "version": [ 1, 0, 0 ]
        }
    ]
}
```

2.

```json showLineNumbers title="manifest_bp.json"
{
    "format_version": 2,
    "header": {
        "name": "实验行为包",
        "description": "",
        "uuid": "60d33b76-0916-4943-8f0e-b027603365eb",
        "version": [ 1, 0, 0 ],
        "min_engine_version": [ 1, 20, 50 ]
    },
    "modules": [
        {
            "type": "data",
            "uuid": "b02118b3-8fcf-4bba-bf53-dce1d1ae0f3e",
            "version": [ 1, 0, 0 ]
        }
    ],
    "dependencies": [
        {
            "uuid": "1eb80b4e-848f-4787-a28f-1058f637c9b3",
            "version": [ 1, 0, 0 ]
        }
    ]
}
```

注意依赖项中的`uuid`应和第一问中定义的资源包的`header`中的`uuid`一致，`version`也是同理的。
