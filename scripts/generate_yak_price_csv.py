"""Generate a minimal price-only CSV to update Yak Wool Scarf to £65.

Shopify import works on Handle + SKU matching. Only fields that have a value
will be updated; the rest stay untouched. Import with "Overwrite" TICKED.
"""
import csv
from pathlib import Path

HANDLE = "yak-wool-scarf"
NEW_PRICE = "65.00"
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

rows = []
for i, colour in enumerate(VARIANTS):
    row = {h: "" for h in HEADERS}
    row["Handle"] = HANDLE
    # Shopify requires Title (and a few base fields) on the FIRST row per handle.
    if i == 0:
        row["Title"] = "Yak Wool Scarf"
        row["Vendor"] = "Kaftan Queens"
        row["Type"] = "Scarf"
        row["Published"] = "TRUE"
        row["Status"] = "active"
    row["Option1 Name"] = "Colour"
    row["Option1 Value"] = colour
    row["Variant SKU"] = f"KQ-{HANDLE}-{colour.lower()}"
    row["Variant Price"] = NEW_PRICE
    row["Variant Inventory Policy"] = "deny"
    row["Variant Fulfillment Service"] = "manual"
    row["Variant Requires Shipping"] = "TRUE"
    row["Variant Taxable"] = "TRUE"
    rows.append(row)

out = Path("/app/frontend/public/downloads/yak_wool_scarf_price_update.csv")
out.parent.mkdir(parents=True, exist_ok=True)
with out.open("w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=HEADERS)
    w.writeheader()
    for r in rows:
        w.writerow(r)
print(f"Wrote {len(rows)} rows to {out}")
