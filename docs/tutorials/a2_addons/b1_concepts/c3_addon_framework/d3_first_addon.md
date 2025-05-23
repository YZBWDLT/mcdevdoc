---
sidebar_position: 3
---

# 1.3.3 构建第一个附加包

import treeview from '/src/css/treeview.css';
import FileType from "/src/components/FileType"

在上一节，我们为附加包打造了一个“身份证”`manifest.json`。但是只有身份证是没有用的，我们要给游戏展示我们的“身份证”，显然这个过程需要我们**导入（Import）** 一个附加包到游戏里面。怎么导入？导入到哪里？这就是我们这一节所讲解的重点。

---

首先，我们先以国际版的 Windows 版本为例来讲解，然后一步步地延伸到安卓版和中国版的特殊案例上。所以，即使读者是手机玩家或中国版玩家，这一部分也是要看一看的哦。

## `com.mojang`文件夹——游戏数据文件夹

首先第一步，我们要找到游戏存储数据的路径。读者可以打开文件管理器，并将下面的路径粘贴到文件管理器的导航栏上：

```text
%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang
```

![com_mojang_1](./../img/c3_addon_framework/com_mojang_1.png)

回车进入该路径后，记得将这个路径收藏下来，毕竟这个路径还是有些复杂的，不太好找。

![com_mojang_2](./../img/c3_addon_framework/com_mojang_2.png)

这个 **`com.mojang`，就是游戏存储数据的文件夹**。现在，我们来看看这个文件夹里面都有哪些内容吧！

![com_mojang_3](./../img/c3_addon_framework/com_mojang_3.png)

先指出一点就是，在本教程中，谈文件路径也是很重要的一环。我们用记号<FileType fileType="folder"/>代表文件夹，用<FileType fileType="file"/>代表一般文件，用<FileType fileType="image"/>表示图像，用<FileType fileType="music"/>表示音乐。相比于 JSON 数据格式的记号来说，这种图案的表示应该是很清晰直观的。

