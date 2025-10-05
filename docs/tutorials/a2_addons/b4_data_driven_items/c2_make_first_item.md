---
sidebar_position: 2
---

# 4.2 制作第一个数驱物品

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

从本节开始，我们从制作一个我们自己的物品——红宝石入手。有些读者应该知道，在村民刚加入 Minecraft 的时候，还是使用的红宝石，后来因为一些原因，把红宝石改成了绿宝石[^1]。

[^1]: 关于 Mojang 把红宝石移除的原因，可见[中文 Minecraft Wiki](https://zh.minecraft.wiki/w/Java%E7%89%88%E5%B7%B2%E7%A7%BB%E9%99%A4%E7%89%B9%E6%80%A7#%E7%BA%A2%E5%AE%9D%E7%9F%B3)。

好消息是，凭借现在的 Minecraft 游戏引擎，我们可以很轻松地在游戏内加入这样的物品，这需要行为包和资源包的协同：

- 行为包：负责告诉游戏引擎，这个世界还有一种全新的物品叫红宝石，在处理相关逻辑的时候不要忘了它；
- 资源包：负责为玩家显示、渲染红宝石的方方面面，不至于返回一个空的贴图，让玩家望着“空气”发呆。

那让我们现在就打开 VSC 的工作区，开始跟我们一起动手制作吧！

## 行为包部分：定义物品的逻辑

**行为包部分负责定义物品，和这个物品的基础逻辑**。显然，首先第一步，我们要先定义有这样一个物品的存在。

### 定义文件

为了正确地定义物品，我们需要像函数包、结构包、贴图包一样，把正确的文件对号入座。现在请按照以下步骤来创建文件：

1. 在行为包根目录创建<FileType type="folder" name="items"/>，注意不要丢了那个 s，一个字母都不能丢；
2. 在刚创建的<FileType type="folder" name="items"/>内新增一个<FileType type="folder" name="test"/>；
    - 这个文件夹是作为命名空间用的，所以起名方法是任意的，只需要和你的命名空间一致即可。但必须得是英文字母、数字和下划线的组合。
    - 比如，如果你定义你的项目的命名空间是`yzbwdlt_bedwars`，那你在这里就创建名为<FileType type="folder" name="yzbwdlt_bedwars"/>的文件夹，而不是 test。
    - 其实这个文件夹不必是命名空间，定义一个命名空间文件夹只是一个常用的规范。你也可以在这里对你的物品做分类，比如工具就都放到<FileType type="folder" name="tools"/>里；
    - 甚至于，其实定义文件也可以直接放到<FileType type="folder" name="items"/>文件夹下，同样地，定义一个命名空间文件夹只是一个常用的规范。
3. 最后，在命名空间<FileType type="folder" name="test"/>下新增一个<FileType type="file" name="ruby.item.json"/>。你也可以命名为<FileType type="file" name="ruby.json"/>，不过加上一个`.item`在将来更有助于区分各种定义的类型。

现在，你的项目内应该有这些文件：

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
  - ……
  - <FileType type="folder" name="items" />：物品定义
    - <FileType type="folder" name="test" />：以 test 作为物品的命名空间
      - <FileType type="file" name="ruby.item.json" />：红宝石的定义文件

</treeview>

![create_file_1](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/create_file_1.png)

然后，我们就可以开始编写定义文件了！

### `format_version`：物品格式版本

现在我们来编写物品。首先从定义物品格式版本开始，我们写入以下内容：

```json showLineNumbers title="ruby.item.json" {1-3}
{
    "format_version": "1.21.0"
}
```

我们必须解释一下这是在做什么——**它是在定义用什么版本下的格式规范**。物品的格式规范并不是一蹴而就的，它经历了诸多版本的漫长迭代，比如在 1.16 之前的时期就用的是另一套写法，另一套逻辑，1.20 之后就换了一套逻辑。为了版本兼容性，使得高版本可以跑得动低版本的代码，我们必须告诉游戏我们用的是什么版本的格式规范，比如这里定义了`1.21.0`，就是使用 1.21.0 的格式规范。

在讲到[第 5 节的旧版本物品](./c5_low_version_items)之前，我们定义的所有物品的格式版本最低都是`1.20.0`。

因此，**使用何种格式版本取决于你的需求**。如果你要求适配中国版，那么这个版本就不能高于中国版当前对应的国际版；如果你要求直接适配最新的国际版，你大可以直接使用最新国际版的版本。

### `description`：物品描述

现在我们该告诉引擎这个物品的“身份信息”了——也就是这个物品的 ID、类别等基本信息。我们添加下面高亮行的内容（注意不要忘了第 2 行的尾逗号）：

```json showLineNumbers title="ruby.item.json" {3-10}
{
    "format_version": "1.21.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:ruby",
            "menu_category": {
                "category": "items"
            }
        }
    }
}
```

好——等下等下，加的东西有点多，我们还是一行行来解释：

- 第 3 行的<DataType type="object" name="minecraft:item" isRequired/>：告诉 Minecraft，这是个物品的定义。
- 第 4 行的<DataType type="object" name="description" isRequired/>：告诉 Minecraft 这个物品的基本信息。

不要以为这两行是废话哦——我们在上节讲过，数驱有很多种，不明确分类就会造成困扰。

- 第 5 行的<DataType type="string" name="identifier" isRequired/>：告诉 Minecraft，这个物品的命名空间和 ID。

物品 ID，相信读者应该不陌生——我们在`/give`、`/clear`等命令中使用的物品 ID，其实就是这个东西了。命名空间的概念，读者应该也不陌生——我们在结构包那一节已经讲过这样的概念。事实上，一个物品同时拥有命名空间和 ID，原版物品之所以在`/give`等命令中不需要写命名空间，是因为它们都使用了默认的命名空间`minecraft:`。

定义了物品后，我们同样可以使用`/give`等命令给予物品，只是我们在指定给予我们自己的物品时就必须指定命名空间。原因很简单，我们在上节就讲过，**我们不能使用`minecraft:`命名空间**，否则会报错，所以我们是不享有使用默认命名空间这种权利的。比如，定义了红宝石之后，使用`/give`命令就是`/give @a test:ruby`而不是`/give @a ruby`。

关于 ID 的说法有很多，按照最严谨的说法，`命名空间:名称`叫做**命名空间 ID（Namespaced Identifier）**，其中冒号左边叫做命名空间，冒号右边叫做 ID。不过通常来说，也习惯把命名空间 ID 直接叫做 ID。读者需要在语境中注意区分是否需要命名空间，在附加包领域中，绝大多数情况下都是需要命名空间的。读者可以见[命名空间 ID - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4ID) 了解更多。

- 第 6 行的<DataType type="object" name="menu_category"/>：告诉 Minecraft，这个物品在配方书（创造模式物品栏）中的位置。
- 第 7 行的<DataType type="string" name="category"/>：告诉 Minecraft，这个物品在配方书（创造模式物品栏）中的哪个物品分类中。

这两行的内容就不是必需项了。我们先来关注第 7 行的<DataType type="string" name="category"/>，它可以定义的内容其实就是下图中的这 4 个标签页：

![category_1](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/category_1.png)

是不是“这下看懂了”？这些标签页的标准译名叫做**创造分类（Creative Category）**，一共有 4 种。第一个分类叫建筑`construction`，第二个分类叫装备`equipment`，第三个分类叫物品`items`，第四个分类叫自然`nature`。以后凡是说到创造分类，指的都是这四个小东西。在第 7 行指定的`items`，就是把物品放到第 3 个分类中了。

回到第 6 行的<DataType type="object" name="menu_category"/>，其实它还支持两个参数，第一个是<DataType type="string" name="group"/>：它定义了物品会被折叠到哪个物品组里。所谓物品组，其实就是下面这个东西：

![item_group_1](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/item_group_1.png)

恍然大悟了吧？只是它可以填写的内容看起来有点玄学，读者可以在我们[提供的文档](/docs/docs/items/description#原版使用的物品组)中查看它的可选字段，例如如果指定了`"group":"itemGroup.name.sword"`就会把物品折叠到剑这个物品组里。至于<DataType type="boolean" name="is_hidden_in_commands"/>，这个是好理解的，它可以规定物品是否隐藏在命令中，就像命令方块一样，默认情况下都是不隐藏的。

综上，我们可以给出物品描述`description`的一般格式如下：

<treeview>

- <DataType type="object" name="description" isRequired/>：物品描述，定义物品的基本属性。
  - <DataType type="string" name="identifier" isRequired/>：定义物品的命名空间和物品 ID。
  - <DataType type="object" name="menu_category"/>：定义物品的分类和组别。
    - <DataType type="string" name="category"/>：定义物品在创造模式物品栏中的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）。
    - <DataType type="string" name="group"/>：定义物品在创造模式物品栏中置于何物品组中。
    - <DataType type="boolean" name="is_hidden_in_commands"/>：定义物品是否隐藏在命令中。

</treeview>

### `components`：物品组件

光有物品描述是不够的，我们需要物品有形形色色的功能。这便是**物品组件（Item Components）** 的工作了。

物品组件，就是一个个的小功能模块，我们开发者可以利用 Mojang 给我们提供的这些小功能模块，像拼拼图一样拼装组合到一起。例如，如果我们把“有攻击伤害”、“有耐久”、“手持时直立显示”等几种拼图拼在一起，就变成了一把剑！而如果我们把“食物”、“冷却”、“可右键使用”等几种拼图拼在一起，它就变成了一种食物！

有一些物品组件可能是互斥的，就像是一些拼图的接口不相适配一样。遇到这种情况的时候我们会再强调。也有一些物品组件则需要依赖其他物品组件才能工作，就像是只有带上了关键的拼图碎片才更容易拼其他拼图碎片一样。

现在我们知道了我们的工作就是“拼拼图”，但是怎么拼呢？我们先以红宝石为例。它需要的那个功能很简单，我们只需要“图标”这么一个“碎片”，也就是定义图标的组件。我们添加下面高亮行的内容（注意不要忘了第 9 行的尾逗号）：

```json showLineNumbers title="ruby.item.json" {10-12}
{
    "format_version": "1.21.0",
    "minecraft:item": {
        "description": {
            "identifier": "test:ruby",
            "menu_category": {
                "category": "items"
            }
        },
        "components": {
            "minecraft:icon": "ruby"
        }
    }
}
```

新增的这段代码对于读者来说并不难理解。我们看到组件是和描述在同一级的，不要把`components`写到`description`对象下面去。在这里，我们只定义了一个组件叫`minecraft:icon`。显然，它接受一个字符串类型的值，代表它的图标 ID 是`ruby`。

很显然，知道物品组件都能实现哪些功能是很重要的，**不同物品组件的搭配直接决定了物品的功能**。这要求我们像命令一样，至少应该清楚都有哪些物品组件，都能实现哪些功能。语法问题通常不是问题，在相关文档里都有记录。在后面的内容中，我们会教读者如何查文档写出符合自己需求的物品，也会教读者如何实现一些常见的物品实例。

:::note[扩展：数驱物品组件和命令物品组件的异同]

有些读者应该已经敏锐地意识到：`/give`和`/replaceitem`那里也有参数需要指定物品组件。有什么相同点和不同点呢？

相同点就是，从格式上来讲，其实数驱物品组件和命令物品组件是很相似的。比如定义物品死亡不掉落，在命令物品组件中我们这么指定：

```json showLineNumbers
{
    "minecraft:keep_on_death": {}
}
```

之后读者就会发现，这和数驱物品组件的格式是高度一致的。此外，二者还有个相同点是，从模式上来讲，都是一个个的功能模块叠加起来。

然而，不同点也很明显——二者在具体的功能点实现上几乎没有任何关联，它们仅仅是格式上、模式上保持了统一而已。

:::

## 资源包部分：定义物品的外观

通过上面的学习，我们分别定义了物品的格式版本、基本信息和组件功能，已经可以让 Minecraft 识别到有这样的新物品存在。至此，行为包部分就定义完毕了！然而，如果你现在使用 VSC，可以看到这个文件却被直接标红了一处：

![item_definition_1](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/item_definition_1.png)

这并不是语法问题，而是我们没有指定`ruby`到底是什么贴图的缘故。是啊，自始至终我们就没有指定过`ruby`的贴图，Minecraft 内部也没有这样的贴图，这要 Minecraft 如何识别呢？

此时读者可以试试进入游戏，我们看到不仅贴图没有成功显示，而且显示的名字也是“乱码”：

![error_1](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/error_1.png)  
![error_2](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/error_2.png)

我们看到，因为这里已经变成了贴图和翻译问题，所以从现在开始，我们要开始捣鼓资源包了。让我们现在开始转换思路和战场，搞定物品显示的问题吧！

### 物品贴图

首先是物品贴图的问题，我们需要让 Minecraft 知道我们指定的`ruby`贴图究竟是什么东西。这需要`item_texture.json`来解决。现在请读者在资源包的<FileType type="folder" name="textures" />中创建一个<FileType type="file" name="item_texture.json" />，就像下面这样：

<treeview>

- <FileType type="folder" name="RP_test" />：资源包
  - ……
  - <FileType type="folder" name="textures" />：贴图
    - ……
    - <FileType type="file" name="item_texture.json" />：物品贴图定义文件

</treeview>

这个文件是物品贴图的定义文件。你在原版模板里面也能看到这个文件，里面包含了大量的物品贴图数据。我们往这个文件内写入如下内容：

```json showLineNumbers title="item_texture.json"
{
    "texture_data": {
        "ruby": { "textures": "textures/items/ruby" }
    }
}
```

其中，第 2 行是硬性的格式要求，我们不多阐述。关键是这个第 3 行，我们在这里可以看到，键名<DataType type="object" name="ruby"/>就是我们在物品行为包定义<FileType type="file" name="ruby.item.json" />的`minecraft:icon`中所指定的那个贴图。而<DataType type="object" name="ruby"/>的值，则指代了具体的文件路径。这意味着，我们需要将一张名为<FileType type="image" name="ruby.png" />的贴图放到对应位置。

贴图问题，本教程就不再过多赘述，相关问题已在第 3 章谈过，我们只需要用 bb（Blockbench）画图就行了。这里给出从 Wiki 相关界面下载并改造后的贴图：

![ruby](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/ruby.png)

需要的读者可以自行下载去。然后把贴图放到对应位置，也就是：

<treeview>

- <FileType type="folder" name="RP_test" />：资源包
  - ……
  - <FileType type="folder" name="textures" />：贴图
    - ……
    - **<FileType type="folder" name="items" />：物品贴图（将物品贴图放到 items 文件夹内是惯例）**
      - **<FileType type="image" name="ruby.png" />：红宝石贴图**
    - <FileType type="file" name="item_texture.json" />：物品贴图定义文件

</treeview>

需要注意一点：**如果你目前还在游戏内，应用更改需要大退（退出游戏后重进）**。

### 物品翻译

还有一个问题亟待解决，也就是翻译问题。在 [3.4](./../b3_textures_and_texts/c4_translations) 中，我们讲过如何添加翻译，这里也如法炮制，它目前显示什么，我们就写什么的对应翻译：

```mclanguage showLineNumbers title="en_US.lang"
item.test:ruby=Ruby
```

```mclanguage showLineNumbers title="zh_CN.lang"
item.test:ruby=红宝石
```

**如果你目前还在游戏内，应用语言文件的更改需要小退（退出地图后重进）**。

我们看到数驱物品的翻译格式是`item.(namespace):(id)`，这和其他大多数的原版物品还是有所不同的（大多数原版物品的格式是`item.(namespace):(id).name`）。

至此，我们已完成了添加物品的全部流程，现在进入游戏看一看吧！

![first_item_1](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/first_item_1.png)

赞！这就是我们做的第一个物品了！还满意吗？:) 如果你感觉好像不知道怎么就实现自定义物品了，记得再看看我们的总结并且多做练习！

*备注：如果你的 VSC 现在还存在报错的话，请使用我们之前所讲过的方法忽略相关错误——这个插件真的很喜欢误报错误*。

![create_file_2](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/create_file_2.png)

## 学会查文档

在附加包领域中，学会查文档是一项很重要的技能。由于缺少自动补全，或者自动补全功能不那么靠谱，需要我们会从官方文档或社区文档中了解相关信息并运用到实际工程中。我们先以官方文档为例，教读者如何查文档。

对于数驱物品来说，**最重要的无疑是物品组件**。因为使用何种物品组件很可能直接决定使用何种格式版本——举个例子，如果定义物品是可堆肥的，那么必须使用`1.21.60`甚至更高的格式版本才能使用这个组件。物品描述也没什么格外值得注意的，该说的我们都已经和读者说明。此外，物品组件直接决定了可以使用何种功能，对于一个物品来说最重要的无疑是其功能。

### 官方文档

官方文档的链接是[https://learn.microsoft.com/en-us/minecraft/creator/?view=minecraft-bedrock-stable](https://learn.microsoft.com/en-us/minecraft/creator/?view=minecraft-bedrock-stable)——这个网站真的超级重要，请务必收藏。

我们点参考文档（Reference Documentation）- 物品 JSON（Item JSON）：

![learn_doc_1](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/learn_doc_1.png)

进入一个新的页面，可以点击物品组件列表（Item Components List）查看所有组件：

![learn_doc_2](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/learn_doc_2.png)

我们以`minecraft:can_destroy_in_creative`组件为例，进入该组件的页面：

![learn_doc_3](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/learn_doc_3.png)

首先我们需要先知道一点就是，几乎所有组件接受的值都是对象，例如以`minecraft:can_destroy_in_creative`组件为例，它本身也接受一种对象的值：

```json
"minecraft:can_destroy_in_creative": {...}
```

在这里，我们看“Can Destroy In Creative Properties”，也就是接受属性这一节，它告诉你这个对象里面接受一个类型为布尔值的键`value`，也就是：

<treeview>
- <DataType type="object" name="minecraft:can_destroy_in_creative"/>
  - <DataType type="boolean" name="value"/>：Determines whether the item can be used to destroy blocks while in creative mode.
</treeview>

写一个实例，表示为

```json
"minecraft:can_destroy_in_creative": { "value": false }
```

这样，在手持此物品时，就不能在创造模式下破坏物品了，类似于钻石剑。

微软文档还在“Alternate Simple Representations”告诉我们，这个组件接受一种简写的形式，可以直接接受布尔值，比如

```json
"minecraft:can_destroy_in_creative": false
```

所以，像这样指定也是合理的。

官方文档的主要优势在于，它是相对来说*比较*权威的信源，更新也相对及时，还有全套的教程可供读者学习。不过缺点在于它的值的表达形式有时实在过于抽象，难以读懂；有时候因为官方的疏忽，会缺失部分关键信息；以及有少数时候官方还会在文档带头犯错……但不管怎么说，官方的东西，那总归还是有参考价值的。

### Bedrock Wiki

如果有时候你感觉官方的文档靠不住（嗯对，你没看错，有时候官方文档确实靠不住），可以考虑看看社区提供的文档，比如 Bedrock Wiki。它的链接是[https://wiki.bedrock.dev/](https://wiki.bedrock.dev/)——这个网站真的也超级重要，别忘了收藏。

Bedrock Wiki 的页面相对简洁易找许多了，我们直接点物品（Items）- 物品组件（Item Components），里面直接囊括了我们需要的所有物品组件。

![learn_doc_4](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/learn_doc_4.png)

这篇文档更多地从实用性的角度出发设计，因此去除了很多冗余的设计，比如 Bedrock Wiki 完全没有说到`minecraft:can_destroy_in_creative`组件接受对象值一事。因此，从实际工程角度来看，甚至 Bedrock Wiki 做的比官方文档还更易用。而且，该网站也包含了很多有意义的开发教程，对读者们应该会很有帮助。

### 中国版：我的世界开发者官网

如果你是一位中国版开发者，那么中国版独有的文档就十分重要了。

好消息是中国版的文档也相对完善，权威性很高，多数情况下对于中国版的开发环境来说是靠得住的。

缺点是他们的文档散落在各处，难以整理，教程等表述也十分抽象，并不利于新手学习。但遗憾的是，中国版的文档几乎是一家独大，要获得中国版相关的有用信息，很多信息只能硬着头皮去官方文档找了。而且，中国版还有一个重大问题在于——对于国际版更新的新内容来说，更新十分不及时。尤其是对于 1.19 之后加入的方块组件和 1.20 之后加入的物品组件，你在中国版是很难看到有相关记载的，只能硬着头皮去看英文版的教程啦。

中国版的链接是[https://mc.163.com/dev/guide.html](https://mc.163.com/dev/guide.html)，在 [4.7](./c7_china_edition_items) 我们还要进一步来讲中国版的物品。

### 本站

嘿嘿，最后当然要来谈谈本站提供的文档啦！本站同时提供了国际版和中国版的物品组件文档，无论你是中国版还是国际版的开发者，相信我们的文档页面也能让你很舒服地得到你想要的信息。最关键的是——本文档十分适合中国宝宝的体质！UwU

![learn_doc_5](/img/tutorials/a2_addons/b4_data_driven_items/c2_make_first_item/learn_doc_5.png)

我不敢说没有缺点，缺点当然是有的——人手不足啦，这就导致我们的文档更新可能不及时，有不少文档目前还处于空缺状态。但我至少敢保证已经完成的文档是绝对好用的！如果你感觉有改进点，欢迎在对应文档的评论区留言！

本站的物品文档链接是[https://mcdevdoc.nekoawa.com/docs/docs/items/description](https://mcdevdoc.nekoawa.com/docs/docs/items/description)，欢迎使用并收藏！

---

## 总结

本节我们从制作一个数驱物品——红宝石入手，详细地介绍了制作一个基础物品的流程。

首先，**我们需要在行为包创建一个定义文件**。定义文件是创建在<FileType type="folder" name="items"/>里的一个 JSON 文件，习惯上我们会再套一层命名空间的文件夹。这个 JSON 文件需要指定格式版本、物品描述和物品组件。

格式版本是我们基于何种格式规范和何种版本下的功能的版本，随自己需求而定。

物品描述具体描述物品的命名空间 ID（我们后面都会简略成物品 ID）、物品在配方书（创造模式物品栏）中所处的位置，包括物品分类、物品组、以及是否在创造模式物品栏中显示。

而物品组件则是数驱物品的重点，我们在这里指定物品的种种功能。为了知道物品组件都允许填写哪些内容，我们教读者学会查文档，当然在能找得到的前提下首选自然还是[本站的文档](https://mcdevdoc.nekoawa.com/docs/docs/items/description)！因为已经做了不少外链功能，各路信息也都相对详细，实用性是很强的。在后面的习题中，我们也会要求读者利用一些简单的组件实现一些简单的功能。

有关物品定义的格式，可以见下面的结构图。

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="string" name="format_version" isRequired/>：格式版本，决定物品可用的功能。应填写为`1.20.30`或更高的版本。
  - <DataType type="object" name="minecraft:item" isRequired/>：定义数驱物品。
    - <DataType type="object" name="description" isRequired/>：物品描述，定义物品的基本属性。
      - <DataType type="string" name="identifier" isRequired/>：定义物品的 ID。
      - <DataType type="object" name="menu_category"/>：定义物品的分类和组别。
        - <DataType type="string" name="category"/>：定义物品在创造模式物品栏中的分类。可填为`construction`（建筑）、`equipment`（装备）、`items`（物品）、`nature`（自然）。
        - <DataType type="string" name="group"/>：定义物品在创造模式物品栏中置于何物品组中。可用的物品组见[数据驱动物品文档](/docs/docs/items/description#原版使用的物品组)。
        - <DataType type="boolean" name="is_hidden_in_commands"/>：定义物品是否隐藏在命令中。
    - <DataType type="object" name="components"/>：物品组件，定义物品的功能。
      - <DataType name="minecraft:(component)"/>：物品组件，可用的物品组件见[数据驱动物品组件文档](/docs/docs/items/components)。
</treeview>

其中，几乎所有的物品都需要`minecraft:icon`组件，用于定义物品的图标，此外物品的名称使用默认键名`item.(namespace):(identifier)`，因此需要我们定义物品的贴图和译名。总体上来说，资源包的文件结构图通常如下图所示：

<treeview>
- <FileType type="folder" name="RP_test" />：资源包
  - ……
  - <FileType type="folder" name="texts" />：翻译文本
    - <FileType type="file" name="en_US.lang" />：英语（美国）翻译
    - <FileType type="file" name="zh_CN.lang" />：中文（中国）翻译
  - <FileType type="folder" name="textures" />：贴图
    - ……
    - <FileType type="folder" name="items" />：物品贴图（将物品贴图放到 items 文件夹内是惯例）
      - <FileType type="image" name="(物品 ID).png" />：物品贴图
    - <FileType type="file" name="item_texture.json" />：物品贴图定义文件
</treeview>

其中<FileType type="file" name="item_texture.json" />的文件结构通常如下图所示：

<treeview>
- <DataType type="object"/>：根对象。
  - <DataType type="object" name="texture_data" isRequired/>：贴图数据。
    - <DataType type="object" name="(短 ID)"/>：`短 ID`对应的实际贴图。`短 ID`由物品定义的`minecraft:icon`组件指定。
      - <DataType type="string" name="textures"/>：贴图路径，从`textures/`开始，不带后缀，例如`textures/items/apple`。
</treeview>

利用我们第 3 章学过的相关技术，就可以轻松地注册物品的贴图和翻译。

可见，数驱物品的注册是一个需要综合考虑行为包和资源包的较复杂的过程，不过相比于写复杂的逻辑代码，它的操作难度事实上已经很简单了。

## 练习

:::info[练习 4.1]

数驱物品怎么可能没有练习呢！哼哼。要认真完成哦，后面的方块和实体可比这复杂多啦！格式版本至少定为`1.20.30`，在查询物品组件时，不要使用旧版本组件。

1. 定义一个拥有箭外观的物品，物品 ID 为`aw:kill_monster`。这就是《冒险小世界：剑之试炼》中的清除怪物的物品！至于右键功能，在讲到模块 3 的时候我们会详细介绍。
2. 添加一种全新的青苹果，贴图可基于原版贴图魔改，物品 ID 任定，暂时不要求其他功能（比如先不用实现食物功能）。
3. 在第 1 问的基础上，在[数据驱动物品组件文档](/docs/docs/items/components)中找到一个合适的组件，要求该物品的最大堆叠数为 1。
4. 定义一种电池，物品 ID 定义为`tutorial:battery`，贴图自画，要求拥有 10 点耐久度。
5. 任意定义一种物品，加上`minecraft:stacked_by_data`组件，用`/give`命令分别给予该物品的两种不同数据值，再移除该组件，观察其效果。

:::

<details>

<summary>练习题答案</summary>

1. ```json title="BP_test/items/aw/kill_monster.item.json" showLineNumbers
    {
        "format_version": "1.21.0",
        "minecraft:item": {
            "description": {
                "identifier": "aw:kill_monsters",
                "menu_category": { "category": "items", "is_hidden_in_commands": false }
            },
            "components": {
                "minecraft:icon": "arrow"
            }
        }
    }
    ```

   因为原版有箭的贴图，所以直接调用原版的贴图即可。相关路径可在原版的`item_texture.json`找到。读者亦可自定义一个`item_texture.json`。

2. ```json title="BP_test/items/tutorial/green_apple.item.json" showLineNumbers
    {
        "format_version": "1.21.0",
        "minecraft:item": {
            "description": {
                "identifier": "tutorial:green_apple",
                "menu_category": { "category": "nature", "is_hidden_in_commands": false }
            },
            "components": {
                "minecraft:icon": "green_apple"
            }
        }
    }
    ```

    ```json title="RP_test/textures/item_texture.json" showLineNumbers {4}
    {
        "texture_data": {
            "ruby": { "textures": "textures/items/ruby" },
            "green_apple": { "textures": "textures/items/green_apple" }
        }
    }
    ```

    ```mclanguage title="RP_test/texts/en_US.lang" showLineNumbers {2}
    item.test:ruby=Ruby
    item.tutorial:green_apple=Green Apple
    ```

    ```mclanguage title="RP_test/texts/zh_CN.lang" showLineNumbers {2}
    item.test:ruby=红宝石
    item.tutorial:green_apple=青苹果
    ```

    贴图略，应放置于`textures/items/green_apple`下。

3. ```json title="BP_test/items/aw/kill_monster.item.json" showLineNumbers {9}
    {
        "format_version": "1.21.0",
        "minecraft:item": {
            "description": {
                "identifier": "aw:kill_monsters",
                "menu_category": { "category": "items", "is_hidden_in_commands": false }
            },
            "components": {
                "minecraft:max_stack_size": 1,
                "minecraft:icon": "arrow"
            }
        }
    }
    ```

4. ```json title="BP_test/items/tutorial/battery.item.json" showLineNumbers
    {
        "format_version": "1.21.0",
        "minecraft:item": {
            "description": {
                "identifier": "tutorial:battery",
                "menu_category": { "category": "items", "is_hidden_in_commands": false }
            },
            "components": {
                "minecraft:icon": "battery",
                "minecraft:durability": { "max_durability": 10 }
            }
        }
    }
    ```

    ```json title="RP_test/textures/item_texture.json" showLineNumbers {5}
    {
        "texture_data": {
            "ruby": { "textures": "textures/items/ruby" },
            "green_apple": { "textures": "textures/items/green_apple" },
            "battery": { "textures": "textures/items/battery" }
        }
    }
    ```

    ```mclanguage title="RP_test/texts/en_US.lang" showLineNumbers {3}
    item.test:ruby=Ruby
    item.tutorial:green_apple=Green Apple
    item.tutorial:battery=Battery
    ```

    ```mclanguage title="RP_test/texts/zh_CN.lang" showLineNumbers {3}
    item.test:ruby=红宝石
    item.tutorial:green_apple=青苹果
    item.tutorial:battery=电池
    ```

    贴图略，应放置于`textures/items/battery`下。

5. 答案略。

</details>

import GiscusComment from "/src/components/comment/giscus.js"

<GiscusComment/>
