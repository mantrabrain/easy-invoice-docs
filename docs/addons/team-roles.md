---
title: Team Members & Audit Log (Pro addon)
description: Add Easy Invoice roles (Manager / Accountant / Sales / Viewer) with granular permissions, plus a searchable audit log of every meaningful action. Critical for multi-person agencies and accounting handoffs.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro · Agency plan</span>
  <span>Requires Easy Invoice Pro with an <strong>Agency</strong> license.</span>
</div>

# Team Members & Audit Log

Scoped staff roles for Easy Invoice + a complete, searchable audit trail. Stops the "everybody shares the admin password" anti-pattern and gives you a record of who did what for compliance / accountant handoffs.

## When to use it

- Your team is more than just you (2+ people touching billing)
- You need to give an accountant or bookkeeper view-only access
- You're SOC 2 / accounting-compliant and need an audit trail
- You want to give Sales staff "create invoices but not refund payments" access

If you're a solo business, you don't need this addon — `manage_options` for the one admin user works fine.

## Enabling

1. **Easy Invoice → Addons** → activate **Team Members & Audit Log**
2. Settings open at **Easy Invoice → (sidebar) → Team & Audit Log** (slug: `easy-invoice-addon-team-roles`)

On first activation the addon:

1. Creates one custom table for the audit log: `{prefix}_easy_invoice_audit_log`
2. Registers 4 new WP roles via `add_role()`
3. Grants the `administrator` role every Easy Invoice capability so admins keep working unchanged

Deactivating the addon **keeps the audit table and roles** so you don't lose data or have to re-assign team members if you toggle off + on.

## The roles

| Role | Slug | What they can do |
|---|---|---|
| **EI Manager** | `ei_manager` | Everything except managing team / changing settings — full CRUD on invoices, quotes, payments, clients, refunds, reports, audit |
| **EI Accountant** | `ei_accountant` | Read-everything + record/refund payments. No editing of invoices / clients / settings. |
| **EI Sales** | `ei_sales` | Create invoices + quotes + clients. No refunds, no settings, no reports. |
| **EI Viewer** | `ei_viewer` | Read-only across the board. |

Administrators **always** have full access (every capability is added to the `administrator` role on activation).

## The 17 capabilities

Every meaningful action in Easy Invoice maps to one of these caps. Other code uses `current_user_can('ei_create_invoice')` etc. to enforce them.

