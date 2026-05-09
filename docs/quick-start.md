---
title: Quick start
description: Send your first Easy Invoice in five minutes — set company details, currency, numbering, an email template, then build and send an invoice.
---

# Quick start

> First time in WordPress? Open [Your WordPress admin](/admin-dashboard) in another tab — it maps every Easy Invoice menu item to the matching docs page.

This walkthrough takes about 10 minutes and ends with a real invoice in a client's inbox.

## 1. Company & defaults

Open <span class="screen-path">Easy Invoice → Settings → Company</span>.

Fill in:

- **Company name** — appears on the invoice header.
- **Address** — multi-line.
- **Email & phone** — also used as the reply-to.
- **Logo** — upload from Media Library; sized to fit the invoice header.
- **Tax ID / VAT** — printed under company info on the invoice.

Click **Save**.

## 2. Currency & numbers

Open <span class="screen-path">Easy Invoice → Settings → Currency</span>.

| Setting | What it does |
| --- | --- |
| **Currency code** | ISO 4217 (`USD`, `EUR`, `GBP`, `INR`, `NPR`…). |
| **Currency position** | Before / after, with / without space. |
| **Thousand separator** | `,` `.` ` `  |
| **Decimal separator** | `.` `,` |
| **Decimal precision** | `0`–`4` (default `2`). |

> Per-invoice currency override is supported — handy when you bill some clients in EUR and others in USD.

## 3. Invoice numbering

Open <span class="screen-path">Easy Invoice → Settings → Invoice</span>.

| Setting | Default | Note |
| --- | --- | --- |
| **Invoice prefix** | `INV-` | Visible to the client. |
| **Next invoice number** | `1` | Auto-increments each save. |
| **Auto-increment toggle** | On | Turn off only if you manually number. |

Quotes have an analogue under <span class="screen-path">Settings → Quote</span> (default prefix `QUO-`).

## 4. Tax (if you charge any)

Open <span class="screen-path">Easy Invoice → Settings → Tax</span>.

- **Enable tax** — global toggle.
- **Tax entry method** — _Item_ (per line) or _Subtotal_ (one rate at the bottom).
- **Default tax rate** — e.g. `13` for 13 %.
- **Default tax name** — e.g. `VAT`, `GST`, `Sales Tax`.

> <span class="doc-pro-pill">Pro</span> Easy Invoice Pro adds the **Additional Tax** module for multiple stacked rates with rules — see [Pro features overview](/third-party-integrations#additional-tax).

## 5. Connect a payment method (free starts with PayPal)

Open <span class="screen-path">Easy Invoice → Settings → Payment</span>.

The free plugin includes:

- **PayPal Standard** — paste your PayPal email; toggle sandbox while testing.
- **Manual** — for offline / cash / "I'll send a wire" flows.

Pro unlocks Stripe, Square, Mollie, Authorize.Net, Bank Transfer, Cheque, Cash, and Moneris — see [Payment gateways](/payment-settings).

## 6. Customize the invoice email

Open <span class="screen-path">Easy Invoice → Settings → Email → Invoice Available</span>.

You'll see:

- **Subject** — supports merge tags (e.g. `{invoice_number}`).
- **Heading** — the H1 inside the email body.
- **Body** — full HTML with merge tags.

A typical first edit: change `Dear {client_name}, your invoice is ready.` to your own house-style copy. **Save**.

> The full list of merge tags lives in [Email & notifications](/email-settings#merge-tags).

## 7. Build your first invoice

Open <span class="screen-path">Easy Invoice → Add New</span>.

<ol class="step-list">
  <li>Pick or create a <strong>Client</strong> (clients are WordPress users — see <a href="/docs/clients">Clients & portal</a>).</li>
  <li>Set the <strong>Invoice date</strong> and <strong>Due date</strong>.</li>
  <li>Add line items — name, quantity, unit price, optional tax / discount per line.</li>
  <li>Pick a <strong>Currency</strong> (override the default if needed).</li>
  <li>Add private notes (admin-only) and customer notes (printed on the invoice).</li>
  <li>Click <strong>Save</strong>.</li>
</ol>

The invoice now exists as a `draft` post-status with `_payment_status = unpaid`.

## 8. Send the invoice

From the invoice edit page:

- Click **Send to Client** — fires the configured email template, switches the status to **Sent**, and posts the public link.
- Or copy the public URL from the right-hand sidebar and send manually.

> The invoice URL is `https://yoursite.com/invoice/<slug>` by default. <span class="doc-pro-pill">Pro</span> turns this into a hash-protected slug under <span class="screen-path">Settings → Permalinks</span> if privacy matters.

## 9. Mark a payment

When the client pays:

<ol class="step-list">
  <li>Open <span class="screen-path">Easy Invoice → Payments → Add New</span>.</li>
  <li>Pick the invoice from the dropdown (search by invoice number).</li>
  <li>Pick the payment date, gateway, amount.</li>
  <li>Click <strong>Save</strong>.</li>
</ol>

The invoice's `_payment_status` flips to `completed` and the **Reports** dashboard updates.

> Refunds are a status change on the **Payment** record (see [Payments](/payments#refunds)).

## 10. Check Reports

Open <span class="screen-path">Easy Invoice → Reports</span> for revenue charts, status breakdown, and payment-method mix. Charts render with Chart.js in the browser — no server-side rendering.

---

## Where to go next

- 🧾 [Invoices](/invoices) — full builder reference, statuses, PDF, taxes.
- 📝 [Quotes / estimates](/quotes) — send a quote first, accept / decline online.
- 👥 [Clients & portal](/clients) — let clients self-serve their invoice list.
- 💳 [Payment gateways](/payment-settings) — add Stripe and friends.
- 💎 [Pro features overview](/third-party-integrations) — what Pro unlocks.
