"""Generate a delta CSV of new products + variants to import into Shopify.

Import in Shopify: Products → Import → DO NOT tick "Overwrite" — Shopify will
add new rows under existing handles and create brand new products as needed.
"""
import csv
import re
from pathlib import Path

# --- 1) Brand-new products to create ---
NEW_PRODUCTS = [
    {
        "handle": "light-cotton-dress",
        "title": "Light Cotton Dress",
        "price": "75.00",
        "type": "Dress",
        "tags": "women,dress,new",
        "body": "<p>A breezy lightweight cotton dress with a delicate hand-printed floral motif, ruffled sleeves and shoulders, smocked waist, and tasselled drawstring tie. Effortless femininity for sun-drenched days.</p><ul><li>Material: 100% Cotton</li><li>Origin: Hand-printed in India</li><li>Care: Machine wash cold. Warm iron on reverse. Do not tumble dry.</li></ul>",
        "option1": "Colour",
        "variants": [
            (
                "Pink White",
                [
                    "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ka9ax8vj_7d05f83a-a321-42cc-af6d-cfd184bb8975.jpeg",
                    "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ra5xg2lw_5654a25f-7bfc-48e3-af34-6bf0da481eb5.jpeg",
                    "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/y3xx0o3z_20447cc2-0441-4efb-9a8b-34354ecdcfef.jpeg",
                ],
                None,  # no sizes
            ),
        ],
    },
]

# --- 2) New variants to add to EXISTING products ---
VARIANT_ADDITIONS = [
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
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def build_rows():
    rows = []
    image_pos_offset = 100

    # 1) New products
    for p in NEW_PRODUCTS:
        handle = p["handle"]
        first = True
        seen_imgs = set()
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
                row["Variant Inventory Qty"] = "10"
                row["Variant Inventory Policy"] = "deny"
                row["Variant Fulfillment Service"] = "manual"
                row["Variant Price"] = p["price"]
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
                ir["Image Alt Text"] = f"{p['title']} - {colour}"
                rows.append(ir)
                image_pos_offset += 1

    # 2) Variant additions to existing products
    for handle, variants in VARIANT_ADDITIONS:
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
    rows = build_rows()
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    Path("/app/scripts/kaftan_queens_additions.csv").write_bytes(out.read_bytes())
    print(f"Wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
