---
title: Payments
description: Record and track payments in Easy Invoice — manual entries, gateway-driven payments, partial payments, refunds, and the relationship between Payment posts and invoices.
---

# Payments

Every payment in Easy Invoice is its own post (`easy_invoice_payment` CPT). The invoice's payment status is **derived** from the related Payment records — that's how partial payments, refunds, and split payments work without breaking the invoice.

## What a payment _is_

- **Custom post type**: `easy_invoice_payment` (`includes/EasyInvoice.php:349–377`).
- **Public**: no.
- **Admin UI**: hidden submenu — visible from <span class="screen-path">Easy Invoice → Payments</span>.

Each Payment links to **one** invoice via post meta. An invoice can have **many** payment records (partial flows, refunds, split methods).

## Recording a manual payment

Open <span class="screen-path">Easy Invoice → Add New Payment</span>.

<ol class="step-list">
  <li>Pick the invoice from the dropdown (search by invoice number).</li>
  <li>Set the <strong>Payment date</strong> (defaults to today).</li>
  <li>Pick the <strong>Gateway</strong> — usually <em>Manual</em> for cash / wire / cheque.</li>
  <li>Enter the <strong>Amount</strong> (full or partial).</li>
  <li>Add a <strong>Transaction ID</strong> (optional reference).</li>
  <li>Pick a <strong>Status</strong>: <em>Completed</em> for normal, <em>Pending</em> while you wait on bank clearance, <em>Refunded</em> after issuing a refund.</li>
  <li>Click <strong>Save</strong>.</li>
</ol>

Easy Invoice then:

1. Sums all completed payments for the invoice.
2. Compares against the invoice total.
3. Updates the invoice's `_payment_status` meta:
   - **completed** — sum ≥ total.
   - **partial-paid** — `0 < sum < total` (Pro shows partial).
   - **unpaid** — sum is zero.
4. Fires `easy_invoice_payment_completed` (action) for completed payments.

> The decision logic lives in `PaymentController::should_update_invoice_status` (`includes/Controllers/PaymentController.php:1219`) and respects the `easy_invoice_should_update_invoice_status` filter.

## Gateway-driven payments

When a client pays via a configured gateway, Easy Invoice creates the Payment record automatically.

| Gateway | When it creates | Webhook endpoint |
| --- | --- | --- |
| **PayPal** (Free) | After PayPal IPN returns success. | n/a (IPN handler) |
| **Manual** (Free) | Never — admin creates manually. | n/a |
| **Stripe** <span class="pro-pill">PRO</span> | After Stripe webhook fires `payment_intent.succeeded`. | `admin-ajax.php?action=easy_invoice_stripe_webhook` |
| **Square** <span class="pro-pill">PRO</span> | After Square webhook + 15-min reconcile cron. | `admin-ajax.php?action=easy_invoice_square_webhook` |
| **Mollie** <span class="pro-pill">PRO</span> | After Mollie webhook returns paid. | `admin-ajax.php?action=easy_invoice_mollie_webhook` |
| **Authorize.Net** <span class="pro-pill">PRO</span> | After Authorize.Net post returns. | `admin-ajax.php?action=easy_invoice_authorizenet_response` |
| **Bank Transfer** <span class="pro-pill">PRO</span> | Created in `pending-bank` status; admin marks completed. | n/a |
| **Cheque** <span class="pro-pill">PRO</span> | Created in `pending-cheque`; admin marks completed. | n/a |
| **Cash** <span class="pro-pill">PRO</span> | On client click; mark completed manually after collection. | n/a |
| **Moneris** <span class="pro-pill">PRO</span> | After Moneris response. | n/a |

> For full webhook setup, see [Payment gateways](/payment-settings).

## Partial payments

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Partial payments module</span>
  </div>
  <p class="pro-callout__desc">Pro lets clients pay any amount toward an invoice. The remaining balance stays open and can be paid later via the same public link.</p>
  <a class="pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/">Unlock partials →</a>
</div>

How it works:

1. Enable under <span class="screen-path">Settings → Partial Payments</span> (Pro only).
2. Set a **minimum** partial (e.g. 25 % of total).
3. The public invoice page shows an editable amount field.
4. Each partial creates a Payment record — invoice status reflects "partial-paid".
5. When the sum reaches the total, status flips to "completed" automatically.

The `easy_invoice_display_total` filter (`PartialPayments.php:22`) lets templates show paid vs balance side by side.

## Deposit invoices

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Deposit invoices module</span>
  </div>
  <p class="pro-callout__desc">Charge a deposit (e.g. 50% upfront) and bill the balance later as a follow-up invoice. Each deposit is its own Payment record linked to the parent invoice.</p>
  <a class="pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/">Unlock deposits →</a>
</div>

Two flows are supported:

- **Single deposit + balance** — charge X % now, the remainder when work is done.
- **Multi-stage** — charge a series of percentages (e.g. 30 / 40 / 30).

Set up under <span class="screen-path">Settings → Deposit Invoices</span>.

## Refunds

A refund is a **status change** on the Payment record:

<ol class="step-list">
  <li>Issue the refund in the gateway dashboard (Stripe, PayPal, etc.).</li>
  <li>Open <span class="screen-path">Easy Invoice → Payments</span> → find the payment.</li>
  <li>Edit → set <strong>Status</strong> to <em>Refunded</em>.</li>
  <li>Save.</li>
</ol>

The invoice's `_payment_status` recomputes — if the only successful payment was refunded, the invoice goes back to **unpaid**. If you partially refunded, status reflects the new sum (e.g. `partial-paid`).

> Stripe refunds via the gateway dashboard don't auto-mirror back to Easy Invoice. Plan for the two-step manual mirror.

## Payment reminders

### Free: bank / cheque pending reminder

Cron `easy_invoice_payment_reminder` runs **daily** and emails clients who have payments stuck in `pending-bank` or `pending-cheque` for more than N days. Configure under <span class="screen-path">Settings → Advanced → Payment reminder days</span>.

### Pro: full reminder engine

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Payment reminder cadence</span>
  </div>
  <p class="pro-callout__desc">Send N days before due, on due day, and X days after due. Independent templates and frequencies for each.</p>
  <a class="pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/">Unlock reminders →</a>
</div>

Pro cron `easy_invoice_send_payment_reminders` runs daily — see <span class="screen-path">Settings → Email → Payment Reminder</span>.

## Receipts

When a payment completes, Easy Invoice can email a receipt:

- **Free**: configure under <span class="screen-path">Settings → Email → Payment Received</span>.
- **Pro**: receipts are also stored as separate documents (action `easy_invoice_pro_receipt_generated` — `ReceiptController.php:273`) and can be downloaded individually.

## Reports tied to payments

Open <span class="screen-path">Easy Invoice → Reports</span> for:

- **Revenue over time** (line chart).
- **Status breakdown** (paid vs unpaid vs overdue).
- **Payment-method mix** (which gateway brings the most money).
- **Top clients** (by total paid).

All charts are Chart.js, rendered client-side.

## Where to go next

- 💳 [Payment gateways](/payment-settings) — connect Stripe, PayPal, Square.
- 🧾 [Invoices](/invoices) — invoice statuses and how they react to payments.
- 🔁 [Recurring & subscriptions](/recurring-invoices) — schedule repeating bills.
- 💎 [Pro features overview](/third-party-integrations) — partials, deposits, reminders.
