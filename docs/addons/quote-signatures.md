---
title: Quote E-Signatures (Pro addon)
description: Accepting a quote means signing it — a drawn signature with the signer's name, time and connection details, printed on the quote, its PDF and the invoice made from it.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Personal tier (free with Pro)</span>
  <span>Included with every Easy Invoice Pro licence. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Get Easy Invoice Pro →</a></span>
</div>

# Quote E-Signatures

A clicked "Accept" button is easy to dispute. A signature drawn by the client, with their typed name and the moment they did it, is what an agreement usually rests on. This addon puts a signature pad on the public quote page.

## What you get

- **A signature pad on Accept** — the client draws with mouse or finger and types their name. The quote cannot be accepted with an empty pad.
- **A record**: the signature image, the name, the time, and the connection's address and browser, stored **outside the media library** (`uploads/easy-invoice/signatures/`).
- **Printed where it matters**: a *Signed by* block on the public quote page, on the quote PDF, and on any invoice converted from that quote.
- **Required by default**; can be made **optional** under **Settings → Quotes → Signature when a quote is accepted**, in which case a client may still accept without drawing.

## Enabling

1. Open **Easy Invoice → Addons** and activate **Quote E-Signatures**
2. Optionally change **Settings → Quotes → Signature when a quote is accepted** from *Required* to *Optional*

That is all. Existing quotes get the pad the next time a client opens them.

## What the client sees

Below the quote, **Accept** opens the pad: a drawing area, a *Clear* link, a *Your name* field and the accept button. Once signed, the quote page shows the signature with "Signed by … on …" — the client can revisit the link and see it.

## For developers

| Hook | Type | Purpose |
|---|---|---|
| `easy_invoice_quote_signed` | action | After a signature is stored (`$quote_id`, signature meta) |
| `easy_invoice_quote_accepted` | action (free plugin) | Fires on every acceptance with the signature, signer name, address and time |

The signature is stored under `_easy_invoice_signature` on the quote and read through `_converted_from_quote` on the invoice, so an invoice built from a signed quote inherits it without copying.
