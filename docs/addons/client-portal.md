---
title: Client Portal (Pro addon)
description: A branded self-service area where your clients view invoices, quotes, download PDFs, and accept or decline quotes — without an email exchange. Includes the Easy Invoice Account Gutenberg block.
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
- **Export their personal data** — when [Privacy & GDPR Tools](./privacy-tools) is also active
- **Delete their account** — when [Privacy & GDPR Tools](./privacy-tools) is also active

The last two buttons require the **Privacy & GDPR Tools** addon to be enabled. With Client Portal alone, those buttons are hidden — the canonical GDPR addon owns those data-subject features so there's a single source of truth.

## Shortcodes

The addon registers shortcodes you can drop into any page:

| Shortcode | What it renders |
|---|---|
| `[easy_invoice_profile]` | Logged-in client dashboard (invoices, quotes, profile, account actions) |
| `[easy_invoice_url]` | Signed URL to the current invoice — pairs with [Secure Links](./secure-links) |
| `[easy_quote_url]` | Signed URL to the current quote — pairs with [Secure Links](./secure-links) |

This lets you embed the portal anywhere — a dedicated page, a sidebar, a popup — and style it with your theme.

## Gutenberg block: Easy Invoice Account

For sites that build pages with the WordPress block editor, the addon also registers a native block:

- **Block name:** **Easy Invoice Account**
- **Category:** **Easy Invoice** (pinned to the top of the inserter)
- **What it does:** Wraps the `[easy_invoice_profile]` shortcode so you can drop the portal into any page without hand-typing a shortcode.
- **Block sidebar settings:**
  - *Redirect URL after login (optional)* — where to send the user after they sign in from this block
  - *Alignment* — Wide / Full width
  - *Spacing* — margin and padding controls
- **Editor preview:** uses WordPress's `ServerSideRender` so the editor preview matches the front-end exactly. Styles are enqueued on the block-editor screen automatically — no extra setup.
- **When to use the block vs. the shortcode:** Block — content built with Gutenberg or Site Editor. Shortcode — page builders, custom templates, classic editor.

## Branding

The portal templates inherit your theme's typography and colors. To go further, the [PDF Toolkit](./pdf-toolkit) addon lets you brand the PDFs clients download, and [White-Label](./white-label) (Agency tier) lets you rebrand the whole experience as your own product.

## Settings location

Client Portal settings appear under **Easy Invoice → Settings → Client Portal**. The **Privacy & GDPR** tab (separate from this section) is where the Privacy & GDPR Tools addon contributes its own settings — including the two self-service toggles (Allow Self-Service Data Export, Allow Self-Service Account Deletion) that affect what the portal's account screen shows.

If you enable Client Portal but **not** the Privacy & GDPR Tools addon, an admin notice points this out: the portal works fine without it, but the data-export / delete-account features stay hidden until you turn the GDPR addon on too.

## See also

- [Privacy & GDPR Tools](./privacy-tools) — required for the portal's data-export and delete-account buttons
- [Secure Links for Invoices & Quotes](./secure-links) — for unguessable invoice / quote URLs used by the portal
- [Email Enhancements](./email-enhancements) — for branded login & receipt emails
- [White-Label](./white-label) (Agency) — to rebrand the portal completely

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Client Portal is included free with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
