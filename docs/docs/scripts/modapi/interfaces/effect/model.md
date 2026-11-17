---
sidebar_position: 2
---

# 模型特效

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录模型特效相关的接口，共 3 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/texiao/moxingtexiao.html"/>

---

### CreateEngineEffectBind

<Client/> ClientSystem

系统方法，在自定义 System 类中直接调用。

指用编辑器保存资源包中 models/bind/xxx_bind.json 生成编辑好的所有挂点的所有特效。生成的特效会自动进行挂接及播放，编辑器中设为不可见的特效也会进行播放。并且使用这种方式创建的特效，开发者不用维护 entity 进出视野导致的挂接特效被移除，引擎会在 entity 每次进入视野时自动创建所有特效。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
CreateEngineEffectBind(
    path: str,
    bindEntity: str,
    aniName: str,
) -> Optional[int]
```

- path: str，特效配置路径，需要包含 json 后缀名。
- bindEntity: str，绑定实体的 Id。
- aniName: str，选择使用哪个模型动作的特效。

**返回值**：Optional[int]，effectEntityId 或者 None。

**备注**

- 创建特效前需要将 entity 的骨骼模型替换为编辑器中的一致（或者其他骨骼相同的模型），否则将挂接失败，替换模型见服务端和客户端的 model 组件的 [SetModel](/docs/docs/scripts/modapi/interfaces/model#setmodel) 接口。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
class MyClientSystem(ClientSystem):
    # 创建
    def createEffect(self):
        # 绑定在本地玩家身上的模型特效
        effectEntityId = self.CreateEngineEffectBind("models/bind/xuenv_bind.json", clientApi.GetLocalPlayerId(), 'idle')

    # 删除
    def removeEffect(self, effectEntityId):
        self.DestroyEntity(effectEntityId)
```

</TabItem>
</Tabs>

---

### Pause

<Client/> EngineEffectBindControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateEngineEffectBindControl(effectEntityId)`

暂停模型特效（即使用 [CreateEngineEffectBind](/docs/docs/scripts/modapi/interfaces/effect/model#createengineeffectbind) 创建的特效）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Pause() -> bool
```


**返回值**：bool，True 表示设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateEngineEffectBindControl(effectEntityId)
comp.Pause()
```

</TabItem>
</Tabs>

---

### Resume

<Client/> EngineEffectBindControlComp

获取组件：`clientApi.GetEngineCompFactory().CreateEngineEffectBindControl(effectEntityId)`

继续播放模型特效（即使用 [CreateEngineEffectBind](/docs/docs/scripts/modapi/interfaces/effect/model#createengineeffectbind) 创建的特效）。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
Resume() -> bool
```


**返回值**：bool，True 表示设置成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import mod.client.extraClientApi as clientApi
comp = clientApi.GetEngineCompFactory().CreateEngineEffectBindControl(effectEntityId)
comp.Resume()
```

</TabItem>
</Tabs>

---
