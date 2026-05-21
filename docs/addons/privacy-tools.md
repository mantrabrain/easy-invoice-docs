---
title: Privacy & GDPR Tools (Pro addon)
description: Wire Easy Invoice into WordPress's Personal Data Export and Erase tools, set an invoice data-retention policy, and auto-populate the privacy-policy boilerplate for client invoice and quote history.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included free with Easy Invoice Pro — no license key required. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Privacy & GDPR Tools

Comply with GDPR, CCPA, and other data-protection laws in one click. The addon wires Easy Invoice into WordPress's built-in Personal Data Export and Erase tools, sets a clear retention policy for invoice records, and drops the matching privacy-policy boilerplate into the WordPress **Settings → Privacy** policy guide.

## What this addon owns vs. what it doesn't

To keep settings clean, ownership of the **Privacy & GDPR** settings section is split between two addons:

| What you want to do | Where the setting lives |
|---|---|
| Set how long invoice records are retained | **Privacy & GDPR Tools** addon (this page) |
| Enable WordPress Personal-Data Export / Erase | **Privacy & GDPR Tools** addon (this page) |
| Show the auto-populated privacy-policy boilerplate | **Privacy & GDPR Tools** addon (this page) |
| Add Export My Data / Delete My Account buttons to the client portal | **Client Portal** addon (gated on this addon being active) |
| Require login to view an invoice / quote URL | **Secure Links** addon |
| Restrict an invoice / quote URL to its owning client | **Secure Links** addon |
| Expire invoice / quote URLs after N days | **Secure Links** addon |
| Block PDF / receipt downloads for unauthenticated users | **Secure Links** addon |

This avoids two competing sources of truth. URL access-control is the **Secure Links** addon's job; data-retention and GDPR plumbing is this addon's job.

## When you need this

- You operate in the **European Union** — GDPR requires you to honour data-subject requests within 30 days.
- You operate in **California, Colorado, Virginia, or any US state with privacy laws** — CCPA / CPRA / CDPA require similar handling.
- You serve **enterprise B2B clients** doing due diligence on your data-handling policies.
- You're getting **manual export requests** from clients and want to automate them.

If you only serve clients in a single non-regulated jurisdiction and have no compliance requirements, this addon is optional.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Privacy & GDPR Tools**
3. Click **Activate**

The addon hooks into WordPress's privacy tools immediately. Two settings appear under **Easy Invoice → Settings → Privacy & GDPR**.

## Every setting explained

### Invoice Data Retention

**What it does:** How long invoice records remain in your database. Choices: `1 year`, `3 years`, `5 years`, `7 years`, `Keep forever`.

**Default:** `Keep forever` — safest setting because most tax authorities require records to be kept for 5–7 years (UK HMRC: 6 years, US IRS: 7 years, EU member states: varies between 5 and 10).

**Important:** This setting feeds the auto-generated privacy-policy boilerplate (see below). It does **not** automatically delete records — the field is informational, plus a hook your accountant can rely on when auditing your stated policy. Verify your local requirements before shortening from the default.

### Enable GDPR Data Export & Erasure

**What it does:** Registers Easy Invoice with WordPress's built-in `Tools → Export Personal Data` and `Tools → Erase Personal Data` flows. When enabled, requests submitted to those tools return / erase invoice and quote records that match the requesting email address.

**Default:** On.

**When to leave it on:** Any time you operate in a regulated jurisdiction. The overhead is zero unless a request is actually submitted.

**When to turn it off:** Only if you have a separate compliance pipeline that handles data-subject requests outside WordPress.

## How the WP Personal-Data integration works

WordPress core has two tools under **Tools → Export Personal Data** and **Tools → Erase Personal Data**:

- An admin enters the user's email address
- WP emails the user a confirmation link
- Once confirmed, the admin can download (or erase) all stored data

Out of the box, WP only knows about its own data (user profile, comments). With this addon active, the same flow now includes:

- Every invoice whose `_client_email` matches the requested address — ID, title, issue date, status
- Every quote whose `_client_email` matches — ID, title, issue date, status

**Export** returns a structured ZIP with one item per record. **Erase** moves matching invoices and quotes to Trash (`wp_trash_post` — not permanent delete), so accidental erasures can still be recovered for 30 days by the WP cron, and tax-record obligations aren't broken by a single misdirected request.

## Privacy-policy boilerplate

When the addon is active, a ready-to-copy section is added to **Settings → Privacy → Policy Guide → Easy Invoice Pro**:

- States that you store client name, email, address, phone, company, and invoice / quote line items.
- States the legal basis (issuing invoices, accepting payments, meeting tax-record obligations).
- States your **retention period** — which automatically tracks whatever you select in the **Invoice Data Retention** setting.
- States that clients can request export or erasure via the WordPress tools, if **Enable GDPR Data Export & Erasure** is on.

Copy that section into your site's published privacy policy to surface the disclosure to your customers.

## Client-portal integration

If you also have the [Client Portal](./client-portal) addon active, two additional toggles appear on the **Privacy & GDPR** settings tab:

- **Allow Self-Service Data Export** — adds an *Export My Data* button to the logged-in client account screen
- **Allow Self-Service Account Deletion** — adds a *Delete My Account* button to the same screen

Both toggles are **gated on this addon being active**. With Client Portal alone, those buttons are hidden — the client-portal addon defers the GDPR rights to the canonical GDPR addon rather than duplicating the functionality.

This means GDPR requests don't have to come through email — clients self-serve. Big admin-time saver.

## Settings location

Settings appear on **Easy Invoice → Settings → Privacy & GDPR** when the addon is enabled. The tab is hidden if the addon is off — there are no half-active states.

## See also

- [Client Portal](./client-portal) — pairs with self-service data export / deletion (its Privacy & GDPR fields require this addon)
- [Secure Links for Invoices & Quotes](./secure-links) — the canonical owner of URL access-control settings (require login, restrict to owner, link expiry)
- [Team Members & Audit Log](./team-roles) (Agency) — for tracking who handled which data-subject request

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Privacy & GDPR Tools is included free with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
