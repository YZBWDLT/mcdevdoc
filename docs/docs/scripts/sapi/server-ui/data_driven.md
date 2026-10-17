---
sidebar_position: 2
---

# 数据驱动 UI

import Version from "/src/components/highlight/version"
import ReadOnly from "/src/components/highlight/readonly"
import Optional from "/src/components/highlight/optional"
import RestrictedMode from "/src/components/highlight/restrictedMode"
import EarlyExecution from "/src/components/highlight/earlyExecution"

本文主要记录数据驱动 UI（DDUI）相关接口，关闭界面等通用操作见[界面管理器](./ui_manager)。

---

## 自定义表单

### CustomForm 类

<Version type="script-ui" add="2.1.0"/>

数据驱动的自定义表单，可动态添加按钮、文本、开关、下拉框等组件。

```typescript
class CustomForm {
    constructor(player: Player, title: ObservableString | ObservableUIRawMessage | string | UIRawMessage);
    button(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        onClick: () => void,
        options?: ButtonOptions,
    ): CustomForm;
    close(): void;
    closeButton(): CustomForm;
    divider(options?: DividerOptions): CustomForm;
    dropdown(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        value: ObservableNumber,
        items: DropdownItemData[],
        options?: DropdownOptions,
    ): CustomForm;
    header(text: ObservableString | ObservableUIRawMessage | string | UIRawMessage, options?: TextOptions): CustomForm;
    image(src: ObservableString | string, pack: ObservableString | string, options?: ImageOptions): CustomForm;
    isShowing(): boolean;
    label(text: ObservableString | ObservableUIRawMessage | string | UIRawMessage, options?: TextOptions): CustomForm;
    show(): Promise<DataDrivenScreenClosedReason>;
    slider(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        value: ObservableNumber,
        min: number | ObservableNumber,
        max: number | ObservableNumber,
        options?: SliderOptions,
    ): CustomForm;
    spacer(options?: SpacingOptions): CustomForm;
    textField(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        text: ObservableString,
        options?: TextFieldOptions,
    ): CustomForm;
    toggle(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        toggled: ObservableBoolean,
        options?: ToggleOptions,
    ): CustomForm;
    multiButtonRow(buttons: ButtonData[], options?: MultiButtonRowOptions): CustomForm;
}
```

#### button 方法

<RestrictedMode inline/>

向表单添加一个可点击按钮。

