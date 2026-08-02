# Idea Validation Workflow

Idea Validation Workflow is a client-neutral Codex plugin for proposers and
executors using an IdeaTrace LP-03-compatible API. It turns natural-language
intent into bounded, verified API actions while keeping the server as the only
business authority.

The plugin covers:

- Idea capture and one-question-at-a-time clarification;
- explicit promotion from an Idea to a validation project;
- project transitions, progress, attention, Evidence, and conclusions;
- immutable seven-block structured reports;
- idempotent recovery after unknown network outcomes;
- proposer/executor public reads; and
- a hard stop before human-governed confirmation.

It does not include or deploy an IdeaTrace server, store a second copy of
project state, or provide credentials.

## Install from GitHub

Add this repository as a marketplace and install the plugin:

```bash
codex plugin marketplace add zhanghao1903/my-skills --ref main
codex plugin add idea-validation-workflow@my-skills
```

Start a new Codex task after installation so the Skill is discovered. Invoke it
with a natural-language request such as:

```text
Use $idea-validation-workflow to capture this Idea without promoting it.
Ask one clarification question if required, and never invent proposer attribution.
```

Verify discovery with:

```bash
codex plugin list --marketplace my-skills
```

The source can also be browsed at
[GitHub](https://github.com/zhanghao1903/my-skills/tree/main/plugins/idea-validation-workflow)
or downloaded with the
[repository ZIP](https://github.com/zhanghao1903/my-skills/archive/refs/heads/main.zip).

## Operator configuration

The operator must securely provide:

- an IdeaTrace LP-03-compatible loopback or HTTPS API base URL; and
- an AI bearer credential authorized for the API's AI write surface.

Keep credentials in the client's secure runtime configuration. Do not place
them in prompts, repository files, request bodies, logs, screenshots, or
evidence. The Skill reads the configured server's live `GET /openapi.json`
before relying on its write contract.

## Proposer workflow

1. Describe the problem, desired outcome, known facts, labelled hypotheses,
   unknowns, and proposer attribution.
2. Let the Skill ask one bounded clarification when required.
3. Explicitly say `PROMOTE` or clearly request promotion before a project may be
   created.
4. Use the proposer Web view for public, read-only tracking.
5. At a human-confirmation boundary, follow the public handoff and let the AI
   stop. Never give it a human-control token or capability cookie.

## Compatibility baseline

Version `0.1.0` is packaged from the reviewed IdeaTrace source snapshot
`f377801442cf1cfb268b5dd830f5d20e95ce18c0`. The plugin ships the canonical
structured-report schema and links the exact OpenAPI snapshot while treating
the configured server's live contract as runtime authority.

## Update and uninstall

```bash
codex plugin marketplace upgrade my-skills
codex plugin add idea-validation-workflow@my-skills
```

Use a new task after upgrading. To uninstall:

```bash
codex plugin remove idea-validation-workflow@my-skills
```
