"""Generate consolidated update CSV covering:
- Rename Kerala Men's Shirt -> Kerala Shirt
- Rename Jungle Print Shirt -> Jungle Shirt
- Rename Light Cotton Dress -> Narlai Dress
- Palazzo Trousers: 'Orange & Yellow Flower' -> 'Orange, Yellow & Gold Fleck'
- Add brand-new Butterfly Long Dress with Antique Rose, Blue/White, Bohemian, Python
Import with "Overwrite" TICKED.
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


def build_rows(p):
    rows = []
    first = True
    image_pos = 1
    seen = set()
    handle = p["handle"]
    for v in p["variants"]:
        colour = v["colour"]
        imgs = v["images"]
        sizes = v.get("sizes")
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
            row["Variant Inventory Qty"] = str(v.get("qty", 10))
            row["Variant Inventory Policy"] = "deny"
            row["Variant Fulfillment Service"] = "manual"
            row["Variant Price"] = p["price"]
            row["Variant Requires Shipping"] = "TRUE"
            row["Variant Taxable"] = "TRUE"
            row["Variant Weight Unit"] = "g"
            if imgs:
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


PRODUCTS = [
    {
        "handle": "kerala-mens-shirt",
        "title": "Kerala Shirt",
        "price": "65.00",
        "type": "Shirt",
        "tags": "men,shirt,hand-printed",
        "body": "<p>Our classic Kerala shirt &mdash; pure cotton, block printed in Rajasthan by artisans who stamp each piece using wooden blocks. Available in a wide spectrum of prints.</p><ul><li>Material: 100% Cotton</li><li>Origin: Block printed in Rajasthan, India</li><li>Sizing: Arm length 56 cm &middot; Chest 62 cm</li><li>Care: Cool wash. Do not tumble dry.</li></ul>",
        "variants": [
            {"colour": "Blue Flower", "images": [
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralablueflowermen_scottonshirtL.jpg?v=1778956780",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralablueflowermen_scottonshirtL2.jpg?v=1778956780",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/yx4337eg_IMG_7332.jpg?v=1779099156",
            ]},
            {"colour": "Fuchsia", "images": ["https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralafushiaflowermen_scottonshirtL2.jpg?v=1778956780"]},
            {"colour": "Green & Orange", "images": ["https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralagreenblockmen_scottonshirtL_45730605-055a-4193-ada7-0de1cf062fef.jpg?v=1778956780"]},
            {"colour": "Blue Pattern", "images": ["https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralabeigewithturquoiseflowersmen_scottonshirtL.jpg?v=1778956780"]},
            {"colour": "Navy Blue Block Print", "images": [
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/KeralanavyblockonwhitemenscottonshirtL3.jpg?v=1778956780",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/KeralanavyblockonwhitemenscottonshirtL.jpg?v=1778956780",
            ]},
            {"colour": "Pink Frangipani", "images": [
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/KeralapinkfrangipanimenscottonshirtL.jpg?v=1778956780",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/KeralapinkfrangipanimenscottonshirtL2.jpg?v=1778956780",
            ]},
            {"colour": "Pale Blue Block Print", "images": ["https://cdn.shopify.com/s/files/1/0961/6064/5463/files/Keralapaleblueblockmen_scottonshirtL2.jpg?v=1778956780"]},
        ],
    },
    {
        "handle": "jungle-print-shirt",
        "title": "Jungle Shirt",
        "price": "75.00",
        "type": "Shirt",
        "tags": "men,shirt,new",
        "body": "<p>A bold shirt in deep indigo cotton, hand-printed with an Indian jungle motif of palms, foliage and birds. A large, loose, easy fit &mdash; made to be lived in, layered and loved.</p><ul><li>Material: 100% Cotton</li><li>Origin: Hand-printed in India</li><li>Care: Cool wash. Do not tumble dry.</li></ul>",
        "variants": [
            {"colour": "Blue Jungle", "images": [
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/05de4u7f_image1.jpeg",
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/464iwadb_image0.jpeg",
            ]},
        ],
    },
    {
        "handle": "light-cotton-dress",
        "title": "Narlai Dress",
        "price": "95.00",
        "type": "Dress",
        "tags": "women,dress",
        "body": "<p>A breezy lightweight cotton dress with a delicate hand-printed floral motif, ruffled sleeves and shoulders, smocked waist, and tasselled drawstring tie. Effortless femininity for sun-drenched days.</p><ul><li>Material: Cotton / Viscose</li><li>Origin: Hand-printed in India</li><li>Care: Dry clean only.</li></ul>",
        "variants": [
            {"colour": "Pink White", "qty": 10, "images": [
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/ra5xg2lw_5654a25f-7bfc-48e3-af34-6bf0da481eb5.jpg",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/ka9ax8vj_7d05f83a-a321-42cc-af6d-cfd184bb8975.jpg",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/y3xx0o3z_5aec3ca5-e17f-4142-82d1-8e258f728b4f.jpg",
            ]},
            {"colour": "White Ditsy", "qty": 0, "images": [
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/3h7lsqkt_IMG_7306_f4544a0a-c7d0-49f7-bbe8-4a66ea048cb0.jpg",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/ygcvmbdh_IMG_7307.jpg",
            ]},
            {"colour": "Blue Flower", "qty": 10, "images": [
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/dalun1op_IMG_7300.jpg",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/wmv5mqsy_IMG_7301.jpg",
            ]},
        ],
    },
    {
        "handle": "palazzo-trousers",
        "title": "Palazzo Trousers",
        "price": "55.00",
        "type": "Trousers",
        "tags": "women,trousers,bestseller",
        "body": "<p>Palazzo trousers with a wide, comfortable stretch waist that sits beautifully on any silhouette. Wide, flowing leg in a delicate hand-printed floral viscose. Available in two lengths &mdash; Short or Long.</p><ul><li>Material: Viscose</li><li>Origin: Hand-printed in India</li><li>Sizing: Inside leg to hem &mdash; Short 53 cm &middot; Long 66 cm</li><li>Care: Dry clean only.</li></ul>",
        "variants": [
            {"colour": "Teal Blue & White Flower", "sizes": ["Short", "Long"], "images": [
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/60ickvjo_image3.jpg",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/40bg5a06_image0_20_281_29.jpg",
            ]},
            {"colour": "Pink & Blue Flower", "sizes": ["Short", "Long"], "images": [
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/tuejngv9_image0.jpg",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/mkfwviik_image1.jpg",
            ]},
            {"colour": "Orange, Yellow & Gold Fleck", "sizes": ["Short", "Long"], "images": [
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/36vuwgr6_image1.jpg",
                "https://cdn.shopify.com/s/files/1/0961/6064/5463/files/urki5462_image0.jpg",
            ]},
        ],
    },
    {
        "handle": "butterfly-long-dress",
        "title": "Butterfly Long Dress",
        "price": "95.00",
        "type": "Dress",
        "tags": "women,dress,new",
        "body": "<p>A flowing, ankle-grazing dress with butterfly sleeves and a relaxed silhouette. Crafted in soft cotton/viscose, hand-finished in India. Made to flutter from beach to bar.</p><ul><li>Material: Cotton / Viscose</li><li>Origin: Hand-finished in India</li><li>Care: Dry clean only.</li></ul>",
        "variants": [
            {"colour": "Antique Rose", "qty": 10, "images": [
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/xyvkdofe_IMG_7412.jpeg",
            ]},
            {"colour": "Blue/White", "qty": 0, "images": []},
            {"colour": "Bohemian", "qty": 0, "images": []},
            {"colour": "Python", "qty": 10, "images": [
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/1cct5rz4_IMG_7403.jpeg",
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/sqg76by8_IMG_7406.jpeg",
                "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/5pmbt5it_IMG_7418.jpeg",
            ]},
        ],
    },
]


def main():
    out = Path("/app/frontend/public/downloads/big_update.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    all_rows = []
    for p in PRODUCTS:
        all_rows += build_rows(p)
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADERS)
        w.writeheader()
        for r in all_rows:
            w.writerow(r)
    print(f"Wrote {len(all_rows)} rows to {out}")


if __name__ == "__main__":
    main()
