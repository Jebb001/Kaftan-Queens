// Local product additions / overrides — for new products or variants that
// haven't been added to Shopify yet. Once they exist on Shopify (via CSV import
// or admin panel), the merge logic in shopify.js detects the duplicate by colour
// and silently skips the local entry, so cleanup is automatic.

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

// Brand contact for "email to order" CTA on pending variants.
export const ORDER_EMAIL = "hello@kaftanqueens.co.uk";
