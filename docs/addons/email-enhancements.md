---
title: Email Enhancements (Pro addon)
description: Route client replies to the right inbox — one Reply-To for everything or one per kind of email — and place every email Easy Invoice sends in your own HTML layout.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included free with Easy Invoice Pro — no license key required. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Email Enhancements

Two things the stock emails cannot do on their own:

- **Replies go where you want them.** An invoice email is sent from your site's address; when the client hits Reply, the answer lands there too. With this addon, invoice questions can go to accounts, quote replies to sales, receipts and reminders wherever they belong.
- **Every email in your own layout.** The free plugin brands emails with your logo and footer inside its stock layout. This addon lets you replace that layout with a full HTML document of your own — colours, fonts, header, footer — while the message text still comes from your email templates.

Settings live on their own page: **Easy Invoice → Addons → Email Enhancements → Settings** (the page is `easy-invoice-addon-email-enhancements`).

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Email Enhancements** and click **Activate**
3. Click **Settings →** on the card

## Where replies go

| Setting | What it does |
|---|---|
| **Reply-To for all emails** | The address a client's reply goes to, whatever the email. Empty keeps replies going to the From address (Settings → Email). |
| **Reply-To name** | The name shown on that address. Empty uses your business name from Settings → Company. |
| **Invoice emails / Quote emails / Payment receipts / Payment reminders** | A Reply-To for that kind of email only. Empty falls back to the address above. |

Only one Reply-To is ever sent: an address here replaces the one from Settings → Email for that kind of email rather than adding a second header. Reminders from [Smart Reminders](./smart-reminders) and the basic payment reminder count as "Payment reminders" and also go out with the From address from Settings → Email (they used to be sent as "WordPress").

## Email layout

Paste a complete HTML document into **Email layout** and every email — invoices, quotes, receipts, reminders, admin notifications — is placed in it. Leave it empty to keep the stock layout.

Placeholders:

| Placeholder | Replaced with |
|---|---|
| `{{content}}` | The message — **required**; without it the layout is ignored and the stock one is used (the page tells you). |
| `{{logo}}` | The logo block from Settings → Email, or nothing when no logo is set. |
| `{{footer}}` | The footer text from Settings → Email (or White-Label's email footer). |
| `{{company_name}}` | Your business name. |
| `{{site_url}}` | Your site's address. |
| `{{year}}` | The current year. |

**Start from the stock layout** fills the box with a plain version of the built-in layout so you can restyle it rather than write one from scratch. A few things to know:

- Email clients ignore external stylesheets and scripts. Keep styles in a `<style>` block in the `<head>` or inline. Scripts and `on*` attributes are stripped on save.
- The message text uses the classes `.button` (the "View and pay" button), `.highlight-box` and `.info-box`, so give those a style.
- The message keeps its paragraphs; the layout decides everything around them.

**Send a test to …** on the right sends the invoice layout to your own address with the saved settings, so you can see it in a real inbox and reply to it to check the Reply-To. Save first — the test uses what is saved.

## How "From" vs "Reply-To" actually works

Most people confuse these two — they're different and both matter:

| Field | Purpose | What the client sees |
|---|---|---|
| **From** | Who *sent* the email (technical sender, affects deliverability) | "From: Acme `<noreply@acme.com>`" |
| **Reply-To** | Where *replies* go when the client hits Reply | "To: `billing@acme.com`" (auto-filled in their reply) |

You generally want:
- **From** = a stable, SPF/DKIM-aligned address from your hosting (often the WordPress admin email) — gives best deliverability.
- **Reply-To** = the *human* address where you actually want replies.

Email Enhancements lets you set Reply-To without touching From — best of both worlds.

## Pairs well with

- [Smart Reminders & Late Fees](./smart-reminders) — Reminder emails use the Reminder Reply-To override automatically.
- [Client Portal](./client-portal) — Portal users replying to their account-related emails reach the address you choose.
- [White-Label & Brand Override](./white-label) — Match your custom Reply-To names to your white-label brand.

## Troubleshooting

**"My Reply-To setting isn't being respected — replies still go to the From address"**
- Some email clients (older Outlook in particular) silently strip the Reply-To header. There's no fix for that on the sender side — the email is sent correctly, the client just ignores it.
- Some SMTP plugins (e.g. WP Mail SMTP) override headers. Check your SMTP plugin's settings for "Force From" / "Force Reply-To" options and disable them.

**"My layout is saved but emails still look like the stock one"**
- The layout must contain `{{content}}`; the settings page warns when it does not.
- Check the email actually came from Easy Invoice — WooCommerce, membership and form plugins send their own emails, which this addon does not touch.

**"PDFs aren't being attached"**
PDF attachment is a **free-plugin** setting, not part of this addon: **Settings → Email → General → Attach a PDF copy to invoice emails** (Easy Invoice 2.4.0 or later). It is off by default. When it is on, the invoice is rendered on the server and attached to the invoice email; the emailed link still works either way. If the box is missing, update the free plugin.

## For developers

The addon works through two filters in the free plugin, which your own code can use as well: `easy_invoice_email_headers( $headers, $kind, $document )` and `easy_invoice_email_html( '', $message, $logo_html, $footer_html, $settings )` — return a full HTML document from the latter to take over the layout. `easy_invoice_email_footer_html` filters just the footer block. See [Hooks & filters](../hooks-filters).

## See also

- [Email & notifications](../email-settings) — every email field and template
- [Smart Reminders](./smart-reminders) — automated reminder chains that use these Reply-To settings
- [Settings reference](../settings-reference)

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Email Enhancements is included free with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
