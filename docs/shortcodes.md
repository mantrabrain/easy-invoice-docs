---
title: Shortcodes
description: Every Easy Invoice shortcode — link to invoices and quotes, embed the client portal login and profile forms.
---

# Shortcodes

Easy Invoice ships **five** shortcodes. They cover two use cases: linking to specific invoices/quotes inline, and rendering client-portal forms.

## `[easy_invoice_url]`

Render a link to a specific invoice. Use inside a page or an email body.

### Attributes

| Attribute | Default | Required | Description |
| --- | --- | --- | --- |
| `id` | — | One of `id` or `number` | Invoice post ID. |
| `number` | — | One of `id` or `number` | Invoice number (e.g. `INV-0042`). |
| `text` | _Invoice link_ | No | Anchor text. |
| `class` | — | No | Extra CSS class on the `<a>` tag. |
| `target` | `_self` | No | `_blank` to open in new tab. |

### Example

```
[easy_invoice_url number="INV-0042" text="View your invoice" target="_blank"]
```

Pro: when **Custom permalinks → Secure mode** is on, the resolved URL automatically uses the hashed slug.

## `[easy_quote_url]`

Same pattern as `[easy_invoice_url]`, for quotes.

### Attributes

| Attribute | Default | Required | Description |
| --- | --- | --- | --- |
| `id` | — | One of `id` or `number` | Quote post ID. |
| `number` | — | One of `id` or `number` | Quote number (e.g. `QUO-0042`). |
| `text` | _Quote link_ | No | Anchor text. |
| `class` | — | No | Extra CSS class. |
| `target` | `_self` | No | `_blank` to open in new tab. |

### Example

```
[easy_quote_url number="QUO-0042" text="View your quote"]
```

## `[easy_invoice_login]`

Renders the **portal login form** for the `easy_invoice_client` role. <span class="pro-pill">PRO</span>

### Attributes

| Attribute | Default | Description |
| --- | --- | --- |
| `redirect` | Current page | Where to send users after a successful login. |

### Example

Place on a page at `/client-area/login`:

```
[easy_invoice_login redirect="/client-area/invoices"]
```

> If a logged-out visitor lands on a portal page, they're redirected here automatically (configurable in Pro settings).

## `[easy_invoice_profile]`

Renders the **profile editor** for the logged-in client. Lets them update name, address, email, password. <span class="pro-pill">PRO</span>

### Example

```
[easy_invoice_profile]
```

> Hidden for non-logged-in visitors.

## `[easy_invoice_client_login]`

Alternative login form (legacy alias from earlier Pro versions). Functionally identical to `[easy_invoice_login]` — kept for backward compatibility. <span class="pro-pill">PRO</span>

### Example

```
[easy_invoice_client_login]
```

> Prefer `[easy_invoice_login]` for new pages.

## What's NOT a shortcode

- **No** invoice list shortcode for non-portal contexts. Use [Custom Post Type listings](https://developer.wordpress.org/themes/basics/template-files/#custom-post-type-templates) or write a custom loop.
- **No** payment-form embed (gateways always redirect to their own checkout / use their JS SDK).
- **No** Gutenberg block, **no** Elementor widget. Use these shortcodes inside any block / widget that supports shortcode.

## Tips for emails

If you write your own email template (outside the **Settings → Email** UI), use shortcodes via `do_shortcode()`:

```php
echo do_shortcode( '[easy_invoice_url number="INV-0042"]' );
```

For merge-tag-based emails (the recommended path), you don't need shortcodes — see [Email & notifications → Merge tags](/email-settings#merge-tags).

## Where to go next

- ✉️ [Email & notifications](/email-settings) — merge-tag reference.
- 👥 [Clients & portal](/clients) — building the client portal pages.
- 🪝 [Hooks & filters](/hooks-filters) — extend output programmatically.
