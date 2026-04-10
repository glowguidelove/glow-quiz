import { RoutineProfile } from "@/types";

// Affiliate URLs: synced with docs/affiliate-links-template.md (paste-friendly block).
//
// High-commission targets:
//   Obagi (40%), TULA (15%), Paula's Choice (7-15%), IMAGE (12%),
//   Dermstore (10%), The Ordinary (10%), Sephora (5-8%)

export const routineProfiles: RoutineProfile[] = [
  // ──────────────────────────── OILY / ACNE ────────────────────────────
  {
    id: "oily-acne-clinical-budget",
    title: "The Breakout Fighter",
    subtitle: "A targeted routine to clear and control acne-prone skin",
    description:
      "Your oily, acne-prone skin needs oil-free products with proven actives like salicylic acid and niacinamide. This routine controls excess sebum, unclogs pores, and fights breakouts without over-drying.",
    tags: ["oily", "acne", "clinical", "under-30", "30-75"],
    products: [
      {
        step: "Cleanser",
        name: "BHA Liquid Exfoliant",
        brand: "Paula's Choice",
        price: "$37",
        affiliateUrl: "https://amzn.to/41qA1qF",
        imageUrl: "/products/paulas-choice-bha.jpg",
        whyThisProduct:
          "The gold standard for unclogging pores. 2% salicylic acid dissolves oil and dead skin inside your pores without harsh scrubbing.",
      },
      {
        step: "Treatment",
        name: "Niacinamide 10% + Zinc 1%",
        brand: "The Ordinary",
        price: "$6",
        affiliateUrl: "https://amzn.to/3OtaIkS",
        imageUrl: "/products/ordinary-niacinamide.jpg",
        whyThisProduct:
          "Controls oil production and visibly minimizes pores. At this price, it's the best value active serum on the market.",
      },
      {
        step: "Moisturizer",
        name: "CLEAR Oil-Free Moisturizer",
        brand: "Paula's Choice",
        price: "$35",
        affiliateUrl: "https://amzn.to/4vCmJp0",
        imageUrl: "/products/paulas-choice-calm.jpg",
        whyThisProduct:
          "Oil-free gel-cream with niacinamide and ceramides — hydrates acne-prone skin without clogging pores. Pairs with your BHA and niacinamide steps for a full clinical routine you can buy on Amazon.",
      },
      {
        step: "SPF",
        name: "UV Clear Broad-Spectrum SPF 46",
        brand: "EltaMD",
        price: "$41",
        affiliateUrl: "https://amzn.to/4vmZz5M",
        imageUrl: "/products/eltamd-spf.jpg",
        whyThisProduct:
          "Dermatologist #1 pick for acne-prone skin. Oil-free, won't clog pores, and contains niacinamide to calm breakouts.",
      },
    ],
  },
  {
    id: "oily-acne-clean-budget",
    title: "The Gentle Clarifier",
    subtitle: "Clear skin with clean, non-toxic ingredients",
    description:
      "You want to fight breakouts but prefer gentle, clean formulas. This routine uses plant-derived actives and probiotic technology to clear skin without harsh chemicals.",
    tags: ["oily", "acne", "clean", "under-30", "30-75"],
    products: [
      {
        step: "Cleanser",
        name: "Purifying Face Cleanser",
        brand: "TULA",
        price: "$30",
        affiliateUrl: "https://amzn.to/4dFlZJc",
        imageUrl: "/products/tula-cleanser.jpg",
        whyThisProduct:
          "Probiotic-powered cleanser that removes excess oil and makeup without stripping your skin barrier.",
      },
      {
        step: "Treatment",
        name: "Salicylic Acid 2% Anhydrous Solution",
        brand: "The Ordinary",
        price: "$8",
        affiliateUrl: "https://amzn.to/3Q0XtZi",
        imageUrl: "/products/ordinary-salicylic.jpg",
        whyThisProduct:
          "2% salicylic acid in a gentle anhydrous base to exfoliate inside pores and calm blemish-prone skin — widely stocked on Amazon and pairs cleanly with the rest of this routine.",
      },
      {
        step: "Moisturizer",
        name: "Watermelon Glow Pink Juice Moisturizer",
        brand: "Glow Recipe",
        price: "$40",
        affiliateUrl: "https://amzn.to/4suD3Fw",
        imageUrl: "/products/glow-recipe-moisturizer.jpg",
        whyThisProduct:
          "Oil-free gel moisturizer with watermelon and hyaluronic acid — lightweight hydration without extra shine for breakout-prone skin.",
      },
      {
        step: "SPF",
        name: "Protect + Glow SPF 30",
        brand: "TULA",
        price: "$38",
        affiliateUrl: "https://amzn.to/47P0eTt",
        imageUrl: "/products/tula-spf.jpg",
        whyThisProduct:
          "Clean mineral sunscreen that doubles as a primer. Gives a dewy glow without clogging pores.",
      },
    ],
  },

  // ──────────────────────────── DRY / AGING ────────────────────────────
  {
    id: "dry-aging-clinical-premium",
    title: "The Age-Defying Ritual",
    subtitle: "Clinical-strength anti-aging for dry, mature skin",
    description:
      "Your dry skin craves deep hydration, and you want serious anti-aging results. This routine combines medical-grade retinol, peptides, and hyaluronic acid to smooth wrinkles and restore moisture.",
    tags: ["dry", "aging", "clinical", "75-150", "150-plus"],
    products: [
      {
        step: "Cleanser",
        name: "Gentle Cleanser",
        brand: "Obagi",
        price: "$55",
        affiliateUrl: "https://amzn.to/4cB3ggL",
        imageUrl: "/products/obagi-cleanser.jpg",
        whyThisProduct:
          "Medical-grade cleanser that removes impurities without stripping moisture. Formulated for dry, aging skin.",
      },
      {
        step: "Serum",
        name: "Professional-C Serum 15%",
        brand: "Obagi",
        price: "$130",
        affiliateUrl: "https://amzn.to/3Q35Pzt",
        imageUrl: "/products/obagi-vitamin-c.jpg",
        whyThisProduct:
          "Clinical-strength vitamin C that brightens, firms, and protects against environmental damage. The 40% commission makes this our highest-value recommendation.",
      },
      {
        step: "Treatment",
        name: "Retinol 1.0",
        brand: "Obagi",
        price: "$90",
        affiliateUrl: "https://amzn.to/4cjrLOn",
        imageUrl: "/products/obagi-retinol.jpg",
        whyThisProduct:
          "Prescription-level retinol that accelerates cell turnover to smooth fine lines and even skin tone. Use at night only.",
      },
      {
        step: "Moisturizer",
        name: "Hydrate Luxe Moisture-Rich Cream",
        brand: "Obagi",
        price: "$85",
        affiliateUrl: "https://amzn.to/4dzLnjr",
        imageUrl: "/products/obagi-hydrate.jpg",
        whyThisProduct:
          "Ultra-rich cream with shea butter and mango that locks in moisture for 8+ hours. Designed for dry, mature skin.",
      },
      {
        step: "SPF",
        name: "Sun Shield Mineral Broad Spectrum SPF 50",
        brand: "Obagi",
        price: "$60",
        affiliateUrl: "https://amzn.to/4vrCrTO",
        imageUrl: "/products/obagi-spf.jpg",
        whyThisProduct:
          "All-mineral zinc + titanium SPF 50 that Obagi keeps stocked more reliably than the Matte formula. Sheer finish; essential when using retinol.",
      },
    ],
  },
  {
    id: "dry-aging-clean-mid",
    title: "The Nourishing Glow",
    subtitle: "Gentle anti-aging hydration with clean ingredients",
    description:
      "Deep hydration meets gentle anti-aging. This routine uses clean, nourishing formulas to plump fine lines and restore your skin's natural radiance without harsh actives.",
    tags: ["dry", "aging", "clean", "no-preference", "30-75", "75-150"],
    products: [
      {
        step: "Cleanser",
        name: "Soy Makeup Removing Face Wash",
        brand: "Fresh",
        price: "$42",
        affiliateUrl: "https://amzn.to/47URifk",
        imageUrl: "/products/fresh-soy-cleanser.jpg",
        whyThisProduct:
          "Amino acid-rich cleanser that melts away makeup while conditioning dry skin. Leaves face soft, never tight.",
      },
      {
        step: "Serum",
        name: "Bakuchiol Retinol Alternative Serum",
        brand: "Herbivore",
        price: "$54",
        affiliateUrl: "https://amzn.to/3OxaiKf",
        imageUrl: "/products/herbivore-bakuchiol.jpg",
        whyThisProduct:
          "Plant-based retinol alternative that smooths fine lines without irritation. Perfect for sensitive or dry skin.",
      },
      {
        step: "Moisturizer",
        name: "Protini Polypeptide Cream",
        brand: "Drunk Elephant",
        price: "$68",
        affiliateUrl: "https://amzn.to/41mHLKr",
        imageUrl: "/products/drunk-elephant-protini.jpg",
        whyThisProduct:
          "Peptide-packed moisturizer that improves firmness and elasticity. Clean formula, no fragrance or essential oils.",
      },
      {
        step: "SPF",
        name: "Unseen Sunscreen SPF 40",
        brand: "Supergoop!",
        price: "$38",
        affiliateUrl: "https://amzn.to/41YbrgZ",
        imageUrl: "/products/supergoop-unseen.jpg",
        whyThisProduct:
          "Invisible, weightless SPF that works perfectly under makeup. Clean formula with no white cast.",
      },
    ],
  },

  // ──────────────────────────── COMBINATION / DULLNESS ────────────────────────────
  {
    id: "combo-dullness-clinical",
    title: "The Radiance Booster",
    subtitle: "Brighten and even out your combination skin",
    description:
      "Your combination skin looks tired and uneven. This routine uses vitamin C, AHAs, and targeted hydration to bring back your glow while balancing oil and dry zones.",
    tags: ["combination", "dullness", "clinical", "no-preference", "30-75", "75-150"],
    products: [
      {
        step: "Cleanser",
        name: "CLEAR Pore Normalizing Cleanser",
        brand: "Paula's Choice",
        price: "$24",
        affiliateUrl: "https://amzn.to/3Qv0BfW",
        imageUrl: "/products/paulas-choice-cleanser.jpg",
        whyThisProduct:
          "Gently balances combination skin by removing excess oil in the T-zone without over-drying cheeks.",
      },
      {
        step: "Exfoliant",
        name: "25% AHA + 2% BHA Exfoliant Peel",
        brand: "Paula's Choice",
        price: "$45",
        affiliateUrl: "https://amzn.to/4cdw1i7",
        imageUrl: "/products/paulas-choice-aha-peel.jpg",
        whyThisProduct:
          "Rinse-off weekly peel with a high-strength AHA blend plus salicylic acid—same slot as The Ordinary’s famous red peel, but easier to find on Amazon. Use 1x per week to start; don’t layer with retinol the same night.",
      },
      {
        step: "Serum",
        name: "C15 Super Booster",
        brand: "Paula's Choice",
        price: "$55",
        affiliateUrl: "https://amzn.to/3PZiWlf",
        imageUrl: "/products/paulas-choice-vitamin-c.jpg",
        whyThisProduct:
          "15% vitamin C + vitamin E brightens dark spots and protects against environmental damage. Lightweight for combo skin.",
      },
      {
        step: "Moisturizer",
        name: "Water Drench Cloud Cream",
        brand: "Peter Thomas Roth",
        price: "$54",
        affiliateUrl: "https://amzn.to/4eek5PQ",
        imageUrl: "/products/ptr-water-drench.jpg",
        whyThisProduct:
          "Hyaluronic acid-infused gel-cream that hydrates without heaviness. Balances combo skin perfectly.",
      },
      {
        step: "SPF",
        name: "UV Clear Broad-Spectrum SPF 46",
        brand: "EltaMD",
        price: "$41",
        affiliateUrl: "https://amzn.to/4vmZz5M",
        imageUrl: "/products/eltamd-spf.jpg",
        whyThisProduct:
          "Lightweight, oil-free SPF with niacinamide that won't make your T-zone shiny or your cheeks flaky.",
      },
    ],
  },

  // ──────────────────────────── SENSITIVE / REDNESS ────────────────────────────
  {
    id: "sensitive-redness-clean",
    title: "The Calm Restore",
    subtitle: "Soothe, protect, and strengthen reactive skin",
    description:
      "Your skin is easily irritated and prone to redness. This ultra-gentle routine uses calming ingredients like centella, ceramides, and probiotics to strengthen your skin barrier and reduce reactivity.",
    tags: ["sensitive", "redness", "clean", "no-preference", "under-30", "30-75", "75-150"],
    products: [
      {
        step: "Cleanser",
        name: "Purifying Face Cleanser",
        brand: "TULA",
        price: "$30",
        affiliateUrl: "https://amzn.to/4dFlZJc",
        imageUrl: "/products/tula-cleanser.jpg",
        whyThisProduct:
          "pH-balanced, probiotic cleanser that removes impurities without triggering redness or irritation.",
      },
      {
        step: "Treatment",
        name: "Azelaic Acid Suspension 10%",
        brand: "The Ordinary",
        price: "$8",
        affiliateUrl: "https://amzn.to/3NSNZi4",
        imageUrl: "/products/ordinary-azelaic.jpg",
        whyThisProduct:
          "Calms redness and rosacea while gently evening skin tone. One of the few actives safe for very sensitive skin.",
      },
      {
        step: "Moisturizer",
        name: "CLEAR Oil-Free Moisturizer",
        brand: "Paula's Choice",
        price: "$35",
        affiliateUrl: "https://amzn.to/4vCmJp0",
        imageUrl: "/products/paulas-choice-calm.jpg",
        whyThisProduct:
          "Lightweight gel-cream with niacinamide and ceramides that hydrates reactive skin without clogging pores — easier to find in stock than older CALM SKUs.",
      },
      {
        step: "SPF",
        name: "UV Physical Broad-Spectrum SPF 41",
        brand: "EltaMD",
        price: "$48",
        affiliateUrl: "https://amzn.to/4tCOcoz",
        imageUrl: "/products/eltamd-physical.jpg",
        whyThisProduct:
          "100% mineral sunscreen (zinc oxide + titanium dioxide). No chemical filters that could trigger sensitivity.",
      },
    ],
  },

  // ──────────────────────────── NORMAL / MAINTENANCE ────────────────────────────
  {
    id: "normal-maintenance-any",
    title: "The Everyday Glow",
    subtitle: "A balanced routine to keep great skin great",
    description:
      "Your skin is in good shape — you just need a solid routine to maintain it and prevent future concerns. This routine balances hydration, protection, and gentle anti-aging.",
    tags: ["normal", "dullness", "no-preference", "clean", "clinical", "30-75"],
    products: [
      {
        step: "Cleanser",
        name: "Soy Makeup Removing Face Wash",
        brand: "Fresh",
        price: "$42",
        affiliateUrl: "https://amzn.to/47URifk",
        imageUrl: "/products/fresh-soy-cleanser.jpg",
        whyThisProduct:
          "Gentle amino acid cleanser that maintains your skin's natural balance while thoroughly cleansing.",
      },
      {
        step: "Serum",
        name: "Hyaluronic Acid 2% + B5 (with Ceramides)",
        brand: "The Ordinary",
        price: "$10",
        affiliateUrl: "https://amzn.to/4ecibz8",
        imageUrl: "/products/ordinary-ha.jpg",
        whyThisProduct:
          "Multi-depth hyaluronic acid plus barrier-supporting ceramides — same hydration role as the classic HA serum, often better stocked on Amazon US.",
      },
      {
        step: "Moisturizer",
        name: "24-7 Moisture Hydrating Day & Night Cream",
        brand: "TULA",
        price: "$58",
        affiliateUrl: "https://amzn.to/4dzwH3Q",
        imageUrl: "/products/tula-moisturizer.jpg",
        whyThisProduct:
          "Balanced hydration with prebiotics and hyaluronic acid to keep your skin microbiome healthy and your complexion clear.",
      },
      {
        step: "SPF",
        name: "Unseen Sunscreen SPF 40",
        brand: "Supergoop!",
        price: "$38",
        affiliateUrl: "https://amzn.to/41YbrgZ",
        imageUrl: "/products/supergoop-unseen.jpg",
        whyThisProduct:
          "Invisible protection that layers perfectly under makeup or on bare skin. The best daily SPF.",
      },
    ],
  },

  // ──────────────────────────── DARK SPOTS / HYPERPIGMENTATION ────────────────────────────
  {
    id: "any-darkspots-clinical",
    title: "The Spot Eraser",
    subtitle: "Fade dark spots and even your skin tone",
    description:
      "Hyperpigmentation and uneven skin tone need targeted brightening actives. This routine combines vitamin C, alpha arbutin, and chemical exfoliation to fade dark spots and prevent new ones.",
    tags: ["dark-spots", "clinical", "no-preference", "30-75", "75-150"],
    products: [
      {
        step: "Cleanser",
        name: "CLEAR Pore Normalizing Cleanser",
        brand: "Paula's Choice",
        price: "$24",
        affiliateUrl: "https://amzn.to/3Qv0BfW",
        imageUrl: "/products/paulas-choice-cleanser.jpg",
        whyThisProduct:
          "Clean canvas for your actives. Gentle enough for daily use without interfering with your treatment products.",
      },
      {
        step: "Serum",
        name: "Alpha Arbutin 2% + HA",
        brand: "The Ordinary",
        price: "$11",
        affiliateUrl: "https://amzn.to/4cG2NJh",
        imageUrl: "/products/ordinary-arbutin.jpg",
        whyThisProduct:
          "Targets melanin production at the source. Fades existing dark spots and prevents new ones from forming.",
      },
      {
        step: "Treatment",
        name: "C15 Super Booster",
        brand: "Paula's Choice",
        price: "$55",
        affiliateUrl: "https://amzn.to/3PZiWlf",
        imageUrl: "/products/paulas-choice-vitamin-c.jpg",
        whyThisProduct:
          "15% L-ascorbic acid brightens dark spots and adds antioxidant protection against UV-triggered pigmentation.",
      },
      {
        step: "Moisturizer",
        name: "ILUMA Intense Brightening Crème",
        brand: "IMAGE Skincare",
        price: "$101",
        affiliateUrl: "https://amzn.to/4vklsm6",
        imageUrl: "/products/image-brightening.jpg",
        whyThisProduct:
          "Clinical-grade brightening moisturizer with bearberry and licorice extract that targets stubborn discoloration.",
      },
      {
        step: "SPF",
        name: "DAILY PREVENTION Sheer Matte Moisturizer SPF 30",
        brand: "IMAGE Skincare",
        price: "$54",
        affiliateUrl: "https://amzn.to/4cAiSB3",
        imageUrl: "/products/image-spf.jpg",
        whyThisProduct:
          "SPF is non-negotiable for dark spots — UV exposure makes them worse. Sheer matte finish controls shine and is easier to source than older Prevention+ Amazon listings.",
      },
    ],
  },

  // ──────────────────────────── BUDGET-FRIENDLY UNIVERSAL ────────────────────────────
  {
    id: "any-any-budget",
    title: "The Smart Start",
    subtitle: "Maximum results on a minimal budget",
    description:
      "Great skincare doesn't have to be expensive. This routine mixes The Ordinary treatments with a widely available drugstore SPF — about $50 total MSRP (sales vary).",
    tags: ["under-30", "minimal", "basic"],
    products: [
      {
        step: "Cleanser",
        name: "Squalane Cleanser",
        brand: "The Ordinary",
        price: "$10",
        affiliateUrl: "https://amzn.to/3OtcRgq",
        imageUrl: "/products/ordinary-squalane-cleanser.jpg",
        whyThisProduct:
          "Gentle, non-stripping cleanser that dissolves makeup and impurities. Works for every skin type.",
      },
      {
        step: "Serum",
        name: "Niacinamide 10% + Zinc 1%",
        brand: "The Ordinary",
        price: "$6",
        affiliateUrl: "https://amzn.to/3OtaIkS",
        imageUrl: "/products/ordinary-niacinamide.jpg",
        whyThisProduct:
          "The most versatile serum in skincare. Reduces pores, controls oil, brightens, and strengthens your skin barrier.",
      },
      {
        step: "Moisturizer",
        name: "Natural Moisturizing Factors + HA",
        brand: "The Ordinary",
        price: "$10",
        affiliateUrl: "https://amzn.to/4cczOwc",
        imageUrl: "/products/ordinary-nmf.jpg",
        whyThisProduct:
          "Mimics your skin's natural moisture system. No frills, just effective hydration at an unbeatable price.",
      },
      {
        step: "SPF",
        name: "Ultra Gentle Daily Facial Moisturizer SPF 30",
        brand: "Neutrogena",
        price: "$22",
        affiliateUrl: "https://amzn.to/4eeOduk",
        imageUrl: "/products/neutrogena-ultra-gentle-spf.jpg",
        whyThisProduct:
          "Broad-spectrum SPF 30, fragrance-free, non-comedogenic, and formulated for sensitive and acne-prone skin — usually easy to buy on Amazon (listing is the 3.4 fl oz twin pack). Reapply every 2 hours in direct sun.",
      },
    ],
  },

  // ──────────────────────────── PREMIUM LUXURY ────────────────────────────
  {
    id: "any-aging-premium-luxury",
    title: "The Luxury Reset",
    subtitle: "Premium, clinically proven anti-aging for transformative results",
    description:
      "You want the best of the best. This routine combines medical-grade formulations with luxurious textures for visible, dramatic anti-aging results.",
    tags: ["aging", "150-plus", "75-150", "clinical"],
    products: [
      {
        step: "Cleanser",
        name: "Gentle Cleanser",
        brand: "Obagi",
        price: "$55",
        affiliateUrl: "https://amzn.to/4cB3ggL",
        imageUrl: "/products/obagi-cleanser.jpg",
        whyThisProduct:
          "Medical-grade cleansing that prepares your skin to absorb high-performance actives without irritation.",
      },
      {
        step: "Serum",
        name: "Professional-C Serum 20%",
        brand: "Obagi",
        price: "$155",
        affiliateUrl: "https://amzn.to/4eejptM",
        imageUrl: "/products/obagi-vitamin-c-20.jpg",
        whyThisProduct:
          "Maximum-strength vitamin C serum. Clinically proven to stimulate collagen production and dramatically brighten skin.",
      },
      {
        step: "Treatment",
        name: "Retinol 1.0",
        brand: "Obagi",
        price: "$90",
        affiliateUrl: "https://amzn.to/4cjrLOn",
        imageUrl: "/products/obagi-retinol.jpg",
        whyThisProduct:
          "The most effective over-the-counter retinol available. Reduces wrinkle depth by up to 34% in clinical trials.",
      },
      {
        step: "Eye Cream",
        name: "Elastiderm Eye Cream",
        brand: "Obagi",
        price: "$130",
        affiliateUrl: "https://amzn.to/4tmC6jX",
        imageUrl: "/products/obagi-eye.jpg",
        whyThisProduct:
          "Targets crow's feet and under-eye crepiness with a patented bi-mineral complex. Visible results in 2 weeks.",
      },
      {
        step: "Moisturizer",
        name: "Hydrate Luxe Moisture-Rich Cream",
        brand: "Obagi",
        price: "$85",
        affiliateUrl: "https://amzn.to/4dzLnjr",
        imageUrl: "/products/obagi-hydrate.jpg",
        whyThisProduct:
          "Ultra-luxe cream that locks in all your treatment products and provides 8-hour moisture.",
      },
      {
        step: "SPF",
        name: "Sun Shield Mineral Broad Spectrum SPF 50",
        brand: "Obagi",
        price: "$60",
        affiliateUrl: "https://amzn.to/4vrCrTO",
        imageUrl: "/products/obagi-spf.jpg",
        whyThisProduct:
          "Critical protection when using retinol and vitamin C. Mineral formula is easier to source than Matte SPF 50 when listings go dark.",
      },
    ],
  },
];
