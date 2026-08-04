---
name: engineering-requirements
description: Run the Requirements role of an initialized Codex Engineering Lifecycle workflow. Use when this task is the configured Requirements task and the user supplies a natural-language feature request, asks to revise requirements, explicitly confirms or rejects a requirements snapshot, or asks to retry a confirmed handoff to Engineering Main. Do not use for technical design, implementation, review, merge, release, closure, or a task whose configured role is not Requirements.
---

# Engineering Requirements

Turn a feature request into a confirmed, committed, immutable handoff. Read
[requirements-contract.md](references/requirements-contract.md) before preparing
or retrying a handoff, and read
[delivery-modes.md](../../references/delivery-modes.md) before discussing or
confirming delivery policy. Use
[requirements-template.md](assets/requirements-template.md) for new documents.

## Role gate

1. Resolve the trusted repository and plugin root.
2. Run `workflowctl.py status --repo <root> --task-id <current-task-id>`.
3. Continue only when the returned role is `requirements` and bootstrap is
   ready.
4. If uninitialized or mismatched, stop and direct the user to
   `$engineering-workflow-init`.

Bootstrap has one narrow exception to the global-ready gate. When status proves
this exact task is bound to `requirements`, its own bootstrap flag is false,
and the message requests role acknowledgement, reply only with
`{"type":"EngineeringRoleReady","workflowId":"<exact>","repositoryKey":"<exact>","taskId":"<exact>","role":"requirements"}`.
Do not begin feature work, call `ack-bootstrap`, or claim global readiness. If
this role is already acknowledged but another role is not, wait.

Conversation history is not authority. Read durable status before every
confirmation, handoff preparation, or retry.

## Intake

- Ask only for product, API, safety, compatibility, or release decisions that
  cannot be inferred conservatively.
- Record the user problem, scenarios, goals, non-goals, acceptance criteria,
  failure/recovery expectations, safety impact, assumptions, and open
  questions.
- Create `docs/feature/<feature-slug>/requirements.md` on a dedicated
  `codex/<feature-slug>` branch.
- Keep status `Draft` until explicit user confirmation.
- Present `AGILE`, `AGILE_REVIEWED`, and `STRICT` with their exact review
  trade-offs. Require the user to select one exact mode; never infer or silently
  default it.
- Do not write design, architecture, implementation plan, code, tests, or
  release implementation.

## Confirmation

Show the complete requirements snapshot, including `DeliveryMode`, and ask for
explicit confirmation that names the same exact mode. A generic "confirmed" is
insufficient when no mode was named in the confirmation exchange.
Revisions invalidate prior confirmation.

When confirmed:

1. set the exact metadata fields required by the template:
   `Status: Confirmed`, `FeatureId`, `Branch`, `DeliveryMode`, `ConfirmedBy`,
   and a strict UTC `ConfirmedAt`;
2. run focused Markdown and repository checks;
3. commit only the requirements phase;
4. push the feature branch;
5. prove the canonical `origin` branch tip is exactly that lowercase commit
   SHA.

Never prepare a handoff from a mutable working-tree document.
The helper requires `codex/<feature-slug>` and
`docs/feature/<feature-slug>/requirements.md`, then checks the authoritative
remote branch tip. An unpushed, superseded, or differently located snapshot is
not eligible.

## Prepare and deliver

Run:

```text
workflowctl.py prepare-requirements
  --repo <root>
  --task-id <current-task-id>
  --feature-id <feature-id>
  --title <title>
  --branch <branch>
  --delivery-mode <AGILE|AGILE_REVIEWED|STRICT>
  --requirements-path <path>
  --requirements-commit-sha <sha>
  --confirmation-evidence <bounded-summary>
```

Send the returned JSON unchanged to the configured Main task using the task
message tool. Do not add authority in surrounding prose.

After host-confirmed delivery, run:

```text
workflowctl.py mark-dispatched --repo <root> --message-id <id>
```

On delivery failure, run `mark-delivery-failed` with a sanitized reason and
retain the same deterministic payload for retry.

## Retry and duplicate handling

- Reuse the exact prepared payload when the commit and confirmation are
  unchanged.
- Re-preparing unchanged authority returns the originally stored payload and
  timestamp; deliver that returned payload rather than reconstructing it.
- Treat `duplicate: true` as successful idempotency.
- If the document, commit, branch, confirmation, workflow, or task route
  changes, prepare a new handoff.
- Treat a mode change as a requirements revision that requires a new explicit
  confirmation and committed snapshot. A durable feature cannot silently
  change modes.
- Never create two Main starts for one message ID.

## Refusals

Refuse and redirect:

- plan/design requests to Main after confirmation;
- plan or code review to Review;
- implementation, finding remediation, release, and closure to Main;
- direct merge requests to Review under its exact-head policy.

End with the selected mode, requirements path/commit, confirmation state,
message ID, and delivery state.
