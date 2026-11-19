# mcdevdoc-mcp

[量筒的 Minecraft 基岩版开发文档](https://mcdevdoc.nekoawa.com/) 的 MCP 服务端。

让 Claude、Cursor 这类 AI 编辑器直接查文档，而不是凭记忆编组件名、参数名和版本号。

## 能查什么

覆盖文档里全部 4670 条接口：

| 类别 | 条数 | 说明 |
| --- | --- | --- |
| 命令 | 86 | 所有斜杠命令 |
| 物品组件 | 87 | 数据驱动物品组件 |
| 方块组件 | 110 | 数据驱动方块组件 |
| 方块特征 | 4 | 原版方块行为特征 |
| 实体组件 | 407 | 数据驱动实体组件 |
| 实体事件 | 22 | 实体事件 ID 与响应 |
| 实体过滤器 | 108 | 过滤器测试 |
| Molang 查询 | 317 | 实体、方块、物品的 query 函数 |
| 战利品表 | 43 | 战利品函数与条件 |
| 标签 | 120 | 原版物品与方块标签 |
| Script API | 1421 | 国际版 `@minecraft/server` 等模块 |
| ModAPI 接口 | 1584 | 中国版脚本接口 |
| ModAPI 事件 | 302 | 中国版脚本事件 |
| ModAPI 枚举值 | 59 | 中国版脚本枚举值 |

## 四个工具

**`search_interfaces`** —— 按名称或关键词搜索。名称可以用简称：`nearest_attackable_target`、`addEffect`、`/tp`、`query.is_alive` 都能命中。中文用两到四个关键词效果最好，「火焰免疫」「耐久」「掉落」这类说法都很准。

> 这里不是语义检索。整句问句（「怎么给物品加耐久」）会被拆成噪声词，命中率下降。想要什么就直接说术语。

**`get_interface`** —— 取完整内容：定义、参数树（含类型、默认值、必填标记、行内版本）、示例代码、站内链接。参数树保留原始缩进层级，AI 能直接照着写 JSON。

**`validate_components`** —— 校验实体、物品、方块的 JSON。逐个对照文档检查组件是否存在、参数名是否写对、类型对不对、枚举值是否越界。允许 `//` 注释和尾逗号。

```
校验了 60 个组件，发现 0 个错误、25 处提示。

## 提示
⚠ minecraft:healable.items[].item（×18）
   文档标注为对象，这里写的是字符串
   文档：物品描述符，可写物品 ID。
   https://mcdevdoc.nekoawa.com/docs/docs/entities/components/functional#minecrafthealable
```

校验分两级：**错误**只用于「文档里没有这个组件」，**提示**用于参数名、类型、枚举这些可能来自文档未收录的项。这样即使文档有缺口，也不会让 AI 照着错的提示去改代码。

**`list_categories`** —— 列出全部类别和当前基准版本，不确定东西属于哪一类时先调这个。

## 安装

需要一个 Node.js（18 以上）。

```bash
git clone <本仓库>
cd mcdevdoc/mcp
npm install
npm run build:data
```

`build:data` 会扫一遍 `docs/` 生成 `data/interfaces.json`，约 5 MB。文档改动之后要重新跑一次。

### Claude Desktop

编辑 `claude_desktop_config.json`（Windows 在 `%APPDATA%\Claude\`，macOS 在 `~/Library/Application Support/Claude/`）：

```json
{
  "mcpServers": {
    "mcdevdoc": {
      "command": "node",
      "args": ["D:/Minecraft/文档/mcdevdoc/mcp/bin/mcdevdoc-mcp.js"]
    }
  }
}
```

### Cursor

在项目里建 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "mcdevdoc": {
      "command": "node",
      "args": ["D:/Minecraft/文档/mcdevdoc/mcp/bin/mcdevdoc-mcp.js"]
    }
  }
}
```

### 其他客户端

任何支持 stdio 传输的 MCP 客户端都一样：命令 `node`，参数是 `bin/mcdevdoc-mcp.js` 的绝对路径。

## 数据从哪来

来自站点本身的 `plugins/interface-index` 插件 —— 和 `/quick_reference` 页面用的是同一份索引。

MCP 这边不另写一套 Markdown 解析逻辑。两套解析器迟早会不一致，那时候 AI 说的版本号和站上写的对不上，比没有 MCP 更糟。

## 测一下

```bash
npm test
```

会真的起一个子进程走 stdio 收发 JSON-RPC，走一遍握手、列工具、搜索、取详情、校验、错误路径。

## 反过来体检文档

```bash
npm run audit
```

拿官方模板 `behavior_pack/entities/` 下的 128 个文件反过来跑一遍校验，列出「文档没收录的组件」「文档没记录的参数」「类型标注与实际写法不符」三类缺口。

这是维护文档用的，不是给 AI 用的。跑一次大概能看出哪些组件该补。

## 已知取舍

- **只做本地 stdio**：不做远程 HTTP。远程版需要常驻服务，等本地版验证过价值再说。
- **不缓存会话**：每次查询都是无状态的，AI 多调几次也没关系。
- **参数树有长度上限**：单条超过 7000 字会截断，并提示去看站内页面。
