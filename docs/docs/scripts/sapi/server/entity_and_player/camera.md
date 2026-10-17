---
sidebar_position: 8
---

# 相机

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录相机相关接口。

---

## 相机

### Camera 类

<Version type="script" add="1.6.0"/>

控制玩家视角的相机，每个玩家拥有一个实例，可通过`Player.camera`获取。

```typescript
class Camera {
    private constructor();
    readonly isValid: boolean;
    addShake(shakeCameraOptions: CameraShakeOptions): void;
    attachToEntity(attachCameraOptions?: CameraAttachOptions): void;
    clear(): void;
    fade(fadeCameraOptions?: CameraFadeOptions): void;
    playAnimation(splineType: CatmullRomSpline | LinearSpline, cameraAnimationOptions: AnimationOptions): void;
    setCamera(
        cameraPreset: string,
        setOptions?:
            | CameraFixedBoomOptions
            | CameraSetFacingOptions
            | CameraSetLocationOptions
            | CameraSetPosOptions
            | CameraSetRotOptions
            | CameraTargetOptions,
    ): void;
    setDefaultCamera(cameraPreset: string, easeOptions?: EaseOptions): void;
    setFov(fovCameraOptions?: CameraFovOptions): void;
    stopShaking(): void;
    setCameraWithEase(cameraPreset: string, easeOptions: EaseOptions): void;
}
```

#### 属性

- <Version type="script" add="2.0.0" inline/> <ReadOnly/> isValid: boolean，该相机是否可以访问和使用；其所属玩家已加载且有效时，相机才有效。

#### addShake 方法

<Version type="script" add="2.10.0" inline/> <RestrictedMode inline/>

为相机添加一次震动。

```typescript
addShake(shakeCameraOptions: CameraShakeOptions): void
```

