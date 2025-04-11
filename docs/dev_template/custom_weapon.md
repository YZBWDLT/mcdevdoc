# 自定义武器 文档

:::danger[温馨提示]

本文档尚未更新。请在本文档更新后查看。

:::

:::info[本包性质]

本包为**行为包**和**资源包**结合的包。

:::

本文档分为国际版和中国版两部分，请按需阅读。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="international" label="国际版" default>

    ### 使用说明

    * 装载本包之后，将在您的世界添加一把武器。
      * 欲更改其属性，您可更改`BP/items`中的数值。
      * 见参考文献以查询各个组件的功能。
      * 注意：自定义的剑在破坏方块时不会消耗耐久。

    * 请注意此包中的`RP/textures/item_texture.json`可能与您现有的包冲突，请做好合并工作。

    * 请注意此包仅适用于国际版 1.20.30+ 或更高版本。

    ### 参考文献

    * [Item JSON Documentation | 微软文档](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/?view=minecraft-bedrock-stable)

  </TabItem>
  <TabItem value="china" label="中国版">
    ### 使用说明

    * 装载本包之后，将在您的世界添加一把武器。
      * 欲更改其属性，您可更改`BP/netease_items_beh`中的数值。

    * 请注意此包中的`RP/textures/item_texture.json`可能与您现有的包冲突，请做好合并工作。

    * 请注意此包仅适用于中国版。

  </TabItem>
</Tabs>
