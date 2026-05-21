---
title: Webhooks & Zapier Bridge (Pro addon)
description: Stream Easy Invoice events (invoice.paid, quote.accepted, payment.recorded, etc.) to any URL. HMAC-SHA256 signed, async via cron, retried with exponential backoff, SSRF-protected. Works with Zapier "Catch Webhook", Make.com, n8n, or any custom endpoint.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Agency plan</span>
  <span>Requires Easy Invoice Pro with an <strong>Agency</strong> license.</span>
</div>

# Webhooks & Zapier Bridge

Subscribe any HTTPS URL to Easy Invoice events. The addon dispatches **non-blocking** HMAC-signed POSTs to your target, retries on failure, and logs every attempt. Designed to plug straight into Zapier's "Catch Webhook" trigger — no Zapier app submission required — but works with anything that accepts JSON.

## When to use it

- You want invoice / quote / payment events to flow into Zapier, Make.com, n8n, or your CRM
- You want to send a Slack message when an invoice is paid
- You want to push billing data into HubSpot, Pipedrive, Mailchimp, Asana, Google Sheets — anywhere webhook-able

## Enabling

1. **Easy Invoice → Addons** → activate **Webhooks & Zapier Bridge**
2. Settings open at **Easy Invoice → (sidebar) → Webhooks** (slug: `easy-invoice-addon-webhooks`)

On first activation the addon creates two custom tables:

```
{prefix}_easy_invoice_webhooks      ← subscriptions
{prefix}_easy_invoice_webhook_log   ← delivery attempts
```

Both are kept on deactivation (re-enabling restores all subscriptions).

The addon schedules two WP-Cron events on bootstrap:

- `easy_invoice_webhooks_retry_tick` — hourly. Picks up failed deliveries and retries them.
- `easy_invoice_webhook_send_one` — one-shot per delivery. Scheduled by `Dispatcher::dispatch()` with the log id as arg.

## Catalog of events

15 events out of the box. The list is filterable via `easy_invoice_webhook_events` for custom events.

### Invoice events

| Event | Fires when |
|---|---|
| `invoice.created` | `save_post_easy_invoice` (with `$update=false`) — new invoice published |
| `invoice.updated` | `save_post_easy_invoice` (with `$update=true`) — existing invoice saved |
| `invoice.sent` | Email sent to client (currently fires alongside `invoice.updated` when status flips to `available`) |
| `invoice.paid` | `easy_invoice_payment_completed` AND `_easy_invoice_status === 'paid'` |
| `invoice.overdue` | Status flips to `overdue` (cron-driven) |
| `invoice.deleted` | `before_delete_post` for post_type `easy_invoice` |

### Quote events

| Event | Fires when |
|---|---|
| `quote.created` | `save_post_easy_invoice_quote` (new) |
| `quote.accepted` | `easy_invoice_service_quote_accepted` |
| `quote.declined` | `easy_invoice_service_quote_declined` |
| `quote.expired` | `easy_invoice_quote_expired` (daily cron) |

### Payment events

| Event | Fires when |
|---|---|
| `payment.recorded` | `easy_invoice_payment_completed` |
| `payment.refunded` | (planned — core hook in progress) |
| `payment.failed` | (planned — core hook in progress) |

### Other events

| Event | Fires when |
|---|---|
| `client.created` | User with role `customer` is registered |
| `recurring.charged` | `easy_invoice_pro_recurring_invoice_created` — recurring template generated a child invoice |

## Subscribing a URL

In the **Subscriptions** tab → **Add webhook**:

