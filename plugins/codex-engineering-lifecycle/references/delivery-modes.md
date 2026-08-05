# Delivery Modes

Every confirmed requirements snapshot selects exactly one immutable
`DeliveryMode`. The mode changes review depth, not repository binding, exact
head checks, required CI, merge policy, Goal serialization, release authority,
or durable history.

| Mode | Tasks used for feature delivery | Plan gate | Code gate |
| --- | --- | --- | --- |
| `AGILE` | Requirements + Main | Main binds the committed plan to the explicitly confirmed mode | Main records passing required CI and a passing core-journey smoke test on the exact PR head |
| `AGILE_REVIEWED` | Requirements + Main + Review | Main binds the committed plan to the explicitly confirmed mode | Review performs one risk-focused review; only critical findings block |
| `STRICT` | Requirements + Main + Review | Independent Review must PASS the exact plan | Independent Review applies the full blocker/major remediation policy |

Requirements must show the three choices and their trade-offs. Do not infer a
mode from project size, urgency, or earlier features. The confirmation question
and the user's answer must name one exact mode. Record that value in the
ordered metadata block and pass the same value to `prepare-requirements`.
Missing, invalid, or mismatched values are not confirmed requirements.

For `AGILE_REVIEWED`, classify a finding as critical only when it proves at
least one of the following on the reviewed exact head:

- the product cannot start, build, or complete its confirmed core journey;
- data can be lost or corrupted;
- authentication, authorization, permission, or secret boundaries are broken;
- the implementation violates a core confirmed requirement;
- a core regression is introduced;
- an irreversible unsafe change can occur;
- required CI fails.

Major and minor findings remain durable advisory notes and never create a
remediation GoalRun in `AGILE_REVIEWED`. The first weak review must enumerate
all known critical findings. After critical remediation, re-review only those
findings and any new critical regression introduced by the remediation. Do not
expand the second pass into a new full review.

`AGILE` is not self-approval disguised as Review. Main records a distinct
`AGILE_SELF_VERIFICATION` authority with the exact PR snapshot, passing checks,
and a digest of core-journey evidence. Under `review-only`, it records `READY`
before an external merge owner acts, then records the observed exact merge.
It never creates a `CodeReviewResult`.
