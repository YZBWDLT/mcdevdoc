---
sidebar_position: 16
---

# 原生 UI

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录原生 UI相关的接口，共 42 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/yuansheng-ui.html"/>

---

### ChangeSneakState

<Client/>

模块级函数，直接调用。

切换潜行状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeSneakState() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.ChangeSneakState()
```

</TabItem>
</Tabs>

---

### ClickInteractGUI

<Client/>

模块级函数，直接调用。

模拟点击交互按钮，交互按钮指的在喂食、钓鱼、交易等交互场景出现的按钮。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClickInteractGUI() -> Any
```


**备注**

- 交互行为。

| 条件 | 交互按钮 |
| --- | --- |
| 玩家站在坐骑附近 | 【骑乘】 |
| 玩家手持打火石 | 【点燃】 |
| 玩家给羊驼、驴、骡连接箱子 | 【连接箱子】 |
| 玩家和村民交易 | 【交易】 |
| 玩家拿着栓绳对实体 | 【拴住】/【解开】 |
| 玩家手持钓竿钓鱼 | 【钓鱼】 |
| 玩家站在矿车附近 | 【乘坐】 |
| 玩家在船附近 | 【上船】/【下船】 |
| 玩家手持装备，或站在盔甲架附近 | 【装备】 |
| 玩家站在动物附近 | 【喂养】 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.ClickInteractGUI()
```

</TabItem>
</Tabs>

---

### GetOriginAreaOffset

<Client/>

模块级函数，直接调用。

获取指定原生 UI 的 offset,包括左上角和右下角。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOriginAreaOffset(areaEnum: str) -> Tuple[float, float, float, float]
```

