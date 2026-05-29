"""Compress the new Yak Wool Scarf stack photo with EXIF orientation handling."""
import io, urllib.request
from pathlib import Path
from PIL import Image, ImageOps

OUT = Path("/app/frontend/public/products/yak-stack.jpg")
URL = "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/jbcaxnql_IMG_7381.jpeg"

req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=60) as r:
    data = r.read()
img = Image.open(io.BytesIO(data))
print(f"Original: {img.size}, EXIF orientation: {img.getexif().get(274)}")
img = ImageOps.exif_transpose(img)
if img.mode != "RGB":
    img = img.convert("RGB")
if img.width > 1400:
    ratio = 1400 / img.width
    img = img.resize((1400, int(img.height * ratio)), Image.LANCZOS)
img.save(OUT, "JPEG", quality=82, optimize=True, progressive=True)
print(f"Saved: {OUT.stat().st_size/1024:.0f} KB ({img.size})")
