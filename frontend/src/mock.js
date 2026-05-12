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
      "https://images.unsplash.com/photo-1659126404817-63ddbbae1b06?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400",
    pos: "center 25%",
  },
  {
    eyebrow: "— Tailored by hand",
    title: "Tailor-Made With Quality",
    sub: "Buy less, choose well, make it last",
    cta: { label: "Shop Now", to: "/shop" },
    image:
      "https://images.unsplash.com/photo-1767617158289-e156ac6792a9?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400",
    pos: "center 30%",
  },
  {
    eyebrow: "— Pure cottons & silks",
    title: "Handmade Clothes, Natural Fibres",
    sub: "Look beautiful, while doing good",
    cta: { label: "Shop Pure Cotton", to: "/shop?cat=women" },
    image:
      "https://images.unsplash.com/photo-1595539215912-934862bd6f64?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400",
    pos: "center 30%",
  },
];

const CDN = "https://kaftanqueens.co.uk/cdn/shop/files/";

export const PRODUCTS = [
  {
    id: "palm-kaftan",
    name: "Palm Kaftan",
    price: 75,
    category: "women",
    sub: "Silk/Viscose blend · Hand-printed",
    badge: "Bestseller",
    description:
      "A vibrant kaftan featuring a unique hand-printed design and a flattering drawstring waist. Crafted from a soft silk/viscose blend, this midi-length kaftan adds individual style and breezy comfort to your wardrobe.",
    material: "Silk/Viscose",
    origin: "Hand-printed in Rajasthan, India",
    care: "Machine wash at 30°C. Warm iron on reverse. Do not tumble dry.",
    colours: ["Pink", "Green & Fuchsia", "Blue & Red", "Orange"],
    images: [
      `${CDN}Palm_peach_kaftan.heic?v=1761750299&width=1200`,
      `${CDN}Palmbeigekaftan2.heic?v=1761750123&width=1200`,
      `${CDN}Palmblueandredkaftan.heic?v=1761750122&width=1200`,
      `${CDN}Palmpinkandgreenkaftan.heic?v=1761750123&width=1200`,
    ],
    pos: "center 30%",
  },
  {
    id: "palm-dress",
    name: "Palm Dress",
    price: 75,
    category: "women",
    sub: "Cotton · Hand block print",
    badge: "New In",
    description:
      "A cotton knee-length dress with trim on the hem and sleeves. Hand printed in Rajasthan and available in a range of vibrant colourways.",
    material: "Silk/Viscose",
    origin: "Hand-printed in Rajasthan, India",
    care: "Machine wash at 30°C. Warm iron on reverse. Do not tumble dry.",
    colours: ["Blue & Pink", "Blue Pattern", "Fuchsia", "Orange", "Yellow"],
    images: [
      `${CDN}Palmblueandpinkdress.heic?v=1761750246&width=1200`,
      `${CDN}Palmpinkdress2.heic?v=1761750246&width=1200`,
      `${CDN}Palmorangedress3.heic?v=1761750245&width=1200`,
      `${CDN}Palmyellowdress3.heic?v=1761750245&width=1200`,
      `${CDN}Palmbluedress3.heic?v=1762429162&width=1200`,
      `${CDN}Palmfusiadress.heic?v=1762429162&width=1200`,
    ],
    pos: "center 30%",
  },
  {
    id: "kimono",
    name: "Kimono",
    price: 80,
    category: "women",
    sub: "Silk/Viscose · Flowing wrap",
    badge: "Limited",
    description:
      "A stunning wrap-design kimono in a range of vibrant colours. Crafted from a soft silk/viscose blend, it drapes beautifully with a silky texture — effortless style for any occasion.",
    material: "Silk/Viscose Blend",
    origin: "Handmade in India",
    care: "Machine wash cold. Warm iron.",
    colours: ["Pink", "Yellow", "Fuchsia"],
    images: [
      `${CDN}Pinkkimono2.heic?v=1761750652&width=1200`,
      `${CDN}Fushiapinkkimono3.heic?v=1761750652&width=1200`,
      `${CDN}Yellowkimono.heic?v=1761750652&width=1200`,
    ],
    pos: "center 30%",
  },
  {
    id: "hampi-linen-shirt",
    name: "Hampi Linen Shirt",
    price: 75,
    category: "men",
    sub: "100% Cotton · Contrast trim",
    badge: "New In",
    description:
      "Our Hampi men's linen shirt with cotton contrast inside the collar and cuffs, and contrasting buttons and stitching. Tailored for relaxed everyday wear.",
    material: "100% Cotton",
    origin: "Made in India",
    care: "Machine cool wash. Warm iron. Do not tumble dry.",
    sizing: "Arm length 53 cm · Chest 58 cm",
    colours: ["Navy Blue", "White", "Denim Blue", "Pink"],
    images: [
      `${CDN}Hampi_Navy_Blue_Shirt_2.jpg?v=1763043582&width=1200`,
      `${CDN}HampiDenimBlueShirt3.jpg?v=1763043582&width=1200`,
      `${CDN}HampiPinkShirt.jpg?v=1763043466&width=1200`,
      `${CDN}HampiWhiteShirt.jpg?v=1763043467&width=1200`,
      `${CDN}HampiNavyBlueShirt.jpg?v=1763043468&width=1200`,
      `${CDN}HampiDenimBlueShirt2.jpg?v=1763043582&width=1200`,
    ],
    pos: "center 30%",
  },
  {
    id: "goa-mens-shirt",
    name: "Goa Men's Shirt",
    price: 65,
    category: "men",
    sub: "100% Cotton · Block printed",
    badge: "Hand printed",
    description:
      "Our classic Goa smock shirt. Cotton block-printed in Rajasthan, with each piece stamped by artisans using wooden blocks. Buttons to the chest for an easy pull-on fit.",
    material: "100% Cotton",
    origin: "Block printed in Rajasthan, India",
    care: "Machine wash at 30°C. Warm iron on reverse. Do not tumble dry.",
    sizing: "Arm length 56 cm · Chest 62 cm",
    colours: ["Pink Flower", "Blue Pattern", "Blue Flower", "White Flower on Denim", "Lilac Flower"],
    images: [
      `${CDN}KeralaKortapinkflowerXL_6f8d6913-8162-4644-a49a-fefaa9bd45d0.jpg?v=1761750376&width=1200`,
      `${CDN}KeralaKortablueflowerXL2_acb651af-f8a8-4eb8-ad74-b2be34f6d9ef.jpg?v=1761750377&width=1200`,
      `${CDN}KeralaKortaBluepatternXL2_8cbf2f14-bd30-4b42-80b4-8c5b73a26a53.jpg?v=1761750377&width=1200`,
      `${CDN}KeralaKortapurplefloweronwhiteXL2.jpg?v=1761750376&width=1200`,
      `${CDN}KeralaKortawhiteflowerondenimXL2.jpg?v=1761750376&width=1200`,
    ],
    pos: "center 30%",
  },
  {
    id: "kerala-mens-shirt",
    name: "Kerala Men's Shirt",
    price: 65,
    category: "men",
    sub: "100% Cotton · Wood-block print",
    description:
      "Our classic Kerala men's shirt — pure cotton, block printed in Rajasthan by artisans who stamp each piece using wooden blocks. Available in a wide spectrum of prints.",
    material: "100% Cotton",
    origin: "Block printed in Rajasthan, India",
    care: "Machine wash at 30°C. Warm iron on reverse. Do not tumble dry.",
    sizing: "Arm length 56 cm · Chest 62 cm",
    colours: [
      "Blue Flower",
      "Beige & Turquoise Flower",
      "Fuchsia Flower",
      "Pale Blue Block Print",
      "Green Block Print",
      "Pink Frangipani",
      "Navy Blue Block Print",
    ],
    images: [
      `${CDN}Keralablueflowermen_scottonshirtL.heic?v=1761750458&width=1200`,
      `${CDN}Keralabeigewithturquoiseflowersmen_scottonshirtL.heic?v=1761750459&width=1200`,
      `${CDN}Keralafushiaflowermen_scottonshirtL2.heic?v=1761750459&width=1200`,
      `${CDN}KeralanavyblockonwhitemenscottonshirtL3.heic?v=1761750459&width=1200`,
      `${CDN}KeralapinkfrangipanimenscottonshirtL.heic?v=1761750458&width=1200`,
      `${CDN}Keralapaleblueblockmen_scottonshirtL2.heic?v=1761750458&width=1200`,
    ],
    pos: "center 30%",
  },
  {
    id: "indian-woven-bags",
    name: "Indian Woven Bags",
    price: 20,
    category: "accessories",
    sub: "Hand-woven · Made in India",
    badge: "Hand-woven",
    description:
      "Beautiful hand-woven bags with intricate patterns in a range of stylish colours. Perfect for the beach, a sunny excursion, or as a travel bag — artisan craft for any day out.",
    material: "Hand Woven Fabric",
    origin: "Made in India",
    colours: ["Black & Cream", "Cream & White", "Cream & Turquoise", "Cream & Taupe"],
    images: [
      `${CDN}IndianBags1_b1392fe3-5266-4abb-bdc3-69b9910dc088.jpg?v=1761682331&width=1200`,
      `${CDN}indianbags2.jpg?v=1761682332&width=1200`,
      `${CDN}indianbags3.jpg?v=1761682332&width=1200`,
    ],
    pos: "center",
  },
  {
    id: "agonda-scarf",
    name: "Agonda Scarf",
    price: 65,
    category: "accessories",
    sub: "100% Wool · Classic pattern",
    description:
      "Our versatile Agonda Scarves feature a classic pattern in a beautiful range of colours. Crafted from soft 100% wool — a touch of style and warmth for any outfit.",
    material: "100% Wool",
    origin: "Made in India",
    care: "Hand wash in cold water. Do not tumble dry.",
    colours: ["Autumnal", "Pink", "Beige", "Blue", "Brown", "Dark Blue", "Mint", "Plum", "Yellow"],
    images: [
      `${CDN}Aginda_Scarf_Autumnal_d5919d8e-c6b7-4132-a0c2-717e7c6c1cb7.jpg?v=1762103326&width=1200`,
      `${CDN}AgondaScarfPink2.jpg?v=1761929096&width=1200`,
      `${CDN}AgondaScarfBeige.jpg?v=1761929096&width=1200`,
      `${CDN}AgondaScarfBlue3.jpg?v=1761929096&width=1200`,
      `${CDN}AgondaScarfPlum.jpg?v=1761928929&width=1200`,
      `${CDN}AgondaScarfYellow.jpg?v=1761928929&width=1200`,
      `${CDN}AgondaScarfMint.jpg?v=1761929096&width=1200`,
    ],
    pos: "center",
  },
  {
    id: "mariposa-scarf",
    name: "Mariposa Scarf",
    price: 65,
    category: "accessories",
    sub: "Lightweight wool · Hand-stitched",
    badge: "One of a kind",
    description:
      "A unique scarf with hand-stitched, layered designs in vibrant one-off colour combinations. Lightweight wool — artisan style and warmth in equal measure.",
    material: "Lightweight Wool",
    origin: "Made in Kashmir",
    colours: ["Blue", "Peach", "Purple"],
    images: [
      `${CDN}MariposaScarfBlue.jpg?v=1761929703&width=1200`,
      `${CDN}MariposaScarfBlue3.jpg?v=1761930167&width=1200`,
      `${CDN}MariposaScarfPeach.jpg?v=1761929702&width=1200`,
      `${CDN}MariposaScarfPurple.jpg?v=1761929701&width=1200`,
      `${CDN}MariposaScarfBlue2.jpg?v=1761930167&width=1200`,
    ],
    pos: "center",
  },
  {
    id: "yak-wool-scarf",
    name: "Yak Wool Scarf",
    price: 70,
    category: "accessories",
    sub: "100% Yak wool · Herringbone weave",
    description:
      "A versatile scarf with a classic herringbone weave in a beautiful range of colours. Crafted from soft 100% yak wool — exceptional warmth and a refined finish.",
    material: "100% Yak Wool",
    origin: "Made in India",
    care: "Hand wash in cold water. Do not tumble dry.",
    colours: ["Turquoise", "Beige", "Black", "Blue", "Green", "Brown", "Purple"],
    images: [
      `${CDN}YakWoolMandalaScarfBlue3.jpg?v=1762462953&width=1200`,
      `${CDN}MandalaYakwoolMulticolourpleasespecify2.jpg?v=1762462953&width=1200`,
      `${CDN}YakWoolMandalaScarfBeige.jpg?v=1762462953&width=1200`,
      `${CDN}YakWoolMandalaScarfPurple.jpg?v=1762462953&width=1200`,
      `${CDN}YakWoolMandalaScarfBrown.jpg?v=1762462953&width=1200`,
      `${CDN}YakWoolMandalaScarfBlue.jpg?v=1762462953&width=1200`,
      `${CDN}YakWoolMandalaScarfBlack.jpg?v=1761931001&width=1200`,
    ],
    pos: "center",
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
