---
title: Smart Reminders & Late Fees (Pro addon)
description: Multi-step automated payment chase. Configure Day 0 → +3 → +7 → +14 reminders, auto-apply late fees after N days, and offer early-payment discounts. Single highest cash-flow ROI feature.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Professional plan</span>
  <span>Requires Easy Invoice Pro with a <strong>Professional</strong> (or Agency) license.</span>
</div>

# Smart Reminders & Late Fees

A multi-step dunning workflow on top of the basic "X days before due" reminder that already ships in Pro. Add steps, customize the email template per step, auto-apply a late fee after N days overdue, and optionally offer an early-payment discount.

## When to use it

- You're losing cashflow to overdue invoices
- You don't have time to manually chase clients
- You want fees / discounts handled consistently across every invoice

The single highest-ROI feature in the Pro plan. Typical recovery on previously-written-off invoices is 15–25% in the first month.

## How it differs from the built-in reminder

Easy Invoice Pro already ships a basic "remind me X days before due date" feature. **Smart Reminders adds three things that don't exist in core:**

| Feature | Core reminder | Smart Reminders addon |
|---|---|---|
| Steps | 1 (pre-due only) | Unlimited (pre + post due) |
| Per-step email template | No | Yes |
| Auto-apply late fee | No | Yes (% or flat) |
| Early-payment discount | No | Yes |
| "Run now" button | No | Yes |
| Per-invoice progress tracking | No | Yes (last step + late-fee flags) |

You can run both simultaneously — they don't conflict on cron hook names or meta keys.

## Enabling

1. **Easy Invoice → Addons**
2. Find **Smart Reminders & Late Fees**
3. Click **Activate**
4. Open via the **Settings →** link or navigate to **Easy Invoice → (sidebar) → Smart Reminders** (slug: `easy-invoice-addon-dunning`)

The addon registers one daily WP-Cron event: `easy_invoice_dunning_daily_tick`.

## Configuring the workflow

### Reminder Schedule

Each row in the schedule is one **step**. A step is "send this email to the client when the invoice is X days from its due date." Offset days are relative to the invoice's due date — negative = before, positive = after.

Default schedule shipped with the addon:

| Step | Offset | Tone |
|---|---|---|
| 1 | **-3 days** | "Friendly reminder — your invoice is due in 3 days" |
| 2 | **+1 day** | "Your invoice is overdue" |
| 3 | **+7 days** | "Second notice" |
| 4 | **+14 days** | "Final notice" |

Each step has a **Subject** and a **Body** with smart-tag interpolation. Available tags:

```
{{invoice_number}}   {{client_name}}   {{total_amount}}
{{due_date}}         {{invoice_url}}   {{company_name}}
```

Add as many steps as you want with **Add step**, reorder by changing offset values (rows are sorted on save). Each step fires **exactly once per invoice** — the addon records the last-sent step in `_easy_invoice_dunning_last_step` so a step is never re-sent.

### Late Fee

Auto-apply a fee after N days overdue:

| Option | Default | What it does |
|---|---|---|
| **Enable late fees** | off | Master switch |
| **Fee type** | `percent` | `percent` of invoice total, or `flat` currency amount |
| **Amount** | 5 | Percent (if `percent`) or flat currency (if `flat`) |
| **Apply after (days)** | 7 | Days overdue before the fee is calculated and stored |

The calculated fee is stored in invoice meta `_easy_invoice_late_fee_amount` and `_easy_invoice_late_fee_applied_at`. To surface it on the rendered invoice, the addon hooks two filters automatically:

```
easy_invoice_calculate_total     ⟶ adds fee to total
easy_invoice_extra_line_items    ⟶ appends fee as a line item
```

That means **the late fee shows up automatically on the invoice** — no extra wiring needed.

### Early-Payment Discount

Encourage clients to pay before due date:

| Option | Default | What it does |
|---|---|---|
| **Enable discount** | off | Master switch |
| **Discount percent (%)** | 2 | Percentage off |
| **Within (days of issue)** | 7 | Pay within N days of the **issue** date to qualify |

The discount is offered in your reminder emails (use a smart-tag in the body) and recorded as discount-related meta when honoured — full automation of discount enforcement requires payment-gateway integration and is on the roadmap.

## Running it

### Daily cron

The hook `easy_invoice_dunning_daily_tick` runs once per day. WP-Cron is "pseudo-cron" — it runs on real page loads, so a quiet site may run a day late. If you have real cron set up (`wp-cron.php` from system cron), the run is exactly on schedule.

### "Run now"

The **Run now** button (top-right of the addon page) calls the same `Service::runDailyTick()` synchronously. Useful when you've just changed the schedule and want to see immediate results. The redirect shows a banner like:

> Dunning run complete. Scanned 247 invoice(s) — sent 12 reminder(s), applied 3 late fee(s).

## Behaviour at scale

The tick is designed for thousands of invoices:

