---
sidebar_position: 4
---

# 脚本预设

import '/src/css/treeview.css';
import FileType from "/src/components/type/file"

本文给出一些常用的脚本预设，供开发者使用。

:::warning[温馨提示]

1. 本文假设读者已对脚本运行有了基本的了解。如果还没有了解，请在对应的文档或教程中先行学习。
2. 本文默认采用以下文件。您可按需在您指定的文件中采用本文的参考代码。
    <treeview>
    - <FileType type="folder" name="BP_npc"/>：行为包根目录
      - <FileType type="folder" name="scripts"/>：脚本
        - **<FileType type="file" name="main.js"/>：国际版脚本入口文件**（新增或更改）
        - **<FileType type="file" name="modMain.py"/>：中国版脚本入口文件**（新增或更改）
        - **<FileType type="file" name="templateServerMain.py"/>：中国版服务端脚本**（新增或更改）
        - **<FileType type="file" name="templateClientMain.py"/>：中国版服务端脚本**（新增或更改）
      - **<FileType type="file" name="manifest.json"/>：清单文件**（更改）
    </treeview>

    <details>
    <summary>中国版脚本的初始配置</summary>

    **注意高亮行的`template`应填写为您的项目的命名空间**。*备注：下面的初始配置比较偏向国际版脚本编程习惯*。

    ```python title="modMain.py" showLineNumbers {6-7,13,21}
    # -*- coding: utf-8 -*-
    from mod.common.mod import Mod
    import mod.server.extraServerApi as serverApi
    import mod.client.extraClientApi as clientApi

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
            clientApi.RegisterSystem("templateSystem", "templateClient", "scripts.templateClientMain.templateClient")

        @Mod.DestroyClient()
        def clientUnsubscribe(self):
            pass

    ```

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
            pass

        def unsubscribe(self):
            pass

    ```

    ```python title="templateClientMain.py" showLineNumbers {5,8}
    # -*- coding: utf-8 -*-
    import mod.client.extraClientApi as clientApi
    ClientSystem = clientApi.GetClientSystemCls()

    class templateClient(ClientSystem):

        def __init__(self, namespace, systemName):
            super(templateClient, self).__init__(namespace, systemName)
            self.subscribe()

        def subscribe(self):
            pass

        def unsubscribe(self):
            pass

    ```

    </details>

:::

---

## 血量监控

用于检查实体的血量，并打印到`health`记分板上。

<details>

<summary>国际版</summary>

参考事件[`EntityHealthChangedAfterEvent`](https://jaylydev.github.io/scriptapi-docs/latest/classes/_minecraft_server.EntityHealthChangedAfterEvent.html)。

如果您需要，您可以扩展`entityTypes`中所指定的实体类型，以使这段代码对更多类型的实体生效。

```javascript title="main.js" showLineNumbers
import { Entity, EntityHealthComponent, world } from "@minecraft/server";

// ===== 实体血量监控 =====

world.afterEvents.entitySpawn.subscribe( event => {
    /** 刚生成的实体 */
    const entity = event.entity;
    /** 该实体的血量组件 @type {EntityHealthComponent} */
    const entityHealth = entity.getComponent("minecraft:health");
    /** 该实体的血量最大值 */
    const entityMaxHealth = entityHealth?.effectiveMax;

    // 此处是为了防止某些实体无血量而导致报错
    if ( entityMaxHealth !== undefined ) {
        printHealth(entity, entityMaxHealth);
    }
})

world.afterEvents.entityHealthChanged.subscribe(event => {
    printHealth(event.entity, event.newValue);
});

/**
 * @param {Entity} entity
 * @param {number} healthValue 
*/
function printHealth( entity, healthValue ) {
    /** 要检查的实体 */
    const entityTypes = [ "minecraft:player", "minecraft:sheep" ];

    // 若实体在允许的实体列表中，则打印实体血量到health记分板上
    if ( entityTypes.includes(entity.typeId) ) {
        /** 实体血量更改后的血量（整数型） */
        const healthValueInt = Math.ceil(healthValue);
        entity.runCommand(`scoreboard players set @s health ${healthValueInt}`);
    }
}

```

</details>

<details>

<summary>中国版</summary>

**服务端脚本**。参考事件[`HealthChangeServerEvent`](https://mc.163.com/dev/mcmanual/mc-dev/mcdocs/1-ModAPI/%E4%BA%8B%E4%BB%B6/%E5%AE%9E%E4%BD%93.html?key=HealthChangeServerEvent&docindex=2&type=0)和[`AddEntityServerEvent`](https://mc.163.com/dev/mcmanual/mc-dev/mcdocs/1-ModAPI/%E4%BA%8B%E4%BB%B6/%E4%B8%96%E7%95%8C.html?key=AddEntityServerEvent&docindex=2&type=0)。

如果您需要，您可以扩展`entityTypes`中所指定的实体类型，以使这段代码对更多类型的实体生效。

```python title="templateServerMain.py（服务端脚本）" showLineNumbers
class templateServer(ServerSystem):

    def subscribe(self):
        self.ListenForEvent(defaultNamespace, defaultSystemName, "AddEntityServerEvent", self, self.entitySpawn)
        self.ListenForEvent(defaultNamespace, defaultSystemName, "HealthChangeServerEvent", self, self.entityHealthChanged)

    # ===== 实体血量监控 =====

    def entitySpawn(self, event):
        # type: ( dict ) -> None

        entityId = event["id"] # 刚生成的实体 ID
        entityMaxHealth = compFactory.CreateAttr(entityId).GetAttrMaxValue(0) # 刚生成的实体的血量最大值

        # 此处是为了防止某些实体无血量而导致报错
        if entityMaxHealth != None:
            self.printHealth(entityId, entityMaxHealth)

    def entityHealthChanged(self, event):
        # type: ( dict ) -> None
        self.printHealth(event["entityId"], event["to"])

    def printHealth(self, entityId, healthValue):
        # type: ( str, float ) -> None

        entityTypeId = compFactory.CreateEngineType(entityId).GetEngineTypeStr() # 实体的类型 ID
        entityTypes = ["minecraft:player", "minecraft:sheep"] # 要检查的实体

        # 若实体在允许的实体列表中，则打印实体血量到health记分板上
        if entityTypeId in entityTypes:
            healthValueInt = int(math.ceil(healthValue)) # 实体血量更改后的血量（整数型）
            compFactory.CreateCommand(levelId).SetCommand("/scoreboard players set @s health {}".format(healthValueInt), entityId)

