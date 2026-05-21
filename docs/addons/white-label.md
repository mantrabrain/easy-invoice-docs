---
title: White-Label & Brand Override (Pro addon)
description: Rebrand Easy Invoice end-to-end — plugin name, admin menu label, sidebar logo, primary color, PDF / email footers, support URL. Hide every "Upgrade" prompt from end-clients. Required for agencies reselling Easy Invoice as a managed service.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Agency plan</span>
  <span>Requires Easy Invoice Pro with an <strong>Agency</strong> license.</span>
</div>

# White-Label & Brand Override

The single highest-value Agency addon. Lets you ship Easy Invoice to end-clients with **your brand** instead of MatrixAddons / Easy Invoice branding — admin menu name, logo, colors, PDFs, emails, support URL, and the version badges.

## When to use it

- You're a WordPress agency building billing systems for clients
- You're a SaaS that bundles invoicing into a larger product
- You don't want clients to know which third-party plugin powers your billing

If you're a single business using Easy Invoice for your own books, this addon is overkill — leave it off.

## Enabling

1. **Easy Invoice → Addons** → activate **White-Label & Brand Override**
2. Open via the **Settings →** link on the card

Settings are stored in one wp_option: `easy_invoice_white_label_settings`. Disabling the addon stops all overrides instantly but **keeps the settings**, so re-enabling restores everything.

## Settings reference

The settings page is organised in four sections.

### 1. Plugin Identity

| Field | What it does | Affects |
|---|---|---|
| **Plugin Name** | Replaces "Easy Invoice" in the **Plugins** listing | `wp-admin/plugins.php` row title + filterable via `all_plugins` |
| **Admin Menu Label** | Replaces "Easy Invoice" in the wp-admin sidebar | Top-level menu item |
| **Menu Icon** | Dashicons class **or** image URL | Top-level menu icon |

The menu icon accepts:

- A **dashicons class**, e.g. `dashicons-portfolio` (validated against `^dashicons-[a-z0-9_\-]+$`)
- A **full URL** to a 16×16-px image (`http(s)` only — `javascript:` / `data:` are rejected)

### 2. Admin UI Design

This is the design-focused section. Let's cover each control.

#### Primary Color

Replaces the indigo accent across every Easy Invoice admin screen. Pick via the color swatch or paste a `#RRGGBB` hex into the text input — they stay in sync. **Reset** clears the override so the default theme returns.

When set, the addon prints a scoped `<style>` block on every Easy Invoice admin page (only — never on the rest of wp-admin). The block overrides every Tailwind indigo utility the plugin uses:

```
bg-indigo-50 / 100 / 600
hover:bg-indigo-700
text-indigo-500 / 600 / 700 / 800
border-indigo-500 / 600
focus:ring-indigo-500
focus:border-indigo-500
```

A small palette is derived from your hex by mixing with white (for 50/100/500) and black (for 700/800). The palette is computed server-side at request time — no caching, so changes are instant.

::: tip Scoping
The recolor only applies on screens whose `get_current_screen()->id` contains `easy-invoice`. Your Posts, Plugins, Users, Settings pages are untouched.
:::

#### Sidebar Logo

Two halves:

- **Choose from media library** — opens the WordPress media picker. Pick an image (PNG / SVG recommended) and its URL is written back.
- **Logo Height** — 12–80 px. Width auto-scales. Default 32.

Once set, the addon hooks `easy_invoice_admin_logo_html` (a filter added to `main-template.php`) and replaces the default indigo SVG square with `<img src="$logo_url" style="height:Xpx;width:auto;">`. The label text next to the logo is kept unless you tick **Hide logo text**.

::: tip Common logo sizes
- Wordmark logos (text-style): 32 × 120 px with **Hide logo text** ticked
- Mark-only logos (square): 32 × 32 px with **Hide logo text** unticked
- Tall logos: bump **Logo Height** to 40–48 px
:::

#### Hide logo text

Removes the **menu_label** (or "Easy Invoice" default) text next to the logo in the sidebar. Useful when your logo image is a full wordmark.

#### Hide version badges

Removes the `v2.x` and `Pro v2.x` pills under the logo. End-clients don't need to know about plugin versions.

#### Hide "Back to WordPress"

Removes the **← Back to WordPress** link under the logo. Keeps end-clients inside your branded experience — they exit via the WP admin bar at the very top if they need to.

### 3. Document Footers

| Field | What it does |
|---|---|
| **PDF Footer HTML** | Replaces the default "Powered by Easy Invoice" footer on generated PDFs. Basic HTML allowed (sanitized via `wp_kses_post`). |
| **Email Footer HTML** | Replaces the default footer on emails sent from Easy Invoice. |

