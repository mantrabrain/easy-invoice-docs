---
title: Accounting Sync — QuickBooks / Xero / FreshBooks (Pro addon)
description: Two-way sync between Easy Invoice and your accounting platform. Invoices push out when created; payment status pulls back when reconciled there.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Agency plan</span>
  <span>Requires Easy Invoice Pro with an <strong>Agency</strong> license. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Compare plans →</a></span>
</div>

# Accounting Sync

Stop re-entering invoices in your accounting tool. The Accounting Sync addon pushes every Easy Invoice document to **QuickBooks Online**, **Xero**, or **FreshBooks** automatically, and pulls payment status back when the invoice is reconciled there.

## When you need this

- You (or your accountant) run your books in **QuickBooks Online**, **Xero**, or **FreshBooks** and double-entry is killing you
- You're an **agency / bookkeeper** managing multiple clients and need each client's Easy Invoice to flow into their own accounting system
- You want **payment status reconciliation** between WordPress and your accounting tool without manual matching
- You issue invoices in **multiple currencies** and need the FX-correct line items to land in your books

## Architecture at a glance

```
┌──────────────────────┐
│  AccountingSyncAddon │  bootstrap, settings page, sync log,
└──────────┬───────────┘  queue dispatcher, manual-sync UI
           │
           ▼
┌──────────────────────┐
│   ProviderRegistry    │  pick the right provider for each row
└──────────┬───────────┘
           │
 ┌─────────┼─────────┬─────────────┐
 ▼         ▼         ▼             ▼
QuickBooks Xero   FreshBooks   (your provider here)
Provider   Provider Provider
           — each extends AbstractProvider
           — implements pushInvoice / pushPayment / handleInboundEvent
```

Every provider implements the same five operations (`authorizationUrl`, `exchangeCodeForTokens`, `refreshTokensIfNeeded`, `pushInvoice`, `pushPayment`) so the queue dispatcher and admin UI stay provider-agnostic.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Accounting Sync (QuickBooks / Xero / FreshBooks)**
3. Click **Activate**

The addon adds two pages to the in-app sidebar:

- **Accounting Sync** — pick provider, paste OAuth credentials, connect
- **Accounting Sync → Sync Log** — every sync attempt with status, retry button, error messages

A custom table `{prefix}_easy_invoice_accounting_sync` is created on first activation:

| Column | Notes |
|---|---|
| `provider`, `local_entity_type`, `local_entity_id`, `direction` | Composite unique key — one row per local entity per provider per direction. Re-queuing is idempotent. |
| `remote_entity_id` | The provider's ID after a successful sync. |
| `status` | pending / running / success / failed. |
| `attempts`, `next_attempt_at` | Exponential backoff: 0 → 5 min → 30 min → 2 hr → 12 hr → permanently failed (max 6 attempts). |
| `error_message` | Truncated to 1000 chars; shown in the log. |

## Setup — register your own OAuth app

Easy Invoice **never ships shared OAuth credentials** — that's the standard model for self-hosted WordPress plugins (same as every WooCommerce QuickBooks integration). You register a developer app once, paste in the credentials, and you own the connection.

### QuickBooks Online

