---
title: Quote Forms (Pro addon)
description: Turn a WPForms, Gravity Forms, Contact Form 7 or Fluent Forms submission into a draft quote or invoice with the client already created.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included with every Easy Invoice Pro licence. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Quote Forms

Most quotes start with a "request a quote" form on your website. Without this addon, the request lands in your inbox and someone re-types the name, email and message into a quote. With it, the submission **is** the quote — a draft, ready to price.

## What you get

- **A draft quote (or invoice) per submission**, opened for the client the form identifies. The client is found by email or created; the message becomes the quote's brief; when the form asks for a service and an amount, they become the first line item.
- **Every field the form sent is kept** on the quote, so nothing the visitor typed is lost even if it was not mapped.
- **An admin email** for each new request, and a **"From form"** marker on the quote row.
- **Works with** WPForms, Gravity Forms, Contact Form 7 and Fluent Forms — pick the form and map its fields; no code.

## Enabling

1. Open **Easy Invoice → Addons** and activate **Quote Forms**
2. Open **Quote Forms** in the sidebar
3. Add a rule: choose the **form builder**, the **form**, whether a submission creates a **quote** or an **invoice**, and map its fields

The mapping targets are: email, name, company, phone, address, message, service, amount, quantity. Only **email** is required — it is how the client is found or created. Any number of rules can exist, one per form.

## What the client sees

Nothing changes on your website: the form submits as it always did, with its own confirmation. The quote stays a **draft** until you open it, check the price and mark it available — the visitor is never sent an unreviewed quote.

## Any other form

A form builder that is not listed can feed the addon with a single action from its own "after submit" hook:

```php
do_action( 'easy_invoice_quote_forms_submission', [
    'email'   => 'jane@example.com',
    'name'    => 'Jane Doe',
    'message' => 'Three-page brochure site, launch in May.',
    'service' => 'Web design',
    'amount'  => 2400,
], [ 'builder' => 'custom', 'form' => 'brochure-request' ] );
```

## For developers

| Hook | Type | Purpose |
|---|---|---|
| `easy_invoice_quote_forms_submission` | action | Feed a submission in from any source (see above) |
| `easy_invoice_quote_forms_fields` | filter | Normalised fields before the document is built |
| `easy_invoice_quote_forms_document_data` | filter | The quote/invoice data before it is created |
| `easy_invoice_quote_forms_notify` | filter | Return `false` to skip the admin email |
| `easy_invoice_quote_forms_created` | action | After the quote or invoice exists (`$id`, `$fields`, `$context`) |
| `easy_invoice_quote_forms_builders` | filter | Register another builder for the settings screen |

Two meta keys record the origin: `_easy_invoice_form_source` (builder and form) and `_easy_invoice_form_submission` (every field sent).
