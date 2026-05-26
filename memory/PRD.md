# Kaftan Queens — Headless Shopify Rebuild (PRD)

## Original problem statement
Replace `kaftanqueens.co.uk` with a new website. Reuse images & copy from the
existing site, but redesign the whole experience with brand-fit colour and
typography. Use `rareandfair.com` as design inspiration. Landing page must
"suck customers in". The user chose Option A: **Headless Shopify** — products
and checkout managed natively in Shopify, frontend rendered with React.

## Tech stack
- React + Tailwind + Shadcn UI (frontend)
- FastAPI + MongoDB (backend, mostly inactive — frontend talks to Shopify directly)
- Shopify Storefront GraphQL API (e-commerce data + checkout)

## Data flow strategy (to avoid downtime)
1. New/pending products are hardcoded into `/app/frontend/src/data/localAdditions.js`.
2. A Python script in `/app/scripts/` generates a Shopify-formatted CSV.
3. CSV is placed in `/app/frontend/public/downloads/` for the user to download.
4. User imports the CSV in Shopify Admin → Products → Import (do NOT tick
   "overwrite").
5. Once live, the local entry is removed and the Storefront API serves the
   real product.

## Implemented (chronological highlights)
- Headless Shopify Storefront API integration (`lib/shopify.js`)
- Brand colour & typography pass; editorial layout inspired by Rare & Fair
- Custom favicons + header monogram logo (PDF→PNG conversion)
- Local additions layer (`localAdditions.js`) — preview products before Shopify import
- Product renames: Narlai Dress, Kerala Shirt, Jungle Shirt
- Editorial "info-only" homepage (removed grids; kept Story / Values / Journal)
- Product Detail rebuild: Lightbox, materials/care accordions, out-of-stock states,
  variant-specific image filtering
- Scroll/perf pass (lazy loading, `content-visibility`, `prefers-reduced-motion`)
- Footer redesign (removed non-functional links + Facebook)
- Mobile safe-area fixes

### 2026-02-26 — Butterfly Long Dress complete
- All 4 variants now have user-supplied photos:
  - Antique Rose (3 images)
  - Blue/White (2 images)
  - Bohemian (2 images)
  - Python (2 images)
- CSV generated at `/app/frontend/public/downloads/butterfly_long_dress.csv`
  via `/app/scripts/generate_butterfly_long_dress_csv.py` — ready for Shopify
  import.

## Backlog / next
- **P0** User imports `butterfly_long_dress.csv` to Shopify. Once live, remove
  the entry from `localAdditions.js` so the site reads it directly from Shopify.
- **P1** Push to GitHub & rebuild on DigitalOcean for production deployment.
- **P2** Cross-device verification of Lightbox + new variants on mobile.
- **P3** Refactor: rename `mock.js` → `content.js` (only editorial content left there).

## Key files
- `/app/frontend/src/lib/shopify.js` — GraphQL + merge logic
- `/app/frontend/src/data/localAdditions.js` — pending products & overrides
- `/app/frontend/src/pages/ProductDetail.jsx` — PDP w/ lightbox & accordions
- `/app/frontend/src/components/Lightbox.jsx` — image overlay
- `/app/scripts/generate_butterfly_long_dress_csv.py` — latest CSV generator

## Integrations
- Shopify Storefront API (`REACT_APP_SHOPIFY_STOREFRONT_TOKEN` in `.env`)
