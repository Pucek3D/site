# ADelier Commerce — operating procedures

Internal document. Not published on the website.

## Contact inquiries: retention and deletion

The privacy notices promise that an inquiry which does not lead to cooperation
is kept **no longer than 60 days after the correspondence ends**. Nothing in the
application deletes data automatically: the website does not store inquiries at
all (the API forwards them and keeps nothing), so the only copies live in the
mailbox and whatever the form-delivery service retains. Deletion is manual.

### Monthly review (first calendar day of each month)

Review once a month, on the **1st**, and delete closed inquiry threads that are
**at least 21 days old** at the time of the review. A thread younger than 21
days waits for the next review, so the oldest it can get is about 52 days
(21 days plus one month), which keeps inquiries within the published 60-day
maximum **provided the review is done on schedule**.

1. In the mailbox `contact@adeliercommerce.com`, identify website inquiries that
   did not lead to a business relationship and whose correspondence has ended.
2. Select the closed threads whose last message is **21 days old or more**.
3. Delete each thread, including relevant messages, attachments and your own
   replies in *Sent*.
4. Empty *Trash* / *Deleted items* so the messages leave the active mailbox.
5. If the verified form-delivery provider keeps a copy (webhook log,
   submission history), delete the corresponding records there.
6. Record only the review date and that it was completed (a calendar entry is
   enough). Do not keep a list of names or addresses of what was deleted.

**Missed review.** If the review on the 1st is missed, perform the cleanup as
soon as possible. Any inquiry that has by then been held longer than 60 days
after the correspondence ended is a breach of the published retention limit:
delete it immediately and note the date and cause of the delay.

Deletion is manual. No automatic deletion is implemented or tested; do not
describe it as automatic anywhere.

### Exceptions — do not delete

Record each exception separately (what is kept, why, until when) so it can be
justified later. Without a recorded reason, the monthly review applies.

- Correspondence that led to an offer, contract or cooperation (retained under
  the contract and accounting rules that apply to it).
- Correspondence needed to establish, pursue or defend a legal claim, until
  that need ends.
- The consent folder in the `CONSENT_LOG_EMAIL` mailbox (every message whose
  subject starts with `[CONSENT]`). It is the consent register, i.e. the only
  proof that consent was given or withdrawn. The monthly inquiry cleanup never
  deletes from it; it is deleted only under "Retention of proof" below.

### Backups

VH.PL mailbox backups follow the host's own rotation cycle. Confirm the cycle
length with VH.PL in writing for server vh20324 and record it here:
`____ days` (NOT VERIFIED).

VH.PL's public package listing advertises backups twice a day kept for 31 days.
That is marketing material, not a confirmation for this account, so it is not
entered above and must not be quoted in the privacy notices until confirmed.

Backup retention is separate from active mailbox retention and must be verified
separately with VH.PL: the monthly review deletes inquiries from the mailbox,
but copies can remain in the
host's backups until the backup cycle rotates. Nothing deletes them earlier, and
no automatic deletion exists. Do not restore backups selectively to recover
deleted inquiries.

### Requests from the person concerned

A deletion or access request sent to `contact@adeliercommerce.com` is answered
within one month. Delete as in steps 3-5 above unless an exception applies, and
reply confirming what was deleted.

## Consent register and withdrawals

The sign-up flow (`/subscribe`) is off unless `SUBSCRIBE_ENABLED=true`. When on,
each confirmed sign-up and each withdrawal arrives as one plain-text e-mail to
`CONSENT_LOG_EMAIL`, a dedicated address in the VH.PL mailbox (never
`contact@`). The subject starts with `[CONSENT] confirmed` or
`[CONSENT] withdrawn`; a mailbox rule files these into the consent folder.
There is no database, no webhook and no external mailing tool
(`CONSENT_WEBHOOK_URL` is ignored): the consent folder is the only proof of
consent.

### Weekly review (every Monday)

1. Collect every `[CONSENT] withdrawn` record received since the last review.
   Withdrawals also arrive by e-mail to `contact@adeliercommerce.com`; treat those
   the same and move a copy into the consent folder.
2. Add each address to the suppression list kept in the consent folder and
   remove it from every send list, so it cannot be mailed again. Do this within
   24 hours of receipt, and never later than 10 business days.
3. A withdrawal covers e-mail and phone for that address. Remove the phone
   number from any call list as well.
4. Never delete a withdrawal record to "clean up": it is the proof that the
   address must not be contacted.

### Every commercial e-mail must have

- a `List-Unsubscribe` header (with `List-Unsubscribe-Post: List-Unsubscribe=One-Click`);
- a working one-step unsubscribe link in the body, pointing to `/unsubscribe`;
- the sender's identity and postal address, as in the site's legal notice.

Send only to addresses with a confirmed `email` consent and no later withdrawal.
Phone offers only to numbers with a confirmed `phone` consent.

### Retention of proof

Keep each consent record, and its withdrawal, for `____` (TODO-CONFIRM, the
same period as in section 12 of the privacy notices) after withdrawal or after
mailing to that address stops. Then delete it from the consent folder. Duplicates
share an `idempotencyKey` and may be discarded.
