---
sidebar_position: 5
---

# 自定义

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录自定义相关的接口，共 11 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/houchuli/zidingyi.html"/>

---

### AddPostProcess

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

添加后处理效果，与 graphics_settings/post_process.json 定义的 process 等效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
AddPostProcess(processDict: Dict[str, Any], index: int) -> bool
```

- processDict: Dict[str, Any]，process 的定义字典，格式参考 graphics_settings/post_process.json。
- index: int，插入位置下标，从 0 开始计数。可通过 [GetPostProcessOrder](/docs/docs/scripts/modapi/post_process/custom#getpostprocessorder) 接口获取，缺省或负值则默认添加到最后。

**返回值**：bool，连接操作是否成功，成功返回 True，失败则返回 False。

**备注**

- 调用这个接口的时候会启动后处理。

</TabItem>
<TabItem value="示例" label="示例">

```python
test = {
    "name": "oldtv",
    "enable": False,
    "paras": [
        { "name": "density", "value": 0.1, "range": [0.0, 1.0] },
        { "name": "strength", "value": 1.0, "range": [0.0, 1.0] },
        { "name": "snow_size", "value": 2.0, "range": [0.5, 16.0] },
        { "name": "noise_fps", "value": 6.0, "range": [0.01, 64.0] },
        { "name": "black_zone", "value": 0.2, "range": [0.0, 1.0] }
    ],
    "pass_array":[
        {
            "render_target":{
                "width":1.0,
                "height":1.0
            },
            "material":"old_tv"
        }
    ]
}
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
print postComp.AddPostProcess(test, 5)
```

</TabItem>
</Tabs>

---

### CheckEnabledByName

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

查询是否开启了自定义后处理效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CheckEnabledByName(name: str) -> bool
```

- name: str，需要查询的后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。

**返回值**：bool，是否已经开启。已开启返回 True，否则返回 False。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 查询名为"my_custom_postprocess"的自定义后处理效果是否已经开启
print postComp.CheckEnabledByName("my_custom_postprocess")
```

</TabItem>
</Tabs>

---

### GetParameter

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

获取指定自定义后处理参数的值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetParameter(postName: str, paramName: str) -> Any
```

- postName: str，需要获取的后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。
- paramName: str，需要的参数名，名称来自后处理效果定义中的 paras 字段。

**返回值**：Any，后处理参数的值，如果该参数的长度只有 1 个值，则返回 float，如果长度超过 1 个，则返回 list，list 的长度不超过 4。返回失败则返回 None。

**备注**

- 该接口仅支持获取自定义后处理的参数。获取参数时，需要先开启过一次后处理才能成功获取。否则获取失败返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 获取自定义后处理"my_custom_postprocess"中名为“radius”的参数的值
print postComp.GetParameter("my_custom_postprocess", "radius")
```

</TabItem>
</Tabs>

---

### GetPostProcessOrder

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

获取后处理效果的渲染顺序。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetPostProcessOrder() -> List[str]
```


**返回值**：List[str]，后处理效果的渲染顺序，获取失败或未开启后处理返回 None。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
print postComp.GetPostProcessOrder()
```

</TabItem>
</Tabs>

---

### InsertPassToPostprocess

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

往自定义后处理的多 pass 中的指定位置插入自定义 pass。多 pass 指定的是 graphics_settings/post_process.json 中的"pass_array"渲染 pass 数组。这个后处理会按照这个数组所定义的 pass 来逐个渲染，每个 pass 之间的像素输入输出相互连接，即 pass 数组中第一个 pass 所使用的 fragment shader 中的 TEXTURE_0 为游戏原始输出到屏幕的像素信息。下一个 pass 所使用的 fragment shader 中的 TEXTURE_0 为上一个 Pass 的 fragment shader 的输出。最后一个 pass 的 fragment shader 的输出即为输出到游戏屏幕的像素信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
InsertPassToPostprocess(postName: str, index: int, passDict: Dict[str, Any]) -> bool
```

- postName: str，需要增加自定义 pass 的后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。
- index: int，自定义 pass 插入的位置下标。下标的范围不能超过该自定义后处理目前包含的 pass 数组的大小，同时必须大于等于 0。
- passDict: Dict[str, Any]，自定义 pass 的定义字典。

**返回值**：bool，插入操作是否成功，成功返回 True，失败则返回 False。

**备注**

