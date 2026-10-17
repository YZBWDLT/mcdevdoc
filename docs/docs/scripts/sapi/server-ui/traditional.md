---
sidebar_position: 1
---

# 传统表单

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"

本文主要记录传统表单（基于类的表单接口）相关接口，关闭全部表单等通用操作见[界面管理器](./ui_manager)。

---

## 操作表单

### ActionFormData 类

<Version type="script-ui" add="1.0.0"/>

由一个或多个按钮组成的操作表单。

```typescript
class ActionFormData {
    body(bodyText: RawMessage | string): ActionFormData;
    button(text: RawMessage | string, iconPath?: string): ActionFormData;
    divider(): ActionFormData;
    header(text: RawMessage | string): ActionFormData;
    label(text: RawMessage | string): ActionFormData;
    show(player: Player): Promise<ActionFormResponse>;
    title(titleText: RawMessage | string): ActionFormData;
}
```

#### body 方法

设置表单的正文文本。

```typescript
body(bodyText: RawMessage | string): ActionFormData
```

- bodyText: [RawMessage](../server/general#rawmessage-接口) | string，表单的正文内容。

**返回值**：[ActionFormData](#actionformdata-类)，该表单本身，便于链式调用。

#### button 方法

向表单添加一个按钮，可指定资源包中的图标路径。

```typescript
button(text: RawMessage | string, iconPath?: string): ActionFormData
```

- text: [RawMessage](../server/general#rawmessage-接口) | string，按钮上显示的文字。
- iconPath?: string，按钮图标的资源包路径（可选）。

**返回值**：[ActionFormData](#actionformdata-类)，该表单本身，便于链式调用。

#### divider 方法

<Version type="script-ui" add="2.0.0" inline/>

向表单添加一条分隔线。

```typescript
divider(): ActionFormData
```

**返回值**：[ActionFormData](#actionformdata-类)，该表单本身，便于链式调用。

#### header 方法

<Version type="script-ui" add="2.0.0" inline/>

向表单添加一个标题。

```typescript
header(text: RawMessage | string): ActionFormData
```

- text: [RawMessage](../server/general#rawmessage-接口) | string，标题内容。

**返回值**：[ActionFormData](#actionformdata-类)，该表单本身，便于链式调用。

#### label 方法

<Version type="script-ui" add="2.0.0" inline/>

向表单添加一段标签文本。

```typescript
label(text: RawMessage | string): ActionFormData
```

- text: [RawMessage](../server/general#rawmessage-接口) | string，标签内容。

**返回值**：[ActionFormData](#actionformdata-类)，该表单本身，便于链式调用。

#### show 方法

<RestrictedMode inline/>

把该表单展示给指定玩家，异步返回玩家的选择结果。

```typescript
show(player: Player): Promise<ActionFormResponse>
```

- player: [Player](../server/entity_and_player/player#player-类)，要展示该表单的玩家。

**返回值**：Promise&lt;[ActionFormResponse](#actionformresponse-类)&gt;，玩家的选择结果。

#### title 方法

设置表单的标题。

```typescript
title(titleText: RawMessage | string): ActionFormData
```

- titleText: [RawMessage](../server/general#rawmessage-接口) | string，表单的标题。

**返回值**：[ActionFormData](#actionformdata-类)，该表单本身，便于链式调用。

### ActionFormResponse 类

<Version type="script-ui" add="1.0.0"/>

操作表单的返回结果。

继承自[FormResponse](#formresponse-类)。

```typescript
class ActionFormResponse extends FormResponse {
    private constructor();
    readonly selection?: number;
}
```

#### 属性

- <ReadOnly/> <Optional/> selection: number，玩家点击的按钮序号，从 0 开始。

---

## 消息表单

### MessageFormData 类

<Version type="script-ui" add="1.0.0"/>

带正文与两个按钮的简单对话框。

```typescript
class MessageFormData {
    body(bodyText: RawMessage | string): MessageFormData;
    button1(text: RawMessage | string): MessageFormData;
    button2(text: RawMessage | string): MessageFormData;
    show(player: Player): Promise<MessageFormResponse>;
    title(titleText: RawMessage | string): MessageFormData;
}
```

#### body 方法

设置对话框的正文文本。

```typescript
body(bodyText: RawMessage | string): MessageFormData
```

- bodyText: [RawMessage](../server/general#rawmessage-接口) | string，对话框的正文内容。

**返回值**：[MessageFormData](#messageformdata-类)，该对话框本身，便于链式调用。

#### button1 方法

设置对话框第一个按钮的文本。

```typescript
button1(text: RawMessage | string): MessageFormData
```

- text: [RawMessage](../server/general#rawmessage-接口) | string，第一个按钮的文本。

**返回值**：[MessageFormData](#messageformdata-类)，该对话框本身，便于链式调用。

#### button2 方法

设置对话框第二个按钮的文本。

```typescript
button2(text: RawMessage | string): MessageFormData
```

- text: [RawMessage](../server/general#rawmessage-接口) | string，第二个按钮的文本。

**返回值**：[MessageFormData](#messageformdata-类)，该对话框本身，便于链式调用。

#### show 方法

<RestrictedMode inline/>

把该对话框展示给指定玩家，异步返回玩家的选择结果。

```typescript
show(player: Player): Promise<MessageFormResponse>
```

- player: [Player](../server/entity_and_player/player#player-类)，要展示该对话框的玩家。

**返回值**：Promise&lt;[MessageFormResponse](#messageformresponse-类)&gt;，玩家的选择结果。

#### title 方法

设置对话框的标题。

```typescript
title(titleText: RawMessage | string): MessageFormData
```

- titleText: [RawMessage](../server/general#rawmessage-接口) | string，对话框的标题。

**返回值**：[MessageFormData](#messageformdata-类)，该对话框本身，便于链式调用。

### MessageFormResponse 类

<Version type="script-ui" add="1.0.0"/>

消息表单的返回结果。

继承自[FormResponse](#formresponse-类)。

```typescript
class MessageFormResponse extends FormResponse {
    private constructor();
    readonly selection?: number;
}
```

#### 属性

- <ReadOnly/> <Optional/> selection: number，玩家点击的按钮序号，从 0 开始。

---

## 自定义表单

### ModalFormData 类

<Version type="script-ui" add="1.0.0"/>

可包含下拉框、滑块、输入框与开关等控件的自定义表单。

```typescript
class ModalFormData {
    divider(): ModalFormData;
    dropdown(label: RawMessage | string, items: (RawMessage | string)[], dropdownOptions?: ModalFormDataDropdownOptions): ModalFormData;
    header(text: RawMessage | string): ModalFormData;
    label(text: RawMessage | string): ModalFormData;
    show(player: Player): Promise<ModalFormResponse>;
    slider(
        label: RawMessage | string,
        minimumValue: number,
        maximumValue: number,
        sliderOptions?: ModalFormDataSliderOptions,
    ): ModalFormData;
    submitButton(submitButtonText: RawMessage | string): ModalFormData;
    textField(
        label: RawMessage | string,
        placeholderText: RawMessage | string,
        textFieldOptions?: ModalFormDataTextFieldOptions,
    ): ModalFormData;
    title(titleText: RawMessage | string): ModalFormData;
    toggle(label: RawMessage | string, toggleOptions?: ModalFormDataToggleOptions): ModalFormData;
}
```

#### divider 方法

<Version type="script-ui" add="2.0.0" inline/>

向表单添加一条分隔线。

```typescript
divider(): ModalFormData
```

**返回值**：[ModalFormData](#modalformdata-类)，该表单本身，便于链式调用。

#### dropdown 方法

向表单添加一个下拉框。

```typescript
dropdown(
    label: RawMessage | string,
    items: (RawMessage | string)[],
    dropdownOptions?: ModalFormDataDropdownOptions,
): ModalFormData
```

- label: [RawMessage](../server/general#rawmessage-接口) | string，下拉框的标签。
- items: ([RawMessage](../server/general#rawmessage-接口) | string)[]，下拉框的候选项。
- dropdownOptions?: [ModalFormDataDropdownOptions](#modalformdatadropdownoptions-接口)，下拉框的附加选项（可选）。

**返回值**：[ModalFormData](#modalformdata-类)，该表单本身，便于链式调用。

#### header 方法

<Version type="script-ui" add="2.0.0" inline/>

向表单添加一个标题。

```typescript
header(text: RawMessage | string): ModalFormData
```

- text: [RawMessage](../server/general#rawmessage-接口) | string，标题内容。

**返回值**：[ModalFormData](#modalformdata-类)，该表单本身，便于链式调用。

#### label 方法

向表单添加一段标签文本。

```typescript
label(text: RawMessage | string): ModalFormData
```

- text: [RawMessage](../server/general#rawmessage-接口) | string，标签内容。

**返回值**：[ModalFormData](#modalformdata-类)，该表单本身，便于链式调用。

#### show 方法

<RestrictedMode inline/>

把该表单展示给指定玩家，异步返回玩家填写的结果。

```typescript
show(player: Player): Promise<ModalFormResponse>
```

- player: [Player](../server/entity_and_player/player#player-类)，要展示该表单的玩家。

**返回值**：Promise&lt;[ModalFormResponse](#modalformresponse-类)&gt;，玩家填写的结果。

#### slider 方法

向表单添加一个数值滑块。

```typescript
slider(
    label: RawMessage | string,
    minimumValue: number,
    maximumValue: number,
    sliderOptions?: ModalFormDataSliderOptions,
): ModalFormData
```

- label: [RawMessage](../server/general#rawmessage-接口) | string，滑块的标签。
- minimumValue: number，滑块的最小值。
- maximumValue: number，滑块的最大值。
- sliderOptions?: [ModalFormDataSliderOptions](#modalformdataslideroptions-接口)，滑块的附加选项（可选）。

**返回值**：[ModalFormData](#modalformdata-类)，该表单本身，便于链式调用。

#### submitButton 方法

<Version type="script-ui" add="1.2.0" inline/>

设置表单提交按钮的文本。

```typescript
submitButton(submitButtonText: RawMessage | string): ModalFormData
```

- submitButtonText: [RawMessage](../server/general#rawmessage-接口) | string，提交按钮的文本。

**返回值**：[ModalFormData](#modalformdata-类)，该表单本身，便于链式调用。

#### textField 方法

向表单添加一个文本输入框。

```typescript
textField(
    label: RawMessage | string,
    placeholderText: RawMessage | string,
    textFieldOptions?: ModalFormDataTextFieldOptions,
): ModalFormData
```

- label: [RawMessage](../server/general#rawmessage-接口) | string，输入框的标签。
- placeholderText: [RawMessage](../server/general#rawmessage-接口) | string，输入框的占位文本。
- textFieldOptions?: [ModalFormDataTextFieldOptions](#modalformdatatextfieldoptions-接口)，输入框的附加选项（可选）。

**返回值**：[ModalFormData](#modalformdata-类)，该表单本身，便于链式调用。

#### title 方法

设置表单的标题。

```typescript
title(titleText: RawMessage | string): ModalFormData
```

- titleText: [RawMessage](../server/general#rawmessage-接口) | string，表单的标题。

**返回值**：[ModalFormData](#modalformdata-类)，该表单本身，便于链式调用。

#### toggle 方法

向表单添加一个开关。

```typescript
toggle(label: RawMessage | string, toggleOptions?: ModalFormDataToggleOptions): ModalFormData
```

- label: [RawMessage](../server/general#rawmessage-接口) | string，开关的标签。
- toggleOptions?: [ModalFormDataToggleOptions](#modalformdatatoggleoptions-接口)，开关的附加选项（可选）。

**返回值**：[ModalFormData](#modalformdata-类)，该表单本身，便于链式调用。

### ModalFormResponse 类

<Version type="script-ui" add="1.0.0"/>

自定义表单的返回结果。

继承自[FormResponse](#formresponse-类)。

```typescript
class ModalFormResponse extends FormResponse {
    private constructor();
    readonly formValues?: (boolean | number | string | undefined)[];
}
```

#### 属性

- <ReadOnly/> <Optional/> formValues: (boolean | number | string | undefined)[]，按控件添加顺序排列的取值数组；表单被取消时为`undefined`。

### ModalFormDataDropdownOptions 接口

<Version type="script-ui" add="2.0.0"/>

向[ModalFormData](#modalformdata-类)添加下拉框时使用的附加选项。

```typescript
interface ModalFormDataDropdownOptions {
    defaultValueIndex?: number;
    tooltip?: RawMessage | string;
}
```

#### 属性

- <Optional/> defaultValueIndex: number，默认选中条目的序号；未指定或越界时为 0。
- <Optional/> tooltip: [RawMessage](../server/general#rawmessage-接口) | string，悬停在控件旁提示图标上时显示的文字。

### ModalFormDataSliderOptions 接口

<Version type="script-ui" add="2.0.0"/>

向[ModalFormData](#modalformdata-类)添加滑块时使用的附加选项。

```typescript
interface ModalFormDataSliderOptions {
    defaultValue?: number;
    tooltip?: RawMessage | string;
    valueStep?: number;
}
```

#### 属性

- <Optional/> defaultValue: number，滑块的默认值。
- <Optional/> tooltip: [RawMessage](../server/general#rawmessage-接口) | string，悬停在控件旁提示图标上时显示的文字。
- <Optional/> valueStep: number，滑块每次变化的最小幅度。

### ModalFormDataTextFieldOptions 接口

<Version type="script-ui" add="2.0.0"/>

向[ModalFormData](#modalformdata-类)添加输入框时使用的附加选项。

```typescript
interface ModalFormDataTextFieldOptions {
    defaultValue?: RawMessage | string;
    tooltip?: RawMessage | string;
}
```

#### 属性

- <Optional/> defaultValue: [RawMessage](../server/general#rawmessage-接口) | string，输入框的默认文本。
- <Optional/> tooltip: [RawMessage](../server/general#rawmessage-接口) | string，悬停在控件旁提示图标上时显示的文字。

### ModalFormDataToggleOptions 接口

<Version type="script-ui" add="2.0.0"/>

向[ModalFormData](#modalformdata-类)添加开关时使用的附加选项。

```typescript
interface ModalFormDataToggleOptions {
    defaultValue?: boolean;
    tooltip?: RawMessage | string;
}
```

#### 属性

- <Optional/> defaultValue: boolean，开关的默认状态。
- <Optional/> tooltip: [RawMessage](../server/general#rawmessage-接口) | string，悬停在控件旁提示图标上时显示的文字。

---

## 表单响应

### FormResponse 类

<Version type="script-ui" add="1.0.0"/>

所有表单返回结果的基类。

```typescript
class FormResponse {
    private constructor();
    readonly cancelationReason?: FormCancelationReason;
    readonly canceled: boolean;
}
```

#### 属性

- <Version type="script-ui" add="1.1.0" inline/> <ReadOnly/> <Optional/> cancelationReason: [FormCancelationReason](#formcancelationreason-枚举)，表单被取消的详细原因。
- <Version type="script-ui" add="1.1.0" inline/> <ReadOnly/> canceled: boolean，玩家是否取消了该表单。

### FormCancelationReason 枚举

<Version type="script-ui" add="1.1.0"/>

表单被取消的原因。

```typescript
enum FormCancelationReason {
    UserBusy = "UserBusy", // 玩家正忙于其他界面
    UserClosed = "UserClosed", // 玩家关闭了表单
}
```

### FormRejectError 类

<Version type="script-ui" add="1.0.0"/>

表单被拒绝时抛出该错误。

继承自Error。

```typescript
class FormRejectError extends Error {
    private constructor();
    readonly reason: FormRejectReason;
}
```

#### 属性

- <ReadOnly/> reason: [FormRejectReason](#formrejectreason-枚举)，该表单被拒绝的原因。

### FormRejectReason 枚举

<Version type="script-ui" add="1.0.0"/>

表单被拒绝的原因。

```typescript
enum FormRejectReason {
    MalformedResponse = "MalformedResponse", // 客户端返回的表单响应格式不合法
    PlayerQuit = "PlayerQuit", // 玩家在返回表单结果前退出了游戏
    ServerShutdown = "ServerShutdown", // 服务器在返回表单结果前关闭
}
```

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server-ui` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-ui/changelog?view=minecraft-bedrock-stable)
