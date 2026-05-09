---
title: Email & notifications
description: Customize the emails Easy Invoice sends — invoice ready, quote ready / accepted / declined, payment received, payment reminder. Subjects, headings, bodies, and merge tags.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Easy Invoice Pro</strong> adds the <strong>Email Enhancements</strong> module — custom reply-to per template, brand colours, and the full <strong>Payment Reminder</strong> cadence. See <a href="/docs/features#email-enhancements">all email Pro features</a>.</span>
  <a class="doc-pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener">View pricing &amp; buy →</a>
</div>

# Email & notifications

Every email Easy Invoice sends — invoice notification, quote notification, payment receipt, reminder — has its own template under <span class="screen-path">Settings → Email</span>.

## Email types (free)

| Type | When it fires | Default subject |
| --- | --- | --- |
| **General settings** | Sender name & address used as the `From` for all emails. | n/a |
| **Invoice Available** | When you click _Send to Client_. | _Invoice {invoice_number} from {company_name}_ |
| **Quote Available** | When you click _Send to Client_ on a quote. | _Quote {quote_number} from {company_name}_ |
| **Quote Accepted** | When the client clicks "Accept" on the public quote. | _Quote {quote_number} accepted_ |
| **Quote Declined** | When the client clicks "Decline". | _Quote {quote_number} declined_ |
| **Payment Received** | After a payment is recorded as completed. | _Payment received for {invoice_number}_ |
| **Payment Reminder** | Daily cron (`easy_invoice_payment_reminder`) for `pending-bank` / `pending-cheque`. | _Payment reminder: {invoice_number}_ |

> Pro adds extra templates — receipt PDF email, recurring invoice notice, partial payment receipt, etc. See [All Pro features](/features#email-enhancements).

## Editing a template

For each template you can set:

- **Enable** — turn the template on or off entirely.
- **Recipient** — defaults to the client; can override (e.g. send admin a copy).
- **Subject** — supports merge tags.
- **Heading** — H1 inside the body.
- **Body** — full HTML, supports merge tags.

Save, then **Send a test** from the **General** tab to your own address.

## Merge tags

The most common merge tags (resolved in `EmailManager::*placeholders` — `includes/Services/EmailManager.php:448–543`):

### Invoice context

| Tag | Replaced with |
| --- | --- |
| `{invoice_number}` | Full invoice number, e.g. `INV-0042`. |
| `{invoice_date}` | Invoice issue date. |
| `{due_date}` | Due date. |
| `{invoice_total}` | Currency-formatted total. |
| `{invoice_url}` | Public link to the invoice. |
| `{invoice_status}` | Payment status (paid / unpaid / pending). |

### Quote context

| Tag | Replaced with |
| --- | --- |
| `{quote_number}` | Quote number. |
| `{quote_date}` | Issue date. |
| `{expiry_date}` | Quote validity end. |
| `{quote_total}` | Total. |
| `{quote_url}` | Public link. |
| `{accept_url}` / `{decline_url}` | One-click accept / decline links. |

### Payment context

| Tag | Replaced with |
| --- | --- |
| `{payment_amount}` | Currency-formatted amount. |
| `{payment_date}` | Date the payment was recorded. |
| `{payment_method}` | Gateway label. |
| `{transaction_id}` | Reference. |

### Client context

| Tag | Replaced with |
| --- | --- |
| `{client_name}` | First + last (or display name). |
| `{client_first_name}` | First name only. |
| `{client_email}` | Email. |
| `{client_address}` | Multi-line address. |

### Site context

| Tag | Replaced with |
| --- | --- |
| `{company_name}` | From <span class="screen-path">Settings → Company</span>. |
| `{company_address}` | same. |
| `{company_email}` | same. |
| `{site_url}` | `home_url()`. |

> Add custom merge tags via the `easy_invoice_settings_email_placeholders` filter — see [Hooks & filters](/hooks-filters#emails).

## Best practices

- Keep the subject **short** and **personal**: `{invoice_number} from {company_name}` is enough.
- Add a clear CTA in the heading: "Pay invoice {invoice_number}".
- In the body, **always** include `{invoice_url}` so clients can pay immediately.
- For Pro reminders, vary the tone: friendly first, firmer at +7 days, escalation at +14 days.

## Deliverability

WordPress's `wp_mail` uses PHP's `mail()` by default — which most hosts hide behind throttles or spam filters. **Use SMTP** for anything past 10 emails / day.

Recommended:

- **WP Mail SMTP** plugin → connect to SendGrid, Postmark, Mailgun, Amazon SES, or Gmail.
- Add **SPF**, **DKIM**, and **DMARC** records to your domain.
- Test with [mail-tester.com](https://www.mail-tester.com/).

> If emails don't arrive, see [Troubleshooting → Email not arriving](/troubleshooting#email-not-arriving).

## Pro: Email Enhancements

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Per-template reply-to + brand colours + extra templates</span>
  </div>
  <p class="pro-callout__desc">Pro adds: per-template reply-to email, brand-colour controls (header / button / accent), invoice PDF as attachment, partial payment receipt template, recurring invoice notice template, deposit invoice notice template, and the full payment-reminder cadence (before / on / after due).</p>
  <a class="pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/">Unlock email Pro →</a>
</div>

## Cron-driven emails

| Hook | Frequency | Purpose |
| --- | --- | --- |
| `easy_invoice_payment_reminder` | daily | Free: pending-bank / pending-cheque reminder. |
| `easy_invoice_send_payment_reminders` | daily | Pro: full cadence (before / on / after due). |
| `easy_invoice_quote_expiration_check` | daily | Auto-expire stale quotes; sends optional notice. |
| `easy_invoice_recurring_cron` | every 2 minutes | Generates new recurring invoices and sends notice. |
| `easy_invoice_pro_process_subscriptions` | daily | Subscription invoice generation. |

> If WP-Cron is broken, none of these run — see [Troubleshooting → WP-Cron isn't running](/troubleshooting#wp-cron-isnt-running).

## Where to go next

- 🧾 [Invoices](/invoices) — sending invoices.
- 📝 [Quotes / estimates](/quotes) — quote-related emails.
- 💳 [Payments](/payments) — receipt & reminder context.
- 💎 [Pro features overview](/third-party-integrations) — Email Enhancements details.
