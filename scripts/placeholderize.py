#!/usr/bin/env python3
"""Replace visible copy with lorem and content photos with placeholders."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "index.html"

LOREM = (
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod "
    "tempor incididunt ut labore et dolore magna aliqua ut enim ad minim "
    "veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea "
    "commodo consequat duis aute irure dolor in reprehenderit in voluptate "
    "velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat "
    "cupidatat non proident sunt in culpa qui officia deserunt mollit anim id "
    "est laborum"
).split()

SIZES = [
    (1600, 900),
    (1200, 800),
    (800, 600),
    (640, 480),
    (400, 300),
    (333, 222),
]
COLORS = [
    ("d9d3cc", "5c534c"),
    ("c5d0d6", "3d4a52"),
    ("e6d5d5", "6a4a4a"),
    ("d5ddd6", "3e5244"),
    ("e4e0d4", "5a5648"),
    ("ddd9e4", "4a4458"),
]

SKIP_IMG = (
    "bg-transparent",
    "favicon",
    "apple-icon",
    "android-icon",
    "ms-icon",
    "manifest.json",
)

img_i = 0
url_cache = {}


def to_lorem(text: str) -> str:
    stripped = text.strip()
    if not stripped:
        return text
    visible = re.sub(r"&(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);", " ", stripped)
    words = re.findall(r"[^\W\d_](?:[^\W\d_]|['’.-])*", visible, flags=re.UNICODE)
    words = [w for w in words if len(w) > 1]
    if not words:
        return text
    out = " ".join(LOREM[i % len(LOREM)] for i in range(len(words)))
    letters = "".join(ch for ch in stripped if ch.isalpha())
    if letters and letters.isupper():
        out = out.upper()
    elif stripped[:1].isupper() and not stripped.isupper():
        out = out[:1].upper() + out[1:]
    prefix = text[: len(text) - len(text.lstrip())]
    suffix = text[len(text.rstrip()) :]
    return prefix + out + suffix


def dummy_url(width=None, height=None) -> str:
    global img_i
    img_i += 1
    if not width or not height:
        width, height = SIZES[img_i % len(SIZES)]
    bg, fg = COLORS[img_i % len(COLORS)]
    return f"https://placehold.co/{int(width)}x{int(height)}/{bg}/{fg}/jpg?text=Image"


def replace_image_url(url: str, width=None, height=None) -> str:
    if any(token in url for token in SKIP_IMG):
        return url
    if not re.search(r"\.(?:jpe?g|png|webp|gif)(?:$|\?)", url, re.I):
        return url
    if url not in url_cache:
        url_cache[url] = dummy_url(width, height)
    return url_cache[url]


def replace_images(html: str) -> str:
    def repl_tag(match: re.Match) -> str:
        tag = match.group(0)
        width = None
        height = None
        wm = re.search(r'\bwidth="(\d+)"', tag)
        hm = re.search(r'\bheight="(\d+)"', tag)
        if wm and hm:
            width, height = int(wm.group(1)), int(hm.group(1))

        def repl_src(m: re.Match) -> str:
            attr, q, val = m.group(1), m.group(2), m.group(3)
            if attr.lower() == "srcset":
                parts = []
                for piece in val.split(","):
                    piece = piece.strip()
                    if not piece:
                        continue
                    bits = piece.split()
                    bits[0] = replace_image_url(bits[0], width, height)
                    parts.append(" ".join(bits))
                new_val = ", ".join(parts)
            else:
                new_val = replace_image_url(val, width, height)
            return f"{attr}={q}{new_val}{q}"

        return re.sub(
            r'\b(src|srcset|poster)\s*=\s*(["\'])(.*?)\2',
            repl_src,
            tag,
            flags=re.I | re.S,
        )

    return re.sub(r"<img\b[^>]*>|<source\b[^>]*>", repl_tag, html, flags=re.I)

def replace_meta_images(html: str) -> str:
    def repl(match: re.Match) -> str:
        return match.group(1) + replace_image_url(match.group(2)) + match.group(3)

    return re.sub(
        r'(content=")([^"]+\.(?:jpe?g|png|webp|gif)(?:\?[^"]*)?)(")',
        repl,
        html,
        flags=re.I,
    )


def replace_attrs(chunk: str) -> str:
    def repl(m: re.Match) -> str:
        name, q, val = m.group(1), m.group(2), m.group(3)
        lower = name.lower()
        if lower == "content":
            if val.startswith("http") or "width=" in val or "/" in val:
                return m.group(0)
            if " " not in val and len(val) < 24:
                return m.group(0)
            if not re.search(r"[A-Za-z]{3,}", val):
                return m.group(0)
        new = to_lorem(val)
        if new == val:
            return m.group(0)
        return f"{name}={q}{new}{q}"

    return re.sub(
        r'\b(alt|title|aria-label|placeholder|content|data-map-comment)\s*=\s*(["\'])(.*?)\2',
        repl,
        chunk,
        flags=re.I | re.S,
    )


def replace_text_nodes(chunk: str) -> str:
    def repl(m: re.Match) -> str:
        return to_lorem(m.group(0))

    return re.sub(r"(?<=>)[^<]+", repl, chunk)


def replace_logos(html: str) -> str:
    html = re.sub(
        r'<svg xmlns="http://www.w3.org/2000/svg" width="241" height="104".*?</svg>',
        '<img src="https://placehold.co/241x104/ffffff/cc0000/png?text=Logo" alt="Lorem ipsum" style="height:32px;width:auto;display:block">',
        html,
        count=1,
        flags=re.S,
    )
    html = html.replace(
        "/themes/custom/msf_theme/src/kss/components/icons/assets/logo-white-en.svg",
        "https://placehold.co/180x78/222222/ffffff/png?text=Logo",
    )
    return html


def enlarge_sources(html: str) -> str:
    def repl(match: re.Match) -> str:
        tag = match.group(0)
        if "min-width: 1200" in tag:
            size = "1600x900"
        elif "min-width: 750" in tag:
            size = "1200x800"
        else:
            size = "800x600"
        return re.sub(r"placehold\.co/\d+x\d+", f"placehold.co/{size}", tag)

    return re.sub(r"<source\b[^>]*>", repl, html, flags=re.I)


def lorem_ldjson(html: str) -> str:
    def repl(match: re.Match) -> str:
        raw = match.group(1)
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            return match.group(0)

        def walk(node):
            if isinstance(node, str):
                if node.startswith("http") or node.startswith("@"):
                    return node
                if " " not in node and len(node) < 12:
                    return node
                updated = to_lorem(node).strip()
                return updated or node
            if isinstance(node, list):
                return [walk(item) for item in node]
            if isinstance(node, dict):
                return {key: walk(value) for key, value in node.items()}
            return node

        return "<script type=\"application/ld+json\">" + json.dumps(walk(data), ensure_ascii=False) + "</script>"

    return re.sub(
        r'<script type="application/ld\+json">(.*?)</script>',
        repl,
        html,
        flags=re.S,
    )


def transform(html: str) -> str:
    html = html.replace(
        'data-video-url="https://www.youtube.com/embed/l3D7US0EYFg"',
        'data-video-url=""',
    )
    html = replace_images(html)
    html = replace_meta_images(html)
    html = replace_logos(html)
    html = enlarge_sources(html)
    html = lorem_ldjson(html)
    parts = re.split(
        r"(<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>)",
        html,
        flags=re.I | re.S,
    )
    out = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            out.append(part)
            continue
        part = replace_attrs(part)
        part = replace_text_nodes(part)
        out.append(part)
    return "".join(out)


def main() -> None:
    original = HTML_PATH.read_text(encoding="utf-8")
    updated = transform(original)
    HTML_PATH.write_text(updated, encoding="utf-8")
    print(f"images replaced: {len(url_cache)}")
    print(f"bytes {len(original)} -> {len(updated)}")


if __name__ == "__main__":
    main()
