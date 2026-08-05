# Idea Validation Workflow

Idea Validation Workflow is a client-neutral plugin for Codex and Claude Code.
It first establishes a non-secret, release-bound IdeaTrace client profile from
a secure bearer reference, then turns proposer or executor intent into bounded,
verified API actions while keeping the server as the only business authority.

The plugin covers:

- client initialization with a canonical HTTPS origin, secure credential
  reference, stable `clientId`, and readable `displayName`;
- a closed, non-secret `ClientConnectionProfileV1` shared by Codex and Claude;
- Idea capture and one-question-at-a-time clarification;
- explicit promotion from an Idea to a validation project;
- project transitions, progress, attention, Evidence, and conclusions;
- immutable seven-block structured reports;
- idempotent recovery after unknown network outcomes;
- proposer/executor public reads; and
- a hard stop before human-governed confirmation.

It does not include or deploy an IdeaTrace server, bundle the application CLI,
store a second copy of project state, or provide credentials.

## Install in Codex

Add this repository as a marketplace and install the plugin:

```bash
codex plugin marketplace add zhanghao1903/my-skills --ref main
codex plugin add idea-validation-workflow@my-skills
```

Start a new Codex task after installation so the Skills are discovered. Invoke
the initialization Skill first:

```text
Use $idea-validation-init to configure this client from a deployment handoff,
an environment-variable credential reference, and my declared attribution.
Never ask me to paste the token.
```

After initialization, invoke the business workflow:

```text
Use $idea-validation-workflow to capture this Idea without promoting it.
Ask one clarification question if required, and never invent proposer attribution.
```

Verify discovery with:

```bash
codex plugin list --marketplace my-skills
```

## Install in Claude Code

From Claude Code, add this GitHub repository as a marketplace and install the
same plugin:

```text
/plugin marketplace add zhanghao1903/my-skills
/plugin install idea-validation-workflow@my-skills
/reload-plugins
```

Invoke the namespaced Skill directly with:

```text
/idea-validation-workflow:idea-validation-init
/idea-validation-workflow:idea-validation-workflow
```

Claude Code also discovers the Skill automatically when a request matches its
description. The Claude package uses `.claude-plugin` manifests; it shares the
same `SKILL.md`, references, and structured-report schema as the Codex package.

The source can also be browsed at
[GitHub](https://github.com/zhanghao1903/my-skills/tree/main/plugins/idea-validation-workflow)
or downloaded with the
[repository ZIP](https://github.com/zhanghao1903/my-skills/archive/refs/heads/main.zip).

## Operator configuration

The operator must securely provide:

- a non-secret deployment connection handoff bound to the actual HTTPS origin,
  OpenAPI, release, Skill commit, and credential identity;
- an AI bearer credential authorized for the API's AI write surface, exposed to
  the initializer only through a restricted file or named environment variable;
- a stable `clientId` and readable `displayName` for declared attribution; and
- an exact checkout of the IdeaTrace application repository at the handoff's
  `skillCommit`, because `npm run client:init` is implemented and verified there.

Keep credentials in the client's secure runtime configuration. Do not place
them in prompts, repository files, request bodies, logs, screenshots, or
evidence. The initialization Skill validates live/readiness/OpenAPI without
following redirects and writes a mode-0600 non-secret profile. It does not
accept raw tokens in prompts or command arguments. The workflow Skill reads
that profile before any AI write.

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

Version `0.2.0` supports Codex, Claude Code, and compatible Markdown-Skill
clients. Its initialization/profile contract and workflow updates are packaged
from reviewed IdeaTrace head
`c637f2140b54f6d56318841e30cad1881e4eee09`, squash-merged as
`31b5e42fa0c25fbc41d6a02f16abb64832861312`. The plugin ships the canonical
profile and structured-report schemas while treating the configured server's
live compatible OpenAPI as runtime authority.

## Update and uninstall

```bash
codex plugin marketplace upgrade my-skills
codex plugin add idea-validation-workflow@my-skills
```

Use a new task after upgrading. To uninstall:

```bash
codex plugin remove idea-validation-workflow@my-skills
```
