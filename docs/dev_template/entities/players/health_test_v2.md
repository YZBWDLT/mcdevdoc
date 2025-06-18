---
sidebar_position: 1
---

# 血量监控 v2

import treeview from '/src/css/treeview.css';
import FileType from "/src/components/FileType"

**本文用于进行玩家的血量监控**。监控手段基于脚本。

## 国际版

:::warning[温馨提示]

本文假设读者已对国际版的脚本运行有了基本的了解。

:::

要为国际版添加血量监控，需要更改或新增下面的粗体文件，请提前准备：

<div class="treeview">

- <FileType fileType="folder" name="BP_npc"/>：行为包根目录
  - <FileType fileType="folder" name="scripts"/>：脚本
    - **<FileType fileType="file" name="main.js"/>：入口文件**（新增或更改）
  - **<FileType fileType="file" name="manifest.json"/>：清单文件**（更改）

<br/></div>

在清单文件<FileType fileType="file" name="manifest.json"/>中，添加新的模块和依赖项：

```json title="manifest.json" showLineNumbers {5-10,12-17}
{
    ...,
    "modules": [
        ...,
        {
            "type": "script",
            "version": [ 1, 0, 0 ],
            "uuid": "a0283f05-0cbd-4612-be7c-55887b507b77",
            "entry": "scripts/main.js"
        }
    ],
    "dependencies": [
        {
            "module_name": "@minecraft/server",
            "version": "1.11.0"
        }
    ]
}
```

上文中，采用`@minecraft/server@1.11.0`是出于基于 1.21.0 的脚本系统而考虑的。您可以根据您的实际需求采用不同的脚本版本。

然后，打开脚本入口文件<FileType fileType="file" name="main.js"/>，这里我们使用这里，我们使用 SAPI 的`EntityHealthChangedAfterEvent`事件。新增以下字段：

```javascript title="main.js" showLineNumbers {1}
import { world } from "@minecraft/server";

world.afterEvents.entityHealthChanged.subscribe(event => {
    event.entity.runCommand(`scoreboard players set @s health ${Math.ceil(event.newValue)}`);
}, { entityTypes: ["minecraft:player"] });

```

请注意：第 1 行不必多次重复导入`world`模块。如果您已有一个脚本文件，请注意这点。

这段代码将把所有玩家的血量记录到`health`记分板上。如果您需要，您可以扩展`entityTypes`中所指定的实体类型，以使这段代码对更多类型的实体生效。

## 中国版

:::warning[温馨提示]

本文假设读者已对中国版的脚本运行有了基本的了解。

:::

要为中国版添加血量监控，需要更改或新增下面的粗体文件，其中下文所有的`template`应填写为您的项目的命名空间，请提前准备：

<div class="treeview">

- <FileType fileType="folder" name="BP_npc"/>：行为包根目录
  - <FileType fileType="folder" name="scripts"/>：脚本
    - **<FileType fileType="file" name="modMain.py"/>：入口文件**（新增或更改）
    - **<FileType fileType="file" name="templateServerMain.py"/>：服务端脚本**（新增或更改）
  - <FileType fileType="file" name="manifest.json"/>：清单文件

<br/></div>

打开脚本入口文件<FileType fileType="file" name="modMain.py"/>，进行最基本的初始化。同样，注意高亮行的`template`应填写为您的项目的命名空间。

```python title="modMain.py" showLineNumbers {5-6,12}
# -*- coding: utf-8 -*-
from mod.common.mod import Mod
import mod.server.extraServerApi as serverApi

@Mod.Binding(name = "template", version = "1.0.0")
class templateSystem(object):
    def __init__(self):
        pass

    @Mod.InitServer()
    def serverSubscribe(self):
        serverApi.RegisterSystem("templateSystem", "templateServer", "scripts.templateServerMain.templateServer")
    
    @Mod.DestroyServer()
    def serverUnsubscribe(self):
        pass
    
    @Mod.InitClient()
    def clientSubscribe(self):
        pass

    @Mod.DestroyClient()
    def clientUnsubscribe(self):
        pass

```

然后，打开服务端脚本文件<FileType fileType="file" name="templateServerMain.py"/>，写入类似于国际版的基本逻辑。这里，我们和 SAPI 的`EntityHealthChangedAfterEvent`类似的服务端事件 API `HealthChangeServerEvent`。读者可以发现这两个 API 的参数是高度相似的。

同样，注意高亮行的`template`应填写为您的项目的命名空间。

```python title="templateServerMain.py" showLineNumbers {11,14}
# -*- coding: utf-8 -*-
import mod.server.extraServerApi as serverApi
import math

ServerSystem = serverApi.GetServerSystemCls()
compFactory = serverApi.GetEngineCompFactory()
defaultNamespace = serverApi.GetEngineNamespace()
defaultSystemName = serverApi.GetEngineSystemName()
levelId = serverApi.GetLevelId()

class templateServer(ServerSystem):

    def __init__(self, namespace, systemName):
        super(templateServer, self).__init__(namespace, systemName)
        self.subscribe()

    def subscribe(self):
        self.ListenForEvent(defaultNamespace, defaultSystemName, "HealthChangeServerEvent", self, self.entityHealthChanged)

    def unsubscribe(self):
        pass

    def entityHealthChanged(self, event):
        entityId = event["entityId"]
        entityTypeId = compFactory.CreateEngineType(entityId).GetEngineTypeStr()
        newValue = int(math.ceil(event["to"]))
        entityTypes = ["minecraft:player"]

        if entityTypeId in entityTypes:
            compFactory.CreateCommand(levelId).SetCommand("/scoreboard players set @s health {}".format(newValue), entityId)

```
