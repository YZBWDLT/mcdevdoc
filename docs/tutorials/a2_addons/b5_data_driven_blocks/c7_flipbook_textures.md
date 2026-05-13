---
sidebar_position: 7
---

# 5.7 方块的动态贴图

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"
import DataType from "/src/components/type/data"

部分方块是具有动态贴图的。读者可以拿出海晶灯、海晶石并仔细观察，不难发现它们的纹理都是在不断变化的。我们同样也可以还原这个效果！

首先我们要理解动画是怎么出现的。我们在显示屏上看到的电影、游戏画面等，都不是真正连贯的，而是由一张张的图片所形成的连贯画面，每一个贴图都被称为一**帧（Frame）**。依次翻过这些画面的时候，就会形成**动画（Animation）**。例如，早期的电影就是每秒 24 帧，也就是**帧率（Frame Per Second，FPS）** 为 24；现在的显示屏的刷新率很多都是 120 Hz 的，意味着帧率最高能达到 120，等等。

因为这个过程就像翻书一样，并且需要我们事先定义每一帧需要播放什么图片，故而称之为**翻书动画（Flipbook Texture）**。定义翻书动画的过程需要使用<FileType type="file" name="flipbook_textures.json"/>。

---

现在让我们来定义一个超级炫酷的彩色玻璃吧！我们来让这种玻璃可以在 16 个颜色中循环变化，就像 jeb_ 羊一样。首先，我们需要在 bb 定义一个 16×256 的贴图（对，是 16×256），然后在原版找到染色玻璃的贴图，把染色玻璃的贴图依次排列进去，就像这样：

![colorful_stained_glass](/img/tutorials/a2_addons/b5_data_driven_blocks/c7_flipbook_textures/colorful_stained_glass.png)

当然读者也可以直接把这张图片拿去使用，然后把贴图正常放在资源包的<FileType type="folder" name="textures"/>下的<FileType type="folder" name="blocks"/>里即可。在 Minecraft 播放动画时，就会尝试把这个贴图分割后从上到下依次播放。原版的所有动态贴图都是这样的（例如海晶灯、海晶石、火、命令方块等）。

我们现在打开资源包，在<FileType type="folder" name="textures"/>文件夹下新建<FileType type="file" name="flipbook_textures.json"/>：

<treeview>

- <FileType type="folder" name="RP_test"/>
  - <FileType type="folder" name="textures"/>
    - <FileType type="folder" name="blocks"/>
      - <FileType type="image" name="colorful_stained_glass.png"/>
    - **<FileType type="file" name="flipbook_textures.json"/>**

</treeview>

我们首先在<FileType type="file" name="terrain_texture.json"/>中定义`colorful_stained_glass`的贴图 ID：

```json showLineNumbers title="terrain_texture.json"
{
    "resource_pack_name": "test",
    "texture_data": {
        ...,
        "colorful_stained_glass": { "textures": "textures/blocks/colorful_stained_glass" }
    }
}
```

然后，我们打开<FileType type="file" name="flipbook_textures.json"/>，写入以下内容：

```json showLineNumbers title="flipbook_textures.json"
[
    {
        "atlas_tile": "colorful_stained_glass",
        "flipbook_texture": "textures/blocks/colorful_stained_glass"
    }
]
```

对这段代码做一个解释。

1. 这个 json 是一个数组，不是对象，这是需要留意的。
2. 这里的`atlas_tile`指代的就是在<FileType type="file" name="terrain_texture.json"/>中定义的贴图 ID。而`flipbook_texture`则指代翻书动画使用的贴图。*~不要问为什么这里要重复定义一次贴图路径，这你只能去问 Mojang 了~*。

最后，定义我们超级酷炫的玻璃：

```json showLineNumbers title="colorful_stained_glass.json"
{
    "format_version": "1.21.90",
    "minecraft:block": {
        "description": {
            "identifier": "test:colorful_stained_glass",
            "menu_category": { "category": "construction" }
        },
        "components": {
            "minecraft:destructible_by_explosion": false,
            "minecraft:material_instances": { "*": { "texture": "colorful_stained_glass", "render_method": "blend", "ambient_occlusion": 0.0 } },
            "minecraft:geometry": { "identifier": "geometry.full_block", "culling": "test:culling.glass" }
        }
    }
}
```

现在读者可以进入游戏，看到我们相当酷炫的玻璃！

![colorful_stained_glass_1](/img/tutorials/a2_addons/b5_data_driven_blocks/c7_flipbook_textures/colorful_stained_glass_1.gif)

如果读者觉得太闪了，还可以按照文档添加`ticks_per_frame`参数，比如每个贴图停留 1 秒就写为：

```json showLineNumbers title="terrain_texture.json" {5}
[
    {
        "atlas_tile": "colorful_stained_glass",
        "flipbook_texture": "textures/blocks/colorful_stained_glass",
        "ticks_per_frame": 20
    }
]
```

除此之外，翻书动画还可以控制使用多少贴图、是否平滑过渡等，具体可参考我们给出的[<FileType type="file" name="flipbook_textures.json"/>](/docs/docs/blocks/description#flipbook_texturesjson)文档。

---

## 总结

本节我们主要介绍了如何实现方块的动态贴图。即通过<FileType type="file" name="flipbook_textures.json"/>实现。关于该文件更具体的用法，请参考我们给出的文档。

本节不设置习题。

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