- areaEnum: str，原生 UI 枚举([原生 UI 枚举](/docs/docs/scripts/modapi/enums#originguiname))。

**返回值**：Tuple[float, float, float, float]，(xMin, yMin, xMax, yMax)原生 UI 的 Area。

**备注**

- 部分情况下获取的 area 值返回(0,0,0,0)，如开启了聊天插件后，聊天按钮不再支持获取，默认返回(0,0,0,0)。
- 以屏幕左上角为原点，由于原版 UI 使用基类画布，因此坐标为基类画布下的坐标，在适配时需要注意异形屏的情况。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.GetOriginAreaOffset(clientApi.GetMinecraftEnum().OriginGUIName.ChatBtn)
```

</TabItem>
</Tabs>

---

### GetScreenSize

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取游戏分辨率。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetScreenSize() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，宽高（像素）。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
width, height = comp.GetScreenSize()
```

</TabItem>
</Tabs>

---

### GetScreenViewInfo

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

获取游戏视角信息。首先获得当前分辨率下 UI 放大倍数，计算方式可参考[《我的世界》界面适配方法](https://mc.163.com/newdev/docs/mcguide/18-jiemianyujiaohu/1-jiemianbianjiqishiyongshuoming.html#《我的世界》界面适配方法)。则当前游戏视角的宽度的计算方式为：若当前分辨率的宽度能被该放大倍数整除，则等于当前分辨率，若不能，则等于当前分辨率加放大倍数再减去当前分辨率对放大倍数求余的结果，当前游戏视角的高度计算方法类似。例：以分辨率为 1792，828 的手机计算，画布是分辨率的 3 倍，所以 x = 1792 + 3 - 1 = 1794；y = 828，该接口返回的结果为(1794.0, 828.0, 0.0, 0.0)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetScreenViewInfo() -> Tuple[float, float, float, float]
```


**返回值**：Tuple[float, float, float, float]，依次为宽、高、x 偏移、y 偏移。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
width, height, offsetX, offsetY= comp.GetScreenViewInfo()
```

</TabItem>
</Tabs>

---

### GetWalkState

<Client/>

模块级函数，直接调用。

获取玩家行走/潜行/跑步状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetWalkState() -> WalkState
```


**返回值**：WalkState，行走/潜行/跑步状态 ([行走状态](/docs/docs/scripts/modapi/enums#walkstate))。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.GetWalkState()
```

</TabItem>
</Tabs>

---

### HideAirSupplyGUI

<Client/>

模块级函数，直接调用。

隐藏玩家氧气值界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideAirSupplyGUI(isHide: bool) -> bool
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideAirSupplyGUI(True)
```

</TabItem>
</Tabs>

---

### HideArmorGui

<Client/>

模块级函数，直接调用。

隐藏 hud 界面的护甲值显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideArmorGui(isHide: bool) -> bool
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideArmorGui(True)
```

</TabItem>
</Tabs>

---

### HideChangePersonGui

<Client/>

模块级函数，直接调用。

隐藏切换人称的按钮。隐藏后点击相应位置不会响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideChangePersonGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideChangePersonGui(True)
```

</TabItem>
</Tabs>

---

### HideChatGUI

<Client/>

模块级函数，直接调用。

隐藏聊天按钮原生 UI。该接口在开启新版聊天时不生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideChatGUI(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**备注**

- 该接口只对原版聊天的聊天按钮生效，如需隐藏新版聊天拓展按钮，建议使用官方聊天拓展的 [Disable](/docs/docs/scripts/modapi/interfaces/entity/partner#disable) 接口，关闭新版聊天拓展功能 如需在关闭新版聊天拓展功能后仍隐藏原版聊天的聊天按钮，需要在 [ClientLoadAddonsFinishServerEvent](/docs/docs/scripts/modapi/events/world#clientloadaddonsfinishserverevent) 后的事件调用该接口，如 [OnLocalPlayerStopLoading](/docs/docs/scripts/modapi/events/world#onlocalplayerstoploading)、[UiInitFinished](/docs/docs/scripts/modapi/events/ui#uiinitfinished) 事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideChatGUI(True)
```

</TabItem>
</Tabs>

---

### HideCrossHairGUI

<Client/>

模块级函数，直接调用。

隐藏 hud 界面的十字准心显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideCrossHairGUI(isHide: bool) -> bool
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideCrossHairGUI(True)
```

</TabItem>
</Tabs>

---

### HideEmoteGUI

<Client/>

模块级函数，直接调用。

设置是否开启表情功能，默认 PC 端关闭，手机端开启，且该接口只能在手机端使用。该接口在开启新版聊天时不生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideEmoteGUI(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideEmoteGUI(True)
```

</TabItem>
</Tabs>

---

### HideExpGui

<Client/>

模块级函数，直接调用。

非创造者模式下隐藏经验条显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideExpGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideExpGui(True)
```

</TabItem>
</Tabs>

---

### HideFoldGUI

<Client/>

模块级函数，直接调用。

隐藏下拉按钮原生 UI。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideFoldGUI(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideFoldGUI(True)
```

</TabItem>
</Tabs>

---

### HideHealthGui

<Client/>

模块级函数，直接调用。

隐藏 hud 界面的血量显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideHealthGui(isHide: bool) -> bool
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideHealthGui(True)
```

</TabItem>
</Tabs>

---

### HideHorseHealthGui

<Client/>

模块级函数，直接调用。

隐藏 hud 界面的坐骑的血量显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideHorseHealthGui(isHide: bool) -> bool
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideHorseHealthGui(True)
```

</TabItem>
</Tabs>

---

### HideHudGUI

<Client/>

模块级函数，直接调用。

隐藏 HUD 游戏界面的游戏原生 UI。与原版 F1 按钮效果一致，只隐藏显示，但点击跳跃键等位置依然会响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideHudGUI(isHide: bool) -> Any
```

- isHide: bool，True 为隐藏原生 HUD，False 为恢复显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideHudGUI(True)
```

</TabItem>
</Tabs>

---

### HideHungerGui

<Client/>

模块级函数，直接调用。

隐藏 hud 界面的饥饿值显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideHungerGui(isHide: bool) -> bool
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideHungerGui(True)
```

</TabItem>
</Tabs>

---

### HideInteractGui

<Client/>

模块级函数，直接调用。

隐藏交互按钮。隐藏后点击相应位置不会响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideInteractGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideInteractGui(True)
```

</TabItem>
</Tabs>

---

### HideJumpGui

<Client/>

模块级函数，直接调用。

隐藏游戏中右下角的跳跃按钮。隐藏后点击相应位置不会响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideJumpGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideJumpGui(True)
```

</TabItem>
</Tabs>

---

### HideMoveGui

<Client/>

模块级函数，直接调用。

隐藏游戏中左下角的移动按钮。隐藏后点击相应位置不会响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideMoveGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideMoveGui(True)
```

</TabItem>
</Tabs>

---

### HideNeteaseStoreGui

<Client/>

模块级函数，直接调用。

隐藏游戏中的网易商店按钮。隐藏后点击相应位置不会响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideNeteaseStoreGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**备注**

- 由于目前商店本身的实现，短期内无法实现纳入 UIStack 中管理的流程中。
- 如果需要额外操作商店界面，可考虑使用 [GetUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#getui) 获取 UINode 后进行后续操作.下述 UINode 的 namespace 均为"Minecraft"。

| uiKey | 解释 |
| --- | --- |
| newUIShopAsking | 余额不足界面 |
| newUIShopConfirm | 购买确认界面 |
| newUIShopFlying | 小图标飞入物品栏界面 |
| newUIShopWaiting | 购买等待界面 |
| newUIShopSingleItem | 物品购买界面 |
| newUIShopMain | 商店主界面 |
| newUIShopRecoModel1 | 推荐商品 1 |
| newUIShopRecoModel2 | 推荐商品 2 |
| newUIShopDesk | 商店入口按钮界面 |

- 该接口不支持山头服环境下使用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideNeteaseStoreGui(True)
```

</TabItem>
</Tabs>

---

### HidePauseGUI

<Client/>

模块级函数，直接调用。

隐藏暂停按钮原生 UI。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HidePauseGUI(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HidePauseGUI(True)
```

</TabItem>
</Tabs>

---

### HideSlotBarGui

<Client/>

模块级函数，直接调用。

隐藏游戏中底部中间的物品栏界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideSlotBarGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

**备注**

- 受限于 MC 主界面结构控制，不能实现在保留经验条的情况下隐藏 slotbar。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideSlotBarGui(True)
```

</TabItem>
</Tabs>

---

### HideSneakGui

<Client/>

模块级函数，直接调用。

隐藏游戏中左下角方向键的中心处潜行按钮。隐藏后点击相应位置不会响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideSneakGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideSneakGui(True)
```

</TabItem>
</Tabs>

---

### HideSwimGui

<Client/>

模块级函数，直接调用。

隐藏游戏中的浮潜按钮。隐藏后点击相应位置不会响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideSwimGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideSwimGui(True)
```

</TabItem>
</Tabs>

---

### HideVoiceGUI

<Client/>

模块级函数，直接调用。

隐藏语音按钮原生 UI。该接口在开启新版聊天时不生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideVoiceGUI(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideVoiceGUI(True)
```

</TabItem>
</Tabs>

---

### HideWalkGui

<Client/>

模块级函数，直接调用。

隐藏游戏中跑/走按钮。隐藏后点击相应位置不会响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
HideWalkGui(isHide: bool) -> Any
```

- isHide: bool，是否隐藏，True 为隐藏，False 为显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.HideWalkGui(True)
```

</TabItem>
</Tabs>

---

### OpenChatGui

<Client/>

模块级函数，直接调用。

打开原版聊天栏。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenChatGui(isForce: bool = False) -> Any
```

- isForce: bool，是否强制打开，默认 False，当已经打开 is_showing_menu 为 true 的 ui 时，无法打开。

**备注**

- 当已经打开 is_showing_menu 为 true 的 ui 时，需要设置 isForce 为 True 才能打开。
- 该接口同时会触发 [PlayerChatButtonClickClientEvent](/docs/docs/scripts/modapi/events/ui#playerchatbuttonclickclientevent) 事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
#请不要在监听PlayerChatButtonClickClientEvent事件的回调函数中执行此接口,会导致聊天界面无法关闭
clientApi.OpenChatGui()
```

</TabItem>
</Tabs>

---

### OpenEmoteGui

<Client/>

模块级函数，直接调用。

打开表情界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenEmoteGui() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenEmoteGui()
```

</TabItem>
</Tabs>

---

### OpenFoldGui

<Client/>

模块级函数，直接调用。

打开原版下拉界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenFoldGui() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenFoldGui()
```

</TabItem>
</Tabs>

---

### OpenInventoryGui

<Client/>

模块级函数，直接调用。

打开原版背包界面，并支持选中某个分页(支持自定义分页名称)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenInventoryGui(categoryName: str, isForce: bool = False) -> Any
```

- categoryName: str，分页名称([原版分页名称枚举](/docs/docs/scripts/modapi/enums#inventorytype))。
- isForce: bool，是否强制打开，默认 False，当已经打开 is_showing_menu 为 true 的 ui 时，无法打开。

**备注**

- 当已经打开 is_showing_menu 为 true 的 ui 时，需要设置 isForce 为 True 才能打开。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenInventoryGui(clientApi.GetMinecraftEnum().InventoryType.NATURE)
```

</TabItem>
</Tabs>

---

### OpenNeteaseStoreGui

<Client/>

模块级函数，直接调用。

打开游戏中的网易商店购买商品界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenNeteaseStoreGui(categoryName: str, itemName: str) -> Any
```

- categoryName: str，商品分类名称。
- itemName: str，商品名称。

**备注**

- 该接口不支持山头服环境下使用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenNeteaseStoreGui("商品", "测试商品1")
```

</TabItem>
</Tabs>

---

### OpenPauseGui

<Client/>

模块级函数，直接调用。

打开原版暂停界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenPauseGui(isForce: bool = False) -> Any
```

- isForce: bool，是否强制打开，默认 False，当已经打开 is_showing_menu 为 true 的 ui 时，无法打开。

**备注**

- 当已经打开 is_showing_menu 为 true 的 ui 时，需要设置 isForce 为 True 才能打开。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenPauseGui()
```

</TabItem>
</Tabs>

---

### OpenReportGui

<Client/>

模块级函数，直接调用。

打开原版举报界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenReportGui() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.OpenReportGui()
```

</TabItem>
</Tabs>

---

### PlayHudHeartBlinkAnim

<Client/>

模块级函数，直接调用。

播放原版受伤时血量变化的动效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayHudHeartBlinkAnim() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.PlayHudHeartBlinkAnim()
```

</TabItem>
</Tabs>

---

### SetCrossHair

<Client/>

模块级函数，直接调用。

设置是否使用“准星瞄准”。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCrossHair(visible: bool) -> Any
```

- visible: bool，十字模式下 True 为开启“准星瞄准”，False 为关闭，摇杆模式下 True 为点击互动、False 为瞄准十字线。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to hide cross hair
import mod.client.extraClientApi as clientApi
clientApi.SetCrossHair(False)
```

</TabItem>
</Tabs>

---

### SetEmoteSwitch

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

设置是否开启表情功能，默认 PC 端关闭，手机端开启，且该接口只能在手机端使用，在原生 UI 初始化前调用设置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEmoteSwitch(flag: bool) -> bool
```

- flag: bool，是否开启表情。

**返回值**：bool，设置成功返回 true，设置失败返回 false。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
res = comp.SetEmoteSwitch(False)
```

</TabItem>
</Tabs>

---

### SetHudChatStackPosition

<Client/>

模块级函数，直接调用。

设置 HUD 界面左上小聊天窗口位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetHudChatStackPosition(pos: Tuple[float, float]) -> Any
```

- pos: Tuple[float, float]，该界面的目标坐标，第一项为横轴，第二项为纵轴，(0,0)点在 Hud 界面左上角，玩家纸娃娃下方。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.SetHudChatStackPosition((100, 0))
```

</TabItem>
</Tabs>

---

### SetHudChatStackVisible

<Client/>

模块级函数，直接调用。

设置 HUD 界面左上小聊天窗口可见性。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetHudChatStackVisible(visible: bool) -> Any
```

- visible: bool，是否可见。

**备注**

- 需要在 [UiInitFinished](/docs/docs/scripts/modapi/events/ui#uiinitfinished) 事件触发后调用。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.SetHudChatStackVisible(True)
```

</TabItem>
</Tabs>

---

### SetResponse

<Client/>

模块级函数，直接调用。

设置原生 UI 是否响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetResponse(response: bool) -> Any
```

- response: bool，是否响应原生 UI，True 为响应原生 UI，即点击屏幕时可以敲击方块/攻击实体，False 为不响应原生 UI。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.SetResponse(False)
```

</TabItem>
</Tabs>

---

### SimulateJump

<Client/>

模块级函数，直接调用。

模拟跳跃。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SimulateJump() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.SimulateJump()
```

</TabItem>
</Tabs>

---