- shakeCameraOptions: [CameraShakeOptions](#camerashakeoptions-接口)，震动的参数。

#### attachToEntity 方法

<Version type="script" add="2.6.0" inline/> <RestrictedMode inline/>

把相机附着到指定实体上，使其跟随该实体。

```typescript
attachToEntity(attachCameraOptions?: CameraAttachOptions): void
```

- attachCameraOptions?: [CameraAttachOptions](#cameraattachoptions-接口)，附着相机时使用的选项（可选）。

#### clear 方法

<RestrictedMode inline/>

清除相机当前的设置，恢复为默认视角。

```typescript
clear(): void
```

#### fade 方法

<RestrictedMode inline/>

使屏幕淡入到指定颜色，保持一段时间后再淡出回正常画面。

```typescript
fade(fadeCameraOptions?: CameraFadeOptions): void
```

- fadeCameraOptions?: [CameraFadeOptions](#camerafadeoptions-接口)，淡入淡出的颜色与时长选项（可选）。

#### playAnimation 方法

<Version type="script" add="2.6.0" inline/> <RestrictedMode inline/>

按指定的样条曲线播放一段相机动画。

```typescript
playAnimation(
    splineType: CatmullRomSpline | LinearSpline,
    cameraAnimationOptions: AnimationOptions,
): void
```

- splineType: [CatmullRomSpline](#catmullromspline-类) | [LinearSpline](#linearspline-类)，相机运动的样条曲线。
- cameraAnimationOptions: [AnimationOptions](#animationoptions-接口)，动画的参数。

#### setCamera 方法

<RestrictedMode inline/>

把相机切换到指定的预设，并可附带位置、朝向等设置。

```typescript
setCamera(
    cameraPreset: string,
    setOptions?:
        | CameraFixedBoomOptions
        | CameraSetFacingOptions
        | CameraSetLocationOptions
        | CameraSetPosOptions
        | CameraSetRotOptions
        | CameraTargetOptions,
): void
```

- cameraPreset: string，要切换到的相机预设标识符。
- setOptions?: [CameraFixedBoomOptions](#camerafixedboomoptions-接口) | [CameraSetFacingOptions](#camerasetfacingoptions-接口) | [CameraSetLocationOptions](#camerasetlocationoptions-接口) | [CameraSetPosOptions](#camerasetposoptions-接口) | [CameraSetRotOptions](#camerasetrotoptions-接口) | [CameraTargetOptions](#cameratargetoptions-接口)，相机的附加设置（可选）。

#### setDefaultCamera 方法

<Version type="script" add="2.0.0" inline/> <RestrictedMode inline/>

设置玩家的默认相机预设，可指定缓动过渡。

```typescript
setDefaultCamera(cameraPreset: string, easeOptions?: EaseOptions): void
```

- cameraPreset: string，默认相机预设的标识符。
- easeOptions?: [EaseOptions](#easeoptions-接口)，过渡的缓动选项（可选）。

#### setFov 方法

<Version type="script" add="2.2.0" inline/> <RestrictedMode inline/>

设置相机的视野（FOV），可指定缓动过渡。

```typescript
setFov(fovCameraOptions?: CameraFovOptions): void
```

- fovCameraOptions?: [CameraFovOptions](#camerafovoptions-接口)，视野与缓动选项（可选）。

#### stopShaking 方法

<Version type="script" add="2.10.0" inline/> <RestrictedMode inline/>

停止该相机当前正在进行的震动。

```typescript
stopShaking(): void
```

#### setCameraWithEase 方法

<Version type="script" experimental="测试版API" inline/> <RestrictedMode inline/>

以缓动过渡的方式把相机切换到指定预设。

```typescript
setCameraWithEase(cameraPreset: string, easeOptions: EaseOptions): void
```

- cameraPreset: string，要切换到的相机预设标识符。
- easeOptions: [EaseOptions](#easeoptions-接口)，过渡的缓动选项。

---

## 视野与淡入淡出

### CameraFovOptions 接口

<Version type="script" add="2.2.0"/>

设置视野（FOV）时使用的选项。

```typescript
interface CameraFovOptions {
    easeOptions?: EaseOptions;
    fov?: number;
}
```

#### 属性

- <Optional/> easeOptions: [EaseOptions](#easeoptions-接口)，过渡时使用的缓动选项。
- <Optional/> fov: number，要设置的视野角度，以度为单位。

### CameraFadeOptions 接口

<Version type="script" add="1.6.0"/>

屏幕淡入淡出时使用的选项。

```typescript
interface CameraFadeOptions {
    fadeColor?: RGB;
    fadeTime?: CameraFadeTimeOptions;
}
```

#### 属性

- <Optional/> fadeColor: [RGB](../../server/general#rgb-接口)，淡入淡出时屏幕呈现的颜色；不指定时使用黑色。
- <Optional/> fadeTime: [CameraFadeTimeOptions](#camerafadetimeoptions-接口)，淡入淡出各阶段的时长。

### CameraFadeTimeOptions 接口

<Version type="script" add="1.6.0"/>

屏幕淡入淡出各阶段的时长，以秒为单位。

```typescript
interface CameraFadeTimeOptions {
    fadeInTime: number;
    fadeOutTime: number;
    holdTime: number;
}
```

#### 属性

- fadeInTime: number，淡入到目标颜色的时长。
- fadeOutTime: number，从目标颜色淡出回正常画面的时长。
- holdTime: number，保持在目标颜色上的时长。

---

## 相机设置

### CameraSetLocationOptions 接口

<Version type="script" add="1.6.0"/>

把相机放到指定位置时使用的选项。

```typescript
interface CameraSetLocationOptions {
    easeOptions?: EaseOptions;
    location: Vector3;
}
```

#### 属性

- <Optional/> easeOptions: [EaseOptions](#easeoptions-接口)，过渡时使用的缓动选项。
- location: [Vector3](../../server/general#vector3-接口)，相机的目标位置。

### CameraSetPosOptions 接口

<Version type="script" add="1.6.0"/>

同时指定相机位置与朝向位置时使用的选项。

```typescript
interface CameraSetPosOptions {
    easeOptions?: EaseOptions;
    facingLocation: Vector3;
    location?: Vector3;
}
```

#### 属性

- <Optional/> easeOptions: [EaseOptions](#easeoptions-接口)，过渡时使用的缓动选项。
- facingLocation: [Vector3](../../server/general#vector3-接口)，相机要朝向的位置。
- <Optional/> location: [Vector3](../../server/general#vector3-接口)，相机所在的位置。

### CameraSetRotOptions 接口

<Version type="script" add="1.6.0"/>

指定相机位置与旋转角度时使用的选项。

```typescript
interface CameraSetRotOptions {
    easeOptions?: EaseOptions;
    location?: Vector3;
    rotation: Vector2;
}
```

#### 属性

- <Optional/> easeOptions: [EaseOptions](#easeoptions-接口)，过渡时使用的缓动选项。
- <Optional/> location: [Vector3](../../server/general#vector3-接口)，相机所在的位置。
- rotation: [Vector2](../../server/general#vector2-接口)，相机的旋转角度，按俯仰角与偏航角表示。

### CameraSetFacingOptions 接口

<Version type="script" add="1.6.0"/>

把相机朝向指定实体时使用的选项。

```typescript
interface CameraSetFacingOptions {
    easeOptions?: EaseOptions;
    facingEntity: Entity;
    location?: Vector3;
}
```

#### 属性

- <Optional/> easeOptions: [EaseOptions](#easeoptions-接口)，过渡时使用的缓动选项。
- facingEntity: [Entity](../../server/entity_and_player/entity#entity-类)，相机要朝向的实体。
- <Optional/> location: [Vector3](../../server/general#vector3-接口)，相机所在的位置。

### CameraFixedBoomOptions 接口

<Version type="script" add="1.18.0"/>

固定镜头预设的附加选项，用于调整相对实体的偏移。

```typescript
interface CameraFixedBoomOptions {
    entityOffset?: Vector3;
    viewOffset?: Vector2;
}
```

#### 属性

- <Optional/> entityOffset: [Vector3](../../server/general#vector3-接口)，相机相对所跟踪实体的位置偏移。
- <Optional/> viewOffset: [Vector2](../../server/general#vector2-接口)，画面在屏幕上的偏移量。

### CameraTargetOptions 接口

<Version type="script" add="1.17.0"/>

相机跟踪目标实体时使用的选项。

```typescript
interface CameraTargetOptions {
    offsetFromTargetCenter?: Vector3;
    targetEntity: Entity;
}
```

#### 属性

- <Optional/> offsetFromTargetCenter: [Vector3](../../server/general#vector3-接口)，相机相对目标实体中心的偏移。
- targetEntity: [Entity](../../server/entity_and_player/entity#entity-类)，相机要跟踪的目标实体。

---

## 震动

### CameraShakeOptions 接口

<Version type="script" add="2.10.0"/>

相机震动的参数。

```typescript
interface CameraShakeOptions {
    duration: number;
    intensity: number;
    type: CameraShakeType;
}
```

#### 属性

- duration: number，震动持续的时长，以秒为单位。
- intensity: number，震动的强度。
- type: [CameraShakeType](#camerashaketype-枚举)，震动的类型。

### CameraShakeType 枚举

<Version type="script" add="2.10.0"/>

相机震动的类型。

```typescript
enum CameraShakeType {
    Positional = "Positional", // 位置震动，相机的位置发生抖动
    Rotational = "Rotational", // 旋转震动，相机的角度发生抖动
}
```

---

## 动画与缓动

### AnimationOptions 接口

<Version type="script" add="2.6.0"/>

播放相机动画时使用的选项。

```typescript
interface AnimationOptions {
    animation: SplineAnimation;
    totalTimeSeconds: number;
}
```

#### 属性

- animation: [SplineAnimation](#splineanimation-接口)，要播放的样条动画。
- totalTimeSeconds: number，动画的总时长，以秒为单位。

### SplineAnimation 接口

<Version type="script" add="2.6.0"/>

沿样条曲线播放的相机动画。

```typescript
interface SplineAnimation {
    progressKeyFrames: ProgressKeyFrame[];
    rotationKeyFrames: RotationKeyFrame[];
}
```

#### 属性

- progressKeyFrames: [ProgressKeyFrame](#progresskeyframe-接口)[]，沿曲线控制进度变化的关键帧。
- rotationKeyFrames: [RotationKeyFrame](#rotationkeyframe-接口)[]，沿曲线控制旋转变化的关键帧。

### ProgressKeyFrame 接口

<Version type="script" add="2.6.0"/>

样条动画中控制进度变化的关键帧。

```typescript
interface ProgressKeyFrame {
    alpha: number;
    easingFunc?: EasingType;
    timeSeconds: number;
}
```

#### 属性

- alpha: number，该关键帧对应的进度值，取值范围为 0 到 1。
- <Optional/> easingFunc: [EasingType](#easingtype-枚举)，从前一关键帧过渡到该关键帧时使用的缓动函数。
- timeSeconds: number，该关键帧的时间点，以秒为单位。

### RotationKeyFrame 接口

<Version type="script" add="2.6.0"/>

样条动画中控制旋转变化的关键帧。

```typescript
interface RotationKeyFrame {
    easingFunc?: EasingType;
    rotation: Vector3;
    timeSeconds: number;
}
```

#### 属性

- <Optional/> easingFunc: [EasingType](#easingtype-枚举)，从前一关键帧过渡到该关键帧时使用的缓动函数。
- rotation: [Vector3](../../server/general#vector3-接口)，该关键帧的旋转角度。
- timeSeconds: number，该关键帧的时间点，以秒为单位。

### CatmullRomSpline 类

<Version type="script" add="2.6.0"/>

由控制点定义的 Catmull-Rom 样条曲线。

```typescript
class CatmullRomSpline {
    controlPoints: Vector3[];
}
```

#### 属性

- <RestrictedMode inline/> controlPoints: [Vector3](../../server/general#vector3-接口)[]，样条曲线的控制点。

### LinearSpline 类

<Version type="script" add="2.6.0"/>

由控制点定义的线性样条曲线。

```typescript
class LinearSpline {
    controlPoints: Vector3[];
}
```

#### 属性

- <RestrictedMode inline/> controlPoints: [Vector3](../../server/general#vector3-接口)[]，样条曲线的控制点。

### EaseOptions 接口

<Version type="script" add="2.0.0"/>

缓动过渡的选项。

```typescript
interface EaseOptions {
    easeTime?: number;
    easeType?: EasingType;
}
```

#### 属性

- <Optional/> easeTime: number，过渡的时长，以秒为单位。
- <Optional/> easeType: [EasingType](#easingtype-枚举)，过渡使用的缓动类型。

### EasingType 枚举

<Version type="script" add="1.6.0"/>

缓动函数的类型。

```typescript
enum EasingType {
    InBack = "InBack", // 缓入，起始处先回退
    InBounce = "InBounce", // 缓入，起始处带弹跳
    InCirc = "InCirc", // 缓入，圆形曲线
    InCubic = "InCubic", // 缓入，三次曲线
    InElastic = "InElastic", // 缓入，带弹性
    InExpo = "InExpo", // 缓入，指数曲线
    InOutBack = "InOutBack", // 缓入缓出，两端先回退
    InOutBounce = "InOutBounce", // 缓入缓出，两端带弹跳
    InOutCirc = "InOutCirc", // 缓入缓出，圆形曲线
    InOutCubic = "InOutCubic", // 缓入缓出，三次曲线
    InOutElastic = "InOutElastic", // 缓入缓出，带弹性
    InOutExpo = "InOutExpo", // 缓入缓出，指数曲线
    InOutQuad = "InOutQuad", // 缓入缓出，二次曲线
    InOutQuart = "InOutQuart", // 缓入缓出，四次曲线
    InOutQuint = "InOutQuint", // 缓入缓出，五次曲线
    InOutSine = "InOutSine", // 缓入缓出，正弦曲线
    InQuad = "InQuad", // 缓入，二次曲线
    InQuart = "InQuart", // 缓入，四次曲线
    InQuint = "InQuint", // 缓入，五次曲线
    InSine = "InSine", // 缓入，正弦曲线
    Linear = "Linear", // 匀速，无缓动
    OutBack = "OutBack", // 缓出，末尾回退
    OutBounce = "OutBounce", // 缓出，末尾弹跳
    OutCirc = "OutCirc", // 缓出，圆形曲线
    OutCubic = "OutCubic", // 缓出，三次曲线
    OutElastic = "OutElastic", // 缓出，带弹性
    OutExpo = "OutExpo", // 缓出，指数曲线
    OutQuad = "OutQuad", // 缓出，二次曲线
    OutQuart = "OutQuart", // 缓出，四次曲线
    OutQuint = "OutQuint", // 缓出，五次曲线
    OutSine = "OutSine", // 缓出，正弦曲线
    Spring = "Spring", // 弹簧效果
}
```

---

## 附着

### CameraAttachOptions 接口

<Version type="script" add="2.6.0"/>

把相机附着到实体时使用的选项。

```typescript
interface CameraAttachOptions {
    entity: Entity;
    locator: EntityAttachPoint;
}
```

#### 属性

- entity: [Entity](../../server/entity_and_player/entity#entity-类)，相机要附着到的实体。
- locator: [EntityAttachPoint](#entityattachpoint-枚举)，实体上用于挂载相机的附着点。

### EntityAttachPoint 枚举

<Version type="script" add="2.6.0"/>

实体上可用于附着相机的部位。

```typescript
enum EntityAttachPoint {
    Body = "Body", // 躯干
    BreathingPoint = "BreathingPoint", // 呼吸点
    DropAttachPoint = "DropAttachPoint", // 掉落物附着点
    ExplosionPoint = "ExplosionPoint", // 爆炸点
    Eyes = "Eyes", // 眼睛
    Feet = "Feet", // 脚部
    Head = "Head", // 头部
    Mouth = "Mouth", // 嘴部
    WeaponAttachPoint = "WeaponAttachPoint", // 武器附着点
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
