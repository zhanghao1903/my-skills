# PR Review — `<owner>/<repo>#<pr-number>` @ `<short-head-sha>`

## 1. Review Metadata

| Field | Value |
|---|---|
| Repository | `<owner>/<repo>` |
| Pull Request | `#<number>` — `<title>` |
| Author | `<author>` |
| Base | `<branch>` @ `<full-base-sha>` |
| Head | `<branch>` @ `<full-head-sha>` |
| Reviewed at | `<ISO-8601 timestamp>` |
| Reviewer | `<AI/reviewer identity and version, when available>` |
| Report status | `CURRENT \| STALE` |
| Review mode | `READ_ONLY \| PUBLISHED` |

## 2. Decision

- **Decision:** `APPROVE | REQUEST_CHANGES | COMMENT | INCOMPLETE`
- **Mergeable:** `true | false | unknown`
- **Blocking findings:** `<count>` (`<IDs or none>`)
- **Rationale:** `<1–3 sentences connecting the decision to findings, evidence, and limitations>`

## 3. Executive Summary

`<2–5 sentences describing the intent, actual behavior change, review result, principal risks, and immediate next action.>`

## 4. Scope and Change Map

### Reviewed scope

- `<paths, modules, call paths, migrations, tests, configuration>`

### Excluded or unavailable scope

- `<generated files, inaccessible dependencies, truncated diff, unavailable environment, none>`

### Change map

| Area | Main change | External behavior | Risk | Validation |
|---|---|---|---|---|
| `<area>` | `<change>` | `<behavior>` | `High/Medium/Low` | `<method/result>` |

## 5. Findings

> Sort by blocking status, severity, then path/line. Preserve IDs across re-reviews.

### PRR-001 — `[S1][Blocking][<category>] <specific defect and consequence>`

- **Location:** `<path>:<line-or-symbol>` @ `<full-head-sha>`
- **Confidence:** `High | Medium`
- **Status:** `open | resolved | accepted-risk | false-positive`
- **Observation:** `<what the implementation does and which invariant/contract it violates>`
- **Trigger:** `<minimal realistic preconditions and execution path>`
- **Impact:** `<user, data, security, reliability, performance, compatibility, or operational consequence>`
- **Evidence:**
  - `<code path, test, log, specification, or reproduction>`
- **Required change:** `<outcome or constraint that must be satisfied>`
- **Verification:** `<specific test or check with a pass/fail condition>`

<!-- Repeat for each finding. If none, write:
No blocking findings identified for the reviewed snapshot.
-->

## 6. Required Actions Before Merge

- [ ] `<PRR-001>` — `<required outcome>`
- [ ] `<PRR-00N>` — `<required outcome>`

`<Write "None" when there are no blocking actions.>`

## 7. Risk Assessment

| Category | Level | Residual risk | Mitigation / owner |
|---|---|---|---|
| Security & privacy | `High/Medium/Low/None/Unknown` | `<risk>` | `<mitigation>` |
| Data integrity | `High/Medium/Low/None/Unknown` | `<risk>` | `<mitigation>` |
| Reliability & concurrency | `High/Medium/Low/None/Unknown` | `<risk>` | `<mitigation>` |
| Performance & scalability | `High/Medium/Low/None/Unknown` | `<risk>` | `<mitigation>` |
| API & compatibility | `High/Medium/Low/None/Unknown` | `<risk>` | `<mitigation>` |
| Deployment & rollback | `High/Medium/Low/None/Unknown` | `<risk>` | `<mitigation>` |

## 8. Validation Evidence

### Reviewer-executed checks

| Command / check | Environment | Result | Exit code | Evidence / notes |
|---|---|---|---:|---|
| `<command>` | `<runtime, OS, relevant config, head SHA>` | `PASS/FAIL/ERROR` | `<code>` | `<summary or artifact ref>` |

### CI / platform checks observed

| Check | Observed at | Status | Evidence / notes |
|---|---|---|---|
| `<check name>` | `<ISO-8601 timestamp>` | `PASS/FAIL/PENDING/UNKNOWN` | `<summary>` |

### Checks not run

- `<check>` — `<reason and resulting limitation>`

## 9. Coverage and Limitations

- **Reviewed:** `<files, modules, paths, behaviors>`
- **Not reviewed:** `<files, modules, paths, behaviors>`
- **Missing context:** `<requirements, environment, logs, dependency source, none>`
- **Staleness condition:** `<what change would require re-review>`

## 10. Open Questions and Assumptions

### Open questions

1. `<question that can materially change the decision or implementation>`

### Assumptions

1. `<explicit assumption used during review>`

## 11. Non-blocking Recommendations

- `<PRR-optional-ID or NOTE-001>` — `<recommendation and value>`

`<Keep these separate from merge requirements. Write "None" when empty.>`

## 12. Machine-readable Summary

- Result file: `pr-review-result.json`
- Schema: `schemas/pr-review-result.schema.json`

```yaml
schema_version: "1.0"
decision: REQUEST_CHANGES
mergeable: false
head_sha: <full-head-sha>
blocking_findings:
  - PRR-001
validation_status: PARTIAL
report_status: CURRENT
```
