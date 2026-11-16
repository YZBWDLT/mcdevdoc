---
sidebar_position: 2
---

# 通用设置

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录通用设置相关的接口，共 5 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/zidingyi-ui/tongyongshezhi.html"/>

---

### CloseSettingUI

<Client/> NeteaseWindowCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseWindow(levelId)`

关闭模组信息界面。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CloseSettingUI() -> bool
```


**返回值**：bool，是否关闭成功。

**备注**

- 该接口在 modPC 环境下，将是关闭局内 json ui。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
levelId = clientApi.GetLevelId()
comp = clientApi.GetEngineCompFactory().CreateNeteaseWindow(levelId)
# 关闭界面
result = comp.CloseSettingUI()
```

</TabItem>
</Tabs>

---

### GetSettingInst

<Client/> NeteaseWindowCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseWindow(levelId)`

获取当前模组的通用设置实例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetSettingInst(modNamespace: str) -> SettingInst
```

- modNamespace: str，组件命名空间，需唯一性，仅在开发环境预览使用。

**返回值**：SettingInst，返回实例对象，未注册则返回 None。

**备注**

- 请先使用 [RegisterSettingInst](/docs/docs/scripts/modapi/custom_ui/setting#registersettinginst) 注册，再使用 GetSettingInst 获取。
- 开发环境中，将会获取 modNamespace 对应的通用设置实例；正式环境中则仅能获取当前模组注册的实例。
- 建议不要在__init__的时候就获取实例，过早获取会返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
levelId = clientApi.GetLevelId()
comp = clientApi.GetEngineCompFactory().CreateNeteaseWindow(levelId)
settingInst = comp.GetSettingInst()
if settingInst:
    settingInst.AddText("text_uid_01", "这是一段文字").AddToggle("toggle_uid_01", "开关按钮", False, callbackFunction)
```

</TabItem>
</Tabs>

---

### OpenSettingUI

<Client/> NeteaseWindowCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseWindow(levelId)`

在模组信息界面中打开设置页面（此操作仅可访问本模组的配置选项）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenSettingUI() -> bool
```


**返回值**：bool，是否打开成功。

**备注**

- 该接口在 modPC 环境下，将是打开局内 json ui。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
levelId = clientApi.GetLevelId()
comp = clientApi.GetEngineCompFactory().CreateNeteaseWindow(levelId)
# 打开界面
result = comp.OpenSettingUI()
```

</TabItem>
</Tabs>

---

### RegisterSettingInst

<Client/> NeteaseWindowCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseWindow(levelId)`

注册通用设置实例。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterSettingInst(
    modNamespace: str,
    modName: Optional[str] = None,
    iconPath: Optional[str] = None,
) -> SettingInst
```

- modNamespace: str，组件命名空间，需唯一性，仅在开发环境预览使用。
- modName: Optional[str]，组件名字，默认为 None，仅在开发环境预览使用。
- iconPath: Optional[str]，组件 icon 图路径，默认为 None，仅在开发环境预览使用。

**返回值**：SettingInst，返回实例对象，系统未初始化则返回 None。

**备注**

- 每个模组仅能注册一个通用设置实例，重复注册会返回同样的实例。
- 建议在 [UiInitFinished](/docs/docs/scripts/modapi/events/ui#uiinitfinished) 触发时再注册，注册过早会导致注册失败而返回 None。
- 设置界面的注册是通过 Scripts 文件夹名称来判断是由哪个模组注册的实例，开发者的 Scripts 名称需要确保不与其他模组作者的 Scripts 名称冲突。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
levelId = clientApi.GetLevelId()
comp = clientApi.GetEngineCompFactory().CreateNeteaseWindow(levelId)
settingInst = comp.RegisterSettingInst("123456789", "模组1", "textures/ui/abc")
if settingInst:
    settingInst.AddText("text_uid_01", "这是一段文字").AddToggle("toggle_uid_01", "开关按钮", False, callbackFunction)
```

</TabItem>
</Tabs>

---

