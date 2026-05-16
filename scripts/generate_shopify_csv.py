"""Generate Shopify CSV import file for Kaftan Queens products from mock.js data.

Shopify CSV format reference: https://help.shopify.com/en/manual/products/import-export/using-csv
"""
import csv
import re
from pathlib import Path

CDN = "https://cdn.shopify.com/s/files/1/0928/7027/9498/files/"

# ---- Variant maps (mirror mock.js) ----
palm_kaftan = [
    ("Pink", [f"{CDN}Palmpinkandgreenkaftan.heic?v=1761750123&width=1200"]),
    ("Green & Fuchsia", [f"{CDN}Palmbeigekaftan2.heic?v=1761750123&width=1200"]),
    ("Blue & Red", [f"{CDN}Palmblueandredkaftan.heic?v=1761750122&width=1200"]),
    ("Orange", [f"{CDN}Palm_peach_kaftan.heic?v=1761750299&width=1200"]),
]
palm_dress = [
    ("Blue & Pink", [f"{CDN}Palmblueandpinkdress.heic?v=1761750246&width=1200"]),
    ("Blue Pattern", [f"{CDN}Palmbluedress3.heic?v=1762429162&width=1200"]),
    ("Fuchsia", [f"{CDN}Palmfusiadress.heic?v=1762429162&width=1200", f"{CDN}Palmpinkdress2.heic?v=1761750246&width=1200"]),
    ("Orange", [f"{CDN}Palmorangedress3.heic?v=1761750245&width=1200", f"{CDN}Palmorangedress2.heic?v=1761750246&width=1200"]),
    ("Yellow", [f"{CDN}Palmyellowdress3.heic?v=1761750245&width=1200"]),
]
kimono = [
    ("Kimono Pink", [f"{CDN}Pinkkimono2.heic?v=1761750652&width=1200"]),
    ("Kimono Yellow", [f"{CDN}Yellowkimono.heic?v=1761750652&width=1200"]),
    ("Kimono Fuchsia", [f"{CDN}Fushiapinkkimono3.heic?v=1761750652&width=1200"]),
]
hampi = [
    ("Navy Blue", [f"{CDN}Hampi_Navy_Blue_Shirt_2.jpg?v=1763043582&width=1200", f"{CDN}HampiNavyBlueShirt.jpg?v=1763043468&width=1200", f"{CDN}HampiNavyBlueShirt2.jpg?v=1763043467&width=1200"]),
    ("Pink", [f"{CDN}Hampi_Pink_Shirt.jpg?v=1763043582&width=1200", f"{CDN}HampiPinkShirt.jpg?v=1763043466&width=1200", f"{CDN}HampiPinkShirt2.jpg?v=1763043467&width=1200", f"{CDN}HampiPinkShirt3.jpg?v=1763043466&width=1200"]),
    ("Denim Blue", [f"{CDN}Hampi_Denim_Blue_Shirt_3.jpg?v=1763043582&width=1200", f"{CDN}HampiDenimBlueShirt3.jpg?v=1763043582&width=1200", f"{CDN}HampiDenimBlueShirt2.jpg?v=1763043582&width=1200", f"{CDN}HampiDenimBlueShirt.jpg?v=1763043466&width=1200"]),
    ("White", [f"{CDN}Hampi_White_Shirt_2.jpg?v=1763043582&width=1200", f"{CDN}HampiWhiteShirt.jpg?v=1763043467&width=1200", f"{CDN}HampiWhiteShirt2.jpg?v=1763043467&width=1200", f"{CDN}HampiWhiteShirt3.jpg?v=1763043466&width=1200"]),
]
goa = [
    ("Pink Flower", [f"{CDN}KeralaKortapinkflowerXL_6f8d6913-8162-4644-a49a-fefaa9bd45d0.jpg?v=1761750376&width=1200", f"{CDN}KeralaKortapinkflowerXL2.jpg?v=1761750376&width=1200"]),
    ("Blue Pattern", [f"{CDN}KeralaKortaBluepatternXL_c96fa810-81a5-488c-a292-0575104080e6.jpg?v=1761750376&width=1200", f"{CDN}KeralaKortaBluepatternXL2_8cbf2f14-bd30-4b42-80b4-8c5b73a26a53.jpg?v=1761750377&width=1200"]),
    ("Blue Flower", [f"{CDN}KeralaKortablueflowerXL_144671d0-c2e5-45ed-ba60-c3551876f7f3.jpg?v=1761750376&width=1200", f"{CDN}KeralaKortablueflowerXL2_acb651af-f8a8-4eb8-ad74-b2be34f6d9ef.jpg?v=1761750377&width=1200"]),
    ("White Flower", [f"{CDN}KeralaKortawhiteflowerondenimXL.jpg?v=1761750377&width=1200", f"{CDN}KeralaKortawhiteflowerondenimXL2.jpg?v=1761750376&width=1200", f"{CDN}KeralaKortawhiteflowerondenimXL3.jpg?v=1761750377&width=1200"]),
    ("Lilac Flower", [f"{CDN}KeralaKortapurplefloweronwhiteXL.jpg?v=1761750377&width=1200", f"{CDN}KeralaKortapurplefloweronwhiteXL2.jpg?v=1761750376&width=1200"]),
]
kerala = [
    ("Blue Flower", [f"{CDN}Keralablueflowermen_scottonshirtL.heic?v=1761750458&width=1200", f"{CDN}Keralablueflowermen_scottonshirtL2.heic?v=1761750459&width=1200"]),
    ("Fuchsia", [f"{CDN}Keralafushiaflowermen_scottonshirtL2.heic?v=1761750459&width=1200"]),
    ("Green & Orange", [f"{CDN}Keralagreenblockmen_scottonshirtL_45730605-055a-4193-ada7-0de1cf062fef.heic?v=1761750459&width=1200"]),
    ("Blue Pattern", [f"{CDN}Keralabeigewithturquoiseflowersmen_scottonshirtL.heic?v=1761750459&width=1200"]),
    ("Navy Blue Block Print", [f"{CDN}KeralanavyblockonwhitemenscottonshirtL3.heic?v=1761750459&width=1200", f"{CDN}KeralanavyblockonwhitemenscottonshirtL.heic?v=1761750459&width=1200"]),
    ("Pink Frangipani", [f"{CDN}KeralapinkfrangipanimenscottonshirtL.heic?v=1761750458&width=1200", f"{CDN}KeralapinkfrangipanimenscottonshirtL2.heic?v=1761750459&width=1200"]),
    ("Pale Blue Block Print", [f"{CDN}Keralapaleblueblockmen_scottonshirtL2.heic?v=1761750458&width=1200"]),
]
bags = [
    ("Black & Cream", [f"{CDN}IndianBags1_b1392fe3-5266-4abb-bdc3-69b9910dc088.jpg?v=1761682331&width=1200"]),
    ("Cream & White", [f"{CDN}indianbags2.jpg?v=1761682332&width=1200"]),
    ("Turquoise", [f"{CDN}indianbags3.jpg?v=1761682332&width=1200"]),
]
agonda = [
    ("Autumnal", [f"{CDN}Aginda_Scarf_Autumnal_d5919d8e-c6b7-4132-a0c2-717e7c6c1cb7.jpg?v=1762103326&width=1200"]),
    ("Pink", [f"{CDN}AgondaScarfPink.jpg?v=1761928928&width=1200"]),
    ("Beige", [f"{CDN}AgondaScarfBeige.jpg?v=1761929096&width=1200"]),
    ("Blue", [f"{CDN}AgondaScarfBlue.jpg?v=1761929096&width=1200"]),
    ("Brown", [f"{CDN}AgondaScarfBrown.jpg?v=1761929096&width=1200"]),
    ("Dark Blue", [f"{CDN}AgondaScarfDarkBlue.jpg?v=1761929096&width=1200"]),
    ("Light Pink", [f"{CDN}AgondaScarfLightPink.jpg?v=1761929096&width=1200"]),
    ("Mint", [f"{CDN}AgondaScarfMint.jpg?v=1761929096&width=1200"]),
    ("Plum", [f"{CDN}AgondaScarfPlum.jpg?v=1761928929&width=1200"]),
    ("Yellow", [f"{CDN}AgondaScarfYellow.jpg?v=1761928929&width=1200"]),
]
mariposa = [
    ("Blue", [f"{CDN}MariposaScarfBlue.jpg?v=1761929703&width=1200"]),
    ("Peach", [f"{CDN}MariposaScarfPeach.jpg?v=1761929702&width=1200"]),
    ("Purple", [f"{CDN}MariposaScarfPurple.jpg?v=1761929701&width=1200"]),
]
yak = [
    ("Turquoise", ["https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ac84abhu_image.png", f"{CDN}YakWoolMandalaScarfBlue3.jpg?v=1762462953&width=1200"]),
    ("Beige", [f"{CDN}YakWoolMandalaScarfBeige.jpg?v=1762462953&width=1200"]),
    ("Black", [f"{CDN}YakWoolMandalaScarfBlack.jpg?v=1761931001&width=1200"]),
    ("Blue", [f"{CDN}YakWoolMandalaScarfBlue.jpg?v=1762462953&width=1200"]),
    ("Green", [f"{CDN}YakWoolMandalaScarfBlue4.jpg?v=1762462953&width=1200"]),
    ("Brown", [f"{CDN}YakWoolMandalaScarfBrown.jpg?v=1762462953&width=1200"]),
    ("Purple", [f"{CDN}YakWoolMandalaScarfPurple.jpg?v=1762462953&width=1200"]),
]
jungle = [
    ("Blue Jungle", [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/05de4u7f_image1.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/464iwadb_image0.jpeg",
    ]),
]
palazzo = [
    ("Teal Blue & White Flower", [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/60ickvjo_image3.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/40bg5a06_image0%20%281%29.jpeg",
    ]),
    ("Pink & Blue Flower", [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/tuejngv9_image0.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/mkfwviik_image1.jpeg",
    ]),
    ("Orange & Yellow Flower", [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/36vuwgr6_image1.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/urki5462_image0.jpeg",
    ]),
]

