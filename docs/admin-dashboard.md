---
title: Your WordPress admin
description: A plain-English map of the Easy Invoice WordPress admin sidebar — every menu item, what it does, and the corresponding docs page.
---

# Your WordPress admin

After activating Easy Invoice, a top-level **Easy Invoice** menu appears in the WordPress sidebar. Click any item below for the matching docs page.

| Sidebar label | What it does | Docs |
| --- | --- | --- |
| **Easy Invoice → Dashboard** | Overview cards (revenue, invoices sent, paid, overdue, recent activity). | This page |
| **All Invoices** | List of every invoice with filters (status, client, date), bulk actions. | [Invoices](/invoices) |
| **Add New** | Invoice builder. Hidden parent slug `easy-invoice-builder`. | [Invoices](/invoices) |
| **All Quotes** | List of every quote with filters and bulk actions. | [Quotes / estimates](/quotes) |
| **Add New Quote** | Quote builder (similar to invoice builder, no payment fields). | [Quotes / estimates](/quotes) |
| **Payments** | Hidden submenu: list of payment records (link, status, gateway, amount, refunded). | [Payments](/payments) |
| **Add New Payment** | Manually record a payment against an invoice — useful for cash / wire / offline. | [Payments](/payments) |
| **All Clients** | Client list — WordPress users in the `easy_invoice_client` role + admins with invoices. | [Clients & portal](/clients) |
| **Item Library** <span class="pro-pill">PRO</span> | Saved line items with default price, tax, description — recall on any invoice. | [Pro features](/features#item-library) |
| **Template Builder** <span class="pro-pill">PRO</span> | Drag-drop builder for custom invoice / quote templates. | [Pro features](/features#template-builder) |
| **Reports** | Revenue, status breakdown, payment methods, period filters. Chart.js. | [Quick start §10](/quick-start#10-check-reports) |
| **Settings** | The settings hub: Company, Invoice, Quote, Currency, Tax, Payment, Email, Text, Advanced. Pro adds PDF Options, Permalinks, Privacy & Access. | All "Configure" docs |
| **License** | Pro license activation, deactivation, status check. | [Installation §2](/installation#activate-your-pro-license) |
| **Free vs Pro** | Marketing comparison page (free only). | [Pro features overview](/third-party-integrations) |
| **Pro Settings** <span class="pro-pill">PRO</span> | Pro-only settings (Translations submenu). | [Pro features](/features) |
| **Translations** <span class="pro-pill">PRO</span> | Customize labels for invoice/quote UI text. | [Pro features](/features#translations) |
| **Join Community** | Opens the MatrixAddons Facebook group in a new tab. | — |

## How the menus interact with each other

```
Easy Invoice (top)
├─ Dashboard           — read-only overview
├─ All Invoices        ─┬─ Add New (hidden parent)
├─ All Quotes          ─┴─ Add New Quote
├─ Payments (hidden)
├─ Add New Payment
├─ All Clients
├─ Item Library        [Pro]
├─ Template Builder    [Pro]
├─ Reports             — charts only
├─ Settings            — many tabs
├─ License             — Pro key
├─ Free vs Pro         (free only)
├─ Pro Settings        [Pro] ─── Translations [Pro]
└─ Join Community      — Facebook
```

## Capabilities (who can see what)

| Menu | Required capability | Note |
| --- | --- | --- |
| Top-level menu | `manage_options` | Admins only by default |
| All Clients | `edit_posts` | Editors can view/edit clients |
| Reports / Settings / License | `manage_options` | Admins only |
| Join Community | `read` | Any logged-in user |

> The **Easy Invoice Client** role exists separately for the Pro client portal — see [Clients & portal](/clients#client-role).

## Where next

- 🚀 [Quick start](/quick-start) — your first invoice.
- 🧾 [Invoices](/invoices) — invoice builder details.
- 💳 [Payment gateways](/payment-settings) — connect Stripe, PayPal, etc.