### SettingInst 下的方法

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法() -> Any
```


清除所有控件。

</TabItem>
<TabItem value="示例" label="示例">

```python
def Clear(self)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, name: str, priority: Optional[int]) -> SettingInst
```

- key: str，控件 id。
- name: str，控件的文字描述。
- priority: Optional[int]，显示顺序优先级，默认根据添加顺序排列。

**返回值**：SettingInst，当前实例，支持链式调用。

添加文本控件。

</TabItem>
<TabItem value="示例" label="示例">

```python
def AddText(self, key, name, priority=None)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(
    key: str,
    name: str,
    callback: Callable,
    priority: Optional[int],
    default: bool,
) -> SettingInst
```

- key: str，控件 id。
- name: str，控件的文字描述。
- callback: Callable，控件的回调函数，定义：`def callback(key, value)`，key 为控件 id，value 为 bool 类型。
- priority: Optional[int]，显示顺序优先级，默认根据添加顺序排列。
- default: bool，默认值，默认为 False。

**返回值**：SettingInst，当前实例，支持链式调用。

添加开关控件。

</TabItem>
<TabItem value="示例" label="示例">

```python
def AddToggle(self, key, name, callback, priority=None, default=False)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(
    key: str,
    name: str,
    step: int,
    callback: Callable,
    priority: Optional[int],
    default: int,
) -> SettingInst
```

- key: str，控件 id。
- name: str，控件的文字描述。
- step: int，滑动条的最大值，范围：0~step。
- callback: Callable，控件的回调函数，定义：`def callback(key, value)`，key 为控件 id，value 为 int 类型。
- priority: Optional[int]，显示顺序优先级，默认根据添加顺序排列。
- default: int，默认值，默认为 0。

**返回值**：SettingInst，当前实例，支持链式调用。

添加滑动条控件。

</TabItem>
<TabItem value="示例" label="示例">

```python
def AddSlider(self, key, name, step, callback, priority=None, default=0)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(
    key: str,
    name: str,
    options: List[str],
    callback: Callable,
    priority: Optional[int],
    default: Optional[str],
) -> SettingInst
```

- key: str，控件 id。
- name: str，控件的文字描述。
- options: List[str]，下拉选项列表。
- callback: Callable，控件的回调函数，定义：`def callback(key, value)`，key 为控件 id，value 为选项索引 int 类型。
- priority: Optional[int]，显示顺序优先级，默认根据添加顺序排列。
- default: Optional[str]，默认选项，该值需在 options 中。

**返回值**：SettingInst，当前实例，支持链式调用。

添加下拉选项控件。

</TabItem>
<TabItem value="示例" label="示例">

```python
def AddDropDown(self, key, name, options, callback, priority=None, default=None)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(
    key: str,
    name: str,
    callback: Callable,
    priority: Optional[int],
    default: str,
) -> SettingInst
```

- key: str，控件 id。
- name: str，控件的文字描述。
- callback: Callable，控件的回调函数，定义：`def callback(key, value)`，key 为控件 id，value 为 str 类型。
- priority: Optional[int]，显示顺序优先级，默认根据添加顺序排列。
- default: str，默认显示的文本，默认为空字符串。

**返回值**：SettingInst，当前实例，支持链式调用。

添加输入框控件。

</TabItem>
<TabItem value="示例" label="示例">

```python
def AddInput(self, key, name, callback, priority=None, default="")
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(
    key: str,
    name: str,
    buttonText: str,
    callback: Callable,
    priority: Optional[int],
) -> SettingInst
```

- key: str，控件 id。
- name: str，控件的文字描述。
- buttonText: str，按钮的文字描述。
- callback: Callable，控件的回调函数，定义：`def callback(key, value)`，key 为控件 id，value 为 None。
- priority: Optional[int]，显示顺序优先级，默认根据添加顺序排列。

**返回值**：SettingInst，当前实例，支持链式调用。

添加按钮控件。

</TabItem>
<TabItem value="示例" label="示例">

```python
def AddButton(self, key, name, buttonText, callback, priority=None)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> bool
```

- key: str，控件 id。

**返回值**：bool，开关状态。

获取开关控件的默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetToggleDefault(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> str
```

- key: str，控件 id。

**返回值**：str，输入框的文本。

