# Requirements Session Workflow

## Lifecycle Status

- Feature: Add a dedicated requirements collection and confirmation task to
  Codex Feature Lifecycle.
- Branch: `agent/add-requirements-doc-skill`
- Pull request: `#4`
- Current phase: F0 — Intake and repository hygiene
- Repository: `zhanghao1903/my-skills`
- Affected plugin: `plugins/codex-feature-lifecycle`

## F0 — Intake and Repository Hygiene

### User scenario

The workflow currently asks users to send a feature directly to Main Work.
Requirements elicitation and confirmation therefore compete with design,
implementation, and PR preparation inside one long-lived task. The user wants
Init to allocate a separate task that owns natural-language requirements
collection and explicit confirmation.

### Current behavior

- Init creates or binds exactly two tasks: Main Work and PR Review & Merge.
- Main Work owns intake and requirements as well as implementation.
- There is no structured requirements-to-main handoff or durable route for a
  requirements task.

### Desired behavior

- Init creates or binds three distinct repository-scoped tasks:
  Requirements, Main Work, and PR Review & Merge.
- Users begin feature work in Requirements.
- Requirements converts natural language into a documented, explicitly
  confirmed requirement snapshot.
- Requirements proactively sends a validated handoff to Main Work.
- Main Work refuses implementation without a valid confirmed-requirements
  handoff, then continues the existing review dispatch workflow.

### Repository hygiene

- The feature branch is dedicated to the requirements-writing skill and its
  workflow integration.
- The worktree was clean before this document was created.
- The previously merged two-task plugin is present on `main`.
- No unrelated local or generated files are in scope.

### Initial impact

- Public plugin behavior: Init topology changes from two tasks to three.
- Local config: a Requirements task route must be stored.
- Workflow protocol: a versioned requirements handoff is required.
- Existing installations: re-running Init must add the missing Requirements
  route without discarding review dispatch history.
- GitHub merge policy and reviewer boundaries remain unchanged.

### Phase plan

- F1: confirm requirements, non-goals, compatibility, and recovery.
- F2: specify task topology, handoff contract, state transitions, and upgrade
  behavior.
- F3: identify exact files, tests, docs, and rollback.
- F4: implement the role skill, deterministic handoff, Init upgrade, and tests.
- F5: validate manifests, skills, contracts, state transitions, and role
  behavior.
- F6: update plugin metadata, release record, and PR description.

## F1 — Confirmed Requirements

- Status: Confirmed
- Confirmation source: User requested that the existing plugin include the
  requirements-writing skill and that Init use one task for requirements
  collection and confirmation.
- Confirmation date: 2026-07-25

### Goals

- Separate requirements conversation from implementation context.
- Give the user one durable task dedicated to elicitation and confirmation.
- Automatically advance confirmed requirements to Main Work without requiring
  the user to copy instructions between tasks.
- Preserve independent PR review and the existing exact-head merge gate.
- Make the requirements-to-main boundary deterministic and auditable.

### Non-goals

- No cross-application or non-Codex routing.
- No automatic product decision or implicit confirmation.
- No implementation, PR review, merge, or release from the Requirements task.
- No storage of raw user prompts, transcripts, source code, or credentials in
  plugin local state.
- No change to review decision or merge authorization semantics.

### Functional requirements

| ID | Requirement |
| --- | --- |
| REQ-001 | Init must create or bind exactly three distinct project-scoped tasks: Requirements, Main Work, and PR Review & Merge. |
| REQ-002 | The Requirements task must turn natural-language input into a repository requirements document with stable requirement, acceptance-criterion, assumption, and decision identifiers. |
| REQ-003 | The Requirements task must keep the document in Draft or Pending Confirmation until the user explicitly confirms the current snapshot. |
| REQ-004 | After explicit confirmation, the Requirements task must commit and push the confirmed document, prepare a versioned structured handoff, and proactively send it to Main Work. |
| REQ-005 | Main Work must validate the handoff against repository-local workflow state, configured routes, the exact requirements commit, document path, and document digest before starting design or implementation. |
| REQ-006 | A direct unconfirmed feature request sent to Main Work must not bypass the Requirements task; Main Work must route the user back to the configured Requirements task. |
| REQ-007 | Init and handoff delivery must remain idempotent, with explicit retryable delivery-failure state and no partial configuration written before all three tasks are ready. |
| REQ-008 | Re-running Init for an existing healthy two-task configuration must add and prove the Requirements route while preserving workflow identity, merge policy, and review dispatch history. |
| REQ-009 | Local state may store routing identifiers, hashes, paths, commits, status, and timestamps, but not raw requests, transcripts, full document content, code, diffs, findings, or credentials. |
| REQ-010 | The Main Work to PR Review & Merge handoff and all exact-head/check/authorization merge gates must continue to behave as before. |

### Acceptance criteria

| ID | Requirement IDs | Criterion |
| --- | --- | --- |
| AC-001 | REQ-001, REQ-007 | Given no workflow config, when Init succeeds, then three distinct task IDs are persisted only after all three return exact readiness markers. |
| AC-002 | REQ-002, REQ-003 | Given a natural-language feature request, when material ambiguity remains or the user has not explicitly confirmed, then the Requirements task produces or updates a requirements document and does not dispatch Main Work. |
| AC-003 | REQ-004, REQ-009 | Given an explicitly confirmed document committed at an exact SHA, when handoff preparation succeeds, then the emitted object contains only workflow/repository identity, safe feature metadata, route IDs, document path/hash, commit SHA, confirmation metadata, and timestamps. |
| AC-004 | REQ-005 | Given a forged route, wrong workflow, unsafe path, changed document, or mismatched commit/hash, when Main Work accepts the handoff, then validation fails without starting implementation. |
| AC-005 | REQ-004, REQ-007 | Given uncertain handoff delivery, when Requirements retries, then it reuses the same handoff ID and content rather than starting a duplicate feature. |
| AC-006 | REQ-006 | Given a feature prompt without a valid handoff in Main Work, then Main Work identifies the configured Requirements task and refuses to enter design or implementation. |
| AC-007 | REQ-008 | Given a valid two-task config and existing review state, when Init upgrades it with a proven Requirements task, then workflow ID, policy, and review dispatch records remain unchanged. |
| AC-008 | REQ-010 | Existing review request/result positive and negative fixtures and state-machine tests continue to pass. |

### Recovery expectations

- If any newly created task fails readiness, Init writes no new configuration
  and may archive only tasks created in that failed attempt.
- If requirements delivery fails, retain a retryable prepared handoff and send
  the exact same object again.
- If Main Work observes a new requirements commit after accepting an earlier
  one, treat it as a scope revision and require a new handoff.
- If a legacy config cannot be safely upgraded, preserve it and report the
  exact route or state conflict instead of overwriting it.

### Confirmed assumptions

- "Use one task" means add a third durable role task, not temporarily reuse
  Main Work or PR Review & Merge.
- Explicit confirmation occurs in the Requirements task that owns the current
  document snapshot.
- The confirmed requirements document is committed and pushed before handoff
  so Main Work can verify a durable repository artifact.
- Existing schema version 1 configs will be upgraded additively by Init rather
  than invalidated solely because the Requirements route is absent.
