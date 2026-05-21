---
title: Addons
description: Easy Invoice Pro is addon-driven. The Personal tier is free with the Pro plugin (no license required); Professional and Agency tiers unlock additional addons with a license key.
---

# Addons

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Personal-tier addons unlock automatically</strong> when you install Easy Invoice Pro — no license key required. A license unlocks the Professional and Agency tiers. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

Easy Invoice Pro ships an **addon system**: every Pro feature is an independently-toggleable addon you turn on from **Easy Invoice → Addons**. Disabled addons contribute **zero PHP**, **zero database queries**, **zero hooks** — so a clean install is just as fast as the free plugin.

> **Still on the free plugin?** You're missing 16 addons across recurring billing, deposits, client portal, custom templates, reports, and more — eleven of them are included free with the Pro plugin, no license key required. [Get Easy Invoice Pro →](https://matrixaddons.com/plugins/easy-invoice/#pricing)

## How the tiers work

| Tier | What unlocks it | What you get |
|---|---|---|
| **Free** | Easy Invoice plugin only | The free core: unlimited invoices, quotes, clients, PDF generation, PayPal & Manual gateways, email notifications. |
| **Personal** | Install Easy Invoice Pro — **no license required** | All 9 Pro payment gateways + 11 Personal-tier addons (Recurring, Client Portal, PDF Toolkit, Item Library, Templates, Bulk Operations, Reports, and more). |
| **Professional** | Activate a Professional license | Personal **+** Time Tracking, Smart Reminders & Late Fees, Priority Support. |
| **Agency** | Activate an Agency license | Professional **+** White-Label, Team Roles & Audit Log, Webhooks & Zapier. |

Each plan **includes everything in lower plans**. Buy once, install once — the Pro plugin gives you Personal automatically. Add a license to unlock Professional or Agency.

