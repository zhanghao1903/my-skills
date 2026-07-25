# Changelog

All notable changes to `codex-feature-lifecycle` are recorded here.

## 0.2.0 — 2026-07-25

### Added

- A dedicated `codex-requirements-intake` role for turning natural-language
  feature requests into confirmed requirements documents.
- A validated, deterministic `RequirementsHandoff` contract from Requirements
  to Main Work.
- Idempotent prepare, dispatch, retry, and acceptance state transitions for
  requirements handoffs.
- Init support for three durable Codex tasks: Requirements, Main Work, and PR
  Review & Merge.

### Changed

- Main Work now requires a confirmed requirements handoff before entering
  design or implementation.
- Init can add a Requirements task to a healthy `0.1.x` two-task configuration
  while preserving workflow identity, policy, and review dispatch state.

### Compatibility

- Configuration and state remain schema version 1 because the new fields are
  additive and legacy files remain readable.
- Existing review and merge contracts are unchanged.
- Reinstall or upgrade the plugin and rerun `$codex-workflow-init` to add the
  Requirements task to an existing workflow.
