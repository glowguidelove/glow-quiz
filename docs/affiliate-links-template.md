# Affiliate link handoff (GlowGuide catalog)

Use this file to paste **your** tracking URLs so they can be merged into `src/data/products.ts` in one pass.

## How to fill this in

1. For each **Product key** below, paste your full affiliate URL in the **Your affiliate URL** column (or use the paste-friendly block at the bottom).  
   - Use one link per key even if the same product appears in multiple quiz routines (the app reuses the same URL).
2. If you do not have an affiliate program for a merchant yet, leave the placeholder or write `SKIP` and keep the direct brand/Sephora URL in the app until you do.
3. Amazon: the **Canonical PDP** is the exact product page this quiz intends to send shoppers to—your Associates/SiteStripe link should land on the **same** item (check size/variant on the PDP).

---

## Replacements (April 2026) — stock / affiliate availability

These keys were updated because the prior Amazon listing was often **unavailable**, **third-party only**, or a **better in-stock alternative** exists:

| Product key | Change |
|-------------|--------|
| `tula-clear-it-up` | **Removed from quiz** (Amazon often OOS). Replaced in-app by **`ordinary-salicylic-2`** — The Ordinary Salicylic Acid 2% Anhydrous (`B09NGJ1PRP`). |
| `obagi-sun-shield-matte-spf50` | Matte SPF (`B08FBKKJMD`) frequently OOS on Amazon / Obagi. **Replaced with Sun Shield Mineral SPF 50** (`B017T7B08M`) — same line, all-mineral, usually easier to buy. |
| `paulas-choice-calm-moisturizer` | Old CALM Amazon SKU unstable. **Replaced with CLEAR Oil-Free Moisturizer** (`B07HZWXGJ7`) — still Paula's Choice, better stock; targets redness + oily/combo sensitive. |
| `ordinary-ha-b5` | Alternate Amazon listing: **HA 2% + B5 (with ceramides)** (`B01MYEZPC8`) — same role in the quiz, often better availability than `B07ZJY5G2Z`. |
| `image-prevention-spf30` | Aligned quiz + Amazon with **PREVENTION / Daily Prevention matte-type SPF** (`B09Q9LL6RL`) when `B091Q8M8XC` is flaky; IMAGE site uses **sheer matte** PDP (see table). |
| `ordinary-mineral-uv-spf15` | SPF 15 (`B07F46D4C2`) often OOS; CeraVe AM listings were also flaky. **Now Neutrogena Ultra Gentle Daily Facial Moisturizer SPF 30** — twin pack (`B0GHD8QSJM`). Key name kept for merges. |
| *(Breakout Fighter moisturizer)* | TULA Breakout Star had no Amazon affiliate slot. **The Breakout Fighter** routine now uses **`paulas-choice-calm-moisturizer`** (CLEAR Oil-Free Moisturizer, `B07HZWXGJ7`) — same key/link as Calm Restore. |

---

## Unique products (fill each key once)

