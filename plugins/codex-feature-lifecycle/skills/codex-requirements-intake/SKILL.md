---
name: codex-requirements-intake
description: Run the requirements role of an initialized Codex Feature Lifecycle workflow. Use when this task is the configured Requirements task and the user provides a natural-language feature request, asks to create or revise a requirements document, confirms or rejects a requirements snapshot, or needs a confirmed requirements handoff sent to Main Work. Do not use for technical design, implementation, PR review, merge, release, uninitialized repositories, or requirements work outside the configured role task.
---

# Codex Requirements Intake

Own natural-language feature intake through explicit user confirmation and a
validated handoff to Main Work. Never design or implement the feature.

## Load Required Context

1. Read applicable repository instructions and requirements conventions.
2. Read [the handoff contract](references/requirements-handoff.md) completely.
3. Read `assets/requirements-document-template.md` before creating a document.
4. Resolve `<plugin-root>` as two directories above this skill directory and
   use `<plugin-root>/scripts/workflowctl.py`.
5. Run `workflowctl.py validate --repo-root <root>` and then `show`.
6. Verify the current task ID equals `config.threads.requirements`.
7. Call `read_thread` for the configured Main Work task before handoff.

If the workflow is missing, invalid, lacks the Requirements route, belongs to
another repository, or points to an unreachable Main Work task, stop and tell
the user to run `$codex-workflow-init`. Never invent or cache a task ID.

## Role Boundary

- Own requirements elicitation, documentation, confirmation, and handoff.
- Write only the feature requirements document and directly required docs
  index entry.
- Never write technical design, implementation plan, source, tests, changelog,
  release artifacts, or PR review findings.
- Never approve, merge, publish, or release anything.
- Never treat silence, continued conversation, or approval of another artifact
  as requirements confirmation.

## Create The Requirements Snapshot

1. Inspect existing issues, feature docs, stable product docs, and relevant
   current behavior before drafting.
2. Create or reuse a dedicated feature branch. Prefer
   `codex/<feature-slug>` unless repository policy chooses another name.
3. Reuse the repository's requirements location. Otherwise use
   `docs/feature/<feature-slug>/requirements.md`.
4. Convert the source request into:
   - problem, actors, desired outcome, goals, and non-goals;
   - user scenarios and recovery behavior;
   - atomic `REQ-*` requirements;
   - observable `AC-*` acceptance criteria;
   - `ASM-*` assumptions and `DEC-*` open decisions;
   - source-to-requirement traceability.
5. Keep the canonical metadata block from the template in English even when
   the document body uses another language.
6. Match depth to feature complexity. Do not invent enterprise scope, product
   policy, priority, schedule, permissions, retention, or technical solutions.
7. Use `Draft` while material decisions remain and `Pending Confirmation` when
   the document is coherent and ready for the user.

Ask before drafting only when a missing answer would select a materially
different product or authorize risky/irreversible behavior. Otherwise expose
ambiguity in the document and present one consolidated confirmation packet.

## Confirmation Gate

Present the document path, interpreted scope, assumptions, open decisions, and
an exact request to confirm this snapshot or identify changes by ID.

Only after explicit confirmation of the current snapshot:

1. Resolve accepted assumptions and decisions in the document.
2. Set the canonical metadata exactly:

```text
- Status: Confirmed
- Confirmed by: <non-placeholder user identity or "User in Requirements task">
- Confirmed at: <RFC3339 UTC timestamp>
```

3. Mark requirement and acceptance-criterion confirmation fields consistently.
4. Run repository-required doc checks and `git diff --check` when available.
5. Commit only the confirmed requirements carrier and directly required index.
6. Push the feature branch.
7. Query GitHub and prove the remote branch points at the exact requirements
   commit. Do not hand off an unpushed or ambiguous snapshot.

If the user requests changes after confirmation, return the document to Draft,
apply the revision, and require a new explicit confirmation and commit.

## Prepare And Send RequirementsHandoff

Run:

```text
workflowctl.py prepare-requirements
  --repo-root <root>
  --feature-slug <slug>
  --title <title>
  --branch <branch>
  --requirements-path <repository-relative-path>
  --requirements-commit-sha <full-commit-sha>
  --confirmation-evidence <safe-summary>
```

Parse the JSON output.

- If `shouldSend=false`, report the existing handoff state and do not send a
  duplicate.
- If `shouldSend=true`, announce the cross-task action in commentary and call
  `send_message_to_thread` exactly once for `config.threads.main`:

````text
Use $codex-feature-main to validate and accept this confirmed
RequirementsHandoff before technical design or implementation.

```json
<exact handoff object returned by workflowctl.py>
```
````

Do not override the destination model or reasoning setting. After host-confirmed
delivery, run `mark-requirements-dispatched`. If delivery fails or is
uncertain, run `mark-requirements-delivery-failed` with a safe summary and
report that the exact handoff is retryable.

Never paste the user transcript or unstructured source request into the
handoff. The committed requirements document is the durable contract.

## Idempotency And Revisions

- Re-preparing the same commit/path/content/route reuses one handoff ID.
- Retry only a `prepared` or `delivery_failed` handoff.
- Do not resend an `accepted` handoff.
- A requirements change must produce a new commit and handoff ID.
- Do not amend or force-push a requirements commit already handed off.

## Final Response

Return:

- Requirements status and document path
- Feature branch and requirements commit/push proof
- Confirmed scope, assumptions, and deferred decisions
- Handoff ID and state
- Main Work task ID and delivery status
- Any validation/recovery blocker
- Next action: continue in Main Work after accepted delivery
