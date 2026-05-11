---
title: Installation
description: Install Easy Invoice (free) from WordPress.org plus Easy Invoice Pro from your MantraBrain Account, configure permalinks, and verify the plugin loaded cleanly.
---

# Installation

> **New to WordPress?** Read [Your WordPress admin](/admin-dashboard) right after install — it maps every menu item under **Easy Invoice** to the page in these docs.

## Requirements

- **WordPress 5.6+**
- **PHP 7.4+** (the bundled `composer.json` is stricter than the readme — use the readme value for compatibility)
- A WordPress site with **Pretty permalinks** enabled (Settings → Permalinks → anything other than _Plain_)
- For Pro: an active **Easy Invoice Pro license** from your [MantraBrain Account](https://store.mantrabrain.com/account)

> Easy Invoice Pro **requires the free Easy Invoice plugin to be active**. Activating Pro without Free triggers a `wp_die` and auto-deactivates Pro — see `easy-invoice-pro.php:184–211`.

## 1. Install the free plugin

The free plugin is the foundation. Install it first.

### From WordPress.org (recommended)

<ol class="step-list">
  <li>Open <span class="screen-path">Plugins → Add New</span>.</li>
  <li>Search for <strong>Easy Invoice</strong> by MatrixAddons.</li>
  <li>Click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
</ol>

### From a ZIP

<ol class="step-list">
  <li>Download <code>easy-invoice.zip</code> from <a href="https://wordpress.org/plugins/easy-invoice/" target="_blank" rel="noopener">wordpress.org/plugins/easy-invoice</a>.</li>
  <li>Open <span class="screen-path">Plugins → Add New → Upload Plugin</span>.</li>
  <li>Choose the ZIP, click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
</ol>

You should see a new top-level **Easy Invoice** menu item in the WordPress sidebar.

## 2. Install Easy Invoice Pro (optional)

Pro is delivered as a separate plugin ZIP from your MantraBrain Account.

<ol class="step-list">
  <li>Sign in at <a href="https://store.mantrabrain.com/account" target="_blank" rel="noopener">MantraBrain Account</a>.</li>
  <li>Download <strong>easy-invoice-pro.zip</strong> from <strong>Downloads</strong>.</li>
  <li>In WordPress, open <span class="screen-path">Plugins → Add New → Upload Plugin</span>.</li>
  <li>Upload the ZIP, click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
</ol>

### Activate your Pro license

<ol class="step-list">
  <li>Open <span class="screen-path">Easy Invoice → License</span>.</li>
  <li>Paste your <strong>license key</strong> (from your MantraBrain Account → Licenses).</li>
  <li>Click <strong>Activate</strong>.</li>
</ol>

The license activates against `https://store.mantrabrain.com/edd-sl-api/?` — see [Troubleshooting](/troubleshooting) if your host firewalls outbound HTTPS.

## 3. Set permalinks

Easy Invoice rewrites URLs for invoice and quote singles. Without pretty permalinks, links 404.

<ol class="step-list">
  <li>Open <span class="screen-path">Settings → Permalinks</span>.</li>
  <li>Pick <strong>Post name</strong> (or any non-Plain).</li>
  <li>Click <strong>Save Changes</strong>.</li>
</ol>

Pro also adds a **Permalinks** tab in <span class="screen-path">Easy Invoice → Settings</span> for custom & secure link slugs — see [Pro features overview](/third-party-integrations#custom-permalinks).

## 4. Verify the install

Quick sanity check that everything loaded:

| Check | Where | Pass |
| --- | --- | --- |
| Free plugin active | <span class="screen-path">Plugins → Installed Plugins</span> | "Easy Invoice" listed and active |
| Top-level menu | WordPress sidebar | "Easy Invoice" visible with submenus |
| Pretty permalinks | <span class="screen-path">Settings → Permalinks</span> | Anything except "Plain" |
| Pro active (if installed) | <span class="screen-path">Easy Invoice → License</span> | Status: **Active** |
| First invoice URL | <span class="screen-path">Easy Invoice → Add New → Save</span> | Public link opens the invoice template |

## 5. (Optional) Run the setup walkthrough

Easy Invoice doesn't ship a separate wizard — instead, the [Quick start](/quick-start) page walks you through:

- Company details (name, address, logo for invoice header)
- Currency & decimal precision
- Invoice numbering (prefix + auto-increment)
- The first email template
- The first PayPal connection
- Sending the first invoice

## Updating

- **Free**: WordPress.org auto-updates apply via <span class="screen-path">Plugins → Installed Plugins</span>.
- **Pro**: After license activation, Pro updates show up in the same Plugins screen. The license must be **active** for update notifications to appear.

## Where next

- 🚀 [Quick start](/quick-start) — your first invoice in five minutes.
- 🧭 [Your WordPress admin](/admin-dashboard) — what every menu item does.
- 🧾 [Invoices](/invoices) — the builder, taxes, discounts, and PDF export.
