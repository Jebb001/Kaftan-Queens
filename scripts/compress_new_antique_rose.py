"""Compress the new TRUE Antique Rose photo (single image)."""
import io, urllib.request
from pathlib import Path
from PIL import Image

OUT = Path("/app/frontend/public/products/butterfly-antique-rose-1.jpg")
URL = "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/m1v7qhzk_IMG_7412.jpeg"

req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=60) as r:
    data = r.read()
img = Image.open(io.BytesIO(data))
if img.mode != "RGB":
    img = img.convert("RGB")
if img.width > 1600:
    ratio = 1600 / img.width
    img = img.resize((1600, int(img.height * ratio)), Image.LANCZOS)
img.save(OUT, "JPEG", quality=82, optimize=True, progressive=True)
print(f"{OUT.name}: {len(data)/1024:.0f} KB → {OUT.stat().st_size/1024:.0f} KB")

# Delete the now-orphaned antique-rose-2 (only one photo for this variant)
old2 = Path("/app/frontend/public/products/butterfly-antique-rose-2.jpg")
if old2.exists():
    old2.unlink()
    print(f"Deleted: {old2.name}")