| Capability | What it gates |
|---|---|
| `ei_view_dashboard` | Read the Easy Invoice dashboard |
| `ei_view_invoices` | List + open invoices |
| `ei_create_invoice` | Create / edit invoices |
| `ei_delete_invoice` | Delete invoices |
| `ei_send_invoice` | Email an invoice to a client |
| `ei_view_quotes` | List + open quotes |
| `ei_create_quote` | Create / edit quotes |
| `ei_delete_quote` | Delete quotes |
| `ei_view_payments` | List payments |
| `ei_record_payment` | Mark paid / record manual payment |
| `ei_refund_payment` | Issue refunds |
| `ei_view_clients` | List + open client profiles |
| `ei_manage_clients` | Edit / delete clients |
| `ei_view_reports` | Open Reports + P&L |
| `ei_manage_settings` | Change plugin settings |
| `ei_manage_team` | Manage team members (this addon's page) |
| `ei_view_audit_log` | Read the audit log |

The capability cheat-sheet on the Team Members tab shows each role's first 6 caps inline so you can see at a glance "what does Sales not do".

## Assigning roles

The **Team Members** tab lists users currently holding an Easy Invoice role.

### Add a member

1. Use the **Assign a role** form below the table
2. **User** dropdown — picks any existing WordPress user (existing team members are grouped at top; everyone else is under "Other users")
3. **Easy Invoice role** dropdown — pick one of the four roles
4. Save

The user's EI role is **replaced** (not added). If they previously had `ei_sales` and you set them to `ei_accountant`, only `ei_accountant` remains. WordPress role (Subscriber / Editor / etc.) is untouched.

### Revoke a member

In the table, click **Revoke** on the row. This strips every Easy Invoice role from that user. Other WordPress roles remain.

### Audit log row created

Every assign / revoke action writes an audit row (`role_assigned` or `role_revoked`) with the affected user_id and login.

## The audit log

The **Audit Log** tab shows actions in reverse chronological order, paginated 50 rows at a time.

### What's logged

| Action | Source | Resource |
|---|---|---|
| `invoice_created` / `invoice_updated` / `invoice_deleted` | `save_post_easy_invoice` / `before_delete_post` | invoice id |
| `quote_created` / `quote_updated` / `quote_deleted` | `save_post_easy_invoice_quote` | quote id |
| `payment_completed` | `easy_invoice_payment_completed` | invoice id |
| `quote_accepted` / `quote_declined` / `quote_expired` | service hooks | quote id |
| `settings_changed` | `updated_option` (allowlist-filtered) | option name |
| `user_login` | `wp_login` (admins + EI staff only) | user id |
| `role_assigned` / `role_revoked` | this addon | user id |
| `addon_enabled` / `addon_disabled` | addon manager | addon id |
| `audit_cleared` | this addon | n/a |

Each row stores:

```
id          BIGINT PK
user_id     BIGINT NULL          ← actor
user_login  VARCHAR(60)
action      VARCHAR(60)
resource_type VARCHAR(32)        ← 'invoice' / 'quote' / 'option' / 'user' / 'addon'
resource_id BIGINT NULL          ← matching id, or NULL for system actions
details     TEXT NULL            ← JSON blob with context (titles, amounts, etc.)
ip_address  VARCHAR(45)          ← from X-Forwarded-For / Client-IP / REMOTE_ADDR
user_agent  VARCHAR(255)
created_at  TIMESTAMP
```

### What's NOT logged

By design, to keep the table from flooding:

- Autosaves and revisions of posts
- Transient cache writes
- Option updates that don't match the allowlist (license-response payloads, FX rates, scan timestamps, etc.)
- Logins from users with no EI role and no `manage_options`

### Filtering

Two filters at the top of the log:

- **User** — show only actions by one user
- **Action** — show only one action type (e.g. `invoice_deleted`)

Pagination shows total + current page in the heading: "Showing 50 of 1247 entries · Page 3 of 25".

### Clearing the log

The **Clear log** button truncates the entire table. The truncation itself is logged (action `audit_cleared`) so you can prove the clear happened.

## Why option changes are allowlisted

`updated_option` is a noisy hook — every page load can trigger writes to license caches, FX rate updates, transient flags, etc. Recording all of those would flood the table.

The addon only records option changes that match one of these patterns:

```
^easy_invoice_company_
^easy_invoice_invoice_
^easy_invoice_quote_
^easy_invoice_currency_
^easy_invoice_tax_
^easy_invoice_email_
_payment_gateway_settings$
^easy_invoice_addon_.+_enabled$
^easy_invoice_white_label_
^easy_invoice_dunning_
^easy_invoice_pro_plan_tier_
```

Plus the value must actually have changed (`$old_value !== $value`) — some plugins call `update_option` with identical values on every page load.

Plus a per-request memo: if the same option is written twice in one request, only the first write is recorded. So one "Save Settings" click logs one row, not 12.

To extend the allowlist, filter `easy_invoice_team_roles_allowed_options` (planned — currently the patterns are hard-coded in `AuditLogger::onOptionUpdated`).

## Hooks for developers

| Hook | Type | When |
|---|---|---|
| `easy_invoice_team_roles_caps_version` | option | Bump to force role/cap re-install |

Manually log an action from your own code:

```php
\EasyInvoicePro\Addons\TeamRoles\AuditLogger::log(
    'custom_event',           // action
    'custom_resource',        // resource_type
    $resource_id,             // nullable
    ['amount' => 100, 'foo' => 'bar']   // details (will be JSON-encoded)
);
```

Use this to record events that aren't natively hooked by the addon — e.g. "user generated a custom report", "user exported CSV", etc.

## IP address detection

Captured in this order — first valid IP wins:

1. `HTTP_X_FORWARDED_FOR` (first IP in the comma-separated list)
2. `HTTP_CLIENT_IP`
3. `REMOTE_ADDR`

All three are validated with `FILTER_VALIDATE_IP`. Spoofed headers from anonymous proxies are not specifically guarded against — if you have a reverse-proxy in front of WP, ensure your proxy strips client-supplied `X-Forwarded-For` and writes its own value.

## Permissions

The addon's own settings page is gated on `manage_options` — administrators only can assign roles or clear the log. The audit log itself is readable by anyone with `ei_view_audit_log`.

## Common scenarios

### "Give my bookkeeper view-only access for tax season"

1. Activate the addon
2. Create a WP user for the bookkeeper (or reuse an existing one)
3. Assign role **EI Accountant** (read everything + record payments) or **EI Viewer** (strictly read-only)
4. Share login. They can't change anything but can pull reports.

### "Two sales reps share invoicing — limit them"

1. Each rep gets a WP user
2. Assign role **EI Sales** to both
3. They can create / edit / send invoices and quotes, manage clients, but **cannot** refund, change settings, or read the P&L.

### "I want to know who deleted invoice #42"

Open the Audit Log, filter **Action** = `invoice_deleted`. The row's **Who** column shows the username; **Details** shows the title; **IP** shows where they were.

## Roadmap

- Audit log CSV export
- "Show only my actions" quick filter
- Approval workflows (pending → approved before send)
- Per-staff "assigned clients" (only see your own book)
- Allowlist filter for custom option patterns

## See also

- [Webhooks & Zapier Bridge](./webhooks) — stream audit events to an external SIEM
- [White-Label & Brand Override](./white-label) — pair with team roles to give clients a fully branded scoped-access experience
- [Settings reference](../settings-reference)
- [Addons overview](./)
