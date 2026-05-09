---
title: Pro features overview
description: A guided tour of every Easy Invoice Pro module — gateways, recurring billing, partial payments, deposits, item library, template builder, custom permalinks, PDF & email enhancements, privacy & access.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span>This page is the <strong>guided tour</strong> of Easy Invoice Pro. For the <strong>flat catalog</strong> (one card per feature), see <a href="/features">All Pro features</a>.</span>
  <a class="doc-pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener">View pricing &amp; buy →</a>
</div>

# Pro features overview

Easy Invoice Pro is one plugin that adds about 20 modules to the free core. Activating Pro unlocks every module — there's no per-feature toggle on the website. Modules expose their settings under <span class="screen-path">Easy Invoice → Settings</span> as new tabs (PDF Options, Permalinks, Privacy &amp; Access, Email Options, Pro Settings, Translations).

## Payments

### Pro gateways

Eight new gateways unlock when Pro is active:

- **Stripe** — cards, Apple Pay, Google Pay, Link.
- **Square** — US/CA/UK/AU/JP processing.
- **Authorize.Net** — US AIM + CIM.
- **Mollie** — SEPA, iDEAL, Bancontact, card.
- **Bank Transfer** — display IBAN/SWIFT, mark paid manually.
- **Cheque** — show mailing address, mark paid on receipt.
- **Cash** — in-person, mark paid manually.
- **Moneris** — Canadian card processing.

Configure under <span class="screen-path">Settings → Payment</span>. See [Payment gateways](/payment-settings) for full setup.

### Partial payments

Let clients pay any amount toward an invoice. The remaining balance stays open and can be paid later via the same public link.

Set up under <span class="screen-path">Settings → Partial Payments</span>. See [Payments → Partial payments](/payments#partial-payments).

### Deposit invoices

Charge a deposit (e.g. 50% upfront) and bill the balance later. Multi-stage support (e.g. 30/40/30).

Set up under <span class="screen-path">Settings → Deposit Invoices</span>. See [Payments → Deposit invoices](/payments#deposit-invoices).

## Billing

### Recurring invoices

Generate the next invoice on a schedule (daily / weekly / monthly / yearly). Cron-driven, with stop conditions (after N invoices or by date).

See [Recurring & subscriptions](/recurring-invoices) for full setup.

### Subscription invoices

Recurring with auto-charge — the gateway charges automatically each cycle. Trial periods, setup fees, and cycle limits all supported.

Set up under <span class="screen-path">Settings → Subscription Invoices</span>.

## Productivity

### Item Library

Saved line items with default price, tax, description. Recall on any invoice — type two characters and the line autocompletes.

Open <span class="screen-path">Easy Invoice → Item Library</span> to manage. Storage: WP options key `easy_invoice_pro_saved_items`.

### Template Builder

Drag-drop builder for custom invoice and quote templates. Add header blocks, footer notes, accent colours, alternate row layouts.

Open <span class="screen-path">Easy Invoice → Template Builder</span>.

### Duplicate invoices &amp; quotes

A **Duplicate** button on every invoice / quote edit page. Clones every line, currency, client; status resets to draft. Useful for retainers and standardised projects.

### Receipt generation

When a payment completes, Pro can generate a separate **Receipt** document (independent from the invoice PDF). Action `easy_invoice_pro_receipt_generated` fires for extension.

### CSV export

Bulk export invoices, quotes, payments, or clients as CSV — handy for accounting tools or migrating to a new system. <span class="screen-path">Easy Invoice → All Invoices → Export</span>.

## Tax

### Additional tax

Stack multiple tax rates — useful for "GST + State Tax", "VAT + service charge", or multi-jurisdiction work.

Set up under <span class="screen-path">Settings → Tax → Additional tax</span> (visible only with Pro active).

## URLs

### Custom permalinks

Replace `/invoice/<slug>` with your own structure (e.g. `/billing/<slug>`). And **secure** mode hashes the slug so that random visitors can't brute-force invoice IDs.

Set up under <span class="screen-path">Settings → Permalinks</span>.

## Documents

### PDF Enhancements

Adds:

- Watermark text (e.g. **PAID** / **DRAFT** / **CONFIDENTIAL**).
- Per-template PDF options.
- Header / footer alignment.
- Custom font selection.

Set up under <span class="screen-path">Settings → PDF Options</span>.

### Email Enhancements

Adds:

- Per-template reply-to email.
- Brand-colour controls (header / button / accent).
- Invoice PDF as attachment.
- Partial payment receipt template.
- Recurring invoice notice template.
- Deposit invoice notice template.
- Full payment-reminder cadence (before / on / after due).

Set up under <span class="screen-path">Settings → Email Options</span>.

## Client portal

### Hosted portal

Self-service area where clients log in, see every invoice and quote, and download PDFs. Uses three shortcodes (`[easy_invoice_login]`, `[easy_invoice_profile]`, `[easy_invoice_client_login]`) you place on regular WP pages.

See [Clients & portal](/clients#the-portal-pro).

### Magic-link login

Tokenised login URL — append `?client_token=xxx` and the client is auto-logged in (single-use, expires).

## Security & privacy

### Privacy &amp; Access

Adds:

- **Login required** to view invoice URLs.
- **Token-based access** (hash-protected slugs).
- **GDPR exporter** — exports a client's invoices/quotes/payments via WordPress's Tools → Export Personal Data.
- **PDF download gating** — `easy_invoice_can_download_pdf` filter for fine-grained control.

Set up under <span class="screen-path">Settings → Privacy &amp; Access</span>.

## Branding & i18n

### Translations

Pro Translations submenu lets you customise every UI label (button text, status labels, table headers) without editing PHP. Strings flow into the standard WP translation pipeline.

Open <span class="screen-path">Easy Invoice → Pro Settings → Translations</span>.

### White label

PDF and email templates support custom logos, accent colours, and footer text. Combined with Email Enhancements, you can fully white-label outbound documents.

## License & updates

### License manager

Activate / deactivate / check license status. Pro updates only show up when license is **active**.

Open <span class="screen-path">Easy Invoice → License</span>. Daily license check via cron (`easy_invoice_pro_daily_license_check`).

## Plan tiers

Easy Invoice Pro is sold in three tiers — they all unlock the same feature set; they differ on **license seats** and **support priority**:

| Plan | Sites | Support | Annual price (USD) |
| --- | --- | --- | --- |
| **Personal** | 1 | Standard | _see [pricing](https://matrixaddons.com/plugins/easy-invoice/)_ |
| **Professional** | 5 | Priority | _see pricing_ |
| **Agency** | 25 | Priority + onboarding | _see pricing_ |

> The price IDs (`1`, `2`, `3`) on the EDD checkout map to Personal / Professional / Agency. The PHP code doesn't gate features per tier — every active license enables every Pro module.

## Where to go next

- 📋 [All Pro features](/features) — flat catalog of every Pro feature.
- 💳 [Payment gateways](/payment-settings) — gateway-specific setup.
- 🔁 [Recurring & subscriptions](/recurring-invoices) — schedule billing.
- ✉️ [Email & notifications](/email-settings) — Email Enhancements.
