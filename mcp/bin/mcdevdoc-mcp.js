#!/usr/bin/env node
import { start } from "../src/server.js";

start().catch(error => {
    console.error(`[mcdevdoc-mcp] 启动失败：${error.message}`);
    process.exit(1);
});
