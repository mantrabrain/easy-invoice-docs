---
title: Payments — record, track, reconcile
description: How payments work in Easy Invoice — automatic gateway payments, manual entries, partial payments, refunds, and how Payment records relate to invoices.
---

# Payments

A **Payment** in Easy Invoice is a record of money received against an invoice. Payments can be created two ways:

1. **Automatically** — when a client pays through PayPal, Stripe, Square, etc. The gateway webhook fires, a Payment is recorded, and the invoice is marked Paid.
2. **Manually** — when you receive money outside a gateway (cash, wire transfer, cheque) and record it yourself.

WP Admin → **Easy Invoice → Payments**.

![Payments — every recorded payment, with filters by status and method](/screenshots/28-payments-list.png)

---

## 1. The Payments list

Every payment ever received shows up here, with:

- The associated **Invoice Number**
- **Client name**
- **Payment Method** (PayPal, Stripe, Manual, Bank Transfer, etc.)
- **Amount**
- **Date**
- **Status** (Paid, Pending, Refunded)
- **Transaction ID** (from the gateway)

Filter by status, method, or date range.

---

## 2. Record a manual payment

When a client pays you offline (cash, wire transfer you reconciled in your bank, cheque arrived):

1. WP Admin → **Easy Invoice → Add New Payment**.
2. Fill in:

| Field | Why |
| --- | --- |
| **Invoice** | Which invoice this payment is against (dropdown shows unpaid invoices). |
| **Amount** | The amount received. Can be less than the invoice total for **partial payments**. |
| **Payment Date** | When you actually received it. |
| **Payment Method** | Manual / Cash / Bank Transfer / Cheque / Other. |
| **Transaction Reference** | Optional — the bank reference, cheque number, or any text. |
| **Notes** | Internal notes ("client paid in person", "wire from Acme Bank ref ABC123"). |

3. Click **Save**.

The invoice updates automatically:
- Full payment ⇒ status flips to **Paid**.
- Partial payment ⇒ remaining balance shown; status stays **Unpaid** until full balance is collected.
- The **Payment Received** email goes out to the client (unless you disable it in **Settings → Email → Payment Received**).

---

## 3. Partial payments <span class="pro-pill">PRO</span>

If you've enabled **Settings → Invoice → Enable Partial Payments**, Easy Invoice Pro lets the **client** pay in installments via the public invoice page. The flow:

1. Client opens the invoice URL.
2. They pick an amount: a free amount, one of your fixed presets, or a percentage preset (configured in settings).
3. The gateway charges that amount only.
4. Easy Invoice records the partial payment and updates the invoice's **Remaining Balance**.
5. The client can return any time and pay another installment.

See [Settings reference → Pro-only invoice settings](./settings-reference#pro-only-invoice-settings) for the full set of partial-payment configuration fields.

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span>Partial payments require <strong>Easy Invoice Pro</strong>. <a href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener">Upgrade →</a></span>
</div>

---

## 4. Refunds

To refund a payment:

1. Open the Payment record.
2. Click **Refund**.
3. Enter the refund amount and (optional) reason.

For gateway-backed payments (Stripe, Square, etc.), the refund is sent to the gateway too — the customer's card is credited. Manual payments are just marked **Refunded** in your records.

---

## 5. Reports & exports

WP Admin → **Easy Invoice → Reports** for the free dashboard summary (this month's revenue, outstanding total).

With **Pro**, the **Export** tool (under **Easy Invoice → Export**) generates CSV exports for accounting:

- Invoices CSV (date, client, amount, status, gateway)
- Payments CSV (date, invoice, amount, method, transaction ID)
- Clients CSV

CSVs work with QuickBooks, Xero, FreshBooks, and any spreadsheet.

---

## 6. Common questions

**"My invoice is still Unpaid even though Stripe says paid."**
→ Webhook isn't connecting. Re-check [Stripe webhook setup](./payment-settings#stripe).

**"How do I delete a wrong payment?"**
→ Open the Payment, click **Delete**. The invoice's outstanding balance recalculates automatically.

**"Can I move a payment to a different invoice?"**
→ Yes — delete the payment from the wrong invoice and re-create it against the correct one. Or edit the Payment's Invoice field directly.

**"Why does the invoice show Paid but no Payment record exists?"**
→ Someone manually changed the invoice status without creating a Payment. The financials won't reconcile. Always record a Payment instead of editing status.

---

## Next

- [Payment gateway setup](./payment-settings)
- [Email templates (Payment Received)](./email-settings)
- [All Pro features](./features)
