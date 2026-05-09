---
title: Support
description: How to get help with Easy Invoice — community forum, MatrixAddons support portal, priority Pro help, and writing a useful bug report.
---

# Support

The fastest path depends on whether you're using the free plugin or Easy Invoice Pro.

## Free users

### WordPress.org support forum

For general questions, bugs, and "how do I…" issues with the free plugin:

- 🌐 [WordPress.org → Easy Invoice → Support](https://wordpress.org/support/plugin/easy-invoice/)
- Include the answers from [What to include in a bug report](#what-to-include-in-a-bug-report) below.
- Volunteer-supported — replies usually within 1–3 business days.

### Documentation

You're already here. Use the search box (top of page, on every page) to scan the entire docs site by keyword.

## Pro users

### MatrixAddons support portal

Pro license holders get **priority email support**:

- 🌐 [matrixaddons.com/support](https://matrixaddons.com/support/)
- Sign in with the email tied to your license.
- File a ticket with the answers from [What to include in a bug report](#what-to-include-in-a-bug-report) below.
- Replies typically within 24 hours on Personal, faster on Professional/Agency.

### Onboarding (Agency plan)

Agency licenses include a one-off onboarding session — schedule it from your account dashboard.

## What to include in a bug report

The more of these you can pre-fill, the faster we can help. Include:

1. **WordPress version** — `WordPress X.Y` from the bottom-right of any admin page.
2. **PHP version** — `Tools → Site Health → Info → Server`.
3. **Easy Invoice (free) version** — `Plugins → Installed Plugins`.
4. **Easy Invoice Pro version** (if using Pro) — same.
5. **Active theme name & version**.
6. **Other plugins** active during the issue.
7. **Steps to reproduce** — write them as numbered steps.
8. **What you expected**.
9. **What actually happened** — include screenshots if possible.
10. **Browser console errors** (F12 → Console) — copy any red lines.
11. **`wp-content/debug.log`** entries with `easy_invoice` in them.

### Enabling debug logging

Add to `wp-config.php` (above `/* That's all, stop editing! */`):

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );
```

Reproduce the issue once, then check `wp-content/debug.log`.

## Common channels — at a glance

| Channel | Purpose | Audience |
| --- | --- | --- |
| [WordPress.org forum](https://wordpress.org/support/plugin/easy-invoice/) | General questions, free plugin bugs | Free + Pro |
| [MatrixAddons support](https://matrixaddons.com/support/) | Priority help, license issues | Pro only |
| [GitHub](https://github.com/mantrabrain/easy-invoice-docs) | Docs source & history | Developers |
| [Facebook community](https://www.facebook.com/groups/easyinvoice) | Casual chat, tips | All |

## Before opening a ticket

A quick sanity pass that resolves ~30 % of "bugs":

- ✅ Make sure both Free and Pro are **up to date**.
- ✅ Disable third-party plugins one by one — see if the issue persists.
- ✅ Switch to a default theme (Twenty Twenty-Four / Five) — see if the issue persists.
- ✅ Visit <span class="screen-path">Settings → Permalinks</span> and click **Save** (flushes rewrite rules).
- ✅ Clear caches — page cache, object cache, browser cache.
- ✅ Check the [Troubleshooting](/troubleshooting) page for your symptom.

If the issue persists, file your ticket — and mention the steps you've already tried.

## Feature requests

We track feature requests separately from bugs:

- 🌐 [matrixaddons.com/contact](https://matrixaddons.com/contact/) — pick "Feature request" in the form.
- Include a clear use case ("I run X kind of business and I'd love it if Y").
- Pro license holders get priority on the roadmap.

## Custom development

Need a custom integration, gateway, or migration? We do paid custom work for **Agency** customers and select **Professional** customers — reach out via [matrixaddons.com/contact](https://matrixaddons.com/contact/).

## Where to go next

- ❓ [FAQs](/faqs) — answers before you ask.
- 🛠️ [Troubleshooting](/troubleshooting) — fix the most common issues.
- 📋 [Changelog](/changelog) — what's in each release.
