---
title: Clients & portal
description: How Easy Invoice models clients (mapped to WordPress users), the dedicated "Easy Invoice Client" role, the hosted Pro client portal, and the magic-link login flow.
---

# Clients & portal

Easy Invoice doesn't have a separate "client" CPT — clients are WordPress users. This is intentional: it lets you reuse WordPress login, password reset, and avatars without reinventing them.

## How clients are stored

- **Storage**: `wp_users` + `wp_usermeta` (queried via `includes/Repositories/ClientRepository.php`).
- **Role**: `easy_invoice_client` (auto-created on activation; capability `read` only).
- **Listing**: <span class="screen-path">Easy Invoice → All Clients</span> — uses `WP_User_Query` filtered to admins + portal-role users that have invoices.

> Some installs may also have legacy `easy_invoice_client` _post type_ data from older versions — Reports still considers it (`ReportController.php:978`) for backward compatibility.

## Adding a client

Three ways:

1. **From the invoice builder** — start typing in the **Client** field, hit _+ Add new_.
2. **Bulk** — <span class="screen-path">Users → Add New</span> with role `Easy Invoice Client`.
3. **Programmatically** via `wp_insert_user` + `add_role`.

Required fields:

- **First / last name** — printed on invoices.
- **Email** — invoice / quote emails are sent here.
- **Address** — billing address on the invoice template.

Optional per-client defaults (Pro):

- **Currency** override.
- **Tax exempt** flag.
- **Default payment method** (if multiple are enabled).

## The portal (Pro)

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Hosted client portal</span>
  </div>
  <p class="pro-callout__desc">Pro adds a self-service area where clients log in, see every invoice, every quote, every payment, and download PDFs — without seeing wp-admin.</p>
  <a class="pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/">Unlock the portal →</a>
</div>

### What the client sees

After logging in:

- **Profile** — name, address, default email, change password.
- **Invoices** — list with status badges, due dates, total + balance due.
- **Quotes** — list with accept / decline buttons inline.
- **Payments** — receipt history.

Click any row → opens the public single template, with **Pay now** if the invoice has a balance.

### Portal pages

The Pro plugin uses three shortcodes you place anywhere:

| Shortcode | What it renders |
| --- | --- |
| `[easy_invoice_login]` | Login form for the `easy_invoice_client` role. |
| `[easy_invoice_profile]` | Profile + address editor. |
| `[easy_invoice_client_login]` | Alternative login form (legacy alias). |

Recommended structure:

```
/client-area/login         → [easy_invoice_login]
/client-area/profile       → [easy_invoice_profile]
/client-area/invoices      → list (auto-rendered when logged in)
```

> See [Shortcodes](/shortcodes) for every attribute.

### Magic link login (Pro)

Pro supports a tokenised login URL: append `?client_token=xxx` to any portal page and the user is auto-logged in (single-use token, expires).

Use case: include a "View your invoice" link in the email that signs the client in without a password — see `ClientPortal.php:75–78`.

## Client role & capabilities

The dedicated `easy_invoice_client` role:

- Has **only** `read` capability.
- Cannot see wp-admin (Pro forces redirect to the portal).
- Cannot edit anything site-wide.

> Combine this with a **redirect on login** plugin (or the Pro portal itself) so clients never land in wp-admin.

## Privacy & data export (GDPR)

The Pro plugin's **Privacy & Access** tab adds:

- **Login required** to view invoice URLs.
- **Token-based access** (hash-protected slugs).
- **GDPR exporter** — exports a client's invoices/quotes/payments as JSON via WordPress's Tools → Export Personal Data.

> See [Pro features overview → Privacy & Access](/third-party-integrations#privacy-access).

## Bulk operations

From <span class="screen-path">All Clients</span>:

- Search by name / email.
- Filter by role.
- Bulk action: **Send statement of account** <span class="doc-pro-pill">Pro</span> — emails a summary of outstanding invoices.

## Where to go next

- 🧾 [Invoices](/invoices) — assign invoices to clients.
- 📝 [Quotes / estimates](/quotes) — pre-invoice flows.
- 💳 [Payment gateways](/payment-settings) — let clients pay via card or PayPal.
- 💎 [Pro features overview](/third-party-integrations#client-portal) — full portal details.
