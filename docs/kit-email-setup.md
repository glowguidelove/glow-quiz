# Kit (ConvertKit) — email list setup & monetization

Quiz submissions POST to `/api/quiz/submit`, which adds the subscriber to **Kit** and fires **Meta CAPI** (hashed email only). This doc covers the email list side.

---

## 1. Create the Kit form & get IDs

1. Sign in at [Kit](https://kit.com) (formerly ConvertKit).
2. **Grow → Landing pages & forms** → create a form (e.g. “GlowGuide Quiz”).
3. Copy the form’s **numeric ID**: form settings or URL (`.../forms/123456/...` → `123456` is `KIT_FORM_ID`).  
   **Terminal:** from the project root, put `KIT_API_KEY` in `.env.local`, then run **`npm run kit:forms`** — it prints every form’s `id` and name.
4. **Settings → Advanced** → copy your **API key** (v3 uses the same key for `api_key` on form subscribe).

Email signups happen **only** through the quiz (`/api/quiz/submit` → Kit). There is no separate footer form.

**If subscribers don’t appear in Kit:** (1) Confirm **`KIT_API_KEY`** and **`KIT_FORM_ID`** on **Vercel** (Production) match the form you’re watching. (2) Custom field **keys** in Kit must exist — if the API rejects unknown fields, the app **retries with email only** so the contact should still land in Kit. (3) **Double opt-in** on the form can leave new signups **unconfirmed** until they click the email; check **Subscribers** / unconfirmed. (4) After a test, open the browser **Network** tab → **`submit`** response → **`kitSubscribed: true`** means Kit returned a subscription object.

---

## 2. Custom fields (required for personalization)

Kit only accepts field **keys** that already exist on your account. Create custom fields whose **keys** match exactly what the app sends:

| Key | Example value | Use |
|-----|----------------|-----|
| `skin_type` | `oily` | Segmentation, copy |
| `skin_concern` | `acne` | Sequences by concern |
| `sensitivity` | `somewhat` | |
| `age_range` | `25-34` | |
| `routine_level` | `multi-step` | |
| `ingredient_pref` | `clinical` | |
| `budget` | `30-75` | Upsell / drugstore vs luxury |
| `routine_id` | `oily-acne-clinical-budget` | Link back to results: `{{NEXT_PUBLIC_SITE_URL}}/quiz/results?r={{routine_id}}` |

In Kit: **Settings → Custom fields** → add each label; Kit generates keys (edit if needed to match the table).

---

## 3. Tags (segmentation for income-focused emails)

In `src/lib/kit.ts`, **`KIT_TAGS`** maps to numeric tag IDs. Create matching tags in Kit, then paste each ID (replace `0` = disabled).

- **`quizCompleter`** — everyone who finishes the quiz (master “warm” list).
- **`skinType*`** — one tag per skin type (oily, dry, combination, sensitive, normal).
- **`concern*`** — one tag per concern (acne, aging, dark-spots, redness, dullness).

**How to find tag IDs:** Kit → **Grow → Tags** → open a tag → ID in URL, or:

`GET https://api.convertkit.com/v3/tags?api_key=YOUR_API_KEY`

On each quiz submit, the API applies **quiz completer + skin + concern** tags (only IDs you configured).

**Monetization uses:**

- **Broadcasts** to `concernAcne` with acne-focused affiliate picks.
- **Automations** triggered by tag: e.g. “tagged acne → 5-day nurture with routine link + product education.”
- **Sponsored / affiliate** sends segmented by `budget` + `skin_concern` (from custom fields in liquid).

---

## 4. Environment variables (local + Vercel)

Copy from `.env.example`:

```bash
KIT_API_KEY=your_kit_api_key
KIT_FORM_ID=123456
```

- **Local:** `.env.local` (never commit).
- **Vercel:** Project → **Settings → Environment Variables** → add for Production (and Preview if you test real signups).

Without both variables, the API **skips Kit** (warns in server logs) but still returns success so users reach results.

---

## 5. Sequences & copy

See **`docs/email-sequences.md`** for drip templates. Use custom fields as `{{ subscriber.skin_type }}` etc. (exact syntax depends on Kit’s field keys).

Set **`NEXT_PUBLIC_SITE_URL`** to your live domain so links in emails match production.

---

## 6. Compliance

- Privacy copy is in **`src/app/privacy/page.tsx`** (Kit named as processor).
- Use Kit’s **double opt-in** on the form if you want confirmed subscribers (recommended in some regions).
- Every marketing email needs an unsubscribe link (Kit handles this on broadcasts/sequences).

---

## 7. Verify end-to-end

1. Deploy with `KIT_API_KEY` + `KIT_FORM_ID` set.
2. Complete the quiz with a **test email**.
3. In Kit → **Subscribers**, confirm the contact, custom fields, and tags.
4. Check Vercel **Functions** logs if subscription fails (Kit returns error body).

---

## Quick checklist

- [ ] `KIT_API_KEY` and `KIT_FORM_ID` in Vercel Production  
- [ ] Custom fields created with matching keys  
- [ ] Tags created; IDs filled into `KIT_TAGS` in `kit.ts`  
- [ ] Welcome or results sequence connected to form or tags  
- [ ] `NEXT_PUBLIC_SITE_URL` = live URL  