- **Batched query**: invoices are loaded 50 at a time (`posts_per_page=50`, `paged=N`). Never `posts_per_page=-1`.
- **SQL-level filter**: only invoices whose `_easy_invoice_due_date <= today + max_pre_offset_days` are loaded — the runner never touches paid invoices, cancelled invoices, or invoices whose first reminder is still weeks away.
- **Wall-clock budget**: by default 25 seconds. If the runner can't finish the queue in that time, it stops at a batch boundary and the next cron picks up where it left off (per-invoice progress is durable via `_easy_invoice_dunning_last_step`).
- **Per-invoice progress**: re-runs are idempotent — a step that already fired for an invoice is skipped.

Filters for tuning:

```php
// How many invoices to load per query (default 50)
add_filter('easy_invoice_dunning_batch_size', fn() => 100);

// How long each tick may run (default 25s)
add_filter('easy_invoice_dunning_tick_budget_seconds', fn() => 45);
```

## Permissions

Anyone with `manage_options` can use the addon. With **[Team Members & Audit Log](./team-roles)** enabled, every reminder send and fee application is logged.

## Hooks for developers

| Hook | Type | When |
|---|---|---|
| `easy_invoice_dunning_email_sent` `(invoice_id, step, recipient_email)` | action | Just after a reminder email is `wp_mail()`'d |
| `easy_invoice_dunning_late_fee_applied` `(invoice_id, fee, settings)` | action | Just after a late fee is stored on an invoice |
| `easy_invoice_dunning_after_tick` `(reminders_sent, fees_applied, scanned)` | action | End of every daily tick |
| `easy_invoice_dunning_batch_size` | filter | Override the per-batch invoice count |
| `easy_invoice_dunning_tick_budget_seconds` | filter | Override the tick wall-clock budget |

Example — Slack notification on every late fee:

```php
add_action('easy_invoice_dunning_late_fee_applied', function ($invoice_id, $fee, $settings) {
    $client = get_post_meta($invoice_id, '_easy_invoice_customer_name', true);
    $msg    = sprintf('Late fee of %.2f applied to invoice #%d (%s)', $fee, $invoice_id, $client);
    wp_remote_post('https://hooks.slack.com/services/…', [
        'body' => wp_json_encode(['text' => $msg]),
    ]);
}, 10, 3);
```

## Smart tag reference

The body and subject of each reminder step support these tags. They're interpolated server-side just before `wp_mail()`:

| Tag | Source |
|---|---|
| `{{invoice_number}}` | `_easy_invoice_number` meta, or `#{ID}` if missing |
| `{{client_name}}` | `_easy_invoice_customer_name` meta |
| `{{total_amount}}` | `_easy_invoice_total`, formatted with 2 decimals |
| `{{due_date}}` | `_easy_invoice_due_date`, formatted via the site's `date_format` |
| `{{invoice_url}}` | `get_permalink($invoice_id)` |
| `{{company_name}}` | `easy_invoice_company_name` option |

The body is run through `nl2br()` so plain-text newlines become `<br>`. HTML in the body is allowed (kept by `wp_kses_post` on save).

## Coexistence with the built-in Pro reminder

The basic Pro reminder uses cron hook `easy_invoice_send_payment_reminders` and option `easy_invoice_payment_reminder_settings`. Smart Reminders uses cron hook `easy_invoice_dunning_daily_tick` and option `easy_invoice_dunning_settings`. **No conflict** — but you might double-send if both are configured to email at the same offset. If you've enabled the addon, consider disabling the built-in reminder under **Settings → Email → Payment Reminder**.

## Troubleshooting

### "Run now" reports 0 reminders sent

Most common causes:

1. The schedule's offset has no step matching today's `today − due_date` for any invoice
2. Invoices are missing a `_easy_invoice_due_date` meta value
3. Invoices are already `paid` / `cancelled` / `refunded` (excluded by design)
4. Each matching step has already been sent for the matching invoice (per `_easy_invoice_dunning_last_step` meta)

The "Scanned N invoice(s)" count in the banner tells you how many invoices the SQL pre-filter let through — if Scanned is 0, your filter cut everything out (often a missing due date).

### Cron isn't firing

WP-Cron only runs when someone visits the site. Add real cron:

```cron
*/5 * * * * curl -fsS https://your-site.com/wp-cron.php?doing_wp_cron > /dev/null 2>&1
```

Then disable WP's built-in cron:

```php
// wp-config.php
define('DISABLE_WP_CRON', true);
```

See [Troubleshooting → WP-Cron](../troubleshooting#wp-cron).

### Late fee doesn't show on invoice

The fee writes to `_easy_invoice_late_fee_amount` meta and the addon's two filters surface it. If you've replaced the invoice render pipeline with a custom template, you may need to call those filters yourself:

```php
$total = apply_filters('easy_invoice_calculate_total', $base_total, $invoice_id);
$items = apply_filters('easy_invoice_extra_line_items', $items, $invoice_id);
```

## See also

- [Email & notifications](../email-settings) — base email config the reminders ride on
- [Payments](../payments) — how status flips to `paid` (which stops dunning)
- [Webhooks & Zapier Bridge](./webhooks) — fire a webhook when a reminder is sent
- [Addons overview](./)
