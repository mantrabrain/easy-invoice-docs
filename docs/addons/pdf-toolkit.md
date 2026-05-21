---
title: PDF Toolkit (Pro addon)
description: Customise every detail of your invoice and quote PDFs — watermarks (PAID / DRAFT / OVERDUE), custom headers, footers, color and font controls, and per-document branding.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included free with Easy Invoice Pro — no license key required. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# PDF Toolkit

The free Easy Invoice plugin generates clean, functional PDFs — but they look like stock WordPress. If you're sending invoices to clients who expect polish (enterprise customers, agency clients, finance teams), or you're white-labelling Easy Invoice as your own product, you need more control: a "PAID" watermark, your logo at 30% opacity over the page, a custom color for status badges, a footer with your registration number.

The **PDF Toolkit** addon adds all of that on top of the standard PDF engine, configured from your settings page. No template editing, no PHP code.

## Plain-English problem this solves

A client says "wait, is this invoice paid or do I still owe you?" Or your accountant gets confused looking at a draft invoice they thought was final. Or you just don't want the PDF to look like a generic WordPress plugin made it.

This addon lets you stamp **PAID** in big translucent letters across paid invoices, **OVERDUE** in red across late ones, **DRAFT** in grey across unsent ones — and the same for quotes. It's the kind of small touch that screams "we have our act together".

## When you need this

- **B2B service businesses** where the PDF is the only document the client sees from you.
- **Agencies** rebranding the plugin (pairs perfectly with the [White-Label addon](./white-label)).
- **Anyone with strict visual branding** — your color palette, your fonts, your imagery on the page.
- **Compliance / audit-sensitive workflows** — a clear DRAFT or VOID stamp prevents an accidentally-sent draft from being treated as a real invoice.

If you only ever send invoices to one or two regular clients who don't care what the PDF looks like, you can skip this addon.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **PDF Toolkit**
3. Click **Activate**

Settings appear on **Easy Invoice → Settings**, in the **PDF Customization** section. Settings are split into two sub-sections: **Invoice PDF** and **Quote PDF** — each with its own watermark options.

## Watermark settings — invoices

These configure the stamp that appears across the body of every **invoice PDF**.

### Watermark Type (invoice)

**What it does:** Picks which kind of watermark to render. Four options:

| Type | What it does | Best for |
|---|---|---|
| **None** | No watermark | Default — clean PDFs |
| **Status text** | Auto-stamps the invoice's status: `PAID`, `OVERDUE`, `DRAFT`, `VOID` | Most users — zero configuration once enabled |
| **Custom text** | A fixed phrase you choose (e.g. your company name, "CONFIDENTIAL", "ORIGINAL") | Branding or one-off compliance needs |
| **Image** | An uploaded logo or stamp graphic | Premium branding — your logo translucently over the page |

**Recommended:** Status text. It updates automatically as the invoice's status changes, no manual work.

### Watermark Text (invoice)

**What it does:** The custom phrase to stamp. Only matters if **Watermark Type** is set to **Custom text**.

**Examples:** `CONFIDENTIAL`, `ORIGINAL`, `COPY`, `YOUR COMPANY NAME`, `INVOICE-2025`

**Plain-English:** Whatever you type here is splashed diagonally across the page in big translucent letters. Keep it short — long phrases look cramped.

**Leave it empty** if you want the addon to fall back to the invoice's status (PAID/OVERDUE/DRAFT).

### Watermark Color (invoice)

**What it does:** The color of the watermark text or status stamp. Use the color picker or paste a hex code.

**Defaults that work:**
- **Light grey** (`#D1D5DB`) — subtle, professional, never competes with content.
- **Light red** (`#FCA5A5`) — good for OVERDUE/CONFIDENTIAL stamps when you want urgency.
- **Light green** (`#86EFAC`) — pleasant for PAID stamps in a celebratory tone.

**Avoid:** dark, fully-saturated colors (they make the body text unreadable underneath).

**Note:** When **Watermark Type** is **Status text**, this color is overridden — the addon picks the color based on status (green for PAID, red for OVERDUE, grey for DRAFT, dark grey for VOID).

### Watermark Image (invoice)

