# Support

## Where to get help

Use the public
[GitHub issue tracker](https://github.com/zhanghao1903/my-skills/issues) for
installation problems, workflow defects, documentation corrections, and
feature requests.

For a security or privacy report that should not be public, email
`zhanghao1903@qq.com`.

Support is provided on a best-effort basis. No response-time or availability
service level is guaranteed.

## What to include

- Plugin version and Codex surface.
- Operating system.
- Whether the plugin came from the public directory or the `my-skills`
  marketplace.
- The command or workflow phase that failed.
- Sanitized error text.
- Whether the repository uses a public or private GitHub origin.
- Relevant schema version and state status, without task transcripts or source
  contents.

Never include access tokens, cookies, private keys, full environment dumps,
private source code, confidential requirements, personal data, or unsanitized
task transcripts.

## Supported scope

The plugin supports:

- Codex Desktop;
- trusted local Git repositories with a GitHub origin;
- three Codex role tasks;
- requirements confirmation, implementation, pull-request review, optional
  gated merge, and post-merge traceability.

It does not currently support:

- Claude or cross-application task routing;
- GitLab, Bitbucket, or other non-GitHub forges;
- automatic release, package, marketplace, or deployment publication;
- admin merge bypass;
- recovery by manually editing workflow state.

## Before reporting an issue

```bash
codex plugin list --available --json
codex plugin marketplace list
```

Then start a new task and ask `$codex-workflow-init` to inspect the current
workflow. Include only its sanitized status summary in the issue.
