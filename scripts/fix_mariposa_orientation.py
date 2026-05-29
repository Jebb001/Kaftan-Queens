"""Re-fetch & rotate the Mariposa Scarf photo to correct orientation.

The image likely has an EXIF orientation flag iPhone applies — Pillow ignores it
by default. We use ImageOps.exif_transpose to apply it, then save.
"""
import io, urllib.request, sys
from pathlib import Path
from PIL import Image, ImageOps

OUT = Path("/app/frontend/public/products/mariposa-stack.jpg")
URL = "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/uo96wqe0_IMG_7384.jpeg"

req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=60) as r:
    data = r.read()
img = Image.open(io.BytesIO(data))

# Honor EXIF orientation
orientation = img.getexif().get(274)  # 274 = Orientation tag
print(f"Original size: {img.size}, EXIF orientation: {orientation}")
img = ImageOps.exif_transpose(img)
print(f"After exif_transpose: {img.size}")

# Optional manual rotation if user explicitly says "wrong way up" — flip 180
if "--rotate" in sys.argv:
    angle = int(sys.argv[sys.argv.index("--rotate") + 1])
    img = img.rotate(angle, expand=True)
    print(f"Rotated by {angle}, new size: {img.size}")

if img.mode != "RGB":
    img = img.convert("RGB")
if img.width > 1400:
    ratio = 1400 / img.width
    img = img.resize((1400, int(img.height * ratio)), Image.LANCZOS)
img.save(OUT, "JPEG", quality=82, optimize=True, progressive=True)
print(f"Saved: {OUT.stat().st_size/1024:.0f} KB ({img.size})")
