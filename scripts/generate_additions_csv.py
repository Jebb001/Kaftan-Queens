"""Generate a delta CSV for adding new variants to existing Shopify products.

This is for adding new colour/size variants without touching existing data.
Import in Shopify: Products → Import → DO NOT tick "Overwrite" — Shopify will
add only the new rows under the existing handle.
"""
import csv
from pathlib import Path

# Add new variants here as (handle, [(colour, [images], [sizes_or_None], price)])
ADDITIONS = [
    (
        "palazzo-trousers",
        [
            (
                "Pink Tiedye",
                [
                    "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/jnarnwb5_image0%20%281%29.jpeg",
                    "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/j7emy92w_image1.jpeg",
                ],
                ["Short", "Long"],
                "65.00",
            ),
        ],
    ),
]

HEADERS = [
    "Handle", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", "Tags",
    "Published", "Option1 Name", "Option1 Value", "Option2 Name", "Option2 Value",
    "Option3 Name", "Option3 Value",
    "Variant SKU", "Variant Grams", "Variant Inventory Tracker", "Variant Inventory Qty",
    "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price",
    "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable",
    "Variant Barcode", "Image Src", "Image Position", "Image Alt Text", "Gift Card",
    "SEO Title", "SEO Description", "Variant Image", "Variant Weight Unit",
    "Variant Tax Code", "Cost per item", "Status",
]


def slug(s: str) -> str:
    import re
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def build():
    rows = []
    image_pos_offset = 100  # high so it appends after existing images
    for handle, variants in ADDITIONS:
        seen_imgs = set()
        for colour, imgs, sizes, price in variants:
            sizes_iter = sizes or [None]
            for size in sizes_iter:
                row = {h: "" for h in HEADERS}
                row["Handle"] = handle
                row["Option1 Name"] = "Colour"
                row["Option1 Value"] = colour
                if sizes:
                    row["Option2 Name"] = "Size"
                    row["Option2 Value"] = size
                sku = f"KQ-{handle}-{slug(colour)}"
                if size:
                    sku += f"-{slug(size)}"
                row["Variant SKU"] = sku
                row["Variant Grams"] = "300"
                row["Variant Inventory Tracker"] = "shopify"
                row["Variant Inventory Qty"] = "10"
                row["Variant Inventory Policy"] = "deny"
                row["Variant Fulfillment Service"] = "manual"
                row["Variant Price"] = price
                row["Variant Requires Shipping"] = "TRUE"
                row["Variant Taxable"] = "TRUE"
                row["Variant Weight Unit"] = "g"
                row["Variant Image"] = imgs[0]
                rows.append(row)
            for img in imgs:
                if img in seen_imgs:
                    continue
                seen_imgs.add(img)
                ir = {h: "" for h in HEADERS}
                ir["Handle"] = handle
                ir["Image Src"] = img
                ir["Image Position"] = str(image_pos_offset)
                ir["Image Alt Text"] = f"{handle.replace('-', ' ').title()} - {colour}"
                rows.append(ir)
                image_pos_offset += 1
    return rows


def main():
    out = Path("/app/frontend/public/downloads/kaftan_queens_additions.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    rows = build()
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    # also keep a copy in /app/scripts for record
    other = Path("/app/scripts/kaftan_queens_additions.csv")
    other.write_bytes(out.read_bytes())
    print(f"Wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
