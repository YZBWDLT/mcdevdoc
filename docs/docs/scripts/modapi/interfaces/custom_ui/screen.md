---
sidebar_position: 5
---

# UI 界面

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录UI 界面相关的接口，共 34 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/zidingyi-ui/ui-jiemian.html"/>

---

### BindVirtualWorldModel

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

绑定虚拟世界中的模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindVirtualWorldModel(
    bindToObjId: int,
    offset: Tuple[float, float, float],
) -> bool
```

- bindToObjId: int，绑定的模型对象的 id。
- offset: Tuple[float, float, float]，UI 与绑定实体的偏移量。

**返回值**：bool，是否修改成功 True:成功 False:失败。

**备注**

- 绑定的对象销毁时 UI 不会销毁，而是会隐藏起来，建议复用或者销毁。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 若是被绑定的UI需要创建多份，则需要使用此方式进行创建:
uiNode=clientApi.CreateUI("modNamespace","testUI", {
    "bindEntityId": clientApi.GetLocalPlayerId()
})
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
virtualWorldComp.VirtualWorldCreate()
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")
succ = uiNode.BindVirtualWorldModel(objId, (0.0, 0.0, 0.0))
```

</TabItem>
</Tabs>

---

### ChangeBindAutoScale

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

设置已绑定实体的 UI 是否根据绑定实体与本地玩家间的距离动态缩放，**只对已绑定实体的 UI 界面生效，如何将 UI 与实体绑定详见[CreateUI](general#createui)接口**。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeBindAutoScale(autoScale: int) -> bool
```

- autoScale: int，1:动态缩放 0:不动态缩放。

**返回值**：bool，是否设置成功 True:成功 False:失败。

**备注**

- 注意：绑定实体的 UI 缩放仅作用于根节点（比如"main"节点）下的子节点。建议在根节点下挂载一个 panel 类型的节点，然后将所有需要缩放的 UI 节点设置为百分比属性并挂载在这个 panel 节点下。

</TabItem>
<TabItem value="示例" label="示例">

```python
succ = uiNode.ChangeBindAutoScale(1)
```

</TabItem>
</Tabs>

---

### ChangeBindEntityId

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

修改绑定的实体 id，**只对已绑定实体的 UI 界面生效，如何将 UI 与实体绑定详见[CreateUI](general#createui)接口**。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeBindEntityId(entityId: str) -> bool
```

- entityId: str，绑定的实体 id。

**返回值**：bool，是否修改成功 True:成功 False:失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
succ = uiNode.ChangeBindEntityId(entityId)
```

</TabItem>
</Tabs>

---

### ChangeBindOffset

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

修改与绑定实体之间的偏移量，**只对已绑定实体的 UI 界面生效，如何将 UI 与实体绑定详见[CreateUI](general#createui)接口**。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ChangeBindOffset(offset: Tuple[float, float, float]) -> bool
```

- offset: Tuple[float, float, float]，偏移量。

**返回值**：bool，是否修改成功 True:成功 False:失败。

**备注**

- 不建议在第一人称视角下，将本地玩家绑定 UI 的偏移量设为(0, 0, 0)。

</TabItem>
<TabItem value="示例" label="示例">

```python
succ = uiNode.ChangeBindOffset((0, 3, 0))
```

</TabItem>
</Tabs>

---

### Clone

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

克隆一个已有的控件，修改它的名称，并将它挂接到指定的父节点上，目前文本、图片、按钮控件的克隆控件表现正常，其他复杂控件的克隆控件可能存在运行问题，建议在 json 编写的过程中，手动复制一份对应控件使用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Clone(
    componentPath: str,
    parentPath: str,
    newName: str,
    syncRefresh: bool = True,
    forceUpdate: bool = True,
) -> bool
```

- componentPath: str，为从 main 节点开始的控件路径。
- parentPath: str，为从 main 节点开始，父节点的控件路径。
- newName: str，为克隆成功后创建的新控件名称，新控件的路径为 parentPath/newName。
- syncRefresh: bool，是否需要同步刷新，默认值为 True。置 True 为游戏在同一帧计算该控件的 Size 等相关数据，置 False 则在下一帧进行计算。**如同一帧有大量 clone 操作建议置 False，操作结束后调用一次 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 接口刷新界面及相关控件数据**。
- forceUpdate: bool，是否需要强制刷新，默认值为 True。置 True 则按照 syncRefresh 逻辑进行同一帧或者下一帧刷新，置 False 则当前帧和下一帧均不刷新，需要手动调用 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 进行刷新。如有大量 Clone 操作且非在同一帧执行，建议设置为 False,需要更新时再调用 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 接口刷新界面及相关控件数据。

**返回值**：bool，是否克隆成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 克隆text2控件，重命名为text3并以panel为父控件
parentPath = "/panel"
text2Path = "/panel/text2"
text3Name = "text3"
uiNode.Clone(text2Path, parentPath, text3Name)
# 以panel为父控件，以text_prefab为模板克隆若干控件
parentPath = "/panel"
textPrefabPath = "/panel/text_prefab"
for i in range(0, 10):
    uiNode.Clone(textPrefabPath, parentPath, "text" + str(i), False)
uiNode.UpdateScreen(True)
# 在非同一帧，以panel为父控件，text_prefab为模板克隆若干控件
parentPath = "/panel"
textPrefabPath = "/panel/text_prefab"
def _tickClone(newName):
    uiNode.Clone(textPrefabPath, parentPath, newName , False, False)
def _tickUpdateScreen():
    uiNode.UpdateScreen(True)
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.AddTimer(100, _tickClone, "text1")
comp.AddTimer(200, _tickClone, "text2")
comp.AddTimer(300, _tickUpdateScreen)
```

</TabItem>
</Tabs>

---

### Create

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

UI 生命周期函数，当 UI 创建成功时调用。

```python
Create() -> Any
```

---

### CreateChildControl

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

在当前画布中创建子控件，如果该子控件已经存在则返回已存在的子控件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateChildControl(
    defName: str,
    childName: str,
    parentControl: Optional[BaseUIControl] = None,
    forceUpdate: bool = True,
) -> BaseUIControl
```

- defName: str，UI 控件路径，格式为"namespace.controlName"。namespace 对应 uiJson 文件中"namespace"对应的值，UI 编辑器生成的 uiJson 文件该值等于文件名。controlName 对应想创建的控件的名称。
- childName: str，所创建的子控件的名称。
- parentControl: Optional[BaseUIControl]，指定所创建的子节点的父节点，默认值为 None，表示直接创建在当前画布根节点下。
- forceUpdate: bool，是否需要强制刷新，默认值为 True。置 True 则进行同一帧或者下一帧刷新，置 False 则当前帧和下一帧均不刷新，需要手动调用 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 进行刷新。如有大量 CreateChildControl 操作且在同一帧执行，建议设置为 False,需要更新时再调用 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 接口刷新界面及相关控件数据。

**返回值**：BaseUIControl，创建的子控件节点。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 在父控件"/panel"下创建命名空间为"ui0"的自定义控件"myImage"，并取名为"myChild"
parentControl = uiNode.GetBaseUIControl("/panel")
if parentControl:
    childNode = uiNode.CreateChildControl("ui0.myImage", "myChild", parentControl, True)
    print childNode
```

</TabItem>
</Tabs>

---

### Destroy

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

UI 生命周期函数，当 UI 销毁时调用。

```python
Destroy() -> Any
```

---

### GetAllChildrenPath

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

获取所有子节点的路径 list。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAllChildrenPath(parentPath: str) -> List[str]
```

- parentPath: str，为从 main 节点开始，父节点的控件路径。

**返回值**：List[str]，返回父节点下的子节点的路径，会递归返回所有子节点，若节点无子节点，返回空 list。

</TabItem>
<TabItem value="示例" label="示例">

```python
# get panel's all children path
node.GetAllChildrenPath("/panel")
```

</TabItem>
</Tabs>

---

### GetBaseUIControl

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

根据路径获取 BaseUIControl 实例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBaseUIControl(path: str) -> BaseUIControl
```

- path: str，当前控件的路径。

**返回值**：BaseUIControl，路径对应控件的 BaseUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 根据路径获得BaseUIControl实例
text2Path = "/panel/text2"
text2UIControl = uiNode.GetBaseUIControl(text2Path)
```

</TabItem>
</Tabs>

---

### GetBindAutoScale

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

获取该绑定实体的 UI 是否动态缩放，未绑定的 UI 将传回默认值 1。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindAutoScale() -> int
```


**返回值**：int，1:动态缩放 0:不动态缩放。

</TabItem>
<TabItem value="示例" label="示例">

```python
autoScale = uiNode.GetBindAutoScale()
```

</TabItem>
</Tabs>

---

### GetBindEntityId

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

获取该 UI 绑定的实体 id，未绑定的 UI 将传回默认值 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindEntityId() -> str
```


**返回值**：str，绑定的实体 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
entityId = uiNode.GetBindEntityId()
```

</TabItem>
</Tabs>

---

### GetBindOffset

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

获取该 UI 绑定实体的偏移量，未绑定的 UI 将传回默认值(0, 0, 0)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindOffset() -> Tuple[float, float, float]
```


**返回值**：Tuple[float, float, float]，偏移量。

</TabItem>
<TabItem value="示例" label="示例">

```python
offset = uiNode.GetBindOffset()
```

</TabItem>
</Tabs>

---

### GetBindWorldPosition

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

获取该 UI 绑定的 worldPosition，未绑定返回默认值 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetBindWorldPosition() -> Tuple[int, Tuple[float, float, float]]
```


**返回值**：Tuple[int, Tuple[float, float, float]]，(维度,(地点))，无设置则为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
position = uiNode.GetBindWorldPosition()
```

</TabItem>
</Tabs>

---

### GetChildrenName

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

获取子节点的名称 list。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChildrenName(parentPath: str) -> List[str]
```

- parentPath: str，为从 main 节点开始，父节点的控件路径。

**返回值**：List[str]，返回父节点下的子节点的名称，不会递归返回所有子节点，若节点无子节点，返回空 list。

</TabItem>
<TabItem value="示例" label="示例">

```python
# get panel's children name
node.GetChildrenName("/panel")
```

</TabItem>
</Tabs>

---

### GetIsHud

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

获得本界面的输入模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetIsHud() -> int
```


**返回值**：int，返回 1 表示该界面不屏蔽游戏操作，返回 0 则屏蔽。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 我们需要获得本界面的输入模式
isHud = uiNode.GetIsHud()
```

</TabItem>
</Tabs>

---

### GetRichTextItem

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

返回一个富文本控件实例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRichTextItem(componentPath: str) -> object
```

- componentPath: str，为从 main 节点开始，继承自 rich_text.RichTextPanel 控件的路径。

**返回值**：object，RichTextItem 返回一个富文本控件实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want get a rich-text-item
richTextPath = "/RichTextPanel"
richTextItem = uiNode.GetRichTextItem(richTextPath)
```

</TabItem>
</Tabs>

---

### GetScreenName

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

获得本界面的名称。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetScreenName() -> str
```


**返回值**：str，返回本界面的名称。仅当该界面是调用 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 方法生成的时候才有返回值，返回值为注册 UI 时（调用 [RegisterUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#registerui)）所使用的参数 uiScreenDef，否则为 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 我们需要获得本界面名称
screenName = uiNode.GetScreenName()
```

</TabItem>
</Tabs>

---

### GetSelf

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

获取零件界面自身。

```python
GetSelf() -> ScreenNode
```


**返回值**：ScreenNode，零件界面自身。

---

### OnActive

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

UI 生命周期函数，当 UI 重新回到栈顶时调用。

```python
OnActive() -> Any
```


**备注**

- 不建议使用在 [OnDeactive](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#ondeactive) 函数中调用 [SetScreenVisible](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#setscreenvisible)(False)，在 OnActive 函数中调用 [SetScreenVisible](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#setscreenvisible)(True)的方式实现打开新界面时隐藏原界面，新界面关闭时自动显示原界面的功能，由于隐藏接口不会改动 UI 栈，多 Mod 容易形成冲突。推荐使用 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen)，[PopScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#popscreen) 接口实现。调用 [OpenPauseGui](/docs/docs/scripts/modapi/interfaces/native_ui#openpausegui)、[OpenChatGui](/docs/docs/scripts/modapi/interfaces/native_ui#openchatgui)、[OpenInventoryGui](/docs/docs/scripts/modapi/interfaces/native_ui#openinventorygui) 等原生 UI 函数弹出的 UI 被关闭时，不会调用此函数。

---

### OnDeactive

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

UI 生命周期函数，当栈顶 UI 有其他 UI 入栈时调用。

```python
OnDeactive() -> Any
```


**备注**

- 不建议使用在 OnDeactive 函数中调用 [SetScreenVisible](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#setscreenvisible)(False)，在 [OnActive](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#onactive) 函数中调用 [SetScreenVisible](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#setscreenvisible)(True)的方式实现打开新界面时隐藏原界面，新界面关闭时自动显示原界面的功能，由于隐藏接口不会改动 UI 栈，多 Mod 容易形成冲突。推荐使用 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen)，[PopScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#popscreen) 接口实现。调用 [OpenPauseGui](/docs/docs/scripts/modapi/interfaces/native_ui#openpausegui)、[OpenChatGui](/docs/docs/scripts/modapi/interfaces/native_ui#openchatgui)、[OpenInventoryGui](/docs/docs/scripts/modapi/interfaces/native_ui#openinventorygui) 等原生 UI 函数时不会调用此函数。

---

### RemoveChildControl

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

移除当前画布中的子控件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveChildControl(childControl: BaseUIControl) -> bool
```

- childControl: BaseUIControl，所要移除的子控件。

**返回值**：bool，True 表示移除成功，False 表示移除失败。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 移除"/panel/myChild"控件
childControl = uiNode.GetBaseUIControl("/panel/myChild")
if childControl:
    ret = uiNode.RemoveChildControl(childControl)
    print ret
```

</TabItem>
</Tabs>

---

### RemoveComponent

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

动态删除某一控件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveComponent(componentPath: str, parentPath: str) -> Any
```

- componentPath: str，为从 main 节点开始，被删除控件路径。
- parentPath: str，为从 main 节点开始，父节点的控件路径。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to remove text2
text2Path = "/panel/text2"
parentPath = "/panel"
uiNode.RemoveComponent(text2Path, parentPath)
```

</TabItem>
</Tabs>

---

### SetBindWorldPosition

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

设置 UI 绑定的 worldPosition。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetBindWorldPosition(
    dimension: int,
    position: Tuple[float, float, float],
) -> bool
```

- dimension: int，维度 id。
- position: Tuple[float, float, float]，坐标。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
uiNode.SetBindWorldPosition(0, (100,60,100))
```

</TabItem>
</Tabs>

---

### SetIsHud

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

设置本界面的输入模式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetIsHud(isHud: int) -> Any
```

- isHud: int，设置 1 表示该界面不屏蔽游戏操作，设置 0 则屏蔽。

**备注**

- [CreateUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#createui) 的 isHud 参数设置为 0 或不传时，会在比当前 UI 的层级大 1000 的地方生成，生成后再调用 SetIsHud 接口无法再修改层级！

</TabItem>
<TabItem value="示例" label="示例">

```python
# 我们需要设置本界面为HUD操作模式
uiNode.SetIsHud(1)
```

</TabItem>
</Tabs>

---

### SetRemove

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

删除本界面节点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRemove() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to remove this screen
uiNode.SetRemove()
```

</TabItem>
</Tabs>

---

### SetScreenVisible

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

设置是否显示本界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetScreenVisible(visible: bool) -> Any
```

- visible: bool，False 为隐藏该界面，True 为显示该界面。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 我们隐藏当前UI的界面
uiNode.SetScreenVisible(False)
```

</TabItem>
</Tabs>

---

### SetSelectControl

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

设置当前焦点所在的控件,当设置控件为文本输入框时会弹出系统小键盘。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSelectControl(componentPath: str, enable: bool) -> Any
```

- componentPath: str，为从 main 节点开始，所要选中控件的路径。
- enable: bool，True 为选中 componentPath 所代表的控件，False 为取消选中。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/text_edit_box0"
uiNode.SetSelectControl(path, True)
```

</TabItem>
</Tabs>

---

### SetStackGridCount

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

设置 StackGrid 控件的大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetStackGridCount(componentPath: str, count: int) -> Any
```

- componentPath: str，为从 main 节点开始，Grid 控件的路径。
- count: int，设置 StackGrid 的内容数量。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want change stackgrid count
stackgridPath = "/stack_grid1"
uiNode.SetStackGridCount(stackgridPath, 3)
```

</TabItem>
</Tabs>

---

### SetUiEntity

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

设置 PaperDoll 控件需要显示的生物模型,PaperDoll 控件的配置方式详见[控件介绍 PaperDoll](https://mc.163.com/newdev/docs/mcguide/18-jiemianyujiaohu/30-ui-shuomingwendang.html#paperdoll)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetUiEntity(componentPath: str, entityIdentifier: str) -> Any
```

- componentPath: str，为从 main 节点开始的控件路径。
- entityIdentifier: str，生物定义中设定的 identifier。

**备注**

- 暂不支持的微软原版模型：minecraft:horse（马）、minecraft:donkey（驴）、minecraft:mule（骡子）、minecraft:skeleton_horse（骷髅马）、minecraft:zombie_horse（僵尸马）、minecraft:llama（羊驼）、minecraft:tropicalfish（热带鱼）、minecraft:slime（史莱姆）、minecraft:magma_cube（岩浆怪）、minecraft:ghast（恶魂）、minecraft:shulker（潜影贝）、minecraft:ender_dragon（末影龙）、minecraft:thrown_trident（三叉戟）、minecraft:ender_crystal（末影水晶）、minecraft:boat（船）、minecraft:tnt（TNT）。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to show an entity model
imagePath = "/paper_doll0"
uiNode.SetUiEntity(imagePath, 'minecraft:cat')
```

</TabItem>
</Tabs>

---

### SetUiModel

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

设置 PaperDoll 控件需要显示的模型,PaperDoll 控件的配置方式详见[控件介绍 PaperDoll](https://mc.163.com/newdev/docs/mcguide/18-jiemianyujiaohu/30-ui-shuomingwendang.html#paperdoll)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetUiModel(
    componentPath: str,
    modelName: str,
    animateName: str = 'idle',
    looped: bool = True,
) -> bool
```

- componentPath: str，为从 main 节点开始的控件路径。
- modelName: str，骨骼模型的名称。
- animateName: str，动画名称，默认为'idle'。
- looped: bool，是否循环播放动画，默认为 True。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to change model
imagePath = "/paper_doll0"
uiNode.SetUiModel(imagePath, 'saber', 'idle', True)
```

</TabItem>
</Tabs>

---

### SetUiModelScale

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

设置 PaperDoll 控件模型的缩放比例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetUiModelScale(componentPath: str, scale: float = 1.0) -> Any
```

- componentPath: str，为从 main 节点开始，PaperDoll 控件路径。
- scale: float，PaperDoll 的缩放比例，默认为 1.0。

**备注**

- 当设置为原版生物模型时会导致偏移，建议开发者自行调整位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/paper_doll0"
uiNode.SetUiModelScale(imagePath, 1.2)
```

</TabItem>
</Tabs>

---

### Update

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

客户端每帧调用，1 秒有 30 帧。

```python
Update() -> Any
```

---

### UpdateScreen

<Client/> ScreenNode

界面方法，在自定义 ScreenNode 子类中直接调用。

刷新界面，重新计算各个控件的相关数据。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UpdateScreen(syncRefresh: bool = True) -> Any
```

- syncRefresh: bool，是否需要同步刷新，默认值为 True。置 True 为游戏在同一帧计算各个控件的相关数据，置 False 则在下一帧进行计算。若置 True 不建议在同一帧调用多次。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 当前帧刷新界面
uiNode.UpdateScreen(True)
# 下一帧刷新界面
uiNode.UpdateScreen(False)
```

</TabItem>
</Tabs>

---
