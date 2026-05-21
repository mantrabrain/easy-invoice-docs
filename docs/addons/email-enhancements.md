---
title: Email Enhancements (Pro addon)
description: Set a Reply-To address so client replies reach the right inbox, override per email type (invoice / reminder / receipt), and load custom email templates from your theme.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included free with Easy Invoice Pro — no license key required. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Email Enhancements

WordPress's default email delivery is functional but limited. The "From" address is whatever your site admin email is — and when a client hits **Reply** on the invoice email, that reply goes to the same address that sent it. For most businesses that's fine. But the moment you have:

- A separate **billing** or **support** inbox staffed by a different person,
- A **shared inbox** like `accounts@yourcompany.com`,
- Or a **custom template** in your theme that you want WordPress to use instead of the plugin's bundled one,

…the defaults break down.

The **Email Enhancements** addon fixes all three. Set a Reply-To address (so replies land in the right inbox), override it per email type (invoices, reminders, receipts), and point WordPress at your own theme-resident templates.

## Plain-English problem this solves

Your WordPress admin email is `admin@yourcompany.com`. When Easy Invoice sends an invoice, it shows up in the client's inbox as "from `admin@yourcompany.com`." Your client clicks Reply to ask a question about the invoice, and… the reply lands in your **admin inbox**, which probably nobody monitors for client questions. Or worse: the admin inbox auto-forwards to several people, creating CC spam.

With Email Enhancements, you set **Reply-To = `billing@yourcompany.com`**. The "From" stays as the technical admin email (which keeps deliverability strong — DKIM, SPF, etc. are aligned), but clicking Reply now goes straight to your billing team. Clean separation, no inbox fishing.

## When you need this

- **Any business with separate admin and customer-facing email addresses** — universal need.
- **Agencies / teams** where billing replies should go to one person and tech replies to another.
- **Shared inboxes / helpdesk software** (Zendesk, Help Scout, Freshdesk) — point Reply-To at your ticket-system address.
- **White-label resellers** running Easy Invoice on behalf of clients — the client's inbox handles replies, your admin handles deliverability.

If you're a one-person shop using one email for everything, the defaults work — but it costs nothing to set Reply-To anyway.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Email Enhancements**
3. Click **Activate**

Settings appear in two places:

1. **Easy Invoice → Settings → Email** — the global Reply-To, Reply-To Name, and Template Path settings.
2. **Per-email-type sub-sections** — three more Reply-To overrides, one each for Invoice, Reminder, and Receipt emails.

## Every setting explained

### Global Reply-To email address

**What it does:** When a client clicks **Reply** on any email Easy Invoice sends, their reply goes to this address instead of whatever the "From" was.

**Default:** Empty (replies go to the "From" address — usually your site admin email).

**Examples:**
- `billing@yourcompany.com` — replies land with your accounts team.
- `support@yourcompany.com` — replies land with general support.
- `hello@yourcompany.com` — one shared inbox for everything.
- `ticket-abc123@helpscout.net` — replies turn into helpdesk tickets automatically.

**Plain-English:** This is the "if anyone replies, send the reply here" address. Most setups change this once and forget about it.

**Tip:** If you use a helpdesk tool (Zendesk, Help Scout, Freshdesk, etc.), copy the inbound email address it gives you. Replies become tickets — no manual forwarding.

### Reply-To Name

**What it does:** The display name for the Reply-To address. When a client's email client shows the reply destination, this is what they see.

**Default:** Empty (falls back to your company name from Settings).

**Examples:**
- `Support Team` — friendly, neutral.
- `Acme Billing` — clearly labelled by department.
- `Acme Support · Reply Here` — pushy but clear.

**Plain-English:** This is the human-readable label for the Reply-To address. Set it so clients know what they're replying to.

### Email Template Path

**What it does:** If you have your own HTML email templates inside your theme (or a child theme), Easy Invoice will load them from this folder instead of using the bundled defaults.

**Default:** Empty (use the plugin's bundled templates).

**Recommended path:** `wp-content/themes/your-theme/easy-invoice/emails`

**How to use it:**
1. Copy any template file from `wp-content/plugins/easy-invoice/templates/emails/` into your theme at the matching subpath.
2. Edit the copy — change colors, add your CSS, restructure the layout — anything HTML/CSS.
3. Set this field to the folder path **relative to the site root** (no leading slash).
4. Easy Invoice prefers your copy over the bundled one. Other templates still come from the plugin.

**Plain-English:** This is the "I want to design my own emails" escape hatch. If your branding requires colors and layouts the plugin defaults can't match, point this at your custom folder and copy/edit just the templates you care about.

**When to leave empty:** If the bundled templates are fine for your business. Most users never need to touch this.

### Reply-To: Invoice Emails (override)

**What it does:** Overrides the **Global Reply-To** specifically for the **invoice-sent** email. If empty, invoices use the global Reply-To. If filled, this address takes precedence for new-invoice emails only.

**Default:** Empty (use Global Reply-To).

**Common use:**
- Global Reply-To: `support@yourcompany.com`
- Invoice override: `billing@yourcompany.com`
- Reminder override: `reminders@yourcompany.com`
- Receipt override: `accounts@yourcompany.com`

This routes each email type to the right person/inbox without touching the global setting.

**Plain-English:** Think of it like setting different return-addresses for different mail categories. You don't have to do this — just nice when you can.

### Reply-To: Reminder Emails (override)

**What it does:** Same as above, but for the automated **payment reminder** emails (the chase sequence sent for unpaid invoices — particularly if you're using the [Smart Reminders](./smart-reminders) addon).

**Why a separate override:** Reminder emails are higher-friction (someone is being chased), so many businesses route those to a dedicated billing inbox where someone is empowered to negotiate or extend.

**Examples:**
- `collections@yourcompany.com` — formal/firm tone team.
- `billing@yourcompany.com` — same team that handles all money matters.
- Leave empty → uses Global Reply-To.

### Reply-To: Receipt Emails (override)

**What it does:** Same as above, but for the **payment-received receipt** email that goes to clients after they pay.

**Why a separate override:** Receipt-email replies are usually questions like "can you re-send my receipt?" or "I need this in a different format" — different from billing/collections. Often handled by a different team.

**Examples:**
- `receipts@yourcompany.com` — dedicated address.
- `accounts@yourcompany.com` — accounting team.
- Leave empty → uses Global Reply-To.

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

**"I set a Template Path but my custom template isn't loading"**
- Confirm the path is **relative to the site root** (e.g. `wp-content/themes/your-theme/easy-invoice/emails`, NOT `/var/www/html/wp-content/...`).
- Confirm the file at that path has the same name as the bundled template (e.g. `invoice-sent.php`).
- Clear any object/page cache after copying the template.

**"PDFs aren't being attached"**
PDF attachment is configured in the main **Settings → Email** section (not in this addon's section). The PDF-attach feature is part of the free Easy Invoice plugin; this addon just adds the Reply-To controls on top.

## Settings location

All Email Enhancements settings live on **Easy Invoice → Settings → Email**. There's no separate admin page.

## See also

- [Email & notifications](../email-settings) — every email field and template
- [Smart Reminders](./smart-reminders) — automated reminder chains that use these Reply-To settings
- [Settings reference](../settings-reference)

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Email Enhancements is included free with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
