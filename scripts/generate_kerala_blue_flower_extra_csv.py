"""Full replacement CSV for kerala-mens-shirt with the new 'Navy Botanical' variant added.
All existing variants preserved. Import with "Overwrite" TICKED.
"""
import csv
import re
from pathlib import Path

HANDLE = "kerala-mens-shirt"
TITLE = "Kerala Men's Shirt"
PRICE = "65.00"
TYPE = "Shirt"
TAGS = "men,shirt,hand-printed"
BODY = "<p>Our classic Kerala men's shirt &mdash; pure cotton, block printed in Rajasthan by artisans who stamp each piece using wooden blocks. Available in a wide spectrum of prints.</p><ul><li>Material: 100% Cotton</li><li>Origin: Block printed in Rajasthan, India</li><li>Sizing: Arm length 56 cm &middot; Chest 62 cm</li><li>Care: Machine wash at 30&deg;C. Warm iron on reverse. Do not tumble dry.</li></ul>"

VARIANTS = [
    ("Blue Flower", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralablueflowermen_scottonshirtL.jpg?v=1778956780",
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralablueflowermen_scottonshirtL2.jpg?v=1778956780",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/yx4337eg_IMG_7332.jpeg",
    ]),
    ("Fuchsia", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralafushiaflowermen_scottonshirtL2.jpg?v=1778956780",
    ]),
    ("Green & Orange", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralagreenblockmen_scottonshirtL_45730605-055a-4193-ada7-0de1cf062fef.jpg?v=1778956780",
    ]),
    ("Blue Pattern", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralabeigewithturquoiseflowersmen_scottonshirtL.jpg?v=1778956780",
    ]),
    ("Navy Blue Block Print", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/KeralanavyblockonwhitemenscottonshirtL3.jpg?v=1778956780",
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/KeralanavyblockonwhitemenscottonshirtL.jpg?v=1778956780",
    ]),
    ("Pink Frangipani", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/KeralapinkfrangipanimenscottonshirtL.jpg?v=1778956780",
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/KeralapinkfrangipanimenscottonshirtL2.jpg?v=1778956780",
    ]),
    ("Pale Blue Block Print", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralapaleblueblockmen_scottonshirtL2.jpg?v=1778956780",
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

    out = Path("/app/frontend/public/downloads/kerala_blue_flower_extra.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"Wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
