---
title: Recurring & Subscription invoices (Pro)
description: Automatic recurring invoices and subscription billing in Easy Invoice Pro — set the frequency, let WordPress cron generate new invoices, optionally auto-send, with pause / resume / cancel.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span>Recurring and Subscription invoices are <strong>Easy Invoice Pro</strong> features. <a href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener">Upgrade to Easy Invoice Pro →</a></span>
</div>

# Recurring & Subscription invoices

Use **recurring invoices** when you bill the same client on a schedule — monthly retainer, yearly hosting, quarterly maintenance, etc. Easy Invoice Pro generates each new invoice **automatically** via WordPress cron and (optionally) emails it to the client.

## Recurring vs Subscription — what's the difference?

| Feature | **Recurring** | **Subscription** |
| --- | --- | --- |
| Triggers | New invoice on a schedule | New invoice + payment auto-charge |
| Best for | "Send me the bill, I'll pay it" | "Bill me and just charge my card" |
| Requires gateway support | No — works with all gateways | Yes — works with Stripe / Authorize.Net |
| Trial period | No | Yes |
| Maximum cycles | Yes (optional cap) | Yes (optional cap) |
| Client-side review | No — auto-generated | Optional — client can edit amount each cycle |

Enable each module independently:

- **Recurring** → **Easy Invoice → Settings → Invoice → Enable Recurring Invoices**
- **Subscription** → set in the per-invoice subscription section (requires Pro license tier that includes it)

---

## 1. Enable the engine

Open **Easy Invoice → Settings → Invoice** and tick **Enable Recurring Invoices**. Save.

This unlocks the **Recurring** section inside each invoice's builder.

---

## 2. Make any invoice recurring

1. Build a normal invoice (see [Invoices walkthrough](./invoices)).
2. Inside the builder, find the **Recurring** section.
3. Tick **Enable Recurring**.
4. Configure:

| Field | What it does |
| --- | --- |
| **Frequency** | `day` / `month` / `year` |
| **Interval** | Number of frequency units — e.g. Frequency=month, Interval=3 ⇒ every 3 months (quarterly). |
| **Start Date** | First generation date. Defaults to today. |
| **End Date / Max Cycles** | (Optional) Stop after N invoices or a specific date. |
| **Auto-send to client** | Email each new generated invoice automatically. |
| **Status** | `active` / `paused` / `cancelled` (set later from the Recurring list). |

5. Publish the invoice. From now on, the cron generates new child invoices on the schedule.

---

## 3. The Recurring dashboard

Open **Easy Invoice → All Invoices** and filter by **Recurring** (a star icon in the title indicates parent invoices). You can:

- **Pause** — stop generation until you resume
- **Resume** — restart
- **Cancel** — stop permanently
- **Manual trigger** — generate the next child invoice now (useful for testing)

Each parent invoice keeps a **history** of every child invoice it has created.

---

## 4. Subscription invoices

Same idea as Recurring but with **auto-charging** the client's card. Setup:

1. Open **Easy Invoice → Settings → Invoice → Subscription Invoices** (visible only with a compatible Pro license tier and after enabling subscriptions globally).
2. On the invoice builder, find the **Subscription** section. Configure:
   - **Frequency** + **Interval**
   - **Trial enabled** + **Trial days** + **Trial amount** (e.g. $0 for 14 days)
   - **Variable amount** — let the client review and edit each cycle's amount before charge
   - **Maximum cycles** — stop after N successful charges

3. The client's first payment **saves their card** via the gateway (Stripe / Authorize.Net). Subsequent cycles auto-charge.

> **Why two engines instead of one?** Subscriptions require gateway support for stored-card charging, which not every Pro user has. Recurring works with any gateway (PayPal, Bank Transfer, even Manual) because the client manually pays each invoice as it's generated.

---

## 5. Cron — make sure it runs

Recurring + Subscription rely on **WordPress cron** firing at least once per day. WordPress runs cron on each page hit by default, which is unreliable on low-traffic sites.

**For reliability:**

1. In `wp-config.php` add: `define('DISABLE_WP_CRON', true);`
2. Add a real server cron job hitting `https://yoursite.com/wp-cron.php` every 15 minutes:
   ```
   */15 * * * * curl -s https://yoursite.com/wp-cron.php > /dev/null
   ```

Otherwise, recurring invoices may generate hours or days late.

---

## 6. Tips for new users

- **Test with a +1 day Interval first.** Make a fake recurring invoice with Frequency=day, Interval=1, then check tomorrow that a new child invoice was created.
- **Auto-send is powerful — and risky.** Don't enable auto-send until you've manually triggered at least one child invoice and confirmed it looks right.
- **Pause before cancelling.** Cancelling is permanent. Pausing keeps history and lets you resume next month.

---

## Combining with other Pro features

| Combined with | Effect |
| --- | --- |
| **Partial payments** | Each generated invoice supports installments. |
| **Deposit invoices** | Each cycle creates a deposit + balance pair. |
| **Payment reminders** | Reminders apply to every generated child. |
| **Client portal** | Clients see all generated invoices in one place. |

---

## Next

- [Payment gateways (needed for Subscriptions)](./payment-settings)
- [Client portal](./clients)
- [Settings reference (recurring fields)](./settings-reference#pro-only-invoice-settings)
