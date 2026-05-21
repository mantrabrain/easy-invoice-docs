---
title: Changelog
description: Easy Invoice version history. Recent releases for both the free plugin and Easy Invoice Pro.
---

# Changelog

Easy Invoice follows semantic versioning loosely — `MAJOR.MINOR.PATCH` where `MAJOR` is reserved for breaking schema changes (rare).

## Easy Invoice (free) — 2.2.0 — May 13, 2026

- **Added** — "Export Selected (Pro)" option in the Bulk Actions dropdown on both Invoice and Quote listings. Visible to all users; picking it without Pro opens the Upgrade-to-Pro dialog.
- **Added** — "Send Email (Pro)" option in the Bulk Actions dropdown on both listings (companion to the existing Pro bulk-send feature).
- **Added** — "Filter by client" dropdown on All Invoices and All Quotes listings. Persists across view tabs, status chips, pagination, and search.
- **Added** — "Documentation" link in the plugin sidebar (under Join Community) opening [easy-invoice.matrixaddons.com/docs/](https://easy-invoice.matrixaddons.com/docs/).
- **Added** — "Unlock more payment gateways" teaser block on Settings → Payment when Pro is inactive (Stripe, Square, Authorize.Net, Mollie, Paystack, Moneris, Bank Transfer, Cheque, Cash).
- **Improved** — Pro-gated submit interceptors moved to native capture-phase listeners so they always run before the listing template's inline jQuery submit handlers. Fixes the generic "Confirm Action" race on the Quote listing.
- **Fixed** — Quote listing search form posted to a wrong page slug (`easy-invoice-quotes-all` → `easy-quote-all`); picking a value from the client filter no longer redirects to "you are not allowed".
- **Fixed** — Quote / Invoice client filter now uses the correct meta-key namespaces (`_easy_invoice_client_id` / `_easy_invoice_quote_client_id`) plus a fallback match on the client's `customer_email`. Filter now narrows the listing correctly for both flows.
- **Fixed** — Default Invoice / Quote email bodies no longer ship the literal `[easy_(invoice|quote)_url …]` shortcode-reference line that was emailed to clients as raw text. One-time migration strips the line from already-saved options.
- **Internal** — Documentation links across `readme.txt` and helpers now point to `https://easy-invoice.matrixaddons.com/docs/` instead of the legacy URL.

## Easy Invoice Pro — 2.2.0 — May 13, 2026

- **Added** — **Paystack payment gateway**. Hosted-checkout flow (card / bank / USSD / mobile money / QR) for African and select international merchants. Supports NGN, GHS, ZAR, KES, USD, EGP, XOF. HMAC-SHA512 signed-webhook verification; server-side `/transaction/verify` reconciliation on customer return.
- **Added** — **Bulk Send Email**. Tick rows on Invoice / Quote listing → "Send Email" → Apply. Pro dispatches the configured "Available" template to every selected document's client and reports a per-row success/failure toast.
- **Added** — **Bulk Export Selected**. Tick rows → "Export Selected" → Apply → confirm. Pro streams a UTF-8 CSV (with BOM for Excel) of just the selected rows. Endpoint `admin-post.php?action=easy_invoice_pro_bulk_export`, capability-gated, nonce-verified.
- **Added** — Extension hooks `easy_invoice_paystack_payment_complete`, `easy_invoice_pro_after_bulk_send_email`, `easy_invoice_pro_after_bulk_export`.
- **Compatibility** — Paired release with Easy Invoice (Free) 2.2.0.

## Easy Invoice (free) — 2.1.20

- Polish: builder field validation messages.
- Fix: numeric formatting on currencies with non-Latin digits.
- i18n: extended translations file.

## Easy Invoice (free) — 2.1.17 — 2.1.19

- Improved long-PDF rendering (canvas capture).
- Settings UI: re-grouped Email tabs.
- Bug fixes for the quote accept / decline flow.

## Easy Invoice (free) — 2.1.16

- New: discount-before-tax option (in addition to discount-after-tax).
- New: featured / category field for the trip widget (compat).
- Fix: pending-bank status was displayed as "Pending" without prefix.

## Easy Invoice (free) — 2.1.x baseline

- Refactor of the model / repository / controller layer to namespaced classes.
- Migrated all admin screens to React (where applicable).
- Introduced per-payment refund support.
- Reports redone with Chart.js.

## Easy Invoice Pro — 2.1.6

- New gateway: Moneris (Canadian).
- Stripe Payment Element rollout (replaces legacy Stripe Elements).
- Email Enhancements: per-template reply-to, brand colours, PDF attachment.
- Settings: re-organized PDF Options and Privacy & Access tabs.
- Fix: Subscription invoices duplicate generation when both crons fired in the same minute.

## Easy Invoice Pro — 2.1.x baseline

- Recurring + Subscription invoice modules merged into a single settings tab.
- New module: **Item Library** with autocomplete in the invoice builder.
- New module: **Template Builder** for custom invoice templates.
- New: Custom & secure permalinks (hash-protected slugs).
- Privacy & Access: GDPR exporter + eraser registration.
- License manager: daily auto-check + grace period UI.

## Compatibility

| Free | Pro | WordPress | PHP |
| --- | --- | --- | --- |
| 2.1.20 | 2.1.6 | 5.6+ | 7.4+ |
| 2.1.17–2.1.19 | 2.1.4–2.1.5 | 5.6+ | 7.4+ |
| 2.1.10–2.1.16 | 2.0.x | 5.6+ | 7.2+ |

> Always run **matching** major.minor versions of Free and Pro. Mixing across majors is not supported.

## Where to find the canonical changelog

- **Free**: `wp-content/plugins/easy-invoice/changelog.txt` and the [WordPress.org listing](https://wordpress.org/plugins/easy-invoice/#developers).
- **Pro**: bundled in the Pro ZIP as `changelog.txt`, plus the [MatrixAddons changelog page](https://matrixaddons.com/plugins/easy-invoice/#changelog).

## Where to go next

- 🚀 [Installation](/installation) — get started.
- 💎 [Pro features](/features) — what each Pro release adds.
- 💬 [Support](/support) — questions about a specific release.
