#!/usr/bin/env python3
"""把 miSans 等字库裁成「本站真正用到的字符」。

中文字库动辄 4~5 MB，而全站实际用字只有两千出头，剩下的字形白白拖慢首屏。
这个脚本扫描文档与源码，收集字符集，再用 pyftsubset 生成只含这些字形的 woff2。

用法：
    python scripts/subset_fonts.py            # 生成子集字库
    python scripts/subset_fonts.py --check    # 只检查现有字库是否缺字

源文件放在 assets/fonts-src/（不在 static 下，不会被复制进产物），
产物写到 static/fonts/，文件名带 -subset 后缀，改动字库内容时请一并改版本号。

依赖：pip install fonttools brotli
新增文档后用到了新字，重跑一次即可。
"""

import argparse
import os
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "assets", "fonts-src")
OUT_DIR = os.path.join(ROOT, "static", "fonts")

SCAN_DIRS = ["docs", "blog", "update-log", "src"]
SCAN_FILES = ["docusaurus.config.js", "sidebars.js"]
EXTS = {".md", ".mdx", ".js", ".jsx", ".ts", ".tsx", ".css", ".json"}

# 源文件 → 产物文件名。改内容时把后缀数字 +1，避免 CDN 的 immutable 缓存拿到旧文件。
FONTS = [
    ("misans_normal.woff2", "misans_normal-subset.woff2"),
    ("misans_bold.woff2", "misans_bold-subset.woff2"),
    ("NotoSans-Bold.ttf", "NotoSans-Bold-subset.woff2"),
]

# 只留中文排版真正用得上的特性，其余（竖排、语言本地化等）丢掉能省几十 KB。
LAYOUT_FEATURES = ["kern", "liga", "clig", "calt", "ccmp", "mark", "mkmk"]

EXTRA_CHARS_FILE = os.path.join(SRC_DIR, "extra-chars.txt")


def collect_chars():
    chars = set()
    for rel in SCAN_DIRS:
        for base, dirs, files in os.walk(os.path.join(ROOT, rel)):
            dirs[:] = [d for d in dirs if d not in {"node_modules", ".git", ".docusaurus"}]
            for name in files:
                if os.path.splitext(name)[1] in EXTS:
                    path = os.path.join(base, name)
                    try:
                        chars.update(open(path, encoding="utf-8").read())
                    except (OSError, UnicodeDecodeError) as error:
                        print(f"  跳过 {path}: {error}", file=sys.stderr)
    for rel in SCAN_FILES:
        path = os.path.join(ROOT, rel)
        if os.path.exists(path):
            chars.update(open(path, encoding="utf-8").read())

    if os.path.exists(EXTRA_CHARS_FILE):
        extra = open(EXTRA_CHARS_FILE, encoding="utf-8").read()
        chars.update(extra)
        print(f"  追加手工补充字符 {len(set(extra))} 个")

    # 控制字符没有字形，留着会让 fontTools 报无意义警告
    return {c for c in chars if ord(c) >= 0x20}


def subset_font(src, dst, chars):
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = LAYOUT_FEATURES
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    options.notdef_outline = True
    options.recommended_glyphs = True
    options.drop_tables += ["DSIG"]

    font = subset.load_font(src, options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text="".join(sorted(chars)))
    subsetter.subset(font)
    subset.save_font(font, dst, options)


def cmap_of(path):
    font = TTFont(path)
    return set(font.getBestCmap().keys())


def check(chars):
    """判断现有子集是否漏字。

    只比「源字库里本来有的字」：emoji、数学符号这些源字体自己都没有，
    缺了也只会回退到系统字体，不该算失败。
    """
    print("检查现有字库能否覆盖全站字符……")
    ok = True
    for src_name, out_name in FONTS:
        src_path = os.path.join(SRC_DIR, src_name)
        out_path = os.path.join(OUT_DIR, out_name)
        if not os.path.exists(out_path):
            print(f"  ✗ 缺少 {out_name}，请先运行 python scripts/subset_fonts.py")
            ok = False
            continue
        src_cmap = cmap_of(src_path)
        out_cmap = cmap_of(out_path)
        missing = [c for c in chars if ord(c) in src_cmap and ord(c) not in out_cmap]
        if missing:
            ok = False
            print(f"  ✗ {out_name} 缺 {len(missing)} 个字符：{''.join(sorted(missing))[:80]}")
        else:
            print(f"  ✓ {out_name}")
    return ok


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="只检查缺字，不重新生成")
    args = parser.parse_args()

    print("扫描文档与源码……")
    chars = collect_chars()
    print(f"  共 {len(chars)} 个不同字符（汉字 {sum(1 for c in chars if '\u4e00' <= c <= '\u9fff')} 个）")

    if args.check:
        sys.exit(0 if check(chars) else 1)

    charset_file = os.path.join(SRC_DIR, "charset.txt")
    with open(charset_file, "w", encoding="utf-8") as handle:
        handle.write("".join(sorted(chars)))
    print(f"  字符集清单 -> {os.path.relpath(charset_file, ROOT)}")

    total_before = 0
    total_after = 0
    print("\n生成子集字库：")
    for src_name, out_name in FONTS:
        src = os.path.join(SRC_DIR, src_name)
        dst = os.path.join(OUT_DIR, out_name)
        if not os.path.exists(src):
            print(f"  ✗ 找不到源文件 {src_name}", file=sys.stderr)
            sys.exit(1)
        subset_font(src, dst, chars)
        before = os.path.getsize(src)
        after = os.path.getsize(dst)
        total_before += before
        total_after += after
        print(f"  {out_name:<34} {before/1048576:6.2f} MB → {after/1024:6.0f} KB  (-{100 - after * 100 // before}%)")

    print(f"\n合计 {total_before/1048576:.2f} MB → {total_after/1024:.0f} KB")


if __name__ == "__main__":
    main()
