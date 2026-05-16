// Local product additions / overrides — for new products or variants that
// haven't been added to Shopify yet. Once they exist on Shopify (via CSV import
// or admin panel), the merge logic in shopify.js detects duplicates by handle
// or colour and silently skips the local entry, so cleanup is automatic.

// 1) Add an entire new product (doesn't exist in Shopify yet)
export const LOCAL_PRODUCT_ADDITIONS = [
  {
    handle: "light-cotton-dress",
    title: "Light Cotton Dress",
    price: 75,
    currency: "GBP",
    category: "women",
    sub: "Cotton · Block-printed floral",
    badge: "New In",
    description:
      "A breezy lightweight cotton dress with a delicate hand-printed floral motif, ruffled sleeves and shoulders, smocked waist, and tasselled drawstring tie. Effortless femininity for sun-drenched days.",
    descriptionHtml:
      "<p>A breezy lightweight cotton dress with a delicate hand-printed floral motif, ruffled sleeves and shoulders, smocked waist, and tasselled drawstring tie. Effortless femininity for sun-drenched days.</p><ul><li>Material: 100% Cotton</li><li>Origin: Hand-printed in India</li><li>Care: Machine wash cold. Warm iron on reverse. Do not tumble dry.</li></ul>",
    tags: ["women", "dress", "new"],
    pos: "center 30%",
    variants: [
      {
        colour: "Pink White",
        images: [
          "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ka9ax8vj_7d05f83a-a321-42cc-af6d-cfd184bb8975.jpeg",
          "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/ra5xg2lw_5654a25f-7bfc-48e3-af34-6bf0da481eb5.jpeg",
          "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/y3xx0o3z_20447cc2-0441-4efb-9a8b-34354ecdcfef.jpeg",
        ],
      },
    ],
  },
];

// 2) Add new colour/size variants to an existing Shopify product
export const LOCAL_VARIANT_ADDITIONS = {
  // handle: [{ colour, images, sizes, pending: true }]
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

// Brand contact for "email to order" CTA on pending variants/products.
export const ORDER_EMAIL = "hello@kaftanqueens.co.uk";
