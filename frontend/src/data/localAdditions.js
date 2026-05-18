// Local product additions / overrides — for new products or variants that
// haven't been added to Shopify yet. Once they exist on Shopify (via CSV import
// or admin panel), the merge logic in shopify.js detects duplicates by handle
// or colour and silently skips the local entry, so cleanup is automatic.

// 1) Add an entire new product (doesn't exist in Shopify yet)
export const LOCAL_PRODUCT_ADDITIONS = [];

// 2) Add new colour/size variants to an existing Shopify product
export const LOCAL_VARIANT_ADDITIONS = {
  // handle: [{ colour, images, sizes, pending: true, prepend?: true }]
  "light-cotton-dress": [
    {
      colour: "Pink/Orange Teardrop",
      images: [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/nraya2wi_IMG_7319.jpeg",
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/2nx2r33k_IMG_7311.jpeg",
      ],
      pending: true,
      prepend: true,
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
  "kerala-mens-shirt": [
    {
      colour: "Navy Botanical",
      images: [
        "https://customer-assets.emergentagent.com/job_image-scraper-3/artifacts/yx4337eg_IMG_7332.jpeg",
      ],
      pending: true,
    },
  ],
};

// Brand contact for "email to order" CTA on pending variants/products.
export const ORDER_EMAIL = "hello@kaftanqueens.co.uk";
