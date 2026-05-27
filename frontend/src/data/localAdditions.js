// Local additions / overrides layer.

// 1) Brand new products not yet in Shopify
// (none — Butterfly Long Dress was imported to Shopify on 2026-02-26)
export const LOCAL_PRODUCT_ADDITIONS = [];

// 2) Variants added to EXISTING Shopify products
export const LOCAL_VARIANT_ADDITIONS = {
  "light-cotton-dress": [
    {
      colour: "Pink/Orange Teardrop",
      images: [
        "/products/narlai-pink-orange-teardrop-1.jpg",
        "/products/narlai-pink-orange-teardrop-2.jpg",
      ],
      pending: true,
      imageFit: "contain",
    },
  ],
  // Butterfly Long Dress — Ivory variant (was previously labeled "Bohemian"
  // in Shopify; the white flowy dress photos). Will become a real Shopify
  // variant once the next CSV is imported. Marked pending until then.
  "butterfly-long-dress": [
    {
      colour: "Ivory",
      images: [
        "/products/butterfly-ivory-1.jpg",
        "/products/butterfly-ivory-2.jpg",
      ],
      pending: true,
      imageFit: "contain",
    },
  ],
};

// 3) Extra lifestyle images to append to existing colours
export const LOCAL_VARIANT_IMAGE_ADDITIONS = {
  // Now empty — the kerala blue flower motorbike image lives in Shopify CDN.
};

// 3b) REPLACE the images of an existing Shopify variant entirely (frontend preview
//     before re-importing the CSV to Shopify). Keys are Shopify's ORIGINAL colour
//     names (pre any COLOUR_RENAMES).
export const VARIANT_IMAGE_REPLACEMENTS = {
  "butterfly-long-dress": {
    "Antique Rose": [
      "/products/butterfly-antique-rose-1.jpg",
    ],
    "Bohemian": [
      "/products/butterfly-bohemian-1.jpg",
      "/products/butterfly-bohemian-2.jpg",
    ],
  },
};

// 4) Per-product display overrides (renames without re-importing Shopify)
export const TITLE_OVERRIDES = {
  "kerala-mens-shirt": "Kerala Shirt",
  "jungle-print-shirt": "Jungle Shirt",
  "light-cotton-dress": "Narlai Dress",
};

// 5) Colour swatch renames per product
export const COLOUR_RENAMES = {
  "palazzo-trousers": {
    "Orange & Yellow Flower": "Orange, Yellow & Gold Fleck",
  },
};

// 6) Variants to display as Sold Out regardless of inventory
export const SOLD_OUT_VARIANTS = {
  "light-cotton-dress": ["White Ditsy"],
};

// 7) Force a specific image to appear first for a variant (front-facing photo)
export const VARIANT_IMAGE_ORDER = {
  "light-cotton-dress": {
    // Move the front-facing 5654a25f image to position 0 for Pink White
    "Pink White": ["5654a25f"],
  },
};

// 8) Per-product materials (overrides Details accordion)
export const MATERIALS_BY_HANDLE = {
  "hampi-linen-shirt": "100% Cotton",
  "goa-mens-shirt": "100% Cotton",
  "kerala-mens-shirt": "100% Cotton",
  "jungle-print-shirt": "100% Cotton",
  "light-cotton-dress": "Cotton / Viscose",
  "palazzo-trousers": "Viscose",
  "palm-dress": "100% Cotton",
  "palm-kaftan": "100% Satin",
  "butterfly-long-dress": "Cotton / Viscose",
};

// 9) Care instructions by category
export const CARE_BY_CATEGORY = {
  women: "Dry clean only.",
  men: "Cool wash. Do not tumble dry.",
  accessories: "Hand wash cold. Do not tumble dry.",
};

// Brand contact for "email to order" CTA on pending variants.
export const ORDER_EMAIL = "hello@kaftanqueens.co.uk";
