"""Generate a full replacement CSV for palm-kaftan with the correct
image-to-colour-name mapping. Import with "Overwrite" TICKED.
"""
import csv
import re
from pathlib import Path

HANDLE = "palm-kaftan"
TITLE = "Palm Kaftan"
PRICE = "75.00"
TYPE = "Kaftan"
TAGS = "women,kaftan,bestseller"
BODY = "<p>A vibrant kaftan featuring a unique hand-printed design and a flattering drawstring waist. Crafted from a soft silk/viscose blend, this midi-length kaftan adds individual style and breezy comfort to your wardrobe.</p><ul><li>Material: Silk/Viscose</li><li>Origin: Hand-printed in Rajasthan, India</li><li>Care: Machine wash at 30&deg;C. Warm iron on reverse. Do not tumble dry.</li></ul>"

# Corrected mapping (existing colour names → matching image)
# Orange variant removed per user request.
VARIANTS = [
    ("Pink", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Palm_peach_kaftan.jpg?v=1778956769",
    ]),
    ("Green & Fuchsia", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Palmpinkandgreenkaftan.jpg?v=1778956769",
    ]),
    ("Blue & Red", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Palmblueandredkaftan.jpg?v=1778956769",
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

    out = Path("/app/frontend/public/downloads/palm_kaftan_fix.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"Wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
