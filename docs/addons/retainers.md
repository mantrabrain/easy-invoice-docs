---
title: Retainers & Prepayments (Pro addon)
description: Record a client's prepayment once and let invoices draw it down — by hand from the client record, or automatically the moment an invoice is issued.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Professional tier</span>
  <span>Requires an Easy Invoice Pro Professional licence or above. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Retainers & Prepayments

Agencies and consultants are often paid before the work: a quarterly retainer, a project deposit, a block of hours. The money arrives once; the invoices come later. This addon keeps that balance on the client record and settles invoices from it.

## What you get

- **A retainer balance per client**, on the client record, with every movement listed — money in, and each invoice it was applied to.
- **Record a retainer** in one form: amount, date, how it was paid, a note.
- **Apply it to an invoice** with one click from the client record, for the amount due or whatever balance remains.
- **Automatic settlement** (optional): the moment an invoice is issued for a client with a balance, credit is applied and the invoice is partly or fully paid. Turn it on under **Settings → Invoice → Settle new invoices from the client's retainer balance automatically**.
- **Real payment records.** Applied credit is a completed payment with the method *credit*, so the invoice, the client statement, reports and accounting sync all see money received. The [profit & loss statement](./reports#profit-loss) counts the retainer once — when it arrived, not again when it is applied.

## Enabling

1. Open **Easy Invoice → Addons** and activate **Retainers & Prepayments**
2. Open any client record: a **Retainer** panel appears with the balance, the record form and the open invoices it can be applied to
3. Optionally switch on **Settings → Invoice → Settle new invoices from the client's retainer balance automatically**

## How the money is recorded

Recording a retainer creates a payment record of type `credit` for the client with no invoice. Applying it creates a payment of type `credit_applied` on the invoice for the amount applied. The balance is the sum of the first minus the sum of the second — nothing is stored that could drift.

## For developers

| Hook | Type | Purpose |
|---|---|---|
| `easy_invoice_retainer_added` | action | After a retainer is recorded (`$payment_id`, `$client_id`, `$amount`) |
| `easy_invoice_retainer_applied` | action | After credit is applied to an invoice (`$invoice_id`, `$amount`, `$payment_id`) |
| `easy_invoice_payment_completed` | action (free plugin) | Fires when an application settles the invoice in full |

`Retainers::balance( $client_id )` and `Retainers::history( $client_id )` return the figures shown on the client record.
