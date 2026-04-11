# GlowGuide Email Sequences

Set these up in Kit (ConvertKit) as automated sequences.
Each sequence triggers based on quiz completion data stored as subscriber custom fields.

**Different quiz results:** On the **free Newsletter plan** you still use **one** form-triggered automation and **one** sequence — vary copy with **Liquid `{% if subscriber.skin_concern == '…' %}`** (and/or `skin_type`) inside each email. Separate automations per result need **Creator+**. See **`docs/kit-email-setup.md`** → *Different quiz results*.

**Kit Liquid:** Use `{{ subscriber.field_key }}` for custom fields (e.g. `{{ subscriber.routine_id }}`, `{{ subscriber.skin_type }}`). First name with a fallback:

`{{ subscriber.first_name | default: "there" }}`

Use the **`default`** filter (not `||`, which isn’t valid Liquid). The **pipe `|` is required** between `first_name` and `default`. If Kit merges the tag into `first_namedefault` after paste, the `|` was dropped — delete the tag and retype the `|` by hand. Match keys to **`docs/kit-email-setup.md`**.

**Markdown in Kit:** Subjects are plain text. Bodies below use Markdown (`**bold**`, lists, `---` dividers); paste into Kit’s Markdown-capable editor. **Colors:** Markdown doesn’t support hex — apply brand colors with Kit’s **Text color** tool using the table below (or template link color when available).

**Results links:** `https://glowguide.love/quiz/results?r={{ subscriber.routine_id }}` (or `www` if that’s your canonical domain everywhere).

**Branding (optional):** Matches `src/app/globals.css`. Use Kit’s **Text color** (and template link colors if available) lightly — email clients vary; contrast and readability come first.

| Use | Hex | Notes |
|-----|-----|--------|
| Body / most text | `#2D2D2D` | Warm charcoal — aligns with the site; softer than `#000000`. |
| Accent 1 (headings, one emphasis line) | `#D4849A` | Primary rose — use for **“Your routine is ready”**-style subheads or a short lead line, not whole paragraphs. |
| Accent 2 (alternate highlight) | `#C9A96E` | Gold — sparingly, e.g. one line or divider-adjacent text. |
| Links | `#B8647E` or `#D4849A` | If Kit’s default blue feels off-brand, set link color in the **email / template** settings when Kit exposes it; otherwise manual color on the CTA line only. |

Skip coloring every bullet and the footer — neutral body + **one** brand accent per section is enough.

---

## Sequence 1: Quiz Results Delivery (All subscribers)

**Trigger:** Immediately after quiz submission

### Email 1 — Instant: "Your Personalized Skincare Routine"

**Kit settings (this email):**

- **Send:** **Immediately** / **0 days** from when the subscriber enters the sequence — not “after 1 day.”
- **Published:** On when you go live.
- **Preview text:** Optional; use the line below in Kit’s preview field if available.

**Subject:** Your skincare routine is ready, {{ subscriber.first_name | default: "gorgeous" }} ✨

**Preview:** Matched to your {{ subscriber.skin_type }} skin · {{ subscriber.skin_concern }}

```
Hey {{ subscriber.first_name | default: "there" }},

You just took the **GlowGuide Skin Quiz** — we've matched you with a routine built for **your** skin, not a one-size-fits-all checklist.

---

### Your routine is ready

Step-by-step picks, honest notes on **why we chose each product**, and **shop links** on every step.

**[View your full routine →](https://glowguide.love/quiz/results?r={{ subscriber.routine_id }})**

---

### Your profile at a glance

- **Skin type:** {{ subscriber.skin_type }}
- **Top concern:** {{ subscriber.skin_concern }}
- **Budget:** {{ subscriber.budget }}

---

*Got a question?* Hit reply — a real human reads these.

**To glowing skin,**  
The GlowGuide Team
```

---

### Email 2 — Day 2: "Why their concern happens + what fixes it"

**Subject:** The real reason your {{ subscriber.skin_concern }} keeps showing up (and what helps)

**Preview:** Plus the one ingredient that changes everything

```
Hey {{ subscriber.first_name | default: "there" }},

A couple of days ago you said your biggest focus is **{{ subscriber.skin_concern }}**. Here’s what’s going on under the surface — and why the *right* products move the needle so much faster than random tries.

---

### What’s really happening

[Insert 3–4 short paragraphs of education tailored to **{{ subscriber.skin_concern }}** — root causes, what makes it flare, what “good” looks like after a few weeks.]

---

### The ingredient that matters for you

**Hero ingredient:** [Name the star ingredient from their recommended routine — e.g. niacinamide, retinoid, azelaic acid]

**Why we picked [Product name] for you:** it delivers that ingredient at a **useful** concentration — not label dressing.

**[See your full routine again →](https://glowguide.love/quiz/results?r={{ subscriber.routine_id }})**

---

**To clearer days,**  
GlowGuide
```

---

### Email 3 — Day 5: "The #1 mistake for their skin type"

**Subject:** Stop doing this to your {{ subscriber.skin_type }} skin 🚫

**Preview:** It might already be in your routine

```
Hey {{ subscriber.first_name | default: "there" }},

**{{ subscriber.skin_type }} skin** has a classic pitfall — most people don’t realize they’re making it worse.

---

### The mistake

[One clear mistake for **{{ subscriber.skin_type }}** — e.g. oily: stripping + skipping moisturizer; dry: hot water + harsh cleansers; sensitive: too many actives at once; combination: one texture everywhere.]

---

### Do this instead

- [Actionable tip 1]
- [Actionable tip 2]
- [Actionable tip 3]

**Your routine’s [cleanser / moisturizer / treatment]** is there to sidestep this: [one sentence — barrier support, oil balance, gentler actives, etc.].

**[Shop your recommended routine →](https://glowguide.love/quiz/results?r={{ subscriber.routine_id }})**

---

**GlowGuide**
```

---

### Email 4 — Day 10: "Real Results After 30 Days"

**Subject:** What actually happens in the first 30 days

**Preview:** The week-by-week timeline (no fluff)

```
Hey {{ subscriber.first_name | default: "there" }},

New routine — **does anything really change?** Here’s the honest week-by-week picture (and why patience beats panic-purchasing).

---

### Your first 30 days

**Week 1 — Adjustment**  
Texture and feel can shift first; a little purging or dryness can happen as skin recalibrates.

**Week 2 — Actives kick in**  
Ingredients like **[their recommended treatment / e.g. retinoid, exfoliant]** start to show up in clarity, tone, or congestion.

**Weeks 3–4 — Turnover catches up**  
Roughly **one full cell cycle** (~28 days) — this is where steady routines pull ahead of “I tried it twice.”

---

### The non-negotiable

**Consistency** beats intensity. Same routine, most days — that’s the win.

**[Open your personalized routine →](https://glowguide.love/quiz/results?r={{ subscriber.routine_id }})**

---

**GlowGuide**
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
