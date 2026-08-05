# Client Setup And Evidence

## Credentials

- Receive the API base URL and AI bearer credential from secure operator
  configuration, not the prompt or repository.
- Never print request headers, bearer values, cookies, environment dumps, or
  credential-bearing URLs.
- Human-control token and scoped confirmation cookie are never Skill inputs.
  Explain the public human step and stop.

## Client Loading

- Codex: invoke the installed Skill as `$idea-validation-workflow` and keep the
  exact plugin source Git commit in the acceptance record.
- Claude Code: invoke the installed Skill as
  `/idea-validation-workflow:idea-validation-workflow` and keep the exact
  plugin source Git commit in the acceptance record.
- Another compatible Markdown-Skill client may load this folder without
  changing `SKILL.md`; client-specific setup must not fork the decision loop.

## Objective Evidence

Record the client/version, execution surface, exact Skill commit, synthetic
input intent, sanitized request IDs, live-readable resource IDs, relevant Web
paths, and objective checks. Keep raw transcripts local and ignored; commit only
their digest and sanitized verification facts.

A static answer, mock response, missing API request IDs, unavailable live
resources, or absent client execution is not a compatibility pass.
