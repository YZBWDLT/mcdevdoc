---
sidebar_position: 3
---

# 4.3 合成配方

> 上次更新：2026 年 1 月 5 日

import '/src/css/treeview.css';
import DataType from "/src/components/type/data"
import FileType from "/src/components/type/file"

:::warning[温馨提示]

本文仍在编辑中，内容仅供参考。

:::

简单回顾一下，在上一节，我们做了一个红宝石。目前来说，这个红宝石没有任何用途，你拿它是做不了任何事情的。我们可以考虑……用它来合成一些物品！这需要让它成为某个**合成配方（Recipe）** 的一部分。是的，本节我们来介绍一下如何实现新的合成配方。

## 工作台配方

### 有序配方

我们先想象一下用红宝石可以合成什么东西……比如，用它合成一把红宝石剑！当然我们还没有这样的物品，不过不要紧，我们可以先定义一把红宝石剑。

:::tip[实验 4.3-1]

利用上一节的知识，定义一把红宝石剑！

我们先定义红宝石剑的行为包部分，新建<FileType type="file" name="ruby_sword.item.json" />：

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
  - ……
  - <FileType type="folder" name="items" />：物品定义
    - <FileType type="folder" name="test" />：以 test 作为物品的命名空间
      - <FileType type="file" name="ruby.item.json" />：红宝石的定义文件
      - **<FileType type="file" name="ruby_sword.item.json" />：红宝石剑的定义文件**

</treeview>

写入以下内容，正如我们上一节定义红宝石一样：

```json showLineNumbers title="ruby_sword.item.json"
{
    "format_version": "1.21.50",
    "minecraft:item": {
        "description": {
            "identifier": "test:ruby_sword",
            "menu_category": {
                "category": "equipment"
            }
        },
        "components": {
            "minecraft:icon": "ruby_sword"
        }
    }
}

```

![ruby_sword_3](/img/tutorials/a2_addons/b4_data_driven_items/c3_recipes/ruby_sword_3.png)

目前，我们还没有专门讲过那些组件的作用。然而读者如果拥有比较强大的自学能力的话，应该能写出这把剑的雏形来，至少伤害功能应该是没什么问题的。目前来说，我们先实现它基本的显示功能，而不着重考虑功能问题——功能问题就留到下一节去实现吧！

然后，我们来定义资源包部分：

<treeview>
- <FileType type="folder" name="RP_test" />：资源包
  - ……
  - <FileType type="folder" name="texts" />：翻译文本
    - <FileType type="file" name="en_US.lang" />：英语（美国）翻译
    - <FileType type="file" name="zh_CN.lang" />：中文（中国）翻译
  - <FileType type="folder" name="textures" />：贴图
    - ……
    - <FileType type="folder" name="items" />：物品贴图（将物品贴图放到 items 文件夹内是惯例）
      - <FileType type="image" name="ruby.png" />：红宝石贴图
      - **<FileType type="image" name="ruby_sword.png" />：红宝石剑贴图**
    - <FileType type="file" name="item_texture.json" />：物品贴图定义文件
</treeview>

对于红宝石剑贴图<FileType type="image" name="ruby_sword.png" />，你可以直接引用下面这张图：

![ruby_sword](/img/tutorials/a2_addons/b4_data_driven_items/c3_recipes/ruby_sword.png)

顺便一提，我们是利用取色器取走了红宝石的一个颜色，然后在铁剑上直接使用颜色模式涂画画出来的——没有任何水准的做法，但至少在项目的前期，这么做是很有效的 >wO

![ruby_sword_2](/img/tutorials/a2_addons/b4_data_driven_items/c3_recipes/ruby_sword_2.png)

然后，改一下物品贴图的定义文件<FileType type="file" name="item_texture.json" />，加上一行红宝石剑贴图路径：

```json showLineNumbers title="item_texture.json" {4}
{
    "texture_data": {
        "ruby": { "textures": "textures/items/ruby" },
        "ruby_sword": { "textures": "textures/items/ruby_sword" }
    }
}

```

![ruby_sword_4](/img/tutorials/a2_addons/b4_data_driven_items/c3_recipes/ruby_sword_4.png)

最后改一下语言文件<FileType type="file" name="en_US.lang" />和<FileType type="file" name="zh_CN.lang" />，各自加上对应翻译：

```mclang showLineNumbers title="en_US.lang, zh_CN.lang"
item.test:ruby_sword=Ruby Sword
item.test:ruby_sword=红宝石剑
```

