---
title: Privacy & GDPR Tools (Pro addon)
description: Wire Easy Invoice into WordPress's Personal Data Export and Erase tools so client invoice and quote history is included automatically in GDPR / CCPA data-subject requests.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included free with Easy Invoice Pro — no license key required. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Privacy & GDPR Tools

Comply with GDPR, CCPA, and other data-protection laws in one click. The addon wires Easy Invoice into WordPress's built-in Personal Data Export and Erase tools — so when a client requests their data (or asks to be forgotten), their complete invoice, quote, and payment history is included automatically.

## When you need this

- You operate in the **European Union** — GDPR requires you to honour data-subject requests within 30 days
- You operate in **California, Colorado, Virginia, or another US state with privacy laws** — CCPA / CPRA / CDPA require similar handling
- You serve **enterprise B2B clients** doing due diligence on your data-handling policies
- You're getting **manual export requests** from clients and want to automate them

If you only serve clients in a single non-regulated jurisdiction and have no compliance requirements, this addon is optional.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Privacy & GDPR Tools**
3. Click **Activate**

That's it — the addon hooks itself into WordPress's privacy tools immediately. There are no settings to configure; it just works.

## How it integrates

WordPress core has two tools under **Tools → Export Personal Data** and **Tools → Erase Personal Data**:

- An admin enters a user's email address
- WP sends a confirmation email to that user
- Once confirmed, the admin can download (or erase) all stored data

By default, WP only knows about its own data (user profile, comments). This addon registers exporters and erasers for Easy Invoice data, so the same flow includes:

- All invoices the user is associated with
- All quotes
- All payment records
- Any notes / metadata Easy Invoice stores about them

## What gets exported / erased

**Exported** (downloaded as a structured ZIP):

- Invoice list with line items, totals, taxes, and statuses
- Quote list with line items, totals, and accept/decline history
- Payment records with timestamps, amounts, and gateway references
- Any custom fields you've added to clients via filters

**Erased** (only after explicit admin confirmation):

- The user record is removed from Easy Invoice's client roster
- Their invoices and quotes are **anonymized** (kept for tax record purposes but stripped of personal identifiers) — required for legal compliance, since you generally cannot fully delete tax records

The anonymization step is critical: tax authorities in most jurisdictions require you to keep invoice records for 5-7 years. The addon correctly balances "right to be forgotten" with "obligation to keep tax records" by removing personal identifiers while preserving the record itself.

## Client-portal integration

If you also use the [Client Portal addon](./client-portal), this addon adds two buttons to the client account screen:

- **Export My Data** — clients trigger their own data export without admin intervention
- **Delete My Account** — clients can request erasure (subject to admin confirmation)

This means GDPR requests don't have to come through email — clients self-serve. Big admin-time saver.

## Settings location

There's no settings page for this addon — it's a wire-it-up-and-forget feature. The WP-core privacy tools at **Tools → Export Personal Data** and **Tools → Erase Personal Data** automatically pick up Easy Invoice data once the addon is active.

## See also

- [Client Portal](./client-portal) — pairs with self-service data export
- [Team Members & Audit Log](./team-roles) (Agency) — for tracking who handled which data-subject request

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Privacy & GDPR Tools is included free with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
