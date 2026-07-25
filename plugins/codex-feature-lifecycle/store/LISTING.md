# Public Plugin Listing

## Submission identity

- **Submission type:** Skills only
- **Plugin name:** Codex Feature Lifecycle
- **Version:** 0.2.0
- **Developer:** zhanghao
- **Category:** Productivity
- **License:** MIT

## Listing copy

### Short description

Coordinate requirements, feature work, review, and merge.

### Long description

Codex Feature Lifecycle turns a feature request into a traceable GitHub
delivery workflow across three dedicated Codex tasks. Requirements collects and
normalizes the request, writes a requirements document, and waits for explicit
user confirmation. Main Work accepts only the validated confirmed snapshot,
then designs, implements, verifies, documents, and prepares the pull request.
PR Review & Merge independently reviews an immutable pull-request head and can
merge only when explicitly authorized exact-head and required-check gates pass.

The plugin preserves structured handoff and review state locally, supports
safe retries, and refuses stale or tampered workflow messages. Automatic merge
is off by default. Release publication, administrative bypass, non-GitHub
forges, and cross-application routing are outside this version.

## Public URLs

- **Website:** https://github.com/zhanghao1903/my-skills/tree/main/plugins/codex-feature-lifecycle
- **Support:** https://github.com/zhanghao1903/my-skills/issues
- **Privacy:** https://github.com/zhanghao1903/my-skills/blob/main/plugins/codex-feature-lifecycle/PRIVACY.md
- **Terms:** https://github.com/zhanghao1903/my-skills/blob/main/plugins/codex-feature-lifecycle/TERMS.md
- **Source:** https://github.com/zhanghao1903/my-skills

## Starter prompts

1. `Initialize the Codex feature lifecycle workflow for this GitHub repository.`
2. `Turn this feature request into a requirements document and ask me to confirm it: <request>.`
3. `Inspect the configured feature workflow and explain the current requirements, implementation, and review status.`
4. `Resume the accepted feature, finish its verification and documentation, and dispatch the exact PR head for independent review.`

## Capabilities and prerequisites

- Creates or binds three durable Codex tasks after explicit Init.
- Reads and writes files in a trusted local Git repository.
- Creates commits, pushes branches, and reads or updates GitHub pull requests
  through user-authorized capabilities.
- Can merge only when the user explicitly enabled merge-on-approve and every
  exact-head safety gate passes.
- Requires Codex Desktop, GitHub, Git, and Python 3.
- Does not include an MCP server or publisher-operated backend.

## Data handling summary

The plugin stores task routing, policy, commit/hash, delivery status, timestamp,
and safe error metadata in the user's Codex home. It is designed not to store
credentials, raw prompts, task transcripts, requirements contents, source
code, diffs, or review findings. Repository and task data may be processed by
Codex and GitHub under the user's accounts. The publisher receives no plugin
runtime data unless the user voluntarily sends a support issue or email.

## Initial release notes

Initial public submission of version 0.2.0:

- provides dedicated Requirements, Main Work, and PR Review & Merge roles;
- requires explicit requirements confirmation before implementation;
- validates deterministic requirements and review handoffs;
- supports idempotent retry without duplicate feature or review cycles;
- preserves healthy `0.1.x` two-task workflow identity and review state while
  adding the Requirements route;
- keeps automatic merge disabled by default and release publication out of
  scope.

## Portal-only decisions

- **Developer identity:** select the verified individual or business identity
  belonging to the submitting OpenAI Platform organization.
- **Country availability:** select only regions where the publisher is prepared
  to provide this listing, support, privacy policy, and terms. This must be
  confirmed by the publisher in the portal.
