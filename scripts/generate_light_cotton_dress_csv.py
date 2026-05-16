"""Generate a CSV for the new Light Cotton Dress product.
Use with Shopify Import → leave "Overwrite" UNCHECKED (it's a brand new product).
"""
import csv
import re
from pathlib import Path

HANDLE = "light-cotton-dress"
TITLE = "Light Cotton Dress"
PRICE = "75.00"
TYPE = "Dress"
TAGS = "women,dress,new"
BODY = "<p>A breezy lightweight cotton dress with a delicate hand-printed floral motif, ruffled sleeves and shoulders, smocked waist, and tasselled drawstring tie. Effortless femininity for sun-drenched days.</p><ul><li>Material: 100% Cotton</li><li>Origin: Hand-printed in India</li><li>Care: Machine wash cold. Warm iron on reverse. Do not tumble dry.</li></ul>"

VARIANTS = [
    ("Pink White", [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ka9ax8vj_7d05f83a-a321-42cc-af6d-cfd184bb8975.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ra5xg2lw_5654a25f-7bfc-48e3-af34-6bf0da481eb5.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/y3xx0o3z_20447cc2-0441-4efb-9a8b-34354ecdcfef.jpeg",
    ]),
    ("White Ditsy", [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/3h7lsqkt_IMG_7306.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ygcvmbdh_IMG_7307.jpeg",
    ]),
    ("Blue Flower", [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/dalun1op_IMG_7300.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/wmv5mqsy_IMG_7301.jpeg",
    ]),
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


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def main():
    rows = []
    first = True
    image_pos = 1
    seen = set()
    for colour, imgs in VARIANTS:
        row = {h: "" for h in HEADERS}
        row["Handle"] = HANDLE
        if first:
            row["Title"] = TITLE
            row["Body (HTML)"] = BODY
            row["Vendor"] = "Kaftan Queens"
            row["Type"] = TYPE
            row["Tags"] = TAGS
            row["Published"] = "TRUE"
            row["SEO Title"] = f"{TITLE} | Kaftan Queens"
            row["Status"] = "active"
            first = False
        row["Option1 Name"] = "Colour"
        row["Option1 Value"] = colour
        row["Variant SKU"] = f"KQ-{HANDLE}-{slug(colour)}"
        row["Variant Grams"] = "300"
        row["Variant Inventory Tracker"] = "shopify"
        row["Variant Inventory Qty"] = "10"
        row["Variant Inventory Policy"] = "deny"
        row["Variant Fulfillment Service"] = "manual"
        row["Variant Price"] = PRICE
        row["Variant Requires Shipping"] = "TRUE"
        row["Variant Taxable"] = "TRUE"
        row["Variant Weight Unit"] = "g"
        row["Variant Image"] = imgs[0]
        rows.append(row)
        for img in imgs:
            if img in seen:
                continue
            seen.add(img)
            ir = {h: "" for h in HEADERS}
            ir["Handle"] = HANDLE
            ir["Image Src"] = img
            ir["Image Position"] = str(image_pos)
            ir["Image Alt Text"] = f"{TITLE} - {colour}"
            rows.append(ir)
            image_pos += 1

    out = Path("/app/frontend/public/downloads/light_cotton_dress.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"Wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
