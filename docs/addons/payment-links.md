---
title: Payment Links & QR Codes (Pro addon)
description: A link, or a QR code, that takes money for a fixed or open amount — an invoice is created for the payer on the spot, so everything else in Easy Invoice sees an ordinary payment.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included with every Easy Invoice Pro licence. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Payment Links & QR Codes

Not every payment starts with an invoice. A deposit at a consultation, a fee mentioned in an email, a tip jar at the counter — you want a link or a QR code that just takes the money. This addon makes those, and behind each one it still produces a proper invoice.

## What you get

- **Links for a fixed amount** ("Consultation deposit, $150") or an **open amount** where the payer types what to pay, with a minimum you set.
- **A printable QR code** for each link — put it on a counter card, a flyer, a slide.
- **An invoice per payment.** The payer enters their name and email; an invoice is created for them (and a client record, if new) and they land on its payment panel. Every gateway you have enabled works, receipts go out, and the client record, reports and accounting sync all see an ordinary invoice.
- **Collected total per link**, and links can be switched off — an inactive link answers 404.

## Enabling

1. Open **Easy Invoice → Addons** and activate **Payment Links & QR Codes**
2. Open **Payment Links** in the sidebar
3. **Add a link**: a title, the text shown to the payer, fixed or open amount (with a minimum for open), currency, the line-item name that goes on the invoice, and whether tax applies

The link's address is `https://your-site/pay/{key}` — the key is random and unguessable. Copy the URL or click **QR** to show and print the code.

## What the payer sees

A short page with your logo, the title and text, the amount (or an amount box), and three fields — name, email and an optional reference. Submitting takes them straight to the invoice's payment panel, already open. There is no account and no password.

## Overriding the page

Copy the addon's `views/page.php` to `{your-theme}/easy-invoice/payment-link.php` to restyle it; the same override chain as every other Easy Invoice template applies.

## For developers

| Hook | Type | Purpose |
|---|---|---|
| `easy_invoice_paylink_invoice_data` | filter | Change the invoice data before it is created (`$data`, `$settings`, `$link`) |
| `easy_invoice_paylink_invoice_created` | action | After the invoice exists (`$invoice_id`, `$link`) |

Invoices created this way carry `_easy_invoice_paylink_id` and show **Via link** on the invoice row. Links are `easy_invoice_paylink` posts with `_ei_paylink_*` meta.