| Field | Required | What it does |
|---|---|---|
| **Label** | optional | Friendly name for the row; defaults to the URL hostname |
| **Target URL** | **required** | Where to POST. Must pass the [SSRF gate](#ssrf-protection). |
| **Secret** | optional | Used to sign each request (HMAC-SHA256). Auto-generated 32-char password if blank. |
| **Events** | **required** | Tick checkboxes grouped by domain (invoice / quote / payment / client / recurring) |

Save. The webhook is **Active** immediately. Click **Test** on the row to fire a synthetic `webhook.test` event — check the **Delivery Log** tab to see the result.

## Payload format

Every delivery is a `POST` with a JSON body shaped like:

```json
{
  "event":   "invoice.paid",
  "site":    "https://example.com/",
  "sent_at": "2026-05-16T10:00:00+05:45",
  "data": {
    "invoice_id":      123,
    "invoice_number":  "INV-000123",
    "status":          "paid",
    "total":           1250.00,
    "subtotal":        1250.00,
    "currency":        "USD",
    "client_id":       42,
    "customer_name":   "Acme Corp",
    "customer_email":  "billing@acme.com",
    "issue_date":      "2026-05-01",
    "due_date":        "2026-05-15",
    "public_url":      "https://example.com/invoice/inv-000123/"
  }
}
```

Quote payloads have the same shape with `quote_id`, `quote_number`, `quote_status` etc. Payment events extend the invoice payload with `amount`, `payment_method`, `gateway_name`, `transaction_id`.

## Headers we send

| Header | Example | Use |
|---|---|---|
| `Content-Type` | `application/json` | Always |
| `User-Agent` | `EasyInvoice-Webhook/1.0` | For request logging on your side |
| `X-EI-Event` | `invoice.paid` | The event name — handy when one endpoint subscribes to many events |
| `X-EI-Timestamp` | `1715847600` | Unix timestamp at signing time (used inside the HMAC payload) |
| `X-EI-Signature` | `sha256=abc1234…` | HMAC-SHA256 of `timestamp + "." + body` keyed with your secret |
| `X-EI-Webhook-Id` | `7` | Internal id of the subscription that fired |

## Verifying signatures

Always verify on your receiver — it's the only way to prove the request came from your Easy Invoice install (and not a random internet bot finding your webhook URL).

### Node.js

```js
const crypto = require('crypto');
function verify(req, secret) {
  const sig = (req.header('X-EI-Signature') || '').replace('sha256=', '');
  const ts  = req.header('X-EI-Timestamp');
  const body = req.rawBody.toString('utf8');
  const expected = crypto.createHmac('sha256', secret)
                         .update(ts + '.' + body)
                         .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
```

### PHP

```php
function verify_ei_webhook($body, $headers, $secret) {
  $sig = preg_replace('/^sha256=/', '', $headers['X-EI-Signature'] ?? '');
  $ts  = $headers['X-EI-Timestamp'] ?? '';
  $expected = hash_hmac('sha256', $ts . '.' . $body, $secret);
  return hash_equals($expected, $sig);
}
```

### Python

```python
import hmac, hashlib
def verify(body: bytes, headers: dict, secret: str) -> bool:
    sig = headers.get('X-EI-Signature', '').replace('sha256=', '')
    ts  = headers.get('X-EI-Timestamp', '')
    expected = hmac.new(secret.encode(), (ts + '.' + body.decode()).encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, sig)
```

### Replay-window check (recommended)

The `X-EI-Timestamp` is included in the HMAC payload so an attacker can't replay an intercepted request with a different body. To also reject **stale** requests (i.e., re-played later), check the timestamp:

```js
const now = Math.floor(Date.now() / 1000);
const ts  = parseInt(req.header('X-EI-Timestamp'), 10);
if (Math.abs(now - ts) > 300) {                   // 5-minute window
  return res.status(401).send('stale request');
}
```

## Retry policy

A non-2xx response (or a connection error) marks the delivery as `retry` and schedules a re-attempt with **exponential backoff**:

| Attempt | Delay (after the previous attempt) |
|---|---|
| 2 | ~2 minutes |
| 3 | ~8 minutes |
| 4 | ~32 minutes |
| 5 | ~2 hours |
| 6+ | (none — marked `failed`) |

Max **5 total attempts**. After that the row's status is `failed` and the `easy_invoice_webhook_failed` action fires (so you can hook it for alerting). The hourly retry cron `easy_invoice_webhooks_retry_tick` picks up due retries.

## SSRF protection

The Dispatcher refuses to send to any URL whose hostname resolves to:

- Loopback: `127.0.0.1`, `::1`, `localhost`, `0.0.0.0`
- Cloud metadata: `169.254.169.254` (AWS/Azure/OpenStack), `metadata.google.internal` (GCP)
- Any private RFC1918 range (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`)
- Any link-local range (`169.254.0.0/16`)
- Non-`http(s)` schemes (`file://`, `gopher://`, etc.)

The gate runs **at write time** (the Subscriptions form refuses to save a blocked URL) AND **at dispatch time** (in case a URL was edited later). Blocked deliveries are logged with status `failed` and reason `Blocked: target URL not allowed`.

To **allow private URLs** on an intranet install:

```php
add_filter('easy_invoice_webhook_allow_private', '__return_true');
```

You **own** that risk — only enable on installs where webhooking an internal hostname is intentional and your network is trusted.

## Async delivery (non-blocking)

`Dispatcher::dispatch()` does not POST inline. It:

1. Records the payload in the log table with status `queued`
2. Schedules a one-shot WP-Cron event `easy_invoice_webhook_send_one` with the log id
3. Returns immediately

The user's request that triggered the event (e.g. saving an invoice) is **not blocked** by the webhook POST. The cron worker fires the POST, updates the log row, and (if needed) schedules a retry.

::: tip Cron health
WP-Cron is pseudo-cron — it runs on real page loads. On a quiet site a delivery may be delayed by minutes. For real-time delivery, configure system cron:
```cron
*/1 * * * * curl -fsS https://your-site.com/wp-cron.php?doing_wp_cron > /dev/null 2>&1
```
And disable WP's built-in cron in `wp-config.php`:
```php
define('DISABLE_WP_CRON', true);
```
:::

## Delivery log

The **Delivery Log** tab shows the most recent 150 attempts across all webhooks. Each row:

- **When** — wall clock
- **Webhook** — label or `#id`
- **Event** — e.g. `invoice.paid`
- **Status** — `queued` / `success` / `retry` / `failed` / `cancelled`
- **HTTP** — response code (200, 404, 500, …)
- **Attempts** — how many tries so far

Status colour-coding:

- 🟢 `success` — green
- 🔵 `queued` / `pending` — blue
- 🟡 `retry` — amber
- 🔴 `failed` — red
- ⚪ `cancelled` — grey (webhook was deleted / paused mid-retry)

### Log size cap

To prevent a flapping webhook from filling the database, the log is pruned automatically to a maximum of 5,000 rows (configurable). Pruning runs at most once every 6 hours via a transient flag.

```php
// Override default 5000-row cap
add_filter('easy_invoice_webhook_log_max', fn() => 20000);
```

### Clearing the log

The **Clear log** button truncates the log table. Subscriptions are untouched.

## Pause / Resume / Delete

Each row in the subscriptions list has three actions:

- **Test** — fire a synthetic `webhook.test` event to confirm reachability
- **Pause** / **Resume** — flip the `is_active` flag without deleting the subscription
- **Delete** — remove the subscription **and** its log rows (cascade)

## Zapier walkthrough

1. In Zapier, create a new Zap
2. Trigger app: **Webhooks by Zapier** → trigger event: **Catch Hook**
3. Zapier gives you a URL like `https://hooks.zapier.com/hooks/catch/123456/abcd/`
4. Back in Easy Invoice → Webhooks → **Add webhook**:
   - Paste that URL into **Target URL**
   - Pick the events to forward
   - Save
5. In Easy Invoice, click **Test** on the new row
6. Zapier should now show the test payload — proceed with field mapping and the rest of your Zap

::: tip Why not a published Zapier app?
A custom Zapier app requires a developer account and Zapier's review process. Catch Hook works exactly the same for the trigger side, with zero approval overhead. (Custom "Actions" in Zapier — e.g. "Create invoice from new HubSpot Deal" — would need a Zapier app and aren't in the addon's scope. Use Make.com / n8n / a small PHP script for that.)
:::

## Make.com / n8n

Same flow as Zapier:

- **Make.com** — module `Webhooks → Custom webhook` → copy the URL → paste into Easy Invoice
- **n8n** — node `Webhook` (trigger) → set `Webhook URL` → paste into Easy Invoice

## Hooks for developers

| Hook | Type | When |
|---|---|---|
| `easy_invoice_webhook_events` | filter | Add custom event names to the catalog |
| `easy_invoice_webhook_allow_private` | filter | Allow private/loopback URLs (intranet) |
| `easy_invoice_webhook_log_max` | filter | Cap the delivery log size |
| `easy_invoice_webhook_delivered` `(hook, event, http_code)` | action | A delivery just succeeded |
| `easy_invoice_webhook_failed` `(hook, event, http_code, body)` | action | A delivery exhausted retries |
| `easy_invoice_webhook_blocked` `(hook, event, reason)` | action | A delivery was blocked by SSRF gate |
| `easy_invoice_mc_rates_refreshed` `(base, rates)` | action | (Multi-Currency, unrelated) |

### Emit a custom event from your code

```php
use EasyInvoicePro\Addons\Webhooks\EventBridge;

EventBridge::emit('my_plugin.something_happened', [
    'something' => 'value',
    'count'     => 42,
]);
```

The event will be dispatched to every subscription that includes `my_plugin.something_happened` in its events list (add it to the catalog via the `easy_invoice_webhook_events` filter so users can tick it in the UI).

## Common scenarios

### "Post to Slack when an invoice is paid"

1. In Slack: Apps → **Incoming Webhooks** → create one for `#billing`. Copy the URL.
2. **You'll need a transformer** — Slack expects `{"text":"…"}`, not Easy Invoice's payload shape. Use Zapier or a tiny serverless function as the intermediary.

In Zapier:

- Trigger: Catch Hook (Easy Invoice → Webhooks → subscribe to `invoice.paid` → paste the Zapier URL)
- Action: Slack → Send Channel Message → format the text with Zapier's "Formatter" using the invoice payload fields

### "Sync paid invoices to Google Sheets"

- Zapier → trigger: Catch Hook (subscribe to `invoice.paid`)
- Zapier → action: Google Sheets → Create Spreadsheet Row
- Map `data.invoice_number`, `data.total`, `data.customer_name`, `data.public_url` to columns

### "Create a HubSpot deal when a quote is accepted"

- Zapier → trigger: Catch Hook (subscribe to `quote.accepted`)
- Zapier → action: HubSpot → Create Deal
- Map `data.customer_email` to contact lookup, `data.total` to deal value

## Troubleshooting

### "Test" shows `queued` and never delivers

WP-Cron isn't running. Either:

1. Visit a real page on the site (`/`) — that triggers pseudo-cron
2. Set up system cron (see [#async-delivery](#async-delivery-non-blocking))
3. Manually run `wp cron event run easy_invoice_webhook_send_one` (WP-CLI)

### Delivery shows `failed` with `Blocked: target URL not allowed`

Your target URL resolves to a private/loopback/cloud-metadata range. Either:

1. Use a public URL
2. On an intranet, add the `easy_invoice_webhook_allow_private` filter (see [#ssrf-protection](#ssrf-protection))

### Delivery shows `failed` with HTTP code 200

The dispatcher only treats 2xx as success. If your receiver returns 200 but the body indicates failure, that's still a success here. Configure your receiver to return 4xx/5xx for failures so retries kick in.

### Signature verification fails

- Confirm you're using the **raw body** (not parsed JSON) in the HMAC
- Confirm you're using the **timestamp from the header**, not your own clock
- Confirm the secret matches exactly (Easy Invoice stores it in plaintext so you can verify it — see the **Subscriptions** tab settings)

### Duplicate deliveries on the same event

The addon dedupes save events within a single request, but the same event firing in two separate requests will produce two webhook deliveries. If your receiver is non-idempotent, use the `data.invoice_id` + `event` combination as an idempotency key on your side.

## Roadmap

- REST API for reading invoices / quotes (currently webhooks-out only)
- Per-event filter on the subscription (e.g. only fire `invoice.paid` for invoices > $1000)
- Webhook signing with rotating secrets
- Webhook health dashboard (failure-rate graph per subscription)

## See also

- [Hooks & filters reference](../hooks-filters)
- [Team Members & Audit Log](./team-roles) — log every dispatch + outcome in addition to the webhook table
- [Smart Reminders & Late Fees](./smart-reminders) — pair with webhooks to notify Slack when a reminder is sent
- [Addons overview](./)
