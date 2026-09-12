---
title: Changelog
description: Easy Invoice version history. Recent releases for both the free plugin and Easy Invoice Pro.
---

# Changelog

Easy Invoice follows semantic versioning loosely — `MAJOR.MINOR.PATCH` where `MAJOR` is reserved for breaking schema changes (rare).

## Easy Invoice (free) — 2.4.0 — September 11, 2026

- **Added** — **Server-side PDF rendering.** PDFs are now real text documents (~25 KB for a page instead of a ~180 KB screenshot), rendered identically for every client. The in-browser method remains as a fallback.
- **Added** — **PDF attached to invoice emails** (optional, off by default): Settings → Email → General.
- **Added** — **Credit notes.** Issued invoices can no longer be edited or permanently deleted; a credit note (`CN-…`) corrects them, in part or in full, with a printed reason. See [Payments → Refunds and credit notes](./payments#_4-refunds-and-credit-notes).
- **Added** — **Statement of account** per client, on screen and as PDF, with running balance and balance brought forward.
- **Added** — **VIES check** for EU VAT numbers on the invoice builder.
- **Added** — **REST API** (`easy-invoice/v1`): invoices, quotes, clients, PDF download — gated by the same capabilities as the admin screens.
- **Added** — Per-line tax categories, VAT identities and reverse-charge handling underneath, which the Pro E-Invoicing addon builds on.
- **Added** — **[Import from Sliced Invoices, Sprout Invoices and CSV](./importing)**: clients, quotes, invoices with every line, and payments; numbers and dates kept, existing clients reused, running twice adds nothing.
- **Added** — **Viewed tracking**: each invoice and quote records when the client first and last opened it, shown in the lists and returned by the REST API; `easy_invoice_document_viewed` fires on the first view.
- **Added** — **Attachments** on invoices and quotes, from the media library — listed on the page and PDF and sent with the email.
- **Added** — Hooks underneath the new Pro addons: a signature pad on the public quote page, `easy_invoice_quote_accepted` with the acceptance details, `easy_invoice_text_setting` for saved labels, `easy_invoice_email_template_data` / `easy_invoice_email_finished` around every email, `easy_invoice_reports_after_summary` on the Reports page.
- **Fixed** — **A PayPal payment verified by IPN left the invoice unpaid** until someone marked it by hand. The verified payment now completes the record and settles the invoice; IPN retries are ignored.
- **Fixed** — Deleting a client no longer fails; the confirmation count matches what is removed, and payments are kept as accounting records.
- **Fixed** — Guest customers and per-invoice tax settings are persisted even when the site's global tax is off.
- **Changed** — **The public invoice and quote pages are real WordPress pages now, and themes can override every template** by copying it to `{theme}/easy-invoice/…`. See [Hooks & filters → Frontend templates](./hooks-filters#frontend-templates). Bank transfer / cheque / cash payment from an emailed link, which failed with "Invalid invoice", works again.
- **Changed** — All third-party scripts (jsPDF, html2canvas, Chart.js) ship inside the plugin instead of loading from CDNs; the admin stylesheet is purged from 2.9 MB to 47 KB.
- **Fixed** — The invoice and quote builders could not add a line item (the row's markup printed as text); CSV exports carried HTML entities; the Pro licence screen and Template Builder canvas rendered as text.
- **Changed** — **Download as PDF** captures the page exactly as shown again (browser), with a setting to use a server-generated file instead; **server-generated PDFs now reproduce the selected design** (every built-in design and Pro Template Builder canvases) rather than one neutral layout, with a plain layout available under Settings → Email.
- **Fixed** — An invoice to a person without a business name showed no name in the To block; the PDF now honours renamed Subtotal / Tax / Discount labels and shows **Paid** and **Balance due** when money has been received.
- **Fixed** — **Team Roles works.** EI Manager / Accountant / Sales / Viewer can open the screens their capabilities name; the sidebar and list controls follow the role; WooCommerce no longer bounces team members to My Account.
- **Fixed** — **Add New Payment** records money received (cash, cheque, bank transfer, other) and settles the invoice, instead of running the customer checkout and failing. Partially paid invoices are labelled.
- **Fixed** — Settings screen field ids (every image field was id "0"), unstyled amber/emerald notices across the admin, lists scrolling sideways at 1440 px, dashboard/report figures (active clients, payment time, top clients), broken report links, a fatal on the payment view, the builder's "Edit client" link with no client, payment-panel icons.
- **Added** — **Client Portal settings** (Settings → Client Portal): pick or create the portal page with one click, auto-create client logins. The portal greets clients by name and lists date · amount · status.
- **Changed** — WooCommerce, E-Invoicing, Payment Links, Quote Forms and Translations screens rebuilt on Pro's addon page pattern; Translations sits in the sidebar while Client Language is on; the raw "Pro Settings" screen is retired. Item Library no longer saves every item twice; Time Tracking accepts any number of hours.
- **Added** — Every invoice design shows **Total Due** in its header and **Paid** / **Balance due** under the total once money has come in; multi-page PDFs carry a page label.
- **Fixed** — Removing the last attachment did not persist; quote-to-invoice conversion produced nameless zero lines; a logo that fails to load left a broken-image icon.
- **Changed** — **Every design reset, one by one.** Standard is ink on white with one rule per section; Classic keeps its dark serif ledger row without the cell grid; Minimal / Minimalist are hairlines only (Minimalist centres its header); Modern and Professional lose the panel-inside-a-panel header and heavy shadows; Legacy keeps its ruled grid with softer rules. A small "INVOICE" / "QUOTE" line sits above every document title.
- **Changed** — **Every design tidied and three made distinct.** Corporate has a navy masthead and total, Elegant a serif with hairlines and a bronze total, Creative one gradient and striped rows (they were one layout in three colours). All designs align numeric headings over the figures, use tabular numbers, print totals without colons, and show the client's contact person, phone and VAT number plus your own tax ID in the header; an empty "To" block is left out. Legacy invoices print Terms & Conditions; server PDFs of every design fit a two-line invoice on one page. Filters: `easy_invoice_client_block_html`, `easy_invoice_tax_id_label`.
- **Fixed** — The Reports page's Invoice Report showed most invoices at $0.00 and every one as "Unpaid" (it read meta a saved invoice never has, ignored the date range and counted trashed invoices); it now uses the documents' real totals and statuses, with a Partially paid bucket, and the status chart draws when its tab opens.
- **Fixed** — `{{company_name}}` in emails used the site's name instead of the business name from Settings → Company.
- **Fixed** — **A part-paid or credited invoice asked for the full amount again.** What is owed is one figure everywhere now — total less payments and credit notes: the Total Due in every design, a "Credit note CN-…" row and Balance due in the totals (page, PDF, email attachment), the payment panel ("Amount Due", and that is what a gateway charges), Pay Now shown while anything is owed; an unpaid invoice credited in full is cancelled; a reversed payment no longer sends an issued invoice back to Draft.
- **Upgrading from 2.3.x** — links emailed before 2.4.0 carry no access token and show "not found" until re-sent (or keep the old behaviour with `easy_invoice_require_document_authorisation`); issued invoices lock and are corrected with credit notes; theme overrides of the old single templates move to `{theme}/easy-invoice/`; update Pro to 2.3.0 alongside.

## Easy Invoice Pro — 2.3.0 — September 11, 2026

- **Added** — **[E-Invoicing addon](./addons/e-invoicing)** (Professional): Factur-X / ZUGFeRD PDF/A-3 and Peppol BIS 3.0 UBL for invoices and credit notes, validated against EN 16931 before a file is produced; reads incoming Factur-X, CII and UBL.
- **Added** — **[WooCommerce addon](./addons/woocommerce)** (Personal): an invoice for every order at a chosen status, payments recorded, refunds issued as credit notes, HPOS-compatible, Invoice link in My Account.
- **Added** — **[Card on file](./recurring-invoices#card-on-file-automatic-charging)**: with the client's consent on the Stripe form, recurring and subscription cycles are charged automatically. Off by default. Not yet exercised against a live Stripe account — watch the first live charge.
- **Added** — **[Quote Forms](./addons/quote-forms)** (Personal): a WPForms, Gravity Forms, Contact Form 7 or Fluent Forms submission opens a draft quote or invoice with the client already created.
- **Added** — **[Quote E-Signatures](./addons/quote-signatures)** (Personal): accepting a quote means signing it; the signature is printed on the quote, its PDF and the converted invoice.
- **Added** — **[Payment Links & QR Codes](./addons/payment-links)** (Personal): a link or QR code for a fixed or open amount; an invoice is created for the payer on the spot.
- **Added** — **[Retainers & Prepayments](./addons/retainers)** (Professional): a prepayment balance per client, applied to invoices by hand or automatically.
- **Added** — **[Client Language](./addons/client-language)** (Professional): each client's documents and emails in their own language; the Translations page now offers your saved labels and email text per language.
- **Added** — **[Profit & loss](./addons/reports#profit-loss)** on the Reports page: payments against expenses month by month, net, margin, CSV export.
- **Added** — Webhooks: `invoice.viewed` and `quote.viewed` events.
- **Fixed** — **The Translations page did not work** (posted to an unregistered settings group, read values nothing wrote, no import/export handlers). Rebuilt.
- **Fixed** — **The client portal was a blank page on block themes** (every default WordPress theme since 2022): the portal forced a `page.php` those themes do not have. Pro Template Builder and PDF Toolkit **watermarks now appear on server-generated PDFs** (email attachments, API).
- **Fixed** — **Pro did not run on PHP 7.4** (two PHP 8 union types were parse errors); the build now checks every file with PHP 7.4.
- **Fixed** — **Secure links switched themselves off** on every admin request because the addon watched a mis-spelled option key; restored where the addon is enabled. A secure link can now pay, accept and decline, and the redirect from a plain permalink keeps its query arguments.
- **Fixed** — **Recurring invoices were numbered outside the sequence** ("NW-9" from "NW-000008"); generated invoices now take the next sequential number.
- **Fixed** — **Partial Payments made a paid invoice's total read 0** to statements, credit notes, e-invoicing and the REST API; the total is the total again, the balance stays in the breakdown.
- **Fixed** — **Stripe payments were booked twice** on sites with the webhook configured, and a webhook on its own could never mark an invoice paid. One record per payment, whichever path arrives first.
- **Security** — The Stripe confirmation trusted the browser's invoice id; it now books only against the invoice in the PaymentIntent's own metadata.
- **Fixed** — **Subscription invoices generated an invoice for nothing** — no lines, no client, no number — and never charged anyone. Cycles are now built like recurring invoices, trial cycles bill the trial amount, and both flow through card on file.
- **Fixed** — **Partial Payments' instalment form never appeared** (a wrong class name in the hook, and a syntax error in its script). Card instalments now go to the gateway for that amount, with Stripe checking the amount server-side; offline instalments are recorded as pending and say so; a confirmed instalment marks the invoice Partially paid.
- **Changed** — Recurring invoices keep the parent's payment terms, the admin notice links to the generated draft, and the "every 2 minutes" test frequency is hidden outside WP_DEBUG.
- **Fixed** — **Smart Reminders never sent anything**: it chased statuses a sent invoice never holds. It now covers available / partially paid / unpaid / overdue, sends only the latest due step to an invoice that is already long overdue (not all four at once), prints the real amount and a token-carrying secure link, and the late fee is actually added to the invoice and shown as a row.
- **Fixed** — **Every document carried a diagonal "AVAILABLE" watermark** by default: PDF Toolkit now defaults to no watermark, empty text means none, and the status stamp only marks paid / partially paid / unpaid / overdue / draft / cancelled (and accepted / declined / expired quotes).
- **Fixed** — Template Builder's element palette was hidden under the plugin sidebar and the sheet opened cut off; it now sits beside the sidebar and opens zoomed to fit.
- **Fixed** — Deposit invoices: all three numbering modes work as labelled (suffix, prefix, sequence), the split dialog offers only real statuses, and the notes on both invoices are written for the client.
- **Changed** — The Pro zip carries its `easy-invoice-pro/` folder again, so a renamed download still installs into the right folder.
- **Fixed** — The custom-PDF endpoint produces a real PDF (with the PDF Toolkit watermark) instead of HTML named `.pdf`.
- **Security** — Licence/update requests and the Moneris gateway now verify TLS certificates; the client-portal login goes through `wp_signon()` so throttling and 2FA apply; CSRF checks added to the CSV exports.
- **Fixed** — GDPR export/erasure returned nothing for every subject; Team Roles' audit logger could fatal on quote acceptance; Additional Tax was never applied to totals (a one-time notice appears on affected sites).

## Easy Invoice (free) — 2.3.7 — June 29, 2026

- **Fixed** — **Invoice and Quote listing "Download PDF" button** could leave the user stranded on a blank `admin-ajax.php?action=easy_invoice_generate_pdf…` page instead of downloading the PDF. Root causes on affected sites included page-cache layers (WP Rocket, LiteSpeed, Cloudflare) replaying stale responses of the intermediate admin-ajax URL, security plugins / WAFs stripping the redirect body, and cross-tab session-cookie behaviour (Safari ITP, `SameSite=Strict`) dropping the WP session between the click and the new tab. Two coordinated changes address this:
  1. **The button no longer routes through admin-ajax.** The anchor's native href already points at `<invoice-permalink>?auto_download_pdf=1`, and the single-page JS renders the PDF from there. Removing the click interceptor collapses three server round-trips into one and sidesteps every intermediate-hop failure mode. No security posture change — the destination is the same public permalink the hop was going to anyway.
  2. **The server-side download handlers are hardened for any external caller.** `generateInvoicePdf` and `generateQuotePdf` now accept an admin session (`manage_options`) or a valid per-document access key (`?ik=` / `?qk=`) as alternate authorisation paths when the per-request nonce fails, emit explicit `Cache-Control: no-store` headers to defeat intermediate caching, and fall back to a client-side redirect (`<meta refresh>` + `window.location.replace()`) when the server-side redirect can't fire because headers are already sent. Email download links, dashboard widgets, and any other integration calling these endpoints directly benefit from the same hardening.

## Easy Invoice Pro — 2.2.6 — June 28, 2026

- **Security** — Twelve AJAX handlers in the Custom Templates addon (the Template Builder back-end) were previously gated by nonce only; they now also require admin capability (`manage_options`). The Template Builder UI is admin-only in practice — the change brings the previously-missing handlers to the same policy already enforced on the controller's other eight handlers. No customer-facing behaviour changes; admins continue to use the Template Builder exactly as before.

## Easy Invoice (free) — 2.3.6 — June 26, 2026

- **Security** — Tightened the capability check on the AJAX payment-update endpoint so only users with the dedicated payment-management permission can change payment records or invoice status. All sites should update.
- **Security** — `[easy_invoice_url]` and `[easy_quote_url]` no longer mint per-document access keys for arbitrary visitors. Access keys are now produced exclusively when an invoice / quote email is sent; the shortcodes attach an existing key only when the current viewer is the site admin, the bound client, or already holds the key in the page URL.
- **Fixed** — Bound-client recognition on quote Accept / Decline and invoice manual-payment submission was a dead branch since 2.3.4: the guard used `method_exists()` which returns false for `__call`-resolved methods, and both Invoice and Quote resolve `getClientId()` that way. Logged-in clients whose email matches the document's bound client are now correctly authorised. (Admin and emailed-link paths were unaffected.)
- **Note** — Emailed `{{invoice_url}}` and `{{quote_url}}` links continue to work unchanged for the legitimate recipient. The shortcode change is invisible for admin embeds on admin-context pages; on public pages the shortcode now renders a plain permalink for visitors who don't already hold a valid key.

## Easy Invoice (free) — 2.3.5 — June 26, 2026

- **Security** — Hardened authorisation on the manual-payment submission flow (Bank Transfer / Cheque / Cash). The public AJAX endpoint now requires either a valid per-invoice access key, an admin session, or the bound client logged in by email match. All sites should update.
- **Improved** — Invoice share links sent via `{{invoice_url}}` email merge tag and the `[easy_invoice_url]` shortcode now carry a per-invoice access key. Recipients of these links can submit manual-payment proof as before — no extra steps for the customer.
- **Note** — Invoice links generated **before** this update still load and pay through online gateways (Stripe / PayPal / etc.); only the "submit manual payment" form requires the new keyed link or a logged-in client whose email matches the invoice.
- **Fixed** — Race condition under high concurrency where two simultaneous invoice (or quote) creates could be assigned the same number. The counter read-check-write sequence is now serialised via a MySQL named lock; the lock auto-releases on connection close so it cannot leak across requests.
- **Added** — License recognition for the new **Professional Lifetime** and **Agency Lifetime** SKUs so customers on those tiers are placed correctly and see the matching variant label on the License page.

## Easy Invoice Pro — 2.2.5 — June 26, 2026

- **Security** — Hardened authorisation on the Partial Payments AJAX endpoints (`processPartialPayment`, `getPaymentHistory`). Same ownership model as the Free plugin's manual-payment flow.
- **Security** — Webhooks outbound SSRF blocklist extended to explicitly cover Azure's IaaS metadata endpoint (`168.63.129.16`) and IPv4-mapped IPv6 representations of loopback and cloud-metadata addresses.
- **Security** — Square webhook replay protection. The handler records each `event_id` in a 24-hour transient and short-circuits replays so a captured signed webhook can't be re-fired to duplicate notifications or payment records.
- **Security** — Bulk-export endpoints (`exportCSV`, `exportInvoicesCSV`, `exportQuotesCSV`) now require admin capability (`manage_options`), matching the sibling "Export All" buttons that were already gated.
- **Fixed** — Recurring invoice next-run dates now respect the site timezone (WordPress **Settings → General → Timezone**) instead of falling back to the host's PHP `date.timezone` ini value. Existing schedules keep their stored next-run; the first recalculation after upgrade picks up the corrected logic.
- **Fixed** — Pro deactivation now clears all nine Pro-owned cron events instead of just the legacy payment-reminders hook. Previously, orphan cron registrations stayed in WordPress's cron queue indefinitely after Pro was deactivated.

## Easy Invoice (free) — 2.3.4 — June 12, 2026

- **Security** — Hardened authorisation on the quote Accept and Decline flows. The public AJAX endpoints now require a per-quote access key, admin session, or bound-client email match (CVE-2026-9021).
- **Improved** — Quote share links emailed to clients (`{{quote_url}}`, `[easy_quote_url]`) now carry a per-quote access key.
- **Note** — Quote links generated before this update still display the quote, but Accept / Decline buttons require a new keyed link (admin resend), client login, or admin action.

## Easy Invoice (free) — 2.2.0 — May 13, 2026

- **Added** — "Export Selected (Pro)" option in the Bulk Actions dropdown on both Invoice and Quote listings. Visible to all users; picking it without Pro opens the Upgrade-to-Pro dialog.
- **Added** — "Send Email (Pro)" option in the Bulk Actions dropdown on both listings (companion to the existing Pro bulk-send feature).
- **Added** — "Filter by client" dropdown on All Invoices and All Quotes listings. Persists across view tabs, status chips, pagination, and search.
- **Added** — "Documentation" link in the plugin sidebar (under Join Community) opening [easy-invoice.matrixaddons.com/docs/](https://easy-invoice.matrixaddons.com/docs/).
- **Added** — "Unlock more payment gateways" teaser block on Settings → Payment when Pro is inactive (Stripe, Square, Authorize.Net, Mollie, Paystack, Moneris, Bank Transfer, Cheque, Cash).
- **Improved** — Pro-gated submit interceptors moved to native capture-phase listeners so they always run before the listing template's inline jQuery submit handlers. Fixes the generic "Confirm Action" race on the Quote listing.
- **Fixed** — Quote listing search form posted to a wrong page slug (`easy-invoice-quotes-all` → `easy-quote-all`); picking a value from the client filter no longer redirects to "you are not allowed".
- **Fixed** — Quote / Invoice client filter now uses the correct meta-key namespaces (`_easy_invoice_client_id` / `_easy_invoice_quote_client_id`) plus a fallback match on the client's `customer_email`. Filter now narrows the listing correctly for both flows.
- **Fixed** — Default Invoice / Quote email bodies no longer ship the literal `[easy_(invoice|quote)_url …]` shortcode-reference line that was emailed to clients as raw text. One-time migration strips the line from already-saved options.
- **Internal** — Documentation links across `readme.txt` and helpers now point to `https://easy-invoice.matrixaddons.com/docs/` instead of the legacy URL.

## Easy Invoice Pro — 2.2.0 — May 13, 2026

- **Added** — **Paystack payment gateway**. Hosted-checkout flow (card / bank / USSD / mobile money / QR) for African and select international merchants. Supports NGN, GHS, ZAR, KES, USD, EGP, XOF. HMAC-SHA512 signed-webhook verification; server-side `/transaction/verify` reconciliation on customer return.
- **Added** — **Bulk Send Email**. Tick rows on Invoice / Quote listing → "Send Email" → Apply. Pro dispatches the configured "Available" template to every selected document's client and reports a per-row success/failure toast.
- **Added** — **Bulk Export Selected**. Tick rows → "Export Selected" → Apply → confirm. Pro streams a UTF-8 CSV (with BOM for Excel) of just the selected rows. Endpoint `admin-post.php?action=easy_invoice_pro_bulk_export`, capability-gated, nonce-verified.
- **Added** — Extension hooks `easy_invoice_paystack_payment_complete`, `easy_invoice_pro_after_bulk_send_email`, `easy_invoice_pro_after_bulk_export`.
- **Compatibility** — Paired release with Easy Invoice (Free) 2.2.0.

## Easy Invoice (free) — 2.1.20

- Polish: builder field validation messages.
- Fix: numeric formatting on currencies with non-Latin digits.
- i18n: extended translations file.

## Easy Invoice (free) — 2.1.17 — 2.1.19

- Improved long-PDF rendering (canvas capture).
- Settings UI: re-grouped Email tabs.
- Bug fixes for the quote accept / decline flow.

## Easy Invoice (free) — 2.1.16

- New: discount-before-tax option (in addition to discount-after-tax).
- New: featured / category field for the trip widget (compat).
- Fix: pending-bank status was displayed as "Pending" without prefix.

## Easy Invoice (free) — 2.1.x baseline

- Refactor of the model / repository / controller layer to namespaced classes.
- Migrated all admin screens to React (where applicable).
- Introduced per-payment refund support.
- Reports redone with Chart.js.

## Easy Invoice Pro — 2.1.6

- New gateway: Moneris (Canadian).
- Stripe Payment Element rollout (replaces legacy Stripe Elements).
- Email Enhancements: per-template reply-to, brand colours, PDF attachment.
- Settings: re-organized PDF Options and Privacy & Access tabs.
- Fix: Subscription invoices duplicate generation when both crons fired in the same minute.

## Easy Invoice Pro — 2.1.x baseline

- Recurring + Subscription invoice modules merged into a single settings tab.
- New module: **Item Library** with autocomplete in the invoice builder.
- New module: **Template Builder** for custom invoice templates.
- New: Custom & secure permalinks (hash-protected slugs).
- Privacy & Access: GDPR exporter + eraser registration.
- License manager: daily auto-check + grace period UI.

## Compatibility

| Free | Pro | WordPress | PHP |
| --- | --- | --- | --- |
| 2.1.20 | 2.1.6 | 5.6+ | 7.4+ |
| 2.1.17–2.1.19 | 2.1.4–2.1.5 | 5.6+ | 7.4+ |
| 2.1.10–2.1.16 | 2.0.x | 5.6+ | 7.2+ |

> Always run **matching** major.minor versions of Free and Pro. Mixing across majors is not supported.

## Where to find the canonical changelog

- **Free**: `wp-content/plugins/easy-invoice/changelog.txt` and the [WordPress.org listing](https://wordpress.org/plugins/easy-invoice/#developers).
- **Pro**: bundled in the Pro ZIP as `changelog.txt`, plus the [MatrixAddons changelog page](https://matrixaddons.com/plugins/easy-invoice/#changelog).

## Where to go next

- 🚀 [Installation](/installation) — get started.
- 💎 [Pro features](/features) — what each Pro release adds.
- 💬 [Support](/support) — questions about a specific release.
