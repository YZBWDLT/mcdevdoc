---
sidebar_position: 6
---

# UI 控件

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录UI 控件相关的接口，共 161 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/zidingyi-ui/ui-kongjian.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### AddEntityMarker

<Version type="china" add="3.2"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

增加实体位置标记。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEntityMarker(
    entityId: str,
    texturePath: str,
    size: Tuple[float, float] = (4,4),
    enableRotation: bool = False,
    isRevertZRot: bool = False,
) -> bool
```

- entityId: str，实体 Id。
- texturePath: str，头顶 ICON 贴图，如 textures/blocks/border。
- size: Tuple[float, float]，贴图大小，默认为(4,4)。
- enableRotation: bool，是否启用实体朝向，默认为 False。
- isRevertZRot: bool，是否翻转实体 Z 轴旋转，默认为 False。

**返回值**：bool，是否增加成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.AddEntityMarker(entityId, "textures/ui/custom_head")
```

</TabItem>
</Tabs>

---

### AddEntityTextMarker

<Version type="china" add="3.2"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

在小地图上增加实体文本标记。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddEntityTextMarker(entityId: str, text: str, scale: float) -> bool
```

- entityId: str，实体 Id。
- text: str，文本的内容，可以支持[样式代码](https://zh.minecraft.wiki/w/%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%BB%A3%E7%A0%81)（§可以设置文字的颜色、格式等，该种用法更加灵活多变）。
- scale: float，文本缩放倍数，等于文本控件 json 中的 font_scale_factor 参数，默认缩放倍数为 1.0。

**返回值**：bool，是否增加成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.AddEntityTextMarker(entityId, "just test", 1.0)
```

</TabItem>
</Tabs>

---

### AddHoverEventParams

<Version type="china" add="2.5"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

开启按钮的悬浮回调功能，不调用该函数则按钮无悬浮回调。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddHoverEventParams() -> Any
```


**备注**

- 只有 PC 能生效，且只有 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 生成 UI 时生成的鼠标能产生悬浮回调！

</TabItem>
<TabItem value="示例" label="示例">

```python
buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddHoverEventParams()
```

</TabItem>
</Tabs>

---

### AddOption

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

添加下拉框项，若添加成功则返回 True，否则返回 False。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddOption(
    showName: str,
    icon: Optional[str] = None,
    userData: Optional[Any] = None,
) -> bool
```

- showName: str，显示文本，必填参数。
- icon: Optional[str]，贴图路径，若填写则在下拉框项前端会显示该 icon，默认为 None。
- userData: Optional[Any]，自定义数据，在选中该下拉框项时会跟随回调函数传回，默认为 None。

**返回值**：bool，是否添加成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
success = comboBoxUIControl.AddOption("测试项", "textures/ui/test_icon", {"mydata": "netease"})
```

</TabItem>
</Tabs>

---

### AddStaticMarker

<Version type="china" add="3.2"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

增加地图上静态位置的标记。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddStaticMarker(
    key: str,
    vec2: Tuple[float, float],
    texturePath: str,
    size: Tuple[float, float] = (4,4),
) -> bool
```

- key: str，标记 Id。
- vec2: Tuple[float, float]，地图位置二维坐标(x,z)。
- texturePath: str，贴图路径。
- size: Tuple[float, float]，贴图大小，默认为(4,4)。

**返回值**：bool，是否增加成功。

**备注**