[**Get Easy Invoice Pro →**](https://matrixaddons.com/plugins/easy-invoice/#pricing)

## The full catalog

### Personal tier (free with Pro — no license)

| Addon | What it does |
|---|---|
| [**Recurring Invoices & Subscriptions**](../recurring-invoices) | Auto-bill on autopilot — weekly, monthly, or any custom schedule. |
| [**Partial Payments & Deposits**](./partial-payments) | Get paid sooner with deposits and flexible installment plans. |
| [**Client Portal**](./client-portal) | Branded self-service area where clients view invoices, quotes, and receipts. |
| [**PDF Toolkit**](./pdf-toolkit) | Custom headers, footers, watermarks (PAID / DRAFT / OVERDUE), and styling. |
| [**Bulk Email & Export**](./bulk-operations) | Send and export hundreds of invoices in a single click. |
| [**Item Library**](./item-library) | Reusable catalog of services and products with one-click insert into invoices. |
| [**Custom Invoice & Quote Templates**](./custom-templates) | Drag-and-drop builder for pixel-perfect layouts. |
| [**Additional Tax Lines**](./additional-tax) | Multiple named tax lines per invoice — VAT + duty, GST + PST, federal + state. |
| [**Email Enhancements**](./email-enhancements) | Branded HTML emails with PDF attached, CC / BCC, and Reply-To. |
| [**Secure Links for Invoices & Quotes**](./secure-links) | Replace predictable invoice/quote URLs with signed, unguessable links that can expire automatically. |
| [**Privacy & GDPR Tools**](./privacy-tools) | Comply with GDPR, CCPA, and other data-protection laws in one click. |
| [**Reports & Analytics**](./reports) | Visual dashboard for revenue, outstanding balances, and per-client performance. |

### Professional tier (license required)

| Addon | What it does |
|---|---|
| [**Time Tracking & Project Billing**](./time-tracking) | Log billable hours and convert them to invoice lines in one click. |
| [**Expense Tracking & Reimbursable Items**](./expense-tracking) | Log billable expenses with receipts, apply markup, and roll selected expenses into a draft invoice. |
| [**Smart Reminders & Late Fees**](./smart-reminders) | Multi-step automated payment chase with auto-applied late fees. |

[**Upgrade to Professional →**](https://matrixaddons.com/plugins/easy-invoice/#pricing)

### Agency tier (license required)

| Addon | What it does |
|---|---|
| [**White-Label & Brand Override**](./white-label) | Rebrand Easy Invoice as your own product — every label, footer, and PDF. |
| [**Team Members & Audit Log**](./team-roles) | Scoped staff roles + searchable audit log of every action. |
| [**Webhooks & Zapier Bridge**](./webhooks) | Stream invoice events to any URL — Zapier, Make, n8n, your CRM. |
| [**Accounting Sync (QuickBooks / Xero / FreshBooks)**](./accounting-sync) | Two-way sync between Easy Invoice and your accounting platform. |

[**Upgrade to Agency →**](https://matrixaddons.com/plugins/easy-invoice/#pricing)

## How the gate works

When you click **Activate** on a card, three things are checked **before** the addon's code is loaded:

1. **Pro plugin present** — Easy Invoice Pro must be installed and active.
2. **License plan** — your plan must satisfy the addon's required tier. Personal tier is granted automatically when Pro is installed (no license needed). Professional/Agency addons require a valid license.
3. **Code presence** — the addon's bootstrap file must exist in the Pro plugin.

If all three pass, the addon's `addon.php` is `require_once`'d on every subsequent request (via the Pro plugin's `init` hook at priority 25). If any check fails, the file is never loaded — the addon contributes nothing to your site.

Toggling **off** disables an addon instantly. Some addons (Time Tracking, Team Roles, Webhooks) create database tables on first activation; those tables are **kept on deactivation** so you don't lose data if you re-enable later. To remove everything, uninstall Easy Invoice Pro (a clean-up routine runs on uninstall, not on deactivate).

## Activation flow

```text
You click "Activate" ──▶ AJAX easy_invoice_toggle_addon
                          │
                          ├─ AddonManager::userCanAccess()
                          │   • Plan tier ≥ addon.plan?
                          │     (Personal = Pro plugin installed)
                          │
                          ├─ YES ─▶ update_option(easy_invoice_addon_{id}_enabled, 1)
                          │        Page reloads. Addon loads on next request.
                          │
                          └─ NO  ─▶ Returns { code: 'upgrade_required', upgrade_url, required_plan }
                                   UI opens the upgrade dialog with the right tier pre-selected.
```

Defense in depth: even if you set the option directly via SQL on a Free site, the loader's plan check still refuses to require the file. You cannot bypass plan tier by editing the database.

## Existing Pro users — auto-migration

If you were running Easy Invoice Pro before the addon system existed, a one-time migration runs on the next admin page load. It auto-enables every Personal-tier addon for your install so nothing breaks — the features you were already using stay on. The migration is stamped with a version (`'2'`) so it runs **once** and then never again.

You can fully customize what's enabled afterwards from **Easy Invoice → Addons**.

## What does NOT happen automatically

- **Migrations** — an addon's database schema is created (via `dbDelta`) on **first activation**. If a future Pro release ships schema changes, the addon's version constant bumps so the migration re-runs.
- **Cron schedules** — addons that need cron (Recurring, Smart Reminders, Webhooks) self-schedule on bootstrap. There's no global "Run cron now" button.
- **Hooks into other code** — addons hook into Easy Invoice events at runtime, so events that already happened are not retroactively logged or fired. (Newly-enabled Audit Log only records actions from the moment you enabled it.)

## Filter categories

The Addons page has filter chips along the top — each addon belongs to one category so you can narrow the catalog by job-to-be-done:

- **billing** — recurring, partial payments, additional tax, dunning
- **branding** — white-label, PDF toolkit, custom templates
- **productivity** — item library, bulk operations, email enhancements, time tracking
- **clients** — client portal
- **team** — team roles & audit log
- **integrations** — webhooks
- **compliance** — privacy / GDPR
- **analytics** — reports

## Building your own addon

The addon system is intentionally **registry-driven** so third-party Easy Invoice extensions can ship their own addons. Hook into the registry filter:

```php
add_filter('easy_invoice_addons_registry', function (array $addons) {
    $addons[] = [
        'id'           => 'acme_widgets',
        'name'         => 'Acme Widgets',
        'tagline'      => 'Adds a Widgets section to the invoice editor.',
        'description'  => 'Description shown on the addon card.',
        'plan'         => 'professional', // 'personal' | 'professional' | 'agency'
        'icon'         => 'dashicons-screenoptions',
        'category'     => 'productivity',
        'badge'        => null,
        'docs_url'     => 'https://example.com/docs/acme',
        'settings_url' => admin_url('admin.php?page=easy-invoice-addon-acme-widgets'),
        'pro_file'     => 'addons/acme-widgets/addon.php',
    ];
    return $addons;
});
```

The bootstrap file at `pro_file` is loaded by `AddonManager::loadEnabledAddons()` only when the addon passes the same three checks listed above.

## Common cron schedules per addon

| Addon | Hook | Cadence |
|---|---|---|
| Recurring Invoices | `easy_invoice_recurring_cron` | Configurable (every N minutes / hours / daily) |
| Smart Reminders | `easy_invoice_dunning_daily_tick` | Daily |
| Webhooks (retry) | `easy_invoice_webhooks_retry_tick` | Hourly |
| Webhooks (one-shot dispatch) | `easy_invoice_webhook_send_one` | Single event per delivery |

If a cron tick seems stuck, see [Troubleshooting → WP-Cron](../troubleshooting#wp-cron).

## Troubleshooting

### "I just bought Agency but only Professional addons show as unlockable"

The plan resolver caches the EDD license response. Either:

1. Re-activate the license (License page → Deactivate → Activate)
2. Or set a manual override: `update_option('easy_invoice_pro_plan_tier_override', 'agency')` — useful while debugging.

The resolver tries (in order) the override → EDD `price_id` → the item-name string. If none match, it falls back to `professional` for any valid license.

### "I enabled an addon but its menu / settings page is missing"

Personal-tier addons (Item Library, Templates, Reports, etc.) are reached through the Easy Invoice **in-app sidebar** — not the WordPress admin submenu. The WP admin entries are intentionally hidden to avoid duplicating the in-app sidebar navigation.

If the in-app sidebar doesn't include your addon's link:

1. Confirm the addon is **Active** on the Addons page (not just unlocked).
2. Hard-refresh the admin (sidebar cache).
3. Check `define('WP_DEBUG', true)` for PHP errors from the addon's `addon.php`.

### Hooks for developers integrating with addons

| Hook | When |
|---|---|
| `easy_invoice_addon_enabled` `(addon_id, addon)` | Site admin just enabled an addon |
| `easy_invoice_addon_disabled` `(addon_id, addon)` | Site admin just disabled an addon |
| `easy_invoice_addon_loaded` `(addon_id, addon)` | Addon's `addon.php` was just required |
| `easy_invoice_addons_registry` | Filter to add your own addon to the catalog |
| `easy_invoice_pro_addon_migration_completed` `(enabled_ids)` | Migration finished auto-enabling existing-install addons |

For per-addon hooks, see each addon's docs page.

## See also

- [Hooks & filters reference](../hooks-filters)
- [AJAX & webhooks reference](../api-reference)
- [All Pro features](../features)

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Ready to unlock the full addon catalog?</strong> Install Easy Invoice Pro for 11 Personal-tier addons free — no license required. Add a Professional or Agency license to unlock the rest.</span>
  <a class="doc-pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a>
</div>
