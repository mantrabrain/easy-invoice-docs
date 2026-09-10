---
title: E-Invoicing — Factur-X, ZUGFeRD and Peppol UBL (Pro addon)
description: Issue and read the structured electronic invoices now required across the EU — Factur-X and ZUGFeRD PDFs, and Peppol BIS 3.0 UBL.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Professional tier</span>
  <span>Requires an Easy Invoice Pro Professional licence or above. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# E-Invoicing

A PDF is not a structured invoice. Across the EU, invoicing between businesses is moving to machine-readable documents that conform to **EN 16931** — and for most of the businesses using this plugin, that stopped being optional.

This addon turns any invoice into a compliant structured document, and reads the ones your suppliers send you.

## Do you need this?

If you invoice a business in the EU, almost certainly yes — and probably sooner than you think.

| Country | What applies | From |
|---|---|---|
| **Germany** | Must be able to **receive** structured invoices | January 2025 |
| **Belgium** | Peppol exchange between VAT-registered businesses | January 2026 |
| **Poland** | KSeF, phasing in | April 2026 |
| **France** | Every VAT-liable business must **receive** | 1 September 2026 |
| **France** | SMEs must **issue** | September 2027 |
| **Germany** | Issuance obligation | 2027–28 |
| **EU-wide** | ViDA | by 2030 |

Note the pattern: **receiving comes first, and it applies to everybody.** You are likely to be sent a structured invoice by a supplier before you are required to send one. If that happens and you cannot open it, that is a problem today — not in 2027.

If you only invoice consumers, or only invoice within a single non-EU country, you don't need this addon.

## What the formats are

EN 16931 allows two syntaxes, and the market never settled on one. **You do not choose between them — your customer's country does.**

- **Factur-X / ZUGFeRD** — a PDF/A-3 file that is an ordinary PDF a person can read, with the machine-readable XML carried *inside* it. One file satisfies both the human and the system receiving it. Used by **France** and **Germany**.
- **UBL (Peppol BIS Billing 3.0)** — plain XML. Used by **Belgium**, the **Netherlands**, **Norway**, and everything travelling over the **Peppol** network.

Easy Invoice produces both, from the same invoice.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **E-Invoicing (Factur-X / ZUGFeRD / Peppol UBL)**
3. Click **Activate**

A new **E-Invoicing** screen appears in the sidebar.

## What you have to fill in first

A structured invoice has mandatory fields that an ordinary PDF invoice does not. The E-Invoicing screen shows you which of yours are still missing.

**Your details** — under **Easy Invoice → Settings → Company Information**:

- Company name
- Country (two-letter code, e.g. `DE`)
- VAT number (including the country prefix, e.g. `DE123456789`)

**Per invoice** — on the invoice itself:

- Customer name
- Customer country (two-letter code)
- Customer VAT number — needed for reverse charge, and expected by most receivers

If something is missing, the download tells you exactly which fields, all at once, rather than failing one at a time.

## Sending an invoice

Each invoice row on **Easy Invoice → All Invoices** gains two links:

- **Factur-X** — downloads a PDF with the XML embedded
- **UBL** — downloads Peppol BIS 3.0 XML

Send whichever your customer's country expects. Both are built from the same invoice, so the figures cannot disagree.

::: warning Easy Invoice does not transmit the invoice
This addon produces the compliant *file*. It does not send it over Peppol, KSeF, or the French PDP network.

Those are accounts you hold with a provider — an access point, or a partner platform — and they involve registration, credentials, and a contract in your name. A WordPress plugin cannot hold those on your behalf. Keep sending through whatever channel you already use, and hand the file to your access point if you have one.
:::

## Reading an invoice you receive

On the **E-Invoicing** screen, under *Reading invoices you receive*, upload a supplier's file. Easy Invoice shows you what it says: who sent it, the amount due, the line items, and the VAT breakdown with any exemption reasons.

It reads:

- Factur-X and ZUGFeRD PDFs
- CII XML
- UBL XML

Nothing is stored. The file is read, shown to you, and discarded — this is a viewer, not an inbox. It does not create an expense, post to your books, or pay anything.

## Reverse charge and exemptions

A structured invoice cannot simply show `0.00` in the tax column. Each line carries a **category code** and, where the tax is zero, a stated **reason** — an invoice that zero-rates VAT without saying why is rejected.

If you turn on **Work out reverse charge and exports automatically** under **Settings → Tax**, Easy Invoice determines this for you from the two countries and two VAT numbers:

- Both parties VAT-registered in **different EU countries** → reverse charge (category `AE`), no VAT charged, and the invoice states that the customer accounts for it
- Supply **leaving the EU** → export (category `G`), zero-rated

That determination flows into both the PDF and the structured document. See [Additional Tax Lines](./additional-tax) if you instead need several named taxes on one invoice.

## Mixing taxable and non-taxable lines

If some lines on an invoice are marked non-taxable, the structured document reports them as a separate **exempt** group, with the taxable lines in their own group at your rate. This is required: each VAT breakdown group's tax amount must equal that group's own basis times its own rate.

You don't have to do anything for this — it follows from the per-line *taxable* checkbox you already use.

## Discount before or after tax

EN 16931 defines the taxable basis as the line total **minus** discounts. That means the *apply discount after tax* setting cannot be expressed in a structured invoice.

If an invoice is configured that way, the download refuses and says so, rather than sending a tax authority a different total from the one your customer received. Switch that invoice to discount **before** tax.

## Peppol participant identifiers

If you send over the Peppol network, your access point will expect an **endpoint identifier** for you and for your customer. These are read from:

- `easy_invoice_peppol_endpoint_id` / `easy_invoice_peppol_endpoint_scheme` (site options — yours)
- `_easy_invoice_customer_peppol_id` / `_easy_invoice_customer_peppol_scheme` (post meta — your customer's)

Without them the UBL is still valid EN 16931 and fine for portal upload or email; an access point will want them.

## For developers

| Hook | Type | Purpose |
|---|---|---|
| `easy_invoice_tax_treatment` | filter | Override the determined tax category for a document |
| `easy_invoice_tax_exemption_reason` | filter | Change the wording printed for a category |
| `easy_invoice_einvoicing_before_serialise` | action | Adjust the CII document before it is written |
| `easy_invoice_facturx_before_generate` | action | Attach extra files, or change PDF/A conformance |
| `easy_invoice_ubl_preset` | filter | Swap the UBL profile (Peppol by default; presets exist for IT, RO, AT, ES, NL) |
| `easy_invoice_ubl_before_write` | action | Adjust the UBL document before it is written |

## See also

- [Additional Tax Lines](./additional-tax) — several named taxes on one invoice
- [PDF Toolkit](./pdf-toolkit) — watermarks and PDF customisation
- [Accounting Sync](./accounting-sync) — push invoices to QuickBooks, Xero or FreshBooks

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro · Professional</span>
  <span>E-Invoicing requires a Professional licence or above. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Compare plans →</a></span>
</div>
