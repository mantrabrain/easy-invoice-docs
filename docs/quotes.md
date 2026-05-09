---
title: Quotes / estimates
description: Send quotes, let clients accept or decline online, and one-click convert into an invoice. Free in core — same builder pattern as invoices.
---

# Quotes / estimates

A **quote** (estimate / proposal) is a pre-sale price summary. Easy Invoice ships a full quote system in the **free** plugin — separate CPT, separate list, separate numbering, online accept/decline.

## What a quote _is_, technically

- **Custom post type:** `easy_invoice_quote` (registered in `includes/EasyInvoice.php:314–346`).
- **Slug:** `easy-invoice-quote/<post-slug>`.
- **Lifecycle:** draft → sent → accepted / declined → (optional) converted to invoice.

## When to use a quote vs an invoice

| Scenario | Use |
| --- | --- |
| Client hasn't agreed yet ("send me a quote for…") | **Quote** |
| You're locking in scope and waiting on approval | **Quote** |
| Client agreed; you're billing | **Invoice** |
| Client paid up-front (deposits) | **Invoice** with deposit (Pro) |

## Building a quote

Open <span class="screen-path">Easy Invoice → Add New Quote</span>.

The builder mirrors the invoice builder:

- **Quote number** — auto-incremented from <span class="screen-path">Settings → Quote → Next quote number</span>. Default prefix `QUO-`.
- **Client** — search WP users.
- **Quote date** + **Expiry date** (default = today + N days).
- **Line items** — name, description, quantity, unit price, optional tax/discount per line.
- **Currency override** (per quote).
- **Notes** — customer + private.

Click **Save Draft** to keep it private, or **Send to Client** when ready.

## The accept / decline flow

When the client opens the public quote URL:

1. They see the quote on a styled single template.
2. **Accept** and **Decline** buttons appear at the bottom (free).
3. Clicking **Accept** flips the post status to "accepted" and fires `easy_invoice_quote_accepted` action.
4. Clicking **Decline** flips to "declined" and fires `easy_invoice_quote_declined`.

On accept, you (admin) get an email — see <span class="screen-path">Settings → Email → Quote Available / Accepted / Declined</span>.

## Convert quote → invoice

Open the accepted quote → click **Convert to Invoice**:

1. A new invoice is created with the same line items, totals, currency, and client.
2. The new invoice starts in draft (so you can tweak before sending).
3. The original quote stays in the system (not deleted).

> The conversion preserves the link via meta — you can always click "Source quote" from the new invoice.

## Quote-only settings

Open <span class="screen-path">Easy Invoice → Settings → Quote</span>:

| Setting | Default | What it does |
| --- | --- | --- |
| **Quote prefix** | `QUO-` | Visible in the number. |
| **Next quote number** | `1` | Auto-increments. |
| **Default validity** | `30` days | Used to compute the expiry date when you create a new quote. |
| **Auto-expire** | On | Daily cron flips expired quotes to "expired" via `easy_invoice_quote_expiration_check`. |

## Email templates

Quote-related templates live under <span class="screen-path">Easy Invoice → Settings → Email</span>:

- **Quote Available** — sent on _Send to Client_.
- **Quote Accepted** — sent to admin when client accepts.
- **Quote Declined** — sent to admin when client declines.

Merge tags include `{quote_number}`, `{quote_total}`, `{client_name}`, `{accept_url}`, `{decline_url}`. See [Email & notifications](/email-settings#merge-tags) for the full table.

## Public quote shortcode

Linking to a quote inside a page or email body? Use:

```
[easy_quote_url id="123" text="View your quote"]
```

See [Shortcodes](/shortcodes#easy_quote_url) for every attribute.

## Bulk actions

The quote list supports the same filters and bulk delete as invoices. Pro adds CSV export.

## Cron: expiration

Hook: `easy_invoice_quote_expiration_check` (daily). Marks quotes as **expired** when:

- The quote is in `sent` status.
- The expiry date is in the past.
- "Auto-expire" is enabled.

If WP-Cron is broken, quotes won't expire automatically — see [Troubleshooting](/troubleshooting#wp-cron-isnt-running).

## What's NOT in quotes

- No coupon system.
- No e-signature field (use a separate plugin if you need a legal signature).
- No version history (saving overwrites the previous draft).

## Where to go next

- 🧾 [Invoices](/invoices) — convert a quote to an invoice and bill.
- 👥 [Clients & portal](/clients) — show clients their quote history.
- ✉️ [Email & notifications](/email-settings) — customise the quote emails.
- ⚙️ [Shortcodes](/shortcodes) — embed quote links anywhere.
