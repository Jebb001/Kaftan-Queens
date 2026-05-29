"""Restore Yak Wool Scarf — re-imports title, vendor, type, FULL description,
tags, and price (£65) for all 7 variants. Images stay untouched.

Import in Shopify: Products → Import → ✅ TICK "Overwrite any current products
that have the same handle". This is safe because every required field is set.
"""
import csv
from pathlib import Path

HANDLE = "yak-wool-scarf"
TITLE = "Yak Wool Scarf"
VENDOR = "Kaftan Queens"
TYPE = "Scarf"
PRICE = "65.00"
TAGS = "accessories,scarf,yak-wool"
BODY = (
    "<p>A versatile scarf with a classic herringbone weave in a beautiful range "
    "of colours. Crafted from soft 100% yak wool &mdash; exceptional warmth and "
    "a refined finish.</p>"
    "<ul>"
    "<li>Material: 100% Yak Wool</li>"
    "<li>Origin: Made in India</li>"
    "<li>Care: Hand wash in cold water. Do not tumble dry.</li>"
    "</ul>"
)
VARIANTS = ["Turquoise", "Beige", "Black", "Blue", "Green", "Brown", "Purple"]

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


def main():
    rows = []
    for i, colour in enumerate(VARIANTS):
        row = {h: "" for h in HEADERS}
        row["Handle"] = HANDLE
        if i == 0:
            row["Title"] = TITLE
            row["Body (HTML)"] = BODY
            row["Vendor"] = VENDOR
            row["Type"] = TYPE
            row["Tags"] = TAGS
            row["Published"] = "TRUE"
            row["SEO Title"] = f"{TITLE} | Kaftan Queens"
            row["Status"] = "active"
        row["Option1 Name"] = "Colour"
        row["Option1 Value"] = colour
        row["Variant SKU"] = f"KQ-{HANDLE}-{colour.lower()}"
        row["Variant Grams"] = "200"
        row["Variant Inventory Tracker"] = "shopify"
        row["Variant Inventory Qty"] = "5"
        row["Variant Inventory Policy"] = "deny"
        row["Variant Fulfillment Service"] = "manual"
        row["Variant Price"] = PRICE
        row["Variant Requires Shipping"] = "TRUE"
        row["Variant Taxable"] = "TRUE"
        row["Variant Weight Unit"] = "g"
        rows.append(row)

    out = Path("/app/frontend/public/downloads/yak_wool_scarf_restore.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"Wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
