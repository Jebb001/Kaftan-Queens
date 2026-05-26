"""Download, compress, and locally host all customer-uploaded product photos.

Output: /app/frontend/public/products/<name>.jpg
Goal: max 1600px wide, ~80% JPEG quality, target ~300-500KB per image.
Also prints a Python dict mapping original URL → new local path for easy code update.
"""
import io
from pathlib import Path
import urllib.request

from PIL import Image

OUT_DIR = Path("/app/frontend/public/products")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# (original_url, output_filename)
IMAGES = [
    # Butterfly Long Dress
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/8ljk3v2z_IMG_7416.jpeg", "butterfly-antique-rose-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/nv65hwob_IMG_7418.jpeg", "butterfly-antique-rose-2.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/65p0r42i_IMG_7422.jpeg", "butterfly-blue-white-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/15j49w2l_IMG_7421.jpeg", "butterfly-blue-white-2.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/k6cba05r_IMG_7397.jpeg", "butterfly-bohemian-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/qbsx0eib_IMG_7398.jpeg", "butterfly-bohemian-2.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/x9hsejjh_IMG_7403.jpeg", "butterfly-python-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/2lqunex6_IMG_7406.jpeg", "butterfly-python-2.jpg"),
    # Palazzo trousers
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/d7oylynn_IMG_7390.jpeg", "palazzo-teal-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/y55peeo7_IMG_7388.jpeg", "palazzo-pinkblue-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/n0q5jym0_IMG_7389.jpeg", "palazzo-pinkblue-2.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/kiy3fv41_IMG_7393.jpeg", "palazzo-orange-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ksy8bvve_IMG_7392.jpeg", "palazzo-orange-2.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/mug96hpj_IMG_7395.jpeg", "palazzo-pinktiedye-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/pgrv7vig_IMG_7394.jpeg", "palazzo-pinktiedye-2.jpg"),
    # Narlai Dress — Pink/Orange Teardrop (pending)
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/nraya2wi_IMG_7319.jpeg", "narlai-pink-orange-teardrop-1.jpg"),
    ("https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/2nx2r33k_IMG_7311.jpeg", "narlai-pink-orange-teardrop-2.jpg"),
]

MAX_WIDTH = 1600
QUALITY = 82  # JPEG quality


def compress(url: str, out_name: str) -> tuple[int, int]:
    """Returns (original_size, new_size) in bytes."""
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    orig_size = len(data)

    img = Image.open(io.BytesIO(data))
    # Convert to RGB (drops alpha; safe for JPEG)
    if img.mode != "RGB":
        img = img.convert("RGB")
    # Resize if wider than MAX_WIDTH
    if img.width > MAX_WIDTH:
        ratio = MAX_WIDTH / img.width
        new_size = (MAX_WIDTH, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    out_path = OUT_DIR / out_name
    img.save(out_path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    return orig_size, out_path.stat().st_size


def main():
    total_orig = 0
    total_new = 0
    mapping = {}
    for url, name in IMAGES:
        try:
            orig, new = compress(url, name)
        except Exception as e:
            print(f"FAILED {name}: {e}")
            continue
        total_orig += orig
        total_new += new
        mapping[url] = f"/products/{name}"
        print(f"{name}: {orig/1024:.0f} KB → {new/1024:.0f} KB ({100*(1-new/orig):.0f}% smaller)")

    print()
    print(f"TOTAL: {total_orig/1024/1024:.1f} MB → {total_new/1024/1024:.1f} MB "
          f"({100*(1-total_new/total_orig):.0f}% smaller)")
    print()
    print("URL_MAP = {")
    for src, dst in mapping.items():
        print(f'  "{src}": "{dst}",')
    print("}")


if __name__ == "__main__":
    main()