文件是要谈后缀名的，这一点我们在 [1.3.1](./d1_ide#文件管理器的设置) 的时候就已经详细聊过，所以请务必启用后缀名，我们这里也会谈后缀名，比如上一节的清单文件`manifest.json`我们就会这么表示：<FileType fileType="file" name="manifest.json"/>。

我们挑 com.mojang 里面重点部分来说：

<div class="treeview">

- <FileType fileType="folder" name="com.mojang"/>：游戏数据文件夹
  - <FileType fileType="folder" name="behavior_packs"/>：**全局**行为包文件夹，存放所有的行为包
  - <FileType fileType="folder" name="resource_packs"/>：**全局**资源包文件夹，存放所有的资源包
  - <FileType fileType="folder" name="development_behavior_packs"/>：开发行为包文件夹，存放所有的开发用行为包
  - <FileType fileType="folder" name="development_resource_packs"/>：开发资源包文件夹，存放所有的开发用资源包
  - <FileType fileType="folder" name="skin_packs"/>：皮肤包文件夹，存放所有的皮肤包
  - <FileType fileType="folder" name="world_templates"/>：地图模板文件夹，存放所有导入的外部地图模板
  - <FileType fileType="folder" name="minecraftWorlds"/>：**地图**文件夹，存放所有的地图，是的，你所有的世界都存放在这里面!
    - <FileType fileType="folder" name="（任意名称）"/>：地图文件
      - <FileType fileType="folder" name="db"/>：地图数据文件夹，通常存储一些无法通过常规文本编辑器直接访问的数据文件
      - <FileType fileType="folder" name="behavior_packs"/>：地图应用的行为包
      - <FileType fileType="folder" name="resource_packs"/>：地图应用的资源包
      - <FileType fileType="file" name="level.dat"/>：地图的核心数据文件
      - <FileType fileType="file" name="level.dat_old"/>：level.dat 的备份文件
      - <FileType fileType="file" name="levelname.txt"/>：地图名（虽然直接更改地图名不会起作用）
      - <FileType fileType="image" name="world_icon.jpeg"/>：地图图标，会对地图关闭的一瞬间进行截图
      - <FileType fileType="file" name="world_behavior_packs.json"/>：地图启用的行为包
      - <FileType fileType="file" name="world_resource_packs.json"/>：地图启用的资源包

<br/></div>

此外，com.mojang 里面还有其他文件夹，比如<FileType fileType="folder" name="Screenshots"/>是保存截图的，等等，就留给读者自行探索。

显然，我们要编写行为包和资源包的话，就要关注<FileType fileType="folder" name="behavior_packs"/>和<FileType fileType="folder" name="resource_packs"/>。在上面的文件路径中，我们看到行为包和资源包有“全局”和“地图内”之分，这正对应着游戏内的全局设置和地图设置。所以：

- 如果你想要做纯附加包的话，应该在**全局**的<FileType fileType="folder" name="development_behavior_packs"/>和<FileType fileType="folder" name="development_resource_packs"/>中进行开发；
  - 为什么不用<FileType fileType="folder" name="behavior_packs"/>和<FileType fileType="folder" name="resource_packs"/>呢？这主要是因为两个开发文件夹有特别优化，可以方便开发者在退出再重进地图后就应用更改，而无需重启游戏。而从外部导入的行为包资源包就通常直接导入到这两个文件夹里，代表这些包是稳定的包。
- 而要做地图配套的附加包的话，就应该在**地图中**的<FileType fileType="folder" name="behavior_packs"/>和<FileType fileType="folder" name="resource_packs"/>中进行开发。

## 创建第一个行为包 & 资源包

理清了游戏数据文件夹之后，我们就可以正式开始构建我们的第一个包了！我们这里先做**全局**的附加包，关于地图特制的附加包的话，处理方法我们稍后就会介绍。

在上一节，我们布置了两道习题，读者如果还没有做的话，请先去做一下哦。答案在本章小结中。

1. 现在，我们先在全局的<FileType fileType="folder" name="development_behavior_packs"/>下创建一个新的文件夹<FileType fileType="folder" name="BP_test"/>。
2. 然后再把上一节练习中创建的`manifest_bp.json`放到该文件夹下，并重命名为`manifest.json`。你的文件路径应该如下图所示：

    <div class="treeview">

    - <FileType fileType="folder" name="development_behavior_packs"/>：开发行为包文件夹
      - <FileType fileType="folder" name="BP_test"/>：我们的测试行为包
        - <FileType fileType="file" name="manifest.json"/>：行为包的清单文件

    <br/></div>

3. 删除清单文件中的依赖项，下面是一个清单文件<FileType fileType="file" name="manifest.json"/>的示例：

    ```json showLineNumbers title="manifest.json"
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
        ]
    }
    ```

这时候，<FileType fileType="folder" name="BP_test"/>就已经是一个正确的行为包了。关于这个文件夹的命名，通常来说是任取的，不过习惯上来讲我们都命名为以`BP_`开头的文件夹，在后面接上包的简单描述。例如，如果你在做一个起床战争的行为包，就可以命名为`BP_bedwars`。这样起名还有一个好处，就是前面在 VSC 中安装的插件也可以更方便地检查到相关的路径了。

我们来打开游戏，来看看我们刚装上的包的效果吧！在设置 - 存储 - 行为包中可以看到我们刚创建的行为包：

![first_pack_1](./../img/c3_addon_framework/first_pack_1.png)

它的图标目前显示为一个奇怪的紫黑块，并且因为没有内容，所以显示为 0.00 MB。但是，只要能够让游戏成功地识别到这是一个行为包，就已经是一个巨大的成功了。

如果在你的游戏中没有看到刚创建的行为包，请仔细检查你的文件路径和清单文件，以及如果你正在 Minecraft 中的话，要退出游戏并重进。总之，现在你应该能在游戏中看到刚创建的行为包，这个步骤是很重要的。

同理地，我们也可以创建一个新的资源包，步骤和创建行为包类似：

1. 在全局的<FileType fileType="folder" name="development_resource_packs"/>下创建一个新的文件夹<FileType fileType="folder" name="RP_test"/>。
2. 把上一节练习中创建的`manifest_rp.json`放到该文件夹下，并重命名为`manifest.json`。你的文件路径应该如下图所示：

    <div class="treeview">

    - <FileType fileType="folder" name="development_resource_packs"/>：开发资源包文件夹
      - <FileType fileType="folder" name="RP_test"/>：我们的测试资源包
        - <FileType fileType="file" name="manifest.json"/>：资源包的清单文件

    <br/></div>

3. 下面是一个清单文件<FileType fileType="file" name="manifest.json"/>的示例：

    ```json showLineNumbers title="manifest.json"
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

然后启动游戏检查一下，你应该能看到刚创建的资源包，你甚至可以在全局资源中启动你的资源包（虽然目前不会有任何效果就是了）。

![first_pack_2](./../img/c3_addon_framework/first_pack_2.png)

恭喜你！这就是我们实现的第一个附加包啦！接下来，我们就要在这两个附加包中不断地加入功能，来实现我们的需求了。

*在 Minecraft 的所有玩家中，会做附加包的玩家可以说是少之又少。正所谓万事开头难，如果你已经走到这一步，并且成功地看到刚创建的附加包框架，就已经很厉害了哦\~ 也有很多人可能会因为大大小小的失误而看不到这一结果，不必心急，仔细检查一下，也能成功的！*

## 图标文件

很显然，紫黑块并不是我们想要的图标。稍微有些经验的玩家都知道，紫黑块代表着 Minecraft 的一种**无效纹理**。这正是我们没有定义图标文件所导致的。

我们可以找一个正方形的`.png`文件，起名叫做`pack_icon.png`，并放到包里面去，就可以正常地显示图标出来啦！路径分别如下所示：

<div class="treeview">

- <FileType fileType="folder" name="BP_test"/>：测试行为包
  - <FileType fileType="file" name="manifest.json"/>：清单文件
  - <FileType fileType="image" name="pack_icon.png"/>：图标
- <FileType fileType="folder" name="RP_test"/>：测试资源包
  - <FileType fileType="file" name="manifest.json"/>：清单文件
  - <FileType fileType="image" name="pack_icon.png"/>：图标

<br/></div>

如果你没有的话，这里有一个我们绘制的小图片可供你使用，你可以右键保存该图片并应用到你的附加包中。

<img src="/img/tutorials/a2_addons/b1_concepts/c3_addon_framework/pack_icon.png" alt="pack_icon" style={{height:"60px",width:"60px"}}></img>

添加了图标文件之后，就会显示正常啦。

![first_pack_3](./../img/c3_addon_framework/first_pack_3.png)

## 附加包的打包方法

## 世界应用的附加包的注册文件

### `world_behavior_packs.json`

### `world_resource_packs.json`

---

现在我们来看看安卓版上的国际版。

---

现在我们来看看中国版的特殊情况。

---

## 总结与练习
