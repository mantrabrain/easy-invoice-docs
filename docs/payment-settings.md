---
title: Payment gateways — step-by-step setup
description: Connect every payment gateway supported by Easy Invoice — PayPal & Manual (Free) plus Stripe, Square, Authorize.Net, Mollie, Paystack, Bank Transfer, Cheque, Cash, and Moneris (Pro). Includes exact dashboard links, credential names, webhook URLs, and test-mode steps.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Easy Invoice Free</strong> ships <strong>PayPal Standard</strong> and <strong>Manual</strong>. <strong>Easy Invoice Pro</strong> adds Stripe, Square, Authorize.Net, Mollie, Paystack, Bank Transfer, Cheque, Cash, and Moneris. Need them? <a href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener">Upgrade to Easy Invoice Pro →</a></span>
</div>

# Payment gateways

This page walks a **first-time user** through connecting every gateway Easy Invoice supports. Each section follows the same structure:

1. What it does
2. Where to get credentials (with **exact dashboard links**)
3. Where to paste them in Easy Invoice (with the **exact field labels**)
4. Webhook / IPN URL to copy
5. How to test before going live

> **Common path:** *Easy Invoice → Settings → Payment* — every gateway lives here as a collapsible row. Tick the checkbox at the top of a row to **enable** it, then fill in credentials below.

![Payment methods — per-gateway enable, reorder, credentials](/screenshots/16-settings-payment.png)

---

## How the Payment page works (read this first)

When you open **Easy Invoice → Settings → Payment**, you'll see:

- **A list of gateways** (one row each). Each row has a checkbox to enable, a display name input ("Credit card", "Pay with PayPal" — anything you want clients to see), and credential fields below.
- **A drag handle** on each row — drag to reorder. The top-most enabled gateway becomes the default on the public invoice.
- **Save Changes** button (top right of the page).

If a gateway row is missing required credentials, the **public invoice** will not show it to clients even if its checkbox is on.

> **Without Pro:** above the gateway list you'll see an **"Unlock more payment gateways with Easy Invoice Pro"** teaser block listing every Pro-only gateway (Stripe, Square, Authorize.Net, Mollie, Paystack, Moneris, Bank Transfer, Cheque, Cash). Click any row, or the **View pricing** button on the right, to upgrade. The block disappears as soon as Pro is active.

---

## 1. Manual <span class="free-pill">FREE</span>

Use this for any **offline payment** — cash in person, bank transfer you'll reconcile manually, anything where Easy Invoice doesn't talk to a processor.

### Setup

1. Go to **Easy Invoice → Settings → Payment**.
2. Check **Enable** on the **Manual** row.
3. Save.

That's it — there are no credentials. When a client picks Manual on the public invoice, they see a "We'll be in touch" message. You then mark the invoice as **Paid** yourself from **Payments → Add New Payment**.

### When to use it

- One-off cash deals
- Wire transfer arrangements with a known client
- Cheque payments (Pro has a dedicated Cheque gateway with a mailing address field — see below)

---

## 2. PayPal Standard <span class="free-pill">FREE</span>

PayPal Standard is the **simplest hosted checkout** in WordPress invoicing — your client clicks **Pay Now**, lands on PayPal, pays, returns to your invoice.

### What you need

