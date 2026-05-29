"""Re-encode every JPG in /app/frontend/public/products/ at quality=90.

Uses 4:4:4 chroma subsampling (subsampling=0) so colors stay crisp on stitched
prints like the Mariposa scarf. Honors EXIF orientation. Caps width at 1600px.
Result: visually indistinguishable from the originals (which were already
high-quality phone JPEGs), but with progressive encoding for faster decode.
"""
from pathlib import Path
from PIL import Image, ImageOps

DIR = Path("/app/frontend/public/products")
MAX_W = 1600
QUALITY = 90

total_before = 0
total_after = 0
for path in sorted(DIR.glob("*.jpg")):
    before = path.stat().st_size
    total_before += before
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)
    if img.mode != "RGB":
        img = img.convert("RGB")
    if img.width > MAX_W:
        ratio = MAX_W / img.width
        img = img.resize((MAX_W, int(img.height * ratio)), Image.LANCZOS)
    img.save(
        path,
        "JPEG",
        quality=QUALITY,
        optimize=True,
        progressive=True,
        subsampling=0,  # 4:4:4 — no chroma loss
    )
    after = path.stat().st_size
    total_after += after
    print(f"  {path.name}: {before/1024:.0f} KB → {after/1024:.0f} KB")

print()
print(f"TOTAL: {total_before/1024/1024:.1f} MB → {total_after/1024/1024:.1f} MB")
