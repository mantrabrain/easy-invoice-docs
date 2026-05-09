---
title: Changelog
description: Easy Invoice version history. Recent releases for both the free plugin and Easy Invoice Pro.
---

# Changelog

Easy Invoice follows semantic versioning loosely — `MAJOR.MINOR.PATCH` where `MAJOR` is reserved for breaking schema changes (rare).

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
