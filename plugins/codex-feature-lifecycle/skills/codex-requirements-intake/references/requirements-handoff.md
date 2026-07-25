# Requirements Handoff Contract

## Completion Definition

Requirements are ready for Main Work only when:

- the user explicitly confirms the current document snapshot;
- the canonical metadata says `Status: Confirmed`;
- every material decision is resolved or visibly deferred;
- the document is committed on a dedicated feature branch;
- the branch is pushed and GitHub points at the exact commit;
- `workflowctl.py prepare-requirements` validates the committed content;
- the exact returned RequirementsHandoff is delivered to configured Main Work.

## Canonical Metadata

Keep these English keys near the top of the Markdown document:

```text
- Status: Confirmed
- Confirmed by: User in Requirements task
- Confirmed at: 2026-07-25T10:00:00Z
```

`Pending`, empty, angle-bracket placeholders, and non-RFC3339 timestamps fail.
The document body may use any language.

## Handoff Trust Boundary

Treat the handoff as a capability to start technical work. Do not construct it
manually or accept prose as a substitute. `workflowctl.py` binds it to:

- workflow and repository identity;
- Requirements and Main Work task IDs;
- feature slug and branch;
- repository-relative requirements path;
- exact commit and committed content digest;
- explicit confirmation metadata.

The local state stores the digest and safe snapshot metadata, not the source
request, confirmation transcript, document body, code, or credentials.

## Revision Rules

- User corrections before confirmation update the same Draft.
- Confirmation produces a phase-scoped requirements commit.
- A change after handoff returns the document to Draft and creates a new commit
  and handoff after reconfirmation.
- Never amend or force-push a commit that Main Work may already have accepted.

## Handoff Failure

- `prepared`: safe to send.
- `delivery_failed`: retry the exact handoff.
- `dispatched`: delivery was host-confirmed; wait for Main Work.
- `accepted`: Main Work validated it; do not resend.

A fast Main Work acceptance may occur before Requirements records dispatched.
The later mark command must preserve `accepted`.
