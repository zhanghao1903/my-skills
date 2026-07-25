# Setup and Recovery

## Install from this repository

In Codex Desktop, add the repository as a marketplace and install
`codex-feature-lifecycle`. From the CLI, the equivalent flow is:

```bash
codex plugin marketplace add zhanghao1903/my-skills --ref main
codex plugin add codex-feature-lifecycle@my-skills
codex plugin list
```

Start a new Codex task after installation so the host discovers the bundled
skills. Then explicitly invoke `$codex-workflow-init` from a trusted GitHub
repository checkout.

## Initialize

Init checks Codex task-management and GitHub capabilities before creating
anything. It creates or binds exactly three project-scoped tasks—Requirements,
Main Work, and PR Review & Merge—waits for all three role readiness markers,
and only then stores a repository-scoped config.

Start every new feature in Requirements. That task collects natural-language
input, writes a requirements document, waits for explicit user confirmation,
commits and pushes the confirmed snapshot, and proactively sends a validated
RequirementsHandoff to Main Work.

Automatic merging is off by default. Enabling it is a separate durable grant
limited to an approved exact head with green required checks and no blocker.
It never permits admin bypass, automatic release publication, or merging a
different head.

## Local data

The plugin stores routing, merge policy, and dispatch state outside the git
repository:

```text
${CODEX_HOME:-~/.codex}/feature-lifecycle/projects/<repo-key>/config.json
${CODEX_HOME:-~/.codex}/feature-lifecycle/projects/<repo-key>/state.json
```

It stores only task IDs, policy, paths, commits, hashes, state, and timestamps.
It does not store credentials, prompts, task transcripts, requirements
contents, source code, diffs, or findings. The directory is private to the
current user where the platform supports POSIX permissions.

Use `workflowctl.py locate --repo-root <root>` to find the paths without
printing credentials. Use `workflowctl.py validate --repo-root <root>` to
verify schema, repository binding, and state consistency.

## Update

Refresh the configured Git marketplace and reinstall the plugin:

```bash
codex plugin marketplace upgrade my-skills
codex plugin add codex-feature-lifecycle@my-skills
```

Start a new task and re-run `$codex-workflow-init`. A healthy three-task
workflow is reused without creating tasks or rewriting config. A healthy
version `0.1.x` two-task workflow is upgraded by adding only Requirements while
preserving workflow identity, merge policy, and review state. Never manually
edit `schemaVersion` or task routes.

## Recover a partial initialization

- If any newly created task never becomes ready, Init must not write config.
- Init may archive only tasks it created in that failed attempt and only after
  resolving their exact IDs.
- If config exists but a route is stale, invoke Init explicitly in repair mode.
  It must prove a complete replacement set before using `--replace`.
- Adding the first Requirements route to an otherwise identical legacy config
  is an additive upgrade and must not use `--replace`.
- If RequirementsHandoff delivery fails, retry the exact handoff; the stable
  handoff ID prevents duplicate feature starts.
- If delivery fails after a ReviewRequest is prepared, retry the same dispatch;
  the stable dispatch ID prevents a duplicate review cycle.
- Never select a task by title alone when more than one candidate matches.

## Uninstall

Before uninstalling, record the exact project state path for every repository
whose workflow data you may want to remove.

```bash
codex plugin remove codex-feature-lifecycle@my-skills
```

Uninstalling does not delete user-owned tasks or repository-scoped local state.
Archive tasks explicitly if no longer needed. Delete the exact `<repo-key>`
state directory only after confirming it belongs to the intended repository;
this is irreversible and removes retry history and durable merge policy.

Remove the marketplace only when no other installed plugin depends on it:

```bash
codex plugin marketplace remove my-skills
```