![ruby_sword_5](/img/tutorials/a2_addons/b4_data_driven_items/c3_recipes/ruby_sword_5.png)

其实，可以看到，自定义物品的实现过程中，资源包的实现过程是高度重复的。在后续的自定义物品实现中，为了简化表述，除了必要情况之外，我们日后将只展示物品行为包的定义和物品的贴图，而剩下的过程就交给读者自己完成。

可以看到，目前这把剑和我们预期的差距还是不小的。先不要着急，我们后续会解决这个问题。至少我们得先有这个物品嘛 :)

![ruby_sword_6](/img/tutorials/a2_addons/b4_data_driven_items/c3_recipes/ruby_sword_6.png)

:::

好，现在我们来着手实现红宝石剑的合成配方！读者可能已经知道，对于工作台配方，有**有序配方（Shaped Recipe）** 和**无序配方（Shapeless Recipe）** 之分。所谓**有序配方**，是指**你必须使用这种配方的摆放方式，不能使用其他的摆放方式**，比如镐子永远都是：

```text
M M M
  S
  S
```

其中`M`代表对应材料，比如钻石、铁锭等，而`S`代表木棍。使用

```text
    M
S S M
    M
```

就得不到任何东西，乱放就更得不到任何东西。而**无序配方**就和有序配方不同，**只要有所需材料即可合成**，例如打火石：

```text
I S


```

其中`I`代表铁锭，而`S`代表燧石。无论如何摆放，你都能得到一个打火石。包括混凝土粉末，也是同理的。显然，剑是属于有序配方一类的，因为你肯定不希望这样乱放也能得到一把剑：

```text
R
  S  
    R
```

其中`R`代表红宝石，而`S`代表木棍。我们预期的组合应该是

```text
R
R
S
```

为实现我们预期的组合，我们要在行为包下新建一个<FileType type="folder" name="recipes" />文件夹，代表这是一个配方文件夹。然后，在下面创建一个<FileType type="file" name="ruby_sword.recipe.json" />，作为红宝石剑的配方文件。

和物品定义类似地，<FileType type="folder" name="recipes" />下面也允许嵌套文件夹，我们可以在其中新建一些文件夹来进行分类，例如定义一个<FileType type="folder" name="test" />命名空间文件夹。目前为止，读者的文件应该是如下图所示的：

<treeview>

- <FileType type="folder" name="BP_test" />：行为包
  - ……
  - <FileType type="folder" name="recipes" />：物品定义
    - <FileType type="folder" name="test" />：以 test 作为物品的命名空间
      - **<FileType type="file" name="ruby_sword.recipe.json" />：红宝石剑的配方文件**

</treeview>

我们打开这个文件，输入以下内容：

```json showLineNumbers title="ruby_sword.recipe.json"
{
    "format_version": "1.21.0",
    "minecraft:recipe_shaped": {
        "description": {
            "identifier": "test:ruby_sword"
        },
        "tags": [ "crafting_table" ],
        "key": {
            "R": { "item": "test:ruby" },
            "S": { "item": "minecraft:stick" }
        },
        "pattern": [
            "R",
            "R",
            "S"
        ],
        "unlock": [
            { "item": "test:ruby" }
        ],
        "result": { "item": "test:ruby_sword" }
    }
}
```

有了上一节定义物品的经验，这里对于读者来说也会有一定的亲切感。我们来逐行解析：

- 首先，我们在第 2 行定义了这个配方表的格式版本。

  ```json
  "format_version": "1.21.0"
  ```

  现在而言，我们可以定义为高版本（例如`1.21.0`或`1.21.50`）。高版本的代价是必须要指定一个解锁条件，不过无伤大雅。

- 然后，在第 3 行，我们定义了这是一种有序配方。

  ```json
  "minecraft:recipe_shaped": {
      ...
  }
  ```

  和数驱物品定义的`minecraft:item`不同，这一段更需要明确定义——因为配方表有很多种，读者可能没有意识到，Minecraft 原版有足足 7 种配方！分别是：工作台的有序配方和无序配方、熔炉配方、酿造台的换容配方和混合配方、锻造台的转换配方和纹饰配方。对于不同的配方，下文所支持的 API 也是不一样的。我们这一节着重介绍工作台配方和熔炉配方，因为其他配方的限制比较多，读者可以通过[我们给出的这篇配方表文档](/docs/docs/items/recipes)自学。

