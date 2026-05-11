---
title: Settings reference (every field)
description: Field-by-field reference for every setting in Easy Invoice Free and Easy Invoice Pro — Company, Invoice, Quote, Currency, Tax, Payment, Email, Text labels, Advanced, Pro watermarks, partial payments, deposits, recurring, and subscriptions.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span>Fields marked <span class="doc-pro-pill">Pro</span> only appear when <strong>Easy Invoice Pro</strong> is installed and activated with a valid license. <a href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener">Get the license →</a></span>
</div>

# Settings reference — every field

This page documents **every field** on the Easy Invoice settings page. The settings live under **WordPress Admin → Easy Invoice → Settings**. Use this page as a lookup when you're not sure what a field does.

> **New to Easy Invoice?** Start with [Quick start](./quick-start) for the full setup walkthrough. Come back here only when you need to know exactly what one specific field controls.

![Easy Invoice admin menu — every sub-page in the sidebar](/screenshots/10-admin-menu.png)

The left sidebar inside Easy Invoice → Settings has these sections (in this order):

1. [Company Information](#_1-company-information)
2. [Invoice Settings](#_2-invoice-settings)
3. [Quote Settings](#_3-quote-settings)
4. [Currency Settings](#_4-currency-settings)
5. [Tax Settings](#_5-tax-settings)
6. [Payment Methods](#_6-payment-methods) — see the dedicated [Payment gateways](./payment-settings) page for credentials per gateway
7. [Email Settings](#_7-email-settings) — see also the dedicated [Email & notifications](./email-settings) page
8. [Text Settings](#_8-text-settings)
9. [Advanced Settings](#_9-advanced-settings)

When you finish a section, click **Save Changes** at the top right of the settings page.

---

## 1. Company Information

![Company Information settings](/screenshots/11-settings-company.png)

These details appear on every invoice and quote PDF, in email signatures, and on the public invoice page.

| Field | Type | What it does |
| --- | --- | --- |
| **Company Name** | Text | Your business name. Appears as the seller on every invoice and quote. |
| **Email** | Email | Your business contact email — printed on invoices and used as a reply target. |
| **Phone Number** | Phone | Optional. Printed on invoices/quotes. |
| **Website** | URL | Optional. Printed on invoices/quotes. |
| **Address** | Textarea | Multi-line business address printed on documents. |
| **Tax ID / VAT Number** | Text | Your business tax / VAT / GST registration number printed on invoices. |
| **Company Logo** | Image upload | Logo shown at the top of every invoice/quote and (optionally) in client emails. |

> **Tip for new users:** Even if you skip everything else, fill in **Company Name**, **Email**, **Address**, and upload a **Logo** — these four make your documents look professional immediately.

---

## 2. Invoice Settings

![Invoice settings — numbering, terms, footer, and Pro toggles](/screenshots/12-settings-invoice.png)

Controls invoice numbering, terms, footer text, and several Pro toggles.

### Numbering

| Field | Default | What it does |
| --- | --- | --- |
| **Invoice Prefix** | `EIIN_` | The prefix added to every invoice number (e.g. `EIIN_0001`). Change to anything you like: `INV-`, `2026-`, `ACME-`, etc. |
| **Next Invoice Number** | `1` | The next number that will be assigned when you create an invoice. Increment manually if you're switching from another system mid-year. |
| **Regenerate All Invoice Numbers** | _button_ | Re-numbers **every existing invoice** sequentially starting from "Next Invoice Number". ⚠️ Use with care — invoice numbers are legal records in many countries. |

### Layout / behaviour

| Field | Default | What it does |
| --- | --- | --- |
| **Show / Hide Adjust Field** | Enabled | When checked, each line item shows an **Adjust (%)** field that lets you mark a single item up or down by a percentage without changing its base price. |
| **Terms & Conditions** | _"Payment is due within 30 days from date of invoice"_ | Rich-text editor. Printed at the bottom of every invoice PDF. Supports `a, br, em, strong, hr, p, h1–h4` tags. |
| **Footer Text** | _empty_ | Rich-text editor. Printed at the very bottom of the invoice (under terms). |

### Pro-only invoice settings

The following appear in the Invoice section **only when Easy Invoice Pro is active**:

| Field | Source | What it does |
| --- | --- | --- |
| **Enable Recurring Invoices** <span class="pro-pill">PRO</span> | Pro | Master switch for the recurring engine. See [Recurring & subscriptions](./recurring-invoices). |
| **Enable Deposit Invoices** <span class="pro-pill">PRO</span> | Pro | Lets you split any invoice into a deposit + balance portion. |
| **Deposit Invoice Numbering** <span class="pro-pill">PRO</span> | Pro | `suffix` (e.g. `INV-001-1`), `prefix` (`D-INV-001`), or `separate` (its own counter). |
| **Enable Partial Payments** <span class="pro-pill">PRO</span> | Pro | Allow clients to pay in installments. Reveals the fields below. |
| **Minimum Payment Amount** <span class="pro-pill">PRO</span> | Pro | Smallest amount a client can pay per installment. |
| **Payment Amount Options** <span class="pro-pill">PRO</span> | Pro | `Customer chooses amount` / `Fixed amount options` / `Percentage options`. |
| **Fixed Amount Options** <span class="pro-pill">PRO</span> | Pro | Comma-separated list (e.g. `100,250,500`) shown as preset buttons. Visible only when "Fixed amount options" is chosen. |
| **Percentage Options** <span class="pro-pill">PRO</span> | Pro | Comma-separated list (e.g. `25,50,75`) shown as percentage presets. |
| **Auto-extend Due Date** <span class="pro-pill">PRO</span> | Pro | If a client pays the minimum on time, push the remaining balance's due date forward automatically. |
| **Due Date Extension (Days)** <span class="pro-pill">PRO</span> | Pro | Number of days to add when auto-extending. Default 30. |
| **Payment Notifications** <span class="pro-pill">PRO</span> | Pro | Email both client and admin every time a partial payment is recorded. |
| **Watermark Type** <span class="pro-pill">PRO</span> | Pro | `Text` / `Image` / `Status` (auto-uses the invoice status text). |
| **Watermark Text** <span class="pro-pill">PRO</span> | Pro | Visible when type = Text. E.g. `CONFIDENTIAL`, `COPY`, `DUPLICATE`. |
| **Watermark Color** <span class="pro-pill">PRO</span> | Pro | Color picker. Default `#FF0000`. |
| **Watermark Image** <span class="pro-pill">PRO</span> | Pro | Visible when type = Image. Upload a transparent PNG. |
| **Watermark Size** <span class="pro-pill">PRO</span> | Pro | Pixel size for image watermark (10–500). |
| **Watermark Opacity** <span class="pro-pill">PRO</span> | Pro | 1–100%. Default 20%. |

> **Pro upgrade?** All of the rows above only render after the Pro plugin is activated. [See the Pro feature catalog](./features) or [upgrade to Easy Invoice Pro](https://matrixaddons.com/plugins/easy-invoice/).

---

## 3. Quote Settings

![Quote settings — numbering, accept/decline behaviour, terms](/screenshots/13-settings-quote.png)

Mirrors the invoice section but for quotes / estimates.

### Numbering

| Field | Default | What it does |
| --- | --- | --- |
| **Quote Prefix** | `EIQN_` | Prefix for quote numbers. Change to `QT-`, `EST-`, etc. |
| **Next Quote Number** | `1` | Next number assigned when you create a quote. |
| **Regenerate All Quote Numbers** | _button_ | Re-numbers every existing quote sequentially starting from "Next Quote Number". |

### Content

| Field | Default | What it does |
| --- | --- | --- |
| **Show / Hide Adjust Field** | Enabled | When checked, quote line items show an **Adjust (%)** field. |
| **Terms & Conditions** | _"This quote has a fixed price. Upon acceptance, we kindly ask for a 25% deposit prior to initiating the work."_ | Rich-text editor — printed on quote PDFs. |
| **Footer Text** | _"Thanks for choosing Easy Invoice"_ | Rich-text editor printed below terms. |

### Accept / decline flow

These control what happens when a client clicks **Accept** or **Decline** on a public quote page.

| Field | Default | What it does |
| --- | --- | --- |
| **Accept quote button** | Enabled | Show or hide the Accept button on the public quote page. |
| **Accept quote button action** | `Convert quote to invoice – Draft` | What happens when the client clicks Accept. Options: <br>• **Convert quote to invoice – Draft** (silent) <br>• **Convert quote to invoice – Available** (publish, no email) <br>• **Convert quote to invoice and send to client – Available** (publish + auto-email) <br>• **Create new invoice, keep quote as-is – Draft** <br>• **Create new invoice and send to client, keep quote as-is** <br>• **Do nothing** |
| **Accept Quote Text** | _"Important: When you accept this Quote, an Invoice will be created automatically..."_ | Rich-text editor. Shown above the Accept button as a confirmation message. |
| **Accepted Quote Message** | _"You've confirmed the Quote..."_ | Message shown to the client immediately after they click Accept. |
| **Decline Reason Required** | Off | When on, the client cannot decline without entering a reason. |
| **Declined Quote Message** | _empty_ | Message shown after a successful decline. |

### Quote watermarks (Pro)

Same set of seven fields as **Invoice watermarks** above, prefixed for quotes: type, text, color, image, size, opacity. <span class="pro-pill">PRO</span>

---

## 4. Currency Settings

![Currency settings — code, symbol position, separators, decimals](/screenshots/14-settings-currency.png)

| Field | Default | What it does |
| --- | --- | --- |
| **Currency & Symbol** | `USD` | The currency code from the [ISO 4217 list](https://en.wikipedia.org/wiki/ISO_4217) — Easy Invoice ships **150+ options**. Symbol updates automatically. |
| **Symbol Position** | `Left` | Where to print the symbol relative to the amount: `Left`, `Right`, `Left with space`, `Right with space`. |
| **Currency Symbol Type** | `Currency Symbol` | Print the **symbol** (`$`, `€`) or the **code** (`USD`, `EUR`). |
| **Thousands Separator** | `,` | Character between thousands. Use `.` for many European locales. |
| **Decimal Separator** | `.` | Character between integer and decimal portions. |
| **Decimal Places** | `2` | 0–4 digits after the decimal point. |

> **Note:** Per-invoice currency override is also available on the **Payments** tab inside the invoice builder.

---

## 5. Tax Settings

![Tax settings — global tax rate, inclusive vs exclusive, Pro additional tax](/screenshots/15-settings-tax.png)

| Field | Default | What it does |
| --- | --- | --- |
| **Enable Tax** | Off | Master switch. When off, no tax fields show on invoices/quotes. |
| **How do you enter tax?** | `exclusive` | <br>• **Inclusive** — the price you type **includes** tax (Easy Invoice extracts the tax portion). <br>• **Exclusive** — tax is added **on top** of the price you type. |
| **Default Tax Rate (%)** | `0` | Used as the starting tax rate on every new invoice. Per-invoice override available. |
| **Tax Name** | `Tax` | Label printed on the invoice — change to `VAT`, `GST`, `IVA`, `Sales Tax`, etc. |

### Pro additional tax (second tax line) <span class="pro-pill">PRO</span>

Some jurisdictions require **two** taxes (e.g. Canadian GST + PST). Pro adds:

| Field <span class="pro-pill">PRO</span> | Default | What it does |
| --- | --- | --- |
| **Enable Additional Tax** | Off | Adds a second tax row on invoices and quotes. |
| **Additional Tax Rate (%)** | `0` | The rate for the second tax. |
| **Additional Tax Name** | `Additional Tax` | Label for the second tax row. |
| **Additional Tax Calculation** | `on_subtotal` | <br>• **On subtotal** — second tax calculated on the pre-tax amount. <br>• **On total** (cascading) — second tax calculated on (subtotal + first tax). |

---

## 6. Payment Methods

![Payment methods — enable / reorder / rename each gateway, plus credentials](/screenshots/16-settings-payment.png)

The **Payment** tab is a list of every gateway your store can use. Click a gateway row to expand its credentials.

**Free**
- **Manual** (record offline payments like cash, cheque, bank transfer)
- **PayPal Standard**

**Pro** <span class="pro-pill">PRO</span>
- **Stripe** — cards + Apple/Google Pay
- **Square**
- **Authorize.Net**
- **Mollie** (European methods: iDEAL, Bancontact, SEPA, etc.)
- **Bank Transfer** (display bank details only)
- **Cheque** (cheque mailing instructions)
- **Cash**
- **Moneris** (Canada)

Above every credential row, the **Payment Methods** section gives you these admin controls:

- **Enable / disable** (per gateway, the checkbox at the top of each row)
- **Reorder gateways** (drag-and-drop) — controls the order on the public invoice
- **Display name** (text field) — the label clients see (e.g. you can rename "Stripe" to "Credit card")

For credential fields and step-by-step setup per gateway, see [Payment gateways](./payment-settings).

---

## 7. Email Settings

The **Email** section has 4 sub-pages (Pro adds a 5th):

1. **General** — Sender, reply-to, BCC, logo, footer text, **Send Test Email** button
2. **Invoice Available** — Email sent when you mark an invoice as Available
3. **Quote Available** — Email sent when you publish a quote
4. **Payment Received** — Confirmation email after a payment is recorded
5. **Payment Reminder** <span class="pro-pill">PRO</span> — Automatic reminders before/after due date

### 7.1 General email settings

![Email → General settings — sender, reply-to, BCC, logo, footer](/screenshots/17-settings-email-general.png)

| Field | Default | What it does |
| --- | --- | --- |
| **From Name** | Site name | Display name on outgoing emails (e.g. `Acme Co.`). |
| **From Email Address** | Site admin email | The `From:` address. Use a real address on your domain or SPF/DKIM will mark it as spam. |
| **Reply-To Email** | _empty_ | Where replies go (e.g. `billing@acme.co`). If empty, replies go to the From address. |
| **Reply-To Name** | _empty_ | Name on the Reply-To header. |
| **Enable HTML Emails** | Yes | Use styled HTML emails. Turn off for plain-text only. |
| **BCC Admin on All Emails** | No | When on, every client email is also BCC'd to the address below. |
| **Admin Email for BCC** | Site admin email | The BCC recipient. |
| **Email Logo URL** | _empty_ | Logo shown at the top of HTML emails. Use a publicly reachable URL. |
| **Email Footer Text** | _empty_ | Plain text or HTML printed at the bottom of every email. |
| **Test Email** | _button_ | Type any address and click **Send Test Email** to verify deliverability. |

### 7.2 Invoice Available email

![Email → Invoice Available template editor with smart tags](/screenshots/18-settings-email-invoice.png)

| Field | Default | What it does |
| --- | --- | --- |
| **Enable Invoice Available Email** | On | Master switch — turn off if you only want to send manually. |
| **Subject** | <code v-pre>Your Invoice #<span v-pre>{{invoice_number}}</span> from {{company_name}}</code> | Subject line. Smart tags allowed. |
| **Email Body** | Full HTML template | Rich-text editor for the email body. |
| **Test Invoice Email** | _button_ | Sends a test using <code v-pre>{{invoice_number}} = TEST-001</code>. |

### 7.3 Quote Available email

![Email → Quote Available template editor](/screenshots/19-settings-email-quote.png)

Same shape as Invoice Available but uses <code v-pre>{{quote_number}}</code>, <code v-pre>{{expiry_date}}</code>.

### 7.4 Payment Received email

![Email → Payment Received template editor](/screenshots/20-settings-email-payment.png)

Same shape, with payment-specific smart tags (<code v-pre>{{payment_amount}}</code>, <code v-pre>{{payment_date}}</code>, <code v-pre>{{payment_method}}</code>, <code v-pre>{{transaction_id}}</code>).

### 7.5 Payment Reminder email (Pro)

| Field <span class="pro-pill">PRO</span> | Default | What it does |
| --- | --- | --- |
| **Enable Payment Reminder** | Off | Master switch. |
| **When to Send** | `7, 3, 1 days after due` | Multi-select — pick any combination from **30 days before** to **30 days after** the due date. |
| **For which status?** | `Unpaid, Overdue` | Only send reminders for invoices with one of the selected statuses. |
| **Email Subject** | <code v-pre>A friendly reminder - Invoice #{{invoice_number}}</code> | Reminder subject line. |
| **Email Message** | Default HTML template | Rich-text editor for the reminder. |
| **Test Payment Reminder Email** | _button_ | Sends a test reminder using a sample invoice. |

### Smart tags

You can use these placeholders in any subject / body:

<code v-pre>{{invoice_number}}</code>, <code v-pre>{{quote_number}}</code>, <code v-pre>{{client_name}}</code>, <code v-pre>{{company_name}}</code>, <code v-pre>{{company_email}}</code>, <code v-pre>{{total_amount}}</code>, <code v-pre>{{payment_amount}}</code>, <code v-pre>{{due_date}}</code>, <code v-pre>{{expiry_date}}</code>, <code v-pre>{{payment_date}}</code>, <code v-pre>{{payment_method}}</code>, <code v-pre>{{transaction_id}}</code>, <code v-pre>{{payment_terms}}</code>, <code v-pre>{{invoice_url}}</code>, <code v-pre>{{quote_url}}</code>.

See the dedicated [Email & notifications](./email-settings) page for full details.

---

## 8. Text Settings

![Text Settings — rename every invoice / quote label for localization](/screenshots/21-settings-text.png)

This section lets you **rename every visible label** on the invoice / quote / portal. It's perfect for:

- Translating to another language without touching `.po` files
- Local terminology: `Bill`, `Tax invoice`, `Devis`, `Presupuesto`, `Cotización`, `見積書`, `청구서`
- Branding (`Statement` instead of `Invoice`)

### Invoice labels

| Setting | Default |
| --- | --- |
| Invoice | `Invoice` |
| Invoices (plural) | `Invoices` |
| To | `To` |
| Invoice Number | `Invoice Number` |
| Invoice Date | `Invoice Date` |
| Due Date | `Due Date` |
| Total Due | `Total Due` |
| Qty | `Qty` |
| Service | `Service` |
| Rate / Price | `Rate` |
| Adjust | `Adjust` |
| Sub Total | `Sub Total` |
| Total | `Total` |
| Tax | `Tax` |
| Discount | `Discount` |
| Print | `Print` |
| Download as PDF | `Download as PDF` |
| Send Email | `Send Email` |
| Pay Now | `Pay Now` |

### Quote labels

| Setting | Default |
| --- | --- |
| Quote | `Quote` |
| Quote Number | `Quote Number` |
| Accept Quote (button) | `Accept Quote` |
| Decline Quote (button) | `Decline Quote` |
| Reason for declining | `Reason for declining` |
| Valid Until Date | `Valid Until Date` |
| Quote Date | `Quote Date` |

---

## 9. Advanced Settings

![Advanced settings — date format, auto-increment, reminder days](/screenshots/22-settings-advanced.png)

| Field | Default | What it does |
| --- | --- | --- |
| **Date Format** | `MM/DD/YYYY (US)` | Three preset formats: `MM/DD/YYYY (US)`, `DD/MM/YYYY (UK)`, `YYYY-MM-DD (ISO)`. |
| **Auto-increment invoice numbers** | Yes | When on, every new invoice automatically gets the next number. Turn off only if you want to enter numbers manually. |
| **Payment Reminder Days** | `3` | Legacy / free reminder offset (deprecated when Pro's reminder engine is enabled). |

---

## Where to go next

- [Quick start (10-minute setup)](./quick-start)
- [Email templates & smart tags](./email-settings)
- [Payment gateway setup, step by step](./payment-settings)
- [Create your first invoice](./invoices)
- [Send your first quote](./quotes)
- [All Pro features →](./features)
