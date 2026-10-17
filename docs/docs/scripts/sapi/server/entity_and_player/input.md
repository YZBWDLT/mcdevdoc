---
sidebar_position: 5
---

# 操作与输入

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录玩家操作与输入相关接口。

---

## 操作与输入

### ControlScheme 枚举

<Version type="script" add="2.4.0"/>

定义玩家响应输入而移动的方式的控制方案。

```typescript
enum ControlScheme {
    CameraRelative = "CameraRelative", // 相对镜头方向移动
    CameraRelativeStrafe = "CameraRelativeStrafe", // 相对镜头方向移动，并可横移
    LockedPlayerRelativeStrafe = "LockedPlayerRelativeStrafe", // 相对玩家朝向移动，视角锁定，并可横移
    PlayerRelative = "PlayerRelative", // 相对玩家朝向移动
    PlayerRelativeStrafe = "PlayerRelativeStrafe", // 相对玩家朝向移动，并可横移
}
```

### PlayerInputPermissions 类

<Version type="script" add="1.12.0"/>

用于启用或禁用玩家输入权限。

```typescript
class PlayerInputPermissions {
    private constructor();
    isPermissionCategoryEnabled(permissionCategory: InputPermissionCategory): boolean;
    setPermissionCategory(permissionCategory: InputPermissionCategory, isEnabled: boolean): void;
}
```

#### isPermissionCategoryEnabled 方法

<Version type="script" add="1.17.0" inline/> <RestrictedMode inline/>

```typescript
isPermissionCategoryEnabled(permissionCategory: InputPermissionCategory): boolean
```

- permissionCategory: [InputPermissionCategory](#inputpermissioncategory-枚举)，要查询的输入权限类别。

**返回值**：boolean，该权限类别已启用时为`true`。

#### setPermissionCategory 方法

<Version type="script" add="1.17.0" inline/> <RestrictedMode inline/>

```typescript
setPermissionCategory(permissionCategory: InputPermissionCategory, isEnabled: boolean): void
```

- permissionCategory: [InputPermissionCategory](#inputpermissioncategory-枚举)，要设置权限的输入权限类别。
- isEnabled: boolean，设为`true`时启用该输入，设为`false`时禁用。

### InputPermissionCategory 枚举

<Version type="script" add="1.12.0"/>

输入权限类别。

```typescript
enum InputPermissionCategory {
    Camera = 1, // 与镜头移动相关的玩家输入
    Movement = 2, // 与所有玩家移动相关的输入；禁用它等同于禁用跳跃、潜行、横移、骑乘和下坐
    LateralMovement = 4, // 玩家在世界中横向移动的输入，对应键盘的 WASD 或手柄/触摸的移动摇杆
    Sneak = 5, // 与潜行相关的玩家输入，同时影响向下飞行
    Jump = 6, // 与跳跃相关的玩家输入，同时影响向上飞行
    Mount = 7, // 与骑乘载具相关的玩家输入
    Dismount = 8, // 与下坐相关的玩家输入
    MoveForward = 9, // 与玩家向前移动相关的输入
    MoveBackward = 10, // 与玩家向后移动相关的输入
    MoveLeft = 11, // 与玩家向左移动相关的输入
    MoveRight = 12, // 与玩家向右移动相关的输入
}
```

### PlayerPermissionLevel 枚举

<Version type="script" add="2.1.0"/>

玩家的权限等级。

```typescript
enum PlayerPermissionLevel {
    Visitor = 0, // 访客，只能观察世界，不能与世界交互
    Member = 1, // 成员，可以建造、挖掘、攻击玩家和生物，并与物品和实体交互
    Operator = 2, // 操作员，除成员权限外还可传送和使用命令
    Custom = 3, // 自定义权限等级
}
```

### InputMode 枚举

<Version type="script" add="1.17.0"/>

描述设备的输入类型。

```typescript
enum InputMode {
    Gamepad = "Gamepad", // 手柄输入
    KeyboardAndMouse = "KeyboardAndMouse", // 键盘与鼠标输入
    MotionController = "MotionController", // 体感控制器输入
    Touch = "Touch", // 触摸输入
}
```

### InputButton 枚举

<Version type="script" add="1.18.0"/>

受支持的所有输入按钮。

```typescript
enum InputButton {
    Jump = "Jump", // 对应手柄、键盘与触摸界面上的“跳跃”按钮
    Sneak = "Sneak", // 对应手柄、键盘与触摸界面上的“潜行”按钮
}
```

### ButtonState 枚举

<Version type="script" add="1.18.0"/>

键盘、手柄或触摸界面上按钮的状态。

```typescript
enum ButtonState {
    Pressed = "Pressed", // 按下
    Released = "Released", // 松开
}
```

### InputInfo 类

<Version type="script" add="1.17.0"/>

客户端实例的输入信息。

```typescript
class InputInfo {
    private constructor();
    readonly lastInputModeUsed: InputMode;
    readonly touchOnlyAffectsHotbar: boolean;
    getButtonState(button: InputButton): ButtonState;
    getMovementVector(): Vector2;
}
```

#### 属性

- <ReadOnly/> lastInputModeUsed: [InputMode](#inputmode-枚举)，玩家最近使用的输入模式。
- <ReadOnly/> touchOnlyAffectsHotbar: boolean，玩家触摸输入是否只影响快捷栏。

#### getButtonState 方法

<Version type="script" add="1.18.0" inline/>

```typescript
getButtonState(button: InputButton): ButtonState
```

- button: [InputButton](#inputbutton-枚举)，要查询的输入按钮。

**返回值**：[ButtonState](#buttonstate-枚举)，该按钮的当前状态。

#### getMovementVector 方法

<Version type="script" add="1.18.0" inline/>

```typescript
getMovementVector(): Vector2
```

**返回值**：[Vector2](../../server/general#vector2-接口)，当前的移动向量。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/changelog?view=minecraft-bedrock-stable)