1. Sign in at [Intuit Developer](https://developer.intuit.com/) and create a new app under **Apps → Create an app**.
2. Pick the **Accounting** scope.
3. Under **Keys & Credentials → Production**, copy the **Client ID** and **Client Secret**.
4. Under **Redirect URIs**, add: `{your-site}/wp-admin/admin-post.php?action=easy_invoice_acct_oauth_callback&provider=quickbooks`
5. Under **Webhooks**, paste the URL shown on the addon settings page, then copy the **Verifier Token** into the option `easy_invoice_acct_qbo_webhook_verifier` (Tools → Site Health → Info or via WP-CLI).

### Xero

1. Sign in at [Xero Developer](https://developer.xero.com/) and **Create a new app**.
2. Pick the **Web app** type.
3. Under **OAuth 2.0 Credentials**, copy the **Client ID** and **Client Secret**.
4. Add the redirect URI: `{your-site}/wp-admin/admin-post.php?action=easy_invoice_acct_oauth_callback&provider=xero`
5. Under **Webhooks**, paste the URL shown on the addon settings page, then copy the **Webhook signing key** into the option `easy_invoice_acct_xero_webhook_key`.

### FreshBooks

1. Sign in at [FreshBooks Developer](https://www.freshbooks.com/developers) and **Create new app**.
2. Pick scopes: `user:invoices:read`, `user:invoices:write`, `user:clients:write`, `user:payments:write`.
3. Copy the **Client ID** and **Client Secret**.
4. Add the redirect URI: `{your-site}/wp-admin/admin-post.php?action=easy_invoice_acct_oauth_callback&provider=freshbooks`
5. (Optional) Set the webhook secret into `easy_invoice_acct_freshbooks_webhook_secret` for inbound event verification.

## Connecting

1. On the **Accounting Sync** settings page, pick your provider radio.
2. Paste the **Client ID** and **Client Secret** from your provider's developer console.
3. Click **Save settings**.
4. Click **Connect to {Provider} →** — you'll be redirected to the provider's consent screen.
5. After granting access, you're redirected back to the settings page. The connection block shows the realm/tenant/account ID and token expiry.

Tokens are stored **encrypted at rest** in the WP options table, using AES-256-CBC + HMAC with a key derived from `wp_salt('secure_auth')`. Reading the DB without `wp-config.php` is not enough to recover them.

## How sync works

### Auto-push (default ON)

When Easy Invoice creates or updates an invoice (or records a payment), the addon listens on the canonical events:

- `easy_invoice_invoice_created` `(invoice_id)`
- `easy_invoice_invoice_updated` `(invoice_id)`
- `easy_invoice_payment_recorded` `(payment_id, invoice_id)`

…and enqueues a sync row. The queue dispatcher runs every 5 minutes via cron, claims pending rows in batches of 50, asks the right provider to push them, and persists success/failure.

### Manual push

The invoice editor has a **Sync to {Provider}** button (when an active provider is connected). Click it to trigger an immediate push via the AJAX endpoint `easy_invoice_acct_sync_one`. The button reports the remote ID on success or surfaces the API error inline on failure — no queue wait.

### Inbound webhooks (payment-status reconciliation)

Each provider hits a per-provider REST endpoint:

```
{your-site}/wp-json/easy-invoice/v1/accounting-sync/{provider}/webhook
```

The handler:

1. Verifies the provider's signature (HMAC-SHA256 with the verifier / signing key you configured).
2. Decodes the event.
3. Fires `do_action('easy_invoice_acct_{provider}_payment_event', $remote_id, $event_type, $payload)` so any extension (including the addon's own payment reconciler) can react.

If verification fails, the endpoint returns 401 immediately — no further processing happens.

## Retry & backoff

Failed sync rows are not silent. The dispatcher uses exponential backoff:

| Attempt | Wait |
|---|---|
| 1 | immediate |
| 2 | +5 min |
| 3 | +30 min |
| 4 | +2 hr |
| 5 | +12 hr |
| 6+ | permanently failed (surfaced in the Sync Log) |

Two buttons on the log page:

- **Run queue now** — fire the dispatcher immediately
- **Retry all failed** — reset every `failed` row to `pending` for one more attempt

## Customizing the payload

Each provider exposes filters so you can override the outgoing payload. Examples:

```php
// QuickBooks: map Easy Invoice client_id to your QBO customer ID.
add_filter('easy_invoice_acct_qbo_customer_ref', function ($customer_ref, $client_id, $invoice_id) {
    return get_user_meta($client_id, '_qbo_customer_id', true);
}, 10, 3);

// Xero: pick a different income account code per invoice.
add_filter('easy_invoice_acct_xero_default_account_code', function ($code) {
    return '4100'; // Consulting income
});

// FreshBooks: change the full payload right before send.
add_filter('easy_invoice_acct_freshbooks_invoice_payload', function ($payload, $invoice_id) {
    $payload['notes'] = 'Synced from Easy Invoice ' . get_bloginfo('url');
    return $payload;
}, 10, 2);
```

## Adding your own provider

The provider layer is registry-driven — register your own to support Sage, Wave, KashFlow, or any custom API:

```php
namespace MyPlugin;

use EasyInvoicePro\Addons\AccountingSync\Providers\AbstractProvider;

class SageProvider extends AbstractProvider {
    public function slug(): string  { return 'sage'; }
    public function label(): string { return 'Sage Accounting'; }

    public function authorizationUrl(string $callback_url): string { /* … */ }
    public function exchangeCodeForTokens(array $callback_args): void { /* … */ }
    public function refreshTokensIfNeeded(): void { /* … */ }
    public function verifyWebhookSignature(\WP_REST_Request $r): bool { /* … */ }
    public function handleInboundEvent(\WP_REST_Request $r): void { /* … */ }
    public function pushInvoice(int $invoice_id): string { /* … */ }
    public function pushPayment(int $payment_id): string { /* … */ }
}

add_filter('easy_invoice_accounting_sync_providers', function ($p) {
    $p['sage'] = new \MyPlugin\SageProvider();
    return $p;
});
```

The new provider automatically appears in the settings UI, the queue dispatcher routes to it, and the webhook URL `…/accounting-sync/sage/webhook` is live.

## Hooks reference

| Hook | When |
|---|---|
| `easy_invoice_acct_sync_success` `(row, remote_id)` | A sync row completed successfully |
| `easy_invoice_acct_sync_failure` `(row, exception)` | A sync attempt threw; row will retry per backoff |
| `easy_invoice_acct_qbo_invoice_payload` `(payload, invoice_id)` | Filter the outgoing QBO Invoice payload |
| `easy_invoice_acct_qbo_payment_payload` `(payload, payment_id)` | Filter the outgoing QBO Payment payload |
| `easy_invoice_acct_qbo_customer_ref` `(value, client_id, invoice_id)` | Override the QBO Customer ref |
| `easy_invoice_acct_qbo_default_item_ref` `(value)` | Override the QBO line-item Item ref |
| `easy_invoice_acct_xero_invoice_payload` `(payload, invoice_id)` | Filter the outgoing Xero Invoice payload |
| `easy_invoice_acct_xero_payment_payload` `(payload, payment_id)` | Filter the outgoing Xero Payment payload |
| `easy_invoice_acct_xero_contact_id` `(value, client_id, invoice_id)` | Override the Xero ContactID |
| `easy_invoice_acct_xero_default_account_code` `(value)` | Override the Xero income-account code |
| `easy_invoice_acct_freshbooks_invoice_payload` `(payload, invoice_id)` | Filter the outgoing FreshBooks invoice payload |
| `easy_invoice_acct_freshbooks_payment_payload` `(payload, payment_id)` | Filter the outgoing FreshBooks payment payload |
| `easy_invoice_acct_qbo_payment_event` `(remote_id, operation, entity)` | Inbound QBO webhook for a Payment entity |
| `easy_invoice_acct_xero_invoice_event` `(remote_id, type, event)` | Inbound Xero webhook for an INVOICE event |
| `easy_invoice_acct_freshbooks_event` `(name, object_id, payload)` | Inbound FreshBooks webhook (any event) |
| `easy_invoice_accounting_sync_providers` | Filter to register additional providers |

## See also

- [Webhooks & Zapier Bridge](./webhooks) — for non-accounting destinations
- [Team Members & Audit Log](./team-roles) — every sync attempt is auditable

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Accounting Sync is part of the Agency tier. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Upgrade to Agency →</a></span>
</div>
