#!/usr/bin/env python3
"""把首页与资源卡的大图压到实际显示尺寸能用的最大分辨率。

原图放在 assets/img-src/，产物写到 static/，文件名保持不变，所以页面引用不用改。
新增图片时把原图丢进 assets/img-src 对应子目录，再跑一次本脚本。

用法：
    python scripts/optimize_images.py

依赖：pip install pillow
"""

import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "assets", "img-src")
OUT_DIR = os.path.join(ROOT, "static")

# 目录 → (最长边像素, 质量)。尺寸按实际显示尺寸 × 2 倍屏取整。
TARGETS = {
    "site": (1280, 72),          # 首页各屏的 cover 背景，上面还压着暗化与模糊滤镜
    "resources": (640, 78),      # 资源卡封面，显示区 315×174
}


def optimize(src_dir, out_dir, max_width, quality):
    if not os.path.isdir(src_dir):
        return 0, 0
    before = after = 0
    for name in sorted(os.listdir(src_dir)):
        if not name.lower().endswith((".webp", ".png", ".jpg", ".jpeg")):
            continue
        src = os.path.join(src_dir, name)
        stem = os.path.splitext(name)[0]
        dst = os.path.join(out_dir, stem + ".webp")
        os.makedirs(out_dir, exist_ok=True)

        image = Image.open(src).convert("RGBA")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.LANCZOS)
        image.save(dst, "WEBP", quality=quality, method=6)

        size_before = os.path.getsize(src)
        size_after = os.path.getsize(dst)
        before += size_before
        after += size_after
        print(f"  {name:<32} {size_before/1024:6.0f} KB → {size_after/1024:5.0f} KB")
    return before, after


def main():
    total_before = total_after = 0
    for sub, (max_width, quality) in TARGETS.items():
        print(f"\n[{sub}] 最长边 {max_width}px，质量 {quality}")
        before, after = optimize(os.path.join(SRC_DIR, sub), os.path.join(OUT_DIR, sub), max_width, quality)
        if before == 0:
            print("  （没有源图，跳过）")
        total_before += before
        total_after += after

    if total_before:
        print(f"\n合计 {total_before/1048576:.2f} MB → {total_after/1048576:.2f} MB")


if __name__ == "__main__":
    sys.exit(main())
