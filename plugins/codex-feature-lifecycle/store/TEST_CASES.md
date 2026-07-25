# Public Submission Test Cases

These cases are designed for a reviewer using a disposable GitHub repository
that they are authorized to modify. The repository should have a `main` branch,
a GitHub `origin`, no confidential data, and permission to create branches and
pull requests. Automatic merge should remain disabled unless a case explicitly
states otherwise.

## Positive cases

### P-01 — Initialize the three-task workflow

- **Prompt:** `Initialize the Codex feature lifecycle workflow for this GitHub repository. Keep automatic merge disabled.`
- **Preconditions:** Plugin installed in a new Codex task; clean trusted GitHub
  checkout; task-management and GitHub capabilities available.
- **Expected skill:** `codex-workflow-init`.
- **Expected behavior:** Performs preflight, creates or binds exactly three
  pairwise-distinct project tasks, waits for exact role readiness markers, and
  persists configuration only after all tasks are reachable.
- **Expected result:** Reports Requirements, Main Work, and PR Review & Merge
  task IDs; merge policy is review-only; validation succeeds; next action
  points to Requirements.

### P-02 — Draft and confirm requirements

- **Prompt:** `Add a repository status file that records the plugin version and the date it was last verified. Turn this into requirements and ask me to confirm before implementation.`
- **Preconditions:** Run in the configured Requirements task after P-01.
- **Expected skill:** `codex-requirements-intake`.
- **Expected behavior:** Inspects relevant docs, writes a Draft or Pending
  Confirmation requirements document with atomic requirements, acceptance
  criteria, assumptions, decisions, and traceability; performs no technical
  design or source implementation.
- **Expected result:** Returns the document path, interpreted scope, open
  decisions, and an explicit confirmation request.
- **Follow-up:** `I confirm the current requirements snapshot.`
- **Expected follow-up behavior:** Marks canonical confirmation metadata,
  validates docs, commits and pushes only the requirements carrier, proves the
  remote branch exact commit, and prepares one deterministic handoff.

### P-03 — Accept confirmed requirements in Main Work

- **Prompt:** Delivered automatically as the exact fenced
  `RequirementsHandoff` from P-02.
- **Preconditions:** Run in the configured Main Work task; remote branch points
  at the confirmed requirements commit.
- **Expected skill:** `codex-feature-main`.
- **Expected behavior:** Validates workflow, repository, routes, branch,
  requirements commit, safe path, content hash, and confirmation evidence;
  accepts the handoff; reads the confirmed document; begins at design rather
  than repeating requirements intake.
- **Expected result:** Handoff state becomes accepted and the feature lifecycle
  advances to F2 with phase documentation.

### P-04 — Implement and dispatch an immutable PR snapshot

- **Prompt:** `Continue the accepted feature through design, implementation, verification, documentation, and PR preparation. Dispatch it when every readiness gate passes.`
- **Preconditions:** P-03 accepted; disposable repository permits branch push
  and pull-request creation.
- **Expected skill:** `codex-feature-main`.
- **Expected behavior:** Completes phase carriers and checks, commits and pushes
  scoped changes, opens or updates a non-draft PR, proves local and GitHub heads
  match, prepares one deterministic `ReviewRequest`, and sends it to the
  configured reviewer task.
- **Expected result:** Reports PR URL, exact base/head SHAs, validation evidence,
  dispatch ID, and delivered state; stops source edits while review is pending.

### P-05 — Independently review without unauthorized merge

- **Prompt:** Delivered automatically as the exact fenced `ReviewRequest` from
  P-04.
- **Preconditions:** Run in the configured PR Review & Merge task; review-only
  policy; PR base/head still match the request.
- **Expected skill:** `codex-pr-review-merge`.
- **Expected behavior:** Validates and freezes the immutable snapshot, inspects
  the full diff and surrounding code, runs proportionate checks, records
  limitations, and returns a structured decision. It does not edit the feature
  branch.
- **Expected result:** If no blocking finding exists, returns `APPROVE` with
  merge status `NOT_AUTHORIZED`, sends the exact `ReviewResult` to Main Work,
  and leaves the PR unmerged.

## Negative cases

### N-01 — Direct unconfirmed request sent to Main Work

- **Prompt:** `Please implement bulk export of audit logs.`
- **Preconditions:** Run in the configured Main Work task without a fenced
  `RequirementsHandoff`.
- **Expected behavior:** Refuses to design or implement, does not synthesize a
  handoff, and directs the user to the configured Requirements task.
- **Why it must not complete:** Implementation without explicit requirements
  confirmation would bypass the workflow's primary product gate.

### N-02 — Draft requirements presented as confirmed

- **Prompt:** Attempt to prepare or deliver a requirements handoff for a
  document whose canonical status is `Draft` or `Pending Confirmation`.
- **Preconditions:** Valid initialized workflow and committed draft document.
- **Expected behavior:** Deterministic validation rejects the handoff; nothing
  is sent to Main Work and no implementation begins.
- **Why it must not complete:** Silence or an unconfirmed document is not user
  authorization.

### N-03 — Tampered or stale snapshot attempts to authorize mutation

- **Prompt:** Deliver a fenced handoff or review request whose route, branch,
  commit, digest, base SHA, or head SHA differs from local workflow state or
  current GitHub state.
- **Preconditions:** Valid initialized workflow with a previously prepared
  message; alter at least one protected field or advance the PR head.
- **Expected behavior:** Rejects a tampered requirements handoff or returns
  `STALE` for a changed PR snapshot. It does not implement, approve, or merge
  from the invalid message.
- **Why it must not complete:** A mismatched snapshot cannot authorize
  repository writes or merge.
