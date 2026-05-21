---
title: Additional Tax Lines (Pro addon)
description: Add unlimited named tax lines per invoice — VAT + duty, GST + PST, federal + state — each with its own rate, rendered as separate lines on the PDF.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included free with Easy Invoice Pro — no license key required. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Additional Tax Lines

The free Easy Invoice plugin supports a single tax rate per invoice — fine for "VAT 20%" or "Sales Tax 8%", but useless if you bill across multiple tax jurisdictions. This addon lets you add unlimited named tax lines per invoice, each with its own rate, rendered as separate lines on the PDF so clients see exactly what they're paying and to whom.

## When you need this

- **VAT countries** with import duty (VAT + Duty stacked)
- **United States** multi-state — federal + state + city tax
- **Canada** — GST + PST/QST/HST per province
- **Australia** — GST + state-level surcharges
- **Any service** with surcharges (booking fee + tax, environmental levy + tax, etc.)

If your business operates in a single tax jurisdiction with one rate, you don't need this addon — the free plugin's single tax field is enough.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Additional Tax Lines**
3. Click **Activate**

New options appear under **Easy Invoice → Settings** (Additional Tax section):

- **Enable Additional Tax** — master switch
- **Tax Line Definitions** — add as many named tax lines as you need; each entry has:
  - **Name** (shown on the invoice — "VAT", "PST", "Import Duty")
  - **Rate** (percentage)
  - **Applies to** (which line items the tax applies to — all, taxable only, specific categories)
  - **Order** (which tax line shows first on the invoice)
  - **Compound** (whether this tax is calculated on the previously-taxed total, e.g. PST on top of GST in some Canadian provinces)

## How it renders

Each defined tax appears as a separate line in the totals block:

```
Subtotal:           $1,000.00
VAT (20%):            $200.00
Import Duty (5%):      $50.00
Total:              $1,250.00
```

Clients can see exactly what each tax is for and at what rate — important for B2B reconciliation, customs documentation, and tax-deductibility records.

## Per-item taxability

Each invoice line item can be marked **taxable** or **non-taxable**. Taxes only apply to taxable items, so you can mix:

- A $500 service line (taxable)
- A $100 shipping line (non-taxable in some jurisdictions)
- A $50 tip line (typically non-taxable)

And the tax lines calculate against only the taxable portion.

## Pairs well with

- [Item Library](./item-library) — items in the library can have a default tax category, so you don't have to remember per-invoice
- [PDF Toolkit](./pdf-toolkit) — control how the tax block is styled on the PDF
- [Custom Invoice & Quote Templates](./custom-templates) — design where the tax breakdown sits on your custom layout

## Settings location

Tax line configuration lives as a section on **Easy Invoice → Settings**. There's no separate "Additional Tax" admin page.

## See also

- [Settings reference](../settings-reference)

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Additional Tax Lines is included free with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