PRODUCTS = [
    {
        "handle": "palm-kaftan", "title": "Palm Kaftan", "price": "75.00", "type": "Kaftan", "tags": "women,kaftan,bestseller",
        "body": "<p>A vibrant kaftan featuring a unique hand-printed design and a flattering drawstring waist. Crafted from a soft silk/viscose blend, this midi-length kaftan adds individual style and breezy comfort to your wardrobe.</p><ul><li>Material: Silk/Viscose</li><li>Origin: Hand-printed in Rajasthan, India</li><li>Care: Machine wash at 30&deg;C. Warm iron on reverse. Do not tumble dry.</li></ul>",
        "option1": "Colour", "variants": palm_kaftan, "sizes": None,
    },
    {
        "handle": "palm-dress", "title": "Palm Dress", "price": "75.00", "type": "Dress", "tags": "women,dress,new",
        "body": "<p>A cotton knee-length dress with trim on the hem and sleeves. Hand printed in Rajasthan and available in a range of vibrant colourways.</p><ul><li>Material: Silk/Viscose</li><li>Origin: Hand-printed in Rajasthan, India</li><li>Care: Machine wash at 30&deg;C. Warm iron on reverse. Do not tumble dry.</li></ul>",
        "option1": "Colour", "variants": palm_dress, "sizes": None,
    },
    {
        "handle": "kimono", "title": "Kimono", "price": "80.00", "type": "Kimono", "tags": "women,kimono,limited",
        "body": "<p>A stunning wrap-design kimono in a range of vibrant colours. Crafted from a soft silk/viscose blend, it drapes beautifully with a silky texture &mdash; effortless style for any occasion.</p><ul><li>Material: Silk/Viscose Blend</li><li>Origin: Handmade in India</li><li>Care: Machine wash cold. Warm iron.</li></ul>",
        "option1": "Colour", "variants": kimono, "sizes": None,
    },
    {
        "handle": "palazzo-trousers", "title": "Palazzo Trousers", "price": "65.00", "type": "Trousers", "tags": "women,trousers,new",
        "body": "<p>New Palazzo trousers with a wide, comfortable stretch waist that sits beautifully on any silhouette. Wide, flowing leg in a delicate hand-printed floral cotton. Available in two lengths &mdash; Short or Long &mdash; so you can find the perfect fit.</p><ul><li>Material: Cotton</li><li>Origin: Hand-printed in India</li><li>Sizing: Inside leg to hem &mdash; Short 53 cm &middot; Long 66 cm</li><li>Care: Machine wash cold. Warm iron on reverse. Do not tumble dry.</li></ul>",
        "option1": "Colour", "variants": palazzo, "sizes": ["Short", "Long"],
    },
    {
        "handle": "hampi-linen-shirt", "title": "Hampi Linen Shirt", "price": "75.00", "type": "Shirt", "tags": "men,shirt,new",
        "body": "<p>Our Hampi men's linen shirt with cotton contrast inside the collar and cuffs, and contrasting buttons and stitching. Tailored for relaxed everyday wear.</p><ul><li>Material: 100% Cotton</li><li>Origin: Made in India</li><li>Sizing: Arm length 53 cm &middot; Chest 58 cm</li><li>Care: Machine cool wash. Warm iron. Do not tumble dry.</li></ul>",
        "option1": "Colour", "variants": hampi, "sizes": None,
    },
    {
        "handle": "jungle-print-shirt", "title": "Jungle Print Shirt", "price": "75.00", "type": "Shirt", "tags": "men,shirt,new",
        "body": "<p>A bold new shirt in deep indigo cotton, hand-printed with an Indian jungle motif of palms, foliage and birds. A large, loose, easy fit &mdash; made to be lived in, layered and loved.</p><ul><li>Material: 100% Cotton</li><li>Origin: Hand-printed in India</li><li>Sizing: Large loose fit</li><li>Care: Machine wash at 30&deg;C. Warm iron on reverse. Do not tumble dry.</li></ul>",
        "option1": "Colour", "variants": jungle, "sizes": None,
    },
    {
        "handle": "goa-mens-shirt", "title": "Goa Men's Shirt", "price": "65.00", "type": "Shirt", "tags": "men,shirt,hand-printed",
        "body": "<p>Our classic Goa smock shirt. Cotton block-printed in Rajasthan, with each piece stamped by artisans using wooden blocks. Buttons to the chest for an easy pull-on fit.</p><ul><li>Material: 100% Cotton</li><li>Origin: Block printed in Rajasthan, India</li><li>Sizing: Arm length 56 cm &middot; Chest 62 cm</li><li>Care: Machine wash at 30&deg;C. Warm iron on reverse. Do not tumble dry.</li></ul>",
        "option1": "Colour", "variants": goa, "sizes": None,
    },
    {
        "handle": "kerala-mens-shirt", "title": "Kerala Men's Shirt", "price": "65.00", "type": "Shirt", "tags": "men,shirt,hand-printed",
        "body": "<p>Our classic Kerala men's shirt &mdash; pure cotton, block printed in Rajasthan by artisans who stamp each piece using wooden blocks. Available in a wide spectrum of prints.</p><ul><li>Material: 100% Cotton</li><li>Origin: Block printed in Rajasthan, India</li><li>Sizing: Arm length 56 cm &middot; Chest 62 cm</li><li>Care: Machine wash at 30&deg;C. Warm iron on reverse. Do not tumble dry.</li></ul>",
        "option1": "Colour", "variants": kerala, "sizes": None,
    },
    {
        "handle": "indian-woven-bags", "title": "Indian Woven Bags", "price": "20.00", "type": "Bag", "tags": "accessories,bag,hand-woven",
        "body": "<p>Beautiful hand-woven bags with intricate patterns in a range of stylish colours. Perfect for the beach, a sunny excursion, or as a travel bag &mdash; artisan craft for any day out.</p><ul><li>Material: Hand Woven Fabric</li><li>Origin: Made in India</li></ul>",
        "option1": "Colour", "variants": bags, "sizes": None,
    },
    {
        "handle": "agonda-scarf", "title": "Agonda Scarf", "price": "65.00", "type": "Scarf", "tags": "accessories,scarf,wool",
        "body": "<p>Our versatile Agonda Scarves feature a classic pattern in a beautiful range of colours. Crafted from soft 100% wool &mdash; a touch of style and warmth for any outfit.</p><ul><li>Material: 100% Wool</li><li>Origin: Made in India</li><li>Care: Hand wash in cold water. Do not tumble dry.</li></ul>",
        "option1": "Colour", "variants": agonda, "sizes": None,
    },
    {
        "handle": "mariposa-scarf", "title": "Mariposa Scarf", "price": "65.00", "type": "Scarf", "tags": "accessories,scarf,wool",
        "body": "<p>A unique scarf with hand-stitched, layered designs in vibrant one-off colour combinations. Lightweight wool &mdash; artisan style and warmth in equal measure.</p><ul><li>Material: Lightweight Wool</li><li>Origin: Made in Kashmir</li></ul>",
        "option1": "Colour", "variants": mariposa, "sizes": None,
    },
    {
        "handle": "yak-wool-scarf", "title": "Yak Wool Scarf", "price": "70.00", "type": "Scarf", "tags": "accessories,scarf,yak-wool",
        "body": "<p>A versatile scarf with a classic herringbone weave in a beautiful range of colours. Crafted from soft 100% yak wool &mdash; exceptional warmth and a refined finish.</p><ul><li>Material: 100% Yak Wool</li><li>Origin: Made in India</li><li>Care: Hand wash in cold water. Do not tumble dry.</li></ul>",
        "option1": "Colour", "variants": yak, "sizes": None,
    },
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
    for p in PRODUCTS:
        sizes = p["sizes"]
        first = True
        image_pos = 1
        seen_images = set()

        for colour, imgs in p["variants"]:
            sku_colour = slug(colour)
            variant_sizes = sizes or [None]

            for size in variant_sizes:
                row = {h: "" for h in HEADERS}
                row["Handle"] = p["handle"]

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

                sku = f"KQ-{p['handle']}-{sku_colour}"
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

            # add images for this colour
            for img in imgs:
                if img in seen_images:
                    continue
                seen_images.add(img)
                img_row = {h: "" for h in HEADERS}
                img_row["Handle"] = p["handle"]
                img_row["Image Src"] = img
                img_row["Image Position"] = str(image_pos)
                img_row["Image Alt Text"] = f"{p['title']} - {colour}"
                rows.append(img_row)
                image_pos += 1

    return rows


def main():
    out = Path("/app/scripts/kaftan_queens_shopify_import.csv")
    rows = build_rows()
    with out.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)
    print(f"Wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
