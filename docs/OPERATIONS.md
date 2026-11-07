# ADelier Commerce — operating procedures

Internal document. Not published on the website.

## Contact inquiries: retention and deletion

The privacy notices promise that an inquiry which does not lead to cooperation
is kept **no longer than 60 days after the correspondence ends**. Nothing in the
application deletes data automatically: the website does not store inquiries at
all (the API forwards them and keeps nothing), so the only copies live in the
mailbox and whatever the form-delivery service retains. Deletion is manual.

### Weekly review (fixed day, e.g. every Monday)

A monthly sweep is NOT enough: a thread closed the day after a sweep would sit
for up to ~90 days. Review weekly and delete at **50 days**, leaving a margin
of at least 10 days before the published 60-day maximum even if one review is
missed.

1. In the mailbox `contact@deliercommerce.com`, search for website inquiries
   (subject prefix used by the delivery service) whose last message is
   **50 days old or more** and that did not lead to cooperation.
2. Delete each thread, including attachments and your own replies in *Sent*.
3. Empty *Trash* / *Deleted items* so the messages leave the active mailbox.
4. If the form-delivery service keeps a copy (webhook log, submission history),
   delete the same submissions there.
5. Record only the date the review was done (a calendar entry is enough). Do
   not keep a list of names or addresses of what was deleted.

Deletion is manual. No automatic deletion is implemented or tested; do not
describe it as automatic anywhere.

### Exceptions — do not delete

Record each exception separately (what is kept, why, until when) so it can be
justified later. Without a recorded reason, the 50-day rule applies.

- Correspondence that led to an offer, contract or cooperation (retained under
  the contract and accounting rules that apply to it).
- Correspondence needed to establish, pursue or defend a legal claim, until
  that need ends.

### Backups

VH.PL mailbox backups follow the host's own rotation cycle. Confirm the cycle
length with VH.PL and record it here: `____ days`. A deleted message disappears
from backups only when that cycle rotates; do not restore backups selectively
to recover deleted inquiries.

### Requests from the person concerned

A deletion or access request sent to `contact@deliercommerce.com` is answered
within one month. Delete as in steps 2-4 above unless an exception applies, and
reply confirming what was deleted.
