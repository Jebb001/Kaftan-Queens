"""Compress the two new Bohemian-variant photos."""
import io, urllib.request
from pathlib import Path
from PIL import Image

OUT_DIR = Path("/app/frontend/public/products")
IMAGES = [
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/3qgr93l7_IMG_7416.jpeg", "butterfly-bohemian-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/5e05lmpb_IMG_7418.jpeg", "butterfly-bohemian-2.jpg"),
]

for url, name in IMAGES:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    img = Image.open(io.BytesIO(data))
    if img.mode != "RGB":
        img = img.convert("RGB")
    if img.width > 1600:
        ratio = 1600 / img.width
        img = img.resize((1600, int(img.height * ratio)), Image.LANCZOS)
    out_path = OUT_DIR / name
    img.save(out_path, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{name}: {len(data)/1024:.0f} KB → {out_path.stat().st_size/1024:.0f} KB")
