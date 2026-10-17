---
sidebar_position: 3
---

# 界面管理器

import Version from "/src/components/highlight/version"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录界面管理器相关接口，传统表单与数据驱动 UI 均可用它管理界面。

---

## 界面管理器

### uiManager 常量

<Version type="script-ui" add="1.3.0"/>

```typescript
const uiManager: UIManager;
```

[UIManager](#uimanager-类)，表示全局唯一的界面管理器。

### UIManager 类

<Version type="script-ui" add="1.3.0"/>

界面管理器，提供界面级的操作，可通过全局常量`uiManager`访问。

```typescript
class UIManager {
    private constructor();
    closeAllForms(player: Player): void;
}
```

#### closeAllForms 方法

<RestrictedMode inline/>

关闭该玩家当前打开的全部表单。

```typescript
closeAllForms(player: Player): void
```

- player: [Player](../server/entity_and_player/player#player-类)，要关闭全部表单的玩家。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server-ui` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-ui/changelog?view=minecraft-bedrock-stable)
