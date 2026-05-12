// Mock data for Kaftan Queens — R&F-inspired redesign
// Copy preserved from kaftanqueens.co.uk; visuals supplemented with editorial imagery

export const SITE = {
  name: "Kaftan Queens",
  shortName: "K&Q",
  tagline:
    "A boutique slow-fashion house presenting handmade kaftans, scarves and shirts by artisans of Northern India — crafted with natural, sustainable materials.",
  email: "hello@kaftanqueens.co.uk",
  instagram: "https://www.instagram.com/kaftan.queens/",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Our Story", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Journal", to: "/journal" },
];

export const HERO_SLIDES = [
  {
    eyebrow: "— The Palm Edit",
    title: "Handmade, Natural Clothing",
    sub: "Rare pieces, fairly made",
    cta: { label: "Shop Now", to: "/shop" },
    image:
      "https://kaftanqueens.co.uk/cdn/shop/files/FullSizeRender_1.jpg?v=1747076209&width=2400",
  },
  {
    eyebrow: "— Tailored by hand",
    title: "Tailor-Made With Quality",
    sub: "Buy less, choose well, make it last",
    cta: { label: "Shop Now", to: "/shop" },
    image:
      "https://images.unsplash.com/photo-1659126404817-63ddbbae1b06?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
  },
  {
    eyebrow: "— Pure cottons & silks",
    title: "Handmade Clothes, Natural Fibres",
    sub: "Look beautiful, while doing good",
    cta: { label: "Shop Pure Cotton", to: "/shop?cat=women" },
    image:
      "https://kaftanqueens.co.uk/cdn/shop/files/BE216657-819F-4050-8363-95992F8A1318.jpg?v=1747076210&width=2400",
  },
];

