# PR Review — `acme/payments#482` @ `7f31a9c`

> Fictional example. Repository names, commits and findings are illustrative.

## 1. Review Metadata

| Field | Value |
|---|---|
| Repository | `acme/payments` |
| Pull Request | `#482` — Retry provider requests after transient failures |
| Author | `dev-example` |
| Base | `main` @ `1111111111111111111111111111111111111111` |
| Head | `feature/provider-retry` @ `7f31a9c222222222222222222222222222222222` |
| Reviewed at | `2026-07-11T08:30:00Z` |
| Reviewer | `AI PR Reviewer` |
| Report status | `CURRENT` |
| Review mode | `READ_ONLY` |

## 2. Decision

- **Decision:** `REQUEST_CHANGES`
- **Mergeable:** `false`
- **Blocking findings:** `1` (`PRR-001`)
- **Rationale:** The new retry path can create a second charge after a lost response because attempts are not idempotent. This is a user-facing data-integrity defect and must be fixed before merge.

## 3. Executive Summary

This PR adds retries for transient payment-provider failures. Explicit 5xx responses are handled, but ambiguous transport failures are retried without preserving a stable idempotency key. The existing tests pass, yet they do not cover a request accepted by the provider followed by a lost response. One blocking finding remains.

## 4. Scope and Change Map

### Reviewed scope

- `src/payments/provider-client.ts`
- `src/payments/submit.ts`
- `test/payments/retry.test.ts`
- Payment submission and retry call path

### Excluded or unavailable scope

- Provider sandbox and production provider logs

### Change map

| Area | Main change | External behavior | Risk | Validation |
|---|---|---|---|---|
| Payment provider client | Adds exponential retry | A logical payment may be sent more than once | High | Static call-path analysis and targeted tests |

## 5. Findings

### PRR-001 — [S1][Blocking][Data integrity] Lost-response retries can submit the same payment twice

- **Location:** `src/payments/submit.ts:118-134` @ `7f31a9c222222222222222222222222222222222`
- **Confidence:** High
- **Status:** open
- **Observation:** Each retry creates a new provider request without reusing a stable idempotency key.
- **Trigger:** The provider accepts the first charge, but the client loses the response and retries the operation.
- **Impact:** The same customer operation can create two provider charges and inconsistent local reconciliation state.
- **Evidence:**
  - The retry loop constructs a fresh request on each attempt.
  - The added test covers an explicit 503 response but not an accepted request followed by a transport failure.
- **Required change:** Reuse a stable idempotency key for every attempt of the same logical payment operation.
- **Verification:** Add a regression test where the first call records the charge and then raises a transport error; verify retries return the original operation and use one idempotency key.

## 6. Required Actions Before Merge

- [ ] `PRR-001` — Make retries idempotent and add a lost-response regression test.

## 7. Risk Assessment

| Category | Level | Residual risk | Mitigation / owner |
|---|---|---|---|
| Security & privacy | Low | No new authorization surface identified | Preserve current authorization tests |
| Data integrity | High | Duplicate charges after ambiguous failure | Resolve `PRR-001` before merge |
| Reliability & concurrency | Medium | Retry semantics depend on provider guarantees | Add explicit lost-response test |
| Performance & scalability | Low | Bounded retry count | Monitor retry volume |
| API & compatibility | Low | Internal behavior only | Confirm provider idempotency contract |
| Deployment & rollback | Low | Retry behavior enabled immediately | Consider feature flag for rollout |

## 8. Validation Evidence

### Reviewer-executed checks

| Command / check | Environment | Result | Exit code | Evidence / notes |
|---|---|---|---:|---|
| `npm test -- retry.test.ts` | Node.js 22, Linux, head `7f31a9c…` | PASS | 0 | Existing retry tests passed; lost-response path absent |

### CI / platform checks observed

| Check | Observed at | Status | Evidence / notes |
|---|---|---|---|
| `unit-tests` | `2026-07-11T08:20:00Z` | PASS | Passed for reviewed head SHA |

### Checks not run

- Provider sandbox integration test — no sandbox credentials were available.

## 9. Coverage and Limitations

- **Reviewed:** changed payment retry code, direct callers and tests.
- **Not reviewed:** provider service implementation and production logs.
- **Missing context:** definitive provider idempotency contract.
- **Staleness condition:** any change to the retry loop, provider request identity or payment state transition requires re-review.

## 10. Open Questions and Assumptions

### Open questions

1. Does the provider guarantee idempotency when the same merchant operation ID is reused across transport retries?

### Assumptions

1. A transport error can occur after the provider has accepted the request.

## 11. Non-blocking Recommendations

- `NOTE-001` — Emit metrics for retry attempts and provider idempotency replays to support rollout monitoring.

## 12. Machine-readable Summary

```yaml
schema_version: "1.0"
decision: REQUEST_CHANGES
mergeable: false
head_sha: 7f31a9c222222222222222222222222222222222
blocking_findings:
  - PRR-001
validation_status: PARTIAL
report_status: CURRENT
```
