---
title: Troubleshooting
description: Fix common Easy Invoice issues — permalinks, missing PDFs, gateway misconfiguration, blank reports, recurring cron, email delivery, license activation.
---

# Troubleshooting

A symptom-based guide. Find the closest match, follow the steps, and you'll have it sorted in minutes.

## Activation & license

### Pro deactivates immediately on activation

**Symptom**: clicking _Activate_ on Easy Invoice Pro shows _Plugin auto-deactivated because Easy Invoice is required_.

**Cause**: the **free** Easy Invoice plugin is not active.

**Fix**:

1. Open <span class="screen-path">Plugins → Installed Plugins</span>.
2. Activate **Easy Invoice** first.
3. Then activate **Easy Invoice Pro**.

### License activation fails

**Symptom**: the License page shows _Could not connect to license server_ or _Invalid response_.

**Causes & fixes**:

| Cause | Fix |
| --- | --- |
| Outbound HTTPS firewall on your host | Whitelist `store.mantrabrain.com` in your host's outbound rules. |
| `wp_remote_post` blocked by a security plugin | Temporarily disable Wordfence / iThemes Security and retry. |
| Site URL changed since purchase | Manually deactivate the old URL in your MantraBrain Account, then activate fresh. |
| License expired | Renew at [MantraBrain Account](https://store.mantrabrain.com/account). |

## Permalinks & 404s

### Public invoice URL shows a 404

**Cause**: pretty permalinks aren't set, or rewrite rules are stale.

**Fix**:

1. Open <span class="screen-path">Settings → Permalinks</span>.
2. Pick anything except _Plain_ (recommend _Post name_).
3. Click **Save Changes** — this flushes rewrite rules.
4. Reload the invoice URL.

If still 404, run the maintenance flush:

```
yoursite.com/wp-admin/admin-post.php?action=flush_easy_invoice_rewrite_rules
```

(Logged-in admin only; redirects back to dashboard.)

### Quote URL still shows old slug after rename

**Fix**: visit:

```
yoursite.com/wp-admin/admin-post.php?action=fix_easy_invoice_quote_slugs
```

This re-syncs the quote slugs after a CPT rename.

## PDF problems

### PDF download is blank or shows only the first page

**Cause**: jsPDF + html2canvas's canvas-capture struggles with very tall content.

**Fixes**:

- Reduce line items if the invoice has 50+.
- Switch the browser to **Chrome** or **Edge** (the canvas implementation is more forgiving than older Safari).
- Use **Print → Save as PDF** (Cmd-P / Ctrl-P) as a fallback — produces a faithful copy.

### PDF font looks weird / boxed

**Cause**: Custom theme font is not embedded.

**Fix**: use a Google Font that's already loaded on the site, or set a system font (`Arial`, `Helvetica`, `Georgia`) under <span class="screen-path">Settings → PDF Options</span> (Pro).

## Email not arriving

**Cause**: WordPress's `wp_mail` falls back to PHP's `mail()` function, which most hosts throttle or block.

**Fix**:

1. Install **WP Mail SMTP** (or any SMTP plugin).
2. Configure it with **SendGrid**, **Postmark**, **Mailgun**, **Amazon SES**, or **Gmail SMTP**.
3. Add **SPF**, **DKIM**, **DMARC** records to your domain.
4. Test deliverability at [mail-tester.com](https://www.mail-tester.com/).

If emails still don't fire:

- Check <span class="screen-path">Settings → Email → General</span> — make sure each template is **enabled**.
- Watch the WP debug log for `easy_invoice_email_failed` actions.
- Verify the recipient email isn't on a corporate filter list.

## Reports / charts blank

**Symptom**: <span class="screen-path">Easy Invoice → Reports</span> shows headings but no charts.

**Causes**:

- Browser blocked Chart.js (uBlock Origin sometimes does).
- Mixed-content warning (your site is HTTP but a chart asset is HTTPS, or vice versa).

**Fix**: open browser dev tools → **Console** tab. Look for blocked scripts. Whitelist `cdn.jsdelivr.net` if needed, or move the site to HTTPS.

## WP-Cron isn't running

**Symptom**: recurring invoices aren't generated, payment reminders never fire.

**Cause**: WP-Cron only fires on page visits. Low-traffic sites barely run cron.

**Fix**: switch to a real cron job:

1. Add to `wp-config.php`:
   ```php
   define( 'DISABLE_WP_CRON', true );
   ```
2. Add a system cron entry (cPanel → Cron Jobs):
   ```
   */5 * * * * curl -s https://yoursite.com/wp-cron.php?doing_wp_cron > /dev/null 2>&1
   ```

This pings WP-Cron every 5 minutes, regardless of visitors.

## Gateway issues

### Gateway not showing on the public invoice

| Cause | Fix |
| --- | --- |
| Gateway not enabled in <span class="screen-path">Settings → Payment</span>. | Toggle on. |
| Missing API key / credential. | Fill in the credentials and save. |
| Currency mismatch. | Switch invoice currency to one the gateway supports. |
| Pro license expired. | Renew. |
| Multiple gateways enabled, only one shows | Per-client default gateway is set. Check the client's user profile. |

### Stripe webhook not received

1. In Stripe dashboard → **Developers → Webhooks**, click your endpoint → **Send test webhook**.
2. Watch your server's access log for the request.
3. If the request arrives but Easy Invoice doesn't react, check the **Signing secret** matches.
4. If the request never arrives, your firewall blocks Stripe's IPs — whitelist the [Stripe webhook IPs](https://stripe.com/docs/ips).

### Moneris not showing

The Moneris gateway files exist in the Pro plugin but may not load if the require list is gapped. Workaround: contact support; they'll provide a small mu-plugin that explicitly requires the Moneris gateway file.

### PayPal IPN sometimes missed

PayPal Standard's IPN can drop notifications. Mitigations:

- Enable **IPN history** retry in your PayPal account.
- Fall back to manual reconciliation: PayPal → Activity → match against unpaid invoices.

## Builder & data

### Invoice doesn't save

**Symptom**: clicking _Save_ shows _Saving…_ forever, or returns an error.

**Causes**:

- Browser console shows a 403 or 401 → **nonce expired** (refresh the page).
- Console shows a 500 → check `wp-content/debug.log`. Typical causes: a malformed line item field, a custom hook throwing.
- Browser shows nothing → check <span class="screen-path">Network</span> tab for the AJAX request to `admin-ajax.php`.

### Items lost after save

**Cause**: a third-party plugin altered `_easy_invoice_items` meta in a `save_post` hook.

**Fix**: temporarily deactivate other plugins one by one to find the offender.

### Client search returns nothing

**Cause**: the user role excludes them from the autocomplete query.

**Fix**: ensure the client has either:

- An invoice already attached to them, or
- The `easy_invoice_client` role.

If you're using a custom role, hook `easy_invoice_client_repository_args` and add it to the role include list.

## Listing & filters

### All Invoices is empty after filtering

**Cause**: filter combo with no matches (e.g. _Status: Paid + Date: today_ when nothing was paid today).

**Fix**: clear filters with the **Reset** button.

## Updates & versions

### Pro update notification doesn't appear

**Cause**: License is inactive or expired.

**Fix**: <span class="screen-path">Easy Invoice → License</span> → re-activate. Updates will appear within 12 hours.

### Free vs Pro version mismatch

The Free plugin sometimes ships at a different version number than Pro (e.g. Free **2.1.20**, Pro **2.1.6**). This is intentional — Pro releases follow their own cadence. Compatibility is tested across the supported pair on each release.

## Multisite

### Each site needs its own license?

Yes — license seats are tracked per site. A **Personal** license = 1 site, **Professional** = 5, **Agency** = 25. Subsite activations count individually.

## Where to go next

- ❓ [FAQs](/faqs) — quick answers to common questions.
- 💬 [Get support](/support) — when you need a human.
- 🪝 [Hooks & filters](/hooks-filters) — extend behaviour to fix edge cases.