- 第 4\~6 行，我们在<DataType type="object" name="description" isRequired/>定义了这个配方表的 ID。

  ```json
  "description": {
      "identifier": "test:ruby_sword"
  }
  ```

  对于配方相对简单的情况，我们习惯上就直接定义为要合成的物品的 ID，比如上文的`test:ruby_sword`；而复杂情况（比如蓝色染料），就需要区分不同的配方表 ID 了，习惯上是直接在配方表 ID 中给出合成途径。例如原版的蓝色染料，两个配方表的 ID 就分别为`minecraft:blue_dye_from_cornflower`和`minecraft:blue_dye_from_lapis_lazuli`，分别声明了从矢车菊和青金石合成的蓝色染料。

- 第 7 行，我们在<DataType type="array" name="tags" isRequired/>中定义了这个配方表可以用于哪些工作方块。

  ```json
  "tags": [ "crafting_table" ]
  ```

  对于有序合成配方，毫无疑问就是工作台了。在其他类型的配方中，我们就可以用其他的工作方块。在后面的自定义方块中，我们将认识到自定义工作台也可以应用到这里。

- 第 8\~16 行，我们在<DataType type="object" name="key"/>和<DataType type="array" name="pattern"/>中定义了这个配方表的排布方式。

  ```json
  "key": {
      "R": { "item": "test:ruby" },
      "S": { "item": "minecraft:stick" }
  },
  "pattern": [
      "R",
      "R",
      "S"
  ]
  ```

  **这一部分，就是有序配方的核心内容**。**我们在<DataType type="array" name="pattern"/>中定义了配方表的摆放方式**，看这段代码，是不是把`R`和`S`代入进去之后，就联想出了一把剑的形状？**而`R`和`S`具体代指什么物品，我们就交给<DataType type="object" name="key"/>来定义**。看起来很简单对吧？

  对于这一段，我们还有要说的。如果是那些需要带空位的合成配方呢？比如……钻石镐？我们来看看原版这一段是怎么定义的：

  ```json
  "pattern": [
      "XXX",
      " # ",
      " # "
  ],
  "key": {
      "#": { "item": "minecraft:stick" },
      "X": { "item": "minecraft:diamond" }
  }
  ```

  无疑，<DataType type="array" name="pattern"/>这个形状已经表明了一切——钻石镐的形状已经清楚地呈现在这里。需要关注的点是，对于空位我们是怎么处理的——加空格！是的，**空位就用空格来处理**。很简单吧？

  对于一个不一定占满 3×3 格子的合成配方，比如面包，就让它占 1 行就好了：

  ```json
  "pattern": [
      "###"
  ],
  "key": {
      "#": { "item": "minecraft:wheat" }
  }
  ```

  最后，有几个点需要注意：

  1. 我们希望读者可以尽可能地采用规范化的写法，也就是在`pattern`中，2×2 的配方就每行 2 个字符，而 3×3 的配方就每行 3 个字符，举个例子，这么做：

      ```json
      "pattern": [
          "## ",
          " ##"
      ]
      ```

      而不要这么做：

        ```json
      "pattern": [
          "##",
          " ##"
      ]
      ```

      上下只有一个空格之差，虽然配方实际上没什么区别，然而这种写法终究容易出事，所以就不要吝惜那个空格啦~

  2. 在<DataType type="object" name="key"/>中是明显**不能指定空格指代什么物品**的，因为空格是空位，比如这样就不是一个良好的定义：

      ```json
      "key": {
          " ": { "item": "minecraft:wheat" }
      }
      ```

      虽然没有实测过这样会不会出问题（大概率会出问题的），但英文和标点字符那么多，够我们用了。

  3. **不要在配方表中定义每行超过 3 个字符**，比如这样也不是良好的定义：

      ```json
      "pattern": [
          "####"
      ]
      ```

      多出去的字符，会被 Minecraft 自动忽视掉，没必要做这样的事情啊。

