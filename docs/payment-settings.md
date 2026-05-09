---
title: Payment gateways
description: Configure PayPal & Manual (free) and the eight Pro gateways — Stripe, Square, Authorize.Net, Mollie, Bank Transfer, Cheque, Cash, Moneris. Test mode, webhooks, and currencies.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Easy Invoice Free</strong> ships <strong>PayPal</strong> &amp; <strong>Manual</strong>. <strong>Easy Invoice Pro</strong> adds Stripe, Square, Authorize.Net, Mollie, Bank Transfer, Cheque, Cash, and Moneris — see <a href="/docs/features#pro-gateways">all Pro gateways</a>.</span>
  <a class="doc-pro-callout__cta" href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener">View pricing &amp; buy →</a>
</div>

# Payment gateways

Configure where the **Pay now** button on the public invoice sends the client. Each gateway has its own credentials, sandbox toggle, and (where applicable) webhook URL.

## Where to find them

Open <span class="screen-path">Easy Invoice → Settings → Payment</span>. Each enabled gateway becomes a row on the public invoice page; client picks one.

## PayPal Standard (Free)

The simplest gateway: paste your PayPal email, set sandbox vs live, and you're done.

| Field | Note |
| --- | --- |
| **PayPal email** | The address that receives money. |
| **Sandbox mode** | Toggle for testing — uses sandbox.paypal.com. |
| **IPN listener URL** | PayPal IPN posts back here when a payment clears. Easy Invoice handles this on `admin-post.php` automatically. |

> PayPal Standard uses **IPN** (Instant Payment Notification), not REST webhooks. Make sure your hosting allows incoming POSTs from `*.paypal.com`.

## Manual (Free)

For "I'll pay you offline" workflows — wire transfer, in-person cash, anything you reconcile manually.

| Field | Note |
| --- | --- |
| **Title** | Label shown to the client (default: _Manual Payment_). |
| **Description** | Instructions ("Wire to account 12345…"). |
| **Order status after submission** | Defaults to `pending`. |

## Stripe <span class="pro-pill">PRO</span>

Modern card, Apple Pay, Google Pay, Link.

### Connect

<ol class="step-list">
  <li>From Stripe dashboard → <strong>Developers → API keys</strong>: copy <strong>Publishable</strong> + <strong>Secret</strong>.</li>
  <li>Open <span class="screen-path">Easy Invoice → Settings → Payment → Stripe</span>.</li>
  <li>Toggle <strong>Test mode</strong> if you're using test keys.</li>
  <li>Paste the keys, save.</li>
</ol>

### Webhook

Add a webhook in Stripe dashboard:

- **Endpoint URL**: `https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_stripe_webhook`
- **Events**: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`.
- Copy the **Signing secret** back into <span class="screen-path">Stripe settings</span>.

> Stripe is the cleanest gateway for digital businesses — see [PCI / SCA notes in the FAQ](/faqs#stripe-sca-and-3d-secure).

## Square <span class="pro-pill">PRO</span>

US / Canada / UK / AU / JP card processing with in-person reader support.

| Field | Source |
| --- | --- |
| **Application ID** | Square dashboard → Apps → My app → Credentials. |
| **Access token** | same. |
| **Location ID** | Square dashboard → Locations. |
| **Webhook URL** | `admin-ajax.php?action=easy_invoice_square_webhook` |

> Square has a 15-minute reconcile cron (`easy_invoice_check_pending_square_payments`) for pending charges that webhook missed.

## Authorize.Net <span class="pro-pill">PRO</span>

US-focused. Hosted Form (CIM) supported.

| Field | Source |
| --- | --- |
| **API login ID** | Authorize.Net merchant account. |
| **Transaction key** | same. |
| **Test mode** | Toggle for sandbox. |
| **Relay response URL** | `admin-ajax.php?action=easy_invoice_authorizenet_response` |

## Mollie <span class="pro-pill">PRO</span>

Europe-friendly: SEPA, iDEAL, Bancontact, Sofort, plus card.

| Field | Source |
| --- | --- |
| **API key** | Mollie dashboard → Developers. |
| **Test API key** | toggle test mode. |
| **Webhook** | `admin-ajax.php?action=easy_invoice_mollie_webhook` |

## Bank Transfer <span class="pro-pill">PRO</span>

Show your bank details on the invoice. Client wires the money. You mark the Payment as completed once it lands.

| Field | What it is |
| --- | --- |
| **Account name** | Beneficiary on the wire. |
| **Account number / IBAN** | Numbers only or IBAN. |
| **Swift / BIC** | International ID. |
| **Bank name + branch** | Printed below the account info. |
| **Instructions** | Free-text notes ("use invoice number as reference"). |

When client picks Bank Transfer at checkout, the invoice flips to `pending-bank`. Reconcile manually via <span class="screen-path">Payments</span>.

## Cheque <span class="pro-pill">PRO</span>

Mailed cheques. Same flow as Bank Transfer (`pending-cheque` status).

| Field | What it is |
| --- | --- |
| **Mail to** | Address shown to the client. |
| **Make cheque payable to** | Name on the cheque. |
| **Instructions** | Anything else (drop-off times, etc.). |

## Cash <span class="pro-pill">PRO</span>

In-person cash. Client picks "Cash"; invoice flips to `pending`. Mark completed once collected.

## Moneris <span class="pro-pill">PRO</span>

Canadian-focused processor. Configure with **Store ID** + **API token**.

> Note: Moneris files exist in the Pro plugin tree. If you can't see the gateway after activation, see [Troubleshooting → Moneris missing from settings](/troubleshooting#moneris-not-showing).

## Currencies & gateways

| Gateway | Supported currencies |
| --- | --- |
| PayPal | All major (USD, EUR, GBP, AUD, JPY, INR, etc.) |
| Stripe | 130+ currencies — see [stripe.com/currencies](https://stripe.com/global). |
| Square | USD, CAD, GBP, AUD, JPY (single-currency per Square account). |
| Authorize.Net | Single currency per merchant account. |
| Mollie | EUR + many more for SEPA / iDEAL. |
| Bank / Cheque / Cash | Any (you set the displayed currency). |
| Moneris | CAD, USD. |

> If your invoice currency doesn't match the gateway's supported list, the client sees an error at the gateway redirect. Switch invoice currency before sending.

## Test mode best practice

For each gateway, toggle test mode and run **at least one full payment** before going live. Use:

- Stripe test card `4242 4242 4242 4242` (any future date / CVC).
- PayPal sandbox accounts (one buyer + one merchant).
- Authorize.Net test card `4242…` and sandbox login.

Then disable test mode and re-test with a small real payment ($1).

## Per-invoice gateway override

If a specific client should only see Bank Transfer, set their default gateway in their user profile (Pro). Otherwise the invoice shows every enabled gateway.

## Where to go next

- 🧾 [Payments](/payments) — Payment records, manual entries, refunds.
- ✉️ [Email & notifications](/email-settings) — receipt + reminder emails.
- 💎 [Pro features overview](/third-party-integrations) — every gateway + Pro module.
- 📋 [All Pro features](/features) — flat catalog.
