---
title: Partial Payments & Deposits (Pro addon)
description: Let customers pay invoices in deposits and installments. Configure minimum amounts, preset payment buttons, due-date extensions, and email notifications.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included free with Easy Invoice Pro — no license key required. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Partial Payments & Deposits
By default, every invoice is "pay the full amount or nothing". That's fine for small jobs, but it falls apart fast for:

![Invoice builder — partial payments and deposits configured per invoice](/screenshots/24-invoice-builder.png)

- **Larger projects** where clients want to pay in stages.
- **Deposits before work starts** — you need 25% upfront to commit.
- **Cash-flow-conscious clients** who'd rather pay $500 today and $500 next month than $1,000 right now.

The **Partial Payments & Deposits** addon turns the standard "Pay Now" button into a flexible payment widget. Clients pick what they want to pay — a preset amount, a percentage of the total, or a custom number — and your invoice tracks the running balance automatically. No spreadsheets, no manual reconciliation, no awkward emails asking "did you mean to pay $400 of the $1,000?"

## Plain-English problem this solves

Say you bill Acme $4,000 for a website redesign. Without this addon, Acme either pays you $4,000 today or pays you nothing. If they want to split it across three months, you have to:

- Manually track three separate "pretend" invoices, or
- Hope they remember to pay on schedule with no automated reminders.

With Partial Payments enabled, Acme sees the invoice once and clicks "Pay 25% now ($1,000)", then comes back next month and clicks "Pay $1,500", and finishes with "Pay remaining $1,500". The invoice shows the running balance the whole time. You get three payments, all tracked against the same invoice, no manual math.

## When you need this

- **Service businesses** with project work over $500 — almost everyone wants a deposit option.
- **Subscription-adjacent** offerings where clients prefer installments over a single big charge.
- **Agencies / consultancies** with milestone-based billing — pay 30% to start, 40% at midpoint, 30% on delivery.
- **Anyone in a tight cash-flow situation** who wants to lower the "Pay Now" friction by offering smaller amounts.

If you only invoice small amounts that everyone pays in full, you don't strictly need this — but it costs nothing to leave it disabled and turn it on when a bigger client appears.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Partial Payments & Deposits**
3. Click **Activate**

Settings live on **Easy Invoice → Settings**, in the **Partial Payments** section that appears once the addon is active.

## Every setting explained

### Enable Partial Payments

**What it does:** The master on/off for the whole feature. When on, every invoice's payment page shows the partial-payment chooser. When off, the standard "pay full amount" flow is restored.

**Default:** Off.

