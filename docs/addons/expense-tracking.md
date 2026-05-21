---
title: Expense Tracking & Reimbursable Items (Pro addon)
description: Log billable expenses with receipts, apply markup, and convert selected expenses into a draft invoice in one click. The Time Tracking pattern, for everything that isn't billable hours.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Professional plan</span>
  <span>Requires Easy Invoice Pro with a <strong>Professional</strong> (or Agency) license. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Compare plans →</a></span>
</div>

# Expense Tracking & Reimbursable Items

Track project expenses — software subscriptions, mileage, materials, contractor costs, travel — with receipt uploads. Apply per-expense markup and roll selected unbilled expenses into a draft invoice in one click. Same mental model as Time Tracking, for everything that isn't billable hours.

## When to use it

- You bill clients for **expenses you incur** on their behalf (project costs, AWS bills, paid stock photography, sub-contractor fees, travel)
- You're already using **Time Tracking** for billable hours and need the matching workflow for everything else
- You want **receipt photos** stored alongside expense entries for tax-time reconciliation
- Your current expense workflow is "type it as a line item by hand each time and hope you remember every receipt"

## Enabling

1. Open **Easy Invoice → Addons**
2. Find **Expense Tracking & Reimbursable Items**
3. Click **Activate**

The **Easy Invoice → Addons → Expense Tracking** entry appears in the in-app sidebar. On first activation the addon creates one custom table:

```sql
{prefix}_easy_invoice_expenses
```

Schema:

| Column | Type | Notes |
|---|---|---|
| `id` | BIGINT PK | |
| `user_id` | BIGINT | Who logged the entry — for sales-rep attribution. |
| `client_id` | BIGINT | Nullable — solo / overhead costs allowed. |
| `project` | VARCHAR(255) | Free-text label. |
| `category` | VARCHAR(64) | software / mileage / materials / contractor / travel / meals / other. |
| `description` | TEXT | The label that ends up as the invoice line item. |
| `amount` | DECIMAL(12,2) | Your cost (before markup). |
| `currency` | CHAR(3) | ISO 4217 — defaults to your site currency. |
| `markup` | DECIMAL(5,2) | Markup % applied when converting to invoice line. |
| `expense_date` | DATE | When the cost was incurred. |
| `receipt_attachment_id` | BIGINT NULL | WP media-library attachment ID for the receipt. |
| `is_billable` | TINYINT(1) | 1 = billable to client, 0 = absorbed cost. |
| `billed_invoice_id` | BIGINT NULL | Set when expense is rolled into an invoice. |
| `notes` | TEXT | Optional internal note. |
| `created_at`, `updated_at` | TIMESTAMP | |

Indexed on `client_id`, `category`, `billed_invoice_id`, `expense_date`, and the composite `(is_billable, billed_invoice_id)` that powers the "billable + unbilled" filter. Deactivating the addon **keeps** the table so you don't lose entries if you re-enable later.

## Logging an expense

The page has a quick-entry form along the top with these fields:

| Field | Required | What it does |
|---|---|---|
| **Date** | ✓ | When the expense was incurred. Defaults to today. |
| **Client** | optional | Pick a client; leave blank for internal / overhead costs. |
| **Project** | optional | Free-text label that's prefixed onto the invoice line: `[Project] Description`. |
| **Category** | ✓ | software / mileage / materials / contractor / travel / meals / other. |
| **Description** | ✓ | What the expense was for — this becomes the invoice line item description. |
| **Amount** | ✓ | Your cost. |
| **Currency** | ✓ | Defaults to your site currency. |
| **Markup %** | optional | Per-expense markup; defaults to the global default (see Settings below). |
| **Billable** | toggle | Check to bill it to the client; uncheck to track as internal cost. |
| **Receipt** | optional | Upload via the WP media library (image or PDF). |
| **Notes** | optional | Internal note; not shown on the invoice. |

Click **Log expense** to save. The list below the form updates immediately.

## Converting expenses into an invoice

The list table has a checkbox column for unbilled, billable expenses. Pick the rows you want, pick a client from the toolbar dropdown, click **Create invoice from selected**. The addon:

1. Creates a draft `easy_invoice` post titled `Expenses Invoice — {Client Name}` with the next available invoice number.
2. **Atomically claims** the selected rows by linking them to the new invoice ID (UPDATE ... WHERE billed_invoice_id IS NULL — race-free even when two admins do this concurrently).
3. Populates the invoice's line items: one per claimed expense, with quantity 1 and rate = `amount × (1 + markup/100)`. The project prefix is included in the description.
4. Stores source metadata on each line item (`source: expense_tracking`, `expense_id`, `category`, `base_amount`, `markup_pct`) so you can trace any line item back to its receipt.
5. If another admin won the race and you ended up with no claimed rows, the empty draft is rolled back automatically.

## Filters

The list has filters for:

- **Client** (any client present in the expense table)
- **Category** (any of the 7 categories)
- **Status** — Unbilled (default) / Billed / All
- **Billable** — Any / Billable / Internal

The summary cards above the form reflect the **filter set**, not just the visible page — so "Billable, unbilled" tells you exactly how much is pending invoicing across your entire history.

## Settings

The addon appends one setting to **Easy Invoice → Settings**:

- **Default Expense Markup (%)** — applied to new entries unless overridden per-entry. Default `0`.

## Hooks

| Hook | When |
|---|---|
| `easy_invoice_expense_tracking_invoice_created` `(invoice_id, client_id, claimed_entries)` | A draft invoice has been generated from claimed expenses. |
| `easy_invoice_audit_log('expenses_invoiced', …)` | If the Team Roles & Audit Log addon is active, every conversion gets an audit-log row. |

## Pairs with

- [Time Tracking & Project Billing](./time-tracking) — same workflow for billable hours
- [Smart Reminders & Late Fees](./smart-reminders) — chase the resulting invoices automatically
- [Custom Invoice & Quote Templates](./custom-templates) — design how the expense lines render on the PDF

<div class="doc-pro-callout" role="note" style="margin-top:2rem;">
  <span class="doc-pro-pill">Pro</span>
  <span>Expense Tracking is part of the Professional tier. <a href="https://matrixaddons.com/plugins/easy-invoice/#pricing" target="_blank" rel="noopener">Upgrade to Professional →</a></span>
</div>
