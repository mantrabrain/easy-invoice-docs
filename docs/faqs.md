---
title: FAQs
description: Frequently asked questions about Easy Invoice — Free vs Pro, PDF generation, currencies, taxes, GDPR, multisite, billing models, and gateway specifics.
---

# Frequently asked questions

## Getting started

### Is Easy Invoice really free?

Yes. The core plugin is GPLv2-or-later, lives on [WordPress.org](https://wordpress.org/plugins/easy-invoice/), and ships unlimited invoices, quotes, clients, PayPal, and a manual payment method out of the box.

### Do I need Easy Invoice Pro?

Get [Easy Invoice Pro](https://matrixaddons.com/plugins/easy-invoice/#pricing) if you need any of:

- **Pro payment gateways** — Stripe, Square, Mollie, Authorize.Net, Paystack, Moneris, Bank Transfer, Cheque, Cash
- **Personal-tier addons** (free with the Pro plugin, no license required): Recurring Invoices, Partial Payments & Deposits, Client Portal, PDF Toolkit, Bulk Email & Export, Item Library, Custom Invoice & Quote Templates, Additional Tax Lines, Email Enhancements, Privacy & GDPR Tools, Reports & Analytics
- **Professional tier** (with license): Time Tracking & Project Billing, Smart Reminders & Late Fees, Priority Support
- **Agency tier** (with license): White-Label, Team Members & Audit Log, Webhooks & Zapier

Otherwise the free plugin handles unlimited basic invoicing with PayPal and Manual payment methods.

### Does Personal-tier really come free with the Pro plugin?

Yes. Once you install Easy Invoice Pro, all 12 Personal-tier addons unlock automatically — no license key required. A license key only unlocks the higher Professional and Agency tiers. This is a deliberate design choice so you can buy Pro once and get the most-requested addons (recurring billing, client portal, secure links, reports, etc.) without any extra steps.

### Does Pro work without Free?

No. Easy Invoice Pro **requires the free plugin to be active**. Activating Pro without Free auto-deactivates Pro and shows an admin error.

### How do I turn an addon on or off?

Go to **Easy Invoice → Addons** in your WordPress admin. Each addon has a card with an **Activate** / **Deactivate** button. Toggle changes take effect on the next page load.

Disabled addons contribute zero PHP, zero database queries, and zero hooks to your site — so leaving an addon off has zero performance cost. Only turn on what you actually use.

### Will my existing Pro features break after the addon-system upgrade?

No. A one-time migration runs automatically on the next admin page load after you upgrade to Easy Invoice 2.3.0+. It auto-enables every addon for features you were already using, so nothing stops working. You can then customize what's enabled from **Easy Invoice → Addons**.

## Versions & compatibility

### What WordPress / PHP versions are required?

- WordPress **5.6+**.
- PHP **7.4+** (the bundled Composer manifest is stricter at 7.2; we use the readme value for documentation).

### Does Easy Invoice support multisite?

Yes — install network-wide and activate per site. Each site has its own settings, invoices, and license activation.

### Block editor / Gutenberg compatible?

Yes for general WordPress pages. Easy Invoice itself doesn't ship Gutenberg blocks — use the [shortcodes](/shortcodes) inside any block that supports shortcodes.

## Money & numbers

### Can I bill in multiple currencies?

Yes. Set a **default currency** under <span class="screen-path">Settings → Currency</span>, and override it per invoice/quote in the builder.

### Decimal precision and rounding?

Configurable from `0`–`4` decimals (default `2`). All math uses standard PHP arithmetic — there's no banker's rounding or currency-specific handling.

### Can I auto-apply tax based on the client's country?

The free plugin supports global tax + per-line taxable. **Pro's Additional Tax** module adds rule-based stacking (e.g. State + Federal). For full automatic tax (TaxJar / Avalara), use a separate WordPress plugin alongside Easy Invoice — it'll write its result into the invoice tax field.

### Year-restart numbering (e.g. INV-2026-0001)?

Bake the year into the prefix manually each January and reset the next number to `1`. The free plugin doesn't auto-restart per year.

## PDFs

### Why is the PDF generated in the browser?

Easy Invoice uses **client-side jsPDF + html2canvas** (`includes/Helpers/PdfHelper.php:78–86`) instead of server-side libraries (Dompdf, mPDF). Pros: no shared-host PHP memory issues, no font shipping, immediate rendering. Cons: very-long invoices (50+ line items) can be slow on weak machines.

### Can I attach the PDF to the invoice email?

<span class="doc-pro-pill">Pro</span> Email Enhancements adds an "Attach invoice PDF" toggle per template. The free plugin sends the email with a link only.

### Can I add a watermark to the PDF?

<span class="doc-pro-pill">Pro</span> PDF Enhancements adds watermarks ("PAID" / "DRAFT" / custom text), font selection, and per-template options. <span class="screen-path">Settings → PDF Options</span>.

## Stripe / SCA / 3-D Secure

### Does Stripe support SCA / 3-D Secure?

Yes — Pro uses Stripe **Payment Intents**, which automatically trigger 3-D Secure when the issuer requires it. No extra config needed.

### What about Apple Pay / Google Pay?

Stripe Payment Element supports both. They appear automatically on supported devices.

### Stripe shows up but redirects don't return to my invoice

Check that your **site URL** matches across **WordPress** (Settings → General) and your **Stripe** dashboard. Mismatches send the redirect to the wrong host.

## Quotes

### Can the client e-sign the quote?

There's no built-in e-signature field. Use a separate plugin (DocuSign, WP eSignature) for legally-binding signatures — embed its shortcode under the quote line items via a custom template or hook.

### Can I require approval before generating the invoice?

The accepted-quote → invoice conversion is **manual** — the new invoice starts as draft so you can tweak before sending. There's no auto-conversion in the current build.

## Recurring billing

### Free vs Pro: which does what?

- **Free**: one-shot invoices only.
- **Pro**: recurring invoices (manual pay each cycle) **and** subscription invoices (auto-charge via Stripe / Mollie).

### Why do I sometimes see two invoices generated for the same template?

Pro defines **two recurring subsystems** (`RecurringInvoices` extension + `RecurringInvoiceController`). Both are usually wired in production. If you see duplicates, disable one via custom code or contact support.

## Client portal

### Where do I put the portal pages?

Create three regular WordPress pages and drop in the shortcodes:

- `/client-area/login` → `[easy_invoice_login]`
- `/client-area/profile` → `[easy_invoice_profile]`
- `/client-area/invoices` → list (auto-rendered when logged in via Pro)

See [Clients & portal](/clients).

### Can clients pay an invoice from the portal?

Yes — the invoice list shows a **Pay now** button on every unpaid invoice; it routes to the configured gateway.

## GDPR & privacy

### Does Easy Invoice store credit-card data?

No. All cards go through the gateway (Stripe / Square / etc.). Easy Invoice only stores the **transaction ID** and **last four digits** on the Payment record (when the gateway returns them).

### How do I export a client's data?

<span class="doc-pro-pill">Pro</span> Privacy & Access registers the WordPress GDPR exporter — open <span class="screen-path">Tools → Export Personal Data</span> and enter the client's email. You'll get a JSON of their invoices, quotes, payments.

### Can I delete a client's data?

Yes — the same Privacy & Access module registers the **eraser**. Tools → Erase Personal Data. **Note**: this removes personal fields but keeps invoice records (anonymised) for accounting compliance.

### Does Easy Invoice send anything to MatrixAddons / external servers?

Only:

- **License activation** to `https://store.mantrabrain.com/edd-sl-api/?` (license key + site URL only).
- **Update checks** via the same endpoint.

There is **no usage analytics or telemetry** beyond licensing.

## Gateways

### Can I use both PayPal and Stripe at once?

Yes. Each enabled gateway becomes a row on the public invoice page; the client picks one.

### A gateway shows in settings but not on the public invoice

Three causes:

1. The gateway is enabled but not configured (missing API key / credential).
2. The currency you chose isn't supported by that gateway.
3. The Pro license is expired (some gateways gate on active license).

See [Troubleshooting](/troubleshooting#gateway-not-showing-on-public-invoice).

### Can I refund through Easy Invoice?

Refunds are **two-step** by design: issue the refund in the gateway's own dashboard (Stripe / PayPal / etc.), then mark the matching Payment record as **Refunded** in Easy Invoice. The invoice's payment status recomputes automatically.

## Reports & exports

### How are reports generated?

`Easy Invoice → Reports` queries `easy_invoice_payment` and `easy_invoice` posts and renders Chart.js charts client-side. No data is sent off-site.

### Can I export to QuickBooks / Xero?

<span class="doc-pro-pill">Pro</span> CSV export creates a spreadsheet you can import into most accounting tools. There's no direct API integration; for that, write a custom hook against `easy_invoice_payment_completed`.

## Migrations

### Can I import from another invoicing plugin?

There's no general-purpose import wizard. Migration paths in active use:

- **From WP-Invoice / Sliced Invoices**: write a custom migration script using the source plugin's CPTs and Easy Invoice's `Invoice::save()` API.
- **From CSV**: use **WP All Import** with a custom field map.

The MatrixAddons team does paid migrations on the **Agency** plan.

### Can I move from Free → Pro without losing data?

Yes. Activating Pro doesn't touch the free plugin's data — every invoice, quote, payment, and client stays exactly as-is. Pro just adds new menus and tabs.

## Where to go next

- 🛠️ [Troubleshooting](/troubleshooting) — fixes for common issues.
- 💎 [Pro features](/features) — full Pro catalog.
- 💬 [Get support](/support) — how to reach us.
