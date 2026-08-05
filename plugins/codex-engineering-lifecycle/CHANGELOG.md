# Changelog

## 0.1.2 - 2026-07-31

### Added

- Add a Main-only `record-no-publish-acceptance` transition for merged features
  whose confirmed scope explicitly excludes every publication target.
- Record terminal `ACCEPTED_NO_PUBLISH` authority bound to the exact merge
  commit, authorizer, source task/thread, reason, evidence digest, timestamp,
  and deterministic acceptance ID.
- Allow auditable closure through either successful publication or formal
  no-publish acceptance, while keeping the two authority paths mutually
  exclusive.

### Fixed

- Avoid fabricating tags, artifacts, GitHub Releases, or PyPI targets merely to
  close a documentation or independently accepted feature.
- Make identical no-publish authorization replay idempotent and reject
  conflicting authority, wrong role, wrong stage, and wrong merge commit.
- Migrate workflow state v3 to v4 atomically without changing prior feature,
  GoalRun, review, release, or closure history.

## 0.1.1 - 2026-07-30

### Added

- Add an explicit, Main-only `abandon-development` transition for a uniquely
  active BLOCKED GoalRun superseded by a confirmed queued feature.
- Record terminal `ABANDONED` / `DEVELOPMENT_ABANDONED` state with a
  deterministic abandonment ID, authorization source, evidence digest, reason,
  timestamp, and superseding feature ID.
- Migrate workflow state v2 to v3 atomically while preserving existing state
  semantics and the earlier v1 release-ledger migration.

### Fixed

- Release the serialized Goal slot after authorized objective revocation
  without deleting history or fabricating `COMPLETE`, completion timestamps, or
  usage.
- Make abandonment replay idempotent for identical authority and reject
  conflicting replay, wrong role/run/status, self-supersession, and missing or
  non-queued superseding features.

## 0.1.0 - 2026-07-27

### Added

- Three-task Init for Requirements, Engineering Main, and Engineering Review.
- Confirmed requirements handoff and independent technical-plan review.
- Serialized initial and remediation GoalRuns with blocked-state recovery.
- Exact-head PR review, immutable review-record branches, and merge policy.
- Typed GitHub Release/PyPI authorization, partial-failure retry, and closure.
- Strict runtime contracts, Draft 2020-12 schemas, fixtures, and integration
  tests.
- GitHub install, update, uninstall, privacy, support, and terms guidance.

### Fixed

- Keep review-only workflows open at READY until an external merge is observed,
  then accept exact-head merge proof without granting automatic merge authority.
- Make acceptance validation atomic and deterministic message/release replay
  idempotent.
- Require exact previous-result authority for every re-review cycle.
- Bind GitHub Release and PyPI/TestPyPI proof URLs to authorized destinations.
- Make Init task creation recoverable, permit strict bootstrap-only role
  acknowledgements, and reject all feature work until global bootstrap.
- Require confirmed requirements to use the deterministic branch/path at the
  exact authoritative remote tip.
- Make Goal prepare/activate response-loss replays idempotent and require green
  checks for every merge-authorizing READY result.
- Revalidate persisted release target sets and closure targets against the full
  canonical authorization on every state load.
- Bind successful release replay to the exact last submission or complete
  cumulative result, and reject future-stage proof under an earlier stage.
- Pass strict mypy validation for both workflow runtime scripts.
- Reject missing Goal authorization before Init persistence and reject
  duplicate/shadow requirements metadata.
- Bind release replay authority to ordered, reconstructable submission history
  with unique targets and history entries.
- Migrate local workflow state v1 to v2 under lock, reconstructing legacy
  release history before atomic persistence while keeping routed contracts v1.
- Retarget marketplace, policy, support, and schema links to the standalone
  `my-skills` distribution.
- Validate an exact self-contained composition-skill resource inventory instead
  of depending on the original source repository layout.
