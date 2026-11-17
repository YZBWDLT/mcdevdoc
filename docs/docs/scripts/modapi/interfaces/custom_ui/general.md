---
sidebar_position: 1
---

# 通用

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录通用相关的接口，共 22 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/zidingyi-ui/tongyong.html"/>

---

### CheckCanBindUI

<Client/>

模块级函数，直接调用。

检查实体是否可以绑定头顶 UI，如何将 UI 与实体绑定详见 [CreateUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#createui) 接口。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CheckCanBindUI(entityId: str) -> bool
```

- entityId: str，实体 id。

**返回值**：bool，是否可以绑定头顶 UI True:可以绑定 False:不能绑定。

**备注**

- 不能绑定头顶 UI 通常是由于该实体已经死亡或该实体刚创建出来。刚创建的实体若无法绑定头顶 UI，等待 1-3 帧后再次尝试绑定即可。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
canBind = clientApi.CheckCanBindUI(entityId)
```

</TabItem>
</Tabs>

---

### CreateUI

<Client/>

模块级函数，直接调用。

创建 UI，详见[界面创建流程及生命周期](https://mc.163.com/newdev/docs/mcguide/18-jiemianyujiaohu/30-ui-shuomingwendang.html#界面创建流程及生命周期)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateUI(nameSpace: str, uiKey: str, createParams: Dict[str, Any]) -> ScreenNode
```

- nameSpace: str，命名空间，建议为 mod 名字。
- uiKey: str，UI 唯一标识。
- createParams: Dict[str, Any]，创建 UI 的参数，会传到 UI 类的_init_函数中。

**返回值**：ScreenNode，UI 节点。

**备注**

- createParams 参数解释如下：

| 参数 | 类型 | 解释 |
| --- | --- | --- |
| isHud | int | 值为( 0 / 1)，意为是否为 HUD 界面的 UI。一般情况下，射击按钮不屏蔽游戏, 原生的操作的界面应该 isHud 为 1；商城界面等不是游戏内操作的界面 isHud 应该为 0，默认值为 0。当 isHud 取 0 时，创建的 UI 会默认从比当前 UI 的层级大 1000 的地方生成，可能会造成控件遮挡情况；当 isHud 为 1 时，创建的 UI 会从层级为 0 的地方生成 |
| inputMode | int | 值为( 0 / 1 )，属于旧版本写法，和 isHud 含义相同但取值相反，即 isHud 取 0 等于 inputMode 取 1，两者同时存在优先判断 isHud。 |
| bindEntityId | str | 意为绑定实体的 id。若不传入该键值对或值为 None，则会以 isHud = 0 来处理该 UI 界面。 |
| bindWorldPosition | (int, (float, float, float)) | 第一个元素为绑定的维度，第二个为世界坐标, 若传入这个参数，autoScale 默认为 1，isHud 强制为 1，其他传入参数无效。 |
| bindOffset | tuple | 意为 UI 与绑定实体的偏移量，默认值为(0, 1, 0)。 |
| autoScale | int | 值为( 0 / 1 )，意为绑定实体的 UI 是否会自动根据实体与本地玩家的距离动态缩放大小，默认值为 1，即会动态缩放头顶 UI 的大小。 |
| mini_map_root_path | str | 小地图控件根路径 |

- 当 isHud 参数设置为 0 或不传时，会在比当前 UI 的层级大 1000 的地方生成，生成后再调用 [SetIsHud](/docs/docs/scripts/modapi/interfaces/custom_ui/screen#setishud) 接口无法再修改层级！如果新创建的 UI 导致了其他 UI 无法正常交互，可以把新 UI 中 main 的 type 由 screen 改为 panel，并删除 screen 相关属性来解决遮挡问题。
- 设置自动缩放需要将 UI 写为百分比形式，设置为固定尺寸将无法缩放，超过一定距离会不可见。
- 注意：绑定实体的 UI 缩放仅作用于根节点（比如"main"节点）下的子节点。建议在根节点下挂载一个 panel 类型的节点，然后将所有需要缩放的 UI 节点设置为百分比属性并挂载在这个 panel 节点下。如果开启了自动缩放，父节点（如上述 panel）的偏移需要设置为[0,0]，缩放功能才能正常使用。
- 注意：若同屏中存在太多绑定实体的 UI 或一次性创建、删除大量绑定实体 UI，都可能会造成卡顿等性能问题。建议使用资源池来管理绑定实体 UI，当实体与本地玩家距离超过一定范围时，隐藏/移除其绑定 UI，或使其绑定 UI 改为绑定其他有需求的实体。当需要大批量创建绑定实体 UI 时，建议将创建 UI 的任务分为小批量多次执行，每批次间相距至少一帧。例如需要创建 100 个绑定实体 UI，将任务分散在 5 帧中，每帧创建 20 个绑定实体 UI。
- 注意：第二个参数 uiKey，如果传进去名字一样名字的 ui，则会创建失败，请保证 uiKey 的唯一性。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
from mod_log import logger as logger
# 监听引擎初始化完成事件，在这个事件后创建我们的战斗UI
def OnUIInitFinished(self, args):
    logger.info("OnUIInitFinished : %s" % args)
    # 注册UI 详细解释参照《UI API》
    clientApi.RegisterUI(modConfig.ModName, modConfig.FpsBattleUIName, modConfig.FpsBattleUIPyClsPath, modConfig.FpsBattleUIScreenDef)
    # 创建普通UI界面
    clientApi.CreateUI(modConfig.ModName, modConfig.FpsBattleUIName, {"isHud" : 1})
    # 获取创建的UI界面
    self.mFpsBattleUINode = clientApi.GetUI(modConfig.ModName, modConfig.FpsBattleUIName)
    if self.mFpsBattleUINode:
        self.mFpsBattleUINode.Init()

# 不同于上面的例子，这里展示的是如何创建绑定实体的UI界面
def OnUIInitFinished(self, args):
    logger.info("OnUIInitFinished : %s" % args)
    # 同样先注册UI
    clientApi.RegisterUI(modConfig.ModName, modConfig.FpsBattleUIName, modConfig.FpsBattleUIPyClsPath, modConfig.FpsBattleUIScreenDef)
    # 创建绑定id为entityId的实体的UI
    clientApi.CreateUI(
        modConfig.ModName,
        modConfig.FpsBattleUIName,
        {
            "bindEntityId": entityId,
            "bindOffset": (0, 2, 0),
            "autoScale": 1
        }
    )
    self.mFpsBattleUINode = clientApi.GetUI(modConfig.ModName, modConfig.FpsBattleUIName)
    if self.mFpsBattleUINode:
        self.mFpsBattleUINode.Init()
```

</TabItem>
</Tabs>

---

### EnableFontBatchRender

<Client/> GameComponentClient

获取组件：`clientApi.GetEngineCompFactory().CreateGame(levelId)`

是否开启字体合批。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
EnableFontBatchRender(enable: bool) -> Any
```

- enable: bool，True 开启，False 关闭。

**备注**

- 设置是否开启字体合批功能，开启之后对性能有优化效果，默认开启。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateGame(levelId)
print(comp.EnableFontBatchRender(True))
```

</TabItem>
</Tabs>

---

### GetCustomUIControlProxyCls

<Client/>

模块级函数，直接调用。

获得原生界面自定义 UI 代理基类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetCustomUIControlProxyCls() -> type(CustomUIControlProxy)
```


**返回值**：type(CustomUIControlProxy)，原生界面自定义 UI 代理基类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
CustomUIControlProxy = clientApi.GetCustomUIControlProxyCls()
```

</TabItem>
</Tabs>

---

### GetMiniMapScreenNodeCls

<Client/>

模块级函数，直接调用。

获取小地图 ScreenNode 基类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetMiniMapScreenNodeCls() -> type(MiniMapBaseScreen)
```


**返回值**：type(MiniMapBaseScreen)，小地图 ScreenNode 基类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
MiniMapBaseScreen = clientApi.GetMiniMapScreenNodeCls()
```

</TabItem>
</Tabs>

---

### GetNativeScreenManagerCls

<Client/>

模块级函数，直接调用。

获得 NativeScreenManager 类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetNativeScreenManagerCls() -> type(NativeScreenManager)
```


**返回值**：type(NativeScreenManager)，NativeScreenManager 类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
NativeScreenManager = clientApi.GetNativeScreenManagerCls()
```

</TabItem>
</Tabs>

---

### GetScreenNodeCls

<Client/>

模块级函数，直接调用。

获得 ScreenNode 类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetScreenNodeCls() -> type(ScreenNode)
```


**返回值**：type(ScreenNode)，ScreenNode 类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
ScreenNode = clientApi.GetScreenNodeCls()
```

</TabItem>
</Tabs>

---

### GetTopScreen

<Client/>

模块级函数，直接调用。

获取 UI 堆栈栈顶的 UI 节点。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTopScreen() -> ScreenNode
```


**返回值**：ScreenNode，UI 节点，堆栈为空时返回 None。

**备注**

- 该接口获取最后一次 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 创建的界面，区别于 [GetTopUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#gettopui) 接口，GetTopScreen 仅可获取 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 创建的 UI，[GetTopUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#gettopui) 可获取创建的原生 UI 或 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 创建的 UI。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
node = clientApi.GetTopScreen()
```

</TabItem>
</Tabs>

---

### GetTopUI

<Client/>

模块级函数，直接调用。

获取 UI 栈顶的 UI 名称。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTopUI() -> str
```


**返回值**：str，最顶层的 UI 名称，如果弹出为原生 UI 则名称为([原生 UI 枚举](/docs/docs/scripts/modapi/enums#uicategory))。

**备注**

- 获取 UI 堆栈栈顶的 UI 名称，区别于 [GetTopScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#gettopscreen) 接口，GetTopUI 可获取原生 UI 及 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 生成的 UI，[GetTopScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#gettopscreen) 仅可获取 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 创建的 UI。
- 获取到 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 生成 UI 返回为 main，如果在 ui 的 json 文件中修改 main 名称，这里获得的返回值也会与之对应。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
TopUIName = clientApi.GetTopUI()
```

</TabItem>
</Tabs>

---

### GetTopUINode

<Client/>

模块级函数，直接调用。

获取 Push 进来的最顶层界面，包括原生界面，详见[界面创建流程及生命周期](https://mc.163.com/newdev/docs/mcguide/18-jiemianyujiaohu/30-ui-shuomingwendang.html#界面创建流程及生命周期)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetTopUINode() -> ScreenNode
```


**返回值**：ScreenNode，UI 节点。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
uiNode = clientApi.GetTopUINode()
```

</TabItem>
</Tabs>

---

### GetUI

<Client/>

模块级函数，直接调用。

获取 UI 节点，详见[界面创建流程及生命周期](https://mc.163.com/newdev/docs/mcguide/18-jiemianyujiaohu/30-ui-shuomingwendang.html#界面创建流程及生命周期)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUI(nameSpace: str, uiKey: str) -> ScreenNode
```

- nameSpace: str，命名空间，建议为 mod 名字。
- uiKey: str，UI 唯一标识。

**返回值**：ScreenNode，UI 节点。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
uiNode = clientApi.GetUI(modConfig.ModName, modConfig.FpsBattleUIName)
```

</TabItem>
</Tabs>

---

### GetUIScreenProxyCls

<Client/>

模块级函数，直接调用。

获得原生界面 Screen 代理基类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetUIScreenProxyCls() -> type(CustomUIControlProxy)
```


**返回值**：type(CustomUIControlProxy)，原生界面 Screen 代理基类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
CustomUIScreenProxy = clientApi.GetUIScreenProxyCls()
```

</TabItem>
</Tabs>

---

### GetViewBinderCls

<Client/>

模块级函数，直接调用。

获得 ViewBinder 类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetViewBinderCls() -> type(ViewBinder)
```


**返回值**：type(ViewBinder)，ViewBinder 类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
ViewBinder = clientApi.GetViewBinderCls()
```

</TabItem>
</Tabs>

---

### GetViewViewRequestCls

<Client/>

模块级函数，直接调用。

获得 ViewRequest 类。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetViewViewRequestCls() -> type(ViewRequest)
```


**返回值**：type(ViewRequest)，ViewRequest 类。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
ViewRequest = clientApi.GetViewViewRequestCls()
```

</TabItem>
</Tabs>

---

### OpenDeveloperHomeWindow

<Client/> NeteaseWindowCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseWindow(playerId)`

打开网易资源中心开发者主页。该接口只能在横屏版本手机端使用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenDeveloperHomeWindow(mailAddress: str) -> Any
```

- mailAddress: str，开发者邮箱。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateNeteaseWindow(playerId)
comp.OpenDeveloperHomeWindow("developer@163.com")
```

</TabItem>
</Tabs>

---

### OpenResourceCenterDetailWindow

<Client/> NeteaseWindowCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateNeteaseWindow(playerId)`

打开网易资源中心组件详情界面。该接口只能在横屏版本手机端使用。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
OpenResourceCenterDetailWindow(itemId: str) -> Any
```

- itemId: str，组件 id。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateNeteaseWindow(playerId)
comp.OpenResourceCenterDetailWindow("itemId")
```

</TabItem>
</Tabs>

---

### PopScreen

<Client/>

模块级函数，直接调用。

使用堆栈管理的方式关闭 UI。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PopScreen() -> bool
```


**返回值**：bool，是否关闭成功。

**备注**

- 该接口关闭由 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 创建的界面，区别于 [PopTopUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#poptopui) 接口，PopScreen 仅可弹出 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 创建的 UI，[PopTopUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#poptopui) 可弹出游戏原生 UI 及 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 创建的 UI。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
clientApi.PopScreen()
```

</TabItem>
</Tabs>

---

### PopTopUI

<Client/>

模块级函数，直接调用。

弹出 UI 栈顶的 UI。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PopTopUI() -> bool
```


**返回值**：bool，是否成功。

**备注**

- 弹出 UI 堆栈栈顶的 UI，区别于 [PopScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#popscreen) 接口，PopTopUI 可弹出原生 UI 及 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 生成的 UI，[PopScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#popscreen) 仅可弹出 [PushScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#pushscreen) 创建的 UI。
- 不允许在同一帧里面进行多次操作，只允许一帧弹出一个 UI。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
MyBool = clientApi.PopTopUI()
```

</TabItem>
</Tabs>

---

### PushScreen

<Client/>

模块级函数，直接调用。

使用堆栈管理的方式创建 UI。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PushScreen(
    namespace: str,
    uiname: str,
    createParams: Optional[Dict[str, Any]] = None,
) -> ScreenNode
```

- namespace: str，命名空间，建议为 mod 名字。
- uiname: str，UI 唯一标识。
- createParams: Optional[Dict[str, Any]]，创建 UI 的自定义参数，会传到 UI 类的_init_函数中，默认为 None。

**返回值**：ScreenNode，UI 节点，创建失败时返回 None。

**备注**

- 使用 [PopScreen](/docs/docs/scripts/modapi/interfaces/custom_ui/general#popscreen) 可以关闭该接口创建的界面。
- createParams 为自定义参数，该参数和 [CreateUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#createui) 方法中的 createParams 不同，不支持 [CreateUI](/docs/docs/scripts/modapi/interfaces/custom_ui/general#createui) 所列举的所有参数。
- 生成 UI 的 json 文件中 is_showing_menu 必须设置为 True。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
# 监听引擎初始化完成事件，在这个事件后创建我们的战斗UI
# 由于UI不会在PushScreen被调用后立即创建完成，请不要在Init函数中对控件进行操作，创建完成后会调用screenNode的Create函数
def OnUIInitFinished(self, args):
    clientApi.RegisterUI(modConfig.ModName, modConfig.FpsBattleUIName, modConfig.FpsBattleUIPyClsPath, modConfig.FpsBattleUIScreenDef)
    self.mFpsBattleUINode = clientApi.PushScreen(modConfig.ModName, modConfig.FpsBattleUIName)
    if self.mFpsBattleUINode:
        self.mFpsBattleUINode.Init()
```

</TabItem>
</Tabs>

---

### RegisterUI

<Client/>

模块级函数，直接调用。

注册 UI，创建 UI 前，需要先注册 UI。同一 UI 只需要注册一次即可。详见[界面创建流程及生命周期](https://mc.163.com/newdev/docs/mcguide/18-jiemianyujiaohu/30-ui-shuomingwendang.html#界面创建流程及生命周期)。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterUI(nameSpace: str, uiKey: str, clsPath: str, uiScreenDef: str) -> bool
```

- nameSpace: str，命名空间，建议为 mod 名字。
- uiKey: str，UI 唯一标识。
- clsPath: str，UI 类路径。
- uiScreenDef: str，UI 画布路径，格式为"namespace.screenName"。namespace 对应 uiJson 文件中"namespace"对应的值，UI 编辑器生成的 uiJson 文件该值等于文件名。screenName 对应想打开的画布的名称。

**返回值**：bool，是否注册成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
from mod_log import logger as logger
# 监听引擎初始化完成事件，在这个事件后创建我们的战斗UI
def OnUIInitFinished(self, args):
    logger.info("OnUIInitFinished : %s" % args)
    # 注册UI 详细解释参照《UI API》
    clientApi.RegisterUI(modConfig.ModName, modConfig.FpsBattleUIName, modConfig.FpsBattleUIPyClsPath, modConfig.FpsBattleUIScreenDef)
    # 创建UI 详细解释参照《UI API》
    clientApi.CreateUI(modConfig.ModName, modConfig.FpsBattleUIName, {"isHud" : 1})
    self.mFpsBattleUINode = clientApi.GetUI(modConfig.ModName, modConfig.FpsBattleUIName)
    if self.mFpsBattleUINode:
        self.mFpsBattleUINode.Init()
```

</TabItem>
</Tabs>

---

### RegisterUIAnimations

<Client/>

模块级函数，直接调用。

注册 UI 动画。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RegisterUIAnimations(data: Dict[str, Any], override: bool = True) -> bool
```

- data: Dict[str, Any]，动画的 json 数据，详见备注。
- override: bool，是否覆盖原先注册的同命名空间同名的动画（相当于对原先动画的修改），默认值是 True，表示覆盖（如果为 False，则会检测是否有覆盖，有的话会打印错误信息）。

**返回值**：bool，是否注册成功。

**备注**

- UI 属性动画相关，详见属性动画。
- 需要注意的是，动态注册的动画是不支持外部继承以及变量解析的，除此之外，这里是通过代码动态注入动画，实际上和用 json 写动画是一致的。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 准备动画的数据，其中必须要有 "namespace" 作为动画的命名空间
# 这里我们一次注册了两个动画片段，分别是 "alpha_animation_1" 以及 "alpha_animation_2"（一次可以注册多个回调，和写 ui json是一致的）
data = {
    "namespace": "alphaTest",
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
```

</TabItem>
</Tabs>

---

### UnregisterUIAnimation

<Client/>

模块级函数，直接调用。

取消 UI 动画的注册。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
UnregisterUIAnimation(namespace: str, defName: str) -> bool
```

- namespace: str，动画的命名空间。
- defName: str，动画的名称。

**返回值**：bool，是否取消注册成功。

**备注**

- UI 属性动画相关，详见属性动画。

</TabItem>
<TabItem value="示例" label="示例">

```python
# 取消 "alphaTest" 命名空间下的 "alpha_animation_1" 动画，后续无法通过 setAnimation 设置该动画到控件中
import mod.client.extraClientApi as clientApi
clientApi.UnregisterUIAnimation("alphaTest", "alpha_animation_1")
```

</TabItem>
</Tabs>

---