export const PRODUCTS = [
  {
    id: "palm-kaftan",
    name: "The Palm Kaftan in Beige",
    price: 75,
    category: "women",
    sub: "Block-printed cotton",
    badge: "Bestseller",
    description:
      "Our signature beige kaftan, block-printed by hand with our palm motif. Light, breathable cotton with side splits.",
    images: [
      "https://images.unsplash.com/photo-1767617158289-e156ac6792a9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
      "https://images.unsplash.com/photo-1579019082792-c167bc76252d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    ],
  },
  {
    id: "palm-dress",
    name: "The Palm Dress in Blue-Rose",
    price: 75,
    category: "women",
    sub: "Hand block print",
    badge: "New In",
    description:
      "A relaxed, full-length cotton dress with hand-block printed palm motifs in blue and rose. Cut for breezy days and warm evenings.",
    images: [
      "https://images.unsplash.com/photo-1595539215912-934862bd6f64?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
      "https://images.unsplash.com/photo-1700234272512-3d767386f17c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    ],
  },
  {
    id: "fushia-kimono",
    name: "The Fuchsia Kimono",
    price: 80,
    category: "women",
    sub: "Silk-cotton blend",
    badge: "Limited",
    description:
      "A statement kimono in vivid fuchsia silk-cotton blend. Wear open over linen or belted as a dress.",
    images: [
      "https://images.unsplash.com/photo-1768094497433-7a56acd418e0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
      "https://images.unsplash.com/photo-1659126404817-63ddbbae1b06?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    ],
  },
  {
    id: "indian-woven-bags",
    name: "The Indian Woven Bag",
    price: 20,
    category: "accessories",
    sub: "Handwoven cotton",
    badge: "Handwoven",
    description:
      "Hand-woven by artisans in Northern India using traditional looms. Each bag is one-of-a-kind, finished with leather-style trim and a cotton lining.",
    images: [
      "https://kaftanqueens.co.uk/cdn/shop/files/IndianBags1_b1392fe3-5266-4abb-bdc3-69b9910dc088.jpg?v=1761682331&width=1200",
      "https://kaftanqueens.co.uk/cdn/shop/files/IMG_1402.jpg?v=1747076213&width=1200",
    ],
  },
  {
    id: "hampi-linen-shirt",
    name: "The Hampi Shirt in Denim Linen",
    price: 75,
    category: "men",
    sub: "Pure linen",
    badge: "New In",
    description:
      "A denim-blue linen shirt with a relaxed Cuban collar. Hand-finished buttons, made in small batches.",
    images: [
      "https://kaftanqueens.co.uk/cdn/shop/files/HampiDenimBlueShirt3.jpg?v=1763043582&width=1200",
      "https://kaftanqueens.co.uk/cdn/shop/files/KeralaKortablueflowerXL2_acb651af-f8a8-4eb8-ad74-b2be34f6d9ef.jpg?v=1761750377&width=1200",
    ],
  },
  {
    id: "goa-mens-shirt",
    name: "The Goa Shirt in Blue Floral",
    price: 65,
    category: "men",
    sub: "Hand block print",
    badge: "Handprint",
    description:
      "A breezy short-sleeve shirt in soft cotton with hand-printed florals. Made for slow holidays.",
    images: [
      "https://kaftanqueens.co.uk/cdn/shop/files/KeralaKortablueflowerXL2_acb651af-f8a8-4eb8-ad74-b2be34f6d9ef.jpg?v=1761750377&width=1200",
      "https://kaftanqueens.co.uk/cdn/shop/files/HampiDenimBlueShirt3.jpg?v=1763043582&width=1200",
    ],
  },
  {
    id: "kerala-mens-shirt",
    name: "The Kerala Shirt in Turquoise",
    price: 65,
    category: "men",
    sub: "Soft cotton",
    description:
      "A beige cotton shirt with turquoise floral hand-print. Buttery soft after every wash.",
    images: [
      "https://kaftanqueens.co.uk/cdn/shop/files/HampiDenimBlueShirt3.jpg?v=1763043582&width=1200",
      "https://kaftanqueens.co.uk/cdn/shop/files/KeralaKortablueflowerXL2_acb651af-f8a8-4eb8-ad74-b2be34f6d9ef.jpg?v=1761750377&width=1200",
    ],
  },
  {
    id: "wool-scarf-saffron",
    name: "The Saffron Wool Scarf",
    price: 45,
    category: "accessories",
    sub: "Pure hand-loomed wool",
    badge: "One of a kind",
    description:
      "Hand-loomed pure wool scarf in saffron with cream tasselled edge. Each piece is unique.",
    images: [
      "https://kaftanqueens.co.uk/cdn/shop/files/IMG_1402.jpg?v=1747076213&width=1200",
      "https://kaftanqueens.co.uk/cdn/shop/files/IMG_1783.jpg?v=1747076211&width=1200",
    ],
  },
];

export const STORY_BLOCKS = [
  {
    title: "Sustainably Crafted",
    body:
      "Responsibly sourced renewable and recycled materials, and low-impact manufacturing — to cut CO₂, water use and waste.",
    image:
      "https://kaftanqueens.co.uk/cdn/shop/files/IMG_1402.jpg?v=1747076213&width=1500",
  },
  {
    title: "Artisanal Luxury",
    body:
      "Handmade in small batches using heritage techniques and ethically sourced premium materials — each piece authentic, each piece scarce.",
    image:
      "https://kaftanqueens.co.uk/cdn/shop/files/IMG_1403.jpg?v=1747076213&width=1500",
  },
  {
    title: "Bohemian Chic",
    body:
      "Relaxed vintage silhouettes, natural fabrics and global patterns for a layered look you can wear from sand to supper.",
    image:
      "https://kaftanqueens.co.uk/cdn/shop/files/IMG_1783.jpg?v=1747076211&width=1500",
  },
];

export const JOURNAL = [
  {
    id: "sustainable-luxury",
    title: "The Best Sustainable Luxury Fashion Brands",
    excerpt:
      "Love luxury fashion? Care about sustainability? Our edit of the year’s best eco-luxe labels — plus tips to make the most of your purchasing power.",
    author: "Maxime Ducker",
    image:
      "https://images.unsplash.com/photo-1595539215912-934862bd6f64?crop=entropy&cs=srgb&fm=jpg&q=80&w=900",
  },
  {
    id: "eco-fabrics",
    title: "Top Eco-Fabrics That Are Good For You And Your Skin",
    excerpt:
      "Shopping for natural, eco-fabrics brings a range of fantastic benefits — not least the kindness they show to your skin.",
    author: "Laura Noble",
    image:
      "https://images.unsplash.com/photo-1767617158289-e156ac6792a9?crop=entropy&cs=srgb&fm=jpg&q=80&w=900",
  },
  {
    id: "fast-vs-slow",
    title: "Fast Vs. Slow Fashion: Can Fast Fashion Ever Be Slowed?",
    excerpt:
      "From ethical treatment of workers to sustainable materials and waste — the impact of fast fashion and whether it can ever truly slow down.",
    author: "Rosalyn Bowen",
    image:
      "https://kaftanqueens.co.uk/cdn/shop/files/IMG_1402.jpg?v=1747076213&width=900",
  },
];

export const ARTISAN = {
  title: "From the hands of artisans, directly to you",
  body:
    "Our handloomed, naturally dyed pieces support artisan communities across Northern India. We blend their slow-craft creations with modern silhouettes — so you can look beautiful, while doing good.",
  cta: { label: "Meet the Makers", to: "/about" },
  image:
    "https://kaftanqueens.co.uk/cdn/shop/files/BE216657-819F-4050-8363-95992F8A1318.jpg?v=1747076210&width=1400",
};

export const TESTIMONIALS = [
  { name: "Olivia, London", quote: "The Palm Kaftan is the most complimented thing I own. The quality is unreal and you can feel the craftsmanship." },
  { name: "Priya, Edinburgh", quote: "My wool scarf arrived wrapped like a gift. Knowing it was hand-loomed makes it feel like an heirloom already." },
  { name: "Marcus, Brighton", quote: "My Hampi shirt is on heavy rotation. Cut, colour, weight — everything is spot on." },
];
