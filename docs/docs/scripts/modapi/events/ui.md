---
sidebar_position: 7
---

# UI

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录UI相关的事件，共 17 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/UI.html"/>

---

### AchievementButtonMovedClientEvent

<Client/>

触发时机：使用自定义成就系统的时，拖动成就入口结束时触发。

```python
AchievementButtonMovedClientEvent(oldPosition: Tuple[float, float], newPosition: Tuple[float, float]) -> Any
```

- oldPosition: Tuple[float, float]，移动前该控件相对父节点的坐标信息，第一项为横轴，第二项为纵轴。
- newPosition: Tuple[float, float]，移动后该控件相对父节点的坐标信息，第一项为横轴，第二项为纵轴。

---

### ClientChestCloseEvent

<Client/>

关闭箱子界面时触发，包括小箱子，合并后大箱子和末影箱(实体容器不属于方块，不会触发该事件)。

```python
ClientChestCloseEvent(
    playerId: str,
    x: int,
    y: int,
    z: int,
    fullName: str,
    auxData: int,
    dimensionId: int,
    isLargeChest: bool,
) -> Any
```

- playerId: str，玩家实体 id。
- x: int，箱子位置 x 值。
- y: int，箱子位置 y 值。
- z: int，箱子位置 z 值。
- fullName: str，方块名称，如 minecraft:chest。
- auxData: int，方块附加值。
- dimensionId: int，维度 id。
- isLargeChest: bool，是否是大箱子，仅箱子(chest)时存在该参数，末影箱/木桶/潜影盒不存在该参数。

**备注**

- 注：关闭时若容器管理器已提前释放，参数可能为空。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ClientChestOpenEvent

<Client/>

打开箱子界面时触发，包括小箱子，合并后大箱子和末影箱(实体容器不属于方块，不会触发该事件)。

```python
ClientChestOpenEvent(
    playerId: str,
    x: int,
    y: int,
    z: int,
    fullName: str,
    auxData: int,
    dimensionId: int,
    isLargeChest: bool,
) -> Any
```

- playerId: str，玩家实体 id。
- x: int，箱子位置 x 值。
- y: int，箱子位置 y 值。
- z: int，箱子位置 z 值。
- fullName: str，方块名称，如 minecraft:chest。
- auxData: int，方块附加值。
- dimensionId: int，维度 id。
- isLargeChest: bool，是否是大箱子，仅箱子(chest)时存在该参数，末影箱/木桶/潜影盒不存在该参数。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### ClientPlayerInventoryCloseEvent

<Client/>

关闭物品背包界面时触发。

```python
ClientPlayerInventoryCloseEvent() -> Any
```

---

### ClientPlayerInventoryOpenEvent

<Client/>

打开物品背包界面时触发。

```python
ClientPlayerInventoryOpenEvent(isCreative: bool, cancel: bool) -> Any
```

- isCreative: bool，是否是创造模式背包界面。
- cancel: bool，取消打开物品背包界面。

---

### CloseNeteaseShopEvent

<Client/>

关闭商城界面时触发，包括脚本商城和 Apollo 插件商城。

```python
CloseNeteaseShopEvent() -> Any
```

---

### GridComponentSizeChangedClientEvent

<Client/>

UI grid 控件里格子重新排列时触发。

```python
GridComponentSizeChangedClientEvent(path: str) -> Any
```

- path: str，grid 网格所在的路径（从 UI 根节点算起）。

---

### HudButtonChangedClientEvent

<Client/>

当原生 HUD 按钮位置或大小发生改变时触发，例如玩家使用了自定义控件功能会触发，可在该事件中修改 mod 按钮的位置防止重叠。

```python
HudButtonChangedClientEvent(changedList: Tuple[Dict[str, Any]]) -> Any
```

- changedList: Tuple[Dict[str, Any]]，修改后的按钮列表。

**备注**

