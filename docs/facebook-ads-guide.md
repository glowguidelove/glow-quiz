# GlowGuide Facebook Ads Launch Guide

## Prerequisites

1. **Facebook Business Manager** account at business.facebook.com
2. **Ad Account** created inside Business Manager
3. **Meta Pixel** created in Events Manager (add ID to `.env.local`)
4. **Conversions API** access token generated (add to `.env.local`)
5. **Facebook Page** for GlowGuide (needed to run ads)
6. **Payment method** added to ad account

**GlowGuide production:** Pixel + browser events, CAPI `Lead` with dedup, and quiz URL **`/quiz`** are live — use **GlowGuide Dataset** / your Pixel when Ads Manager asks for a data source.

---

## Phase 1: Data Collection (Weeks 1-2)

**Goal:** Get 200-500 quiz completions to train the Pixel.
**Budget:** $20-30/day

### Campaign Setup

1. Go to Ads Manager → Create → Choose "Leads" as objective
2. Campaign name: "GQ - Leads - Broad - Phase 1"
3. Turn ON Advantage+ Campaign Budget: $25/day
4. Create 1 Ad Set:
   - **Audience:** Broad targeting only
     - Location: United States
     - Age: 25-54
     - Gender: Women
     - NO interest targeting (let Meta's AI find the audience)
   - **Placements:** Advantage+ Placements (automatic)
   - **Optimization:** Optimize for "Lead" event
   - **Conversion location:** Website
   - **Pixel:** Select your GlowGuide pixel
   - **Conversion event:** Lead

### Ad Creatives (Create 3-5 variations)

**Format:** Single image or short video (under 15 seconds)

**Hook ideas that work for skincare quizzes:**
- "Your skincare routine is probably wrong for your skin type"
- "Find out what a dermatologist would recommend for YOUR skin"
- "Take this 60-second quiz to find your perfect skincare routine"
- "Stop wasting money on products that don't work for your skin"
- "I matched my skincare to my skin type and my skin cleared in 3 weeks"

**Ad copy template:**

```
Tired of buying skincare that doesn't work?

Your skin is unique — your routine should be too.

Take our free 60-second Skin Quiz and get a personalized routine
matched to your:
✅ Skin type
✅ Top concerns
✅ Budget
✅ Ingredient preferences

Science-backed recommendations. Zero guesswork.

👉 Take the free quiz now
```

**CTA button:** "Learn More" or "Sign Up"
**Landing page:** https://glowguide.love/quiz (use the same domain you verified in Business settings, with or without `www` — stay consistent with `NEXT_PUBLIC_SITE_URL` on Vercel)

### Creative Tips for Beauty Ads

- UGC-style video performs best (someone talking to camera about their skin)
- Before/after content gets high engagement
- "Day 1 vs Day 30" format
- Texture close-ups and product application shots
- Carousel showing the 4-step routine

---

## Phase 2: Retargeting (Weeks 3-4)

**Goal:** Convert quiz completers who didn't click products.
**Budget:** $15-25/day

### Custom Audiences to Create

In Events Manager → Audiences → Create Custom Audience:

1. **Quiz Starters** — People who triggered "QuizStart" event but NOT "QuizComplete"
2. **Quiz Completers** — People who triggered "QuizComplete" but NOT "ProductClick"
3. **Product Clickers** — People who triggered "ProductClick" (your best audience)
4. **Email Subscribers** — Upload your Kit subscriber list

### Retargeting Ad Sets

**Ad Set 1: Quiz Abandonners**
- Audience: Quiz Starters, exclude Quiz Completers
- Creative: "You left your personalized routine behind! 🧴"
- CTA: "Finish your quiz — it takes 30 seconds"

**Ad Set 2: Completers Who Didn't Shop**
- Audience: Quiz Completers, exclude Product Clickers
- Creative: "Your personalized routine is waiting ✨"
- Show specific product images from popular routines
- CTA: "See your recommended products"

**Ad Set 3: Product Clickers (Lookalike)**
- Create 1% Lookalike from Product Clickers custom audience
- This is your highest-value prospecting audience
- Use your best-performing creatives from Phase 1

---

## Phase 3: Scale (Month 2+)

### Switch Optimization Event

Once you have 50+ ProductClick events, switch your campaign
optimization from "Lead" to a custom conversion for "ProductClick".
This tells Meta to find people most likely to click affiliate links.

### Scaling Rules

- Increase budget by max 20% every 3 days (avoid resetting learning phase)
- Kill ad sets with CPA 2x your target after 3 days
- Duplicate winning ad sets (don't edit them) when scaling
- Test 5-10 new creatives per week
- Refresh creatives every 2-3 weeks to avoid ad fatigue

### Budget Allocation at Scale

- 60% — Prospecting (Advantage+ / Lookalikes)
- 25% — Retargeting (quiz completers, site visitors)
- 15% — Testing (new creatives, new audiences)

---

## Key Metrics to Track

| Metric | Target | Where to Find |
|--------|--------|---------------|
| CPC (link click) | Under $2.00 | Ads Manager |
| CTR (link) | Above 1.5% | Ads Manager |
| Quiz completion rate | Above 70% | Your analytics |
| Email capture rate | Above 40% | Kit dashboard |
| Product click rate | Above 8% | Meta Events Manager |
| Cost per Lead | Under $5.00 | Ads Manager |
| Cost per ProductClick | Under $15.00 | Ads Manager |

---

## Pixel Events Reference

These events are already configured in your site code:

| Event | Type | When It Fires |
|-------|------|---------------|
| PageView | Standard | Every page load |
| QuizStart | Custom | First quiz question answered |
| QuizComplete | Custom | All 7 questions answered |
| Lead | Standard | Email submitted |
| ViewResults | Custom | Results page viewed |
| ProductClick | Custom | Affiliate "Shop Now" clicked |

All standard events also fire server-side via Conversions API
for accurate tracking despite iOS privacy restrictions.
