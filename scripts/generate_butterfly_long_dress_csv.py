"""Generate a Shopify-ready CSV to create the new "Butterfly Long Dress" product.

Import in Shopify: Products → Import → DO NOT tick "Overwrite all products with matching handles".
Shopify will create a brand-new product with all four colour variants and images.
"""
import csv
import re
from pathlib import Path

PRODUCT = {
    "handle": "butterfly-long-dress",
    "title": "Butterfly Long Dress",
    "price": "95.00",
    "type": "Dress",
    "tags": "women,dress,new",
    "body": (
        "<p>A flowing, ankle-grazing dress with butterfly sleeves and a relaxed silhouette. "
        "Crafted in soft cotton/viscose blend, hand-finished in India. "
        "Made to flutter from beach to bar.</p>"
        "<ul>"
        "<li>Material: Cotton / Viscose blend</li>"
        "<li>Origin: Hand-finished in India</li>"
        "<li>Care: Dry clean only.</li>"
        "</ul>"
    ),
    # (colour, image_urls, sizes)
    "variants": [
        (
            "Antique Rose",
            [
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/8ljk3v2z_IMG_7416.jpeg",
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/nv65hwob_IMG_7418.jpeg",
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ume2efze_IMG_7412.jpeg",
            ],
            None,
        ),
        (
            "Blue/White",
            [
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/65p0r42i_IMG_7422.jpeg",
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/15j49w2l_IMG_7421.jpeg",
            ],
            None,
        ),
        (
            "Bohemian",
            [
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/k6cba05r_IMG_7397.jpeg",
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/qbsx0eib_IMG_7398.jpeg",
            ],
            None,
        ),
        (
            "Python",
            [
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/x9hsejjh_IMG_7403.jpeg",
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/2lqunex6_IMG_7406.jpeg",
            ],
            None,
        ),
    ],
}

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
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def build_rows():
    rows = []
    p = PRODUCT
    handle = p["handle"]
    first = True
    seen_imgs = set()
    image_pos = 1

    # Variant rows
    for colour, imgs, sizes in p["variants"]:
        sizes_iter = sizes or [None]
        for size in sizes_iter:
            row = {h: "" for h in HEADERS}
            row["Handle"] = handle
            if first:
                row["Title"] = p["title"]
                row["Body (HTML)"] = p["body"]
                row["Vendor"] = "Kaftan Queens"
                row["Type"] = p["type"]
                row["Tags"] = p["tags"]
                row["Published"] = "TRUE"
                row["SEO Title"] = f"{p['title']} | Kaftan Queens"
                row["SEO Description"] = (
                    "Flowing butterfly-sleeve maxi dress in cotton/viscose blend. "
                    "Hand-finished in India. Antique Rose, Blue/White, Bohemian, Python."
                )
                row["Status"] = "active"
                first = False
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
            row["Variant Inventory Qty"] = "5"
            row["Variant Inventory Policy"] = "deny"
            row["Variant Fulfillment Service"] = "manual"
            row["Variant Price"] = p["price"]
            row["Variant Requires Shipping"] = "TRUE"
            row["Variant Taxable"] = "TRUE"
            row["Variant Weight Unit"] = "g"
            row["Variant Image"] = imgs[0]
            rows.append(row)

        # Image rows (one row per unique image, linked by handle)
        for img in imgs:
            if img in seen_imgs:
                continue
            seen_imgs.add(img)
            ir = {h: "" for h in HEADERS}
            ir["Handle"] = handle
            ir["Image Src"] = img
            ir["Image Position"] = str(image_pos)
            ir["Image Alt Text"] = f"{p['title']} - {colour}"
            rows.append(ir)
            image_pos += 1

    return rows


def main():
    out = Path("/app/frontend/public/downloads/butterfly_long_dress.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    rows = build_rows()
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    # Mirror to /app/scripts for record
    Path("/app/scripts/butterfly_long_dress.csv").write_bytes(out.read_bytes())
    print(f"Wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
