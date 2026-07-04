---
title: Changelog
description: Easy Invoice version history. Recent releases for both the free plugin and Easy Invoice Pro.
---

# Changelog

Easy Invoice follows semantic versioning loosely — `MAJOR.MINOR.PATCH` where `MAJOR` is reserved for breaking schema changes (rare).

## Easy Invoice (free) — 2.3.7 — June 29, 2026

- **Fixed** — Download PDF from the Invoice and Quote listing pages could leave the user stranded on the intermediate `admin-ajax.php?action=easy_invoice_generate_pdf…` URL — sometimes showing a JSON "Security check failed" body, sometimes a completely blank page. Root causes were the browser dropping the WordPress session cookie into the new tab (Safari ITP, `SameSite=Strict`, third-party cookie blockers), CDN / page-cache layers replaying stale responses, and third-party plugins emitting whitespace that flushed response headers before the redirect could fire. The download-target handler now:
  1. Accepts an admin session (`manage_options`) or a valid per-document access key as alternate authorisation paths when the per-request nonce fails.
  2. Emits explicit `Cache-Control: no-store` headers to defeat intermediate caching.
  3. Falls back to a client-side redirect (`<meta refresh>` + `window.location.replace()`) when the server-side redirect can't fire because headers are already sent.
  All three failure modes are now covered.

## Easy Invoice Pro — 2.2.6 — June 28, 2026

- **Security** — Twelve AJAX handlers in the Custom Templates addon (the Template Builder back-end) were previously gated by nonce only; they now also require admin capability (`manage_options`). The Template Builder UI is admin-only in practice — the change brings the previously-missing handlers to the same policy already enforced on the controller's other eight handlers. No customer-facing behaviour changes; admins continue to use the Template Builder exactly as before.

## Easy Invoice (free) — 2.3.6 — June 26, 2026

- **Security** — Tightened the capability check on the AJAX payment-update endpoint so only users with the dedicated payment-management permission can change payment records or invoice status. All sites should update.
- **Security** — `[easy_invoice_url]` and `[easy_quote_url]` no longer mint per-document access keys for arbitrary visitors. Access keys are now produced exclusively when an invoice / quote email is sent; the shortcodes attach an existing key only when the current viewer is the site admin, the bound client, or already holds the key in the page URL.
- **Fixed** — Bound-client recognition on quote Accept / Decline and invoice manual-payment submission was a dead branch since 2.3.4: the guard used `method_exists()` which returns false for `__call`-resolved methods, and both Invoice and Quote resolve `getClientId()` that way. Logged-in clients whose email matches the document's bound client are now correctly authorised. (Admin and emailed-link paths were unaffected.)
- **Note** — Emailed `{{invoice_url}}` and `{{quote_url}}` links continue to work unchanged for the legitimate recipient. The shortcode change is invisible for admin embeds on admin-context pages; on public pages the shortcode now renders a plain permalink for visitors who don't already hold a valid key.

## Easy Invoice (free) — 2.3.5 — June 26, 2026

- **Security** — Hardened authorisation on the manual-payment submission flow (Bank Transfer / Cheque / Cash). The public AJAX endpoint now requires either a valid per-invoice access key, an admin session, or the bound client logged in by email match. All sites should update.
- **Improved** — Invoice share links sent via `{{invoice_url}}` email merge tag and the `[easy_invoice_url]` shortcode now carry a per-invoice access key. Recipients of these links can submit manual-payment proof as before — no extra steps for the customer.
- **Note** — Invoice links generated **before** this update still load and pay through online gateways (Stripe / PayPal / etc.); only the "submit manual payment" form requires the new keyed link or a logged-in client whose email matches the invoice.
- **Fixed** — Race condition under high concurrency where two simultaneous invoice (or quote) creates could be assigned the same number. The counter read-check-write sequence is now serialised via a MySQL named lock; the lock auto-releases on connection close so it cannot leak across requests.
- **Added** — License recognition for the new **Professional Lifetime** and **Agency Lifetime** SKUs so customers on those tiers are placed correctly and see the matching variant label on the License page.

## Easy Invoice Pro — 2.2.5 — June 26, 2026

- **Security** — Hardened authorisation on the Partial Payments AJAX endpoints (`processPartialPayment`, `getPaymentHistory`). Same ownership model as the Free plugin's manual-payment flow.
- **Security** — Webhooks outbound SSRF blocklist extended to explicitly cover Azure's IaaS metadata endpoint (`168.63.129.16`) and IPv4-mapped IPv6 representations of loopback and cloud-metadata addresses.
- **Security** — Square webhook replay protection. The handler records each `event_id` in a 24-hour transient and short-circuits replays so a captured signed webhook can't be re-fired to duplicate notifications or payment records.
- **Security** — Bulk-export endpoints (`exportCSV`, `exportInvoicesCSV`, `exportQuotesCSV`) now require admin capability (`manage_options`), matching the sibling "Export All" buttons that were already gated.
- **Fixed** — Recurring invoice next-run dates now respect the site timezone (WordPress **Settings → General → Timezone**) instead of falling back to the host's PHP `date.timezone` ini value. Existing schedules keep their stored next-run; the first recalculation after upgrade picks up the corrected logic.
- **Fixed** — Pro deactivation now clears all nine Pro-owned cron events instead of just the legacy payment-reminders hook. Previously, orphan cron registrations stayed in WordPress's cron queue indefinitely after Pro was deactivated.

## Easy Invoice (free) — 2.3.4 — June 12, 2026

- **Security** — Hardened authorisation on the quote Accept and Decline flows. The public AJAX endpoints now require a per-quote access key, admin session, or bound-client email match (CVE-2026-9021).
- **Improved** — Quote share links emailed to clients (`{{quote_url}}`, `[easy_quote_url]`) now carry a per-quote access key.
- **Note** — Quote links generated before this update still display the quote, but Accept / Decline buttons require a new keyed link (admin resend), client login, or admin action.

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
