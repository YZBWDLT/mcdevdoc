---
sidebar_position: 101
---

# 本地存储

import Version from '/src/components/highlight/version';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录本地存储相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/tongyong/bendicunchu.html"/>

要定位某个接口，在下面的接口速查里搜名称即可，支持模糊匹配和中文。

<Button text="接口速查" url="/quick_reference?k=modapi_interface" color="green"/>

---

### GetConfigData

<Version type="china" add="1.21"/>

<Client/> ConfigCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateConfigClient(clientApi.GetLevelId())`

获取本地配置文件中存储的数据。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
GetConfigData(configName: str, isGlobal: bool = False) -> Dict[str, Any]
```

- configName: str，配置名称，只能包含字母、数字和下划线字符，另外为了避免 addon 之间的冲突，建议加上 addon 的命名空间作为前缀。
- isGlobal: bool，存档配置 or 全局配置，默认为 False。

**返回值**：Dict[str, Any]，返回本地存储数据。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateConfigClient(clientApi.GetLevelId())
configDict = comp.GetConfigData("addon_namespace_global_config_name", True)
```

</TabItem>
</Tabs>

---

### SetConfigData

<Version type="china" add="1.21"/>

<Client/> ConfigCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateConfigClient(clientApi.GetLevelId())`

以本地配置文件的方式存储数据。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
SetConfigData(
    configName: str,
    value: Dict[str, Any],
    isGlobal: bool = False,
) -> bool
```

- configName: str，配置名称，只能包含字母、数字和下划线字符，另外为了避免 addon 之间的冲突，建议加上 addon 的命名空间作为前缀。
- value: Dict[str, Any]，数据。
- isGlobal: bool，为 True 时是全局配置，否则为存档配置，默认为 False。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateConfigClient(clientApi.GetLevelId())
data = {}
data["key"] = "value"
comp.SetConfigData("addon_namespace_global_config_name", data, True)
```

</TabItem>
</Tabs>

---
