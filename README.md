# my-skills

Personal Codex plugins and skills collected in one repository.

## Layout

```text
plugins/
  codex-feature-lifecycle/
skills/
  feature-lifecycle/
  local-wechat-send-smoke/
  maintainability-gate/
  plato-figma-governance/
  pr-review/
  product-workflow-gate/
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
| `codex-feature-lifecycle` | Coordinate feature implementation, independent PR review, finding remediation, re-review, and merge through dedicated Codex tasks. |

## Skill Index

| Skill | Source | Purpose |
| --- | --- | --- |
| `feature-lifecycle` | macos-computer-use `.agents/skills` | Manage a feature from intake through design, implementation, verification, review, release, and traceability. |
| `local-wechat-send-smoke` | Taskweavn `.agents/skills` | Run and diagnose the local macOS WeChat send MVP smoke path. |
| `maintainability-gate` | Taskweavn `.agents/skills` | Gate maintenance, refactor, architecture hygiene, and large-file work. |
| `plato-figma-governance` | Taskweavn `.agents/skills` | Gate Plato/Taskweavn Figma reads, writes, migrations, and handoff work. |
| `pr-review` | macos-computer-use `.agents/skills` | Perform evidence-driven, risk-oriented pull-request reviews and re-reviews with auditable Markdown and JSON results. |
| `product-workflow-gate` | Taskweavn `.agents/skills` | Check product workflow phase, upstream artifacts, and implementation readiness. |
| `technical-plan-review` | macos-computer-use `.agents/skills` | Review a technical plan as an architect and issue an evidence-backed pass/fail decision. |
| `technical-plan-write` | macos-computer-use `.agents/skills` | Write implementation-ready requirements, design, and implementation-plan documents. |
| `visual-demo-page` | Local `$CODEX_HOME/skills` | Generate standalone visual explanation and architecture demo HTML pages. |

## Plugin Install

Add this repository as a marketplace and install the plugin:

```bash
codex plugin marketplace add https://github.com/zhanghao1903/my-skills.git
codex plugin add codex-feature-lifecycle@my-skills
```

Start a new Codex task after installation, then invoke
`$codex-workflow-init` from the repository where the workflow should run.

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