```typescript
button(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    onClick: () => void,
    options?: ButtonOptions,
): CustomForm
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，按钮上显示的文本。
- onClick: () =&gt; void，玩家点击按钮时调用的回调。
- options?: [ButtonOptions](#buttonoptions-接口)，按钮的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### close 方法

<RestrictedMode inline/>

关闭该表单当前展示给玩家的界面。

```typescript
close(): void
```

#### closeButton 方法

<RestrictedMode inline/>

在表单底部与右上角添加关闭按钮。

```typescript
closeButton(): CustomForm
```

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### divider 方法

<RestrictedMode inline/>

向表单添加一条水平分隔线。

```typescript
divider(options?: DividerOptions): CustomForm
```

- options?: [DividerOptions](#divideroptions-接口)，分隔线的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### dropdown 方法

<RestrictedMode inline/>

向表单添加一个下拉框，选中的值写入指定的可观察对象。

```typescript
dropdown(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    value: ObservableNumber,
    items: DropdownItemData[],
    options?: DropdownOptions,
): CustomForm
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，下拉框的标签。
- value: [ObservableNumber](#observablenumber-类)，保存选中值的可观察对象。
- items: [DropdownItemData](#dropdownitemdata-接口)[]，下拉框的条目。
- options?: [DropdownOptions](#dropdownoptions-接口)，下拉框的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### header 方法

<RestrictedMode inline/>

向表单添加一个标题文本。

```typescript
header(
    text: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    options?: TextOptions,
): CustomForm
```

- text: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，标题内容。
- options?: [TextOptions](#textoptions-接口)，文本的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### image 方法

<Version type="script-ui" add="2.2.0" inline/> <RestrictedMode inline/>

向表单添加一张图片，支持 gif。

```typescript
image(
    src: ObservableString | string,
    pack: ObservableString | string,
    options?: ImageOptions,
): CustomForm
```

- src: [ObservableString](#observablestring-类) | string，图片的资源包路径。
- pack: [ObservableString](#observablestring-类) | string，图片所属的资源包标识符。
- options?: [ImageOptions](#imageoptions-接口)，图片的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### isShowing 方法

<RestrictedMode inline/>

该表单当前是否正在展示给玩家。

```typescript
isShowing(): boolean
```

**返回值**：boolean

#### label 方法

<RestrictedMode inline/>

向表单添加一段只读文本。

```typescript
label(
    text: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    options?: TextOptions,
): CustomForm
```

- text: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，标签内容。
- options?: [TextOptions](#textoptions-接口)，文本的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### show 方法

<RestrictedMode inline/>

把该表单展示给玩家，异步返回界面关闭的原因。

```typescript
show(): Promise<DataDrivenScreenClosedReason>
```

**返回值**：Promise&lt;[DataDrivenScreenClosedReason](#datadrivenscreenclosedreason-枚举)&gt;，界面关闭的原因。

#### slider 方法

<RestrictedMode inline/>

向表单添加一个数值滑块，当前值保存在指定的可观察对象中。

```typescript
slider(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    value: ObservableNumber,
    min: number | ObservableNumber,
    max: number | ObservableNumber,
    options?: SliderOptions,
): CustomForm
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，滑块的标签。
- value: [ObservableNumber](#observablenumber-类)，保存当前值的可观察对象。
- min: number | [ObservableNumber](#observablenumber-类)，滑块的最小值。
- max: number | [ObservableNumber](#observablenumber-类)，滑块的最大值。
- options?: [SliderOptions](#slideroptions-接口)，滑块的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### spacer 方法

<RestrictedMode inline/>

向表单添加一段垂直间距。

```typescript
spacer(options?: SpacingOptions): CustomForm
```

- options?: [SpacingOptions](#spacingoptions-接口)，间距的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### textField 方法

<RestrictedMode inline/>

向表单添加一个文本输入框，输入内容保存在指定的可观察对象中。

```typescript
textField(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    text: ObservableString,
    options?: TextFieldOptions,
): CustomForm
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，输入框的标签。
- text: [ObservableString](#observablestring-类)，保存输入内容的可观察对象。
- options?: [TextFieldOptions](#textfieldoptions-接口)，输入框的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### toggle 方法

<RestrictedMode inline/>

向表单添加一个开关，状态保存在指定的可观察对象中。

```typescript
toggle(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    toggled: ObservableBoolean,
    options?: ToggleOptions,
): CustomForm
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，开关的标签。
- toggled: [ObservableBoolean](#observableboolean-类)，保存开关状态的可观察对象。
- options?: [ToggleOptions](#toggleoptions-接口)，开关的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

#### multiButtonRow 方法

<Version type="script-ui" experimental="测试版API" inline/> <RestrictedMode inline/>

向表单添加一行按钮，最多三个。

```typescript
multiButtonRow(buttons: ButtonData[], options?: MultiButtonRowOptions): CustomForm
```

- buttons: [ButtonData](#buttondata-接口)[]，该行中的按钮，最多三个。
- options?: [MultiButtonRowOptions](#multibuttonrowoptions-接口)，该行的附加选项（可选）。

**返回值**：[CustomForm](#customform-类)，该表单本身，便于链式调用。

### CustomFormOptions 接口

<Version type="script-ui" experimental="测试版API"/>

创建[CustomForm](#customform-类)时使用的附加选项。

```typescript
interface CustomFormOptions {
    topCloseButtonVisible?: boolean | ObservableBoolean;
}
```

#### 属性

- <Version type="script-ui" experimental="测试版API" inline/> <Optional/> topCloseButtonVisible: boolean | [ObservableBoolean](#observableboolean-类)，表单右上角的关闭按钮是否可见。

---

## 消息框

### MessageBox 类

<Version type="script-ui" add="2.1.0"/>

数据驱动的消息框，由标题、正文与最多三个按钮组成。

```typescript
class MessageBox {
    constructor(player: Player, title: ObservableString | ObservableUIRawMessage | string | UIRawMessage);
    body(body: ObservableString | ObservableUIRawMessage | string | UIRawMessage): MessageBox;
    button1(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    ): MessageBox;
    button1WithOptions(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        options?: MessageBoxButtonOptions,
    ): MessageBox;
    button2(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    ): MessageBox;
    button2WithOptions(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        options?: MessageBoxButtonOptions,
    ): MessageBox;
    close(): void;
    isShowing(): boolean;
    show(): Promise<MessageBoxResult>;
    button3WithOptions(
        label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
        options?: MessageBoxButtonOptions,
    ): MessageBox;
}
```

#### body 方法

<RestrictedMode inline/>

设置消息框的正文。

```typescript
body(body: ObservableString | ObservableUIRawMessage | string | UIRawMessage): MessageBox
```

- body: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，消息框的正文。

**返回值**：[MessageBox](#messagebox-类)，该消息框本身，便于链式调用。

#### button1 方法

<RestrictedMode inline/>

设置消息框第一个按钮的文本与提示。

```typescript
button1(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
): MessageBox
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，按钮的文本。
- tooltip?: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在按钮上时显示的文字（可选）。

**返回值**：[MessageBox](#messagebox-类)，该消息框本身，便于链式调用。

#### button1WithOptions 方法

<Version type="script-ui" add="2.3.0" inline/> <RestrictedMode inline/>

设置消息框第一个按钮的文本与选项。

```typescript
button1WithOptions(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    options?: MessageBoxButtonOptions,
): MessageBox
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，按钮的文本。
- options?: [MessageBoxButtonOptions](#messageboxbuttonoptions-接口)，按钮的附加选项（可选）。

**返回值**：[MessageBox](#messagebox-类)，该消息框本身，便于链式调用。

#### button2 方法

<RestrictedMode inline/>

设置消息框第二个按钮的文本与提示。

```typescript
button2(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
): MessageBox
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，按钮的文本。
- tooltip?: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在按钮上时显示的文字（可选）。

**返回值**：[MessageBox](#messagebox-类)，该消息框本身，便于链式调用。

#### button2WithOptions 方法

<Version type="script-ui" add="2.3.0" inline/> <RestrictedMode inline/>

设置消息框第二个按钮的文本与选项。

```typescript
button2WithOptions(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    options?: MessageBoxButtonOptions,
): MessageBox
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，按钮的文本。
- options?: [MessageBoxButtonOptions](#messageboxbuttonoptions-接口)，按钮的附加选项（可选）。

**返回值**：[MessageBox](#messagebox-类)，该消息框本身，便于链式调用。

#### close 方法

<RestrictedMode inline/>

关闭该消息框当前展示给玩家的界面。

```typescript
close(): void
```

#### isShowing 方法

<RestrictedMode inline/>

该消息框当前是否正在展示给玩家。

```typescript
isShowing(): boolean
```

**返回值**：boolean

#### show 方法

<RestrictedMode inline/>

把该消息框展示给玩家，异步返回玩家点击的按钮。

```typescript
show(): Promise<MessageBoxResult>
```

**返回值**：Promise&lt;[MessageBoxResult](#messageboxresult-接口)&gt;，玩家点击按钮的结果。

#### button3WithOptions 方法

<Version type="script-ui" experimental="测试版API" inline/> <RestrictedMode inline/>

设置消息框第三个按钮的文本与选项。

```typescript
button3WithOptions(
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage,
    options?: MessageBoxButtonOptions,
): MessageBox
```

- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，按钮的文本。
- options?: [MessageBoxButtonOptions](#messageboxbuttonoptions-接口)，按钮的附加选项（可选）。

**返回值**：[MessageBox](#messagebox-类)，该消息框本身，便于链式调用。

### MessageBoxOptions 接口

<Version type="script-ui" experimental="测试版API"/>

[MessageBox](#messagebox-类)的附加选项。

```typescript
interface MessageBoxOptions {
    showHorizontalButtons: boolean;
}
```

#### 属性

- <Version type="script-ui" experimental="测试版API" inline/> showHorizontalButtons: boolean，按钮是否横向排列。

### MessageBoxBodyOptions 接口

<Version type="script-ui" experimental="测试版API"/>

[MessageBox](#messagebox-类)正文的附加选项。

```typescript
interface MessageBoxBodyOptions {
}
```

### MessageBoxButtonOptions 接口

<Version type="script-ui" add="2.3.0"/>

[MessageBox](#messagebox-类)按钮的附加选项。

```typescript
interface MessageBoxButtonOptions {
    imageDetails?: ImageDetails;
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
}
```

#### 属性

- <Optional/> imageDetails: [ImageDetails](#imagedetails-接口)，按钮文本旁要显示的图片。
- <Optional/> tooltip: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在按钮上时显示的文字。

### MessageBoxResult 接口

<Version type="script-ui" add="2.1.0"/>

消息框关闭后的结果。

```typescript
interface MessageBoxResult {
    closeReason: DataDrivenScreenClosedReason;
    selection?: number;
}
```

#### 属性

- closeReason: [DataDrivenScreenClosedReason](#datadrivenscreenclosedreason-枚举)，消息框关闭的原因。
- <Optional/> selection: number，玩家点击的按钮序号；未点击按钮时为空。

---

## 组件选项

### ButtonOptions 接口

<Version type="script-ui" add="2.1.0"/>

数据驱动 UI 中按钮的附加选项。

```typescript
interface ButtonOptions {
    disabled?: boolean | ObservableBoolean;
    imageDetails?: ImageDetails;
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    visible?: boolean | ObservableBoolean;
}
```

#### 属性

- <Optional/> disabled: boolean | [ObservableBoolean](#observableboolean-类)，按钮是否被禁用。
- <Version type="script-ui" add="2.3.0" inline/> <Optional/> imageDetails: [ImageDetails](#imagedetails-接口)，按钮文本旁要显示的图片。
- <Optional/> tooltip: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在按钮上时显示的文字。
- <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，按钮是否可见。

### ButtonData 接口

<Version type="script-ui" experimental="测试版API"/>

描述数据驱动 UI 中一个按钮的配置。

```typescript
interface ButtonData {
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    onClick: () => void;
    options?: ButtonOptions;
}
```

#### 属性

- <Version type="script-ui" experimental="测试版API" inline/> label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，按钮上显示的文本。
- <Version type="script-ui" experimental="测试版API" inline/> onClick: () =&gt; void，玩家点击该按钮时调用的回调。
- <Version type="script-ui" experimental="测试版API" inline/> <Optional/> options: [ButtonOptions](#buttonoptions-接口)，按钮的附加配置，例如提示与可见性。

### MultiButtonRowOptions 接口

<Version type="script-ui" experimental="测试版API"/>

数据驱动 UI 中多按钮行的附加选项。

```typescript
interface MultiButtonRowOptions {
    visible?: boolean | ObservableBoolean;
}
```

#### 属性

- <Version type="script-ui" experimental="测试版API" inline/> <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，整行按钮是否可见。

### DividerOptions 接口

<Version type="script-ui" add="2.1.0"/>

数据驱动 UI 中分隔线的附加选项。

```typescript
interface DividerOptions {
    visible?: boolean | ObservableBoolean;
}
```

#### 属性

- <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，分隔线是否可见。

### SpacingOptions 接口

<Version type="script-ui" add="2.1.0"/>

数据驱动 UI 中间距组件的附加选项。

```typescript
interface SpacingOptions {
    visible?: boolean | ObservableBoolean;
}
```

#### 属性

- <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，间距是否可见。

### TextOptions 接口

<Version type="script-ui" add="2.1.0"/>

数据驱动 UI 中文本组件的附加选项。

```typescript
interface TextOptions {
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    visible?: boolean | ObservableBoolean;
}
```

#### 属性

- <Version type="script-ui" add="2.3.0" inline/> <Optional/> tooltip: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在文本上时显示的文字。
- <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，文本是否可见。

### ImageOptions 接口

<Version type="script-ui" add="2.2.0"/>

数据驱动 UI 中图片组件的附加选项。

```typescript
interface ImageOptions {
    onClick?: () => void;
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    visible?: boolean | ObservableBoolean;
    width?: number | ObservableNumber;
}
```

#### 属性

- <Optional/> onClick: () =&gt; void，图片被点击时调用的回调。
- <Optional/> tooltip: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在图片上时显示的文字。
- <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，图片是否可见。
- <Optional/> width: number | [ObservableNumber](#observablenumber-类)，图片宽度占界面宽度的百分比。

### ImageDetails 接口

<Version type="script-ui" add="2.3.0"/>

要显示的图片的详细信息。

```typescript
interface ImageDetails {
    imagePackId: ObservableString | string;
    imageSrc: ObservableString | string;
}
```

#### 属性

- imagePackId: [ObservableString](#observablestring-类) | string，提供该图片的资源包标识符。
- imageSrc: [ObservableString](#observablestring-类) | string，图片的路径，按所属资源包加载。

### SliderOptions 接口

<Version type="script-ui" add="2.1.0"/>

数据驱动 UI 中滑块的附加选项。

```typescript
interface SliderOptions {
    description?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    disabled?: boolean | ObservableBoolean;
    step?: number | ObservableNumber;
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    visible?: boolean | ObservableBoolean;
    fixedFormatDigits?: number | ObservableNumber;
}
```

#### 属性

- <Optional/> description: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，滑块周围的补充说明文字。
- <Optional/> disabled: boolean | [ObservableBoolean](#observableboolean-类)，滑块是否被禁用。
- <Optional/> step: number | [ObservableNumber](#observablenumber-类)，滑块每次变化的幅度。
- <Version type="script-ui" add="2.3.0" inline/> <Optional/> tooltip: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在滑块上时显示的文字。
- <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，滑块是否可见。
- <Version type="script-ui" experimental="测试版API" inline/> <Optional/> fixedFormatDigits: number | [ObservableNumber](#observablenumber-类)，设置后，数值按固定的小数位数显示。

### ToggleOptions 接口

<Version type="script-ui" add="2.1.0"/>

数据驱动 UI 中开关的附加选项。

```typescript
interface ToggleOptions {
    description?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    disabled?: boolean | ObservableBoolean;
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    visible?: boolean | ObservableBoolean;
}
```

#### 属性

- <Optional/> description: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，开关周围的补充说明文字。
- <Optional/> disabled: boolean | [ObservableBoolean](#observableboolean-类)，开关是否被禁用。
- <Version type="script-ui" add="2.3.0" inline/> <Optional/> tooltip: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在开关上时显示的文字。
- <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，开关是否可见。

### TextFieldOptions 接口

<Version type="script-ui" add="2.1.0"/>

数据驱动 UI 中输入框的附加选项。

```typescript
interface TextFieldOptions {
    description?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    disabled?: boolean | ObservableBoolean;
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    visible?: boolean | ObservableBoolean;
}
```

#### 属性

- <Optional/> description: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，输入框标签周围的补充说明文字。
- <Optional/> disabled: boolean | [ObservableBoolean](#observableboolean-类)，输入框是否被禁用。
- <Version type="script-ui" add="2.3.0" inline/> <Optional/> tooltip: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在输入框上时显示的文字。
- <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，输入框是否可见。

### DropdownOptions 接口

<Version type="script-ui" add="2.1.0"/>

数据驱动 UI 中下拉框的附加选项。

```typescript
interface DropdownOptions {
    description?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    disabled?: boolean | ObservableBoolean;
    tooltip?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    visible?: boolean | ObservableBoolean;
}
```

#### 属性

- <Optional/> description: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，下拉框周围的补充说明文字。
- <Optional/> disabled: boolean | [ObservableBoolean](#observableboolean-类)，下拉框是否被禁用。
- <Version type="script-ui" add="2.3.0" inline/> <Optional/> tooltip: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，悬停在下拉框上时显示的文字。
- <Optional/> visible: boolean | [ObservableBoolean](#observableboolean-类)，下拉框是否可见。

### DropdownItemData 接口

<Version type="script-ui" add="2.1.0"/>

下拉框中的一个条目。

```typescript
interface DropdownItemData {
    description?: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    label: ObservableString | ObservableUIRawMessage | string | UIRawMessage;
    value: number;
}
```

#### 属性

- <Optional/> description: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，选中该条目时显示的补充说明文字。
- label: [ObservableString](#observablestring-类) | [ObservableUIRawMessage](#observableuirawmessage-类) | string | [UIRawMessage](#uirawmessage-接口)，该条目在下拉列表中显示的文本。
- value: number，该条目对应的数值。

---

## 可观察对象

### ObservableBoolean 类

<Version type="script-ui" add="2.1.0"/>

持有布尔值的可观察对象，值变化时会通知监听者。

```typescript
class ObservableBoolean {
    constructor(data: boolean, options?: ObservableOptions);
    getData(): boolean;
    setData(data: boolean): void;
    subscribe(callback: (arg0: boolean) => void): (arg0: boolean) => void;
    unsubscribe(callback: (arg0: boolean) => void): boolean;
}
```

#### getData 方法

<RestrictedMode inline/> <EarlyExecution/>

返回该可观察对象当前持有的布尔值。

```typescript
getData(): boolean
```

**返回值**：boolean，当前持有的布尔值。

#### setData 方法

<RestrictedMode inline/> <EarlyExecution/>

更新该可观察对象持有的布尔值，并通知监听者。

```typescript
setData(data: boolean): void
```

- data: boolean，新的布尔值。

#### subscribe 方法

<RestrictedMode inline/> <EarlyExecution/>

注册值变化时调用的回调。

```typescript
subscribe(callback: (arg0: boolean) => void): (arg0: boolean) => void
```

- callback: (arg0: boolean) =&gt; void，值变化时调用的回调。

**返回值**：(arg0: boolean) =&gt; void，该回调本身，可用于取消订阅。

#### unsubscribe 方法

<RestrictedMode inline/> <EarlyExecution/>

移除此前注册的回调。

```typescript
unsubscribe(callback: (arg0: boolean) => void): boolean
```

- callback: (arg0: boolean) =&gt; void，此前注册的回调。

**返回值**：boolean，成功移除时返回`true`。

### ObservableNumber 类

<Version type="script-ui" add="2.1.0"/>

持有数值的可观察对象，值变化时会通知监听者。

```typescript
class ObservableNumber {
    constructor(data: number, options?: ObservableOptions);
    getData(): number;
    setData(data: number): void;
    subscribe(callback: (arg0: number) => void): (arg0: number) => void;
    unsubscribe(callback: (arg0: number) => void): boolean;
}
```

#### getData 方法

<RestrictedMode inline/> <EarlyExecution/>

返回该可观察对象当前持有的数值。

```typescript
getData(): number
```

**返回值**：number，当前持有的数值。

#### setData 方法

<RestrictedMode inline/> <EarlyExecution/>

更新该可观察对象持有的数值，并通知监听者。

```typescript
setData(data: number): void
```

- data: number，新的数值。

#### subscribe 方法

<RestrictedMode inline/> <EarlyExecution/>

注册值变化时调用的回调。

```typescript
subscribe(callback: (arg0: number) => void): (arg0: number) => void
```

- callback: (arg0: number) =&gt; void，值变化时调用的回调。

**返回值**：(arg0: number) =&gt; void，该回调本身，可用于取消订阅。

#### unsubscribe 方法

<RestrictedMode inline/> <EarlyExecution/>

移除此前注册的回调。

```typescript
unsubscribe(callback: (arg0: number) => void): boolean
```

- callback: (arg0: number) =&gt; void，此前注册的回调。

**返回值**：boolean，成功移除时返回`true`。

### ObservableString 类

<Version type="script-ui" add="2.1.0"/>

持有字符串的可观察对象，值变化时会通知监听者。

```typescript
class ObservableString {
    constructor(data: string, options?: ObservableOptions);
    getData(): string;
    getFilteredText(player: Player): Promise<TextFilteringError[] | string>;
    setData(data: string): void;
    subscribe(callback: (arg0: string) => void): (arg0: string) => void;
    unsubscribe(callback: (arg0: string) => void): boolean;
}
```

#### getData 方法

<RestrictedMode inline/> <EarlyExecution/>

返回该可观察对象当前持有的字符串。

```typescript
getData(): string
```

**返回值**：string，当前持有的字符串。

#### getFilteredText 方法

<RestrictedMode inline/>

获取经过文本过滤后的内容。

```typescript
getFilteredText(player: Player): Promise<TextFilteringError[] | string>
```

- player: [Player](../server/entity_and_player/player#player-类)，用于文本过滤的玩家。

**返回值**：Promise&lt;[TextFilteringError](#textfilteringerror-枚举)[] | string&gt;，过滤后的文本；过滤失败时返回错误原因数组。

#### setData 方法

<RestrictedMode inline/> <EarlyExecution/>

更新该可观察对象持有的字符串，并通知监听者。

```typescript
setData(data: string): void
```

- data: string，新的字符串。

#### subscribe 方法

<RestrictedMode inline/> <EarlyExecution/>

注册值变化时调用的回调。

```typescript
subscribe(callback: (arg0: string) => void): (arg0: string) => void
```

- callback: (arg0: string) =&gt; void，值变化时调用的回调。

**返回值**：(arg0: string) =&gt; void，该回调本身，可用于取消订阅。

#### unsubscribe 方法

<RestrictedMode inline/> <EarlyExecution/>

移除此前注册的回调。

```typescript
unsubscribe(callback: (arg0: string) => void): boolean
```

- callback: (arg0: string) =&gt; void，此前注册的回调。

**返回值**：boolean，成功移除时返回`true`。

### ObservableUIRawMessage 类

<Version type="script-ui" add="2.1.0"/>

持有[UIRawMessage](#uirawmessage-接口)的可观察对象，值变化时会通知监听者。

```typescript
class ObservableUIRawMessage {
    constructor(data: UIRawMessage, options?: ObservableOptions);
    getData(): UIRawMessage;
    setData(data: UIRawMessage): void;
    subscribe(callback: (arg0: UIRawMessage) => void): (arg0: UIRawMessage) => void;
    unsubscribe(callback: (arg0: UIRawMessage) => void): boolean;
}
```

#### getData 方法

<RestrictedMode inline/> <EarlyExecution/>

返回该可观察对象当前持有的原始消息。

```typescript
getData(): UIRawMessage
```

**返回值**：[UIRawMessage](#uirawmessage-接口)，当前持有的原始消息。

#### setData 方法

<RestrictedMode inline/> <EarlyExecution/>

更新该可观察对象持有的原始消息，并通知监听者。

```typescript
setData(data: UIRawMessage): void
```

- data: [UIRawMessage](#uirawmessage-接口)，新的原始消息。

#### subscribe 方法

<RestrictedMode inline/> <EarlyExecution/>

注册值变化时调用的回调。

```typescript
subscribe(callback: (arg0: UIRawMessage) => void): (arg0: UIRawMessage) => void
```

- callback: (arg0: [UIRawMessage](#uirawmessage-接口)) =&gt; void，值变化时调用的回调。

**返回值**：(arg0: [UIRawMessage](#uirawmessage-接口)) =&gt; void，该回调本身，可用于取消订阅。

#### unsubscribe 方法

<RestrictedMode inline/> <EarlyExecution/>

移除此前注册的回调。

```typescript
unsubscribe(callback: (arg0: UIRawMessage) => void): boolean
```

- callback: (arg0: [UIRawMessage](#uirawmessage-接口)) =&gt; void，此前注册的回调。

**返回值**：boolean，成功移除时返回`true`。

### ObservableOptions 接口

<Version type="script-ui" add="2.1.0"/>

创建可观察对象时使用的选项，用于控制其值的可写性。

```typescript
interface ObservableOptions {
    clientWritable: boolean;
}
```

#### 属性

- clientWritable: boolean，设为`true`时允许客户端写入该可观察对象的值。

---

## 原始消息

### UIRawMessage 接口

<Version type="script-ui" add="2.1.0"/>

可发送到客户端的原始消息，是[RawMessage](../server/general#rawmessage-接口)的子集。

```typescript
interface UIRawMessage {
    rawtext?: UIRawMessage[];
    text?: string;
    translate?: string;
    with?: string[] | UIRawMessage;
}
```

#### 属性

- <Optional/> rawtext: [UIRawMessage](#uirawmessage-接口)[]，该消息的原始文本（rawtext）等价表示。
- <Optional/> text: string，要使用的字符串字面值。
- <Optional/> translate: string，翻译标识符，客户端拥有对应语言资源时会本地化。
- <Optional/> with: string[] | [UIRawMessage](#uirawmessage-接口)，翻译标识符的参数。

---

## 关闭原因与错误

### DataDrivenScreenClosedReason 枚举

<Version type="script-ui" add="2.1.0"/>

数据驱动 UI 界面（消息框或自定义表单）关闭的原因。

```typescript
enum DataDrivenScreenClosedReason {
    ClientClosed = "ClientClosed", // 客户端关闭了界面，例如玩家按下关闭按钮
    ServerClosed = "ServerClosed", // 服务器关闭了界面
    UserBusy = "UserBusy", // 玩家正忙于其他界面，界面无法展示
}
```

### TextFilteringError 枚举

<Version type="script-ui" add="2.1.0"/>

对文本进行过滤时可能出现的错误。

```typescript
enum TextFilteringError {
    DisabledByPlayer = "DisabledByPlayer", // 玩家关闭了文本过滤，文本未被过滤
    TextProcessorServiceUnreachable = "TextProcessorServiceUnreachable", // 文本处理服务不可达，文本未被过滤
    Unknown = "Unknown", // 文本过滤时发生未知错误
}
```

### FormVisibilityError 类

<Version type="script-ui" add="2.1.0"/>

表单可见性操作失败时抛出该错误。

继承自Error。

```typescript
class FormVisibilityError extends Error {
    private constructor();
    readonly formId: string;
    readonly reason: FormVisibilityErrorReason;
}
```

#### 属性

- <ReadOnly/> formId: string，导致该可见性错误的表单标识符。
- <ReadOnly/> reason: [FormVisibilityErrorReason](#formvisibilityerrorreason-枚举)，表单可见性操作失败的原因。

### FormVisibilityErrorReason 枚举

<Version type="script-ui" add="2.1.0"/>

表单可见性操作失败的原因。

```typescript
enum FormVisibilityErrorReason {
    AlreadyShowing = "AlreadyShowing", // 表单已在展示中，无法再次展示
    NotShowing = "NotShowing", // 表单当前未在展示，无法执行该操作
}
```

### InvalidFormError 类

<Version type="script-ui" add="2.1.0"/>

使用无效或未知的表单标识符操作表单时抛出该错误。

继承自Error。

```typescript
class InvalidFormError extends Error {
    private constructor();
    readonly formId: string;
}
```

#### 属性

- <ReadOnly/> formId: string，被引用的无效表单的标识符。

### InvalidFormModificationError 类

<Version type="script-ui" add="2.1.0"/>

在表单已展示给玩家后再修改表单时抛出该错误。

继承自Error。

```typescript
class InvalidFormModificationError extends Error {
    private constructor();
    readonly formId: string;
}
```

#### 属性

- <ReadOnly/> formId: string，被非法修改的表单的标识符。

### InvalidObservableError 类

<Version type="script-ui" add="2.1.0"/>

对不可写的可观察对象执行写入时抛出该错误。

继承自Error。

```typescript
class InvalidObservableError extends Error {
    private constructor();
}
```

### PlayerLeftError 类

<Version type="script-ui" add="2.1.0"/>

目标玩家已离开游戏、导致表单操作失败时抛出该错误。

继承自Error。

```typescript
class PlayerLeftError extends Error {
    private constructor();
    readonly formId: string;
}
```

#### 属性

- <ReadOnly/> formId: string，玩家离开时正在展示的表单标识符。

---

## 参考文档

本文主要参考文档如下，读者可以在这些文档获得更多信息。

- [@minecraft | projectxero.top](https://projectxero.top/sapi/index.html)
- [ScriptAPI 文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/)
- [ScriptAPI 测试版文档 | JaylyMC](https://jaylydev.github.io/scriptapi-docs/preview/)
- [`@minecraft/server-ui` 更新日志 | Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-ui/changelog?view=minecraft-bedrock-stable)
