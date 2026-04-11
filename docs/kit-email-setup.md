# Kit (ConvertKit) — email list setup & monetization

Quiz submissions POST to `/api/quiz/submit`, which adds the subscriber to **Kit** (optional **first name** for `{{ subscriber.first_name }}` in emails) and fires **Meta CAPI** (hashed email only). This doc covers the email list side.

---

## 1. Create the Kit form & get IDs

1. Sign in at [Kit](https://kit.com) (formerly ConvertKit).
2. **Grow → Landing pages & forms** → create a form (e.g. “GlowGuide Quiz”).
3. Copy the form’s **numeric ID**: form settings or URL (`.../forms/123456/...` → `123456` is `KIT_FORM_ID`).  
   **Terminal:** from the project root, put `KIT_API_KEY` in `.env.local`, then run **`npm run kit:forms`** — it prints every form’s `id` and name.
4. **Settings → Advanced** → copy your **API key** (v3 uses the same key for `api_key` on form subscribe).

Email signups happen **only** through the quiz (`/api/quiz/submit` → Kit). There is no separate footer form.

**If subscribers don’t appear in Kit:** (1) Confirm **`KIT_API_KEY`** and **`KIT_FORM_ID`** on **Vercel** (Production) match the form you’re watching (no extra spaces; use the **public API key** from Kit account settings, not the secret-only flows). (2) You will **not** see `convertkit.com` in the browser Network tab — Kit is called **from Vercel**, not the browser. (3) Custom field **keys** in Kit must exist — if the API rejects them, the app **retries with email only**. (4) **Double opt-in** can leave signups **unconfirmed** until they click the email. (5) Inspect **`POST …/api/quiz/submit`** → Response: **`kitSubscribed: true`** or **`kitError`** (`missing_env`, `http`, etc.) and **`kitDetail`** when present.

---

## 2. Custom fields (required for personalization)

Kit only accepts field **keys** that already exist on your account. Create custom fields whose **keys** match exactly what the app sends:

| Key | Example value | Use |
|-----|----------------|-----|
| `skin_type` | `oily` | Segmentation, copy (slug) |
| `skin_type_label` | `Oily` | Human-readable skin type for emails (set by API) |
| `skin_concern` | `acne` | Sequences by concern (slug) |
| `skin_concern_label` | `Dark spots` | Human-readable concern for email copy (set by API) |
| `sensitivity` | `somewhat` | |
| `age_range` | `25-34` | |
| `routine_level` | `multi-step` | |
| `ingredient_pref` | `clinical` | |
| `budget` | `30-75` | Upsell / drugstore vs luxury |
| `routine_id` | `oily-acne-clinical-budget` | Link back to results: `{{NEXT_PUBLIC_SITE_URL}}/quiz/results?r={{routine_id}}` |

In Kit, custom fields are **account-wide** — you can create them from a **subscriber profile** (**+ Add field** under the name), while **editing a form**, or in some accounts under **Settings**. See Kit’s guide: [How to add Custom Fields to Subscribers](https://help.kit.com/en/articles/2502504-how-to-add-custom-fields-to-subscribers). After each field exists, **edit the field’s key** (if Kit shows it) so it matches the table **exactly** — the quiz API sends `skin_type`, `routine_id`, etc.; a mismatched key won’t populate.

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

### Newsletter plan ($0) — automation limits (verify on [Kit pricing](https://kit.com/pricing))

Kit’s **Newsletter** (free) tier is built for growth up to **10,000** subscribers but **caps automation**:

| On Newsletter (free) | Notes |
|----------------------|--------|
| **1 Sequence** | **Unlimited emails inside that sequence** — put your whole quiz drip (day 0, 2, 5, 10…) in **one** sequence. |
| **1 basic Visual Automation** | **Action-based** steps only; can connect to **that one** sequence. Entry examples: *joins form*, *added to tag*. No advanced branching (conditions/events) — those are **Creator+**. |
| **Broadcasts** | **Unlimited** — use for weekly one-off sends until you upgrade. |

**What to build on free (GlowGuide):**

1. **Single sequence** — e.g. “Quiz results + nurture” containing all emails from **`docs/email-sequences.md`** Sequence 1 (and optionally later “weeks” as delayed steps in the *same* sequence if you don’t want manual broadcasts yet).
2. **Single automation** — e.g. **Joins form “GlowGuide Quiz”** → **Add to sequence** (above). Optional extra step: **Add tag** (e.g. `quiz-completer`) if you still have tag budget in the UI.
3. **Weekly / ongoing content** — on free, run as **Broadcasts** to your full list or a segment, **or** upgrade to **Creator** for multiple sequences + full Visual Automations (rules, splits, RSS, etc.).

Official detail: [Visual Automations on the Newsletter Plan](https://help.kit.com/en/articles/9053626-visual-automations-on-the-newsletter-plan), [The Kit Newsletter Plan](https://help.kit.com/en/articles/9053602-the-kit-newsletter-plan).

### Different quiz results — one automation on free, branching inside the sequence

The quiz already sends **custom fields** (`skin_type`, `skin_concern`, `routine_id`, …) and optional **tags** (see `KIT_TAGS` in `src/lib/kit.ts`). That data is how you vary copy per person.

**Newsletter (free):** You only get **one** basic automation and **one** sequence. You **cannot** build “automation per result” as five separate visual flows. Do this instead:

1. **One automation:** **Joins a form** → choose **GlowGuide Quiz** → **Subscribe to sequence** → your single nurture sequence. (Optional second action: **Apply tag** if the UI allows in the same flow.)
2. **Different copy per result:** Edit each email **inside that sequence** and use **Liquid conditionals** on subscriber fields so the body changes by concern or skin type — still one sequence, one automation.

**Exact values** the app sends (match these in Liquid — typos break branches):

| Field | Values |
|--------|--------|
| `skin_concern` | `acne`, `aging`, `dark-spots`, `redness`, `dullness` |
| `skin_type` | `oily`, `dry`, `combination`, `sensitive`, `normal` |

Example (day-2 email — prefer `{% case %}` in Kit; see **`docs/email-sequences.md`** Email 2):

```liquid
{% case subscriber.skin_concern %}
{% when "acne" %}
<p>Your acne-specific education...</p>
{% when "aging" %}
<p>Your aging-specific education...</p>
{% when "dark-spots" %}
<p>...</p>
{% when "redness" %}
<p>...</p>
{% when "dullness" %}
<p>...</p>
{% else %}
<p>Fallback if field is empty.</p>
{% endcase %}
```

Use **HTML** paragraphs or **Markdown** sections per branch depending on what your Kit editor accepts. Test with subscribers who have each `skin_concern` value.

**If you truly want separate sequences** (e.g. one full drip for acne, another for aging): that requires **multiple sequences** and usually **multiple automations** (e.g. **Tag is added** → sequence X). That pattern fits **Creator** and up, not the free Newsletter cap. The app already applies **skin** and **concern** tags when `KIT_TAGS` IDs are set — after upgrading, you can wire **Tag is added → [matching sequence]** for each segment.

**“Custom field” as automation entry:** Kit may offer starting when a custom field is set. For GlowGuide, the quiz subscribes via the **form** in one step; fields arrive with the subscriber. **Joins a form** is still the simplest trigger — you don’t need a second automation per field.

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

## 8. Troubleshooting: Liquid (`else` branch, or raw `{%` tags in the inbox)

**Root cause (common):** Kit’s **sequence email editor** (Markdown / rich text) often **does not execute** pasted **`{% … %}`** Liquid control flow reliably. **`{{ … }}` merge tags** usually still work. Symptoms: **only** the `{% else %}` block shows, or **`{% when %}`, `{% endcase %}` appear as literal text** in the inbox. This is an editor/template limitation, not necessarily wrong subscriber data.

**Reliable fix:** Use **Email 2 Option B** in **`docs/email-sequences.md`** — **no** `{% %}` tags, only **`{{ subscriber.skin_concern }}`** and other merge tags. Branching copy is optional; ship Option B first.

**If you keep Option A (branching):**

1. Prefer **`subscriber.custom_fields.skin_concern`** with a fallback:  
   `{% assign quiz_concern = subscriber.custom_fields.skin_concern | default: subscriber.skin_concern | strip %}` then `{% case quiz_concern %}`. See **`docs/email-sequences.md`** Email 2 Option A.
2. **Do not** use two separate `case` blocks in one email.
3. Insert conditionals via Kit’s **@ / personalization** UI when available instead of pasting raw Liquid.

**If the generic fallback** (“everyone’s skin story…”) **still appears for everyone** (and you’re not seeing raw tags):

1. **Subscriber profile in Kit** — Open the contact → confirm **Skin concern** (field key `skin_concern`) is set to one of: `acne`, `aging`, `dark-spots`, `redness`, `dullness` (exact spelling; hyphen in `dark-spots`). If it’s blank, the quiz didn’t save fields: see (4) below.
2. **Preview / test email** — Use **Preview as subscriber** and pick someone who has custom fields filled.
3. **Custom field key** — The field in Kit must use the key **`skin_concern`** (same as the API).
4. **API subscribe failed silently** — If fields weren’t valid when the subscriber was created, `subscribeToKit` may have **retried email-only** (`src/lib/kit.ts`). Check Vercel logs for **`kitSubscribed: true`**.

**If raw Liquid** (`{% … %}`) **appears in the received email:** Switch to **Option B**, or paste with **paste without formatting** (Ctrl+Shift+V), one `case` block, `{% assign %}` / `{% case %}` / `{% endcase %}` each on its **own line**, and avoid broken markdown like `**you:**Salicylic**` (no space after colon inside bold).

**If random letters** show wrong colors or float above the line (broken typography): Kit’s editor often breaks when Markdown **bold** wraps **merge tags** (`{{ … }}`), or when bold and italic mix in one paragraph. **Don’t** wrap Liquid in bold; use plain merge tags and bold only fixed words. Re-paste from **`docs/email-sequences.md`** or strip formatting in Kit and re-apply bold manually.

---

## 9. Deliverability (avoid spam — before you publish the sequence)

**Why `@gmail.com` as the “From” address hurts:** Kit sends mail **from Kit’s infrastructure**, not from Google’s. Using a free **Gmail address** as the sender usually means **weak or misaligned authentication** (SPF/DKIM/DMARC don’t line up with `gmail.com` the way Google expects for bulk mail). Inboxes often **flag or spam-folder** that pattern. Gmail is also **not** intended as a bulk “from” identity for a brand.

**What to do instead:**

1. **Use an address on your own domain** (e.g. `hello@glowguide.love` or `hi@glowguide.love`). Same brand as your site builds trust with filters and subscribers.
2. **In Kit:** **Settings → Email / Sending** (wording varies) → set **default sending address** and **reply-to** to that domain address. Complete Kit’s **domain authentication** so you add the DNS records they give you (**SPF**, **DKIM**, often **DMARC**). Kit’s guide: search Kit Help for **“authenticate domain”** or **“DNS”** — follow their records exactly at your DNS host (where `glowguide.love` is managed).
3. **Wait for verification** — don’t blast the full sequence until Kit shows the domain **verified** / authenticated.
4. **Align the story:** Your quiz site, privacy policy, and “from” domain should match (you already use **glowguide.love** on the site). Avoid a totally different domain in the From line.
5. **Footer & compliance:** Kit adds unsubscribe; keep a **real physical address** in the footer (required in many regions). Use your business address, not a random placeholder.
6. **Optional:** A dedicated subdomain or mailbox (e.g. `newsletter@`) is fine; consistency matters more than the local part.

**Tests:** After DNS propagates, send **real** test emails to **Gmail**, **Outlook**, and **Apple Mail** and check **Promotions vs Primary vs Spam**. One test is not enough — inbox placement varies.

**When Kit shows “Verify your sending domain” (DNS table):**

1. **Open DNS where `glowguide.love` is managed** — the registrar (Namecheap, GoDaddy, etc.) or **Cloudflare** if the domain uses it for DNS. (Vercel-only projects sometimes use the registrar or Cloudflare for DNS — add records **there**, not inside the Vercel app UI unless that’s where DNS lives.)
2. **Create each row exactly as Kit lists** — same **Type** (CNAME / TXT), **Name / Host** (some panels want only `ckespa` or `cka._domainkey`; others auto-append your domain — follow your host’s docs), and **Value / Target** (full hostname Kit shows, e.g. `…convertkit.com`).
3. **Cloudflare:** Set these records to **DNS only** (grey cloud), not **Proxied** (orange), or mail authentication often breaks.
4. **Save** all records, wait **a few minutes to an hour** (sometimes longer). TTL affects propagation.
5. In Kit, click **Validate** (or refresh and validate). When it passes, the domain is verified for sending.
6. **Add a From address** like `hello@glowguide.love` under **Email addresses** and set it **Default**. Receiving mail at that inbox is optional (Workspace, forwarding, etc.); Kit only needs the address for **sending** identity once DNS is good.

If your host supports it, **Set this up for me** in Kit can connect the account and add records automatically — otherwise manual copy-paste is fine.

---

## Quick checklist

- [ ] `KIT_API_KEY` and `KIT_FORM_ID` in Vercel Production  
- [ ] Custom fields created with matching keys  
- [ ] Tags created; IDs filled into `KIT_TAGS` in `kit.ts`  
- [ ] One automation: **Joins GlowGuide Quiz form** → **subscribe to** your nurture sequence (free plan: only one); optional Liquid branches per `skin_concern` / `skin_type` inside sequence emails  
- [ ] `NEXT_PUBLIC_SITE_URL` = live URL  
- [ ] **Sending from** an address **@ your domain** (not `@gmail.com`); **DNS authenticated** in Kit (SPF/DKIM/DMARC per Kit’s instructions) before high-volume sends  