```

</details>

## 使用物品

用于检查玩家是否右键（长按）使用物品，并执行函数`items/(物品ID)`。

注意：物品为开始使用时触发。因此，通常用于一些不能蓄力甚至使用后无明显效果的物品，例如木棍。

<details>

<summary>国际版</summary>

参考事件[`ItemUseAfterEvent`](https://jaylydev.github.io/scriptapi-docs/latest/classes/_minecraft_server.ItemUseAfterEvent.html)。

如果您需要，您可以扩展`usableItems`中所指定的物品 ID，以使这段代码对更多类型的物品生效。

```javascript title="main.js" showLineNumbers
import { world } from "@minecraft/server";

// ===== 使用物品 =====

world.afterEvents.itemUse.subscribe(event => {
    const usableItems = [ "minecraft:stick" ];
    if (usableItems.includes(event.itemStack.typeId)) {
        event.source.runCommand(`function items/${event.itemStack.typeId.split(":")[1]}`);
    }
});

```

</details>

<details>

<summary>中国版</summary>

**服务端脚本**。参考事件[`ItemUseAfterServerEvent`](https://mc.163.com/dev/mcmanual/mc-dev/mcdocs/1-ModAPI/%E4%BA%8B%E4%BB%B6/%E7%89%A9%E5%93%81.html?key=ItemUseAfterServerEvent&docindex=2&type=0)。

如果您需要，您可以扩展`usableItems`中所指定的物品 ID，以使这段代码对更多类型的物品生效。

```python title="templateServerMain.py（服务端脚本）" showLineNumbers
class templateServer(ServerSystem):

    def subscribe(self):
        self.ListenForEvent(defaultNamespace, defaultSystemName, "ItemUseAfterServerEvent", self, self.itemUse)

    # ===== 使用物品 =====

    def itemUse(self, event):
        # type: ( dict ) -> None
        sourceId = event["entityId"]
        itemStack = event["itemDict"]
        usableItems = []
        if itemStack["newItemName"] in usableItems:
            compFactory.CreateCommand(levelId).SetCommand("/function items/{}".format(itemStack["newItemName"].split(":")[1]), sourceId)

```

</details>

## 使用完毕物品

用于检查玩家是否右键（长按）使用物品，并执行函数`items/(物品ID)`。

注意：物品为使用完毕时触发。因此，通常用于一些可蓄力使用的物品，例如弓、药水、食物等。

<details>

<summary>国际版</summary>

参考事件[`ItemCompleteUseAfterEvent`](https://jaylydev.github.io/scriptapi-docs/latest/classes/_minecraft_server.ItemUseAfterEvent.html)。

如果您需要，您可以扩展`usableItems`中所指定的物品 ID，以使这段代码对更多类型的物品生效。

```javascript title="main.js" showLineNumbers {1}
import { world } from "@minecraft/server";

// ===== 使用完毕物品 =====

world.afterEvents.itemCompleteUse.subscribe(event => {
    const usableItems = [ "minecraft:potion" ];
    if (usableItems.includes(event.itemStack.typeId)) {
        event.source.runCommand(`function items/${event.itemStack.typeId.split(":")[1]}`);
    }
});
```

</details>

<details>

<summary>中国版</summary>

**服务端脚本**。参考事件[`ActorUseItemServerEvent`](https://mc.163.com/dev/mcmanual/mc-dev/mcdocs/1-ModAPI/%E4%BA%8B%E4%BB%B6/%E7%89%A9%E5%93%81.html?catalog=1#actoruseitemserverevent)。

如果您需要，您可以扩展`usableItems`中所指定的物品 ID，以使这段代码对更多类型的物品生效。

```python title="templateServerMain.py（服务端脚本）" showLineNumbers
class templateServer(ServerSystem):

    def subscribe(self):
        self.ListenForEvent(defaultNamespace, defaultSystemName, "ActorUseItemServerEvent", self, self.itemCompleteUse)

    # ===== 使用完毕物品 =====

    def itemCompleteUse(self, event):
        # type: ( dict ) -> None
        sourceId = event["playerId"]
        itemStack = event["itemDict"]
        usableItems = []
        if itemStack["newItemName"] in usableItems:
            compFactory.CreateCommand(levelId).SetCommand("/function items/{}".format(itemStack["newItemName"].split(":")[1]), sourceId)

```

</details>