- 第 17\~19 行，我们在<DataType type="array" name="unlock" isRequired/>中定义了这个配方表在什么情况下会解锁。例如，这里就是说，获得红宝石的时候解锁此配方。

  ```json
  "unlock": [
      { "item": "test:ruby" }
  ]
  ```

  我们注意到<DataType type="array" name="unlock" isRequired/>是一个数组，这意味着它可以同时设定多个解锁条件。这些解锁条件在满足其中一个的时候，配方就会解锁，也就是这些条件是“或”的关系。例如，如果这么设定，就代表此配方在获得木棍或红宝石的时候解锁。

  ```json
  "unlock": [
      { "item": "test:ruby" },
      { "item": "minecraft:stick" }
  ]
  ```

  配方解锁不仅在获得特定物品的时候解锁，也可以在其他特殊情况下解锁，这时候我们就要提供特殊的解锁条件。写法如下：

  ```json
  "unlock": [
      { "context": "AlwaysUnlocked" }
  ]
  ```

  目前来说，配方表总共支持 3 个解锁条件：

  1. `AlwaysUnlocked`：始终解锁此配方。原版将这个条件用于工作台，以告知玩家可以时刻使用工作台继续合成。我们也可以使用这个条件来完全解除配方解锁的限制。
  2. `PlayerInWater`：玩家入水。原版将这个条件用于船。
  3. `PlayerHasManyItems`：玩家物品栏超过 10 种物品。原版将这个条件用于箱子，以告知玩家可以将这么多物品放到箱子里做整理。

  **高版本的配方表中，有序配方、无序配方和熔炉配方必须指定解锁条件**。如果你嫌麻烦，就直接`AlwaysUnlocked`吧。

- 最后，第 20 行，我们在<DataType type="array" name="result" isRequired/>中定义了这个配方表输出什么物品。

  ```json
  "result": { "item": "test:ruby_sword" }
  ```

  例如，在上文，就输出为红宝石剑了。

这样，我们就将我们给出的配方表解析完了。故而，我们看到，**有序配方表主要需要指定 ID、工作方块、原材料、配方表、结果和解锁方法这么几项内容**。

### 物品的数量和数据值表达

在上面我们只是指定了物品的类型，事实上，**我们还可以指定物品的数量和数据值**。格式上，物品的数据可以由以下结构指定：

<treeview>

- <DataType type="object"/>：代表一个物品的对象。
  - <DataType type="string" name="item" isRequired/>：物品 ID。
  - <DataType type="string" name="count"/>：物品数量。默认值为`1`。
  - <DataType type="string" name="data"/>：物品数据值。默认值为`0`。

</treeview>

这些内容在有序配方中，可以在<DataType type="array" name="unlock" isRequired/>、<DataType type="object" name="key"/>的各字符和<DataType type="array" name="result" isRequired/>中指定。其中，只有<DataType type="array" name="result" isRequired/>才能指定物品数量，代表合成出的物品数量。例如，对于玻璃板的合成配方，原版是如此定义的：

```json title="BP_vanilla/recipes/glass_pane.json" showLineNumbers {18}
{
    "format_version": "1.20.10",
    "minecraft:recipe_shaped": {
        "description": {
            "identifier": "minecraft:glass_pane"
        },
        "tags": [ "crafting_table" ],
        "pattern": [
            "###",
            "###"
        ],
        "key": {
            "#": { "item": "minecraft:glass" }
        },
        "unlock": [
            { "item": "minecraft:glass" }
        ],
        "result": { "item": "minecraft:glass_pane", "count": 16 }
    }
}
```

我们重点关注第 18 行，这里的`"count": 16`就代表这个配方可以合成出 16 个玻璃板。

而因为一些历史原因，有些物品可能需要用数据值来表示。例如下面这个合成蓝色旗帜的原版合成配方：

```json title="BP_vanilla/recipes/blue_banner.json" showLineNumbers {21}
{
    "format_version": "1.20.10",
    "minecraft:recipe_shaped": {
        "description": {
            "identifier": "minecraft:blue_banner"
        },
        "tags": [ "crafting_table" ],
        "group": "banner",
        "pattern": [
            "###",
            "###",
            " | "
        ],
        "key": {
            "#": { "item": "minecraft:blue_wool" },
            "|": { "item": "minecraft:stick" }
        },
        "unlock": [
            { "item": "minecraft:blue_wool" }
        ],
        "result": { "item": "minecraft:banner", "data": 4 }
    }
}
```

我们重点关注第 21 行，这里的`"data": 4`是蓝色的数据值代码，代表合成出的旗帜是蓝色旗帜。这种情况在原版的配方表文件中，染色物品和染料上会相对多见。

### 无序配方

## 熔炉配方

## 其他配方

---

## 物品标签

---

## 配方命令：`/recipe`

## 与配方相关的游戏规则
