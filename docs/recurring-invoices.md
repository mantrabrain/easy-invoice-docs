---
title: Recurring & subscriptions
description: Schedule repeating invoices and subscription billing in Easy Invoice Pro — frequencies, cron generation, deposit + partial payment combinations, and stop conditions.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Recurring invoices</strong> and <strong>subscription billing</strong> are <strong>Easy Invoice Pro</strong> features. The free plugin only does one-shot invoices.</span>
  <a class="doc-pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener">View pricing &amp; buy →</a>
</div>

# Recurring & subscriptions

Pro adds two related but distinct features:

- **Recurring invoices** — generate the next invoice on a schedule. The client pays each one (or has card-on-file via Stripe).
- **Subscription invoices** — like recurring, but the gateway charges automatically (no manual client action).

## What recurring invoices _are_

- **Custom post type**: `easy_invoice_recurring` (registered in `includes/Controllers/RecurringInvoiceController.php:61–99`).
- **Public**: no.
- **`create_posts` capability**: `do_not_allow` — recurring records are created from the invoice builder, not directly.

A recurring record is a **template** for future invoices. Each generation creates a fresh `easy_invoice` post linked back to the template.

## Setting up a recurring invoice

<ol class="step-list">
  <li>Build a normal invoice as you would (line items, currency, client).</li>
  <li>In the right sidebar, toggle <strong>Make recurring</strong>.</li>
  <li>Pick the <strong>Frequency</strong>: daily / weekly / fortnightly / monthly / quarterly / yearly.</li>
  <li>Pick the <strong>Start date</strong> (defaults to today).</li>
  <li>Pick a <strong>Stop condition</strong>: never / after N invoices / on a specific date.</li>
  <li>Save. The first invoice is generated immediately or on the start date.</li>
</ol>

## How generation actually runs

Pro defines two cron mechanisms (so you have a fallback if one is delayed):

| Hook | Frequency | What it does |
| --- | --- | --- |
| `easy_invoice_recurring_cron` | **every 2 minutes** (custom schedule) | Primary — picks up due-now templates and generates. |
| `easy_invoice_pro_generate_recurring` | **daily** | Backup pass — catches anything the 2-min job missed. |
| `easy_invoice_pro_process_subscriptions` | **daily** | Subscription billing (auto-charge on file). |

> If the 2-min job runs more often than you want, switch your hosting cron to fire every 15 min — schedule still respects the per-invoice "next run" date.

When a recurring invoice generates:

1. A new `easy_invoice` post is created with the same line items.
2. The new invoice's **invoice date** = today; **due date** = today + (default due days).
3. The recurring template's "next run" advances by one frequency.
4. The configured email template is sent (use **Invoice Available** by default).
5. Action `easy_invoice_pro_recurring_generated` fires (if you want to extend).

## Stopping a recurring invoice

Two ways:

- Open the recurring template → toggle **Active** off.
- Or set a stop condition (after N or by date) when first creating.

> Pausing doesn't delete past invoices. They stay in the All Invoices list with their original dates.

## Subscription invoices (Pro module)

Subscription invoices are **recurring with auto-charge**. The client enters card / mandate once; Pro charges them automatically each cycle.

| Setting | What it is |
| --- | --- |
| **Gateway** | Must be a subscription-capable gateway (Stripe, Mollie). |
| **Frequency** | Same options as recurring. |
| **Trial period** | Optional N free days before first charge. |
| **Setup fee** | One-off charge added to the first invoice. |
| **Cycles** | How many charges total (or _unlimited_). |
| **Send invoice email** | Even when auto-charged, you can still email a copy. |

Configure under <span class="screen-path">Settings → Subscription Invoices</span>.

## Combining with deposits & partials

Pro lets you stack:

- **Deposit + recurring** — a one-off deposit invoice on signup, then recurring monthly maintenance.
- **Recurring + partial payments** — let clients pay each recurring invoice in chunks.
- **Subscription + setup fee** — Stripe charges the setup once + monthly subscription.

See:
- [Pro features → Deposit Invoices](/features#deposit-invoices)
- [Pro features → Partial Payments](/features#partial-payments)
- [Pro features → Subscription Invoices](/features#subscription-invoices)

## Reporting

Recurring invoices appear in the **All Invoices** list with a recurring icon. Filter by **Source: Recurring** to see only those. Reports treat each generated invoice as a normal one (revenue counts each cycle).

## Common pitfalls

| Symptom | Cause | Fix |
| --- | --- | --- |
| New invoice not generated on schedule | WP-Cron not running. | [Troubleshooting → WP-Cron](/troubleshooting#wp-cron-isnt-running). |
| Two invoices generated on the same day | Hooked to `easy_invoice_recurring_cron` **and** `easy_invoice_pro_generate_recurring`. | Disable one of the two via custom code if you only want one. |
| Subscription auto-charge fails | Card on file declined. | Stripe → Subscriptions; either retry or the client updates their card. |
| Recurring stops after pause | Toggle **Active** is off. | Re-enable in the template. |

## Architecture note

The Pro plugin contains **two recurring subsystems** (`RecurringInvoices.php` extension and `RecurringInvoiceController` controller). Both are wired in production builds; the controller is the newer admin UI, the extension is the cron-glue. If you build a custom recurring extension, hook against the **controller's actions** (`easy_invoice_pro_recurring_generated`) — those are stable.

## Where to go next

- 💎 [Pro features overview](/third-party-integrations) — Recurring + Subscription overview cards.
- 📋 [All Pro features](/features) — flat catalog.
- 💳 [Payment gateways](/payment-settings) — connect Stripe for auto-charge.
- 🧾 [Invoices](/invoices) — invoice statuses recurring uses.
