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
