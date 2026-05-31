// Shopify Storefront API client + product/cart helpers.
// Token is public-safe (Storefront Public Access Token) so direct calls from browser are intentional.

import { LOCAL_VARIANT_ADDITIONS, LOCAL_PRODUCT_ADDITIONS, LOCAL_VARIANT_IMAGE_ADDITIONS, VARIANT_IMAGE_REPLACEMENTS, TITLE_OVERRIDES, COLOUR_RENAMES, SOLD_OUT_VARIANTS, VARIANT_IMAGE_ORDER, CARD_IMAGE_OVERRIDES, PRICE_OVERRIDES } from "../data/localAdditions";

const DOMAIN = process.env.REACT_APP_SHOPIFY_DOMAIN;
const TOKEN = process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.REACT_APP_SHOPIFY_API_VERSION || "2025-01";
const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

// Append width=1400 to Shopify CDN URLs so Shopify delivers a resized image
// (typically 60-85% smaller than the original) without affecting visible quality.
// Non-Shopify URLs (e.g. local /products/*.jpg) are returned untouched.
function optimizeCdn(url, width = 1400) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("cdn.shopify.com")) return url;
  if (/[?&]width=\d+/.test(url)) return url; // already has width
  return url + (url.includes("?") ? "&" : "?") + `width=${width}`;
}

// Force a specific width on a Shopify CDN URL (replaces any existing width param).
// For non-Shopify URLs returns the original.
export function cdnAtWidth(url, width) {
  if (!url || typeof url !== "string" || !url.includes("cdn.shopify.com")) return url;
  const [base, q = ""] = url.split("?");
  const clean = q.replace(/(^|&)width=\d+(&|$)/, (m, a, b) => (a && b ? "&" : "")).replace(/^&|&$/g, "");
  return `${base}?${clean ? clean + "&" : ""}width=${width}`;
}

// Build a responsive srcset for any URL we host. Shopify CDN supports ?width=
// directly. Local /products/*.jpg files don't, so we just return null and let
// the browser use the single src.
export function buildSrcSet(url) {
  if (!url || typeof url !== "string") return null;
  if (!url.includes("cdn.shopify.com")) return null;
  return [400, 600, 800, 1200, 1600].map((w) => `${cdnAtWidth(url, w)} ${w}w`).join(", ");
}

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message || "Shopify GraphQL error");
  }
  return json.data;
}

// ---------- Queries ----------
const PRODUCT_FIELDS = `
  id
  handle
  title
  descriptionHtml
  description
  tags
  productType
  vendor
  options { id name values }
  priceRange {
    minVariantPrice { amount currencyCode }
  }
  images(first: 30) {
    edges { node { url altText } }
  }
  variants(first: 100) {
    edges {
      node {
        id
        title
        availableForSale
        selectedOptions { name value }
        price { amount currencyCode }
        image { url }
      }
    }
  }
`;

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

// ---------- Cart mutations ----------
const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url }
            selectedOptions { name value }
            product { handle title }
          }
        }
      }
    }
  }
`;

const CART_CREATE = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const CART_GET = `
  query CartGet($id: ID!) {
    cart(id: $id) { ${CART_FIELDS} }
  }
