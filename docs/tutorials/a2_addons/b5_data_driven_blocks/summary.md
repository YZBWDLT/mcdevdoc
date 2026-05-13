---
sidebar_position: 100
---

# 第五章小结

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

到此为止，我们就已经完成了数据驱动方块的全部内容的学习了！

和学习数据驱动物品时不同，这次我们没有提供各组件应用的实例，因为这些内容都已埋在前几节的习题中。如果读者跟随我们的脚步全部做完，应该会收获颇丰。**也正是考虑到我们给出的习题已足够得多，我们就不再给出详细的方块实例了，请读者一定要认真完成我们给出的习题，这会起到很大的用处**！

现在让我们来回顾一下我们学习的内容吧！

---

首先，我们初步了解了**数据驱动方块（Data-Driven Block）**，知道原版的方块都不是数据驱动方块。

然后，我们了解了数据驱动方块的定义方法，知道了数据驱动方块的定义方法和物品类似，都是「格式版本 - 描述 - 组件」三段式定义。不同于物品的是，方块还支持**方块状态（Block State）**和**方块置换（Block Permutation）**。为了方便我们更好地发挥方块的功能，原版还给出了绑定了特定方块状态的功能，也就是**方块特征（Block Traits）**。在方块置换中，我们可以根据`q.block_state(property) == ...`的方式来判断方块是否处于特定状态下，并根据这个条件决定启用什么组件。在资源包中，使用<FileType type="file" name="blocks.json"/>来决定方块使用何种音效（*注意：在我们学习了[`minecraft:material_instances`](/docs/docs/blocks/components#minecraftmaterial_instances)组件后我们就不再在<FileType type="file" name="blocks.json"/>定义方块的贴图了*），在<FileType type="file" name="terrain_texture.json"/>中给出全部方块的贴图，再给出方块的翻译文本就大功告成了。

我们还重点强调了[`minecraft:geometry`](/docs/docs/blocks/components#minecraftgeometry)组件和[`minecraft:material_instances`](/docs/docs/blocks/components#minecraftmaterial_instances)组件，通过 Blockbench 创建模型后，使用它们，再基于选择箱碰撞箱组件便可以自定义不完整方块或透明方块了。对于透明方块来讲，我们还介绍了如何进行**方块面剔除（Block Culling）**，来移除内部不该渲染的面。

最后，我们还介绍了方块的**翻书动画（Flipbook Textures）**，这可以让方块具有动态贴图，例如海晶灯、海晶石、命令方块等都是这样的方块！

在练习题中，我们还引导读者学习多个组件，比如发光组件、地图颜色组件、挖掘速度组件等，实现了假方块、隐形基岩甚至竖半砖等方块。相信这些实例可以帮助读者更好地理解整个方块的制作流程！

受限于篇幅和编者的技术水平，仍然有很多的内容没有介绍到，以及很多地方都需要脚本技术的应用，故而并未提及。感兴趣的读者可以继续学习，阅读[我们提供的文档](/docs/docs/blocks/description)，或者 [Bedrock Wiki](https://wiki.bedrock.dev/blocks/blocks-intro) 上的优秀文档、以及微软文档学习更多知识。相信读者一定能在未来写出更加多姿多彩的方块！

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
