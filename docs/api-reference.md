---
title: REST API, AJAX & webhooks
description: Easy Invoice exposes an authenticated REST API at easy-invoice/v1 for invoices, quotes, clients and PDFs, uses admin-ajax.php for its own screens, and listens on gateway-specific webhook URLs (Stripe, Mollie, Square, Authorize.Net).
---

# REST API, AJAX & webhooks

Easy Invoice has three HTTP surfaces:

1. **REST API** at `/wp-json/easy-invoice/v1/` — the one to build integrations on. Added in 2.4.0.
2. **`admin-ajax.php`** for the plugin's own in-page AJAX (search, save, send, mark paid, generate PDF). Internal; expect it to change.
3. **Gateway webhooks** for asynchronous payment notifications (Stripe, Mollie, Square, Authorize.Net) — also routed through `admin-ajax.php`.

If you are inside the same WordPress install, skip HTTP and call the PHP services in-process (see the end of this page).

## REST API

Base URL: `https://yoursite.com/wp-json/easy-invoice/v1/`

### Authentication

Every route needs a signed-in user — **there are no public routes**. Use any standard WordPress REST authentication:

- **Application passwords** (WordPress 5.6+): Users → Profile → *Application Passwords*. Send them as HTTP Basic auth. This is the right choice for mobile apps, headless front-ends and server-to-server calls.
- **Cookie + nonce** from inside a logged-in browser session (pass the `X-WP-Nonce` header).

Each route checks the same `ei_*` capability as the matching admin screen, so a user with the EI Viewer role gets read access and nothing more, and the [Team Roles](/addons/team-roles) addon applies unchanged. An unauthenticated call gets `401 easy_invoice_rest_unauthenticated`; a signed-in user without the capability gets `403 easy_invoice_rest_forbidden`.

### Routes

| Route | Method | Capability | Purpose |
| --- | --- | --- | --- |
| `/invoices` | GET | `ei_view_invoices` | List invoices (`page`, `per_page` ≤ 100, `search`). |
| `/invoices` | POST | `ei_create_invoice` | Create an invoice. |
| `/invoices/{id}` | GET | `ei_view_invoices` | One invoice. |
| `/invoices/{id}` | DELETE | `ei_delete_invoice` | Move an invoice to the trash. |
| `/invoices/{id}/pdf` | GET | `ei_view_invoices` | The invoice as a PDF file (`application/pdf`, server-rendered). |
| `/quotes` | GET | `ei_view_quotes` | List quotes (`page`, `per_page`, `search`). |
| `/quotes/{id}` | GET | `ei_view_quotes` | One quote. |
| `/clients` | GET | `ei_view_clients` | List clients (`page`, `per_page`, `search`). |

List responses carry the usual `X-WP-Total` and `X-WP-TotalPages` headers. An id that does not exist — or belongs to a different kind of document — is a `404 easy_invoice_rest_not_found`.

