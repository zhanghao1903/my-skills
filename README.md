# my-skills

Personal Codex skills collected in one repository.

## Layout

```text
skills/
  local-wechat-send-smoke/
  maintainability-gate/
  plato-figma-governance/
  product-workflow-gate/
  visual-demo-page/
```

Each skill directory keeps its own `SKILL.md` and any referenced scripts,
templates, assets, agents, or attribution files.

## Skill Index

| Skill | Source | Purpose |
| --- | --- | --- |
| `local-wechat-send-smoke` | Taskweavn `.agents/skills` | Run and diagnose the local macOS WeChat send MVP smoke path. |
| `maintainability-gate` | Taskweavn `.agents/skills` | Gate maintenance, refactor, architecture hygiene, and large-file work. |
| `plato-figma-governance` | Taskweavn `.agents/skills` | Gate Plato/Taskweavn Figma reads, writes, migrations, and handoff work. |
| `product-workflow-gate` | Taskweavn `.agents/skills` | Check product workflow phase, upstream artifacts, and implementation readiness. |
| `visual-demo-page` | Local `$CODEX_HOME/skills` | Generate standalone visual explanation and architecture demo HTML pages. |

## Local Install

Copy or symlink a skill directory into your Codex skills directory:

```bash
cp -R skills/visual-demo-page "$CODEX_HOME/skills/"
```

For repo-scoped usage, copy the relevant directory into that repository's
`.agents/skills/` folder.

## Attribution

The `visual-demo-page` skill includes selected templates and renderers from
`Unclecheng-li/AI_Animation` under the MIT license. Preserve
`skills/visual-demo-page/assets/upstream-source/AI_Animation-MIT-LICENSE` and
`skills/visual-demo-page/references/upstream-source.md` when redistributing or
modifying that skill.