A PayPal **Business** account ([sign up free at paypal.com](https://www.paypal.com/business)) — Personal accounts cannot receive merchant payments.

### Step-by-step

<ol class="step-list">
  <li>Open <a href="https://www.paypal.com/businessmanage/account/aboutBusiness" target="_blank" rel="noopener">PayPal Business profile</a> and copy the email address tied to your business account.</li>
  <li>In WordPress: <strong>Easy Invoice → Settings → Payment</strong>, find the <strong>PayPal</strong> row.</li>
  <li>Check the <strong>Enable</strong> box.</li>
  <li>Paste your business email into <strong>PayPal Email</strong>.</li>
  <li>Set <strong>PayPal Mode</strong> to <code>Live</code> (or <code>Sandbox</code> for testing — see <a href="https://developer.paypal.com/dashboard/accounts" target="_blank" rel="noopener">PayPal Developer sandbox accounts</a>).</li>
  <li>Click <strong>Save Changes</strong>.</li>
</ol>

### IPN (instant payment notification)

PayPal Standard uses **IPN**, not REST webhooks. Easy Invoice listens automatically on `admin-post.php` so you don't have to paste a URL. If payments aren't marking themselves paid, check **IPN history** in your PayPal merchant dashboard for delivery failures.

### Test it

1. Send a $1 test invoice to yourself.
2. Click **Pay Now** on the public invoice.
3. Confirm the invoice is marked **Paid** automatically when you return.

---

## 3. Stripe <span class="pro-pill">PRO</span>

Stripe powers credit card, **Apple Pay**, **Google Pay**, and **Link** checkout — modern, secure, available in 40+ countries.

### What you need

A Stripe account ([create one free at stripe.com](https://dashboard.stripe.com/register)).

### Step-by-step

<ol class="step-list">
  <li>Open the <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener">Stripe Dashboard → Developers → API Keys</a>.</li>
  <li>Copy the <strong>Publishable key</strong> (starts with <code>pk_live_</code>) and reveal + copy the <strong>Secret key</strong> (starts with <code>sk_live_</code>).</li>
  <li>In WordPress: <strong>Easy Invoice → Settings → Payment</strong>, find the <strong>Stripe</strong> row, check <strong>Enable</strong>.</li>
  <li>Paste <strong>Publishable Key</strong> and <strong>Secret Key</strong>.</li>
  <li>Set <strong>Stripe Mode</strong> to <code>Live</code> (or <code>Sandbox</code> while testing — toggle the "Test mode" switch in Stripe to get <code>pk_test_</code> / <code>sk_test_</code> keys).</li>
</ol>

### Webhook (critical — payments will not auto-mark as Paid without it)

<ol class="step-list">
  <li>Go to <a href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener">Stripe Dashboard → Developers → Webhooks</a>.</li>
  <li>Click <strong>Add endpoint</strong>.</li>
  <li>Paste this URL (replace <code>yoursite.com</code>):<br><code>https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_stripe_webhook</code></li>
  <li>Select these events: <code>payment_intent.succeeded</code>, <code>payment_intent.payment_failed</code>, <code>charge.refunded</code>.</li>
  <li>Click <strong>Add endpoint</strong>. Stripe will show a <strong>Signing secret</strong> starting with <code>whsec_</code>.</li>
  <li>Copy that <code>whsec_…</code> value and paste it into <strong>Easy Invoice → Settings → Payment → Stripe → Webhook Secret</strong>.</li>
  <li>Save.</li>
</ol>

### Test it (with Stripe test cards)

1. Put Stripe in **Sandbox**.
2. Use card `4242 4242 4242 4242` with any future expiry and any CVC.
3. The full list of [Stripe test cards is here](https://docs.stripe.com/testing).

---

## 4. Square <span class="pro-pill">PRO</span>

Square is great for US/CA/UK/AU/IE/FR/JP/ES businesses — especially if you already use Square for in-person sales.

### What you need

A [Square Developer account](https://developer.squareup.com/) (free).

### Step-by-step

<ol class="step-list">
  <li>Open <a href="https://developer.squareup.com/apps" target="_blank" rel="noopener">Square Developer Dashboard → Applications</a>.</li>
  <li>Pick (or create) an application. On the <strong>Credentials</strong> page, copy:
    <ul>
      <li><strong>Application ID</strong> (e.g. <code>sq0idp-…</code>)</li>
      <li><strong>Access Token</strong> (production)</li>
    </ul>
  </li>
  <li>Open <strong>Locations</strong> and copy the <strong>Location ID</strong> for the location that should receive payments.</li>
  <li>In WordPress: <strong>Easy Invoice → Settings → Payment</strong> → enable <strong>Square</strong>.</li>
  <li>Paste <strong>Application ID</strong>, <strong>Access Token</strong>, <strong>Location ID</strong>.</li>
  <li>Set <strong>Square Mode</strong> to <code>Live</code> (or <code>Sandbox</code> while testing).</li>
</ol>

### Webhook (required for auto-reconciliation)

<ol class="step-list">
  <li>In your Square app, go to <strong>Webhooks → Subscriptions</strong> → <strong>Add subscription</strong>.</li>
  <li>Notification URL (replace <code>yoursite.com</code>):<br><code>https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_square_webhook</code></li>
  <li>Subscribe to: <code>payment.updated</code>, <code>refund.updated</code>.</li>
  <li>After creating the subscription, copy the <strong>Signature Key</strong>.</li>
  <li>In WordPress, paste the Signature Key into <strong>Webhook signature key</strong>.</li>
  <li>Paste the exact same URL above into <strong>Webhook notification URL</strong> (must match exactly — same scheme, host, path, query — or signature verification fails).</li>
  <li>Save.</li>
</ol>

> **Why Easy Invoice asks for the notification URL twice:** Square signs each webhook with the URL it was configured against. If the URL configured in Square doesn't byte-match the URL we expect, the signature check rejects the webhook. Paste both.

---

## 5. Authorize.Net <span class="pro-pill">PRO</span>

Long-standing US gateway. Accepts cards and eChecks.

### What you need

An Authorize.Net merchant account ([open one here](https://www.authorize.net/sign-up.html)).

### Step-by-step

<ol class="step-list">
  <li>Log in to your <a href="https://account.authorize.net/" target="_blank" rel="noopener">Authorize.Net Merchant Interface</a>.</li>
  <li>Go to <strong>Account → Settings → Security Settings → API Credentials &amp; Keys</strong>.</li>
  <li>Copy the <strong>API Login ID</strong> and generate / copy the <strong>Transaction Key</strong>. (<a href="https://support.authorize.net/s/article/How-do-I-obtain-my-API-Login-ID-and-Transaction-Key" target="_blank" rel="noopener">Help: how to obtain them</a>.)</li>
  <li>On the same page, generate / copy the <strong>Signature Key</strong>. (<a href="https://support.authorize.net/s/article/What-is-a-Signature-Key" target="_blank" rel="noopener">Help: what is a Signature Key</a>.)</li>
  <li>In WordPress: <strong>Easy Invoice → Settings → Payment</strong> → enable <strong>Authorize.Net</strong>.</li>
  <li>Paste <strong>API Login ID</strong>, <strong>Transaction Key</strong>, <strong>Signature Key</strong>.</li>
  <li>Set <strong>Authorize.Net Mode</strong> to <code>Live</code> (or <code>Sandbox</code>: get free sandbox credentials at <a href="https://developer.authorize.net/hello_world/sandbox.html" target="_blank" rel="noopener">developer.authorize.net</a>).</li>
</ol>

### Webhook

<ol class="step-list">
  <li>In Authorize.Net: <strong>Account → Webhooks → Add Endpoint</strong>.</li>
  <li>Endpoint URL (replace <code>yoursite.com</code>):<br><code>https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_authorizenet_webhook</code></li>
  <li>Events: <code>net.authorize.payment.authcapture.created</code>, <code>net.authorize.payment.capture.created</code>, <code>net.authorize.payment.refund.created</code>, <code>net.authorize.payment.void.created</code>.</li>
  <li>Save. Webhooks are signed with the <strong>Signature Key</strong> you already pasted.</li>
</ol>

---

## 6. Mollie <span class="pro-pill">PRO</span>

European-favourite gateway — supports **iDEAL**, **Bancontact**, **SEPA Direct Debit**, **Klarna Pay later/in 3**, **Sofort**, **Giropay**, **EPS**, **PayPal**, and credit cards.

### What you need

A Mollie account ([sign up free here](https://www.mollie.com/signup)).

### Step-by-step

<ol class="step-list">
  <li>Open <a href="https://www.mollie.com/dashboard/developers/api-keys" target="_blank" rel="noopener">Mollie Dashboard → Developers → API Keys</a>.</li>
  <li>Copy the <strong>Live API key</strong> (starts with <code>live_</code>) and <strong>Test API key</strong> (starts with <code>test_</code>).</li>
  <li>In WordPress: <strong>Easy Invoice → Settings → Payment</strong> → enable <strong>Mollie</strong>.</li>
  <li>Paste both keys into <strong>Live API Key</strong> and <strong>Test API Key</strong>.</li>
  <li>Set <strong>Mollie Mode</strong> to <code>Live</code> or <code>Sandbox</code>.</li>
</ol>

### Webhook

Mollie generates the callback URL automatically when each payment is created — no manual webhook setup. Make sure your site is reachable from `*.mollie.com`.

---

## 7. Paystack <span class="pro-pill">PRO</span>

![Paystack settings — live + test keys plus the ready-to-paste webhook URL](/screenshots/42-settings-payment-paystack.png)

The right pick if you sell into **Africa** — Nigeria, Ghana, South Africa, Kenya, plus international USD. Paystack accepts cards, bank transfers, USSD, mobile money (M-Pesa, MoMo) and QR codes through one hosted checkout.

### What you need

A Paystack merchant account ([sign up free at paystack.com](https://paystack.com/signup)).

### Step-by-step

<ol class="step-list">
  <li>Open <a href="https://dashboard.paystack.com/#/settings/developers" target="_blank" rel="noopener">Paystack Dashboard → Settings → API Keys &amp; Webhooks</a>.</li>
  <li>Copy your <strong>Live Public Key</strong> (starts with <code>pk_live_</code>) and reveal + copy the <strong>Live Secret Key</strong> (<code>sk_live_</code>). Also grab the <strong>Test Public Key</strong> (<code>pk_test_</code>) and <strong>Test Secret Key</strong> (<code>sk_test_</code>) if you'll test in sandbox first.</li>
  <li>In WordPress: <strong>Easy Invoice → Settings → Payment</strong>, enable the <strong>Paystack</strong> row.</li>
  <li>Paste <strong>Live Public Key</strong> / <strong>Live Secret Key</strong> (and Test pair if you want).</li>
  <li>Set <strong>Paystack Mode</strong> to <code>Live</code> for real transactions or <code>Test</code> for sandbox.</li>
  <li>Click <strong>Save Changes</strong>.</li>
</ol>

### Webhook (critical — payments only auto-mark as Paid if this is set)

Paystack confirms each payment via a signed webhook. **The plugin won't trust unsigned events** — it verifies HMAC-SHA512 of the raw body against your secret key before writing anything.

<ol class="step-list">
  <li>Still on <a href="https://dashboard.paystack.com/#/settings/developers" target="_blank" rel="noopener">Dashboard → Settings → API Keys &amp; Webhooks</a>, find the <strong>Webhook URL</strong> field.</li>
  <li>Copy the URL from the <strong>Webhook URL (copy into Paystack)</strong> field that Easy Invoice shows in the Paystack settings row. It looks like:<br><code>https://yoursite.com/wp-admin/admin-ajax.php?action=easy_invoice_paystack_webhook</code></li>
  <li>Paste it into Paystack's Webhook URL field. <em>(Paystack uses one URL for live + test events.)</em></li>
  <li>Save. No further config is needed — signature verification uses the same secret key you already pasted.</li>
</ol>

### Supported currencies

Paystack accepts amounts in: <code>NGN</code>, <code>GHS</code>, <code>ZAR</code>, <code>KES</code>, <code>USD</code>, <code>EGP</code>, <code>XOF</code>. Easy Invoice will refuse to start a Paystack checkout if the invoice currency is outside this list. Pick the right currency under <strong>Settings → Currency</strong> or on the per-invoice Payment tab.

### Test it (with sandbox test cards)

1. Put **Paystack Mode** = `Test` and use your `pk_test_` / `sk_test_` pair.
2. Use any [Paystack test card](https://paystack.com/docs/payments/test-payments/) — e.g. `4084 0840 8408 4081`, expiry any future date, CVV `408`, OTP `123456`.
3. After the test payment, return to the invoice — it should be marked **Paid** automatically.

> **Local development tip:** webhooks can't reach `localhost` / `.local` sites. Use [ngrok](https://ngrok.com) or [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/) to expose your dev site, then paste the public tunnel URL into Paystack's Webhook URL field.

---

## 8. Bank Transfer <span class="pro-pill">PRO</span>

Shows your **bank details** on the invoice and lets the client upload a payment-proof file when they pay.

### Setup

<ol class="step-list">
  <li><strong>Easy Invoice → Settings → Payment</strong> → enable <strong>Bank Transfer</strong>.</li>
  <li>Fill <strong>Bank Details</strong> — multi-line text. Include: Account name, Bank name, IBAN/Account number, SWIFT/BIC, Reference instructions.</li>
  <li>Save.</li>
</ol>

When clients pick Bank Transfer at checkout, they see the bank details and an upload field for a transfer receipt. You then verify and mark the invoice **Paid** in the admin.

---

## 9. Cheque <span class="pro-pill">PRO</span>

For "send us a cheque" workflows.

### Setup

<ol class="step-list">
  <li>Enable the <strong>Cheque</strong> row.</li>
  <li>Fill <strong>Payable To</strong> — the exact name to write on the cheque.</li>
  <li>Fill <strong>Mailing Address</strong> — where to send the cheque.</li>
  <li>Save.</li>
</ol>

Clients see your payable name + mailing address on the public invoice and can mark "Cheque mailed" — which sets the invoice to a pending state until you confirm.

---

## 10. Cash <span class="pro-pill">PRO</span>

Like Manual, but with an explicit cash-only label.

### Setup

<ol class="step-list">
  <li>Enable the <strong>Cash</strong> row.</li>
  <li>Fill <strong>Cash Instructions</strong> — e.g. "Hand over at our store between 9 AM and 6 PM, Mon–Fri."</li>
  <li>Save.</li>
</ol>

---

## 11. Moneris <span class="pro-pill">PRO</span>

Canada's largest payment processor — Visa, Mastercard, AMEX, Interac Online.

### What you need

A Moneris merchant account.

### Step-by-step

<ol class="step-list">
  <li>Log in to your <a href="https://www3.moneris.com/mpg/index.php" target="_blank" rel="noopener">Moneris Merchant Resource Center</a> and access <strong>Integration Settings</strong>. (<a href="https://www.moneris.com/en/Support/Setup/Moneris-Online/Setting-up-Moneris-Online/Access-Integration-Settings" target="_blank" rel="noopener">How to access</a>.)</li>
  <li>Copy your <strong>Store ID</strong> and <strong>API Token</strong>. (<a href="https://www.moneris.com/help/mgoportal_sso-eng/developer/api_token.htm" target="_blank" rel="noopener">How to get API Token</a>.)</li>
  <li>For testing, request <strong>test credentials</strong> from <a href="https://api-developer.moneris.com/credentials" target="_blank" rel="noopener">Moneris Developer Portal → Credentials</a>.</li>
  <li>In WordPress: <strong>Easy Invoice → Settings → Payment</strong> → enable <strong>Moneris</strong>.</li>
  <li>Paste <strong>Moneris Store ID</strong>, <strong>Moneris API Token</strong>, and (optionally) <strong>Test Store ID</strong> + <strong>Test API Token</strong>.</li>
  <li>Set <strong>Moneris Mode</strong> to <code>Live</code> or <code>Test</code>.</li>
</ol>

---

## Choosing the right gateway

| Need | Best fit |
| --- | --- |
| Just take any payment for free | **Manual** + **PayPal** (Free) |
| Take credit cards globally | **Stripe** <span class="pro-pill">PRO</span> |
| Already use Square at a physical store | **Square** <span class="pro-pill">PRO</span> |
| US merchant on an existing gateway | **Authorize.Net** <span class="pro-pill">PRO</span> |
| European customers (iDEAL, SEPA, Klarna) | **Mollie** <span class="pro-pill">PRO</span> |
| Africa-focused (NGN/GHS/ZAR/KES) or USSD/mobile money | **Paystack** <span class="pro-pill">PRO</span> |
| Canadian merchant (Visa, MC, Interac) | **Moneris** <span class="pro-pill">PRO</span> |
| Wire transfer business | **Bank Transfer** <span class="pro-pill">PRO</span> |
| Old-school cheque clients | **Cheque** <span class="pro-pill">PRO</span> |
| Cash on delivery / in-person | **Cash** <span class="pro-pill">PRO</span> |

<div class="doc-pro-callout">
  <span class="doc-pro-pill">Pro</span>
  <span>Stripe, Square, Authorize.Net, Mollie, Paystack, Moneris, Bank Transfer, Cheque, Cash — all require <strong>Easy Invoice Pro</strong>. <a href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener">View plans &amp; upgrade →</a></span>
</div>

---

## Common problems

**"Payments aren't being marked as Paid automatically."**
→ Your webhook isn't reaching WordPress. Copy the webhook URL exactly as shown, including `?action=…`. Many caching plugins block `admin-ajax.php` — whitelist that URL. See [Troubleshooting](./troubleshooting).

**"The gateway row is enabled but doesn't appear on the public invoice."**
→ Missing credential. Re-open the row and check every required field is filled. Save again.

**"I'm in Sandbox but real charges happened."**
→ You pasted live keys but kept Mode = Sandbox (or vice versa). Live keys always charge real cards regardless of Mode. Re-confirm the `pk_test_` / `pk_live_` prefix in Stripe, or the explicit Sandbox toggle in Mollie/Square/Authorize.Net.

**"PayPal IPN failures."**
→ Open your PayPal dashboard → **History → IPN history** to see what failed. Common cause: WordPress site blocking PayPal IPs at the firewall.

---

## Next

- [Email notifications (so payment confirmations actually go out)](./email-settings)
- [Recording manual / offline payments](./payments)
- [All Pro features](./features)
