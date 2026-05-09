---
title: Hooks & filters
description: Extend Easy Invoice with WordPress actions and filters — invoices, quotes, payments, emails, gateways, settings, frontend templates, and Pro extensions.
---

# Hooks & filters

Easy Invoice exposes a large surface of `apply_filters()` and `do_action()` calls so you can extend behaviour without touching plugin files. This page lists the most useful hooks grouped by area, with file:line references for source-of-truth.

> The list below is **representative**, not exhaustive — Easy Invoice fires hundreds of hooks across both plugins. For a full grep, run `rg "apply_filters\|do_action" includes/` from each plugin root.

## Bootstrap & lifecycle

| Hook | Type | When | File:line |
| --- | --- | --- | --- |
| `easy_invoice_loaded` | action | After the free plugin and constants are loaded. | `easy-invoice.php:106` |
| `easy_invoice_after_admin_scripts` | action | After admin assets are enqueued. | `easy-invoice.php:152` |

```php
add_action( 'easy_invoice_loaded', function () {
    // Safe place to register custom gateways or settings.
} );
```

## Settings

| Hook | Type | Use |
| --- | --- | --- |
| `easy_invoice_settings_fields_config` | filter | Add / modify settings sections and fields. |
| `easy_invoice_settings_for_display` | filter | Mutate settings before rendering. |
| `easy_invoice_settings_tabs` | filter | Register new top-level settings tab. |
| `easy_invoice_settings_email_placeholders` | filter | Add merge tags to the email editor. |
| `easy_invoice_settings_template_path` | filter | Override the settings template file. |
| `easy_invoice_after_settings_page` | action | Render extra HTML after the settings form. |

```php
add_filter( 'easy_invoice_settings_fields_config', function ( $config ) {
    $config['advanced']['fields']['my_custom_toggle'] = [
        'label'   => 'Enable my feature',
        'type'    => 'checkbox',
        'default' => '0',
    ];
    return $config;
} );
```

## Invoice model

| Hook | Type | Use |
| --- | --- | --- |
| `easy_invoice_model_to_array` | filter | Transform invoice when serialising. |
| `easy_invoice_invoice_total` | filter | Override how totals are computed. |
| `easy_invoice_invoice_query_args` | filter | Modify `WP_Query` args for the invoice list. |
| `easy_invoice_invoice_created` | action | New invoice saved. |
| `easy_invoice_invoice_updated` | action | Existing invoice updated. |
| `easy_invoice_invoice_deleted` | action | Invoice trashed. |

## Quote model

Same pattern with `easy_invoice_quote_*` prefix:

- `easy_invoice_quote_created` / `_updated` / `_deleted`
- `easy_invoice_quote_accepted` / `_declined`

```php
add_action( 'easy_invoice_quote_accepted', function ( $quote_id ) {
    // Auto-create a kickoff invoice when a quote is accepted.
} );
```

## Payments

| Hook | Type | Use |
| --- | --- | --- |
| `easy_invoice_payment_completed` | action | Fired after a payment is marked completed. |
| `easy_invoice_before_process_payment` | action | Before gateway processes (good for validation). |
| `easy_invoice_should_update_invoice_status` | filter | Decide whether the parent invoice status should change. |
| `easy_invoice_pro_recurring_generated` | action | Fires after a recurring invoice is generated (Pro). |
| `easy_invoice_pro_receipt_generated` | action | Fires after a receipt is generated (Pro). |

```php
add_action( 'easy_invoice_payment_completed', function ( $payment_id ) {
    // Notify external CRM that we got paid.
} );
```

## Emails

| Hook | Type | Use |
| --- | --- | --- |
| `easy_invoice_email_sent` | action | After successful `wp_mail`. |
| `easy_invoice_email_failed` | action | When `wp_mail` returns false. |
| `easy_invoice_email_attachments` | filter | Add / remove email attachments. |
| `easy_invoice_email_headers` | filter | Add custom From / Reply-To / BCC. |

```php
add_filter( 'easy_invoice_email_attachments', function ( $attachments, $type, $invoice_id ) {
    if ( $type === 'invoice_available' ) {
        $attachments[] = WP_CONTENT_DIR . '/uploads/terms.pdf';
    }
    return $attachments;
}, 10, 3 );
```

## Gateways

Custom gateways register against:

- `easy_invoice_payment_gateways` — array of gateway instances.
- `easy_invoice_before_process_payment` — pre-process hook.
- `easy_invoice_{gateway}_payment_complete` — gateway-specific complete action.

Pro-specific:

- `easy_invoice_authorizenet_payment_complete` (`AuthorizeNetGateway.php:470+`).
- `easy_invoice_stripe_payment_complete`.
- etc.

```php
add_action( 'easy_invoice_stripe_payment_complete', function ( $payment_id, $charge_id ) {
    // Custom post-payment logic.
}, 10, 2 );
```

## Frontend templates

| Hook | Type | Use |
| --- | --- | --- |
| `easy_invoice_head` | action | Inside `<head>` of the public invoice / quote single. |
| `easy_invoice_footer` | action | Before closing `</body>`. |
| `easy_invoice_listing_row` | action | Inside each row of the public listing. |
| `single_template` | filter (WP core) | Override which file renders single invoice. |

```php
add_action( 'easy_invoice_head', function () {
    echo '<meta name="robots" content="noindex,nofollow">';
} );
```

## Pro-only extensions

| Hook | Type | Use |
| --- | --- | --- |
| `easy_invoice_pro_templates` | filter | Register extra template builder templates. |
| `easy_invoice_pro_export_fields` | filter | Add columns to CSV export. |
| `easy_invoice_pro_is_client_invoice` | filter | Decide whether a request is "client-context" (portal). |
| `easy_invoice_can_download_pdf` | filter | Privacy gate for PDF download. |
| `easy_invoice_can_view_invoice` | filter | Privacy gate for the public invoice view. |
| `easy_invoice_display_total` | filter | Override what's rendered in the total area (used by Partial Payments). |

```php
add_filter( 'easy_invoice_can_download_pdf', function ( $can, $invoice_id, $user ) {
    if ( ! $user ) return false;
    return user_can( $user, 'manage_options' ) || $can;
}, 10, 3 );
```

## Repository / data layer

| Hook | Type | Use |
| --- | --- | --- |
| `easy_invoice_invoice_repository_args` | filter | Modify repo query args. |
| `easy_invoice_client_repository_args` | filter | Same for clients. |
| `easy_invoice_payment_repository_args` | filter | Same for payments. |

## Reports

| Hook | Type | Use |
| --- | --- | --- |
| `easy_invoice_reports_data` | filter | Mutate the data passed to Chart.js. |
| `easy_invoice_reports_template_path` | filter | Use your own report template. |

## Naming convention

- **Free plugin** prefixes hooks with `easy_invoice_*`.
- **Pro plugin** uses `easy_invoice_pro_*` for new hooks added by Pro modules; reuses free hooks for shared behaviour.

## Tip: discover all hooks at runtime

For exhaustive coverage in a specific install, drop this in `wp-content/mu-plugins/easy-invoice-hooks.php`:

```php
<?php
add_action( 'all', function ( $hook_name ) {
    if ( strpos( $hook_name, 'easy_invoice' ) === 0 ) {
        error_log( "[Easy Invoice hook] $hook_name" );
    }
} );
```

This logs every Easy Invoice hook that fires during a request.

## Where to go next

- ⚙️ [Shortcodes](/shortcodes) — frontend embeds.
- 🔌 [AJAX & webhooks](/api-reference) — REST-equivalents for integrations.
- 💎 [Pro features](/features) — what each module exposes.