These hook the filters `easy_invoice_pdf_footer_html` and `easy_invoice_email_footer_html`. The filters are declared by White-Label; core Easy Invoice surfaces them in its PDF / email rendering pipeline (rolling out gradually — see [Roadmap](#roadmap)).

### 4. Support & Visibility

| Field | What it does |
|---|---|
| **Support / Help URL** | Replaces the plugin's default support links (which point to MatrixAddons). HTTP(S) only. |
| **Hide upgrade prompts** | Hides every "Upgrade to Pro" banner, plugin-row "Upgrade" link, and the **Free vs Pro** menu item. End-clients never see them. |

The "Hide upgrade prompts" toggle works by filtering `easy_invoice_show_upgrade_prompts` to false. The Free plugin's `PromotionService::init()` consults that filter at boot — if false, the entire promotion service skips its hooks and nothing renders.

## Filter hooks added to core for White-Label

The addon publishes these expectations and Easy Invoice / Easy Invoice Pro **honor** them progressively as releases land:

| Filter | Where it fires | Default |
|---|---|---|
| `easy_invoice_admin_logo_html` `($default_html)` | Sidebar in `main-template.php` | Default indigo SVG square + label |
| `easy_invoice_admin_show_back_to_wp` `(true)` | Sidebar | true |
| `easy_invoice_admin_show_version_badges` `(true)` | Sidebar | true |
| `easy_invoice_show_upgrade_prompts` `(true)` | `PromotionService::init()` | true |
| `easy_invoice_pdf_footer_html` `($html, $document)` | PDF render | core default |
| `easy_invoice_email_footer_html` `($html)` | Email render | core default |
| `easy_invoice_help_link_url` `($url)` | Support / help URL generation | matrixaddons.com |
| `easy_invoice_pro_show_promotions` `(true)` | Pro plugin promotion teasers | true |

## Security

The addon's input gates are deliberately strict because some values render in the admin chrome:

- **Hex color** validated via `^#[0-9a-fA-F]{6}$`. Anything else stored as empty string ("use default theme").
- **Menu icon** must be either `dashicons-[a-z0-9_\-]+` or an `http(s)` URL. `javascript:` / `data:` / `file:` schemes are dropped.
- **Help URL** must be `http(s)`.
- **PDF / email footers** sanitized via `wp_kses_post` — script tags and dangerous attributes stripped.
- **Plugin name / menu label** sanitized via `sanitize_text_field`.

## Permissions

Anyone with `manage_options` can change White-Label settings. Plan-tier check (`Agency`) is enforced at the **addon-enable** layer; once enabled, the settings page itself is open to administrators.

## Common scenarios

### "I want my agency's logo + purple primary"

1. Activate the addon
2. **Primary Color**: `#7c3aed` (purple-600)
3. **Sidebar Logo**: upload your wordmark, set height to 32
4. **Hide logo text**: ✓
5. **Plugin Name** + **Admin Menu Label**: "Acme Billing"
6. **Hide upgrade prompts**: ✓
7. Save

End-clients now see "Acme Billing" everywhere, in your purple, with your logo.

### "I want clients to see my support URL only"

1. Activate the addon
2. **Support / Help URL**: `https://acme.com/support`
3. **Hide upgrade prompts**: ✓ (kills the "Upgrade to Pro" link that would otherwise route to MatrixAddons)
4. **PDF Footer**: `Powered by Acme Billing · acme.com/support`
5. **Email Footer**: `Sent by Acme Billing — questions? support@acme.com`

### "Clients see WordPress admin chrome — how do I hide it?"

White-Label customises Easy Invoice's pages, **not** WordPress's chrome itself. To get clients off the WP admin altogether:

- Use a frontend client portal (Pro's [Client Portal](../clients) feature)
- Or install an admin-bar hider plugin and restrict the WP admin via roles

The combination of [Team Members & Audit Log](./team-roles) addon + White-Label = give clients a "Sales" role and they only see the Easy Invoice screens with your branding.

## Troubleshooting

### Primary color doesn't apply

1. Check the screen id contains `easy-invoice` — the recolor is intentionally scoped to Easy Invoice pages. View source and look for `<style id="ei-white-label-design">`.
2. Some elements use inline `style="…"` instead of utility classes — those won't recolor. Report the specific element and we'll add explicit overrides.

### Logo image too small / too big

Adjust **Logo Height** (12–80 px). Width auto-scales — there's no width control. If your logo is wider than the 64-px sidebar header allows, consider creating a square version.

### PDF / Email footer doesn't change

These filters depend on Easy Invoice's PDF / email render code calling `apply_filters('easy_invoice_pdf_footer_html', …)` at the right point. That hook is rolling out across releases — until your version of Pro fires it, set the footer manually via your own template override.

### Menu label still shows "Easy Invoice"

Hard-refresh the admin. The menu is built per-request server-side, so changes apply immediately on the **next** page load (not the current one).

## Roadmap

Coming in subsequent Pro releases:

- Native `easy_invoice_pdf_footer_html` filter calls inside the PDF render pipeline (currently the filter is declared but core hasn't started calling it yet on all PDF templates)
- Per-client portal branding (custom domain + per-client logo)
- Sidebar background color + dashboard hero color controls
- Login screen branding for the client portal

## See also

- [Team Members & Audit Log](./team-roles) — give end-clients scoped access without admin
- [Settings reference](../settings-reference) — what else can be customized without the addon
- [Hooks & filters](../hooks-filters) — full list of hooks White-Label uses
- [Addons overview](./)
