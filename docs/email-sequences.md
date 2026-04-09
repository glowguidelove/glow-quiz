# GlowGuide Email Sequences

Set these up in Kit (ConvertKit) as automated sequences.
Each sequence triggers based on quiz completion data stored as subscriber custom fields.

---

## Sequence 1: Quiz Results Delivery (All subscribers)

**Trigger:** Immediately after quiz submission

### Email 1 — Instant: "Your Personalized Skincare Routine"

**Subject:** Your skincare routine is ready, {{subscriber.first_name || "gorgeous"}} ✨
**Preview:** Matched to your {{skin_type}} skin + {{skin_concern}} concern

```
Hey {{subscriber.first_name || "there"}}!

You just took the GlowGuide Skin Quiz — and we've matched you with a
routine built specifically for your skin.

Here's your personalized routine:

👉 [View Your Full Routine](https://yoursite.com/quiz/results?r={{routine_id}})

Quick recap of your profile:
• Skin type: {{skin_type}}
• Top concern: {{skin_concern}}
• Budget: {{budget}}

Your routine includes step-by-step product recommendations with
links to shop each one.

Questions? Just reply to this email — we read every one.

To glowing skin,
The GlowGuide Team
```

---

### Email 2 — Day 2: "Why {{concern}} Happens + What Actually Fixes It"

**Subject:** The real reason your skin {{concern_phrase}} (and what to do)
**Preview:** Plus the one ingredient that changes everything

```
Hey {{subscriber.first_name || "there"}},

A couple days ago you told us your biggest concern is {{skin_concern}}.

Here's what's actually going on beneath the surface — and why the
right products make such a dramatic difference.

[Insert 3-4 paragraphs of educational content about their specific concern]

The key ingredient for {{skin_concern}}:
[Name the star ingredient from their recommended routine]

This is exactly why we recommended [Product Name] in your routine —
it contains [ingredient] at an effective concentration.

👉 [See your full routine again](https://yoursite.com/quiz/results?r={{routine_id}})

To clearer days,
GlowGuide
```

---

### Email 3 — Day 5: "The #1 Mistake People With {{skin_type}} Skin Make"

**Subject:** Stop doing this to your {{skin_type}} skin 🚫
**Preview:** It's probably in your routine right now

```
Hey {{subscriber.first_name || "there"}},

The biggest mistake people with {{skin_type}} skin make?

[Insert specific mistake for their skin type, e.g.:
- Oily: Over-washing and skipping moisturizer (makes oil worse)
- Dry: Using hot water and harsh cleansers (destroys barrier)
- Sensitive: Layering too many actives at once (triggers reactions)
- Combination: Using the same products everywhere (wrong approach)]

Here's what to do instead:
[2-3 actionable tips]

Your recommended [Cleanser/Moisturizer name] is designed specifically
to avoid this problem because [reason].

👉 [Shop your recommended routine](https://yoursite.com/quiz/results?r={{routine_id}})

GlowGuide
```

---

### Email 4 — Day 10: "Real Results After 30 Days"

**Subject:** What happens after 30 days with the right routine
**Preview:** Before and after (the science behind it)

```
Hey {{subscriber.first_name || "there"}},

Wondering if a new routine actually makes a difference?

Here's what the research shows happens in the first 30 days:

Week 1: Your skin adjusts. You might notice slight changes in
texture as your new products start working.

Week 2: Active ingredients (like [their recommended treatment])
begin showing visible results. Pores look smaller, tone evens out.

Week 3-4: This is where the magic happens. Cell turnover has
completed a full cycle with your new products.

The key? Consistency. Your skin needs 28 days for a full cell
turnover cycle.

Ready to start your 30-day transformation?

👉 [Shop your personalized routine](https://yoursite.com/quiz/results?r={{routine_id}})

GlowGuide
```

---

## Sequence 2: Weekly Newsletter (Ongoing)

**Trigger:** After Sequence 1 completes (Day 14+)
**Frequency:** Weekly, same day each week

### Content rotation ideas (one per week):

1. "3 Skincare Ingredients That Actually Work (And 3 That Don't)"
2. "Morning vs. Night Routine: What Goes When"
3. "Seasonal Skincare: Adjusting Your Routine for [Current Season]"
4. "Product Spotlight: Why [Brand] [Product] Is Worth It"
5. "Skincare Myth Busted: [Common Myth]"
6. "The Order Matters: How to Layer Your Products"
7. "SPF 101: Why It's the Most Important Step"
8. "Ingredient Deep Dive: What Niacinamide Actually Does"

Each newsletter should include 1-2 affiliate product links naturally
embedded in the educational content.

---

## Kit Setup Checklist

1. Create a Form (use the Form ID in .env)
2. Create Custom Fields:
   - skin_type
   - skin_concern
   - sensitivity
   - age_range
   - routine_level
   - ingredient_pref
   - budget
   - routine_id
3. Create Tags for segmentation:
   - quiz-completer
   - skin-type-oily, skin-type-dry, etc.
   - concern-acne, concern-aging, etc.
4. Set up Visual Automations:
   - Trigger: Subscribes to form → Start Sequence 1
   - After Sequence 1 → Add to weekly newsletter
5. Enable double opt-in (recommended for deliverability)
