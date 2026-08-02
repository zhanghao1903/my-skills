# my-skills

Personal Codex plugins and skills collected in one repository.

## Layout

```text
plugins/
  codex-feature-lifecycle/
  codex-engineering-lifecycle/
  idea-validation-workflow/
skills/
  feature-lifecycle/
  local-wechat-send-smoke/
  maintainability-gate/
  plato-figma-governance/
  pr-review/
  product-workflow-gate/
  requirements-doc-write/
  technical-plan-review/
  technical-plan-write/
  visual-demo-page/
```

Each plugin is self-contained under `plugins/`. Each standalone skill keeps its
own `SKILL.md` and any referenced scripts, templates, assets, agents, schemas,
examples, or attribution files under `skills/`.

## Plugin Index

| Plugin | Purpose |
| --- | --- |
| [`codex-feature-lifecycle`](plugins/codex-feature-lifecycle/README.md) | Coordinate requirements confirmation, feature implementation, independent PR review, finding remediation, re-review, and merge through three dedicated Codex tasks. |
| [`codex-engineering-lifecycle`](plugins/codex-engineering-lifecycle/README.md) | Run the heavier requirements, technical-plan, Goal-mode implementation, independent plan/code review, merge, release, and closure workflow through three dedicated Codex tasks. |
| [`idea-validation-workflow`](plugins/idea-validation-workflow/README.md) | Guide proposers and executors through safe Idea capture, clarification, explicit promotion, execution facts, structured reports, idempotent recovery, and human-governed handoff. |

## Skill Index

| Skill | Source | Purpose |
| --- | --- | --- |
| `feature-lifecycle` | macos-computer-use `.agents/skills` | Manage a feature from intake through design, implementation, verification, review, release, and traceability. |
| `local-wechat-send-smoke` | Taskweavn `.agents/skills` | Run and diagnose the local macOS WeChat send MVP smoke path. |
| `maintainability-gate` | Taskweavn `.agents/skills` | Gate maintenance, refactor, architecture hygiene, and large-file work. |
| `plato-figma-governance` | Taskweavn `.agents/skills` | Gate Plato/Taskweavn Figma reads, writes, migrations, and handoff work. |
| `pr-review` | macos-computer-use `.agents/skills` | Perform evidence-driven, risk-oriented pull-request reviews and re-reviews with auditable Markdown and JSON results. |
| `product-workflow-gate` | Taskweavn `.agents/skills` | Check product workflow phase, upstream artifacts, and implementation readiness. |
| `requirements-doc-write` | Local generated skill | Turn natural-language requests into traceable requirements documents and stop for explicit user confirmation. |
| `technical-plan-review` | macos-computer-use `.agents/skills` | Review a technical plan as an architect and issue an evidence-backed pass/fail decision. |
| `technical-plan-write` | macos-computer-use `.agents/skills` | Turn confirmed requirements into an implementation-ready technical design and implementation plan. |
| `visual-demo-page` | Local `$CODEX_HOME/skills` | Generate standalone visual explanation and architecture demo HTML pages. |

## Plugin Install

Add this repository as a marketplace:

```bash
codex plugin marketplace add zhanghao1903/my-skills --ref main
```

Install the heavier engineering lifecycle plugin:

```bash
codex plugin add codex-engineering-lifecycle@my-skills
```

Start a new Codex task in the target repository, then invoke
`$engineering-workflow-init`. Init creates or binds Requirements, Engineering
Main, and Engineering Review tasks.

Install the lightweight feature lifecycle plugin:

```bash
codex plugin add codex-feature-lifecycle@my-skills
```

Start a new Codex task after installation, then invoke
`$codex-workflow-init` from the repository where the workflow should run. Init
creates or binds three durable tasks: Requirements, Main Work, and PR Review &
Merge. Send each new feature request to the configured Requirements task first.

Install the Idea Validation Workflow plugin:

```bash
codex plugin add idea-validation-workflow@my-skills
```

Start a new Codex task after installation, securely configure an
IdeaTrace-compatible API base URL and AI bearer credential, then invoke
`$idea-validation-workflow` with the proposer's natural-language Idea or the
executor's project update.

## Local Install

Copy or symlink a skill directory into your Codex skills directory:

```bash
cp -R skills/pr-review "$CODEX_HOME/skills/"
```

For repo-scoped usage, copy the relevant directory into that repository's
`.agents/skills/` folder.

## Attribution

The `visual-demo-page` skill includes selected templates and renderers from
`Unclecheng-li/AI_Animation` under the MIT license. Preserve
`skills/visual-demo-page/assets/upstream-source/AI_Animation-MIT-LICENSE` and
`skills/visual-demo-page/references/upstream-source.md` when redistributing or
modifying that skill.
