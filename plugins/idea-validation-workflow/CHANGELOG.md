# Changelog

## 0.2.1 - 2026-08-06

- Advance the pinned IdeaTrace compatibility baseline to independently reviewed
  head `ef4485b6d25c` and canonical squash merge `0c4c30410e9a`.
- Pin contract guidance to the OpenAPI snapshot whose production-equivalent
  runtime excludes SPA shell routes and exactly matches the frozen document.
- Preserve the 0.2.0 secure initialization, dual attribution, Codex/Claude
  compatibility, and strict human-control credential boundary.

## 0.2.0 - 2026-08-06

- Add `idea-validation-init` for a secure, non-secret, release-bound client
  connection profile shared by Codex and Claude Code.
- Require stable `clientId` and readable `displayName` attribution before AI
  writes without treating either field as authentication.
- Resolve AI bearers only from a restricted file or named environment variable;
  continue to exclude human-control credentials.
- Make the business workflow fail closed on missing, stale, or mismatched client
  profiles while preserving token-free public reads.
- Bind the package to reviewed IdeaTrace head `c637f2140b54` and merge commit
  `31b5e42fa0c2`.

## 0.1.0 - 2026-08-02

- Package the reviewed `idea-validation-workflow` Skill for GitHub marketplace
  installation.
- Add native Codex and Claude Code marketplace manifests around one shared
  Skill implementation.
- Include API, structured-report, recovery, credential, and human-boundary
  guidance.
- Include the canonical structured-report schema and a pinned compatibility
  reference to the reviewed IdeaTrace OpenAPI snapshot.
