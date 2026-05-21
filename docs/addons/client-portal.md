---
title: Client Portal (Pro addon)
description: A branded self-service area where your clients view invoices, quotes, download PDFs, and accept or decline quotes — without an email exchange.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included free with Easy Invoice Pro — no license key required. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Client Portal
Stop the back-and-forth email asking for old invoices. Clients log in to a branded portal where they can view every invoice and quote, download PDF receipts, see payment history, and accept or decline quotes — all on their own time.

![Client list — every client gets a self-service portal once activated](/screenshots/27-clients-list.png)

## When to use it

- Your clients repeatedly ask "can you resend last month's invoice?"
- You send quotes that need accept/decline tracking
- You want a professional, branded experience instead of bare WordPress login
- You handle multiple invoices per client and a single threaded inbox makes it hard for them to find what they need

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Client Portal**
3. Click **Activate**

The portal pages become available on your frontend immediately. The addon registers three template routes:

- `/easy-invoice-portal/login/` — client login screen
- `/easy-invoice-portal/invoice/{id}/` — single invoice view (auth required)
- `/easy-invoice-portal/receipt/{id}/` — single receipt view (auth required)

You can override the slugs from **Easy Invoice → Settings** (Client Portal section).

## What clients can do

- **View all their invoices** — paid, partially paid, overdue, draft
- **Download PDF** of any document
- **See payment history** with timestamps and amounts
- **Accept or decline quotes** with one click (quotes are auto-converted to invoices on accept)
- **Make a payment** through any configured gateway
- **Update their own profile** (name, email, address) — no admin intervention needed
- **Export their personal data** (GDPR compliance — works with the [Privacy & GDPR addon](./privacy-tools))
- **Delete their account** (if you enable that setting)

## Shortcodes

The addon registers shortcodes you can drop into any page:

| Shortcode | What it renders |
|---|---|
| `[easy_invoice_client_login]` | Login form |
| `[easy_invoice_client_dashboard]` | Logged-in client dashboard with their invoices and quotes |
| `[easy_invoice_client_invoice_list]` | Just the invoice list |
| `[easy_invoice_client_quote_list]` | Just the quote list |

This lets you embed the portal anywhere — a dedicated page, a sidebar, a popup — and style it with your theme.

## Branding

The portal templates inherit your theme's typography and colors. To go further, the [PDF Toolkit](./pdf-toolkit) addon lets you brand the PDFs clients download, and [White-Label](./white-label) (Agency tier) lets you rebrand the whole experience as your own product.

## Settings location

Client Portal settings appear as a section on **Easy Invoice → Settings**. There's no separate admin page for the portal — the configuration is all in one place.

## See also

- [Privacy & GDPR Tools](./privacy-tools) — for client-initiated data export / deletion
- [Email Enhancements](./email-enhancements) — for branded login & receipt emails
- [White-Label](./white-label) (Agency) — to rebrand the portal completely

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Client Portal is included free with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
