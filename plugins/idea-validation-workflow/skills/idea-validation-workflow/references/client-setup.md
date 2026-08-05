# Client Setup And Evidence

## Initialized profile

- Use `$idea-validation-init` to create a validated `ClientConnectionProfileV1`
  before an AI write. The canonical schema is
  [`client-connection-profile.v1.schema.json`](../../idea-validation-init/references/client-connection-profile.v1.schema.json).
- Resolve `baseUrl`, `openapiUrl`, `releaseId`, `clientId`, `displayName`, and
  the credential source reference from that profile. Reject an unknown version,
  invalid fields, release/Skill mismatch, known expiry, or unsafe credential
  source.
- A profile with credential usability `UNVERIFIED` is not an authenticated
  success. Surface the status and let an actual authorized write fail closed.
- Map `clientId` to existing request-body `client` and `displayName` to existing
  declared display attribution only where the current OpenAPI permits it.

## Credentials

- Resolve the AI bearer from the profile's environment-variable or restricted
  absolute file reference, not the prompt or repository.
- Never print request headers, bearer values, cookies, environment dumps, or
  credential-bearing URLs.
- Human-control token and scoped confirmation cookie are never Skill inputs.
  Explain the public human step and stop.

## Client Loading

- Codex: invoke `$idea-validation-init` once for local setup, then invoke
  `$idea-validation-workflow`. Keep the exact plugin source Git commit and Skill
  tree digest in the acceptance record.
- Claude Code: invoke `/idea-validation-workflow:idea-validation-init` once,
  then `/idea-validation-workflow:idea-validation-workflow`. Use the same
  initializer/profile contract and do not fork the decision loop.
- Another compatible Markdown-Skill client may load both Skill folders without
  changing `SKILL.md`.

## Objective Evidence

Record the client/version, execution surface, exact Skill commit, synthetic
input intent, sanitized request IDs, live-readable resource IDs, relevant Web
paths, and objective checks. Keep raw transcripts local and ignored; commit only
their digest and sanitized verification facts.

A static answer, mock response, missing API request IDs, unavailable live
resources, or absent client execution is not a compatibility pass.
