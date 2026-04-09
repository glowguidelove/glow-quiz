# GlowGuide — Skincare Quiz Funnel

A personalized skincare quiz website that recommends products via affiliate links, driven by Facebook Ads and the Meta Pixel.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in your Meta Pixel ID, CAPI token, and Kit API key
npm run dev
```

## Architecture

- **Next.js 16** (App Router, TypeScript, Tailwind CSS)
- **Vercel** for hosting
- **Kit (ConvertKit)** for email capture and drip sequences
- **Meta Pixel + Conversions API** for tracking and retargeting

## Key Files

| File | Purpose |
|------|---------|
| `src/data/questions.ts` | Quiz questions and options |
| `src/data/products.ts` | Product recommendation database with affiliate links |
| `src/lib/scoring.ts` | Quiz answer → routine matching algorithm |
| `src/lib/pixel.ts` | Meta Pixel + CAPI helpers |
| `src/lib/kit.ts` | Kit (ConvertKit) API integration |
| `src/components/Quiz.tsx` | Main quiz component |
| `src/components/ResultsDisplay.tsx` | Personalized results page |
| `src/app/api/quiz/submit/route.ts` | Quiz submission API (Kit + CAPI) |
| `docs/email-sequences.md` | Email drip sequence templates for Kit |
| `docs/facebook-ads-guide.md` | Facebook Ads launch playbook |

## Environment Variables

```
NEXT_PUBLIC_META_PIXEL_ID=     # From Meta Events Manager
META_CONVERSIONS_API_TOKEN=    # From Meta Events Manager
KIT_API_KEY=                   # From Kit account settings
KIT_FORM_ID=                   # From Kit form setup
```

## Deploy to Vercel (production: glowguide.love)

### 1. GitHub

This project’s repo: **https://github.com/glowguidelove/glow-quiz**

The `origin` remote is configured with the **`glowguidelove`** username in the URL so Windows Git Credential Manager can store credentials separately from other GitHub accounts on this PC:

```text
https://glowguidelove@github.com/glowguidelove/glow-quiz.git
```

**First-time push (Windows, multiple GitHub accounts)**

1. Create a **Personal Access Token** while logged in as **glowguidelove**: GitHub → **Settings → Developer settings → Personal access tokens** → Fine-grained or classic with **repo** access.
2. In this folder, run `git push -u origin main`. When prompted:
   - **Username:** `glowguidelove`
   - **Password:** paste the **token** (not your GitHub password).
3. If Git still uses another account, open **Windows Credential Manager** → **Windows Credentials** → remove any `git:https://github.com` entries, then push again and sign in as **glowguidelove**.

New clone from scratch:

```bash
git clone https://github.com/glowguidelove/glow-quiz.git
cd glow-quiz
```

### 2. Vercel

1. Sign in at [vercel.com](https://vercel.com) and click **Add New Project**.
2. **Import** your GitHub repository. Framework Preset: **Next.js** (auto-detected).
3. **Root Directory:** leave default if the repo root is `glow-quiz`; if you put the app in a subfolder, set **Root Directory** to `glow-quiz`.
4. **Environment Variables** — add every variable from `.env.example` (including `NEXT_PUBLIC_SITE_URL=https://glowguide.love`). Use **Production** (and Preview if you want staging builds to have real keys).
5. Deploy.

### 3. Custom domain (Porkbun → Vercel)

1. In Vercel: **Project → Settings → Domains** → add `glowguide.love` and `www.glowguide.love`. Vercel will show the DNS records to create.
2. In [Porkbun](https://porkbun.com/account/domain): open **DNS Records** for `glowguide.love`.
3. Typical setup:
   - **Apex:** one **A** record for `@` pointing to Vercel’s IP (shown in Vercel), **or** use **ALIAS/ANAME** at apex if Porkbun offers it — many users point `@` to `76.76.21.21` (verify in Vercel’s domain UI; IPs can change).
   - **Recommended:** set **CNAME** for `www` to `cname.vercel-dns.com` (exact value shown in Vercel when you add the domain).
4. Wait for DNS (often minutes, up to 48 hours). Vercel issues HTTPS automatically once DNS verifies.

### 4. Meta Pixel / Kit

After the site loads on `https://glowguide.love`, add that URL in Meta Events Manager as your website domain if required, and use the same `NEXT_PUBLIC_SITE_URL` in production env vars.

## Customization

- **Add/edit products:** `src/data/products.ts` — swap affiliate URLs once approved
- **Change quiz questions:** `src/data/questions.ts`
- **Adjust matching logic:** `src/lib/scoring.ts` — modify tag weights
- **Add routine profiles:** Add new entries to `routineProfiles` array in products.ts
