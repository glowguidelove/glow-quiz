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

**Subject:** What’s really going on with your skin (and one ingredient that matters)

**Preview:** Practical science — matched to your quiz results

**Kit:** Send **2 days** after the previous email.

**Important:** Kit’s **Markdown / rich-text** editor often **does not run** pasted `{% … %}` Liquid (you’ll see **raw tags** in the inbox or only the `{% else %}` branch). **`{{ … }}` merge tags usually still work.** If branching keeps failing, use **Option B** below (no `{% %}` — only merge tags). That is the reliable path until Kit support confirms Liquid control flow in your template.

---

#### Option B — paste this if `{% case %}` fails (recommended for Kit)

One body, **no** Liquid logic — only `{{ }}`. The quiz value for concern appears as the slug (e.g. `redness`, `dark-spots`); that’s OK for v1.

```
Hey {{ subscriber.first_name | default: "there" }},

A couple of days ago you told us your top focus is **{{ subscriber.skin_concern }}** — here’s what’s going on **under the surface**, and why the *right* products move the needle faster than random tries.

---

### What’s really happening

Most skin goals come down to **barrier health**, **consistent actives** at sensible strengths, and **sun protection** — not a bathroom cabinet full of half-used products. Your quiz narrows the story to what you said matters most, and your GlowGuide routine turns that into **specific picks** (not generic “best sellers”).

---

### Where to look next

Your personalized routine spells out **which ingredients** we’re leaning on for *your* profile and why — at concentrations that are meant to do something, not just decorate a label.

**[See your full routine again →](https://glowguide.love/quiz/results?r={{ subscriber.routine_id }})**

---

**To clearer days,**  
GlowGuide
```

---

#### Option A — branching (try only if Option B is too generic)

Use **Kit’s personalization / @ menu** to insert conditionals when possible instead of pasting raw Liquid. Read **`docs/kit-email-setup.md`** §8.

This version uses **`subscriber.custom_fields.skin_concern`** (Kit’s documented path for custom fields) plus a fallback, then **one** `case`. Avoid adjacent `**` markdown that merges into `you:**Salicylic**` (that can confuse the editor). Put `{% assign %}`, `{% case %}`, and `{% endcase %}` each on their **own line**.

```
Hey {{ subscriber.first_name | default: "there" }},

A couple of days ago you told us what you’re focused on — here’s what’s going on **under the surface**, and why the *right* products move the needle so much faster than random tries.

---

### What’s really happening

{% assign quiz_concern = subscriber.custom_fields.skin_concern | default: subscriber.skin_concern | strip %}
{% case quiz_concern %}
{% when "acne" %}
Clogged pores + bacteria + oil production are the classic trio behind breakouts. Stress, hormones, and heavy occlusive products can tip you into new spots — even when you’re “doing everything right.”

The goal isn’t to wage war on your face daily; it’s to **clear congestion gently**, keep bacteria in check, and support your barrier so your skin can heal between flares. After a few consistent weeks, you’re usually looking for fewer new lesions, calmer texture, and less post-breakout staining.

The ingredient that matters for you: Salicylic acid (BHA) or niacinamide — depending on your routine — for congestion and oil balance without wrecking your barrier.

{% when "aging" %}
Fine lines and loss of firmness usually come from a mix of **collagen slowdown**, sun damage, and dehydration — not from “bad genes” alone. Skin can look older faster when the barrier is stressed or when actives are skipped in favor of heavy creams that don’t actually treat causes.

What “good” looks like: **smoother texture**, more even tone, and skin that feels bouncier — typically over several weeks as cell turnover and collagen support catch up. Consistency beats intensity; your routine is built around that idea.

The ingredient that matters for you: Retinoids or retinol (where appropriate) or peptides — your routine highlights what fits your sensitivity and goals.

{% when "dark-spots" %}
Dark marks are often **melanin** deposited after breakouts, sun, or irritation — not only “hyperpigmentation” in the abstract. Picking, friction, and UV without SPF can make spots linger for months.

Progress is real when you pair **sun protection** with ingredients that slow excess pigment and even tone — most people notice a shift in *patchiness* before spots vanish completely. Patience + the right actives beats harsh scrubbing.

The ingredient that matters for you: Niacinamide, vitamin C, or azelaic acid — chosen to target uneven tone without stripping.

{% when "redness" %}
Persistent redness is often a **barrier** and **reactivity** story — heat, harsh cleansers, strong acids, and even overwashing can keep you flushed. Sometimes there’s rosacea-style sensitivity; sometimes it’s simply a stripped barrier yelling for calm.

The win is skin that **stays calmer day to day** — less sting after products, less patchy flush, and texture that feels less “angry.” That usually comes from fewer triggers + barrier-friendly care, not from piling on new actives every night.

The ingredient that matters for you: Niacinamide, azelaic acid, or barrier-support ingredients — calm first, actives second.

{% when "dullness" %}
Dullness is usually **dead cell buildup**, uneven texture, dehydration, or a mix — so skin doesn’t reflect light evenly. It’s not always “lack of glow serum”; often it’s exfoliation balance + moisture + sun protection.

After a few weeks of the right rhythm, people usually see **brighter tone** and smoother makeup application — your skin looks more “lit from within” when the surface is even and hydrated.

The ingredient that matters for you: Gentle exfoliation (AHAs) or vitamin C — paired with hydration so skin looks bright, not stripped.

{% else %}
Everyone’s skin story is a little different — but almost always, progress comes from **consistent** steps matched to your goals, not from constantly swapping products. Your quiz results narrow that down for you.

The ingredient that matters for you: See the exact picks in your routine link below.

{% endcase %}

Your GlowGuide routine calls out **useful** concentrations — not label dressing. **[See your full routine again →](https://glowguide.love/quiz/results?r={{ subscriber.routine_id }})**

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
