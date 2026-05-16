"""Generate a full replacement CSV for palazzo-trousers including the new
Pink Tiedye variant. Use with Shopify Import → tick "Overwrite existing".
This is safe because it includes ALL existing data + the new variant.
"""
import csv
import re
from pathlib import Path

HANDLE = "palazzo-trousers"
TITLE = "Palazzo Trousers"
PRICE = "65.00"
TYPE = "Trousers"
TAGS = "women,trousers,new"
BODY = "<p>New Palazzo trousers with a wide, comfortable stretch waist that sits beautifully on any silhouette. Wide, flowing leg in a delicate hand-printed floral cotton. Available in two lengths &mdash; Short or Long &mdash; so you can find the perfect fit.</p><ul><li>Material: Cotton</li><li>Origin: Hand-printed in India</li><li>Sizing: Inside leg to hem &mdash; Short 53 cm &middot; Long 66 cm</li><li>Care: Machine wash cold. Warm iron on reverse. Do not tumble dry.</li></ul>"

VARIANTS = [
    ("Teal Blue & White Flower", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/60ickvjo_image3.jpg",
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/40bg5a06_image0_20_281_29.jpg",
    ]),
    ("Pink & Blue Flower", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/tuejngv9_image0.jpg",
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/mkfwviik_image1.jpg",
    ]),
    ("Orange & Yellow Flower", [
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/36vuwgr6_image1.jpg",
        "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/urki5462_image0.jpg",
    ]),
    ("Pink Tiedye", [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/jnarnwb5_image0%20%281%29.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/j7emy92w_image1.jpeg",
    ]),
]
SIZES = ["Short", "Long"]

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


def main():
    rows = []
    first = True
    image_pos = 1
    seen_imgs = set()

    for colour, imgs in VARIANTS:
        for size in SIZES:
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
            row["Option2 Name"] = "Size"
            row["Option2 Value"] = size
            row["Variant SKU"] = f"KQ-{HANDLE}-{slug(colour)}-{slug(size)}"
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
            if img in seen_imgs:
                continue
            seen_imgs.add(img)
            ir = {h: "" for h in HEADERS}
            ir["Handle"] = HANDLE
            ir["Image Src"] = img
            ir["Image Position"] = str(image_pos)
            ir["Image Alt Text"] = f"{TITLE} - {colour}"
            rows.append(ir)
            image_pos += 1

    out = Path("/app/frontend/public/downloads/palazzo_trousers_pink_tiedye.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"Wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
