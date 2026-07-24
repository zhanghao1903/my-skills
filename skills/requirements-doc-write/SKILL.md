---
name: requirements-doc-write
description: Turn a user's natural-language request, rough product idea, feature request, chat transcript, or issue description into a structured requirements document for explicit user confirmation. Use when Codex needs to elicit and normalize requirements before technical design or implementation, create or update requirements.md, define user scenarios and testable acceptance criteria, separate stated needs from assumptions and open decisions, or revise a draft until the user confirms it. Do not use to write the technical design, implementation plan, or code.
---

# Requirements Doc Write

Convert informal input into a reviewable requirements contract. Preserve the
user's intent, make ambiguity visible, and stop at an explicit confirmation
gate before technical design or implementation.

## Workflow

### 1. Establish the document context

- Read applicable repository instructions and existing product, issue, feature,
  and requirements documents.
- Reuse the repository's requirements location and format when one exists.
- Otherwise use `docs/feature/<feature-slug>/requirements.md` for feature work
  or `docs/requirements/<requirement-slug>.md` for a standalone requirement.
- When no writable workspace exists, produce the document inline and identify
  the proposed path.
- Read `assets/requirements-document-template.md` before creating a new
  document. Adapt it to repository conventions; do not create empty sections
  that are irrelevant to the request.

### 2. Normalize the source request

Extract and distinguish:

- the problem or user need;
- desired outcomes and success signals;
- actors and affected scenarios;
- explicitly requested behavior;
- constraints, priorities, and non-goals stated by the user;
- inferred assumptions that still require confirmation;
- unresolved decisions that could materially change behavior or scope.

Do not silently invent product policy, priority, deadlines, personas, edge-case
behavior, data retention, permissions, compatibility guarantees, or technical
solutions. Mark useful conservative interpretations as `Assumed — pending
confirmation`.

### 3. Resolve only blocking ambiguity

Ask before drafting only when a missing answer would force a choice between
materially different products, authorize a risky or irreversible behavior, or
make the document misleading.

Otherwise draft immediately. Put non-blocking ambiguity into the Assumptions
or Open Decisions section so the user can review it in context. Prefer one
consolidated confirmation round over a long interview.

### 4. Write the requirements contract

Use plain product language. Keep requirements solution-neutral unless the user
explicitly requires a technical constraint.

- Match the document's depth to the request's complexity. Do not inflate a
  small MVP into an enterprise specification or introduce speculative scope
  merely to fill the template.
- Give functional requirements stable IDs such as `REQ-001`.
- Make each requirement atomic, observable, and unambiguous.
- Give acceptance criteria stable IDs such as `AC-001` and map them to one or
  more requirement IDs.
- Express acceptance criteria as externally observable outcomes. Use
  Given/When/Then where it improves clarity.
- Include failure, cancellation, retry, recovery, permissions, privacy,
  compatibility, and accessibility behavior only where relevant.
- Use `Unprioritized` when the user did not set a priority; do not invent one.
- Trace requirements to a user statement, an existing artifact, or a visibly
  labeled assumption.
- Keep technical design, module choices, database schemas, and implementation
  slices out of this document unless they are explicit requirements.

Use these document states:

- `Draft`: material decisions remain unresolved.
- `Pending Confirmation`: the draft is coherent and ready for the user, but
  the user has not explicitly confirmed it.
- `Confirmed`: the user explicitly approved this document snapshot.
- `Superseded`: a newer confirmed requirements document replaces it.

Never mark a document `Confirmed` based on silence, continued conversation, or
approval of a different artifact.

### 5. Run the quality gate

Before presenting the draft, verify:

- the original problem and desired outcome are recognizable;
- goals and non-goals do not contradict each other;
- each requirement is testable and uses consistent terminology;
- every acceptance criterion maps to a requirement;
- assumptions and open decisions are not hidden inside normative language;
- scope additions introduced by Codex are labeled for confirmation;
- no implementation promise is presented as an approved requirement;
- high-risk behavior has explicit authorization and recovery expectations;
- the status matches the unresolved decisions and confirmation state.

If repository files changed, run a lightweight formatting check such as
`git diff --check` when available.

### 6. Present the confirmation packet

Return:

- the document path or inline document;
- a 3–7 bullet summary of the interpreted requirement;
- assumptions introduced;
- open decisions, with the recommended default clearly labeled when useful;
- the exact confirmation request.

Use a direct prompt such as:

> Please confirm this requirements snapshot, or list changes by requirement ID.
> I will not start technical design or implementation until it is confirmed.

Do not ask the user to review details that are not present in the document.

### 7. Incorporate user feedback

- Apply requested changes without discarding previously confirmed intent.
- Summarize material changes by requirement or acceptance-criterion ID.
- Keep the status `Draft` or `Pending Confirmation` until the updated snapshot
  is explicitly confirmed.
- On explicit confirmation, set `Status: Confirmed`, record the confirmation
  date and available confirmer identity, and preserve remaining non-blocking
  assumptions.
- Do not automatically proceed to design, planning, implementation, commit, or
  push. Continue only when the user or a governing lifecycle workflow asks.

## Boundary With Other Skills

- This skill owns requirements elicitation, normalization, documentation, and
  confirmation.
- Use `technical-plan-write` only after confirmation to create a technical
  design and implementation plan.
- When used inside `feature-lifecycle`, this skill may satisfy the requirements
  confirmation phase, but it does not authorize later phases.

## Final Response Shape

- Requirements document:
- Status:
- Interpreted scope:
- Assumptions requiring confirmation:
- Open decisions:
- Confirmation requested:
- Next step after confirmation:
