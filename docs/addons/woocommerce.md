---
title: WooCommerce Invoicing (Pro addon)
description: A real invoice for every WooCommerce order, a credit note for every refund, and — with the E-Invoicing addon — Factur-X and Peppol UBL for shop orders.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included with every Easy Invoice Pro licence. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# WooCommerce Invoicing

WooCommerce produces orders. An order is a record of a sale inside your shop. An **invoice** is a legal document — sequentially numbered, with a tax breakdown, and in a growing number of countries required in a structured electronic form. This addon issues one for every order.

## What you get

- **An invoice per order**, issued automatically when the order reaches a status you choose (Processing and Completed by default). It mirrors the order's lines and totals exactly, including shipping and fees as visible lines.
- **A payment record** when the order is paid, with the gateway's transaction id.
- **A credit note for every refund**, for the refunded amount, referencing the invoice, carrying the refund reason.
- **The Easy Invoice box on every order screen** — the invoice number, Open, PDF, and (with the [E-Invoicing addon](./e-invoicing)) Factur-X and UBL. Orders without an invoice get an *Issue invoice now* button.
- **An "Invoice" link in My Account → Orders** for your customers.
- **Backfill** for orders placed before you enabled the addon.

Everything else Easy Invoice does applies to these invoices too: [statements of account](../features), VAT number checks against VIES, e-invoicing, and the rule that an issued invoice is never deleted.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **WooCommerce Invoicing** and click **Activate**
3. Open its settings from the sidebar to choose trigger statuses

WooCommerce must be active. High-Performance Order Storage is fully supported.

## How the invoice is built

WooCommerce is the source of truth. Each product line becomes an invoice line at its post-coupon unit price; shipping and fees become their own lines. The order's VAT total is carried across, with the rate derived from the taxable base — so an order with one VAT rate reproduces WooCommerce's figures to the cent.

An order that mixes VAT rates (a standard-rated item and a reduced-rate one) is carried across at the effective blended rate. In the rare case that rounding makes the invoice total differ from the order's, the addon **writes a note on the order saying so** rather than letting the two quietly disagree.

The customer's billing name (or company), email and address come across, as do their **billing country** and **VAT number** — read from the meta keys the common EU-VAT checkout plugins use. That is what makes reverse charge and e-invoicing work for shop orders.

Registered customers are already Easy Invoice clients, so their invoices appear on their client record and statement. Guest orders keep the customer's details on the invoice itself.

## Refunds

A WooCommerce refund issues a credit note against the order's invoice, for the refunded amount. An invoice is a tax record; a refund without a credit note leaves it saying the wrong thing. This can be switched off in the addon's settings if your accountant handles refunds another way.

## What it does not do

It does not replace WooCommerce's order emails, packing slips or checkout. It does not rewrite an invoice once it exists — if you edit an invoice after it was issued, it becomes your document. And it issues exactly one invoice per order, no matter how many times the status changes or a webhook retries.

## For developers

| Hook | Type | Purpose |
|---|---|---|
| `easy_invoice_wc_invoice_data` | filter | Change the invoice data built from an order before it is created |
| `easy_invoice_wc_vat_meta_keys` | filter | Add the meta key your checkout plugin stores the VAT number under |
| `easy_invoice_wc_invoice_created` | action | After an invoice is issued for an order |
| `easy_invoice_wc_credit_note_created` | action | After a credit note is issued for a refund |

## See also

- [E-Invoicing](./e-invoicing) — Factur-X and Peppol UBL for shop orders
- [Additional Tax Lines](./additional-tax) — several named taxes on one invoice

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>WooCommerce Invoicing is included with Easy Invoice Pro. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>
