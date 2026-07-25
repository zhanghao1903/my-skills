# Privacy Policy

Effective date: 2026-07-25

Codex Feature Lifecycle is a skills-only plugin. The publisher does not operate
a backend service for the plugin and does not receive repository contents,
prompts, task transcripts, or workflow state merely because the plugin is
installed or used.

## Data processed in the user's environment

The plugin can process information that the user makes available to Codex,
including:

- natural-language feature requests and confirmed requirements documents;
- local Git repository paths and sanitized GitHub origin metadata;
- Codex project and task identifiers;
- Git branches, commit identifiers, pull-request metadata, checks, and review
  evidence;
- merge policy and workflow delivery state.

The plugin stores a limited workflow record under:

```text
${CODEX_HOME:-~/.codex}/feature-lifecycle/projects/<repo-key>/
```

That record can contain task IDs, repository and policy metadata, paths,
commits, hashes, delivery states, timestamps, and safe error summaries. It is
designed not to store credentials, raw prompts, task transcripts, requirements
contents, source code, diffs, or review findings.

## External services

The plugin may instruct Codex to use:

- OpenAI Codex for task execution and task-to-task communication;
- GitHub, through the user's connected GitHub capability or authenticated
  `gh`, for repository, branch, commit, pull-request, review, and merge
  operations.

Those services process data under their own terms and privacy policies. The
plugin does not provide a separate publisher-operated proxy or telemetry
service.

## User control

- Requirements are not handed to implementation until the user explicitly
  confirms the current document.
- Automatic merge is disabled by default and can be enabled only through an
  explicit durable policy.
- The plugin does not authorize release publication or administrative bypass.
- Users can uninstall the plugin, archive its role tasks, and delete the exact
  repository state directory.

Uninstalling the plugin does not automatically delete Codex tasks, GitHub
content, or local workflow state.

## Information sent for support

If a user opens a GitHub issue or sends support email, the publisher receives
the information the user chooses to provide. Users should not send secrets,
private source code, confidential requirements, personal data, or raw task
transcripts. Support information is used to investigate and respond to the
request and may remain in the selected communication service according to that
service's retention controls.

## Changes and contact

Material changes to this policy will be recorded in the plugin repository. For
privacy questions or deletion requests concerning information voluntarily
sent to the publisher, contact `zhanghao1903@qq.com`.
