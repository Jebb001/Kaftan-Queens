"""Compress the new Mariposa Scarf stack photo."""
import io, urllib.request
from pathlib import Path
from PIL import Image

OUT = Path("/app/frontend/public/products/mariposa-stack.jpg")
URL = "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/uo96wqe0_IMG_7384.jpeg"

req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=60) as r:
    data = r.read()
img = Image.open(io.BytesIO(data))
if img.mode != "RGB":
    img = img.convert("RGB")
if img.width > 1400:
    ratio = 1400 / img.width
    img = img.resize((1400, int(img.height * ratio)), Image.LANCZOS)
img.save(OUT, "JPEG", quality=82, optimize=True, progressive=True)
print(f"{OUT.name}: {len(data)/1024:.0f} KB -> {OUT.stat().st_size/1024:.0f} KB ({img.width}x{img.height})")
