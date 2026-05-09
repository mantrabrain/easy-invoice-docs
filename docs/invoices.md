---
title: Invoices
description: Build, send, and track invoices in Easy Invoice — the builder, line items, taxes, discounts, status flow, numbering, multi-currency, and client-side PDF export.
---

# Invoices

The invoice is the core unit of Easy Invoice. Every list, report, payment, and email is anchored to an invoice. This page walks the entire builder, all the meta you can set, the status flow, and how PDFs work.

## What an invoice _is_, technically

- **Custom post type:** `easy_invoice` (registered in `includes/EasyInvoice.php:281–311`).
- **Public**: yes (visitors can open the public invoice URL).
- **Admin UI**: hidden — Easy Invoice ships its own admin pages instead of standard WP edit screens.
- **Slug**: `invoice/<post-slug>`.
- **Capabilities**: `manage_options` to edit (admins), separate role for portal viewing.

## Status flow

WordPress core post status + Easy Invoice payment status (meta key `_payment_status`):

| Stage | Post status | Payment status (meta) | Triggered by |
| --- | --- | --- | --- |
| **Draft** | `draft` | `unpaid` | Save without sending |
| **Sent** | `publish` | `unpaid` | _Send to Client_ button |
| **Pending bank** | `pending-bank` | `pending-bank` | Bank Transfer gateway (Pro) |
| **Pending cheque** | `pending-cheque` | `pending-cheque` | Cheque gateway (Pro) |
| **Paid** | `publish` | `completed` (or `paid`) | Manual mark or successful gateway return |
| **Refunded** | `publish` | `refunded` | Mark refunded on the related Payment |
| **Overdue** | `publish` | `unpaid` + due date past | Derived in UI / reports |
| **Cancelled** | `private` | `cancelled` | Manual via builder |

> "Overdue" isn't a CPT status — it's computed each render from the due date. This means overdue badges update without a cron run.

## The invoice builder

Open <span class="screen-path">Easy Invoice → Add New</span>.

### Header

- **Invoice number** — auto-incremented from <span class="screen-path">Settings → Invoice → Next invoice number</span>. Override per invoice if you need to.
- **Client** — start typing to search WP users; click _+ Add new_ to create one.
- **Invoice date** — defaults to today.
- **Due date** — defaults to today + N days from settings.
- **Status badge** — inline, shows current state.

### Line items

Each line has:

- **Item** — title (autocomplete from <span class="doc-pro-pill">Pro</span> Item Library when active).
- **Description** — multi-line, printed on the invoice.
- **Quantity** — decimals supported.
- **Unit price** — currency-formatted.
- **Tax** (per line, when "Item" tax method is selected).
- **Discount** (per line, when enabled).
- **Total** — auto-computed, read-only.

> Reorder lines by drag handle. Delete with the trash icon.

### Totals

| Field | What it is |
| --- | --- |
| **Subtotal** | Sum of (qty × price) for every line, before discount/tax. |
| **Discount** | Either a flat amount or a percentage; before- or after-tax depending on settings. |
| **Tax** | Per-line or single bottom rate, depending on `Tax entry method`. |
| **Total** | Final amount the client owes. |
| **Amount paid** | Aggregated from related Payment posts. |
| **Balance due** | Total − amount paid. |

> The `easy_invoice_invoice_total` filter (`includes/Models/Invoice.php:914`) lets you re-derive totals — useful for B2B with negotiated lines.

### Currency

Per-invoice currency override field (defaults to <span class="screen-path">Settings → Currency</span>). Useful for multi-currency operators who bill some clients in EUR and others in USD.

### Notes

- **Customer notes** — printed at the bottom of the invoice (visible to the client).
- **Private notes** — admin-only, useful for internal context.

### Sidebar actions

- **Save draft**
- **Send to Client** — fires the email template.
- **Print**
- **Download PDF** — opens the client-side renderer (jsPDF + canvas capture).
- **Public link** — copy/paste; opens the public invoice page.
- **Duplicate** <span class="pro-pill">PRO</span> — clone every line, status reset to draft.

## Sending the invoice

Click **Send to Client** from the builder. Easy Invoice:

1. Reads <span class="screen-path">Settings → Email → Invoice Available</span> (subject, heading, body).
2. Substitutes merge tags (see [Email & notifications](/email-settings#merge-tags)).
3. Posts via `wp_mail` (use SMTP for deliverability — see [Troubleshooting](/troubleshooting#email-not-arriving)).
4. Logs the result via the `easy_invoice_email_sent` / `easy_invoice_email_failed` actions.

Re-sending triggers another email; status doesn't change (still _Sent_).

## PDF export (client-side)

Easy Invoice generates the PDF **in the browser** using **jsPDF + html2canvas** (see `includes/Helpers/PdfHelper.php:78–86`).

- **Pro:** No server-side library required (no Dompdf / mPDF dependency).
- **Con:** Long invoices need browser canvas resources — very-long invoices (50+ line items) may be slow on weak machines.
- **Print-to-PDF** is always a fallback (Cmd-P / Ctrl-P).

> <span class="doc-pro-pill">Pro</span> The **PDF Enhancements** module adds a watermark, alignment options, and per-template PDF customisation. See [Pro features overview](/third-party-integrations#pdf-enhancements).

## Numbering format

Set in <span class="screen-path">Settings → Invoice</span>:

| Field | Example | Note |
| --- | --- | --- |
| Prefix | `INV-` | Anything text. |
| Next number | `1` | Increments on every save. |
| Auto-increment | On / Off | Off = manual numbering. |
| Padding | `4` | `INV-0001`, `INV-0002`… (set in advanced if exposed). |

> Year-restart numbering (e.g. `INV-2026-0001`): set the next number manually each January and bake the year into the prefix. The free plugin doesn't auto-restart per year.

## Bulk actions

The invoice list (<span class="screen-path">Easy Invoice → All Invoices</span>) supports:

- **Filter** by status, client, date range.
- **Bulk delete** (trashed first, can be restored).
- **Bulk export to CSV** <span class="doc-pro-pill">Pro</span>

## Discounts

Free supports both **before-tax** and **after-tax** discount methods (set in <span class="screen-path">Settings → Tax</span>). Discounts can be:

- A **flat** amount in your currency.
- A **percentage** of the subtotal.

> <span class="doc-pro-pill">Pro</span> The Pro plugin doesn't add a coupon system — discounts are per-invoice manual fields. For coupon codes use a marketing plugin alongside Easy Invoice.

## Tax

Per-line or one bottom rate (set in <span class="screen-path">Settings → Tax</span>):

- **Item** — tax field on each line, taxable flag per line.
- **Subtotal** — single rate at the bottom.

> <span class="doc-pro-pill">Pro</span> **Additional Tax** adds support for more than one rate stack — useful for "GST + State Tax" or "VAT + service charge".

## Refunds

Refunds aren't an invoice action — they're a **status change on the Payment record**:

1. Issue the refund in the gateway dashboard (Stripe, PayPal, etc.).
2. Open <span class="screen-path">Easy Invoice → Payments</span> → click the payment.
3. Set status to **Refunded**.
4. The invoice's payment status flips back to `unpaid` (or partially paid, depending on amount).

See [Payments → Refunds](/payments#refunds) for the full flow.

## Where the data lives

| Data | Storage |
| --- | --- |
| Invoice header (number, dates, client, currency) | post meta |
| Line items | meta `_easy_invoice_items` |
| Payment status | meta `_payment_status` |
| Payment records | separate `easy_invoice_payment` posts |
| Recurring schedule (Pro) | meta on `easy_invoice_recurring` posts |

> Easy Invoice does **not** create custom DB tables — everything is in `wp_posts` + `wp_postmeta`. This means standard WP backups capture invoice data automatically.

## Where to go next

- 📝 [Quotes / estimates](/quotes) — same builder pattern for pre-sales.
- 👥 [Clients & portal](/clients) — let clients see their invoices.
- 💳 [Payment gateways](/payment-settings) — connect Stripe, PayPal, more.
- ✉️ [Email & notifications](/email-settings) — customise every email.
- 💎 [Pro features overview](/third-party-integrations) — what Pro adds.