- 该接口仅支持对自定义后处理进行操作。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 自定义pass字典
passDict = {
    # 渲染目标的分辨率大小,值范围为(0,1]。1.0表示全屏幕。
    "render_target":{
        "width":1.0,
        "height":1.0
    },
    # 这个自定义pass所使用的材质，定义在materials/postprocess.material中
    "material":"scan_map",
    # 可选，是否启动深度图。开启后可以在片元着色器中的使用TEXTURE_2拿到深度图。
    "depth_enable": True
}
# 往自定义后处理"my_custom_postprocess"中增加一个自定义pass，插入位置为第一个。
print postComp.InsertPassToPostprocess("my_custom_postprocess", 0, passDict)
```

</TabItem>
</Tabs>

---

### PopBackPassInPostprocess

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

删除自定义后处理的多 pass 的最末尾的 pass。多 pass 指定的是 graphics_settings/post_process.json 中的"pass_array"渲染 pass 数组。这个后处理会按照这个数组所定义的 pass 来逐个渲染，每个 pass 之间的像素输入输出相互连接，即 pass 数组中第一个 pass 所使用的 fragment shader 中的 TEXTURE_0 为游戏原始输出到屏幕的像素信息。下一个 pass 所使用的 fragment shader 中的 TEXTURE_0 为上一个 Pass 的 fragment shader 的输出。最后一个 pass 的 fragment shader 的输出即为输出到游戏屏幕的像素信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PopBackPassInPostprocess(postName: str) -> Dict[str, Any]
```

- postName: str，需要删除自定义 pass 的后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。

**返回值**：Dict[str, Any]，包含所删除的自定义 pass 的数据字典。删除失败则返回 None。

**备注**

- 该接口仅支持对自定义后处理进行操作。另外，由于 python 浮点数值精度问题，返回的数据字典中的浮点数可能会带有小数点后多位的现象，例如 width 的值原本为 0.1，则返回的数据字典中 width 的值可能会变为 0.10000000149，请注意。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 删除自定义后处理"my_custom_postprocess"中包含的多pass最末尾的自定义pass。
print postComp.PopBackPassInPostprocess("my_custom_postprocess")
```

</TabItem>
</Tabs>

---

### PostPassResultToOtherPass

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

将自定义 pass 的纹理结果传递到其他自定义 pass 的 fragmentShader 指定纹理单元槽位。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PostPassResultToOtherPass(
    sourceProcessName: str,
    sourcePassIndex: int,
    destProcessName: str,
    destPassIndex: int,
    glTextureIndex: int,
) -> bool
```

- sourceProcessName: str，发送纹理单元的自定义 pass 的后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。
- sourcePassIndex: int，源 process 中需要传递的自定义 pass 在 process 中的下标，从 0 开始计数。
- destProcessName: str，接收纹理单元的自定义 pass 的后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。
- destPassIndex: int，接收的 process 中自定义 pass 在 process 中的下标，从 0 开始计数。
- glTextureIndex: int，接收 pass 中 framentShader 中的纹理单元槽位，取值范围 3~7，0~2 已被占用，0 为上个 pass 处理后的颜色缓冲，1 为未做后处理的原始颜色缓冲，2 为深度缓冲。

**返回值**：bool，连接操作是否成功，成功返回 True，失败则返回 False。

**备注**

- sourceProcessName 的 pass 执行顺序必须在 destProcessName 的 pass 之前执行。sourceProcessName 和 destProcessName 可相同。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 将名为test1的后处理效果中第一个pass处理完的纹理单元，发送给名为test2的后处理效果中第二个pass的fragmentShader中的纹理单元槽位3。
print postComp.PostPassResultToOtherPass("test1", 0, "test2", 1, 3)
# 将名为test1的后处理效果中第一个pass处理完的纹理单元，发送给名为test1的后处理效果中第二个pass的fragmentShader中的纹理单元槽位5。
print postComp.PostPassResultToOtherPass("test1", 0, "test1", 1, 5)
```

</TabItem>
</Tabs>

---

### PushBackPassToPostprocess

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

往自定义后处理的多 pass 最末尾插入自定义 pass。多 pass 指定的是 graphics_settings/post_process.json 中的"pass_array"渲染 pass 数组。这个后处理会按照这个数组所定义的 pass 来逐个渲染，每个 pass 之间的像素输入输出相互连接，即 pass 数组中第一个 pass 所使用的 fragment shader 中的 TEXTURE_0 为游戏原始输出到屏幕的像素信息。下一个 pass 所使用的 fragment shader 中的 TEXTURE_0 为上一个 Pass 的 fragment shader 的输出。最后一个 pass 的 fragment shader 的输出即为输出到游戏屏幕的像素信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
PushBackPassToPostprocess(postName: str, passDict: Dict[str, Any]) -> bool
```

