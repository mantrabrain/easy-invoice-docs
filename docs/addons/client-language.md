---
title: Client Language (Pro addon)
description: Give each client a language; their invoices, quotes, PDFs and emails are produced in it while your admin stays in the site language.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Professional tier</span>
  <span>Requires an Easy Invoice Pro Professional licence or above. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Client Language

A Swiss agency invoicing French, German and Italian clients from one site needs three invoice languages, not one. WordPress has a single site language; this addon gives each **client** their own.

## What you get

- **A language on the client record.** Every document produced for that client — the public invoice and quote page, the PDF, the invoice, quote and payment emails — is rendered in it. Your admin screens never change.
- **Two sources of wording**, layered:
  1. the **WordPress language pack** installed for that language translates the plugin's own strings;
  2. the **Translations page** (Easy Invoice → Translations) holds your wording per language — the document labels you renamed under Settings, and the email subjects and bodies you wrote.
- **Graceful fallback.** Anything without a translation goes out in the site language, so a missing pack degrades to today's behaviour, never to broken output.

## Enabling

1. Install the language packs you need under **Settings → General → Site Language** (choose the language, save, then switch back — the pack stays installed), or with WP-CLI: `wp language core install de_DE`
2. Open **Easy Invoice → Addons** and activate **Client Language**
3. Open a client record: a **Document language** panel lists the site language and every installed pack. Pick one and save.
4. Open **Easy Invoice → Translations**, choose the language, and fill in the labels and email text you want that client to see

## The Translations page

One language at a time. Strings are grouped by where they appear:

- **Document labels** — the labels as you saved them under Settings (e.g. "Sub Total", "Bill to"). A translation here applies wherever that label prints.
- **Plugin strings** — labels the plugin prints itself, and plural pairs written as `one|many`.
- **Emails** — the subject and body of every email template as saved on the Email settings screens. Placeholders such as `{{invoice_number}}` work as usual.

Leave a field empty to keep the default. **Export** downloads the language as JSON (for a backup, or to hand to a translator); **Import** loads one back.

## What is not translated

Content you typed on the invoice itself — line items, notes, terms — is yours and goes out as written. Dates and currency follow the switched locale's formats.

## For developers

| Hook | Type | Purpose |
|---|---|---|
| `easy_invoice_client_locale_switched` | action | After the locale was switched for a client's document (`$locale`) |
| `easy_invoice_text_setting` | filter (free plugin) | A saved document label on its way to a document (`$value`, `$key`, `$default`) |
| `easy_invoice_email_template_data` | filter (free plugin) | An email template before subject and body are built (`$template`, `$template_key`, `$document`) |
| `easy_invoice_email_finished` | action (free plugin) | Once a send is over, whether or not it went out |
| `easy_invoice_pro_translatable_strings` | filter | Add strings to the Translations page |

The client's language is user meta `_easy_invoice_client_locale`; overrides live in `easy_invoice_pro_translations_{locale}`.
