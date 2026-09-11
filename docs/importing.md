---
title: Importing from other plugins
description: Move to Easy Invoice from Sliced Invoices or Sprout Invoices on the same site, or from FreshBooks, Wave, Zoho, Invoice Ninja and spreadsheets through CSV — numbers and dates kept, nothing duplicated.
---

# Importing from other plugins

Switching invoicing tools usually means re-typing history or losing it. Easy Invoice reads it in: **Easy Invoice → Import**.

Three rules hold for every import:

- **Nothing is renumbered.** Invoice and quote numbers and dates come across as they were.
- **A client who already exists here is reused**, matched by email.
- **Running an import twice adds nothing.** Every imported record remembers where it came from.

## From Sliced Invoices or Sprout Invoices

If either plugin has data on this site, it is listed on the Import page with a count of what it will bring in — clients, quotes, invoices with every line item, and payments. The other plugin does **not** need to be active; the data is read directly from its posts.

1. Open **Easy Invoice → Import**
2. Under the plugin's name, check the counts
3. Click **Import from …**

Statuses map to their nearest Easy Invoice status (paid, unpaid, overdue, draft, cancelled; quotes sent, accepted, declined). Sprout's custom post statuses are read as well. When the import finishes, a summary lists what was created and what was skipped because it had been imported before.

## From CSV (FreshBooks, Wave, Zoho, Invoice Ninja, spreadsheets)

Columns are matched by **header name**, so most exports work unchanged. Two templates are on the Import page — **Clients CSV** and **Invoices CSV** — showing the names that are recognised; a spreadsheet with those headers imports as-is.

What the invoice import understands:

| Column (any of) | Meaning |
|---|---|
| number, invoice number, invoice id, ref | The invoice number — rows with the same number are one invoice with several lines |
| date, issue date, created | Issue date |
| due date, due, payment due | Due date |
| status, state | Status |
| client email, customer email, email | Client (created if new) |
| client name, customer, company, bill to | Client's name |
| currency | Currency code |
| tax rate, tax, vat | Tax percentage |
| discount | Discount |
| item, product, service, title | Line item name |
| description, details | Line description |
| quantity, qty, hours | Quantity |
| price, rate, unit price, amount | Unit price |
| total, grand total, amount due | Invoice total (checked against the lines) |
| amount paid, paid | A payment is recorded for this amount |
| paid date, payment date | Date of that payment |
| notes, memo, message · terms | Notes and terms |

Comma, semicolon and tab delimiters are detected; both `1,234.56` and `1.234,56` are understood; dates in ISO, US and European forms are read.

1. Export from your old tool (FreshBooks: Reports → Invoice Details; Wave: Sales → Invoices → Export; Zoho: Invoices → Export; Invoice Ninja: Settings → Import/Export)
2. Open **Easy Invoice → Import → CSV files**, choose the file and click **Import CSV**

## After importing

Open **Invoices** and spot-check a few against the old system — totals, dates, client names. Imported records carry `_easy_invoice_import_source` and `_easy_invoice_import_source_id` if you ever need to trace one back.

## For developers

| Hook | Type | Purpose |
|---|---|---|
| `easy_invoice_import_sources` | filter | Register another importer (extend `EasyInvoice\Import\Importer`) |
| `easy_invoice_import_finished` | action | After an import runs (`$source`, `$result`) |