获取输入框的默认输入文本。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetInputDefault(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> str
```

- key: str，控件 id。

**返回值**：str，默认选项在列表中的索引。

获取下拉选项控件的默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetDropDownDefault(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> int
```

- key: str，控件 id。

**返回值**：int，滑块的值。

获取滑动条控件的默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetSliderDefault(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> str
```

- key: str，控件 id。

**返回值**：str，显示的文本。

获取文字控件的文本。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetText(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> Optional[str]
```

- key: str，控件 id。

**返回值**：Optional[str]，按钮文字，控件不存在时返回 None。

获取按钮控件的文字。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetButtonText(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> Optional[bool]
```

- key: str，控件 id。

**返回值**：Optional[bool]，开关状态，控件不存在时返回 None。

获取开关控件的当前值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetToggleValue(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> Optional[int]
```

- key: str，控件 id。

**返回值**：Optional[int]，滑块的值，控件不存在时返回 None。

获取滑动条控件的当前值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetSliderValue(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> Optional[str]
```

- key: str，控件 id。

**返回值**：Optional[str]，选中的文本，控件不存在时返回 None。

获取下拉选项控件的当前选中文本。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetDropDownValue(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> Optional[str]
```

- key: str，控件 id。

**返回值**：Optional[str]，输入的文本，控件不存在时返回 None。

获取输入框控件的当前值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetInputValue(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, value: bool) -> SettingInst
```

- key: str，控件 id。
- value: bool，开关的值。

**返回值**：SettingInst，当前实例，支持链式调用。

设置开关控件的默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetToggleDefault(self, key, value)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, value: str) -> SettingInst
```

- key: str，控件 id。
- value: str，显示的文本。

**返回值**：SettingInst，当前实例，支持链式调用。

设置输入框控件的默认文本。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetInputDefault(self, key, value)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, option: str) -> SettingInst
```

- key: str，控件 id。
- option: str，选项文字，如文字不在选项列表里，会自动添加到列表。

**返回值**：SettingInst，当前实例，支持链式调用。

设置下拉选项控件的默认选项。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetDropDownDefault(self, key, option)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, value: int) -> SettingInst
```

- key: str，控件 id。
- value: int，滑块的值。

**返回值**：SettingInst，当前实例，支持链式调用。

设置滑动条控件的默认值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetSliderDefault(self, key, value)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, value: bool) -> SettingInst
```

- key: str，控件 id。
- value: bool，开关的值。

**返回值**：SettingInst，当前实例，支持链式调用。

设置开关控件的当前值，保存到本地存储，不会触发回调。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetToggleValue(self, key, value)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, value: int) -> SettingInst
```

- key: str，控件 id。
- value: int，滑块的值。

**返回值**：SettingInst，当前实例，支持链式调用。

设置滑动条控件的当前值，保存到本地存储，不会触发回调。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetSliderValue(self, key, value)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, value: str) -> SettingInst
```

- key: str，控件 id。
- value: str，选项文本，如果选项不在 options 中，则设置失败。

**返回值**：SettingInst，当前实例，支持链式调用。

设置下拉选项控件的当前值，保存到本地存储，不会触发回调。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetDropDownValue(self, key, value)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, value: str) -> SettingInst
```

- key: str，控件 id。
- value: str，输入的文本。

**返回值**：SettingInst，当前实例，支持链式调用。

设置输入框控件的当前值，保存到本地存储，不会触发回调。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetInputValue(self, key, value)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, value: str) -> SettingInst
```

- key: str，控件 id。
- value: str，显示的文字。

**返回值**：SettingInst，当前实例，支持链式调用。

设置按钮控件的文字。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetButtonText(self, key, value)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, value: str) -> SettingInst
```

- key: str，控件 id。
- value: str，显示的文本。

**返回值**：SettingInst，当前实例，支持链式调用。

设置文本控件的值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetText(self, key, value)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str, is_locked: bool) -> SettingInst
```

- key: str，控件 id。
- is_locked: bool，是否锁定。

**返回值**：SettingInst，当前实例，支持链式调用。

设置锁定控件，锁定后无法点击。

</TabItem>
<TabItem value="示例" label="示例">

```python
def SetLockSettingComp(self, key, is_locked)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法() -> Dict[str, Any]
```


**返回值**：Dict[str, Any]，结构化数据。

获取当前实例的结构化数据，控件数据根据 priority 的值升序排序。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetFormatData(self)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法(key: str) -> Dict[str, Any]
```

- key: str，控件 id。

**返回值**：Dict[str, Any]，控件的结构化数据。

获取控件的结构化数据。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetSettingsControl(self, key)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法() -> str
```


**返回值**：str，模组 ID。

获取实例的 modId。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetModId(self)
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SettingInst 下的方法() -> int
```


**返回值**：int，当前自动优先级的值。

**备注**

- 备注当添加控件时，如果不设置优先级，则会自动从 0 开始设置。优先级会影响控件排列顺序，升序排列。

获取自动设置的优先级的值。

</TabItem>
<TabItem value="示例" label="示例">

```python
def GetAutoPriority(self)
```

</TabItem>
</Tabs>

---