- postName: str，需要增加自定义 pass 的后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。
- passDict: Dict[str, Any]，自定义 pass 的定义字典。

**返回值**：bool，插入操作是否成功，成功返回 True，失败则返回 False。

**备注**

- 该接口仅支持对自定义后处理进行操作。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 自定义pass字典
passDict = {
    # 渲染目标的分辨率大小,值范围为(0,1]。1.0表示全屏幕。
    "render_target":{
        "width":1.0,
        "height":1.0
    },
    # 这个自定义pass所使用的材质，定义在materials/postprocess.material中
    "material":"scan_map",
    # 可选，是否启动深度图。开启后可以在片元着色器中的使用TEXTURE_2拿到深度图。
    "depth_enable": true
}
# 往自定义后处理"my_custom_postprocess"中的包含的多pass最末尾增加一个自定义pass。
print postComp.PushBackPassToPostprocess("my_custom_postprocess", passDict)
```

</TabItem>
</Tabs>

---

### RemovePassInPostprocess

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

删除自定义后处理的多 pass 中指定位置的 pass。多 pass 指定的是 graphics_settings/post_process.json 中的"pass_array"渲染 pass 数组。这个后处理会按照这个数组所定义的 pass 来逐个渲染，每个 pass 之间的像素输入输出相互连接，即 pass 数组中第一个 pass 所使用的 fragment shader 中的 TEXTURE_0 为游戏原始输出到屏幕的像素信息。下一个 pass 所使用的 fragment shader 中的 TEXTURE_0 为上一个 Pass 的 fragment shader 的输出。最后一个 pass 的 fragment shader 的输出即为输出到游戏屏幕的像素信息。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
RemovePassInPostprocess(postName: str, index: int) -> Dict[str, Any]
```

- postName: str，需要删除自定义 pass 的后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。
- index: int，需要删除的自定义 pass 的位置下标。下标的范围不能大于或等于该自定义后处理目前包含的 pass 数组的大小，同时必须大于等于 0。

**返回值**：Dict[str, Any]，包含所删除的自定义 pass 的数据字典。删除失败则返回 None。

**备注**

- 该接口仅支持对自定义后处理进行操作。另外，由于 python 浮点数值精度问题，返回的数据字典中的浮点数可能会带有小数点后多位的现象，例如 width 的值原本为 0.1，则返回的数据字典中 width 的值可能会变为 0.10000000149，请注意。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
# 删除自定义后处理"my_custom_postprocess"中包含的多pass中第二个自定义pass。
print postComp.RemovePassInPostprocess("my_custom_postprocess", 1)
```

</TabItem>
</Tabs>

---

### SetEnableByName

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置是否开启自定义后处理效果。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetEnableByName(name: str, enable: bool) -> bool
```

- name: str，后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。
- enable: bool，是否开启自定义效果，True 为开启，False 为关闭。

**返回值**：bool，设置是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
postComp.SetEnableByName(myPostName, True)
```

</TabItem>
</Tabs>

---

### SetParameter

<Client/> PostProcessComponent

获取组件：`clientApi.GetEngineCompFactory().CreatePostProcess(levelId)`

设置自定义后处理 shader 的自定义参数值。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetParameter(postName: str, paramName: str, paramValue: Any) -> bool
```

- postName: str，要修改的后处理效果名，名称为 graphics_settings/post_process.json 中定义的后处理效果名。
- paramName: str，要修改的参数名，名称来自后处理效果定义中的 paras 字段。
- paramValue: Any，修改后的后处理参数值，长度必须与 post_process.json 中对应的参数定义一致(float/list/tuple)。

**返回值**：bool，设置是否成功。

**备注**

- 该接口仅支持修改自定义后处理的参数。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
postComp = clientApi.GetEngineCompFactory().CreatePostProcess(levelId)
postComp.SetParameter(myPostName, paramName, [0.0, 0.0, 0.0]) # 设置某个三维参数值为全0向量
```

</TabItem>
</Tabs>

---