| Product key | Brand | Product (quiz name) | Canonical PDP / merchant | Your affiliate URL |
|-------------|-------|---------------------|--------------------------|--------------------|
| `paulas-choice-bha` | Paula's Choice | BHA Liquid Exfoliant | `https://www.amazon.com/dp/B00949CTQQ` | |
| `ordinary-niacinamide` | The Ordinary | Niacinamide 10% + Zinc 1% | `https://www.amazon.com/dp/B01MDTVZTZ` | |
| `tula-247-moisturizer` | TULA | Probiotics & Green Tea Moisturizer | `https://www.amazon.com/dp/B07XCYBCCN` | |
| `eltamd-uv-clear` | EltaMD | UV Clear Broad-Spectrum SPF 46 | `https://www.amazon.com/dp/B002MSN3QQ` | |
| `tula-cult-classic-cleanser` | TULA | Purifying Face Cleanser (Cult Classic) | `https://www.amazon.com/dp/B01BQQUFQU` | |
| `ordinary-salicylic-2` | The Ordinary | Salicylic Acid 2% Anhydrous Solution *(replaces TULA Clear Up in Gentle Clarifier)* | `https://www.amazon.com/dp/B09NGJ1PRP` · The Ordinary: `https://theordinary.com/en-us/salicylic-acid-2-anhydrous-solution-exfoliator-100442.html` | |
| `glow-recipe-pink-juice` | Glow Recipe | Watermelon Glow Pink Juice Moisturizer | `https://www.amazon.com/dp/B0CQ3S66MW` (50 ml; travel `https://www.amazon.com/dp/B07G25KZ5J`) | |
| `tula-protect-glow-spf30` | TULA | Protect + Glow SPF 30 | `https://www.amazon.com/dp/B086RGJT4F` | |
| `obagi-gentle-cleanser` | Obagi | Gentle Cleanser | `https://www.amazon.com/dp/B00F6XZNLM` | |
| `obagi-professional-c-15` | Obagi | Professional-C Serum 15% | `https://www.amazon.com/dp/B00F6XZVHS` | |
| `obagi-professional-c-20` | Obagi | Professional-C Serum 20% | `https://www.amazon.com/dp/B00F6XZZMY` | |
| `obagi-retinol-1` | Obagi | Retinol 1.0 | `https://www.amazon.com/dp/B00IBDCYWK` | |
| `obagi-hydrate-luxe` | Obagi | Hydrate Luxe Moisture-Rich Cream | `https://www.amazon.com/dp/B00GR835AG` | |
| `obagi-sun-shield-matte-spf50` | Obagi | Sun Shield **Mineral** Broad Spectrum SPF 50 *(replaces Matte when unavailable)* | `https://www.amazon.com/dp/B017T7B08M` · Obagi: `https://www.obagi.com/products/mineral-broad-spectrum-spf-50` | |
| `obagi-elastiderm-eye` | Obagi | Elastiderm Eye Cream | `https://www.amazon.com/dp/B00303GLXY` | |
| `fresh-soy-cleanser` | Fresh | Soy Makeup Removing Face Wash | `https://www.amazon.com/dp/B00AU9EBTC` (~150 ml; confirm size on PDP) | |
| `herbivore-bakuchiol` | Herbivore | Bakuchiol Retinol Alternative Serum | `https://www.amazon.com/dp/B07YZNT3RV` | |
| `drunk-elephant-protini` | Drunk Elephant | Protini Polypeptide Cream | `https://www.amazon.com/dp/B07934S6WK` (full size; alt `B07DVYKN1K`) | |
| `supergoop-unseen-spf40` | Supergoop! | Unseen Sunscreen SPF 40 | `https://www.amazon.com/dp/B08CFVM1TT` | |
| `paulas-choice-clear-cleanser` | Paula's Choice | CLEAR Pore Normalizing Cleanser | `https://www.amazon.com/dp/B06ZYNQZKF` | |
| `paulas-choice-aha-peel` | Paula's Choice | 25% AHA + 2% BHA Exfoliant Peel | `https://www.amazon.com/dp/B07C5SS6YD` | |
| `paulas-choice-c15-booster` | Paula's Choice | C15 Super Booster | `https://www.amazon.com/dp/B00EYVSOKY` | |
| `ptr-water-drench` | Peter Thomas Roth | Water Drench Cloud Cream | `https://www.amazon.com/dp/B00YP4XGOO` | |
| `ordinary-azelaic-10` | The Ordinary | Azelaic Acid Suspension 10% | `https://www.amazon.com/dp/B06WD5J8KY` | |
| `paulas-choice-calm-moisturizer` | Paula's Choice | CLEAR Oil-Free Moisturizer *(replaces CALM weightless for Amazon availability)* | `https://www.amazon.com/dp/B07HZWXGJ7` · PC: `https://www.paulaschoice.com/clear-oil-free-moisturizer/380-3800.html` | |
| `eltamd-uv-physical-41` | EltaMD | UV Physical Broad-Spectrum SPF 41 | `https://www.amazon.com/dp/B00C8FVZZY` | |
| `ordinary-ha-b5` | The Ordinary | Hyaluronic Acid 2% + B5 **(with ceramides)** | `https://www.amazon.com/dp/B01MYEZPC8` | |
| `ordinary-alpha-arbutin` | The Ordinary | Alpha Arbutin 2% + HA | `https://www.amazon.com/dp/B06XCZFCFZ` | |
| `image-iluma-brightening` | IMAGE Skincare | ILUMA Intense Brightening Crème | `https://www.amazon.com/dp/B00KFXILRG` | |
| `image-prevention-spf30` | IMAGE Skincare | DAILY PREVENTION sheer matte moisturizer SPF 30 *(replaces older Prevention+ hydrating Amazon SKU)* | `https://www.amazon.com/dp/B09Q9LL6RL` · IMAGE: `https://imageskincare.com/products/daily-prevention-sheer-matte-moisturizer-spf-30` | |
| `ordinary-squalane-cleanser` | The Ordinary | Squalane Cleanser | `https://www.amazon.com/dp/B07PSKR85S` | |
| `ordinary-nmf-ha` | The Ordinary | Natural Moisturizing Factors + HA | `https://www.amazon.com/dp/B07N74F8NP` | |
| `ordinary-mineral-uv-spf15` | Neutrogena | Ultra Gentle Daily Facial Moisturizer SPF 30 *(replaces Ordinary mineral SPF / prior CeraVe pick; key name kept for merges; Amazon listing is 3.4 fl oz × 2)* | `https://www.amazon.com/dp/B0GHD8QSJM` | |