- 修改后的按钮列表中，每个按钮的字段如下：

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| areaEnum | str | [HUD 原生 UI 枚举值](https://mc.163.com/newdev/docs/api/meijuzhi/OriginGUIName.html) |
| beforeSize | tuple(float,float,float,float) | (xMin, yMin, xMax, yMax)修改前原生 UI 的 Area |
| afterSize | tuple(float,float,float,float) | (xMin, yMin, xMax, yMax)修改后原生 UI 的 Area |

---

### OnItemSlotButtonClickedEvent

<Client/>

点击快捷栏、背包栏、盔甲栏、副手栏的物品槽时触发。

```python
OnItemSlotButtonClickedEvent(slotIndex: int) -> Any
```

- slotIndex: int，点击的物品槽的编号，编号对应位置详见[[物品栏](https://zh.minecraft.wiki/w/%E7%89%A9%E5%93%81%E6%A0%8F)]。

---

### PlayerChatButtonClickClientEvent

<Client/>

玩家点击聊天按钮或回车键触发呼出聊天窗口时客户端抛出的事件。

```python
PlayerChatButtonClickClientEvent() -> Any
```

---

### PlayerInventoryOpenScriptServerEvent

<Server/>

某个客户端打开物品背包界面时触发。

```python
PlayerInventoryOpenScriptServerEvent(playerId: str, isCreative: bool) -> Any
```

- playerId: str，客户端对应的玩家 entity 的唯一 ID。
- isCreative: bool，是否是创造模式背包界面。

**备注**

- 可以监听此事件判定客户端是否打开了创造背包。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---

### PopScreenAfterClientEvent

<Client/>

screen 移除触发。

```python
PopScreenAfterClientEvent(screenName: str, screenDef: str) -> Any
```

- screenName: str，UI 名字。
- screenDef: str，包含命名空间的 UI 名字，格式为 namespace.screenName。

**备注**

- 与 [PopScreenEvent](/docs/docs/scripts/modapi/events/ui#popscreenevent) 不同，PopScreenAfterClientEvent 触发时机是在完全把 UI 弹出后，返回的参数是弹出后最顶层 UI 的。

---

### PopScreenEvent

<Client/>

screen 移除触发。

```python
PopScreenEvent(screenName: str, screenDef: str) -> Any
```

- screenName: str，UI 名字。
- screenDef: str，包含命名空间的 UI 名字，格式为 namespace.screenName。

**备注**

- screenName 为正在弹出的 Screen 名，如果需要获取下一个 Screen 可使用 [PopScreenAfterClientEvent](/docs/docs/scripts/modapi/events/ui#popscreenafterclientevent)。

---

### PushScreenEvent

<Client/>

screen 创建触发。

```python
PushScreenEvent(screenName: str, screenDef: str) -> Any
```

- screenName: str，UI 名字。
- screenDef: str，包含命名空间的 UI 名字，格式为 namespace.screenName。

---

### ScreenSizeChangedClientEvent

<Client/>

改变屏幕大小时会触发的事件。

```python
ScreenSizeChangedClientEvent(beforeX: float, beforeY: float, afterX: float, afterY: float) -> Any
```

- beforeX: float，屏幕大小改变前的宽度。
- beforeY: float，屏幕大小改变前的高度。
- afterX: float，屏幕大小改变后的宽度。
- afterY: float，屏幕大小改变后的高度。

**备注**

- 该事件仅支持 PC。

---

### UiInitFinished

<Client/>

UI 初始化框架完成,此时可以创建 UI。

```python
UiInitFinished() -> Any
```


**备注**

- 切换维度后会重新初始化 UI 并触发该事件。

---

### UrgeShipEvent

<Server/>

玩家点击商城催促发货按钮时触发该事件。

```python
UrgeShipEvent(playerId: str) -> Any
```

- playerId: str，玩家 id。

在零件中直接声明一个同名函数，即可完成监听，详情参考[零件事件](https://mc.163.com/newdev/docs/mcguide/20-wanfakaifa/14-yushewanfabiancheng/12-shenrulijielingjian/0-lingjiankaifa.html#零件事件)。

---
