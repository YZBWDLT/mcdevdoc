---
sidebar_position: 11
---

# 游戏设置

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录游戏设置相关的事件，共 4 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/shijian/youxishezhi.html"/>

---

### OnCustomGamepadChangedEvent

<Client/>

当自定义手柄按键绑定发生改变时触发。

```python
OnCustomGamepadChangedEvent(name: str, oldKey: str, newKey: str) -> Any
```

- name: str，按键名称。
- oldKey: str，旧的键码。
- newKey: str，新的键码。

---

### OnCustomGamepadPressInGame

<Client/>

当玩家按下自定义手柄按键时触发。

```python
OnCustomGamepadPressInGame(
    name: str,
    key: str,
    category: str,
    isDown: str,
    magnitude: float,
    x: float,
    y: float,
    screenName: str,
) -> Any
```

- name: str，按键名称。
- key: str，键码。
- category: str，按键分类。
- isDown: str，按下状态 ("1"为按下, "0"为抬起)，仅普通按键有效。
- magnitude: float，扳机力度 (0.0-1.0)，仅扳机键有效。
- x: float，摇杆 X 轴偏移 (-1.0-1.0)，仅摇杆键有效。
- y: float，摇杆 Y 轴偏移 (-1.0-1.0)，仅摇杆键有效。
- screenName: str，当前屏幕名称。

---

### OnCustomKeyChangedEvent

<Client/>

当自定义按键绑定发生改变时触发。

```python
OnCustomKeyChangedEvent(name: str, oldKey: str, newKey: str) -> Any
```

- name: str，按键名称。
- oldKey: str，旧的键码。
- newKey: str，新的键码。

---

### OnCustomKeyPressInGame

<Client/>

当玩家按下自定义按键时触发。

```python
OnCustomKeyPressInGame(name: str, key: str, category: str, isDown: str, screenName: str) -> Any
```

- name: str，按键名称。
- key: str，键码。
- category: str，按键分类。
- isDown: str，按下状态 ("1"为按下, "0"为抬起)。
- screenName: str，当前屏幕名称。

---