- 如使用该接口请勿将地图缩小倍数设置过大（建议 [ZoomOut](/docs/docs/scripts/modapi/interfaces/custom_ui/control#zoomout) 设置后的地图倍数不小于原地图大小的 0.5 倍），以免造成地图缩小后静态标记位置失效等问题。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.AddStaticMarker("this_is_marker_key", (10,2), "textures/blocks/border", (3,3))
```

</TabItem>
</Tabs>

---

### AddStaticTextMarker

<Version type="china" add="3.2"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

在小地图上增加静态文本的标记。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddStaticTextMarker(
    key: str,
    vec2: Tuple[float, float],
    text: str,
    scale: float,
) -> bool
```

- key: str，标记 Id。
- vec2: Tuple[float, float]，地图位置二维坐标(x,z)。
- text: str，文本的内容，可以支持[样式代码](https://zh.minecraft.wiki/w/%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%BB%A3%E7%A0%81)（§可以设置文字的颜色、格式等，该种用法更加灵活多变）。
- scale: float，文本缩放倍数，等于文本控件 json 中的 font_scale_factor 参数，默认缩放倍数为 1.0。

**返回值**：bool，是否增加成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.AddStaticTextMarker("this_is_marker_key", (10,2), "just test", 1.0)
```

</TabItem>
</Tabs>

---

### AddTouchEventParams

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

开启按钮回调功能，不调用该函数则按钮无回调。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddTouchEventParams(args: Optional[Dict[str, Any]] = None) -> Any
```

- args: Optional[Dict[str, Any]]，默认为 None，详细说明请见备注。

**备注**

- AddTouchEventParams 参数 args 说明：

| 关键字 | 数据类型 | 说明 |
| --- | --- | --- |
| isSwallow | bool | 默认为 True, 按钮是否吞噬事件；或为 Ture 时，点击按钮时，点击事件不会穿透到世界。如破坏方块、镜头转向不会被响应 |

</TabItem>
<TabItem value="示例" label="示例">

```python
buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddTouchEventParams({"isSwallow":True})
```

</TabItem>
</Tabs>

---

### ClearOptions

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

清空下拉框。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClearOptions() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
comboBoxUIControl.ClearOptions()
```

</TabItem>
</Tabs>

---

### ClearSelection

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

清除当前选中，使下拉框恢复未选中内容状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ClearSelection() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
comboBoxUIControl.ClearSelection()
```

</TabItem>
</Tabs>

---

### DisableTextShadow

<Version type="china" add="2.1"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

关闭文本控件显示阴影。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
DisableTextShadow() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to diable text2 textShadow
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
ret = labelUIControl.DisableTextShadow()
```

</TabItem>
</Tabs>

---

### EnableTextShadow

<Version type="china" add="2.1"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

使文本控件显示阴影。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EnableTextShadow() -> bool
```


**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to enable text2 textShadow
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
ret = labelUIControl.EnableTextShadow()
```

</TabItem>
</Tabs>

---

### GetAnchorFrom

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

判断控件相对于父节点的哪个锚点来计算位置与大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAnchorFrom() -> str
```


**返回值**：str，控件计算位置大小所依赖的父节点锚点位置信息，具体返回值的意义可参考 [SetAnchorFrom](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setanchorfrom) 接口的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get image1 anchorFrom
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
anchorFrom = baseUIControl.GetAnchorFrom()
```

</TabItem>
</Tabs>

---

### GetAnchorTo

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取控件自身锚点位置信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetAnchorTo() -> str
```


**返回值**：str，该控件自身锚点位置信息，具体返回值的意义可参考 [SetAnchorTo](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setanchorto) 接口的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get image1 anchorTo
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
anchorTo = baseUIControl.GetAnchorTo()
```

</TabItem>
</Tabs>

---

### GetChildByName

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据子控件的名称获取 BaseUIControl 实例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChildByName(childName: str) -> BaseUIControl
```

- childName: str，子节点名称。

**返回值**：BaseUIControl，子控件的 BaseUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
# text1的BaseUIControl实例获得text2的BaseUIControl实例
text1Path = "/text1"
text1Control = uiNode.GetBaseUIControl(text1Path)
text2Control = text1Control.GetChildByName("text2")
```

</TabItem>
</Tabs>

---

### GetChildByPath

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据相对路径获取 BaseUIControl 实例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetChildByPath(childPath: str) -> BaseUIControl
```

- childPath: str，相对当前 BaseUIControl 路径的路径。

**返回值**：BaseUIControl，子控件的 BaseUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 根据路径"/text1"的BaseUIControl实例获得路径为"/text1/text2/text3"的BaseUIControl实例
text1Path = "/text1"
text1Control = uiNode.GetBaseUIControl(text1Path)
text3Control = text1Control.GetChildByPath("/text2/text3")
```

</TabItem>
</Tabs>

---

### GetClipDirection

<Version type="china" add="2.1"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取图片控件的裁剪方向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetClipDirection() -> str
```


**返回值**：str，图片控件的裁剪方向，返回值的意义可见 [SetClipDirection](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setclipdirection) 接口的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/image"
imageUIControl = uiNode.GetBaseUIControl(imagePath).asImage()
imageUIControl.GetClipDirection()
```

</TabItem>
</Tabs>

---

### GetClipOffset

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取控件的裁剪偏移信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetClipOffset() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，该控件的裁剪偏移信息，第一项为横轴，第二项为纵轴。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get image1 clipOffset
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
clipOffset = baseUIControl.GetClipOffset()
```

</TabItem>
</Tabs>

---

### GetClipsChildren

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据控件路径返回某控件是否开启裁剪内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetClipsChildren() -> bool
```


**返回值**：bool，该控件是否已开启裁剪内容。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to know whether image1 enables clipsChildren
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
clipsChildrenEnabled = baseUIControl.GetClipsChildren()
```

</TabItem>
</Tabs>

---

### GetCurrentSliceIndex

<Version type="china" add="2.7"/>

<Client/> SelectionWheelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取轮盘当前选择的切片的 index，一般是在 [SetHoverCallback](/docs/docs/scripts/modapi/interfaces/custom_ui/control#sethovercallback) 和 [SetTouchUpCallback](/docs/docs/scripts/modapi/interfaces/custom_ui/control#settouchupcallback) 中使用，表示当前鼠标悬浮或者点击的轮盘切片 index。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCurrentSliceIndex() -> int
```


**返回值**：int，轮盘当前选择的切片的 index，-1 表示轮盘当前没有选择任何切片。

</TabItem>
<TabItem value="示例" label="示例">

```python
selectionWheelPath = "/selectionWheel"
selectionWheelControl = uiNode.GetBaseUIControl(selectionWheelPath).asSelectionWheel()
selectionWheelControl.GetCurrentSliceIndex()
```

</TabItem>
</Tabs>

---

### GetEditText

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> TextEditBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取 edit_box 输入框的文本信息，获取失败会返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetEditText() -> str
```


**返回值**：str，文本信息。

**备注**

- 获取失败通常是由于路径填写错误，或该控件不是 edit_box 类型。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get edit2 content
editBoxPath = "/panel/edit2"
textEditBoxUIControl = uiNode.GetBaseUIControl(editBoxPath).asTextEditBox()
text = textEditBoxUIControl.GetEditText()
```

</TabItem>
</Tabs>

---

### GetFullPosition

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取控件的锚点坐标，支持比例值以及绝对值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFullPosition(axis: str) -> Dict[str, Any]
```

- axis: str，要获取的轴向，可选的值有["x","y"]，"x"表示获取控件的 x 坐标，"y"表示获取控件的 y 坐标。

**返回值**：Dict[str, Any]，控件的大小信息，详见备注。

**备注**

- 参见 [SetFullPosition](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setfullposition) 接口，控件的大小信息描述可由 absoluteValue，followType，relativeValue 三个属性描述 因此返回值的结构如下：

| 键值 | 类型 |
| --- | --- |
| "absoluteValue" | float |
| "followType" | str |
| "relativeValue" | float |

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
# 获取image1的锚点x坐标
ret = baseUIControl.GetFullPosition(axis="x")
```

</TabItem>
</Tabs>

---

### GetFullSize

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取控件的大小，支持百分比以及绝对值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetFullSize(axis: str) -> Dict[str, Any]
```

- axis: str，要获取的轴向，可选的值有["x","y"]，"x"表示获取控件的宽度，"y"表示获取控件的高度。

**返回值**：Dict[str, Any]，控件的大小信息，详见备注。

**备注**

- 参见 [SetFullSize](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setfullsize) 接口，控件的大小信息描述可由 absoluteValue，followType，relativeValue，fit 四个属性描述 因此返回值的结构如下：

| 键值 | 类型 |
| --- | --- |
| "absoluteValue" | float |
| "followType" | str |
| "relativeValue" | float |
| "fit" | bool |

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
# 获取image1的宽度信息
ret = baseUIControl.GetFullSize(axis="x")
```

</TabItem>
</Tabs>

---

### GetGlobalPosition

<Version type="china" add="2.8"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取控件全局坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetGlobalPosition() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，该控件全局坐标信息，第一项为横轴，第二项为纵轴。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get text2 global position
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
textPosition = baseUIControl.GetGlobalPosition()
```

</TabItem>
</Tabs>

---

### GetGlobalRotateAngle

<Version type="china" add="2.8"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取图片通过 [RotateAround](/docs/docs/scripts/modapi/interfaces/custom_ui/control#rotatearound) 函数设置进去的角度值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetGlobalRotateAngle() -> float
```


**返回值**：float，获取图片通过 [RotateAround](/docs/docs/scripts/modapi/interfaces/custom_ui/control#rotatearound) 函数设置进去的角度值。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/imagePath"
imageControl = uiNode.GetBaseUIControl(imagePath).asImage()
print imageControl.GetGlobalRotateAngle()
```

</TabItem>
</Tabs>

---

### GetGlobalRotatePoint

<Version type="china" add="2.8"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取图片通过 [RotateAround](/docs/docs/scripts/modapi/interfaces/custom_ui/control#rotatearound) 函数设置进去的 point 值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetGlobalRotatePoint() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，获取图片通过 [RotateAround](/docs/docs/scripts/modapi/interfaces/custom_ui/control#rotatearound) 函数设置进去的 point 值。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/imagePath"
imageControl = uiNode.GetBaseUIControl(imagePath).asImage()
print imageControl.GetGlobalRotatePoint()
```

</TabItem>
</Tabs>

---

### GetGridItem

<Version type="china" add="2.6"/>

<Client/> GridUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据网格位置获取元素控件。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetGridItem(x: int, y: int) -> BaseUIControl
```

- x: int，元素在网格的横坐标。
- y: int，元素在网格的纵坐标。

**返回值**：BaseUIControl，网格的子节点控件。

**备注**

- 获取网格子节点需要注意一些细节，详见《开发指南-界面与交互-UI 说明文档》中对 Grid 控件的描述。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get element positioned at (0, 0)
gridPath = "/grid1"
gridUIControl = uiNode.GetBaseUIControl(gridPath).asGrid()
gridItem_0 = gridUIControl.GetGridItem(0, 0)
if gridItem_0:
    print gridItem_0.GetSize()
```

</TabItem>
</Tabs>

---

### GetIsModal

<Version type="china" add="2.1"/>

<Client/> InputPanelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

判断当前面板是否为模态框。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetIsModal() -> bool
```


**返回值**：bool，当前面板是否为模态框。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to know whether inputPanel1 isModal
inputPanelPath = "/inputPanel1"
inputPanel = uiNode.GetBaseUIControl(inputPanelPath).asInputPanel()
inputPanel.GetIsModal()
```

</TabItem>
</Tabs>

---

### GetIsSwallow

<Version type="china" add="2.7"/>

<Client/> InputPanelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

判断当前面板输入是否会吞噬事件，isSwallow 为 Ture 时，点击时，点击事件不会穿透到世界。如破坏方块、镜头转向不会被响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetIsSwallow() -> bool
```


**返回值**：bool，当前当前面板输入是否会吞噬事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to know whether inputPanel1 isSwallow
inputPanelPath = "/inputPanel1"
inputPanel = uiNode.GetBaseUIControl(inputPanelPath).asInputPanel()
inputPanel.GetIsSwallow()
```

</TabItem>
</Tabs>

---

### GetMaxSize

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取控件所允许的最大的大小值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMaxSize() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，该控件所允许的最大的大小值，第一项为横轴，第二项为纵轴。

**备注**

- 返回值为(0, 0)表示无限制。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get image1 maxSize
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
imageMaxSize = baseUIControl.GetMaxSize()
```

</TabItem>
</Tabs>

---

### GetMinSize

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取控件所允许的最小的大小值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMinSize() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，该控件所允许的最小的大小值，第一项为横轴，第二项为纵轴。

**备注**

- 返回值为(0, 0)表示无限制。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get image1 minSize
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
imageMinSize = baseUIControl.GetMinSize()
```

</TabItem>
</Tabs>

---

### GetModelId

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> NeteasePaperDollUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取渲染的骨骼模型 Id。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetModelId() -> int
```


**返回值**：int，骨骼模型 Id，失败或者不存在返回-1。

**备注**

- 注意：请不要在 [RenderEntity](/docs/docs/scripts/modapi/interfaces/custom_ui/control#renderentity)/[RenderSkeletonModel](/docs/docs/scripts/modapi/interfaces/custom_ui/control#renderskeletonmodel) 调用之后立即执行。骨骼模型 Id 可用于一下情形：1.绑定一个另外的骨骼模型；2.绑定序列帧动画；3.绑定特效粒子动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
path = '/demoPanel/paper_doll'
doll = uiNode.GetBaseUIControl(path).asNeteasePaperDoll()
modelId = doll.GetModelId()
if modelId == -1:
    return
#用途1：绑定一个另外的骨骼模型
modelComp = clientApi.GetEngineCompFactory().CreateModel(modelId)
newModelId = modelComp.BindModelToModel("rightHand", "gun") # 把名称为gun的骨骼模型挂接到rightHand骨骼上
#用途2：绑定序列帧动画
sfxId = clientSystem.CreateEngineSfxFromEditor("effects/example_sfx.json") # 创建特效
comp = clientApi.GetEngineCompFactory().CreateFrameAniSkeletonBind(sfxId)
comp.Bind(modelId, "root", (0, 1, 0), (0, 0, 0)) # 把特效绑定到骨骼模型的骨骼节点上
frameComp = clientApi.GetEngineCompFactory().CreateFrameAniControl(sfxId)
frameComp.Play() # 播放动画
clientSystem.DestroyEntity(sfxId) # 销毁动画
#用途3：绑定特效粒子动画
particleEntityId = clientSystem.CreateEngineParticle("effects/example_particle.json", (0,0,0)) # 创建特效
comp = clientApi.GetEngineCompFactory().CreateParticleSkeletonBind(particleEntityId)
comp.Bind(modelId, "root", (0, 1, 0), (0, 0, 0)) # 把特效绑定到骨骼模型的骨骼节点上
particleComp = clientApi.GetEngineCompFactory().CreateParticleControl(particleEntityId)
particleComp.Play() # 播放动画
clientSystem.DestroyEntity(particleEntityId) # 销毁动画
```

</TabItem>
</Tabs>

---

### GetOffsetDelta

<Version type="china" add="2.2"/>

<Client/> InputPanelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获得点击面板的拖拽偏移量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOffsetDelta() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，该控件的拖拽偏移量，第一项为横轴，第二项为纵轴。

**备注**

- 点击面板拖拽功能及拖拽偏移量相关，详见 InputPanel。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get inputPanel1's offset_delta
inputPanelPath = "/inputPanel1"
inputPanel = uiNode.GetBaseUIControl(inputPanelPath).asInputPanel()
offset_delta = inputPanel.GetOffsetDelta()
```

</TabItem>
</Tabs>

---

### GetOptionCount

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获得选项数量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOptionCount() -> int
```


**返回值**：int，当前下拉框选项数量。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
totalNum = comboBoxUIControl.GetOptionCount()
```

</TabItem>
</Tabs>

---

### GetOptionIndexByShowName

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据展示文本查找对应下拉框项的索引位置，若找不到返回-1。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOptionIndexByShowName(name: str) -> int
```

- name: str，显示文本。

**返回值**：int，索引位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
index = comboBoxUIControl.GetOptionIndexByShowName("测试项")
```

</TabItem>
</Tabs>

---

### GetOptionShowNameByIndex

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据索引位置查找当前栈式文本，若找不到返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOptionShowNameByIndex(index: int) -> str
```

- index: int，索引位置。

**返回值**：str，显示文本。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
text = comboBoxUIControl.GetOptionShowNameByIndex(0)
```

</TabItem>
</Tabs>

---

### GetOrientation

<Version type="china" add="2.1"/>

<Client/> StackPanelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取 stackPanel 的排列方向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetOrientation() -> str
```


**返回值**：str，stackPanel 的排列方向，取值有限为["vertical", "horizontal"]，分别表示垂直方向，水平方向。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get stackPanel1 orientation
stackPanelPath = "/stackPanel1"
stackPanel = uiNode.GetBaseUIControl(stackPanelPath).asStackPanel()
stackPanel.GetOrientation()
```

</TabItem>
</Tabs>

---

### GetPath

<Version type="china" add="2.9"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

返回当前控件的相对路径，路径从画布节点开始算起。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPath() -> str
```


**返回值**：str，当前控件的相对路径，路径从画布节点开始算起。

</TabItem>
<TabItem value="示例" label="示例">

```python
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
path = baseUIControl.GetPath()
```

</TabItem>
</Tabs>

---

### GetPosition

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取控件相对父节点的坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPosition() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，该控件相对父节点的坐标信息，第一项为横轴，第二项为纵轴。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get text2 position
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
textPosition = baseUIControl.GetPosition()
```

</TabItem>
</Tabs>

---

### GetPropertyBag

<Version type="china" add="3.4"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取 PropertyBag。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPropertyBag() -> str
```


**返回值**：str，PropertyBag。

</TabItem>
<TabItem value="示例" label="示例">

```python
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
propertyBag = baseUIControl.GetPropertyBag()
```

</TabItem>
</Tabs>

---

### GetRotateAngle

<Version type="china" add="2.8"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取图片相对自身的旋转锚点旋转的角度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRotateAngle() -> float
```


**返回值**：float，获取图片相对自身的旋转锚点旋转的角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/imagePath"
imageControl = uiNode.GetBaseUIControl(imagePath).asImage()
print imageControl.GetRotateAngle()
```

</TabItem>
</Tabs>

---

### GetRotatePivot

<Version type="china" add="2.8"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取图片相对自身的旋转锚点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRotatePivot() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，获取图片相对自身的旋转锚点，第一项为横轴，第二项为纵轴。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/imagePath"
imageControl = uiNode.GetBaseUIControl(imagePath).asImage()
print imageControl.GetRotatePivot()
```

</TabItem>
</Tabs>

---

### GetRotateRect

<Version type="china" add="2.8"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取图片当前的四个边角点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetRotateRect(

) -> Tuple[Tuple[float, float], Tuple[float, float], Tuple[float, float], Tuple[float, float]]
```


**返回值**：Tuple[Tuple[float, float], Tuple[float, float], Tuple[float, float], Tuple[float, float]]，获取图片当前的四个边角点(每个点都是一个 tuple)。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/imagePath"
imageControl = uiNode.GetBaseUIControl(imagePath).asImage()
print imageControl.GetRotateRect()
```

</TabItem>
</Tabs>

---

### GetScrollViewContentControl

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ScrollViewUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

返回该 scroll_view 内容的 BaseUIControl 实例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetScrollViewContentControl() -> BaseUIControl
```


**返回值**：BaseUIControl，该 scroll_view 内容的 BaseUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want get scroll_view content
scrollViewPath = "/scroll_view0"
scrollViewUIControl = uiNode.GetBaseUIControl(scrollViewPath).asScrollView()
contentUIControl = scrollViewUIControl.GetScrollViewContentControl()
```

</TabItem>
</Tabs>

---

### GetScrollViewContentPath

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ScrollViewUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

返回该 scroll_view 内容的路径。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetScrollViewContentPath() -> str
```


**返回值**：str，该 scroll_view 内容的路径。

**备注**

- scroll_view 的路径是动态的，在触控模式和键鼠模式（按 f11 可切换的两种操作方式）下的路径不同，每次使用 scroll_view 及其子控件的路径，都应该重新调用一次本接口。
- 如果不想让路径随操作模式变化，可以指定$touch 变量为 true，此时路径将固定为 touch_path。"scroll_view0@common.scrolling_panel": \{ // 手动指定$touch 变量为 true "$touch": true ... \}。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want get scroll_view content path
scrollViewPath = "/scroll_view0"
scrollViewUIControl = uiNode.GetBaseUIControl(scrollViewPath).asScrollView()
path = scrollViewUIControl.GetScrollViewContentPath()
```

</TabItem>
</Tabs>

---

### GetScrollViewPercentValue

<Version type="china" add="2.6"/>

<Client/> ScrollViewUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取当前 scroll_view 内容的百分比位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetScrollViewPercentValue() -> int
```


**返回值**：int，当前 scroll_view 内容的百分比位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want get scroll_view percent
scrollViewPath = "/scroll_view0"
scrollViewUIControl = uiNode.GetBaseUIControl(scrollViewPath).asScrollView()
scrollViewUIControl.GetScrollViewPercentValue()
```

</TabItem>
</Tabs>

---

### GetScrollViewPos

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ScrollViewUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获得当前 scroll_view 最上方内容的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetScrollViewPos() -> float
```


**返回值**：float，当前 scroll_view 最上方内容的位置。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want get scroll_view pos
scrollViewPath = "/scroll_view0"
scrollViewUIControl = uiNode.GetBaseUIControl(scrollViewPath).asScrollView()
scrollViewUIControl.GetScrollViewPos()
```

</TabItem>
</Tabs>

---

### GetSelectOptionIndex

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获得当前选中项的索引，所无选中项则返回-1。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSelectOptionIndex() -> int
```


**返回值**：int，当前下拉框选中项索引。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
currentIndex = comboBoxUIControl.GetSelectOptionIndex()
```

</TabItem>
</Tabs>

---

### GetSelectOptionShowName

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获得当前选中项的展示文本，所无选中项则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSelectOptionShowName() -> str
```


**返回值**：str，当前选中项的展示文本。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
currentText = comboBoxUIControl.GetSelectOptionShowName()
```

</TabItem>
</Tabs>

---

### GetSize

<Version type="china" add="2.7"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取控件的大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSize() -> Tuple[float, float]
```


**返回值**：Tuple[float, float]，该控件的大小信息，第一项为横轴，第二项为纵轴。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get text2 size
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
text2Size = baseUIControl.GetSize()
```

</TabItem>
</Tabs>

---

### GetSliceCount

<Version type="china" add="2.7"/>

<Client/> SelectionWheelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取轮盘可以选择的总切片数量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSliceCount() -> int
```


**返回值**：int，轮盘可以选择的总切片数量。

</TabItem>
<TabItem value="示例" label="示例">

```python
selectionWheelPath = "/selectionWheel"
selectionWheelControl = uiNode.GetBaseUIControl(selectionWheelPath).asSelectionWheel()
selectionWheelControl.GetSliceCount()
```

</TabItem>
</Tabs>

---

### GetSliderValue

<Version type="china" add="1.23"/>

<Client/> SliderUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取滑动条的值，失败返回 0。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSliderValue() -> float
```


**返回值**：float，滑动条的值。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get slider value
sliderPath = "/panel/slider0"
sliderUIControl = uiNode.GetBaseUIControl(sliderPath).asSlider()
value = sliderUIControl.GetSliderValue()
```

</TabItem>
</Tabs>

---

### GetText

<Version type="china" add="3.5"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取 Label 的文本信息，获取失败会返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetText() -> str
```


**返回值**：str，文本信息。

**备注**

- 获取失败通常是由于路径填写错误，或该控件不是 Label 类型。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get text2 content
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
labelUIControl.GetText()
```

</TabItem>
</Tabs>

---

### GetTextAlignment

<Version type="china" add="2.1"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取文本控件的文本对齐方式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTextAlignment() -> str
```


**返回值**：str，文本控件的文本对齐方式，具体返回值的意义可参考 [SetTextAlignment](/docs/docs/scripts/modapi/interfaces/custom_ui/control#settextalignment) 接口的备注。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get text2 textAlignment
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
labelUIControl.GetTextAlignment()
```

</TabItem>
</Tabs>

---

### GetTextColor

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取 Label 文本颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTextColor() -> Tuple[float, float, float, float]
```


**返回值**：Tuple[float, float, float, float]，获取文本的颜色信息(r, g, b, a), 取值[0, 1]。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get text2 color
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
labelUIControl.GetTextColor()
```

</TabItem>
</Tabs>

---

### GetTextLinePadding

<Version type="china" add="2.1"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取文本控件的行间距。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTextLinePadding() -> float
```


**返回值**：float，文本控件的行间距，单位为像素。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to get text2 textLinePadding
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
labelUIControl.GetTextLinePadding()
```

</TabItem>
</Tabs>

---

### GetToggleState

<Version type="china" add="2.6"/>

<Client/> SwitchToggleUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取 Toggle 开关控件的状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetToggleState(toggle_path: str = "/this_toggle") -> bool
```

- toggle_path: str，实际 toggle 控件相对路径，由 UI 编辑器生成的开关控件该参数即为默认值"/this_toggle"。

**返回值**：bool，是否处于开启状态 True:开启状态 False:关闭状态。

</TabItem>
<TabItem value="示例" label="示例">

```python
togglePath = "/toggle1"
switchToggleUIControl = uiNode.GetBaseUIControl(togglePath).asSwitchToggle()
print switchToggleUIControl.GetToggleState()
```

</TabItem>
</Tabs>

---

### GetUiItem

<Version type="china" add="2.11"/>

<Client/> ItemRendererUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

获取 ItemRenderer 控件显示的物品，ItemRenderer 控件的配置方式详见[控件介绍 ItemRenderer](https://mc.163.com/newdev/docs/mcguide/18-jiemianyujiaohu/30-ui-shuomingwendang.html#itemrenderer)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUiItem() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，物品字典，详见备注（包含 itemName:物品 identifier, auxValue:物品附加值, isEnchanted:是否附魔)。

**备注**

- 返回值具体如下：

| 键值 | 类型 | 内容 |
| --- | --- | --- |
| "itemName" | str | 物品 identifier |
| "auxValue" | int | 物品附加值 |
| "isEnchanted" | bool | 是否显示附魔效果 |

</TabItem>
<TabItem value="示例" label="示例">

```python
#获取木板block信息
itemRenderPath = "/panel/item_renderer"
itemRendererBaseControl = uiNode.GetBaseUIControl(itemRenderPath)
itemRendererControl = itemRendererBaseControl.asItemRenderer()
itemInfoDict = itemRendererControl.GetUiItem()
```

</TabItem>
</Tabs>

---

### GetVisible

<Version type="china" add="3.5"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据控件路径返回某控件是否已显示。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetVisible() -> bool
```


**返回值**：bool，该控件是否已显示。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 我们获得panel下面的text2是否显示
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
textVisible = baseUIControl.GetVisible()
```

</TabItem>
</Tabs>

---

### IsAnimEndCallbackRegistered

<Version type="china" add="2.8"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

控件是否对名称为 animName 的动画进行了注册回调。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsAnimEndCallbackRegistered(animName: str) -> bool
```

- animName: str，动画的名称，请不要包含动画的命名空间。

**返回值**：bool，是否对名称为 animName 的动画进行了注册回调。

**备注**

- UI 属性动画相关，详见属性动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 获取控件
control = uiNode.GetBaseUIControl("/image")
print control.IsAnimEndCallbackRegistered("offset_animation")
```

</TabItem>
</Tabs>

---

### IsTextShadowEnabled

<Version type="china" add="2.1"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

判断文本控件是否显示阴影。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
IsTextShadowEnabled() -> bool
```


**返回值**：bool，文本控件是否显示阴影。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to know whether text2 has shadow
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
labelUIControl.IsTextShadowEnabled()
```

</TabItem>
</Tabs>

---

### PauseAnimation

<Version type="china" add="2.8"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

暂停动画，暂停后的动画会停在当前的状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PauseAnimation(propertyName: str = "all") -> bool
```

- propertyName: str，动画的属性名称，默认值为"all"，表示暂停所有动画，不为"all"的时候表示单个动画的暂停，比如 propertyName=="size"时，表示暂停尺寸属性上的动画。

**返回值**：bool，是否暂停成功。

**备注**

- UI 属性动画相关，详见属性动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 获取控件
control = uiNode.GetBaseUIControl("/image")
# 暂停所有动画
control.PauseAnimation()
# 暂停尺寸动画
# control.PauseAnimation("size")
# 暂停位移动画
# control.PauseAnimation("offset")
# 其他属性也是支持暂停的，具体可参见备注
```

</TabItem>
</Tabs>

---

### PlayAnimation

<Version type="china" add="2.8"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

继续播放动画，从动画当前状态开始播放。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PlayAnimation(propertyName: str = "all") -> bool
```

- propertyName: str，动画的属性名称，默认值为"all"，表示播放所有动画，不为"all"的时候表示单个动画的播放，比如 propertyName=="size"时，表示播放尺寸属性上的动画。

**返回值**：bool，是否播放成功。

**备注**

- UI 属性动画相关，详见属性动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 获取控件
control = uiNode.GetBaseUIControl("/image")
# 播放所有动画
control.PlayAnimation()
# 播放尺寸动画
# control.PlayAnimation("size")
# 播放位移动画
# control.PlayAnimation("offset")
# 其他属性也是支持播放的，具体可参见备注
```

</TabItem>
</Tabs>

---

### RegisterCloseComboBoxCallback

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

注册关闭下拉框事件回调。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterCloseComboBoxCallback(callback: Callable) -> Any
```

- callback: Callable，回调函数，必须是 UI 的类函数。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 注册关闭下拉框事件回调，在点击关闭下拉框时会调用注册的回调函数
def onCloseComboBoxCallback(args):
    pass

comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
comboBoxUIControl.RegisterCloseComboBoxCallback(onCloseComboBoxCallback)
```

</TabItem>
</Tabs>

---

### RegisterOpenComboBoxCallback

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

注册展开下拉框事件回调。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterOpenComboBoxCallback(callback: Callable) -> Any
```

- callback: Callable，回调函数，必须是 UI 的类函数。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 注册展开下拉框事件回调，在点击展开下拉框时会调用注册的回调函数
def onOpenComboBoxCallback(args):
    pass

comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
comboBoxUIControl.RegisterOpenComboBoxCallback(onOpenComboBoxCallback)
```

</TabItem>
</Tabs>

---

### RegisterSelectItemCallback

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

注册选中下拉框内容事件回调。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterSelectItemCallback(callback: Callable) -> Any
```

- callback: Callable，回调函数，必须是 UI 的类函数。

**备注**

- onSelectItemCallback 参数说明：

| 参数 | 类型 | 解释 |
| --- | --- | --- |
| index | int | 当前选中项的索引 |
| showName | str | 当前选中项的显示文本 |
| userData | Unknown | 当前选中项的自定义数据，若添加下拉框项时未传入自定义数据则此处为 None |

</TabItem>
<TabItem value="示例" label="示例">

```python
# 注册选中下拉框内容事件回调，在点击关闭下拉框时会调用注册的回调函数
def onSelectItemCallback(index, showName, userData):
    pass

comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
comboBoxUIControl.RegisterSelectItemCallback(onSelectItemCallback)
```

</TabItem>
</Tabs>

---

### RemoveAnimEndCallback

<Version type="china" add="2.8"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

移除动画播放结束后的回调。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveAnimEndCallback(animName: str) -> bool
```

- animName: str，动画的名称，请不要包含动画的命名空间。

**返回值**：bool，是否移除成功。

**备注**

- UI 属性动画相关，详见属性动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 获取控件
control = uiNode.GetBaseUIControl("/image")
# 移除属性动画offset_animation播放结束后的回调
control.RemoveAnimEndCallback("offset_animation")
```

</TabItem>
</Tabs>

---

### RemoveAnimation

<Version type="china" add="2.8"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

删除单一属性的动画，删除后的值与当前状态有关，建议删除后重新设置该属性值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveAnimation(propertyName: str) -> bool
```

- propertyName: str，要删除动画的属性名称，无默认值，值必须为单一属性（不能填"all"）。

**返回值**：bool，是否删除成功。

**备注**

- UI 属性动画相关，详见属性动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 获取控件
control = uiNode.GetBaseUIControl("/image")
# 删除 位移 属性上的动画
control.RemoveAnimation("offset")
```

</TabItem>
</Tabs>

---

### RemoveEntityMarker

<Version type="china" add="3.2"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

删除实体位置标记。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveEntityMarker(entityId: str) -> bool
```

- entityId: str，实体 Id。

**返回值**：bool，是否删除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.RemoveEntityMarker(entityId)
```

</TabItem>
</Tabs>

---

### RemoveEntityTextMarker

<Version type="china" add="3.2"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

在小地图上删除实体文本标记。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveEntityTextMarker(entityId: str) -> bool
```

- entityId: str，实体 Id。

**返回值**：bool，是否删除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.RemoveEntityTextMarker(entityId)
```

</TabItem>
</Tabs>

---

### RemoveOptionByIndex

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据提供的索引移除对应下拉框项，移除成功则返回 True，否则返回 False。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveOptionByIndex(index: int) -> bool
```

- index: int，索引。

**返回值**：bool，是否移除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
success = comboBoxUIControl.RemoveOptionByIndex(0)
```

</TabItem>
</Tabs>

---

### RemoveOptionByShowName

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据提供的展示文本移除对应下拉框项，移除成功则返回 True，否则返回 False。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveOptionByShowName(showName: str) -> bool
```

- showName: str，展示文本。

**返回值**：bool，是否移除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
success = comboBoxUIControl.RemoveOptionByShowName("测试项")
```

</TabItem>
</Tabs>

---

### RemoveStaticMarker

<Version type="china" add="3.2"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

删除静态位置标记。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveStaticMarker(key: str) -> bool
```

- key: str，标记的 Id。

**返回值**：bool，是否删除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.RemoveStaticMarker(entityId)
```

</TabItem>
</Tabs>

---

### RemoveStaticTextMarker

<Version type="china" add="3.2"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

在小地图上删除静态文本标记。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemoveStaticTextMarker(key: str) -> bool
```

- key: str，标记 Id。

**返回值**：bool，是否删除成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.RemoveStaticTextMarker("this_is_marker_key")
```

</TabItem>
</Tabs>

---

### RenderBlockGeometryModel

<Version type="china" add="2.4"/>

<Client/> NeteasePaperDollUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

渲染网格体模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RenderBlockGeometryModel(params: Dict[str, Any]) -> bool
```

- params: Dict[str, Any]，渲染参数，详细说明请见备注。

**返回值**：bool，是否成功。

**备注**

- 网格体模型使用 [CombineBlockPaletteToGeometry](/docs/docs/scripts/modapi/interfaces/block/geometry#combineblockpalettetogeometry) 生成。
- 每次进入游戏需要重新调用本接口渲染网格体模型，可使用 [SerializeBlockPalette](/docs/docs/scripts/modapi/interfaces/block/palette#serializeblockpalette) 和 [DeserializeBlockPalette](/docs/docs/scripts/modapi/interfaces/block/palette#deserializeblockpalette) 实现调色板保存并重载调色板，重新生成网格体模型进行渲染。
- RenderBlockGeometryModel 参数 params 说明：params 参数解释如下：

| 参数 | 类型 | 解释 |
| --- | --- | --- |
| block_geometry_model_name | str | 网格体模型名称, 可用 CombineBlockPaletteToGeometry 返回值 |
| scale | float | 渲染缩放比例，默认为 1.0 |
| init_rot_y | float | 初始 Y 方向的朝向 |
| init_rot_x | float | 初始 x 方向的朝向 |
| init_rot_z | float | 初始 z 方向的朝向 |
| molang_dict | dict | molang 表达式字典，其中 key 为 str，value 为 float |
| rotation_axis | tuple | 选择旋转环绕的轴，如(0,1,0)依次代表 x、y、z 轴，此为绕 y 轴旋转，该属性只在 netease_paper_doll_renderer 控件的 rotation 属性为“freedom_gesture”时起效 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
path = '/demoPanel/paper_doll'
param = {
    "block_geometry_model_name": "my_geometry_model",
    "scale": 0.5,
    "init_rot_y": 60,
    "rotation_axis":(0,1,1),
    "molang_dict": {"variable.liedownamount": 1}
}
doll = uiNode.GetBaseUIControl(path).asNeteasePaperDoll()
doll.RenderBlockGeometryModel(param)
```

</TabItem>
</Tabs>

---

### RenderEntity

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> NeteasePaperDollUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

渲染实体。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RenderEntity(params: Dict[str, Any]) -> bool
```

- params: Dict[str, Any]，渲染参数，详细说明请见备注。

**返回值**：bool，是否成功。

**备注**

- RenderEntity 参数 params 说明：params 参数解释如下：

| 参数 | 类型 | 解释 |
| --- | --- | --- |
| entity_id | str | 渲染生物的实体 Id，与实体的 identifier 二者选其一即可。如果与 entity_identifier 同时定义，则优先使用 entity_id。 |
| entity_identifier | str | 渲染生物的 identifier，与实体 Id 二者选其一即可。如果与 entity_id 同时定义，则优先使用 entity_id。 |
| scale | float | 渲染缩放比例，默认为 1.0 |
| render_depth | int | 渲染深度，对于玩家默认-50，普通生物-15，该参数可解决 UI 遮挡剔除问题 |
| init_rot_y | float | 初始 Y 方向的朝向 |
| init_rot_x | float | 初始 x 方向的朝向 |
| init_rot_z | float | 初始 z 方向的朝向 |
| molang_dict | dict | molang 表达式字典，其中 key 为 str，value 为 float |
| rotation_axis | tuple | 选择旋转环绕的轴，如(0,1,0)依次代表 x、y、z 轴，此为绕 y 轴旋转，该属性只在 netease_paper_doll_renderer 控件的 rotation 属性为“freedom_gesture”时起效 |

</TabItem>
<TabItem value="示例" label="示例">

```python
path = '/demoPanel/paper_doll'
# 使用entity_id进行渲染
param = {
    "entity_id": "-8589934591",
    "scale": 0.5,
    "render_depth": -50,
    "init_rot_y": 60,
    "rotation_axis":(0,1,1),
    "molang_dict": {"variable.liedownamount": 1}
}
doll = uiNode.GetBaseUIControl(path).asNeteasePaperDoll()
doll.RenderEntity(param)
# 使用identifier进行渲染
param = {
    "entity_identifier": "minecraft:cow",
    "scale": 0.5,
    "render_depth": -50,
    "init_rot_y": 60,
    "rotation_axis":(0,1,1),
    "molang_dict": {"variable.liedownamount": 1}
}
doll = uiNode.GetBaseUIControl(path).asNeteasePaperDoll()
doll.RenderEntity(param)
```

</TabItem>
</Tabs>

---

### RenderSkeletonModel

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> NeteasePaperDollUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

渲染骨骼模型（不依赖实体）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RenderSkeletonModel(params: Dict[str, Any]) -> bool
```

- params: Dict[str, Any]，渲染参数，详细说明请见备注。

**返回值**：bool，是否成功。

**备注**

- RenderSkeletonModel 参数 params 说明：params 参数解释如下：

| 参数 | 类型 | 解释 |
| --- | --- | --- |
| skeleton_model_name | str | 骨骼模型名称 |
| animation | str | 骨骼动作名称，默认为 idle |
| animation_looped | bool | 骨骼动作是否循环播放，默认 True |
| scale | float | 渲染缩放比例，默认为 1.0 |
| render_depth | int | 渲染深度，对于玩家默认-50，普通生物-15，该参数可解决 UI 遮挡剔除问题 |
| init_rot_y | float | 初始 Y 方向的朝向 |
| init_rot_x | float | 初始 x 方向的朝向 |
| init_rot_z | float | 初始 z 方向的朝向 |
| molang_dict | dict | molang 表达式字典，其中 key 为 str，value 为 float |
| rotation_axis | tuple | 选择旋转环绕的轴，如(0,1,0)依次代表 x、y、z 轴，此为绕 y 轴旋转，该属性只在 netease_paper_doll_renderer 控件的 rotation 属性为“freedom_gesture”时起效 |
| light_direction | tuple | 可选参数。控制骨骼模型在纸娃娃中显示时的光照方向，x 控制光照的左右方向，y 控制光照的上下方向，z 控制光照的前后方向，取值为-1,0,1。不填写该参数时模型默认从底部打光。该属性仅对没有自定义材质的骨骼模型生效。如果该骨骼模型定义了自定义材质，则无效。如需要对使用自定义材质的骨骼模型控制其光照方向，可以参考官方骨骼模型 vertex shader 中 getLightColor 使用到 HIDE_COLOR 的这部分代码。该参数对部分安卓低端设备，极低端设备无效。 |

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
path = '/demoPanel/paper_doll'
param = {
    "skeleton_model_name": "ty_yuanshenghuli_0_0",
    "animation": "idle_stand",
    "scale": 0.5,
    "render_depth": -50,
    "init_rot_y": 60,
    "rotation_axis":(0,1,1),
    "molang_dict": {"variable.liedownamount": 1},
    # 控制光照方向为从模型的正右边往左边打光，以及从模型的正前方往后打光
    "light_direction": ( 1.0, 0.0, 1.0 )
}
doll = uiNode.GetBaseUIControl(path).asNeteasePaperDoll()
doll.RenderSkeletonModel(param)
```

</TabItem>
</Tabs>

---

### RepaintMiniMap

<Version type="china" add="3.2"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

重新绘制小地图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RepaintMiniMap() -> Any
```

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.RepaintMiniMap()
```

</TabItem>
</Tabs>

---

### Rotate

<Version type="china" add="2.8"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

图片相对自身的旋转锚点进行旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Rotate(angle: float) -> Any
```

- angle: float，旋转角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/imagePath"
imageControl = uiNode.GetBaseUIControl(imagePath).asImage()
imageControl.Rotate(30)
```

</TabItem>
</Tabs>

---

### RotateAround

<Version type="china" add="2.8"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

图片相对全局坐标系中某个固定的点进行旋转。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RotateAround(point: Tuple[float, float], angle: float) -> Any
```

- point: Tuple[float, float]，全局坐标点。
- angle: float，旋转角度。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/imagePath"
imageControl = uiNode.GetBaseUIControl(imagePath).asImage()
imageControl.RotateAround((50, 50), 30)
```

</TabItem>
</Tabs>

---

### SetAlpha

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置节点的透明度，仅对 image 和 label 控件生效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAlpha(alpha: float) -> Any
```

- alpha: float，透明度，取值 0-1 之间，0 表示完全透明，1 表示完全不透明。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 设置text2的透明度为半透明
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
baseUIControl.SetAlpha(0.5)
```

</TabItem>
</Tabs>

---

### SetAnchorFrom

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件相对于父节点的锚点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnchorFrom(anchorFrom: str) -> bool
```

- anchorFrom: str，相对于父节点的锚点，可选的值详见备注。

**返回值**：bool，设置是否成功。

**备注**

- anchorFrom 可选的值。

| 值 | 解释 |
| --- | --- |
| "top_left" | 相对于父节点的左上角 |
| "top_middle" | 相对于父节点的上边中间 |
| "top_right" | 相对于父节点的右上角 |
| "left_middle" | 相对于父节点的左边中间 |
| "center" | 相对于父节点的中间 |
| "right_middle" | 相对于父节点的右边中间 |
| "bottom_left" | 相对于父节点的底部左边 |
| "bottom_middle" | 相对于父节点的部中间 |
| "bottom_right" | 相对于父节点的底部右边 |

</TabItem>
<TabItem value="示例" label="示例">

```python
# 设置image1控件相对于父节点的左上角
imagePath = "/panel/image1"
anchorFrom = "top_left"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
ret = baseUIControl.SetAnchorFrom(anchorFrom)
```

</TabItem>
</Tabs>

---

### SetAnchorTo

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件自身锚点位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnchorTo(anchorTo: str) -> bool
```

- anchorTo: str，控件自身锚点位置，可选的值详见备注。

**返回值**：bool，设置是否成功。

**备注**

- anchorTo 可选的值。

| 值 | 解释 |
| --- | --- |
| "top_left" | 自身锚点位于左上角 |
| "top_middle" | 自身锚点位于上边中间 |
| "top_right" | 自身锚点位于右上角 |
| "left_middle" | 自身锚点位于左边中间 |
| "center" | 自身锚点位于中间 |
| "right_middle" | 自身锚点位于右边中间 |
| "bottom_left" | 自身锚点位于底部左边 |
| "bottom_middle" | 自身锚点位于底部中间 |
| "bottom_right" | 自身锚点位于底部右边 |

</TabItem>
<TabItem value="示例" label="示例">

```python
# 设置image1控件锚点到自身中间
imagePath = "/panel/image1"
anchorTo = "center"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
ret = baseUIControl.SetAnchorTo(anchorTo)
```

</TabItem>
</Tabs>

---

### SetAnimEndCallback

<Version type="china" add="2.8"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置动画播放结束后的回调，每次设置都会覆盖上一次的设置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnimEndCallback(animName: str, func: Callable) -> bool
```

- animName: str，动画的名称，请不要包含动画的命名空间。
- func: Callable，回调，无参数无返回值的函数。

**返回值**：bool，是否设置成功。

**备注**

- UI 属性动画相关，详见属性动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 获取控件
control = uiNode.GetBaseUIControl("/image")

def callback():
    print "offset_animation end"

# 设置属性动画offset_animation播放结束后的回调
control.SetAnimEndCallback("offset_animation", callback)
```

</TabItem>
</Tabs>

---

### SetAnimation

<Version type="china" add="2.8"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

给单一属性设置动画，已有重复的会设置失败，需要先 remove。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetAnimation(
    propertyName: str,
    namespace: str,
    animName: str,
    autoPlay: bool = False,
) -> bool
```

- propertyName: str，要设置的动画的属性名称，无默认值，值必须为单一属性（不能填"all"）。
- namespace: str，动画的命名空间，类似于自定义控件，动画也是可以定义到某个命名空间的，详见备注。
- animName: str，动画的名称，详见备注。
- autoPlay: bool，动画添加后是否自动播放，默认值为 False，表示不进行播放。

**返回值**：bool，是否添加成功。

**备注**

- UI 属性动画相关，详见属性动画。
- 需要注意，设置动画本质上是拷贝动画数据到控件的动画组件里面，所以如果动画数据发生了改变（比如通过接口 [RegisterUIAnimations](/docs/docs/scripts/modapi/interfaces/custom_ui/general#registeruianimations) 修改了动画数据），如果想要控件应用修改需要再次调用 setAnimation 进行更新。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 获取控件
control = uiNode.GetBaseUIControl("/image")

# 如果动画不在json中定义，也可以通过接口进行动态注册
data = {
    "namespace": "CustomAnimations",
    "alpha_animation_1": {
        "anim_type": "alpha",
        "duration": 1.5,
        "from": 0,
        "to": 1,
        "next": "@namespace.alpha_animation_2"
    },
    "alpha_animation_2": {
        "anim_type": "alpha",
        "duration": 1.5,
        "from": 1,
        "to": 0,
        "next": "@namespace.alpha_animation_1"
    }
}
import mod.client.extraClientApi as clientApi
clientApi.RegisterUIAnimations(data, True)

# 给 alpha属性 添加 透明度动画
control.SetAnimation("alpha", "CustomAnimations", "alpha_animation_1")
```

</TabItem>
</Tabs>

---

### SetButtonHoverInCallback

<Version type="china" add="2.5"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置鼠标进入按钮时触发的悬浮回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetButtonHoverInCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数。

**备注**

- 将鼠标移入添加了悬浮回调的控件中会触发该事件，该鼠标指 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 生成 UI 后显示的鼠标，F11 生成的鼠标无法生效。
- OnButtonHoverInCallback 接收到的参数：

| 参数 | 类型 | 解释 |
| --- | --- | --- |
| isHoverIn | int | 鼠标是否为进入悬浮回调，1 为移入，0 为移出 |
| PrevButtonDownID | str | 上一个被点击 Down 的按钮的 ID，如果没有取值为"-1" |
| TouchPosX | float | 鼠标进入按钮时屏幕上的 UI 坐标 X 值 |
| TouchPosY | float | 鼠标进入按钮时屏幕上的 UI 坐标 Y 值 |
| ButtonPath | str | 鼠标进入的按钮的 ComponentPath |
| AddHoverEventParams | dict | 在调用 AddHoverEventParams 接口时传入的参数字典 |

</TabItem>
<TabItem value="示例" label="示例">

```python
def onButtonHoveInCallback(args):
    pass

buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddHoverEventParams()
buttonUIControl.SetButtonHoverInCallback(onButtonHoveInCallback)
```

</TabItem>
</Tabs>

---

### SetButtonHoverOutCallback

<Version type="china" add="2.5"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置鼠标退出按钮时触发的悬浮回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetButtonHoverOutCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数。

**备注**

- 将鼠标移出添加了悬浮回调的控件中会触发该事件，该鼠标指 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 生成 UI 后显示的鼠标，F11 生成的鼠标无法生效。
- OnButtonHoverInCallback 接收到的参数：

| 参数 | 类型 | 解释 |
| --- | --- | --- |
| isHoverIn | int | 鼠标是否为进入悬浮回调，1 为移入，0 为移出 |
| PrevButtonDownID | str | 上一个被点击 Down 的按钮的 ID，如果没有取值为"-1" |
| ButtonPath | str | 鼠标退出的按钮的 ComponentPath |
| AddHoverEventParams | dict | 在调用 AddHoverEventParams 接口时传入的参数字典 |

</TabItem>
<TabItem value="示例" label="示例">

```python
def OnButtonHoverOutCallback(args):
    pass

buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddHoverEventParams()
buttonUIControl.SetButtonHoverOutCallback(OnButtonHoverOutCallback)
```

</TabItem>
</Tabs>

---

### SetButtonScreenExitCallback

<Version type="china" add="2.2"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置按钮所在画布退出时若鼠标仍未抬起时触发回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetButtonScreenExitCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数。

**备注**

- 其他相关说明见 [SetButtonTouchDownCallback](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setbuttontouchdowncallback) 接口：

</TabItem>
<TabItem value="示例" label="示例">

```python
def onButtonScreenExitCallback(args):
    pass

buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddTouchEventParams({"isSwallow":True})
buttonUIControl.SetButtonScreenExitCallback(onButtonScreenExitCallback)
```

</TabItem>
</Tabs>

---

### SetButtonTouchCancelCallback

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置触控在按钮范围外弹起时触发的回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetButtonTouchCancelCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数。

**备注**

- 其他相关说明见 [SetButtonTouchDownCallback](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setbuttontouchdowncallback) 接口：

</TabItem>
<TabItem value="示例" label="示例">

```python
def onButtonTouchCancelCallback(args):
    pass

buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddTouchEventParams({"isSwallow":True})
buttonUIControl.SetButtonTouchCancelCallback(onButtonTouchCancelCallback)
```

</TabItem>
</Tabs>

---

### SetButtonTouchDownCallback

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置按钮按下时触发的回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetButtonTouchDownCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数。

**备注**

- onButtonTouchDownCallback 参数 args 说明：

| 参数 | 类型 | 解释 |
| --- | --- | --- |
| #collection_name | str | 按钮所属的集合名称 |
| #collection_index | int | 按钮在集合所属的集合序号 |
| ButtonState | int | 按钮的状态：Up 为 0，Down 为 1，默认是-1，建议使用 New |
| TouchEvent | int | 按钮的状态新版本：Up 为 0，Down 为 1，Cancel 为 3，Move 为 4，默认是-1 |
| PrevButtonDownID | str | 上一个被点击 Down 的按钮的 ID，如果没有取值为"-1" |
| TouchPosX | float | 按钮被点击时屏幕上的 UI 坐标 X 值 |
| TouchPosY | float | 按钮被点击时屏幕上的 UI 坐标 Y 值 |
| ButtonPath | str | 被点击的按钮的 ComponentPath |
| AddTouchEventParams | dict | 在调用 AddTouchEventParams 接口时传入的参数字典 |

- 事件之间的关系如下图所示：

</TabItem>
<TabItem value="示例" label="示例">

```python
def onButtonTouchDownCallback(args):
    pass

buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddTouchEventParams({"isSwallow":True})
buttonUIControl.SetButtonTouchDownCallback(onButtonTouchDownCallback)
```

</TabItem>
</Tabs>

---

### SetButtonTouchMoveCallback

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置按下后触控移动时触发的回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetButtonTouchMoveCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数。

**备注**

- 其他相关说明见 [SetButtonTouchDownCallback](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setbuttontouchdowncallback) 接口：
- 该事件只在触屏模式下触发。

</TabItem>
<TabItem value="示例" label="示例">

```python
def onButtonTouchMoveCallback(args):
    pass

buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddTouchEventParams({"isSwallow":True})
buttonUIControl.SetButtonTouchMoveCallback(onButtonTouchMoveCallback)
```

</TabItem>
</Tabs>

---

### SetButtonTouchMoveInCallback

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置按下按钮后进入控件时触发的回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetButtonTouchMoveInCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数。

**备注**

- 其他相关说明见 [SetButtonTouchDownCallback](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setbuttontouchdowncallback) 接口：
- 键鼠模式下，鼠标移入会触发该事件。触屏模式下，鼠标按下按钮会触发该事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
def onButtonTouchMoveInCallback(args):
    pass

buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddTouchEventParams({"isSwallow":True})
buttonUIControl.SetButtonTouchMoveInCallback(onButtonTouchMoveInCallback)
```

</TabItem>
</Tabs>

---

### SetButtonTouchMoveOutCallback

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置按下按钮后退出控件时触发的回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetButtonTouchMoveOutCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数。

**备注**

- 其他相关说明见 [SetButtonTouchDownCallback](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setbuttontouchdowncallback) 接口：
- 键鼠模式下，鼠标移出会触发该事件。触屏模式下，鼠标松开按钮会触发该事件。

</TabItem>
<TabItem value="示例" label="示例">

```python
def onButtonTouchMoveOutCallback(args):
    pass

buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddTouchEventParams({"isSwallow":True})
buttonUIControl.SetButtonTouchMoveOutCallback(onButtonTouchMoveOutCallback)
```

</TabItem>
</Tabs>

---

### SetButtonTouchUpCallback

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ButtonUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置触控在按钮范围内弹起时的回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetButtonTouchUpCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数。

**备注**

- 其他相关说明见 [SetButtonTouchDownCallback](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setbuttontouchdowncallback) 接口：

</TabItem>
<TabItem value="示例" label="示例">

```python
def onButtonTouchUpCallback(args):
    pass

buttonPath = "/panel/test_btn"
buttonUIControl = uiNode.GetBaseUIControl("/panel/test_btn").asButton()
buttonUIControl.AddTouchEventParams({"isSwallow":True})
buttonUIControl.SetButtonTouchUpCallback(onButtonTouchUpCallback)
```

</TabItem>
</Tabs>

---

### SetClipDirection

<Version type="china" add="2.1"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置图片控件的裁剪方向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetClipDirection(clipDirection: str) -> bool
```

- clipDirection: str，图片控件的裁剪方向，可选的值详见备注。

**返回值**：bool，设置是否成功。

**备注**

- clipDirection 可选的值。

| 值 | 解释 |
| --- | --- |
| "fromLeftToRight" | 从左到右 |
| "fromRightToLeft" | 从右到左 |
| "fromOutsideToInside" | 从外到内 |
| "fromTopToBottom" | 从上到下 |
| "fromBottomToTop" | 从下到上 |

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/image"
imageUIControl = uiNode.GetBaseUIControl(imagePath).asImage()
clipDirection = "fromOutsideToInside"
ret = imageUIControl.SetClipDirection(clipDirection)
```

</TabItem>
</Tabs>

---

### SetClipOffset

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件的裁剪偏移信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetClipOffset(clipOffset: Tuple[float, float]) -> bool
```

- clipOffset: Tuple[float, float]，该控件的裁剪偏移信息，第一项为横轴，第二项为纵轴。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set image1 maxSize
imagePath = "/panel/image1"
clipOffset = (20, 20)
baseUIControl = uiNode.GetBaseUIControl(imagePath)
ret = baseUIControl.SetClipOffset(clipOffset)
```

</TabItem>
</Tabs>

---

### SetClipsChildren

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件是否开启裁剪内容。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetClipsChildren(clipsChildren: bool) -> bool
```

- clipsChildren: bool，True 表示开启，False 表示关闭。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to enable image1 clipsChildren
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
ret = baseUIControl.SetClipsChildren(True)
```

</TabItem>
</Tabs>

---

### SetCurrentSliceIndex

<Version type="china" add="2.7"/>

<Client/> SelectionWheelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置轮盘选择的切片。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetCurrentSliceIndex(index: int) -> Any
```

- index: int，轮盘选择的切片的 index，取值范围为 [-1, [GetSliceCount](/docs/docs/scripts/modapi/interfaces/custom_ui/control#getslicecount)() - 1]，-1 表示轮盘无选择。

</TabItem>
<TabItem value="示例" label="示例">

```python
selectionWheelPath = "/selectionWheel"
selectionWheelControl = uiNode.GetBaseUIControl(selectionWheelPath).asSelectionWheel()
selectionWheelControl.SetCurrentSliceIndex(-1)
```

</TabItem>
</Tabs>

---

### SetEditText

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> TextEditBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置 edit_box 输入框的文本信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEditText(text: str) -> Any
```

- text: str，文本的内容。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to clear edit2 content
editBoxPath = "/panel/edit2"
text = ""
textEditBoxUIControl = uiNode.GetBaseUIControl(editBoxPath).asTextEditBox()
textEditBoxUIControl.SetEditText(text)
```

</TabItem>
</Tabs>

---

### SetEditTextMaxLength

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> TextEditBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置输入框的最大输入长度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEditTextMaxLength(maxLength: int) -> Any
```

- maxLength: int，输入框可输入的最大长度，取值[0, +∞)。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set text_edit_box max input length 10
editTextPath = "/panel2/text_edit_box"
textEditBoxUIControl = uiNode.GetBaseUIControl(editBoxPath).asTextEditBox()
textEditBoxUIControl.SetEditTextMaxLength(10)
```

</TabItem>
</Tabs>

---

### SetFullPosition

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件的锚点坐标（全局坐标），支持比例值以及绝对值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFullPosition(axis: str, paramDict: Dict[str, Any]) -> bool
```

- axis: str，设置的轴向，可选的值有["x","y"]，"x"表示设置控件锚点的 x 坐标，"y"表示设置控件锚点的 y 坐标。
- paramDict: Dict[str, Any]，设置的参数，具体见备注。

**返回值**：bool，设置是否成功。

**备注**

- paramDict 的键值。

| 参数名 | 参数类型 | 解释 |
| --- | --- | --- |
| "followType" | str | 跟随类型，默认值为"none"，可以不写该键值 |
| "relativeValue" | float | 相对于跟随控件的比例值，默认值为 0，可以不写该键值 |
| "absoluteValue" | float | 设置的绝对值，默认值为 0，可以不写该键值 |

- 控件的大小支持复杂的计算来实现自适应布局，形式为“absoluteValue + relativeValue * 跟随值”。其中跟随值由跟随的控件以及当前设置的属性共同决定。比如当前设置的是控件的 x 坐标，并且跟随控件为父控件，而跟随值为父控件的宽度。而跟随的控件是特定的，是与控件本身有一定关系的，比如控件的父控件，子控件等，可以通过设置 followType 的值来指定。
- followType 可选的值。

| 值 | 解释 |
| --- | --- |
| "none" | 无跟随，实际计算的时候只考虑 absoluteValue |
| "parent" | 跟随控件为父控件 |
| "maxChildren" | 跟随控件为最大子控件（设置 x 则为最大宽度，设置 y 则为最大高度），relativeValue 无论如何设置都为 1.0 |
| "maxSibling" | 跟随控件为最大兄弟控件（设置 x 则为最大宽度，设置 y 则为最大高度），relativeValue 无论如何设置都为 1.0 |
| "children" | 跟随值等于所有子节点之和（如果是 x 则计算的是子节点的宽度之和，如果是 y 则计算的是子节点的高度之和） |
| "x" | 跟随值等于控件本身的宽度，该值仅当 axis == "y" 才生效 |
| "y" | 跟随值等于控件本身的高度，该值仅当 axis == "x" 才生效 |

- 设置跟随类型的时候请务必小心，不要造成依赖循环，比如父控件 x 坐标依赖子控件的宽度，而子控件的宽度又依赖于父控件这类情况，这样即使设置成功，结果也是未知的。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
# 设置image1的位置在父控件的中间
ret = baseUIControl.SetFullPosition(axis="x", paramDict={"followType":"parent", "relativeValue":0.5})
ret = baseUIControl.SetFullPosition(axis="y", paramDict={"followType":"parent", "relativeValue":0.5})
```

</TabItem>
</Tabs>

---

### SetFullSize

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件的大小，支持比例形式以及绝对值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetFullSize(axis: str, paramDict: Dict[str, Any]) -> bool
```

- axis: str，设置的轴向，可选的值有["x","y"]，"x"表示设置控件的宽度，"y"表示设置控件的高度。
- paramDict: Dict[str, Any]，设置的参数，具体见备注。

**返回值**：bool，设置是否成功。

**备注**

- paramDict 的键值。

| 参数名 | 参数类型 | 解释 |
| --- | --- | --- |
| "fit" | bool | 是否自适应父控件，默认值为 False，可以不写该键值 |
| "followType" | str | 跟随类型，默认值为"none"，可以不写该键值 |
| "relativeValue" | float | 相对于跟随控件的比例值，默认值为 0，可以不写该键值 |
| "absoluteValue" | float | 设置的绝对值，默认值为 0，可以不写该键值 |

- 控件的大小支持复杂的计算来实现自适应布局，形式为“absoluteValue + relativeValue * 跟随值”。其中跟随值由跟随的控件以及当前设置的属性共同决定。比如当前设置的是控件的宽度，并且跟随控件为父控件，则跟随值为父控件的宽度。而跟随的控件是特定的，是与控件本身有一定关系的，比如控件的父控件，子控件等，可以通过设置 followType 的值来指定。
- followType 可选的值。

| 值 | 解释 |
| --- | --- |
| "none" | 无跟随，实际计算的时候只考虑 absoluteValue |
| "parent" | 跟随控件为父控件 |
| "maxChildren" | 跟随控件为最大子控件（设置宽度则为最大宽度，设置高度则为最大高度），relativeValue 无论如何设置都为 1.0 |
| "maxSibling" | 跟随控件为最大兄弟控件（设置宽度则为最大宽度，设置高度则为最大高度），relativeValue 无论如何设置都为 1.0 |
| "children" | 跟随值等于所有子节点之和 |
| "x" | 跟随值等于控件本身的宽度，该值仅当 axis == "y" 才生效 |
| "y" | 跟随值等于控件本身的高度，该值仅当 axis == "x" 才生效 |

- fit 参数用来指定是否自适应父控件，如果是自适应父控件，则 absoluteValue，followType，relativeValue 参数均会失效，控件的值直接取自父控件的值。
- 设置跟随类型的时候请务必小心，不要造成依赖循环，比如父控件宽度依赖子控件的宽度，而子控件的宽度又依赖于父控件这类情况，这样即使设置成功，结果也是未知的。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/panel/image1"
baseUIControl = uiNode.GetBaseUIControl(imagePath)
# 设置image1的宽度为父节点的一半，
ret = baseUIControl.SetFullSize(axis="x", paramDict={"followType":"parent", "relativeValue":0.5})
# 设置image1的高度为所有子节点的高度的2倍并且多20像素
ret = baseUIControl.SetFullSize(axis="y", paramDict={"absoluteValue":20, "followType":"children", "relativeValue":2})
# 设置image1的宽，高为父亲节点的宽，高
ret = baseUIControl.SetFullSize(axis="x", {"fit":True})
ret = baseUIControl.SetFullSize(axis="y", {"fit":True})
```

</TabItem>
</Tabs>

---

### SetGridDimension

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> GridUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置 Grid 控件的大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetGridDimension(dimension: Tuple[int, int]) -> Any
```

- dimension: Tuple[int, int]，设置网格的横向与纵向大小。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want change grid dimension
gridPath = "/grid1"
gridUIControl = uiNode.GetBaseUIControl(gridPath).asGrid()
gridUIControl.SetGridDimension((2, 2))
```

</TabItem>
</Tabs>

---

### SetHighestY

<Version type="china" add="1.22"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置绘制地图的最大高度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetHighestY(highestY: int) -> bool
```

- highestY: int，绘制高度值。

**返回值**：bool，是否成功。

**备注**

- 动态调整高度值后，已经绘制过的区块不会刷新为新的高度值，只有没有绘制过的区块会以新的高度值来绘制。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.SetHighestY(255)
```

</TabItem>
</Tabs>

---

### SetHoverCallback

<Version type="china" add="2.7"/>

<Client/> SelectionWheelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置轮盘选择切片触发回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetHoverCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数，并且无参数。

</TabItem>
<TabItem value="示例" label="示例">

```python
def onSelectionWheelHover():
    pass

selectionWheelPath = "/selectionWheel"
selectionWheelControl = uiNode.GetBaseUIControl(selectionWheelPath).asSelectionWheel()
selectionWheelControl.SetHoverCallback(onSelectionWheelHover)
```

</TabItem>
</Tabs>

---

### SetImageAdaptionType

<Version type="china" add="2.1"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置图片控件的图片适配方式以及信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetImageAdaptionType(
    imageAdaptionType: str,
    imageAdaptionData: Tuple[float, float, float, float],
) -> bool
```

- imageAdaptionType: str，图片控件的图片适配方式，可选的值详见备注。
- imageAdaptionData: Tuple[float, float, float, float]，如果图片不是九宫适配方式，无需传该值，否则需要设置，tuple 的每个值分别代表九宫格切割的四个参数：左，右，上，下。

**返回值**：bool，设置是否成功。

**备注**

- imageAdaptionType 可选的值如下。

| 值 | 解释 |
| --- | --- |
| "normal" | 普通适配，不开启九宫并保持宽高比 |
| "filled" | 填充适配，不开启九宫并保持宽高比 |
| "oldNineSlice" | 旧版九宫格适配 |
| "originNineSlice" | 原版九宫格适配 |

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/image"
imageUIControl = uiNode.GetBaseUIControl(imagePath).asImage()
# 普通适配
ret = imageUIControl.SetImageAdaptionType("normal")
# 原版九公格适配，并设置边距
ret = imageUIControl.SetImageAdaptionType("originNineSlice", (0, 0, 0, 0))
```

</TabItem>
</Tabs>

---

### SetIsModal

<Version type="china" add="2.1"/>

<Client/> InputPanelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置当前面板是否为模态框。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetIsModal(isModal: bool) -> bool
```

- isModal: bool，当前面板是否为模态框。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set inputPanel1 isModal
inputPanelPath = "/inputPanel1"
inputPanel = uiNode.GetBaseUIControl(inputPanelPath).asInputPanel()
ret = inputPanel.SetIsModal(True)
```

</TabItem>
</Tabs>

---

### SetIsSwallow

<Version type="china" add="2.7"/>

<Client/> InputPanelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置当前面板输入是否会吞噬事件，isSwallow 为 Ture 时，点击时，点击事件不会穿透到世界。如破坏方块、镜头转向不会被响应。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetIsSwallow(isSwallow: bool) -> bool
```

- isSwallow: bool，设置当前面板输入是否会吞噬事件。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set inputPanel1 isSwallow
inputPanelPath = "/inputPanel1"
inputPanel = uiNode.GetBaseUIControl(inputPanelPath).asInputPanel()
ret = inputPanel.SetIsSwallow(True)
```

</TabItem>
</Tabs>

---

### SetLayer

<Version type="china" add="1.22"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件节点的层级，可以通过传入空字符串（""）的方式来调整整个 JSON 的基础层级。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetLayer(layer: int, syncRefresh: bool = True, forceUpdate: bool = True) -> Any
```

- layer: int，设置层级。
- syncRefresh: bool，是否需要同步刷新，默认值为 True。置 True 为游戏在同一帧根据该控件的层级进行相关计算，置 False 则在下一帧进行计算。如同一帧有大量 SetLayer 操作建议置 False，操作结束后调用一次 ScreenNode.[UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 接口刷新界面及相关控件数据。
- forceUpdate: bool，是否需要强制刷新，默认值为 True。置 True 则按照 syncRefresh 逻辑进行同步或者下一帧刷新，置 False 则当前帧和下一帧均不刷新，需要手动调用 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 进行刷新。如有大量 SetLayer 操作且非在同一帧执行，建议设置为 False,需要更新时再调用 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 接口刷新界面及相关控件数据。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 设置text2的控件的层级
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
baseUIControl.SetLayer(2)
# 同一帧设置若干控件的层级
text1Path = "/panel/text1"
uiNode.GetBaseUIControl(text1Path).SetLayer(1,False)
text2Path = "/panel/text2"
uiNode.GetBaseUIControl(text2Path).SetLayer(2,False)
text3Path = "/panel/text3"
uiNode.GetBaseUIControl(text3Path).SetLayer(3,False)
# 不同帧设置若干控件的层级
def _setLyerText1(path, layer):
    uiNode.GetBaseUIControl(text1Path).SetLayer(1,False,False)
def _updateScreen():
    uiNode.UpdateScreen(True)
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.AddTimer(100, _setLyerText1, "/panel/text1", 1)
comp.AddTimer(200, _setLyerText1, "/panel/text2", 2)
comp.AddTimer(300, _setLyerText1, "/panel/text3", 3)
comp.AddTimer(300, _updateScreen)
```

</TabItem>
</Tabs>

---

### SetMaxSize

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件所允许的最大的大小值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMaxSize(maxSize: Tuple[float, float]) -> bool
```

- maxSize: Tuple[float, float]，该控件所允许的最大的大小值，第一项为横轴，第二项为纵轴。

**返回值**：bool，设置是否成功。

**备注**

- maxSize = (0, 0)表示无限制。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set image1 maxSize
imagePath = "/panel/image1"
imageMaxSize = (10, 10)
baseUIControl = uiNode.GetBaseUIControl(imagePath)
ret = baseUIControl.SetMaxSize(imageMaxSize)
```

</TabItem>
</Tabs>

---

### SetMinSize

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件所允许的最小的大小值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetMinSize(minSize: Tuple[float, float]) -> bool
```

- minSize: Tuple[float, float]，该控件所允许的大小值，第一项为横轴，第二项为纵轴。

**返回值**：bool，设置是否成功。

**备注**

- minSize = (0, 0)表示无限制。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set image1 minSize
imagePath = "/panel/image1"
imageMinSize = (10, 10)
baseUIControl = uiNode.GetBaseUIControl(imagePath)
ret = baseUIControl.SetMinSize(imageMinSize)
```

</TabItem>
</Tabs>

---

### SetOffsetDelta

<Version type="china" add="2.2"/>

<Client/> InputPanelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置点击面板的拖拽偏移量。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetOffsetDelta(offset_delta: Tuple[float, float]) -> bool
```

- offset_delta: Tuple[float, float]，该控件的拖拽偏移量，第一项为横轴，第二项为纵轴。

**返回值**：bool，是否设置成功。

**备注**

- 点击面板拖拽功能及拖拽偏移量相关，详见 InputPanel。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set inputPanel's offset_delta
inputPanelPath = "/inputPanel1"
inputPanel = uiNode.GetBaseUIControl(inputPanelPath).asInputPanel()
success = inputPanel.SetOffsetDelta((100, 100))
```

</TabItem>
</Tabs>

---

### SetOrientation

<Version type="china" add="2.1"/>

<Client/> StackPanelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置 stackPanel 的排列方向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetOrientation(orientation: str) -> bool
```

- orientation: str，stackPanel 的排列方向，取值有限为["vertical", "horizontal"]，分别表示垂直方向，水平方向。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set stackPanel1 orientation
stackPanelPath = "/stackPanel1"
stackPanel = uiNode.GetBaseUIControl(stackPanelPath).asStackPanel()
orientation = "vertical"
stackPanel.SetOrientation(orientation)
```

</TabItem>
</Tabs>

---

### SetPosition

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件相对父节点的坐标。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPosition(pos: Tuple[float, float]) -> Any
```

- pos: Tuple[float, float]，该控件相对父节点的坐标信息，第一项为横轴，第二项为纵轴。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set text2 position
text2Path = "/panel/text2"
pos = (10, 10)
baseUIControl = uiNode.GetBaseUIControl(text2Path)
baseUIControl.SetPosition(pos)
```

</TabItem>
</Tabs>

---

### SetPropertyBag

<Version type="china" add="3.4"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置 PropertyBag,将使用字典中的每个值来覆盖原本 PropertyBag 中的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetPropertyBag(params: Dict[str, Any]) -> bool
```

- params: Dict[str, Any]，需要设置的属性字典，字典键值对的值仅支持设置字符串、数字、布尔值类型，其余类型会导致设置失败。

**返回值**：bool，是否设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
params = {"text": "hello world", "number": 123, "boolean": True}
success = baseUIControl.SetPropertyBag(params)
```

</TabItem>
</Tabs>

---

### SetRotatePivot

<Version type="china" add="2.8"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置图片自身旋转锚点，该点并不是固定的点，而是相对于自身位置的点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetRotatePivot(pivot: Tuple[float, float]) -> Any
```

- pivot: Tuple[float, float]，相对于自身位置的锚点，第一项为横轴 x，第二项为纵轴 y，锚点实际坐标=图片的 position + anchor * (width, height)。

**备注**

- 自身的旋转锚点是一个相对坐标，它是根据图片当前所在位置和大小进行计算的，所以一旦设置后，就会每帧都进行位置的计算。如果不调用该函数，默认状态下图片的旋转锚点是 (0.5, 0.5)。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/imagePath"
imageControl = uiNode.GetBaseUIControl(imagePath).asImage()
# 设置旋转锚点为图片的左上角
imageControl.SetRotatePivot((0, 0))
# 设置旋转锚点为图片的右上角
imageControl.SetRotatePivot((1, 0))
# 设置旋转锚点为图片的右下角
imageControl.SetRotatePivot((1, 1))
# 设置旋转锚点为图片的左下角
imageControl.SetRotatePivot((0, 1))
```

</TabItem>
</Tabs>

---

### SetScrollViewPercentValue

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ScrollViewUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置当前 scroll_view 内容的百分比位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetScrollViewPercentValue(percent_value: int) -> Any
```

- percent_value: int，需要跳转到的百分比位置，一般设置的位置会出现在 scroll_view 的最上方。该值取值范围 0-100。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want set scroll_view percent pos
scrollViewPath = "/scroll_view0"
scrollViewUIControl = uiNode.GetBaseUIControl(scrollViewPath).asScrollView()
scrollViewUIControl.SetScrollViewPercentValue(20)
```

</TabItem>
</Tabs>

---

### SetScrollViewPos

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ScrollViewUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置当前 scroll_view 内容的位置。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetScrollViewPos(pos: float) -> Any
```

- pos: float，需要跳转到的位置，一般设置的位置会出现在 scroll_view 的最上方。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want set scroll_view pos
scrollViewPath = "/scroll_view0"
scrollViewUIControl = uiNode.GetBaseUIControl(scrollViewPath).asScrollView()
scrollViewUIControl.SetScrollViewPos(100)
```

</TabItem>
</Tabs>

---

### SetSelectOptionByIndex

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据提供的索引选中对应下拉框项。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSelectOptionByIndex(index: int) -> Any
```

- index: int，索引。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
comboBoxUIControl.SetSelectOptionByIndex(0)
```

</TabItem>
</Tabs>

---

### SetSelectOptionByShowName

<Version type="china" add="1.25"/>

<Client/> NeteaseComboBoxUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据提供的展示文本选中对应下拉框项。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSelectOptionByShowName(name: str) -> Any
```

- name: str，索引。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
comboBoxUIControl.SetSelectOptionByShowName("测试项")
```

</TabItem>
</Tabs>

---

### SetSize

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件的大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSize(size: Tuple[float, float], resizeChildren: bool = False) -> Any
```

- size: Tuple[float, float]，该控件的大小信息，第一项为横轴，第二项为纵轴。
- resizeChildren: bool，是否同时调整子控件尺寸，默认为 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set text2 size
text2Path = "/panel/text2"
text2Size = (10, 10)
baseUIControl = uiNode.GetBaseUIControl(text2Path)
baseUIControl.SetSize(text2Size)
```

</TabItem>
</Tabs>

---

### SetSliderValue

<Version type="china" add="1.23"/>

<Client/> SliderUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置滑动条的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSliderValue(value: float) -> Any
```

- value: float，滑动条的值。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set slider value
sliderPath = "/panel/slider0"
sliderUIControl = uiNode.GetBaseUIControl(sliderPath).asSlider()
sliderUIControl.SetSliderValue(0.5) # 百分比滑动条
# sliderUIControl.SetSliderValue(5) # 固定格类型滑动条
```

</TabItem>
</Tabs>

---

### SetSprite

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

给图片控件换指定贴图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSprite(texturePath: str) -> Any
```

- texturePath: str，贴图的路径，需要从 resource_pack 下面的 textures 目录开始。

**备注**

- 给 ImageButton 换贴图的时候注意使用子控件路径(default / hover / pressed)获得 ImageUIControl。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set image_button textures
imageButtonPath = "/image_button"
buttonUIControl = uiNode.GetBaseUIControl(imageButtonPath).asButton()
buttonDefaultUIControl = buttonUIControl.GetChildByName("default").asImage()
buttonHoverUIControl = buttonUIControl.GetChildByName("hover").asImage()
buttonPressedUIControl = buttonUIControl.GetChildByName("pressed").asImage()
buttonDefaultUIControl.SetSprite("textures/button01_default")
buttonHoverUIControl.SetSprite("textures/button01_hover")
buttonPressedUIControl.SetSprite("textures/button01_pressed")
```

</TabItem>
</Tabs>

---

### SetSpriteClipRatio

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置图片的裁剪区域比例（不改变控件尺寸）。可以配合 image 控件的 clip_ratio 属性控制方向。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSpriteClipRatio(clipRatio: float) -> Any
```

- clipRatio: float，图片的裁剪比例（范围 0 到 1），裁剪精度与图片分辨率相关。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 我们想对UI编辑器创建的进度条设置进度
# 编辑器进度条包含两个image控件（名为empty_progress_bar和filled_progress_bar）
progress = 0.8  # 用于模拟进度时，下面的裁剪比例需设为(1-进度)，才能得到正确的视觉效果
imagePath = "/progress_bar0/filled_progress_bar"
imageUIControl = uiNode.GetBaseUIControl(imagePath).asImage()
imageUIControl.SetSpriteClipRatio(1.0 - progress)
```

</TabItem>
</Tabs>

---

### SetSpriteColor

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置图片颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSpriteColor(color: Tuple[float, float, float]) -> Any
```

- color: Tuple[float, float, float]，图片颜色 rgb，取值[0, 1]。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 我们想对耐久度条随耐久度变化颜色，满的时候为绿色，空的时候为红色，其中barPath为耐久度条路径
durabilityRatio = 0.8  # 耐久度比例，1为满耐久
barPath = "/image_bar"
imageUIControl = uiNode.GetBaseUIControl(barPath).asImage()
imageUIControl.SetSpriteColor((1 - durabilityRatio, durabilityRatio, 0))
```

</TabItem>
</Tabs>

---

### SetSpriteGray

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

给图片控件置灰，比直接 [SetSprite](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setsprite) 一张灰图片效率要高。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSpriteGray(gray: bool) -> Any
```

- gray: bool，True 为将图片置灰，False 为恢复原色。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want set image gray
imagePath = "/image"
imageUIControl = uiNode.GetBaseUIControl(imagePath).asImage()
imageUIControl.SetSpriteGray(True)
```

</TabItem>
</Tabs>

---

### SetSpritePlatformFrame

<Version type="china" add="1.23"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置图片为我的世界移动端启动器当前帐号的头像框。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSpritePlatformFrame() -> Any
```


**备注**

- 该接口仅支持移动端调用，其他平台该接口无效：
- 当我的世界移动端启动器账号的头像框是动态头像框时，该头像框图片将无法被加载，该问题将在下个版本修复：

</TabItem>
<TabItem value="示例" label="示例">

```python
# 我们想将当前图片控件设置为我的世界移动端启动器当前帐号的头像框
imagePath = "/image"
imageUIControl = uiNode.GetBaseUIControl(imagePath).asImage()
imageUIControl.SetSpritePlatformFrame()
```

</TabItem>
</Tabs>

---

### SetSpritePlatformHead

<Version type="china" add="1.23"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置图片为我的世界移动端启动器当前帐号的头像。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSpritePlatformHead() -> Any
```


**备注**

- 该接口仅支持移动端调用，其他平台该接口无效：

</TabItem>
<TabItem value="示例" label="示例">

```python
# 我们想将当前图片控件设置为我的世界移动端启动器当前帐号的头像
imagePath = "/image"
imageUIControl = uiNode.GetBaseUIControl(imagePath).asImage()
imageUIControl.SetSpritePlatformHead()
```

</TabItem>
</Tabs>

---

### SetSpriteUV

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置图片的起始 uv，与 json 中的"uv"属性作用一致。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSpriteUV(uv: Tuple[float, float]) -> Any
```

- uv: Tuple[float, float]，图片的左上角为(0,0)，向右为 x 轴，向下为 y 轴。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/image"
imageUIControl = uiNode.GetBaseUIControl(imagePath).asImage()
imageUIControl.SetSpriteUV((10, 0))
```

</TabItem>
</Tabs>

---

### SetSpriteUVSize

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ImageUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置图片的 uv 大小，与 json 中的"uv_size"属性作用一致。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetSpriteUVSize(uvSize: Tuple[float, float]) -> Any
```

- uvSize: Tuple[float, float]，图片向右为 x 轴，向下为 y 轴。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/image"
imageUIControl = uiNode.GetBaseUIControl(imagePath).asImage()
imageUIControl.SetSpriteUVSize((40, 30))
```

</TabItem>
</Tabs>

---

### SetText

<Version type="china" add="1.23"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置 Label 的文本信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetText(text: str, syncSize: bool = False) -> Any
```

- text: str，文本的内容，可以支持[样式代码](https://zh.minecraft.wiki/w/%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%BB%A3%E7%A0%81)（§可以设置文字的颜色、格式等，该种用法更加灵活多变）。
- syncSize: bool，是否设置文本时同步更新文本框大小，默认值为 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set text2 content
text2Path = "/panel/text2"
text = "Hello World!"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
labelUIControl.SetText(text)
```

</TabItem>
</Tabs>

---

### SetTextAlignment

<Version type="china" add="2.1"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置文本控件的文本对齐方式。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTextAlignment(textAlignment: str) -> bool
```

- textAlignment: str，文本控件的文本对齐方式，可选的值详见备注。

**返回值**：bool，设置是否成功。

**备注**

- textAlignment 可选的值。

| 值 | 解释 |
| --- | --- |
| "left" | 文本左对齐（水平方向） |
| "right" | 文本右对齐（水平方向） |
| "center" | 文本居中对齐（水平方向） |

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to align text2 to center
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
textAlignment = "center"
ret = labelUIControl.SetTextAlignment(textAlignment)
```

</TabItem>
</Tabs>

---

### SetTextColor

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置 Label 文本的颜色。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTextColor(color: Tuple[float, float, float]) -> Any
```

- color: Tuple[float, float, float]，文本的颜色信息(r, g, b)，取值[0, 1]。

**备注**

- 该接口不支持传入 alpha 通道改变透明度，建议使用 [SetAlpha](/docs/docs/scripts/modapi/interfaces/custom_ui/control#setalpha) 接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set text2 green
text2Path = "/panel/text2"
color = (0, 1, 0)
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
labelUIControl.SetTextColor(color)
```

</TabItem>
</Tabs>

---

### SetTextFontSize

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置 Label 中文本字体的大小。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTextFontSize(scale: float) -> Any
```

- scale: float，label 的 font_size 的作用是 Label 中的默认字体大小，取值有限为[small normal large]，这个 scale 是在这个默认字体的基础上进行缩放字体大小，默认字体大小为 1.0。

</TabItem>
<TabItem value="示例" label="示例">

```python
# set text font size
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
labelUIControl.SetTextFontSize(0.8)
```

</TabItem>
</Tabs>

---

### SetTextLinePadding

<Version type="china" add="2.1"/>

<Client/> LabelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置文本控件的行间距。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTextLinePadding(textLinePadding: float) -> bool
```

- textLinePadding: float，文本控件的行间距，单位为像素。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set text2 textLinePadding
text2Path = "/panel/text2"
labelUIControl = uiNode.GetBaseUIControl(text2Path).asLabel()
textLinePadding = 20
ret = labelUIControl.SetTextLinePadding(textLinePadding)
```

</TabItem>
</Tabs>

---

### SetToggleState

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> SwitchToggleUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置 Toggle 开关控件的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetToggleState(is_on: bool, toggle_path: str = "/this_toggle") -> Any
```

- is_on: bool，设置 Toggle 开关控件是打开还是关闭状态。
- toggle_path: str，实际 toggle 控件相对路径，由 UI 编辑器生成的开关控件该参数即为默认值"/this_toggle"。

</TabItem>
<TabItem value="示例" label="示例">

```python
togglePath = "/toggle1"
switchToggleUIControl = uiNode.GetBaseUIControl(togglePath).asSwitchToggle()
switchToggleUIControl.SetToggleState(True)
```

</TabItem>
</Tabs>

---

### SetTouchEnable

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置控件是否可点击交互。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTouchEnable(enable: bool) -> Any
```

- enable: bool，False 为不响应，True 为恢复响应。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set image_button unable
imageButtonPath = "/image_button"
baseUIControl = uiNode.GetBaseUIControl(imageButtonPath)
baseUIControl.SetTouchEnable(False)
```

</TabItem>
</Tabs>

---

### SetTouchUpCallback

<Version type="china" add="2.7"/>

<Client/> SelectionWheelUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置轮盘选择切片并且鼠标按下抬起后触发回调函数。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetTouchUpCallback(callbackFunc: Callable) -> Any
```

- callbackFunc: Callable，回调函数，必须是 UI 的类函数，并且无参数。

</TabItem>
<TabItem value="示例" label="示例">

```python
def onSelectionWheelTouchUp():
    pass

selectionWheelPath = "/selectionWheel"
selectionWheelControl = uiNode.GetBaseUIControl(selectionWheelPath).asSelectionWheel()
selectionWheelControl.SetTouchUpCallback(onSelectionWheelTouchUp)
```

</TabItem>
</Tabs>

---

### SetUiItem

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ItemRendererUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置 ItemRenderer 控件显示的物品，ItemRenderer 控件的配置方式详见[控件介绍 ItemRenderer](https://mc.163.com/newdev/docs/mcguide/18-jiemianyujiaohu/30-ui-shuomingwendang.html#itemrenderer)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetUiItem(
    itemName: str,
    auxValue: int,
    isEnchanted: bool,
    userData: Dict[str, Any],
) -> bool
```

- itemName: str，物品 identifier。
- auxValue: int，物品附加值。
- isEnchanted: bool，可选参数，是否显示附魔效果，默认为 False 不显示。
- userData: Dict[str, Any]，可选参数，如果是灾厄旗帜或焰火之星等带有 userData 的需要传入该参数才能正确显示，目前已知仅有灾厄旗帜和焰火之星需要传。

**返回值**：bool，是否设置结果，True 为成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
#设置显示为羊毛wool
itemRenderPath = "/panel/item_renderer"
itemName = "minecraft:wool"
auxValue = 0
itemRendererBaseControl = uiNode.GetBaseUIControl(itemRenderPath)
itemRendererControl = itemRendererBaseControl.asItemRenderer()
itemRendererControl.SetUiItem(itemName, auxValue)
```

</TabItem>
</Tabs>

---

### SetValue

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> ProgressBarUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

设置进度条的进度。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetValue(progress: float) -> Any
```

- progress: float，进度，取值[0, 1]。

</TabItem>
<TabItem value="示例" label="示例">

```python
# we want to set progress
progressBarPath = "/panel/progress_bar"
progressBarUIControl = uiNode.GetBaseUIControl(progressBarPath).asProgressBar()
progressBarUIControl.SetValue(0.8)
```

</TabItem>
</Tabs>

---

### SetVisible

<Version type="china" add="3.5"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

根据控件路径选择是否显示某控件，可以通过传入空字符串（""）的方式来调整整个 JSON 的显示/隐藏。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetVisible(visible: bool, forceUpdate: bool = True) -> Any
```

- visible: bool，False 为隐藏该控件，True 为显示该控件。
- forceUpdate: bool，是否需要强制刷新，默认值为 True。置 True 则按照马上进行刷新，新的 visible 状态生效。置 False，则需要再次调用 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 使新状态生效。如有大量 SetVisible 操作且非在同一帧执行，建议设置为 False,需要更新时再调用 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 接口刷新界面及相关控件数据。

**备注**

- 特殊情况说明：当该接口的调用来自滚动列表内容控件中的按钮回调，且调用目的是隐藏滚动列表控件或其父节点控件时，将 forceUpdate 参数置 True 会导致滚动列表数据异常。若没有刷新界面的必要请将 forceUpdate 参数置 False，若有请使用定时器延迟执行手动 [UpdateScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#updatescreen) 接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 隐藏panel的子控件text2
text2Path = "/panel/text2"
baseUIControl = uiNode.GetBaseUIControl(text2Path)
baseUIControl.SetVisible(False)
# 在非同一帧，隐藏panel的子控件text1, text2, text3
parentPath = "/panel"
textPrefabPath = "/panel/text_prefab"
def _tickSetVisible(pathName):
    baseUIControl = uiNode.GetBaseUIControl(pathName)
    baseUIControl.SetVisible(False, False)
def _tickUpdateScreen():
    uiNode.UpdateScreen(True)
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
comp.AddTimer(100, _tickSetVisible, "/panel/text1")
comp.AddTimer(200, _tickSetVisible, "/panel/text2")
comp.AddTimer(300, _tickSetVisible, "/panel/text3")
comp.AddTimer(300, _tickUpdateScreen)
```

</TabItem>
</Tabs>

---

### StopAnimation

<Version type="china" add="1.22"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

停止动画，动画将恢复到第一段动画片段的 from 状态。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
StopAnimation(propertyName: str = "all") -> bool
```

- propertyName: str，动画的属性名称，默认值为"all"，表示停止所有动画，不为"all"的时候表示单个动画的停止，比如 propertyName=="size"时，表示停止尺寸属性上的动画。

**返回值**：bool，是否停止成功。

**备注**

- UI 属性动画相关，详见属性动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 获取控件
control = uiNode.GetBaseUIControl("/image")
# 停止所有动画
control.StopAnimation()
# 停止尺寸动画
# control.StopAnimation("size")
# 停止位移动画
# control.StopAnimation("offset")
# 其他属性也是支持停止的，具体可参见备注
```

</TabItem>
</Tabs>

---

### ZoomIn

<Version type="china" add="1.22"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

放大地图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ZoomIn(value: float = 0.05) -> bool
```

- value: float，在原有基础上的增量值，可以控制放大速度，默认为 0.05。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.ZoomIn(0.2)
```

</TabItem>
</Tabs>

---

### ZoomOut

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

缩小地图。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ZoomOut(value: float = 0.05) -> bool
```

- value: float，在原有基础上的减少值，可以控制缩小速度，默认为 0.05。

**返回值**：bool，是否成功。

**备注**

- 客户端地图区块加载有限，如果地图 UI 界面太大或者缩小地图倍数太大，会导致小地图无法显示未加载的区块。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.ZoomOut(0.2)
```

</TabItem>
</Tabs>

---

### ZoomReset

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> MiniMapUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

恢复地图放缩大小为默认值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
ZoomReset() -> bool
```


**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/demoPanel/netease_mini_map"
map = uiNode.GetBaseUIControl(path).asMiniMap()
map.ZoomReset(0.2)
```

</TabItem>
</Tabs>

---

### asButton

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 ButtonUIControl 实例，如当前控件非 button 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asButton() -> ButtonUIControl
```


**返回值**：ButtonUIControl，ButtonUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
buttonPath = "/button"
buttonBaseControl = uiNode.GetBaseUIControl(buttonPath)
buttonControl = buttonBaseControl.asButton()
```

</TabItem>
</Tabs>

---

### asGrid

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 GridUIControl 实例，如当前控件非 grid 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asGrid() -> GridUIControl
```


**返回值**：GridUIControl，GridUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
gridPath = "/grid"
gridBaseControl = uiNode.GetBaseUIControl(gridPath)
gridControl = gridBaseControl.asGrid()
```

</TabItem>
</Tabs>

---

### asImage

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 ImageUIControl 实例，如当前控件非 image 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asImage() -> ImageUIControl
```


**返回值**：ImageUIControl，ImageUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
imagePath = "/image"
imageBaseControl = uiNode.GetBaseUIControl(imagePath)
imageControl = imageBaseControl.asImage()
```

</TabItem>
</Tabs>

---

### asInputPanel

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 InputPanelUIControl 实例，如当前控件非 inputPanel 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asInputPanel() -> InputPanelUIControl
```


**返回值**：InputPanelUIControl，InputPanelUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
inputPanelPath = "/inputPanel"
inputPanelUIControl = uiNode.GetBaseUIControl(inputPanelPath).asInputPanel()
```

</TabItem>
</Tabs>

---

### asItemRenderer

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 ItemRenderer 实例，如当前控件非 custom 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asItemRenderer() -> ItemRendererUIControl
```


**返回值**：ItemRendererUIControl，ItemRendererUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
itemRendererPath = "/item_renderer"
itemRendererBaseControl = uiNode.GetBaseUIControl(itemRendererPath)
itemRendererControl = itemRendererBaseControl.asItemRenderer()
```

</TabItem>
</Tabs>

---

### asLabel

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 LabelUIControl 实例，如当前控件非 Label 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asLabel() -> LabelUIControl
```


**返回值**：LabelUIControl，LabelUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
text1Path = "/text1"
text1BaseControl = uiNode.GetBaseUIControl(text1Path)
text1LabelControl = text1BaseControl.asLabel()
```

</TabItem>
</Tabs>

---

### asMiniMap

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 MiniMapUIControl 实例，如当前控件非小地图类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asMiniMap() -> MiniMapUIControl
```


**返回值**：MiniMapUIControl，MiniMapUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/mini_map"
miniMapBaseControl = uiNode.GetBaseUIControl(path)
miniMapControl = miniMapBaseControl.asMiniMap()
```

</TabItem>
</Tabs>

---

### asNeteaseComboBox

<Version type="china" add="1.25"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 NeteaseComboBoxUIControl 实例，如当前控件非 panel 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asNeteaseComboBox() -> NeteaseComboBoxUIControl
```


**返回值**：NeteaseComboBoxUIControl，NeteaseComboBoxUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
comboBoxPath = "/panel/comboBoxPanel"
comboBoxUIControl = uiNode.GetBaseUIControl(comboBoxPath).asNeteaseComboBox()
```

</TabItem>
</Tabs>

---

### asNeteasePaperDoll

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 NeteasePaperDollUIControl 实例，如当前控件非 custom 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asNeteasePaperDoll() -> NeteasePaperDollUIControl
```


**返回值**：NeteasePaperDollUIControl，NeteasePaperDollUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
paperDollPath = "/paper_doll"
paperDollBaseControl = uiNode.GetBaseUIControl(paperDollPath)
paperDollControl = paperDollBaseControl.asNeteasePaperDoll()
```

</TabItem>
</Tabs>

---

### asProgressBar

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 ProgressBarUIControl 实例，如当前控件非 panel 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asProgressBar(fillImagePath: str) -> ProgressBarUIControl
```

- fillImagePath: str，进度条填充图片路径，默认为"/filled_progress_bar",该参数影响该控件 API 的效果。

**返回值**：ProgressBarUIControl，ProgressBarUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
progressBarPath = "/progress_bar"
progressBarBaseControl = uiNode.GetBaseUIControl(progressBarPath)
progressBarControl = progressBarBaseControl.asProgressBar()
```

</TabItem>
</Tabs>

---

### asScrollView

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 ScrollViewUIControl 实例，如当前控件非 scrollview 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asScrollView() -> ScrollViewUIControl
```


**返回值**：ScrollViewUIControl，ScrollViewUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
scrollViewPath = "/scroll_view"
scrollViewBaseControl = uiNode.GetBaseUIControl(scrollViewPath)
scrollViewControl = scrollviewBaseControl.asScrollView()
```

</TabItem>
</Tabs>

---

### asSelectionWheel

<Version type="china" add="2.7"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 SelectionWheelUIControl 实例，如当前控件非 selectionWheel 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asSelectionWheel() -> SelectionWheelUIControl
```


**返回值**：SelectionWheelUIControl，SelectionWheelUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
selectionWheelPath = "/selectionWheel"
selectionWheelControl = uiNode.GetBaseUIControl(selectionWheelPath).asSelectionWheel()
```

</TabItem>
</Tabs>

---

### asSlider

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 SliderUIControl 实例，如当前控件非滑动条类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asSlider() -> SliderUIControl
```


**返回值**：SliderUIControl，SliderUIControl。

</TabItem>
<TabItem value="示例" label="示例">

```python
path = "/slider0"
sliderBaseControl = uiNode.GetBaseUIControl(path)
sliderControl = sliderBaseControl.asSlider()
```

</TabItem>
</Tabs>

---

### asStackPanel

<Version type="china" add="2.1"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 StackPanelUIControl 实例，如当前控件非 stackPanel 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asStackPanel() -> StackPanelUIControl
```


**返回值**：StackPanelUIControl，StackPanelUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
stackPanelPath = "/stackPanel"
stackPanelUIControl = uiNode.GetBaseUIControl(stackPanelPath).asStackPanel()
```

</TabItem>
</Tabs>

---

### asSwitchToggle

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 SwitchToggleUIControl 实例，如当前控件非 panel 类型或非 toggle 则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asSwitchToggle() -> SwitchToggleUIControl
```


**返回值**：SwitchToggleUIControl，SwitchToggleUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
switchTogglePath = "/switch_toggle"
switchToggleBaseControl = uiNode.GetBaseUIControl(switchTogglePath)
switchToggleControl = switchToggleBaseControl.asSwitchToggle()
```

</TabItem>
</Tabs>

---

### asTextEditBox

<Version type="china" add="未知" tooltip="该接口可能早于最早记载的中国版 1.21 更新。"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

将当前 BaseUIControl 转换为 TextEditBoxUIControl 实例，如当前控件非 editbox 类型则返回 None。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
asTextEditBox() -> TextEditBoxUIControl
```


**返回值**：TextEditBoxUIControl，TextEditBoxUIControl 实例。

</TabItem>
<TabItem value="示例" label="示例">

```python
textEditBoxPath = "/text_edit_box"
textEditBoxBaseControl = uiNode.GetBaseUIControl(textEditBoxPath)
textEditBoxControl = textEditBoxBaseControl.asTextEditBox()
```

</TabItem>
</Tabs>

---

### resetAnimation

<Version type="china" add="2.2"/>

<Client/> BaseUIControl

控件方法，先用 GetBaseUIControl 取得控件实例再调用。

重置该控件的动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
resetAnimation() -> Any
```


**备注**

- UI 属性动画相关，详见属性动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 重置/text1控件上的属性动画
text1Path = "/text1"
text1Control = uiNode.GetBaseUIControl(text1Path)
text1Control.resetAnimation()
```

</TabItem>
</Tabs>

---