`DELETE` trashes rather than erases, exactly as the admin screen does: an invoice is a financial record, and an issued one [cannot be deleted permanently](/invoices#_9-the-invoice-list) by any route.

### Invoice representation

```json
{
  "id": 20,
  "number": "INV-000002",
  "title": "Web Design",
  "status": "available",
  "viewed": { "count": 2, "first": "2026-09-01 10:12:00", "last": "2026-09-10 08:40:00" },
  "issue_date": "2026-08-01",
  "due_date": "2026-08-31",
  "customer": { "name": "Rigel Vaughn", "email": "rigel@example.com", "country": "NP", "vat": "" },
  "totals": {
    "subtotal": 430, "discount": 0, "tax": 0, "total": 430,
    "paid": 0, "credited": 0, "due": 430
  },
  "items": [
    { "name": "Design", "description": "", "quantity": 1, "price": 430, "amount": 430, "taxable": true }
  ],
  "links": { "pdf": "https://yoursite.com/wp-json/easy-invoice/v1/invoices/20/pdf" },
  "tax_treatment": { "category": "standard", "statement": "" }
}
```

`status` is the stored workflow status (`draft`, `available`, `partial`, `paid`, `unpaid`, `cancelled`); whether an invoice is *overdue* is derived from `due_date` and `totals.due`, just as the admin list does. `totals.paid` sums completed payments, `totals.credited` sums credit notes, and `totals.due` is what is still owed.

The per-document access key that makes the public payment link work is a bearer credential and is **never** included in a response.

### Creating an invoice

```bash
curl -u "apiuser:xxxx xxxx xxxx xxxx xxxx xxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Design",
    "client_id": 21,
    "due_date": "2026-10-01",
    "terms": "Net 30",
    "items": [ { "name": "Design", "quantity": 1, "price": 430 } ]
  }' \
  https://yoursite.com/wp-json/easy-invoice/v1/invoices
```

| Field | Notes |
| --- | --- |
| `items` | Required. Each item takes `name`, `description`, `quantity`, `price`, `taxable`. |
| `client_id` | A WordPress user id; the invoice's customer name and email are filled from the client record. Unknown id → `400 easy_invoice_rest_no_client`. |
| `customer_name`, `customer_email` | Used when there is no client record, or to override it. |
| `status` | `draft` (default) or `available`. Payment statuses cannot be set here — record a payment instead. |
| `number` | Leave it out to take the next number in your sequence. |
| `issue_date`, `due_date` | `Y-m-d`. |
| `notes`, `terms`, `currency`, `customer_vat_number`, `customer_country` | Optional. |

The invoice is created through the same repository the invoice builder uses, so it is numbered, given an access key, and announced on `easy_invoice_invoice_created` — Webhooks, Recurring Invoices and Smart Reminders see it like any other. The response is `201` with the full representation.

### Shaping responses

Two filters let a plugin add fields (or strip them) without touching the controller:

```php
add_filter( 'easy_invoice_rest_invoice', function ( array $data, $invoice ) {
    $data['project'] = get_post_meta( $invoice->getId(), '_my_project_code', true );
    return $data;
}, 10, 2 );

add_filter( 'easy_invoice_rest_quote', function ( array $data, $quote ) {
    return $data;
}, 10, 2 );
```

## admin-ajax actions

The plugin's own screens talk to `admin-ajax.php` — `wp_ajax_easy_invoice_*` actions such as `easy_invoice_save_invoice`, `easy_invoice_save_quote`, `easy_invoice_send_invoice_email`, `easy_invoice_send_quote_email`, `easy_invoice_delete_invoice`, `easy_invoice_search_clients` and `easy_invoice_get_report_data`. They are nonce-protected, capability-checked and shaped around the admin UI, and they change between releases without notice. Build integrations on the [REST API](#rest-api) instead.

Two are visitor-facing, token-gated, and reached by the **Accept** / **Decline** buttons on the public quote page: `easy_invoice_accept_quote` and `easy_invoice_decline_quote`. Call them through the page, not directly — the [Quote E-Signatures](/addons/quote-signatures) addon adds a signature to the same request.

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
POST https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_authorizenet_webhook
```

- Configure in the Authorize.Net merchant interface → **Account → Business Settings → Webhooks**, and paste the **Signature Key** into the gateway settings — a webhook is rejected until it is set.
- Easy Invoice verifies the `X-ANET-Signature` header (HMAC-SHA512) against that key.

### Paystack

```
POST https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_paystack_webhook
```

- Configure in Paystack dashboard → **Settings → API Keys & Webhooks**.
- Verified with HMAC-SHA512 of the raw body against your secret key (`x-paystack-signature`).

### Bank Transfer / Cheque / Cash / Manual

These have **no webhooks** — the admin marks the Payment record as completed manually after the funds arrive (see [Payments](/payments)).

## Authentication notes

- **REST API**: application password (Basic auth) or cookie + `X-WP-Nonce`.
- **admin-ajax** actions: WordPress cookie + the nonce the admin script localizes.
- **Gateway webhooks**: each gateway uses its own signature scheme (Stripe and Authorize.Net headers, Paystack HMAC, Mollie API look-up). Easy Invoice handles verification.

## Programmatic alternative: in-process PHP

If you're inside the same WordPress install (custom plugin / theme code), skip HTTP entirely:

```php
$repository = \EasyInvoice\Providers\InvoiceServiceProvider::getInvoiceRepository();

// Create an invoice — numbered, hooked and filled from the client, like the builder does
$invoice = $repository->create( [
    'title'     => 'Web Design',
    'client_id' => 21,
    'status'    => 'draft',
    'items'     => [ [ 'name' => 'Design', 'quantity' => 1, 'price' => 430 ] ],
] );

// Read one
$invoice = $repository->find( $invoice_id );
$total   = $invoice->getTotal();
$due     = \EasyInvoice\Services\InvoiceBalance::due( $invoice );

// React to money arriving (fires for full and partial payments)
add_action( 'easy_invoice_payment_completed', function ( $invoice_id, $invoice, $payment ) { /* settled */ }, 10, 3 );
add_action( 'easy_invoice_payment_received',  function ( $invoice_id, $invoice, $payment ) { /* partial */ }, 10, 3 );
```

This is faster, doesn't need authentication, and respects every filter/hook automatically.

## Rate limits & caching

- The REST API and `admin-ajax.php` are **uncached** by default (most caching plugins exclude both).
- No built-in rate limit — protect with **Cloudflare** / **WP Hide / Login Lockdown** if you expose webhooks publicly.

## Where to go next

- 🪝 [Hooks & filters](/hooks-filters) — extend behaviour in-process.
- 💳 [Payment gateways](/payment-settings) — gateway-specific webhook URLs.
- 🛠️ [Troubleshooting → Webhooks](/troubleshooting#webhook-not-received).
