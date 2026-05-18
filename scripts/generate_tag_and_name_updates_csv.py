"""Combined CSV: tag + title updates.
- Palm Kaftan: remove 'bestseller' tag (and keep Orange-removed colour fix)
- Palazzo Trousers: add 'bestseller', remove 'new'
- Light Cotton Dress: rename title to 'Narlai Dress', remove 'new' tag
Use Shopify Import with "Overwrite" TICKED.
"""
import csv
import re
from pathlib import Path

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


def build_product_rows(p, image_pos_start=1):
    """Build CSV rows for a product. p = dict with handle, title, body, type, tags, price, variants(list of (colour, [imgs], sizes_or_None))"""
    rows = []
    first = True
    image_pos = image_pos_start
    seen = set()
    handle = p["handle"]
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
            if img in seen:
                continue
            seen.add(img)
            ir = {h: "" for h in HEADERS}
            ir["Handle"] = handle
            ir["Image Src"] = img
            ir["Image Position"] = str(image_pos)
            ir["Image Alt Text"] = f"{p['title']} - {colour}"
            rows.append(ir)
            image_pos += 1
    return rows


PALM_KAFTAN = {
    "handle": "palm-kaftan",
    "title": "Palm Kaftan",
    "price": "75.00",
    "type": "Kaftan",
    "tags": "women,kaftan",  # bestseller removed
    "body": "<p>A vibrant kaftan featuring a unique hand-printed design and a flattering drawstring waist. Crafted from a soft silk/viscose blend, this midi-length kaftan adds individual style and breezy comfort to your wardrobe.</p><ul><li>Material: Silk/Viscose</li><li>Origin: Hand-printed in Rajasthan, India</li><li>Care: Machine wash at 30&deg;C. Warm iron on reverse. Do not tumble dry.</li></ul>",
    "variants": [
        ("Pink", ["https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Palm_peach_kaftan.jpg?v=1778956769"], None),
        ("Green & Fuchsia", ["https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Palmpinkandgreenkaftan.jpg?v=1778956769"], None),
        ("Blue & Red", ["https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Palmblueandredkaftan.jpg?v=1778956769"], None),
    ],
}

PALAZZO = {
    "handle": "palazzo-trousers",
    "title": "Palazzo Trousers",
    "price": "55.00",
    "type": "Trousers",
    "tags": "women,trousers,bestseller",  # bestseller added, new removed
    "body": "<p>Palazzo trousers with a wide, comfortable stretch waist that sits beautifully on any silhouette. Wide, flowing leg in a delicate hand-printed floral cotton. Available in two lengths &mdash; Short or Long.</p><ul><li>Material: Cotton</li><li>Origin: Hand-printed in India</li><li>Sizing: Inside leg to hem &mdash; Short 53 cm &middot; Long 66 cm</li><li>Care: Machine wash cold. Warm iron on reverse. Do not tumble dry.</li></ul>",
    "variants": [
        ("Teal Blue & White Flower", [
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/60ickvjo_image3.jpg",
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/40bg5a06_image0_20_281_29.jpg",
        ], ["Short", "Long"]),
        ("Pink & Blue Flower", [
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/tuejngv9_image0.jpg",
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/mkfwviik_image1.jpg",
        ], ["Short", "Long"]),
        ("Orange & Yellow Flower", [
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/36vuwgr6_image1.jpg",
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/urki5462_image0.jpg",
        ], ["Short", "Long"]),
    ],
}

NARLAI = {
    "handle": "light-cotton-dress",
    "title": "Narlai Dress",
    "price": "95.00",
    "type": "Dress",
    "tags": "women,dress",  # new removed
    "body": "<p>A breezy lightweight cotton dress with a delicate hand-printed floral motif, ruffled sleeves and shoulders, smocked waist, and tasselled drawstring tie. Effortless femininity for sun-drenched days.</p><ul><li>Material: 100% Cotton</li><li>Origin: Hand-printed in India</li><li>Care: Machine wash cold. Warm iron on reverse. Do not tumble dry.</li></ul>",
    "variants": [
        ("Pink White", [
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/ka9ax8vj_7d05f83a-a321-42cc-af6d-cfd184bb8975.jpg",
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/ra5xg2lw_5654a25f-7bfc-48e3-af34-6bf0da481eb5.jpg",
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/y3xx0o3z_5aec3ca5-e17f-4142-82d1-8e258f728b4f.jpg",
        ], None),
        ("White Ditsy", [
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/3h7lsqkt_IMG_7306_f4544a0a-c7d0-49f7-bbe8-4a66ea048cb0.jpg",
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/ygcvmbdh_IMG_7307.jpg",
        ], None),
        ("Blue Flower", [
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/dalun1op_IMG_7300.jpg",
            "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/wmv5mqsy_IMG_7301.jpg",
        ], None),
    ],
}


def main():
    out = Path("/app/frontend/public/downloads/tag_and_name_updates.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    all_rows = []
    all_rows += build_product_rows(PALM_KAFTAN, 1)
    all_rows += build_product_rows(PALAZZO, 1)
    all_rows += build_product_rows(NARLAI, 1)
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in all_rows:
            w.writerow(r)
    print(f"Wrote {len(all_rows)} rows to {out}")


if __name__ == "__main__":
    main()
