// Local additions / overrides layer.

// 1) Brand new products not yet in Shopify
export const LOCAL_PRODUCT_ADDITIONS = [
  {
    handle: "butterfly-long-dress",
    title: "Butterfly Long Dress",
    price: 95,
    currency: "GBP",
    category: "women",
    sub: "Cotton / Viscose · Hand-finished",
    badge: "New In",
    description:
      "A flowing, ankle-grazing dress with butterfly sleeves and a relaxed silhouette. Crafted in soft cotton/viscose, hand-finished in India. Made to flutter from beach to bar.",
    descriptionHtml:
      "<p>A flowing, ankle-grazing dress with butterfly sleeves and a relaxed silhouette. Crafted in soft cotton/viscose, hand-finished in India. Made to flutter from beach to bar.</p>",
    tags: ["women", "dress", "new"],
    pos: "center 25%",
    variants: [
      {
        colour: "Antique Rose",
        images: [
          "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/8ljk3v2z_IMG_7416.jpeg",
          "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/nv65hwob_IMG_7418.jpeg",
          "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ume2efze_IMG_7412.jpeg",
        ],
        imageFit: "contain",
      },
      { colour: "Blue/White", images: [], imageFit: "contain" },
      { colour: "Bohemian", images: [], imageFit: "contain" },
      {
        colour: "Python",
        images: [
          "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/1cct5rz4_IMG_7403.jpeg",
          "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/sqg76by8_IMG_7406.jpeg",
          "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/5pmbt5it_IMG_7418.jpeg",
        ],
        imageFit: "contain",
      },
    ],
  },
];

// 2) Variants added to EXISTING Shopify products
export const LOCAL_VARIANT_ADDITIONS = {
  "light-cotton-dress": [
    {
      colour: "Pink/Orange Teardrop",
      images: [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/nraya2wi_IMG_7319.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/2nx2r33k_IMG_7311.jpeg",
      ],
      pending: true,
      prepend: true,
      imageFit: "contain",
    },
  ],
  "palazzo-trousers": [
    {
      colour: "Pink Tiedye",
      images: [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/jnarnwb5_image0%20%281%29.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/j7emy92w_image1.jpeg",
      ],
      sizes: ["Short", "Long"],
      pending: true,
    },
  ],
};

// 3) Extra lifestyle images to append to existing colours
export const LOCAL_VARIANT_IMAGE_ADDITIONS = {
  // Now empty — the kerala blue flower motorbike image lives in Shopify CDN.
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
