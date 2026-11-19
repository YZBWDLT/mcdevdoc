/**
 * 拿官方模板反过来体检文档：哪些组件文档没收、哪些参数文档没记。
 *
 * 用法：
 *   node scripts/audit-coverage.js [官方模板 behavior_pack/entities 目录]
 *
 * 这不是给 MCP 用的，是维护文档时自查用的 —— 校验器本身不会骗人，
 * 它的提示正好是文档的覆盖缺口清单。
 */

import fs from "node:fs";
import path from "node:path";
import { validate } from "../src/schema.js";

const DEFAULT_DIR =
    "D:/Minecraft/附加包/[BE 26.60.29]官方模板（测试版）/behavior_pack/entities";

const dir = process.argv[2] || DEFAULT_DIR;

if (!fs.existsSync(dir)) {
    console.error(`目录不存在：${dir}`);
    process.exit(1);
}

const missingComponents = new Map(); // 组件名 → 出现文件数
const unknownParams = new Map(); // 「组件: 参数」 → 次数
const typeMismatch = new Map(); // 「组件: 参数」 → { 说明, 次数 }

let files = 0;
let components = 0;

for (const name of fs.readdirSync(dir).filter(file => file.endsWith(".json"))) {
    const source = fs.readFileSync(path.join(dir, name), "utf8");
    const result = validate(source, "entity");
    if (result.fatal) {
        console.error(`${name}：${result.fatal}`);
        continue;
    }

    files += 1;
    components += result.checked;

    for (const issue of result.issues) {
        if (issue.message.includes("没有这个组件")) {
            missingComponents.set(issue.component, (missingComponents.get(issue.component) || 0) + 1);
            continue;
        }

        const leaf = issue.path.split(".").pop().replace(/\[\d+\]/g, "[]");
        const key = `${issue.component}: ${leaf}`;

        if (issue.message.includes("不在文档记录")) {
            unknownParams.set(key, (unknownParams.get(key) || 0) + 1);
        } else if (issue.message.startsWith("文档标注为")) {
            const note = issue.message.replace(/"[^"]*"/g, "").replace(/[\d.]+/g, "").trim();
            const existed = typeMismatch.get(key);
            if (existed) existed.count += 1;
            else typeMismatch.set(key, { note, count: 1 });
        }
    }
}

const sorted = map => [...map.entries()].sort((a, b) => b[1] - (a[1]?.count ?? 0));

console.log(`扫描 ${files} 个文件、${components} 个组件\n`);

console.log(`## 文档未收录的组件（${missingComponents.size}）`);
if (!missingComponents.size) console.log("  无");
for (const [name, count] of [...missingComponents].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${name}  （${count} 个文件用到）`);
}

console.log(`\n## 文档未记录的参数（${unknownParams.size}）`);
if (!unknownParams.size) console.log("  无");
for (const [key, count] of [...unknownParams].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${key}  （${count} 次）`);
}

console.log(`\n## 类型标注可能与实际写法不符（${typeMismatch.size}）`);
if (!typeMismatch.size) console.log("  无");
for (const [key, detail] of [...typeMismatch].sort((a, b) => b[1].count - a[1].count)) {
    console.log(`  ${key}  —— ${detail.note}（${detail.count} 例）`);
}
