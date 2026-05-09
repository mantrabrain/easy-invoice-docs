---
title: AJAX & webhooks
description: Easy Invoice doesn't expose a custom REST API. It uses WordPress's admin-ajax.php for internal AJAX and exposes gateway-specific webhook URLs (Stripe, Mollie, Square, Authorize.Net).
---

# AJAX & webhooks

Easy Invoice **does not register custom REST routes**. There are no `/wp-json/easy-invoice/v1/...` endpoints. Instead, the plugin uses two transports:

1. **`admin-ajax.php`** for in-page AJAX (search, save, send, mark paid, generate PDF).
2. **Gateway webhooks** for asynchronous payment notifications (Stripe, Mollie, Square, Authorize.Net) — also routed through `admin-ajax.php`.

If you're integrating Easy Invoice with another system, work via [hooks & filters](/hooks-filters) plus `wp_remote_post` against `admin-ajax.php`, or skip the HTTP layer entirely and call PHP services in-process.

## admin-ajax actions

Each `wp_ajax_<action>` is the logged-in version; `wp_ajax_nopriv_<action>` is for non-logged-in (mostly gateway webhooks).

### Invoice & quote management (logged-in only)

| Action | Method | Caps | Purpose |
| --- | --- | --- | --- |
| `easy_invoice_save_invoice` | POST | `manage_options` | Save the invoice builder state. |
| `easy_invoice_save_quote` | POST | `manage_options` | Save the quote builder state. |
| `easy_invoice_send_invoice` | POST | `manage_options` | Trigger the invoice email. |
| `easy_invoice_send_quote` | POST | `manage_options` | Trigger the quote email. |
| `easy_invoice_delete_invoice` | POST | `manage_options` | Soft-delete (trash) an invoice. |
| `easy_invoice_duplicate_invoice` | POST | `manage_options` | <span class="pro-pill">PRO</span> Clone an invoice. |
| `easy_invoice_search_clients` | POST | `edit_posts` | Autocomplete in the client field. |
| `easy_invoice_search_invoices` | POST | `manage_options` | Autocomplete on the payment form. |
| `easy_invoice_search_items` | POST | `manage_options` | <span class="pro-pill">PRO</span> Autocomplete from Item Library. |

All of the above are nonce-protected — pass `_wpnonce` (the admin script localizes one for you).

### Reports

| Action | Method | Purpose |
| --- | --- | --- |
| `easy_invoice_reports_data` | GET | Returns Chart.js-ready data for a date range. |

### Quote accept / decline (visitor-facing)

| Action | Method | Auth | Purpose |
| --- | --- | --- | --- |
| `easy_invoice_quote_accept` | POST | Public (token-gated) | Visitor accepts a quote. |
| `easy_invoice_quote_decline` | POST | Public (token-gated) | Visitor declines a quote. |

These accept a one-time token in the URL — you should call them via the **Accept / Decline** buttons on the public quote page, not directly.

## Gateway webhooks

Each Pro gateway registers a webhook hook so the gateway can call back when a payment status changes asynchronously.

### Stripe

```
POST https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_stripe_webhook
```

- Configure in Stripe dashboard → **Developers → Webhooks → Add endpoint**.
- Events to subscribe: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`.
- Stripe sends a `Stripe-Signature` header; Easy Invoice verifies it against your **Signing secret**.

### Mollie

```
POST https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_mollie_webhook
```

- Mollie posts a `payment_id`; Easy Invoice fetches the payment via Mollie's API to verify status.

### Square

```
POST https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_square_webhook
```

- Configure in Square dashboard → **Apps → Webhook subscriptions**.
- Events: `payment.created`, `payment.updated`, `refund.created`.
- A 15-minute reconcile cron (`easy_invoice_check_pending_square_payments`) fills in any webhook the listener missed.

### Authorize.Net

```
POST https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_authorizenet_response
```

- This is the **Relay Response URL** you set in Authorize.Net's Silent Post.
- Easy Invoice verifies the MD5 hash if you've set one in the gateway settings.

### Bank Transfer / Cheque / Cash / Manual

These have **no webhooks** — the admin marks the Payment record as completed manually after the funds arrive (see [Payments](/payments)).

## Authentication notes

- **admin-ajax** logged-in actions: WordPress cookie + nonce. Use `wp_create_nonce('easy_invoice_admin')` and pass as `_wpnonce` POST field.
- **Gateway webhooks**: each gateway uses its own signature scheme (Stripe header, Mollie API check, Authorize.Net hash). Easy Invoice handles verification.

## Programmatic alternative: in-process PHP

If you're inside the same WordPress install (custom plugin / theme code), skip HTTP entirely:

```php
// Get an invoice
$invoice = new \EasyInvoice\Models\Invoice( $invoice_id );

// Mark as paid
$invoice->set_payment_status( 'completed' );
$invoice->save();

// Trigger the receipt email
do_action( 'easy_invoice_payment_completed', $payment_id );
```

This is faster, doesn't need nonces, and respects every filter/hook automatically.

## What about a "real" REST API?

If you need a true `/wp-json/easy-invoice/v1/invoices` endpoint, you can add one yourself in a small mu-plugin that wraps the existing services:

```php
add_action( 'rest_api_init', function () {
    register_rest_route( 'easy-invoice/v1', '/invoices/(?P<id>\d+)', [
        'methods'             => 'GET',
        'callback'            => function ( $request ) {
            $invoice = new \EasyInvoice\Models\Invoice( $request['id'] );
            return rest_ensure_response( $invoice->to_array() );
        },
        'permission_callback' => function () {
            return current_user_can( 'manage_options' );
        },
    ] );
} );
```

Apply the `easy_invoice_model_to_array` filter to control what's returned.

## Rate limits & caching

- `admin-ajax.php` is **uncached** by default (most caching plugins exclude it).
- No built-in rate limit — protect with **Cloudflare** / **WP Hide / Login Lockdown** if you expose webhooks publicly.

## Where to go next

- 🪝 [Hooks & filters](/hooks-filters) — extend behaviour in-process.
- 💳 [Payment gateways](/payment-settings) — gateway-specific webhook URLs.
- 🛠️ [Troubleshooting → Webhooks](/troubleshooting#webhook-not-received).
