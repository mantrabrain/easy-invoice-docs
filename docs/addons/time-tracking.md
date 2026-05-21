---
title: Time Tracking & Project Billing (Pro addon)
description: Log billable time against clients & projects, then convert tracked time into invoice line items with one click. Replaces standalone time-trackers for freelancers and agencies.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Professional plan</span>
  <span>Requires Easy Invoice Pro with a <strong>Professional</strong> (or Agency) license. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Compare plans →</a></span>
</div>

# Time Tracking & Project Billing

A focused, freelancer-friendly addon for logging billable time and turning entries into invoice line items. No external integrations, no separate timer app — log time inside Easy Invoice, click a button, get an invoice.

## When to use it

- You bill hourly for projects, retainers, or support
- You currently keep time in a spreadsheet, Toggl, Harvest, or "in your head"
- You want the invoice line item to include date + hours + rate automatically

If you bill fixed-fee only, you probably don't need this addon — use the regular invoice builder instead.

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Time Tracking & Project Billing**
3. Click **Activate**
4. The "Settings →" link on the card takes you to the addon page: **Easy Invoice → (sidebar) → Time Tracking & Project Billing** (slug: `easy-invoice-addon-time-tracking`)

On first activation the addon creates one custom table:

```sql
{prefix}_easy_invoice_time_entries
```

Schema:

| Column | Type | Notes |
|---|---|---|
| `id` | BIGINT PK | |
| `client_id` | BIGINT | Nullable. References a WordPress user (Easy Invoice stores clients as users, not posts). |
| `project` | VARCHAR(255) | Free text — your own project label. |
| `description` | TEXT | What you did. |
| `minutes` | INT | Round-to-nearest-minute (no float drift). |
| `rate` | DECIMAL(10,2) | Hourly rate at the time of entry. |
| `entry_date` | DATE | When the work was done. |
| `billed_invoice_id` | BIGINT NULL | Set when entry is rolled into an invoice. |
| `created_at`, `updated_at` | TIMESTAMP | |

Indexed on `client_id`, `billed_invoice_id`, `entry_date`. Deactivating the addon **keeps** the table so you don't lose entries if you re-enable later.

## Quick start

### 1. Log time

On the addon page, the **Log time** form takes:

| Field | Required | What it does |
|---|---|---|
| **Client** | optional | Pick a WordPress user (the same list that powers the rest of Easy Invoice). |
| **Project** | optional | Free text — e.g. "Website redesign", "Q3 retainer". |
| **What did you do?** | **required** | Becomes the line-item description on the invoice. |
| **Hours** | **required** | Fractional. Stored as `round(hours × 60)` minutes. |
| **Hourly rate** | optional | If empty, the entry has zero monetary value (you can still use it for time reporting). |
| **Date** | required (defaults to today) | When the work was done. |

Submit. The entry appears in the table immediately and counts toward the hours/value tiles at the top.

### 2. Filter the list

Two filters across the entries table:

- **Client** — show only entries for one client
- **Status** — `Unbilled` (default) / `Billed` / `All`

The summary tiles (Entries / Hours / Value) reflect the **filter set**, not just the visible page — totals are computed via SQL `SUM()` across every matching row, so a 5,000-entry account still shows the right total.

### 3. Invoice from entries

1. Filter the list to the client you want to bill (and `Unbilled`).
2. Tick the checkboxes on the entries you want to invoice (the header checkbox selects all visible).
3. In the table header, choose the **Bill to…** client.
4. Click **Invoice selected**.

The addon creates a **draft Easy Invoice** with:

- One line item per time entry. Description includes the entry's date, hours, and rate. Quantity = hours; Unit price = rate.
- Customer snapshot (name + email) copied from the WordPress user's profile.
- Subtotal + total set to the sum of the entries' values (tax / adjustments applied later when you open the invoice).
- Status = `draft` so it doesn't email anyone yet.
- Sequence number assigned via the existing `InvoiceNumberService` so it respects your invoice-number prefix and counter.

A success banner shows up with an **Open draft invoice →** link. The invoiced entries are immediately marked **Billed #{invoice_id}** in the entries list.

## Behaviour details

### Clients are WordPress users

Easy Invoice stores clients as WP users with the `customer` role, not as a post type. The addon's client picker:

1. First tries `EasyInvoice\Repositories\ClientRepository::all()` (preferred — handles legacy data paths)
2. Falls back to `get_users(['role__not_in' => ['Administrator']])` if the repository class isn't available

If your client picker is empty, see [Troubleshooting → empty client list](#empty-client-list).

### Dual-write of customer / client id

When the addon creates an invoice from entries it writes **both** meta keys:

```
_easy_invoice_customer_id  (canonical, used by InvoiceRepository)
_easy_invoice_client_id    (legacy, used by some AJAX listing endpoints)
```

This is a defensive choice because the rest of the plugin uses both keys inconsistently. Without it, the new invoice might be invisible to certain listing filters.

### Pagination

The entries table is paginated at **50 / page** with proper `OFFSET`/`COUNT(*)` queries. The Hours and Value tiles always reflect the entire matching set (via SQL `SUM`), not just the current page.

## Permissions

By default any user with `manage_options` (Administrator) can use the addon. If you also have the **[Team Members & Audit Log](./team-roles)** addon enabled, every action through Time Tracking is recorded in the audit log under the actions:

- `time_entry_added`
- `time_entry_deleted`
- `time_tracking_invoice_created`

## Hooks for developers

| Hook | Type | When |
|---|---|---|
| `easy_invoice_time_tracking_invoice_created` `(invoice_id, client_id, entries)` | action | Just after a draft invoice is created from selected entries. |

Example — auto-mark the new invoice as Sent:

```php
add_action('easy_invoice_time_tracking_invoice_created', function ($invoice_id, $client_id, $entries) {
    update_post_meta($invoice_id, '_easy_invoice_status', 'available');
}, 10, 3);
```

## Troubleshooting

### Empty client list

The addon shows users from the same source as the rest of Easy Invoice. If empty:

1. Confirm at least one user exists who isn't an Administrator (`Users → All Users`)
2. Confirm `EasyInvoice\Repositories\ClientRepository` is loadable — disable Easy Invoice Pro briefly to rule out a Pro side-effect

### "Invoice selected" returns to the form with no draft

Check:

1. **Bill to…** is set (the button is disabled until a client is chosen)
2. The selected entries' rows actually have checkboxes ticked (only Unbilled rows have checkboxes; Billed rows show a green pill instead)
3. PHP error log — if `wp_insert_post` failed, the addon redirects with `tt_notice=create_failed`

### Hours look wrong after editing

The addon doesn't currently support inline edit — delete the entry and log it again, or use SQL to update the row. Editing is on the short-list for the next addon iteration.

## Roadmap

Features deliberately deferred from the initial release:

- **Inline edit** (today: delete + re-create)
- **CSV import** from Toggl / Harvest (today: manual entry)
- **Per-task hourly rates** (today: per-entry only)
- **Built-in start/stop timer** (today: manual hours field)
- **Auto-link recurring time entries to a recurring invoice**

If you want one of these prioritised, [open an issue](https://github.com/mantrabrain/easy-invoice-docs/issues) or [contact support](../support).

## See also

- [Invoices walkthrough](../invoices)
- [Smart Reminders & Late Fees](./smart-reminders) — pair with Dunning to chase those generated invoices
- [Team Members & Audit Log](./team-roles) — track which staff member logged which time
- [Addons overview](./)