**What it does:** Upload an image (PNG or JPG) to stamp instead of text. Common uses: your company logo, a custom rubber-stamp graphic, a certification mark.

**Recommendations:**
- **PNG with transparency** works best — the rest of the page shows through.
- **Square or roughly square** images render best (the watermark is centered).
- Keep the source image at least 600×600 pixels for sharpness; the addon scales it down to fit.

### Watermark Size (invoice)

**What it does:** How big the image watermark appears on the page, in pixels.

**Default:** 200 px.

**Examples:**
- `150` — a discreet stamp in the middle of the page.
- `300` — a prominent "logo across the body" effect.
- `500` — fills most of the page (rarely flattering).

**Plain-English:** Bigger means the watermark dominates more of the page. Start with the default 200 and adjust if it looks too small or too big in practice.

### Watermark Opacity (invoice)

**What it does:** How translucent the watermark is, as a percentage. Lower = more see-through, higher = more solid.

**Default:** 10–15% (subtle).

**Recommended ranges:**
- **5–15%** — barely-there ghost stamp (best for clean professional PDFs).
- **20–35%** — visible but readable through.
- **40–60%** — bold, can't-miss it (use for VOID or DRAFT to prevent mistakes).
- **70%+** — heavy enough to obscure body text in places; only use if the watermark IS the focus.

**Plain-English:** Think of it like a sticker's stickiness. Low opacity = thin film. High opacity = solid stamp. Most professional invoices use 10–20%.

## Watermark settings — quotes

Every setting above repeats for **quote PDFs** with one difference: the **Watermark Type → Status text** option stamps the quote's status (`DRAFT`, `SENT`, `ACCEPTED`, `DECLINED`, `EXPIRED`, `CONVERTED`) instead of the invoice statuses.

Configure them separately if you want different visual treatment for quotes versus invoices — a common pattern is:

- **Invoices** — Status text watermark (so PAID/OVERDUE shows automatically).
- **Quotes** — Image watermark with your logo at 10% opacity (so every quote feels brand-consistent before status matters).

## Pairs well with

- [White-Label & Brand Override](./white-label) — Combine PDF watermarks with full plugin rebranding for a top-to-bottom "your company" experience.
- [Custom Invoice & Quote Templates](./custom-templates) — The visual template builder controls the *layout* of the page; PDF Toolkit controls the *overlay* (watermark) on top of that layout.
- [Secure Links for Invoices & Quotes](./secure-links) — When you email a PAID-watermarked PDF, the link to the invoice page also shows the up-to-date status.

## Troubleshooting

**"My watermark isn't appearing on the PDF"**
- Confirm the addon is **Active** in **Easy Invoice → Addons**.
- Confirm **Watermark Type** is set to something other than **None**.
- If using **Custom text**, ensure **Watermark Text** is not empty.
- If using **Image**, ensure an image has been uploaded.
- Regenerate the PDF — the watermark is applied at render time, not stored on the invoice.

**"The watermark is too dark / unreadable through"**
Lower the **Watermark Opacity**. Try 10%, then go up in 5% steps until it looks right.

**"My uploaded image looks blurry"**
Upload a higher-resolution source. PDFs are typically rendered at 150–200 DPI; an image less than ~600 px wide will visibly pixelate when scaled up.

**"PAID watermark isn't appearing on paid invoices"**
- Confirm **Watermark Type** is set to **Status text** (not **Custom text** or **None**).
- Confirm the invoice's status is actually `paid` — open it in **Easy Invoice → Invoices** and look at the status badge.

**"I want different watermarks for different clients"**
Per-client watermark configuration isn't built in. As a workaround, use the **Custom Invoice & Quote Templates** addon to assign different template designs per client, then change the global watermark when switching to that client's preferred layout. For most users, the auto-status watermark is fine across all clients.

## Settings location

All PDF Toolkit settings live on **Easy Invoice → Settings**, in the **PDF Customization** section. There are two sub-sections — **Invoice PDF** and **Quote PDF** — with identical fields.

## See also

- [Settings reference](../settings-reference)
- [White-Label & Brand Override](./white-label)
- [Custom Invoice & Quote Templates](./custom-templates)

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>PDF Toolkit is included free with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
