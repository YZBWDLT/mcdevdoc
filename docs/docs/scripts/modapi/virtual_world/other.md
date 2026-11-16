---
sidebar_position: 2
---

# 其它对象

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Button from '/src/components/button/base';
import Server from '/src/components/highlight/server';
import Client from '/src/components/highlight/client';

> 适用版本：中国版 3.10。仅中国版可用。

本文主要记录其它对象相关的接口，共 2 个。

<Button text="网易官方文档" url="https://mc.163.com/newdev/docs/api/jiekou/xunishijie/qitaduixiang.html"/>

---

### BindModel

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

把对象绑定到模型上, 支持绑定序列帧，粒子，文本和其它模型。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
BindModel(
    virtualWorldObjectType: int,
    objId: int,
    targetId: int,
    posOffset: Tuple[float, float, float],
    rotOffset: Tuple[float, float, float],
    boneName: str,
) -> bool
```

- virtualWorldObjectType: int，对象类型枚举, 支持 VirtualWorldObjectType.Sfx, VirtualWorldObjectType.Textboard 和 VirtualWorldObjectType.Particle, VirtualWorldObjectType.Model。
- objId: int，要被绑定的对象的 id。
- targetId: int，绑定到的目标对象的 id, 该对象删掉时，绑定在上面的对象也会删除。
- posOffset: Tuple[float, float, float]，绑定后相对目标的位置偏移。
- rotOffset: Tuple[float, float, float]，绑定后相对目标的旋转角度偏移。
- boneName: str，要绑定到目标对象哪个骨骼，默认为 root。

**返回值**：bool，是否成功。

**备注**

- 模型绑定模型暂时不支持绑定到具体骨骼。
- 模型绑定仅支持原版模型绑定原版模型，或者网易骨骼模型绑定网易骨骼模型，不支持原版模型绑定到网易骨骼模型这种类型交错的绑定。
- 序列帧，文本，粒子的生命周期与可见性需要玩家自己管理，虚拟世界在隐藏或者销毁时不做处理。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
VirtualWorldObjectType = clientApi.GetMinecraftEnum().VirtualWorldObjectType
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())
objId = virtualWorldComp.ModelCreateObject("datiangou", "run")

# 序列帧
frameEntityId = self.CreateEngineSfx("textures/sfxs/testSfx")
frameAniTransComp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
frameAniControlComp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
frameAniControlComp.SetLoop(True)
frameAniControlComp.Play()
virtualWorldComp.BindModel(VirtualWorldObjectType.Sfx, frameEntityId, objId, (0.0, 3.0, 0.0), (0.0, 0.0, 0.0), "root")

# 文本
textBoardComp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
textBoardId = textBoardComp.CreateTextBoardInWorld("Hello", (0.5, 0.4, 0.3, 0.8), (0, 0, 0, 1), True)
virtualWorldComp.BindModel(VirtualWorldObjectType.Textboard, textBoardId, objId, (0.0, 3.0, 0.0), (0.0, 0.0, 0.0), "root")

# 粒子
particleEntityId = self.CreateEngineParticle("effects/testParticle.json", (0.0, 0.0, 0.0))
parComp = clientApi.GetEngineCompFactory().CreateParticleControl(particleEntityId)
parComp.Play()
virtualWorldComp.BindModel(VirtualWorldObjectType.Particle, particleEntityId, objId, (0.0, 3.0, 0.0), (0.0, 0.0, 0.0), "root")

# 模型
childObj = virtualWorldComp.ModelCreateObject("datiangou", "fengxi")
virtualWorldComp.BindModel(VirtualWorldObjectType.Model, childObj, objId, (-1.0, 0.0, 0.0), (0.0, 0.0, 0.0))
```

</TabItem>
</Tabs>

---

### MoveToVirtualWorld

<Client/> VirtualWorldCompClient

获取组件：`clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())`

把对象从主世界移到虚拟世界, 非绑定的序列帧，文本，粒子需要调用该方法后才会出现在虚拟世界中，绑定的可以省略调用该方法。

<Tabs>
<TabItem value="说明" label="说明" default>

```python
MoveToVirtualWorld(virtualWorldObjectType: int, objId: int) -> bool
```

- virtualWorldObjectType: int，对象类型枚举, 支持 VirtualWorldObjectType.Sfx, VirtualWorldObjectType.Textboard 和 VirtualWorldObjectType.Particle。
- objId: int，要移动的对象的 id。

**返回值**：bool，是否成功。

</TabItem>
<TabItem value="示例" label="示例">

```python
import client.extraClientApi as clientApi
VirtualWorldObjectType = clientApi.GetMinecraftEnum().VirtualWorldObjectType
virtualWorldComp = clientApi.GetEngineCompFactory().CreateVirtualWorld(clientApi.GetLevelId())

# 序列帧
frameEntityId = self.CreateEngineSfx("textures/sfxs/testSfx")
frameAniTransComp = clientApi.GetEngineCompFactory().CreateFrameAniTrans(frameEntityId)
frameAniTransComp.SetPos((0.0, 0.0, 0.0))
frameAniControlComp = clientApi.GetEngineCompFactory().CreateFrameAniControl(frameEntityId)
frameAniControlComp.SetLoop(True)
frameAniControlComp.Play()
virtualWorldComp.MoveToVirtualWorld(VirtualWorldObjectType.Sfx, frameEntityId)

# 文本
textBoardComp = clientApi.GetEngineCompFactory().CreateTextBoard(clientApi.GetLevelId())
textBoardId = textBoardComp.CreateTextBoardInWorld("Hello", (0.5, 0.4, 0.3, 0.8), (0, 0, 0, 1), True)
virtualWorldComp.MoveToVirtualWorld(VirtualWorldObjectType.Textboard, textBoardId)

# 粒子
particleEntityId = self.CreateEngineParticle("effects/testParticle.json", (0.0, 0.0, 0.0))
parComp = clientApi.GetEngineCompFactory().CreateParticleControl(particleEntityId)
parComp.Play()
virtualWorldComp.MoveToVirtualWorld(VirtualWorldObjectType.Particle, particleEntityId)
```

</TabItem>
</Tabs>

---