---

## Paste-friendly block (copy and replace `PASTE_HERE`)

Paste your URL between the quotes. Keys match the table above.

```text
paulas-choice-bha: "https://amzn.to/41qA1qF"
ordinary-niacinamide: "https://amzn.to/3OtaIkS"
tula-247-moisturizer: "https://amzn.to/4dzwH3Q"
eltamd-uv-clear: "https://amzn.to/4vmZz5M"
tula-cult-classic-cleanser: "https://amzn.to/4dFlZJc"
ordinary-salicylic-2: "https://amzn.to/3Q0XtZi"
glow-recipe-pink-juice: "https://amzn.to/4suD3Fw"
tula-protect-glow-spf30: "https://amzn.to/47P0eTt"
obagi-gentle-cleanser: "https://amzn.to/4cB3ggL"
obagi-professional-c-15: "https://amzn.to/3Q35Pzt"
obagi-professional-c-20: "https://amzn.to/4eejptM"
obagi-retinol-1: "https://amzn.to/4cjrLOn"
obagi-hydrate-luxe: "https://amzn.to/4dzLnjr"
obagi-sun-shield-matte-spf50: "https://amzn.to/4vrCrTO"
obagi-elastiderm-eye: "https://amzn.to/4tmC6jX"
fresh-soy-cleanser: "https://amzn.to/47URifk"
herbivore-bakuchiol: "https://amzn.to/3OxaiKf"
drunk-elephant-protini: "https://amzn.to/41mHLKr"
supergoop-unseen-spf40: "https://amzn.to/41YbrgZ"
paulas-choice-clear-cleanser: "https://amzn.to/3Qv0BfW"
paulas-choice-aha-peel: "https://amzn.to/4cdw1i7"
paulas-choice-c15-booster: "https://amzn.to/3PZiWlf"
ptr-water-drench: "https://amzn.to/4eek5PQ"
ordinary-azelaic-10: "https://amzn.to/3NSNZi4"
paulas-choice-calm-moisturizer: "https://amzn.to/4vCmJp0"
eltamd-uv-physical-41: "https://amzn.to/4tCOcoz"
ordinary-ha-b5: "https://amzn.to/4ecibz8"
ordinary-alpha-arbutin: "https://amzn.to/4cG2NJh"
image-iluma-brightening: "https://amzn.to/4vklsm6"
image-prevention-spf30: "https://amzn.to/4cAiSB3"
ordinary-squalane-cleanser: "https://amzn.to/3OtcRgq"
ordinary-nmf-ha: "https://amzn.to/4cczOwc"
ordinary-mineral-uv-spf15: "https://amzn.to/4eeOduk"
```

Send this block back (filled) in chat or commit the file—either way is easy to merge into `products.ts`.

---

## Notes

- **Radiance Booster exfoliant**: **The Ordinary** red peel was replaced with **Paula's Choice 25% AHA + 2% BHA Exfoliant Peel** (`B07C5SS6YD`) for Amazon availability. Add image asset `public/products/paulas-choice-aha-peel.jpg` (or point `imageUrl` at an existing placeholder).
- **Obagi Sun Shield**: Quiz + template now default to **Mineral SPF 50** when **Matte** is unavailable; shoppers who specifically want the matte hybrid formula can use `B08FBKKJMD` when in stock.
- **Glow Recipe**: Pink Juice is the canonical moisturizer for `glow-recipe-pink-juice`.
- **EltaMD UV Physical**: Common retail listing is **lightly tinted**—confirm the PDP matches what you want to recommend.
- **Non-Amazon programs**: If you only have Sephora/Rakuten/etc. for some brands, paste that URL under the same key—the merge step does not require Amazon.
- **`ordinary-salicylic-2`**: Replaces the old **`tula-clear-it-up`** slot in the Gentle Clarifier routine; add image asset `public/products/ordinary-salicylic.jpg` if you use local images.
- **`ordinary-mineral-uv-spf15`**: Now **Neutrogena** Ultra Gentle SPF 30 (`B0GHD8QSJM`). Add `public/products/neutrogena-ultra-gentle-spf.jpg` if you use local images.
