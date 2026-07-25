# Codex Feature Lifecycle

Codex Feature Lifecycle coordinates a feature across three durable Codex
tasks:

1. **Requirements** turns a natural-language request into a requirements
   document and waits for explicit confirmation.
2. **Main Work** accepts only a validated confirmed requirements handoff,
   designs and implements the feature, verifies it, and opens or updates the
   pull request.
3. **PR Review & Merge** independently reviews an immutable pull-request
   snapshot and merges only when the configured exact-head safety gates allow
   it.

The plugin is designed for GitHub repositories used from Codex Desktop. It
does not support cross-application routing, non-GitHub forges, automatic
release publication, or administrative merge bypass.

## Requirements

- Codex Desktop with plugin and task-management support.
- A trusted local Git checkout with a GitHub `origin`.
- GitHub access through a connected GitHub capability or authenticated `gh`.
- Permission to create and use three project-scoped Codex tasks.
- Python 3 for the bundled deterministic workflow-state helper.

## Install from GitHub

Add this repository as a Git marketplace and install the plugin:

```bash
codex plugin marketplace add zhanghao1903/my-skills --ref main
codex plugin add codex-feature-lifecycle@my-skills
codex plugin list
```

Start a new Codex task after installation. Bundled skills are discovered at
the new-task boundary.

## Initialize

From the GitHub repository where the workflow should operate, explicitly run:

```text
$codex-workflow-init
```

Init performs capability and repository preflight before it creates anything.
On success it creates or binds exactly three pinned tasks:

- `Requirements · <repository>`
- `Feature Main · <repository>`
- `PR Review & Merge · <repository>`

Automatic merge is disabled by default. If enabled during Init, it applies only
to an approved exact PR head with required checks passing and no blocking
finding. It never authorizes an administrative bypass or release publication.

Send every new feature request to the Requirements task. After the user
confirms the requirements snapshot, that task commits and pushes the document
and proactively sends a validated `RequirementsHandoff` to Main Work.

## Update

Refresh the marketplace snapshot and reinstall:

```bash
codex plugin marketplace upgrade my-skills
codex plugin add codex-feature-lifecycle@my-skills
```

Start a new task, then run `$codex-workflow-init` again. Repeated Init reuses a
healthy three-task workflow. Upgrading a healthy `0.1.x` two-task workflow adds
only the Requirements task and preserves the workflow identity, merge policy,
and existing review state.

Do not edit task IDs, `schemaVersion`, or workflow state by hand.

## Uninstall

Remove the installed plugin:

```bash
codex plugin remove codex-feature-lifecycle@my-skills
```

This does not archive the three user-owned tasks and does not delete local
workflow state. Archive tasks separately if you no longer need them.

If this is the last plugin you use from the `my-skills` marketplace, you may
also remove that marketplace:

```bash
codex plugin marketplace remove my-skills
```

Do not remove the marketplace while another installed plugin depends on it.

## Local data and cleanup

Workflow routing, policy, and delivery state live outside the repository:

```text
${CODEX_HOME:-~/.codex}/feature-lifecycle/projects/<repo-key>/config.json
${CODEX_HOME:-~/.codex}/feature-lifecycle/projects/<repo-key>/state.json
```

The state contains task IDs, repository and policy metadata, paths, commits,
hashes, delivery states, timestamps, and safe error summaries. It does not
store credentials, raw prompts, task transcripts, requirements contents,
source code, diffs, or review findings.

Before deleting state, use the installed workflow helper or
`$codex-workflow-init` status flow to locate the exact repository key. Deleting
that exact directory is irreversible and removes retry history and durable
merge policy.

## Troubleshooting

### The skills do not appear

Start a new Codex task. If the plugin still does not appear:

```bash
codex plugin list --available --json
codex plugin marketplace list
```

Confirm that `my-skills` is configured and that
`codex-feature-lifecycle@my-skills` is installed.

### Init refuses to create tasks

Init intentionally stops when task-management capabilities, the exact Codex
project, the GitHub origin, or GitHub read access cannot be proven. Resolve
every reported preflight item and run `$codex-workflow-init` again.

### A legacy workflow still has two tasks

Upgrade the marketplace and plugin, start a new task, and rerun Init. A valid
legacy workflow receives only the missing Requirements task.

### A handoff or review delivery failed

Retry from the role task that prepared it. Deterministic handoff and dispatch
IDs prevent duplicate feature starts and duplicate review cycles.

### Main Work refuses a direct feature request

This is expected. Continue in the configured Requirements task and explicitly
confirm its requirements document. Main Work starts only after accepting the
validated handoff.

## Safety boundaries

- Requirements never designs or implements the feature.
- Main Work never approves or merges its own changes.
- Reviewer never edits the feature branch.
- Draft or unconfirmed requirements cannot authorize implementation.
- Stale or tampered messages cannot authorize work or merge.
- Release publishing is always a separate explicit action.

## Support and policies

- [Support](SUPPORT.md)
- [Privacy policy](PRIVACY.md)
- [Terms of use](TERMS.md)
- [Changelog](CHANGELOG.md)
- [MIT license](LICENSE)