**Recommended:** On (you wouldn't activate the addon and leave it off — but the toggle is here in case you want to temporarily disable partial payments without uninstalling the addon).

### Minimum Payment Amount

**What it does:** The smallest amount a client is allowed to pay in a single transaction. Anything below this is rejected.

**Default:** `0` (no minimum — client can pay any amount > 0).

**Why you'd set this:** Payment processors charge a fixed fee per transaction (typically $0.30 + 2.9% with Stripe, similar with PayPal). If you let a client pay $1 fifty times instead of $50 once, you're paying fifty fees instead of one. Setting a minimum of, say, $25 or $50 stops that.

**Example:** If your invoice is for $1,000 and you set the minimum to $100, the client can pay $100, $250, $500, etc. — but not $5 or $20. They can still pay the remaining balance even if it falls below the minimum (so they're not locked out of finishing the invoice).

### Payment Amount Options

**What it does:** Controls *how* clients pick what they pay. Three modes:

| Mode | What the client sees | When to use it |
|---|---|---|
| **Fixed amounts** | Preset buttons like `$100`, `$250`, `$500` | You want strict control — only specific amounts are allowed |
| **Percentage options** | Preset buttons like `25%`, `50%`, `75%` of the total | You want amounts that scale with the invoice size automatically |
| **Custom amount** | A free-text box where the client types any number | Maximum flexibility — clients pick whatever fits their budget today |

You can enable any combination — show preset percentages AND a custom field, or fixed amounts AND percentages.

**Plain-English:** Decide whether you want to *guide* the client (presets) or let them *type anything* (custom). Presets are friendlier — fewer decisions to make.

### Fixed Amount Options

**What it does:** The list of preset dollar buttons shown when **Fixed amounts** mode is active. Enter as comma-separated numbers.

**Default:** Empty.

**Examples:**
- `100,250,500` → three buttons: "$100", "$250", "$500"
- `50,100,200,500,1000` → five buttons spanning small to large
- `500` → just one big "Deposit $500" button

**Plain-English:** These are the round-number buttons your client clicks. Pick numbers that make sense for *your* typical invoice size. Don't list `$25` if your invoices are usually $5,000 — and vice-versa.

### Percentage Options

**What it does:** The list of preset percentage buttons shown when **Percentage options** mode is active. Enter as comma-separated numbers (without the `%` sign).

**Default:** Empty.

**Examples:**
- `25,50,75` → three buttons: "Pay 25%", "Pay 50%", "Pay 75%" — classic installment plan
- `33,66` → three-way split (pay a third now, two-thirds later)
- `50` → just one button: "Pay 50% deposit"

**How it's calculated:** Each percentage is applied to the invoice total at the moment the client clicks. So `50` on a $4,000 invoice creates a $2,000 button; on a $250 invoice it creates a $125 button. Percentages adapt automatically — you don't have to re-do this for each invoice size.

**Plain-English:** Use percentages when you bill across many invoice sizes and want the buttons to "just work" without re-configuring. Use fixed amounts when your invoice sizes are similar enough that round-number dollars are clearer.

### Auto-extend Due Date

**What it does:** When a client makes a partial payment that's at least the **Minimum Payment Amount**, automatically push the invoice's due date forward. This gives them more time to pay the balance without making the invoice "overdue".

**Default:** Off.

**When to turn it on:**
- You bill clients on net-15 or net-30, and a 50% deposit on day 1 should reasonably reset the clock for the remaining 50%.
- You don't want a partially-paid invoice to start triggering reminder emails (via **Smart Reminders**) as if it were fully unpaid.

**When to leave it off:**
- You want a hard deadline regardless of partial payments — if the original due date passes with balance owed, the invoice is "overdue" and triggers your standard chase sequence.

### Due Date Extension (Days)

**What it does:** When **Auto-extend Due Date** is on, this controls how many days forward the due date jumps after each qualifying partial payment.

**Default:** `0`.

**Examples:**
- `7` → each partial payment buys the client another week.
- `15` → each partial payment extends by ~half a month.
- `30` → essentially a fresh net-30 cycle every time they pay.

**Plain-English:** Pick a number that matches your patience. Most service businesses use 7 or 14. If you're under tight cash-flow pressure, leave **Auto-extend** off entirely.

### Payment Notifications

**What it does:** Sends an email each time a client makes a partial payment — both to you (admin) and to the client (receipt). Without this, partial payments happen silently and you have to log in to see them.

**Default:** Off.

**Recommended:** On. The email gives you (a) a real-time signal that payment arrived and (b) the client a paper trail showing the running balance.

**Common gotcha:** If you're using the **Email Enhancements** addon for branded HTML emails, partial-payment notifications use the same branding/template configuration — no extra setup needed.

## How it looks to the client

When the client opens the invoice's pay page:

1. They see the **invoice total** and **balance due** (which decreases as they pay).
2. The chosen payment-amount widgets render — buttons, percentages, or a custom field.
3. They click their preferred amount, get redirected to the gateway (Stripe, PayPal, etc.), and pay just that portion.
4. After payment, they're returned to the invoice page where the balance is updated.
5. They can come back any time and pay more until the balance reaches $0 — at which point the invoice is marked **Paid**.

## What gets tracked

Every partial payment creates its own **payment record** in **Easy Invoice → Payments** with:

- Amount paid
- Date and time
- Payment method (which gateway was used)
- Transaction ID from the gateway
- Link to the parent invoice

So your accounting view shows three $1,000 payments instead of one $3,000 lump sum, which is exactly what most accountants want.

## Pairs well with

- [Smart Reminders](./smart-reminders) — Reminders automatically respect the partial-payment balance, so a client who's paid 50% only gets chased for the remaining 50%.
- [Recurring Invoices](../recurring-invoices) — Recurring child invoices inherit your partial-payment settings, so subscription clients can pay each cycle in installments if you allow it.
- [Client Portal](./client-portal) — Logged-in clients can see all their partial payments at a glance, with a running balance per invoice.
- [Reports & Analytics](./reports) — The dashboard accounts for partial payments correctly when computing "outstanding" totals.

## Troubleshooting

**"The chooser isn't showing on the pay page"**
- Confirm the addon is **Active** in **Easy Invoice → Addons**.
- Confirm **Enable Partial Payments** in **Settings → Partial Payments** is on.
- At least one of **Fixed amounts**, **Percentage options**, or **Custom amount** must be enabled, with values configured if applicable.
- Hard-refresh the pay page (Ctrl+Shift+R or Cmd+Shift+R) to bypass any cached version.

**"A small payment is being rejected"**
The client's chosen amount is below your **Minimum Payment Amount**. Either lower the minimum or tell the client to pay at least that figure.

**"The invoice shows 'Paid' even though only partial amount came in"**
Some payment gateways report failures inconsistently. Check **Easy Invoice → Payments** to verify the gateway's transaction status. If the gateway says the payment succeeded for the partial amount, the invoice's balance should reflect that. If not, contact support — there may be a gateway-specific reconciliation issue.

**"Recurring invoices aren't honouring partial-payment settings"**
Recurring child invoices inherit settings from the **parent recurring invoice** at the moment they're generated. If you change partial-payment settings after the recurring schedule was created, only *future* child invoices pick up the new behaviour.

## Settings location

All Partial Payments configuration lives on **Easy Invoice → Settings**, in the **Partial Payments** section. There's no separate admin page.

## See also

- [Settings reference](../settings-reference) — every setting in one place
- [Payment gateways](../payment-settings) — make sure the gateway you use supports partial captures (most do)
- [Recurring Invoices](../recurring-invoices) — combine recurring schedules with partial-payment flexibility

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Partial Payments & Deposits is included free with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