`;

const CART_LINES_ADD = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

// ---------- Product transform: map Shopify -> internal shape used by UI ----------
function categoryFromTags(tags) {
  const t = tags.map((x) => x.toLowerCase());
  if (t.includes("women")) return "women";
  if (t.includes("men")) return "men";
  if (t.includes("accessories")) return "accessories";
  return "all";
}

function badgeFromTags(tags) {
  const t = tags.map((x) => x.toLowerCase());
  if (t.includes("bestseller")) return "Bestseller";
  if (t.includes("new")) return "New In";
  if (t.includes("limited")) return "Limited";
  if (t.includes("hand-printed")) return "Hand printed";
  if (t.includes("hand-woven")) return "Hand-woven";
  return null;
}

function subFromProductType(productType, tags) {
  // Lightweight fallback subtitle derived from product type & material tags.
  if (!productType) return "";
  // Display "Scarf" as "Scarfs" (brand preference).
  const label = productType === "Scarf" ? "Scarfs" : productType;
  const lower = tags.map((t) => t.toLowerCase());
  if (lower.includes("wool")) return `${label} · Wool blend`;
  if (lower.includes("yak-wool")) return `${label} · Yak wool weave`;
  return label;
}

// Per-product object-position overrides so portrait full-body photos
// don't crop heads/feet. Keys are Shopify handles.
const POS_OVERRIDES = {
  "light-cotton-dress": "center 15%",
};

export function transformProduct(node) {
  if (!node) return null;
  const tags = node.tags || [];
  const allImages = node.images.edges.map((e) => ({ url: optimizeCdn(e.node.url), alt: e.node.altText || "" }));
  const variants = node.variants.edges.map((e) => e.node);

  // All colour names present in this product (lowercased) — used to detect
  // when a variant's featured image was misassigned in Shopify to a different
  // colour's photo. Example: Python's featured image accidentally points to the
  // Antique Rose photo. We strip those out so users see the correct colour.
  const allColourNames = new Set(
    variants
      .map((v) => v.selectedOptions.find((o) => o.name === "Colour")?.value?.toLowerCase())
      .filter(Boolean)
  );

  // Build a quick alt-text lookup so we can tell which colour each product
  // image actually belongs to.
  function altColourOf(url) {
    const match = allImages.find((i) => i.url === url);
    if (!match || !match.alt) return null;
    const altLower = match.alt.toLowerCase();
    for (const c of allColourNames) {
      if (altLower.includes(c)) return c;
    }
    return null;
  }

  // Group by Colour to mimic mock variant structure
  const byColour = new Map();
  for (const v of variants) {
    const colour = v.selectedOptions.find((o) => o.name === "Colour")?.value || v.title || "Default";
    const img = optimizeCdn(v.image?.url);
    if (!byColour.has(colour)) byColour.set(colour, { colour, images: [], variantIds: [], sizes: [] });
    const entry = byColour.get(colour);
    // Only adopt the variant's featured image if its alt-text matches THIS
    // colour (or has no alt-text at all). Prevents Shopify mis-assignments
    // from showing the wrong colour as the active thumbnail.
    if (img) {
      const imgColour = altColourOf(img);
      const colourLower = colour.toLowerCase();
      if (!imgColour || imgColour === colourLower) {
        if (!entry.images.includes(img)) entry.images.push(img);
      }
    }
    entry.variantIds.push({
      id: v.id,
      size: v.selectedOptions.find((o) => o.name === "Size")?.value || null,
      available: v.availableForSale,
    });
    const size = v.selectedOptions.find((o) => o.name === "Size")?.value;
    if (size && !entry.sizes.includes(size)) entry.sizes.push(size);
  }

  // Distribute remaining product-level images to colours via alt text matching
  for (const img of allImages) {
    const altLower = img.alt.toLowerCase();
    if (!altLower) continue;
    for (const entry of byColour.values()) {
      if (entry.images.includes(img.url)) continue;
      if (altLower.includes(entry.colour.toLowerCase())) {
        entry.images.push(img.url);
      }
    }
  }

  const variantArray = Array.from(byColour.values()).map((g) => ({
    colour: g.colour,
    images: g.images.length ? g.images : allImages.slice(0, 1).map((i) => i.url),
    variantIds: g.variantIds,
    sizes: g.sizes,
  }));

  // Replace variant images entirely (used to preview new product photography
  // before re-importing the CSV to Shopify). Done BEFORE LOCAL_VARIANT_IMAGE_ADDITIONS
  // and BEFORE COLOUR_RENAMES, so keys are the original Shopify colour names.
  const imageReplacements = VARIANT_IMAGE_REPLACEMENTS[node.handle] || {};
  for (const v of variantArray) {
    const replacement = imageReplacements[v.colour];
    if (replacement && replacement.length) {
      v.images = [...replacement];
    }
  }

  // Append local extra images to existing colours (lifestyle shots added before Shopify upload)
  const imageAdds = LOCAL_VARIANT_IMAGE_ADDITIONS[node.handle] || {};
  for (const v of variantArray) {
    const extras = imageAdds[v.colour] || [];
    for (const url of extras) {
      if (!v.images.includes(url)) v.images.push(url);
    }
  }

  // Merge in any local pending variant additions (skip if colour already exists on Shopify)
  const localAdds = LOCAL_VARIANT_ADDITIONS[node.handle] || [];
  const existingColours = new Set(variantArray.map((v) => v.colour.toLowerCase()));
  for (const add of localAdds) {
    if (existingColours.has(add.colour.toLowerCase())) continue;
    const entry = {
      colour: add.colour,
      images: add.images,
      variantIds: [], // empty = pending, no Shopify ID yet
      sizes: add.sizes || [],
      pending: true,
      imageFit: add.imageFit || null,
    };
    if (add.prepend) variantArray.unshift(entry);
    else variantArray.push(entry);
  }

  // Apply colour renames (display-only) per product
  const colourRenames = COLOUR_RENAMES[node.handle] || {};
  for (const v of variantArray) {
    if (colourRenames[v.colour]) v.colour = colourRenames[v.colour];
  }

  // Sold-out marker (overrides Shopify inventory for display purposes)
  const soldOutList = SOLD_OUT_VARIANTS[node.handle] || [];
  for (const v of variantArray) {
    if (soldOutList.includes(v.colour)) v.soldOut = true;
  }

  // Front-image reorder: bring matching substring(s) to the front for a variant
  const imgOrder = VARIANT_IMAGE_ORDER[node.handle] || {};
  for (const v of variantArray) {
    const tokens = imgOrder[v.colour];
    if (!tokens || !tokens.length) continue;
    const front = [];
    const rest = [];
    for (const url of v.images) {
      if (tokens.some((t) => url.includes(t))) front.push(url);
      else rest.push(url);
    }
    v.images = [...front, ...rest];
  }

  // Fallback: if no images on variants, distribute all product images
  const flatImages = variantArray.flatMap((v) => v.images);
  const finalImages = flatImages.length ? flatImages : allImages.map((i) => i.url);

  // Sizes (top-level if any variant has a Size option)
  const sizesOption = (node.options || []).find((o) => o.name === "Size");
  const sizes = sizesOption ? sizesOption.values : null;

  // Description: use plain text (descriptionHtml available too if needed)
  return {
    id: node.handle,
    handle: node.handle,
    shopifyId: node.id,
    name: TITLE_OVERRIDES[node.handle] || node.title,
    price: PRICE_OVERRIDES[node.handle] ?? Number(node.priceRange.minVariantPrice.amount),
    currency: node.priceRange.minVariantPrice.currencyCode,
    category: categoryFromTags(tags),
    sub: subFromProductType(node.productType, tags),
    badge: badgeFromTags(tags),
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    tags,
    variants: variantArray,
    images: finalImages,
    colours: variantArray.map((v) => v.colour),
    sizes,
    pos: POS_OVERRIDES[node.handle] || "center 30%",
    cardImage: CARD_IMAGE_OVERRIDES[node.handle] || null,
  };
}

// Find a Shopify variantId for a (colour, size) pair
export function findVariantId(product, colour, size) {
  const v = product.variants.find((x) => x.colour === colour);
  if (!v) return null;
  const match = v.variantIds.find((vid) => (size ? vid.size === size : true));
  return (match || v.variantIds[0])?.id || null;
}

// Build a pending product (not yet in Shopify) for the LOCAL_PRODUCT_ADDITIONS layer
function buildLocalProduct(local) {
  const variantArray = local.variants.map((v) => ({
    colour: v.colour,
    images: v.images,
    variantIds: [],
    sizes: v.sizes || [],
    pending: true,
    imageFit: v.imageFit || null,
  }));
  return {
    id: local.handle,
    handle: local.handle,
    shopifyId: null,
    name: local.title,
    price: local.price,
    currency: local.currency || "GBP",
    category: local.category,
    sub: local.sub,
    badge: local.badge,
    description: local.description,
    descriptionHtml: local.descriptionHtml,
    tags: local.tags || [],
    variants: variantArray,
    images: variantArray.flatMap((v) => v.images),
    colours: variantArray.map((v) => v.colour),
    sizes: local.sizes || null,
    pos: local.pos || POS_OVERRIDES[local.handle] || "center 30%",
    pending: true,
  };
}

// ---------- Public API ----------
export async function fetchProducts(first = 50) {
  const data = await shopifyFetch(PRODUCTS_QUERY, { first });
  const live = data.products.edges.map((e) => transformProduct(e.node)).filter(Boolean);
  // Prepend local additions whose handle isn't already in Shopify
  const liveHandles = new Set(live.map((p) => p.handle));
  const pending = LOCAL_PRODUCT_ADDITIONS
    .filter((lp) => !liveHandles.has(lp.handle))
    .map(buildLocalProduct);
  return [...pending, ...live];
}

export async function fetchProductByHandle(handle) {
  // Check local additions first
  const local = LOCAL_PRODUCT_ADDITIONS.find((p) => p.handle === handle);
  try {
    const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle });
    const live = transformProduct(data.product);
    if (live) return live;
  } catch (e) {
    // fall through to local
  }
  if (local) return buildLocalProduct(local);
  return null;
}

export async function createCart(lines = []) {
  const data = await shopifyFetch(CART_CREATE, { lines });
  if (data.cartCreate.userErrors.length) throw new Error(data.cartCreate.userErrors[0].message);
  return data.cartCreate.cart;
}

export async function getCart(cartId) {
  const data = await shopifyFetch(CART_GET, { id: cartId });
  return data.cart;
}

export async function addCartLines(cartId, lines) {
  const data = await shopifyFetch(CART_LINES_ADD, { cartId, lines });
  if (data.cartLinesAdd.userErrors.length) throw new Error(data.cartLinesAdd.userErrors[0].message);
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(cartId, lines) {
  const data = await shopifyFetch(CART_LINES_UPDATE, { cartId, lines });
  if (data.cartLinesUpdate.userErrors.length) throw new Error(data.cartLinesUpdate.userErrors[0].message);
  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId, lineIds) {
  const data = await shopifyFetch(CART_LINES_REMOVE, { cartId, lineIds });
  if (data.cartLinesRemove.userErrors.length) throw new Error(data.cartLinesRemove.userErrors[0].message);
  return data.cartLinesRemove.cart;
}
